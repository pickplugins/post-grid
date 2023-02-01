import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover, Spinner } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl, InnerBlocks, useBlockProps } from '@wordpress/block-editor'
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

import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'

var myStore = wp.data.select('postgrid-shop');


registerBlockType("post-grid/layer", {
  title: "Layer",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:

      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 19.798L20.4452 14.1678C20.9047 13.8615 21.5256 13.9856 21.8319 14.4452C22.1164 14.8719 22.0297 15.4377 21.6479 15.7616L21.5546 15.8319L12.5547 21.8318C12.2561 22.0309 11.8772 22.053 11.5608 21.8982L11.4453 21.8318L2.4454 15.8319C1.98588 15.5256 1.8617 14.9047 2.16805 14.4452C2.45252 14.0185 3.00818 13.8809 3.45402 14.1087L3.55479 14.1678L12 19.798L20.4452 14.1678L12 19.798ZM12.5547 2.16795L21.5546 8.16788C22.1483 8.5637 22.1483 9.43615 21.5546 9.83197L12.5547 15.8319C12.2188 16.0558 11.7812 16.0558 11.4453 15.8319L2.4454 9.83197C1.85167 9.43615 1.85167 8.5637 2.4454 8.16788L11.4453 2.16795C11.7812 1.94402 12.2188 1.94402 12.5547 2.16795ZM12 4.20183L4.80285 8.99993L12 13.798L19.1971 8.99993L12 4.20183Z" />
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
          class: 'pg-layers',
        },

        styles:
        {
          color: {},
          bgColor: {},
          position: {},
          zIndex: {},
          top: {},
          right: {},
          bottom: {},
          left: {},



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

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    const [isLoading, setisLoading] = useState(false);
    const [postGridData, setPostGridData] = useState(window.PostGridPluginData);


    // Wrapper CSS Class Selectors
    var wrapperSelector = blockClass;


    useEffect(() => {

      setAttributes({ blockId: blockIdX });
      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [clientId]);


    useEffect(() => {


      setAttributes({ customCss: customCss });

      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);


    var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }



    function handleLinkClick(ev) {

      ev.stopPropagation();
      ev.preventDefault();
      return false;
    }


    function onChangeStyleWrapper(sudoScource, newVal, attr) {

      var sudoScourceX = { ...wrapper[sudoScource] }
      var elementSelector = wrapperSelector;

      if (sudoScource == 'styles') {
        elementSelector = wrapperSelector;
      }

      else if (sudoScource == 'hover') {
        elementSelector = wrapperSelector + ':hover';
      } else if (sudoScource == 'after') {
        elementSelector = wrapperSelector + ':after';
      } else if (sudoScource == 'before') {
        elementSelector = wrapperSelector + ':before';
      } else if (sudoScource == 'first-child') {
        elementSelector = wrapperSelector + ':first-child';
      } else if (sudoScource == 'last-child') {
        elementSelector = wrapperSelector + ':last-child';
      } else if (sudoScource == 'visited') {
        elementSelector = wrapperSelector + ':visited';
      } else if (sudoScource == 'selection') {
        elementSelector = wrapperSelector + ':selection';
      } else if (sudoScource == 'first-letter') {
        elementSelector = wrapperSelector + '::first-letter';
      } else if (sudoScource == 'first-line') {
        elementSelector = wrapperSelector + '::first-line';
      }
      else {
        elementSelector = wrapperSelector + ':' + sudoScource;
      }

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
      setAttributes({ wrapper: { ...wrapper } });
    }


    function onRemoveStyleWrapper(sudoScource, key) {
      var sudoScourceX = { ...wrapper[sudoScource] }
      if (sudoScourceX[key] != undefined) {
        delete sudoScourceX[key];
      }

      wrapper[sudoScource] = sudoScourceX;
      setAttributes({ wrapper: { ...wrapper } });

      if (blockCssY.items[wrapperSelector] == undefined) {
        blockCssY.items[wrapperSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {
        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[wrapperSelector][argAttr] = argAttrVal;
      })

      setAttributes({ blockCssY: { items: blockCssY.items } });
    }


    function onAddStyleWrapper(sudoScource, key) {
      var sudoScourceX = { ...wrapper[sudoScource] }
      sudoScourceX[key] = {};
      wrapper[sudoScource] = sudoScourceX;
      setAttributes({ wrapper: { ...wrapper } });
    }


    function paddingControl(nextValues) {


      var responsive = wrapper.styles.padding;
      responsive[breakPointX] = nextValues;


      var styles = { ...wrapper.styles, padding: responsive };
      setAttributes({ wrapper: { ...wrapper, styles: styles } });


      var itemsX = { ...blockCssY.items };



      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[wrapperSelector] = (blockCssY.items[wrapperSelector] != undefined) ? blockCssY.items[wrapperSelector] : {};



      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[wrapperSelector]['padding-top'] != undefined) ? blockCssY.items[wrapperSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'padding-top': paddingTop };
        //itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[wrapperSelector]['padding-right'] != undefined) ? blockCssY.items[wrapperSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'padding-right': paddingRight };
        //itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[wrapperSelector]['padding-bottom'] != undefined) ? blockCssY.items[wrapperSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'padding-bottom': paddingBottom };
        //itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[wrapperSelector]['padding-left'] != undefined) ? blockCssY.items[wrapperSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'padding-left': paddingLeft };
        //itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });
      //setAttributes({ blockCssY: { items: itemsX } });



    }





    function marginControl(nextValues) {

      var responsive = wrapper.styles.margin;
      responsive[breakPointX] = nextValues;



      var styles = { ...wrapper.styles, margin: responsive };
      setAttributes({ wrapper: { ...wrapper, styles: styles } });




      var itemsX = { ...blockCssY.items };

      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[wrapperSelector] = (blockCssY.items[wrapperSelector] != undefined) ? blockCssY.items[wrapperSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[wrapperSelector]['margin-top'] != undefined) ? blockCssY.items[wrapperSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'margin-top': marginTop };
        //itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'margin-top': marginTop };

      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[wrapperSelector]['margin-right'] !== undefined) ? blockCssY.items[wrapperSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'margin-right': marginRight };
        //itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[wrapperSelector]['margin-bottom'] !== undefined) ? blockCssY.items[wrapperSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'margin-bottom': marginBottom };
        //itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[wrapperSelector]['margin-left'] !== undefined) ? blockCssY.items[wrapperSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'margin-left': marginLeft };
        //itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'margin-left': marginLeft };

      }

      setAttributes({ blockCssY: { items: blockCssY.items } });
      //setAttributes({ blockCssY: { items: itemsX } });

    }



    function generateBlockCssY() {


      var reponsiveCssGroups = {};
      var reponsiveCss = '';

      for (var selector in blockCssY.items) {

        var attrs = blockCssY.items[selector];


        for (var attr in attrs) {
          var breakpoints = attrs[attr];

          for (var device in breakpoints) {

            var attrValue = breakpoints[device];

            if (reponsiveCssGroups[device] == undefined) {
              reponsiveCssGroups[device] = []
            }

            if (reponsiveCssGroups[device][selector] == undefined) {
              reponsiveCssGroups[device][selector] = []
            }

            reponsiveCssGroups[device][selector].push({ 'attr': attr, 'val': attrValue });

          }


        }
      }

      if (reponsiveCssGroups['Mobile'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 0px) and (max-width: 360px){';

        for (var selector in reponsiveCssGroups['Mobile']) {
          var attrs = reponsiveCssGroups['Mobile'][selector];

          reponsiveCss += selector + '{';
          for (var index in attrs) {
            var attr = attrs[index]
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }
          reponsiveCss += '}';
        }
        reponsiveCss += '}';

      }




      if (reponsiveCssGroups['Tablet'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 361px) and (max-width: 780px){';

        for (var selector in reponsiveCssGroups['Tablet']) {
          var attrs = reponsiveCssGroups['Tablet'][selector];

          reponsiveCss += selector + '{';
          for (var index in attrs) {
            var attr = attrs[index]
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }
          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      }



      if (reponsiveCssGroups['Desktop'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 781px){';

        for (var selector in reponsiveCssGroups['Desktop']) {
          var attrs = reponsiveCssGroups['Desktop'][selector];


          reponsiveCss += selector + '{';
          for (var index in attrs) {
            var attr = attrs[index]
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }
          reponsiveCss += '}';


        }
        reponsiveCss += '}';
      }







      var iframe = document.querySelectorAll('[name="editor-canvas"]')[0];

      if (iframe) {

        setTimeout(() => {
          var iframeDocument = iframe.contentDocument;
          var body = iframeDocument.body;
          var divWrap = iframeDocument.getElementById("css-block-" + blockId);

          if (divWrap != undefined) {
            iframeDocument.getElementById("css-block-" + blockId).outerHTML = "";

          }

          var divWrap = '<div id="css-block-' + blockId + '"></div>';
          body.insertAdjacentHTML('beforeend', divWrap);

          var csswrappg = iframeDocument.getElementById('css-block-' + blockId);
          var str = '<style>' + reponsiveCss + customCss + '</style>';

          csswrappg.insertAdjacentHTML('beforeend', str);
        }, 200)


      } else {



        var wpfooter = document.getElementById('wpfooter');
        var divWrap = document.getElementById("css-block-" + blockId);

        if (divWrap != undefined) {
          document.getElementById("css-block-" + blockId).outerHTML = "";
        }

        var divWrap = '<div id="css-block-' + blockId + '"></div>';
        wpfooter.insertAdjacentHTML('beforeend', divWrap);

        var csswrappg = document.getElementById('css-block-' + blockId);
        var str = '<style>' + reponsiveCss + customCss + '</style>';

        csswrappg.insertAdjacentHTML('beforeend', str);



      }



    }















    useEffect(() => {

      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);







    const colors = [
      { name: '9DD6DF', color: '#9DD6DF' },
      { name: '18978F', color: '#18978F' },
      { name: 'A084CF', color: '#A084CF' },
      { name: 'DFBB9D', color: '#DFBB9D' },
      { name: '774360', color: '#774360' },
      { name: '3AB0FF', color: '#3AB0FF' },
      { name: '51557E', color: '#51557E' },


    ];





    const [setSome, setSomeState] = useState({});
    const [stateX, setStateX] = useState('Old Value');







    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType,

    } = wp.data.dispatch('core/edit-post')





    function onChangeBreakPoint(x, index) {


      setPreviewDeviceType(x.value)
      var asdsdsd = wp.data.dispatch('postgrid-shop').setBreakPoint(x.value)

      asdsdsd.then((res) => {

        setBreakPointX(res.breakpoint);
        //generateBlockCssY();
        myStore.generateBlockCss(blockCssY.items, blockId, customCss);
      });



    }


    return (
      [


        <div>

          <BlockControls >








          </BlockControls>


          <InspectorControls key="general">
            <div className='px-3' title="Wrapper" initialOpen={false}>



              <div>



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
            </div>






          </InspectorControls >
        </div >
        ,


        <>

          <div className={[blockId]}>
            <InnerBlocks />
          </div>


        </>
      ]

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file

    var attributes = props.attributes;
    var wrapper = attributes.wrapper;

    var blockId = attributes.blockId;

    var blockIdX = attributes.blockId ? attributes.blockId : 'pg' + clientId.split('-').pop();
    var blockClass = '.' + blockIdX;
    const redBackground = {
      backgroundColor: '#d99',
      position: 'absolute',

    };

    const blockProps = useBlockProps.save({ style: redBackground });

    return (
      <InnerBlocks.Content />
    );


    //return null;
  }
})