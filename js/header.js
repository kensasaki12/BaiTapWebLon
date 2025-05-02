document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header.bg-primary');
    if (!header) return;

    // Hiệu ứng di chuột nhẹ nhàng
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

    // Hiệu ứng scroll
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

            // Ẩn header khi scroll xuống
            if (currentScroll > lastScroll && currentScroll > 100) {
                header.style.transform = 'translate3d(0, -100%, 0)';
            } else {
                header.style.transform = 'translate3d(0, 0, 0)';
            }

            lastScroll = currentScroll;
        });
    };

    // Cải thiện dropdown
    const initDropdowns = () => {
        const dropdowns = document.querySelectorAll('.dropdown');

        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('show.bs.dropdown', () => {
                dropdown.querySelector('.dropdown-menu').style.opacity = '0';
                dropdown.querySelector('.dropdown-menu').style.transform = 'translateY(-10px)';
            });

            dropdown.addEventListener('shown.bs.dropdown', () => {
                dropdown.querySelector('.dropdown-menu').style.opacity = '1';
                dropdown.querySelector('.dropdown-menu').style.transform = 'translateY(0)';
                dropdown.querySelector('.dropdown-menu').style.transition = 'all 0.3s ease-out';
            });
        });
    };

    // Khởi tạo
    initParallax();
    initScrollEffect();
    initDropdowns();
});