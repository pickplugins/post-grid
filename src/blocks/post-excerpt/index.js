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

import IconToggle from '../../components/icon-toggle'
import Typography from '../../components/typography'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import BreakpointToggle from '../../components/breakpoint-toggle'
import PGproWrapper from '../../components/pro-wrapper'
import PGDropdown from '../../components/dropdown'

import colorsPresets from '../../colors-presets'
import PGcssDisplay from '../../components/css-display'

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
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: { "Desktop": "block" },

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
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: { "Desktop": "inline-block" },

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



    readMore: {
      type: 'object',
      default: {
        options: { text: 'Read More', isLink: true, linkTarget: '_blank', customUrl: '', linkAttr: [], class: '', },

        styles:
        {
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          textAlign: {},
          display: { "Desktop": "inline-block" },

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

      var sudoScourceX = { ...wrapper[sudoScource] }
      var elementSelector = wrapperSelector;

      if (sudoScource == 'styles') {
        elementSelector = wrapperSelector;
      }

      else if (sudoScource == 'hover') {
        elementSelector = wrapperSelector + ':hover';
      } else if (sudoScource == 'after') {
        elementSelector = wrapperSelector + ':after';
      } else if (sudoScource == 'before') {
        elementSelector = wrapperSelector + ':before';
      } else if (sudoScource == 'first-child') {
        elementSelector = wrapperSelector + ':first-child';
      } else if (sudoScource == 'last-child') {
        elementSelector = wrapperSelector + ':last-child';
      } else if (sudoScource == 'visited') {
        elementSelector = wrapperSelector + ':visited';
      } else if (sudoScource == 'selection') {
        elementSelector = wrapperSelector + ':selection';
      } else if (sudoScource == 'first-letter') {
        elementSelector = wrapperSelector + '::first-letter';
      } else if (sudoScource == 'first-line') {
        elementSelector = wrapperSelector + '::first-line';
      }
      else {
        elementSelector = wrapperSelector + ':' + sudoScource;
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

      setAttributes({ blockCssY: { items: blockCssY.items } });
    }





    function onAddStyleWrapper(sudoScource, key) {
      var sudoScourceX = { ...wrapper[sudoScource] }
      sudoScourceX[key] = {};
      wrapper[sudoScource] = sudoScourceX;
      setAttributes({ wrapper: { ...wrapper } });
    }




    function onChangeStylePostExcerpt(sudoScource, newVal, attr) {

      var sudoScourceX = { ...postExcerpt[sudoScource] }
      var elementSelector = excerptSelector;

      if (sudoScource == 'styles') {
        elementSelector = excerptSelector;
      }

      else if (sudoScource == 'hover') {
        elementSelector = excerptSelector + ':hover';
      } else if (sudoScource == 'after') {
        elementSelector = excerptSelector + ':after';
      } else if (sudoScource == 'before') {
        elementSelector = excerptSelector + ':before';
      } else if (sudoScource == 'first-child') {
        elementSelector = excerptSelector + ':first-child';
      } else if (sudoScource == 'last-child') {
        elementSelector = excerptSelector + ':last-child';
      } else if (sudoScource == 'visited') {
        elementSelector = excerptSelector + ':visited';
      } else if (sudoScource == 'selection') {
        elementSelector = excerptSelector + ':selection';
      } else if (sudoScource == 'first-letter') {
        elementSelector = excerptSelector + '::first-letter';
      } else if (sudoScource == 'first-line') {
        elementSelector = excerptSelector + '::first-line';
      }
      else {
        elementSelector = excerptSelector + ':' + sudoScource;
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
      setAttributes({ postExcerpt: { ...postExcerpt } });
    }






    function onRemoveStylePostExcerpt(sudoScource, key) {
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

      setAttributes({ blockCssY: { items: blockCssY.items } });
    }





    function onAddStylePostExcerpt(sudoScource, key) {
      var sudoScourceX = { ...postExcerpt[sudoScource] }
      sudoScourceX[key] = {};
      postExcerpt[sudoScource] = sudoScourceX;
      setAttributes({ postExcerpt: { ...postExcerpt } });
    }




    function onChangeStyleRedmore(sudoScource, newVal, attr) {

      var sudoScourceX = { ...postExcerpt[sudoScource] }
      var elementSelector = redmoreSelector;

      if (sudoScource == 'styles') {
        elementSelector = redmoreSelector;
      }

      else if (sudoScource == 'hover') {
        elementSelector = redmoreSelector + ':hover';
      } else if (sudoScource == 'after') {
        elementSelector = redmoreSelector + ':after';
      } else if (sudoScource == 'before') {
        elementSelector = redmoreSelector + ':before';
      } else if (sudoScource == 'first-child') {
        elementSelector = redmoreSelector + ':first-child';
      } else if (sudoScource == 'last-child') {
        elementSelector = redmoreSelector + ':last-child';
      } else if (sudoScource == 'visited') {
        elementSelector = redmoreSelector + ':visited';
      } else if (sudoScource == 'selection') {
        elementSelector = redmoreSelector + ':selection';
      } else if (sudoScource == 'first-letter') {
        elementSelector = redmoreSelector + '::first-letter';
      } else if (sudoScource == 'first-line') {
        elementSelector = redmoreSelector + '::first-line';
      }
      else {
        elementSelector = redmoreSelector + ':' + sudoScource;
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
      setAttributes({ postExcerpt: { ...postExcerpt } });
    }






    function onRemoveStyleRedmore(sudoScource, key) {
      var sudoScourceX = { ...postExcerpt[sudoScource] }
      if (sudoScourceX[key] != undefined) {
        delete sudoScourceX[key];
      }

      postExcerpt[sudoScource] = sudoScourceX;
      setAttributes({ postExcerpt: { ...postExcerpt } });

      if (blockCssY.items[redmoreSelector] == undefined) {
        blockCssY.items[redmoreSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {
        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[redmoreSelector][argAttr] = argAttrVal;
      })

      setAttributes({ blockCssY: { items: blockCssY.items } });
    }





    function onAddStyleRedmore(sudoScource, key) {
      var sudoScourceX = { ...postExcerpt[sudoScource] }
      sudoScourceX[key] = {};
      postExcerpt[sudoScource] = sudoScourceX;
      setAttributes({ postExcerpt: { ...postExcerpt } });
    }



    function onChangeStylePrefix(sudoScource, newVal, attr) {

      var sudoScourceX = { ...prefix[sudoScource] }
      var elementSelector = prefixSelector;

      if (sudoScource == 'styles') {
        elementSelector = prefixSelector;
      }

      else if (sudoScource == 'hover') {
        elementSelector = prefixSelector + ':hover';
      } else if (sudoScource == 'after') {
        elementSelector = prefixSelector + ':after';
      } else if (sudoScource == 'before') {
        elementSelector = prefixSelector + ':before';
      } else if (sudoScource == 'first-child') {
        elementSelector = prefixSelector + ':first-child';
      } else if (sudoScource == 'last-child') {
        elementSelector = prefixSelector + ':last-child';
      } else if (sudoScource == 'visited') {
        elementSelector = prefixSelector + ':visited';
      } else if (sudoScource == 'selection') {
        elementSelector = prefixSelector + ':selection';
      } else if (sudoScource == 'first-letter') {
        elementSelector = prefixSelector + '::first-letter';
      } else if (sudoScource == 'first-line') {
        elementSelector = prefixSelector + '::first-line';
      }
      else {
        elementSelector = prefixSelector + ':' + sudoScource;
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
      setAttributes({ prefix: { ...prefix } });

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

      setAttributes({ blockCssY: { items: blockCssY.items } });

    }


    function onAddStylePrefix(sudoScource, key) {

      var sudoScourceX = { ...prefix[sudoScource] }
      sudoScourceX[key] = {};
      prefix[sudoScource] = sudoScourceX;
      setAttributes({ prefix: { ...prefix } });

    }


    function onChangeStylePostfix(sudoScource, newVal, attr) {

      var sudoScourceX = { ...postfix[sudoScource] }
      var elementSelector = postfixSelector;

      if (sudoScource == 'styles') {
        elementSelector = postfixSelector;
      }

      else if (sudoScource == 'hover') {
        elementSelector = postfixSelector + ':hover';
      } else if (sudoScource == 'after') {
        elementSelector = postfixSelector + ':after';
      } else if (sudoScource == 'before') {
        elementSelector = postfixSelector + ':before';
      } else if (sudoScource == 'first-child') {
        elementSelector = postfixSelector + ':first-child';
      } else if (sudoScource == 'last-child') {
        elementSelector = postfixSelector + ':last-child';
      } else if (sudoScource == 'visited') {
        elementSelector = postfixSelector + ':visited';
      } else if (sudoScource == 'selection') {
        elementSelector = postfixSelector + ':selection';
      } else if (sudoScource == 'first-letter') {
        elementSelector = postfixSelector + '::first-letter';
      } else if (sudoScource == 'first-line') {
        elementSelector = postfixSelector + '::first-line';
      }
      else {
        elementSelector = postfixSelector + ':' + sudoScource;
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
      setAttributes({ postfix: { ...postfix } });

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

      setAttributes({ blockCssY: { items: blockCssY.items } });

    }


    function onAddStylePostfix(sudoScource, key) {

      var sudoScourceX = { ...postfix[sudoScource] }
      sudoScourceX[key] = {};
      postfix[sudoScource] = sudoScourceX;
      setAttributes({ postfix: { ...postfix } });

    }














    function onChangeExcerptTypo(typoX) {


      setAttributes({ postExcerpt: { ...postExcerpt, styles: typoX } });

      var newValuesObjX = {};
      var itemsX = blockCssY.items;

      console.log(typoX);



      if (typoX.fontFamily[breakPointX] != undefined) {
        itemsX[excerptSelector] = { ...blockCssY.items[excerptSelector], 'font-family': typoX.fontFamily };


      } else {

        //typoX.fontFamily[breakPointX] = {};
        itemsX[excerptSelector] = { ...blockCssY.items[excerptSelector], 'font-family': typoX.fontFamily };

      }


      if (typoX.fontSize[breakPointX] != undefined) {

        var fontSizeVal = (typoX.fontSize[breakPointX].val) ? typoX.fontSize[breakPointX].val : 16;
        var fontSizeUnit = (typoX.fontSize[breakPointX].unit) ? typoX.fontSize[breakPointX].unit : 'px';


        var fontSizeX = (blockCssY.items[excerptSelector]['font-size'] != undefined) ? blockCssY.items[excerptSelector]['font-size'] : {};

        fontSizeX[breakPointX] = fontSizeVal + fontSizeUnit;
        //blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector], 'font-size': fontSizeX };
        itemsX[excerptSelector] = { ...blockCssY.items[excerptSelector], 'font-size': fontSizeX };

      }


      if (typoX.lineHeight[breakPointX] != undefined) {

        var lineHeightVal = (typoX.lineHeight[breakPointX].val) ? typoX.lineHeight[breakPointX].val : 16;
        var lineHeightUnit = (typoX.lineHeight[breakPointX].unit) ? typoX.lineHeight[breakPointX].unit : 'px';


        var lineHeightX = (blockCssY.items[excerptSelector]['line-height'] != undefined) ? blockCssY.items[excerptSelector]['line-height'] : {};

        lineHeightX[breakPointX] = lineHeightVal + lineHeightUnit;

        //blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector], 'line-height': lineHeightX };
        itemsX[excerptSelector] = { ...blockCssY.items[excerptSelector], 'line-height': lineHeightX };

      }
      if (typoX.letterSpacing[breakPointX] != undefined) {

        var letterSpacingVal = (typoX.letterSpacing[breakPointX].val) ? typoX.letterSpacing[breakPointX].val : 0;
        var letterSpacingUnit = (typoX.letterSpacing[breakPointX].unit) ? typoX.letterSpacing[breakPointX].unit : 'px';



        var letterSpacingX = (blockCssY.items[excerptSelector]['letter-spacing'] != undefined) ? blockCssY.items[excerptSelector]['letter-spacing'] : {};

        letterSpacingX[breakPointX] = letterSpacingVal + letterSpacingUnit;

        //blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector], 'letter-spacing': letterSpacingX };
        itemsX[excerptSelector] = { ...blockCssY.items[excerptSelector], 'letter-spacing': letterSpacingX };

      }

      if (typoX.fontWeight[breakPointX] != undefined) {

        itemsX[excerptSelector] = { ...blockCssY.items[excerptSelector], 'font-weight': typoX.fontWeight };

      }


      if (typoX.textDecoration[breakPointX] != undefined) {

        var str = {};

        var textDecorationX = typoX.textDecoration[breakPointX];
        var textDecorationXStr = (textDecorationX.length > 0) ? textDecorationX.join(' ') : '';

        str[breakPointX] = textDecorationXStr;
        itemsX[excerptSelector] = { ...blockCssY.items[excerptSelector], 'text-decoration': str };



      }
      if (typoX.textTransform[breakPointX] != undefined) {

        itemsX[excerptSelector] = { ...blockCssY.items[excerptSelector], 'text-transform': typoX.textTransform };


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

    function paddingControl(nextValues) {


      var responsive = postExcerpt.styles.padding;
      responsive[breakPointX] = nextValues;


      var styles = { ...postExcerpt.styles, padding: responsive };
      setAttributes({ postExcerpt: { ...postExcerpt, styles: styles } });


      var itemsX = { ...blockCssY.items };

      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[excerptSelector] = (blockCssY.items[excerptSelector] != undefined) ? blockCssY.items[excerptSelector] : {};



      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[excerptSelector]['padding-top'] != undefined) ? blockCssY.items[excerptSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector], 'padding-top': paddingTop };
        //itemsX[excerptSelector] = { ...blockCssY.items[excerptSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[excerptSelector]['padding-right'] != undefined) ? blockCssY.items[excerptSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector], 'padding-right': paddingRight };
        //itemsX[excerptSelector] = { ...blockCssY.items[excerptSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[excerptSelector]['padding-bottom'] != undefined) ? blockCssY.items[excerptSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector], 'padding-bottom': paddingBottom };
        //itemsX[excerptSelector] = { ...blockCssY.items[excerptSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[excerptSelector]['padding-left'] != undefined) ? blockCssY.items[excerptSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector], 'padding-left': paddingLeft };
        //itemsX[excerptSelector] = { ...blockCssY.items[excerptSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });
      //setAttributes({ blockCssY: { items: itemsX } });



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




    function marginControl(nextValues) {

      var responsive = postExcerpt.styles.margin;
      responsive[breakPointX] = nextValues;



      var styles = { ...postExcerpt.styles, margin: responsive };
      setAttributes({ postExcerpt: { ...postExcerpt, styles: styles } });




      var itemsX = { ...blockCssY.items };




      blockCssY.items[excerptSelector] = (blockCssY.items[excerptSelector] != undefined) ? blockCssY.items[excerptSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[excerptSelector]['margin-top'] != undefined) ? blockCssY.items[excerptSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector], 'margin-top': marginTop };
        //itemsX[excerptSelector] = { ...blockCssY.items[excerptSelector], 'margin-top': marginTop };

      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[excerptSelector]['margin-right'] !== undefined) ? blockCssY.items[excerptSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector], 'margin-right': marginRight };
        //itemsX[excerptSelector] = { ...blockCssY.items[excerptSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[excerptSelector]['margin-bottom'] !== undefined) ? blockCssY.items[excerptSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector], 'margin-bottom': marginBottom };
        //itemsX[excerptSelector] = { ...blockCssY.items[excerptSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[excerptSelector]['margin-left'] !== undefined) ? blockCssY.items[excerptSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector], 'margin-left': marginLeft };
        //itemsX[excerptSelector] = { ...blockCssY.items[excerptSelector], 'margin-left': marginLeft };

      }

      setAttributes({ blockCssY: { items: blockCssY.items } });
      //setAttributes({ blockCssY: { items: itemsX } });

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





    const [setSome, setSomeState] = useState({});
    const [stateX, setStateX] = useState('Old Value');







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
            <AlignmentToolbar
              value={wrapper.styles.textAlign[breakPointX]}
              onChange={(newVal) => {

                var newValuesObj = {};


                if (Object.keys(wrapper.styles.textAlign).length == 0) {
                  newValuesObj[breakPointX] = newVal;
                } else {
                  newValuesObj = wrapper.styles.textAlign;
                  newValuesObj[breakPointX] = newVal;
                }


                var styles = { ...wrapper.styles, textAlign: newValuesObj };
                setAttributes({ wrapper: { options: wrapper.options, styles: styles } });

                blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'text-align': newValuesObj };
                setAttributes({ blockCssY: { items: blockCssY.items } });

              }}
            />







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
                  <PGStyles obj={wrapper} onChange={onChangeStyleRedmore} onAdd={onAddStyleRedmore} onRemove={onRemoveStyleRedmore} />
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