import apiFetch from '@wordpress/api-fetch';
import { InnerBlocks, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"
import { useEntityProp } from '@wordpress/core-data';

import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, subscribe, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Spinner, Popover } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { Icon, styles, settings, link, linkOff, plus } from "@wordpress/icons";


import { InspectorControls, BlockControls, AlignmentToolbar, RichText } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'

import IconToggle from '../../components/icon-toggle'
import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import PGDropdown from '../../components/dropdown'

import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'


var myStore = wp.data.select('postgrid-shop');



registerBlockType("post-grid/shortcode", {
  apiVersion: 2,
  title: "Shortcode",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><polygon fill="#1d4ed8" points="5.51 28.64 0 28.64 0 7.36 5.51 7.36 5.51 9.28 1.92 9.28 1.92 26.72 5.51 26.72 5.51 28.64" /><polygon fill="#1d4ed8" points="36 28.64 30.48 28.64 30.48 26.72 34.08 26.72 34.08 9.28 30.48 9.28 30.48 7.36 36 7.36 36 28.64" /><rect fill="#8db1ff" x="4.42" y="15.46" width="26.73" height="5.08" /></svg>,
  },
  attributes: {


    wrapper: {
      type: 'object',
      default: {

        options: {
          class: 'inline-block',
        },
        styles: { color: { Desktop: '' }, padding: {}, margin: {} }


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
        styles: { color: { Desktop: '' }, padding: {}, margin: {} }

      },
    },


    blockId: {
      "type": "string",
      "default": ''
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

    //const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    var breakPointX = myStore.getBreakPoint();


    const [metaValue, setMetaValue] = useState(null);
    const [metaHtml, setMetaHtml] = useState('');
    const [metaArgs, setMetaArgs] = useState(null);
    const [linkPickerText, setLinkPickerText] = useState(false);
    const [shortcodePrams, setShortcodePrams] = useState({ id: '', label: '', val: '' });


    // Wrapper CSS Class Selectors
    const wrapperSelector = blockClass;
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

      console.log(shortcode);


      apiFetch({
        path: '/post-grid/v2/get_shortcode',
        method: 'POST',
        data: { postId: postId, meta_key: shortcode.options.key, prams: shortcode.options.prams, },
      }).then((res) => {


        console.log(res.html);

        setMetaHtml(res.html);
        //setMetaArgs(res.args);

      });

    }, [shortcode]);





    // var breakPointList = [];

    // for (var x in breakPoints) {

    //   var item = breakPoints[x];
    //   breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    // }




    useEffect(() => {

      setAttributes({ blockId: blockIdX });

      // setAttributes({ numberCount: numberCount });
      // setAttributes({ wrapper: wrapper });

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);




    }, [clientId]);







    function onChangeStyleWrapper(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, wrapper);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ wrapper: object });




      var elementSelector = myStore.getElementSelector(sudoScource, wrapperSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStyleWrapper(sudoScource, key) {

      var object = myStore.deletePropertyDeep(wrapper, [sudoScource, key, breakPointX]);
      setAttributes({ wrapper: object });


      var elementSelector = myStore.getElementSelector(sudoScource, wrapperSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }


    function onAddStyleWrapper(sudoScource, key) {





      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, wrapper);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ wrapper: object });


    }


    function onBulkAddWrapper(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]s
      let obj = Object.assign({}, wrapper);
      obj[sudoScource] = cssObj;

      setAttributes({ wrapper: obj });

      var selector = myStore.getElementSelector(sudoScource, wrapperSelector);
      var stylesObj = {};

      Object.entries(cssObj).map(args => {

        var attr = args[0];
        var cssPropty = myStore.cssAttrParse(attr);

        if (stylesObj[selector] == undefined) {
          stylesObj[selector] = {};
        }

        if (stylesObj[selector][cssPropty] == undefined) {
          stylesObj[selector][cssPropty] = {};
        }

        stylesObj[selector][cssPropty] = args[1]
      })


      var cssItems = { ...blockCssY.items };
      var cssItemsX = { ...cssItems, ...stylesObj }

      setAttributes({ blockCssY: { items: cssItemsX } });
    }




























    var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.



    useEffect(() => {


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);

    }, [blockCssY]);









    useEffect(() => {

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);

    }, [items]);



















    const post = useSelect((select) =>
      select('core').getEntityRecord('postType', context['postType'], context['postId'])
    );

    const termstaxonomy = useSelect((select) =>
      select('core').getEntityRecords('taxonomy', 'category', [4, 5])

    );





    console.log(blockId);





    const blockProps = useBlockProps({
      className: ` ${blockId} pg-shortcode`,

    });




    return (



      <>


        <InspectorControls >


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

                  let result = newVal.includes("[");

                  if (result) {

                    var shortcodeStr = newVal.replace('[', '');
                    shortcodeStr = shortcodeStr.replace(']', '');

                    var shortcodeArr = shortcodeStr.split(' ');
                    var shortcodeKey = shortcodeArr[0];

                    newVal = shortcodeKey;

                    shortcodeArr.shift();


                    var attsGroups = [];
                    var options = { ...shortcode.options }

                    console.log(options);


                    shortcodeArr.map(x => {

                      var shortcodePrams = {};
                      var attrArr = x.split('=');

                      shortcodePrams.id = (attrArr[0] == undefined) ? '' : attrArr[0];
                      shortcodePrams.label = (attrArr[0] == undefined) ? '' : attrArr[0];
                      shortcodePrams.val = (attrArr[1] == undefined) ? '' : attrArr[1].replaceAll('"', '');

                      options.prams.push(shortcodePrams);

                    })

                    setAttributes({ shortcode: { ...shortcode, options: options } });






                  }





                  var options = { ...shortcode.options, key: newVal }
                  setAttributes({ shortcode: { ...shortcode, options: options } });


                }}
              />
            </PanelRow>

            <p>You can paste the shortcode, please use following format when pasting</p>

            <code>[shortcode attr1="value1" attr2="value2"]</code>

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



            <PGtabs
              activeTab="options"
              orientation="horizontal"
              activeClass="active-tab"
              onSelect={(tabName) => { }}
              tabs={[
                {
                  name: 'options',
                  title: 'Options',
                  icon: settings,
                  className: 'tab-settings',
                },
                {
                  name: 'styles',
                  title: 'Styles',
                  icon: styles,
                  className: 'tab-style',
                },
              ]}
            >
              <PGtab name="options">
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
              </PGtab>
              <PGtab name="styles">
                <PGStyles obj={wrapper} onChange={onChangeStyleWrapper} onAdd={onAddStyleWrapper} onBulkAdd={onBulkAddWrapper} onRemove={onRemoveStyleWrapper} />
              </PGtab>
            </PGtabs>






          </PanelBody>






          <PanelBody title="Custom Style" initialOpen={false}>

            <p>Please use following class selector to apply your custom CSS</p>
            <div className='my-3'>
              <p className='font-bold'>Items Wrapper</p>
              <p><code>{wrapperSelector}{'{/* your CSS here*/}'}</code></p>
            </div>

            <div className='my-3'>
              <p className='font-bold'>Caetgory Items</p>
              <p><code>{itemSelector}{'{}'} </code></p>
              <p><code>.pg-shortcode a{'{/* your CSS here*/}'}</code></p>
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



        <>
          <div {...blockProps}>
            {shortcode.options.key.length == 0 && (<PGDropdown position="bottom right" variant="secondary" options={shortcodes} buttonTitle="Choose" onChange={(option, index) => {



              var options = { ...shortcode.options, key: option.value };
              setAttributes({ shortcode: { ...shortcode, options: options } });


            }} values="" value={shortcode.options.key}></PGDropdown>)}



            <RawHTML>{metaHtml}</RawHTML>
          </div>

        </>
      </>

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})