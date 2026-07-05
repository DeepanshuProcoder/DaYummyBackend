const Mailjet = require("node-mailjet");

const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_SECRET_KEY
);

const sendOTP = async (email, name, otp) => {
    try {

        const request = await mailjet
            .post("send", { version: "v3.1" })
            .request({
                Messages: [
                    {
                        From: {
                            Email: "deepanshuchaudhary0698@gmail.com",
                            Name: "Da Yummy"
                        },

                        To: [
                            {
                                Email: email,
                                Name: name
                            }
                        ],

                        Subject: "Da Yummy Email Verification",

                        HTMLPart: `
                        <div style="font-family:Arial;padding:30px">
                            <h2>Hello ${name} 👋</h2>

                            <h3>Welcome to Da Yummy</h3>

                            <p>Your OTP is</p>

                            <h1 style="letter-spacing:8px;color:#ff6600">
                                ${otp}
                            </h1>

                            <p>This OTP expires in 5 minutes.</p>

                            <hr>

                            <small>
                                If you didn't request this OTP, ignore this email.
                            </small>
                        </div>
                        `
                    }
                ]
            });

        console.log("✅ OTP Sent Successfully");
        console.log(request.body);

    } catch (err) {

        console.error("❌ MAILJET ERROR");

        console.error(
            err.statusCode,
            err.response?.body || err
        );

        throw err;

    }
};

module.exports = sendOTP;
