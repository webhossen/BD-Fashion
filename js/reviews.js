document.addEventListener('DOMContentLoaded', () => {
  const reviewHistoryList = document.getElementById('reviewHistoryList');
  const reviewCount = document.getElementById('reviewCount');
  const reviewTip = document.getElementById('reviewTip');
  const session = JSON.parse(localStorage.getItem('demo_session') || localStorage.getItem('user') || 'null');
  const sessionEmail = session?.email?.toLowerCase();
  const sessionName = session?.name?.toLowerCase();

  function getAllReviews() {
    return Object.keys(localStorage)
      .filter(key => key.startsWith('reviews_'))
      .flatMap(key => {
        const productId = Number(key.replace('reviews_', ''));
        const product = PRODUCTS.find(p => p.id === productId) || { id: productId, title: `Product #${productId}` };
        const reviews = JSON.parse(localStorage.getItem(key) || '[]');
        return reviews.map(review => ({ ...review, productId, product }));
      });
  }

  const allReviews = getAllReviews().sort((a, b) => new Date(b.date) - new Date(a.date));

  const userReviews = sessionEmail
    ? allReviews.filter(review =>
        review.userEmail?.toLowerCase() === sessionEmail ||
        review.userName?.toLowerCase() === sessionName ||
        review.name?.toLowerCase() === sessionName
      )
    : allReviews;

  const reviewsToShow = sessionEmail ? userReviews : allReviews;

  if (!reviewHistoryList || !reviewCount || !reviewTip) return;

  if (sessionEmail) {
    reviewTip.innerText = 'Showing reviews submitted by your signed-in account.';
  } else {
    reviewTip.innerText = 'Sign in to see only your reviews. Currently displaying all saved reviews.';
  }

  if (!reviewsToShow.length) {
    reviewCount.innerText = '0 reviews found';
    reviewHistoryList.innerHTML = `
      <div class="bg-white rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
        <p class="text-lg font-semibold mb-2">No reviews found yet.</p>
        <p class="text-sm">Submit a review from any product page to save it here for later.</p>
      </div>
    `;
    return;
  }

  reviewCount.innerText = `${reviewsToShow.length} review(s)`;

  reviewHistoryList.innerHTML = reviewsToShow
    .map(review => {
      const productLink = `product-detail.html?id=${review.productId}`;
      const productTitle = review.product?.title || `Product #${review.productId}`;
      const author = review.userName || review.name || 'Anonymous';
      const stars = '★'.repeat(review.stars || 0) + '☆'.repeat(5 - (review.stars || 0));
      const verifiedLabel = review.verified ? `<span class="text-xs bg-green-600 text-white px-2 py-1 rounded-full">Verified</span>` : '';
      const productImage = review.product?.image || 'Image/placeholder.svg';
      const productPrice = review.product?.price ? `৳${review.product.price}` : 'Price unavailable';
      const productCategory = review.product?.category || 'Uncategorized';
      const productSeason = review.product?.season ? `Season: ${review.product.season}` : '';

      return `
        <article class="review-card bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div class="grid gap-4 md:grid-cols-2 md:items-center mb-4">
            <div class="flex flex-col justify-between">
              <div>
                <h2 class="text-xl font-semibold text-gray-900">${productTitle}</h2>
                <p class="text-sm text-gray-500 mt-1">Reviewed by ${author}</p>
                <div class="text-sm text-gray-600 mt-3 space-y-1">
                  <div><strong>Price:</strong> ${productPrice}</div>
                  <div><strong>Category:</strong> ${productCategory}</div>
                  ${productSeason ? `<div><strong>${productSeason}</strong></div>` : ''}
                </div>
              </div>
              <div class="text-sm text-gray-500">${review.date || 'Unknown date'}</div>
            </div>
            <img src="${productImage}" alt="${productTitle}" class="review-image rounded-xl border border-gray-200 mx-auto md:mx-0 md:ml-auto" />
          </div>

          <div class="flex items-center gap-3 mb-4">
            <div class="text-yellow-400 text-lg">${stars}</div>
            ${verifiedLabel}
          </div>

          <p class="text-gray-700 mb-6">${review.text || ''}</p>

          <a href="${productLink}" class="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-semibold">
            View product details
            <span class="ml-2">→</span>
          </a>
        </article>
      `;
    })
    .join('');
});
