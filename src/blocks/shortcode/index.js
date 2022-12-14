import apiFetch from '@wordpress/api-fetch';
import { useEntityProp } from '@wordpress/core-data';

import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, subscribe, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Spinner, Popover } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { link, linkOff, plus } from "@wordpress/icons";

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

    shortcodeClassic: {
      "type": "string",
      "default": ''
    },
    shortcode: {
      type: 'object',
      default: {
        options: {
          key: '', id: '', prefix: '', postfix: '', prams: [],
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
    var shortcodeClassic = attributes.shortcodeClassic;



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
    const [linkPickerText, setLinkPickerText] = useState(false);
    const [shortcodePrams, setShortcodePrams] = useState({ id: '', label: '', val: '' });


    // Wrapper CSS Class Selectors
    const itemWrapSelector = blockClass;
    const itemSelector = blockClass + ' .item';
    const postCountSelector = blockClass + ' .postCount';

    const [shortcodes, setshortcodes] = useState({
      yith_wcwl_add_to_wishlist: { label: 'YITH - Add to Wishlist', value: 'yith_wcwl_add_to_wishlist', args: [{ id: 'product_id', label: 'Product Id', val: '{currentPostId}' }] },
      yasr_overall_rating: { label: 'YASR- overall rating', value: 'yasr_overall_rating', args: [{ id: 'size', label: 'Size', val: '15' }, { label: 'Post Id', val: '{currentPostId}' }] },
      yasr_visitor_votes: { label: 'YASR - visitor votes', value: 'yasr_visitor_votes', args: [{ id: 'size', label: 'Size', val: '15' }, { label: 'Post Id', val: '{currentPostId}' }] },
      wp_postviews: { label: 'WP-PostViews', value: 'views', args: [{ id: 'id', label: 'Post Id', val: '{currentPostId}' }] },
      wp_postratings: { label: 'WP-PostRatings', value: 'wp_postratings', args: [{ id: 'id', label: 'Post Id', val: '{currentPostId}' }] },
      site_reviews_summary: { label: 'Site Reviews - Summary', value: 'site_reviews_summary', args: [{ id: 'hide', label: 'Hide', val: '' }, { id: 'assigned_to', label: 'Assigned To', val: '' }, { id: 'class', label: 'Class', val: '' }] },
      ratingwidget: { label: 'Rating-Widget', value: 'ratingwidget', args: [{ id: 'post_id', label: 'Post Id', val: '{currentPostId}' }] },
      ratemypostresult: { label: 'Rate my Post - Result', value: 'ratemypost-result', args: [{ id: 'post_id', label: 'Post Id', val: '{currentPostId}' }] },
      ratemypost: { label: 'Rate my Post', value: 'ratemypost', args: [{ id: 'id', label: 'Post Id', val: '{currentPostId}' }] },
      postviews: { label: 'Post Views Counter', value: 'post-views', args: [{ id: 'id', label: 'Post Id', val: '{currentPostId}' }] },
      pvcp_1: { label: 'Page Visit Counter', value: 'pvcp_1', args: [{ id: 'postid', label: 'Post Id', val: '{currentPostId}' }] },
      pvc_stats: { label: 'Page Views Count', value: 'pvc_stats', args: [{ id: 'postid', label: 'Post Id', val: '{currentPostId}' }] },
      mr_rating_result: { label: 'Multi Rating - Result', value: 'mr_rating_result', args: [{ id: 'post_id', label: 'Post Id', val: '{currentPostId}' }] },
      mr_rating_form: { label: 'Multi Rating', value: 'mr_rating_form', args: [{ id: 'post_id', label: 'Post Id', val: '{currentPostId}' }] },
      likebtn: { label: 'Like Button Rating', value: 'likebtn', args: {} },
      kkratings: { label: 'KK Star Ratings', value: 'kkratings', args: [{ id: 'size', label: 'Size', val: '15' }, { id: 'id', label: 'Post Id', val: '{currentPostId}' }] },



    });

    useEffect(() => {


      apiFetch({
        path: '/post-grid/v2/get_shortcode',
        method: 'POST',
        data: { postId: postId, meta_key: shortcode.options.key, prams: shortcode.options.prams, },
      }).then((res) => {


        setMetaHtml(res.html);
        //setMetaArgs(res.args);

      });

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
      generateBlockCssY();


    }, [items]);







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

            <PanelBody title="Shortcode Key" initialOpen={true}>

              <label className='mb-3'>Choose Shortcode </label>
              <PGDropdown position="bottom right" variant="secondary" options={shortcodes} buttonTitle="Choose" onChange={(option, index) => {

                var options = { ...shortcode.options, id: option.id, key: option.value, prams: option.args };
                setAttributes({ shortcode: { ...shortcode, options: options } });


              }} values="" value={shortcode.options.key}></PGDropdown>

              <PanelRow>
                <label for="">Shortcode Key</label>

                <InputControl
                  placeholder="Shortcode key"
                  value={shortcode.options.key}
                  onChange={(newVal) => {


                    var options = { ...shortcode.options, key: newVal }
                    setAttributes({ shortcode: { ...shortcode, options: options } });


                  }}
                />
              </PanelRow>


              <PanelRow>
                <label for="">Parameters</label>
                <Button className={(linkPickerText) ? "!bg-gray-400" : ''} icon={plus} onClick={ev => {

                  setLinkPickerText(prev => !prev)
                }}>Add</Button>

                {linkPickerText && (
                  <Popover position="bottom right ">

                    <div className='p-3 w-60'>

                      <PanelRow>
                        <label for="">ID</label>

                        <InputControl
                          value={shortcodePrams.id}
                          onChange={(newVal) => {
                            setShortcodePrams({ ...shortcodePrams, id: newVal })
                          }}
                        />
                      </PanelRow>

                      <PanelRow>
                        <label for="">Label</label>

                        <InputControl
                          value={shortcodePrams.label}
                          onChange={(newVal) => {
                            setShortcodePrams({ ...shortcodePrams, label: newVal })
                          }}
                        />
                      </PanelRow>
                      <PanelRow>
                        <label for="">Value</label>

                        <InputControl
                          value={shortcodePrams.val}
                          onChange={(newVal) => {
                            setShortcodePrams({ ...shortcodePrams, val: newVal })
                          }}
                        />
                      </PanelRow>

                      <Button
                        variant="secondary"
                        onClick={ev => {

                          console.log(shortcodePrams);
                          var options = { ...shortcode.options }
                          options.prams.push(shortcodePrams);

                          setAttributes({ shortcode: { ...shortcode, options: options } });


                          // shortcodePrams.id = '';
                          // shortcodePrams.label = '';
                          // shortcodePrams.val = '';
                        }}
                      >
                        Add Parameter
                      </Button>

                    </div>

                  </Popover>

                )}


              </PanelRow>




              <div className=''>

                {shortcode.options.prams != undefined && shortcode.options.prams.map((arg, index) => {



                  return (
                    <div className='my-2 bg-gray-300'>
                      <div className='bg-gray-500 px-3 text-white'>

                        <PanelRow>
                          <label for="">{arg.label} ({arg.id})</label>

                          <span class="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
                            onClick={ev => {
                              var options = { ...shortcode.options }

                              options.prams.splice(index, 1);


                              setAttributes({ shortcode: { ...shortcode, options: options } });

                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"></path></svg>
                          </span>
                        </PanelRow>






                      </div>
                      <div className='px-3 py-2'>
                        <InputControl
                          value={arg.val}
                          onChange={(newVal) => {
                            var options = { ...shortcode.options }
                            options.prams[index].val = newVal
                            setAttributes({ shortcode: { ...shortcode, options: options } });
                          }}
                        />
                      </div>
                    </div>
                  )

                })

                }


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







          </InspectorControls >
        </div >
        ,


        <>


          {shortcode.options.key.length == 0 && (<PGDropdown position="bottom right" variant="secondary" options={shortcodes} buttonTitle="Choose" onChange={(option, index) => {



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