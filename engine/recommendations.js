(() => {
  'use strict';

  const recommendationCount = 10;

  const getTodaySeed = () => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  };

  const hash = (value) => {
    let result = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      result ^= value.charCodeAt(index);
      result = Math.imul(result, 16777619);
    }
    return result >>> 0;
  };

  const getDailyRecommendations = (products) => products
    .map((product) => ({ product, score: hash(`${getTodaySeed()}-${product.name}`) }))
    .sort((first, second) => second.score - first.score)
    .slice(0, recommendationCount)
    .map(({ product }) => product);

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
      <article class="product-card" id="recom-${product.id || safeName}">
        <div class="product-image-container btn-order-trigger" 
             data-product-name="${safeName}" 
             data-product-price="${safePrice}" 
             data-product-image="${safeImage}" 
             data-product-category="${safeCategory}" 
             title="Klik untuk order ${safeName}">
          <span class="card-badge">${product.categoryLabel || 'Buket Bunga'}</span>
          <img src="${product.image}" alt="${product.name} - rekomendasi buket bunga Kyuflorist Bali" loading="lazy" decoding="async">
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

  const renderRecommendations = async () => {
    const grid = document.getElementById('recommendations-grid');
    if (!grid) return;

    try {
      const response = await fetch('products.json');
      if (!response.ok) throw new Error('Produk tidak dapat dimuat');
      const products = await response.json();
      grid.innerHTML = getDailyRecommendations(products).map(productCard).join('');
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    } catch (error) {
      grid.innerHTML = '<p class="empty-state">Rekomendasi bunga belum dapat dimuat. Silakan refresh halaman.</p>';
    }
  };

  document.addEventListener('DOMContentLoaded', renderRecommendations);
})();
