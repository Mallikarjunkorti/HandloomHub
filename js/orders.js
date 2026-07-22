// ===============================
// Load Orders
// ===============================

console.log("orders.js loaded");

const ordersContainer = document.getElementById("ordersContainer");

const orders =
    JSON.parse(localStorage.getItem(getOrdersKey())) || [];

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
                    width="120"
                    height="120"
                    style="border-radius:10px;object-fit:cover;">

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

                    <button
                        onclick="window.location.href='passport.html?id=${product.id}'">

                        🧵 View Passport

                    </button>

                    <button
                        onclick='buyAgain(${JSON.stringify(product).replace(/"/g,"&quot;")})'>

                        🔄 Buy Again

                    </button>

                </div>

            </div>

            <hr>

            `;

        });

        ordersContainer.innerHTML += `

        <div class="order-card">

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

                <span style="color:orange;font-weight:bold;">
                    ${order.status}
                </span>

            </p>

            <br>

            ${productsHTML}

            <button
                onclick="trackOrder('${order.orderId}')">

                🚚 Track Order

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

    showToast(

`Order ID : ${orderId}

Current Status : Processing

Next Step :
Your order will be shipped soon 🚚`

    );

}

// ===============================
// Buy Again
// ===============================

function buyAgain(product){

    localStorage.setItem(

        getBuyNowKey(),

        JSON.stringify({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        })

    );

    window.location.href = "checkout.html";

}