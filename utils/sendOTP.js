const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});

const sendOTP = async (email, name, otp) => {

    const mailOptions = {

        from: process.env.EMAIL_USER,

        to: email,

        subject: "Food Website Email Verification",

        html: `

        <div style="font-family:Arial;padding:30px">

        <h2>Hello ${name} 👋</h2>

        <h3>Welcome to Food Website</h3>

        <p>Your OTP is</p>

        <h1 style="letter-spacing:8px;color:#ff6600">${otp}</h1>

        <p>This OTP will expire in 5 minutes.</p>

        <hr>

        <small>If you didn't request this OTP, simply ignore this email.</small>

        </div>

        `

    };

    await transporter.sendMail(mailOptions);

};
transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP ERROR:");
        console.error(error);
    } else {
        console.log("SMTP Ready");
    }
});
module.exports = sendOTP;
