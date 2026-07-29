const user = JSON.parse(
    localStorage.getItem("loggedInUser")
);

if (!user) {
    showToast("Please Login First");
    window.location.href = "login.html";
}

// Optional: Only allow admin email
if (user.email !== "mallikarjunkorti40@gmail.com") {
    showToast("Access Denied");
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

        animateCounter("userCount", users.length);

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

        animateCounter("productCount", products.length);

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

        animateCounter("orderCount", orders.length);

        const ordersTable =
            document.getElementById("ordersTable");

        ordersTable.innerHTML = "";

        let revenue = 0;

        orders.forEach(order => {

            revenue += order.totalAmount;

            ordersTable.innerHTML += `
                <tr>
                    <td>${order.userId?.name || "Unknown User"}</td>
                    <td>₹${order.totalAmount}</td>
                    <td>
                        <span class="status ${order.status.toLowerCase()}">
                         ${order.status}
                        </span>
</td>
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

// ============================
// LOW STOCK ALERTS
// ============================

const lowStockList = document.getElementById("lowStockList");

if (lowStockList) {

    lowStockList.innerHTML = "";

    products.forEach(product => {

        // Temporary random stock
        const stock = Math.floor(Math.random() * 15);

        if (stock <= 5) {

            lowStockList.innerHTML += `

                <div class="low-stock-item">

                    <div>${product.name}</div>

                    <div class="stock-warning">
                        Only ${stock} Left
                    </div>

                </div>

            `;

        }

    });

    if (lowStockList.innerHTML === "") {

        lowStockList.innerHTML = `

            <div class="stock-good">

                ✅ All products have sufficient stock.

            </div>

        `;

    }

}

// ============================
// TOP SELLING PRODUCTS
// ============================

const topProductsList =
    document.getElementById("topProductsList");

if(topProductsList){

topProductsList.innerHTML="";

products.slice(0,5).forEach(product=>{

const sales=Math.floor(Math.random()*80)+20;

topProductsList.innerHTML +=`

<div class="product-item">

<div>

<div class="product-name">

${product.name}

</div>

</div>

<div class="product-sales">

${sales} Sales

</div>

</div>

`;

});

}

        let currentRevenue = 0;

        const revenueElement = document.getElementById("revenue");

        const revenueStep = Math.max(1, Math.ceil(revenue / 50));

        const revenueTimer = setInterval(()=>{

         currentRevenue += revenueStep;

        if(currentRevenue >= revenue){

            currentRevenue = revenue;

            clearInterval(revenueTimer);

        }

        revenueElement.innerText =
        "₹" + currentRevenue.toLocaleString("en-IN");

        },20);

    } catch(error) {

        console.error("Dashboard Error:", error);

    }

}

loadDashboard();



// ============================
// SALES CHART
// ============================

const chartCanvas = document.getElementById("salesChart");

if(chartCanvas){

new Chart(chartCanvas,{

type:"bar",

data:{

labels:[
"Jan",
"Feb",
"Mar",
"Apr",
"May",
"Jun"
],

datasets:[{

label:"Revenue",

data:[
32000,
45000,
28000,
52000,
61000,
48000
],

borderRadius:10

}]

},

options:{

responsive:true,

plugins:{

legend:{
display:false
}

},

scales:{

y:{

beginAtZero:true

}

}

}

});

}

// ============================
// DASHBOARD SEARCH
// ============================

function searchDashboard(){

    const keyword =
        document.getElementById("dashboardSearch")
        .value
        .toLowerCase();

    const tables =
        document.querySelectorAll("tbody");

    tables.forEach(table=>{

        const rows =
            table.querySelectorAll("tr");

        rows.forEach(row=>{

            const text =
                row.innerText.toLowerCase();

            row.style.display =
                text.includes(keyword)
                ? ""
                : "none";

        });

    });

}

// ============================
// EXPORT TABLE TO CSV
// ============================

function exportTable(tableId, filename) {

    const table = document.getElementById(tableId);

    let csv = [];

    table.querySelectorAll("tr").forEach(row => {

        let rowData = [];

        const cells = row.querySelectorAll("th, td");

cells.forEach((cell, index) => {

    // Skip Action column (last column)
    if (index === cells.length - 1) return;

    const select = cell.querySelector("select");

    if (select) {
        rowData.push(`"${select.value}"`);
    } else {
        rowData.push(`"${cell.innerText.trim().replace(/"/g, '""')}"`);
    }

});
        csv.push(rowData.join(","));

    });

    const blob = new Blob(
        ["\uFEFF" + csv.join("\n")],
        { type: "text/csv;charset=utf-8;" }
    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(link.href);
}

//Animated colors----
function animateCounter(id, target){

    const element = document.getElementById(id);

    let count = 0;

    const step = Math.max(1, Math.ceil(target / 40));

    const timer = setInterval(()=>{

        count += step;

        if(count >= target){

            count = target;

            clearInterval(timer);

        }

        element.innerText = count;

    },20);

}

//Notification----

function toggleNotifications(){

    const panel =
        document.getElementById("notificationPanel");

    panel.style.display =
        panel.style.display === "block"
        ? "none"
        : "block";

}

    document.addEventListener("DOMContentLoaded", () => {

    const notifications = [
        "🛒 New order received",
        "⚠️ Cotton Fabric stock is low",
        "💰 Revenue crossed ₹1,00,000"
    ];

    const list = document.getElementById("notificationList");

    if (!list) return;

    list.innerHTML = "";

    notifications.forEach(item => {

        list.innerHTML += `
            <div class="notification-item">
                ${item}
            </div>
        `;

    });

});

//Product delete
async function deleteProduct(id) {

    const confirmDelete = confirm("Are you sure you want to delete this product?");

    if (!confirmDelete) return;

    try {

        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Delete failed");
        }

        showToast("Product deleted successfully!");

        loadDashboard();

    } catch (error) {

        console.error(error);
        showToast("Unable to delete product.");

    }

}

//Action Update----
async function updateOrderStatus(orderId, status) {

    try {

        const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status })
        });

        if (!response.ok) {
            throw new Error("Failed to update order");
        }

        showToast("Order status updated!");

        loadDashboard(); // Refresh badge and table

    } catch (error) {

        console.error(error);
        showToast("Unable to update order.");

    }
}