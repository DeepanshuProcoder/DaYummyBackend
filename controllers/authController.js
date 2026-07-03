const User = require("../models/User");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const sendOTP = require("../utils/sendOTP");
const jwt = require("jsonwebtoken");

const tempUsers = {};

// ================= REGISTER =================

exports.register = async (req, res) => {
    try {

        const {
            fullName,
            email,
            mobile,
            password,
            gender,
            dob
        } = req.body;

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already registered."
            });
        }

        const existingMobile = await User.findOne({ mobile });

        if (existingMobile) {
            return res.status(400).json({
                success: false,
                message: "Mobile already registered."
            });
        }

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        tempUsers[email] = {
            fullName,
            email,
            mobile,
            password,
            gender,
            dob,
            otp,
            otpExpiry: Date.now() + 5 * 60 * 1000,
            attempts: 0
        };

        await sendOTP(email, fullName, otp);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully."
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// ================= VERIFY OTP =================

exports.verifyOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        const tempUser = tempUsers[email];

        if (!tempUser) {

            return res.status(400).json({
                success: false,
                message: "Registration session expired."
            });

        }

        if (Date.now() > tempUser.otpExpiry) {

            delete tempUsers[email];

            return res.status(400).json({
                success: false,
                message: "OTP Expired."
            });

        }

        if (tempUser.attempts >= 5) {

            delete tempUsers[email];

            return res.status(400).json({
                success: false,
                message: "Too many wrong attempts."
            });

        }

        if (tempUser.otp !== otp) {

            tempUser.attempts++;

            return res.status(400).json({
                success: false,
                message: "Incorrect OTP."
            });

        }

        const hashedPassword = await bcrypt.hash(tempUser.password, 10);

        await User.create({

            fullName: tempUser.fullName,
            email: tempUser.email,
            mobile: tempUser.mobile,
            password: hashedPassword,
            gender: tempUser.gender,
            dob: tempUser.dob,
            verified: true

        });

        delete tempUsers[email];

        return res.status(200).json({

            success: true,
            message: "Account Created Successfully."

        });

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

// ================= RESEND OTP =================

exports.resendOTP = async (req, res) => {

    try {

        const { email } = req.body;

        const tempUser = tempUsers[email];

        if (!tempUser) {

            return res.status(400).json({

                success: false,
                message: "Registration session expired."

            });

        }

        const otp = otpGenerator.generate(6, {

            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false

        });

        tempUser.otp = otp;
        tempUser.otpExpiry = Date.now() + 5 * 60 * 1000;
        tempUser.attempts = 0;

        await sendOTP(

            tempUser.email,
            tempUser.fullName,
            otp

        );

        return res.status(200).json({

            success: true,
            message: "New OTP Sent."

        });

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,
            message: err.message

        });

    }

};
exports.login = async (req, res) => {

    try {

        const {

            emailOrMobile,

            password

        } = req.body;

        let user;

        if (emailOrMobile.includes("@")) {

            user = await User.findOne({

                email: emailOrMobile

            });

        }

        else {

            user = await User.findOne({

                mobile: emailOrMobile

            });

        }

        if (!user) {

            return res.status(400).json({

                success: false,

                message: "User not found."

            });

        }

        const match = await bcrypt.compare(

            password,

            user.password

        );

        if (!match) {

            return res.status(400).json({

                success: false,

                message: "Incorrect Password."

            });

        }

    const token = jwt.sign(

    {

        id: user._id,

        email: user.email,

        role: user.role

    },

    process.env.JWT_SECRET,

    {

        expiresIn: "7d"

    }

);
        user.isOnline = true;

        user.lastLogin = new Date();

        await user.save();

        return res.status(200).json({

            success: true,

            message: "Login Successful.",

            token,

            user: {

                id: user._id,

                fullName: user.fullName,

                email: user.email,

                mobile: user.mobile,

                role: user.role

            }

        });

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
exports.logout = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found."

            });

        }

        user.isOnline = false;

        user.lastLogout = new Date();

        await user.save();

        return res.json({

            success: true,

            message: "Logged out successfully."

        });

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
// ================= GET ALL USERS =================

exports.getAllUsers = async (req, res) => {

    try {

        const users = await User.find()

            .select("-password")

            .sort({

                isOnline: -1,

                lastLogin: -1

            });

        res.json({

            success: true,

            users

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};