import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'




import apiFetch from '@wordpress/api-fetch';
import {
  BlockContextProvider,
  __experimentalUseBlockPreview as useBlockPreview,
  useInnerBlocksProps,

} from '@wordpress/block-editor';
const { parse } = wp.blockSerializationDefaultParser;
const { RawHTML } = wp.element;
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
var select = wp.data.select('core/block-editor')

import { createElement, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, ButtonGroup, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, Spinner, CustomSelectControl, Popover } from '@wordpress/components'
import { InspectorControls, BlockControls, AlignmentToolbar, RichText } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';

import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { Icon, close } from '@wordpress/icons';

import Typography from '../../components/typography'
import IconToggle from '../../components/icon-toggle'
import PGDropdown from '../../components/dropdown'
import PGproWrapper from '../../components/pro-wrapper'
import PGIconPicker from '../../components/icon-picker'

import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import PGStyles from '../../components/styles'
import PGcssTextAlign from '../../components/css-text-align'
import PGcssDisplay from '../../components/css-display'
import PGcssCursor from '../../components/css-cursor'


import PGTutorials from '../../components/tutorials'

import PGcssPadding from '../../components/css-padding'

import breakPoints from '../../breakpoints'
import queryPresets from './query-presets'
import gridLayouts from './grid-layouts'
import queryPrams from './queryprams'


import colorsPresets from '../../colors-presets'
import anime from 'animejs/lib/anime.es.js';



const ALLOWED_MEDIA_TYPES = ['image'];

var queryPramsX = queryPrams.map((x, i) => {

  return { value: i, label: x.label, description: x.description, isPro: x.isPro, }
})





var myStore = wp.data.select('postgrid-shop');



