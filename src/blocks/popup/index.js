import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover, Spinner, Tooltip } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';
import { applyFilters } from '@wordpress/hooks';

import { InnerBlocks, useBlockProps, useInnerBlocksProps, store as blockEditorStore, } from "@wordpress/block-editor"
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';

import { Icon, styles, settings, link, linkOff, close } from "@wordpress/icons";
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


import PGDropdown from '../../components/dropdown'

import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'
import PGCssLibrary from '../../components/css-library'
import PGIconPicker from '../../components/icon-picker'


import 'animate.css';
import '../../../node_modules/animate.css/animate.css';



var myStore = wp.data.select('postgrid-shop');





registerBlockType("post-grid/popup", {
  apiVersion: 2,
  title: "Popup",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><rect fill="#8db1ff" x="1.15" y="8.69" width="30.39" height="23.64" rx="0.73" /><circle fill="#1d4ed8" cx="28.84" cy="9.69" r="6.01" /><path fill="#fff" d="M29.21,9.69l2.25-2.26a.25.25,0,0,0,0-.37.27.27,0,0,0-.37,0L28.84,9.32,26.58,7.06a.26.26,0,1,0-.37.37l2.26,2.26-2.26,2.25a.27.27,0,0,0,0,.37.23.23,0,0,0,.18.08.24.24,0,0,0,.19-.08l2.26-2.25,2.25,2.25a.24.24,0,0,0,.19.08.22.22,0,0,0,.18-.08.25.25,0,0,0,0-.37Z" /></svg>


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


    inner: {
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


    closeWrap: {
      type: 'object',
      default: {
        options: {
          tag: 'span',
          class: '',
          animation: '',
          library: 'fontAwesome',
          srcType: "class", /*class, html, img, svg */
          iconSrc: 'fas fa-chevron-right',
        },
        styles:
        {
        },
      },
    },

    visible: {
      type: 'object',
      default: {

      },
    },

    editMode: {
      "type": "boolean",
      "default": true
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
  //usesContext: [],
  providesContext: {
    'post-grid/popupId': 'blockId',

  },
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

    var wrapper = attributes.wrapper;
    var closeWrap = attributes.closeWrap;
    var inner = attributes.inner;
    var visible = attributes.visible;
    var editMode = attributes.editMode;

    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;



    //const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    var breakPointX = myStore.getBreakPoint();


    // Wrapper CSS Class Selectors
    var wrapperSelector = blockClass;
    var closeWrapSelector = blockClass + " .close";
    var innerSelector = blockClass + " .inner";

    var closeAnimateArgs = {
      backOutDown: { label: 'backOutDown', value: 'backOutDown', },
      backOutLeft: { label: 'backOutLeft', value: 'backOutLeft', },
      backOutRight: { label: 'backOutRight', value: 'backOutRight', },
      backOutUp: { label: 'backOutUp', value: 'backOutUp', },
      bounceOut: { label: 'bounceOut', value: 'bounceOut', },
      bounceOutDown: { label: 'bounceOutDown', value: 'bounceOutDown', },
      bounceOutLeft: { label: 'bounceOutLeft', value: 'bounceOutLeft', },
      bounceOutRight: { label: 'bounceOutRight', value: 'bounceOutRight', },
      bounceOutUp: { label: 'bounceOutUp', value: 'bounceOutUp', },
      fadeOut: { label: 'fadeOut', value: 'fadeOut', },
      fadeOutDown: { label: 'fadeOutDown', value: 'fadeOutDown', },
      fadeOutDownBig: { label: 'fadeOutDownBig', value: 'fadeOutDownBig', },
      fadeOutLeft: { label: 'fadeOutLeft', value: 'fadeOutLeft', },
      fadeOutLeftBig: { label: 'fadeOutLeftBig', value: 'fadeOutLeftBig', },
      fadeOutRight: { label: 'fadeOutRight', value: 'fadeOutRight', },
      fadeOutRightBig: { label: 'fadeOutRightBig', value: 'fadeOutRightBig', },
      fadeOutUp: { label: 'fadeOutUp', value: 'fadeOutUp', },
      fadeOutUpBig: { label: 'fadeOutUpBig', value: 'fadeOutUpBig', },
      fadeOutTopLeft: { label: 'fadeOutTopLeft', value: 'fadeOutTopLeft', },
      fadeOutTopRight: { label: 'fadeOutTopRight', value: 'fadeOutTopRight', },
      fadeOutBottomRight: { label: 'fadeOutBottomRight', value: 'fadeOutBottomRight', },
      fadeOutBottomLeft: { label: 'fadeOutBottomLeft', value: 'fadeOutBottomLeft', },
      rotateOut: { label: 'rotateOut', value: 'rotateOut', },
      rotateOutDownLeft: { label: 'rotateOutDownLeft', value: 'rotateOutDownLeft', },
      rotateOutDownRight: { label: 'rotateOutDownRight', value: 'rotateOutDownRight', },
      rotateOutUpLeft: { label: 'rotateOutUpLeft', value: 'rotateOutUpLeft', },
      rotateOutUpRight: { label: 'rotateOutUpRight', value: 'rotateOutUpRight', },
      zoomOut: { label: 'zoomOut', value: 'zoomOut', },
      zoomOutDown: { label: 'zoomOutDown', value: 'zoomOutDown', },
      zoomOutLeft: { label: 'zoomOutLeft', value: 'zoomOutLeft', },
      zoomOutRight: { label: 'zoomOutRight', value: 'zoomOutRight', },
      zoomOutUp: { label: 'zoomOutUp', value: 'zoomOutUp', },
      slideOutDown: { label: 'slideOutDown', value: 'slideOutDown', },
      slideOutLeft: { label: 'slideOutLeft', value: 'slideOutLeft', },
      slideOutRight: { label: 'slideOutRight', value: 'slideOutRight', },
      slideOutUp: { label: 'slideOutUp', value: 'slideOutUp', },



    };


    var visbleArgsBasic = {
      initial: { label: 'Initial', description: 'Visble as soon as possible', args: { id: 'initial', value: 5 }, },
      delay: { label: 'Delay', description: 'Delay certain amount of time after page load.', args: { id: 'delay', value: 1000 }, },
      scrollParcent: { label: 'Scroll Parcent', description: 'After certain amount(parcent) of scroll', args: { id: 'scrollParcent', min: '30', max: 50 }, isPro: true },
      scrollFixed: { label: 'Scroll Fixed', description: 'After fixed amount of scroll', args: { id: 'scrollFixed', min: '30', max: 50 }, isPro: true },
      scrollEnd: { label: 'Scroll End', description: 'Scroll to end of page', args: { id: 'scrollEnd', min: '30', max: 50 }, isPro: true },
      scrollElement: { label: 'Scroll Element', description: 'Scroll to certain element by class or id', args: { id: 'scrollElement', value: '' }, isPro: true },
      clickFirst: { label: 'Click First', description: 'After first click on page', args: { id: 'clickFirst', value: 1 }, isPro: true },
      clickCount: { label: 'Click Count', description: 'After certain amount of click on page', args: { id: 'clickCount', value: 5 }, isPro: true },
      clickRight: { label: 'Click Right', description: 'on right click', args: { id: 'clickRight', value: 0 }, isPro: true },
      onExit: { label: 'On Exit', description: 'before close browser tab.', args: { id: 'onExit', value: 1 }, isPro: true },
      clickElement: { label: 'Click Element', description: 'After click an element by id or class', args: { id: 'clickElement', value: '' }, isPro: true },

      // onHover: { label: 'On Hover', description: 'Display popup on hover an element', args: { id: 'onHover', value: '' }, isPro: true },
      // isDevice: { label: 'Device', description: 'Display popup based on device', args: { id: 'isDevice', value: '' }, isPro: true },
      // isDate: { label: 'Is Date', description: 'Display popup based on date', args: { id: 'isDate', value: '', start: '', end: '' }, isPro: true },
      // visitCount: { label: 'Visit Count', description: 'Display popup based on date', args: { id: 'visitCount', value: '', compair: '' }, isPro: true },
      // isCountries: { label: 'Is Country', description: 'Display popup based on countries', args: { id: 'isCountries', value: '' }, isPro: true },
      // isBrowsers: { label: 'Is browsers', description: 'Display popup based on browsers', args: { id: 'isBrowsers', value: '' }, isPro: true },


      cookieExist: { label: 'Cookie Exist', description: 'If certain cookie exist', args: { id: 'cookieExist', value: '' }, isPro: true },
      cookieNotExist: { label: 'Cookie Not Exist', description: 'If certain cookie not exist', args: { id: 'cookieNotExist', value: '' }, isPro: true },
      userLogged: { label: 'User Logged', description: 'Show when user logged-in(any user)', args: { id: 'userLogged', value: '' }, isPro: true },
      userIds: { label: 'User Ids', description: 'If user with certain id loggedin', args: { id: 'userIds', value: '' }, isPro: true },

      // userRoles: { label: 'User Roles', description: 'Show when user has specific roles.', args: { id: 'userRoles', value: '' } },
      // userCapabilities: { label: 'User Capability', description: 'Show when user has specific capability.', args: { id: 'userCapabilities', Capabilities: [] } },
      // weekDays: { label: 'is Date', description: 'Show when specific week days', args: { id: 'weekDays', days: [] } },
      // isMonths: { label: 'is Months', description: 'Show when specific months', args: { id: 'isMonths', months: [] } },
      // isHours: { label: 'is Hours', description: 'Show when specific isHours', args: { id: 'isHours', hours: [] } },

      // postsIds: { label: 'Post Ids', description: 'Display popups on single post/page by ids', args: { id: 'postsIds', value: '' }, },
      // termIds: { label: 'Term Ids', description: 'Display popups on terms page by ids', args: { id: 'postsIds', value: '' }, },
      // authorIds: { label: 'Author Ids', description: 'Display popups on author page by ids', args: { id: 'postsIds', value: '' }, },
      // homePage: { label: 'Is Home', description: 'Display popups on home  page', args: { id: 'homePage', value: '' }, },

      // frontPage: { label: 'Is Home', description: 'Display popups on home  page', args: { id: 'frontPage', value: '' }, },
      // postsPage: { label: 'Is Posts Page', description: 'Display popups on blog  page', args: { id: 'postsPage', value: '' }, },
      // isDate: { label: 'Is Date Page', description: 'Display popups on date archive  page', args: { id: 'isDate', value: '' }, },
      // isMonth: { label: 'Is Date Page', description: 'Display popups on month archive  page', args: { id: 'isMonth', value: '' }, },
      // isYear: { label: 'Is Date Page', description: 'Display popups on year archive page', args: { id: 'isYear', value: '' }, },
      // is404: { label: 'Is Date Page', description: 'Display popups on 404 archive page', args: { id: 'is404', value: '' }, },

      // wcAccount: { label: 'Is WooCommerce Account', description: 'Display popups on WooCommerce my account page', args: { id: 'wcAccount', value: '' }, },
      // wcShop: { label: 'Is WooCommerce Shop', description: 'Display popups on WooCommerce shop page', args: { id: 'wcShop', value: '' }, },
      // searchPage: { label: 'Is Search page', description: 'Display popups on search page', args: { id: 'searchPage', value: '' }, },

      urlPrams: { label: 'URL Prams', description: 'If URL contain certain parameter(ex: domain.com/some-page?urlPram=pramVal)', args: { id: 'urlPrams', value: '' }, isPro: true },
      referrerExist: { label: 'Referrer Exist', description: 'if visitor come from external website.', args: { id: 'referrerExist', value: '' }, isPro: true },

    };


    let visbleArgs = applyFilters('visbleArgs', visbleArgsBasic);









    const { replaceInnerBlocks } = useDispatch(blockEditorStore);

    const hasInnerBlocks = useSelect(
      (select) => select(blockEditorStore).getBlocks(clientId).length > 0,
      [clientId]
    );


    //console.log(JSON.stringify(wp.data.select(blockEditorStore).getBlocks(clientId)));

    const [closeIconHtml, setcloseIconHtml] = useState('');

    useEffect(() => {

      var iconSrc = closeWrap.options.iconSrc;
      var iconHtml = `<span class="${iconSrc}"></span>`;

      setcloseIconHtml(iconHtml);
    }, [closeWrap.options]);


    useEffect(() => {

      setAttributes({ blockId: blockIdX });

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);


      // blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'display': { "Desktop": "grid" } };
      // blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'gap': { "Desktop": "20px" } };

      // setAttributes({ blockCssY: { items: blockCssY.items } });


      //setAttributes({ wrapper: { ...wrapper, styles: { display: { Desktop: 'grid' }, gap: { Desktop: '20px' } } } });



    }, [clientId]);


    useEffect(() => {


      setAttributes({ customCss: customCss });


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);


    useEffect(() => {


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);



    // var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    // for (var x in breakPoints) {

    //   var item = breakPoints[x];
    //   breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    // }



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
      // var path = [sudoScource, attr, breakPointX]
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




    function onChangeStyleInner(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, inner);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ inner: object });




      var elementSelector = myStore.getElementSelector(sudoScource, innerSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStyleInner(sudoScource, key) {

      var object = myStore.deletePropertyDeep(inner, [sudoScource, key, breakPointX]);
      setAttributes({ inner: object });


      var elementSelector = myStore.getElementSelector(sudoScource, innerSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }


    function onAddStyleInner(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, inner);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ inner: object });

    }




    function onBulkAddInner(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, inner);
      obj[sudoScource] = cssObj;

      setAttributes({ inner: obj });

      var selector = myStore.getElementSelector(sudoScource, innerSelector);
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






    function onChangeStyleCloseWrap(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, closeWrap);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ closeWrap: object });




      var elementSelector = myStore.getElementSelector(sudoScource, closeWrapSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStyleCloseWrap(sudoScource, key) {

      var object = myStore.deletePropertyDeep(closeWrap, [sudoScource, key, breakPointX]);
      setAttributes({ closeWrap: object });


      var elementSelector = myStore.getElementSelector(sudoScource, closeWrapSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }


    function onAddStyleCloseWrap(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, closeWrap);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ closeWrap: object });

    }




    function onBulkAddCloseWrap(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, closeWrap);
      obj[sudoScource] = cssObj;

      setAttributes({ closeWrap: obj });

      var selector = myStore.getElementSelector(sudoScource, closeWrapSelector);
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



    var RemoveVisibleGroup = function ({ title, index }) {
      console.log(index);

      return (
        <>
          <span className='cursor-pointer inline-block hover:bg-red-500 hover:text-white px-1 py-1' onClick={ev => {
            var visibleX = { ...visible }
            delete visibleX[index];
            setAttributes({ visible: visibleX });
          }}><Icon icon={close} /></span>
          <span>{title}</span>
        </>
      )
    }


    var RemoveVisibleArg = function ({ title, index, groupId }) {

      console.log(groupId);
      console.log(index);


      return (
        <>
          <span className='cursor-pointer inline-block hover:bg-red-500 hover:text-white px-1 py-1' onClick={ev => {

            var visibleX = { ...visible }
            visibleX[groupId].args.splice(index, 1);

            setAttributes({ visible: visibleX });
          }}><Icon icon={close} /></span>

          <span>{title}</span>
        </>


      )

    }



    const ALLOWED_BLOCKS = ['post-grid/text'];

    const MY_TEMPLATE = [
      ['post-grid/text', {}],

    ];


    const blockProps = useBlockProps({
      className: ` ${blockId} pg-popup `,
    });


    const innerBlocksProps = useInnerBlocksProps(blockProps, {
      //allowedBlocks: ALLOWED_BLOCKS,
      //template: MY_TEMPLATE,
      //orientation: 'horizontal',
      templateInsertUpdatesSelection: true,
      renderAppender: InnerBlocks.ButtonBlockAppender

    });



    return (
      <>
        <InspectorControls >

          <div className='p-3'>
            <ToggleControl
              label="Edit Mode?"
              help={editMode ? 'Edit Mode Enabled' : 'Edit Mode Disabled.'}
              checked={editMode ? true : false}
              onChange={(e) => {


                setAttributes({ editMode: (editMode) ? false : true });
              }}
            />
          </div>

          {/* <PanelBody title="Templates" initialOpen={false}>
          </PanelBody> */}





          <PanelBody title="Visiblity" initialOpen={true}>


            <div className='bg-blue-500 p-2 px-4 text-white inline-block cursor-pointer rounded-sm'
              onClick={ev => {

                var visibleX = { ...visible, }

                var index = Object.entries(visibleX).length;

                visibleX[index] = { logic: 'OR', title: '', args: [] }

                setAttributes({ visible: visibleX });

              }}>Add Group</div>





            <div class="my-4">

              {Object.entries(visible).map((group, groupIndex) => {

                var groupId = group[0];
                var groupData = group[1];




                return (

                  <PanelBody title={<RemoveVisibleGroup title={groupIndex} index={groupId} />} initialOpen={false}>

                    <PanelRow className='my-3'>
                      {/* <label>Logic?</label>
                      <PGDropdown position="bottom right" variant="secondary" buttonTitle={(groupData['logic'] == undefined) ? 'Choose' : groupData['logic']} options={[
                        { label: 'OR', value: 'OR' },
                        { label: 'AND', value: 'AND' }
                      ]}
                        onChange={(option, index) => {
                          var visibleX = { ...visible, }
                          visibleX[groupId]['logic'] = option.value;
                          setAttributes({ visible: visibleX });
                        }} values=""></PGDropdown> */}


                      <PGDropdown position="bottom right" variant="secondary" buttonTitle={'Add Condition'} options={visbleArgs}
                        onChange={(option, index) => {
                          var visibleX = { ...visible, }

                          visibleX[groupId]['args'].push(option.args)
                          setAttributes({ visible: visibleX });
                        }} values=""></PGDropdown>
                    </PanelRow>



                    {visible[groupId]['args'] != undefined && visible[groupId]['args'].map((item, index) => {
                      var id = item.id;

                      //console.log(item);


                      return (
                        <>
                          {id == 'initial' && (
                            <PanelBody title={<RemoveVisibleArg title={(visbleArgs[id] == undefined) ? id : visbleArgs[id].label} index={id} groupId={groupId} />} initialOpen={false}>
                              <div>No Option avilable for this condition.</div>
                            </PanelBody>
                          )}

                          {id == 'delay' && (
                            <PanelBody title={<RemoveVisibleArg title={(visbleArgs[id] == undefined) ? id : visbleArgs[id].label} index={id} groupId={groupId} />} initialOpen={false}>

                              <PanelRow className='mb-4'>
                                <label for="">Element ID/Class</label>
                                <InputControl
                                  className='mr-2'
                                  placeholder=".element or #elementId"
                                  value={item.value}
                                  onChange={(newVal) => {
                                    var visibleX = { ...visible, }
                                    visibleX[groupId]['args'][index].value = newVal
                                    setAttributes({ visible: visibleX });
                                  }}
                                />
                              </PanelRow>

                            </PanelBody>
                          )}





                          {id == 'scrollParcent' && (
                            <PanelBody title={<RemoveVisibleArg title={(visbleArgs[id] == undefined) ? id : visbleArgs[id].label} index={id} groupId={groupId} />} initialOpen={false}>

                              <PanelRow className='mb-4'>
                                <label for="">Scroll Minimum</label>
                                <InputControl
                                  className='mr-2'
                                  value={item.min}
                                  onChange={(newVal) => {
                                    var visibleX = { ...visible, }
                                    visibleX[groupId]['args'][index].min = newVal
                                    setAttributes({ visible: visibleX });
                                  }}
                                />
                              </PanelRow>

                              <PanelRow className='mb-4'>
                                <label for="">Scroll Max</label>
                                <InputControl
                                  className='mr-2'
                                  value={item.max}
                                  onChange={(newVal) => {
                                    var visibleX = { ...visible, }
                                    visibleX[groupId]['args'][index].max = newVal
                                    setAttributes({ visible: visibleX });
                                  }}
                                />
                              </PanelRow>





                            </PanelBody>
                          )}

                          {id == 'scrollFixed' && (
                            <PanelBody title={<RemoveVisibleArg title={(visbleArgs[id] == undefined) ? id : visbleArgs[id].label} index={id} groupId={groupId} />} initialOpen={false}>

                              <PanelRow className='mb-4'>
                                <label for="">Scroll Minimum</label>
                                <InputControl
                                  className='mr-2'
                                  value={item.min}
                                  onChange={(newVal) => {
                                    var visibleX = { ...visible, }
                                    visibleX[groupId]['args'][index].min = newVal
                                    setAttributes({ visible: visibleX });
                                  }}
                                />
                              </PanelRow>

                              <PanelRow className='mb-4'>
                                <label for="">Scroll Max</label>
                                <InputControl
                                  className='mr-2'
                                  value={item.max}
                                  onChange={(newVal) => {
                                    var visibleX = { ...visible, }
                                    visibleX[groupId]['args'][index].max = newVal
                                    setAttributes({ visible: visibleX });
                                  }}
                                />
                              </PanelRow>


                            </PanelBody>
                          )}

                          {id == 'scrollEnd' && (
                            <PanelBody title={<RemoveVisibleArg title={(visbleArgs[id] == undefined) ? id : visbleArgs[id].label} index={id} groupId={groupId} />} initialOpen={false}>


                              <div>No Option avilable for this condition.</div>


                            </PanelBody>
                          )}

                          {id == 'scrollElement' && (
                            <PanelBody title={<RemoveVisibleArg title={(visbleArgs[id] == undefined) ? id : visbleArgs[id].label} index={id} groupId={groupId} />} initialOpen={false}>

                              <PanelRow className='mb-4'>
                                <label for="">Element Class/ID</label>
                                <InputControl
                                  className='mr-2'
                                  value={item.value}
                                  onChange={(newVal) => {
                                    var visibleX = { ...visible, }
                                    visibleX[groupId]['args'][index].value = newVal
                                    setAttributes({ visible: visibleX });
                                  }}
                                />
                              </PanelRow>


                            </PanelBody>
                          )}

                          {id == 'clickFirst' && (
                            <PanelBody title={<RemoveVisibleArg title={(visbleArgs[id] == undefined) ? id : visbleArgs[id].label} index={id} groupId={groupId} />} initialOpen={false}>
                              <div>No Option avilable for this condition.</div>
                            </PanelBody>
                          )}

                          {id == 'clickCount' && (
                            <PanelBody title={<RemoveVisibleArg title={(visbleArgs[id] == undefined) ? id : visbleArgs[id].label} index={id} groupId={groupId} />} initialOpen={false}>


                              <PanelRow className='mb-4'>
                                <label for="">Click Count</label>
                                <InputControl
                                  className='mr-2'
                                  value={item.value}
                                  onChange={(newVal) => {
                                    var visibleX = { ...visible, }
                                    visibleX[groupId]['args'][index].value = newVal
                                    setAttributes({ visible: visibleX });
                                  }}
                                />
                              </PanelRow>

                            </PanelBody>
                          )}

                          {id == 'clickRight' && (
                            <PanelBody title={<RemoveVisibleArg title={(visbleArgs[id] == undefined) ? id : visbleArgs[id].label} index={id} groupId={groupId} />} initialOpen={false}>


                              <ToggleControl
                                label="Disabled right menu?"
                                help={item.value ? 'Right Menu Disabled ' : 'Right Menu Enabled.'}
                                checked={item.value ? true : false}
                                onChange={(e) => {

                                  var visibleX = { ...visible, }
                                  visibleX[groupId]['args'][index].value = (item.value) ? 0 : 1
                                  setAttributes({ visible: visibleX });
                                }}
                              />








                            </PanelBody>
                          )}

                          {id == 'onExit' && (
                            <PanelBody title={<RemoveVisibleArg title={(visbleArgs[id] == undefined) ? id : visbleArgs[id].label} index={id} groupId={groupId} />} initialOpen={false}>
                              <div>No Option avilable for this condition.</div>
                            </PanelBody>
                          )}

                          {id == 'clickElement' && (
                            <PanelBody title={<RemoveVisibleArg title={(visbleArgs[id] == undefined) ? id : visbleArgs[id].label} index={id} groupId={groupId} />} initialOpen={false}>

                              <PanelRow className='mb-4'>
                                <label for="">{__('Element ID/Class', 'post-grid')}</label>
                                <InputControl
                                  className='mr-2'
                                  placeholder=".element or #elementId"
                                  value={item.value}
                                  onChange={(newVal) => {
                                    var visibleX = { ...visible, }
                                    visibleX[groupId]['args'][index].value = newVal
                                    setAttributes({ visible: visibleX });
                                  }}
                                />
                              </PanelRow>


                            </PanelBody>
                          )}

                          {id == 'cookieExist' && (
                            <PanelBody title={<RemoveVisibleArg title={(visbleArgs[id] == undefined) ? id : visbleArgs[id].label} index={id} groupId={groupId} />} initialOpen={false}>

                              <PanelRow className='mb-4'>
                                <label for="">Cookie Name</label>
                                <InputControl
                                  className='mr-2'
                                  value={item.value}
                                  onChange={(newVal) => {
                                    var visibleX = { ...visible, }
                                    visibleX[groupId]['args'][index].value = newVal
                                    setAttributes({ visible: visibleX });
                                  }}
                                />
                              </PanelRow>

                            </PanelBody>
                          )}
                          {id == 'cookieNotExist' && (
                            <PanelBody title={<RemoveVisibleArg title={(visbleArgs[id] == undefined) ? id : visbleArgs[id].label} index={id} groupId={groupId} />} initialOpen={false}>

                              <PanelRow className='mb-4'>
                                <label for="">Cookie Name</label>
                                <InputControl
                                  className='mr-2'
                                  value={item.value}
                                  onChange={(newVal) => {
                                    var visibleX = { ...visible, }
                                    visibleX[groupId]['args'][index].value = newVal
                                    setAttributes({ visible: visibleX });
                                  }}
                                />
                              </PanelRow>

                            </PanelBody>
                          )}
                          {id == 'userLogged' && (
                            <PanelBody title={<RemoveVisibleArg title={(visbleArgs[id] == undefined) ? id : visbleArgs[id].label} index={id} groupId={groupId} />} initialOpen={false}>
                              <div>No Option avilable for this condition.</div>
                            </PanelBody>
                          )}

                          {id == 'userIds' && (
                            <PanelBody title={<RemoveVisibleArg title={(visbleArgs[id] == undefined) ? id : visbleArgs[id].label} index={id} groupId={groupId} />} initialOpen={false}>

                              <PanelRow className='mb-4'>
                                <label for="">User IDs</label>
                                <InputControl
                                  className='mr-2'
                                  placeholder="1,2,3"
                                  value={item.value}
                                  onChange={(newVal) => {
                                    var visibleX = { ...visible, }
                                    visibleX[groupId]['args'][index].value = newVal
                                    setAttributes({ visible: visibleX });
                                  }}
                                />
                              </PanelRow>
                            </PanelBody>
                          )}
                          {id == 'urlPrams' && (
                            <PanelBody title={<RemoveVisibleArg title={(visbleArgs[id] == undefined) ? id : visbleArgs[id].label} index={id} groupId={groupId} />} initialOpen={false}>

                              <PanelRow className='mb-4'>
                                <label for="">URL Parameter</label>
                                <InputControl
                                  className='mr-2'
                                  value={item.value}
                                  onChange={(newVal) => {
                                    var visibleX = { ...visible, }
                                    visibleX[groupId]['args'][index].value = newVal
                                    setAttributes({ visible: visibleX });
                                  }}
                                />
                              </PanelRow>

                            </PanelBody>
                          )}
                          {id == 'referrerExist' && (
                            <PanelBody title={<RemoveVisibleArg title={(visbleArgs[id] == undefined) ? id : visbleArgs[id].label} index={id} groupId={groupId} />} initialOpen={false}>

                              <PanelRow className='mb-4'>
                                <label for="">Referrer Domain</label>
                                <InputControl
                                  className='mr-2'
                                  value={item.value}
                                  onChange={(newVal) => {
                                    var visibleX = { ...visible, }
                                    visibleX[groupId]['args'][index].value = newVal
                                    setAttributes({ visible: visibleX });
                                  }}
                                />
                              </PanelRow>


                            </PanelBody>
                          )}


                        </>
                      )
                    })
                    }



                  </PanelBody>

                )

              })}



            </div>












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

              </PGtab>
              <PGtab name="styles">
                <PGStyles obj={wrapper} onChange={onChangeStyleWrapper} onAdd={onAddStyleWrapper} onRemove={onRemoveStyleWrapper} onBulkAdd={onBulkAddWrapper} />
              </PGtab>
            </PGtabs>
          </PanelBody>
          <PanelBody title="Inner" initialOpen={false}>
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

              </PGtab>
              <PGtab name="styles">
                <PGStyles obj={inner} onChange={onChangeStyleInner} onAdd={onAddStyleInner} onRemove={onRemoveStyleInner} onBulkAdd={onBulkAddInner} />
              </PGtab>
            </PGtabs>
          </PanelBody>

          <PanelBody title="Close" initialOpen={false}>
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
                  <label for="">Choose Icon</label>

                  <PGIconPicker library={closeWrap.options.library} srcType={closeWrap.options.srcType} iconSrc={closeWrap.options.iconSrc} onChange={(arg) => {


                    var options = { ...closeWrap.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };

                    setAttributes({ closeWrap: { ...closeWrap, options: options } });



                  }} />
                </PanelRow>


                <PanelRow>
                  <label for="">Out animation</label>

                  <PGDropdown position="bottom right" variant="secondary" buttonTitle={(closeAnimateArgs[closeWrap.options.animation] == undefined) ? 'Choose' : closeAnimateArgs[closeWrap.options.animation].label} options={closeAnimateArgs}
                    onChange={(option, index) => {

                      var options = { ...closeWrap.options, animation: option.value };

                      setAttributes({ closeWrap: { ...closeWrap, options: options } });

                      console.log(option);


                      const element = document.querySelector(wrapperSelector + ' .inner');
                      element.classList.add('animate__animated', 'animate__' + option.value);

                      setTimeout(() => {
                        element.classList.remove('animate__animated', 'animate__' + option.value);


                      }, 2000)


                    }} values=""></PGDropdown>

                </PanelRow>



              </PGtab>
              <PGtab name="styles">
                <PGStyles obj={closeWrap} onChange={onChangeStyleCloseWrap} onAdd={onAddStyleCloseWrap} onRemove={onRemoveStyleCloseWrap} onBulkAdd={onBulkAddCloseWrap} />
              </PGtab>
            </PGtabs>
          </PanelBody>






          <PanelBody title="Custom Style" initialOpen={false}>


            <p className=''>Please use following class selector to apply your custom CSS</p>


            <div className='my-3'>
              <p className='font-bold'>Text </p>
              <p><code>{wrapperSelector}{'{}'} </code></p>
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

          <div className='px-2'>
            <PGMailSubsctibe />
            <PGContactSupport utm={{ utm_source: 'BlockText', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />
          </div>


        </InspectorControls >


        <>




          {!hasInnerBlocks && (

            <div {...innerBlocksProps}>

              <div className='border p-5'>
                <div className='flex justify-between mb-5'>
                  <div className='text-xl rounded-sm'>Click to pick a variation</div>

                  <div className='bg-orange-400 hidden hover:bg-orange-300 px-4 py-1 text-white cursor-pointer'
                    onClick={(ev) => {




                      replaceInnerBlocks(
                        clientId,
                        createBlocksFromInnerBlocksTemplate([['post-grid/text', {}],]),
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
                        var closeWrap = { ...atts.closeWrap };
                        var inner = { ...atts.inner };

                        var blockCssY = { ...atts.blockCssY };
                        var customCss = { ...atts.customCss };


                        var blockCssObj = {}

                        blockCssObj[wrapperSelector] = wrapper;
                        blockCssObj[closeWrapSelector] = closeWrap;
                        blockCssObj[innerSelector] = inner;


                        setAttributes({ wrapper: wrapper, closeWrap: closeWrap, inner: inner, customCss: customCss, });

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
                          <a target="_blank" className='block px-3' href={'https://pickplugins.com/post-grid/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=' + x.label}>Pro</a>
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

              {!editMode && (
                <div className='text-center inline-block mx-auto' onClick={(e) => {
                  setAttributes({ editMode: (editMode) ? false : true });
                }}>Enable Edit Mode</div>
              )}

              {editMode && (
                <div className='inner'>
                  <span className='close'>
                    <span className='icon' dangerouslySetInnerHTML={{ __html: closeIconHtml }} />
                  </span>
                  {innerBlocksProps.children}
                </div>
              )}

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
      className: ` ${blockId} pg-popup`,
    });


    return (
      <InnerBlocks.Content />
    );


    //return null;

  }
})