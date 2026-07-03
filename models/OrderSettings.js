const mongoose = require("mongoose");

const orderSettingsSchema = new mongoose.Schema({

    cancelTime:{

        type:Number,

        default:60

    },

    allowCOD:{

        type:Boolean,

        default:true

    },

    allowOnline:{

        type:Boolean,

        default:true

    },

    autoConfirm:{

        type:Boolean,

        default:false

    },

    minimumOrder:{

        type:Number,

        default:99

    },

    maxOrders:{

        type:Number,

        default:100

    }

},{
    timestamps:true
});

module.exports = mongoose.model(
    "OrderSettings",
    orderSettingsSchema
);