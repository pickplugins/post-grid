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
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor"


var myStore = wp.data.select('postgrid-shop');

function SaveComponent() {
  return <InnerBlocks.Content />
}

function EditComponent() {
  return (
    <div style={{ backgroundColor: "#333", padding: "35px" }}>
      <InnerBlocks />
    </div>
  )
}

registerBlockType("post-grid/layers", {
  title: "Layers",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:

      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 2V11.5H12.5V2H3ZM14.875 6.75V13.875H7.75V16.25H17.25V6.75H14.875ZM19.625 11.5V18.625H12.5V21H22V11.5H19.625Z" />
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
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: {},
          position: {},
          overflow: {},

          width: {},
          height: {},
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
      generateBlockCssY()

    }, [clientId]);


    useEffect(() => {


      setAttributes({ customCss: customCss });

      generateBlockCssY()

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



    function onChangeTextTypo(typoX) {


      setAttributes({ wrapper: { ...wrapper, styles: typoX } });

      var newValuesObjX = {};
      var itemsX = blockCssY.items;


      if (typoX.fontFamily[breakPointX] != undefined) {
        itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'font-family': typoX.fontFamily };


      } else {

        //typoX.fontFamily[breakPointX] = {};
        itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'font-family': typoX.fontFamily };

      }


      if (typoX.fontSize[breakPointX] != undefined) {

        var fontSizeVal = (typoX.fontSize[breakPointX].val) ? typoX.fontSize[breakPointX].val : 16;
        var fontSizeUnit = (typoX.fontSize[breakPointX].unit) ? typoX.fontSize[breakPointX].unit : 'px';


        var fontSizeX = (blockCssY.items[wrapperSelector]['font-size'] != undefined) ? blockCssY.items[wrapperSelector]['font-size'] : {};

        fontSizeX[breakPointX] = fontSizeVal + fontSizeUnit;
        //blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'font-size': fontSizeX };
        itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'font-size': fontSizeX };

      }


      if (typoX.lineHeight[breakPointX] != undefined) {

        var lineHeightVal = (typoX.lineHeight[breakPointX].val) ? typoX.lineHeight[breakPointX].val : 16;
        var lineHeightUnit = (typoX.lineHeight[breakPointX].unit) ? typoX.lineHeight[breakPointX].unit : 'px';


        var lineHeightX = (blockCssY.items[wrapperSelector]['line-height'] != undefined) ? blockCssY.items[wrapperSelector]['line-height'] : {};

        lineHeightX[breakPointX] = lineHeightVal + lineHeightUnit;

        //blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'line-height': lineHeightX };
        itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'line-height': lineHeightX };

      }
      if (typoX.letterSpacing[breakPointX] != undefined) {

        var letterSpacingVal = (typoX.letterSpacing[breakPointX].val) ? typoX.letterSpacing[breakPointX].val : 0;
        var letterSpacingUnit = (typoX.letterSpacing[breakPointX].unit) ? typoX.letterSpacing[breakPointX].unit : 'px';



        var letterSpacingX = (blockCssY.items[wrapperSelector]['letter-spacing'] != undefined) ? blockCssY.items[wrapperSelector]['letter-spacing'] : {};

        letterSpacingX[breakPointX] = letterSpacingVal + letterSpacingUnit;

        //blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'letter-spacing': letterSpacingX };
        itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'letter-spacing': letterSpacingX };

      }

      if (typoX.fontWeight[breakPointX] != undefined) {

        itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'font-weight': typoX.fontWeight };

      }


      if (typoX.textDecoration[breakPointX] != undefined) {

        var str = {};

        var textDecorationX = typoX.textDecoration[breakPointX];
        var textDecorationXStr = (textDecorationX.length > 0) ? textDecorationX.join(' ') : '';

        str[breakPointX] = textDecorationXStr;
        itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'text-decoration': str };



      }
      if (typoX.textTransform[breakPointX] != undefined) {

        itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'text-transform': typoX.textTransform };


      }



      //setAttributes({ blockCssY: { items: blockCssY.items } });
      setAttributes({ blockCssY: { items: itemsX } });



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


          <InspectorControls key="general">
            <div className='px-3' title="Wrapper" initialOpen={false}>



              <div>



                <PanelBody title="Wrapper" initialOpen={false}>



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


                  <PanelRow className='my-3'>
                    <label>Postion</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>

                  <PanelRow>

                    <SelectControl
                      label=""
                      value={wrapper.styles.position[breakPointX]}

                      options={[
                        { label: 'Select..', value: '' },
                        { label: 'static', value: 'static' },
                        { label: 'relative', value: 'relative' },
                        { label: 'fixed', value: 'fixed' },
                        { label: 'absolute', value: 'absolute' },
                        { label: 'sticky', value: 'sticky' },

                      ]}
                      onChange={(newVal) => {

                        var newValuesObj = {};

                        if (Object.keys(wrapper.styles.position).length == 0) {
                          newValuesObj[breakPointX] = newVal;
                        } else {
                          newValuesObj = wrapper.styles.position;
                          newValuesObj[breakPointX] = newVal;
                        }

                        var styles = { ...wrapper.styles, position: newValuesObj };
                        setAttributes({ wrapper: { ...wrapper, styles: styles } });



                        var itemsX = { ...blockCssY.items };
                        itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'position': newValuesObj };

                        setAttributes({ blockCssY: { items: itemsX } });


                      }

                      }
                    />
                  </PanelRow>


                  <PanelRow className='my-3'>
                    <label>Overflow</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>

                  <PanelRow>

                    <SelectControl
                      label=""
                      value={wrapper.styles.overflow[breakPointX]}

                      options={[
                        { label: 'Select..', value: '' },
                        { label: 'visible', value: 'visible' },
                        { label: 'hidden', value: 'hidden' },
                        { label: 'scroll', value: 'scroll' },
                        { label: 'auto', value: 'auto' },

                      ]}
                      onChange={(newVal) => {

                        var newValuesObj = {};

                        if (Object.keys(wrapper.styles.overflow).length == 0) {
                          newValuesObj[breakPointX] = newVal;
                        } else {
                          newValuesObj = wrapper.styles.overflow;
                          newValuesObj[breakPointX] = newVal;
                        }

                        var styles = { ...wrapper.styles, overflow: newValuesObj };
                        setAttributes({ wrapper: { ...wrapper, styles: styles } });



                        var itemsX = { ...blockCssY.items };
                        itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'overflow': newValuesObj };

                        setAttributes({ blockCssY: { items: itemsX } });


                      }

                      }
                    />
                  </PanelRow>

                  <PanelRow>
                    <label>Width</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>

                  <PanelRow>
                    <InputControl
                      value={(wrapper.styles.width[breakPointX] != undefined ? wrapper.styles.width[breakPointX].val : 0)}
                      type="number"
                      onChange={(newVal) => {

                        var newValuesObj = {};
                        if (Object.keys(wrapper.styles.width).length == 0) {
                          newValuesObj[breakPointX] = { val: newVal, unit: 'auto' };
                        } else {
                          newValuesObj = wrapper.styles.width;
                          var unit = (newValuesObj[breakPointX] != undefined) ? newValuesObj[breakPointX].unit : 'auto';

                          newValuesObj[breakPointX] = { val: newVal, unit: unit };
                        }


                        var styles = { ...wrapper.styles, width: newValuesObj };
                        setAttributes({ wrapper: { ...wrapper, styles: styles } });



                        var heightVal = (newValuesObj[breakPointX].val) ? newValuesObj[breakPointX].val : 0;
                        var heightUnit = (newValuesObj[breakPointX].unit) ? newValuesObj[breakPointX].unit : 'auto';


                        var heightX = (blockCssY.items[wrapperSelector] != undefined) ? blockCssY.items[wrapperSelector] : {};

                        if (heightUnit == 'auto') {
                          heightX[breakPointX] = 'auto';
                        } else {
                          heightX[breakPointX] = heightVal + heightUnit;
                        }

                        blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'width': heightX };

                        setAttributes({ blockCssY: { items: blockCssY.items } });


                      }}

                    />

                    <SelectControl className='mb-0'
                      value={(wrapper.styles.width[breakPointX] != undefined) ? wrapper.styles.width[breakPointX].unit : 'auto'}
                      options={[
                        { label: 'Auto', value: 'auto' },

                        { label: 'px', value: 'px' },

                        { label: 'fr', value: 'fr' },
                        { label: '%', value: '%' },
                        { label: 'em', value: 'em' },
                      ]}
                      onChange={(newVal) => {


                        var newValuesObj = {};
                        if (Object.keys(wrapper.styles.width).length == 0) {
                          newValuesObj[breakPointX] = { val: 0, unit: newVal };
                        } else {
                          newValuesObj = wrapper.styles.width;
                          var val = (newValuesObj[breakPointX] != undefined) ? newValuesObj[breakPointX].val : 0;

                          newValuesObj[breakPointX] = { val: val, unit: newVal };
                        }


                        var styles = { ...wrapper.styles, width: newValuesObj };
                        setAttributes({ wrapper: { ...wrapper, styles: styles } });

                        var heightVal = (newValuesObj[breakPointX].val) ? newValuesObj[breakPointX].val : 0;
                        var heightUnit = (newValuesObj[breakPointX].unit) ? newValuesObj[breakPointX].unit : 'auto';

                        var heightX = (blockCssY.items[wrapperSelector] != undefined) ? blockCssY.items[wrapperSelector] : {};

                        //heightX[breakPointX] = heightVal + heightUnit;

                        if (heightUnit == 'auto') {
                          heightX[breakPointX] = 'auto';
                        } else {
                          heightX[breakPointX] = heightVal + heightUnit;
                        }


                        blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'width': heightX };

                        setAttributes({ blockCssY: { items: blockCssY.items } });


                      }}
                    />

                  </PanelRow>




                  <PanelRow>
                    <label>Height</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>

                  <PanelRow>
                    <InputControl
                      value={(wrapper.styles.height[breakPointX] != undefined ? wrapper.styles.height[breakPointX].val : 0)}
                      type="number"
                      onChange={(newVal) => {

                        var newValuesObj = {};
                        if (Object.keys(wrapper.styles.height).length == 0) {
                          newValuesObj[breakPointX] = { val: newVal, unit: 'auto' };
                        } else {
                          newValuesObj = wrapper.styles.height;
                          var unit = (newValuesObj[breakPointX] != undefined) ? newValuesObj[breakPointX].unit : 'auto';

                          newValuesObj[breakPointX] = { val: newVal, unit: unit };
                        }


                        var styles = { ...wrapper.styles, height: newValuesObj };
                        setAttributes({ wrapper: { ...wrapper, styles: styles } });



                        var heightVal = (newValuesObj[breakPointX].val) ? newValuesObj[breakPointX].val : 10;
                        var heightUnit = (newValuesObj[breakPointX].unit) ? newValuesObj[breakPointX].unit : 'auto';


                        var heightX = (blockCssY.items[wrapperSelector] != undefined) ? blockCssY.items[wrapperSelector] : {};

                        //heightX[breakPointX] = heightVal + heightUnit;

                        if (heightUnit == 'auto') {
                          heightX[breakPointX] = 'auto';
                        } else {
                          heightX[breakPointX] = heightVal + heightUnit;
                        }



                        blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'height': heightX };

                        setAttributes({ blockCssY: { items: blockCssY.items } });


                      }}

                    />

                    <SelectControl className='mb-0'
                      value={(wrapper.styles.height[breakPointX] != undefined) ? wrapper.styles.height[breakPointX].unit : 'auto'}
                      options={[
                        { label: 'Auto', value: 'auto' },
                        { label: 'px', value: 'px' },
                        { label: 'fr', value: 'fr' },
                        { label: '%', value: '%' },
                        { label: 'em', value: 'em' },
                      ]}
                      onChange={(newVal) => {


                        var newValuesObj = {};
                        if (Object.keys(wrapper.styles.height).length == 0) {
                          newValuesObj[breakPointX] = { val: 0, unit: newVal };
                        } else {
                          newValuesObj = wrapper.styles.height;
                          var val = (newValuesObj[breakPointX] != undefined) ? newValuesObj[breakPointX].val : 0;

                          newValuesObj[breakPointX] = { val: val, unit: newVal };
                        }


                        var styles = { ...wrapper.styles, height: newValuesObj };
                        setAttributes({ wrapper: { ...wrapper, styles: styles } });

                        var heightVal = (newValuesObj[breakPointX].val) ? newValuesObj[breakPointX].val : 0;
                        var heightUnit = (newValuesObj[breakPointX].unit) ? newValuesObj[breakPointX].unit : 'auto';

                        var heightX = (blockCssY.items[wrapperSelector] != undefined) ? blockCssY.items[wrapperSelector] : {};



                        if (heightUnit == 'auto') {
                          heightX[breakPointX] = 'auto';
                        } else {
                          heightX[breakPointX] = heightVal + heightUnit;
                        }

                        blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'height': heightX };

                        setAttributes({ blockCssY: { items: blockCssY.items } });


                      }}
                    />

                  </PanelRow>





                  <PanelRow className='my-3'>
                    <label>Color</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                  </PanelRow>

                  <ColorPalette
                    value={wrapper.styles.color[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {



                      var newValuesObj = {};


                      if (Object.keys(wrapper.styles.color).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = wrapper.styles.color;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...wrapper.styles, color: newValuesObj };
                      setAttributes({ wrapper: { ...wrapper, styles: styles } });



                      var itemsX = { ...blockCssY.items };
                      itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'color': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });

                    }}
                  />



                  <PanelRow className='my-3'>
                    <label>Background Color</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                  </PanelRow>

                  <ColorPalette
                    value={wrapper.styles.bgColor[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {




                      var newValuesObj = {};


                      if (Object.keys(wrapper.styles.bgColor).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = wrapper.styles.bgColor;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...wrapper.styles, bgColor: newValuesObj };
                      setAttributes({ wrapper: { ...wrapper, styles: styles } });




                      var itemsX = { ...blockCssY.items };
                      itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'background-color': newValuesObj };

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
                      value={wrapper.styles.display[breakPointX]}

                      options={[
                        { label: 'Select..', value: '' },
                        { label: 'inline', value: 'inline' },
                        { label: 'inline-block', value: 'inline-block' },
                        { label: 'block', value: 'block' },
                        { label: 'flex', value: 'flex' },


                      ]}
                      onChange={(newVal) => {

                        var newValuesObj = {};

                        if (Object.keys(wrapper.styles.display).length == 0) {
                          newValuesObj[breakPointX] = newVal;
                        } else {
                          newValuesObj = wrapper.styles.display;
                          newValuesObj[breakPointX] = newVal;
                        }

                        var styles = { ...wrapper.styles, display: newValuesObj };
                        setAttributes({ wrapper: { ...wrapper, styles: styles } });



                        var itemsX = { ...blockCssY.items };
                        itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'display': newValuesObj };

                        setAttributes({ blockCssY: { items: itemsX } });


                      }

                      }
                    />
                  </PanelRow>

                  <PanelRow>
                    <div className='font-bold'>Typography</div>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>

                  <Typography typo={wrapper.styles} breakPointX={breakPointX} onChange={onChangeTextTypo} setAttributes={setAttributes} obj={wrapper} />







                  <PanelRow>
                    <label>Padding</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=''
                    values={wrapper.styles.padding[breakPointX]}
                    onChange={(nextValues) => { paddingControl(nextValues) }}
                  />





                  <PanelRow>
                    <label>Margin</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=""
                    values={wrapper.styles.margin[breakPointX]}
                    onChange={(nextValues) => { marginControl(nextValues) }}
                  />






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
      backgroundColor: '#ddd',
      position: 'relative',

    };

    const blockProps = useBlockProps.save({ style: redBackground });


    return (

      <InnerBlocks.Content />

    );


    //return null;

  }
})