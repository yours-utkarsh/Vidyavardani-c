const express = require("express");
const router = express.Router();


const {
  login,
  signUp,
  sendOTP,
  changePassword,
} = require("../controllers/Auth");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

const { auth } = require("../middlewares/middle");

// Routes for login , signup & Authentication

// Routes for user login
router.post("/login", login);

// Routes for user signup
router.post("/signup", signUp);

// Route for sending OTP to email
router.post("/sendotp", sendOTP);

// Route for changing password
router.post("/changepassword", auth, changePassword);

// reset password

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// Route for resetting user's password after verifying the token
router.post("/reset-password", resetPassword);

module.exports = router;
