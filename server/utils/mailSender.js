const nodemailer = require("nodemailer");

exports.mailSender = async (email , title , body) =>{
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })
        
        let info = await transporter.sendMail({
            from: `"Vidyavardani" <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`,
            text: `${body}`,
        })

        console.log(info)
        return info;

    }
    catch(error){
        console.log("Error in mail sender util", error);
    }
}