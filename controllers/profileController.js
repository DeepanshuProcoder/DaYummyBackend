const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ================= GET PROFILE =================

exports.getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.params.id)

            .select("-password");

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found."

            });

        }

        res.json({

            success: true,

            user

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// ================= UPDATE PROFILE =================

exports.updateProfile = async (req, res) => {

    try {

        const {

            fullName,

            mobile

        } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found."

            });

        }

        user.fullName = fullName;

        user.mobile = mobile;

        await user.save();

        res.json({

            success: true,

            message: "Profile updated successfully."

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
// ================= CHANGE PASSWORD =================

exports.changePassword = async (req, res) => {

    try {

        const {

            oldPassword,

            newPassword,

            confirmPassword

        } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found."

            });

        }

        const isMatch = await bcrypt.compare(

            oldPassword,

            user.password

        );

        if (!isMatch) {

            return res.status(400).json({

                success: false,

                message: "Current password is incorrect."

            });

        }

        if (newPassword !== confirmPassword) {

            return res.status(400).json({

                success: false,

                message: "New passwords do not match."

            });

        }

        if (newPassword.length < 8) {

            return res.status(400).json({

                success: false,

                message: "Password must be at least 8 characters."

            });

        }

        const hashedPassword = await bcrypt.hash(

            newPassword,

            10

        );

        user.password = hashedPassword;

        await user.save();

        return res.json({

            success: true,

            message: "Password changed successfully."

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