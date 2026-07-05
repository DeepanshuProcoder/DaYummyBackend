const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTP = async (email, name, otp) => {
    try {

        const { data, error } = await resend.emails.send({

            from: "Da Yummy <onboarding@resend.dev>",

            to: [email],

            subject: "Da Yummy Email Verification",

            html: `
                <div style="font-family:Arial;padding:25px">

                    <h2>Hello ${name} 👋</h2>

                    <h3>Welcome to Da Yummy 🍕</h3>

                    <p>Your verification OTP is</p>

                    <h1 style="letter-spacing:8px;color:#ff6600">
                        ${otp}
                    </h1>

                    <p>This OTP will expire in 5 minutes.</p>

                    <hr>

                    <small>
                        If you didn't request this OTP, simply ignore this email.
                    </small>

                </div>
            `
        });

        if (error) {
            console.error(error);
            throw new Error(error.message);
        }

        console.log("✅ OTP Email Sent");
        console.log(data);

    } catch (err) {

        console.error("RESEND ERROR");

        console.error(err);

        throw err;

    }
};

module.exports = sendOTP;
