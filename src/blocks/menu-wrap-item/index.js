import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover, Spinner, Placeholder } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';

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


registerBlockType("post-grid/menu-wrap-item", {
  apiVersion: 2,
  title: "Menu Item",

  parent: ['post-grid/menu-wrap'],

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><rect fill="#1d4ed8" y="10.4" width="7.49" height="15.2" /><rect fill="#1d4ed8" x="28.51" y="10.4" width="7.49" height="15.2" /><polygon fill="#1d4ed8" points="25.18 26.5 22.47 26.5 22.47 24.7 23.37 24.7 23.37 23.79 25.18 23.79 25.18 26.5" /><rect fill="#1d4ed8" x="16.51" y="24.69" width="2.98" height="1.81" /><polygon fill="#1d4ed8" points="13.53 26.5 10.82 26.5 10.82 23.79 12.63 23.79 12.63 24.7 13.53 24.7 13.53 26.5" /><rect fill="#1d4ed8" x="10.82" y="16.07" width="1.81" height="3.86" /><polygon fill="#1d4ed8" points="12.63 12.21 10.82 12.21 10.82 9.5 13.53 9.5 13.53 11.3 12.63 11.3 12.63 12.21" /><rect fill="#1d4ed8" x="16.51" y="9.5" width="2.98" height="1.81" /><polygon fill="#1d4ed8" points="25.18 12.21 23.37 12.21 23.37 11.3 22.47 11.3 22.47 9.5 25.18 9.5 25.18 12.21" /><rect fill="#1d4ed8" x="23.37" y="16.07" width="1.81" height="3.86" /></svg>


    ,
  },


  attributes: {


    wrapper: {
      type: 'object',
      default: {
        options: {
          tag: 'li',
          class: 'flex-item-wrap',
          isActive: false,
        },

        styles:
        {

          backgroundColor: { Desktop: '' },


        },
      },
    },

    link: {
      type: 'object',
      default: {
        options: {
          class: '',
          text: '',
          url: '',
        },
        styles:
        {
          backgroundColor: { Desktop: '' },


        },
      },
    },
    subMenuWrap: {
      type: 'object',
      default: {
        options: {
          class: '',
          type: '',
        },
        styles:
        {
          backgroundColor: { Desktop: '' },


        },
      },
    },
    icon: {
      type: 'object',
      default: {
        options: { enable: true, library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-check-circle', position: 'beforeText', /*before, after, prefix, postfix */ class: 'link-icon', },

        styles:
        {
          color: { Desktop: '' },
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

    var wrapper = attributes.wrapper;
    var link = attributes.link;
    var icon = attributes.icon;
    var subMenuWrap = attributes.subMenuWrap;


    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    var postId = context['postId'];
    var postType = context['postType'];

    //const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    var breakPointX = myStore.getBreakPoint();



    // Wrapper CSS Class Selectors
    var wrapperSelector = blockClass;
    var subMenuWrapSelector = blockClass + ' .subMenu';


    useEffect(() => {

      setAttributes({ blockId: blockIdX });
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);


    }, [clientId]);


    useEffect(() => {


      setAttributes({ customCss: customCss });

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);


    function generateElementSudoCss(obj) {

      var stylesObj = {}

      Object.entries(obj).map(args => {


        var sudoSrc = args[0];
        var sudoArgs = args[1];


        if (sudoSrc != 'options') {
          var selector = myStore.getElementSelector(sudoSrc, wrapperSelector);

          //console.log(selector);
          //console.log(sudoArgs);


          Object.entries(args[1]).map(x => {
            var attr = x[0];
            var cssPropty = myStore.cssAttrParse(attr);

            if (stylesObj[selector] == undefined) {
              stylesObj[selector] = {};
            }

            if (stylesObj[selector][cssPropty] == undefined) {
              stylesObj[selector][cssPropty] = {};
            }

            stylesObj[selector][cssPropty] = x[1]
          })




        }

        //console.log(stylesObj);


      })


      var cssItems = { ...blockCssY.items };
      var cssItemsX = { ...cssItems, ...stylesObj }
      //console.log(cssItemsX);

      setAttributes({ blockCssY: { items: cssItemsX } });



    }



    useEffect(() => {

      //console.log(wrapper);

      //setAttributes({ customCss: customCss });

      ///myStore.generateBlockCss(blockCssY.items, blockId, customCss);

      var elementCss = generateElementSudoCss(wrapper);

      //console.log(elementCss);



    }, [wrapper]);




    // var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    // for (var x in breakPoints) {

    //   var item = breakPoints[x];
    //   breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    // }





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

    // 

    function onChangeStyleSubMenuWrap(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, subMenuWrap);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ subMenuWrap: object });




      var elementSelector = myStore.getElementSelector(sudoScource, subMenuWrapSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStyleSubMenuWrap(sudoScource, key) {

      var object = myStore.deletePropertyDeep(subMenuWrap, [sudoScource, key, breakPointX]);
      setAttributes({ subMenuWrap: object });


      var elementSelector = myStore.getElementSelector(sudoScource, subMenuWrapSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }


    function onAddStyleSubMenuWrap(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, subMenuWrap);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ subMenuWrap: object });

    }





    function onBulkAddSubMenuWrap(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, subMenuWrap);
      obj[sudoScource] = cssObj;

      setAttributes({ subMenuWrap: obj });

      var selector = myStore.getElementSelector(sudoScource, subMenuWrapSelector);
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









    const MY_TEMPLATE = [
      //['core/paragraph', { placeholder: '', content: 'Hello Text...' }],

    ];

    const blockProps = useBlockProps({
      className: ` ${blockId} pg-menu-wrap-item ${wrapper.options.isActive ? 'active' : ''}`,
    });

    //const isParentOfSelectedBlock = useSelect((select) => select('core/block-editor').hasSelectedInnerBlock(clientId, true))

    const ALLOWED_BLOCKS = ['post-grid/menu-wrap-item', 'post-grid/flex-wrap', 'post-grid/grid-wrap', 'post-grid/image',];


    const innerBlocksProps = useInnerBlocksProps(blockProps, {
      allowedBlocks: ALLOWED_BLOCKS,
      template: MY_TEMPLATE,
      //orientation: 'horizontal',
      templateInsertUpdatesSelection: true,
      renderAppender: InnerBlocks.ButtonBlockAppender
    });






    return (
      <>

        <InspectorControls className="">
          <div className='px-3' >



            <div className='p-3'>

              <PanelRow className='mb-4'>
                <label for="">Menu Label</label>
                <InputControl
                  className='mr-2'
                  value={link.options.text}
                  onChange={(newVal) => {
                    var options = { ...link.options, text: newVal };
                    setAttributes({ link: { ...link, options: options } });
                  }}
                />
              </PanelRow>


              <PanelRow className='mb-4'>
                <label for="">Menu URL</label>
                <InputControl
                  className='mr-2'
                  value={link.options.url}
                  onChange={(newVal) => {
                    var options = { ...link.options, url: newVal };
                    setAttributes({ link: { ...link, options: options } });
                  }}
                />
              </PanelRow>



              <ToggleControl
                label="Menu Active?"
                help={wrapper.options.isActive ? 'Menu Active' : 'Menu Inactive.'}
                checked={wrapper.options.isActive ? true : false}
                onChange={(e) => {

                  var options = { ...wrapper.options, isActive: wrapper.options.isActive ? false : true };
                  setAttributes({ wrapper: { ...wrapper, options: options } });


                }}
              />


            </div>





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
                  <PGStyles obj={wrapper} onChange={onChangeStyleWrapper} onAdd={onAddStyleWrapper} onRemove={onRemoveStyleWrapper} onBulkAdd={onBulkAddWrapper} />
                </PGtab>
              </PGtabs>
            </PanelBody>



            <PanelBody title="Sub MenuWrap" initialOpen={false}>
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
                  <PGStyles obj={subMenuWrap} onChange={onChangeStyleSubMenuWrap} onAdd={onAddStyleSubMenuWrap} onRemove={onRemoveStyleSubMenuWrap} onBulkAdd={onBulkAddSubMenuWrap} />
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

        <li  {...innerBlocksProps}>

          {link.options.text.length > 0 && (
            <a className='menuLink' href={link.options.url}>{link.options.text}</a>
          )}
          <ul className='subMenu'>{innerBlocksProps.children}</ul>
        </li>
      </>



    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file

    var attributes = props.attributes;
    var wrapper = attributes.wrapper;

    var blockId = attributes.blockId;


    const blockProps = useBlockProps.save({
      className: ` ${blockId} pg-menu-wrap-item`,
    });


    return (
      <InnerBlocks.Content />
    );
  }
})