import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { applyFilters } from '@wordpress/hooks';

import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'
import { Icon, styles, settings, link, linkOff } from "@wordpress/icons";

import { InnerBlocks, useBlockProps } from "@wordpress/block-editor"

import IconToggle from '../../components/icon-toggle'
import Typography from '../../components/typography'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import PGDropdown from '../../components/dropdown'
import PGcssDisplay from '../../components/css-display'
import { Resizable } from 're-resizable';

import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'

var myStore = wp.data.select('postgrid-shop');

registerBlockType("post-grid/divider", {
  title: "Divider",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:
      <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 95C25 92.2386 27.2386 90 30 90H470C472.761 90 475 92.2386 475 95V145C475 147.761 472.761 150 470 150H30C27.2386 150 25 147.761 25 145V95Z" />
        <path d="M25 234C25 231.239 27.2386 229 30 229H470C472.761 229 475 231.239 475 234V254C475 256.761 472.761 259 470 259H30C27.2386 259 25 256.761 25 254V234Z" />
        <path d="M25 298C25 295.239 27.2386 293 30 293H470C472.761 293 475 295.239 475 298V318C475 320.761 472.761 323 470 323H30C27.2386 323 25 320.761 25 318V298Z" />
        <path d="M25 362C25 359.239 27.2386 357 30 357H366C368.761 357 371 359.239 371 362V382C371 384.761 368.761 387 366 387H30C27.2386 387 25 384.761 25 382V362Z" />
      </svg>
    ,
  },


  attributes: {
    wrapper: {
      type: 'object',
      default: {
        options: { tag: 'div', class: '' },
        styles:
        {

          color: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
          display: {},

        },
      },
    },
    divider: {
      type: 'object',
      default: {
        options: {
          tag: 'div',


          customUrl: '',
          class: '',
        },

        styles: {

          display: {},
          width: {},
          height: {},

          color: { Desktop: '' },
          padding: { "Desktop": { top: '0px', right: '0px', bottom: '0px', left: '0px' } },

          margin: { Desktop: '' },

        },
      },
    },






    customCss: {
      "type": "string",
      "default": ''
    },


    blockId: {
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


    let divider = attributes.divider;
    var wrapper = attributes.wrapper;
    var blockId = attributes.blockId;

    var blockIdX = attributes.blockId ? attributes.blockId : 'pg' + clientId.split('-').pop();
    var blockClass = '.' + blockIdX;

    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;



    var postId = context['postId'];
    var postType = context['postType'];

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());

    const [paddingTop, setPaddingTop] = useState(parseInt(divider.styles.padding[breakPointX].top));
    const [paddingBottom, setPaddingBottom] = useState(parseInt(divider.styles.padding[breakPointX].bottom));




    useEffect(() => {


      //console.log(divider);


    }, [divider]);






    String.prototype.strtr = function (dic) {
      const str = this.toString(),
        makeToken = (inx) => `{{###~${inx}~###}}`,

        tokens = Object.keys(dic)
          .map((key, inx) => ({
            key,
            val: dic[key],
            token: makeToken(inx)
          })),

        tokenizedStr = tokens.reduce((carry, entry) =>
          carry.replace(new RegExp(entry.key, "g"), entry.token), str);

      return tokens.reduce((carry, entry) =>
        carry.replace(new RegExp(entry.token, "g"), entry.val), tokenizedStr);
    };



    const [iconHtml, setIconHtml] = useState('');






    useEffect(() => {

      setAttributes({ blockId: blockIdX });
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);

      blockCssY.items[dividerSelector] = { ...blockCssY.items[dividerSelector], 'background-color': { "Desktop": "#dddddd" } };



    }, [clientId]);

    // Wrapper CSS Class Selectors
    const wrapperSelector = blockClass;


    var dividerSelector = '';


    if (wrapper.options.tag.length != 0) {

      dividerSelector = blockClass;

    } else {
      dividerSelector = blockClass;

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

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });



      // var sudoScourceX = { ...wrapper[sudoScource] }
      // var elementSelector = myStore.getElementSelector(sudoScource, wrapperSelector);


      // sudoScourceX[attr][breakPointX] = newVal;

      // if (blockCssY.items[elementSelector] == undefined) {
      //   blockCssY.items[elementSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {
      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[elementSelector][argAttr] = argAttrVal;
      // })

      // setAttributes({ blockCssY: { items: blockCssY.items } });
      // setAttributes({ wrapper: { ...wrapper } });
    }


    function onRemoveStyleWrapper(sudoScource, key) {

      var object = myStore.deletePropertyDeep(wrapper, [sudoScource, key, breakPointX]);
      setAttributes({ wrapper: object });


      var elementSelector = myStore.getElementSelector(sudoScource, wrapperSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


      // var sudoScourceX = { ...wrapper[sudoScource] }
      // if (sudoScourceX[key] != undefined) {
      //   delete sudoScourceX[key];
      // }

      // wrapper[sudoScource] = sudoScourceX;
      // setAttributes({ wrapper: { ...wrapper } });

      // if (blockCssY.items[wrapperSelector] == undefined) {
      //   blockCssY.items[wrapperSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {
      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[wrapperSelector][argAttr] = argAttrVal;
      // })


      // if (blockCssY.items[wrapperSelector][key] != undefined) {
      //   delete blockCssY.items[wrapperSelector][key];
      // }

      // setAttributes({ blockCssY: { items: blockCssY.items } });
    }


    function onAddStyleWrapper(sudoScource, key) {
      // var sudoScourceX = { ...wrapper[sudoScource] }
      // sudoScourceX[key] = {};
      // wrapper[sudoScource] = sudoScourceX;
      // setAttributes({ wrapper: { ...wrapper } });


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, wrapper);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ wrapper: object });


    }









    function paddingControl(nextValues) {



      var responsive = divider.styles.padding;
      responsive[breakPointX] = nextValues;

      var styles = { ...divider.styles, padding: responsive };
      setAttributes({ divider: { ...divider, styles: styles } });


      blockCssY.items[dividerSelector] = (blockCssY.items[dividerSelector] != undefined) ? blockCssY.items[dividerSelector] : {};


      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;





      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[dividerSelector]['padding-top'] != undefined) ? blockCssY.items[dividerSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[dividerSelector] = { ...blockCssY.items[dividerSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[dividerSelector]['padding-right'] != undefined) ? blockCssY.items[dividerSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[dividerSelector] = { ...blockCssY.items[dividerSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[dividerSelector]['padding-bottom'] != undefined) ? blockCssY.items[dividerSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[dividerSelector] = { ...blockCssY.items[dividerSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[dividerSelector]['padding-left'] != undefined) ? blockCssY.items[dividerSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[dividerSelector] = { ...blockCssY.items[dividerSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });



    }





    function marginControl(nextValues) {


      var responsive = divider.styles.margin;
      responsive[breakPointX] = nextValues;


      var styles = { ...divider.styles, margin: responsive };
      setAttributes({ divider: { ...divider, styles: styles } });

      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[dividerSelector] = (blockCssY.items[dividerSelector] != undefined) ? blockCssY.items[dividerSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[dividerSelector]['margin-top'] != undefined) ? blockCssY.items[dividerSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[dividerSelector] = { ...blockCssY.items[dividerSelector], 'margin-top': marginTop };
      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[dividerSelector]['margin-right'] !== undefined) ? blockCssY.items[dividerSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[dividerSelector] = { ...blockCssY.items[dividerSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[dividerSelector]['margin-bottom'] !== undefined) ? blockCssY.items[dividerSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[dividerSelector] = { ...blockCssY.items[dividerSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[dividerSelector]['margin-left'] !== undefined) ? blockCssY.items[dividerSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[dividerSelector] = { ...blockCssY.items[dividerSelector], 'margin-left': marginLeft };

      }

      setAttributes({ blockCssY: { items: blockCssY.items } });
    }



    function generateBlockCssY() {


      var reponsiveCssGroups = {};


      for (var selector in blockCssY.items) {



        var attrs = blockCssY.items[selector];


        for (var attr in attrs) {
          var breakpoints = attrs[attr];

          for (var device in breakpoints) {

            var attrValue = breakpoints[device];

            if (reponsiveCssGroups[device] == undefined) {
              reponsiveCssGroups[device] = []
            }

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



      //return false;


      var reponsiveCssMobile = '';

      if (reponsiveCssGroups['Mobile'] != undefined) {

        reponsiveCssMobile += '@media only screen and (min-width: 0px) and (max-width: 360px){';

        for (var selector in reponsiveCssGroups['Mobile']) {
          var attrs = reponsiveCssGroups['Mobile'][selector];

          reponsiveCssMobile += selector + '{';
          for (var index in attrs) {
            var attr = attrs[index]
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCssMobile += attrName + ':' + attrValue + ';';
          }
          reponsiveCssMobile += '}';
        }
        reponsiveCssMobile += '}';

      }



      var reponsiveCssTablet = '';

      if (reponsiveCssGroups['Tablet'] != undefined) {
        reponsiveCssTablet += '@media only screen and (min-width: 361px) and (max-width: 780px){';

        for (var selector in reponsiveCssGroups['Tablet']) {
          var attrs = reponsiveCssGroups['Tablet'][selector];

          reponsiveCssTablet += selector + '{';
          for (var index in attrs) {
            var attr = attrs[index]
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCssTablet += attrName + ':' + attrValue + ';';
          }
          reponsiveCssTablet += '}';
        }

        reponsiveCssTablet += '}';
      }

      var reponsiveCssDesktop = '';


      if (reponsiveCssGroups['Desktop'] != undefined) {
        reponsiveCssDesktop += '@media only screen and (min-width: 781px){';

        for (var selector in reponsiveCssGroups['Desktop']) {
          var attrs = reponsiveCssGroups['Desktop'][selector];


          reponsiveCssDesktop += selector + '{';
          for (var index in attrs) {
            var attr = attrs[index]
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCssDesktop += attrName + ':' + attrValue + ';';
          }
          reponsiveCssDesktop += '}';


        }
        reponsiveCssDesktop += '}';



      }


      var reponsiveCss = reponsiveCssMobile + reponsiveCssTablet + reponsiveCssDesktop;



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


    useEffect(() => {


      setAttributes({ customCss: customCss });


      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);



    useEffect(() => {

    }, [divider]);








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




    const CustomTag = `${wrapper.options.tag}`;
    const CustomTagPostTitle = `${divider.options.tag}`;



    function onChangeTypo(typoX) {

      setAttributes({ divider: { ...divider, styles: typoX } });

      var newValuesObjX = {};


      if (typoX.fontFamily[breakPointX] != undefined) {

        blockCssY.items[dividerSelector] = { ...blockCssY.items[dividerSelector], 'font-family': typoX.fontFamily };

      }


      if (typoX.fontSize[breakPointX] != undefined) {

        var fontSizeVal = (typoX.fontSize[breakPointX].val) ? typoX.fontSize[breakPointX].val : 16;
        var fontSizeUnit = (typoX.fontSize[breakPointX].unit) ? typoX.fontSize[breakPointX].unit : 'px';


        var fontSizeX = (blockCssY.items[dividerSelector] != undefined) ? blockCssY.items[dividerSelector]['font-size'] : {};

        fontSizeX[breakPointX] = fontSizeVal + fontSizeUnit;
        blockCssY.items[dividerSelector] = { ...blockCssY.items[dividerSelector], 'font-size': fontSizeX };

      }



      if (typoX.lineHeight[breakPointX] != undefined) {

        var lineHeightVal = (typoX.lineHeight[breakPointX].val) ? typoX.lineHeight[breakPointX].val : 0;
        var lineHeightUnit = (typoX.lineHeight[breakPointX].unit) ? typoX.lineHeight[breakPointX].unit : 'px';


        var lineHeightX = (blockCssY.items[dividerSelector]['line-height'] != undefined) ? blockCssY.items[dividerSelector]['line-height'] : {};

        lineHeightX[breakPointX] = lineHeightVal + lineHeightUnit;

        blockCssY.items[dividerSelector] = { ...blockCssY.items[dividerSelector], 'line-height': lineHeightX };
      }
      if (typoX.letterSpacing[breakPointX] != undefined) {

        var letterSpacingVal = (typoX.letterSpacing[breakPointX].val) ? typoX.letterSpacing[breakPointX].val : 0;
        var letterSpacingUnit = (typoX.letterSpacing[breakPointX].unit) ? typoX.letterSpacing[breakPointX].unit : 'px';



        var letterSpacingX = (blockCssY.items[dividerSelector]['letter-spacing'] != undefined) ? blockCssY.items[dividerSelector]['letter-spacing'] : {};

        letterSpacingX[breakPointX] = letterSpacingVal + letterSpacingUnit;

        blockCssY.items[dividerSelector] = { ...blockCssY.items[dividerSelector], 'letter-spacing': letterSpacingX };
      }

      if (typoX.fontWeight[breakPointX] != undefined) {

        blockCssY.items[dividerSelector] = { ...blockCssY.items[dividerSelector], 'font-weight': typoX.fontWeight };

      }


      if (typoX.textDecoration[breakPointX] != undefined) {

        var str = {};

        var textDecorationX = typoX.textDecoration[breakPointX];
        var textDecorationXStr = (textDecorationX.length > 0) ? textDecorationX.join(' ') : '';

        str[breakPointX] = textDecorationXStr;

        //typoX.textDecoration[breakPointX] = typoX.textDecoration[breakPointX].join(' ');

        blockCssY.items[dividerSelector] = { ...blockCssY.items[dividerSelector], 'text-decoration': str };

      }
      if (typoX.textTransform[breakPointX] != undefined) {

        blockCssY.items[dividerSelector] = { ...blockCssY.items[dividerSelector], 'text-transform': typoX.textTransform };


      }

      setAttributes({ blockCssY: { items: blockCssY.items } });



    }

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

          <BlockControls>





          </BlockControls>


          <InspectorControls key="general">
            <div className='px-3' initialOpen={false}>


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
                            { label: 'No Wrapper', value: '' },
                            { label: 'H1', value: 'h1' },
                            { label: 'H2', value: 'h2' },
                            { label: 'H3', value: 'h3' },
                            { label: 'H4', value: 'h4' },
                            { label: 'H5', value: 'h5' },
                            { label: 'H6', value: 'h6' },
                            { label: 'span', value: 'SPAN' },
                            { label: 'div', value: 'DIV' },
                            { label: 'P', value: 'p' },
                          ]}
                          onChange={(newVal) => {

                            var options = { ...wrapper.options, tag: newVal };
                            setAttributes({ wrapper: { styles: wrapper.styles, options: options } });

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

                <PanelBody title="Divider" initialOpen={false}>



                </PanelBody>









                <PanelBody title="Custom Style" initialOpen={false}>


                  <p>Please use following class selector to apply your custom CSS</p>
                  <div className='my-3'>
                    <p className='font-bold'>Title Wrapper</p>
                    <p><code>{wrapperSelector}{'{/* your CSS here*/}'}</code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Title link</p>
                    <p><code>{dividerSelector}{'{/* your CSS here*/}'} </code></p>
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

                <PGMailSubsctibe />
                <PGContactSupport utm={{ utm_source: 'BlockPostTitle', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />


              </div>
            </div>


          </InspectorControls >
        </div >
        ,

        <Resizable className={[blockId]} style={{}}

          onResizeStop={(e, direction, ref, d) => {

            console.log(direction);
            console.log(d);
            console.log(paddingTop);
            console.log(paddingBottom);



            if (direction == 'top') {
              setPaddingTop(paddingTop + d.height)
            }

            if (direction == 'bottom') {
              setPaddingBottom(paddingBottom + d.height)
            }





          }}

        >
          {JSON.stringify(paddingTop)} - {JSON.stringify(paddingBottom)}




        </Resizable>
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
      backgroundColor: '#ddd',
      position: 'relative',

    };

    const blockProps = useBlockProps.save({ style: redBackground });


    return (

      <InnerBlocks.Content />

    );

  }
})

