const cartKey = "cart";

const getCart = () => JSON.parse(localStorage.getItem(cartKey)) || [];
const setCart = cart => localStorage.setItem(cartKey, JSON.stringify(cart));

const formatPrice = price => price;

const calculateTotal = cart => {
    return cart.reduce((sum, item) => {
        const numeric = Number(item.price.replace(/[^0-9.-]+/g, ""));
        return sum + (isNaN(numeric) ? 0 : numeric);
    }, 0);
};

const renderCart = () => {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartEmpty = document.getElementById("cart-empty");
    const cart = getCart();

    if (!cartItems || !cartTotal || !cartEmpty) return;

    cartItems.innerHTML = cart.length
        ? cart.map((item, index) => `
            <div class="product" style="width: 100%; max-width: 100%; display: grid; grid-template-columns: 120px 1fr auto; gap: 1rem; align-items: center; padding: 1rem; border-radius: 16px; background: rgba(255,255,255,0.04); border: 1px solid rgba(244,174,61,0.12);">
                <img src="${item.image}" alt="${item.name}" style="width: 100%; height: auto; border-radius: 12px; object-fit: cover;" />
                <div>
                    <h3 style="margin: 0 0 0.5rem; color: var(--secondary-color);">${item.name}</h3>
                    <p style="margin: 0 0 0.5rem; color: var(--text-color);">${item.price}</p>
                    <p style="margin: 0; color: var(--muted-color);">Quantity: 1</p>
                </div>
                <button class="btn2 remove-cart-btn" data-index="${index}" type="button" style="height: 2.4rem; align-self: start;">Remove</button>
            </div>
        `).join("")
        : "";

    cartEmpty.textContent = cart.length ? "" : "Your cart is empty.";
    cartTotal.textContent = cart.length ? `GHC ${calculateTotal(cart).toLocaleString()}.00` : "GHC 0.00";
};

const updateCartCount = () => {
    const countElement = document.getElementById("cart-count");
    if (!countElement) return;
    countElement.textContent = getCart().length;
};

const removeFromCart = index => {
    const cart = getCart();
    cart.splice(index, 1);
    setCart(cart);
    renderCart();
    updateCartCount();
};

const clearCart = () => {
    setCart([]);
    renderCart();
    updateCartCount();
};

const handleCheckout = () => {
    const cart = getCart();
    if (!cart.length) {
        alert("Your cart is empty. Add items before checking out.");
        return;
    }

    alert("Thank you for your purchase! Your order has been placed successfully.");
    clearCart();
};

window.addEventListener("DOMContentLoaded", () => {
    renderCart();
    updateCartCount();

    const cartItems = document.getElementById("cart-items");
    const clearButton = document.getElementById("clear-cart");
    const checkoutButton = document.getElementById("checkout-btn");

    if (cartItems) {
        cartItems.addEventListener("click", event => {
            const button = event.target.closest(".remove-cart-btn");
            if (!button) return;
            const index = Number(button.dataset.index);
            removeFromCart(index);
        });
    }

    if (clearButton) {
        clearButton.addEventListener("click", clearCart);
    }

    if (checkoutButton) {
        checkoutButton.addEventListener("click", handleCheckout);
    }
});
