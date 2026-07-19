// ======================================
// Render All Products
// ======================================

function renderProducts() {

    const productsGrid = document.getElementById("productsGrid");

    if (!productsGrid) return;

    productsGrid.innerHTML = "";

    products.forEach(product => {

        productsGrid.innerHTML += createProductCard(product);

    });

}

renderProducts();

// ==============================
// Product Button Events
// ==============================

document.addEventListener("click", function (e) {

    // Add to Cart
    if (e.target.classList.contains("cart-btn")) {

        const id = Number(e.target.dataset.id);

        const product = products.find(p => p.id === id);

        if (!product) return;

        addToCart(
            product.id,
            product.name,
            product.price,
            product.image
        );

    }

    // Wishlist
    if (e.target.classList.contains("wishlist-btn")) {

        const id = Number(e.target.dataset.id);

        const product = products.find(p => p.id === id);

        if (!product) return;

        addToWishlist(
            product.id,
            product.name,
            product.price,
            product.image
        );

    }

});

document.addEventListener("click", function (e) {

    // Add to Cart
    if (e.target.classList.contains("cart-btn")) {

        const id = Number(e.target.dataset.id);

        const product = products.find(p => p.id === id);

        if (!product) return;

        addToCart(
            product.id,
            product.name,
            product.price,
            product.image
        );
    }

    // Wishlist
    if (e.target.classList.contains("wishlist-btn")) {

        const id = Number(e.target.dataset.id);

        const product = products.find(p => p.id === id);

        if (!product) return;

        addToWishlist(
            product.id,
            product.name,
            product.price,
            product.image
        );
    }

    // Buy Now
    if (e.target.classList.contains("buy-btn")) {

    const id = Number(e.target.dataset.id);

    const product = products.find(p => p.id === id);

    if (!product) return;

    const buyNowProduct = {
        ...product,
        quantity: 1
    };

    localStorage.setItem(
        getBuyNowKey(),
        JSON.stringify(buyNowProduct)
    );

    window.location.href = "checkout.html";
}

});