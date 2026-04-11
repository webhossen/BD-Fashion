// Enhanced Profile Page with Full Customization
class UserProfile {
    constructor() {
        this.user = this.getCurrentUser();
        this.userPreferences = this.loadPreferences();
        this.init();
    }

    // Tracking constants
    TRACKING_STEPS = [
        { status: 'pending', label: 'Order Received', icon: '🕓', minSeconds: 0 },
        { status: 'paid', label: 'Payment Confirmed', icon: '💳', minSeconds: 20 },
        { status: 'processing', label: 'Preparing Order', icon: '⚙️', minSeconds: 40 },
        { status: 'shipped', label: 'Shipped', icon: '🚚', minSeconds: 80 },
        { status: 'delivered', label: 'Delivered', icon: '✅', minSeconds: 120 }
    ];

    STATUS_PRIORITY = {
        'pending': 0,
        'paid': 1,
        'processing': 2,
        'shipped': 3,
        'delivered': 4,
        'cancelled': 5
    };

    getUpdatedOrderStatus(order) {
        if (!order.created_at) return order.status;
        if (order.status === 'cancelled' || order.status === 'delivered') return order.status;

        const elapsedSeconds = Math.floor((Date.now() - new Date(order.created_at).getTime()) / 1000);
        let nextStatus = order.status;

        for (let i = this.TRACKING_STEPS.length - 1; i >= 0; i--) {
            if (elapsedSeconds >= this.TRACKING_STEPS[i].minSeconds) {
                nextStatus = this.TRACKING_STEPS[i].status;
                break;
            }
        }

        if (this.STATUS_PRIORITY[nextStatus] > this.STATUS_PRIORITY[order.status]) {
            return nextStatus;
        }

        return order.status;
    }

    getNextUpdateText(order) {
        if (!order.created_at || order.status === 'cancelled' || order.status === 'delivered') return '';

        const elapsedSeconds = Math.floor((Date.now() - new Date(order.created_at).getTime()) / 1000);
        const currentIndex = this.TRACKING_STEPS.findIndex(step => step.status === order.status);
        const nextStep = this.TRACKING_STEPS[currentIndex + 1];

        if (!nextStep) return 'Final status reached.';

        const remainingSeconds = Math.max(0, nextStep.minSeconds - elapsedSeconds);
        if (remainingSeconds === 0) return 'Updating now...';
        return `Next update in ${remainingSeconds}s`;
    }

    createTrackingHTML(order) {
        const activeIndex = this.TRACKING_STEPS.findIndex(step => step.status === order.status);
        const nextText = this.getNextUpdateText(order);

        const stepsHTML = this.TRACKING_STEPS.map((step, idx) => {
            const isCompleted = idx <= activeIndex;
            const isActive = idx === activeIndex;

            return `
                <div class="tracking-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}">
                    <div class="step-icon">${step.icon}</div>
                    <div class="step-label">${step.label}</div>
                </div>
            `;
        }).join('');

        return `
            <div class="tracking-section">
                <div class="tracking-header">📍 Real-time order tracking</div>
                <div class="tracking-steps">
                    ${stepsHTML}
                </div>
                <div class="tracking-subtext">${nextText}</div>
            </div>
        `;
    }

    getCurrentUser() {
        const session = localStorage.getItem('demo_session');
        if (!session) {
            window.location.href = 'login.html';
            return null;
        }
        return JSON.parse(session);
    }

    loadPreferences() {
        const prefs = localStorage.getItem('user_preferences_' + this.user.id);
        return prefs ? JSON.parse(prefs) : {
            smsNotif: true,
            emailNotif: true,
            orderUpdates: true,
            newsletter: true
        };
    }

    savePreferences() {
        localStorage.setItem('user_preferences_' + this.user.id, JSON.stringify(this.userPreferences));
    }

    init() {
        this.populateUserInfo();
        this.renderAddressBook();
        this.renderOrders();
        this.setupEventListeners();
    }

    // Populate user information
    populateUserInfo() {
        document.getElementById('userName').textContent = this.user.name;
        document.getElementById('userEmail').textContent = this.user.email;
        document.getElementById('userPhone').textContent = this.user.phone || 'Not provided';
        
        // Fill edit form
        document.getElementById('editName').value = this.user.name;
        document.getElementById('editEmail').value = this.user.email;
        document.getElementById('editPhone').value = this.user.phone || '';
    }

