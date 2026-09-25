from pathlib import Path

root = Path(__file__).resolve().parent
html = (root / 'index.html').read_text(encoding='utf-8')
checks = {
    'canonical': 'rel="canonical" href="https://kyuflorist.netlify.app/"' in html,
    'h1': 'Toko Bunga Bali - Buket Bunga Segar Denpasar &amp; Tabanan | Kyuflorist' in html,
    'area text': 'Area Pengiriman Bali' in html,
    'schema': 'FloristShop' in html,
    'robots': (root / 'robots.txt').exists(),
    'sitemap': (root / 'sitemap.xml').exists(),
    'redirects': (root / '_redirects').exists(),
}
print('SEO_CHECKS')
for key, value in checks.items():
    print(f'{key}={value}')
assert all(checks.values()), checks
