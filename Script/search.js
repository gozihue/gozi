// Toggle menu
document.getElementById("hamburgerBtn")?.addEventListener("click", () => {
    document.querySelector(".main-nav")?.classList.toggle("nav-open");
});

// Slider giá
const priceRange = document.getElementById("price-range");
const priceValue = document.getElementById("price-value");
if (priceRange && priceValue) {
    priceValue.textContent = new Intl.NumberFormat("vi-VN").format(priceRange.value);
    priceRange.oninput = () => {
        priceValue.textContent = new Intl.NumberFormat("vi-VN").format(priceRange.value);
        // Bỏ gọi filterVehicles() ở đây
    };
}

// Slider khoảng cách
const distanceRange = document.getElementById("distance-range");
const distanceValue = document.getElementById("distance-value");
if (distanceRange && distanceValue) {
    distanceValue.textContent = distanceRange.value;
    distanceRange.oninput = () => {
        distanceValue.textContent = distanceRange.value;
        // Bỏ gọi filterVehicles() ở đây
    };
}

// Dữ liệu xe (có ảnh)
const vehicles = [
    { name: "Yamaha Exciter 155", type: "motorbike", brand: "yamaha", price: 150000, location: "Phú Cát", rating: 4.5, distance: 5, amenities: ["helmet", "gps"], image: "img/xe/Yamaha Exciter 155.jpg" },
    { name: "Honda SH Mode", type: "motorbike", brand: "honda", price: 180000, location: "Phú Bài", rating: 4.0, distance: 3, amenities: ["helmet"], image: "img/xe/Honda SH Mode.jpg" },
    { name: "Honda Wave Alpha", type: "motorbike", brand: "honda", price: 90000, location: "Thuận An", rating: 3.5, distance: 10, amenities: ["helmet"], image: "img/xe/Honda Wave Alpha.jpg" },
    { name: "Suzuki GSX R150", type: "motorbike", brand: "suzuki", price: 200000, location: "An Đông", rating: 4.7, distance: 4, amenities: ["helmet"], image: "img/xe/Suzuki GSX R150.jpg" },
    { name: "Peugeot Django", type: "motorbike", brand: "peugeot", price: 170000, location: "Trường An", rating: 4.2, distance: 2, amenities: ["helmet", "gps"], image: "img/xe/Peugeot Django.jpg" },
    { name: "Honda Lead", type: "motorbike", brand: "honda", price: 140000, location: "Vỹ Dạ", rating: 4.0, distance: 3, amenities: ["helmet"], image: "img/xe/Honda Lead.jpg" },
    { name: "Yamaha Grande", type: "motorbike", brand: "yamaha", price: 160000, location: "Phường Đúc", rating: 4.4, distance: 5, amenities: ["helmet", "delivery"], image: "img/xe/Yamaha Grande.jpg" },
    { name: "Honda Vision", type: "motorbike", brand: "honda", price: 130000, location: "Xuân Phú", rating: 4.1, distance: 2, amenities: ["helmet"], image: "img/xe/Honda Vision.jpg" },
    { name: "Yamaha Sirius", type: "motorbike", brand: "yamaha", price: 100000, location: "Hương Thủy", rating: 3.9, distance: 7, amenities: ["helmet"], image: "img/xe/Yamaha Sirius.jpg" },
    { name: "Piaggio Liberty", type: "motorbike", brand: "piaggio", price: 175000, location: "Hương Trà", rating: 4.3, distance: 4, amenities: ["helmet", "gps"], image: "img/xe/Piaggio Liberty.jpg" },
    { name: "Honda PCX", type: "motorbike", brand: "honda", price: 190000, location: "Phú Cát", rating: 4.6, distance: 6, amenities: ["helmet", "delivery"], image: "img/xe/Honda PCX.jpg" },
    { name: "Yamaha Janus", type: "motorbike", brand: "yamaha", price: 120000, location: "Phú Bài", rating: 4.0, distance: 5, amenities: ["helmet"], image: "img/xe/Yamaha Janus.jpg" },
    { name: "Honda Air Blade", type: "motorbike", brand: "honda", price: 170000, location: "Thuận An", rating: 4.2, distance: 6, amenities: ["helmet", "gps"], image: "img/xe/Honda Air Blade.jpg" },
    { name: "SYM Elegant", type: "motorbike", brand: "sym", price: 85000, location: "An Đông", rating: 3.8, distance: 4, amenities: ["helmet"], image: "img/xe/SYM Elegant.jpg" },
    { name: "Yamaha NVX", type: "motorbike", brand: "yamaha", price: 185000, location: "Trường An", rating: 4.5, distance: 6, amenities: ["helmet", "delivery"], image: "img/xe/Yamaha NVX.jpg" },
    { name: "Suzuki Raider R150", type: "motorbike", brand: "suzuki", price: 210000, location: "Vỹ Dạ", rating: 4.6, distance: 5, amenities: ["helmet"], image: "img/xe/Suzuki Raider R150.jpg" },
    { name: "Honda Future", type: "motorbike", brand: "honda", price: 140000, location: "Phường Đúc", rating: 4.3, distance: 7, amenities: ["helmet"], image: "img/xe/Honda Future.jpg" },
    { name: "Yamaha Jupiter", type: "motorbike", brand: "yamaha", price: 110000, location: "Xuân Phú", rating: 4.0, distance: 6, amenities: ["helmet"], image: "img/xe/Yamaha Jupiter.jpg" },
    { name: "Honda Cub 50", type: "motorbike", brand: "honda", price: 90000, location: "Hương Thủy", rating: 4.1, distance: 8, amenities: ["helmet"], image: "img/xe/Honda Cub 50.jpg" },
    { name: "Piaggio Zip", type: "motorbike", brand: "piaggio", price: 130000, location: "Hương Trà", rating: 4.2, distance: 3, amenities: ["helmet"], image: "img/xe/Piaggio Zip.jpg" }
];

