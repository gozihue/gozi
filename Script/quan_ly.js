// Script/quan_ly.js

document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById('sidebar');
    const mobileToggleSidebarBtn = document.getElementById("mobileToggleSidebarBtn");
    const desktopToggleSidebarBtn = document.getElementById("desktopToggleSidebarBtn");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const menuItems = document.querySelectorAll(".main-menu .menu-item");
    const dashboardSections = document.querySelectorAll(".dashboard-section");
    const body = document.body;

    const logoutItem = document.getElementById('logout-item');

    // Element references for Dashboard Overview (newly added)
    const totalCustomersSpan = document.getElementById('total-customers');
    const totalRegisteredVehiclesSpan = document.getElementById('total-registered-vehicles');
    const totalOwnerRevenueOverviewSpan = document.getElementById('total-owner-revenue-overview');
    const recentCustomersTableBody = document.getElementById('recentCustomersTableBody');
    const recentBookingsOverviewTableBody = document.getElementById('recentBookingsOverviewTableBody');

    // Element references for specific sections
    const vehicleTableBody = document.getElementById("vehicleTableBody");
    const bookingTableBody = document.getElementById("bookingTableBody");
    const totalRevenueSpan = document.getElementById("total-revenue"); // For detailed revenue section
    const totalRentalsSpan = document.getElementById("total-rentals");


    // Dummy data for owner's vehicles
    let ownerVehicles = [
        { id: 1, name: "Yamaha Exciter 155", status: "renting" },
        { id: 2, name: "Honda SH Mode", status: "available" },
        { id: 3, name: "Toyota Vios", status: "available" },
        { id: 4, name: "VinFast Klara S", status: "renting" },
        { id: 5, name: "Honda Wave Alpha", status: "available" },
        { id: 6, name: "Honda Air Blade", status: "available" },
        { id: 7, name: "Ford Ranger", status: "renting" }
    ];

    // Dummy data for owner's bookings (more realistic names)
    const ownerBookings = [
        { id: 101, car: "Yamaha Exciter 155", renter: "Tran Van An", startDate: "20/06/2025", endDate: "25/06/2025", status: "renting" },
        { id: 102, car: "Honda SH Mode", renter: "Le Thi Binh", startDate: "18/06/2025", endDate: "22/06/2025", status: "completed" },
        { id: 103, car: "Toyota Vios", renter: "Nguyen Cong Danh", startDate: "21/06/2025", endDate: "28/06/2025", status: "pending" },
        { id: 104, car: "VinFast Klara S", renter: "Pham Thi Hang", startDate: "15/06/2025", endDate: "19/06/2025", status: "completed" },
        { id: 105, car: "Honda Wave Alpha", renter: "Vu Van Kien", startDate: "23/06/2025", endDate: "26/06/2025", status: "renting" },
        { id: 106, car: "Honda Air Blade", renter: "Hoang Thi Lieu", startDate: "10/06/2025", endDate: "14/06/2025", status: "completed" }
    ];

    // Dummy data for customers (unique customers from bookings or other sources)
    const ownerCustomers = [
        { id: 201, name: "Tran Van An", email: "an.tv@example.com", rentals: 3 },
        { id: 202, name: "Le Thi Binh", email: "binh.lt@example.com", rentals: 2 },
        { id: 203, name: "Nguyen Cong Danh", email: "danh.nc@example.com", rentals: 1 },
        { id: 204, name: "Pham Thi Hang", email: "hang.pt@example.com", rentals: 4 },
        { id: 205, name: "Vu Van Kien", email: "kien.vv@example.com", rentals: 1 },
        { id: 206, name: "Hoang Thi Lieu", email: "lieu.ht@example.com", rentals: 2 }
    ];


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

    // --- Data Rendering Functions ---

    // Render Dashboard Overview stats and tables
    function renderDashboardOverview() {
        if (totalCustomersSpan) {
            totalCustomersSpan.textContent = ownerCustomers.length.toLocaleString();
        }
        if (totalRegisteredVehiclesSpan) {
            totalRegisteredVehiclesSpan.textContent = ownerVehicles.length.toLocaleString();
        }
        if (totalOwnerRevenueOverviewSpan) {
            // Calculate dummy total revenue for overview
            const totalRevenue = ownerBookings.reduce((sum, booking) => {
                // Assuming a random rental price for calculation
                return sum + (Math.floor(Math.random() * 500000) + 100000); // 100k - 600k per booking
            }, 0);
            totalOwnerRevenueOverviewSpan.textContent = totalRevenue.toLocaleString('vi-VN') + ' VNĐ';
        }

        // Render Recent Customers
        if (recentCustomersTableBody) {
            recentCustomersTableBody.innerHTML = '';
            const recentCustomers = ownerCustomers.slice(0, 5); // Take top 5
            if (recentCustomers.length === 0) {
                recentCustomersTableBody.innerHTML = '<tr><td colspan="3" style="text-align: center;">Chưa có khách hàng nào.</td></tr>';
            } else {
                recentCustomers.forEach(customer => {
                    const row = `
                        <tr>
                            <td>${customer.name}</td>
                            <td>${customer.email}</td>
                            <td>${customer.rentals}</td>
                        </tr>
                    `;
                    recentCustomersTableBody.insertAdjacentHTML('beforeend', row);
                });
            }
        }

        // Render Recent Bookings for Overview
        if (recentBookingsOverviewTableBody) {
            recentBookingsOverviewTableBody.innerHTML = '';
            const recentBookings = ownerBookings.slice(0, 5); // Take top 5
            if (recentBookings.length === 0) {
                recentBookingsOverviewTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Chưa có đơn đặt xe gần đây.</td></tr>';
            } else {
                recentBookings.forEach(booking => {
                    let statusClass = '';
                    let statusText = '';
                    switch(booking.status) {
                        case 'renting': statusClass = 'status-renting'; statusText = 'Đang thuê'; break;
                        case 'completed': statusClass = 'status-completed'; statusText = 'Đã hoàn tất'; break;
                        case 'pending': statusClass = 'status-pending'; statusText = 'Chờ xác nhận'; break;
                        default: statusClass = ''; statusText = booking.status;
                    }
                    const row = `
                        <tr>
                            <td>${booking.car}</td>
                            <td>${booking.renter}</td>
                            <td>${booking.startDate}</td>
                            <td><span class="${statusClass}">${statusText}</span></td>
                        </tr>
                    `;
                    recentBookingsOverviewTableBody.insertAdjacentHTML('beforeend', row);
                });
            }
        }
    }


    // Render Vehicle List for "Danh sách xe" section
    function renderVehicleList() {
        vehicleTableBody.innerHTML = '';
        if (ownerVehicles.length === 0) {
            vehicleTableBody.innerHTML = '<tr><td colspan="3" style="text-align: center;">Bạn chưa đăng ký xe nào.</td></tr>';
            return;
        }

        ownerVehicles.forEach(vehicle => {
            const statusClass = vehicle.status === 'renting' ? 'status-renting' : 'status-available';
            const statusText = vehicle.status === 'renting' ? 'Đang thuê' : 'Có sẵn';

            const row = `
                <tr>
                    <td>${vehicle.name}</td>
                    <td class="${statusClass}">${statusText}</td>
                    <td class="action-buttons">
                        <button class="edit-btn" data-id="${vehicle.id}" title="Sửa"><i class="fas fa-edit"></i></button>
                        <button class="delete-btn" data-id="${vehicle.id}" title="Xóa"><i class="fas fa-trash-alt"></i></button>
                    </td>
                </tr>
            `;
            vehicleTableBody.insertAdjacentHTML('beforeend', row);
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const vehicleId = parseInt(e.currentTarget.dataset.id);
                alert(`Sửa xe với ID: ${vehicleId}`);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const vehicleId = parseInt(e.currentTarget.dataset.id);
                if (confirm(`Bạn có chắc chắn muốn xóa xe này (ID: ${vehicleId})?`)) {
                    ownerVehicles = ownerVehicles.filter(v => v.id !== vehicleId);
                    renderVehicleList();
                    alert(`Đã xóa xe ID: ${vehicleId}`);
                }
            });
        });
    }

    // Render Booking List for "Lịch đặt" section
    function renderBookingList() {
        bookingTableBody.innerHTML = '';
        if (ownerBookings.length === 0) {
            bookingTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Chưa có lịch đặt nào.</td></tr>';
            return;
        }

        ownerBookings.forEach(booking => {
            let statusClass = '';
            let statusText = '';
            switch(booking.status) {
                case 'renting': statusClass = 'status-renting'; statusText = 'Đang thuê'; break;
                case 'completed': statusClass = 'status-completed'; statusText = 'Đã hoàn tất'; break;
                case 'pending': statusClass = 'status-pending'; statusText = 'Chờ xác nhận'; break;
                default: statusClass = ''; statusText = booking.status;
            }

            const row = `
                <tr>
                    <td>${booking.car}</td>
                    <td>${booking.renter}</td>
                    <td>${booking.startDate}</td>
                    <td>${booking.endDate}</td>
                    <td><span class="${statusClass}">${statusText}</span></td>
                </tr>
            `;
            bookingTableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    // Update Revenue Stats for "Doanh thu" section
    function updateRevenueStats() {
        if (totalRevenueSpan) {
            const randomRevenue = (Math.floor(Math.random() * 50000000) + 1000000).toLocaleString('vi-VN');
            totalRevenueSpan.textContent = `${randomRevenue} VNĐ`;
        }
        if (totalRentalsSpan) {
            const randomRentals = (Math.floor(Math.random() * 200) + 50).toLocaleString();
            totalRentalsSpan.textContent = randomRentals;
        }
    }


    // --- Event Listeners ---

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

            // Call rendering functions based on active section
            if (targetSectionId === 'dashboard-overview') {
                renderDashboardOverview();
            } else if (targetSectionId === 'vehicle-list') {
                renderVehicleList();
            } else if (targetSectionId === 'bookings') {
                renderBookingList();
            } else if (targetSectionId === 'revenue') {
                updateRevenueStats();
            }
            // No specific rendering needed for 'customer-reviews' yet

            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });
    });

    // Handle "Xem tất cả" buttons on Dashboard Overview
    document.querySelectorAll('.view-all-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetSectionId = e.currentTarget.dataset.targetSection;
            // Remove active from all menu items and sections
            menuItems.forEach(i => i.classList.remove('active'));
            dashboardSections.forEach(s => s.classList.remove('active'));

            // Set target section and its corresponding menu item as active
            document.getElementById(targetSectionId).classList.add('active');
            const targetMenuItem = document.querySelector(`.menu-item[data-content="${targetSectionId}"]`);
            if (targetMenuItem) {
                targetMenuItem.classList.add('active');
            }

            // Re-render the target section's content
            if (targetSectionId === 'bookings') {
                renderBookingList();
            } else if (targetSectionId === 'customer-reviews') {
                // If there's a specific render for customer reviews, call it here
            }

            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });
    });

    if (logoutItem) {
        logoutItem.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    const addVehicleBtn = document.querySelector(".add-vehicle-btn");
    if (addVehicleBtn) {
        addVehicleBtn.addEventListener("click", () => {
            alert("Chuyển đến trang/form thêm xe mới!");
        });
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
    // Initially render the dashboard overview
    renderDashboardOverview();

    // Run on resize
    window.addEventListener('resize', initializeSidebarState);

    // Ensure the correct initial section is shown and its content is rendered
    const initialActiveMenuItem = document.querySelector('.main-menu .menu-item.active');
    if (!initialActiveMenuItem) {
        if (menuItems.length > 0) {
            menuItems[0].classList.add('active');
            document.getElementById(menuItems[0].dataset.content).classList.add('active');
            renderDashboardOverview(); // Render if dashboard is initial
        }
    } else {
        const targetSectionId = initialActiveMenuItem.dataset.content;
        document.getElementById(targetSectionId).classList.add('active');
        // Render content for the initially active section
        if (targetSectionId === 'dashboard-overview') {
            renderDashboardOverview();
        } else if (targetSectionId === 'vehicle-list') {
            renderVehicleList();
        } else if (targetSectionId === 'bookings') {
            renderBookingList();
        } else if (targetSectionId === 'revenue') {
            updateRevenueStats();
        }
    }
});