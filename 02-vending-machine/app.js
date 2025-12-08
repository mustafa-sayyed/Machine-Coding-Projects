// Initialize the vending machine
let vm;

// UI Elements
let messageDisplay;
let balanceDisplay;
let dispenseTray;
let adminMessage;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    vm = new VendingMachine();
    messageDisplay = document.getElementById('message');
    balanceDisplay = document.getElementById('balance');
    dispenseTray = document.getElementById('dispensedItem');
    adminMessage = document.getElementById('adminMessage');
    
    // Initialize: disable bill buttons until product is selected
    disableBillButtons();
});

// Product icons mapping
const productIcons = {
    'water': '💧',
    'chocolate': '🍫',
    'sprite': '🥤'
};

// Function to update the display screen
function updateDisplay(message, balance = vm.insertedBalance) {
    messageDisplay.textContent = message;
    balanceDisplay.textContent = `Balance: ₹${balance}`;
}

// Function to select a product
function selectProduct(productName) {
    const result = vm.selectProduct(productName);
    
    if (result.ok) {
        updateDisplay(result.message);
        highlightSelectedProduct(productName);
        enableBillButtons();
    } else {
        updateDisplay(result.message);
        showError();
    }
}

// Function to highlight the selected product
function highlightSelectedProduct(productName) {
    // Remove previous selection
    document.querySelectorAll('.product-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Highlight current selection
    const selectedCard = document.querySelector(`[data-product="${productName}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
}

// Function to insert a bill
function insertBill(amount) {
    if (!vm.selectedProduct) {
        updateDisplay('Please select a product first!');
        showError();
        return;
    }
    
    const result = vm.insertBill(amount);
    
    if (result.ok) {
        updateDisplay(result.message);
        
        // Check if product is dispensed
        if (result.message.includes('Dispensed')) {
            dispenseProduct();
            disableBillButtons();
        }
    } else {
        updateDisplay(result.message);
        showError();
    }
}

// Function to dispense the product
function dispenseProduct() {
    const productIcon = productIcons[vm.selectedProduct.name] || '📦';
    dispenseTray.textContent = productIcon;
    
    // Mark product as sold out in UI
    const productCard = document.querySelector(`[data-product="${vm.selectedProduct.name}"]`);
    if (productCard) {
        productCard.classList.add('sold-out');
        productCard.classList.remove('selected');
    }
    
    // Show success animation
    setTimeout(() => {
        updateDisplay('Transaction complete! Select another product or reset.');
    }, 2000);
}

// Function to reset the machine
function resetMachine() {
    vm = new VendingMachine();
    updateDisplay('Welcome! Select a product to begin', 0);
    dispenseTray.textContent = '';
    
    // Reset UI
    document.querySelectorAll('.product-card').forEach(card => {
        card.classList.remove('selected', 'sold-out');
    });
    
    disableBillButtons();
}

// Function to enable bill buttons
function enableBillButtons() {
    document.querySelectorAll('.bill-btn').forEach(btn => {
        btn.disabled = false;
    });
}

// Function to disable bill buttons
function disableBillButtons() {
    document.querySelectorAll('.bill-btn').forEach(btn => {
        btn.disabled = true;
    });
}

// Function to show error animation
function showError() {
    messageDisplay.style.animation = 'shake 0.5s';
    setTimeout(() => {
        messageDisplay.style.animation = '';
    }, 500);
}

// Admin function to restock products
function restockProduct() {
    const id = parseInt(document.getElementById('productId').value);
    const name = document.getElementById('productName').value.trim();
    const price = parseInt(document.getElementById('productPrice').value);
    
    if (!id || !name || !price) {
        showAdminMessage('Please fill all fields!', 'error');
        return;
    }
    
    const product = { id, name, price };
    const result = vm.reStock(product);
    
    if (result.ok) {
        showAdminMessage(result.message, 'success');
        addProductToUI(product);
        
        // Clear form
        document.getElementById('productId').value = '';
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
    } else {
        showAdminMessage(result.message, 'error');
    }
}

// Function to add product to UI dynamically
function addProductToUI(product) {
    const productsGrid = document.querySelector('.products-grid');
    
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.setAttribute('data-product', product.name);
    
    const icon = productIcons[product.name] || '📦';
    
    productCard.innerHTML = `
        <div class="product-icon">${icon}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-price">₹${product.price}</div>
        <button class="select-btn" onclick="selectProduct('${product.name}')">Select</button>
    `;
    
    productsGrid.appendChild(productCard);
}

// Function to show admin messages
function showAdminMessage(message, type) {
    adminMessage.textContent = message;
    adminMessage.className = type;
    
    setTimeout(() => {
        adminMessage.textContent = '';
        adminMessage.className = '';
    }, 3000);
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
