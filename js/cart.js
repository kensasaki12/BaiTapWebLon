function normalizePrice(priceStr) {
    if (!priceStr) return 0;

    const number = parseFloat(priceStr.replace(/[^\d]/g, ''));
    return isNaN(number) ? 0 : number;
}


function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const subtotalElement = document.getElementById('subtotal');
    const shippingFeeElement = document.getElementById('shipping-fee');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const applyCouponBtn = document.getElementById('apply-coupon');
    const couponCodeInput = document.getElementById('coupon-code');
    const couponMessage = document.getElementById('coupon-message');

  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let discount = 0; 

   
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

   
    function updateCartSummary() {
        let subtotal = 0;

        cart.forEach(item => {
            if (!item) return;
            const price = normalizePrice(item.price);
            subtotal += price * (item.quantity || 1);
        });

      
        const shippingFee = subtotal > 10000000 ? 0 : 50000;

       
        const discountedTotal = subtotal * (1 - discount);
        const total = discountedTotal + shippingFee;

        updateSummary(subtotal, shippingFee, total);
    }

    function updateSummary(subtotal, shippingFee, total) {
        subtotalElement.textContent = formatCurrency(subtotal);
        shippingFeeElement.textContent = formatCurrency(shippingFee);
        totalElement.textContent = formatCurrency(total);
    }

    
    function handleQuantityChange(index, change) {
        if (!cart[index]) return;

        const newQuantity = (cart[index].quantity || 1) + change;
        if (newQuantity >= 1) {
            cart[index].quantity = newQuantity;
            saveCart();
        }
    }

    
        if (confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?')) {
            cart.splice(index, 1);
            saveCart();
        }
    }

   
    function applyCoupon() {
        const couponCode = couponCodeInput.value.trim();

        // Reset message
        couponMessage.textContent = '';
        couponMessage.classList.remove('text-success', 'text-danger');

        if (!couponCode) {
            showCouponMessage('Vui lòng nhập mã giảm giá', 'error');
            return;
        }

        
        const validCoupons = {
            'LOBEO10': 0.1, 
            'LOBEO5': 0.05 
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

    function saveCart() {
      
        cart = cart.filter(item => item && item.id);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateHeaderCartCount();
    }

   
    function updateHeaderCartCount() {
        const totalItems = cart.reduce((total, item) => total + (item ? item.quantity || 1 : 0), 0);
        const cartCountElements = document.querySelectorAll('.cart-count');

        cartCountElements.forEach(element => {
            element.textContent = totalItems;
            element.style.display = totalItems > 0 ? 'block' : 'none';
        });
    }

    
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

    
    applyCouponBtn.addEventListener('click', applyCoupon);
    couponCodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') applyCoupon();
    });

   
    checkoutBtn.addEventListener('click', function() {
        localStorage.setItem('checkoutCart', JSON.stringify(cart));
        window.location.href = 'checkout.html';
    });

   
    renderCart();
    updateHeaderCartCount();
});
