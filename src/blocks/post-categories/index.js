import apiFetch from '@wordpress/api-fetch';
import { InnerBlocks, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"
import { useEntityProp } from '@wordpress/core-data';

import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, subscribe, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Spinner } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { Icon, styles, settings, link, linkOff } from "@wordpress/icons";

import { InspectorControls, BlockControls, AlignmentToolbar, RichText } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'

import IconToggle from '../../components/icon-toggle'
import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import Typography from '../../components/typography'
import PGcssDisplay from '../../components/css-display'
import PGDropdown from '../../components/dropdown'

import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import PGIconPicker from '../../components/icon-picker'
import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'
import PGCssLibrary from '../../components/css-library'




var myStore = wp.data.select('postgrid-shop');




registerBlockType("post-grid/post-categories", {
  apiVersion: 2,
  title: "Post Categories",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><rect fill="#1d4ed8" y="27.61" width="13.97" height="2" /><rect fill="#1d4ed8" x="16.42" y="27.61" width="9.96" height="2" /><rect fill="#1d4ed8" y="22.91" width="36" height="2" /><rect fill="#1d4ed8" y="18.22" width="36" height="2" /><rect fill="#1d4ed8" y="6.39" width="36" height="2.35" /><rect fill="#8db1ff" x="0.07" y="13.09" width="5.42" height="2" /><rect fill="#8db1ff" x="8.3" y="13.09" width="5.42" height="2" /><rect fill="#8db1ff" x="16.53" y="13.09" width="5.42" height="2" /></svg>
    ,
  },
  attributes: {

    wrapper: {
      type: 'object',
      default: {

        options: { class: '', tag: 'div' },
        styles:
        {
          display: {},


          color: { Desktop: '' },

          padding: { Desktop: '' },
          margin: {}
        },
      },
    },
    items: {
      type: 'object',
      default: {

        options: { prefix: '', postfix: '', linkTo: 'termUrl', linkToCustomMeta: '', linkToAuthorMeta: '', customUrl: '', maxCount: 99, postCount: false, class: ' item ', linkTarget: '', linkAttr: [], },
        styles:
        {

          display: {},

          color: { Desktop: '' },

          padding: { Desktop: '' },
          margin: { Desktop: '' },

          fontSize: { Desktop: '' },
          lineHeight: {},
          letterSpacing: {},
          fontFamily: {},
          fontWeight: {},
          textDecoration: {}, //overline, line-through, underline
          textTransform: {},
        },

      },
    },
    icon: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', position: 'beforeFronttext', /*before, after, prefix, postfix */ class: 'icon', },

        styles:
        {
          color: { Desktop: '' },

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
    termTitle: {
      type: 'object',
      default: {

        options: { class: '', text: ', ', },

        styles:
        {

          color: { Desktop: '' },

          padding: { Desktop: '' },
          margin: {}
        },

      },
    },
    separator: {
      type: 'object',
      default: {
        options: { class: '', text: ', ', },
        styles:
        {

          color: { Desktop: '' },
          padding: { Desktop: '' },
          margin: {}
        },

      },
    },
    postCount: {
      type: 'object',
      default: {
        options: { class: '', text: ', ', },
        styles:
        {

          color: { Desktop: '' },
          padding: { Desktop: '' },
          margin: {}
        },

      },
    },


    frontText: {
      type: 'object',
      default: {

        options: { text: 'Categories: ', class: '', },
        styles:
        {

          color: { Desktop: '' },

          padding: { Desktop: '' },
          margin: { Desktop: '' },

          fontSize: { Desktop: '' },
          lineHeight: {},
          letterSpacing: {},
          fontFamily: {},
          fontWeight: {},
          textDecoration: {}, //overline, line-through, underline
          textTransform: {},
        },

      },
    },


    customCss: {
      "type": "string",
      "default": ''
    },

    blockCssY: {
      "type": "object",
      "default": { items: {} }
    },

    blockId: {
      "type": "string",
      "default": ''
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
    var items = attributes.items;
    var separator = attributes.separator;
    var frontText = attributes.frontText;
    var icon = attributes.icon;
    var termTitle = attributes.termTitle;

    var blockCssY = attributes.blockCssY;

    var customCss = attributes.customCss;


    var postId = context['postId'];
    var postType = context['postType'];

    //const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    var breakPointX = myStore.getBreakPoint();


    const CustomTagWrapper = `${wrapper.options.tag}`;

    // Wrapper CSS Class Selectors
    const wrapperSelector = blockClass;
    const itemSelector = blockClass + ' .item';
    const termTitleSelector = blockClass + ' .termTitle';

    const separatorSelector = blockClass + ' .separator';
    const frontTextSelector = blockClass + ' .frontText';
    const postCountSelector = blockClass + ' .postCount';
    const iconSelector = blockClass + ' .icon';

    // var breakPointList = [];

    // for (var x in breakPoints) {

    //   var item = breakPoints[x];
    //   breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    // }


    var dummyCats = [
      { "id": 1, "count": 1, "description": "", "link": "#", "name": "Category 1", "slug": "category-1", "taxonomy": "category_tax", },
      { "id": 2, "count": 1, "description": "", "link": "#", "name": "Category 2", "slug": "category-2", "taxonomy": "category_tax", },
      { "id": 3, "count": 1, "description": "", "link": "#", "name": "Category 3", "slug": "category-3", "taxonomy": "category_tax", },
      { "id": 4, "count": 1, "description": "", "link": "#", "name": "Category 4", "slug": "category-4", "taxonomy": "category_tax", },
      { "id": 5, "count": 1, "description": "", "link": "#", "name": "Category 5", "slug": "category-5", "taxonomy": "category_tax", },
      { "id": 6, "count": 1, "description": "", "link": "#", "name": "Category 6", "slug": "category-6", "taxonomy": "category_tax", },

    ]


    useEffect(() => {

      setAttributes({ blockId: blockIdX });

      // setAttributes({ postTitle: postTitle });
      // setAttributes({ wrapper: wrapper });


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [clientId]);





    const [categoryCount, setcategoryCount] = useState(0); // Using the hook.
    const [postCategoriesData, setPostCategoriesData] = useState([]); // Using the hook.

    const [categories, setCategories] = useState([]); // Using the hook.

    const [
      postCategoriesX,
      setPostCategoriesX,
    ] = useEntityProp('postType', postType, 'categories', postId);

    // console.log(postCategoriesX);



    var iconPositonArgsBasic = {

      none: { label: 'Choose Position', value: '' },
      beforeFronttext: { label: 'Before Front text', value: 'beforeFronttext' },
      afterFronttext: { label: 'After Front text', value: 'afterFronttext' },
      beforeItems: { label: 'Before Items', value: 'beforeItems' },
      afterItems: { label: 'After Items', value: 'afterItems' },
      beforeItem: { label: 'Before Each Items', value: 'beforeItem', isPro: true },
      afterItem: { label: 'After Each Items', value: 'afterItem', isPro: true },
    };

    let iconPositonArgs = applyFilters('iconPositonArgs', iconPositonArgsBasic);

    var linkToArgsBasic = {
      noUrl: { label: 'No URL', value: '' },
      termUrl: { label: 'Term URL', value: 'termUrl' },

      postUrl: { label: 'Post URL', value: 'postUrl' },
      homeUrl: { label: 'Home URL', value: 'homeUrl' },
      authorUrl: { label: 'Author URL', value: 'authorUrl' },
      authorLink: { label: 'Author Link', value: 'authorLink' },
      authorMail: { label: 'Author Mail', value: 'authorMail', isPro: true },
      authorMeta: { label: 'Author Meta', value: 'authorMeta', isPro: true },
      customField: { label: 'Custom Field', value: 'customField', isPro: true },
      customUrl: { label: 'Custom URL', value: 'customUrl', isPro: true },
    };

    let linkToArgs = linkToArgsBasic;

    function setFieldLinkTo(option, index) {

      var options = { ...items.options, linkTo: option.value };
      setAttributes({ items: { ...items, options: options } });

    }

    function setIconPosition(option, index) {

      var options = { ...icon.options, position: option.value };
      setAttributes({ icon: { ...icon, options: options } });

    }


    useEffect(() => {


      setPostCategoriesData([]);
      setCategories([]);

      setcategoryCount(categories.length - 1);
      if (postCategoriesX != undefined) {
        for (var x in postCategoriesX) {

          var catId = postCategoriesX[x]
          var assd = x;

          if (x) {
            apiFetch({
              path: '/wp/v2/categories/' + catId,
              method: 'GET',
            }).then((res) => {

              setPostCategoriesData(current => [...current, res]);
              setCategories(current => [...current, res]);

            });
          }
        }
      } else {


        setPostCategoriesData(dummyCats);
        setCategories(dummyCats);

      }



    }, [postCategoriesX]);





    useEffect(() => {

      var asdasd = postCategoriesData.slice(0, items.options.maxCount);

      setCategories(asdasd);

    }, [postCategoriesData]);





    useEffect(() => {

      if (postCategoriesX != undefined && postCategoriesX.length > 0) {
        var maxCount = (items.options.maxCount.length > 0) ? items.options.maxCount : 99;

        setcategoryCount(categories.length - 1);
        var asdasd = postCategoriesData.slice(0, maxCount);

        setCategories(asdasd);
      } else {


        var asdasd = dummyCats.slice(0, maxCount);

        setCategories(asdasd);

      }




    }, [items]);


    const [iconHtml, setIconHtml] = useState('');

    useEffect(() => {

      var iconSrc = icon.options.iconSrc;

      var iconHtml = `<span class="${iconSrc}"></span>`;

      setIconHtml(iconHtml);




    }, [icon]);








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




    function onPickCssLibraryItems(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        items[sudoScource] = sudoScourceArgs;
      })

      var itemsX = Object.assign({}, items);
      setAttributes({ items: itemsX });

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


    function onPickCssLibrarySeparator(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        separator[sudoScource] = sudoScourceArgs;
      })

      var separatorX = Object.assign({}, separator);
      setAttributes({ separator: separatorX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, separatorSelector);


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



    function onPickCssLibraryFrontText(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        frontText[sudoScource] = sudoScourceArgs;
      })

      var frontTextX = Object.assign({}, frontText);
      setAttributes({ frontText: frontTextX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, frontTextSelector);


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







    function onChangeStyleItems(sudoScource, newVal, attr) {


      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, items);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ items: object });

      var elementSelector = myStore.getElementSelector(sudoScource, itemSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });



    }


    function onRemoveStyleItems(sudoScource, key) {





      var object = myStore.deletePropertyDeep(items, [sudoScource, key, breakPointX]);
      setAttributes({ items: object });

      var elementSelector = myStore.getElementSelector(sudoScource, itemSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }


    function onAddStyleItems(sudoScource, key) {



      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, items);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ items: object });


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





    function onChangeStyleFrontText(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, frontText);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ frontText: object });

      var elementSelector = myStore.getElementSelector(sudoScource, frontTextSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStyleFrontText(sudoScource, key) {

      var object = myStore.deletePropertyDeep(frontText, [sudoScource, key, breakPointX]);
      setAttributes({ frontText: object });

      var elementSelector = myStore.getElementSelector(sudoScource, frontTextSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }


    function onAddStyleFrontText(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, frontText);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ frontText: object });




    }


    function onChangeStyleSeparator(sudoScource, newVal, attr) {


      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, separator);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ separator: object });

      var elementSelector = myStore.getElementSelector(sudoScource, separatorSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStyleSeparator(sudoScource, key) {



      var object = myStore.deletePropertyDeep(separator, [sudoScource, key, breakPointX]);
      setAttributes({ separator: object });

      var elementSelector = myStore.getElementSelector(sudoScource, separatorSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }


    function onAddStyleSeparator(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, separator);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ separator: object });

    }

    //
    function onChangeStyleTermTitle(sudoScource, newVal, attr) {


      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, termTitle);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ termTitle: object });

      var elementSelector = myStore.getElementSelector(sudoScource, termTitleSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStyleTermTitle(sudoScource, key) {



      var object = myStore.deletePropertyDeep(termTitle, [sudoScource, key, breakPointX]);
      setAttributes({ termTitle: object });

      var elementSelector = myStore.getElementSelector(sudoScource, termTitleSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }


    function onAddStyleTermTitle(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, termTitle);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ termTitle: object });

    }







    function onChangeIcon(arg) {




      var options = { ...icon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
      setAttributes({ icon: { ...icon, options: options } });

    }


    useEffect(() => {


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);



    var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.


    useEffect(() => {
      linkAttrObj();
      ;
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);




    }, [items]);


    var linkAttrObj = () => {

      var sdsd = {};

      items.options.linkAttr.map(x => {

        if (x.val)
          sdsd[x.id] = x.val;

      })

      setlinkAttrItems(sdsd);

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

    function onBulkAddItems(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, items);
      obj[sudoScource] = cssObj;

      setAttributes({ items: obj });

      var selector = myStore.getElementSelector(sudoScource, itemsSelector);
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

    function onBulkAddFrontText(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, frontText);
      obj[sudoScource] = cssObj;

      setAttributes({ frontText: obj });

      var selector = myStore.getElementSelector(sudoScource, frontTextSelector);
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


    function onBulkAddSeperator(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]s
      let obj = Object.assign({}, separator);
      obj[sudoScource] = cssObj;

      setAttributes({ separator: obj });

      var selector = myStore.getElementSelector(sudoScource, separatorSelector);
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










    const post = useSelect((select) =>
      select('core').getEntityRecord('postType', context['postType'], context['postId'])
    );

    const termstaxonomy = useSelect((select) =>
      select('core').getEntityRecords('taxonomy', 'category', [4, 5])

    );











    const blockProps = useBlockProps({
      className: ` ${blockId} pg-post-categories`,

    });



    return (
      <>
        <InspectorControls >
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
                      setAttributes({ wrapper: { ...wrapper, options: options } });



                    }

                    }
                  />
                </PanelRow>


                {/* <PanelRow>
                  <label for="">Wrapper Class</label>
                  <InputControl
                    value={wrapper.options.class}
                    onChange={(newVal) => {
                      var options = { ...wrapper.options, class: newVal };
                      setAttributes({ wrapper: { ...wrapper, options: options } });
                    }}
                  />
                </PanelRow> */}
              </PGtab>
              <PGtab name="styles">
                <PGStyles obj={wrapper} onChange={onChangeStyleWrapper} onAdd={onAddStyleWrapper} onBulkAdd={onBulkAddWrapper} onRemove={onRemoveStyleWrapper} />
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



                <ToggleControl
                  label="Display Post Count"
                  help={items.options.postCount ? 'Post Count Enabled' : 'Post Count Disabled'}
                  checked={items.options.postCount ? true : false}
                  onChange={(e) => {


                    var options = { ...items.options, postCount: items.options.postCount ? false : true };
                    setAttributes({ items: { ...items, options: options } });



                  }}
                />

                <PanelRow>
                  <label for="">Item Class</label>



                  <InputControl
                    value={items.options.class}
                    onChange={(newVal) => {


                      var options = { ...items.options, class: newVal };
                      setAttributes({ items: { ...items, options: options } });

                    }

                    }
                  />


                </PanelRow>


                <PanelRow>
                  <label for="">Max Count</label>

                  <InputControl
                    value={items.options.maxCount}
                    onChange={(newVal) => {


                      var options = { ...items.options, maxCount: newVal };
                      setAttributes({ items: { ...items, options: options } });



                    }




                    }
                  />
                </PanelRow>


                <PanelRow>
                  <label for="">Link To</label>

                  <PGDropdown position="bottom right" variant="secondary" options={linkToArgs} buttonTitle={(items.options.linkTo == undefined || items.options.linkTo.length == 0) ? 'Choose' : (linkToArgs[items.options.linkTo] == undefined) ? '' : linkToArgs[items.options.linkTo].label} onChange={setFieldLinkTo} values={[]}></PGDropdown>

                </PanelRow>




                {items.options.linkTo != undefined && items.options.linkTo.length > 0 && (

                  <>

                    {items.options.linkTo == 'authorMeta' && (

                      <PanelRow>
                        <label for="">Author Meta Key</label>

                        <InputControl
                          value={items.options.linkToAuthorMeta}
                          onChange={(newVal) => {


                            var options = { ...items.options, linkToAuthorMeta: newVal };
                            setAttributes({ items: { ...items, options: options } });

                          }}
                        />

                      </PanelRow>

                    )}


                    {items.options.linkTo == 'customField' && (

                      <PanelRow>
                        <label for="">Custom Meta Key</label>

                        <InputControl
                          value={items.options.linkToAuthorMeta}
                          onChange={(newVal) => {

                            var options = { ...items.options, linkToAuthorMeta: newVal };
                            setAttributes({ items: { ...items, options: options } });

                          }}
                        />

                      </PanelRow>

                    )}



                    {items.options.linkTo == 'customUrl' && (


                      <PanelRow>
                        <label for="">Custom Url</label>

                        <div className='relative'>
                          <Button className={(linkPickerPosttitle) ? "!bg-gray-400" : ''} icon={link} onClick={ev => {

                            setLinkPickerPosttitle(prev => !prev);

                          }}></Button>
                          {items.options.customUrl.length > 0 && (
                            <Button className='!text-red-500 ml-2' icon={linkOff} onClick={ev => {

                              var options = { ...items.options, customUrl: '' };
                              setAttributes({ items: { ...items, options: options } });
                              setLinkPickerPosttitle(false);



                            }}></Button>

                          )}
                          {linkPickerPosttitle && (
                            <Popover position="bottom right">
                              <LinkControl settings={[]} value={items.options.customUrl} onChange={newVal => {

                                var options = { ...items.options, customUrl: newVal.url };

                                setAttributes({ items: { ...items, options: options } });

                              }} />

                              <div className='p-2'><span className='font-bold'>Linked to:</span> {(items.options.customUrl.length != 0) ? items.options.customUrl : 'No link'} </div>
                            </Popover>

                          )}


                        </div>
                      </PanelRow>
                    )}





                    <PanelRow>
                      <label for="">Link Target</label>

                      <SelectControl
                        label=""
                        value={items.options.linkTarget}
                        options={[
                          { label: '_self', value: '_self' },
                          { label: '_blank', value: '_blank' },
                          { label: '_parent', value: '_parent' },
                          { label: '_top', value: '_top' },


                        ]}
                        onChange={(newVal) => {


                          var options = { ...items.options, linkTarget: newVal };
                          setAttributes({ items: { ...items, options: options } });


                        }



                        }
                      />
                    </PanelRow>









                  </>



                )}


                <PanelRow>
                  <label for="">Prefix</label>

                  <InputControl
                    value={items.options.prefix}
                    onChange={(newVal) => {



                      var options = { ...items.options, prefix: newVal };
                      setAttributes({ items: { ...items, options: options } });





                    }
                    }
                  />
                </PanelRow>

                <PanelRow>
                  <label for="">Postfix</label>
                  <InputControl
                    value={items.options.postfix}
                    onChange={(newVal) => {


                      var options = { ...items.options, postfix: newVal };
                      setAttributes({ items: { ...items, options: options } });


                    }}
                  />
                </PanelRow>




                <PanelRow>
                  <label for="">Custom Attributes</label>
                  <div
                    className=' cursor-pointer px-3 text-white py-1 bg-blue-600'
                    onClick={(ev) => {
                      var sdsd = items.options.linkAttr.concat({ id: '', val: '' })
                      var options = { ...items.options, linkAttr: sdsd };
                      setAttributes({ items: { ...items, options: options } });
                      linkAttrObj()
                    }}
                  >Add</div>
                </PanelRow>



                {
                  items.options.linkAttr.length > 0 && items.options.linkAttr.map((x, i) => {

                    return (

                      <div className='my-2'>
                        <PanelRow>
                          <InputControl
                            placeholder="Name"
                            className='mr-2'
                            value={items.options.linkAttr[i].id}
                            onChange={(newVal) => {
                              items.options.linkAttr[i].id = newVal;
                              var ssdsd = items.options.linkAttr.concat([]);
                              var options = { ...items.options, linkAttr: ssdsd };
                              setAttributes({ items: { ...items, options: options } });

                            }}
                          />

                          <InputControl
                            className='mr-2'
                            placeholder="Value"
                            value={x.val}
                            onChange={(newVal) => {
                              items.options.linkAttr[i].val = newVal
                              var ssdsd = items.options.linkAttr.concat([]);
                              var options = { ...items.options, linkAttr: ssdsd };
                              setAttributes({ items: { ...items, options: options } });

                            }}
                          />
                          <span className='text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close'
                            onClick={(ev) => {

                              items.options.linkAttr.splice(i, 1);
                              var ssdsd = items.options.linkAttr.concat([]);
                              var options = { ...items.options, linkAttr: ssdsd };
                              setAttributes({ items: { ...items, options: options } });
                            }}

                          ></span>
                        </PanelRow>
                      </div>
                    )
                  })
                }




              </PGtab>
              <PGtab name="styles">
                <PGStyles obj={items} onChange={onChangeStyleItems} onAdd={onAddStyleItems} onBulkAdd={onBulkAddItems} onRemove={onRemoveStyleItems} />
              </PGtab>

              <PGtab name="css">
                <PGCssLibrary blockId={blockId} obj={items} onChange={onPickCssLibraryItems} />
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


                  <PGDropdown position="bottom right" variant="secondary" options={iconPositonArgs} buttonTitle={icon.options.position.length == 0 ? 'Choose' : iconPositonArgs[icon.options.position].label}
                    onChange={setIconPosition} values={[]}></PGDropdown>


                </PanelRow>

              </PGtab>
              <PGtab name="styles">
                <PGStyles obj={icon} onChange={onChangeStyleIcon} onAdd={onAddStyleIcon} onBulkAdd={onBulkAddIcon} onRemove={onRemoveStyleIcon} />
              </PGtab>
              <PGtab name="css">
                <PGCssLibrary blockId={blockId} obj={icon} onChange={onPickCssLibraryIcon} />
              </PGtab>
            </PGtabs>




          </PanelBody>

          <PanelBody title="Front Text" initialOpen={false}>



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
                  <label for="">Front Text</label>

                  <InputControl
                    value={frontText.options.text}
                    onChange={(newVal) => {

                      var options = { ...frontText.options, text: newVal };
                      setAttributes({ frontText: { ...frontText, options: options } });


                    }}
                  />
                </PanelRow>

              </PGtab>
              <PGtab name="styles">
                <PGStyles obj={frontText} onChange={onChangeStyleFrontText} onAdd={onAddStyleFrontText} onBulkAdd={onBulkAddFrontText} onRemove={onRemoveStyleFrontText} />
              </PGtab>
              <PGtab name="css">
                <PGCssLibrary blockId={blockId} obj={frontText} onChange={onPickCssLibraryFrontText} />
              </PGtab>
            </PGtabs>





          </PanelBody>
          <PanelBody title="Separator" initialOpen={false}>


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
                  <label for="">Separator</label>
                  <InputControl
                    value={separator.options.text}
                    onChange={(newVal) => {

                      var options = { ...separator.options, text: newVal };
                      setAttributes({ separator: { ...separator, options: options } });


                    }}
                  />
                </PanelRow>
              </PGtab>
              <PGtab name="styles">
                <PGStyles obj={separator} onChange={onChangeStyleSeparator} onAdd={onAddStyleSeparator} onBulkAdd={onBulkAddSeperator} onRemove={onRemoveStyleSeparator} />
              </PGtab>
              <PGtab name="css">
                <PGCssLibrary blockId={blockId} obj={separator} onChange={onPickCssLibrarySeparator} />
              </PGtab>
            </PGtabs>






          </PanelBody>

          <PanelBody title="Term Title" initialOpen={false}>
            <PGtabs
              activeTab="styles"
              orientation="horizontal"
              activeClass="active-tab"
              onSelect={(tabName) => { }}
              tabs={[

                {
                  name: 'styles',
                  title: 'Styles',
                  icon: styles,
                  className: 'tab-style',
                },
                {
                  name: 'options',
                  title: 'Options',
                  icon: settings,
                  className: 'tab-settings',
                },

              ]}
            >

              <PGtab name="styles">
                <PGStyles obj={termTitle} onChange={onChangeStyleTermTitle} onAdd={onAddStyleTermTitle} onBulkAdd={onBulkAddSeperator} onRemove={onRemoveStyleTermTitle} />
              </PGtab>
              <PGtab name="options">

              </PGtab>

            </PGtabs>






          </PanelBody>

          <div className=''>




            <div>




              <PanelBody title="Custom Style" initialOpen={false}>

                <p>Please use following class selector to apply your custom CSS</p>
                <div className='my-3'>
                  <p className='font-bold'>Items Wrapper</p>
                  <p><code>{wrapperSelector}{'{/* your CSS here*/}'}</code></p>
                </div>

                <div className='my-3'>
                  <p className='font-bold'>Caetgory Items</p>
                  <p><code>{itemSelector}{'{}'} </code></p>
                  <p><code>.pg-postCategories a{'{/* your CSS here*/}'}</code></p>
                </div>

                <div className='my-3'>
                  <p className='font-bold'>Separator</p>
                  <p><code>{separatorSelector}{'{/* your CSS here*/}'} </code></p>
                </div>

                <div className='my-3'>
                  <p className='font-bold'>Front Text</p>
                  <p><code>{frontTextSelector}{'{/* your CSS here*/}'} </code></p>
                </div>

                <div className='my-3'>
                  <p className='font-bold'>Post Count</p>
                  <p><code>{postCountSelector}{'{/* your CSS here*/}'} </code></p>
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
                <PGContactSupport utm={{ utm_source: 'BlockPostTitle', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />

              </div>

            </div>



          </div>

        </InspectorControls >

        <>
          {JSON.stringify(postCategoriesX)}



          {categories.length == 0 && (<div {...blockProps}>No Categories Found</div>)}

          {categories.length > 0 && (

            <CustomTagWrapper {...blockProps}>

              {icon.options.position == 'beforeFronttext' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}
              <span className='frontText '>
                <RawHTML>{frontText.options.text}</RawHTML>
              </span>


              {icon.options.position == 'afterFronttext' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}

              {icon.options.position == 'beforeItems' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}
              {categories.map((x, index) => {


                return (
                  <>

                    {items.options.linkTo != undefined && items.options.linkTo.length == 0 && (
                      <span title={x.name} {...linkAttrItems} className={items.options.class} >

                        {icon.options.position == 'beforeItem' && (
                          <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                        )}
                        <span className='termTitle'>{items.options.prefix}{x.name}{items.options.postfix}</span>
                        {items.options.postCount == true && (<span className='postCount'>({x.count})</span>)}
                        {icon.options.position == 'afterItem' && (
                          <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                        )}

                      </span>
                    )}
                    {items.options.linkTo != undefined && items.options.linkTo.length > 0 && (
                      <a onClick={ev => ev.preventDefault()} target={items.options.linkTarget} title={x.name} {...linkAttrItems} className={items.options.class} href={x.link}>


                        {icon.options.position == 'beforeItem' && (
                          <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                        )}
                        <span className='termTitle'>{items.options.prefix}{x.name}{items.options.postfix}</span>
                        {items.options.postCount == true && (<span className='postCount'>({x.count})</span>)}
                        {icon.options.position == 'afterItem' && (
                          <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                        )}

                      </a>
                    )}

                    {categories.length > (index + 1) && (<span className='separator' dangerouslySetInnerHTML={{ __html: separator.options.text }}></span>)}

                  </>

                )



              })}

              {icon.options.position == 'afterItems' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}

            </CustomTagWrapper>


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