const CONTENT_URL = 'assets/data/content.json';
const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]);
const labelize = value => value.replaceAll('-', ' ');
const instagramIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1" class="icon-fill"></circle></svg>';
const linkedinIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9h3v10H5zM6.5 4.5A1.75 1.75 0 1 0 6.5 8a1.75 1.75 0 0 0 0-3.5zM10 9h2.9v1.4h.1c.5-1 1.8-1.8 3.7-1.8 4 0 4.3 2.6 4.3 5.2V19h-3v-4.7c0-1.1 0-2.6-1.7-2.6s-2 1.2-2 2.5V19h-3V9z"></path></svg>';
const socialLinks = site => `<a class="social-icon" href="${site.instagram}" target="_blank" rel="noreferrer" aria-label="Instagram">${instagramIcon}</a><a class="social-icon" href="${site.linkedin}" target="_blank" rel="noreferrer" aria-label="LinkedIn">${linkedinIcon}</a>`;

function renderSidebar({ site, navigation }, page) {
  const nav = navigation.map(item => `${item.separated ? '<div class="nav-divider"></div>' : ''}<a class="${item.page === page ? 'active' : ''}" href="${item.href}">${esc(item.label)}</a>`).join('');
  return `<a href="index.html" class="brand"><span>${esc(site.name)}</span><small>${esc(site.role)}</small></a><nav class="nav" aria-label="Primary navigation">${nav}</nav><div class="sidebar-foot"><div class="socials">${socialLinks(site)}</div><div>${esc(site.copyright)}</div></div>`;
}

function renderMobileMenu({ site, navigation }, page) {
  const nav = navigation.map(item => `<a class="${item.page === page ? 'active' : ''}" href="${item.href}">${esc(item.label)}</a>`).join('');
  return `<header class="mobile-header"><button class="mobile-menu-toggle" type="button" aria-label="Open menu" aria-controls="mobile-menu" aria-expanded="false"><span></span><span></span><span></span></button></header><nav class="mobile-menu" id="mobile-menu" aria-label="Mobile navigation"><div class="mobile-menu-inner"><a href="index.html" class="brand"><span>${esc(site.name)}</span><small>${esc(site.role)}</small></a><div class="mobile-nav">${nav}</div><div class="mobile-menu-foot"><div class="socials">${socialLinks(site)}</div><div>${esc(site.copyright)}</div></div></div></nav>`;
}

function renderHome({ home }) {
  return `<section class="home-stage reveal" aria-label="Selected portfolio work"><img src="${home.image}" alt="${esc(home.alt)}"></section>`;
}

function renderDesign({ design: { title, works } }) {
  const categories = [...new Set(works.map(work => work.category))];
  return `<h1 class="page-title reveal">${esc(title)}</h1><div class="filter-bar reveal"><button class="active" data-filter="all">All</button>${categories.map(category => `<button data-filter="${category}">${esc(labelize(category))}</button>`).join('')}</div><section class="design-grid" aria-live="polite">${works.map((work, index) => `<article class="work-card reveal" data-category="${work.category}" data-index="${index}" tabindex="0" aria-label="Open ${esc(work.title)}"><img src="${work.image}" alt="${esc(work.title)}"><div class="meta"><div class="meta-title">${esc(work.title)}</div><div class="meta-sub">${esc(labelize(work.category))} / ${esc(work.year)}</div></div></article>`).join('')}</section>`;
}

function renderArt({ art: { title, exhibitions } }) {
  const years = [...new Set(exhibitions.map(item => item.year))];
  return `<h1 class="page-title reveal">${esc(title)}</h1><div class="art-list">${years.map(year => `<section class="art-year reveal"><h2>${esc(year)}</h2><div class="exhibitions">${exhibitions.filter(item => item.year === year).map(item => `<article class="exhibition"><div><h3>${esc(item.title)}</h3><div class="place">${esc(item.place)}</div><div class="date">${esc(item.date)}</div></div><div><p>${esc(item.description)}</p><a class="external-link" href="${item.url}">View exhibition ↗</a></div></article>`).join('')}</div></section>`).join('')}</div>`;
}

function renderZine({ zine: { title, items } }) {
  return `<h1 class="page-title reveal">${esc(title)}</h1><section class="zine-list">${items.map(item => `<article class="zine-item reveal"><img class="zine-cover" src="${item.cover}" alt="${esc(item.title)} cover"><div class="zine-copy"><h2>${esc(item.title)}</h2><div class="zine-year">${esc(item.year)}</div><p>${esc(item.description)}</p><div class="zine-preview">${item.previews.map(preview => `<img src="assets/images/zine/${preview}" alt="${esc(item.title)} preview">`).join('')}</div></div></article>`).join('')}</section>`;
}

function renderAbout({ about }) {
  return `<h1 class="page-title reveal">${esc(about.title)}</h1><div class="about-layout"><div><section class="about-section reveal"><h2>Statement</h2><p>${esc(about.statement)}</p></section><section class="about-section reveal"><h2>Bio</h2><div class="bio-grid">${about.bio.map(item => `<span>${esc(item)}</span>`).join('')}</div></section></div><aside class="selected reveal">${about.details.map(detail => `<div><h3>${esc(detail.title)}</h3><ul>${detail.items.map(item => `<li>${esc(item)}</li>`).join('')}</ul></div>`).join('')}</aside></div>`;
}

