// Order View JavaScript - BD Fashion
// Handles displaying user orders in a clean, organized layout

const ORDERS_KEY = 'bd_orders';

// Utility functions
function getLocalOrders() {
  return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
}

function formatMoney(value) {
  return Math.round(Number(value || 0));
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// =========================
//  TOAST NOTIFICATION
// =========================
function showToast(message, type = 'success') {
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

  const bgColor = type === 'success' ? 'linear-gradient(to right, #10b981, #059669)' 
                : type === 'error' ? 'linear-gradient(to right, #ef4444, #dc2626)'
                : 'linear-gradient(to right, #f59e0b, #d97706)';

  const toast = document.createElement("div");
  toast.style.cssText = `
    background: ${bgColor};
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    font-weight: 600;
    min-width: 280px;
    animation: slideIn 0.3s ease-out;
  `;
  toast.textContent = message;

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

  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// =========================
//  CONFIRMATION DIALOG
// =========================
function showConfirmDialog(title, message) {
  return new Promise((resolve) => {
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
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 12px; color: #1f2937;">${title}</h3>
        <p style="font-size: 14px; color: #666; line-height: 1.6;">${message}</p>
      </div>
      <div style="display: flex; gap: 12px;">
        <button id="confirmBtn" style="
          flex: 1;
          padding: 12px 16px;
          background: linear-gradient(to right, #ef4444, #dc2626);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        ">✓ Yes, Confirm</button>
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
          background: linear-gradient(to right, #dc2626, #b91c1c);
          box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4);
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

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.remove();
        resolve(false);
      }
    });
  });
}

// Status configuration
const STATUS_CONFIG = {
  'pending': {
    label: 'Pending',
    class: 'status-pending',
    icon: '⏳'
  },
  'paid': {
    label: 'Paid',
    class: 'status-paid',
    icon: '💳'
  },
  'processing': {
    label: 'Processing',
    class: 'status-processing',
    icon: '⚙️'
  },
  'shipped': {
    label: 'Shipped',
    class: 'status-shipped',
    icon: '🚚'
  },
  'delivered': {
    label: 'Delivered',
    class: 'status-delivered',
    icon: '✅'
  },
  'cash_on_delivery': {
    label: 'Cash on Delivery',
    class: 'status-cash-on-delivery',
    icon: '💵'
  },
  'cancelled': {
    label: 'Cancelled',
    class: 'status-cancelled',
    icon: '❌'
  }
};

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  console.log('Order View page loaded');
  loadOrders();
});

// Load and display orders
function loadOrders() {
  const orders = getLocalOrders();
  console.log('Loading orders:', orders);

  const container = document.getElementById('ordersContainer');
  const noOrdersMessage = document.getElementById('noOrdersMessage');
  const loadingState = document.getElementById('loadingState');

  // Hide loading state
  loadingState.classList.add('hidden');

  if (orders.length === 0) {
    noOrdersMessage.classList.remove('hidden');
    container.innerHTML = '';
    return;
  }

  // Hide no orders message and show orders
  noOrdersMessage.classList.add('hidden');

  // Sort orders by date (newest first)
  orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // Generate HTML for all orders
  const ordersHTML = orders.map(order => createOrderCard(order)).join('');

  container.innerHTML = ordersHTML;
}

