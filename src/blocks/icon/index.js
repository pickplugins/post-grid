import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover, Spinner } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';

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



registerBlockType("post-grid/icon", {
  title: "Icon/Button/Link",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:




      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.4211 13.1053V21.5263H2V13.1053H10.4211ZM8.31579 15.2105H4.10526V19.4211H8.31579V15.2105ZM11.4737 1L17.2632 10.4737H5.68421L11.4737 1ZM11.4737 5.06316L9.45263 8.36842H13.4947L11.4737 5.06316ZM17.2632 12.5789C19.8947 12.5789 22 14.6842 22 17.3158C22 19.9474 19.8947 22.0526 17.2632 22.0526C14.6316 22.0526 12.5263 19.9474 12.5263 17.3158C12.5263 14.6842 14.6316 12.5789 17.2632 12.5789ZM17.2632 14.6842C16.5652 14.6842 15.8959 14.9615 15.4024 15.455C14.9088 15.9485 14.6316 16.6179 14.6316 17.3158C14.6316 18.0137 14.9088 18.6831 15.4024 19.1766C15.8959 19.6701 16.5652 19.9474 17.2632 19.9474C17.9611 19.9474 18.6304 19.6701 19.124 19.1766C19.6175 18.6831 19.8947 18.0137 19.8947 17.3158C19.8947 16.6179 19.6175 15.9485 19.124 15.455C18.6304 14.9615 17.9611 14.6842 17.2632 14.6842Z" />
      </svg>


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
          color: { Desktop: '' },
          borderRadius: {},



        },
      },
    },

    text: {
      type: 'object',
      default: {
        options: {
          text: 'Custom Text',
          isLink: true,
          linkTo: 'postUrl', /*postUrl, homeUrl, authorUrl, authorLink, mailTo, custom, customField */
          linkToAuthorMeta: '',
          linkToCustomMeta: '',

          linkTarget: '_blank',
          customUrl: '',
          linkAttr: [],
          class: '',
        },

        styles:
        {
          color: { Desktop: '' },
          fontSize: { Desktop: '' },


        },
      },
    },


    icon: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-check-circle', position: 'beforeText', /*before, after, prefix, postfix */ class: 'text-icon', },

        styles:
        {
          color: { Desktop: '' },


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

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    const [isLoading, setisLoading] = useState(false);
    const [postGridData, setPostGridData] = useState(window.PostGridPluginData);
    const [currentPostContent, setCurrentpostContent] = useEntityProp('postType', postType, 'content', postId);
    const [customFields, setCustomFields] = useState({});

    const [currentPostUrl, setCurrentPostUrl] = useEntityProp('postType', postType, 'link', postId);

    const [iconHtml, setIconHtml] = useState('');



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


    var linkToArgs = {
      postUrl: { label: 'Post URL', value: 'postUrl' },
      homeUrl: { label: 'Home URL', value: 'homeUrl' },
      authorUrl: { label: 'Author URL', value: 'authorUrl' },
      authorLink: { label: 'Author Link', value: 'authorLink' },
      authorMail: { label: 'Author Mail', value: 'authorMail', isPro: true },
      authorMeta: { label: 'Author Meta', value: 'authorMeta', isPro: true },
      customField: { label: 'Custom Field', value: 'customField', isPro: true },

      customUrl: { label: 'Custom URL', value: 'customUrl', isPro: true },

    };



    useEffect(() => {


      setAttributes({ customCss: customCss });


      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);






    const [linkPickerExcerpt, setLinkPickerExcerpt] = useState(false);
    const [linkPickerText, setLinkPickerText] = useState(false);





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

      var object = myStore.deletePropertyDeep(wrapper, [sudoScource, key, breakPointX]);
      setAttributes({ wrapper: object });


      var elementSelector = myStore.getElementSelector(sudoScource, wrapperSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


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




    function onChangeStyleText(sudoScource, newVal, attr) {

      // var sudoScourceX = { ...text[sudoScource] }
      // var elementSelector = myStore.getElementSelector(sudoScource, textSelector);


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
      // setAttributes({ text: { ...text } });



      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, text);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ text: object });

      var elementSelector = myStore.getElementSelector(sudoScource, textSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });
    }






    function onRemoveStyleText(sudoScource, key) {



      var object = myStore.deletePropertyDeep(text, [sudoScource, key, breakPointX]);
      setAttributes({ text: object });

      var elementSelector = myStore.getElementSelector(sudoScource, textSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



      // var sudoScourceX = { ...text[sudoScource] }
      // if (sudoScourceX[key] != undefined) {
      //   delete sudoScourceX[key];
      // }

      // text[sudoScource] = sudoScourceX;
      // setAttributes({ text: { ...text } });

      // if (blockCssY.items[textSelector] == undefined) {
      //   blockCssY.items[textSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {
      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[textSelector][argAttr] = argAttrVal;
      // })

      // if (blockCssY.items[textSelector][key] != undefined) {
      //   delete blockCssY.items[textSelector][key];
      // }


      // setAttributes({ blockCssY: { items: blockCssY.items } });
    }





    function onAddStyleText(sudoScource, key) {
      // var sudoScourceX = { ...text[sudoScource] }
      // sudoScourceX[key] = {};
      // text[sudoScource] = sudoScourceX;
      // setAttributes({ text: { ...text } });



      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, text);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ text: object });



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


      var object = myStore.deletePropertyDeep(prefix, [sudoScource, key, breakPointX]);
      setAttributes({ prefix: object });


      var elementSelector = myStore.getElementSelector(sudoScource, prefixSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



      // var sudoScourceX = { ...prefix[sudoScource] }
      // if (sudoScourceX[key] != undefined) {
      //   delete sudoScourceX[key];
      // }

      // prefix[sudoScource] = sudoScourceX;
      // //sudoScourceX[attr][breakPointX] = newVal;

      // setAttributes({ prefix: { ...prefix } });

      // if (blockCssY.items[prefixSelector] == undefined) {
      //   blockCssY.items[prefixSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {

      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[prefixSelector][argAttr] = argAttrVal;

      // })


      // if (blockCssY.items[prefixSelector][key] != undefined) {
      //   delete blockCssY.items[prefixSelector][key];
      // }

      // setAttributes({ blockCssY: { items: blockCssY.items } });

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

      // var sudoScourceX = { ...postfix[sudoScource] }
      // var elementSelector = myStore.getElementSelector(sudoScource, postfixSelector);


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
      // setAttributes({ postfix: { ...postfix } });

    }


    function onRemoveStylePostfix(sudoScource, key) {


      var object = myStore.deletePropertyDeep(postfix, [sudoScource, key, breakPointX]);
      setAttributes({ postfix: object });

      var elementSelector = myStore.getElementSelector(sudoScource, postfixSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });

      // var sudoScourceX = { ...postfix[sudoScource] }
      // if (sudoScourceX[key] != undefined) {
      //   delete sudoScourceX[key];
      // }

      // postfix[sudoScource] = sudoScourceX;
      // //sudoScourceX[attr][breakPointX] = newVal;

      // setAttributes({ postfix: { ...postfix } });

      // if (blockCssY.items[postfixSelector] == undefined) {
      //   blockCssY.items[postfixSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {

      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[postfixSelector][argAttr] = argAttrVal;

      // })

      // if (blockCssY.items[postfixSelector][key] != undefined) {
      //   delete blockCssY.items[postfixSelector][key];
      // }


      // setAttributes({ blockCssY: { items: blockCssY.items } });

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
    function onChangeTextTypo(typoX) {


      setAttributes({ text: { ...text, styles: typoX } });

      var newValuesObjX = {};
      var itemsX = blockCssY.items;


      if (typoX.fontFamily[breakPointX] != undefined) {
        itemsX[textSelector] = { ...blockCssY.items[textSelector], 'font-family': typoX.fontFamily };


      } else {

        //typoX.fontFamily[breakPointX] = {};
        itemsX[textSelector] = { ...blockCssY.items[textSelector], 'font-family': typoX.fontFamily };

      }


      if (typoX.fontSize[breakPointX] != undefined) {

        var fontSizeVal = (typoX.fontSize[breakPointX].val) ? typoX.fontSize[breakPointX].val : 16;
        var fontSizeUnit = (typoX.fontSize[breakPointX].unit) ? typoX.fontSize[breakPointX].unit : 'px';


        var fontSizeX = (blockCssY.items[textSelector]['font-size'] != undefined) ? blockCssY.items[textSelector]['font-size'] : {};

        fontSizeX[breakPointX] = fontSizeVal + fontSizeUnit;
        //blockCssY.items[textSelector] = { ...blockCssY.items[textSelector], 'font-size': fontSizeX };
        itemsX[textSelector] = { ...blockCssY.items[textSelector], 'font-size': fontSizeX };

      }


      if (typoX.lineHeight[breakPointX] != undefined) {

        var lineHeightVal = (typoX.lineHeight[breakPointX].val) ? typoX.lineHeight[breakPointX].val : 16;
        var lineHeightUnit = (typoX.lineHeight[breakPointX].unit) ? typoX.lineHeight[breakPointX].unit : 'px';


        var lineHeightX = (blockCssY.items[textSelector]['line-height'] != undefined) ? blockCssY.items[textSelector]['line-height'] : {};

        lineHeightX[breakPointX] = lineHeightVal + lineHeightUnit;

        //blockCssY.items[textSelector] = { ...blockCssY.items[textSelector], 'line-height': lineHeightX };
        itemsX[textSelector] = { ...blockCssY.items[textSelector], 'line-height': lineHeightX };

      }
      if (typoX.letterSpacing[breakPointX] != undefined) {

        var letterSpacingVal = (typoX.letterSpacing[breakPointX].val) ? typoX.letterSpacing[breakPointX].val : 0;
        var letterSpacingUnit = (typoX.letterSpacing[breakPointX].unit) ? typoX.letterSpacing[breakPointX].unit : 'px';



        var letterSpacingX = (blockCssY.items[textSelector]['letter-spacing'] != undefined) ? blockCssY.items[textSelector]['letter-spacing'] : {};

        letterSpacingX[breakPointX] = letterSpacingVal + letterSpacingUnit;

        //blockCssY.items[textSelector] = { ...blockCssY.items[textSelector], 'letter-spacing': letterSpacingX };
        itemsX[textSelector] = { ...blockCssY.items[textSelector], 'letter-spacing': letterSpacingX };

      }

      if (typoX.fontWeight[breakPointX] != undefined) {

        itemsX[textSelector] = { ...blockCssY.items[textSelector], 'font-weight': typoX.fontWeight };

      }


      if (typoX.textDecoration[breakPointX] != undefined) {

        var str = {};

        var textDecorationX = typoX.textDecoration[breakPointX];
        var textDecorationXStr = (textDecorationX.length > 0) ? textDecorationX.join(' ') : '';

        str[breakPointX] = textDecorationXStr;
        itemsX[textSelector] = { ...blockCssY.items[textSelector], 'text-decoration': str };



      }
      if (typoX.textTransform[breakPointX] != undefined) {

        itemsX[textSelector] = { ...blockCssY.items[textSelector], 'text-transform': typoX.textTransform };


      }



      //setAttributes({ blockCssY: { items: blockCssY.items } });
      setAttributes({ blockCssY: { items: itemsX } });



    }

    function onChangeWrapTypo(typoX) {


      setAttributes({ wrapper: { ...wrapper, styles: typoX } });

      var newValuesObjX = {};
      var itemsX = blockCssY.items;


      if (typoX.fontFamily[breakPointX] != undefined) {
        itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'font-family': typoX.fontFamily };


      } else {

        //typoX.fontFamily[breakPointX] = {};
        itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'font-family': typoX.fontFamily };

      }


      if (typoX.fontSize[breakPointX] != undefined) {

        var fontSizeVal = (typoX.fontSize[breakPointX].val) ? typoX.fontSize[breakPointX].val : 16;
        var fontSizeUnit = (typoX.fontSize[breakPointX].unit) ? typoX.fontSize[breakPointX].unit : 'px';


        var fontSizeX = (blockCssY.items[wrapperSelector]['font-size'] != undefined) ? blockCssY.items[wrapperSelector]['font-size'] : {};

        fontSizeX[breakPointX] = fontSizeVal + fontSizeUnit;
        //blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'font-size': fontSizeX };
        itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'font-size': fontSizeX };

      }


      if (typoX.lineHeight[breakPointX] != undefined) {

        var lineHeightVal = (typoX.lineHeight[breakPointX].val) ? typoX.lineHeight[breakPointX].val : 16;
        var lineHeightUnit = (typoX.lineHeight[breakPointX].unit) ? typoX.lineHeight[breakPointX].unit : 'px';


        var lineHeightX = (blockCssY.items[wrapperSelector]['line-height'] != undefined) ? blockCssY.items[wrapperSelector]['line-height'] : {};

        lineHeightX[breakPointX] = lineHeightVal + lineHeightUnit;

        //blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'line-height': lineHeightX };
        itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'line-height': lineHeightX };

      }
      if (typoX.letterSpacing[breakPointX] != undefined) {

        var letterSpacingVal = (typoX.letterSpacing[breakPointX].val) ? typoX.letterSpacing[breakPointX].val : 0;
        var letterSpacingUnit = (typoX.letterSpacing[breakPointX].unit) ? typoX.letterSpacing[breakPointX].unit : 'px';



        var letterSpacingX = (blockCssY.items[wrapperSelector]['letter-spacing'] != undefined) ? blockCssY.items[wrapperSelector]['letter-spacing'] : {};

        letterSpacingX[breakPointX] = letterSpacingVal + letterSpacingUnit;

        //blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'letter-spacing': letterSpacingX };
        itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'letter-spacing': letterSpacingX };

      }

      if (typoX.fontWeight[breakPointX] != undefined) {

        itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'font-weight': typoX.fontWeight };

      }


      if (typoX.textDecoration[breakPointX] != undefined) {

        var str = {};

        var textDecorationX = typoX.textDecoration[breakPointX];
        var textDecorationXStr = (textDecorationX.length > 0) ? textDecorationX.join(' ') : '';

        str[breakPointX] = textDecorationXStr;
        itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'text-decoration': str };



      }
      if (typoX.textTransform[breakPointX] != undefined) {

        itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'text-transform': typoX.textTransform };


      }



      //setAttributes({ blockCssY: { items: blockCssY.items } });
      setAttributes({ blockCssY: { items: itemsX } });



    }




    function paddingControlWrapper(nextValues) {


      var responsive = wrapper.styles.padding;
      responsive[breakPointX] = nextValues;


      var styles = { ...wrapper.styles, padding: responsive };
      setAttributes({ wrapper: { ...wrapper, styles: styles } });

      var itemsX = { ...blockCssY.items };



      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;



      blockCssY.items[wrapperSelector] = (blockCssY.items[wrapperSelector] != undefined) ? blockCssY.items[wrapperSelector] : {};

      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[wrapperSelector]['padding-top'] != undefined) ? blockCssY.items[wrapperSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top
        blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'padding-top': paddingTop };
      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[wrapperSelector]['padding-right'] != undefined) ? blockCssY.items[wrapperSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right
        blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'padding-right': paddingRight };
      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[wrapperSelector]['padding-bottom'] != undefined) ? blockCssY.items[wrapperSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom
        blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'padding-bottom': paddingBottom };
      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[wrapperSelector]['padding-left'] != undefined) ? blockCssY.items[wrapperSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'padding-left': paddingLeft };
      }

      setAttributes({ blockCssY: { items: blockCssY.items } });

    }

    function paddingControlText(nextValues) {


      var responsive = text.styles.padding;
      responsive[breakPointX] = nextValues;


      var styles = { ...text.styles, padding: responsive };
      setAttributes({ text: { ...text, styles: styles } });

      var itemsX = { ...blockCssY.items };



      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;



      blockCssY.items[textSelector] = (blockCssY.items[textSelector] != undefined) ? blockCssY.items[textSelector] : {};

      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[textSelector]['padding-top'] != undefined) ? blockCssY.items[textSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top
        blockCssY.items[textSelector] = { ...blockCssY.items[textSelector], 'padding-top': paddingTop };
      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[textSelector]['padding-right'] != undefined) ? blockCssY.items[textSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right
        blockCssY.items[textSelector] = { ...blockCssY.items[textSelector], 'padding-right': paddingRight };
      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[textSelector]['padding-bottom'] != undefined) ? blockCssY.items[textSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom
        blockCssY.items[textSelector] = { ...blockCssY.items[textSelector], 'padding-bottom': paddingBottom };
      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[textSelector]['padding-left'] != undefined) ? blockCssY.items[textSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[textSelector] = { ...blockCssY.items[textSelector], 'padding-left': paddingLeft };
      }

      setAttributes({ blockCssY: { items: blockCssY.items } });

    }


    function marginControlWrapper(nextValues) {

      var responsive = wrapper.styles.margin;
      responsive[breakPointX] = nextValues;

      var styles = { ...wrapper.styles, margin: responsive };
      setAttributes({ wrapper: { ...wrapper, styles: styles } });

      var itemsX = { ...blockCssY.items };



      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;

      blockCssY.items[wrapperSelector] = (blockCssY.items[wrapperSelector] != undefined) ? blockCssY.items[wrapperSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[wrapperSelector]['margin-top'] != undefined) ? blockCssY.items[wrapperSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'margin-top': marginTop };

      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[wrapperSelector]['margin-right'] !== undefined) ? blockCssY.items[wrapperSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[wrapperSelector]['margin-bottom'] !== undefined) ? blockCssY.items[wrapperSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[wrapperSelector]['margin-left'] !== undefined) ? blockCssY.items[wrapperSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'margin-left': marginLeft };

      }

      setAttributes({ blockCssY: { items: blockCssY.items } });

    }


    function marginControlText(nextValues) {

      var responsive = text.styles.margin;
      responsive[breakPointX] = nextValues;

      var styles = { ...text.styles, margin: responsive };
      setAttributes({ text: { ...text, styles: styles } });

      var itemsX = { ...blockCssY.items };



      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;

      blockCssY.items[textSelector] = (blockCssY.items[textSelector] != undefined) ? blockCssY.items[textSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[textSelector]['margin-top'] != undefined) ? blockCssY.items[textSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[textSelector] = { ...blockCssY.items[textSelector], 'margin-top': marginTop };

      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[textSelector]['margin-right'] !== undefined) ? blockCssY.items[textSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[textSelector] = { ...blockCssY.items[textSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[textSelector]['margin-bottom'] !== undefined) ? blockCssY.items[textSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[textSelector] = { ...blockCssY.items[textSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[textSelector]['margin-left'] !== undefined) ? blockCssY.items[textSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[textSelector] = { ...blockCssY.items[textSelector], 'margin-left': marginLeft };

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



    var [linkAttrItemsText, setlinkAttrItemsText] = useState({}); // Using the hook.
    var [wrapAttrItems, setwrapAttrItems] = useState({}); // Using the hook.



    useEffect(() => {

      //generateBlockCssY()
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


    var postUrl = (text.options.customUrl != undefined && text.options.customUrl.length > 0) ? text.options.customUrl : currentPostUrl;


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
                      <PGStyles obj={wrapper} onChange={onChangeStyleWrapper} onAdd={onAddStyleWrapper} onRemove={onRemoveStyleWrapper} />
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


                      <PanelRow>
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






                      <ToggleControl
                        label="Linked to URL?"
                        help={text.options.isLink ? 'Linked to URL?' : 'Not Linked.'}
                        checked={text.options.isLink ? true : false}
                        onChange={(e) => {


                          var options = { ...text.options, isLink: text.options.isLink ? false : true, };
                          setAttributes({ text: { ...text, options: options } });



                        }}
                      />




                      {text.options.isLink && (
                        <>

                          <PanelRow>
                            <label for="">Link To</label>



                            <PGDropdown position="bottom right" variant="secondary" options={linkToArgs} buttonTitle="Choose" onChange={setFieldLinkTo} values={[]}></PGDropdown>


                          </PanelRow>


                          <div className='bg-gray-500 p-2 my-3 text-white'>{(linkToArgs[text.options.linkTo] != undefined) ? linkToArgs[text.options.linkTo].label : ''}</div>

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
































                      {text.options.isLink && (

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
                      <PGStyles obj={text} onChange={onChangeStyleText} onAdd={onAddStyleText} onRemove={onRemoveStyleText} />
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
                        <label for="">Icon postion</label>

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
                      <PGStyles obj={icon} onChange={onChangeStyleIcon} onAdd={onAddStyleIcon} onRemove={onRemoveStyleIcon} />
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
                      <PGStyles obj={prefix} onChange={onChangeStylePrefix} onAdd={onAddStylePrefix} onRemove={onRemoveStylePrefix} />
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
                      <PGStyles obj={postfix} onChange={onChangeStylePostfix} onAdd={onAddStylePostfix} onRemove={onRemoveStylePostfix} />
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
            <CustomTag className={[blockId]} {...wrapAttrItems}>

              {icon.options.position == 'beforePrefix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}

              {prefix.options.text && (
                <span className={prefix.options.class}>{prefix.options.text}</span>
              )}

              {icon.options.position == 'afterPrefix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}


              {text.options.isLink && (

                <>
                  {icon.options.position == 'beforeLink' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                  <a className='text' onClick={handleLinkClick}  {...linkAttrItemsText} target={text.options.linkTarget} href={postUrl}>

                    {icon.options.position == 'beforeText' && (
                      <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                    )}
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
                    {icon.options.position == 'afterText' && (
                      <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                    )}
                  </a>
                  {icon.options.position == 'afterLink' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                </>



              )}

              {!text.options.isLink && (
                <>
                  {icon.options.position == 'beforeText' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
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

              {text.options.isLink && (
                <>
                  {icon.options.position == 'beforeLink' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                  <a className='text' onClick={handleLinkClick}  {...linkAttrItemsText} target={text.options.linkTarget} href={postUrl}>

                    {icon.options.position == 'beforeText' && (
                      <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                    )}

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

                    {icon.options.position == 'afterText' && (
                      <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                    )}
                  </a>
                  {icon.options.position == 'afterLink' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                </>
              )}
              {!text.options.isLink && (

                <>

                  {icon.options.position == 'beforeText' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
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
      ]

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})