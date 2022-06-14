import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

import styled from 'styled-components'
import Masonry from 'masonry-layout'
//var Masonry = require('masonry-layout');


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
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl } from '@wordpress/components'
import { InspectorControls, BlockControls, AlignmentToolbar, RichText } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';

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






registerBlockType("prefix-blocks/post-grid", {
  title: "Post Grid",
  icon: "grid-view",
  attributes: {

    viewType: {
      type: 'string',
      default: 'grid' // filterable, carousel
    },
    lazyLoad: {
      type: 'object',
      default: { enable: 'no', srcUrl: '', srcId: '' },
    },
    pagination: {
      type: 'object',
      default: { type: '', maxPageNum: '', prevText: '', nextText: '', fontSize: '', textColor: '', hoverColor: '', bgColor: '', bgActiveColor: '', loadMoreText: 'Load More', loadingIcon: '', },
    },
    search: {
      type: 'object',
      default: { enable: 'no', type: '', placeholder: '', icon: '', busyIcon: '' },
    },
    container: {
      type: 'object',
      default: { padding: { val: '10', unit: 'px' }, margin: { val: '10', unit: 'px' }, bgColor: '', bgImg: { id: '', url: '' } },
    },
    itemContainer: {
      type: 'object',
      default: { height: '', bgColor: '', bgImg: '', margin: '', padding: '', },
    },
    grid: {
      type: 'object',
      default: { gridTemplateColumns: [{ val: 1, unit: 'fr' }, { val: 1, unit: 'fr' }, { val: 1, unit: 'fr' }], gridTemplateRows: [{ val: 1, unit: 'fr' }, { val: 1, unit: 'fr' }], colGap: { val: 1, unit: 'em' }, rowGap: { val: 1, unit: 'em' }, padding: { val: 1, unit: 'em' }, },
    },


    filterable: {
      type: 'object',
      default: { filters: [{ groupTitle: '', type: '', logic: '', showPostCount: '', items: [] }], allText: 'All', showSort: '', activeFilter: '', textColor: '', bgColor: '', activeBgColor: '', padding: { val: '', unit: '' }, margin: { val: '', unit: '' }, },
    },

    carousel: {
      type: 'object',
      default: {
        type: '',
        role: '',
        label: '',
        labelledby: '',
        rewind: '',
        speed: '',
        rewindSpeed: '',
        rewindByDrag: '',
        width: '',
        height: '',
        fixedWidth: '',
        fixedHeight: '',
        autoWidth: '',
        heightRatio: '',
        autoHeight: '',
        start: '',
        perPage: '',
        perMove: '',
        focus: '',
        clones: '',
        cloneStatus: '',
        gap: '',
        padding: '',
        arrows: '',
        pagination: '',
        paginationKeyboard: '',
        paginationDirection: '',
        easing: '',
        drag: '',
        snap: '',
        noDrag: '',
        dragMinThreshold: '',
        flickPower: '',
        flickMaxPages: '',
        waitForTransition: '',
        arrowPath: '',
        autoplay: '',
        interval: '',
        pauseOnHover: '',
        pauseOnFocus: '',
        resetProgress: '',
        lazyLoad: '',
        preloadPages: '',
        keyboard: '',
        wheel: '',
        wheelMinThreshold: '',
        wheelSleep: '',
        releaseWheel: '',
        direction: '',
        mediaQuery: '',
        breakpoints: '',



      },
    },


    layout: {
      type: 'object',
      default: { id: '', data: {}, rawData: '', loading: false, keyword: '', category: '', categories: [] },
    },
    layoutList: {
      type: 'array',
      default: [],
    },

    postTypes: {
      type: 'array',
      default: [],
    },

    masonry: {
      type: 'object',
      default: { enable: 'no', },
    },
    scripts: {
      type: 'object',
      default: { js: '', css: '' },
    },
    posts: {
      type: 'object',
      default: { items: [] },
    },
    queryArgs: {
      type: 'object',
      default: {
        items: [
          { val: ['post', 'product'], multiple: false, id: 'postType', label: 'Post Types', description: "Select Post Types to Query" },
          { val: [], multiple: false, id: 'postStatus', label: 'Post status', description: "Query post by post status" },
          { val: '', multiple: false, id: 'order', label: 'Order', description: "Post query order" },
          { val: [], multiple: false, id: 'orderby', label: 'Orderby', description: "Post query orderby" },

        ]
      },
    },

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
  category: "post-grid",
  edit: function (props) {


    const blockProps = useBlockProps();

    var attributes = props.attributes;
    var setAttributes = props.setAttributes;

    var dummyName = attributes.dummyName;
    var viewType = attributes.viewType;
    var lazyLoad = attributes.lazyLoad;
    var container = attributes.container;
    var pagination = attributes.pagination;
    var masonry = attributes.masonry;
    var search = attributes.search;
    var grid = attributes.grid;
    var layout = attributes.layout;
    var queryArgs = attributes.queryArgs;
    var layoutList = attributes.layoutList;
    var posts = attributes.posts;
    var filterable = attributes.filterable;

    //console.log(blockProps);




    // apiFetch({
    //     path: '/wp/v2/posts/',
    //     method: 'POST',
    //     data: { title: 'Categories' },
    // }).then((res) => {
    //     //console.log(res);

    // });



    //////console.log(queryArgs);

    var filterablTermsResults = [];

    const colors = [
      { name: 'red', color: '#f00' },
      { name: 'white', color: '#fff' },
      { name: 'blue', color: '#00f' },
    ];

    var postTypes = [];

    const postTypesData = useSelect(
      (select) => select(coreStore).getPostTypes({ per_page: -1 }), []
    );


    (
      postTypesData !== null && postTypesData.map(x => {

        postTypes.push({ value: x.slug, label: x.name })

      })
    )







    const TEMPLATE = [
      ['core/post-title'],
      ['core/post-date'],
      ['core/post-excerpt'],
    ];


    //////console.log(postTypes);
    //setAttributes({ dummyName: 'Raju' });
    function PostTemplateInnerBlocks() {
      const innerBlocksProps = useInnerBlocksProps(
        { className: 'wp-block-post' },
        { template: TEMPLATE }
      );
      return <div {...innerBlocksProps} ></div>;
    }

    function PostTemplateBlockPreview({
      blocks,
      blockContextId,
      isHidden,
      setActiveBlockContextId,
    }) {
      const blockPreviewProps = useBlockPreview({
        blocks,
        props: {
          className: 'wp-block-post',
        },
      });

      const handleOnClick = () => {
        setActiveBlockContextId(blockContextId);
      };



      return (
        <li
          {...blockPreviewProps}
          tabIndex={0}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
          role="button"

        />
      );
    }

    const MemoizedPostTemplateBlockPreview = memo(PostTemplateBlockPreview);

    function updateViewType(val) {
      setAttributes({ viewType: val });
    }

    function updateLazyLoadEnable(val) {
      setAttributes({ lazyLoad: { enable: val, srcUrl: lazyLoad.srcUrl, srcId: lazyLoad.srcId } });
    }




    function enableMasonry(val) {

      //console.log(Masonry)

      const grid = document.querySelector('.masonry-grid')
      console.log(grid)



      const msnry = new Masonry(grid, {
        itemSelector: '.item',
        columnWidth: 280,
        gutter: 10,
        transitionDuration: 0,
        initLayout: false
      })

      msnry.once('layoutComplete', () => {
        grid.classList.add('load')
      })

      msnry.layout()



    }




    function updateLazyLoadsrcUrl(url, id) {
      setAttributes({ lazyLoad: { enable: lazyLoad.enable, srcUrl: url, srcId: id } });
    }

    function fetchPosts() {


      var arg = queryArgs.items.map(item => {

        return { id: item.id, val: item.val }


      })

      //console.log(arg);

      console.log(props.attributes.layout);


      apiFetch({
        path: '/blockxyz/v2/get_posts_layout',
        method: 'POST',
        data: { queryArgs: arg, rawData: layout.rawData },
      }).then((res) => {
        console.log(res);
        setAttributes({ posts: { items: res } });

      });


      // wp.apiFetch({ path: '/wp/v2/post_grid_layout?per_page=100' })
      //     .then(items => {
      //         setAttributes({ layoutList: items });
      //     });
    }


    function generateLayout(x, i) {

      var savedBlocks = layout.data;

      var content = "<!-- wp:paragraph --><p>paragraph one</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>then two</p><!-- /wp:paragraph -->";

      // Parse the serialized content into valid blocks using parse from @wordpress/block-serialization-default-parser
      var blocks = (savedBlocks.length > 0) ? savedBlocks : parse(content);

      //console.log(x);


      var sss = blocks.map((block, i) => {

        if (block.blockName !== null) {

          return (
            <RawHTML>
              {
                (block.innerBlocks.length > 0) ? recursInnerBlocksHtml(block.innerBlocks, i) : block.innerHTML
              }
            </RawHTML>
          )
        }



      })


      return (
        <div className='bg-gray-400 p-3 '>

          {x.post_title}
          {sss}
        </div>
      )
    }
    function recursInnerBlocksHtml(blocks, index = 0) {





      var xx = blocks.map((block, i) => {
        //console.log(block);

        return (
          <RawHTML>2nd Block
            {
              (block.innerBlocks.length > 0) ? block.innerHTML + recursInnerBlocksHtml(block.innerBlocks, i) : block.innerHTML
            }
          </RawHTML>)

      })


      return xx;






    }

    useEffect(() => {
      //console.log('Listening: ', layout);
      fetchPosts();



    }, [layout]);


    function selectLayout(id, post_content) {

      var blocks = parse(post_content);

      // console.log(post_content);

      // console.log(layout);

      setAttributes({ layout: { id: id, data: blocks, rawData: post_content, loading: false, keyword: layout.keyword, category: layout.category, categories: layout.categories } })


      //console.log(wp.data.select('core/block-editor').getBlocks());




      //wp.data.dispatch('core/block-editor').insertBlocks(wp.blocks.parse(post_content));


      //wp.data.dispatch('core/notices').createNotice('success', 'Here is our notice!');

      // var content = "<!-- wp:paragraph --><p>paragraph one</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>then two</p><!-- /wp:paragraph -->";

      // Parse the serialized content into valid blocks using parse from @wordpress/block-serialization-default-parser
      //var blocks = parse(content);

      //console.log(blocks)





    }

    const [filterablTerms, setFilterablTerms] = useState([]); // Using the hook.


    function fetchPostTypeTerms(keyword) {

      var postTypes = [];


      setFilterablTerms([]);


      queryArgs.items.map(x => {

        if (x.id == 'postType') {
          postTypes.push(x.val)
        }
      })

      console.log(postTypes);

      var sss = apiFetch({
        path: '/blockxyz/v2/post_type_objects',
        method: 'POST',
        data: { postTypes: postTypes[0], search: keyword },
      }).then((result) => {
        setFilterablTerms(result);

        //return result;

        //console.log(filterablTermsResults);
      });





    }












    function fetchLayouts() {


      fetchPosts()


      setAttributes({ layout: { id: layout.id, data: layout.data, rawData: layout.rawData, loading: true, keyword: layout.keyword, category: layout.category, categories: layout.categories } })

      // wp.apiFetch({ path: '/blockxyz/v2/get_posts' })
      //     .then(items => {

      //         //console.log(items);
      //     });


      var args = [{ id: 'postType', val: ['post_grid_layout'] }];


      //console.log(args);

      apiFetch({
        path: '/blockxyz/v2/get_posts_layout',
        method: 'POST',
        data: { queryArgs: args },
      }).then((res) => {

        console.log(res);

        setAttributes({ layoutList: res });
        setAttributes({ layout: { id: layout.id, data: layout.data, rawData: layout.rawData, loading: false, keyword: layout.keyword, category: layout.category, categories: layout.categories } })

      });


      // wp.apiFetch({ path: '/wp/v2/post_grid_layout?per_page=100' })
      //     .then(items => {
      //         setAttributes({ layoutList: items });
      //     });
    }


    function generateQueryFieldAuthorIn(xx) {

      ////console.log(typeof xx);

      var xxts = [12, 24, 32];


      var xxt = [1, 2, 3].concat(xxts);


      return (
        xxt.map((x) => {
          return (
            <div>{x}</div>
          )
        })
      )








    }

    function updateName(content) {

      setAttributes({ dummyName: content });

    }


    function removeQueryPram(i) {


      queryArgs.items.splice(i, 1);



      setAttributes({ queryArgs: { items: queryArgs.items } });

    }


    function updateQueryPram(newVal, index) {

      ////console.log(index);
      ////console.log(newVal);

      var itemData = queryArgs.items[index];


      itemData.val = newVal;
      queryArgs.items[index] = itemData;
      setAttributes({ queryArgs: { items: queryArgs.items } });


      console.log(queryArgs);
      fetchPosts();

      // if (itemData.id == 's' || itemData.id == 'order'  ) {
      //     itemData.val = newVal;
      //     queryArgs.items[index] = itemData;
      //     setAttributes({ queryArgs: { items: queryArgs.items } });

      // }

      // if (itemData.id == 'postType' || itemData.id == 'orderby' || itemData.id == 'postStatus') {
      //     itemData.val = newVal;
      //     queryArgs.items[index] = itemData;
      //     setAttributes({ queryArgs: { items: queryArgs.items } });

      // }



      //queryArgs.items.splice(i, 1);

      ////console.log(queryArgs);


    }



    function generateQueryArgOptions(item, index) {


      return (


        <div className=' '>

          <PanelBody title={item.label} initialOpen={false}>

            <PanelRow>
              <span
                onClick={(ev) => { removeQueryPram(index) }}
                className='cursor-pointer px-3 py-1 text-white bg-red-600 text-sm'><span className='dashicon dashicons dashicons-no-alt'></span> Delete</span>
            </PanelRow>





            {item.id == 'postType' && <div className={item.id == 'postType' ? '' : 'hidden'}>

              <SelectControl
                style={{ height: '75px' }}
                label=""
                multiple
                value={item.val}
                options={postTypes}
                onChange={(newVal) => updateQueryPram(newVal, index)}
              />


            </div>}


            {item.id == 'postStatus' &&
              <div className={item.id == 'postStatus' ? '' : 'hidden'}>

                <SelectControl
                  style={{ height: '75px' }}
                  label=""
                  multiple
                  value={item.val}
                  options={[
                    { label: 'Publish', value: 'publish' },
                    { label: 'Pending', value: 'pending' },
                    { label: 'Draft', value: 'draft' },
                    { label: 'Auto draft', value: 'auto-draft' },
                    { label: 'Future', value: 'future' },
                    { label: 'Private', value: 'private' },
                    { label: 'Inherit', value: 'inherit' },
                    { label: 'Trash', value: 'trash' },
                    { label: 'Any', value: 'any' },




                  ]}
                  onChange={(newVal) => updateQueryPram(newVal, index)}
                />


              </div>}



            {item.id == 'order' &&
              <div className={item.id == 'order' ? '' : 'hidden'}>

                <SelectControl
                  style={{ margin: 0 }}
                  label=""

                  value={item.val}
                  options={[
                    { label: 'Ascending', value: 'ASC' },
                    { label: 'Descending', value: 'DESC' },

                  ]}
                  onChange={(newVal) => updateQueryPram(newVal, index)}
                />

              </div>}
            {item.id == 'orderby' &&

              <div className={item.id == 'orderby' ? '' : 'hidden'}>

                <SelectControl
                  style={{ height: '75px' }}
                  label=""
                  multiple
                  value={item.val}
                  options={[
                    { label: 'None', value: 'none' },
                    { label: 'ID', value: 'ID' },
                    { label: 'author', value: 'author' },
                    { label: 'title', value: 'title' },
                    { label: 'name', value: 'name' },

                    { label: 'type', value: 'type' },
                    { label: 'date', value: 'date' },
                    { label: 'modified', value: 'modified' },
                    { label: 'parent', value: 'parent' },
                    { label: 'rand', value: 'rand' },
                    { label: 'comment_count', value: 'comment_count' },
                    { label: 'relevance', value: 'relevance' },
                    { label: 'menu_order', value: 'menu_order' },
                    { label: 'meta_value', value: 'meta_value' },
                    { label: 'meta_value_num', value: 'meta_value_num' },
                    { label: 'post__in', value: 'post__in' },
                    { label: 'post_name__in', value: 'post_name__in' },
                    { label: 'post_parent__in', value: 'post_parent__in' },


                  ]}
                  onChange={(newVal) => updateQueryPram(newVal, index)}
                />

              </div>}
            {item.id == 'taxQueryRelation' &&
              <div className={item.id == 'taxQueryRelation' ? '' : 'hidden'}>


                <SelectControl
                  style={{ margin: 0 }}
                  label=""
                  value={item.val}
                  options={[
                    { label: 'OR', value: 'OR' },
                    { label: 'AND', value: 'AND' },

                  ]}
                  onChange={(newVal) => updateQueryPram(newVal, index)}
                />

              </div>}




            {item.id == 'metaQuery' &&
              <div>
                <div
                  className='cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-blue-600 text-sm'
                  onClick={(ev) => {
                    var itemData = queryArgs.items[index];
                    var xx = itemData.val.concat({ fields: [{ key: '', value: '', type: '', compare: '' }], relation: 'OR' });
                    queryArgs.items[index].val = xx;
                    setAttributes({ queryArgs: { items: queryArgs.items } });
                  }}

                >Add</div>
                {
                  item.val.map((x, j) => {
                    return (
                      <div>
                        <PanelBody title="Meta Field" initialOpen={false}>

                          <div
                            className='cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-red-600 text-sm'
                            onClick={(ev) => {

                              var itemData = queryArgs.items[index];
                              var xx = itemData.val.splice(j, 1);
                              queryArgs.items[index].val = itemData.val;
                              setAttributes({ queryArgs: { items: queryArgs.items } });
                            }}

                          >Remove</div>


                          <PanelRow>
                            <div>Relation</div>
                            <SelectControl
                              style={{ margin: 0 }}
                              label=""
                              value={x.relation}
                              options={[
                                { label: 'OR', value: 'OR' },
                                { label: 'AND', value: 'AND' },
                              ]}
                              onChange={(newVal) => {
                                var itemData = queryArgs.items[index];

                                //itemData.val.relation = newVal;
                                itemData.val[j].relation = newVal;

                                //var term = itemData.val[j].fields[k]
                                //term.taxonomy = newVal;
                                //console.log(itemData.val[j].relation);

                                //console.log(newVal);
                                //console.log(j);

                                queryArgs.items[index].val = itemData.val;
                                setAttributes({ queryArgs: { items: queryArgs.items } });
                              }}
                            />
                          </PanelRow>
                          {x.fields.map((y, k) => {
                            return (

                              <div className='border-b border-solid border-gray-300 py-3'>

                                <InputControl
                                  label="Custom field key"
                                  value={y.key}
                                  placeholder="meta_key"
                                  onChange={(newVal) => {
                                    var itemData = queryArgs.items[index];


                                    var term = itemData.val[j].fields[k]
                                    term.key = newVal;

                                    queryArgs.items[index].val = itemData.val;
                                    setAttributes({ queryArgs: { items: queryArgs.items } });
                                  }}
                                />

                                <InputControl
                                  label="Meta Value "
                                  value={y.value}
                                  placeholder="25"
                                  onChange={(newVal) => {
                                    var itemData = queryArgs.items[index];


                                    var term = itemData.val[j].fields[k]
                                    term.value = newVal;

                                    queryArgs.items[index].val = itemData.val;
                                    setAttributes({ queryArgs: { items: queryArgs.items } });
                                  }}
                                />

                                <PanelRow>
                                  <SelectControl
                                    style={{ margin: 0 }}
                                    label="Custom field type"
                                    value={y.type}
                                    options={[
                                      { label: 'NUMERIC', value: 'NUMERIC' },
                                      { label: 'BINARY', value: 'BINARY' },
                                      { label: 'CHAR', value: 'CHAR' },
                                      { label: 'DATE', value: 'DATE' },
                                      { label: 'DATETIME', value: 'DATETIME' },
                                      { label: 'DECIMAL', value: 'DECIMAL' },
                                      { label: 'SIGNED', value: 'SIGNED' },
                                      { label: 'TIME', value: 'TIME' },
                                      { label: 'UNSIGNED', value: 'UNSIGNED' },


                                    ]}
                                    onChange={(newVal) => {
                                      var itemData = queryArgs.items[index];


                                      var term = itemData.val[j].fields[k]
                                      term.type = newVal;

                                      queryArgs.items[index].val = itemData.val;
                                      setAttributes({ queryArgs: { items: queryArgs.items } });
                                    }}

                                  />
                                  <SelectControl
                                    style={{ margin: 0 }}
                                    label="compare "
                                    value={y.compare}
                                    options={[
                                      { label: 'IN', value: 'IN' },
                                      { label: 'NOT IN', value: 'NOT IN' },
                                      { label: 'AND', value: 'AND' },
                                      { label: 'EXISTS', value: 'EXISTS' },
                                      { label: 'NOT EXISTS', value: 'NOT EXISTS' },
                                    ]}
                                    onChange={(newVal) => {
                                      var itemData = queryArgs.items[index];


                                      var term = itemData.val[j].fields[k]
                                      term.compare = newVal;

                                      queryArgs.items[index].val = itemData.val;
                                      setAttributes({ queryArgs: { items: queryArgs.items } });
                                    }}
                                  />
                                </PanelRow>
                              </div>
                            )
                          })}
                          <div
                            className='cursor-pointer text-center px-3 py-1 text-white bg-blue-600 text-sm'
                            onClick={(ev) => {

                              var itemData = queryArgs.items[index];

                              var xx = itemData.val[j].fields.concat({ key: '', value: '', type: '', compare: '' });
                              queryArgs.items[index].val[j].fields = xx;

                              setAttributes({ queryArgs: { items: queryArgs.items } });
                            }}
                          >Add</div>
                        </PanelBody>
                      </div>
                    )

                  })
                }

              </div>
            }


            {item.id == 'taxQuery' &&
              <div>
                <div
                  className='cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-blue-600 text-sm'
                  onClick={(ev) => {
                    var itemData = queryArgs.items[index];
                    var xx = itemData.val.concat({ terms: [{ taxonomy: '', field: '', terms: '', operator: '' }], relation: 'OR' });
                    queryArgs.items[index].val = xx;
                    setAttributes({ queryArgs: { items: queryArgs.items } });
                  }}

                >Add</div>
                {
                  item.val.map((x, j) => {
                    return (
                      <div>
                        <PanelBody title="Term" initialOpen={false}>

                          <div
                            className='cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-red-600 text-sm'
                            onClick={(ev) => {

                              var itemData = queryArgs.items[index];
                              var xx = itemData.val.splice(j, 1);
                              queryArgs.items[index].val = itemData.val;
                              setAttributes({ queryArgs: { items: queryArgs.items } });
                            }}

                          >Remove</div>


                          <PanelRow>
                            <div>Terms Relation</div>
                            <SelectControl
                              style={{ margin: 0 }}
                              label=""
                              value={x.relation}
                              options={[
                                { label: 'OR', value: 'OR' },
                                { label: 'AND', value: 'AND' },
                              ]}
                              onChange={(newVal) => {
                                var itemData = queryArgs.items[index];

                                //itemData.val.relation = newVal;
                                itemData.val[j].relation = newVal;

                                //var term = itemData.val[j].terms[k]
                                //term.taxonomy = newVal;
                                //console.log(itemData.val[j].relation);

                                //console.log(newVal);
                                //console.log(j);

                                queryArgs.items[index].val = itemData.val;
                                setAttributes({ queryArgs: { items: queryArgs.items } });
                              }}
                            />
                          </PanelRow>
                          {x.terms.map((y, k) => {
                            return (

                              <div className='border-b border-solid border-gray-300 py-3'>

                                <InputControl
                                  label="Taxonomy"
                                  value={y.taxonomy}
                                  placeholder="Taxonomy"
                                  onChange={(newVal) => {
                                    var itemData = queryArgs.items[index];


                                    var term = itemData.val[j].terms[k]
                                    term.taxonomy = newVal;

                                    queryArgs.items[index].val = itemData.val;
                                    setAttributes({ queryArgs: { items: queryArgs.items } });
                                  }}
                                />

                                <InputControl
                                  label="Terms"
                                  value={y.terms}
                                  placeholder="Comma separated"
                                  onChange={(newVal) => {
                                    var itemData = queryArgs.items[index];


                                    var term = itemData.val[j].terms[k]
                                    term.terms = newVal;

                                    queryArgs.items[index].val = itemData.val;
                                    setAttributes({ queryArgs: { items: queryArgs.items } });
                                  }}
                                />

                                <PanelRow>
                                  <SelectControl
                                    style={{ margin: 0 }}
                                    label="Fields"
                                    value={y.field}
                                    options={[
                                      { label: 'Term ID', value: 'term_id' },
                                      { label: 'Name', value: 'name' },
                                      { label: 'Slug', value: 'slug' },
                                      { label: 'Term taxonomy id', value: 'term_taxonomy_id' },

                                    ]}
                                    onChange={(newVal) => {
                                      var itemData = queryArgs.items[index];


                                      var term = itemData.val[j].terms[k]
                                      term.field = newVal;

                                      queryArgs.items[index].val = itemData.val;
                                      setAttributes({ queryArgs: { items: queryArgs.items } });
                                    }}

                                  />
                                  <SelectControl
                                    style={{ margin: 0 }}
                                    label="Operator"
                                    value={y.operator}
                                    options={[
                                      { label: 'IN', value: 'IN' },
                                      { label: 'NOT IN', value: 'NOT IN' },
                                      { label: 'AND', value: 'AND' },
                                      { label: 'EXISTS', value: 'EXISTS' },
                                      { label: 'NOT EXISTS', value: 'NOT EXISTS' },
                                    ]}
                                    onChange={(newVal) => {
                                      var itemData = queryArgs.items[index];


                                      var term = itemData.val[j].terms[k]
                                      term.operator = newVal;

                                      queryArgs.items[index].val = itemData.val;
                                      setAttributes({ queryArgs: { items: queryArgs.items } });
                                    }}
                                  />
                                </PanelRow>
                              </div>
                            )
                          })}
                          <div
                            className='cursor-pointer text-center px-3 py-1 text-white bg-blue-600 text-sm'
                            onClick={(ev) => {

                              var itemData = queryArgs.items[index];

                              var xx = itemData.val[j].terms.concat({ taxonomy: '', field: '', terms: '', operator: '' });
                              queryArgs.items[index].val[j].terms = xx;

                              setAttributes({ queryArgs: { items: queryArgs.items } });
                            }}
                          >Add</div>
                        </PanelBody>
                      </div>
                    )

                  })
                }

              </div>
            }





            {(item.id == 'metaKey' || item.id == 's' || item.id == 'metaValue' || item.id == 'metaValueNum' || item.id == 'metaCompare' || item.id == 'year' || item.id == 'monthnum' || item.id == 'w' || item.id == 'day' || item.id == 'hour' || item.id == 'minute' || item.id == 'second' || item.id == 'm' || item.id == 'author' || item.id == 'authorName' || item.id == 'tag' || item.id == 'tagId' || item.id == 'cat' || item.id == 'categoryName' || item.id == 'p' || item.id == 'name' || item.id == 'pageId' || item.id == 'pagename' || item.id == 'postParent' || item.id == 'postPassword' || item.id == 'postsPerPage' || item.id == 'paged' || item.id == 'offset' || item.id == 'postsPerArchivePage' || item.id == 'perm') &&

              <div >
                <InputControl
                  value={item.val}
                  onChange={(newVal) => updateQueryPram(newVal, index)}
                />


              </div>

            }
            {item.id == 'authorIn' &&
              <div className={item.id == 'authorIn' ? '' : 'hidden'}>


                {JSON.stringify(item.val)}

                {

                  generateQueryFieldAuthorIn(item)

                }

              </div>
            }





            {(item.id == 'postNameIn' || item.id == 'postNotIn' || item.id == 'postIn' || item.id == 'postParentNotIn' || item.id == 'tagNotIn' || item.id == 'tagAnd' || item.id == 'tagIn' || item.id == 'postParentIn' || item.id == 'tagSlugIn' || item.id == 'tagSlugAnd' || item.id == 'categoryNotIn' || item.id == 'categoryIn' || item.id == 'categoryAnd') &&

              <div >
                <InputControl
                  value={item.val}
                  placeholder="Comma separated"
                  onChange={(newVal) => updateQueryPram(newVal, index)}
                />


              </div>

            }

            <div className={item.id == 'postNameIndd' ? '' : 'hidden'}>
              {JSON.stringify(item.val)}
              <div
                className='cursor-pointer text-center px-3 py-1 text-white bg-blue-600 text-sm'
                onClick={(ev) => {

                  var itemData = queryArgs.items[index];

                  var val = itemData.val.concat({ slug: '' });
                  itemData.val = val;
                  queryArgs.items[index] = itemData;
                  setAttributes({ queryArgs: { items: queryArgs.items } });
                }}
              >Add</div>


            </div>

            {item.id == 'commentCount' &&
              <div >

                <InputControl
                  value={item.val.value}
                  placeholder="Comment Count, Ex: 25"
                  onChange={(newVal) => updateQueryPram({ value: newVal, compare: item.val.compare }, index)}
                />

                <SelectControl
                  style={{ margin: 0 }}
                  label=""

                  value={item.val.compare}
                  options={[
                    { label: '=', value: '=' },
                    { label: '!=', value: '!=' },
                    { label: '>', value: '>' },
                    { label: '>=', value: '>=' },
                    { label: '<', value: '<' },
                    { label: '<=', value: '<=' },
                  ]}
                  onChange={(newVal) => updateQueryPram({ value: item.val.value, compare: newVal }, index)}
                />

              </div>
            }


            {item.id == 'postMimeType' &&
              <div >


                <SelectControl
                  style={{ margin: 0 }}
                  label=""
                  multiple
                  value={item.val}
                  options={[
                    { label: 'image/jpeg', value: 'jpg|jpeg|jpe' },
                    { label: 'image/gif', value: 'gif' },
                    { label: 'image/png', value: 'png' },
                    { label: 'image/bmp', value: 'bmp' },


                  ]}
                  onChange={(newVal) => updateQueryPram(newVal, index)}
                />

              </div>}
            {(item.id == 'cacheResults' || item.id == 'nopaging' || item.id == 'hasPassword' || item.id == 'ignoreStickyPosts' || item.id == 'updatePostMetaCache' || item.id == 'updatePostTermCache') &&
              <div >
                <SelectControl
                  style={{ margin: 0 }}
                  label=""

                  value={item.val}
                  options={[
                    { label: 'True', value: true },
                    { label: 'False', value: false },

                  ]}
                  onChange={(newVal) => updateQueryPram(newVal, index)}
                />
              </div>
            }










            <p>{item.description}</p>



          </PanelBody>



        </div>


      )

    }



    function addQueryPram(index) {


      // ////console.log(queryPrams);

      var attrExist = false;

      ////console.log(index);
      var data = queryPrams[index];
      var multiple = data.multiple;
      ////console.log(multiple);

      var isExist = queryArgs.items.map((item) => {
        //////console.log(item);

        if (item.id == index) {
          ////console.log(item);
          return true;
        }
      })

      ////console.log(isExist);



      var items = queryArgs.items.concat([data])
      setAttributes({ queryArgs: { items: items } });

    }

    function addGridColumn() {

      var gridTemplateColumns = grid.gridTemplateColumns.concat([{ val: 1, unit: 'fr' }])

      setAttributes({ grid: { gridTemplateColumns: gridTemplateColumns, gridTemplateRows: grid.gridTemplateRows, colGap: grid.colGap, rowGap: grid.rowGap, padding: grid.padding } });







    }




    function addGridRow() {

      var gridTemplateRows = grid.gridTemplateRows.concat([{ val: 1, unit: 'fr' }])

      setAttributes({ grid: { gridTemplateColumns: grid.gridTemplateColumns, gridTemplateRows: gridTemplateRows, colGap: grid.colGap, rowGap: grid.rowGap, padding: grid.padding } });

    }



    function deleteGridColumn(i) {


      grid.gridTemplateColumns.splice(i, 1)

      setAttributes({ grid: { gridTemplateColumns: grid.gridTemplateColumns, gridTemplateRows: grid.gridTemplateRows, colGap: grid.colGap, rowGap: grid.rowGap, padding: grid.padding, } })

    }

    function deleteGridRow(i) {


      grid.gridTemplateRows.splice(i, 1)

      setAttributes({ grid: { gridTemplateColumns: grid.gridTemplateColumns, gridTemplateRows: grid.gridTemplateRows, colGap: grid.colGap, rowGap: grid.rowGap, padding: grid.padding, } })

    }






    return (
      [


        <div>
          <InspectorControls key="general">

            <div className='blockxyz'>

              <div className='px-3'>
                <SelectControl
                  label="View Type"
                  value={viewType}
                  options={[
                    { label: 'Grid', value: 'grid' },
                    { label: 'Filterable', value: 'filterable' },
                    { label: 'Carousel', value: 'carousel' },
                    { label: 'Glossary', value: 'glossary' },
                  ]}
                  onChange={(newSize) => setAttributes({ viewType: newSize })}
                />
              </div>

              <PanelBody title="General" initialOpen={false}>

                <div className=''>
                  <div className='py-2 font-bold '>Container Options</div>

                  <PanelRow>
                    <label for="">Padding</label>
                    <InputControl
                      value={container.padding.val}
                      onChange={(newVal) => setAttributes({ container: { padding: { val: newVal, unit: container.padding.unit }, margin: container.margin, bgColor: container.bgColor, bgImg: container.bgImg } })}
                    />
                    <SelectControl
                      label=""
                      value={container.padding.unit}
                      options={[
                        { label: 'px', value: 'px' },
                        { label: 'em', value: 'em' },

                      ]}
                      onChange={(newVal) => setAttributes({ container: { padding: { val: container.padding.val, unit: newVal }, margin: container.margin, bgColor: container.bgColor, bgImg: container.bgImg } })}
                    />
                  </PanelRow>

                  <PanelRow>

                    <label for="">Margin</label>
                    <InputControl
                      value={container.margin.val}
                      onChange={(newVal) => setAttributes({ container: { padding: container.padding, margin: { val: newVal, unit: container.margin.unit }, bgColor: container.bgColor, bgImg: container.bgImg } })}
                    />

                    <SelectControl
                      label=""
                      value={container.margin.unit}
                      options={[
                        { label: 'px', value: 'px' },
                        { label: 'em', value: 'em' },

                      ]}
                      onChange={(newVal) => setAttributes({ container: { margin: { val: container.padding.val, unit: newVal }, padding: container.padding, bgColor: container.bgColor, bgImg: container.bgImg } })}
                    />

                  </PanelRow>




                  <label for="">Background Color</label>
                  {/* <ColorPicker
                                        color={container.bgColor}
                                        onChange={(newVal) => setAttributes({ container: { padding: container.padding, margin: container.margin, bgColor: newVal, bgImg: container.bgImg } })}

                                        enableAlpha
                                        defaultValue="#000"
                                    /> */}


                  <ColorPalette
                    color={container.bgColor}
                    colors={colors}
                    enableAlpha
                    onChange={(newVal) => setAttributes({ container: { padding: container.padding, margin: container.margin, bgColor: newVal, bgImg: container.bgImg } })}
                  />

                  <label for="">Background Image</label>
                  <img src={container.bgImg.url} alt="" />

                  <MediaUploadCheck>
                    <MediaUpload
                      onSelect={(media) => {
                        // media.id
                        setAttributes({ container: { padding: container.padding, margin: container.margin, bgColor: container.bgColor, bgImg: { id: media.id, url: media.url } } })
                      }


                      }
                      onClose={() => {
                        //////console.log('onClose')
                      }


                      }

                      allowedTypes={ALLOWED_MEDIA_TYPES}
                      value={container.bgImg}
                      render={({ open }) => (

                        <Button onClick={open}>Open Media Library</Button>


                      )}
                    />
                  </MediaUploadCheck>

                </div>







                {/* <RichText key="editable2" tagName="p" placeholder="Keep writing..." value={attributes.dummyName} onChange={updateName} >
                                </RichText> */}

              </PanelBody>



              <PanelBody title="Lazy load" initialOpen={false}>


                <div>
                  <SelectControl
                    label="Enable"
                    value={lazyLoad.enable}
                    options={[
                      { label: 'Yes', value: 'yes' },
                      { label: 'No', value: 'no' },
                    ]}
                    onChange={(newSize) => updateLazyLoadEnable(newSize)}
                  />
                </div>

                <label for="">Lazy Load Image</label>

                <img src={lazyLoad.srcUrl} alt="" />

                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={(media) => {
                      // media.id
                      //////console.log(media);
                      updateLazyLoadsrcUrl(media.url, media.id);
                      //updateLazyLoadsrcId(media.id);

                    }


                    }
                    onClose={() => {
                      //////console.log('onClose')
                    }


                    }

                    allowedTypes={ALLOWED_MEDIA_TYPES}
                    value={lazyLoad.srcId}
                    render={({ open }) => (

                      <Button onClick={open}>Open Media Library</Button>


                    )}
                  />
                </MediaUploadCheck>
              </PanelBody>


              <PanelBody title="Query Post" initialOpen={false}>



                <SelectControl
                  label=""
                  options={queryPramsX}
                  onChange={(newVal) => addQueryPram(newVal)}

                />




                {queryArgs.items.map((item, index) => {

                  //////console.log(item);
                  //////console.log(index);

                  return generateQueryArgOptions(item, index);

                })



                }






              </PanelBody>
              <PanelBody title="Layouts" initialOpen={false}>



                <PanelRow>
                  <InputControl
                    value={layout.keyword}
                    type="text"
                    placeholder="Search Here..."
                    onChange={(newVal) => {

                      setAttributes({ layout: { id: layout.id, data: layout.data, rawData: layout.rawData, loading: false, keyword: newVal, category: layout.category, categories: layout.categories } })

                      fetchLayouts();
                    }}

                  />
                  <SelectControl
                    style={{ margin: 0 }}
                    label=""
                    value={layout.category}
                    options={[
                      { label: 'fr', value: 'fr' },
                      { label: 'px', value: 'px' },
                      { label: '%', value: '%' },
                      { label: 'em', value: 'em' },




                    ]}
                    onChange={(newVal) => {
                      fetchLayouts();
                      setAttributes({ layout: { id: layout.id, data: layout.data, rawData: layout.rawData, loading: layout.loading, keyword: layout.keyword, category: newVal, categories: layout.categories } })
                    }}
                  />





                </PanelRow>



                {layout.loading == true && <div>Loading
                </div>}

                {layoutList.length > 0 && layoutList.map(x => {
                  return (
                    <div className='my-3  ' >

                      <div className='relative cursor-pointer' onClick={(ev) => {
                        selectLayout(x.post_id, x.post_content)



                      }}>
                        <img src={x.thumb_url} />

                        <div className='text-[16px] p-2 bg-blue-600 text-white bg-opacity-90 text-bold absolute bottom-0 w-full text-center' >{x.post_title}</div>
                      </div>


                      <div className='my-3'>
                        <span className='mx-2' >#{x.post_id}</span>




                        {x.sale_price > 0 &&
                          (
                            <span className='mx-2' >Price:
                              <del className='ml-2' >{x.price} </del>-<span className='' >{x.sale_price}USD </span>
                            </span>
                          )
                        }

                        {x.sale_price == 0 &&
                          (
                            <span className='mx-2' >Price:
                              <span className='' > {x.sale_price}USD</span>
                            </span>
                          )
                        }


                        <span title='Buy To Download' className={['text-white px-3 py-1 mx-2', x.is_pro ? ' bg-amber-400' : ' bg-blue-600'].join('')}>
                          {x.is_pro ? 'Buy Now' : 'Free'}
                        </span>

                      </div>

                    </div>
                  )
                })}


                <PanelRow>




                </PanelRow>


              </PanelBody>
              <PanelBody title="Grid Settings" initialOpen={false} className={(viewType == 'grid' || viewType == 'filterable' || viewType == 'glossary') ? '' : 'hidden'}>


                <Button className='mb-3' variant="secondary" onClick={enableMasonry} >Enable Masonry</Button>

                <Button className='mb-3' variant="secondary" onClick={addGridColumn} >Add Column</Button>



                {grid.gridTemplateColumns.map((item, index) => {
                  //////console.log(item);
                  //////console.log(index);

                  return (


                    <PanelRow>
                      <InputControl
                        value={item.val}
                        type="number"
                        onChange={(newVal) => setAttributes({ grid: { gridTemplateColumns: grid.gridTemplateColumns.map((x, i) => { return (index == i) ? { val: newVal, unit: x.unit } : x }), gridTemplateRows: grid.gridTemplateRows, colGap: grid.colGap, rowGap: grid.rowGap, padding: grid.padding, } })}

                      />
                      <SelectControl
                        style={{ margin: 0 }}
                        label=""
                        value={item.unit}
                        options={[
                          { label: 'fr', value: 'fr' },
                          { label: 'px', value: 'px' },
                          { label: '%', value: '%' },
                          { label: 'em', value: 'em' },




                        ]}
                        onChange={(newVal) => setAttributes({ grid: { gridTemplateColumns: grid.gridTemplateColumns.map((x, i) => { return (index == i) ? { val: x.val, unit: newVal } : x }), gridTemplateRows: grid.gridTemplateRows, colGap: grid.colGap, rowGap: grid.rowGap, padding: grid.padding, } })}
                      />



                      <Button icon="no-alt"
                        onClick={(ev) => { deleteGridColumn(index) }}

                      ></Button>

                    </PanelRow>


                  )
                })}




                <Button onClick={addGridRow} className='my-3' variant="secondary" >Add Row</Button>


                {grid.gridTemplateRows.map((item, index) => {
                  //////console.log(item);
                  //////console.log(index);

                  return (


                    <PanelRow>
                      <InputControl
                        value={item.val}
                        type="number"
                        onChange={(newVal) => setAttributes({ grid: { gridTemplateRows: grid.gridTemplateRows.map((x, i) => { return (index == i) ? { val: newVal, unit: x.unit } : x }), gridTemplateColumns: grid.gridTemplateColumns, colGap: grid.colGap, rowGap: grid.rowGap, padding: grid.padding, } })}

                      />
                      <SelectControl className='mb-0'
                        value={item.unit}
                        options={[
                          { label: 'fr', value: 'fr' },
                          { label: 'px', value: 'px' },
                          { label: '%', value: '%' },
                          { label: 'em', value: 'em' },




                        ]}
                        onChange={(newVal) => setAttributes({ grid: { gridTemplateRows: grid.gridTemplateRows.map((x, i) => { return (index == i) ? { val: x.val, unit: newVal } : x }), gridTemplateColumns: grid.gridTemplateColumns, colGap: grid.colGap, rowGap: grid.rowGap, padding: grid.padding, } })}
                      />
                      <Button icon="no-alt"
                        onClick={(ev) => { deleteGridRow(index) }}

                      ></Button>

                    </PanelRow>


                  )
                })}


                <label for="">Column Gap</label>

                <PanelRow>
                  <InputControl
                    value={grid.colGap.val}
                    type="number"
                    onChange={(newVal) => setAttributes({ grid: { gridTemplateRows: grid.gridTemplateRows, gridTemplateColumns: grid.gridTemplateColumns, colGap: { val: newVal, unit: grid.colGap.unit }, rowGap: grid.rowGap, padding: grid.padding, } })}

                  />
                  <SelectControl className='mb-0'
                    value={grid.colGap.unit}
                    options={[
                      { label: 'fr', value: 'fr' },
                      { label: 'px', value: 'px' },
                      { label: '%', value: '%' },
                      { label: 'em', value: 'em' },
                    ]}
                    onChange={(newVal) => setAttributes({ grid: { gridTemplateRows: grid.gridTemplateRows, gridTemplateColumns: grid.gridTemplateColumns, colGap: { val: grid.colGap.val, unit: newVal }, rowGap: grid.rowGap, padding: grid.padding, } })}
                  />


                </PanelRow>





                <label for="">Row Gap</label>

                <PanelRow>
                  <InputControl
                    value={grid.rowGap.val}
                    type="number"
                    onChange={(newVal) => setAttributes({ grid: { gridTemplateRows: grid.gridTemplateRows, gridTemplateColumns: grid.gridTemplateColumns, rowGap: { val: newVal, unit: grid.rowGap.unit }, colGap: grid.colGap, padding: grid.padding, } })}

                  />
                  <SelectControl className='mb-0'
                    value={grid.rowGap.unit}
                    options={[
                      { label: 'fr', value: 'fr' },
                      { label: 'px', value: 'px' },
                      { label: '%', value: '%' },
                      { label: 'em', value: 'em' },
                    ]}
                    onChange={(newVal) => setAttributes({ grid: { gridTemplateRows: grid.gridTemplateRows, gridTemplateColumns: grid.gridTemplateColumns, rowGap: { val: grid.rowGap.val, unit: newVal }, colGap: grid.colGap, padding: grid.padding, } })}
                  />


                </PanelRow>








              </PanelBody>

              <PanelBody title="Pagination" initialOpen={false} className={viewType == 'carousel' ? 'hidden' : ''}>

                <SelectControl
                  label="Enable"
                  value={pagination.type}
                  options={[
                    { label: 'None', value: 'none' },
                    { label: 'Normal Pagination', value: 'normal' },
                    { label: 'Ajax Pagination', value: 'ajax' },
                    { label: 'Next-Previous', value: 'next_previous' },
                    { label: 'Filterable Pagination', value: 'filterable' },
                    { label: 'Load More', value: 'loadmore' },
                    { label: 'Infinite Load', value: 'infinite' },



                  ]}
                  onChange={(newVal) => setAttributes({ pagination: { type: newVal, maxPageNum: pagination.maxPageNum, prevText: pagination.prevText, nextText: pagination.nextText, fontSize: pagination.fontSize, textColor: pagination.textColor, hoverColor: pagination.hoverColor, bgColor: pagination.bgColor, bgActiveColor: pagination.bgActiveColor, loadMoreText: pagination.loadMoreText, loadingIcon: pagination.loadingIcon, } })}
                />

                <label for="">Max Number of Pagination</label>
                <InputControl
                  value={pagination.maxPageNum}
                  onChange={(newVal) => setAttributes({ pagination: { type: pagination.type, maxPageNum: newVal, prevText: pagination.prevText, nextText: pagination.nextText, fontSize: pagination.fontSize, textColor: pagination.textColor, hoverColor: pagination.hoverColor, bgColor: pagination.bgColor, bgActiveColor: pagination.bgActiveColor, loadMoreText: pagination.loadMoreText, loadingIcon: pagination.loadingIcon, } })}
                />

                <label for="">Previous Text</label>

                <InputControl
                  value={pagination.prevText}
                  onChange={(newVal) => setAttributes({ pagination: { type: pagination.type, maxPageNum: pagination.maxPageNum, prevText: newVal, nextText: pagination.nextText, fontSize: pagination.fontSize, textColor: pagination.textColor, hoverColor: pagination.hoverColor, bgColor: pagination.bgColor, bgActiveColor: pagination.bgActiveColor, loadMoreText: pagination.loadMoreText, loadingIcon: pagination.loadingIcon, } })}
                />


                <label for="">Next Text</label>

                <InputControl
                  value={pagination.nextText}
                  onChange={(newVal) => setAttributes({ pagination: { type: pagination.type, maxPageNum: pagination.maxPageNum, prevText: pagination.prevText, nextText: newVal, fontSize: pagination.fontSize, textColor: pagination.textColor, hoverColor: pagination.hoverColor, bgColor: pagination.bgColor, bgActiveColor: pagination.bgActiveColor, loadMoreText: pagination.loadMoreText, loadingIcon: pagination.loadingIcon, } })}
                />

                <label for="">Font Size</label>

                <InputControl
                  value={pagination.fontSize}
                  onChange={(newVal) => setAttributes({ pagination: { type: pagination.type, maxPageNum: pagination.maxPageNum, prevText: pagination.prevText, nextText: pagination.nextText, fontSize: newVal, textColor: pagination.textColor, hoverColor: pagination.hoverColor, bgColor: pagination.bgColor, bgActiveColor: pagination.bgActiveColor, loadMoreText: pagination.loadMoreText, loadingIcon: pagination.loadingIcon, } })}
                />


                <label for="">Text Color</label>

                <ColorPalette
                  color={pagination.textColor}
                  colors={colors}
                  enableAlpha
                  onChange={(newVal) => setAttributes({ pagination: { type: pagination.type, maxPageNum: pagination.maxPageNum, prevText: pagination.prevText, nextText: pagination.fontSize, fontSize: pagination.fontSize, textColor: newVal, hoverColor: pagination.hoverColor, bgColor: pagination.bgColor, bgActiveColor: pagination.bgActiveColor, loadMoreText: pagination.loadMoreText, loadingIcon: pagination.loadingIcon, } })}
                />



                <label for="">Background Color</label>


                <ColorPalette
                  color={pagination.bgColor}
                  colors={colors}
                  enableAlpha
                  onChange={(newVal) => setAttributes({ pagination: { type: pagination.type, maxPageNum: pagination.maxPageNum, prevText: pagination.prevText, nextText: pagination.fontSize, fontSize: pagination.fontSize, textColor: pagination.textColor, hoverColor: pagination.hoverColor, bgColor: newVal, bgActiveColor: pagination.bgActiveColor, loadMoreText: pagination.loadMoreText, loadingIcon: pagination.loadingIcon, } })}
                />


                <label for="">Active/Hover Background Color</label>
                <ColorPalette
                  color={pagination.bgActiveColor}
                  colors={colors}
                  enableAlpha
                  onChange={(newVal) => setAttributes({ pagination: { type: pagination.type, maxPageNum: pagination.maxPageNum, prevText: pagination.prevText, nextText: pagination.fontSize, fontSize: pagination.fontSize, textColor: pagination.textColor, hoverColor: pagination.hoverColor, bgColor: pagination.bgColor, bgActiveColor: newVal, loadMoreText: pagination.loadMoreText, loadingIcon: pagination.loadingIcon, } })}
                />





                <div className={(pagination.type == 'loadmore' || pagination.type == 'infinite') ? '' : 'hidden'}>
                  <label for="">Load More Text</label>

                  <InputControl
                    value={pagination.loadMoreText}
                    onChange={(newVal) => setAttributes({ pagination: { type: pagination.type, maxPageNum: pagination.maxPageNum, prevText: pagination.prevText, nextText: pagination.fontSize, fontSize: pagination.fontSize, textColor: pagination.textColor, hoverColor: pagination.hoverColor, bgColor: pagination.bgColor, bgActiveColor: pagination.bgActiveColor, loadMoreText: newVal, loadingIcon: pagination.loadingIcon, } })}
                  />


                  <label for="">Loading Icon</label>

                  <InputControl
                    value={pagination.loadingIcon}
                    onChange={(newVal) => setAttributes({ pagination: { type: pagination.type, maxPageNum: pagination.maxPageNum, prevText: pagination.prevText, nextText: pagination.fontSize, fontSize: pagination.fontSize, textColor: pagination.textColor, hoverColor: pagination.hoverColor, bgColor: pagination.bgColor, bgActiveColor: pagination.bgActiveColor, loadMoreText: pagination.loadMoreText, loadingIcon: newVal, } })}
                  />
                </div>





              </PanelBody>


              <PanelBody title="Filterable" initialOpen={false} className={viewType == 'filterable' ? '' : 'hidden'}>


                <div>

                  <Button
                    variant="secondary"
                    className='mb-2'
                    onClick={(ev) => {

                      var filters = filterable.filters.concat({ groupTitle: '', type: '', logic: '', showPostCount: '', items: [] })

                      setAttributes({ filterable: { filters: filters, allText: filterable.allText, showSort: filterable.showSort, activeFilter: filterable.activeFilter, textColor: filterable.textColor, bgColor: filterable.bgColor, activeBgColor: filterable.activeBgColor, padding: { val: filterable.padding.val, unit: filterable.padding.unit }, margin: filterable.margin, bgImg: filterable.bgImg } })
                    }}

                  >Add Filter Group</Button>

                  {filterable.filters.map((x, i) => {



                    return (

                      <PanelBody title={(x.groupTitle) ? x.groupTitle : 'Filter Group ' + i} initialOpen={false} >

                        <span
                          onClick={(ev) => {

                            filterable.filters.splice(i, 1);
                            setAttributes({ filterable: { filters: filterable.filters, allText: filterable.allText, showSort: filterable.showSort, activeFilter: filterable.activeFilter, textColor: filterable.textColor, bgColor: filterable.bgColor, activeBgColor: filterable.activeBgColor, padding: { val: filterable.padding.val, unit: filterable.padding.unit }, margin: filterable.margin, bgImg: filterable.bgImg } })
                          }}
                          className='cursor-pointer px-3 py-1 inline-block text-white bg-red-600 text-sm mb-2'><span className='dashicon dashicons dashicons-no-alt'></span> Delete Group</span>


                        <PanelRow >
                          <label for="">Group Title</label>













                          <InputControl
                            value={x.groupTitle}
                            onChange={(newVal) => {
                              filterable.filters[i].groupTitle = newVal

                              setAttributes({ filterable: { filters: filterable.filters, allText: filterable.allText, showSort: filterable.showSort, activeFilter: filterable.activeFilter, textColor: filterable.textColor, bgColor: filterable.bgColor, activeBgColor: filterable.activeBgColor, padding: { val: filterable.padding.val, unit: filterable.padding.unit }, margin: filterable.margin, bgImg: filterable.bgImg } })

                            }}
                          />
                        </PanelRow>

                        <PanelRow >
                          <label for="">Group Type</label>



                          <SelectControl
                            value={x.type}
                            options={[
                              { value: 'inline', label: 'Inline' },
                              { value: 'dropdown', label: 'Dropdown' },
                              { value: 'radio', label: 'Radio' },
                              { value: 'checkbox', label: 'Checkbox' },
                            ]}
                            onChange={(newVal) => {
                              filterable.filters[i].type = newVal

                              setAttributes({ filterable: { filters: filterable.filters, allText: filterable.allText, showSort: filterable.showSort, activeFilter: filterable.activeFilter, textColor: filterable.textColor, bgColor: filterable.bgColor, activeBgColor: filterable.activeBgColor, padding: { val: filterable.padding.val, unit: filterable.padding.unit }, margin: filterable.margin, bgImg: filterable.bgImg } })

                            }}
                          />



                        </PanelRow>



                        <PanelRow >
                          <label for="">Data Logic</label>

                          <SelectControl
                            value={x.logic}
                            options={[
                              { value: 'or', label: 'OR' },
                              { value: 'and', label: 'AND' },

                            ]}
                            onChange={(newVal) => {
                              filterable.filters[i].logic = newVal

                              setAttributes({ filterable: { filters: filterable.filters, allText: filterable.allText, showSort: filterable.showSort, activeFilter: filterable.activeFilter, textColor: filterable.textColor, bgColor: filterable.bgColor, activeBgColor: filterable.activeBgColor, padding: { val: filterable.padding.val, unit: filterable.padding.unit }, margin: filterable.margin, bgImg: filterable.bgImg } })

                            }}
                          />

                        </PanelRow>


                        <PanelRow >
                          <label for="">Show Post Count </label>

                          <SelectControl
                            value={x.showPostCount}
                            options={[
                              { value: 'no', label: 'No' },
                              { value: 'yes', label: 'Yes' },

                            ]}
                            onChange={(newVal) => {
                              filterable.filters[i].showPostCount = newVal

                              setAttributes({ filterable: { filters: filterable.filters, allText: filterable.allText, showSort: filterable.showSort, activeFilter: filterable.activeFilter, textColor: filterable.textColor, bgColor: filterable.bgColor, activeBgColor: filterable.activeBgColor, padding: { val: filterable.padding.val, unit: filterable.padding.unit }, margin: filterable.margin, bgImg: filterable.bgImg } })

                            }}
                          />

                        </PanelRow>



                        <label for="" className='my-3 font-bold'>Terms</label>



                        {/* {JSON.stringify(filterablTerms)} */}

                        {x.items.length == 0 && (
                          <div className='my-1'>No terms added.</div>
                        )}

                        {x.items.map((y, j) => {

                          return (
                            <PanelRow className='my-1'>
                              {y.title}

                              <span
                                onClick={(ev) => {

                                  filterable.filters[i].items.splice(j, 1);

                                  setAttributes({ filterable: { filters: filterable.filters, allText: filterable.allText, showSort: filterable.showSort, activeFilter: filterable.activeFilter, textColor: filterable.textColor, bgColor: filterable.bgColor, activeBgColor: filterable.activeBgColor, padding: { val: filterable.padding.val, unit: filterable.padding.unit }, margin: filterable.margin, bgImg: filterable.bgImg } })
                                }}
                                className='cursor-pointer p-1   inline-block text-white bg-red-600 text-sm'><span className='dashicon dashicons dashicons-no-alt'></span></span>
                            </PanelRow>
                          )
                        })
                        }




                        <InputControl

                          placeholder="Search Categories or terms"

                          value=''
                          onChange={(newVal) => {
                            fetchPostTypeTerms(newVal);

                          }}
                        />


                        {/* {filterablTerms.length == 0 && (
                          <div className='bg-gray-200 p-2 mt-2'>No Terms Found</div>

                        )} */}

                        {filterablTerms.length > 0 && (

                          <div className='bg-gray-200 p-2 mt-2'>
                            {filterablTerms.map(x => {

                              return (

                                <div
                                  title='Click Add terms'
                                  className='border-b border-gray-400 my-2 pb-1 cursor-pointer'

                                  onClick={(ev) => {

                                    if (x.slug) {
                                      var ss = filterable.filters[i].items.concat({ id: x.term_id, slug: x.slug, title: x.name, count: x.count });
                                      filterable.filters[i].items = ss

                                      setAttributes({ filterable: { filters: filterable.filters, allText: filterable.allText, showSort: filterable.showSort, activeFilter: filterable.activeFilter, textColor: filterable.textColor, bgColor: filterable.bgColor, activeBgColor: filterable.activeBgColor, padding: { val: filterable.padding.val, unit: filterable.padding.unit }, margin: filterable.margin, bgImg: filterable.bgImg } })
                                    }


                                  }}

                                >{x.name} ({x.count})</div>

                              )

                            })}
                          </div>
                        )


                        }










                      </PanelBody>

                    )

                  })
                  }
                </div>


                <PanelRow >
                  <label for="">Show Sort Filter </label>


                  <SelectControl
                    label=""
                    value={filterable.showSort}
                    options={[
                      { label: 'No', value: 'no' },
                      { label: 'Yes', value: 'yes' },

                    ]}
                    onChange={(newVal) => setAttributes({ filterable: { filters: filterable.filters, allText: filterable.allText, showSort: newVal, activeFilter: filterable.activeFilter, textColor: filterable.textColor, bgColor: filterable.bgColor, activeBgColor: filterable.activeBgColor, padding: filterable.padding, margin: filterable.margin, bgColor: filterable.bgColor, bgImg: filterable.bgImg } })}

                  />




                </PanelRow>



                <PanelRow>

                  <label for="">Margin</label>
                  <InputControl
                    value={filterable.margin.val}
                    onChange={(newVal) => setAttributes({ filterable: { filters: filterable.filters, allText: filterable.allText, showSort: filterable.showSort, activeFilter: filterable.activeFilter, textColor: filterable.textColor, bgColor: filterable.bgColor, activeBgColor: filterable.activeBgColor, padding: filterable.padding, margin: { val: newVal, unit: filterable.margin.unit }, bgColor: filterable.bgColor, bgImg: filterable.bgImg } })}
                  />

                  <SelectControl
                    label=""
                    value={filterable.margin.unit}
                    options={[
                      { label: 'px', value: 'px' },
                      { label: 'em', value: 'em' },

                    ]}
                    onChange={(newVal) => setAttributes({ filterable: { filters: filterable.filters, allText: filterable.allText, showSort: filterable.showSort, activeFilter: filterable.activeFilter, textColor: filterable.textColor, bgColor: filterable.bgColor, activeBgColor: filterable.activeBgColor, margin: { val: filterable.padding.val, unit: newVal }, padding: filterable.padding, bgColor: filterable.bgColor, bgImg: filterable.bgImg } })}
                  />

                </PanelRow>

                <PanelRow>

                  <label for="">Padding</label>
                  <InputControl
                    value={filterable.padding.val}
                    onChange={(newVal) => setAttributes({ filterable: { filters: filterable.filters, allText: filterable.allText, showSort: filterable.showSort, activeFilter: filterable.activeFilter, textColor: filterable.textColor, bgColor: filterable.bgColor, activeBgColor: filterable.activeBgColor, margin: filterable.margin, padding: { val: newVal, unit: filterable.padding.unit }, bgColor: filterable.bgColor, bgImg: filterable.bgImg } })}
                  />

                  <SelectControl
                    label=""
                    value={filterable.padding.unit}
                    options={[
                      { label: 'px', value: 'px' },
                      { label: 'em', value: 'em' },

                    ]}
                    onChange={(newVal) => setAttributes({ filterable: { filters: filterable.filters, allText: filterable.allText, showSort: filterable.showSort, activeFilter: filterable.activeFilter, textColor: filterable.textColor, bgColor: filterable.bgColor, activeBgColor: filterable.activeBgColor, padding: { val: filterable.padding.val, unit: newVal }, margin: filterable.margin, bgColor: filterable.bgColor, bgImg: filterable.bgImg } })}
                  />

                </PanelRow>


                <label for="">Text Color</label>
                <ColorPalette
                  color={filterable.textColor}
                  colors={colors}
                  enableAlpha
                  onChange={(newVal) => setAttributes({ filterable: { filters: filterable.filters, allText: filterable.allText, showSort: filterable.showSort, activeFilter: filterable.activeFilter, textColor: newVal, bgColor: filterable.bgColor, activeBgColor: filterable.activeBgColor, padding: { val: filterable.padding.val, unit: filterable.padding.unit }, margin: filterable.margin, bgImg: filterable.bgImg } })}
                />


                <label for="">Background Color</label>
                <ColorPalette
                  color={filterable.bgColor}
                  colors={colors}
                  enableAlpha
                  onChange={(newVal) => setAttributes({ filterable: { filters: filterable.filters, allText: filterable.allText, showSort: filterable.showSort, activeFilter: filterable.activeFilter, textColor: filterable.textColor, bgColor: newVal, activeBgColor: filterable.activeBgColor, padding: { val: filterable.padding.val, unit: filterable.padding.unit }, margin: filterable.margin, bgImg: filterable.bgImg } })}
                />

                <label for="">Active Background Color</label>
                <ColorPalette
                  color={filterable.activeBgColor}
                  colors={colors}
                  enableAlpha
                  onChange={(newVal) => setAttributes({ filterable: { filters: filterable.filters, allText: filterable.allText, showSort: filterable.showSort, activeFilter: filterable.activeFilter, textColor: filterable.textColor, bgColor: filterable.bgColor, activeBgColor: newVal, padding: { val: filterable.padding.val, unit: filterable.padding.unit }, margin: filterable.margin, bgImg: filterable.bgImg } })}
                />





              </PanelBody>

              <PanelBody title="Glossary" initialOpen={false} className={viewType == 'glossary' ? '' : 'hidden'}>

              </PanelBody>
              <PanelBody title="Carousel" initialOpen={false} className={(viewType == 'carousel') ? '' : 'hidden'}>

              </PanelBody>
              <PanelBody title="Masonry" initialOpen={false} className={(viewType == 'carousel' || viewType == 'glossary' || viewType == 'filterable') ? 'hidden' : ''}>

                <SelectControl
                  label="Enable"
                  value={masonry.enable}

                  options={[
                    { label: 'No', value: 'no' },
                    { label: 'Yes', value: 'yes' },
                  ]}
                  onChange={(newVal) => setAttributes({ masonry: { enable: newVal, } })}
                />


              </PanelBody>
              <PanelBody title="Search" initialOpen={false} className={(viewType == 'grid' || viewType == 'filterable') ? '' : 'hidden'}>

                <SelectControl
                  label="Enable"
                  value={search.enable}

                  options={[
                    { label: 'No', value: 'no' },
                    { label: 'Yes', value: 'yes' },
                  ]}
                  onChange={(newVal) => setAttributes({ search: { enable: newVal, type: search.type, placeholder: search.placeholder, icon: search.icon, busyIcon: search.busyIcon } })}
                />


                <SelectControl
                  label="Search action"
                  value={search.type}

                  options={[
                    { label: 'Ajax - On change form data', value: 'ajax' },
                    { label: 'On form submit - GET method', value: 'form_submit' },
                  ]}
                  onChange={(newVal) => setAttributes({ search: { enable: search.type, type: newVal, placeholder: search.placeholder, icon: search.icon, busyIcon: search.busyIcon } })}
                />

                <InputControl
                  label="Placeholder text"

                  value={search.placeholder}
                  onChange={(newVal) => setAttributes({ search: { enable: search.type, type: search.type, placeholder: newVal, icon: search.icon, busyIcon: search.busyIcon } })}
                />

                <InputControl
                  label="Search icon"

                  value={search.icon}
                  onChange={(newVal) => setAttributes({ search: { enable: search.type, type: search.type, placeholder: search.placeholder, icon: newVal, busyIcon: search.busyIcon } })}
                />

                <InputControl
                  label="Loading icon"

                  value={search.busyIcon}
                  onChange={(newVal) => setAttributes({ search: { enable: search.type, type: search.type, placeholder: search.placeholder, icon: search.icon, busyIcon: newVal } })}
                />




              </PanelBody>
              <PanelBody title="Custom Scripts" initialOpen={false}></PanelBody>




            </div>

          </InspectorControls>
        </div>
        ,


        <div className="my-custom-block">

          <code>{JSON.stringify(filterable)}</code>
          <ContainerCss cssData={props.attributes}>


            {lazyLoad.enable == 'yes' &&
              (
                <div className='lazyLoad'>lazyLoad</div>
              )
            }


            {search.enable == 'yes' &&
              (
                <div className='search'>search form</div>
              )
            }


            {viewType == 'filterable' &&
              (

                <div className='filterable-navs'>
                  <div className='pg-filter-group mx-3 inline-block'>

                    <div className='filter cusror-pointer px-4 py-2 m-2 inline-block bg-gray-200 filter-34534' data-filter='all'>All</div>
                  </div>
                  {

                    filterable.filters.map(x => {

                      return (

                        <div className='pg-filter-group mx-3 inline-block' data-logic={x.logic}>

                          {x.groupTitle && (
                            <div className='filter-group-title px-4 py-2 m-2 inline-block mx-2'>{x.groupTitle}</div>
                          )}


                          <div className='filter-group-items inline-block'>
                            {x.items.map(y => {

                              return (

                                <div className='filter cursor-pointer cusror-pointer px-4 py-2 m-2 inline-block bg-gray-200 filter-34534' terms-id={y.id} data-filter={'.' + y.slug}>{y.title} {x.showPostCount == 'yes' ? '(' + y.count + ')' : ''}</div>

                              )

                            })}

                          </div>


                        </div>

                      )


                    })

                  }
                </div>





              )
            }

            {viewType == 'glossary' &&
              (
                <div className='filterable-navs'>glossary navs</div>
              )
            }





            <div >

              {posts.items.length == 0 &&

                (
                  <div className='no-posts'>No Post found</div>

                )
              }



              {posts.items.length > 0 &&
                (
                  <CustomCss cssData={props.attributes} className='masonry-grid'>
                    {
                      posts.items.map((x, i) => {

                        return (<div className='border p-3 item '><RawHTML>{x.html}</RawHTML></div>)
                        //return (generateLayout(x, i))
                      })
                    }
                  </CustomCss>
                )
              }





            </div>


            {pagination.type == 'normal' &&
              (
                <div className='pagination'>normal Pagination</div>

              )
            }

            {pagination.type == 'ajax' &&
              (
                <div className='pagination'>ajax Pagination</div>

              )
            }

            {pagination.type == 'next_previous' &&
              (
                <div className='pagination'>next_previous Pagination</div>

              )
            }

            {pagination.type == 'filterable' &&
              (
                <div className='pagination'>filterable Pagination</div>

              )
            }

            {pagination.type == 'loadmore' &&
              (
                <div className='pagination'>loadmore Pagination</div>

              )
            }

            {pagination.type == 'infinite' &&
              (
                <div className='pagination'>infinite Pagination</div>

              )
            }

          </ContainerCss>

        </div>
      ]




    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})