(() => {

    const injectGoogleFonts = () => {
        // Check if already injected
        if (document.getElementById('kagaj-fonts')) return;

        // Preconnect to Google Fonts
        const preconnect1 = document.createElement('link');
        preconnect1.rel = 'preconnect';
        preconnect1.href = 'https://fonts.googleapis.com';

        const preconnect2 = document.createElement('link');
        preconnect2.rel = 'preconnect';
        preconnect2.href = 'https://fonts.gstatic.com';
        preconnect2.crossOrigin = 'anonymous';

        // Load the font
        const fontLink = document.createElement('link');
        fontLink.id = 'kagaj-fonts';
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap';

        // Inject into head
        document.head.appendChild(preconnect1);
        document.head.appendChild(preconnect2);
        document.head.appendChild(fontLink);
    };

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

    // inject google font
    injectGoogleFonts();

    // Load CSS immediately
    loadKagajCSS();

    // Initialize Kagaj elements when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initKagaj);
    } else {
        initKagaj();
    }
})();