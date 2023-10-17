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
import metadata from "./block.json";

var myStore = wp.data.select('postgrid-shop');



registerBlockType(metadata, {
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path fill="#1d4ed8" d="M4.39,13.53h.17A.63.63,0,0,1,5,14l.21.44.71,1.49a.49.49,0,0,0,.39.3l.45.07,1.67.25a.55.55,0,0,1,.47.37.54.54,0,0,1-.12.59l-.17.18c-.46.47-.93.94-1.39,1.42a.57.57,0,0,0-.17.48c.12.75.25,1.5.37,2.25a.55.55,0,0,1-.22.57.49.49,0,0,1-.58,0l-1.83-1a.61.61,0,0,0-.65,0c-.61.35-1.22.68-1.83,1a.51.51,0,0,1-.58,0,.55.55,0,0,1-.23-.54c.11-.73.23-1.45.36-2.17a.63.63,0,0,0-.15-.6c-.46-.48-.93-.95-1.4-1.43A1,1,0,0,1,0,17.18V17s0,0,0,0a.53.53,0,0,1,.45-.42l.19,0,1.81-.27a.7.7,0,0,0,.61-.44c.27-.6.57-1.2.85-1.81A.7.7,0,0,1,4.39,13.53Z" /><path fill="#1d4ed8" d="M17.91,13.53h.18a.65.65,0,0,1,.45.43c.06.15.14.29.21.44.23.5.46,1,.7,1.49a.52.52,0,0,0,.39.3l.46.07,1.67.25a.57.57,0,0,1,.35,1l-.17.18-1.4,1.42a.53.53,0,0,0-.16.48c.12.75.24,1.5.37,2.25a.55.55,0,0,1-.22.57.51.51,0,0,1-.59,0l-1.83-1a.59.59,0,0,0-.64,0c-.61.35-1.23.68-1.84,1a.5.5,0,0,1-.57,0,.51.51,0,0,1-.23-.54c.11-.73.23-1.45.35-2.17a.63.63,0,0,0-.14-.6l-1.4-1.43a1,1,0,0,1-.33-.46V17l0,0a.56.56,0,0,1,.45-.42l.19,0c.61-.09,1.21-.19,1.82-.27a.68.68,0,0,0,.6-.44c.28-.6.57-1.2.85-1.81A.7.7,0,0,1,17.91,13.53Z" /><path fill="#8db1ff" d="M31.44,13.53h.17a.63.63,0,0,1,.45.43l.21.44L33,15.89a.49.49,0,0,0,.39.3l.45.07,1.67.25a.55.55,0,0,1,.47.37.54.54,0,0,1-.12.59l-.17.18c-.46.47-.93.94-1.39,1.42a.57.57,0,0,0-.17.48c.12.75.25,1.5.37,2.25a.55.55,0,0,1-.22.57.51.51,0,0,1-.59,0c-.6-.33-1.22-.66-1.82-1a.61.61,0,0,0-.65,0c-.61.35-1.22.68-1.83,1a.51.51,0,0,1-.58,0,.55.55,0,0,1-.23-.54c.11-.73.23-1.45.36-2.17a.63.63,0,0,0-.15-.6c-.46-.48-.93-.95-1.4-1.43a1,1,0,0,1-.32-.46V17s0,0,0,0a.53.53,0,0,1,.45-.42l.19,0,1.81-.27a.7.7,0,0,0,.61-.44c.27-.6.57-1.2.85-1.81A.68.68,0,0,1,31.44,13.53Z" /></svg>


    ,
  },


  


  edit: function (props) {


    var attributes = props.attributes;
    var setAttributes = props.setAttributes;
    var context = props.context;
    var clientId = props.clientId;


    var blockId = attributes.blockId;

    var blockIdX = attributes.blockId ? attributes.blockId : 'pg' + clientId.split('-').pop();
    var blockClass = '.' + blockIdX;

    var wrapper = attributes.wrapper;
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



    function setFieldLinkTo(option, index) {


      var options = { ...icon.options, linkTo: option.value };
      setAttributes({ icon: { ...icon, options: options } });

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
      icon.options.linkAttr.map(x => {
        if (x.val)
          sdsd[x.id] = x.val;
      })

      setlinkAttrItemsText(sdsd);
    }, [icon]);

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






















    var postUrl = (icon.options.customUrl != undefined && icon.options.customUrl.length > 0) ? icon.options.customUrl : currentPostUrl;


    const CustomTag = `${wrapper.options.tag}`;










    const blockProps = useBlockProps({
      className: ` ${blockId} pg-star-rate`,

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




                  <ToggleControl
                    label="Linked to URL?"
                    help={icon.options.isLink ? 'Linked to URL?' : 'Not Linked.'}
                    checked={icon.options.isLink ? true : false}
                    onChange={(e) => {


                      var options = { ...icon.options, isLink: icon.options.isLink ? false : true, };
                      setAttributes({ icon: { ...icon, options: options } });



                    }}
                  />




                  {icon.options.isLink && (
                    <>

                      <PanelRow>
                        <label for="">Link To</label>



                        <PGDropdown position="bottom right" variant="secondary" options={linkToArgs} buttonTitle="Choose" onChange={setFieldLinkTo} values={[]}></PGDropdown>


                      </PanelRow>


                      <div className='bg-gray-500 p-2 my-3 text-white'>{(linkToArgs[icon.options.linkTo] != undefined) ? linkToArgs[icon.options.linkTo].label : ''}</div>

                      {icon.options.linkTo == 'authorMeta' && (

                        <PanelRow>
                          <label for="">Author Meta Key</label>

                          <InputControl
                            value={icon.options.linkToAuthorMeta}
                            onChange={(newVal) => {


                              var options = { ...icon.options, linkToAuthorMeta: newVal };
                              setAttributes({ icon: { ...icon, options: options } });

                            }}
                          />

                        </PanelRow>

                      )}


                      {icon.options.linkTo == 'customField' && (

                        <PanelRow>
                          <label for="">Custom Meta Key</label>

                          <InputControl
                            value={icon.options.linkToAuthorMeta}
                            onChange={(newVal) => {


                              var options = { ...icon.options, linkToAuthorMeta: newVal };
                              setAttributes({ icon: { ...icon, options: options } });

                            }}
                          />

                        </PanelRow>

                      )}










                      <PanelRow>
                        <label for="">Link Target</label>

                        <SelectControl
                          label=""
                          value={icon.options.linkTarget}
                          options={[
                            { label: '_self', value: '_self' },
                            { label: '_blank', value: '_blank' },
                            { label: '_parent', value: '_parent' },
                            { label: '_top', value: '_top' },
                          ]}
                          onChange={
                            (newVal) => {
                              var options = { ...icon.options, linkTarget: newVal };
                              setAttributes({ icon: { ...icon, options: options } });
                            }
                          }
                        />
                      </PanelRow>
                    </>

                  )}




                  {icon.options.linkTo == 'customUrl' && (


                    <PanelRow>
                      <label for="">Custom Url</label>

                      <div className='relative'>
                        <Button className={(linkPickerText) ? "!bg-gray-400" : ''} icon={link} onClick={ev => {

                          setLinkPickerText(prev => !prev)
                        }}></Button>
                        {icon.options.customUrl.length > 0 && (
                          <Button className='!text-red-500 ml-2' icon={linkOff} onClick={ev => {

                            var options = { ...icon.options, customUrl: '' };
                            setAttributes({ icon: { ...icon, options: options } });



                          }}></Button>

                        )}
                        {linkPickerText && (
                          <Popover position="bottom right">
                            <LinkControl settings={[]} value={icon.options.customUrl} onChange={newVal => {

                              var options = { ...icon.options, customUrl: newVal.url };
                              setAttributes({ icon: { ...icon, options: options } });
                              //setLinkPickerText(false)

                            }} />

                            <div className='p-2'><span className='font-bold'>Linked to:</span> {(icon.options.customUrl.length != 0) ? icon.options.customUrl : 'No link'} </div>
                          </Popover>

                        )}


                      </div>
                    </PanelRow>


                  )}



                  {icon.options.isLink && (

                    <div>




                      <PanelRow>
                        <label for="">Custom Attributes</label>
                        <div
                          className=' cursor-pointer px-3 text-white py-1 bg-blue-600'

                          onClick={(ev) => {

                            var sdsd = icon.options.linkAttr.concat({ id: '', val: '' })



                            var options = { ...icon.options, linkAttr: sdsd };
                            setAttributes({ icon: { ...icon, options: options } });






                          }}

                        >Add</div>



                      </PanelRow>



                      {
                        icon.options.linkAttr != undefined && icon.options.linkAttr.map((x, i) => {

                          return (

                            <div className='my-2'>
                              <PanelRow>
                                <InputControl
                                  placeholder="Name"
                                  className='mr-2'
                                  value={icon.options.linkAttr[i].id}
                                  onChange={(newVal) => {

                                    icon.options.linkAttr[i].id = newVal;


                                    var ssdsd = icon.options.linkAttr.concat([]);



                                    var options = { ...icon.options, linkAttr: ssdsd };
                                    setAttributes({ icon: { ...icon, options: options } });



                                  }}
                                />

                                <InputControl
                                  className='mr-2'
                                  placeholder="Value"
                                  value={x.val}
                                  onChange={(newVal) => {
                                    icon.options.linkAttr[i].val = newVal
                                    var ssdsd = icon.options.linkAttr.concat([]);



                                    var options = { ...icon.options, linkAttr: ssdsd };
                                    setAttributes({ icon: { ...icon, options: options } });


                                  }}
                                />
                                <span className='text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close'
                                  onClick={(ev) => {

                                    icon.options.linkAttr.splice(i, 1);

                                    var ssdsd = icon.options.linkAttr.concat([]);




                                    var options = { ...icon.options, linkAttr: ssdsd };
                                    setAttributes({ icon: { ...icon, options: options } });


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

              {prefix.options.text && (
                <span className={prefix.options.class}>{prefix.options.text}</span>
              )}

              {icon.options.isLink && (
                <>
                  <a className='text' onClick={handleLinkClick}  {...linkAttrItemsText} target={icon.options.linkTarget} href={postUrl}>
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  </a>
                </>
              )}

              {!icon.options.isLink && (
                <>
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                </>
              )}

              {postfix.options.text &&
                (<span className={postfix.options.class}>{postfix.options.text}</span>)}
            </CustomTag>
          )}

          {wrapper.options.tag.length == 0 && (
            <div {...blockProps}>

              {prefix.options.text && (
                <span className={prefix.options.class}>{prefix.options.text}</span>
              )}

              {icon.options.isLink && (

                <a className='text' onClick={handleLinkClick}  {...linkAttrItemsText} target={text.options.linkTarget} href={postUrl}>
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                </a>

              )}
              {!icon.options.isLink && (

                <>
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                </>
              )}


              {postfix.options.text &&
                (<span className={postfix.options.class}>{postfix.options.text}</span>)}
            </div>

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