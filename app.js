// CraftMarket JavaScript - E-commerce functionality

// Application data with working placeholder images
const appData = {
  "categories": [
    {"id": 1, "name": "Jewelry", "icon": "💍"},
    {"id": 2, "name": "Home Decor", "icon": "🏠"},
    {"id": 3, "name": "Art & Paintings", "icon": "🎨"},
    {"id": 4, "name": "Textiles", "icon": "🧵"},
    {"id": 5, "name": "Ceramics", "icon": "🏺"},
    {"id": 6, "name": "Woodwork", "icon": "🪵"}
  ],
  "products": [
    {
      "id": 1,
      "title": "Handwoven Silver Bracelet",
      "price": 45.99,
      "image": "https://picsum.photos/300/300?random=1",
      "seller": "Sarah's Jewelry",
      "rating": 4.8,
      "category": "Jewelry",
      "description": "Beautiful handwoven silver bracelet with intricate patterns"
    },
    {
      "id": 2,
      "title": "Ceramic Dinner Set",
      "price": 89.99,
      "image": "https://picsum.photos/300/300?random=2",
      "seller": "Potter's Corner",
      "rating": 4.9,
      "category": "Ceramics",
      "description": "Hand-thrown ceramic dinner set glazed in earthy tones"
    },
    {
      "id": 3,
      "title": "Abstract Canvas Painting",
      "price": 125.00,
      "image": "https://picsum.photos/300/300?random=3",
      "seller": "Art by Maya",
      "rating": 4.7,
      "category": "Art & Paintings",
      "description": "Original abstract painting on canvas with vibrant colors"
    },
    {
      "id": 4,
      "title": "Wooden Coffee Table",
      "price": 299.99,
      "image": "https://picsum.photos/300/300?random=4",
      "seller": "Woodcraft Studio",
      "rating": 4.9,
      "category": "Woodwork",
      "description": "Handcrafted solid oak coffee table with modern design"
    },
    {
      "id": 5,
      "title": "Embroidered Throw Pillow",
      "price": 35.99,
      "image": "https://picsum.photos/300/300?random=5",
      "seller": "Textile Treasures",
      "rating": 4.6,
      "category": "Textiles",
      "description": "Hand-embroidered throw pillow with floral motifs"
    },
    {
      "id": 6,
      "title": "Macrame Wall Hanging",
      "price": 58.99,
      "image": "https://picsum.photos/300/300?random=6",
      "seller": "Boho Crafts",
      "rating": 4.8,
      "category": "Home Decor",
      "description": "Large macrame wall hanging perfect for bohemian decor"
    }
  ],
  "sellers": [
    {
      "id": 1,
      "name": "Sarah's Jewelry",
      "bio": "Creating unique jewelry pieces for over 10 years",
      "rating": 4.8,
      "products": 23,
      "location": "California, USA"
    },
    {
      "id": 2,
      "name": "Potter's Corner",
      "bio": "Traditional pottery with modern aesthetics",
      "rating": 4.9,
      "products": 15,
      "location": "Oregon, USA"
    },
    {
      "id": 3,
      "name": "Art by Maya",
      "bio": "Contemporary artist specializing in abstract works",
      "rating": 4.7,
      "products": 31,
      "location": "New York, USA"
    }
  ],
  "testimonials": [
    {
      "name": "Emily Johnson",
      "text": "Amazing quality and fast shipping! The jewelry exceeded my expectations.",
      "rating": 5
    },
    {
      "name": "Michael Chen",
      "text": "Found the perfect handmade gifts for my family. Great platform!",
      "rating": 5
    },
    {
      "name": "Lisa Rodriguez",
      "text": "Love supporting local artisans through this marketplace.",
      "rating": 4
    }
  ]
};

// Application state
let cart = [];
let wishlist = [];
let currentProducts = [...appData.products];
let filteredProducts = [...appData.products];
let currentTheme = 'light';

// DOM elements
const elements = {
  categoriesGrid: document.getElementById('categoriesGrid'),
  productsGrid: document.getElementById('productsGrid'),
  testimonialsSlider: document.getElementById('testimonialsSlider'),
  searchInput: document.getElementById('searchInput'),
  searchBtn: document.getElementById('searchBtn'),
  categoryFilter: document.getElementById('categoryFilter'),
  sortFilter: document.getElementById('sortFilter'),
  cartBtn: document.getElementById('cartBtn'),
  wishlistBtn: document.getElementById('wishlistBtn'),
  cartCount: document.getElementById('cartCount'),
  wishlistCount: document.getElementById('wishlistCount'),
  themeToggle: document.getElementById('themeToggle'),
  productModal: document.getElementById('productModal'),
  cartModal: document.getElementById('cartModal'),
  wishlistModal: document.getElementById('wishlistModal'),
  newsletterForm: document.getElementById('newsletterForm')
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  setupEventListeners();
  addScrollAnimations();
});

