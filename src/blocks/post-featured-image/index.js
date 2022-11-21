import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, ButtonGroup, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover } from '@wordpress/components'
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
import PGproWrapper from '../../components/pro-wrapper'
import colorsPresets from '../../colors-presets'
import PGcssDisplay from '../../components/css-display'

import MyImage from './placeholder.jpg';


var myStore = wp.data.select('postgrid-shop');

registerBlockType("post-grid/post-featured-image", {
  title: "Featured Image",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:



      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 20.9738C22 21.5116 21.564 21.9476 21.0262 21.9476L2.97381 21.9476C2.43599 21.9476 2 21.5116 2 20.9738V20.9738C2 20.436 2.43599 20 2.97381 20L21.0262 20C21.564 20 22 20.436 22 20.9738V20.9738Z" />
        <path d="M20.125 3H3.875C2.83945 3 2 3.83945 2 4.875V16.125C2 17.1605 2.83945 18 3.875 18H20.125C21.1605 18 22 17.1605 22 16.125V4.875C22 3.83945 21.1605 3 20.125 3ZM19.8906 16.125H4.10938C4.04721 16.125 3.9876 16.1003 3.94365 16.0564C3.89969 16.0124 3.875 15.9528 3.875 15.8906V5.10938C3.875 5.04721 3.89969 4.9876 3.94365 4.94365C3.9876 4.89969 4.04721 4.875 4.10938 4.875H19.8906C19.9528 4.875 20.0124 4.89969 20.0564 4.94365C20.1003 4.9876 20.125 5.04721 20.125 5.10938V15.8906C20.125 15.9528 20.1003 16.0124 20.0564 16.0564C20.0124 16.1003 19.9528 16.125 19.8906 16.125V16.125ZM7 6.4375C6.13707 6.4375 5.4375 7.13707 5.4375 8C5.4375 8.86293 6.13707 9.5625 7 9.5625C7.86293 9.5625 8.5625 8.86293 8.5625 8C8.5625 7.13707 7.86293 6.4375 7 6.4375ZM5.75 14.25H18.25V11.125L14.8314 7.70645C14.6484 7.5234 14.3516 7.5234 14.1685 7.70645L9.5 12.375L7.95645 10.8314C7.7734 10.6484 7.4766 10.6484 7.29352 10.8314L5.75 12.375V14.25Z" />
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
          height: {},
          overflow: {},

          color: {},
          bgColor: {},
          bgImage: {},
          bgPosition: {},
          bgSize: {},
          display: {},


          padding: {},
          margin: {}
        },
      },
    },

    featuredImage: {
      type: 'object',
      default: {
        options: {
          tag: 'div',
          linkTo: '', // postUrl, customField, authorUrl, authorLink, homeUrl, custom
          customUrl: '',
          linkToMetaKey: '',

          altTextSrc: 'imgAltText', // imgAltText, imgTitle, imgCaption, imgDescription imgName, imgSlug, postTitle, excerpt, postSlug, customField, custom
          altTextCustom: '',
          altTextMetaKey: '',

          linkTarget: '_blank',
          linkAttr: [],
          class: '',
          size: { "Desktop": "thumbnail", "Tablet": "full", "Mobile": "full" },

        },

        styles: {
          textAlign: {},
          display: {},
          width: {},
          height: {},
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



    let featuredImage = attributes.featuredImage;
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

    const [customTags, setCustomTags] = useState({});

    const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);
    const [postGridData, setPostGridData] = useState(window.PostGridPluginData);

    const [postImage, setPostImage] = useState(null);
    const [imageSizes, setImageSizes] = useState([]);
    const [filterArgs, setfilterArgs] = useState([
      { label: 'Blur', value: 'blur', val: '', unit: 'px' },
      { label: 'Brightness', value: 'brightness', val: '10', unit: '%' },
      { label: 'Contrast', value: 'contrast', val: '10', unit: '%' },
      { label: 'Grayscale', value: 'grayscale', val: '10', unit: '%' },
      { label: 'Hue-rotate', value: 'hue-rotate', val: '10', unit: 'deg' },
      { label: 'Invert', value: 'invert', val: '10', unit: '%' },
      { label: 'Opacity', value: 'opacity', val: '10', unit: '%' },
      { label: 'Saturate', value: 'saturate', val: '10', unit: '%' },
      { label: 'Sepia', value: 'sepia', val: '10', unit: '%' },
    ]);


    useEffect(() => {

      setPostGridData(window.PostGridPluginData);

    }, [window.PostGridPluginData]);


    const ALLOWED_MEDIA_TYPES = ['image'];



    const [
      currentPostImageId,
      setCurrentPostImageId,
    ] = useEntityProp('postType', postType, 'featured_media', postId);



    const [
      currentPostUrl,
      setCurrentPostUrl,
    ] = useEntityProp('postType', postType, 'link', postId);


    useEffect(() => {



      apiFetch({
        path: '/wp/v2/media/' + currentPostImageId,
        method: 'POST',
        data: { id: currentPostImageId },
      }).then((res) => {


        setPostImage(res);
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

      //   imgSizes.push({ label: "Full(**)", value: 'full', height: '', width: '', crop: true });


      //   setImageSizes(imgSizes)
      // });





    }, [currentPostImageId]);


    function addfilterArgs(option, index) {


      var filterObj = {};

      if (featuredImage.styles.filter[breakPointX] != undefined) {
        featuredImage.styles.filter[breakPointX].push(option)

      } else {

        featuredImage.styles.filter[breakPointX] = [];
        featuredImage.styles.filter[breakPointX].push(option)
      }



      var styles = { ...featuredImage.styles, filter: featuredImage.styles.filter };
      setAttributes({ featuredImage: { ...featuredImage, styles: styles } });



    }



    useEffect(() => {
      var filterStr = {};

      filterStr[breakPointX] = '';
      (featuredImage.styles.filter[breakPointX] != undefined && featuredImage.styles.filter[breakPointX].map(x => {


        filterStr[breakPointX] += x.value + '(' + x.val + x.unit + ') ';

      }))


      blockCssY.items[imgSelector] = { ...blockCssY.items[imgSelector], 'filter': filterStr };

      setAttributes({ blockCssY: { items: blockCssY.items } });






    }, [featuredImage]);


    function setFeaturedImageSize(option, index) {


      var newValuesObj = {};


      if (Object.keys(featuredImage.options.size).length == 0) {
        newValuesObj[breakPointX] = option.value;
      } else {
        newValuesObj = featuredImage.options.size;
        newValuesObj[breakPointX] = option.value;
      }

      var options = { ...featuredImage.options, size: newValuesObj };
      setAttributes({ featuredImage: { ...featuredImage, options: options } });

    }


    useEffect(() => {

      setAttributes({ blockId: blockIdX });

      // setAttributes({ featuredImage: featuredImage });
      // setAttributes({ wrapper: wrapper });

      generateBlockCssY()


      customTags['currentYear'] = '2022';
      customTags['currentMonth'] = '07';
      customTags['currentDay'] = '27';
      customTags['currentDate'] = '27';
      customTags['currentTime'] = '27';

      customTags['postPublishDate'] = '123';
      customTags['postModifiedDate'] = '123';

      customTags['termId'] = '';
      customTags['termTitle'] = '';
      customTags['termDescription'] = '';
      customTags['termPostCount'] = '';

      customTags['postTagTitle'] = 'First Tag Title';
      customTags['postTagsTitle'] = 'First Tag Title';

      customTags['postCategoryTitle'] = 'First Category Title';
      customTags['postCategoriesTitle'] = 'First Categories Title';


      customTags['postTermTitle'] = 'First Term Title';
      customTags['postTermsTitle'] = 'List of all terms title';



      customTags['postId'] = '123';
      customTags['postStatus'] = '123';


      customTags['authorId'] = '123';
      customTags['authorName'] = 'Nur Hasan';
      customTags['authorFirstName'] = 'Nur';
      customTags['authorLastName'] = 'Hasan';
      customTags['authorDescription'] = 'Hasan';

      customTags['excerpt'] = 'Here is the post excerpt';

      customTags['rankmathTitle'] = 'Hasan';
      customTags['rankmathPermalink'] = 'Hasan';
      customTags['rankmathExcerpt'] = 'Hasan';
      customTags['rankmathFocusKeyword'] = 'Hasan';
      customTags['rankmathFocusKeywords'] = 'Hasan';

      customTags['rankmathOrgname'] = 'Hasan';
      customTags['rankmathOrgurl'] = 'Hasan';
      customTags['rankmathOrglogo'] = 'Hasan';



      customTags['siteTitle'] = '';
      customTags['siteDescription'] = '';
      customTags['siteTagline'] = '';

      customTags['postMeta'] = '';

      customTags['separator'] = '';
      customTags['searchTerms'] = '';



      customTags['counter'] = '1';



    }, [clientId]);

    // Wrapper CSS Class Selectors
    const wrapperSelector = blockClass;


    var linkSelector = '';


    if (wrapper.options.tag.length != 0) {

      if (featuredImage.options.linkTo.length > 0) {
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


            featuredImage.styles.filter[breakPointX].splice(args.index, 1);
            var styles = featuredImage.styles;

            setAttributes({ featuredImage: { ...featuredImage, styles: styles } });

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



      var responsive = featuredImage.styles.padding;
      responsive[breakPointX] = nextValues;

      var styles = { ...featuredImage.styles, padding: responsive };
      setAttributes({ featuredImage: { ...featuredImage, styles: styles } });


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


      var responsive = featuredImage.styles.margin;
      responsive[breakPointX] = nextValues;


      var styles = { ...featuredImage.styles, margin: responsive };
      setAttributes({ featuredImage: { ...featuredImage, styles: styles } });

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

      generateBlockCssY()

    }, [blockCssY]);


    useEffect(() => {


      setAttributes({ customCss: customCss });


      generateBlockCssY()

    }, [customCss]);



    useEffect(() => {
      linkAttrObj();

    }, [featuredImage]);






    var linkAttrObj = () => {

      var sdsd = {};

      featuredImage.options.linkAttr.map(x => {

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


    var postUrl = (featuredImage.options.customUrl != undefined && featuredImage.options.customUrl.length > 0) ? featuredImage.options.customUrl : currentPostUrl;


    const CustomTag = `${wrapper.options.tag}`;
    const CustomTagPostTitle = `${featuredImage.options.tag}`;




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

            </PanelBody>

            <PanelBody title="Featured Image" initialOpen={false}>



              <PanelRow className='mb-4'>
                <label for="">Thumbnail Size</label>
                <PGDropdown position="bottom right" variant="secondary" options={imageSizes} buttonTitle="Choose" onChange={setFeaturedImageSize} values={featuredImage.options.size[breakPointX]}></PGDropdown>
              </PanelRow>


              {featuredImage.options.size[breakPointX] != undefined && (

                <div className='bg-gray-400 text-white px-3 py-2 my-3' > {featuredImage.options.size[breakPointX]}</div>

              )}





              <PanelRow>
                <label for="">Link To</label>
                <SelectControl
                  label=""
                  value={featuredImage.options.linkTo}
                  options={[
                    { label: 'No Link', value: '' },
                    { label: 'Post URL', value: 'postUrl' },
                    { label: 'Custom Field', value: 'customField' },
                    { label: 'Author URL', value: 'authorUrl' },
                    { label: 'Author Link', value: 'authorLink' },
                    { label: 'Home URL', value: 'homeUrl' },
                    { label: 'Custom', value: 'custom' },

                  ]}
                  onChange={(newVal) => {
                    var options = { ...featuredImage.options, linkTo: newVal };
                    setAttributes({ featuredImage: { ...featuredImage, options: options } });
                  }

                  }
                />
              </PanelRow>

              {featuredImage.options.linkTo == 'customField' && (



                <PanelRow>
                  <label for="">Custom Field Key</label>
                  <InputControl
                    className='mr-2'
                    value={featuredImage.options.linkToMetaKey}
                    onChange={(newVal) => {


                      var options = { ...featuredImage.options, linkToMetaKey: newVal };
                      setAttributes({ featuredImage: { ...featuredImage, options: options } });

                    }}
                  />
                </PanelRow>


              )}



              {(featuredImage.options.customUrl.length > 0) && (

                (postGridData.license_status != 'active') && (
                  <PGproWrapper utmUrl={"?utm_source=editor&utm_term=postFeaturedImage&utm_campaign=pluginPostGrid&utm_medium=postFeaturedImage-customUrl"}>
                    <p><span className='underline'>Custom URL</span> feature only avilable in pro version</p>
                  </PGproWrapper>
                )

              )}


              {featuredImage.options.linkTo == 'custom' && (

                <PanelRow>
                  <label for="">Custom URL</label>

                  <div className='relative'>
                    <Button className={(linkPickerPosttitle) ? "!bg-gray-400" : ''} icon={link} onClick={ev => {

                      setLinkPickerPosttitle(prev => !prev);

                    }}></Button>
                    {featuredImage.options.customUrl.length > 0 && (
                      <Button className='!text-red-500 ml-2' icon={linkOff} onClick={ev => {

                        var options = { ...featuredImage.options, customUrl: '' };
                        setAttributes({ featuredImage: { ...featuredImage, options: options } });
                        setLinkPickerPosttitle(false);

                      }}></Button>

                    )}
                    {linkPickerPosttitle && (
                      <Popover position="bottom right">
                        <LinkControl settings={[]} value={featuredImage.options.customUrl} onChange={newVal => {

                          var options = { ...featuredImage.options, customUrl: newVal.url };

                          setAttributes({ featuredImage: { ...featuredImage, options: options } });

                        }} />

                        <div className='p-2'><span className='font-bold'>Linked to:</span> {(featuredImage.options.customUrl.length != 0) ? featuredImage.options.customUrl : 'No link'} </div>
                      </Popover>

                    )}


                  </div>
                </PanelRow>

              )}


              {featuredImage.options.linkTo.length == 0 && (



                <PanelRow>
                  <label for="">Custom Tag</label>
                  <SelectControl
                    label=""
                    value={featuredImage.options.tag}
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
                      var options = { ...featuredImage.options, tag: newVal };
                      setAttributes({ featuredImage: { ...featuredImage, options: options } });
                    }

                    }
                  />
                </PanelRow>
              )}




              {featuredImage.options.linkTo.length > 0 && (

                <div>
                  <PanelRow>
                    <label for="">Link Target</label>

                    <SelectControl
                      label=""
                      value={featuredImage.options.linkTarget}
                      options={[
                        { label: 'Choose...', value: '' },

                        { label: '_self', value: '_self' },
                        { label: '_blank', value: '_blank' },
                        { label: '_parent', value: '_parent' },
                        { label: '_top', value: '_top' },


                      ]}
                      onChange={(newVal) => {



                        var options = { ...featuredImage.options, linkTarget: newVal };
                        setAttributes({ featuredImage: { ...featuredImage, options: options } });



                      }



                      }
                    />
                  </PanelRow>








                  <PanelRow>
                    <label for="">Custom Attributes</label>
                    <div
                      className=' cursor-pointer px-3 text-white py-1 bg-blue-600'

                      onClick={(ev) => {

                        var sdsd = featuredImage.options.linkAttr.concat({ id: '', val: '' })


                        var options = { ...featuredImage.options, linkAttr: sdsd };
                        setAttributes({ featuredImage: { ...featuredImage, options: options } });

                        linkAttrObj()
                      }}

                    >Add</div>



                  </PanelRow>



                  {
                    featuredImage.options.linkAttr.map((x, i) => {

                      return (

                        <div className='my-2'>
                          <PanelRow>
                            <InputControl
                              className='mr-2'
                              value={featuredImage.options.linkAttr[i].id}
                              onChange={(newVal) => {

                                featuredImage.options.linkAttr[i].id = newVal;


                                var ssdsd = featuredImage.options.linkAttr.concat([]);



                                var options = { ...featuredImage.options, linkAttr: ssdsd };
                                setAttributes({ featuredImage: { ...featuredImage, options: options } });

                              }}
                            />

                            <InputControl
                              className='mr-2'
                              value={x.val}
                              onChange={(newVal) => {
                                featuredImage.options.linkAttr[i].val = newVal
                                var ssdsd = featuredImage.options.linkAttr.concat([]);



                                var options = { ...featuredImage.options, linkAttr: ssdsd };
                                setAttributes({ featuredImage: { ...featuredImage, options: options } });

                              }}
                            />
                            <span className='text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close'
                              onClick={(ev) => {

                                featuredImage.options.linkAttr.splice(i, 1);

                                var ssdsd = featuredImage.options.linkAttr.concat([]);


                                var options = { ...featuredImage.options, linkAttr: ssdsd };
                                setAttributes({ featuredImage: { ...featuredImage, options: options } });
                              }}

                            ></span>
                          </PanelRow>




                        </div>

                      )

                    })
                  }


                </div>



              )}



              <PanelRow>
                <label for="">Alt Text Source</label>
                <SelectControl
                  label=""
                  value={featuredImage.options.altTextSrc}
                  options={[
                    { label: 'No Link', value: '' },
                    { label: 'Image Alt Text', value: 'imgAltText' },
                    { label: 'Image Title', value: 'imgTitle' },
                    { label: 'Image Caption', value: 'imgCaption' },
                    { label: 'Image Description', value: 'imgDescription' },
                    { label: 'Image Slug', value: 'imgSlug' },
                    { label: 'Post Title', value: 'postTitle' },
                    { label: 'Post Excerpt', value: 'excerpt' },
                    { label: 'Post Slug', value: 'postSlug' },
                    { label: 'Post Custom Field', value: 'customField' },
                    { label: 'Custom', value: 'custom' },


                  ]}
                  onChange={(newVal) => {
                    var options = { ...featuredImage.options, altTextSrc: newVal };
                    setAttributes({ featuredImage: { ...featuredImage, options: options } });
                  }

                  }
                />
              </PanelRow>



              {featuredImage.options.altTextSrc == 'customField' && (



                <PanelRow>
                  <label for="">Custom Field Key</label>
                  <InputControl
                    className='mr-2'
                    value={featuredImage.options.altTextMetaKey}
                    onChange={(newVal) => {


                      var options = { ...featuredImage.options, altTextMetaKey: newVal };
                      setAttributes({ featuredImage: { ...featuredImage, options: options } });

                    }}
                  />
                </PanelRow>


              )}


              {featuredImage.options.altTextSrc == 'custom' && (



                <PanelRow>
                  <label for="">Custom Alt Text</label>
                  <InputControl
                    className='mr-2'
                    value={featuredImage.options.altTextCustom}
                    onChange={(newVal) => {


                      var options = { ...featuredImage.options, altTextCustom: newVal };
                      setAttributes({ featuredImage: { ...featuredImage, options: options } });

                    }}
                  />
                </PanelRow>


              )}







              {featuredImage.styles.filter[breakPointX] != undefined && postGridData.license_status != 'active' && (

                <PGproWrapper utmUrl={"?utm_source=editor&utm_term=postFeaturedImage&utm_campaign=pluginPostGrid&utm_medium=postFeaturedImage-filters"}>
                  <p>Filters feature only avilable in pro version</p>
                </PGproWrapper>
              )}



              <PanelRow>
                <label>Filters </label>
                <PGDropdown position="bottom right" variant="secondary" options={filterArgs} buttonTitle="Add" onChange={addfilterArgs} values=""></PGDropdown>
                <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
              </PanelRow>


              <div className='my-5'>

                {
                  featuredImage.styles.filter[breakPointX] != undefined && (



                    featuredImage.styles.filter[breakPointX].map((arg, index) => {

                      return (
                        <div>

                          <PanelBody title={<BefroeTitle title={arg.label} args={{ index: index, arg: arg }} />} initialOpen={false}>

                            <div>


                              <RangeControl
                                value={arg.val}
                                onChange={(newVal) => {
                                  arg.val = newVal;

                                  featuredImage.styles.filter[breakPointX][index] = arg;
                                  var styles = featuredImage.styles;

                                  setAttributes({ featuredImage: { ...featuredImage, styles: styles } });
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
                value={featuredImage.styles.objectFit[breakPointX]}
                options={[
                  { label: 'Fill', value: 'fill' },
                  { label: 'Contain', value: 'contain' },
                  { label: 'Cover', value: 'cover' },

                  { label: 'None', value: 'none' },
                  { label: 'Scale-down', value: 'scale-down' },


                ]}
                onChange={(newVal) => {


                  var newValuesObj = {};

                  if (Object.keys(featuredImage.styles.objectFit).length == 0) {
                    newValuesObj[breakPointX] = newVal;
                  } else {
                    newValuesObj = featuredImage.styles.objectFit;
                    newValuesObj[breakPointX] = newVal;
                  }

                  var styles = { ...featuredImage.styles, objectFit: newValuesObj };
                  setAttributes({ featuredImage: { ...featuredImage, styles: styles } });

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
                  value={(featuredImage.styles.width[breakPointX] != undefined ? featuredImage.styles.width[breakPointX].val : 10)}
                  type="number"
                  onChange={(newVal) => {

                    var newValuesObj = {};
                    if (Object.keys(featuredImage.styles.width).length == 0) {
                      newValuesObj[breakPointX] = { val: newVal, unit: 'em' };
                    } else {
                      newValuesObj = featuredImage.styles.width;
                      var unit = (newValuesObj[breakPointX] != undefined) ? newValuesObj[breakPointX].unit : 'em';

                      newValuesObj[breakPointX] = { val: newVal, unit: unit };
                    }


                    var styles = { ...featuredImage.styles, width: newValuesObj };
                    setAttributes({ featuredImage: { ...featuredImage, styles: styles } });



                    var widthVal = (newValuesObj[breakPointX].val) ? newValuesObj[breakPointX].val : 10;
                    var widthUnit = (newValuesObj[breakPointX].unit) ? newValuesObj[breakPointX].unit : 'em';


                    var widthX = (blockCssY.items[imgSelector] != undefined) ? blockCssY.items[imgSelector] : {};

                    widthX[breakPointX] = widthVal + widthUnit;
                    blockCssY.items[imgSelector] = { ...blockCssY.items[imgSelector], 'width': widthX };

                    setAttributes({ blockCssY: { items: blockCssY.items } });


                  }}

                />

                <SelectControl className='mb-0'
                  value={(featuredImage.styles.width[breakPointX] != undefined) ? featuredImage.styles.width[breakPointX].unit : 'em'}
                  options={[
                    { label: 'fr', value: 'fr' },
                    { label: 'px', value: 'px' },
                    { label: '%', value: '%' },
                    { label: 'em', value: 'em' },
                  ]}
                  onChange={(newVal) => {


                    var newValuesObj = {};
                    if (Object.keys(featuredImage.styles.width).length == 0) {
                      newValuesObj[breakPointX] = { val: 10, unit: newVal };
                    } else {
                      newValuesObj = featuredImage.styles.width;
                      var val = (newValuesObj[breakPointX] != undefined) ? newValuesObj[breakPointX].val : 10;

                      newValuesObj[breakPointX] = { val: val, unit: newVal };
                    }


                    var styles = { ...featuredImage.styles, width: newValuesObj };
                    setAttributes({ featuredImage: { ...featuredImage, styles: styles } });



                    var widthVal = (newValuesObj[breakPointX].val) ? newValuesObj[breakPointX].val : 10;
                    var widthUnit = (newValuesObj[breakPointX].unit) ? newValuesObj[breakPointX].unit : 'em';


                    var widthX = (blockCssY.items[imgSelector] != undefined) ? blockCssY.items[imgSelector] : {};

                    widthX[breakPointX] = widthVal + widthUnit;
                    blockCssY.items[imgSelector] = { ...blockCssY.items[imgSelector], 'width': widthX };

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
                  value={(featuredImage.styles.height[breakPointX] != undefined ? featuredImage.styles.height[breakPointX].val : 10)}
                  type="number"
                  onChange={(newVal) => {

                    var newValuesObj = {};
                    if (Object.keys(featuredImage.styles.height).length == 0) {
                      newValuesObj[breakPointX] = { val: newVal, unit: 'em' };
                    } else {
                      newValuesObj = featuredImage.styles.height;
                      var unit = (newValuesObj[breakPointX] != undefined) ? newValuesObj[breakPointX].unit : 'em';

                      newValuesObj[breakPointX] = { val: newVal, unit: unit };
                    }


                    var styles = { ...featuredImage.styles, height: newValuesObj };
                    setAttributes({ featuredImage: { ...featuredImage, styles: styles } });



                    var heightVal = (newValuesObj[breakPointX].val) ? newValuesObj[breakPointX].val : 10;
                    var heightUnit = (newValuesObj[breakPointX].unit) ? newValuesObj[breakPointX].unit : 'em';


                    var heightX = (blockCssY.items[imgSelector] != undefined) ? blockCssY.items[imgSelector] : {};

                    heightX[breakPointX] = heightVal + heightUnit;
                    blockCssY.items[imgSelector] = { ...blockCssY.items[imgSelector], 'height': heightX };

                    setAttributes({ blockCssY: { items: blockCssY.items } });


                  }}

                />

                <SelectControl className='mb-0'
                  value={(featuredImage.styles.height[breakPointX] != undefined) ? featuredImage.styles.height[breakPointX].unit : 'em'}
                  options={[
                    { label: 'fr', value: 'fr' },
                    { label: 'px', value: 'px' },
                    { label: '%', value: '%' },
                    { label: 'em', value: 'em' },
                  ]}
                  onChange={(newVal) => {


                    var newValuesObj = {};
                    if (Object.keys(featuredImage.styles.height).length == 0) {
                      newValuesObj[breakPointX] = { val: 10, unit: newVal };
                    } else {
                      newValuesObj = featuredImage.styles.height;
                      var val = (newValuesObj[breakPointX] != undefined) ? newValuesObj[breakPointX].val : 10;

                      newValuesObj[breakPointX] = { val: val, unit: newVal };
                    }


                    var styles = { ...featuredImage.styles, height: newValuesObj };
                    setAttributes({ featuredImage: { ...featuredImage, styles: styles } });



                    var heightVal = (newValuesObj[breakPointX].val) ? newValuesObj[breakPointX].val : 10;
                    var heightUnit = (newValuesObj[breakPointX].unit) ? newValuesObj[breakPointX].unit : 'em';


                    var heightX = (blockCssY.items[imgSelector] != undefined) ? blockCssY.items[imgSelector] : {};

                    heightX[breakPointX] = heightVal + heightUnit;
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
                values={featuredImage.styles.padding[breakPointX]}
                onChange={(nextValues) => { paddingControl(nextValues) }}
              />


              <PanelRow>
                <label>Margin</label>
                <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
              </PanelRow>
              <BoxControl
                label=""
                values={featuredImage.styles.margin[breakPointX]}
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
              <PGContactSupport utm={{ utm_source: 'BlockPostTitle', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />

            </div>


          </InspectorControls >
        </div >
        ,


        <>


          {wrapper.options.useAsBackground == 'yes' && (
            <CustomTag className={[blockId]}></CustomTag>

          )}

          {postImage == null && (
            <div>
              <img src={MyImage} alt="Default Featured Image" />

            </div>

          )}

          {wrapper.options.useAsBackground == 'no' && wrapper.options.tag && (
            <CustomTag className={[blockId]}>
              {featuredImage.options.linkTo.length > 0 && (
                <a onClick={handleLinkClick} {...linkAttrItems} href={postUrl} target={featuredImage.options.linkTarget}>


                  {featuredImage.options.size[breakPointX] != undefined && (
                    <>
                      {postImage != null && <img src={((postImage != null && postImage.media_details.sizes[featuredImage.options.size[breakPointX]] != undefined) ? postImage.media_details.sizes[featuredImage.options.size[breakPointX]].source_url : '')} alt={postImage.alt_text} />}
                    </>
                  )}

                  {postImage != null && postImage.media_details.sizes[featuredImage.options.size[breakPointX]] == undefined && (
                    <>
                      No Image size found
                    </>
                  )}


                </a>
              )}
              {featuredImage.options.linkTo.length == 0 && (
                <>

                  {featuredImage.options.size[breakPointX] != undefined && (
                    <>
                      {postImage != null && <img src={((postImage != null && postImage.media_details.sizes[featuredImage.options.size[breakPointX]] != undefined) ? postImage.media_details.sizes[featuredImage.options.size[breakPointX]].source_url : '')} alt={postImage.alt_text} />}
                    </>
                  )}

                  {postImage != null && postImage.media_details.sizes[featuredImage.options.size[breakPointX]] == undefined && (
                    <>
                      No Image size found
                    </>
                  )}





                </>
              )}
            </CustomTag>
          )}

          {wrapper.options.useAsBackground == 'no' && wrapper.options.tag.length == 0 && (

            (
              featuredImage.options.linkTo.length > 0 && (
                <a onClick={handleLinkClick} className={[blockId]} {...linkAttrItems} href={postUrl} target={featuredImage.options.linkTarget}>


                  {postImage != null && <img src={postImage.guid.rendered} alt={postImage.alt_text} />}


                </a>)
            )
          )}

          {wrapper.options.useAsBackground == 'no' && wrapper.options.tag.length == 0 && featuredImage.options.linkTo.length == 0 && (


            <>
              {featuredImage.options.tag.length > 0 && (
                <CustomTagPostTitle className={blockId}>

                  {postImage != null && <img src={postImage.guid.rendered} alt={postImage.alt_text} />}

                </CustomTagPostTitle>

              )}
              {featuredImage.options.tag.length == 0 && (
                <div className={blockId}>

                  {postImage != null && <img src={postImage.guid.rendered} alt={postImage.alt_text} />}

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