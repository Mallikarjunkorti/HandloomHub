// ===============================
// User Storage Helper
// ===============================

function getLoggedInUser() {

    return JSON.parse(localStorage.getItem("loggedInUser"));

}

// ===============================
// Cart
// ===============================

function getCartKey() {

    const user = getLoggedInUser();

    return user
        ? `cart_${user.email}`
        : "cart_guest";

}

// ===============================
// Wishlist
// ===============================

function getWishlistKey() {

    const user = getLoggedInUser();

    return user
        ? `wishlist_${user.email}`
        : "wishlist_guest";

}

// ===============================
// Orders
// ===============================

function getOrdersKey() {

    const user = getLoggedInUser();

    return user
        ? `orders_${user.email}`
        : "orders_guest";

}

// ===============================
// Buy Now
// ===============================

function getBuyNowKey() {

    const user = getLoggedInUser();

    return user
        ? `buyNow_${user.email}`
        : "buyNow_guest";

}