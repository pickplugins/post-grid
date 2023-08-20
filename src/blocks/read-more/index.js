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
import { applyFilters } from '@wordpress/hooks';


import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'
import { Icon, styles, settings, link, linkOff } from "@wordpress/icons";

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



registerBlockType("post-grid/read-more", {
  apiVersion: 2,
  title: "Read More",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:



      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><rect fill="#1d4ed8" x="16.42" y="21.43" width="9.96" height="2.35" /><rect fill="#8db1ff" y="21.61" width="13.97" height="2" /><rect fill="#8db1ff" y="16.91" width="36" height="2" /><rect fill="#8db1ff" y="12.22" width="36" height="2" /></svg>

    ,
  },


  attributes: {

    wrapper: {
      type: 'object',
      default: {
        options: { tag: 'div', class: '' },
        styles:
        {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },

        },
      },
    },

    readMore: {
      type: 'object',
      default: {
        options: {
          text: 'Read More', linkTo: 'postUrl', linkTarget: '_blank', customUrl: '', linkToAuthorMeta: '',
          linkToCustomMeta: '',
          linkAttr: [],
          class: '',
        },

        styles:
        {
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },

          display: {},

          fontSize: { Desktop: '' },
          lineHeight: {},
          letterSpacing: {},
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
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },

          display: {},

          fontSize: { Desktop: '' },
          lineHeight: {},
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
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },

        },
      },
    },

    postfix: {
      type: 'object',
      default: {
        options: { text: '', class: 'postfix' },

        styles:
        {
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },

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

    //const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    var breakPointX = myStore.getBreakPoint();

    const [isLoading, setisLoading] = useState(false);
    const [currentPostContent, setCurrentpostContent] = useEntityProp('postType', postType, 'content', postId);
    const [customFields, setCustomFields] = useState({});

    const [currentPostUrl, setCurrentPostUrl] = useEntityProp('postType', postType, 'link', postId);

    const [iconHtml, setIconHtml] = useState('');
    const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);



    // Wrapper CSS Class Selectors
    const wrapperSelector = blockClass;

    var redmoreSelector = blockClass + ' .readmore';

    if (readMore.options.linkTo.length == 0) {
      var redmoreSelector = blockClass + ' .text';

    } else {
      var redmoreSelector = blockClass + ' .readmore';

    }

    const iconSelector = blockClass + ' .readmore-icon';

    const prefixSelector = blockClass + ' .prefix';
    const postfixSelector = blockClass + ' .postfix';


    var linkToArgsBasic = {
      noUrl: { label: 'No URL', value: '' },

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



      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);






    const [linkPickerExcerpt, setLinkPickerExcerpt] = useState(false);
    const [linkPickerReadmore, setLinkPickerReadmore] = useState(false);





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




    function onPickCssLibraryReadMore(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        readMore[sudoScource] = sudoScourceArgs;
      })

      var readMoreX = Object.assign({}, readMore);
      setAttributes({ readMore: readMoreX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, redmoreSelector);


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

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

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




    function onChangeStyleReadmore(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, readMore);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ readMore: object });

      var elementSelector = myStore.getElementSelector(sudoScource, redmoreSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });


    }






    function onRemoveStyleReadmore(sudoScource, key) {


      var object = myStore.deletePropertyDeep(readMore, [sudoScource, key, breakPointX]);
      setAttributes({ readMore: object });


      var elementSelector = myStore.getElementSelector(sudoScource, redmoreSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }





    function onAddStyleReadmore(sudoScource, key) {



      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, readMore);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ readMore: object });

    }




    function onChangeStyleIcon(sudoScource, newVal, attr) {

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

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

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

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

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
      // var path = [sudoScource, attr, breakPointX]
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



    function onBulkAddReadmore(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, readMore);
      obj[sudoScource] = cssObj;

      setAttributes({ readMore: obj });

      var selector = myStore.getElementSelector(sudoScource, redmoreSelector);
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













































    var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.
    var [linkAttrItemsReadmore, setlinkAttrItemsReadmore] = useState({}); // Using the hook.



    useEffect(() => {


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
























    var postUrl = (readMore.options.customUrl != undefined && readMore.options.customUrl.length > 0) ? readMore.options.customUrl : currentPostUrl;


    const CustomTag = `${wrapper.options.tag}`;








    const blockProps = useBlockProps({
      className: ` ${blockId} pg-read-more`,

    });



    return (

      <>

        <InspectorControls >
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
                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={wrapper} onChange={onChangeStyleWrapper} onAdd={onAddStyleWrapper} onRemove={onRemoveStyleWrapper} onBulkAdd={onBulkAddWrapper} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={wrapper} onChange={onPickCssLibraryWrapper} />
                </PGtab>
              </PGtabs>


            </PanelBody>

            <PanelBody title="Read More" initialOpen={false}>



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

                  <PanelRow className='my-4'>
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


                  <PanelRow>
                    <label for="">Link To</label>

                    <PGDropdown position="bottom right" variant="secondary" options={linkToArgs} buttonTitle={(readMore.options.linkTo == undefined || readMore.options.linkTo.length == 0) ? 'Choose' : linkToArgs[readMore.options.linkTo].label} onChange={setFieldLinkTo} values={[]}></PGDropdown>

                  </PanelRow>


                  {readMore.options.linkTo.length > 0 && (

                    <>

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


                    </>



                  )}
                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={readMore} onChange={onChangeStyleReadmore} onAdd={onAddStyleReadmore} onRemove={onRemoveStyleReadmore} onBulkAdd={onBulkAddReadmore} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={readMore} onChange={onPickCssLibraryReadMore} />
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
                    <label for="">Icon postion</label>

                    <SelectControl
                      label=""
                      value={icon.options.position}
                      options={[

                        { label: 'Choose Position', value: '' },

                        { label: 'Before Readmore Text', value: 'beforeReadmore' },
                        { label: 'After Readmore Text', value: 'afterReadmore' },
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
                <p className='font-bold'>Excerpt Wrapper</p>
                <p><code>{wrapperSelector}{'{/* your CSS here*/}'}</code></p>
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

            <div className='px-3'>
              <PGMailSubsctibe />
              <PGContactSupport utm={{ utm_source: 'BlockReadMore', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />

            </div>
          </div>

        </InspectorControls >

        <>

          {wrapper.options.tag && (
            <CustomTag {...blockProps}>

              {icon.options.position == 'beforePrefix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}

              {prefix.options.text && (
                <span className={prefix.options.class}>{prefix.options.text}</span>
              )}

              {icon.options.position == 'afterPrefix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}


              {readMore.options.linkTo.length > 0 && (
                <a className='readmore' onClick={handleLinkClick}  {...linkAttrItemsReadmore} target={readMore.options.linkTarget} href={postUrl}>

                  {icon.options.position == 'beforeReadmore' && (
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



                  {icon.options.position == 'afterReadmore' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                </a>
              )}

              {readMore.options.linkTo.length == 0 && (
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

              {readMore.options.linkTo.length > 0 && (
                <a {...blockProps} className='readmore' onClick={handleLinkClick}  {...linkAttrItemsReadmore} target={readMore.options.linkTarget} href={postUrl}>

                  {icon.options.position == 'beforePostfix' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                  {prefix.options.text && (
                    <span className={prefix.options.class}>{prefix.options.text}</span>
                  )}

                  {icon.options.position == 'beforePostfix' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}

                  {icon.options.position == 'beforeReadmore' && (
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


                  {icon.options.position == 'afterReadmore' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}


                  {icon.options.position == 'beforePostfix' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                  {postfix.options.text &&
                    (<span className={postfix.options.class}>{postfix.options.text}</span>)}
                  {icon.options.position == 'afterPostfix' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}

                </a>
              )}
              {readMore.options.linkTo.length == 0 && (

                <div {...blockProps} className='readmore' onClick={handleLinkClick}  {...linkAttrItemsReadmore} target={readMore.options.linkTarget} href={postUrl}>

                  {icon.options.position == 'beforePostfix' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                  {prefix.options.text && (
                    <span className={prefix.options.class}>{prefix.options.text}</span>
                  )}

                  {icon.options.position == 'beforePostfix' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}

                  {icon.options.position == 'beforeReadmore' && (
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


                  {icon.options.position == 'afterReadmore' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}


                  {icon.options.position == 'beforePostfix' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                  {postfix.options.text &&
                    (<span className={postfix.options.class}>{postfix.options.text}</span>)}
                  {icon.options.position == 'afterPostfix' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}

                </div>



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