document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'T1000-2025'; 
    
    const products = [
        {
            id: "T1000-2025",
            name: "Máy tiện CNC T-1000",
            price: "450.000.000 VNĐ",
            priceValue: 450000000,
            images: [
                "../img/cac-loai-may-tien-1.jpg",
                "../img/cac-loai-may-tien-1.jpg",
                "../img/product-large-3.jpg",
                "../img/product-large-4.jpg"
            ],
            thumbnails: [
                "../img/cac-loai-may-tien-1.jpg",
                "../img/cac-loai-may-tien-1.jpg",
                "../img/product-thumb-3.jpg",
                "../img/product-thumb-4.jpg"
            ],
            description: `
                <p>Máy tiện CNC T-1000 là sản phẩm cao cấp nhất trong dòng máy tiện của LOBEO, được thiết kế để đáp ứng các yêu cầu gia công chính xác nhất trong ngành cơ khí chế tạo.</p>
                <p>Với hệ thống điều khiển Fanuc 31i-B5, máy có khả năng gia công các chi tiết phức tạp với độ chính xác lên đến 0.001mm.</p>
            `,
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
    ];


    const product = products.find(p => p.id === productId) || products[0];
    
    displayProductInfo(product);
    
    initializeCart();
    initializeWishlist();
    
    updateCartCount();
});

function displayProductInfo(product) {
    if (!product) return;
    
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = product.price;
    document.getElementById('product-description').innerHTML = product.description;
    
    const mainImage = document.getElementById('mainImage');
    if (mainImage && product.images.length > 0) {
        mainImage.src = product.images[0];
        mainImage.alt = product.name;
    }

    const thumbnailsContainer = document.querySelector('.thumbnail-container');
    if (thumbnailsContainer && product.thumbnails) {
        thumbnailsContainer.innerHTML = product.thumbnails.map((thumb, index) => `
            <img src="${thumb}" alt="${product.name} - Ảnh ${index + 1}" 
                 class="thumbnail ${index === 0 ? 'active' : ''}" 
                 onclick="changeImage('${product.images[index]}', this)">
        `).join('');
    }
    
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
}

function initializeCart() {
    const addToCartBtn = document.getElementById('add-to-cart');
    if (!addToCartBtn) return;
    
    addToCartBtn.addEventListener('click', function() {
        const productName = document.getElementById('product-name').textContent;
        const productPrice = document.getElementById('product-price').textContent;
        const quantity = parseInt(document.getElementById('quantity').value) || 1;
        
        const product = {
            id: new URLSearchParams(window.location.search).get('id') || 'T1000-2025',
            name: productName,
            price: productPrice,
            image: document.getElementById('mainImage').src,
            quantity: quantity
        };
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex >= 0) {
            cart[existingItemIndex].quantity += quantity;
        } else {
   
            cart.push(product);
        }
        

        localStorage.setItem('cart', JSON.stringify(cart));

        showAlert(`Đã thêm ${quantity} ${productName} vào giỏ hàng!`, 'success');
        
        updateCartCount();
    });
}


function initializeWishlist() {
    const wishlistBtn = document.getElementById('wishlist-btn');
    if (!wishlistBtn) return;
    
    const productId = new URLSearchParams(window.location.search).get('id') || 'T1000-2025';
    const icon = wishlistBtn.querySelector('i');

    const isFavorited = localStorage.getItem(`favorite_${productId}`) === 'true';
    if (isFavorited) {
        icon.classList.add('text-danger');
    }
    
    wishlistBtn.addEventListener('click', function() {
        const currentlyFavorite = icon.classList.contains('text-danger');
        
        if (currentlyFavorite) {
            icon.classList.remove('text-danger');
            localStorage.setItem(`favorite_${productId}`, 'false');
            showAlert('Đã xóa khỏi danh sách yêu thích', 'info');
        } else {
            icon.classList.add('text-danger');
            localStorage.setItem(`favorite_${productId}`, 'true');
            showAlert('Đã thêm vào danh sách yêu thích', 'success');
        }
    });
}

function changeImage(src, element) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = src;
    }
    
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    element.classList.add('active');
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

// Giảm số lượng
function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
        element.style.display = totalItems > 0 ? 'flex' : 'none';
    });
}

function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} position-fixed top-0 end-0 m-3`;
    alertDiv.style.zIndex = '9999';
    alertDiv.style.transition = 'all 0.5s ease';
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
   
    setTimeout(() => {
        alertDiv.style.opacity = '0';
        setTimeout(() => {
            alertDiv.remove();
        }, 500);
    }, 3000);
}
