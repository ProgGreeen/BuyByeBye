// JavaScript to handle cart functionality

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart
function addToCart(itemName, itemPrice) {
    const item = { name: itemName, price: itemPrice, quantity: 1 };
    
    // Check if item is already in the cart
    const existingItem = cart.find(cartItem => cartItem.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(item);
    }
    
    // Update cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count badge
    updateCartCount();
}

// Function to update cart count on the button
function updateCartCount() {
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.querySelector('.badge').textContent = cartCount;
}

// Function to render the cart on the cart page
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';  // Clear existing items
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty!</p>';
        return;
    }
    
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <h5>${item.name}</h5>
                <p>Price: $${item.price.toFixed(2)} | Quantity: ${item.quantity}</p>
            </div>
        `;
    });
    
    // Display total price
    cartContainer.innerHTML += `<h4>Total: $${total.toFixed(2)}</h4>`;
}

// Load cart count on page load
window.onload = updateCartCount;
