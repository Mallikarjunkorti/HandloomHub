const user = JSON.parse(
    localStorage.getItem("loggedInUser")
);

if (!user) {
    alert("Please Login First");
    window.location.href = "login.html";
}

// Optional: Only allow admin email
if (user.email !== "mallikarjunkorti40@gmail.com") {
    alert("Access Denied");
    window.location.href = "index.html";
}

async function loadDashboard() {

    try {

        console.log("Dashboard Loading...");

        // USERS
        const usersRes =
            await fetch("http://localhost:5000/api/users");

        const users =
            await usersRes.json();

        document.getElementById("userCount").innerText =
            users.length;

        const usersTable =
            document.getElementById("usersTable");

        usersTable.innerHTML = "";

        users.forEach(user => {

            usersTable.innerHTML += `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                </tr>
            `;

        });

        // PRODUCTS
        const productsRes =
            await fetch("http://localhost:5000/api/products");

        const products =
            await productsRes.json();

        document.getElementById("productCount").innerText =
            products.length;

        const productsTable =
            document.getElementById("productsTable");

        productsTable.innerHTML = "";

        products.forEach(product => {

            productsTable.innerHTML += `
                <tr>
                    <td>${product.name}</td>
                    <td>₹${product.price}</td>
                    <td>
                        <button onclick="deleteProduct('${product._id}')">
                            Delete
                        </button>
                    </td>
                </tr>
            `;

        });

        // ORDERS
        const ordersRes =
            await fetch("http://localhost:5000/api/orders");

        const orders =
            await ordersRes.json();

        document.getElementById("orderCount").innerText =
            orders.length;

        const ordersTable =
            document.getElementById("ordersTable");

        ordersTable.innerHTML = "";

        let revenue = 0;

        orders.forEach(order => {

            revenue += order.totalAmount;

            ordersTable.innerHTML += `
                <tr>
                    <td>${order.userId}</td>
                    <td>₹${order.totalAmount}</td>
                    <td>${order.status}</td>
                    <td>
                        <select onchange="updateOrderStatus('${order._id}', this.value)">
                            <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>
                            <option value="Processing" ${order.status === "Processing" ? "selected" : ""}>Processing</option>
                            <option value="Shipped" ${order.status === "Shipped" ? "selected" : ""}>Shipped</option>
                            <option value="Delivered" ${order.status === "Delivered" ? "selected" : ""}>Delivered</option>
                        </select>
                    </td>
                </tr>
            `;
        });

        document.getElementById("revenue").innerText =
            "₹" + revenue;

    } catch(error) {

        console.error("Dashboard Error:", error);

    }

}

loadDashboard();