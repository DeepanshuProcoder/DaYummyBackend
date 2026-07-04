const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

const sendOTP = async (email, name, otp) => {
  await brevo.transactionalEmails.sendTransacEmail({
    sender: {
      name: "Da Yummy",
      email: "dayummy25@gmail.com", // Your VERIFIED sender
    },
    to: [
      {
        email,
        name,
      },
    ],
    subject: "Food Website Email Verification",
    htmlContent: `
      <div style="font-family:Arial;padding:30px">
        <h2>Hello ${name} 👋</h2>
        <h3>Welcome to Da Yummy</h3>
        <p>Your OTP is</p>
        <h1 style="letter-spacing:8px;color:#ff6600">${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
      </div>
    `,
  });

  console.log("✅ OTP Email Sent Successfully");
};

module.exports = sendOTP;
