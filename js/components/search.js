// ======================================
// Live Search Suggestions
// ======================================
let selectedIndex = -1;
let currentResults = [];

const suggestionsBox = document.getElementById("searchSuggestions");

function showSuggestions(searchText) {

    if (!suggestionsBox) return;

    const text = searchText.toLowerCase().trim();

    if (text === "") {

        suggestionsBox.innerHTML = "";
        suggestionsBox.style.display = "none";
        return;

    }

    currentResults = products.filter(product =>

    product.name.toLowerCase().includes(text) ||
    product.category.toLowerCase().includes(text)

);
    selectedIndex = -1;

    if (currentResults.length === 0) {

        suggestionsBox.innerHTML = `
            <div class="search-item no-result">
                😔 No Products Found
            </div>
        `;

        suggestionsBox.style.display = "block";
        return;

    }

    suggestionsBox.innerHTML = "";

    currentResults.slice(0,5).forEach((product, index) => {
        suggestionsBox.innerHTML += `

       <div
            class="search-item"
            data-index="${index}"
            onclick="window.location.href='product-details.html?id=${product.id}'">

            <img src="${product.image}" alt="${product.name}">

            <div class="search-info">

                <h4>${product.name}</h4>

                <p>₹${product.price.toLocaleString("en-IN")}</p>

            </div>

        </div>

        `;

    });

    suggestionsBox.style.display = "block";

}

searchInput.addEventListener("keydown",function(e){

    const items=document.querySelectorAll(".search-item");

    if(!items.length) return;

    if(e.key==="ArrowDown"){

        e.preventDefault();

        selectedIndex++;

        if(selectedIndex>=items.length)
            selectedIndex=0;

    }

    else if(e.key==="ArrowUp"){

        e.preventDefault();

        selectedIndex--;

        if(selectedIndex<0)
            selectedIndex=items.length-1;

    }

    else if(e.key==="Enter"){

        if (items[selectedIndex]) {

            items[selectedIndex].click();
            
        }

    }

    else if(e.key==="Escape"){

        suggestionsBox.style.display="none";
        selectedIndex=-1;
        return;

    }

    items.forEach(item=>{

        item.classList.remove("active-search");

    });

    if(selectedIndex>=0){

        items[selectedIndex].classList.add("active-search");

    }

});

// Hide Suggestions

document.addEventListener("click", function(e){

    if(!e.target.closest(".search-container")){

        suggestionsBox.style.display="none";

    }

});