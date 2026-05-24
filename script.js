// Navbar scroll shadow
window.addEventListener('scroll', () => {
  document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 20);
});

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.navbar-menu');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});
navMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('open');
  navMenu.classList.remove('open');
}));

// Active nav link
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar-menu a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

// Contact form
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name  = this.name.value.trim();
  const email = this.email.value.trim();
  const pesan = this.pesan.value.trim();
  if (!name || !email || !pesan) return toast('⚠ Harap isi semua field!', 'warn');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast('⚠ Format email tidak valid!', 'warn');
  this.reset();
  toast('✓ Pesan berhasil dikirim! Terima kasih, ' + name + '.');
});

function toast(msg, type) {
  document.querySelector('.alert-toast')?.remove();
  const t = Object.assign(document.createElement('div'), { className: 'alert-toast', textContent: msg });
  if (type === 'warn') t.style.background = '#e67e22';
  document.body.appendChild(t);
  setTimeout(() => { t.classList.add('hide'); setTimeout(() => t.remove(), 400); }, 4000);
}