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
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import PGIconPicker from '../../components/icon-picker'

import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'
import PGCssLibrary from '../../components/css-library'


var myStore = wp.data.select('postgrid-shop');


registerBlockType("post-grid/accordion", {
  apiVersion: 2,
  title: "Accordion (OLD)",
  parent: ['post-grid/accordion-nested'],

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:


      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" ><rect fill="#fff" y="6.2" width="36" height="4.21" /><path fill="#C5C5C5" d="M4,8.87a.14.14,0,0,1-.1,0L3.13,8a.12.12,0,0,1,0-.17.12.12,0,0,1,.17,0L4,8.55l.64-.75a.13.13,0,0,1,.18,0A.12.12,0,0,1,4.8,8l-.74.86A.12.12,0,0,1,4,8.87Z" /><rect fill="#C5C5C5" x="6.07" y="7.76" width="17.44" height="1.11" /><rect fill="#C5C5C5" y="16.16" width="36" height="8.66" /><rect fill="#C5C5C5" y="11.18" width="36" height="4.21" /><path fill="#fff" d="M4,12.73a.12.12,0,0,1,.09,0l.74.86a.12.12,0,0,1,0,.17.13.13,0,0,1-.18,0L4,13.05l-.65.75a.12.12,0,0,1-.17,0,.12.12,0,0,1,0-.17l.74-.86A.14.14,0,0,1,4,12.73Z" /><rect fill="#fff" x="6.07" y="12.73" width="17.44" height="1.11" /><rect fill="#fff" y="25.58" width="36" height="4.21" /><path fill="#C5C5C5" d="M4,28.24a.13.13,0,0,1-.1,0l-.74-.86a.14.14,0,0,1,0-.18.12.12,0,0,1,.17,0l.65.75.64-.75a.12.12,0,1,1,.19.16l-.74.86A.11.11,0,0,1,4,28.24Z" /><rect fill="#C5C5C5" x="6.07" y="27.13" width="17.44" height="1.11" /></svg>



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

    //const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    var breakPointX = myStore.getBreakPoint();

    const [isLoading, setisLoading] = useState(false);

    const [isOpen, setisOpen] = useState(false);

    // Wrapper CSS Class Selectors
    var wrapperSelector = blockClass;
    var headerSelector = blockClass + ' .pg-accordion-header';
    var headerActiveSelector = blockClass + ' .pg-accordion-header.active';

    var contentSelector = blockClass + ' .pg-accordion-content .ac-text';
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




    function onChangeStyleHeader(sudoScource, newVal, attr) {


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

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

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


    function onChangeStyleHeaderActive(sudoScource, newVal, attr) {


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







    return (
      <>
        <InspectorControls >
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

                        className={'ac-text'}
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
      </>

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file





    return null;
  }
})