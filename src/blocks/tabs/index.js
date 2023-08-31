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
import PGcssCursor from '../../components/css-cursor'
import PGcssTextAlign from '../../components/css-text-align'

import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'
import PGCssLibrary from '../../components/css-library'

var myStore = wp.data.select('postgrid-shop');


registerBlockType("post-grid/tabs", {
  apiVersion: 2,
  title: "Tabs",
  parent: ['post-grid/accordion-nested'],

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:


      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.3872 3.62674H3.62677C2.66363 3.62674 1.87561 4.41476 1.87561 5.3779V17.636C1.87561 18.5991 2.66363 19.3872 3.62677 19.3872H19.3872C20.3503 19.3872 21.1383 18.5991 21.1383 17.636V5.3779C21.1383 4.41476 20.3503 3.62674 19.3872 3.62674ZM18.5116 17.636H4.50235C4.02078 17.636 3.62677 17.242 3.62677 16.7604V6.25348C3.62677 5.77191 4.02078 5.3779 4.50235 5.3779H12.3826V8.00463C12.3826 8.4862 12.7766 8.88021 13.2581 8.88021H19.3872V16.7604C19.3872 17.242 18.9932 17.636 18.5116 17.636Z" />
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
          class: 'tab-nav ',


        },

        styles:
        {
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },

          cursor: {},
          borderRadius: {},

          fontSize: { Desktop: '' },


        },
      },
    },
    headerActive: {
      type: 'object',
      default: {
        options: {
          text: 'What is Lorem Ipsum?',
          tag: 'div',
          class: 'tab-nav ',
          activeIndex: 0,


        },

        styles:
        {
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          fontSize: { Desktop: '' },

        },
      },
    },


    headerWrap: {
      type: 'object',
      default: {
        options: {
          tag: 'div',
          class: 'tabs-navs ',

        },

        styles:
        {
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          fontSize: { Desktop: '' },


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
          fontSize: { Desktop: '' },


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
          lineHeight: {},
          fontWeight: { "Desktop": "700" },
          textDecoration: {}, //overline, line-through, underline
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
    var headerWrap = attributes.headerWrap;

    var header = attributes.header;
    var headerActive = attributes.headerActive;

    var content = attributes.content;
    var icon = attributes.icon;
    var iconToggle = attributes.iconToggle;

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
    var headerWrapSelector = blockClass + ' .tabs-navs';

    var headerSelector = blockClass + ' .tab-nav';
    var headerActiveSelector = blockClass + ' .tab-nav.active';

    var contentSelector = blockClass + ' .pg-accordion-content';
    const iconSelector = blockClass + ' .icon-wrap';


    useEffect(() => {

      setAttributes({ blockId: blockIdX });

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [clientId]);


    useEffect(() => {


      setAttributes({ customCss: customCss });


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);


    // var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    // for (var x in breakPoints) {

    //   var item = breakPoints[x];
    //   breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    // }



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






    function onPickCssLibraryHeader(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        header[sudoScource] = sudoScourceArgs;
      })

      var headerX = Object.assign({}, header);
      setAttributes({ header: headerX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, headerSelector);


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




    function onPickCssLibraryContent(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        content[sudoScource] = sudoScourceArgs;
      })

      var contentX = Object.assign({}, content);
      setAttributes({ content: contentX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, contentSelector);


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
























    function onChangeStyleHeaderWrap(sudoScource, newVal, attr) {





      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, headerWrap);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ headerWrap: object });




      var elementSelector = myStore.getElementSelector(sudoScource, headerWrapSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });






    }






    function onRemoveStyleHeaderWrap(sudoScource, key) {

      var object = myStore.deletePropertyDeep(headerWrap, [sudoScource, key, breakPointX]);
      setAttributes({ headerWrap: object });


      var elementSelector = myStore.getElementSelector(sudoScource, headerWrapSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }





    function onAddStyleHeaderWrap(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, headerWrap);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ headerWrap: object });



    }




    function onChangeStyleHeader(sudoScource, newVal, attr) {





      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, header);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ header: object });




      var elementSelector = myStore.getElementSelector(sudoScource, headerSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });









    }






    function onRemoveStyleHeader(sudoScource, key) {


      var object = myStore.deletePropertyDeep(header, [sudoScource, key, breakPointX]);
      setAttributes({ header: object });


      var elementSelector = myStore.getElementSelector(sudoScource, headerSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });

    }





    function onAddStyleHeader(sudoScource, key) {



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

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }






    function onRemoveStyleContent(sudoScource, key) {



      var object = myStore.deletePropertyDeep(content, [sudoScource, key, breakPointX]);
      setAttributes({ content: object });


      var elementSelector = myStore.getElementSelector(sudoScource, contentSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }





    function onAddStyleContent(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, content);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ content: object });
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


    function onChangeStyleHeaderActive(sudoScource, newVal, attr) {




      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, headerActive);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ headerActive: object });




      var elementSelector = myStore.getElementSelector(sudoScource, headerActiveSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });











    }


    function onRemoveStyleHeaderActive(sudoScource, key) {


      var object = myStore.deletePropertyDeep(headerActive, [sudoScource, key, breakPointX]);
      setAttributes({ headerActive: object });


      var elementSelector = myStore.getElementSelector(sudoScource, headerActiveSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }


    function onAddStyleHeaderActive(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, headerActive);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ headerActive: object });

    }

























    useEffect(() => {


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);































    const blockProps = useBlockProps({
      className: ` ${blockId} pg-tabs`,

    });



    return (



      <>

        <BlockControls >
          <AlignmentToolbar
            value={wrapper.styles.textAlign}
            onChange={(newVal) => {


              var newValuesObj = {};


              if (Object.keys(wrapper.styles.textAlign).length == 0) {
                newValuesObj[breakPointX] = newVal;
              } else {
                newValuesObj = wrapper.styles.textAlign;
                newValuesObj[breakPointX] = newVal;
              }


              var styles = { ...wrapper.styles, textAlign: newValuesObj };
              setAttributes({ wrapper: { ...wrapper, styles: styles } });




              var itemsX = { ...blockCssY.items };
              itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'text-align': newValuesObj };

              setAttributes({ blockCssY: { items: itemsX } });






            }}
          />







        </BlockControls>


        <InspectorControls >
          <div className='px-2' title="header" initialOpen={false}>

            <PanelBody title="Navs Wrap" initialOpen={false}>



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
                  <PGStyles obj={headerWrap} onChange={onChangeStyleHeaderWrap} onAdd={onAddStyleHeaderWrap} onRemove={onRemoveStyleHeaderWrap} />
                </PGtab>
              </PGtabs>






            </PanelBody>
            <PanelBody title="Navs" initialOpen={false}>


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
                      value={header.options.tag}
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

                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={header} onChange={onPickCssLibraryHeader} />
                </PGtab>
              </PGtabs>








            </PanelBody>

            <PanelBody title="Navs - Active" initialOpen={false}>


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
                      value={content.options.tag}
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
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={content} onChange={onPickCssLibraryContent} />
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
                    <label for="">Choose Toggled Icon</label>

                    <PGIconPicker library={iconToggle.options.library} srcType={iconToggle.options.srcType} iconSrc={iconToggle.options.iconSrc} onChange={onChangeIconToggle} />
                  </PanelRow>


                  <PanelRow>
                    <label for="">Icon postion</label>

                    <SelectControl
                      label=""
                      value={icon.options.position}
                      options={[

                        { label: 'Choose Position', value: '' },
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
                  <PGStyles obj={wrapper} onChange={onChangeStyleIcon} onAdd={onAddStyleIcon} onRemove={onRemoveStyleIcon} />
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

            <div className='px-2'>
              <PGMailSubsctibe />
              <PGContactSupport utm={{ utm_source: 'BlockText', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />
            </div>


          </div>

        </InspectorControls >


        <>

          <div {...blockProps}>

            <div className='bg-blue-500 p-2 px-5 text-white text-center my-4 cursor-pointer' onClick={ev => {

              var itemx = items.concat({ isActive: false, headerText: 'What is Lorem Ipsum?', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', icon: '', iconToggle: '', styles: {}, });

              setAttributes({ items: itemx });


            }}>Add</div>

            <div className={headerWrap.options.class}
            >
              {items.map((item, i) => {

                return (

                  <>

                    <div className={`inline-block cursor-pointer ${(headerActive.options.activeIndex == i) ? 'active' : ''} ${header.options.class}`} onClick={ev => {


                      var options = { ...headerActive.options, activeIndex: i };
                      setAttributes({ headerActive: { ...headerActive, options: options } });

                    }}>


                      {icon.options.position == 'beforeHeader' && (
                        <>

                          {icon.options.enableToggle == 'yes' && (

                            <>
                              {headerActive.options.activeIndex != i && (
                                <span className='icon-wrap ' dangerouslySetInnerHTML={{ __html: iconHtml }} />)}
                              {headerActive.options.activeIndex == i && (
                                <span className='icon-wrap ' dangerouslySetInnerHTML={{ __html: iconToggleHtml }} />
                              )}
                            </>
                          )}


                          {icon.options.enableToggle == 'no' && (
                            <span className='icon-wrap ' dangerouslySetInnerHTML={{ __html: iconHtml }} />
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
                              {headerActive.options.activeIndex != i && (
                                <span className='icon-wrap float-right' dangerouslySetInnerHTML={{ __html: iconHtml }} />)}
                              {headerActive.options.activeIndex == i && (
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




                  </>

                )

              })}
            </div>





            {items.map((item, i) => {

              return (

                <>



                  {headerActive.options.activeIndex == i && (
                    <RichText
                      className={content.options.class}

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

                  )}



                </>

              )

            })}











          </div>


        </>
      </>

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;


    //return null;
  }
})