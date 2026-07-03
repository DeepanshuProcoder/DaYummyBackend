const express = require("express");

const router = express.Router();

const profileController = require("../controllers/profileController");

// Get Profile

router.get(

    "/:id",

    profileController.getProfile

);

// Update Profile

router.put(

    "/:id",

    profileController.updateProfile

);

// Change Password

router.put(

    "/change-password/:id",

    profileController.changePassword

);

module.exports = router;