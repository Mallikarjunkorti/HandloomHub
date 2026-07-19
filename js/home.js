// ======================================
// Featured Products
// ======================================

function renderFeaturedProducts() {

    const container = document.getElementById("featuredProducts");

    if (!container) return;

    const featuredProducts = products.filter(product => product.featured);

    container.innerHTML = "";

   featuredProducts.forEach(product => {

    container.innerHTML += createProductCard(product);

});

}

renderFeaturedProducts();