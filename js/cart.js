// ====== CLEAN & FIXED CART SYSTEM (BD FASHION) ======

let appliedCoupon = null;

const COUPONS = {
  'BD10': 0.10,
  'BD20': 0.20,
  'BD30': 0.30,
  'BD40': 0.40,
  'BD50': 0.50
};

const CART_KEY = "bd_cart";

// Load cart
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

// Save cart
function saveCart(data) {
  localStorage.setItem(CART_KEY, JSON.stringify(data));
  updateCartCount();
}

// Update cart badge
function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((s, it) => s + Number(it.qty), 0);
  const badge = document.getElementById("cart-count");

  if (badge) badge.textContent = total;
}

// Money formatter
const money = (v) => Math.round(Number(v));

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

// =======================
//     RENDER CART
// =======================
function render() {
  const cart = getCart();
  const container = document.getElementById("cartItems");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const emptyMsg = document.getElementById("emptyMsg");

  if (!container) {
    updateCartCount();
    return;
  }

  if (!cart.length) {
    container.innerHTML = "";
    if (checkoutBtn) checkoutBtn.style.display = "none";
    if (emptyMsg) emptyMsg.style.display = "block";
    updateSummary();
    updateCartCount();
    return;
  }

  if (emptyMsg) emptyMsg.style.display = "none";
  if (checkoutBtn) checkoutBtn.style.display = "block";

  container.innerHTML = cart
    .map((item, idx) => {
      const product = PRODUCTS.find(p => p.id == item.id);

      const title = product?.title || "Product";
      const image = product?.image || product?.images?.[0] || "";
      const unit = Number(product?.price || item.price);
      const total = unit * item.qty;

      return `
      <div class="cart-item">
        <div class="flex justify-between items-start mb-3">

          <div class="flex gap-3">
            <img src="${image}" class="w-20 h-20 object-cover rounded">
            <div>
              <div class="font-bold text-lg">${title}</div>
              <div class="text-xs text-gray-500 mt-1">
                Size: <span class="font-semibold">${item.size}</span>
              </div>
            </div>
          </div>

          <button onclick="removeItem(${idx})"
           class="text-red-600 hover:text-red-700 font-medium text-sm">✕ Remove</button>
        </div>

        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <span class="text-sm text-gray-600">Qty:</span>
            <input type="number" value="${item.qty}" min="1"
              onchange="updateQty(${idx}, this.value)" class="qty-input" />
          </div>

          <div class="text-lg font-bold text-blue-600">৳${money(total)}</div>
        </div>
      </div>
      `;
    })
    .join("");

  updateSummary();
  updateCartCount();
}

// =======================
//      REMOVE ITEM
// =======================
function removeItem(idx) {
  const cart = getCart();
  cart.splice(idx, 1);
  saveCart(cart);
  render();
}

// =======================
//     UPDATE QUANTITY
// =======================
function updateQty(idx, qty) {
  const cart = getCart();
  cart[idx].qty = Math.max(1, parseInt(qty) || 1);
  saveCart(cart);
  render();
}

// =======================
//       SUMMARY
// =======================
function updateSummary() {
  const cart = getCart();
  const subtotalEl = document.getElementById("subtotal");
  const discountEl = document.getElementById("discount");
  const taxEl = document.getElementById("tax");
  const totalEl = document.getElementById("total");

  if (!subtotalEl || !discountEl || !taxEl || !totalEl) {
    return;
  }

  let subtotal = 0;

  cart.forEach((it) => {
    const product = PRODUCTS.find(p => p.id == it.id);
    const price = Number(product?.price || it.price);
    subtotal += price * Number(it.qty);
  });

  let discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  let tax = subtotal * 0.05;
  let total = subtotal - discount + tax;

  subtotalEl.innerText = money(subtotal);
  discountEl.innerText = money(discount);
  taxEl.innerText = money(tax);
  totalEl.innerText = money(total);
}

// =======================
//      CLEAR CART
// =======================
const clearCartBtn = document.getElementById("clearCartBtn");
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    showConfirmDialog(
      '🗑️ Clear Cart',
      'Are you sure you want to clear your entire cart? This action cannot be undone.'
    ).then((confirmed) => {
      if (confirmed) {
        saveCart([]);
        appliedCoupon = null;

        const couponInput = document.getElementById("couponInput");
        const couponMsg = document.getElementById("couponMsg");

        if (couponInput) couponInput.value = "";
        if (couponMsg) couponMsg.innerText = "";

        render();
      }
    });
  });
}

// INIT
render();
updateCartCount();

// ============= END OF CART SYSTEM =============
