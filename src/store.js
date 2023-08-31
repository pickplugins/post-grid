import apiFetch from '@wordpress/api-fetch';
import { createReduxStore, register, subscribe, select } from '@wordpress/data';

const {
  __experimentalSetPreviewDeviceType: setPreviewDeviceType,

} = wp.data.dispatch('core/edit-post')



// if (wp.data.dispatch('core/edit-post') != null) {
//   const {
//     __experimentalSetPreviewDeviceType: setPreviewDeviceType,

//   } = wp.data.dispatch('core/edit-post')


// } else {
//   const {
//     __experimentalSetPreviewDeviceType: setPreviewDeviceType,

//   } = wp.data.dispatch('core/edit-widgets')
// }



const DEFAULT_STATE = {
  breakPoint: 'Desktop',
  clientdata: {},
  license: { license_status: '', license_key: '' },
  blockCss: '',
  stylesClipboard: null,
  postGridBlockEditor: null,


};

var selectors = {

  getBreakPoint(state) {
    const { breakPoint } = state;



    return breakPoint;
  },
  getclientdata(state) {
    const { clientdata } = state;
    return clientdata;
  },

  getLicense(state) {
    const { license } = state;
    return license;
  },

  getStylesClipboard(state) {
    const { stylesClipboard } = state;
    return stylesClipboard;
  },



  getpostGridBlockEditor(state) {
    const { postGridBlockEditor } = state;


    if (postGridBlockEditor == null) {


    }



    return postGridBlockEditor;
  },


  cssAttrParse(state, key) {



    var cssProp = '';

    if (key == 'alignContent') {
      cssProp = 'align-content';
    }

    else if (key == 'alignItems') {
      cssProp = 'align-items';
    }

    else if (key == 'alignSelf') {
      cssProp = 'align-self';
    }
    else if (key == 'aspectRatio') {
      cssProp = 'aspect-ratio';
    }


    else if (key == 'backfaceVisibility') {
      cssProp = 'backface-visibility';
    }
    else if (key == 'backgroundAttachment') {
      cssProp = 'background-attachment';
    }
    else if (key == 'backgroundBlendMode') {
      cssProp = 'background-blend-mode';
    }

    else if (key == 'backgroundClip') {
      cssProp = 'background-clip';
    }
    else if (key == 'bgColor') {
      cssProp = 'background-color';
    }
    else if (key == 'backgroundColor') {
      cssProp = 'background-color';
    }

    else if (key == 'backgroundOrigin') {
      cssProp = 'background-origin';
    }


    else if (key == 'backgroundRepeat') {
      cssProp = 'background-repeat';
    }

    else if (key == 'backgroundSize') {
      cssProp = 'background-size';
    }
    else if (key == 'backgroundPosition') {
      cssProp = 'background-position';
    }
    else if (key == 'backgroundImage') {
      cssProp = 'background-image';
    }


    else if (key == 'border') {
      cssProp = 'border';
    }


    else if (key == 'borderTop') {
      cssProp = 'border-top';
    }

    else if (key == 'borderRight') {
      cssProp = 'border-right';
    }

    else if (key == 'borderBottom') {
      cssProp = 'border-bottom';
    }

    else if (key == 'borderLeft') {
      cssProp = 'border-left';
    }

    else if (key == 'borderRadius') {
      cssProp = 'border-radius';
    }

    else if (key == 'borderCollapse') {
      cssProp = 'border-collapse';
    }

    else if (key == 'borderSpacing') {
      cssProp = 'border-spacing';
    }

    else if (key == 'borderImage') {
      cssProp = 'border-image';
    }

    else if (key == 'boxShadow') {
      cssProp = 'box-shadow';
    }

    else if (key == 'backdropFilter') {
      cssProp = 'backdrop-filter';
    }

    else if (key == 'bottom' || key == 'top' || key == 'left' || key == 'right' || key == 'clear' || key == 'color' || key == 'filter' || key == 'float') {
      cssProp = key;
    }



    else if (key == 'boxSizing') {
      cssProp = 'box-sizing';
    }
    else if (key == 'cursor') {
      cssProp = 'cursor';
    }

    else if (key == 'content') {
      cssProp = 'content';
    }

    else if (key == 'columnCount') {
      cssProp = 'column-count';
    }

    else if (key == 'columnRule') {
      cssProp = 'column-rule';
    }

    else if (key == 'direction') {
      cssProp = 'direction';
    }

    else if (key == 'fontFamily') {
      cssProp = 'font-family';
    }

    else if (key == 'fontSize') {
      cssProp = 'font-size';
    }

    else if (key == 'fontStyle') {
      cssProp = 'font-style';
    }

    else if (key == 'fontStretch') {
      cssProp = 'font-stretch';
    }

    else if (key == 'fontWeight') {
      cssProp = 'font-weight';
    }
    else if (key == 'fontVariantCaps') {
      cssProp = 'font-variant-caps';
    }
    else if (key == 'flexWrap') {
      cssProp = 'flex-wrap';
    }
    else if (key == 'flexDirection') {
      cssProp = 'flex-direction';
    }
    else if (key == 'flexGrow') {
      cssProp = 'flex-grow';
    }
    else if (key == 'flexShrink') {
      cssProp = 'flex-shrink';
    }
    else if (key == 'flexBasis') {
      cssProp = 'flex-basis';
    }
    else if (key == 'flexFlow') {
      cssProp = 'flex-flow';
    }

    else if (key == 'letterSpacing') {
      cssProp = 'letter-spacing';
    }



    else if (key == 'gridColumnEnd') {
      cssProp = 'grid-column-end';
    }
    else if (key == 'gridColumnStart') {
      cssProp = 'grid-column-start';
    }

    else if (key == 'gridRowEnd') {
      cssProp = 'grid-row-end';
    }

    else if (key == 'gridRowStart') {
      cssProp = 'grid-row-start';
    }


    else if (key == 'gridTemplateColumns') {
      cssProp = 'grid-template-columns';
    }

    else if (key == 'gridTemplateRows') {
      cssProp = 'grid-template-rows';
    }



    else if (key == 'listStyle') {
      cssProp = 'list-style';
    }

    else if (key == 'lineHeight') {
      cssProp = 'line-height';
    }

    else if (key == 'justifyContent') {
      cssProp = 'justify-content';
    }


    else if (key == 'objectFit') {
      cssProp = 'object-fit';
    }


    else if (key == 'opacity') {
      cssProp = 'opacity';
    }

    else if (key == 'outline') {
      cssProp = 'outline';
    }

    else if (key == 'order') {
      cssProp = 'order';
    }
    else if (key == 'outlineOffset') {
      cssProp = 'outline-offset';
    }

    else if (key == 'position') {
      cssProp = 'position';
    }

    else if (key == 'textIndent') {
      cssProp = 'text-indent';
    }

    else if (key == 'textJustify') {
      cssProp = 'text-justify';
    }


    else if (key == 'textTransform') {
      cssProp = 'text-transform';
    }

    else if (key == 'textDecoration') {
      cssProp = 'text-decoration';
    }
    else if (key == 'textOverflow') {
      cssProp = 'text-overflow';
    }


    else if (key == 'textShadow') {
      cssProp = 'text-shadow';
    }


    else if (key == 'textAlign') {
      cssProp = 'text-align';
    }

    else if (key == 'visibility') {
      cssProp = 'visibility';
    }

    else if (key == 'wordBreak') {
      cssProp = 'word-break';
    }

    else if (key == 'wordSpacing') {
      cssProp = 'word-spacing';
    }

    else if (key == 'zIndex') {
      cssProp = 'z-index';
    }


    else if (key == 'padding') {
      cssProp = 'padding';
    }


    else if (key == 'paddingTop') {
      cssProp = 'padding-top';
    }
    else if (key == 'paddingRight') {
      cssProp = 'padding-right';
    }
    else if (key == 'paddingBottom') {
      cssProp = 'padding-bottom';
    }
    else if (key == 'paddingLeft') {
      cssProp = 'padding-left';
    }
    else if (key == 'margin') {
      cssProp = 'margin';
    }

    else if (key == 'marginTop') {
      cssProp = 'margin-top';
    }
    else if (key == 'marginRight') {
      cssProp = 'margin-right';
    }
    else if (key == 'marginBottom') {
      cssProp = 'margin-bottom';
    }
    else if (key == 'marginLeft') {
      cssProp = 'margin-left';
    }

    else if (key == 'display') {
      cssProp = 'display';
    }

    else if (key == 'width') {
      cssProp = 'width';
    }

    else if (key == 'height') {
      cssProp = 'height';
    }

    else if (key == 'verticalAlign') {
      cssProp = 'vertical-align';
    }



    else if (key == 'overflow') {
      cssProp = 'overflow';
    }



    else if (key == 'overflowX') {
      cssProp = 'overflow-x';
    }

    else if (key == 'overflowY') {
      cssProp = 'overflow-y';
    }
    else if (key == 'writingMode') {
      cssProp = 'writing-mode';
    }

    else if (key == 'wordWrap') {
      cssProp = 'word-wrap';
    }
    else if (key == 'perspective') {
      cssProp = 'perspective';
    }

    else if (key == 'minWidth') {
      cssProp = 'min-width';
    }
    else if (key == 'minHeight') {
      cssProp = 'min-height';
    }
    else if (key == 'maxHeight') {
      cssProp = 'max-height';
    }
    else if (key == 'maxWidth') {
      cssProp = 'max-width';
    }

    else if (key == 'transition') {
      cssProp = 'transition';
    }

    else if (key == 'transform') {
      cssProp = 'transform';
    }
    else if (key == 'gap') {
      cssProp = 'gap';
    }
    else if (key == 'rowGap') {
      cssProp = 'row-gap';
    }
    else if (key == 'columnGap') {
      cssProp = 'column-gap';
    }
    else {
      cssProp = key;
    }
    return cssProp;

  },




  onAddStyleItem(state, sudoScource, key, obj) {
    const { breakPoint } = state;

    //console.log('obj', obj);


    var path = [sudoScource, key, breakPoint];

    let objX = Object.assign({}, obj);
    const object = selectors.addPropertyDeep(state, objX, path, '')


    return object;
  },
  addPropertyDeep(state, obj, path, value) {
    const [head, ...rest] = path

    //console.log('obj', obj);


    return {
      ...obj,
      [head]: rest.length ? selectors.addPropertyDeep(state, obj[head], rest, value) : value
    }
  },

  updatePropertyDeep(state, obj, path, value) {

    // console.log('obj', obj);


    const [head, ...rest] = path

    return {
      ...obj,
      [head]: rest.length ? selectors.updatePropertyDeep(state, obj[head], rest, value) : value
    }
  },

  setPropertyDeep(state, obj, path, value) {

    const [head, ...rest] = path.split('.')


    return {
      ...obj,
      [head]: rest.length ? selectors.setPropertyDeep(state, obj[head], rest.join('.'), value) : value
    }
  },

  deletePropertyDeep(state, object, path) {

    var last = path.pop();
    delete path.reduce((o, k) => o[k] || {}, object)[last];

    return object;
  },



  getElementSelector(state, sudoScource, mainSelector) {

    var elementSelector = mainSelector;


    if (sudoScource == 'styles') {
      elementSelector = mainSelector;
    }
    else if (sudoScource == 'hover') {
      elementSelector = mainSelector + ':hover';
    } else if (sudoScource == 'after') {
      elementSelector = mainSelector + '::after';
    } else if (sudoScource == 'before') {
      elementSelector = mainSelector + '::before';
    } else if (sudoScource == 'first-child') {
      elementSelector = mainSelector + ':first-child';
    } else if (sudoScource == 'last-child') {
      elementSelector = mainSelector + ':last-child';
    } else if (sudoScource == 'visited') {
      elementSelector = mainSelector + ':visited';
    } else if (sudoScource == 'selection') {
      elementSelector = mainSelector + '::selection';
    } else if (sudoScource == 'first-letter') {
      elementSelector = mainSelector + '::first-letter';
    } else if (sudoScource == 'first-line') {
      elementSelector = mainSelector + '::first-line';
    }
    else {
      elementSelector = mainSelector + ':' + sudoScource;
    }

    return elementSelector;

  },


  generateElementCss(state, obj, elementSelector) {

    var cssObj = {}
    Object.entries(obj).map(args => {
      var sudoSrc = args[0];
      var sudoArgs = args[1];
      if (sudoSrc != 'options' && sudoArgs != null) {
        var selector = selectors.getElementSelector(state, sudoSrc, elementSelector);
        Object.entries(args[1]).map(x => {
          var attr = x[0];
          var cssPropty = selectors.cssAttrParse(state, attr);

          if (cssObj[selector] == undefined) {
            cssObj[selector] = {};
          }

          if (cssObj[selector][cssPropty] == undefined) {
            cssObj[selector][cssPropty] = {};
          }

          cssObj[selector][cssPropty] = x[1]
        })
      }
    })

    return cssObj;

    // var cssItems = { ...blockCssY.items };
    // var cssItemsX = { ...cssItems, ...cssObj }

    // setAttributes({ blockCssY: { items: cssItemsX } });

  },


  getBlockCssRules(state, blockCssObj) {

    var blockCssRules = {};


    Object.entries(blockCssObj).map(args => {


      var elementSelector = args[0];
      var elementObj = args[1];

      var elementCss = selectors.generateElementCss(state, elementObj, elementSelector)

      if (elementCss[elementSelector] == undefined) {
      } else {
        blockCssRules[elementSelector] = elementCss[elementSelector]

      }

    })




    return blockCssRules;

  },

  generateCssFromElementObject(state, obj, selector) {

    var reponsiveCssGroups = {};





  },


  generateBlockCss(state, items, blockId, customCss) {
    const { blockCss } = state;
    var reponsiveCssGroups = {};

    // console.log(items);


    for (var selector in items) {
      var attrs = items[selector];

      for (var attr in attrs) {
        var breakpoints = attrs[attr];

        for (var device in breakpoints) {

          var attrValue = breakpoints[device];

          if (reponsiveCssGroups[device] == undefined) {
            reponsiveCssGroups[device] = []
          }

          if (reponsiveCssGroups[device] == undefined) {
            reponsiveCssGroups[device] = []
          }

          if (reponsiveCssGroups[device][selector] == undefined) {
            reponsiveCssGroups[device][selector] = []
          }

          reponsiveCssGroups[device][selector].push({ 'attr': attr, 'val': attrValue });

        }
      }
    }



    var reponsiveCssDesktop = '';


    if (reponsiveCssGroups['Desktop'] != undefined) {

      for (var selector in reponsiveCssGroups['Desktop']) {
        var attrs = reponsiveCssGroups['Desktop'][selector];

        reponsiveCssDesktop += selector + '{';
        for (var index in attrs) {
          var attr = attrs[index]
          var attrName = attr.attr;
          var attrValue = attr.val;
          reponsiveCssDesktop += attrName + ':' + attrValue + ';';
        }
        reponsiveCssDesktop += '}';


      }
    }




    var reponsiveCssTablet = '';

    if (reponsiveCssGroups['Tablet'] != undefined) {
      reponsiveCssTablet += '@media(max-width: 991px){';

      for (var selector in reponsiveCssGroups['Tablet']) {
        var attrs = reponsiveCssGroups['Tablet'][selector];

        reponsiveCssTablet += selector + '{';
        for (var index in attrs) {
          var attr = attrs[index]
          var attrName = attr.attr;
          var attrValue = attr.val;
          reponsiveCssTablet += attrName + ':' + attrValue + ';';
        }
        reponsiveCssTablet += '}';
      }

      reponsiveCssTablet += '}';
    }



    var reponsiveCssMobile = '';

    if (reponsiveCssGroups['Mobile'] != undefined) {

      reponsiveCssMobile += '@media(max-width:767px){';

      for (var selector in reponsiveCssGroups['Mobile']) {
        var attrs = reponsiveCssGroups['Mobile'][selector];

        reponsiveCssMobile += selector + '{';
        for (var index in attrs) {
          var attr = attrs[index]
          var attrName = attr.attr;
          var attrValue = attr.val;
          reponsiveCssMobile += attrName + ':' + attrValue + ';';
        }
        reponsiveCssMobile += '}';
      }
      reponsiveCssMobile += '}';

    }

    var reponsiveCss = reponsiveCssDesktop + reponsiveCssTablet + reponsiveCssMobile;



    var iframe = document.querySelectorAll('[name="editor-canvas"]')[0];

    if (iframe) {

      setTimeout(() => {
        var iframeDocument = iframe.contentDocument;
        var body = iframeDocument.body;
        var divWrap = iframeDocument.getElementById("css-block-" + blockId);

        if (divWrap != undefined) {
          iframeDocument.getElementById("css-block-" + blockId).outerHTML = "";

        }

        var divWrap = '<div id="css-block-' + blockId + '"></div>';
        body.insertAdjacentHTML('beforeend', divWrap);

        var csswrappg = iframeDocument.getElementById('css-block-' + blockId);
        var str = '<style>' + reponsiveCss + customCss + '</style>';

        csswrappg.insertAdjacentHTML('beforeend', str);
      }, 200)


    } else {



      var wpfooter = document.getElementById('wpfooter');
      var divWrap = document.getElementById("css-block-" + blockId);

      if (divWrap != undefined) {
        document.getElementById("css-block-" + blockId).outerHTML = "";
      }

      var divWrap = '<div id="css-block-' + blockId + '"></div>';
      wpfooter.insertAdjacentHTML('beforeend', divWrap);

      var csswrappg = document.getElementById('css-block-' + blockId);
      var str = '<style>' + reponsiveCss + customCss + '</style>';

      csswrappg.insertAdjacentHTML('beforeend', str);



    }






    return blockCss;
  },



};


