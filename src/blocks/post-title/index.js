import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

import { InspectorControls, BlockControls, AlignmentToolbar, RichText } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'

import IconToggle from '../../components/icon-toggle'
import Typography from '../../components/typography'

import BreakpointToggle from '../../components/breakpoint-toggle'



var myStore = wp.data.select('my-shop');

registerBlockType("post-grid/post-title", {
  title: "Post Title",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#7e70af',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src: <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M4 14.5h16V16H4zM4 18.5h9V20H4zM4 4h3c2 0 3 .86 3 2.583 0 .891-.253 1.554-.76 1.988-.505.435-1.24.652-2.204.652H5.542V12H4V4zm2.855 4c.53 0 .924-.114 1.18-.343.266-.228.398-.579.398-1.051 0-.473-.132-.82-.397-1.04-.265-.229-.67-.343-1.217-.343H5.542V8h1.313z"></path></svg>,
  },


  attributes: {


    wrapper: {
      type: 'object',
      default: {
        options: { tag: 'h2', class: '' },

        styles:
        {
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {}
        },
      },
    },

    postTitle: {
      type: 'object',
      default: {
        options: {
          isLink: true,
          linkTarget: '',
          linkAttr: [],
          customUrl: '',
          class: '',
        },
        typo: {
          fontSize: {}, //{ val: '18', unit: 'px' }
          lineHeight: {}, // { val: '18', unit: 'px' }
          letterSpacing: {}, // { val: '18', unit: 'px' }
          fontFamily: {},
          fontWeight: {},
          textDecoration: {}, //overline, line-through, underline
          textTransform: {},
        },
        styles: {
          textAlign: {},
          display: {},
          width: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {}
        },
      },
    },



    prefix: {
      type: 'object',
      default: {
        options:
          { text: '', class: 'prefix', },
        styles:
        {
          color: {},
          bgColor: {},

        },
      },
    },

    postfix: {
      type: 'object',
      default: {
        options:
          { text: '', class: 'prefix', },
        styles:
        {
          color: {},
          bgColor: {},

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

    var blockIdX = attributes.blockId ? attributes.blockId : 'pg' + clientId.split('-').pop();
    var blockClass = '.' + blockIdX;

    let postTitle = attributes.postTitle;
    var wrapper = attributes.wrapper;
    var blockId = attributes.blockId;


    var prefix = attributes.prefix;
    var postfix = attributes.postfix;
    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;



    var postId = context['postId'];
    var postType = context['postType'];

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    const [license, setLicense] = useState(myStore.getLicense());

    const [customTags, setCustomTags] = useState({});



    const [
      currentPostTitle,
      setCurrentPostTitle,
    ] = useEntityProp('postType', postType, 'title', postId);


    const [
      currentPostUrl,
      setCurrentPostUrl,
    ] = useEntityProp('postType', postType, 'link', postId);


    useEffect(() => {

      setAttributes({ blockId: blockIdX });

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
      customTags['postMeta'] = '';

      customTags['separator'] = '';
      customTags['searchTerms'] = '';



      customTags['counter'] = '1';



    }, [clientId]);

    // Wrapper CSS Class Selectors
    const titleWrapperSelector = blockClass;
    const titleLinkSelector = postTitle.options.isLink ? blockClass + ' a' : blockClass;
    const titlePrefixSelector = blockClass + ' .prefix';
    const titlePostfixSelector = blockClass + ' .postfix';




    var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }



    function paddingControl(nextValues) {


      var responsive = postTitle.styles.padding;
      responsive[breakPointX] = nextValues;

      //console.log(nextValues);


      var styles = { ...postTitle.styles, padding: responsive };
      setAttributes({ postTitle: { ...postTitle, styles: styles } });


      blockCssY.items[titleLinkSelector] = (blockCssY.items[titleLinkSelector] != undefined) ? blockCssY.items[titleLinkSelector] : {};



      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[titleLinkSelector]['padding-top'] != undefined) ? blockCssY.items[titleLinkSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[titleLinkSelector]['padding-right'] != undefined) ? blockCssY.items[titleLinkSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[titleLinkSelector]['padding-bottom'] != undefined) ? blockCssY.items[titleLinkSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[titleLinkSelector]['padding-left'] != undefined) ? blockCssY.items[titleLinkSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'padding-left': paddingLeft };


      }


      //setAttributes({ blockCssY: { items: blockCssY.items } });



    }





    function marginControl(nextValues) {


      var responsive = postTitle.styles.margin;
      responsive[breakPointX] = nextValues;


      var styles = { ...postTitle.styles, margin: responsive };
      setAttributes({ postTitle: { ...postTitle, styles: styles } });



      blockCssY.items[titleLinkSelector] = (blockCssY.items[titleLinkSelector] != undefined) ? blockCssY.items[titleLinkSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[titleLinkSelector]['margin-top'] != undefined) ? blockCssY.items[titleLinkSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'margin-top': marginTop };
      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[titleLinkSelector]['margin-right'] !== undefined) ? blockCssY.items[titleLinkSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[titleLinkSelector]['margin-bottom'] !== undefined) ? blockCssY.items[titleLinkSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[titleLinkSelector]['margin-left'] !== undefined) ? blockCssY.items[titleLinkSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'margin-left': marginLeft };

      }

      //setAttributes({ blockCssY: { items: blockCssY.items } });
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


        //console.log(reponsiveCssDesktop);

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

    }, [postTitle]);






    var linkAttrObj = () => {

      var sdsd = {};

      postTitle.options.linkAttr.map(x => {

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


    var postUrl = (postTitle.options.customUrl != undefined && postTitle.options.customUrl.length > 0) ? postTitle.options.customUrl : currentPostUrl;


    const CustomTag = `${wrapper.options.tag}`;



    function onChangeTypo(typoX) {
      //console.log(typoX);

      setAttributes({ postTitle: { ...postTitle, typo: typoX } });

      var newValuesObjX = {};


      console.log(typoX);



      if (typoX.fontFamily[breakPointX] != undefined) {

        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'font-family': typoX.fontFamily };

      }


      if (typoX.fontSize[breakPointX] != undefined) {

        var fontSizeVal = (typoX.fontSize[breakPointX].val) ? typoX.fontSize[breakPointX].val : 16;
        var fontSizeUnit = (typoX.fontSize[breakPointX].unit) ? typoX.fontSize[breakPointX].unit : 'px';


        var fontSizeX = (blockCssY.items[titleLinkSelector]['font-size'] != undefined) ? blockCssY.items[titleLinkSelector]['font-size'] : {};

        fontSizeX[breakPointX] = fontSizeVal + fontSizeUnit;
        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'font-size': fontSizeX };

      }

      if (typoX.lineHeight[breakPointX] != undefined) {


        //var lineHeightVal = (typoX.lineHeight[breakPointX].val) ? typoX.lineHeight[breakPointX].val : 16;
        //var lineHeightUnit = (typoX.lineHeight[breakPointX].unit) ? typoX.lineHeight[breakPointX].unit : 'px';


        // var lineHeightX = (blockCssY.items[titleLinkSelector]['line-height'] != undefined) ? blockCssY.items[titleLinkSelector]['line-height'] : {};
        // lineHeightX[breakPointX] = lineHeightVal + lineHeightUnit;
        // blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'line-height': lineHeightX };




      }

      if (typoX.lineHeight[breakPointX] != undefined) {

        var lineHeightVal = (typoX.lineHeight[breakPointX].val) ? typoX.lineHeight[breakPointX].val : 16;
        var lineHeightUnit = (typoX.lineHeight[breakPointX].unit) ? typoX.lineHeight[breakPointX].unit : 'px';

        console.log(lineHeightUnit)

        var lineHeightX = (blockCssY.items[titleLinkSelector]['line-height'] != undefined) ? blockCssY.items[titleLinkSelector]['line-height'] : {};

        lineHeightX[breakPointX] = lineHeightVal + lineHeightUnit;

        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'line-height': lineHeightX };
      }
      if (typoX.letterSpacing[breakPointX] != undefined) {

        var letterSpacingVal = (typoX.letterSpacing[breakPointX].val) ? typoX.letterSpacing[breakPointX].val : 16;
        var letterSpacingUnit = (typoX.letterSpacing[breakPointX].unit) ? typoX.letterSpacing[breakPointX].unit : 'px';



        var letterSpacingX = (blockCssY.items[titleLinkSelector]['letter-spacing'] != undefined) ? blockCssY.items[titleLinkSelector]['letter-spacing'] : {};

        letterSpacingX[breakPointX] = letterSpacingVal + letterSpacingUnit;

        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'letter-spacing': letterSpacingX };
      }

      if (typoX.fontWeight[breakPointX] != undefined) {

        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'font-weight': typoX.fontWeight };

      }


      if (typoX.textDecoration[breakPointX] != undefined) {

        var str = {};

        var textDecorationX = typoX.textDecoration[breakPointX];
        var textDecorationXStr = (textDecorationX.length > 0) ? textDecorationX.join(' ') : '';

        str[breakPointX] = textDecorationXStr;

        //typoX.textDecoration[breakPointX] = typoX.textDecoration[breakPointX].join(' ');

        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'text-decoration': str };

      }
      if (typoX.textTransform[breakPointX] != undefined) {

        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'text-transform': typoX.textTransform };


      }

      setAttributes({ blockCssY: { items: blockCssY.items } });



    }

    function onChangeBreakPoint(x, index) {


      setPreviewDeviceType(x.value)
      var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value)

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
              value={wrapper.styles.textAlign}
              onChange={(nextAlign) => {

                var textAlign = wrapper.styles.textAlign;
                textAlign[breakPointX] = nextAlign;

                var styles = { ...wrapper.styles, textAlign: textAlign };
                setAttributes({ wrapper: { options: wrapper.options, styles: styles } });










                blockCssY.items[titleWrapperSelector] = { ...blockCssY.items[titleWrapperSelector], 'text-align': textAlign };
                setAttributes({ blockCssY: { items: blockCssY.items } });


              }}
            />
          </BlockControls>


          <InspectorControls key="general">
            <div className='px-3' initialOpen={false}>



              <div>

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
                </PanelBody>

                <PanelBody title="Post Title" initialOpen={true}>




                  <ToggleControl
                    label="Linked with post?"
                    help={postTitle.options.isLink ? 'Linked with post URL' : 'Not linked to post URL.'}
                    checked={postTitle.options.isLink ? true : false}
                    onChange={(e) => {



                      var options = { ...postTitle.options, isLink: postTitle.options.isLink ? false : true };
                      setAttributes({ postTitle: { ...postTitle, options: options } });



                    }}
                  />

                  {postTitle.options.isLink && (

                    <div>
                      <PanelRow>
                        <label for="">Link Target</label>

                        <SelectControl
                          label=""
                          value={postTitle.options.linkTarget}
                          options={[
                            { label: '_self', value: '_self' },
                            { label: '_blank', value: '_blank' },
                            { label: '_parent', value: '_parent' },
                            { label: '_top', value: '_top' },


                          ]}
                          onChange={(newVal) => {



                            var options = { ...postTitle.options, linkTarget: newVal };
                            setAttributes({ postTitle: { ...postTitle, options: options } });



                          }



                          }
                        />
                      </PanelRow>




                      <PanelRow>
                        <label for="">Custom Url</label>

                        <InputControl
                          value={postTitle.options.customUrl}
                          onChange={(newVal) => {


                            var options = { ...postTitle.options, customUrl: newVal };
                            setAttributes({ postTitle: { ...postTitle, options: options } });

                          }
                          }
                        />
                      </PanelRow>










                      <PanelRow>
                        <label for="">Custom Attributes</label>
                        <div
                          className=' cursor-pointer px-3 text-white py-1 bg-blue-600'

                          onClick={(ev) => {

                            var sdsd = postTitle.options.linkAttr.concat({ id: '', val: '' })


                            var options = { ...postTitle.options, linkAttr: sdsd };
                            setAttributes({ postTitle: { ...postTitle, options: options } });

                            linkAttrObj()
                          }}

                        >Add</div>



                      </PanelRow>



                      {
                        postTitle.options.linkAttr.map((x, i) => {

                          return (

                            <div className='my-2'>
                              <PanelRow>
                                <InputControl
                                  className='mr-2'
                                  value={postTitle.options.linkAttr[i].id}
                                  onChange={(newVal) => {

                                    postTitle.options.linkAttr[i].id = newVal;


                                    var ssdsd = postTitle.options.linkAttr.concat([]);



                                    var options = { ...postTitle.options, linkAttr: ssdsd };
                                    setAttributes({ postTitle: { ...postTitle, options: options } });

                                  }}
                                />

                                <InputControl
                                  className='mr-2'
                                  value={x.val}
                                  onChange={(newVal) => {
                                    postTitle.options.linkAttr[i].val = newVal
                                    var ssdsd = postTitle.options.linkAttr.concat([]);



                                    var options = { ...postTitle.options, linkAttr: ssdsd };
                                    setAttributes({ postTitle: { ...postTitle, options: options } });

                                  }}
                                />
                                <span className='text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close'
                                  onClick={(ev) => {

                                    postTitle.options.linkAttr.splice(i, 1);

                                    var ssdsd = postTitle.options.linkAttr.concat([]);


                                    var options = { ...postTitle.options, linkAttr: ssdsd };
                                    setAttributes({ postTitle: { styles: postTitle.styles, options: options } });
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
                    <label>Color</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                  </PanelRow>


                  <ColorPalette
                    value={postTitle.styles.color[breakPointX]}
                    colors={colors}
                    enableAlpha
                    onChange={(newVal) => {

                      var newValuesObj = {};


                      if (Object.keys(postTitle.styles.color).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = postTitle.styles.color;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...postTitle.styles, color: newValuesObj };
                      setAttributes({ postTitle: { ...postTitle, styles: styles } });




                      var newValuesObjX = {};
                      if (blockCssY.items[titleLinkSelector] == undefined) {

                        newValuesObjX[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], color: newValuesObj };

                      } else {

                        newValuesObjX[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], color: newValuesObj };
                      }


                      setAttributes({ blockCssY: { items: newValuesObjX } });

                      // blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'color': newValuesObj };
                      // setAttributes({ blockCssY: { items: blockCssY.items } });

                    }}
                  />


                  <PanelRow className='my-3'>
                    <label>Background Color</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                  </PanelRow>


                  <ColorPalette
                    value={postTitle.styles.bgColor[breakPointX]}
                    colors={colors}
                    enableAlpha
                    onChange={(newVal) => {

                      var newValuesObj = {};


                      if (Object.keys(postTitle.styles.bgColor).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = postTitle.styles.bgColor;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...postTitle.styles, bgColor: newValuesObj };
                      setAttributes({ postTitle: { ...postTitle, styles: styles } });







                      var newValuesObjX = {};
                      if (blockCssY.items[titleLinkSelector] == undefined) {

                        newValuesObjX[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'background-color': newValuesObj };

                      } else {

                        newValuesObjX[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'background-color': newValuesObj };
                      }


                      setAttributes({ blockCssY: { items: newValuesObjX } });


                      //blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'background-color': newValuesObj };
                      //setAttributes({ blockCssY: { items: blockCssY.items } });


                    }}
                  />


                  <PanelRow>
                    <div className='font-bold'>Typography</div>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>

                  <Typography typo={postTitle.typo} breakPointX={breakPointX} onChange={onChangeTypo} setAttributes={setAttributes} postTitleX={postTitle} />



                  <PanelRow className='my-3'>
                    <label>Display</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>

                  <PanelRow>

                    <SelectControl
                      label=""
                      value={postTitle.styles.display[breakPointX]}

                      options={[
                        { label: 'Select..', value: '' },

                        { label: 'inline', value: 'inline' },
                        { label: 'inline-block', value: 'inline-block' },
                        { label: 'block', value: 'block' },



                      ]}
                      onChange={(newVal) => {



                        var newValuesObj = {};


                        if (Object.keys(postTitle.styles.display).length == 0) {
                          newValuesObj[breakPointX] = newVal;
                        } else {
                          newValuesObj = postTitle.styles.display;
                          newValuesObj[breakPointX] = newVal;
                        }


                        var styles = { ...postTitle.styles, display: newValuesObj };
                        setAttributes({ postTitle: { ...postTitle, styles: styles } });









                        var newValuesObjX = {};
                        if (blockCssY.items[titleLinkSelector] == undefined) {

                          newValuesObjX[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], display: newValuesObj };

                        } else {

                          newValuesObjX[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], display: newValuesObj };
                        }


                        setAttributes({ blockCssY: { items: newValuesObjX } });







                        //blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'display': newValuesObj };
                        //setAttributes({ blockCssY: { items: blockCssY.items } });




                      }

                      }
                    />
                  </PanelRow>




                  <PanelRow>
                    <label>Padding</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=""
                    values={postTitle.styles.padding[breakPointX]}
                    onChange={(nextValues) => { paddingControl(nextValues) }}
                  />


                  <PanelRow>
                    <label>Margin</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=""
                    values={postTitle.styles.margin[breakPointX]}
                    onChange={(nextValues) => { marginControl(nextValues) }}
                  />


                </PanelBody>


                <PanelBody title="Prefix" initialOpen={false}>
                  <PanelRow>
                    <label for="">Prefix</label>

                    <InputControl
                      value={prefix.options.text}
                      onChange={(newVal) => {



                        var options = { ...prefix.options, text: newVal };
                        setAttributes({ prefix: { styles: prefix.styles, options: options } });



                        // setAttributes({ prefix: { text: newVal, class: prefix.options.class, color: prefix.color, bgColor: prefix.bgColor } })
                      }
                      }
                    />
                  </PanelRow>

                </PanelBody>




                <PanelBody title="Postfix" initialOpen={false}>




                  <PanelRow>
                    <label for="">Postfix</label>

                    <InputControl
                      value={postfix.options.text}
                      onChange={(newVal) => {


                        var options = { ...postfix.options, text: newVal };
                        setAttributes({ postfix: { styles: postfix.styles, options: options } });


                        // setAttributes({ postfix: { text: newVal, class: prefix.options.class, color: postfix.color, bgColor: postfix.bgColor } })
                      }

                      }
                    />
                  </PanelRow>

                </PanelBody>

                <PanelBody title="Custom Style" initialOpen={false}>


                  <p>Please use following class selector to apply your custom CSS</p>
                  <div className='my-3'>
                    <p className='font-bold'>Title Wrapper</p>
                    <p><code>{titleWrapperSelector}{'{/* your CSS here*/}'}</code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Title link</p>
                    <p><code>{titleLinkSelector}{'{/* your CSS here*/}'} </code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Prefix</p>
                    <p><code>{titlePrefixSelector}{'{/* your CSS here*/}'} </code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Postfix</p>
                    <p><code>{titlePostfixSelector}{'{/* your CSS here*/}'} </code></p>
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

              </div>
            </div>


          </InspectorControls >
        </div >
        ,


        <>
          {wrapper.options.tag && (
            <CustomTag className={[blockId]}>
              {postTitle.options.isLink && (
                <a {...linkAttrItems} href={postUrl} target={postTitle.options.linkTarget}>
                  {(prefix.options.text && (<span className={prefix.options.class}>{prefix.options.text}</span>))}
                  {(currentPostTitle)}
                  {(postfix.options.text && (<span className={postfix.options.class}>{postfix.options.text}</span>))}
                </a>
              )}
              {!postTitle.options.isLink && (
                <>
                  {(prefix.options.text && (<span className={prefix.options.class}>{prefix.options.text}</span>))}
                  {(currentPostTitle)}
                  {(postfix.options.text && (<span className={postfix.options.class}>{postfix.options.text}</span>))}
                </>
              )}
            </CustomTag>
          )}

          {wrapper.options.tag.length == 0 && (

            (
              postTitle.options.isLink && (<a className={[blockId]} {...linkAttrItems} href={postUrl} target={postTitle.options.linkTarget}>

                {(prefix.options.text && (<span className={prefix.options.class}>{prefix.options.text}</span>))}
                {(currentPostTitle)}
                {(postfix.options.text && (<span className={postfix.options.class}>{postfix.options.text}</span>))}

              </a>)
            )
          )}

          {wrapper.options.tag.length == 0 && !postTitle.options.isLink && (
            <p className={blockId}>
              {(prefix.options.text && (<span className={prefix.options.class}>{prefix.options.text}</span>))}
              {(currentPostTitle)}
              {(postfix.options.text && (<span className={postfix.options.class}>{postfix.options.text}</span>))}
            </p>

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