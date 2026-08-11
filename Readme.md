# Utils

A lightweight JavaScript utility library for Tampermonkey users.

Utils provides commonly used JavaScript utilities for developing and maintaining Tampermonkey userscripts. The library is organized into independent modules, with each module exposing its functionality through the `Utils` namespace.

## Features

- Designed for Tampermonkey userscripts
- Modular source structure
- No build or bundling process required
- Single global namespace: `Utils`
- Independent namespace for each module
- Directly loadable through Tampermonkey `@require`

## Repository Structure

```text
js-utils/
├ src/
│ ├ async.js
│ ├ array.js
│ ├ dom.js
│ └ string.js
└ Readme.md
```

The `src` directory is the single source of truth for all utility modules. No duplicated or generated distribution files are maintained.

## Modules

| Module | Namespace | Description |
|---|---|---|
| `async.js` | `Utils.Async` | Asynchronous operation utilities |
| `array.js` | `Utils.Array` | Array manipulation utilities |
| `dom.js` | `Utils.DOM` | DOM querying and interaction utilities |
| `string.js` | `Utils.String` | String processing utilities |

Additional modules can be added to `src` as the library grows.

## Namespace

Each module exposes its functionality through a dedicated namespace under `Utils`.

```text
Utils
├ Async
├ Array
├ DOM
└ String
```

This structure prevents individual utility functions from being added directly to the global scope and reduces the possibility of naming conflicts with websites or other userscripts.

## Usage with Tampermonkey

Modules can be loaded directly through the Tampermonkey `@require` directive.

```js
// ==UserScript==
// @name         My Tampermonkey Script
// @match        https://example.com/*
// @require      https://cdn.jsdelivr.net/gh/Chen-HR/js-utils@0.1/src/async.js
// @require      https://cdn.jsdelivr.net/gh/Chen-HR/js-utils@0.1/src/array.js
// @require      https://cdn.jsdelivr.net/gh/Chen-HR/js-utils@0.1/src/dom.js
// @require      https://cdn.jsdelivr.net/gh/Chen-HR/js-utils@0.1/src/string.js
// @grant        none
// ==/UserScript==
```

After the required modules are loaded, their functionality is available through the corresponding `Utils` namespaces.

```js
await Utils.Async.sleep_ms(1000);

const items = await Utils.DOM.querySelectorAll(
    document,
    ".item"
);
```

## Adding a Module

New utility categories should be implemented as independent files under `src`.

For example:

```text
src/
├ async.js
├ array.js
├ dom.js
├ string.js
└ url.js
```

The new module should expose its functionality through a corresponding namespace:

```text
Utils.URL
```

This keeps the repository modular and allows Tampermonkey scripts to load only the modules they require.
