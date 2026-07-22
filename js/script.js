console.log("script.js loaded");

// =========================
// Product Search
// =========================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const filter = this.value.toLowerCase();

        const productCards =
            document.querySelectorAll(".product-card");

        productCards.forEach(card => {

            const text =
                card.textContent.toLowerCase();

            card.style.display =
                text.includes(filter) ? "" : "none";

        });

    });

}