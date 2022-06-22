import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem } from '@wordpress/components'
import { InspectorControls, BlockControls, AlignmentToolbar, RichText } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;







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
    postId: {
      type: 'number',
    },
    level: {
      "type": "number",
      "default": 2
    },

    color: {
      type: 'object',
      default: { val: '', responsive: {} },
    },

    bgColor: {
      type: 'object',
      default: { val: '', responsive: {} },
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
    linkTarget: {
      "type": "string",
      "default": "_self"
    },
  },
  usesContext: ["postId", "postType", "queryId"],

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


    var postId = context['postId'];


    var breakPointList = [{ label: 'Select..', value: '' }];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.icon, icon: item.icon, value: item.id })

    }

    var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.



    useEffect(() => {
      //console.log('Listening linkAttr: ', linkAttr);
      linkAttrObj();



    }, [linkAttr]);

    var linkAttrObj = () => {

      var sdsd = {};

      linkAttr.map(x => {

        if (x.val)
          sdsd[x.id] = x.val;

      })

      //console.log(sdsd);
      setlinkAttrItems(sdsd);
      //return sdsd;

    }

    //console.log(breakPointList);
    const colors = [
      { name: 'red', color: '#f00' },
      { name: 'white', color: '#fff' },
      { name: 'blue', color: '#00f' },
    ];


    var [breakPoint, setBreakPoint] = useState(''); // Using the hook.





    const changeScreen = useCallback(screen => {



      const {
        __experimentalSetPreviewDeviceType: setPreviewDeviceType,
      } = wp.data.dispatch('core/edit-post')

      setPreviewDeviceType(screen)
    }, [])

    useEffect(() => {
      console.log('Listening breakPoint: ', breakPoint);

      var iframe = document.querySelectorAll('[name="editor-canvas"]')[0];

      if (iframe) {
        var body = iframe.contentDocument.body;

        var str = '<style>.pg-postTitle a{color:#f00}</style>';

        body.insertAdjacentHTML('beforeend', str);

      }


      var wrap = document.getElementsByClassName('is-desktop-preview');
      var wpfooter = document.getElementById('wpfooter');


      var str = '<style>.pg-postTitle a{color:#f00}</style>';

      wpfooter.insertAdjacentHTML('beforeend', str);





    }, [breakPoint]);

    const post = useSelect((select) =>
      select('core').getEntityRecord('postType', context['postType'], context['postId'])
    );

    //console.log(post);

    const CustomTag = `${tag}`;

    const MyDropdown = () => (
      <Dropdown
        position="bottom"
        renderToggle={({ isOpen, onToggle }) => (
          <Button
            title={(breakPoints[breakPoint] != undefined) ? breakPoints[breakPoint].name : ''}
            variant="secondary"
            onClick={onToggle}
            aria-expanded={isOpen}
          >
            <RawHTML className="text-lg ">{(breakPoints[breakPoint] != undefined) ? breakPoints[breakPoint].icon : '<span class="icon-responsive font-bold"></span>'}</RawHTML>
          </Button>
        )}
        renderContent={() => <div>

          {breakPointList.map(x => {


            return (

              <div className={' text-lg font-bold border-b inline-block hover:bg-gray-400 cursor-pointer'} onClick={(newVal) => {

                console.log(x);

                //if (x.value) {
                setBreakPoint(x.value)
                changeScreen(x.value)
                //}

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
    );








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


              <PanelRow>
                <label for="">rel</label>

                <InputControl
                  value={rel}
                  onChange={(newVal) => setAttributes({ rel: newVal })}
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


                <PanelRow>
                  <label for="">Color</label>

                  <div className='my-3'>


                    <MyDropdown />
                  </div>


                </PanelRow>

                {breakPoint && (
                  <div>

                    <ColorPalette
                      color={color.responsive[breakPoint]}
                      colors={colors}
                      enableAlpha
                      onChange={(newVal) => {

                        var responsive = color.responsive;
                        responsive[breakPoint] = newVal;

                        setAttributes({ color: { val: color.val, responsive: responsive } })
                      }}
                    />
                  </div>

                )}
                {!breakPoint && (
                  <ColorPalette
                    color={color.val}
                    colors={colors}
                    enableAlpha
                    onChange={(newVal) => {
                      setAttributes({ color: { val: newVal, responsive: color.responsive } })

                    }}
                  />

                )}

                <PanelRow>
                  <label for="">Background Color</label>

                  <div className='my-3'>


                    <MyDropdown />
                  </div>


                </PanelRow>

                {breakPoint && (
                  <div>

                    <ColorPalette
                      color={bgColor.responsive[breakPoint]}
                      colors={colors}
                      enableAlpha
                      onChange={(newVal) => {

                        var responsive = bgColor.responsive;
                        responsive[breakPoint] = newVal;

                        setAttributes({ bgColor: { val: bgColor.val, responsive: responsive } })
                      }}
                    />
                  </div>

                )}
                {!breakPoint && (
                  <ColorPalette
                    color={bgColor.val}
                    colors={colors}
                    enableAlpha
                    onChange={(newVal) => {
                      setAttributes({ bgColor: { val: newVal, responsive: bgColor.responsive } })

                    }}
                  />

                )}




              </div>



            </div>






          </InspectorControls>
        </div>
        ,


        <div className={['pg-postTitle pg-postTitle-' + postId]} >


          {tag && (
            <CustomTag>
              {isLink && (
                <a {...linkAttrItems} href={post.link} rel={rel} target={linkTarget}>{post.title.rendered}</a>

              )}
              {!isLink && (

                post.title.rendered

              )}
            </CustomTag>
          )}







        </div>
      ]




    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})