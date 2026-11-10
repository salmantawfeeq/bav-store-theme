/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/js/base-page.js"
/*!************************************!*\
  !*** ./src/assets/js/base-page.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass BasePage {\n  constructor() {}\n  onReady() {\n    //\n  }\n  registerEvents() {\n    //\n  }\n\n  /**\n   * To avoid loading unwanted classes, unless it's wanted page\n   * @param {null|string[]} allowedPages\n   * @return {*}\n   */\n  initiate(allowedPages) {\n    if (allowedPages && !allowedPages.includes(salla.config.get('page.slug'))) {\n      return app.log(`The Class For (${allowedPages.join(',')}) Skipped.`);\n    }\n    this.onReady();\n    this.registerEvents();\n    app.log(`The Class For (${allowedPages?.join(',') || '*'}) Loaded🎉`);\n  }\n}\n\n/**\n * Because we merged multi classes into one file, there is no need to initiate all of them\n */\nBasePage.initiateWhenReady = function (allowedPages = null) {\n  if (window.app?.status === 'ready') {\n    new this().initiate(allowedPages);\n  } else {\n    document.addEventListener('theme::ready', () => new this().initiate(allowedPages));\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BasePage);\n\n//# sourceURL=webpack://bav-store-theme/./src/assets/js/base-page.js?\n}");

/***/ },

/***/ "./src/assets/js/partials/product-card.js"
/*!************************************************!*\
  !*** ./src/assets/js/partials/product-card.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base-page */ \"./src/assets/js/base-page.js\");\n\nclass ProductCard extends HTMLElement {\n  constructor() {\n    super();\n  }\n  connectedCallback() {\n    // Parse product data\n    this.product = this.product || JSON.parse(this.getAttribute('product'));\n    if (window.app?.status === 'ready') {\n      this.onReady();\n    } else {\n      document.addEventListener('theme::ready', () => this.onReady());\n    }\n  }\n  onReady() {\n    this.fitImageHeight = salla.config.get('store.settings.product.fit_type');\n    this.placeholder = salla.url.asset(salla.config.get('theme.settings.placeholder'));\n    this.getProps();\n    salla.lang.onLoaded(() => {\n      // Language\n      this.remained = salla.lang.get('pages.products.remained');\n      this.donationAmount = salla.lang.get('pages.products.donation_amount');\n      this.startingPrice = salla.lang.get('pages.products.starting_price');\n      this.addToCart = salla.lang.get('pages.cart.add_to_cart');\n      this.outOfStock = salla.lang.get('pages.products.out_of_stock');\n\n      // re-render to update translations\n      this.render();\n    });\n    this.render();\n  }\n  getPriceFormat(price) {\n    if (!price || price == 0) {\n      return salla.config.get('store.settings.product.show_price_as_dash') ? '-' : '';\n    }\n    return salla.money(price);\n  }\n  getAddButtonLabel() {\n    if (this.product.has_preorder_campaign) {\n      return salla.lang.get('pages.products.pre_order_now');\n    }\n    if (this.product.status === 'sale' && this.product.type === 'booking') {\n      return salla.lang.get('pages.cart.book_now');\n    }\n    if (this.product.status === 'sale') {\n      return salla.lang.get('pages.cart.add_to_cart');\n    }\n    if (this.product.type !== 'donating') {\n      return salla.lang.get('pages.products.out_of_stock');\n    }\n\n    // donating\n    return salla.lang.get('pages.products.donation_exceed');\n  }\n  getProps() {\n    /**\n     *  Horizontal card.\n     */\n    this.horizontal = this.hasAttribute('horizontal');\n\n    /**\n     *  Support shadow on hover.\n     */\n    this.shadowOnHover = this.hasAttribute('shadowOnHover');\n\n    /**\n     *  Hide add to cart button.\n     */\n    this.hideAddBtn = this.hasAttribute('hideAddBtn');\n\n    /**\n     *  Full image card.\n     */\n    this.fullImage = this.hasAttribute('fullImage');\n\n    /**\n     *  Minimal card.\n     */\n    this.minimal = this.hasAttribute('minimal');\n\n    /**\n     *  Special card.\n     */\n    this.isSpecial = this.hasAttribute('isSpecial');\n\n    /**\n     *  Show quantity.\n     */\n    this.showQuantity = this.hasAttribute('showQuantity');\n  }\n  escapeHTML(str = '') {\n    return String(str).replace(/&/g, \"&amp;\").replace(/\"/g, \"&quot;\").replace(/'/g, \"&#39;\").replace(/</g, \"&lt;\").replace(/>/g, \"&gt;\");\n  }\n  getPercentOff() {\n    if (!this.product.is_on_sale || !this.product.regular_price) return 0;\n    return Math.round((1 - this.product.sale_price / this.product.regular_price) * 100);\n  }\n  render() {\n    this.classList.add('pcard');\n    this.setAttribute('id', this.product.id);\n    const percentOff = this.getPercentOff();\n    const img = this.product?.image?.url || this.placeholder || '';\n    const alt = this.escapeHTML(this.product?.image?.alt || this.product.name);\n    const addLabel = this.product.add_to_cart_label || this.getAddButtonLabel();\n    this.innerHTML = `\n      <a href=\"${this.product?.url}\" class=\"pimg-link\" aria-label=\"${alt}\">\n        <div class=\"pimg\">\n          <img src=\"${img}\" alt=\"${alt}\" loading=\"lazy\">\n          ${percentOff > 0 ? `<span class=\"save num\" dir=\"ltr\">-${percentOff}%</span>` : ''}\n          ${this.product.promotion_title ? `<span class=\"badge\">${this.escapeHTML(this.product.promotion_title)}</span>` : ''}\n        </div>\n      </a>\n      <div class=\"pbody\">\n        <a href=\"${this.product?.url}\"><div class=\"pname\">${this.escapeHTML(this.product?.name)}</div></a>\n        ${this.product?.subtitle ? `<div class=\"psub\">${this.escapeHTML(this.product.subtitle)}</div>` : ''}\n        <div class=\"prow\">\n          ${this.product.is_on_sale ? `<span class=\"price num\">${this.getPriceFormat(this.product.sale_price)}</span><s class=\"old\">${this.getPriceFormat(this.product.regular_price)}</s>` : `<span class=\"price num\">${this.getPriceFormat(this.product?.price)}</span>`}\n        </div>\n        <salla-add-product-button fill=\"outline\" width=\"wide\" class=\"pbtn\"\n          product-id=\"${this.product.id}\"\n          product-status=\"${this.product.status}\"\n          product-type=\"${this.product.type}\">\n          <span>${addLabel}</span>\n        </salla-add-product-button>\n      </div>\n    `;\n    return;\n  }\n}\ncustomElements.define('custom-salla-product-card', ProductCard);\n\n//# sourceURL=webpack://bav-store-theme/./src/assets/js/partials/product-card.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	let __webpack_exports__ = __webpack_require__("./src/assets/js/partials/product-card.js");
/******/ 	
/******/ })()
;