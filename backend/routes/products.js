const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const upload = require("../middleware/upload");

// GET all products
router.get("/", async (req, res) => {

    try {

        const products = await Product.find();

        res.json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }

});

// POST product
router.post("/", upload.array("images", 5), async (req, res) => {

    try {

        const imagePaths = req.files
            ? req.files.map(file => `/uploads/products/${file.filename}`)
            : [];

        const product = new Product({

            ...req.body,

            image: imagePaths.length > 0 ? imagePaths[0] : "",

            images: imagePaths

        });

        await product.save();

        res.status(201).json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
//DELETE product
router.delete("/:id", async (req, res) => {

    try {

        const deletedProduct =
            await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {

            return res.status(404).json({
                message: "Product not found"
            });

        }

        res.json({
            message: "Product Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// GET Single Product
router.get("/:id", async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

router.put("/:id", upload.array("images", 5), async (req, res) => {

    try {
         const updateData = {
        ...req.body
    };

    if (req.files && req.files.length > 0) {

        const imagePaths = req.files.map(
        file => `/uploads/products/${file.filename}`
     );

     updateData.image = imagePaths[0];
     updateData.images = imagePaths;
    }
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedProduct) {

            return res.status(404).json({
                message: "Product not found"
            });

        }

        res.json(updatedProduct);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;