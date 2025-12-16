// email template for course enrollment

exports.courseEnrollmentEmail = (courseName , name) =>{

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Course Enrollment Confirmation</title>
        <style>
            body {  
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {    
                width: 80%;
                margin: auto;
                background: #fff;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Enrollment Confirmation</h1>
            <p>Dear ${name},</p>
            <p>Thank you for enrolling in the course: <strong>${courseName}</strong>.</p>
            <p>We are excited to have you on board and hope you have a great learning experience.</p>
            <p>Best regards,<br/>The Team</p>
        </div>
    </body>
    </html>
    `
}