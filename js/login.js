// Demo Login/Signup System - Looks exactly like real authentication
class DemoAuth {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = null;
        this.redirectUrl = this.getRedirectUrl();
        this.init();
    }

    getRedirectUrl() {
        const params = new URLSearchParams(window.location.search);
        const redirectParam = params.get('redirect');
        if (!redirectParam) {
            return 'index.html';
        }

        try {
            const url = new URL(redirectParam, window.location.origin);
            if (url.origin === window.location.origin) {
                return url.href;
            }
        } catch (error) {
            // Ignore invalid redirect values
        }

        return 'index.html';
    }

    // Initialize the demo auth system
    init() {
        this.setupFormAnimations();
        this.setupSignInForm();
        this.setupSignUpForm();
        this.checkExistingSession();
    }

    // Load demo users from localStorage
    loadUsers() {
        const users = localStorage.getItem('demo_users');
        const parsedUsers = users ? JSON.parse(users) : [
            {
                id: 1,
                name: 'Admin User',
                email: 'admin@bd-fashion.com',
                phone: '+8801700000001',
                password: 'admin123',
                role: 'admin',
                createdAt: new Date().toISOString()
            }
        ];

        return parsedUsers.map(user => ({
            ...user,
            role: user.role || 'customer'
        }));
    }

    // Save users to localStorage
    saveUsers() {
        localStorage.setItem('demo_users', JSON.stringify(this.users));
    }

    generateToken() {
        return Math.random().toString(36).slice(2) + Date.now().toString(36);
    }

    // Check for existing session
    checkExistingSession() {
        const session = localStorage.getItem('demo_session');
        if (session) {
            this.currentUser = JSON.parse(session);
            if (!localStorage.getItem('auth_token')) {
                localStorage.setItem('auth_token', this.generateToken());
            }
            if (!localStorage.getItem('user')) {
                localStorage.setItem('user', JSON.stringify(this.currentUser));
            }
            this.showWelcomeMessage();
            setTimeout(() => {
                window.location.href = this.redirectUrl;
            }, 2000);
        }
    }

    // Setup form animations
    setupFormAnimations() {
        const container = document.getElementById('container');
        const registerBtn = document.getElementById('register');
        const loginBtn = document.getElementById('login');

        registerBtn.addEventListener('click', () => {
            container.classList.add("active");
        });

        loginBtn.addEventListener('click', () => {
            container.classList.remove("active");
        });
    }

    // Setup sign in form
    setupSignInForm() {
        const signInForm = document.querySelector('.sign-in form');

        signInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignIn(signInForm);
        });
    }

    // Setup sign up form
    setupSignUpForm() {
        const signUpForm = document.querySelector('.sign-up form');

        signUpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignUp(signUpForm);
        });
    }

    // Handle sign in
    async handleSignIn(form) {
        const email = form.querySelector('input[type="email"]').value.trim();
        const password = form.querySelector('input[type="password"]').value;

        // Clear previous messages
        this.clearMessages(form);

        // Basic validation
        if (!email || !password) {
            this.showError(form, 'Please fill in all fields');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showError(form, 'Please enter a valid email address');
            return;
        }

        // Show loading state
        this.showLoading(form, 'Signing you in...');

        try {
            // Simulate API call delay
            await this.delay(1500);

            // Find user
            const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());

            if (!user) {
                throw new Error('Account not found. Please check your email or sign up.');
            }

            if (user.password !== password) {
                throw new Error('Incorrect password. Please try again.');
            }

            // Success - create session
            this.currentUser = user;
            localStorage.setItem('demo_session', JSON.stringify(user));
            localStorage.setItem('auth_token', this.generateToken());
            localStorage.setItem('user', JSON.stringify(user));

            this.showSuccess(form, 'Login successful! Redirecting...');

            // Redirect after delay
            setTimeout(() => {
                window.location.href = this.redirectUrl;
            }, 1500);

        } catch (error) {
            this.showError(form, error.message);
        }
    }

    // Handle sign up
    async handleSignUp(form) {
        const name = form.querySelector('input[type="text"]').value.trim();
        const phone = form.querySelector('input[type="tel"]').value.trim();
        const email = form.querySelector('input[type="email"]').value.trim();
        const password = form.querySelector('input[type="password"]').value;

        // Clear previous messages
        this.clearMessages(form);

        // Basic validation
        if (!name || !phone || !email || !password) {
            this.showError(form, 'Please fill in all fields');
            return;
        }

        if (name.length < 2) {
            this.showError(form, 'Name must be at least 2 characters long');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showError(form, 'Please enter a valid email address');
            return;
        }

        if (!this.isValidPhone(phone)) {
            this.showError(form, 'Please enter a valid phone number (e.g., +8801700000000)');
            return;
        }

        if (password.length < 6) {
            this.showError(form, 'Password must be at least 6 characters long');
            return;
        }

        // Check if user already exists
        const existingUser = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existingUser) {
            this.showError(form, 'This email is already in use. Please use a different email or sign in instead.');
            return;
        }

        // Show loading state
        this.showLoading(form, 'Creating your account...');

        try {
            // Simulate API call delay
            await this.delay(2000);

            // Create new user
            const newUser = {
                id: Date.now(),
                name: name,
                email: email.toLowerCase(),
                phone: phone,
                password: password,
                role: 'customer',
                createdAt: new Date().toISOString()
            };

            this.users.push(newUser);
            this.saveUsers();

            // Auto login
            this.currentUser = newUser;
            localStorage.setItem('demo_session', JSON.stringify(newUser));
            localStorage.setItem('auth_token', this.generateToken());
            localStorage.setItem('user', JSON.stringify(newUser));

            this.showSuccess(form, 'Account created successfully! Signing you in...');

            // Redirect after delay
            setTimeout(() => {
                window.location.href = this.redirectUrl;
            }, 1500);

        } catch (error) {
            this.showError(form, 'Failed to create account. Please try again.');
        }
    }

    // Utility methods
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        // Accept formats like +8801700000000 or 01700000000
        const phoneRegex = /^(\+880|0)?1[3-9]\d{8}$/;
        return phoneRegex.test(phone.replace(/\s+/g, ''));
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    clearMessages(form) {
        const existingMessages = form.querySelectorAll('.auth-message');
        existingMessages.forEach(msg => msg.remove());
    }

    showLoading(form, message) {
        this.clearMessages(form);
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'auth-message loading';
        loadingDiv.innerHTML = `
            <div class="loading-spinner"></div>
            <span>${message}</span>
        `;
        form.appendChild(loadingDiv);
    }

    showSuccess(form, message) {
        this.clearMessages(form);
        const successDiv = document.createElement('div');
        successDiv.className = 'auth-message success';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        form.appendChild(successDiv);
    }

    showError(form, message) {
        this.clearMessages(form);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'auth-message error';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        form.appendChild(errorDiv);
    }

    showWelcomeMessage() {
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'welcome-overlay';
        welcomeDiv.innerHTML = `
            <div class="welcome-content">
                <i class="fas fa-user-circle welcome-icon"></i>
                <h2>Welcome back, ${this.currentUser.name}!</h2>
                <p>You are being redirected to your dashboard...</p>
                <div class="welcome-spinner"></div>
            </div>
        `;
        document.body.appendChild(welcomeDiv);
    }
}

