alert("admin.js loaded");
async function loadDashboard() {
    try {

        console.log("Dashboard Loading...");

        const usersRes = await fetch("http://localhost:5000/api/users");
        const users = await usersRes.json();
        console.log("Users:", users);

        document.getElementById("userCount").innerText = users.length;

        const productsRes = await fetch("http://localhost:5000/api/products");
        const products = await productsRes.json();
        console.log("Products:", products);

        document.getElementById("productCount").innerText = products.length;

        const ordersRes = await fetch("http://localhost:5000/api/orders");
        const orders = await ordersRes.json();
        console.log("Orders:", orders);

        document.getElementById("orderCount").innerText = orders.length;

        const ordersTable = document.getElementById("ordersTable");

        orders.forEach(order => {
            ordersTable.innerHTML += `
                <tr>
                    <td>${order.userId}</td>
                    <td>₹${order.totalAmount}</td>
                    <td>${order.status}</td>
                </tr>
            `;
        });

    } catch(error) {
        console.error("Dashboard Error:", error);
    }
}

loadDashboard();