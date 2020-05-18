"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

window.addEventListener('DOMContentLoaded', function () {
  window.Prism = window.Prism || {};
  window.Prism.manual = true;
  var cssRulesStylesheet = document.getElementById('get-stylerules-stylesheet');
  var cssRulesSelector = document.getElementById('get-stylerules-selector');
  selectorsStylesheetMajadc.setSelectorsInSelect();
  showCSSRulesMajadc.showCssRules();
  cssRulesStylesheet.addEventListener('change', function () {
    selectorsStylesheetMajadc.setSelectorsInSelect();
    showCSSRulesMajadc.showCssRules();
  });
  cssRulesSelector.addEventListener('change', function () {
    showCSSRulesMajadc.showCssRules();
  });
});
var showCSSRulesMajadc = {
  showCssRules: function showCssRules() {
    /*
    * Function takes: 
    *  - HTML code element
    *  - input - name of file of style sheet 
    *  - input - name of selector
    * and display CSS Style Rules
    */
    var getStyleOutput = document.getElementById('get-stylerules-output');
    var nameOfStyleSheet = this.getNameOfStylesheet();
    var nameOfSelector = this.getNameOfSelector();
    getStyleOutput.innerHTML = '';

    if (nameOfStyleSheet !== '' && nameOfSelector !== '') {
      var outputCssStyleRules = cssRulesMajadc.getCssStyleRules(nameOfStyleSheet, nameOfSelector);

      if (outputCssStyleRules !== '') {
        getStyleOutput.innerHTML = outputCssStyleRules;

        if (window.Prism !== undefined) {
          Prism.highlightElement(getStyleOutput);
        }
      } else return '';
    } else {
      return '';
    }
  },
  getNameOfStylesheet: function getNameOfStylesheet() {
    var styleSheetName = document.getElementById('get-stylerules-stylesheet').value;

    if (styleSheetName !== '') {
      styleSheetName = styleSheetName.trim();
      return styleSheetName;
    } else {
      return '';
    }
  },
  getNameOfSelector: function getNameOfSelector() {
    var styleRuleSelector = document.getElementById('get-stylerules-selector').value;

    if (styleRuleSelector !== '') {
      styleRuleSelector = styleRuleSelector.trim();
      return styleRuleSelector;
    } else {
      return '';
    }
  }
};
/***************************************************************
* Create select with names of selector from given stylesheets
*/

var selectorsStylesheetMajadc = {
  selectorSelect: document.getElementById('get-stylerules-selector'),
  styleSheetName: function styleSheetName() {
    var name = document.getElementById('get-stylerules-stylesheet').value;

    if (name !== '') {
      return name.trim();
    } else {
      return '';
    }
  },
  setSelectorsInSelect: function setSelectorsInSelect() {
    var styleRules = this.getCssStyleSheet().cssRules;
    var outputSelectors = [];

    for (var key in styleRules) {
      if (styleRules[key].type === 1) {
        outputSelectors.push(styleRules[key].selectorText.trim().split('"').join(''));
      } else if (styleRules[key].type === 4) {
        var outputSelectorsAtMedia = this.getSelectorsFromMediaAtRuleInSelect(styleRules[key]);

        if (Array.isArray(outputSelectorsAtMedia) && outputSelectorsAtMedia.length > 0) {
          outputSelectors.push(outputSelectorsAtMedia);
        }
      }
    }

    var selectorsNames = this.cleanSelectorsNames(outputSelectors);
    var outputSelectorsNames = [];

    var _iterator = _createForOfIteratorHelper(selectorsNames),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var selector = _step.value;
        outputSelectorsNames.push("<option value=\"".concat(selector, "\">").concat(selector, "</option>"));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    this.selectorSelect.innerHTML = outputSelectorsNames.join('');
  },
  cleanSelectorsNames: function cleanSelectorsNames(selectors) {
    var newOutputSelectors = selectors.join(',').split(',');

    for (var i = 0; i < newOutputSelectors.length; i++) {
      newOutputSelectors[i] = newOutputSelectors[i].trim();
    }

    var uniqueSelectorsNames = new Set();

    var _iterator2 = _createForOfIteratorHelper(newOutputSelectors),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var name = _step2.value;
        uniqueSelectorsNames.add(name);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    var selectorsNames = [];
    var IndexSelectorsNames = 0;
    uniqueSelectorsNames.forEach(function (value) {
      selectorsNames[IndexSelectorsNames] = value;
      IndexSelectorsNames++;
    });
    return selectorsNames;
  },
  getSelectorsFromMediaAtRuleInSelect: function getSelectorsFromMediaAtRuleInSelect(mediaAtRule) {
    var styleRules = mediaAtRule.cssRules;
    var outputSelectors = [];

    for (var key in styleRules) {
      if (styleRules[key].type === 1) {
        outputSelectors.push(styleRules[key].selectorText.trim().split('"').join(''));
      }
    }

    if (Array.isArray(outputSelectors) && outputSelectors.length > 0) {
      return outputSelectors;
    }
  },
  getCssStyleSheet: function getCssStyleSheet() {
    var styleSheets = document.styleSheets;

    if (styleSheets !== undefined) {
      for (var key in styleSheets) {
        var hrefStylesheet = styleSheets[key].href;

        if (hrefStylesheet) {
          hrefStylesheet = hrefStylesheet.substring(styleSheets[key].href.lastIndexOf('/') + 1);

          if (hrefStylesheet.indexOf('?') !== -1) {
            hrefStylesheet = hrefStylesheet.substring(0, hrefStylesheet.indexOf('?'));
          }

          if (hrefStylesheet === this.styleSheetName()) {
            return styleSheets[key];
          }
        }
      }
    } else {
      return false;
    }
  }
};