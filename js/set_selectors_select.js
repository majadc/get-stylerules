window.addEventListener( 'DOMContentLoaded', () =>{
   window.Prism = window.Prism || {};
   window.Prism.manual = true;

  let cssRulesStylesheet = document.getElementById('get-stylerules-stylesheet');
  let cssRulesSelector = document.getElementById('get-stylerules-selector');

  selectorsStylesheetMajadc.setSelectorsInSelect();
  showCSSRulesMajadc.showCssRules();
 
  cssRulesStylesheet.addEventListener('change', function() {
   selectorsStylesheetMajadc.setSelectorsInSelect();
   showCSSRulesMajadc.showCssRules();
  });

  cssRulesSelector.addEventListener('change', function(){
    showCSSRulesMajadc.showCssRules();    
  });
});



let showCSSRulesMajadc = {
  showCssRules: function () {
    /*
    * Function takes: 
    *  - HTML code element
    *  - input - name of file of style sheet 
    *  - input - name of selector
    * and display CSS Style Rules
    */

    let getStyleOutput = document.getElementById('get-stylerules-output');
    let nameOfStyleSheet = this.getNameOfStylesheet();
    let nameOfSelector = this.getNameOfSelector();
  
    getStyleOutput.innerHTML = '';
  
    if ( (nameOfStyleSheet !== '') && (nameOfSelector !== '') ) {
      let outputCssStyleRules = cssRulesMajadc.getCssStyleRules(nameOfStyleSheet, nameOfSelector);
      if ( outputCssStyleRules ) {
        getStyleOutput.innerHTML = outputCssStyleRules;
        if ( window.Prism !== undefined) {
          Prism.highlightElement(getStyleOutput);
        }
      } else return '';
    }
     else {
      return '';
     }
  },
  getNameOfStylesheet: function() {
    let styleSheetName = document.getElementById('get-stylerules-stylesheet').value;
    if (styleSheetName !== '') {
      styleSheetName = styleSheetName.trim();
      return styleSheetName;
    } else { 
      return '';
    }
  },
  getNameOfSelector: function() {
    let styleRuleSelector = document.getElementById('get-stylerules-selector').value;
    if ( styleRuleSelector !== '' ) {
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
let selectorsStylesheetMajadc = {
  selectorSelect: document.getElementById('get-stylerules-selector'),
  styleSheetName: function() {
    let name = document.getElementById('get-stylerules-stylesheet').value;
    if ( name !== '') {
      return name.trim();
    } else { 
      return '';
    }
  },
  setSelectorsInSelect: function() {
    let styleRules = this.getCssStyleSheet().cssRules;
    let outputSelectors = [];
    for ( let key in styleRules ) {
      if ( styleRules[key].type === 1 ) {
        outputSelectors.push(styleRules[key].selectorText.trim().split('"').join(''));
      } else if ( styleRules[key].type === 4) {
        let outputSelectorsAtMedia = this.getSelectorsFromMediaAtRuleInSelect(styleRules[key]);
        if ( Array.isArray(outputSelectorsAtMedia) && outputSelectorsAtMedia.length > 0 ) {
          outputSelectors.push(outputSelectorsAtMedia);
        }
      }
    }

    let selectorsNames = this.cleanSelectorsNames(outputSelectors);
    let outputSelectorsNames = [];
    for ( let selector of selectorsNames ) {
      outputSelectorsNames.push(`<option value="${selector}">${selector}</option>`);
    }
    this.selectorSelect.innerHTML = outputSelectorsNames.join('');
  
  },

  cleanSelectorsNames: function (selectors) {
    let newOutputSelectors = selectors.join(',').split(',');
    for ( let i = 0; i < newOutputSelectors.length; i++) {
        newOutputSelectors[i] = newOutputSelectors[i].trim();
    }
    let uniqueSelectorsNames = new Set();
    for ( let name of newOutputSelectors ) {
        uniqueSelectorsNames.add(name);
    }
    let selectorsNames = [];
    
    let IndexSelectorsNames = 0;
    uniqueSelectorsNames.forEach(function(value){
      selectorsNames[IndexSelectorsNames] = value;
      IndexSelectorsNames++;
    });
    return selectorsNames;
  },

  getSelectorsFromMediaAtRuleInSelect: function(mediaAtRule) {
    let styleRules = mediaAtRule.cssRules;
    let outputSelectors = [];
    for ( let key in styleRules ) {
      if ( styleRules[key].type === 1 ) {
        outputSelectors.push(styleRules[key].selectorText.trim().split('"').join(''));
      }
    }
    if ( Array.isArray(outputSelectors) && outputSelectors.length > 0 ) {
      return outputSelectors
    }
  },
  
  getCssStyleSheet: function() {
    let styleSheets = document.styleSheets;
    if ( styleSheets !== undefined ) {
      for ( let key in styleSheets ) {
        let hrefStylesheet = styleSheets[key].href;
        if ( hrefStylesheet) {
          hrefStylesheet = hrefStylesheet.substring(styleSheets[key].href.lastIndexOf('/')+1);
          if ( hrefStylesheet.indexOf('?') !== -1 ) {
            hrefStylesheet = hrefStylesheet.substring(0,hrefStylesheet.indexOf('?'));
          }
          
          if ( hrefStylesheet === this.styleSheetName() ) {
              return styleSheets[key];
          }
        } else {
          return false;
        }
       
      }
    } else {
      return false;
    }
  },
  
}

