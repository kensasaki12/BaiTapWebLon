const checkoutForm = document.getElementById('checkout-form');
const submitBtn = document.getElementById('submit-order');
const paymentMethods = document.querySelectorAll('.payment-method');

document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    setupEventListeners();
});

function setupEventListeners() {
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('selected'));
            this.classList.add('selected');
            document.getElementById(this.dataset.method).checked = true;
        });
    });

    checkoutForm.addEventListener('submit', processCheckout);
}

function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderSummary = document.querySelector('.order-summary .order-items');
    
    if (cart.length === 0) {
        orderSummary.innerHTML = '<p class="text-center">Giỏ hàng trống</p>';
        submitBtn.disabled = true;
        return;
    }

    let html = '';
    let subtotal = 0;

    cart.forEach(item => {
        const price = parseFloat(item.price.replace(/\./g, '')) * (item.quantity || 1);
        subtotal += price;
        
        html += `
            <div class="order-item">
                <div class="d-flex justify-content-between">
                    <span>${item.name}</span>
                    <span>${formatCurrency(price)}</span>
                </div>
                <div class="text-muted small">Số lượng: ${item.quantity || 1}</div>
            </div>
        `;
    });

    orderSummary.innerHTML = html;
    document.getElementById('subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('total').textContent = formatCurrency(subtotal);
}

function processCheckout(e) {
    e.preventDefault();
    
    if (!validateForm()) return;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Đang xử lý...';

    setTimeout(() => {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const formData = new FormData(checkoutForm);
        const orderData = {
            id: Date.now(),
            customer: Object.fromEntries(formData),
            items: JSON.parse(localStorage.getItem('cart')),
            total: document.getElementById('total').textContent,
            payment: document.querySelector('input[name="payment"]:checked').id,
            date: new Date().toISOString(),
            status: 'pending'
        };
        
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));

        localStorage.removeItem('cart');
        updateCartCount();

        window.location.href = `order-confirmation.html?order_id=${orderData.id}`;
    }, 1500);
}

function validateForm() {
    const requiredFields = checkoutForm.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });

    if (!document.getElementById('agree-terms').checked) {
        alert('Vui lòng đồng ý với điều khoản và điều kiện');
        isValid = false;
    }

    return isValid;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount).replace('₫', '') + '₫';
}

window.selectPayment = function(element, method) {
    paymentMethods.forEach(m => m.classList.remove('selected'));
    element.classList.add('selected');
    document.getElementById(method).checked = true;
};
