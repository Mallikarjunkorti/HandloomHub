console.log("script.js loaded");
// =========================
// Product Search
// =========================
const user = JSON.parse(
    localStorage.getItem("loggedInUser")
);

const adminLink =
    document.getElementById("adminLink");

if (
    user &&
    user.email === "mallikarjunkorti40@gmail.com"
) {
    adminLink.style.display = "block";
}

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

    let cart =
        JSON.parse(localStorage.getItem("cart"))
        || [];

    cart.push({
        name,
        price,
        image,
        quantity: 1
    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

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

// =========================
// Logout Link Visibility
// =========================

const logoutLink =
    document.getElementById("logoutLink");

if (
    logoutLink &&
    localStorage.getItem("loggedInUser")
) {
    logoutLink.style.display = "block";
}

// =========================
// Logout Function
// =========================

function logout() {

    const loggedInUser =
        localStorage.getItem("loggedInUser");

    if (!loggedInUser) {

        alert("No user is currently logged in.");
        return;

    }

    localStorage.removeItem("loggedInUser");

    alert("Logged Out Successfully");

    window.location.href = "login.html";

}