let filteredVehicles = [...vehicles];
const resultsContainer = document.querySelector(".results-content");
const paginationContainer = document.getElementById("pagination-container");
const perPage = 4;
let currentPage = 1;

function renderVehicles() {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const pageVehicles = filteredVehicles.slice(start, end);

    if (pageVehicles.length === 0) {
        resultsContainer.innerHTML = "<p>Không có xe nào phù hợp.</p>";
        paginationContainer.innerHTML = "";
        return;
    }

    resultsContainer.innerHTML = pageVehicles.map((v, i) => `
        <div class="vehicle-result-item">
            <div class="vehicle-image">
                <img src="${v.image}" alt="${v.name}">
            </div>
            <div class="vehicle-info">
                <h3>${v.name}</h3>
                <p class="vehicle-price">${v.price.toLocaleString('vi-VN')}đ/ngày</p>
                <p class="vehicle-location"><i class="fas fa-map-marker-alt"></i> ${v.location}</p>
                <div class="vehicle-rating">${"⭐".repeat(Math.floor(v.rating))} (${v.rating})</div>
                <button class="book-now-btn">Đặt thuê</button>
                <button class="book-now-btn detail-btn" data-index="${(currentPage - 1) * perPage + i}">Chi tiết</button>
            </div>
        </div>
    `).join("");
}

function renderPagination() {
    const totalPages = Math.ceil(filteredVehicles.length / perPage);
    paginationContainer.innerHTML = "";
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.classList.add("page-btn");
        if (i === currentPage) btn.classList.add("active");
        btn.onclick = () => {
            currentPage = i;
            renderVehicles();
            renderPagination();
            window.scrollTo({ top: 0, behavior: "smooth" });
        };
        paginationContainer.appendChild(btn);
    }
}

