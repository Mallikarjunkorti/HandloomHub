// ======================================
// Get Product ID
// ======================================

const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));

// ======================================
// Find Product
// ======================================

const product = products.find(p => p.id === productId);

if (!product) {

    window.location.href = "products.html";

}

// ======================================
// Fill Product Details
// ======================================

document.getElementById("productImage").src = product.image;

document.getElementById("productName").innerText = product.name;

document.getElementById("productPrice").innerText =
    "₹" + product.price.toLocaleString("en-IN");

document.getElementById("productRating").innerText =
    product.rating || 4.8;

document.getElementById("productReviews").innerText =
    product.reviews || 0;

document.getElementById("productDescription").innerText =
    product.description ||
    "Authentic handcrafted product made by skilled Indian artisans.";

document.getElementById("passportLink").href =
    `passport.html?id=${product.id}`;

// ======================================
// Add To Cart
// ======================================

document.getElementById("addToCartBtn")
.addEventListener("click", function () {

    const qty = Number(
        document.getElementById("quantity").value
    );

    addToCart(

        product.id,

        product.name,

        product.price,

        product.image,

        qty

    );

});

// ======================================
// Wishlist
// ======================================

document.getElementById("wishlistBtn")
.addEventListener("click", function () {

    addToWishlist(

        product.id,

        product.name,

        product.price,

        product.image

    );

});

// ======================================
// Buy Now
// ======================================

document.getElementById("buyNowBtn")
.addEventListener("click", function () {

    const qty = Number(
        document.getElementById("quantity").value
    );

    const buyNowProduct = {

        ...product,

        quantity: qty

    };

    localStorage.setItem(

        getBuyNowKey(),

        JSON.stringify(buyNowProduct)

    );

    window.location.href = "checkout.html";

});

// ======================================
// Similar Handloom Picks
// ======================================

const relatedContainer =
    document.getElementById("relatedProducts");

if (relatedContainer) {

    const relatedProducts = products
        .filter(item =>

            item.category === product.category &&

            item.id !== product.id

        )
        .slice(0, 4);

    relatedProducts.forEach(item => {

        relatedContainer.innerHTML +=
            createProductCard(item);

    });

}
