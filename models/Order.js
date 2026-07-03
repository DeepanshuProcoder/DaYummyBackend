const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    orderId: {
        type: String,
        unique: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    customerName: String,

    phone: String,

    address: String,

    items: [

        {

            productId: String,

            name: String,

            image: String,

            price: Number,

            quantity: Number

        }

    ],

    totalPrice: Number,

    paymentMethod: String,
    
coupon: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "Coupon",

    default: null

},

couponCode: {

    type: String,

    default: ""

},

discount: {

    type: Number,

    default: 0

},
paymentStatus: {

    type: String,

    default: "Pending"

},

orderStatus: {

    type: String,

    default: "Pending"

},

cancelUntil: {

    type: Date

},


}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);