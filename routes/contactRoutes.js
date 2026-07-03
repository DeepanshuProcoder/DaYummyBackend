const express = require("express");

const router = express.Router();

const nodemailer = require("nodemailer");

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

        const transporter = nodemailer.createTransport({

            service: "gmail",

            auth: {

                user: "dayummy25@gmail.com",

                pass: "vksmsaqoiuyxluyn"

            }

        });

        await transporter.sendMail({

            from: email,

            to: "dayummy25@gmail.com",

            subject: `DA YUMMY Contact : ${subject}`,

            html: `

            <h2>New Contact Message</h2>

            <hr/>

            <p><b>Name :</b> ${name}</p>

            <p><b>Email :</b> ${email}</p>

            <p><b>Phone :</b> ${phone}</p>

            <p><b>Subject :</b> ${subject}</p>

            <p><b>Message :</b></p>

            <p>${message}</p>

            `

        });

        res.json({

            message: "Message Sent Successfully."

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Unable to send email."

        });

    }

});

module.exports = router;