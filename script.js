// script.js
// Penjelasan singkat: meng-handle toggle tema, slider sederhana, dan validasi form contact.
// Semua komentar dalam bahasa Indonesia sesuai preferensi.

document.addEventListener('DOMContentLoaded', function() {
  // Set tahun di footer otomatis
  const y = new Date().getFullYear();
  document.getElementById('year')?.textContent = y;
  document.getElementById('year2')?.textContent = y;
  document.getElementById('year3')?.textContent = y;

  // Theme toggle (disimpan di localStorage)
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const saved = localStorage.getItem('theme') || 'light';
    if (saved === 'dark') document.body.classList.add('dark');

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  // Simple project slider
  let currentIndex = 0;
  const slides = Array.from(document.querySelectorAll('.project-slider .slide'));
  const total = slides.length;

  function showSlide(idx) {
    slides.forEach(s => s.classList.add('d-none'));
    const s = slides[idx % total];
    s.classList.remove('d-none');

    // update dots style if present
    for (let i = 0; i < total; i++) {
      const dot = document.getElementById('dot' + i);
      if (dot) {
        if (i === idx) {
          dot.classList.remove('btn-outline-secondary');
          dot.classList.add('btn-secondary');
        } else {
          dot.classList.add('btn-outline-secondary');
          dot.classList.remove('btn-secondary');
        }
      }
    }
  }

  // init
  if (slides.length) showSlide(currentIndex);

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  prevBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + total) % total;
    showSlide(currentIndex);
  });

  nextBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % total;
    showSlide(currentIndex);
  });

  // dot buttons
  for (let i = 0; i < total; i++) {
    const dot = document.getElementById('dot' + i);
    if (dot) {
      dot.addEventListener('click', () => {
        currentIndex = i;
        showSlide(currentIndex);
      });
    }
  }

  // Optional: auto-rotate setiap 6 detik (bisa dikomentari jika tidak diinginkan)
  let auto = setInterval(() => {
    currentIndex = (currentIndex + 1) % total;
    showSlide(currentIndex);
  }, 6000);

  // berhenti auto ketika user mengklik prev/next
  [prevBtn, nextBtn].forEach(btn => {
    btn?.addEventListener('click', () => {
      clearInterval(auto);
    });
  });

  // Form validation (contact page)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      e.stopPropagation();

      // Reset bootstrap validation classes
      const inputs = form.querySelectorAll('input, textarea');
      let valid = true;
      inputs.forEach(inp => inp.classList.remove('is-invalid'));

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');

      if (!name.value.trim()) {
        name.classList.add('is-invalid');
        valid = false;
      }
      if (!validateEmail(email.value)) {
        email.classList.add('is-invalid');
        valid = false;
      }
      if (!message.value.trim()) {
        message.classList.add('is-invalid');
        valid = false;
      }

      const alertBox = document.getElementById('formAlert');
      if (!valid) {
        alertBox.style.display = 'block';
        alertBox.className = 'alert alert-danger';
        alertBox.textContent = 'Mohon perbaiki kesalahan pada form.';
        return;
      }

      // Simulasi pengiriman: di aplikasi nyata ganti dengan fetch ke backend atau Formspree
      alertBox.style.display = 'block';
      alertBox.className = 'alert alert-success';
      alertBox.textContent = 'Terima kasih! Pesan Anda telah dikirim (simulasi).';

      // Reset form setelah 2 detik
      setTimeout(() => {
        form.reset();
        alertBox.style.display = 'none';
      }, 2000);
    });
  }
});

function validateEmail(email) {
  // validasi email sederhana
  return /\S+@\S+\.\S+/.test(email);
}
