import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, memo, useMemo, useState, useEffect } from '@wordpress/element'
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
    level: {
      "type": "number",
      "default": 2
    },

    color: {
      type: 'object',
      default: { val: '', responsive: {} },
    },

    isLink: {
      "type": "boolean",
      "default": true
    },
    rel: {
      "type": "string",
      "attribute": "rel",
      "default": ""
    },
    linkTarget: {
      "type": "string",
      "default": "_self"
    }
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

    var breakPointList = [{ label: 'Select..', value: '' }];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.icon, icon: item.icon, value: item.id })

    }

    //console.log(breakPointList);
    const colors = [
      { name: 'red', color: '#f00' },
      { name: 'white', color: '#fff' },
      { name: 'blue', color: '#00f' },
    ];


    var [breakPoint, setBreakPoint] = useState(''); // Using the hook.



    const post = useSelect((select) =>
      select('core').getEntityRecord('postType', context['postType'], context['postId'])
    );

    //console.log(post);


    const MyDropdown = () => (
      <Dropdown
        position="bottom"
        renderToggle={({ isOpen, onToggle }) => (
          <Button
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

              <div className='p-1 text-lg font-bold border-b inline-block hover:bg-gray-400 cursor-pointer' onClick={(newVal) => {

                console.log(x);

                //if (x.value) {
                setBreakPoint(x.value)

                //}

              }}><RawHTML>{x.icon}</RawHTML></div>

            )

          })}
        </div>}
      />
    );

    function BreakPointControl() {

      console.log(breakPointList);

      return (
        <div>
          <SelectControl
            label=""
            options={breakPointList}
            onChange={(newVal) => {

              if (newVal) {
                setBreakPoint(newVal)

              }

            }}
          />
        </div>

      )


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
              <div className='my-5 '>
                <PanelRow >
                  <label for="">Break Point</label>

                  <SelectControl
                    label=""
                    options={breakPointList}
                    onChange={(newVal) => {

                      if (newVal) {
                        setBreakPoint(newVal)

                      }

                    }}
                  />
                </PanelRow>

              </div>







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

                  <div>


                    <PanelRow>
                      <label for="">Color</label>

                      <div className='my-3'>


                        <MyDropdown />
                      </div>


                    </PanelRow>

                    {breakPoint && (
                      <div>responsive
                        <ColorPalette
                          color={color.responsive[breakPoint]}
                          colors={colors}
                          enableAlpha
                          onChange={(newVal) => {

                            var responsive = color.responsive;

                            var breakVal = responsive[breakPoint];

                            //if (breakVal == undefined) {
                            responsive[breakPoint] = newVal;
                            //}
                            console.log(breakVal)
                            console.log(newVal)
                            console.log(responsive)

                            console.log(breakPoint)

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




                  </div>


                </div>



              )}




            </div>






          </InspectorControls>
        </div>
        ,


        <div className="post-title">


          <pre>{JSON.stringify(color)}</pre>
          <pre>{JSON.stringify(breakPoint)}</pre>
          <pre>{JSON.stringify(breakPoints)}</pre>
          <pre>{JSON.stringify(breakPoints[breakPoint])}</pre>


          {isLink && (

            <a href={post.link} rel={rel} target={linkTarget}>{post.title.rendered}</a>

          )}
          {!isLink && (

            post.title.rendered

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