const params = new URLSearchParams(location.search);
const orderId = params.get('id');
const productId = params.get('productId');
const sizeParam = params.get('size') || 'M';
const qtyParam = Math.max(1, parseInt(params.get('qty')) || 1);
const ORDERS_KEY = 'bd_orders';

let appliedCoupon = null;

const COUPONS = {
  'BD10': 0.10,
  'BD20': 0.20,
  'BD30': 0.30,
  'BD40': 0.40,
  'BD50': 0.50
};

function getLocalOrders() {
  return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
}

function saveLocalOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function formatMoney(value) {
  return Math.round(Number(value || 0));
}

// =========================
//  TOAST NOTIFICATION
// =========================
function showToast(message) {
  // Create toast container if it doesn't exist
  let toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toastContainer";
    toastContainer.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;
    document.body.appendChild(toastContainer);
  }

  // Create toast element
  const toast = document.createElement("div");
  toast.style.cssText = `
    background: linear-gradient(to right, #10b981, #059669);
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    font-weight: 600;
    min-width: 280px;
    animation: slideIn 0.3s ease-out;
  `;
  toast.textContent = message;

  // Add animation styles if not already in document
  if (!document.getElementById("toastStyles")) {
    const style = document.createElement("style");
    style.id = "toastStyles";
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  toastContainer.appendChild(toast);

  // Auto remove after 4 seconds for this message
  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// =========================
//  CONFIRMATION DIALOG
// =========================
function showConfirmDialog(message) {
  return new Promise((resolve) => {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 9998;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    // Create modal
    const modal = document.createElement("div");
    modal.style.cssText = `
      background: white;
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      max-width: 400px;
      width: 90%;
      animation: modalSlideIn 0.3s ease-out;
    `;
    modal.innerHTML = `
      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 12px;">Confirm Payment</h3>
        <p style="font-size: 14px; color: #666; line-height: 1.5;">${message}</p>
      </div>
      <div style="display: flex; gap: 12px;">
        <button id="confirmBtn" style="
          flex: 1;
          padding: 12px 16px;
          background: linear-gradient(to right, #10b981, #059669);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        ">✓ Confirm Payment</button>
        <button id="cancelBtn" style="
          flex: 1;
          padding: 12px 16px;
          background: #e5e7eb;
          color: #374151;
          border: 2px solid #d1d5db;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        ">✕ Cancel</button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Add animation styles if not already in document
    if (!document.getElementById("confirmStyles")) {
      const style = document.createElement("style");
      style.id = "confirmStyles";
      style.textContent = `
        @keyframes modalSlideIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        #confirmBtn:hover {
          background: linear-gradient(to right, #059669, #047857);
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
          transform: translateY(-2px);
        }
        #confirmBtn:active {
          transform: translateY(0);
        }
        #cancelBtn:hover {
          background: #d1d5db;
          border-color: #9ca3af;
        }
        #cancelBtn:active {
          background: #b4b8c1;
        }
      `;
      document.head.appendChild(style);
    }

    document.getElementById("confirmBtn").addEventListener("click", () => {
      overlay.remove();
      resolve(true);
    });

    document.getElementById("cancelBtn").addEventListener("click", () => {
      overlay.remove();
      resolve(false);
    });

    // Close on overlay click
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.remove();
        resolve(false);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Order page loaded. orderId:', orderId, 'productId:', productId);
  if (orderId) {
    renderOrderStatus(orderId);
  } else if (productId) {
    renderDirectOrder();
  } else {
    renderAllOrders();
  }
});

function renderDirectOrder() {
  const product = PRODUCTS.find(p => p.id == productId);
  if (!product) {
    showNoOrderSection();
    return;
  }

  let currentQty = qtyParam;
  let currentSize = sizeParam;
  const web3OrderId = `ORDER-${product.id}-${Date.now()}`;

  const orderQtyEl = document.getElementById('orderQty');
  const orderSizeSelect = document.getElementById('orderSizeSelect');

  document.title = 'Place Order — BD Fashion';

  document.getElementById('directOrderSection').classList.remove('hidden');
  document.getElementById('directSummarySidebar').classList.remove('hidden');

  document.getElementById('orderProductTitle').innerText = product.title;
  document.getElementById('orderProductImage').src = product.image || '';
  document.getElementById('orderProductImage').alt = product.title;

  orderSizeSelect.value = currentSize;
  orderQtyEl.innerText = currentQty;

  function updateOrderSummary() {
    document.getElementById('orderProductMeta').innerHTML = `Qty: <strong>${currentQty}</strong> · Size: <strong>${currentSize}</strong>`;

    const subtotal = product.price * currentQty;
    const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
    const tax = subtotal * 0.05;
    const total = subtotal - discount + tax;

    document.getElementById('summarySubtotal').innerText = formatMoney(subtotal);
    document.getElementById('summaryDiscount').innerText = formatMoney(discount);
    document.getElementById('summaryTax').innerText = formatMoney(tax);
    document.getElementById('summaryTotal').innerText = formatMoney(total);

    const web3Id = document.getElementById('web3-order-id');
    const web3Product = document.getElementById('web3-order-product');
    const web3Size = document.getElementById('web3-order-size');
    const web3Qty = document.getElementById('web3-order-qty');
    const web3Total = document.getElementById('web3-order-total');

    if (web3Id) web3Id.value = web3OrderId;
    if (web3Product) web3Product.value = `${product.title}`;
    if (web3Size) web3Size.value = currentSize;
    if (web3Qty) web3Qty.value = currentQty;
    if (web3Total) web3Total.value = formatMoney(total);

    return { subtotal, discount, tax, total };
  }

  updateOrderSummary();

  document.getElementById('decreaseQty').addEventListener('click', () => {
    if (currentQty > 1) {
      currentQty -= 1;
      orderQtyEl.innerText = currentQty;
      updateOrderSummary();
    }
  });

  document.getElementById('increaseQty').addEventListener('click', () => {
    currentQty += 1;
    orderQtyEl.innerText = currentQty;
    updateOrderSummary();
  });

  orderSizeSelect.addEventListener('change', (event) => {
    currentSize = event.target.value;
    updateOrderSummary();
  });

  // Apply coupon button
  document.getElementById('applyCouponBtn').addEventListener('click', () => {
    const input = document.getElementById('couponInput').value.trim().toUpperCase();
    if (!input) return;

    const discountRate = COUPONS[input];
    if (!discountRate) {
      const msg = document.getElementById('couponMsg');
      msg.className = 'text-xs text-red-600 font-medium';
      msg.innerText = `✗ Invalid coupon code "${input}"`;
      return;
    }

    const subtotal = product.price * currentQty;
    const discountAmount = Math.round(subtotal * discountRate);

    appliedCoupon = {
      code: input,
      discountRate: discountRate,
      discountAmount: discountAmount,
    };

    const msg = document.getElementById('couponMsg');
    msg.className = 'text-xs text-green-600 font-medium';
    msg.innerText = `✓ Coupon "${input}" applied! ${(discountRate * 100)}% off`;

    document.getElementById('cancelCouponBtn').style.display = 'block';
    updateOrderSummary();
  });

  // Cancel coupon button
  document.getElementById('cancelCouponBtn').addEventListener('click', () => {
    appliedCoupon = null;
    document.getElementById('couponInput').value = '';
    document.getElementById('couponMsg').innerText = '';
    document.getElementById('cancelCouponBtn').style.display = 'none';
    updateOrderSummary();
  });

document.querySelectorAll('.paymentRadio').forEach(r => {
  r.addEventListener('change', () => {
    document.getElementById('manualPaymentDiv').style.display = r.value === 'manual' ? 'block' : 'none';
    document.getElementById('cardPaymentDiv').style.display = r.value === 'card' ? 'block' : 'none';
  });
});

// Card type selection handlers
document.querySelectorAll('.card-type-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.card-type-btn').forEach(b => {
      b.style.background = 'white';
      b.style.fontWeight = '600';
    });
    btn.style.background = 'linear-gradient(to right, #dbeafe, #e0e7ff)';
    btn.style.fontWeight = '700';
    document.getElementById('selectedCardType').value = btn.dataset.card;
  });
});

// Card number formatting
document.getElementById('cardNumber').addEventListener('input', function(e) {
  let value = e.target.value.replace(/\s+/g, '');
  let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
  e.target.value = formatted;
});

// Expiry date formatting
document.getElementById('cardExpiry').addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length >= 2) {
    value = value.slice(0, 2) + '/' + value.slice(2, 4);
  }
  e.target.value = value;
});

// bKash Payment Handler
class BKashPaymentHandler {
  constructor() {
    this.isProduction = false; // Set to true for production
    this.baseURL = this.isProduction ? 'https://api.bkash.com' : 'https://sandbox.bkash.dev';
  }

  async handlePayment(orderData) {
    // Note: This requires backend implementation for security
    // API keys should never be exposed in frontend
    
    // For now, simulate payment success
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: `BKASH${Date.now()}`,
          paymentID: `PAY${Date.now()}`
        });
      }, 2000);
    });
  }
}

const bkashHandler = new BKashPaymentHandler();

  document.getElementById('placeOrderBtn').addEventListener('click', async () => {
    const session = localStorage.getItem('demo_session');
    if (!session) {
      alert('Please log in before placing your order.');
      const target = encodeURIComponent(window.location.href);
      return window.location.href = `login.html?redirect=${target}`;
    }

    const shipping = {
      name: document.querySelector('[name="name"]').value.trim(),
      email: document.querySelector('[name="email"]').value.trim(),
      address: document.querySelector('[name="address"]').value.trim(),
      phone: document.querySelector('[name="phone"]').value.trim()
    };

    if (!shipping.name || !shipping.address || !shipping.phone) {
      return alert('Please fill in all shipping details');
    }

    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const transactionId = document.getElementById('transactionId').value.trim();
    if (paymentMethod === 'manual' && !transactionId) {
      return alert('Please enter your transaction ID for manual payment');
    }

    // Validate card payment
    if (paymentMethod === 'card') {
      const cardholderName = document.getElementById('cardholderName')?.value.trim();
      const cardNumber = document.getElementById('cardNumber')?.value.trim();
      const cardExpiry = document.getElementById('cardExpiry')?.value.trim();
      const cardCVV = document.getElementById('cardCVV')?.value.trim();

      if (!cardholderName) return showToast('Please enter cardholder name', 'error');
      if (!cardNumber || cardNumber.replace(/\s/g, '').length < 13) return showToast('Please enter a valid card number', 'error');
      if (!cardExpiry || !cardExpiry.match(/^\d{2}\/\d{2}$/)) return showToast('Please enter expiry date in MM/YY format', 'error');
      if (!cardCVV || cardCVV.length < 3) return showToast('Please enter a valid CVV', 'error');
    }

    const { subtotal, discount, tax, total } = updateOrderSummary();

    const order = {
      id: `ORD${Date.now()}`,
      created_at: new Date().toISOString(),
      status: paymentMethod === 'manual' ? 'pending' : 'paid',
      payment_method: paymentMethod,
      transaction_id: transactionId || null,
      shipping_address: shipping,
      coupon: appliedCoupon,
      items: [{
        id: product.id,
        title: product.title,
        size: currentSize,
        qty: currentQty,
        price: product.price,
        image: product.image
      }],
      subtotal,
      discount,
      tax,
      total
    };

    try {
      if (paymentMethod === 'bkash') {
        // Show confirmation toast for bKash payment
        showToast('🔐 Confirm bKash payment');
        
        // Show confirmation dialog for bKash payment
        const confirmed = await showConfirmDialog('Please confirm bKash payment. You will be redirected to bKash to complete the transaction.');
        
        if (!confirmed) {
          return; // User cancelled
        }

        // Show processing toast
        showToast('⏳ Processing bKash payment...');

        // Handle bKash payment
        const msg = document.getElementById('checkoutMsg');
        msg.className = 'p-3 rounded-lg text-sm bg-blue-100 text-blue-800 text-center font-medium';
        msg.innerText = 'Processing bKash payment...';
        msg.classList.remove('hidden');

        const paymentResult = await bkashHandler.handlePayment({
          total,
          orderId: order.id,
          name: shipping.name,
          email: shipping.email,
          phone: shipping.phone
        });

        if (paymentResult.success) {
          order.status = 'paid';
          order.transaction_id = paymentResult.transactionId;
          order.bkash_payment_id = paymentResult.paymentID;
        } else {
          throw new Error('Payment failed');
        }
      } else if (paymentMethod === 'nagad') {
        // Show confirmation toast for Nagad payment
        showToast('🔐 Confirm Nagad payment');
        
        // Show confirmation dialog for Nagad payment
        const confirmed = await showConfirmDialog('Please confirm Nagad payment. You will be redirected to Nagad to complete the transaction.');
        
        if (!confirmed) {
          return; // User cancelled
        }

        // Show processing toast
        showToast('⏳ Processing Nagad payment...');

        // Handle Nagad payment
        const msg = document.getElementById('checkoutMsg');
        msg.className = 'p-3 rounded-lg text-sm bg-orange-100 text-orange-800 text-center font-medium';
        msg.innerText = 'Processing Nagad payment...';
        msg.classList.remove('hidden');

        const paymentResult = await demoPaymentGateway.initializePaymentMethod('nagad');

        if (paymentResult) {
          order.status = 'paid';
          order.transaction_id = `NG${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        } else {
          throw new Error('Payment cancelled');
        }
      } else if (paymentMethod === 'rocket') {
        // Show confirmation toast for Rocket payment
        showToast('🔐 Confirm Rocket payment');
        
        // Show confirmation dialog for Rocket payment
        const confirmed = await showConfirmDialog('Please confirm Rocket payment. You will be redirected to Rocket to complete the transaction.');
        
        if (!confirmed) {
          return; // User cancelled
        }

        // Show processing toast
        showToast('⏳ Processing Rocket payment...');

        // Handle Rocket payment
        const msg = document.getElementById('checkoutMsg');
        msg.className = 'p-3 rounded-lg text-sm bg-red-100 text-red-800 text-center font-medium';
        msg.innerText = 'Processing Rocket payment...';
        msg.classList.remove('hidden');

        const paymentResult = await demoPaymentGateway.initializePaymentMethod('rocket');

        if (paymentResult) {
          order.status = 'paid';
          order.transaction_id = `RK${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        } else {
          throw new Error('Payment cancelled');
        }
      }

      const orders = getLocalOrders();
      orders.push(order);
      saveLocalOrders(orders);

      const msg = document.getElementById('checkoutMsg');
      msg.className = 'p-3 rounded-lg text-sm bg-green-100 text-green-800 text-center font-medium';
      msg.innerText = `✓ Order placed! Order ID: ${order.id}`;

      setTimeout(() => {
        location.href = `order-view.html`;
      }, 1500);
    } catch (error) {
      const msg = document.getElementById('checkoutMsg');
      msg.className = 'p-3 rounded-lg text-sm bg-red-100 text-red-800 text-center font-medium';
      msg.innerText = `✗ Payment failed: ${error.message}`;
      msg.classList.remove('hidden');
    }
  });
}

function renderOrderStatus(id) {
  const orders = getLocalOrders();
  const orderIndex = orders.findIndex(o => o.id === id);
  const order = orders[orderIndex];

  if (!order) {
    showNoOrderSection();
    return;
  }

  document.title = 'Order Status — BD Fashion';
  document.getElementById('orderStatusSection').classList.remove('hidden');

  const statusLabel = order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Unknown';
  const statusClass = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'paid': 'bg-blue-100 text-blue-800',
    'processing': 'bg-purple-100 text-purple-800',
    'shipped': 'bg-orange-100 text-orange-800',
    'delivered': 'bg-green-100 text-green-800',
    'cancelled': 'bg-gray-100 text-gray-800'
  }[order.status] || 'bg-gray-100 text-gray-800';

  document.getElementById('content').innerHTML = `
    <div class="mb-6">
      <div class="text-sm text-gray-600">Order ID: <strong>${order.id}</strong></div>
      <div class="text-sm text-gray-600">Date: <strong>${new Date(order.created_at).toLocaleDateString()}</strong></div>
      <div class="text-lg font-semibold mt-2">Total: ৳${formatMoney(order.total)}</div>
    </div>

    <div class="mb-8">
      <h3 class="font-semibold mb-4">Order Status</h3>
      <div class="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${statusClass}">${statusLabel}</div>
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

    <div class="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <h4 class="font-semibold mb-3">Ordered Items</h4>
      ${order.items.map(item => `
        <div class="mb-3 flex items-start gap-4">
          ${item.image ? `<img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-cover rounded-lg bg-gray-100" />` : ''}
          <div>
            <div class="font-semibold">${item.title}</div>
            <div class="text-sm text-gray-500">Size: ${item.size} · Qty: ${item.qty}</div>
            <div class="text-sm text-gray-700">Price: ৳${formatMoney(item.price)}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="space-y-2">
      <a href="products.html" class="block px-4 py-2 bg-blue-600 text-white rounded text-center text-sm">← Continue Shopping</a>
      <a href="profile.html" class="block px-4 py-2 bg-gray-600 text-white rounded text-center text-sm">My Orders</a>
    </div>
  `;
}

function renderAllOrders() {
  const orders = getLocalOrders();
  console.log('All orders:', orders);
  
  if (orders.length === 0) {
    console.log('No orders found, showing no order section');
    showNoOrderSection();
    return;
  }

  console.log('Rendering', orders.length, 'orders');
  document.title = 'My Orders — BD Fashion';
  document.getElementById('orderStatusSection').classList.remove('hidden');

  console.log('Rendering', orders.length, 'orders');
  document.title = 'My Orders — BD Fashion';
  document.getElementById('orderStatusSection').classList.remove('hidden');

  const ordersHTML = orders.map(order => {
    console.log('Rendering order:', order.id, 'with items:', order.items.length, 'shipping:', order.shipping_address);
    const statusColors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'paid': 'bg-blue-100 text-blue-800',
      'processing': 'bg-purple-100 text-purple-800',
      'shipped': 'bg-orange-100 text-orange-800',
      'delivered': 'bg-green-100 text-green-800'
    };

    const itemsHTML = order.items.map(item => {
      console.log('Rendering item:', item.title, 'price:', item.price, 'qty:', item.qty);
      return `
      <div class="flex items-center gap-3 py-2 border-b border-gray-100 last:border-b-0">
        <img src="${item.image || ''}" alt="${item.title}" class="w-12 h-12 object-cover rounded">
        <div class="flex-1">
          <div class="font-medium text-sm">${item.title}</div>
          <div class="text-xs text-gray-600">Size: ${item.size || 'N/A'} · Qty: ${item.qty}</div>
        </div>
        <div class="text-sm font-bold">৳${formatMoney(item.price * item.qty)}</div>
      </div>
    `}).join('');

    return `
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-lg font-bold">Order #${order.id}</h3>
            <p class="text-sm text-gray-600">${new Date(order.created_at).toLocaleDateString()}</p>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}">
            ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>

        <div class="mb-4">
          <h4 class="font-semibold mb-2">Items:</h4>
          ${itemsHTML}
        </div>

        <div class="border-t pt-4">
          <div class="flex justify-between text-sm mb-1">
            <span>Subtotal:</span>
            <span>৳${formatMoney(order.subtotal)}</span>
          </div>
          ${order.discount ? `
          <div class="flex justify-between text-sm mb-1">
            <span>Discount:</span>
            <span class="text-green-600">-৳${formatMoney(order.discount)}</span>
          </div>` : ''}
          <div class="flex justify-between text-sm mb-1">
            <span>Tax (5%):</span>
            <span>৳${formatMoney(order.tax)}</span>
          </div>
          <div class="flex justify-between font-bold">
            <span>Total:</span>
            <span>৳${formatMoney(order.total)}</span>
          </div>
        </div>

        <div class="mt-4 pt-4 border-t">
          <h4 class="font-semibold mb-2">Shipping Address:</h4>
          <p class="text-sm text-gray-600">
            ${order.shipping_address.name}<br>
            ${order.shipping_address.address}<br>
            ${order.shipping_address.phone}
          </p>
        </div>

        ${order.transaction_id ? `
        <div class="mt-4 pt-4 border-t">
          <h4 class="font-semibold mb-2">Payment Info:</h4>
          <p class="text-sm text-gray-600">
            Method: ${order.payment_method.charAt(0).toUpperCase() + order.payment_method.slice(1)}<br>
            Transaction ID: ${order.transaction_id}
          </p>
        </div>` : ''}
      </div>
    `;
  }).join('');

  console.log('Displaying shipping address for order', order.id, ':', order.shipping_address);

  document.getElementById('content').innerHTML = `
    <div class="mb-6">
      <h2 class="text-2xl font-bold mb-4">My Orders</h2>
      <p class="text-gray-600">View all your order history below.</p>
    </div>
    ${ordersHTML}
    <div class="mt-8 text-center">
      <a href="products.html" class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
        Continue Shopping
      </a>
    </div>
  `;
  console.log('Orders HTML set to content element');
}

function showNoOrderSection() {
  document.getElementById('noOrderSection').classList.remove('hidden');
}
