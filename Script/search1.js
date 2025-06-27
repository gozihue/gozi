// Script/search.js

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mainNav = document.querySelector('.main-nav');

    // Hamburger menu toggle
    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', () => {
            mainNav.classList.toggle('nav-open');
        });
    }

    // Filter elements
    const carTypeSelect = document.getElementById('car-type');
    const locationInput = document.getElementById('location');
    const timeInput = document.getElementById('time');
    const searchButton = document.querySelector('.search-button');

    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const distanceRange = document.getElementById('distance-range');
    const distanceValue = document.getElementById('distance-value');
    const vehicleTypeCheckboxes = document.querySelectorAll('input[name="vehicle_type"]');
    const starRatingCheckboxes = document.querySelectorAll('input[name="star_rating"]');
    const amenityCheckboxes = document.querySelectorAll('input[name="amenity"]');
    const sortSelect = document.getElementById('sort-select');

    const resultsContent = document.querySelector('.results-content'); // Container for vehicle results
    const paginationContainer = document.getElementById('pagination-container');

    // NEW: Clear Filters Button
    const clearFiltersBtn = document.querySelector('.clear-filters-btn');


    // --- Dummy Data (Replace with real data fetching in a real application) ---
    const allVehicles = [
        { id: 1, name: "Honda Air Blade 2023", type: "motorbike", price: 120000, location: "Quận Hải Châu, Đà Nẵng", rating: 4.8, distance: 3, amenities: ["helmet"] },
        { id: 2, name: "VinFast Evo200", type: "electric-bike", price: 150000, location: "Quận Thanh Khê, Đà Nẵng", rating: 4.5, distance: 5, amenities: ["helmet", "gps"] },
        { id: 3, name: "Toyota Vios 2022", type: "car", price: 400000, location: "Quận Ngũ Hành Sơn, Đà Nẵng", rating: 4.9, distance: 7, amenities: ["gps", "delivery"] },
        { id: 4, name: "Yamaha Exciter 155", type: "motorbike", price: 110000, location: "Quận Sơn Trà, Đà Nẵng", rating: 4.7, distance: 2, amenities: ["helmet"] },
        { id: 5, name: "Honda Vision 2024", type: "motorbike", price: 100000, location: "Quận Liên Chiểu, Đà Nẵng", rating: 4.6, distance: 8, amenities: ["helmet"] },
        { id: 6, name: "Hyundai Accent 2021", type: "car", price: 350000, location: "Quận Cẩm Lệ, Đà Nẵng", rating: 4.7, distance: 12, amenities: ["gps"] },
        { id: 7, name: "Pega S2", type: "electric-bike", price: 130000, location: "Quận Ngũ Hành Sơn, Đà Nẵng", rating: 4.2, distance: 4, amenities: [] },
        { id: 8, name: "Ford Ranger 2020", type: "car", price: 500000, location: "Huyện Hòa Vang, Đà Nẵng", rating: 4.6, distance: 20, amenities: ["delivery"] },
        { id: 9, name: "Suzuki Satria F150", type: "motorbike", price: 140000, location: "Quận Hải Châu, Đà Nẵng", rating: 4.9, distance: 1, amenities: ["helmet"] },
        { id: 10, name: "Honda SH Mode", type: "motorbike", price: 160000, location: "Quận Thanh Khê, Đà Nẵng", rating: 5.0, distance: 6, amenities: ["helmet", "gps"] },
        { id: 11, name: "Mercedes C-Class", type: "car", price: 800000, location: "Quận Sơn Trà, Đà Nẵng", rating: 4.8, distance: 9, amenities: ["gps", "delivery"] },
        { id: 12, name: "Yamaha Grande", type: "motorbike", price: 135000, location: "Quận Liên Chiểu, Đà Nẵng", rating: 4.5, distance: 15, amenities: ["helmet"] },
        { id: 13, name: "Nissan Almera", type: "car", price: 300000, location: "Quận Cẩm Lệ, Đà Nẵng", rating: 4.3, distance: 10, amenities: ["gps"] },
        { id: 14, name: "Honda Wave Alpha", type: "motorbike", price: 90000, location: "Quận Hải Châu, Đà Nẵng", rating: 4.0, distance: 2, amenities: [] },
        { id: 15, name: "Honda Winner X", type: "motorbike", price: 125000, location: "Quận Thanh Khê, Đà Nẵng", rating: 4.7, distance: 5, amenities: ["helmet"] },
        { id: 16, name: "Mazda 3", type: "car", price: 420000, location: "Quận Ngũ Hành Sơn, Đà Nẵng", rating: 4.6, distance: 8, amenities: ["gps"] },
        { id: 17, name: "Xe Đạp Điện Asama", type: "electric-bike", price: 80000, location: "Quận Sơn Trà, Đà Nẵng", rating: 3.9, distance: 3, amenities: [] },
        { id: 18, name: "Suzuki Raider", type: "motorbike", price: 130000, location: "Quận Liên Chiểu, Đà Nẵng", rating: 4.8, distance: 7, amenities: ["helmet"] },
        { id: 19, name: "Kia K3", type: "car", price: 380000, location: "Quận Cẩm Lệ, Đà Nẵng", rating: 4.5, distance: 11, amenities: ["gps", "delivery"] },
        { id: 20, name: "Honda PCX", type: "motorbike", price: 170000, location: "Quận Hải Châu, Đà Nẵng", rating: 4.9, distance: 4, amenities: ["helmet", "gps"] },
    ];

    let filteredAndSortedVehicles = [...allVehicles]; // Global variable for current results
    let currentPage = 1;
    const itemsPerPage = 5; // Number of vehicles per page

    // --- Filter and Sort Logic ---
    function applyFiltersAndSort() {
        let results = [...allVehicles];

        // 1. Apply Quick Search filters (from the top bar)
        const selectedCarType = carTypeSelect.value;
        const searchLocation = locationInput.value.toLowerCase();
        // const searchTime = timeInput.value; // Not used in dummy data filtering

        if (selectedCarType) {
            results = results.filter(vehicle => vehicle.type === selectedCarType);
        }
        if (searchLocation) {
            results = results.filter(vehicle => vehicle.location.toLowerCase().includes(searchLocation));
        }

        // 2. Apply Sidebar Filters
        const selectedVehicleTypes = Array.from(vehicleTypeCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        if (selectedVehicleTypes.length > 0) {
            results = results.filter(vehicle => selectedVehicleTypes.includes(vehicle.type));
        }

        const maxPrice = priceRange.value;
        results = results.filter(vehicle => vehicle.price <= maxPrice);

        const maxDistance = distanceRange.value;
        results = results.filter(vehicle => vehicle.distance <= maxDistance);

        const selectedStarRatings = Array.from(starRatingCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => parseFloat(checkbox.value));

        if (selectedStarRatings.length > 0) {
            results = results.filter(vehicle => {
                // If 5 stars is checked, accept 5.0. If 4 stars, accept 4.0 and above.
                return selectedStarRatings.some(minRating => vehicle.rating >= minRating);
            });
        }

        const selectedAmenities = Array.from(amenityCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        if (selectedAmenities.length > 0) {
            results = results.filter(vehicle =>
                selectedAmenities.every(amenity => vehicle.amenities.includes(amenity))
            );
        }

        // 3. Apply Sorting
        const sortBy = sortSelect.value;
        if (sortBy === 'price-asc') {
            results.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            results.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating-desc') {
            results.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'distance-asc') {
            results.sort((a, b) => a.distance - b.distance);
        }
        // Default (no sorting specified or value is empty) means order from allVehicles

        filteredAndSortedVehicles = results;
        currentPage = 1; // Reset to first page after applying filters/sort
        renderResults();
        renderPagination();
    }

    // --- Render Results ---
    function renderResults() {
        resultsContent.innerHTML = '<div class="vehicle-results-list"></div>'; // Clear previous results and create list container
        const vehicleList = resultsContent.querySelector('.vehicle-results-list');

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const vehiclesToRender = filteredAndSortedVehicles.slice(startIndex, endIndex);

        if (vehiclesToRender.length === 0) {
            vehicleList.innerHTML = '<p>Không tìm thấy xe nào phù hợp.</p>';
            return;
        }

        vehiclesToRender.forEach(vehicle => {
            const vehicleItem = document.createElement('div');
            vehicleItem.classList.add('vehicle-result-item');
            vehicleItem.innerHTML = `
                <div class="vehicle-image">
                    <img src="https://via.placeholder.com/250x150?text=Xe+${vehicle.name.replace(/\s/g, '+')}" alt="${vehicle.name}">
                </div>
                <div class="vehicle-info">
                    <div>
                        <h3>${vehicle.name}</h3>
                        <p class="vehicle-price">${vehicle.price.toLocaleString('vi-VN')}đ/ngày</p>
                        <p class="vehicle-location"><i class="fas fa-map-marker-alt"></i> ${vehicle.location}</p>
                        <p class="vehicle-rating">${'⭐'.repeat(Math.floor(vehicle.rating))} (${vehicle.rating})</p>
                    </div>
                    <button class="book-now-btn">Đặt ngay</button>
                </div>
            `;
            vehicleList.appendChild(vehicleItem);
        });
    }

    // --- Render Pagination ---
    function renderPagination() {
        paginationContainer.innerHTML = ''; // Clear previous pagination
        const totalPages = Math.ceil(filteredAndSortedVehicles.length / itemsPerPage);

        if (totalPages <= 1) {
            return; // No pagination needed if only one page
        }

        // Previous button
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Trước';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderResults();
                renderPagination();
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
            }
        });
        paginationContainer.appendChild(prevButton);

        // Page number buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.addEventListener('click', () => {
                currentPage = i;
                renderResults();
                renderPagination();
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
            });
            paginationContainer.appendChild(pageButton);
        }

        // Next button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Sau';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderResults();
                renderPagination();
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
            }
        });
        paginationContainer.appendChild(nextButton);
    }

    // --- Event Listeners ---

    // Quick search button
    searchButton.addEventListener('click', applyFiltersAndSort);

    // Sidebar filters
    priceRange.addEventListener('input', () => {
        priceValue.textContent = parseInt(priceRange.value).toLocaleString('vi-VN');
    });
    priceRange.addEventListener('change', applyFiltersAndSort); // Apply filter on change

    distanceRange.addEventListener('input', () => {
        distanceValue.textContent = distanceRange.value;
    });
    distanceRange.addEventListener('change', applyFiltersAndSort); // Apply filter on change

    vehicleTypeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFiltersAndSort);
    });
    starRatingCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFiltersAndSort);
    });
    amenityCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFiltersAndSort);
    });

    // Sort select
    sortSelect.addEventListener('change', applyFiltersAndSort);

    // NEW: Clear Filters functionality
    clearFiltersBtn.addEventListener('click', () => {
        // Reset all checkboxes
        vehicleTypeCheckboxes.forEach(checkbox => (checkbox.checked = false));
        starRatingCheckboxes.forEach(checkbox => (checkbox.checked = false));
        amenityCheckboxes.forEach(checkbox => (checkbox.checked = false));

        // Reset range sliders to their default initial values
        priceRange.value = 100000; // Assuming initial value from HTML
        priceValue.textContent = '100.000'; // Update displayed value
        distanceRange.value = 10; // Assuming initial value from HTML
        distanceValue.textContent = '10'; // Update displayed value

        // Reset quick search inputs
        carTypeSelect.value = "";
        locationInput.value = "";
        timeInput.value = "";

        // Reset sort select
        sortSelect.value = "";

        // Re-apply filters and render results to show all vehicles
        applyFiltersAndSort();
    });


    // Initial render when page loads
    applyFiltersAndSort(); // Call initially to render all vehicles
});