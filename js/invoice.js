// ======================================
// LOAD LOGO
// ======================================

const logo = new Image();

logo.onload = () => {

    console.log("Logo Loaded");

};
logo.src = "images/logo.png";

// ======================================
// HANDLOOMHUB INVOICE
// ======================================

const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {

    window.location.href = "login.html";

}

const selectedOrderId = localStorage.getItem("selectedInvoiceOrder");

const orders =
JSON.parse(localStorage.getItem(`orders_${user.email}`)) || [];

const order =
orders.find(o => o.orderId === selectedOrderId);

if (!order) {

    alert("Invoice not found!");

    window.location.href = "orders.html";

}

// ======================================
// CUSTOMER
// ======================================

document.getElementById("customerName").textContent =
user.name;

document.getElementById("customerEmail").textContent =
user.email;

document.getElementById("customerPhone").textContent =
user.phone || "Not Available";

// ======================================
// INVOICE DETAILS
// ======================================

const invoiceNumber =
`INV-${order.orderId}`;

document.getElementById("invoiceNumber").textContent =
invoiceNumber;

document.getElementById("orderId").textContent =
order.orderId;

document.getElementById("invoiceDate").textContent =
order.orderDate;

document.getElementById("paymentMethod").textContent =
order.paymentMethod;

// ======================================
// DIGITAL PRODUCT PASSPORT
// ======================================

document.getElementById("passportId").textContent =
`DPP-${order.orderId}`;

// ======================================
// PRODUCTS
// ======================================

const tbody =
document.getElementById("invoiceItems");

let subtotal = 0;

tbody.innerHTML = "";

order.products.forEach(product => {

    const total =
    product.price * product.quantity;

    subtotal += total;

    tbody.innerHTML += `

        <tr>

            <td>${product.name}</td>

            <td>${product.quantity}</td>

            <td>₹${product.price.toLocaleString("en-IN")}</td>

            <td>₹${total.toLocaleString("en-IN")}</td>

        </tr>

    `;

});

// ======================================
// TOTALS
// ======================================

const gst =
Math.round(subtotal * 0.05);

const grandTotal =
subtotal + gst;

document.getElementById("subtotal").textContent =
`₹${subtotal.toLocaleString("en-IN")}`;

document.getElementById("gst").textContent =
`₹${gst.toLocaleString("en-IN")}`;

document.getElementById("grandTotal").textContent =
`₹${grandTotal.toLocaleString("en-IN")}`;

// ======================================
// PRINT
// ======================================

document
.getElementById("printInvoice")
.addEventListener("click", () => {

    window.print();

});

// ======================================
// DOWNLOAD PDF
// ======================================

