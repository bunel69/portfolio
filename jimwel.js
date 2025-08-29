// SPA navigation without footer blink:
// Show the target section FIRST, then hide the others.
const links = Array.from(document.querySelectorAll('nav a[href^="#"]'));
const pages = Array.from(document.querySelectorAll('.page'));

function showSection(id, updateHash = true) {
  const target = document.querySelector(id);
  if (!target) return;

  const current = document.querySelector('.page.active-page');
  if (current === target) return;

  // 1) Activate target immediately to avoid layout collapse (no footer flash)
  target.classList.add('active-page');

  // 2) On next frame, deactivate others (so there is never a "no content" gap)
  requestAnimationFrame(() => {
    pages.forEach(p => { if (p !== target) p.classList.remove('active-page'); });
  });

  // 3) Update nav active state
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));

  // 4) Smooth scroll to top (optional)
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // 5) Keep URL hash tidy
  if (updateHash) history.replaceState(null, '', id);
}

// Click handlers
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showSection(link.getAttribute('href'));
  });
});

// On first load, open the hash (or default to #home)
document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash || '#home';
  showSection(hash, false);
});
document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector("nav ul");
    const toggleBtn = document.createElement("button");

    toggleBtn.innerHTML = "☰"; // hamburger icon
    toggleBtn.classList.add("hamburger-btn");
    document.querySelector("nav").prepend(toggleBtn);

    toggleBtn.addEventListener("click", () => {
        nav.classList.toggle("show");
    });

    // ✅ Fix: Reset menu when screen is resized back to desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            nav.classList.remove("show");
        }
    });
});
