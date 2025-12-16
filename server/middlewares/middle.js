const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// auth middleware

exports.auth = async (req, res, next) => {
  try {
    // fetch token from headers
    const token =
      req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

    // if token missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access , no token found",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(" decoded token ", decode);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token Expired , unauthorized access",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Auth middleware error",
      error: error.message,
    });
  }
};

// isStudent middleware

exports.isStudent = async (req, res, next) => {
  try {
    if(req.user.accountType !== "Student"){
      return res.status(403).json({
        success: false,
        message: "This is a protected route for students only",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "isStudent middleware error",
      error: error.message,
    });
  }
};

// isAdmin middleware

exports.isAdmin = async (req, res, next) => {
  try {
    if(req.user.accountType !== "Admin"){
      return res.status(403).json({
        success: false,
        message: "This is a protected route for admins only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "isAdmin middleware error",
      error: error.message,
    });
  }
}



// isInstructor middleware

exports.isInstructor = async (req, res, next) => {
  try {
    if(req.user.accountType !== "Instructor"){
      return res.status(403).json({
        success: false,
        message: "This is a protected route for instructors only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "isInstructor middleware error",
      error: error.message,
    });
  }
};
