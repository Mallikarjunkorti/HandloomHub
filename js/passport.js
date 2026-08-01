// ===============================
// Passport Data
// ===============================

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

let passport = null;

// ===============================
// Load Passport
// ===============================

async function loadPassport() {

    try {

        const response = await fetch(
            `http://localhost:5000/api/products/${productId}`
        );

        if (!response.ok) {
            throw new Error("Product not found");
        }

        passport = await response.json();

        // Image
        let image = passport.image;

        if (
            image &&
            !image.startsWith("http") &&
            !image.startsWith("/")
        ) {
            image = "images/products/" + image;
        }

        document.getElementById("passportImage").src = getProductImage(passport);

        // Product
        document.getElementById("certificateProduct").innerText =
            passport.name;

        document.getElementById("passportPrice").innerText =
            "Price : ₹" + passport.price;

        // Artisan
        document.getElementById("artisanName").innerText =
            passport.artisanName || "-";

        document.getElementById("experience").innerText =
            passport.experience || "-";

        document.getElementById("village").innerText =
            passport.village || "-";

        document.getElementById("district").innerText =
            passport.district || "-";

        document.getElementById("state").innerText =
            passport.state || "-";

        // Origin
        document.getElementById("originVillage").innerText =
            passport.village || "-";

        document.getElementById("originDistrict").innerText =
            "District : " + (passport.district || "-");

        document.getElementById("originState").innerText =
            "State : " + (passport.state || "-");

        // Technique
        document.getElementById("technique").innerText =
            passport.technique || "-";

        document.getElementById("days").innerText =
            passport.days || "-";

        document.getElementById("certificate").innerText =
            passport.certificate || "-";

        document.getElementById("issueDate").innerText =
            passport.issueDate || "-";

        // Environment
        const env = document.getElementById("environment");

        env.innerHTML = "";

        (passport.environment || []).forEach(item => {

            env.innerHTML += `
                <div class="s-card">${item}</div>
            `;

        });

        // Map
        document.getElementById("mapLink").href =
            passport.map || "#";

        // QR Code
        const qrContainer =
            document.getElementById("qrcode");

        if (qrContainer && typeof QRCode !== "undefined") {

            qrContainer.innerHTML = "";

            new QRCode(qrContainer, {

                text: window.location.href,

                width: 150,

                height: 150

            });

        }

    } catch (error) {

        console.error(error);

        alert("Passport not found");

        window.location.href = "products.html";

    }

}

loadPassport();
// ===============================
// Buy Now from Passport
// ===============================

document.getElementById("buyNowBtn").addEventListener("click", function () {

    const buyNowProduct = {
       id: passport._id,
       name: passport.name,
       image: passport.image,
        quantity: 1

    };

    localStorage.setItem(
    getBuyNowKey(),
    JSON.stringify(buyNowProduct)
    );

    window.location.href = "checkout.html";

});