// Demo Payment Gateway - Looks exactly like real payment methods
class DemoPaymentGateway {
  constructor() {
    this.isProcessing = false;
    this.currentPaymentMethod = null;
  }

  // Initialize payment method
  async initializePaymentMethod(paymentMethod) {
    this.currentPaymentMethod = paymentMethod;

    switch (paymentMethod) {
      case 'credit_card':
      case 'debit_card':
      case 'mastercard':
      case 'visa':
        return this.initializeCardPayment();
      case 'paypal':
        return this.initializePayPalPayment();
      case 'bkash':
        return this.initializeBKashPayment();
      case 'nagad':
        return this.initializeNagadPayment();
      case 'rocket':
        return this.initializeRocketPayment();
      case 'cash_on_delivery':
        return this.initializeCashOnDelivery();
      default:
        throw new Error('Unsupported payment method');
    }
  }

  // Card Payment Initialization
  async initializeCardPayment() {
    return new Promise((resolve) => {
      this.showCardPaymentModal(resolve);
    });
  }

  // PayPal Payment Initialization
  async initializePayPalPayment() {
    return new Promise((resolve) => {
      this.showPayPalModal(resolve);
    });
  }

  // bKash Payment Initialization
  async initializeBKashPayment() {
    return new Promise((resolve) => {
      this.showBKashModal(resolve);
    });
  }

  // Nagad Payment Initialization
  async initializeNagadPayment() {
    return new Promise((resolve) => {
      this.showNagadModal(resolve);
    });
  }

  // Rocket Payment Initialization
  async initializeRocketPayment() {
    return new Promise((resolve) => {
      this.showRocketModal(resolve);
    });
  }

  // Process payment with demo logic
  async processPayment(amount, orderDetails) {
    this.isProcessing = true;

    try {
      // Simulate network delay
      await this.delay(2000);

      // Demo validation - randomly succeed/fail for realism
      const success = Math.random() > 0.1; // 90% success rate

      if (success) {
        const transactionId = this.generateTransactionId();
        return {
          success: true,
          transactionId,
          message: 'Payment processed successfully',
          details: {
            method: this.currentPaymentMethod,
            amount: amount,
            timestamp: new Date().toISOString(),
            status: 'completed'
          }
        };
      } else {
        throw new Error(this.getRandomFailureReason());
      }
    } finally {
      this.isProcessing = false;
    }
  }

