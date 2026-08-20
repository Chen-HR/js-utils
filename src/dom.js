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
    async querySelector(ele, selector, wait_ms = 1000, timeout_ms = 16000) {
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
    async querySelectorAll(ele, selector, wait_ms = 1000, timeout_ms = 16000) {
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
    },

    /**
     * Creates a new DOM element configured to copy specified content to the clipboard upon clicking it.
     *
     * @param {string} eleName - The tag name of the element (e.g., 'button').
     * @param {string} eleId - The ID to assign to the created element.
     * @param {string} eleContent - The visible text content displayed on the element.
     * @param {string} copyContent - The actual text content that will be copied to the clipboard.
     * @param {string} [eleStyle] - Optional CSS string to apply inline styles (e.g., "color: blue; padding: 10px;").
     * @param {string} [eleClass] - Optional CSS class name(s) to assign to the element (e.g., "btn primary").
     * @param {() => void} [onLoad] - Optional callback function executed after successful copying.
     * @param {(err: Error) => void} [onError] - Optional callback function executed if copying fails.
     * @returns {HTMLElement} The newly created and configured DOM element.
     */
    createElement_copy(eleName, eleId, eleContent, copyContent, eleStyle = "", eleClass = "", onLoad = () => {}, onError = (err) => {}) {
      const ele = document.createElement(eleName);
      ele.id = eleId;
      ele.textContent = eleContent;
      ele.style = eleStyle;
      ele.className = eleClass;
      ele.addEventListener('click', function () {
        navigator.clipboard.writeText(copyContent).then(() => {
          onLoad();
        }).catch(err => {
          onError(err);
        });
      });
      return ele;
    },

    /**
     * Creates a new DOM element configured to trigger a file download upon clicking it.
     *
     * @param {string} eleName - The tag name of the element (e.g., 'button').
     * @param {string} eleId - The ID to assign to the created element.
     * @param {string} eleContent - The visible text content displayed on the element.
     * @param {string} fileName - The desired filename for the downloaded file.
     * @param {(Blob|string)} fileContent - The content of the file (can be a Blob or string).
     * @param {string} [eleStyle] - Optional CSS string to apply inline styles (e.g., "color: blue; padding: 10px;").
     * @param {string} [eleClass] - Optional CSS class name(s) to assign to the element (e.g., "btn primary").
     * @param {string} [fileType='text/plain;charset=utf-8'] - The MIME type of the file.
     * @param {() => void} [onLoad] - Optional callback function executed after successful download.
     * @param {(err: Error) => void} [onError] - Optional callback function executed if downloading fails.
     * @returns {HTMLElement} The newly created and configured DOM element.
     */
    createElement_download(eleName, eleId, eleContent, fileName, fileContent, eleStyle = "", eleClass = "", fileType = 'text/plain;charset=utf-8', onLoad = () => {}, onError = (err) => {}) {
      const ele = document.createElement(eleName);
      ele.id = eleId;
      ele.textContent = eleContent;
      ele.style = eleStyle;
      ele.className = eleClass;
      ele.addEventListener('click', async function (event) {
        try {
          const url = URL.createObjectURL(fileContent instanceof Blob ? fileContent : new Blob([fileContent], { type: fileType }));
          const a = document.createElement('a'); a.href = url; a.download = fileName;
          document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
          onLoad();
        } catch (err) {
          onError(err);
        }
      });
      return ele;
    },
  });

})(globalThis.Utils ??= {});