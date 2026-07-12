console.log("script.js loaded");

// =========================
// Logged In User
// =========================

const user = JSON.parse(localStorage.getItem("loggedInUser"));


// =========================
// Navbar Links
// =========================

const loginLink = document.getElementById("loginLink");
const logoutLink = document.getElementById("logoutLink");
const adminLink = document.getElementById("adminLink");

// Hide Admin by default
if (adminLink) {
    adminLink.style.display = "none";
}

if (user) {

    if (loginLink)
        loginLink.style.display = "none";

    if (logoutLink)
        logoutLink.style.display = "block";

    // Show Admin only for Admin account
    if (
        adminLink &&
        user.email === "mallikarjunkorti40@gmail.com"
    ) {
        adminLink.style.display = "block";
    }

} else {

    if (loginLink)
        loginLink.style.display = "block";

    if (logoutLink)
        logoutLink.style.display = "none";

    if (adminLink)
        adminLink.style.display = "none";
}


// =========================
// Product Search
// =========================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        let filter = searchInput.value.toLowerCase();

        let products =
            document.querySelectorAll(".product-card");

        products.forEach(product => {

            let text =
                product.textContent.toLowerCase();

            product.style.display =
                text.includes(filter) ? "" : "none";

        });

    });

}


// =========================
// Add To Cart
// =========================

function addToCart(name, price, image) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem =
        cart.find(item => item.name === name);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name,
            price,
            image,
            quantity: 1
        });

    }

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

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let cartItems =
        document.getElementById("cartItems");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        let itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        cartItems.innerHTML += `

        <tr>

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

        </tr>

        `;

    });

    let grandTotal =
        document.getElementById("grandTotal");

    if (grandTotal) {

        grandTotal.innerText =
            "Grand Total: ₹" + total;

    }

    updateCartCount();

}


// =========================
// Increase Quantity
// =========================

function increaseQty(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity++;

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();

}


// =========================
// Decrease Quantity
// =========================

function decreaseQty(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();

}


// =========================
// Remove Item
// =========================

function removeItem(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();

    updateCartCount();

}


// =========================
// Cart Count
// =========================

function updateCartCount() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let totalItems = 0;

    cart.forEach(item => {

        totalItems += item.quantity;

    });

    let cartCount =
        document.getElementById("cartCount");

    if (cartCount) {

        cartCount.innerText = totalItems;

    }

}


// =========================
// Logout
// =========================

function logout() {

    localStorage.removeItem("loggedInUser");

    alert("Logged Out Successfully");

    window.location.href = "login.html";

}


// =========================
// Auto Run
// =========================

document.addEventListener("DOMContentLoaded", function () {

    loadCart();

    updateCartCount();

});