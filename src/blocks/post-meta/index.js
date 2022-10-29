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
import colorsPresets from '../../colors-presets'


import _ from 'lodash-es';
import template from 'lodash-es/template';


var myStore = wp.data.select('postgrid-shop');



registerBlockType("post-grid/post-meta", {
  title: "Post Meta",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#7e70af',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src: <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M20 4H4v1.5h16V4zm-2 9h-3c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2zm.5 5c0 .3-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5v3zM4 9.5h9V8H4v1.5zM9 13H6c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2zm.5 5c0 .3-.2.5-.5.5H6c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5v3z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>,
  },
  attributes: {
    template: {
      "type": "string",
      "default": '<%= metaValue %>'
    },
    wrapper: {
      type: 'object',
      default: { textAlign: '', class: 'inline-block', color: {}, bgColor: {}, padding: {}, margin: {} },
    },
    meta: {
      type: 'object',
      default: { key: '', prefix: '', postfix: '', color: {}, bgColor: {}, padding: {}, margin: {} },
    },
    separator: {
      type: 'object',
      default: { class: 'inline-block', text: ', ', color: {}, bgColor: {}, padding: {}, margin: {} },
    },
    frontText: {
      type: 'object',
      default: { text: 'Meta Value: ', class: 'inline-block', color: {}, bgColor: {}, padding: {}, margin: {} },
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

    var meta = attributes.meta;
    var template = attributes.template;



    var wrapper = attributes.wrapper;
    var items = attributes.items;
    var separator = attributes.separator;
    var frontText = attributes.frontText;

    var blockCssY = attributes.blockCssY;

    var customCss = attributes.customCss;


    var postId = context['postId'];
    var postType = context['postType'];

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());

    const [metaValue, setMetaValue] = useState(null);
    const [metaHtml, setMetaHtml] = useState('');


    // Wrapper CSS Class Selectors
    const itemWrapSelector = '.pg-postMeta';
    const itemSelector = '.pg-postMeta .item';
    const itemSeparatorSelector = '.pg-postMeta .separator';
    const frontTextSelector = '.pg-postMeta .frontText';
    const postCountSelector = '.pg-postMeta .postCount';



    useEffect(() => {


      apiFetch({
        path: '/post-grid/v2/get_post_meta',
        method: 'POST',
        data: { postId: postId, meta_key: meta.key },
      }).then((res) => {

        ////console.log(res);

        setMetaValue(res.meta_value)

        var compiled = _.template(template);
        ////console.log(compiled({ 'metaValue': res.meta_value }));

        var html = compiled({ 'metaValue': res.meta_value });

        setMetaHtml(html);

      });

    }, [meta]);


    useEffect(() => {


      if (metaValue != null) {
        var compiled = _.template(template);
        setMetaHtml(compiled({ 'metaValue': metaValue }));

      }


    }, [template]);


    var breakPointList = [];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }

    function paddingControl(nextValues) {


      var responsive = items.padding;
      responsive[breakPointX] = nextValues;

      ////console.log(nextValues);



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

    const [
      postCategoriesX,
      setPostCategoriesX,
    ] = useEntityProp('postType', postType, 'categories', postId);



    useEffect(() => {
      //console.log('Listening postCategoriesX: ', postCategoriesX);


      setPostCategoriesData([]);
      setCategories([]);

      setcategoryCount(categories.length - 1);

      for (x in postCategoriesX) {

        var catId = postCategoriesX[x]

        //console.log(x)

        var assd = x;

        if (x) {

          apiFetch({
            path: '/wp/v2/categories/' + catId,
            method: 'GET',
          }).then((res) => {


            ////console.log(res)
            setPostCategoriesData(current => [...current, res]);
            //console.log(assd)
            setCategories(current => [...current, res]);

          });

        }


      }

      //console.log(postCategoriesData);

    }, [postCategoriesX]);






























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





      ////console.log(reponsiveCss);


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
      ////console.log('Listening linkAttr: ', linkAttr);
      generateBlockCssY();


    }, [items]);







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





    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType,

    } = wp.data.dispatch('core/edit-post')





    const post = useSelect((select) =>
      select('core').getEntityRecord('postType', context['postType'], context['postId'])
    );

    const termstaxonomy = useSelect((select) =>
      select('core').getEntityRecords('taxonomy', 'category', [4, 5])

    );





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
                  var asdsdsd = wp.data.dispatch('postgrid-shop').setBreakPoint(x.value)

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

      ////console.log(x);
      ////console.log(index);
      ////console.log('Post Title');



      setPreviewDeviceType(x.value)
      var asdsdsd = wp.data.dispatch('postgrid-shop').setBreakPoint(x.value)

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

            <div className='p-3'>




            </div>

            <PanelBody title="Meta Key, Template" initialOpen={true}>


              <PanelRow>
                <label for="">Meta Key</label>

                <InputControl

                  value={meta.key}
                  onChange={(newVal) => {

                    setAttributes({ meta: { key: newVal, prefix: meta.prefix, color: meta.postfix, color: meta.color, bgColor: meta.bgColor, padding: meta.padding, margin: meta.margin } });


                  }}
                />
              </PanelRow>




              <label className='my-3' for="">Template</label>


              <TextareaControl

                value={template}
                onChange={(newVal) => {

                  setAttributes({ template: newVal });


                }}
              />

              <small>Please check the documentaiton https://lodash.com/docs/4.17.15#template</small>


              <div className='my-3'>

                <label for="">Response</label>
                <div>
                  <code className='break-words'>{JSON.stringify(metaValue)}</code>
                </div>

              </div>


            </PanelBody>



            <PanelBody title="Wrapper" initialOpen={false}>

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


            <PanelBody title="Meta Value Return" initialOpen={true}>

              <div className='p-3'>






              </div>

            </PanelBody>


            <div className=''>


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
                    <p><code>.pg-postMeta a{'{/* your CSS here*/}'}</code></p>
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


          {meta.key.length == 0 && (<InputControl
            value={meta.key}
            onChange={(newVal) => {

              setAttributes({ meta: { key: newVal, prefix: meta.prefix, color: meta.postfix, color: meta.color, bgColor: meta.bgColor, padding: meta.padding, margin: meta.margin } });


            }}
          />)}


          {categories.length == 0 && (<Spinner />)}



          <div className='pg-postMeta'>
            <span className='frontText inline-block'>
              <RawHTML>{frontText.text}</RawHTML>

            </span>

            <RawHTML>{metaHtml}</RawHTML>


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