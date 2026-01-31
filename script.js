/*
Dokumentasi JavaScript untuk Kyuflorist

Fungsionalitas:
1.  **Inisialisasi**: 
    - Mengaktifkan ikon Lucide.
    - Mengatur tahun saat ini di footer.
    - Memuat produk ke dalam katalog.

2.  **Data Produk**: 
    - `products`: Array yang berisi objek-objek produk. Setiap objek memiliki id, nama, deskripsi, harga, dan path gambar.

3.  **Render Produk**: 
    - `loadProducts()`: Mengambil data dari array `products`, membuat kartu HTML untuk setiap produk, dan memasukkannya ke dalam `product-grid`. Juga menambahkan event listener ke setiap tombol "Beli Sekarang" dan gambar produk.

4.  **Tombol Beli Sekarang**: 
    - `handleBuyNowClick()`: Saat tombol di-klik, fungsi ini mengambil nama produk dari atribut data, membuat pesan WhatsApp, dan mengarahkan pengguna ke URL WhatsApp.

5.  **Modal Produk**: 
    - `openProductModal()`: Menampilkan modal dengan detail produk yang di-klik.
    - `closeProductModal()`: Menutup modal produk. Menambahkan event listener untuk keyboard (tombol Escape).

6.  **Menu Mobile**: 
    - `toggleMobileMenu()`: Menampilkan atau menyembunyikan menu navigasi mobile.

7.  **Efek Scroll Header**:
    - `handleScroll()`: Menambahkan class `scrolled` pada header saat halaman di-scroll.

8.  **Event Listeners**: 
    - Listener untuk tombol menu mobile, scroll, tombol "Beli Sekarang", gambar produk, dan penutup modal (klik overlay, tombol close, dan tombol Escape).
*/

