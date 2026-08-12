document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("page-skeleton")) return;

    const overlay = document.createElement("div");
    overlay.id = "page-skeleton";
    overlay.className = "page-skeleton";

    overlay.innerHTML = `
        <div class="skeleton-shell">
            <div class="skeleton-row header">
                <div class="skeleton-block skeleton-logo"></div>
                <div class="skeleton-block skeleton-nav"></div>
            </div>
            <div class="skeleton-section">
                <div class="skeleton-block skeleton-title"></div>
                <div class="skeleton-block skeleton-subtitle"></div>
            </div>
            <div class="skeleton-grid">
                ${Array.from({ length: 6 }).map(() => `
                    <div class="skeleton-card">
                        <div class="skeleton-block skeleton-image"></div>
                        <div class="skeleton-line"></div>
                        <div class="skeleton-line short"></div>
                    </div>
                `).join("")}
            </div>
        </div>
    `;

    document.body.prepend(overlay);
});

window.addEventListener("load", () => {
    const overlay = document.getElementById("page-skeleton");
    if (!overlay) return;

    overlay.classList.add("page-skeleton-hidden");
    setTimeout(() => {
        overlay.remove();
    }, 500);
});
