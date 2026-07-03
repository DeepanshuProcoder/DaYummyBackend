const User = require("../models/User");

module.exports = async (req, res, next) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }

        if (user.role !== "admin") {

            return res.status(403).json({

                message: "Admin Access Only"

            });

        }

        next();

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            message: "Server Error"

        });

    }

};