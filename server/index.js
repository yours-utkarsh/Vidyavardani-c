const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");

// import connectDB from "./config/database.js";
const database = require("./config/database");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 4000;

// database connect
database.connectDB();

// use it while conection with vercel deployment
// let isConnected = false;
// const {connectDB} = database;

// // Middleware to ensure DB connection before handling requests

// app.use((req, res, next) => {
//   if(!isConnected) {
//     connectDB().then(() => {
//       isConnected = true;
//       next();
//     }).catch((err) => {
//       console.error('Failed to connect to DB', err);
//       res.status(500).json({ success: false, message: 'Database connection error' });
//     });
//   } else {
//     next();
//   }
// }
// )



// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// cloudinary connect
cloudinaryConnect();

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);

// def routes
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to Learnify Backend",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// module.exports = app;

