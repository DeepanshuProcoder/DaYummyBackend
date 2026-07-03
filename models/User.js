const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    

    fullName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    mobile: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    dob: {
        type: Date,
        required: true
    },

    profileImage: {
        type: String,
        default: ""
    },

    verified: {
        type: Boolean,
        default: false
    },

    otp: {
        type: String,
        default: ""
    },

    otpExpiry: {
        type: Date
    },
    role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
},
isOnline: {

    type: Boolean,

    default: false

},

lastLogin: {

    type: Date,

    default: null

},

lastLogout: {

    type: Date,

    default: null

}

}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);
