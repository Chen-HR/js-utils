(function (Utils) {
  "use strict";

  Utils.Array = Object.freeze({
    unique(arr) {
      return [...new Set(arr)];
    }
  });

})(globalThis.Utils ??= {});
