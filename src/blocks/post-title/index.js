import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { applyFilters } from '@wordpress/hooks';
import { Icon, styles, settings } from '@wordpress/icons';
import apiFetch from '@wordpress/api-fetch';
import { InnerBlocks, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"


import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;

import { store } from '../../store'

import { link, linkOff } from "@wordpress/icons";




import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import PGDropdown from '../../components/dropdown'
import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'
import PGCssLibrary from '../../components/css-library'
import PGTemplates from '../../components/templates'





var myStore = wp.data.select('postgrid-shop');

registerBlockType("post-grid/post-title", {
  apiVersion: 2,

  title: "Post Title",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:


      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><rect fill="#8db1ff" y="25.42" width="13.97" height="2" /><rect fill="#8db1ff" x="16.42" y="25.42" width="9.96" height="2" /><rect fill="#8db1ff" y="20.72" width="36" height="2" /><rect fill="#8db1ff" y="16.02" width="36" height="2" /><rect fill="#1d4ed8" y="8.58" width="36" height="2.35" /></svg>


    ,
  },


  attributes: {


    wrapper: {
      type: 'object',
      default: {
        options: { tag: 'h2', class: '' },

        styles:
        {

        },
      },
    },

    postTitle: {
      type: 'object',
      default: {
        options: {
          tag: '',
          limitBy: '', /*word, character*/
          limitCount: 99,
          isLink: true,
          linkTo: 'postUrl', /*postUrl, homeUrl, authorUrl, authorLink, mailTo, custom, customField */
          linkToAuthorMeta: '',
          linkToCustomMeta: '',

          linkTarget: '_blank',
          linkAttr: [],
          customUrl: '',
          class: '',
        },

        styles: {



          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },
      },
    },



    prefix: {
      type: 'object',
      default: {
        options:
        {
          text: '',
          class: 'prefix',
          position: 'beforebegin ', // beforebegin , afterbegin 
        },
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
        options:
        {
          text: '',
          class: 'postfix',
          position: 'afterend', // beforeend , afterend 

        },
        styles:
        {
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },

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



    let postTitle = attributes.postTitle;
    var wrapper = attributes.wrapper;
    var blockId = attributes.blockId;

    var blockIdX = attributes.blockId ? attributes.blockId : 'pg' + clientId.split('-').pop();
    var blockClass = '.' + blockIdX;

    var prefix = attributes.prefix;
    var postfix = attributes.postfix;
    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;



    var postId = context['postId'];
    var postType = context['postType'];

    //const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    var breakPointX = myStore.getBreakPoint();


    const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);

    //console.log(wp.data.select('postgrid-shop').getBreakPoint());

    // var deviceType = wp.data.select('core/edit-post').__experimentalGetPreviewDeviceType();

    // console.log(deviceType);


    const { deviceType } = useSelect(select => {
      const { __experimentalGetPreviewDeviceType } = select('core/edit-post');

      return {
        deviceType: __experimentalGetPreviewDeviceType(),
      }
    }, []);





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


    var limitByArgsBasic = {
      none: { label: 'Choose..', value: '' },
      word: { label: 'Word', value: 'word' },
      character: { label: 'Character', value: 'character', isPro: true },
    };

    let limitByArgs = applyFilters('limitByArgs', limitByArgsBasic);



    const [
      currentPostTitle,
      setCurrentPostTitle,
    ] = useEntityProp('postType', postType, 'title', postId);


    const [
      currentPostUrl,
      setCurrentPostUrl,
    ] = useEntityProp('postType', postType, 'link', postId);


    useEffect(() => {

      setAttributes({ blockId: blockIdX });
      myStore.generateBlockCss(blockCssY.items, blockId, customCss)

    }, [clientId]);


    useEffect(() => {



    }, [wrapper]);


    // Wrapper CSS Class Selectors
    const wrapperSelector = blockClass;


    var postTitleSelector = '';


    if (wrapper.options.tag.length != 0) {

      if (postTitle.options.isLink) {
        postTitleSelector = blockClass + ' a';
      } else {
        postTitleSelector = blockClass;
      }
    } else {
      postTitleSelector = blockClass;
    }




    function setFieldLinkTo(option, index) {

      var options = { ...postTitle.options, linkTo: option.value };
      setAttributes({ postTitle: { ...postTitle, options: options } });

    }

    function setLimitBy(option, index) {

      var options = { ...postTitle.options, limitBy: option.value };
      setAttributes({ postTitle: { ...postTitle, options: options } });

    }



    const prefixSelector = blockClass + ' .prefix';
    const postfixSelector = blockClass + ' .postfix';




    var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }




    const [postTitleEdited, setpostTitleEdited] = useState(currentPostTitle);



    useEffect(() => {

      var count = (postTitle.options.limitCount > 0) ? postTitle.options.limitCount : 999;



      if (postTitle.options.limitBy == 'character') {

        setpostTitleEdited(currentPostTitle.substring(0, count));
      }
      else {
        setpostTitleEdited(currentPostTitle.split(" ").splice(0, count).join(" "));
      }
    }, [postTitle]);



    useEffect(() => {

      var count = (postTitle.options.limitCount > 0) ? postTitle.options.limitCount : 0;
      var currentPostTitleX = currentPostTitle.length > 0 ? currentPostTitle : 'What is Lorem Ipsum?';

      if (postTitle.options.limitBy == 'character') {

        setpostTitleEdited(currentPostTitleX.substring(0, count));
      }
      else {
        setpostTitleEdited(currentPostTitleX.split(" ").splice(0, count).join(" "));
      }
    }, [currentPostTitle]);






    function handleLinkClick(ev) {

      ev.stopPropagation();
      ev.preventDefault();
      return false;
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




    function onPickCssLibraryPostTitle(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        postTitle[sudoScource] = sudoScourceArgs;
      })

      var postTitleX = Object.assign({}, postTitle);
      setAttributes({ postTitle: postTitleX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, postTitleSelector);


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

      var path = [sudoScource, key, breakPointX];
      let obj = Object.assign({}, wrapper);

      var object = myStore.addPropertyDeep(obj, path, '');
      setAttributes({ wrapper: object });
    }


    function onResetWrapper(sudoScources) {

      let obj = Object.assign({}, wrapper);

      Object.entries(sudoScources).map(args => {
        var sudoScource = args[0];
        if (obj[sudoScource] == undefined) {
        } else {
          obj[sudoScource] = {}
          var elementSelector = myStore.getElementSelector(sudoScource, wrapperSelector);

          var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector]);
          setAttributes({ blockCssY: { items: cssObject } });
        }
      })

      setAttributes({ wrapper: obj });
    }



    function onChangeStylePostTitle(sudoScource, newVal, attr) {


      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, postTitle);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ postTitle: object });

      var elementSelector = myStore.getElementSelector(sudoScource, postTitleSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });


    }











    function onRemoveStylePostTitle(sudoScource, key) {


      var object = myStore.deletePropertyDeep(postTitle, [sudoScource, key, breakPointX]);
      setAttributes({ postTitle: object });

      var elementSelector = myStore.getElementSelector(sudoScource, postTitleSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });

    }


    function onAddStylePostTitle(sudoScource, key) {


      var path = [sudoScource, key, breakPointX];

      let obj = Object.assign({}, postTitle);

      const object = myStore.addPropertyDeep(obj, path, '');
      setAttributes({ postTitle: object });
    }



    function onResetPostTitle(sudoScources) {

      let obj = Object.assign({}, postTitle);

      Object.entries(sudoScources).map(args => {
        var sudoScource = args[0];
        if (obj[sudoScource] == undefined) {
        } else {
          obj[sudoScource] = {}
          var elementSelector = myStore.getElementSelector(sudoScource, postTitleSelector);

          var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector]);
          setAttributes({ blockCssY: { items: cssObject } });
        }
      })

      setAttributes({ postTitle: obj });
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




    function onResetPrefix(sudoScources) {

      let obj = Object.assign({}, prefix);

      Object.entries(sudoScources).map(args => {
        var sudoScource = args[0];
        if (obj[sudoScource] == undefined) {
        } else {
          obj[sudoScource] = {}
          var elementSelector = myStore.getElementSelector(sudoScource, prefixSelector);

          var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector]);
          setAttributes({ blockCssY: { items: cssObject } });
        }
      })

      setAttributes({ prefix: obj });
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




    function onResetPostfix(sudoScources) {

      let obj = Object.assign({}, postfix);

      Object.entries(sudoScources).map(args => {
        var sudoScource = args[0];
        if (obj[sudoScource] == undefined) {
        } else {
          obj[sudoScource] = {}
          var elementSelector = myStore.getElementSelector(sudoScource, postfixSelector);

          var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector]);
          setAttributes({ blockCssY: { items: cssObject } });
        }
      })

      setAttributes({ postfix: obj });
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




    function onBulkAddPostTitle(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, postTitle);
      obj[sudoScource] = cssObj;

      setAttributes({ postTitle: obj });

      var selector = myStore.getElementSelector(sudoScource, postTitleSelector);
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



    useEffect(() => {


      myStore.generateBlockCss(blockCssY.items, blockId, customCss)
    }, [blockCssY]);


    useEffect(() => {

      setAttributes({ customCss: customCss });


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);


    }, [customCss]);



    useEffect(() => {
      linkAttrObj();

    }, [postTitle]);






    var linkAttrObj = () => {

      var sdsd = {};

      postTitle.options.linkAttr.map(x => {

        if (x.val)
          sdsd[x.id] = x.val;

      })

      setlinkAttrItems(sdsd);

    }


    var postUrl = (postTitle.options.customUrl != undefined && postTitle.options.customUrl.length > 0) ? postTitle.options.customUrl : currentPostUrl;


    const CustomTagWrapper = `${wrapper.options.tag}`;
    const CustomTagPostTitle = (postTitle.options.tag.length != 0) ? `${postTitle.options.tag}` : 'div';



    const blockProps = useBlockProps({
      className: ` ${blockId} pg-post-title`,


    });





    return (

      <>



        <InspectorControls >
          <div className='' >

            <PanelBody title="Wrapper" initialOpen={false}>
              <PGtabs
                activeTab="styles"
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
                        setAttributes({ wrapper: { styles: wrapper.styles, options: options } });
                      }
                      }
                    />
                  </PanelRow>


                </PGtab>
                <PGtab name="styles">
                  <PGStyles blockId={blockId} obj={wrapper} onChange={onChangeStyleWrapper} onAdd={onAddStyleWrapper} onRemove={onRemoveStyleWrapper} onBulkAdd={onBulkAddWrapper} onReset={onResetWrapper} />
                </PGtab>

                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={wrapper} onChange={onPickCssLibraryWrapper} />
                </PGtab>

              </PGtabs>


            </PanelBody>

            <PanelBody title="Post Title" initialOpen={false}>


              <PGtabs
                activeTab="styles"
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
                    label="Linked?"
                    help={postTitle.options.isLink ? 'Linked to URL' : 'Not linked to URL.'}
                    checked={postTitle.options.isLink ? true : false}
                    onChange={(e) => {



                      var options = { ...postTitle.options, isLink: postTitle.options.isLink ? false : true };
                      setAttributes({ postTitle: { ...postTitle, options: options } });



                    }}
                  />



                  {!postTitle.options.isLink && (

                    <PanelRow>
                      <label for="">Custom Tag</label>
                      <SelectControl
                        label=""
                        value={postTitle.options.tag}
                        options={[
                          { label: 'No tag', value: '' },

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
                          var options = { ...postTitle.options, tag: newVal };
                          setAttributes({ postTitle: { ...postTitle, options: options } });
                        }

                        }
                      />
                    </PanelRow>
                  )}







                  {postTitle.options.isLink && (
                    <>


                      <PanelRow>
                        <label for="">Link To</label>

                        <PGDropdown position="bottom right" variant="secondary" options={linkToArgs} buttonTitle={(postTitle.options.linkTo == undefined) ? 'Choose' : linkToArgs[postTitle.options.linkTo].label} onChange={setFieldLinkTo} values={[]}></PGDropdown>

                      </PanelRow>


                      <div className='bg-gray-500 p-2 my-3 text-white'>{(linkToArgs[postTitle.options.linkTo] != undefined) ? linkToArgs[postTitle.options.linkTo].label : ''}</div>

                      {postTitle.options.linkTo == 'authorMeta' && (

                        <PanelRow>
                          <label for="">Author Meta Key</label>

                          <InputControl
                            value={postTitle.options.linkToAuthorMeta}
                            onChange={(newVal) => {


                              var options = { ...postTitle.options, linkToAuthorMeta: newVal };
                              setAttributes({ postTitle: { ...postTitle, options: options } });

                            }}
                          />

                        </PanelRow>

                      )}


                      {postTitle.options.linkTo == 'customField' && (

                        <PanelRow>
                          <label for="">Custom Meta Key</label>

                          <InputControl
                            value={postTitle.options.linkToAuthorMeta}
                            onChange={(newVal) => {

                              var options = { ...postTitle.options, linkToAuthorMeta: newVal };
                              setAttributes({ postTitle: { ...postTitle, options: options } });

                            }}
                          />

                        </PanelRow>

                      )}



                      {postTitle.options.linkTo == 'customUrl' && (


                        <PanelRow>
                          <label for="">Custom Url</label>

                          <div className='relative'>
                            <Button className={(linkPickerPosttitle) ? "!bg-gray-400" : ''} icon={link} onClick={ev => {

                              setLinkPickerPosttitle(prev => !prev);

                            }}></Button>
                            {postTitle.options.customUrl.length > 0 && (
                              <Button className='!text-red-500 ml-2' icon={linkOff} onClick={ev => {

                                var options = { ...postTitle.options, customUrl: '' };
                                setAttributes({ postTitle: { ...postTitle, options: options } });
                                setLinkPickerPosttitle(false);



                              }}></Button>

                            )}
                            {linkPickerPosttitle && (
                              <Popover position="bottom right">
                                <LinkControl settings={[]} value={postTitle.options.customUrl} onChange={newVal => {

                                  var options = { ...postTitle.options, customUrl: newVal.url };

                                  setAttributes({ postTitle: { ...postTitle, options: options } });

                                }} />

                                <div className='p-2'><span className='font-bold'>Linked to:</span> {(postTitle.options.customUrl.length != 0) ? postTitle.options.customUrl : 'No link'} </div>
                              </Popover>

                            )}


                          </div>
                        </PanelRow>
                      )}









                      <PanelRow>
                        <label for="">Link Target</label>

                        <SelectControl
                          label=""
                          value={postTitle.options.linkTarget}
                          options={[
                            { label: '_self', value: '_self' },
                            { label: '_blank', value: '_blank' },
                            { label: '_parent', value: '_parent' },
                            { label: '_top', value: '_top' },
                          ]}
                          onChange={
                            (newVal) => {
                              var options = { ...postTitle.options, linkTarget: newVal };
                              setAttributes({ text: { ...text, options: options } });
                            }
                          }
                        />
                      </PanelRow>
                    </>

                  )}





                  {postTitle.options.isLink && (

                    <div>


                      <PanelRow>
                        <label for="">Custom Attributes</label>
                        <div
                          className=' cursor-pointer px-3 text-white py-1 bg-blue-600'

                          onClick={(ev) => {

                            var sdsd = postTitle.options.linkAttr.concat({ id: '', val: '' })


                            var options = { ...postTitle.options, linkAttr: sdsd };
                            setAttributes({ postTitle: { ...postTitle, options: options } });

                            linkAttrObj()
                          }}

                        >Add</div>



                      </PanelRow>



                      {
                        postTitle.options.linkAttr.map((x, i) => {

                          return (

                            <div className='my-2'>
                              <PanelRow>
                                <InputControl
                                  placeholder="Name"
                                  className='mr-2'
                                  value={postTitle.options.linkAttr[i].id}
                                  onChange={(newVal) => {

                                    postTitle.options.linkAttr[i].id = newVal;


                                    var ssdsd = postTitle.options.linkAttr.concat([]);



                                    var options = { ...postTitle.options, linkAttr: ssdsd };
                                    setAttributes({ postTitle: { ...postTitle, options: options } });

                                  }}
                                />

                                <InputControl
                                  placeholder="Value"
                                  className='mr-2'
                                  value={x.val}
                                  onChange={(newVal) => {
                                    postTitle.options.linkAttr[i].val = newVal
                                    var ssdsd = postTitle.options.linkAttr.concat([]);



                                    var options = { ...postTitle.options, linkAttr: ssdsd };
                                    setAttributes({ postTitle: { ...postTitle, options: options } });

                                  }}
                                />
                                <span className='text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close'
                                  onClick={(ev) => {

                                    postTitle.options.linkAttr.splice(i, 1);

                                    var ssdsd = postTitle.options.linkAttr.concat([]);


                                    var options = { ...postTitle.options, linkAttr: ssdsd };
                                    setAttributes({ postTitle: { ...postTitle, options: options } });
                                  }}

                                ></span>
                              </PanelRow>




                            </div>

                          )

                        })
                      }


                    </div>



                  )}



                  <PanelRow>
                    <label for="">Limit By</label>

                    <PGDropdown position="bottom right" variant="secondary" options={limitByArgs} buttonTitle="Choose" onChange={setLimitBy} values={[]}></PGDropdown>
                  </PanelRow>

                  {postTitle.options.limitBy.length > 0 && (
                    <div className='bg-gray-500 my-3 text-white p-2'>{limitByArgs[postTitle.options.limitBy].label}</div>
                  )}

                  {(postTitle.options.limitBy == 'word' || postTitle.options.limitBy == 'character') && (

                    <PanelRow>
                      <label for="">Limit Count</label>

                      <InputControl
                        value={postTitle.options.limitCount}
                        onChange={(newVal) => {
                          var options = { ...postTitle.options, limitCount: newVal };
                          setAttributes({ postTitle: { ...postTitle, options: options } });

                        }
                        }
                      />
                    </PanelRow>
                  )}


                </PGtab>
                <PGtab name="styles">

                  <PGStyles obj={postTitle} onChange={onChangeStylePostTitle} onAdd={onAddStylePostTitle}
                    onRemove={onRemoveStylePostTitle} onBulkAdd={onBulkAddPostTitle} onReset={onResetPostTitle} />

                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={postTitle} onChange={onPickCssLibraryPostTitle} />
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
                        setAttributes({ prefix: { styles: prefix.styles, options: options } });

                      }
                      }
                    />
                  </PanelRow>


                  <PanelRow>
                    <label for="">Position</label>
                    <SelectControl
                      label=""
                      value={prefix.options.position}
                      options={[
                        { label: 'None', value: 'none' },
                        { label: 'Before Post Title', value: 'beforebegin' },
                        { label: 'Start of Post Title', value: 'afterbegin' },

                      ]}
                      onChange={(newVal) => {
                        var options = { ...prefix.options, position: newVal };
                        setAttributes({ prefix: { ...prefix, options: options } });
                      }

                      }
                    />
                  </PanelRow>




                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={prefix} onChange={onChangeStylePrefix} onAdd={onAddStylePrefix} onRemove={onRemoveStylePrefix} onBulkAdd={onBulkAddPrefix} onReset={onResetPrefix} />
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


                  <PanelRow>
                    <label for="">Position</label>
                    <SelectControl
                      label=""
                      value={postfix.options.position}
                      options={[
                        { label: 'None', value: 'none' },
                        { label: 'After Post Title', value: 'afterend' },
                        { label: 'End of Post Title', value: 'beforeend' },

                      ]}
                      onChange={(newVal) => {
                        var options = { ...postfix.options, position: newVal };
                        setAttributes({ postfix: { ...postfix, options: options } });
                      }

                      }
                    />
                  </PanelRow>
                </PGtab>
                <PGtab name="styles">


                  <PGStyles obj={postfix} onChange={onChangeStylePostfix} onAdd={onAddStylePostfix} onRemove={onRemoveStylePostfix} onBulkAdd={onBulkAddPostfix} onReset={onResetPostfix} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={postfix} onChange={onPickCssLibraryPostfix} />
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
                <p><code>{postTitleSelector}{'{/* your CSS here*/}'} </code></p>
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

            <div className='px-3'>

              <PGMailSubsctibe />
              <PGContactSupport utm={{ utm_source: 'BlockPostTitle', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />
            </div>


          </div>


        </InspectorControls >



        {wrapper.options.tag && (
          <CustomTagWrapper {...blockProps}>

            {postTitle.options.isLink && (
              <>
                {(prefix.options.position == 'beforebegin' && prefix.options.text && (<span className={prefix.options.class}>{prefix.options.text}</span>))}
                <a onClick={handleLinkClick} {...linkAttrItems} href={postUrl} target={postTitle.options.linkTarget}>

                  {(prefix.options.position == 'afterbegin' && prefix.options.text && (<span className={prefix.options.class}>{prefix.options.text}</span>))}
                  {(postTitleEdited)}
                  {(postfix.options.position == 'beforeend' && postfix.options.text && (<span className={postfix.options.class}>{postfix.options.text}</span>))}
                </a>
                {(postfix.options.position == 'afterend' && postfix.options.text && (<span className={postfix.options.class}>{postfix.options.text}</span>))}

              </>
            )}
            {!postTitle.options.isLink && (
              <>
                {(postTitle.options.tag.length == 0) && (
                  <>
                    {(prefix.options.position != 'none' && prefix.options.text && (<span className={prefix.options.class}>{prefix.options.text}</span>))}
                    {(postTitleEdited)}
                    {(postfix.options.position != 'none' && postfix.options.text && (<span className={postfix.options.class}>{postfix.options.text}</span>))}
                  </>
                )}


                {(postTitle.options.tag.length > 0) && (
                  <>


                    {(prefix.options.position == 'beforebegin' && prefix.options.text && (<span className={prefix.options.class}>{prefix.options.text}</span>))}
                    <CustomTagPostTitle>
                      {(prefix.options.position == 'afterbegin' && prefix.options.text && (<span className={prefix.options.class}>{prefix.options.text}</span>))}
                      {(postTitleEdited)}
                      {(postfix.options.position == 'beforeend' && postfix.options.text && (<span className={postfix.options.class}>{postfix.options.text}</span>))}
                    </CustomTagPostTitle>
                    {(postfix.options.position == 'afterend' && postfix.options.text && (<span className={postfix.options.class}>{postfix.options.text}</span>))}


                  </>
                )}





              </>
            )}
          </CustomTagWrapper>
        )}

        {wrapper.options.tag.length == 0 && (

          (
            postTitle.options.isLink && (
              <>
                {(prefix.options.position == 'beforebegin' && prefix.options.text && (<span className={prefix.options.class}>{prefix.options.text}</span>))}
                <a onClick={handleLinkClick} {...blockProps} {...linkAttrItems} href={postUrl} target={postTitle.options.linkTarget}>
                  {(prefix.options.position == 'afterbegin' && prefix.options.text && (<span className={prefix.options.class}>{prefix.options.text}</span>))}
                  {(postTitleEdited)}
                  {(postfix.options.position == 'beforeend' && postfix.options.text && (<span className={postfix.options.class}>{postfix.options.text}</span>))}

                </a>
                {(postfix.options.position == 'afterend' && postfix.options.text && (<span className={postfix.options.class}>{postfix.options.text}</span>))}
              </>

            )
          )
        )}

        {wrapper.options.tag.length == 0 && !postTitle.options.isLink && (


          <>

            {postTitle.options.tag.length > 0 && (
              <CustomTagPostTitle {...blockProps}>
                {(prefix.options.position != 'none' && prefix.options.text && (<span className={prefix.options.class}>{prefix.options.text}</span>))}
                {(postTitleEdited)}
                {(postfix.options.position != 'none' && postfix.options.text && (<span className={postfix.options.class}>{postfix.options.text}</span>))}
              </CustomTagPostTitle>

            )}
            {postTitle.options.tag.length == 0 && (
              <CustomTagPostTitle {...blockProps}>

                {(prefix.options.position != 'none' && prefix.options.text && (<span className={prefix.options.class}>{prefix.options.text}</span>))}
                {(postTitleEdited)}
                {(postfix.options.position != 'none' && postfix.options.text && (<span className={postfix.options.class}>{postfix.options.text}</span>))}
              </CustomTagPostTitle>

            )}
          </>

        )}
      </>


    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})