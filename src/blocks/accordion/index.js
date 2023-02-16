import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover, Spinner } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl, InnerBlocks, useBlockProps } from '@wordpress/block-editor'
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
import PGIconPicker from '../../components/icon-picker'

import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'


var myStore = wp.data.select('postgrid-shop');


registerBlockType("post-grid/accordion", {
  title: "Accordion",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:


      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 7.00003C2.44772 7.00003 2 7.44775 2 8.00003V16C2 16.5523 2.44772 17 3 17H21C21.5523 17 22 16.5523 22 16V8.00003C22 7.44775 21.5523 7.00003 21 7.00003H3ZM20.75 14.75C20.75 15.3023 20.3023 15.75 19.75 15.75H4.25C3.69772 15.75 3.25 15.3023 3.25 14.75V11.75C3.25 11.1977 3.69772 10.75 4.25 10.75H19.75C20.3023 10.75 20.75 11.1977 20.75 11.75V14.75Z" />
        <path d="M2 3C2 2.44772 2.44772 2 3 2H21C21.5523 2 22 2.44772 22 3V4.75C22 5.30228 21.5523 5.75 21 5.75H3C2.44772 5.75 2 5.30228 2 4.75V3Z" />
        <path d="M2 19.25C2 18.6977 2.44772 18.25 3 18.25H21C21.5523 18.25 22 18.6977 22 19.25V21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21V19.25Z" />
      </svg>



    ,
  },


  attributes: {


    wrapper: {
      type: 'object',
      default: {
        options: {
          content: '',
          tag: 'div',
          class: 'pg-accordion',
        },

        styles:
        {
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },

        },
      },
    },


    items: {
      type: 'array',
      default: [{ isActive: false, headerText: 'What is Lorem Ipsum?', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', icon: '', iconToggle: '', styles: {}, }],
    },
    header: {
      type: 'object',
      default: {
        options: {
          text: 'What is Lorem Ipsum?',
          tag: 'div',
          class: 'pg-accordion-header',


        },

        styles:
        {
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },

          padding: { Desktop: '' },
          margin: { Desktop: '' },

        },
      },
    },
    headerActive: {
      type: 'object',
      default: {
        options: {
          text: 'What is Lorem Ipsum?',
          tag: 'div',
          class: 'pg-accordion-header ',


        },

        styles:
        {
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },

        },
      },
    },
    content: {
      type: 'object',
      default: {
        options: {
          text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          tag: 'div',
          class: 'pg-accordion-content',
        },

        styles:
        {
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },

        },
      },
    },

    icon: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-chevron-right', class: 'icon', positon: 'beforeHeader', enableToggle: 'yes', },

        styles:
        {
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },

          fontSize: { Desktop: '' },

        },
      },
    },
    iconToggle: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-chevron-down', class: 'iconToggle', },

        styles:
        {
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },

          fontSize: { Desktop: '' },

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

    var items = attributes.items;
    var wrapper = attributes.wrapper;
    var header = attributes.header;
    var headerActive = attributes.headerActive;

    var content = attributes.content;
    var icon = attributes.icon;
    var iconToggle = attributes.iconToggle;

    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    var postId = context['postId'];
    var postType = context['postType'];

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    const [isLoading, setisLoading] = useState(false);
    const [postGridData, setPostGridData] = useState(window.PostGridPluginData);

    const [isOpen, setisOpen] = useState(false);

    // Wrapper CSS Class Selectors
    var wrapperSelector = blockClass;
    var headerSelector = blockClass + ' .pg-accordion-header';
    var headerActiveSelector = blockClass + ' .pg-accordion-header.active';

    var contentSelector = blockClass + ' .pg-accordion-content';
    const iconSelector = blockClass + ' .icon-wrap';


    useEffect(() => {

      setAttributes({ blockId: blockIdX });
      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [clientId]);


    useEffect(() => {


      setAttributes({ customCss: customCss });

      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);


    var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }



    const [iconHtml, setIconHtml] = useState('');

    useEffect(() => {

      var iconSrc = icon.options.iconSrc;
      var iconHtml = `<span class="${iconSrc}"></span>`;

      setIconHtml(iconHtml);
    }, [icon]);


    const [iconToggleHtml, setIconToggleHtml] = useState('');

    useEffect(() => {

      var iconSrc = iconToggle.options.iconSrc;
      var iconHtml = `<span class="${iconSrc}"></span>`;

      setIconToggleHtml(iconHtml);
    }, [iconToggle]);





    function handleLinkClick(ev) {

      ev.stopPropagation();
      ev.preventDefault();
      return false;
    }



    function onChangeIcon(arg) {




      var options = { ...icon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
      setAttributes({ icon: { ...icon, options: options } });

    }


    function onChangeIconToggle(arg) {




      var options = { ...iconToggle.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
      setAttributes({ iconToggle: { ...iconToggle, options: options } });

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




    function onChangeStyleHeader(sudoScource, newVal, attr) {


      // var path = sudoScource + '.' + attr + '.' + breakPointX
      // let obj = Object.assign({}, header);
      // const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      // setAttributes({ header: updatedObj });
      // var sudoScourceX = { ...updatedObj[sudoScource] }

      // var elementSelector = myStore.getElementSelector(sudoScource, headerSelector);


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
      // setAttributes({ header: { ...header } });

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, header);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ header: object });




      var elementSelector = myStore.getElementSelector(sudoScource, headerSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });




    }






    function onRemoveStyleHeader(sudoScource, key) {


      var object = myStore.deletePropertyDeep(header, [sudoScource, key, breakPointX]);
      setAttributes({ header: object });


      var elementSelector = myStore.getElementSelector(sudoScource, headerSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



      // var sudoScourceX = { ...header[sudoScource] }
      // if (sudoScourceX[key] != undefined) {
      //   delete sudoScourceX[key];
      // }

      // header[sudoScource] = sudoScourceX;
      // setAttributes({ header: { ...header } });

      // if (blockCssY.items[headerSelector] == undefined) {
      //   blockCssY.items[headerSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {
      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[headerSelector][argAttr] = argAttrVal;
      // })

      // if (blockCssY.items[headerSelector][key] != undefined) {
      //   delete blockCssY.items[headerSelector][key];
      // }


      // setAttributes({ blockCssY: { items: blockCssY.items } });
    }





    function onAddStyleHeader(sudoScource, key) {
      // var sudoScourceX = { ...header[sudoScource] }
      // sudoScourceX[key] = {};
      // header[sudoScource] = sudoScourceX;
      // setAttributes({ header: { ...header } });

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, header);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ header: object });

    }




    function onChangeStyleContent(sudoScource, newVal, attr) {


      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, content);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ content: object });




      var elementSelector = myStore.getElementSelector(sudoScource, contentSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });





      // var path = sudoScource + '.' + attr + '.' + breakPointX
      // let obj = Object.assign({}, content);
      // const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      // setAttributes({ content: updatedObj });
      // var sudoScourceX = { ...updatedObj[sudoScource] }



      // var elementSelector = myStore.getElementSelector(sudoScource, contentSelector);

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






    function onRemoveStyleContent(sudoScource, key) {


      var object = myStore.deletePropertyDeep(content, [sudoScource, key, breakPointX]);
      setAttributes({ content: object });


      var elementSelector = myStore.getElementSelector(sudoScource, contentSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });




      // var sudoScourceX = { ...content[sudoScource] }
      // if (sudoScourceX[key] != undefined) {
      //   delete sudoScourceX[key];
      // }

      // content[sudoScource] = sudoScourceX;
      // setAttributes({ content: { ...content } });

      // if (blockCssY.items[contentSelector] == undefined) {
      //   blockCssY.items[contentSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {
      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[contentSelector][argAttr] = argAttrVal;
      // })

      // if (blockCssY.items[contentSelector][key] != undefined) {
      //   delete blockCssY.items[contentSelector][key];
      // }


      // setAttributes({ blockCssY: { items: blockCssY.items } });
    }





    function onAddStyleContent(sudoScource, key) {
      // var sudoScourceX = { ...content[sudoScource] }
      // sudoScourceX[key] = {};
      // content[sudoScource] = sudoScourceX;
      // setAttributes({ content: { ...content } });


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, content);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ content: object });
    }



    function onChangeStyleIcon(sudoScource, newVal, attr) {


      // var path = sudoScource + '.' + attr + '.' + breakPointX
      // let obj = Object.assign({}, icon);
      // const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      // setAttributes({ icon: updatedObj });
      // var sudoScourceX = { ...updatedObj[sudoScource] }




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
      // //sudoScourceX[attr][breakPointX] = newVal;

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

      // var sudoScourceX = { ...icon[sudoScource] }
      // sudoScourceX[key] = {};
      // icon[sudoScource] = sudoScourceX;
      // setAttributes({ icon: { ...icon } });

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, icon);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ icon: object });

    }


    function onChangeStyleHeaderActive(sudoScource, newVal, attr) {

      // var path = sudoScource + '.' + attr + '.' + breakPointX
      // let obj = Object.assign({}, headerActive);
      // const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      // setAttributes({ headerActive: updatedObj });
      // var sudoScourceX = { ...updatedObj[sudoScource] }



      // var elementSelector = myStore.getElementSelector(sudoScource, headerActiveSelector);


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




      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, headerActive);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ headerActive: object });




      var elementSelector = myStore.getElementSelector(sudoScource, headerActiveSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });












    }


    function onRemoveStyleHeaderActive(sudoScource, key) {






      var object = myStore.deletePropertyDeep(headerActive, [sudoScource, key, breakPointX]);
      setAttributes({ headerActive: object });


      var elementSelector = myStore.getElementSelector(sudoScource, headerActiveSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


      // var sudoScourceX = { ...headerActive[sudoScource] }
      // if (sudoScourceX[key] != undefined) {
      //   delete sudoScourceX[key];
      // }

      // headerActive[sudoScource] = sudoScourceX;
      // //sudoScourceX[attr][breakPointX] = newVal;

      // setAttributes({ headerActive: { ...headerActive } });

      // if (blockCssY.items[headerActiveSelector] == undefined) {
      //   blockCssY.items[headerActiveSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {

      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[headerActiveSelector][argAttr] = argAttrVal;

      // })


      // if (blockCssY.items[headerActiveSelector][key] != undefined) {
      //   delete blockCssY.items[headerActiveSelector][key];
      // }

      // setAttributes({ blockCssY: { items: blockCssY.items } });

    }


    function onAddStyleHeaderActive(sudoScource, key) {

      // var sudoScourceX = { ...headerActive[sudoScource] }
      // sudoScourceX[key] = {};
      // headerActive[sudoScource] = sudoScourceX;
      // setAttributes({ headerActive: { ...headerActive } });


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, headerActive);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ headerActive: object });

    }





























    useEffect(() => {

      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);







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
            <div className='px-2' title="header" initialOpen={false}>


              <PanelBody title="Header" initialOpen={false}>


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
                        value={header.options.tag}
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

                          var options = { ...header.options, tag: newVal };
                          setAttributes({ header: { ...header, options: options } });

                        }

                        }
                      />
                    </PanelRow>


                  </PGtab>
                  <PGtab name="styles">
                    <PGStyles obj={header} onChange={onChangeStyleHeader} onAdd={onAddStyleHeader} onRemove={onRemoveStyleHeader} />
                  </PGtab>
                </PGtabs>




              </PanelBody>

              <PanelBody title="Header - Active" initialOpen={false}>

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

                  </PGtab>
                  <PGtab name="styles">
                    <PGStyles obj={headerActive} onChange={onChangeStyleHeaderActive} onAdd={onAddStyleHeaderActive} onRemove={onRemoveStyleHeaderActive} />
                  </PGtab>
                </PGtabs>



              </PanelBody>

              <PanelBody title="Content" initialOpen={false}>


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
                        value={content.options.tag}
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

                          var options = { ...content.options, tag: newVal };
                          setAttributes({ content: { ...content, options: options } });

                        }

                        }
                      />
                    </PanelRow>

                  </PGtab>
                  <PGtab name="styles">
                    <PGStyles obj={content} onChange={onChangeStyleContent} onAdd={onAddStyleContent} onRemove={onRemoveStyleContent} />
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
                      <label for="">Choose Toggled Icon</label>

                      <PGIconPicker library={iconToggle.options.library} srcType={iconToggle.options.srcType} iconSrc={iconToggle.options.iconSrc} onChange={onChangeIconToggle} />
                    </PanelRow>


                    <PanelRow>
                      <label for="">Icon postion</label>

                      <SelectControl
                        label=""
                        value={icon.options.position}
                        options={[

                          { label: 'Choose...', value: '' },

                          { label: 'Before Header Text', value: 'beforeHeader' },
                          { label: 'After Header Text', value: 'afterHeader' },


                        ]}
                        onChange={(newVal) => {


                          var options = { ...icon.options, position: newVal };
                          setAttributes({ icon: { ...icon, options: options } });


                        }



                        }
                      />
                    </PanelRow>


                    <PanelRow>
                      <label for="">Enable Icon Toggle</label>

                      <SelectControl
                        label=""
                        value={icon.options.enableToggle}
                        options={[

                          { label: 'Yes', value: 'yes' },
                          { label: 'No', value: 'no' },


                        ]}
                        onChange={(newVal) => {
                          var options = { ...icon.options, enableToggle: newVal };
                          setAttributes({ icon: { ...icon, options: options } });

                        }
                        }
                      />
                    </PanelRow>

                  </PGtab>
                  <PGtab name="styles">
                    <PGStyles obj={icon} onChange={onChangeStyleIcon} onAdd={onAddStyleIcon} onRemove={onRemoveStyleIcon} />
                  </PGtab>
                </PGtabs>







              </PanelBody>



              <PanelBody title="Custom Style" initialOpen={false}>


                <p>Please use following class selector to apply your custom CSS</p>


                <div className='my-3'>
                  <p className='font-bold'>Text </p>
                  <p><code>{wrapperSelector}{'{}'} </code></p>
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
                <PGContactSupport utm={{ utm_source: 'BlockText', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />
              </div>


            </div>






          </InspectorControls >
        </div >
        ,


        <>
          <div className={[blockId]}>

            <div className='bg-blue-500 p-2 px-5 text-white my-4 text-center cursor-pointer' onClick={ev => {

              var itemx = items.concat({ isActive: false, headerText: 'What is Lorem Ipsum?', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', icon: '', iconToggle: '', styles: {}, });

              setAttributes({ items: itemx });


            }}>Add</div>


            {items.map((item, i) => {

              return (

                <>

                  <div className={`${header.options.class} ${(items[i].isActive) ? 'active' : ''} cursor-pointer`} onClick={ev => {


                    items[i].isActive = !items[i].isActive;
                    var ssdsd = items.concat([]);

                    setAttributes({ items: ssdsd });

                  }}>

                    {icon.options.position == 'beforeHeader' && (
                      <>

                        {icon.options.enableToggle == 'yes' && (

                          <>
                            {!items[i].isActive && (
                              <span className='icon-wrap' dangerouslySetInnerHTML={{ __html: iconHtml }} />)}
                            {items[i].isActive && (
                              <span className='icon-wrap' dangerouslySetInnerHTML={{ __html: iconToggleHtml }} />
                            )}
                          </>
                        )}


                        {icon.options.enableToggle == 'no' && (
                          <span className='icon-wrap' dangerouslySetInnerHTML={{ __html: iconHtml }} />
                        )}

                      </>
                    )}




                    <RichText


                      tagName='span'
                      value={item.headerText}
                      allowedFormats={['core/bold', 'core/italic', 'core/link']}
                      onChange={(content) => {



                        items[i].headerText = content;
                        var ssdsd = items.concat([]);

                        setAttributes({ items: ssdsd });
                      }}
                      placeholder={__('Start Writing...')}
                    />




                    {icon.options.position == 'afterHeader' && (
                      <>

                        {icon.options.enableToggle == 'yes' && (

                          <>
                            {!items[i].isActive && (
                              <span className='icon-wrap float-right' dangerouslySetInnerHTML={{ __html: iconHtml }} />)}
                            {items[i].isActive && (
                              <span className='icon-wrap float-right' dangerouslySetInnerHTML={{ __html: iconToggleHtml }} />
                            )}
                          </>
                        )}


                        {icon.options.enableToggle == 'no' && (
                          <span className='icon-wrap float-right' dangerouslySetInnerHTML={{ __html: iconHtml }} />
                        )}

                      </>
                    )}





                    <span className='text-lg cursor-pointer px-2 text-red-500  py-1 float-right icon-close'
                      onClick={(ev) => {

                        items.splice(i, 1);
                        var ssdsd = items.concat([]);

                        setAttributes({ items: ssdsd })
                        ev.preventDefault();
                      }}

                    ></span>
                  </div>

                  {items[i].isActive && (


                    <div className={content.options.class}>
                      <RichText


                        tagName='div'
                        value={item.content}
                        allowedFormats={['core/bold', 'core/italic', 'core/link']}
                        onChange={(content) => {



                          items[i].content = content;
                          var ssdsd = items.concat([]);

                          setAttributes({ items: ssdsd });
                        }}
                        placeholder={__('Start Writing...')}
                      />
                    </div>


                  )}




                </>

              )

            })}


          </div>


        </>
      ]

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file





    return null;
  }
})