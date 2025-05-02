// Hàm chuẩn hóa giá tiền từ chuỗi sang số
function normalizePrice(priceStr) {
    if (!priceStr) return 0;
    // Xóa tất cả ký tự không phải số
    const number = parseFloat(priceStr.replace(/[^\d]/g, ''));
    return isNaN(number) ? 0 : number;
}

// Hàm định dạng tiền tệ
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const subtotalElement = document.getElementById('subtotal');
    const shippingFeeElement = document.getElementById('shipping-fee');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const applyCouponBtn = document.getElementById('apply-coupon');
    const couponCodeInput = document.getElementById('coupon-code');
    const couponMessage = document.getElementById('coupon-message');

    // Lấy giỏ hàng từ localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let discount = 0; // % giảm giá

    // Hiển thị giỏ hàng
    function renderCart() {
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            emptyCartMessage.style.display = '';
            checkoutBtn.disabled = true;
            updateSummary(0, 0, 0);
            return;
        }

        emptyCartMessage.style.display = 'none';
        checkoutBtn.disabled = false;

        cart.forEach((item, index) => {
            if (!item) return;

            const price = normalizePrice(item.price);
            const quantity = item.quantity || 1;
            const total = price * quantity;

            const row = document.createElement('tr');
            row.dataset.index = index;
            row.innerHTML = `
                <td>
                    <img src="${item.image || '../img/default-product.jpg'}" 
                         alt="${item.name}" 
                         class="img-thumbnail" 
                         style="width: 60px; height: 60px; object-fit: cover;">
                </td>
                <td class="align-middle">${item.name || 'Sản phẩm không tên'}</td>
                <td class="align-middle">${formatCurrency(price)}</td>
                <td class="align-middle">
                    <div class="input-group" style="max-width: 120px;">
                        <button class="btn btn-outline-secondary decrease-qty" type="button">-</button>
                        <input type="number" class="form-control text-center quantity-input" 
                               value="${quantity}" min="1" data-index="${index}">
                        <button class="btn btn-outline-secondary increase-qty" type="button">+</button>
                    </div>
                </td>
                <td class="align-middle">${formatCurrency(total)}</td>
                <td class="align-middle">
                    <button class="btn btn-outline-danger btn-sm remove-item" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            cartItemsContainer.appendChild(row);
        });

        updateCartSummary();
    }

    // Cập nhật tổng tiền
    function updateCartSummary() {
        let subtotal = 0;

        cart.forEach(item => {
            if (!item) return;
            const price = normalizePrice(item.price);
            subtotal += price * (item.quantity || 1);
        });

        // Tính phí vận chuyển (miễn phí ship cho đơn > 10tr)
        const shippingFee = subtotal > 10000000 ? 0 : 50000;

        // Tính tổng sau giảm giá
        const discountedTotal = subtotal * (1 - discount);
        const total = discountedTotal + shippingFee;

        updateSummary(subtotal, shippingFee, total);
    }

    function updateSummary(subtotal, shippingFee, total) {
        subtotalElement.textContent = formatCurrency(subtotal);
        shippingFeeElement.textContent = formatCurrency(shippingFee);
        totalElement.textContent = formatCurrency(total);
    }

    // Xử lý sự kiện tăng/giảm số lượng
    function handleQuantityChange(index, change) {
        if (!cart[index]) return;

        const newQuantity = (cart[index].quantity || 1) + change;
        if (newQuantity >= 1) {
            cart[index].quantity = newQuantity;
            saveCart();
        }
    }

    // Xử lý xóa sản phẩm
    function handleRemoveItem(index) {
        if (confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?')) {
            cart.splice(index, 1);
            saveCart();
        }
    }

    // Áp dụng mã giảm giá
    function applyCoupon() {
        const couponCode = couponCodeInput.value.trim();

        // Reset message
        couponMessage.textContent = '';
        couponMessage.classList.remove('text-success', 'text-danger');

        if (!couponCode) {
            showCouponMessage('Vui lòng nhập mã giảm giá', 'error');
            return;
        }

        // Danh sách mã giảm giá hợp lệ
        const validCoupons = {
            'LOBEO10': 0.1, // Giảm 10%
            'LOBEO5': 0.05 // Giảm 5%
        };

        if (validCoupons[couponCode]) {
            discount = validCoupons[couponCode];
            showCouponMessage(`Áp dụng thành công giảm ${discount*100}%!`, 'success');
            updateCartSummary();
        } else {
            showCouponMessage('Mã giảm giá không hợp lệ', 'error');
        }
    }

    function showCouponMessage(message, type) {
        couponMessage.textContent = message;
        couponMessage.classList.add(type === 'success' ? 'text-success' : 'text-danger');
    }

    // Lưu giỏ hàng
    function saveCart() {
        // Lọc bỏ các item không hợp lệ
        cart = cart.filter(item => item && item.id);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateHeaderCartCount();
    }

    // Cập nhật số lượng trên header
    function updateHeaderCartCount() {
        const totalItems = cart.reduce((total, item) => total + (item ? item.quantity || 1 : 0), 0);
        const cartCountElements = document.querySelectorAll('.cart-count');

        cartCountElements.forEach(element => {
            element.textContent = totalItems;
            element.style.display = totalItems > 0 ? 'block' : 'none';
        });
    }

    // Xử lý sự kiện
    cartItemsContainer.addEventListener('click', function(e) {
        const indexElement = e.target.closest('[data-index]');
        if (!indexElement) return;

        const index = indexElement.dataset.index;

        if (e.target.closest('.remove-item')) {
            handleRemoveItem(index);
        } else if (e.target.classList.contains('increase-qty')) {
            handleQuantityChange(index, 1);
        } else if (e.target.classList.contains('decrease-qty')) {
            handleQuantityChange(index, -1);
        }
    });

    // Xử lý thay đổi số lượng từ input
    cartItemsContainer.addEventListener('change', function(e) {
        if (e.target.classList.contains('quantity-input')) {
            const index = e.target.dataset.index;
            const newQuantity = parseInt(e.target.value);

            if (newQuantity >= 1 && cart[index]) {
                cart[index].quantity = newQuantity;
                saveCart();
            } else {
                e.target.value = cart[index] ? cart[index].quantity || 1 : 1;
            }
        }
    });

    // Áp dụng mã giảm giá
    applyCouponBtn.addEventListener('click', applyCoupon);
    couponCodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') applyCoupon();
    });

    // Thanh toán
    checkoutBtn.addEventListener('click', function() {
        localStorage.setItem('checkoutCart', JSON.stringify(cart));
        window.location.href = '../checkout/checkout.html';
    });

    // Khởi tạo
    renderCart();
    updateHeaderCartCount();
});