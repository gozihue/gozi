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
  };
}

// Slider khoảng cách
const distanceRange = document.getElementById("distance-range");
const distanceValue = document.getElementById("distance-value");
if (distanceRange && distanceValue) {
  distanceValue.textContent = distanceRange.value;
  distanceRange.oninput = () => {
    distanceValue.textContent = distanceRange.value;
  };
}

// Dữ liệu xe (có ảnh)
const vehicles = [
  { name: "Yamaha Exciter 155", type: "motorbike", price: 150000, location: "Huế", rating: 4.5, distance: 5, amenities: ["helmet", "gps"], image: "img/xe/Yamaha Exciter 155.jpg" },
  { name: "VinFast Klara S", type: "electric-bike", price: 130000, location: "Huế", rating: 5.0, distance: 7, amenities: ["delivery"], image: "img/xe/VinFast Klara S.jpg" },
  { name: "Honda SH Mode", type: "motorbike", price: 180000, location: "Đà Nẵng", rating: 4.0, distance: 3, amenities: ["helmet"], image: "img/xe/Honda SH Mode.jpg" },
  { name: "Toyota Vios", type: "car", price: 500000, location: "Huế", rating: 4.8, distance: 6, amenities: ["gps", "delivery"], image: "img/xe/Toyota Vios.jpg" },
  { name: "Mazda CX-5", type: "car", price: 700000, location: "Huế", rating: 4.9, distance: 12, amenities: ["gps", "helmet", "delivery"], image: "img/xe/Mazda CX-5.jpg" },
  { name: "Honda Wave Alpha", type: "motorbike", price: 90000, location: "Đà Nẵng", rating: 3.5, distance: 10, amenities: ["helmet"], image: "img/xe/Honda Wave Alpha.jpg" },
  { name: "Suzuki GSX R150", type: "motorbike", price: 200000, location: "Huế", rating: 4.7, distance: 4, amenities: ["helmet"], image: "img/xe/Suzuki GSX R150.jpg" },
  { name: "VinFast VF e34", type: "car", price: 650000, location: "Huế", rating: 5.0, distance: 8, amenities: ["gps", "delivery"], image: "img/xe/VinFast VF e34.jpg" },
  { name: "Peugeot Django", type: "motorbike", price: 170000, location: "Hội An", rating: 4.2, distance: 2, amenities: ["helmet", "gps"], image: "img/xe/Peugeot Django.jpg" },
  { name: "Pega Aura", type: "electric-bike", price: 120000, location: "Huế", rating: 4.3, distance: 9, amenities: ["helmet"], image: "img/xe/Pega Aura.jpg" },
  { name: "Honda Lead", type: "motorbike", price: 140000, location: "Huế", rating: 4.0, distance: 3, amenities: ["helmet"], image: "img/xe/Honda Lead.jpg" },
  { name: "Yamaha Grande", type: "motorbike", price: 160000, location: "Huế", rating: 4.4, distance: 5, amenities: ["helmet", "delivery"], image: "img/xe/Yamaha Grande.jpg" },
  { name: "Kia Seltos", type: "car", price: 550000, location: "Huế", rating: 4.6, distance: 6, amenities: ["gps", "helmet"], image: "img/xe/Kia Seltos.jpg" },
  { name: "Honda Vision", type: "motorbike", price: 130000, location: "Đà Nẵng", rating: 4.1, distance: 2, amenities: ["helmet"], image: "img/xe/Honda Vision.jpg" },
  { name: "Yamaha Sirius", type: "motorbike", price: 100000, location: "Huế", rating: 3.9, distance: 7, amenities: ["helmet"], image: "img/xe/Yamaha Sirius.jpg" },
  { name: "Hyundai Accent", type: "car", price: 480000, location: "Huế", rating: 4.2, distance: 10, amenities: ["gps"], image: "img/xe/Hyundai Accent.jpg" },
  { name: "VinFast Feliz S", type: "electric-bike", price: 110000, location: "Huế", rating: 4.5, distance: 5, amenities: ["delivery"], image: "img/xe/VinFast Feliz.jpg" },
  { name: "Piaggio Liberty", type: "motorbike", price: 175000, location: "Huế", rating: 4.3, distance: 4, amenities: ["helmet", "gps"], image: "img/xe/Piaggio Liberty.jpg" },
  { name: "Toyota Fortuner", type: "car", price: 800000, location: "Huế", rating: 4.9, distance: 11, amenities: ["gps", "delivery"], image: "img/xe/Toyota Fortuner.jpg" },
  { name: "Honda PCX", type: "motorbike", price: 190000, location: "Huế", rating: 4.6, distance: 6, amenities: ["helmet", "delivery"], image: "img/xe/Honda PCX.jpg" }
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
  const carType = document.getElementById("car-type")?.value || "";
  const vehicleTypeChecks = Array.from(document.querySelectorAll('input[name="vehicle_type"]:checked')).map(cb => cb.value);
  const maxPrice = parseInt(priceRange?.value || "1000000");
  const maxDistance = parseInt(distanceRange?.value || "100");
  const starChecks = Array.from(document.querySelectorAll('input[name="star_rating"]:checked')).map(cb => parseFloat(cb.value));
  const amenityChecks = Array.from(document.querySelectorAll('input[name="amenity"]:checked')).map(cb => cb.value);
  const locationInput = document.getElementById("location")?.value.trim().toLowerCase();

  filteredVehicles = vehicles.filter(vehicle => {
    if (carType && carType !== "all" && vehicle.type !== carType) return false;
    if (vehicleTypeChecks.length > 0 && !vehicleTypeChecks.includes(vehicle.type)) return false;
    if (vehicle.price > maxPrice) return false;
    if (vehicle.distance > maxDistance) return false;
    if (starChecks.length > 0 && !starChecks.some(star => vehicle.rating >= star)) return false;
    if (amenityChecks.length > 0 && !amenityChecks.every(am => vehicle.amenities.includes(am))) return false;
    if (locationInput && !vehicle.location.toLowerCase().includes(locationInput)) return false;
    return true;
  });

  // 👉 Đảm bảo reset về trang đầu khi lọc
  // currentPage = 1;

  filteredVehicles.sort((a, b) => b.price - a.price);


  renderVehicles();
  renderPagination();
}

