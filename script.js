// Function to render order summary
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

    if (!name || !address || !email || !phone) {
        alert('Please fill in all the required fields.');
        return;
    }

    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before checking out.');
        return;
    }

    // Simulate order processing
    alert(`Thank you, ${name}! Your order has been placed.`);

    // Clear the cart
    localStorage.removeItem('cart');
    cart = [];

    // Optionally, redirect to a confirmation page
    window.location.href = 'index.html';
}

// Render order summary on the checkout page
if (window.location.pathname.endsWith('checkout.html')) {
    renderOrderSummary();

    // Attach event listener to the "Place Order" button
    document.getElementById('place-order').addEventListener('click', processCheckout);
}
