let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

// Function to display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('col mb-4');
        itemDiv.innerHTML = `
            <div class="card h-100">
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${item.name}</h5>
                        $${item.price}
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                    <button class="btn btn-outline-danger remove-from-cart" data-name="${item.name}">Remove</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
        totalPrice += parseFloat(item.price);
    });

    totalPriceContainer.textContent = totalPrice.toFixed(2);
}

// Function to remove item from cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// Event listener for remove buttons
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    updateCartCount();

    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
    removeFromCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            removeFromCart(name);
        });
    });

    document.getElementById('checkout').addEventListener('click', () => {
        // Redirect to payment page
        window.location.href = 'payment.html';
    });
});