  // Generate realistic transaction ID
  generateTransactionId() {
    const prefixes = {
      credit_card: 'CC',
      debit_card: 'DC',
      mastercard: 'MC',
      visa: 'VI',
      paypal: 'PP',
      bkash: 'BK',
      nagad: 'NG',
      rocket: 'RK'
    };

    const prefix = prefixes[this.currentPaymentMethod] || 'TXN';
    return `${prefix}${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
  }

  // Random failure reasons for realism
  getRandomFailureReason() {
    const reasons = [
      'Card declined by issuer',
      'Insufficient funds',
      'Invalid card number',
      'Expired card',
      'Transaction timeout',
      'Network error',
      'Payment gateway unavailable'
    ];
    return reasons[Math.floor(Math.random() * reasons.length)];
  }

  // Utility delay function
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Show card payment modal
  showCardPaymentModal(resolve) {
    const modal = this.createModal('card-payment-modal', `
      <div class="text-center mb-6">
        <div class="text-6xl mb-4">💳</div>
        <h3 class="text-2xl font-bold text-gray-800">Secure Card Payment</h3>
        <p class="text-gray-600 mt-2">Enter your card details to complete the payment</p>
      </div>

      <form id="cardForm" class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
          <div class="relative">
            <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456"
                   class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                   maxlength="19">
            <div class="absolute left-3 top-3 text-gray-400 text-xl">💳</div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
            <input type="text" id="expiryDate" placeholder="MM/YY"
                   class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                   maxlength="5">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
            <input type="text" id="cvv" placeholder="123"
                   class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                   maxlength="4">
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Cardholder Name</label>
          <input type="text" id="cardholderName" placeholder="John Doe"
                 class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition">
        </div>

        <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div class="flex items-center gap-2 text-blue-800 text-sm">
            <span class="text-lg">🔒</span>
            <span>Your payment information is encrypted and secure</span>
          </div>
        </div>

        <div class="flex gap-3 pt-4">
          <button type="button" id="cancelCardBtn"
                  class="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition">
            Cancel
          </button>
          <button type="submit" id="payCardBtn"
                  class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition">
            Pay Now
          </button>
        </div>
      </form>

      <div class="text-xs text-gray-500 mt-4 text-center">
        Demo: Use any valid format (e.g., 4111 1111 1111 1111)
      </div>
    `);

    // Card number formatting
    const cardNumberInput = modal.querySelector('#cardNumber');
    cardNumberInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      let formatted = value.replace(/(.{4})/g, '$1 ').trim();
      e.target.value = formatted;
    });

    // Expiry date formatting
    const expiryInput = modal.querySelector('#expiryDate');
    expiryInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
      }
      e.target.value = value;
    });

    // Form submission
    const form = modal.querySelector('#cardForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const cardNumber = cardNumberInput.value.replace(/\s/g, '');
      const expiry = expiryInput.value;
      const cvv = modal.querySelector('#cvv').value;
      const name = modal.querySelector('#cardholderName').value;

      if (!cardNumber || !expiry || !cvv || !name) {
        this.showModalMessage('Please fill in all card details', 'error');
        return;
      }

      if (cardNumber.length < 13) {
        this.showModalMessage('Invalid card number', 'error');
        return;
      }

      modal.remove();
      resolve({
        method: 'card',
        details: { cardNumber: '**** **** **** ' + cardNumber.slice(-4), name }
      });
    });

    modal.querySelector('#cancelCardBtn').addEventListener('click', () => {
      modal.remove();
      resolve(null);
    });
  }

  // Show PayPal modal
  showPayPalModal(resolve) {
    const modal = this.createModal('paypal-modal', `
      <div class="text-center mb-6">
        <div class="mb-4">
          <svg class="w-16 h-16 mx-auto" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="8" fill="#003087"/>
            <path d="M14 14H24C26.2 14 28 15.8 28 18C28 19.5 27 20.7 25.5 21C27 21.4 28 22.6 28 24C28 26.2 26.2 28 24 28H14L14 14Z" fill="white"/>
            <path d="M18 18H23C24.1 18 25 18.9 25 20C25 21.1 24.1 22 23 22H18V18Z" fill="#003087"/>
            <path d="M18 22H24C25.1 22 26 22.9 26 24C26 25.1 25.1 26 24 26H18V22Z" fill="#003087"/>
            <circle cx="32" cy="20" r="2" fill="white"/>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-800">PayPal Checkout</h3>
        <p class="text-gray-600 mt-2">Sign in to your PayPal account to complete payment</p>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Email or Mobile Number</label>
          <input type="email" id="paypalEmail" placeholder="your@email.com"
                 class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition">
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
          <input type="password" id="paypalPassword" placeholder="Enter your password"
                 class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition">
        </div>

        <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div class="flex items-center gap-2 text-yellow-800 text-sm">
            <span class="text-lg">⚠️</span>
            <span>This is a demo. Use any email/password combination.</span>
          </div>
        </div>

        <div class="flex gap-3 pt-4">
          <button type="button" id="cancelPayPalBtn"
                  class="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition">
            Cancel
          </button>
          <button type="button" id="loginPayPalBtn"
                  class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition">
            Log In & Pay
          </button>
        </div>
      </div>

      <div class="text-xs text-gray-500 mt-4 text-center">
        Demo: Any email/password will work
      </div>
    `);

    modal.querySelector('#loginPayPalBtn').addEventListener('click', () => {
      const email = modal.querySelector('#paypalEmail').value;
      const password = modal.querySelector('#paypalPassword').value;

      if (!email || !password) {
        this.showModalMessage('Please enter email and password', 'error');
        return;
      }

      modal.remove();
      resolve({
        method: 'paypal',
        details: { email: email }
      });
    });

    modal.querySelector('#cancelPayPalBtn').addEventListener('click', () => {
      modal.remove();
      resolve(null);
    });
  }

  // Show bKash modal
  showBKashModal(resolve) {
    const modal = this.createModal('bkash-modal', `
      <div class="text-center mb-6">
        <div class="text-6xl mb-4">📱</div>
        <h3 class="text-2xl font-bold text-gray-800">bKash Payment</h3>
        <p class="text-gray-600 mt-2">Enter your bKash account details</p>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">bKash Account Number</label>
          <input type="tel" id="bkashNumber" placeholder="01XXXXXXXXX"
                 class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                 maxlength="11">
        </div>

        <div class="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div class="text-orange-800 text-sm">
            <div class="font-semibold mb-2">Payment Steps:</div>
            <ol class="list-decimal list-inside space-y-1 text-xs">
              <li>Enter your bKash number</li>
              <li>You'll receive a payment confirmation</li>
              <li>Check your bKash app and approve the payment</li>
            </ol>
          </div>
        </div>

        <div class="bg-green-50 p-4 rounded-lg border border-green-200">
          <div class="flex items-center gap-2 text-green-800 text-sm">
            <span class="text-lg">🔒</span>
            <span>Secure payment through bKash gateway</span>
          </div>
        </div>

        <div class="flex gap-3 pt-4">
          <button type="button" id="cancelBKashBtn"
                  class="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition">
            Cancel
          </button>
          <button type="button" id="payBKashBtn"
                  class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition">
            Pay with bKash
          </button>
        </div>
      </div>

      <div class="text-xs text-gray-500 mt-4 text-center">
        Demo: Use any 11-digit number starting with 01
      </div>
    `);

    modal.querySelector('#payBKashBtn').addEventListener('click', () => {
      const number = modal.querySelector('#bkashNumber').value;

      if (!number || number.length !== 11 || !number.startsWith('01')) {
        this.showModalMessage('Please enter a valid bKash number (11 digits, starts with 01)', 'error');
        return;
      }

      modal.remove();
      resolve({
        method: 'bkash',
        details: { number: number }
      });
    });

    modal.querySelector('#cancelBKashBtn').addEventListener('click', () => {
      modal.remove();
      resolve(null);
    });
  }

  // Show Nagad modal
  showNagadModal(resolve) {
    const modal = this.createModal('nagad-modal', `
      <div class="text-center mb-6">
        <div class="text-6xl mb-4">📱</div>
        <h3 class="text-2xl font-bold text-gray-800">Nagad Payment</h3>
        <p class="text-gray-600 mt-2">Enter your Nagad account details</p>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Nagad Account Number</label>
          <input type="tel" id="nagadNumber" placeholder="01XXXXXXXXX"
                 class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                 maxlength="11">
        </div>

        <div class="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div class="text-orange-800 text-sm">
            <div class="font-semibold mb-2">Payment Steps:</div>
            <ol class="list-decimal list-inside space-y-1 text-xs">
              <li>Enter your Nagad number</li>
              <li>You'll receive a payment confirmation</li>
              <li>Check your Nagad app and approve the payment</li>
            </ol>
          </div>
        </div>

        <div class="bg-green-50 p-4 rounded-lg border border-green-200">
          <div class="flex items-center gap-2 text-green-800 text-sm">
            <span class="text-lg">🔒</span>
            <span>Secure payment through Nagad gateway</span>
          </div>
        </div>

        <div class="flex gap-3 pt-4">
          <button type="button" id="cancelNagadBtn"
                  class="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition">
            Cancel
          </button>
          <button type="button" id="payNagadBtn"
                  class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition">
            Pay with Nagad
          </button>
        </div>
      </div>

      <div class="text-xs text-gray-500 mt-4 text-center">
        Demo: Use any 11-digit number starting with 01
      </div>
    `);

    modal.querySelector('#payNagadBtn').addEventListener('click', () => {
      const number = modal.querySelector('#nagadNumber').value;

      if (!number || number.length !== 11 || !number.startsWith('01')) {
        this.showModalMessage('Please enter a valid Nagad number (11 digits, starts with 01)', 'error');
        return;
      }

      modal.remove();
      resolve({
        method: 'nagad',
        details: { number: number }
      });
    });

    modal.querySelector('#cancelNagadBtn').addEventListener('click', () => {
      modal.remove();
      resolve(null);
    });
  }

  // Show Rocket modal
  showRocketModal(resolve) {
    const modal = this.createModal('rocket-modal', `
      <div class="text-center mb-6">
        <div class="text-6xl mb-4">📱</div>
        <h3 class="text-2xl font-bold text-gray-800">Rocket Payment</h3>
        <p class="text-gray-600 mt-2">Enter your Rocket account details</p>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Rocket Account Number</label>
          <input type="tel" id="rocketNumber" placeholder="01XXXXXXXXX"
                 class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                 maxlength="11">
        </div>

        <div class="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div class="text-orange-800 text-sm">
            <div class="font-semibold mb-2">Payment Steps:</div>
            <ol class="list-decimal list-inside space-y-1 text-xs">
              <li>Enter your Rocket number</li>
              <li>You'll receive a payment confirmation</li>
              <li>Check your Rocket app and approve the payment</li>
            </ol>
          </div>
        </div>

        <div class="bg-green-50 p-4 rounded-lg border border-green-200">
          <div class="flex items-center gap-2 text-green-800 text-sm">
            <span class="text-lg">🔒</span>
            <span>Secure payment through Rocket gateway</span>
          </div>
        </div>

        <div class="flex gap-3 pt-4">
          <button type="button" id="cancelRocketBtn"
                  class="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition">
            Cancel
          </button>
          <button type="button" id="payRocketBtn"
                  class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition">
            Pay with Rocket
          </button>
        </div>
      </div>

      <div class="text-xs text-gray-500 mt-4 text-center">
        Demo: Use any 11-digit number starting with 01
      </div>
    `);

    modal.querySelector('#payRocketBtn').addEventListener('click', () => {
      const number = modal.querySelector('#rocketNumber').value;

      if (!number || number.length !== 11 || !number.startsWith('01')) {
        this.showModalMessage('Please enter a valid Rocket number (11 digits, starts with 01)', 'error');
        return;
      }

      modal.remove();
      resolve({
        method: 'rocket',
        details: { number: number }
      });
    });

    modal.querySelector('#cancelRocketBtn').addEventListener('click', () => {
      modal.remove();
      resolve(null);
    });
  }

  // Initialize Cash on Delivery payment
  async initializeCashOnDelivery() {
    return new Promise((resolve) => {
      const modal = this.createModal('cod-modal', `
        <div class="text-center mb-6">
          <div class="text-6xl mb-4">💵</div>
          <h3 class="text-2xl font-bold text-gray-800">Cash on Delivery</h3>
          <p class="text-gray-600 mt-2">Pay when you receive your order</p>
        </div>

        <div class="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
          <div class="text-green-800 text-sm">
            <div class="font-semibold mb-2">How it works:</div>
            <ol class="list-decimal list-inside space-y-1 text-xs">
              <li>Place your order now</li>
              <li>Receive your items at your doorstep</li>
              <li>Pay the delivery person in cash</li>
              <li>No advance payment required</li>
            </ol>
          </div>
        </div>

        <div class="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
          <div class="flex items-center gap-2 text-blue-800 text-sm">
            <span class="text-lg">ℹ️</span>
            <span>Additional delivery charges may apply for COD orders</span>
          </div>
        </div>

        <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
          <div class="text-yellow-800 text-sm">
            <div class="font-semibold mb-2">Important Notes:</div>
            <ul class="list-disc list-inside space-y-1 text-xs">
              <li>Please have exact change ready</li>
              <li>Verify items before payment</li>
              <li>COD available for orders under ৳50,000</li>
            </ul>
          </div>
        </div>

        <div class="flex gap-3 pt-4">
          <button type="button" id="cancelCodBtn"
                  class="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition">
            Cancel
          </button>
          <button type="button" id="confirmCodBtn"
                  class="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition">
            Confirm COD Order
          </button>
        </div>
      `);

      modal.querySelector('#confirmCodBtn').addEventListener('click', () => {
        modal.remove();
        resolve({
          method: 'cash_on_delivery',
          details: {
            payment_type: 'Cash on Delivery',
            status: 'pending',
            instructions: 'Pay delivery person upon receipt'
          }
        });
      });

      modal.querySelector('#cancelCodBtn').addEventListener('click', () => {
        modal.remove();
        resolve(null);
      });
    });
  }

  // Create modal utility
  createModal(id, content) {
    // Remove existing modal if any
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = id;
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.3s ease-out;
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
      background: white;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
      max-width: 480px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      animation: modalSlideIn 0.3s ease-out;
    `;

    modal.innerHTML = content;
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Add modal styles if not already present
    if (!document.getElementById('demo-payment-styles')) {
      const style = document.createElement('style');
      style.id = 'demo-payment-styles';
      style.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideIn {
          from {
            transform: scale(0.95) translateY(-20px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        .payment-spinner {
          border: 3px solid #f3f3f3;
          border-top: 3px solid #3498db;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }

    return overlay;
  }

  // Show message in modal
  showModalMessage(message, type = 'info') {
    const colors = {
      success: 'green',
      error: 'red',
      info: 'blue'
    };

    const color = colors[type] || 'blue';
    const existing = document.querySelector('.modal-message');
    if (existing) existing.remove();

    const msg = document.createElement('div');
    msg.className = `modal-message p-3 rounded-lg text-sm bg-${color}-100 text-${color}-800 text-center font-medium mt-4`;
    msg.textContent = message;

    const modal = document.querySelector('[id$="-modal"] .space-y-4');
    if (modal) {
      modal.appendChild(msg);
      setTimeout(() => msg.remove(), 3000);
    }
  }

  // Show processing overlay
  showProcessingOverlay(message = 'Processing payment...') {
    const overlay = document.createElement('div');
    overlay.id = 'processing-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      z-index: 10001;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
      animation: fadeIn 0.3s ease-out;
    `;

    overlay.innerHTML = `
      <div class="payment-spinner mb-4"></div>
      <div class="text-xl font-semibold mb-2">${message}</div>
      <div class="text-sm opacity-80">Please wait, this may take a few seconds...</div>
    `;

    document.body.appendChild(overlay);
    return overlay;
  }

  // Hide processing overlay
  hideProcessingOverlay() {
    const overlay = document.getElementById('processing-overlay');
    if (overlay) {
      overlay.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => overlay.remove(), 300);
    }
  }
}

// Global demo payment gateway instance
const demoPaymentGateway = new DemoPaymentGateway();