    renderAddressBook() {
        const address = this.getDefaultAddress();
        document.getElementById('shippingName').textContent = address.name;
        document.getElementById('shippingAddress').textContent = address.shipping;
        document.getElementById('shippingPhone').textContent = address.phone;

        document.getElementById('billingName').textContent = address.name;
        document.getElementById('billingAddress').textContent = address.billing;
        document.getElementById('billingPhone').textContent = address.phone;

        // Store address for edit form
        this.currentAddress = address;
    }

    getDefaultAddress() {
        // Check if address was saved by user
        const addressKey = 'user_address_' + this.user.id;
        const savedAddress = localStorage.getItem(addressKey);
        if (savedAddress) {
            return JSON.parse(savedAddress);
        }

        // Otherwise try to get from last order
        const orders = JSON.parse(localStorage.getItem('bd_orders') || '[]');
        const userOrders = orders.filter(order => order.shipping_address && order.shipping_address.email === this.user.email);
        const lastOrder = userOrders[0] || null;

        if (lastOrder) {
            const addressText = `${lastOrder.shipping_address.address}, ${lastOrder.shipping_address.city} - ${lastOrder.shipping_address.postcode || ''}`;
            return {
                name: `${lastOrder.shipping_address.full_name || this.user.name}`,
                phone: lastOrder.shipping_address.phone || this.user.phone || '-',
                shipping: addressText,
                billing: addressText
            };
        }

        // Default fallback address
        return {
            name: this.user.name,
            phone: this.user.phone || '+880 1908764507',
            shipping: 'BTCL colony, city Bazar road, Rangpur - Rangpur - Kachari Bazar',
            billing: 'BTCL colony, city Bazar road, Rangpur - Rangpur - Kachari Bazar'
        };
    }

    renderOrders() {
        const orders = JSON.parse(localStorage.getItem('bd_orders') || '[]');
        const userOrders = orders
            .filter(order => order.shipping_address?.email?.toLowerCase() === this.user.email.toLowerCase())
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        const container = document.getElementById('ordersList');
        if (!container) return;

        if (!userOrders.length) {
            container.innerHTML = `
                <div class="text-gray-600 text-sm">
                    No recent orders yet. <a href="products.html" class="text-blue-600 hover:underline">Start shopping</a> to place your first order.
                </div>
            `;
            return;
        }

        // Update order statuses and save if changed
        let updated = false;
        const normalizedOrders = userOrders.map(order => {
            const newStatus = this.getUpdatedOrderStatus(order);
            if (newStatus !== order.status) {
                order.status = newStatus;
                updated = true;
            }
            return order;
        });

        if (updated) {
            const allOrders = JSON.parse(localStorage.getItem('bd_orders') || '[]');
            normalizedOrders.forEach(updatedOrder => {
                const index = allOrders.findIndex(o => o.id === updatedOrder.id);
                if (index !== -1) {
                    allOrders[index] = updatedOrder;
                }
            });
            localStorage.setItem('bd_orders', JSON.stringify(allOrders));
        }

        container.innerHTML = normalizedOrders.slice(0, 3).map(order => this.createOrderCard(order)).join('');

        // Start periodic refresh
        if (!this.refreshInterval) {
            this.refreshInterval = setInterval(() => this.renderOrders(), 10000);
        }
    }

    createOrderCard(order) {
        const statusClass = {
            pending: 'bg-yellow-100 text-yellow-800',
            paid: 'bg-blue-100 text-blue-800',
            processing: 'bg-purple-100 text-purple-800',
            shipped: 'bg-orange-100 text-orange-800',
            delivered: 'bg-green-100 text-green-800',
            cancelled: 'bg-gray-100 text-gray-800'
        }[order.status] || 'bg-gray-100 text-gray-800';

        const statusLabel = order.status.charAt(0).toUpperCase() + order.status.slice(1);
        const totalItems = order.items?.reduce((sum, item) => sum + Number(item.qty || 0), 0) || 0;
        const itemTitle = order.items?.[0]?.title || 'Order item';
        const orderDate = new Date(order.created_at).toLocaleDateString();

        return `
            <div class="border border-gray-200 rounded-xl p-4 space-y-3">
              <div class="flex justify-between items-start gap-4">
                <div>
                  <div class="text-sm text-gray-500">Order #${order.id}</div>
                  <div class="font-semibold">${itemTitle}</div>
                  <div class="text-xs text-gray-500">Placed ${orderDate}</div>
                </div>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusClass}">
                  ${statusLabel}
                </span>
              </div>
              <div class="grid grid-cols-2 gap-3 text-sm text-gray-600">
                <div><strong>Total:</strong> ৳${Math.round(order.total || 0)}</div>
                <div><strong>Items:</strong> ${totalItems}</div>
              </div>
              ${this.createTrackingHTML(order)}
              <div class="flex gap-2 flex-wrap">
                <a href="order-view.html?id=${order.id}" class="flex-1 w-full sm:w-auto px-3 py-2 bg-blue-600 text-white rounded-lg text-center text-sm hover:bg-blue-700 transition">View Details</a>
                <a href="order-view.html" class="flex-1 w-full sm:w-auto px-3 py-2 bg-gray-100 text-gray-900 rounded-lg text-center text-sm hover:bg-gray-200 transition">All Orders</a>
              </div>
            </div>
        `;
    }

// Load and display designs

