// ======================================
// Product Events
// ======================================

document.addEventListener("click", function (e) {

    // ------------------------
    // Add To Cart
    // ------------------------

   if (e.target.classList.contains("cart-btn")) {

    const id = e.target.dataset.id;

    console.log("Button ID:", id);
    console.log("Products:", products);

    const product = products.find(p => p.id == id);

    console.log("Found Product:", product);

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

    console.log("Wishlist button clicked");

    const id = e.target.dataset.id;

    const product = products.find(p => p.id == id);

    console.log(product);

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

        const id = e.target.dataset.id;

        const product = products.find(p => p.id == id);

        if (!product) return;

        localStorage.setItem(
            getBuyNowKey(),
            JSON.stringify({
                ...product,
                quantity: 1
            })
        );

        window.location.href = "checkout.html";
    }

});