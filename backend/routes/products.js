const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

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
router.post("/", async (req, res) => {

    try {

        const product = new Product(req.body);

        await product.save();

        res.status(201).json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }

});
router.delete("/:id", async (req, res) => {

    try {

        await Product.findByIdAndDelete(req.params.id);

        res.json({
            message: "Product Deleted Successfully"
        });

    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;