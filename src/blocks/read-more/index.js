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




registerBlockType("post-grid/read-more", {
  title: "Read More",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#7e70af',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src: <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15.6 7.2H14v1.5h1.6c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.8 0 5.2-2.3 5.2-5.2 0-2.9-2.3-5.2-5.2-5.2zM4.7 12.4c0-2 1.7-3.7 3.7-3.7H10V7.2H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H10v-1.5H8.4c-2 0-3.7-1.7-3.7-3.7zm4.6.9h5.3v-1.5H9.3v1.5z"></path></svg>,
  },


  attributes: {


    wrapper: {
      type: 'object',
      default: { textAlign: '', tag: '', class: '', color: {}, bgColor: {}, padding: {}, margin: {} },
    },
    readMore: {
      type: 'object',
      default: { text: 'Read More', textAlign: '', isLink: true, linkTarget: '', customUrl: '', class: '', color: {}, bgColor: {}, padding: {}, margin: {} },
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
    var clientId = props.clientId;

    var readMore = attributes.readMore;
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
      currentPostUrl,
      setCurrentPostUrl,
    ] = useEntityProp('postType', postType, 'link', postId);



    //console.log(readMore);



    // Wrapper CSS Class Selectors
    const readmoreWrapperSelector = '.pg-readMore';

    var readmoreLinkSelector = '';


    if (wrapper.tag.length != 0) {

      if (readMore.isLink) {
        readmoreLinkSelector = '.pg-readMore a';
      } else {
        readmoreLinkSelector = '.pg-readMore';

      }

    } else {
      readmoreLinkSelector = '.pg-readMore';

    }


    const readmorePrefixSelector = '.pg-readMore .prefix';
    const readmorePostfixSelector = '.pg-readMore .postfix';




    var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }


    function paddingControl(nextValues) {


      var responsive = readMore.padding;
      responsive[breakPointX] = nextValues;

      //console.log(nextValues);

      setAttributes({ readMore: { text: readMore.text, textAlign: readMore.textAlign, class: readMore.class, color: readMore.color, bgColor: readMore.bgColor, padding: responsive, margin: readMore.margin } });



      blockCssY.items[readmoreLinkSelector] = (blockCssY.items[readmoreLinkSelector] != undefined) ? blockCssY.items[readmoreLinkSelector] : {};



      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[readmoreLinkSelector]['padding-top'] != undefined) ? blockCssY.items[readmoreLinkSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[readmoreLinkSelector] = { ...blockCssY.items[readmoreLinkSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[readmoreLinkSelector]['padding-right'] != undefined) ? blockCssY.items[readmoreLinkSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[readmoreLinkSelector] = { ...blockCssY.items[readmoreLinkSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[readmoreLinkSelector]['padding-bottom'] != undefined) ? blockCssY.items[readmoreLinkSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[readmoreLinkSelector] = { ...blockCssY.items[readmoreLinkSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[readmoreLinkSelector]['padding-left'] != undefined) ? blockCssY.items[readmoreLinkSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[readmoreLinkSelector] = { ...blockCssY.items[readmoreLinkSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });



    }





    function marginControl(nextValues) {

      var responsive = readMore.margin;
      responsive[breakPointX] = nextValues;


      setAttributes({ readMore: { text: readMore.text, textAlign: readMore.textAlign, class: readMore.class, color: readMore.color, bgColor: readMore.bgColor, padding: readMore.padding, margin: responsive } });






      blockCssY.items[readmoreLinkSelector] = (blockCssY.items[readmoreLinkSelector] != undefined) ? blockCssY.items[readmoreLinkSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[readmoreLinkSelector]['margin-top'] != undefined) ? blockCssY.items[readmoreLinkSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[readmoreLinkSelector] = { ...blockCssY.items[readmoreLinkSelector], 'margin-top': marginTop };
      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[readmoreLinkSelector]['margin-right'] !== undefined) ? blockCssY.items[readmoreLinkSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[readmoreLinkSelector] = { ...blockCssY.items[readmoreLinkSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[readmoreLinkSelector]['margin-bottom'] !== undefined) ? blockCssY.items[readmoreLinkSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[readmoreLinkSelector] = { ...blockCssY.items[readmoreLinkSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[readmoreLinkSelector]['margin-left'] !== undefined) ? blockCssY.items[readmoreLinkSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[readmoreLinkSelector] = { ...blockCssY.items[readmoreLinkSelector], 'margin-left': marginLeft };

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
          var divWrap = iframeDocument.getElementById("css-block-readMore");

          if (divWrap != undefined) {
            iframeDocument.getElementById("css-block-readMore").outerHTML = "";

          }

          var divWrap = '<div id="css-block-readMore"></div>';
          body.insertAdjacentHTML('beforeend', divWrap);

          var csswrappg = iframeDocument.getElementById('css-block-readMore');
          var str = '<style>' + reponsiveCss + '</style>';

          csswrappg.insertAdjacentHTML('beforeend', str);
        }, 200)


      } else {

        var wpfooter = document.getElementById('wpfooter');
        var divWrap = document.getElementById("css-block-readMore");

        if (divWrap != undefined) {
          document.getElementById("css-block-readMore").outerHTML = "";
        }

        var divWrap = '<div id="css-block-readMore"></div>';
        wpfooter.insertAdjacentHTML('beforeend', divWrap);

        var csswrappg = document.getElementById('css-block-readMore');
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


    var postUrl = (readMore.customUrl != undefined && readMore.customUrl.length > 0) ? readMore.customUrl : currentPostUrl;

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
              value={readMore.textAlign}
              onChange={(nextAlign) => {
                setAttributes({ readMore: { textAlign: nextAlign, isLink: readMore.isLink, linkTarget: readMore.linkTarget, customUrl: readMore.customUrl, class: readMore.class, color: readMore.color, bgColor: readMore.bgColor, padding: readMore.padding, margin: readMore.margin } });
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




                <PanelBody title="Read More" initialOpen={true}>

                  <PanelRow className='my-3'>
                    <label for="">Custom text</label>

                    <InputControl
                      value={readMore.text}
                      onChange={(newVal) => {

                        setAttributes({ readMore: { text: newVal, textAlign: readMore.textAlign, isLink: readMore.isLink, linkTarget: readMore.linkTarget, customUrl: readMore.customUrl, class: readMore.class, color: readMore.color, bgColor: readMore.bgColor, padding: readMore.padding, margin: readMore.margin } });

                      }
                      }
                    />
                  </PanelRow>

                  <ToggleControl
                    label="Linked with post?"
                    help={readMore.isLink ? 'Linked with post URL' : 'Not linked to post URL.'}
                    checked={readMore.isLink ? true : false}
                    onChange={(e) => {


                      setAttributes({ readMore: { text: readMore.text, textAlign: readMore.textAlign, isLink: readMore.isLink ? false : true, linkTarget: readMore.linkTarget, customUrl: readMore.customUrl, class: readMore.class, color: readMore.color, bgColor: readMore.bgColor, padding: readMore.padding, margin: readMore.margin } });

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

                            setAttributes({ readMore: { text: readMore.text, textAlign: readMore.textAlign, isLink: readMore.isLink, linkTarget: newVal, customUrl: readMore.customUrl, class: readMore.class, color: readMore.color, bgColor: readMore.bgColor, padding: readMore.padding, margin: readMore.margin } });
                          }



                          }
                        />
                      </PanelRow>




                      <PanelRow>
                        <label for="">Custom Url</label>

                        <InputControl
                          value={readMore.customUrl}
                          onChange={(newVal) => {

                            setAttributes({ readMore: { text: readMore.text, textAlign: readMore.textAlign, isLink: readMore.isLink, linkTarget: readMore.linkTarget, customUrl: newVal, class: readMore.class, color: readMore.color, bgColor: readMore.bgColor, padding: readMore.padding, margin: readMore.margin } });

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
                    value={readMore.color[breakPointX]}
                    colors={colors}
                    enableAlpha
                    onChange={(newVal) => {

                      var responsive = readMore.color;
                      responsive[breakPointX] = newVal;


                      setAttributes({ readMore: { text: readMore.text, textAlign: readMore.textAlign, isLink: readMore.isLink, class: readMore.class, color: responsive, bgColor: readMore.bgColor, padding: readMore.padding, margin: readMore.margin } });


                      blockCssY.items[readmoreLinkSelector] = { ...blockCssY.items[readmoreLinkSelector], 'color': responsive };
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


                      setAttributes({ readMore: { text: readMore.text, textAlign: readMore.textAlign, isLink: readMore.isLink, class: readMore.class, color: readMore.color, bgColor: responsive, padding: readMore.padding, margin: readMore.margin } });


                      blockCssY.items[readmoreLinkSelector] = { ...blockCssY.items[readmoreLinkSelector], 'background-color': responsive };
                      setAttributes({ blockCssY: { items: blockCssY.items } });




                    }}
                  />









                  <PanelRow>
                    <label>Padding</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=""
                    values={readMore.padding[breakPointX]}
                    onChange={(nextValues) => { paddingControl(nextValues) }}
                  />


                  <PanelRow>
                    <label>Margin</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=""
                    values={readMore.margin[breakPointX]}
                    onChange={(nextValues) => { marginControl(nextValues) }}
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
                    <p className='font-bold'>Read More Wrapper</p>
                    <p><code>{readmoreWrapperSelector}{'{/* your CSS here*/}'}</code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Read More link</p>
                    <p><code>{readmoreLinkSelector}{'{}'} </code></p>

                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Prefix</p>
                    <p><code>{readmorePrefixSelector}{'{/* your CSS here*/}'} </code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Postfix</p>
                    <p><code>{readmorePostfixSelector}{'{/* your CSS here*/}'} </code></p>
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
            <CustomTag className={['pg-readMore']}>
              {readMore.isLink && (
                <a {...linkAttrItems} href={postUrl} target={readMore.linkTarget}>

                  {prefix.text && (
                    <span className={prefix.class}>{prefix.text}</span>
                  )}
                  {readMore.text}
                  {postfix.text &&
                    (<span className={postfix.class}>{postfix.text}</span>)}

                </a>

              )}
              {!readMore.isLink && (

                (

                  readMore.text)

              )}

            </CustomTag>
          )}

          {wrapper.tag.length == 0 && (

            (
              readMore.isLink && (<a className={['pg-readMore']} {...linkAttrItems} href={postUrl} target={readMore.linkTarget}>

                {prefix.text && (
                  <span className='prefix'>{prefix.text}</span>
                )}
                {readMore.text}
                {postfix.text &&
                  (<span className='postfix'>{postfix.text}</span>)}

              </a>)
            )
          )}

          {wrapper.tag.length == 0 && !readMore.isLink && (
            <p className={'pg-readMore'}>
              {prefix.text && (
                <span className='prefix'>{prefix.text}</span>
              )}
              {readMore.text}
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