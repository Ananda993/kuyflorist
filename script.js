/**
 * Kyuflorist Bali - Core Web Engine & Interactivity
 * Handles Navigation, Mobile Drawer Menu, Universal Branch & Contact Modal,
 * and WhatsApp Order Message with Direct Photo Preview Link (Clean Plaintext Format)
 */

(() => {
  'use strict';

  const SITE_BASE_URL = 'https://kyuflorist.netlify.app';

  // Branch WhatsApp & Location Configurations
  const BRANCHES = {
    denpasar: {
      name: 'Cabang Denpasar (Pusat)',
      phone: '6285847499015',
      address: 'Jl. Bulu Indah No. 10, Denpasar',
      hours: '09.00 - 19.00 WITA',
      areas: 'Denpasar, Sanur, Kuta, Seminyak, Canggu, Jimbaran, Nusa Dua',
      maps: 'https://maps.google.com/?q=Kyuflorist+Denpasar+Jl+Bulu+Indah+No+10+Denpasar+Bali'
    },
    sempidi: {
      name: 'Cabang Sempidi (Mengwi)',
      phone: '6285785071816',
      address: 'Jl. Raya Lukluk - Sempidi No.15, Mengwi',
      hours: '09.00 - 17.00 WITA (Buka Setiap Hari)',
      areas: 'Tabanan, Mengwi, Abiansemal, Kapal, Dalung, Canggu, Badung',
      maps: 'https://maps.google.com/?q=Kyuflorist+Sempidi+Jl+Raya+Lukluk+-+Sempidi+No+15+Mengwi+Bali'
    }
  };

  /**
   * Format absolute public image URL with proper URI encoding
   * for automatic WhatsApp link preview thumbnail generation
   */
  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return encodeURI(`${SITE_BASE_URL}/${cleanPath}`);
  };

  /**
   * Helper to generate WhatsApp order URLs
   */
  const buildWaUrl = (phone, text) => {
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  /**
   * Open the Branch & Contact Selection Modal
   * @param {Object|null} [product] Optional product object { name, price, image, categoryLabel }
   * @param {'order'|'branch'|'contact'} [mode='order'] Mode of the modal
   */
  const openOrderModal = (product = null, mode = 'order') => {
    const modal = document.getElementById('branch-order-modal');
    if (!modal) return;

    const prodSummary = document.getElementById('modal-product-card');
    const prodImg = document.getElementById('modal-prod-image');
    const prodTitle = document.getElementById('modal-prod-title');
    const prodPrice = document.getElementById('modal-prod-price');
    const prodTag = document.getElementById('modal-prod-category');
    const modalHeading = document.getElementById('modal-heading');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const btnDenpasar = document.getElementById('btn-order-denpasar');
    const btnSempidi = document.getElementById('btn-order-sempidi');

    if (product && product.name) {
      // Product ordering mode with clean bullet formatting (no emojis to prevent encoding issues)
      if (prodSummary) prodSummary.style.display = 'flex';
      if (prodImg) {
        prodImg.src = product.image || 'kyuflorist logo.png';
        prodImg.alt = product.name;
      }
      if (prodTitle) prodTitle.textContent = product.name;
      if (prodPrice) prodPrice.textContent = product.price || '';
      if (prodTag) prodTag.textContent = product.categoryLabel || 'Buket Bunga';
      if (modalHeading) modalHeading.textContent = 'Pilih Cabang Pemesanan';
      if (modalSubtitle) {
        modalSubtitle.textContent = 'Pilih cabang terdekat dari alamat penerima untuk proses lebih cepat & hemat ongkir:';
      }

      const photoUrl = getFullImageUrl(product.image);

      const msgDenpasar = `Halo Admin Kyuflorist Denpasar, saya mau order:
- Produk: *${product.name}*
- Harga: *${product.price}*
- Foto Produk: ${photoUrl}

Mohon info ketersediaan bunga dan estimasi pengirimannya ya. Terima kasih!`;

      const msgSempidi = `Halo Admin Kyuflorist Sempidi, saya mau order:
- Produk: *${product.name}*
- Harga: *${product.price}*
- Foto Produk: ${photoUrl}

Mohon info ketersediaan bunga dan estimasi pengirimannya ya. Terima kasih!`;

      if (btnDenpasar) {
        btnDenpasar.href = buildWaUrl(BRANCHES.denpasar.phone, msgDenpasar);
      }
      if (btnSempidi) {
        btnSempidi.href = buildWaUrl(BRANCHES.sempidi.phone, msgSempidi);
      }
    } else if (mode === 'contact') {
      // Contact navbar mode
      if (prodSummary) prodSummary.style.display = 'none';
      if (modalHeading) modalHeading.textContent = 'Kontak Cabang Kyuflorist';
      if (modalSubtitle) {
        modalSubtitle.textContent = 'Hubungi admin cabang terdekat melalui WhatsApp untuk konsultasi buket atau klik Maps untuk petunjuk arah:';
      }

      const contactMsgDenpasar = 'Halo Admin Kyuflorist Denpasar, saya ingin konsultasi pemesanan buket bunga & cek pengiriman.';
      const contactMsgSempidi = 'Halo Admin Kyuflorist Sempidi, saya ingin konsultasi pemesanan buket bunga & cek pengiriman.';

      if (btnDenpasar) {
        btnDenpasar.href = buildWaUrl(BRANCHES.denpasar.phone, contactMsgDenpasar);
      }
      if (btnSempidi) {
        btnSempidi.href = buildWaUrl(BRANCHES.sempidi.phone, contactMsgSempidi);
      }
    } else {
      // General branch consultation mode
      if (prodSummary) prodSummary.style.display = 'none';
      if (modalHeading) modalHeading.textContent = 'Pilih Cabang Kyuflorist';
      if (modalSubtitle) {
        modalSubtitle.textContent = 'Hubungi admin cabang terdekat untuk pemesanan buket custom, tanya ketersediaan stok bunga segar, atau pengiriman kilat:';
      }

      const generalMsgDenpasar = 'Halo Admin Kyuflorist Denpasar, saya ingin tanya ketersediaan stok bunga & pemesanan buket.';
      const generalMsgSempidi = 'Halo Admin Kyuflorist Sempidi, saya ingin tanya ketersediaan stok bunga & pemesanan buket.';

      if (btnDenpasar) {
        btnDenpasar.href = buildWaUrl(BRANCHES.denpasar.phone, generalMsgDenpasar);
      }
      if (btnSempidi) {
        btnSempidi.href = buildWaUrl(BRANCHES.sempidi.phone, generalMsgSempidi);
      }
    }

    modal.hidden = false;
    document.body.classList.add('modal-open');
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  };

  /**
   * Close the Branch Selection Modal
   */
  const closeOrderModal = () => {
    const modal = document.getElementById('branch-order-modal');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
  };

  // Expose to global window
  window.openOrderModal = openOrderModal;
  window.closeOrderModal = closeOrderModal;

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Update copyright year
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // 2. Mobile Header Toggle Menu
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        const isHidden = mobileMenu.hidden;
        mobileMenu.hidden = !isHidden;
        menuToggle.setAttribute('aria-expanded', String(isHidden));
        const icon = menuToggle.querySelector('[data-lucide]');
        if (icon) {
          icon.setAttribute('data-lucide', isHidden ? 'x' : 'menu');
          if (window.lucide) window.lucide.createIcons();
        }
      });

      // Close mobile menu when any item inside is clicked
      mobileMenu.querySelectorAll('a, button').forEach(item => {
        item.addEventListener('click', () => {
          mobileMenu.hidden = true;
          menuToggle.setAttribute('aria-expanded', 'false');
          const icon = menuToggle.querySelector('[data-lucide]');
          if (icon) {
            icon.setAttribute('data-lucide', 'menu');
            if (window.lucide) window.lucide.createIcons();
          }
        });
      });
    }

    // 3. Modal event listeners (Backdrop, Close Button, Esc key)
    const modal = document.getElementById('branch-order-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const backdrop = document.getElementById('modal-backdrop');

    if (closeBtn) closeBtn.addEventListener('click', closeOrderModal);
    if (backdrop) backdrop.addEventListener('click', closeOrderModal);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && !modal.hidden) {
        closeOrderModal();
      }
    });

    // 4. Header WA button triggers modal
    const headerWaBtn = document.getElementById('header-wa-btn');
    if (headerWaBtn) {
      headerWaBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openOrderModal(null, 'branch');
      });
    }

    // 5. Bottom Nav Cabang and Kontak Buttons trigger modal
    const bottomBranchesBtn = document.getElementById('bottom-branches');
    if (bottomBranchesBtn) {
      bottomBranchesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openOrderModal(null, 'branch');
      });
    }

    const bottomContactBtn = document.getElementById('bottom-contact');
    if (bottomContactBtn) {
      bottomContactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openOrderModal(null, 'contact');
      });
    }

    // 6. Generic triggers for Cabang & Kontak (desktop nav, mobile menu)
    document.querySelectorAll('[data-trigger="branch"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openOrderModal(null, 'branch');
      });
    });

    document.querySelectorAll('[data-trigger="contact"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openOrderModal(null, 'contact');
      });
    });

    // 7. Global Delegated Click Handler for "Order Sekarang" buttons
    document.addEventListener('click', (e) => {
      const orderBtn = e.target.closest('.order-btn, .btn-order-trigger');
      if (orderBtn) {
        e.preventDefault();
        const product = {
          name: orderBtn.dataset.productName || 'Buket Bunga Kyuflorist',
          price: orderBtn.dataset.productPrice || '',
          image: orderBtn.dataset.productImage || '',
          categoryLabel: orderBtn.dataset.productCategory || 'Buket Pilihan'
        };
        openOrderModal(product, 'order');
      }
    });

    // 8. Smooth scrolling for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // 9. Initialize Lucide Icons
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  });
})();
