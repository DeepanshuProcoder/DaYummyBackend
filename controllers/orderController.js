const Order = require("../models/Order");
const Coupon = require("../models/Coupon");
const CouponUsage = require("../models/CouponUsage");
exports.placeOrder = async (req, res) => {


    try {

        const {

            user,

            items,

            totalPrice,

            paymentMethod,

            coupon,

            couponCode,

            discount

        } = req.body;

        // Find latest order

        const lastOrder = await Order.findOne()

            .sort({ createdAt: -1 });

        let nextNumber = 1;

        if (lastOrder) {

            nextNumber =

                parseInt(

                    lastOrder.orderId.replace("DYM", "")

                ) + 1;

        }

        const orderId =

            "DYM" +

            String(nextNumber).padStart(6, "0");

        const order = await Order.create({

    orderId,

    user,

    customerName: req.body.customerName,

    phone: req.body.phone,

    address: req.body.address,

    items,

    totalPrice,

    paymentMethod,

    coupon,

    couponCode,

    discount,

    cancelUntil: new Date(Date.now() + 60000)

});
// ================= UPDATE COUPON USAGE =================

if (coupon) {

    await Coupon.findByIdAndUpdate(

        coupon,

        {

            $inc: {

                usedCount: 1

            }

        }

    );

    let usage = await CouponUsage.findOne({

        user,

        coupon

    });

    if (!usage) {

        usage = await CouponUsage.create({

            user,

            coupon,

            timesUsed: 1

        });

    }

    else {

        usage.timesUsed++;

        await usage.save();

    }

}

        res.status(201).json({

            success: true,

            message: "Order Placed Successfully",

            order

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
exports.getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({

            user: req.params.userId

        }).sort({

            createdAt: -1

        });

        res.status(200).json({

            success: true,

            orders

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
exports.getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find()

            .populate("user")

            .sort({

                createdAt: -1

            });

        res.status(200).json({

            success: true,

            orders

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
exports.updateOrderStatus = async (req, res) => {

    try {

        const order = await Order.findByIdAndUpdate(

            req.params.id,

            {

                orderStatus: req.body.orderStatus

            },

            {

                new: true

            }

        );

        res.status(200).json({

            success: true,

            order

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
exports.cancelOrder = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found"

            });

        }

        const oneMinute = 60 * 1000;

        const timePassed =

            Date.now() -

            new Date(order.createdAt).getTime();

        if (

            timePassed > oneMinute ||

            order.orderStatus !== "Pending"

        ) {

            return res.status(400).json({

                success: false,

                message:

                    "Order can no longer be cancelled."

            });

        }

        order.orderStatus = "Cancelled";

        await order.save();

        res.json({

            success: true,

            message: "Order Cancelled Successfully"

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
exports.deleteOrder = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found."

            });

        }

        if (order.orderStatus !== "Cancelled") {

            return res.status(400).json({

                success: false,

                message: "Only cancelled orders can be deleted."

            });

        }

        await Order.findByIdAndDelete(req.params.id);

        res.json({

            success: true,

            message: "Order deleted successfully."

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};