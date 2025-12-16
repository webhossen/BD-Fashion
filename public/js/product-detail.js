// =========================
//  PRODUCT DETAIL SCRIPT
// =========================

document.addEventListener("DOMContentLoaded", () => {
    const url = new URLSearchParams(window.location.search);
    const id = url.get("id");

    const product = PRODUCTS.find(p => p.id == id);

    if (!product) {
        document.querySelector(".product-detail-container").innerHTML =
            "<h2 class='text-center text-xl text-red-500'>Product not found</h2>";
        return;
    }

    // -------- Fill product data --------
    document.getElementById("productTitle").innerText = product.title;
    document.getElementById("productPrice").innerText = "৳" + product.price;
    document.getElementById("productDescription").innerText = product.description;

    // ⭐ Render product details (old top area)
    if (product.details) {
        document.getElementById("productDetailsList").innerHTML =
            product.details.map(d => `<li>${d}</li>`).join("");
    }

    // ---------- ⭐ NEW: Auto Product Details Section ----------
    if (document.getElementById("autoProductDetails")) {
        const autoDetails = [
            { label: "Material", value: product.material || "Premium Fabric" },
            { label: "Fit", value: product.fit || "Regular Fit" },
            { label: "Category", value: product.category || "Clothing" },
            { label: "Season", value: product.season || "All Season" },
            { label: "SKU", value: product.sku || ("BD-" + product.id) },
            { label: "Availability", value: product.stock || "In Stock" }
        ];

        document.getElementById("autoProductDetails").innerHTML =
            autoDetails.map(d => `<li><strong>${d.label}:</strong> ${d.value}</li>`).join("");
    }
    // ----------------------------------------------------------


    // Main Image
    const mainImg = document.getElementById("mainImage");
    mainImg.src = product.image;

    // Thumbnails
    const gallery = document.getElementById("imageGallery");
    gallery.innerHTML = product.images
        .map(img => `
            <img src="${img}" class="w-20 h-20 object-cover rounded border hover:border-blue-600 cursor-pointer"
            onclick="changeImage('${img}')">
        `)
        .join("");

    // Change image on click
    window.changeImage = (src) => {
        mainImg.src = src;
    };

    // -------------- Add To Cart --------------
    document.getElementById("addToCartBtn").addEventListener("click", () => {
        const size = document.getElementById("selectSize").value;
        const qty = parseInt(document.getElementById("qtyInput").value);

        addToCart(product, size, qty);
    });

    // -------------- Suggested Products --------------
    loadSuggestedProducts(id);

    // ⭐ Load DEMO reviews if first time
    injectDemoReviews(product.id);

    // -------------- Reviews System --------------
    renderReviews(product.id);
    setupReviewForm(product);
});


// =========================
//  DEMO REVIEWS INJECTOR
// =========================
function injectDemoReviews(productId) {
    const key = "reviews_" + productId;
    const existing = localStorage.getItem(key);

    if (!existing) {
        const demo = [
            {
                name: "Demo User 1",
                text: "Amazing product! Very good quality.",
                stars: 5,
                pros: "Good material, stylish",
                cons: "None",
                verified: true,
                image: null,
                date: new Date().toLocaleDateString()
            },
            {
                name: "Demo User 2",
                text: "Pretty good for the price.",
                stars: 4,
                pros: "Affordable",
                cons: "Colour a bit different",
                verified: false,
                image: null,
                date: new Date().toLocaleDateString()
            }
        ];
        localStorage.setItem(key, JSON.stringify(demo));
    }
}


// =========================
//  ADD TO CART FUNCTION
// =========================
function addToCart(product, size, qty) {
    const CART_KEY = "bd_cart";
    let cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");

    const existing = cart.find(
        (item) => item.id == product.id && item.size == size
    );

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({
            id: product.id,
            size: size,
            qty: qty
        });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));

    const badge = document.getElementById("cart-count");
    if (badge) {
        const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
        badge.textContent = totalQty;
    }

    alert("Added to cart!");
}



// =========================
//  SUGGESTED PRODUCTS
// =========================
function loadSuggestedProducts(currentId) {
    const container = document.getElementById("suggestedProducts");

    const filtered = PRODUCTS.filter(p => p.id != currentId);
    const random4 = filtered.sort(() => 0.5 - Math.random()).slice(0, 4);

    container.innerHTML = random4
        .map(prod => `
            <a href="product-detail.html?id=${prod.id}" class="suggested-card block">
                <img src="${prod.image}">
                <div class="suggested-card-title">${prod.title}</div>
                <div class="suggested-card-price">৳${prod.price}</div>
            </a>
        `)
        .join("");
}



// =========================
//  REVIEW SYSTEM
// =========================