function filterVehicles() {
    const dropdownBrand = document.getElementById("car-type")?.value || "";
    const checkboxBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(cb => cb.value);

    let brandsToFilter = [];
    if (checkboxBrands.length > 0) {
        brandsToFilter = checkboxBrands;
    } else if (dropdownBrand && dropdownBrand !== "") {
        brandsToFilter = [dropdownBrand];
    }

    const maxPrice = parseInt(priceRange?.value || "1000000");
    const maxDistance = parseInt(distanceRange?.value || "100");
    const starChecks = Array.from(document.querySelectorAll('input[name="star_rating"]:checked')).map(cb => parseFloat(cb.value));
    const amenityChecks = Array.from(document.querySelectorAll('input[name="amenity"]:checked')).map(cb => cb.value);
    const locationInput = document.getElementById("location")?.value.trim().toLowerCase();

    filteredVehicles = vehicles.filter(vehicle => {
        if (brandsToFilter.length > 0 && !brandsToFilter.includes(vehicle.brand)) {
            return false;
        }
        if (vehicle.price > maxPrice) return false;
        if (vehicle.distance > maxDistance) return false;
        if (starChecks.length > 0 && !starChecks.some(star => vehicle.rating >= star)) return false;
        if (amenityChecks.length > 0 && !amenityChecks.every(am => vehicle.amenities.includes(am))) return false;
        if (locationInput && !vehicle.location.toLowerCase().includes(locationInput)) return false;
        return true;
    });

    currentPage = 1;
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
        sortVehicles(sortSelect.value);
    } else {
        filteredVehicles.sort((a, b) => b.price - a.price);
    }

    renderVehicles();
    renderPagination();
}

