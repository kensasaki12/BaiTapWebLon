document.addEventListener('DOMContentLoaded', function() {
    // Lấy ID sản phẩm từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Cơ sở dữ liệu sản phẩm
    const products = [{
            id: "T1000-2025",
            name: "Máy tiện CNC T-1000",
            price: "450.000.000 VNĐ",
            images: [
                "../../img/product-large-1.jpg",
                "../../img/product-large-2.jpg",
                "../../img/product-large-3.jpg",
                "../../img/product-large-4.jpg"
            ],
            thumbnails: [
                "../../img/product-thumb-1.jpg",
                "../../img/product-thumb-2.jpg",
                "../../img/product-thumb-3.jpg",
                "../../img/product-thumb-4.jpg"
            ],
            description: "Máy tiện CNC T-1000 là sản phẩm cao cấp nhất trong dòng máy tiện của LOBEO...",
            specifications: {
                "Model": "T-1000",
                "Hãng sản xuất": "LOBEO MACHINERY",
                "Xuất xứ": "Nhật Bản",
                "Hệ điều hành": "Fanuc 31i-B5",
                "Kích thước bàn máy": "Ø1000mm",
                "Hành trình trục X/Z": "800/1500mm",
                "Tốc độ trục chính": "10-4500 vòng/phút",
                "Công suất động cơ": "15kW",
                "Độ chính xác": "±0.001mm",
                "Kích thước máy": "3500×2000×2100mm",
                "Trọng lượng": "6500kg"
            }
        }
        // Có thể thêm các sản phẩm khác vào đây
    ];

    // Tìm sản phẩm hiện tại
    const product = products.find(p => p.id === productId);

    if (product) {
        // Cập nhật thông tin sản phẩm
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = product.price;
        document.getElementById('product-description').innerHTML = product.description;

        // Cập nhật hình ảnh sản phẩm nếu có nhiều hình
        if (product.images && product.images.length > 0) {
            const mainImage = document.getElementById('mainImage');
            mainImage.src = product.images[0];
            mainImage.alt = product.name;

            // Tạo thumbnail nếu cần
            const thumbnailsContainer = document.querySelector('.thumbnail-container');
            if (thumbnailsContainer && product.thumbnails) {
                thumbnailsContainer.innerHTML = product.thumbnails.map((thumb, index) => `
                    <img src="${thumb}" alt="${product.name} - Ảnh ${index + 1}" 
                         class="thumbnail ${index === 0 ? 'active' : ''}" 
                         onclick="changeImage('${product.images[index]}')">
                `).join('');
            }
        }

        // Cập nhật thông số kỹ thuật
        const specsTable = document.querySelector('.specs-table');
        if (specsTable && product.specifications) {
            specsTable.innerHTML = Object.entries(product.specifications)
                .map(([key, value]) => `
                    <tr>
                        <td>${key}</td>
                        <td>${value}</td>
                    </tr>
                `).join('');
        }

        // Xử lý nút thêm vào giỏ hàng
        document.getElementById('add-to-cart').addEventListener('click', function() {
            const quantity = parseInt(document.getElementById('quantity').value);

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItemIndex = cart.findIndex(item => item.id === product.id);

            if (existingItemIndex >= 0) {
                // Cập nhật số lượng nếu sản phẩm đã có trong giỏ
                cart[existingItemIndex].quantity += quantity;
            } else {
                // Thêm sản phẩm mới vào giỏ
                const cartItem = {
                    ...product,
                    quantity: quantity
                };
                cart.push(cartItem);
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            // Hiển thị thông báo
            alert(`Đã thêm ${quantity} ${product.name} vào giỏ hàng!`);

            // Cập nhật số lượng trong giỏ hàng
            updateCartCount();
        });
    }

    // Khởi tạo số lượng trong giỏ hàng
    updateCartCount();
});

// Hàm toàn cục
function changeImage(src) {
    document.getElementById('mainImage').src = src;

    // Cập nhật thumbnail active
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');

    cartCountElements.forEach(element => {
        element.textContent = totalItems;
        element.style.display = totalItems > 0 ? 'flex' : 'none';
    });
}