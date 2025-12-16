// ===============================
//  BD Fashion — 20+ Real Products
// ===============================

const PRODUCTS = [
    {
        id: 1,
        title: "Red Winter Coat",
        description: "Premium winter wear made from thick, insulated material.",
        price: 450,
        image: "Image/new (1).png",
        images: ["Image/new (1).png"],

        material: "Insulated Fabric",
        fit: "Regular Fit",
        category: "Winter Wear",
        season: "Winter",
        sku: "BD-450",
        stock: "In Stock"

    },
    {
        id: 2,
        title: "Black Red Hoodie",
        description: "Comfortable fleece hoodie with stylish red sleeves.",
        price: 380,
        image: "Image/new (2).png",
        images: ["Image/new (2).png"]
    },
    {
        id: 3,
        title: "Golden Winter Jacket",
        description: "Lightweight but warm jacket suitable for cold weather.",
        price: 520,
        image: "Image/new (3).png",
        images: ["Image/new (3).png"]
    },
    {
        id: 4,
        title: "Varsity Jacket",
        description: "Classic varsity jacket with premium stitching.",
        price: 480,
        image: "Image/new (4).png",
        images: ["Image/new (4).png"]
    },
    {
        id: 5,
        title: "Casual Red Tee",
        description: "High-quality cotton T-shirt for everyday wear.",
        price: 400,
        image: "Image/new (5).png",
        images: ["Image/new (5).png"]
    },
    {
        id: 6,
        title: "White Hoodie",
        description: "Soft-touch white hoodie with premium finish.",
        price: 430,
        image: "Image/new (6).png",
        images: ["Image/new (6).png"]
    },
    {
        id: 7,
        title: "Brown Winter Coat",
        description: "Stylish brown coat crafted for modern winter fashion.",
        price: 550,
        image: "Image/new (7).png",
        images: ["Image/new (7).png"]
    },
    {
        id: 8,
        title: "Blue Denim Jacket",
        description: "Classic blue denim jacket with a modern fit.",
        price: 470,
        image: "Image/new (8).png",
        images: ["Image/new (8).png"]
    },
    {
        id: 9,
        title: "Green Parka",
        description: "Durable green parka designed for extreme weather conditions.",
        price: 600,
        image: "Image/new (9).png",
        images: ["Image/new (9).png"]
    },
    {
        id: 10,
        title: "Black Leather Jacket",
        description: "Premium black leather jacket with a sleek design.",
        price: 750,
        image: "Image/new (10).png",
        images: ["Image/new (10).png"]
    },
    {
        id: 11,
        title: "Grey Sweatshirt",
        description: "Comfortable grey sweatshirt made from soft fabric.",
        price: 350,
        image: "Image/new (11).png",
        images: ["Image/new (11).png"]
    },
    {
        id: 12,
        title: "Navy Blue Blazer",
        description: "Elegant navy blue blazer suitable for formal occasions.",
        price: 680,
        image: "Image/new (12).png",
        images: ["Image/new (12).png"]
    },
    {
        id: 13,
        title: "Orange Windbreaker",
        description: "Lightweight orange windbreaker for outdoor activities.",
        price: 300,
        image: "Image/new (13).png",
        images: ["Image/new (13).png"]
    },
    {
        id: 14,
        title: "Purple Hoodie",
        description: "Vibrant purple hoodie with a comfortable fit.",
        price: 420,
        image: "Image/new (14).png",
        images: ["Image/new (14).png"]
    },
    {
        id: 15,
        title: "Yellow Raincoat",
        description: "Bright yellow raincoat made from waterproof material.",
        price: 390,
        image: "Image/new (15).png",
        images: ["Image/new (15).png"]
    },
    {
        id: 16,
        title: "Camo Jacket",
        description: "Trendy camo jacket perfect for casual outings.",
        price: 510,
        image: "Image/new (16).png",
        images: ["Image/new (16).png"]
    },
    {
        id: 17,
        title: "Pink Hoodie",
        description: "Soft pink hoodie with a modern design.",
        price: 410,
        image: "Image/new (17).png",
        images: ["Image/new (17).png"]
    },
    {
        id: 18,
        title: "Olive Green Jacket",
        description: "Durable olive green jacket for everyday wear.",
        price: 460,
        image: "Image/new (18).png",
        images: ["Image/new (18).png"]
    },
    {
        id: 19,
        title: "Teal Hoodie",
        description: "Comfortable teal hoodie with a stylish look.",
        price: 440,
        image: "Image/new (19).png",
        images: ["Image/new (19).png"]
    },
    {
        id: 20,
        title: "Maroon Jacket",
        description: "Elegant maroon jacket suitable for all seasons.",
        price: 530,
        image: "Image/new (20).png",
        images: ["Image/new (20).png"]
    },
    {
        id: 21,
        title: "Maroon Jacket",
        description: "Elegant maroon jacket suitable for all seasons.",
        price: 530,
        image: "Image/new (21).png",
        images: ["Image/new (21).png"]
    },
    {
        id: 22,
        title: "Maroon Jacket",
        description: "Elegant maroon jacket suitable for all seasons.",
        price: 530,
        image: "Image/new (22).png",
        images: ["Image/new (22).png"]
    },
    {
        id: 23,
        title: "Maroon Jacket",
        description: "Elegant maroon jacket suitable for all seasons.",
        price: 530,
        image: "Image/new (23).png",
        images: ["Image/new (23).png"]
    }
];


// ===============================
//  PAGINATION + AUTO RENDER
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const grid = document.getElementById("productsGrid");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const pageNumber = document.getElementById("pageNumber");

    const ITEMS_PER_PAGE = 20; // 5×4 layout
    let currentPage = 1;

    function renderProducts() {
        grid.innerHTML = "";

        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;

        const items = PRODUCTS.slice(start, end);

        items.forEach(p => {
            grid.innerHTML += `
        <div class="bg-white shadow rounded-xl p-4 product-card transition">
            <img src="${p.image}" class="w-full h-60 object-cover rounded-lg mb-4">

            <h3 class="font-bold text-lg">${p.title}</h3>
            <p class="text-gray-600 text-sm mb-4">৳${p.price}</p>

            <a href="product-detail.html?id=${p.id}" 
               class="block text-center bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
               View Details
            </a>
        </div>
    `;
        });


        updatePagination();
    }

    function updatePagination() {
        const totalPages = Math.ceil(PRODUCTS.length / ITEMS_PER_PAGE);

        pageNumber.innerText = `Page ${currentPage} of ${totalPages}`;

        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }

    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
        }
    });

    nextBtn.addEventListener("click", () => {
        const totalPages = Math.ceil(PRODUCTS.length / ITEMS_PER_PAGE);
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts();
        }
    });

    // First render
    renderProducts();
});
