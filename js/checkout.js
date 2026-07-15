// ===============================
// Load Order Summary
// ===============================

const buyNowProduct =
    JSON.parse(localStorage.getItem("buyNowProduct"));

const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

const products =
    buyNowProduct ? [buyNowProduct] : cart;

if (products.length === 0) {

    alert("No Product Selected!");

    window.location.href = "products.html";

}

const orderItems =
    document.getElementById("orderItems");

let totalAmount = 0;

products.forEach(item => {

    totalAmount += item.price * item.quantity;

    if (orderItems) {

        orderItems.innerHTML += `

        <div class="summary-item">

            <img src="${item.image}" width="80">

            <div>

                <h4>${item.name}</h4>

                <p>Qty : ${item.quantity}</p>

                <p>₹${item.price}</p>

            </div>

        </div>

        <hr>

        `;

    }

});

const orderTotal =
    document.getElementById("orderTotal");

if (orderTotal) {

    orderTotal.innerText =
        "Total : ₹" + totalAmount;

}

// ===============================
// Checkout
// ===============================

document.getElementById("checkoutForm")
.addEventListener("submit", async function (e) {

    e.preventDefault();

    const user =
        JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {

        alert("Please Login First");

        window.location.href = "login.html";

        return;

    }

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const phone =
        document.getElementById("phone").value;

    const address =
        document.getElementById("address").value;

    const city =
        document.getElementById("city").value;

    const pincode =
        document.getElementById("pincode").value;

    const paymentMethod =
        document.getElementById("paymentMethod").value;

    try {

        const response = await fetch(
            "http://localhost:5000/api/orders",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    userId: user.id,

                    products: products,

                    totalAmount: totalAmount,

                    shippingAddress:
                        `${address}, ${city}, ${pincode}`,

                    customerName: name,

                    customerEmail: email,

                    customerPhone: phone,

                    paymentMethod: paymentMethod

                })

            }
        );

        const data = await response.json();

        if (response.ok) {

            // Save Last Order

            const order = {

                orderId: "HH" + Date.now(),

                orderDate: new Date().toLocaleDateString(),

                paymentMethod: paymentMethod,

                totalAmount: totalAmount,

                deliveryDate: "Within 5-7 Days",

                products: products,

                status: "Processing"

            };

            localStorage.setItem(
                "lastOrder",
                JSON.stringify(order)
            );

            // Save Order History

            let orders =
                JSON.parse(localStorage.getItem("orders")) || [];

            orders.push(order);

            localStorage.setItem(
                "orders",
                JSON.stringify(orders)
            );

            // Clear Cart / Buy Now

            if (buyNowProduct) {

                localStorage.removeItem("buyNowProduct");

            } else {

                localStorage.removeItem("cart");

            }

            alert("Order Placed Successfully!");

            window.location.href =
                "confirmation.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Server Error");

    }

});