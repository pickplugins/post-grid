import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover, Spinner } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';
import { InnerBlocks, useBlockProps, useInnerBlocksProps, store as blockEditorStore, } from "@wordpress/block-editor"
import { Icon, styles, settings, link, linkOff, plus } from "@wordpress/icons";
import { applyFilters } from '@wordpress/hooks';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';

import { createBlock } from '@wordpress/blocks';

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
import PGIconPicker from '../../components/icon-picker'



import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'
import PGCssLibrary from '../../components/css-library'
import variations from './variations'



var myStore = wp.data.select('postgrid-shop');



registerBlockType("post-grid/steps-wrap", {
  apiVersion: 2,
  title: "Steps Wrap",
  parent: ['post-grid/form-wrap'],

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><rect fill="#1d4ed8" y="10.75" width="10.72" height="3.64" /><path fill="#8db1ff" d="M1.94,12.09a.12.12,0,0,1,.08,0l.64.75a.11.11,0,1,1-.17.13l-.55-.65L1.38,13a.11.11,0,0,1-.15,0,.1.1,0,0,1,0-.15l.64-.75A.12.12,0,0,1,1.94,12.09Z" /><rect fill="#8db1ff" x="3.46" y="12.09" width="5.71" height="0.96" /><rect fill="#8db1ff" x="12.64" y="10.75" width="10.72" height="3.64" /><path fill="#1d4ed8" d="M14.58,13.05a.09.09,0,0,1-.08,0l-.64-.74a.11.11,0,1,1,.16-.14l.56.65.56-.65a.11.11,0,1,1,.16.14l-.64.74A.09.09,0,0,1,14.58,13.05Z" /><rect fill="#1d4ed8" x="16.11" y="12.09" width="5.71" height="0.96" /><rect fill="#8db1ff" x="25.28" y="10.75" width="10.72" height="3.64" /><path fill="#1d4ed8" d="M27.22,13.05a.09.09,0,0,1-.08,0l-.64-.74a.11.11,0,0,1,.16-.14l.56.65.56-.65a.11.11,0,1,1,.16.14L27.3,13A.09.09,0,0,1,27.22,13.05Z" /><rect fill="#1d4ed8" x="28.75" y="12.09" width="5.71" height="0.96" /><rect fill="#1d4ed8" y="16.58" width="36" height="8.66" /></svg>



    ,
  },


  attributes: {
    items: {
      type: 'array',
      default: [{ isActive: false, headerText: 'What is Lorem Ipsum?', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', icon: '', iconToggle: '', styles: {}, }],
    },

    navsWrap: {
      type: 'object',
      default: {
        options: {
          class: '',
        },

        styles:
        {
          display: { Desktop: '' },

        },
      },
    },

    navItem: {
      type: 'object',
      default: {
        options: {
          class: '',
        },

        styles:
        {
          backgroundColor: { Desktop: '' },
          color: { Desktop: '' },
          display: { Desktop: '' },

        },
      },
    },

    activeNavItem: {
      type: 'object',
      default: {
        options: {
          class: '',
          id: '',
        },

        styles:
        {
          backgroundColor: { Desktop: '' },
          color: { Desktop: '' },
          display: { Desktop: '' },

        },
      },
    },
    next: {
      type: 'object',
      default: {
        options: {
          class: '',
        },

        styles:
        {
          backgroundColor: { Desktop: '' },
          color: { Desktop: '' },

        },
      },
    },

    prev: {
      type: 'object',
      default: {
        options: {
          class: '',
        },

        styles:
        {
          backgroundColor: { Desktop: '' },
          color: { Desktop: '' },

        },
      },
    },

    navLabel: {
      type: 'object',
      default: {
        options: {
          class: '',
        },

        styles:
        {
          backgroundColor: { Desktop: '' },
          color: { Desktop: '' },

        },
      },
    },

    icon: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-angle-down', position: 'before', /* before, after */ class: 'icon', },

        styles:
        {
          backgroundColor: { Desktop: '' },
          color: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
          fontSize: { Desktop: '' },
        },
      },
    },

    iconToggle: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-angle-down', position: 'before', /* before, after */ class: 'icon-toggle', },

        styles:
        {
          backgroundColor: { Desktop: '' },
          color: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
          fontSize: { Desktop: '' },
        },
      },
    },


    panelWrap: {
      type: 'object',
      default: {
        options: {
          position: 'left', // left, right, center
          class: '',
        },

        styles:
        {
          backgroundColor: { Desktop: '' },
          color: { Desktop: '' },

        },
      },
    },



    tabs: {
      "type": "array",
      "default": []
    },
    activeTab: {
      "type": "string"
    },

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
  usesContext: [],

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
    var tabs = attributes.tabs;
    var activeTab = attributes.activeTab;
    var icon = attributes.icon;

    var navsWrap = attributes.navsWrap;
    var navItem = attributes.navItem;
    var activeNavItem = attributes.activeNavItem;

    var navLabel = attributes.navLabel;
    var panelWrap = attributes.panelWrap;

    var next = attributes.next;
    var prev = attributes.prev;

    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;
    var childBlocks = select('core/block-editor').getBlocksByClientId(clientId)[0].innerBlocks


    let isProFeature = applyFilters('isProFeature', true);

    //const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    var breakPointX = myStore.getBreakPoint();

    const [iconPickerIndex, setIconPickerIndex] = useState(99);
    const [iconPickerEnable, setIconPickerEnable] = useState(false);


    // Wrapper CSS Class Selectors
    var wrapperSelector = blockClass;
    var navsWrapSelector = blockClass + ' .navs-wrapper';
    var navItemSelector = blockClass + ' .nav-item';
    var activeNavItemSelector = blockClass + ' .nav-item-active';

    var navLabelSelector = blockClass + ' .nav-label';
    var panelWrapSelector = blockClass + ' .panels-wrap';

    var navIconSelector = blockClass + ' .nav-icon';
    var iconToggleSelector = blockClass + ' .nav-icon-toggle';


    const { replaceInnerBlocks } = useDispatch(blockEditorStore);

    const hasInnerBlocks = useSelect(
      (select) => select(blockEditorStore).getBlocks(clientId).length > 0,
      [clientId]
    );

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

      //console.log(blockCssY.items);


    }, [blockCssY]);



    function bulkCssGenerate(cssObj) {

      var stylesObj = {};

      Object.entries(cssObj).map(args => {

        var selector = args[0];

        Object.entries(args[1]).map(x => {
          var attr = x[0];
          var cssPropty = myStore.cssAttrParse(attr);

          if (stylesObj[selector] == undefined) {
            stylesObj[selector] = {};
          }

          if (stylesObj[selector][cssPropty] == undefined) {
            stylesObj[selector][cssPropty] = {};
          }

          stylesObj[selector][cssPropty] = x[1]
        })


      })

      var cssItems = { ...blockCssY.items };
      var cssItemsX = { ...cssItems, ...stylesObj }
      //console.log(cssItemsX);

      setAttributes({ blockCssY: { items: cssItemsX } });



    }




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

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

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


    function onChangeStyleNavLabel(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, navLabel);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ navLabel: object });




      var elementSelector = myStore.getElementSelector(sudoScource, navLabelSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStyleNavLabel(sudoScource, key) {

      var object = myStore.deletePropertyDeep(navLabel, [sudoScource, key, breakPointX]);
      setAttributes({ navLabel: object });


      var elementSelector = myStore.getElementSelector(sudoScource, navLabelSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }


    function onAddStyleNavLabel(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, navLabel);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ navLabel: object });

    }


    function onPickCssLibraryNavLabel(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        navLabel[sudoScource] = sudoScourceArgs;
      })

      var navLabelX = Object.assign({}, navLabel);
      setAttributes({ navLabel: navLabelX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, navLabelSelector);


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



    function onChangeStylepanelWrap(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, panelWrap);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ panelWrap: object });




      var elementSelector = myStore.getElementSelector(sudoScource, panelWrapSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStylepanelWrap(sudoScource, key) {

      var object = myStore.deletePropertyDeep(panelWrap, [sudoScource, key, breakPointX]);
      setAttributes({ panelWrap: object });


      var elementSelector = myStore.getElementSelector(sudoScource, panelWrapSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }


    function onAddStylepanelWrap(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, panelWrap);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ panelWrap: object });

    }


    function onPickCssLibrarypanelWrap(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        panelWrap[sudoScource] = sudoScourceArgs;
      })

      var panelWrapX = Object.assign({}, panelWrap);
      setAttributes({ panelWrap: panelWrapX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, panelWrapSelector);


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










    function onChangeStyleIcon(sudoScource, newVal, attr) {



      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, icon);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ icon: object });

      var elementSelector = myStore.getElementSelector(sudoScource, navIconSelector);
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


      var elementSelector = myStore.getElementSelector(sudoScource, navIconSelector);
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
        var elementSelector = myStore.getElementSelector(sudoScource, navIconSelector);


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





    function onChangeStyleNavsWrap(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, navsWrap);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ navsWrap: object });

      var elementSelector = myStore.getElementSelector(sudoScource, navsWrapSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStyleNavsWrap(sudoScource, key) {

      var object = myStore.deletePropertyDeep(navsWrap, [sudoScource, key, breakPointX]);
      setAttributes({ navsWrap: object });

      var elementSelector = myStore.getElementSelector(sudoScource, navsWrapSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });

    }


    function onAddStyleNavsWrap(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, navsWrap);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ navsWrap: object });
    }


    function onPickCssLibraryNavsWrap(args) {

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        navsWrap[sudoScource] = sudoScourceArgs;
      })

      var navsWrapX = Object.assign({}, navsWrap);
      setAttributes({ navsWrap: navsWrapX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, navsWrapSelector);


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






    function onChangeStyleNavItem(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, navItem);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ navItem: object });

      var elementSelector = myStore.getElementSelector(sudoScource, navItemSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStyleNavItem(sudoScource, key) {

      var object = myStore.deletePropertyDeep(navItem, [sudoScource, key, breakPointX]);
      setAttributes({ navItem: object });

      var elementSelector = myStore.getElementSelector(sudoScource, navItemSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });

    }


    function onAddStyleNavItem(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, navItem);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ navItem: object });
    }


    function onPickCssLibraryNavItem(args) {

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        navItem[sudoScource] = sudoScourceArgs;
      })

      var navItemX = Object.assign({}, navItem);
      setAttributes({ navItem: navItemX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, navItemSelector);


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




    function onChangeStyleActiveNavItem(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, activeNavItem);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ activeNavItem: object });

      var elementSelector = myStore.getElementSelector(sudoScource, activeNavItemSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStyleActiveNavItem(sudoScource, key) {

      var object = myStore.deletePropertyDeep(activeNavItem, [sudoScource, key, breakPointX]);
      setAttributes({ activeNavItem: object });

      var elementSelector = myStore.getElementSelector(sudoScource, activeNavItemSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });

    }


    function onAddStyleActiveNavItem(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, activeNavItem);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ activeNavItem: object });
    }


    function onPickCssLibraryActiveNavItem(args) {

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        activeNavItem[sudoScource] = sudoScourceArgs;
      })

      var activeNavItemX = Object.assign({}, activeNavItem);
      setAttributes({ activeNavItem: activeNavItemX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, activeNavItemSelector);


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



    const ALLOWED_BLOCKS = ['post-grid/steps-wrap-item'];

    const MY_TEMPLATE = [
      ['post-grid/steps-wrap-item', {}],
      ['post-grid/steps-wrap-item', {}],

    ];

    const blockProps = useBlockProps({
      className: `${useBlockProps().className} ${blockId} `,
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
      allowedBlocks: ALLOWED_BLOCKS,
      __experimentalDirectInsert: true,
      //template: MY_TEMPLATE,
      templateInsertUpdatesSelection: true,
    });


    const setActiveTab = (uid) => {
      setAttributes({ activeTab: uid });
      const parentBlock = select('core/block-editor').getBlock(clientId);

      parentBlock.innerBlocks.forEach((innerBlock) => {
        dispatch('core/block-editor').updateBlockAttributes(
          innerBlock.clientId,
          {
            activeTab: uid,
          }
        );
      });
    };

    const addNewTab = () => {
      const tab = createBlock('post-grid/steps-wrap-item');
      const position = tabs.length;
      dispatch('core/block-editor').insertBlock(tab, position, clientId);
      setAttributes({
        tabs: [
          ...tabs,
          {
            uid: tab.clientId,
            title: `Step ${tabs.length + 1}`,
            icon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },

          },
        ],
      });
      //setActiveTab(tab.clientId);
    };



    const tabTitleChange = (newValue) => {





      setAttributes({
        tabs: [
          ...tabs.map((t) => {
            return t.uid === activeTab
              ? {
                ...t,
                title: newValue,
              }
              : t;
          }),
        ],
      });
    };

    useEffect(() => {
      if (tabs.length && !activeTab) {
        //setActiveTab(tabs[0].uid);
      }
    }, [tabs]);





    return (



      <>

        <InspectorControls >
          <div className='px-3' >

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



                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={wrapper} onChange={onChangeStyleWrapper} onAdd={onAddStyleWrapper} onRemove={onRemoveStyleWrapper} />
                </PGtab>
              </PGtabs>

            </PanelBody>



            <PanelBody title="Navs Wrapper" initialOpen={false}>

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
                  <PGStyles obj={navsWrap} onChange={onChangeStyleNavsWrap} onAdd={onAddStyleNavsWrap} onRemove={onRemoveStyleNavsWrap} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={navsWrap} onChange={onPickCssLibraryNavsWrap} />
                </PGtab>
              </PGtabs>

            </PanelBody>


            <PanelBody title="Nav Item" initialOpen={false}>
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
                  <PGStyles obj={navItem} onChange={onChangeStyleNavItem} onAdd={onAddStyleNavItem} onRemove={onRemoveStyleNavItem} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={navItem} onChange={onPickCssLibraryNavItem} />
                </PGtab>
              </PGtabs>

            </PanelBody>


            <PanelBody title="Active Nav Item" initialOpen={false}>
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
                  <PGStyles obj={activeNavItem} onChange={onChangeStyleActiveNavItem} onAdd={onAddStyleActiveNavItem} onRemove={onRemoveStyleActiveNavItem} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={activeNavItem} onChange={onPickCssLibraryActiveNavItem} />
                </PGtab>
              </PGtabs>

            </PanelBody>


            <PanelBody title="Nav Label" initialOpen={false}>
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
                  <PGStyles obj={navLabel} onChange={onChangeStyleNavLabel} onAdd={onAddStyleNavLabel} onRemove={onRemoveStyleNavLabel} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={navLabel} onChange={onPickCssLibraryNavLabel} />
                </PGtab>
              </PGtabs>

            </PanelBody>


            <PanelBody title="Content Wrap" initialOpen={false}>
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
                  <PGStyles obj={panelWrap} onChange={onChangeStylepanelWrap} onAdd={onAddStylepanelWrap} onRemove={onRemoveStylepanelWrap} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={panelWrap} onChange={onPickCssLibrarypanelWrap} />
                </PGtab>
              </PGtabs>

            </PanelBody>



            <PanelBody title="Nav Icon" initialOpen={false}>


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

                    }} />
                  </PanelRow>



                  <PanelRow>
                    <label for="">Icon postion</label>

                    <SelectControl
                      label=""
                      value={icon.options.position}
                      options={[

                        { label: 'Choose Position', value: '' },
                        { label: 'Before', value: 'before' },
                        { label: 'After', value: 'after' },

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



        {!hasInnerBlocks && (

          <div {...innerBlocksProps}>

            <div className='border p-5'>
              <div className='flex justify-between mb-5'>
                <div className='text-xl rounded-sm'>Click to pick a variation</div>

                <div className='bg-orange-400 hover:bg-orange-300 px-4 py-1 text-white cursor-pointer'
                  onClick={(ev) => {




                    replaceInnerBlocks(
                      clientId,
                      createBlocksFromInnerBlocksTemplate([['post-grid/accordion-nested-item', {}],]),
                      true
                    );
                  }}
                >Skip</div>
              </div>

              <div className=''>


                {variations.map((variation) => {

                  return (
                    <div className='text-center inline-block m-4 w-32 align-top p-4 bg-gray-400 cursor-pointer hover:bg-gray-500 relative' onClick={(ev) => {


                      if (variation.isPro) {
                        alert('Sorry this variation only vailable in pro version');
                        return false;
                      }


                      var atts = variation.atts;

                      var wrapper = { ...atts.wrapper };
                      var navsWrap = { ...atts.navsWrap };
                      var navItem = { ...atts.navItem };
                      var activeNavItem = { ...atts.activeNavItem };
                      var panelWrap = { ...atts.panelWrap };
                      var navLabel = { ...atts.navLabel };
                      var labelCounter = { ...atts.labelCounter };
                      var icon = { ...atts.icon };
                      var iconToggle = { ...atts.iconToggle };
                      var blockCssY = { ...atts.blockCssY };
                      var customCss = { ...atts.customCss };


                      var blockCssObj = {}

                      blockCssObj[wrapperSelector] = wrapper;
                      blockCssObj[activeNavItemSelector] = activeNavItem;
                      blockCssObj[panelWrapSelector] = panelWrap;
                      blockCssObj[navLabelSelector] = navLabel;
                      blockCssObj[navsWrapSelector] = navsWrap;
                      blockCssObj[navItemSelector] = navItem;
                      blockCssObj[navIconSelector] = icon;
                      blockCssObj[iconToggleSelector] = iconToggle;


                      setAttributes({ wrapper: wrapper, navsWrap: navsWrap, navItem: navItem, activeNavItem: activeNavItem, panelWrap: panelWrap, navLabel: navLabel, icon: icon, iconToggle: iconToggle, customCss: customCss, });

                      var blockCssRules = myStore.getBlockCssRules(blockCssObj);

                      var items = { ...blockCssY.items, ...blockCssRules };


                      setAttributes({ blockCssY: { items: items } });



                      var innerBlocksTemplate = createBlocksFromInnerBlocksTemplate(variation.innerBlocks)


                      console.log(innerBlocksTemplate[0].clientId);


                      replaceInnerBlocks(
                        clientId,
                        innerBlocksTemplate,
                        true
                      );

                      // console.log(variation.innerBlocks);



                      setAttributes({
                        tabs: [
                          ...tabs,
                          {
                            uid: innerBlocksTemplate[0].clientId,
                            title: `Step ${tabs.length + 1}`,
                            icon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },

                          },
                        ],
                      });

                      setActiveTab(innerBlocksTemplate[0].clientId)
                      //addNewTab();

                    }}>

                      <div>{variation.icon}</div>
                      <div>{variation.title}</div>

                      {variation.isPro && (<span className='bg-amber-400 rounded-sm text-sm inline-block  bg-opacity-90 text-white hover:text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <a target="_blank" className='block px-3' href={'https://pickplugins.com/post-grid/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=' + x.label}>Pro</a>
                      </span>)}
                    </div>
                  )

                })}
              </div>
            </div>

          </div>

        )}

        {hasInnerBlocks && (

          <div {...innerBlocksProps}>


            <div className={' navs-wrapper  '}>
              {tabs.map((tab, index) => {
                return (
                  <div
                    key={tab.uid}
                    className={` ${tab.uid === activeTab
                      ? '  nav-item-active'
                      : ' nav-item '
                      }`}
                    role="tab"
                    tabIndex={index}
                    onClick={() => setActiveTab(tab.uid)}
                  >

                    {icon.options.position == 'before' && (

                      <>

                        {tab.icon.iconSrc == undefined || tab.icon.iconSrc.length == 0 && (


                          <div className='nav-icon' onClick={ev => {
                            setIconPickerIndex(index)
                            setIconPickerEnable(!iconPickerEnable)
                          }}>
                            <span className={icon.options.iconSrc} ></span>
                          </div>
                        )}


                        {/* {!iconPickerEnable && (
                          <div className='nav-icon' onClick={ev => {
                            setIconPickerIndex(index)
                            setIconPickerEnable(!iconPickerEnable)
                          }}>B
                            <span className={tab.icon.iconSrc} ></span>
                          </div>
                        )} */}


                        {iconPickerEnable && iconPickerIndex != index && (
                          <div className='nav-icon' onClick={ev => {
                            setIconPickerIndex(index)
                            setIconPickerEnable(!iconPickerEnable)
                          }}>
                            <span className={tab.icon.iconSrc} ></span>
                          </div>
                        )}



                        {iconPickerIndex == index && iconPickerEnable && (
                          <PGIconPicker library={tab.icon.library} srcType={tab.icon.srcType} iconSrc={tab.icon.iconSrc} onChange={arg => {

                            tabs[index].icon = { srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc }
                            setAttributes({ tabs: tabs });
                            setIconPickerEnable(!iconPickerEnable)
                            setIconPickerIndex(99)


                          }} />
                        )}






                      </>



                    )}

                    <RichText
                      className=' nav-label'
                      tagName="div"
                      value={tab.title}
                      onChange={tabTitleChange}
                    />

                    {icon.options.position == 'after' && (
                      <>

                        {tab.icon.iconSrc == undefined || tab.icon.iconSrc.length == 0 && (


                          <div className='nav-icon' onClick={ev => {
                            setIconPickerIndex(index)
                            setIconPickerEnable(!iconPickerEnable)
                          }}>
                            <span className={icon.options.iconSrc} ></span>
                          </div>
                        )}

                        {/* {!iconPickerEnable && (
                          <div className='nav-icon' onClick={ev => {
                            setIconPickerIndex(index)
                            setIconPickerEnable(!iconPickerEnable)
                          }}>
                            <span className={tab.icon.iconSrc} ></span>
                          </div>
                        )} */}


                        {iconPickerEnable && iconPickerIndex != index && (
                          <div className='nav-icon' onClick={ev => {
                            setIconPickerIndex(index)
                            setIconPickerEnable(!iconPickerEnable)
                          }}>
                            <span className={tab.icon.iconSrc} ></span>
                          </div>
                        )}



                        {iconPickerIndex == index && iconPickerEnable && (
                          <PGIconPicker library={tab.icon.library} srcType={tab.icon.srcType} iconSrc={tab.icon.iconSrc} onChange={arg => {

                            tabs[index].icon = { srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc }
                            setAttributes({ tabs: tabs });
                            setIconPickerEnable(!iconPickerEnable)
                            setIconPickerIndex(99)


                          }} />
                        )}

                      </>

                    )}



                  </div>
                );
              })}
              <div
                className='nav-item '

                onClick={addNewTab}
              >
                <div className='nav-icon'><Icon fill="#ddd" icon={plus} /></div>

              </div>
            </div>
            <div className={'panels-wrap'}>
              <InnerBlocks
                allowedBlocks={['post-grid/steps-wrap-item']}
                renderAppender={false}

              />
            </div>
          </div>

        )}








      </>

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file

    var attributes = props.attributes;
    var tabs = attributes.tabs;

    var blockId = attributes.blockId;
    var activeTab = attributes.activeTab;
    var icon = attributes.icon;


    var blockIdX = attributes.blockId ? attributes.blockId : 'pg' + clientId.split('-').pop();
    var blockClass = '.' + blockIdX;

    const blockProps = useBlockProps.save({
      className: `${useBlockProps.save().className} ${blockId} pg-tabs`,


    });

    return (
      <InnerBlocks.Content />
    );


    //return null;

  }
})