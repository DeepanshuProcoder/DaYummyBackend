const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    productId: {
        type: Number,
        unique: true,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ""
    },

    image: {
        type: String,
        required: true
    },

    available: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);