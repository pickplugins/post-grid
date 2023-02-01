import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover, Spinner } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';
import { Icon, styles, settings, link, linkOff } from "@wordpress/icons";

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl, InnerBlocks, useBlockProps } from '@wordpress/block-editor'
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
import PGcssCursor from '../../components/css-cursor'
import PGcssTextAlign from '../../components/css-text-align'

import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'

var myStore = wp.data.select('postgrid-shop');


registerBlockType("post-grid/tabs", {
  title: "Tabs",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:


      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.3872 3.62674H3.62677C2.66363 3.62674 1.87561 4.41476 1.87561 5.3779V17.636C1.87561 18.5991 2.66363 19.3872 3.62677 19.3872H19.3872C20.3503 19.3872 21.1383 18.5991 21.1383 17.636V5.3779C21.1383 4.41476 20.3503 3.62674 19.3872 3.62674ZM18.5116 17.636H4.50235C4.02078 17.636 3.62677 17.242 3.62677 16.7604V6.25348C3.62677 5.77191 4.02078 5.3779 4.50235 5.3779H12.3826V8.00463C12.3826 8.4862 12.7766 8.88021 13.2581 8.88021H19.3872V16.7604C19.3872 17.242 18.9932 17.636 18.5116 17.636Z" />
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

          color: {},
          backgroundColor: {},
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
          class: 'tab-nav ',


        },

        styles:
        {
          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},

          cursor: {},
          borderRadius: {},

          fontSize: {}, //{ val: '18', unit: 'px' }


        },
      },
    },
    headerActive: {
      type: 'object',
      default: {
        options: {
          text: 'What is Lorem Ipsum?',
          tag: 'div',
          class: 'tab-nav ',
          activeIndex: 0,


        },

        styles:
        {
          color: {},
          backgroundColor: {},
          fontSize: {}, //{ val: '18', unit: 'px' }

        },
      },
    },


    headerWrap: {
      type: 'object',
      default: {
        options: {
          tag: 'div',
          class: 'tabs-navs ',

        },

        styles:
        {
          color: {},
          backgroundColor: {},
          fontSize: {}, //{ val: '18', unit: 'px' }


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
          color: {},
          backgroundColor: {},
          fontSize: {}, //{ val: '18', unit: 'px' }


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
          backgroundColor: {},
          fontSize: {}, //{ val: '18', unit: 'px' }

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
          backgroundColor: {},
          padding: {},
          margin: {},


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
    var headerWrap = attributes.headerWrap;

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
    var headerWrapSelector = blockClass + ' .tabs-navs';

    var headerSelector = blockClass + ' .tab-nav';
    var headerActiveSelector = blockClass + ' .tab-nav.active';

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





    function onChangeStyleHeaderWrap(sudoScource, newVal, attr) {

      var sudoScourceX = { ...headerWrap[sudoScource] }
      var elementSelector = headerWrapSelector;

      if (sudoScource == 'styles') {
        elementSelector = headerWrapSelector;
      }

      else if (sudoScource == 'hover') {
        elementSelector = headerWrapSelector + ':hover';
      } else if (sudoScource == 'after') {
        elementSelector = headerWrapSelector + ':after';
      } else if (sudoScource == 'before') {
        elementSelector = headerWrapSelector + ':before';
      } else if (sudoScource == 'first-child') {
        elementSelector = headerWrapSelector + ':first-child';
      } else if (sudoScource == 'last-child') {
        elementSelector = headerWrapSelector + ':last-child';
      } else if (sudoScource == 'visited') {
        elementSelector = headerWrapSelector + ':visited';
      } else if (sudoScource == 'selection') {
        elementSelector = headerWrapSelector + ':selection';
      } else if (sudoScource == 'first-letter') {
        elementSelector = headerWrapSelector + '::first-letter';
      } else if (sudoScource == 'first-line') {
        elementSelector = headerWrapSelector + '::first-line';
      }
      else {
        elementSelector = headerWrapSelector + ':' + sudoScource;
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
      setAttributes({ headerWrap: { ...headerWrap } });
    }






    function onRemoveStyleHeaderWrap(sudoScource, key) {
      var sudoScourceX = { ...headerWrap[sudoScource] }
      if (sudoScourceX[key] != undefined) {
        delete sudoScourceX[key];
      }

      headerWrap[sudoScource] = sudoScourceX;
      setAttributes({ headerWrap: { ...headerWrap } });

      if (blockCssY.items[headerWrapSelector] == undefined) {
        blockCssY.items[headerWrapSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {
        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[headerWrapSelector][argAttr] = argAttrVal;
      })

      setAttributes({ blockCssY: { items: blockCssY.items } });
    }





    function onAddStyleHeaderWrap(sudoScource, key) {
      var sudoScourceX = { ...headerWrap[sudoScource] }
      sudoScourceX[key] = {};
      headerWrap[sudoScource] = sudoScourceX;
      setAttributes({ headerWrap: { ...headerWrap } });
    }




    function onChangeStyleHeader(sudoScource, newVal, attr) {

      var sudoScourceX = { ...header[sudoScource] }
      var elementSelector = headerSelector;

      if (sudoScource == 'styles') {
        elementSelector = headerSelector;
      }

      else if (sudoScource == 'hover') {
        elementSelector = headerSelector + ':hover';
      } else if (sudoScource == 'after') {
        elementSelector = headerSelector + ':after';
      } else if (sudoScource == 'before') {
        elementSelector = headerSelector + ':before';
      } else if (sudoScource == 'first-child') {
        elementSelector = headerSelector + ':first-child';
      } else if (sudoScource == 'last-child') {
        elementSelector = headerSelector + ':last-child';
      } else if (sudoScource == 'visited') {
        elementSelector = headerSelector + ':visited';
      } else if (sudoScource == 'selection') {
        elementSelector = headerSelector + ':selection';
      } else if (sudoScource == 'first-letter') {
        elementSelector = headerSelector + '::first-letter';
      } else if (sudoScource == 'first-line') {
        elementSelector = headerSelector + '::first-line';
      }
      else {
        elementSelector = headerSelector + ':' + sudoScource;
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
      setAttributes({ header: { ...header } });
    }






    function onRemoveStyleHeader(sudoScource, key) {
      var sudoScourceX = { ...header[sudoScource] }
      if (sudoScourceX[key] != undefined) {
        delete sudoScourceX[key];
      }

      header[sudoScource] = sudoScourceX;
      setAttributes({ header: { ...header } });

      if (blockCssY.items[headerSelector] == undefined) {
        blockCssY.items[headerSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {
        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[headerSelector][argAttr] = argAttrVal;
      })

      setAttributes({ blockCssY: { items: blockCssY.items } });
    }





    function onAddStyleHeader(sudoScource, key) {
      var sudoScourceX = { ...header[sudoScource] }
      sudoScourceX[key] = {};
      header[sudoScource] = sudoScourceX;
      setAttributes({ header: { ...header } });
    }




    function onChangeStyleContent(sudoScource, newVal, attr) {

      var sudoScourceX = { ...content[sudoScource] }
      var elementSelector = contentSelector;

      if (sudoScource == 'styles') {
        elementSelector = contentSelector;
      }

      else if (sudoScource == 'hover') {
        elementSelector = contentSelector + ':hover';
      } else if (sudoScource == 'after') {
        elementSelector = contentSelector + ':after';
      } else if (sudoScource == 'before') {
        elementSelector = contentSelector + ':before';
      } else if (sudoScource == 'first-child') {
        elementSelector = contentSelector + ':first-child';
      } else if (sudoScource == 'last-child') {
        elementSelector = contentSelector + ':last-child';
      } else if (sudoScource == 'visited') {
        elementSelector = contentSelector + ':visited';
      } else if (sudoScource == 'selection') {
        elementSelector = contentSelector + ':selection';
      } else if (sudoScource == 'first-letter') {
        elementSelector = contentSelector + '::first-letter';
      } else if (sudoScource == 'first-line') {
        elementSelector = contentSelector + '::first-line';
      }
      else {
        elementSelector = contentSelector + ':' + sudoScource;
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
      setAttributes({ content: { ...content } });
    }






    function onRemoveStyleContent(sudoScource, key) {
      var sudoScourceX = { ...content[sudoScource] }
      if (sudoScourceX[key] != undefined) {
        delete sudoScourceX[key];
      }

      content[sudoScource] = sudoScourceX;
      setAttributes({ content: { ...content } });

      if (blockCssY.items[contentSelector] == undefined) {
        blockCssY.items[contentSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {
        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[contentSelector][argAttr] = argAttrVal;
      })

      setAttributes({ blockCssY: { items: blockCssY.items } });
    }





    function onAddStyleContent(sudoScource, key) {
      var sudoScourceX = { ...content[sudoScource] }
      sudoScourceX[key] = {};
      content[sudoScource] = sudoScourceX;
      setAttributes({ content: { ...content } });
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
      //sudoScourceX[attr][breakPointX] = newVal;

      setAttributes({ icon: { ...icon } });

      if (blockCssY.items[iconSelector] == undefined) {
        blockCssY.items[iconSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {

        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[iconSelector][argAttr] = argAttrVal;

      })

      setAttributes({ blockCssY: { items: blockCssY.items } });

    }


    function onAddStyleIcon(sudoScource, key) {

      var sudoScourceX = { ...icon[sudoScource] }
      sudoScourceX[key] = {};
      icon[sudoScource] = sudoScourceX;
      setAttributes({ icon: { ...icon } });

    }


    function onChangeStyleHeaderActive(sudoScource, newVal, attr) {

      var sudoScourceX = { ...headerActive[sudoScource] }
      var elementSelector = headerActiveSelector;

      if (sudoScource == 'styles') {
        elementSelector = headerActiveSelector;
      }

      else if (sudoScource == 'hover') {
        elementSelector = headerActiveSelector + ':hover';
      } else if (sudoScource == 'after') {
        elementSelector = headerActiveSelector + ':after';
      } else if (sudoScource == 'before') {
        elementSelector = headerActiveSelector + ':before';
      } else if (sudoScource == 'first-child') {
        elementSelector = headerActiveSelector + ':first-child';
      } else if (sudoScource == 'last-child') {
        elementSelector = headerActiveSelector + ':last-child';
      } else if (sudoScource == 'visited') {
        elementSelector = headerActiveSelector + ':visited';
      } else if (sudoScource == 'selection') {
        elementSelector = headerActiveSelector + ':selection';
      } else if (sudoScource == 'first-letter') {
        elementSelector = headerActiveSelector + '::first-letter';
      } else if (sudoScource == 'first-line') {
        elementSelector = headerActiveSelector + '::first-line';
      }
      else {
        elementSelector = headerActiveSelector + ':' + sudoScource;
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
      setAttributes({ headerActive: { ...headerActive } });

    }


    function onRemoveStyleHeaderActive(sudoScource, key) {

      var sudoScourceX = { ...headerActive[sudoScource] }
      if (sudoScourceX[key] != undefined) {
        delete sudoScourceX[key];
      }

      headerActive[sudoScource] = sudoScourceX;
      //sudoScourceX[attr][breakPointX] = newVal;

      setAttributes({ headerActive: { ...headerActive } });

      if (blockCssY.items[headerActiveSelector] == undefined) {
        blockCssY.items[headerActiveSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {

        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[headerActiveSelector][argAttr] = argAttrVal;

      })

      setAttributes({ blockCssY: { items: blockCssY.items } });

    }


    function onAddStyleHeaderActive(sudoScource, key) {

      var sudoScourceX = { ...headerActive[sudoScource] }
      sudoScourceX[key] = {};
      headerActive[sudoScource] = sudoScourceX;
      setAttributes({ headerActive: { ...headerActive } });

    }











    function onChangeHeaderTypo(typoX) {


      setAttributes({ header: { ...header, styles: typoX } });

      var newValuesObjX = {};
      var itemsX = blockCssY.items;


      if (typoX.fontFamily[breakPointX] != undefined) {
        itemsX[headerSelector] = { ...blockCssY.items[headerSelector], 'font-family': typoX.fontFamily };


      } else {

        //typoX.fontFamily[breakPointX] = {};
        itemsX[headerSelector] = { ...blockCssY.items[headerSelector], 'font-family': typoX.fontFamily };

      }


      if (typoX.fontSize[breakPointX] != undefined) {

        var fontSizeVal = (typoX.fontSize[breakPointX].val) ? typoX.fontSize[breakPointX].val : 16;
        var fontSizeUnit = (typoX.fontSize[breakPointX].unit) ? typoX.fontSize[breakPointX].unit : 'px';


        var fontSizeX = (blockCssY.items[headerSelector]['font-size'] != undefined) ? blockCssY.items[headerSelector]['font-size'] : {};

        fontSizeX[breakPointX] = fontSizeVal + fontSizeUnit;
        //blockCssY.items[headerSelector] = { ...blockCssY.items[headerSelector], 'font-size': fontSizeX };
        itemsX[headerSelector] = { ...blockCssY.items[headerSelector], 'font-size': fontSizeX };

      }


      if (typoX.lineHeight[breakPointX] != undefined) {

        var lineHeightVal = (typoX.lineHeight[breakPointX].val) ? typoX.lineHeight[breakPointX].val : 16;
        var lineHeightUnit = (typoX.lineHeight[breakPointX].unit) ? typoX.lineHeight[breakPointX].unit : 'px';


        var lineHeightX = (blockCssY.items[headerSelector]['line-height'] != undefined) ? blockCssY.items[headerSelector]['line-height'] : {};

        lineHeightX[breakPointX] = lineHeightVal + lineHeightUnit;

        //blockCssY.items[headerSelector] = { ...blockCssY.items[headerSelector], 'line-height': lineHeightX };
        itemsX[headerSelector] = { ...blockCssY.items[headerSelector], 'line-height': lineHeightX };

      }
      if (typoX.letterSpacing[breakPointX] != undefined) {

        var letterSpacingVal = (typoX.letterSpacing[breakPointX].val) ? typoX.letterSpacing[breakPointX].val : 0;
        var letterSpacingUnit = (typoX.letterSpacing[breakPointX].unit) ? typoX.letterSpacing[breakPointX].unit : 'px';



        var letterSpacingX = (blockCssY.items[headerSelector]['letter-spacing'] != undefined) ? blockCssY.items[headerSelector]['letter-spacing'] : {};

        letterSpacingX[breakPointX] = letterSpacingVal + letterSpacingUnit;

        //blockCssY.items[headerSelector] = { ...blockCssY.items[headerSelector], 'letter-spacing': letterSpacingX };
        itemsX[headerSelector] = { ...blockCssY.items[headerSelector], 'letter-spacing': letterSpacingX };

      }

      if (typoX.fontWeight[breakPointX] != undefined) {

        itemsX[headerSelector] = { ...blockCssY.items[headerSelector], 'font-weight': typoX.fontWeight };

      }


      if (typoX.textDecoration[breakPointX] != undefined) {

        var str = {};

        var textDecorationX = typoX.textDecoration[breakPointX];
        var textDecorationXStr = (textDecorationX.length > 0) ? textDecorationX.join(' ') : '';

        str[breakPointX] = textDecorationXStr;
        itemsX[headerSelector] = { ...blockCssY.items[headerSelector], 'text-decoration': str };



      }
      if (typoX.textTransform[breakPointX] != undefined) {

        itemsX[headerSelector] = { ...blockCssY.items[headerSelector], 'text-transform': typoX.textTransform };


      }



      //setAttributes({ blockCssY: { items: blockCssY.items } });
      setAttributes({ blockCssY: { items: itemsX } });



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


    function paddingControlNavsWrap(nextValues) {


      var responsive = headerWrap.styles.padding;
      responsive[breakPointX] = nextValues;


      var styles = { ...headerWrap.styles, padding: responsive };
      setAttributes({ headerWrap: { ...headerWrap, styles: styles } });


      var itemsX = { ...blockCssY.items };



      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[headerWrapSelector] = (blockCssY.items[headerWrapSelector] != undefined) ? blockCssY.items[headerWrapSelector] : {};



      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[headerWrapSelector]['padding-top'] != undefined) ? blockCssY.items[headerWrapSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[headerWrapSelector] = { ...blockCssY.items[headerWrapSelector], 'padding-top': paddingTop };
        //itemsX[headerWrapSelector] = { ...blockCssY.items[headerWrapSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[headerWrapSelector]['padding-right'] != undefined) ? blockCssY.items[headerWrapSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[headerWrapSelector] = { ...blockCssY.items[headerWrapSelector], 'padding-right': paddingRight };
        //itemsX[headerWrapSelector] = { ...blockCssY.items[headerWrapSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[headerWrapSelector]['padding-bottom'] != undefined) ? blockCssY.items[headerWrapSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[headerWrapSelector] = { ...blockCssY.items[headerWrapSelector], 'padding-bottom': paddingBottom };
        //itemsX[headerWrapSelector] = { ...blockCssY.items[headerWrapSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[headerWrapSelector]['padding-left'] != undefined) ? blockCssY.items[headerWrapSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[headerWrapSelector] = { ...blockCssY.items[headerWrapSelector], 'padding-left': paddingLeft };
        //itemsX[headerWrapSelector] = { ...blockCssY.items[headerWrapSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });
      //setAttributes({ blockCssY: { items: itemsX } });



    }



    function marginControlNavsWrap(nextValues) {

      var responsive = headerWrap.styles.margin;
      responsive[breakPointX] = nextValues;



      var styles = { ...headerWrap.styles, margin: responsive };
      setAttributes({ headerWrap: { ...headerWrap, styles: styles } });




      var itemsX = { ...blockCssY.items };

      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[headerWrapSelector] = (blockCssY.items[headerWrapSelector] != undefined) ? blockCssY.items[headerWrapSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[headerWrapSelector]['margin-top'] != undefined) ? blockCssY.items[headerWrapSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[headerWrapSelector] = { ...blockCssY.items[headerWrapSelector], 'margin-top': marginTop };
        //itemsX[headerWrapSelector] = { ...blockCssY.items[headerWrapSelector], 'margin-top': marginTop };

      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[headerWrapSelector]['margin-right'] !== undefined) ? blockCssY.items[headerWrapSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[headerWrapSelector] = { ...blockCssY.items[headerWrapSelector], 'margin-right': marginRight };
        //itemsX[headerWrapSelector] = { ...blockCssY.items[headerWrapSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[headerWrapSelector]['margin-bottom'] !== undefined) ? blockCssY.items[headerWrapSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[headerWrapSelector] = { ...blockCssY.items[headerWrapSelector], 'margin-bottom': marginBottom };
        //itemsX[headerWrapSelector] = { ...blockCssY.items[headerWrapSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[headerWrapSelector]['margin-left'] !== undefined) ? blockCssY.items[headerWrapSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[headerWrapSelector] = { ...blockCssY.items[headerWrapSelector], 'margin-left': marginLeft };
        //itemsX[headerWrapSelector] = { ...blockCssY.items[headerWrapSelector], 'margin-left': marginLeft };

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

              <PanelBody title="Navs Wrap" initialOpen={false}>



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
                    <PGStyles obj={headerWrap} onChange={onChangeStyleHeaderWrap} onAdd={onAddStyleHeaderWrap} onRemove={onRemoveStyleHeaderWrap} />
                  </PGtab>
                </PGtabs>






              </PanelBody>
              <PanelBody title="Navs" initialOpen={false}>


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



                  </PGtab>
                  <PGtab name="styles">
                    <PGStyles obj={header} onChange={onChangeStyleHeader} onAdd={onAddStyleHeader} onRemove={onRemoveStyleHeader} />
                  </PGtab>
                </PGtabs>








              </PanelBody>

              <PanelBody title="Navs - Active" initialOpen={false}>


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
                    <PGStyles obj={headerActive} onChange={onChangeStyleHeaderActive} onAdd={onAddStyleHeaderActive} onRemove={onRemoveStyleHeaderActive} />
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
                  ]}
                >
                  <PGtab name="options">

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

                  </PGtab>
                  <PGtab name="styles">
                    <PGStyles obj={content} onChange={onChangeStyleContent} onAdd={onAddStyleContent} onRemove={onRemoveStyleContent} />
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
                      <label for="">Choose Toggled Icon</label>

                      <PGIconPicker library={iconToggle.options.library} srcType={iconToggle.options.srcType} iconSrc={iconToggle.options.iconSrc} onChange={onChangeIconToggle} />
                    </PanelRow>


                    <PanelRow>
                      <label for="">Icon postion</label>

                      <SelectControl
                        label=""
                        value={icon.options.position}
                        options={[

                          { label: 'Choose Position', value: '' },
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
                  </PGtab>
                  <PGtab name="styles">
                    <PGStyles obj={wrapper} onChange={onChangeStyleIcon} onAdd={onAddStyleIcon} onRemove={onRemoveStyleIcon} />
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
        </div >
        ,


        <>

          <div className={[blockId]}>

            <div className='bg-blue-500 p-2 px-5 text-white text-center my-4 cursor-pointer' onClick={ev => {

              var itemx = items.concat({ isActive: false, headerText: 'What is Lorem Ipsum?', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', icon: '', iconToggle: '', styles: {}, });

              setAttributes({ items: itemx });


            }}>Add</div>

            <div className={headerWrap.options.class}
            >
              {items.map((item, i) => {

                return (

                  <>

                    <div className={`inline-block cursor-pointer ${(headerActive.options.activeIndex == i) ? 'active' : ''} ${header.options.class}`} onClick={ev => {


                      var options = { ...headerActive.options, activeIndex: i };
                      setAttributes({ headerActive: { ...headerActive, options: options } });

                    }}>


                      {icon.options.position == 'beforeHeader' && (
                        <>

                          {icon.options.enableToggle == 'yes' && (

                            <>
                              {headerActive.options.activeIndex != i && (
                                <span className='icon-wrap ' dangerouslySetInnerHTML={{ __html: iconHtml }} />)}
                              {headerActive.options.activeIndex == i && (
                                <span className='icon-wrap ' dangerouslySetInnerHTML={{ __html: iconToggleHtml }} />
                              )}
                            </>
                          )}


                          {icon.options.enableToggle == 'no' && (
                            <span className='icon-wrap ' dangerouslySetInnerHTML={{ __html: iconHtml }} />
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
                              {headerActive.options.activeIndex != i && (
                                <span className='icon-wrap float-right' dangerouslySetInnerHTML={{ __html: iconHtml }} />)}
                              {headerActive.options.activeIndex == i && (
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




                  </>

                )

              })}
            </div>





            {items.map((item, i) => {

              return (

                <>



                  {headerActive.options.activeIndex == i && (
                    <RichText
                      className={content.options.class}

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


    //return null;
  }
})