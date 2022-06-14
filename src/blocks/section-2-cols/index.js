import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

import styled from 'styled-components'
const { select, subscribe } = wp.data;



import apiFetch from '@wordpress/api-fetch';
import {
  BlockContextProvider,
  __experimentalUseBlockPreview as useBlockPreview,
  useInnerBlocksProps,

} from '@wordpress/block-editor';
const { parse } = wp.blockSerializationDefaultParser;
const { RawHTML } = wp.element;
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

import { createElement, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, Spinner } from '@wordpress/components'
import { InspectorControls, BlockControls, AlignmentToolbar, RichText } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';

import { __experimentalBoxControl as BoxControl } from '@wordpress/components';


import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

const ALLOWED_MEDIA_TYPES = ['image'];

//var el = element.createElement;

//////console.log(breakPoints);

import breakPoints from '../../breakpoints'
import queryPrams from '../../queryprams'

//////console.log(queryPrams);

var queryPramsX = queryPrams.map((x, i) => {

  return { value: i, label: x.label }
})





// wp.apiFetch({ path: '/wp/v2/categories?per_page=100' })
//     .then(terms => //console.log(terms));






////console.log(queryPramsX);


const CustomCss = styled.div`
display: grid;
grid-template-columns: ${(props) => { return props.cssData.grid.gridTemplateColumns.map((item) => { return item.val + item.unit + ' ' }) }};
grid-template-rows: ${(props) => { return props.cssData.grid.gridTemplateRows.map((item) => { return item.val + item.unit + ' ' }) }};
column-gap: ${(props) => { return props.cssData.grid.colGap.val + props.cssData.grid.colGap.unit }};
row-gap: ${(props) => { return props.cssData.grid.rowGap.val + props.cssData.grid.rowGap.unit }};

`;

// const CustomCss = styled.div`

// `;



const CustomCssItem = styled.div`

`;


const ContainerCss = styled.div`
padding: ${(props) => { return props.cssData.container.padding.val + props.cssData.container.padding.unit }};
margin: ${(props) => { return props.cssData.container.margin.val + props.cssData.container.margin.unit }};
background-color: ${(props) => { return props.cssData.container.bgColor }};
background-image: ${(props) => { return 'url(' + props.cssData.container.bgImg.url + ')' }};
`;











registerBlockType("prefix-blocks/section-2-cols", {
  title: "Section 2 Column Item List",
  icon: "grid-view",
  attributes: {


    section: {
      type: 'object',
      default: {
        class: 'container mx-auto', margin: '', bgColor: '', bgImg: ''
      },
    },

    container: {
      type: 'object',
      default: { class: '', padding: '', margin: '', bgColor: '', bgImg: '' },
    },

    gridWrap: {
      type: 'object',
      default: { class: '', padding: '', margin: '', bgColor: '', bgImg: '' },
    },


    heading: {
      type: 'object',
      default: { text: 'Build Beautiful Archive Pages', class: '', padding: '', margin: '', bgColor: '', bgImg: '' },
    },

    subHeading: {
      type: 'object',
      default: {
        text: 'Featuring the Archive Builder addon, a tool that allows non-techies to create technically tasteful archive pages without any specialized skills!', class: '', padding: '', margin: '', bgColor: '', bgImg: ''
      },
    },

    thumbnail: {
      type: 'object',
      default: { class: '', padding: '', src: 'https://www.wpxpo.com/wp-content/uploads/2021/11/archive-builder-img.png', id: '', margin: '', bgColor: '', bgImg: '' },
    },


    list: {
      type: 'object',
      default: {
        bgColor: '', color: '', padding: '', margin: '', itemClass: '',
        items: [
          { class: '', title: 'Author Pages', descriptions: '', icon: { src: '', id: '', }, },
          { class: '', title: 'Category Pages', descriptions: '', icon: { src: '', id: '', }, },
          { class: '', title: 'Date Pages', descriptions: '', icon: { src: '', id: '', }, },
          { class: '', title: 'Search Pages', descriptions: '', icon: { src: '', id: '', }, },
          { class: '', title: 'Post Tag Pages', descriptions: '', icon: { src: '', id: '', }, },
          { class: '', title: 'Theme Pages', descriptions: '', icon: { src: '', id: '', }, },


        ],

        class: '', padding: '', src: 'https://www.wpxpo.com/wp-content/uploads/2021/11/archive-builder-img.png', id: '', margin: '', bgColor: '', bgImg: ''
      },
    },




    buttons: {
      type: 'array',
      default: [

        { class: 'px-4 py-2 mx-5', padding: '', text: 'Explore Details', url: '', margin: '', color: '', bgColor: '', },
        { class: 'px-4 py-2 mx-5', padding: '', text: 'Explore Details', url: '', margin: '', color: '', bgColor: '', }

      ],
    },



  },
  category: "post-grid",
  edit: function (props) {


    const blockProps = useBlockProps();

    var attributes = props.attributes;
    var setAttributes = props.setAttributes;

    var section = attributes.section;
    var container = attributes.container;
    var heading = attributes.heading;
    var subHeading = attributes.subHeading;
    var thumbnail = attributes.thumbnail;
    var list = attributes.list;
    var buttons = attributes.buttons;



    //console.log(blockProps);




    const [values, setValues] = useState();







    return (
      [


        <div>
          <InspectorControls key="general">

            <div className='blockxyz'>

              <PanelBody title="Section" initialOpen={false}>

                <PanelRow>
                  <label for="">Class</label>

                  <InputControl
                    value={section.class}
                    onChange={(newVal) => setAttributes({ section: { class: newVal, bgColor: section.bgColor, bgImg: section.bgImg } })}
                  />

                </PanelRow>


              </PanelBody>



            </div>

          </InspectorControls >
        </div >
        ,


        <section className="sm:my-20 my-10">

          {JSON.stringify(section)}

          <div className='container mx-auto sm:px-4 px-3'>
            <div className='grid grid-cols-12'>
              <div className='col-span-6'>
                <h2>{heading.text}</h2>
                <p>{subHeading.text}</p>

                <ul>

                  {list.items.map(x => {

                    return (
                      <li>{x.title}</li>
                    )

                  })}

                </ul>
              </div>
              <div className='col-span-6'>

                <img src={thumbnail.src} />

              </div>
            </div>

            <div>

              {buttons.map(x => {

                return (

                  <a href={x.url}>{x.text}</a>

                )

              })}

            </div>


          </div>






        </section>
      ]




    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})