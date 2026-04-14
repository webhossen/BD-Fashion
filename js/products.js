// ===============================
//  BD Fashion — 72 Products (24 per category)
// ===============================

const PRODUCTS = [
    // Men's Products (IDs 1-24)
    {
        id: 1,
        title: "Red Winter Coat",
        description: "Premium winter wear made from thick, insulated material.",
        price: 450,
        image: "Image/man/man(1).png",
        images: ["Image/man/man(1).png"],
        material: "Insulated Fabric",
        fit: "Regular Fit",
        category: "Winter Wear",
        season: "Winter",
        sku: "BD-F001",
        stock: "In Stock"
    },
    {
        id: 2,
        title: "Black Red Hoodie",
        description: "Comfortable fleece hoodie with stylish red sleeves.",
        price: 380,
        image: "Image/man/man(2).png",
        images: ["Image/man/man(2).png"],
        material: "Fleece",
        fit: "Regular Fit",
        category: "Hoodies",
        season: "All Season",
        sku: "BD-M002",
        stock: "In Stock"
    },
    {
        id: 3,
        title: "Golden Winter Jacket",
        description: "Lightweight but warm jacket suitable for cold weather.",
        price: 520,
        image: "Image/man/man(3).png",
        images: ["Image/man/man(3).png"],
        material: "Polyester",
        fit: "Slim Fit",
        category: "Jackets",
        season: "Winter",
        sku: "BD-M003",
        stock: "In Stock"
    },
    {
        id: 4,
        title: "Varsity Jacket",
        description: "Classic varsity jacket with premium stitching.",
        price: 480,
        image: "Image/man/man(4).png",
        images: ["Image/man/man(4).png"],
        material: "Cotton Blend",
        fit: "Regular Fit",
        category: "Jackets",
        season: "All Season",
        sku: "BD-M004",
        stock: "In Stock"
    },
    {
        id: 5,
        title: "Casual Red Tee",
        description: "High-quality cotton T-shirt for everyday wear.",
        price: 400,
        image: "Image/man/man(5).png",
        images: ["Image/man/man(5).png"],
        material: "Cotton",
        fit: "Regular Fit",
        category: "T-Shirts",
        season: "Summer",
        sku: "BD-M005",
        stock: "In Stock"
    },
    {
        id: 6,
        title: "White Hoodie",
        description: "Soft-touch white hoodie with premium finish.",
        price: 430,
        image: "Image/man/man(6).png",
        images: ["Image/man/man(6).png"],
        material: "Cotton Blend",
        fit: "Oversized",
        category: "Hoodies",
        season: "All Season",
        sku: "BD-M006",
        stock: "In Stock"
    },
    {
        id: 7,
        title: "Brown Winter Coat",
        description: "Stylish brown coat crafted for modern winter fashion.",
        price: 550,
        image: "Image/man/man(7).png",
        images: ["Image/man/man(7).png"],
        material: "Wool Blend",
        fit: "Regular Fit",
        category: "Coats",
        season: "Winter",
        sku: "BD-M007",
        stock: "In Stock"
    },
    {
        id: 8,
        title: "Blue Denim Jacket",
        description: "Classic blue denim jacket with a modern fit.",
        price: 470,
        image: "Image/man/man(8).png",
        images: ["Image/man/man(8).png"],
        material: "Denim",
        fit: "Slim Fit",
        category: "Jackets",
        season: "All Season",
        sku: "BD-M008",
        stock: "In Stock"
    },
    {
        id: 9,
        title: "Green Parka",
        description: "Durable green parka designed for extreme weather conditions.",
        price: 600,
        image: "Image/man/man(9).png",
        images: ["Image/man/man(9).png"],
        material: "Waterproof Fabric",
        fit: "Regular Fit",
        category: "Parkas",
        season: "Winter",
        sku: "BD-M009",
        stock: "In Stock"
    },
    {
        id: 10,
        title: "Black Leather Jacket",
        description: "Premium black leather jacket with a sleek design.",
        price: 750,
        image: "Image/man/man(10).png",
        images: ["Image/man/man(10).png"],
        material: "Genuine Leather",
        fit: "Regular Fit",
        category: "Jackets",
        season: "All Season",
        sku: "BD-M010",
        stock: "In Stock"
    },
    {
        id: 11,
        title: "Grey Sweatshirt",
        description: "Comfortable grey sweatshirt made from soft fabric.",
        price: 350,
        image: "Image/man/man(11).png",
        images: ["Image/man/man(11).png"],
        material: "Cotton Blend",
        fit: "Regular Fit",
        category: "Sweatshirts",
        season: "All Season",
        sku: "BD-M011",
        stock: "In Stock"
    },
    {
        id: 12,
        title: "Navy Blue Blazer",
        description: "Elegant navy blue blazer suitable for formal occasions.",
        price: 680,
        image: "Image/man/man(12).png",
        images: ["Image/man/man(12).png"],
        material: "Wool Blend",
        fit: "Slim Fit",
        category: "Blazers",
        season: "All Season",
        sku: "BD-M012",
        stock: "In Stock"
    },
    {
        id: 13,
        title: "Orange Windbreaker",
        description: "Lightweight orange windbreaker for outdoor activities.",
        price: 300,
        image: "Image/man/man(13).png",
        images: ["Image/man/man(13).png"],
        material: "Nylon",
        fit: "Regular Fit",
        category: "Windbreakers",
        season: "Spring/Fall",
        sku: "BD-M013",
        stock: "In Stock"
    },
    {
        id: 14,
        title: "Purple Hoodie",
        description: "Vibrant purple hoodie with a comfortable fit.",
        price: 420,
        image: "Image/man/man(14).png",
        images: ["Image/man/man(14).png"],
        material: "Cotton Blend",
        fit: "Regular Fit",
        category: "Hoodies",
        season: "All Season",
        sku: "BD-M014",
        stock: "In Stock"
    },
    {
        id: 15,
        title: "Yellow Raincoat",
        description: "Bright yellow raincoat made from waterproof material.",
        price: 390,
        image: "Image/man/man(15).png",
        images: ["Image/man/man(15).png"],
        material: "PVC",
        fit: "Regular Fit",
        category: "Raincoats",
        season: "Rainy Season",
        sku: "BD-M015",
        stock: "In Stock"
    },
    {
        id: 16,
        title: "Camo Jacket",
        description: "Trendy camo jacket perfect for casual outings.",
        price: 510,
        image: "Image/man/man(16).png",
        images: ["Image/man/man(16).png"],
        material: "Cotton Blend",
        fit: "Regular Fit",
        category: "Jackets",
        season: "All Season",
        sku: "BD-M016",
        stock: "In Stock"
    },
    {
        id: 17,
        title: "Olive Green Jacket",
        description: "Durable olive green jacket for everyday wear.",
        price: 460,
        image: "Image/man/man(17).png",
        images: ["Image/man/man(17).png"],
        material: "Cotton Blend",
        fit: "Regular Fit",
        category: "Jackets",
        season: "All Season",
        sku: "BD-M017",
        stock: "In Stock"
    },
    {
        id: 18,
        title: "Black Polo Shirt",
        description: "Classic black polo shirt with collar.",
        price: 320,
        image: "Image/man/man(18).png",
        images: ["Image/man/man(18).png"],
        material: "Cotton",
        fit: "Regular Fit",
        category: "Polo Shirts",
        season: "All Season",
        sku: "BD-M018",
        stock: "In Stock"
    },
    {
        id: 19,
        title: "Navy Sweater",
        description: "Warm navy sweater for cooler days.",
        price: 380,
        image: "Image/man/man(19).png",
        images: ["Image/man/man(19).png"],
        material: "Wool Blend",
        fit: "Regular Fit",
        category: "Sweaters",
        season: "Fall/Winter",
        sku: "BD-M019",
        stock: "In Stock"
    },
    {
        id: 20,
        title: "White T-Shirt",
        description: "Basic white T-shirt for everyday wear.",
        price: 250,
        image: "Image/man/man(20).png",
        images: ["Image/man/man(20).png"],
        material: "Cotton",
        fit: "Regular Fit",
        category: "T-Shirts",
        season: "Summer",
        sku: "BD-M020",
        stock: "In Stock"
    },
    {
        id: 21,
        title: "Grey Hoodie",
        description: "Comfortable grey hoodie with kangaroo pocket.",
        price: 400,
        image: "Image/man/man(21).png",
        images: ["Image/man/man(21).png"],
        material: "Cotton Blend",
        fit: "Regular Fit",
        category: "Hoodies",
        season: "All Season",
        sku: "BD-M021",
        stock: "In Stock"
    },
    {
        id: 22,
        title: "Blue Blazer",
        description: "Professional blue blazer for business attire.",
        price: 650,
        image: "Image/man/man(22).png",
        images: ["Image/man/man(22).png"],
        material: "Wool Blend",
        fit: "Slim Fit",
        category: "Blazers",
        season: "All Season",
        sku: "BD-M022",
        stock: "In Stock"
    },
    {
        id: 23,
        title: "Green Windbreaker",
        description: "Lightweight green windbreaker for outdoor activities.",
        price: 330,
        image: "Image/man/man(23).png",
        images: ["Image/man/man(23).png"],
        material: "Nylon",
        fit: "Regular Fit",
        category: "Windbreakers",
        season: "Spring/Fall",
        sku: "BD-M023",
        stock: "In Stock"
    },
    {
        id: 24,
        title: "Brown Leather Jacket",
        description: "Classic brown leather jacket with timeless appeal.",
        price: 720,
        image: "Image/man/man(24).png",
        images: ["Image/man/man(24).png"],
        material: "Genuine Leather",
        fit: "Regular Fit",
        category: "Jackets",
        season: "All Season",
        sku: "BD-M024",
        stock: "In Stock"
    },
    {
        id: 25,
        title: "Pink Hoodie",
        description: "Soft pink hoodie with a modern design.",
        price: 410,
        image: "Image/man/man(25).png",
        images: ["Image/man/man(25).png"],
        material: "Cotton Blend",
        fit: "Regular Fit",
        category: "Hoodies",
        season: "All Season",
        sku: "BD-W001",
        stock: "In Stock"
    },
    {
        id: 26,
        title: "Teal Hoodie",
        description: "Comfortable teal hoodie with a stylish look.",
        price: 440,
        image: "Image/man/man(26).png",
        images: ["Image/man/man(26).png"],
        material: "Fleece",
        fit: "Oversized",
        category: "Hoodies",
        season: "All Season",
        sku: "BD-W002",
        stock: "In Stock"
    },
    {
        id: 27,
        title: "Floral Summer Dress",
        description: "Elegant floral dress perfect for summer occasions.",
        price: 580,
        image: "Image/man/man(27).png",
        images: ["Image/man/man(27).png"],
        material: "Chiffon",
        fit: "A-Line",
        category: "Dresses",
        season: "Summer",
        sku: "BD-W003",
        stock: "In Stock"
    },
    {
        id: 28,
        title: "Black Evening Gown",
        description: "Stunning black gown for special evening events.",
        price: 1200,
        image: "Image/man/man(28).png",
        images: ["Image/man/man(28).png"],
        material: "Silk",
        fit: "Mermaid",
        category: "Gowns",
        season: "All Season",
        sku: "BD-W004",
        stock: "In Stock"
    },
    {
        id: 29,
        title: "White Blouse",
        description: "Classic white blouse with delicate lace details.",
        price: 320,
        image: "Image/man/man(29).png",
        images: ["Image/man/man(29).png"],
        material: "Cotton",
        fit: "Regular Fit",
        category: "Blouses",
        season: "All Season",
        sku: "BD-W005",
        stock: "In Stock"
    },
    {
        id: 30,
        title: "Red Cocktail Dress",
        description: "Vibrant red cocktail dress for parties and events.",
        price: 650,
        image: "Image/man/man(30).png",
        images: ["Image/man/man(30).png"],
        material: "Satin",
        fit: "Bodycon",
        category: "Dresses",
        season: "All Season",
        sku: "BD-W006",
        stock: "In Stock"
    },
    {
        id: 31,
        title: "Blue Denim Skirt",
        description: "Stylish blue denim skirt with a modern cut.",
        price: 380,
        image: "Image/man/man(31).png",
        images: ["Image/man/man(31).png"],
        material: "Denim",
        fit: "A-Line",
        category: "Skirts",
        season: "All Season",
        sku: "BD-W007",
        stock: "In Stock"
    },
    {
        id: 32,
        title: "Purple Maxi Dress",
        description: "Flowing purple maxi dress for casual and formal wear.",
        price: 520,
        image: "Image/man/man(32).png",
        images: ["Image/man/man(32).png"],
        material: "Rayon",
        fit: "Flowy",
        category: "Dresses",
        season: "Summer",
        sku: "BD-W008",
        stock: "In Stock"
    },
    {
        id: 33,
        title: "Green Cardigan",
        description: "Light green cardigan perfect for layering.",
        price: 290,
        image: "Image/man/man(33).png",
        images: ["Image/man/man(33).png"],
        material: "Cotton Blend",
        fit: "Regular Fit",
        category: "Cardigans",
        season: "Spring/Fall",
        sku: "BD-W009",
        stock: "In Stock"
    },
    {
        id: 34,
        title: "Black Leather Jacket",
        description: "Premium black leather jacket with feminine cuts.",
        price: 780,
        image: "Image/man/man(34).png",
        images: ["Image/man/man(34).png"],
        material: "Genuine Leather",
        fit: "Slim Fit",
        category: "Jackets",
        season: "All Season",
        sku: "BD-W010",
        stock: "In Stock"
    },
    {
        id: 35,
        title: "Pink Sweater",
        description: "Soft pink sweater with cable knit pattern.",
        price: 360,
        image: "Image/man/man(35).png",
        images: ["Image/man/man(35).png"],
        material: "Wool Blend",
        fit: "Regular Fit",
        category: "Sweaters",
        season: "Winter",
        sku: "BD-W011",
        stock: "In Stock"
    },
    {
        id: 36,
        title: "White Summer Top",
        description: "Breathable white top for hot summer days.",
        price: 250,
        image: "Image/man/man(36).png",
        images: ["Image/man/man(36).png"],
        material: "Cotton",
        fit: "Regular Fit",
        category: "Tops",
        season: "Summer",
        sku: "BD-W012",
        stock: "In Stock"
    },
    {
        id: 37,
        title: "Navy Blue Blazer",
        description: "Professional navy blazer for office and events.",
        price: 720,
        image: "Image/man/man(37).png",
        images: ["Image/man/man(37).png"],
        material: "Wool Blend",
        fit: "Tailored",
        category: "Blazers",
        season: "All Season",
        sku: "BD-W013",
        stock: "In Stock"
    },
    {
        id: 38,
        title: "Yellow Sundress",
        description: "Bright yellow sundress with floral patterns.",
        price: 340,
        image: "Image/man/man(38).png",
        images: ["Image/man/man(38).png"],
        material: "Cotton",
        fit: "A-Line",
        category: "Dresses",
        season: "Summer",
        sku: "BD-W014",
        stock: "In Stock"
    },
    {
        id: 39,
        title: "Grey Hoodie Dress",
        description: "Comfortable hoodie dress for casual outings.",
        price: 450,
        image: "Image/man/man(39).png",
        images: ["Image/man/man(39).png"],
        material: "Cotton Blend",
        fit: "Oversized",
        category: "Dresses",
        season: "All Season",
        sku: "BD-W015",
        stock: "In Stock"
    },
    {
        id: 40,
        title: "Brown Leather Boots",
        description: "Stylish brown leather boots for all weather.",
        price: 890,
        image: "Image/man/man(40).png",
        images: ["Image/man/man(40).png"],
        material: "Genuine Leather",
        fit: "Regular",
        category: "Boots",
        season: "All Season",
        sku: "BD-W016",
        stock: "In Stock"
    },
    {
        id: 41,
        title: "Beige Trench Coat",
        description: "Classic beige trench coat for sophisticated looks.",
        price: 950,
        image: "Image/man/man(41).png",
        images: ["Image/man/man(41).png"],
        material: "Cotton Blend",
        fit: "Regular Fit",
        category: "Coats",
        season: "Spring/Fall",
        sku: "BD-W017",
        stock: "In Stock"
    },
    {
        id: 42,
        title: "Blue Evening Dress",
        description: "Elegant blue evening dress for special occasions.",
        price: 680,
        image: "Image/man/man(42).png",
        images: ["Image/man/man(42).png"],
        material: "Silk",
        fit: "A-Line",
        category: "Dresses",
        season: "All Season",
        sku: "BD-W018",
        stock: "In Stock"
    },
    {
        id: 43,
        title: "White Cardigan",
        description: "Lightweight white cardigan for layering.",
        price: 280,
        image: "Image/man/man(43).png",
        images: ["Image/man/man(43).png"],
        material: "Cotton",
        fit: "Regular Fit",
        category: "Cardigans",
        season: "Spring/Fall",
        sku: "BD-W019",
        stock: "In Stock"
    },
    {
        id: 44,
        title: "Red Blouse",
        description: "Vibrant red blouse with modern styling.",
        price: 350,
        image: "Image/man/man(44).png",
        images: ["Image/man/man(44).png"],
        material: "Silk",
        fit: "Regular Fit",
        category: "Blouses",
        season: "All Season",
        sku: "BD-W020",
        stock: "In Stock"
    },
    {
        id: 45,
        title: "Black Maxi Dress",
        description: "Flowing black maxi dress for elegant occasions.",
        price: 550,
        image: "Image/man/man(45).png",
        images: ["Image/man/man(45).png"],
        material: "Rayon",
        fit: "Flowy",
        category: "Dresses",
        season: "Summer",
        sku: "BD-W021",
        stock: "In Stock"
    },
    {
        id: 46,
        title: "Green Sweater",
        description: "Cozy green sweater with crew neck.",
        price: 320,
        image: "Image/man/man(46).png",
        images: ["Image/man/man(46).png"],
        material: "Wool Blend",
        fit: "Regular Fit",
        category: "Sweaters",
        season: "Winter",
        sku: "BD-W022",
        stock: "In Stock"
    },
    {
        id: 47,
        title: "Purple Skirt",
        description: "Elegant purple skirt with pleated design.",
        price: 420,
        image: "Image/man/man(47).png",
        images: ["Image/man/man(47).png"],
        material: "Cotton",
        fit: "A-Line",
        category: "Skirts",
        season: "All Season",
        sku: "BD-W023",
        stock: "In Stock"
    },
    {
        id: 48,
        title: "Navy Hoodie",
        description: "Comfortable navy hoodie with front pocket.",
        price: 380,
        image: "Image/man/man(48).png",
        images: ["Image/man/man(48).png"],
        material: "Cotton Blend",
        fit: "Regular Fit",
        category: "Hoodies",
        season: "All Season",
        sku: "BD-W024",
        stock: "In Stock"
    },
    {
        id: 49,
        title: "Blue Hoodie",
        description: "Soft blue hoodie perfect for active kids.",
        price: 280,
        image: "Image/man/man(49).png",
        images: ["Image/man/man(49).png"],
        material: "Cotton Blend",
        fit: "Regular Fit",
        category: "Hoodies",
        season: "All Season",
        sku: "BD-K001",
        stock: "In Stock"
    },
    {
        id: 50,
        title: "Red Jacket",
        description: "Warm red jacket for winter adventures.",
        price: 320,
        image: "Image/man/man(50).png",
        images: ["Image/man/man(50).png"],
        material: "Polyester",
        fit: "Regular Fit",
        category: "Jackets",
        season: "Winter",
        sku: "BD-K002",
        stock: "In Stock"
    },
    {
        id: 51,
        title: "Green T-Shirt",
        description: "Comfortable green T-shirt for everyday play.",
        price: 180,
        image: "Image/man/man(51).png",
        images: ["Image/man/man(51).png"],
        material: "Cotton",
        fit: "Regular Fit",
        category: "T-Shirts",
        season: "Summer",
        sku: "BD-K003",
        stock: "In Stock"
    },
    {
        id: 52,
        title: "Yellow Shorts",
        description: "Bright yellow shorts for summer fun.",
        price: 150,
        image: "Image/man/man(52).png",
        images: ["Image/man/man(52).png"],
        material: "Cotton",
        fit: "Regular Fit",
        category: "Shorts",
        season: "Summer",
        sku: "BD-K004",
        stock: "In Stock"
    },
    {
        id: 53,
        title: "Purple Dress",
        description: "Pretty purple dress for special occasions.",
        price: 250,
        image: "Image/man/man(53).png",
        images: ["Image/man/man(53).png"],
        material: "Cotton Blend",
        fit: "A-Line",
        category: "Dresses",
        season: "All Season",
        sku: "BD-K005",
        stock: "In Stock"
    },
    {
        id: 54,
        title: "Blue Jeans",
        description: "Durable blue jeans for school and play.",
        price: 220,
        image: "Image/man/man(54).png",
        images: ["Image/man/man(54).png"],
        material: "Denim",
        fit: "Regular Fit",
        category: "Jeans",
        season: "All Season",
        sku: "BD-K006",
        stock: "In Stock"
    },
    {
        id: 55,
        title: "Pink Sweater",
        description: "Cozy pink sweater for chilly days.",
        price: 200,
        image: "Image/man/man(55).png",
        images: ["Image/man/man(55).png"],
        material: "Wool Blend",
        fit: "Regular Fit",
        category: "Sweaters",
        season: "Winter",
        sku: "BD-K007",
        stock: "In Stock"
    },
    {
        id: 56,
        title: "Orange Jacket",
        description: "Fun orange jacket with hood for outdoor play.",
        price: 290,
        image: "Image/man/man(56).png",
        images: ["Image/man/man(56).png"],
        material: "Nylon",
        fit: "Regular Fit",
        category: "Jackets",
        season: "Spring/Fall",
        sku: "BD-K008",
        stock: "In Stock"
    },
    {
        id: 57,
        title: "White Polo",
        description: "Classic white polo shirt for smart casual wear.",
        price: 160,
        image: "Image/man/man(57).png",
        images: ["Image/man/man(57).png"],
        material: "Cotton",
        fit: "Regular Fit",
        category: "Polo Shirts",
        season: "All Season",
        sku: "BD-K009",
        stock: "In Stock"
    },
    {
        id: 58,
        title: "Black Hoodie",
        description: "Cool black hoodie with graphic prints.",
        price: 260,
        image: "Image/man/man(58).png",
        images: ["Image/man/man(58).png"],
        material: "Cotton Blend",
        fit: "Regular Fit",
        category: "Hoodies",
        season: "All Season",
        sku: "BD-K010",
        stock: "In Stock"
    },
    {
        id: 59,
        title: "Red Coat",
        description: "Warm red coat for winter protection.",
        price: 380,
        image: "Image/man/man(59).png",
        images: ["Image/man/man(59).png"],
        material: "Wool Blend",
        fit: "Regular Fit",
        category: "Coats",
        season: "Winter",
        sku: "BD-K011",
        stock: "In Stock"
    },
    {
        id: 60,
        title: "Yellow Raincoat",
        description: "Bright yellow raincoat for rainy days.",
        price: 190,
        image: "Image/man/man(60).png",
        images: ["Image/man/man(60).png"],
        material: "PVC",
        fit: "Regular Fit",
        category: "Raincoats",
        season: "Rainy Season",
        sku: "BD-K012",
        stock: "In Stock"
    },
    {
        id: 61,
        title: "Green Tracksuit",
        description: "Comfortable green tracksuit for sports and play.",
        price: 340,
        image: "Image/man/man(61).png",
        images: ["Image/man/man(61).png"],
        material: "Polyester",
        fit: "Regular Fit",
        category: "Tracksuits",
        season: "All Season",
        sku: "BD-K013",
        stock: "In Stock"
    },
    {
        id: 62,
        title: "Purple Pajamas",
        description: "Soft purple pajamas for comfortable sleep.",
        price: 170,
        image: "Image/man/man(62).png",
        images: ["Image/man/man(62).png"],
        material: "Cotton",
        fit: "Regular Fit",
        category: "Pajamas",
        season: "All Season",
        sku: "BD-K014",
        stock: "In Stock"
    },
    {
        id: 63,
        title: "Blue Blazer",
        description: "Smart blue blazer for school uniforms.",
        price: 420,
        image: "Image/man/man(63).png",
        images: ["Image/man/man(63).png"],
        material: "Wool Blend",
        fit: "Regular Fit",
        category: "Blazers",
        season: "All Season",
        sku: "BD-K015",
        stock: "In Stock"
    },
    {
        id: 64,
        title: "Pink Dress",
        description: "Adorable pink dress for parties and events.",
        price: 230,
        image: "Image/man/man(64).png",
        images: ["Image/man/man(64).png"],
        material: "Cotton Blend",
        fit: "A-Line",
        category: "Dresses",
        season: "All Season",
        sku: "BD-K016",
        stock: "In Stock"
    },
    {
        id: 65,
        title: "Navy Sweater",
        description: "Cozy navy sweater for chilly autumn days.",
        price: 210,
        image: "Image/man/man(65).png",
        images: ["Image/man/man(65).png"],
        material: "Wool Blend",
        fit: "Regular Fit",
        category: "Sweaters",
        season: "Fall",
        sku: "BD-K017",
        stock: "In Stock"
    },
    {
        id: 66,
        title: "Orange T-Shirt",
        description: "Bright orange T-shirt for energetic kids.",
        price: 140,
        image: "Image/man/man(66).png",
        images: ["Image/man/man(66).png"],
        material: "Cotton",
        fit: "Regular Fit",
        category: "T-Shirts",
        season: "Summer",
        sku: "BD-K018",
        stock: "In Stock"
    },
    {
        id: 67,
        title: "Grey Joggers",
        description: "Comfortable grey joggers for casual wear.",
        price: 180,
        image: "Image/man/man(67).png",
        images: ["Image/man/man(67).png"],
        material: "Cotton Blend",
        fit: "Regular Fit",
        category: "Pants",
        season: "All Season",
        sku: "BD-K019",
        stock: "In Stock"
    },
    {
        id: 68,
        title: "White Cardigan",
        description: "Light white cardigan for layering.",
        price: 160,
        image: "Image/man/man(68).png",
        images: ["Image/man/man(68).png"],
        material: "Cotton",
        fit: "Regular Fit",
        category: "Cardigans",
        season: "Spring/Fall",
        sku: "BD-K020",
        stock: "In Stock"
    },
    {
        id: 69,
        title: "Blue Polo",
        description: "Classic blue polo shirt for school.",
        price: 170,
        image: "Image/man/man(69).png",
        images: ["Image/man/man(69).png"],
        material: "Cotton",
        fit: "Regular Fit",
        category: "Polo Shirts",
        season: "All Season",
        sku: "BD-K021",
        stock: "In Stock"
    },
    {
        id: 70,
        title: "Green Hoodie",
        description: "Fun green hoodie with fun patterns.",
        price: 270,
        image: "Image/man/man(70).png",
        images: ["Image/man/man(70).png"],
        material: "Cotton Blend",
        fit: "Regular Fit",
        category: "Hoodies",
        season: "All Season",
        sku: "BD-K022",
        stock: "In Stock"
    },
    {
        id: 71,
        title: "Yellow Jacket",
        description: "Bright yellow jacket for visibility.",
        price: 310,
        image: "Image/man/man(71).png",
        images: ["Image/man/man(71).png"],
        material: "Nylon",
        fit: "Regular Fit",
        category: "Jackets",
        season: "Spring/Fall",
        sku: "BD-K023",
        stock: "In Stock"
    },
    {
        id: 72,
        title: "Purple Skirt",
        description: "Pretty purple skirt for girls.",
        price: 190,
        image: "Image/man/man(72).png",
        images: ["Image/man/man(72).png"],
        material: "Cotton",
        fit: "A-Line",
        category: "Skirts",
        season: "All Season",
        sku: "BD-K024",
        stock: "In Stock"
    }
];

