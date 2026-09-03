import './style.css';

// Product registry - add your new products here!
export const PRODUCTS_DATA = {
  edunex: {
    title: "EduNex",
    category: "Android Mobile App",
    badgeIcon: "🎓",
    badgeBg: "bg-indigo",
    description: "The next-generation mobile education platform. Stream bite-sized interactive courses, take adaptive quizzes with instant explanations, and study fully offline anywhere.",
    version: "1.0.0 (Release)",
    size: "43.8 MB (45,920,860 bytes)",
    platform: "Android 7.0+ (API 24+)",
    format: "Direct APK Package",
    license: "Free / Open Source",
    actionBtn: `<a href="EduNex.apk" download="EduNex.apk" class="btn-main" style="width:100%; justify-content:center;" onclick="triggerToast('EduNex.apk')">Download EduNex.apk (43.8 MB)</a>`
  }
};

let currentCategory = 'All';

export function setCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  filterProducts();
}

export function filterProducts() {
  const searchInput = document.getElementById('searchInput');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {
    const cat = card.getAttribute('data-category');
    const title = (card.getAttribute('data-title') || '').toLowerCase();
    const text = card.innerText.toLowerCase();

    const matchesCat = (currentCategory === 'All') || (cat === currentCategory);
    const matchesQuery = !query || title.includes(query) || text.includes(query);

    card.style.display = (matchesCat && matchesQuery) ? 'flex' : 'none';
  });
}

export function showProductDetails(id) {
  const data = PRODUCTS_DATA[id];
  if (!data) return;

  const content = `
    <div class="modal-icon ${data.badgeBg}">${data.badgeIcon}</div>
    <span class="product-category-tag">${data.category}</span>
    <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 8px;">${data.title}</h2>
    <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">${data.description}</p>

    <table class="modal-specs-table">
      <tr><td>Version</td><td>${data.version}</td></tr>
      <tr><td>Size / Format</td><td>${data.size}</td></tr>
      <tr><td>Platform</td><td>${data.platform}</td></tr>
      <tr><td>Distribution</td><td>${data.format}</td></tr>
      <tr><td>License</td><td>${data.license}</td></tr>
    </table>

    ${data.actionBtn}
  `;

  const modalContent = document.getElementById('modalContent');
  const productModal = document.getElementById('productModal');
  if (modalContent) modalContent.innerHTML = content;
  if (productModal) productModal.classList.add('active');
}

export function closeModal() {
  const modal = document.getElementById('productModal');
  if (modal) modal.classList.remove('active');
}

export function openQRModal() {
  const apkUrl = new URL('EduNex.apk', window.location.href).href;
  const qrApi = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=10&data=' + encodeURIComponent(apkUrl);
  const qrImg = document.getElementById('qrImg');
  const modal = document.getElementById('qrModal');
  if (qrImg) qrImg.src = qrApi;
  if (modal) modal.classList.add('active');
}

export function closeQRModal() {
  const modal = document.getElementById('qrModal');
  if (modal) modal.classList.remove('active');
}

export function triggerToast(fileName = 'EduNex.apk') {
  const toast = document.getElementById('downloadToast');
  const title = document.getElementById('toastTitle');
  const desc = document.getElementById('toastDesc');
  if (title) title.innerText = 'Download Initiated!';
  if (desc) desc.innerText = `${fileName} is downloading to your device.`;
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
}

export function toggleTheme() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const toggleBtn = document.getElementById('themeToggle');
  if (isLight) {
    document.documentElement.removeAttribute('data-theme');
    if (toggleBtn) toggleBtn.innerText = '🌙';
    localStorage.setItem('geekyones-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    if (toggleBtn) toggleBtn.innerText = '☀️';
    localStorage.setItem('geekyones-theme', 'light');
  }
}

// Bind to window for HTML onclick handler access
window.setCategory = setCategory;
window.filterProducts = filterProducts;
window.showProductDetails = showProductDetails;
window.closeModal = closeModal;
window.openQRModal = openQRModal;
window.closeQRModal = closeQRModal;
window.triggerToast = triggerToast;
window.toggleTheme = toggleTheme;

// Initialize theme from storage
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('geekyones-theme') === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) toggleBtn.innerText = '☀️';
  }
});
