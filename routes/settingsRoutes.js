const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const admin = require("../middleware/admin");

const upload = require("../middleware/upload");

const {

    getAdminProfile,

    updateAdminProfile,
    getOrderSettings,
updateOrderSettings

} = require("../controllers/settingsController");

// ================= GET PROFILE =================

router.get(

    "/profile",

    auth,

    admin,

    getAdminProfile

);

// ================= UPDATE PROFILE =================

router.put(

    "/profile",

    auth,

    admin,

    upload.single("profileImage"),

    updateAdminProfile

);
const {

    changePassword

} = require("../controllers/settingsController");

// ================= CHANGE PASSWORD =================

router.put(

    "/change-password",

    changePassword

);
const{



getDeliverySettings,

updateDeliverySettings

}=require("../controllers/settingsController");
router.get(

"/delivery",

getDeliverySettings

);

router.put(

"/delivery",

updateDeliverySettings

);

module.exports = router;