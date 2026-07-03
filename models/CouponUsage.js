const mongoose = require("mongoose");

const couponUsageSchema = new mongoose.Schema({

    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },

    coupon: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Coupon",

        required: true

    },

    timesUsed: {

        type: Number,

        default: 0

    }

}, {

    timestamps: true

});

// One record per user per coupon

couponUsageSchema.index(

    {

        user: 1,

        coupon: 1

    },

    {

        unique: true

    }

);

module.exports = mongoose.model(

    "CouponUsage",

    couponUsageSchema

);