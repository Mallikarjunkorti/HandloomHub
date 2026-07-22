// ======================================
// Product Events
// ======================================

document.addEventListener("click", function (e) {

    // ------------------------
    // Add To Cart
    // ------------------------

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

        return;
    }

    // ------------------------
    // Wishlist
    // ------------------------

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

        return;
    }

    // ------------------------
    // Buy Now
    // ------------------------

    if (e.target.classList.contains("buy-btn")) {

        const id = Number(e.target.dataset.id);

        const product = products.find(p => p.id === id);

        if (!product) return;

        localStorage.setItem(

            getBuyNowKey(),

            JSON.stringify({

                ...product,

                quantity:1

            })

        );

        window.location.href="checkout.html";

    }

});