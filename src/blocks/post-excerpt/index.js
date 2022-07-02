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
import BreakpointToggle from '../../components/breakpoint-toggle'



var myStore = wp.data.select('my-shop');

////console.log(wp.data.select('my-shop').getBreakPoint('food'))
//console.log(myStore.getBreakPoint());




////console.log(wp.data.select('my-shop').setPrice('food', 98))
////console.log()




registerBlockType("post-grid/post-excerpt", {
  title: "Post Excerpt",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#7e70af',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src: <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12.75 9.333c0 .521-.102.977-.327 1.354-.23.386-.555.628-.893.774-.545.234-1.183.227-1.544.222l-.12-.001v-1.5h.123c.414.001.715.002.948-.099a.395.395 0 00.199-.166c.05-.083.114-.253.114-.584V7.2H8.8V4h3.95v5.333zM7.95 9.333c0 .521-.102.977-.327 1.354-.23.386-.555.628-.893.774-.545.234-1.183.227-1.544.222l-.12-.001v-1.5h.123c.414.001.715.002.948-.099a.394.394 0 00.198-.166c.05-.083.115-.253.115-.584V7.2H4V4h3.95v5.333zM13 20H4v-1.5h9V20zM20 16H4v-1.5h16V16z"></path></svg>,
  },


  attributes: {


    wrapper: {
      type: 'object',
      default: { textAlign: '', tag: 'p', class: '', color: {}, bgColor: {}, padding: {}, margin: {} },
    },
    postExcerpt: {
      type: 'object',
      default: { text: '', isLink: true, linkTarget: '', customUrl: '', linkAttr: [], class: '', color: {}, bgColor: {}, padding: {}, margin: {} },
    },

    readMore: {
      "type": "object",
      "default": { text: 'Read More', isLink: true, linkTarget: '', customUrl: '', linkAttr: [], class: '', color: {}, bgColor: {} }
    },

    prefix: {
      "type": "object",
      "default": { text: '', class: '', color: {}, bgColor: {} }
    },
    postfix: {
      "type": "object",
      "default": { text: '', class: '', color: {}, bgColor: {} }
    },

    customCss: {
      "type": "string",
      "default": ''
    },

    linkAttr: {
      "type": "array",
      "default": []
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

    var postExcerpt = attributes.postExcerpt;
    var wrapper = attributes.wrapper;
    var readMore = attributes.readMore;


    var linkAttr = attributes.linkAttr;
    var prefix = attributes.prefix;
    var postfix = attributes.postfix;
    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    var postId = context['postId'];
    var postType = context['postType'];

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    const [license, setLicense] = useState(myStore.getLicense());



    const [
      currentPostTitle,
      setCurrentPostTitle,
    ] = useEntityProp('postType', postType, 'excerpt', postId);


    const [
      currentPostUrl,
      setCurrentPostUrl,
    ] = useEntityProp('postType', postType, 'link', postId);



    //console.log(postExcerpt);



    // Wrapper CSS Class Selectors
    const excerptWrapperSelector = '.pg-postExcerpt';
    const excerptSelector = postExcerpt.isLink ? '.pg-postExcerpt a' : '.pg-postExcerpt';
    const redmoreSelector = '.pg-postExcerpt .readmore';





    var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }


    function paddingControl(nextValues) {


      var responsive = postExcerpt.padding;
      responsive[breakPointX] = nextValues;

      console.log(nextValues);
      console.log(responsive);

      setAttributes({ postExcerpt: { text: postExcerpt.text, isLink: postExcerpt.isLink, linkTarget: postExcerpt.linkTarget, customUrl: postExcerpt.customUrl, linkAttr: postExcerpt.linkAttr, class: postExcerpt.class, color: postExcerpt.color, bgColor: postExcerpt.bgColor, padding: responsive, margin: postExcerpt.margin } });



      blockCssY.items[excerptSelector] = (blockCssY.items[excerptSelector] != undefined) ? blockCssY.items[excerptSelector] : {};



      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[excerptSelector]['padding-top'] != undefined) ? blockCssY.items[excerptSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[excerptSelector]['padding-right'] != undefined) ? blockCssY.items[excerptSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[excerptSelector]['padding-bottom'] != undefined) ? blockCssY.items[excerptSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[excerptSelector]['padding-left'] != undefined) ? blockCssY.items[excerptSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });



    }





    function marginControl(nextValues) {

      var responsive = postExcerpt.margin;
      responsive[breakPointX] = nextValues;


      setAttributes({ postExcerpt: { text: postExcerpt.text, isLink: postExcerpt.isLink, linkTarget: postExcerpt.linkTarget, customUrl: postExcerpt.customUrl, linkAttr: postExcerpt.linkAttr, class: postExcerpt.class, color: postExcerpt.color, bgColor: postExcerpt.bgColor, padding: postExcerpt.padding, margin: responsive } });


      blockCssY.items[excerptSelector] = (blockCssY.items[excerptSelector] != undefined) ? blockCssY.items[excerptSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[excerptSelector]['margin-top'] != undefined) ? blockCssY.items[excerptSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector], 'margin-top': marginTop };
      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[excerptSelector]['margin-right'] !== undefined) ? blockCssY.items[excerptSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[excerptSelector]['margin-bottom'] !== undefined) ? blockCssY.items[excerptSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[excerptSelector]['margin-left'] !== undefined) ? blockCssY.items[excerptSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector], 'margin-left': marginLeft };

      }

      setAttributes({ blockCssY: { items: blockCssY.items } });
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





      //console.log(reponsiveCss);


      var iframe = document.querySelectorAll('[name="editor-canvas"]')[0];

      if (iframe) {

        setTimeout(() => {
          var iframeDocument = iframe.contentDocument;
          var body = iframeDocument.body;
          var divWrap = iframeDocument.getElementById("css-block-postCategories");

          if (divWrap != undefined) {
            iframeDocument.getElementById("css-block-postCategories").outerHTML = "";

          }

          var divWrap = '<div id="css-block-postCategories"></div>';
          body.insertAdjacentHTML('beforeend', divWrap);

          var csswrappg = iframeDocument.getElementById('css-block-postCategories');
          var str = '<style>' + reponsiveCss + '</style>';

          csswrappg.insertAdjacentHTML('beforeend', str);
        }, 200)


      } else {

        var wpfooter = document.getElementById('wpfooter');
        var divWrap = document.getElementById("css-block-postCategories");

        if (divWrap != undefined) {
          document.getElementById("css-block-postCategories").outerHTML = "";
        }

        var divWrap = '<div id="css-block-postCategories"></div>';
        wpfooter.insertAdjacentHTML('beforeend', divWrap);

        var csswrappg = document.getElementById('css-block-postCategories');
        var str = '<style>' + reponsiveCss + '</style>';
        csswrappg.insertAdjacentHTML('beforeend', str);



      }



    }












    var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.



    useEffect(() => {

      generateBlockCssY()

    }, [blockCssY]);



    useEffect(() => {
      console.log('Listening currentPostTitle: ', currentPostTitle);



    }, [currentPostTitle]);



    useEffect(() => {
      ////console.log('Listening linkAttr: ', linkAttr);
      linkAttrObj();





    }, [linkAttr]);





    var linkAttrObj = () => {

      var sdsd = {};

      linkAttr.map(x => {

        if (x.val)
          sdsd[x.id] = x.val;

      })

      ////console.log(sdsd);
      setlinkAttrItems(sdsd);
      //return sdsd;

    }

    ////console.log(breakPointList);
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


    var postUrl = (postExcerpt.customUrl != undefined && postExcerpt.customUrl.length > 0) ? postExcerpt.customUrl : currentPostUrl;

    //console.log('Hello');

    const CustomTag = `${wrapper.tag}`;

    const MyDropdown = () => (

      <div>

        <Dropdown
          position="bottom"
          renderToggle={({ isOpen, onToggle }) => (
            <Button
              title={(breakPoints[breakPointX] != undefined) ? breakPoints[breakPointX].name : ''}
              variant="secondary"
              onClick={onToggle}
              aria-expanded={isOpen}
            >
              <RawHTML className="text-lg ">{(breakPoints[breakPointX] != undefined) ? breakPoints[breakPointX].icon : '<span class="icon-responsive font-bold"></span>'}</RawHTML>


            </Button>
          )}
          renderContent={() => <div>

            {breakPointList.map(x => {


              return (

                <div className={' text-lg font-bold border-b inline-block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {


                  //console.log(x.value);

                  setPreviewDeviceType(x.value)
                  var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value)

                  asdsdsd.then((res) => {

                    setBreakPointX(res.breakpoint);
                    generateBlockCssY();

                  });



                }}>

                  {!x.value && (

                    <div><span class="icon-close"></span></div>

                  )}

                  {x.value && (

                    <RawHTML>{x.icon}</RawHTML>

                  )}

                </div>

              )

            })}
          </div>}
        />
      </div>
    );




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

          <BlockControls >
            <AlignmentToolbar
              value={postExcerpt.textAlign}
              onChange={(nextAlign) => {
                setAttributes({ postExcerpt: { textAlign: nextAlign, isLink: postExcerpt.isLink, linkTarget: postExcerpt.linkTarget, customUrl: postExcerpt.customUrl, class: postExcerpt.class, color: postExcerpt.color, bgColor: postExcerpt.bgColor, padding: postExcerpt.padding, margin: postExcerpt.margin } });
              }}
            />
          </BlockControls>


          <InspectorControls key="general">
            <div className='px-3' title="General" initialOpen={false}>



              <div>




                <PanelBody title="Wrapper" initialOpen={false}>

                  <PanelRow>
                    <label for="">Wrapper Tag</label>

                    <SelectControl
                      label=""
                      value={wrapper.tag}
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


                        {
                          setAttributes({ wrapper: { textAlign: wrapper.textAlign, tag: newVal, color: wrapper.color, bgColor: wrapper.bgColor, padding: wrapper.padding, margin: wrapper.margin } });
                        }


                      }

                      }
                    />
                  </PanelRow>




                </PanelBody>




                <PanelBody title="Post Excerpt" initialOpen={false}>




                  <ToggleControl
                    label="Linked with post?"
                    help={postExcerpt.isLink ? 'Linked with post URL' : 'Not linked to post URL.'}
                    checked={postExcerpt.isLink ? true : false}
                    onChange={(e) => {






                      setAttributes({ postExcerpt: { text: postExcerpt.text, isLink: postExcerpt.isLink ? false : true, linkTarget: postExcerpt.linkTarget, customUrl: postExcerpt.customUrl, linkAttr: postExcerpt.linkAttr, class: postExcerpt.class, color: postExcerpt.color, bgColor: postExcerpt.bgColor, padding: postExcerpt.padding, margin: postExcerpt.margin } })





                    }}
                  />

                  {readMore.isLink && (

                    <div>
                      <PanelRow>
                        <label for="">Link Target</label>

                        <SelectControl
                          label=""
                          value={readMore.linkTarget}
                          options={[
                            { label: '_self', value: '_self' },
                            { label: '_blank', value: '_blank' },
                            { label: '_parent', value: '_parent' },
                            { label: '_top', value: '_top' },


                          ]}
                          onChange={(newVal) => {




                            setAttributes({ postExcerpt: { text: postExcerpt.text, isLink: postExcerpt.isLink, linkTarget: newVal, customUrl: postExcerpt.customUrl, linkAttr: postExcerpt.linkAttr, class: postExcerpt.class, color: postExcerpt.color, bgColor: postExcerpt.bgColor, padding: postExcerpt.padding, margin: postExcerpt.margin } })



                          }



                          }
                        />
                      </PanelRow>




                      <PanelRow>
                        <label for="">Custom Url</label>

                        <InputControl
                          value={postExcerpt.customUrl}
                          onChange={(newVal) => {


                            setAttributes({ postExcerpt: { text: postExcerpt.text, isLink: postExcerpt.isLink, linkTarget: postExcerpt.linkTarget, customUrl: newVal, linkAttr: postExcerpt.linkAttr, class: postExcerpt.class, color: postExcerpt.color, bgColor: postExcerpt.bgColor, padding: postExcerpt.padding, margin: postExcerpt.margin } })


                          }
                          }
                        />
                      </PanelRow>




                      <PanelRow>
                        <label for="">Custom Attributes</label>
                        <div
                          className=' cursor-pointer px-3 text-white py-1 bg-blue-600'

                          onClick={(ev) => {

                            var sdsd = postExcerpt.linkAttr != undefined ? postExcerpt.linkAttr.concat({ id: '', val: '' }) : [];




                            setAttributes({ postExcerpt: { text: postExcerpt.text, isLink: postExcerpt.isLink, linkTarget: postExcerpt.linkTarget, customUrl: postExcerpt.customUrl, linkAttr: sdsd, class: postExcerpt.class, color: postExcerpt.color, bgColor: postExcerpt.bgColor, padding: postExcerpt.padding, margin: postExcerpt.margin } })



                            linkAttrObj()
                          }}

                        >Add</div>



                      </PanelRow>



                      {
                        postExcerpt.linkAttr != undefined && postExcerpt.linkAttr.map((x, i) => {

                          return (

                            <div className='my-2'>
                              <PanelRow>
                                <InputControl
                                  className='mr-2'
                                  value={postExcerpt.linkAttr[i].id}
                                  onChange={(newVal) => {

                                    postExcerpt.linkAttr[i].id = newVal;


                                    var ssdsd = postExcerpt.linkAttr.concat([]);




                                    setAttributes({ postExcerpt: { text: postExcerpt.text, isLink: postExcerpt.isLink, linkTarget: postExcerpt.linkTarget, customUrl: postExcerpt.customUrl, linkAttr: ssdsd, class: postExcerpt.class, color: postExcerpt.color, bgColor: postExcerpt.bgColor, padding: postExcerpt.padding, margin: postExcerpt.margin } })




                                  }}
                                />

                                <InputControl
                                  className='mr-2'
                                  value={x.val}
                                  onChange={(newVal) => {
                                    postExcerpt.linkAttr[i].val = newVal
                                    var ssdsd = postExcerpt.linkAttr.concat([]);



                                    setAttributes({ postExcerpt: { text: postExcerpt.text, isLink: postExcerpt.isLink, linkTarget: postExcerpt.linkTarget, customUrl: postExcerpt.customUrl, linkAttr: ssdsd, class: postExcerpt.class, color: postExcerpt.color, bgColor: postExcerpt.bgColor, padding: postExcerpt.padding, margin: postExcerpt.margin } })



                                  }}
                                />
                                <span className='text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close'
                                  onClick={(ev) => {

                                    postExcerpt.linkAttr.splice(i, 1);

                                    var ssdsd = postExcerpt.linkAttr.concat([]);


                                    setAttributes({ postExcerpt: { text: postExcerpt.text, isLink: postExcerpt.isLink, linkTarget: postExcerpt.linkTarget, customUrl: postExcerpt.customUrl, linkAttr: ssdsd, class: postExcerpt.class, color: postExcerpt.color, bgColor: postExcerpt.bgColor, padding: postExcerpt.padding, margin: postExcerpt.margin } })



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
                    value={postExcerpt.color[breakPointX]}
                    colors={colors}
                    enableAlpha
                    onChange={(newVal) => {

                      var responsive = postExcerpt.color;
                      responsive[breakPointX] = newVal;





                      setAttributes({ postExcerpt: { text: postExcerpt.text, isLink: postExcerpt.isLink, linkTarget: postExcerpt.linkTarget, customUrl: postExcerpt.customUrl, linkAttr: postExcerpt.linkAttr, class: postExcerpt.class, color: responsive, bgColor: postExcerpt.bgColor, padding: postExcerpt.padding, margin: postExcerpt.margin } })



                      blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector], 'color': responsive };
                      setAttributes({ blockCssY: { items: blockCssY.items } });




                    }}
                  />



                  <PanelRow className='my-3'>
                    <label>Background Color</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                  </PanelRow>

                  <ColorPalette
                    value={postExcerpt.bgColor[breakPointX]}
                    colors={colors}
                    enableAlpha
                    onChange={(newVal) => {

                      var responsive = postExcerpt.bgColor;
                      responsive[breakPointX] = newVal;


                      setAttributes({ postExcerpt: { text: postExcerpt.text, isLink: postExcerpt.isLink, linkTarget: postExcerpt.linkTarget, customUrl: postExcerpt.customUrl, linkAttr: postExcerpt.linkAttr, class: postExcerpt.class, color: postExcerpt.color, bgColor: responsive, padding: postExcerpt.padding, margin: postExcerpt.margin } })



                      blockCssY.items[excerptSelector] = { ...blockCssY.items[excerptSelector], 'background-color': responsive };
                      setAttributes({ blockCssY: { items: blockCssY.items } });




                    }}
                  />









                  <PanelRow>
                    <label>Padding</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=''
                    values={postExcerpt.padding[breakPointX]}
                    onChange={(nextValues) => { paddingControl(nextValues) }}
                  />

                  {/* 
                  <PanelRow>
                    <label>Margin</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=""
                    values={postExcerpt.margin[breakPointX]}
                    onChange={(nextValues) => { marginControl(nextValues) }}
                  /> */}


                </PanelBody>

                <PanelBody title="Read More" initialOpen={false}>
                  <PanelRow>
                    <label for="">Read More Text</label>

                    <InputControl
                      value={readMore.text}
                      onChange={(newVal) => {

                        setAttributes({ readMore: { text: newVal, isLink: readMore.isLink, linkTarget: readMore.linkTarget, customUrl: readMore.customUrl, linkAttr: readMore.linkAttr, class: readMore.class, color: readMore.color, bgColor: readMore.bgColor } })
                      }
                      }
                    />
                  </PanelRow>


                  <ToggleControl
                    label="Linked with post?"
                    help={readMore.isLink ? 'Linked with post URL' : 'Not linked to post URL.'}
                    checked={readMore.isLink ? true : false}
                    onChange={(e) => {





                      setAttributes({ readMore: { text: readMore.text, isLink: readMore.isLink ? false : true, linkTarget: readMore.linkTarget, customUrl: readMore.customUrl, linkAttr: readMore.linkAttr, class: readMore.class, color: readMore.color, bgColor: readMore.bgColor } })



                    }}
                  />

                  {readMore.isLink && (

                    <div>
                      <PanelRow>
                        <label for="">Link Target</label>

                        <SelectControl
                          label=""
                          value={readMore.linkTarget}
                          options={[
                            { label: '_self', value: '_self' },
                            { label: '_blank', value: '_blank' },
                            { label: '_parent', value: '_parent' },
                            { label: '_top', value: '_top' },


                          ]}
                          onChange={(newVal) => {



                            setAttributes({ readMore: { text: readMore.text, isLink: readMore.isLink, linkTarget: newVal, customUrl: readMore.customUrl, linkAttr: readMore.linkAttr, class: readMore.class, color: readMore.color, bgColor: readMore.bgColor } })



                          }



                          }
                        />
                      </PanelRow>




                      <PanelRow>
                        <label for="">Custom Url</label>

                        <InputControl
                          value={readMore.customUrl}
                          onChange={(newVal) => {


                            setAttributes({ readMore: { text: readMore.text, isLink: readMore.isLink, linkTarget: readMore.linkTarget, customUrl: newVal, linkAttr: readMore.linkAttr, class: readMore.class, color: readMore.color, bgColor: readMore.bgColor } })


                          }
                          }
                        />
                      </PanelRow>




                      <PanelRow>
                        <label for="">Custom Attributes</label>
                        <div
                          className=' cursor-pointer px-3 text-white py-1 bg-blue-600'

                          onClick={(ev) => {

                            var sdsd = readMore.linkAttr.concat({ id: '', val: '' })

                            setAttributes({ readMore: { text: readMore.text, isLink: readMore.isLink, linkTarget: readMore.linkTarget, customUrl: readMore.customUrl, linkAttr: sdsd, class: readMore.class, color: readMore.color, bgColor: readMore.bgColor } })


                            linkAttrObj()
                          }}

                        >Add</div>



                      </PanelRow>



                      {
                        readMore.linkAttr != undefined && readMore.linkAttr.map((x, i) => {

                          return (

                            <div className='my-2'>
                              <PanelRow>
                                <InputControl
                                  className='mr-2'
                                  value={readMore.linkAttr[i].id}
                                  onChange={(newVal) => {

                                    readMore.linkAttr[i].id = newVal;


                                    var ssdsd = readMore.linkAttr.concat([]);

                                    setAttributes({ readMore: { text: readMore.text, isLink: readMore.isLink, linkTarget: readMore.linkTarget, customUrl: readMore.customUrl, linkAttr: ssdsd, class: readMore.class, color: readMore.color, bgColor: readMore.bgColor } })

                                  }}
                                />

                                <InputControl
                                  className='mr-2'
                                  value={x.val}
                                  onChange={(newVal) => {
                                    readMore.linkAttr[i].val = newVal
                                    var ssdsd = readMore.linkAttr.concat([]);




                                    setAttributes({ readMore: { text: readMore.text, isLink: readMore.isLink, linkTarget: readMore.linkTarget, customUrl: readMore.customUrl, linkAttr: ssdsd, class: readMore.class, color: readMore.color, bgColor: readMore.bgColor } })

                                  }}
                                />
                                <span className='text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close'
                                  onClick={(ev) => {

                                    readMore.linkAttr.splice(i, 1);

                                    var ssdsd = readMore.linkAttr.concat([]);


                                    setAttributes({ readMore: { text: readMore.text, isLink: readMore.isLink, linkTarget: readMore.linkTarget, customUrl: readMore.customUrl, linkAttr: ssdsd, class: readMore.class, color: readMore.color, bgColor: readMore.bgColor } })
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
                    value={readMore.color[breakPointX]}
                    colors={colors}
                    enableAlpha
                    onChange={(newVal) => {

                      var responsive = readMore.color;
                      responsive[breakPointX] = newVal;


                      setAttributes({ readMore: { text: readMore.text, isLink: readMore.isLink, linkTarget: readMore.linkTarget, customUrl: readMore.customUrl, linkAttr: readMore.linkAttr, class: readMore.class, color: responsive, bgColor: readMore.bgColor } })

                      blockCssY.items[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'color': responsive };
                      setAttributes({ blockCssY: { items: blockCssY.items } });




                    }}
                  />



                  <PanelRow className='my-3'>
                    <label>Background Color</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                  </PanelRow>

                  <ColorPalette
                    value={readMore.bgColor[breakPointX]}
                    colors={colors}
                    enableAlpha
                    onChange={(newVal) => {

                      var responsive = readMore.bgColor;
                      responsive[breakPointX] = newVal;





                      setAttributes({ readMore: { text: readMore.text, isLink: readMore.isLink, linkTarget: readMore.linkTarget, customUrl: readMore.customUrl, linkAttr: readMore.linkAttr, class: readMore.class, color: readMore.color, bgColor: responsive } })

                      blockCssY.items[redmoreSelector] = { ...blockCssY.items[redmoreSelector], 'background-color': responsive };
                      setAttributes({ blockCssY: { items: blockCssY.items } });




                    }}
                  />




                </PanelBody>

                <PanelBody title="Prefix" initialOpen={false}>
                  <PanelRow>
                    <label for="">Prefix</label>

                    <InputControl
                      value={prefix.text}
                      onChange={(newVal) => {

                        setAttributes({ prefix: { text: newVal, class: prefix.class, color: prefix.color, bgColor: prefix.bgColor } })
                      }
                      }
                    />
                  </PanelRow>

                </PanelBody>




                <PanelBody title="Postfix" initialOpen={false}>




                  <PanelRow>
                    <label for="">Postfix</label>

                    <InputControl
                      value={postfix.text}
                      onChange={(newVal) => {

                        setAttributes({ postfix: { text: newVal, class: prefix.class, color: postfix.color, bgColor: postfix.bgColor } })
                      }

                      }
                    />
                  </PanelRow>

                </PanelBody>

                <PanelBody title="Custom Style" initialOpen={false}>


                  <p>Please use following class selector to apply your custom CSS</p>
                  <div className='my-3'>
                    <p className='font-bold'>Excerpt Wrapper</p>
                    <p><code>{excerptWrapperSelector}{'{/* your CSS here*/}'}</code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Excerpt - With Link</p>
                    <p><code>{excerptSelector}{'{}'} </code></p>
                  </div>



                  <div className='my-3'>
                    <p className='font-bold'>Read More</p>
                    <p><code>{redmoreSelector}{'{/* your CSS here*/}'} </code></p>
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




          ###############
          <div>
            {JSON.stringify(postExcerpt.padding[breakPointX])}
          </div>


          ###############
          <div>
            {JSON.stringify(postExcerpt)}
          </div>



          {wrapper.tag && (
            <CustomTag className={['pg-postExcerpt']}>
              {postExcerpt.isLink && (
                <a className='' {...linkAttrItems} href={postUrl} >

                  {prefix.text && (
                    <span className={prefix.class}>{prefix.text}</span>
                  )}
                  {currentPostTitle}
                  {postfix.text &&
                    (<span className={postfix.class}>{postfix.text}</span>)}

                </a>



              )}
              {!postExcerpt.isLink && (

                (

                  currentPostTitle)

              )}

              {readMore.isLink && (

                <a className='readmore' target={postExcerpt.linkTarget} href={postUrl}> {readMore.text}</a>
              )}





            </CustomTag>
          )}

          {wrapper.tag.length == 0 && (

            (
              postExcerpt.isLink && (<a className={['pg-postExcerpt']} {...linkAttrItems} href={postUrl} target={postExcerpt.linkTarget}>

                {prefix.text && (
                  <span className='prefix'>{prefix.text}</span>
                )}
                {currentPostTitle}
                {postfix.text &&
                  (<span className='postfix'>{postfix.text}</span>)}

              </a>)
            )
          )}




          {wrapper.tag.length == 0 && !postExcerpt.isLink && (
            <p className={'pg-postExcerpt'}>
              {prefix.text && (
                <span className='prefix'>{prefix.text}</span>
              )}
              {currentPostTitle}
              {postfix.text &&
                (<span className='postfix'>{postfix.text}</span>)}
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