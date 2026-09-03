import './style.css';

const icon = (name) => {
	const paths = {
		arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
		download: '<path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/>',
		search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
		grid: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
		shield: '<path d="M12 3 20 6v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-3Z"/><path d="m9 12 2 2 4-4"/>',
		sparkle: '<path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Zm6 12 .7 2.3L21 18l-2.3.7L18 21l-.7-2.3L15 18l2.3-.7L18 15Z"/>',
	};
	return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
};

const products = [
	{ id: 'edunex', category: 'Education', title: 'EduNex', description: 'Make every study session count.', version: 'v1.0.0', size: '42 MB', className: 'product-art--blue', featured: true },
	{ id: 'focus', category: 'Productivity', title: 'Focusflow', description: 'A calmer way to get things done.', version: 'Coming soon', size: 'Web app', className: 'product-art--orange' },
	{ id: 'byte', category: 'Developer tools', title: 'Byteboard', description: 'Tiny tools for big technical ideas.', version: 'Coming soon', size: 'Web app', className: 'product-art--green' },
];

const productCard = (product) => `<article class="product-card ${product.featured ? 'product-card--featured' : ''}" data-category="${product.category}">
	<div class="product-art ${product.className}"><span>${product.id === 'edunex' ? 'EN' : product.id === 'focus' ? 'FF' : 'BB'}</span><i>${icon('sparkle')}</i></div>
	<div class="product-info"><div class="product-category">${product.category}</div><h3>${product.title}</h3><p>${product.description}</p><div class="product-meta"><span>${product.version}</span><span>${product.size}</span></div></div>
	${product.featured ? `<a class="download-link" href="/EduNex.apk" download="EduNex.apk" aria-label="Download EduNex APK">${icon('download')}</a>` : '<span class="soon-label">Soon</span>'}
</article>`;

document.querySelector('#app').innerHTML = `<header class="site-header"><a class="brand" href="#top" aria-label="Geekyones home"><span class="brand-mark">g<span>o</span></span><span>geekyones</span></a><nav><a href="#products">Products</a><a href="#about">About</a><a href="#support">Support</a></nav><button class="menu-button" aria-label="Open menu">${icon('grid')}</button></header>
<main id="top"><section class="hero"><div class="eyebrow">${icon('sparkle')} A small studio with big ideas</div><h1>Tools that make<br><em>good things</em> easier.</h1><p>Thoughtful digital products for learning, making, and finding a little more flow in your day.</p><a class="hero-action" href="#products">Explore the store ${icon('arrow')}</a><div class="hero-stamp">EST. 2024<br><b>GEEKYONES</b></div></section>
<section class="store-section" id="products"><div class="section-heading"><div><span class="kicker">The collection</span><h2>Pick your next<br><em>favorite tool.</em></h2></div><div class="filter-wrap"><button class="filter-button is-active" data-filter="All">All</button><button class="filter-button" data-filter="Education">Education</button><button class="filter-button" data-filter="Productivity">Productivity</button></div></div><div class="product-grid">${products.map(productCard).join('')}</div></section>
<section class="feature-band" id="about"><div class="feature-copy"><span class="kicker">Our little promise</span><h2>Useful by design.<br><em>Human at heart.</em></h2></div><div class="feature-points"><div>${icon('sparkle')}<h3>Made with care</h3><p>No feature bloat. Just focused tools that respect your time.</p></div><div>${icon('shield')}<h3>Your data, yours</h3><p>Privacy-minded products with clear, honest downloads.</p></div></div></section>
<section class="download-note" id="support"><span class="note-icon">${icon('download')}</span><div><strong>Ready to start learning?</strong><p>EduNex is available as a direct Android download.</p></div><a href="/EduNex.apk" download="EduNex.apk">Get EduNex ${icon('arrow')}</a></section></main><footer><span>© 2024 geekyones</span><span>Made for the curious.</span><span>hello@geekyones.com</span></footer>`;

document.querySelectorAll('.filter-button').forEach((button) => button.addEventListener('click', () => {
	document.querySelectorAll('.filter-button').forEach((item) => item.classList.remove('is-active'));
	button.classList.add('is-active');
	document.querySelectorAll('.product-card').forEach((card) => { card.hidden = button.dataset.filter !== 'All' && card.dataset.category !== button.dataset.filter; });
}));
