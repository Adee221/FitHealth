/* =============================================
   FitHealth - Main JavaScript
   Fitur:
   1. Navbar sticky & efek scroll
   2. Hamburger menu (mobile)
   3. Active link sesuai halaman aktif
   4. Animasi card muncul saat scroll
   5. Form contact dengan notifikasi toast
   ============================================= */

// --- 1. NAVBAR: Efek bayangan saat halaman di-scroll ---
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// --- 2. HAMBURGER MENU (Mobile) ---
const hamburger = document.querySelector('.hamburger');
const navbarMenu = document.querySelector('.navbar-menu');

if (hamburger && navbarMenu) {
  hamburger.addEventListener('click', () => {
    // Toggle class 'open' untuk membuka/menutup menu
    hamburger.classList.toggle('open');
    navbarMenu.classList.toggle('open');
  });

  // Tutup menu saat salah satu link diklik (mobile)
  navbarMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navbarMenu.classList.remove('open');
    });
  });
}


// --- 3. ACTIVE LINK: Menandai menu yang sesuai halaman aktif ---
function setActiveLink() {
  // Ambil nama file halaman saat ini (misal: "about.html")
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Loop semua link di navbar
  document.querySelectorAll('.navbar-menu a').forEach(link => {
    const linkPage = link.getAttribute('href');

    // Beri class 'active' jika link sesuai halaman saat ini
    if (
      linkPage === currentPage ||
      (currentPage === '' && linkPage === 'index.html')
    ) {
      link.classList.add('active');
    }
  });
}

// Panggil fungsi saat halaman dimuat
setActiveLink();


// --- 4. SCROLL ANIMATION: Animasi card/elemen muncul saat di-scroll ---
function initScrollAnimation() {
  // Pilih semua elemen dengan class 'card' atau 'tip-card'
  const animatedElements = document.querySelectorAll('.card, .tip-card');

  // Buat IntersectionObserver untuk memantau visibilitas elemen
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Tambahkan delay kecil berdasarkan urutan elemen (efek stagger)
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);

        // Berhenti memantau elemen yang sudah muncul
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // Mulai animasi saat 15% elemen terlihat
    rootMargin: '0px 0px -40px 0px'
  });

  // Daftarkan setiap elemen ke observer
  animatedElements.forEach(el => observer.observe(el));
}

// Panggil fungsi animasi setelah DOM siap
document.addEventListener('DOMContentLoaded', initScrollAnimation);


// --- 5. FORM CONTACT: Notifikasi toast saat form dikirim ---
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Cegah form reload halaman

    // Ambil nilai input
    const name  = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const pesan = document.getElementById('pesan').value.trim();

    // Validasi sederhana: pastikan semua field terisi
    if (!name || !email || !pesan) {
      showToast('⚠️ Harap isi semua field!', 'warning');
      return;
    }

    // Validasi format email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('⚠️ Format email tidak valid!', 'warning');
      return;
    }

    // Simulasi pengiriman (karena tidak ada backend)
    // Kosongkan form setelah "berhasil"
    contactForm.reset();

    // Tampilkan notifikasi sukses
    showToast('✅ Pesan berhasil dikirim! Terima kasih, ' + name + '.');
  });
}


// --- Fungsi: Tampilkan notifikasi toast ---
function showToast(message, type = 'success') {
  // Hapus toast lama jika masih ada
  const existingToast = document.querySelector('.alert-toast');
  if (existingToast) existingToast.remove();

  // Buat elemen toast baru
  const toast = document.createElement('div');
  toast.className = 'alert-toast';
  toast.textContent = message;

  // Warna berbeda untuk warning
  if (type === 'warning') {
    toast.style.background = '#e67e22';
  }

  // Tambahkan ke body
  document.body.appendChild(toast);

  // Otomatis hilangkan toast setelah 4 detik
  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}


// --- 6. SMOOTH SCROLL untuk tombol anchor (opsional) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
