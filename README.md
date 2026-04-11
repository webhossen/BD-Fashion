# BD Fashion

A modern, responsive e-commerce website for custom t-shirt design and premium printing, serving Bangladesh. Built with HTML, CSS, JavaScript, and Tailwind CSS.

## Features

- **Product Catalog**: Browse a wide range of fashion products with detailed descriptions, images, and pricing.
- **Product Details**: View high-quality product images, select sizes and quantities, and read customer reviews.
- **Shopping Cart**: Add items to cart, update quantities, and proceed to checkout.
- **User Authentication**: Login and profile management with session handling.
- **Order Management**: Place orders, view order history, and track order status.
- **Review System**: Leave and view product reviews with star ratings.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Payment Integration**: Support for multiple payment methods including bKash and card payments.
- **Admin Features**: Basic admin panel for managing products and orders.

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS (v2.x)
- **Icons**: Heroicons (SVG)
- **Data Storage**: LocalStorage for client-side data persistence
- **Build Tools**: None (static site)

## Languages and Versions

All pages are built using:
- **HTML**: HTML5
- **CSS**: CSS3 with Tailwind CSS framework (v2.x)
- **JavaScript**: ES6+ (ECMAScript 2015+)

### Page language/version matrix

| Page | Filename | HTML | CSS | JavaScript |
| --- | --- | --- | --- | --- |
| Home | `index.html` | HTML5 | CSS3 + Tailwind v2.x | ES6+ |
| Products | `products.html` | HTML5 | CSS3 + Tailwind v2.x | ES6+ |
| Product Detail | `product-detail.html` | HTML5 | CSS3 + Tailwind v2.x | ES6+ |
| Cart | `cart.html` | HTML5 | CSS3 + Tailwind v2.x | ES6+ |
| Checkout | `checkout.html` | HTML5 | CSS3 + Tailwind v2.x | ES6+ |
| Order | `order.html` | HTML5 | CSS3 + Tailwind v2.x | ES6+ |
| Order History | `order-view.html` | HTML5 | CSS3 + Tailwind v2.x | ES6+ |
| Login | `login.html` | HTML5 | CSS3 + Tailwind v2.x | ES6+ |
| Profile | `profile.html` | HTML5 | CSS3 + Tailwind v2.x | ES6+ |
| About | `about.html` | HTML5 | CSS3 + Tailwind v2.x | ES6+ |
| Contact | `contact.html` | HTML5 | CSS3 + Tailwind v2.x | ES6+ |

Page-specific details:
- All HTML pages use the HTML5 standard.
- CSS files use CSS3 with Tailwind utility classes for responsive styling.
- JavaScript files use modern ES6+ features, including arrow functions, template literals, and DOM interaction.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bd-fashion.git
   cd bd-fashion
   ```

2. Open `index.html` in your web browser to start the application.

No additional setup is required as this is a static website.

## Usage

- **Home Page**: Navigate to `index.html` to view the landing page.
- **Products**: Browse products on `products.html`.
- **Product Details**: Click on a product to view details on `product-detail.html`.
- **Cart**: Add items to cart and proceed to `checkout.html`.
- **Orders**: View your orders on `order-view.html`.
- **Profile**: Manage your profile on `profile.html`.

## Project Structure

```
bd-fashion/
├── index.html              # Home page
├── products.html           # Product listing
├── product-detail.html     # Individual product page
├── cart.html               # Shopping cart
├── checkout.html           # Checkout process
├── order.html              # Order placement
├── order-view.html         # Order history
├── login.html              # User login
├── profile.html            # User profile
├── about.html              # About page
├── contact.html            # Contact page
├── CSS/
│   ├── Login.css           # Login page styles
│   ├── nav.css             # Navigation styles
│   ├── order-view.css      # Order view page styles
│   ├── products.css        # Products page styles
│   └── styles.css          # Main styles
├── js/
│   ├── auth.js             # Authentication logic
│   ├── cart.js             # Cart management
│   ├── checkout.js         # Checkout process
│   ├── contact.js          # Contact page logic
│   ├── demo-payment-gateway.js  # Demo payment gateway
│   ├── header.js           # Header and navigation logic
│   ├── index.js            # Home page logic
│   ├── login.js            # Login page logic
│   ├── order-view.js       # Order view page logic
│   ├── order.js            # Order placement logic
│   ├── product-detail.js   # Product detail page logic
│   ├── products.js         # Product data and logic
│   ├── profile.js          # Profile page logic
│   ├── test-payment-gateway.js  # Test payment gateway
│   └── test-payment.js     # Test payment logic
└── Image/                  # Product images and assets
```

## Contributing

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## Screenshots

### Home Page
![Home Page](Image/home.png)

### Product Page
![Product](Image/products.png)

### About Page
![About](Image/About.png)

## Contact

For questions or support, please contact:
- Email: support@bdfashion.com
- Phone: +880 1980-764507

## Website & Links

- **Website**: [BD Fashion](https://bdfashion.netlify.app/)
- **GitHub (Githa Bell)**: (https://github.com/webhossen)
- **QR Code**:  
  ![QR Code](Image/qr.png)  
  *Scan to open the website directly from the QR code.*

The website link, GitHub profile link, and QR code are all intended to open directly from the website and support quick access for users.

## Acknowledgments

- Tailwind CSS for styling
- Flaticon.com for icons
- LocalStorage for data persistence