    // Load and display designs
    loadDesigns() {
        const designs = [
            {
                id: 1,
                name: 'Custom Logo Design',
                preview_url: 'Image/favicon-256.png'
            },
            {
                id: 2,
                name: 'Summer Vibes',
                preview_url: 'Image/favicon-256.png'
            },
            {
                id: 3,
                name: 'Brand Collection',
                preview_url: 'Image/favicon-256.png'
            }
        ];

        document.getElementById('totalDesigns').textContent = designs.length;

        const designsList = document.getElementById('designsList');
        if (designs.length > 0) {
            designsList.innerHTML = designs.map(design => `
                <div class="border rounded-lg overflow-hidden hover:shadow-lg transition">
                    <img src="${design.preview_url}" alt="${design.name}" class="w-full h-40 object-cover bg-gray-100"/>
                    <div class="p-3 bg-white">
                        <div class="font-semibold text-sm truncate">${design.name}</div>
                        <div class="flex gap-2 mt-2">
                            <button class="flex-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition" onclick="alert('Edit design feature coming soon!')">Edit</button>
                            <button class="flex-1 px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition" onclick="alert('Reorder this design feature coming soon!')">Reorder</button>
                        </div>
                    </div>
                </div>
            `).join('');
        } else {
            designsList.innerHTML = '<div class="text-gray-600 text-sm col-span-4 text-center py-8">No saved designs yet</div>';
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Edit profile
        document.getElementById('editProfileBtn').addEventListener('click', () => {
            document.getElementById('editProfileModal').classList.remove('hidden');
        });

        document.getElementById('editAddressBtn')?.addEventListener('click', () => {
            // Populate address edit form
            const address = this.currentAddress || this.getDefaultAddress();
            document.getElementById('editAddressName').value = address.name || '';
            document.getElementById('editShippingAddress').value = address.shipping || '';
            document.getElementById('editBillingAddress').value = address.billing || '';
            document.getElementById('editAddressPhone').value = address.phone || '';
            // Open address edit modal
            document.getElementById('editAddressModal').classList.remove('hidden');
        });

        document.getElementById('closeEditModal').addEventListener('click', () => {
            document.getElementById('editProfileModal').classList.add('hidden');
        });

        document.getElementById('editProfileForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProfileChanges();
        });

        // Change password
        document.getElementById('changePasswordBtn').addEventListener('click', () => {
            document.getElementById('changePasswordModal').classList.remove('hidden');
        });

        document.getElementById('closePasswordModal').addEventListener('click', () => {
            document.getElementById('changePasswordModal').classList.add('hidden');
        });

        document.getElementById('changePasswordForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.changePassword();
        });

        // Edit address
        document.getElementById('closeAddressModal').addEventListener('click', () => {
            document.getElementById('editAddressModal').classList.add('hidden');
        });

