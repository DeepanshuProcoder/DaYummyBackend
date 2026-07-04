const nodemailer = require("nodemailer");

console.log("BREVO_USER:", process.env.BREVO_USER);
console.log("BREVO_PASS exists:", !!process.env.BREVO_PASS);

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    requireTLS: true,
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
    auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
    },
});

(async () => {
    try {
        await transporter.verify();
        console.log("✅ Brevo SMTP Ready");
    } catch (err) {
        console.error("❌ Brevo Verify Error:");
        console.error(err);
    }
})();
