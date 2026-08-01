function getProductImage(product) {

    if (!product) {
        return "images/no-image.png";
    }

    // New uploaded images
    if (product.image && product.image.startsWith("/uploads")) {

        return "http://localhost:5000" + product.image;

    }

    // Old local images
    if (
        product.image &&
        !product.image.startsWith("http") &&
        !product.image.startsWith("/")
    ) {

        return "images/products/" + product.image;

    }

    // Already full URL
    return product.image;

}