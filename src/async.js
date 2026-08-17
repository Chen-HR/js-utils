(function (Utils) {
  "use strict";

  Utils.Async = Object.freeze({
    sleep_ms(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  });

})(globalThis.Utils ??= {});
