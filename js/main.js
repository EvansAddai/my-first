const product1 = [
    { id: 1, image: "../assets/AESA 42.jpg", name: "AESA 42", price: "GHC 154,000.00" },
    { id: 2, image: "../assets/AESA 43.jpg", name: "AESA 43", price: "GHC 165,000.00" },
    { id: 3, image: "../assets/AESA 44.jpg", name: "AESA 44", price: "GHC 170,000.00" },
    { id: 4, image: "../assets/AESA 45.jpg", name: "AESA 45", price: "GHC 173,000.00" },
];

const product3 = [
    { id: 11, image: "../assets/Future 05.jpg", name: "Future 05", price: "GHC 454,000.00" },
    { id: 12, image: "../assets/Future 04.jpg", name: "Future 04", price: "GHC 464,000.00" },
    { id: 13, image: "../assets/Future 03.jpg", name: "Future 03", price: "GHC 474,000.00" },
    { id: 14, image: "../assets/Future 02.jpg", name: "Future 02", price: "GHC 484,000.00" },
    { id: 15, image: "../assets/Future 01.jpeg", name: "Future 01", price: "GHC 494,000.00" },
    { id: 10, image: "../assets/Future 06.jpg", name: "Future 06", price: "GHC 465,000.00" },
    { id: 9, image: "../assets/FUTURE M3.jpg", name: "Future M3", price: "GHC 100,000.00" },
    { id: 8, image: "../assets/FUTURE M4.jpg", name: "Future M4", price: "GHC 113,000.00" },
];

const product4 = [
    { id: 16, image: "../assets/MARK 21.jpg", name: "Mark 21", price: "GHC 164,000.00" },
    { id: 17, image: "../assets/MARK 22.jpg", name: "Mark 22", price: "GHC 175,000.00" },
    { id: 18, image: "../assets/MARK 23.jpeg", name: "Mark 23", price: "GHC 180,000.00" },
    { id: 19, image: "../assets/MARK 24.jpg", name: "Mark 24", price: "GHC 183,000.00" },
];

const product5 = [
    { id: 20, image: "../assets/MJ 05.jpg", name: "MJ 05", price: "GHC 54,000.00" },
    { id: 21, image: "../assets/MJ 06.jpg", name: "MJ 06", price: "GHC 65,000.00" },
    { id: 22, image: "../assets/MJ 07.jpg", name: "MJ 07", price: "GHC 64,000.00" },
];

const product2 = [
    { id: 5, image: "../assets/Lamborghini_aventador 02.jpg", name: "Lamborghini Aventador 1", price: "GHC 254,000.00" },
    { id: 6, image: "../assets/Lamborghini_aventador 03.jpg", name: "Lamborghini Aventador 2", price: "GHC 265,000.00" },
    { id: 7, image: "../assets/Lamborghini_aventador.jpg", name: "Lamborghini Aventador 3", price: "GHC 270,000.00" },
];

const cartKey = "cart";
const allProducts = [...product1, ...product2, ...product3, ...product4, ...product5];

const getCart = () => JSON.parse(localStorage.getItem(cartKey)) || [];
const setCart = cart => localStorage.setItem(cartKey, JSON.stringify(cart));

const updateCartCount = () => {
    const countElement = document.getElementById("cart-count");
    if (!countElement) return;
    countElement.textContent = getCart().length;
};

const addToCart = productId => {
    const product = allProducts.find(item => item.id === Number(productId));
    if (!product) return;

    const cart = getCart();
    cart.push(product);
    setCart(cart);
    updateCartCount();
};

const renderProducts = (products, selector) => {
    const container = document.querySelector(selector);
    if (!container) return;

    container.innerHTML = products
        .map(product => `
            <div class="product">
                <img src="${product.image}" alt="${product.name}" class="product-image" />
                <h2 class="product-name">${product.name}</h2>
                <p class="product-price">Price: ${product.price}</p>
                <p class="product-description">Description: This is a great product!</p>
                <button type="button" class="add-cart-btn" data-product-id="${product.id}">Add to Cart</button>
            </div>
        `)
        .join("");
};

renderProducts(product1, '#AESA-categories');
renderProducts(product3, '#future-categories');
renderProducts(product4, '#mark-categories');
renderProducts(product5, '#mj-categories');
renderProducts(product2, '#lamborghini-categories');

updateCartCount();

document.body.addEventListener('click', event => {
    const button = event.target.closest('.add-cart-btn');
    if (!button) return;

    const productId = button.dataset.productId;
    addToCart(productId);
    button.textContent = 'Added';
    button.disabled = true;
    setTimeout(() => {
        button.textContent = 'Add to Cart';
        button.disabled = false;
    }, 900);
});
