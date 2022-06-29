import apiFetch from '@wordpress/api-fetch';

import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';

import { InspectorControls, BlockControls, AlignmentToolbar, RichText } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'

import IconToggle from '../../components/icon-toggle'
import BreakpointToggle from '../../components/breakpoint-toggle'



var myStore = wp.data.select('my-shop');

//////console.log(wp.data.select('my-shop').getBreakPoint('food'))
////console.log(myStore.getBreakPoint());




//////console.log(wp.data.select('my-shop').setPrice('food', 98))
//////console.log()




registerBlockType("post-grid/post-categories", {
  title: "Post Categories",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#7e70af',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src: <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M20 4H4v1.5h16V4zm-2 9h-3c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2zm.5 5c0 .3-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5v3zM4 9.5h9V8H4v1.5zM9 13H6c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2zm.5 5c0 .3-.2.5-.5.5H6c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5v3z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>,
  },
  attributes: {

    wrapper: {
      type: 'object',
      default: { textAlign: '', class: '', color: {}, bgColor: {}, padding: {}, margin: {} },
    },
    items: {
      type: 'object',
      default: { prefix: '', postfix: '', maxCount: 3, postCount: false, class: 'item', linkTarget: '', linkAttr: [], color: {}, bgColor: {}, padding: {}, margin: {} },
    },
    separator: {
      type: 'object',
      default: { text: ', ', color: {}, bgColor: {}, padding: {}, margin: {} },
    },
    frontText: {
      type: 'object',
      default: { text: 'Categories: ', color: {}, bgColor: {}, padding: {}, margin: {} },
    },


    customCss: {
      "type": "string",
      "default": ''
    },
    postId: {
      type: 'number',
    },


    blockCss: {
      "type": "object",
      "default": { items: {} }
    },
    blockCssY: {
      "type": "object",
      "default": {}
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


    var wrapper = attributes.wrapper;
    var items = attributes.items;
    var separator = attributes.separator;
    var frontText = attributes.frontText;



    var blockCss = attributes.blockCss;
    var blockCssY = attributes.blockCssY;

    var customCss = attributes.customCss;


    var postId = context['postId'];

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    const [license, setLicense] = useState(myStore.getLicense());


    // Wrapper CSS Class Selectors
    const itemWrapSelector = '.pg-postCategories';
    const itemSelector = '.pg-postCategories .item';
    const itemSeparatorSelector = '.pg-postCategories .separator';
    const frontTextSelector = '.pg-postCategories .frontText';
    const postCountSelector = '.pg-postCategories .postCount';


    var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }



    const PaddingControl = () => {

      return (
        <BoxControl
          label=""
          values={items.padding[breakPointX]}
          onChange={(nextValues) => {


            var responsive = items.padding;
            responsive[breakPointX] = nextValues;

            ////console.log(nextValues);



            setAttributes({ items: { prefix: items.prefix, postfix: items.postfix, maxCount: items.maxCount, postCount: items.postCount, class: items.class, linkTarget: items.linkTarget, linkAttr: items.linkAttr, color: items.color, bgColor: items.bgColor, padding: responsive, margin: items.margin } });

            //blockCss.items['padding'] = { responsive: responsive };

            blockCssY[itemSelector] = (blockCssY[itemSelector] != undefined) ? blockCssY[itemSelector] : {};


            console.log(blockCssY[itemSelector]);


            if (nextValues.top != undefined) {
              var paddingTop = (blockCss.items['padding-top'] !== undefined) ? blockCss.items['padding-top'] : { responsive: {} };
              paddingTop.responsive[breakPointX] = nextValues.top
              blockCss.items['padding-top'] = paddingTop;




              var paddingTop = (blockCssY[itemSelector]['padding-top'] != undefined) ? blockCss[itemSelector]['padding-top'] : {};
              paddingTop[breakPointX] = nextValues.left


              blockCssY[itemSelector] = { ...blockCssY[itemSelector], 'padding-top': paddingTop };
              setAttributes({ blockCssY: blockCssY });





            }


            if (nextValues.right != undefined) {
              var paddingRight = (blockCss.items['padding-right'] !== undefined) ? blockCss.items['padding-right'] : { responsive: {} };
              paddingRight.responsive[breakPointX] = nextValues.right
              blockCss.items['padding-right'] = paddingRight;




              var paddingRight = (blockCssY[itemSelector]['padding-right'] !== undefined) ? blockCss[itemSelector]['padding-right'] : {};
              paddingRight[breakPointX] = nextValues.left


              blockCssY[itemSelector] = { ...blockCssY[itemSelector], 'padding-right': paddingRight };
              setAttributes({ blockCssY: blockCssY });



            }

            if (nextValues.bottom != undefined) {
              var paddingBottom = (blockCss.items['padding-bottom'] !== undefined) ? blockCss.items['padding-bottom'] : { responsive: {} };
              paddingBottom.responsive[breakPointX] = nextValues.bottom
              blockCss.items['padding-bottom'] = paddingBottom;



              var paddingBottom = (blockCssY[itemSelector]['padding-bottom'] !== undefined) ? blockCss[itemSelector]['padding-bottom'] : {};
              paddingBottom[breakPointX] = nextValues.left


              blockCssY[itemSelector] = { ...blockCssY[itemSelector], 'padding-bottom': paddingBottom };
              setAttributes({ blockCssY: blockCssY });



            }

            if (nextValues.left != undefined) {
              var paddingLeft = (blockCss.items['padding-left'] !== undefined) ? blockCss.items['padding-left'] : { responsive: {} };
              paddingLeft.responsive[breakPointX] = nextValues.left
              blockCss.items['padding-left'] = paddingLeft;



              var paddingLeft = (blockCssY[itemSelector]['padding-left'] !== undefined) ? blockCss[itemSelector]['padding-left'] : {};
              paddingLeft[breakPointX] = nextValues.left

              blockCssY[itemSelector] = { ...blockCssY[itemSelector], 'padding-left': paddingLeft };
              setAttributes({ blockCssY: blockCssY });


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
          values={items.margin[breakPointX]}
          onChange={(nextValues) => {


            var responsive = items.margin;
            responsive[breakPointX] = nextValues;


            //blockCss.items['margin'] = { responsive: responsive };

            setAttributes({ items: { prefix: items.prefix, postfix: items.postfix, maxCount: items.maxCount, postCount: items.postCount, class: items.class, linkTarget: items.linkTarget, linkAttr: items.linkAttr, color: items.color, bgColor: items.bgColor, padding: items.padding, margin: responsive } });



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

      ////console.log(va);

      var asdsdsd = wp.data.dispatch('my-shop').setPrice('food', va)

      asdsdsd.then((res) => {

        //////console.log(res.price);
        getpriceOnclick();
        //setLicense(res);


      });
    }






    const [postData, setPostData] = useState({}); // Using the hook.
    const [postCategories, setPostCategories] = useState([]); // Using the hook.
    const [categoryCount, setcategoryCount] = useState(0); // Using the hook.




    function fetchPostData() {




      apiFetch({
        path: '/post-grid/v2/get_post_data',
        method: 'POST',
        data: { postId: postId, fields: [] },
      }).then((res) => {


        console.log(res)

        setPostData(res)

      });

    }






    useEffect(() => {
      //console.log('Listening postId: ', postId);
      fetchPostData();



    }, [postId]);


    useEffect(() => {
      console.log('Listening postData: ', postData);

      if (postData.category != undefined) {

        const categories = postData.category.slice(0, items.maxCount);

        setPostCategories(categories);
        setcategoryCount(categories.length - 1);

      }



    }, [postData]);


    useEffect(() => {
      //console.log('Listening maxCount: ', items.maxCount);

      if (postData.category != undefined) {

        const categories = postData.category.slice(0, items.maxCount);

        setPostCategories(categories);
        setcategoryCount(categories.length - 1);

      }



    }, [items]);









    function generateBlockCssY() {


      var reponsiveCssGroups = {};
      var reponsiveCss = '';

      for (var selector in blockCssY) {

        var attrs = blockCssY[selector];

        // var attr = x;
        // var id = '.pg-postCategories a';
        ///var responsive = item.responsive;
        console.log(selector);
        console.log(attrs);


        for (var attr in attrs) {
          var breakpoints = attrs[attr];

          console.log(attr);
          console.log(breakpoints);

          for (var device in breakpoints) {

            var attrValue = breakpoints[device];

            console.log(device);
            console.log(attrValue);


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

      console.log(reponsiveCssGroups);




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
      //     var id = '.pg-postCategories-' + postId + ' a';
      //     reponsiveCss += id + '{' + attr + ':' + defaultVal + '}';
      //     reponsiveCss += '}';
      //   }

      // }

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





      console.log(reponsiveCss);


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








    function generateBlockCss() {


      var reponsiveCssGroups = {};
      var reponsiveCss = '';

      for (var x in blockCss.items) {

        var item = blockCss.items[x];

        var attr = x;
        var id = '.pg-postCategories a';
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
      //     var id = '.pg-postCategories-' + postId + ' a';
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

          var id = '.pg-postCategories a';
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
          var id = '.pg-postCategories a';
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
          var id = '.pg-postCategories a';
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
      console.log('Listening blockCssY: ', blockCssY);



    }, [blockCssY]);


    useEffect(() => {
      console.log('Listening blockCss: ', blockCss);

      generateBlockCss()
      generateBlockCssY()


    }, [blockCss]);






    useEffect(() => {
      //////console.log('Listening linkAttr: ', linkAttr);
      linkAttrObj();





    }, [items]);





    var linkAttrObj = () => {

      var sdsd = {};

      items.linkAttr.map(x => {

        if (x.val)
          sdsd[x.id] = x.val;

      })

      //////console.log(sdsd);
      setlinkAttrItems(sdsd);
      //return sdsd;

    }

    //////console.log(breakPointList);
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

    const termstaxonomy = useSelect((select) =>
      select('core').getEntityRecords('taxonomy', 'category')

    );



    //console.log(termstaxonomy);


    ////console.log('Hello');
    //console.log(post);


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


                  ////console.log(x.value);

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

      //console.log(x);
      //console.log(index);
      //console.log('Post Title');



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
              value={wrapper.textAlign}
              onChange={(nextAlign) => {
                setAttributes({ wrapper: { textAlign: nextAlign, color: wrapper.color, bgColor: wrapper.bgColor, padding: wrapper.padding, margin: wrapper.margin } });




              }}
            />
          </BlockControls>


          <InspectorControls key="general">


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


              <PanelRow>
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

                  blockCss.items['color'] = { responsive: responsive };

                  blockCssY[itemSelector] = { ...blockCssY[itemSelector], color: responsive };
                  setAttributes({ blockCssY: blockCssY });

                  generateBlockCssY()

                  setAttributes({ blockCss: { items: blockCss.items } });





                }}
              />


              <PanelRow>
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

                  blockCssY[itemSelector] = { ...blockCssY[itemSelector], 'background-color': responsive };
                  setAttributes({ blockCssY: blockCssY });

                  generateBlockCssY()


                  blockCss.items['background-color'] = { responsive: responsive };
                  setAttributes({ blockCss: { items: blockCss.items } });

                }}
              />

              <PanelRow>
                <label>Padding</label>
                <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
              </PanelRow>

              <PaddingControl />

              <PanelRow>
                <label>Margin</label>
                <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
              </PanelRow>
              <MarginControl />




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
                    <p><code>.pg-postCategories a{'{/* your CSS here*/}'}</code></p>
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


          <div className='my-3'><code>{JSON.stringify(items)}</code></div>


          <div><code>{JSON.stringify(blockCssY)}</code></div>

          {postData.category == undefined && ('Loading')}

          {postData.category !== undefined && (

            <div className='pg-postCategories'>
              <span className='frontText inline-block'>
                <RawHTML>{frontText.text}</RawHTML>

              </span>
              {postCategories.map((x, index) => {


                return (


                  <a target={items.linkTarget} title={x.name} {...linkAttrItems} className={items.class} href={x.url}>
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