const axios = require("axios");

const sendOTP = async (email, name, otp) => {

    try {

        await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "Da Yummy",
                    email: "dayummy25@gmail.com"
                },

                to: [
                    {
                        email,
                        name
                    }
                ],

                subject: "Food Website Email Verification",

                htmlContent: `
                <div style="font-family:Arial;padding:30px">
                    <h2>Hello ${name} 👋</h2>
                    <h3>Welcome to Da Yummy</h3>
                    <p>Your OTP is</p>

                    <h1 style="color:#ff6600;letter-spacing:8px">
                        ${otp}
                    </h1>

                    <p>This OTP expires in 5 minutes.</p>

                    <hr>

                    <small>If you didn't request this OTP, ignore this email.</small>

                </div>
                `
            },
            {
                headers: {
                    accept: "application/json",
                    "api-key": process.env.BREVO_API_KEY,
                    "content-type": "application/json"
                }
            }
        );

        console.log("✅ OTP Email Sent");

    } catch (err) {

        console.error("BREVO OTP ERROR");

        console.error(err.response?.data || err.message);

        throw err;

    }

};

module.exports = sendOTP;
