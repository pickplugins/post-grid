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
import { link, linkOff } from "@wordpress/icons";



import IconToggle from '../../components/icon-toggle'
import Typography from '../../components/typography'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import PGIconPicker from '../../components/icon-picker'
import PGcssDisplay from '../../components/css-display'



var myStore = wp.data.select('postgrid-shop');


registerBlockType("post-grid/list", {
  title: "List",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:

      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.71554 16.5689H7.43108C8.12739 16.5689 8.70128 17.0931 8.77972 17.7683L8.78885 17.9267V20.6422C8.78885 21.3386 8.26469 21.9124 7.58942 21.9909L7.43108 22H4.71554C4.01923 22 3.44534 21.4759 3.36691 20.8006L3.35777 20.6422V17.9267C3.35777 17.2304 3.88193 16.6565 4.5572 16.5781L4.71554 16.5689H7.43108H4.71554ZM21.0088 17.9267C21.7587 17.9267 22.3666 18.5346 22.3666 19.2845C22.3666 20.0344 21.7587 20.6422 21.0088 20.6422H12.8622C12.1123 20.6422 11.5044 20.0344 11.5044 19.2845C11.5044 18.5346 12.1123 17.9267 12.8622 17.9267H21.0088ZM7.43108 17.9267H4.71554V20.6422H7.43108V17.9267ZM7.43108 9.78007C8.18095 9.78007 8.78885 10.388 8.78885 11.1378V13.8534C8.78885 14.6032 8.18095 15.2111 7.43108 15.2111H4.71554C3.96567 15.2111 3.35777 14.6032 3.35777 13.8534V11.1378C3.35777 10.388 3.96567 9.78007 4.71554 9.78007H7.43108ZM21.0088 11.1378C21.7587 11.1378 22.3666 11.7457 22.3666 12.4956C22.3666 13.1919 21.8424 13.7658 21.1671 13.8442L21.0088 13.8534H12.8622C12.1123 13.8534 11.5044 13.2455 11.5044 12.4956C11.5044 11.7993 12.0286 11.2254 12.7038 11.147L12.8622 11.1378H21.0088ZM7.43108 11.1378H4.71554V13.8534H7.43108V11.1378ZM8.48289 3.29826C8.84442 3.65979 8.87728 4.22553 8.58149 4.62418L8.48289 4.73839L5.09616 8.12512C4.90519 8.31611 4.64617 8.42338 4.3761 8.42338C4.16004 8.42338 3.95105 8.35473 3.77832 8.22948L3.65603 8.12512L2.29826 6.76735C1.90058 6.36967 1.90058 5.72491 2.29826 5.32722C2.65979 4.96569 3.22552 4.93283 3.62418 5.22862L3.73839 5.32722L4.3761 5.96492L7.04276 3.29826C7.44044 2.90058 8.0852 2.90058 8.48289 3.29826V3.29826ZM21.0088 4.34899C21.7587 4.34899 22.3666 4.95689 22.3666 5.70676C22.3666 6.40306 21.8424 6.97696 21.1671 7.05539L21.0088 7.06453H12.8622C12.1123 7.06453 11.5044 6.45663 11.5044 5.70676C11.5044 5.01045 12.0286 4.43655 12.7038 4.35812L12.8622 4.34899H21.0088Z" />
      </svg>


    ,
  },


  attributes: {


    wrapper: {
      type: 'object',
      default: {
        options: {
          tag: 'ul',
          class: 'pg-accordion',
        },

        styles:
        {
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: {},

        },
      },
    },


    items: {
      type: 'array',
      default: [{ text: '', icon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-chevron-right', }, styles: {}, }],
    },
    item: {
      type: 'object',
      default: {
        options: {
          text: '',
          tag: 'li',
          counter: false,
          reversed: false,
          start: 1,
          type: '1',

          class: 'item',


        },

        styles:
        {
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: {},
          listStyle: {},
          listStylePosition: {},
          listStyleType: {},

        },
      },
    },



    icon: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-chevron-right', class: 'icon', positon: 'before', },

        styles:
        {
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          textAlign: {},
          display: {},

          fontSize: {}, //{ val: '18', unit: 'px' }
          lineHeight: {}, // { val: '18', unit: 'px' }
          fontWeight: { "Desktop": "700" },
          textDecoration: {}, //overline, line-through, underline
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
    var item = attributes.item;


    var icon = attributes.icon;

    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    var postId = context['postId'];
    var postType = context['postType'];

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    const [isLoading, setisLoading] = useState(false);
    const [postGridData, setPostGridData] = useState(window.PostGridPluginData);

    const [isOpen, setisOpen] = useState(false);


    // Wrapper CSS Class Selectors
    var wrapperSelector = blockClass;
    var itemSelector = blockClass + ' .item';
    const iconSelector = blockClass + ' .icon';

    const CustomTag = `${wrapper.options.tag}`;
    const CustomTagItem = `${item.options.tag}`;



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

      var itemX = breakPoints[x];
      breakPointList.push({ label: itemX.name, icon: itemX.icon, value: itemX.id })

    }



    const [iconHtml, setIconHtml] = useState('');

    useEffect(() => {

      var iconSrc = icon.options.iconSrc;
      var iconHtml = `<span class="${iconSrc}"></span>`;

      setIconHtml(iconHtml);
    }, [icon]);








    function handleLinkClick(ev) {

      ev.stopPropagation();
      ev.preventDefault();
      return false;
    }



    function onChangeIcon(arg) {




      var options = { ...icon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
      setAttributes({ icon: { ...icon, options: options } });

    }


    function onChangeIconTypo(typoX) {





      setAttributes({ icon: { ...icon, styles: typoX } });

      var newValuesObjX = {};
      var itemsX = blockCssY.items;





      if (typoX.fontSize[breakPointX] != undefined) {

        var fontSizeVal = (typoX.fontSize[breakPointX].val) ? typoX.fontSize[breakPointX].val : 16;
        var fontSizeUnit = (typoX.fontSize[breakPointX].unit) ? typoX.fontSize[breakPointX].unit : 'px';


        var fontSizeX = (blockCssY.items[iconSelector] != undefined) ? blockCssY.items[iconSelector]['font-size'] : {};

        fontSizeX[breakPointX] = fontSizeVal + fontSizeUnit;
        //blockCssY.items[iconSelector] = { ...blockCssY.items[iconSelector], 'font-size': fontSizeX };
        itemsX[iconSelector] = { ...blockCssY.items[iconSelector], 'font-size': fontSizeX };

      }


      if (typoX.lineHeight[breakPointX] != undefined) {

        var lineHeightVal = (typoX.lineHeight[breakPointX].val) ? typoX.lineHeight[breakPointX].val : 16;
        var lineHeightUnit = (typoX.lineHeight[breakPointX].unit) ? typoX.lineHeight[breakPointX].unit : 'px';


        var lineHeightX = (blockCssY.items[iconSelector]['line-height'] != undefined) ? blockCssY.items[iconSelector]['line-height'] : {};

        lineHeightX[breakPointX] = lineHeightVal + lineHeightUnit;

        //blockCssY.items[iconSelector] = { ...blockCssY.items[iconSelector], 'line-height': lineHeightX };
        itemsX[iconSelector] = { ...blockCssY.items[iconSelector], 'line-height': lineHeightX };

      }


      if (typoX.fontWeight[breakPointX] != undefined) {

        itemsX[iconSelector] = { ...blockCssY.items[iconSelector], 'font-weight': typoX.fontWeight };

      }


      if (typoX.textDecoration[breakPointX] != undefined) {

        var str = {};

        var textDecorationX = typoX.textDecoration[breakPointX];
        var textDecorationXStr = (textDecorationX.length > 0) ? textDecorationX.join(' ') : '';

        str[breakPointX] = textDecorationXStr;
        itemsX[iconSelector] = { ...blockCssY.items[iconSelector], 'text-decoration': str };



      }




      //setAttributes({ blockCssY: { items: blockCssY.items } });
      setAttributes({ blockCssY: { items: itemsX } });


    }


    function paddingControlHeader(nextValues) {


      var responsive = item.styles.padding;
      responsive[breakPointX] = nextValues;


      var styles = { ...item.styles, padding: responsive };
      setAttributes({ item: { ...item, styles: styles } });


      var itemsX = { ...blockCssY.items };



      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[itemSelector] = (blockCssY.items[itemSelector] != undefined) ? blockCssY.items[itemSelector] : {};



      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[itemSelector]['padding-top'] != undefined) ? blockCssY.items[itemSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-top': paddingTop };
        //itemsX[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[itemSelector]['padding-right'] != undefined) ? blockCssY.items[itemSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-right': paddingRight };
        //itemsX[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[itemSelector]['padding-bottom'] != undefined) ? blockCssY.items[itemSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-bottom': paddingBottom };
        //itemsX[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[itemSelector]['padding-left'] != undefined) ? blockCssY.items[itemSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-left': paddingLeft };
        //itemsX[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });
      //setAttributes({ blockCssY: { items: itemsX } });



    }






    function marginControlHeader(nextValues) {

      var responsive = item.styles.margin;
      responsive[breakPointX] = nextValues;



      var styles = { ...item.styles, margin: responsive };
      setAttributes({ item: { ...item, styles: styles } });




      var itemsX = { ...blockCssY.items };

      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[itemSelector] = (blockCssY.items[itemSelector] != undefined) ? blockCssY.items[itemSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[itemSelector]['margin-top'] != undefined) ? blockCssY.items[itemSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-top': marginTop };
        //itemsX[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-top': marginTop };

      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[itemSelector]['margin-right'] !== undefined) ? blockCssY.items[itemSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-right': marginRight };
        //itemsX[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[itemSelector]['margin-bottom'] !== undefined) ? blockCssY.items[itemSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-bottom': marginBottom };
        //itemsX[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[itemSelector]['margin-left'] !== undefined) ? blockCssY.items[itemSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-left': marginLeft };
        //itemsX[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-left': marginLeft };

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
            <div className='px-2' title="Items" initialOpen={false}>


              <PanelBody title="Wrapper" initialOpen={false}>

                <PanelRow>
                  <label for="">Wrapper Tag</label>

                  <SelectControl
                    label=""
                    value={wrapper.options.tag}
                    options={[
                      { label: 'No Wrapper', value: '' },
                      { label: 'Ul', value: 'ul' },
                      { label: 'Ol', value: 'ol' },

                      { label: 'H1', value: 'h1' },
                      { label: 'H2', value: 'h2' },
                      { label: 'H3', value: 'h3' },
                      { label: 'H4', value: 'h4' },
                      { label: 'H5', value: 'h5' },
                      { label: 'H6', value: 'h6' },
                      { label: 'Span', value: 'SPAN' },
                      { label: 'Div', value: 'DIV' },
                      { label: 'P', value: 'p' },


                    ]}
                    onChange={(newVal) => {

                      var options = { ...wrapper.options, tag: newVal };
                      setAttributes({ wrapper: { ...wrapper, options: options } });



                    }

                    }
                  />
                </PanelRow>

                <PanelRow>
                  <label>Display</label>
                  <PGcssDisplay val={wrapper.styles.display[breakPointX]} onChange={(newVal => {


                    var newValuesObj = {};

                    if (Object.keys(wrapper.styles.display).length == 0) {
                      newValuesObj[breakPointX] = newVal;
                    } else {
                      newValuesObj = wrapper.styles.display;
                      newValuesObj[breakPointX] = newVal;
                    }

                    var styles = { ...wrapper.styles, display: newValuesObj };
                    setAttributes({ wrapper: { ...wrapper, styles: styles } });

                    blockCssY.items[authorWrapperSelector] = { ...blockCssY.items[authorWrapperSelector], 'display': newValuesObj };
                    setAttributes({ blockCssY: { items: blockCssY.items } });

                  })} />
                </PanelRow>


              </PanelBody>

              <PanelBody title="Items" initialOpen={false}>



                <PanelRow>
                  <label for="">Wrapper Tag</label>

                  <SelectControl
                    label=""
                    value={item.options.tag}
                    options={[
                      { label: 'Choose', value: '' },
                      { label: 'li', value: 'li' },
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

                      var options = { ...item.options, tag: newVal };
                      setAttributes({ item: { ...item, options: options } });

                    }

                    }
                  />
                </PanelRow>

                {wrapper.options.tag == 'ol' && (

                  <>

                    <ToggleControl
                      label="Reversed?"
                      help={item.options.reversed ? 'Counter reversed?' : 'No reversed'}
                      checked={item.options.reversed ? true : false}
                      onChange={(e) => {



                        var options = { ...item.options, reversed: item.options.reversed ? false : true };
                        setAttributes({ item: { ...item, options: options } });



                      }}
                    />




                    <PanelRow>
                      <label for="">Counter start with</label>

                      <InputControl
                        value={item.options.start}
                        onChange={(newVal) => {
                          var options = { ...item.options, start: newVal };
                          setAttributes({ item: { ...item, options: options } });

                        }
                        }
                      />
                    </PanelRow>


                    <PanelRow>
                      <label for="">Ordered list type?</label>

                      <SelectControl
                        label=""
                        value={item.options.type}
                        options={[
                          { label: 'Choose', value: '' },
                          { label: 'Decimal numbers (1, 2, 3, 4)', value: '1' },
                          { label: 'Alphabetically ordered list', value: 'a' },
                          { label: 'Alphabetically ordered list, uppercase', value: 'A' },
                          { label: 'Roman numbers, lowercase (i, ii, iii, iv)', value: 'i' },
                          { label: 'Roman numbers, uppercase (I, II, III, IV)', value: 'I' },
                        ]}
                        onChange={(newVal) => {

                          var options = { ...item.options, type: newVal };
                          setAttributes({ item: { ...item, options: options } });

                        }

                        }
                      />
                    </PanelRow>


                  </>
                )}





                <PanelRow>
                  <label for="">List style type?</label>

                  <SelectControl
                    label=""
                    value={item.styles.listStyleType[breakPointX]}

                    options={[
                      { label: 'Select..', value: '' },
                      { label: 'disc', value: 'disc' },
                      { label: 'armenian', value: 'armenian' },
                      { label: 'circle', value: 'circle' },
                      { label: 'cjk-ideographic', value: 'cjk-ideographic' },
                      { label: 'decimal', value: 'decimal' },
                      { label: 'decimal-leading-zero', value: 'decimal-leading-zero' },
                      { label: 'georgian', value: 'georgian' },
                      { label: 'hebrew', value: 'hebrew' },
                      { label: 'hiragana', value: 'hiragana' },
                      { label: 'hiragana-iroha', value: 'hiragana-iroha' },
                      { label: 'katakana', value: 'katakana' },
                      { label: 'katakana-iroha', value: 'katakana-iroha' },
                      { label: 'lower-alpha', value: 'lower-alpha' },
                      { label: 'lower-greek', value: 'lower-greek' },
                      { label: 'lower-latin', value: 'lower-latin' },
                      { label: 'lower-roman', value: 'lower-roman' },
                      { label: 'square', value: 'square' },
                      { label: 'upper-alpha', value: 'upper-alpha' },
                      { label: 'upper-greek', value: 'upper-greek' },
                      { label: 'upper-latin', value: 'upper-latin' },
                      { label: 'upper-roman', value: 'upper-roman' },
                      { label: 'none', value: 'none' },

                    ]}
                    onChange={(newVal) => {



                      var newValuesObj = {};


                      if (Object.keys(item.styles.listStyleType).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = item.styles.listStyleType;
                        newValuesObj[breakPointX] = newVal;
                      }


                      var styles = { ...item.styles, listStyleType: newValuesObj };
                      setAttributes({ item: { ...item, styles: styles } });


                      var newValuesObjX = {};
                      if (blockCssY.items[itemSelector] == undefined) {

                        newValuesObjX[itemSelector] = { ...blockCssY.items[itemSelector], 'list-style-type': newValuesObj };

                      } else {

                        newValuesObjX[itemSelector] = { ...blockCssY.items[itemSelector], 'list-style-type': newValuesObj };
                      }


                      setAttributes({ blockCssY: { items: newValuesObjX } });


                    }

                    }
                  />
                </PanelRow>



                <PanelRow>
                  <label for="">List style position?</label>

                  <SelectControl
                    label=""
                    value={item.styles.listStylePosition[breakPointX]}

                    options={[
                      { label: 'Select..', value: '' },
                      { label: 'inside', value: 'inside' },
                      { label: 'outside', value: 'outside' },


                    ]}
                    onChange={(newVal) => {



                      var newValuesObj = {};


                      if (Object.keys(item.styles.listStylePosition).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = item.styles.listStylePosition;
                        newValuesObj[breakPointX] = newVal;
                      }


                      var styles = { ...item.styles, listStylePosition: newValuesObj };
                      setAttributes({ item: { ...item, styles: styles } });


                      var newValuesObjX = {};
                      if (blockCssY.items[itemSelector] == undefined) {

                        newValuesObjX[itemSelector] = { ...blockCssY.items[itemSelector], 'list-style-position': newValuesObj };

                      } else {

                        newValuesObjX[itemSelector] = { ...blockCssY.items[itemSelector], 'list-style-position': newValuesObj };
                      }


                      setAttributes({ blockCssY: { items: newValuesObjX } });


                    }

                    }
                  />
                </PanelRow>




                <PanelRow className='my-3'>
                  <label>Color</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                </PanelRow>

                <ColorPalette
                  value={item.styles.color[breakPointX]}
                  colors={colorsPresets}
                  enableAlpha
                  onChange={(newVal) => {



                    var newValuesObj = {};


                    if (Object.keys(item.styles.color).length == 0) {
                      newValuesObj[breakPointX] = newVal;
                    } else {
                      newValuesObj = item.styles.color;
                      newValuesObj[breakPointX] = newVal;
                    }

                    var styles = { ...item.styles, color: newValuesObj };
                    setAttributes({ item: { ...item, styles: styles } });



                    var itemsX = { ...blockCssY.items };
                    itemsX[itemSelector] = { ...blockCssY.items[itemSelector], 'color': newValuesObj };

                    setAttributes({ blockCssY: { items: itemsX } });

                  }}
                />



                <PanelRow className='my-3'>
                  <label>Background Color</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                </PanelRow>

                <ColorPalette
                  value={item.styles.bgColor[breakPointX]}
                  colors={colorsPresets}
                  enableAlpha
                  onChange={(newVal) => {




                    var newValuesObj = {};


                    if (Object.keys(item.styles.bgColor).length == 0) {
                      newValuesObj[breakPointX] = newVal;
                    } else {
                      newValuesObj = item.styles.bgColor;
                      newValuesObj[breakPointX] = newVal;
                    }

                    var styles = { ...item.styles, bgColor: newValuesObj };
                    setAttributes({ item: { ...item, styles: styles } });




                    var itemsX = { ...blockCssY.items };
                    itemsX[itemSelector] = { ...blockCssY.items[itemSelector], 'background-color': newValuesObj };

                    setAttributes({ blockCssY: { items: itemsX } });





                  }}
                />




                <PanelRow>
                  <label>Padding</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                </PanelRow>
                <BoxControl
                  label=''
                  values={item.styles.padding[breakPointX]}
                  onChange={(nextValues) => { paddingControlHeader(nextValues) }}
                />





                <PanelRow>
                  <label>Margin</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                </PanelRow>
                <BoxControl
                  label=""
                  values={item.styles.margin[breakPointX]}
                  onChange={(nextValues) => { marginControlHeader(nextValues) }}
                />






              </PanelBody>




              <PanelBody title="Icon" initialOpen={false}>


                <PanelRow>
                  <label for="">Choose Icon</label>
                  <PGIconPicker library={icon.options.library} srcType={icon.options.srcType} iconSrc={icon.options.iconSrc} onChange={onChangeIcon} />
                </PanelRow>

                <PanelRow>
                  <label for="">Icon postion</label>
                  <SelectControl
                    label=""
                    value={icon.options.position}
                    options={[
                      { label: 'Choose...', value: '' },
                      { label: 'Left', value: 'left' },
                      { label: 'Before Text', value: 'before' },
                      { label: 'After Text', value: 'after' },
                      { label: 'Right', value: 'right' },
                    ]}
                    onChange={(newVal) => {
                      var options = { ...icon.options, position: newVal };
                      setAttributes({ icon: { ...icon, options: options } });
                    }
                    }
                  />
                </PanelRow>




                <PanelRow className='my-3'>
                  <label>Color</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                </PanelRow>

                <ColorPalette
                  value={icon.styles.color[breakPointX]}
                  colors={colorsPresets}
                  enableAlpha
                  onChange={(newVal) => {



                    var newValuesObj = {};


                    if (Object.keys(icon.styles.color).length == 0) {
                      newValuesObj[breakPointX] = newVal;
                    } else {
                      newValuesObj = icon.styles.color;
                      newValuesObj[breakPointX] = newVal;
                    }

                    var styles = { ...icon.styles, color: newValuesObj };
                    setAttributes({ icon: { ...icon, styles: styles } });



                    var itemsX = { ...blockCssY.items };
                    itemsX[iconSelector] = { ...blockCssY.items[iconSelector], 'color': newValuesObj };

                    setAttributes({ blockCssY: { items: itemsX } });


                  }}
                />



                <PanelRow className='my-3'>
                  <label>Background Color</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                </PanelRow>

                <ColorPalette
                  value={icon.styles.bgColor[breakPointX]}
                  colors={colorsPresets}
                  enableAlpha
                  onChange={(newVal) => {






                    var newValuesObj = {};


                    if (Object.keys(icon.styles.bgColor).length == 0) {
                      newValuesObj[breakPointX] = newVal;
                    } else {
                      newValuesObj = icon.styles.bgColor;
                      newValuesObj[breakPointX] = newVal;
                    }

                    var styles = { ...icon.styles, bgColor: newValuesObj };
                    setAttributes({ icon: { ...icon, styles: styles } });





                    var itemsX = { ...blockCssY.items };
                    itemsX[iconSelector] = { ...blockCssY.items[iconSelector], 'background-color': newValuesObj };

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
                    value={icon.styles.display[breakPointX]}

                    options={[
                      { label: 'Select..', value: '' },
                      { label: 'inline', value: 'inline' },
                      { label: 'inline-block', value: 'inline-block' },
                      { label: 'block', value: 'block' },

                    ]}
                    onChange={(newVal) => {

                      var newValuesObj = {};

                      if (Object.keys(icon.styles.display).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = icon.styles.display;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...icon.styles, display: newValuesObj };
                      setAttributes({ icon: { ...icon, styles: styles } });



                      var itemsX = { ...blockCssY.items };
                      itemsX[iconSelector] = { ...blockCssY.items[iconSelector], 'display': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });


                    }

                    }
                  />
                </PanelRow>

                <PanelRow>
                  <label>Padding</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                </PanelRow>
                <BoxControl
                  label=''
                  values={icon.styles.padding[breakPointX]}
                  onChange={(nextValues) => {


                    var responsive = icon.styles.padding;
                    responsive[breakPointX] = nextValues;


                    var styles = { ...icon.styles, padding: responsive };
                    setAttributes({ icon: { ...icon, styles: styles } });

                    var itemsX = { ...blockCssY.items };

                    blockCssY.items[iconSelector] = (blockCssY.items[iconSelector] != undefined) ? blockCssY.items[iconSelector] : {};

                    if (nextValues.top != undefined) {

                      var paddingTop = (blockCssY.items[iconSelector]['padding-top'] != undefined) ? blockCssY.items[iconSelector]['padding-top'] : {};
                      paddingTop[breakPointX] = nextValues.top
                      blockCssY.items[iconSelector] = { ...blockCssY.items[iconSelector], 'padding-top': paddingTop };
                    }


                    if (nextValues.right != undefined) {

                      var paddingRight = (blockCssY.items[iconSelector]['padding-right'] != undefined) ? blockCssY.items[iconSelector]['padding-right'] : {};
                      paddingRight[breakPointX] = nextValues.right
                      blockCssY.items[iconSelector] = { ...blockCssY.items[iconSelector], 'padding-right': paddingRight };
                    }

                    if (nextValues.bottom != undefined) {

                      var paddingBottom = (blockCssY.items[iconSelector]['padding-bottom'] != undefined) ? blockCssY.items[iconSelector]['padding-bottom'] : {};
                      paddingBottom[breakPointX] = nextValues.bottom
                      blockCssY.items[iconSelector] = { ...blockCssY.items[iconSelector], 'padding-bottom': paddingBottom };
                    }

                    if (nextValues.left != undefined) {

                      var paddingLeft = (blockCssY.items[iconSelector]['padding-left'] != undefined) ? blockCssY.items[iconSelector]['padding-left'] : {};
                      paddingLeft[breakPointX] = nextValues.left

                      blockCssY.items[iconSelector] = { ...blockCssY.items[iconSelector], 'padding-left': paddingLeft };
                    }

                    setAttributes({ blockCssY: { items: blockCssY.items } });



                  }}
                />

                <PanelRow>
                  <label>Margin</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                </PanelRow>
                <BoxControl
                  label=""
                  values={icon.styles.margin[breakPointX]}
                  onChange={(nextValues) => {


                    var responsive = icon.styles.margin;
                    responsive[breakPointX] = nextValues;

                    var styles = { ...icon.styles, margin: responsive };
                    setAttributes({ icon: { ...icon, styles: styles } });

                    var itemsX = { ...blockCssY.items };

                    blockCssY.items[iconSelector] = (blockCssY.items[iconSelector] != undefined) ? blockCssY.items[iconSelector] : {};

                    if (nextValues.top != undefined) {
                      var marginTop = (blockCssY.items[iconSelector]['margin-top'] != undefined) ? blockCssY.items[iconSelector]['margin-top'] : {};
                      marginTop[breakPointX] = nextValues.top

                      blockCssY.items[iconSelector] = { ...blockCssY.items[iconSelector], 'margin-top': marginTop };

                    }


                    if (nextValues.right != undefined) {

                      var marginRight = (blockCssY.items[iconSelector]['margin-right'] !== undefined) ? blockCssY.items[iconSelector]['margin-right'] : {};
                      marginRight[breakPointX] = nextValues.right

                      blockCssY.items[iconSelector] = { ...blockCssY.items[iconSelector], 'margin-right': marginRight };

                    }

                    if (nextValues.bottom != undefined) {

                      var marginBottom = (blockCssY.items[iconSelector]['margin-bottom'] !== undefined) ? blockCssY.items[iconSelector]['margin-bottom'] : {};
                      marginBottom[breakPointX] = nextValues.bottom

                      blockCssY.items[iconSelector] = { ...blockCssY.items[iconSelector], 'margin-bottom': marginBottom };

                    }

                    if (nextValues.left != undefined) {

                      var marginLeft = (blockCssY.items[iconSelector]['margin-left'] !== undefined) ? blockCssY.items[iconSelector]['margin-left'] : {};
                      marginLeft[breakPointX] = nextValues.left

                      blockCssY.items[iconSelector] = { ...blockCssY.items[iconSelector], 'margin-left': marginLeft };

                    }

                    setAttributes({ blockCssY: { items: blockCssY.items } });



                  }}
                />


                <PanelRow>
                  <div className='font-bold'>Typography</div>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                </PanelRow>

                <Typography typo={icon.styles} breakPointX={breakPointX} onChange={onChangeIconTypo} setAttributes={setAttributes} obj={icon} />




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
        </div >
        ,


        <>

          {wrapper.options.tag && (

            <CustomTag className={[blockId]}
              reversed={item.options.reversed ? 'reversed' : ''}
              start={item.options.start}

            >


              {items.map((itemX, i) => {

                return (

                  <>

                    <CustomTagItem className={` cursor-pointer ${item.options.class}`} onClick={ev => {


                      var ssdsd = items.concat([]);

                      setAttributes({ items: ssdsd });

                    }}>

                      {icon.options.position == 'left' && (
                        <>

                          <span className='icon' dangerouslySetInnerHTML={{ __html: iconHtml }} />

                        </>
                      )}


                      {icon.options.position == 'before' && (
                        <>

                          <span className='icon' dangerouslySetInnerHTML={{ __html: iconHtml }} />

                        </>
                      )}




                      <RichText

                        tagName='span'
                        value={itemX.text}
                        allowedFormats={['core/bold', 'core/italic', 'core/link']}

                        onChange={(content) => {

                          console.log('#onChange');


                          items[i].text = content;
                          var ssdsd = items.concat([]);

                          setAttributes({ items: ssdsd });
                        }}
                        placeholder={__('Start Writing...')}
                      />




                      {icon.options.position == 'after' && (
                        <>

                          <span className='icon' dangerouslySetInnerHTML={{ __html: iconHtml }} />


                        </>
                      )}


                      {icon.options.position == 'right' && (
                        <>

                          <span className='icon float-right' dangerouslySetInnerHTML={{ __html: iconHtml }} />


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


                    </CustomTagItem>






                  </>

                )

              })}




            </CustomTag>
          )}

          <div className={[blockId]}>

            <div className='bg-blue-500 p-2 px-5 text-white my-4 text-center cursor-pointer' onClick={ev => {

              var itemx = items.concat({ text: '', icon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fas fa-chevron-right', }, styles: {}, });

              setAttributes({ items: itemx });


            }}>Add</div>



          </div>


        </>
      ]

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file





    return null;
  }
})