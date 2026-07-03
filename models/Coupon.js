const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({

    code: {

        type: String,

        required: true,

        unique: true,

        uppercase: true,

        trim: true

    },

    discountType: {

        type: String,

        enum: [

            "Flat",

            "Percentage"

        ],

        default: "Flat"

    },

    discountValue: {

        type: Number,

        required: true

    },

    maximumDiscount: {

        type: Number,

        default: 0

    },

    minimumOrder: {

        type: Number,

        default: 0

    },

    active: {

        type: Boolean,

        default: true

    },

    firstOrderOnly: {

        type: Boolean,

        default: false

    },

    firstThreeOrders: {

        type: Boolean,

        default: false

    },

    maximumUsesPerUser: {

        type: Number,

        default: 1

    },

    totalUsageLimit: {

        type: Number,

        default: 0

    },

    usedCount: {

        type: Number,

        default: 0

    },

    category: {

        type: String,

        default: "All"

    },

    paymentMethod: {

        type: String,

        default: "All"

    },

    expiryDate: {

        type: Date

    },

    startTime: {

        type: String,

        default: ""

    },

    endTime: {

        type: String,

        default: ""

    },

    weekendOnly: {

        type: Boolean,

        default: false

    },

    description: {

        type: String,

        default: ""

    }

},{

    timestamps:true

});

module.exports = mongoose.model(

    "Coupon",

    couponSchema

);