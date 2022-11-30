import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover, Spinner } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'
import { link, linkOff } from "@wordpress/icons";

import IconToggle from '../../components/icon-toggle'
import Typography from '../../components/typography'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import PGcssTextAlign from '../../components/css-text-align'



var myStore = wp.data.select('postgrid-shop');



registerBlockType("post-grid/text", {
  title: "Text",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:
      <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 391C25 388.239 27.2386 386 30 386H470C472.761 386 475 388.239 475 391V441C475 443.761 472.761 446 470 446H30C27.2386 446 25 443.761 25 441V391Z" />
        <path d="M283 285C283 282.239 285.239 280 288 280H470C472.761 280 475 282.239 475 285V335C475 337.761 472.761 340 470 340H288C285.239 340 283 337.761 283 335V285Z" />
        <path d="M46.3955 115.771C36.5811 115.771 31.6738 111.519 31.6738 103.013V78.2803C31.6738 69.7744 36.5811 65.5215 46.3955 65.5215H248.181C257.995 65.5215 262.902 69.7744 262.902 78.2803V103.013C262.902 111.519 257.995 115.771 248.181 115.771H175.946V336.204C175.946 343.401 172.675 347 166.132 347H128.444C121.901 347 118.63 343.401 118.63 336.204V115.771H46.3955Z" />
      </svg>

    ,
  },


  attributes: {


    text: {
      type: 'object',
      default: {
        options: {
          content: '',
          tag: 'div',
          class: 'pg-text',
        },

        styles:
        {
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: {},
          fontSize: {}, //{ val: '18', unit: 'px' }
          lineHeight: {}, // { val: '18', unit: 'px' }
          letterSpacing: {}, // { val: '18', unit: 'px' }
          fontFamily: {},
          fontWeight: {},
          textDecoration: {}, //overline, line-through, underline
          textTransform: {},
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

    console.log(clientId);



    var blockId = attributes.blockId;

    var blockIdX = attributes.blockId ? attributes.blockId : 'pg' + clientId.split('-').pop();
    var blockClass = '.' + blockIdX;

    var text = attributes.text;

    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    var postId = context['postId'];
    var postType = context['postType'];

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    const [isLoading, setisLoading] = useState(false);
    const [postGridData, setPostGridData] = useState(window.PostGridPluginData);


    // Wrapper CSS Class Selectors
    var textSelector = blockClass;


    useEffect(() => {

      setAttributes({ blockId: blockIdX });
      generateBlockCssY()

    }, [clientId]);


    useEffect(() => {


      setAttributes({ customCss: customCss });

      generateBlockCssY()

    }, [customCss]);



    useEffect(() => {

      generateBlockCssY();

    }, [blockId]);


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



    function onChangeTextTypo(typoX) {


      setAttributes({ text: { ...text, styles: typoX } });

      var newValuesObjX = {};
      var itemsX = blockCssY.items;


      if (typoX.fontFamily[breakPointX] != undefined) {
        itemsX[textSelector] = { ...blockCssY.items[textSelector], 'font-family': typoX.fontFamily };


      } else {

        //typoX.fontFamily[breakPointX] = {};
        itemsX[textSelector] = { ...blockCssY.items[textSelector], 'font-family': typoX.fontFamily };

      }


      if (typoX.fontSize[breakPointX] != undefined) {

        var fontSizeVal = (typoX.fontSize[breakPointX].val) ? typoX.fontSize[breakPointX].val : 16;
        var fontSizeUnit = (typoX.fontSize[breakPointX].unit) ? typoX.fontSize[breakPointX].unit : 'px';


        var fontSizeX = (blockCssY.items[textSelector]['font-size'] != undefined) ? blockCssY.items[textSelector]['font-size'] : {};

        fontSizeX[breakPointX] = fontSizeVal + fontSizeUnit;
        //blockCssY.items[textSelector] = { ...blockCssY.items[textSelector], 'font-size': fontSizeX };
        itemsX[textSelector] = { ...blockCssY.items[textSelector], 'font-size': fontSizeX };

      }


      if (typoX.lineHeight[breakPointX] != undefined) {

        var lineHeightVal = (typoX.lineHeight[breakPointX].val) ? typoX.lineHeight[breakPointX].val : 16;
        var lineHeightUnit = (typoX.lineHeight[breakPointX].unit) ? typoX.lineHeight[breakPointX].unit : 'px';


        var lineHeightX = (blockCssY.items[textSelector]['line-height'] != undefined) ? blockCssY.items[textSelector]['line-height'] : {};

        lineHeightX[breakPointX] = lineHeightVal + lineHeightUnit;

        //blockCssY.items[textSelector] = { ...blockCssY.items[textSelector], 'line-height': lineHeightX };
        itemsX[textSelector] = { ...blockCssY.items[textSelector], 'line-height': lineHeightX };

      }
      if (typoX.letterSpacing[breakPointX] != undefined) {

        var letterSpacingVal = (typoX.letterSpacing[breakPointX].val) ? typoX.letterSpacing[breakPointX].val : 0;
        var letterSpacingUnit = (typoX.letterSpacing[breakPointX].unit) ? typoX.letterSpacing[breakPointX].unit : 'px';



        var letterSpacingX = (blockCssY.items[textSelector]['letter-spacing'] != undefined) ? blockCssY.items[textSelector]['letter-spacing'] : {};

        letterSpacingX[breakPointX] = letterSpacingVal + letterSpacingUnit;

        //blockCssY.items[textSelector] = { ...blockCssY.items[textSelector], 'letter-spacing': letterSpacingX };
        itemsX[textSelector] = { ...blockCssY.items[textSelector], 'letter-spacing': letterSpacingX };

      }

      if (typoX.fontWeight[breakPointX] != undefined) {

        itemsX[textSelector] = { ...blockCssY.items[textSelector], 'font-weight': typoX.fontWeight };

      }


      if (typoX.textDecoration[breakPointX] != undefined) {

        var str = {};

        var textDecorationX = typoX.textDecoration[breakPointX];
        var textDecorationXStr = (textDecorationX.length > 0) ? textDecorationX.join(' ') : '';

        str[breakPointX] = textDecorationXStr;
        itemsX[textSelector] = { ...blockCssY.items[textSelector], 'text-decoration': str };



      }
      if (typoX.textTransform[breakPointX] != undefined) {

        itemsX[textSelector] = { ...blockCssY.items[textSelector], 'text-transform': typoX.textTransform };


      }



      //setAttributes({ blockCssY: { items: blockCssY.items } });
      setAttributes({ blockCssY: { items: itemsX } });



    }


    function paddingControl(nextValues) {


      var responsive = text.styles.padding;
      responsive[breakPointX] = nextValues;


      var styles = { ...text.styles, padding: responsive };
      setAttributes({ text: { ...text, styles: styles } });


      var itemsX = { ...blockCssY.items };



      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[textSelector] = (blockCssY.items[textSelector] != undefined) ? blockCssY.items[textSelector] : {};



      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[textSelector]['padding-top'] != undefined) ? blockCssY.items[textSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[textSelector] = { ...blockCssY.items[textSelector], 'padding-top': paddingTop };
        //itemsX[textSelector] = { ...blockCssY.items[textSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[textSelector]['padding-right'] != undefined) ? blockCssY.items[textSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[textSelector] = { ...blockCssY.items[textSelector], 'padding-right': paddingRight };
        //itemsX[textSelector] = { ...blockCssY.items[textSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[textSelector]['padding-bottom'] != undefined) ? blockCssY.items[textSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[textSelector] = { ...blockCssY.items[textSelector], 'padding-bottom': paddingBottom };
        //itemsX[textSelector] = { ...blockCssY.items[textSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[textSelector]['padding-left'] != undefined) ? blockCssY.items[textSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[textSelector] = { ...blockCssY.items[textSelector], 'padding-left': paddingLeft };
        //itemsX[textSelector] = { ...blockCssY.items[textSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });
      //setAttributes({ blockCssY: { items: itemsX } });



    }





    function marginControl(nextValues) {

      var responsive = text.styles.margin;
      responsive[breakPointX] = nextValues;



      var styles = { ...text.styles, margin: responsive };
      setAttributes({ text: { ...text, styles: styles } });




      var itemsX = { ...blockCssY.items };

      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[textSelector] = (blockCssY.items[textSelector] != undefined) ? blockCssY.items[textSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[textSelector]['margin-top'] != undefined) ? blockCssY.items[textSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[textSelector] = { ...blockCssY.items[textSelector], 'margin-top': marginTop };
        //itemsX[textSelector] = { ...blockCssY.items[textSelector], 'margin-top': marginTop };

      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[textSelector]['margin-right'] !== undefined) ? blockCssY.items[textSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[textSelector] = { ...blockCssY.items[textSelector], 'margin-right': marginRight };
        //itemsX[textSelector] = { ...blockCssY.items[textSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[textSelector]['margin-bottom'] !== undefined) ? blockCssY.items[textSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[textSelector] = { ...blockCssY.items[textSelector], 'margin-bottom': marginBottom };
        //itemsX[textSelector] = { ...blockCssY.items[textSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[textSelector]['margin-left'] !== undefined) ? blockCssY.items[textSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[textSelector] = { ...blockCssY.items[textSelector], 'margin-left': marginLeft };
        //itemsX[textSelector] = { ...blockCssY.items[textSelector], 'margin-left': marginLeft };

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

      generateBlockCssY()

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
        generateBlockCssY();

      });



    }


    return (
      [


        <div>

          <BlockControls >
            <AlignmentToolbar
              value={text.styles.textAlign}
              onChange={(newVal) => {


                var newValuesObj = {};


                if (Object.keys(text.styles.textAlign).length == 0) {
                  newValuesObj[breakPointX] = newVal;
                } else {
                  newValuesObj = text.styles.textAlign;
                  newValuesObj[breakPointX] = newVal;
                }


                var styles = { ...text.styles, textAlign: newValuesObj };
                setAttributes({ text: { ...text, styles: styles } });




                var itemsX = { ...blockCssY.items };
                itemsX[textSelector] = { ...blockCssY.items[textSelector], 'text-align': newValuesObj };

                setAttributes({ blockCssY: { items: itemsX } });






              }}
            />







          </BlockControls>


          <InspectorControls key="general">
            <div className='px-3' title="Text" initialOpen={false}>



              <div>



                <PanelBody title="Text" initialOpen={false}>

                  <PanelRow>
                    <label for="">Block ID</label>

                    <InputControl
                      value={blockId}
                      onChange={(newVal) => {

                        setAttributes({ blockId: newVal });

                      }}
                    />

                  </PanelRow>


                  <PanelRow>
                    <label for="">Wrapper Tag</label>

                    <SelectControl
                      label=""
                      value={text.options.tag}
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



                        var options = { ...text.options, tag: newVal };
                        setAttributes({ text: { ...text, options: options } });



                      }

                      }
                    />
                  </PanelRow>

                  <PanelRow>
                    <label></label>
                    <PGcssTextAlign val={text.styles.textAlign[breakPointX]} onChange={(newVal => {

                      console.log(newVal);

                      var newValuesObj = {};

                      if (Object.keys(text.styles.textAlign).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = text.styles.textAlign;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...text.styles, textAlign: newValuesObj };
                      setAttributes({ text: { ...text, styles: styles } });

                      blockCssY.items[textSelector] = { ...blockCssY.items[textSelector], 'text-align': newValuesObj };
                      setAttributes({ blockCssY: { items: blockCssY.items } });




                    })} />
                  </PanelRow>

                  <PanelRow className='my-3'>
                    <label>Color</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                  </PanelRow>

                  <ColorPalette
                    value={text.styles.color[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {



                      var newValuesObj = {};


                      if (Object.keys(text.styles.color).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = text.styles.color;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...text.styles, color: newValuesObj };
                      setAttributes({ text: { ...text, styles: styles } });



                      var itemsX = { ...blockCssY.items };
                      itemsX[textSelector] = { ...blockCssY.items[textSelector], 'color': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });

                    }}
                  />



                  <PanelRow className='my-3'>
                    <label>Background Color</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                  </PanelRow>

                  <ColorPalette
                    value={text.styles.bgColor[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {




                      var newValuesObj = {};


                      if (Object.keys(text.styles.bgColor).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = text.styles.bgColor;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...text.styles, bgColor: newValuesObj };
                      setAttributes({ text: { ...text, styles: styles } });




                      var itemsX = { ...blockCssY.items };
                      itemsX[textSelector] = { ...blockCssY.items[textSelector], 'background-color': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });





                    }}
                  />

                  <PanelRow className='my-3'>
                    <label>Display</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>

                  <PanelRow>

                    <SelectControl
                      label=""
                      value={text.styles.display[breakPointX]}

                      options={[
                        { label: 'Select..', value: '' },
                        { label: 'inline', value: 'inline' },
                        { label: 'inline-block', value: 'inline-block' },
                        { label: 'block', value: 'block' },

                      ]}
                      onChange={(newVal) => {

                        var newValuesObj = {};

                        if (Object.keys(text.styles.display).length == 0) {
                          newValuesObj[breakPointX] = newVal;
                        } else {
                          newValuesObj = text.styles.display;
                          newValuesObj[breakPointX] = newVal;
                        }

                        var styles = { ...text.styles, display: newValuesObj };
                        setAttributes({ text: { ...text, styles: styles } });



                        var itemsX = { ...blockCssY.items };
                        itemsX[textSelector] = { ...blockCssY.items[textSelector], 'display': newValuesObj };

                        setAttributes({ blockCssY: { items: itemsX } });


                      }

                      }
                    />
                  </PanelRow>

                  <PanelRow>
                    <div className='font-bold'>Typography</div>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>

                  <Typography typo={text.styles} breakPointX={breakPointX} onChange={onChangeTextTypo} setAttributes={setAttributes} obj={text} />







                  <PanelRow>
                    <label>Padding</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=''
                    values={text.styles.padding[breakPointX]}
                    onChange={(nextValues) => { paddingControl(nextValues) }}
                  />





                  <PanelRow>
                    <label>Margin</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=""
                    values={text.styles.margin[breakPointX]}
                    onChange={(nextValues) => { marginControl(nextValues) }}
                  />






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

          <RichText
            className={[blockId]}
            tagName={text.options.tag}
            value={text.options.content}
            allowedFormats={['core/bold', 'core/italic', 'core/link']}
            onChange={(content) => {
              var options = { ...text.styles, content: content };
              setAttributes({ text: { ...text, options: options } });
            }}
            placeholder={__('Start Writing...')}
          />


        </>
      ]

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})