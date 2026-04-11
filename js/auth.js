// Authentication Guard - Protects all pages and ensures only logged-in users can access
class AuthGuard {
    constructor() {
        this.currentUser = this.getCurrentUser();
        this.init();
    }

    init() {
        // If on login page, don't redirect
        if (this.isLoginPage()) {
            this.updateUIWithUserInfo();
            return;
        }

        // If not logged in, redirect to login
        if (!this.currentUser) {
            window.location.href = 'login.html';
            return;
        }

        // User is logged in, update UI
        this.updateUIWithUserInfo();
    }

    // Get current user from session
    getCurrentUser() {
        const session = localStorage.getItem('demo_session');
        return session ? JSON.parse(session) : null;
    }

    // Check if current page is login page
    isLoginPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        return currentPage === 'login.html' || currentPage === '';
    }

    // Update UI with user information
    updateUIWithUserInfo() {
        // Check if header exists
        const header = document.querySelector('header');
        if (!header) return;

        const headerRight = header.querySelector('.header-right, .flex.items-center.gap-3');
        if (!headerRight) return;

        // Only add profile icon link if no dropdown trigger exists
        if (headerRight.querySelector('#profileBtn') || headerRight.querySelector('.profile-icon-link')) {
            return;
        }

        const profileIcon = document.createElement('a');
        profileIcon.href = this.currentUser ? 'profile.html' : 'login.html';
        profileIcon.className = 'profile-icon-link';
        profileIcon.title = this.currentUser ? 'My Profile' : 'Login';
        profileIcon.innerHTML = '<span class="profile-icon">👤</span>';
        headerRight.appendChild(profileIcon);
    }

    // Check if user is logged in (can be called from other scripts)
    static isLoggedIn() {
        return localStorage.getItem('demo_session') !== null;
    }

    // Get current user (can be called from other scripts)
    static getCurrentUser() {
        const session = localStorage.getItem('demo_session');
        return session ? JSON.parse(session) : null;
    }
}

// Add CSS styles for profile icon
const style = document.createElement('style');
style.textContent = `
    .profile-icon-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 9999px;
        background: #f3f4f6;
        color: #1f2937;
        text-decoration: none;
        border: 1px solid #d1d5db;
        transition: all 0.2s ease;
        margin-left: 0.5rem;
    }

    .profile-icon-link:hover {
        background: #e5e7eb;
    }

    .profile-icon {
        font-size: 18px;
        line-height: 1;
    }
`;
document.head.appendChild(style);

// Initialize auth guard when page loads
document.addEventListener('DOMContentLoaded', () => {
    new AuthGuard();
});
