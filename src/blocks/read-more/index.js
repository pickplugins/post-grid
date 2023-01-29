import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover, Spinner } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';
import { applyFilters } from '@wordpress/hooks';

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'
import { link, linkOff } from "@wordpress/icons";

import IconToggle from '../../components/icon-toggle'
import Typography from '../../components/typography'
import PGIconPicker from '../../components/icon-picker'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'

import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import PGcssDisplay from '../../components/css-display'
import PGDropdown from '../../components/dropdown'



var myStore = wp.data.select('postgrid-shop');



registerBlockType("post-grid/read-more", {
  title: "Read More",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:



      <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 109C25 106.239 27.2386 104 30 104H470C472.761 104 475 106.239 475 109V159C475 161.761 472.761 164 470 164H30C27.2386 164 25 161.761 25 159V109Z" />
        <path d="M25 218C25 215.239 27.2386 213 30 213H470C472.761 213 475 215.239 475 218V268C475 270.761 472.761 273 470 273H30C27.2386 273 25 270.761 25 268V218Z" />
        <path d="M393.013 353.889H153.733C141.78 353.889 132 363.652 132 375.585C132 387.518 141.78 397.282 153.733 397.282H393.013V436.119C393.013 445.882 404.748 450.655 411.486 443.712L471.903 383.179C476.032 378.84 476.032 372.114 471.903 367.775L411.486 307.241C404.748 300.299 393.013 305.289 393.013 314.835V353.889V353.889Z" />
      </svg>

    ,
  },


  attributes: {

    wrapper: {
      type: 'object',
      default: {
        options: { tag: 'div', class: '' },
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

    readMore: {
      type: 'object',
      default: {
        options: {
          text: 'Read More', linkTo: 'postUrl', isLink: true, linkTarget: '_blank', customUrl: '', linkToAuthorMeta: '',
          linkToCustomMeta: '', linkAttr: [], class: '',
        },

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
          letterSpacing: {}, // { val: '18', unit: 'px' }
          fontFamily: {},
          fontWeight: { "Desktop": "700" },
          textDecoration: {}, //overline, line-through, underline
          textTransform: {},

        },
      },
    },


    icon: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', position: '', /*before, after, prefix, postfix */ class: 'readmore-icon', },

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



    prefix: {
      type: 'object',
      default: {
        options: { text: '', class: 'prefix' },

        styles:
        {
          color: {},
          bgColor: {},

        },
      },
    },

    postfix: {
      type: 'object',
      default: {
        options: { text: '', class: 'postfix' },

        styles:
        {
          color: {},
          bgColor: {},

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

    linkAttr: {
      "type": "array",
      "default": []
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
    var readMore = attributes.readMore;
    var icon = attributes.icon;


    var linkAttr = attributes.linkAttr;
    var prefix = attributes.prefix;
    var postfix = attributes.postfix;
    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    var postId = context['postId'];
    var postType = context['postType'];

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    const [isLoading, setisLoading] = useState(false);
    const [currentPostContent, setCurrentpostContent] = useEntityProp('postType', postType, 'content', postId);
    const [customFields, setCustomFields] = useState({});

    const [currentPostUrl, setCurrentPostUrl] = useEntityProp('postType', postType, 'link', postId);

    const [iconHtml, setIconHtml] = useState('');
    const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);



    // Wrapper CSS Class Selectors
    const redmoreWrapperSelector = blockClass;
    const redmoreSelector = blockClass + ' .readmore';
    const iconSelector = blockClass + ' .readmore-icon';

    const prefixSelector = blockClass + ' .prefix';
    const postfixSelector = blockClass + ' .postfix';


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



    function setFieldLinkTo(option, index) {

      var options = { ...readMore.options, linkTo: option.value };
      setAttributes({ readMore: { ...readMore, options: options } });

    }

    function getMetaField(metaKey) {


      apiFetch({
        path: '/post-grid/v2/get_post_meta',
        method: 'POST',
        data: { postId: postId, meta_key: metaKey },
      }).then((res) => {


        if (res['meta_value'] != undefined && res['meta_value'].length > 0) {
          customFields[metaKey] = res['meta_value'];
          setCustomFields({})
          setCustomFields(customFields)

        }



      });




    }






    useEffect(() => {


      setAttributes({ customCss: customCss });


      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);






    const [linkPickerExcerpt, setLinkPickerExcerpt] = useState(false);
    const [linkPickerReadmore, setLinkPickerReadmore] = useState(false);





    useEffect(() => {

      setAttributes({ blockId: blockIdX });

      //generateBlockCssY();
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);

    }, [clientId]);



    useEffect(() => {

      var iconSrc = icon.options.iconSrc;

      var iconHtml = `<span class="${iconSrc}"></span>`;

      setIconHtml(iconHtml);




    }, [icon]);


    var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }



    function handleLinkClick(ev) {

      ev.stopPropagation();
      ev.preventDefault();
      return false;
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


        var fontSizeX = (blockCssY.items[iconSelector]['font-size'] != undefined) ? blockCssY.items[iconSelector]['font-size'] : {};

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
    function onChangeReadmoreTypo(typoX) {


      setAttributes({ readMore: { ...readMore, styles: typoX } });

      var newValuesObjX = {};
      var itemsX = blockCssY.items;


      if (typoX.fontFamily[breakPointX] != undefined) {
        itemsX[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'font-family': typoX.fontFamily };


      } else {

        //typoX.fontFamily[breakPointX] = {};
        itemsX[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'font-family': typoX.fontFamily };

      }


      if (typoX.fontSize[breakPointX] != undefined) {

        var fontSizeVal = (typoX.fontSize[breakPointX].val) ? typoX.fontSize[breakPointX].val : 16;
        var fontSizeUnit = (typoX.fontSize[breakPointX].unit) ? typoX.fontSize[breakPointX].unit : 'px';


        var fontSizeX = (blockCssY.items[redmoreSelector]['font-size'] != undefined) ? blockCssY.items[redmoreSelector]['font-size'] : {};

        fontSizeX[breakPointX] = fontSizeVal + fontSizeUnit;
        //blockCssY.items[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'font-size': fontSizeX };
        itemsX[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'font-size': fontSizeX };

      }


      if (typoX.lineHeight[breakPointX] != undefined) {

        var lineHeightVal = (typoX.lineHeight[breakPointX].val) ? typoX.lineHeight[breakPointX].val : 16;
        var lineHeightUnit = (typoX.lineHeight[breakPointX].unit) ? typoX.lineHeight[breakPointX].unit : 'px';


        var lineHeightX = (blockCssY.items[redmoreSelector]['line-height'] != undefined) ? blockCssY.items[redmoreSelector]['line-height'] : {};

        lineHeightX[breakPointX] = lineHeightVal + lineHeightUnit;

        //blockCssY.items[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'line-height': lineHeightX };
        itemsX[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'line-height': lineHeightX };

      }
      if (typoX.letterSpacing[breakPointX] != undefined) {

        var letterSpacingVal = (typoX.letterSpacing[breakPointX].val) ? typoX.letterSpacing[breakPointX].val : 0;
        var letterSpacingUnit = (typoX.letterSpacing[breakPointX].unit) ? typoX.letterSpacing[breakPointX].unit : 'px';



        var letterSpacingX = (blockCssY.items[redmoreSelector]['letter-spacing'] != undefined) ? blockCssY.items[redmoreSelector]['letter-spacing'] : {};

        letterSpacingX[breakPointX] = letterSpacingVal + letterSpacingUnit;

        //blockCssY.items[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'letter-spacing': letterSpacingX };
        itemsX[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'letter-spacing': letterSpacingX };

      }

      if (typoX.fontWeight[breakPointX] != undefined) {

        itemsX[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'font-weight': typoX.fontWeight };

      }


      if (typoX.textDecoration[breakPointX] != undefined) {

        var str = {};

        var textDecorationX = typoX.textDecoration[breakPointX];
        var textDecorationXStr = (textDecorationX.length > 0) ? textDecorationX.join(' ') : '';

        str[breakPointX] = textDecorationXStr;
        itemsX[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'text-decoration': str };



      }
      if (typoX.textTransform[breakPointX] != undefined) {

        itemsX[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'text-transform': typoX.textTransform };


      }



      //setAttributes({ blockCssY: { items: blockCssY.items } });
      setAttributes({ blockCssY: { items: itemsX } });



    }

    function paddingControlReadmore(nextValues) {


      var responsive = readMore.styles.padding;
      responsive[breakPointX] = nextValues;


      var styles = { ...readMore.styles, padding: responsive };
      setAttributes({ readMore: { ...readMore, styles: styles } });

      var itemsX = { ...blockCssY.items };



      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;



      blockCssY.items[redmoreSelector] = (blockCssY.items[redmoreSelector] != undefined) ? blockCssY.items[redmoreSelector] : {};

      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[redmoreSelector]['padding-top'] != undefined) ? blockCssY.items[redmoreSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top
        blockCssY.items[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'padding-top': paddingTop };
      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[redmoreSelector]['padding-right'] != undefined) ? blockCssY.items[redmoreSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right
        blockCssY.items[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'padding-right': paddingRight };
      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[redmoreSelector]['padding-bottom'] != undefined) ? blockCssY.items[redmoreSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom
        blockCssY.items[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'padding-bottom': paddingBottom };
      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[redmoreSelector]['padding-left'] != undefined) ? blockCssY.items[redmoreSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'padding-left': paddingLeft };
      }

      setAttributes({ blockCssY: { items: blockCssY.items } });

    }




    function marginControlReadmore(nextValues) {

      var responsive = readMore.styles.margin;
      responsive[breakPointX] = nextValues;

      var styles = { ...readMore.styles, margin: responsive };
      setAttributes({ readMore: { ...readMore, styles: styles } });

      var itemsX = { ...blockCssY.items };



      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;

      blockCssY.items[redmoreSelector] = (blockCssY.items[redmoreSelector] != undefined) ? blockCssY.items[redmoreSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[redmoreSelector]['margin-top'] != undefined) ? blockCssY.items[redmoreSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'margin-top': marginTop };

      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[redmoreSelector]['margin-right'] !== undefined) ? blockCssY.items[redmoreSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[redmoreSelector]['margin-bottom'] !== undefined) ? blockCssY.items[redmoreSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[redmoreSelector]['margin-left'] !== undefined) ? blockCssY.items[redmoreSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'margin-left': marginLeft };

      }

      setAttributes({ blockCssY: { items: blockCssY.items } });

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












    var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.
    var [linkAttrItemsReadmore, setlinkAttrItemsReadmore] = useState({}); // Using the hook.



    useEffect(() => {

      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);







    useEffect(() => {

      var sdsd = {};

      readMore.options.linkAttr.map(x => {

        if (x.val)
          sdsd[x.id] = x.val;

      })

      setlinkAttrItemsReadmore(sdsd);


    }, [readMore]);






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


    var postUrl = (readMore.options.customUrl != undefined && readMore.options.customUrl.length > 0) ? readMore.options.customUrl : currentPostUrl;


    const CustomTag = `${wrapper.options.tag}`;






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
              value={readMore.styles.textAlign}
              onChange={(nextAlign) => {


                var styles = { ...readMore.styles, textAlign: nextAlign };
                setAttributes({ readMore: { ...readMore, styles: styles } });



              }}
            />







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

                      blockCssY.items[redmoreWrapperSelector] = { ...blockCssY.items[redmoreWrapperSelector], 'display': newValuesObj };
                      setAttributes({ blockCssY: { items: blockCssY.items } });

                    })} />
                  </PanelRow>


                </PanelBody>





                <PanelBody title="Read More" initialOpen={false}>







                  <PanelRow>
                    <label for="">Read More Text</label>

                    <InputControl
                      value={readMore.options.text}
                      onChange={(newVal) => {

                        var options = { ...readMore.options, text: newVal };
                        setAttributes({ readMore: { ...readMore, options: options } });
                      }
                      }
                    />
                  </PanelRow>






                  <ToggleControl
                    label="Is Linked?"
                    help={readMore.options.isLink ? 'Linked with URL' : 'Not linked to URL.'}
                    checked={readMore.options.isLink ? true : false}
                    onChange={(e) => {


                      var options = { ...readMore.options, isLink: readMore.options.isLink ? false : true, };
                      setAttributes({ readMore: { ...readMore, options: options } });



                    }}
                  />

                  {readMore.options.isLink && (

                    <div>


                      <PanelRow>
                        <label for="">Link To</label>

                        <PGDropdown position="bottom right" variant="secondary" options={linkToArgs} buttonTitle={readMore.options.linkTo.length == 0 ? 'Choose' : linkToArgs[readMore.options.linkTo].label} onChange={setFieldLinkTo} values={[]}></PGDropdown>

                      </PanelRow>


                      <div className='bg-gray-500 p-2 my-3 text-white'>{(linkToArgs[readMore.options.linkTo] != undefined) ? linkToArgs[readMore.options.linkTo].label : ''}</div>

                      {readMore.options.linkTo == 'authorMeta' && (

                        <PanelRow>
                          <label for="">Author Meta Key</label>

                          <InputControl
                            value={readMore.options.linkToAuthorMeta}
                            onChange={(newVal) => {


                              var options = { ...readMore.options, linkToAuthorMeta: newVal };
                              setAttributes({ readMore: { ...readMore, options: options } });

                            }}
                          />

                        </PanelRow>

                      )}


                      {readMore.options.linkTo == 'customField' && (

                        <PanelRow>
                          <label for="">Custom Meta Key</label>

                          <InputControl
                            value={readMore.options.linkToAuthorMeta}
                            onChange={(newVal) => {

                              var options = { ...readMore.options, linkToAuthorMeta: newVal };
                              setAttributes({ readMore: { ...readMore, options: options } });

                            }}
                          />

                        </PanelRow>

                      )}



                      {readMore.options.linkTo == 'customUrl' && (


                        <PanelRow>
                          <label for="">Custom Url</label>

                          <div className='relative'>
                            <Button className={(linkPickerPosttitle) ? "!bg-gray-400" : ''} icon={link} onClick={ev => {

                              setLinkPickerPosttitle(prev => !prev);

                            }}></Button>
                            {readMore.options.customUrl.length > 0 && (
                              <Button className='!text-red-500 ml-2' icon={linkOff} onClick={ev => {

                                var options = { ...readMore.options, customUrl: '' };
                                setAttributes({ readMore: { ...readMore, options: options } });
                                setLinkPickerPosttitle(false);



                              }}></Button>

                            )}
                            {linkPickerPosttitle && (
                              <Popover position="bottom right">
                                <LinkControl settings={[]} value={readMore.options.customUrl} onChange={newVal => {

                                  var options = { ...readMore.options, customUrl: newVal.url };

                                  setAttributes({ readMore: { ...readMore, options: options } });

                                }} />

                                <div className='p-2'><span className='font-bold'>Linked to:</span> {(readMore.options.customUrl.length != 0) ? readMore.options.customUrl : 'No link'} </div>
                              </Popover>

                            )}


                          </div>
                        </PanelRow>
                      )}





                      <PanelRow>
                        <label for="">Link Target</label>

                        <SelectControl
                          label=""
                          value={readMore.options.linkTarget}
                          options={[
                            { label: '_self', value: '_self' },
                            { label: '_blank', value: '_blank' },
                            { label: '_parent', value: '_parent' },
                            { label: '_top', value: '_top' },


                          ]}
                          onChange={(newVal) => {


                            var options = { ...readMore.options, linkTarget: newVal };
                            setAttributes({ readMore: { ...readMore, options: options } });


                          }



                          }
                        />
                      </PanelRow>





                      <PanelRow>
                        <label for="">Custom Attributes</label>
                        <div
                          className=' cursor-pointer px-3 text-white py-1 bg-blue-600'

                          onClick={(ev) => {

                            var sdsd = readMore.options.linkAttr.concat({ id: '', val: '' })



                            var options = { ...readMore.options, linkAttr: sdsd };
                            setAttributes({ readMore: { ...readMore, options: options } });






                          }}

                        >Add</div>



                      </PanelRow>



                      {
                        readMore.options.linkAttr != undefined && readMore.options.linkAttr.map((x, i) => {

                          return (

                            <div className='my-2'>
                              <PanelRow>
                                <InputControl
                                  placeholder="Name"
                                  className='mr-2'
                                  value={readMore.options.linkAttr[i].id}
                                  onChange={(newVal) => {

                                    readMore.options.linkAttr[i].id = newVal;


                                    var ssdsd = readMore.options.linkAttr.concat([]);



                                    var options = { ...readMore.options, linkAttr: ssdsd };
                                    setAttributes({ readMore: { ...readMore, options: options } });



                                  }}
                                />

                                <InputControl
                                  className='mr-2'
                                  placeholder="Value"
                                  value={x.val}
                                  onChange={(newVal) => {
                                    readMore.options.linkAttr[i].val = newVal
                                    var ssdsd = readMore.options.linkAttr.concat([]);



                                    var options = { ...readMore.options, linkAttr: ssdsd };
                                    setAttributes({ readMore: { ...readMore, options: options } });


                                  }}
                                />
                                <span className='text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close'
                                  onClick={(ev) => {

                                    readMore.options.linkAttr.splice(i, 1);

                                    var ssdsd = readMore.options.linkAttr.concat([]);




                                    var options = { ...readMore.options, linkAttr: ssdsd };
                                    setAttributes({ readMore: { ...readMore, options: options } });


                                  }}

                                ></span>
                              </PanelRow>




                            </div>

                          )

                        })
                      }


                    </div>



                  )}


                  <PanelRow className='my-3'>
                    <label>Color</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                  </PanelRow>

                  <ColorPalette
                    value={readMore.styles.color[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {

                      // var responsive = readMore.styles.color;
                      // responsive[breakPointX] = newVal;



                      // var styles = { ...readMore.styles, color: responsive };
                      // setAttributes({ readMore: { ...readMore, styles: styles } });





                      var newValuesObj = {};


                      if (Object.keys(readMore.styles.color).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = readMore.styles.color;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...readMore.styles, color: newValuesObj };
                      setAttributes({ readMore: { ...readMore, styles: styles } });



                      var itemsX = { ...blockCssY.items };
                      itemsX[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'color': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });


                    }}
                  />



                  <PanelRow className='my-3'>
                    <label>Background Color</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                  </PanelRow>

                  <ColorPalette
                    value={readMore.styles.bgColor[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {






                      var newValuesObj = {};


                      if (Object.keys(readMore.styles.bgColor).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = readMore.styles.bgColor;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...readMore.styles, bgColor: newValuesObj };
                      setAttributes({ readMore: { ...readMore, styles: styles } });





                      var itemsX = { ...blockCssY.items };
                      itemsX[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'background-color': newValuesObj };

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
                      value={readMore.styles.display[breakPointX]}

                      options={[
                        { label: 'Select..', value: '' },
                        { label: 'inline', value: 'inline' },
                        { label: 'inline-block', value: 'inline-block' },
                        { label: 'block', value: 'block' },

                      ]}
                      onChange={(newVal) => {

                        var newValuesObj = {};

                        if (Object.keys(readMore.styles.display).length == 0) {
                          newValuesObj[breakPointX] = newVal;
                        } else {
                          newValuesObj = readMore.styles.display;
                          newValuesObj[breakPointX] = newVal;
                        }

                        var styles = { ...readMore.styles, display: newValuesObj };
                        setAttributes({ readMore: { ...readMore, styles: styles } });



                        var itemsX = { ...blockCssY.items };
                        itemsX[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'display': newValuesObj };

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
                    values={readMore.styles.padding[breakPointX]}
                    onChange={(nextValues) => { paddingControlReadmore(nextValues) }}
                  />

                  <PanelRow>
                    <label>Margin</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=""
                    values={readMore.styles.margin[breakPointX]}
                    onChange={(nextValues) => { marginControlReadmore(nextValues) }}
                  />


                  <PanelRow>
                    <div className='font-bold'>Typography</div>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>

                  <Typography typo={readMore.styles} breakPointX={breakPointX} onChange={onChangeReadmoreTypo} setAttributes={setAttributes} obj={readMore} />



                </PanelBody>

                <PanelBody title="Icon" initialOpen={false}>


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

                        { label: 'Before Readmore Text', value: 'beforeRedmore' },
                        { label: 'After Readmore Text', value: 'afterRedmore' },
                        { label: 'Before Prefix', value: 'beforePrefix' },
                        { label: 'After Prefix', value: 'afterPrefix' },
                        { label: 'Before Postfix', value: 'beforePostfix' },
                        { label: 'After Postfix', value: 'afterPostfix' },

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


                  <PanelRow>
                    <div className='font-bold'>Typography</div>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>

                  <Typography typo={icon.styles} breakPointX={breakPointX} onChange={onChangeIconTypo} setAttributes={setAttributes} obj={icon} />




                </PanelBody>

                <PanelBody title="Prefix" initialOpen={false}>
                  <PanelRow>
                    <label for="">Prefix</label>

                    <InputControl
                      value={prefix.options.text}
                      onChange={(newVal) => {


                        var options = { ...prefix.options, text: newVal };
                        setAttributes({ prefix: { ...prefix, options: options } });


                      }
                      }
                    />
                  </PanelRow>

                </PanelBody>




                <PanelBody title="Postfix" initialOpen={false}>




                  <PanelRow>
                    <label for="">Postfix</label>

                    <InputControl
                      value={postfix.options.text}
                      onChange={(newVal) => {

                        var options = { ...postfix.options, text: newVal };
                        setAttributes({ postfix: { ...postfix, options: options } });



                      }

                      }
                    />
                  </PanelRow>

                </PanelBody>

                <PanelBody title="Custom Style" initialOpen={false}>


                  <p>Please use following class selector to apply your custom CSS</p>
                  <div className='my-3'>
                    <p className='font-bold'>Excerpt Wrapper</p>
                    <p><code>{redmoreWrapperSelector}{'{/* your CSS here*/}'}</code></p>
                  </div>


                  <div className='my-3'>
                    <p className='font-bold'>Read More</p>
                    <p><code>{redmoreSelector}{'{/* your CSS here*/}'} </code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Prefix Selector</p>
                    <p><code>{prefixSelector}{'{/* your CSS here*/}'} </code></p>
                  </div>


                  <div className='my-3'>
                    <p className='font-bold'>Postfix Selector</p>
                    <p><code>{postfixSelector}{'{/* your CSS here*/}'} </code></p>
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
                  <PGContactSupport utm={{ utm_source: 'BlockReadMore', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />

                </div>



              </div>
            </div>






          </InspectorControls >
        </div >
        ,


        <>

          {wrapper.options.tag && (
            <CustomTag className={[blockId]}>

              {icon.options.position == 'beforePrefix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}

              {prefix.options.text && (
                <span className={prefix.options.class}>{prefix.options.text}</span>
              )}

              {icon.options.position == 'afterPrefix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}


              {readMore.options.isLink && (
                <a className='readmore' onClick={handleLinkClick}  {...linkAttrItemsReadmore} target={readMore.options.linkTarget} href={postUrl}>

                  {icon.options.position == 'beforeRedmore' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}

                  <RichText
                    className='text'
                    tagName={'span'}
                    value={readMore.options.text}
                    allowedFormats={['core/bold', 'core/italic', 'core/link']}
                    onChange={(content) => {
                      var options = { ...readMore.options, text: content };
                      setAttributes({ readMore: { ...readMore, options: options } });
                    }}
                    placeholder={__('Start Writing...')}
                  />



                  {icon.options.position == 'afterRedmore' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                </a>
              )}

              {!readMore.options.isLink && (
                <RichText
                  className='text'
                  tagName={'span'}
                  value={readMore.options.text}
                  allowedFormats={['core/bold', 'core/italic', 'core/link']}
                  onChange={(content) => {
                    var options = { ...readMore.options, text: content };
                    setAttributes({ readMore: { ...readMore, options: options } });
                  }}
                  placeholder={__('Start Writing...')}
                />
              )}




              {icon.options.position == 'beforePostfix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}

              {postfix.options.text &&
                (<span className={postfix.options.class}>{postfix.options.text}</span>)}
              {icon.options.position == 'afterPostfix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}

            </CustomTag>
          )}

          {wrapper.options.tag.length == 0 && (

            <>


              {icon.options.position == 'beforePostfix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}
              {prefix.options.text && (
                <span className={prefix.options.class}>{prefix.options.text}</span>
              )}

              {icon.options.position == 'beforePostfix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}

              {readMore.options.isLink && (
                <a className='readmore' onClick={handleLinkClick}  {...linkAttrItemsReadmore} target={readMore.options.linkTarget} href={postUrl}>

                  {icon.options.position == 'beforeRedmore' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}


                  <RichText
                    className='text'
                    tagName={'span'}
                    value={readMore.options.text}
                    allowedFormats={['core/bold', 'core/italic', 'core/link']}
                    onChange={(content) => {
                      var options = { ...readMore.options, text: content };
                      setAttributes({ readMore: { ...readMore, options: options } });
                    }}
                    placeholder={__('Start Writing...')}
                  />


                  {icon.options.position == 'afterRedmore' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                </a>
              )}
              {!readMore.options.isLink && (

                <>
                  {icon.options.position == 'beforeRedmore' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}

                  <RichText
                    className='text'
                    tagName={'span'}
                    value={readMore.options.text}
                    allowedFormats={['core/bold', 'core/italic', 'core/link']}
                    onChange={(content) => {
                      var options = { ...readMore.options, text: content };
                      setAttributes({ readMore: { ...readMore, options: options } });
                    }}
                    placeholder={__('Start Writing...')}
                  />


                  {icon.options.position == 'afterRedmore' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                </>



              )}



              {icon.options.position == 'beforePostfix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}
              {postfix.options.text &&
                (<span className={postfix.options.class}>{postfix.options.text}</span>)}
              {icon.options.position == 'afterPostfix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}
            </>




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