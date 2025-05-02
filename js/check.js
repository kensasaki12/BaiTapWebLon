// main.js - Xử lý tìm kiếm và hiệu ứng hover

document.addEventListener('DOMContentLoaded', function() {
    // ========== XỬ LÝ TÌM KIẾM ==========
    const searchForm = document.querySelector('form[role="search"]');

    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input[type="search"]');
            const searchTerm = searchInput.value.trim();

            if (searchTerm) {
                performSearch(searchTerm);
            } else {
                alert('Vui lòng nhập từ khóa tìm kiếm');
                searchInput.focus();
            }
        });
    }

    // ========== HIỆU ỨNG HOVER CHO NÚT ==========
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        // Lưu màu gốc
        const originalClass = button.className;
        const originalStyle = button.style.cssText;

        button.addEventListener('mouseenter', () => {
            if (button.classList.contains('btn-outline-light')) {
                button.classList.remove('btn-outline-light');
                button.classList.add('btn-light');
            }
            button.style.transform = 'scale(1.02)';
            button.style.transition = 'all 0.2s ease';
        });

        button.addEventListener('mouseleave', () => {
            button.className = originalClass;
            button.style.cssText = originalStyle;
        });
    });

    // ========== HIỆU ỨNG HOVER CHO NAV ITEM ==========
    const navItems = document.querySelectorAll('.nav-link, .dropdown-item');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            item.style.transition = 'background-color 0.3s ease';
        });

        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = '';
        });
    });

    // ========== HÀM TÌM KIẾM ==========
    function performSearch(term) {
        console.log('Đang tìm kiếm:', term);
        // Hiển thị thông báo demo
        alert(`Đang tìm kiếm sản phẩm với từ khóa: "${term}"\n\nChức năng tìm kiếm thực tế sẽ được tích hợp sau khi có danh sách sản phẩm.`);

        // Trong thực tế, bạn sẽ:
        // 1. Gọi API tìm kiếm hoặc
        // 2. Lọc danh sách sản phẩm hiện có
        // 3. Hiển thị kết quả
    }
});

// Thêm animation cho sản phẩm (sẽ dùng sau)
const style = document.createElement('style');
style.textContent = `
    .product-hover {
        transition: all 0.3s ease;
    }
    .product-hover:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }
    @keyframes highlight {
        0% { background-color: rgba(13, 110, 253, 0.1); }
        100% { background-color: transparent; }
    }
`;
document.head.appendChild(style);