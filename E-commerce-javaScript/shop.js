const cartItemContainer = document.getElementById('cart-container');

fetch("https://dummyjson.com/products")
    .then(response => response.json())
    .then(data => {
        window.products = data.products;   // here's data make window object(globl data)
        displayProducts(data.products)
        // console.log(window.products[1].description)
    })
    .catch(erorr => console.log(erorr))

const textArea = document.querySelector("#search");
textArea.addEventListener("input", (e) => {
    // console.log(window.products)

    handleQurey(e.target.value)

})
function displayProducts(products) {
    cartItemContainer.innerHTML = "";
    products.forEach(item => {

        // create carts and append
        const product = document.createElement('div');
        product.classList.add('product')
        product.innerHTML = `<img src=${item.thumbnail} alt="product1">
                                    <h3>${item.title}</h3>
                                    <p>${item.price}$</p>
                                    <input type="number" name="" id="" value="1" min="1">
                                    <a href="#" class="add-to-cart" data-product='${JSON.stringify(item)}'>Add To Cart</a>
                                    `;

        // console.log(element)
        cartItemContainer.appendChild(product);

    })
    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            try {
                const data = e.target.getAttribute('data-product');
                console.log(data)
                const product = JSON.parse(data);
                const quantityInput = e.target.previousElementSibling;
                const quantity = parseInt(quantityInput.value)
                console.log(quantity)

                // console.log(product)
                addToCart(product, quantity);
            } catch {
                alert("Sorry currently out of Stock item!")
            }
        })

    })
}









// add to cart function for save in local storage
function addToCart(product, quantity) {
    try {
        if (isNaN(quantity) || quantity < 0) {
            throw new error("quantity not a number")
        }
        const carts = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = carts.find(item => item.title === product.title);
        console.log(existingProduct)
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            product.quantity = quantity;
            carts.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(carts));
        alert("item added to cart")
    } catch {
        console.error(error)
        alert("quntity is not a number")
    }

}





// function handleQurey(query) {                 // normal way search for each letter when typing
//     const filterPorducts = window.products.filter((product =>
//         product.title.toLowerCase().includes(query.toLowerCase()) ||
//         product.description.toLowerCase().includes(query.toLowerCase()))

//     );
//     displayProducts(filterPorducts);
// };
const handleQurey = debounce((query) => {
    const filterPorducts = window.products.filter((product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()))

    );
    document.querySelector("#price-range").selectedIndex = 0; // select tag reset
    displayProducts(filterPorducts);
}, 1000)

document.querySelector("#price-range").addEventListener("change", (e) => {
    e.preventDefault();
    const range = e.target.value.split("-");
    if (range.length > 1) {
        let startPrice = parseInt(range[0]);
        let endPrice = parseInt(range[1]);
        applyFilter(startPrice, endPrice);

    }
})

function applyFilter(startPrice, endPrice) {
    console.log(startPrice, endPrice)
    const filterPorducts = window.products.filter((product) => {
        const priceMatch = product.price >= startPrice && product.price < endPrice;
        if (textArea.value !== "") {
            const searchMatch = product.title.toLowerCase().includes(textArea.value.toLowerCase()) ||
                product.description.toLowerCase().includes(textArea.value.toLowerCase());
            return searchMatch && priceMatch;
        }
        return priceMatch;
    })
    // console.log(filterPorducts)
    displayProducts(filterPorducts);
}

/***************************** debounce concept when user stop tying after given time execute function ******************/

function debounce(func, delay = 1000) {
    let timeOut;
    return (...args) => {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            func(...args)
        }, delay)
    }
}


function throttle(func, delay = 1000) {
    let shouldWait = false;
    let waitingArgs;

    const timeoutFunc = () => {
        if (waitingArgs == null) {
            shouldWait = false;
        } else {
            func(...waitingArgs);
            waitingArgs = null;
            setTimeout(timeoutFunc, delay);
        }
    }
    return (...args) => {
        if (shouldWait) {
            waitingArgs = args;
            return;
        }
        func(...args);
        shouldWait = true;
        setTimeout(timeoutFunc, delay)
    }
}


