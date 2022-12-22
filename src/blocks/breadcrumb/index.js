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
import { Icon, close, menu } from '@wordpress/icons';

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
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: {},
        },
      },
    },
    icon: {
      type: 'object',
      default: {
        options: { class: 'icon', position: 'beforeLabel'/*beforeLabel, afterLabel, beforeseparator, afterseparator*/ },
        styles:
        {
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: {},
        },
      },
    },
    label: {
      type: 'object',
      default: {
        options: { class: '', },
        styles:
        {
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: {},
        },
      },
    },

    separator: {
      type: 'object',
      default: {
        options: { class: '', text: '»', },
        styles:
        {
          textAlign: {},
          color: {},
          bgColor: {},
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
          linkTarget: '_blank', showLabel: true, showSeparator: true, showIcon: false, iconPositon: 'beforeLabel' // beforeLabel, afterLabel, beforeseparator, afterseparator
        },
        styles: {
          textAlign: {},
          color: { Desktop: '#18978F' },
          bgColor: {},
          padding: {},
          margin: {
            Desktop: { top: '5px', right: '5px', bottom: '5px', left: '5px' }
          },
          display: {},
          borderRadius: {},

          fontSize: { Desktop: { val: '35' } }, //{ val: '18', unit: 'px' }
          lineHeight: {}, // { val: '18', unit: 'px' }
          letterSpacing: {}, // { val: '18', unit: 'px' }
          fontWeight: {},
          textDecoration: {}, //overline, line-through, underline
          textTransform: {},

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
              textAlign: {},
              color: {},
              bgColor: {},
              padding: {},
              margin: {},
              display: {},
            },

          },
          {
            id: 'homePage', label: 'Home Page Link', customText: '', url: '',
            siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
            options: {
              showSeparator: true,
            },
            styles: {
              textAlign: {},
              color: {},
              bgColor: {},
              padding: {},
              margin: {},
              display: {},
            },

          },
          {
            id: 'postTitle', label: 'Post Title', customText: '', url: '',
            siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
            options: {
              showSeparator: true,
            },
            styles: {
              textAlign: {},
              color: {},
              bgColor: {},
              padding: {},
              margin: {},
              display: {},
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
      generateBlockCssY();



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





    var linkElements = [


      {
        id: 'text', label: 'Text', customText: 'You are here: ', url: '',

        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          text: 'You are here: ',
          showSeparator: true,
        },
        styles: {
          textAlign: {},
          color: {},
          bgColor: {},
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
          textAlign: {},
          color: {},
          bgColor: {},
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
          textAlign: {},
          color: {},
          bgColor: {},
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
          textAlign: {},
          color: {},
          bgColor: {},
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
          textAlign: {},
          color: {},
          bgColor: {},
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
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },


      {
        id: 'postDate', label: 'Post Date', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          format: '',
          showSeparator: true,
        },
        styles: {
          textAlign: {},
          color: {},
          bgColor: {},
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
          textAlign: {},
          color: {},
          bgColor: {},
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
          textAlign: {},
          color: {},
          bgColor: {},
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
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },
      {
        id: 'postAncestors', label: 'Post Ancestors', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
        },
        styles: {
          textAlign: {},
          color: {},
          bgColor: {},
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
          textAlign: {},
          color: {},
          bgColor: {},
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
          textAlign: {},
          color: {},
          bgColor: {},
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
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: {},
        },
      },
      {
        id: 'postCategories', label: 'Post Categories', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
          maxCount: 3,

        },
        styles: {
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },
      {
        id: 'postTags', label: 'Post Tags', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          showSeparator: true,
          maxCount: 3,

        },
        styles: {
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: {},
        },
      },


      {
        id: 'postTerm', label: 'Post Term', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          taxonomy: '',
          showSeparator: true,
        },
        styles: {
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },

      {
        id: 'termParent', label: 'Term Parent', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          taxonomy: '',
          showSeparator: true,
        },
        styles: {
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },

      {
        id: 'termTitle', label: 'Term Title', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          taxonomy: '',
          showSeparator: true,
        },
        styles: {
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: {},
        },

      },

      {
        id: 'termAncestors', label: 'Term Ancestors', customText: '%s', url: '',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          taxonomy: '',
          showSeparator: true,
        },
        styles: {
          textAlign: {},
          color: {},
          bgColor: {},
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
          textAlign: {},
          color: {},
          bgColor: {},
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
          textAlign: {},
          color: {},
          bgColor: {},
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
          textAlign: {},
          color: {},
          bgColor: {},
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
          textAlign: {},
          color: {},
          bgColor: {},
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
          textAlign: {},
          color: {},
          bgColor: {},
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
        },
        styles: {
          textAlign: {},
          color: {},
          bgColor: {},
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
        },
        styles: {
          textAlign: {},
          color: {},
          bgColor: {},
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
        },
        styles: {
          textAlign: {},
          color: {},
          bgColor: {},
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
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: {},
        },
      },





    ]


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

      generateBlockCssY()

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
        generateBlockCssY();

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

                  <PanelRow>
                    <label>Display</label>
                    <PGcssDisplay val={wrapper.styles.display[breakPointX]} onChange={(newVal => {


                      var newValuesObj = {};

                      if (Object.keys(wrapper.styles.display).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = wrapper.styles.display;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...wrapper.styles, display: newValuesObj };
                      setAttributes({ wrapper: { ...wrapper, styles: styles } });

                      blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'display': newValuesObj };
                      setAttributes({ blockCssY: { items: blockCssY.items } });

                    })} />
                  </PanelRow>


                </PanelBody>




                <PanelBody title="Items" initialOpen={true}>


                  <div className='my-4'>
                    <PanelRow>
                      <label for="">Add Media</label>
                      <PGDropdown position="bottom right" variant="secondary" options={linkElements} buttonTitle="Choose" onChange={addMedia} values=""></PGDropdown>
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
                            value={elements.items[index].styles.bgColor[breakPointX]}
                            colors={colorsPresets}
                            enableAlpha
                            onChange={(newVal) => {

                              var newValuesObj = {};

                              if (Object.keys(elements.items[index].styles.bgColor).length == 0) {
                                newValuesObj[breakPointX] = newVal;
                              } else {
                                newValuesObj = elements.items[index].styles.bgColor;
                                newValuesObj[breakPointX] = newVal;
                              }

                              var styles = { ...elements.items[index].styles, bgColor: newValuesObj };
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

                  <ToggleControl
                    className='my-3'
                    label="Display Icon?"
                    help={elements.options.showIcon ? 'Icon is displaying' : 'Icon is hidden'}
                    checked={elements.options.showIcon ? true : false}
                    onChange={(e) => {

                      var options = { ...elements.options, showIcon: elements.options.showIcon ? false : true };
                      setAttributes({ elements: { ...elements, options: options } });

                    }}
                  />

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



                  <PanelRow className='my-3'>
                    <label>Display</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>

                  <PanelRow>

                    <SelectControl
                      label=""
                      value={elements.styles.display[breakPointX]}

                      options={[
                        { label: 'Select..', value: '' },
                        { label: 'inline', value: 'inline' },
                        { label: 'inline-block', value: 'inline-block' },
                        { label: 'block', value: 'block' },

                      ]}
                      onChange={(newVal) => {

                        var newValuesObj = {};

                        if (Object.keys(elements.styles.display).length == 0) {
                          newValuesObj[breakPointX] = newVal;
                        } else {
                          newValuesObj = elements.styles.display;
                          newValuesObj[breakPointX] = newVal;
                        }

                        var styles = { ...elements.styles, display: newValuesObj };
                        setAttributes({ elements: { ...elements, styles: styles } });



                        var itemsX = { ...blockCssY.items };
                        itemsX[itemSelector] = { ...blockCssY.items[itemSelector], 'display': newValuesObj };

                        setAttributes({ blockCssY: { items: itemsX } });


                      }

                      }
                    />
                  </PanelRow>


                  <PanelRow className='my-3'>
                    <label>Color</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                  </PanelRow>


                  <ColorPalette
                    value={elements.styles.color[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {


                      //sdsd


                      var newValuesObj = {};


                      if (Object.keys(elements.styles.color).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = elements.styles.color;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...elements.styles, color: newValuesObj };
                      setAttributes({ elements: { ...elements, styles: styles } });



                      var itemsX = { ...blockCssY.items };
                      itemsX[itemSelector] = { ...blockCssY.items[itemSelector], 'color': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });













                    }}
                  />


                  <PanelRow className='my-3'>
                    <label>Background Color</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                  </PanelRow>


                  <ColorPalette
                    value={elements.styles.bgColor[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {

                      //
                      var newValuesObj = {};


                      if (Object.keys(elements.styles.bgColor).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = elements.styles.bgColor;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...elements.styles, bgColor: newValuesObj };
                      setAttributes({ elements: { ...elements, styles: styles } });



                      var itemsX = { ...blockCssY.items };
                      itemsX[itemSelector] = { ...blockCssY.items[itemSelector], 'background-color': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });



                    }}
                  />



                  <PanelRow>
                    <label>Padding</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=""
                    values={elements.styles.padding[breakPointX]}
                    onChange={(nextValues) => { paddingControlItems(nextValues) }}
                  />


                  <PanelRow>
                    <label>Margin</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=""
                    values={elements.styles.margin[breakPointX]}
                    onChange={(nextValues) => { marginControlItems(nextValues) }}
                  />


                  <Typography typo={elements.styles} breakPointX={breakPointX} onChange={onChangeTypo} setAttributes={setAttributes} obj={elements} />




                </PanelBody>





                <PanelBody title="Icon" initialOpen={false}>




                  <PanelRow>
                    <label for="">Icon position</label>

                    <SelectControl
                      label=""
                      value={icon.options.position}
                      options={[

                        { label: 'Choose Position', value: '' },

                        { label: 'Before Label', value: 'beforeLabel' },
                        { label: 'After Label', value: 'afterLabel' },
                        // { label: 'Before separator', value: 'beforeseparator' },
                        // { label: 'After separator', value: 'afterseparator' },


                      ]}
                      onChange={(newVal) => {


                        var options = { ...icon.options, position: newVal };
                        setAttributes({ icon: { ...icon, options: options } });


                      }



                      }
                    />
                  </PanelRow>



                  <PanelRow className='my-3'>
                    <label>Color</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                  </PanelRow>

                  <ColorPalette
                    value={icon.styles.color[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {



                      var newValuesObj = {};


                      if (Object.keys(icon.styles.color).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = icon.styles.color;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...icon.styles, color: newValuesObj };
                      setAttributes({ icon: { ...icon, styles: styles } });



                      var itemsX = { ...blockCssY.items };
                      itemsX[iconSelector] = { ...blockCssY.items[iconSelector], 'color': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });


                    }}
                  />



                  <PanelRow className='my-3'>
                    <label>Background Color</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>

                  <ColorPalette
                    value={icon.styles.bgColor[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {


                      var newValuesObj = {};


                      if (Object.keys(icon.styles.bgColor).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = icon.styles.bgColor;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...icon.styles, bgColor: newValuesObj };
                      setAttributes({ icon: { ...icon, styles: styles } });





                      var itemsX = { ...blockCssY.items };
                      itemsX[iconSelector] = { ...blockCssY.items[iconSelector], 'background-color': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });



                    }}
                  />




                  <PanelRow className='my-3'>
                    <label>Display</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>

                  <PanelRow>

                    <SelectControl
                      label=""
                      value={icon.styles.display[breakPointX]}

                      options={[
                        { label: 'Select..', value: '' },
                        { label: 'inline', value: 'inline' },
                        { label: 'inline-block', value: 'inline-block' },
                        { label: 'block', value: 'block' },

                      ]}
                      onChange={(newVal) => {

                        var newValuesObj = {};

                        if (Object.keys(icon.styles.display).length == 0) {
                          newValuesObj[breakPointX] = newVal;
                        } else {
                          newValuesObj = icon.styles.display;
                          newValuesObj[breakPointX] = newVal;
                        }

                        var styles = { ...icon.styles, display: newValuesObj };
                        setAttributes({ icon: { ...icon, styles: styles } });



                        var itemsX = { ...blockCssY.items };
                        itemsX[iconSelector] = { ...blockCssY.items[iconSelector], 'display': newValuesObj };

                        setAttributes({ blockCssY: { items: itemsX } });


                      }

                      }
                    />
                  </PanelRow>

                  <PanelRow>
                    <label>Padding</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=''
                    values={icon.styles.padding[breakPointX]}
                    onChange={(nextValues) => {


                      var responsive = icon.styles.padding;
                      responsive[breakPointX] = nextValues;


                      var styles = { ...icon.styles, padding: responsive };
                      setAttributes({ icon: { ...icon, styles: styles } });

                      var itemsX = { ...blockCssY.items };

                      blockCssY.items[iconSelector] = (blockCssY.items[iconSelector] != undefined) ? blockCssY.items[iconSelector] : {};

                      if (nextValues.top != undefined) {

                        var paddingTop = (blockCssY.items[iconSelector]['padding-top'] != undefined) ? blockCssY.items[iconSelector]['padding-top'] : {};
                        paddingTop[breakPointX] = nextValues.top
                        blockCssY.items[iconSelector] = { ...blockCssY.items[iconSelector], 'padding-top': paddingTop };
                      }


                      if (nextValues.right != undefined) {

                        var paddingRight = (blockCssY.items[iconSelector]['padding-right'] != undefined) ? blockCssY.items[iconSelector]['padding-right'] : {};
                        paddingRight[breakPointX] = nextValues.right
                        blockCssY.items[iconSelector] = { ...blockCssY.items[iconSelector], 'padding-right': paddingRight };
                      }

                      if (nextValues.bottom != undefined) {

                        var paddingBottom = (blockCssY.items[iconSelector]['padding-bottom'] != undefined) ? blockCssY.items[iconSelector]['padding-bottom'] : {};
                        paddingBottom[breakPointX] = nextValues.bottom
                        blockCssY.items[iconSelector] = { ...blockCssY.items[iconSelector], 'padding-bottom': paddingBottom };
                      }

                      if (nextValues.left != undefined) {

                        var paddingLeft = (blockCssY.items[iconSelector]['padding-left'] != undefined) ? blockCssY.items[iconSelector]['padding-left'] : {};
                        paddingLeft[breakPointX] = nextValues.left

                        blockCssY.items[iconSelector] = { ...blockCssY.items[iconSelector], 'padding-left': paddingLeft };
                      }

                      setAttributes({ blockCssY: { items: blockCssY.items } });



                    }}
                  />

                  <PanelRow>
                    <label>Margin</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=""
                    values={icon.styles.margin[breakPointX]}
                    onChange={(nextValues) => {


                      var responsive = icon.styles.margin;
                      responsive[breakPointX] = nextValues;

                      var styles = { ...icon.styles, margin: responsive };
                      setAttributes({ icon: { ...icon, styles: styles } });

                      var itemsX = { ...blockCssY.items };

                      blockCssY.items[iconSelector] = (blockCssY.items[iconSelector] != undefined) ? blockCssY.items[iconSelector] : {};

                      if (nextValues.top != undefined) {
                        var marginTop = (blockCssY.items[iconSelector]['margin-top'] != undefined) ? blockCssY.items[iconSelector]['margin-top'] : {};
                        marginTop[breakPointX] = nextValues.top

                        blockCssY.items[iconSelector] = { ...blockCssY.items[iconSelector], 'margin-top': marginTop };

                      }


                      if (nextValues.right != undefined) {

                        var marginRight = (blockCssY.items[iconSelector]['margin-right'] !== undefined) ? blockCssY.items[iconSelector]['margin-right'] : {};
                        marginRight[breakPointX] = nextValues.right

                        blockCssY.items[iconSelector] = { ...blockCssY.items[iconSelector], 'margin-right': marginRight };

                      }

                      if (nextValues.bottom != undefined) {

                        var marginBottom = (blockCssY.items[iconSelector]['margin-bottom'] !== undefined) ? blockCssY.items[iconSelector]['margin-bottom'] : {};
                        marginBottom[breakPointX] = nextValues.bottom

                        blockCssY.items[iconSelector] = { ...blockCssY.items[iconSelector], 'margin-bottom': marginBottom };

                      }

                      if (nextValues.left != undefined) {

                        var marginLeft = (blockCssY.items[iconSelector]['margin-left'] !== undefined) ? blockCssY.items[iconSelector]['margin-left'] : {};
                        marginLeft[breakPointX] = nextValues.left

                        blockCssY.items[iconSelector] = { ...blockCssY.items[iconSelector], 'margin-left': marginLeft };

                      }

                      setAttributes({ blockCssY: { items: blockCssY.items } });



                    }}
                  />

                </PanelBody>

                <PanelBody title="Label" initialOpen={false}>
                  <PanelRow className='my-3'>
                    <label>Color</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />

                  </PanelRow>

                  <ColorPalette
                    value={label.styles.color[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {



                      var newValuesObj = {};


                      if (Object.keys(label.styles.color).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = label.styles.color;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...label.styles, color: newValuesObj };
                      setAttributes({ label: { ...label, styles: styles } });



                      var itemsX = { ...blockCssY.items };
                      itemsX[labelSelector] = { ...blockCssY.items[labelSelector], 'color': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });


                    }}
                  />



                  <PanelRow className='my-3'>
                    <label>Background Color</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                  </PanelRow>

                  <ColorPalette
                    value={label.styles.bgColor[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {






                      var newValuesObj = {};


                      if (Object.keys(label.styles.bgColor).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = label.styles.bgColor;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...label.styles, bgColor: newValuesObj };
                      setAttributes({ label: { ...label, styles: styles } });





                      var itemsX = { ...blockCssY.items };
                      itemsX[labelSelector] = { ...blockCssY.items[labelSelector], 'background-color': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });



                    }}
                  />




                  <PanelRow className='my-3'>
                    <label>Display</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>

                  <PanelRow>

                    <SelectControl
                      label=""
                      value={label.styles.display[breakPointX]}

                      options={[
                        { label: 'Select..', value: '' },
                        { label: 'inline', value: 'inline' },
                        { label: 'inline-block', value: 'inline-block' },
                        { label: 'block', value: 'block' },

                      ]}
                      onChange={(newVal) => {

                        var newValuesObj = {};

                        if (Object.keys(label.styles.display).length == 0) {
                          newValuesObj[breakPointX] = newVal;
                        } else {
                          newValuesObj = label.styles.display;
                          newValuesObj[breakPointX] = newVal;
                        }

                        var styles = { ...label.styles, display: newValuesObj };
                        setAttributes({ label: { ...label, styles: styles } });



                        var itemsX = { ...blockCssY.items };
                        itemsX[labelSelector] = { ...blockCssY.items[labelSelector], 'display': newValuesObj };

                        setAttributes({ blockCssY: { items: itemsX } });


                      }

                      }
                    />
                  </PanelRow>

                  <PanelRow>
                    <label>Padding</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=''
                    values={label.styles.padding[breakPointX]}
                    onChange={(nextValues) => {


                      var responsive = label.styles.padding;
                      responsive[breakPointX] = nextValues;


                      var styles = { ...label.styles, padding: responsive };
                      setAttributes({ label: { ...label, styles: styles } });

                      var itemsX = { ...blockCssY.items };

                      blockCssY.items[labelSelector] = (blockCssY.items[labelSelector] != undefined) ? blockCssY.items[labelSelector] : {};

                      if (nextValues.top != undefined) {

                        var paddingTop = (blockCssY.items[labelSelector]['padding-top'] != undefined) ? blockCssY.items[labelSelector]['padding-top'] : {};
                        paddingTop[breakPointX] = nextValues.top
                        blockCssY.items[labelSelector] = { ...blockCssY.items[labelSelector], 'padding-top': paddingTop };
                      }


                      if (nextValues.right != undefined) {

                        var paddingRight = (blockCssY.items[labelSelector]['padding-right'] != undefined) ? blockCssY.items[labelSelector]['padding-right'] : {};
                        paddingRight[breakPointX] = nextValues.right
                        blockCssY.items[labelSelector] = { ...blockCssY.items[labelSelector], 'padding-right': paddingRight };
                      }

                      if (nextValues.bottom != undefined) {

                        var paddingBottom = (blockCssY.items[labelSelector]['padding-bottom'] != undefined) ? blockCssY.items[labelSelector]['padding-bottom'] : {};
                        paddingBottom[breakPointX] = nextValues.bottom
                        blockCssY.items[labelSelector] = { ...blockCssY.items[labelSelector], 'padding-bottom': paddingBottom };
                      }

                      if (nextValues.left != undefined) {

                        var paddingLeft = (blockCssY.items[labelSelector]['padding-left'] != undefined) ? blockCssY.items[labelSelector]['padding-left'] : {};
                        paddingLeft[breakPointX] = nextValues.left

                        blockCssY.items[labelSelector] = { ...blockCssY.items[labelSelector], 'padding-left': paddingLeft };
                      }

                      setAttributes({ blockCssY: { items: blockCssY.items } });



                    }}
                  />

                  <PanelRow>
                    <label>Margin</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=""
                    values={label.styles.margin[breakPointX]}
                    onChange={(nextValues) => {


                      var responsive = label.styles.margin;
                      responsive[breakPointX] = nextValues;

                      var styles = { ...label.styles, margin: responsive };
                      setAttributes({ label: { ...label, styles: styles } });

                      var itemsX = { ...blockCssY.items };

                      blockCssY.items[labelSelector] = (blockCssY.items[labelSelector] != undefined) ? blockCssY.items[labelSelector] : {};

                      if (nextValues.top != undefined) {
                        var marginTop = (blockCssY.items[labelSelector]['margin-top'] != undefined) ? blockCssY.items[labelSelector]['margin-top'] : {};
                        marginTop[breakPointX] = nextValues.top

                        blockCssY.items[labelSelector] = { ...blockCssY.items[labelSelector], 'margin-top': marginTop };

                      }


                      if (nextValues.right != undefined) {

                        var marginRight = (blockCssY.items[labelSelector]['margin-right'] !== undefined) ? blockCssY.items[labelSelector]['margin-right'] : {};
                        marginRight[breakPointX] = nextValues.right

                        blockCssY.items[labelSelector] = { ...blockCssY.items[labelSelector], 'margin-right': marginRight };

                      }

                      if (nextValues.bottom != undefined) {

                        var marginBottom = (blockCssY.items[labelSelector]['margin-bottom'] !== undefined) ? blockCssY.items[labelSelector]['margin-bottom'] : {};
                        marginBottom[breakPointX] = nextValues.bottom

                        blockCssY.items[labelSelector] = { ...blockCssY.items[labelSelector], 'margin-bottom': marginBottom };

                      }

                      if (nextValues.left != undefined) {

                        var marginLeft = (blockCssY.items[labelSelector]['margin-left'] !== undefined) ? blockCssY.items[labelSelector]['margin-left'] : {};
                        marginLeft[breakPointX] = nextValues.left

                        blockCssY.items[labelSelector] = { ...blockCssY.items[labelSelector], 'margin-left': marginLeft };

                      }

                      setAttributes({ blockCssY: { items: blockCssY.items } });



                    }}
                  />

                </PanelBody>

                <PanelBody title="Separator" initialOpen={false}>


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


                  <PanelRow className='my-3'>
                    <label>Color</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                  </PanelRow>

                  <ColorPalette
                    value={separator.styles.color[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {



                      var newValuesObj = {};


                      if (Object.keys(separator.styles.color).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = separator.styles.color;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...separator.styles, color: newValuesObj };
                      setAttributes({ separator: { ...separator, styles: styles } });



                      var itemsX = { ...blockCssY.items };
                      itemsX[separatorSelector] = { ...blockCssY.items[separatorSelector], 'color': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });


                    }}
                  />



                  <PanelRow className='my-3'>
                    <label>Background Color</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                  </PanelRow>

                  <ColorPalette
                    value={separator.styles.bgColor[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {






                      var newValuesObj = {};


                      if (Object.keys(separator.styles.bgColor).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = separator.styles.bgColor;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...separator.styles, bgColor: newValuesObj };
                      setAttributes({ separator: { ...separator, styles: styles } });





                      var itemsX = { ...blockCssY.items };
                      itemsX[separatorSelector] = { ...blockCssY.items[separatorSelector], 'background-color': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });



                    }}
                  />




                  <PanelRow className='my-3'>
                    <label>Display</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>

                  <PanelRow>

                    <SelectControl
                      label=""
                      value={separator.styles.display[breakPointX]}

                      options={[
                        { label: 'Select..', value: '' },
                        { label: 'inline', value: 'inline' },
                        { label: 'inline-block', value: 'inline-block' },
                        { label: 'block', value: 'block' },

                      ]}
                      onChange={(newVal) => {

                        var newValuesObj = {};

                        if (Object.keys(separator.styles.display).length == 0) {
                          newValuesObj[breakPointX] = newVal;
                        } else {
                          newValuesObj = separator.styles.display;
                          newValuesObj[breakPointX] = newVal;
                        }

                        var styles = { ...separator.styles, display: newValuesObj };
                        setAttributes({ separator: { ...separator, styles: styles } });



                        var itemsX = { ...blockCssY.items };
                        itemsX[separatorSelector] = { ...blockCssY.items[separatorSelector], 'display': newValuesObj };

                        setAttributes({ blockCssY: { items: itemsX } });


                      }

                      }
                    />
                  </PanelRow>

                  <PanelRow>
                    <label>Padding</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=''
                    values={separator.styles.padding[breakPointX]}
                    onChange={(nextValues) => {


                      var responsive = separator.styles.padding;
                      responsive[breakPointX] = nextValues;


                      var styles = { ...separator.styles, padding: responsive };
                      setAttributes({ separator: { ...separator, styles: styles } });

                      var itemsX = { ...blockCssY.items };

                      blockCssY.items[separatorSelector] = (blockCssY.items[separatorSelector] != undefined) ? blockCssY.items[separatorSelector] : {};

                      if (nextValues.top != undefined) {

                        var paddingTop = (blockCssY.items[separatorSelector]['padding-top'] != undefined) ? blockCssY.items[separatorSelector]['padding-top'] : {};
                        paddingTop[breakPointX] = nextValues.top
                        blockCssY.items[separatorSelector] = { ...blockCssY.items[separatorSelector], 'padding-top': paddingTop };
                      }


                      if (nextValues.right != undefined) {

                        var paddingRight = (blockCssY.items[separatorSelector]['padding-right'] != undefined) ? blockCssY.items[separatorSelector]['padding-right'] : {};
                        paddingRight[breakPointX] = nextValues.right
                        blockCssY.items[separatorSelector] = { ...blockCssY.items[separatorSelector], 'padding-right': paddingRight };
                      }

                      if (nextValues.bottom != undefined) {

                        var paddingBottom = (blockCssY.items[separatorSelector]['padding-bottom'] != undefined) ? blockCssY.items[separatorSelector]['padding-bottom'] : {};
                        paddingBottom[breakPointX] = nextValues.bottom
                        blockCssY.items[separatorSelector] = { ...blockCssY.items[separatorSelector], 'padding-bottom': paddingBottom };
                      }

                      if (nextValues.left != undefined) {

                        var paddingLeft = (blockCssY.items[separatorSelector]['padding-left'] != undefined) ? blockCssY.items[separatorSelector]['padding-left'] : {};
                        paddingLeft[breakPointX] = nextValues.left

                        blockCssY.items[separatorSelector] = { ...blockCssY.items[separatorSelector], 'padding-left': paddingLeft };
                      }

                      setAttributes({ blockCssY: { items: blockCssY.items } });



                    }}
                  />

                  <PanelRow>
                    <label>Margin</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=""
                    values={separator.styles.margin[breakPointX]}
                    onChange={(nextValues) => {


                      var responsive = separator.styles.margin;
                      responsive[breakPointX] = nextValues;

                      var styles = { ...separator.styles, margin: responsive };
                      setAttributes({ separator: { ...separator, styles: styles } });

                      var itemsX = { ...blockCssY.items };

                      blockCssY.items[separatorSelector] = (blockCssY.items[separatorSelector] != undefined) ? blockCssY.items[separatorSelector] : {};

                      if (nextValues.top != undefined) {
                        var marginTop = (blockCssY.items[separatorSelector]['margin-top'] != undefined) ? blockCssY.items[separatorSelector]['margin-top'] : {};
                        marginTop[breakPointX] = nextValues.top

                        blockCssY.items[separatorSelector] = { ...blockCssY.items[separatorSelector], 'margin-top': marginTop };

                      }


                      if (nextValues.right != undefined) {

                        var marginRight = (blockCssY.items[separatorSelector]['margin-right'] !== undefined) ? blockCssY.items[separatorSelector]['margin-right'] : {};
                        marginRight[breakPointX] = nextValues.right

                        blockCssY.items[separatorSelector] = { ...blockCssY.items[separatorSelector], 'margin-right': marginRight };

                      }

                      if (nextValues.bottom != undefined) {

                        var marginBottom = (blockCssY.items[separatorSelector]['margin-bottom'] !== undefined) ? blockCssY.items[separatorSelector]['margin-bottom'] : {};
                        marginBottom[breakPointX] = nextValues.bottom

                        blockCssY.items[separatorSelector] = { ...blockCssY.items[separatorSelector], 'margin-bottom': marginBottom };

                      }

                      if (nextValues.left != undefined) {

                        var marginLeft = (blockCssY.items[separatorSelector]['margin-left'] !== undefined) ? blockCssY.items[separatorSelector]['margin-left'] : {};
                        marginLeft[breakPointX] = nextValues.left

                        blockCssY.items[separatorSelector] = { ...blockCssY.items[separatorSelector], 'margin-left': marginLeft };

                      }

                      setAttributes({ blockCssY: { items: blockCssY.items } });



                    }}
                  />

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
                  <a href={x.url}>
                    {elements.options.showIcon && (
                      <span className={`icon ${x.siteIcon.iconSrc}`}></span>
                    )}
                    {elements.options.showLabel && (
                      <span className='label'>{(x.customText.length > 0) ? x.customText : x.label}</span>
                    )}

                  </a>
                  {elements.items.length > index && (
                    <span class="separator">{separator.options.text}</span>
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