const express = require("express");
const auth = require("../middleware/auth");

const admin = require("../middleware/admin");
const router = express.Router();
const upload = require("../middleware/upload");




const {

    addProduct,

    getProducts,

    searchProducts,

    getProductById,

    updateProduct,

    deleteProduct

} = require("../controllers/productController");
router.get("/",
   
    getProducts);
router.get("/:id",
    
    getProductById);

router.put(

    "/:id",
    

    upload.single("image"),

    updateProduct

);

router.delete("/:id",
   
    deleteProduct);
router.post(

    "/add",
    auth,
    admin,

    upload.single("image"),

    addProduct

);
router.get("/search",
    
    searchProducts);
module.exports = router;