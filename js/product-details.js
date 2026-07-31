const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

let product = null;

async function loadProduct() {

    try {

        const response = await fetch(
            `http://localhost:5000/api/products/${productId}`
        );

        if (!response.ok) {

            throw new Error("Product not found");

        }

        product = await response.json();

        // Compatibility
        product.id = product._id;
        product.rating = product.rating || 4.5;
        product.reviews = product.reviews || 0;
        product.badge = product.badge || "";

        // Image
        if (
            product.image &&
            !product.image.startsWith("http") &&
            !product.image.startsWith("/")
        ) {
            product.image = "images/products/" + product.image;
        }

        // Fill page
        document.getElementById("productImage").src = product.image;
        document.getElementById("productName").textContent = product.name;
        document.getElementById("productPrice").textContent =
            "₹" + product.price.toLocaleString("en-IN");

        document.getElementById("productRating").textContent =
            product.rating;

        document.getElementById("productReviews").textContent =
            product.reviews;

        document.getElementById("productDescription").textContent =
            product.description || "Authentic handcrafted product.";

        // Badge (if your HTML has this element)
        const badge = document.getElementById("productBadge");
        if (badge) {
            badge.textContent = product.badge;
            badge.style.display = product.badge ? "inline-block" : "none";
        }

        // Passport button
        document.getElementById("passportLink").href =
            `passport.html?id=${product._id}`;

    } catch (error) {

        console.error(error);

        alert("Product not found");

        window.location.href = "products.html";

    }

}

loadProduct();