// Create order card HTML
function createOrderCard(order) {
  const status = STATUS_CONFIG[order.status] || STATUS_CONFIG['pending'];

  // Special handling for Cash on Delivery - show as Unpaid until delivered
  let displayStatus = status;
  if (order.payment_method === 'cash_on_delivery' && order.status !== 'delivered' && order.status !== 'cancelled') {
    displayStatus = {
      label: 'Unpaid',
      class: 'status-unpaid',
      icon: '💳'
    };
  }

  return `
    <div class="order-card">
      <!-- Order Header -->
      <div class="order-header">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="order-title">Order #${order.id}</h3>
            <p class="order-meta">Placed on ${formatDate(order.created_at)}</p>
          </div>
          <span class="status-badge ${displayStatus.class}">
            ${displayStatus.icon} ${displayStatus.label}
          </span>
        </div>
      </div>

      <!-- Order Content -->
      <div class="order-content">
        <!-- Items Section -->
        <div class="items-section">
          <h4 class="items-header">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
            </svg>
            Ordered Items
          </h4>
          ${createItemsHTML(order.items)}
        </div>

        <!-- Summary Section -->
        <div class="summary-section">
          <div class="summary-row">
            <span class="summary-label">Subtotal:</span>
            <span class="summary-value">৳${formatMoney(order.subtotal)}</span>
          </div>
          ${order.discount ? `
          <div class="summary-row">
            <span class="summary-label">Discount:</span>
            <span class="summary-value text-green-600">-৳${formatMoney(order.discount)}</span>
          </div>` : ''}
          <div class="summary-row">
            <span class="summary-label">Tax (5%):</span>
            <span class="summary-value">৳${formatMoney(order.tax)}</span>
          </div>
          <div class="summary-row summary-total">
            <span class="summary-label">Total:</span>
            <span class="summary-value">৳${formatMoney(order.total)}</span>
          </div>
        </div>

        <!-- Shipping Section -->
        ${order.shipping_address ? `
        <div class="shipping-section">
          <h4 class="shipping-header">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Shipping Address
          </h4>
          <div class="shipping-details">
            <div class="shipping-name">${order.shipping_address.name || 'Recipient Name'}</div>
            <div class="shipping-address-text">${order.shipping_address.address || 'No address provided'}</div>

            <div class="shipping-contact">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
              <span>${order.shipping_address.phone || 'Phone not provided'}</span>
            </div>

            ${order.shipping_address.email ? `
            <div class="shipping-contact">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              <span>${order.shipping_address.email}</span>
            </div>` : ''}
          </div>
        </div>` : ''}

        <!-- Payment Section -->
        ${order.transaction_id || order.payment_method ? `
        <div class="payment-section">
          <h4 class="payment-header">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
            Payment Information
          </h4>
          <div class="payment-details">
            <div class="flex items-center gap-3 mb-3">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                ${formatPaymentMethod(order.payment_method)}
              </span>
            </div>
            ${order.transaction_id ? `
            <div class="bg-gray-50 rounded-lg p-3 mb-3">
              <div class="text-sm text-gray-600 mb-1">Transaction ID</div>
              <div class="font-mono text-sm font-semibold text-gray-900">${order.transaction_id}</div>
            </div>` : ''}
            ${order.bkash_payment_id ? `
            <div class="bg-gray-50 rounded-lg p-3 mb-3">
              <div class="text-sm text-gray-600 mb-1">bKash Payment ID</div>
              <div class="font-mono text-sm font-semibold text-gray-900">${order.bkash_payment_id}</div>
            </div>` : ''}
            ${order.payment_details ? `
              <div class="payment-extra-details mt-3 pt-3 border-t border-gray-200 space-y-2">
                ${order.payment_details.cardNumber ? `
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4z"></path>
                  </svg>
                  <span class="text-sm text-gray-600">Card ending in ${order.payment_details.cardNumber.slice(-4)}</span>
                </div>` : ''}
                ${order.payment_details.name ? `
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-sm text-gray-600">${order.payment_details.name}</span>
                </div>` : ''}
                ${order.payment_details.email ? `
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  <span class="text-sm text-gray-600">${order.payment_details.email}</span>
                </div>` : ''}
                ${order.payment_details.number ? `
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                  <span class="text-sm text-gray-600">${order.payment_details.number}</span>
                </div>` : ''}
              </div>
            ` : ''}
          </div>
        </div>` : ''}

        <!-- Action Buttons -->
        <div class="action-buttons">
          <a href="products.html" class="btn-primary">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z" clip-rule="evenodd"></path>
            </svg>
            Continue Shopping
          </a>

          ${canCancelOrder(order) ? `
          <button onclick="cancelOrder('${order.id}')" class="btn-danger">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
            Cancel Order
          </button>` : ''}

          ${order.status === 'delivered' ? `
          <a href="${getReviewLink(order)}" class="btn-secondary">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"></path>
            </svg>
            Leave Review
          </a>` : ''}

          <button onclick="removeOrder('${order.id}')" class="btn-remove">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            Remove Order
          </button>
        </div>
      </div>
    </div>
  `;
}

