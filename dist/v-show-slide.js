(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("v-show-slide", [], factory);
	else if(typeof exports === 'object')
		exports["v-show-slide"] = factory();
	else
		root["v-show-slide"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/v-show-slide.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/classes/VShowSlide.js":
/*!***********************************!*\
  !*** ./src/classes/VShowSlide.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar VShowSlide = function () {\n  function VShowSlide() {\n    _classCallCheck(this, VShowSlide);\n\n    this.easingOptions = {\n      builtIn: ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'],\n      custom: {}\n    };\n  }\n\n  /**\n   * Called when plugin is initialized\n   * @param {Object} Vue The Vue instance\n   * @param {Object} options Options passed to plugin\n   */\n\n\n  _createClass(VShowSlide, [{\n    key: 'install',\n    value: function install(Vue, options) {\n      this.validateOptions(options);\n      Vue.directive('show-slide', {\n        bind: this.bind.bind(this),\n        inserted: this.inserted.bind(this),\n        componentUpdated: this.componentUpdated.bind(this)\n      });\n    }\n\n    /**\n     * Bind directive hook. Called only once, when the directive is first bound to the element.\n     * @param {Node} el Element directive is bound to\n     * @param {Object} binding Binding options\n     */\n\n  }, {\n    key: 'bind',\n    value: function bind(el, binding) {\n      this.parseArgs(el, binding);\n    }\n\n    /**\n     * Inserted directive hook. Called when the bound element has been inserted into its parent node\n     * @param {Node} el Element directive is bound to\n     * @param {Object} binding Binding options\n     */\n\n  }, {\n    key: 'inserted',\n    value: function inserted(el, binding) {\n      this.initializeTarget(el, binding.value);\n    }\n\n    /**\n     * Update directive hook. called after the containing component’s VNode and the VNodes of its children have updated\n     * @param {Node} el Element directive is bound to\n     * @param {Object} binding Binding options\n     */\n\n  }, {\n    key: 'componentUpdated',\n    value: function componentUpdated(el, binding) {\n      this.toggleSlide(el, binding);\n    }\n\n    /**\n     * Validate options passed to plugin\n     * @param {Object} options Options passed to plugin\n     */\n\n  }, {\n    key: 'validateOptions',\n    value: function validateOptions(options) {\n      if (typeof options !== 'undefined' && options.hasOwnProperty('customEasing')) {\n        this.easingOptions.custom = options.customEasing;\n      }\n    }\n\n    /**\n     * Convert a string from kebab-case to camelCase\n     * @param {String} string String to convert to camelCase\n     */\n\n  }, {\n    key: 'kebabToCamel',\n    value: function kebabToCamel(string) {\n      return string.replace(/-([a-z])/g, function (g) {\n        return g[1].toUpperCase();\n      });\n    }\n\n    /**\n     * Parse directive arguments\n     * @param {Node} el Element directive is bound to\n     * @param {Object} binding Binding options\n     */\n\n  }, {\n    key: 'parseArgs',\n    value: function parseArgs(el, binding) {\n      if (binding.hasOwnProperty('arg')) {\n        var argsArray = binding.arg.split(':');\n        this.validateEasing(el, argsArray);\n        this.validateDuration(el, argsArray);\n      } else {\n        el.duration = 300;\n        el.durationInSeconds = '0.3s';\n        el.easing = 'ease';\n      }\n    }\n\n    /**\n     * Validate easing option\n     * @param {Node} el Element directive is bound to\n     * @param {Array} argsArray Array of arguments\n     */\n\n  }, {\n    key: 'validateEasing',\n    value: function validateEasing(el, argsArray) {\n      if (argsArray.hasOwnProperty(1)) {\n        if (this.easingOptions.builtIn.includes(argsArray[1])) {\n          el.easing = argsArray[1];\n        } else if (this.easingOptions.custom.hasOwnProperty(this.kebabToCamel(argsArray[1]))) {\n          el.easing = this.easingOptions.custom[this.kebabToCamel(argsArray[1])];\n        } else {\n          el.easing = 'ease';\n        }\n      } else {\n        el.easing = 'ease';\n      }\n    }\n\n    /**\n     * Validate duration\n     * @param {Node} el Element directive is bound to\n     * @param {Array} argsArray Array of arguments\n     */\n\n  }, {\n    key: 'validateDuration',\n    value: function validateDuration(el, argsArray) {\n      el.duration = argsArray.hasOwnProperty(0) ? parseInt(argsArray[0]) : 300;\n      el.durationInSeconds = el.duration / 1000 + 's';\n    }\n\n    /**\n     * Initialize styles on target element\n     * @param {Node} el Element directive is bound to\n     * @param {Node} el Element directive is bound to\n     */\n\n  }, {\n    key: 'initializeTarget',\n    value: function initializeTarget(el, open) {\n      if (!open) {\n        el.style.height = '0px';\n      }\n\n      el.style.overflow = 'hidden';\n      el.style.transition = 'height ' + el.easing + ' ' + el.durationInSeconds;\n    }\n\n    /**\n     * Slide the target element\n     * @param {Node} el Element directive is bound to\n     * @param {Object} binding Binding options\n     */\n\n  }, {\n    key: 'toggleSlide',\n    value: function toggleSlide(el, binding) {\n      if (binding.value !== binding.oldValue) {\n        if (binding.value) {\n          this.slideOpen(el);\n        } else {\n          this.slideClosed(el);\n        }\n      }\n    }\n\n    /**\n     * Slide element open\n     * @param {Node} el Element directive is bound to\n     */\n\n  }, {\n    key: 'slideOpen',\n    value: function slideOpen(el) {\n      // Check if element is animating\n      if (el.isAnimating) {\n        clearTimeout(el.timeout);\n      }\n\n      // Set animating to true\n      el.isAnimating = true;\n\n      // Set element height to scroll height\n      var scrollHeight = el.scrollHeight;\n      el.style.height = scrollHeight + 'px';\n\n      // Reset element height to auto after animating\n      el.timeout = setTimeout(function () {\n        el.style.height = 'auto';\n        el.isAnimating = false;\n      }, el.duration);\n    }\n\n    /**\n     * Slide element closed\n     * @param {Node} el Element directive is bound to\n     */\n\n  }, {\n    key: 'slideClosed',\n    value: function slideClosed(el) {\n      // Check if element is animating\n      if (el.isAnimating) {\n        clearTimeout(el.timeout);\n      }\n\n      // Set animating to true\n      el.isAnimating = true;\n\n      // Set element height to scroll height\n      var scrollHeight = el.scrollHeight;\n      el.style.height = scrollHeight + 'px';\n\n      // Very short timeout before setting height of element to 0\n      setTimeout(function () {\n        el.style.height = '0px';\n      }, 25);\n\n      // Update isAnimating after animation is done\n      el.timeout = setTimeout(function () {\n        el.isAnimating = false;\n      }, el.duration);\n    }\n  }]);\n\n  return VShowSlide;\n}();\n\nexports.default = VShowSlide;\n\n//# sourceURL=webpack://v-show-slide/./src/classes/VShowSlide.js?");

/***/ }),

/***/ "./src/v-show-slide.js":
/*!*****************************!*\
  !*** ./src/v-show-slide.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _VShowSlide = __webpack_require__(/*! ./classes/VShowSlide.js */ \"./src/classes/VShowSlide.js\");\n\nvar _VShowSlide2 = _interopRequireDefault(_VShowSlide);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = new _VShowSlide2.default();\n\n//# sourceURL=webpack://v-show-slide/./src/v-show-slide.js?");

/***/ })

/******/ });
});