// Hàm cập nhật số lượng giỏ hàng
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

// Hàm xử lý khi click nút "Thêm vào giỏ"
function handleAddToCart() {
    const productCard = this.closest('.product-card');
    const productName = productCard.querySelector('.product-title').textContent;
    const productPrice = productCard.querySelector('.product-price').textContent;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex >= 0) {
        // Nếu đã có thì tăng số lượng
        cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
    } else {
        // Nếu chưa có thì thêm mới
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

// Hàm xử lý khi click nút "Xem chi tiết"
function handleViewDetail() {
    const productCard = this.closest('.product-card');
    const productName = productCard.querySelector('.product-title').textContent;
    const productPrice = productCard.querySelector('.product-price').textContent;
    const productImage = productCard.querySelector('.product-img').src;

    // Lưu thông tin sản phẩm vào sessionStorage để trang chi tiết có thể lấy
    sessionStorage.setItem('currentProduct', JSON.stringify({
        name: productName,
        price: productPrice,
        image: productImage
    }));

    // Chuyển hướng đến trang chi tiết sản phẩm
    window.location.href = "/BaiTapWebLon/html/products-detail.html";
}

// Thiết lập các nút "Thêm vào giỏ" và "Xem chi tiết"
function setupProductButtons() {
    document.querySelectorAll('.btn-primary').forEach(button => {
        if (button.textContent.trim() === 'Thêm vào giỏ') {
            // Xóa event listener cũ nếu có
            button.removeEventListener('click', handleAddToCart);
            // Thêm event listener mới
            button.addEventListener('click', handleAddToCart);
        }
    });

    document.querySelectorAll('.btn-outline-primary').forEach(button => {
        if (button.textContent.trim() === 'Xem chi tiết') {
            // Xóa event listener cũ nếu có
            button.removeEventListener('click', handleViewDetail);
            // Thêm event listener mới
            button.addEventListener('click', handleViewDetail);
        }
    });
}

// Xử lý lọc sản phẩm
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

    // Thiết lập lại các nút sau khi lọc
    setupProductButtons();
});

// Khởi tạo khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    setupProductButtons();
});
