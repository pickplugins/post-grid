import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';

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
  icon: "grid-view",
  attributes: {

    textAlign: {
      "type": "string"
    },
    tag: {
      "type": "string",
      "default": 'h2'
    },
    prefix: {
      "type": "string",
      "default": ''
    },
    postfix: {
      "type": "string",
      "default": ''
    },


    postId: {
      type: 'number',
    },
    level: {
      "type": "number",
      "default": 2
    },

    color: {
      type: 'object',
      default: { responsive: {} },
    },

    bgColor: {
      type: 'object',
      default: { responsive: {} },
    },

    padding: {
      type: 'object',
      default: {
        responsive: {}
      },
    },
    margin: {
      type: 'object',
      default: {
        responsive: {}
      },
    },

    isLink: {
      "type": "boolean",
      "default": false
    },
    rel: {
      "type": "string",
      "attribute": "rel",
      "default": ""
    },

    linkAttr: {
      "type": "array",
      "default": []
    },
    blockCss: {
      "type": "object",
      "default": { items: {} }
    },

    linkTarget: {
      "type": "string",
      "default": "_self"
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

    var textAlign = attributes.textAlign;
    var isLink = attributes.isLink;
    var linkTarget = attributes.linkTarget;
    var rel = attributes.rel;
    var color = attributes.color;
    var bgColor = attributes.bgColor;
    var tag = attributes.tag;
    var linkAttr = attributes.linkAttr;
    var blockCss = attributes.blockCss;
    var padding = attributes.padding;
    var margin = attributes.margin;
    var prefix = attributes.prefix;
    var postfix = attributes.postfix;


    var postId = context['postId'];

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    const [license, setLicense] = useState(myStore.getLicense());


    var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }



    const PaddingControl = () => {

      return (
        <BoxControl
          label=""
          values={padding.responsive[breakPointX]}
          onChange={(nextValues) => {


            var responsive = padding.responsive;
            responsive[breakPointX] = nextValues;

            //console.log(nextValues);

            setAttributes({ padding: { responsive: responsive } })


            //blockCss.items['padding'] = { responsive: responsive };

            if (nextValues.top != undefined) {
              var paddingTop = (blockCss.items['padding-top'] !== undefined) ? blockCss.items['padding-top'] : { responsive: {} };
              paddingTop.responsive[breakPointX] = nextValues.top
              blockCss.items['padding-top'] = paddingTop;
            }


            if (nextValues.right != undefined) {
              var paddingRight = (blockCss.items['padding-right'] !== undefined) ? blockCss.items['padding-right'] : { responsive: {} };
              paddingRight.responsive[breakPointX] = nextValues.right
              blockCss.items['padding-right'] = paddingRight;
            }

            if (nextValues.bottom != undefined) {
              var paddingBottom = (blockCss.items['padding-bottom'] !== undefined) ? blockCss.items['padding-bottom'] : { responsive: {} };
              paddingBottom.responsive[breakPointX] = nextValues.bottom
              blockCss.items['padding-bottom'] = paddingBottom;
            }

            if (nextValues.left != undefined) {
              var paddingLeft = (blockCss.items['padding-left'] !== undefined) ? blockCss.items['padding-left'] : { responsive: {} };
              paddingLeft.responsive[breakPointX] = nextValues.left
              blockCss.items['padding-left'] = paddingLeft;
            }





            setAttributes({ blockCss: { items: blockCss.items } });



          }
          }
        />
      );
    };


    const MarginControl = () => {

      return (
        <BoxControl
          label=""
          values={margin.responsive[breakPointX]}
          onChange={(nextValues) => {


            var responsive = margin.responsive;
            responsive[breakPointX] = nextValues;

            setAttributes({ margin: { responsive: responsive } })

            //blockCss.items['margin'] = { responsive: responsive };





            if (nextValues.top != undefined) {
              var marginTop = (blockCss.items['margin-top'] !== undefined) ? blockCss.items['margin-top'] : { responsive: {} };
              marginTop.responsive[breakPointX] = nextValues.top
              blockCss.items['margin-top'] = marginTop;
            }


            if (nextValues.right != undefined) {
              var marginRight = (blockCss.items['margin-right'] !== undefined) ? blockCss.items['margin-right'] : { responsive: {} };
              marginRight.responsive[breakPointX] = nextValues.right
              blockCss.items['margin-right'] = marginRight;
            }

            if (nextValues.bottom != undefined) {
              var marginBottom = (blockCss.items['margin-bottom'] !== undefined) ? blockCss.items['margin-bottom'] : { responsive: {} };
              marginBottom.responsive[breakPointX] = nextValues.bottom
              blockCss.items['margin-bottom'] = marginBottom;
            }

            if (nextValues.left != undefined) {
              var marginLeft = (blockCss.items['margin-left'] !== undefined) ? blockCss.items['margin-left'] : { responsive: {} };
              marginLeft.responsive[breakPointX] = nextValues.left
              blockCss.items['margin-left'] = marginLeft;
            }















            setAttributes({ blockCss: { items: blockCss.items } });



          }}
        />
      );
    };

    function setpriceOnclick(va) {

      //console.log(va);

      var asdsdsd = wp.data.dispatch('my-shop').setPrice('food', va)

      asdsdsd.then((res) => {

        ////console.log(res.price);
        getpriceOnclick();
        //setLicense(res);


      });
    }


    function generateBlockCss() {


      var reponsiveCssGroups = {};
      var reponsiveCss = '';

      for (var x in blockCss.items) {

        var item = blockCss.items[x];

        var attr = x;
        var id = '.pg-postTitle-' + postId + ' a';
        var responsive = item.responsive;


        for (var device in responsive) {
          var valY = responsive[device];

          if (reponsiveCssGroups[device] == undefined) {
            reponsiveCssGroups[device] = []
          }

          reponsiveCssGroups[device].push({ 'attr': attr, 'val': valY });
        }
      }


      // for (var device in reponsiveCssGroups) {

      //   var item = reponsiveCssGroups[device];


      //   if (device === 'Mobile') {
      //     reponsiveCss += '@media only screen and (min-width: 0px) and (max-width: 360px){';
      //   }
      //   if (device === 'Tablet') {
      //     reponsiveCss += '@media only screen and (min-width: 361px) and (max-width: 780px){';
      //   }
      //   if (device === 'Desktop') {
      //     reponsiveCss += '@media only screen and (min-width: 781px){';
      //   }

      //   for (var index in item) {
      //     var attr = item[index].attr;
      //     var defaultVal = item[index].val;
      //     var id = '.pg-postTitle-' + postId + ' a';
      //     reponsiveCss += id + '{' + attr + ':' + defaultVal + '}';
      //     reponsiveCss += '}';
      //   }

      // }


      reponsiveCss += '@media only screen and (min-width: 0px) and (max-width: 360px){';

      for (var ii in reponsiveCssGroups['Mobile']) {
        var item = reponsiveCssGroups['Mobile'][ii];

        for (var i in item) {
          var attr = item.attr;
          var defaultVal = item.val;

          var id = '.pg-postTitle-' + postId + ' a';
          reponsiveCss += id + '{' + attr + ':' + defaultVal + '}';
        }

      }
      reponsiveCss += '}';
      reponsiveCss += '@media only screen and (min-width: 361px) and (max-width: 780px){';

      for (var jj in reponsiveCssGroups['Tablet']) {
        var item = reponsiveCssGroups['Tablet'][jj];

        for (var j in item) {
          var attr = item.attr;
          var defaultVal = item.val;
          var id = '.pg-postTitle-' + postId + ' a';
          reponsiveCss += id + '{' + attr + ':' + defaultVal + '}';
        }

      }

      reponsiveCss += '}';
      reponsiveCss += '@media only screen and (min-width: 781px){';

      for (var kk in reponsiveCssGroups['Desktop']) {
        var item = reponsiveCssGroups['Desktop'][kk];

        for (var k in item) {
          var attr = item.attr;
          var defaultVal = item.val;
          var id = '.pg-postTitle-' + postId + ' a';
          reponsiveCss += id + '{' + attr + ':' + defaultVal + '}';

        }

      }

      reponsiveCss += '}';

      var iframe = document.querySelectorAll('[name="editor-canvas"]')[0];

      if (iframe) {

        setTimeout(() => {
          var iframeDocument = iframe.contentDocument;
          var body = iframeDocument.body;
          var divWrap = iframeDocument.getElementById("css-block-pgTitle");

          if (divWrap != undefined) {
            iframeDocument.getElementById("css-block-pgTitle").outerHTML = "";

          }

          var divWrap = '<div id="css-block-pgTitle"></div>';
          body.insertAdjacentHTML('beforeend', divWrap);

          var csswrappg = iframeDocument.getElementById('css-block-pgTitle');
          var str = '<style>' + reponsiveCss + '</style>';

          csswrappg.insertAdjacentHTML('beforeend', str);
        }, 200)


      } else {

        var wpfooter = document.getElementById('wpfooter');
        var divWrap = document.getElementById("css-block-pgTitle");

        if (divWrap != undefined) {
          document.getElementById("css-block-pgTitle").outerHTML = "";
        }

        var divWrap = '<div id="css-block-pgTitle"></div>';
        wpfooter.insertAdjacentHTML('beforeend', divWrap);

        var csswrappg = document.getElementById('css-block-pgTitle');
        var str = '<style>' + reponsiveCss + '</style>';
        csswrappg.insertAdjacentHTML('beforeend', str);



      }



    }










    var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.



    useEffect(() => {
      //console.log('Listening blockCss: ', blockCss);

      generateBlockCss()

    }, [blockCss]);


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





    const post = useSelect((select) =>
      select('core').getEntityRecord('postType', context['postType'], context['postId'])
    );

    //console.log('Hello');
    ////console.log(post);

    const CustomTag = `${tag}`;

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
                    generateBlockCss();

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

      console.log(x);
      console.log(index);
      console.log('Post Title');



      setPreviewDeviceType(x.value)
      var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value)

      asdsdsd.then((res) => {

        setBreakPointX(res.breakpoint);
        generateBlockCss();

      });



    }


    return (
      [


        <div>

          <BlockControls >
            <AlignmentToolbar
              value={textAlign}
              onChange={(nextAlign) => {
                setAttributes({ textAlign: nextAlign });
              }}
            />
          </BlockControls>


          <InspectorControls key="general">
            <div className='px-3' title="General" initialOpen={false}>


              {/* <BreakpointToggle onChange={onChangeBreakPoint} /> */}




              <ToggleControl
                label="Linked with post?"
                help={isLink ? 'Linked with post URL' : 'Not linked to post URL.'}
                checked={isLink ? true : false}
                onChange={(e) => {

                  setAttributes({ isLink: isLink ? false : true });

                }}
              />

              {isLink && (

                <div>
                  <PanelRow>
                    <label for="">Link Target</label>

                    <SelectControl
                      label=""
                      value={linkTarget}
                      options={[
                        { label: '_self', value: '_self' },
                        { label: '_blank', value: '_blank' },
                        { label: '_parent', value: '_parent' },
                        { label: '_top', value: '_top' },


                      ]}
                      onChange={(newVal) => setAttributes({ linkTarget: newVal })}
                    />
                  </PanelRow>


                  <PanelRow>
                    <label for="">rel</label>

                    <InputControl
                      value={rel}
                      onChange={(newVal) => setAttributes({ rel: newVal })}
                    />
                  </PanelRow>

                  <PanelRow>
                    <label for="">Prefix</label>

                    <InputControl
                      value={prefix}
                      onChange={(newVal) => setAttributes({ prefix: newVal })}
                    />
                  </PanelRow>

                  <PanelRow>
                    <label for="">Postfix</label>

                    <InputControl
                      value={postfix}
                      onChange={(newVal) => setAttributes({ postfix: newVal })}
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

                </div>



              )}


              <PanelRow>
                <label for="">Wrapper Tag</label>

                <SelectControl
                  label=""
                  value={tag}
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
                  onChange={(newVal) => setAttributes({ tag: newVal })}
                />
              </PanelRow>








              <div>




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



              <div>



                <PanelBody title="Color" initialOpen={false}>
                  <PanelRow>
                    <label>Color</label>
                    {/* <BreakpointToggle onChange={onChangeBreakPoint} /> */}

                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>

                  <ColorPalette
                    value={color.responsive[breakPointX]}
                    colors={colors}
                    enableAlpha
                    onChange={(newVal) => {

                      var responsive = color.responsive;
                      responsive[breakPointX] = newVal;


                      setAttributes({ color: { responsive: responsive } })



                      blockCss.items['color'] = { responsive: responsive };
                      setAttributes({ blockCss: { items: blockCss.items } });





                    }}
                  />
                </PanelBody>





                <PanelBody title="Background Color" initialOpen={false}>
                  <PanelRow>
                    <label>Background Color</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                  </PanelRow>

                  <ColorPalette
                    value={bgColor.responsive[breakPointX]}
                    colors={colors}
                    enableAlpha
                    onChange={(newVal) => {

                      var responsive = bgColor.responsive;
                      responsive[breakPointX] = newVal;

                      setAttributes({ bgColor: { responsive: responsive } })

                      blockCss.items['background-color'] = { responsive: responsive };
                      setAttributes({ blockCss: { items: blockCss.items } });

                    }}
                  />
                </PanelBody>



                <PanelBody title="Padding" initialOpen={false}>
                  <PanelRow>
                    <label>Padding</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>

                  <PaddingControl />

                </PanelBody>

                <PanelBody title="Margin" initialOpen={false}>
                  <PanelRow>
                    <label>Margin</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <MarginControl />

                </PanelBody>

                <PanelBody title="Custom Style" initialOpen={false}>
                </PanelBody>

              </div>



            </div>






          </InspectorControls>
        </div>
        ,


        <>


          {tag && (
            <CustomTag className={['pg-postTitle pg-postTitle-' + postId]}>
              {isLink && (
                <a {...linkAttrItems} href={post.link} rel={rel} target={linkTarget}>{prefix}{post.title.rendered}{postfix}</a>

              )}
              {!isLink && (

                post.title.rendered

              )}

            </CustomTag>
          )}

          {tag.length == 0 && (

            (
              isLink && (<a className={['pg-postTitle pg-postTitle-' + postId]} {...linkAttrItems} href={post.link} rel={rel} target={linkTarget}>{prefix}{post.title.rendered}{postfix}</a>)
            )
          )}

          {tag.length == 0 && !isLink && (
            <p>{post.title.rendered}</p>

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