function sortVehicles(sortBy) {
    switch (sortBy) {
        case "price-asc":
            filteredVehicles.sort((a, b) => a.price - b.price);
            break;
        case "price-desc":
            filteredVehicles.sort((a, b) => b.price - a.price);
            break;
        case "rating-desc":
            filteredVehicles.sort((a, b) => b.rating - a.rating);
            break;
        case "distance-asc":
            filteredVehicles.sort((a, b) => a.distance - b.distance);
            break;
        default:
            // Sắp xếp mặc định hoặc không làm gì
            break;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    // --- KHÔNG CÒN GỌI filterVehicles() KHI CÁC THAY ĐỔI XẢY RA TRỰC TIẾP ---
    // Các dòng addEventListener này đã được loại bỏ/chú thích:
    // document.getElementById("car-type")?.addEventListener("change", filterVehicles);
    // document.getElementById("price-range")?.addEventListener("input", filterVehicles);
    // document.getElementById("distance-range")?.addEventListener("input", filterVehicles);
    // document.getElementById("location")?.addEventListener("input", filterVehicles);
    // document.querySelectorAll('input[name="brand"]').forEach(checkbox => { /* ... */ });
    // document.querySelectorAll('input[name="star_rating"]').forEach(checkbox => { /* ... */ });
    // document.querySelectorAll('input[name="amenity"]').forEach(checkbox => { /* ... */ });


    // --- CHỈ GỌI filterVehicles() KHI NHẤN NÚT TÌM KIẾM ---
    document.querySelector(".search-button")?.addEventListener("click", () => {
        currentPage = 1;
        filterVehicles(); // CHỈ KÍCH HOẠT LỌC KHI NHẤN NÚT
    });

    // --- Xử lý đồng bộ dropdown và checkbox hãng xe khi nhấn nút tìm kiếm ---
    // Đây là logic mới để đảm bảo dropdown và checkbox được cập nhật đúng trước khi lọc
    document.querySelector(".search-button")?.addEventListener("click", () => {
        const dropdown = document.getElementById("car-type");
        const checkedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(cb => cb.value);

        if (checkedBrands.length === 1) {
            dropdown.value = checkedBrands[0];
        } else if (checkedBrands.length > 1) {
            dropdown.value = ""; // Nếu nhiều hơn 1, dropdown sẽ không hiển thị cụ thể
        }
        // Nếu không có checkbox nào được chọn, dropdown sẽ giữ nguyên giá trị của nó
        // (hoặc giá trị mặc định nếu người dùng chưa chọn gì)

        currentPage = 1;
        filterVehicles();
    });


    // --- Giữ nguyên logic Load State và Clear Filters ---
    const savedState = JSON.parse(localStorage.getItem("filterState"));
    if (savedState) {
        document.getElementById("car-type").value = savedState.carType || "";
        priceRange.value = savedState.maxPrice || priceRange.min; // Đảm bảo giá trị min/max hợp lý
        priceValue.textContent = new Intl.NumberFormat("vi-VN").format(priceRange.value);
        distanceRange.value = savedState.maxDistance || distanceRange.min; // Đảm bảo giá trị min/max hợp lý
        distanceValue.textContent = distanceRange.value;

        document.querySelectorAll('input[name="star_rating"]').forEach(cb => {
            cb.checked = savedState.starChecks && savedState.starChecks.includes(cb.value);
        });
        document.querySelectorAll('input[name="amenity"]').forEach(cb => {
            cb.checked = savedState.amenityChecks && savedState.amenityChecks.includes(cb.value);
        });
        document.querySelectorAll('input[name="brand"]').forEach(cb => {
            cb.checked = savedState.brandChecks && savedState.brandChecks.includes(cb.value);
        });

        currentPage = savedState.currentPage || 1;
        // KHÔNG GỌI filterVehicles() TẠI ĐÂY NẾU CHỈ LỌC KHI NHẤN NÚT TÌM KIẾM
        // Thay vào đó, nó sẽ được gọi khi người dùng nhấn nút tìm kiếm lần đầu.
        // Hoặc bạn có thể gọi renderVehicles() và renderPagination() để hiển thị trạng thái ban đầu.
        renderVehicles();
        renderPagination();

        // Đồng bộ hóa dropdown 'car-type' với checkbox 'brand' sau khi tải trạng thái
        const dropdown = document.getElementById("car-type");
        const checkedBrandsAfterLoad = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(cb => cb.value);
        if (checkedBrandsAfterLoad.length === 1) {
            dropdown.value = checkedBrandsAfterLoad[0];
        } else {
            dropdown.value = ""; // Nếu không có hoặc nhiều hơn 1, reset dropdown
        }


    } else {
        renderVehicles();
        renderPagination();
    }


    document.querySelector(".clear-filters-btn")?.addEventListener("click", () => {
        document.getElementById("car-type").value = "";
        priceRange.value = priceRange.min;
        priceRange.value = 100000;  // về đúng 100k
        priceValue.textContent = new Intl.NumberFormat("vi-VN").format(priceRange.value);
        distanceRange.value = distanceRange.min;
            distanceRange.value = 10; //  ví dụ mặc định là 10km
        distanceValue.textContent = distanceRange.value;

        document.getElementById("location").value = "";

        document.querySelectorAll('input[name="star_rating"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('input[name="amenity"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('input[name="brand"]').forEach(cb => cb.checked = false);

        currentPage = 1;
        filteredVehicles = [...vehicles];
        localStorage.removeItem("filterState");

        const sortSelect = document.getElementById("sort-select");
        if (sortSelect) {
            sortSelect.value = "";
        }

        renderVehicles();
        renderPagination();
    });

    // --- Giữ nguyên logic Detail Button và Save State ---
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("detail-btn")) {
            const index = e.target.getAttribute("data-index");
            const selectedVehicle = filteredVehicles[index];

            localStorage.setItem("selectedVehicle", JSON.stringify(selectedVehicle));
            localStorage.setItem("filterState", JSON.stringify({
                currentPage,
                carType: document.getElementById("car-type")?.value || "",
                maxPrice: priceRange?.value,
                maxDistance: distanceRange?.value,
                starChecks: Array.from(document.querySelectorAll('input[name="star_rating"]:checked')).map(cb => cb.value),
                amenityChecks: Array.from(document.querySelectorAll('input[name="amenity"]:checked')).map(cb => cb.value),
                brandChecks: Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(cb => cb.value)
            }));

            window.location.href = "chi_tiet/xe1.html";
        }
    });

    // --- Giữ nguyên logic cho Sort Select ---
    document.getElementById("sort-select")?.addEventListener("change", (e) => {
        sortVehicles(e.target.value);
        renderVehicles(); // Render lại sau khi sắp xếp
    });

});