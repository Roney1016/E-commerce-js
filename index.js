console.log("product")
const featureProduct = document.getElementById('feature-products')
// fetch("https://fakestoreapi.com/products")
//     .then((res) => res.json())
//     .then((data) => {
//         data.slice(0, 10).forEach(element => {
//             // create carts and append
//             const product = document.createElement('div');
//             product.classList.add('product')
//             product.innerHTML = `<img src=${element.image} alt="product1">
//                     <h3>${element.title}</h3>
//                     <p>${element.price}$</p>
//                     <a href="" data-product=${JSON.stringify(element)}></a>
//                     `;

//             // console.log(element)
//             featureProduct.appendChild(product);
//         });
//     })
//     .catch((err) => console.log(err))


/********************* *using promise for fetch data from server XMLHttpRequest ************************************/

function fetchDataPromise(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();   // create a new XMLHttpRequest obj(instance)
        xhr.open('GET', url, true);         // open url
        xhr.onload = function () {          // after request successfully
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText))
            } else {
                reject(xhr.statusText)
            }
        }
        xhr.onerror = function () {     // request fail 
            reject(xhr.statusText)
        };
        xhr.send();
    })
}


/***************************** using async/await fetch data from server ******************************/
async function fetchDataAsync(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new error("Network response was not ok " + response.statusText)
        }

        const data = await response.json();
        // console.log(data)

        return data.products;
    } catch (error) {
        console.error('Error fetching products with async/await:', error);
    }
}



document.addEventListener("DOMContentLoaded", async () => {
    try {

        const data = await fetchDataAsync("https://dummyjson.com/products");
        // console.log(window.data);
        if (data && data.length > 0) {
            featureProduct.innerHTML = "";
            data.slice(10, 20).forEach(element => {
                // create carts and append
                const product = document.createElement('div');
                product.classList.add('product')
                product.innerHTML = `<img src=${element.thumbnail} alt="product1">
                                    <h3>${element.title}</h3>
                                    <p>${element.price}$</p>
                                    <input type="number" name="" id="" value="1" min="1">
                                    <a href="#" class="add-to-cart " data-product='${JSON.stringify(element)}'>Add To Cart</a>
                                    `;

                // console.log(element)
                featureProduct.appendChild(product);
            });

        } else {
            featureProduct.innerHTML = "<p> no feature product available !</p>"
        }
        document.querySelectorAll(".add-to-cart").forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const data = e.target.getAttribute('data-product');
                // console.log(data)
                const product = JSON.parse(data);
                const quantityInput = e.target.previousElementSibling;
                const quantity = parseInt(quantityInput.value)
                console.log(quantity)

                // console.log(product)
                addToCart(product, quantity);
            })
        })
    } catch (error) {
        console.log(error);
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



})

/******************************* for admin add items  ******************************/
class product {
    constructor(title, img, price, description) {
        this.title = title;
        this.img = img;
        this.price = price;
        this.description = description
    }
    dispaly() {
        const div = document.createElement("div");
        div.innerHTML = `<img src=${this.img} alt="product1">
                                    <h3>${this.title}</h3>
                                    <p>${this.price}$</p>
                                    <input type="number" name="" id="" value="1" min="1">
                                    <a href="#" class="add-to-cart " data-product='${JSON.stringify(this)}'>Add To Cart</a>
                                    
        `;
        return div;
    }

}

class discount extends product {
    constructor(title, img, price, description, discount) {
        super(title, img, price, description);
        this.discount = discount
    }
}
const myPro = new product("img", "null", "111", "desss");
const discountPro = new discount("img", "null", "111", "desss", "20%")
// console.log(discountPro.dispaly())

document.querySelector("#cta-button").addEventListener("click", () => {
    window.location.href = "./E-commerce-javaScript/shop.html"
})
