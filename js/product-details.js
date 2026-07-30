const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

let product = null;

async function loadProduct() {

    try {

        const response = await fetch("http://localhost:5000/api/products");
        const products = await response.json();

        product = products.find(p => p._id === productId);

        if (!product) {
            alert("Product not found");
            window.location.href = "products.html";
            return;
        }

        // Compatibility values
        product.id = product._id;
        product.rating = product.rating || 4.5;
        product.reviews = product.reviews || 0;

        // Image path
        if (!product.image.startsWith("http")) {
            product.image = "images/products/" + product.image;
        }

        // Fill page
        document.getElementById("productImage").src = product.image;
        document.getElementById("productName").textContent = product.name;
        document.getElementById("productPrice").textContent = "₹" + product.price.toLocaleString("en-IN");
        document.getElementById("productRating").textContent = product.rating;
        document.getElementById("productReviews").textContent = product.reviews;
        document.getElementById("productDescription").textContent =
            product.description || "Authentic handcrafted product.";

        document.getElementById("passportLink").href =
            `passport.html?id=${product.id}`;

    } catch (err) {
        console.error(err);
    }

}

loadProduct();