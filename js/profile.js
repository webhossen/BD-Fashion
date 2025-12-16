async function load() {
      const token = localStorage.getItem('auth_token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!token) return location.href = '/login.html';

      document.getElementById('userName').innerText = user.name || '-';
      document.getElementById('userEmail').innerText = user.email || '-';

      // Fetch orders
      const ordersRes = await fetch('/api/orders', { headers: { 'Authorization': `Bearer ${token}` } });
      const orders = await ordersRes.json();
      document.getElementById('totalOrders').innerText = orders.length;
      const ordersList = document.getElementById('ordersList');
      ordersList.innerHTML = orders.slice(0, 5).map(o => `
        <div class="flex justify-between items-center p-3 border rounded">
          <div>
            <div class="font-medium">${o.id}</div>
            <div class="text-xs text-gray-600">${new Date(o.created_at).toLocaleDateString()}</div>
          </div>
          <div class="text-right">
            <div class="font-semibold">$${o.total}</div>
            <div class="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">${o.status}</div>
          </div>
        </div>
      `).join('') || '<div class="text-gray-600 text-sm">No orders yet</div>';

      // Fetch designs
      const designsRes = await fetch('/api/designs', { headers: { 'Authorization': `Bearer ${token}` } });
      const designs = await designsRes.json();
      document.getElementById('totalDesigns').innerText = designs.length;
      const designsList = document.getElementById('designsList');
      designsList.innerHTML = designs.slice(0, 8).map(d => `
        <div class="border rounded overflow-hidden">
          <img src="${d.preview_url || '/mockups/placeholder.png'}" alt="design" class="w-full h-32 object-cover"/>
          <div class="p-2 text-xs">
            <div class="font-medium truncate">Design ${d.id}</div>
            <button class="text-blue-600 hover:underline text-xs" onclick="location.href='/customize.html?design=${d.id}'">Edit</button>
          </div>
        </div>
      `).join('') || '<div class="text-gray-600 text-sm col-span-4">No saved designs</div>';
    }

    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      location.href = '/';
    });

    load();