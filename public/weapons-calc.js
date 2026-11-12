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

/***/ "./src/assets/js/partials/weapons-calculator.js"
/*!******************************************************!*\
  !*** ./src/assets/js/partials/weapons-calculator.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WeaponsCalculator: () => (/* binding */ WeaponsCalculator)\n/* harmony export */ });\n/* harmony import */ var _weapons_wheels_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weapons-wheels-data */ \"./src/assets/js/partials/weapons-wheels-data.js\");\n\n\n/**\n * Renders a working \"how much CP do I need for this wheel\" calculator into\n * a container element. Used two ways (طلبات_صاحب_المتجر.md, \"حاسبة شحن\n * الأسلحة\"):\n *   - full mode: a dedicated page, wheel is pickable (lockedWheelId omitted).\n *   - mini mode: embedded in one weapon's own product page, already scoped\n *     to that weapon's wheel (lockedWheelId set, no wheel dropdown shown).\n *\n * Mirrors the reference tool's own interaction model (gmlstore.app,\n * screenshot 2026-11-12): every pull starts \"included\" (green); clicking one\n * excludes it (red) - for a shopper who already did some pulls themselves\n * and only needs to buy the rest. The two optional fields (CP already owned,\n * % discount) reduce the total further on top of that.\n */\n// Fallback Arabic strings, overridable per-instance via data-lang-* attributes\n// on the container (same convention as home.js's rewards ladder), so a\n// bilingual store can still localize this without touching the JS.\nconst DEFAULT_LANG = {\n  accountType: 'نوع الحساب',\n  wheelType: 'نوع العجلة',\n  pullsLabel: 'اختر السحبات المطلوبة',\n  pullsHint: 'اضغط على السحبة لاستبعادها — الخضراء تُحسب، الحمراء مستبعدة.',\n  includeAll: 'تفعيل الكل',\n  excludeAll: 'استبعاد الكل',\n  ownedLabel: 'كم معك من نقاط CP في حسابك؟ (اختياري)',\n  ownedNote: 'لأفضل نتيجة دقيقة، اكتب كمية CP الموجودة فعليًا في حسابك.',\n  discountLabel: 'خصم على العجلة % (اختياري)',\n  discountNote: 'لو فيه خصم على كل سحبة، اكتب النسبة هنا، وسيبها فاضية لو مفيش.',\n  resultLabel: 'النتيجة'\n};\nclass WeaponsCalculator {\n  constructor(container, {\n    lockedWheelId = null\n  } = {}) {\n    this.container = container;\n    this.lockedWheelId = lockedWheelId;\n    this.accountType = _weapons_wheels_data__WEBPACK_IMPORTED_MODULE_0__.ACCOUNT_TYPES[0].id;\n    this.wheelId = lockedWheelId || _weapons_wheels_data__WEBPACK_IMPORTED_MODULE_0__.WEAPON_WHEELS[0].id;\n    this.excluded = new Set();\n    this.ownedCp = 0;\n    this.discountPercent = 0;\n    this.lang = {\n      ...DEFAULT_LANG\n    };\n    Object.keys(DEFAULT_LANG).forEach(key => {\n      const attr = container.dataset[`lang${key[0].toUpperCase()}${key.slice(1)}`];\n      if (attr) this.lang[key] = attr;\n    });\n    this.render();\n  }\n  get wheel() {\n    return (0,_weapons_wheels_data__WEBPACK_IMPORTED_MODULE_0__.getWheel)(this.wheelId);\n  }\n  get pulls() {\n    return this.wheel.pulls[this.accountType] || [];\n  }\n  compute() {\n    const total = this.pulls.reduce((sum, cost, i) => this.excluded.has(i) ? sum : sum + cost, 0);\n    const afterOwned = Math.max(0, total - (Number(this.ownedCp) || 0));\n    const discount = Math.min(100, Math.max(0, Number(this.discountPercent) || 0));\n    return Math.round(afterOwned * (1 - discount / 100));\n  }\n  render() {\n    const wheelOptions = _weapons_wheels_data__WEBPACK_IMPORTED_MODULE_0__.WEAPON_WHEELS.map(w => `<option value=\"${w.id}\" ${w.id === this.wheelId ? 'selected' : ''}>${w.label}</option>`).join('');\n    const accountTabs = _weapons_wheels_data__WEBPACK_IMPORTED_MODULE_0__.ACCOUNT_TYPES.map(a => `<button type=\"button\" class=\"bav-wcalc-tab${a.id === this.accountType ? ' is-active' : ''}\" data-account=\"${a.id}\">${a.label}</button>`).join('');\n    const t = this.lang;\n    this.container.innerHTML = `\n      <div class=\"bav-wcalc\">\n        <div class=\"bav-wcalc-row\">\n          <div class=\"bav-wcalc-label\">${t.accountType}</div>\n          <div class=\"bav-wcalc-tabs\">${accountTabs}</div>\n        </div>\n        ${this.lockedWheelId ? '' : `\n        <div class=\"bav-wcalc-row\">\n          <div class=\"bav-wcalc-label\">${t.wheelType}</div>\n          <select class=\"bav-wcalc-select\" data-role=\"wheel-select\">${wheelOptions}</select>\n        </div>`}\n        <div class=\"bav-wcalc-row\">\n          <div class=\"bav-wcalc-label-wrap\">\n            <div class=\"bav-wcalc-label\">${t.pullsLabel}</div>\n            <div class=\"bav-wcalc-hint\">${t.pullsHint}</div>\n          </div>\n          <div class=\"bav-wcalc-bulk\">\n            <button type=\"button\" class=\"bav-wcalc-bulk-btn is-include\" data-role=\"include-all\">${t.includeAll}</button>\n            <button type=\"button\" class=\"bav-wcalc-bulk-btn is-exclude\" data-role=\"exclude-all\">${t.excludeAll}</button>\n          </div>\n        </div>\n        <div class=\"bav-wcalc-grid\" data-role=\"grid\"></div>\n        <div class=\"bav-wcalc-row bav-wcalc-row--split\">\n          <div>\n            <label class=\"bav-wcalc-label\" for=\"wcalc-owned-${this._uid()}\">${t.ownedLabel}</label>\n            <input type=\"number\" min=\"0\" inputmode=\"numeric\" class=\"bav-wcalc-input\" data-role=\"owned\" placeholder=\"0\" id=\"wcalc-owned-${this._uid()}\">\n            <p class=\"bav-wcalc-note\">${t.ownedNote}</p>\n          </div>\n          <div>\n            <label class=\"bav-wcalc-label\" for=\"wcalc-discount-${this._uid()}\">${t.discountLabel}</label>\n            <input type=\"number\" min=\"0\" max=\"100\" inputmode=\"numeric\" class=\"bav-wcalc-input\" data-role=\"discount\" placeholder=\"0\" id=\"wcalc-discount-${this._uid()}\">\n            <p class=\"bav-wcalc-note\">${t.discountNote}</p>\n          </div>\n        </div>\n        <div class=\"bav-wcalc-result\">\n          <span class=\"bav-wcalc-result-label\">${t.resultLabel}</span>\n          <span class=\"bav-wcalc-result-value\" data-role=\"result\">0 <span class=\"bav-wcalc-result-cur\">CP</span></span>\n        </div>\n      </div>\n    `;\n    this.bindEvents();\n    this.renderGrid();\n    this.renderResult();\n  }\n  _uid() {\n    this.__uid = this.__uid || Math.random().toString(36).slice(2, 8);\n    return this.__uid;\n  }\n  renderGrid() {\n    const grid = this.container.querySelector('[data-role=\"grid\"]');\n    grid.innerHTML = this.pulls.map((cost, i) => `\n        <button type=\"button\" class=\"bav-wcalc-pull${this.excluded.has(i) ? ' is-excluded' : ''}\" data-index=\"${i}\">\n          <span class=\"bav-wcalc-pull-n\">${i + 1}</span>\n          <span class=\"bav-wcalc-pull-cost num\">${cost}<span class=\"bav-wcalc-pull-cur\">CP</span></span>\n        </button>`).join('');\n    grid.querySelectorAll('.bav-wcalc-pull').forEach(btn => {\n      btn.addEventListener('click', () => {\n        const i = Number(btn.dataset.index);\n        this.excluded.has(i) ? this.excluded.delete(i) : this.excluded.add(i);\n        btn.classList.toggle('is-excluded');\n        this.renderResult();\n      });\n    });\n  }\n  renderResult() {\n    const resultEl = this.container.querySelector('[data-role=\"result\"]');\n    resultEl.innerHTML = `${this.compute().toLocaleString('en-US')} <span class=\"bav-wcalc-result-cur\">CP</span>`;\n  }\n  bindEvents() {\n    this.container.querySelectorAll('.bav-wcalc-tab').forEach(tab => {\n      tab.addEventListener('click', () => {\n        this.accountType = tab.dataset.account;\n        this.container.querySelectorAll('.bav-wcalc-tab').forEach(t => t.classList.toggle('is-active', t === tab));\n        this.excluded.clear();\n        this.renderGrid();\n        this.renderResult();\n      });\n    });\n    const wheelSelect = this.container.querySelector('[data-role=\"wheel-select\"]');\n    if (wheelSelect) {\n      wheelSelect.addEventListener('change', () => {\n        this.wheelId = wheelSelect.value;\n        this.excluded.clear();\n        this.renderGrid();\n        this.renderResult();\n      });\n    }\n    this.container.querySelector('[data-role=\"include-all\"]').addEventListener('click', () => {\n      this.excluded.clear();\n      this.renderGrid();\n      this.renderResult();\n    });\n    this.container.querySelector('[data-role=\"exclude-all\"]').addEventListener('click', () => {\n      this.pulls.forEach((_, i) => this.excluded.add(i));\n      this.renderGrid();\n      this.renderResult();\n    });\n    this.container.querySelector('[data-role=\"owned\"]').addEventListener('input', e => {\n      this.ownedCp = e.currentTarget.value;\n      this.renderResult();\n    });\n    this.container.querySelector('[data-role=\"discount\"]').addEventListener('input', e => {\n      this.discountPercent = e.currentTarget.value;\n      this.renderResult();\n    });\n  }\n}\n\n//# sourceURL=webpack://bav-store-theme/./src/assets/js/partials/weapons-calculator.js?\n}");

