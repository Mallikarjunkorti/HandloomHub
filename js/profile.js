
document.addEventListener("DOMContentLoaded", function () {
// ==========================================
// PROFILE PAGE
// ==========================================

// Logged In User
const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {

    window.location.href = "login.html";

}

// -----------------------------
// Load User Details
// -----------------------------

document.getElementById("profileName").textContent =
    user.name || "User";

document.getElementById("profileEmail").textContent =
    user.email || "No Email";

document.querySelector(".dashboard h2").textContent =
    `👋 Welcome Back, ${user.name}!`;

// -----------------------------
// User Specific Storage
// -----------------------------

const cart =
JSON.parse(localStorage.getItem(`cart_${user.email}`)) || [];

const wishlist =
JSON.parse(localStorage.getItem(`wishlist_${user.email}`)) || [];

const orders =
JSON.parse(localStorage.getItem(`orders_${user.email}`)) || [];

// -----------------------------
// Dashboard Counts
// -----------------------------

document.getElementById("cartCountProfile").textContent =
cart.length;

document.getElementById("wishlistCountProfile").textContent =
wishlist.length;

document.getElementById("ordersCount").textContent =
orders.length;

// ==========================================
// EDIT PROFILE
// ==========================================

const modal =
document.getElementById("editProfileModal");

const editBtn =
document.getElementById("editProfileBtn");

const closeBtn =
document.getElementById("closeProfileModal");

// Open

editBtn.onclick = () => {

    document.getElementById("editName").value =
        user.name || "";

    document.getElementById("editEmail").value =
        user.email || "";

    document.getElementById("editPhone").value =
        user.phone || "";

    document.getElementById("editGender").value =
        user.gender || "";

    document.getElementById("editDOB").value =
        user.dob || "";

    modal.style.display = "block";

};

// Close

closeBtn.onclick = () => {

    modal.style.display = "none";

};

window.onclick = (e) => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

};

// Save

document
.getElementById("profileForm")
.addEventListener("submit", function (e) {

    e.preventDefault();

    user.name =
    document.getElementById("editName").value;

    user.phone =
    document.getElementById("editPhone").value;

    user.gender =
    document.getElementById("editGender").value;

    user.dob =
    document.getElementById("editDOB").value;

    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
    );

    document.getElementById("profileName").textContent =
        user.name;

    document.querySelector(".dashboard h2").textContent =
        `👋 Welcome Back, ${user.name}!`;

    modal.style.display = "none";

    showToast("✅ Profile Updated Successfully!");

});

// ==========================================
// ADDRESS MODULE
// ==========================================

const addressModal = document.getElementById("addressModal");
const addressCard = document.getElementById("addressCard");
const closeAddressModal = document.getElementById("closeAddressModal");

// Open Address Modal
addressCard.onclick = function (e) {

    e.preventDefault();

    const addressKey = `address_${user.email}`;
    const savedAddress = JSON.parse(localStorage.getItem(addressKey));

    if (savedAddress) {

        document.getElementById("fullName").value = savedAddress.fullName || "";
        document.getElementById("phone").value = savedAddress.phone || "";
        document.getElementById("address").value = savedAddress.address || "";
        document.getElementById("city").value = savedAddress.city || "";
        document.getElementById("state").value = savedAddress.state || "";
        document.getElementById("pincode").value = savedAddress.pincode || "";

    } else {

        document.getElementById("fullName").value = user.name || "";
        document.getElementById("phone").value = user.phone || "";

    }

    addressModal.style.display = "block";

};

// Close Modal
closeAddressModal.onclick = function () {

    addressModal.style.display = "none";

};

// Close when clicking outside
window.addEventListener("click", function (e) {

    if (e.target === addressModal) {

        addressModal.style.display = "none";

    }

});

// Save Address

document.getElementById("addressForm").addEventListener("submit", function (e) {

    e.preventDefault();

    const addressData = {

        fullName: document.getElementById("fullName").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        pincode: document.getElementById("pincode").value

    };

    localStorage.setItem(

        `address_${user.email}`,

        JSON.stringify(addressData)

    );

    addressModal.style.display = "none";

    showToast("📍 Address Saved Successfully!");

    loadSavedAddress();
});

// ==========================================
// LOAD SAVED ADDRESS
// ==========================================

function loadSavedAddress() {

    const addressKey = `address_${user.email}`;

    const address = JSON.parse(localStorage.getItem(addressKey));

    const container = document.getElementById("savedAddress");

    if (!container) return;

    if (!address) {

        container.innerHTML = "<p>No address added yet.</p>";

        return;

    }

    container.innerHTML = `

        <strong>${address.fullName}</strong><br>

        ${address.phone}<br><br>

        ${address.address}<br>

        ${address.city}, ${address.state}<br>

        ${address.pincode}

        <div class="address-actions">

            <button
                class="edit-address"
                onclick="document.getElementById('addressCard').click()">

                Edit

            </button>

            <button
                class="delete-address"
                onclick="deleteAddress()">

                Delete

            </button>

        </div>

    `;

}

window.deleteAddress = function () {

    if (!confirm("Delete this address?")) return;

    localStorage.removeItem(`address_${user.email}`);

    loadSavedAddress();

    showToast("🗑️ Address Deleted Successfully!");

};

loadSavedAddress();

// ==========================================
// PROFILE PHOTO
// ==========================================

const profilePhoto =
document.getElementById("profilePhoto");

const photoInput =
document.getElementById("photoInput");

// Click Image

profilePhoto.onclick = function(){

    photoInput.click();

};

// Upload

photoInput.addEventListener("change",function(){

    const file=this.files[0];

    if(!file) return;

    const reader=new FileReader();

    reader.onload=function(e){

        const image=e.target.result;

        profilePhoto.src=image;

        localStorage.setItem(

            `profilePhoto_${user.email}`,

            image

        );

        showToast("📷 Profile Photo Updated!");

    };

    reader.readAsDataURL(file);

});

// Load Saved Photo

const savedPhoto=

localStorage.getItem(`profilePhoto_${user.email}`);

if(savedPhoto){

    profilePhoto.src=savedPhoto;

}

});