// Create items HTML
function createItemsHTML(items) {
  return items.map(item => `
    <div class="order-item">
      <img src="${item.image || 'Image/favicon-256.png'}" alt="${item.title}" class="item-image"
           onerror="this.src='Image/favicon-256.png'">
      <div class="item-details">
        <div class="item-title">${item.title}</div>
        <div class="item-meta">
          Size: ${item.size || 'N/A'} • Quantity: ${item.qty}
        </div>
      </div>
      <div class="item-price">৳${formatMoney(item.price * item.qty)}</div>
    </div>
  `).join('');
}

// Format payment method for display
function formatPaymentMethod(method) {
  const methods = {
    'credit_card': 'Credit Card',
    'debit_card': 'Debit Card',
    'mastercard': 'Mastercard',
    'visa': 'Visa',
    'paypal': 'PayPal',
    'bkash': 'bKash Mobile Payment',
    'manual': 'Manual Payment (Bank/bKash/Nagad)',
    'stripe': 'Credit/Debit Card',
    'cash_on_delivery': 'Cash on Delivery'
  };
  return methods[method] || method || 'N/A';
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add loading animation
  const style = document.createElement('style');
  style.textContent = `
    .order-card {
      opacity: 0;
      transform: translateY(20px);
      animation: fadeInUp 0.6s ease-out forwards;
    }

    .order-card:nth-child(1) { animation-delay: 0.1s; }
    .order-card:nth-child(2) { animation-delay: 0.2s; }
    .order-card:nth-child(3) { animation-delay: 0.3s; }
    .order-card:nth-child(4) { animation-delay: 0.4s; }
    .order-card:nth-child(5) { animation-delay: 0.5s; }

    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
});

// Check if order can be cancelled
function canCancelOrder(order) {
  // Only allow cancellation for pending or paid orders (not processing, shipped, or delivered)
  const cancellableStatuses = ['pending', 'paid'];
  return cancellableStatuses.includes(order.status);
}

// Cancel order function
function cancelOrder(orderId) {
  showConfirmDialog(
    '⚠️ Cancel Order',
    'Are you sure you want to cancel this order? This action cannot be undone.'
  ).then(async (confirmed) => {
    if (!confirmed) return;

    const orders = getLocalOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);

    if (orderIndex === -1) {
      showToast('Order not found.', 'error');
      return;
    }

    // Update order status to cancelled
    orders[orderIndex].status = 'cancelled';
    orders[orderIndex].cancelled_at = new Date().toISOString();

    // Save updated orders
    saveLocalOrders(orders);

    // Reload orders display
    loadOrders();

    showToast('✓ Order has been cancelled successfully.', 'success');
  });
}

// Remove order function (completely delete)
function removeOrder(orderId) {
  showConfirmDialog(
    '🗑️ Permanently Remove Order',
    'Are you sure you want to permanently remove this order? This action cannot be undone and will completely delete the order from your account.'
  ).then(async (confirmed) => {
    if (!confirmed) return;

    const orders = getLocalOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);

    if (orderIndex === -1) {
      showToast('Order not found.', 'error');
      return;
    }

    // Remove the order from the array
    orders.splice(orderIndex, 1);

    // Save updated orders
    saveLocalOrders(orders);

    // Reload orders display
    loadOrders();

    showToast('✓ Order has been permanently removed.', 'success');
  });
}

// Save orders to localStorage
function saveLocalOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function getReviewLink(order) {
  const firstProductId = order.items?.[0]?.id;
  if (!firstProductId) {
    return 'products.html';
  }

  return `product-detail.html?id=${firstProductId}#reviewsSection`;
}

// Export functions for potential use by other scripts
window.OrderView = {
  loadOrders,
  getLocalOrders,
  saveLocalOrders,
  formatMoney,
  formatDate,
  canCancelOrder,
  cancelOrder,
  removeOrder,
  showToast,
  showConfirmDialog
};