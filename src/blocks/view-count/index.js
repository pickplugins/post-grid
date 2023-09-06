import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { PanelBody, RangeControl, Button, Panel, PanelRow, } from '@wordpress/components'

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';



registerBlockType("post-grid/view-count", {
  apiVersion: 2,
  title: "view-count",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path fill="#1d4ed8" d="M17.53,16.56a1.07,1.07,0,0,0-1.06,1.06v7.93H2.12V11.2h7.93a1.06,1.06,0,0,0,0-2.12H1.81A1.81,1.81,0,0,0,0,10.89v15a1.81,1.81,0,0,0,1.81,1.81h15a1.81,1.81,0,0,0,1.81-1.81V17.62A1.06,1.06,0,0,0,17.53,16.56Z" /><path fill="#1d4ed8" d="M19,11.63l-3-3a1.07,1.07,0,0,0-1.5,0l-9,9a1.06,1.06,0,0,0-.31.75v3A1.07,1.07,0,0,0,6.3,22.43h3a1.06,1.06,0,0,0,.75-.31l9-9A1.07,1.07,0,0,0,19,11.63Zm-4.5,3L8.86,20.31H7.36v-1.5L13,13.14Zm2.25-2.25-.75.75-1.49-1.49.75-.75Z" /><circle fill="#1d4ed8" cx="24.85" cy="25.36" r="2.31" /><circle fill="#1d4ed8" cx="33.69" cy="25.36" r="2.31" /></svg>

    ,
  },


  attributes: {



    viewCount: {
      "type": "string",
      "default": ''
    },


  },

  supports: {
    "align": ["wide", "full"],
  },
  category: "post-grid",


  edit: function (props) {


    var attributes = props.attributes;
    var setAttributes = props.setAttributes;
    var clientId = props.clientId;



    var viewCount = attributes.viewCount;





    return (
      <>
        <InspectorControls>
          <div className='px-3' initialOpen={false}>


            <PanelRow className='mb-4'>
              <label for="">View Count</label>
              <InputControl
                className='mr-2'
                value={viewCount}
                onChange={(newVal) => {

                  setAttributes({ viewCount: newVal });
                }}
              />
            </PanelRow>



          </div>

        </InspectorControls >

        <div>view-count: {viewCount}</div>
      </>

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})