const express = require("express");

const router = express.Router();
const {

    register,

    verifyOTP,

    resendOTP,

    login,
    logout,
    getAllUsers

} = require("../controllers/authController");



router.post("/register", register);
router.post("/resend-otp", resendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.put(

    "/logout/:id",

    logout

);
router.get(

    "/users",

    getAllUsers

);

module.exports = router;