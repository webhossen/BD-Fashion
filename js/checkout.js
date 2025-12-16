const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const subtotal = cart.reduce((s, it) => s + (it.unit_price || 0) * (it.qty || 1), 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    document.getElementById('summarySubtotal').innerText = subtotal.toFixed(2);
    document.getElementById('summaryTax').innerText = tax.toFixed(2);
    document.getElementById('summaryTotal').innerText = total.toFixed(2);

    document.querySelectorAll('.paymentRadio').forEach(r => {
      r.addEventListener('change', () => {
        document.getElementById('manualPaymentDiv').style.display = r.value === 'manual' ? 'block' : 'none';
      });
    });

    document.getElementById('placeOrderBtn').addEventListener('click', async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        alert('Please login to place order');
        return location.href = '/login.html';
      }

      const shipping = {
        name: document.querySelector('[name="name"]').value,
        email: document.querySelector('[name="email"]').value,
        address: document.querySelector('[name="address"]').value,
        phone: document.querySelector('[name="phone"]').value
      };

      if (!shipping.name || !shipping.address || !shipping.phone) {
        return alert('Please fill in all shipping details');
      }

      const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
      const msg = document.getElementById('checkoutMsg');

      try {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart, shipping_address: shipping, payment_method: paymentMethod })
        });

        if (!res.ok) throw new Error('Order creation failed');
        const data = await res.json();
        localStorage.removeItem('cart');
        msg.className = 'p-3 rounded-lg text-sm bg-green-100 text-green-800 text-center font-medium';
        msg.innerText = `✓ Order placed! Order ID: ${data.order_id}`;
        setTimeout(() => location.href = `/order.html?id=${data.order_id}`, 2000);
      } catch (err) {
        msg.className = 'p-3 rounded-lg text-sm bg-red-100 text-red-800 text-center font-medium';
        msg.innerText = `✕ ${err.message}`;
      }
    });