window.addEventListener('scroll', () => {
  document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 20);
});

const hamburger = document.querySelector('.hamburger');
const navMenu   = document.querySelector('.navbar-menu');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

navMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

const currentPage = location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.navbar-menu a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

document.getElementById('contactForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const name  = this.name.value.trim();
  const email = this.email.value.trim();
  const pesan = this.pesan.value.trim();

  if (!name || !email || !pesan) {
    return showToast('⚠ Harap isi semua field!', 'warn');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return showToast('⚠ Format email tidak valid!', 'warn');
  }

  this.reset();
  showToast('✓ Pesan berhasil dikirim! Terima kasih, ' + name + '.');
});

function showToast(msg, type) {
  document.querySelector('.alert-toast')?.remove();

  const toast = document.createElement('div');
  toast.className   = 'alert-toast';
  toast.textContent = msg;

  if (type === 'warn') toast.style.background = '#e67e22';

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

(function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (!dot || !ring) return;

  let rx = -100;
  let ry = -100;

  // Dot follows mouse instantly; ring follows with ler
  document.addEventListener('mousemove', e => {
    dot.style.left  = e.clientX + 'px';
    dot.style.top   = e.clientY + 'px';
    rx += (e.clientX - rx) * 0.15;
    ry += (e.clientY - ry) * 0.15;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
  });

  (function loop() {
    requestAnimationFrame(loop);
  })();

  const interactiveSelector = 'a, button, input, textarea, select, [data-hover], .social-link, .hamburger';

  document.querySelectorAll(interactiveSelector).forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('cur-hover');
      ring.classList.add('cur-hover');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('cur-hover');
      ring.classList.remove('cur-hover');
    });
  });

  document.addEventListener('mousedown', () => {
    dot.classList.add('cur-click');
    ring.classList.add('cur-click');
  });

  document.addEventListener('mouseup', () => {
    dot.classList.remove('cur-click');
    ring.classList.remove('cur-click');
  });
})();