document.addEventListener("DOMContentLoaded", () => {
  const savedState = JSON.parse(localStorage.getItem("filterState"));
  if (savedState) {
    document.getElementById("car-type").value = savedState.carType;
    priceRange.value = savedState.maxPrice;
    priceValue.textContent = new Intl.NumberFormat("vi-VN").format(priceRange.value);
    distanceRange.value = savedState.maxDistance;
    distanceValue.textContent = distanceRange.value;
    currentPage = savedState.currentPage;

    document.querySelectorAll('input[name="star_rating"]').forEach(cb => {
      cb.checked = savedState.starChecks.includes(cb.value);
    });
    document.querySelectorAll('input[name="amenity"]').forEach(cb => {
      cb.checked = savedState.amenityChecks.includes(cb.value);
    });

    filterVehicles();
  } else {
    renderVehicles();
    renderPagination();
  }

  document.querySelector(".search-button")?.addEventListener("click", () => {
    currentPage = 1;
    filterVehicles();
  });

  document.querySelector(".clear-filters-btn")?.addEventListener("click", () => {
    document.getElementById("car-type").value = "";
    priceRange.value = 100000;
    priceValue.textContent = new Intl.NumberFormat("vi-VN").format(priceRange.value);
    distanceRange.value = 10;
    distanceValue.textContent = distanceRange.value;

    document.querySelectorAll('input[name="star_rating"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('input[name="amenity"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('input[name="vehicle_type"]').forEach(cb => cb.checked = false);

    currentPage = 1;
    filteredVehicles = [...vehicles];
    localStorage.removeItem("filterState");

    renderVehicles();
    renderPagination();
  });

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
        amenityChecks: Array.from(document.querySelectorAll('input[name="amenity"]:checked')).map(cb => cb.value)
      }));

      window.location.href = "chi_tiet/xe1.html";
    }
  });
});
