// ===============================
// User Storage Helper
// ===============================

function getLoggedInUser() {

    return JSON.parse(localStorage.getItem("loggedInUser"));

}

function getCartKey() {

    const user = getLoggedInUser();

    return user
        ? `cart_${user.email}`
        : "cart_guest";

}

function getWishlistKey() {

    const user = getLoggedInUser();

    return user
        ? `wishlist_${user.email}`
        : "wishlist_guest";

}

function getOrdersKey() {

    const user = getLoggedInUser();

    return user
        ? `orders_${user.email}`
        : "orders_guest";

}