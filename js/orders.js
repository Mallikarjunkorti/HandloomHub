// ===============================
// Load Orders
// ===============================

console.log("orders.js loaded");

const ordersContainer = document.getElementById("ordersContainer");

const orders =
    JSON.parse(localStorage.getItem(getOrdersKey())) || [];

// ======================================
// ORDER SUMMARY
// ======================================

const totalOrders = orders.length;

const processingOrders =
    orders.filter(order => order.status === "Processing").length;

const shippedOrders =
    orders.filter(order => order.status === "Shipped").length;

const deliveredOrders =
    orders.filter(order => order.status === "Delivered").length;

if (document.getElementById("totalOrders")) {

    document.getElementById("totalOrders").textContent =
        totalOrders;

    document.getElementById("processingOrders").textContent =
        processingOrders;

    document.getElementById("shippedOrders").textContent =
        shippedOrders;

    document.getElementById("deliveredOrders").textContent =
        deliveredOrders;

}

if (orders.length === 0) {

    ordersContainer.innerHTML = `

        <div class="order-card">

            <h2>No Orders Found 😔</h2>

            <br>

            <a href="products.html">
                <button>🛍 Start Shopping</button>
            </a>

        </div>

    `;

} else {

    orders.forEach((order) => {

        let productsHTML = "";

        order.products.forEach((product) => {

            productsHTML += `

            <div class="order-top">

                <img
                    src="${product.image}"
                    class="order-image"
                    alt="${product.name}">
                <div>

                    <h2>${product.name}</h2>

                    <p>
                        <strong>Quantity:</strong>
                        ${product.quantity}
                    </p>

                    <p>
                        <strong>Price:</strong>
                        ₹${product.price}
                    </p>

                    <button class="order-btn passport-btn"
                        onclick="window.location.href='passport.html?id=${product.id}'">

                        🛡 Passport

                    </button>

                    <button class="order-btn buy-btn"
                        onclick='buyAgain(${JSON.stringify(product).replace(/"/g,"&quot;")})'>

                        🔄 Buy Again

                    </button>

                </div>

            </div>

            <hr>

            `;

        });

        ordersContainer.innerHTML += `

        <div class="order-card fade-in">

            <h3>📦 Order Details</h3>

            <p>
                <strong>Order ID:</strong>
                ${order.orderId}
            </p>

            <p>
                <strong>Order Date:</strong>
                ${order.orderDate}
            </p>

            <p>
                <strong>Payment:</strong>
                ${order.paymentMethod}
            </p>

            <p>
                <strong>Total:</strong>
                ₹${order.totalAmount}
            </p>

            <p>
                <strong>Status:</strong>

               <span class="status-badge ${order.status.toLowerCase()}">
                    ${order.status}
                </span>

            </p>

            <br>

            ${productsHTML}

            <button class="order-btn track-btn"
                    onclick="trackOrder('${order.orderId}')">

                🚚 Track Order

            </button>
            
            

            <button class="order-btn invoice-btn"
                    onclick="downloadInvoice('${order.orderId}')">

                    ⬇ Download Invoice

            </button>

        </div>

        <br>

        `;

    });

}

// ===============================
// Track Order
// ===============================

function trackOrder(orderId){

    const modal = document.getElementById("trackModal");

    const content = document.getElementById("trackingContent");

    content.innerHTML = `

        <h3>Order ID: ${orderId}</h3>

        <div class="tracking-step completed">
            ✅ Order Placed
        </div>

        <div class="tracking-step completed">
            📦 Packed
        </div>

        <div class="tracking-step current">
            🚚 Shipped
        </div>

        <div class="tracking-step pending">
            🚛 Out For Delivery
        </div>

        <div class="tracking-step pending">
            🏠 Delivered
        </div>

        <br>

        <strong>Estimated Delivery: 31 July 2026</strong>

    `;

    modal.style.display = "flex";

}

const closeTrackModal =
document.getElementById("closeTrackModal");

if(closeTrackModal){

    closeTrackModal.onclick = function(){

        document.getElementById("trackModal").style.display="none";

    };

}

window.addEventListener("click", function(e){

    const modal = document.getElementById("trackModal");

    if(modal && e.target === modal){

        modal.style.display = "none";

    }

});

// ===============================
// Download Invoice
// ===============================

function downloadInvoice(orderId){

    localStorage.setItem("selectedInvoiceOrder", orderId);

    window.location.href = "invoice.html";

}
