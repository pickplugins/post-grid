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
import { Icon, styles, settings, link, linkOff } from "@wordpress/icons";

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'



import IconToggle from '../../components/icon-toggle'
import Typography from '../../components/typography'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import PGIconPicker from '../../components/icon-picker'
import PGcssDisplay from '../../components/css-display'

import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'
import PGCssLibrary from '../../components/css-library'

var myStore = wp.data.select('postgrid-shop');


registerBlockType("post-grid/list", {
  apiVersion: 2,
  title: "List",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><rect fill="#1d4ed8" x="12.87" y="5.71" width="23.13" height="2.35" /><polygon fill="#1d4ed8" points="8.41 3.02 3.51 7.93 1.41 5.83 0 7.24 3.51 10.74 9.82 4.43 8.41 3.02" /><rect fill="#1d4ed8" x="12.87" y="16.75" width="23.13" height="2.35" /><rect fill="#1d4ed8" x="12.87" y="27.8" width="23.13" height="2.35" /><path fill="#1d4ed8" d="M0,13.92v8H8v-8Zm1.87,6.14V15.78H6.15v4.28Z" /><path fill="#1d4ed8" d="M0,33H8V25H0Zm6.15-6.16V31.1H1.88V26.82Z" /></svg>




    ,
  },
  deprecated: [
    {
      attributes: {
        items: {
          type: 'array',
          default: [{ text: '', icon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-chevron-right', }, styles: {}, }],
        },

      },


    }

  ],

  attributes: {


    wrapper: {
      type: 'object',
      default: {
        options: {
          tag: 'ul',
          class: '',
        },

        styles:
        {

          color: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
          display: {},

        },
      },
    },




    items: {
      type: 'array',
      default: [{ text: '', icon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-chevron-right', }, styles: {}, }],
    },

    itemsX: {
      type: 'object',
      default: {
        items: [],
      },
    },

    item: {
      type: 'object',
      default: {
        options: {
          text: '',
          tag: 'li',
          counter: false,
          reversed: false,
          start: 1,
          type: '1',

          class: 'item',


        },

        styles:
        {

          color: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
          display: { Desktop: '' },


        },
      },
    },



    icon: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-chevron-right', class: 'icon', positon: 'before', },

        styles:
        {
          color: { Desktop: '' },
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

    var itemsX = attributes.itemsX;
    var wrapper = attributes.wrapper;
    var item = attributes.item;
    var items = attributes.items;




    var icon = attributes.icon;

    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    var postId = context['postId'];
    var postType = context['postType'];

    //const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    var breakPointX = myStore.getBreakPoint();

    const [isLoading, setisLoading] = useState(false);

    const [isOpen, setisOpen] = useState(false);


    // Wrapper CSS Class Selectors
    var wrapperSelector = blockClass;
    var itemSelector = blockClass + ' .item';
    const iconSelector = blockClass + ' .icon';

    const CustomTag = `${wrapper.options.tag}`;
    const CustomTagItem = `${item.options.tag}`;



    useEffect(() => {

      setAttributes({ blockId: blockIdX });

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);

      console.log(itemsX);

      if (items.length > 0) {

        if (itemsX.items.length == 0) {
          setAttributes({ itemsX: { ...itemsX, items: items } });

        }

      }



    }, [clientId]);


    useEffect(() => {


      setAttributes({ customCss: customCss });


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);


    // var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    // for (var x in breakPoints) {

    //   var itemX = breakPoints[x];
    //   breakPointList.push({ label: itemX.name, icon: itemX.icon, value: itemX.id })

    // }



    const [iconHtml, setIconHtml] = useState('');

    useEffect(() => {

      var iconSrc = icon.options.iconSrc;
      var iconHtml = `<span class="${iconSrc}"></span>`;

      setIconHtml(iconHtml);
    }, [icon]);








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




    function onPickCssLibraryItem(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        item[sudoScource] = sudoScourceArgs;
      })

      var itemX = Object.assign({}, item);
      setAttributes({ item: itemX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, itemSelector);


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







    function onChangeStyleWrapper(sudoScource, newVal, attr) {

      var path = sudoScource + '.' + attr + '.' + breakPointX
      let obj = Object.assign({}, wrapper);
      const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      setAttributes({ wrapper: updatedObj });
      var sudoScourceX = { ...updatedObj[sudoScource] }


      var elementSelector = myStore.getElementSelector(sudoScource, wrapperSelector);


      sudoScourceX[attr][breakPointX] = newVal;

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {
        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[elementSelector][argAttr] = argAttrVal;
      })

      setAttributes({ blockCssY: { items: blockCssY.items } });
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



    function onChangeStyleItem(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, item);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ item: object });

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


    function onRemoveStyleItem(sudoScource, key) {

      var object = myStore.deletePropertyDeep(item, [sudoScource, key, breakPointX]);
      setAttributes({ item: object });

      var elementSelector = myStore.getElementSelector(sudoScource, itemSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });





    }


    function onAddStyleItem(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, item);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ item: object });







    }




    function onChangeStyleIcon(sudoScource, newVal, attr) {


      var path = sudoScource + '.' + attr + '.' + breakPointX
      let obj = Object.assign({}, icon);
      const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      setAttributes({ icon: updatedObj });
      var sudoScourceX = { ...updatedObj[sudoScource] }


      var elementSelector = myStore.getElementSelector(sudoScource, iconSelector);


      sudoScourceX[attr][breakPointX] = newVal;

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {
        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[elementSelector][argAttr] = argAttrVal;
      })

      setAttributes({ blockCssY: { items: blockCssY.items } });











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

    function onBulkAddItems(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, items);
      obj[sudoScource] = cssObj;

      setAttributes({ items: obj });

      var selector = myStore.getElementSelector(sudoScource, itemsSelector);
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







    useEffect(() => {


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);






    const blockProps = useBlockProps({
      className: ` ${blockId} pg-list`,

    });




    return (
      <>

        <InspectorControls >
          <div>

            <div className='bg-blue-500 p-2 mx-3 px-5 text-white my-4 text-center cursor-pointer' onClick={ev => {
              var itemsZ = { ...itemsX };
              var itemx = itemsZ.items.concat({ text: '', icon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-chevron-right', }, styles: {}, });
              setAttributes({ itemsX: { ...itemsX, items: itemx } });
            }}>Add List Item</div>



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

                        { label: 'Ul', value: 'ul' },
                        { label: 'Ol', value: 'ol' },
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
                  <PGStyles obj={wrapper} onChange={onChangeStyleWrapper} onAdd={onAddStyleWrapper} onBulkAdd={onBulkAddWrapper} onRemove={onRemoveStyleWrapper} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={wrapper} onChange={onPickCssLibraryWrapper} />
                </PGtab>
              </PGtabs>


            </PanelBody>

            <PanelBody title="Items" initialOpen={false}>


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
                      value={item.options.tag}
                      options={[
                        { label: 'Choose', value: '' },

                        { label: 'li', value: 'li' },
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

                        var options = { ...item.options, tag: newVal };
                        setAttributes({ item: { ...item, options: options } });

                      }

                      }
                    />
                  </PanelRow>

                  {wrapper.options.tag == 'ol' && (

                    <>

                      <ToggleControl
                        label="Reversed?"
                        help={item.options.reversed ? 'Counter reversed?' : 'No reversed'}
                        checked={item.options.reversed ? true : false}
                        onChange={(e) => {



                          var options = { ...item.options, reversed: item.options.reversed ? false : true };
                          setAttributes({ item: { ...item, options: options } });



                        }}
                      />




                      <PanelRow>
                        <label for="">Counter start with</label>

                        <InputControl
                          value={item.options.start}
                          onChange={(newVal) => {
                            var options = { ...item.options, start: newVal };
                            setAttributes({ item: { ...item, options: options } });

                          }
                          }
                        />
                      </PanelRow>


                      <PanelRow>
                        <label for="">Ordered list type?</label>

                        <SelectControl
                          label=""
                          value={item.options.type}
                          options={[
                            { label: 'Choose', value: '' },
                            { label: 'Decimal numbers (1, 2, 3, 4)', value: '1' },
                            { label: 'Alphabetically ordered list', value: 'a' },
                            { label: 'Alphabetically ordered list, uppercase', value: 'A' },
                            { label: 'Roman numbers, lowercase (i, ii, iii, iv)', value: 'i' },
                            { label: 'Roman numbers, uppercase (I, II, III, IV)', value: 'I' },
                          ]}
                          onChange={(newVal) => {

                            var options = { ...item.options, type: newVal };
                            setAttributes({ item: { ...item, options: options } });

                          }

                          }
                        />
                      </PanelRow>


                    </>
                  )}





                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={item} onChange={onChangeStyleItem} onAdd={onAddStyleItem} onBulkAdd={onBulkAddItems} onRemove={onRemoveStyleItem} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={item} onChange={onPickCssLibraryItem} />
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
                        { label: 'Choose...', value: '' },
                        { label: 'Before Text', value: 'before' },
                        { label: 'After Text', value: 'after' },
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
                  <PGStyles obj={icon} onChange={onChangeStyleIcon} onAdd={onAddStyleIcon} onBulkAdd={onBulkAddIcon} onRemove={onRemoveStyleIcon} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={icon} onChange={onPickCssLibraryIcon} />
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

            <div className='px-3'>
              <PGMailSubsctibe />
              <PGContactSupport utm={{ utm_source: 'BlockText', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />
            </div>


          </div>






        </InspectorControls >



        <>



          {wrapper.options.tag && (

            <CustomTag {...blockProps}
              reversed={item.options.reversed ? 'reversed' : ''}
              start={item.options.start}
            >
              {itemsX.items != undefined && itemsX.items.map((itemX, i) => {
                return (
                  <>
                    <CustomTagItem className={` ${item.options.class}`} onClick={ev => {

                      var ssdsd = itemsX.items.concat([]);

                      // setAttributes({ items: { items: ssdsd } });
                      setAttributes({ itemsX: { ...itemsX, items: ssdsd } });

                    }}>



                      {icon.options.position == 'before' && (
                        <span className='icon' dangerouslySetInnerHTML={{ __html: iconHtml }} />
                      )}

                      <RichText
                        tagName='div'
                        className='inline-block'

                        value={itemX.text}
                        allowedFormats={['core/bold', 'core/italic', 'core/link']}

                        onSplit={(value, isAfterOriginal) => {
                          createBlock('core/paragraph', { content: value })
                        }

                        }


                        onChange={(content) => {

                          var itemsZ = { ...itemsX };
                          var item = { ...itemsZ.items[i], text: content };
                          itemsZ.items[i] = item;

                          setAttributes({ itemsX: { ...itemsX, items: itemsZ.items } });

                        }}
                        placeholder={__('Start Writing...')}
                      />

                      {icon.options.position == 'after' && (
                        <span className='icon' dangerouslySetInnerHTML={{ __html: iconHtml }} />
                      )}





                      <span className='text-lg cursor-pointer px-2 text-red-500  py-1 float-right icon-close'
                        onClick={(ev) => {
                          itemsX.items.splice(i, 1);
                          var ssdsd = itemsX.items.concat([]);

                          //setAttributes({ items: { items: ssdsd } })
                          setAttributes({ itemsX: { ...itemsX, items: ssdsd } });
                          ev.preventDefault();
                        }}
                      ></span>
                    </CustomTagItem>

                  </>

                )

              })}

            </CustomTag>
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