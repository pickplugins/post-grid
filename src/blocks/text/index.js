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
import PGcssTextAlign from '../../components/css-text-align'

import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'
import PGCssLibrary from '../../components/css-library'








var myStore = wp.data.select('postgrid-shop');



registerBlockType("post-grid/text", {
  apiVersion: 2,
  title: "Text",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path fill="#1d4ed8" d="M17.53,16.56a1.07,1.07,0,0,0-1.06,1.06v7.93H2.12V11.2h7.93a1.06,1.06,0,0,0,0-2.12H1.81A1.81,1.81,0,0,0,0,10.89v15a1.81,1.81,0,0,0,1.81,1.81h15a1.81,1.81,0,0,0,1.81-1.81V17.62A1.06,1.06,0,0,0,17.53,16.56Z" /><path fill="#1d4ed8" d="M19,11.63l-3-3a1.07,1.07,0,0,0-1.5,0l-9,9a1.06,1.06,0,0,0-.31.75v3A1.07,1.07,0,0,0,6.3,22.43h3a1.06,1.06,0,0,0,.75-.31l9-9A1.07,1.07,0,0,0,19,11.63Zm-4.5,3L8.86,20.31H7.36v-1.5L13,13.14Zm2.25-2.25-.75.75-1.49-1.49.75-.75Z" /><circle fill="#1d4ed8" cx="24.85" cy="25.36" r="2.31" /><circle fill="#1d4ed8" cx="33.69" cy="25.36" r="2.31" /></svg>

    ,
  },


  attributes: {


    text: {
      type: 'object',
      default: {
        options: {
          content: 'Hi...',
          tag: 'div',
          class: 'pg-text',
        },
        styles: {
          color: { Desktop: '#000000' },
          fontSize: { Desktop: '18px' },
          fontFamily: { Desktop: 'Poppins' },
          fontStyle: { Desktop: 'normal' },
          fontWeight: { Desktop: '400' },
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
  usesContext: [],

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

    var text = attributes.text;

    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    //const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    var breakPointX = myStore.getBreakPoint();

    const [isLoading, setisLoading] = useState(false);
    var [debounce, setDebounce] = useState(null); // Using the hook.

    const CustomTag = `${text.options.tag}`;


    // Wrapper CSS Class Selectors
    var textSelector = blockClass;






    useEffect(() => {

      if (blockId.length == 0) {
        setAttributes({ blockId: blockIdX });

        myStore.generateBlockCss(blockCssY.items, blockId, customCss);
      }


    }, [clientId]);




    useEffect(() => {


      setAttributes({ customCss: customCss });


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);



    useEffect(() => {
      //console.log('blockId', blockId);



      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockId]);


    useEffect(() => {

      //console.log('blockCssY', blockCssY.items);


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);






    function onPickCssLibraryText(args) {

      console.log('onPickCssLibraryText');


      var textX = Object.assign({}, text);


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        textX[sudoScource] = sudoScourceArgs;
      })

      setAttributes({ text: textX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, textSelector);


        var sudoObj = {};
        Object.entries(sudoScourceArgs).map(y => {

          var cssPropty = y[0];
          var cssProptyVal = y[1];
          var cssProptyKey = myStore.cssAttrParse(cssPropty);
          sudoObj[cssProptyKey] = cssProptyVal;
        })

        styleObj[elementSelector] = sudoObj;
      })

      var blockCssYX = { ...blockCssY };


      var items = { ...blockCssYX.items }

      var cssItems = Object.assign(items, styleObj);




      setAttributes({ blockCssY: { items: cssItems } });
    }




    function onChangeStyleText(sudoScource, newVal, attr) {

      console.log('onChangeStyleText');


      var path = [sudoScource, attr, breakPointX]
      //let obj = Object.assign({}, text);
      let obj = { ...text }
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ text: object });

      var elementSelector = myStore.getElementSelector(sudoScource, textSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      // if (blockCssY.items[elementSelector] == undefined) {
      //     blockCssY.items[elementSelector] = {};
      //   }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      //console.log('cssItems', cssItems);



      setAttributes({ blockCssY: { items: cssItems } });


    }


    function onRemoveStyleText(sudoScource, key) {

      //console.log('onRemoveStyleText');


      var object = myStore.deletePropertyDeep(text, [sudoScource, key, breakPointX]);
      setAttributes({ text: object });

      var elementSelector = myStore.getElementSelector(sudoScource, textSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }


    function onAddStyleText(sudoScource, key) {



      var path = [sudoScource, key, breakPointX]
      //let objX = Object.assign({}, text);
      let obj = { ...text };


      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ text: object });


    }







    function onBulkAddText(sudoScource, cssObj) {

      console.log('onBulkAddText');



      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, text);
      obj[sudoScource] = cssObj;

      setAttributes({ text: obj });

      var selector = myStore.getElementSelector(sudoScource, textSelector);
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


















    const blockProps = useBlockProps({
      className: ` ${blockId} pg-text`,


    });

    return (
      <>
        <InspectorControls>
          <div className='' >






            <PanelBody title="Text" initialOpen={false}>


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

                  {/* <PanelRow>
                    <label for="">Block Class</label>

                    <InputControl
                      value={blockId}
                      onChange={(newVal) => {

                        setAttributes({ blockId: newVal });

                      }}
                    />

                  </PanelRow> */}


                  <PanelRow>
                    <label for="">Wrapper Tag</label>

                    <SelectControl
                      label=""
                      value={text.options.tag}
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



                        var options = { ...text.options, tag: newVal };
                        setAttributes({ text: { ...text, options: options } });



                      }

                      }
                    />
                  </PanelRow>
                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={text} onChange={onChangeStyleText} onAdd={onAddStyleText} onRemove={onRemoveStyleText} onBulkAdd={onBulkAddText} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={text} onChange={onPickCssLibraryText} />
                </PGtab>
              </PGtabs>

            </PanelBody>


            <PanelBody title="Custom Style" initialOpen={false}>

              <p>Please use following class selector to apply your custom CSS</p>


              <div className='my-3'>
                <p className='font-bold'>Text </p>
                <p><code>{textSelector}{'{}'} </code></p>
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


        <RichText
          {...blockProps}

          tagName={CustomTag}
          value={text.options.content}
          allowedFormats={['core/bold', 'core/italic', 'core/link']}
          onChange={(content) => {
            var options = { ...text.options, content: content };
            setAttributes({ text: { ...text, options: options } });
          }}
          placeholder={__('Start Writing...')}
        />

      </>

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})