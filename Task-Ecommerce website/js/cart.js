function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartSummary = document.getElementById("cart-summary");

    if (cart.length === 0) {
        // Display a message and "Go to Home Page" button if the cart is empty
        cartSummary.innerHTML = `
            <div class="text-center">
                <p class="text-warning">Your cart is empty.</p>
                <button class="btn btn-primary" onclick="location.href='index.html'">Go to Home Page</button>
            </div>
        `;
        return;
    }

    let totalItems = 0;
    let totalPrice = 0;
    const cartItems = cart.map((item) => {
        totalItems += item.quantity;
        totalPrice += item.quantity * item.price;

        return `
            <div class="row border p-2 mb-2">
                <div class="col-md-2">
                    <img src="${item.image}" alt="${item.title}" class="img-fluid">
                </div>
                <div class="col-md-6">
                    <h5>${item.title}</h5>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <div class="col-md-4 text-end">
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
    });

    cartSummary.innerHTML = `
        ${cartItems.join("")}
        <div class="border-top pt-3">
            <h5>Total Items: ${totalItems}</h5>
            <h5>Total Price: $${totalPrice.toFixed(2)}</h5>
            <button class="btn btn-success" onclick="goToCheckout()">Checkout</button>
        </div>
    `;
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-button").innerText = `Cart (${totalItems})`;
}

function goToCheckout() {
    location.href = "checkout.html";
}

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    updateCartCount();
});
