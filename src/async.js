(function (Utils) {
    "use strict";

    const Async = Object.freeze({
        sleep_ms(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    });

    Utils.Async = Async;

})(globalThis.Utils ??= {});
