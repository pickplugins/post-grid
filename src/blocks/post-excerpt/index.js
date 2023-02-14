import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { applyFilters } from '@wordpress/hooks';

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

import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import PGproWrapper from '../../components/pro-wrapper'
import PGDropdown from '../../components/dropdown'

import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'




var myStore = wp.data.select('postgrid-shop');



registerBlockType("post-grid/post-excerpt", {
  title: "Post Excerpt",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:



      <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M29 218C29 215.239 31.2386 213 34 213H474C476.761 213 479 215.239 479 218V268C479 270.761 476.761 273 474 273H34C31.2386 273 29 270.761 29 268V218Z" />
        <path d="M29 109C29 106.239 31.2386 104 34 104H474C476.761 104 479 106.239 479 109V159C479 161.761 476.761 164 474 164H34C31.2386 164 29 161.761 29 159V109Z" />
        <path d="M29 327C29 324.239 31.2386 322 34 322H378C380.761 322 383 324.239 383 327V377C383 379.761 380.761 382 378 382H34C31.2386 382 29 379.761 29 377V327Z" />
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


        },
      },
    },

    postExcerpt: {
      type: 'object',
      default: {
        options: {
          tag: 'p',
          text: '',
          limitBy: 'word', /*word, character*/
          limitCount: 99,
          excerptSource: 'auto', /*excerpt, content, auto, meta*/
          excerptSourceMeta: '',
          removeBlocks: true,
          removeShortcodes: true,
          keepHtml: false,
          removeEmbeds: true,
          autoP: false,
          isLink: false,
          linkTarget: '_blank',
          customUrl: '',
          linkAttr: [],
          class: 'excerpt-text',
        },
        styles:
        {
          color: {},
          fontSize: {}, //{ val: '18', unit: 'px' }


        },
      },
    },



    readMore: {
      type: 'object',
      default: {
        options: { text: 'Read More', isLink: true, linkTarget: '_blank', customUrl: '', linkAttr: [], class: '', },

        styles:
        {
          color: {},
          fontSize: {}, //{ val: '18', unit: 'px' }


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

    var postExcerpt = attributes.postExcerpt;
    var wrapper = attributes.wrapper;
    var readMore = attributes.readMore;


    var linkAttr = attributes.linkAttr;
    var prefix = attributes.prefix;
    var postfix = attributes.postfix;
    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    var postId = context['postId'];
    var postType = context['postType'];

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    const [isLoading, setisLoading] = useState(false);
    const [postGridData, setPostGridData] = useState(window.PostGridPluginData);

    const [currentPostExcerpt, setCurrentpostExcerpt] = useEntityProp('postType', postType, 'excerpt', postId);
    const [currentPostContent, setCurrentpostContent] = useEntityProp('postType', postType, 'content', postId);
    const [customFields, setCustomFields] = useState({});

    const [currentPostUrl, setCurrentPostUrl] = useEntityProp('postType', postType, 'link', postId);



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


    var excerptSourceArgsBasic = {
      auto: { label: 'Auto', value: 'auto' },
      excerpt: { label: 'Excerpt', value: 'excerpt' },
      content: { label: 'Content', value: 'content' },
      meta: { label: 'Custom Fields', value: 'meta', isPro: true },
    };

    let excerptSourceArgs = applyFilters('excerptSourceArgs', excerptSourceArgsBasic);



    function setFieldLinkTo(option, index) {

      var options = { ...postExcerpt.options, linkTo: option.value };
      setAttributes({ postExcerpt: { ...postExcerpt, options: options } });

    }

    function setLimitBy(option, index) {

      var options = { ...postExcerpt.options, limitBy: option.value };
      setAttributes({ postExcerpt: { ...postExcerpt, options: options } });

    }


    useEffect(() => {

      setPostGridData(window.PostGridPluginData);

    }, [window.PostGridPluginData]);


    // Wrapper CSS Class Selectors
    const wrapperSelector = blockClass;
    var excerptSelector = '';
    const redmoreSelector = blockClass + ' .readmore';
    const prefixSelector = blockClass + ' .prefix';
    const postfixSelector = blockClass + ' .postfix';


    if (wrapper.options.tag.length != 0) {

      if (postExcerpt.options.isLink) {
        excerptSelector = blockClass + ' .excerpt-text';
      } else {
        if (postExcerpt.options.tag.length > 0) {
          excerptSelector = blockClass + ' .excerpt-text';

        } else {
          excerptSelector = blockClass;

        }

      }

    } else {
      excerptSelector = blockClass;

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

      var excerptSource = postExcerpt.options.excerptSource;
      var excerptSourceMeta = postExcerpt.options.excerptSourceMeta;

      if (excerptSource == 'meta' && excerptSourceMeta.length > 0) {

        var response = getMetaField(excerptSourceMeta)

      }


    }, [postExcerpt]);


    useEffect(() => {


      setAttributes({ customCss: customCss });


      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);




    const [postExcerptEdited, setPostExcerptEdited] = useState(currentPostExcerpt);
    //const [postContentEdited, setPostContentEdited] = useState(currentPostContent);


    useEffect(() => {

      //setisLoading(true);

      var excerptSource = postExcerpt.options.excerptSource;
      var excerptText = '';

      if (excerptSource == 'auto') {
        excerptText = (currentPostExcerpt != undefined && currentPostExcerpt.length > 0) ? currentPostExcerpt : '';
      } else if (excerptSource == 'excerpt') {
        excerptText = currentPostExcerpt;
      } else if (excerptSource == 'content') {
        excerptText = '';

      } else if (excerptSource == 'meta') {

        var excerptSourceMeta = postExcerpt.options.excerptSourceMeta;

        setTimeout(() => {
          excerptText = (customFields[excerptSourceMeta]) ? customFields[excerptSourceMeta] : '';

        }, 100)
      }

      excerptText = excerptText.length > 0 ? excerptText : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book';




      if (!postExcerpt.options.keepHtml) {
        excerptText = excerptText.replace(/<[^>]*>?/gm, '');
      }


      setTimeout(() => {

        var count = (postExcerpt.options.limitCount > 0) ? postExcerpt.options.limitCount : 999;

        if (postExcerpt.options.limitBy == 'character') {

          setPostExcerptEdited(excerptText.substring(0, count));
        }
        else {
          setPostExcerptEdited(excerptText.split(" ").splice(0, count).join(" "));
        }

        //setisLoading(false);


      }, 100)



    }, [postExcerpt, currentPostExcerpt]);

    const [linkPickerExcerpt, setLinkPickerExcerpt] = useState(false);
    const [linkPickerReadmore, setLinkPickerReadmore] = useState(false);





    useEffect(() => {

      setAttributes({ blockId: blockIdX });


      // var itemsX = { ...blockCssY.items }
      // itemsX[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'font-weight': readMore.typo.fontWeight };

      // setAttributes({ blockCssY: { items: itemsX } });


      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);



    }, [clientId]);



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

      // var path = sudoScource + '.' + attr + '.' + breakPointX
      // let obj = Object.assign({}, wrapper);
      // const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      // setAttributes({ wrapper: updatedObj });
      // var sudoScourceX = { ...updatedObj[sudoScource] }


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




    function onChangeStylePostExcerpt(sudoScource, newVal, attr) {


      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, postExcerpt);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ postExcerpt: object });

      var elementSelector = myStore.getElementSelector(sudoScource, excerptSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

      // var path = sudoScource + '.' + attr + '.' + breakPointX
      // let obj = Object.assign({}, postExcerpt);
      // const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      // setAttributes({ postExcerpt: updatedObj });
      // var sudoScourceX = { ...updatedObj[sudoScource] }

      // var elementSelector = myStore.getElementSelector(sudoScource, excerptSelector);


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
    }






    function onRemoveStylePostExcerpt(sudoScource, key) {


      var object = myStore.deletePropertyDeep(postExcerpt, [sudoScource, key, breakPointX]);
      setAttributes({ postExcerpt: object });

      var elementSelector = myStore.getElementSelector(sudoScource, excerptSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



      var sudoScourceX = { ...postExcerpt[sudoScource] }
      if (sudoScourceX[key] != undefined) {
        delete sudoScourceX[key];
      }

      postExcerpt[sudoScource] = sudoScourceX;
      setAttributes({ postExcerpt: { ...postExcerpt } });

      if (blockCssY.items[excerptSelector] == undefined) {
        blockCssY.items[excerptSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {
        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[excerptSelector][argAttr] = argAttrVal;
      })


      if (blockCssY.items[excerptSelector][key] != undefined) {
        delete blockCssY.items[excerptSelector][key];
      }

      setAttributes({ blockCssY: { items: blockCssY.items } });
    }





    function onAddStylePostExcerpt(sudoScource, key) {
      // var sudoScourceX = { ...postExcerpt[sudoScource] }
      // sudoScourceX[key] = {};
      // postExcerpt[sudoScource] = sudoScourceX;
      // setAttributes({ postExcerpt: { ...postExcerpt } });



      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, postExcerpt);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ postExcerpt: object });

    }




    function onChangeStyleRedmore(sudoScource, newVal, attr) {

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



      // var path = sudoScource + '.' + attr + '.' + breakPointX
      // let obj = Object.assign({}, readMore);
      // const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      // setAttributes({ readMore: updatedObj });
      // var sudoScourceX = { ...updatedObj[sudoScource] }


      // var elementSelector = myStore.getElementSelector(sudoScource, redmoreSelector);


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
    }






    function onRemoveStyleRedmore(sudoScource, key) {

      var object = myStore.deletePropertyDeep(readMore, [sudoScource, key, breakPointX]);
      setAttributes({ readMore: object });


      var elementSelector = myStore.getElementSelector(sudoScource, redmoreSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



      // var sudoScourceX = { ...readMore[sudoScource] }
      // if (sudoScourceX[key] != undefined) {
      //   delete sudoScourceX[key];
      // }

      // readMore[sudoScource] = sudoScourceX;
      // setAttributes({ readMore: { ...readMore } });

      // if (blockCssY.items[redmoreSelector] == undefined) {
      //   blockCssY.items[redmoreSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {
      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[redmoreSelector][argAttr] = argAttrVal;
      // })

      // if (blockCssY.items[redmoreSelector][key] != undefined) {
      //   delete blockCssY.items[redmoreSelector][key];
      // }


      // setAttributes({ blockCssY: { items: blockCssY.items } });
    }





    function onAddStyleRedmore(sudoScource, key) {
      // var path = [sudoScource, key, breakPointX]
      // let obj = Object.assign({}, readMore);
      // const object = myStore.addPropertyDeep(obj, path, '')
      // setAttributes({ readMore: object });



      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, readMore);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ readMore: object });
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

      // var path = sudoScource + '.' + attr + '.' + breakPointX
      // let obj = Object.assign({}, prefix);
      // const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      // setAttributes({ prefix: updatedObj });
      // var sudoScourceX = { ...updatedObj[sudoScource] }


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


      // var path = sudoScource + '.' + attr + '.' + breakPointX
      // let obj = Object.assign({}, postfix);
      // const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      // setAttributes({ postfix: updatedObj });
      // var sudoScourceX = { ...updatedObj[sudoScource] }



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





















    var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.
    var [linkAttrItemsReadmore, setlinkAttrItemsReadmore] = useState({}); // Using the hook.



    useEffect(() => {

      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);




    useEffect(() => {

      var sdsd = {};

      postExcerpt.options.linkAttr.map(x => {

        if (x.val)
          sdsd[x.id] = x.val;

      })

      setlinkAttrItems(sdsd);


    }, [postExcerpt]);


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





    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType,

    } = wp.data.dispatch('core/edit-post')


    var postUrl = (postExcerpt.options.customUrl != undefined && postExcerpt.options.customUrl.length > 0) ? postExcerpt.options.customUrl : currentPostUrl;


    const CustomTagX = `${wrapper.options.tag}`;
    const CustomTagExcerpt = `${postExcerpt.options.tag}`;






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
                  <PGStyles obj={wrapper} onChange={onChangeStyleWrapper} onAdd={onAddStyleWrapper} onRemove={onRemoveStyleWrapper} />
                </PGtab>
              </PGtabs>
            </PanelBody>




            <PanelBody title="Post Excerpt" initialOpen={false}>




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


                  <ToggleControl
                    label="Linked with post?"
                    help={postExcerpt.options.isLink ? 'Linked with post URL' : 'Not linked to post URL.'}
                    checked={postExcerpt.options.isLink ? true : false}
                    onChange={(e) => {
                      var options = { ...postExcerpt.options, isLink: postExcerpt.options.isLink ? false : true, };
                      setAttributes({ postExcerpt: { ...postExcerpt, options: options } });
                    }}
                  />


                  {!postExcerpt.options.isLink && (

                    <PanelRow>
                      <label for="">Custom Tag</label>
                      <SelectControl
                        label=""
                        value={postExcerpt.options.tag}
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
                          var options = { ...postExcerpt.options, tag: newVal };
                          setAttributes({ postExcerpt: { ...postExcerpt, options: options } });
                        }

                        }
                      />
                    </PanelRow>


                  )}


                  {postExcerpt.options.isLink && (

                    <div>
                      <PanelRow>
                        <label for="">Link Target</label>

                        <SelectControl
                          label=""
                          value={postExcerpt.options.linkTarget}
                          options={[
                            { label: '_self', value: '_self' },
                            { label: '_blank', value: '_blank' },
                            { label: '_parent', value: '_parent' },
                            { label: '_top', value: '_top' },


                          ]}
                          onChange={(newVal) => {



                            var options = { ...postExcerpt.options, linkTarget: newVal, };
                            setAttributes({ postExcerpt: { ...postExcerpt, options: options } });




                          }



                          }
                        />
                      </PanelRow>




                      <PanelRow>
                        <label for="">Custom Url</label>

                        <div className='relative'>
                          <Button className={(linkPickerExcerpt) ? "!bg-gray-400" : ''} icon={link} onClick={ev => {

                            setLinkPickerExcerpt(prev => !prev)
                          }}></Button>
                          {postExcerpt.options.customUrl.length > 0 && (
                            <Button className='!text-red-500 ml-2' icon={linkOff} onClick={ev => {

                              var options = { ...postExcerpt.options, customUrl: '' };
                              setAttributes({ postExcerpt: { ...postExcerpt, options: options } });
                            }}></Button>

                          )}
                          {linkPickerExcerpt && (
                            <Popover position="bottom right">
                              <LinkControl settings={[]} value={postExcerpt.options.customUrl} onChange={newVal => {

                                var options = { ...postExcerpt.options, customUrl: newVal.url };

                                setAttributes({ postExcerpt: { ...postExcerpt, options: options } });
                                //setLinkPickerpostExcerpt(false)

                              }} />

                              <div className='p-2'><span className='font-bold'>Linked to:</span> {(postExcerpt.options.customUrl.length != 0) ? postExcerpt.options.customUrl : 'No link'} </div>
                            </Popover>

                          )}


                        </div>
                      </PanelRow>






                      <PanelRow>
                        <label for="">Custom Attributes</label>
                        <div
                          className=' cursor-pointer px-3 text-white py-1 bg-blue-600'

                          onClick={(ev) => {

                            var sdsd = postExcerpt.options.linkAttr != undefined ? postExcerpt.options.linkAttr.concat({ id: '', val: '' }) : [];


                            var options = { ...postExcerpt.options, linkAttr: sdsd, };
                            setAttributes({ postExcerpt: { ...postExcerpt, options: options } });






                          }}

                        >Add</div>



                      </PanelRow>



                      {
                        postExcerpt.options.linkAttr != undefined && postExcerpt.options.linkAttr.map((x, i) => {

                          return (

                            <div className='my-2'>
                              <PanelRow>
                                <InputControl
                                  placeholder="Name"
                                  className='mr-2'
                                  value={postExcerpt.options.linkAttr[i].id}
                                  onChange={(newVal) => {

                                    postExcerpt.options.linkAttr[i].id = newVal;


                                    var ssdsd = postExcerpt.options.linkAttr.concat([]);


                                    var options = { ...postExcerpt.options, linkAttr: ssdsd, };
                                    setAttributes({ postExcerpt: { ...postExcerpt, options: options } });




                                  }}
                                />

                                <InputControl
                                  className='mr-2'
                                  placeholder="Value"
                                  value={x.val}
                                  onChange={(newVal) => {
                                    postExcerpt.options.linkAttr[i].val = newVal
                                    var ssdsd = postExcerpt.options.linkAttr.concat([]);



                                    var options = { ...postExcerpt.options, linkAttr: ssdsd, };
                                    setAttributes({ postExcerpt: { ...postExcerpt, options: options } });



                                  }}
                                />
                                <span className='text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close'
                                  onClick={(ev) => {

                                    postExcerpt.options.linkAttr.splice(i, 1);

                                    var ssdsd = postExcerpt.options.linkAttr.concat([]);



                                    var options = { ...postExcerpt.options, linkAttr: ssdsd, };
                                    setAttributes({ postExcerpt: { ...postExcerpt, options: options } });




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

                  {postExcerpt.options.limitBy.length > 0 && (
                    <div className='bg-gray-500 my-3 text-white p-2'>{limitByArgs[postExcerpt.options.limitBy].label}</div>
                  )}

                  {(postExcerpt.options.limitBy == 'word' || postExcerpt.options.limitBy == 'character') && (

                    <PanelRow>
                      <label for="">Limit Count</label>

                      <InputControl
                        value={postExcerpt.options.limitCount}
                        onChange={(newVal) => {
                          var options = { ...postExcerpt.options, limitCount: newVal };
                          setAttributes({ postExcerpt: { ...postExcerpt, options: options } });

                        }
                        }
                      />
                    </PanelRow>
                  )}

                  <PanelRow className='my-3'>
                    <label>Excerpt Source</label>
                    <PGDropdown position="bottom right" variant="secondary" buttonTitle={postExcerpt.options.excerptSource.length == 0 ? 'Choose' : postExcerpt.options.excerptSource} options={excerptSourceArgs} onChange={(option, index) => {
                      var options = { ...postExcerpt.options, excerptSource: option.value };
                      setAttributes({ postExcerpt: { ...postExcerpt, options: options } });

                    }} values=""></PGDropdown>
                  </PanelRow>



                  {postExcerpt.options.excerptSource == 'excerpt' && currentPostExcerpt.length == 0 && (
                    <div className='text-red-500'>Post Excerpt is empty.</div>
                  )}

                  {/* {postExcerpt.options.excerptSource == 'content' && currentPostContent.length == 0 && (
                    <div className='text-red-500'>Post Content is empty.</div>
                  )} */}


                  {postExcerpt.options.excerptSource == 'meta' && (

                    <div>
                      <PanelRow className='my-4'>
                        <label for="">Meta Field</label>
                        <SelectControl
                          label=""
                          value={postExcerpt.options.excerptSourceMeta}
                          options={[
                            { label: 'Custom', value: '' },
                            { label: 'Yoast meta', value: '_yoast_wpseo_metadesc' },
                            { label: 'Rank Math meta', value: 'rank_math_description' },
                            { label: 'AIO SEO meta', value: '_aioseo_og_description' },
                            { label: 'SEOPress meta', value: '_seopress_titles_desc' },
                            { label: 'WP Meta SEO meta', value: '_metaseo_metadesc' },
                            { label: 'The SEO Framework meta', value: '_genesis_description' },
                            { label: 'SEO SIMPLE PACK meta', value: 'ssp_meta_description' },
                          ]}
                          onChange={(newVal) => {
                            var options = { ...postExcerpt.options, excerptSourceMeta: newVal };
                            setAttributes({ postExcerpt: { ...postExcerpt, options: options } });
                          }

                          }
                        />
                      </PanelRow>
                      <PanelRow>
                        <label for="">Custom Meta Key</label>
                        <InputControl
                          value={postExcerpt.options.excerptSourceMeta}
                          onChange={(newVal) => {
                            var options = { ...postExcerpt.options, excerptSourceMeta: newVal };
                            setAttributes({ postExcerpt: { ...postExcerpt, options: options } });
                          }
                          }
                        />
                      </PanelRow>
                    </div>
                  )}

                  <ToggleControl className='my-4'
                    label="Remove Blocks?"
                    help={postExcerpt.options.removeBlocks ? 'Blocks will be removed' : 'Blocks may output with excerpt.'}
                    checked={postExcerpt.options.removeBlocks ? true : false}
                    onChange={(e) => {
                      var options = { ...postExcerpt.options, removeBlocks: postExcerpt.options.removeBlocks ? false : true, };
                      setAttributes({ postExcerpt: { ...postExcerpt, options: options } });
                    }}
                  />

                  <ToggleControl className='my-4'
                    label="Remove Shortcodes?"
                    help={postExcerpt.options.removeShortcodes ? 'Shortcodes will be removed' : 'Shortcodes may output with excerpt.'}
                    checked={postExcerpt.options.removeShortcodes ? true : false}
                    onChange={(e) => {
                      var options = { ...postExcerpt.options, removeShortcodes: postExcerpt.options.removeShortcodes ? false : true, };
                      setAttributes({ postExcerpt: { ...postExcerpt, options: options } });
                    }}
                  />

                  <ToggleControl className='my-4'
                    label="Keep HTML?"
                    help={postExcerpt.options.keepHtml ? 'HTML may output with excerpt.' : 'HTML will be removed'}
                    checked={postExcerpt.options.keepHtml ? true : false}
                    onChange={(e) => {
                      var options = { ...postExcerpt.options, keepHtml: postExcerpt.options.keepHtml ? false : true, };
                      setAttributes({ postExcerpt: { ...postExcerpt, options: options } });
                    }}
                  />

                  {postExcerpt.options.keepHtml && (


                    <PGproWrapper utmUrl={"?utm_source=dashboard&utm_term=postExcerptBlock&utm_campaign=pluginPostGrid&utm_medium=postTitleBlock-keepHtml"}>
                      <p> <span className='underline'>Keep HTML</span> Only avilable in Premium</p>
                    </PGproWrapper>




                  )}

                  <ToggleControl className='my-4'
                    label="Enable wpautop()?"
                    help={postExcerpt.options.autoP ? 'wpautop function will be applied' : 'wpautop function will not be applied.'}
                    checked={postExcerpt.options.autoP ? true : false}
                    onChange={(e) => {
                      var options = { ...postExcerpt.options, autoP: postExcerpt.options.autoP ? false : true, };
                      setAttributes({ postExcerpt: { ...postExcerpt, options: options } });
                    }}
                  />


                  {/* <ToggleControl className='my-4'
                    label="Remove Embeds?"
                    help={postExcerpt.options.removeEmbeds ? 'Embeded will be removed' : 'Embeded may output with excerpt.'}
                    checked={postExcerpt.options.removeEmbeds ? true : false}
                    onChange={(e) => {
                      var options = { ...postExcerpt.options, removeEmbeds: postExcerpt.options.removeEmbeds ? false : true, };
                      setAttributes({ postExcerpt: { ...postExcerpt, options: options } });
                    }}
                  /> */}





                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={postExcerpt} onChange={onChangeStylePostExcerpt} onAdd={onAddStylePostExcerpt} onRemove={onRemoveStylePostExcerpt} />
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
                ]}
              >
                <PGtab name="options">


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
                    label="Linked with post?"
                    help={readMore.options.isLink ? 'Linked with post URL' : 'Not linked to post URL.'}
                    checked={readMore.options.isLink ? true : false}
                    onChange={(e) => {


                      var options = { ...readMore.options, isLink: readMore.options.isLink ? false : true, };
                      setAttributes({ readMore: { ...readMore, options: options } });



                    }}
                  />

                  {readMore.options.isLink && (

                    <div>
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
                        <label for="">Custom Url</label>

                        <div className='relative'>
                          <Button className={(linkPickerReadmore) ? "!bg-gray-400" : ''} icon={link} onClick={ev => {

                            setLinkPickerReadmore(prev => !prev)
                          }}></Button>
                          {readMore.options.customUrl.length > 0 && (
                            <Button className='!text-red-500 ml-2' icon={linkOff} onClick={ev => {

                              var options = { ...readMore.options, customUrl: '' };
                              setAttributes({ readMore: { ...readMore, options: options } });



                            }}></Button>

                          )}
                          {linkPickerReadmore && (
                            <Popover position="bottom right">
                              <LinkControl settings={[]} value={readMore.options.customUrl} onChange={newVal => {

                                var options = { ...readMore.options, customUrl: newVal.url };

                                setAttributes({ readMore: { ...readMore, options: options } });
                                //setLinkPickerReadmore(false)

                              }} />

                              <div className='p-2'><span className='font-bold'>Linked to:</span> {(readMore.options.customUrl.length != 0) ? readMore.options.customUrl : 'No link'} </div>
                            </Popover>

                          )}


                        </div>
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


                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={readMore} onChange={onChangeStyleRedmore} onAdd={onAddStyleRedmore} onRemove={onRemoveStyleRedmore} />
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

                      }
                      }
                    />
                  </PanelRow>
                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={prefix} onChange={onChangeStylePrefix} onAdd={onAddStylePrefix} onRemove={onRemoveStylePrefix} />
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

                      }

                      }
                    />
                  </PanelRow>
                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={postfix} onChange={onChangeStylePostfix} onAdd={onAddStylePostfix} onRemove={onRemoveStylePostfix} />
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
                <p className='font-bold'>Excerpt - With Link</p>
                <p><code>{excerptSelector}{'{}'} </code></p>
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
              <PGContactSupport utm={{ utm_source: 'BlockPostExcerpt', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />

            </div>





          </InspectorControls >
        </div >
        ,


        <>


          {isLoading && (
            <Spinner></Spinner>
          )}

          {wrapper.options.tag && (
            <CustomTagX className={[blockId]}>
              {postExcerpt.options.isLink && (
                <a className={postExcerpt.options.class} onClick={handleLinkClick}  {...linkAttrItems} href={postUrl}>

                  {prefix.options.text && (
                    <span className={prefix.options.class}>{prefix.options.text}</span>
                  )}
                  {postExcerpt.options.keepHtml && (
                    <RawHTML>{postExcerptEdited}</RawHTML>
                  )}

                  {!postExcerpt.options.keepHtml && (
                    <>{postExcerptEdited}</>
                  )}


                  {postfix.options.text &&
                    (<span className={postfix.options.class}>{postfix.options.text}</span>)}

                </a>

              )}
              {!postExcerpt.options.isLink && (

                <>

                  {postExcerpt.options.tag.length > 0 && (
                    <CustomTagExcerpt className={postExcerpt.options.class}>
                      {prefix.options.text && (
                        <span className={prefix.options.class}>{prefix.options.text}</span>
                      )}

                      {postExcerpt.options.keepHtml && (
                        <RawHTML>{postExcerptEdited}</RawHTML>
                      )}

                      {!postExcerpt.options.keepHtml && (
                        <>{postExcerptEdited}</>
                      )}


                      {postfix.options.text &&
                        (<span className={postfix.options.class}>{postfix.options.text}</span>)}

                    </CustomTagExcerpt>

                  )}

                  {postExcerpt.options.tag.length == 0 && (
                    <>
                      {prefix.options.text && (
                        <span className={prefix.options.class}>{prefix.options.text}</span>
                      )}

                      {postExcerpt.options.keepHtml && (
                        <RawHTML>{postExcerptEdited}</RawHTML>
                      )}

                      {!postExcerpt.options.keepHtml && (
                        <>{postExcerptEdited}</>
                      )}


                      {postfix.options.text &&
                        (<span className={postfix.options.class}>{postfix.options.text}</span>)}

                    </>

                  )}

                </>


              )}

              {readMore.options.isLink && (
                <a className='readmore' onClick={handleLinkClick}  {...linkAttrItemsReadmore} target={readMore.options.linkTarget} href={postUrl}> {readMore.options.text}</a>
              )}


            </CustomTagX>
          )
          }

          {
            wrapper.options.tag.length == 0 && (

              <>
                {
                  (
                    postExcerpt.options.isLink && (
                      <>
                        <a className={[blockId]} onClick={handleLinkClick}  {...linkAttrItems} href={postUrl} target={postExcerpt.options.linkTarget}>

                          {prefix.options.text && (
                            <span className='prefix'>{prefix.options.text}</span>
                          )}

                          {postExcerpt.options.keepHtml && (
                            <RawHTML>{postExcerptEdited}</RawHTML>
                          )}

                          {!postExcerpt.options.keepHtml && (
                            <>{postExcerptEdited}</>
                          )}

                          {postfix.options.text &&
                            (<span className='postfix'>{postfix.options.text}</span>)}

                        </a>
                        {readMore.options.isLink && (
                          <a className='readmore' onClick={handleLinkClick}  {...linkAttrItemsReadmore} target={readMore.options.linkTarget} href={postUrl}> {readMore.options.text}</a>
                        )}
                      </>



                    )
                  )

                }

              </>




            )
          }




          {
            wrapper.options.tag.length == 0 && !postExcerpt.options.isLink && (
              <div className={[blockId]}>
                {prefix.options.text && (
                  <span className='prefix'>{prefix.options.text}</span>
                )}

                {postExcerpt.options.keepHtml && (
                  <RawHTML>{postExcerptEdited}</RawHTML>
                )}

                {!postExcerpt.options.keepHtml && (
                  <>{postExcerptEdited}</>
                )}

                {postfix.options.text &&
                  (<span className='postfix'>{postfix.options.text}</span>)}

                {readMore.options.isLink && (
                  <a className='readmore' onClick={handleLinkClick}  {...linkAttrItemsReadmore} target={postExcerpt.options.linkTarget} href={postUrl}> {readMore.options.text}</a>
                )}
              </div>

            )
          }

        </>
      ]

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})