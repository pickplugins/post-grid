import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover, Spinner, Tooltip } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';
import { InnerBlocks, useBlockProps, useInnerBlocksProps, store as blockEditorStore, } from "@wordpress/block-editor"
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';

import { Icon, styles, settings, link, linkOff, close } from "@wordpress/icons";
import { __experimentalBlockVariationPicker as BlockVariationPicker } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'
import { __experimentalScrollable as Scrollable } from '@wordpress/components';

import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';


import IconToggle from '../../components/icon-toggle'
import Typography from '../../components/typography'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import variations from './variations'

import PGDropdown from '../../components/dropdown'


import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'
import PGCssLibrary from '../../components/css-library'
import PGIconPicker from '../../components/icon-picker'

//import Splide from '@splidejs/splide';

import '@splidejs/splide/dist/css/splide-core.min.css';
//import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';


var myStore = wp.data.select('postgrid-shop');





registerBlockType("post-grid/content-slider", {
  apiVersion: 2,
  title: "Content Slider",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><rect fill="#1d4ed8" y="9.59" width="8.29" height="16.82" /><rect fill="#1d4ed8" x="27.71" y="9.59" width="8.29" height="16.82" /><rect fill="#1d4ed8" x="11.05" y="9.59" width="13.9" height="16.82" /></svg>


    ,
  },


  attributes: {


    wrapper: {
      type: 'object',
      default: {
        options: {
          class: '',
        },

        styles:
        {

        },
      },
    },
    navsWrap: {
      type: 'object',
      default: {
        options: {
          class: 'nav-wrap',

        },

        styles:
        {


        },
      },
    },
    perv: {
      type: 'object',
      default: {
        options: {
          text: 'Prev',
          class: '',

        },

        styles:
        {


        },
      },
    },

    pervIcon: {
      type: 'object',
      default: {
        options: {
          position: 'before',
          class: '',
          library: 'fontAwesome',
          srcType: "class", /*class, html, img, svg */
          iconSrc: 'fas fa-chevron-left',
        },
        styles:
        {
        },
      },
    },


    next: {
      type: 'object',
      default: {
        options: {
          text: 'Next',
          class: '',

        },

        styles:
        {

        },
      },
    },
    nextIcon: {
      type: 'object',
      default: {
        options: {
          position: 'after',
          class: '',
          library: 'fontAwesome',
          srcType: "class", /*class, html, img, svg */
          iconSrc: 'fas fa-chevron-right',
        },

        styles:
        {

        },
      },
    },


    paginationWrap: {
      type: 'object',
      default: {
        options: {
          tag: 'ul',
          class: '',
        },

        styles:
        {


        },
      },
    },
    pagination: {
      type: 'object',
      default: {
        options: {
          tag: 'span',
          class: '',
        },

        styles:
        {


        },
      },
    },

    paginationActive: {
      type: 'object',
      default: {
        options: {
          class: '',
        },

        styles:
        {


        },
      },
    },
    sliderOptions: {
      type: 'object',
      default: {


      },
    },

    sliderOptionsRes: {
      type: 'object',
      default: {


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
    var perv = attributes.perv;
    var next = attributes.next;
    var pagination = attributes.pagination;
    var paginationActive = attributes.paginationActive;

    var pervIcon = attributes.pervIcon;
    var nextIcon = attributes.nextIcon;
    var navsWrap = attributes.navsWrap;
    var paginationWrap = attributes.paginationWrap;
    var sliderOptions = attributes.sliderOptions;
    var sliderOptionsRes = attributes.sliderOptionsRes;



    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    var postId = context['postId'];
    var postType = context['postType'];

    //const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    //var breakPointX = myStore.getBreakPoint();

    const [breakPointX, setBreakPointX] = useState((myStore != null) ? myStore.getBreakPoint() : 'Desktop');



    // Wrapper CSS Class Selectors
    //var wrapperSelector = blockClass;
    var wrapperSelector = blockClass + ' .splide';


    var nextSelector = blockClass + ' .splide__arrow--next';
    var pervSelector = blockClass + ' .splide__arrow--prev';


    var nextIconSelector = blockClass + ' .splide__arrow--next .icon';
    var pervIconSelector = blockClass + ' .splide__arrow--prev .icon';


    var navsWrapSelector = blockClass + ' .splide__arrows';
    var paginationWrapSelector = blockClass + ' .splide__pagination';
    var paginationSelector = blockClass + ' .splide__pagination__page';
    var paginationActiveSelector = blockClass + ' .splide__pagination__page.is-active';


    var sliderOptionsArgs = {

      autoplay: { label: 'Auto play', value: 1 },
      interval: { label: 'Interval', value: '500' },
      pauseOnHover: { label: 'Pause On Hover', value: 1 },
      pauseOnFocus: { label: 'Pause On Focus', value: 1 },
      lazyLoad: { label: 'Lazy Load', value: 1 },
      preloadPages: { label: 'Preload Pages', value: 1 },
      keyboard: { label: 'Keyboard', value: 1 },
      wheel: { label: 'Wheel', value: 1 },
      direction: { label: 'Direction', value: 'ltr' },
      cover: { label: 'Cover', value: 0 },
      rewind: { label: 'Rewind', value: 0 },
      speed: { label: 'Speed', value: 400 },
      rewindSpeed: { label: 'Rewind Speed', value: 400 },
      rewindByDrag: { label: 'Rewind By Drag', value: 0 },
      width: { label: 'Width', value: '' },
      height: { label: 'Height', value: '' },
      fixedWidth: { label: 'Fixed Width', value: '' },
      fixedHeight: { label: 'Fixed Height', value: '' },
      heightRatio: { label: 'Height Ratio', value: '' },
      autoWidth: { label: 'Auto Width', value: 0 },
      autoHeight: { label: 'Auto Height', value: 0 },
      start: { label: 'Start', value: 0 },
      perPage: { label: 'Per Page', value: 3 },
      perMove: { label: 'Per Move', value: 3 },
      focus: { label: 'Focus', value: 'center' },
      gap: { label: 'Gap', value: '1em' },
      padding: { label: 'Padding', value: '' },
      arrows: { label: 'Arrows', value: 1 },
      pagination: { label: 'Pagination', value: 1 },
      //easing: { label: 'Easing', value: 'cubic-bezier(0.25, 1, 0.5, 1)' },

      paginationKeyboard: { label: 'Pagination Keyboard', value: 1 },
      paginationDirection: { label: 'Pagination Direction', value: 'paginationDirectltrion' },
      drag: { label: 'Drag', value: 1 },
      noDrag: { label: 'No Drag', value: 'input, textarea, .rich-text' },

      snap: { label: 'Snap', value: 1 },
      mediaQuery: { label: 'Media Query', value: 'max' },
    }


    var sliderOptionsArgsRes = {

      rewind: { label: 'Rewind', value: 0 },
      speed: { label: 'Speed', value: 400 },
      rewindSpeed: { label: 'Rewind Speed', value: 400 },
      rewindByDrag: { label: 'Rewind By Drag', value: 0 },
      width: { label: 'Width', value: '' },
      height: { label: 'Height', value: '' },
      fixedWidth: { label: 'Fixed Width', value: '' },
      fixedHeight: { label: 'Fixed Height', value: '' },
      heightRatio: { label: 'Height Ratio', value: '' },
      perPage: { label: 'Per Page', value: 3 },
      perMove: { label: 'Per Move', value: 3 },
      focus: { label: 'Focus', value: 'center' },
      gap: { label: 'Gap', value: '1em' },
      padding: { label: 'Padding', value: '' },
      arrows: { label: 'Arrows', value: 1 },
      pagination: { label: 'Pagination', value: 1 },
      paginationKeyboard: { label: 'Pagination Keyboard', value: 1 },
      paginationDirection: { label: 'Pagination Direction', value: 'paginationDirectltrion' },
      drag: { label: 'Drag', value: 1 },
      snap: { label: 'Snap', value: 1 },
      keyboard: { label: 'Keyboard', value: 1 },
      direction: { label: 'Direction', value: 'ltr' },
      easing: { label: 'Easing', value: 'cubic-bezier(0.25, 1, 0.5, 1)' },


    }


    function onChangeBreakPoint(x, _index) {

      var asdsdsd = wp.data.dispatch('postgrid-shop').setBreakPoint(x.value)

      asdsdsd.then((res) => {

        setBreakPointX(res.breakpoint);

        myStore.generateBlockCss(blockCssY.items, blockId, customCss);
      });


      const {
        __experimentalGetPreviewDeviceType: getPreviewDeviceType,
      } = select('core/edit-post');

      const gutenbergDeviceType = getPreviewDeviceType();


    }



    const { replaceInnerBlocks } = useDispatch(blockEditorStore);

    const hasInnerBlocks = useSelect(
      (select) => select(blockEditorStore).getBlocks(clientId).length > 0,
      [clientId]
    );



    //console.log(JSON.stringify(wp.data.select(blockEditorStore).getBlocks(clientId)));

    useEffect(() => {

      console.log(sliderOptionsRes);

      var args = {};

      Object.entries(sliderOptionsRes).map(item => {

        var id = item[0];
        var vals = item[1];

        Object.entries(vals).map(arg => {

          var view = arg[0];
          var viewVal = arg[1];
          var viewPoint = '';

          if (view == 'Mobile') {
            viewPoint = '360';
          } else if (view == 'Tablet') {
            viewPoint = '780';
          } else if (view == 'Desktop') {
            viewPoint = '1024';
          }

          if (args[viewPoint] == undefined) {
            args[viewPoint] = {}
          }

          if (args[viewPoint][id] == undefined) {
            args[viewPoint][id] = '';
          }

          args[viewPoint][id] = viewVal;

        })



      })

      console.log(args);

      if (Object.entries(args).length > 0) {
        var sliderOptionsX = { ...sliderOptions, }
        sliderOptionsX['breakpoints'] = args
        setAttributes({ sliderOptions: sliderOptionsX });
      }




    }, [sliderOptionsRes]);

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



    var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }


    const addSlide = () => {
      var childBlocks = wp.data.select(blockEditorStore).getBlocks(clientId);

      const slide = createBlock('post-grid/content-slider-item');
      const position = childBlocks.length;
      dispatch('core/block-editor').insertBlock(slide, position, clientId);


      //setActiveTab(slide.clientId);
    };


    function handleLinkClick(ev) {

      ev.stopPropagation();
      ev.preventDefault();
      return false;
    }



    function applyFlex(attr, newVal) {


      onChangeStyleWrapper('styles', newVal, attr)

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




    function onBulkAddWrapper(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
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






    function onChangeStyleNext(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, next);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ next: object });




      var elementSelector = myStore.getElementSelector(sudoScource, nextSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStyleNext(sudoScource, key) {

      var object = myStore.deletePropertyDeep(next, [sudoScource, key, breakPointX]);
      setAttributes({ next: object });


      var elementSelector = myStore.getElementSelector(sudoScource, nextSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }


    function onAddStyleNext(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, next);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ next: object });

    }





    function onBulkAddNext(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, next);
      obj[sudoScource] = cssObj;

      setAttributes({ next: obj });

      var selector = myStore.getElementSelector(sudoScource, nextSelector);
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














    function onChangeStylePrev(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, perv);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ perv: object });




      var elementSelector = myStore.getElementSelector(sudoScource, pervSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStylePrev(sudoScource, key) {

      var object = myStore.deletePropertyDeep(perv, [sudoScource, key, breakPointX]);
      setAttributes({ perv: object });


      var elementSelector = myStore.getElementSelector(sudoScource, pervSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }


    function onAddStylePrev(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, perv);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ perv: object });

    }





    function onBulkAddPrev(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, perv);
      obj[sudoScource] = cssObj;

      setAttributes({ perv: obj });

      var selector = myStore.getElementSelector(sudoScource, pervSelector);
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






    function onChangeStylePagination(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, pagination);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ pagination: object });




      var elementSelector = myStore.getElementSelector(sudoScource, paginationSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStylePagination(sudoScource, key) {

      var object = myStore.deletePropertyDeep(pagination, [sudoScource, key, breakPointX]);
      setAttributes({ pagination: object });


      var elementSelector = myStore.getElementSelector(sudoScource, paginationSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }


    function onAddStylePagination(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, pagination);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ pagination: object });

    }





    function onBulkAddPagination(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, pagination);
      obj[sudoScource] = cssObj;

      setAttributes({ pagination: obj });

      var selector = myStore.getElementSelector(sudoScource, paginationSelector);
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




    function onChangeStylePaginationActive(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, paginationActive);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ paginationActive: object });




      var elementSelector = myStore.getElementSelector(sudoScource, paginationActiveSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStylePaginationActive(sudoScource, key) {

      var object = myStore.deletePropertyDeep(paginationActive, [sudoScource, key, breakPointX]);
      setAttributes({ paginationActive: object });


      var elementSelector = myStore.getElementSelector(sudoScource, paginationActiveSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }


    function onAddStylePaginationActive(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, paginationActive);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ paginationActive: object });

    }





    function onBulkAddPaginationActive(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, paginationActive);
      obj[sudoScource] = cssObj;

      setAttributes({ paginationActive: obj });

      var selector = myStore.getElementSelector(sudoScource, paginationActiveSelector);
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






    function onChangeStylePaginationWrap(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, paginationWrap);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ paginationWrap: object });




      var elementSelector = myStore.getElementSelector(sudoScource, paginationWrapSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStylePaginationWrap(sudoScource, key) {

      var object = myStore.deletePropertyDeep(paginationWrap, [sudoScource, key, breakPointX]);
      setAttributes({ paginationWrap: object });


      var elementSelector = myStore.getElementSelector(sudoScource, paginationWrapSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }


    function onAddStylePaginationWrap(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, paginationWrap);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ paginationWrap: object });

    }





    function onBulkAddPaginationWrap(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, paginationWrap);
      obj[sudoScource] = cssObj;

      setAttributes({ paginationWrap: obj });

      var selector = myStore.getElementSelector(sudoScource, paginationWrapSelector);
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






















    function onChangeStyleNextIcon(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, nextIcon);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ nextIcon: object });




      var elementSelector = myStore.getElementSelector(sudoScource, nextIconSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStyleNextIcon(sudoScource, key) {

      var object = myStore.deletePropertyDeep(nextIcon, [sudoScource, key, breakPointX]);
      setAttributes({ nextIcon: object });


      var elementSelector = myStore.getElementSelector(sudoScource, nextIconSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }


    function onAddStyleNextIcon(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, nextIcon);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ nextIcon: object });

    }





    function onBulkAddNextIcon(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, nextIcon);
      obj[sudoScource] = cssObj;

      setAttributes({ nextIcon: obj });

      var selector = myStore.getElementSelector(sudoScource, nextIconSelector);
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









    function onChangeStylePervIcon(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, pervIcon);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ pervIcon: object });




      var elementSelector = myStore.getElementSelector(sudoScource, pervIconSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStylePervIcon(sudoScource, key) {

      var object = myStore.deletePropertyDeep(pervIcon, [sudoScource, key, breakPointX]);
      setAttributes({ pervIcon: object });


      var elementSelector = myStore.getElementSelector(sudoScource, pervIconSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }


    function onAddStylePervIcon(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, pervIcon);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ pervIcon: object });

    }





    function onBulkAddPervIcon(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, pervIcon);
      obj[sudoScource] = cssObj;

      setAttributes({ pervIcon: obj });

      var selector = myStore.getElementSelector(sudoScource, pervIconSelector);
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





    function onBulkAddNavsWrap(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, navsWrap);
      obj[sudoScource] = cssObj;

      setAttributes({ navsWrap: obj });

      var selector = myStore.getElementSelector(sudoScource, navsWrapSelector);
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


















    const [nextIconHtml, setNextIconHtml] = useState('');
    const [pervIconHtml, setPervIconHtml] = useState('');



    useEffect(() => {

      var iconSrc = nextIcon.options.iconSrc;
      var iconHtml = `<span class="${iconSrc}"></span>`;

      setNextIconHtml(iconHtml);
    }, [nextIcon.options]);


    useEffect(() => {

      var iconSrc = pervIcon.options.iconSrc;
      var iconHtml = `<span class="${iconSrc}"></span>`;

      setPervIconHtml(iconHtml);
    }, [pervIcon.options]);






    const ALLOWED_BLOCKS = ['post-grid/content-slider-navs', 'post-grid/content-slider-loop', 'post-grid/content-slider-item',];

    const MY_TEMPLATE = [
      ['post-grid/content-slider-item', {}],
    ];


    const blockProps = useBlockProps({
      className: ` ${blockId} pg-content-slider  `,
    });


    const innerBlocksProps = useInnerBlocksProps(blockProps, {
      allowedBlocks: ALLOWED_BLOCKS,
      template: MY_TEMPLATE,
      orientation: 'horizontal',
      //templateInsertUpdatesSelection: true,
      //renderAppender: InnerBlocks.ButtonBlockAppender

    });


    var RemoveSliderArg = function ({ index }) {

      return (
        <span className='cursor-pointer inline-block hover:bg-red-500 hover:text-white px-1 py-1' onClick={ev => {

          var sliderOptionsX = { ...sliderOptions }
          delete sliderOptionsX[index];

          setAttributes({ sliderOptions: sliderOptionsX });
        }}><Icon icon={close} /></span>
      )

    }


    var RemoveSliderArgRes = function ({ index }) {

      return (
        <span className='cursor-pointer inline-block hover:bg-red-500 hover:text-white px-1 py-1' onClick={ev => {

          console.log(index);

          var sliderOptionsResX = { ...sliderOptionsRes }

          delete sliderOptionsResX[index];
          setAttributes({ sliderOptionsRes: sliderOptionsResX });
        }}><Icon icon={close} /></span>
      )

    }



    return (
      <>
        <InspectorControls >

          <div className='bg-blue-600 mx-3 my-2 cursor-pointer hover:text-white font-bold text-[16px] px-5 py-2 block text-center text-white rounded'
            onClick={ev => {

              addSlide()

            }}>Add Slide Item</div>






          <PanelBody title="Slider Options" initialOpen={true}>
            <PGtabs
              activeTab="normal"
              orientation="horizontal"
              activeClass="active-tab"
              onSelect={(tabName) => { }}
              tabs={[
                {
                  name: 'normal',
                  title: 'Normal',
                  icon: settings,
                  className: 'tab-normal',
                },
                {
                  name: 'responsive',
                  title: 'Responsive',
                  icon: styles,
                  className: 'tab-responsive',
                },
              ]}
            >
              <PGtab name="normal">




                <PanelRow className='my-3'>
                  <label>Slider Options</label>
                  <PGDropdown position="bottom right" variant="secondary" buttonTitle={'Choose'} options={sliderOptionsArgs}
                    onChange={(option, index) => {

                      var sliderOptionsX = { ...sliderOptions, }

                      sliderOptionsX[index] = option.value

                      setAttributes({ sliderOptions: sliderOptionsX });



                    }} values=""></PGDropdown>
                </PanelRow>

                {Object.entries(sliderOptions).map((item, index) => {

                  var id = item[0];
                  var value = item[1];


                  return (

                    <>
                      {id == 'autoplay' && (
                        <PanelRow>
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span>Autoplay?</span>
                          </div>
                          <SelectControl
                            label=""
                            value={value}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}
                      {id == 'rewind' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Rewind?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={value}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}
                      {id == 'interval' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Interval?</span>
                          </div>

                          <InputControl
                            value={value}
                            type="number"
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'speed' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Speed?</span>
                          </div>

                          <InputControl
                            value={value}
                            type="number"
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'rewindSpeed' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Rewind Speed?</span>
                          </div>

                          <InputControl
                            value={value}
                            type="number"
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'start' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Start?</span>
                          </div>

                          <InputControl
                            value={value}
                            type="number"
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'perPage' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Per Page?</span>
                          </div>

                          <InputControl
                            value={value}
                            type="number"
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'perMove' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Per Move?</span>
                          </div>

                          <InputControl
                            value={value}
                            type="number"
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'gap' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Gap?</span>
                          </div>

                          <InputControl
                            value={value}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'padding' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Padding?</span>
                          </div>

                          <InputControl
                            value={value}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}



                      {id == 'focus' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Focus?</span>
                          </div>

                          <InputControl
                            value={value}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}


                      {id == 'width' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Width?</span>
                          </div>

                          <InputControl
                            value={value}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}


                      {id == 'height' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Height?</span>
                          </div>

                          <InputControl
                            value={value}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}


                      {id == 'fixedWidth' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Fixed Width?</span>
                          </div>

                          <InputControl
                            value={value}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}


                      {id == 'fixedHeight' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Fixed Height?</span>
                          </div>

                          <InputControl
                            value={value}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'heightRatio' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Height Ratio?</span>
                          </div>

                          <InputControl
                            value={value}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'easing' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Easing?</span>
                          </div>

                          <InputControl
                            value={value}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}


                      {id == 'pauseOnHover' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Pause On Hover?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={value}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'pauseOnFocus' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Pause On Focus?</span>
                          </div>
                          <label for="">?</label>
                          <SelectControl
                            label=""
                            value={value}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}


                      {id == 'rewindByDrag' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Rewind By Drag?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={value}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}


                      {id == 'autoWidth' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Auto Width?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={value}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'autoHeight' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Auto Height?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={value}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}



                      {id == 'arrows' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Navigation?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={value}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}


                      {id == 'pagination' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Pagination?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={value}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}


                      {id == 'paginationKeyboard' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Pagination Keyboard?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={value}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'drag' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Drag?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={value}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'snap' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Snap?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={value}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}



                      {id == 'noDrag' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >noDrag?</span>
                          </div>

                          <InputControl
                            value={value}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'paginationDirection' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Pagination Direction?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={value}
                            options={[
                              { label: 'ltr', value: 'ltr' },
                              { label: 'rtl', value: 'rtl' },
                              { label: 'ttb', value: 'ttb' },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'direction' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Direction?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={value}
                            options={[
                              { label: 'ltr', value: 'ltr' },
                              { label: 'rtl', value: 'rtl' },
                              { label: 'ttb', value: 'ttb' },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}



                      {id == 'lazyLoad' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >LazyLoad?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={value}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                              { label: 'Nearby', value: 'nearby' },
                              { label: 'Sequential', value: 'sequential' },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}


                      {id == 'keyboard' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Keyboard?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={value}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                              { label: 'global', value: 'global' },
                              { label: 'focused', value: 'focused' },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'mediaQuery' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Media Query?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={value}
                            options={[
                              { label: 'min', value: 'min' },
                              { label: 'max', value: 'max' },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}



                      {id == 'wheel' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Wheel?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={value}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },

                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}


                      {id == 'cover' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArg index={id} />
                            <span >Cover?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={value}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },

                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsX = { ...sliderOptions, }
                              sliderOptionsX[id] = newVal
                              setAttributes({ sliderOptions: sliderOptionsX });
                            }
                            }
                          />
                        </PanelRow>
                      )}












                    </>

                  )


                })}



              </PGtab>
              <PGtab name="responsive">


                <PanelRow className='my-3'>
                  <label>Slider Options</label>
                  <PGDropdown position="bottom right" variant="secondary" buttonTitle={'Choose'} options={sliderOptionsArgsRes}
                    onChange={(option, index) => {
                      var sliderOptionsResX = { ...sliderOptionsRes }

                      if (sliderOptionsResX[index] == undefined) {
                        sliderOptionsResX[index] = {}
                      }

                      if (sliderOptionsResX[index][breakPointX] == undefined) {
                        sliderOptionsResX[index][breakPointX] = option.value;
                      }

                      setAttributes({ sliderOptionsRes: sliderOptionsResX });

                    }} values=""></PGDropdown>

                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                </PanelRow>



                {Object.entries(sliderOptionsRes).map((item, index) => {

                  var id = item[0];
                  var value = item[1];



                  return (

                    <>
                      {id == 'autoplay' && (
                        <PanelRow>
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span>Autoplay?</span>
                          </div>
                          <SelectControl
                            label=""
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}
                      {id == 'rewind' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Rewind?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}
                      {id == 'interval' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Interval?</span>
                          </div>

                          <InputControl
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            type="number"
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'speed' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Speed?</span>
                          </div>

                          <InputControl
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            type="number"
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'rewindSpeed' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Rewind Speed?</span>
                          </div>

                          <InputControl
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            type="number"
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'start' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Start?</span>
                          </div>

                          <InputControl
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            type="number"
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'perPage' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Per Page?</span>
                          </div>

                          <InputControl
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            type="number"
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'perMove' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Per Move?</span>
                          </div>

                          <InputControl
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            type="number"
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'gap' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Gap?</span>
                          </div>

                          <InputControl
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'padding' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Padding?</span>
                          </div>

                          <InputControl
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}



                      {id == 'focus' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Focus?</span>
                          </div>

                          <InputControl
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}


                      {id == 'width' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Width?</span>
                          </div>

                          <InputControl
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}


                      {id == 'height' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Height?</span>
                          </div>

                          <InputControl
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}


                      {id == 'fixedWidth' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Fixed Width?</span>
                          </div>

                          <InputControl
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}


                      {id == 'fixedHeight' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Fixed Height?</span>
                          </div>

                          <InputControl
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'heightRatio' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Height Ratio?</span>
                          </div>

                          <InputControl
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'pauseOnHover' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Pause On Hover?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'pauseOnFocus' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Pause On Focus?</span>
                          </div>
                          <label for="">?</label>
                          <SelectControl
                            label=""
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}


                      {id == 'rewindByDrag' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Rewind By Drag?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}


                      {id == 'autoWidth' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Auto Width?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'autoHeight' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Auto Height?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}



                      {id == 'arrows' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Navigation?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}


                      {id == 'pagination' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Pagination?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}


                      {id == 'paginationKeyboard' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Pagination Keyboard?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'drag' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Drag?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'snap' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Snap?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'noDrag' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >No Drag?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}



                      {id == 'paginationDirection' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Pagination Direction?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            options={[
                              { label: 'ltr', value: 'ltr' },
                              { label: 'rtl', value: 'rtl' },
                              { label: 'ttb', value: 'ttb' },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'direction' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Direction?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            options={[
                              { label: 'ltr', value: 'ltr' },
                              { label: 'rtl', value: 'rtl' },
                              { label: 'ttb', value: 'ttb' },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}



                      {id == 'lazyLoad' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >LazyLoad?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                              { label: 'Nearby', value: 'nearby' },
                              { label: 'Sequential', value: 'sequential' },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}


                      {id == 'keyboard' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Keyboard?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },
                              { label: 'global', value: 'global' },
                              { label: 'focused', value: 'focused' },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}

                      {id == 'mediaQuery' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Media Query?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            options={[
                              { label: 'min', value: 'min' },
                              { label: 'max', value: 'max' },
                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}



                      {id == 'wheel' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Wheel?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },

                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}


                      {id == 'cover' && (
                        <PanelRow >
                          <div className='flex items-center'>
                            <RemoveSliderArgRes index={id} />
                            <span >Cover?</span>
                          </div>

                          <SelectControl
                            label=""
                            value={(value[breakPointX] == undefined) ? "" : value[breakPointX]}
                            options={[
                              { label: 'True', value: 1 },
                              { label: 'False', value: 0 },

                            ]}
                            onChange={(newVal) => {
                              var sliderOptionsResX = { ...sliderOptionsRes }
                              if (sliderOptionsResX[id][breakPointX] == undefined) {
                                sliderOptionsResX[id][breakPointX] = '';
                              }

                              sliderOptionsResX[id][breakPointX] = newVal
                              setAttributes({ sliderOptionsRes: sliderOptionsResX });
                            }
                            }
                          />
                        </PanelRow>
                      )}











                    </>

                  )










                })}



              </PGtab>
            </PGtabs>



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


              </PGtab>
              <PGtab name="styles">
                <PGStyles obj={wrapper} onChange={onChangeStyleWrapper} onAdd={onAddStyleWrapper} onRemove={onRemoveStyleWrapper} onBulkAdd={onBulkAddWrapper} />
              </PGtab>
            </PGtabs>





          </PanelBody>

          <PanelBody title="Navigation" initialOpen={false}>

            <PanelBody title="Nav Wrap" initialOpen={false}>

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
                  <PGStyles obj={navsWrap} onChange={onChangeStyleNavsWrap} onAdd={onAddStyleNavsWrap} onRemove={onRemoveStyleNavsWrap} onBulkAdd={onBulkAddNavsWrap} />
                </PGtab>
              </PGtabs>


            </PanelBody>





            <PanelBody title="Prev" initialOpen={false}>
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
                    <label for="">Previuos Text</label>
                    <InputControl
                      value={perv.options.text}
                      onChange={(newVal) => {

                        var options = { ...perv.options, text: newVal };
                        setAttributes({ perv: { ...perv, options: options } });

                      }

                      }
                    />
                  </PanelRow>



                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={perv} onChange={onChangeStylePrev} onAdd={onAddStylePrev} onRemove={onRemoveStylePrev} onBulkAdd={onBulkAddPrev} />
                </PGtab>
              </PGtabs>






            </PanelBody>

            <PanelBody title="Prev Icon" initialOpen={false}>
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
                    <label for="">Choose Icon</label>

                    <PGIconPicker library={pervIcon.options.library} srcType={pervIcon.options.srcType} iconSrc={pervIcon.options.iconSrc} onChange={(arg) => {


                      var options = { ...pervIcon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };


                      setAttributes({ pervIcon: { ...pervIcon, options: options } });



                    }} />
                  </PanelRow>


                  <PanelRow>
                    <label for="">Icon Position</label>

                    <SelectControl
                      label=""
                      value={pervIcon.options.position}
                      options={[
                        { label: 'None', value: '' },
                        { label: 'After', value: 'after' },
                        { label: 'Before', value: 'before' },


                      ]}
                      onChange={(newVal) => {

                        var options = { ...pervIcon.options, position: newVal };
                        setAttributes({ pervIcon: { ...pervIcon, options: options } });

                      }

                      }
                    />
                  </PanelRow>

                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={pervIcon} onChange={onChangeStylePervIcon} onAdd={onAddStylePervIcon} onRemove={onRemoveStylePervIcon} onBulkAdd={onBulkAddPervIcon} />
                </PGtab>
              </PGtabs>
            </PanelBody>

            <PanelBody title="Next" initialOpen={false}>
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
                    <label for="">Previuos Text</label>
                    <InputControl
                      value={next.options.text}
                      onChange={(newVal) => {

                        var options = { ...next.options, text: newVal };
                        setAttributes({ next: { ...next, options: options } });

                      }

                      }
                    />
                  </PanelRow>


                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={next} onChange={onChangeStyleNext} onAdd={onAddStyleNext} onRemove={onRemoveStyleNext} onBulkAdd={onBulkAddNext} />
                </PGtab>
              </PGtabs>





            </PanelBody>

            <PanelBody title="Next Icon" initialOpen={false}>
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
                    <label for="">Choose Icon</label>

                    <PGIconPicker library={nextIcon.options.library} srcType={nextIcon.options.srcType} iconSrc={nextIcon.options.iconSrc} onChange={(arg) => {


                      var options = { ...nextIcon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };


                      setAttributes({ nextIcon: { ...nextIcon, options: options } });



                    }} />
                  </PanelRow>


                  <PanelRow>
                    <label for="">Icon Position</label>

                    <SelectControl
                      label=""
                      value={nextIcon.options.position}
                      options={[
                        { label: 'None', value: '' },
                        { label: 'After', value: 'after' },
                        { label: 'Before', value: 'before' },

                      ]}
                      onChange={(newVal) => {

                        var options = { ...nextIcon.options, position: newVal };
                        setAttributes({ nextIcon: { ...nextIcon, options: options } });

                      }

                      }
                    />
                  </PanelRow>

                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={nextIcon} onChange={onChangeStyleNextIcon} onAdd={onAddStyleNextIcon} onRemove={onRemoveStyleNextIcon} onBulkAdd={onBulkAddNextIcon} />
                </PGtab>
              </PGtabs>
            </PanelBody>



          </PanelBody>

          <PanelBody title="Pagination" initialOpen={false}>


            <PanelBody title="Pagination Wrap" initialOpen={false}>

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
                  <PGStyles obj={paginationWrap} onChange={onChangeStylePaginationWrap} onAdd={onAddStylePaginationWrap} onRemove={onRemoveStylePaginationWrap} onBulkAdd={onBulkAddPaginationWrap} />
                </PGtab>
              </PGtabs>
            </PanelBody>


            <PanelBody title="Pagination Idle" initialOpen={false}>

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
                  <PGStyles obj={pagination} onChange={onChangeStylePagination} onAdd={onAddStylePagination} onRemove={onRemoveStylePagination} onBulkAdd={onBulkAddPagination} />
                </PGtab>
              </PGtabs>







            </PanelBody>


            <PanelBody title="Pagination Active" initialOpen={false}>

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
                  <PGStyles obj={paginationActive} onChange={onChangeStylePaginationActive} onAdd={onAddStylePaginationActive} onRemove={onRemoveStylePaginationActive} onBulkAdd={onBulkAddPaginationActive} />
                </PGtab>
              </PGtabs>
            </PanelBody>



          </PanelBody>





          <PanelBody title="Custom Style" initialOpen={false}>


            <p className=''>Please use following class selector to apply your custom CSS</p>


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


        </InspectorControls >


        <>



          {!hasInnerBlocks && (

            <div {...innerBlocksProps}>

              <div className='border p-5'>
                <div className='flex justify-between mb-5'>
                  <div className='text-xl rounded-sm'>Click to pick a variation</div>

                  <div className='bg-orange-400 hover:bg-orange-300 px-4 py-1 text-white cursor-pointer'
                    onClick={(ev) => {




                      replaceInnerBlocks(
                        clientId,
                        createBlocksFromInnerBlocksTemplate([['post-grid/content-slider-item', {}],]),
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

                        var paginationWrap = { ...atts.paginationWrap };
                        var pagination = { ...atts.pagination };
                        var paginationActive = { ...atts.paginationActive };

                        var perv = { ...atts.perv };
                        var next = { ...atts.next };
                        var pervIcon = { ...atts.pervIcon };
                        var nextIcon = { ...atts.nextIcon };

                        var navsWrap = { ...atts.navsWrap };
                        var blockCssY = { ...atts.blockCssY };
                        var customCss = { ...atts.customCss };
                        var sliderOptions = { ...atts.sliderOptions };
                        var sliderOptionsRes = { ...atts.sliderOptionsRes };


                        var blockCssObj = {}

                        blockCssObj[wrapperSelector] = wrapper;
                        blockCssObj[paginationSelector] = pagination;
                        blockCssObj[pervIconSelector] = pervIcon;
                        blockCssObj[paginationActiveSelector] = paginationActive;
                        blockCssObj[nextIconSelector] = nextIcon;
                        blockCssObj[pervSelector] = perv;
                        blockCssObj[nextSelector] = next;
                        blockCssObj[paginationWrapSelector] = paginationWrap;
                        blockCssObj[navsWrapSelector] = navsWrap;


                        setAttributes({ wrapper: wrapper, perv: perv, next: next, pagination: pagination, pervIcon: pervIcon, paginationActive: paginationActive, nextIcon: nextIcon, paginationWrap: paginationWrap, navsWrap: navsWrap, customCss: customCss, sliderOptions: sliderOptions, sliderOptionsRes: sliderOptionsRes, });

                        var blockCssRules = myStore.getBlockCssRules(blockCssObj);

                        var items = { ...blockCssY.items, ...blockCssRules };


                        setAttributes({ blockCssY: { items: items } });

                        replaceInnerBlocks(
                          clientId,
                          createBlocksFromInnerBlocksTemplate(variation.innerBlocks),
                          true
                        );
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

              <Splide hasTrack={false} options={sliderOptions}>



                <SplideTrack>
                  {innerBlocksProps.children}
                </SplideTrack>

                <div className="splide__arrows">
                  <div className='perv splide__arrow splide__arrow--prev'>

                    {pervIcon.options.position == 'before' && (
                      <span className='icon' dangerouslySetInnerHTML={{ __html: pervIconHtml }} />
                    )}

                    {perv.options.text.length > 0 && (
                      <span> {perv.options.text} </span>
                    )}

                    {pervIcon.options.position == 'after' && (
                      <span className='icon' dangerouslySetInnerHTML={{ __html: pervIconHtml }} />
                    )}
                  </div>
                  <div className='next splide__arrow splide__arrow--next'>

                    {nextIcon.options.position == 'before' && (
                      <span className='icon' dangerouslySetInnerHTML={{ __html: nextIconHtml }} />
                    )}


                    {next.options.text.length > 0 && (
                      <span> {next.options.text} </span>
                    )}

                    {nextIcon.options.position == 'after' && (
                      <span className='icon' dangerouslySetInnerHTML={{ __html: nextIconHtml }} />
                    )}
                  </div>
                </div>

                <ul class="splide__pagination "></ul>

              </Splide>




            </div>
          )}



        </>

      </>

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file

    var attributes = props.attributes;
    var wrapper = attributes.wrapper;
    var perv = attributes.perv;
    var next = attributes.next;
    var pagination = attributes.pagination;
    var paginationActive = attributes.paginationActive;

    var pervIcon = attributes.pervIcon;
    var nextIcon = attributes.nextIcon;
    var navsWrap = attributes.navsWrap;
    var paginationWrap = attributes.paginationWrap;
    var sliderOptions = attributes.sliderOptions;
    var sliderOptionsRes = attributes.sliderOptionsRes;

    var blockId = attributes.blockId;

    var pervIconHtml = `<span class="${pervIcon.options.iconSrc}"></span>`;
    var nextIconHtml = `<span class="${nextIcon.options.iconSrc}"></span>`;


    const blockProps = useBlockProps.save({
      className: ` ${blockId} pg-content-slider`,

    });

    const { children, ...innerBlocksProps } = useInnerBlocksProps.save(blockProps);


    return (


      <>{children}</>

    );


    //return null;

  }
})