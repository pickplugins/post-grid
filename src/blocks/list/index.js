import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover, Spinner } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';
import { Icon, styles, settings, link, linkOff } from "@wordpress/icons";

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl, InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'



import IconToggle from '../../components/icon-toggle'
import Typography from '../../components/typography'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import PGIconPicker from '../../components/icon-picker'
import PGcssDisplay from '../../components/css-display'

import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'
import PGCssLibrary from '../../components/css-library'

var myStore = wp.data.select('postgrid-shop');


registerBlockType("post-grid/list", {
  title: "List",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:

      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.71554 16.5689H7.43108C8.12739 16.5689 8.70128 17.0931 8.77972 17.7683L8.78885 17.9267V20.6422C8.78885 21.3386 8.26469 21.9124 7.58942 21.9909L7.43108 22H4.71554C4.01923 22 3.44534 21.4759 3.36691 20.8006L3.35777 20.6422V17.9267C3.35777 17.2304 3.88193 16.6565 4.5572 16.5781L4.71554 16.5689H7.43108H4.71554ZM21.0088 17.9267C21.7587 17.9267 22.3666 18.5346 22.3666 19.2845C22.3666 20.0344 21.7587 20.6422 21.0088 20.6422H12.8622C12.1123 20.6422 11.5044 20.0344 11.5044 19.2845C11.5044 18.5346 12.1123 17.9267 12.8622 17.9267H21.0088ZM7.43108 17.9267H4.71554V20.6422H7.43108V17.9267ZM7.43108 9.78007C8.18095 9.78007 8.78885 10.388 8.78885 11.1378V13.8534C8.78885 14.6032 8.18095 15.2111 7.43108 15.2111H4.71554C3.96567 15.2111 3.35777 14.6032 3.35777 13.8534V11.1378C3.35777 10.388 3.96567 9.78007 4.71554 9.78007H7.43108ZM21.0088 11.1378C21.7587 11.1378 22.3666 11.7457 22.3666 12.4956C22.3666 13.1919 21.8424 13.7658 21.1671 13.8442L21.0088 13.8534H12.8622C12.1123 13.8534 11.5044 13.2455 11.5044 12.4956C11.5044 11.7993 12.0286 11.2254 12.7038 11.147L12.8622 11.1378H21.0088ZM7.43108 11.1378H4.71554V13.8534H7.43108V11.1378ZM8.48289 3.29826C8.84442 3.65979 8.87728 4.22553 8.58149 4.62418L8.48289 4.73839L5.09616 8.12512C4.90519 8.31611 4.64617 8.42338 4.3761 8.42338C4.16004 8.42338 3.95105 8.35473 3.77832 8.22948L3.65603 8.12512L2.29826 6.76735C1.90058 6.36967 1.90058 5.72491 2.29826 5.32722C2.65979 4.96569 3.22552 4.93283 3.62418 5.22862L3.73839 5.32722L4.3761 5.96492L7.04276 3.29826C7.44044 2.90058 8.0852 2.90058 8.48289 3.29826V3.29826ZM21.0088 4.34899C21.7587 4.34899 22.3666 4.95689 22.3666 5.70676C22.3666 6.40306 21.8424 6.97696 21.1671 7.05539L21.0088 7.06453H12.8622C12.1123 7.06453 11.5044 6.45663 11.5044 5.70676C11.5044 5.01045 12.0286 4.43655 12.7038 4.35812L12.8622 4.34899H21.0088Z" />
      </svg>


    ,
  },


  attributes: {


    wrapper: {
      type: 'object',
      default: {
        options: {
          tag: 'ul',
          class: 'pg-accordion',
        },

        styles:
        {

          color: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
          display: {},

        },
      },
    },


    items: {
      type: 'array',
      default: [{ text: '', icon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-chevron-right', }, styles: {}, }],
    },
    item: {
      type: 'object',
      default: {
        options: {
          text: '',
          tag: 'li',
          counter: false,
          reversed: false,
          start: 1,
          type: '1',

          class: 'item',


        },

        styles:
        {

          color: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
          display: { Desktop: '' },
          listStyle: { Desktop: '' },
          listStylePosition: { Desktop: '' },
          listStyleType: { Desktop: '' },

        },
      },
    },



    icon: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-chevron-right', class: 'icon', positon: 'before', },

        styles:
        {
          color: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },

          fontSize: { Desktop: '' },
        },
      },
    },

    blockId: {
      "type": "string",
      "default": ''
    },
    customCss: {
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


    var blockId = attributes.blockId;

    var blockIdX = attributes.blockId ? attributes.blockId : 'pg' + clientId.split('-').pop();
    var blockClass = '.' + blockIdX;

    var items = attributes.items;
    var wrapper = attributes.wrapper;
    var item = attributes.item;


    var icon = attributes.icon;

    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    var postId = context['postId'];
    var postType = context['postType'];

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    const [isLoading, setisLoading] = useState(false);
    const [postGridData, setPostGridData] = useState(window.PostGridPluginData);

    const [isOpen, setisOpen] = useState(false);


    // Wrapper CSS Class Selectors
    var wrapperSelector = blockClass;
    var itemSelector = blockClass + ' .item';
    const iconSelector = blockClass + ' .icon';

    const CustomTag = `${wrapper.options.tag}`;
    const CustomTagItem = `${item.options.tag}`;



    useEffect(() => {

      setAttributes({ blockId: blockIdX });
      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [clientId]);


    useEffect(() => {


      setAttributes({ customCss: customCss });

      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);


    var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    for (var x in breakPoints) {

      var itemX = breakPoints[x];
      breakPointList.push({ label: itemX.name, icon: itemX.icon, value: itemX.id })

    }



    const [iconHtml, setIconHtml] = useState('');

    useEffect(() => {

      var iconSrc = icon.options.iconSrc;
      var iconHtml = `<span class="${iconSrc}"></span>`;

      setIconHtml(iconHtml);
    }, [icon]);








    function handleLinkClick(ev) {

      ev.stopPropagation();
      ev.preventDefault();
      return false;
    }



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




    function onPickCssLibraryItem(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        item[sudoScource] = sudoScourceArgs;
      })

      var itemX = Object.assign({}, item);
      setAttributes({ item: itemX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, itemSelector);


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
























    function onChangeStyleWrapper(sudoScource, newVal, attr) {

      var path = sudoScource + '.' + attr + '.' + breakPointX
      let obj = Object.assign({}, wrapper);
      const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      setAttributes({ wrapper: updatedObj });
      var sudoScourceX = { ...updatedObj[sudoScource] }


      var elementSelector = myStore.getElementSelector(sudoScource, wrapperSelector);


      sudoScourceX[attr][breakPointX] = newVal;

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {
        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[elementSelector][argAttr] = argAttrVal;
      })

      setAttributes({ blockCssY: { items: blockCssY.items } });
    }


    function onRemoveStyleWrapper(sudoScource, key) {

      var object = myStore.deletePropertyDeep(wrapper, [sudoScource, key, breakPointX]);
      setAttributes({ wrapper: object });


      var elementSelector = myStore.getElementSelector(sudoScource, wrapperSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


      // var sudoScourceX = { ...wrapper[sudoScource] }
      // if (sudoScourceX[key] != undefined) {
      //   delete sudoScourceX[key];
      // }

      // wrapper[sudoScource] = sudoScourceX;
      // setAttributes({ wrapper: { ...wrapper } });

      // if (blockCssY.items[wrapperSelector] == undefined) {
      //   blockCssY.items[wrapperSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {
      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[wrapperSelector][argAttr] = argAttrVal;
      // })

      // if (blockCssY.items[wrapperSelector][key] != undefined) {
      //   delete blockCssY.items[wrapperSelector][key];
      // }


      // setAttributes({ blockCssY: { items: blockCssY.items } });
    }


    function onAddStyleWrapper(sudoScource, key) {
      // var sudoScourceX = { ...wrapper[sudoScource] }
      // sudoScourceX[key] = {};
      // wrapper[sudoScource] = sudoScourceX;
      // setAttributes({ wrapper: { ...wrapper } });



      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, wrapper);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ wrapper: object });

    }



    function onChangeStyleItem(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, item);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ item: object });

      var elementSelector = myStore.getElementSelector(sudoScource, itemSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });




      // var path = sudoScource + '.' + attr + '.' + breakPointX
      // let obj = Object.assign({}, item);
      // const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      // setAttributes({ item: updatedObj });
      // var sudoScourceX = { ...updatedObj[sudoScource] }




      // var elementSelector = myStore.getElementSelector(sudoScource, itemSelector);


      // sudoScourceX[attr][breakPointX] = newVal;

      // if (blockCssY.items[elementSelector] == undefined) {
      //   blockCssY.items[elementSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {
      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[elementSelector][argAttr] = argAttrVal;
      // })

      // setAttributes({ blockCssY: { items: blockCssY.items } });
    }


    function onRemoveStyleItem(sudoScource, key) {

      var object = myStore.deletePropertyDeep(item, [sudoScource, key, breakPointX]);
      setAttributes({ item: object });

      var elementSelector = myStore.getElementSelector(sudoScource, itemSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });





      // var sudoScourceX = { ...item[sudoScource] }
      // if (sudoScourceX[key] != undefined) {
      //   delete sudoScourceX[key];
      // }

      // item[sudoScource] = sudoScourceX;
      // setAttributes({ item: { ...item } });

      // if (blockCssY.items[itemSelector] == undefined) {
      //   blockCssY.items[itemSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {
      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[itemSelector][argAttr] = argAttrVal;
      // })

      // if (blockCssY.items[itemSelector][key] != undefined) {
      //   delete blockCssY.items[itemSelector][key];
      // }


      // setAttributes({ blockCssY: { items: blockCssY.items } });
    }


    function onAddStyleItem(sudoScource, key) {
      var sudoScourceX = { ...item[sudoScource] }
      sudoScourceX[key] = {};
      item[sudoScource] = sudoScourceX;
      setAttributes({ item: { ...item } });
    }




    function onChangeStyleIcon(sudoScource, newVal, attr) {

      // var path = sudoScource + '.' + attr + '.' + breakPointX
      // let obj = Object.assign({}, icon);
      // const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      // setAttributes({ icon: updatedObj });
      // var sudoScourceX = { ...updatedObj[sudoScource] }

      // var elementSelector = myStore.getElementSelector(sudoScource, iconSelector);

      // sudoScourceX[attr][breakPointX] = newVal;

      // if (blockCssY.items[elementSelector] == undefined) {
      //   blockCssY.items[elementSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {
      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[elementSelector][argAttr] = argAttrVal;
      // })

      // setAttributes({ blockCssY: { items: blockCssY.items } });


      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, icon);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ icon: object });

      var elementSelector = myStore.getElementSelector(sudoScource, iconSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });












    }


    function onRemoveStyleIcon(sudoScource, key) {

      var object = myStore.deletePropertyDeep(icon, [sudoScource, key, breakPointX]);
      setAttributes({ icon: object });


      var elementSelector = myStore.getElementSelector(sudoScource, iconSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });

      // var sudoScourceX = { ...icon[sudoScource] }
      // if (sudoScourceX[key] != undefined) {
      //   delete sudoScourceX[key];
      // }

      // icon[sudoScource] = sudoScourceX;
      // setAttributes({ icon: { ...icon } });

      // if (blockCssY.items[iconSelector] == undefined) {
      //   blockCssY.items[iconSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {
      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[iconSelector][argAttr] = argAttrVal;
      // })


      // if (blockCssY.items[iconSelector][key] != undefined) {
      //   delete blockCssY.items[iconSelector][key];
      // }

      // setAttributes({ blockCssY: { items: blockCssY.items } });
    }


    function onAddStyleIcon(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, icon);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ icon: object });
    }












    function onChangeIconTypo(typoX) {





      setAttributes({ icon: { ...icon, styles: typoX } });

      var newValuesObjX = {};
      var itemsX = blockCssY.items;





      if (typoX.fontSize[breakPointX] != undefined) {

        var fontSizeVal = (typoX.fontSize[breakPointX].val) ? typoX.fontSize[breakPointX].val : 16;
        var fontSizeUnit = (typoX.fontSize[breakPointX].unit) ? typoX.fontSize[breakPointX].unit : 'px';


        var fontSizeX = (blockCssY.items[iconSelector] != undefined) ? blockCssY.items[iconSelector]['font-size'] : {};

        fontSizeX[breakPointX] = fontSizeVal + fontSizeUnit;
        //blockCssY.items[iconSelector] = { ...blockCssY.items[iconSelector], 'font-size': fontSizeX };
        itemsX[iconSelector] = { ...blockCssY.items[iconSelector], 'font-size': fontSizeX };

      }


      if (typoX.lineHeight[breakPointX] != undefined) {

        var lineHeightVal = (typoX.lineHeight[breakPointX].val) ? typoX.lineHeight[breakPointX].val : 16;
        var lineHeightUnit = (typoX.lineHeight[breakPointX].unit) ? typoX.lineHeight[breakPointX].unit : 'px';


        var lineHeightX = (blockCssY.items[iconSelector]['line-height'] != undefined) ? blockCssY.items[iconSelector]['line-height'] : {};

        lineHeightX[breakPointX] = lineHeightVal + lineHeightUnit;

        //blockCssY.items[iconSelector] = { ...blockCssY.items[iconSelector], 'line-height': lineHeightX };
        itemsX[iconSelector] = { ...blockCssY.items[iconSelector], 'line-height': lineHeightX };

      }


      if (typoX.fontWeight[breakPointX] != undefined) {

        itemsX[iconSelector] = { ...blockCssY.items[iconSelector], 'font-weight': typoX.fontWeight };

      }


      if (typoX.textDecoration[breakPointX] != undefined) {

        var str = {};

        var textDecorationX = typoX.textDecoration[breakPointX];
        var textDecorationXStr = (textDecorationX.length > 0) ? textDecorationX.join(' ') : '';

        str[breakPointX] = textDecorationXStr;
        itemsX[iconSelector] = { ...blockCssY.items[iconSelector], 'text-decoration': str };



      }




      //setAttributes({ blockCssY: { items: blockCssY.items } });
      setAttributes({ blockCssY: { items: itemsX } });


    }


    function paddingControlHeader(nextValues) {


      var responsive = item.styles.padding;
      responsive[breakPointX] = nextValues;


      var styles = { ...item.styles, padding: responsive };
      setAttributes({ item: { ...item, styles: styles } });


      var itemsX = { ...blockCssY.items };



      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[itemSelector] = (blockCssY.items[itemSelector] != undefined) ? blockCssY.items[itemSelector] : {};



      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[itemSelector]['padding-top'] != undefined) ? blockCssY.items[itemSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-top': paddingTop };
        //itemsX[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[itemSelector]['padding-right'] != undefined) ? blockCssY.items[itemSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-right': paddingRight };
        //itemsX[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[itemSelector]['padding-bottom'] != undefined) ? blockCssY.items[itemSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-bottom': paddingBottom };
        //itemsX[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[itemSelector]['padding-left'] != undefined) ? blockCssY.items[itemSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-left': paddingLeft };
        //itemsX[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });
      //setAttributes({ blockCssY: { items: itemsX } });



    }






    function marginControlHeader(nextValues) {

      var responsive = item.styles.margin;
      responsive[breakPointX] = nextValues;



      var styles = { ...item.styles, margin: responsive };
      setAttributes({ item: { ...item, styles: styles } });




      var itemsX = { ...blockCssY.items };

      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[itemSelector] = (blockCssY.items[itemSelector] != undefined) ? blockCssY.items[itemSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[itemSelector]['margin-top'] != undefined) ? blockCssY.items[itemSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-top': marginTop };
        //itemsX[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-top': marginTop };

      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[itemSelector]['margin-right'] !== undefined) ? blockCssY.items[itemSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-right': marginRight };
        //itemsX[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[itemSelector]['margin-bottom'] !== undefined) ? blockCssY.items[itemSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-bottom': marginBottom };
        //itemsX[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[itemSelector]['margin-left'] !== undefined) ? blockCssY.items[itemSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-left': marginLeft };
        //itemsX[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-left': marginLeft };

      }

      setAttributes({ blockCssY: { items: blockCssY.items } });
      //setAttributes({ blockCssY: { items: itemsX } });

    }



    function generateBlockCssY() {


      var reponsiveCssGroups = {};
      var reponsiveCss = '';

      for (var selector in blockCssY.items) {

        var attrs = blockCssY.items[selector];


        for (var attr in attrs) {
          var breakpoints = attrs[attr];

          for (var device in breakpoints) {

            var attrValue = breakpoints[device];

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

      if (reponsiveCssGroups['Mobile'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 0px) and (max-width: 360px){';

        for (var selector in reponsiveCssGroups['Mobile']) {
          var attrs = reponsiveCssGroups['Mobile'][selector];

          reponsiveCss += selector + '{';
          for (var index in attrs) {
            var attr = attrs[index]
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }
          reponsiveCss += '}';
        }
        reponsiveCss += '}';

      }




      if (reponsiveCssGroups['Tablet'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 361px) and (max-width: 780px){';

        for (var selector in reponsiveCssGroups['Tablet']) {
          var attrs = reponsiveCssGroups['Tablet'][selector];

          reponsiveCss += selector + '{';
          for (var index in attrs) {
            var attr = attrs[index]
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }
          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      }



      if (reponsiveCssGroups['Desktop'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 781px){';

        for (var selector in reponsiveCssGroups['Desktop']) {
          var attrs = reponsiveCssGroups['Desktop'][selector];


          reponsiveCss += selector + '{';
          for (var index in attrs) {
            var attr = attrs[index]
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }
          reponsiveCss += '}';


        }
        reponsiveCss += '}';
      }







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



    }















    useEffect(() => {

      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);







    const colors = [
      { name: '9DD6DF', color: '#9DD6DF' },
      { name: '18978F', color: '#18978F' },
      { name: 'A084CF', color: '#A084CF' },
      { name: 'DFBB9D', color: '#DFBB9D' },
      { name: '774360', color: '#774360' },
      { name: '3AB0FF', color: '#3AB0FF' },
      { name: '51557E', color: '#51557E' },


    ];





    const [setSome, setSomeState] = useState({});
    const [stateX, setStateX] = useState('Old Value');







    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType,

    } = wp.data.dispatch('core/edit-post')





    function onChangeBreakPoint(x, index) {


      setPreviewDeviceType(x.value)
      var asdsdsd = wp.data.dispatch('postgrid-shop').setBreakPoint(x.value)

      asdsdsd.then((res) => {

        setBreakPointX(res.breakpoint);
        //generateBlockCssY();
        myStore.generateBlockCss(blockCssY.items, blockId, customCss);
      });



    }


    return (
      [


        <>

          <BlockControls >


          </BlockControls>


          <InspectorControls key="general">
            <div className='px-2' title="Items" initialOpen={false}>


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
                          { label: 'No Wrapper', value: '' },
                          { label: 'Ul', value: 'ul' },
                          { label: 'Ol', value: 'ol' },

                          { label: 'H1', value: 'h1' },
                          { label: 'H2', value: 'h2' },
                          { label: 'H3', value: 'h3' },
                          { label: 'H4', value: 'h4' },
                          { label: 'H5', value: 'h5' },
                          { label: 'H6', value: 'h6' },
                          { label: 'Span', value: 'SPAN' },
                          { label: 'Div', value: 'DIV' },
                          { label: 'P', value: 'p' },


                        ]}
                        onChange={(newVal) => {

                          var options = { ...wrapper.options, tag: newVal };
                          setAttributes({ wrapper: { ...wrapper, options: options } });



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

              <PanelBody title="Items" initialOpen={false}>


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
                        value={item.options.tag}
                        options={[
                          { label: 'Choose', value: '' },
                          { label: 'li', value: 'li' },
                          { label: 'H1', value: 'h1' },
                          { label: 'H2', value: 'h2' },
                          { label: 'H3', value: 'h3' },
                          { label: 'H4', value: 'h4' },
                          { label: 'H5', value: 'h5' },
                          { label: 'H6', value: 'h6' },
                          { label: 'SPAN', value: 'span' },
                          { label: 'DIV', value: 'div' },
                          { label: 'P', value: 'p' },


                        ]}
                        onChange={(newVal) => {

                          var options = { ...item.options, tag: newVal };
                          setAttributes({ item: { ...item, options: options } });

                        }

                        }
                      />
                    </PanelRow>

                    {wrapper.options.tag == 'ol' && (

                      <>

                        <ToggleControl
                          label="Reversed?"
                          help={item.options.reversed ? 'Counter reversed?' : 'No reversed'}
                          checked={item.options.reversed ? true : false}
                          onChange={(e) => {



                            var options = { ...item.options, reversed: item.options.reversed ? false : true };
                            setAttributes({ item: { ...item, options: options } });



                          }}
                        />




                        <PanelRow>
                          <label for="">Counter start with</label>

                          <InputControl
                            value={item.options.start}
                            onChange={(newVal) => {
                              var options = { ...item.options, start: newVal };
                              setAttributes({ item: { ...item, options: options } });

                            }
                            }
                          />
                        </PanelRow>


                        <PanelRow>
                          <label for="">Ordered list type?</label>

                          <SelectControl
                            label=""
                            value={item.options.type}
                            options={[
                              { label: 'Choose', value: '' },
                              { label: 'Decimal numbers (1, 2, 3, 4)', value: '1' },
                              { label: 'Alphabetically ordered list', value: 'a' },
                              { label: 'Alphabetically ordered list, uppercase', value: 'A' },
                              { label: 'Roman numbers, lowercase (i, ii, iii, iv)', value: 'i' },
                              { label: 'Roman numbers, uppercase (I, II, III, IV)', value: 'I' },
                            ]}
                            onChange={(newVal) => {

                              var options = { ...item.options, type: newVal };
                              setAttributes({ item: { ...item, options: options } });

                            }

                            }
                          />
                        </PanelRow>


                      </>
                    )}





                  </PGtab>
                  <PGtab name="styles">
                    <PGStyles obj={item} onChange={onChangeStyleItem} onAdd={onAddStyleItem} onRemove={onRemoveStyleItem} />
                  </PGtab>
                  <PGtab name="css">
                    <PGCssLibrary blockId={blockId} obj={item} onChange={onPickCssLibraryItem} />
                  </PGtab>
                </PGtabs>



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
                      <label for="">Icon postion</label>
                      <SelectControl
                        label=""
                        value={icon.options.position}
                        options={[
                          { label: 'Choose...', value: '' },
                          { label: 'Left', value: 'left' },
                          { label: 'Before Text', value: 'before' },
                          { label: 'After Text', value: 'after' },
                          { label: 'Right', value: 'right' },
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
                    <PGStyles obj={wrapper} onChange={onChangeStyleIcon} onAdd={onAddStyleIcon} onRemove={onRemoveStyleIcon} />
                  </PGtab>
                  <PGtab name="css">
                    <PGCssLibrary blockId={blockId} obj={icon} onChange={onPickCssLibraryIcon} />
                  </PGtab>
                </PGtabs>








              </PanelBody>



              <PanelBody title="Custom Style" initialOpen={false}>


                <p>Please use following class selector to apply your custom CSS</p>


                <div className='my-3'>
                  <p className='font-bold'>Text </p>
                  <p><code>{wrapperSelector}{'{}'} </code></p>
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

              <div className='px-2'>
                <PGMailSubsctibe />
                <PGContactSupport utm={{ utm_source: 'BlockText', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />
              </div>


            </div>






          </InspectorControls >
        </>
        ,


        <>

          {wrapper.options.tag && (

            <CustomTag className={[blockId]}
              reversed={item.options.reversed ? 'reversed' : ''}
              start={item.options.start}

            >


              {items.map((itemX, i) => {

                return (

                  <>

                    <CustomTagItem className={` cursor-pointer ${item.options.class}`} onClick={ev => {


                      var ssdsd = items.concat([]);

                      setAttributes({ items: ssdsd });

                    }}>

                      {icon.options.position == 'left' && (
                        <>

                          <span className='icon' dangerouslySetInnerHTML={{ __html: iconHtml }} />

                        </>
                      )}


                      {icon.options.position == 'before' && (
                        <>

                          <span className='icon' dangerouslySetInnerHTML={{ __html: iconHtml }} />

                        </>
                      )}




                      <RichText

                        tagName='span'
                        value={itemX.text}
                        allowedFormats={['core/bold', 'core/italic', 'core/link']}

                        onChange={(content) => {

                          console.log('#onChange');


                          items[i].text = content;
                          var ssdsd = items.concat([]);

                          setAttributes({ items: ssdsd });
                        }}
                        placeholder={__('Start Writing...')}
                      />




                      {icon.options.position == 'after' && (
                        <>

                          <span className='icon' dangerouslySetInnerHTML={{ __html: iconHtml }} />


                        </>
                      )}


                      {icon.options.position == 'right' && (
                        <>

                          <span className='icon float-right' dangerouslySetInnerHTML={{ __html: iconHtml }} />


                        </>
                      )}


                      <span className='text-lg cursor-pointer px-2 text-red-500  py-1 float-right icon-close'
                        onClick={(ev) => {

                          items.splice(i, 1);
                          var ssdsd = items.concat([]);

                          setAttributes({ items: ssdsd })
                          ev.preventDefault();
                        }}

                      ></span>


                    </CustomTagItem>






                  </>

                )

              })}




            </CustomTag>
          )}

          <div className={[blockId]}>

            <div className='bg-blue-500 p-2 px-5 text-white my-4 text-center cursor-pointer' onClick={ev => {

              var itemx = items.concat({ text: '', icon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-chevron-right', }, styles: {}, });

              setAttributes({ items: itemx });


            }}>Add</div>



          </div>


        </>
      ]

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file





    return null;
  }
})