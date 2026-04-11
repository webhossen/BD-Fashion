const CART_KEY = 'bd_cart';
const ORDERS_KEY = 'bd_orders';

let appliedCoupon = null;

const COUPONS = {
  'BD10': 0.10,
  'BD20': 0.20,
  'BD30': 0.30,
  'BD40': 0.40,
  'BD50': 0.50
};

const PAYMENT_METHODS = {
  credit_card: '💳 Credit Card',
  debit_card: '🏦 Debit Card',
  mastercard: 'Mastercard',
  visa: 'Visa',
  paypal: 'PayPal',
  bkash: '📱 bKash (Mobile Payment)',
  nagad: '📱 Nagad (Mobile Payment)',
  rocket: '📱 Rocket (Mobile Payment)',
  cash_on_delivery: '💵 Cash on Delivery'
};

function getLocalOrders() {
  return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
}

function saveLocalOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function saveCart(cartItems) {
  localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
}

function formatMoney(value) {
  return Math.round(Number(value || 0));
}

// =========================
//  TOAST NOTIFICATION
// =========================
function showToast(message, type = 'success') {
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

  const bgColor = type === 'success'
    ? 'linear-gradient(to right, #10b981, #059669)'
    : type === 'error'
    ? 'linear-gradient(to right, #ef4444, #dc2626)'
    : 'linear-gradient(to right, #f59e0b, #d97706)';

  // Create toast element
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

  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
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

function getQueryOrderCart() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('productId');
  if (!productId) return null;

  const product = PRODUCTS.find(p => p.id == productId);
  if (!product) return null;

  return [{
    id: productId,
    size: params.get('size') || 'M',
    qty: Math.max(1, parseInt(params.get('qty')) || 1)
  }];
}

function getCartItems() {
  const queryCart = getQueryOrderCart();
  if (queryCart) return queryCart;

  const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');

  // If cart is empty, add some demo items for testing
  if (cart.length === 0) {
    return [
      { id: 1, size: 'M', qty: 2 },
      { id: 3, size: 'L', qty: 1 },
      { id: 5, size: 'S', qty: 1 }
    ];
  }

  return cart;
}

function renderOrderSummaryDetails(cart) {
  const detailsContainer = document.getElementById('orderItemsDetails');
  if (!detailsContainer) return;
  const orderCart = cart || getCartItems();

  if (orderCart.length === 0) {
    detailsContainer.innerHTML = '<div class="text-center py-6 text-gray-600">No items in order</div>';
    return;
  }

  detailsContainer.innerHTML = orderCart.map(item => {
    const product = PRODUCTS.find(p => p.id == item.id) || {};
    const itemPrice = Number(product.price || item.unit_price || 0);
    const itemTotal = itemPrice * (item.qty || 1);
    const imageSrc = product.image || 'Image/favicon-256.png'; // Fallback image
    const title = product.title || `Product ${item.id}`;

    return `
      <div class="flex items-center gap-4 p-3 border border-gray-200 rounded-lg bg-gray-50">
        <img src="${imageSrc}" alt="${title}" class="w-16 h-16 object-cover rounded-lg bg-gray-100" onerror="this.src='Image/favicon-256.png'" />
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-sm leading-tight">${title}</div>
          <div class="text-xs text-gray-600 mt-1">Size: ${item.size || 'M'} · Qty: ${item.qty || 1}</div>
          <div class="text-xs text-gray-600 mt-1">Unit: ৳${formatMoney(itemPrice)}</div>
        </div>
        <div class="text-sm font-bold text-blue-600">৳${formatMoney(itemTotal)}</div>
      </div>
    `;
  }).join('');
}

