import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl } from '@wordpress/components'
import { InspectorControls, BlockControls, AlignmentToolbar, RichText } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';



registerBlockType("prefix-blocks/blockxyz-post-title", {
  title: "Post Title",
  icon: "grid-view",
  attributes: {



    dummyName: {
      type: 'string',
      default: 'Post Grid'
    },
    dummyAuthor: {
      type: 'string',
      default: 'author'
    },
    dummyVersion: {
      type: 'string',
      default: '2.1.20'
    }
  },
  category: "common",
  edit: function (props) {


    var attributes = props.attributes;
    var setAttributes = props.setAttributes;

    var dummyName = attributes.dummyName;

    const title = wp.data.select("core/editor").getEditedPostAttribute('title');



    return (
      [


        <div>
          <InspectorControls key="general">

            <div className='blockxyz'>





              <PanelBody title="Custom Scripts" initialOpen={false}></PanelBody>




            </div>

          </InspectorControls>
        </div>
        ,


        <div className="post-title">



          <code>

            {title}


          </code>



        </div>
      ]




    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})