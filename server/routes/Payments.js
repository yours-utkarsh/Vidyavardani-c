const express = require("express");
const router = express.Router();
const {
  capturePayment,
  verifySignature
} = require("../controllers/Payment");

const { auth, isStudent } = require("../middlewares/middle");
router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifySignature);
// router.post(
//   "/sendPaymentSuccessEmail",
//   auth,
//   isStudent,
//   sendPaymentSuccessEmail
// );

module.exports = router;
