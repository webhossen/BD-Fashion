document.getElementById('contactForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.getElementById('msg');
      msg.className = 'mt-6 p-4 rounded-lg bg-green-100 text-green-800 text-center font-medium';
      msg.innerText = '✓ Thank you! We will get back to you soon.';
      e.target.reset();
      setTimeout(() => { msg.classList.add('hidden'); }, 5000);
    });