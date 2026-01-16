const { generate } = require("otp-generator");
const User = require("../models/User");
const { mailSender } = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
require("dotenv").config();

// reset Password Token

exports.resetPasswordToken = async (req, res) => {
  try {
    // get email from req.body
    const { email } = req.body;

    // check user for this email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with this email",
      });
    }

    // generate token

    const token = crypto.randomUUID();

    // update user by adding token and token expiry time 15 min

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordTokenExpires: Date.now() + 15 * 60 * 1000,
      },
      { new: true }
    );

    // create url

    const url = `http://localhost:3000/reset-password/${token}`;

    // send email to user with the url
    await mailSender(
      email,
      "RESET YOUR PASSWORD",
      `Password reset Link (valid for 15 minutes) : ${url}`
    );

    return res.status(200).json({
      success: true,
      message: "Reset password link sent to your email",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Reset password token error",
      error: error.message,
    });
  }
};

// reset Password

exports.resetPassword = async (req, res) => {
  try {
    // data fetch from req.body
    const { password, confirmPassword, token } = req.body;
    // validation of password and confirm password

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match",
      });
    }

    // get user details from db using token

    const userDetails = await User.findOne({ token });

    // if no user found
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Invalid token",
      });
    }

    // check for token expiry

    if (userDetails.resetPasswordTokenExpires < Date.now()) {
      return res.json({
        success: false,
        message: "Token expired , please try again",
      });
    }

    // hash password

    const hashedPassword = await bcrypt.hash(password, 10);

    // password update
    await User.findOneAndUpdate(
      { token: token },
      {
        password: hashedPassword,
        token: null,
        resetPasswordTokenExpires: null,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Reset password error",
      error: error.message,
    });
  }
};


