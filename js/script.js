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

    loadWishlist();

    updateCartCount();

    updateWishlistCount();

});
