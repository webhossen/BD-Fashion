const params = new URLSearchParams(location.search);
    const orderId = params.get('id');
    const token = localStorage.getItem('auth_token');

    async function load() {
      if (!token) return document.getElementById('content').innerHTML = '<p class="text-red-600">Please login to view order</p>';
      const res = await fetch(`/api/orders/${orderId}`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (!res.ok) return document.getElementById('content').innerHTML = '<p class="text-red-600">Order not found</p>';
      const order = await res.json();

      const statuses = ['pending', 'paid', 'processing', 'shipped', 'delivered'];
      const currentIdx = statuses.indexOf(order.status);

      document.getElementById('content').innerHTML = `
        <div class="mb-6">
          <div class="text-sm text-gray-600">Order ID: <strong>${order.id}</strong></div>
          <div class="text-sm text-gray-600">Date: <strong>${new Date(order.created_at).toLocaleDateString()}</strong></div>
          <div class="text-lg font-semibold mt-2">Total: $${order.total}</div>
        </div>

        <div class="mb-8">
          <h3 class="font-semibold mb-4">Order Status</h3>
          <div class="flex items-center justify-between">
            ${statuses.map((s, idx) => `
              <div class="flex flex-col items-center">
                <div class="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${idx <= currentIdx ? 'bg-green-500' : 'bg-gray-300'}">${idx + 1}</div>
                <div class="text-xs mt-1 capitalize">${s}</div>
              </div>
              ${idx < statuses.length - 1 ? `<div class="flex-1 h-1 mx-2 ${idx < currentIdx ? 'bg-green-500' : 'bg-gray-300'}"></div>` : ''}
            `).join('')}
          </div>
        </div>

        <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <h4 class="font-semibold mb-2">Shipping Address</h4>
          <div class="text-sm text-gray-700">
            ${order.shipping_address ? `
              <div>${order.shipping_address.name}</div>
              <div>${order.shipping_address.address}</div>
              <div>${order.shipping_address.phone}</div>
            ` : 'N/A'}
          </div>
        </div>

        ${order.tracking_number ? `
          <div class="p-4 bg-green-50 border border-green-200 rounded mb-6">
            <h4 class="font-semibold mb-2">Tracking Number</h4>
            <div class="text-sm font-mono bg-white p-2 rounded border">${order.tracking_number}</div>
          </div>
        ` : ''}

        <div class="space-y-2">
          <a href="products.html" class="block px-4 py-2 bg-blue-600 text-white rounded text-center text-sm">← Continue Shopping</a>
          <a href="profile.html" class="block px-4 py-2 bg-gray-600 text-white rounded text-center text-sm">My Orders</a>
        </div>
      `;
    }

    load();