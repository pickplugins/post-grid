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
import PGDropdown from '../../components/dropdown'




var myStore = wp.data.select('postgrid-shop');



registerBlockType("post-grid/shortcode", {
  title: "Shortcode",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src: <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M20 4H4v1.5h16V4zm-2 9h-3c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2zm.5 5c0 .3-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5v3zM4 9.5h9V8H4v1.5zM9 13H6c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2zm.5 5c0 .3-.2.5-.5.5H6c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5v3z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>,
  },
  attributes: {


    wrapper: {
      type: 'object',
      default: {

        options: {
          class: 'inline-block',
        },
        styles: { color: {}, bgColor: {}, padding: {}, margin: {} }


      },
    },
    shortcode: {
      type: 'object',
      default: {
        options: {
          key: '', prefix: '', postfix: '', prams: {},
        },
        styles: { color: {}, bgColor: {}, padding: {}, margin: {} }

      },
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

    var blockId = attributes.blockId;

    var blockIdX = attributes.blockId ? attributes.blockId : 'pg' + clientId.split('-').pop();
    var blockClass = '.' + blockIdX;

    var shortcode = attributes.shortcode;



    var wrapper = attributes.wrapper;
    var items = attributes.items;

    var blockCssY = attributes.blockCssY;

    var customCss = attributes.customCss;


    var postId = context['postId'];
    var postType = context['postType'];

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());

    const [metaValue, setMetaValue] = useState(null);
    const [metaHtml, setMetaHtml] = useState('');
    const [metaArgs, setMetaArgs] = useState(null);


    // Wrapper CSS Class Selectors
    const itemWrapSelector = blockClass;
    const itemSelector = blockClass + ' .item';
    const postCountSelector = blockClass + ' .postCount';

    const [shortcodes, setshortcodes] = useState({
      yith_wcwl_add_to_wishlist: { label: 'YITH - Add to Wishlist', value: 'yith_wcwl_add_to_wishlist', args: { product_id: '' } },
      yasr_overall_rating: { label: 'YASR- overall rating', value: 'yasr_overall_rating', args: { size: '', postid: '' } },
      yasr_visitor_votes: { label: 'YASR - visitor votes', value: 'yasr_visitor_votes', args: { size: '', postid: '' } },
      wp_postviews: { label: 'WP-PostViews', value: 'views', args: { id: '' } },
      wp_postratings: { label: 'WP-PostRatings', value: 'wp_postratings', args: { id: '' } },
      site_reviews_summary: { label: 'Site Reviews - Summary', value: 'site_reviews_summary', args: { hide: '', assigned_to: '', class: '' } },
      ratingwidget: { label: 'Rating-Widget', value: 'ratingwidget', args: { post_id: '' } },
      ratemypostresult: { label: 'Rate my Post - Result', value: 'ratemypost-result', args: { post_id: '' } },
      ratemypost: { label: 'Rate my Post', value: 'ratemypost', args: { id: '' } },
      postviews: { label: 'Post Views Counter', value: 'post-views', args: { id: '' } },
      pvcp_1: { label: 'Page Visit Counter', value: 'pvcp_1', args: { postid: '' } },
      pvc_stats: { label: 'Page Views Count', value: 'pvc_stats', args: { postid: '' } },
      mr_rating_result: { label: 'Multi Rating - Result', value: 'mr_rating_result', args: { post_id: '' } },
      mr_rating_form: { label: 'Multi Rating', value: 'mr_rating_form', args: { post_id: '' } },
      likebtn: { label: 'Like Button Rating', value: 'likebtn', args: {} },
      kkratings: { label: 'KK Star Ratings', value: 'kkratings', args: { size: '', id: '' } },



    });

    useEffect(() => {


      // apiFetch({
      //   path: '/post-grid/v2/get_post_meta',
      //   method: 'POST',
      //   data: { postId: postId, meta_key: shortcode.options.key, prams: shortcode.options.prams, },
      // }).then((res) => {

      //   console.log(res);



      //   setMetaHtml(res.html);
      //   setMetaArgs(res.args);

      // });

    }, [shortcode]);





    var breakPointList = [];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

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



                var newValuesObj = {};

                if (Object.keys(wrapper.styles.textAlign).length == 0) {
                  newValuesObj[breakPointX] = nextAlign;
                } else {
                  newValuesObj = wrapper.styles.textAlign;
                  newValuesObj[breakPointX] = nextAlign;
                }

                var styles = { ...wrapper.styles, textAlign: newValuesObj };
                setAttributes({ wrapper: { ...wrapper, styles: styles } });

                blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'text-align': newValuesObj };
                setAttributes({ blockCssY: { items: blockCssY.items } });



              }}
            />
          </BlockControls>


          <InspectorControls key="general">

            <div className='p-3'>




            </div>

            <PanelBody title="shortcode Key" initialOpen={true}>
              <PanelRow>
                <label>Choose Shortcode </label>
                <PGDropdown position="bottom right" variant="secondary" options={shortcodes} buttonTitle="Choose" onChange={(option, index) => {

                  console.log(option);


                  var options = { ...shortcode.options, key: option.value };
                  setAttributes({ shortcode: { ...shortcode, options: options } });


                }} values="" value={shortcode.options.key}></PGDropdown>

              </PanelRow>

              <PanelRow>
                <label for="">shortcode Key</label>

                <InputControl
                  placeholder="shortcode key"
                  value={shortcode.options.key}
                  onChange={(newVal) => {


                    var options = { ...shortcode.options, key: newVal }
                    setAttributes({ shortcode: { ...shortcode, options: options } });


                  }}
                />
              </PanelRow>







              <div className='my-3'>

                <label for="">Parameters</label>
                <div className=''>

                  {metaArgs != undefined && Object.entries(metaArgs).map((arg, i) => {

                    var key = arg[0]
                    var val = arg[1]

                    return (
                      <div className='my-2 bg-gray-300'>
                        <div onClick={ev => {
                          var target = ev.target;


                        }} className='bg-gray-500 px-3 py-2 text-white'>{key}</div>
                        <div className='px-3 py-2'>{val}</div>
                      </div>

                    )

                  })}


                </div>

              </div>


            </PanelBody>



            <PanelBody title="Wrapper" initialOpen={false}>

              <PanelRow>
                <label for="">Wrapper Class</label>

                <InputControl
                  value={wrapper.options.class}
                  onChange={(newVal) => {


                    var options = { ...wrapper.options, class: newVal }
                    setAttributes({ wrapper: { ...wrapper, options: options } });




                  }}
                />
              </PanelRow>

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


          {shortcode.options.key.length == 0 && (<PGDropdown position="bottom right" variant="secondary" options={shortcodes} buttonTitle="Choose" onChange={(option, index) => {

            console.log(option);


            var options = { ...shortcode.options, key: option.value };
            setAttributes({ shortcode: { ...shortcode, options: options } });


          }} values="" value={shortcode.options.key}></PGDropdown>)}





          <div className='pg-postMeta'>


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