function initializeApp() {
  renderCategories();
  renderProducts();
  renderTestimonials();
  populateCategoryFilter();
  updateCartCount();
  updateWishlistCount();
  initializeTheme();
}

function setupEventListeners() {
  // Search functionality - fixed to work properly
  elements.searchInput.addEventListener('input', debounce(handleSearch, 300));
  elements.searchBtn.addEventListener('click', handleSearch);
  elements.searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });
  
  // Filters
  elements.categoryFilter.addEventListener('change', handleFilters);
  elements.sortFilter.addEventListener('change', handleFilters);
  
  // Cart and wishlist
  elements.cartBtn.addEventListener('click', openCartModal);
  elements.wishlistBtn.addEventListener('click', openWishlistModal);
  
  // Theme toggle
  elements.themeToggle.addEventListener('click', toggleTheme);
  
  // Modal close events
  document.getElementById('closeModal').addEventListener('click', closeProductModal);
  document.getElementById('modalOverlay').addEventListener('click', closeProductModal);
  document.getElementById('closeCart').addEventListener('click', closeCartModal);
  document.getElementById('cartOverlay').addEventListener('click', closeCartModal);
  document.getElementById('closeWishlist').addEventListener('click', closeWishlistModal);
  document.getElementById('wishlistOverlay').addEventListener('click', closeWishlistModal);
  
  // Newsletter
  elements.newsletterForm.addEventListener('submit', handleNewsletter);
  
  // Hero CTA
  document.querySelector('.hero__cta').addEventListener('click', function() {
    document.querySelector('.products').scrollIntoView({ behavior: 'smooth' });
  });
  
  // Category cards click
  document.addEventListener('click', function(e) {
    if (e.target.closest('.category-card')) {
      const categoryName = e.target.closest('.category-card').dataset.category;
      elements.categoryFilter.value = categoryName;
      handleFilters();
      document.querySelector('.products').scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  // Checkout button
  document.addEventListener('click', function(e) {
    if (e.target.id === 'checkoutBtn') {
      handleCheckout();
    }
  });
}

function renderCategories() {
  const html = appData.categories.map(category => `
    <div class="category-card fade-in" data-category="${category.name}">
      <span class="category-card__icon">${category.icon}</span>
      <h3 class="category-card__name">${category.name}</h3>
    </div>
  `).join('');
  
  elements.categoriesGrid.innerHTML = html;
}

function renderProducts(products = filteredProducts) {
  if (products.length === 0) {
    elements.productsGrid.innerHTML = '<div class="empty-state">No products found matching your criteria.</div>';
    return;
  }
  
  const html = products.map(product => `
    <div class="product-card fade-in" data-product-id="${product.id}">
      <div class="product-card__image">
        <img src="${product.image}" alt="${product.title}" loading="lazy" onerror="this.style.background='linear-gradient(135deg, var(--color-mocha-200), var(--color-mocha-300))'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.innerHTML='🖼️';">
        <div class="product-card__actions">
          <button class="btn--icon" onclick="toggleWishlist(${product.id})" title="Add to wishlist">
            ${wishlist.includes(product.id) ? '❤️' : '🤍'}
          </button>
          <button class="btn--icon" onclick="openProductModal(${product.id})" title="Quick view">
            👁️
          </button>
        </div>
      </div>
      <div class="product-card__content">
        <h3 class="product-card__title">${product.title}</h3>
        <p class="product-card__seller">by ${product.seller}</p>
        <div class="product-card__rating">
          <span>${generateStars(product.rating)}</span>
          <span>(${product.rating})</span>
        </div>
        <div class="product-card__price">$${product.price.toFixed(2)}</div>
        <div class="product-card__footer">
          <button class="btn btn--primary" onclick="addToCart(${product.id})" style="flex: 1;">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `).join('');
  
  elements.productsGrid.innerHTML = html;
}

function renderTestimonials() {
  const html = appData.testimonials.map(testimonial => `
    <div class="testimonial-card fade-in">
      <div class="testimonial-card__rating">${generateStars(testimonial.rating)}</div>
      <p class="testimonial-card__text">"${testimonial.text}"</p>
      <div class="testimonial-card__name">${testimonial.name}</div>
    </div>
  `).join('');
  
  elements.testimonialsSlider.innerHTML = html;
}

function populateCategoryFilter() {
  const options = appData.categories.map(category => 
    `<option value="${category.name}">${category.name}</option>`
  ).join('');
  
  elements.categoryFilter.innerHTML = '<option value="">All Categories</option>' + options;
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let stars = '';
  
  for (let i = 0; i < fullStars; i++) {
    stars += '⭐';
  }
  
  if (hasHalfStar) {
    stars += '⭐';
  }
  
  return stars;
}

// Fixed search functionality
function handleSearch() {
  const query = elements.searchInput.value.toLowerCase().trim();
  
  if (query === '') {
    currentProducts = [...appData.products];
  } else {
    currentProducts = appData.products.filter(product => 
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.seller.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }
  
  // Clear category filter when searching
  if (query !== '') {
    elements.categoryFilter.value = '';
  }
  
  applyFiltersAndSort();
  
  // Show search feedback
  if (query !== '') {
    const resultCount = filteredProducts.length;
    showNotification(`Found ${resultCount} product${resultCount !== 1 ? 's' : ''} for "${query}"`);
  }
}

function handleFilters() {
  applyFiltersAndSort();
}

function applyFiltersAndSort() {
  let products = [...currentProducts];
  
  // Apply category filter
  const categoryFilter = elements.categoryFilter.value;
  if (categoryFilter) {
    products = products.filter(product => product.category === categoryFilter);
  }
  
  // Apply sorting
  const sortFilter = elements.sortFilter.value;
  switch (sortFilter) {
    case 'price-low':
      products.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      products.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      products.sort((a, b) => b.rating - a.rating);
      break;
    default:
      // Featured - keep original order
      break;
  }
  
  filteredProducts = products;
  renderProducts(filteredProducts);
  addScrollAnimations();
}

function addToCart(productId) {
  const product = appData.products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  updateCartCount();
  showNotification(`${product.title} added to cart!`);
}

function toggleWishlist(productId) {
  const product = appData.products.find(p => p.id === productId);
  
  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter(id => id !== productId);
    showNotification(`${product.title} removed from wishlist`);
  } else {
    wishlist.push(productId);
    showNotification(`${product.title} added to wishlist!`);
  }
  
  updateWishlistCount();
  renderProducts(filteredProducts);
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  elements.cartCount.textContent = totalItems;
}

function updateWishlistCount() {
  elements.wishlistCount.textContent = wishlist.length;
}

function openProductModal(productId) {
  const product = appData.products.find(p => p.id === productId);
  const seller = appData.sellers.find(s => s.name === product.seller);
  
  const html = `
    <div style="padding: 24px;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 24px;">
        <div>
          <img src="${product.image}" alt="${product.title}" style="width: 100%; border-radius: 8px;" onerror="this.style.background='linear-gradient(135deg, var(--color-mocha-200), var(--color-mocha-300))'; this.style.height='300px'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.innerHTML='🖼️'; this.style.fontSize='48px';">
        </div>
        <div>
          <h2 style="margin-bottom: 12px;">${product.title}</h2>
          <p style="color: var(--color-text-secondary); margin-bottom: 16px;">by ${product.seller}</p>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
            <span>${generateStars(product.rating)}</span>
            <span>(${product.rating})</span>
          </div>
          <div style="font-size: 24px; font-weight: bold; color: var(--color-primary); margin-bottom: 20px;">
            $${product.price.toFixed(2)}
          </div>
          <p style="margin-bottom: 24px; line-height: 1.6;">${product.description}</p>
          <div style="display: flex; gap: 12px;">
            <button class="btn btn--primary" onclick="addToCart(${product.id}); closeProductModal();">
              Add to Cart
            </button>
            <button class="btn btn--secondary" onclick="toggleWishlist(${product.id}); closeProductModal();">
              ${wishlist.includes(product.id) ? 'Remove from' : 'Add to'} Wishlist
            </button>
          </div>
        </div>
      </div>
      ${seller ? `
        <div style="border-top: 1px solid var(--color-border); padding-top: 24px;">
          <h3>About the Seller</h3>
          <div style="display: flex; justify-content: space-between; margin-top: 12px;">
            <div>
              <p><strong>${seller.name}</strong></p>
              <p style="color: var(--color-text-secondary);">${seller.bio}</p>
              <p style="color: var(--color-text-secondary);">📍 ${seller.location}</p>
            </div>
            <div style="text-align: right;">
              <p>${generateStars(seller.rating)} (${seller.rating})</p>
              <p style="color: var(--color-text-secondary);">${seller.products} products</p>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  `;
  
  document.getElementById('productDetail').innerHTML = html;
  elements.productModal.classList.remove('hidden');
}

function closeProductModal() {
  elements.productModal.classList.add('hidden');
}

function openCartModal() {
  if (cart.length === 0) {
    document.getElementById('cartContent').innerHTML = '<div class="empty-state">Your cart is empty</div>';
  } else {
    const html = cart.map(item => `
      <div style="display: flex; align-items: center; gap: 16px; padding: 16px; border-bottom: 1px solid var(--color-border);">
        <img src="${item.image}" alt="${item.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" onerror="this.style.background='linear-gradient(135deg, var(--color-mocha-200), var(--color-mocha-300))'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.innerHTML='🖼️';">
        <div style="flex: 1;">
          <h4 style="margin-bottom: 4px;">${item.title}</h4>
          <p style="color: var(--color-text-secondary); font-size: 14px;">by ${item.seller}</p>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <button onclick="updateCartQuantity(${item.id}, -1)" style="background: none; border: 1px solid var(--color-border); width: 30px; height: 30px; border-radius: 4px; cursor: pointer;">-</button>
          <span>${item.quantity}</span>
          <button onclick="updateCartQuantity(${item.id}, 1)" style="background: none; border: 1px solid var(--color-border); width: 30px; height: 30px; border-radius: 4px; cursor: pointer;">+</button>
        </div>
        <div style="font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</div>
        <button onclick="removeFromCart(${item.id})" style="background: none; border: none; color: var(--color-error); cursor: pointer; font-size: 18px;">×</button>
      </div>
    `).join('');
    
    document.getElementById('cartContent').innerHTML = html;
  }
  
  updateCartTotal();
  elements.cartModal.classList.remove('hidden');
}

function closeCartModal() {
  elements.cartModal.classList.add('hidden');
}

function openWishlistModal() {
  if (wishlist.length === 0) {
    document.getElementById('wishlistContent').innerHTML = '<div class="empty-state">Your wishlist is empty</div>';
  } else {
    const wishlistProducts = appData.products.filter(p => wishlist.includes(p.id));
    const html = wishlistProducts.map(product => `
      <div style="display: flex; align-items: center; gap: 16px; padding: 16px; border-bottom: 1px solid var(--color-border);">
        <img src="${product.image}" alt="${product.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" onerror="this.style.background='linear-gradient(135deg, var(--color-mocha-200), var(--color-mocha-300))'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.innerHTML='🖼️';">
        <div style="flex: 1;">
          <h4 style="margin-bottom: 4px;">${product.title}</h4>
          <p style="color: var(--color-text-secondary); font-size: 14px;">by ${product.seller}</p>
          <div style="font-weight: bold; color: var(--color-primary);">$${product.price.toFixed(2)}</div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn--sm btn--primary" onclick="addToCart(${product.id})">Add to Cart</button>
          <button onclick="toggleWishlist(${product.id}); closeWishlistModal();" style="background: none; border: none; color: var(--color-error); cursor: pointer; font-size: 18px;">×</button>
        </div>
      </div>
    `).join('');
    
    document.getElementById('wishlistContent').innerHTML = html;
  }
  
  elements.wishlistModal.classList.remove('hidden');
}

function closeWishlistModal() {
  elements.wishlistModal.classList.add('hidden');
}

function updateCartQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    updateCartCount();
    openCartModal(); // Refresh the modal
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartCount();
  openCartModal(); // Refresh the modal
}

function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  document.getElementById('cartTotal').textContent = total.toFixed(2);
}

function handleCheckout() {
  if (cart.length === 0) {
    showNotification('Your cart is empty!');
    return;
  }
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  showNotification(`Checkout initiated for $${total.toFixed(2)}! This is a demo - no payment processed.`);
  
  // In a real app, this would redirect to payment processing
  setTimeout(() => {
    cart = [];
    updateCartCount();
    closeCartModal();
    showNotification('Thank you for your order! (Demo complete)');
  }, 2000);
}

function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-color-scheme', currentTheme);
  elements.themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
}

function initializeTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  currentTheme = prefersDark ? 'dark' : 'light';
  elements.themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
}

function handleNewsletter(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  showNotification('Thank you for subscribing to our newsletter!');
  e.target.reset();
}

function showNotification(message) {
  // Create a simple notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--color-primary);
    color: var(--color-btn-primary-text);
    padding: 16px 24px;
    border-radius: 8px;
    z-index: 10000;
    box-shadow: var(--shadow-float);
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 300px;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

// Utility function for debouncing search
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}