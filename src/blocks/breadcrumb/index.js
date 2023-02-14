import { registerBlockType } from '@wordpress/blocks'
import apiFetch from '@wordpress/api-fetch';
import { ReactSortable } from "react-sortablejs";

import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { Icon, styles, settings, link, linkOff, close, menu } from "@wordpress/icons";

import { applyFilters } from '@wordpress/hooks';

import { InspectorControls, BlockControls, AlignmentToolbar, RichText } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'

import IconToggle from '../../components/icon-toggle'
import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import PGDropdown from '../../components/dropdown'
import Typography from '../../components/typography'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import PGcssDisplay from '../../components/css-display'
import PGIconPicker from '../../components/icon-picker'

import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'


var myStore = wp.data.select('postgrid-shop');




registerBlockType("post-grid/breadcrumb", {
  title: "Breadcrumb",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:
      <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 249.5C25 246.739 27.2386 244.5 30 244.5H470C472.761 244.5 475 246.739 475 249.5V299.5C475 302.261 472.761 304.5 470 304.5H30C27.2386 304.5 25 302.261 25 299.5V249.5Z" />
        <path d="M25 355.5C25 352.739 27.2386 350.5 30 350.5H470C472.761 350.5 475 352.739 475 355.5V405.5C475 408.261 472.761 410.5 470 410.5H30C27.2386 410.5 25 408.261 25 405.5V355.5Z" />
        <path d="M241 147C241 144.239 243.239 142 246 142H470C472.761 142 475 144.239 475 147V197C475 199.761 472.761 202 470 202H246C243.239 202 241 199.761 241 197V147Z" />
        <path d="M100 132.5C119.569 132.5 135.429 116.72 135.429 97.25C135.429 77.7799 119.569 62 100 62C80.4312 62 64.5714 77.7799 64.5714 97.25C64.5714 116.72 80.4312 132.5 100 132.5ZM124.8 141.312H120.178C114.033 144.121 107.196 145.719 100 145.719C92.8036 145.719 85.9946 144.121 79.8223 141.312H75.2C54.6625 141.312 38 157.891 38 178.325V189.781C38 197.079 43.9509 203 51.2857 203H148.714C156.049 203 162 197.079 162 189.781V178.325C162 157.891 145.337 141.312 124.8 141.312Z" />
      </svg>
    ,
  },


  attributes: {
    wrapper: {
      type: 'object',
      default: {
        options: { tag: 'div', class: '', },
        styles:
        {
          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
        },
      },
    },
    icon: {
      type: 'object',
      default: {
        options: { class: 'icon', position: 'beforeLabel'/*beforeLabel, afterLabel, beforeSeparator, afterSeparator*/ },
        styles:
        {
          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
        },
      },
    },
    label: {
      type: 'object',
      default: {
        options: { class: '', },
        styles:
        {
          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
        },
      },
    },

    separator: {
      type: 'object',
      default: {
        options: { class: '', text: '»', },
        styles:
        {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },
      },
    },

    elements: {
      "type": "object",
      "default": {
        options: {
          linkTarget: '_blank', showLabel: true, showSeparator: true, showIcon: false, iconPositon: 'beforeLabel' // beforeLabel, afterLabel, beforeSeparator, afterSeparator
        },
        styles: {

          color: { Desktop: '#18978F' },
          backgroundColor: {},
          padding: {},
          margin: {
            Desktop: { top: '5px', right: '5px', bottom: '5px', left: '5px' }
          },
          display: {},
          borderRadius: {},

          fontSize: { Desktop: { val: '35' } }, //{ val: '18', unit: 'px' }


        },
        items: [
          {
            id: 'text', label: 'Text', customText: '', url: '',
            siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
            options: {
              text: 'You are here: ',
              showSeparator: true,

            },
            styles: {
              color: {},
              backgroundColor: {},
              padding: {},
              margin: {},
            },

          },
          {
            id: 'homePage', label: 'Home Page Link', customText: '', url: '',
            siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
            options: {
              showSeparator: true,
            },
            styles: {
              color: {},
              backgroundColor: {},
              padding: {},
              margin: {},
            },

          },
          {
            id: 'postTitle', label: 'Post Title', customText: '', url: '',
            siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
            options: {
              showSeparator: true,
            },
            styles: {
              color: {},
              backgroundColor: {},
              padding: {},
              margin: {},
            },

          },
        ],
      } // avatar, name, description, id
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
    var elements = attributes.elements;
    var icon = attributes.icon;
    var label = attributes.label;
    var separator = attributes.separator;


    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    var postId = context['postId'];
    var postType = context['postType'];




    var wrapperSelector = blockClass;
    // Wrapper CSS Class Selectors
    var itemSelector = blockClass + ' .item';
    var itemLinkSelector = blockClass + ' .item a';

    var iconSelector = blockClass + ' .item .icon';
    var labelSelector = blockClass + ' .item .label';
    var separatorSelector = blockClass + ' .item .separator';


    var [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());

    var [loading, setLoading] = useState(false);






    var [
      currentPostUrl,
      setCurrentPostUrl,
    ] = useEntityProp('postType', postType, 'link', postId);

    useEffect(() => {

      setAttributes({ blockId: blockIdX });
      //generateBlockCssY();
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);


      blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'font-size': { "Desktop": "16px" } };

      blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'display': { "Desktop": "inline-block" } };

      blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'list-style': { "Desktop": "none" } };

      blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-right': { "Desktop": "10px" } };
      setAttributes({ blockCssY: { items: blockCssY.items } });








    }, [clientId]);



    useEffect(() => {




      elements.items.map((x, index) => {

        var styles = x.styles;

        Object.entries(styles).map(y => {

          var attrId = y[0];
          var attrVal = y[1]

          if (Object.keys(attrVal).length != 0) {

            var attrIdX = '';

            if (attrId == 'bgColor') {
              attrIdX = 'background-color';
            }
            else if (attrId == 'textAlign') {
              attrIdX = 'text-align';
            }
            else {
              attrIdX = attrId;

            }


            if (blockCssY.items[itemSelector + '.item-' + index + ' a'] == undefined) {
              blockCssY.items[itemSelector + '.item-' + index + ' a'] = {}
              blockCssY.items[itemSelector + '.item-' + index + ' a'][attrIdX] = attrVal;
            } else {
              blockCssY.items[itemSelector + '.item-' + index + ' a'][attrIdX] = attrVal;
            }


            if (blockCssY.items[itemSelector + '.item-' + index] == undefined) {
              blockCssY.items[itemSelector + '.item-' + index] = {}
              blockCssY.items[itemSelector + '.item-' + index][attrIdX] = attrVal;
            } else {
              blockCssY.items[itemSelector + '.item-' + index][attrIdX] = attrVal;
            }



            setAttributes({ blockCssY: { items: blockCssY.items } });







          }


        })


      })

      setTimeout(x => {
        //setAttributes({ blockCssY: { items: newValuesObjX } });
      }, 2000)


    }, [elements]);





    var linkElementsArgsBasic = [


      {
        id: 'text', label: 'Text', customText: 'You are here: ', url: '',

        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          text: 'You are here: ',
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },


      {
        id: 'homePage', label: 'Home Page Link', customText: '%s', url: '',

        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },

      {
        id: 'frontPage', label: 'Front Page Link', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },

      {
        id: 'postsPage', label: 'Posts Page Link', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },

      {
        id: 'postTitle', label: 'Post Title', customText: '%s', url: '',

        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },
      {
        id: 'postAuthor', label: 'Post Author', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },


      {
        id: 'postDate', label: 'Post Date', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          format: 'Y-m-d',
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },
      {
        id: 'postDay', label: 'Post Day', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          format: '',
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },
      {
        id: 'postMonth', label: 'Post Month', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          format: '',
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },

      {
        id: 'postYear', label: 'Post Year', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          format: '',
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },
      {
        id: 'postAncestors', isPro: true, label: 'Post Ancestors', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
          count: '',
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },
      {
        id: 'postId', label: 'Post Id', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },
      {
        id: 'postCategory', label: 'Post Category', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },
      {
        id: 'postTag', label: 'Post Tag', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },
      },
      {
        id: 'postCategories', isPro: true, label: 'Post Categories', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
          maxCount: 3,

        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },
      {
        id: 'postTags', isPro: true, label: 'Post Tags', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
          maxCount: 3,

        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },
      },


      {
        id: 'postTerm', isPro: true, label: 'Post Term', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          taxonomy: '',
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },

      {
        id: 'postTerms', isPro: true, label: 'Post Terms', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          taxonomy: '',
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },




      {
        id: 'termTitle', label: 'Term Title', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },
      {
        id: 'termParents', isPro: true, label: 'Term Parents', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
          count: 0,

        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },
      {
        id: 'termAncestors', isPro: true, label: 'Term Ancestors', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          taxonomy: '',
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },


      {
        id: 'wcShop', label: 'WooCommerce Shop', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },
      },
      {
        id: 'wcAccount', label: 'WooCommerce Account', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },
      },
      {
        id: 'wcCart', label: 'WooCommerce Cart', isPro: true, customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },
      },
      {
        id: 'wcCheckout', label: 'WooCommerce Checkout', isPro: true, customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },
      },


      {
        id: 'searchText', label: 'Search Text', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },
      },

      {
        id: 'archiveTitle', label: 'Archive Title', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },
      },

      {
        id: '404Text', label: '404 Text', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },
      },


      {
        id: 'dateText', label: 'Date Text', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
          format: 'Y-m-d',
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },
      },
      {
        id: 'monthText', label: 'Month Text', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
          format: 'Y-m',
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },
      },

      {
        id: 'yearText', label: 'Year Text', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
          format: 'Y',
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },
      },

      {
        id: 'authorName', label: 'Author Name', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
        },
        styles: {

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},
        },
      },





    ]
    let linkElementsArgs = applyFilters('linkElementsArgs', linkElementsArgsBasic);
    let isProFeature = applyFilters('isProFeature', true);


    function addMedia(option, index) {

      //var isExist = elements.items.find(x => x.label === option.label);


      //if (isExist == undefined) {


      //}

      var elementsX = elements.items.push(option);
      setAttributes({ elements: { ...elements, items: elements.items } });

    }













    var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

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



      // var sudoScourceX = { ...wrapper[sudoScource] }
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
      // setAttributes({ wrapper: { ...wrapper } });
    }






    function onRemoveStyleWrapper(sudoScource, key) {


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




    function onChangeStyleElements(sudoScource, newVal, attr) {


      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, elements);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ elements: object });

      var elementSelector = myStore.getElementSelector(sudoScource, itemSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });




      // var sudoScourceX = { ...elements[sudoScource] }
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
      // setAttributes({ elements: { ...elements } });
    }






    function onRemoveStyleElements(sudoScource, key) {



      var object = myStore.deletePropertyDeep(elements, [sudoScource, key, breakPointX]);
      setAttributes({ elements: object });

      var elementSelector = myStore.getElementSelector(sudoScource, itemSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



      // var sudoScourceX = { ...elements[sudoScource] }
      // if (sudoScourceX[key] != undefined) {
      //   delete sudoScourceX[key];
      // }

      // elements[sudoScource] = sudoScourceX;
      // setAttributes({ elements: { ...elements } });

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





    function onAddStyleElements(sudoScource, key) {
      // var sudoScourceX = { ...elements[sudoScource] }
      // sudoScourceX[key] = {};
      // elements[sudoScource] = sudoScourceX;
      // setAttributes({ elements: { ...elements } });




      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, elements);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ elements: object });


    }




    function onChangeStyleIcon(sudoScource, newVal, attr) {

      // var sudoScourceX = { ...icon[sudoScource] }
      // var elementSelector = iconSelector;
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
      // setAttributes({ icon: { ...icon } });


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
      // var sudoScourceX = { ...icon[sudoScource] }
      // sudoScourceX[key] = {};
      // icon[sudoScource] = sudoScourceX;
      // setAttributes({ icon: { ...icon } });



      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, icon);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ icon: object });
    }



    function onChangeStyleLabel(sudoScource, newVal, attr) {


      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, label);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ label: object });

      var elementSelector = myStore.getElementSelector(sudoScource, labelSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });









      // var sudoScourceX = { ...label[sudoScource] }
      // var elementSelector = myStore.getElementSelector(sudoScource, labelSelector);


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
      // setAttributes({ label: { ...label } });

    }


    function onRemoveStyleLabel(sudoScource, key) {


      var object = myStore.deletePropertyDeep(label, [sudoScource, key, breakPointX]);
      setAttributes({ label: object });

      var elementSelector = myStore.getElementSelector(sudoScource, labelSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });





      // var sudoScourceX = { ...label[sudoScource] }
      // if (sudoScourceX[key] != undefined) {
      //   delete sudoScourceX[key];
      // }

      // label[sudoScource] = sudoScourceX;
      // //sudoScourceX[attr][breakPointX] = newVal;

      // setAttributes({ label: { ...label } });

      // if (blockCssY.items[labelSelector] == undefined) {
      //   blockCssY.items[labelSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {

      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[labelSelector][argAttr] = argAttrVal;

      // })

      // if (blockCssY.items[labelSelector][key] != undefined) {
      //   delete blockCssY.items[labelSelector][key];
      // }


      // setAttributes({ blockCssY: { items: blockCssY.items } });

    }


    function onAddStyleLabel(sudoScource, key) {



      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, label);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ label: object });


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



      // var sudoScourceX = { ...separator[sudoScource] }
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
      // setAttributes({ separator: { ...separator } });

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
      // //sudoScourceX[attr][breakPointX] = newVal;

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


      var responsive = elements.styles.padding;
      responsive[breakPointX] = nextValues;


      var styles = { ...elements.styles, padding: responsive };
      setAttributes({ elements: { ...elements, styles: styles } });


      blockCssY.items[itemSelector] = (blockCssY.items[itemSelector] != undefined) ? blockCssY.items[itemSelector] : {};



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

      var responsive = elements.styles.margin;
      responsive[breakPointX] = nextValues;


      var styles = { ...elements.styles, margin: responsive };
      setAttributes({ elements: { ...elements, styles: styles } });



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

      setAttributes({ elements: { ...elements, styles: typoX } });
      console.log(typoX);



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


        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'text-decoration': str };

      }
      if (typoX.textTransform[breakPointX] != undefined) {

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'text-transform': typoX.textTransform };


      }

      setAttributes({ blockCssY: { items: blockCssY.items } });



    }


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


        <div>

          <BlockControls >

          </BlockControls>


          <InspectorControls key="general">
            <div className='px-3' title="General" initialOpen={false}>



              <div>




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
                            { label: 'No Wrapper', value: '' },

                            { label: 'H1', value: 'h1' },
                            { label: 'H2', value: 'h2' },
                            { label: 'H3', value: 'h3' },
                            { label: 'H4', value: 'h4' },
                            { label: 'H5', value: 'h5' },
                            { label: 'H6', value: 'h6' },
                            { label: 'span', value: 'SPAN' },
                            { label: 'div', value: 'DIV' },
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




                <PanelBody title="Items" initialOpen={true}>


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


                      <div className='my-4'>
                        <PanelRow>
                          <label for="">Add Element</label>
                          <PGDropdown position="bottom right" variant="secondary" options={linkElementsArgs} buttonTitle="Choose" onChange={addMedia} values=""></PGDropdown>
                        </PanelRow>
                      </div>




                      <ReactSortable list={elements.items} handle={'.handle'} setList={(item) => {


                        setAttributes({ elements: { ...elements, items: item } });


                      }}>
                        {elements.items.map((item, index) => (
                          <div key={item.id} className="">

                            <PanelBody title={
                              <>
                                <span className='cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1' onClick={ev => {
                                  var elementsX = elements.items.splice(index, 1);
                                  setAttributes({ elements: { ...elements, items: elements.items } });

                                }}><Icon icon={close} /></span>
                                <span className='handle cursor-pointer hover:bg-blue-500 hover:text-white px-1 py-1'><Icon icon={menu} /></span>


                                <span className='mx-2'>{item.label}</span>

                              </>

                            } initialOpen={false}>

                              <div>
                                <label for="">Custom Label</label>
                                <InputControl
                                  value={item.customText}
                                  placeholder="You Text: %s"
                                  onChange={(newVal) => {

                                    elements.items[index].customText = newVal
                                    setAttributes({ elements: { ...elements, items: elements.items } });
                                  }}
                                />
                                <p>Please use <code>%s</code> for output</p>
                              </div>



                              <div className='my-3'>
                                <label for="">Custom URL</label>
                                <InputControl
                                  value={item.url}
                                  onChange={(newVal) => {

                                    elements.items[index].url = newVal
                                    setAttributes({ elements: { ...elements, items: elements.items } });

                                  }}
                                />
                              </div>

                              {(item.id == 'postTerms' || item.id == 'postTerm') && (
                                <div className='my-3'>
                                  <label for="">Taxonomy</label>
                                  <InputControl
                                    value={item.options.taxonomy}
                                    onChange={(newVal) => {
                                      elements.items[index].options.taxonomy = newVal
                                      setAttributes({ elements: { ...elements, items: elements.items } });
                                    }}
                                  />
                                </div>
                              )}

                              {(item.id == 'termParents' || item.id == 'postAncestors') && (
                                <>
                                  <div className='my-3'>
                                    <label for="">Max Count</label>
                                    <InputControl
                                      value={item.options.count}
                                      onChange={(newVal) => {
                                        elements.items[index].options.count = newVal
                                        setAttributes({ elements: { ...elements, items: elements.items } });
                                      }}
                                    />
                                    <p>Use <code>-</code> (negetive sign) to count from end.</p>
                                  </div>


                                </>







                              )}


                              {(item.id == 'dateText' || item.id == 'monthText' || item.id == 'yearText' || item.id == 'postDate' || item.id == 'postDay' || item.id == 'postMonth' || item.id == 'postYear') && (
                                <div className='my-3'>
                                  <label for="">Date Format</label>
                                  <InputControl
                                    value={item.options.format}
                                    onChange={(newVal) => {
                                      elements.items[index].options.format = newVal
                                      setAttributes({ elements: { ...elements, items: elements.items } });
                                    }}
                                  />
                                </div>
                              )}




                              <PanelRow>
                                <label for="">Choose Icon</label>
                                <PGIconPicker library={item.siteIcon.library} srcType={item.siteIcon.srcType} iconSrc={item.siteIcon.iconSrc} onChange={arg => {


                                  //var options = { ...icon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
                                  //setAttributes({ icon: { ...icon, options: options } });


                                  elements.items[index].siteIcon = { srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc }
                                  setAttributes({ elements: { ...elements, items: elements.items } });




                                }} />
                              </PanelRow>



                              <PanelRow className='my-3'>
                                <label>Color</label>
                                <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                              </PanelRow>


                              <ColorPalette
                                value={elements.items[index].styles.color[breakPointX]}
                                colors={colorsPresets}
                                enableAlpha
                                onChange={(newVal) => {

                                  var newValuesObj = {};


                                  if (Object.keys(elements.items[index].styles.color).length == 0) {
                                    newValuesObj[breakPointX] = newVal;
                                  } else {
                                    newValuesObj = elements.items[index].styles.color;
                                    newValuesObj[breakPointX] = newVal;
                                  }

                                  var styles = { ...elements.items[index].styles, color: newValuesObj };
                                  elements.items[index].styles = styles

                                  setAttributes({ elements: { ...elements, items: elements.items } });




                                }}
                              />


                              <PanelRow className='my-3'>
                                <label>Background Color</label>
                                <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                              </PanelRow>


                              <ColorPalette
                                value={elements.items[index].styles.backgroundColor[breakPointX]}
                                colors={colorsPresets}
                                enableAlpha
                                onChange={(newVal) => {

                                  var newValuesObj = {};

                                  if (Object.keys(elements.items[index].styles.backgroundColor).length == 0) {
                                    newValuesObj[breakPointX] = newVal;
                                  } else {
                                    newValuesObj = elements.items[index].styles.backgroundColor;
                                    newValuesObj[breakPointX] = newVal;
                                  }

                                  var styles = { ...elements.items[index].styles, backgroundColor: newValuesObj };
                                  elements.items[index].styles = styles

                                  setAttributes({ elements: { ...elements, items: elements.items } });







                                  // var newValuesObjX = {};
                                  // if (blockCssY.items[itemSelector] == undefined) {

                                  //   newValuesObjX[itemSelector] = { ...blockCssY.items[itemSelector], 'background-color': newValuesObj };

                                  // } else {

                                  //   newValuesObjX[itemSelector] = { ...blockCssY.items[itemSelector], 'background-color': newValuesObj };
                                  // }


                                  //setAttributes({ blockCssY: { items: newValuesObjX } });




                                }}
                              />


                            </PanelBody>






                          </div>
                        ))}
                      </ReactSortable>

                      <ToggleControl
                        className='my-3'
                        label="Display Label?"
                        help={elements.options.showLabel ? 'Label is displaying' : 'Label is hidden'}
                        checked={elements.options.showLabel ? true : false}
                        onChange={(e) => {

                          var options = { ...elements.options, showLabel: elements.options.showLabel ? false : true };
                          setAttributes({ elements: { ...elements, options: options } });

                        }}
                      />



                      <PanelRow className='my-3'>
                        <div>
                          <ToggleControl
                            className='my-3'
                            disabled={isProFeature}
                            label="Display Icon?"
                            help={elements.options.showIcon ? 'Icon is displaying' : 'Icon is hidden'}
                            checked={elements.options.showIcon ? true : false}
                            onChange={(e) => {

                              var options = { ...elements.options, showIcon: elements.options.showIcon ? false : true };
                              setAttributes({ elements: { ...elements, options: options } });

                            }}
                          />

                        </div>

                        <div>
                          {isProFeature && (<span className='bg-amber-400 rounded-sm py-1 px-3  text-white hover:text-white'>
                            <a target="_blank" href={'https://pickplugins.com/post-grid/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=' + x.label}>Pro</a>
                          </span>)}
                        </div>

                      </PanelRow>



                      <ToggleControl
                        className='my-3'
                        label="Display Separator?"
                        help={elements.options.showSeparator ? 'Separator is displaying' : 'Separator is hidden'}
                        checked={elements.options.showSeparator ? true : false}
                        onChange={(e) => {

                          var options = { ...elements.options, showSeparator: elements.options.showSeparator ? false : true };
                          setAttributes({ elements: { ...elements, options: options } });

                        }}
                      />



                    </PGtab>
                    <PGtab name="styles">
                      <PGStyles obj={elements} onChange={onChangeStyleElements} onAdd={onAddStyleElements} onRemove={onRemoveStyleElements} />
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
                        <label for="">Icon position</label>

                        <SelectControl
                          label=""
                          value={icon.options.position}
                          options={[

                            { label: 'Choose Position', value: '' },

                            { label: 'Before Label', value: 'beforeLabel' },
                            { label: 'After Label', value: 'afterLabel' },
                            { label: 'Before Separator', value: 'beforeSeparator' },
                            { label: 'After Separator', value: 'afterSeparator' },


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

                <PanelBody title="Label" initialOpen={false}>


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
                      <PGStyles obj={label} onChange={onChangeStyleLabel} onAdd={onAddStyleLabel} onRemove={onRemoveStyleLabel} />
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
                        <label for="">Separator Text</label>
                        <InputControl
                          value={separator.options.text}
                          onChange={(newVal) => {

                            var options = { ...separator.options, text: newVal }
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



                <PanelBody title="Custom Style" initialOpen={false}>


                  <p>Please use following class selector to apply your custom CSS</p>
                  <div className='my-3'>
                    <p className='font-bold'>Wrapper Selector</p>
                    <p><code>{wrapperSelector}{'{/* your CSS here*/}'}</code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Item Selector</p>
                    <p><code>{itemSelector}{'{}'} </code></p>
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
                <PGContactSupport utm={{ utm_source: 'BlockPostExcerpt', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />


              </div>
            </div>






          </InspectorControls >
        </div >
        ,


        <div className={blockId}>
          <ol>


            {elements.items.map((x, index) => {

              return (
                <li className={'item item-' + index}>

                  {x.url.length > 0 && (

                    <a href={x.url}>
                      {elements.options.showIcon && icon.options.position == 'beforeLabel' && (
                        <span className={`icon ${x.siteIcon.iconSrc}`}></span>
                      )}
                      {elements.options.showLabel && (
                        <span className='label'>{(x.customText.length > 0) ? x.customText : x.label}</span>
                      )}
                      {elements.options.showIcon && icon.options.position == 'afterLabel' && (
                        <span className={`icon ${x.siteIcon.iconSrc}`}></span>
                      )}
                    </a>
                  )}


                  {x.url.length == 0 && (

                    <span>
                      {elements.options.showIcon && icon.options.position == 'beforeLabel' && (
                        <span className={`icon ${x.siteIcon.iconSrc}`}></span>
                      )}
                      {elements.options.showLabel && (
                        <span className='label'>{(x.customText.length > 0) ? x.customText : x.label}</span>
                      )}
                      {elements.options.showIcon && icon.options.position == 'afterLabel' && (
                        <span className={`icon ${x.siteIcon.iconSrc}`}></span>
                      )}
                    </span>
                  )}

                  {elements.options.showSeparator && (
                    <>
                      {elements.options.showIcon && icon.options.position == 'beforeSeparator' && (
                        <span className={`icon ${x.siteIcon.iconSrc}`}></span>
                      )}
                      {elements.items.length > index && (
                        <span class="separator">{separator.options.text}</span>
                      )}
                      {elements.options.showIcon && icon.options.position == 'afterSeparator' && (
                        <span className={`icon ${x.siteIcon.iconSrc}`}></span>
                      )}
                    </>

                  )}

                </li>
              )
            })}
          </ol>
        </div>
      ]

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})