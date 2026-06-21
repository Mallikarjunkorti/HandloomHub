const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// Create Order
router.post("/", async (req, res) => {

    try {

        const order = new Order(req.body);

        await order.save();

        res.status(201).json({
            message: "Order Placed Successfully",
            order
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }

});

// Get All Orders
router.get("/", async (req, res) => {

    try {

        const orders = await Order.find();

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }

});

module.exports = router;