var resolvers = {



  * getLicense() {
    const path = '/post-grid/v2/get_license';
    const res = yield actions.fetchLicense(path);

    return actions.setLicense(res);
  },
  * getpostGridBlockEditor() {
    const path = '/post-grid/v2/get_postGridBlockEditor';
    const res = yield actions.fetchLicense(path);
    //console.log('resolvers', res);

    return actions.setpostGridBlockEditor(res);
  },



  * getclientdata() {
    const path = '/post-grid/v2/get_site_details';
    const res = yield actions.fetchclientdata(path);



    return actions.setclientdata(res);
  },






}



const actions = {
  setBreakPoint(breakpoint) {

    setPreviewDeviceType(breakpoint)




    return {
      type: 'SET_BREAKPOINT',
      breakpoint,
    };
  },
  setclientdata(clientdata) {
    return {
      type: 'SET_CLIENTDATA',
      clientdata,
    };
  },

  setLicense(license) {
    return {
      type: 'SET_LICENSE',
      license,
    };
  },
  setStylesClipboard(stylesClipboard) {
    return {
      type: 'SET_CLIPBOARD',
      stylesClipboard,
    };
  },


  setpostGridBlockEditor(postGridBlockEditor) {
    return {
      type: 'SET_postGridBlockEditor',
      postGridBlockEditor,
    };
  },



  fetchLicense(path) {
    return {
      type: 'FETCH_LICENSE_FROM_API',
      path,
    };
  },
  fetchclientdata(path) {
    return {
      type: 'FETCH_CLIENTDATA_FROM_API',
      path,
    };
  },


};



