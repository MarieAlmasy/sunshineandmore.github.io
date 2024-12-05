// Initialize the cart from localStorage or create a new one
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to load the cart
function loadCart() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}

// Function to render the cart in the cart page
function renderCart() {
    loadCart(); // Ensure the latest cart is loaded
    const cartItemsTable = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    // Clear existing rows except the header
    cartItemsTable.innerHTML = `
        <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
        </tr>
    `;

    // Populate table with cart items
    cart.forEach(item => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.quantity;
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td><button onclick="removeFromCart('${item.name}')">Remove</button></td>
        `;
        cartItemsTable.appendChild(row);
        totalPrice += itemTotal;
    });

    // Update total price
    totalPriceElement.innerText = `Total: $${totalPrice.toFixed(2)}`;
}

// Function to add an item to the cart
function addToCart(productName, productPrice) {
    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        // Increase the quantity if the product already exists
        existingProduct.quantity += 1;
    } else {
        // Add the product as a new entry in the cart
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Notify the user
    alert(`${productName} has been added to your cart!`);
}

// Function to remove an item from the cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Re-render the cart
    renderCart();
}

// Function to render the order summary on the checkout page
function renderOrderSummary() {
    loadCart(); // Ensure the latest cart is loaded
    const orderSummaryTable = document.getElementById('order-summary');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    // Clear existing rows except the header
    orderSummaryTable.innerHTML = `
        <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
        </tr>
    `;

    // Populate table with cart items
    cart.forEach(item => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.quantity;
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${itemTotal.toFixed(2)}</td>
        `;
        orderSummaryTable.appendChild(row);
        totalPrice += itemTotal;
    });

    // Update total price
    totalPriceElement.innerText = `Total: $${totalPrice.toFixed(2)}`;
}

// Function to validate and process the checkout form
function processCheckout() {
    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Check if all required fields are filled out
    if (!name || !address || !email || !phone) {
        alert('Please fill in all the required fields.');
        return;
    }

    // Check if the cart is empty
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before checking out.');
        return;
    }

    // Simulate order processing
    alert(`Thank you, ${name}! Your order has been placed.`);

    // Clear the cart
    localStorage.removeItem('cart');
    cart = [];

    // Redirect to the confirmation or home page
    window.location.href = 'index.html';
}

// Attach event listeners and render order summary if on the checkout page
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('checkout.html')) {
        renderOrderSummary();

        // Attach event listener to the "Place Order" button
        const placeOrderButton = document.getElementById('place-order');
        if (placeOrderButton) {
            placeOrderButton.addEventListener('click', processCheckout);
        } else {
            console.error('Place Order button not found!');
        }
    }

    if (window.location.pathname.endsWith('cart.html')) {
        renderCart(); // Load the cart on the cart page
    }
});
