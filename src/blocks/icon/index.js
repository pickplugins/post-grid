import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover, Spinner } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';
import { InnerBlocks, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'
import { Icon, styles, settings, link, linkOff } from "@wordpress/icons";
import { applyFilters } from '@wordpress/hooks';

import IconToggle from '../../components/icon-toggle'
import Typography from '../../components/typography'
import PGIconPicker from '../../components/icon-picker'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'

import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import PGcssDisplay from '../../components/css-display'
import PGDropdown from '../../components/dropdown'

import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'
import PGCssLibrary from '../../components/css-library'

var myStore = wp.data.select('postgrid-shop');



registerBlockType("post-grid/icon", {
  apiVersion: 2,
  title: "Icon/Button/Link",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><rect fill="#8db1ff" y="11.51" width="36" height="12.98" rx="1.21" /><rect fill="#1d4ed8" x="15.67" y="16.83" width="17.18" height="2.35" rx="0.5" /><rect fill="#1d4ed8" x="3.68" y="16.83" width="7.19" height="2.35" rx="0.5" /></svg>




    ,
  },


  attributes: {

    wrapper: {
      type: 'object',
      default: {
        options: {
          tag: 'div', class: '', attr: [],
        },
        styles:
        {
          display: { Desktop: 'block' },
          
        },
      },
    },

    text: {
      type: 'object',
      default: {
        options: {
          enable: true,
          text: 'Custom Text',
          src: '', // siteTitle, tagline, siteUrl, currentYear, currentDate, postTitle
          linkTo: 'custom', /*postUrl, homeUrl, authorUrl, authorLink, mailTo, custom, customField */
          linkToAuthorMeta: '',
          linkToCustomMeta: '',

          linkTarget: '_blank',
          customUrl: '',
          linkAttr: [],
          class: '',
        },

        styles:
        {
          display: { Desktop: 'inline-block' },
          color: { Desktop: '#ffffff' },
          backgroundColor: { Desktop: '#1F2E45' },
          padding: { Desktop: '10px 45px 10px 45px' },
          borderRadius: { Desktop: '50px 50px 50px 50px' },
          fontSize: { Desktop: '18px' },
          fontFamily: { Desktop: 'Poppins' },
          fontStyle: { Desktop: 'normal' },
          fontWeight: { Desktop: '400' },
        },
      },
    },


    icon: {
      type: 'object',
      default: {
        options: { enable: true, library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-check-circle', position: 'beforeText', /*before, after, prefix, postfix */ class: 'text-icon', },

        styles:
        {
          fontSize: { Desktop: '18px' },
          margin: { Desktop: '0px 10px 0px 0px' },
        },
      },
    },



    prefix: {
      type: 'object',
      default: {
        options: { text: '', class: 'prefix' },

        styles:
        {
          color: { Desktop: '#000000 !important' },
          fontSize: { Desktop: '18px' },
          fontFamily: { Desktop: 'Poppins' },
          fontStyle: { Desktop: 'normal' },
          fontWeight: { Desktop: '400' },
          margin: { Desktop: '0px 10px 0px 0px' },
        },
      },
    },

    postfix: {
      type: 'object',
      default: {
        options: { text: '', class: 'postfix' },

        styles:
        {
          color: { Desktop: '#000000 !important' },
          fontSize: { Desktop: '18px' },
          fontFamily: { Desktop: 'Poppins' },
          fontStyle: { Desktop: 'normal' },
          fontWeight: { Desktop: '400' },
          margin: { Desktop: '0px 0px 0px 10px' },
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
    var text = attributes.text;
    var icon = attributes.icon;


    var prefix = attributes.prefix;
    var postfix = attributes.postfix;
    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    var postId = context['postId'];
    var postType = context['postType'];

    //const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    var breakPointX = myStore.getBreakPoint();

    const [isLoading, setisLoading] = useState(false);
    const [currentPostContent, setCurrentpostContent] = useEntityProp('postType', postType, 'content', postId);
    const [customFields, setCustomFields] = useState({});

    const [currentPostUrl, setCurrentPostUrl] = useEntityProp('postType', postType, 'link', postId);

    const [iconHtml, setIconHtml] = useState('');
    const textEnable = (text.options.enable == undefined) ? true : text.options.enable;



    // Wrapper CSS Class Selectors
    const wrapperSelector = blockClass;
    const textSelector = blockClass + ' .text';
    const iconSelector = blockClass + ' .text-icon';

    const prefixSelector = blockClass + ' .prefix';
    const postfixSelector = blockClass + ' .postfix';


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


    var textSrcArgs = {
      siteTitle: { label: 'Site Title', value: 'siteTitle' },
      tagline: { label: 'Tag line', value: 'tagline' },
      siteUrl: { label: 'Site URL', value: 'siteUrl' },
      currentYear: { label: 'Current Year', value: 'currentYear' },
      currentDate: { label: 'Current Date', value: 'currentDate', isPro: true },
      postTitle: { label: 'Post Title', value: 'postTitle', isPro: true },
    };

    //var textSrcArgs = applyFilters('textSrcArgs', textSrcArgsX);





    useEffect(() => {


      setAttributes({ customCss: customCss });



      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);






    const [linkPickerExcerpt, setLinkPickerExcerpt] = useState(false);
    const [linkPickerText, setLinkPickerText] = useState(false);





    useEffect(() => {

      setAttributes({ blockId: blockIdX });

      ;
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);

    }, [clientId]);



    useEffect(() => {

      var iconSrc = icon.options.iconSrc;

      var iconHtml = `<span class="${iconSrc}"></span>`;

      setIconHtml(iconHtml);



    }, [icon]);


    // var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    // for (var x in breakPoints) {

    //   var item = breakPoints[x];
    //   breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    // }



    function handleLinkClick(ev) {

      ev.stopPropagation();
      ev.preventDefault();
      return false;
    }

    function setTextSrc(option, index) {

      var options = { ...text.options, src: option.value };
      setAttributes({ text: { ...text, options: options } });

    }

    function setFieldLinkTo(option, index) {

      var options = { ...text.options, linkTo: option.value };
      setAttributes({ text: { ...text, options: options } });

    }


    function onChangeIcon(arg) {

      var options = { ...icon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
      setAttributes({ icon: { ...icon, options: options } });

    }






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




    function onPickCssLibraryText(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        text[sudoScource] = sudoScourceArgs;
      })

      var textX = Object.assign({}, text);
      setAttributes({ text: textX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, textSelector);


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





    function onPickCssLibraryPrefix(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        prefix[sudoScource] = sudoScourceArgs;
      })

      var prefixX = Object.assign({}, prefix);
      setAttributes({ prefix: prefixX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, prefixSelector);


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



    function onPickCssLibraryPostfix(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        postfix[sudoScource] = sudoScourceArgs;
      })

      var postfixX = Object.assign({}, postfix);
      setAttributes({ postfix: postfixX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, postfixSelector);


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




    function onChangeStyleText(sudoScource, newVal, attr) {





      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, text);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ text: object });

      var elementSelector = myStore.getElementSelector(sudoScource, textSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });
    }






    function onRemoveStyleText(sudoScource, key) {



      var object = myStore.deletePropertyDeep(text, [sudoScource, key, breakPointX]);
      setAttributes({ text: object });

      var elementSelector = myStore.getElementSelector(sudoScource, textSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }





    function onAddStyleText(sudoScource, key) {




      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, text);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ text: object });



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



    function onChangeStylePrefix(sudoScource, newVal, attr) {


      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, prefix);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ prefix: object });

      var elementSelector = myStore.getElementSelector(sudoScource, prefixSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });



    }


    function onRemoveStylePrefix(sudoScource, key) {


      var object = myStore.deletePropertyDeep(prefix, [sudoScource, key, breakPointX]);
      setAttributes({ prefix: object });


      var elementSelector = myStore.getElementSelector(sudoScource, prefixSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }


    function onAddStylePrefix(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, prefix);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ prefix: object });

    }


    function onChangeStylePostfix(sudoScource, newVal, attr) {


      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, postfix);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ postfix: object });

      var elementSelector = myStore.getElementSelector(sudoScource, postfixSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });


    }


    function onRemoveStylePostfix(sudoScource, key) {


      var object = myStore.deletePropertyDeep(postfix, [sudoScource, key, breakPointX]);
      setAttributes({ postfix: object });

      var elementSelector = myStore.getElementSelector(sudoScource, postfixSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }


    function onAddStylePostfix(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, postfix);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ postfix: object });

    }











    function onBulkAddWrapper(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]s
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



    function onBulkAddText(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, text);
      obj[sudoScource] = cssObj;

      setAttributes({ text: obj });

      var selector = myStore.getElementSelector(sudoScource, textSelector);
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

    function onBulkAddPrefix(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, prefix);
      obj[sudoScource] = cssObj;

      setAttributes({ prefix: obj });

      var selector = myStore.getElementSelector(sudoScource, prefixSelector);
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




    function onBulkAddPostfix(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, postfix);
      obj[sudoScource] = cssObj;

      setAttributes({ postfix: obj });

      var selector = myStore.getElementSelector(sudoScource, postfixSelector);
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








































    var [linkAttrItemsText, setlinkAttrItemsText] = useState({}); // Using the hook.
    var [wrapAttrItems, setwrapAttrItems] = useState({}); // Using the hook.



    useEffect(() => {


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);







    useEffect(() => {
      var sdsd = {};
      text.options.linkAttr.map(x => {
        if (x.val)
          sdsd[x.id] = x.val;
      })

      setlinkAttrItemsText(sdsd);
    }, [text]);

    useEffect(() => {
      var sdsd = {};
      if (wrapper.options.attr != undefined) {
        wrapper.options.attr.map(x => {
          if (x.val)
            sdsd[x.id] = x.val;
        })
      }

      setwrapAttrItems(sdsd);
    }, [wrapper]);








    var postUrl = (text.options.customUrl != undefined && text.options.customUrl.length > 0) ? text.options.customUrl : currentPostUrl;


    const CustomTag = `${wrapper.options.tag}`;









    const blockProps = useBlockProps({
      className: ` ${blockId} pg-icon`,

    });

    return (

      <>
        <InspectorControls>
          <div className='' >

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
                        { label: 'BUTTON', value: 'button' },


                      ]}
                      onChange={(newVal) => {



                        var options = { ...wrapper.options, tag: newVal };
                        setAttributes({ wrapper: { ...wrapper, options: options } });



                      }

                      }
                    />
                  </PanelRow>


                  <PanelRow>
                    <label for="">Custom Attributes</label>
                    <div
                      className=' cursor-pointer px-3 text-white py-1 bg-blue-600'

                      onClick={(ev) => {

                        if (wrapper.options.attr == undefined) {
                          wrapper.options.attr = {};
                        }
                        var sdsd = wrapper.options.attr.concat({ id: '', val: '' })



                        var options = { ...wrapper.options, attr: sdsd };
                        setAttributes({ wrapper: { ...wrapper, options: options } });






                      }}

                    >Add</div>



                  </PanelRow>




                  {
                    wrapper.options.attr != undefined && wrapper.options.attr.map((x, i) => {

                      return (

                        <div className='my-2'>
                          <PanelRow>
                            <InputControl
                              placeholder="Name"
                              className='mr-2'
                              value={wrapper.options.attr[i].id}
                              onChange={(newVal) => {

                                wrapper.options.attr[i].id = newVal;


                                var ssdsd = wrapper.options.attr.concat([]);



                                var options = { ...wrapper.options, attr: ssdsd };
                                setAttributes({ wrapper: { ...wrapper, options: options } });



                              }}
                            />

                            <InputControl
                              className='mr-2'
                              placeholder="Value"
                              value={x.val}
                              onChange={(newVal) => {
                                wrapper.options.attr[i].val = newVal
                                var ssdsd = wrapper.options.attr.concat([]);



                                var options = { ...wrapper.options, attr: ssdsd };
                                setAttributes({ wrapper: { ...wrapper, options: options } });


                              }}
                            />
                            <span className='text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close'
                              onClick={(ev) => {

                                wrapper.options.attr.splice(i, 1);

                                var ssdsd = wrapper.options.attr.concat([]);




                                var options = { ...wrapper.options, attr: ssdsd };
                                setAttributes({ wrapper: { ...wrapper, options: options } });


                              }}

                            ></span>
                          </PanelRow>




                        </div>

                      )

                    })
                  }



                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={wrapper} onChange={onChangeStyleWrapper} onAdd={onAddStyleWrapper} onRemove={onRemoveStyleWrapper} onBulkAdd={onBulkAddWrapper} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={wrapper} onChange={onPickCssLibraryWrapper} />
                </PGtab>
              </PGtabs>








            </PanelBody>





            <PanelBody title="Text" initialOpen={false}>

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
                    label="Enable text?"
                    help={textEnable ? 'Text enabled' : 'Text disabled.'}
                    checked={textEnable ? true : false}
                    onChange={(e) => {
                      var options = { ...text.options, enable: text.options.enable ? false : true, };
                      setAttributes({ text: { ...text, options: options } });
                    }}
                  />


                  <PanelRow>
                    <label for="">Text Source</label>

                    <PGDropdown position="bottom right" variant="secondary" options={textSrcArgs} buttonTitle={(textSrcArgs[text.options.src] == undefined) ? 'Choose' : textSrcArgs[text.options.src].label} onChange={setTextSrc} values={[]}></PGDropdown>


                  </PanelRow>


                  {text.options.src != undefined && text.options.src.length == 0 && (

                    <PanelRow className='my-4'>
                      <label for="">Custom Text</label>
                      <InputControl
                        value={text.options.text}
                        onChange={(newVal) => {
                          var options = { ...text.options, text: newVal };
                          setAttributes({ text: { ...text, options: options } });
                        }
                        }
                      />
                    </PanelRow>

                  )}








                  <PanelRow>
                    <label for="">Link To</label>

                    <PGDropdown position="bottom right" variant="secondary" options={linkToArgs} buttonTitle={(linkToArgs[text.options.linkTo] == undefined) ? 'Choose' : linkToArgs[text.options.linkTo].label} onChange={setFieldLinkTo} values={[]}></PGDropdown>


                  </PanelRow>



                  {text.options.linkTo.length > 0 && (
                    <>



                      {text.options.linkTo == 'authorMeta' && (

                        <PanelRow>
                          <label for="">Author Meta Key</label>

                          <InputControl
                            value={text.options.linkToAuthorMeta}
                            onChange={(newVal) => {


                              var options = { ...text.options, linkToAuthorMeta: newVal };
                              setAttributes({ text: { ...text, options: options } });

                            }}
                          />

                        </PanelRow>

                      )}


                      {text.options.linkTo == 'customField' && (

                        <PanelRow>
                          <label for="">Custom Meta Key</label>

                          <InputControl
                            value={text.options.linkToAuthorMeta}
                            onChange={(newVal) => {


                              var options = { ...text.options, linkToAuthorMeta: newVal };
                              setAttributes({ text: { ...text, options: options } });

                            }}
                          />

                        </PanelRow>

                      )}










                      <PanelRow>
                        <label for="">Link Target</label>

                        <SelectControl
                          label=""
                          value={text.options.linkTarget}
                          options={[
                            { label: '_self', value: '_self' },
                            { label: '_blank', value: '_blank' },
                            { label: '_parent', value: '_parent' },
                            { label: '_top', value: '_top' },
                          ]}
                          onChange={
                            (newVal) => {
                              var options = { ...text.options, linkTarget: newVal };
                              setAttributes({ text: { ...text, options: options } });
                            }
                          }
                        />
                      </PanelRow>
                    </>

                  )}




                  {text.options.linkTo == 'customUrl' && (


                    <PanelRow>
                      <label for="">Custom Url</label>

                      <div className='relative'>
                        <Button className={(linkPickerText) ? "!bg-gray-400" : ''} icon={link} onClick={ev => {

                          setLinkPickerText(prev => !prev)
                        }}></Button>
                        {text.options.customUrl.length > 0 && (
                          <Button className='!text-red-500 ml-2' icon={linkOff} onClick={ev => {

                            var options = { ...text.options, customUrl: '' };
                            setAttributes({ text: { ...text, options: options } });



                          }}></Button>

                        )}
                        {linkPickerText && (
                          <Popover position="bottom right">
                            <LinkControl settings={[]} value={text.options.customUrl} onChange={newVal => {

                              var options = { ...text.options, customUrl: newVal.url };
                              setAttributes({ text: { ...text, options: options } });
                              //setLinkPickerText(false)

                            }} />

                            <div className='p-2'><span className='font-bold'>Linked to:</span> {(text.options.customUrl.length != 0) ? text.options.customUrl : 'No link'} </div>
                          </Popover>

                        )}


                      </div>
                    </PanelRow>


                  )}


                  {text.options.linkTo.length > 0 && (

                    <div>




                      <PanelRow>
                        <label for="">Custom Attributes</label>
                        <div
                          className=' cursor-pointer px-3 text-white py-1 bg-blue-600'

                          onClick={(ev) => {

                            var sdsd = text.options.linkAttr.concat({ id: '', val: '' })



                            var options = { ...text.options, linkAttr: sdsd };
                            setAttributes({ text: { ...text, options: options } });






                          }}

                        >Add</div>



                      </PanelRow>



                      {
                        text.options.linkAttr != undefined && text.options.linkAttr.map((x, i) => {

                          return (

                            <div className='my-2'>
                              <PanelRow>
                                <InputControl
                                  placeholder="Name"
                                  className='mr-2'
                                  value={text.options.linkAttr[i].id}
                                  onChange={(newVal) => {

                                    text.options.linkAttr[i].id = newVal;


                                    var ssdsd = text.options.linkAttr.concat([]);



                                    var options = { ...text.options, linkAttr: ssdsd };
                                    setAttributes({ text: { ...text, options: options } });



                                  }}
                                />

                                <InputControl
                                  className='mr-2'
                                  placeholder="Value"
                                  value={x.val}
                                  onChange={(newVal) => {
                                    text.options.linkAttr[i].val = newVal
                                    var ssdsd = text.options.linkAttr.concat([]);



                                    var options = { ...text.options, linkAttr: ssdsd };
                                    setAttributes({ text: { ...text, options: options } });


                                  }}
                                />
                                <span className='text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close'
                                  onClick={(ev) => {

                                    text.options.linkAttr.splice(i, 1);

                                    var ssdsd = text.options.linkAttr.concat([]);




                                    var options = { ...text.options, linkAttr: ssdsd };
                                    setAttributes({ text: { ...text, options: options } });


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
                  <PGStyles obj={text} onChange={onChangeStyleText} onAdd={onAddStyleText} onRemove={onRemoveStyleText} onBulkAdd={onBulkAddText} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={text} onChange={onPickCssLibraryText} />
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

                    <SelectControl
                      label=""
                      value={icon.options.position}
                      options={[

                        { label: 'Choose Position', value: '' },

                        { label: 'Before Text', value: 'beforeText' },
                        { label: 'After Text', value: 'afterText' },
                        { label: 'Before Prefix', value: 'beforePrefix' },
                        { label: 'After Prefix', value: 'afterPrefix' },
                        { label: 'Before Postfix', value: 'beforePostfix' },
                        { label: 'After Postfix', value: 'afterPostfix' },
                        { label: 'Before Link', value: 'beforeLink' },
                        { label: 'After Link', value: 'afterLink' },


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
                  <PGStyles obj={icon} onChange={onChangeStyleIcon} onAdd={onAddStyleIcon} onRemove={onRemoveStyleIcon} onBulkAdd={onBulkAddIcon} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={icon} onChange={onPickCssLibraryIcon} />
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
                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={prefix} onChange={onChangeStylePrefix} onAdd={onAddStylePrefix} onRemove={onRemoveStylePrefix} onBulkAdd={onBulkAddPrefix} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={prefix} onChange={onPickCssLibraryPrefix} />
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
                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={postfix} onChange={onChangeStylePostfix} onAdd={onAddStylePostfix} onRemove={onRemoveStylePostfix} onBulkAdd={onBulkAddPostfix} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={postfix} onChange={onPickCssLibraryPostfix} />
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
                <p className='font-bold'>Text</p>
                <p><code>{textSelector}{'{/* your CSS here*/}'} </code></p>
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

            <div className='px-3'>
              <PGMailSubsctibe />
              <PGContactSupport utm={{ utm_source: 'BlockReadMore', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />

            </div>



          </div>
        </InspectorControls >


        <>

          {wrapper.options.tag && (
            <CustomTag {...blockProps} {...wrapAttrItems}>

              {icon.options.position == 'beforePrefix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}

              {prefix.options.text && (
                <span className={prefix.options.class}>{prefix.options.text}</span>
              )}

              {icon.options.position == 'afterPrefix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}


              {text.options.linkTo.length > 0 && (

                <>
                  {icon.options.position == 'beforeLink' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                  <a className='text' onClick={handleLinkClick}  {...linkAttrItemsText} target={text.options.linkTarget} href={postUrl}>

                    {icon.options.position == 'beforeText' && (
                      <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                    )}

                    {textEnable && (
                      <RichText
                        tagName={'span'}
                        value={text.options.text}
                        allowedFormats={['core/bold', 'core/italic', 'core/link']}
                        onChange={(content) => {
                          var options = { ...text.options, text: content };
                          setAttributes({ text: { ...text, options: options } });
                        }}
                        placeholder={__('Start Writing...')}
                      />

                    )}



                    {icon.options.position == 'afterText' && (
                      <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                    )}
                  </a>
                  {icon.options.position == 'afterLink' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                </>

              )}

              {text.options.linkTo.length == 0 && (
                <>
                  {icon.options.position == 'beforeText' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}

                  {textEnable && (
                    <RichText
                      className='text'
                      tagName={'span'}
                      value={text.options.text}
                      allowedFormats={['core/bold', 'core/italic', 'core/link']}
                      onChange={(content) => {
                        var options = { ...text.options, text: content };
                        setAttributes({ text: { ...text, options: options } });
                      }}
                      placeholder={__('Start Writing...')}
                    />
                  )}


                  {icon.options.position == 'afterText' && (
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

              {text.options.linkTo.length > 0 && (
                <>
                  {icon.options.position == 'beforeLink' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                  <a className='text' onClick={handleLinkClick}  {...linkAttrItemsText} target={text.options.linkTarget} href={postUrl}>

                    {icon.options.position == 'beforeText' && (
                      <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                    )}
                    {textEnable && (
                      <RichText

                        tagName={'span'}
                        value={text.options.text}
                        allowedFormats={['core/bold', 'core/italic', 'core/link']}
                        onChange={(content) => {
                          var options = { ...text.options, text: content };
                          setAttributes({ text: { ...text, options: options } });
                        }}
                        placeholder={__('Start Writing...')}
                      />
                    )}


                    {icon.options.position == 'afterText' && (
                      <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                    )}
                  </a>
                  {icon.options.position == 'afterLink' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                </>
              )}
              {text.options.linkTo.length == 0 && (

                <>
                  {icon.options.position == 'beforeText' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}

                  {textEnable && (
                    <RichText
                      className='text'
                      tagName={'span'}
                      value={text.options.text}
                      allowedFormats={['core/bold', 'core/italic', 'core/link']}
                      onChange={(content) => {
                        var options = { ...text.options, text: content };
                        setAttributes({ text: { ...text, options: options } });
                      }}
                      placeholder={__('Start Writing...')}
                    />
                  )}

                  {icon.options.position == 'afterText' && (
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
      </>

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})