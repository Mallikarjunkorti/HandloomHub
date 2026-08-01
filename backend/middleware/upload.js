const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/products");

    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1E9);

        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );

    }

});

// Allow only image files
const fileFilter = (req, file, cb) => {

    if (file.mimetype.startsWith("image/")) {

        cb(null, true);

    } else {

        cb(new Error("Only image files are allowed"), false);

    }

};

const upload = multer({

    storage,
    fileFilter,
    limits: {

        fileSize: 5 * 1024 * 1024 // 5MB

    }

});

module.exports = upload;