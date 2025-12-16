const User = require("../models/User");
const Profile = require("../models/Profile");
const OTP = require("../models/OTP");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const { mailSender } = require("../utils/mailSender");
require("dotenv").config();

// sendOTP

exports.sendOTP = async (req, res) => {
  try {
     const { email } = req.body;

    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: `User is Already Registered`,
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    });



  } catch (error) {
    console.log("Error in sending OTP", error);
    return res.status(500).json({
      success: false,
      message: "Error in sending OTP",
    });
  }
};




// sign up 

exports.signUp = async (req, res) =>{
    try{

        // data  fetch from request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;


        // validation 
        if(!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !contactNumber || !otp){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // 2 password match

        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }
        
        // check user already exists
        const existingUser = await User.findOne({email: email});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // find most recent otp in db for the email
        const response = await OTP.findOne({email: email}).sort({createdAt: -1}).limit(1);

        console.log('this is a generated otp' , response)
        // validate otp 
      
if (!response || response.otp !== otp) {
  return res.status(400).json({
    success: false,
    message: "The OTP is not valid",
  });
}

        // hash password
        const hashedPassword = await bcrypt.hash(password , 10);

        // entry create in DB 
        const profileDetails = new Profile({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: contactNumber,
        });

         await profileDetails.save();

         const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image : `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}${lastName}`
         })

         return res.status(200).json({
            success: true,
            message: "User created successfully",
            data: user
        });
    }
    catch(error){
        console.log("Error in signup controller" , error);
        return res.status(500).json({
            success: false,
            message: "Error in signup",
        });
    }
}


// login

exports.login = async (req,res) =>{
    try{

        const {email , password} = req.body;

        // validation
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        // check user exists
        const user = await User.findOne({email: email}).populate("additionalDetails");

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User does not exist",
            });
        }

        // password match
        const isPasswordMatch = await bcrypt.compare(password , user.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }
                const payload = {
                    id: user._id,
                    email: user.email,
                    accountType: user.accountType,
                };

                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: "2h",
                });

                const userData = user.toObject();
                userData.password = undefined;
                userData.__v = undefined;
                userData.token = token;

        // create cookie 
        const options = {
            expiresIn : new Date(Date.now() + 3*24*60*60*1000),
            httpOnly: true,
        }

        res.cookie("token" , token , options);
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: userData
        });
    }
    catch(error){
        console.log("Error in login controller" , error);
        return res.status(500).json({
            success: false,
            message: "Error in login",
        });
    }
}


// change password

exports.changePassword = async (req, res) =>{
    try{
        const {oldPassword , newPassword , confirmNewPassword} = req.body;
        // validation
        if(!oldPassword || !newPassword || !confirmNewPassword){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // check if new password and confirm password match
        if(newPassword !== confirmNewPassword){
            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match",
            });
        }

        // get user from req.user
        const userId = req.user.id;
        const user = await User.findById(userId);

        // check old password
        const isOldPasswordMatch = await bcrypt.compare(oldPassword , user.password);
        if(!isOldPasswordMatch){
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect",
            });
        }

        // hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // update password in db

        await User.findByIdAndUpdate(userId , {
            password: hashedNewPassword
        } , {new: true});

        // send mail 

         await mailSender({
            email: user.email,
            title: "Password Changed Successfully",
            body: `Hello ${user.firstName}, Your password has been changed successfully. If you did not initiate this change, please contact our support team immediately.`,
         })

        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });


    }
    catch(error){
        console.log("Error in change password controller" , error);
        return res.status(500).json({
            success: false,
            message: "Error in change password",
        });
    }
}
