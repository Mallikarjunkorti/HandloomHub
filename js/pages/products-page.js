// ======================================
// Render All Products
// ======================================

function renderProducts() {

    const productsGrid = document.getElementById("productsGrid");

    if (!productsGrid) return;

    productsGrid.innerHTML = "";

    products.forEach(product => {

        productsGrid.innerHTML += createProductCard(product);

    });

}

renderProducts();