document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header.bg-primary');
    if (header) {
 
        const initParallax = () => {
            header.style.willChange = 'transform';
            header.style.transform = 'translateZ(0)';

            document.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 8;
                const y = (e.clientY / window.innerHeight - 0.5) * 4;
                header.style.transform = `translate3d(${x}px, ${y}px, 0)`;
                header.style.transition = 'transform 0.8s cubic-bezier(0.1, 0.7, 0.1, 1)';
            });

            header.addEventListener('mouseleave', () => {
                header.style.transform = 'translate3d(0, 0, 0)';
                header.style.transition = 'transform 1s cubic-bezier(0.25, 0.1, 0.25, 1)';
            });
        };

        const initScrollEffect = () => {
            let lastScroll = 0;
            const scrollThreshold = 50;

            window.addEventListener('scroll', () => {
                const currentScroll = window.scrollY;
                
                if (currentScroll > scrollThreshold) {
                    header.classList.add('scrolled');
                    header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                } else {
                    header.classList.remove('scrolled');
                    header.style.boxShadow = 'none';
                }

                if (currentScroll > lastScroll && currentScroll > 100) {
                    header.style.transform = 'translate3d(0, -100%, 0)';
                } else {
                    header.style.transform = 'translate3d(0, 0, 0)';
                }

                lastScroll = currentScroll;
            });
        };

        initParallax();
        initScrollEffect();
    }

    const highlightCurrentNav = () => {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            
            if (currentPath.toLowerCase() === linkPath.toLowerCase() || 
                (currentPath === '' && linkPath === 'index.html')) {
                
                link.classList.add('active');
                link.style.position = 'relative';
                
                const underline = document.createElement('div');
                underline.className = 'nav-underline';
                underline.style.position = 'absolute';
                underline.style.bottom = '0';
                underline.style.left = '0';
                underline.style.width = '100%';
                underline.style.height = '2px';
                underline.style.backgroundColor = '#fff';
                underline.style.transform = 'scaleX(0)';
                underline.style.transformOrigin = 'left';
                underline.style.transition = 'transform 0.3s ease';
                
                link.appendChild(underline);
                

                link.addEventListener('mouseenter', () => {
                    underline.style.transform = 'scaleX(1)';
                });
                
                link.addEventListener('mouseleave', () => {
                    underline.style.transform = 'scaleX(0)';
                });
                
                setTimeout(() => {
                    underline.style.transform = 'scaleX(1)';
                }, 100);
            } else {
                link.classList.remove('active');
            }
        });
    };

    const initDropdowns = () => {
        const dropdowns = document.querySelectorAll('.dropdown');

        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('show.bs.dropdown', () => {
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.opacity = '0';
                    menu.style.transform = 'translateY(-10px)';
                }
            });

            dropdown.addEventListener('shown.bs.dropdown', () => {
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.opacity = '1';
                    menu.style.transform = 'translateY(0)';
                    menu.style.transition = 'all 0.3s ease-out';
                }
            });
        });
    };

    const initCart = () => {
        const updateCartCount = () => {
            try {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
                const cartCountElements = document.querySelectorAll('.cart-count');
                
                cartCountElements.forEach(element => {
                    element.textContent = totalItems;
                    element.style.display = totalItems > 0 ? 'flex' : 'none';
                });
            } catch (e) {
                console.error('Lỗi khi cập nhật giỏ hàng:', e);
            }
        };

        updateCartCount();
        window.addEventListener('storage', updateCartCount);
    };

    const initSearch = () => {
        const searchForm = document.querySelector('form[role="search"]');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const searchInput = searchForm.querySelector('input[type="search"]');
                if (searchInput && searchInput.value.trim()) {
                    sessionStorage.setItem('searchKeyword', searchInput.value.trim());
                    window.location.href = 'products.html';
                }
            });
        }
    };

    highlightCurrentNav();
    initDropdowns();
    initCart();
    initSearch();
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalItems;
        el.style.display = totalItems > 0 ? 'flex' : 'none';
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
        setTimeout(() => alertDiv.remove(), 500);
    }, 3000);
}
