function renderOrderSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderSummary = document.getElementById("order-summary");

    if (cart.length === 0) {
        orderSummary.innerHTML = `<p class="text-center text-warning">No items in the cart.</p>`;
        return;
    }

    let totalPrice = 0;
    const summaryItems = cart.map((item) => {
        totalPrice += item.quantity * item.price;

        return `
            <p>${item.title} - $${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</p>
        `;
    });

    orderSummary.innerHTML = `
        <h5>Order Summary</h5>
        ${summaryItems.join("")}
        <p><strong>Total Price: $${totalPrice.toFixed(2)}</strong></p>
    `;
}

document.getElementById("checkout-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const payment = document.getElementById("payment").value;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const orderConfirmation = `
        <h3>Order Confirmed</h3>
        <p>Thank you, <strong>${name}</strong>, for your purchase!</p>
        <p><strong>Shipping to:</strong> ${address}</p>
        <p><strong>Total Price:</strong> $${totalPrice.toFixed(2)}</p>
    `;

    document.getElementById("checkout-form").style.display = "none";
    document.getElementById("order-summary").innerHTML = orderConfirmation;

    localStorage.removeItem("cart");
    updateCartCount();
});

document.addEventListener("DOMContentLoaded", () => {
    renderOrderSummary();
});
