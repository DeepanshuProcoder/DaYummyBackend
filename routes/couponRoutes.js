const express = require("express");

const router = express.Router();

const couponController = require("../controllers/couponController");

// Create Coupon
router.post("/", couponController.addCoupon);

// Get All Coupons
router.get("/", couponController.getCoupons);

// Update Coupon
router.put("/:id", couponController.updateCoupon);

// Delete Coupon
router.delete("/:id", couponController.deleteCoupon);

// Enable / Disable Coupon
router.put("/toggle/:id", couponController.toggleCoupon);

// Validate Coupon
router.post("/validate", couponController.validateCoupon);
router.get("/available", couponController.getAvailableCoupons);

module.exports = router;