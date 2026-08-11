(function (Utils) {
    "use strict";
    
    const minorWords = new Set([
        "and", "or", "nor",
        "but", "of", "for",
        "from", "to",
        "in", "on", "at",
        "by", "with", "via"
    ]);


    const StringUtils = {
        toTitleCase(str) {
            const tokens = str.split(/([ -])/);
            let isFirstWord = true;
            return tokens.map(token => {
                    if (token === " " || token === "-") return token;
                    const lower = token.toLowerCase();
                    if (token === token.toUpperCase() && token.search(/[A-Z]/) !== -1) {
                        isFirstWord = false;
                        return token;
                    }
                    if (!isFirstWord && minorWords.has(lower)) return lower;
                    isFirstWord = false;
                    return (token.charAt(0).toUpperCase() + token.slice(1).toLowerCase());
                }).join("");
        }
    };

    Utils.String = Object.freeze(StringUtils);

})(globalThis.Utils ??= {});
