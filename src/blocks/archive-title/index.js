import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { applyFilters } from '@wordpress/hooks';
import { InnerBlocks, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"

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

registerBlockType("post-grid/archive-title", {
  apiVersion: 2,
  title: "Archive Title",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><rect fill="#1d4ed8" y="16.57" width="13.97" height="2" /><rect fill="#1d4ed8" y="12.32" width="36" height="2" /><rect fill="#1d4ed8" y="6.41" width="36" height="2.35" /><path fill="#8db1ff" d="M0,22.46v7.13H10.69V22.46Zm9.43,5.87H1.26V23.72H9.43Z" /><path fill="#8db1ff" d="M12.66,22.46v7.13H23.34V22.46Zm9.42,5.87H13.92V23.72h8.16Z" /><path fill="#8db1ff" d="M25.31,22.46v7.13H36V22.46Zm9.43,5.87H26.57V23.72h8.17Z" /></svg>


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

    archiveTitle: {
      type: 'object',
      default: {
        options: {
          tag: 'div',
          archiveType: 'auto',
          customLabel: 'Archive: %s',
          dateFormat: '',


          linkTo: '', // postUrl, customField, authorUrl, authorLink, homeUrl, custom
          linkToUrl: '',
          linkToMetaKey: '',

          linkTarget: '_blank',
          linkAttr: [],
          customUrl: '',
          class: '',
        },

        styles: {
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },


          fontSize: { Desktop: '' },

        },
      },
    },
    icon: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'far fa-calendar-alt', position: 'beforeArchiveTitle', /*before, after, prefix, postfix */ class: 'postdate-icon', },

        styles:
        {
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
          fontSize: { Desktop: '' },

        },
      },
    },


    prefix: {
      type: 'object',
      default: {
        options:
          { text: '', class: 'prefix', },
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
          { text: '', class: 'prefix', },
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


    let archiveTitle = attributes.archiveTitle;
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


    var archiveTypes = {
      'auto': { label: 'Auto Detect', value: 'auto' },
      // 'author': { label: 'Author', value: 'author' },
      // 'category': { label: 'Category', value: 'category' },
      // 'tag': { label: 'Tag', value: 'tag' },
      // 'taxonomy': { label: 'Taxonomy', value: 'taxonomy' },
      // 'search': { label: 'Search', value: 'search' },
      // 'index': { label: 'Index', value: 'index' },
      // 'year': { label: 'Year', value: 'year' },
      // 'month': { label: 'Month', value: 'month' },
      // 'date': { label: 'Date', value: 'date' },

      // 'wcCatalog': { label: 'WooCommerce Catalog', value: 'wcCatalog' },
      // 'wcSearch': { label: 'WooCommerce Search', value: 'wcSearch' },

    }


    var archiveLinkToArgsBasic = {
      none: { label: 'No Link', value: '' },
      archiveUrl: { label: 'Archive URL', value: 'archiveUrl' },
      homeUrl: { label: 'Home URL', value: 'homeUrl' },
      customUrl: { label: 'Custom', value: 'customUrl' },
    };

    let archiveLinkToArgs = applyFilters('archiveLinkToArgs', archiveLinkToArgsBasic);



    var dateFormats = {
      'Y-M-d': { label: '2022-May-25', value: 'Y-M-d' },
      'Y-m-d': { label: '2022-05-25', value: 'Y-m-d' },
      'd-m-y': { label: '25-05-2022', value: 'd-m-y' },
      'd/m/y': { label: '25/05/2022', value: 'd/m/y' },
      'y-m-d': { label: '2022-05-25', value: 'y-m-d' },
      'y/m/d': { label: '2022/05/25', value: 'y/m/d' },
      'D M y': { label: 'Sun May 2022', value: 'D M y' },
      'D M d, y': { label: 'Sun May 11, 2022', value: 'D M d, y' },
      'M D d, y': { label: 'May Sun 11, 2022', value: 'M D d, y' },
      'M d, y': { label: 'May 11, 2022', value: 'M d, y' },

      'd M y': { label: '25 May 2022', value: 'd M y' },
    }



    const [archiveTitleEdited, setarchiveTitleEdited] = useState('Hello %s');

    function onChangeIcon(arg) {


      var options = { ...icon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
      setAttributes({ icon: { ...icon, options: options } });

    }

    useEffect(() => {


      console.log(archiveTitle);
      var archiveType = archiveTitle.options.archiveType;

      if (archiveType == 'auto') {
        //archiveTitleEdited = archiveTitle.options.customLabel;
        setarchiveTitleEdited(archiveTitle.options.customLabel);
      }



    }, [archiveTitle]);


    function setFieldLinkTo(option, index) {

      var options = { ...archiveTitle.options, linkTo: option.value };
      setAttributes({ archiveTitle: { ...archiveTitle, options: options } });

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




    function onPickCssLibraryArchiveTitle(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        archiveTitle[sudoScource] = sudoScourceArgs;
      })

      var archiveTitleX = Object.assign({}, archiveTitle);
      setAttributes({ archiveTitle: archiveTitleX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, archiveTitleSelector);


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







    function onChangeStyleArchiveTitle(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, archiveTitle);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ archiveTitle: object });

      var elementSelector = myStore.getElementSelector(sudoScource, archiveTitleSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });


    }






    function onRemoveStyleArchiveTitle(sudoScource, key) {



      var object = myStore.deletePropertyDeep(archiveTitle, [sudoScource, key, breakPointX]);
      setAttributes({ archiveTitle: object });

      var elementSelector = myStore.getElementSelector(sudoScource, archiveTitleSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });

    }





    function onAddStyleArchiveTitle(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, archiveTitle);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ archiveTitle: object });






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

      var sudoScourceX = { ...prefix[sudoScource] }
      sudoScourceX[key] = {};
      prefix[sudoScource] = sudoScourceX;
      setAttributes({ prefix: { ...prefix } });

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









    function onBulkAddWrapper(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]s
      let obj = Object.assign({}, wrapper);
      obj[sudoScource] = cssObj;

      setAttributes({ wrapper: obj });

      var selector = myStore.getElementSelector(sudoScource, wrapperSelector);
      var stylesObj = {};

      Object.entries(cssObj).map(args => {

        var attr = args[0];
        var cssPropty = myStore.cssAttrParse(attr);

        if (stylesObj[selector] == undefined) {
          stylesObj[selector] = {};
        }

        if (stylesObj[selector][cssPropty] == undefined) {
          stylesObj[selector][cssPropty] = {};
        }

        stylesObj[selector][cssPropty] = args[1]
      })


      var cssItems = { ...blockCssY.items };
      var cssItemsX = { ...cssItems, ...stylesObj }

      setAttributes({ blockCssY: { items: cssItemsX } });
    }



    function onBulkAddArchiveTitle(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, archiveTitle);
      obj[sudoScource] = cssObj;

      setAttributes({ archiveTitle: obj });

      var selector = myStore.getElementSelector(sudoScource, archiveTitleSelector);
      var stylesObj = {};

      Object.entries(cssObj).map(args => {

        var attr = args[0];
        var cssPropty = myStore.cssAttrParse(attr);

        if (stylesObj[selector] == undefined) {
          stylesObj[selector] = {};
        }

        if (stylesObj[selector][cssPropty] == undefined) {
          stylesObj[selector][cssPropty] = {};
        }

        stylesObj[selector][cssPropty] = args[1]
      })


      var cssItems = { ...blockCssY.items };
      var cssItemsX = { ...cssItems, ...stylesObj }

      setAttributes({ blockCssY: { items: cssItemsX } });
    }



    function onBulkAddIcon(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, icon);
      obj[sudoScource] = cssObj;

      setAttributes({ icon: obj });

      var selector = myStore.getElementSelector(sudoScource, iconSelector);
      var stylesObj = {};

      Object.entries(cssObj).map(args => {

        var attr = args[0];
        var cssPropty = myStore.cssAttrParse(attr);

        if (stylesObj[selector] == undefined) {
          stylesObj[selector] = {};
        }

        if (stylesObj[selector][cssPropty] == undefined) {
          stylesObj[selector][cssPropty] = {};
        }

        stylesObj[selector][cssPropty] = args[1]
      })


      var cssItems = { ...blockCssY.items };
      var cssItemsX = { ...cssItems, ...stylesObj }

      setAttributes({ blockCssY: { items: cssItemsX } });
    }

    function onBulkAddPrefix(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, prefix);
      obj[sudoScource] = cssObj;

      setAttributes({ prefix: obj });

      var selector = myStore.getElementSelector(sudoScource, prefixSelector);
      var stylesObj = {};

      Object.entries(cssObj).map(args => {

        var attr = args[0];
        var cssPropty = myStore.cssAttrParse(attr);

        if (stylesObj[selector] == undefined) {
          stylesObj[selector] = {};
        }

        if (stylesObj[selector][cssPropty] == undefined) {
          stylesObj[selector][cssPropty] = {};
        }

        stylesObj[selector][cssPropty] = args[1]
      })


      var cssItems = { ...blockCssY.items };
      var cssItemsX = { ...cssItems, ...stylesObj }

      setAttributes({ blockCssY: { items: cssItemsX } });
    }




    function onBulkAddPostfix(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, postfix);
      obj[sudoScource] = cssObj;

      setAttributes({ postfix: obj });

      var selector = myStore.getElementSelector(sudoScource, postfixSelector);
      var stylesObj = {};

      Object.entries(cssObj).map(args => {

        var attr = args[0];
        var cssPropty = myStore.cssAttrParse(attr);

        if (stylesObj[selector] == undefined) {
          stylesObj[selector] = {};
        }

        if (stylesObj[selector][cssPropty] == undefined) {
          stylesObj[selector][cssPropty] = {};
        }

        stylesObj[selector][cssPropty] = args[1]
      })


      var cssItems = { ...blockCssY.items };
      var cssItemsX = { ...cssItems, ...stylesObj }

      setAttributes({ blockCssY: { items: cssItemsX } });
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

      console.log(iconHtml);


      setIconHtml(iconHtml);




    }, [icon]);






    const [
      currentPostUrl,
      setCurrentPostUrl,
    ] = useEntityProp('postType', postType, 'link', postId);


    useEffect(() => {

      setAttributes({ blockId: blockIdX });

      // setAttributes({ archiveTitle: archiveTitle });
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

    // Wrapper CSS Class Selectors
    const wrapperSelector = blockClass;


    var archiveTitleSelector = '';


    if (wrapper.options.tag.length != 0) {

      if (archiveTitle.options.linkTo.length > 0) {
        archiveTitleSelector = blockClass + ' a';
      } else {
        archiveTitleSelector = blockClass;
        //archiveTitleSelector = blockClass + ' .archiveTitle';

      }

    } else {
      archiveTitleSelector = blockClass;

    }







    const prefixSelector = blockClass + ' .prefix';
    const postfixSelector = blockClass + ' .postfix';
    const iconSelector = blockClass + ' .postdate-icon';




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











    var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.



    useEffect(() => {


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);


    useEffect(() => {


      setAttributes({ customCss: customCss });



      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);



    useEffect(() => {
      linkAttrObj();

    }, [archiveTitle]);






    var linkAttrObj = () => {

      var sdsd = {};

      archiveTitle.options.linkAttr.map(x => {

        if (x.val)
          sdsd[x.id] = x.val;

      })

      setlinkAttrItems(sdsd);

    }






    var postUrl = (archiveTitle.options.customUrl != undefined && archiveTitle.options.customUrl.length > 0) ? archiveTitle.options.customUrl : currentPostUrl;


    const CustomTag = `${wrapper.options.tag}`;
    const CustomTagPostTitle = `${archiveTitle.options.tag}`;








    const blockProps = useBlockProps({
      className: ` ${blockId} pg-archive-title`,

    });




    return (
      <>
        <InspectorControls >
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
                        { label: 'SPAN', value: 'span' },
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
                  <PGStyles obj={wrapper} onChange={onChangeStyleWrapper} onAdd={onAddStyleWrapper} onRemove={onRemoveStyleWrapper} onBulkAdd={onBulkAddWrapper} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={wrapper} onChange={onPickCssLibraryWrapper} />
                </PGtab>
              </PGtabs>

            </PanelBody>

            <PanelBody title="Archive Title" initialOpen={false}>



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

                  <PanelRow className='mb-4'>
                    <label for="">Archive Type</label>
                    <PGDropdown position="bottom right" variant="secondary" options={archiveTypes} buttonTitle="Choose" onChange={(option, index) => {

                      var options = { ...archiveTitle.options, archiveType: option.value };
                      setAttributes({ archiveTitle: { ...archiveTitle, options: options } });

                    }} values={''}></PGDropdown>
                  </PanelRow>

                  <div className='bg-gray-500 text-white p-3 py-2'>{archiveTypes[archiveTitle.options.archiveType].label}</div>



                  <PanelRow className='mb-4'>
                    <label for="">Custom Label</label>
                    <InputControl
                      className='mr-2'
                      value={archiveTitle.options.customLabel}
                      onChange={(newVal) => {


                        var options = { ...archiveTitle.options, customLabel: newVal };
                        setAttributes({ archiveTitle: { ...archiveTitle, options: options } });

                      }}
                    />
                  </PanelRow>


                  {(archiveTitle.options.archiveType == 'year' || archiveTitle.options.archiveType == 'month' || archiveTitle.options.archiveType == 'day') && (

                    <>
                      <PanelRow className='mb-4'>
                        <label for="">Date Format</label>
                        <PGDropdown position="bottom right" variant="secondary" options={dateFormats} buttonTitle="Choose" onChange={(option, index) => {

                          var options = { ...archiveTitle.options, dateFormat: option.value };
                          setAttributes({ archiveTitle: { ...archiveTitle, options: options } });

                        }} values={''}></PGDropdown>
                      </PanelRow>
                      <PanelRow className='mb-4'>
                        <label for="">Custom Format</label>
                        <InputControl
                          className='mr-2'
                          value={archiveTitle.options.dateFormat}
                          onChange={(newVal) => {



                            var options = { ...archiveTitle.options, dateFormat: newVal };
                            setAttributes({ archiveTitle: { ...archiveTitle, options: options } });

                          }}
                        />
                      </PanelRow>


                      {dateFormats[archiveTitle.options.dateFormat] != undefined && (
                        <div className='p-2 my-3 bg-gray-500 text-white'>{dateFormats[archiveTitle.options.dateFormat].label}</div>

                      )}
                    </>



                  )}




                  <PanelRow>
                    <label for="">Link To</label>

                    <PGDropdown position="bottom right" variant="secondary" options={archiveLinkToArgs} buttonTitle={archiveTitle.options.linkTo.length == 0 ? 'Choose' : archiveLinkToArgs[archiveTitle.options.linkTo].label} onChange={setFieldLinkTo} values={[]}></PGDropdown>



                  </PanelRow>





                  {archiveTitle.options.linkTo == 'customUrl' && (

                    <PanelRow>
                      <label for="">Custom URL</label>

                      <div className='relative'>
                        <Button className={(linkPickerPosttitle) ? "!bg-gray-400" : ''} icon={link} onClick={ev => {

                          setLinkPickerPosttitle(prev => !prev);

                        }}></Button>
                        {archiveTitle.options.customUrl.length > 0 && (
                          <Button className='!text-red-500 ml-2' icon={linkOff} onClick={ev => {

                            var options = { ...archiveTitle.options, customUrl: '' };
                            setAttributes({ archiveTitle: { ...archiveTitle, options: options } });
                            setLinkPickerPosttitle(false);

                          }}></Button>

                        )}
                        {linkPickerPosttitle && (
                          <Popover position="bottom right">
                            <LinkControl settings={[]} value={archiveTitle.options.customUrl} onChange={newVal => {

                              var options = { ...archiveTitle.options, customUrl: newVal.url };

                              setAttributes({ archiveTitle: { ...archiveTitle, options: options } });

                            }} />

                            <div className='p-2'><span className='font-bold'>Linked to:</span> {(archiveTitle.options.customUrl.length != 0) ? archiveTitle.options.customUrl : 'No link'} </div>
                          </Popover>

                        )}


                      </div>
                    </PanelRow>

                  )}



                  {archiveTitle.options.linkTo.length == 0 && (

                    <PanelRow>
                      <label for="">Custom Tag</label>
                      <SelectControl
                        label=""
                        value={archiveTitle.options.tag}
                        options={[
                          { label: 'Choose', value: '' },
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
                          var options = { ...archiveTitle.options, tag: newVal };
                          setAttributes({ archiveTitle: { ...archiveTitle, options: options } });
                        }

                        }
                      />
                    </PanelRow>
                  )}




                  {archiveTitle.options.linkTo.length > 0 && (

                    <div>
                      <PanelRow>
                        <label for="">Link Target</label>

                        <SelectControl
                          label=""
                          value={archiveTitle.options.linkTarget}
                          options={[
                            { label: 'Choose...', value: '' },

                            { label: '_self', value: '_self' },
                            { label: '_blank', value: '_blank' },
                            { label: '_parent', value: '_parent' },
                            { label: '_top', value: '_top' },


                          ]}
                          onChange={(newVal) => {



                            var options = { ...archiveTitle.options, linkTarget: newVal };
                            setAttributes({ archiveTitle: { ...archiveTitle, options: options } });



                          }



                          }
                        />
                      </PanelRow>

                      <PanelRow>
                        <label for="">Custom Attributes</label>
                        <div
                          className=' cursor-pointer px-3 text-white py-1 bg-blue-600'

                          onClick={(ev) => {

                            var sdsd = archiveTitle.options.linkAttr.concat({ id: '', val: '' })


                            var options = { ...archiveTitle.options, linkAttr: sdsd };
                            setAttributes({ archiveTitle: { ...archiveTitle, options: options } });

                            linkAttrObj()
                          }}

                        >Add</div>



                      </PanelRow>



                      {
                        archiveTitle.options.linkAttr.map((x, i) => {

                          return (

                            <div className='my-2'>
                              <PanelRow>
                                <InputControl
                                  className='mr-2'
                                  placeholder="Name"
                                  value={archiveTitle.options.linkAttr[i].id}
                                  onChange={(newVal) => {

                                    archiveTitle.options.linkAttr[i].id = newVal;


                                    var ssdsd = archiveTitle.options.linkAttr.concat([]);



                                    var options = { ...archiveTitle.options, linkAttr: ssdsd };
                                    setAttributes({ archiveTitle: { ...archiveTitle, options: options } });

                                  }}
                                />

                                <InputControl
                                  className='mr-2'
                                  placeholder="Value"
                                  value={x.val}
                                  onChange={(newVal) => {
                                    archiveTitle.options.linkAttr[i].val = newVal
                                    var ssdsd = archiveTitle.options.linkAttr.concat([]);



                                    var options = { ...archiveTitle.options, linkAttr: ssdsd };
                                    setAttributes({ archiveTitle: { ...archiveTitle, options: options } });

                                  }}
                                />
                                <span className='text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close'
                                  onClick={(ev) => {

                                    archiveTitle.options.linkAttr.splice(i, 1);

                                    var ssdsd = archiveTitle.options.linkAttr.concat([]);


                                    var options = { ...archiveTitle.options, linkAttr: ssdsd };
                                    setAttributes({ archiveTitle: { ...archiveTitle, options: options } });
                                  }}

                                ></span>
                              </PanelRow>




                            </div>

                          )

                        })
                      }


                    </div>



                  )}





                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={archiveTitle} onChange={onChangeStyleArchiveTitle} onAdd={onAddStyleArchiveTitle} onRemove={onRemoveStyleArchiveTitle} onBulkAdd={onBulkAddArchiveTitle} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={archiveTitle} onChange={onPickCssLibraryArchiveTitle} />
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
                    <label for="">Icon position</label>

                    <SelectControl
                      label=""
                      value={icon.options.position}
                      options={[

                        { label: 'Choose Position', value: '' },

                        { label: 'Before Archive Title', value: 'beforeArchiveTitle' },
                        { label: 'After Archive Title', value: 'afterArchiveTitle' },
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
                  <PGStyles obj={icon} onChange={onChangeStyleIcon} onAdd={onAddStyleIcon} onRemove={onRemoveStyleIcon} onBulkAdd={onBulkAddIcon} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={icon} onChange={onPickCssLibraryIcon} />
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



                        // setAttributes({ prefix: { text: newVal, class: prefix.options.class, color: prefix.color, backgroundColor: prefix.backgroundColor } })
                      }
                      }
                    />
                  </PanelRow>
                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={prefix} onChange={onChangeStylePrefix} onAdd={onAddStylePrefix} onRemove={onRemoveStylePrefix} onBulkAdd={onBulkAddPrefix} />
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


                        // setAttributes({ postfix: { text: newVal, class: prefix.options.class, color: postfix.color, backgroundColor: postfix.backgroundColor } })
                      }

                      }
                    />
                  </PanelRow>
                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={postfix} onChange={onChangeStylePostfix} onAdd={onAddStylePostfix} onRemove={onRemoveStylePostfix} onBulkAdd={onBulkAddPostfix} />
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
                <p><code>{archiveTitleSelector}{'{/* your CSS here*/}'} </code></p>
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

            <div className='px-3'>
              <PGMailSubsctibe />
              <PGContactSupport utm={{ utm_source: 'BlockPostTitle', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />

            </div>

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

              {archiveTitle.options.linkTo.length > 0 && (
                <a className='archiveTitle' onClick={handleLinkClick}  {...linkAttrItems} target={archiveTitle.options.linkTarget} href={postUrl}>

                  {icon.options.position == 'beforeArchiveTitle' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                  {archiveTitleEdited}
                  {icon.options.position == 'afterArchiveTitle' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                </a>
              )}


              {archiveTitle.options.linkTo.length == 0 && (
                <>
                  {icon.options.position == 'beforeArchiveTitle' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}

                  {archiveTitleEdited}

                  {icon.options.position == 'afterArchiveTitle' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                </>
              )}

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

          {wrapper.options.tag.length == 0 && (

            <>


              {icon.options.position == 'beforePostfix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}
              {prefix.options.text && (
                <span className={prefix.options.class}>{prefix.options.text}</span>
              )}

              {icon.options.position == 'beforePostfix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}

              {archiveTitle.options.linkTo.length > 0 && (
                <a className='archiveTitle' onClick={handleLinkClick}  {...linkAttrItems} target={archiveTitle.options.linkTarget} href={postUrl}>A

                  {icon.options.position == 'beforeArchiveTitle' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}

                  {archiveTitleEdited}

                  {icon.options.position == 'afterArchiveTitle' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                </a>
              )}


              {archiveTitle.options.linkTo.length == 0 && (

                <div {...blockProps}>

                  {icon.options.position == 'beforeArchiveTitle' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                  {archiveTitleEdited}
                  {icon.options.position == 'afterArchiveTitle' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                </div>



              )}

            </>
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

