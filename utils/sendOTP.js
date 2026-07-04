const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
    },
});

transporter.verify((error) => {
    if (error) {
        console.error("SMTP ERROR:", error);
    } else {
        console.log("✅ Brevo SMTP Ready");
    }
});

const sendOTP = async (email, name, otp) => {

    const mailOptions = {
        from: `"Da Yummy" <${process.env.BREVO_USER}>`,
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
    console.log("✅ OTP Email Sent Successfully");
};

module.exports = sendOTP;
