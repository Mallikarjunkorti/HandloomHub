const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    products: {
        type: Array,
        required: true
    },

    totalAmount: {
        type: Number,
        required: true
    },

    shippingAddress: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);