// Add CSS styles for auth messages
const style = document.createElement('style');
style.textContent = `
    .auth-message {
        margin-top: 15px;
        padding: 12px 16px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    }

    .auth-message.loading {
        background: #e3f2fd;
        color: #1976d2;
        border: 1px solid #bbdefb;
    }

    .auth-message.success {
        background: #e8f5e8;
        color: #2e7d32;
        border: 1px solid #c8e6c9;
    }

    .auth-message.error {
        background: #ffebee;
        color: #c62828;
        border: 1px solid #ffcdd2;
    }

    .loading-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid #e3f2fd;
        border-top: 2px solid #1976d2;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    .welcome-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    }

    .welcome-content {
        background: white;
        padding: 40px;
        border-radius: 16px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        max-width: 400px;
        width: 90%;
    }

    .welcome-icon {
        font-size: 64px;
        color: #1976d2;
        margin-bottom: 20px;
    }

    .welcome-content h2 {
        color: #333;
        margin-bottom: 10px;
        font-size: 24px;
    }

    .welcome-content p {
        color: #666;
        margin-bottom: 30px;
    }

    .welcome-spinner {
        width: 32px;
        height: 32px;
        border: 3px solid #e3f2fd;
        border-top: 3px solid #1976d2;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto;
    }

    @keyframes slideIn {
        from {
            transform: translateY(-10px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .social-icons {
        margin: 20px 0;
    }

    .social-icons .icon {
        transition: all 0.3s ease;
    }

    .social-icons .icon:hover {
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);

// Initialize demo auth when page loads
document.addEventListener('DOMContentLoaded', () => {
    new DemoAuth();
});