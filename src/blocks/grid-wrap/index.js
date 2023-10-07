import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover, Spinner, Tooltip } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';
import { InnerBlocks, useBlockProps, useInnerBlocksProps, store as blockEditorStore, } from "@wordpress/block-editor"
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';

import { Icon, styles, settings, link, linkOff } from "@wordpress/icons";
import { __experimentalBlockVariationPicker as BlockVariationPicker } from '@wordpress/block-editor';

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'
import { __experimentalScrollable as Scrollable } from '@wordpress/components';

import IconToggle from '../../components/icon-toggle'
import Typography from '../../components/typography'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import variations from './variations'



import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'
import PGCssLibrary from '../../components/css-library'
import PGIconPicker from '../../components/icon-picker'



var myStore = wp.data.select('postgrid-shop');





registerBlockType("post-grid/grid-wrap", {
  apiVersion: 2,
  title: "Grid Wrap",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:

      <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><rect fill="#1d4ed8" x="12.68" y="9.9" width="10.65" height="16.2" transform="translate(36 36) rotate(180)" /><rect fill="#1d4ed8" y="19.01" width="10.65" height="7.09" transform="translate(10.65 45.11) rotate(180)" /><rect fill="#1d4ed8" y="9.9" width="10.65" height="7.09" transform="translate(10.65 26.89) rotate(180)" /><rect fill="#1d4ed8" x="25.35" y="19.01" width="10.65" height="7.09" transform="translate(61.35 45.11) rotate(180)" /><rect fill="#1d4ed8" x="25.35" y="9.9" width="10.65" height="7.09" transform="translate(61.35 26.89) rotate(180)" /></svg>


    ,
  },


  attributes: {


    wrapper: {
      type: 'object',
      default: {
        options: {
          tag: 'div',
          class: '',
        },

        styles:
        {


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

    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    var postId = context['postId'];
    var postType = context['postType'];

    //const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    var breakPointX = myStore.getBreakPoint();


    // Wrapper CSS Class Selectors
    var wrapperSelector = blockClass;

    const { replaceInnerBlocks } = useDispatch(blockEditorStore);

    const hasInnerBlocks = useSelect(
      (select) => select(blockEditorStore).getBlocks(clientId).length > 0,
      [clientId]
    );


    //console.log(JSON.stringify(wp.data.select(blockEditorStore).getBlocks(clientId)));



    useEffect(() => {

      setAttributes({ blockId: blockIdX });

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);


      // blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'display': { "Desktop": "grid" } };
      // blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'gap': { "Desktop": "20px" } };

      // setAttributes({ blockCssY: { items: blockCssY.items } });


      //setAttributes({ wrapper: { ...wrapper, styles: { display: { Desktop: 'grid' }, gap: { Desktop: '20px' } } } });



    }, [clientId]);


    useEffect(() => {


      setAttributes({ customCss: customCss });


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);


    useEffect(() => {


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);



    // var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    // for (var x in breakPoints) {

    //   var item = breakPoints[x];
    //   breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    // }



    function handleLinkClick(ev) {

      ev.stopPropagation();
      ev.preventDefault();
      return false;
    }



    function applyFlex(attr, newVal) {


      onChangeStyleWrapper('styles', newVal, attr)

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











    const ALLOWED_BLOCKS = ['post-grid/grid-wrap-item'];

    const MY_TEMPLATE = [
      ['post-grid/grid-wrap-item', {}],
      ['post-grid/grid-wrap-item', {}],
      ['post-grid/grid-wrap-item', {}],


    ];


    const blockProps = useBlockProps({
      className: ` ${blockId} pg-grid-wrap `,
    });


    const innerBlocksProps = useInnerBlocksProps(blockProps, {
      allowedBlocks: ALLOWED_BLOCKS,
      //template: MY_TEMPLATE,
      orientation: 'horizontal',
      templateInsertUpdatesSelection: true,
      //renderAppender: InnerBlocks.ButtonBlockAppender

    });



    return (
      <>
        <InspectorControls >



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

                      console.log(wrapper);



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


            <p className=''>Please use following class selector to apply your custom CSS</p>


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


        </InspectorControls >


        <>


          {!hasInnerBlocks && (

            <div {...innerBlocksProps}>

              <div className='border p-5'>
                <div className='flex justify-between mb-5'>
                  <div className='text-xl rounded-sm'>Click to pick a variation</div>

                  <div className='bg-orange-400 hover:bg-orange-300 px-4 py-1 text-white cursor-pointer'
                    onClick={(ev) => {



                      var wrapperX = { ...wrapper, styles: { gridTemplateColumns: { Desktop: '1fr 1fr' }, gap: { Desktop: '1em' }, display: { Desktop: 'grid' }, } };
                      setAttributes({ wrapper: wrapperX });


                      var elementCss = myStore.generateElementCss(wrapperX, wrapperSelector);

                      var itemsX = { ...blockCssY.items, ...elementCss }
                      setAttributes({ blockCssY: { items: itemsX } });

                      myStore.generateBlockCss(blockCssY.items, blockId, customCss);


                      replaceInnerBlocks(
                        clientId,
                        createBlocksFromInnerBlocksTemplate([['post-grid/grid-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "grid-item-wrap" }, "styles": {} } }], ['post-grid/grid-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "grid-item-wrap" }, "styles": {} } }]]),
                        true
                      );
                    }}
                  >Skip</div>
                </div>

                <div className=''>


                  {variations.map((variation) => {

                    return (
                      <div className='text-center inline-block m-4 w-32 align-top p-4 bg-gray-400 cursor-pointer hover:bg-gray-500 relative' onClick={(ev) => {


                        if (variation.isPro) {
                          alert('Sorry this variation only vailable in pro version');
                          return false;
                        }



                        var wrapperX = { ...wrapper, styles: variation.wrapObj.styles };
                        setAttributes({ wrapper: wrapperX });


                        var elementCss = myStore.generateElementCss(wrapperX, wrapperSelector);

                        var itemsX = { ...blockCssY.items, ...elementCss }
                        setAttributes({ blockCssY: { items: itemsX } });

                        myStore.generateBlockCss(blockCssY.items, blockId, customCss);


                        replaceInnerBlocks(
                          clientId,
                          createBlocksFromInnerBlocksTemplate(variation.innerBlocks),
                          true
                        );
                      }}>

                        <div>{variation.icon}</div>
                        <div>{variation.title}</div>

                        {variation.isPro && (<span className='bg-amber-400 rounded-sm text-sm inline-block  bg-opacity-90 text-white hover:text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                          <a target="_blank" className='block px-3' href={'https://pickplugins.com/post-grid/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=' + variation.label}>Pro</a>
                        </span>)}
                      </div>
                    )

                  })}
                </div>
              </div>

              {/* <BlockVariationPicker
                icon="smiley"
                label={__('Choose variation')}
                instructions={__('Select a variation to start with.')}
                onSelect={(variation) => {

                  var wrapperX = { ...wrapper, styles: variation.wrapObj.styles };
                  setAttributes({ wrapper: wrapperX });


                  var elementCss = myStore.generateElementCss(wrapperX, wrapperSelector);

                  var itemsX = { ...blockCssY.items, ...elementCss }
                  setAttributes({ blockCssY: { items: itemsX } });

                  myStore.generateBlockCss(blockCssY.items, blockId, customCss);


                  replaceInnerBlocks(
                    clientId,
                    createBlocksFromInnerBlocksTemplate(variation.innerBlocks),
                    true
                  );
                }}
                variations={variations}
              /> */}
            </div>

          )}

          {hasInnerBlocks && (
            <div {...innerBlocksProps}>
              {innerBlocksProps.children}
            </div>
          )}


        </>

      </>

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file

    var attributes = props.attributes;
    var wrapper = attributes.wrapper;

    var blockId = attributes.blockId;


    const blockProps = useBlockProps.save({
      className: ` ${blockId} pg-grid-wrap`,
    });


    return (
      <InnerBlocks.Content />
    );


    //return null;

  }
})