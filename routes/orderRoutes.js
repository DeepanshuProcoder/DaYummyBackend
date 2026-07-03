const express = require("express");

const router = express.Router();

const {

    placeOrder,

    getMyOrders,

    getAllOrders,

    updateOrderStatus,
    cancelOrder,
    deleteOrder

} = require("../controllers/orderController");

router.post("/", placeOrder);

router.get("/my/:userId", getMyOrders);

router.get("/", getAllOrders);

router.put("/:id", updateOrderStatus);
router.put(
    "/cancel/:id",
    cancelOrder
);
router.delete(
    "/:id",
    deleteOrder
);

module.exports = router;