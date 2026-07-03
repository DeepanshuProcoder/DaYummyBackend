const mongoose = require("mongoose");
const Product = require("../models/Product");
const products = require("./products");

async function seed() {

    try {

        await mongoose.connect("mongodb://localhost:27017/FoodWebsite");

        console.log("MongoDB Connected");

        await Product.deleteMany();

        console.log("Old Products Deleted");

        await Product.insertMany(products);

        console.log(`${products.length} Products Added Successfully`);

        process.exit(0);

    }

    catch (err) {

        console.log(err);

        process.exit(1);

    }

}

seed();