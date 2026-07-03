const User = require("../models/User");
const bcrypt = require("bcryptjs");
const DeliverySettings = require("../models/DeliverySettings"); 
const OrderSettings = require("../models/OrderSettings");
// ================= CHANGE PASSWORD =================

exports.changePassword = async (req, res) => {

    try {

        const {

            userId,

            currentPassword,

            newPassword,

            confirmPassword

        } = req.body;

        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {

            return res.status(400).json({

                success: false,

                message: "All fields are required."

            });

        }

        if (newPassword !== confirmPassword) {

            return res.status(400).json({

                success: false,

                message: "Passwords do not match."

            });

        }

        if (newPassword.length < 6) {

            return res.status(400).json({

                success: false,

                message: "Password must be at least 6 characters."

            });

        }

        const user = await User.findById(userId);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found."

            });

        }

        const match = await bcrypt.compare(

            currentPassword,

            user.password

        );

        if (!match) {

            return res.status(400).json({

                success: false,

                message: "Current password is incorrect."

            });

        }

        if (currentPassword === newPassword) {

            return res.status(400).json({

                success: false,

                message: "New password cannot be same as current password."

            });

        }

        const hashedPassword = await bcrypt.hash(

            newPassword,

            10

        );

        user.password = hashedPassword;

        await user.save();

        return res.json({

            success: true,

            message: "Password changed successfully."

        });

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
// ================= GET DELIVERY SETTINGS =================

exports.getDeliverySettings = async (req,res)=>{

    try{

        let settings=await DeliverySettings.findOne();

        if(!settings){

            settings=await DeliverySettings.create({});

        }

        res.json({

            success:true,

            settings

        });

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

// ================= UPDATE DELIVERY SETTINGS =================

exports.updateDeliverySettings=async(req,res)=>{

    try{

        let settings=await DeliverySettings.findOne();

        if(!settings){

            settings=await DeliverySettings.create({});

        }

        settings.freeDeliveryAbove=req.body.freeDeliveryAbove;

        settings.deliveryCharge=req.body.deliveryCharge;

        settings.estimatedDeliveryTime=req.body.estimatedDeliveryTime;

        await settings.save();

        res.json({

            success:true,

            message:"Delivery Settings Updated."

        });

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};
// ================= GET ADMIN PROFILE =================

exports.getAdminProfile = async (req, res) => {

    try {

        const admin = await User.findById(req.user.id)

            .select("-password");

        if (!admin) {

            return res.status(404).json({

                success: false,

                message: "Admin not found."

            });

        }

        res.json({

            success: true,

            admin

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

// ================= UPDATE ADMIN PROFILE =================

exports.updateAdminProfile = async (req, res) => {

    try {

        const admin = await User.findById(req.user.id);

        if (!admin) {

            return res.status(404).json({

                success: false,

                message: "Admin not found."

            });

        }

        admin.fullName = req.body.fullName;

        admin.mobile = req.body.mobile;

        if (req.file) {

            admin.profileImage = "uploads/" + req.file.filename;

        }
console.log(admin);
        await admin.save();
        const data = admin.toObject();

console.log(data);

        console.log("✅ Sending Success Response");

        return res.json({

    success: true,

    message: "Profile Updated Successfully",
    admin:data

  

});

    }

    catch (err) {

    console.error(err);

    if (res.headersSent) {

        return;

    }

    return res.status(500).json({

        success: false,

        message: err.message

    });

}

};
// ================= GET ORDER SETTINGS =================

exports.getOrderSettings = async (req,res)=>{

    try{

        let settings=await OrderSettings.findOne();

        if(!settings){

            settings=await OrderSettings.create({});

        }

        res.json({

            success:true,

            settings

        });

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

// ================= UPDATE ORDER SETTINGS =================

exports.updateOrderSettings=async(req,res)=>{

    try{

        let settings=await OrderSettings.findOne();

        if(!settings){

            settings=await OrderSettings.create({});

        }

        settings.cancelTime=req.body.cancelTime;

        settings.allowCOD=req.body.allowCOD;

        settings.allowOnline=req.body.allowOnline;

        settings.autoConfirm=req.body.autoConfirm;

        settings.minimumOrder=req.body.minimumOrder;

        settings.maxOrders=req.body.maxOrders;

        await settings.save();

        res.json({

            success:true,

            message:"Order Settings Updated Successfully."

        });

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};