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

/***/ "./src/assets/js/home.js"
/*!*******************************!*\
  !*** ./src/assets/js/home.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-page */ \"./src/assets/js/base-page.js\");\n\nclass Home extends _base_page__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  onReady() {\n    this.initRewardsLadder();\n  }\n  initRewardsLadder() {\n    const ladder = document.getElementById('bav-ladder');\n    if (!ladder) return;\n    const levels = Array.from(ladder.querySelectorAll('.lv')).map(el => ({\n      el,\n      amount: Number(el.dataset.amt),\n      chip: el.querySelector('.lv-chip')\n    })).sort((a, b) => a.amount - b.amount);\n    const lang = {\n      addMore: ladder.dataset.langAddMore,\n      allUnlocked: ladder.dataset.langAllUnlocked,\n      unlocked: ladder.dataset.langUnlocked,\n      next: ladder.dataset.langNext,\n      locked: ladder.dataset.langLocked\n    };\n    const fill = document.getElementById('bav-lad-fill');\n    const text = document.getElementById('bav-lad-text');\n    const total = document.getElementById('bav-lad-total');\n    const maxAmount = levels.length ? levels[levels.length - 1].amount : 0;\n    const render = cartTotal => {\n      total.textContent = salla.helpers.number(cartTotal, 2);\n      const nextLevel = levels.find(level => cartTotal < level.amount);\n      if (nextLevel) {\n        text.textContent = lang.addMore.replace(':amount', salla.helpers.number(nextLevel.amount - cartTotal, 2));\n      } else {\n        text.textContent = lang.allUnlocked;\n      }\n      const progress = maxAmount ? Math.min(100, cartTotal / maxAmount * 100) : 0;\n      fill.style.width = `${progress}%`;\n      levels.forEach(level => {\n        const isUnlocked = cartTotal >= level.amount;\n        const isNext = !isUnlocked && level === nextLevel;\n        level.el.style.borderColor = isUnlocked || isNext ? 'var(--accent)' : '#232329';\n        level.el.style.boxShadow = isNext ? '0 20px 60px -30px var(--accent)' : 'none';\n        if (isUnlocked) {\n          level.chip.textContent = lang.unlocked;\n          level.chip.style.background = 'var(--accent)';\n          level.chip.style.border = '1px solid var(--accent)';\n          level.chip.style.color = '#0A0A0B';\n        } else if (isNext) {\n          level.chip.textContent = lang.next;\n          level.chip.style.background = '#17171B';\n          level.chip.style.border = '1px solid var(--accent)';\n          level.chip.style.color = 'var(--accent)';\n        } else {\n          level.chip.textContent = lang.locked;\n          level.chip.style.background = '#131316';\n          level.chip.style.border = '1px solid #2A2A31';\n          level.chip.style.color = '#6E6E78';\n        }\n      });\n    };\n    render(Number(ladder.dataset.initialTotal) || 0);\n    salla.cart.event.onUpdated(summary => render(Number(summary.total) || 0));\n  }\n}\nHome.initiateWhenReady(['index']);\n\n//# sourceURL=webpack://bav-store-theme/./src/assets/js/home.js?\n}");

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
/******/ 	let __webpack_exports__ = __webpack_require__("./src/assets/js/home.js");
/******/ 	
/******/ })()
;