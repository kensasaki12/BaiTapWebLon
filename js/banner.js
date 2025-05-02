document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra sự tồn tại của các phần tử
    const slider = document.querySelector('.banner-slider');
    if (!slider) return;

    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    if (slides.length === 0 || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    let interval;
    const slideInterval = 3000;

    // Thêm transition cho slides
    slides.forEach(slide => {
        slide.style.transition = 'opacity 0.6s ease';
    });

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
            slide.style.zIndex = i === index ? '1' : '0';
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    function startInterval() {
        clearInterval(interval);
        interval = setInterval(nextSlide, slideInterval);
    }

    function handleManualNavigation() {
        clearInterval(interval);
        startInterval();
    }

    // Sự kiện click
    nextBtn.addEventListener('click', () => {
        nextSlide();
        handleManualNavigation();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        handleManualNavigation();
    });

    // Sự kiện dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
            handleManualNavigation();
        });
    });

    // Touch events cho mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(interval);
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startInterval();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50;
        if (touchStartX - touchEndX > threshold) {
            nextSlide();
        } else if (touchEndX - touchStartX > threshold) {
            prevSlide();
        }
    }

    // Auto-play và pause
    slider.addEventListener('mouseenter', () => clearInterval(interval));
    slider.addEventListener('mouseleave', startInterval);

    // Khởi tạo
    showSlide(currentIndex);
    startInterval();
});