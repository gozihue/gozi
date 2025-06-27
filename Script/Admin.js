document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const mobileToggleSidebarBtn = document.getElementById('mobileToggleSidebarBtn');
    const desktopToggleSidebarBtn = document.getElementById('desktopToggleSidebarBtn');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const menuItems = document.querySelectorAll('.main-menu .menu-item');
    const dashboardSections = document.querySelectorAll('.dashboard-section');
    const body = document.body;

    const logoutItem = document.getElementById('logout-item');

    // Thêm các phần tử bảng để đổ dữ liệu random vào
    const recentUsersTableBody = document.getElementById('recentUsersTableBody');
    const recentBookingsTableBody = document.getElementById('recentBookingsTableBody');

    // Function to open sidebar on mobile
    function openSidebar() {
        sidebar.classList.add('nav-open');
        sidebarOverlay.classList.add('active');
        body.classList.add('no-scroll');
        if (desktopToggleSidebarBtn) {
            desktopToggleSidebarBtn.querySelector('i').classList.remove('fa-bars');
            desktopToggleSidebarBtn.querySelector('i').classList.add('fa-times');
        }
    }

    // Function to close sidebar on mobile
    function closeSidebar() {
        sidebar.classList.remove('nav-open');
        sidebarOverlay.classList.remove('active');
        body.classList.remove('no-scroll');
        if (desktopToggleSidebarBtn) {
            desktopToggleSidebarBtn.querySelector('i').classList.remove('fa-times');
            desktopToggleSidebarBtn.querySelector('i').classList.add('fa-bars');
        }
    }

    // Toggle sidebar on desktop
    function toggleDesktopSidebar() {
        sidebar.classList.toggle('collapsed');
    }

    // Event Listeners
    if (mobileToggleSidebarBtn) {
        mobileToggleSidebarBtn.addEventListener('click', openSidebar);
    }

    if (desktopToggleSidebarBtn) {
        desktopToggleSidebarBtn.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeSidebar();
            } else {
                toggleDesktopSidebar();
            }
        });
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Handle menu item clicks
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (this.id === 'logout-item') {
                return;
            }

            menuItems.forEach(i => i.classList.remove('active'));
            dashboardSections.forEach(s => s.classList.remove('active'));

            this.classList.add('active');
            const targetSectionId = this.dataset.content;
            document.getElementById(targetSectionId).classList.add('active');

            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });
    });

    // Xử lý sự kiện click cho nút "Đăng xuất"
    if (logoutItem) {
        logoutItem.addEventListener('click', () => {
            // Chuyển hướng về trang index.html
            window.location.href = 'index.html';
        });
    }

    // Function to generate random data
    function generateRandomData() {
        // --- Dữ liệu Người dùng gần đây ---
        const userNames = ['Nguyễn Văn An', 'Trần Thị Bình', 'Lê Công Danh', 'Phạm Thị Hải', 'Vũ Minh Khoa', 'Bùi Ngọc Lan'];
        const userRoles = ['Người dùng', 'Chủ xe', 'Admin'];
        let usersHtml = '';
        for (let i = 0; i < 5; i++) { // Generate 5 random users
            const name = userNames[Math.floor(Math.random() * userNames.length)];
        const email = name
            .normalize("NFD")                        // chuyển thành dạng tách dấu
            .replace(/[\u0300-\u036f]/g, "")        // xoá dấu
            .toLowerCase()
            .replace(/\s/g, '') + Math.floor(Math.random() * 100) + '@gmail.com';

            const role = userRoles[Math.floor(Math.random() * userRoles.length)];
            usersHtml += `
                <tr>
                    <td>${name}</td>
                    <td>${email}</td>
                    <td>${role}</td>
                </tr>
            `;
        }
        recentUsersTableBody.innerHTML = usersHtml;

        // --- Dữ liệu Đơn đặt xe gần đây ---
        const carModels = ['Toyota Camry', 'Honda Civic', 'Mazda 3', 'Hyundai Accent', 'Kia K3', 'VinFast Fadil'];
        const renterNames = ['Mai Văn Cường', 'Hoàng Minh Tuấn', 'Nguyễn Thị Thảo', 'Lê Anh Khoa', 'Mai Văn Cường'];
        const statuses = [
            { text: 'Đang thuê', class: 'status-active' },
            { text: 'Hoàn tất', class: 'status-completed' },
            { text: 'Chờ xác nhận', class: 'status-pending' }
        ];

        let bookingsHtml = '';
        for (let i = 0; i < 5; i++) { // Generate 5 random bookings
            const car = carModels[Math.floor(Math.random() * carModels.length)];
            const renter = renterNames[Math.floor(Math.random() * renterNames.length)];
            const day = Math.floor(Math.random() * 28) + 1;
            const month = Math.floor(Math.random() * 12) + 1;
            const year = 2025; // Assuming current year
            const date = `${day}/${month}/${year}`;
            const status = statuses[Math.floor(Math.random() * statuses.length)];

            bookingsHtml += `
                <tr>
                    <td>${car}</td>
                    <td>${renter}</td>
                    <td>${date}</td>
                    <td><span class="${status.class}">${status.text}</span></td>
                </tr>
            `;
        }
        recentBookingsTableBody.innerHTML = bookingsHtml;

        // --- Cập nhật số liệu thống kê (Random) ---
        document.getElementById('total-users').textContent = (Math.floor(Math.random() * 1000) + 500).toLocaleString();
        document.getElementById('total-vehicles').textContent = (Math.floor(Math.random() * 500) + 100).toLocaleString();
        document.getElementById('total-revenue').textContent = (Math.floor(Math.random() * 100000) + 50000).toLocaleString() + ' VNĐ';
    }


    // Initial state setup based on screen width
    function initializeSidebarState() {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('collapsed');
            closeSidebar();
        } else {
            sidebar.classList.remove('nav-open');
            sidebarOverlay.classList.remove('active');
            body.classList.remove('no-scroll');
        }
    }

    // Run on load
    initializeSidebarState();
    generateRandomData(); // Gọi hàm tạo dữ liệu ngẫu nhiên khi DOMContentLoaded

    // Run on resize
    window.addEventListener('resize', initializeSidebarState);

    // Set initial active menu item and section
    const initialActiveMenuItem = document.querySelector('.main-menu .menu-item.active');
    if (!initialActiveMenuItem) {
        if (menuItems.length > 0) {
            menuItems[0].classList.add('active');
            document.getElementById(menuItems[0].dataset.content).classList.add('active');
        }
    } else {
        const targetSectionId = initialActiveMenuItem.dataset.content;
        document.getElementById(targetSectionId).classList.add('active');
    }
});