/***/ },

/***/ "./src/assets/js/partials/weapons-wheels-data.js"
/*!*******************************************************!*\
  !*** ./src/assets/js/partials/weapons-wheels-data.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ACCOUNT_TYPES: () => (/* binding */ ACCOUNT_TYPES),\n/* harmony export */   WEAPON_WHEELS: () => (/* binding */ WEAPON_WHEELS),\n/* harmony export */   getWheel: () => (/* binding */ getWheel)\n/* harmony export */ });\n/**\n * Per-wheel, per-account-type CP pull-cost tables for the weapons charging\n * calculator (طلبات_صاحب_المتجر.md, \"حاسبة شحن الأسلحة\").\n *\n * Only the \"legendary-10\" wheel's \"gulf\" table is REAL data, taken directly\n * from the merchant's own reference screenshot (gmlstore.app, 2026-11-12).\n * Every other table below is a placeholder copy of that same real table,\n * clearly marked - NOT real numbers for those account types/wheels. Replace\n * each TODO block with the real table once صاحب المتجر sends it, following\n * the exact same shape: one number per pull, cheapest first.\n */\nconst ACCOUNT_TYPES = [{\n  id: 'gulf',\n  label: 'الحساب الخليجي'\n}, {\n  id: 'medium',\n  label: 'الحساب المتوسط'\n}, {\n  id: 'african',\n  label: 'الحساب الأفريقي'\n}];\nconst WEAPON_WHEELS = [{\n  id: 'legendary-10',\n  label: 'السلاح الأسطوري (10 سحبات)',\n  // Real table (gulf) - confirmed from gmlstore.app screenshot.\n  pulls: {\n    gulf: [30, 80, 120, 300, 500, 800, 1300, 2000, 2800, 4700],\n    // TODO: real \"medium\" account table - placeholder copy of \"gulf\" for now.\n    medium: [30, 80, 120, 300, 500, 800, 1300, 2000, 2800, 4700],\n    // TODO: real \"african\" account table - placeholder copy of \"gulf\" for now.\n    african: [30, 80, 120, 300, 500, 800, 1300, 2000, 2800, 4700]\n  }\n}];\nfunction getWheel(wheelId) {\n  return WEAPON_WHEELS.find(w => w.id === wheelId) || WEAPON_WHEELS[0];\n}\n\n//# sourceURL=webpack://bav-store-theme/./src/assets/js/partials/weapons-wheels-data.js?\n}");

/***/ },

/***/ "./src/assets/js/weapons-calc-page.js"
/*!********************************************!*\
  !*** ./src/assets/js/weapons-calc-page.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-page */ \"./src/assets/js/base-page.js\");\n/* harmony import */ var _partials_weapons_calculator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./partials/weapons-calculator */ \"./src/assets/js/partials/weapons-calculator.js\");\n\n\nclass WeaponsCalcPage extends _base_page__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  onReady() {\n    const container = document.getElementById('bav-weapons-calculator');\n    if (!container) return;\n    new _partials_weapons_calculator__WEBPACK_IMPORTED_MODULE_1__.WeaponsCalculator(container);\n  }\n}\nWeaponsCalcPage.initiateWhenReady(['page.single']);\n\n//# sourceURL=webpack://bav-store-theme/./src/assets/js/weapons-calc-page.js?\n}");

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
/******/ 	let __webpack_exports__ = __webpack_require__("./src/assets/js/weapons-calc-page.js");
/******/ 	
/******/ })()
;