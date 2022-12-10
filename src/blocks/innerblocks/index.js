import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover, Spinner } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor'
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';


var myStore = wp.data.select('postgrid-shop');



registerBlockType("post-grid/innerblocks", {
  title: "innerblocks",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:
      <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 391C25 388.239 27.2386 386 30 386H470C472.761 386 475 388.239 475 391V441C475 443.761 472.761 446 470 446H30C27.2386 446 25 443.761 25 441V391Z" />
        <path d="M283 285C283 282.239 285.239 280 288 280H470C472.761 280 475 282.239 475 285V335C475 337.761 472.761 340 470 340H288C285.239 340 283 337.761 283 335V285Z" />
        <path d="M46.3955 115.771C36.5811 115.771 31.6738 111.519 31.6738 103.013V78.2803C31.6738 69.7744 36.5811 65.5215 46.3955 65.5215H248.181C257.995 65.5215 262.902 69.7744 262.902 78.2803V103.013C262.902 111.519 257.995 115.771 248.181 115.771H175.946V336.204C175.946 343.401 172.675 347 166.132 347H128.444C121.901 347 118.63 343.401 118.63 336.204V115.771H46.3955Z" />
      </svg>

    ,
  },


  attributes: {

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


    var baseTemplate = [
      ['core/heading', { level: 2, content: 'Example Nested Block Template' }],
      ['core/paragraph', { content: 'Lorem ipsum dolor sit amet labore cras venenatis.' }],
      ['core/columns', {},
        [
          ['core/column', {}, [
            ['core/heading', { level: 3, content: 'Sub Heading ' }],
            ['core/paragraph', { content: 'Lorem ipsum dolor sit amet id erat aliquet diam ullamcorper tempus massa eleifend vivamus.' }],
          ]
          ],
          ['core/column', {}, [
            ['core/heading', { level: 3, content: 'Sub Heading ' }],
            ['core/paragraph', { content: 'Morbi augue cursus quam pulvinar eget volutpat suspendisse dictumst mattis id.' }],
          ]
          ],
        ]
      ],
    ];


    var baseTemplate1 = [
      ['core/heading', { level: 2, content: '2 Example Nested Block Template' }],
      ['core/paragraph', { content: 'Lorem ipsum dolor sit amet labore cras venenatis.' }],
      ['core/columns', {},
        [
          ['core/column', {}, [
            ['core/heading', { level: 3, content: '2 Sub Heading 1' }],
            ['core/paragraph', { content: 'Lorem ipsum dolor sit amet id erat aliquet diam ullamcorper tempus massa eleifend vivamus.' }],
          ]
          ],
          ['core/column', {}, [
            ['core/heading', { level: 3, content: '2 Sub Heading 2' }],
            ['core/paragraph', { content: 'Morbi augue cursus quam pulvinar eget volutpat suspendisse dictumst mattis id.' }],
          ]
          ],
        ]
      ],
    ];


    const [template, setTemplate] = useState(baseTemplate);



    function updateTemplate() {


      setTemplate(baseTemplate1)

    }






    return (
      [


        <div>

          <BlockControls >



          </BlockControls>


          <InspectorControls key="general">

            <div onClick={updateTemplate}>Update</div>


          </InspectorControls >
        </div >
        ,


        <>


          <div {...useBlockProps()}>
            {JSON.stringify(useBlockProps)}

            <InnerBlocks
              template={template}
              templateLock="all"
              renderAppender={InnerBlocks.ButtonBlockAppender}
            />
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