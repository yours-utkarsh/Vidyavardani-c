
const mongoose =  require("mongoose");
const { mailSender } = require("../utils/mailSender");


const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    // expires: "5m",
    expires: 60 * 5, // 5 minutes

  },
});

async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(email , "Your verification OTP" , `Your OTP is ${otp}. It is valid for 5 minutes.`)
    }
    catch(error){
        console.log("error occured while sesnding email" , error)
        throw error;
    }
}

otpSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email , this.otp);
    next();
})


module.exports = mongoose.model("OTP", otpSchema);