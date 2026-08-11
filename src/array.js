(function (Utils) {
    "use strict";

    const ArrayUtils = Object.freeze({
        unique(arr) {
            return [...new Set(arr)];
        }
    });

    Utils.Array = ArrayUtils;

})(globalThis.Utils ??= {});
