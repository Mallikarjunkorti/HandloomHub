// ======================================
// Reusable Product Card
// ======================================

function createProductCard(product) {

    return `

        <div class="product-card">

            ${product.badge ? `
                <span class="product-badge">${product.badge}</span>
            ` : ""}

            <div class="product-image-box">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-image">
            </div>

            <div class="product-content">

                <div class="product-rating">
                    ⭐ ${product.rating}
                    <span>(${product.reviews})</span>
                </div>

                <h3 class="product-title">
                    ${product.name}
                </h3>

                <p class="product-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <div class="product-buttons">

                    <button
                        class="wishlist-btn"
                        data-id="${product.id}">
                        ♡
                    </button>

                    <button
                        class="cart-btn"
                        data-id="${product.id}"
                        onClick=>
                        Add to Cart
                    </button>

                </div>
                <button
    class="buy-btn"
    data-id="${product.id}">

    Buy Now

</button>

<a
    href="product-details.html?id=${product.id}"
    class="details-btn">

    View Details →

</a>
            </div>

        </div>

    `;

}