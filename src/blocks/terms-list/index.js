import apiFetch from '@wordpress/api-fetch';
import { useEntityProp } from '@wordpress/core-data';

import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, subscribe, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Spinner } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
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
import PGDropdown from '../../components/dropdown'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import PGcssDisplay from '../../components/css-display'
import PGIconPicker from '../../components/icon-picker'


import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'



var myStore = wp.data.select('postgrid-shop');




registerBlockType("post-grid/terms-list", {
  title: "Terms List",
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

        options: { class: 'inline-block' },
        styles:
        {

          color: {},
          backgroundColor: {},

        },
      },
    },


    taxonomies: {
      type: 'object',
      default: {

        options: { taxName: '' },

      },
    },

    items: {
      type: 'object',
      default: {

        options: {
          prefix: '', postfix: '',
          viewType: 'list', // inline, grid, list, accordion
          hierarchicaly: false,
          queryPosts: false,
          accordionOpen: false,
          linkToTerm: false,
          postCountPosition: 'beforeTitle', //beforeTitle, afterTtile, afterPosts, beforePosts
          postCountText: 'Total Posts %s',
          gridColNumber: {},
          gridColGap: '15px',
          gridRowGap: '15px',

          hideEmpty: false,


          maxCount: 99, postCount: false, class: 'item inline-block', linkTarget: '', linkAttr: [],
        },
        styles:
        {
          color: {},
          backgroundColor: {},


          fontSize: {}, //{ val: '18', unit: 'px' }

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
          backgroundColor: {},
          fontSize: {}, //{ val: '18', unit: 'px' }

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
          backgroundColor: {},

        },

      },
    },
    frontText: {
      type: 'object',
      default: {

        options: { text: 'Tags: ', class: 'inline-block', },
        styles:
        {
          color: {},
          backgroundColor: {},


          fontSize: {}, //{ val: '18', unit: 'px' }

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
    var taxonomies = attributes.taxonomies;


    var postId = context['postId'];
    var postType = context['postType'];

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    const [postObjects, setPostObjects] = useState([]);


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



    const [categoryCount, setcategoryCount] = useState(0); // Using the hook.
    const [postCategoriesData, setPostCategoriesData] = useState([]); // Using the hook.

    const [categories, setCategories] = useState([]); // Using the hook.

    const [
      postCategoriesX,
      setPostCategoriesX,
    ] = useEntityProp('postType', postType, taxonomies.options.taxName, postId);




    var dummyCats = [
      { "id": 1, "count": 1, "description": "", "link": "#", "name": "Category 1", "slug": "category-1", "taxonomy": "category_tax", },
      {
        "id": 2, "count": 1, "description": "", "link": "#", "name": "Category 2", "slug": "category-2", "taxonomy": "category_tax",
        children: [
          { "id": 21, "count": 1, "description": "", "link": "#", "name": "Child Category 1", "slug": "category-3", "taxonomy": "category_tax", },
          { "id": 22, "count": 1, "description": "", "link": "#", "name": "Child Category 2", "slug": "category-3", "taxonomy": "category_tax", },
          { "id": 23, "count": 1, "description": "", "link": "#", "name": "Child Category 3", "slug": "category-3", "taxonomy": "category_tax", },
        ],
        posts: [
          { "link": "#", "name": "Post Title 1", },
          { "link": "#", "name": "Post Title 2", },
          { "link": "#", "name": "Post Title 3", },
        ],

      },
      { "id": 3, "count": 1, "description": "", "link": "#", "name": "Category 3", "slug": "category-3", "taxonomy": "category_tax", },
      { "id": 4, "count": 1, "description": "", "link": "#", "name": "Category 4", "slug": "category-4", "taxonomy": "category_tax", },
      { "id": 5, "count": 1, "description": "", "link": "#", "name": "Category 5", "slug": "category-5", "taxonomy": "category_tax", },
      { "id": 6, "count": 1, "description": "", "link": "#", "name": "Category 6", "slug": "category-6", "taxonomy": "category_tax", },

    ]


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
              path: '/wp/v2/' + taxonomies.options.taxName + '/' + catId,
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

      var maxCount = (items.options.maxCount.length > 0) ? items.options.maxCount : 99;


      if (postCategoriesX != undefined && postCategoriesX.length > 0) {


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


    function setTaxonomy(option, index) {


      var options = { ...taxonomies.options, taxName: option.id };
      setAttributes({ taxonomies: { ...taxonomies, options: options } });



      // var attrExist = false;

      // var data = queryPrams[index];
      // var multiple = data.multiple;

      // var isExist = queryArgs.items.map((item) => {

      //   if (item.id == index) {
      //     return true;
      //   }
      // })


      // var items = queryArgs.items.concat([data])
      // setAttributes({ queryArgs: { items: items } });

    }

    useEffect(() => {

      setAttributes({ blockId: blockIdX });

      // setAttributes({ postTitle: postTitle });
      // setAttributes({ wrapper: wrapper });


      apiFetch({
        path: '/post-grid/v2/post_type_objects',
        method: 'POST',
        data: { postTypes: [postType] },
      }).then((res) => {

        setPostObjects(res);


      });

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [clientId]);



    function onChangeIcon(arg) {




      var options = { ...icon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
      setAttributes({ icon: { ...icon, options: options } });

    }








    function onChangeStyleWrapper(sudoScource, newVal, attr) {

      var sudoScourceX = { ...wrapper[sudoScource] }
      var elementSelector = wrapperSelector;

      if (sudoScource == 'styles') {
        elementSelector = wrapperSelector;
      }

      else if (sudoScource == 'hover') {
        elementSelector = wrapperSelector + ':hover';
      } else if (sudoScource == 'after') {
        elementSelector = wrapperSelector + ':after';
      } else if (sudoScource == 'before') {
        elementSelector = wrapperSelector + ':before';
      } else if (sudoScource == 'first-child') {
        elementSelector = wrapperSelector + ':first-child';
      } else if (sudoScource == 'last-child') {
        elementSelector = wrapperSelector + ':last-child';
      } else if (sudoScource == 'visited') {
        elementSelector = wrapperSelector + ':visited';
      } else if (sudoScource == 'selection') {
        elementSelector = wrapperSelector + ':selection';
      } else if (sudoScource == 'first-letter') {
        elementSelector = wrapperSelector + '::first-letter';
      } else if (sudoScource == 'first-line') {
        elementSelector = wrapperSelector + '::first-line';
      }
      else {
        elementSelector = wrapperSelector + ':' + sudoScource;
      }

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
      setAttributes({ wrapper: { ...wrapper } });
    }


    function onRemoveStyleWrapper(sudoScource, key) {
      var sudoScourceX = { ...wrapper[sudoScource] }
      if (sudoScourceX[key] != undefined) {
        delete sudoScourceX[key];
      }

      wrapper[sudoScource] = sudoScourceX;
      setAttributes({ wrapper: { ...wrapper } });

      if (blockCssY.items[wrapperSelector] == undefined) {
        blockCssY.items[wrapperSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {
        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[wrapperSelector][argAttr] = argAttrVal;
      })


      if (blockCssY.items[wrapperSelector][key] != undefined) {
        delete blockCssY.items[wrapperSelector][key];
      }


      setAttributes({ blockCssY: { items: blockCssY.items } });
    }


    function onAddStyleWrapper(sudoScource, key) {
      var sudoScourceX = { ...wrapper[sudoScource] }
      sudoScourceX[key] = {};
      wrapper[sudoScource] = sudoScourceX;
      setAttributes({ wrapper: { ...wrapper } });
    }







    function onChangeStyleItems(sudoScource, newVal, attr) {

      var sudoScourceX = { ...items[sudoScource] }
      var elementSelector = itemSelector;

      if (sudoScource == 'styles') {
        elementSelector = itemSelector;
      }

      else if (sudoScource == 'hover') {
        elementSelector = itemSelector + ':hover';
      } else if (sudoScource == 'after') {
        elementSelector = itemSelector + ':after';
      } else if (sudoScource == 'before') {
        elementSelector = itemSelector + ':before';
      } else if (sudoScource == 'first-child') {
        elementSelector = itemSelector + ':first-child';
      } else if (sudoScource == 'last-child') {
        elementSelector = itemSelector + ':last-child';
      } else if (sudoScource == 'visited') {
        elementSelector = itemSelector + ':visited';
      } else if (sudoScource == 'selection') {
        elementSelector = itemSelector + ':selection';
      } else if (sudoScource == 'first-letter') {
        elementSelector = itemSelector + '::first-letter';
      } else if (sudoScource == 'first-line') {
        elementSelector = itemSelector + '::first-line';
      }
      else {
        elementSelector = itemSelector + ':' + sudoScource;
      }

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
      setAttributes({ items: { ...items } });
    }


    function onRemoveStyleItems(sudoScource, key) {
      var sudoScourceX = { ...items[sudoScource] }
      if (sudoScourceX[key] != undefined) {
        delete sudoScourceX[key];
      }

      items[sudoScource] = sudoScourceX;
      setAttributes({ items: { ...items } });

      if (blockCssY.items[itemSelector] == undefined) {
        blockCssY.items[itemSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {
        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[itemSelector][argAttr] = argAttrVal;
      })


      if (blockCssY.items[itemSelector][key] != undefined) {
        delete blockCssY.items[itemSelector][key];
      }


      setAttributes({ blockCssY: { items: blockCssY.items } });
    }


    function onAddStyleItems(sudoScource, key) {
      var sudoScourceX = { ...items[sudoScource] }
      sudoScourceX[key] = {};
      items[sudoScource] = sudoScourceX;
      setAttributes({ items: { ...items } });
    }





    function onChangeStyleIcon(sudoScource, newVal, attr) {

      var sudoScourceX = { ...icon[sudoScource] }
      var elementSelector = iconSelector;

      if (sudoScource == 'styles') {
        elementSelector = iconSelector;
      }

      else if (sudoScource == 'hover') {
        elementSelector = iconSelector + ':hover';
      } else if (sudoScource == 'after') {
        elementSelector = iconSelector + ':after';
      } else if (sudoScource == 'before') {
        elementSelector = iconSelector + ':before';
      } else if (sudoScource == 'first-child') {
        elementSelector = iconSelector + ':first-child';
      } else if (sudoScource == 'last-child') {
        elementSelector = iconSelector + ':last-child';
      } else if (sudoScource == 'visited') {
        elementSelector = iconSelector + ':visited';
      } else if (sudoScource == 'selection') {
        elementSelector = iconSelector + ':selection';
      } else if (sudoScource == 'first-letter') {
        elementSelector = iconSelector + '::first-letter';
      } else if (sudoScource == 'first-line') {
        elementSelector = iconSelector + '::first-line';
      }
      else {
        elementSelector = iconSelector + ':' + sudoScource;
      }

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
      setAttributes({ icon: { ...icon } });
    }


    function onRemoveStyleIcon(sudoScource, key) {
      var sudoScourceX = { ...icon[sudoScource] }
      if (sudoScourceX[key] != undefined) {
        delete sudoScourceX[key];
      }

      icon[sudoScource] = sudoScourceX;
      setAttributes({ icon: { ...icon } });

      if (blockCssY.items[iconSelector] == undefined) {
        blockCssY.items[iconSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {
        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[iconSelector][argAttr] = argAttrVal;
      })


      if (blockCssY.items[iconSelector][key] != undefined) {
        delete blockCssY.items[iconSelector][key];
      }


      setAttributes({ blockCssY: { items: blockCssY.items } });
    }


    function onAddStyleIcon(sudoScource, key) {
      var sudoScourceX = { ...icon[sudoScource] }
      sudoScourceX[key] = {};
      icon[sudoScource] = sudoScourceX;
      setAttributes({ icon: { ...icon } });
    }





    function onChangeStyleFrontText(sudoScource, newVal, attr) {

      var sudoScourceX = { ...frontText[sudoScource] }
      var elementSelector = frontTextSelector;

      if (sudoScource == 'styles') {
        elementSelector = frontTextSelector;
      }

      else if (sudoScource == 'hover') {
        elementSelector = frontTextSelector + ':hover';
      } else if (sudoScource == 'after') {
        elementSelector = frontTextSelector + ':after';
      } else if (sudoScource == 'before') {
        elementSelector = frontTextSelector + ':before';
      } else if (sudoScource == 'first-child') {
        elementSelector = frontTextSelector + ':first-child';
      } else if (sudoScource == 'last-child') {
        elementSelector = frontTextSelector + ':last-child';
      } else if (sudoScource == 'visited') {
        elementSelector = frontTextSelector + ':visited';
      } else if (sudoScource == 'selection') {
        elementSelector = frontTextSelector + ':selection';
      } else if (sudoScource == 'first-letter') {
        elementSelector = frontTextSelector + '::first-letter';
      } else if (sudoScource == 'first-line') {
        elementSelector = frontTextSelector + '::first-line';
      }
      else {
        elementSelector = frontTextSelector + ':' + sudoScource;
      }

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
      setAttributes({ frontText: { ...frontText } });
    }


    function onRemoveStyleFrontText(sudoScource, key) {
      var sudoScourceX = { ...frontText[sudoScource] }
      if (sudoScourceX[key] != undefined) {
        delete sudoScourceX[key];
      }

      frontText[sudoScource] = sudoScourceX;
      setAttributes({ frontText: { ...frontText } });

      if (blockCssY.items[frontTextSelector] == undefined) {
        blockCssY.items[frontTextSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {
        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[frontTextSelector][argAttr] = argAttrVal;
      })

      if (blockCssY.items[separatorSelector][key] != undefined) {
        delete blockCssY.items[separatorSelector][key];
      }



      setAttributes({ blockCssY: { items: blockCssY.items } });
    }


    function onAddStyleFrontText(sudoScource, key) {
      var sudoScourceX = { ...frontText[sudoScource] }
      sudoScourceX[key] = {};
      frontText[sudoScource] = sudoScourceX;
      setAttributes({ frontText: { ...frontText } });
    }







    function onChangeStyleSeparator(sudoScource, newVal, attr) {

      var sudoScourceX = { ...separator[sudoScource] }
      var elementSelector = separatorSelector;

      if (sudoScource == 'styles') {
        elementSelector = separatorSelector;
      }

      else if (sudoScource == 'hover') {
        elementSelector = separatorSelector + ':hover';
      } else if (sudoScource == 'after') {
        elementSelector = separatorSelector + ':after';
      } else if (sudoScource == 'before') {
        elementSelector = separatorSelector + ':before';
      } else if (sudoScource == 'first-child') {
        elementSelector = separatorSelector + ':first-child';
      } else if (sudoScource == 'last-child') {
        elementSelector = separatorSelector + ':last-child';
      } else if (sudoScource == 'visited') {
        elementSelector = separatorSelector + ':visited';
      } else if (sudoScource == 'selection') {
        elementSelector = separatorSelector + ':selection';
      } else if (sudoScource == 'first-letter') {
        elementSelector = separatorSelector + '::first-letter';
      } else if (sudoScource == 'first-line') {
        elementSelector = separatorSelector + '::first-line';
      }
      else {
        elementSelector = separatorSelector + ':' + sudoScource;
      }

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
      setAttributes({ separator: { ...separator } });
    }


    function onRemoveStyleSeparator(sudoScource, key) {
      var sudoScourceX = { ...separator[sudoScource] }
      if (sudoScourceX[key] != undefined) {
        delete sudoScourceX[key];
      }

      separator[sudoScource] = sudoScourceX;
      setAttributes({ separator: { ...separator } });

      if (blockCssY.items[separatorSelector] == undefined) {
        blockCssY.items[separatorSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {
        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[separatorSelector][argAttr] = argAttrVal;
      })


      if (blockCssY.items[separatorSelector][key] != undefined) {
        delete blockCssY.items[separatorSelector][key];
      }

      setAttributes({ blockCssY: { items: blockCssY.items } });
    }


    function onAddStyleSeparator(sudoScource, key) {
      var sudoScourceX = { ...separator[sudoScource] }
      sudoScourceX[key] = {};
      separator[sudoScource] = sudoScourceX;
      setAttributes({ separator: { ...separator } });
    }




    var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.



    useEffect(() => {

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);

    }, [blockCssY]);









    useEffect(() => {
      linkAttrObj();
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

    if (wp.data.dispatch('core/edit-post') == null) {
      const {
        __experimentalSetPreviewDeviceType: setPreviewDeviceType,

      } = wp.data.dispatch('core/edit-widgets')
    } else {
      const {
        __experimentalSetPreviewDeviceType: setPreviewDeviceType,

      } = wp.data.dispatch('core/edit-post')
    }




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
        myStore.generateBlockCss(blockCssY.items, blockId, customCss);
      });



    }


    return (
      [


        <div>

          <BlockControls >

          </BlockControls>


          <InspectorControls key="general">

            <div className='px-3'>

              <PanelRow>
                <label for="">Select Taxonomy</label>
                <PGDropdown position="bottom right" variant="secondary" options={postObjects} buttonTitle="Choose" onChange={setTaxonomy} values={taxonomies.options.taxName}></PGDropdown>

              </PanelRow>


              <PanelRow>
                <label for="">Custom Taxonomy</label>
                <InputControl
                  value={taxonomies.options.taxName}
                  onChange={(newVal) => {

                    var options = { ...taxonomies.options, taxName: newVal };
                    setAttributes({ taxonomies: { ...taxonomies, options: options } });

                  }}
                />

              </PanelRow>

            </div>

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

                  <PanelRow>
                    <label for="">View Type</label>
                    <SelectControl
                      label=""
                      value={items.options.viewType}
                      options={[
                        { label: 'Accordion', value: 'accordion' },
                        { label: 'Inline', value: 'inline' },
                        { label: 'Grid', value: 'grid' },
                        { label: 'List', value: 'list' },
                      ]}
                      onChange={(newVal) => {
                        var options = { ...items.options, viewType: newVal };
                        setAttributes({ items: { ...items, options: options } });
                      }
                      }
                    />
                  </PanelRow>






                  <PanelRow>
                    <label for="">Query Posts</label>
                    <SelectControl
                      label=""
                      value={items.options.queryPosts}
                      options={[
                        { label: 'True', value: 1 },
                        { label: 'False', value: 0 },

                      ]}
                      onChange={(newVal) => {
                        var options = { ...items.options, queryPosts: newVal };
                        setAttributes({ items: { ...items, options: options } });
                      }
                      }
                    />
                  </PanelRow>

                  <PanelRow>
                    <label for="">Hide Empty Terms</label>
                    <SelectControl
                      label=""
                      value={items.options.hideEmpty}
                      options={[
                        { label: 'True', value: 1 },
                        { label: 'False', value: 0 },

                      ]}
                      onChange={(newVal) => {
                        var options = { ...items.options, hideEmpty: newVal };
                        setAttributes({ items: { ...items, options: options } });
                      }
                      }
                    />
                  </PanelRow>




                  {items.options.viewType == 'accordion' && (
                    <PanelRow>
                      <label for="">Accordion Open</label>
                      <SelectControl
                        label=""
                        value={items.options.accordionOpen}
                        options={[
                          { label: 'True', value: 1 },
                          { label: 'False', value: 0 },
                        ]}
                        onChange={(newVal) => {
                          var options = { ...items.options, accordionOpen: newVal };
                          setAttributes({ items: { ...items, options: options } });
                        }
                        }
                      />
                    </PanelRow>
                  )}



                  {items.options.viewType == 'grid' && (
                    <>
                      <PanelRow>
                        <label for="">Post Count Position</label>
                        <SelectControl
                          label=""
                          value={items.options.postCountPosition}
                          options={[
                            { label: 'Before Title', value: 'beforeTitle' },
                            { label: 'After Ttile', value: 'afterTtile' },
                            { label: 'Before Posts', value: 'beforePosts' },

                            { label: 'After Posts', value: 'afterPosts' },
                          ]}
                          onChange={(newVal) => {
                            var options = { ...items.options, postCountPosition: newVal };
                            setAttributes({ items: { ...items, options: options } });
                          }
                          }
                        />
                      </PanelRow>

                      <PanelRow>
                        <label for="">Post Count Text</label>
                        <InputControl
                          value={items.options.postCountText}
                          onChange={(newVal) => {


                            var options = { ...items.options, postCountText: newVal };
                            setAttributes({ items: { ...items, options: options } });

                          }

                          }
                        />
                      </PanelRow>


                      <PanelRow className='my-3'>
                        <label>Column Count</label>
                        <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                      </PanelRow>
                      <PanelRow>
                        <InputControl
                          value={(items.options.gridColNumber[breakPointX] != undefined ? items.options.gridColNumber[breakPointX].val : 1)}
                          type="number"
                          onChange={(newVal) => {

                            var newValuesObj = {};
                            if (Object.keys(items.options.gridColNumber).length == 0) {
                              newValuesObj[breakPointX] = { val: newVal, unit: 'fr' };
                            } else {
                              var unit = (newValuesObj[breakPointX] != undefined) ? newValuesObj[breakPointX].unit : 'fr';

                              newValuesObj = items.options.gridColNumber;
                              newValuesObj[breakPointX] = { val: newVal, unit: unit };
                            }


                            var options = { ...items.options, gridColNumber: newValuesObj };
                            setAttributes({ items: { ...items, options: options } });


                          }}

                        />
                        <SelectControl className='mb-0'
                          value={(items.options.gridColNumber[breakPointX] != undefined) ? items.options.gridColNumber[breakPointX].unit : 'fr'}
                          options={[
                            { label: 'fr', value: 'fr' },
                            { label: 'px', value: 'px' },
                            { label: '%', value: '%' },
                            { label: 'em', value: 'em' },
                          ]}
                          onChange={(newVal) => {

                            var newValuesObj = {};
                            if (Object.keys(items.options.gridColNumber).length == 0) {
                              newValuesObj[breakPointX] = { val: 1, unit: newVal };
                            } else {
                              var val = (newValuesObj[breakPointX] != undefined) ? newValuesObj[breakPointX].val : 'fr';

                              newValuesObj = items.options.gridColNumber;
                              newValuesObj[breakPointX] = { val: val, unit: newVal };
                            }


                            var options = { ...items.options, gridColNumber: newValuesObj };
                            setAttributes({ items: { ...items, options: options } });


                          }}
                        />


                      </PanelRow>






                    </>
                  )}





                  <PanelRow>
                    <label for="">Link To Term</label>
                    <SelectControl
                      label=""
                      value={items.options.linkToTerm}
                      options={[
                        { label: 'True', value: 1 },
                        { label: 'False', value: 0 },
                      ]}
                      onChange={(newVal) => {
                        var options = { ...items.options, linkToTerm: newVal };
                        setAttributes({ items: { ...items, options: options } });
                      }
                      }
                    />
                  </PanelRow>


                  {items.options.viewType == 'accordion' || items.options.viewType == 'list' && (

                    <PanelRow>
                      <label for="">Hierarchicaly</label>
                      <SelectControl
                        label=""
                        value={items.options.hierarchicaly}
                        options={[
                          { label: 'True', value: 1 },
                          { label: 'False', value: 0 },
                        ]}
                        onChange={(newVal) => {
                          var options = { ...items.options, hierarchicaly: newVal };
                          setAttributes({ items: { ...items, options: options } });
                        }
                        }
                      />
                    </PanelRow>
                  )}







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
                              className='mr-2'
                              placeholder="Name"
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
                    <label for="">Icon postion</label>

                    <SelectControl
                      label=""
                      value={icon.options.position}
                      options={[

                        { label: 'Choose Position', value: '' },

                        { label: 'Before Front text', value: 'beforeFronttext' },
                        { label: 'After Front text', value: 'afterFronttext' },
                        { label: 'Before Items', value: 'beforeItems' },
                        { label: 'After Items', value: 'afterItems' },

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
                  <PGStyles obj={wrapper} onChange={onChangeStyleFrontText} onAdd={onAddStyleFrontText} onRemove={onRemoveStyleFrontText} />
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
                  <PGStyles obj={wrapper} onChange={onChangeStyleSeparator} onAdd={onAddStyleSeparator} onRemove={onRemoveStyleSeparator} />
                </PGtab>
              </PGtabs>




            </PanelBody>






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



          </InspectorControls >
        </div >
        ,


        <>


          {taxonomies.options.taxName.length == 0 && (

            <div>
              <PanelRow>
                <label for="">Select Taxonomy</label>
                <PGDropdown position="bottom right" variant="secondary" options={postObjects} buttonTitle="Choose" onChange={setTaxonomy} values={taxonomies.options.taxName}></PGDropdown>

              </PanelRow>


              <PanelRow>
                <label for="">Custom Taxonomy</label>
                <InputControl
                  value={taxonomies.options.taxName}
                  onChange={(newVal) => {

                    var options = { ...taxonomies.options, taxName: newVal };
                    setAttributes({ taxonomies: { ...taxonomies, options: options } });

                  }}
                />

              </PanelRow>



            </div>

          )}

          {taxonomies.options.taxName.length > 0 && categories.length == 0 && (<div>No Terms Found</div>)}

          {taxonomies.options.taxName.length > 0 && categories.length > 0 && (

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
                  <a onClick={ev => ev.preventDefault()} target={items.options.linkTarget} title={x.name} {...linkAttrItems} className={items.options.class} href={x.link}>
                    <span className='termTitle'>{items.options.prefix}{x.name}{items.options.postfix}</span>
                    {items.options.postCount == true && (<span className='postCount'>({x.count})</span>)}
                    {categories.length > (index + 1) && (<span className='separator'>{separator.options.text} </span>)}
                  </a>
                )



              })}
              {icon.options.position == 'afterItems' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}
            </div>


          )}

          <p>Live Preview is not avilable at the moment, please visit page and see it.</p>


        </>
      ]

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})