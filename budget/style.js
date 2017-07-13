/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 789);
/******/ })
/************************************************************************/
/******/ ({

/***/ 392:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(603)(true);
// imports


// module
exports.push([module.i, "body {\n  padding: 4px;\n  font-family: sans-serif; }\n\n.loginlink {\n  text-align: center;\n  margin: 16px; }\n\n.load-indicator {\n  text-align: center; }\n\n.inplace-input_notediting {\n  display: inline-block;\n  width: 100%;\n  border: 1px solid transparent; }\n  .inplace-input_notediting:hover {\n    border: 1px solid rgba(0, 0, 0, 0.2); }\n  .inplace-input_notediting.inplace-input-crossed {\n    text-decoration: line-through; }\n\n.inline-confirmation-buttons {\n  text-align: right; }\n\n.buttonwithconfirmation {\n  position: relative; }\n  .buttonwithconfirmation .inline-confirmation {\n    position: absolute;\n    right: 0px;\n    top: 0px;\n    box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.5);\n    background-color: white;\n    padding: 8px;\n    min-width: 200px;\n    z-index: 10; }\n\n.header {\n  font-size: 15px;\n  font-weight: bold;\n  margin: 4px 8px 8px 4px; }\n\n.page-header {\n  text-align: right; }\n\n#app {\n  max-width: 700px;\n  margin: auto; }\n\n.default-card, .budget-summary, .accounts, .envelopes, .monthlies, .goals {\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);\n  margin: 8px;\n  padding: 8px; }\n\n.default-card-table, .budget-summary .budget-summary-table, .accounts-table, .envelopes-table, .monthlies-table, .goals-table {\n  width: 100%;\n  border-collapse: collapse; }\n  .default-card-table > tbody > tr > td, .budget-summary .budget-summary-table > tbody > tr > td, .accounts-table > tbody > tr > td, .envelopes-table > tbody > tr > td, .monthlies-table > tbody > tr > td, .goals-table > tbody > tr > td, .default-card-table thead > tr > td, .budget-summary .budget-summary-table thead > tr > td, .accounts-table thead > tr > td, .envelopes-table thead > tr > td, .monthlies-table thead > tr > td, .goals-table thead > tr > td, .default-card-table tfoot > tr > td, .budget-summary .budget-summary-table tfoot > tr > td, .accounts-table tfoot > tr > td, .envelopes-table tfoot > tr > td, .monthlies-table tfoot > tr > td, .goals-table tfoot > tr > td {\n    padding: 4px; }\n  .default-card-table > tbody > tr:nth-child(odd), .budget-summary .budget-summary-table > tbody > tr:nth-child(odd), .accounts-table > tbody > tr:nth-child(odd), .envelopes-table > tbody > tr:nth-child(odd), .monthlies-table > tbody > tr:nth-child(odd), .goals-table > tbody > tr:nth-child(odd) {\n    background-color: rgba(204, 204, 204, 0.4); }\n\n.default-card-table-total > td, .budget-summary .budget-summary-balance > td, .accounts-table-total > td, .envelopes-table-total > td, .monthlies-table-total > td, .goals-table-total > td {\n  border-top: 1px solid rgba(0, 0, 0, 0.4); }\n\n.budget-summary .budget-summary-balance-negative {\n  color: red; }\n\n.budget-summary .budget-summary-balance-positive {\n  color: green; }\n\n.accounts-table > tbody > tr > td:nth-child(1), .accounts-table thead > tr > td:nth-child(1), .accounts-table tfoot > tr > td:nth-child(1) {\n  width: 50%; }\n\n.accounts-table > tbody > tr > td:nth-child(2), .accounts-table thead > tr > td:nth-child(2), .accounts-table tfoot > tr > td:nth-child(2) {\n  text-align: right; }\n\n.accounts-table > tbody > tr > td:nth-child(3), .accounts-table thead > tr > td:nth-child(3), .accounts-table tfoot > tr > td:nth-child(3) {\n  max-width: 80px;\n  text-align: right; }\n\n.envelopes-table > thead > tr > td:nth-child(1), .envelopes-table tbody > tr > td:nth-child(1), .envelopes-table tfoot > tr > td:nth-child(1) {\n  width: 110px; }\n\n.envelopes-table > thead > tr > td:nth-child(2), .envelopes-table tbody > tr > td:nth-child(2), .envelopes-table tfoot > tr > td:nth-child(2) {\n  width: 50%;\n  text-align: right; }\n\n.envelopes-table > thead > tr > td:nth-child(3), .envelopes-table tbody > tr > td:nth-child(3), .envelopes-table tfoot > tr > td:nth-child(3) {\n  text-align: right; }\n\n.envelopes-table > thead > tr > td:nth-child(4), .envelopes-table tbody > tr > td:nth-child(4), .envelopes-table tfoot > tr > td:nth-child(4) {\n  width: 30px;\n  text-align: right; }\n\n.monthlies-table > thead > tr > td:nth-child(2), .monthlies-table tbody > tr > td:nth-child(2), .monthlies-table tfoot > tr > td:nth-child(2) {\n  width: 30%;\n  text-align: right; }\n\n.monthlies-table > thead > tr > td:nth-child(3), .monthlies-table tbody > tr > td:nth-child(3), .monthlies-table tfoot > tr > td:nth-child(3) {\n  width: 30%;\n  text-align: center; }\n\n.monthlies-table > thead > tr > td:nth-child(6), .monthlies-table tbody > tr > td:nth-child(6), .monthlies-table tfoot > tr > td:nth-child(6) {\n  width: 30px;\n  text-align: right; }\n\n.monthlies-table .monthlies-table-spentbox {\n  width: 100%; }\n\n.goals-table > thead > tr > td:nth-child(2), .goals-table tbody > tr > td:nth-child(2), .goals-table tfoot > tr > td:nth-child(2) {\n  width: 20%;\n  text-align: right; }\n\n.goals-table > thead > tr > td:nth-child(3), .goals-table tbody > tr > td:nth-child(3), .goals-table tfoot > tr > td:nth-child(3) {\n  width: 20%; }\n\n.goals-table > thead > tr > td:nth-child(4), .goals-table tbody > tr > td:nth-child(4), .goals-table tfoot > tr > td:nth-child(4) {\n  width: 20%;\n  text-align: right; }\n\n.goals-table > thead > tr > td:nth-child(5), .goals-table tbody > tr > td:nth-child(5), .goals-table tfoot > tr > td:nth-child(5) {\n  width: 20%;\n  text-align: right; }\n\n.goals-table > thead > tr > td:nth-child(6), .goals-table tbody > tr > td:nth-child(6), .goals-table tfoot > tr > td:nth-child(6) {\n  width: 30px;\n  text-align: right; }\n", "", {"version":3,"sources":["K:/BTSync/Projects/budget/src/src/app.scss"],"names":[],"mappings":"AAAA;EACI,aAAY;EACZ,wBAAuB,EAC1B;;AAED;EACI,mBAAkB;EAClB,aAAY,EACf;;AAED;EACI,mBAAkB,EACrB;;AAED;EACI,sBAAqB;EACrB,YAAW;EACX,8BAA+B,EASlC;EAZD;IAMQ,qCAAiC,EACpC;EAPL;IAUQ,8BAA6B,EAChC;;AAIL;EACI,kBAAiB,EACpB;;AAED;EACI,mBAAkB,EAYrB;EAbD;IAIQ,mBAAkB;IAClB,WAAU;IACV,SAAQ;IACR,4CAAwC;IACxC,wBAAuB;IACvB,aAAY;IACZ,iBAAgB;IAChB,YAAW,EACd;;AAGL;EACI,gBAAe;EACf,kBAAiB;EACjB,wBAAuB,EAC1B;;AACD;EACI,kBAAiB,EACpB;;AAED;EACI,iBAAgB;EAChB,aAAY,EACf;;AAED;EACI,wCAAoC;EACpC,YAAW;EACX,aAAY,EACf;;AAED;EACI,YAAW;EACX,0BAAyB,EAW5B;EAbD;IAMY,aAAY,EACf;EAPT;IAWI,2CAA0C,EACzC;;AAGL;EAEQ,yCAAqC,EACxC;;AAGL;EAYQ,WACJ,EAAE;;AAbN;EAgBQ,aACJ,EAAE;;AAON;EAMgB,WAAU,EACb;;AAPb;EASgB,kBAAiB,EAEpB;;AAXb;EAagB,gBAAe;EACf,kBAAiB,EACpB;;AAab;EAKgB,aAAY,EACf;;AANb;EAQgB,WAAU;EACV,kBAAiB,EACpB;;AAVb;EAYgB,kBAAiB,EACpB;;AAbb;EAegB,YAAW;EACX,kBAAiB,EACpB;;AAab;EAKgB,WAAU;EACV,kBAAiB,EACpB;;AAPb;EASgB,WAAU;EACV,mBAAkB,EACrB;;AAXb;EAagB,YAAW;EACX,kBAAiB,EACpB;;AAfb;EAmBQ,YAAW,EACd;;AAWL;EAKgB,WAAU;EACV,kBAAiB,EACpB;;AAPb;EASgB,WAAU,EACb;;AAVb;EAYgB,WAAU;EACV,kBAAiB,EACpB;;AAdb;EAgBgB,WAAU;EACV,kBAAiB,EACpB;;AAlBb;EAoBgB,YAAW;EACX,kBAAiB,EACpB","file":"app.scss","sourcesContent":["body {\r\n    padding: 4px;\r\n    font-family: sans-serif;\r\n}\r\n\r\n.loginlink {\r\n    text-align: center;\r\n    margin: 16px;\r\n}\r\n\r\n.load-indicator {\r\n    text-align: center;\r\n}\r\n\r\n.inplace-input_notediting {\r\n    display: inline-block;\r\n    width: 100%;\r\n    border: 1px solid rgba(0,0,0,0);\r\n\r\n    &:hover{\r\n        border: 1px solid rgba(0,0,0,0.2);\r\n    }\r\n\r\n    &.inplace-input-crossed {\r\n        text-decoration: line-through;\r\n    }\r\n}\r\n\r\n\r\n.inline-confirmation-buttons {\r\n    text-align: right;\r\n}\r\n\r\n.buttonwithconfirmation {\r\n    position: relative;\r\n\r\n    .inline-confirmation {\r\n        position: absolute;\r\n        right: 0px;\r\n        top: 0px;\r\n        box-shadow: 0 0 10px 4px rgba(0,0,0,0.5);\r\n        background-color: white;\r\n        padding: 8px;\r\n        min-width: 200px;\r\n        z-index: 10;\r\n    }\r\n}\r\n\r\n.header {\r\n    font-size: 15px;\r\n    font-weight: bold;\r\n    margin: 4px 8px 8px 4px;    \r\n}\r\n.page-header {\r\n    text-align: right;\r\n}\r\n\r\n#app {\r\n    max-width: 700px;\r\n    margin: auto;\r\n}\r\n\r\n.default-card {\r\n    box-shadow: 0 0 10px rgba(0,0,0,0.5);\r\n    margin: 8px;\r\n    padding: 8px;\r\n}\r\n\r\n.default-card-table {\r\n    width: 100%;\r\n    border-collapse: collapse;\r\n\r\n    > tbody, thead, tfoot {\r\n        > tr > td {\r\n            padding: 4px;\r\n        }\r\n    }\r\n\r\n    > tbody > tr:nth-child(odd) {\r\n    background-color: rgba(204, 204, 204, 0.4);\r\n    }\r\n}\r\n\r\n.default-card-table-total {\r\n    > td {\r\n        border-top: 1px solid rgba(0,0,0,0.4);\r\n    }\r\n}\r\n\r\n.budget-summary {\r\n    @extend .default-card;    \r\n\r\n    .budget-summary-table {\r\n        @extend .default-card-table;\r\n    }\r\n\r\n    .budget-summary-balance {\r\n        @extend .default-card-table-total;\r\n    }\r\n\r\n    .budget-summary-balance-negative {\r\n        color: red\r\n    }\r\n\r\n    .budget-summary-balance-positive {\r\n        color: green\r\n    }\r\n}\r\n\r\n.accounts {\r\n    @extend .default-card    \r\n}\r\n\r\n.accounts-table {\r\n    @extend .default-card-table;    \r\n\r\n    > tbody, thead, tfoot {\r\n        > tr {\r\n            > td:nth-child(1) {\r\n                width: 50%;\r\n            }\r\n            > td:nth-child(2) {\r\n                text-align: right;\r\n                //border: 1px solid rgba(0,0,0,0);\r\n            }\r\n            > td:nth-child(3) {\r\n                max-width: 80px;\r\n                text-align: right;\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n.accounts-table-total {\r\n    @extend .default-card-table-total\r\n}\r\n\r\n.envelopes {\r\n    @extend .default-card  \r\n}\r\n\r\n.envelopes-table {\r\n    @extend .default-card-table;\r\n    > thead, tbody, tfoot { \r\n        > tr {\r\n            > td:nth-child(1) {\r\n                width: 110px;\r\n            }\r\n            > td:nth-child(2) {\r\n                width: 50%;\r\n                text-align: right;                \r\n            }\r\n            > td:nth-child(3) {            \r\n                text-align: right;                \r\n            }\r\n            > td:nth-child(4) {\r\n                width: 30px;\r\n                text-align: right;\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n.envelopes-table-total {\r\n    @extend .default-card-table-total\r\n}\r\n\r\n.monthlies {\r\n    @extend .default-card  \r\n}\r\n\r\n.monthlies-table {\r\n    @extend .default-card-table;\r\n    > thead, tbody, tfoot { \r\n        > tr {            \r\n            > td:nth-child(2) {\r\n                width: 30%;\r\n                text-align: right;\r\n            }\r\n            > td:nth-child(3) {            \r\n                width: 30%;\r\n                text-align: center;\r\n            }            \r\n            > td:nth-child(6) {\r\n                width: 30px;\r\n                text-align: right;\r\n            }\r\n        }\r\n    }\r\n    .monthlies-table-spentbox {\r\n        width: 100%;\r\n    }\r\n}\r\n\r\n.monthlies-table-total {\r\n    @extend .default-card-table-total\r\n}\r\n\r\n.goals {\r\n    @extend .default-card  \r\n}\r\n\r\n.goals-table {\r\n    @extend .default-card-table;\r\n    > thead, tbody, tfoot {\r\n        > tr {\r\n            > td:nth-child(2) {\r\n                width: 20%;\r\n                text-align: right;\r\n            }\r\n            > td:nth-child(3) {            \r\n                width: 20%;                \r\n            }\r\n            > td:nth-child(4) {\r\n                width: 20%;\r\n                text-align: right;\r\n            }\r\n            > td:nth-child(5) {\r\n                width: 20%;\r\n                text-align: right;\r\n            }\r\n            > td:nth-child(6) {\r\n                width: 30px;\r\n                text-align: right;\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n.goals-table-total {\r\n    @extend .default-card-table-total\r\n}"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 393:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(779);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 603:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 779:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ 789:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(392);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(393)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/sass-loader/lib/loader.js??ref--1-2!./app.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/sass-loader/lib/loader.js??ref--1-2!./app.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })

/******/ });
//# sourceMappingURL=style.js.map