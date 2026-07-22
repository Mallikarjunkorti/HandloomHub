// ======================================
// Global Variables
// ======================================

let filteredProducts = [...products];

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortDropdown = document.getElementById("sortProducts");

// ======================================
// Render Products
// ======================================

function renderProducts() {

    const productsGrid = document.getElementById("productsGrid");

    if (!productsGrid) return;

    productsGrid.innerHTML = "";

    filteredProducts.forEach(product => {

        productsGrid.innerHTML += createProductCard(product);

    });

}

renderProducts();

// ======================================
// Apply Search + Category + Sort
// ======================================

function applyFilters() {

    const searchText = searchInput.value.toLowerCase().trim();
    const category = categoryFilter.value;
    const sort = sortDropdown.value;

    // Start with all products
    filteredProducts = [...products];

    // ===========================
    // Search
    // ===========================

    if (searchText) {

        filteredProducts = filteredProducts.filter(product => {

            return (

                product.name.toLowerCase().includes(searchText) ||

                product.category.toLowerCase().includes(searchText)

            );

        });

    }

    // ===========================
    // Category
    // ===========================

    if (category !== "all") {

        filteredProducts = filteredProducts.filter(product =>

            product.category === category

        );

    }

    // ===========================
    // Sort
    // ===========================

    switch (sort) {

        case "low":

            filteredProducts.sort((a, b) => a.price - b.price);

            break;

        case "high":

            filteredProducts.sort((a, b) => b.price - a.price);

            break;

        case "rating":

            filteredProducts.sort((a, b) => b.rating - a.rating);

            break;

        case "featured":

        default:

            filteredProducts.sort((a, b) => {

                return (b.featured === true) - (a.featured === true);

            });

            break;

    }

    renderProducts();

}

// ======================================
// Events
// ======================================

if (searchInput) {

    searchInput.addEventListener("input", applyFilters);

}

if (categoryFilter) {

    categoryFilter.addEventListener("change", applyFilters);

}

if (sortDropdown) {

    sortDropdown.addEventListener("change", applyFilters);

}

// ======================================
// Quick View Modal
// ======================================

const quickViewModal = document.getElementById("quickViewModal");
const closeModal = document.getElementById("closeModal");

document.addEventListener("click", function (e) {

    // Open Modal
    if (e.target.closest(".quick-view-trigger")) {

        const id = Number(
            e.target.closest(".quick-view-trigger").dataset.id
        );

        const product = products.find(p => p.id === id);

        if (!product) return;

        // Fill Modal

        document.getElementById("modalBadge").innerText =
            product.badge || "";

        document.getElementById("modalTitle").innerText =
            product.name;

        document.getElementById("modalRating").innerText =
            product.rating;

        document.getElementById("modalReviews").innerText =
            product.reviews;

        document.getElementById("modalPrice").innerText =
            "₹" + product.price.toLocaleString("en-IN");

        document.getElementById("modalImage").src =
            product.image;

        document.getElementById("modalPassport").href =
            `passport.html?id=${product.id}`;

        // Save Product ID on buttons
        document.getElementById("modalCart").dataset.id =
            product.id;

        document.getElementById("modalBuy").dataset.id =
            product.id;

        // Show Modal
        quickViewModal.classList.add("active");
    }

});

// Close Button

closeModal.addEventListener("click", function () {

    quickViewModal.classList.remove("active");

});

// Click Outside

quickViewModal.addEventListener("click", function (e) {

    if (e.target === quickViewModal) {

        quickViewModal.classList.remove("active");

    }

});

// ESC Key

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        quickViewModal.classList.remove("active");

    }

});

// ======================================
// Modal Add To Cart
// ======================================

document.getElementById("modalCart")
.addEventListener("click", function () {

    const id = Number(this.dataset.id);

    const product = products.find(p => p.id === id);

    if (!product) return;

    addToCart(

        product.id,

        product.name,

        product.price,

        product.image

    );

});

// ======================================
// Modal Buy Now
// ======================================

document.getElementById("modalBuy")
.addEventListener("click", function () {

    const id = Number(this.dataset.id);

    const product = products.find(p => p.id === id);

    if (!product) return;

    const buyNowProduct = {

        ...product,

        quantity:1

    };

    localStorage.setItem(

        getBuyNowKey(),

        JSON.stringify(buyNowProduct)

    );

    window.location.href="checkout.html";

});