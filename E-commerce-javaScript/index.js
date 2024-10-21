


// run after the HTML loaded
document.addEventListener("DOMContentLoaded", function () {

    const cartItemContainer = document.getElementById('cart-container');
    const totalPrice = document.getElementById('total')
    const checkOutBtn = document.getElementById('btn');

    // function to load cart item from localStorage and display them
    function loadCartItems() {
        const cart = JSON.parse(localStorage.getItem('cart')) || []    //data convert into string to json format


        if (cart.length > 0) {   // create cart item and append into dom
            cartItemContainer.innerHTML = "";
            cart.forEach((product, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList = 'cart-item';

                cartItem.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.name}">
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${product.title}</h3>
                    <p class="cart-itemprice">$${product.price.toFixed(2)}</p>
                  <div class="cart-item-actions">
                   <input type="number" value="${product.quantity}"min="1" class="quantity-input">
                   <button class="remove-button">Remove</button>
                  </div>
                </div>
                `;
                cartItemContainer.appendChild(cartItem);

                const removeButton = cartItem.querySelector('.remove-button');
                const quantity = cartItem.querySelector('.quantity-input');

                removeButton.addEventListener('click', () => {
                    console.log(cart.splice(index, 1));
                    cart.splice(index, 0);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    loadCartItems();    // load carts on display after remove any cart
                    // cartItem.remove();
                    updateCheckout();
                });

                quantity.addEventListener('change', (e) => {
                    product.quantity = parseInt(e.target.value)
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCheckout();  // update price after increase quantity product
                })

            });

            updateCheckout();   // after load carts set total and when remove cart then its work update the total price
        } else {
            cartItemContainer.innerText = "cart is empty !"  //if cart item is empty 
        }


    }
    // update the Checkout details like:-total
    function updateCheckout() {
        let total = 0;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.forEach((product) => {
            total += product.quantity * product.price;
        })
        console.log(total)
        totalPrice.textContent = `Total Price:- $ ${total.toFixed(2)}`
    }

    loadCartItems();

    checkOutBtn.addEventListener('click', () => {
        alert('proceed for checkout ! ')
    })

})
