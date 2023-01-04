import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { applyFilters } from '@wordpress/hooks';

import { PanelBody, RangeControl, Button, ButtonGroup, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover, Spinner } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'
import apiFetch from '@wordpress/api-fetch';

import { link, linkOff } from "@wordpress/icons";
import { Icon, close } from '@wordpress/icons';

import IconToggle from '../../components/icon-toggle'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import BreakpointToggle from '../../components/breakpoint-toggle'
import PGDropdown from '../../components/dropdown'
import PGtoggle from '../../components/toggle'
import colorsPresets from '../../colors-presets'
import PGcssDisplay from '../../components/css-display'

import MyImage from './placeholder.jpg';


var myStore = wp.data.select('postgrid-shop');

registerBlockType("post-grid/image", {
  title: "Image",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:



      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.125 5H3.875C2.83945 5 2 5.83945 2 6.875V18.125C2 19.1605 2.83945 20 3.875 20H20.125C21.1605 20 22 19.1605 22 18.125V6.875C22 5.83945 21.1605 5 20.125 5ZM19.8906 18.125H4.10938C4.04721 18.125 3.9876 18.1003 3.94365 18.0564C3.89969 18.0124 3.875 17.9528 3.875 17.8906V7.10938C3.875 7.04721 3.89969 6.9876 3.94365 6.94365C3.9876 6.89969 4.04721 6.875 4.10938 6.875H19.8906C19.9528 6.875 20.0124 6.89969 20.0564 6.94365C20.1003 6.9876 20.125 7.04721 20.125 7.10938V17.8906C20.125 17.9528 20.1003 18.0124 20.0564 18.0564C20.0124 18.1003 19.9528 18.125 19.8906 18.125V18.125ZM7 8.4375C6.13707 8.4375 5.4375 9.13707 5.4375 10C5.4375 10.8629 6.13707 11.5625 7 11.5625C7.86293 11.5625 8.5625 10.8629 8.5625 10C8.5625 9.13707 7.86293 8.4375 7 8.4375ZM5.75 16.25H18.25V13.125L14.8314 9.70645C14.6484 9.5234 14.3516 9.5234 14.1685 9.70645L9.5 14.375L7.95645 12.8314C7.7734 12.6484 7.4766 12.6484 7.29352 12.8314L5.75 14.375V16.25Z" />
      </svg>



    ,
  },


  attributes: {


    wrapper: {
      type: 'object',
      default: {
        options: { tag: 'div', class: '', useAsBackground: 'no' },

        styles:
        {
          textAlign: {},
          width: {},

          height: {},

          overflow: {},

          color: {},
          bgColor: {},
          bgImage: {},
          bgPosition: {},
          bgSize: {},
          display: {},
          borderRadius: {},
          padding: {},
          margin: {}
        },
      },
    },

    image: {
      type: 'object',
      default: {
        options: {
          imgSrcType: 'media', /*media, customField, customUrl, imgId */
          imgSrcMetaKey: '',
          imgSrcMetaKeyType: 'ID', //ID, URL,

          imgSrcImgId: '',

          srcUrl: '',
          srcId: '',
          tag: 'div',
          linkTo: '', // postUrl, customField, authorUrl, authorLink, homeUrl, custom
          linkToMetaKey: '',
          linkTocustomUrl: '',
          altTextSrc: 'imgAltText', // imgAltText, imgTitle, imgCaption, imgDescription imgName, imgSlug, postTitle, excerpt, postSlug, customField, custom
          altTextCustom: '',
          altTextMetaKey: '',

          linkTarget: '_blank',
          linkAttr: [],
          class: '',
          size: { "Desktop": "full", "Tablet": "full", "Mobile": "full" },

        },

        styles: {
          textAlign: {},
          display: {},
          width: { "Desktop": { "val": "100", "unit": "%" } },
          height: { "Desktop": { "val": "", "unit": "auto" } },
          filter: {},
          objectFit: {},
          padding: {},
          margin: {}
        },
        hoverStyles:
        {

          filter: {},
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



    let image = attributes.image;
    var wrapper = attributes.wrapper;
    var blockId = attributes.blockId;

    var blockIdX = attributes.blockId ? attributes.blockId : 'pg' + clientId.split('-').pop();
    var blockClass = '.' + blockIdX;

    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;
    var demoImg = 'src/blocks/post-featured-image/placeholder.jpg';


    var postId = context['postId'];
    var postType = context['postType'];

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());

    const [loading, setLoading] = useState(false);

    const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);
    const [linkPickerSrcUrl, setlinkPickerSrcUrl] = useState(false);


    const [postImage, setPostImage] = useState(null);
    const [imageObj, setImageObj] = useState({}); //{src:'', altText:'', sizes:{}}

    const [imageSizes, setImageSizes] = useState([]);
    let filterArgsBasic = [

      { label: 'Blur', isPro: false, value: 'blur', val: '', unit: 'px' },
      { label: 'Brightness', isPro: false, value: 'brightness', val: '10', unit: '%' },
      { label: 'Contrast', isPro: true, value: 'contrast', val: '10', unit: '%' },
      { label: 'Grayscale', isPro: true, value: 'grayscale', val: '10', unit: '%' },
      { label: 'Hue-rotate', isPro: true, value: 'hue-rotate', val: '10', unit: 'deg' },
      { label: 'Invert', isPro: true, value: 'invert', val: '10', unit: '%' },
      { label: 'Opacity', isPro: true, value: 'opacity', val: '10', unit: '%' },
      { label: 'Saturate', isPro: true, value: 'saturate', val: '10', unit: '%' },
      { label: 'Sepia', value: 'sepia', val: '10', unit: '%' },

    ];

    let filterArgs = applyFilters('imageFilterArgs', filterArgsBasic);




    var linkToArgsBasic = {
      postUrl: { label: 'Post URL', value: 'postUrl' },
      homeUrl: { label: 'Home URL', value: 'homeUrl' },
      authorUrl: { label: 'Author URL', value: 'authorUrl' },
      authorLink: { label: 'Author Link', value: 'authorLink' },
      authorMail: { label: 'Author Mail', value: 'authorMail', isPro: true },
      authorMeta: { label: 'Author Meta', value: 'authorMeta', isPro: true },
      customField: { label: 'Custom Field', value: 'customField', isPro: true },
      customUrl: { label: 'Custom URL', value: 'customUrl', isPro: true },
    };

    let linkToArgs = applyFilters('linkToArgs', linkToArgsBasic);


    var customTagArgsBasic = {
      h1: { label: 'H1', value: 'h1' },
      h2: { label: 'H2', value: 'h2' },
      h3: { label: 'H3', value: 'h3' },
      h4: { label: 'H4', value: 'h4' },
      h5: { label: 'H5', value: 'h5' },
      h6: { label: 'H6', value: 'h6' },
      span: { label: 'SPAN', value: 'span' },
      div: { label: 'DIV', value: 'div' },
      p: { label: 'P', value: 'p' }
    };

    let customTagArgs = applyFilters('customTagArgs', customTagArgsBasic);


    var altTextSrcArgsBasic = {
      'none': { label: 'No Alt Text', value: '' },
      'imgAltText': { label: 'Image Alt Text', value: 'imgAltText' },
      'imgTitle': { label: 'Image Title', value: 'imgTitle' },
      'imgCaption': { label: 'Image Caption', value: 'imgCaption' },
      'imgDescription': { label: 'Image Description', value: 'imgDescription' },
      'imgSlug': { label: 'Image Slug', value: 'imgSlug' },
      'postTitle': { label: 'Post Title', value: 'postTitle' },
      'postSlug': { label: 'Post Slug', value: 'postSlug' },
      'excerpt': { label: 'Post Excerpt', value: 'excerpt', isPro: true },
      'customField': { label: 'Post Custom Field', value: 'customField', isPro: true },
      'custom': { label: 'Custom', value: 'custom', isPro: true },
    };

    let altTextSrcArgs = applyFilters('altTextSrcArgs', altTextSrcArgsBasic);






    const ALLOWED_MEDIA_TYPES = ['image'];





    const [currentPostImageId, setCurrentPostImageId] = useState(image.options.srcId);


    const [
      currentPostUrl,
      setCurrentPostUrl,
    ] = useEntityProp('postType', postType, 'link', postId);


    useEffect(() => {


      if (currentPostImageId.length != 0) {
        setLoading(true);


        apiFetch({
          path: '/wp/v2/media/' + currentPostImageId,
          method: 'POST',
          data: { id: currentPostImageId },
        }).then((res) => {

          setPostImage(res);

          var options = { ...image.options, srcUrl: res.source_url, srcId: res.id };
          setAttributes({ image: { ...image, options: options } });

          setLoading(false);


          var imgSizes = [];

          Object.keys(res.media_details.sizes).map(x => {

            var height = res.media_details.sizes[x].height
            var width = res.media_details.sizes[x].width
            //var crop = res[x].crop

            imgSizes.push({ label: x + "(" + width + "*" + height + ")", value: x, height: height, width: width });
          })

          setImageSizes(imgSizes)



        });

        // apiFetch({
        //   path: '/post-grid/v2/get_image_sizes',
        //   method: 'POST',
        //   data: {},
        // }).then((res) => {

        //   var imgSizes = [];

        //   Object.keys(res).map(x => {

        //     var height = res[x].height
        //     var width = res[x].width
        //     var crop = res[x].crop

        //     imgSizes.push({ label: x + "(" + width + "*" + height + ")", value: x, height: height, width: width, crop: crop });
        //   })


        //   setImageSizes(imgSizes)
        // });


      }





    }, [currentPostImageId]);



    useEffect(() => {



      if (image.options.imgSrcMetaKey.length != 0) {

        setLoading(true);


        apiFetch({
          path: '/post-grid/v2/get_post_meta',
          method: 'POST',
          data: { postId: postId, meta_key: image.options.imgSrcMetaKey, type: 'string', template: '' },
        }).then((res) => {



          var metaKeyType = (image.options.imgSrcMetaKeyType != undefined) ? image.options.imgSrcMetaKeyType : 'ID'
          if (metaKeyType == 'ID') {
            setCurrentPostImageId(res.meta_value)



          } else {
            //setPostImage(res)

          }
          setLoading(false);


        });
      }



    }, [image.options.imgSrcMetaKey, image.options.imgSrcMetaKeyType, image.options.imgSrcType]);













    function addfilterArgs(option, index) {


      var filterObj = {};

      if (image.styles.filter[breakPointX] != undefined) {
        image.styles.filter[breakPointX].push(option)

      } else {

        image.styles.filter[breakPointX] = [];
        image.styles.filter[breakPointX].push(option)
      }



      var styles = { ...image.styles, filter: image.styles.filter };
      setAttributes({ image: { ...image, styles: styles } });

    }



    useEffect(() => {
      var filterStr = {};

      filterStr[breakPointX] = '';
      (image.styles.filter[breakPointX] != undefined && image.styles.filter[breakPointX].map(x => {

        filterStr[breakPointX] += x.value + '(' + x.val + x.unit + ') ';

      }))


      blockCssY.items[imgSelector] = { ...blockCssY.items[imgSelector], 'filter': filterStr };

      setAttributes({ blockCssY: { items: blockCssY.items } });






    }, [image]);


    function setFeaturedImageSize(option, index) {

      var newValuesObj = {};


      if (Object.keys(image.options.size).length == 0) {
        newValuesObj[breakPointX] = option.value;
      } else {
        newValuesObj = image.options.size;
        newValuesObj[breakPointX] = option.value;
      }

      var options = { ...image.options, size: newValuesObj };
      setAttributes({ image: { ...image, options: options } });

    }


    useEffect(() => {

      setAttributes({ blockId: blockIdX });

      // setAttributes({ image: image });
      // setAttributes({ wrapper: wrapper });

      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);


      blockCssY.items[imgSelector] = { ...blockCssY.items[imgSelector], 'width': { "Desktop": "100%" } };
      blockCssY.items[imgSelector] = { ...blockCssY.items[imgSelector], 'height': { "Desktop": "auto" } };


      setAttributes({ blockCssY: { items: blockCssY.items } });


    }, [clientId]);

    // Wrapper CSS Class Selectors
    const wrapperSelector = blockClass;


    var linkSelector = '';


    if (wrapper.options.tag.length != 0) {

      if (image.options.linkTo.length > 0) {
        linkSelector = blockClass + ' a';
      } else {
        linkSelector = blockClass;

      }

    } else {
      linkSelector = blockClass;

    }



    var imgSelector = blockClass + ' img';



    var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }


    var BefroeTitle = function ({ title, args }) {

      return (

        <>
          <span className='cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1' onClick={ev => {


            image.styles.filter[breakPointX].splice(args.index, 1);
            var styles = image.styles;

            setAttributes({ image: { ...image, styles: styles } });

          }}><Icon icon={close} /></span>
          <span className='mx-2'>{title}</span>
        </>
      )

    }


    function handleLinkClick(ev) {

      ev.stopPropagation();
      ev.preventDefault();
      return false;
    }

    function paddingControl(nextValues) {



      var responsive = image.styles.padding;
      responsive[breakPointX] = nextValues;

      var styles = { ...image.styles, padding: responsive };
      setAttributes({ image: { ...image, styles: styles } });


      blockCssY.items[linkSelector] = (blockCssY.items[linkSelector] != undefined) ? blockCssY.items[linkSelector] : {};


      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;





      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[linkSelector]['padding-top'] != undefined) ? blockCssY.items[linkSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[linkSelector] = { ...blockCssY.items[linkSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[linkSelector]['padding-right'] != undefined) ? blockCssY.items[linkSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[linkSelector] = { ...blockCssY.items[linkSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[linkSelector]['padding-bottom'] != undefined) ? blockCssY.items[linkSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[linkSelector] = { ...blockCssY.items[linkSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[linkSelector]['padding-left'] != undefined) ? blockCssY.items[linkSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[linkSelector] = { ...blockCssY.items[linkSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });



    }





    function marginControl(nextValues) {


      var responsive = image.styles.margin;
      responsive[breakPointX] = nextValues;


      var styles = { ...image.styles, margin: responsive };
      setAttributes({ image: { ...image, styles: styles } });

      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[linkSelector] = (blockCssY.items[linkSelector] != undefined) ? blockCssY.items[linkSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[linkSelector]['margin-top'] != undefined) ? blockCssY.items[linkSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[linkSelector] = { ...blockCssY.items[linkSelector], 'margin-top': marginTop };
      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[linkSelector]['margin-right'] !== undefined) ? blockCssY.items[linkSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[linkSelector] = { ...blockCssY.items[linkSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[linkSelector]['margin-bottom'] !== undefined) ? blockCssY.items[linkSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[linkSelector] = { ...blockCssY.items[linkSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[linkSelector]['margin-left'] !== undefined) ? blockCssY.items[linkSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[linkSelector] = { ...blockCssY.items[linkSelector], 'margin-left': marginLeft };

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












    var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.



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
      linkAttrObj();

    }, [image]);






    var linkAttrObj = () => {

      var sdsd = {};

      image.options.linkAttr.map(x => {

        if (x.val)
          sdsd[x.id] = x.val;

      })

      setlinkAttrItems(sdsd);

    }

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


    var postUrl = (image.options.linkTocustomUrl != undefined && image.options.linkTocustomUrl.length > 0) ? image.options.linkTocustomUrl : currentPostUrl;


    const CustomTag = `${wrapper.options.tag}`;
    const CustomTagPostTitle = `${image.options.tag}`;




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
            <AlignmentToolbar
              value={wrapper.styles.textAlign[breakPointX]}

              onChange={(newVal) => {

                var newValuesObj = {};


                if (Object.keys(wrapper.styles.textAlign).length == 0) {
                  newValuesObj[breakPointX] = newVal;
                } else {
                  newValuesObj = wrapper.styles.textAlign;
                  newValuesObj[breakPointX] = newVal;
                }


                var styles = { ...wrapper.styles, textAlign: newValuesObj };
                setAttributes({ wrapper: { options: wrapper.options, styles: styles } });

                blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'text-align': newValuesObj };
                setAttributes({ blockCssY: { items: blockCssY.items } });

              }}
            />






          </BlockControls>


          <InspectorControls key="general">





            <PanelBody title="Wrapper" initialOpen={false}>
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
                    { label: 'SPAN', value: 'span' },
                    { label: 'DIV', value: 'div' },
                    { label: 'P', value: 'p' },
                  ]}
                  onChange={(newVal) => {

                    var options = { ...wrapper.options, tag: newVal };
                    setAttributes({ wrapper: { styles: wrapper.styles, options: options } });

                  }

                  }
                />
              </PanelRow>


              <PanelRow>
                <label for="">Image as Background</label>
                <SelectControl
                  label=""
                  value={wrapper.options.useAsBackground}
                  options={[
                    { label: 'No', value: 'no' },
                    { label: 'Yes', value: 'yes' },
                  ]}
                  onChange={(newVal) => {

                    var options = { ...wrapper.options, useAsBackground: newVal };
                    var styles = { ...wrapper.styles, bgImage: {} };

                    if (newVal == 'no') {
                      setAttributes({ wrapper: { ...wrapper, options: options, styles: styles, } });


                      var itemsX = { ...blockCssY.items };
                      itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'background-image': {} };

                      setAttributes({ blockCssY: { items: itemsX } });

                    }

                    if (newVal == 'yes') {


                      var newValuesObj = {};


                      if (Object.keys(wrapper.styles.bgImage).length == 0) {
                        newValuesObj[breakPointX] = 'url("' + postImage.guid.rendered + '")';
                      } else {
                        newValuesObj = wrapper.styles.bgImage;
                        newValuesObj[breakPointX] = 'url("' + postImage.guid.rendered + '")';
                      }

                      var styles = { ...wrapper.styles, bgImage: newValuesObj };
                      setAttributes({ wrapper: { ...wrapper, styles: styles, options: options } });


                      var itemsX = { ...blockCssY.items };
                      itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'background-image': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });

                    }

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
                  value={(wrapper.styles.width[breakPointX] != undefined ? wrapper.styles.width[breakPointX].val : 10)}
                  type="number"
                  onChange={(newVal) => {

                    var newValuesObj = {};
                    if (Object.keys(wrapper.styles.width).length == 0) {
                      newValuesObj[breakPointX] = { val: newVal, unit: 'em' };
                    } else {
                      newValuesObj = wrapper.styles.width;
                      var unit = (newValuesObj[breakPointX] != undefined) ? newValuesObj[breakPointX].unit : 'em';

                      newValuesObj[breakPointX] = { val: newVal, unit: unit };
                    }


                    var styles = { ...wrapper.styles, width: newValuesObj };
                    setAttributes({ wrapper: { ...wrapper, styles: styles } });



                    var heightVal = (newValuesObj[breakPointX].val) ? newValuesObj[breakPointX].val : 10;
                    var heightUnit = (newValuesObj[breakPointX].unit) ? newValuesObj[breakPointX].unit : 'em';


                    var heightX = (blockCssY.items[wrapperSelector] != undefined) ? blockCssY.items[wrapperSelector] : {};

                    heightX[breakPointX] = heightVal + heightUnit;
                    blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'width': heightX };

                    setAttributes({ blockCssY: { items: blockCssY.items } });


                  }}

                />

                <SelectControl className='mb-0'
                  value={(wrapper.styles.width[breakPointX] != undefined) ? wrapper.styles.width[breakPointX].unit : 'em'}
                  options={[
                    { label: 'fr', value: 'fr' },
                    { label: 'px', value: 'px' },
                    { label: '%', value: '%' },
                    { label: 'em', value: 'em' },
                  ]}
                  onChange={(newVal) => {


                    var newValuesObj = {};
                    if (Object.keys(wrapper.styles.width).length == 0) {
                      newValuesObj[breakPointX] = { val: 10, unit: newVal };
                    } else {
                      newValuesObj = wrapper.styles.width;
                      var val = (newValuesObj[breakPointX] != undefined) ? newValuesObj[breakPointX].val : 10;

                      newValuesObj[breakPointX] = { val: val, unit: newVal };
                    }


                    var styles = { ...wrapper.styles, width: newValuesObj };
                    setAttributes({ wrapper: { ...wrapper, styles: styles } });

                    var heightVal = (newValuesObj[breakPointX].val) ? newValuesObj[breakPointX].val : 10;
                    var heightUnit = (newValuesObj[breakPointX].unit) ? newValuesObj[breakPointX].unit : 'em';

                    var heightX = (blockCssY.items[wrapperSelector] != undefined) ? blockCssY.items[wrapperSelector] : {};

                    heightX[breakPointX] = heightVal + heightUnit;
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
                  value={(wrapper.styles.height[breakPointX] != undefined ? wrapper.styles.height[breakPointX].val : 10)}
                  type="number"
                  onChange={(newVal) => {

                    var newValuesObj = {};
                    if (Object.keys(wrapper.styles.height).length == 0) {
                      newValuesObj[breakPointX] = { val: newVal, unit: 'em' };
                    } else {
                      newValuesObj = wrapper.styles.height;
                      var unit = (newValuesObj[breakPointX] != undefined) ? newValuesObj[breakPointX].unit : 'em';

                      newValuesObj[breakPointX] = { val: newVal, unit: unit };
                    }


                    var styles = { ...wrapper.styles, height: newValuesObj };
                    setAttributes({ wrapper: { ...wrapper, styles: styles } });



                    var heightVal = (newValuesObj[breakPointX].val) ? newValuesObj[breakPointX].val : 10;
                    var heightUnit = (newValuesObj[breakPointX].unit) ? newValuesObj[breakPointX].unit : 'em';


                    var heightX = (blockCssY.items[wrapperSelector] != undefined) ? blockCssY.items[wrapperSelector] : {};

                    heightX[breakPointX] = heightVal + heightUnit;
                    blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'height': heightX };

                    setAttributes({ blockCssY: { items: blockCssY.items } });


                  }}

                />

                <SelectControl className='mb-0'
                  value={(wrapper.styles.height[breakPointX] != undefined) ? wrapper.styles.height[breakPointX].unit : 'em'}
                  options={[
                    { label: 'fr', value: 'fr' },
                    { label: 'px', value: 'px' },
                    { label: '%', value: '%' },
                    { label: 'em', value: 'em' },
                  ]}
                  onChange={(newVal) => {


                    var newValuesObj = {};
                    if (Object.keys(wrapper.styles.height).length == 0) {
                      newValuesObj[breakPointX] = { val: 10, unit: newVal };
                    } else {
                      newValuesObj = wrapper.styles.height;
                      var val = (newValuesObj[breakPointX] != undefined) ? newValuesObj[breakPointX].val : 10;

                      newValuesObj[breakPointX] = { val: val, unit: newVal };
                    }


                    var styles = { ...wrapper.styles, height: newValuesObj };
                    setAttributes({ wrapper: { ...wrapper, styles: styles } });

                    var heightVal = (newValuesObj[breakPointX].val) ? newValuesObj[breakPointX].val : 10;
                    var heightUnit = (newValuesObj[breakPointX].unit) ? newValuesObj[breakPointX].unit : 'em';

                    var heightX = (blockCssY.items[wrapperSelector] != undefined) ? blockCssY.items[wrapperSelector] : {};

                    heightX[breakPointX] = heightVal + heightUnit;
                    blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'height': heightX };

                    setAttributes({ blockCssY: { items: blockCssY.items } });


                  }}
                />

              </PanelRow>



              <PanelRow>
                <label>Overflow </label>
                <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
              </PanelRow>

              <PanelRow>


                <SelectControl className='mb-0'
                  value={(wrapper.styles.overflow[breakPointX] != undefined) ? wrapper.styles.overflow[breakPointX] : 'hidden'}
                  options={[
                    { label: 'scroll', value: 'scroll' },
                    { label: 'hidden', value: 'hidden' },
                    { label: 'auto', value: 'auto' },
                    { label: 'clip', value: 'clip' },
                    { label: 'visible', value: 'visible' },

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



                  }}
                />

              </PanelRow>



              {wrapper.options.useAsBackground == 'yes' && (

                <>

                  <PanelRow>
                    <label>Background Position </label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>

                  <PanelRow>


                    <SelectControl className='mb-0'
                      value={(wrapper.styles.bgPosition[breakPointX] != undefined) ? wrapper.styles.bgPosition[breakPointX] : 'hidden'}
                      options={[
                        { label: 'left top', value: 'left top' },
                        { label: 'left center', value: 'left center' },
                        { label: 'left bottom', value: 'left bottom' },
                        { label: 'right top', value: 'right top' },
                        { label: 'right center', value: 'right center' },
                        { label: 'right bottom', value: 'right bottom' },
                        { label: 'center top', value: 'center top' },
                        { label: 'center center', value: 'center center' },
                        { label: 'center bottom', value: 'center bottom' },

                      ]}
                      onChange={(newVal) => {


                        var newValuesObj = {};


                        if (Object.keys(wrapper.styles.bgPosition).length == 0) {
                          newValuesObj[breakPointX] = newVal;
                        } else {
                          newValuesObj = wrapper.styles.bgPosition;
                          newValuesObj[breakPointX] = newVal;
                        }

                        var styles = { ...wrapper.styles, bgPosition: newValuesObj };
                        setAttributes({ wrapper: { ...wrapper, styles: styles } });




                        var itemsX = { ...blockCssY.items };
                        itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'background-position': newValuesObj };

                        setAttributes({ blockCssY: { items: itemsX } });



                      }}
                    />

                  </PanelRow>


                  <PanelRow>
                    <label>Background Size </label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>

                  <PanelRow>


                    <SelectControl className='mb-0'
                      value={(wrapper.styles.bgSize[breakPointX] != undefined) ? wrapper.styles.bgSize[breakPointX] : 'hidden'}
                      options={[
                        { label: 'auto', value: 'auto' },
                        { label: 'cover', value: 'cover' },
                        { label: 'contain', value: 'contain' },

                      ]}
                      onChange={(newVal) => {


                        var newValuesObj = {};


                        if (Object.keys(wrapper.styles.bgSize).length == 0) {
                          newValuesObj[breakPointX] = newVal;
                        } else {
                          newValuesObj = wrapper.styles.bgSize;
                          newValuesObj[breakPointX] = newVal;
                        }

                        var styles = { ...wrapper.styles, bgSize: newValuesObj };
                        setAttributes({ wrapper: { ...wrapper, styles: styles } });




                        var itemsX = { ...blockCssY.items };
                        itemsX[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'background-size': newValuesObj };

                        setAttributes({ blockCssY: { items: itemsX } });



                      }}
                    />

                  </PanelRow>

                </>
              )}


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

                  blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'display': newValuesObj };
                  setAttributes({ blockCssY: { items: blockCssY.items } });

                })} />
              </PanelRow>



              <PanelRow>
                <label>Border Radius</label>
                <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
              </PanelRow>
              <BoxControl
                label=""
                values={wrapper.styles.borderRadius[breakPointX]}
                onChange={(nextValues) => {


                  var newValuesObj = {};

                  if (Object.keys(wrapper.styles.borderRadius).length == 0) {
                    newValuesObj[breakPointX] = nextValues.top + ' ' + nextValues.right + ' ' + nextValues.bottom + ' ' + nextValues.left;
                  } else {
                    newValuesObj = wrapper.styles.borderRadius;
                    newValuesObj[breakPointX] = nextValues.top + ' ' + nextValues.right + ' ' + nextValues.bottom + ' ' + nextValues.left;;
                  }

                  var styles = { ...wrapper.styles, borderRadius: nextValues };
                  setAttributes({ wrapper: { ...wrapper, styles: styles } });

                  blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'border-radius': newValuesObj };
                  setAttributes({ blockCssY: { items: blockCssY.items } });





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








            </PanelBody>

            <PanelBody title="Image" initialOpen={false}>

              <PanelRow>
                <label for="">Image Sources</label>
                <SelectControl
                  label=""
                  value={image.options.imgSrcType}
                  options={[
                    { label: 'Media', value: 'media' },
                    { label: 'Custom Field', value: 'customField' },
                    { label: 'Image Source URL', value: 'customUrl' },
                    // { label: 'Image ID', value: 'imgId' },
                  ]}
                  onChange={(newVal) => {
                    var options = { ...image.options, imgSrcType: newVal };
                    setAttributes({ image: { ...image, options: options } });
                  }

                  }
                />
              </PanelRow>


              {image.options.srcUrl.length > 0 && (
                <img src={image.options.srcUrl} alt="" />
              )}

              {image.options.srcUrl.length == 0 && (
                <img src={MyImage} alt="" />
              )}



              {image.options.imgSrcType == 'media' && (

                <>

                  <div className='mt-5' for="">Choose Image</div>

                  <MediaUploadCheck>
                    <MediaUpload
                      class="bg-blue-500"
                      onSelect={(media) => {
                        // media.id
                        setCurrentPostImageId(media.id)

                        var options = { ...image.options, srcUrl: media.url, srcId: media.id };
                        setAttributes({ image: { ...image, options: options } });


                      }


                      }
                      onClose={() => {
                      }


                      }

                      allowedTypes={ALLOWED_MEDIA_TYPES}
                      value={image.options.srcId}
                      render={({ open }) => (

                        <Button className='my-3 bg-blue-500 text-white border border-solid border-gray-300 text-center w-full' onClick={open}>Open Media Library</Button>


                      )}
                    />
                  </MediaUploadCheck>

                </>

              )}



              {image.options.imgSrcType == 'customField' && (



                <>

                  <PanelRow>
                    <label for="">Custom Field Key</label>
                    <InputControl
                      className='mr-2'
                      value={image.options.imgSrcMetaKey}
                      onChange={(newVal) => {
                        var options = { ...image.options, imgSrcMetaKey: newVal };
                        setAttributes({ image: { ...image, options: options } });
                      }}
                    />
                  </PanelRow>

                  <PanelRow>
                    <label for="">Metakey Type</label>
                    <SelectControl
                      label=""
                      value={image.options.imgSrcMetaKeyType}
                      options={[
                        { label: 'ID', value: 'ID' },
                        { label: 'URL', value: 'URL' },


                      ]}
                      onChange={(newVal) => {
                        var options = { ...image.options, imgSrcMetaKeyType: newVal };
                        setAttributes({ image: { ...image, options: options } });
                      }

                      }
                    />
                  </PanelRow>

                </>


              )}


              {image.options.imgSrcType == 'customUrl' && (

                <>
                  <PanelRow>
                    <label for="">Image URL</label>

                    <div className='relative'>
                      <Button className={(linkPickerSrcUrl) ? "!bg-gray-400" : ''} icon={link} onClick={ev => {

                        setlinkPickerSrcUrl(prev => !prev);

                      }}></Button>
                      {image.options.srcUrl.length > 0 && (
                        <Button className='!text-red-500 ml-2' icon={linkOff} onClick={ev => {

                          var options = { ...image.options, srcUrl: '' };
                          setAttributes({ image: { ...image, options: options } });
                          setlinkPickerSrcUrl(false);





                        }}></Button>

                      )}
                      {linkPickerSrcUrl && (
                        <Popover position="bottom right">
                          <LinkControl settings={[]} value={image.options.srcUrl} onChange={newVal => {

                            var options = { ...image.options, srcUrl: newVal.url };
                            setAttributes({ image: { ...image, options: options } });


                            setImageObj({ ...imageObj, src: newVal.url });


                          }} />

                          <div className='p-2'><span className='font-bold'>Image Source URL:</span> {(image.options.srcUrl.length != 0) ? image.options.srcUrl : 'No link'} </div>
                        </Popover>

                      )}


                    </div>
                  </PanelRow>

                </>


              )}


              {image.options.imgSrcType == 'imgId' && (
                <PanelRow>
                  <label for="">Image ID</label>
                  <InputControl
                    className='mr-2'
                    value={image.options.imgSrcImgId}
                    onChange={(newVal) => {
                      var options = { ...image.options, imgSrcImgId: newVal };
                      setAttributes({ image: { ...image, options: options } });
                    }}
                  />
                </PanelRow>
              )}



              {(image.options.imgSrcType == 'media' || image.options.imgSrcType == 'customField') && (

                <>
                  <PanelRow className='mb-4'>
                    <label for="">Thumbnail Size</label>
                    <PGDropdown position="bottom right" variant="secondary" options={imageSizes} buttonTitle="Choose" onChange={setFeaturedImageSize} values={image.options.size[breakPointX]}></PGDropdown>
                  </PanelRow>
                  {image.options.size[breakPointX] != undefined && (

                    <div className='bg-gray-400 text-white px-3 py-2 my-3' > {image.options.size[breakPointX]}</div>

                  )}
                </>
              )}


              <PanelRow className='my-3'>
                <label>Link To</label>
                <PGDropdown position="bottom right" variant="secondary" buttonTitle={image.options.linkTo.length == 0 ? 'Choose' : linkToArgs[image.options.linkTo].label} options={linkToArgs} onChange={(option, index) => {
                  var options = { ...image.options, linkTo: option.value };
                  setAttributes({ image: { ...image, options: options } });
                }} values=""></PGDropdown>
              </PanelRow>



              {image.options.linkTo == 'customField' && (



                <PanelRow>
                  <label for="">Custom Field Key</label>
                  <InputControl
                    className='mr-2'
                    value={image.options.linkToMetaKey}
                    onChange={(newVal) => {


                      var options = { ...image.options, linkToMetaKey: newVal };
                      setAttributes({ image: { ...image, options: options } });

                    }}
                  />
                </PanelRow>


              )}





              {image.options.linkTo == 'customUrl' && (

                <PanelRow>
                  <label for="">Custom URL</label>

                  <div className='relative'>
                    <Button className={(linkPickerPosttitle) ? "!bg-gray-400" : ''} icon={link} onClick={ev => {

                      setLinkPickerPosttitle(prev => !prev);

                    }}></Button>
                    {image.options.linkTocustomUrl.length > 0 && (
                      <Button className='!text-red-500 ml-2' icon={linkOff} onClick={ev => {

                        var options = { ...image.options, linkTocustomUrl: '' };
                        setAttributes({ image: { ...image, options: options } });
                        setLinkPickerPosttitle(false);

                      }}></Button>

                    )}
                    {linkPickerPosttitle && (
                      <Popover position="bottom right">
                        <LinkControl settings={[]} value={image.options.linkTocustomUrl} onChange={newVal => {

                          var options = { ...image.options, linkTocustomUrl: newVal.url };

                          setAttributes({ image: { ...image, options: options } });

                        }} />

                        <div className='p-2'><span className='font-bold'>Linked to:</span> {(image.options.linkTocustomUrl.length != 0) ? image.options.linkTocustomUrl : 'No link'} </div>
                      </Popover>

                    )}


                  </div>
                </PanelRow>

              )}


              {image.options.linkTo.length == 0 && (


                <PanelRow className='my-3'>
                  <label>Custom Tag</label>
                  <PGDropdown position="bottom right" variant="secondary" buttonTitle={image.options.tag.length == 0 ? 'Choose' : customTagArgs[image.options.tag].label} options={customTagArgs} onChange={(option, index) => {

                    var options = { ...image.options, tag: option.value };
                    setAttributes({ image: { ...image, options: options } });
                  }} values=""></PGDropdown>
                </PanelRow>


              )}




              {image.options.linkTo.length > 0 && (

                <div>
                  <PanelRow>
                    <label for="">Link Target</label>

                    <SelectControl
                      label=""
                      value={image.options.linkTarget}
                      options={[
                        { label: 'Choose...', value: '' },

                        { label: '_self', value: '_self' },
                        { label: '_blank', value: '_blank' },
                        { label: '_parent', value: '_parent' },
                        { label: '_top', value: '_top' },


                      ]}
                      onChange={(newVal) => {



                        var options = { ...image.options, linkTarget: newVal };
                        setAttributes({ image: { ...image, options: options } });



                      }



                      }
                    />
                  </PanelRow>








                  <PanelRow>
                    <label for="">Custom Attributes</label>
                    <div
                      className=' cursor-pointer px-3 text-white py-1 bg-blue-600'

                      onClick={(ev) => {

                        var sdsd = image.options.linkAttr.concat({ id: '', val: '' })


                        var options = { ...image.options, linkAttr: sdsd };
                        setAttributes({ image: { ...image, options: options } });

                        linkAttrObj()
                      }}

                    >Add</div>



                  </PanelRow>



                  {
                    image.options.linkAttr.map((x, i) => {

                      return (

                        <div className='my-2'>
                          <PanelRow>
                            <InputControl
                              placeholder="Name"
                              className='mr-2'
                              value={image.options.linkAttr[i].id}
                              onChange={(newVal) => {

                                image.options.linkAttr[i].id = newVal;


                                var ssdsd = image.options.linkAttr.concat([]);



                                var options = { ...image.options, linkAttr: ssdsd };
                                setAttributes({ image: { ...image, options: options } });

                              }}
                            />

                            <InputControl
                              className='mr-2'
                              placeholder="Value"
                              value={x.val}
                              onChange={(newVal) => {
                                image.options.linkAttr[i].val = newVal
                                var ssdsd = image.options.linkAttr.concat([]);



                                var options = { ...image.options, linkAttr: ssdsd };
                                setAttributes({ image: { ...image, options: options } });

                              }}
                            />
                            <span className='text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close'
                              onClick={(ev) => {

                                image.options.linkAttr.splice(i, 1);

                                var ssdsd = image.options.linkAttr.concat([]);


                                var options = { ...image.options, linkAttr: ssdsd };
                                setAttributes({ image: { ...image, options: options } });
                              }}

                            ></span>
                          </PanelRow>




                        </div>

                      )

                    })
                  }


                </div>



              )}


              <PanelRow className='my-3'>
                <label>Alt Text Source</label>
                <PGDropdown position="bottom right" variant="secondary" buttonTitle={image.options.altTextSrc.length == 0 ? 'Choose' : altTextSrcArgs[image.options.altTextSrc].label} options={altTextSrcArgs} onChange={(option, index) => {

                  var options = { ...image.options, altTextSrc: option.value };
                  setAttributes({ image: { ...image, options: options } });


                }} values=""></PGDropdown>
              </PanelRow>




              {image.options.altTextSrc == 'customField' && (

                <div>

                  <PanelRow className='my-3'>
                    <label>Custom Field</label>
                    <PGDropdown position="bottom right" variant="secondary" buttonTitle={'Choose'} options={[
                      { label: 'Custom', value: '' },
                      { label: 'Yoast meta', value: '_yoast_wpseo_metadesc' },
                      { label: 'Rank Math meta', value: 'rank_math_description' },
                      { label: 'AIO SEO meta', value: '_aioseo_og_description' },
                      { label: 'SEOPress meta', value: '_seopress_titles_desc' },
                      { label: 'WP Meta SEO meta', value: '_metaseo_metadesc' },
                      { label: 'The SEO Framework meta', value: '_genesis_description' },
                      { label: 'SEO SIMPLE PACK meta', value: 'ssp_meta_description' },
                    ]} onChange={(option, index) => {

                      var options = { ...image.options, altTextMetaKey: option.value };
                      setAttributes({ image: { ...image, options: options } });




                    }} values=""></PGDropdown>
                  </PanelRow>
                  <PanelRow>
                    <label for="">Custom Field Key</label>
                    <InputControl
                      className='mr-2'
                      value={image.options.altTextMetaKey}
                      onChange={(newVal) => {


                        var options = { ...image.options, altTextMetaKey: newVal };
                        setAttributes({ image: { ...image, options: options } });

                      }}
                    />
                  </PanelRow>
                </div>
              )}





              {image.options.altTextSrc == 'custom' && (



                <PanelRow>
                  <label for="">Custom Alt Text</label>
                  <InputControl
                    className='mr-2'
                    value={image.options.altTextCustom}
                    onChange={(newVal) => {


                      var options = { ...image.options, altTextCustom: newVal };
                      setAttributes({ image: { ...image, options: options } });

                    }}
                  />
                </PanelRow>


              )}











              <PanelRow>
                <label>Filters </label>
                <PGDropdown position="bottom right" variant="secondary" options={filterArgs} buttonTitle="Add" onChange={addfilterArgs} values=""></PGDropdown>
                <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
              </PanelRow>


              <div className='my-5'>

                {
                  image.styles.filter[breakPointX] != undefined && (



                    image.styles.filter[breakPointX].map((arg, index) => {

                      return (
                        <div>

                          <PanelBody title={<BefroeTitle title={arg.label} args={{ index: index, arg: arg }} />} initialOpen={false}>

                            <div>


                              <RangeControl
                                value={arg.val}
                                onChange={(newVal) => {
                                  arg.val = newVal;

                                  image.styles.filter[breakPointX][index] = arg;
                                  var styles = image.styles;

                                  setAttributes({ image: { ...image, styles: styles } });
                                }}
                                min={0}
                                max={100}
                              />


                            </div>

                          </PanelBody>







                        </div>
                      )


                    }))
                }

              </div>

              <PanelRow>
                <label>Image Scale</label>
                <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
              </PanelRow>


              <SelectControl
                className='my-3'
                value={image.styles.objectFit[breakPointX]}
                options={[
                  { label: 'Fill', value: 'fill' },
                  { label: 'Contain', value: 'contain' },
                  { label: 'Cover', value: 'cover' },

                  { label: 'None', value: 'none' },
                  { label: 'Scale-down', value: 'scale-down' },


                ]}
                onChange={(newVal) => {


                  var newValuesObj = {};

                  if (Object.keys(image.styles.objectFit).length == 0) {
                    newValuesObj[breakPointX] = newVal;
                  } else {
                    newValuesObj = image.styles.objectFit;
                    newValuesObj[breakPointX] = newVal;
                  }

                  var styles = { ...image.styles, objectFit: newValuesObj };
                  setAttributes({ image: { ...image, styles: styles } });

                  blockCssY.items[imgSelector] = { ...blockCssY.items[imgSelector], 'object-fit': newValuesObj };

                  setAttributes({ blockCssY: { items: blockCssY.items } });


                }}
              />






              <PanelRow>
                <label>Width</label>
                <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
              </PanelRow>

              <PanelRow>
                <InputControl
                  disabled={(image.styles.width[breakPointX] != undefined && image.styles.width[breakPointX].unit == 'auto') ? true : false}
                  value={(image.styles.width[breakPointX] != undefined ? image.styles.width[breakPointX].val : 0)}
                  type="number"
                  onChange={(newVal) => {

                    var newValuesObj = {};
                    if (Object.keys(image.styles.width).length == 0) {
                      newValuesObj[breakPointX] = { val: newVal, unit: 'auto' };
                    } else {
                      newValuesObj = image.styles.width;
                      var unit = (newValuesObj[breakPointX] != undefined) ? newValuesObj[breakPointX].unit : 'auto';

                      newValuesObj[breakPointX] = { val: newVal, unit: unit };
                    }


                    var styles = { ...image.styles, width: newValuesObj };
                    setAttributes({ image: { ...image, styles: styles } });



                    var heightVal = (newValuesObj[breakPointX].val) ? newValuesObj[breakPointX].val : 0;
                    var heightUnit = (newValuesObj[breakPointX].unit) ? newValuesObj[breakPointX].unit : 'auto';


                    var heightX = (blockCssY.items[imgSelector] != undefined) ? blockCssY.items[imgSelector] : {};

                    //heightX[breakPointX] = heightVal + heightUnit;

                    if (heightUnit == 'auto') {
                      heightX[breakPointX] = 'auto';
                    } else {
                      heightX[breakPointX] = heightVal + heightUnit;
                    }


                    blockCssY.items[imgSelector] = { ...blockCssY.items[imgSelector], 'width': heightX };

                    setAttributes({ blockCssY: { items: blockCssY.items } });


                  }}

                />

                <SelectControl className='mb-0'
                  value={(image.styles.width[breakPointX] != undefined) ? image.styles.width[breakPointX].unit : 'auto'}
                  options={[
                    { label: 'Auto', value: 'auto' },
                    { label: 'px', value: 'px' },
                    { label: 'fr', value: 'fr' },
                    { label: '%', value: '%' },
                    { label: 'em', value: 'em' },
                  ]}
                  onChange={(newVal) => {


                    var newValuesObj = {};
                    if (Object.keys(image.styles.width).length == 0) {
                      newValuesObj[breakPointX] = { val: 0, unit: newVal };
                    } else {
                      newValuesObj = image.styles.width;
                      var val = (newValuesObj[breakPointX] != undefined) ? newValuesObj[breakPointX].val : 0;

                      newValuesObj[breakPointX] = { val: val, unit: newVal };
                    }


                    var styles = { ...image.styles, width: newValuesObj };
                    setAttributes({ image: { ...image, styles: styles } });

                    var heightVal = (newValuesObj[breakPointX].val) ? newValuesObj[breakPointX].val : 0;
                    var heightUnit = (newValuesObj[breakPointX].unit) ? newValuesObj[breakPointX].unit : 'auto';

                    var heightX = (blockCssY.items[imgSelector] != undefined) ? blockCssY.items[imgSelector] : {};

                    //heightX[breakPointX] = heightVal + heightUnit;

                    if (heightUnit == 'auto') {
                      heightX[breakPointX] = 'auto';
                    } else {
                      heightX[breakPointX] = heightVal + heightUnit;
                    }


                    blockCssY.items[imgSelector] = { ...blockCssY.items[imgSelector], 'width': heightX };

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
                  disabled={(image.styles.height[breakPointX] != undefined && image.styles.height[breakPointX].unit == 'auto') ? true : false}
                  value={(image.styles.height[breakPointX] != undefined ? image.styles.height[breakPointX].val : 0)}
                  type="number"
                  onChange={(newVal) => {

                    var newValuesObj = {};
                    if (Object.keys(image.styles.height).length == 0) {
                      newValuesObj[breakPointX] = { val: newVal, unit: 'auto' };
                    } else {
                      newValuesObj = image.styles.height;
                      var unit = (newValuesObj[breakPointX] != undefined) ? newValuesObj[breakPointX].unit : 'auto';

                      newValuesObj[breakPointX] = { val: newVal, unit: unit };
                    }


                    var styles = { ...image.styles, height: newValuesObj };
                    setAttributes({ image: { ...image, styles: styles } });



                    var heightVal = (newValuesObj[breakPointX].val) ? newValuesObj[breakPointX].val : 0;
                    var heightUnit = (newValuesObj[breakPointX].unit) ? newValuesObj[breakPointX].unit : 'auto';


                    var heightX = (blockCssY.items[imgSelector] != undefined) ? blockCssY.items[imgSelector] : {};

                    //heightX[breakPointX] = heightVal + heightUnit;

                    if (heightUnit == 'auto') {
                      heightX[breakPointX] = 'auto';
                    } else {
                      heightX[breakPointX] = heightVal + heightUnit;
                    }


                    blockCssY.items[imgSelector] = { ...blockCssY.items[imgSelector], 'height': heightX };

                    setAttributes({ blockCssY: { items: blockCssY.items } });


                  }}

                />

                <SelectControl className='mb-0'
                  value={(image.styles.height[breakPointX] != undefined) ? image.styles.height[breakPointX].unit : 'auto'}
                  options={[
                    { label: 'Auto', value: 'auto' },
                    { label: 'px', value: 'px' },
                    { label: 'fr', value: 'fr' },
                    { label: '%', value: '%' },
                    { label: 'em', value: 'em' },
                  ]}
                  onChange={(newVal) => {


                    var newValuesObj = {};
                    if (Object.keys(image.styles.height).length == 0) {
                      newValuesObj[breakPointX] = { val: 0, unit: newVal };
                    } else {
                      newValuesObj = image.styles.height;
                      var val = (newValuesObj[breakPointX] != undefined) ? newValuesObj[breakPointX].val : 0;

                      newValuesObj[breakPointX] = { val: val, unit: newVal };
                    }


                    var styles = { ...image.styles, height: newValuesObj };
                    setAttributes({ image: { ...image, styles: styles } });

                    var heightVal = (newValuesObj[breakPointX].val) ? newValuesObj[breakPointX].val : 0;
                    var heightUnit = (newValuesObj[breakPointX].unit) ? newValuesObj[breakPointX].unit : 'auto';

                    var heightX = (blockCssY.items[imgSelector] != undefined) ? blockCssY.items[imgSelector] : {};

                    //heightX[breakPointX] = heightVal + heightUnit;

                    if (heightUnit == 'auto') {
                      heightX[breakPointX] = 'auto';
                    } else {
                      heightX[breakPointX] = heightVal + heightUnit;
                    }


                    blockCssY.items[imgSelector] = { ...blockCssY.items[imgSelector], 'height': heightX };

                    setAttributes({ blockCssY: { items: blockCssY.items } });


                  }}
                />

              </PanelRow>









              <PanelRow>
                <label>Padding</label>
                <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
              </PanelRow>
              <BoxControl
                label=""
                values={image.styles.padding[breakPointX]}
                onChange={(nextValues) => { paddingControl(nextValues) }}
              />


              <PanelRow>
                <label>Margin</label>
                <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
              </PanelRow>
              <BoxControl
                label=""
                values={image.styles.margin[breakPointX]}
                onChange={(nextValues) => { marginControl(nextValues) }}
              />


            </PanelBody>


            <PanelBody title="Custom Style" initialOpen={false}>


              <p>Please use following class selector to apply your custom CSS</p>
              <div className='my-3'>
                <p className='font-bold'>Title Wrapper</p>
                <p><code>{wrapperSelector}{'{/* your CSS here*/}'}</code></p>
              </div>

              <div className='my-3'>
                <p className='font-bold'>Title link</p>
                <p><code>{linkSelector}{'{/* your CSS here*/}'} </code></p>
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
              <PGContactSupport utm={{ utm_source: 'BlockImage', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />

            </div>


          </InspectorControls >
        </div >
        ,


        <>

          {loading && <Spinner />}

          {wrapper.options.useAsBackground == 'yes' && (
            <CustomTag className={[blockId]}></CustomTag>
          )}


          {!loading && (
            <div className={[blockId]}>


              {(image.options.imgSrcType == 'media' || image.options.imgSrcType == 'customField') && postImage == null && (

                <>

                  <PanelRow>
                    <label for="">Image Sources</label>
                    <SelectControl
                      label=""
                      value={image.options.imgSrcType}
                      options={[
                        { label: 'Media', value: 'media' },
                        { label: 'Custom Field', value: 'customField' },
                        { label: 'Image Source URL', value: 'customUrl' },
                        // { label: 'Image ID', value: 'imgId' },
                      ]}
                      onChange={(newVal) => {
                        var options = { ...image.options, imgSrcType: newVal };
                        setAttributes({ image: { ...image, options: options } });
                      }

                      }
                    />
                  </PanelRow>


                  {image.options.imgSrcType == 'media' && (

                    <>

                      <div className='mt-5' for="">Choose Image</div>

                      <MediaUploadCheck>
                        <MediaUpload
                          class="bg-blue-500"
                          onSelect={(media) => {
                            // media.id
                            setCurrentPostImageId(media.id)

                            var options = { ...image.options, srcUrl: media.url, srcId: media.id };
                            setAttributes({ image: { ...image, options: options } });


                          }


                          }
                          onClose={() => {
                          }


                          }

                          allowedTypes={ALLOWED_MEDIA_TYPES}
                          value={image.options.srcId}
                          render={({ open }) => (

                            <Button className='my-3 bg-blue-500 text-white border border-solid border-gray-300 text-center w-full' onClick={open}>Open Media Library</Button>


                          )}
                        />
                      </MediaUploadCheck>

                    </>

                  )}



                  {image.options.imgSrcType == 'customField' && (



                    <>

                      <PanelRow>
                        <label for="">Custom Field Key</label>
                        <InputControl
                          className='mr-2'
                          value={image.options.imgSrcMetaKey}
                          onChange={(newVal) => {
                            var options = { ...image.options, imgSrcMetaKey: newVal };
                            setAttributes({ image: { ...image, options: options } });
                          }}
                        />
                      </PanelRow>

                      <PanelRow>
                        <label for="">Metakey Type</label>
                        <SelectControl
                          label=""
                          value={image.options.imgSrcMetaKeyType}
                          options={[
                            { label: 'ID', value: 'ID' },
                            { label: 'URL', value: 'URL' },


                          ]}
                          onChange={(newVal) => {
                            var options = { ...image.options, imgSrcMetaKeyType: newVal };
                            setAttributes({ image: { ...image, options: options } });
                          }

                          }
                        />
                      </PanelRow>

                    </>


                  )}



                </>




              )}


              {image.options.imgSrcType == 'customUrl' && image.options.srcUrl.length == 0 && (
                <>

                  {image.options.imgSrcType == 'customUrl' && (

                    <>
                      <PanelRow>
                        <label for="">Image URL</label>

                        <div className='relative'>
                          <Button className={(linkPickerSrcUrl) ? "!bg-gray-400" : ''} icon={link} onClick={ev => {

                            setlinkPickerSrcUrl(prev => !prev);

                          }}></Button>
                          {image.options.srcUrl.length > 0 && (
                            <Button className='!text-red-500 ml-2' icon={linkOff} onClick={ev => {

                              var options = { ...image.options, srcUrl: '' };
                              setAttributes({ image: { ...image, options: options } });
                              setlinkPickerSrcUrl(false);





                            }}></Button>

                          )}
                          {linkPickerSrcUrl && (
                            <Popover position="bottom right">
                              <LinkControl settings={[]} value={image.options.srcUrl} onChange={newVal => {

                                var options = { ...image.options, srcUrl: newVal.url };
                                setAttributes({ image: { ...image, options: options } });


                                setImageObj({ ...imageObj, src: newVal.url });


                              }} />

                              <div className='p-2'><span className='font-bold'>Image Source URL:</span> {(image.options.srcUrl.length != 0) ? image.options.srcUrl : 'No link'} </div>
                            </Popover>

                          )}


                        </div>
                      </PanelRow>

                    </>


                  )}
                </>
              )}




            </div>

          )}

          {wrapper.options.useAsBackground == 'no' && wrapper.options.tag && (
            <CustomTag className={[blockId]}>
              {image.options.linkTo.length > 0 && (
                <a onClick={handleLinkClick} {...linkAttrItems} href={postUrl} target={image.options.linkTarget}>

                  {postImage != null && <img src={((postImage != null && postImage.media_details.sizes[image.options.size[breakPointX]] != undefined) ? postImage.media_details.sizes[image.options.size[breakPointX]].source_url : '')} alt={postImage.alt_text} />}

                  {postImage != null && postImage.media_details.sizes[image.options.size[breakPointX]] == undefined && (
                    <>
                      {postImage != null && <img src={((postImage != null && postImage.guid.rendered != undefined) ? postImage.guid.rendered : '')} alt={postImage.alt_text} />}
                    </>
                  )}

                </a>
              )}
              {image.options.linkTo.length == 0 && (
                <>

                  {(image.options.imgSrcType == 'media' || image.options.imgSrcType == 'customField') && (
                    <>
                      {postImage != null && <img src={((postImage != null && postImage.media_details.sizes[image.options.size[breakPointX]] != undefined) ? postImage.media_details.sizes[image.options.size[breakPointX]].source_url : '')} alt={postImage.alt_text} />}


                      {postImage != null && postImage.media_details.sizes[image.options.size[breakPointX]] == undefined && (
                        <>
                          {postImage != null && <img src={((postImage != null && postImage.guid.rendered != undefined) ? postImage.guid.rendered : '')} alt={postImage.alt_text} />}
                        </>
                      )}



                    </>
                  )}


                  {image.options.imgSrcType == 'customUrl' && (
                    <img src={image.options.srcUrl} alt={image.options.altTextCustom} />
                  )}


                </>
              )}
            </CustomTag>
          )}


          {wrapper.options.useAsBackground == 'no' && wrapper.options.tag.length == 0 && (

            <>
              {
                image.options.linkTo.length > 0 && (
                  <a onClick={handleLinkClick} className={[blockId]} {...linkAttrItems} href={postUrl} target={image.options.linkTarget}>


                    {postImage != null && <img src={((postImage != null && postImage.media_details.sizes[image.options.size[breakPointX]] != undefined) ? postImage.media_details.sizes[image.options.size[breakPointX]].source_url : '')} alt={postImage.alt_text} />}


                    {postImage != null && postImage.media_details.sizes[image.options.size[breakPointX]] == undefined && (
                      <>
                        {postImage != null && <img src={((postImage != null && postImage.guid.rendered != undefined) ? postImage.guid.rendered : '')} alt={postImage.alt_text} />}
                      </>
                    )}




                  </a>)

              }

            </>
          )}

          {wrapper.options.useAsBackground == 'no' && wrapper.options.tag.length == 0 && image.options.linkTo.length == 0 && (


            <>
              {image.options.tag.length > 0 && (
                <CustomTagPostTitle className={blockId}>

                  {postImage != null && <img src={((postImage != null && postImage.media_details.sizes[image.options.size[breakPointX]] != undefined) ? postImage.media_details.sizes[image.options.size[breakPointX]].source_url : '')} alt={postImage.alt_text} />}

                  {postImage != null && postImage.media_details.sizes[image.options.size[breakPointX]] == undefined && (
                    <>
                      {postImage != null && <img src={((postImage != null && postImage.guid.rendered != undefined) ? postImage.guid.rendered : '')} alt={postImage.alt_text} />}
                    </>
                  )}

                </CustomTagPostTitle>

              )}
              {image.options.tag.length == 0 && (
                <div className={blockId}>

                  {postImage != null && <img src={((postImage != null && postImage.media_details.sizes[image.options.size[breakPointX]] != undefined) ? postImage.media_details.sizes[image.options.size[breakPointX]].source_url : '')} alt={postImage.alt_text} />}

                  {postImage != null && postImage.media_details.sizes[image.options.size[breakPointX]] == undefined && (
                    <>
                      {postImage != null && <img src={((postImage != null && postImage.guid.rendered != undefined) ? postImage.guid.rendered : '')} alt={postImage.alt_text} />}
                    </>
                  )}
                </div>

              )}
            </>

          )}

        </>
      ]

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})