function getReviews(productId) {
    return JSON.parse(localStorage.getItem("reviews_" + productId) || "[]");
}

function saveReviews(productId, reviews) {
    localStorage.setItem("reviews_" + productId, JSON.stringify(reviews));
}

function renderReviews(productId) {
    const reviews = getReviews(productId);
    const list = document.getElementById("reviewsList");

    list.innerHTML = reviews
        .map((r, index) => `
            <div class="review-item">
                <div class="review-stars">${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)}</div>
                
                <div class="flex items-center gap-2">
                    <div class="review-name font-semibold">${r.name}</div>
                    ${r.verified ? `<span class="text-xs bg-green-600 text-white px-2 py-0.5 rounded">Verified</span>` : ""}
                </div>

                <div class="review-text mt-1">${r.text}</div>

                ${r.pros ? `<div class="text-green-600 text-sm mt-1"><b>Pros:</b> ${r.pros}</div>` : ""}
                ${r.cons ? `<div class="text-red-600 text-sm"><b>Cons:</b> ${r.cons}</div>` : ""}

                ${r.image ? `<img src="${r.image}" class="mt-2 w-24 rounded border" />` : ""}

                <div class="text-xs text-gray-400 mt-1">${r.date}</div>

                <span class="review-delete text-red-600 cursor-pointer text-sm mt-2 inline-block"
                      onclick="deleteReview(${productId}, ${index})">
                    Delete review
                </span>
            </div>
        `)
        .join("");

    updateRatingDisplay(reviews);
}

function deleteReview(productId, index) {
    const reviews = getReviews(productId);
    reviews.splice(index, 1);
    saveReviews(productId, reviews);
    renderReviews(productId);
}

function updateRatingDisplay(reviews) {
    const ratingStars = document.getElementById("ratingStars");
    const ratingValue = document.getElementById("ratingValue");
    const ratingCount = document.getElementById("ratingCount");

    if (reviews.length === 0) {
        ratingStars.innerHTML = "★★★★★";
        ratingValue.innerHTML = "No ratings yet";
        ratingCount.innerHTML = "";
        return;
    }

    const total = reviews.reduce((s, r) => s + r.stars, 0);
    const avg = (total / reviews.length).toFixed(1);

    ratingStars.innerHTML = "★".repeat(Math.round(avg)) + "☆".repeat(5 - Math.round(avg));
    ratingValue.innerHTML = `${avg} out of 5`;
    ratingCount.innerHTML = `${reviews.length} review(s)`;
}



// =========================
//  REVIEW FORM (ADD REVIEW)
// =========================
function setupReviewForm(product) {
    let selectedStars = 0;

    // STAR SELECT
    document.querySelectorAll("#selectStars span").forEach(star => {
        star.addEventListener("click", () => {
            selectedStars = Number(star.dataset.star);

            document.querySelectorAll("#selectStars span").forEach(s => {
                s.style.color =
                    Number(s.dataset.star) <= selectedStars ? "#fbbf24" : "#ccc";
            });
        });
    });

    // SUBMIT REVIEW
    document.getElementById("submitReview").addEventListener("click", async () => {
        const name = document.getElementById("reviewerName").value.trim();
        const text = document.getElementById("reviewText").value.trim();
        const pros = document.getElementById("reviewPros").value.trim();
        const cons = document.getElementById("reviewCons").value.trim();
        const imageFile = document.getElementById("reviewImage").files[0];

        if (!name || !text || selectedStars === 0) {
            alert("Please fill all fields and select stars.");
            return;
        }

        let imageData = null;
        if (imageFile) {
            imageData = await fileToBase64(imageFile);
        }

        const reviews = getReviews(product.id);

        reviews.push({
            name,
            text,
            pros,
            cons,
            stars: selectedStars,
            verified: false,
            image: imageData,
            date: new Date().toLocaleString()
        });

        saveReviews(product.id, reviews);

        // Reset form
        document.getElementById("reviewerName").value = "";
        document.getElementById("reviewText").value = "";
        document.getElementById("reviewPros").value = "";
        document.getElementById("reviewCons").value = "";
        document.getElementById("reviewImage").value = "";
        selectedStars = 0;

        document.querySelectorAll("#selectStars span")
            .forEach(s => s.style.color = "#ccc");

        renderReviews(product.id);
    });
}



// =========================
//  IMAGE FILE → BASE64
// =========================
function fileToBase64(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
}



// =========================
//      CART SYSTEM
// =========================
const CART_KEY = "bd_cart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
function updateCartCount() {
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById("cart-count");
    if (badge) {
        badge.textContent = totalQty;
    }
}
updateCartCount();


// =======================
//     MONEY FORMATTER
// =======================
function money(v) {
  return Number(v).toFixed(2);
}
// =======================
// END
// =======================
