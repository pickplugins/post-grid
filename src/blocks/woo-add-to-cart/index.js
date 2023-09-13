import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { applyFilters } from '@wordpress/hooks';
import { InnerBlocks, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"
import apiFetch from '@wordpress/api-fetch';

import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'

import { Icon, styles, settings, link, linkOff } from "@wordpress/icons";


import IconToggle from '../../components/icon-toggle'
import Typography from '../../components/typography'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import PGDropdown from '../../components/dropdown'
import PGIconPicker from '../../components/icon-picker'
import PGcssDisplay from '../../components/css-display'


import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'
import PGCssLibrary from '../../components/css-library'



var myStore = wp.data.select('postgrid-shop');

registerBlockType("post-grid/woo-add-to-cart", {
  apiVersion: 2,
  title: "WooCommerce Add To Cart",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><rect fill="#8db1ff" y="30.98" width="13.97" height="2" /><rect fill="#8db1ff" x="16.42" y="30.98" width="9.96" height="2" /><rect fill="#8db1ff" y="26.28" width="36" height="2" /><rect fill="#8db1ff" y="21.58" width="36" height="2" /><rect fill="#1d4ed8" x="20.7" y="9.61" width="15.3" height="2.35" /><path fill="#1d4ed8" d="M12.42,18.54H1.55A1.54,1.54,0,0,1,0,17V6.13A1.55,1.55,0,0,1,1.55,4.57H3.1V3H4.66V4.57H9.31V3h1.56V4.57h1.55A1.55,1.55,0,0,1,14,6.13V17A1.54,1.54,0,0,1,12.42,18.54ZM1.55,9.23V17H12.42V9.23Zm0-3.1V7.68H12.42V6.13Zm9.32,9.31H9.31V13.89h1.56Zm-3.11,0H6.21V13.89H7.76Zm-3.1,0H3.1V13.89H4.66Zm6.21-3.1H9.31V10.78h1.56Zm-3.11,0H6.21V10.78H7.76Zm-3.1,0H3.1V10.78H4.66Z" /></svg>


    ,
  },


  attributes: {


    wrapper: {
      type: 'object',
      default: {
        options: { tag: 'div', class: '' },

        styles:
        {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },

        },
      },
    },
    viewCart: {
      type: 'object',
      default: {
        options: { class: '' },

        styles:
        {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },

        },
      },
    },

    cartBtn: {
      type: 'object',
      default: {
        options: {
          tag: 'div',
          productId: '',
          sku: '',
          ajax: true,
          text: 'Add to cart',
          class: '',
        },

        styles: {

          display: {},
          width: {},
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },
      },
    },
    quantityWrap: {
      type: 'object',
      default: {
        options: {
          enable: true,
          class: '',
        },

        styles: {

          display: {},
          width: {},
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },
      },
    },
    quantityInput: {
      type: 'object',
      default: {
        options: {
          class: '',
          quantity: 1
        },

        styles: {

          display: {},
          width: {},
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },
      },
    },
    quantityIncrease: {
      type: 'object',
      default: {
        options: {
          class: '',
        },

        styles: {

          display: {},
          width: {},
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },
      },
    },
    quantityDecrease: {
      type: 'object',
      default: {
        options: {
          class: '',
        },
        styles: {
          display: {},
          width: {},
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },
      },
    },




    icon: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', position: 'beforeSku', /*before, after, prefix, postfix */ class: 'sku-icon', },

        styles:
        {
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },

          display: {},

          fontSize: { Desktop: '' },
          lineHeight: {},
          fontWeight: { "Desktop": "700" },
          textDecoration: {}, //overline, line-through, underline
        },
      },
    },


    prefix: {
      type: 'object',
      default: {
        options:
          { text: ' ', class: 'prefix', },
        styles:
        {
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },

        },
      },
    },

    postfix: {
      type: 'object',
      default: {
        options:
          { text: '', class: 'postfix', },
        styles:
        {
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },

        },
      },
    },



    customCss: {
      "type": "string",
      "default": ''
    },


    blockId: {
      "type": "string",
      "default": ''
    },
    blockCssY: {
      "type": "object",
      "default": { items: {} }
    },


  },
  usesContext: ["postId", "loopIndex", "postType", "queryId"],

  supports: {
    "align": ["wide", "full"],

  },
  category: "post-grid",


  edit: function (props) {


    var attributes = props.attributes;
    var setAttributes = props.setAttributes;
    var context = props.context;
    var clientId = props.clientId;


    let cartBtn = attributes.cartBtn;
    let quantityWrap = attributes.quantityWrap;
    let quantityInput = attributes.quantityInput;
    let quantityIncrease = attributes.quantityIncrease;
    let quantityDecrease = attributes.quantityDecrease;
    let viewCart = attributes.viewCart;
    var wrapper = attributes.wrapper;
    var blockId = attributes.blockId;

    var blockIdX = attributes.blockId ? attributes.blockId : 'pg' + clientId.split('-').pop();
    var blockClass = '.' + blockIdX;
    var icon = attributes.icon;

    var prefix = attributes.prefix;
    var postfix = attributes.postfix;
    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;



    var postId = context['postId'];
    var postType = context['postType'];

    //const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    var breakPointX = myStore.getBreakPoint();

    const [customTags, setCustomTags] = useState({});
    const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);




    // Wrapper CSS Class Selectors
    const wrapperSelector = blockClass;

    var cartBtnSelector = blockClass + ' .cartBtn';
    const iconSelector = blockClass + ' .sku-icon';
    const viewCartSelector = blockClass + ' .added_to_cart';

    const prefixSelector = blockClass + ' .prefix';
    const postfixSelector = blockClass + ' .postfix';
    const quantityWrapSelector = blockClass + ' .quantity-wrap';
    const quantityIncreaseSelector = blockClass + ' .quantity-increase';
    const quantityDecreaseSelector = blockClass + ' .quantity-decrease';
    const quantityInputSelector = blockClass + ' .quantity-input';










    // const [
    //   currentPostSKU,
    //   setcurrentPostSKU,
    // ] = useEntityProp('postType', postType, 'date', postId);


    const [postSKUEdited, setpostSKUEdited] = useState(cartBtn.options.text);


    // useEffect(() => {

    //   var postTypeX = postType;

    //   if (postType == 'post') {
    //     var postTypeX = 'posts';
    //   }
    //   if (postType == 'page') {
    //     var postTypeX = 'pages';
    //   }


    //   apiFetch({
    //     path: '/wp/v2/' + postTypeX + '/' + postId,
    //     method: 'POST',

    //   }).then((res) => {

    //     console.log(res);


    //   });


    // }, []);




    function onChangeIcon(arg) {


      var options = { ...icon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
      setAttributes({ icon: { ...icon, options: options } });

    }









    function onPickCssLibraryWrapper(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        wrapper[sudoScource] = sudoScourceArgs;
      })

      var wrapperX = Object.assign({}, wrapper);
      setAttributes({ wrapper: wrapperX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, wrapperSelector);


        var sudoObj = {};
        Object.entries(sudoScourceArgs).map(y => {

          var cssPropty = y[0];
          var cssProptyVal = y[1];
          var cssProptyKey = myStore.cssAttrParse(cssPropty);
          sudoObj[cssProptyKey] = cssProptyVal;
        })

        styleObj[elementSelector] = sudoObj;
      })


      var cssItems = Object.assign(blockCssY.items, styleObj);
      setAttributes({ blockCssY: { items: cssItems } });
    }




    function onPickCssLibrarySku(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        cartBtn[sudoScource] = sudoScourceArgs;
      })

      var skuX = Object.assign({}, cartBtn);
      setAttributes({ cartBtn: skuX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, cartBtnSelector);


        var sudoObj = {};
        Object.entries(sudoScourceArgs).map(y => {

          var cssPropty = y[0];
          var cssProptyVal = y[1];
          var cssProptyKey = myStore.cssAttrParse(cssPropty);
          sudoObj[cssProptyKey] = cssProptyVal;
        })

        styleObj[elementSelector] = sudoObj;
      })


      var cssItems = Object.assign(blockCssY.items, styleObj);
      setAttributes({ blockCssY: { items: cssItems } });
    }



    function onPickCssLibraryIcon(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        icon[sudoScource] = sudoScourceArgs;
      })

      var iconX = Object.assign({}, icon);
      setAttributes({ icon: iconX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, iconSelector);


        var sudoObj = {};
        Object.entries(sudoScourceArgs).map(y => {

          var cssPropty = y[0];
          var cssProptyVal = y[1];
          var cssProptyKey = myStore.cssAttrParse(cssPropty);
          sudoObj[cssProptyKey] = cssProptyVal;
        })

        styleObj[elementSelector] = sudoObj;
      })


      var cssItems = Object.assign(blockCssY.items, styleObj);
      setAttributes({ blockCssY: { items: cssItems } });
    }





    function onPickCssLibraryPrefix(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        prefix[sudoScource] = sudoScourceArgs;
      })

      var prefixX = Object.assign({}, prefix);
      setAttributes({ prefix: prefixX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, prefixSelector);


        var sudoObj = {};
        Object.entries(sudoScourceArgs).map(y => {

          var cssPropty = y[0];
          var cssProptyVal = y[1];
          var cssProptyKey = myStore.cssAttrParse(cssPropty);
          sudoObj[cssProptyKey] = cssProptyVal;
        })

        styleObj[elementSelector] = sudoObj;
      })


      var cssItems = Object.assign(blockCssY.items, styleObj);
      setAttributes({ blockCssY: { items: cssItems } });
    }



    function onPickCssLibraryPostfix(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        postfix[sudoScource] = sudoScourceArgs;
      })

      var postfixX = Object.assign({}, postfix);
      setAttributes({ postfix: postfixX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, postfixSelector);


        var sudoObj = {};
        Object.entries(sudoScourceArgs).map(y => {

          var cssPropty = y[0];
          var cssProptyVal = y[1];
          var cssProptyKey = myStore.cssAttrParse(cssPropty);
          sudoObj[cssProptyKey] = cssProptyVal;
        })

        styleObj[elementSelector] = sudoObj;
      })


      var cssItems = Object.assign(blockCssY.items, styleObj);
      setAttributes({ blockCssY: { items: cssItems } });
    }




















    function onChangeStyleWrapper(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, wrapper);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ wrapper: object });




      var elementSelector = myStore.getElementSelector(sudoScource, wrapperSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }






    function onRemoveStyleWrapper(sudoScource, key) {

      var object = myStore.deletePropertyDeep(wrapper, [sudoScource, key, breakPointX]);
      setAttributes({ wrapper: object });


      var elementSelector = myStore.getElementSelector(sudoScource, wrapperSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }





    function onAddStyleWrapper(sudoScource, key) {





      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, wrapper);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ wrapper: object });


    }







    function onChangeStyleSku(sudoScource, newVal, attr) {


      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, cartBtn);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ cartBtn: object });

      var elementSelector = myStore.getElementSelector(sudoScource, cartBtnSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });


    }






    function onRemoveStyleSku(sudoScource, key) {


      var object = myStore.deletePropertyDeep(cartBtn, [sudoScource, key, breakPointX]);
      setAttributes({ cartBtn: object });


      var elementSelector = myStore.getElementSelector(sudoScource, cartBtnSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }





    function onAddStyleSku(sudoScource, key) {




      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, cartBtn);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ cartBtn: object });

    }




    function onChangeStyleIcon(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, icon);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ icon: object });

      var elementSelector = myStore.getElementSelector(sudoScource, iconSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });


    }






    function onRemoveStyleIcon(sudoScource, key) {


      var object = myStore.deletePropertyDeep(icon, [sudoScource, key, breakPointX]);
      setAttributes({ icon: object });


      var elementSelector = myStore.getElementSelector(sudoScource, iconSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });

    }


    function onAddStyleIcon(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, icon);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ icon: object });
    }











    function onChangeStylePrefix(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, prefix);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ prefix: object });

      var elementSelector = myStore.getElementSelector(sudoScource, prefixSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });


    }


    function onRemoveStylePrefix(sudoScource, key) {

      var object = myStore.deletePropertyDeep(prefix, [sudoScource, key, breakPointX]);
      setAttributes({ prefix: object });


      var elementSelector = myStore.getElementSelector(sudoScource, prefixSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }


    function onAddStylePrefix(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, prefix);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ prefix: object });

    }


    function onChangeStylePostfix(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, postfix);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ postfix: object });

      var elementSelector = myStore.getElementSelector(sudoScource, postfixSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });


    }


    function onRemoveStylePostfix(sudoScource, key) {

      var object = myStore.deletePropertyDeep(postfix, [sudoScource, key, breakPointX]);
      setAttributes({ postfix: object });


      var elementSelector = myStore.getElementSelector(sudoScource, postfixSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }


    function onAddStylePostfix(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, postfix);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ postfix: object });

    }


    function onChangeStyleQuantityWrap(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, quantityWrap);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ quantityWrap: object });

      var elementSelector = myStore.getElementSelector(sudoScource, quantityWrapSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });


    }


    function onRemoveStyleQuantityWrap(sudoScource, key) {

      var object = myStore.deletePropertyDeep(quantityWrap, [sudoScource, key, breakPointX]);
      setAttributes({ quantityWrap: object });


      var elementSelector = myStore.getElementSelector(sudoScource, quantityWrapSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }


    function onAddStyleQuantityWrap(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, quantityWrap);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ quantityWrap: object });

    }


    function onChangeStyleQuantityInput(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, quantityInput);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ quantityInput: object });

      var elementSelector = myStore.getElementSelector(sudoScource, quantityInputSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });


    }


    function onRemoveStyleQuantityInput(sudoScource, key) {

      var object = myStore.deletePropertyDeep(quantityInput, [sudoScource, key, breakPointX]);
      setAttributes({ quantityInput: object });


      var elementSelector = myStore.getElementSelector(sudoScource, quantityInputSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }


    function onAddStyleQuantityInput(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, quantityInput);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ quantityInput: object });

    }


    function onChangeStyleQuantityIncrease(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, quantityIncrease);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ quantityIncrease: object });

      var elementSelector = myStore.getElementSelector(sudoScource, quantityIncreaseSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });


    }


    function onRemoveStyleQuantityIncrease(sudoScource, key) {

      var object = myStore.deletePropertyDeep(quantityIncrease, [sudoScource, key, breakPointX]);
      setAttributes({ quantityIncrease: object });


      var elementSelector = myStore.getElementSelector(sudoScource, quantityIncreaseSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }


    function onAddStyleQuantityIncrease(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, quantityIncrease);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ quantityIncrease: object });

    }

    ////############///

    function onChangeStyleQuantityDecrease(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, quantityDecrease);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ quantityDecrease: object });

      var elementSelector = myStore.getElementSelector(sudoScource, quantityDecreaseSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });


    }


    function onRemoveStyleQuantityDecrease(sudoScource, key) {

      var object = myStore.deletePropertyDeep(quantityDecrease, [sudoScource, key, breakPointX]);
      setAttributes({ quantityDecrease: object });


      var elementSelector = myStore.getElementSelector(sudoScource, quantityDecreaseSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }


    function onAddStyleQuantityDecrease(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, quantityDecrease);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ quantityDecrease: object });

    }

    ////############///

    function onChangeStyleViewCart(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, viewCart);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ viewCart: object });

      var elementSelector = myStore.getElementSelector(sudoScource, viewCartSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });


    }


    function onRemoveStyleViewCart(sudoScource, key) {

      var object = myStore.deletePropertyDeep(viewCart, [sudoScource, key, breakPointX]);
      setAttributes({ viewCart: object });


      var elementSelector = myStore.getElementSelector(sudoScource, viewCartSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }


    function onAddStyleViewCart(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, viewCart);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ viewCart: object });

    }








    String.prototype.strtr = function (dic) {
      const str = this.toString(),
        makeToken = (inx) => `{{###~${inx}~###}}`,

        tokens = Object.keys(dic)
          .map((key, inx) => ({
            key,
            val: dic[key],
            token: makeToken(inx)
          })),

        tokenizedStr = tokens.reduce((carry, entry) =>
          carry.replace(new RegExp(entry.key, "g"), entry.token), str);

      return tokens.reduce((carry, entry) =>
        carry.replace(new RegExp(entry.token, "g"), entry.val), tokenizedStr);
    };



    const [iconHtml, setIconHtml] = useState('');

    useEffect(() => {

      var iconSrc = icon.options.iconSrc;

      var iconHtml = `<span class="${iconSrc}"></span>`;

      setIconHtml(iconHtml);




    }, [icon]);



    const [
      currentPostUrl,
      setCurrentPostUrl,
    ] = useEntityProp('postType', postType, 'link', postId);


    useEffect(() => {

      setAttributes({ blockId: blockIdX });

      // setAttributes({ cartBtn: cartBtn });
      // setAttributes({ wrapper: wrapper });


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);

      customTags['currentYear'] = '2022';
      customTags['currentMonth'] = '07';
      customTags['currentDay'] = '27';
      customTags['currentDate'] = '27';
      customTags['currentTime'] = '27';

      customTags['postPublishDate'] = '123';
      customTags['postModifiedDate'] = '123';

      customTags['termId'] = '';
      customTags['termTitle'] = '';
      customTags['termDescription'] = '';
      customTags['termPostCount'] = '';

      customTags['postTagTitle'] = 'First Tag Title';
      customTags['postTagsTitle'] = 'First Tag Title';

      customTags['postCategoryTitle'] = 'First Category Title';
      customTags['postCategoriesTitle'] = 'First Categories Title';


      customTags['postTermTitle'] = 'First Term Title';
      customTags['postTermsTitle'] = 'List of all terms title';



      customTags['postId'] = '123';
      customTags['postStatus'] = '123';


      customTags['authorId'] = '123';
      customTags['authorName'] = 'Nur Hasan';
      customTags['authorFirstName'] = 'Nur';
      customTags['authorLastName'] = 'Hasan';
      customTags['authorDescription'] = 'Hasan';

      customTags['excerpt'] = 'Here is the post excerpt';

      customTags['rankmathTitle'] = 'Hasan';
      customTags['rankmathPermalink'] = 'Hasan';
      customTags['rankmathExcerpt'] = 'Hasan';
      customTags['rankmathFocusKeyword'] = 'Hasan';
      customTags['rankmathFocusKeywords'] = 'Hasan';

      customTags['rankmathOrgname'] = 'Hasan';
      customTags['rankmathOrgurl'] = 'Hasan';
      customTags['rankmathOrglogo'] = 'Hasan';



      customTags['siteTitle'] = '';
      customTags['siteDescription'] = '';
      customTags['siteTagline'] = '';

      customTags['postMeta'] = '';

      customTags['separator'] = '';
      customTags['searchTerms'] = '';



      customTags['counter'] = '1';



    }, [clientId]);



    // var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    // for (var x in breakPoints) {

    //   var item = breakPoints[x];
    //   breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    // }












    function handleLinkClick(ev) {

      ev.stopPropagation();
      ev.preventDefault();
      return false;
    }










    useEffect(() => {


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);


    useEffect(() => {


      setAttributes({ customCss: customCss });



      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);



























    var postUrl = currentPostUrl;


    const CustomTag = `${wrapper.options.tag}`;
    const CustomTagPostTitle = `${cartBtn.options.tag}`;





    const blockProps = useBlockProps({
      className: ` ${blockId} pg-woo-sku`,

    });


    return (
      <>
        <InspectorControls>
          <div className='' >
            <PanelBody title="Wrapper" initialOpen={false}>
              <PGtabs
                activeTab="options"
                orientation="horizontal"
                activeClass="active-tab"
                onSelect={(tabName) => { }}
                tabs={[
                  {
                    name: 'options',
                    title: 'Options',
                    icon: settings,
                    className: 'tab-settings',
                  },
                  {
                    name: 'styles',
                    title: 'Styles',
                    icon: styles,
                    className: 'tab-style',
                  },
                  {
                    name: 'css',
                    title: 'CSS Library',
                    icon: styles,
                    className: 'tab-css',
                  },
                ]}
              >
                <PGtab name="options">



                  <PanelRow>
                    <label for="">Wrapper Tag</label>
                    <SelectControl
                      label=""
                      value={wrapper.options.tag}
                      options={[
                        { label: 'Choose', value: '' },
                        { label: 'H1', value: 'h1' },
                        { label: 'H2', value: 'h2' },
                        { label: 'H3', value: 'h3' },
                        { label: 'H4', value: 'h4' },
                        { label: 'H5', value: 'h5' },
                        { label: 'H6', value: 'h6' },
                        { label: 'Span', value: 'span' },
                        { label: 'DIV', value: 'div' },
                        { label: 'P', value: 'p' },
                      ]}
                      onChange={(newVal) => {

                        var options = { ...wrapper.options, tag: newVal };
                        setAttributes({ wrapper: { styles: wrapper.styles, options: options } });

                      }

                      }
                    />
                  </PanelRow>

                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={wrapper} onChange={onChangeStyleWrapper} onAdd={onAddStyleWrapper} onRemove={onRemoveStyleWrapper} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={wrapper} onChange={onPickCssLibraryWrapper} />
                </PGtab>
              </PGtabs>
            </PanelBody>

            <PanelBody title="Cart Button" initialOpen={false}>

              <PGtabs
                activeTab="options"
                orientation="horizontal"
                activeClass="active-tab"
                onSelect={(tabName) => { }}
                tabs={[
                  {
                    name: 'options',
                    title: 'Options',
                    icon: settings,
                    className: 'tab-settings',
                  },
                  {
                    name: 'styles',
                    title: 'Styles',
                    icon: styles,
                    className: 'tab-style',
                  },
                  {
                    name: 'css',
                    title: 'CSS Library',
                    icon: styles,
                    className: 'tab-css',
                  },
                ]}
              >
                <PGtab name="options">




                  <PanelRow>
                    <label for="">Enable Ajax Cart</label>
                    <SelectControl
                      label=""
                      value={cartBtn.options.ajax}
                      options={[
                        { label: 'True', value: 1 },
                        { label: 'False', value: 0 },

                      ]}
                      onChange={(newVal) => {

                        var options = { ...cartBtn.options, ajax: newVal };
                        setAttributes({ cartBtn: { ...cartBtn, options: options } });

                      }

                      }
                    />
                  </PanelRow>



                  <PanelRow>
                    <label for="">Quantity</label>

                    <InputControl
                      value={quantityInput.options.quantity}
                      onChange={(newVal) => {

                        var options = { ...quantityInput.options, quantity: newVal };
                        setAttributes({ quantityInput: { ...quantityInput, options: options } });
                      }
                      }
                    />
                  </PanelRow>

                  <PanelRow>
                    <label for="">Product Id / Variation ID</label>

                    <InputControl
                      value={cartBtn.options.productId}
                      onChange={(newVal) => {

                        var options = { ...cartBtn.options, productId: newVal };
                        setAttributes({ cartBtn: { ...cartBtn, options: options } });
                      }
                      }
                    />
                  </PanelRow>





                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={cartBtn} onChange={onChangeStyleSku} onAdd={onAddStyleSku} onRemove={onRemoveStyleSku} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={cartBtn} onChange={onPickCssLibrarySku} />
                </PGtab>
              </PGtabs>

            </PanelBody>

            <PanelBody title="Quantity" initialOpen={false}>


              <PanelBody title="Quantity Wrap" initialOpen={false}>

                <PGtabs
                  activeTab="options"
                  orientation="horizontal"
                  activeClass="active-tab"
                  onSelect={(tabName) => { }}
                  tabs={[
                    {
                      name: 'options',
                      title: 'Options',
                      icon: settings,
                      className: 'tab-settings',
                    },
                    {
                      name: 'styles',
                      title: 'Styles',
                      icon: styles,
                      className: 'tab-style',
                    },

                  ]}
                >
                  <PGtab name="options">

                  </PGtab>
                  <PGtab name="styles">
                    <PGStyles obj={quantityWrap} onChange={onChangeStyleQuantityWrap} onAdd={onAddStyleQuantityWrap} onRemove={onRemoveStyleQuantityWrap} />
                  </PGtab>

                </PGtabs>
              </PanelBody>

              <PanelBody title="Quantity Increase" initialOpen={false}>

                <PGtabs
                  activeTab="options"
                  orientation="horizontal"
                  activeClass="active-tab"
                  onSelect={(tabName) => { }}
                  tabs={[
                    {
                      name: 'options',
                      title: 'Options',
                      icon: settings,
                      className: 'tab-settings',
                    },
                    {
                      name: 'styles',
                      title: 'Styles',
                      icon: styles,
                      className: 'tab-style',
                    },

                  ]}
                >
                  <PGtab name="options">

                  </PGtab>
                  <PGtab name="styles">
                    <PGStyles obj={quantityIncrease} onChange={onChangeStyleQuantityIncrease} onAdd={onAddStyleQuantityIncrease} onRemove={onRemoveStyleQuantityIncrease} />
                  </PGtab>

                </PGtabs>
              </PanelBody>

              <PanelBody title="Quantity Decrease" initialOpen={false}>

                <PGtabs
                  activeTab="options"
                  orientation="horizontal"
                  activeClass="active-tab"
                  onSelect={(tabName) => { }}
                  tabs={[
                    {
                      name: 'options',
                      title: 'Options',
                      icon: settings,
                      className: 'tab-settings',
                    },
                    {
                      name: 'styles',
                      title: 'Styles',
                      icon: styles,
                      className: 'tab-style',
                    },

                  ]}
                >
                  <PGtab name="options">

                  </PGtab>
                  <PGtab name="styles">
                    <PGStyles obj={quantityDecrease} onChange={onChangeStyleQuantityDecrease} onAdd={onAddStyleQuantityDecrease} onRemove={onRemoveStyleQuantityDecrease} />
                  </PGtab>

                </PGtabs>
              </PanelBody>

              <PanelBody title="Quantity Input" initialOpen={false}>

                <PGtabs
                  activeTab="options"
                  orientation="horizontal"
                  activeClass="active-tab"
                  onSelect={(tabName) => { }}
                  tabs={[
                    {
                      name: 'options',
                      title: 'Options',
                      icon: settings,
                      className: 'tab-settings',
                    },
                    {
                      name: 'styles',
                      title: 'Styles',
                      icon: styles,
                      className: 'tab-style',
                    },

                  ]}
                >
                  <PGtab name="options">

                  </PGtab>
                  <PGtab name="styles">
                    <PGStyles obj={quantityInput} onChange={onChangeStyleQuantityInput} onAdd={onAddStyleQuantityInput} onRemove={onRemoveStyleQuantityInput} />
                  </PGtab>

                </PGtabs>
              </PanelBody>





            </PanelBody>

            <PanelBody title="Icon" initialOpen={false}>


              <PGtabs
                activeTab="options"
                orientation="horizontal"
                activeClass="active-tab"
                onSelect={(tabName) => { }}
                tabs={[
                  {
                    name: 'options',
                    title: 'Options',
                    icon: settings,
                    className: 'tab-settings',
                  },
                  {
                    name: 'styles',
                    title: 'Styles',
                    icon: styles,
                    className: 'tab-style',
                  },
                  {
                    name: 'css',
                    title: 'CSS Library',
                    icon: styles,
                    className: 'tab-css',
                  },
                ]}
              >
                <PGtab name="options">

                  <PanelRow>
                    <label for="">Choose Icon</label>

                    <PGIconPicker library={icon.options.library} srcType={icon.options.srcType} iconSrc={icon.options.iconSrc} onChange={onChangeIcon} />
                  </PanelRow>



                  <PanelRow>
                    <label for="">Icon position</label>

                    <SelectControl
                      label=""
                      value={icon.options.position}
                      options={[

                        { label: 'Choose Position', value: '' },

                        { label: 'Before Cart Text', value: 'beforeCartText' },
                        { label: 'After Cart Text', value: 'afterCartText' },
                        { label: 'Before Prefix', value: 'beforePrefix' },
                        { label: 'After Prefix', value: 'afterPrefix' },
                        { label: 'Before Postfix', value: 'beforePostfix' },
                        { label: 'After Postfix', value: 'afterPostfix' },

                      ]}
                      onChange={(newVal) => {


                        var options = { ...icon.options, position: newVal };
                        setAttributes({ icon: { ...icon, options: options } });


                      }



                      }
                    />
                  </PanelRow>

                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={icon} onChange={onChangeStyleIcon} onAdd={onAddStyleIcon} onRemove={onRemoveStyleIcon} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={icon} onChange={onPickCssLibraryIcon} />
                </PGtab>
              </PGtabs>

            </PanelBody>


            <PanelBody title="View Cart" initialOpen={false}>

              <PGtabs
                activeTab="options"
                orientation="horizontal"
                activeClass="active-tab"
                onSelect={(tabName) => { }}
                tabs={[
                  {
                    name: 'options',
                    title: 'Options',
                    icon: settings,
                    className: 'tab-settings',
                  },
                  {
                    name: 'styles',
                    title: 'Styles',
                    icon: styles,
                    className: 'tab-style',
                  },

                ]}
              >
                <PGtab name="options">

                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={viewCart} onChange={onChangeStyleViewCart} onAdd={onAddStyleViewCart} onRemove={onRemoveStyleViewCart} />
                </PGtab>

              </PGtabs>
            </PanelBody>




            <PanelBody title="Prefix" initialOpen={false}>

              <PGtabs
                activeTab="options"
                orientation="horizontal"
                activeClass="active-tab"
                onSelect={(tabName) => { }}
                tabs={[
                  {
                    name: 'options',
                    title: 'Options',
                    icon: settings,
                    className: 'tab-settings',
                  },
                  {
                    name: 'styles',
                    title: 'Styles',
                    icon: styles,
                    className: 'tab-style',
                  },
                  {
                    name: 'css',
                    title: 'CSS Library',
                    icon: styles,
                    className: 'tab-css',
                  },
                ]}
              >
                <PGtab name="options">
                  <PanelRow>
                    <label for="">Prefix</label>

                    <InputControl
                      value={prefix.options.text}
                      onChange={(newVal) => {



                        var options = { ...prefix.options, text: newVal };
                        setAttributes({ prefix: { styles: prefix.styles, options: options } });

                      }
                      }
                    />
                  </PanelRow>
                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={prefix} onChange={onChangeStylePrefix} onAdd={onAddStylePrefix} onRemove={onRemoveStylePrefix} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={prefix} onChange={onPickCssLibraryPrefix} />
                </PGtab>
              </PGtabs>


            </PanelBody>




            <PanelBody title="Postfix" initialOpen={false}>



              <PGtabs
                activeTab="options"
                orientation="horizontal"
                activeClass="active-tab"
                onSelect={(tabName) => { }}
                tabs={[
                  {
                    name: 'options',
                    title: 'Options',
                    icon: settings,
                    className: 'tab-settings',
                  },
                  {
                    name: 'styles',
                    title: 'Styles',
                    icon: styles,
                    className: 'tab-style',
                  },
                  {
                    name: 'css',
                    title: 'CSS Library',
                    icon: styles,
                    className: 'tab-css',
                  },
                ]}
              >
                <PGtab name="options">
                  <PanelRow>
                    <label for="">Postfix</label>

                    <InputControl
                      value={postfix.options.text}
                      onChange={(newVal) => {


                        var options = { ...postfix.options, text: newVal };
                        setAttributes({ postfix: { ...postfix, options: options } });

                      }

                      }
                    />
                  </PanelRow>
                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={postfix} onChange={onChangeStylePostfix} onAdd={onAddStylePostfix} onRemove={onRemoveStylePostfix} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={postfix} onChange={onPickCssLibraryPostfix} />
                </PGtab>
              </PGtabs>



            </PanelBody>

            <PanelBody title="Custom Style" initialOpen={false}>


              <p>Please use following class selector to apply your custom CSS</p>
              <div className='my-3'>
                <p className='font-bold'>Title Wrapper</p>
                <p><code>{wrapperSelector}{'{/* your CSS here*/}'}</code></p>
              </div>

              <div className='my-3'>
                <p className='font-bold'>Title link</p>
                <p><code>{cartBtnSelector}{'{/* your CSS here*/}'} </code></p>
              </div>

              <div className='my-3'>
                <p className='font-bold'>Prefix</p>
                <p><code>{prefixSelector}{'{/* your CSS here*/}'} </code></p>
              </div>

              <div className='my-3'>
                <p className='font-bold'>Postfix</p>
                <p><code>{postfixSelector}{'{/* your CSS here*/}'} </code></p>
              </div>





              <TextareaControl
                label="Custom CSS"
                help="Do not use 'style' tag"
                value={customCss}
                onChange={(value) => {
                  setAttributes({ customCss: value })

                }}
              />
            </PanelBody>

            <PGMailSubsctibe />
            <PGContactSupport utm={{ utm_source: 'BlockPostTitle', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />


          </div>



        </InspectorControls >

        <>

          {wrapper.options.tag && (
            <CustomTag {...blockProps}>

              {icon.options.position == 'beforePrefix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}

              {prefix.options.text && (
                <span className={prefix.options.class}>{prefix.options.text}</span>
              )}

              {icon.options.position == 'afterPrefix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}

              <div className='quantity-wrap'>
                <span className='quantity-decrease'>-</span>
                <input className='quantity-input' size="3" type="text" value={quantityInput.options.quantity} />
                <span className='quantity-increase'>+</span>
              </div>


              <a className='cartBtn' onClick={handleLinkClick} href="?add-to-cart=1399" data-quantity="1" data-product_id="1399" data-product_sku="woo-polo" aria-label="Add “Polo” to your cart" aria-describedby="" rel="nofollow">
                {icon.options.position == 'beforeCartText' && (
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                )}
                {postSKUEdited}
                {icon.options.position == 'afterCartText' && (
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                )}
              </a>


              {icon.options.position == 'beforePostfix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}

              {postfix.options.text &&
                (<span className={postfix.options.class}>{postfix.options.text}</span>)}
              {icon.options.position == 'afterPostfix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}

            </CustomTag>
          )}

        </>
      </>

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})