function updateOrderSummary(cart) {
  const orderCart = cart || getCartItems();
  const subtotal = orderCart.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id == item.id);
    const price = Number(product?.price || item.unit_price || 0);
    return sum + price * (item.qty || 1);
  }, 0);
  const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const tax = subtotal * 0.05;
  const total = subtotal - discount + tax;

  document.getElementById('summarySubtotal').innerText = formatMoney(subtotal);
  document.getElementById('summaryDiscount').innerText = formatMoney(discount);
  document.getElementById('summaryTax').innerText = formatMoney(tax);
  document.getElementById('summaryTotal').innerText = formatMoney(total);

  renderOrderSummaryDetails(orderCart);

  return { subtotal, discount, tax, total };
}

// Auto-populate shipping form from profile data
function populateShippingFormFromProfile() {
  try {
    // Get current user session
    const session = localStorage.getItem('demo_session');
    if (!session) return;

    const user = JSON.parse(session);

    // Populate form fields
    const shippingForm = document.getElementById('shippingForm');
    if (!shippingForm) return;

    const nameField = shippingForm.querySelector('input[name="name"]');
    const emailField = shippingForm.querySelector('input[name="email"]');
    const phoneField = shippingForm.querySelector('input[name="phone"]');
    const addressField = shippingForm.querySelector('textarea[name="address"]');

    if (nameField && user.name) nameField.value = user.name;
    if (emailField && user.email) emailField.value = user.email;
    if (phoneField && user.phone) phoneField.value = user.phone;

    // Load address book entry from profile
    const addressKey = 'user_address_' + user.id;
    const savedAddress = localStorage.getItem(addressKey);

    if (savedAddress) {
      const address = JSON.parse(savedAddress);
      if (nameField && !nameField.value && address.name) {
        nameField.value = address.name;
      }
      if (phoneField && !phoneField.value && address.phone) {
        phoneField.value = address.phone;
      }
      if (addressField) {
        const textValue = address.shipping || address.billing || '';
        if (textValue.trim()) {
          addressField.value = textValue;
        }
      }
    }

    // If profile address book is empty, fallback to last order address
    if (addressField && !addressField.value) {
      const orders = JSON.parse(localStorage.getItem('bd_orders') || '[]');
      const userOrders = orders.filter(order =>
        order.shipping_address &&
        order.shipping_address.email &&
        order.shipping_address.email.toLowerCase() === user.email.toLowerCase()
      );

      if (userOrders.length > 0) {
        const lastOrder = userOrders[0];
        if (lastOrder.shipping_address) {
          const addressData = lastOrder.shipping_address;
          const addressText = `${addressData.address || ''}, ${addressData.city || ''} - ${addressData.postcode || ''}`.trim();
          if (addressText && addressText !== ',  - ') {
            addressField.value = addressText;
          }
        }
      }
    }

    console.log('Shipping form auto-populated from profile data');
  } catch (error) {
    console.error('Error populating shipping form:', error);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Auto-populate shipping form from profile
  populateShippingFormFromProfile();

  // Wait a bit for all scripts to load
  setTimeout(() => {
    updateOrderSummary();
  }, 100);

  // Payment method radio buttons
  document.querySelectorAll('.paymentRadio').forEach(r => {
    r.addEventListener('change', () => {
      // Update selected payment text
      const selectedText = document.getElementById('selectedPaymentText');
      if (selectedText) {
        selectedText.innerText = PAYMENT_METHODS[r.value] || r.value;
      }

      // Update active styling on payment cards
      document.querySelectorAll('.paymentOption').forEach(option => {
        const input = option.querySelector('.paymentRadio');
        const card = option.querySelector('.payment-card');
        if (card) {
          if (input.checked) {
            card.classList.add('border-blue-500', 'shadow-lg', 'bg-blue-50');
            card.classList.remove('border-gray-200');
          } else {
            card.classList.remove('border-blue-500', 'shadow-lg', 'bg-blue-50');
            card.classList.add('border-gray-200');
          }
        }
      });
    });
  });

  // Trigger change event to initialize payment display
  const initialPayment = document.querySelector('input[name="paymentMethod"]:checked');
  if (initialPayment) {
    initialPayment.dispatchEvent(new Event('change'));
  }

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

    const subtotal = Number(document.getElementById('summarySubtotal').innerText);
    const discountAmount = parseFloat((subtotal * discountRate).toFixed(2));

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

  // Place order button
  document.getElementById('placeOrderBtn').addEventListener('click', async () => {
    const cart = getCartItems();

    if (cart.length === 0) {
      showToast('Your cart is empty. Please add items before placing an order.', 'error');
      return;
    }

    const shipping = {
      name: document.querySelector('[name="name"]').value.trim(),
      email: document.querySelector('[name="email"]').value.trim(),
      address: document.querySelector('[name="address"]').value.trim(),
      phone: document.querySelector('[name="phone"]').value.trim()
    };

    if (!shipping.name || !shipping.address || !shipping.phone) {
      return showToast('Please fill in all shipping details', 'error');
    }

    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const msg = document.getElementById('checkoutMsg');

    // Calculate totals
    const { subtotal, discount, tax, total } = updateOrderSummary();

    // Show confirmation dialog
    const confirmed = await showConfirmDialog(
      `You are about to pay ৳${formatMoney(total)} using ${PAYMENT_METHODS[paymentMethod]}. Continue?`
    );

    if (!confirmed) return;

    try {
      // Initialize demo payment gateway
      msg.className = 'p-3 rounded-lg text-sm bg-blue-100 text-blue-800 text-center font-medium';
      msg.innerText = `Initializing ${PAYMENT_METHODS[paymentMethod]}...`;
      msg.classList.remove('hidden');

      // Initialize payment method (this will show the payment modal)
      const paymentInit = await demoPaymentGateway.initializePaymentMethod(paymentMethod);

      if (!paymentInit) {
        // User cancelled payment
        msg.classList.add('hidden');
        return;
      }

      // Show processing
      msg.innerText = `Processing ${PAYMENT_METHODS[paymentMethod]} payment...`;
      const processingOverlay = demoPaymentGateway.showProcessingOverlay();

      // Process payment
      const paymentResult = await demoPaymentGateway.processPayment(total, {
        shipping,
        items: cart,
        subtotal,
        discount,
        tax,
        total
      });

      demoPaymentGateway.hideProcessingOverlay();

      if (paymentResult.success) {
        // Create order
        const orderId = `ORD${Date.now()}`;
        const order = {
          id: orderId,
          created_at: new Date().toISOString(),
          status: 'paid',
          payment_method: paymentMethod,
          transaction_id: paymentResult.transactionId,
          shipping_address: shipping,
          coupon: appliedCoupon,
          payment_details: paymentResult.details,
          items: cart.map(item => {
            const product = PRODUCTS.find(p => p.id == item.id) || {};
            return {
              id: item.id,
              title: product.title || 'Product',
              price: Number(product?.price || item.unit_price || 0),
              qty: item.qty || 1,
              size: item.size || 'M',
              image: product.image || (product.images && product.images[0]) || ''
            };
          }),
          subtotal,
          discount,
          tax,
          total
        };

        const orders = getLocalOrders();
        orders.push(order);
        saveLocalOrders(orders);

        localStorage.removeItem(CART_KEY);

        msg.className = 'p-3 rounded-lg text-sm bg-green-100 text-green-800 text-center font-medium';
        msg.innerText = `✓ Payment successful! Order ID: ${orderId}\nTransaction: ${paymentResult.transactionId}`;

        showToast('Payment completed successfully!', 'success');

        setTimeout(() => location.href = `order-view.html`, 2000);
      } else {
        throw new Error(paymentResult.message || 'Payment failed');
      }

    } catch (error) {
      demoPaymentGateway.hideProcessingOverlay();

      msg.className = 'p-3 rounded-lg text-sm bg-red-100 text-red-800 text-center font-medium';
      msg.innerText = `✗ Payment failed: ${error.message}`;
      msg.classList.remove('hidden');

      showToast(`Payment failed: ${error.message}`, 'error');
    }
  });
});