registerBlockType("post-grid/post-grid-filterable", {
  title: "Post Grid -  Filterable",

  icon: {
    background: '#2563eb',
    foreground: '#2563eb',
    src:
      <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M274 117C274 114.239 276.239 112 279 112H417C419.761 112 422 114.239 422 117V137C422 139.761 419.761 142 417 142H279C276.239 142 274 139.761 274 137V117Z" fill="#ffffff" />
        <path d="M274 182C274 179.239 276.239 177 279 177H417C419.761 177 422 179.239 422 182V202C422 204.761 419.761 207 417 207H279C276.239 207 274 204.761 274 202V182Z" fill="#ffffff" />
        <rect x="98" y="100" width="118" height="118" stroke="#ffffff" stroke-width="30" />
        <rect x="94" y="283" width="118" height="118" stroke="#ffffff" stroke-width="30" />
        <path d="M289 283H407V401H289V283Z" stroke="#ffffff" background="black" stroke-width="30" />
      </svg>
    ,
  },


  providesContext: {
    queryId: "queryId",
    loopIndex: "loopIndex",

    query: "query",
    displayLayout: "displayLayout"
  },
  supports: {
    align: ["left", "right", "center", "wide", "full"],
    html: false,
  },

  attributes: {


    lazyLoad: {
      type: 'object',
      default: {
        options: {
          class: 'lazyLoad', enable: 'no', srcUrl: '', srcId: '', icon: { library: '', srcType: "class", /*class, html, img, svg */ iconSrc: '' },
        },

        styles:
        {
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {}
        },
      },
    },

    search: {
      type: 'object',
      default: {
        options: { class: 'search', enable: 'no', type: '', placeholder: '', icon: '', busyIcon: '' },
        styles:
        {
          textAlign: {},
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
    container: {
      type: 'object',
      default: {
        options: { class: '', },
        styles:
        {
          textAlign: {},
          color: {},
          bgColor: {},
          backgroundImage: {},
          padding: {},
          margin: {}
        },

      },
    },

    itemsWrap: {
      type: 'object',
      default: {

        options: { class: 'items-loop', },
        styles:
        {
          textAlign: {},
          color: {},
          bgColor: {},
          wordBreak: {},
          padding: {},
          margin: {}
        },
      },
    },

    itemWrap: {
      type: 'object',
      default: {

        options: { class: 'item', },
        styles:
        {
          textAlign: {},
          color: {},
          bgColor: {},
          wordBreak: {},
          padding: {},

          fontSize: {}, //{ val: '18', unit: 'px' }
          lineHeight: {}, // { val: '18', unit: 'px' }
          letterSpacing: {}, // { val: '18', unit: 'px' }
          fontFamily: {},
          fontWeight: {},
          textDecoration: {}, //overline, line-through, underline
          textTransform: {},
        },
        hoverStyles:
        {
          color: {},
          bgColor: {},
        },

      },
    },

    filterable: {
      type: 'object',
      default: {

        options: {
          filters: [], allText: 'All', showSort: '', showRandom: '', showAll: 'yes', showClear: '', activeFilter: '', parPage: 6,
        },
        styles:
        {
          textAlign: {},
          color: {},
          bgColor: {},
          wordBreak: {},
          padding: {},
          margin: {},
          display: { "Desktop": "inline-block" },
          cursor: { "Desktop": "pointer" },

        },

      },
    },

    activeFilter: {
      type: 'object',
      default: {
        options: { slug: 'all' },
        styles:
        {
          textAlign: {},
          color: {},
          bgColor: {},
          wordBreak: {},
          padding: {},
          margin: {},
        },

      },
    },

    filterGroup: {
      type: 'object',
      default: {
        options: {},
        styles:
        {
          textAlign: {},
          color: { "Desktop": "#18978F" },
          bgColor: { "Desktop": "#9DD6DF" },
          wordBreak: {},
          padding: {},
          margin: {},
          display: { "Desktop": "inline-block" },

        },

      },
    },


    noPostsWrap: {
      type: 'object',
      default: {

        options: { class: 'no-posts text-center', },
        styles:
        {
          textAlign: {},
          color: {},
          bgColor: {},
          wordBreak: {},
          padding: {},
          margin: {}
        },
      },
    },

    spinnerWrap: {
      type: 'object',
      default: {

        options: { class: 'spinner', },
        styles:
        {
          textAlign: {},
          color: {},
          bgColor: {},
          wordBreak: {},
          padding: {},
          margin: {}
        },
      },
    },



    grid: {
      type: 'object',
      default: {
        options: {
          itemCss: {},

        },

        styles:
        {
          gridTemplateColumns: {},
          gridTemplateRows: {},
          colGap: {},
          rowGap: {},
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {}
        },


      },
    },

    pagination: {
      type: 'object',
      default: {

        options: {
          class: 'pagination',
          type: 'filterable',
          maxPageNum: '',
          prevText: 'Previous',
          nextText: 'Next',
          loadMoreText: 'Load More',
          noMorePosts: 'No More Posts',
          loadingText: 'Loading...',
          loadingIcon: { library: '', srcType: "class", /*class, html, img, svg */ iconSrc: '' },
        },

        styles:
        {
          textAlign: { "Desktop": "center" },
          color: { "Desktop": "#18978F" },
          bgColor: { "Desktop": "#9DD6DF" },
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

        hoverStyles:
        {
          color: {},
          bgColor: {},
        },


      },
    },


    paginationItem: {
      type: 'object',
      default: {

        options: { class: 'page-numbers inline-block', },

        styles:
        {
          textAlign: {},
          display: { "Desktop": "inline-block" },
          color: { "Desktop": "#18978F" },
          bgColor: { "Desktop": "#9DD6DF" },
          padding: { "Desktop": { "top": "10px", "right": "10px", "bottom": "10px", "left": "10px" } },
          margin: { "Desktop": { "top": "5px", "right": "5px", "bottom": "5px", "left": "5px" } },
          fontSize: {}, //{ val: '18', unit: 'px' }
          lineHeight: {}, // { val: '18', unit: 'px' }
          letterSpacing: {}, // { val: '18', unit: 'px' }
          fontFamily: {},
          fontWeight: {},
          textDecoration: {}, //overline, line-through, underline
          textTransform: {},
        },

        hoverStyles:
        {
          color: {},
          bgColor: {},
        },

      },
    },

    paginationItemActive: {
      type: 'object',
      default: {

        options: { class: 'page-numbers inline-block', },

        styles:
        {
          textAlign: {},
          display: {},
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

        hoverStyles:
        {
          color: {},
          bgColor: {},
        },
      },
    },


    layout: {
      type: 'object',
      default: { id: '', srcServer: 'library', data: [{ "blockName": "core/post-title", "attrs": {}, "innerBlocks": [], "innerHTML": "", "innerContent": [] }, { "blockName": null, "attrs": {}, "innerBlocks": [], "innerHTML": "\n\n", "innerContent": ["\n\n"] }, { "blockName": "core/post-date", "attrs": {}, "innerBlocks": [], "innerHTML": "", "innerContent": [] }, { "blockName": null, "attrs": {}, "innerBlocks": [], "innerHTML": "\n\n", "innerContent": ["\n\n"] }, { "blockName": "core/post-excerpt", "attrs": { "moreText": "", "textColor": "primary" }, "innerBlocks": [], "innerHTML": "", "innerContent": [] }], "rawData": "<!-- wp:post-featured-image  /-->\n\n<!-- wp:post-title /-->\n\n<!-- wp:post-excerpt  /-->" },
    },

    postTypes: {
      type: 'array',
      default: [],
    },
    blockId: {
      "type": "string",
      "default": ''
    },
    customCss: {
      "type": "string",
      "default": ''
    },
    scripts: {
      type: 'object',
      default: { js: '', css: '' },
    },
    blockCssY: {
      "type": "object",
      "default": { items: {} }
    },
    queryArgs: {
      type: 'object',
      default: {
        items: [
          { val: ['post'], multiple: false, id: 'postType', label: 'Post Types', description: "Select Post Types to Query" },
          { val: ['publish'], multiple: false, id: 'postStatus', label: 'Post status', description: "Query post by post status" },
          { val: 'DESC', multiple: false, id: 'order', label: 'Order', description: "Post query order" },
          { val: ['date'], multiple: false, id: 'orderby', label: 'Orderby', description: "Post query orderby" },
          { val: -1, multiple: false, id: 'postsPerPage', label: 'Posts Per Page', description: "Number of post to show per page" },
          { val: 1, multiple: false, id: 'paged', label: 'Paged', description: "Pagination start with" },

        ]
      },
    },


  },
  category: "post-grid",
  edit: function (props) {


    const blockProps = useBlockProps();

    var attributes = props.attributes;
    var clientId = props.clientId;

    var setAttributes = props.setAttributes;

    var lazyLoad = attributes.lazyLoad;
    var container = attributes.container;
    var pagination = attributes.pagination;
    var paginationItem = attributes.paginationItem;
    var paginationItemActive = attributes.paginationItemActive;

    var search = attributes.search;
    var itemsWrap = attributes.itemsWrap;
    var itemWrap = attributes.itemWrap;
    var noPostsWrap = attributes.noPostsWrap;
    var spinnerWrap = attributes.spinnerWrap;
    var filterable = attributes.filterable;
    var activeFilter = attributes.activeFilter;
    var filterGroup = attributes.filterGroup;

    var grid = attributes.grid;
    var layout = attributes.layout;
    var queryArgs = attributes.queryArgs;
    var blockCssY = attributes.blockCssY;
    var customCss = attributes.customCss;
    var blockId = attributes.blockId;

    var blockIdX = attributes.blockId ? attributes.blockId : 'pg' + clientId.split('-').pop();
    var blockClass = '.' + blockIdX;

    var [isBusy, setIsBusy] = useState(false); // Using the hook.
    var [importLayoutOpen, setimportLayoutOpen] = useState({ id: 0, isOpen: false }); // Using the hook.



    var containerSelector = blockClass;
    const loopItemsWrapSelector = blockClass + ' .items-loop';
    const loopItemSelector = blockClass + ' .item';

    const filterGroupSelector = blockClass + ' .filterable-group';
    const filterGroupTitleSelector = blockClass + ' .filterable-group-title';

    const filterSelector = blockClass + ' .pg-filter';
    const filterActiveSelector = blockClass + ' .pg-filter.mixitup-control-active';


    const noPostsSelector = blockClass + ' .no-posts';
    const searchWrapSelector = blockClass + ' .search';
    const lazyloadWrapSelector = blockClass + ' .lazyLoad';
    const spinnerSelector = blockClass + ' .spinner';
    const paginationWrapSelector = blockClass + ' .pagination';
    const paginationItemSelector = blockClass + ' .pagination .page-numbers';
    const paginationItemActiveSelector = blockClass + ' .pagination .page-numbers.mixitup-control-active';


    var tutorialsLinks = [
      { label: 'How to add columns?', url: '', isVideo: false, },
      { label: 'How to add rows?', url: '', isVideo: false, },
      { label: 'How to display normal pagination?', url: '', isVideo: false, },
      { label: 'How to display ajax pagination?', url: '', isVideo: false, },
      { label: 'How to display next-previous pagination?', url: '', isVideo: false, },
      { label: 'How to enable load more?', url: '', isVideo: false, },
      { label: 'How to enable infinte loading?', url: '', isVideo: false, },
      { label: 'How to disable pagination?', url: '', isVideo: false, },
      { label: 'How to customize pagination style?', url: '', isVideo: false, },
      { label: 'How to enable lazy loading?', url: '', isVideo: true, },
      { label: 'How to custoize post grid container', url: '', isVideo: false, },
      { label: 'How to customize post grid loop wrapper?', url: '', isVideo: false, },
      { label: 'How to query post by post types?', url: '', isVideo: false, },
      { label: 'How to query post by custom post types?', url: '', isVideo: false, },
      { label: 'How to query post by post status?', url: '', isVideo: false, },
      { label: 'How to query post by categories?', url: '', isVideo: false, },
      { label: 'How to query post by tags?', url: '', isVideo: false, },
      { label: 'How to query post by custom taxonomies & terms?', url: '', isVideo: false, },
      { label: 'How to query post by custom meta fields?', url: '', isVideo: false, },
      { label: 'How to query post by search parameter?', url: '', isVideo: false, },
      { label: 'How to query post by post status?', url: '', isVideo: false, },
      { label: 'How to query post by order & orderby?', url: '', isVideo: false, },
      { label: 'How to query post by date?', url: '', isVideo: false, },
      { label: 'How to query post by author?', url: '', isVideo: false, },
      { label: 'How to query post by post ids?', url: '', isVideo: false, },
      { label: 'How to query post by post parents?', url: '', isVideo: false, },
      { label: 'How to query post by post passwords?', url: '', isVideo: false, },
      { label: 'How to customize layouts?', url: '', isVideo: false, },
      { label: 'How to customize layouts?', url: '', isVideo: false, },
      { label: 'How to customize grid layout?', url: '', isVideo: false, },
      { label: 'How to create complex grid layout?', url: '', isVideo: false, },




    ];

    const BLOCKS_TEMPLATE = [
      ['post-grid/post-title', {}],
      ['post-grid/read-more', {}],
    ];


    const columnPresets = [
      {
        label: '1 Column', args: [{ "val": 1, "unit": "fr" }], icon:
          <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1.36364C0 0.61052 0.610521 0 1.36364 0H21.6364C22.3895 0 23 0.61052 23 1.36364V1.36364C23 2.11675 22.3895 2.72727 21.6364 2.72727H1.36364C0.61052 2.72727 0 2.11675 0 1.36364V1.36364Z" fill="#fff" />
            <path d="M0 15.6364C0 14.8833 0.610521 14.2727 1.36364 14.2727H21.6364C22.3895 14.2727 23 14.8833 23 15.6364V15.6364C23 16.3895 22.3895 17 21.6364 17H1.36364C0.61052 17 0 16.3895 0 15.6364V15.6364Z" fill="#fff" />
            <path d="M1.36363 -5.96064e-08C2.11674 -2.66867e-08 2.72726 0.610521 2.72726 1.36364L2.72726 15.6364C2.72726 16.3895 2.11674 17 1.36363 17C0.610513 17 -7.63055e-06 16.3895 -7.59763e-06 15.6364L-6.97375e-06 1.36364C-6.94083e-06 0.610521 0.610513 -9.25261e-08 1.36363 -5.96064e-08Z" fill="#fff" />
            <path d="M21.6364 -5.96064e-08C22.3895 -2.66867e-08 23 0.610521 23 1.36364L23 15.6364C23 16.3895 22.3895 17 21.6364 17V17C20.8832 17 20.2727 16.3895 20.2727 15.6364L20.2727 1.36364C20.2727 0.610521 20.8832 -9.25261e-08 21.6364 -5.96064e-08V-5.96064e-08Z" fill="#fff" />
          </svg>
        ,
      },
      {
        label: '2 Columns', args: [{ "val": 1, "unit": "fr" }, { "val": 1, "unit": "fr" }], icon:
          <svg width="43" height="17" viewBox="0 0 43 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1.36364C0 0.61052 0.610521 0 1.36364 0H41.2727C42.0258 0 42.6363 0.61052 42.6363 1.36364C42.6363 2.11675 42.0258 2.72727 41.2727 2.72727H1.36364C0.610521 2.72727 0 2.11675 0 1.36364Z" fill="#fff" />
            <path d="M0 15.6364C0 14.8833 0.610521 14.2727 1.36364 14.2727H41.2727C42.0258 14.2727 42.6363 14.8833 42.6363 15.6364C42.6363 16.3895 42.0258 17 41.2727 17H1.36364C0.610521 17 0 16.3895 0 15.6364Z" fill="#fff" />
            <path d="M1.36363 -5.96064e-08C2.11674 -2.66867e-08 2.72726 0.610521 2.72726 1.36364L2.72726 15.6364C2.72726 16.3895 2.11674 17 1.36363 17C0.610513 17 -7.63055e-06 16.3895 -7.59763e-06 15.6364L-6.97375e-06 1.36364C-6.94083e-06 0.610521 0.610513 -9.25261e-08 1.36363 -5.96064e-08Z" fill="#fff" />
            <path d="M21.6364 -5.96064e-08C22.3895 -2.66867e-08 23 0.610521 23 1.36364L23 15.6364C23 16.3895 22.3895 17 21.6364 17C20.8832 17 20.2727 16.3895 20.2727 15.6364L20.2727 1.36364C20.2727 0.610521 20.8832 -9.25261e-08 21.6364 -5.96064e-08Z" fill="#fff" />
            <path d="M41.6364 -5.96064e-08C42.3895 -2.66867e-08 43 0.610521 43 1.36364L43 15.6364C43 16.3895 42.3895 17 41.6364 17C40.8832 17 40.2727 16.3895 40.2727 15.6364L40.2727 1.36364C40.2727 0.610521 40.8832 -9.25261e-08 41.6364 -5.96064e-08Z" fill="#fff" />
          </svg>

      },
      {
        label: '3 Columns', args: [{ "val": 1, "unit": "fr" }, { "val": 1, "unit": "fr" }, { "val": 1, "unit": "fr" }], icon:
          <svg width="43" height="17" viewBox="0 0 43 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1.36364C0 0.61052 0.610521 0 1.36364 0H41.2727C42.0258 0 42.6363 0.61052 42.6363 1.36364C42.6363 2.11675 42.0258 2.72727 41.2727 2.72727H1.36364C0.610521 2.72727 0 2.11675 0 1.36364Z" fill="#fff" />
            <path d="M0 15.6364C0 14.8833 0.610521 14.2727 1.36364 14.2727H41.2727C42.0258 14.2727 42.6363 14.8833 42.6363 15.6364C42.6363 16.3895 42.0258 17 41.2727 17H1.36364C0.610521 17 0 16.3895 0 15.6364Z" fill="#fff" />
            <path d="M1.36363 -5.96064e-08C2.11674 -2.66867e-08 2.72726 0.610521 2.72726 1.36364L2.72726 15.6364C2.72726 16.3895 2.11674 17 1.36363 17C0.610513 17 -7.63055e-06 16.3895 -7.59763e-06 15.6364L-6.97375e-06 1.36364C-6.94083e-06 0.610521 0.610513 -9.25261e-08 1.36363 -5.96064e-08Z" fill="#fff" />
            <path d="M14.6364 -5.96064e-08C15.3895 -2.66867e-08 16 0.610521 16 1.36364L16 15.6364C16 16.3895 15.3895 17 14.6364 17C13.8832 17 13.2727 16.3895 13.2727 15.6364L13.2727 1.36364C13.2727 0.610521 13.8832 -9.25261e-08 14.6364 -5.96064e-08Z" fill="#fff" />
            <path d="M28.6364 -5.96064e-08C29.3895 -2.66867e-08 30 0.610521 30 1.36364L30 15.6364C30 16.3895 29.3895 17 28.6364 17C27.8832 17 27.2727 16.3895 27.2727 15.6364L27.2727 1.36364C27.2727 0.61052 27.8832 -9.25261e-08 28.6364 -5.96064e-08Z" fill="#fff" />
            <path d="M41.6364 -5.96064e-08C42.3895 -2.66867e-08 43 0.610521 43 1.36364L43 15.6364C43 16.3895 42.3895 17 41.6364 17C40.8832 17 40.2727 16.3895 40.2727 15.6364L40.2727 1.36364C40.2727 0.610521 40.8832 -9.25261e-08 41.6364 -5.96064e-08Z" fill="#fff" />
          </svg>

      },
      {
        label: '4 Columns', args: [{ "val": 1, "unit": "fr" }, { "val": 1, "unit": "fr" }, { "val": 1, "unit": "fr" }, { "val": 1, "unit": "fr" }], icon:
          <svg width="43" height="17" viewBox="0 0 43 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1.36364C0 0.61052 0.610521 0 1.36364 0H41.2727C42.0258 0 42.6363 0.61052 42.6363 1.36364V1.36364C42.6363 2.11675 42.0258 2.72727 41.2727 2.72727H1.36364C0.610521 2.72727 0 2.11675 0 1.36364V1.36364Z" fill="#fff" />
            <path d="M0 15.6364C0 14.8833 0.610521 14.2727 1.36364 14.2727H41.2727C42.0258 14.2727 42.6363 14.8833 42.6363 15.6364V15.6364C42.6363 16.3895 42.0258 17 41.2727 17H1.36364C0.610521 17 0 16.3895 0 15.6364V15.6364Z" fill="#fff" />
            <path d="M1.36366 -5.96064e-08C2.11677 -2.66867e-08 2.72729 0.610521 2.72729 1.36364L2.72729 15.6364C2.72729 16.3895 2.11677 17 1.36366 17V17C0.610543 17 2.2887e-05 16.3895 2.292e-05 15.6364L2.35438e-05 1.36364C2.35768e-05 0.610521 0.610544 -9.25261e-08 1.36366 -5.96064e-08V-5.96064e-08Z" fill="#fff" />
            <path d="M11.3636 -5.96064e-08C12.1167 -2.66867e-08 12.7273 0.610521 12.7273 1.36364L12.7273 15.6364C12.7273 16.3895 12.1167 17 11.3636 17V17C10.6105 17 9.99999 16.3895 9.99999 15.6364L9.99999 1.36364C9.99999 0.610521 10.6105 -9.25261e-08 11.3636 -5.96064e-08V-5.96064e-08Z" fill="#fff" />
            <path d="M21.3636 -5.96064e-08C22.1167 -2.66867e-08 22.7273 0.610521 22.7273 1.36364L22.7273 15.6364C22.7273 16.3895 22.1167 17 21.3636 17V17C20.6105 17 20 16.3895 20 15.6364L20 1.36364C20 0.61052 20.6105 -9.25261e-08 21.3636 -5.96064e-08V-5.96064e-08Z" fill="#fff" />
            <path d="M31.3636 -5.96064e-08C32.1167 -2.66867e-08 32.7273 0.610521 32.7273 1.36364L32.7273 15.6364C32.7273 16.3895 32.1167 17 31.3636 17V17C30.6105 17 30 16.3895 30 15.6364L30 1.36364C30 0.610521 30.6105 -9.25261e-08 31.3636 -5.96064e-08V-5.96064e-08Z" fill="#fff" />
            <path d="M41.3636 -5.96064e-08C42.1167 -2.66867e-08 42.7273 0.610521 42.7273 1.36364L42.7273 15.6364C42.7273 16.3895 42.1167 17 41.3636 17V17C40.6105 17 40 16.3895 40 15.6364L40 1.36364C40 0.610521 40.6105 -9.25261e-08 41.3636 -5.96064e-08V-5.96064e-08Z" fill="#fff" />
          </svg>

      },

    ];





    useEffect(() => {

      setAttributes({ blockId: blockIdX });
      generateBlockCssY()



      blockCssY.items[loopItemSelector] = (blockCssY.items[loopItemSelector] != undefined) ? blockCssY.items[loopItemSelector] : {};
      blockCssY.items[paginationWrapSelector] = (blockCssY.items[paginationWrapSelector] != undefined) ? blockCssY.items[paginationWrapSelector] : {};


      var wordBreak = (blockCssY.items[loopItemSelector]['word-break'] != undefined) ? blockCssY.items[loopItemSelector]['word-break'] : {};
      wordBreak[breakPointX] = 'break-word'

      blockCssY.items[loopItemSelector] = { ...blockCssY.items[loopItemSelector], 'word-break': wordBreak };


      blockCssY.items[paginationWrapSelector] = { ...blockCssY.items[paginationWrapSelector], 'text-align': { "Desktop": "center" } };

      blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'display': { "Desktop": "inline-block" } };
      blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'cursor': { "Desktop": "pointer" } };

      blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'color': { "Desktop": "#18978F" } };
      blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'background-color': { "Desktop": "#9DD6DF" } };



      blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'margin-left': { "Desktop": "5px" } };
      blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'margin-right': { "Desktop": "5px" } };


      blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'padding-top': { "Desktop": "10px" } };
      blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'padding-right': { "Desktop": "10px" } };
      blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'padding-bottom': { "Desktop": "10px" } };
      blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'padding-left': { "Desktop": "10px" } };



      setAttributes({ blockCssY: { items: blockCssY.items } });


      var paginationOptons = { ...pagination.options, type: 'filterable' }
      setAttributes({ pagination: { ...pagination, options: paginationOptons } });


    }, [clientId]);




    useEffect(() => {



      blockCssY.items[loopItemsWrapSelector] = (blockCssY.items[loopItemsWrapSelector] != undefined) ? blockCssY.items[loopItemsWrapSelector] : {};


      var display = (blockCssY.items[loopItemsWrapSelector]['display'] != undefined) ? blockCssY.items[loopItemsWrapSelector]['display'] : {};
      display[breakPointX] = 'grid'

      blockCssY.items[loopItemsWrapSelector] = { ...blockCssY.items[loopItemsWrapSelector], 'display': display };


      if (grid.styles.gridTemplateColumns[breakPointX] != undefined) {
        var gridTemplateColumns = (blockCssY.items[loopItemsWrapSelector]['grid-template-columns'] != undefined) ? blockCssY.items[loopItemsWrapSelector]['grid-template-columns'] : {};
        gridTemplateColumns[breakPointX] = grid.styles.gridTemplateColumns[breakPointX].map((item) => { return item.val + item.unit + ' ' }).join(' ')

        blockCssY.items[loopItemsWrapSelector] = { ...blockCssY.items[loopItemsWrapSelector], 'grid-template-columns': gridTemplateColumns };

      }

      if (grid.styles.gridTemplateRows[breakPointX] != undefined) {
        var gridTemplateRows = (blockCssY.items[loopItemsWrapSelector]['grid-template-rows'] != undefined) ? blockCssY.items[loopItemsWrapSelector]['grid-template-rows'] : {};
        gridTemplateRows[breakPointX] = grid.styles.gridTemplateRows[breakPointX].map((item) => { return item.val + item.unit + ' ' }).join(' ')

        blockCssY.items[loopItemsWrapSelector] = { ...blockCssY.items[loopItemsWrapSelector], 'grid-template-rows': gridTemplateRows };

      }

      if (grid.styles.colGap[breakPointX] != undefined) {
        var colGap = (blockCssY.items[loopItemsWrapSelector]['column-gap'] != undefined) ? blockCssY.items[loopItemsWrapSelector]['column-gap'] : {};
        colGap[breakPointX] = grid.styles.colGap[breakPointX].val + grid.styles.colGap[breakPointX].unit

        blockCssY.items[loopItemsWrapSelector] = { ...blockCssY.items[loopItemsWrapSelector], 'column-gap': colGap };

      }


      if (grid.styles.rowGap[breakPointX] != undefined) {
        var rowGap = (blockCssY.items[loopItemsWrapSelector]['row-gap'] != undefined) ? blockCssY.items[loopItemsWrapSelector]['row-gap'] : {};
        rowGap[breakPointX] = grid.styles.rowGap[breakPointX].val + grid.styles.rowGap[breakPointX].unit

        blockCssY.items[loopItemsWrapSelector] = { ...blockCssY.items[loopItemsWrapSelector], 'row-gap': rowGap };

      }




      var nthItemsResponsive = [];
      var itemX = { ...blockCssY.items };


      Object.entries(grid.options.itemCss).map((args) => {

        /****breakPoint****/

        var breakPoint = args[0];
        var nthItems = args[1];

        (nthItems.length > 0 && nthItems.map((x, i) => {

          /****nthItems****/
          Object.entries(x).map(attr => {
            var attrId = attr[0]
            var attrVal = attr[1]

            if (nthItemsResponsive[i] != undefined) {
              //nthItemsResponsive[i] = [];
            } else {
              nthItemsResponsive[i] = [];
            }

            if (nthItemsResponsive[i][attrId] != undefined) {
              //nthItemsResponsive[i][attrId] = [];
            } else {
              nthItemsResponsive[i][attrId] = [];
            }

            if (nthItemsResponsive[i][attrId][breakPoint] != undefined) {
              nthItemsResponsive[i][attrId][breakPoint] = attrVal;
            } else {
              nthItemsResponsive[i][attrId][breakPoint] = attrVal;
            }
          })
        }))


      })




      for (var i = 0; i < 10; i++) {
        var selector = `${blockClass} .item:nth-child(${i})`;
        if (blockCssY.items[selector] != undefined) {
          delete blockCssY.items[selector];
        }
      }




      var imtasdas = {};

      (nthItemsResponsive.length > 0 && nthItemsResponsive.map((nth, i) => {
        var selector = `${blockClass} .item:nth-child(${i + 1})`;
        Object.entries(nth).map(attr => {



          var attrId = attr[0]
          var attrVal = attr[1]

          if (imtasdas[selector] != undefined) {
          } else {
            imtasdas[selector] = {};
          }

          if (imtasdas[selector][attrId] != undefined) {

          } else {
            imtasdas[selector][attrId] = {};
          }

          imtasdas[selector][attrId] = attrVal;

        })



      }))


      var asdsd = { ...blockCssY.items, ...imtasdas };


      setAttributes({ blockCssY: { items: asdsd } });





    }, [grid]);


    var [layoutImporting, setlayoutImporting] = useState(false); // Using the hook.
    const [filterablTerms, setFilterablTerms] = useState([]); // Using the hook.

    function fetchPostTypeTerms(keyword) {

      var postTypes = [];
      var terms = [];


      setFilterablTerms([]);


      queryArgs.items.map(x => {

        if (x.id == 'postType') {
          postTypes.push(x.val)
        }
      })


      var sss = apiFetch({
        path: '/post-grid/v2/post_type_objects',
        method: 'POST',
        data: { postTypes: postTypes[0], search: keyword },
      }).then((result) => {
        //setFilterablTerms(result);


        result.length > 0 && result.map(x => {

          apiFetch({
            path: '/post-grid/v2/get_tax_terms',
            method: 'POST',
            data: { taxonomy: x.id, search: keyword },
          }).then((res) => {
            //setFilterablTerms(res);


            res.length > 0 && res.map(y => {

              terms.push(y)

            })

            setFilterablTerms(terms);

          });




        })


        //return result;

      });





    }

    function importLayout(postData) {


      setTimeout(() => {

        apiFetch({
          path: '/post-grid/v2/import_post_grid_template',
          method: 'POST',
          data: { postData: postData },
        }).then((res) => {

          setlayoutImporting(false);

        });

      }, 2000)




    }



    var [debounce, setDebounce] = useState(null); // Using the hook.
    const [breakPointX, setBreakPointX] = useState((myStore != null) ? myStore.getBreakPoint() : 'Desktop');
    const [postGridData, setPostGridData] = useState(window.PostGridPluginData);



    const [clientData, setClientData] = useState({});
    const paginationTypes = {
      none: { label: 'None', value: 'none', isPro: false },
      filterable: { label: 'Filterable', value: 'filterable', isPro: true },

    };

    // [
    //       { label: 'None', value: 'none', isPro: false },
    //       { label: 'Normal Pagination', value: 'normal', isPro: false },
    //       { label: 'Ajax Pagination', value: 'ajax', isPro: true },
    //       { label: 'Next-Previous', value: 'next_previous', isPro: true },
    //       { label: 'Load More', value: 'loadmore', isPro: true },
    //       { label: 'Infinite Load', value: 'infinite', isPro: true },
    //     ]

    var clientDataX = (myStore != null) ? myStore.getclientdata() : '';


    useEffect(() => {

      setPostGridData(window.PostGridPluginData);

    }, [window.PostGridPluginData]);




    useEffect(() => {

      setClientData((myStore != null) ? myStore.getclientdata() : '');



    }, [clientDataX]);




    // var ItemNthCssadasd2 = grid.options.itemCss.map((x, i) => {

    //   return (
    //     `<style>.item:nth-child(${i + 1}){grid-column-start: ${x['grid-column-start']};grid-column-end: ${x['grid-column-end']};grid-row-start: ${x['grid-row-start']};grid-row-end: ${x['grid-row-end']};}</style>`
    //   )

    // });




    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType,

    } = wp.data.dispatch('core/edit-post')


    var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }





    function addQueryPreset(option, index) {


      queryArgs.items = option.value.items;
      setAttributes({ queryArgs: { items: queryArgs.items } })
      fetchPosts()

    }


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

    const TEMPLATE1 = [
      ['core/post-date'],
      ['core/post-title'],
      ['core/post-excerpt'],
    ];


    var blocks = select.getBlocks(clientId);


    var defaultBloicks = []


    var [blocksX, setBlocksX] = useState(blocks); // Using the hook.
    var [TEMPLATEX, setTEMPLATEX] = useState(TEMPLATE); // Using the hook.



    function PostTemplateInnerBlocks({ attsx }) {


      const innerBlocksProps = useInnerBlocksProps(
        { className: 'item' },
        { template: attsx }
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
          className: 'item',
        },
      });

      const handleOnClick = () => {

        setActiveBlockContextId(blockContextId);
      };

      const style = {
        display: isHidden ? 'none' : undefined,
      };

      return (

        <div
          {...blockPreviewProps}
          tabIndex={0}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
          role="button"
          onClick={handleOnClick}
          onKeyPress={handleOnClick}
          style={style}

        />

      );
    }




    const MemoizedPostTemplateBlockPreview = memo(PostTemplateBlockPreview);


    const [activeBlockContextId, setActiveBlockContextId] = useState();


    function PostLoopItem() {


      return (

        <div> </div>

      )

    }



    function generateDateQueryArgs(_args) {

    }

    function onChangeBreakPoint(x, _index) {


      setPreviewDeviceType(x.value)
      var asdsdsd = wp.data.dispatch('postgrid-shop').setBreakPoint(x.value)

      asdsdsd.then((res) => {

        setBreakPointX(res.breakpoint);
        generateBlockCssY();

      });



    }


    function containerPaddingControl(nextValues) {


      var responsive = container.styles.padding;
      responsive[breakPointX] = nextValues;


      var styles = { ...container.styles, padding: responsive };
      setAttributes({ container: { ...container, styles: styles } });


      var itemsX = { ...blockCssY.items };

      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;

      blockCssY.items[containerSelector] = (blockCssY.items[containerSelector] != undefined) ? blockCssY.items[containerSelector] : {};

      if (nextValues.top != undefined) {
        var paddingTop = (blockCssY.items[containerSelector]['padding-top'] != undefined) ? blockCssY.items[containerSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top
        blockCssY.items[containerSelector] = { ...blockCssY.items[containerSelector], 'padding-top': paddingTop };
      }


      if (nextValues.right != undefined) {
        var paddingRight = (blockCssY.items[containerSelector]['padding-right'] != undefined) ? blockCssY.items[containerSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right
        blockCssY.items[containerSelector] = { ...blockCssY.items[containerSelector], 'padding-right': paddingRight };
      }

      if (nextValues.bottom != undefined) {
        var paddingBottom = (blockCssY.items[containerSelector]['padding-bottom'] != undefined) ? blockCssY.items[containerSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom
        blockCssY.items[containerSelector] = { ...blockCssY.items[containerSelector], 'padding-bottom': paddingBottom };
      }

      if (nextValues.left != undefined) {
        var paddingLeft = (blockCssY.items[containerSelector]['padding-left'] != undefined) ? blockCssY.items[containerSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left
        blockCssY.items[containerSelector] = { ...blockCssY.items[containerSelector], 'padding-left': paddingLeft };
      }


      setAttributes({ blockCssY: { items: blockCssY.items } });

    }


    function containerMarginControl(nextValues) {

      var responsive = container.styles.margin;
      responsive[breakPointX] = nextValues;



      var styles = { ...container.styles, margin: responsive };
      setAttributes({ container: { ...container, styles: styles } });




      var itemsX = { ...blockCssY.items };




      blockCssY.items[containerSelector] = (blockCssY.items[containerSelector] != undefined) ? blockCssY.items[containerSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[containerSelector]['margin-top'] != undefined) ? blockCssY.items[containerSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[containerSelector] = { ...blockCssY.items[containerSelector], 'margin-top': marginTop };

      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[containerSelector]['margin-right'] !== undefined) ? blockCssY.items[containerSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[containerSelector] = { ...blockCssY.items[containerSelector], 'margin-right': marginRight };


      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[containerSelector]['margin-bottom'] !== undefined) ? blockCssY.items[containerSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[containerSelector] = { ...blockCssY.items[containerSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[containerSelector]['margin-left'] !== undefined) ? blockCssY.items[containerSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[containerSelector] = { ...blockCssY.items[containerSelector], 'margin-left': marginLeft };

      }

      setAttributes({ blockCssY: { items: blockCssY.items } });

    }

    function activeFilterPaddingControl(nextValues) {


      var responsive = activeFilter.styles.padding;
      responsive[breakPointX] = nextValues;


      var styles = { ...activeFilter.styles, padding: responsive };
      setAttributes({ activeFilter: { ...activeFilter, styles: styles } });


      var itemsX = { ...blockCssY.items };

      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[filterActiveSelector] = (blockCssY.items[filterActiveSelector] != undefined) ? blockCssY.items[filterActiveSelector] : {};



      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[filterActiveSelector]['padding-top'] != undefined) ? blockCssY.items[filterActiveSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[filterActiveSelector] = { ...blockCssY.items[filterActiveSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[filterActiveSelector]['padding-right'] != undefined) ? blockCssY.items[filterActiveSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right

        blockCssY.items[filterActiveSelector] = { ...blockCssY.items[filterActiveSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[filterActiveSelector]['padding-bottom'] != undefined) ? blockCssY.items[filterActiveSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom

        blockCssY.items[filterActiveSelector] = { ...blockCssY.items[filterActiveSelector], 'padding-bottom': paddingBottom };

      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[filterActiveSelector]['padding-left'] != undefined) ? blockCssY.items[filterActiveSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[filterActiveSelector] = { ...blockCssY.items[filterActiveSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });

    }

    function filterablePaddingControl(nextValues) {


      var responsive = filterable.styles.padding;
      responsive[breakPointX] = nextValues;


      var styles = { ...filterable.styles, padding: responsive };
      setAttributes({ filterable: { ...filterable, styles: styles } });


      var itemsX = { ...blockCssY.items };

      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[filterSelector] = (blockCssY.items[filterSelector] != undefined) ? blockCssY.items[filterSelector] : {};



      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[filterSelector]['padding-top'] != undefined) ? blockCssY.items[filterSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[filterSelector] = { ...blockCssY.items[filterSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[filterSelector]['padding-right'] != undefined) ? blockCssY.items[filterSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right

        blockCssY.items[filterSelector] = { ...blockCssY.items[filterSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[filterSelector]['padding-bottom'] != undefined) ? blockCssY.items[filterSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom;

        blockCssY.items[filterSelector] = { ...blockCssY.items[filterSelector], 'padding-bottom': paddingBottom };

      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[filterSelector]['padding-left'] != undefined) ? blockCssY.items[filterSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[filterSelector] = { ...blockCssY.items[filterSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });

    }


    function paginationPaddingControl(nextValues) {


      var responsive = pagination.styles.padding;
      responsive[breakPointX] = nextValues;


      var styles = { ...pagination.styles, padding: responsive };
      setAttributes({ pagination: { ...pagination, styles: styles } });


      var itemsX = { ...blockCssY.items };

      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[paginationWrapSelector] = (blockCssY.items[paginationWrapSelector] != undefined) ? blockCssY.items[paginationWrapSelector] : {};



      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[paginationWrapSelector]['padding-top'] != undefined) ? blockCssY.items[paginationWrapSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[paginationWrapSelector] = { ...blockCssY.items[paginationWrapSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[paginationWrapSelector]['padding-right'] != undefined) ? blockCssY.items[paginationWrapSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right

        blockCssY.items[paginationWrapSelector] = { ...blockCssY.items[paginationWrapSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[paginationWrapSelector]['padding-bottom'] != undefined) ? blockCssY.items[paginationWrapSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom

        blockCssY.items[paginationWrapSelector] = { ...blockCssY.items[paginationWrapSelector], 'padding-bottom': paddingBottom };

      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[paginationWrapSelector]['padding-left'] != undefined) ? blockCssY.items[paginationWrapSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[paginationWrapSelector] = { ...blockCssY.items[paginationWrapSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });

    }


    function paginationItemPaddingControl(nextValues) {


      var responsive = paginationItem.styles.padding;
      responsive[breakPointX] = nextValues;


      var styles = { ...paginationItem.styles, padding: responsive };
      setAttributes({ paginationItem: { ...paginationItem, styles: styles } });


      var itemsX = { ...blockCssY.items };

      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[paginationItemSelector] = (blockCssY.items[paginationItemSelector] != undefined) ? blockCssY.items[paginationItemSelector] : {};



      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[paginationItemSelector]['padding-top'] != undefined) ? blockCssY.items[paginationItemSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'padding-top': paddingTop };
        //itemsX[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[paginationItemSelector]['padding-right'] != undefined) ? blockCssY.items[paginationItemSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'padding-right': paddingRight };
        //itemsX[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[paginationItemSelector]['padding-bottom'] != undefined) ? blockCssY.items[paginationItemSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'padding-bottom': paddingBottom };
        //itemsX[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[paginationItemSelector]['padding-left'] != undefined) ? blockCssY.items[paginationItemSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });

    }


    function itemwrapPaddingControl(nextValues) {


      var responsive = itemWrap.styles.padding;
      responsive[breakPointX] = nextValues;


      var styles = { ...itemWrap.styles, padding: responsive };
      setAttributes({ itemWrap: { ...itemWrap, styles: styles } });


      var itemsX = { ...blockCssY.items };

      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[loopItemSelector] = (blockCssY.items[loopItemSelector] != undefined) ? blockCssY.items[loopItemSelector] : {};



      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[loopItemSelector]['padding-top'] != undefined) ? blockCssY.items[loopItemSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[loopItemSelector] = { ...blockCssY.items[loopItemSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[loopItemSelector]['padding-right'] != undefined) ? blockCssY.items[loopItemSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[loopItemSelector] = { ...blockCssY.items[loopItemSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[loopItemSelector]['padding-bottom'] != undefined) ? blockCssY.items[loopItemSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[loopItemSelector] = { ...blockCssY.items[loopItemSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[loopItemSelector]['padding-left'] != undefined) ? blockCssY.items[loopItemSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[loopItemSelector] = { ...blockCssY.items[loopItemSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });
      //setAttributes({ blockCssY: { items: itemsX } });



    }


    function filterGroupPaddingControl(nextValues) {


      var responsive = filterGroup.styles.padding;
      responsive[breakPointX] = nextValues;


      var styles = { ...filterGroup.styles, padding: responsive };
      setAttributes({ filterGroup: { ...filterGroup, styles: styles } });


      var itemsX = { ...blockCssY.items };

      nextValues.top = (nextValues.top == undefined) ? '0px' : nextValues.top;
      nextValues.right = (nextValues.right == undefined) ? '0px' : nextValues.right;
      nextValues.bottom = (nextValues.bottom == undefined) ? '0px' : nextValues.bottom;
      nextValues.left = (nextValues.left == undefined) ? '0px' : nextValues.left;


      blockCssY.items[filterGroupSelector] = (blockCssY.items[filterGroupSelector] != undefined) ? blockCssY.items[filterGroupSelector] : {};



      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[filterGroupSelector]['padding-top'] != undefined) ? blockCssY.items[filterGroupSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[filterGroupSelector] = { ...blockCssY.items[filterGroupSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[filterGroupSelector]['padding-right'] != undefined) ? blockCssY.items[filterGroupSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[filterGroupSelector] = { ...blockCssY.items[filterGroupSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[filterGroupSelector]['padding-bottom'] != undefined) ? blockCssY.items[filterGroupSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[filterGroupSelector] = { ...blockCssY.items[filterGroupSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[filterGroupSelector]['padding-left'] != undefined) ? blockCssY.items[filterGroupSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[filterGroupSelector] = { ...blockCssY.items[filterGroupSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });
      //setAttributes({ blockCssY: { items: itemsX } });



    }


    function activeFilterMarginControl(nextValues) {

      var responsive = activeFilter.styles.margin;
      responsive[breakPointX] = nextValues;

      var styles = { ...activeFilter.styles, margin: responsive };
      setAttributes({ activeFilter: { ...activeFilter, styles: styles } });

      var itemsX = { ...blockCssY.items };




      blockCssY.items[filterActiveSelector] = (blockCssY.items[filterActiveSelector] != undefined) ? blockCssY.items[filterActiveSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[filterActiveSelector]['margin-top'] != undefined) ? blockCssY.items[filterActiveSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[filterActiveSelector] = { ...blockCssY.items[filterActiveSelector], 'margin-top': marginTop };

      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[filterActiveSelector]['margin-right'] !== undefined) ? blockCssY.items[filterActiveSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[filterActiveSelector] = { ...blockCssY.items[filterActiveSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[filterActiveSelector]['margin-bottom'] !== undefined) ? blockCssY.items[filterActiveSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[filterActiveSelector] = { ...blockCssY.items[filterActiveSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[filterActiveSelector]['margin-left'] !== undefined) ? blockCssY.items[filterActiveSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[filterActiveSelector] = { ...blockCssY.items[filterActiveSelector], 'margin-left': marginLeft };

      }

      setAttributes({ blockCssY: { items: blockCssY.items } });

    }


    function filterableMarginControl(nextValues) {

      var responsive = filterable.styles.margin;
      responsive[breakPointX] = nextValues;

      var styles = { ...filterable.styles, margin: responsive };
      setAttributes({ filterable: { ...filterable, styles: styles } });

      var itemsX = { ...blockCssY.items };




      blockCssY.items[filterSelector] = (blockCssY.items[filterSelector] != undefined) ? blockCssY.items[filterSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[filterSelector]['margin-top'] != undefined) ? blockCssY.items[filterSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[filterSelector] = { ...blockCssY.items[filterSelector], 'margin-top': marginTop };

      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[filterSelector]['margin-right'] !== undefined) ? blockCssY.items[filterSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[filterSelector] = { ...blockCssY.items[filterSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[filterSelector]['margin-bottom'] !== undefined) ? blockCssY.items[filterSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[filterSelector] = { ...blockCssY.items[filterSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[filterSelector]['margin-left'] !== undefined) ? blockCssY.items[filterSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[filterSelector] = { ...blockCssY.items[filterSelector], 'margin-left': marginLeft };

      }

      setAttributes({ blockCssY: { items: blockCssY.items } });

    }



    function filterGroupMarginControl(nextValues) {

      var responsive = filterGroup.styles.margin;
      responsive[breakPointX] = nextValues;

      var styles = { ...filterGroup.styles, margin: responsive };
      setAttributes({ filterGroup: { ...filterGroup, styles: styles } });

      var itemsX = { ...blockCssY.items };




      blockCssY.items[filterGroupSelector] = (blockCssY.items[filterGroupSelector] != undefined) ? blockCssY.items[filterGroupSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[filterGroupSelector]['margin-top'] != undefined) ? blockCssY.items[filterGroupSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[filterGroupSelector] = { ...blockCssY.items[filterGroupSelector], 'margin-top': marginTop };

      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[filterGroupSelector]['margin-right'] !== undefined) ? blockCssY.items[filterGroupSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[filterGroupSelector] = { ...blockCssY.items[filterGroupSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[filterGroupSelector]['margin-bottom'] !== undefined) ? blockCssY.items[filterGroupSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[filterGroupSelector] = { ...blockCssY.items[filterGroupSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[filterGroupSelector]['margin-left'] !== undefined) ? blockCssY.items[filterGroupSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[filterGroupSelector] = { ...blockCssY.items[filterGroupSelector], 'margin-left': marginLeft };

      }

      setAttributes({ blockCssY: { items: blockCssY.items } });

    }





    function paginationMarginControl(nextValues) {

      var responsive = pagination.styles.margin;
      responsive[breakPointX] = nextValues;

      var styles = { ...pagination.styles, margin: responsive };
      setAttributes({ pagination: { ...pagination, styles: styles } });

      var itemsX = { ...blockCssY.items };




      blockCssY.items[paginationWrapSelector] = (blockCssY.items[paginationWrapSelector] != undefined) ? blockCssY.items[paginationWrapSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[paginationWrapSelector]['margin-top'] != undefined) ? blockCssY.items[paginationWrapSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[paginationWrapSelector] = { ...blockCssY.items[paginationWrapSelector], 'margin-top': marginTop };

      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[paginationWrapSelector]['margin-right'] !== undefined) ? blockCssY.items[paginationWrapSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[paginationWrapSelector] = { ...blockCssY.items[paginationWrapSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[paginationWrapSelector]['margin-bottom'] !== undefined) ? blockCssY.items[paginationWrapSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[paginationWrapSelector] = { ...blockCssY.items[paginationWrapSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[paginationWrapSelector]['margin-left'] !== undefined) ? blockCssY.items[paginationWrapSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[paginationWrapSelector] = { ...blockCssY.items[paginationWrapSelector], 'margin-left': marginLeft };

      }

      setAttributes({ blockCssY: { items: blockCssY.items } });

    }




    function paginationItemMarginControl(nextValues) {

      var responsive = paginationItem.styles.margin;
      responsive[breakPointX] = nextValues;



      var styles = { ...paginationItem.styles, margin: responsive };
      setAttributes({ paginationItem: { ...paginationItem, styles: styles } });




      var itemsX = { ...blockCssY.items };




      blockCssY.items[paginationItemSelector] = (blockCssY.items[paginationItemSelector] != undefined) ? blockCssY.items[paginationItemSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[paginationItemSelector]['margin-top'] != undefined) ? blockCssY.items[paginationItemSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'margin-top': marginTop };


      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[paginationItemSelector]['margin-right'] !== undefined) ? blockCssY.items[paginationItemSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'margin-right': marginRight };


      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[paginationItemSelector]['margin-bottom'] !== undefined) ? blockCssY.items[paginationItemSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'margin-bottom': marginBottom };


      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[paginationItemSelector]['margin-left'] !== undefined) ? blockCssY.items[paginationItemSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'margin-left': marginLeft };


      }

      setAttributes({ blockCssY: { items: blockCssY.items } });

    }


    function itemwrapMarginControl(nextValues) {

      var responsive = itemWrap.styles.margin;
      responsive[breakPointX] = nextValues;



      var styles = { ...itemWrap.styles, margin: responsive };
      setAttributes({ itemWrap: { ...itemWrap, styles: styles } });




      var itemsX = { ...blockCssY.items };




      blockCssY.items[loopItemSelector] = (blockCssY.items[loopItemSelector] != undefined) ? blockCssY.items[loopItemSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[loopItemSelector]['margin-top'] != undefined) ? blockCssY.items[loopItemSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[loopItemSelector] = { ...blockCssY.items[loopItemSelector], 'margin-top': marginTop };


      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[loopItemSelector]['margin-right'] !== undefined) ? blockCssY.items[loopItemSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[loopItemSelector] = { ...blockCssY.items[loopItemSelector], 'margin-right': marginRight };


      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[loopItemSelector]['margin-bottom'] !== undefined) ? blockCssY.items[loopItemSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[loopItemSelector] = { ...blockCssY.items[loopItemSelector], 'margin-bottom': marginBottom };


      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[loopItemSelector]['margin-left'] !== undefined) ? blockCssY.items[loopItemSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[loopItemSelector] = { ...blockCssY.items[loopItemSelector], 'margin-left': marginLeft };


      }

      setAttributes({ blockCssY: { items: blockCssY.items } });

    }





    useEffect(() => {

      generateBlockCssY()

    }, [blockCssY]);

    function generateBlockCssY() {


      var reponsiveCssGroups = {};
      var reponsiveCss = '';




      for (var selector in blockCssY.items) {

        var attrs = blockCssY.items[selector];


        for (var attr in attrs) {
          var breakpoints = attrs[attr];

          for (var device in breakpoints) {

            var attrValue = breakpoints[device];

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

      if (reponsiveCssGroups['Mobile'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 0px) and (max-width: 360px){';

        for (var selector in reponsiveCssGroups['Mobile']) {
          var attrs = reponsiveCssGroups['Mobile'][selector];

          reponsiveCss += selector + '{';
          for (var index in attrs) {
            var attr = attrs[index]
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }
          reponsiveCss += '}';
        }
        reponsiveCss += '}';

      }




      if (reponsiveCssGroups['Tablet'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 361px) and (max-width: 780px){';

        for (var selector in reponsiveCssGroups['Tablet']) {
          var attrs = reponsiveCssGroups['Tablet'][selector];

          reponsiveCss += selector + '{';
          for (var index in attrs) {
            var attr = attrs[index]
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }
          reponsiveCss += '}';
        }

        reponsiveCss += '}';
      }



      if (reponsiveCssGroups['Desktop'] != undefined) {
        reponsiveCss += '@media only screen and (min-width: 781px){';

        for (var selector in reponsiveCssGroups['Desktop']) {
          var attrs = reponsiveCssGroups['Desktop'][selector];


          reponsiveCss += selector + '{';
          for (var index in attrs) {
            var attr = attrs[index]
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCss += attrName + ':' + attrValue + ';';
          }
          reponsiveCss += '}';


        }
        reponsiveCss += '}';
      }




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
        csswrappg.insertAdjacentHTML('beforeend', "");


        setTimeout(() => {
          csswrappg.insertAdjacentHTML('beforeend', str);
        }, 100)



      }



    }





    const [posts, setPosts] = useState([]); // Using the hook.
    const [postsQuery, setPostsQuery] = useState(false); // Using the hook.
    const [paginationItems, setPaginationItems] = useState([]); // Using the hook.


    function fetchPosts() {

      setPostsQuery(true);
      setIsBusy(true);

      var arg = queryArgs.items.map(item => {

        return { id: item.id, val: item.val }
      })

      apiFetch({
        path: '/post-grid/v2/get_posts',
        method: 'POST',
        data: { queryArgs: arg, rawData: layout.rawData },
      }).then((res) => {

        setPostsQuery(false);


        setPosts(res.posts)
        setPaginationItems(res.pagination)


        setIsBusy(false);

      });

    }


    function generateLayout(x, _i) {

      var savedBlocks = layout.data;

      var content = "<!-- wp:paragraph --><p>paragraph one</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>then two</p><!-- /wp:paragraph -->";

      // Parse the serialized content into valid blocks using parse from @wordpress/block-serialization-default-parser
      var blocks = (savedBlocks.length > 0) ? savedBlocks : parse(content);



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
    function recursInnerBlocksHtml(blocks, _index = 0) {





      var xx = blocks.map((block, i) => {

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
      fetchPosts();



    }, [layout]);

    useEffect(() => {
      fetchPosts();



    }, [queryArgs]);



    useEffect(() => {
      fetchLayouts();
      fetchLayoutData();


    }, [container]);




    function onChangeItemWrapTypo(typoX) {

      setAttributes({ itemWrap: { ...itemWrap, styles: typoX } });

      var newValuesObjX = {};


      if (typoX.fontFamily[breakPointX] != undefined) {

        blockCssY.items[loopItemSelector] = { ...blockCssY.items[loopItemSelector], 'font-family': typoX.fontFamily };

      }


      if (typoX.fontSize[breakPointX] != undefined) {

        var fontSizeVal = (typoX.fontSize[breakPointX].val) ? typoX.fontSize[breakPointX].val : 16;
        var fontSizeUnit = (typoX.fontSize[breakPointX].unit) ? typoX.fontSize[breakPointX].unit : 'px';


        var fontSizeX = (blockCssY.items[loopItemSelector]['font-size'] != undefined) ? blockCssY.items[loopItemSelector]['font-size'] : {};

        fontSizeX[breakPointX] = fontSizeVal + fontSizeUnit;
        blockCssY.items[loopItemSelector] = { ...blockCssY.items[loopItemSelector], 'font-size': fontSizeX };

      }



      if (typoX.lineHeight[breakPointX] != undefined) {

        var lineHeightVal = (typoX.lineHeight[breakPointX].val) ? typoX.lineHeight[breakPointX].val : 0;
        var lineHeightUnit = (typoX.lineHeight[breakPointX].unit) ? typoX.lineHeight[breakPointX].unit : 'px';


        var lineHeightX = (blockCssY.items[loopItemSelector]['line-height'] != undefined) ? blockCssY.items[loopItemSelector]['line-height'] : {};

        lineHeightX[breakPointX] = lineHeightVal + lineHeightUnit;

        blockCssY.items[loopItemSelector] = { ...blockCssY.items[loopItemSelector], 'line-height': lineHeightX };
      }
      if (typoX.letterSpacing[breakPointX] != undefined) {

        var letterSpacingVal = (typoX.letterSpacing[breakPointX].val) ? typoX.letterSpacing[breakPointX].val : 0;
        var letterSpacingUnit = (typoX.letterSpacing[breakPointX].unit) ? typoX.letterSpacing[breakPointX].unit : 'px';



        var letterSpacingX = (blockCssY.items[loopItemSelector]['letter-spacing'] != undefined) ? blockCssY.items[loopItemSelector]['letter-spacing'] : {};

        letterSpacingX[breakPointX] = letterSpacingVal + letterSpacingUnit;

        blockCssY.items[loopItemSelector] = { ...blockCssY.items[loopItemSelector], 'letter-spacing': letterSpacingX };
      }

      if (typoX.fontWeight[breakPointX] != undefined) {

        blockCssY.items[loopItemSelector] = { ...blockCssY.items[loopItemSelector], 'font-weight': typoX.fontWeight };

      }


      if (typoX.textDecoration[breakPointX] != undefined) {

        var str = {};

        var textDecorationX = typoX.textDecoration[breakPointX];
        var textDecorationXStr = (textDecorationX.length > 0) ? textDecorationX.join(' ') : '';

        str[breakPointX] = textDecorationXStr;

        //typoX.textDecoration[breakPointX] = typoX.textDecoration[breakPointX].join(' ');

        blockCssY.items[loopItemSelector] = { ...blockCssY.items[loopItemSelector], 'text-decoration': str };

      }
      if (typoX.textTransform[breakPointX] != undefined) {

        blockCssY.items[loopItemSelector] = { ...blockCssY.items[loopItemSelector], 'text-transform': typoX.textTransform };


      }


      if (typoX.fontFamily[breakPointX] != undefined) {

        blockCssY.items[loopItemSelector] = { ...blockCssY.items[loopItemSelector], 'font-family': typoX.fontFamily };

      }

      if (typoX.fontWeight[breakPointX] != undefined) {
        blockCssY.items[loopItemSelector] = { ...blockCssY.items[loopItemSelector], 'font-weight': typoX.fontWeight };
      }


      setAttributes({ blockCssY: { items: blockCssY.items } });



    }



    function onChangePaginationTypo(typoX) {

      setAttributes({ paginationItem: { ...paginationItem, styles: typoX } });

      var newValuesObjX = {};


      if (typoX.fontFamily[breakPointX] != undefined) {

        blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'font-family': typoX.fontFamily };

      }


      if (typoX.fontSize[breakPointX] != undefined) {

        var fontSizeVal = (typoX.fontSize[breakPointX].val) ? typoX.fontSize[breakPointX].val : 16;
        var fontSizeUnit = (typoX.fontSize[breakPointX].unit) ? typoX.fontSize[breakPointX].unit : 'px';


        var fontSizeX = (blockCssY.items[paginationItemSelector]['font-size'] != undefined) ? blockCssY.items[paginationItemSelector]['font-size'] : {};

        fontSizeX[breakPointX] = fontSizeVal + fontSizeUnit;
        blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'font-size': fontSizeX };

      }



      if (typoX.lineHeight[breakPointX] != undefined) {

        var lineHeightVal = (typoX.lineHeight[breakPointX].val) ? typoX.lineHeight[breakPointX].val : 0;
        var lineHeightUnit = (typoX.lineHeight[breakPointX].unit) ? typoX.lineHeight[breakPointX].unit : 'px';


        var lineHeightX = (blockCssY.items[paginationItemSelector]['line-height'] != undefined) ? blockCssY.items[paginationItemSelector]['line-height'] : {};

        lineHeightX[breakPointX] = lineHeightVal + lineHeightUnit;

        blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'line-height': lineHeightX };
      }
      if (typoX.letterSpacing[breakPointX] != undefined) {

        var letterSpacingVal = (typoX.letterSpacing[breakPointX].val) ? typoX.letterSpacing[breakPointX].val : 0;
        var letterSpacingUnit = (typoX.letterSpacing[breakPointX].unit) ? typoX.letterSpacing[breakPointX].unit : 'px';



        var letterSpacingX = (blockCssY.items[paginationItemSelector]['letter-spacing'] != undefined) ? blockCssY.items[paginationItemSelector]['letter-spacing'] : {};

        letterSpacingX[breakPointX] = letterSpacingVal + letterSpacingUnit;

        blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'letter-spacing': letterSpacingX };
      }

      if (typoX.fontWeight[breakPointX] != undefined) {

        blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'font-weight': typoX.fontWeight };

      }


      if (typoX.textDecoration[breakPointX] != undefined) {

        var str = {};

        var textDecorationX = typoX.textDecoration[breakPointX];
        var textDecorationXStr = (textDecorationX.length > 0) ? textDecorationX.join(' ') : '';

        str[breakPointX] = textDecorationXStr;

        //typoX.textDecoration[breakPointX] = typoX.textDecoration[breakPointX].join(' ');

        blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'text-decoration': str };

      }
      if (typoX.textTransform[breakPointX] != undefined) {

        blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'text-transform': typoX.textTransform };


      }

      setAttributes({ blockCssY: { items: blockCssY.items } });



    }





    function selectLayout(id, postContent) {



      var srcServer = layoutData.source;


      if (srcServer == 'library') {
        var blocks = parse(postContent);



        setAttributes({ layout: { id: null, srcServer: srcServer, data: blocks, rawData: postContent } })




        var allStyle = {};

        blocks.map((block, i) => {

          var items = (block.attrs.blockCssY != undefined) ? block.attrs.blockCssY.items : [];

          if (Object.entries(items).length > 0) {

            Object.entries(items).map(data => {

              var handle = data[0];
              var css = data[1];

              allStyle[handle] = css;


            })

          }

        })

        var xxx = { ...blockCssY.items, ...allStyle }

        setAttributes({ blockCssY: { items: xxx } });



      } else {
        apiFetch({
          path: '/post-grid/v2/get_post_data',
          method: 'POST',
          data: { postId: id },
        }).then((res) => {

          var postContent = res.post_content.replace(/(^[ \t]*\n)/gm, "");
          var blocks = parse(postContent);

          setAttributes({ layout: { id: id, srcServer: srcServer, data: blocks, rawData: postContent } });


          var allStyle = {};

          blocks.map((block, i) => {

            var items = (block.attrs.blockCssY != undefined) ? block.attrs.blockCssY.items : [];

            if (Object.entries(items).length > 0) {

              Object.entries(items).map(data => {

                var handle = data[0];
                var css = data[1];

                allStyle[handle] = css;


              })

            }

          })

          var xxx = { ...blockCssY.items, ...allStyle }

          setAttributes({ blockCssY: { items: xxx } });


        });

      }





      //console.log(wp.data.select('core/block-editor').getBlocks());




      //wp.data.dispatch('core/block-editor').insertBlocks(wp.blocks.parse(post_content));


      //wp.data.dispatch('core/notices').createNotice('success', 'Here is our notice!');

      //var content = "<!-- wp:paragraph --><p>paragraph one</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>then two</p><!-- /wp:paragraph -->";

      //Parse the serialized content into valid blocks using parse from @wordpress/block-serialization-default-parser
      // var gutblock = wp.blocks.rawHandler({
      //   HTML: post_content,
      // });



      //setBlocksX(gutblock)





      // setAttributes({ layout: { id: id, data: blocks, rawData: post_content } })







    }



    const [queryLayouts, setQueryLayouts] = useState({ keyword: '', page: 1, category: '', });
    var [layoutList, setLayoutList] = useState({ items: [] });
    var [layoutData, setLayoutData] = useState({ source: 'library', });
    var [layoutLoading, setLayoutLoading] = useState(false);
    var [layoutCats, setLayoutCats] = useState([]);









    useEffect(() => {

      var keywordLength = queryLayouts.keyword.length;

      if (keywordLength != 0) {

        if (keywordLength >= 4) {
          fetchLayouts();
        } else {
        }



      } else {

        fetchLayouts();
      }

    }, [layoutData]);



    useEffect(() => {

      var keywordLength = queryLayouts.keyword.length;

      if (keywordLength != 0) {

        if (keywordLength >= 4) {
          fetchLayouts();
        } else {
        }



      } else {

        fetchLayouts();
      }

    }, [queryLayouts]);













    function fetchLayouts() {

      setLayoutLoading(true);

      if (layoutData.source == 'saved') {

        apiFetch({
          path: '/post-grid/v2/get_posts_layout',
          method: 'POST',
          data: { category: queryLayouts.category, page: queryLayouts.page, keyword: queryLayouts.keyword },
        }).then((res) => {


          setLayoutList({ items: res.posts })

          setLayoutCats(res.terms)


          setLayoutLoading(false);



        });

      } else {

        fetch("https://getpostgrid.com/wp-json/postlayout/v2/get_post_layouts?category=" + queryLayouts.category + "&page=" + queryLayouts.page + "&keyword=" + queryLayouts.keyword, {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        })
          .then((response) => {
            if (response.ok && response.status < 400) {
              response.json().then((data) => {

                setLayoutList({ items: data.posts })
                setLayoutCats(data.terms)


                setLayoutLoading(false);


              });
            }
          })
          .catch((_error) => {
            //this.saveAsStatus = 'error';
            // handle the error
          });

      }













    }

    function fetchLayoutData() {

      setQueryLayouts({ keyword: queryLayouts.keyword, page: queryLayouts.page, category: queryLayouts.category, });

      apiFetch({
        path: '/post-grid/v2/get_posts_layout',
        method: 'POST',
        data: { category: queryLayouts.category, source: queryLayouts.source, page: queryLayouts.page, keyword: queryLayouts.keyword },
      }).then((_res) => {


        setLayoutData({ source: layoutData.source, })
        setQueryLayouts({ keyword: queryLayouts.keyword, page: queryLayouts.page, category: queryLayouts.category, });


      });












    }




    function generateQueryFieldAuthorIn(_xx) {


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



    function updateQueryPram(newVal, index) {

      var itemData = queryArgs.items[index];


      itemData.val = newVal;
      queryArgs.items[index] = itemData;
      setAttributes({ queryArgs: { items: queryArgs.items } });


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



    }




    function generateQueryArgOptions(item, index) {




      return (


        <div className=' '>

          <PanelBody title={<RemoveQueryPram title={item.label} index={index} />} initialOpen={false}>

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


                <PGproWrapper utmUrl={"?utm_source=editor&utm_term=postGridBlock&utm_campaign=pluginPostGrid&utm_medium=postGridBlock-metaQuery"}>
                  <p> <span className='underline'>Meta Query</span> Only avilable in Premium</p>
                </PGproWrapper>





                <div className={(postGridData.license_status != 'active') ? '' : ''}>
                  <div
                    className='cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-blue-600 text-sm'
                    onClick={(_ev) => {
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
                              onClick={(_ev) => {

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
                              onClick={(_ev) => {

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
              </div>
            }


            {item.id == 'dateQuery' &&
              <div>

                <PGproWrapper utmUrl={"?utm_source=editor&utm_term=postGridBlock&utm_campaign=pluginPostGrid&utm_medium=postGridBlock-dateQuery"}>
                  <p> <span className='underline'>Date Query</span> Only avilable in Premium</p>
                </PGproWrapper>



                <PanelRow className='my-3'>
                  <label>Add Arguments</label>
                  <SelectControl

                    options={[
                      { "value": "", "label": "Select..." },

                      { "value": "year", "label": "Year" },
                      { "value": "month", "label": "Month" },
                      { "value": "week", "label": "Week" },
                      { "value": "day", "label": "Day" },
                      { "value": "hour", "label": "Hour" },
                      { "value": "minute", "label": "Minute" },
                      { "value": "second", "label": "Second" },
                      { "value": "after", "label": "After" },
                      { "value": "before", "label": "Before" },
                      { "value": "inclusive", "label": "Inclusive" },
                      { "value": "compare", "label": "Compare" },
                      { "value": "column", "label": "Column" },
                      { "value": "relation", "label": "Relation" },
                    ]}
                    onChange={(newVal) => {

                      var itemData = queryArgs.items[index];



                      if (newVal == 'year') {
                        var xx = itemData.val.concat({ id: 'year', value: '', compare: '', });
                      }
                      if (newVal == 'month') {
                        var xx = itemData.val.concat({ id: 'month', value: '', compare: '', });
                      }
                      if (newVal == 'week') {
                        var xx = itemData.val.concat({ id: 'week', value: '', compare: '', });
                      }
                      if (newVal == 'day') {
                        var xx = itemData.val.concat({ id: 'day', value: '', compare: '', });
                      }
                      if (newVal == 'hour') {
                        var xx = itemData.val.concat({ id: 'hour', value: '', compare: '', });
                      }
                      if (newVal == 'minute') {
                        var xx = itemData.val.concat({ id: 'minute', value: '', compare: '', });
                      }
                      if (newVal == 'second') {
                        var xx = itemData.val.concat({ id: 'second', value: '', compare: '', });
                      }
                      if (newVal == 'inclusive') {
                        var xx = itemData.val.concat({ id: 'inclusive', value: true, });
                      }
                      if (newVal == 'compare') {
                        var xx = itemData.val.concat({ id: 'compare', value: '', });
                      }
                      if (newVal == 'column') {
                        var xx = itemData.val.concat({ id: 'column', value: '', });
                      }
                      if (newVal == 'relation') {
                        var xx = itemData.val.concat({ id: 'relation', value: '', });
                      }
                      if (newVal == 'before') {
                        var xx = itemData.val.concat({ id: 'before', value: '', year: '', month: '', day: '' });

                      }

                      if (newVal == 'after') {
                        var xx = itemData.val.concat({ id: 'after', value: '', year: '', month: '', day: '' });

                      }

                      queryArgs.items[index].val = xx;




                      setAttributes({ queryArgs: { items: queryArgs.items } });

                    }}
                  />

                </PanelRow>


                {item.val.map((x, j) => {

                  return (


                    <div>














                      <PanelBody title={x.id} initialOpen={false}>

                        <span
                          className='cursor-pointer px-3 py-1 text-white bg-red-600 text-sm my-2 inline-block'
                          onClick={(_ev) => {

                            queryArgs.items[index].val.splice(j, 1);
                            setAttributes({ queryArgs: { items: queryArgs.items } });

                          }}

                        >Delete</span>


                        {(x.id == 'after' || x.id == 'before') && (

                          <div>
                            <PanelRow>
                              <label>Year</label>
                              <InputControl
                                placeholder=""
                                onChange={(newVal) => {



                                  //clearTimeout(debounce);
                                  // debounce = setTimeout(() => {

                                  queryArgs.items[index].val[j].year = newVal;
                                  setAttributes({ queryArgs: { items: queryArgs.items } });
                                  //}, 1000);





                                }}
                              />
                            </PanelRow>

                            <PanelRow>
                              <label>Month</label>
                              <InputControl
                                placeholder=""
                                onChange={(newVal) => {


                                  // clearTimeout(debounce);
                                  //debounce = setTimeout(() => {

                                  queryArgs.items[index].val[j].month = newVal;
                                  setAttributes({ queryArgs: { items: queryArgs.items } });
                                  //}, 1000);



                                }}
                              />
                            </PanelRow>

                            <PanelRow>
                              <label>Day</label>
                              <InputControl
                                placeholder=""
                                onChange={(newVal) => {


                                  clearTimeout(debounce);
                                  debounce = setTimeout(() => {

                                    queryArgs.items[index].val[j].day = newVal;
                                    setAttributes({ queryArgs: { items: queryArgs.items } });
                                  }, 1000);




                                }}
                              />
                            </PanelRow>

                          </div>
                        )}


                        {x.id == 'inclusive' && (

                          <div>
                            <SelectControl
                              style={{ margin: 0 }}

                              options={[
                                { label: 'True', value: true },
                                { label: 'False', value: false },

                              ]}
                              onChange={(newVal) => {
                                queryArgs.items[index].val[j].value = newVal;
                                setAttributes({ queryArgs: { items: queryArgs.items } });
                              }}
                            />


                          </div>
                        )}




                        {x.id == 'compare' && (

                          <div>

                            <SelectControl
                              style={{ margin: 0 }}

                              options={[
                                { label: '=', value: '=' },
                                { label: '!=', value: '!=' },
                                { label: '>', value: '>' },
                                { label: '>=', value: '>=' },
                                { label: '<', value: '<' },
                                { label: '<=', value: '<=' },
                                { label: 'IN', value: 'IN' },
                                { label: 'NOT IN', value: 'NOT IN' },
                                { label: 'EXISTS', value: 'EXISTS' },
                                { label: 'NOT EXISTS', value: 'NOT EXISTS' },
                                { label: 'BETWEEN', value: 'BETWEEN' },
                                { label: 'NOT BETWEEN', value: 'NOT BETWEEN' },

                              ]}
                              onChange={(newVal) => {
                                queryArgs.items[index].val[j].value = newVal;
                                setAttributes({ queryArgs: { items: queryArgs.items } });
                              }}
                            />

                          </div>
                        )}
                        {x.id == 'column' && (

                          <div>
                            <InputControl
                              placeholder=""
                              onChange={(newVal) => {



                                clearTimeout(debounce);
                                debounce = setTimeout(() => {

                                  queryArgs.items[index].val[j].value = newVal;
                                  setAttributes({ queryArgs: { items: queryArgs.items } });
                                }, 1000);



                              }}
                            />


                          </div>
                        )}

                        {x.id == 'relation' && (

                          <div>

                            <SelectControl
                              style={{ margin: 0 }}

                              options={[
                                { label: 'OR', value: 'OR' },
                                { label: 'AND', value: 'AND' },
                              ]}
                              onChange={(newVal) => {
                                queryArgs.items[index].val[j].value = newVal;
                                setAttributes({ queryArgs: { items: queryArgs.items } });
                              }}
                            />

                          </div>
                        )}


                        {


                          ((x.id == 'year' || x.id == 'month' || x.id == 'week' || x.id == 'day' || x.id == 'hour' || x.id == 'minute' || x.id == 'second') && (

                            <div>
                              <InputControl
                                label="Value"
                                placeholder=""
                                onChange={(newVal) => {



                                  //clearTimeout(debounce);
                                  //debounce = setTimeout(() => {

                                  queryArgs.items[index].val[j].value = newVal;
                                  setAttributes({ queryArgs: { items: queryArgs.items } });
                                  //}, 1000);


                                }}
                              />

                              <SelectControl
                                style={{ margin: 0 }}
                                label="compare "

                                options={[
                                  { label: '=', value: '=' },
                                  { label: '!=', value: '!=' },
                                  { label: '>', value: '>' },
                                  { label: '>=', value: '>=' },
                                  { label: '<', value: '<' },
                                  { label: '<=', value: '<=' },
                                  { label: 'IN', value: 'IN' },
                                  { label: 'NOT IN', value: 'NOT IN' },
                                  { label: 'EXISTS', value: 'EXISTS' },
                                  { label: 'NOT EXISTS', value: 'NOT EXISTS' },
                                  { label: 'BETWEEN', value: 'BETWEEN' },
                                  { label: 'NOT BETWEEN', value: 'NOT BETWEEN' },
                                ]}
                                onChange={(newVal) => {
                                  queryArgs.items[index].val[j].compare = newVal;
                                  setAttributes({ queryArgs: { items: queryArgs.items } });
                                }}
                              />



                            </div>

                          ))





                        }




                      </PanelBody>
                    </div>

                  )

                })}



              </div>
            }

            {item.id == 'taxQuery' &&
              <div >

                <PGproWrapper utmUrl={"?utm_source=editor&utm_term=postGridBlock&utm_campaign=pluginPostGrid&utm_medium=postGridBlock-postQueryargsTaxonomy"}>
                  <p> <span className='underline'>Taxonomy Query</span> Only avilable in Premium</p>
                </PGproWrapper>



                <div className={(postGridData.license_status != 'active') ? '' : ''}>


                  <div
                    className='cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-blue-600 text-sm'
                    onClick={(_ev) => {
                      var itemData = queryArgs.items[index];
                      var xx = itemData.val.concat({ terms: [{ taxonomy: '', field: '', terms: [], operator: '' }], relation: 'OR' });
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
                              onClick={(_ev) => {

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
                                    value={y.terms.join(',')}
                                    placeholder="Comma separated"
                                    onChange={(newVal) => {
                                      var itemData = queryArgs.items[index];

                                      var term = itemData.val[j].terms[k]
                                      term.terms = newVal.split(',');

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
                                        { label: 'Choose...', value: '' },

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
                                        { label: 'Choose...', value: '' },

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


                                  <div
                                    className='cursor-pointer block text-center my-2 px-3 py-1 text-white bg-red-600 text-sm'
                                    onClick={(_ev) => {

                                      var itemData = queryArgs.items[index];
                                      var terms = itemData.val[j].terms

                                      var xx = itemData.val[j].terms.splice(k, 1);
                                      queryArgs.items[index].val = itemData.val;
                                      setAttributes({ queryArgs: { items: queryArgs.items } });
                                    }}

                                  >Remove</div>
                                </div>
                              )
                            })}
                            <div
                              className='cursor-pointer text-center px-3 py-1 text-white bg-blue-600 text-sm'
                              onClick={(_ev) => {

                                var itemData = queryArgs.items[index];

                                var xx = itemData.val[j].terms.concat({ taxonomy: '', field: '', terms: [], operator: '' });
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
              </div>
            }





            {(item.id == 'metaKey' || item.id == 's' || item.id == 'metaValue' || item.id == 'metaValueNum' || item.id == 'metaCompare' || item.id == 'year' || item.id == 'monthnum' || item.id == 'w' || item.id == 'day' || item.id == 'hour' || item.id == 'minute' || item.id == 'second' || item.id == 'm' || item.id == 'author' || item.id == 'authorName' || item.id == 'tag' || item.id == 'tagId' || item.id == 'cat' || item.id == 'categoryName' || item.id == 'p' || item.id == 'name' || item.id == 'pageId' || item.id == 'pagename' || item.id == 'postParent' || item.id == 'postsPerPage' || item.id == 'paged' || item.id == 'offset' || item.id == 'postsPerArchivePage' || item.id == 'perm') &&

              <div >
                <InputControl
                  value={item.val}
                  onChange={(newVal) => {


                    clearTimeout(debounce);
                    debounce = setTimeout(() => {

                      updateQueryPram(newVal, index)

                    }, 1000);

                  }}
                />


              </div>

            }


            {(item.id == 'postParent' || item.id == 'postPassword') &&

              <div >

                <PGproWrapper utmUrl={"?utm_source=editor&utm_term=postGridBlock&utm_campaign=pluginPostGrid&utm_medium=postGridBlock-postQueryArgs"}>
                  <p> <span className='underline'>Post Parent, Post Password</span> Only avilable in Premium</p>
                </PGproWrapper>



                <InputControl
                  value={item.val}
                  onChange={(newVal) => updateQueryPram(newVal, index)}
                />


              </div>

            }


            {(item.id == 'postNameIn' || item.id == 'authorIn' || item.id == 'authorNotIn' || item.id == 'postNotIn' || item.id == 'postIn' || item.id == 'postParentNotIn' || item.id == 'tagNotIn' || item.id == 'tagAnd' || item.id == 'tagIn' || item.id == 'postParentIn' || item.id == 'tagSlugIn' || item.id == 'tagSlugAnd' || item.id == 'categoryNotIn' || item.id == 'categoryIn' || item.id == 'categoryAnd') &&

              <div>

                <PGproWrapper utmUrl={"?utm_source=editor&utm_term=postGridBlock&utm_campaign=pluginPostGrid&utm_medium=postGridBlock-postQueryArgs"}>
                  <p>Only avilable in Premium</p>
                </PGproWrapper>





                <InputControl
                  value={item.val}
                  placeholder="Comma separated"
                  onChange={(newVal) => updateQueryPram(newVal, index)}
                />


              </div>

            }

            <div className={item.id == 'postNameIndd' ? '' : 'hidden'}>
              <div
                className='cursor-pointer text-center px-3 py-1 text-white bg-blue-600 text-sm'
                onClick={(_ev) => {

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
            {(item.id == 'cacheResults' || item.id == 'nopaging' || item.id == 'hasPassword' || item.id == 'updatePostMetaCache' || item.id == 'updatePostTermCache') &&
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




            {(item.id == 'ignoreStickyPosts') &&
              <div >

                <PGproWrapper utmUrl={"?utm_source=editor&utm_term=postGridBlock&utm_campaign=pluginPostGrid&utm_medium=postGridBlock-stickyPost"}>
                  <p> <span className='underline'>Ignore Sticky Posts</span> Only avilable in Premium</p>
                </PGproWrapper>




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


    function addQueryPramX(_option, index) {


      var attrExist = false;

      var data = queryPrams[index];
      var multiple = data.multiple;

      var isExist = queryArgs.items.map((item) => {

        if (item.id == index) {
          return true;
        }
      })


      var items = queryArgs.items.concat([data])
      setAttributes({ queryArgs: { items: items } });

    }





    var RemoveQueryPram = function ({ title, index }) {

      return (

        <>
          <span className='cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1' onClick={ev => {


            queryArgs.items.splice(index, 1);
            setAttributes({ queryArgs: { items: queryArgs.items } });

          }}><Icon icon={close} /></span>
          <span className='mx-2'>{title}</span>
        </>




      )

    }




    function deleteGridColumn(i) {



      grid.styles.gridTemplateColumns[breakPointX].splice(i, 1)
      var styles = { ...grid.styles, gridTemplateColumns: grid.styles.gridTemplateColumns };
      setAttributes({ grid: { ...grid, styles: styles } });




    }

    function deleteGridRow(i) {


      grid.styles.gridTemplateRows[breakPointX].splice(i, 1)
      var styles = { ...grid.styles, gridTemplateRows: grid.styles.gridTemplateRows };
      setAttributes({ grid: { ...grid, styles: styles } });



    }






    return (
      [


        <div>
          <InspectorControls key="general">



            <div className='post-grid '>

              <PanelBody title="Layouts" initialOpen={false}>


                <div className='text-white cursor-pointer'>


                  <div className={(layoutData.source == 'library') ? 'bg-blue-500 w-1/2 inline-block px-3 py-2 text-[14px] font-bold' : 'bg-blue-300 text-[14px] font-bold inline-block px-3 py-2 w-1/2'}
                    onClick={(_ev) => {

                      setLayoutData({ source: 'library', })


                    }}

                  >Library</div>
                  <div className={(layoutData.source == 'saved') ? 'bg-blue-500 w-1/2 inline-block px-3 py-2 text-[14px] font-bold' : 'bg-blue-300 inline-block px-3 py-2 w-1/2 text-[14px] font-bold'} onClick={(_ev) => {

                    setLayoutData({ source: 'saved' })
                  }}>Saved</div>

                </div>



                <PanelRow>
                  <InputControl
                    value={queryLayouts.keyword}
                    type="text"
                    placeholder="Search Layouts..."
                    onChange={(newVal) => {
                      clearTimeout(debounce);
                      debounce = setTimeout(() => {

                        setQueryLayouts({ keyword: newVal, page: queryLayouts.page, category: queryLayouts.category })
                      }, 1000);

                      //fetchLayouts();
                    }}

                  />
                  <SelectControl
                    className='w-full'
                    style={{ margin: 0 }}
                    label=""
                    value={queryLayouts.category}
                    options={layoutCats}
                    onChange={(newVal) => {

                      setQueryLayouts({ keyword: queryLayouts.keyword, page: queryLayouts.page, category: newVal })
                      //fetchLayouts();


                    }}
                  />
                </PanelRow>


                {layoutData.source == 'saved' && (
                  <div className='flex gap-2	'>
                    <div className='w-full rounded-sm  py-2 bg-blue-500 text-[14px] font-bold text-white cursor-pointer my-3 text-center '><a className=' ' target="_blank" href={clientData.siteAdminurl + 'edit.php?post_type=post_grid_template'}>All Layouts</a></div>

                    <div className='w-full rounded-sm  py-2 bg-blue-500 text-[14px] font-bold text-white cursor-pointer my-3 text-center '><a className='' target="_blank" href={clientData.siteAdminurl + 'post-new.php?post_type=post_grid_template'}>Create Layout</a></div>



                  </div>
                )}


                {layoutLoading == true && <div className='text-center'>

                  <Spinner />
                </div>}


                {layoutLoading == false && layoutList.items.length > 0 && layoutList.items.map(x => {
                  return (
                    <div className='my-4 border bg-gray-200 ' >

                      <div className='relative cursor-pointer' onClick={(_ev) => {
                        selectLayout(x.post_id, x.post_content)
                      }}>
                        {layout.id == x.post_id && (
                          <span className='absolute bg-amber-500 text-white px-2 py-1 top-0 right-0'><span class="dashicons dashicons-saved"></span> Selected</span>
                        )}

                        <img className='w-full' src={x.thumb_url} />

                        <div className='text-[14px] p-1 bg-gray-500 text-white bg-opacity-80 text-bold  text-center' >{x.post_title}</div>
                      </div>


                      <div className='py-3 flex justify-items-stretch'>

                        {layoutData.source != 'library' && (

                          <span className='mx-1 inline-block bg-blue-500 hover:bg-blue-400 px-2 py-1 text-white rounded-sm cursor-pointer' > <a target="_blank" href={clientData.siteAdminurl + 'post.php?post=' + x.post_id + '&action=edit'}>Edit</a> </span>
                        )}


                        <span className='mx-1 inline-block bg-blue-500 hover:bg-blue-400 px-2 py-1 text-white rounded-sm cursor-pointer' >#{x.post_id}</span>

                        {/* {(postGridData.license_status != 'active') && (
                          
                        )} */}


                        {layoutData.source == 'library' && (

                          <>
                            <div className='mx-1 relative inline-block bg-blue-500 hover:bg-blue-400 px-2 py-1 text-white rounded-sm cursor-pointer' onClick={ev => {
                              if (postGridData.license_status == 'active') {

                                if (!importLayoutOpen.isOpen) {
                                  setlayoutImporting(true);
                                  importLayout(x);
                                }



                              }
                              setimportLayoutOpen({ id: x.post_id, isOpen: !importLayoutOpen.isOpen });


                            }} ><span class="dashicons dashicons-download"></span> Import</div>
                            {importLayoutOpen.id == x.post_id && importLayoutOpen.isOpen && (
                              <Popover position="bottom left p-2 ">
                                {postGridData.license_status != 'active' && (
                                  <div className='w-48 bg-amber-100 px-3 py-2'>
                                    <p className=''> <span className='underline'>Importing Layouts</span> Only avilable in Premium</p>
                                    <p className=''>After import the layout you customize and make your own.</p>


                                  </div>
                                )}

                                {postGridData.license_status == 'active' && (
                                  <div className='w-48 bg-sky-300 px-3 py-2'>


                                    {layoutImporting && (
                                      <span><Spinner /> Importing</span>
                                    )}

                                    {!layoutImporting && (
                                      <p className=''>Layout imported and saved under <a target="_blank" className='font-bold underline ' href={postGridData.siteAdminurl + 'edit.php?post_type=post_grid_template'}>Saved Templates</a></p>
                                    )}



                                  </div>
                                )}



                              </Popover>
                            )}
                          </>
                        )}

                        {/* {x.sale_price > 0 &&
                          (
                            <span className='mx-2 hidden' >Price:
                              <del className='ml-2' >{x.price} </del>-<span className='' >{x.sale_price}USD </span>
                            </span>
                          )
                        }
                        {x.sale_price == 0 &&
                          (
                            <span className='mx-2 hidden' >Price:
                              <span className='' > ${x.sale_price}</span>
                            </span>
                          )
                        } */}

                        {/* 
                        <span title='Buy To Download' className={['text-white px-3 py-1 mx-2', x.is_pro ? ' bg-amber-400' : ' bg-blue-600'].join('')}>
                          {x.is_pro ? 'Buy Now' : 'Free'}
                        </span> */}

                      </div>

                    </div>
                  )
                })}

                <div className='w-full rounded-sm  py-2 bg-blue-500 text-[14px] font-bold text-white cursor-pointer my-3 text-center' onClick={(_ev) => {

                  var page = queryLayouts.page + 1;

                  setQueryLayouts({ keyword: queryLayouts.keyword, page: page, category: queryLayouts.category, });

                }}>
                  {layoutLoading.loading == true && <span className='text-center'>

                    <Spinner />
                  </span>}


                  Load More
                </div>

                <PanelRow>




                </PanelRow>


              </PanelBody>

              <PanelBody title="Query Post" initialOpen={false}>

                <PanelRow className='my-3'>
                  <label>Add Query Parameters</label>
                  <PGDropdown position="bottom right" variant="secondary" options={queryPramsX} buttonTitle="Choose" onChange={addQueryPramX} values=""></PGDropdown>



                </PanelRow>


                {queryArgs.items.map((item, index) => {

                  return generateQueryArgOptions(item, index);

                })



                }



                <PGproWrapper utmUrl={"?utm_source=editor&utm_term=postGridBlock&utm_campaign=pluginPostGrid&utm_medium=postGridBlock-queryPreset"}>
                  <p> <span className='underline'>Query Presets</span> Only avilable in Premium</p>
                </PGproWrapper>

                <PanelRow className='mb-4'>
                  <label for="">Query Presets</label>
                  <PGDropdown position="bottom right" variant="secondary" options={queryPresets} buttonTitle="Choose" onChange={addQueryPreset} values={''}></PGDropdown>
                </PanelRow>



              </PanelBody>


              <PanelBody title="Grid Settings" initialOpen={false}>


                <PanelRow className='my-3'>
                  <Button onClick={_ev => {

                    var gridTemplateColumns = grid.styles.gridTemplateColumns;

                    if (Object.keys(grid.styles.gridTemplateColumns).length == 0) {
                      gridTemplateColumns[breakPointX] = [{ val: 1, unit: 'fr' }];
                    } else {
                      var sds = (gridTemplateColumns[breakPointX] != undefined) ? gridTemplateColumns[breakPointX].concat({ val: 1, unit: 'fr' }) : [{ val: 1, unit: 'fr' }];

                      gridTemplateColumns[breakPointX] = sds;
                    }

                    var styles = { ...grid.styles, gridTemplateColumns: gridTemplateColumns };

                    setAttributes({ grid: { ...grid, styles: styles } });

                  }} className='my-3 !bg-blue-600 !text-white'  >Add Column</Button>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                </PanelRow>







                {grid.styles.gridTemplateColumns[breakPointX] != undefined && grid.styles.gridTemplateColumns[breakPointX].map((item, index) => {
                  return (

                    <PanelRow>
                      <InputControl
                        value={item.val}
                        type="number"
                        onChange={(newVal) => {
                          var newValuesObj = {};
                          if (Object.keys(grid.styles.gridTemplateColumns).length == 0) {
                            newValuesObj[breakPointX] = { val: newVal, unit: 'em' };
                          } else {
                            var gridTemplateColumns = grid.styles.gridTemplateColumns;
                            var sds = gridTemplateColumns[breakPointX].map((x, i) => { return (index == i) ? { val: newVal, unit: x.unit, } : x })

                            newValuesObj[breakPointX] = sds;
                          }
                          var styles = { ...grid.styles, gridTemplateColumns: newValuesObj };
                          setAttributes({ grid: { ...grid, styles: styles } });

                        }}

                      />
                      <SelectControl className='mb-0'
                        value={item.unit}
                        options={[
                          { label: 'fr', value: 'fr' },
                          { label: 'px', value: 'px' },
                          { label: '%', value: '%' },
                          { label: 'em', value: 'em' },
                        ]}
                        onChange={(newVal) => {

                          var newValuesObj = {};
                          if (Object.keys(grid.styles.gridTemplateColumns).length == 0) {
                            newValuesObj[breakPointX] = { val: newVal, unit: 'em' };
                          } else {
                            var gridTemplateColumns = grid.styles.gridTemplateColumns;
                            var sds = gridTemplateColumns[breakPointX].map((x, i) => { return (index == i) ? { val: x.val, unit: newVal } : x })

                            newValuesObj[breakPointX] = sds;
                          }

                          var styles = { ...grid.styles, gridTemplateColumns: newValuesObj };
                          setAttributes({ grid: { ...grid, styles: styles } });
                        }}
                      />
                      <Button icon="no-alt"
                        onClick={(_ev) => { deleteGridColumn(index) }}

                      ></Button>

                    </PanelRow>


                  )
                })}


                <PanelRow className='my-3'>

                  <Button onClick={_ev => {
                    var gridTemplateRows = grid.styles.gridTemplateRows;

                    if (Object.keys(grid.styles.gridTemplateRows).length == 0) {
                      gridTemplateRows[breakPointX] = [{ val: 1, unit: 'fr' }];
                    } else {
                      var sds = (gridTemplateRows[breakPointX] != undefined) ? gridTemplateRows[breakPointX].concat({ val: 1, unit: 'fr' }) : [{ val: 1, unit: 'fr' }];

                      gridTemplateRows[breakPointX] = sds;
                    }

                    var styles = { ...grid.styles, gridTemplateRows: gridTemplateRows };
                    setAttributes({ grid: { ...grid, styles: styles } });

                  }} className='my-3 !bg-blue-600 !text-white'  >Add Row</Button>

                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                </PanelRow>




                {grid.styles.gridTemplateRows[breakPointX] != undefined && grid.styles.gridTemplateRows[breakPointX].map((item, index) => {
                  return (

                    <PanelRow>
                      <InputControl
                        value={item.val}
                        type="number"
                        onChange={(newVal) => {
                          var newValuesObj = {};
                          if (Object.keys(grid.styles.gridTemplateRows).length == 0) {
                            newValuesObj[breakPointX] = { val: newVal, unit: 'em' };
                          } else {
                            var gridTemplateRows = grid.styles.gridTemplateRows;
                            var sds = gridTemplateRows[breakPointX].map((x, i) => { return (index == i) ? { val: newVal, unit: x.unit, } : x })

                            newValuesObj[breakPointX] = sds;
                          }
                          var styles = { ...grid.styles, gridTemplateRows: newValuesObj };
                          setAttributes({ grid: { ...grid, styles: styles } });

                        }}

                      />
                      <SelectControl className='mb-0'
                        value={item.unit}
                        options={[
                          { label: 'fr', value: 'fr' },
                          { label: 'px', value: 'px' },
                          { label: '%', value: '%' },
                          { label: 'em', value: 'em' },
                        ]}
                        onChange={(newVal) => {

                          var newValuesObj = {};
                          if (Object.keys(grid.styles.gridTemplateRows).length == 0) {
                            newValuesObj[breakPointX] = { val: newVal, unit: 'em' };
                          } else {
                            var gridTemplateRows = grid.styles.gridTemplateRows;
                            var sds = gridTemplateRows[breakPointX].map((x, i) => { return (index == i) ? { val: x.val, unit: newVal } : x })

                            newValuesObj[breakPointX] = sds;
                          }

                          var styles = { ...grid.styles, gridTemplateRows: newValuesObj };
                          setAttributes({ grid: { ...grid, styles: styles } });
                        }}
                      />
                      <Button icon="no-alt"
                        onClick={(_ev) => { deleteGridRow(index) }}

                      ></Button>

                    </PanelRow>


                  )
                })}


                <PanelRow className='my-3'>
                  <label>Column Gap</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                </PanelRow>
                <PanelRow>
                  <InputControl
                    value={(grid.styles.colGap[breakPointX] != undefined ? grid.styles.colGap[breakPointX].val : 1)}
                    type="number"
                    onChange={(newVal) => {


                      var newValuesObj = {};
                      if (Object.keys(grid.styles.colGap).length == 0) {
                        newValuesObj[breakPointX] = { val: newVal, unit: 'em' };
                      } else {
                        newValuesObj = grid.styles.colGap;
                        var unit = (newValuesObj[breakPointX] != undefined) ? newValuesObj[breakPointX].unit : 'em';

                        newValuesObj[breakPointX] = { val: newVal, unit: unit };
                      }


                      var styles = { ...grid.styles, colGap: newValuesObj };
                      setAttributes({ grid: { ...grid, styles: styles } });


                    }}

                  />
                  <SelectControl className='mb-0'
                    value={(grid.styles.colGap[breakPointX] != undefined) ? grid.styles.colGap[breakPointX].unit : 'em'}
                    options={[
                      { label: 'fr', value: 'fr' },
                      { label: 'px', value: 'px' },
                      { label: '%', value: '%' },
                      { label: 'em', value: 'em' },
                    ]}
                    onChange={(newVal) => {

                      var newValuesObj = {};
                      if (Object.keys(grid.styles.colGap).length == 0) {
                        newValuesObj[breakPointX] = { val: 1, unit: newVal };
                      } else {
                        var val = (newValuesObj[breakPointX] != undefined) ? newValuesObj[breakPointX].val : 1;

                        newValuesObj = grid.styles.colGap;
                        newValuesObj[breakPointX] = { val: val, unit: newVal };
                      }


                      var styles = { ...grid.styles, colGap: newValuesObj };
                      setAttributes({ grid: { ...grid, styles: styles } });


                    }}
                  />


                </PanelRow>

                <PanelRow className='my-3'>
                  <label>Row Gap</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                </PanelRow>
                <PanelRow>
                  <InputControl
                    value={(grid.styles.rowGap[breakPointX] != undefined ? grid.styles.rowGap[breakPointX].val : 1)}
                    type="number"
                    onChange={(newVal) => {


                      var newValuesObj = {};
                      if (Object.keys(grid.styles.rowGap).length == 0) {
                        newValuesObj[breakPointX] = { val: newVal, unit: 'em' };
                      } else {
                        var unit = (newValuesObj[breakPointX] != undefined) ? newValuesObj[breakPointX].unit : 'em';

                        newValuesObj = grid.styles.rowGap;
                        newValuesObj[breakPointX] = { val: newVal, unit: unit };
                      }


                      var styles = { ...grid.styles, rowGap: newValuesObj };
                      setAttributes({ grid: { ...grid, styles: styles } });


                    }}

                  />
                  <SelectControl className='mb-0'
                    value={(grid.styles.rowGap[breakPointX] != undefined) ? grid.styles.rowGap[breakPointX].unit : 'em'}
                    options={[
                      { label: 'fr', value: 'fr' },
                      { label: 'px', value: 'px' },
                      { label: '%', value: '%' },
                      { label: 'em', value: 'em' },
                    ]}
                    onChange={(newVal) => {

                      var newValuesObj = {};
                      if (Object.keys(grid.styles.rowGap).length == 0) {
                        newValuesObj[breakPointX] = { val: 1, unit: newVal };
                      } else {
                        var val = (newValuesObj[breakPointX] != undefined) ? newValuesObj[breakPointX].val : 'em';

                        newValuesObj = grid.styles.rowGap;
                        newValuesObj[breakPointX] = { val: val, unit: newVal };
                      }


                      var styles = { ...grid.styles, rowGap: newValuesObj };
                      setAttributes({ grid: { ...grid, styles: styles } });


                    }}
                  />


                </PanelRow>



                {(postGridData.license_status != 'active') && grid.options.itemCss[breakPointX] != undefined && Object.entries(grid.options.itemCss[breakPointX]).length > 0 && (

                  <PGproWrapper utmUrl={"?utm_source=editor&utm_term=postGridBlock&utm_campaign=pluginPostGrid&utm_medium=postGridBlock-nthcss"}>
                    <p> <span className='underline'>N'th Item CSS</span> Only avilable in Premium</p>
                  </PGproWrapper>

                )}

                <div >

                  <PanelRow>

                    <label for="">N'th Item CSS</label>
                    <Button className='my-3' variant="secondary"
                      onClick={(_newVal) => {

                        if (grid.options.itemCss[breakPointX] != undefined) {

                          var ssd = grid.options.itemCss[breakPointX].concat({ 'grid-column-start': '', 'grid-column-end': '', 'grid-row-start': '', 'grid-row-end': '' })
                        } else {
                          grid.options.itemCss[breakPointX] = [];
                          var ssd = grid.options.itemCss[breakPointX].concat({ 'grid-column-start': '', 'grid-column-end': '', 'grid-row-start': '', 'grid-row-end': '' })

                        }




                        var newValuesObj = {};
                        if (Object.keys(grid.options.itemCss).length == 0) {
                          newValuesObj[breakPointX] = ssd;
                        } else {
                          newValuesObj = grid.options.itemCss;
                          newValuesObj[breakPointX] = ssd;
                        }

                        var options = { ...grid.options, itemCss: newValuesObj };
                        setAttributes({ grid: { ...grid, options: options } });



                      }}

                    >Add</Button>
                  </PanelRow>





                  {grid.options.itemCss[breakPointX] != undefined &&
                    grid.options.itemCss[breakPointX].map((x, i) => {

                      return (

                        <PanelBody title={(i + 1) + '\'th Item'} initialOpen={false} >

                          <Button icon="no-alt" variant="secondary"
                            onClick={(_ev) => {

                              grid.options.itemCss[breakPointX].splice(i, 1);

                              var options = { ...grid.options, itemCss: grid.options.itemCss }
                              setAttributes({ grid: { ...grid, options: options } })

                            }}

                          >Delete</Button>

                          <PanelRow>
                            <label for="">grid-column-start</label>
                            <InputControl
                              value={x['grid-column-start']}
                              type="number"
                              onChange={(newVal) => {
                                grid.options.itemCss[breakPointX][i]['grid-column-start'] = newVal;

                                var options = { ...grid.options, itemCss: grid.options.itemCss }
                                setAttributes({ grid: { ...grid, options: options } })



                              }}
                            />
                          </PanelRow>


                          <PanelRow>
                            <label for="">grid-column-end</label>
                            <InputControl
                              value={x['grid-column-end']}
                              type="number"
                              onChange={(newVal) => {
                                grid.options.itemCss[breakPointX][i]['grid-column-end'] = newVal;

                                var options = { ...grid.options, itemCss: grid.options.itemCss }
                                setAttributes({ grid: { ...grid, options: options } })




                              }}
                            />
                          </PanelRow>

                          <PanelRow>
                            <label for="">grid-row-start</label>
                            <InputControl
                              value={x['grid-row-start']}
                              type="number"
                              onChange={(newVal) => {
                                grid.options.itemCss[breakPointX][i]['grid-row-start'] = newVal;

                                var options = { ...grid.options, itemCss: grid.options.itemCss }
                                setAttributes({ grid: { ...grid, options: options } })



                              }}
                            />
                          </PanelRow>


                          <PanelRow>
                            <label for="">grid-row-end</label>
                            <InputControl
                              value={x['grid-row-end']}
                              type="number"
                              onChange={(newVal) => {
                                grid.options.itemCss[breakPointX][i]['grid-row-end'] = newVal;

                                var options = { ...grid.options, itemCss: grid.options.itemCss }
                                setAttributes({ grid: { ...grid, options: options } })


                              }}
                            />
                          </PanelRow>







                        </PanelBody>

                      )

                    })

                  }



                  {

                    gridLayouts.map((x, _i) => {

                      return (

                        <div className='cursor-pointer relative hover:bg-blue-200 my-3' onClick={(_ev) => {


                          //setAttributes({ grid: { options: x.data } })
                          setAttributes({ grid: x.data })


                        }}>


                          {x.icon != undefined && (
                            <div className='w-full grid-layout-prewview'>{x.icon}</div>
                          )}
                          <div className='text-[16px] p-2 bg-blue-600 text-white bg-opacity-90 text-bold  w-full text-center'>{x.title}</div>
                        </div>

                      )

                    })


                  }

                </div>


              </PanelBody>

              <PanelBody title="Loop Item" initialOpen={false} >


                <label for="">Text Color</label>

                <ColorPalette
                  color={itemWrap.styles.color[breakPointX]}
                  colors={colorsPresets}
                  enableAlpha
                  onChange={(newVal) => {

                    var newValuesObj = {};


                    if (Object.keys(itemWrap.styles.color).length == 0) {
                      newValuesObj[breakPointX] = newVal;
                    } else {
                      newValuesObj = itemWrap.styles.color;
                      newValuesObj[breakPointX] = newVal;
                    }

                    var styles = { ...itemWrap.styles, color: newValuesObj };
                    setAttributes({ itemWrap: { ...itemWrap, styles: styles } });




                    var itemsX = { ...blockCssY.items };
                    itemsX[loopItemSelector] = { ...blockCssY.items[loopItemSelector], 'color': newValuesObj };

                    setAttributes({ blockCssY: { items: itemsX } });


                  }}
                />



                <label for="">Background Color</label>


                <ColorPalette
                  color={itemWrap.styles.bgColor[breakPointX]}
                  colors={colorsPresets}
                  enableAlpha
                  onChange={(newVal) => {

                    var newValuesObj = {};


                    if (Object.keys(itemWrap.styles.bgColor).length == 0) {
                      newValuesObj[breakPointX] = newVal;
                    } else {
                      newValuesObj = itemWrap.styles.bgColor;
                      newValuesObj[breakPointX] = newVal;
                    }

                    var styles = { ...itemWrap.styles, bgColor: newValuesObj };
                    setAttributes({ itemWrap: { ...itemWrap, styles: styles } });




                    var itemsX = { ...blockCssY.items };
                    itemsX[loopItemSelector] = { ...blockCssY.items[loopItemSelector], 'background-color': newValuesObj };

                    setAttributes({ blockCssY: { items: itemsX } });




                  }}
                />



                <PanelRow>
                  <label>Padding</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                </PanelRow>
                <BoxControl
                  label=''
                  values={itemWrap.styles.padding[breakPointX]}
                  onChange={(nextValues) => { itemwrapPaddingControl(nextValues) }}
                />





                {/* <PanelRow>
                  <label>Margin</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                </PanelRow>
                <BoxControl
                  label=""
                  values={itemWrap.styles.margin[breakPointX]}
                  onChange={(nextValues) => { itemwrapMarginControl(nextValues) }}
                /> */}





                <PanelRow>
                  <div className='font-bold'>Typography</div>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                </PanelRow>

                <Typography typo={itemWrap.styles} breakPointX={breakPointX} onChange={onChangeItemWrapTypo} setAttributes={setAttributes} obj={itemWrap} />







              </PanelBody>


              <PanelBody title="Container" initialOpen={false}>


                {/* <PGcssPadding val={container.styles.padding[breakPointX]} onChange={(newVal => {




                })} /> */}









                <PanelRow>
                  <label>Padding</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                </PanelRow>
                <BoxControl
                  label=''
                  values={container.styles.padding[breakPointX]}
                  onChange={(nextValues) => { containerPaddingControl(nextValues) }}
                />

                <PanelRow>
                  <label>Margin</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                </PanelRow>
                <BoxControl
                  label=""
                  values={container.styles.margin[breakPointX]}
                  onChange={(nextValues) => { containerMarginControl(nextValues) }}
                />

                <PanelRow className='my-3'>
                  <label>Color</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                </PanelRow>

                <ColorPalette
                  value={container.styles.color[breakPointX]}
                  colors={colorsPresets}
                  enableAlpha
                  onChange={(newVal) => {
                    var newValuesObj = {};
                    if (Object.keys(container.styles.color).length == 0) {
                      newValuesObj[breakPointX] = newVal;
                    } else {
                      newValuesObj = container.styles.color;
                      newValuesObj[breakPointX] = newVal;
                    }

                    var styles = { ...container.styles, color: newValuesObj };
                    setAttributes({ container: { ...container, styles: styles } });

                    var itemsX = { ...blockCssY.items };
                    itemsX[containerSelector] = { ...blockCssY.items[containerSelector], 'color': newValuesObj };

                    setAttributes({ blockCssY: { items: itemsX } });

                  }}
                />

                <PanelRow className='my-3'>
                  <label>Background Color</label>
                  <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />

                </PanelRow>

                <ColorPalette
                  value={container.styles.bgColor[breakPointX]}
                  colors={colorsPresets}
                  enableAlpha
                  onChange={(newVal) => {
                    var newValuesObj = {};

                    if (Object.keys(container.styles.bgColor).length == 0) {
                      newValuesObj[breakPointX] = newVal;
                    } else {
                      newValuesObj = container.styles.bgColor;
                      newValuesObj[breakPointX] = newVal;
                    }

                    var styles = { ...container.styles, bgColor: newValuesObj };
                    setAttributes({ container: { ...container, styles: styles } });

                    var itemsX = { ...blockCssY.items };
                    itemsX[containerSelector] = { ...blockCssY.items[containerSelector], 'background-color': newValuesObj };

                    setAttributes({ blockCssY: { items: itemsX } });

                  }}
                />

                <label for="">Background Image</label>
                <img src={(container.styles.backgroundImage[breakPointX] != undefined) ? container.styles.backgroundImage[breakPointX].url : ''} alt="" />

                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={(media) => {
                      var newValuesObj = {};

                      if (Object.keys(container.styles.backgroundImage).length == 0) {
                        newValuesObj[breakPointX] = { id: media.id, url: media.url };
                      } else {
                        newValuesObj = container.styles.backgroundImage;
                        newValuesObj[breakPointX] = { id: media.id, url: media.url };
                      }

                      var styles = { ...container.styles, backgroundImage: newValuesObj };
                      setAttributes({ container: { ...container, styles: styles } });

                      var itemsX = { ...blockCssY.items };
                      itemsX[containerSelector] = { ...blockCssY.items[containerSelector], 'background-image': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });


                    }


                    }
                    onClose={() => {
                    }


                    }

                    allowedTypes={ALLOWED_MEDIA_TYPES}
                    value={container.styles.backgroundImage[breakPointX]}
                    render={({ open }) => (

                      <Button onClick={open}>Open Media Library</Button>


                    )}
                  />
                </MediaUploadCheck>



              </PanelBody>

              <PanelBody title="Filterable" initialOpen={false} >


                <div>
                  <Button
                    variant="secondary"
                    className='mb-2'
                    onClick={(ev) => {

                      var filters = filterable.options.filters.concat({ groupTitle: '', type: '', logic: '', showPostCount: '', items: [] })

                      var options = { ...filterable.options, filters: filters }
                      setAttributes({ filterable: { ...filterable, options: options } })



                    }}

                  >Add Filter Group</Button>


                  {filterable.options.filters.length > 1 && (
                    <PGproWrapper utmUrl={"?utm_source=editor&utm_term=postGridBlock&utm_campaign=pluginPostGrid&utm_medium=postGridBlock-multifilter"}>
                      <p> <span className='underline'>Multi Filter</span> Only avilable in Premium</p>
                    </PGproWrapper>
                  )}



                  {filterable.options.filters.map((x, i) => {



                    return (

                      <PanelBody title={(x.groupTitle) ? x.groupTitle : 'Filter Group ' + i} initialOpen={false} >

                        <span
                          onClick={(ev) => {

                            filterable.options.filters.splice(i, 1);

                            var options = { ...filterable.options, filters: filterable.options.filters }
                            setAttributes({ filterable: { ...filterable, options: options } })


                          }}
                          className='cursor-pointer px-3 py-1 inline-block text-white bg-red-600 text-sm mb-2'><span className='dashicon dashicons dashicons-no-alt'></span> Delete Group</span>


                        <PanelRow >
                          <label for="">Group Title</label>













                          <InputControl
                            value={x.groupTitle}
                            onChange={(newVal) => {
                              filterable.options.filters[i].groupTitle = newVal


                              var options = { ...filterable.options, filters: filterable.options.filters }
                              setAttributes({ filterable: { ...filterable, options: options } })


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
                              filterable.options.filters[i].type = newVal


                              var options = { ...filterable.options, filters: filterable.options.filters }
                              setAttributes({ filterable: { ...filterable, options: options } })


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
                              filterable.options.filters[i].logic = newVal


                              var options = { ...filterable.options, filters: filterable.options.filters }
                              setAttributes({ filterable: { ...filterable, options: options } })


                            }}
                          />

                        </PanelRow>


                        <PanelRow >
                          <label for="">Show Post Count</label>

                          <SelectControl
                            value={x.showPostCount}
                            options={[
                              { value: 'no', label: 'No' },
                              { value: 'yes', label: 'Yes' },

                            ]}
                            onChange={(newVal) => {
                              filterable.options.filters[i].showPostCount = newVal

                              var options = { ...filterable.options, filters: filterable.options.filters }
                              setAttributes({ filterable: { ...filterable, options: options } })


                            }}
                          />

                        </PanelRow>



                        <label for="" className='my-3 font-bold'>Search Terms</label>

                        <p>To add custom filter please use following format and hit Enter</p>
                        <code>Filter Name|filter-slug|15</code>
                        <InputControl
                          className="my-3"
                          placeholder="Search Categories or terms"

                          value=''
                          onKeyPress={ev => {

                            if (ev.key === 'Enter') {
                              var filterParts = ev.target.value.split('|');

                              var ss = filterable.options.filters[i].items.concat({ id: 0, slug: filterParts[1], title: filterParts[0], count: filterParts[2] });
                              filterable.options.filters[i].items = ss


                              var options = { ...filterable.options, filters: filterable.options.filters }
                              setAttributes({ filterable: { ...filterable, options: options } })


                            }


                          }}
                          onChange={(newVal) => {
                            fetchPostTypeTerms(newVal);

                          }}
                        />

                        {x.items.length == 0 && (
                          <div className='my-1'>No terms added.</div>
                        )}

                        {x.items.map((y, j) => {

                          return (
                            <div className='py-2 my-1 border-b border-gray-400 flex justify-between'>
                              <div>{y.title}</div>

                              <div>

                                <span
                                  onClick={(ev) => {

                                    var options = { ...activeFilter.options, slug: (activeFilter.options.slug == y.slug) ? "" : y.slug }
                                    setAttributes({ activeFilter: { ...activeFilter, options: options } })



                                  }}
                                  className={[(activeFilter.options.slug) == y.slug ? "bg-blue-600 cursor-pointer p-1   text-white  text-sm" : "bg-gray-400 cursor-pointer p-1   text-white  text-sm"]}>

                                  <span class="dashicons dashicons-yes-alt"></span>
                                </span>

                                <span
                                  onClick={(ev) => {

                                    filterable.options.filters[i].items.splice(j, 1);


                                    var options = { ...filterable.options, filters: filterable.options.filters }
                                    setAttributes({ filterable: { ...filterable, options: options } })



                                  }}
                                  className='cursor-pointer p-1   text-white bg-red-600 text-sm'>

                                  <span className='dashicon dashicons dashicons-no-alt'></span>
                                </span>
                              </div>


                            </div>
                          )
                        })
                        }







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
                                      var ss = filterable.options.filters[i].items.concat({ id: x.term_id, slug: x.slug, title: x.name, count: x.count });
                                      filterable.options.filters[i].items = ss


                                      var options = { ...filterable.options, filters: filterable.options.filters }
                                      setAttributes({ filterable: { ...filterable, options: options } })


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
                    value={filterable.options.showSort}
                    options={[
                      { label: 'No', value: 'no' },
                      { label: 'Yes', value: 'yes' },

                    ]}
                    onChange={(newVal) => {

                      var options = { ...filterable.options, showSort: newVal }
                      setAttributes({ filterable: { ...filterable, options: options } })
                    }
                    }
                  />
                </PanelRow>



                <PanelRow >
                  <label for="">Show Random Filter </label>

                  <SelectControl
                    label=""
                    value={filterable.options.showRandom}
                    options={[
                      { label: 'No', value: 'no' },
                      { label: 'Yes', value: 'yes' },

                    ]}
                    onChange={(newVal) => {

                      var options = { ...filterable.options, showRandom: newVal }
                      setAttributes({ filterable: { ...filterable, options: options } })
                    }
                    }
                  />
                </PanelRow>

                <PanelRow >
                  <label for="">Show Clear Filter </label>

                  <SelectControl
                    label=""
                    value={filterable.options.showClear}
                    options={[
                      { label: 'No', value: 'no' },
                      { label: 'Yes', value: 'yes' },

                    ]}
                    onChange={(newVal) => {

                      var options = { ...filterable.options, showClear: newVal }
                      setAttributes({ filterable: { ...filterable, options: options } })
                    }
                    }
                  />
                </PanelRow>


                <PanelRow >
                  <label for="">Show All Filter </label>

                  <SelectControl
                    label=""
                    value={filterable.options.showAll}
                    options={[
                      { label: 'No', value: 'no' },
                      { label: 'Yes', value: 'yes' },

                    ]}
                    onChange={(newVal) => {

                      var options = { ...filterable.options, showAll: newVal }
                      setAttributes({ filterable: { ...filterable, options: options } })
                    }
                    }
                  />
                </PanelRow>


                <PanelRow>
                  <label>Items Per Page</label>
                  <InputControl
                    type="number"
                    value={(filterable.options.perPage != undefined) ? filterable.options.perPage : 6}

                    onChange={(newVal) => {


                      var options = { ...filterable.options, perPage: newVal }
                      setAttributes({ filterable: { ...filterable, options: options } })




                    }}
                  />
                </PanelRow>




                <PanelBody title="Filters Style" initialOpen={false} >

                  <label for="">Text Color</label>

                  <ColorPalette
                    color={filterable.styles.color[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {

                      var newValuesObj = {};


                      if (Object.keys(filterable.styles.color).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = filterable.styles.color;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...filterable.styles, color: newValuesObj };
                      setAttributes({ filterable: { ...filterable, styles: styles } });




                      var itemsX = { ...blockCssY.items };
                      itemsX[filterSelector] = { ...blockCssY.items[filterSelector], 'color': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });


                    }}
                  />



                  <label for="">Background Color</label>


                  <ColorPalette
                    color={filterable.styles.bgColor[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {

                      var newValuesObj = {};


                      if (Object.keys(filterable.styles.bgColor).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = filterable.styles.bgColor;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...filterable.styles, bgColor: newValuesObj };
                      setAttributes({ filterable: { ...filterable, styles: styles } });




                      var itemsX = { ...blockCssY.items };
                      itemsX[filterSelector] = { ...blockCssY.items[filterSelector], 'background-color': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });




                    }}
                  />




                  <PanelRow>
                    <label>Display</label>
                    <PGcssDisplay val={filterable.styles.display[breakPointX]} onChange={(newVal => {
                      var newValuesObj = {};

                      if (Object.keys(filterable.styles.display).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = filterable.styles.display;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...filterable.styles, display: newValuesObj };
                      setAttributes({ filterable: { ...filterable, styles: styles } });

                      blockCssY.items[filterSelector] = { ...blockCssY.items[filterSelector], 'display': newValuesObj };
                      setAttributes({ blockCssY: { items: blockCssY.items } });

                    })} />
                  </PanelRow>

                  <PanelRow>
                    <label>Cursor</label>
                    <PGcssCursor val={filterable.styles.cursor[breakPointX]} onChange={(newVal => {
                      var newValuesObj = {};

                      if (Object.keys(filterable.styles.cursor).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = filterable.styles.cursor;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...filterable.styles, cursor: newValuesObj };
                      setAttributes({ filterable: { ...filterable, styles: styles } });

                      blockCssY.items[filterSelector] = { ...blockCssY.items[filterSelector], 'cursor': newValuesObj };
                      setAttributes({ blockCssY: { items: blockCssY.items } });

                    })} />
                  </PanelRow>



                  <PanelRow>
                    <label>Padding</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=''
                    values={filterable.styles.padding[breakPointX]}
                    onChange={(nextValues) => { filterablePaddingControl(nextValues) }}
                  />





                  <PanelRow>
                    <label>Margin</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=""
                    values={filterable.styles.margin[breakPointX]}
                    onChange={(nextValues) => { filterableMarginControl(nextValues) }}
                  />


                </PanelBody>



                <PanelBody title="Active Filter Style" initialOpen={false} >

                  <label for="">Text Color</label>

                  <ColorPalette
                    color={activeFilter.styles.color[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {

                      var newValuesObj = {};


                      if (Object.keys(activeFilter.styles.color).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = activeFilter.styles.color;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...activeFilter.styles, color: newValuesObj };
                      setAttributes({ activeFilter: { ...activeFilter, styles: styles } });




                      var itemsX = { ...blockCssY.items };
                      itemsX[filterActiveSelector] = { ...blockCssY.items[filterActiveSelector], 'color': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });


                    }}
                  />



                  <label for="">Background Color</label>


                  <ColorPalette
                    color={activeFilter.styles.bgColor[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {

                      var newValuesObj = {};


                      if (Object.keys(activeFilter.styles.bgColor).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = activeFilter.styles.bgColor;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...activeFilter.styles, bgColor: newValuesObj };
                      setAttributes({ activeFilter: { ...activeFilter, styles: styles } });




                      var itemsX = { ...blockCssY.items };
                      itemsX[filterActiveSelector] = { ...blockCssY.items[filterActiveSelector], 'background-color': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });




                    }}
                  />







                  <PanelRow>
                    <label>Padding</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=''
                    values={activeFilter.styles.padding[breakPointX]}
                    onChange={(nextValues) => { activeFilterPaddingControl(nextValues) }}
                  />





                  <PanelRow>
                    <label>Margin</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=""
                    values={activeFilter.styles.margin[breakPointX]}
                    onChange={(nextValues) => { activeFilterMarginControl(nextValues) }}
                  />


                </PanelBody>



                <PanelBody title="Filter Group" initialOpen={false} >

                  <label for="">Text Color</label>

                  <ColorPalette
                    color={filterGroup.styles.color[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {

                      var newValuesObj = {};


                      if (Object.keys(filterGroup.styles.color).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = filterGroup.styles.color;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...filterGroup.styles, color: newValuesObj };
                      setAttributes({ filterGroup: { ...filterGroup, styles: styles } });




                      var itemsX = { ...blockCssY.items };
                      itemsX[filterGroupSelector] = { ...blockCssY.items[filterGroupSelector], 'color': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });


                    }}
                  />



                  <label for="">Background Color</label>


                  <ColorPalette
                    color={filterGroup.styles.bgColor[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {

                      var newValuesObj = {};


                      if (Object.keys(filterGroup.styles.bgColor).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = filterGroup.styles.bgColor;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...filterGroup.styles, bgColor: newValuesObj };
                      setAttributes({ filterGroup: { ...filterGroup, styles: styles } });




                      var itemsX = { ...blockCssY.items };
                      itemsX[filterGroupSelector] = { ...blockCssY.items[filterGroupSelector], 'background-color': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });




                    }}
                  />


                  <PanelRow>
                    <label>Display</label>
                    <PGcssDisplay val={filterGroup.styles.display[breakPointX]} onChange={(newVal => {


                      var newValuesObj = {};

                      if (Object.keys(filterGroup.styles.display).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = filterGroup.styles.display;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...filterGroup.styles, display: newValuesObj };
                      setAttributes({ filterGroup: { ...filterGroup, styles: styles } });

                      blockCssY.items[filterGroupSelector] = { ...blockCssY.items[filterGroupSelector], 'display': newValuesObj };
                      setAttributes({ blockCssY: { items: blockCssY.items } });

                    })} />
                  </PanelRow>




                  <PanelRow>
                    <label>Padding</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=''
                    values={filterGroup.styles.padding[breakPointX]}
                    onChange={(nextValues) => { filterGroupPaddingControl(nextValues) }}
                  />





                  <PanelRow>
                    <label>Margin</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=""
                    values={filterGroup.styles.margin[breakPointX]}
                    onChange={(nextValues) => { filterGroupMarginControl(nextValues) }}
                  />


                </PanelBody>

              </PanelBody>


              <PanelBody title="Pagination" initialOpen={false} >

                <PanelRow className='mb-4'>
                  <label for="">Pagination Type</label>
                  <PGDropdown position="bottom right" variant="secondary" options={paginationTypes} buttonTitle="Choose" onChange={(arg, index) => {

                    var options = { ...pagination.options, type: arg.value };
                    setAttributes({ pagination: { ...pagination, options: options } });

                  }} values={''}></PGDropdown>
                </PanelRow>


                {(pagination.options.type.length != 0) && (<div className='bg-gray-500 text-white px-3 py-2 my-5'>{(paginationTypes[pagination.options.type] != undefined) ? paginationTypes[pagination.options.type].label : ''}</div>)}



                {((pagination.options.type == 'filterable')) && (


                  <PGproWrapper utmUrl={"?utm_source=editor&utm_term=postGridBlock&utm_campaign=pluginPostGrid&utm_medium=postGridBlock-pagination_type"}>
                    <p> <span className='underline'>Filterable pagination</span> Only avilable in Premium</p>
                  </PGproWrapper>



                )}






                {(pagination.options.type == 'normal' || pagination.options.type == 'ajax') && (

                  <>
                    <label for="">Max Number of Pagination</label>
                    <InputControl
                      value={pagination.options.maxPageNum}
                      onChange={(newVal) => {

                        var options = { ...pagination.options, maxPageNum: newVal };
                        setAttributes({ pagination: { ...pagination, options: options } });

                      }}
                    />
                  </>
                )}



                {(pagination.options.type == 'normal' || pagination.options.type == 'ajax' || pagination.options.type == 'next_previous') && (
                  <>

                    <label for="">Previous Text</label>
                    <InputControl
                      value={pagination.options.prevText}
                      onChange={(newVal) => {

                        var options = { ...pagination.options, prevText: newVal };
                        setAttributes({ pagination: { ...pagination, options: options } });
                      }}
                    />


                    <label for="">Next Text</label>
                    <InputControl
                      value={pagination.options.nextText}
                      onChange={(newVal) => {

                        var options = { ...pagination.options, nextText: newVal };
                        setAttributes({ pagination: { ...pagination, options: options } });
                      }}
                    />
                  </>

                )}




                {(pagination.options.type == 'loadmore' || pagination.options.type == 'infinite') && (

                  <>
                    <label for="">Load More Text</label>

                    <InputControl
                      value={pagination.options.loadMoreText}
                      onChange={(newVal) => {
                        var options = { ...pagination.options, loadMoreText: newVal };
                        setAttributes({ pagination: { ...pagination, options: options } });
                      }
                      }
                    />


                    <label for="">No Posts Text</label>

                    <InputControl
                      value={pagination.options.noMorePosts}
                      onChange={(newVal) => {
                        var options = { ...pagination.options, noMorePosts: newVal };
                        setAttributes({ pagination: { ...pagination, options: options } });
                      }
                      }
                    />

                    <label for="">Loading Text</label>

                    <InputControl
                      value={pagination.options.loadingText}
                      onChange={(newVal) => {
                        var options = { ...pagination.options, loadingText: newVal };
                        setAttributes({ pagination: { ...pagination, options: options } });
                      }
                      }
                    />

                    <PanelRow>
                      <label for="">Loading Icon</label>

                      <PGIconPicker library={pagination.options.loadingIcon.library} srcType={pagination.options.loadingIcon.srcType} iconSrc={pagination.options.loadingIcon.iconSrc} onChange={(arg) => {

                        var options = { ...pagination.options, loadingIcon: { srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc } };

                        setAttributes({ pagination: { ...pagination, options: options } });


                      }} />
                    </PanelRow>


                  </>

                )}

                <PanelBody title="Pagination Wrapper" initialOpen={false} >

                  <label for="">Text Color</label>

                  <ColorPalette
                    color={pagination.styles.color[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {

                      var newValuesObj = {};


                      if (Object.keys(pagination.styles.color).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = pagination.styles.color;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...pagination.styles, color: newValuesObj };
                      setAttributes({ pagination: { ...pagination, styles: styles } });




                      var itemsX = { ...blockCssY.items };
                      itemsX[paginationWrapSelector] = { ...blockCssY.items[paginationWrapSelector], 'color': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });


                    }}
                  />



                  <label for="">Background Color</label>


                  <ColorPalette
                    color={pagination.styles.bgColor[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {

                      var newValuesObj = {};


                      if (Object.keys(pagination.styles.bgColor).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = pagination.styles.bgColor;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...pagination.styles, bgColor: newValuesObj };
                      setAttributes({ pagination: { ...pagination, styles: styles } });




                      var itemsX = { ...blockCssY.items };
                      itemsX[paginationWrapSelector] = { ...blockCssY.items[paginationWrapSelector], 'background-color': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });




                    }}
                  />





                  <PanelRow>
                    <label>Text Align</label>
                    <PGcssTextAlign val={pagination.styles.textAlign[breakPointX]} onChange={(newVal => {


                      var newValuesObj = {};

                      if (Object.keys(pagination.styles.textAlign).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = pagination.styles.textAlign;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...pagination.styles, textAlign: newValuesObj };
                      setAttributes({ pagination: { ...pagination, styles: styles } });

                      blockCssY.items[paginationWrapSelector] = { ...blockCssY.items[paginationWrapSelector], 'text-align': newValuesObj };
                      setAttributes({ blockCssY: { items: blockCssY.items } });




                    })} />
                  </PanelRow>



                  <PanelRow>
                    <label>Padding</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=''
                    values={pagination.styles.padding[breakPointX]}
                    onChange={(nextValues) => { paginationPaddingControl(nextValues) }}
                  />





                  <PanelRow>
                    <label>Margin</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=""
                    values={pagination.styles.margin[breakPointX]}
                    onChange={(nextValues) => { paginationMarginControl(nextValues) }}
                  />


                </PanelBody>


                <PanelBody title="Pagination Items" initialOpen={false} >


                  <label for="">Text Color</label>

                  <ColorPalette
                    color={paginationItem.styles.color[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {

                      var newValuesObj = {};


                      if (Object.keys(paginationItem.styles.color).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = paginationItem.styles.color;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...paginationItem.styles, color: newValuesObj };
                      setAttributes({ paginationItem: { ...paginationItem, styles: styles } });




                      var itemsX = { ...blockCssY.items };
                      itemsX[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'color': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });


                    }}
                  />


                  <label for="">Background Color</label>
                  <ColorPalette
                    color={paginationItem.styles.bgColor[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {
                      var newValuesObj = {};

                      if (Object.keys(paginationItem.styles.bgColor).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = paginationItem.styles.bgColor;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...paginationItem.styles, bgColor: newValuesObj };
                      setAttributes({ paginationItem: { ...paginationItem, styles: styles } });

                      var itemsX = { ...blockCssY.items };
                      itemsX[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'background-color': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });
                    }}
                  />



                  <label for="">Active Background Color</label>
                  <ColorPalette
                    color={paginationItemActive.styles.bgColor[breakPointX]}
                    colors={colorsPresets}
                    enableAlpha
                    onChange={(newVal) => {
                      var newValuesObj = {};

                      if (Object.keys(paginationItemActive.styles.bgColor).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = paginationItemActive.styles.bgColor;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...paginationItemActive.styles, bgColor: newValuesObj };
                      setAttributes({ paginationItemActive: { ...paginationItemActive, styles: styles } });

                      var itemsX = { ...blockCssY.items };
                      itemsX[paginationItemActiveSelector] = { ...blockCssY.items[paginationItemActiveSelector], 'background-color': newValuesObj };

                      setAttributes({ blockCssY: { items: itemsX } });
                    }}
                  />


                  <PanelRow>
                    <label>Display</label>
                    <PGcssDisplay val={paginationItem.styles.display[breakPointX]} onChange={(newVal => {


                      var newValuesObj = {};

                      if (Object.keys(paginationItem.styles.display).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = paginationItem.styles.display;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...paginationItem.styles, display: newValuesObj };
                      setAttributes({ paginationItem: { ...paginationItem, styles: styles } });

                      blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'display': newValuesObj };
                      setAttributes({ blockCssY: { items: blockCssY.items } });

                    })} />
                  </PanelRow>

                  <PanelRow>
                    <label>Padding</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=''
                    values={paginationItem.styles.padding[breakPointX]}
                    onChange={(nextValues) => { paginationItemPaddingControl(nextValues) }}
                  />





                  <PanelRow>
                    <label>Margin</label>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>
                  <BoxControl
                    label=""
                    values={paginationItem.styles.margin[breakPointX]}
                    onChange={(nextValues) => { paginationItemMarginControl(nextValues) }}
                  />





                  <PanelRow>
                    <div className='font-bold'>Typography</div>
                    <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                  </PanelRow>

                  <Typography typo={paginationItem.styles} breakPointX={breakPointX} onChange={onChangePaginationTypo} setAttributes={setAttributes} obj={paginationItem} />







                </PanelBody>








              </PanelBody>






              <PanelBody title="Lazy load" initialOpen={false}>


                <div>
                  <SelectControl
                    label="Enable"
                    value={lazyLoad.options.enable}
                    options={[
                      { label: 'Yes', value: 'yes' },
                      { label: 'No', value: 'no' },
                    ]}
                    onChange={(newVal) => {

                      var options = { ...lazyLoad.options, enable: newVal };
                      setAttributes({ lazyLoad: { ...lazyLoad, options: options } });
                    }}
                  />
                </div>


                <PanelRow>
                  <label for="">Lazyload Icon</label>

                  <PGIconPicker library={(lazyLoad.options.icon != undefined) ? lazyLoad.options.icon.library : 'fontAwesome'} srcType={(lazyLoad.options.icon != undefined) ? lazyLoad.options.icon.srcType : 'class'} iconSrc={(lazyLoad.options.icon != undefined) ? lazyLoad.options.icon.iconSrc : ''} onChange={(arg) => {

                    var options = { ...lazyLoad.options, icon: { srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc } };

                    setAttributes({ lazyLoad: { ...lazyLoad, options: options } });


                  }} />
                </PanelRow>

                {lazyLoad.options.srcUrl.length > 0 && (
                  <PGproWrapper utmUrl={"?utm_source=editor&utm_term=postGridBlock&utm_campaign=pluginPostGrid&utm_medium=postGridBlock-lazyload"}>
                    <p> <span className='underline'>Lazy Load Image</span> Only avilable in Premium</p>
                  </PGproWrapper>
                )}


                <label for="">Lazy Load Image</label>



                <img src={lazyLoad.options.srcUrl} alt="" />

                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={(media) => {
                      // media.id


                      var options = { ...lazyLoad.options, srcUrl: media.url, srcId: media.id };
                      setAttributes({ lazyLoad: { ...lazyLoad, options: options } });


                    }


                    }
                    onClose={() => {
                    }


                    }

                    allowedTypes={ALLOWED_MEDIA_TYPES}
                    value={lazyLoad.options.srcId}
                    render={({ open }) => (

                      <Button onClick={open}>Open Media Library</Button>


                    )}
                  />
                </MediaUploadCheck>
              </PanelBody>


              <PanelBody className='hidden' title="Search" initialOpen={false} >

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


              <div className='px-3'>

                <PGMailSubsctibe />
                <PGContactSupport utm={{ utm_source: 'BlockPostGrid', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />



              </div>

              <PanelBody className='' title="Tutorials" initialOpen={false} >
                <PGTutorials links={tutorialsLinks} />
              </PanelBody>

            </div>

          </InspectorControls >
        </div >
        ,


        <div className={[blockId]}>

          {/* {JSON.stringify(grid)} */}
          {/* <RawHTML>{ItemNthCssadasd2}</RawHTML> */}

          {grid.styles.gridTemplateColumns[breakPointX] == undefined && (

            <div className='my-5'>

              <div className='text-center my-5'>Please set the column number</div>

              <div className='grid grid-cols-4 gap-4'>
                {columnPresets.map(x => {

                  return (

                    <div className='cursor-pointer text-center bg-slate-400 hover:bg-slate-500' onClick={ev => {

                      var gridTemplateColumns = grid.styles.gridTemplateColumns;
                      var colGap = grid.styles.colGap;
                      var rowGap = grid.styles.rowGap;

                      gridTemplateColumns[breakPointX] = x.args;
                      colGap[breakPointX] = { val: 1, unit: 'em' };
                      rowGap[breakPointX] = { val: 1, unit: 'em' };


                      var styles = { ...grid.styles, gridTemplateColumns: gridTemplateColumns, colGap: colGap, rowGap: rowGap };

                      setAttributes({ grid: { ...grid, styles: styles } });



                    }}>
                      <span className='p-3 py-4 inline-block'>{x.icon}</span>
                    </div>

                  )

                })}
              </div>



            </div>

          )}



          <>

            {(lazyLoad.options.enable == 'yes' && isBusy) &&
              (
                <div className={lazyLoad.options.class}></div>
              )
            }





            <div className='filterable-navs'>

              <div className='filterable-group'>
                {filterable.options.showAll == 'yes' && (
                  <>
                    <div className='pg-filter mixitup-control-active cusror-pointer px-4 py-2 m-2 inline-block bg-gray-200 filter-34534' data-filter='all'>All</div>
                  </>
                )}
              </div>
              <div className='filterable-group  '>

              </div>
              {

                filterable.options.filters.length > 0 && filterable.options.filters.map(x => {

                  return (

                    <div className='filterable-group ' data-logic={x.logic}>

                      {x.groupTitle && (
                        <div className='filterable-group-title '>{x.groupTitle}</div>
                      )}


                      {x.items.map(y => {


                        return (

                          <div className={[(activeFilter.options.slug == y.slug) ? 'mixitup-control-active pg-filter cursor-pointer' : 'pg-filter cursor-pointer']} terms-id={y.id} data-filter={'.' + y.slug}>{y.title} {x.showPostCount == 'yes' ? '(' + y.count + ')' : ''}</div>

                        )

                      })}



                    </div>

                  )


                })

              }


              <div className='filterable-group'>
                {filterable.options.showSort == 'yes' && (

                  <>
                    <div className='pg-filter mixitup-control-active cusror-pointer px-4 py-2 m-2 inline-block bg-gray-200 filter-34534' data-filter=''>ASC</div>
                    <div className='pg-filter  cusror-pointer px-4 py-2 m-2 inline-block bg-gray-200 filter-34534' data-filter=''>DESC</div>
                  </>

                )}

                {filterable.options.showRandom == 'yes' && (
                  <>
                    <div className='pg-filter  cusror-pointer px-4 py-2 m-2 inline-block bg-gray-200 filter-34534' data-filter=''>Random</div>
                  </>
                )}

                {filterable.options.showClear == 'yes' && (
                  <>
                    <div className='pg-filter  cusror-pointer px-4 py-2 m-2 inline-block bg-gray-200 filter-34534' data-filter=''>Clear</div>                  </>
                )}




              </div>







            </div>







            {search.enable == 'yes' &&
              (
                <div className={search.options.class}>search form</div>
              )
            }





            {postsQuery == false && posts == null &&

              (
                <div className={noPostsWrap.options.class}>No Post found</div>

              )
            }

            {
              postsQuery &&

              (
                <div className={spinnerWrap.options.class}><Spinner /></div>
              )

            }


            {(isBusy) &&
              (
                <div className="text-center"><Spinner /></div>
              )
            }
            <div>
              {postsQuery == false && posts != null && posts.length > 0 &&
                (
                  <div className={itemsWrap.options.class}>
                    {
                      posts.map((x, _i) => {
                        return (<div className={itemWrap.options.class}><RawHTML>{x.html}</RawHTML></div>)
                      })
                    }


                    {/* 
                    {posts.map(post => {


                      return (

                        <>
                          <BlockContextProvider
                            key={post.ID}
                            value={post}
                          >
                            {post.ID ===
                              (activeBlockContextId ||
                                posts[0]?.ID) ? (

                              <>
                                {post.ID}
                                <PostTemplateInnerBlocks attsx={TEMPLATEX} />
                              </>


                            ) : null}


                            <MemoizedPostTemplateBlockPreview
                              blocks={blocks}
                              blockContextId={post.ID}
                              setActiveBlockContextId={setActiveBlockContextId}
                              isHidden={
                                post.ID ===
                                (activeBlockContextId ||
                                  posts[0]?.ID)
                              }
                            />



                          </BlockContextProvider>
                        </>


                      )
                    })} */}


                  </div>
                )
              }

            </div>


            <div className={pagination.options.class}>




              {pagination.options.type == 'filterable' &&
                (
                  <>



                    {(paginationItems != undefined) && paginationItems.map(item => {
                      return (
                        <RawHTML className="inline-block" >{item.replace("page-numbers", paginationItem.options.class)}</RawHTML>
                      )
                    })}
                  </>
                )
              }

              {pagination.options.type == 'ajax' &&
                (
                  <>
                    {(paginationItems != undefined) && paginationItems.map(item => {

                      return (

                        <RawHTML className="inline-block" >{item.replace("page-numbers", paginationItem.options.class)}</RawHTML>
                      )

                    })}

                  </>
                )
              }

              {pagination.options.type == 'next_previous' &&
                (
                  <div className='flex justify-between'>
                    <div className='pagination-prev page-numbers'>{pagination.options.prevText}</div>
                    <div className='pagination-next page-numbers'>{pagination.options.nextText}</div>

                  </div>

                )
              }


              {pagination.options.type == 'loadmore' &&
                (
                  <>
                    <div className='page-numbers'>{pagination.options.loadMoreText}</div>

                  </>

                )
              }

              {pagination.options.type == 'infinite' &&
                (
                  <></>

                )
              }

            </div>

          </>



        </div>
      ]




    )
  },
  save: function (_props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})