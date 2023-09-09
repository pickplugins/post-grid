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

import { applyFilters } from '@wordpress/hooks';

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
import PGCssLibrary from '../../components/css-library'

import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'


var myStore = wp.data.select('postgrid-shop');




registerBlockType("post-grid/woo-dimensions", {
  apiVersion: 2,
  title: "Woo Dimensions",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path fill="#1d4ed8" d="M17.55,18a.71.71,0,0,1-.24.53L12.45,22.7a.7.7,0,0,1-.91-1.06L15.79,18l-4.25-3.64a.7.7,0,0,1,.91-1.06l4.86,4.17A.71.71,0,0,1,17.55,18Z" /><path fill="#1d4ed8" d="M36,18a.69.69,0,0,1-.25.53L30.89,22.7a.7.7,0,1,1-.9-1.06L34.23,18,30,14.36a.7.7,0,1,1,.9-1.06l4.86,4.17A.69.69,0,0,1,36,18Z" /><rect fill="#1d4ed8" y="15.5" width="10.66" height="5" /><rect fill="#8db1ff" x="2.49" y="17.34" width="5.68" height="1.32" /><rect fill="#1d4ed8" x="19.08" y="15.5" width="10.66" height="5" /><rect fill="#8db1ff" x="21.57" y="17.34" width="5.68" height="1.32" /></svg>
    ,
  },


  attributes: {
    wrapper: {
      type: 'object',
      default: {
        options: { tag: 'ul', class: '', },
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
        options: { class: 'icon', position: 'beforePrefix'/*beforePrefix, afterPrefix, */ },
        styles:
        {
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
    postfix: {
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

    itemInfo: {
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


    items: {
      "type": "object",
      "default": {
        options: {
          linkTarget: '_blank', showIcon: false, iconPositon: 'beforePrefix', // beforePrefix, afterPrefix, 
          tag: 'li',
        },
        styles: {

          color: { Desktop: '#18978F' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
          borderRadius: { Desktop: '' },
          fontSize: { Desktop: '' },


        },
        elements: [

          {
            id: 'text', label: 'Text', prefix: '', postfix: '', value: '',

            siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
            options: {
              text: 'You are here: ',

            },
            styles: {
              color: { Desktop: '' },
              backgroundColor: { Desktop: '' },
              padding: { Desktop: '' },
              margin: { Desktop: '' },
            },

          },


          {
            id: 'weight', label: 'Weight', prefix: '', postfix: '', value: '10kg',

            siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
            options: {

            },
            styles: {

              color: { Desktop: '' },
              backgroundColor: { Desktop: '' },
              padding: { Desktop: '' },
              margin: { Desktop: '' },
            },

          },

          {
            id: 'length', label: 'Length', prefix: '', postfix: '', value: '10cm',
            siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
            options: {

            },
            styles: {

              color: { Desktop: '' },
              backgroundColor: { Desktop: '' },
              padding: { Desktop: '' },
              margin: { Desktop: '' },
            },

          },

          {
            id: 'width', label: 'Width', prefix: '', postfix: '', value: '10cm',
            siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
            options: {

            },
            styles: {

              color: { Desktop: '' },
              backgroundColor: { Desktop: '' },
              padding: { Desktop: '' },
              margin: { Desktop: '' },
            },

          },
          {
            id: 'height', label: 'Height', prefix: '', postfix: '', value: '10cm',

            siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
            options: {

            },
            styles: {

              color: { Desktop: '' },
              backgroundColor: { Desktop: '' },
              padding: { Desktop: '' },
              margin: { Desktop: '' },
            },

          },

          {
            id: 'dimensions', label: 'Dimensions', prefix: '', postfix: '', value: '10cm X 10cm X 10cm',
            siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
            options: {

            },
            styles: {

              color: { Desktop: '' },
              backgroundColor: { Desktop: '' },
              padding: { Desktop: '' },
              margin: { Desktop: '' },
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
    var items = attributes.items;
    var icon = attributes.icon;
    var postfix = attributes.postfix;
    var prefix = attributes.prefix;
    var itemInfo = attributes.itemInfo;


    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    var postId = context['postId'];
    var postType = context['postType'];




    var wrapperSelector = blockClass;
    // Wrapper CSS Class Selectors
    var itemSelector = blockClass + ' .item';
    var itemLinkSelector = blockClass + ' .item a';

    var iconSelector = blockClass + ' .item .icon';
    var prefixSelector = blockClass + ' .item .prefix';
    var postfixSelector = blockClass + ' .item .postfix';


    var [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    const [productData, setproductData] = useState(null);

    const [loading, setloading] = useState(false);


    const CustomTagWrapper = `${wrapper.options.tag}`;
    const CustomTagPostTitle = (items.options.tag.length != 0) ? `${items.options.tag}` : 'div';



    var elementsArgsBase = [


      {
        id: 'text', label: 'Text', prefix: '', postfix: '', value: '',

        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {
          text: 'You are here: ',

        },
        styles: {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },

      },


      {
        id: 'weight', label: 'Weight', prefix: 'Weight: ', postfix: '', value: '10kg',

        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {

        },
        styles: {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },

      },

      {
        id: 'length', label: 'Length', prefix: 'Length: ', postfix: '', value: '10cm',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {

        },
        styles: {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },

      },

      {
        id: 'width', label: 'Width', prefix: 'Width: ', postfix: '', value: '10cm',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {

        },
        styles: {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },

      },
      {
        id: 'height', label: 'Height', prefix: 'Height: ', postfix: '', value: '10cm',

        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {

        },
        styles: {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },

      },

      {
        id: 'dimensions', label: 'Dimensions', prefix: 'Dimensions: ', postfix: '', value: '10cm X 10cm X 10cm',
        siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
        options: {

        },
        styles: {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },

      },





    ]
    //let elementsArgs = applyFilters('elementsArgs', elementsArgsBase);
    var [elementsArgs, setelementsArgs] = useState(elementsArgsBase);


    var [
      currentPostUrl,
      setCurrentPostUrl,
    ] = useEntityProp('postType', postType, 'link', postId);



    useEffect(() => {
      setloading(true)

      apiFetch({
        path: '/post-grid/v2/get_post_data',
        method: 'POST',
        data: { postId: postId },
      }).then((res) => {

        console.log(res)
        setproductData(res)



        var attributes = res.attributes;

        console.log(attributes);

        Object.entries(attributes).map(item => {

          var index = item[0];
          var value = item[1];


          elementsArgs.push(

            {
              id: index, label: value.label, prefix: value.label + ': ', postfix: '', value: value.values,
              siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: '', },
              options: {

              },
              styles: {

                color: { Desktop: '' },
                backgroundColor: { Desktop: '' },
                padding: { Desktop: '' },
                margin: { Desktop: '' },
              },

            }
          );

        })

        setelementsArgs(elementsArgs);

        setloading(false)

      });

    }, []);




    useEffect(() => {

      setAttributes({ blockId: blockIdX });
      ;
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);


      // blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'font-size': { "Desktop": "16px" } };

      // blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'display': { "Desktop": "inline-block" } };

      // blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'list-style': { "Desktop": "none" } };

      // blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-right': { "Desktop": "10px" } };
      // setAttributes({ blockCssY: { items: blockCssY.items } });








    }, [clientId]);



    useEffect(() => {




      items.elements.map((x, index) => {

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


            if (blockCssY.items[itemSelector + '.item-' + index + ' a'] == undefined) {
              blockCssY.items[itemSelector + '.item-' + index + ' a'] = {}
              blockCssY.items[itemSelector + '.item-' + index + ' a'][attrIdX] = attrVal;
            } else {
              blockCssY.items[itemSelector + '.item-' + index + ' a'][attrIdX] = attrVal;
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


    }, [items]);





    //let elementsArgs = elementsArgsBase
    let isProFeature = applyFilters('isProFeature', true);


    function addMedia(option, index) {

      //var isExist = items.elements.find(x => x.label === option.label);


      //if (isExist == undefined) {


      //}

      var elementsX = items.elements.push(option);
      setAttributes({ items: { ...items, elements: items.elements } });

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




    function onChangeStyleItems(sudoScource, newVal, attr) {


      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, items);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ items: object });

      var elementSelector = myStore.getElementSelector(sudoScource, itemSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });




    }






    function onRemoveStyleItems(sudoScource, key) {



      var object = myStore.deletePropertyDeep(items, [sudoScource, key, breakPointX]);
      setAttributes({ items: object });

      var elementSelector = myStore.getElementSelector(sudoScource, itemSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }





    function onAddStyleItems(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, items);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ items: object });


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








    useEffect(() => {


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);






    function onChangeBreakPoint(x, index) {


      var asdsdsd = wp.data.dispatch('postgrid-shop').setBreakPoint(x.value)

      asdsdsd.then((res) => {

        setBreakPointX(res.breakpoint);

        myStore.generateBlockCss(blockCssY.items, blockId, customCss);
      });



    }


    const blockProps = useBlockProps({
      className: ` ${blockId} pg-breadcrumb`,

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
                        { label: 'UL', value: 'ul' },
                        { label: 'OL', value: 'ol' },


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


                  <PanelRow>
                    <label for="">Wrapper Tag</label>

                    <SelectControl
                      label=""
                      value={items.options.tag}
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
                        { label: 'UL', value: 'ul' },
                        { label: 'OL', value: 'ol' },
                        { label: 'LI', value: 'li' },


                      ]}
                      onChange={(newVal) => {

                        var options = { ...items.options, tag: newVal };
                        setAttributes({ items: { ...items, options: options } });
                      }

                      }
                    />
                  </PanelRow>


                  <div className='my-4'>
                    <PanelRow>
                      <label for="">Add Element</label>
                      <PGDropdown position="bottom right" variant="secondary" options={elementsArgs} buttonTitle="Choose" onChange={addMedia} values=""></PGDropdown>
                    </PanelRow>
                  </div>




                  <ReactSortable list={items.elements} handle={'.handle'} setList={(item) => {


                    setAttributes({ items: { ...items, items: item } });


                  }}>
                    {items.elements.map((item, index) => (
                      <div key={item.id} className="">

                        <PanelBody title={
                          <>
                            <span className='cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1' onClick={ev => {
                              var elementsX = items.elements.splice(index, 1);
                              setAttributes({ items: { ...items, elements: items.elements } });

                            }}><Icon icon={close} /></span>
                            <span className='handle cursor-pointer hover:bg-blue-500 hover:text-white px-1 py-1'><Icon icon={menu} /></span>


                            <span className='mx-2'>{item.label}</span>

                          </>

                        } initialOpen={false}>

                          <div>
                            <label for="">Prefix</label>
                            <InputControl
                              value={item.prefix}
                              placeholder=""
                              onChange={(newVal) => {
                                items.elements[index].prefix = newVal
                                setAttributes({ items: { ...items, elements: items.elements } });
                              }}
                            />
                          </div>

                          {item.id == 'text' && (
                            <div>
                              <label for="">Value</label>
                              <InputControl
                                value={item.value}
                                placeholder=""
                                onChange={(newVal) => {
                                  items.elements[index].value = newVal
                                  setAttributes({ items: { ...items, elements: items.elements } });
                                }}
                              />
                            </div>
                          )}


                          <div>
                            <label for="">Postfix</label>
                            <InputControl
                              value={item.postfix}
                              placeholder=""
                              onChange={(newVal) => {

                                items.elements[index].postfix = newVal
                                setAttributes({ items: { ...items, elements: items.elements } });
                              }}
                            />
                          </div>


                          <PanelRow>
                            <label for="">Choose Icon</label>
                            <PGIconPicker library={item.siteIcon.library} srcType={item.siteIcon.srcType} iconSrc={item.siteIcon.iconSrc} onChange={arg => {


                              //var options = { ...icon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
                              //setAttributes({ icon: { ...icon, options: options } });


                              items.elements[index].siteIcon = { srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc }
                              setAttributes({ items: { ...items, elements: items.elements } });




                            }} />
                          </PanelRow>



                          <PanelRow className='my-3'>
                            <label>Color</label>
                            <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                          </PanelRow>


                          <ColorPalette
                            value={(items.elements[index].styles.color == undefined) ? '' : items.elements[index].styles.color[breakPointX]}
                            colors={colorsPresets}
                            enableAlpha
                            onChange={(newVal) => {

                              var newValuesObj = {};


                              if (Object.keys(items.elements[index].styles.color).length == 0) {
                                newValuesObj[breakPointX] = newVal;
                              } else {
                                newValuesObj = items.elements[index].styles.color;
                                newValuesObj[breakPointX] = newVal;
                              }

                              var styles = { ...items.elements[index].styles, color: newValuesObj };
                              items.elements[index].styles = styles

                              setAttributes({ items: { ...items, elements: items.elements } });




                            }}
                          />


                          <PanelRow className='my-3'>
                            <label>Background Color</label>
                            <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                          </PanelRow>


                          <ColorPalette
                            value={(items.elements[index].styles.backgroundColor == undefined) ? '' : items.elements[index].styles.backgroundColor[breakPointX]}
                            colors={colorsPresets}
                            enableAlpha
                            onChange={(newVal) => {

                              var newValuesObj = {};

                              if (Object.keys(items.elements[index].styles.backgroundColor).length == 0) {
                                newValuesObj[breakPointX] = newVal;
                              } else {
                                newValuesObj = items.elements[index].styles.backgroundColor;
                                newValuesObj[breakPointX] = newVal;
                              }

                              var styles = { ...items.elements[index].styles, backgroundColor: newValuesObj };
                              items.elements[index].styles = styles

                              setAttributes({ items: { ...items, elements: items.elements } });


                            }}
                          />


                        </PanelBody>






                      </div>
                    ))}
                  </ReactSortable>











                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={items} onChange={onChangeStyleItems} onAdd={onAddStyleItems} onRemove={onRemoveStyleItems} />
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

                        { label: 'Before Prefix', value: 'beforePrefix' },
                        { label: 'After Prefix', value: 'afterPrefix' },
                        { label: 'Before Postfix', value: 'beforePostfix' },
                        { label: 'After Postfix', value: 'beforePostfix' },

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


        <CustomTagWrapper {...blockProps}>



          {items.elements.map((x, index) => {

            return (
              <CustomTagPostTitle className={'item item-' + index}>


                {icon.options.position == 'beforePrefix' && (
                  <span className={`icon ${x.siteIcon.iconSrc}`}></span>
                )}
                {x.prefix.length > 0 && (
                  <span className='prefix'>{x.prefix}</span>
                )}
                {icon.options.position == 'afterPrefix' && (
                  <span className={`icon ${x.siteIcon.iconSrc}`}></span>
                )}


                {productData != null && (

                  <>

                    {x.id == 'weight' && (
                      <span className='value'>{productData.weight}kg</span>
                    )}
                    {x.id == 'length' && (
                      <span className='value'>{productData.length}cm</span>
                    )}
                    {x.id == 'width' && (
                      <span className='value'>{productData.width}cm</span>
                    )}
                    {x.id == 'height' && (
                      <span className='value'>{productData.height}cm</span>
                    )}
                    {x.id == 'dimensions' && (
                      <span className='value' dangerouslySetInnerHTML={{ __html: productData.dimensions + 'cm' }}></span>
                    )}
                  </>

                )}









                {icon.options.position == 'beforePostfix' && (
                  <span className={`icon ${x.siteIcon.iconSrc}`}></span>
                )}

                {x.postfix.length > 0 && (
                  <span className='postfix'>{x.postfix}</span>
                )}
                {icon.options.position == 'afterPostfix' && (
                  <span className={`icon ${x.siteIcon.iconSrc}`}></span>
                )}





              </CustomTagPostTitle>
            )
          })}

        </CustomTagWrapper>
      </>

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})