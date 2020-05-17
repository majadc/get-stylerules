/*
* get style rules from given style sheet and given selector
* cssRulesMajadc.getCssStyleRules(nameOfStylesheet, selectorName);
*/
let cssRulesMajadc = {};
(function(){
    /*
  * function takes name of stylesheet and name of selector ex: .class, h1, .class p
  * goes through rules and check if it CSSStyleRules (type === 1) or MediaRules (type === 4)
  * If it is CssStyleRule it invokes getStyleRules  if it is media rule it invoke functions getRuleFromMedia
  Result is set in array and returned 
  * I returns false if:
  *  - there is not style sheet
  *  - given selector does not exist in stylesheet
  */
  this.getCssStyleRules = function(nameOfStylesheet, selectorName) {
    
    let styleSheetRules = getCssStyleSheet(nameOfStylesheet).cssRules;
    if ( ! styleSheetRules ) return false;
    let outputCssStyleRules = [];
    
    for ( let key in styleSheetRules ) {
      if (  styleSheetRules[key].type === 1 ) {
        let cssRuleset = getCssRuleset(styleSheetRules[key], selectorName);
        if ( cssRuleset !== '' ) {
          outputCssStyleRules.push(cssRuleset);
        }
      } else if (styleSheetRules[key].type === 4) {
        let ruleFromMedia = getRuleFromMedia(styleSheetRules[key], selectorName);
          if ( ruleFromMedia != '') {
            outputCssStyleRules.push(ruleFromMedia);
          }
      } 
    }
    if ( Array.isArray(outputCssStyleRules) &&  outputCssStyleRules.length > 0 ) {
      return outputCssStyleRules.join('');
    }
    else {
      return '';
    }
    
  }
  
  /*
  * function takes name of stylesheet.
  * It returns styleSheet Object StyleSheet if it exists.
  */
  function getCssStyleSheet (nameOfStylesheet) {
    let styleSheets = document.styleSheets;
    if ( styleSheets !== undefined ) {
      for ( let key in styleSheets ) {


        let hrefStylesheet = styleSheets[key].href;
        if ( hrefStylesheet) {
          hrefStylesheet = hrefStylesheet.substring(styleSheets[key].href.lastIndexOf('/')+1);
          if ( hrefStylesheet.indexOf('?') !== -1 ) {
            hrefStylesheet = hrefStylesheet.substring(0,hrefStylesheet.indexOf('?'));
          }
          
          if ( hrefStylesheet === nameOfStylesheet ) {
              return styleSheets[key];
          }
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }

  /*
  * Functions takes cssStyleRule and selector and check if cssStyleRule.selectorText includes searching selector
  * it returns formatted properties if exists or false another way
  */
  function getCssRuleset(cssStyleRule, selectorName) {
    if (createSelectorsArray(cssStyleRule.selectorText).indexOf(selectorName) !== -1 ) {
      return `${formatRule(cssStyleRule.cssText, cssStyleRule.mediaAtRule)}`;
    } else {
      return '';
    }
  }


  /*
  * Function takes names of selectors from cssStyleRule and changes all to lowerCase
  makes a array and removes spaces and returns selectors names array. It is used in getCssRuleset() function
  */
  function createSelectorsArray (namesOfSelectors) {
    let selectorsArray = namesOfSelectors.toLowerCase().split(',');
    for ( let s = 0; s < selectorsArray.length; s++ ) {
      selectorsArray[s] = selectorsArray[s].trim().split('"').join('');
    }
    return selectorsArray;
  }

  /*
  * Function returns formatted rule
  */
  function formatRule (rule, ruleMediaAtRule) {
    let listOfProperties = rule.substring(rule.indexOf('{') + 1, rule.lastIndexOf('}')).trim();
    let selector = rule.substring(0, rule.indexOf('{')).trim();
    let listOfPropertiesArray = listOfProperties.split(';')
    if ( listOfPropertiesArray[listOfPropertiesArray.length - 1] === '' ) {
      listOfPropertiesArray.splice(-1, 1);
    }
      if (ruleMediaAtRule) {
        return `  ${selector} {\n     ${listOfPropertiesArray.join(';\n     ')}\n  }\n}`;
        
      } else {
        return `${selector} {\n   ${listOfPropertiesArray.join(';\n  ')}\n}\n`;
      }
    
  
  }

  /*
  * Function takes MediaRule and returns Css Rule
  */
  function getRuleFromMedia (mediaAtRule, selectorName) {
    let cssMediaRules = mediaAtRule.cssRules;
    if ( !cssMediaRules )  return false;
    let outputMedia = [];
    for (let key in cssMediaRules)  {
      if ( cssMediaRules[key].type === 1 ) {
        cssMediaRules[key].mediaAtRule = true;
        let cssRuleset  = getCssRuleset(cssMediaRules[key], selectorName);
        if ( cssRuleset !== '' ) {
          outputMedia.push(cssRuleset);
        }
      }
    }
    if ( Array.isArray(outputMedia) && outputMedia.length > 0 ) {
      outputMedia.unshift(`@media ${mediaAtRule.media} { \n`);
      return outputMedia.join('');
    } else {
      return '';
    }

  }


}).apply(cssRulesMajadc);


