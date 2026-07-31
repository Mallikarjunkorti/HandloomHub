const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    // =========================
    // Basic Product Info
    // =========================

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    // =========================
    // Product Display
    // =========================

    featured: {
        type: Boolean,
        default: false
    },

    rating: {
        type: Number,
        default: 4.5
    },

    reviews: {
        type: Number,
        default: 0
    },

    badge: {
        type: String,
        default: ""
    },

    // =========================
    // Digital Passport
    // =========================

    artisanName: {
        type: String,
        default: ""
    },

    experience: {
        type: String,
        default: ""
    },

    village: {
        type: String,
        default: ""
    },

    district: {
        type: String,
        default: ""
    },

    state: {
        type: String,
        default: ""
    },

    technique: {
        type: String,
        default: ""
    },

    days: {
        type: String,
        default: ""
    },

    certificate: {
        type: String,
        default: ""
    },

    issueDate: {
        type: String,
        default: ""
    },

    environment: [{
        type: String
    }],

    map: {
        type: String,
        default: ""
    },

    video: {
        type: String,
        default: ""
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);