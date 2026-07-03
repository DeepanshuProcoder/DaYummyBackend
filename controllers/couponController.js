const Coupon = require("../models/Coupon");
const Order = require("../models/Order");
const CouponUsage = require("../models/CouponUsage");
// ================= ADD COUPON =================

exports.addCoupon = async (req, res) => {

    try {

        const existing = await Coupon.findOne({

            code: req.body.code.toUpperCase()

        });

        if (existing) {

            return res.status(400).json({

                success: false,

                message: "Coupon already exists."

            });

        }

        const coupon = await Coupon.create({

            ...req.body,

            code: req.body.code.toUpperCase()

        });

        res.status(201).json({

            success: true,

            message: "Coupon created successfully.",

            coupon

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

// ================= GET ALL COUPONS =================

exports.getCoupons = async (req, res) => {

    try {

        const coupons = await Coupon.find()

            .sort({

                createdAt: -1

            });

        res.json({

            success: true,

            coupons

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



// ================= ADD COUPON =================



// ================= GET ALL COUPONS =================


// ================= VALIDATE COUPON =================
exports.updateCoupon = async (req, res) => {

    try {

        const coupon = await Coupon.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        );

        if (!coupon) {

            return res.status(404).json({

                success: false,

                message: "Coupon not found."

            });

        }

        res.json({

            success: true,

            coupon

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
exports.deleteCoupon = async (req, res) => {

    try {

        await Coupon.findByIdAndDelete(

            req.params.id

        );

        res.json({

            success: true,

            message: "Coupon deleted."

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
exports.toggleCoupon = async (req, res) => {

    try {

        const coupon = await Coupon.findById(

            req.params.id

        );

        if (!coupon) {

            return res.status(404).json({

                success: false,

                message: "Coupon not found."

            });

        }

        coupon.active = !coupon.active;

        await coupon.save();

        res.json({

            success: true,

            coupon

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
exports.validateCoupon = async (req, res) => {

    try {

        const {

            code,

            userId,

            cartTotal,

            paymentMethod = "All",

            categories = []

        } = req.body;

        const coupon = await Coupon.findOne({

            code: code.toUpperCase()

        });

        if (!coupon) {

            return res.status(404).json({

                success: false,

                message: "Invalid Coupon."

            });

        }

        if (!coupon.active) {

            return res.status(400).json({

                success: false,

                message: "Coupon is disabled."

            });

        }

        if (

            coupon.expiryDate &&

            new Date() > coupon.expiryDate

        ) {

            return res.status(400).json({

                success: false,

                message: "Coupon has expired."

            });

        }

        if (

            cartTotal < coupon.minimumOrder

        ) {

            return res.status(400).json({

                success: false,

                message:

                `Minimum order ₹${coupon.minimumOrder} required.`

            });

        }
                // ================= FIRST ORDER ONLY =================

        const completedOrders = await Order.countDocuments({

            user: userId,

            orderStatus: "Delivered"

        });

        if (

            coupon.firstOrderOnly &&

            completedOrders > 0

        ) {

            return res.status(400).json({

                success: false,

                message:

                    "This coupon is only valid on your first order."

            });

        }

        // ================= FIRST 3 ORDERS =================

        if (

            coupon.firstThreeOrders &&

            completedOrders >= 3

        ) {

            return res.status(400).json({

                success: false,

                message:

                    "This coupon is valid only for your first 3 orders."

            });

        }

        // ================= TOTAL USAGE LIMIT =================

        if (

            coupon.totalUsageLimit > 0 &&

            coupon.usedCount >= coupon.totalUsageLimit

        ) {

            return res.status(400).json({

                success: false,

                message:

                    "Coupon usage limit reached."

            });

        }
        // ================= USER USAGE LIMIT =================

const usage = await CouponUsage.findOne({

    user: userId,

    coupon: coupon._id

});

if (

    usage &&

    usage.timesUsed >= coupon.maximumUsesPerUser

) {

    return res.status(400).json({

        success:false,

        message:

        `You have already used this coupon ${coupon.maximumUsesPerUser} time(s).`

    });

}

        // ================= PAYMENT METHOD =================

        if (

            coupon.paymentMethod !== "All" &&

            coupon.paymentMethod !== paymentMethod

        ) {

            return res.status(400).json({

                success: false,

                message:

                    `Coupon valid only on ${coupon.paymentMethod}.`

            });

        }

        // ================= CATEGORY =================

        if (

            coupon.category !== "All"

        ) {

            if (

                !categories.includes(coupon.category)

            ) {

                return res.status(400).json({

                    success: false,

                    message:

                        `Coupon only works on ${coupon.category}.`

                });

            }

        }

        // ================= WEEKEND ONLY =================

        if (

            coupon.weekendOnly

        ) {

            const day = new Date().getDay();

            if (

                day !== 0 &&

                day !== 6

            ) {

                return res.status(400).json({

                    success: false,

                    message:

                        "Coupon works only on weekends."

                });

            }

        }

        // ================= TIME BASED =================

        if (

            coupon.startTime &&

            coupon.endTime

        ) {

            const currentTime =

                new Date()

                .toLocaleTimeString(

                    "en-GB",

                    {

                        hour12:false,

                        hour:"2-digit",

                        minute:"2-digit"

                    }

                );

            if (

                currentTime < coupon.startTime ||

                currentTime > coupon.endTime

            ) {

                return res.status(400).json({

                    success:false,

                    message:

                    `Coupon works only between ${coupon.startTime} and ${coupon.endTime}.`

                });

            }

        }
                // ================= CALCULATE DISCOUNT =================

        let discount = 0;

        if (coupon.discountType === "Flat") {

            discount = coupon.discountValue;

        }

        else {

            discount =

                (cartTotal * coupon.discountValue) / 100;

            if (

                coupon.maximumDiscount > 0 &&

                discount > coupon.maximumDiscount

            ) {

                discount = coupon.maximumDiscount;

            }

        }

        if (discount > cartTotal) {

            discount = cartTotal;

        }

        const newTotal = cartTotal - discount;

        return res.json({

            success: true,

            message: "Coupon Applied Successfully.",

            coupon: {

                _id: coupon._id,

                code: coupon.code,

                type: coupon.discountType,

                value: coupon.discountValue

            },

            discount,

            newTotal

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
exports.getAvailableCoupons = async (req, res) => {

    try {

        const coupons = await Coupon.find({

            active: true

        }).sort({

            createdAt: -1

        });

        res.json({

            success: true,

            coupons

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};