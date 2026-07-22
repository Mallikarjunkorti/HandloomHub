// ======================================
// HandloomHub Navbar
// ======================================

// Logged In User
function getCurrentUser() {
    return JSON.parse(localStorage.getItem("loggedInUser"));
}

// --------------------------------------
// Update Navbar
// --------------------------------------

function initNavbar() {

    const user = getCurrentUser();

    const loginLink = document.getElementById("loginLink");
    const logoutLink = document.getElementById("logoutLink");
    const adminLink = document.getElementById("adminLink");
    const welcomeUser = document.getElementById("welcomeUser");

    // Login / Logout

    if (loginLink)
        loginLink.style.display = user ? "none" : "block";

    if (logoutLink)
        logoutLink.style.display = user ? "block" : "none";

    // Welcome

    if (welcomeUser) {

        if (user) {

            welcomeUser.innerHTML = `Welcome, ${user.name}`;

        } else {

            welcomeUser.innerHTML = "";

        }

    }

    // Admin

    if (adminLink) {

        if (
            user &&
            user.email === "mallikarjunkorti40@gmail.com"
        ) {

            adminLink.style.display = "block";

        } else {

            adminLink.style.display = "none";

        }

    }

    refreshNavbarCounts();

}

// --------------------------------------
// Refresh Counts
// --------------------------------------

function refreshNavbarCounts() {

    if (typeof updateCartCount === "function") {

        updateCartCount();

    }

    if (typeof updateWishlistCount === "function") {

        updateWishlistCount();

    }

}

// --------------------------------------
// Logout
// --------------------------------------

function logout() {

    localStorage.removeItem("loggedInUser");

    if (typeof showToast === "function") {

        showToast("Logged Out Successfully 👋");

    }

    setTimeout(() => {

        window.location.href = "login.html";

    }, 500);

}

// --------------------------------------
// Auto Initialize
// --------------------------------------

document.addEventListener("DOMContentLoaded", initNavbar);