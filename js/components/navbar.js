// ======================================
// HandloomHub Navbar
// ======================================

// Current User
function getCurrentUser() {

    return JSON.parse(localStorage.getItem("loggedInUser"));

}

// ======================================
// Navbar Initialization
// ======================================

function initNavbar() {

    const user = getCurrentUser();

    // Navbar Elements

    const loginLink = document.getElementById("loginLink");
    const logoutLink = document.getElementById("logoutLink");
    const adminLink = document.getElementById("adminLink");

    const profileMenu = document.getElementById("profileMenu");

    const navbarUserName =
    document.getElementById("navbarUserName");

    const navbarProfilePhoto =
    document.getElementById("navbarProfilePhoto");

    const dropdownPhoto =
    document.getElementById("dropdownPhoto");

    const dropdownName =
    document.getElementById("dropdownName");

    const dropdownEmail =
    document.getElementById("dropdownEmail");

    const welcomeUser =
    document.getElementById("welcomeUser");

    // -------------------------
    // Logged In
    // -------------------------

    if(user){

        if(loginLink)
            loginLink.style.display="none";

        if(logoutLink)
            logoutLink.style.display="none";

        if(profileMenu)
            profileMenu.style.display="block";

        if(navbarUserName)
            navbarUserName.textContent=user.name;

        if(dropdownName)
            dropdownName.textContent=user.name;

        if(dropdownEmail)
            dropdownEmail.textContent=user.email;

        

        const savedPhoto=

        localStorage.getItem(

            `profilePhoto_${user.email}`

        );

        if(savedPhoto){

            if(navbarProfilePhoto)
                navbarProfilePhoto.src=savedPhoto;

            if(dropdownPhoto)
                dropdownPhoto.src=savedPhoto;

        }

    }

    

    // -------------------------
    // Logged Out
    // -------------------------

    else{

        if(loginLink)
            loginLink.style.display="block";

        if(logoutLink)
            logoutLink.style.display="none";

        if(profileMenu)
            profileMenu.style.display="none";

        if(welcomeUser)
            welcomeUser.textContent="";

    }

    // -------------------------
    // Admin
    // -------------------------

    if(adminLink){

        if(

            user &&

            user.email==="mallikarjunkorti40@gmail.com"

        ){

            adminLink.style.display="block";

        }

        else{

            adminLink.style.display="none";

        }

    }

    refreshNavbarCounts();

}

// ======================================
// Counts
// ======================================

function refreshNavbarCounts(){

    if(typeof updateCartCount==="function"){

        updateCartCount();

    }

    if(typeof updateWishlistCount==="function"){

        updateWishlistCount();

    }

}

// ======================================
// Logout
// ======================================

function logout(){

    localStorage.removeItem("loggedInUser");

    if(typeof showToast==="function"){

        showToast("👋 Logged Out Successfully");

    }

    setTimeout(function(){

        window.location.href="login.html";

    },600);

}

// ======================================
// Auto Init
// ======================================

document.addEventListener(

    "DOMContentLoaded",

    initNavbar

);

// ==============================
// Profile Dropdown
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    const trigger = document.querySelector(".profile-trigger");
    const dropdown = document.querySelector(".profile-dropdown");

    if (!trigger || !dropdown) return;

    trigger.addEventListener("click", function (e) {

        e.stopPropagation();

        dropdown.classList.toggle("show");

    });

    dropdown.addEventListener("click", function (e) {

        e.stopPropagation();

    });

    document.addEventListener("click", function () {

        dropdown.classList.remove("show");

    });

});