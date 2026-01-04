(() => {
    const loadKagajCSS = async () => {
        if (document.getElementById('kagaj-css')) return;

        try {
            const response = await fetch('https://raw.githubusercontent.com/bhaveshadhikari/kagaj-js/refs/heads/main/kagaj.css');
            const cssText = await response.text();

            const style = document.createElement('style');
            style.id = 'kagaj-css';
            style.textContent = cssText;

            document.head.appendChild(style);
        } catch (error) {
            console.error('Failed to load Kagaj CSS:', error);
        }
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