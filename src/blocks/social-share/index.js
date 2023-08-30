import { registerBlockType } from '@wordpress/blocks'
import apiFetch from '@wordpress/api-fetch';
import { InnerBlocks, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"
import { ReactSortable } from "react-sortablejs";

import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { Icon, styles, settings, link, linkOff, close, menu } from "@wordpress/icons";


import { InspectorControls, BlockControls, AlignmentToolbar, RichText } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'

import IconToggle from '../../components/icon-toggle'
import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import PGDropdown from '../../components/dropdown'
import Typography from '../../components/typography'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import PGcssDisplay from '../../components/css-display'
import PGIconPicker from '../../components/icon-picker'

import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'



var myStore = wp.data.select('postgrid-shop');




registerBlockType("post-grid/social-share", {
  apiVersion: 2,
  title: "Social Share",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path fill="#1d4ed8" d="M13.29,34.32H1.5a.19.19,0,0,0-.08,0A1.73,1.73,0,0,1,0,32.6V21.24a1.72,1.72,0,0,1,1.71-1.71H13.08a1.67,1.67,0,0,1,1.45.82,2.08,2.08,0,0,1,.26.68V32.82l0,.08a1.75,1.75,0,0,1-.84,1.19A2.52,2.52,0,0,1,13.29,34.32ZM9.77,33.16h3.16a.61.61,0,0,0,.7-.7V21.38a.61.61,0,0,0-.69-.7H1.85a.61.61,0,0,0-.69.69V32.48a.6.6,0,0,0,.68.68h6c.06,0,.11,0,.16,0V28.45H6.25V26.66H8v-.2c0-.47,0-.94,0-1.41a2.64,2.64,0,0,1,2.56-2.28H11.7s.08,0,.11,0v1.77H10.69a.87.87,0,0,0-.93.93v1.18h2.09l-.3,1.79H9.77Z" /><path fill="#1d4ed8" d="M26.58,19.53h4.1a1.13,1.13,0,0,0,.32,0,8.67,8.67,0,0,1,1.83.18,3.68,3.68,0,0,1,2.63,2A5.38,5.38,0,0,1,36,24c0,2,0,3.91,0,5.86a5.55,5.55,0,0,1-.17,1.28,3.76,3.76,0,0,1-2.28,2.77,6.11,6.11,0,0,1-2.16.38c-1.67.06-3.34,0-5,0a9.37,9.37,0,0,1-1.83-.17,3.82,3.82,0,0,1-2.67-1.88,5.18,5.18,0,0,1-.58-2.08,5.34,5.34,0,0,0-.05-.69V24.26l0-.22a7.78,7.78,0,0,1,.17-1.36,3.78,3.78,0,0,1,2.45-2.8,6,6,0,0,1,2-.32A5.54,5.54,0,0,0,26.58,19.53Zm8.07,7.17V25a11,11,0,0,0-.13-1.9,2.39,2.39,0,0,0-1.78-2,7.41,7.41,0,0,0-2-.25H27.18a15.49,15.49,0,0,0-2.36.12,2.43,2.43,0,0,0-2.12,2,9.36,9.36,0,0,0-.19,2.18c0,1.31,0,2.62,0,3.94a7.45,7.45,0,0,0,.17,1.76,2.5,2.5,0,0,0,1.9,2,7,7,0,0,0,1.64.17c1.4,0,2.79,0,4.19,0a9.59,9.59,0,0,0,2.07-.16,2.43,2.43,0,0,0,2-1.83,6.14,6.14,0,0,0,.2-1.48C34.67,28.57,34.67,27.63,34.65,26.7Z" /><path fill="#1d4ed8" d="M32.4,26.92a3.8,3.8,0,1,1-3.8-3.8A3.79,3.79,0,0,1,32.4,26.92Zm-3.79-2.46a2.46,2.46,0,1,0,2.45,2.47A2.45,2.45,0,0,0,28.61,24.46Z" /><path fill="#1d4ed8" d="M32.55,23.86a.89.89,0,1,1,0-1.77.89.89,0,1,1,0,1.77Z" /><path fill="#1d4ed8" d="M14.1,1.68h7.79a.21.21,0,0,0,.13,0,3.66,3.66,0,0,1,1.41.46,3.8,3.8,0,0,1,2,3.45c0,2.34,0,4.68,0,7a4.19,4.19,0,0,1-.12,1,3.85,3.85,0,0,1-3.68,2.93c-2.43,0-4.85,0-7.28,0a3.14,3.14,0,0,1-1.1-.19,3.79,3.79,0,0,1-2.59-2.81c-.05-.18-.08-.36-.12-.55V5.23c0-.13,0-.27.08-.4a3.84,3.84,0,0,1,2.91-3A5.54,5.54,0,0,0,14.1,1.68ZM24.48,9.14V5.71a3,3,0,0,0-.26-1.33,2.89,2.89,0,0,0-2.76-1.73c-2.31,0-4.62,0-6.92,0a2.81,2.81,0,0,0-1.28.27,2.87,2.87,0,0,0-1.74,2.76c0,2.3,0,4.61,0,6.92a3,3,0,0,0,3.05,3h6.55c.23,0,.46,0,.69,0A2.89,2.89,0,0,0,24,14.25a3,3,0,0,0,.47-1.69Z" /><path fill="#1d4ed8" d="M17.4,7.24a2.3,2.3,0,0,1,3.76-1.58,4.35,4.35,0,0,0,1.07-.23.41.41,0,0,1,.47.07.48.48,0,0,1,.17.49,2.62,2.62,0,0,1-.5,1.16,2.29,2.29,0,0,0-.46,1.19,5.42,5.42,0,0,1-2.27,3.78,5.24,5.24,0,0,1-2.59,1,5.69,5.69,0,0,1-2.94-.43,6.31,6.31,0,0,1-.73-.38.48.48,0,0,1,.26-.91,3.55,3.55,0,0,0,1.48-.17.61.61,0,0,0,.22-.1,6.78,6.78,0,0,1-.81-.7,3.6,3.6,0,0,1-1-1.72,5.26,5.26,0,0,1,0-1.37A5.85,5.85,0,0,1,13.7,6a1.22,1.22,0,0,1,.09-.27.47.47,0,0,1,.76-.12c.17.16.32.34.49.5a4.75,4.75,0,0,0,2.3,1.13Zm4.18-.64a.9.9,0,0,0-.24,0,.71.71,0,0,1-.78-.18A1.15,1.15,0,0,0,20,6.15a1.3,1.3,0,0,0-1.63,1.52.48.48,0,0,1-.37.59.91.91,0,0,1-.33,0,5.52,5.52,0,0,1-3-1.14A.78.78,0,0,0,14.51,7c0,.31,0,.62-.06.93a2.23,2.23,0,0,0,.69,1.74,5.86,5.86,0,0,0,1.36,1.06.48.48,0,0,1,0,.84,4.18,4.18,0,0,1-.87.5s-.08,0-.07.06a4,4,0,0,0,.78.07,6.81,6.81,0,0,0,.78-.05,4.28,4.28,0,0,0,2.46-1.22A4.67,4.67,0,0,0,21,7.73a.94.94,0,0,1,.18-.54C21.32,7,21.44,6.81,21.58,6.6Z" /></svg>,
  },


  attributes: {
    wrapper: {
      type: 'object',
      default: {
        options: { tag: 'div', class: '', },
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
        options: { class: 'icon', position: 'beforeLabel'/*beforeLabel, afterLabel, beforeCount, afterCount*/ },
        styles:
        {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },
      },
    },
    label: {
      type: 'object',
      default: {
        options: { class: '', },
        styles:
        {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },
      },
    },

    count: {
      type: 'object',
      default: {
        options: { class: '', },
        styles:
        {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },
      },
    },

    elements: {
      "type": "object",
      "default": {
        options: {
          linkTarget: '_blank', showLabel: false, showCount: false, showIcon: true, iconPositon: 'beforeLabel' // beforeLabel, afterLabel, beforeCount, afterCount
        },
        styles: {

          color: { Desktop: '#18978F' },
          backgroundColor: {},
          padding: { Desktop: '' },
          margin: {
            Desktop: '5px 5px 5px 5px'
          },
          display: {},
          borderRadius: {},

          fontSize: { Desktop: '35px' },
          lineHeight: {},
          letterSpacing: {},
          fontWeight: {},
          textDecoration: {}, //overline, line-through, underline
          textTransform: {},

        },
        items: [
          {
            id: 'facebook',
            label: 'Facebook',
            count: 125,
            url: 'https://www.facebook.com/sharer.php?u={URL}',
            siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fab fa-facebook-square', },
            styles: {

              color: { Desktop: '' },
              backgroundColor: {},
              padding: { Desktop: '' },
              margin: { Desktop: '' },
              display: {},
            },

          },
          {
            id: 'twitter', label: 'Twitter', count: 125, url: 'https://twitter.com/intent/tweet?url={URL}', siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fab fa-twitter-square', },
            styles: {

              color: { Desktop: '' },
              backgroundColor: {},
              padding: { Desktop: '' },
              margin: { Desktop: '' },
              display: {},
            },

          },
          {
            id: 'linkedin', label: 'Linkedin', count: 125, url: 'https://www.linkedin.com/shareArticle?mini=true&url={URL}&title={TITLE}', siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fab fa-linkedin', },
            styles: {

              color: { Desktop: '' },
              backgroundColor: {},
              padding: { Desktop: '' },
              margin: { Desktop: '' },
              display: {},
            },
          },
        ],
      } // avatar, name, description, id
    },




    customCss: {
      "type": "string",
      "default": ''
    },

    blockCssY: {
      "type": "object",
      "default": { items: {} }
    },

    blockId: {
      "type": "string",
      "default": ''
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
    var elements = attributes.elements;
    var icon = attributes.icon;
    var label = attributes.label;
    var count = attributes.count;


    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    var postId = context['postId'];
    var postType = context['postType'];




    var wrapperSelector = blockClass;
    // Wrapper CSS Class Selectors
    var itemSelector = blockClass + ' .media-item';
    var iconSelector = blockClass + ' .media-item .icon';
    var labelSelector = blockClass + ' .media-item .media-label';
    var countSelector = blockClass + ' .media-item .media-count';


    var [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());

    var [loading, setLoading] = useState(false);






    var [
      currentPostUrl,
      setCurrentPostUrl,
    ] = useEntityProp('postType', postType, 'link', postId);

    useEffect(() => {

      setAttributes({ blockId: blockIdX });
      ;
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);


      blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'font-size': { "Desktop": "30px" } };

      blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-top': { "Desktop": "10px" } };
      blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-right': { "Desktop": "10px" } };
      blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-bottom': { "Desktop": "10px" } };
      blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-left': { "Desktop": "10px" } };


      setAttributes({ blockCssY: { items: blockCssY.items } });








    }, [clientId]);



    useEffect(() => {




      elements.items.map((x, index) => {

        var styles = x.styles;

        Object.entries(styles).map(y => {

          var attrId = y[0];
          var attrVal = y[1]

          if (Object.keys(attrVal).length != 0) {

            var attrIdX = '';

            if (attrId == 'backgroundColor') {
              attrIdX = 'background-color';
            }
            else if (attrId == 'textAlign') {
              attrIdX = 'text-align';
            }
            else {
              attrIdX = attrId;

            }


            if (blockCssY.items[itemSelector + '.item-' + index] == undefined) {
              blockCssY.items[itemSelector + '.item-' + index] = {}
              blockCssY.items[itemSelector + '.item-' + index][attrIdX] = attrVal;


            } else {
              blockCssY.items[itemSelector + '.item-' + index][attrIdX] = attrVal;

            }


            setAttributes({ blockCssY: { items: blockCssY.items } });







          }


        })


      })

      setTimeout(x => {
        //setAttributes({ blockCssY: { items: newValuesObjX } });
      }, 2000)


    }, [elements]);


    function handleLinkClick(ev) {

      ev.stopPropagation();
      ev.preventDefault();
      return false;
    }


    var mediaSites = [


      {
        id: 'email', label: 'Mail', count: 125, url: 'mailto:?subject={TITLE}&body={URL}', siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-envelope', },
        styles: {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },

      },


      {
        id: 'skype', label: 'Skype', count: 125, url: 'https://web.skype.com/share?url={URL}', siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fab fa-skype', },
        styles: {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },

      },

      {
        id: 'whatsapp', label: 'WhatsApp', count: 125, url: 'https://api.whatsapp.com/send?text={URL} - {TITLE}', siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fab fa-whatsapp-square', },
        styles: {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },

      },
      {
        id: 'tumblr', label: 'Tumblr', count: 125, url: 'https://www.tumblr.com/share/link?url={URL}', siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fab fa-tumblr-square', },
        styles: {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },

      },

      {
        id: 'viber', label: 'Viber', count: 125, url: 'viber://chat?number=12345678', siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fab fa-viber', },
        styles: {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },

      },

      // {
      //   id: 'instagram', label: 'Instagram', count: 125, url: 'https://www.facebook.com/sharer.php?u={URL}', siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fab fa-square-instagram', },
      //   styles: {
      //     
      //     color: { Desktop: '' },
      //     backgroundColor: {},
      //   padding: { Desktop: '' },
      //   margin: { Desktop: '' },
      //     display: {},
      //   },

      // },

      {
        id: 'reddit', label: 'Reddit', count: 125, url: 'http://www.reddit.com/submit?title={TITLE}&url={URL}', siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fab fa-reddit-square', },
        styles: {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },

      },

      {
        id: 'facebook', label: 'Facebook', count: 125, url: 'https://www.facebook.com/sharer.php?u={URL}', siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fab fa-facebook-square', },
        styles: {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },

      },
      {
        id: 'twitter', label: 'Twitter', count: 125, url: 'https://twitter.com/intent/tweet?url={URL}', siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fab fa-twitter-square', },
        styles: {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },

      },
      {
        id: 'linkedin', label: 'Linkedin', count: 125, url: 'https://www.linkedin.com/shareArticle?mini=true&url={URL}&title={TITLE}', siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fab fa-linkedin', },
        styles: {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },
      },
      {
        id: 'pinterest', label: 'Pinterest', count: 125, url: 'https://www.pinterest.com/pin/create/button/?url={URL}&media={IMAGE}', siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fab fa-pinterest-square', },
        styles: {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },
      },


    ]


    function addMedia(option, index) {

      //var isExist = elements.items.find(x => x.label === option.label);


      //if (isExist == undefined) {


      //}

      var elementsX = elements.items.push(option);
      setAttributes({ elements: { ...elements, items: elements.items } });

    }













    var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

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




    function onChangeStyleElements(sudoScource, newVal, attr) {

      var sudoScourceX = { ...elements[sudoScource] }
      var elementSelector = myStore.getElementSelector(sudoScource, itemSelector);


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
      setAttributes({ elements: { ...elements } });
    }






    function onRemoveStyleElements(sudoScource, key) {

      var object = myStore.deletePropertyDeep(elements, [sudoScource, key, breakPointX]);
      setAttributes({ elements: object });

      var elementSelector = myStore.getElementSelector(sudoScource, itemSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });




    }





    function onAddStyleElements(sudoScource, key) {





      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, elements);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ elements: object });


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



    function onChangeStyleLabel(sudoScource, newVal, attr) {



      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, label);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ label: object });

      var elementSelector = myStore.getElementSelector(sudoScource, labelSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });



    }


    function onRemoveStyleLabel(sudoScource, key) {

      var object = myStore.deletePropertyDeep(label, [sudoScource, key, breakPointX]);
      setAttributes({ label: object });

      var elementSelector = myStore.getElementSelector(sudoScource, labelSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });





    }


    function onAddStyleLabel(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, label);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ label: object });



    }



    function onChangeStyleCount(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, count);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ count: object });

      var elementSelector = myStore.getElementSelector(sudoScource, countSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });


    }


    function onRemoveStyleCount(sudoScource, key) {


      var object = myStore.deletePropertyDeep(count, [sudoScource, key, breakPointX]);
      setAttributes({ count: object });

      var elementSelector = myStore.getElementSelector(sudoScource, countSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });




    }


    function onAddStyleCount(sudoScource, key) {



      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, count);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ count: object });


    }










    useEffect(() => {


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);














    function onChangeBreakPoint(x, index) {


      var asdsdsd = wp.data.dispatch('postgrid-shop').setBreakPoint(x.value)

      asdsdsd.then((res) => {

        setBreakPointX(res.breakpoint);
        ;
        myStore.generateBlockCss(blockCssY.items, blockId, customCss);
      });



    }



    const blockProps = useBlockProps({
      className: ` ${blockId} pg-social-share`,

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


            <PanelBody title="Items" initialOpen={true}>

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

                  <PanelRow className='my-4'>
                    <label for="">Add Media</label>
                    <PGDropdown position="bottom right" variant="secondary" options={mediaSites} buttonTitle="Choose" onChange={addMedia} values=""></PGDropdown>

                  </PanelRow>

                  {elements.items.length == 0 && (

                    <div className='bg-red-400 text-white my-3  px-3 py-2 text-center'>No media added</div>
                  )}


                  <ReactSortable list={elements.items} handle={'.handle'} setList={(item) => {


                    setAttributes({ elements: { ...elements, items: item } });


                  }}>
                    {elements.items.map((item, index) => (
                      <div key={item.id} className="">

                        <PanelBody title={
                          <>
                            <span className='cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1' onClick={ev => {
                              var elementsX = elements.items.splice(index, 1);
                              setAttributes({ elements: { ...elements, items: elements.items } });

                            }}><Icon icon={close} /></span>
                            <span className='handle cursor-pointer hover:bg-blue-500 hover:text-white px-1 py-1'><Icon icon={menu} /></span>


                            <span className='mx-2'>{item.label}</span>

                          </>

                        } initialOpen={false}>

                          <PanelRow>
                            <label for="">Label</label>
                            <InputControl
                              value={item.label}
                              onChange={(newVal) => {

                                elements.items[index].label = newVal
                                setAttributes({ elements: { ...elements, items: elements.items } });
                              }}
                            />
                          </PanelRow>



                          <PanelRow>
                            <label for="">URL</label>
                            <InputControl
                              value={item.url}
                              onChange={(newVal) => {

                                elements.items[index].url = newVal
                                setAttributes({ elements: { ...elements, items: elements.items } });

                              }}
                            />
                          </PanelRow>


                          <PanelRow>
                            <label for="">Count</label>
                            <InputControl
                              value={item.count}
                              onChange={(newVal) => {

                                elements.items[index].count = newVal
                                setAttributes({ elements: { ...elements, items: elements.items } });

                              }}
                            />
                          </PanelRow>


                          <PanelRow>
                            <label for="">Choose Icon</label>
                            <PGIconPicker library={item.siteIcon.library} srcType={item.siteIcon.srcType} iconSrc={item.siteIcon.iconSrc} onChange={arg => {


                              //var options = { ...icon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
                              //setAttributes({ icon: { ...icon, options: options } });


                              elements.items[index].siteIcon = { srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc }
                              setAttributes({ elements: { ...elements, items: elements.items } });




                            }} />
                          </PanelRow>



                          <PanelRow className='my-3'>
                            <label>Color</label>
                            <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                          </PanelRow>


                          <ColorPalette
                            value={elements.items[index].styles.color[breakPointX]}
                            colors={colorsPresets}
                            enableAlpha
                            onChange={(newVal) => {

                              var newValuesObj = {};


                              if (Object.keys(elements.items[index].styles.color).length == 0) {
                                newValuesObj[breakPointX] = newVal;
                              } else {
                                newValuesObj = elements.items[index].styles.color;
                                newValuesObj[breakPointX] = newVal;
                              }

                              var styles = { ...elements.items[index].styles, color: newValuesObj };
                              elements.items[index].styles = styles

                              setAttributes({ elements: { ...elements, items: elements.items } });




                            }}
                          />


                          <PanelRow className='my-3'>
                            <label>Background Color</label>
                            <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                          </PanelRow>


                          <ColorPalette
                            value={(elements.items[index].styles.backgroundColor != undefined) ? elements.items[index].styles.backgroundColor[breakPointX] : ''}
                            colors={colorsPresets}
                            enableAlpha
                            onChange={(newVal) => {

                              var newValuesObj = {};

                              if (Object.keys(elements.items[index].styles.backgroundColor).length == 0) {
                                newValuesObj[breakPointX] = newVal;
                              } else {
                                newValuesObj = elements.items[index].styles.backgroundColor;
                                newValuesObj[breakPointX] = newVal;
                              }

                              var styles = { ...elements.items[index].styles, backgroundColor: newValuesObj };
                              elements.items[index].styles = styles

                              setAttributes({ elements: { ...elements, items: elements.items } });







                              // var newValuesObjX = {};
                              // if (blockCssY.items[itemSelector] == undefined) {

                              //   newValuesObjX[itemSelector] = { ...blockCssY.items[itemSelector], 'background-color': newValuesObj };

                              // } else {

                              //   newValuesObjX[itemSelector] = { ...blockCssY.items[itemSelector], 'background-color': newValuesObj };
                              // }


                              //setAttributes({ blockCssY: { items: newValuesObjX } });




                            }}
                          />


                        </PanelBody>






                      </div>
                    ))}
                  </ReactSortable>








                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={elements} onChange={onChangeStyleElements} onAdd={onAddStyleElements} onRemove={onRemoveStyleElements} />
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
                    <label for="">Icon position</label>

                    <SelectControl
                      label=""
                      value={icon.options.position}
                      options={[

                        { label: 'Choose Position', value: '' },

                        { label: 'Before Label', value: 'beforeLabel' },
                        { label: 'After Label', value: 'afterLabel' },
                        // { label: 'Before Count', value: 'beforeCount' },
                        // { label: 'After Count', value: 'afterCount' },


                      ]}
                      onChange={(newVal) => {


                        var options = { ...icon.options, position: newVal };
                        setAttributes({ icon: { ...icon, options: options } });


                      }



                      }
                    />
                  </PanelRow>


                  <ToggleControl
                    className='my-3'
                    label="Display icon?"
                    help={elements.options.showIcon ? 'Icon is displaying' : 'Icon is hidden'}
                    checked={elements.options.showIcon ? true : false}
                    onChange={(e) => {

                      var options = { ...elements.options, showIcon: elements.options.showIcon ? false : true };
                      setAttributes({ elements: { ...elements, options: options } });

                    }}
                  />

                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={icon} onChange={onChangeStyleIcon} onAdd={onAddStyleIcon} onRemove={onRemoveStyleIcon} />
                </PGtab>
              </PGtabs>






            </PanelBody>

            <PanelBody title="Label" initialOpen={false}>



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
                    className='my-3'
                    label="Display label?"
                    help={elements.options.showLabel ? 'Label is displaying' : 'Label is hidden'}
                    checked={elements.options.showLabel ? true : false}
                    onChange={(e) => {

                      var options = { ...elements.options, showLabel: elements.options.showLabel ? false : true };
                      setAttributes({ elements: { ...elements, options: options } });

                    }}
                  />
                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={label} onChange={onChangeStyleLabel} onAdd={onAddStyleLabel} onRemove={onRemoveStyleLabel} />
                </PGtab>
              </PGtabs>






            </PanelBody>

            <PanelBody title="Count" initialOpen={false}>


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
                    className='my-3'
                    label="Display count?"
                    help={elements.options.showCount ? 'Count is displaying' : 'Count is hidden'}
                    checked={elements.options.showCount ? true : false}
                    onChange={(e) => {

                      var options = { ...elements.options, showCount: elements.options.showCount ? false : true };
                      setAttributes({ elements: { ...elements, options: options } });

                    }}
                  />
                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={count} onChange={onChangeStyleCount} onAdd={onAddStyleCount} onRemove={onRemoveStyleCount} />
                </PGtab>
              </PGtabs>



            </PanelBody>



            <PanelBody title="Custom Style" initialOpen={false}>


              <p>Please use following class selector to apply your custom CSS</p>
              <div className='my-3'>
                <p className='font-bold'>Wrapper Selector</p>
                <p><code>{wrapperSelector}{'{/* your CSS here*/}'}</code></p>
              </div>

              <div className='my-3'>
                <p className='font-bold'>Item Selector</p>
                <p><code>{itemSelector}{'{}'} </code></p>
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
              <PGContactSupport utm={{ utm_source: 'BlockPostExcerpt', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />


            </div>
          </div>

        </InspectorControls >



        <div {...blockProps}>


          {elements.items.map((x, index) => {

            return (

              <a onClick={handleLinkClick} className={'media-item item-' + index} href={x.url}>


                {elements.options.showLabel && (
                  <span className='media-label'>{x.label}</span>
                )}



                {elements.options.showIcon && (
                  <span className={`icon ${x.siteIcon.iconSrc}`}></span>
                )}

                {elements.options.showCount && (
                  <span className="media-count">({x.count})</span>
                )}
              </a>
            )

          })}
        </div>
      </>

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})