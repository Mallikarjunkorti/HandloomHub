// =========================
// Add To Cart
// =========================

function addToCart(id, name, price, image, quantity = 1) {

    let cart =
        JSON.parse(localStorage.getItem(getCartKey())) || [];

    let existingItem =
        cart.find(item => item.id === id);

    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.push({

            id: id,

            name: name,

            price: price,

            image: image,

            quantity: quantity

        });

    }

    localStorage.setItem(
        getCartKey(),
        JSON.stringify(cart)
    );

    refreshNavbarCounts();

    showToast("🛒 Product Added to Cart");

}


// =========================
// Load Cart
// =========================

function loadCart() {

    let cart =
        JSON.parse(localStorage.getItem(getCartKey())) || [];

    let cartItems =
        document.getElementById("cartItems");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        let itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        cartItems.innerHTML += `

        <tr>

            <td>${item.name}</td>

            <td>₹${item.price}</td>

            <td>

                <button onclick="decreaseQty(${index})">-</button>

                ${item.quantity}

                <button onclick="increaseQty(${index})">+</button>

            </td>

            <td>₹${itemTotal}</td>

            <td>

                <button onclick="removeItem(${index})">

                    Remove

                </button>

            </td>

        </tr>

        `;

    });

    let grandTotal =
        document.getElementById("grandTotal");

    if (grandTotal) {

        grandTotal.innerText =
            "Grand Total: ₹" + total;

    }

    updateCartCount();

}


// =========================
// Increase Quantity
// =========================

function increaseQty(index) {

    let cart =
        JSON.parse(localStorage.getItem(getCartKey())) || [];

    cart[index].quantity++;

    localStorage.setItem(
    getCartKey(),
        JSON.stringify(cart)
    );

    loadCart();

}


// =========================
// Decrease Quantity
// =========================

function decreaseQty(index) {

    let cart =
        JSON.parse(localStorage.getItem(getCartKey())) || [];
    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    }

    localStorage.setItem(
    getCartKey(),
        JSON.stringify(cart)
    );

    loadCart();

}


// =========================
// Remove Item
// =========================

function removeItem(index) {

    let cart =
        JSON.parse(localStorage.getItem(getCartKey())) || [];

    cart.splice(index, 1);

    localStorage.setItem(
    getCartKey(),
        JSON.stringify(cart)
    );

    loadCart();

    refreshNavbarCounts();

}


// =========================
// Cart Count
// =========================

function updateCartCount() {

    let cart =
        JSON.parse(localStorage.getItem(getCartKey())) || [];

    let totalItems = 0;

    cart.forEach(item => {

        totalItems += item.quantity;

    });

    let cartCount =
        document.getElementById("cartCount");

    if (cartCount) {

        cartCount.innerText = totalItems;

    }

}
//Go to cart
function goToCheckout() {

    localStorage.removeItem(getBuyNowKey());

    window.location.href = "checkout.html";

}