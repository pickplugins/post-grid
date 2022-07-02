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
      default: { textAlign: '', tag: 'h2', class: '', color: {}, bgColor: {}, padding: {}, margin: {} },
    },
    postTitle: {
      type: 'object',
      default: { textAlign: '', isLink: true, linkTarget: '', customUrl: '', class: '', color: {}, bgColor: {}, padding: {}, margin: {} },
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
    blockCss: {
      "type": "object",
      "default": { items: {} }
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

    var postTitle = attributes.postTitle;
    var wrapper = attributes.wrapper;


    var linkAttr = attributes.linkAttr;
    var blockCss = attributes.blockCss;
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
    ] = useEntityProp('postType', postType, 'title', postId);


    const [
      currentPostUrl,
      setCurrentPostUrl,
    ] = useEntityProp('postType', postType, 'link', postId);



    //console.log(postTitle);



    // Wrapper CSS Class Selectors
    const titleWrapperSelector = '.pg-postTitle';
    const titleLinkSelector = postTitle.isLink ? '.pg-postTitle a' : '.pg-postTitle';
    const titlePrefixSelector = '.pg-postTitle .prefix';
    const titlePostfixSelector = '.pg-postTitle .postfix';




    var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }


    function paddingControl(nextValues) {


      var responsive = postTitle.padding;
      responsive[breakPointX] = nextValues;

      //console.log(nextValues);

      setAttributes({ postTitle: { textAlign: postTitle.textAlign, class: postTitle.class, color: postTitle.color, bgColor: postTitle.bgColor, padding: responsive, margin: postTitle.margin } });



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


      setAttributes({ blockCssY: { items: blockCssY.items } });



    }





    function marginControl(nextValues) {

      var responsive = postTitle.margin;
      responsive[breakPointX] = nextValues;


      setAttributes({ postTitle: { textAlign: postTitle.textAlign, class: postTitle.class, color: postTitle.color, bgColor: postTitle.bgColor, padding: postTitle.padding, margin: responsive } });






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
      //console.log('Listening blockCss: ', blockCss);

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



    //const [blockCss, setBlockCss] = useState({ items: {} });

    const [setSome, setSomeState] = useState({});
    const [stateX, setStateX] = useState('Old Value');







    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType,

    } = wp.data.dispatch('core/edit-post')


    var postUrl = (postTitle.customUrl != undefined && postTitle.customUrl.length > 0) ? postTitle.customUrl : currentPostUrl;

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
              value={postTitle.textAlign}
              onChange={(nextAlign) => {
                setAttributes({ postTitle: { textAlign: nextAlign, isLink: postTitle.isLink, linkTarget: postTitle.linkTarget, customUrl: postTitle.customUrl, class: postTitle.class, color: postTitle.color, bgColor: postTitle.bgColor, padding: postTitle.padding, margin: postTitle.margin } });
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




                <PanelBody title="Post Title" initialOpen={true}>



                  <ToggleControl
                    label="Linked with post?"
                    help={postTitle.isLink ? 'Linked with post URL' : 'Not linked to post URL.'}
                    checked={postTitle.isLink ? true : false}
                    onChange={(e) => {


                      setAttributes({ postTitle: { textAlign: postTitle.textAlign, isLink: postTitle.isLink ? false : true, linkTarget: postTitle.linkTarget, customUrl: postTitle.customUrl, class: postTitle.class, color: postTitle.color, bgColor: postTitle.bgColor, padding: postTitle.padding, margin: postTitle.margin } });

                    }}
                  />

                  {postTitle.isLink && (

                    <div>
                      <PanelRow>
                        <label for="">Link Target</label>

                        <SelectControl
                          label=""
                          value={postTitle.linkTarget}
                          options={[
                            { label: '_self', value: '_self' },
                            { label: '_blank', value: '_blank' },
                            { label: '_parent', value: '_parent' },
                            { label: '_top', value: '_top' },


                          ]}
                          onChange={(newVal) => {

                            setAttributes({ postTitle: { textAlign: postTitle.textAlign, isLink: postTitle.isLink, linkTarget: newVal, customUrl: postTitle.customUrl, class: postTitle.class, color: postTitle.color, bgColor: postTitle.bgColor, padding: postTitle.padding, margin: postTitle.margin } });
                          }



                          }
                        />
                      </PanelRow>




                      <PanelRow>
                        <label for="">Custom Url</label>

                        <InputControl
                          value={postTitle.customUrl}
                          onChange={(newVal) => {

                            setAttributes({ postTitle: { textAlign: postTitle.textAlign, isLink: postTitle.isLink, linkTarget: postTitle.linkTarget, customUrl: newVal, class: postTitle.class, color: postTitle.color, bgColor: postTitle.bgColor, padding: postTitle.padding, margin: postTitle.margin } });

                          }
                          }
                        />
                      </PanelRow>




                      <PanelRow>
                        <label for="">Custom Attributes</label>
                        <div
                          className=' cursor-pointer px-3 text-white py-1 bg-blue-600'

                          onClick={(ev) => {

                            var sdsd = linkAttr.concat({ id: '', val: '' })

                            setAttributes({ linkAttr: sdsd })
                            linkAttrObj()
                          }}

                        >Add</div>



                      </PanelRow>



                      {
                        linkAttr.map((x, i) => {

                          return (

                            <div className='my-2'>
                              <PanelRow>
                                <InputControl
                                  className='mr-2'
                                  value={linkAttr[i].id}
                                  onChange={(newVal) => {

                                    linkAttr[i].id = newVal;


                                    var ssdsd = linkAttr.concat([]);

                                    setAttributes({ linkAttr: ssdsd })

                                  }}
                                />

                                <InputControl
                                  className='mr-2'
                                  value={x.val}
                                  onChange={(newVal) => {
                                    linkAttr[i].val = newVal
                                    var ssdsd = linkAttr.concat([]);


                                    setAttributes({ linkAttr: ssdsd })

                                  }}
                                />
                                <span className='text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close'
                                  onClick={(ev) => {

                                    linkAttr.splice(i, 1);

                                    var ssdsd = linkAttr.concat([]);

                                    setAttributes({ linkAttr: ssdsd })
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
                    value={postTitle.color[breakPointX]}
                    colors={colors}
                    enableAlpha
                    onChange={(newVal) => {

                      var responsive = postTitle.color;
                      responsive[breakPointX] = newVal;


                      setAttributes({ postTitle: { textAlign: postTitle.textAlign, isLink: postTitle.isLink, class: postTitle.class, color: responsive, bgColor: postTitle.bgColor, padding: postTitle.padding, margin: postTitle.margin } });


                      blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'color': responsive };
                      setAttributes({ blockCssY: { items: blockCssY.items } });




                    }}
                  />



                  <PanelRow className='my-3'>
                    <label>Background Color</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                  </PanelRow>

                  <ColorPalette
                    value={postTitle.bgColor[breakPointX]}
                    colors={colors}
                    enableAlpha
                    onChange={(newVal) => {

                      var responsive = postTitle.bgColor;
                      responsive[breakPointX] = newVal;


                      setAttributes({ postTitle: { textAlign: postTitle.textAlign, isLink: postTitle.isLink, class: postTitle.class, color: postTitle.color, bgColor: responsive, padding: postTitle.padding, margin: postTitle.margin } });


                      blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'background-color': responsive };
                      setAttributes({ blockCssY: { items: blockCssY.items } });




                    }}
                  />









                  <PanelRow>
                    <label>Padding</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=""
                    values={postTitle.padding[breakPointX]}
                    onChange={(nextValues) => { paddingControl(nextValues) }}
                  />


                  <PanelRow>
                    <label>Margin</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=""
                    values={postTitle.margin[breakPointX]}
                    onChange={(nextValues) => { marginControl(nextValues) }}
                  />


                </PanelBody>


                <PanelBody title="Postfix" initialOpen={false}>
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
                    <p className='font-bold'>Title Wrapper</p>
                    <p><code>{titleWrapperSelector}{'{/* your CSS here*/}'}</code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Title link</p>
                    <p><code>{titleLinkSelector}{'{}'} </code></p>
                    <p><code>.pg-postCategories a{'{/* your CSS here*/}'}</code></p>
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

          {wrapper.tag && (
            <CustomTag className={['pg-postTitle']}>
              {postTitle.isLink && (
                <a {...linkAttrItems} href={postUrl} target={postTitle.linkTarget}>

                  {prefix.text && (
                    <span className={prefix.class}>{prefix.text}</span>
                  )}
                  {currentPostTitle}
                  {postfix.text &&
                    (<span className={postfix.class}>{postfix.text}</span>)}

                </a>

              )}
              {!postTitle.isLink && (

                (

                  currentPostTitle)

              )}

            </CustomTag>
          )}

          {wrapper.tag.length == 0 && (

            (
              postTitle.isLink && (<a className={['pg-postTitle']} {...linkAttrItems} href={postUrl} target={postTitle.linkTarget}>

                {prefix.text && (
                  <span className='prefix'>{prefix.text}</span>
                )}
                {currentPostTitle}
                {postfix.text &&
                  (<span className='postfix'>{postfix.text}</span>)}

              </a>)
            )
          )}

          {wrapper.tag.length == 0 && !postTitle.isLink && (
            <p className={'pg-postTitle'}>
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