// Normalize SKUs to match ID numbers: BD-F001 to BD-F072
PRODUCTS.forEach(product => {
    const normalizedId = product.id;
    product.sku = `BD-F${String(normalizedId).padStart(3, '0')}`;
});

// ===============================
//  PAGINATION + AUTO RENDER
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const productsGrid = document.getElementById("productsGrid");
    const categoryButtons = document.querySelectorAll('.category-btn');
    const body = document.body;
    const isCategoryPage = body.dataset.categoryPage === 'true';

    if (isCategoryPage) {
        return;
    }

    let currentCategory = 'all'; // Default to show all products
    let currentPage = 1;
    const itemsPerPage = 12;

    function getFilteredProducts() {
        return PRODUCTS;
    }

    function getPaginatedProducts() {
        const allFiltered = getFilteredProducts();
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return allFiltered.slice(startIndex, endIndex);
    }

    function getTotalPages() {
        const totalItems = getFilteredProducts().length;
        return Math.ceil(totalItems / itemsPerPage);
    }

    function renderPagination() {
        const totalPages = getTotalPages();
        const paginationContainer = document.getElementById('paginationContainer');

        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let paginationHTML = '<div class="flex justify-center items-center gap-2 mt-8">';

        // Previous button
        if (currentPage > 1) {
            paginationHTML += `<button class="pagination-btn px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" data-page="${currentPage - 1}">Previous</button>`;
        }

        // Page numbers
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        if (startPage > 1) {
            paginationHTML += `<button class="pagination-btn px-3 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition" data-page="1">1</button>`;
            if (startPage > 2) {
                paginationHTML += '<span class="px-2">...</span>';
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            const isActive = i === currentPage;
            const activeClass = isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300';
            paginationHTML += `<button class="pagination-btn px-3 py-2 ${activeClass} rounded-lg transition" data-page="${i}">${i}</button>`;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += '<span class="px-2">...</span>';
            }
            paginationHTML += `<button class="pagination-btn px-3 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition" data-page="${totalPages}">${totalPages}</button>`;
        }

        // Next button
        if (currentPage < totalPages) {
            paginationHTML += `<button class="pagination-btn px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" data-page="${currentPage + 1}">Next</button>`;
        }

        paginationHTML += '</div>';
        paginationContainer.innerHTML = paginationHTML;

        // Add event listeners to pagination buttons
        document.querySelectorAll('.pagination-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = parseInt(e.target.dataset.page);
                if (page && page !== currentPage) {
                    currentPage = page;
                    renderProducts();
                    renderPagination();
                    // Scroll to top of products section
                    document.getElementById('productsGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    function renderProducts() {
        const items = getPaginatedProducts();
        productsGrid.innerHTML = "";

        if (!items.length) {
            productsGrid.innerHTML = `<div class="col-span-full text-center text-gray-500">No products found for this category.</div>`;
            return;
        }

        items.forEach(p => {
            productsGrid.innerHTML += `
        <div class="bg-white shadow rounded-xl p-4 product-card transition">
            <img src="${p.image}" loading="lazy" class="w-full h-60 object-cover rounded-lg mb-4" alt="${p.title}">

            <h3 class="font-bold text-lg">${p.title}</h3>
            <p class="text-gray-600 text-sm mb-4">৳${p.price}</p>

            <a href="product-detail.html?id=${p.id}"
               class="block text-center bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
               Order Now
            </a>
        </div>
    `;
        });

        renderPagination();
    }

    // Add click event listeners to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentCategory = button.dataset.category;
            currentPage = 1; // Reset to first page when changing category
            renderProducts();
            highlightActiveButton();
        });
    });

    // Initial render
    renderProducts();
    highlightActiveButton();
});
