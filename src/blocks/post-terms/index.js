import apiFetch from '@wordpress/api-fetch';
import { useEntityProp } from '@wordpress/core-data';

import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, subscribe, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Spinner } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';

import { InspectorControls, BlockControls, AlignmentToolbar, RichText } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'

import IconToggle from '../../components/icon-toggle'
import BreakpointToggle from '../../components/breakpoint-toggle'



var myStore = wp.data.select('my-shop');




registerBlockType("post-grid/post-terms", {
  title: "Post Terms",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#7e70af',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src: <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M8.1 12.3c.1.1.3.3.5.3.2.1.4.1.6.1.2 0 .4 0 .6-.1.2-.1.4-.2.5-.3l3-3c.3-.3.5-.7.5-1.1 0-.4-.2-.8-.5-1.1L9.7 3.5c-.1-.2-.3-.3-.5-.3H5c-.4 0-.8.4-.8.8v4.2c0 .2.1.4.2.5l3.7 3.6zM5.8 4.8h3.1l3.4 3.4v.1l-3 3 .5.5-.7-.5-3.3-3.4V4.8zM4 20h9v-1.5H4V20zm0-5.5V16h16v-1.5H4z"></path></svg>,
  },
  attributes: {


    taxonomy: {
      "type": "string",
      "default": ''
    },

    wrapper: {
      type: 'object',
      default: { textAlign: '', class: 'inline-block', color: {}, bgColor: {}, padding: {}, margin: {} },
    },
    items: {
      type: 'object',
      default: { prefix: '', postfix: '', maxCount: 99, postCount: false, class: 'item inline-block', linkTarget: '', linkAttr: [], color: {}, bgColor: {}, padding: {}, margin: {} },
    },
    separator: {
      type: 'object',
      default: { class: 'inline-block', text: ', ', color: {}, bgColor: {}, padding: {}, margin: {} },
    },
    frontText: {
      type: 'object',
      default: { text: 'Tags: ', class: 'inline-block', color: {}, bgColor: {}, padding: {}, margin: {} },
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


    var wrapper = attributes.wrapper;
    var items = attributes.items;
    var separator = attributes.separator;
    var frontText = attributes.frontText;
    var taxonomy = attributes.taxonomy;

    var blockCssY = attributes.blockCssY;

    var customCss = attributes.customCss;


    var postId = context['postId'];
    var postType = context['postType'];

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    const [license, setLicense] = useState(myStore.getLicense());

    const [isLoaded, setIsLoaded] = useState(false);

    // Wrapper CSS Class Selectors
    const itemWrapSelector = '.pg-postTerms';
    const itemSelector = '.pg-postTerms .item';
    const itemSeparatorSelector = '.pg-postTerms .separator';
    const frontTextSelector = '.pg-postTerms .frontText';
    const postCountSelector = '.pg-postTerms .postCount';









    var breakPointList = [];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }

    function paddingControl(nextValues) {


      var responsive = items.padding;
      responsive[breakPointX] = nextValues;

      //console.log(nextValues);



      setAttributes({ items: { prefix: items.prefix, postfix: items.postfix, maxCount: items.maxCount, postCount: items.postCount, class: items.class, linkTarget: items.linkTarget, linkAttr: items.linkAttr, color: items.color, bgColor: items.bgColor, padding: responsive, margin: items.margin } });


      blockCssY.items[itemSelector] = (blockCssY.items[itemSelector] != undefined) ? blockCssY.items[itemSelector] : {};



      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[itemSelector]['padding-top'] != undefined) ? blockCssY.items[itemSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-top': paddingTop };





      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[itemSelector]['padding-right'] != undefined) ? blockCssY.items[itemSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[itemSelector]['padding-bottom'] != undefined) ? blockCssY.items[itemSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[itemSelector]['padding-left'] != undefined) ? blockCssY.items[itemSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });



    }



    function marginControl(nextValues) {

      var responsive = items.margin;
      responsive[breakPointX] = nextValues;

      setAttributes({ items: { prefix: items.prefix, postfix: items.postfix, maxCount: items.maxCount, postCount: items.postCount, class: items.class, linkTarget: items.linkTarget, linkAttr: items.linkAttr, color: items.color, bgColor: items.bgColor, padding: items.padding, margin: responsive } });

      blockCssY.items[itemSelector] = (blockCssY.items[itemSelector] != undefined) ? blockCssY.items[itemSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[itemSelector]['margin-top'] != undefined) ? blockCssY.items[itemSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-top': marginTop };
      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[itemSelector]['margin-right'] !== undefined) ? blockCssY.items[itemSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[itemSelector]['margin-bottom'] !== undefined) ? blockCssY.items[itemSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[itemSelector]['margin-left'] !== undefined) ? blockCssY.items[itemSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'margin-left': marginLeft };

      }

      setAttributes({ blockCssY: { items: blockCssY.items } });
    }


    const [categoryCount, setcategoryCount] = useState(0); // Using the hook.
    const [postCategoriesData, setPostCategoriesData] = useState([]); // Using the hook.

    const [categories, setCategories] = useState([]); // Using the hook.
    const [taxonomies, setTaxonomies] = useState([]); // Using the hook.

    // const [postCategoriesX, setPostCategoriesX] = useState([]); // Using the hook.


    const [
      postCategoriesX,
      setPostCategoriesX,
    ] = useEntityProp('postType', postType, taxonomy, postId);




    useEffect(() => {
      console.log('Listening postCategoriesX: ', postCategoriesX);


      setPostCategoriesData([]);
      setCategories([]);

      setcategoryCount(categories.length - 1);

      for (x in postCategoriesX) {

        var catId = postCategoriesX[x]

        console.log(x)

        var assd = x;

        if (x) {

          apiFetch({
            path: '/wp/v2/' + taxonomy + '/' + catId,
            method: 'GET',
          }).then((res) => {


            //console.log(res)
            setPostCategoriesData(current => [...current, res]);
            console.log(assd)
            setCategories(current => [...current, res]);

          });

        }


      }

      console.log(postCategoriesData);

    }, [postCategoriesX]);





    useEffect(() => {

      var asdasd = postCategoriesData.slice(0, items.maxCount);

      setCategories(asdasd);

    }, [postCategoriesData]);



    useEffect(() => {

      // console.log(useEntityProp('postType', postType, taxonomy, postId));
      apiFetch({
        path: '/wp/v2/' + taxonomy + '/?post=' + postId,
        method: 'GET',
      }).then((res) => {

        console.log(res)
        setPostCategoriesData(current => [...current, res]);
        // console.log(assd)
        setCategories(current => [...current, res]);

      });

    }, [taxonomy]);


    useEffect(() => {

      // console.log(useEntityProp('postType', postType, taxonomy, postId));
      apiFetch({
        path: '/wp/v2/taxonomies/?type=' + postType,
        method: 'GET',
      }).then((res) => {

        console.log(res)

        for (x in res) {

          var item = res[x];

          if (x == 'category') {
            setTaxonomies(current => [...current, { label: item.name, value: 'categories' }]);

          }
          else if (x == 'post_tag') {
            setTaxonomies(current => [...current, { label: item.name, value: 'tags' }]);

          }

          else {

            setTaxonomies(current => [...current, { label: item.name, value: x }]);
          }
          //console.log(x)

        }

        // console.log(assd)

      });


    }, [isLoaded]);









    useEffect(() => {

      console.log(postCategoriesX);

      if (postCategoriesX != undefined && postCategoriesX.length > 0) {
        setcategoryCount(categories.length - 1);
        var asdasd = postCategoriesData.slice(0, items.maxCount);

        setCategories(asdasd);
      }




    }, [items]);





    const closeListener = subscribe(() => {
      const isReady = select('core/editor').__unstableIsEditorReady();
      if (!isReady) {
        // Editor not ready.
        return;
      }
      // Close the listener as soon as we know we are ready to avoid an infinite loop.
      closeListener();
      // Your code is placed after this comment, once the editor is ready.
      setIsLoaded(true);
    });




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
          var divWrap = iframeDocument.getElementById("css-block-postTerms");

          if (divWrap != undefined) {
            iframeDocument.getElementById("css-block-postTerms").outerHTML = "";

          }

          var divWrap = '<div id="css-block-postTerms"></div>';
          body.insertAdjacentHTML('beforeend', divWrap);

          var csswrappg = iframeDocument.getElementById('css-block-postTerms');
          var str = '<style>' + reponsiveCss + '</style>';

          csswrappg.insertAdjacentHTML('beforeend', str);
        }, 200)


      } else {

        var wpfooter = document.getElementById('wpfooter');
        var divWrap = document.getElementById("css-block-postTerms");

        if (divWrap != undefined) {
          document.getElementById("css-block-postTerms").outerHTML = "";
        }

        var divWrap = '<div id="css-block-postTerms"></div>';
        wpfooter.insertAdjacentHTML('beforeend', divWrap);

        var csswrappg = document.getElementById('css-block-postTerms');
        var str = '<style>' + reponsiveCss + '</style>';
        csswrappg.insertAdjacentHTML('beforeend', str);



      }



    }















    var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.



    useEffect(() => {

      generateBlockCssY()


    }, [blockCssY]);









    useEffect(() => {
      //console.log('Listening linkAttr: ', linkAttr);
      linkAttrObj();
      generateBlockCssY();





    }, [items]);





    var linkAttrObj = () => {

      var sdsd = {};

      items.linkAttr.map(x => {

        if (x.val)
          sdsd[x.id] = x.val;

      })

      setlinkAttrItems(sdsd);
      //return sdsd;

    }

    //console.log(breakPointList);
    const colors = [
      { name: '9DD6DF', color: '#9DD6DF' },
      { name: '18978F', color: '#18978F' },
      { name: 'A084CF', color: '#A084CF' },
      { name: 'DFBB9D', color: '#DFBB9D' },
      { name: '774360', color: '#774360' },
      { name: '3AB0FF', color: '#3AB0FF' },
      { name: '51557E', color: '#51557E' },


    ];





    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType,

    } = wp.data.dispatch('core/edit-post')




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
                    generateBlockCssY()


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

      //console.log(x);
      //console.log(index);



      setPreviewDeviceType(x.value)
      var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value)

      asdsdsd.then((res) => {

        setBreakPointX(res.breakpoint);
        generateBlockCssY()

      });



    }


    return (
      [


        <div>

          <BlockControls >
            <AlignmentToolbar
              value={wrapper.textAlign}
              onChange={(nextAlign) => {
                setAttributes({ wrapper: { textAlign: nextAlign, color: wrapper.color, bgColor: wrapper.bgColor, padding: wrapper.padding, margin: wrapper.margin } });




              }}
            />
          </BlockControls>


          <InspectorControls key="general">

            <PanelRow className='px-3'>
              <label for="">Taxonomies</label>

              <SelectControl
                label=""
                value={taxonomy}
                options={taxonomies}
                onChange={(newVal) => {

                  setAttributes({ taxonomy: newVal });


                }


                }
              />
            </PanelRow>





            <PanelBody title="Items Wrapper" initialOpen={false}>

              <PanelRow>
                <label for="">Wrapper Class</label>

                <InputControl
                  value={wrapper.class}
                  onChange={(newVal) => {

                    setAttributes({ wrapper: { textAlign: wrapper.textAlign, class: newVal, color: wrapper.color, bgColor: wrapper.bgColor, padding: wrapper.padding, margin: wrapper.margin } });


                  }}
                />
              </PanelRow>

            </PanelBody>



            <PanelBody title="Items" initialOpen={true}>

              <ToggleControl
                label="Display Post Count"
                help={items.postCount ? 'Post Count Enabled' : 'Post Count Disabled'}
                checked={items.postCount ? true : false}
                onChange={(e) => {


                  setAttributes({ items: { prefix: items.prefix, postfix: items.postfix, maxCount: items.maxCount, postCount: items.postCount ? false : true, class: items.class, linkTarget: items.linkTarget, linkAttr: items.linkAttr, color: items.color, bgColor: items.bgColor, padding: items.padding, margin: items.margin } });



                }}
              />

              <PanelRow>
                <label for="">Item Class</label>

                <InputControl
                  value={items.class}
                  onChange={(newVal) => {

                    setAttributes({ items: { prefix: items.prefix, postfix: items.postfix, maxCount: items.maxCount, postCount: items.postCount, class: newVal, linkTarget: items.linkTarget, linkAttr: items.linkAttr, color: items.color, bgColor: items.bgColor, padding: items.padding, margin: items.margin } });


                  }}
                />
              </PanelRow>

              <PanelRow>
                <label for="">Max Count</label>

                <InputControl
                  value={items.maxCount}
                  onChange={(newVal) => {


                    setAttributes({ items: { prefix: items.prefix, postfix: items.postfix, maxCount: newVal, class: items.class, linkTarget: items.linkTarget, linkAttr: items.linkAttr, color: items.color, bgColor: items.bgColor, padding: items.padding, margin: items.margin } });

                  }




                  }
                />
              </PanelRow>

              <PanelRow>
                <label for="">Link Target</label>

                <SelectControl
                  label=""
                  value={items.linkTarget}
                  options={[
                    { label: '_self', value: '_self' },
                    { label: '_blank', value: '_blank' },
                    { label: '_parent', value: '_parent' },
                    { label: '_top', value: '_top' },


                  ]}
                  onChange={(newVal) => {

                    setAttributes({ items: { prefix: items.prefix, postfix: items.postfix, maxCount: items.maxCount, postCount: items.postCount, class: items.class, linkTarget: newVal, linkAttr: items.linkAttr, color: items.color, bgColor: items.bgColor, padding: items.padding, margin: items.margin } });

                  }


                  }
                />
              </PanelRow>




              <PanelRow>
                <label for="">Prefix</label>

                <InputControl
                  value={items.prefix}
                  onChange={(newVal) => {


                    setAttributes({ items: { prefix: newVal, postfix: items.postfix, maxCount: items.maxCount, postCount: items.postCount, class: items.class, linkTarget: items.linkTarget, linkAttr: items.linkAttr, color: items.color, bgColor: items.bgColor, padding: items.padding, margin: items.margin } });

                  }
                  }
                />
              </PanelRow>

              <PanelRow>
                <label for="">Postfix</label>
                <InputControl
                  value={items.postfix}
                  onChange={(newVal) => {
                    setAttributes({ items: { prefix: items.prefix, postfix: newVal, maxCount: items.maxCount, postCount: items.postCount, class: items.class, linkTarget: items.linkTarget, linkAttr: items.linkAttr, color: items.color, bgColor: items.bgColor, padding: items.padding, margin: items.margin } });
                  }}
                />
              </PanelRow>










              <PanelRow>
                <label for="">Custom Attributes</label>
                <div
                  className=' cursor-pointer px-3 text-white py-1 bg-blue-600'

                  onClick={(ev) => {

                    var sdsd = items.linkAttr.concat({ id: '', val: '' })

                    setAttributes({ items: { prefix: items.prefix, postfix: items.postfix, maxCount: items.maxCount, postCount: items.postCount, class: items.class, linkTarget: items.linkTarget, linkAttr: sdsd, color: items.color, bgColor: items.bgColor, padding: items.padding, margin: items.margin } });

                    linkAttrObj()
                  }}

                >Add</div>



              </PanelRow>








              <div>




                {
                  items.linkAttr.map((x, i) => {

                    return (

                      <div className='my-2'>
                        <PanelRow>
                          <InputControl
                            className='mr-2'
                            value={items.linkAttr[i].id}
                            onChange={(newVal) => {

                              items.linkAttr[i].id = newVal;


                              var ssdsd = items.linkAttr.concat([]);

                              setAttributes({ items: { prefix: items.prefix, postfix: items.postfix, maxCount: items.maxCount, postCount: items.postCount, class: items.class, linkTarget: items.linkTarget, linkAttr: ssdsd, color: items.color, bgColor: items.bgColor, padding: items.padding, margin: items.margin } });


                            }}
                          />

                          <InputControl
                            className='mr-2'
                            value={x.val}
                            onChange={(newVal) => {
                              items.linkAttr[i].val = newVal
                              var ssdsd = items.linkAttr.concat([]);



                              setAttributes({ items: { prefix: items.prefix, postfix: items.postfix, maxCount: items.maxCount, postCount: items.postCount, class: items.class, linkTarget: items.linkTarget, linkAttr: ssdsd, color: items.color, bgColor: items.bgColor, padding: items.padding, margin: items.margin } });


                            }}
                          />
                          <span className='text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close'
                            onClick={(ev) => {

                              items.linkAttr.splice(i, 1);

                              var ssdsd = items.linkAttr.concat([]);

                              setAttributes({ items: { prefix: items.prefix, postfix: items.postfix, maxCount: items.maxCount, postCount: items.postCount, class: items.class, linkTarget: items.linkTarget, linkAttr: ssdsd, color: items.color, bgColor: items.bgColor, padding: items.padding, margin: items.margin } });



                            }}

                          ></span>
                        </PanelRow>




                      </div>

                    )

                  })
                }

              </div>


              <PanelRow className='my-3'>
                <label>Color</label>
                {/* <BreakpointToggle onChange={onChangeBreakPoint} /> */}

                <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
              </PanelRow>

              <ColorPalette
                value={items.color[breakPointX]}
                colors={colors}
                enableAlpha
                onChange={(newVal) => {

                  var responsive = items.color;
                  responsive[breakPointX] = newVal;



                  setAttributes({ items: { prefix: items.prefix, postfix: items.postfix, maxCount: items.maxCount, postCount: items.postCount, class: items.class, linkTarget: items.linkTarget, linkAttr: items.linkAttr, color: responsive, bgColor: items.bgColor, padding: items.padding, margin: items.margin } });


                  blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], color: responsive };
                  setAttributes({ blockCssY: { items: blockCssY.items } });







                }}
              />


              <PanelRow className='my-3'>
                <label>Background Color</label>
                <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




              </PanelRow>

              <ColorPalette
                value={items.bgColor[breakPointX]}
                colors={colors}
                enableAlpha
                onChange={(newVal) => {

                  var responsive = items.bgColor;
                  responsive[breakPointX] = newVal;


                  setAttributes({ items: { prefix: items.prefix, postfix: items.postfix, maxCount: items.maxCount, postCount: items.postCount, class: items.class, linkTarget: items.linkTarget, linkAttr: items.linkAttr, color: items.color, bgColor: responsive, padding: items.padding, margin: items.margin } });


                  blockCssY.items[itemSelector] = { ...blockCssY.items[itemSelector], 'background-color': responsive };
                  setAttributes({ blockCssY: { items: blockCssY.items } });




                }}
              />

              <PanelRow className='my-3'>
                <label>Padding</label>
                <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
              </PanelRow>

              <BoxControl
                label=""
                values={items.padding[breakPointX]}
                onChange={(nextValues) => { paddingControl(nextValues) }}
              />


              <PanelRow className='my-3'>
                <label>Margin</label>
                <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
              </PanelRow>

              <BoxControl
                label=""
                values={items.margin[breakPointX]}
                onChange={(nextValues) => { marginControl(nextValues) }}
              />


            </PanelBody>

            <PanelBody title="Front Text" initialOpen={false}>



              <PanelRow>
                <label for="">Front Text</label>

                <InputControl
                  value={frontText.text}
                  onChange={(newVal) => setAttributes({ frontText: { text: newVal, color: frontText.color, bgColor: frontText.bgColor, padding: frontText.padding, margin: frontText.margin } })}
                />
              </PanelRow>


            </PanelBody>
            <PanelBody title="Separator" initialOpen={false}>

              <PanelRow>
                <label for="">Separator</label>
                <InputControl
                  value={separator.text}
                  onChange={(newVal) => setAttributes({ separator: { text: newVal, color: separator.color, bgColor: separator.bgColor, padding: separator.padding, margin: separator.margin } })}
                />
              </PanelRow>

            </PanelBody>

            <div className=''>


              {/* <BreakpointToggle onChange={onChangeBreakPoint} /> */}









              <div>




                <PanelBody title="Custom Style" initialOpen={false}>

                  <p>Please use following class selector to apply your custom CSS</p>
                  <div className='my-3'>
                    <p className='font-bold'>Items Wrapper</p>
                    <p><code>{itemWrapSelector}{'{/* your CSS here*/}'}</code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Caetgory Items</p>
                    <p><code>{itemSelector}{'{}'} </code></p>
                    <p><code>.pg-postTerms a{'{/* your CSS here*/}'}</code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Separator</p>
                    <p><code>{itemSeparatorSelector}{'{/* your CSS here*/}'} </code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Front Text</p>
                    <p><code>{frontTextSelector}{'{/* your CSS here*/}'} </code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Post Count</p>
                    <p><code>{postCountSelector}{'{/* your CSS here*/}'} </code></p>
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



            </div >






          </InspectorControls >
        </div >
        ,


        <>

          <div className='my-5'></div>

          {taxonomy.length == 0 && (

            <div>

              <label for="">Taxonomies</label>

              <SelectControl
                label=""
                value={taxonomy}
                options={taxonomies}
                onChange={(newVal) => {

                  setAttributes({ taxonomy: newVal });


                }


                }
              />

            </div>

          )}

          {categories.length == 0 && (<Spinner />)}

          {categories.length > 0 && (

            <div className='pg-postTerms'>
              <span className='frontText inline-block'>
                <RawHTML>{frontText.text}</RawHTML>

              </span>
              {categories.map((x, index) => {


                return (


                  <a target={items.linkTarget} title={x.name} {...linkAttrItems} className={items.class} href={x.link}>
                    <span >{items.prefix}{x.name}{items.postfix}</span>

                    {items.postCount == true && (<span className='postCount'>({x.count})</span>)}

                    {categoryCount != index && (<span className='separator'>{separator.text}</span>)}
                  </a>

                )



              })}

            </div>


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