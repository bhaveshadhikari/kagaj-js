(() => {
    // Capture currentScript IMMEDIATELY at parse time
    const scriptSrc = document.currentScript?.src;

    const loadKagajCSS = () => {
        if (document.getElementById('kagaj-css')) return;

        // Use the captured script source
        const cssPath = new URL('https://raw.githubusercontent.com/bhaveshadhikari/kagaj-js/refs/heads/main/kagaj.css', scriptSrc).href;

        const link = document.createElement('link');
        link.id = 'kagaj-css';
        link.rel = 'stylesheet';
        link.href = cssPath;

        document.head.appendChild(link);
    };

    const initKagaj = () => {
        document.querySelectorAll('.kagaj').forEach(el => {
            if (el.dataset.processed) return;

            const content = el.innerHTML;

            el.innerHTML = `
                <div class="kagaj-container">
                    <div class="kagaj-torn-left kagaj-noise"></div>
                    <div class="kagaj-content kagaj-noise">
                        ${content}
                    </div>
                    <div class="kagaj-torn-right kagaj-noise"></div>
                </div>
            `;

            el.dataset.processed = "true";
        });
    };

    // Load CSS immediately
    loadKagajCSS();

    // Initialize Kagaj elements when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initKagaj);
    } else {
        initKagaj();
    }
})();