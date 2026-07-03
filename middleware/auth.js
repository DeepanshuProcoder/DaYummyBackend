
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    console.log("Authorization Header:", req.header("Authorization"));

    const token = req.header("Authorization");

    if (!token) {

        console.log("❌ No token received");

        return res.status(401).json({
            message: "Unauthorized"
        });

    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("✅ Decoded Token:", decoded);

        req.user = decoded;

        next();

    }

    catch (err) {

        console.log("❌ JWT Error:", err.message);

        return res.status(401).json({
            message: "Invalid Token"
        });

    }


    try{

        const decoded=jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        req.user=decoded;

        next();

    }

    catch(err){

        return res.status(401).json({

            message:"Invalid Token"

        });

    }

};