var controls = {
  FETCH_LICENSE_FROM_API(action) {
    return apiFetch({ path: action.path, method: 'POST', data: {}, });
  },

  FETCH_CLIENTDATA_FROM_API(action) {
    return apiFetch({ path: action.path, method: 'POST', data: {}, });
  },

  FETCH_PRO_INFO_FROM_API(action) {

    return apiFetch({ path: action.path, method: 'POST', data: {}, });
  },



}



const store = createReduxStore('postgrid-shop', {
  reducer(state = DEFAULT_STATE, action) {




    switch (action.type) {

      case 'SET_BREAKPOINT':
        return {
          ...state,
          breakPoint: action.breakpoint,
        };

      case 'SET_CLIENTDATA':
        return {
          ...state,
          clientdata: action.clientdata,
        };



      case 'SET_LICENSE':
        return {
          ...state,
          license: action.license,
        };

      case 'SET_CLIPBOARD':
        return {
          ...state,
          stylesClipboard: action.stylesClipboard,
        };



      case 'SET_postGridBlockEditor':
        return {
          ...state,
          postGridBlockEditor: action.postGridBlockEditor,
        };


    }

    return state;
  },

  actions,
  selectors,
  controls,
  resolvers,
});

register(store);


subscribe(() => {

})

export { store };
