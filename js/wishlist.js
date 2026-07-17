// =========================
// Add To Wishlist
// =========================

function addToWishlist(id, name, price, image) {

    let wishlist =
        JSON.parse(localStorage.getItem(getWishlistKey())) || [];

    let existingItem =
        wishlist.find(item => item.id === id);

    if (existingItem) {

        alert("Product already in Wishlist ❤️");
        return;

    }

    wishlist.push({

        id: id,

        name: name,

        price: price,

        image: image

    });

    localStorage.setItem(

        getWishlistKey(),

        JSON.stringify(wishlist)

    );

    updateWishlistCount();

    alert("Added to Wishlist ❤️");

}


// =========================
// Wishlist Count
// =========================

function updateWishlistCount() {

    let wishlist =
        JSON.parse(localStorage.getItem(getWishlistKey())) || [];

    let wishlistCount =
        document.getElementById("wishlistCount");

    if (wishlistCount) {

        wishlistCount.innerText = wishlist.length;

    }

}


// =========================
// Load Wishlist
// =========================

function loadWishlist() {

    let wishlist =
        JSON.parse(localStorage.getItem(getWishlistKey())) || [];

    let wishlistItems =
        document.getElementById("wishlistItems");

    if (!wishlistItems) return;

    wishlistItems.innerHTML = "";

    wishlist.forEach((item, index) => {

        wishlistItems.innerHTML += `

        <tr>

            <td>${item.name}</td>

            <td>₹${item.price}</td>

            <td>

                <button onclick="moveToCart(${index})">

                    Move to Cart

                </button>

                <button onclick="removeWishlist(${index})">

                    Remove

                </button>

            </td>

        </tr>

        `;

    });

}


// =========================
// Move Wishlist To Cart
// =========================

function moveToCart(index) {

    let wishlist =
        JSON.parse(localStorage.getItem(getWishlistKey())) || [];

    let cart =
        JSON.parse(localStorage.getItem(getCartKey())) || [];

    const item = wishlist[index];

    const existingItem =
        cart.find(product => product.id === item.id);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            id: item.id,

            name: item.name,

            price: item.price,

            image: item.image,

            quantity: 1

        });

    }

    wishlist.splice(index, 1);

    localStorage.setItem(

        getWishlistKey(),

        JSON.stringify(wishlist)

    );

    localStorage.setItem(

        getCartKey(),

        JSON.stringify(cart)

    );

    loadWishlist();

    loadCart();

    updateCartCount();

    updateWishlistCount();

    alert("Moved to Cart 🛒");

}


// =========================
// Remove Wishlist Item
// =========================

function removeWishlist(index) {

    let wishlist =
        JSON.parse(localStorage.getItem(getWishlistKey())) || [];

    wishlist.splice(index, 1);

    localStorage.setItem(

        getWishlistKey(),

        JSON.stringify(wishlist)

    );

    loadWishlist();

    updateWishlistCount();

    alert("Removed from Wishlist");

}