// === PROPERTY DATA ===
const properties = [
  { id:1, title:"Modern 3-Bedroom Flat", location:"Lekki", type:"Apartment", category:"rent", price:1200000, area:"120 sqm", image:"https://picsum.photos/300/200?random=1" },
  { id:2, title:"Spacious 4-Bedroom Duplex", location:"Ikeja", type:"House", category:"rent", price:2500000, area:"250 sqm", image:"https://picsum.photos/300/200?random=2" },
  { id:3, title:"Prime Office Space – VI", location:"Victoria Island", type:"Commercial", category:"rent", price:3500000, area:"180 sqm", image:"https://picsum.photos/300/200?random=3" },
  { id:4, title:"Cozy 1-Bedroom Apartment", location:"Surulere", type:"Apartment", category:"rent", price:450000, area:"60 sqm", image:"https://picsum.photos/300/200?random=4" },
  { id:5, title:"600sqm Residential Plot", location:"Ajah", type:"Land", category:"sale", price:85000000, area:"600 sqm", image:"https://picsum.photos/300/200?random=5" },
  { id:6, title:"Luxury 5-Bedroom Penthouse", location:"Lekki", type:"Apartment", category:"sale", price:180000000, area:"320 sqm", image:"https://picsum.photos/300/200?random=6" },
  { id:7, title:"Shop Space – Allen Avenue", location:"Ikeja", type:"Commercial", category:"sale", price:45000000, area:"100 sqm", image:"https://picsum.photos/300/200?random=7" },
  { id:8, title:"Family House with BQ", location:"Yaba", type:"House", category:"rent", price:950000, area:"200 sqm", image:"https://picsum.photos/300/200?random=8" }
];

// === DOM ELEMENTS ===
const propertyGrid = document.getElementById('propertyGrid');
const noResults = document.getElementById('noResults');
const locationFilter = document.getElementById('locationFilter');
const typeFilter = document.getElementById('typeFilter');
const categoryFilter = document.getElementById('categoryFilter');
const resetBtn = document.getElementById('resetFilters');

// === MOBILE NAV ===
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const closeNav = document.getElementById('closeNav');
const navLinks = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => mobileNav.classList.add('active'));
closeNav.addEventListener('click', () => mobileNav.classList.remove('active'));

navLinks.forEach(link => {
  link.addEventListener('click', () => mobileNav.classList.remove('active'));
});

// === FORMAT PRICE ===
function formatPrice(price, category) {
  if (category === 'sale') {
    if (price >= 1000000) {
      return `₦${(price / 1000000).toFixed(1)}M`;
    } else {
      return `₦${price.toLocaleString()}`;
    }
  } else {
    return `₦${price.toLocaleString()}/month`;
  }
}

// === RENDER PROPERTIES ===
function renderProperties(list) {
  propertyGrid.innerHTML = '';
  if (list.length === 0) {
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';

  list.forEach(prop => {
    const isSale = prop.category === 'sale';
    const priceFormatted = formatPrice(prop.price, prop.category);
    const badgeText = isSale ? 'For Sale' : 'For Rent';
    const badgeClass = isSale ? 'sale' : '';

    const card = document.createElement('div');
    card.className = 'property-card';
    card.innerHTML = `
      <div class="badge ${badgeClass}">${badgeText}</div>
      <img src="${prop.image}" alt="${prop.title}" class="property-img">
      <div class="property-info">
        <h3>${prop.title}</h3>
        <div class="property-meta">
          <span>📍 ${prop.location}</span>
          <span>${prop.area}</span>
        </div>
        <div class="property-type">${prop.type}</div>
        <div class="property-price ${badgeClass}">${priceFormatted}</div>
        <a href="https://wa.me/2348012345678?text=Hi! I'm interested in: ${encodeURIComponent(prop.title)} in ${prop.location}" 
           target="_blank" class="contact-agent">
          Contact Agent
        </a>
      </div>
    `;
    propertyGrid.appendChild(card);
  });
}

// === FILTER LOGIC ===
function applyFilters() {
  const location = locationFilter.value;
  const type = typeFilter.value;
  const category = categoryFilter.value;

  let filtered = properties;
  if (location) filtered = filtered.filter(p => p.location === location);
  if (type) filtered = filtered.filter(p => p.type === type);
  if (category) filtered = filtered.filter(p => p.category === category);

  renderProperties(filtered);
}

locationFilter.addEventListener('change', applyFilters);
typeFilter.addEventListener('change', applyFilters);
categoryFilter.addEventListener('change', applyFilters);
resetBtn.addEventListener('click', () => {
  locationFilter.value = '';
  typeFilter.value = '';
  categoryFilter.value = '';
  applyFilters();
});

// === FAQ ACCORDION ===
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.closest('.faq-item');
    const wasActive = item.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    
    if (!wasActive) item.classList.add('active');
  });
});

// === SCROLL ANIMATIONS ===
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const isVisible = elementTop < window.innerHeight - 100;
    if (isVisible) el.classList.add('visible');
  });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', () => {
  renderProperties(properties);
  animateOnScroll(); // initial check
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});



// Disable video on mobile to save data
document.addEventListener('DOMContentLoaded', () => {
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    if (window.innerWidth <= 768) {
      // On mobile: pause and hide video, rely on fallback image
      heroVideo.pause();
      heroVideo.style.display = 'none';
    } else {
      // On desktop: try to play
      heroVideo.play().catch(e => {
        console.log("Video autoplay blocked or failed:", e);
        // Fallback handled by <img> inside <video>
      });
    }
  }
});