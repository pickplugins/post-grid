import apiFetch from '@wordpress/api-fetch';
import { useEntityProp } from '@wordpress/core-data';

import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, subscribe, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { applyFilters } from '@wordpress/hooks';

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



registerBlockType("post-grid/post-meta", {
  title: "Post Meta",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src: <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M20 4H4v1.5h16V4zm-2 9h-3c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2zm.5 5c0 .3-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5v3zM4 9.5h9V8H4v1.5zM9 13H6c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2zm.5 5c0 .3-.2.5-.5.5H6c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5v3z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>,
  },
  attributes: {


    template: {
      "type": "string",
      "default": '<div>Output HTML: {metaValue}</div>'
    },
    templateLoop: {
      "type": "string",
      "default": ''
    },

    wrapper: {
      type: 'object',
      default: {

        options: {
          class: '',
          tag: 'div',

        },
        styles:
        {
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: {},

        },


      },
    },
    meta: {
      type: 'object',
      default: {
        options: {
          key: '', type: 'string', /*string, acfImage, acfFile, , , , acfUser*/ prefix: '', postfix: '',
        },

        styles: {
          textAlign: {},
          display: {},
          width: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},

          fontSize: {}, //{ val: '18', unit: 'px' }
          lineHeight: {}, // { val: '18', unit: 'px' }
          letterSpacing: {}, // { val: '18', unit: 'px' }
          fontFamily: {},
          fontWeight: {},
          textDecoration: {}, //overline, line-through, underline
          textTransform: {},
        },

      },
    },


    customCss: {
      "type": "string",
      "default": ''
    },
    blockId: {
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

    var meta = attributes.meta;
    var template = attributes.template;
    var templateLoop = attributes.templateLoop;



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


    var metaKeyTypeArgsBasic = {
      string: { label: 'String', value: 'string', },
      object: { label: 'Object', value: 'object', isPro: true },
      array: { label: 'Array', value: 'array', isPro: true },

      acfImage: { label: 'ACF Image', value: 'acfImage', isPro: true },
      acfFile: { label: 'ACF File', value: 'acfFile', isPro: true },
      acfTaxonomy: { label: 'ACF Taxonomy', value: 'acfTaxonomy', isPro: true },
      acfPostObject: { label: 'ACF Post Object', value: 'acfPostObject', isPro: true },
      acfPageLink: { label: 'ACF Page Link', value: 'acfPageLink', isPro: true },
      acfLink: { label: 'ACF Link', value: 'acfLink', isPro: true },
      acfUser: { label: 'ACF User', value: 'acfUser', isPro: true },
      acfButtonGroup: { label: 'ACF Button Group', value: 'acfButtonGroup', isPro: true },
    };

    let metaKeyTypeArgs = applyFilters('metaKeyTypeArgs', metaKeyTypeArgsBasic);



    useEffect(() => {


      apiFetch({
        path: '/post-grid/v2/get_post_meta',
        method: 'POST',
        data: { postId: postId, meta_key: meta.options.key, type: meta.options.type, template: template },
      }).then((res) => {


        if (meta.options.type == 'acfImage' || meta.options.type == 'acfFile') {
          setMetaHtml(res.html);
          setMetaArgs(res.args);

        } else {

          setMetaHtml(res.html);
          setMetaArgs(res.args);
        }



      });

    }, [meta, template]);



    useEffect(() => {


      if (metaValue != null) {

        if (meta.options.type == 'string') {
          setMetaValue(res.meta_value)
        } else if (meta.options.type == 'acfImage') {
          setMetaHtml(res.html);
        }

      }


    }, [template]);



    useEffect(() => {

      setAttributes({ blockId: blockIdX });

      // setAttributes({ postTitle: postTitle });
      // setAttributes({ wrapper: wrapper });

      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);


    }, [clientId]);


    var breakPointList = [];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }








    const CustomTag = `${wrapper.options.tag}`;




















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


    useEffect(() => {

      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);

    }, [blockCssY]);




    useEffect(() => {
      //generateBlockCssY();
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);

    }, [items]);


    const post = useSelect((select) =>
      select('core').getEntityRecord('postType', context['postType'], context['postId'])
    );

    const termstaxonomy = useSelect((select) =>
      select('core').getEntityRecords('taxonomy', 'category', [4, 5])

    );











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

            <PanelBody title="Wrapper" initialOpen={false}>

              <PanelRow>
                <label for="">Wrapper Tag</label>
                <SelectControl
                  label=""
                  value={wrapper.options.tag}
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

                    var options = { ...wrapper.options, tag: newVal };
                    setAttributes({ wrapper: { styles: wrapper.styles, options: options } });

                  }

                  }
                />
              </PanelRow>
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
            <PanelBody title="Meta Key" initialOpen={true}>


              <PanelRow>
                <label for="">Meta Key</label>

                <InputControl
                  placeholder="Meta key"
                  value={meta.options.key}
                  onChange={(newVal) => {


                    var options = { ...meta.options, key: newVal }
                    setAttributes({ meta: { ...meta, options: options } });


                  }}
                />
              </PanelRow>

              <PanelRow>
                <label>Meta Key Type </label>
                <PGDropdown position="bottom right" variant="secondary" options={metaKeyTypeArgs} buttonTitle="Choose" onChange={(option, index) => {



                  var options = { ...meta.options, type: option.value };
                  setAttributes({ meta: { ...meta, options: options } });


                }} values="" value={meta.options.type}></PGDropdown>

              </PanelRow>



              <label className='my-3' for="">Template</label>


              <TextareaControl

                value={template}
                onChange={(newVal) => {

                  setAttributes({ template: newVal });


                }}
              />


              <label className='my-3' for="">Loop Template </label>


              <TextareaControl
                placeholder='<div>{title}</div><div>{details}</div>'

                value={templateLoop}
                onChange={(newVal) => {

                  setAttributes({ templateLoop: newVal });


                }}
              />

              <p>You can use following for loop template to iterate array elements <code>&#60;div&#62; &#123;itemIndex1&#125;&#60;/div&#62;&#60;div&#62;&#123;itemIndex2&#125;&#60;/div&#62;</code></p>

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





            <PanelBody title="Custom Style" initialOpen={false}>

              <p>Please use following class selector to apply your custom CSS</p>
              <div className='my-3'>
                <p className='font-bold'>Items Wrapper</p>
                <p><code>{itemWrapSelector}{'{/* your CSS here*/}'}</code></p>
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


          {meta.options.key.length == 0 && (<InputControl
            placeholder="Meta key"
            value={meta.options.key}
            onChange={(newVal) => {

              var options = { ...meta.options, key: newVal }
              setAttributes({ meta: { ...meta, options: options } });

            }}
          />)}





          {wrapper.options.tag && (
            <CustomTag className={[blockId]}>

              <RawHTML>{metaHtml}</RawHTML>
            </CustomTag>
          )}

          {wrapper.options.tag.length == 0 && (

            <div className={[blockId]}>
              <RawHTML>{metaHtml}</RawHTML>

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