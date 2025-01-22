
const API_URL = "https://fakestoreapi.com/products";
let currentPage = 1;
const itemsPerPage = 6;
let allProducts = [];

// Fetch products from FakeStoreAPI
async function fetchProducts() {
    try {
        document.getElementById("loader").style.display = "block";
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        const products = await response.json();
        allProducts = products;
        document.getElementById("loader").style.display = "none";
        displayProducts();
        createPagination();
    } catch (error) {
        console.error("Error fetching products:", error);
        document.getElementById("loader").style.display = "none";
        document.getElementById("product-list").innerHTML = `
            <p class="text-danger">Failed to load products. Please try again later.</p>
        `;
    }
}


// Display products dynamically in the product list
function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToDisplay = allProducts.slice(startIndex, endIndex);

    productsToDisplay.forEach((product) => {
        const productCard = `
            <div class="col-md-4">
                <div class="card mb-4">
                    <img src="${product.image}" class="card-img-top img-fluid" alt="${product.title}" style="object-fit: contain; height: 300px;">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">$${product.price.toFixed(2)}</p>
                        <button class="btn btn-primary" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

// Add product to the cart
function addToCart(id, title, price, image) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((product) => product.id === id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id, title, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${title} has been added to the cart.`);
}

// Update the cart count in the navigation bar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
    document.getElementById("cart-button").innerText = `Cart (${totalItems})`;
}

// Create pagination buttons
function createPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = ""; 
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.className = "btn btn-secondary btn-sm mx-1"; 
        button.innerText = i;
        button.onclick = () => {
            currentPage = i;
            displayProducts();
        };

        if (i === currentPage) {
            button.classList.add("active");
        }

        pagination.appendChild(button);
    }
}
function init() {
    fetchProducts();
    updateCartCount();
}
document.addEventListener("DOMContentLoaded", init);

console.log("Product.js is loaded");
