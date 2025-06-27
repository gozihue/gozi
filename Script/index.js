document.addEventListener('DOMContentLoaded', function() {
    // Slider Banner Section (đã có trong code gốc của bạn, đảm bảo nó hoạt động đúng)
    const bannerSliderWrapper = document.querySelector('.slider-content');
    const bannerSlides = document.querySelectorAll('.slider-content img');
    const bannerPrevArrow = document.querySelector('.prev-arrow');
    const bannerNextArrow = document.querySelector('.next-arrow');
    const bannerDotsContainer = document.querySelector('.slider-dots');

    let bannerCurrentIndex = 0;
    const bannerTotalSlides = bannerSlides.length;

    if (bannerTotalSlides > 0) {
        // Create dots for banner slider
        for (let i = 0; i < bannerTotalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('nav-dot');
            if (i === 0) dot.classList.add('active');
            dot.dataset.index = i;
            bannerDotsContainer.appendChild(dot);
            dot.addEventListener('click', function() {
                bannerCurrentIndex = parseInt(this.dataset.index);
                updateBannerSlider();
            });
        }

        const bannerNavDots = document.querySelectorAll('.slider-dots .nav-dot');

        function updateBannerSlider() {
            bannerSliderWrapper.style.transform = `translateX(${-bannerCurrentIndex * 100}%)`;
            bannerNavDots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === bannerCurrentIndex);
            });
        }

        bannerPrevArrow.addEventListener('click', () => {
            bannerCurrentIndex = (bannerCurrentIndex === 0) ? bannerTotalSlides - 1 : bannerCurrentIndex - 1;
            updateBannerSlider();
        });

        bannerNextArrow.addEventListener('click', () => {
            bannerCurrentIndex = (bannerCurrentIndex === bannerTotalSlides - 1) ? 0 : bannerCurrentIndex + 1;
            updateBannerSlider();
        });

        // Auto-play for banner slider (optional)
        setInterval(() => {
            bannerNextArrow.click();
        }, 5000); // Change slide every 5 seconds
    }


    // ==========================================================
    // Highlights Slider (New JavaScript for Info Highlights Section)
    // ==========================================================
    const highlightsSliderWrapper = document.querySelector('.highlights-slider-wrapper');
    const highlightItems = document.querySelectorAll('.highlight-item');
    const highlightsPrevArrow = document.querySelector('.highlights-prev-arrow');
    const highlightsNextArrow = document.querySelector('.highlights-next-arrow');
    const highlightsDotsContainer = document.querySelector('.highlights-slider-dots');

    let highlightsCurrentIndex = 0;
    const highlightsTotalItems = highlightItems.length; // Sẽ là 6 nếu bạn có 6 item HTML

    if (highlightsTotalItems > 0) {
        // Create dots for highlights slider
        for (let i = 0; i < highlightsTotalItems; i++) {
            const dot = document.createElement('span');
            dot.classList.add('highlights-nav-dot');
            if (i === 0) dot.classList.add('active');
            dot.dataset.index = i;
            highlightsDotsContainer.appendChild(dot);
            dot.addEventListener('click', function() {
                highlightsCurrentIndex = parseInt(this.dataset.index);
                updateHighlightsSlider();
            });
        }

        const highlightsNavDots = document.querySelectorAll('.highlights-slider-dots .highlights-nav-dot');

        function updateHighlightsSlider() {
            // Di chuyển wrapper để hiển thị item hiện tại
            // Mỗi item chiếm 100% chiều rộng của wrapper cha (slider-container)
            highlightsSliderWrapper.style.transform = `translateX(${-highlightsCurrentIndex * 100}%)`;

            // Cập nhật các chấm điều hướng
            highlightsNavDots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === highlightsCurrentIndex);
            });
        }

        highlightsPrevArrow.addEventListener('click', () => {
            highlightsCurrentIndex = (highlightsCurrentIndex === 0) ? highlightsTotalItems - 1 : highlightsCurrentIndex - 1;
            updateHighlightsSlider();
        });

        highlightsNextArrow.addEventListener('click', () => {
            highlightsCurrentIndex = (highlightsCurrentIndex === highlightsTotalItems - 1) ? 0 : highlightsCurrentIndex + 1;
            updateHighlightsSlider();
        });

        // Khởi tạo slider khi tải trang
        updateHighlightsSlider();

        // Auto-play for Highlights Slider (Thêm đoạn này vào)
        setInterval(() => {
            highlightsNextArrow.click(); // Giả lập click vào nút next để chuyển slide
        }, 3000); // Chuyển slide mỗi 3 giây (3000 milliseconds)
    }

    // Hamburger menu logic
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    const overlay = document.querySelector('.overlay');

    if (hamburgerMenu && mainNav && overlay) {
        hamburgerMenu.addEventListener('click', () => {
            mainNav.classList.toggle('nav-open');
            overlay.style.display = mainNav.classList.contains('nav-open') ? 'block' : 'none';
        });

        overlay.addEventListener('click', () => {
            mainNav.classList.remove('nav-open');
            overlay.style.display = 'none';
        });
    }
});