const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
    try {

        const { name, email, phone, subject, message } = req.body;

        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields."
            });
        }

        await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "Da Yummy",
                    email: "dayummy25@gmail.com" // Verified sender
                },

                to: [
                    {
                        email: "dayummy25@gmail.com", // Your inbox
                        name: "Da Yummy Admin"
                    }
                ],

                replyTo: {
                    email: email,
                    name: name
                },

                subject: `DA YUMMY Contact : ${subject}`,

                htmlContent: `
                <h2>📩 New Contact Message</h2>

                <hr>

                <p><b>Name:</b> ${name}</p>

                <p><b>Email:</b> ${email}</p>

                <p><b>Phone:</b> ${phone}</p>

                <p><b>Subject:</b> ${subject}</p>

                <p><b>Message:</b></p>

                <p>${message}</p>
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

        console.log("✅ Contact Email Sent");

        res.status(200).json({
            success: true,
            message: "Message Sent Successfully"
        });

    } catch (err) {

        console.error("BREVO CONTACT ERROR");

        console.error(err.response?.data || err.message);

        res.status(500).json({
            success: false,
            message: err.response?.data || err.message
        });

    }
});

module.exports = router;