document
.getElementById("downloadInvoice")
.addEventListener("click", () => {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF("p", "mm", "a4");

    // -------------------------
    // COLORS
    // -------------------------

    const primary = [122, 78, 45];
    const green = [47, 107, 79];

    // -------------------------
    // HEADER
    // -------------------------

    if (logo.complete) {

    doc.addImage(logo, "PNG", 18, 10, 18, 18);

    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(...primary);

    doc.text("HandloomHub", 42, 20);

    doc.setFontSize(11);
    doc.setTextColor(...green);

    doc.text("Tradition • Trust • Transparency", 42, 27);

    doc.setFontSize(8);

doc.setTextColor(110);

doc.text("GSTIN : 29ABCDE1234F1Z5",20,36);

doc.text("Email : support@handloomhub.in",20,41);

doc.text("Website : www.handloomhub.in",20,46);

    
    

    doc.setFillColor(...primary);

doc.roundedRect(138,10,52,18,2,2,"F");

doc.setTextColor(255);

doc.setFontSize(16);

doc.text("TAX INVOICE",145,21);

    doc.setDrawColor(220);
    doc.line(20, 32, 190, 32);

    doc.saveGraphicsState();

doc.setTextColor(248);

doc.setFontSize(55);

doc.text(
    "HANDLOOMHUB",
    35,
    165,
    {
        angle:45
    }
);

doc.restoreGraphicsState();

    // -------------------------
    // CUSTOMER
    // -------------------------

    doc.setFontSize(11);

    doc.text(`Invoice No : ${invoiceNumber}`,20,45);
    doc.text(`Order ID : ${order.orderId}`,20,52);
    doc.text(`Date : ${order.orderDate}`,20,59);

    doc.text(`Customer : ${user.name}`,120,45);
    doc.text(`Email : ${user.email}`,120,52);
    doc.text(`Phone : ${user.phone || "-"}`,120,59);

    // -------------------------
    // PRODUCTS
    // -------------------------

    const rows = [];

    order.products.forEach(product => {

        rows.push([

            product.name,

            product.quantity,

            `Rs. ${product.price.toLocaleString("en-IN")}`,

            `Rs. ${(product.price * product.quantity).toLocaleString("en-IN")}`

        ]);

    });

    doc.autoTable({

        startY: 70,

        head:[["Product","Qty","Price","Total"]],

        body:rows,

        theme:"striped",

        headStyles:{

            fillColor:primary

        }

    });

    // -------------------------
    // TOTALS
    // -------------------------

    const y = doc.lastAutoTable.finalY + 12;

    doc.setFontSize(11);

    doc.text(
    `Subtotal : Rs. ${subtotal.toLocaleString("en-IN")}`,
    135,
    y
);

    doc.text(
    `GST (5%) : Rs. ${gst.toLocaleString("en-IN")}`,
    135,
    y + 8
);


    doc.setFillColor(248,244,239);

doc.roundedRect(120, y + 5, 70, 28, 3, 3, "F");

doc.setFont("helvetica","bold");

doc.setFontSize(12);

doc.setTextColor(122,78,45);

doc.text("Grand Total",125,y+16);

doc.setFontSize(16);

doc.text(
    `Rs. ${grandTotal.toLocaleString("en-IN")}`,
    125,
    y+27
);


    // -------------------------
    // VERIFIED BADGE
    // -------------------------

    doc.setFillColor(...green);

    doc.roundedRect(20,y+10,60,10,3,3,"F");

    doc.setTextColor(255);

    doc.setFontSize(10);

    doc.text("Verified Handloom Product",24,y+17);
    // -------------------------
    // PAYMENT
    // -------------------------

    doc.setTextColor(0);

    doc.setFontSize(11);

    doc.text(`Payment : ${order.paymentMethod}`,20,y+35);

    

doc.text("Status : PAID",20,y+43);

doc.setTextColor(0);

    doc.text(`Passport ID : DPP-${order.orderId}`,20,y+51);

    // -------------------------
    // SIGNATURE
    // -------------------------

   doc.setDrawColor(150);

doc.line(140,y+48,185,y+48);

doc.setFontSize(9);

doc.text("HandloomHub",145,y+54);

doc.text("Authorised Signatory",140,y+60);

    // -------------------------
    // FOOTER
    // -------------------------

    doc.setDrawColor(210);

doc.line(20,280,190,280);

doc.setFontSize(8);

doc.setTextColor(120);

doc.text(
    "Thank you for supporting Indian Handloom Artisans.",
    20,
    286
);

   
doc.text(

"www.handloomhub.in | support@handloomhub.in",

110,

286

);

    const canvas = document.querySelector("#qrCode canvas");

    if (canvas) {

    const qrImage = canvas.toDataURL("image/png");

    doc.addImage(

        qrImage,

        "PNG",

        150,

        210,

        30,

        30

    );

    doc.setFontSize(8);

doc.setTextColor(80);

doc.text("Scan to Verify",149,245);

doc.text("Digital Product Passport",140,250);
    }

    // -------------------------
    // SAVE
    // -------------------------

    doc.save(`${invoiceNumber}.pdf`);

});


/*--QR Code--*/
const passportURL =
`${window.location.origin}/passport.html?id=${order.orderId}`;

new QRCode(document.getElementById("qrCode"),{

    text: passportURL,

    width: 100,

    height: 100

});