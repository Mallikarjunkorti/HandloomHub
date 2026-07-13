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

    certificate: "Certificate No: HH20260001",

    environment: [
        "Natural Dyes",
        "100% Handmade",
        "Low Carbon Footprint"
    ],

    making1: "images/weaving1.jpg",
    making2: "images/weaving2.jpg",

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

    certificate: "Certificate No: HH20260002",

    environment: [
        "Silk Yarn",
        "Hand Woven",
        "Eco Friendly"
    ],

    making1: "images/weaving1.jpg",
    making2: "images/weaving2.jpg",

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

    certificate: "Certificate No: HH20260003",

    environment: [
        "Organic Cotton",
        "Natural Colours",
        "Low Carbon Footprint"
    ],

    making1: "images/weaving1.jpg",
    making2: "images/weaving2.jpg",

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

    certificate: "Certificate No: HH20260004",

    environment: [
        "Natural Cotton",
        "Handmade",
        "Eco Friendly"
    ],

    making1: "images/weaving1.jpg",
    making2: "images/weaving2.jpg",

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

    document.getElementById("passportProductName").innerText =
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

    document.getElementById("state").innerText =
        passport.state;

    document.getElementById("technique").innerText =
        passport.technique;

    document.getElementById("days").innerText =
        passport.days;

    document.getElementById("certificate").innerText =
        passport.certificate;

    document.getElementById("makingImage1").src =
        passport.making1;

    document.getElementById("makingImage2").src =
        passport.making2;

    const env =
        document.getElementById("environment");

    passport.environment.forEach(item=>{

        env.innerHTML += `<li>${item}</li>`;

    });

    document
        .getElementById("videoBtn")
        .onclick=function(){

        window.open(passport.video);

    };

    new QRCode(
        document.getElementById("qrcode"),
        {
            text:
            "https://handloomhub.com/passport?id="+passport.id,
            width:150,
            height:150
        }
    );

}