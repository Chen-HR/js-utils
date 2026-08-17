(function (Utils) {
    "use strict";

    Utils.DOM = Object.freeze({
        /**
         * Wait until an element matching the selector exists.
         *
         * @param {Element|Document} ele - Root element used for querying.
         * @param {string} selector - CSS selector.
         * @param {number} wait_ms - Polling interval in milliseconds.
         * @param {number} timeout_ms - Maximum waiting time in milliseconds.
         * @returns {Promise<Element>}
         * @throws {Error} If the timeout is reached before finding the element.
         */
        async querySelector( ele, selector, wait_ms = 1000, timeout_ms = 16000 ) {
            const startTime = Date.now();
            while (true) {
                await Utils.Async.sleep_ms(wait_ms);
                const subele = ele.querySelector(selector);
                if (subele) return subele;
                if (Date.now() - startTime >= timeout_ms) throw new Error(`querySelector timeout: "${selector}"`);
            }
        },

        /**
         * Wait until at least one element matching the selector exists.
         *
         * @param {Element|Document} ele - Root element used for querying.
         * @param {string} selector - CSS selector.
         * @param {number} wait_ms - Polling interval in milliseconds.
         * @param {number} timeout_ms - Maximum waiting time in milliseconds.
         * @returns {Promise<NodeList>}
         * @throws {Error} If the timeout is reached before finding elements.
         */
        async querySelectorAll( ele, selector, wait_ms = 1000, timeout_ms = 16000 ) {
            const startTime = Date.now();
            while (true) {
                await Utils.Async.sleep_ms(wait_ms);
                const subele = ele.querySelectorAll(selector);
                if (subele.length > 0) return subele;
                if (Date.now() - startTime >= timeout_ms) throw new Error(`querySelectorAll timeout: "${selector}"`);
            }
        },

        /**
         * Loads an external script into the document head and waits for it to load.
         *
         * @param {string} src - The URL of the script to load.
         * @returns {Promise<void>} A promise that resolves when the script has successfully loaded, or rejects if an error occurs during loading.
         */
        async loadScript(src) {
            return new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }

    });

})(globalThis.Utils ??= {});