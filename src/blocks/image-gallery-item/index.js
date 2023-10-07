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


registerBlockType("post-grid/image-gallery-item", {
  apiVersion: 2,
  title: "Image Gallery Item",

  parent: ['post-grid/image-gallery'],

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:

      <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><polygon fill="#1d4ed8" points="14.58 11.45 13.45 11.45 13.45 9.46 15.43 9.46 15.43 10.6 14.58 10.6 14.58 11.45" /><rect fill="#1d4ed8" x="17.14" y="9.46" width="1.71" height="1.14" /><polygon fill="#1d4ed8" points="22.55 11.45 21.42 11.45 21.42 10.6 20.57 10.6 20.57 9.46 22.55 9.46 22.55 11.45" /><path fill="#1d4ed8" d="M22.55,21.93H21.42V19.31h1.13Zm0-5.24H21.42V14.07h1.13Z" /><polygon fill="#1d4ed8" points="22.55 26.54 20.57 26.54 20.57 25.41 21.42 25.41 21.42 24.55 22.55 24.55 22.55 26.54" /><rect fill="#1d4ed8" x="17.14" y="25.41" width="1.71" height="1.14" /><polygon fill="#1d4ed8" points="15.43 26.54 13.45 26.54 13.45 24.55 14.58 24.55 14.58 25.41 15.43 25.41 15.43 26.54" /><path fill="#1d4ed8" d="M14.58,21.93H13.45V19.31h1.13Zm0-5.24H13.45V14.07h1.13Z" /><rect fill="#1d4ed8" y="19.07" width="11.34" height="7.47" transform="translate(11.34 45.61) rotate(180)" /><rect fill="#1d4ed8" y="9.46" width="11.34" height="7.47" transform="translate(11.34 26.39) rotate(180)" /><rect fill="#1d4ed8" x="24.66" y="19.07" width="11.34" height="7.47" transform="translate(60.66 45.61) rotate(180)" /><rect fill="#1d4ed8" x="24.66" y="9.46" width="11.34" height="7.47" transform="translate(60.66 26.39) rotate(180)" /></svg>


    ,
  },


  attributes: {


    wrapper: {
      type: 'object',
      default: {
        options: {
          tag: 'div',
          class: 'grid-item-wrap',
        },

        styles:
        {

          backgroundColor: { Desktop: '' },





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
  usesContext: ['post-grid/galleryId', 'post-grid/lightbox'],
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

    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;



    //const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    var breakPointX = myStore.getBreakPoint();



    // Wrapper CSS Class Selectors
    var wrapperSelector = blockClass;


    useEffect(() => {

      setAttributes({ blockId: blockIdX });
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);

      //blockCssY.items = [];

      //blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'flex-grow': { "Desktop": "1" } };
      //blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'flex-basis': { "Desktop": "0" } };

      //setAttributes({ blockCssY: { items: blockCssY.items } });


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



    function onBulkAddWrapper(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]s
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






    useEffect(() => {

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);









    const MY_TEMPLATE = [
      ['post-grid/image', {
        "wrapper": { "options": { "tag": "", "class": "", "useAsBackground": "no" }, "styles": { width: { Desktop: '100%' }, height: { Desktop: '100% !important' }, objectFit: { Desktop: 'cover' }, } },
        "image": { "options": { imgSrcType: 'media', imgSrcMetaKey: '', imgSrcMetaKeyType: 'ID', imgSrcImgId: '', srcUrl: '', srcId: '', linkTo: '', linkToMetaKey: '', linkTocustomUrl: '', altTextSrc: 'imgAltText', altTextCustom: '', altTextMetaKey: '', titleTextSrc: 'imgTitle', titleTextCustom: '', titleTextMetaKey: '', linkTarget: '_blank', linkAttr: [], class: '', size: { "Desktop": "full", "Tablet": "full", "Mobile": "full" }, }, "styles": { width: { Desktop: '100%' }, height: { Desktop: '100%' }, objectFit: { Desktop: 'cover' }, } },
        "lightbox": { "options": { "enable": false, "class": "" }, "styles": {} },
      }],

    ];

    const blockProps = useBlockProps({
      className: ` ${blockId} pg-image-gallery-item border border-dashed`,
    });

    //const isParentOfSelectedBlock = useSelect((select) => select('core/block-editor').hasSelectedInnerBlock(clientId, true))



    const innerBlocksProps = useInnerBlocksProps(blockProps, {
      //allowedBlocks: ALLOWED_BLOCKS,
      template: MY_TEMPLATE,
      //orientation: 'horizontal',
      templateInsertUpdatesSelection: true,
      renderAppender: InnerBlocks.ButtonBlockAppender
    });





    return (
      <>

        <InspectorControls className="">
          <div className='px-3' >
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

        <div {...innerBlocksProps}>
          {innerBlocksProps.children}
        </div>
      </>



    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file

    var attributes = props.attributes;
    var wrapper = attributes.wrapper;

    var blockId = attributes.blockId;


    const blockProps = useBlockProps.save({
      className: ` ${blockId} pg-image-gallery-item`,
    });


    return (
      <InnerBlocks.Content />
    );
  }
})