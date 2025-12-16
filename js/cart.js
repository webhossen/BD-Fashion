// ====== CLEAN & FIXED CART SYSTEM (BD FASHION) ======

let appliedCoupon = null;

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
const money = (v) => Number(v).toFixed(2);

// =======================
//     RENDER CART
// =======================
function render() {
  const cart = getCart();
  const container = document.getElementById("cartItems");

  if (!cart.length) {
    container.innerHTML = "";
    document.getElementById("checkoutBtn").style.display = "none";
    document.getElementById("emptyMsg").style.display = "block";
    updateSummary();
    updateCartCount();
    return;
  }

  document.getElementById("emptyMsg").style.display = "none";
  document.getElementById("checkoutBtn").style.display = "block";

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
  let subtotal = 0;

  cart.forEach((it) => {
    const product = PRODUCTS.find(p => p.id == it.id);
    const price = Number(product?.price || it.price);
    subtotal += price * Number(it.qty);
  });

  let discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  let tax = (subtotal - discount) * 0.05;
  let total = subtotal - discount + tax;

  document.getElementById("subtotal").innerText = money(subtotal);
  document.getElementById("discount").innerText = money(discount);
  document.getElementById("tax").innerText = money(tax);
  document.getElementById("total").innerText = money(total);
}

// =======================
//     APPLY COUPON
// =======================
document.getElementById("applyCouponBtn").addEventListener("click", () => {
  const input = document.getElementById("couponInput").value.trim().toUpperCase();
  if (!input) return;

  const subtotal = Number(document.getElementById("subtotal").innerText);

  const discountAmount = parseFloat((subtotal * 0.1).toFixed(2));

  appliedCoupon = {
    code: input,
    discountAmount: discountAmount,
  };

  const msg = document.getElementById("couponMsg");
  msg.className = "text-xs text-green-600 font-medium";
  msg.innerText = `✓ Coupon "${input}" applied! 10% off`;

  updateSummary();
});

// =======================
//      CLEAR CART
// =======================
document.getElementById("clearCartBtn").addEventListener("click", () => {
  if (confirm("Clear entire cart?")) {
    saveCart([]);
    appliedCoupon = null;

    document.getElementById("couponInput").value = "";
    document.getElementById("couponMsg").innerText = "";

    render();
  }
});

// INIT
render();
updateCartCount();

// ============= END OF CART SYSTEM =============
