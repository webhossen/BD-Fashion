document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.menu-btn');
  const nav = document.getElementById('main-nav');

  if (btn && nav) {
    btn.addEventListener('click', () => {
      nav.classList.toggle('nav-open');
      btn.classList.toggle('active');
    });
  }

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#main-nav .nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.split('/').pop();

    if (linkPath === currentPath || (linkPath === 'index.html' && currentPath === '')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});