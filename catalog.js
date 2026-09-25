document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('catalog-grid');
  const priceFilters = document.querySelectorAll('[data-price]');
  const flowerFilters = document.querySelectorAll('[data-flower]');
  const count = document.getElementById('product-count');
  const status = document.getElementById('filter-status');
  const searchInput = document.getElementById('catalog-search');

  let products = [];
  let selectedPrice = 'all';
  let selectedFlower = 'all';
  let searchQuery = '';

  const priceMap = {
    price_50k: 50000,
    'buket-100-ribu': 100000,
    price_125k: 125000,
    price_130k: 130000,
    price_150k: 150000,
    price_175k: 175000,
    price_180k: 180000,
    price_185k: 185000,
    price_200k: 200000,
    price_250k: 250000,
    price_280k: 280000,
    price_285k: 285000,
    price_300k: 300000,
    price_350k: 350000,
    price_450k: 450000,
    price_600k: 600000
  };

  const flowerMatches = (product, category) => {
    if (category === 'all') return true;
    if (category === 'Thumbelina_Buket') {
      return product.category === 'Thumbelina_Buket' || product.name.includes('Thumbelina');
    }
    if (category === 'korean_buket') {
      return product.category === 'korean_buket' || product.name.includes('Korean');
    }
    if (category === 'buket-100-ribu') {
      return product.category === 'buket-100-ribu';
    }
    if (category === 'price_50k') {
      return product.category === 'price_50k';
    }
    return product.category === category;
  };

  const priceMatches = (product, priceKey) => {
    if (priceKey === 'all') return true;
    const targetPrice = priceMap[priceKey];
    if (targetPrice !== undefined) {
      return product.priceNum === targetPrice || product.priceCode === priceKey;
    }
    return product.category === priceKey || product.priceCode === priceKey;
  };

  const escapeAttr = (str) => {
    if (!str) return '';
    return String(str).replace(/"/g, '&quot;');
  };

  const productCard = (product) => {
    const safeName = escapeAttr(product.name);
    const safePrice = escapeAttr(product.price);
    const safeImage = escapeAttr(product.image);
    const safeCategory = escapeAttr(product.categoryLabel || 'Buket Bunga');

    return `
      <article class="product-card" id="prod-${product.id || safeName}">
        <div class="product-image-container btn-order-trigger" 
             data-product-name="${safeName}" 
             data-product-price="${safePrice}" 
             data-product-image="${safeImage}" 
             data-product-category="${safeCategory}" 
             title="Klik untuk order ${safeName}">
          <span class="card-badge">${product.categoryLabel || 'Buket Bunga'}</span>
          <img src="${product.image}" alt="${product.name} - toko bunga Denpasar Kyuflorist Bali" loading="lazy" decoding="async">
        </div>
        <div class="p-content">
          <div class="p-details">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
          </div>
          <div class="p-footer">
            <div class="price">${product.price}</div>
            <button type="button" 
                    class="order-btn" 
                    data-product-name="${safeName}" 
                    data-product-price="${safePrice}" 
                    data-product-image="${safeImage}" 
                    data-product-category="${safeCategory}">
              <span>Order Sekarang</span>
              <i data-lucide="message-circle"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  };

  const render = () => {
    const visibleProducts = products.filter((product) => {
      const matchPrice = priceMatches(product, selectedPrice);
      const matchFlower = flowerMatches(product, selectedFlower);
      const matchSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery) ||
        product.price.toLowerCase().includes(searchQuery);
      return matchPrice && matchFlower && matchSearch;
    });

    if (visibleProducts.length) {
      grid.innerHTML = visibleProducts.map(productCard).join('');
    } else {
      grid.innerHTML = `
        <div class="empty-state-card">
          <i data-lucide="flower-2"></i>
          <p>Belum ada produk yang cocok dengan filter ini.</p>
          <button type="button" id="reset-filter-btn" class="reset-filter-btn">Reset Filter</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-filter-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          selectedPrice = 'all';
          selectedFlower = 'all';
          searchQuery = '';
          if (searchInput) searchInput.value = '';
          priceFilters.forEach((item) => item.classList.toggle('active', item.dataset.price === 'all'));
          flowerFilters.forEach((item) => item.classList.toggle('active', item.dataset.flower === 'all'));
          render();
        });
      }
    }

    if (count) count.textContent = `${visibleProducts.length} produk`;
    if (status) {
      status.textContent = selectedPrice === 'all' && selectedFlower === 'all' && !searchQuery
        ? 'Semua produk'
        : `${visibleProducts.length} produk ditampilkan`;
    }

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  };

  try {
    const response = await fetch('products.json');
    if (!response.ok) throw new Error('Gagal memuat produk');
    products = await response.json();
    render();
  } catch (error) {
    grid.innerHTML = '<p class="empty-state">Katalog sedang tidak dapat dimuat. Silakan refresh halaman.</p>';
  }

  priceFilters.forEach((button) => button.addEventListener('click', () => {
    selectedPrice = button.dataset.price;
    priceFilters.forEach((item) => item.classList.toggle('active', item === button));
    render();
  }));

  flowerFilters.forEach((button) => button.addEventListener('click', () => {
    selectedFlower = button.dataset.flower;
    flowerFilters.forEach((item) => item.classList.toggle('active', item === button));
    render();
  }));

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      render();
    });
  }
});
