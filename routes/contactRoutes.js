const express = require("express");
const router = express.Router();

const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
);

router.post("/", async (req, res) => {
    try {

        const {
            name,
            email,
            phone,
            subject,
            message
        } = req.body;

        if (
            !name ||
            !email ||
            !phone ||
            !subject ||
            !message
        ) {
            return res.status(400).json({
                message: "Please fill all fields."
            });
        }

        const sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.sender = {
            name: "Da Yummy Website",
            email: "dayummy25@gmail.com" // Your VERIFIED sender in Brevo
        };

        sendSmtpEmail.to = [
            {
                email: "dayummy25@gmail.com",
                name: "Da Yummy Admin"
            }
        ];

        sendSmtpEmail.replyTo = {
            email: email,
            name: name
        };

        sendSmtpEmail.subject = `DA YUMMY Contact : ${subject}`;

        sendSmtpEmail.htmlContent = `
            <div style="font-family:Arial;padding:20px">

                <h2>📩 New Contact Message</h2>

                <hr>

                <p><strong>Name:</strong> ${name}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Phone:</strong> ${phone}</p>

                <p><strong>Subject:</strong> ${subject}</p>

                <p><strong>Message:</strong></p>

                <div style="padding:15px;background:#f5f5f5;border-radius:8px;">
                    ${message}
                </div>

            </div>
        `;

        await apiInstance.sendTransacEmail(sendSmtpEmail);

        console.log("✅ Contact email sent successfully.");

        res.status(200).json({
            success: true,
            message: "Message Sent Successfully."
        });

    } catch (err) {

        console.error("❌ Contact Email Error:");

        console.error(err.response?.body || err);

        res.status(500).json({
            success: false,
            message: "Unable to send email."
        });

    }
});

module.exports = router;