function renderContact({ contact: { title, intro, links }, site }) {
  return `<section class="contact-layout"><div class="contact-copy reveal"><h1 class="page-title">${esc(title)}</h1><p>${esc(intro)}</p><a class="contact-email" href="mailto:${site.email}">${esc(site.email)}</a><div class="contact-links">${links.map(link => `<a href="${link.url}" target="_blank" rel="noreferrer">${esc(link.label)} ↗</a>`).join('')}</div></div></section>`;
}

function setupReveal() {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}

let activeLightboxItems = [];
let activeLightboxIndex = 0;

function renderLightboxItem() {
  const box = document.querySelector('.lightbox');
  const item = activeLightboxItems[activeLightboxIndex];
  if (!box || !item) return;
  box.querySelector('img').src = item.image;
  box.querySelector('img').alt = item.title;
  box.querySelector('[data-light-title]').textContent = item.title;
  box.querySelector('[data-light-meta]').textContent = item.category ? `${labelize(item.category)} / ${item.year}` : `${item.place} / ${item.date}`;
  box.querySelector('[data-light-desc]').textContent = item.description;
  box.querySelector('[data-light-count]').textContent = `${activeLightboxIndex + 1}/${activeLightboxItems.length}`;
  box.querySelector('[data-light-prev]').disabled = activeLightboxIndex === 0;
  box.querySelector('[data-light-next]').disabled = activeLightboxIndex === activeLightboxItems.length - 1;
}

function openLightbox(items, index) {
  const box = document.querySelector('.lightbox');
  if (!box) return;
  activeLightboxItems = items.filter(item => item.image);
  activeLightboxIndex = activeLightboxItems.indexOf(items[index]);
  renderLightboxItem();
  box.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function setupDesignInteractions(content) {
  const grid = document.querySelector('.design-grid');
  if (!grid) return;
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('active', item === button));
    grid.querySelectorAll('.work-card').forEach(card => card.classList.toggle('is-hidden', button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter));
  }));
  grid.querySelectorAll('.work-card').forEach(card => {
    const open = () => openLightbox(content.design.works, Number(card.dataset.index));
    card.addEventListener('click', open);
    card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') open(); });
  });
}

function setupLightbox() {
  const box = document.querySelector('.lightbox');
  if (!box) return;
  const close = () => { box.classList.remove('open'); document.body.style.overflow = ''; };
  box.querySelector('.lightbox-close').addEventListener('click', close);
  box.querySelector('[data-light-prev]').addEventListener('click', () => { if (activeLightboxIndex > 0) { activeLightboxIndex -= 1; renderLightboxItem(); } });
  box.querySelector('[data-light-next]').addEventListener('click', () => { if (activeLightboxIndex < activeLightboxItems.length - 1) { activeLightboxIndex += 1; renderLightboxItem(); } });
  box.addEventListener('click', event => { if (event.target === box) close(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') close();
    if (box.classList.contains('open') && event.key === 'ArrowLeft' && activeLightboxIndex > 0) { activeLightboxIndex -= 1; renderLightboxItem(); }
    if (box.classList.contains('open') && event.key === 'ArrowRight' && activeLightboxIndex < activeLightboxItems.length - 1) { activeLightboxIndex += 1; renderLightboxItem(); }
  });
}

function setupMobileMenu() {
  const button = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (!button || !menu) return;
  const close = () => {
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open menu');
    menu.classList.remove('open');
    document.body.classList.remove('mobile-menu-open');
  };
  button.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
    button.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('mobile-menu-open', isOpen);
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
}

async function initialiseSite() {
  try {
    const response = await fetch(CONTENT_URL);
    if (!response.ok) throw new Error(`Unable to load content (${response.status})`);
    const content = await response.json();
    const page = document.body.dataset.page;
    document.querySelector('[data-site-sidebar]').innerHTML = renderSidebar(content, page);
    document.body.insertAdjacentHTML('afterbegin', renderMobileMenu(content, page));
    const renderers = { home: renderHome, design: renderDesign, art: renderArt, zine: renderZine, about: renderAbout, contact: renderContact };
    document.querySelector('[data-page-content]').innerHTML = renderers[page](content);
    document.title = `${content.site.name} — ${page === 'home' ? 'Home' : page[0].toUpperCase() + page.slice(1)}`;
    setupDesignInteractions(content);
    setupLightbox();
    setupMobileMenu();
    requestAnimationFrame(setupReveal);
  } catch (error) {
    const isLocalFile = window.location.protocol === 'file:';
    document.querySelector('[data-page-content]').innerHTML = `<p class="load-error">${isLocalFile ? 'Open start-preview.bat to preview this JSON-powered site.' : 'Content could not be loaded. Please check assets/data/content.json.'}</p>`;
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', initialiseSite);
