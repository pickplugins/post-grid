import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover, Spinner, Tooltip } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';
import { InnerBlocks, useBlockProps, useInnerBlocksProps, store as blockEditorStore, } from "@wordpress/block-editor"
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { applyFilters } from '@wordpress/hooks';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

import { Icon, styles, settings, pencil, cloud, link, linkOff } from "@wordpress/icons";
import { __experimentalBlockVariationPicker as BlockVariationPicker } from '@wordpress/block-editor';

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'
import { __experimentalScrollable as Scrollable } from '@wordpress/components';

import IconToggle from '../../components/icon-toggle'
import Typography from '../../components/typography'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import variations from './variations'



import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'
import PGCssLibrary from '../../components/css-library'
import PGIconPicker from '../../components/icon-picker'
import PGDropdown from '../../components/dropdown'



var myStore = wp.data.select('postgrid-shop');

const ALLOWED_MEDIA_TYPES = ['image'];




registerBlockType("post-grid/post-grid", {
  apiVersion: 2,
  title: "Post Grid",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><rect fill="#1d4ed8" y="9.59" width="8.29" height="16.82" /><rect fill="#1d4ed8" x="27.71" y="9.59" width="8.29" height="16.82" /><rect fill="#1d4ed8" x="11.05" y="9.59" width="13.9" height="16.82" /></svg>


    ,
  },


  attributes: {


    wrapper: {
      type: 'object',
      default: {
        options: {
          tag: 'div',
          class: '',
        },

        styles:
        {


        },
      },
    },

    lazyLoad: {
      type: 'object',
      default: {
        options: {
          class: 'lazyLoad',
          enable: 'no',
          srcUrl: '',
          srcId: '',
          icon: { library: '', srcType: "class", /*class, html, img, svg */ iconSrc: '' },
        },

        styles: {},
      },
    },
    container: {
      type: 'object',
      default: {
        options: { class: '', },
        styles: {},

      },
    },

    itemsWrap: {
      type: 'object',
      default: {

        options: { class: 'items-loop', },
        styles: {},
      },
    },

    itemWrap: {
      type: 'object',
      default: {

        options: { class: 'item', },
        styles: {},


      },
    },


    noPostsWrap: {
      type: 'object',
      default: {

        options: { class: 'no-posts text-center', },
        styles: {},
      },
    },

    spinnerWrap: {
      type: 'object',
      default: {

        options: { class: 'spinner', },
        styles: {},
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
          gridTemplateColumns: {

            Tablet: [{ "val": 1, "unit": "fr" }, { "val": 1, "unit": "fr" }],
            Mobile: [{ "val": 1, "unit": "fr" }],

          },
          gridTemplateRows: {},
          colGap: {},
          rowGap: {},

          color: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' }
        },


      },
    },


    layout: {
      type: 'object',
      default: { id: '', srcServer: 'library', data: [{ "blockName": "core/post-title", "attrs": {}, "innerBlocks": [], "innerHTML": "", "innerContent": [] }, { "blockName": null, "attrs": {}, "innerBlocks": [], "innerHTML": "\n\n", "innerContent": ["\n\n"] }, { "blockName": "core/post-date", "attrs": {}, "innerBlocks": [], "innerHTML": "", "innerContent": [] }, { "blockName": null, "attrs": {}, "innerBlocks": [], "innerHTML": "\n\n", "innerContent": ["\n\n"] }, { "blockName": "core/post-excerpt", "attrs": { "moreText": "", "textColor": "primary" }, "innerBlocks": [], "innerHTML": "", "innerContent": [] }], rawData: "<!-- wp:post-featured-image  /-->\n\n<!-- wp:post-title /-->\n\n<!-- wp:post-excerpt  /-->" },
    },
    queryArgs: {
      type: 'object',
      default: {
        items: [
          { val: ['post'], multiple: false, id: 'postType', label: 'Post Types', description: "Select Post Types to Query" },
          { val: ['publish'], multiple: false, id: 'postStatus', label: 'Post status', description: "Query post by post status" },
          { val: 'DESC', multiple: false, id: 'order', label: 'Order', description: "Post query order" },
          { val: ['date'], multiple: false, id: 'orderby', label: 'Orderby', description: "Post query orderby" },
          { val: 10, multiple: false, id: 'postsPerPage', label: 'Posts Per Page', description: "Number of post to show per page" },
          { val: 1, multiple: false, id: 'paged', label: 'Paged', description: "Pagination start with" },

        ]
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
    align: ["wide", "full"],


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

    var wrapper = attributes.wrapper;
    var lazyLoad = attributes.lazyLoad;
    var container = attributes.container;

    var itemsWrap = attributes.itemsWrap;
    var itemWrap = attributes.itemWrap;
    var noPostsWrap = attributes.noPostsWrap;
    var spinnerWrap = attributes.spinnerWrap;

    var grid = attributes.grid;
    var layout = attributes.layout;
    var queryArgs = attributes.queryArgs;


    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    var postId = context['postId'];
    var postType = context['postType'];

    //const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    var breakPointX = myStore.getBreakPoint();
    let isProFeature = applyFilters('isProFeature', true);

    const [clientData, setClientData] = useState({});


    var clientDataX = (myStore != null) ? myStore.getclientdata() : '';

    useEffect(() => {

      setClientData((myStore != null) ? myStore.getclientdata() : '');

    }, [clientDataX]);

    // Wrapper CSS Class Selectors
    var wrapperSelector = blockClass;
    var containerSelector = blockClass;
    const itemsWrapSelector = blockClass + ' .items-loop';
    const itemWrapSelector = blockClass + ' .item';

    const noPostsSelector = blockClass + ' .no-posts';
    const lazyloadWrapSelector = blockClass + ' .lazyLoad';
    const spinnerSelector = blockClass + ' .spinner';

    const { replaceInnerBlocks } = useDispatch(blockEditorStore);

    const hasInnerBlocks = useSelect(
      (select) => select(blockEditorStore).getBlocks(clientId).length > 0,
      [clientId]
    );


    //console.log(JSON.stringify(wp.data.select(blockEditorStore).getBlocks(clientId)));


    useEffect(() => {

      setAttributes({ blockId: blockIdX });

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);



      setAttributes({ blockCssY: { items: blockCssY.items } });




    }, [clientId]);


    useEffect(() => {


      setAttributes({ customCss: customCss });


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);


    useEffect(() => {


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);






    function handleLinkClick(ev) {

      ev.stopPropagation();
      ev.preventDefault();
      return false;
    }




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










    const ALLOWED_BLOCKS = ['post-grid/post-grid-item'];

    const MY_TEMPLATE = [
      ['post-grid/post-grid-item', {}],
      ['post-grid/post-grid-item', {}],
      ['post-grid/post-grid-item', {}],


    ];


    const blockProps = useBlockProps({
      className: ` ${blockId} pg-post-grid `,
    });


    const innerBlocksProps = useInnerBlocksProps(blockProps, {
      allowedBlocks: ALLOWED_BLOCKS,
      //template: MY_TEMPLATE,
      orientation: 'horizontal',
      templateInsertUpdatesSelection: true,
      //renderAppender: InnerBlocks.ButtonBlockAppender

    });




    function onPickCssLibraryContainer(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        container[sudoScource] = sudoScourceArgs;
      })

      var containerX = Object.assign({}, container);
      setAttributes({ container: containerX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, containerSelector);


        var sudoObj = {};
        Object.entries(sudoScourceArgs).map(y => {

          var cssPropty = y[0];
          var cssProptyVal = y[1];
          var cssProptyKey = myStore.cssAttrParse(cssPropty);
          sudoObj[cssProptyKey] = cssProptyVal;
        })

        styleObj[elementSelector] = sudoObj;
      })


      var cssItems = Object.assign(blockCssY.items, styleObj);
      setAttributes({ blockCssY: { items: cssItems } });
    }





    function onChangeStyleContainer(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, container);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ container: object });

      var elementSelector = myStore.getElementSelector(sudoScource, containerSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStyleContainer(sudoScource, key) {

      var object = myStore.deletePropertyDeep(container, [sudoScource, key, breakPointX]);
      setAttributes({ container: object });


      var elementSelector = myStore.getElementSelector(sudoScource, containerSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }


    function onAddStyleContainer(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, container);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ container: object });



    }





    function onPickCssLibraryItemsWrap(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        itemsWrap[sudoScource] = sudoScourceArgs;
      })

      var itemsWrapX = Object.assign({}, itemsWrap);
      setAttributes({ itemsWrap: itemsWrapX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, itemsWrapSelector);


        var sudoObj = {};
        Object.entries(sudoScourceArgs).map(y => {

          var cssPropty = y[0];
          var cssProptyVal = y[1];
          var cssProptyKey = myStore.cssAttrParse(cssPropty);
          sudoObj[cssProptyKey] = cssProptyVal;
        })

        styleObj[elementSelector] = sudoObj;
      })


      var cssItems = Object.assign(blockCssY.items, styleObj);
      setAttributes({ blockCssY: { items: cssItems } });
    }





    function onChangeStyleItemsWrap(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, itemsWrap);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ itemsWrap: object });

      var elementSelector = myStore.getElementSelector(sudoScource, itemsWrapSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStyleItemsWrap(sudoScource, key) {

      var object = myStore.deletePropertyDeep(itemsWrap, [sudoScource, key, breakPointX]);
      setAttributes({ itemsWrap: object });


      var elementSelector = myStore.getElementSelector(sudoScource, itemsWrapSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }


    function onAddStyleItemsWrap(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, itemsWrap);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ itemsWrap: object });



    }





















    function onPickCssLibraryItemWrap(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        itemWrap[sudoScource] = sudoScourceArgs;
      })

      var itemWrapX = Object.assign({}, itemWrap);
      setAttributes({ itemWrap: itemWrapX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, itemWrapSelector);


        var sudoObj = {};
        Object.entries(sudoScourceArgs).map(y => {

          var cssPropty = y[0];
          var cssProptyVal = y[1];
          var cssProptyKey = myStore.cssAttrParse(cssPropty);
          sudoObj[cssProptyKey] = cssProptyVal;
        })

        styleObj[elementSelector] = sudoObj;
      })


      var cssItems = Object.assign(blockCssY.items, styleObj);
      setAttributes({ blockCssY: { items: cssItems } });
    }





    function onChangeStyleItemWrap(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, itemWrap);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ itemWrap: object });

      var elementSelector = myStore.getElementSelector(sudoScource, itemWrapSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStyleItemWrap(sudoScource, key) {

      var object = myStore.deletePropertyDeep(itemWrap, [sudoScource, key, breakPointX]);
      setAttributes({ itemWrap: object });


      var elementSelector = myStore.getElementSelector(sudoScource, itemWrapSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }


    function onAddStyleItemWrap(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, itemWrap);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ itemWrap: object });



    }






    return (
      <>
        <InspectorControls >



          <PanelBody title="Container" initialOpen={false}>


            <PGtabs
              activeTab="styles"
              orientation="horizontal"
              activeClass="active-tab"
              onSelect={(tabName) => { }}
              tabs={[

                {
                  name: 'styles',
                  title: 'Styles',
                  icon: pencil,
                  className: 'tab-style',
                },
                {
                  name: 'css',
                  title: 'CSS Library',
                  icon: cloud,
                  className: 'tab-css',
                },
              ]}
            >

              <PGtab name="styles">
                <PGStyles obj={container} onChange={onChangeStyleContainer} onAdd={onAddStyleContainer} onRemove={onRemoveStyleContainer} />
              </PGtab>
              <PGtab name="css">
                <PGCssLibrary blockId={blockId} obj={container} onChange={onPickCssLibraryContainer} />
              </PGtab>
            </PGtabs>
          </PanelBody>

          <PanelBody title="Items Wrap" initialOpen={false}>


            <PGtabs
              activeTab="styles"
              orientation="horizontal"
              activeClass="active-tab"
              onSelect={(tabName) => { }}
              tabs={[

                {
                  name: 'styles',
                  title: 'Styles',
                  icon: pencil,
                  className: 'tab-style',
                },
                {
                  name: 'css',
                  title: 'CSS Library',
                  icon: cloud,
                  className: 'tab-css',
                },
              ]}
            >

              <PGtab name="styles">
                <PGStyles obj={itemsWrap} onChange={onChangeStyleItemsWrap} onAdd={onAddStyleItemsWrap} onRemove={onRemoveStyleItemsWrap} />
              </PGtab>
              <PGtab name="css">
                <PGCssLibrary blockId={blockId} obj={itemsWrap} onChange={onPickCssLibraryItemsWrap} />
              </PGtab>
            </PGtabs>
          </PanelBody>



          <PanelBody title="Loop Item" initialOpen={false} >
            <PGtabs
              activeTab="styles"
              orientation="horizontal"
              activeClass="active-tab"
              onSelect={(tabName) => { }}
              tabs={[
                {
                  name: 'styles',
                  title: 'Styles',
                  icon: pencil,
                  className: 'tab-style',
                },
                {
                  name: 'css',
                  title: 'CSS Library',
                  icon: cloud,
                  className: 'tab-css',
                },
              ]}
            >
              <PGtab name="styles">
                <PGStyles obj={itemWrap} onChange={onChangeStyleItemWrap} onAdd={onAddStyleItemWrap} onRemove={onRemoveStyleItemWrap} />
              </PGtab>
              <PGtab name="css">
                <PGCssLibrary blockId={blockId} obj={itemWrap} onChange={onPickCssLibraryItemWrap} />
              </PGtab>
            </PGtabs>
          </PanelBody>


          <PanelBody title="N'th Item" initialOpen={false} >
            <PGtabs
              activeTab="styles"
              orientation="horizontal"
              activeClass="active-tab"
              onSelect={(tabName) => { }}
              tabs={[
                {
                  name: 'styles',
                  title: 'Styles',
                  icon: pencil,
                  className: 'tab-style',
                },
                {
                  name: 'css',
                  title: 'CSS Library',
                  icon: cloud,
                  className: 'tab-css',
                },
              ]}
            >
              <PGtab name="styles">

              </PGtab>
              <PGtab name="css">

              </PGtab>
            </PGtabs>
          </PanelBody>



          <PanelBody title="Lazy load" initialOpen={false}>


            <PanelRow>
              <label for="">Enable Lazy Load</label>

              <SelectControl
                label=""
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
            </PanelRow>


            <PanelRow>
              <label for="">Lazy load Icon</label>

              <PGIconPicker library={(lazyLoad.options.icon != undefined) ? lazyLoad.options.icon.library : 'fontAwesome'} srcType={(lazyLoad.options.icon != undefined) ? lazyLoad.options.icon.srcType : 'class'} iconSrc={(lazyLoad.options.icon != undefined) ? lazyLoad.options.icon.iconSrc : ''} onChange={(arg) => {

                var options = { ...lazyLoad.options, icon: { srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc } };

                setAttributes({ lazyLoad: { ...lazyLoad, options: options } });


              }} />
            </PanelRow>



            <PanelRow>
              <label for="">Lazy Load Image</label>


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

                    <Button className='border' onClick={open}>Open Media Library</Button>


                  )}
                />
              </MediaUploadCheck>
            </PanelRow>




            <img className='my-5' src={lazyLoad.options.srcUrl} alt="" />

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
                  <label for="">Wrapper Tag</label>

                  <SelectControl
                    label=""
                    value={wrapper.options.tag}
                    options={[
                      { label: 'Choose', value: '' },
                      { label: 'H1', value: 'h1' },
                      { label: 'H2', value: 'h2' },
                      { label: 'H3', value: 'h3' },
                      { label: 'H4', value: 'h4' },
                      { label: 'H5', value: 'h5' },
                      { label: 'H6', value: 'h6' },
                      { label: 'SPAN', value: 'span' },
                      { label: 'DIV', value: 'div' },
                      { label: 'P', value: 'p' },


                    ]}
                    onChange={(newVal) => {

                      var options = { ...wrapper.options, tag: newVal };
                      setAttributes({ wrapper: { ...wrapper, options: options } });

                    }

                    }
                  />
                </PanelRow>


              </PGtab>
              <PGtab name="styles">
                <PGStyles obj={wrapper} onChange={onChangeStyleWrapper} onAdd={onAddStyleWrapper} onRemove={onRemoveStyleWrapper} onBulkAdd={onBulkAddWrapper} />
              </PGtab>
            </PGtabs>





          </PanelBody>



        </InspectorControls >


        <>



          {!hasInnerBlocks && (

            <div {...innerBlocksProps}>

              <div className='border p-5'>
                <div className='flex justify-between mb-5'>
                  <div className='text-xl rounded-sm'>Click to pick a variation</div>

                  <div className='bg-orange-400 hover:bg-orange-300 px-4 py-1 text-white cursor-pointer'
                    onClick={(ev) => {


                      replaceInnerBlocks(
                        clientId,
                        createBlocksFromInnerBlocksTemplate([
                          ['post-grid/post-grid-query', {}],
                          ['post-grid/post-grid-pagination', {}]
                        ]),
                        true
                      );
                    }}
                  >Skip</div>
                </div>

                <div className=''>


                  {variations.map((variation) => {

                    return (
                      <div className='text-center inline-block m-4 w-32 align-top p-4 bg-gray-400 cursor-pointer hover:bg-gray-500 relative' onClick={(ev) => {

                        if (variation.isPro) {
                          alert('Sorry this variation only vailable in pro version');
                          return false;
                        }



                        var atts = variation.atts;

                        var wrapper = { ...atts.wrapper };

                        var blockCssY = { ...atts.blockCssY };
                        var customCss = { ...atts.customCss };


                        var blockCssObj = {}

                        blockCssObj[wrapperSelector] = wrapper;


                        setAttributes({ wrapper: wrapper, customCss: customCss, });

                        var blockCssRules = myStore.getBlockCssRules(blockCssObj);

                        var items = { ...blockCssY.items, ...blockCssRules };


                        setAttributes({ blockCssY: { items: items } });



                        replaceInnerBlocks(
                          clientId,
                          createBlocksFromInnerBlocksTemplate(variation.innerBlocks),
                          true
                        );
                      }}>

                        <div>{variation.icon}</div>
                        <div>{variation.title}</div>

                        {variation.isPro && (<span className='bg-amber-400 rounded-sm text-sm inline-block  bg-opacity-90 text-white hover:text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                          <a target="_blank" className='block px-3' href={'https://pickplugins.com/post-grid/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=' + variation.label}>Pro</a>
                        </span>)}
                      </div>
                    )

                  })}
                </div>
              </div>

            </div>

          )}

          {hasInnerBlocks && (
            <div {...innerBlocksProps}>
              {innerBlocksProps.children}
            </div>
          )}


        </>

      </>

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file

    var attributes = props.attributes;
    var wrapper = attributes.wrapper;

    var blockId = attributes.blockId;


    const blockProps = useBlockProps.save({
      className: ` ${blockId} pg-post-grid`,
    });


    return (
      <InnerBlocks.Content />
    );


    //return null;

  }
})