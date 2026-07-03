const Product = require("../models/Product");

exports.addProduct = async (req, res) => {

    try {

        const {

            name,

            price,

            description,

            category,

            available

        } = req.body;

        const product = await Product.create({

            name,

            price,

            description,

            category,

            available,

            image: req.file.filename

        });

        res.status(201).json({

            success: true,

            product

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
exports.getProducts = async (req, res) => {

    try {

        const products = await Product.find().sort({ createdAt: -1 });

        return res.status(200).json({

            success: true,

            products

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

exports.searchProducts = async (req, res) => {

    try {

        const keyword = req.query.search || "";

        const products = await Product.find({

            name: {

                $regex: keyword,

                $options: "i"

            }

        });

        return res.status(200).json({

            success: true,

            products

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
exports.getProductById = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product not found"

            });

        }

        res.status(200).json({

            success: true,

            product

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
exports.updateProduct = async (req, res) => {

    try {

        const updateData = {

            name: req.body.name,

            price: req.body.price,

            description: req.body.description,

            category: req.body.category,

            available: req.body.available

        };

        if (req.file) {

            updateData.image = req.file.filename;

        }

        const product = await Product.findByIdAndUpdate(

            req.params.id,

            updateData,

            {

                new: true

            }

        );

        res.status(200).json({

            success: true,

            product

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
exports.deleteProduct = async (req, res) => {

    try {

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({

            success: true,

            message: "Product Deleted"

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};