document.addEventListener('DOMContentLoaded', () => {
    // Initialize icons
    lucide.createIcons();

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- PRODUCT DATA ---
    const products = [
        { id: 1, name: "Cara Pemesanan", description: "Cara Pesan di KyuFlorist", price: "Silahkan di Baca", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-0.jpg" },

        { id: 2, name: "Katalog Bouqet 50.000", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-1.jpg" },

        { id: 3, name: "Katalog Bouqet 100.000", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-2.jpg" },

        { id: 4, name: "Katalog Bouqet 100.000", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-3.jpg" },

        { id: 5, name: "Katalog Bouqet 150.000", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-4.jpg" },

        { id: 6, name: "Katalog Bouqet 150.000", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-5.jpg" },

        { id: 7, name: "Bouqet Boneka", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-6.jpg" },

        { id: 8, name: "Katalog Bouqet 200.000", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-7.jpg" },

        { id: 9, name: "Katalog Bouqet 200.000", description: "Free Kartu Ucapan", price: "untuk harga chat admin", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-8.jpg" },

        { id: 10, name: "Bouqet 300.000", description: "Free Kartu Ucapan. Bebas request warna bunga dan wrapping", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-9.jpg" },

        { id: 11, name: "Bouqet 350.000", description: "Free Kartu Ucapan. Bebas request warna bunga dan wrapping", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-10.jpg" },

        { id: 12, name: "Human size", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-11.jpg" },

        { id: 13, name: "sunflower", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-12.jpg" },

        { id: 14, name: "Korean bouqet", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-13.jpg" },

        { id: 15, name: "colorful", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-14.jpg" },

        { id: 16, name: "colorful", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-15.jpg" },

        { id: 17, name: "Butterfly bouqet", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-16.jpg" },

        { id: 18, name: "Bouqet lily", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-17.jpg" },

        { id: 19, name: "Keranjang bouqet", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-18.jpg" },

        { id: 20, name: "Keranjang bouqet", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-19.jpg" },

        { id: 21, name: "Keranjang bouqet", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-20.jpg" },

        { id: 22, name: "Keranjang bouqet", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-21.jpg" },

        { id: 23, name: "Keranjang balon", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-22.jpg" },

        { id: 24, name: "Keranjang bouqet", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-23.jpg" },

        { id: 25, name: "Keranjang bouqet", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-24.jpg" },

        { id: 26, name: "Bloom box ", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-25.jpg" },

        { id: 27, name: "Bloom box", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-26.jpg" },

        { id: 28, name: "round bouquet", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-27.jpg" },

        { id: 29, name: "Round bouqet", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-28.jpg" },

        { id: 30, name: "Round chocolate", description: "sudah include coklat, untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-29.jpg" },

        { id: 31, name: "Human size round", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-30.jpg" },

        { id: 32, name: "Human size round", description: "untuk harga chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-31.jpg" },

        { id: 33, name: "Price list-money bouqet", description: "harga belum termasuk tambahan bunga", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-32.jpg" },

        { id: 34, name: "Money bouqet", description: "Tanya Admin, untuk bentuk dan harga", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-33.jpg" },

        { id: 35, name: "Money bouqet", description: "Tanya Admin, untuk bentuk dan harga", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-34.jpg" },

        { id: 36, name: "Money bouqet", description: "Tanya Admin, untuk bentuk dan harga", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-35.jpg" },

        { id: 37, name: "Money bouqet", description: "Tanya Admin, untuk bentuk dan harga", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-36.jpg" },

        { id: 38, name: "Gift", description: "Chat Admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-37.jpg" },

        { id: 39, name: "Papan bunga", description: "start harga 250.000-600.000--Free Design", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-38.jpg" },

        { id: 40, name: "Sewa standing foto", description: "chat admin", price: "", image: "foto-produk/68bff876-e204-4130-b235-073fa09ea63d-39.jpg", category: "regular" },

        // Valentine Products
        { id: 41, name: "Valentine Day", description: "", price: "Chat admin untuk harga", image: "foto-produk/FT-01.jpeg", category: "valentine" },
        { id: 42, name: "Add On", description: "", price: "Chat admin untuk harga", image: "foto-produk/FT-02.jpeg", category: "valentine" },
        { id: 43, name: "Small Bouquet", description: "Bunga Valentine eksklusif dengan desain cantik", price: "Chat admin untuk harga", image: "foto-produk/FT-03.jpeg", category: "valentine" },
        { id: 44, name: "Informasi", description: "", price: "Chat admin untuk harga", image: "foto-produk/FT-04.jpeg", category: "valentine" },
        { id: 45, name: "Korean Buket", description: "Bouquet Valentine dengan warna-warna cinta", price: "Chat admin untuk harga", image: "foto-produk/FT-05.jpeg", category: "valentine" },
        { id: 46, name: "Thumbelina buket", description: "Rangkaian bunga premium Valentine Day", price: "Chat admin untuk harga", image: "foto-produk/FT-06.jpeg", category: "valentine" },
        { id: 47, name: "Butterfly Buket", description: "Bunga segar spesial untuk Valentine", price: "Chat admin untuk harga", image: "foto-produk/FT-07.jpeg", category: "valentine" },
        { id: 48, name: "Medium Bouqet", description: "Ungkapkan cinta dengan bunga Valentine ini", price: "Chat admin untuk harga", image: "foto-produk/FT-08.jpeg", category: "valentine" },
        { id: 49, name: "Round Buket 50 Tangkai", description: "Bouquet romantis untuk momen istimewa", price: "Chat admin untuk harga", image: "foto-produk/FT-09.jpeg", category: "valentine" },
        { id: 50, name: "Round Bouqet Human Size", description: "Koleksi Valentine dengan desain elegan", price: "Chat admin untuk harga", image: "foto-produk/FT-10.jpeg", category: "valentine" },
        { id: 51, name: "Round Buket 30 Tangkai", description: "Bunga Valentine pilihan terbaik", price: "Chat admin untuk harga", image: "foto-produk/FT-11.jpeg", category: "valentine" },
        { id: 52, name: "Lily Bouqet", description: "Hadiah Valentine penuh makna", price: "Chat admin untuk harga", image: "foto-produk/FT-12.jpeg", category: "valentine" },
        { id: 53, name: "Human Size Bouqet", description: "Rangkaian bunga Valentine eksklusif", price: "Chat admin untuk harga", image: "foto-produk/FT-13.jpeg", category: "valentine" },
        { id: 54, name: "Spesial Edition", description: "Bouquet Valentine dengan sentuhan special", price: "Chat admin untuk harga", image: "foto-produk/FT-14.jpeg", category: "valentine" },
        { id: 55, name: "Round Bouqet Human Size", description: "Bunga Valentine untuk kenangan indah", price: "Chat admin untuk harga", image: "foto-produk/FT-15.jpeg", category: "valentine" },
        { id: 56, name: "Special Edition", description: "Koleksi Valentine premium terbaik", price: "Chat admin untuk harga", image: "foto-produk/FT-16.jpeg", category: "valentine" },
        { id: 57, name: "Spesial Edition", description: "Bouquet Valentine pilihan istimewa", price: "Chat admin untuk harga", image: "foto-produk/FT-17.jpeg", category: "valentine" }

    ];

    // --- DOM ELEMENTS ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const productGrid = document.getElementById('product-grid');
    const productModal = document.getElementById('product-modal');
    const closeModal = document.getElementById('close-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
    const modalBuyNow = document.getElementById('modal-buy-now');

    // --- FUNCTIONS ---

    // Load products into the grid
    function loadProducts() {
        try {
            if (!productGrid) return;
            let html = '';
            products.forEach(product => {
                html += `
                    <div class="product-card bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-2" data-id="${product.id}">
                        <div class="h-56 bg-gray-100 flex items-center justify-center p-4 cursor-pointer product-image-container">
                            <img src="${product.image}" alt="${product.name}" class="h-full w-full object-cover">
                        </div>
                        <div class="p-5">
                            <h3 class="font-bold text-lg mb-2 truncate">${product.name}</h3>
                            <p class="text-gray-600 text-sm mb-3 h-10 overflow-hidden">untuk harga chat admin</p>
                            
                            <button class="buy-now-btn w-full btn-primary py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2" data-name="${product.name}">
                                <i data-lucide="shopping-cart" class="w-4 h-4"></i>
                                Chat Admin 
                            </button>
                        </div>
                    </div>
                `;
            });
            productGrid.innerHTML = html;
            lucide.createIcons();
        } catch (error) {
            console.error("Gagal memuat produk:", error);
            return;
        }

        // Add event listeners
        document.querySelectorAll('.buy-now-btn').forEach(btn => {
            btn.addEventListener('click', handleBuyNowClick);
        });
        document.querySelectorAll('.product-image-container').forEach(container => {
            container.addEventListener('click', openProductModal);
        });
    }

    // Handle buy now button click
    function handleBuyNowClick(e) {
        e.stopPropagation(); // Prevent modal from opening
        const productName = e.currentTarget.dataset.name;
        const message = `Halo Kyuflorist, saya tertarik untuk memesan produk: ${productName}`;
        const whatsappUrl = `https://wa.me/6285847499015?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    // Open product modal
    function openProductModal(e) {
        const card = e.currentTarget.closest('.product-card');
        const productId = card.dataset.id;
        const product = products.find(p => p.id == productId);

        if (product) {
            modalImage.src = product.image;
            modalTitle.textContent = product.name;
            modalDescription.textContent = product.description;
            modalPrice.textContent = product.price;

            const message = `Halo Kyuflorist, saya tertarik untuk memesan produk: ${product.name}`;
            const whatsappUrl = `https://wa.me/6285847499015?text=${encodeURIComponent(message)}`;
            modalBuyNow.href = whatsappUrl;

            productModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close product modal
    function closeProductModal() {
        productModal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // Toggle mobile menu
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('max-h-0');
        mobileMenu.classList.toggle('max-h-[500px]');
        mobileMenu.classList.toggle('py-4');

        const menuIcon = mobileMenuButton.querySelector('i');
        if (mobileMenu.classList.contains('max-h-[500px]')) {
            menuIcon.setAttribute('data-lucide', 'x');
        } else {
            menuIcon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    }

    // Header scroll effect
    function handleScroll() {
        const header = document.getElementById('main-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // --- EVENT LISTENERS ---
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }
    window.addEventListener('scroll', handleScroll);

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            closeProductModal();
        });
    }
    if (productModal) {
        productModal.addEventListener('click', (e) => {
            if (e.target === productModal) {
                closeProductModal();
            }
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && productModal && !productModal.classList.contains('hidden')) {
            closeProductModal();
        }
    });

    // Close mobile menu when clicking on links
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu.classList.contains('max-h-[500px]')) {
                    mobileMenu.classList.add('max-h-0');
                    mobileMenu.classList.remove('max-h-[500px]', 'py-4');
                    const menuIcon = mobileMenuButton.querySelector('i');
                    menuIcon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }

    // --- INITIALIZATION ---
    loadProducts();
    handleScroll(); // Initialize header state

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // --- CATEGORY FILTERING ---
    let currentCategory = 'all';
    let valentineInfoShown = false;

    // Valentine modal elements
    const valentineInfoModal = document.getElementById('valentine-info-modal');
    const closeValentineModal = document.getElementById('close-valentine-modal');
    const understoodValentineBtn = document.getElementById('understood-valentine');

    // Load products with filter
    function loadProductsByCategory(category) {
        try {
            if (!productGrid) return;
            let filteredProducts = products;

            if (category === 'valentine') {
                filteredProducts = products.filter(p => p.category === 'valentine');
            } else if (category === 'regular') {
                filteredProducts = products.filter(p => !p.category || p.category === 'regular');
            }

            let html = '';
            filteredProducts.forEach(product => {
                html += `
                    <div class="product-card bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-2" data-id="${product.id}">
                        <div class="h-56 bg-gray-100 flex items-center justify-center p-4 cursor-pointer product-image-container">
                            <img src="${product.image}" alt="${product.name}" class="h-full w-full object-cover">
                        </div>
                        <div class="p-5">
                            <h3 class="font-bold text-lg mb-2 truncate">${product.name}</h3>
                            <p class="text-gray-600 text-sm mb-3 h-10 overflow-hidden">untuk harga chat admin</p>
                            
                            <button class="buy-now-btn w-full btn-primary py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2" data-name="${product.name}">
                                <i data-lucide="shopping-cart" class="w-4 h-4"></i>
                                Chat Admin 
                            </button>
                        </div>
                    </div>
                `;
            });
            productGrid.innerHTML = html;
            lucide.createIcons();

            // Re-add event listeners
            document.querySelectorAll('.buy-now-btn').forEach(btn => {
                btn.addEventListener('click', handleBuyNowClick);
            });
            document.querySelectorAll('.product-image-container').forEach(container => {
                container.addEventListener('click', openProductModal);
            });
        } catch (error) {
            console.error("Gagal memuat produk:", error);
        }
    }

    // Handle category button clicks
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const category = this.dataset.category;

            // If Valentine category is clicked and info hasn't been shown
            if (category === 'valentine' && !valentineInfoShown) {
                showValentineInfo();
                return;
            }

            // Update active state
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter products
            currentCategory = category;
            loadProductsByCategory(category);
        });
    });

    // Show Valentine information modal
    function showValentineInfo() {
        valentineInfoModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            valentineInfoModal.querySelector('.modal-content').classList.remove('scale-95');
            valentineInfoModal.querySelector('.modal-content').classList.add('scale-100');
        }, 10);
    }

    // Close Valentine information modal
    function closeValentineInfo() {
        valentineInfoModal.querySelector('.modal-content').classList.remove('scale-100');
        valentineInfoModal.querySelector('.modal-content').classList.add('scale-95');
        setTimeout(() => {
            valentineInfoModal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }

    // Valentine modal event listeners
    if (closeValentineModal) {
        closeValentineModal.addEventListener('click', closeValentineInfo);
    }

    if (understoodValentineBtn) {
        understoodValentineBtn.addEventListener('click', () => {
            valentineInfoShown = true;
            closeValentineInfo();

            // Switch to Valentine category
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('.valentine-category').classList.add('active');
            currentCategory = 'valentine';
            loadProductsByCategory('valentine');
        });
    }

    // Close Valentine modal on overlay click
    if (valentineInfoModal) {
        valentineInfoModal.addEventListener('click', (e) => {
            if (e.target === valentineInfoModal) {
                closeValentineInfo();
            }
        });
    }

    // Close Valentine modal on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && valentineInfoModal && !valentineInfoModal.classList.contains('hidden')) {
            closeValentineInfo();
        }
    });
});
