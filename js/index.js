// Login button - redirect based on auth status
    document.getElementById('loginBtn').addEventListener('click', () => {
      const token = localStorage.getItem('auth_token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      if (token) {
        // User is logged in - redirect to profile or admin
        if (user.role === 'admin' || user.role === 'manager') {
          location.href = '/admin.html';
        } else {
          location.href = '/profile.html';
        }
      } else {
        // User not logged in - go to login
        location.href = '/login.html';
      }
    });

    // Update login button text based on auth status
    function updateAuthButton() {
      const token = localStorage.getItem('auth_token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const loginBtn = document.getElementById('loginBtn');
      
      if (token) {
        loginBtn.innerText = `👤 ${user.name || 'Account'}`;
        loginBtn.classList.add('font-semibold', 'text-blue-600');
      }
    }

    // Newsletter form
    document.getElementById('newsletterForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      alert(`Thank you for subscribing with ${email}!`);
      e.target.reset();
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Initialize on page load
    updateAuthButton();