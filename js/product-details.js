// ===============================
// Product Data
// ===============================

const products = [

{
    id: 1,
    name: "Mysore Silk Saree",
    price: 4999,
    image: "images/mysore-silk.jpg",
    description:
        "Premium Mysore Silk Saree crafted with traditional handloom techniques. Soft texture and elegant design.",
    passport: "passport.html?id=1"
},

{
    id: 2,
    name: "Banarasi Saree",
    price: 6499,
    image: "images/banarasi.jpg",
    description:
        "Beautiful Banarasi Saree woven with rich zari work, perfect for weddings and festive occasions.",
    passport: "passport.html?id=2"
},

{
    id: 3,
    name: "Cotton Fabric",
    price: 899,
    image: "images/cotton-fabric.jpg",
    description:
        "Soft premium handloom cotton fabric suitable for dresses, kurtis and home décor.",
    passport: "passport.html?id=3"
},

{
    id: 4,
    name: "Kurti Material",
    price: 1299,
    image: "images/kurti.jpg",
    description:
        "Premium handloom kurti material made with natural cotton for daily and festive wear.",
    passport: "passport.html?id=4"
}

];

// ===============================
// Get Product ID
// ===============================

const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));

const product = products.find(p => p.id === productId);

// ===============================
// Load Product
// ===============================

if (product) {

    document.getElementById("productImage").src =
        product.image;

    document.getElementById("productName").innerText =
        product.name;

    document.getElementById("productPrice").innerText =
        "₹" + product.price;

    document.getElementById("productDescription").innerText =
        product.description;

    document.getElementById("passportLink").href =
        product.passport;

}

// ===============================
// Add To Cart
// ===============================

document.getElementById("addToCartBtn")
.addEventListener("click", function () {

    const qty =
        Number(document.getElementById("quantity").value);

    addToCart(

        product.id,

        product.name,

        product.price,

        product.image,

        qty

    );

});

// ===============================
// Wishlist
// ===============================

document.getElementById("wishlistBtn")
.addEventListener("click", function () {

    addToWishlist(

        product.id,

        product.name,

        product.price,

        product.image

    );

});

// ===============================
// Buy Now
// ===============================

document.getElementById("buyNowBtn")
.addEventListener("click", function () {

    const qty =
        Number(document.getElementById("quantity").value);

    const buyNowProduct = {

        id: product.id,

        name: product.name,

        price: product.price,

        image: product.image,

        quantity: qty

    };

    localStorage.setItem(
    getBuyNowKey(),
    JSON.stringify(buyNowProduct)
    );

    window.location.href = "checkout.html";

});