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

  // Handle profile dropdown
  const profileBtn = document.getElementById('profileBtn');
  const profileDropdown = document.getElementById('profileDropdown');
  const adminLink = document.getElementById('adminLink');
  const logoutBtn = document.getElementById('logoutBtn');

  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle('hidden');
    });

    profileDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.classList.add('hidden');
      }
    });
  }

  // Show admin link for admin/manager users
  if (adminLink) {
    const currentUser = JSON.parse(localStorage.getItem('demo_session') || 'null');
    if (currentUser && ['admin', 'manager'].includes(currentUser.role)) {
      adminLink.classList.remove('hidden');
      adminLink.href = 'admin/admin-login.html';
      adminLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'admin/admin-login.html';
      });
    }
  }

  // Handle logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('demo_session');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = 'login.html';
    });
  }
});