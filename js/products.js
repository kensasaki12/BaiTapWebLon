function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');

    if (cart.length > 0) {
        cartCount.textContent = cart.length;
        cartCount.style.display = 'inline-block';
    } else {
        cartCount.style.display = 'none';
    }
}

function handleAddToCart() {
    const productCard = this.closest('.product-card');
    const productName = productCard.querySelector('.product-title').textContent;
    const productPrice = productCard.querySelector('.product-price').textContent;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    alert('Đã thêm ' + productName + ' vào giỏ hàng');
}

function handleViewDetail() {
    const productCard = this.closest('.product-card');
    const productName = productCard.querySelector('.product-title').textContent;
    const productPrice = productCard.querySelector('.product-price').textContent;
    const productImage = productCard.querySelector('.product-img').src;

    const productIdMap = {
        "Máy tiện CNC LOBEO T-1000": "T1000-2025",
        "Máy tiện CNC đa năng T-800": "T800-2025",
        "Máy tiện CNC cao cấp T-2000": "T2000-2025",
        "Máy phay CNC LOBEO F-500": "F500-2025",
        "Máy phay đứng F-300": "F300-2025",
        "Máy phay ngang F-700": "F700-2025",
        "Máy cắt laser LOBEO L-1000": "L1000-2025",
        "Máy cắt laser fiber L-500": "L500-2025",
        "Máy cắt laser CO2 L-300": "L300-2025",
        "Dao phay hợp kim cao cấp": "PT001",
        "Mũi khoan từ chính hãng": "PT002",
        "Đầu kẹp dao BT40": "PT003"
    };

    const productId = productIdMap[productName] || "T1000-2025";

    sessionStorage.setItem('currentProduct', JSON.stringify({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage
    }));

    window.location.href = `../html/products-detail.html?id=${productId}`;
}

function setupProductButtons() {
    document.querySelectorAll('.btn-primary').forEach(button => {
        if (button.textContent.trim() === 'Thêm vào giỏ') {
            button.removeEventListener('click', handleAddToCart);
            button.addEventListener('click', handleAddToCart);
        }
    });

    document.querySelectorAll('.btn-outline-primary').forEach(button => {
        if (button.textContent.trim() === 'Xem chi tiết') {
            button.removeEventListener('click', handleViewDetail);
            button.addEventListener('click', handleViewDetail);
        }
    });
}

document.querySelector('.filter-section button').addEventListener('click', function() {
    const category = document.getElementById('category-filter').value;
    const price = document.getElementById('price-filter').value;
    const brand = document.getElementById('brand-filter').value;

    document.querySelectorAll('.product-category').forEach(section => {
        section.style.display = 'none';
    });

    if (category === 'may-tien' || category === 'may-phay' || category === 'may-cat-laser' || category === 'phu-tung') {
        document.getElementById(category).style.display = 'block';
    } else {
        document.querySelectorAll('.product-category').forEach(section => {
            section.style.display = 'block';
        });
    }

    window.scrollTo({
        top: document.querySelector('.filter-section').offsetTop + 100,
        behavior: 'smooth'
    });

    setupProductButtons();
});

document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    setupProductButtons();
});
