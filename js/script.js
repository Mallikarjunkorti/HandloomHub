console.log("script.js loaded");
// =========================
// Product Search
// =========================

const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("keyup", function () {

        let filter = searchInput.value.toLowerCase();

        let products = document.querySelectorAll(".product-card");

        products.forEach(product => {

            let text = product.textContent.toLowerCase();

            if (text.includes(filter)) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }

        });
    });
}

// =========================
// Add To Cart
// =========================

function addToCart(name, price, image) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingProduct = cart.find(
        item => item.name === name
    );

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert("Product Added To Cart!");
}

// =========================
// Load Cart
// =========================

function loadCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartItems = document.getElementById("cartItems");

    if (!cartItems) return;

    let total = 0;

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        let itemTotal = item.price * item.quantity;

        total += itemTotal;

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>
            <td>₹${item.price}</td>

            <td>
                <button onclick="decreaseQty(${index})">-</button>
                ${item.quantity}
                <button onclick="increaseQty(${index})">+</button>
            </td>

            <td>₹${itemTotal}</td>

            <td>
                <button onclick="removeItem(${index})">
                    Remove
                </button>
            </td>
        `;

        cartItems.appendChild(row);

    });

    let grandTotal = document.getElementById("grandTotal");

    if (grandTotal) {
        grandTotal.innerText = `Grand Total: ₹${total}`;
    }

    updateCartCount();
}

// =========================
// Increase Quantity
// =========================

function increaseQty(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}

// =========================
// Decrease Quantity
// =========================

function decreaseQty(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}

// =========================
// Remove Item
// =========================

function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();

    updateCartCount();
}

// =========================
// Cart Count
// =========================

function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
    });

    let cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.innerText = totalItems;
    }
}

// =========================
// Auto Run
// =========================

document.addEventListener("DOMContentLoaded", function () {
    loadCart();
    updateCartCount();
});