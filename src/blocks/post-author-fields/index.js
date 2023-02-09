import apiFetch from '@wordpress/api-fetch';
import { useEntityProp } from '@wordpress/core-data';
import { applyFilters } from '@wordpress/hooks';

import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, subscribe, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Spinner, Popover, TabPanel } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl, } from '@wordpress/components';
import { link, linkOff } from "@wordpress/icons";
import { Icon, styles, settings } from '@wordpress/icons';

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'

import IconToggle from '../../components/icon-toggle'
import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import Typography from '../../components/typography'
import PGDropdown from '../../components/dropdown'
import PGcssDisplay from '../../components/css-display'
import PGStyles from '../../components/styles'
import PGIconPicker from '../../components/icon-picker'

import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'

var myStore = wp.data.select('postgrid-shop');




registerBlockType("post-grid/post-author-fields", {
  title: "Author Fields",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:
      <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 249.5C25 246.739 27.2386 244.5 30 244.5H470C472.761 244.5 475 246.739 475 249.5V299.5C475 302.261 472.761 304.5 470 304.5H30C27.2386 304.5 25 302.261 25 299.5V249.5Z" />
        <path d="M241 147C241 144.239 243.239 142 246 142H470C472.761 142 475 144.239 475 147V197C475 199.761 472.761 202 470 202H246C243.239 202 241 199.761 241 197V147Z" />
        <path d="M100 132.5C119.569 132.5 135.429 116.72 135.429 97.25C135.429 77.7799 119.569 62 100 62C80.4312 62 64.5714 77.7799 64.5714 97.25C64.5714 116.72 80.4312 132.5 100 132.5ZM124.8 141.312H120.178C114.033 144.121 107.196 145.719 100 145.719C92.8036 145.719 85.9946 144.121 79.8223 141.312H75.2C54.6625 141.312 38 157.891 38 178.325V189.781C38 197.079 43.9509 203 51.2857 203H148.714C156.049 203 162 197.079 162 189.781V178.325C162 157.891 145.337 141.312 124.8 141.312Z" />
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

          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          display: {},

        },
      },
    },

    field: {
      type: 'object',
      default: {

        options: {
          isLink: false,
          linkTo: 'postUrl', /*postUrl, homeUrl, authorUrl, authorLink, mailTo, custom */
          linkToMeta: '',

          linkTarget: '',

          avatarSize: '',
          dateFormat: '',
          customUrl: '',
          prefix: '',
          postfix: '',
          linkAttr: [],


        },
        styles: {},

      },
    },
    icon: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', position: 'beforePostDate', /*before, after, prefix, postfix */ class: 'icon', },

        styles:
        {
          color: {},
          backgroundColor: {},
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

    metaKey: {
      "type": "string",
      "default": ''
    },




    frontText: {
      type: 'object',
      default: {

        options: { text: 'Author: ', class: 'inline-block', },
        styles:
        {

          color: {},
          backgroundColor: {},
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
    var frontText = attributes.frontText;

    var blockCssY = attributes.blockCssY;
    var customCss = attributes.customCss;
    var metaKey = attributes.metaKey;
    var field = attributes.field;
    var icon = attributes.icon;


    var postId = context['postId'];
    var postType = context['postType'];

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);

    var userFields = [
      { label: "ID", key: 'id' },
      { label: "login", key: 'login' },
      { label: "Nick name", key: 'nickname' },
      { label: "Email", key: 'email' },
      { label: "URL", key: 'url' },
      { label: "Registered", key: 'registered' },
      { label: "Display name", key: 'display_name' },
      { label: "First name", key: 'first_name' },
      { label: "Last name", key: 'last_name' },
      { label: "Description", key: 'description' },
      // { label: "Avatar URL", key: 'avatar_url' },
      { label: "Avatar", key: 'avatar' },

      // { label: "Profile Link", key: 'link' },

    ];



    var linkToArgsBasic = {
      postUrl: { label: 'Post URL', value: 'postUrl' },
      homeUrl: { label: 'Home URL', value: 'homeUrl' },
      authorUrl: { label: 'Author URL', value: 'authorUrl' },
      authorLink: { label: 'Author Link', value: 'authorLink' },
      authorMail: { label: 'Author Mail', value: 'authorMail', isPro: true },
      authorMeta: { label: 'Author Meta', value: 'authorMeta', isPro: true },
      customField: { label: 'Custom Field', value: 'customField', isPro: true },
      customUrl: { label: 'Custom URL', value: 'customUrl', isPro: true },
    };

    let linkToArgs = applyFilters('linkToArgs', linkToArgsBasic);


    // Wrapper CSS Class Selectors
    const wrapperSelector = blockClass;
    const fieldSelector = blockClass + ' .fieldVal';
    const frontTextSelector = blockClass + ' .frontText';
    const iconSelector = blockClass + ' .icon';

    var breakPointList = [];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }




    const [postAuthorData, setpostAuthorData] = useState([]); // Using the hook.
    const [loading, setLoading] = useState(false); // Using the hook.


    const [
      postAuthorX,
      setpostAuthorX,
    ] = useEntityProp('postType', postType, 'author', postId);



    useEffect(() => {

      if (metaKey.length == 0) return;

      setpostAuthorData([]);
      setLoading(true);

      apiFetch({
        path: '/post-grid/v2/get_user_data',
        method: 'POST',
        data: { id: postAuthorX, fields: [] },
      }).then((res) => {

        setpostAuthorData(res);

        setLoading(false);

      });




    }, [metaKey]);


    const [iconHtml, setIconHtml] = useState('');

    useEffect(() => {

      var iconSrc = icon.options.iconSrc;

      var iconHtml = `<span class="${iconSrc}"></span>`;

      setIconHtml(iconHtml);




    }, [icon]);



    function onChangeStyleWrapper(sudoScource, newVal, attr) {

      var sudoScourceX = { ...wrapper[sudoScource] }
      var elementSelector = myStore.getElementSelector(sudoScource, wrapperSelector);


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






    function onChangeStyleField(sudoScource, newVal, attr) {

      var sudoScourceX = { ...field[sudoScource] }
      var elementSelector = myStore.getElementSelector(sudoScource, fieldSelector);


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
      setAttributes({ field: { ...field } });

    }


    function onRemoveStyleField(sudoScource, key) {

      var sudoScourceX = { ...field[sudoScource] }
      if (sudoScourceX[key] != undefined) {
        delete sudoScourceX[key];
      }

      field[sudoScource] = sudoScourceX;
      setAttributes({ field: { ...field } });


      if (blockCssY.items[fieldSelector] == undefined) {
        blockCssY.items[fieldSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {

        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];

        blockCssY.items[fieldSelector][argAttr] = argAttrVal;

      })

      if (blockCssY.items[fieldSelector][key] != undefined) {
        delete blockCssY.items[fieldSelector][key];
      }


      setAttributes({ blockCssY: { items: blockCssY.items } });
    }


    function onAddStyleField(sudoScource, key) {

      var sudoScourceX = { ...field[sudoScource] }
      sudoScourceX[key] = {};
      field[sudoScource] = sudoScourceX;
      setAttributes({ field: { ...field } });

    }





    function onChangeStyleIcon(sudoScource, newVal, attr) {

      var sudoScourceX = { ...icon[sudoScource] }
      var elementSelector = iconSelector;


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
      var elementSelector = myStore.getElementSelector(sudoScource, frontTextSelector);


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

      if (blockCssY.items[frontTextSelector][key] != undefined) {
        delete blockCssY.items[frontTextSelector][key];
      }


      setAttributes({ blockCssY: { items: blockCssY.items } });
    }





    function onAddStyleFrontText(sudoScource, key) {
      var sudoScourceX = { ...frontText[sudoScource] }
      sudoScourceX[key] = {};
      frontText[sudoScource] = sudoScourceX;
      setAttributes({ frontText: { ...frontText } });
    }



















    function setFieldLinkTo(option, index) {


      var options = { ...field.options, linkTo: option.value };
      setAttributes({ field: { ...field, options: options } });

    }





    function setUserField(option, index) {


      setAttributes({ metaKey: option.key });

    }

    useEffect(() => {

      setAttributes({ blockId: blockIdX });



      //generateBlockCssY();
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [clientId]);



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

    function paddingControlItems(nextValues) {



      var responsive = field.styles.padding;
      responsive[breakPointX] = nextValues;

      var styles = { ...field.styles, padding: responsive };
      setAttributes({ field: { ...field, styles: styles } });


      blockCssY.items[fieldSelector] = (blockCssY.items[fieldSelector] != undefined) ? blockCssY.items[fieldSelector] : {};


      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;





      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[fieldSelector]['padding-top'] != undefined) ? blockCssY.items[fieldSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[fieldSelector] = { ...blockCssY.items[fieldSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[fieldSelector]['padding-right'] != undefined) ? blockCssY.items[fieldSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[fieldSelector] = { ...blockCssY.items[fieldSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[fieldSelector]['padding-bottom'] != undefined) ? blockCssY.items[fieldSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[fieldSelector] = { ...blockCssY.items[fieldSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[fieldSelector]['padding-left'] != undefined) ? blockCssY.items[fieldSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[fieldSelector] = { ...blockCssY.items[fieldSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });



    }





    function marginControlItems(nextValues) {


      var responsive = field.styles.margin;
      responsive[breakPointX] = nextValues;


      var styles = { ...field.styles, margin: responsive };
      setAttributes({ field: { ...field, styles: styles } });

      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[fieldSelector] = (blockCssY.items[fieldSelector] != undefined) ? blockCssY.items[fieldSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[fieldSelector]['margin-top'] != undefined) ? blockCssY.items[fieldSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[fieldSelector] = { ...blockCssY.items[fieldSelector], 'margin-top': marginTop };
      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[fieldSelector]['margin-right'] !== undefined) ? blockCssY.items[fieldSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[fieldSelector] = { ...blockCssY.items[fieldSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[fieldSelector]['margin-bottom'] !== undefined) ? blockCssY.items[fieldSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[fieldSelector] = { ...blockCssY.items[fieldSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[fieldSelector]['margin-left'] !== undefined) ? blockCssY.items[fieldSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[fieldSelector] = { ...blockCssY.items[fieldSelector], 'margin-left': marginLeft };

      }

      setAttributes({ blockCssY: { items: blockCssY.items } });
    }





    function onChangeTypo(typoX) {

      setAttributes({ field: { ...field, styles: typoX } });



      if (typoX.fontFamily[breakPointX] != undefined) {

        blockCssY.items[fieldSelector] = { ...blockCssY.items[fieldSelector], 'font-family': typoX.fontFamily };

      }


      if (typoX.fontSize[breakPointX] != undefined) {

        var fontSizeVal = (typoX.fontSize[breakPointX].val) ? typoX.fontSize[breakPointX].val : 16;
        var fontSizeUnit = (typoX.fontSize[breakPointX].unit) ? typoX.fontSize[breakPointX].unit : 'px';


        var fontSizeX = (blockCssY.items[fieldSelector] != undefined) ? blockCssY.items[fieldSelector]['font-size'] : {};

        fontSizeX[breakPointX] = fontSizeVal + fontSizeUnit;
        blockCssY.items[fieldSelector] = { ...blockCssY.items[fieldSelector], 'font-size': fontSizeX };

      }



      if (typoX.lineHeight[breakPointX] != undefined) {

        var lineHeightVal = (typoX.lineHeight[breakPointX].val) ? typoX.lineHeight[breakPointX].val : 0;
        var lineHeightUnit = (typoX.lineHeight[breakPointX].unit) ? typoX.lineHeight[breakPointX].unit : 'px';


        var lineHeightX = (blockCssY.items[fieldSelector]['line-height'] != undefined) ? blockCssY.items[fieldSelector]['line-height'] : {};

        lineHeightX[breakPointX] = lineHeightVal + lineHeightUnit;

        blockCssY.items[fieldSelector] = { ...blockCssY.items[fieldSelector], 'line-height': lineHeightX };
      }
      if (typoX.letterSpacing[breakPointX] != undefined) {

        var letterSpacingVal = (typoX.letterSpacing[breakPointX].val) ? typoX.letterSpacing[breakPointX].val : 0;
        var letterSpacingUnit = (typoX.letterSpacing[breakPointX].unit) ? typoX.letterSpacing[breakPointX].unit : 'px';



        var letterSpacingX = (blockCssY.items[fieldSelector]['letter-spacing'] != undefined) ? blockCssY.items[fieldSelector]['letter-spacing'] : {};

        letterSpacingX[breakPointX] = letterSpacingVal + letterSpacingUnit;

        blockCssY.items[fieldSelector] = { ...blockCssY.items[fieldSelector], 'letter-spacing': letterSpacingX };
      }

      if (typoX.fontWeight[breakPointX] != undefined) {

        blockCssY.items[fieldSelector] = { ...blockCssY.items[fieldSelector], 'font-weight': typoX.fontWeight };

      }


      if (typoX.textDecoration[breakPointX] != undefined) {

        var str = {};

        var textDecorationX = typoX.textDecoration[breakPointX];
        var textDecorationXStr = (textDecorationX.length > 0) ? textDecorationX.join(' ') : '';

        str[breakPointX] = textDecorationXStr;


        blockCssY.items[fieldSelector] = { ...blockCssY.items[fieldSelector], 'text-decoration': str };

      }
      if (typoX.textTransform[breakPointX] != undefined) {

        blockCssY.items[fieldSelector] = { ...blockCssY.items[fieldSelector], 'text-transform': typoX.textTransform };


      }

      setAttributes({ blockCssY: { items: blockCssY.items } });



    }



    function onChangeTypoFrontText(typoX) {

      setAttributes({ frontText: { ...frontText, styles: typoX } });



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

      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);

    }, [blockCssY]);









    useEffect(() => {
      linkAttrObj();
      //generateBlockCssY();
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);




    }, [field]);


    var linkAttrObj = () => {

      var sdsd = {};

      field.options.linkAttr.map(x => {

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

            <div className='px-3'>

              <PanelRow>
                <label for="">Select User Field</label>
                <PGDropdown position="bottom right" variant="secondary" options={userFields} buttonTitle="Choose" onChange={setUserField} values={metaKey}></PGDropdown>

              </PanelRow>


              <PanelRow>
                <label for="">Custom Field</label>
                <InputControl
                  value={metaKey}
                  onChange={(newVal) => {

                    setAttributes({ metaKey: newVal });

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



            <PanelBody title="Field Settings" initialOpen={false}>

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
                    name: 'style',
                    title: 'Style',
                    icon: styles,
                    className: 'tab-style',
                  },



                ]}
              >

                <PGtab name="options">
                  <>

                    <ToggleControl
                      label="Is linked?"
                      help={(field.options != undefined && field.options.isLink) ? 'User field is linked' : 'User field is not linked'}
                      checked={(field.options != undefined && field.options.isLink) ? true : false}
                      onChange={(e) => {


                        var options = { ...field.options, isLink: field.options.isLink ? false : true };
                        setAttributes({ field: { ...field, options: options } });



                      }}
                    />

                    {field.options.isLink && (
                      <>

                        <PanelRow>
                          <label for="">Link To</label>



                          <PGDropdown position="bottom right" variant="secondary" options={linkToArgs} buttonTitle="Choose" onChange={setFieldLinkTo} values={metaKey}></PGDropdown>


                        </PanelRow>


                        <div className='bg-gray-500 p-2 my-3 text-white'>{(linkToArgs[field.options.linkTo] != undefined) ? linkToArgs[field.options.linkTo].label : ''}</div>

                        {field.options.linkTo == 'authorMeta' && (

                          <PanelRow>
                            <label for="">Author Meta Key</label>

                            <InputControl
                              value={field.options.linkToMeta}
                              onChange={(newVal) => {


                                var options = { ...field.options, linkToMeta: newVal };
                                setAttributes({ field: { ...field, options: options } });

                              }}
                            />

                          </PanelRow>

                        )}


                        {field.options.linkTo == 'customField' && (

                          <PanelRow>
                            <label for="">Custom Meta Key</label>

                            <InputControl
                              value={field.options.linkToAuthorMeta}
                              onChange={(newVal) => {

                                var options = { ...field.options, linkToAuthorMeta: newVal };
                                setAttributes({ field: { ...field, options: options } });

                              }}
                            />

                          </PanelRow>

                        )}



                        {field.options.linkTo == 'customUrl' && (

                          <>



                            <PanelRow>
                              <label for="">Custom Url</label>

                              <div className='relative'>
                                <Button className={(linkPickerPosttitle) ? "!bg-gray-400" : ''} icon={link} onClick={ev => {

                                  setLinkPickerPosttitle(prev => !prev);

                                }}></Button>
                                {field.options.customUrl.length > 0 && (
                                  <Button className='!text-red-500 ml-2' icon={linkOff} onClick={ev => {

                                    var options = { ...field.options, customUrl: '' };
                                    setAttributes({ field: { ...field, options: options } });
                                    setLinkPickerPosttitle(false);



                                  }}></Button>

                                )}
                                {linkPickerPosttitle && (
                                  <Popover position="bottom right">
                                    <LinkControl settings={[]} value={field.options.customUrl} onChange={newVal => {

                                      var options = { ...field.options, customUrl: newVal.url };

                                      setAttributes({ field: { ...field, options: options } });

                                    }} />

                                    <div className='p-2'><span className='font-bold'>Linked to:</span> {(field.options.customUrl.length != 0) ? field.options.customUrl : 'No link'} </div>
                                  </Popover>

                                )}


                              </div>
                            </PanelRow>

                          </>





                        )}



                        <PanelRow>
                          <label for="">Link Target</label>

                          <SelectControl
                            label=""
                            value={field.options.linkTarget}
                            options={[
                              { label: '_self', value: '_self' },
                              { label: '_blank', value: '_blank' },
                              { label: '_parent', value: '_parent' },
                              { label: '_top', value: '_top' },
                            ]}
                            onChange={
                              (newVal) => {
                                var options = { ...field.options, linkTarget: newVal };
                                setAttributes({ field: { ...field, options: options } });
                              }
                            }
                          />
                        </PanelRow>
                      </>

                    )}




                    {field.options.linkTo == 'custom' && (

                      <PanelRow>
                        <label for="">Custom URL</label>
                        <InputControl
                          value={field.options.customUrl}
                          onChange={
                            (newVal) => {
                              var options = { ...field.options, customUrl: newVal };
                              setAttributes({ field: { ...field, options: options } });
                            }
                          }
                        />
                      </PanelRow>

                    )}



                    <PanelRow>
                      <label for="">Prefix</label>
                      <InputControl
                        value={field.options.prefix}
                        onChange={(newVal) => {
                          var options = { ...field.options, prefix: newVal };
                          setAttributes({ field: { ...field, options: options } });
                        }
                        }
                      />
                    </PanelRow>

                    <PanelRow>
                      <label for="">Postfix</label>
                      <InputControl
                        value={field.options.postfix}
                        onChange={(newVal) => {


                          var options = { ...field.options, postfix: newVal };
                          setAttributes({ field: { ...field, options: options } });


                        }}
                      />
                    </PanelRow>




                    {field.options.isLink && (

                      <>
                        <PanelRow>
                          <label for="">Link Attributes</label>
                          <div
                            className=' cursor-pointer px-3 text-white py-1 bg-blue-600'
                            onClick={(ev) => {
                              var sdsd = field.options.linkAttr.concat({ id: '', val: '' })
                              var options = { ...field.options, linkAttr: sdsd };
                              setAttributes({ field: { ...field, options: options } });
                              linkAttrObj()
                            }}
                          >Add</div>
                        </PanelRow>
                        {
                          field.options.linkAttr.length > 0 && field.options.linkAttr.map((x, i) => {

                            return (

                              <div className='my-2'>
                                <PanelRow>
                                  <InputControl
                                    className='mr-2'
                                    value={field.options.linkAttr[i].id}
                                    onChange={(newVal) => {
                                      field.options.linkAttr[i].id = newVal;
                                      var ssdsd = field.options.linkAttr.concat([]);
                                      var options = { ...field.options, linkAttr: ssdsd };
                                      setAttributes({ field: { ...field, options: options } });
                                    }}
                                  />

                                  <InputControl
                                    className='mr-2'
                                    value={x.val}
                                    onChange={(newVal) => {
                                      field.options.linkAttr[i].val = newVal
                                      var ssdsd = field.options.linkAttr.concat([]);
                                      var options = { ...field.options, linkAttr: ssdsd };
                                      setAttributes({ field: { ...field, options: options } });

                                    }}
                                  />
                                  <span className='text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close'
                                    onClick={(ev) => {

                                      field.options.linkAttr.splice(i, 1);
                                      var ssdsd = field.options.linkAttr.concat([]);
                                      var options = { ...field.options, linkAttr: ssdsd };
                                      setAttributes({ field: { ...field, options: options } });
                                    }}

                                  ></span>
                                </PanelRow>
                              </div>
                            )
                          })
                        }
                      </>

                    )}


                  </>
                </PGtab>
                <PGtab name="style">
                  <PGStyles obj={field} onChange={onChangeStyleField} onAdd={onAddStyleField} onRemove={onRemoveStyleField} />
                </PGtab>
                <PGtab name="animation">

                </PGtab>

              </PGtabs>

              {/* 
              <TabPanel
                className=""
                activeClass="active-tab bg-gray-200"
                orientation="horizontal"
                initialTabName="settings"
                onSelect={(tabName) => {}}
                tabs={[
                  {
                    name: 'settings',
                    title: 'Options',
                    className: 'tab-settings',
                  },
                  {
                    name: 'style',
                    title: 'Style',
                    className: 'tab-style',
                  },
                ]}>
                {
                  (tab) => (
                    <div className='my-4'>
                      {tab.name == 'settings' && (

                        <>

                          <ToggleControl
                            label="Is linked?"
                            help={(field.options != undefined && field.options.isLink) ? 'User field is linked' : 'User field is not linked'}
                            checked={(field.options != undefined && field.options.isLink) ? true : false}
                            onChange={(e) => {


                              var options = { ...field.options, isLink: field.options.isLink ? false : true };
                              setAttributes({ field: { ...field, options: options } });



                            }}
                          />

                          {field.options.isLink && (
                            <>

                              <PanelRow>
                                <label for="">Link To</label>



                                <PGDropdown position="bottom right" variant="secondary" options={linkToArgs} buttonTitle="Choose" onChange={setFieldLinkTo} values={metaKey}></PGDropdown>


                              </PanelRow>


                              <div className='bg-gray-500 p-2 my-3 text-white'>{(linkToArgs[field.options.linkTo] != undefined) ? linkToArgs[field.options.linkTo].label : ''}</div>

                              {field.options.linkTo == 'authorMeta' && (

                                <PanelRow>
                                  <label for="">Author Meta Key</label>

                                  <InputControl
                                    value={field.options.linkToMeta}
                                    onChange={(newVal) => {


                                      var options = { ...field.options, linkToMeta: newVal };
                                      setAttributes({ field: { ...field, options: options } });

                                    }}
                                  />

                                </PanelRow>

                              )}


                              {field.options.linkTo == 'customField' && (

                                <PanelRow>
                                  <label for="">Custom Meta Key</label>

                                  <InputControl
                                    value={field.options.linkToAuthorMeta}
                                    onChange={(newVal) => {

                                      var options = { ...field.options, linkToAuthorMeta: newVal };
                                      setAttributes({ field: { ...field, options: options } });

                                    }}
                                  />

                                </PanelRow>

                              )}



                              {field.options.linkTo == 'customUrl' && (

                                <>



                                  <PanelRow>
                                    <label for="">Custom Url</label>

                                    <div className='relative'>
                                      <Button className={(linkPickerPosttitle) ? "!bg-gray-400" : ''} icon={link} onClick={ev => {

                                        setLinkPickerPosttitle(prev => !prev);

                                      }}></Button>
                                      {field.options.customUrl.length > 0 && (
                                        <Button className='!text-red-500 ml-2' icon={linkOff} onClick={ev => {

                                          var options = { ...field.options, customUrl: '' };
                                          setAttributes({ field: { ...field, options: options } });
                                          setLinkPickerPosttitle(false);



                                        }}></Button>

                                      )}
                                      {linkPickerPosttitle && (
                                        <Popover position="bottom right">
                                          <LinkControl settings={[]} value={field.options.customUrl} onChange={newVal => {

                                            var options = { ...field.options, customUrl: newVal.url };

                                            setAttributes({ field: { ...field, options: options } });

                                          }} />

                                          <div className='p-2'><span className='font-bold'>Linked to:</span> {(field.options.customUrl.length != 0) ? field.options.customUrl : 'No link'} </div>
                                        </Popover>

                                      )}


                                    </div>
                                  </PanelRow>

                                </>





                              )}



                              <PanelRow>
                                <label for="">Link Target</label>

                                <SelectControl
                                  label=""
                                  value={field.options.linkTarget}
                                  options={[
                                    { label: '_self', value: '_self' },
                                    { label: '_blank', value: '_blank' },
                                    { label: '_parent', value: '_parent' },
                                    { label: '_top', value: '_top' },
                                  ]}
                                  onChange={
                                    (newVal) => {
                                      var options = { ...field.options, linkTarget: newVal };
                                      setAttributes({ field: { ...field, options: options } });
                                    }
                                  }
                                />
                              </PanelRow>
                            </>

                          )}




                          {field.options.linkTo == 'custom' && (

                            <PanelRow>
                              <label for="">Custom URL</label>
                              <InputControl
                                value={field.options.customUrl}
                                onChange={
                                  (newVal) => {
                                    var options = { ...field.options, customUrl: newVal };
                                    setAttributes({ field: { ...field, options: options } });
                                  }
                                }
                              />
                            </PanelRow>

                          )}



                          <PanelRow>
                            <label for="">Prefix</label>
                            <InputControl
                              value={field.options.prefix}
                              onChange={(newVal) => {
                                var options = { ...field.options, prefix: newVal };
                                setAttributes({ field: { ...field, options: options } });
                              }
                              }
                            />
                          </PanelRow>

                          <PanelRow>
                            <label for="">Postfix</label>
                            <InputControl
                              value={field.options.postfix}
                              onChange={(newVal) => {


                                var options = { ...field.options, postfix: newVal };
                                setAttributes({ field: { ...field, options: options } });


                              }}
                            />
                          </PanelRow>




                          {field.options.isLink && (

                            <>
                              <PanelRow>
                                <label for="">Link Attributes</label>
                                <div
                                  className=' cursor-pointer px-3 text-white py-1 bg-blue-600'
                                  onClick={(ev) => {
                                    var sdsd = field.options.linkAttr.concat({ id: '', val: '' })
                                    var options = { ...field.options, linkAttr: sdsd };
                                    setAttributes({ field: { ...field, options: options } });
                                    linkAttrObj()
                                  }}
                                >Add</div>
                              </PanelRow>
                              {
                                field.options.linkAttr.length > 0 && field.options.linkAttr.map((x, i) => {

                                  return (

                                    <div className='my-2'>
                                      <PanelRow>
                                        <InputControl
                                          className='mr-2'
                                          value={field.options.linkAttr[i].id}
                                          onChange={(newVal) => {
                                            field.options.linkAttr[i].id = newVal;
                                            var ssdsd = field.options.linkAttr.concat([]);
                                            var options = { ...field.options, linkAttr: ssdsd };
                                            setAttributes({ field: { ...field, options: options } });

                                          }}
                                        />

                                        <InputControl
                                          className='mr-2'
                                          value={x.val}
                                          onChange={(newVal) => {
                                            field.options.linkAttr[i].val = newVal
                                            var ssdsd = field.options.linkAttr.concat([]);
                                            var options = { ...field.options, linkAttr: ssdsd };
                                            setAttributes({ field: { ...field, options: options } });

                                          }}
                                        />
                                        <span className='text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close'
                                          onClick={(ev) => {

                                            field.options.linkAttr.splice(i, 1);
                                            var ssdsd = field.options.linkAttr.concat([]);
                                            var options = { ...field.options, linkAttr: ssdsd };
                                            setAttributes({ field: { ...field, options: options } });
                                          }}

                                        ></span>
                                      </PanelRow>
                                    </div>
                                  )
                                })
                              }
                            </>

                          )}


                        </>

                      )}

                      {tab.name == 'style' && (
                        <PGStyles obj={field} onChange={onChangeStyleField} onAdd={onAddStyleField} onRemove={onRemoveStyleField} />

                      )}



                    </div>
                  )
                }
              </TabPanel> */}







              {/* 
              <PanelRow className='my-3'>
                <label>Color</label>
                <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
              </PanelRow>


              <ColorPalette
                value={field.styles.color[breakPointX]}
                colors={colorsPresets}
                enableAlpha
                onChange={(newVal) => {

                  var newValuesObj = {};


                  if (Object.keys(field.styles.color).length == 0) {
                    newValuesObj[breakPointX] = newVal;
                  } else {
                    newValuesObj = field.styles.color;
                    newValuesObj[breakPointX] = newVal;
                  }

                  var styles = { ...field.styles, color: newValuesObj };
                  setAttributes({ field: { ...field, styles: styles } });

                  blockCssY.items[fieldSelector] = { ...blockCssY.items[fieldSelector], color: newValuesObj };

                  setAttributes({ blockCssY: { items: blockCssY.items } });


                }}
              />


              <PanelRow className='my-3'>
                <label>Background Color</label>
                <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




              </PanelRow>


              <ColorPalette
                value={field.styles.backgroundColor[breakPointX]}
                colors={colorsPresets}
                enableAlpha
                onChange={(newVal) => {

                  var newValuesObj = {};


                  if (Object.keys(field.styles.backgroundColor).length == 0) {
                    newValuesObj[breakPointX] = newVal;
                  } else {
                    newValuesObj = field.styles.backgroundColor;
                    newValuesObj[breakPointX] = newVal;
                  }

                  var styles = { ...field.styles, backgroundColor: newValuesObj };
                  setAttributes({ field: { ...field, styles: styles } });



                  blockCssY.items[fieldSelector] = { ...blockCssY.items[fieldSelector], 'background-color': newValuesObj };

                  setAttributes({ blockCssY: { items: blockCssY.items } });



                }}
              />


              <PanelRow>
                <label>Padding</label>
                <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
              </PanelRow>
              <BoxControl
                label=""
                values={field.styles.padding[breakPointX]}
                onChange={(nextValues) => { paddingControlItems(nextValues) }}
              />


              <PanelRow>
                <label>Margin</label>
                <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
              </PanelRow>
              <BoxControl
                label=""
                values={field.styles.margin[breakPointX]}
                onChange={(nextValues) => { marginControlItems(nextValues) }}
              />


              <Typography typo={field.styles} breakPointX={breakPointX} onChange={onChangeTypo} setAttributes={setAttributes} obj={field} /> */}




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
                        { label: 'Before Field', value: 'beforeField' },
                        { label: 'After Field', value: 'afterField' },

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
                  <PGStyles obj={wrapper} onChange={onChangeStyleIcon} onAdd={onAddStyleIcon} onRemove={onRemoveStyleIcon} />
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



            <PanelBody title="Custom Style" initialOpen={false}>

              <p>Please use following class selector to apply your custom CSS</p>
              <div className='my-3'>
                <p className='font-bold'>Wrapper</p>
                <p><code>{wrapperSelector}{'{/* your CSS here*/}'}</code></p>
              </div>

              <div className='my-3'>
                <p className='font-bold'>Field Selector</p>
                <p><code>{fieldSelector}{'{}'} </code></p>
                <p><code>.pg-postAuthor a{'{/* your CSS here*/}'}</code></p>
              </div>



              <div className='my-3'>
                <p className='font-bold'>Front Text</p>
                <p><code>{frontTextSelector}{'{/* your CSS here*/}'} </code></p>
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

          {metaKey.length == 0 && (

            <div>
              <PanelRow>
                <label for="">Select User Field</label>
                <PGDropdown position="bottom right" variant="secondary" options={userFields} buttonTitle="Choose" onChange={setUserField} values={metaKey}></PGDropdown>

              </PanelRow>


              <PanelRow>
                <label for="">Custom Field</label>
                <InputControl
                  value={metaKey}
                  onChange={(newVal) => {

                    setAttributes({ metaKey: newVal });

                  }}
                />

              </PanelRow>



            </div>

          )}

          {loading && (<Spinner />)}


          {metaKey.length > 0 && (

            <div className={[blockId]}>

              {icon.options.position == 'beforeFronttext' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}

              {frontText.options.text.length > 0 && (

                <span className='frontText'>{frontText.options.text}</span>

              )}

              {icon.options.position == 'afterFronttext' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}

              {icon.options.position == 'beforeField' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}


              {!field.options.isLink && (
                <>
                  {field.options.prefix.length > 0 && (
                    <span className='prefix'>{field.options.prefix}</span>
                  )}

                  {metaKey == 'avatar' && (
                    <img className='fieldVal' src={postAuthorData['avatar_url']} alt={postAuthorData['display_name']} />
                  )}

                  {metaKey != 'avatar' && (
                    <span className='fieldVal'>{postAuthorData[metaKey]}</span>
                  )}

                  {field.options.postfix.length > 0 && (
                    <span className='postfix'>{field.options.postfix}</span>
                  )}
                </>
              )





              }



              {field.options.isLink && (
                <a href='#' target={field.options.linkTarget} >
                  {field.options.prefix.length > 0 && (
                    <span className='prefix'>{field.options.prefix}</span>
                  )}

                  {metaKey == 'avatar' && (
                    <img className='fieldVal' src={postAuthorData['avatar_url']} alt={postAuthorData['display_name']} />
                  )}


                  {metaKey != 'avatar' && (
                    <span className='fieldVal'>{postAuthorData[metaKey]}</span>
                  )}


                  {field.options.postfix.length > 0 && (
                    <span className='postfix'>{field.options.postfix}</span>
                  )}
                </a>

              )}

              {icon.options.position == 'afterField' && (
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