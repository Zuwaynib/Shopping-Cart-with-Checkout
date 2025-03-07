// Sample products with image URLs
const products = [
    { 
        id: 1, 
        name: 'Shirt', 
        price: 19.99, 
        image: 'https://picsum.photos/200/200?random=1' 
    },
    { 
        id: 2, 
        name: 'Pants', 
        price: 29.99, 
        image: 'https://picsum.photos/200/200?random=2' 
    },
    { 
        id: 3, 
        name: 'Shoes', 
        price: 49.99, 
        image: 'https://picsum.photos/200/200?random=3' 
    }
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartDisplay();
});

// Display products
function displayProducts() {
    const productList = document.getElementById('productList');
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product-item';
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-details">
                <span>${product.name} - $${product.price.toFixed(2)}</span>
            </div>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(div);
    });
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.productId === productId);
    
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ 
            productId, 
            name: product.name, 
            price: product.price, 
            image: product.image, 
            quantity: 1 
        });
    }
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    cartItems.innerHTML = '';
    
    let total = 0;
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-image">
            <div class="product-details">
                <span>${item.name} - $${item.price.toFixed(2)}</span>
            </div>
            <div class="quantity-controls">
                <button onclick="changeQuantity(${item.productId}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${item.productId}, 1)">+</button>
            </div>
        `;
        cartItems.appendChild(div);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    checkoutBtn.disabled = cart.length === 0;
    checkoutBtn.onclick = showCheckoutModal;
}

// Change quantity
function changeQuantity(productId, change) {
    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            cart = cart.filter(item => item.productId !== productId);
        }
        updateCartDisplay();
    }
}

// Show checkout modal
function showCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    const modalCartItems = document.getElementById('modalCartItems');
    const modalTotal = document.getElementById('modalTotal');
    
    modalCartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-image" style="width: 50px; height: 50px;">
            ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
        `;
        modalCartItems.appendChild(div);
        total += item.price * item.quantity;
    });
    
    modalTotal.textContent = `Total: $${total.toFixed(2)}`;
    
    document.getElementById('confirmCheckout').onclick = confirmPurchase;
    document.getElementById('cancelCheckout').onclick = () => modal.style.display = 'none';
    
    modal.style.display = 'block';
}

// Confirm purchase
function confirmPurchase() {
    alert('Thank you for your purchase!');
    cart = [];
    updateCartDisplay();
    document.getElementById('checkoutModal').style.display = 'none';
}