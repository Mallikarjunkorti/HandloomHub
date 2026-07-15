// ===============================
// Passport Data
// ===============================

const passports = [

{
    id: 1,
    product: "Mysore Silk Saree",
    price: 4999,
    image: "images/mysore-silk.jpg",

    artisan: "Lakshmi Devi",
    experience: "28 Years",

    village: "Ilkal",
    district: "Bagalkot",
    state: "Karnataka",

    technique: "Traditional Ilkal Handloom",

    days: "12 Days",

    certificate: " HH20260001",
    issueDate: "20 July 2026",
    environment: [
        "Natural Dyes",
        "100% Handmade",
        "Low Carbon Footprint"
    ],
    map:"https://maps.google.com/?q=Mysore,Karnataka",
    

    video: "https://www.youtube.com/watch?v=1oUMYfiCT94&t=43s"

},

{
    id: 2,
    product: "Banarasi Saree",
    price: 6499,
    image: "images/banarasi.jpg",

    artisan: "Sunita Sharma",
    experience: "30 Years",

    village: "Varanasi",
    district: "Varanasi",
    state: "Uttar Pradesh",

    technique: "Banarasi Zari Weaving",

    days: "18 Days",

    certificate: " HH20260002",
    issueDate: "20 July 2026",
    environment: [
        "Silk Yarn",
        "Hand Woven",
        "Eco Friendly"
    ],
    map:"https://maps.google.com/?q=Varanasi,Uttar Pradesh",
    

    video: "https://www.youtube.com/watch?v=COxJUmf1udI"

},

{
    id: 3,
    product: "Cotton Fabric",
    price: 899,
    image: "images/cotton-fabric.jpg",

    artisan: "Ramesh Patil",
    experience: "15 Years",

    village: "Hubli",
    district: "Dharwad",
    state: "Karnataka",

    technique: "Handloom Cotton",

    days: "5 Days",

    certificate: " HH20260003",
    issueDate: "20 July 2026",
    environment: [
        "Organic Cotton",
        "Natural Colours",
        "Low Carbon Footprint"
    ],
    map:"https://maps.google.com/?q=Hubli,Karnataka",
    

    video: "https://www.youtube.com/results?search_query=Cotton+Fabric+weaving"

},

{
    id: 4,
    product: "Kurti Material",
    price: 1299,
    image: "images/kurti.jpg",

    artisan: "Kavitha Gowda",
    experience: "20 Years",

    village: "Mysuru",
    district: "Mysuru",
    state: "Karnataka",

    technique: "Cotton Handloom",

    days: "8 Days",

    certificate: " HH20260004",
    issueDate: "20 July 2026",
    environment: [
        "Natural Cotton",
        "Handmade",
        "Eco Friendly"
    ],
    map:"https://maps.google.com/?q=Mysuru,Karnataka",
    
    video: "https://www.youtube.com/results?search_query=Kurti+Material+weaving"

}

];

// ===============================
// Get Product ID
// ===============================

const params = new URLSearchParams(window.location.search);

const id = Number(params.get("id"));

const passport = passports.find(p => p.id === id);

// ===============================
// Load Passport
// ===============================

if(passport){

    document.getElementById("passportImage").src =
        passport.image;

    document.getElementById("certificateProduct").innerText =
    passport.product;

    document.getElementById("passportPrice").innerText =
        "Price : ₹" + passport.price;

    document.getElementById("artisanName").innerText =
        passport.artisan;

    document.getElementById("experience").innerText =
        passport.experience;

    document.getElementById("village").innerText =
        passport.village;

    document.getElementById("district").innerText =
        passport.district;

    document.getElementById("originVillage").innerText =
    passport.village;

    document.getElementById("originDistrict").innerText =
    "District : " + passport.district;

    document.getElementById("originState").innerText =
    "State : " + passport.state;

    document.getElementById("mapLink").href =
    passport.map;

    document.getElementById("technique").innerText =
        passport.technique;

    document.getElementById("days").innerText =
        passport.days;

    document.getElementById("certificate").innerText =
        passport.certificate;

    document.getElementById("issueDate").innerText =
    passport.issueDate;
    
    
    const env = document.getElementById("environment");

env.innerHTML = "";

passport.environment.forEach(item => {

    env.innerHTML += `
        <div class="s-card">${item}</div>
    `;

});
    

    // ===============================
// QR Code
// ===============================

const qrContainer = document.getElementById("qrcode");

if (qrContainer) {

    qrContainer.innerHTML = "";

    if (typeof QRCode !== "undefined") {

        new QRCode(qrContainer, {
            text: window.location.href,
            width: 150,
            height: 150
        });

    } else {

        console.error("QRCode library not loaded.");

    }

}

}
// ===============================
// Buy Now from Passport
// ===============================

document.getElementById("buyNowBtn").addEventListener("click", function () {

    const buyNowProduct = {

        name: passport.product,
        price: passport.price,
        image: passport.image,
        quantity: 1

    };

    localStorage.setItem(
        "buyNowProduct",
        JSON.stringify(buyNowProduct)
    );

    window.location.href = "checkout.html";

});