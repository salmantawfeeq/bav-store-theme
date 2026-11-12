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

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass BasePage {\n  constructor() {}\n  onReady() {\n    //\n  }\n  registerEvents() {\n    //\n  }\n\n  /**\r\n   * To avoid loading unwanted classes, unless it's wanted page\r\n   * @param {null|string[]} allowedPages\r\n   * @return {*}\r\n   */\n  initiate(allowedPages) {\n    if (allowedPages && !allowedPages.includes(salla.config.get('page.slug'))) {\n      return app.log(`The Class For (${allowedPages.join(',')}) Skipped.`);\n    }\n    this.onReady();\n    this.registerEvents();\n    app.log(`The Class For (${allowedPages?.join(',') || '*'}) Loaded🎉`);\n  }\n}\n\n/**\r\n * Because we merged multi classes into one file, there is no need to initiate all of them\r\n */\nBasePage.initiateWhenReady = function (allowedPages = null) {\n  if (window.app?.status === 'ready') {\n    new this().initiate(allowedPages);\n  } else {\n    document.addEventListener('theme::ready', () => new this().initiate(allowedPages));\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BasePage);\n\n//# sourceURL=webpack://bav-store-theme/./src/assets/js/base-page.js?\n}");

/***/ },

/***/ "./src/assets/js/partials/product-card.js"
/*!************************************************!*\
  !*** ./src/assets/js/partials/product-card.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base-page */ \"./src/assets/js/base-page.js\");\n\n\n// Bav triangle mark, used verbatim (same path data as the header/footer logo)\n// as a faint background watermark on digital-file cards per the approved\n// reference design (BAV_Design/01_final_site/index.html) - those cards have\n// no product photo, just this logo treatment over a gradient.\nconst BAV_MARK_PATH = 'M367.2 548.3 L367.5 550.8 L445.4 681.7 L447.3 683.3 L469.9 646.9 L469.9 644.7 L413.7 549.0 L411.5 548.0Z M249.5 346.2 L248.9 347.1 L250.5 350.3 L256.4 359.7 L262.4 370.7 L287.5 412.1 L296.6 428.1 L297.6 429.1 L298.5 429.1 L302.6 423.4 L306.0 417.1 L320.8 393.9 L321.1 392.3 L294.7 347.1 L293.2 345.9Z M911.5 254.2 L646.6 254.2 L725.0 389.8 L755.5 339.9 L741.7 309.2 L811.7 310.7 L495.9 828.0 L477.1 796.9 L573.4 642.2 L466.4 460.5 L388.6 459.2 L427.8 392.0 L348.1 256.4 L90.4 255.8 L497.5 925.6Z M310.7 516.6 L431.3 516.3 L499.7 629.9 L508.5 646.3 L447.6 748.6 L440.1 738.5 L311.0 519.8Z M192.7 309.8 L308.2 309.2 L310.7 310.4 L358.8 391.7 L358.8 393.9 L318.3 460.5 L277.8 460.8 L275.9 459.2 L192.1 311.7Z M385.8 254.2 L461.1 382.6 L506.0 347.5 L486.5 309.5 L570.0 309.5 L589.1 343.7 L482.7 423.4 L593.2 609.2 L705.9 426.9 L606.1 253.9Z M617.4 392.0 L619.9 394.9 L637.8 425.6 L639.0 429.4 L599.2 497.5 L595.1 502.5 L588.8 493.1 L561.5 445.7 L556.2 435.3 L557.4 433.8 L612.1 395.2Z';\nconst BAV_MARK_SVG = `<svg aria-hidden=\"true\" width=\"150\" height=\"123\" viewBox=\"90 254 822 672\"><path fill=\"#fff\" fill-rule=\"evenodd\" d=\"${BAV_MARK_PATH}\"/></svg>`;\n\n// Generic \"service\" icon (sliders/customization) for a service product with\n// no cover image - one consistent icon for any service, since the theme has\n// no way to know what a specific merchant-named service is actually about.\nconst SERVICE_ICON_SVG = `<svg aria-hidden=\"true\" width=\"44\" height=\"44\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <line x1=\"4\" y1=\"6\" x2=\"20\" y2=\"6\"/><circle cx=\"14\" cy=\"6\" r=\"2\" fill=\"#0E0E11\"/>\n  <line x1=\"4\" y1=\"12\" x2=\"20\" y2=\"12\"/><circle cx=\"8\" cy=\"12\" r=\"2\" fill=\"#0E0E11\"/>\n  <line x1=\"4\" y1=\"18\" x2=\"20\" y2=\"18\"/><circle cx=\"16\" cy=\"18\" r=\"2\" fill=\"#0E0E11\"/>\n</svg>`;\n\n// Wrapped-box ribbon for gift products (see .bav-gift-ribbon in bav.scss) -\n// identical markup also lives in scripts/preview-mock-data.js and\n// product/single.twig; keep all three in sync if this changes.\nconst GIFT_RIBBON_HTML = `<div class=\"bav-gift-ribbon\" aria-hidden=\"true\">\n  <span class=\"bav-gift-ribbon__v\"></span>\n  <span class=\"bav-gift-ribbon__h\"></span>\n  <span class=\"bav-gift-ribbon__bow\"><svg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M48 50C30 28 4 30 4 48c0 16 20 18 44 6Z\" fill=\"#CC2E24\"/>\n    <path d=\"M52 50C70 28 96 30 96 48c0 16-20 18-44 6Z\" fill=\"#CC2E24\"/>\n    <path d=\"M48 50C30 28 4 30 4 48c0 16 20 18 44 6Z\" fill=\"#9E1F17\" opacity=\".35\"/>\n    <path d=\"M52 50C70 28 96 30 96 48c0 16-20 18-44 6Z\" fill=\"#9E1F17\" opacity=\".35\"/>\n    <rect x=\"38\" y=\"40\" width=\"24\" height=\"20\" rx=\"6\" fill=\"#A61B12\"/>\n  </svg></span>\n</div>`;\nclass ProductCard extends HTMLElement {\n  constructor() {\n    super();\n  }\n  connectedCallback() {\n    // Parse product data\n    this.product = this.product || JSON.parse(this.getAttribute('product'));\n    if (window.app?.status === 'ready') {\n      this.onReady();\n    } else {\n      document.addEventListener('theme::ready', () => this.onReady());\n    }\n  }\n  onReady() {\n    this.fitImageHeight = salla.config.get('store.settings.product.fit_type');\n    this.placeholder = salla.url.asset(salla.config.get('theme.settings.placeholder'));\n    this.getProps();\n    salla.lang.onLoaded(() => {\n      // Language\n      this.remained = salla.lang.get('pages.products.remained');\n      this.donationAmount = salla.lang.get('pages.products.donation_amount');\n      this.startingPrice = salla.lang.get('pages.products.starting_price');\n      this.addToCart = salla.lang.get('pages.cart.add_to_cart');\n      this.outOfStock = salla.lang.get('pages.products.out_of_stock');\n      this.freeBadgeLabel = salla.lang.get('bav.product.free_badge');\n      this.digitalNoRefundNote = salla.lang.get('bav.digital_no_refund_note');\n      this.fastExecutionBadgeLabel = salla.lang.get('bav.product.badge_fast_execution');\n\n      // re-render to update translations\n      this.render();\n    });\n    this.render();\n  }\n  getPriceFormat(price) {\n    if (!price || price == 0) {\n      return salla.config.get('store.settings.product.show_price_as_dash') ? '-' : '';\n    }\n    return salla.money(price);\n  }\n  getAddButtonLabel() {\n    if (this.product.has_preorder_campaign) {\n      return salla.lang.get('pages.products.pre_order_now');\n    }\n    if (this.product.status === 'sale' && this.product.type === 'booking') {\n      return salla.lang.get('pages.cart.book_now');\n    }\n    if (this.product.status === 'sale') {\n      return salla.lang.get('pages.cart.add_to_cart');\n    }\n    if (this.product.type !== 'donating') {\n      return salla.lang.get('pages.products.out_of_stock');\n    }\n\n    // donating\n    return salla.lang.get('pages.products.donation_exceed');\n  }\n  getProps() {\n    /**\r\n     *  Horizontal card.\r\n     */\n    this.horizontal = this.hasAttribute('horizontal');\n\n    /**\r\n     *  Support shadow on hover.\r\n     */\n    this.shadowOnHover = this.hasAttribute('shadowOnHover');\n\n    /**\r\n     *  Hide add to cart button.\r\n     */\n    this.hideAddBtn = this.hasAttribute('hideAddBtn');\n\n    /**\r\n     *  Full image card.\r\n     */\n    this.fullImage = this.hasAttribute('fullImage');\n\n    /**\r\n     *  Minimal card.\r\n     */\n    this.minimal = this.hasAttribute('minimal');\n\n    /**\r\n     *  Special card.\r\n     */\n    this.isSpecial = this.hasAttribute('isSpecial');\n\n    /**\r\n     *  Show quantity.\r\n     */\n    this.showQuantity = this.hasAttribute('showQuantity');\n  }\n  escapeHTML(str = '') {\n    return String(str).replace(/&/g, \"&amp;\").replace(/\"/g, \"&quot;\").replace(/'/g, \"&#39;\").replace(/</g, \"&lt;\").replace(/>/g, \"&gt;\");\n  }\n  getPercentOff() {\n    if (!this.product.is_on_sale || !this.product.regular_price) return 0;\n    return Math.round((1 - this.product.sale_price / this.product.regular_price) * 100);\n  }\n\n  // A zero-priced product (free digital guide, free sample, ...) gets the\n  // \"free\" badge automatically — no need for the merchant to set it by hand\n  // via promotion_title for every such product. Because this reads the\n  // product's current price every render (nothing is cached), a price\n  // edited from 0 to a real amount loses the badge on its own, and a price\n  // edited down to 0 gains it, with no manual toggling either way.\n  isFree() {\n    const effectivePrice = this.product.is_on_sale ? this.product.sale_price : this.product.price;\n    return Number(effectivePrice) === 0;\n  }\n\n  // A deterministic \"social proof\" badge (featured / best seller / ...) for\n  // products the merchant hasn't given a real promotion_title - same\n  // product always gets the same badge (or none), it isn't reshuffled on\n  // every page view. Purely decorative, never shown over a real badge.\n  getBadgeHtml() {\n    if (this.isFree()) return `<span class=\"badge\">${this.freeBadgeLabel || 'مجانًا'}</span>`;\n    if (this.product.promotion_title) return `<span class=\"badge\">${this.escapeHTML(this.product.promotion_title)}</span>`;\n    if (this.product.type === 'digital' || this.product.type === 'service') {\n      return `<span class=\"badge\">${this.fastExecutionBadgeLabel || 'تنفيذ سريع'}</span>`;\n    }\n    return '';\n  }\n\n  // Same detection single.twig uses for the gallery explainer image: a\n  // real, merchant-configured text option whose name contains \"المستلم\"\n  // (recipient) - that's how a gift Double CP product is told apart from\n  // its identical-looking regular counterpart, not from its name/slug.\n  isGiftProduct() {\n    return (this.product.options || []).some(opt => (opt.name || '').includes('المستلم'));\n  }\n\n  // Digital files and services have no product photo to show - instead the\n  // image slot shows a branded gradient with the Bav mark watermarked in\n  // the corner and an inset frame, same visual language either way, with\n  // either the \"PDF\" treatment or a generic service icon up top.\n  renderBrandedCardImage(alt, {\n    eyebrow,\n    iconSvg\n  } = {}) {\n    return `\n      <div class=\"pimg\" style=\"background:radial-gradient(120% 100% at 80% 0%,#2A1409 0%,#0E0E11 55%,#09090B 100%)\">\n        <div style=\"position:absolute;left:22px;bottom:22px;opacity:.07\">${BAV_MARK_SVG}</div>\n        <div style=\"position:absolute;inset:22px;border:1px solid #2E2E35;border-radius:16px\"></div>\n        <div style=\"position:absolute;top:44px;right:44px;left:44px;display:flex;flex-direction:column;gap:12px\">\n          ${eyebrow ? `<span class=\"num\" style=\"font-size:44px;letter-spacing:.04em;color:var(--accent)\">${eyebrow}</span>` : `<span style=\"color:var(--accent)\">${iconSvg}</span>`}\n          <div style=\"height:3px;width:64px;background:var(--accent)\"></div>\n          <span class=\"disp\" style=\"font-size:22px;line-height:1.5;color:#E8E8EC;max-width:240px\">${alt}</span>\n        </div>\n        ${this.getBadgeHtml()}\n      </div>\n    `;\n  }\n  render() {\n    this.classList.add('pcard');\n    this.setAttribute('id', `product-${this.product.id}`);\n    const percentOff = this.getPercentOff();\n    const img = this.product?.image?.url || this.placeholder || '';\n    const alt = this.escapeHTML(this.product?.image?.alt || this.product.name);\n    const addLabel = this.product.add_to_cart_label || this.getAddButtonLabel();\n    // The branded placeholder is only a fallback for a digital file or\n    // service with no cover image at all — a real uploaded cover (common\n    // for digital files, rare for services) always takes priority.\n    const hasRealImage = !!this.product?.image?.url;\n    const isDigitalFile = this.product.type === 'digital' && !hasRealImage;\n    const isService = this.product.type === 'service' && !hasRealImage;\n    this.innerHTML = `\n      <a href=\"${this.product?.url}\" class=\"pimg-link\" aria-label=\"${alt}\">\n        ${isDigitalFile ? this.renderBrandedCardImage(alt, {\n      eyebrow: 'PDF'\n    }) : isService ? this.renderBrandedCardImage(alt, {\n      iconSvg: SERVICE_ICON_SVG\n    }) : `\n        <div class=\"pimg${this.product.type === 'digital' ? ' pimg--contain' : ''}\">\n          <img src=\"${img}\" alt=\"${alt}\" loading=\"lazy\">\n          ${percentOff > 0 ? `<span class=\"save num\" dir=\"ltr\">-${percentOff}%</span>` : ''}\n          ${this.getBadgeHtml()}\n          ${this.isGiftProduct() ? GIFT_RIBBON_HTML : ''}\n        </div>`}\n      </a>\n      <div class=\"pbody\">\n        <a href=\"${this.product?.url}\"><div class=\"pname\">${this.escapeHTML(this.product?.name)}</div></a>\n        ${this.product?.subtitle ? `<div class=\"psub\">${this.escapeHTML(this.product.subtitle)}</div>` : ''}\n        <div class=\"prow\">\n          ${this.product.is_on_sale ? `<span class=\"price num\">${this.getPriceFormat(this.product.sale_price)}</span><s class=\"old\">${this.getPriceFormat(this.product.regular_price)}</s>` : `<span class=\"price num\">${this.getPriceFormat(this.product?.price)}</span>`}\n        </div>\n        ${this.product.type === 'digital' ? `<div style=\"font-size:12px;color:#8E8E98;margin-top:-6px\">${this.digitalNoRefundNote || ''}</div>` : ''}\n        <salla-add-product-button fill=\"outline\" width=\"wide\" class=\"pbtn\"\n          product-id=\"${this.product.id}\"\n          product-status=\"${this.product.status}\"\n          product-type=\"${this.product.type}\">\n          <span>${addLabel}</span>\n        </salla-add-product-button>\n      </div>\n    `;\n    return;\n  }\n}\ncustomElements.define('custom-salla-product-card', ProductCard);\n\n//# sourceURL=webpack://bav-store-theme/./src/assets/js/partials/product-card.js?\n}");

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