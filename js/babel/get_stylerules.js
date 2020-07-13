"use strict";

var cssRulesMajadc = {};
(function () {
  /* Function takes a name of stylesheet and a name of selector e.g: .class, h1, .class p, p.
  * If the style rules exist in the stylesheet,
  *function returns them if not it returns empty string.
  */
  this.getCssStyleRules = function (nameOfStylesheet, selectorName) {
    var styleSheetRules = getCssStyleSheet(nameOfStylesheet).cssRules;
    if (!styleSheetRules) return false;
    var outputCssStyleRules = [];

    for (var key in styleSheetRules) {
      if (styleSheetRules[key].type === 1) {
        var cssRuleset = getCssRuleset(styleSheetRules[key], selectorName);

        if (cssRuleset !== '') {
          outputCssStyleRules.push(cssRuleset);
        }
      } else if (styleSheetRules[key].type === 4) {
        var ruleFromMedia = getRuleFromMedia(styleSheetRules[key], selectorName);

        if (ruleFromMedia != '') {
          outputCssStyleRules.push(ruleFromMedia);
        }
      }
    }

    if (Array.isArray(outputCssStyleRules) && outputCssStyleRules.length > 0) {
      return outputCssStyleRules.join('');
    } else {
      return '';
    }
  };
  /*
  * Function takes a name of stylesheet.
  * It returns styleSheet Object if it exists.
  */


  function getCssStyleSheet(nameOfStylesheet) {
    var styleSheets = document.styleSheets;

    if (styleSheets !== undefined) {
      for (var key in styleSheets) {
        var hrefStylesheet = styleSheets[key].href;

        if (hrefStylesheet) {
          hrefStylesheet = hrefStylesheet.substring(styleSheets[key].href.lastIndexOf('/') + 1);

          if (hrefStylesheet.indexOf('?') !== -1) {
            hrefStylesheet = hrefStylesheet.substring(0, hrefStylesheet.indexOf('?'));
          }

          if (hrefStylesheet === nameOfStylesheet) {
            return styleSheets[key];
          }
        }
      }
    } else {
      return false;
    }
  }
  /*
  * Function takes a cssStyleRule Object and a name of selector.
  * It checks if cssStyleRule.selectorText includes searching selector.
  * It returns formatted CSS rules, if they exist.
  */


  function getCssRuleset(cssStyleRule, selectorName) {
    if (createSelectorsArray(cssStyleRule.selectorText).indexOf(selectorName) !== -1) {
      return "".concat(formatRule(cssStyleRule.cssText, cssStyleRule.mediaAtRule));
    } else {
      return '';
    }
  }
  /*
  * Function takes names of selectors from cssStyleRule.
  * It returns a array of all selectors names.
  */


  function createSelectorsArray(namesOfSelectors) {
    var selectorsArray = namesOfSelectors.toLowerCase().split(',');

    for (var s = 0; s < selectorsArray.length; s++) {
      selectorsArray[s] = selectorsArray[s].trim().split('"').join('');
    }

    return selectorsArray;
  }
  /*
  * Function returns formatted style rules.
  */


  function formatRule(rule, ruleMediaAtRule) {
    var listOfProperties = rule.substring(rule.indexOf('{') + 1, rule.lastIndexOf('}')).trim();
    var selector = rule.substring(0, rule.indexOf('{')).trim();
    var listOfPropertiesArray = listOfProperties.split(';');

    if (listOfPropertiesArray[listOfPropertiesArray.length - 1] === '') {
      listOfPropertiesArray.splice(-1, 1);
    }

    if (ruleMediaAtRule) {
      return "  ".concat(selector, " {\n     ").concat(listOfPropertiesArray.join(';\n     '), ";\n  }\n}");
    } else {
      return "".concat(selector, " {\n   ").concat(listOfPropertiesArray.join(';\n  '), ";\n  }\n");
    }
  }
  /*
  * Function takes MediaRule and returns style rules.
  */


  function getRuleFromMedia(mediaAtRule, selectorName) {
    var cssMediaRules = mediaAtRule.cssRules;
    if (!cssMediaRules) return false;
    var outputMedia = [];

    for (var key in cssMediaRules) {
      if (cssMediaRules[key].type === 1) {
        cssMediaRules[key].mediaAtRule = true;
        var cssRuleset = getCssRuleset(cssMediaRules[key], selectorName);

        if (cssRuleset !== '') {
          outputMedia.push(cssRuleset);
        }
      }
    }

    if (Array.isArray(outputMedia) && outputMedia.length > 0) {
      outputMedia.unshift("@media ".concat(mediaAtRule.media, " { \n"));
      return outputMedia.join('');
    } else {
      return '';
    }
  }
}).apply(cssRulesMajadc);