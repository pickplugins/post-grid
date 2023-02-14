import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { applyFilters } from '@wordpress/hooks';

import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'

import { Icon, styles, settings, link, linkOff } from "@wordpress/icons";


import IconToggle from '../../components/icon-toggle'
import Typography from '../../components/typography'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import PGDropdown from '../../components/dropdown'
import PGIconPicker from '../../components/icon-picker'
import PGcssDisplay from '../../components/css-display'

import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'

var myStore = wp.data.select('postgrid-shop');

registerBlockType("post-grid/archive-title", {
  title: "Archive Title",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:
      <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 95C25 92.2386 27.2386 90 30 90H470C472.761 90 475 92.2386 475 95V145C475 147.761 472.761 150 470 150H30C27.2386 150 25 147.761 25 145V95Z" />
        <path d="M25 234C25 231.239 27.2386 229 30 229H470C472.761 229 475 231.239 475 234V254C475 256.761 472.761 259 470 259H30C27.2386 259 25 256.761 25 254V234Z" />
        <path d="M25 298C25 295.239 27.2386 293 30 293H470C472.761 293 475 295.239 475 298V318C475 320.761 472.761 323 470 323H30C27.2386 323 25 320.761 25 318V298Z" />
        <path d="M25 362C25 359.239 27.2386 357 30 357H366C368.761 357 371 359.239 371 362V382C371 384.761 368.761 387 366 387H30C27.2386 387 25 384.761 25 382V362Z" />
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
          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},

        },
      },
    },

    archiveTitle: {
      type: 'object',
      default: {
        options: {
          tag: 'div',
          archiveType: 'auto',
          customLabel: 'Archive: %s',
          dateFormat: '',


          linkTo: '', // postUrl, customField, authorUrl, authorLink, homeUrl, custom
          linkToUrl: '',
          linkToMetaKey: '',

          linkTarget: '_blank',
          linkAttr: [],
          customUrl: '',
          class: '',
        },

        styles: {
          color: {},
          backgroundColor: {},
          padding: {},


          fontSize: {}, //{ val: '18', unit: 'px' }

        },
      },
    },
    icon: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'far fa-calendar-alt', position: 'beforeArchiveTitle', /*before, after, prefix, postfix */ class: 'postdate-icon', },

        styles:
        {
          color: {},
          backgroundColor: {},
          padding: {},
          margin: {},
          fontSize: {}, //{ val: '18', unit: 'px' }

        },
      },
    },


    prefix: {
      type: 'object',
      default: {
        options:
          { text: '', class: 'prefix', },
        styles:
        {
          color: {},
          backgroundColor: {},

        },
      },
    },

    postfix: {
      type: 'object',
      default: {
        options:
          { text: '', class: 'prefix', },
        styles:
        {
          color: {},
          backgroundColor: {},

        },
      },
    },



    customCss: {
      "type": "string",
      "default": ''
    },


    blockId: {
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


    let archiveTitle = attributes.archiveTitle;
    var wrapper = attributes.wrapper;
    var blockId = attributes.blockId;

    var blockIdX = attributes.blockId ? attributes.blockId : 'pg' + clientId.split('-').pop();
    var blockClass = '.' + blockIdX;
    var icon = attributes.icon;

    var prefix = attributes.prefix;
    var postfix = attributes.postfix;
    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;



    var postId = context['postId'];
    var postType = context['postType'];

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    const [customTags, setCustomTags] = useState({});
    const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);


    var archiveTypes = {
      'auto': { label: 'Auto Detect', value: 'auto' },
      // 'author': { label: 'Author', value: 'author' },
      // 'category': { label: 'Category', value: 'category' },
      // 'tag': { label: 'Tag', value: 'tag' },
      // 'taxonomy': { label: 'Taxonomy', value: 'taxonomy' },
      // 'search': { label: 'Search', value: 'search' },
      // 'index': { label: 'Index', value: 'index' },
      // 'year': { label: 'Year', value: 'year' },
      // 'month': { label: 'Month', value: 'month' },
      // 'date': { label: 'Date', value: 'date' },

      // 'wcCatalog': { label: 'WooCommerce Catalog', value: 'wcCatalog' },
      // 'wcSearch': { label: 'WooCommerce Search', value: 'wcSearch' },

    }


    var archiveLinkToArgsBasic = {
      none: { label: 'No Link', value: '' },
      archiveUrl: { label: 'Archive URL', value: 'archiveUrl' },
      homeUrl: { label: 'Home URL', value: 'homeUrl' },
      customUrl: { label: 'Custom', value: 'customUrl' },
    };

    let archiveLinkToArgs = applyFilters('archiveLinkToArgs', archiveLinkToArgsBasic);



    var dateFormats = {
      'Y-M-d': { label: '2022-May-25', value: 'Y-M-d' },
      'Y-m-d': { label: '2022-05-25', value: 'Y-m-d' },
      'd-m-y': { label: '25-05-2022', value: 'd-m-y' },
      'd/m/y': { label: '25/05/2022', value: 'd/m/y' },
      'y-m-d': { label: '2022-05-25', value: 'y-m-d' },
      'y/m/d': { label: '2022/05/25', value: 'y/m/d' },
      'D M y': { label: 'Sun May 2022', value: 'D M y' },
      'D M d, y': { label: 'Sun May 11, 2022', value: 'D M d, y' },
      'M D d, y': { label: 'May Sun 11, 2022', value: 'M D d, y' },
      'M d, y': { label: 'May 11, 2022', value: 'M d, y' },

      'd M y': { label: '25 May 2022', value: 'd M y' },
    }



    const [archiveTitleEdited, setarchiveTitleEdited] = useState('Hello %s');

    function onChangeIcon(arg) {


      var options = { ...icon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
      setAttributes({ icon: { ...icon, options: options } });

    }

    useEffect(() => {


      console.log(archiveTitle);
      var archiveType = archiveTitle.options.archiveType;

      if (archiveType == 'auto') {
        //archiveTitleEdited = archiveTitle.options.customLabel;
        setarchiveTitleEdited(archiveTitle.options.customLabel);
      }



    }, [archiveTitle]);


    function setFieldLinkTo(option, index) {

      var options = { ...archiveTitle.options, linkTo: option.value };
      setAttributes({ archiveTitle: { ...archiveTitle, options: options } });

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
      // var sudoScourceX = { ...wrapper[sudoScource] }
      // sudoScourceX[key] = {};
      // wrapper[sudoScource] = sudoScourceX;
      // setAttributes({ wrapper: { ...wrapper } });


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, wrapper);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ wrapper: object });



    }







    function onChangeStyleArchiveTitle(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, archiveTitle);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ archiveTitle: object });

      var elementSelector = myStore.getElementSelector(sudoScource, archiveTitleSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });



      // var sudoScourceX = { ...archiveTitle[sudoScource] }
      // var elementSelector = myStore.getElementSelector(sudoScource, archiveTitleSelector);


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
      // setAttributes({ archiveTitle: { ...archiveTitle } });
    }






    function onRemoveStyleArchiveTitle(sudoScource, key) {
      var sudoScourceX = { ...archiveTitle[sudoScource] }
      if (sudoScourceX[key] != undefined) {
        delete sudoScourceX[key];
      }

      archiveTitle[sudoScource] = sudoScourceX;
      setAttributes({ archiveTitle: { ...archiveTitle } });

      if (blockCssY.items[archiveTitleSelector] == undefined) {
        blockCssY.items[archiveTitleSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {
        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[archiveTitleSelector][argAttr] = argAttrVal;
      })

      if (blockCssY.items[archiveTitleSelector][key] != undefined) {
        delete blockCssY.items[archiveTitleSelector][key];
      }


      setAttributes({ blockCssY: { items: blockCssY.items } });
    }





    function onAddStyleArchiveTitle(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, archiveTitle);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ archiveTitle: object });






    }




    function onChangeStyleIcon(sudoScource, newVal, attr) {

      // var sudoScourceX = { ...icon[sudoScource] }
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
      // var sudoScourceX = { ...icon[sudoScource] }
      // sudoScourceX[key] = {};
      // icon[sudoScource] = sudoScourceX;
      // setAttributes({ icon: { ...icon } });


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, icon);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ icon: object });
    }











    function onChangeStylePrefix(sudoScource, newVal, attr) {


      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, prefix);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ prefix: object });

      var elementSelector = myStore.getElementSelector(sudoScource, prefixSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });



      // var sudoScourceX = { ...prefix[sudoScource] }
      // var elementSelector = myStore.getElementSelector(sudoScource, prefixSelector);


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
      // setAttributes({ prefix: { ...prefix } });

    }


    function onRemoveStylePrefix(sudoScource, key) {

      var sudoScourceX = { ...prefix[sudoScource] }
      if (sudoScourceX[key] != undefined) {
        delete sudoScourceX[key];
      }

      prefix[sudoScource] = sudoScourceX;
      //sudoScourceX[attr][breakPointX] = newVal;

      setAttributes({ prefix: { ...prefix } });

      if (blockCssY.items[prefixSelector] == undefined) {
        blockCssY.items[prefixSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {

        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[prefixSelector][argAttr] = argAttrVal;

      })

      if (blockCssY.items[prefixSelector][key] != undefined) {
        delete blockCssY.items[prefixSelector][key];
      }


      setAttributes({ blockCssY: { items: blockCssY.items } });

    }


    function onAddStylePrefix(sudoScource, key) {

      var sudoScourceX = { ...prefix[sudoScource] }
      sudoScourceX[key] = {};
      prefix[sudoScource] = sudoScourceX;
      setAttributes({ prefix: { ...prefix } });

    }


    function onChangeStylePostfix(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, postfix);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ postfix: object });

      var elementSelector = myStore.getElementSelector(sudoScource, postfixSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

      //  var sudoScourceX = { ...postfix[sudoScource] }
      //       var elementSelector = myStore.getElementSelector(sudoScource, postfixSelector);


      //       sudoScourceX[attr][breakPointX] = newVal;

      //       if (blockCssY.items[elementSelector] == undefined) {
      //         blockCssY.items[elementSelector] = {};
      //       }

      //       Object.entries(sudoScourceX).map(args => {
      //         var argAttr = myStore.cssAttrParse(args[0]);
      //         var argAttrVal = args[1];
      //         blockCssY.items[elementSelector][argAttr] = argAttrVal;
      //       })


      //       setAttributes({ blockCssY: { items: blockCssY.items } });
      //       setAttributes({ postfix: { ...postfix } });

    }


    function onRemoveStylePostfix(sudoScource, key) {

      var sudoScourceX = { ...postfix[sudoScource] }
      if (sudoScourceX[key] != undefined) {
        delete sudoScourceX[key];
      }

      postfix[sudoScource] = sudoScourceX;
      //sudoScourceX[attr][breakPointX] = newVal;

      setAttributes({ postfix: { ...postfix } });

      if (blockCssY.items[postfixSelector] == undefined) {
        blockCssY.items[postfixSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {

        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[postfixSelector][argAttr] = argAttrVal;

      })

      if (blockCssY.items[postfixSelector][key] != undefined) {
        delete blockCssY.items[postfixSelector][key];
      }


      setAttributes({ blockCssY: { items: blockCssY.items } });

    }


    function onAddStylePostfix(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, postfix);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ postfix: object });

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
    String.prototype.strtr = function (dic) {
      const str = this.toString(),
        makeToken = (inx) => `{{###~${inx}~###}}`,

        tokens = Object.keys(dic)
          .map((key, inx) => ({
            key,
            val: dic[key],
            token: makeToken(inx)
          })),

        tokenizedStr = tokens.reduce((carry, entry) =>
          carry.replace(new RegExp(entry.key, "g"), entry.token), str);

      return tokens.reduce((carry, entry) =>
        carry.replace(new RegExp(entry.token, "g"), entry.val), tokenizedStr);
    };



    const [iconHtml, setIconHtml] = useState('');

    useEffect(() => {

      var iconSrc = icon.options.iconSrc;

      var iconHtml = `<span class="${iconSrc}"></span>`;

      console.log(iconHtml);


      setIconHtml(iconHtml);




    }, [icon]);






    const [
      currentPostUrl,
      setCurrentPostUrl,
    ] = useEntityProp('postType', postType, 'link', postId);


    useEffect(() => {

      setAttributes({ blockId: blockIdX });

      // setAttributes({ archiveTitle: archiveTitle });
      // setAttributes({ wrapper: wrapper });

      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);

      customTags['currentYear'] = '2022';
      customTags['currentMonth'] = '07';
      customTags['currentDay'] = '27';
      customTags['currentDate'] = '27';
      customTags['currentTime'] = '27';

      customTags['postPublishDate'] = '123';
      customTags['postModifiedDate'] = '123';

      customTags['termId'] = '';
      customTags['termTitle'] = '';
      customTags['termDescription'] = '';
      customTags['termPostCount'] = '';

      customTags['postTagTitle'] = 'First Tag Title';
      customTags['postTagsTitle'] = 'First Tag Title';

      customTags['postCategoryTitle'] = 'First Category Title';
      customTags['postCategoriesTitle'] = 'First Categories Title';


      customTags['postTermTitle'] = 'First Term Title';
      customTags['postTermsTitle'] = 'List of all terms title';



      customTags['postId'] = '123';
      customTags['postStatus'] = '123';


      customTags['authorId'] = '123';
      customTags['authorName'] = 'Nur Hasan';
      customTags['authorFirstName'] = 'Nur';
      customTags['authorLastName'] = 'Hasan';
      customTags['authorDescription'] = 'Hasan';

      customTags['excerpt'] = 'Here is the post excerpt';

      customTags['rankmathTitle'] = 'Hasan';
      customTags['rankmathPermalink'] = 'Hasan';
      customTags['rankmathExcerpt'] = 'Hasan';
      customTags['rankmathFocusKeyword'] = 'Hasan';
      customTags['rankmathFocusKeywords'] = 'Hasan';

      customTags['rankmathOrgname'] = 'Hasan';
      customTags['rankmathOrgurl'] = 'Hasan';
      customTags['rankmathOrglogo'] = 'Hasan';



      customTags['siteTitle'] = '';
      customTags['siteDescription'] = '';
      customTags['siteTagline'] = '';

      customTags['postMeta'] = '';

      customTags['separator'] = '';
      customTags['searchTerms'] = '';



      customTags['counter'] = '1';



    }, [clientId]);

    // Wrapper CSS Class Selectors
    const wrapperSelector = blockClass;


    var archiveTitleSelector = '';


    if (wrapper.options.tag.length != 0) {

      if (archiveTitle.options.linkTo.length > 0) {
        archiveTitleSelector = blockClass + ' a';
      } else {
        archiveTitleSelector = blockClass;
        //archiveTitleSelector = blockClass + ' .archiveTitle';

      }

    } else {
      archiveTitleSelector = blockClass;

    }







    const prefixSelector = blockClass + ' .prefix';
    const postfixSelector = blockClass + ' .postfix';
    const iconSelector = blockClass + ' .postdate-icon';




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

    function paddingControl(nextValues) {



      var responsive = archiveTitle.styles.padding;
      responsive[breakPointX] = nextValues;

      var styles = { ...archiveTitle.styles, padding: responsive };
      setAttributes({ archiveTitle: { ...archiveTitle, styles: styles } });


      blockCssY.items[archiveTitleSelector] = (blockCssY.items[archiveTitleSelector] != undefined) ? blockCssY.items[archiveTitleSelector] : {};


      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;





      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[archiveTitleSelector]['padding-top'] != undefined) ? blockCssY.items[archiveTitleSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[archiveTitleSelector] = { ...blockCssY.items[archiveTitleSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[archiveTitleSelector]['padding-right'] != undefined) ? blockCssY.items[archiveTitleSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[archiveTitleSelector] = { ...blockCssY.items[archiveTitleSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[archiveTitleSelector]['padding-bottom'] != undefined) ? blockCssY.items[archiveTitleSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[archiveTitleSelector] = { ...blockCssY.items[archiveTitleSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[archiveTitleSelector]['padding-left'] != undefined) ? blockCssY.items[archiveTitleSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[archiveTitleSelector] = { ...blockCssY.items[archiveTitleSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });



    }





    function marginControl(nextValues) {


      var responsive = archiveTitle.styles.margin;
      responsive[breakPointX] = nextValues;


      var styles = { ...archiveTitle.styles, margin: responsive };
      setAttributes({ archiveTitle: { ...archiveTitle, styles: styles } });

      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[archiveTitleSelector] = (blockCssY.items[archiveTitleSelector] != undefined) ? blockCssY.items[archiveTitleSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[archiveTitleSelector]['margin-top'] != undefined) ? blockCssY.items[archiveTitleSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[archiveTitleSelector] = { ...blockCssY.items[archiveTitleSelector], 'margin-top': marginTop };
      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[archiveTitleSelector]['margin-right'] !== undefined) ? blockCssY.items[archiveTitleSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[archiveTitleSelector] = { ...blockCssY.items[archiveTitleSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[archiveTitleSelector]['margin-bottom'] !== undefined) ? blockCssY.items[archiveTitleSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[archiveTitleSelector] = { ...blockCssY.items[archiveTitleSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[archiveTitleSelector]['margin-left'] !== undefined) ? blockCssY.items[archiveTitleSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[archiveTitleSelector] = { ...blockCssY.items[archiveTitleSelector], 'margin-left': marginLeft };

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


      setAttributes({ customCss: customCss });


      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);



    useEffect(() => {
      linkAttrObj();

    }, [archiveTitle]);






    var linkAttrObj = () => {

      var sdsd = {};

      archiveTitle.options.linkAttr.map(x => {

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




    const [setSome, setSomeState] = useState({});
    const [stateX, setStateX] = useState('Old Value');







    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType,

    } = wp.data.dispatch('core/edit-post')


    var postUrl = (archiveTitle.options.customUrl != undefined && archiveTitle.options.customUrl.length > 0) ? archiveTitle.options.customUrl : currentPostUrl;


    const CustomTag = `${wrapper.options.tag}`;
    const CustomTagPostTitle = `${archiveTitle.options.tag}`;



    function onChangeTypo(typoX) {

      setAttributes({ archiveTitle: { ...archiveTitle, styles: typoX } });

      var newValuesObjX = {};


      if (typoX.fontFamily[breakPointX] != undefined) {

        blockCssY.items[archiveTitleSelector] = { ...blockCssY.items[archiveTitleSelector], 'font-family': typoX.fontFamily };

      }


      if (typoX.fontSize[breakPointX] != undefined) {

        var fontSizeVal = (typoX.fontSize[breakPointX].val) ? typoX.fontSize[breakPointX].val : 16;
        var fontSizeUnit = (typoX.fontSize[breakPointX].unit) ? typoX.fontSize[breakPointX].unit : 'px';


        var fontSizeX = (blockCssY.items[archiveTitleSelector] != undefined) ? blockCssY.items[archiveTitleSelector]['font-size'] : {};

        fontSizeX[breakPointX] = fontSizeVal + fontSizeUnit;
        blockCssY.items[archiveTitleSelector] = { ...blockCssY.items[archiveTitleSelector], 'font-size': fontSizeX };

      }



      if (typoX.lineHeight[breakPointX] != undefined) {

        var lineHeightVal = (typoX.lineHeight[breakPointX].val) ? typoX.lineHeight[breakPointX].val : 0;
        var lineHeightUnit = (typoX.lineHeight[breakPointX].unit) ? typoX.lineHeight[breakPointX].unit : 'px';


        var lineHeightX = (blockCssY.items[archiveTitleSelector]['line-height'] != undefined) ? blockCssY.items[archiveTitleSelector]['line-height'] : {};

        lineHeightX[breakPointX] = lineHeightVal + lineHeightUnit;

        blockCssY.items[archiveTitleSelector] = { ...blockCssY.items[archiveTitleSelector], 'line-height': lineHeightX };
      }
      if (typoX.letterSpacing[breakPointX] != undefined) {

        var letterSpacingVal = (typoX.letterSpacing[breakPointX].val) ? typoX.letterSpacing[breakPointX].val : 0;
        var letterSpacingUnit = (typoX.letterSpacing[breakPointX].unit) ? typoX.letterSpacing[breakPointX].unit : 'px';



        var letterSpacingX = (blockCssY.items[archiveTitleSelector]['letter-spacing'] != undefined) ? blockCssY.items[archiveTitleSelector]['letter-spacing'] : {};

        letterSpacingX[breakPointX] = letterSpacingVal + letterSpacingUnit;

        blockCssY.items[archiveTitleSelector] = { ...blockCssY.items[archiveTitleSelector], 'letter-spacing': letterSpacingX };
      }

      if (typoX.fontWeight[breakPointX] != undefined) {

        blockCssY.items[archiveTitleSelector] = { ...blockCssY.items[archiveTitleSelector], 'font-weight': typoX.fontWeight };

      }


      if (typoX.textDecoration[breakPointX] != undefined) {

        var str = {};

        var textDecorationX = typoX.textDecoration[breakPointX];
        var textDecorationXStr = (textDecorationX.length > 0) ? textDecorationX.join(' ') : '';

        str[breakPointX] = textDecorationXStr;

        //typoX.textDecoration[breakPointX] = typoX.textDecoration[breakPointX].join(' ');

        blockCssY.items[archiveTitleSelector] = { ...blockCssY.items[archiveTitleSelector], 'text-decoration': str };

      }
      if (typoX.textTransform[breakPointX] != undefined) {

        blockCssY.items[archiveTitleSelector] = { ...blockCssY.items[archiveTitleSelector], 'text-transform': typoX.textTransform };


      }

      setAttributes({ blockCssY: { items: blockCssY.items } });



    }

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

          <BlockControls>


          </BlockControls>


          <InspectorControls key="general">
            <div className='px-3' initialOpen={false}>


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
                            setAttributes({ wrapper: { styles: wrapper.styles, options: options } });

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

                <PanelBody title="Archive Title" initialOpen={false}>



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

                      <PanelRow className='mb-4'>
                        <label for="">Archive Type</label>
                        <PGDropdown position="bottom right" variant="secondary" options={archiveTypes} buttonTitle="Choose" onChange={(option, index) => {

                          var options = { ...archiveTitle.options, archiveType: option.value };
                          setAttributes({ archiveTitle: { ...archiveTitle, options: options } });

                        }} values={''}></PGDropdown>
                      </PanelRow>

                      <div className='bg-gray-500 text-white p-3 py-2'>{archiveTypes[archiveTitle.options.archiveType].label}</div>



                      <PanelRow className='mb-4'>
                        <label for="">Custom Label</label>
                        <InputControl
                          className='mr-2'
                          value={archiveTitle.options.customLabel}
                          onChange={(newVal) => {


                            var options = { ...archiveTitle.options, customLabel: newVal };
                            setAttributes({ archiveTitle: { ...archiveTitle, options: options } });

                          }}
                        />
                      </PanelRow>


                      {(archiveTitle.options.archiveType == 'year' || archiveTitle.options.archiveType == 'month' || archiveTitle.options.archiveType == 'day') && (

                        <>
                          <PanelRow className='mb-4'>
                            <label for="">Date Format</label>
                            <PGDropdown position="bottom right" variant="secondary" options={dateFormats} buttonTitle="Choose" onChange={(option, index) => {

                              var options = { ...archiveTitle.options, dateFormat: option.value };
                              setAttributes({ archiveTitle: { ...archiveTitle, options: options } });

                            }} values={''}></PGDropdown>
                          </PanelRow>
                          <PanelRow className='mb-4'>
                            <label for="">Custom Format</label>
                            <InputControl
                              className='mr-2'
                              value={archiveTitle.options.dateFormat}
                              onChange={(newVal) => {



                                var options = { ...archiveTitle.options, dateFormat: newVal };
                                setAttributes({ archiveTitle: { ...archiveTitle, options: options } });

                              }}
                            />
                          </PanelRow>


                          {dateFormats[archiveTitle.options.dateFormat] != undefined && (
                            <div className='p-2 my-3 bg-gray-500 text-white'>{dateFormats[archiveTitle.options.dateFormat].label}</div>

                          )}
                        </>



                      )}




                      <PanelRow>
                        <label for="">Link To</label>

                        <PGDropdown position="bottom right" variant="secondary" options={archiveLinkToArgs} buttonTitle={archiveTitle.options.linkTo.length == 0 ? 'Choose' : archiveLinkToArgs[archiveTitle.options.linkTo].label} onChange={setFieldLinkTo} values={[]}></PGDropdown>



                      </PanelRow>





                      {archiveTitle.options.linkTo == 'customUrl' && (

                        <PanelRow>
                          <label for="">Custom URL</label>

                          <div className='relative'>
                            <Button className={(linkPickerPosttitle) ? "!bg-gray-400" : ''} icon={link} onClick={ev => {

                              setLinkPickerPosttitle(prev => !prev);

                            }}></Button>
                            {archiveTitle.options.customUrl.length > 0 && (
                              <Button className='!text-red-500 ml-2' icon={linkOff} onClick={ev => {

                                var options = { ...archiveTitle.options, customUrl: '' };
                                setAttributes({ archiveTitle: { ...archiveTitle, options: options } });
                                setLinkPickerPosttitle(false);

                              }}></Button>

                            )}
                            {linkPickerPosttitle && (
                              <Popover position="bottom right">
                                <LinkControl settings={[]} value={archiveTitle.options.customUrl} onChange={newVal => {

                                  var options = { ...archiveTitle.options, customUrl: newVal.url };

                                  setAttributes({ archiveTitle: { ...archiveTitle, options: options } });

                                }} />

                                <div className='p-2'><span className='font-bold'>Linked to:</span> {(archiveTitle.options.customUrl.length != 0) ? archiveTitle.options.customUrl : 'No link'} </div>
                              </Popover>

                            )}


                          </div>
                        </PanelRow>

                      )}



                      {archiveTitle.options.linkTo.length == 0 && (

                        <PanelRow>
                          <label for="">Custom Tag</label>
                          <SelectControl
                            label=""
                            value={archiveTitle.options.tag}
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
                              var options = { ...archiveTitle.options, tag: newVal };
                              setAttributes({ archiveTitle: { ...archiveTitle, options: options } });
                            }

                            }
                          />
                        </PanelRow>
                      )}




                      {archiveTitle.options.linkTo.length > 0 && (

                        <div>
                          <PanelRow>
                            <label for="">Link Target</label>

                            <SelectControl
                              label=""
                              value={archiveTitle.options.linkTarget}
                              options={[
                                { label: 'Choose...', value: '' },

                                { label: '_self', value: '_self' },
                                { label: '_blank', value: '_blank' },
                                { label: '_parent', value: '_parent' },
                                { label: '_top', value: '_top' },


                              ]}
                              onChange={(newVal) => {



                                var options = { ...archiveTitle.options, linkTarget: newVal };
                                setAttributes({ archiveTitle: { ...archiveTitle, options: options } });



                              }



                              }
                            />
                          </PanelRow>










                          <PanelRow>
                            <label for="">Custom Attributes</label>
                            <div
                              className=' cursor-pointer px-3 text-white py-1 bg-blue-600'

                              onClick={(ev) => {

                                var sdsd = archiveTitle.options.linkAttr.concat({ id: '', val: '' })


                                var options = { ...archiveTitle.options, linkAttr: sdsd };
                                setAttributes({ archiveTitle: { ...archiveTitle, options: options } });

                                linkAttrObj()
                              }}

                            >Add</div>



                          </PanelRow>



                          {
                            archiveTitle.options.linkAttr.map((x, i) => {

                              return (

                                <div className='my-2'>
                                  <PanelRow>
                                    <InputControl
                                      className='mr-2'
                                      placeholder="Name"
                                      value={archiveTitle.options.linkAttr[i].id}
                                      onChange={(newVal) => {

                                        archiveTitle.options.linkAttr[i].id = newVal;


                                        var ssdsd = archiveTitle.options.linkAttr.concat([]);



                                        var options = { ...archiveTitle.options, linkAttr: ssdsd };
                                        setAttributes({ archiveTitle: { ...archiveTitle, options: options } });

                                      }}
                                    />

                                    <InputControl
                                      className='mr-2'
                                      placeholder="Value"
                                      value={x.val}
                                      onChange={(newVal) => {
                                        archiveTitle.options.linkAttr[i].val = newVal
                                        var ssdsd = archiveTitle.options.linkAttr.concat([]);



                                        var options = { ...archiveTitle.options, linkAttr: ssdsd };
                                        setAttributes({ archiveTitle: { ...archiveTitle, options: options } });

                                      }}
                                    />
                                    <span className='text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close'
                                      onClick={(ev) => {

                                        archiveTitle.options.linkAttr.splice(i, 1);

                                        var ssdsd = archiveTitle.options.linkAttr.concat([]);


                                        var options = { ...archiveTitle.options, linkAttr: ssdsd };
                                        setAttributes({ archiveTitle: { ...archiveTitle, options: options } });
                                      }}

                                    ></span>
                                  </PanelRow>




                                </div>

                              )

                            })
                          }


                        </div>



                      )}





                    </PGtab>
                    <PGtab name="styles">
                      <PGStyles obj={wrapper} onChange={onChangeStyleArchiveTitle} onAdd={onAddStyleArchiveTitle} onRemove={onRemoveStyleArchiveTitle} />
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

                            { label: 'Before Archive Title', value: 'beforeArchiveTitle' },
                            { label: 'After Archive Title', value: 'afterArchiveTitle' },
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

                    </PGtab>
                    <PGtab name="styles">
                      <PGStyles obj={wrapper} onChange={onChangeStyleIcon} onAdd={onAddStyleIcon} onRemove={onRemoveStyleIcon} />
                    </PGtab>
                  </PGtabs>







                </PanelBody>


                <PanelBody title="Prefix" initialOpen={false}>


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
                        <label for="">Prefix</label>

                        <InputControl
                          value={prefix.options.text}
                          onChange={(newVal) => {



                            var options = { ...prefix.options, text: newVal };
                            setAttributes({ prefix: { styles: prefix.styles, options: options } });



                            // setAttributes({ prefix: { text: newVal, class: prefix.options.class, color: prefix.color, backgroundColor: prefix.backgroundColor } })
                          }
                          }
                        />
                      </PanelRow>
                    </PGtab>
                    <PGtab name="styles">
                      <PGStyles obj={wrapper} onChange={onChangeStylePrefix} onAdd={onAddStylePrefix} onRemove={onRemoveStylePrefix} />
                    </PGtab>
                  </PGtabs>





                </PanelBody>




                <PanelBody title="Postfix" initialOpen={false}>


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
                        <label for="">Postfix</label>

                        <InputControl
                          value={postfix.options.text}
                          onChange={(newVal) => {


                            var options = { ...postfix.options, text: newVal };
                            setAttributes({ postfix: { ...postfix, options: options } });


                            // setAttributes({ postfix: { text: newVal, class: prefix.options.class, color: postfix.color, backgroundColor: postfix.backgroundColor } })
                          }

                          }
                        />
                      </PanelRow>
                    </PGtab>
                    <PGtab name="styles">
                      <PGStyles obj={wrapper} onChange={onChangeStylePostfix} onAdd={onAddStylePostfix} onRemove={onRemoveStylePostfix} />
                    </PGtab>
                  </PGtabs>



                </PanelBody>

                <PanelBody title="Custom Style" initialOpen={false}>


                  <p>Please use following class selector to apply your custom CSS</p>
                  <div className='my-3'>
                    <p className='font-bold'>Title Wrapper</p>
                    <p><code>{wrapperSelector}{'{/* your CSS here*/}'}</code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Title link</p>
                    <p><code>{archiveTitleSelector}{'{/* your CSS here*/}'} </code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Prefix</p>
                    <p><code>{prefixSelector}{'{/* your CSS here*/}'} </code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Postfix</p>
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

                <PGMailSubsctibe />
                <PGContactSupport utm={{ utm_source: 'BlockPostTitle', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />


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

              {archiveTitle.options.linkTo.length > 0 && (
                <a className='archiveTitle' onClick={handleLinkClick}  {...linkAttrItems} target={archiveTitle.options.linkTarget} href={postUrl}>

                  {icon.options.position == 'beforeArchiveTitle' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                  {archiveTitleEdited}
                  {icon.options.position == 'afterArchiveTitle' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                </a>
              )}


              {archiveTitle.options.linkTo.length == 0 && (
                <>
                  {icon.options.position == 'beforeArchiveTitle' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}

                  {archiveTitleEdited}

                  {icon.options.position == 'afterArchiveTitle' && (
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

              {archiveTitle.options.linkTo.length > 0 && (
                <a className='archiveTitle' onClick={handleLinkClick}  {...linkAttrItems} target={archiveTitle.options.linkTarget} href={postUrl}>A

                  {icon.options.position == 'beforeArchiveTitle' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}

                  {archiveTitleEdited}

                  {icon.options.position == 'afterArchiveTitle' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                </a>
              )}


              {archiveTitle.options.linkTo.length == 0 && (

                <div className={[blockId]}>

                  {icon.options.position == 'beforeArchiveTitle' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                  {archiveTitleEdited}
                  {icon.options.position == 'afterArchiveTitle' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                </div>



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

