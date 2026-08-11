(function (Utils) {
    "use strict";

    const DOMUtils = {
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
        async querySelector( ele, selector, wait_ms = 100, timeout_ms = 10000 ) {
            const startTime = Date.now();
            while (true) {
                const subele = ele.querySelector(selector);
                if (subele) return subele;
                if (Date.now() - startTime >= timeout_ms) throw new Error(`querySelector timeout: "${selector}"`);
                await Utils.Async.sleep_ms(wait_ms);
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
        async querySelectorAll( ele, selector, wait_ms = 100, timeout_ms = 10000 ) {
            const startTime = Date.now();
            while (true) {
                const subele = ele.querySelectorAll(selector);
                if (subele.length > 0) return subele;
                if (Date.now() - startTime >= timeout_ms) throw new Error(`querySelectorAll timeout: "${selector}"`);
                await Utils.Async.sleep_ms(wait_ms);
            }
        }

    };

    Utils.DOM = Object.freeze(DOMUtils);

})(globalThis.Utils ??= {});