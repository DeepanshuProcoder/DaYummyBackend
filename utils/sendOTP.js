const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
);

const sendOTP = async (email, name, otp) => {
    try {
        const sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.sender = {
            name: "Da Yummy",
            email: "dayummy25@gmail.com" // Your verified sender
        };

        sendSmtpEmail.to = [
            {
                email: email,
                name: name
            }
        ];

        sendSmtpEmail.subject = "Food Website Email Verification";

        sendSmtpEmail.htmlContent = `
        <div style="font-family:Arial;padding:30px">
            <h2>Hello ${name} 👋</h2>
            <h3>Welcome to Da Yummy</h3>
            <p>Your OTP is</p>
            <h1 style="letter-spacing:8px;color:#ff6600">${otp}</h1>
            <p>This OTP expires in 5 minutes.</p>
            <hr>
            <small>If you didn't request this OTP, simply ignore this email.</small>
        </div>
        `;

        const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

        console.log("✅ OTP Email Sent Successfully");
        console.log(result);

    } catch (err) {
        console.error("❌ BREVO API ERROR");
        console.error(err.response?.body || err);
        throw err;
    }
};

module.exports = sendOTP;