        document.getElementById('editAddressForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveAddressChanges();
        });

        // Preference toggles
        document.querySelectorAll('.preference-toggle').forEach(toggle => {
            toggle.checked = this.userPreferences[toggle.dataset.pref] ?? true;
            toggle.addEventListener('change', () => {
                this.userPreferences[toggle.dataset.pref] = toggle.checked;
                this.savePreferences();
                this.showNotification(`Preference updated!`);
            });
        });

        // Profile option buttons
        document.getElementById('btnViewOrders')?.addEventListener('click', () => this.scrollToSection('ordersList'));
        document.getElementById('btnSavedDesigns')?.addEventListener('click', () => this.scrollToSection('designsList'));
        document.getElementById('btnEditProfileAction')?.addEventListener('click', () => document.getElementById('editProfileModal').classList.remove('hidden'));
        document.getElementById('btnChangePasswordAction')?.addEventListener('click', () => document.getElementById('changePasswordModal').classList.remove('hidden'));
        document.getElementById('btnNotifications')?.addEventListener('click', () => this.scrollToSection('notificationSettings'));
        document.getElementById('btnShop')?.addEventListener('click', () => window.location.href = 'products.html');
        document.getElementById('btnCart')?.addEventListener('click', () => window.location.href = 'cart.html');
        document.getElementById('btnLogout')?.addEventListener('click', () => this.logout());

        // Close modals on outside click
        document.getElementById('editProfileModal').addEventListener('click', (e) => {
            if (e.target.id === 'editProfileModal') {
                document.getElementById('editProfileModal').classList.add('hidden');
            }
        });

        document.getElementById('changePasswordModal').addEventListener('click', (e) => {
            if (e.target.id === 'changePasswordModal') {
                document.getElementById('changePasswordModal').classList.add('hidden');
            }
        });

        // Close address modal on outside click
        document.getElementById('editAddressModal').addEventListener('click', (e) => {
            if (e.target.id === 'editAddressModal') {
                document.getElementById('editAddressModal').classList.add('hidden');
            }
        });
    }

    // Save profile changes
    saveProfileChanges() {
        const name = document.getElementById('editName').value;
        const email = document.getElementById('editEmail').value;
        const phone = document.getElementById('editPhone').value;

        // Validate
        if (!name || !email || !phone) {
            this.showErrorNotification('Please fill in all fields');
            return;
        }

        // Check if email already exists (except current user)
        const allUsers = JSON.parse(localStorage.getItem('demo_users') || '[]');
        const emailExists = allUsers.some(u => u.email.toLowerCase() === email.toLowerCase() && u.id !== this.user.id);
        
        if (emailExists) {
            this.showErrorNotification('This email is already in use by another account');
            return;
        }

        // Update user data
        this.user.name = name;
        this.user.email = email;
        this.user.phone = phone;

        // Update session
        localStorage.setItem('demo_session', JSON.stringify(this.user));

        // Update in users list
        const users = JSON.parse(localStorage.getItem('demo_users') || '[]');
        const userIndex = users.findIndex(u => u.id === this.user.id);
        if (userIndex >= 0) {
            users[userIndex] = this.user;
            localStorage.setItem('demo_users', JSON.stringify(users));
        }

        this.showNotification('Profile updated successfully!');
        document.getElementById('editProfileModal').classList.add('hidden');
        this.populateUserInfo();
    }

    // Save address changes
    saveAddressChanges() {
        const name = document.getElementById('editAddressName').value;
        const shippingAddress = document.getElementById('editShippingAddress').value;
        const billingAddress = document.getElementById('editBillingAddress').value;
        const phone = document.getElementById('editAddressPhone').value;

        // Validate
        if (!name || !shippingAddress || !billingAddress || !phone) {
            this.showErrorNotification('Please fill in all address fields');
            return;
        }

        // Update current address
        this.currentAddress = {
            name: name,
            shipping: shippingAddress,
            billing: billingAddress,
            phone: phone
        };

        // Save to localStorage
        const addressKey = 'user_address_' + this.user.id;
        localStorage.setItem(addressKey, JSON.stringify(this.currentAddress));

        this.showNotification('Address updated successfully!');
        document.getElementById('editAddressModal').classList.add('hidden');
        this.renderAddressBook();
    }

    // Change password
    changePassword() {
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validate
        if (currentPassword !== this.user.password) {
            this.showErrorNotification('Current password is incorrect');
            return;
        }

        if (newPassword.length < 6) {
            this.showErrorNotification('New password must be at least 6 characters long');
            return;
        }

        if (newPassword !== confirmPassword) {
            this.showErrorNotification('Passwords do not match');
            return;
        }

        // Update password
        this.user.password = newPassword;
        localStorage.setItem('demo_session', JSON.stringify(this.user));

        // Update in users list
        const users = JSON.parse(localStorage.getItem('demo_users') || '[]');
        const userIndex = users.findIndex(u => u.id === this.user.id);
        if (userIndex >= 0) {
            users[userIndex] = this.user;
            localStorage.setItem('demo_users', JSON.stringify(users));
        }

        // Clear form
        document.getElementById('changePasswordForm').reset();
        this.showNotification('Password changed successfully!');
        document.getElementById('changePasswordModal').classList.add('hidden');
    }

    // Show notification
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Show error notification
    showErrorNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 4000); // Show error messages a bit longer
    }

    // Scroll to a page section
    scrollToSection(id) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Logout user
    logout() {
        localStorage.removeItem('demo_session');
        window.location.href = 'login.html';
    }

    // Cleanup method to clear intervals
    cleanup() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
    }
}

// Initialize profile when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.profileInstance = new UserProfile();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.profileInstance) {
        window.profileInstance.cleanup();
    }
});