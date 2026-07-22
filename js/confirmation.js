// ===============================
// Load Last Order
// ===============================

const currentUser = getLoggedInUser();

if (!currentUser) {

    window.location.href = "login.html";

}

const order = JSON.parse(
    localStorage.getItem("lastOrder_" + currentUser.email)
);

if (!order) {

    showToast("No Order Found!");

    window.location.href = "products.html";

}

// ===============================
// Display Order
// ===============================

document.getElementById("orderId").innerText =
    order.orderId;

document.getElementById("orderDate").innerText =
    order.orderDate;

document.getElementById("paymentMethod").innerText =
    order.paymentMethod;

document.getElementById("totalAmount").innerText =
    "₹" + order.totalAmount;

document.getElementById("status").innerText =
    order.status;

document.getElementById("deliveryDate").innerText =
    order.deliveryDate;