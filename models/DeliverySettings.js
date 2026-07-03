const mongoose = require("mongoose");

const deliverySettingsSchema = new mongoose.Schema({

    freeDeliveryAbove:{

        type:Number,

        default:499

    },

    deliveryCharge:{

        type:Number,

        default:40

    },

    estimatedDeliveryTime:{

        type:Number,

        default:30

    }

},{
    timestamps:true
});

module.exports = mongoose.model(
    "DeliverySettings",
    deliverySettingsSchema
);