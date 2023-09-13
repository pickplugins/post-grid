import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover, Spinner, Placeholder } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';
import { applyFilters } from '@wordpress/hooks';

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl, InnerBlocks, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'
import { Icon, styles, settings, link, linkOff, more } from "@wordpress/icons";

import IconToggle from '../../components/icon-toggle'
import Typography from '../../components/typography'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'

import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'
import PGIconPicker from '../../components/icon-picker'
import PGCssLibrary from '../../components/css-library'

var myStore = wp.data.select('postgrid-shop');


registerBlockType("post-grid/tabs-nested-item", {
  apiVersion: 2,
  title: "Tabs Nested Item",
  parent: ['post-grid/tabs-nested'],

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><rect fill="#1d4ed8" y="10.75" width="10.72" height="3.64" /><path fill="#8db1ff" d="M1.94,12.09a.12.12,0,0,1,.08,0l.64.75a.11.11,0,1,1-.17.13l-.55-.65L1.38,13a.11.11,0,0,1-.15,0,.1.1,0,0,1,0-.15l.64-.75A.12.12,0,0,1,1.94,12.09Z" /><rect fill="#8db1ff" x="3.46" y="12.09" width="5.71" height="0.96" /><rect fill="#8db1ff" x="12.64" y="10.75" width="10.72" height="3.64" /><path fill="#1d4ed8" d="M14.58,13.05a.09.09,0,0,1-.08,0l-.64-.74a.11.11,0,1,1,.16-.14l.56.65.56-.65a.11.11,0,1,1,.16.14l-.64.74A.09.09,0,0,1,14.58,13.05Z" /><rect fill="#1d4ed8" x="16.11" y="12.09" width="5.71" height="0.96" /><rect fill="#8db1ff" x="25.28" y="10.75" width="10.72" height="3.64" /><path fill="#1d4ed8" d="M27.22,13.05a.09.09,0,0,1-.08,0l-.64-.74a.11.11,0,0,1,.16-.14l.56.65.56-.65a.11.11,0,1,1,.16.14L27.3,13A.09.09,0,0,1,27.22,13.05Z" /><rect fill="#1d4ed8" x="28.75" y="12.09" width="5.71" height="0.96" /><rect fill="#1d4ed8" y="16.58" width="36" height="8.66" /></svg>


    ,
  },


  attributes: {


    navItem: {
      type: 'object',
      default: {
        options: {
          viewType: 'horizontal', //horizontal, vertical
          class: '',
          activeTab: '',
        },
        styles: {},
      },
    },

    activeNavItem: {
      type: 'object',
      default: {
        options: {
          viewType: 'horizontal', //horizontal, vertical
          class: '',
        },
        styles: {},
      },
    },

    navLabel: {
      type: 'object',
      default: {
        options: {
          viewType: 'horizontal', //horizontal, vertical
          class: '',
        },
        styles: {},
      },
    },

    icon: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-angle-down', position: 'before', /* before, after */ class: 'icon', },

        styles: {},
      },
    },

    iconToggle: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-angle-down', position: 'before', /* before, after */ class: 'icon-toggle', },

        styles: {},
      },
    },


    panelWrap: {
      type: 'object',
      default: {
        options: {
          viewType: 'horizontal', //horizontal, vertical
          position: 'left', // left, right, center
          class: '',
        },
        styles: {},
      },
    },


    activeTab: {
      "type": "string"
    },

    uid: {
      "type": "string"
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


  supports: {
    "align": ["wide", "full"],
  },
  category: "post-grid",


  edit: function (props) {


    var attributes = props.attributes;
    var setAttributes = props.setAttributes;
    var context = props.context;
    var clientId = props.clientId;

    var uid = attributes.uid;
    var activeTab = attributes.activeTab;

    var blockId = attributes.blockId;

    var blockIdX = attributes.blockId ? attributes.blockId : 'pg' + clientId.split('-').pop();
    var blockClass = '.' + blockIdX;

    var navItem = attributes.navItem;
    var panelWrap = attributes.panelWrap;

    var icon = attributes.icon;

    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;
    let isProFeature = applyFilters('isProFeature', true);

    var breakPointX = myStore.getBreakPoint();



    // Wrapper CSS Class Selectors
    var wrapperSelector = blockClass;
    var panelWrapSelector = '.' + blockId + '-pg-tabs-panel';
    var navItemSelector = '.' + blockId + '-nav-item';
    var iconSelector = '.' + blockId + '-nav-icon';



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






    function onChangeStyleNavItem(sudoScource, newVal, attr) {

      console.log(navItemSelector);


      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, navItem);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ navItem: object });




      var elementSelector = myStore.getElementSelector(sudoScource, navItemSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      console.log(cssItems);


      setAttributes({ blockCssY: { items: cssItems } });




    }






    function onRemoveStyleNavItem(sudoScource, key) {


      var object = myStore.deletePropertyDeep(navItem, [sudoScource, key, breakPointX]);
      setAttributes({ navItem: object });


      var elementSelector = myStore.getElementSelector(sudoScource, navItemSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }


    function onAddStyleNavItem(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, navItem);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ navItem: object });

    }




    function onChangeStylePanelWrap(sudoScource, newVal, attr) {




      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, panelWrap);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ panelWrap: object });

      var elementSelector = myStore.getElementSelector(sudoScource, panelWrapSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });
    }






    function onRemoveStylePanelWrap(sudoScource, key) {

      var object = myStore.deletePropertyDeep(panelWrap, [sudoScource, key, breakPointX]);
      setAttributes({ panelWrap: object });

      var elementSelector = myStore.getElementSelector(sudoScource, panelWrapSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });

    }





    function onAddStylePanelWrap(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, panelWrap);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ panelWrap: object });
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




    function onPickCssLibraryNavItem(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        navItem[sudoScource] = sudoScourceArgs;
      })

      var navItemX = Object.assign({}, navItem);
      setAttributes({ navItem: navItemX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, navItemSelector);


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




    function onPickCssLibraryPanelWrap(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        panelWrap[sudoScource] = sudoScourceArgs;
      })

      var panelWrapX = Object.assign({}, panelWrap);
      setAttributes({ panelWrap: panelWrapX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, panelWrapSelector);


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



    const [iconHtml, setIconHtml] = useState('');

    useEffect(() => {

      var iconSrc = icon.options.iconSrc;

      var iconHtml = `<span class="${iconSrc}"></span>`;

      //console.log(iconHtml);


      setIconHtml(iconHtml);




    }, [icon]);



    useEffect(() => {


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);



    const blockProps = useBlockProps();






























    useEffect(() => {
      if (!uid) {
        setAttributes({ uid: clientId });
      }
    }, []);

    const display = activeTab === uid ? 'block' : 'none';




    return (

      <>
        <InspectorControls >
          <div className='px-3' >



            <PanelBody title="Nav Item" initialOpen={false}>


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
                      value={navItem.options.tag}
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

                        var options = { ...navItem.options, tag: newVal };
                        setAttributes({ navItem: { ...navItem, options: options } });

                      }

                      }
                    />
                  </PanelRow>


                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={navItem} onChange={onChangeStyleNavItem} onAdd={onAddStyleNavItem} onRemove={onRemoveStyleNavItem} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={navItem} onChange={onPickCssLibraryNavItem} />
                </PGtab>
              </PGtabs>




            </PanelBody>

            <PanelBody title="Content Wrap" initialOpen={false}>


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
                      value={panelWrap.options.tag}
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

                        var options = { ...panelWrap.options, tag: newVal };
                        setAttributes({ panelWrap: { ...panelWrap, options: options } });

                      }

                      }
                    />
                  </PanelRow>

                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={panelWrap} onChange={onChangeStylePanelWrap} onAdd={onAddStylePanelWrap} onRemove={onRemoveStylePanelWrap} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={panelWrap} onChange={onPickCssLibraryPanelWrap} />
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

                    <PGIconPicker library={icon.options.library} srcType={icon.options.srcType} iconSrc={icon.options.iconSrc} onChange={(arg) => {


                      var options = { ...icon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
                      setAttributes({ icon: { ...icon, options: options } });

                    }} />
                  </PanelRow>



                  <PanelRow>
                    <label for="">Icon position</label>

                    <SelectControl
                      label=""
                      value={icon.options.position}
                      options={[

                        { label: 'Choose Position', value: '' },

                        { label: 'Left', value: 'left' },
                        { label: 'Right', value: 'right' },
                        { label: 'Before', value: 'before' },
                        { label: 'After', value: 'after' },

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


        <div {...useBlockProps({ className: `pg-tabs-panel ${blockId}-pg-tabs-panel ${(activeTab === uid) ? 'pg-tabs-panel-active' : ''}`, 'data-tab-id': uid, style: { display } })}>

          <InnerBlocks renderAppender={() => <InnerBlocks.ButtonBlockAppender />} />

        </div>
      </>


    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file

    var attributes = props.attributes;

    //const blockProps = useBlockProps.save({});
    //const { children, ...innerBlocksProps } = useInnerBlocksProps.save(blockProps);


    return (
      <InnerBlocks.Content />

    );


    //return null;
  }
})