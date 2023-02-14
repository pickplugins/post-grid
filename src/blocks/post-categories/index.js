import apiFetch from '@wordpress/api-fetch';
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




var myStore = wp.data.select('postgrid-shop');




registerBlockType("post-grid/post-categories", {
  title: "Post Categories",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:
      <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M38 209.5C38 206.739 40.2386 204.5 43 204.5H483C485.761 204.5 488 206.739 488 209.5V259.5C488 262.261 485.761 264.5 483 264.5H43C40.2386 264.5 38 262.261 38 259.5V209.5Z" />
        <path d="M38 315.5C38 312.739 40.2386 310.5 43 310.5H365C367.761 310.5 370 312.739 370 315.5V365.5C370 368.261 367.761 370.5 365 370.5H43C40.2386 370.5 38 368.261 38 365.5V315.5Z" />
        <path d="M129.861 115.454C128.257 117.058 127.356 119.233 127.356 121.501C127.356 123.769 128.257 125.944 129.861 127.548C131.465 129.151 133.64 130.052 135.908 130.052C138.176 130.052 140.351 129.151 141.955 127.548C143.558 125.944 144.459 123.769 144.459 121.501C144.459 119.233 143.558 117.058 141.955 115.454C140.351 113.85 138.176 112.949 135.908 112.949C133.64 112.949 131.465 113.85 129.861 115.454ZM71.4472 153.066C68.5447 153.066 65.6018 151.977 63.3443 149.72C61.1271 147.503 59.9983 144.6 60.0386 141.657V101.344C60.0386 98.4418 61.1271 95.4989 63.3443 93.2817C65.5615 91.0645 68.4641 89.9357 71.4472 89.9357L127.805 89.9357C130.788 89.9357 133.69 91.0645 135.908 93.2817L156.064 113.438C160.539 117.913 160.539 125.089 156.064 129.563L135.908 149.72C133.69 151.937 130.788 153.066 127.885 153.066H71.4472ZM110.712 161.128V169.191H55.322C52.3792 169.231 49.4363 168.062 47.2191 165.845C45.0019 163.628 43.8731 160.725 43.8731 157.823L43.8731 114.446L51.9357 114.446L52.2582 160.806L110.712 161.128Z" />
      </svg>
    ,
  },
  attributes: {

    wrapper: {
      type: 'object',
      default: {

        options: { class: '' },
        styles:
        {
          display: {},


          color: {},
          bgColor: {},
          padding: {},
          margin: {}
        },
      },
    },
    items: {
      type: 'object',
      default: {

        options: { prefix: '', postfix: '', maxCount: 99, postCount: false, class: ' item ', linkTarget: '', linkAttr: [], },
        styles:
        {

          display: {},

          color: {},
          bgColor: {},
          padding: {},
          margin: {},

          fontSize: {}, //{ val: '18', unit: 'px' }
          lineHeight: {}, // { val: '18', unit: 'px' }
          letterSpacing: {}, // { val: '18', unit: 'px' }
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
          color: {},
          bgColor: {},
          padding: {},
          margin: {},

          display: {},

          fontSize: {}, //{ val: '18', unit: 'px' }
          lineHeight: {}, // { val: '18', unit: 'px' }
          fontWeight: { "Desktop": "700" },
          textDecoration: {}, //overline, line-through, underline
        },
      },
    },
    termTitle: {
      type: 'object',
      default: {

        options: { class: 'inline-block', text: ', ', },

        styles:
        {

          color: {},
          bgColor: {},
          padding: {},
          margin: {}
        },

      },
    },
    separator: {
      type: 'object',
      default: {

        options: { class: 'inline-block', text: ', ', },

        styles:
        {

          color: {},
          bgColor: {},
          padding: {},
          margin: {}
        },

      },
    },
    frontText: {
      type: 'object',
      default: {

        options: { text: 'Categories: ', class: 'inline-block', },
        styles:
        {

          color: {},
          bgColor: {},
          padding: {},
          margin: {},

          fontSize: {}, //{ val: '18', unit: 'px' }
          lineHeight: {}, // { val: '18', unit: 'px' }
          letterSpacing: {}, // { val: '18', unit: 'px' }
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

    var blockCssY = attributes.blockCssY;

    var customCss = attributes.customCss;


    var postId = context['postId'];
    var postType = context['postType'];

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());


    // Wrapper CSS Class Selectors
    const wrapperSelector = blockClass;
    const itemSelector = blockClass + ' .item';
    const itemTitleSelector = blockClass + ' .termTitle';

    const separatorSelector = blockClass + ' .separator';
    const frontTextSelector = blockClass + ' .frontText';
    const postCountSelector = blockClass + ' .postCount';
    const iconSelector = blockClass + ' .icon';

    var breakPointList = [];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }


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

      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [clientId]);





    const [categoryCount, setcategoryCount] = useState(0); // Using the hook.
    const [postCategoriesData, setPostCategoriesData] = useState([]); // Using the hook.

    const [categories, setCategories] = useState([]); // Using the hook.

    const [
      postCategoriesX,
      setPostCategoriesX,
    ] = useEntityProp('postType', postType, 'categories', postId);



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



    function setIconPosition(option, index) {

      var options = { ...icon.options, position: option.value };
      setAttributes({ icon: { ...icon, options: options } });

    }


    useEffect(() => {


      setPostCategoriesData([]);
      setCategories([]);

      setcategoryCount(categories.length - 1);
      if (postCategoriesX != undefined) {
        for (x in postCategoriesX) {

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

      // var path = sudoScource + '.' + attr + '.' + breakPointX
      // let obj = Object.assign({}, wrapper);
      // const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      // setAttributes({ wrapper: updatedObj });
      // var sudoScourceX = { ...updatedObj[sudoScource] }



      // var elementSelector = myStore.getElementSelector(sudoScource, wrapperSelector);


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







    function onChangeStyleItems(sudoScource, newVal, attr) {


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
      // let obj = Object.assign({}, items);
      // const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      // setAttributes({ items: updatedObj });
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


    function onRemoveStyleItems(sudoScource, key) {





      var object = myStore.deletePropertyDeep(items, [sudoScource, key, breakPointX]);
      setAttributes({ items: object });

      var elementSelector = myStore.getElementSelector(sudoScource, itemSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


      // var sudoScourceX = { ...items[sudoScource] }
      // if (sudoScourceX[key] != undefined) {
      //   delete sudoScourceX[key];
      // }

      // items[sudoScource] = sudoScourceX;
      // setAttributes({ items: { ...items } });

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


    function onAddStyleItems(sudoScource, key) {
      // var sudoScourceX = { ...items[sudoScource] }
      // sudoScourceX[key] = {};
      // items[sudoScource] = sudoScourceX;
      // setAttributes({ items: { ...items } });


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, items);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ items: object });


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





    function onChangeStyleFrontText(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, frontText);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ frontText: object });

      var elementSelector = myStore.getElementSelector(sudoScource, frontTextSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

      // var path = sudoScource + '.' + attr + '.' + breakPointX
      // let obj = Object.assign({}, frontText);
      // const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      // setAttributes({ frontText: updatedObj });
      // var sudoScourceX = { ...updatedObj[sudoScource] }



      // var elementSelector = myStore.getElementSelector(sudoScource, frontTextSelector);


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


    function onRemoveStyleFrontText(sudoScource, key) {

      var object = myStore.deletePropertyDeep(frontText, [sudoScource, key, breakPointX]);
      setAttributes({ frontText: object });

      var elementSelector = myStore.getElementSelector(sudoScource, frontTextSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



      // var sudoScourceX = { ...frontText[sudoScource] }
      // if (sudoScourceX[key] != undefined) {
      //   delete sudoScourceX[key];
      // }

      // frontText[sudoScource] = sudoScourceX;
      // setAttributes({ frontText: { ...frontText } });

      // if (blockCssY.items[frontTextSelector] == undefined) {
      //   blockCssY.items[frontTextSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {
      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[frontTextSelector][argAttr] = argAttrVal;
      // })


      // if (blockCssY.items[frontTextSelector][key] != undefined) {
      //   delete blockCssY.items[frontTextSelector][key];
      // }


      // setAttributes({ blockCssY: { items: blockCssY.items } });
    }


    function onAddStyleFrontText(sudoScource, key) {
      // var sudoScourceX = { ...frontText[sudoScource] }
      // sudoScourceX[key] = {};
      // frontText[sudoScource] = sudoScourceX;
      // setAttributes({ frontText: { ...frontText } });

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

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

      // var path = sudoScource + '.' + attr + '.' + breakPointX
      // let obj = Object.assign({}, separator);
      // const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      // setAttributes({ separator: updatedObj });
      // var sudoScourceX = { ...updatedObj[sudoScource] }




      // var elementSelector = myStore.getElementSelector(sudoScource, separatorSelector);


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


    function onRemoveStyleSeparator(sudoScource, key) {



      var object = myStore.deletePropertyDeep(separator, [sudoScource, key, breakPointX]);
      setAttributes({ separator: object });

      var elementSelector = myStore.getElementSelector(sudoScource, separatorSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


      // var sudoScourceX = { ...separator[sudoScource] }
      // if (sudoScourceX[key] != undefined) {
      //   delete sudoScourceX[key];
      // }

      // separator[sudoScource] = sudoScourceX;
      // setAttributes({ separator: { ...separator } });

      // if (blockCssY.items[separatorSelector] == undefined) {
      //   blockCssY.items[separatorSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {
      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[separatorSelector][argAttr] = argAttrVal;
      // })


      // if (blockCssY.items[separatorSelector][key] != undefined) {
      //   delete blockCssY.items[separatorSelector][key];
      // }


      // setAttributes({ blockCssY: { items: blockCssY.items } });
    }


    function onAddStyleSeparator(sudoScource, key) {
      // var sudoScourceX = { ...separator[sudoScource] }
      // sudoScourceX[key] = {};
      // separator[sudoScource] = sudoScourceX;
      // setAttributes({ separator: { ...separator } });



      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, separator);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ separator: object });

    }



















    function paddingControlItems(nextValues) {



      var responsive = items.styles.padding;
      responsive[breakPointX] = nextValues;

      var styles = { ...items.styles, padding: responsive };
      setAttributes({ items: { ...items, styles: styles } });


      blockCssY.items[itemSelector] = (blockCssY.items[itemSelector] != undefined) ? blockCssY.items[itemSelector] : {};


      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;





      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[itemSelector]['padding-top'] != undefined) ? blockCssY.items[itemSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[itemSelector]['padding-right'] != undefined) ? blockCssY.items[itemSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[itemSelector]['padding-bottom'] != undefined) ? blockCssY.items[itemSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[itemSelector]['padding-left'] != undefined) ? blockCssY.items[itemSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });



    }





    function marginControlItems(nextValues) {


      var responsive = items.styles.margin;
      responsive[breakPointX] = nextValues;


      var styles = { ...items.styles, margin: responsive };
      setAttributes({ items: { ...items, styles: styles } });

      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[itemSelector] = (blockCssY.items[itemSelector] != undefined) ? blockCssY.items[itemSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[itemSelector]['margin-top'] != undefined) ? blockCssY.items[itemSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-top': marginTop };
      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[itemSelector]['margin-right'] !== undefined) ? blockCssY.items[itemSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[itemSelector]['margin-bottom'] !== undefined) ? blockCssY.items[itemSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[itemSelector]['margin-left'] !== undefined) ? blockCssY.items[itemSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-left': marginLeft };

      }

      setAttributes({ blockCssY: { items: blockCssY.items } });
    }





    function onChangeTypo(typoX) {

      setAttributes({ items: { ...items, styles: typoX } });

      var newValuesObjX = {};


      if (typoX.fontFamily[breakPointX] != undefined) {

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'font-family': typoX.fontFamily };

      }


      if (typoX.fontSize[breakPointX] != undefined) {

        var fontSizeVal = (typoX.fontSize[breakPointX].val) ? typoX.fontSize[breakPointX].val : 16;
        var fontSizeUnit = (typoX.fontSize[breakPointX].unit) ? typoX.fontSize[breakPointX].unit : 'px';


        var fontSizeX = (blockCssY.items[itemSelector] != undefined) ? blockCssY.items[itemSelector]['font-size'] : {};

        fontSizeX[breakPointX] = fontSizeVal + fontSizeUnit;
        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'font-size': fontSizeX };

      }



      if (typoX.lineHeight[breakPointX] != undefined) {

        var lineHeightVal = (typoX.lineHeight[breakPointX].val) ? typoX.lineHeight[breakPointX].val : 0;
        var lineHeightUnit = (typoX.lineHeight[breakPointX].unit) ? typoX.lineHeight[breakPointX].unit : 'px';


        var lineHeightX = (blockCssY.items[itemSelector]['line-height'] != undefined) ? blockCssY.items[itemSelector]['line-height'] : {};

        lineHeightX[breakPointX] = lineHeightVal + lineHeightUnit;

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'line-height': lineHeightX };
      }
      if (typoX.letterSpacing[breakPointX] != undefined) {

        var letterSpacingVal = (typoX.letterSpacing[breakPointX].val) ? typoX.letterSpacing[breakPointX].val : 0;
        var letterSpacingUnit = (typoX.letterSpacing[breakPointX].unit) ? typoX.letterSpacing[breakPointX].unit : 'px';



        var letterSpacingX = (blockCssY.items[itemSelector]['letter-spacing'] != undefined) ? blockCssY.items[itemSelector]['letter-spacing'] : {};

        letterSpacingX[breakPointX] = letterSpacingVal + letterSpacingUnit;

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'letter-spacing': letterSpacingX };
      }

      if (typoX.fontWeight[breakPointX] != undefined) {

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'font-weight': typoX.fontWeight };

      }


      if (typoX.textDecoration[breakPointX] != undefined) {

        var str = {};

        var textDecorationX = typoX.textDecoration[breakPointX];
        var textDecorationXStr = (textDecorationX.length > 0) ? textDecorationX.join(' ') : '';

        str[breakPointX] = textDecorationXStr;

        //typoX.textDecoration[breakPointX] = typoX.textDecoration[breakPointX].join(' ');

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'text-decoration': str };

      }
      if (typoX.textTransform[breakPointX] != undefined) {

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'text-transform': typoX.textTransform };


      }

      setAttributes({ blockCssY: { items: blockCssY.items } });



    }


    function onChangeIcon(arg) {




      var options = { ...icon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
      setAttributes({ icon: { ...icon, options: options } });

    }




    function onChangeIconTypo(typoX) {





      setAttributes({ icon: { ...icon, styles: typoX } });

      var newValuesObjX = {};
      var itemsX = blockCssY.items;





      if (typoX.fontSize[breakPointX] != undefined) {

        var fontSizeVal = (typoX.fontSize[breakPointX].val) ? typoX.fontSize[breakPointX].val : 16;
        var fontSizeUnit = (typoX.fontSize[breakPointX].unit) ? typoX.fontSize[breakPointX].unit : 'px';


        var fontSizeX = (blockCssY.items[iconSelector] != undefined) ? blockCssY.items[iconSelector]['font-size'] : {};
        if (fontSizeX[breakPointX] == undefined) {

          fontSizeX[breakPointX] = '';
        }
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

    function onChangeTypoFrontText(typoX) {

      setAttributes({ frontText: { ...frontText, styles: typoX } });

      var newValuesObjX = {};


      if (typoX.fontFamily[breakPointX] != undefined) {

        blockCssY.items[frontTextSelector] = { ...blockCssY.items[frontTextSelector], 'font-family': typoX.fontFamily };

      }


      if (typoX.fontSize[breakPointX] != undefined) {

        var fontSizeVal = (typoX.fontSize[breakPointX].val) ? typoX.fontSize[breakPointX].val : 16;
        var fontSizeUnit = (typoX.fontSize[breakPointX].unit) ? typoX.fontSize[breakPointX].unit : 'px';


        var fontSizeX = (blockCssY.items[frontTextSelector]['font-size'] != undefined) ? blockCssY.items[frontTextSelector]['font-size'] : {};

        fontSizeX[breakPointX] = fontSizeVal + fontSizeUnit;
        blockCssY.items[frontTextSelector] = { ...blockCssY.items[frontTextSelector], 'font-size': fontSizeX };

      }



      if (typoX.lineHeight[breakPointX] != undefined) {

        var lineHeightVal = (typoX.lineHeight[breakPointX].val) ? typoX.lineHeight[breakPointX].val : 0;
        var lineHeightUnit = (typoX.lineHeight[breakPointX].unit) ? typoX.lineHeight[breakPointX].unit : 'px';


        var lineHeightX = (blockCssY.items[frontTextSelector]['line-height'] != undefined) ? blockCssY.items[frontTextSelector]['line-height'] : {};

        lineHeightX[breakPointX] = lineHeightVal + lineHeightUnit;

        blockCssY.items[frontTextSelector] = { ...blockCssY.items[frontTextSelector], 'line-height': lineHeightX };
      }
      if (typoX.letterSpacing[breakPointX] != undefined) {

        var letterSpacingVal = (typoX.letterSpacing[breakPointX].val) ? typoX.letterSpacing[breakPointX].val : 0;
        var letterSpacingUnit = (typoX.letterSpacing[breakPointX].unit) ? typoX.letterSpacing[breakPointX].unit : 'px';



        var letterSpacingX = (blockCssY.items[frontTextSelector]['letter-spacing'] != undefined) ? blockCssY.items[frontTextSelector]['letter-spacing'] : {};

        letterSpacingX[breakPointX] = letterSpacingVal + letterSpacingUnit;

        blockCssY.items[frontTextSelector] = { ...blockCssY.items[frontTextSelector], 'letter-spacing': letterSpacingX };
      }

      if (typoX.fontWeight[breakPointX] != undefined) {

        blockCssY.items[frontTextSelector] = { ...blockCssY.items[frontTextSelector], 'font-weight': typoX.fontWeight };

      }


      if (typoX.textDecoration[breakPointX] != undefined) {

        var str = {};

        var textDecorationX = typoX.textDecoration[breakPointX];
        var textDecorationXStr = (textDecorationX.length > 0) ? textDecorationX.join(' ') : '';

        str[breakPointX] = textDecorationXStr;

        //typoX.textDecoration[breakPointX] = typoX.textDecoration[breakPointX].join(' ');

        blockCssY.items[frontTextSelector] = { ...blockCssY.items[frontTextSelector], 'text-decoration': str };

      }
      if (typoX.textTransform[breakPointX] != undefined) {

        blockCssY.items[frontTextSelector] = { ...blockCssY.items[frontTextSelector], 'text-transform': typoX.textTransform };


      }

      setAttributes({ blockCssY: { items: blockCssY.items } });



    }















    useEffect(() => {

      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);



    function generateBlockCssY() {


      var reponsiveCssGroups = {};


      for (var selector in blockCssY.items) {



        var attrs = blockCssY.items[selector];


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



      //return false;


      var reponsiveCssMobile = '';

      if (reponsiveCssGroups['Mobile'] != undefined) {

        reponsiveCssMobile += '@media only screen and (min-width: 0px) and (max-width: 360px){';

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



      var reponsiveCssTablet = '';

      if (reponsiveCssGroups['Tablet'] != undefined) {
        reponsiveCssTablet += '@media only screen and (min-width: 361px) and (max-width: 780px){';

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

      var reponsiveCssDesktop = '';


      if (reponsiveCssGroups['Desktop'] != undefined) {
        reponsiveCssDesktop += '@media only screen and (min-width: 781px){';

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
        reponsiveCssDesktop += '}';



      }


      var reponsiveCss = reponsiveCssMobile + reponsiveCssTablet + reponsiveCssDesktop;



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















    var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.





    useEffect(() => {
      linkAttrObj();
      //generateBlockCssY();
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




    const colors = [
      { name: '9DD6DF', color: '#9DD6DF' },
      { name: '18978F', color: '#18978F' },
      { name: 'A084CF', color: '#A084CF' },
      { name: 'DFBB9D', color: '#DFBB9D' },
      { name: '774360', color: '#774360' },
      { name: '3AB0FF', color: '#3AB0FF' },
      { name: '51557E', color: '#51557E' },


    ];





    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType,

    } = wp.data.dispatch('core/edit-post')





    const post = useSelect((select) =>
      select('core').getEntityRecord('postType', context['postType'], context['postId'])
    );

    const termstaxonomy = useSelect((select) =>
      select('core').getEntityRecords('taxonomy', 'category', [4, 5])

    );







    function onChangeBreakPoint(x, index) {


      setPreviewDeviceType(x.value)
      var asdsdsd = wp.data.dispatch('postgrid-shop').setBreakPoint(x.value)

      asdsdsd.then((res) => {

        setBreakPointX(res.breakpoint);
        //generateBlockCssY()
        myStore.generateBlockCss(blockCssY.items, blockId, customCss);
      });



    }


    return (
      [


        <div>

          <BlockControls >

          </BlockControls>


          <InspectorControls key="general">


            <PanelBody title="Items Wrapper" initialOpen={false}>


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
                    <label for="">Wrapper Class</label>
                    <InputControl
                      value={wrapper.options.class}
                      onChange={(newVal) => {
                        var options = { ...wrapper.options, class: newVal };
                        setAttributes({ wrapper: { ...wrapper, options: options } });
                      }}
                    />
                  </PanelRow>
                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={wrapper} onChange={onChangeStyleWrapper} onAdd={onAddStyleWrapper} onRemove={onRemoveStyleWrapper} />
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
                  <PGStyles obj={items} onChange={onChangeStyleItems} onAdd={onAddStyleItems} onRemove={onRemoveStyleItems} />
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
                  <PGStyles obj={icon} onChange={onChangeStyleIcon} onAdd={onAddStyleIcon} onRemove={onRemoveStyleIcon} />
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
                  <PGStyles obj={frontText} onChange={onChangeStyleFrontText} onAdd={onAddStyleFrontText} onRemove={onRemoveStyleFrontText} />
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
                  <PGStyles obj={separator} onChange={onChangeStyleSeparator} onAdd={onAddStyleSeparator} onRemove={onRemoveStyleSeparator} />
                </PGtab>
              </PGtabs>






            </PanelBody>

            <div className=''>


              {/* <BreakpointToggle onChange={onChangeBreakPoint} /> */}









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



            </div >

          </InspectorControls >
        </div >
        ,


        <>


          {categories.length == 0 && (<div>No Categories Found</div>)}

          {categories.length > 0 && (

            <div className={[blockId]}>

              {icon.options.position == 'beforeFronttext' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}
              <span className='frontText inline-block'>
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
                    {categories.length > (index + 1) && (<span className='separator' dangerouslySetInnerHTML={{ __html: separator.options.text }}></span>)}

                  </>

                )



              })}

              {icon.options.position == 'afterItems' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}

            </div>


          )}



        </>
      ]

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})