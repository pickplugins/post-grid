import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover, Spinner } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';
import { InnerBlocks, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"
import { Icon, styles, settings, link, linkOff } from "@wordpress/icons";


import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor'
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



import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'
import PGCssLibrary from '../../components/css-library'
import PGIconPicker from '../../components/icon-picker'



var myStore = wp.data.select('postgrid-shop');





registerBlockType("post-grid/accordion-nested", {
  apiVersion: 2,
  title: "Accordion Nested",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><rect fill="#fff" y="6.2" width="36" height="4.21" /><path fill="#C5C5C5" d="M4,8.87a.14.14,0,0,1-.1,0L3.13,8a.12.12,0,0,1,0-.17.12.12,0,0,1,.17,0L4,8.55l.64-.75a.13.13,0,0,1,.18,0A.12.12,0,0,1,4.8,8l-.74.86A.12.12,0,0,1,4,8.87Z" /><rect fill="#C5C5C5" x="6.07" y="7.76" width="17.44" height="1.11" /><rect fill="#C5C5C5" y="16.16" width="36" height="8.66" /><rect fill="#C5C5C5" y="11.18" width="36" height="4.21" /><path fill="#fff" d="M4,12.73a.12.12,0,0,1,.09,0l.74.86a.12.12,0,0,1,0,.17.13.13,0,0,1-.18,0L4,13.05l-.65.75a.12.12,0,0,1-.17,0,.12.12,0,0,1,0-.17l.74-.86A.14.14,0,0,1,4,12.73Z" /><rect fill="#fff" x="6.07" y="12.73" width="17.44" height="1.11" /><rect fill="#fff" y="25.58" width="36" height="4.21" /><path fill="#C5C5C5" d="M4,28.24a.13.13,0,0,1-.1,0l-.74-.86a.14.14,0,0,1,0-.18.12.12,0,0,1,.17,0l.65.75.64-.75a.12.12,0,1,1,.19.16l-.74.86A.11.11,0,0,1,4,28.24Z" /><rect fill="#C5C5C5" x="6.07" y="27.13" width="17.44" height="1.11" /></svg>


    ,
  },


  attributes: {


    wrapper: {
      type: 'object',
      default: {
        options: {
          content: '',
          tag: 'div',
          class: '',
        },

        styles:
        {
          color: { Desktop: '' },

          display: {},
          position: {},
          overflow: {},
        },
      },
    },


    searchWrap: {
      type: 'object',
      default: {
        options: {
          enable: false,
          contentSrc: ['content', 'label'],
          tag: 'div',
          class: 'accordion-search-wrap',
        },
        styles:
        {
          backgroundColor: { Desktop: '' },
          color: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },

        },
      },
    },

    searchInput: {
      type: 'object',
      default: {
        options: {
          tag: 'input',
          type: 'text',
          value: '',

          placeholder: 'Search here...',
          class: 'accordion-search-input',
        },
        styles:
        {
          backgroundColor: { Desktop: '' },
          color: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },

        },
      },
    },



    content: {
      type: 'object',
      default: {
        options: {
          tag: 'div',
          class: 'accordion-content',
        },

        styles:
        {

        },
      },
    },
    header: {
      type: 'object',
      default: {
        options: {
          tag: 'div',
          class: 'accordion-header',
        },

        styles:
        {

        },
      },
    },


    headerLabel: {
      type: 'object',
      default: {
        options: {
          text: 'Accordion Header',
          tag: 'div',
          class: 'accordion-header-label',
        },

        styles:
        {


        },
      },
    },


    labelCounter: {
      type: 'object',
      default: {
        options: {
          enable: false,

          tag: 'div',
          class: 'label-counter',
        },

        styles:
        {


        },
      },
    },

    labelIcon: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-angle-down', position: 'left', /*left, right, before, after */ class: 'accordion-icon', },

        styles:
        {

        },
      },
    },

    icon: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-angle-down', position: 'left', /*left, right, before, after */ class: 'accordion-icon', },

        styles:
        {

        },
      },
    },
    iconToggle: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-angle-up', class: 'accordion-icon-toggle', },

        styles:
        {

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

    var wrapper = attributes.wrapper;
    var header = attributes.header;
    var headerLabel = attributes.headerLabel;
    var labelIcon = attributes.labelIcon;
    var labelCounter = attributes.labelCounter;

    var searchWrap = attributes.searchWrap;
    var searchInput = attributes.searchInput;


    var content = attributes.content;
    var icon = attributes.icon;
    var iconToggle = attributes.iconToggle;

    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    var postId = context['postId'];
    var postType = context['postType'];

    //const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    var breakPointX = myStore.getBreakPoint();



    // Wrapper CSS Class Selectors
    var wrapperSelector = blockClass;
    const contentSelector = blockClass + ' .accordion-content';
    const headerSelector = blockClass + ' .accordion-header';
    const headerLabelSelector = blockClass + ' .accordion-header-label';
    const labelIconSelector = blockClass + ' .accordion-label-icon';
    const labelCounterSelector = blockClass + ' .accordion-label-counter';

    const searchWrapSelector = blockClass + '-accordion-search-wrap';
    const searchInputSelector = blockClass + '-accordion-search-input';


    const iconSelector = blockClass + ' .accordion-icon';
    const iconToggleSelector = blockClass + ' .accordion-icon-toggle';



    useEffect(() => {

      setAttributes({ blockId: blockIdX });
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [clientId]);


    useEffect(() => {

      setAttributes({ customCss: customCss });

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);



    useEffect(() => {

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);












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


    function onChangeStyleHeader(sudoScource, newVal, attr) {


      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, header);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ header: object });

      var elementSelector = myStore.getElementSelector(sudoScource, headerSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)




      setAttributes({ blockCssY: { items: cssItems } });

    }






    function onRemoveStyleHeader(sudoScource, key) {


      var object = myStore.deletePropertyDeep(header, [sudoScource, key, breakPointX]);
      setAttributes({ header: object });


      var elementSelector = myStore.getElementSelector(sudoScource, headerSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });

    }





    function onAddStyleHeader(sudoScource, key) {
      var path = [sudoScource, key, breakPointX]

      console.log(path);


      let obj = Object.assign({}, header);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ header: object });

    }


    function onPickCssLibraryHeader(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        header[sudoScource] = sudoScourceArgs;
      })

      var headerX = Object.assign({}, header);
      setAttributes({ header: headerX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, headerSelector);


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


    function onChangeStyleHeaderLabel(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, headerLabel);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ headerLabel: object });

      var elementSelector = myStore.getElementSelector(sudoScource, headerLabelSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }






    function onRemoveStyleHeaderLabel(sudoScource, key) {


      var object = myStore.deletePropertyDeep(headerLabel, [sudoScource, key, breakPointX]);
      setAttributes({ headerLabel: object });


      var elementSelector = myStore.getElementSelector(sudoScource, headerLabelSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });

    }





    function onAddStyleHeaderLabel(sudoScource, key) {
      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, headerLabel);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ headerLabel: object });

    }


    function onPickCssLibraryHeaderLabel(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        headerLabel[sudoScource] = sudoScourceArgs;
      })

      var headerLabelX = Object.assign({}, headerLabel);
      setAttributes({ headerLabel: headerLabelX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, headerLabelSelector);


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


    function onChangeStyleLabelCounter(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, labelCounter);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ labelCounter: object });

      var elementSelector = myStore.getElementSelector(sudoScource, labelCounterSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }

    function onRemoveStyleLabelCounter(sudoScource, key) {


      var object = myStore.deletePropertyDeep(labelCounter, [sudoScource, key, breakPointX]);
      setAttributes({ labelCounter: object });


      var elementSelector = myStore.getElementSelector(sudoScource, labelCounterSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });

    }

    function onAddStyleLabelCounter(sudoScource, key) {
      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, labelCounter);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ labelCounter: object });

    }


    function onPickCssLibraryLabelCounter(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        labelCounter[sudoScource] = sudoScourceArgs;
      })

      var labelCounterX = Object.assign({}, labelCounter);
      setAttributes({ labelCounter: labelCounterX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, labelCounterSelector);


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





    function onChangeStyleContent(sudoScource, newVal, attr) {


      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, content);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ content: object });




      var elementSelector = myStore.getElementSelector(sudoScource, contentSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }






    function onRemoveStyleContent(sudoScource, key) {


      var object = myStore.deletePropertyDeep(content, [sudoScource, key, breakPointX]);
      setAttributes({ content: object });


      var elementSelector = myStore.getElementSelector(sudoScource, contentSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }





    function onAddStyleContent(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, content);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ content: object });
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





    function onChangeStyleIconToggle(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, iconToggle);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ iconToggle: object });

      var elementSelector = myStore.getElementSelector(sudoScource, iconToggleSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }






    function onRemoveStyleIconToggle(sudoScource, key) {


      var object = myStore.deletePropertyDeep(iconToggle, [sudoScource, key, breakPointX]);
      setAttributes({ iconToggle: object });


      var elementSelector = myStore.getElementSelector(sudoScource, iconToggleSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });
    }


    function onAddStyleIconToggle(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, iconToggle);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ iconToggle: object });
    }


    function onPickCssLibraryIconToggle(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        iconToggle[sudoScource] = sudoScourceArgs;
      })

      var iconToggleX = Object.assign({}, iconToggle);
      setAttributes({ iconToggle: iconToggleX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, iconToggleSelector);


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






















    function onPickCssLibraryContent(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        content[sudoScource] = sudoScourceArgs;
      })

      var contentX = Object.assign({}, content);
      setAttributes({ content: contentX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, contentSelector);


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






    function onChangeStyleSearchWrap(sudoScource, newVal, attr) {


      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, searchWrap);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ searchWrap: object });




      var elementSelector = myStore.getElementSelector(sudoScource, searchWrapSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }






    function onRemoveStyleSearchWrap(sudoScource, key) {


      var object = myStore.deletePropertyDeep(searchWrap, [sudoScource, key, breakPointX]);
      setAttributes({ searchWrap: object });


      var elementSelector = myStore.getElementSelector(sudoScource, searchWrapSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }





    function onAddStyleSearchWrap(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, searchWrap);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ searchWrap: object });
    }





    function onChangeStyleSearchInput(sudoScource, newVal, attr) {


      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, searchInput);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ searchInput: object });




      var elementSelector = myStore.getElementSelector(sudoScource, searchInputSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }






    function onRemoveStyleSearchInput(sudoScource, key) {


      var object = myStore.deletePropertyDeep(searchInput, [sudoScource, key, breakPointX]);
      setAttributes({ searchInput: object });


      var elementSelector = myStore.getElementSelector(sudoScource, searchInputSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }





    function onAddStyleSearchInput(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, searchInput);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ searchInput: object });
    }






















    const ALLOWED_BLOCKS = ['post-grid/accordion-nested-item'];

    const MY_TEMPLATE = [
      ['post-grid/accordion-nested-item', {}],
      ['post-grid/accordion-nested-item', {}],

    ];


    const blockProps = useBlockProps({
      className: ` ${blockId} pg-accordion-nested`,
    });


    const innerBlocksProps = useInnerBlocksProps(blockProps, {
      allowedBlocks: ALLOWED_BLOCKS,
      __experimentalDirectInsert: true,
      template: MY_TEMPLATE,
      templateInsertUpdatesSelection: true,
    });

    var childBlocks = select('core/block-editor').getBlocksByClientId(clientId)[0].innerBlocks;

    var count = 0;

    childBlocks.forEach(function (childBlock) {
      count++;
      var childClientId = childBlock.clientId;
      var childAttributes = childBlock.attributes;
      childAttributes.count = count;

      dispatch('core/block-editor').updateBlockAttributes(childClientId, childAttributes);


    });


    return (

      <>

        <InspectorControls >
          <div className='px-3' >



            <PanelBody title="Pre-Sets" initialOpen={true}>

              <label for="">Header Position</label>

              <div className='grid grid-cols-2 gap-2 my-4'>
                <div className='bg-[#5655ff] p-2 cursor-pointer' onClick={ev => {



                  var headerstyles = { ...header.styles, "justifyContent": { "Desktop": "start" }, "backgroundColor": { "Desktop": "#18978F" }, "color": { "Desktop": "#ffffff" }, "padding": { "Desktop": "10px 10px 10px 10px" }, "margin": { "Desktop": "0px 0px 1px 0px" }, "display": { "Desktop": "flex" }, "alignItems": { "Desktop": "center" } };

                  setAttributes({ header: { ...header, styles: headerstyles } });



                  var headerstylesObj = {};

                  Object.entries(headerstyles).map(x => {

                    var attr = x[0];
                    var cssPropty = myStore.cssAttrParse(attr);
                    headerstylesObj[cssPropty] = x[1]


                  })

                  var elementSelector = myStore.getElementSelector('styles', headerSelector);
                  var items = { ...blockCssY.items };
                  items[elementSelector] = headerstylesObj;

                  setAttributes({ blockCssY: { items: items } });


                  var options = { ...icon.options, position: "left" };
                  setAttributes({ icon: { ...icon, options: options } });


                  var childBlocks = select('core/block-editor').getBlocksByClientId(clientId)[0].innerBlocks

                  childBlocks.map(childBlock => {

                    var childClientId = childBlock.clientId;
                    var childAttributes = childBlock.attributes;

                    childAttributes.icon.options.position = 'left';

                    dispatch('core/block-editor').updateBlockAttributes(childClientId, childAttributes)
                    wp.data.dispatch('core/block-editor').selectBlock(childClientId)

                  })
                  wp.data.dispatch('core/block-editor').selectBlock(clientId)






                }}>

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 236"><rect fill="#3c3c3b" width="360" height="42.15" /><path fill="#ffffff" d="M27.66,26.62a1.22,1.22,0,0,1-.93-.43l-7.39-8.63A1.23,1.23,0,0,1,21.21,16l6.45,7.54L34.12,16A1.23,1.23,0,0,1,36,17.56L28.6,26.19A1.24,1.24,0,0,1,27.66,26.62Z" /><rect fill="#ffffff" x="48.66" y="15.53" width="174.4" height="11.09" /><rect fill="#ffffff" y="99.56" width="360" height="86.66" /><rect fill="#ffffff" y="49.78" width="360" height="42.15" /><path fill="#3c3c3b" d="M27.66,65.31a1.26,1.26,0,0,1,.94.43L36,74.37A1.23,1.23,0,1,1,34.12,76l-6.46-7.53L21.21,76a1.23,1.23,0,1,1-1.87-1.6l7.39-8.63A1.22,1.22,0,0,1,27.66,65.31Z" /><rect fill="#3c3c3b" x="48.66" y="65.31" width="174.4" height="11.09" /><rect fill="#3c3c3b" y="193.85" width="360" height="42.15" /><path fill="#ffffff" d="M27.66,220.47a1.22,1.22,0,0,1-.93-.43l-7.39-8.63a1.23,1.23,0,1,1,1.87-1.6l6.45,7.53,6.46-7.53a1.23,1.23,0,1,1,1.87,1.6L28.6,220A1.24,1.24,0,0,1,27.66,220.47Z" /><rect fill="#ffffff" x="48.66" y="209.38" width="174.4" height="11.09" /></svg>
                </div>


                <div className='bg-[#5655ff] p-2 cursor-pointer' onClick={ev => {



                  var headerstyles = { ...header.styles, "justifyContent": { "Desktop": "center" }, "display": { "Desktop": "flex" }, "alignItems": { "Desktop": "center" } };

                  setAttributes({ header: { ...header, styles: headerstyles } });



                  var headerstylesObj = {};

                  Object.entries(headerstyles).map(x => {

                    var attr = x[0];
                    var cssPropty = myStore.cssAttrParse(attr);
                    headerstylesObj[cssPropty] = x[1]


                  })

                  var elementSelector = myStore.getElementSelector('styles', headerSelector);
                  var items = { ...blockCssY.items };
                  items[elementSelector] = headerstylesObj;

                  setAttributes({ blockCssY: { items: items } });


                  var options = { ...icon.options, position: "left" };
                  setAttributes({ icon: { ...icon, options: options } });

                  var childBlocks = select('core/block-editor').getBlocksByClientId(clientId)[0].innerBlocks

                  childBlocks.map(childBlock => {

                    var childClientId = childBlock.clientId;
                    var childAttributes = childBlock.attributes;

                    childAttributes.icon.options.position = 'left';

                    dispatch('core/block-editor').updateBlockAttributes(childClientId, childAttributes)
                    wp.data.dispatch('core/block-editor').selectBlock(childClientId)

                  })
                  wp.data.dispatch('core/block-editor').selectBlock(clientId)





                }}>



                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 236"><rect fill="#3c3c3b" width="360" height="42.15" /><path fill="#ffffff" d="M86.61,26.62a1.22,1.22,0,0,1-.93-.43l-7.4-8.63A1.23,1.23,0,0,1,80.15,16l6.46,7.54L93.07,16a1.23,1.23,0,0,1,1.87,1.6l-7.39,8.63A1.26,1.26,0,0,1,86.61,26.62Z" /><rect fill="#ffffff" x="107.61" y="15.53" width="174.4" height="11.09" /><rect fill="#ffffff" y="99.56" width="360" height="86.66" /><rect fill="#ffffff" y="49.78" width="360" height="42.15" /><path fill="#3c3c3b" d="M86.61,65.31a1.26,1.26,0,0,1,.94.43l7.39,8.63A1.23,1.23,0,1,1,93.07,76l-6.46-7.53L80.15,76a1.22,1.22,0,0,1-1.73.14,1.24,1.24,0,0,1-.14-1.74l7.4-8.63A1.22,1.22,0,0,1,86.61,65.31Z" /><rect fill="#3c3c3b" x="107.61" y="65.31" width="174.4" height="11.09" /><rect fill="#3c3c3b" y="193.85" width="360" height="42.15" /><path fill="#ffffff" d="M86.61,220.47a1.22,1.22,0,0,1-.93-.43l-7.4-8.63a1.24,1.24,0,0,1,.14-1.74,1.22,1.22,0,0,1,1.73.14l6.46,7.53,6.46-7.53a1.23,1.23,0,1,1,1.87,1.6L87.55,220A1.26,1.26,0,0,1,86.61,220.47Z" /><rect fill="#ffffff" x="107.61" y="209.38" width="174.4" height="11.09" /></svg>

                </div>

                <div className='bg-[#5655ff] p-2 cursor-pointer' onClick={ev => {



                  var headerstyles = { ...header.styles, "justifyContent": { "Desktop": "end" }, "display": { "Desktop": "flex" }, "alignItems": { "Desktop": "center" } };

                  setAttributes({ header: { ...header, styles: headerstyles } });



                  var headerstylesObj = {};

                  Object.entries(headerstyles).map(x => {
                    var attr = x[0];
                    var cssPropty = myStore.cssAttrParse(attr);
                    headerstylesObj[cssPropty] = x[1]
                  })

                  var elementSelector = myStore.getElementSelector('styles', headerSelector);
                  var items = { ...blockCssY.items };
                  items[elementSelector] = headerstylesObj;

                  setAttributes({ blockCssY: { items: items } });


                  var options = { ...icon.options, position: "right" };
                  setAttributes({ icon: { ...icon, options: options } });

                  var childBlocks = select('core/block-editor').getBlocksByClientId(clientId)[0].innerBlocks

                  childBlocks.map(childBlock => {

                    var childClientId = childBlock.clientId;
                    var childAttributes = childBlock.attributes;

                    childAttributes.icon.options.position = 'right';

                    dispatch('core/block-editor').updateBlockAttributes(childClientId, childAttributes)
                    wp.data.dispatch('core/block-editor').selectBlock(childClientId)

                  })
                  wp.data.dispatch('core/block-editor').selectBlock(clientId)
                }}>


                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 236"><rect fill="#3c3c3b" width="360" height="42.15" transform="translate(360 42.15) rotate(-180)" /><path fill="#ffffff" d="M332.34,26.62a1.22,1.22,0,0,0,.93-.43l7.39-8.63a1.23,1.23,0,0,0-1.87-1.6l-6.45,7.54L325.88,16a1.23,1.23,0,0,0-1.87,1.6l7.39,8.63A1.24,1.24,0,0,0,332.34,26.62Z" /><rect fill="#ffffff" x="136.94" y="15.53" width="174.4" height="11.09" transform="translate(448.27 42.15) rotate(-180)" /><rect fill="#ffffff" y="99.56" width="360" height="86.66" transform="translate(360 285.78) rotate(-180)" /><rect fill="#ffffff" y="49.78" width="360" height="42.15" transform="translate(360 141.71) rotate(-180)" /><path fill="#3c3c3b" d="M332.34,65.31a1.26,1.26,0,0,0-.94.43L324,74.37a1.23,1.23,0,1,0,1.87,1.6l6.46-7.53L338.79,76a1.23,1.23,0,1,0,1.87-1.6l-7.39-8.63A1.22,1.22,0,0,0,332.34,65.31Z" /><rect fill="#3c3c3b" x="136.94" y="65.31" width="174.4" height="11.09" transform="translate(448.27 141.71) rotate(-180)" /><rect fill="#3c3c3b" y="193.85" width="360" height="42.15" transform="translate(360 429.85) rotate(-180)" /><path fill="#ffffff" d="M332.34,220.47a1.22,1.22,0,0,0,.93-.43l7.39-8.63a1.23,1.23,0,1,0-1.87-1.6l-6.45,7.53-6.46-7.53a1.23,1.23,0,1,0-1.87,1.6L331.4,220A1.24,1.24,0,0,0,332.34,220.47Z" /><rect fill="#ffffff" x="136.94" y="209.38" width="174.4" height="11.09" transform="translate(448.27 429.85) rotate(-180)" /></svg>

                </div>

              </div>


              <label for="">Icon Position</label>

              <div className='grid grid-cols-2 gap-3 my-4'>
                <div className='bg-[#5655ff] p-2 cursor-pointer' onClick={ev => {



                  var headerstyles = { ...header.styles, "justifyContent": { "Desktop": "start" }, "backgroundColor": { "Desktop": "#18978F" }, "color": { "Desktop": "#ffffff" }, "padding": { "Desktop": "10px 10px 10px 10px" }, "margin": { "Desktop": "0px 0px 1px 0px" }, "display": { "Desktop": "flex" }, "alignItems": { "Desktop": "center" } };

                  setAttributes({ header: { ...header, styles: headerstyles } });



                  var headerstylesObj = {};

                  Object.entries(headerstyles).map(x => {

                    var attr = x[0];
                    var cssPropty = myStore.cssAttrParse(attr);
                    headerstylesObj[cssPropty] = x[1]


                  })

                  var elementSelector = myStore.getElementSelector('styles', headerSelector);
                  var items = { ...blockCssY.items };
                  items[elementSelector] = headerstylesObj;

                  setAttributes({ blockCssY: { items: items } });


                  var options = { ...icon.options, position: "left" };
                  setAttributes({ icon: { ...icon, options: options } });


                  var childBlocks = select('core/block-editor').getBlocksByClientId(clientId)[0].innerBlocks

                  childBlocks.map(childBlock => {

                    var childClientId = childBlock.clientId;
                    var childAttributes = childBlock.attributes;

                    childAttributes.icon.options.position = 'left';

                    dispatch('core/block-editor').updateBlockAttributes(childClientId, childAttributes)
                    wp.data.dispatch('core/block-editor').selectBlock(childClientId)

                  })
                  wp.data.dispatch('core/block-editor').selectBlock(clientId)






                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 236"><rect fill="#3c3c3b" x="29.73" width="330.38" height="42.15" /><rect fill="#ffffff" x="29.73" y="99.56" width="330.38" height="86.66" /><rect fill="#ffffff" x="29.73" y="49.78" width="330.38" height="42.15" /><rect fill="#3c3c3b" x="29.73" y="193.85" width="330.38" height="42.15" /><path fill="#3c3c3b" d="M8.74,26.62a1.24,1.24,0,0,1-.94-.43L.41,17.56a1.21,1.21,0,0,1,.13-1.73A1.23,1.23,0,0,1,2.28,16L8.74,23.5,15.19,16a1.23,1.23,0,0,1,1.87,1.6L9.67,26.19A1.22,1.22,0,0,1,8.74,26.62Z" /><path fill="#ffffff" d="M8.74,65.31a1.24,1.24,0,0,1,.93.43l7.39,8.63A1.23,1.23,0,1,1,15.19,76L8.74,68.44,2.28,76a1.23,1.23,0,1,1-1.87-1.6L7.8,65.74A1.24,1.24,0,0,1,8.74,65.31Z" /><path fill="#3c3c3b" d="M8.74,220.47A1.24,1.24,0,0,1,7.8,220L.41,211.41a1.23,1.23,0,1,1,1.87-1.6l6.46,7.53,6.45-7.53a1.23,1.23,0,1,1,1.87,1.6L9.67,220A1.22,1.22,0,0,1,8.74,220.47Z" /><rect fill="#ffffff" x="52.54" y="15.53" width="174.4" height="11.09" /><rect fill="#3c3c3b" x="52.54" y="65.31" width="174.4" height="11.09" /><rect fill="#ffffff" x="52.54" y="209.38" width="174.4" height="11.09" /></svg>
                </div>
                <div className='bg-[#5655ff] p-2 cursor-pointer'>

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 236"><rect fill="#3c3c3b" width="330.38" height="42.15" /><rect fill="#ffffff" y="99.56" width="330.38" height="86.66" /><rect fill="#ffffff" y="49.78" width="330.38" height="42.15" /><rect fill="#3c3c3b" y="193.85" width="330.38" height="42.15" /><path fill="#3c3c3b" d="M351.38,26.62a1.24,1.24,0,0,1-.94-.43l-7.39-8.63a1.23,1.23,0,0,1,1.87-1.6l6.46,7.54L357.83,16a1.23,1.23,0,0,1,1.87,1.6l-7.39,8.63A1.22,1.22,0,0,1,351.38,26.62Z" /><path fill="#ffffff" d="M351.38,65.31a1.24,1.24,0,0,1,.93.43l7.39,8.63a1.23,1.23,0,1,1-1.87,1.6l-6.45-7.53L344.92,76a1.23,1.23,0,1,1-1.87-1.6l7.39-8.63A1.24,1.24,0,0,1,351.38,65.31Z" /><path fill="#3c3c3b" d="M351.38,220.47a1.24,1.24,0,0,1-.94-.43l-7.39-8.63a1.23,1.23,0,1,1,1.87-1.6l6.46,7.53,6.45-7.53a1.23,1.23,0,1,1,1.87,1.6L352.31,220A1.22,1.22,0,0,1,351.38,220.47Z" /><rect fill="#ffffff" x="129.16" y="15.53" width="174.4" height="11.09" /><rect fill="#3c3c3b" x="129.16" y="65.31" width="174.4" height="11.09" /><rect fill="#ffffff" x="129.16" y="209.38" width="174.4" height="11.09" /></svg>


                </div>

              </div>


              <label for="">Counter Position</label>

              <div className='grid grid-cols-2 gap-3 my-4'>

                <div className='bg-[#5655ff] p-2 cursor-pointer'>

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 236"><rect fill="#3c3c3b" x="0.11" width="360" height="42.15" /><rect fill="#ffffff" x="0.11" y="99.56" width="360" height="86.66" /><rect fill="#ffffff" x="0.11" y="49.78" width="360" height="42.15" /><rect fill="#3c3c3b" x="0.11" y="193.85" width="360" height="42.15" /><rect fill="#ffffff" x="46.54" y="15.53" width="174.4" height="11.09" /><rect fill="#3c3c3b" x="46.54" y="65.31" width="174.4" height="11.09" /><rect fill="#ffffff" x="46.54" y="209.38" width="174.4" height="11.09" /><path fill="#ffffff" d="M17,18.65v-3l4.21-2.48h2.57V29H20.86V16.29Z" /><path fill="#3c3c3b" d="M19.21,76.4h6.34v2.5H15.18V76.57a29.76,29.76,0,0,0,4.9-4.32q2.07-2.3,2.07-4.14a2.5,2.5,0,0,0-.71-1.89,2.8,2.8,0,0,0-2-.68A6.05,6.05,0,0,0,15.54,67V64.2a6.74,6.74,0,0,1,2-1,7.65,7.65,0,0,1,2.38-.39,5.58,5.58,0,0,1,3.8,1.28,4.48,4.48,0,0,1,1.47,3.58C25.18,70.56,23.19,73.46,19.21,76.4Z" /><path fill="#ffffff" d="M16.06,210.47v-2.75a7.16,7.16,0,0,1,3.48-.9A5.86,5.86,0,0,1,23.46,208a3.89,3.89,0,0,1,1.42,3.11,3.7,3.7,0,0,1-2.5,3.74,3.78,3.78,0,0,1,2.11,1.27,3.69,3.69,0,0,1,.75,2.37,4.08,4.08,0,0,1-1.47,3.25A6.17,6.17,0,0,1,19.66,223a9.93,9.93,0,0,1-4.18-.8v-2.85a8.27,8.27,0,0,0,4,1,3.09,3.09,0,0,0,2.06-.62,2,2,0,0,0,.74-1.59c0-1.41-1.14-2.11-3.43-2.11h-.92v-2.46h.92a3.94,3.94,0,0,0,2.16-.55,1.77,1.77,0,0,0,.88-1.58c0-1.36-.84-2-2.5-2A6.24,6.24,0,0,0,16.06,210.47Z" /></svg>

                </div>


                <div className='bg-[#5655ff] p-2 cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 236"><rect fill="#3c3c3b" width="360" height="42.15" /><rect fill="#ffffff" y="99.56" width="360" height="86.66" /><rect fill="#ffffff" y="49.78" width="360" height="42.15" /><rect fill="#3c3c3b" y="193.85" width="360" height="42.15" /><rect fill="#ffffff" x="139.17" y="15.53" width="174.4" height="11.09" /><rect fill="#3c3c3b" x="139.17" y="65.31" width="174.4" height="11.09" /><rect fill="#ffffff" x="139.17" y="209.38" width="174.4" height="11.09" /><path fill="#ffffff" d="M336.36,18.65v-3l4.2-2.48h2.58V29h-2.89V16.29Z" /><path fill="#3c3c3b" d="M338.59,76.4h6.34v2.5H334.56V76.57a29.85,29.85,0,0,0,4.91-4.32,6.55,6.55,0,0,0,2.06-4.14,2.49,2.49,0,0,0-.7-1.89,2.8,2.8,0,0,0-2-.68,6,6,0,0,0-3.86,1.5V64.2a6.62,6.62,0,0,1,2-1,7.6,7.6,0,0,1,2.38-.39,5.6,5.6,0,0,1,3.8,1.28,4.48,4.48,0,0,1,1.47,3.58C344.57,70.56,342.58,73.46,338.59,76.4Z" /><path fill="#ffffff" d="M335.45,210.47v-2.75a7.15,7.15,0,0,1,3.47-.9,5.82,5.82,0,0,1,3.92,1.22,3.9,3.9,0,0,1,1.43,3.11,3.71,3.71,0,0,1-2.51,3.74,3.77,3.77,0,0,1,2.12,1.27,3.69,3.69,0,0,1,.75,2.37,4.08,4.08,0,0,1-1.47,3.25A6.18,6.18,0,0,1,339,223a9.91,9.91,0,0,1-4.17-.8v-2.85a8.27,8.27,0,0,0,4,1,3.06,3.06,0,0,0,2-.62,2,2,0,0,0,.74-1.59c0-1.41-1.14-2.11-3.42-2.11h-.92v-2.46h.92a3.94,3.94,0,0,0,2.16-.55,1.78,1.78,0,0,0,.87-1.58c0-1.36-.83-2-2.5-2A6.23,6.23,0,0,0,335.45,210.47Z" /></svg>
                </div>



                <div className='bg-[#5655ff] p-2 cursor-pointer'>

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 236"><rect class="cls-1" x="30.65" width="329.35" height="42.15" /><rect fill="#ffffff" x="56.55" y="15.53" width="172.07" height="11.09" /><rect fill="#ffffff" x="30.65" y="99.56" width="329.35" height="86.66" /><rect fill="#ffffff" x="30.65" y="49.78" width="329.35" height="42.15" /><rect class="cls-1" x="56.55" y="65.31" width="172.07" height="11.09" /><rect class="cls-1" x="30.65" y="193.85" width="329.35" height="42.15" /><rect fill="#ffffff" x="56.55" y="209.38" width="172.07" height="11.09" /><path class="cls-1" d="M1.77,18.65v-3l4.15-2.48H8.46V29H5.61V16.29Z" /><path fill="#ffffff" d="M4,76.32h6.25v2.5H0V76.49a29.67,29.67,0,0,0,4.84-4.32,6.61,6.61,0,0,0,2-4.14,2.49,2.49,0,0,0-.7-1.89,2.72,2.72,0,0,0-2-.68A5.91,5.91,0,0,0,.36,67V64.12a6.8,6.8,0,0,1,2-1,7.47,7.47,0,0,1,2.35-.39A5.45,5.45,0,0,1,8.42,64a4.51,4.51,0,0,1,1.45,3.58Q9.87,71.93,4,76.32Z" /><path class="cls-1" d="M.87,210.39v-2.75a7,7,0,0,1,3.43-.9A5.7,5.7,0,0,1,8.17,208a3.9,3.9,0,0,1,1.4,3.11,3.69,3.69,0,0,1-2.47,3.74,3.78,3.78,0,0,1,2.09,1.27,3.75,3.75,0,0,1,.74,2.37,4.09,4.09,0,0,1-1.45,3.25A6,6,0,0,1,4.42,223a9.67,9.67,0,0,1-4.12-.8V219.3a8.11,8.11,0,0,0,3.93,1,3,3,0,0,0,2-.62A2,2,0,0,0,7,218.11C7,216.7,5.86,216,3.61,216H2.7v-2.45h.91A3.88,3.88,0,0,0,5.74,213a1.8,1.8,0,0,0,.86-1.58c0-1.36-.82-2-2.47-2A6.13,6.13,0,0,0,.87,210.39Z" /></svg>
                </div>
                <div className='bg-[#5655ff] p-2 cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 236"><path fill="#3c3c3b" d="M351.43,18.57v-3l4.2-2.48h2.57V28.94h-2.89V16.21Z" /><path fill="#ffffff" d="M353.66,76.32H360v2.5H349.63V76.49a30.26,30.26,0,0,0,4.91-4.32A6.6,6.6,0,0,0,356.6,68a2.53,2.53,0,0,0-.7-1.89,2.8,2.8,0,0,0-2-.68A6.06,6.06,0,0,0,350,67V64.12a6.92,6.92,0,0,1,2-1,7.56,7.56,0,0,1,2.38-.39,5.6,5.6,0,0,1,3.8,1.28,4.49,4.49,0,0,1,1.47,3.58Q359.64,71.93,353.66,76.32Z" /><path fill="#3c3c3b" d="M350.52,210.39v-2.75a7.13,7.13,0,0,1,3.47-.9,5.84,5.84,0,0,1,3.92,1.22,3.89,3.89,0,0,1,1.42,3.11,3.69,3.69,0,0,1-2.5,3.74,3.8,3.8,0,0,1,2.11,1.27,3.64,3.64,0,0,1,.76,2.37,4.08,4.08,0,0,1-1.47,3.25,6.2,6.2,0,0,1-4.12,1.25,9.93,9.93,0,0,1-4.18-.8V219.3a8.31,8.31,0,0,0,4,1,3.08,3.08,0,0,0,2.05-.62,2,2,0,0,0,.74-1.59c0-1.41-1.14-2.11-3.43-2.11h-.92v-2.45h.92a4,4,0,0,0,2.17-.56,1.78,1.78,0,0,0,.87-1.58c0-1.36-.83-2-2.5-2A6.23,6.23,0,0,0,350.52,210.39Z" /><rect fill="#3c3c3b" width="333.82" height="42.15" /><rect fill="#ffffff" y="99.56" width="333.82" height="86.66" /><rect fill="#ffffff" y="49.78" width="333.82" height="42.15" /><rect fill="#3c3c3b" y="193.85" width="333.82" height="42.15" /><rect fill="#ffffff" x="124.2" y="15.45" width="174.4" height="11.09" /><rect fill="#3c3c3b" x="124.2" y="65.23" width="174.4" height="11.09" /><rect fill="#ffffff" x="124.2" y="209.3" width="174.4" height="11.09" /></svg>

                </div>




              </div>














            </PanelBody>


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
                        setAttributes({ wrapper: { ...wrapper, options: options } });

                      }

                      }
                    />
                  </PanelRow>


                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={wrapper} onChange={onChangeStyleWrapper} onAdd={onAddStyleWrapper} onRemove={onRemoveStyleWrapper} />
                </PGtab>
              </PGtabs>





            </PanelBody>

            <PanelBody title="Header" initialOpen={false}>


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
                      value={header.options.tag}
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

                        var options = { ...header.options, tag: newVal };
                        setAttributes({ header: { ...header, options: options } });

                      }

                      }
                    />
                  </PanelRow>


                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={header} onChange={onChangeStyleHeader} onAdd={onAddStyleHeader} onRemove={onRemoveStyleHeader} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={header} onChange={onPickCssLibraryHeader} />
                </PGtab>
              </PGtabs>




            </PanelBody>

            <PanelBody title="Header Label" initialOpen={false}>


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
                      value={headerLabel.options.tag}
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

                        var options = { ...headerLabel.options, tag: newVal };
                        setAttributes({ headerLabel: { ...headerLabel, options: options } });

                      }

                      }
                    />
                  </PanelRow>

                  <ToggleControl
                    label="Enable Header Counter?"
                    help={labelCounter.options.enable ? 'Header Counter Enabled' : 'Header Counter Disabled.'}
                    checked={labelCounter.options.enable ? true : false}
                    onChange={(e) => {



                      var options = { ...labelCounter.options, enable: labelCounter.options.enable ? false : true };
                      setAttributes({ labelCounter: { ...labelCounter, options: options } });



                    }}
                  />

                  <PanelRow>
                    <label for="">Choose Icon</label>

                    <PGIconPicker library={labelIcon.options.library} srcType={labelIcon.options.srcType} iconSrc={labelIcon.options.iconSrc} onChange={(arg) => {


                      var options = { ...labelIcon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
                      setAttributes({ labelIcon: { ...labelIcon, options: options } });

                      var childBlocks = select('core/block-editor').getBlocksByClientId(clientId)[0].innerBlocks;

                      childBlocks.map(childBlock => {

                        var childClientId = childBlock.clientId;
                        var childAttributes = childBlock.attributes;
                        childAttributes.labelIcon.options.srcType = arg.srcType;
                        childAttributes.labelIcon.options.library = arg.library;
                        childAttributes.labelIcon.options.iconSrc = arg.iconSrc;

                        dispatch('core/block-editor').updateBlockAttributes(childClientId, childAttributes)
                        wp.data.dispatch('core/block-editor').selectBlock(childClientId)
                      })

                      wp.data.dispatch('core/block-editor').selectBlock(clientId)

                    }} />
                  </PanelRow>

                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={headerLabel} onChange={onChangeStyleHeaderLabel} onAdd={onAddStyleHeaderLabel} onRemove={onRemoveStyleHeaderLabel} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={headerLabel} onChange={onPickCssLibraryHeaderLabel} />
                </PGtab>
              </PGtabs>
            </PanelBody>



            <PanelBody title="Label Counter" initialOpen={false}>


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

                  <ToggleControl
                    label="Enable Header Counter?"
                    help={labelCounter.options.enable ? 'Header Counter Enabled' : 'Header Counter Disabled.'}
                    checked={labelCounter.options.enable ? true : false}
                    onChange={(e) => {



                      var options = { ...labelCounter.options, enable: labelCounter.options.enable ? false : true };
                      setAttributes({ labelCounter: { ...labelCounter, options: options } });


                      var childBlocks = select('core/block-editor').getBlocksByClientId(clientId)[0].innerBlocks;

                      childBlocks.map(childBlock => {

                        var childClientId = childBlock.clientId;
                        var childAttributes = childBlock.attributes;
                        childAttributes.labelCounter.options.enable = labelCounter.options.enable ? true : false;

                        dispatch('core/block-editor').updateBlockAttributes(childClientId, childAttributes)
                        wp.data.dispatch('core/block-editor').selectBlock(childClientId)
                      })

                      wp.data.dispatch('core/block-editor').selectBlock(clientId)





                    }}
                  />
                  <PanelRow>
                    <label for="">Wrapper Tag</label>

                    <SelectControl
                      label=""
                      value={labelCounter.options.tag}
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

                        var options = { ...labelCounter.options, tag: newVal };
                        setAttributes({ labelCounter: { ...labelCounter, options: options } });







                      }

                      }
                    />
                  </PanelRow>



                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={labelCounter} onChange={onChangeStyleLabelCounter} onAdd={onAddStyleLabelCounter} onRemove={onRemoveStyleLabelCounter} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={labelCounter} onChange={onPickCssLibraryLabelCounter} />
                </PGtab>
              </PGtabs>
            </PanelBody>


            <PanelBody title="Content" initialOpen={false}>


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
                      value={content.options.tag}
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

                        var options = { ...content.options, tag: newVal };
                        setAttributes({ content: { ...content, options: options } });

                      }

                      }
                    />
                  </PanelRow>

                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={content} onChange={onChangeStyleContent} onAdd={onAddStyleContent} onRemove={onRemoveStyleContent} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={content} onChange={onPickCssLibraryContent} />
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

                    <PGIconPicker library={icon.options.library} srcType={icon.options.srcType} iconSrc={icon.options.iconSrc} onChange={(arg) => {


                      var options = { ...icon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
                      setAttributes({ icon: { ...icon, options: options } });

                      var childBlocks = select('core/block-editor').getBlocksByClientId(clientId)[0].innerBlocks;

                      childBlocks.map(childBlock => {

                        var childClientId = childBlock.clientId;
                        var childAttributes = childBlock.attributes;
                        childAttributes.icon.options.srcType = arg.srcType;
                        childAttributes.icon.options.library = arg.library;
                        childAttributes.icon.options.iconSrc = arg.iconSrc;

                        dispatch('core/block-editor').updateBlockAttributes(childClientId, childAttributes)
                        wp.data.dispatch('core/block-editor').selectBlock(childClientId)
                      })

                      wp.data.dispatch('core/block-editor').selectBlock(clientId)

                    }} />
                  </PanelRow>


                  <PanelRow>
                    <label for="">Choose Toggled Icon</label>

                    <PGIconPicker library={iconToggle.options.library} srcType={iconToggle.options.srcType} iconSrc={iconToggle.options.iconSrc} onChange={(arg) => {

                      var options = { ...iconToggle.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
                      setAttributes({ iconToggle: { ...iconToggle, options: options } });

                      var childBlocks = select('core/block-editor').getBlocksByClientId(clientId)[0].innerBlocks;

                      childBlocks.map(childBlock => {

                        var childClientId = childBlock.clientId;
                        var childAttributes = childBlock.attributes;
                        childAttributes.iconToggle.options.srcType = arg.srcType;
                        childAttributes.iconToggle.options.library = arg.library;
                        childAttributes.iconToggle.options.iconSrc = arg.iconSrc;

                        dispatch('core/block-editor').updateBlockAttributes(childClientId, childAttributes)
                        wp.data.dispatch('core/block-editor').selectBlock(childClientId)
                      })

                      wp.data.dispatch('core/block-editor').selectBlock(clientId)

                    }} />
                  </PanelRow>

                  <PanelRow>
                    <label for="">Icon position</label>

                    <SelectControl
                      label=""
                      value={icon.options.position}
                      options={[

                        { label: 'Choose Position', value: '' },

                        { label: 'Left', value: 'left' },
                        { label: 'Right', value: 'right' },


                      ]}
                      onChange={(newVal) => {


                        var options = { ...icon.options, position: newVal };
                        setAttributes({ icon: { ...icon, options: options } });

                        var childBlocks = select('core/block-editor').getBlocksByClientId(clientId)[0].innerBlocks

                        childBlocks.map(childBlock => {

                          var childClientId = childBlock.clientId;
                          var childAttributes = childBlock.attributes;

                          childAttributes.icon.options.position = newVal;

                          dispatch('core/block-editor').updateBlockAttributes(childClientId, childAttributes)
                          wp.data.dispatch('core/block-editor').selectBlock(childClientId)

                        })
                        wp.data.dispatch('core/block-editor').selectBlock(clientId)


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

            <PanelBody title="Search" initialOpen={false}>

              <ToggleControl
                label="Enable Search?"
                help={searchWrap.options.enable ? 'Search Enabled' : 'Search Disabled.'}
                checked={searchWrap.options.enable ? true : false}
                onChange={(e) => {

                  var options = { ...searchWrap.options, enable: searchWrap.options.enable ? false : true };
                  setAttributes({ searchWrap: { ...searchWrap, options: options } });


                }}
              />




              <PanelBody title="Search Wrap" initialOpen={false}>


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


                  </PGtab>
                  <PGtab name="styles">
                    <PGStyles obj={searchWrap} onChange={onChangeStyleSearchWrap} onAdd={onAddStyleSearchWrap} onRemove={onRemoveStyleSearchWrap} />
                  </PGtab>

                </PGtabs>

              </PanelBody>


              <PanelBody title="Search Input" initialOpen={false}>


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


                  </PGtab>
                  <PGtab name="styles">
                    <PGStyles obj={searchInput} onChange={onChangeStyleSearchInput} onAdd={onAddStyleSearchInput} onRemove={onRemoveStyleSearchInput} />
                  </PGtab>

                </PGtabs>

              </PanelBody>








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

        <>

          {searchWrap.options.enable && (
            <div className={`${blockId}-accordion-search-wrap`}>
              <input className={`${blockId}-accordion-search-input my-4`} type={searchInput.options.type} placeholder={searchInput.options.placeholder} value={searchInput.options.value} />
            </div>
          )}

          <div {...innerBlocksProps} />

        </>


      </>

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file

    var attributes = props.attributes;
    var wrapper = attributes.wrapper;

    var blockId = attributes.blockId;

    var blockIdX = attributes.blockId ? attributes.blockId : 'pg' + clientId.split('-').pop();
    var blockClass = '.' + blockIdX;

    const blockProps = useBlockProps.save({
      className: ` ${blockId} pg-accordions`,

    });
    const innerBlocksProps = useInnerBlocksProps.save(blockProps);


    return (
      <div {...innerBlocksProps} />




    );


    //return null;

  }
})