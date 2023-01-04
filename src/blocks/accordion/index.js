import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover, Spinner } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl, InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'
import { link, linkOff } from "@wordpress/icons";

import IconToggle from '../../components/icon-toggle'
import Typography from '../../components/typography'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import PGIconPicker from '../../components/icon-picker'



var myStore = wp.data.select('postgrid-shop');


registerBlockType("post-grid/accordion", {
  title: "Accordion",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:


      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 7.00003C2.44772 7.00003 2 7.44775 2 8.00003V16C2 16.5523 2.44772 17 3 17H21C21.5523 17 22 16.5523 22 16V8.00003C22 7.44775 21.5523 7.00003 21 7.00003H3ZM20.75 14.75C20.75 15.3023 20.3023 15.75 19.75 15.75H4.25C3.69772 15.75 3.25 15.3023 3.25 14.75V11.75C3.25 11.1977 3.69772 10.75 4.25 10.75H19.75C20.3023 10.75 20.75 11.1977 20.75 11.75V14.75Z" />
        <path d="M2 3C2 2.44772 2.44772 2 3 2H21C21.5523 2 22 2.44772 22 3V4.75C22 5.30228 21.5523 5.75 21 5.75H3C2.44772 5.75 2 5.30228 2 4.75V3Z" />
        <path d="M2 19.25C2 18.6977 2.44772 18.25 3 18.25H21C21.5523 18.25 22 18.6977 22 19.25V21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21V19.25Z" />
      </svg>



    ,
  },


  attributes: {


    wrapper: {
      type: 'object',
      default: {
        options: {
          content: '',
          tag: 'div',
          class: 'pg-accordion',
        },

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


    items: {
      type: 'array',
      default: [{ isActive: false, headerText: 'What is Lorem Ipsum?', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', icon: '', iconToggle: '', styles: {}, }],
    },
    header: {
      type: 'object',
      default: {
        options: {
          text: 'What is Lorem Ipsum?',
          tag: 'div',
          class: 'pg-accordion-header',


        },

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
    headerActive: {
      type: 'object',
      default: {
        options: {
          text: 'What is Lorem Ipsum?',
          tag: 'div',
          class: 'pg-accordion-header ',


        },

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
    content: {
      type: 'object',
      default: {
        options: {
          text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          tag: 'div',
          class: 'pg-accordion-content',
        },

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
        options: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-chevron-right', class: 'icon', positon: 'beforeHeader', enableToggle: 'yes', },

        styles:
        {
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          textAlign: {},
          display: {},

          fontSize: {}, //{ val: '18', unit: 'px' }
          lineHeight: {}, // { val: '18', unit: 'px' }
          fontWeight: { "Desktop": "700" },
          textDecoration: {}, //overline, line-through, underline
        },
      },
    },
    iconToggle: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-chevron-down', class: 'iconToggle', },

        styles:
        {
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          textAlign: {},
          display: {},

          fontSize: {}, //{ val: '18', unit: 'px' }
          lineHeight: {}, // { val: '18', unit: 'px' }
          fontWeight: { "Desktop": "700" },
          textDecoration: {}, //overline, line-through, underline
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
    var header = attributes.header;
    var headerActive = attributes.headerActive;

    var content = attributes.content;
    var icon = attributes.icon;
    var iconToggle = attributes.iconToggle;

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
    var headerSelector = blockClass + ' .pg-accordion-header';
    var headerActiveSelector = blockClass + ' .pg-accordion-header.active';

    var contentSelector = blockClass + ' .pg-accordion-content';
    const iconSelector = blockClass + ' .icon-wrap';


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

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }



    const [iconHtml, setIconHtml] = useState('');

    useEffect(() => {

      var iconSrc = icon.options.iconSrc;
      var iconHtml = `<span class="${iconSrc}"></span>`;

      setIconHtml(iconHtml);
    }, [icon]);


    const [iconToggleHtml, setIconToggleHtml] = useState('');

    useEffect(() => {

      var iconSrc = iconToggle.options.iconSrc;
      var iconHtml = `<span class="${iconSrc}"></span>`;

      setIconToggleHtml(iconHtml);
    }, [iconToggle]);





    function handleLinkClick(ev) {

      ev.stopPropagation();
      ev.preventDefault();
      return false;
    }



    function onChangeIcon(arg) {




      var options = { ...icon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
      setAttributes({ icon: { ...icon, options: options } });

    }


    function onChangeIconToggle(arg) {




      var options = { ...iconToggle.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
      setAttributes({ iconToggle: { ...iconToggle, options: options } });

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


      var responsive = header.styles.padding;
      responsive[breakPointX] = nextValues;


      var styles = { ...header.styles, padding: responsive };
      setAttributes({ header: { ...header, styles: styles } });


      var itemsX = { ...blockCssY.items };



      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[headerSelector] = (blockCssY.items[headerSelector] != undefined) ? blockCssY.items[headerSelector] : {};



      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[headerSelector]['padding-top'] != undefined) ? blockCssY.items[headerSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[headerSelector] = { ...blockCssY.items[headerSelector], 'padding-top': paddingTop };
        //itemsX[headerSelector] = { ...blockCssY.items[headerSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[headerSelector]['padding-right'] != undefined) ? blockCssY.items[headerSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[headerSelector] = { ...blockCssY.items[headerSelector], 'padding-right': paddingRight };
        //itemsX[headerSelector] = { ...blockCssY.items[headerSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[headerSelector]['padding-bottom'] != undefined) ? blockCssY.items[headerSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[headerSelector] = { ...blockCssY.items[headerSelector], 'padding-bottom': paddingBottom };
        //itemsX[headerSelector] = { ...blockCssY.items[headerSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[headerSelector]['padding-left'] != undefined) ? blockCssY.items[headerSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[headerSelector] = { ...blockCssY.items[headerSelector], 'padding-left': paddingLeft };
        //itemsX[headerSelector] = { ...blockCssY.items[headerSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });
      //setAttributes({ blockCssY: { items: itemsX } });



    }



    function paddingControlContent(nextValues) {


      var responsive = content.styles.padding;
      responsive[breakPointX] = nextValues;


      var styles = { ...content.styles, padding: responsive };
      setAttributes({ content: { ...content, styles: styles } });


      var itemsX = { ...blockCssY.items };



      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[contentSelector] = (blockCssY.items[contentSelector] != undefined) ? blockCssY.items[contentSelector] : {};



      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[contentSelector]['padding-top'] != undefined) ? blockCssY.items[contentSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[contentSelector] = { ...blockCssY.items[contentSelector], 'padding-top': paddingTop };
        //itemsX[contentSelector] = { ...blockCssY.items[contentSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[contentSelector]['padding-right'] != undefined) ? blockCssY.items[contentSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[contentSelector] = { ...blockCssY.items[contentSelector], 'padding-right': paddingRight };
        //itemsX[contentSelector] = { ...blockCssY.items[contentSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[contentSelector]['padding-bottom'] != undefined) ? blockCssY.items[contentSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[contentSelector] = { ...blockCssY.items[contentSelector], 'padding-bottom': paddingBottom };
        //itemsX[contentSelector] = { ...blockCssY.items[contentSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[contentSelector]['padding-left'] != undefined) ? blockCssY.items[contentSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[contentSelector] = { ...blockCssY.items[contentSelector], 'padding-left': paddingLeft };
        //itemsX[contentSelector] = { ...blockCssY.items[contentSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });
      //setAttributes({ blockCssY: { items: itemsX } });



    }



    function marginControlHeader(nextValues) {

      var responsive = header.styles.margin;
      responsive[breakPointX] = nextValues;



      var styles = { ...header.styles, margin: responsive };
      setAttributes({ header: { ...header, styles: styles } });




      var itemsX = { ...blockCssY.items };

      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[headerSelector] = (blockCssY.items[headerSelector] != undefined) ? blockCssY.items[headerSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[headerSelector]['margin-top'] != undefined) ? blockCssY.items[headerSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[headerSelector] = { ...blockCssY.items[headerSelector], 'margin-top': marginTop };
        //itemsX[headerSelector] = { ...blockCssY.items[headerSelector], 'margin-top': marginTop };

      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[headerSelector]['margin-right'] !== undefined) ? blockCssY.items[headerSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[headerSelector] = { ...blockCssY.items[headerSelector], 'margin-right': marginRight };
        //itemsX[headerSelector] = { ...blockCssY.items[headerSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[headerSelector]['margin-bottom'] !== undefined) ? blockCssY.items[headerSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[headerSelector] = { ...blockCssY.items[headerSelector], 'margin-bottom': marginBottom };
        //itemsX[headerSelector] = { ...blockCssY.items[headerSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[headerSelector]['margin-left'] !== undefined) ? blockCssY.items[headerSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[headerSelector] = { ...blockCssY.items[headerSelector], 'margin-left': marginLeft };
        //itemsX[headerSelector] = { ...blockCssY.items[headerSelector], 'margin-left': marginLeft };

      }

      setAttributes({ blockCssY: { items: blockCssY.items } });
      //setAttributes({ blockCssY: { items: itemsX } });

    }



    function marginControlContent(nextValues) {

      var responsive = content.styles.margin;
      responsive[breakPointX] = nextValues;



      var styles = { ...content.styles, margin: responsive };
      setAttributes({ content: { ...content, styles: styles } });




      var itemsX = { ...blockCssY.items };

      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[contentSelector] = (blockCssY.items[contentSelector] != undefined) ? blockCssY.items[contentSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[contentSelector]['margin-top'] != undefined) ? blockCssY.items[contentSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[contentSelector] = { ...blockCssY.items[contentSelector], 'margin-top': marginTop };
        //itemsX[contentSelector] = { ...blockCssY.items[contentSelector], 'margin-top': marginTop };

      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[contentSelector]['margin-right'] !== undefined) ? blockCssY.items[contentSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[contentSelector] = { ...blockCssY.items[contentSelector], 'margin-right': marginRight };
        //itemsX[contentSelector] = { ...blockCssY.items[contentSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[contentSelector]['margin-bottom'] !== undefined) ? blockCssY.items[contentSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[contentSelector] = { ...blockCssY.items[contentSelector], 'margin-bottom': marginBottom };
        //itemsX[contentSelector] = { ...blockCssY.items[contentSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[contentSelector]['margin-left'] !== undefined) ? blockCssY.items[contentSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[contentSelector] = { ...blockCssY.items[contentSelector], 'margin-left': marginLeft };
        //itemsX[contentSelector] = { ...blockCssY.items[contentSelector], 'margin-left': marginLeft };

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


        <div>

          <BlockControls >
            <AlignmentToolbar
              value={wrapper.styles.textAlign}
              onChange={(newVal) => {


                var newValuesObj = {};


                if (Object.keys(wrapper.styles.textAlign).length == 0) {
                  newValuesObj[breakPointX] = newVal;
                } else {
                  newValuesObj = wrapper.styles.textAlign;
                  newValuesObj[breakPointX] = newVal;
                }


                var styles = { ...wrapper.styles, textAlign: newValuesObj };
                setAttributes({ wrapper: { ...wrapper, styles: styles } });




                var itemsX = { ...blockCssY.items };
                itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'text-align': newValuesObj };

                setAttributes({ blockCssY: { items: itemsX } });






              }}
            />







          </BlockControls>


          <InspectorControls key="general">
            <div className='px-2' title="header" initialOpen={false}>


              <PanelBody title="Header" initialOpen={false}>



                <PanelRow>
                  <label for="">Wrapper Tag</label>

                  <SelectControl
                    label=""
                    value={header.options.tag}
                    options={[
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






                <PanelRow className='my-3'>
                  <label>Color</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                </PanelRow>

                <ColorPalette
                  value={header.styles.color[breakPointX]}
                  colors={colorsPresets}
                  enableAlpha
                  onChange={(newVal) => {



                    var newValuesObj = {};


                    if (Object.keys(header.styles.color).length == 0) {
                      newValuesObj[breakPointX] = newVal;
                    } else {
                      newValuesObj = header.styles.color;
                      newValuesObj[breakPointX] = newVal;
                    }

                    var styles = { ...header.styles, color: newValuesObj };
                    setAttributes({ header: { ...header, styles: styles } });



                    var itemsX = { ...blockCssY.items };
                    itemsX[headerSelector] = { ...blockCssY.items[headerSelector], 'color': newValuesObj };

                    setAttributes({ blockCssY: { items: itemsX } });

                  }}
                />



                <PanelRow className='my-3'>
                  <label>Background Color</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                </PanelRow>

                <ColorPalette
                  value={header.styles.bgColor[breakPointX]}
                  colors={colorsPresets}
                  enableAlpha
                  onChange={(newVal) => {




                    var newValuesObj = {};


                    if (Object.keys(header.styles.bgColor).length == 0) {
                      newValuesObj[breakPointX] = newVal;
                    } else {
                      newValuesObj = header.styles.bgColor;
                      newValuesObj[breakPointX] = newVal;
                    }

                    var styles = { ...header.styles, bgColor: newValuesObj };
                    setAttributes({ header: { ...header, styles: styles } });




                    var itemsX = { ...blockCssY.items };
                    itemsX[headerSelector] = { ...blockCssY.items[headerSelector], 'background-color': newValuesObj };

                    setAttributes({ blockCssY: { items: itemsX } });





                  }}
                />


                <PanelRow className='my-3'>
                  <label>Active Background Color</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                </PanelRow>

                <ColorPalette
                  value={headerActive.styles.bgColor[breakPointX]}
                  colors={colorsPresets}
                  enableAlpha
                  onChange={(newVal) => {
                    var newValuesObj = {};
                    if (Object.keys(headerActive.styles.bgColor).length == 0) {
                      newValuesObj[breakPointX] = newVal;
                    } else {
                      newValuesObj = headerActive.styles.bgColor;
                      newValuesObj[breakPointX] = newVal;
                    }

                    var styles = { ...headerActive.styles, bgColor: newValuesObj };
                    setAttributes({ headerActive: { ...headerActive, styles: styles } });

                    var itemsX = { ...blockCssY.items };
                    itemsX[headerActiveSelector] = { ...blockCssY.items[headerActiveSelector], 'background-color': newValuesObj };

                    setAttributes({ blockCssY: { items: itemsX } });

                  }}
                />


                <PanelRow>
                  <label>Padding</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                </PanelRow>
                <BoxControl
                  label=''
                  values={header.styles.padding[breakPointX]}
                  onChange={(nextValues) => { paddingControlHeader(nextValues) }}
                />





                <PanelRow>
                  <label>Margin</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                </PanelRow>
                <BoxControl
                  label=""
                  values={header.styles.margin[breakPointX]}
                  onChange={(nextValues) => { marginControlHeader(nextValues) }}
                />






              </PanelBody>



              <PanelBody title="Content" initialOpen={false}>



                <PanelRow>
                  <label for="">Wrapper Tag</label>

                  <SelectControl
                    label=""
                    value={content.options.tag}
                    options={[
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






                <PanelRow className='my-3'>
                  <label>Color</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                </PanelRow>

                <ColorPalette
                  value={content.styles.color[breakPointX]}
                  colors={colorsPresets}
                  enableAlpha
                  onChange={(newVal) => {



                    var newValuesObj = {};


                    if (Object.keys(content.styles.color).length == 0) {
                      newValuesObj[breakPointX] = newVal;
                    } else {
                      newValuesObj = content.styles.color;
                      newValuesObj[breakPointX] = newVal;
                    }

                    var styles = { ...content.styles, color: newValuesObj };
                    setAttributes({ content: { ...content, styles: styles } });



                    var itemsX = { ...blockCssY.items };
                    itemsX[contentSelector] = { ...blockCssY.items[contentSelector], 'color': newValuesObj };

                    setAttributes({ blockCssY: { items: itemsX } });

                  }}
                />



                <PanelRow className='my-3'>
                  <label>Background Color</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                </PanelRow>

                <ColorPalette
                  value={content.styles.bgColor[breakPointX]}
                  colors={colorsPresets}
                  enableAlpha
                  onChange={(newVal) => {




                    var newValuesObj = {};


                    if (Object.keys(content.styles.bgColor).length == 0) {
                      newValuesObj[breakPointX] = newVal;
                    } else {
                      newValuesObj = content.styles.bgColor;
                      newValuesObj[breakPointX] = newVal;
                    }

                    var styles = { ...content.styles, bgColor: newValuesObj };
                    setAttributes({ content: { ...content, styles: styles } });




                    var itemsX = { ...blockCssY.items };
                    itemsX[contentSelector] = { ...blockCssY.items[contentSelector], 'background-color': newValuesObj };

                    setAttributes({ blockCssY: { items: itemsX } });





                  }}
                />



                <PanelRow>
                  <label>Padding</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                </PanelRow>
                <BoxControl
                  label=''
                  values={content.styles.padding[breakPointX]}
                  onChange={(nextValues) => { paddingControlContent(nextValues) }}
                />





                <PanelRow>
                  <label>Margin</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                </PanelRow>
                <BoxControl
                  label=""
                  values={content.styles.margin[breakPointX]}
                  onChange={(nextValues) => { marginControlContent(nextValues) }}
                />






              </PanelBody>

              <PanelBody title="Icon" initialOpen={false}>


                <PanelRow>
                  <label for="">Choose Icon</label>

                  <PGIconPicker library={icon.options.library} srcType={icon.options.srcType} iconSrc={icon.options.iconSrc} onChange={onChangeIcon} />
                </PanelRow>




                <PanelRow>
                  <label for="">Choose Toggled Icon</label>

                  <PGIconPicker library={iconToggle.options.library} srcType={iconToggle.options.srcType} iconSrc={iconToggle.options.iconSrc} onChange={onChangeIconToggle} />
                </PanelRow>


                <PanelRow>
                  <label for="">Icon postion</label>

                  <SelectControl
                    label=""
                    value={icon.options.position}
                    options={[

                      { label: 'Choose...', value: '' },

                      { label: 'Before Header Text', value: 'beforeHeader' },
                      { label: 'After Header Text', value: 'afterHeader' },


                    ]}
                    onChange={(newVal) => {


                      var options = { ...icon.options, position: newVal };
                      setAttributes({ icon: { ...icon, options: options } });


                    }



                    }
                  />
                </PanelRow>


                <PanelRow>
                  <label for="">Enable Icon Toggle</label>

                  <SelectControl
                    label=""
                    value={icon.options.enableToggle}
                    options={[

                      { label: 'Yes', value: 'yes' },
                      { label: 'No', value: 'no' },


                    ]}
                    onChange={(newVal) => {
                      var options = { ...icon.options, enableToggle: newVal };
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


                <PanelRow>
                  <div className='font-bold'>Typography</div>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                </PanelRow>

                <Typography typo={icon.styles} breakPointX={breakPointX} onChange={onChangeIconTypo} setAttributes={setAttributes} obj={icon} />




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
        </div >
        ,


        <>
          <div className={[blockId]}>

            <div className='bg-blue-500 p-2 px-5 text-white my-4 text-center cursor-pointer' onClick={ev => {

              var itemx = items.concat({ isActive: false, headerText: 'What is Lorem Ipsum?', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', icon: '', iconToggle: '', styles: {}, });

              setAttributes({ items: itemx });


            }}>Add</div>


            {items.map((item, i) => {

              return (

                <>

                  <div className={`${header.options.class} ${(items[i].isActive) ? 'active' : ''} cursor-pointer`} onClick={ev => {


                    items[i].isActive = !items[i].isActive;
                    var ssdsd = items.concat([]);

                    setAttributes({ items: ssdsd });

                  }}>

                    {icon.options.position == 'beforeHeader' && (
                      <>

                        {icon.options.enableToggle == 'yes' && (

                          <>
                            {!items[i].isActive && (
                              <span className='icon-wrap' dangerouslySetInnerHTML={{ __html: iconHtml }} />)}
                            {items[i].isActive && (
                              <span className='icon-wrap' dangerouslySetInnerHTML={{ __html: iconToggleHtml }} />
                            )}
                          </>
                        )}


                        {icon.options.enableToggle == 'no' && (
                          <span className='icon-wrap' dangerouslySetInnerHTML={{ __html: iconHtml }} />
                        )}

                      </>
                    )}




                    <RichText


                      tagName='span'
                      value={item.headerText}
                      allowedFormats={['core/bold', 'core/italic', 'core/link']}
                      onChange={(content) => {



                        items[i].headerText = content;
                        var ssdsd = items.concat([]);

                        setAttributes({ items: ssdsd });
                      }}
                      placeholder={__('Start Writing...')}
                    />




                    {icon.options.position == 'afterHeader' && (
                      <>

                        {icon.options.enableToggle == 'yes' && (

                          <>
                            {!items[i].isActive && (
                              <span className='icon-wrap float-right' dangerouslySetInnerHTML={{ __html: iconHtml }} />)}
                            {items[i].isActive && (
                              <span className='icon-wrap float-right' dangerouslySetInnerHTML={{ __html: iconToggleHtml }} />
                            )}
                          </>
                        )}


                        {icon.options.enableToggle == 'no' && (
                          <span className='icon-wrap float-right' dangerouslySetInnerHTML={{ __html: iconHtml }} />
                        )}

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
                  </div>

                  {items[i].isActive && (


                    <div className={content.options.class}>
                      <RichText


                        tagName='div'
                        value={item.content}
                        allowedFormats={['core/bold', 'core/italic', 'core/link']}
                        onChange={(content) => {



                          items[i].content = content;
                          var ssdsd = items.concat([]);

                          setAttributes({ items: ssdsd });
                        }}
                        placeholder={__('Start Writing...')}
                      />
                    </div>


                  )}




                </>

              )

            })}


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