import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover, Spinner, Placeholder } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';
import { applyFilters } from '@wordpress/hooks';

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl, InnerBlocks, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'
import { Icon, styles, settings, link, linkOff, more } from "@wordpress/icons";

import IconToggle from '../../components/icon-toggle'
import Typography from '../../components/typography'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'

import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'




import PGStyles from '../../components/styles'
import PGIconPicker from '../../components/icon-picker'
import PGCssLibrary from '../../components/css-library'

var myStore = wp.data.select('postgrid-shop');


registerBlockType("post-grid/accordion-nested-item", {
  apiVersion: 2,
  title: "Accordion Item",
  parent: ['post-grid/accordion-nested'],

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" ><rect fill="#1d4ed8" y="6.2" width="36" height="4.21" /><path fill="#8db1ff" d="M4,8.87a.14.14,0,0,1-.1,0L3.13,8a.12.12,0,0,1,0-.17.12.12,0,0,1,.17,0L4,8.55l.64-.75a.13.13,0,0,1,.18,0A.12.12,0,0,1,4.8,8l-.74.86A.12.12,0,0,1,4,8.87Z" /><rect fill="#8db1ff" x="6.07" y="7.76" width="17.44" height="1.11" /><rect fill="#8db1ff" y="16.16" width="36" height="8.66" /><rect fill="#8db1ff" y="11.18" width="36" height="4.21" /><path fill="#1d4ed8" d="M4,12.73a.12.12,0,0,1,.09,0l.74.86a.12.12,0,0,1,0,.17.13.13,0,0,1-.18,0L4,13.05l-.65.75a.12.12,0,0,1-.17,0,.12.12,0,0,1,0-.17l.74-.86A.14.14,0,0,1,4,12.73Z" /><rect fill="#1d4ed8" x="6.07" y="12.73" width="17.44" height="1.11" /><rect fill="#1d4ed8" y="25.58" width="36" height="4.21" /><path fill="#8db1ff" d="M4,28.24a.13.13,0,0,1-.1,0l-.74-.86a.14.14,0,0,1,0-.18.12.12,0,0,1,.17,0l.65.75.64-.75a.12.12,0,1,1,.19.16l-.74.86A.11.11,0,0,1,4,28.24Z" /><rect fill="#8db1ff" x="6.07" y="27.13" width="17.44" height="1.11" /></svg>


    ,
  },


  attributes: {



    content: {
      type: 'object',
      default: {
        options: {
          tag: 'div',
          class: 'accordion-content',
        },

        styles:
        {
          backgroundColor: { Desktop: '' },

        },
      },
    },
    header: {
      type: 'object',
      default: {
        options: {
          tag: 'div',
          class: 'accordion-header',
        },

        styles:
        {
          backgroundColor: { Desktop: '' },
          display: { Desktop: 'flex' },

        },
      },
    },

    headerLabel: {
      type: 'object',
      default: {
        options: {
          text: 'Accordion Header Text',
          tag: 'div',
          class: 'accordion-header-label',
        },

        styles:
        {
          backgroundColor: { Desktop: '' },

        },
      },
    },
    labelCounter: {
      type: 'object',
      default: {
        options: {
          position: '',
          tag: 'div',
          class: 'accordion-header-counter',
        },

        styles:
        {


        },
      },
    },



    labelIcon: {
      type: 'object',
      default: {
        options: {
          library: 'fontAwesome',
          srcType: "class",
          iconSrc: 'fas fa-angle-down',
          position: 'left',
          enable: false,
          class: 'accordion-icon',
        },

        styles:
        {

        },
      },
    },

    icon: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', srcType: "class", iconSrc: 'fas fa-angle-down', position: 'left', class: 'accordion-icon', },

        styles:
        {

        },
      },
    },

    iconToggle: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', srcType: "class", iconSrc: 'fas fa-angle-up', class: 'accordion-icon-toggle', },

        styles:
        {


        },
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
  usesContext: [],

  category: "post-grid",


  edit: function (props) {


    var attributes = props.attributes;
    var setAttributes = props.setAttributes;
    var context = props.context;
    var clientId = props.clientId;


    var blockId = attributes.blockId;

    var blockIdX = attributes.blockId ? attributes.blockId : 'pg' + clientId.split('-').pop();
    var blockClass = '.' + blockIdX;

    var header = attributes.header;
    var headerLabel = attributes.headerLabel;
    var labelCounter = attributes.labelCounter;

    var labelIcon = attributes.labelIcon;

    var content = attributes.content;
    var icon = attributes.icon;
    var iconToggle = attributes.iconToggle;

    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;




    //const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    var breakPointX = myStore.getBreakPoint();

    const [isLoading, setisLoading] = useState(false);
    const [toggled, setToggled] = useState(false);


    const contentSelector = blockClass + '-accordion-content';
    const headerSelector = blockClass + '-accordion-header';


    const headerLabelSelector = blockClass + '-accordion-header-label';
    const labelIconSelector = blockClass + '-accordion-header-label-icon';
    const labelCounterSelector = blockClass + '-accordion-label-counter';

    const iconSelector = blockClass + '-accordion-icon';
    const iconToggleSelector = blockClass + '-accordion-icon-toggle';
    let isProFeature = applyFilters('isProFeature', true);


    const [iconHtml, setIconHtml] = useState('');
    const [iconToggleHtml, seticonToggleHtml] = useState('');
    const [labelIconHtml, setlabelIconHtml] = useState('');


    useEffect(() => {

      console.log(icon);


      var iconSrc = icon.options.iconSrc;
      var iconHtml = `<span class="accordion-icon ${iconSrc}"></span>`;
      setIconHtml(iconHtml);
    }, [icon, icon.options.iconSrc]);






    useEffect(() => {

      var iconSrc = iconToggle.options.iconSrc;
      var iconHtml = `<span class="accordion-icon-toggle ${iconSrc}"></span>`;
      seticonToggleHtml(iconHtml);
    }, [iconToggle, iconToggle.options.iconSrc]);

    useEffect(() => {

      var iconSrc = labelIcon.options.iconSrc;
      var iconHtml = `<span class="accordion-icon-toggle ${iconSrc}"></span>`;
      setlabelIconHtml(iconHtml);
    }, [labelIcon, labelIcon.options.iconSrc]);



    useEffect(() => {

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);




    useEffect(() => {

      setAttributes({ blockId: blockIdX });
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [clientId]);


    useEffect(() => {


      setAttributes({ customCss: customCss });

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);


    // var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    // for (var x in breakPoints) {

    //   var item = breakPoints[x];
    //   breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    // }






    function onChangeStyleHeader(sudoScource, newVal, attr) {



      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, header);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ header: object });




      var elementSelector = myStore.getElementSelector(sudoScource, headerSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });




    }






    function onRemoveStyleHeader(sudoScource, key) {


      var object = myStore.deletePropertyDeep(header, [sudoScource, key, breakPointX]);
      setAttributes({ header: object });


      var elementSelector = myStore.getElementSelector(sudoScource, headerSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }





    function onAddStyleHeader(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, header);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ header: object });

    }


    function onChangeStyleHeaderLabel(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, headerLabel);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ headerLabel: object });

      var elementSelector = myStore.getElementSelector(sudoScource, headerLabelSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }






    function onRemoveStyleHeaderLabel(sudoScource, key) {


      var object = myStore.deletePropertyDeep(headerLabel, [sudoScource, key, breakPointX]);
      setAttributes({ headerLabel: object });


      var elementSelector = myStore.getElementSelector(sudoScource, headerLabelSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });

    }





    function onAddStyleHeaderLabel(sudoScource, key) {
      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, headerLabel);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ headerLabel: object });

    }


    function onPickCssLibraryHeaderLabel(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        headerLabel[sudoScource] = sudoScourceArgs;
      })

      var headerLabelX = Object.assign({}, headerLabel);
      setAttributes({ headerLabel: headerLabelX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, headerLabelSelector);


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


    function onChangeStyleLabelCounter(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, labelCounter);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ labelCounter: object });

      var elementSelector = myStore.getElementSelector(sudoScource, labelCounterSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }

    function onRemoveStyleLabelCounter(sudoScource, key) {


      var object = myStore.deletePropertyDeep(labelCounter, [sudoScource, key, breakPointX]);
      setAttributes({ labelCounter: object });


      var elementSelector = myStore.getElementSelector(sudoScource, labelCounterSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });

    }

    function onAddStyleLabelCounter(sudoScource, key) {
      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, labelCounter);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ labelCounter: object });

    }


    function onPickCssLibraryLabelCounter(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        labelCounter[sudoScource] = sudoScourceArgs;
      })

      var labelCounterX = Object.assign({}, labelCounter);
      setAttributes({ labelCounter: labelCounterX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, labelCounterSelector);


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


    function onChangeStyleContent(sudoScource, newVal, attr) {


      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, content);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ content: object });




      var elementSelector = myStore.getElementSelector(sudoScource, contentSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });












    }






    function onRemoveStyleContent(sudoScource, key) {


      var object = myStore.deletePropertyDeep(content, [sudoScource, key, breakPointX]);
      setAttributes({ content: object });


      var elementSelector = myStore.getElementSelector(sudoScource, contentSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }





    function onAddStyleContent(sudoScource, key) {



      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, content);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ content: object });
    }




    function onChangeStyleIcon(sudoScource, newVal, attr) {



      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, icon);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ icon: object });

      var elementSelector = myStore.getElementSelector(sudoScource, iconSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });






    }






    function onRemoveStyleIcon(sudoScource, key) {


      var object = myStore.deletePropertyDeep(icon, [sudoScource, key, breakPointX]);
      setAttributes({ icon: object });


      var elementSelector = myStore.getElementSelector(sudoScource, iconSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }


    function onAddStyleIcon(sudoScource, key) {



      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, icon);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ icon: object });
    }



    function onChangeStyleIconToggle(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, iconToggle);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ iconToggle: object });

      var elementSelector = myStore.getElementSelector(sudoScource, iconToggleSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }






    function onRemoveStyleIconToggle(sudoScource, key) {


      var object = myStore.deletePropertyDeep(iconToggle, [sudoScource, key, breakPointX]);
      setAttributes({ iconToggle: object });


      var elementSelector = myStore.getElementSelector(sudoScource, iconToggleSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });
    }


    function onAddStyleIconToggle(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, iconToggle);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ iconToggle: object });
    }


    function onPickCssLibraryIconToggle(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        iconToggle[sudoScource] = sudoScourceArgs;
      })

      var iconToggleX = Object.assign({}, iconToggle);
      setAttributes({ iconToggle: iconToggleX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, iconToggleSelector);


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














    function onPickCssLibraryHeader(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        header[sudoScource] = sudoScourceArgs;
      })

      var headerX = Object.assign({}, header);
      setAttributes({ header: headerX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, headerSelector);


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

    const setActiveTab = (uid) => {
      //setAttributes({ activeTab: uid });
      //const parentBlock = select('core/block-editor').getBlock(clientId);
      const parentClientId = select('core/block-editor').getBlockHierarchyRootClientId(clientId);


      wp.data.dispatch('core/block-editor').selectBlock(parentClientId)
      //wp.data.dispatch( 'core/edit-post' ).openGeneralSidebar( 'edit-post/block' )


      // parentBlock.innerBlocks.forEach((innerBlock) => {
      //   dispatch('core/block-editor').updateBlockAttributes(
      //     innerBlock.clientId,
      //     {
      //       activeTab: uid,
      //     }
      //   );
      // });
    };


    function onPickCssLibraryContent(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        content[sudoScource] = sudoScourceArgs;
      })

      var contentX = Object.assign({}, content);
      setAttributes({ content: contentX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, contentSelector);


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



    function onPickCssLibraryIcon(args) {


      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        icon[sudoScource] = sudoScourceArgs;
      })

      var iconX = Object.assign({}, icon);
      setAttributes({ icon: iconX });

      var styleObj = {};

      Object.entries(args).map(x => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(sudoScource, iconSelector);


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






    const blockProps = useBlockProps();






    var allowedExtraBlocks = [];

    wp.blocks.getBlockTypes().forEach(function (blockType) {
      if (blockType.name.startsWith('post-grid/accordion-nested')) {

        if (!isProFeature) {
          allowedExtraBlocks.push(blockType.name)

        }

      } else {

        allowedExtraBlocks.push(blockType.name)

      }
    });







    return (



      <>

        <InspectorControls >
          <div className='px-3' >


            <PanelBody title="Header" initialOpen={false}>


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
                  {
                    name: 'css',
                    title: 'CSS Library',
                    icon: styles,
                    className: 'tab-css',
                  },
                ]}
              >
                <PGtab name="options">

                  <PanelRow>
                    <label for="">Wrapper Tag</label>

                    <SelectControl
                      label=""
                      value={header.options.tag}
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

                        var options = { ...header.options, tag: newVal };
                        setAttributes({ header: { ...header, options: options } });

                      }

                      }
                    />
                  </PanelRow>


                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={header} onChange={onChangeStyleHeader} onAdd={onAddStyleHeader} onRemove={onRemoveStyleHeader} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={header} onChange={onPickCssLibraryHeader} />
                </PGtab>
              </PGtabs>




            </PanelBody>

            <PanelBody title="Header Label" initialOpen={false}>


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
                  {
                    name: 'css',
                    title: 'CSS Library',
                    icon: styles,
                    className: 'tab-css',
                  },
                ]}
              >
                <PGtab name="options">

                  <PanelRow>
                    <label for="">Wrapper Tag</label>

                    <SelectControl
                      label=""
                      value={headerLabel.options.tag}
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
                        { label: 'a', value: 'a' },


                      ]}
                      onChange={(newVal) => {

                        var options = { ...headerLabel.options, tag: newVal };
                        setAttributes({ headerLabel: { ...headerLabel, options: options } });

                      }

                      }
                    />
                  </PanelRow>

                  {headerLabel.options.tag == 'a' && (

                    <PanelRow className='mb-4'>
                      <label for="">Custom Slug</label>
                      <InputControl
                        className='mr-2'
                        value={headerLabel.options.slug == undefined ? '' : headerLabel.options.slug}
                        onChange={(newVal) => {


                          var options = { ...headerLabel.options, slug: newVal };
                          setAttributes({ headerLabel: { ...headerLabel, options: options } });

                        }}
                      />
                    </PanelRow>

                  )}



                  <ToggleControl
                    label="Enable Label Icon?"
                    help={labelIcon.options.enable ? 'Label Icon Enabled' : 'Label Icon Disabled.'}
                    checked={labelIcon.options.enable ? true : false}
                    onChange={(e) => {



                      var options = { ...labelIcon.options, enable: labelIcon.options.enable ? false : true };
                      setAttributes({ labelIcon: { ...labelIcon, options: options } });





                    }}
                  />

                  {labelIcon.options.enable && (
                    <PanelRow>
                      <label for="">Choose Icon</label>

                      <PGIconPicker library={labelIcon.options.library} srcType={labelIcon.options.srcType} iconSrc={labelIcon.options.iconSrc} onChange={(arg) => {


                        var options = { ...labelIcon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
                        setAttributes({ labelIcon: { ...labelIcon, options: options } });

                        var childBlocks = select('core/block-editor').getBlocksByClientId(clientId)[0].innerBlocks;

                        childBlocks.map(childBlock => {

                          var childClientId = childBlock.clientId;
                          var childAttributes = childBlock.attributes;
                          childAttributes.labelIcon.options.srcType = arg.srcType;
                          childAttributes.labelIcon.options.library = arg.library;
                          childAttributes.labelIcon.options.iconSrc = arg.iconSrc;

                          dispatch('core/block-editor').updateBlockAttributes(childClientId, childAttributes)
                          wp.data.dispatch('core/block-editor').selectBlock(childClientId)
                        })

                        wp.data.dispatch('core/block-editor').selectBlock(clientId)

                      }} />
                    </PanelRow>

                  )}


                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={headerLabel} onChange={onChangeStyleHeaderLabel} onAdd={onAddStyleHeaderLabel} onRemove={onRemoveStyleHeaderLabel} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={headerLabel} onChange={onPickCssLibraryHeaderLabel} />
                </PGtab>
              </PGtabs>




            </PanelBody>


            <PanelBody title="Label Counter" initialOpen={false}>


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
                  {
                    name: 'css',
                    title: 'CSS Library',
                    icon: styles,
                    className: 'tab-css',
                  },
                ]}
              >
                <PGtab name="options">

                  <ToggleControl
                    label="Enable Header Counter?"
                    help={labelCounter.options.enable ? 'Header Counter Enabled' : 'Header Counter Disabled.'}
                    checked={labelCounter.options.enable ? true : false}
                    onChange={(e) => {



                      var options = { ...labelCounter.options, enable: labelCounter.options.enable ? false : true };
                      setAttributes({ labelCounter: { ...labelCounter, options: options } });


                      var childBlocks = select('core/block-editor').getBlocksByClientId(clientId)[0].innerBlocks;

                      childBlocks.map(childBlock => {

                        var childClientId = childBlock.clientId;
                        var childAttributes = childBlock.attributes;
                        childAttributes.labelCounter.options.enable = labelCounter.options.enable ? true : false;

                        dispatch('core/block-editor').updateBlockAttributes(childClientId, childAttributes)
                        wp.data.dispatch('core/block-editor').selectBlock(childClientId)
                      })

                      wp.data.dispatch('core/block-editor').selectBlock(clientId)





                    }}
                  />


                  <PanelRow>
                    <label for="">Counter postion</label>

                    <SelectControl
                      label=""
                      value={labelCounter.options.position}
                      options={[

                        { label: 'Choose Position', value: '' },
                        { label: 'Left', value: 'left' },
                        { label: 'Right', value: 'right' },

                      ]}
                      onChange={(newVal) => {

                        var options = { ...labelCounter.options, position: newVal };
                        setAttributes({ labelCounter: { ...labelCounter, options: options } });
                      }
                      }
                    />
                  </PanelRow>



                  <PanelRow>
                    <label for="">Wrapper Tag</label>

                    <SelectControl
                      label=""
                      value={labelCounter.options.tag}
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

                        var options = { ...labelCounter.options, tag: newVal };
                        setAttributes({ labelCounter: { ...labelCounter, options: options } });







                      }

                      }
                    />
                  </PanelRow>



                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={labelCounter} onChange={onChangeStyleLabelCounter} onAdd={onAddStyleLabelCounter} onRemove={onRemoveStyleLabelCounter} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={labelCounter} onChange={onPickCssLibraryLabelCounter} />
                </PGtab>
              </PGtabs>
            </PanelBody>



            <PanelBody title="Content" initialOpen={false}>


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
                  {
                    name: 'css',
                    title: 'CSS Library',
                    icon: styles,
                    className: 'tab-css',
                  },
                ]}
              >
                <PGtab name="options">

                  <PanelRow>
                    <label for="">Wrapper Tag</label>

                    <SelectControl
                      label=""
                      value={content.options.tag}
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

                        var options = { ...content.options, tag: newVal };
                        setAttributes({ content: { ...content, options: options } });

                      }

                      }
                    />
                  </PanelRow>

                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={content} onChange={onChangeStyleContent} onAdd={onAddStyleContent} onRemove={onRemoveStyleContent} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={content} onChange={onPickCssLibraryContent} />
                </PGtab>
              </PGtabs>












            </PanelBody>
            <PanelBody title="Icon" initialOpen={false}>


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
                  {
                    name: 'css',
                    title: 'CSS Library',
                    icon: styles,
                    className: 'tab-css',
                  },
                ]}
              >
                <PGtab name="options">

                  <PanelRow>
                    <label for="">Choose Icon</label>

                    <PGIconPicker library={icon.options.library} srcType={icon.options.srcType} iconSrc={icon.options.iconSrc} onChange={(arg) => {


                      var options = { ...icon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
                      setAttributes({ icon: { ...icon, options: options } });

                    }} />
                  </PanelRow>


                  <PanelRow>
                    <label for="">Choose Toggled Icon</label>

                    <PGIconPicker library={iconToggle.options.library} srcType={iconToggle.options.srcType} iconSrc={iconToggle.options.iconSrc} onChange={(arg) => {

                      var options = { ...iconToggle.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
                      setAttributes({ iconToggle: { ...iconToggle, options: options } });

                    }} />
                  </PanelRow>

                  <PanelRow>
                    <label for="">Icon postion</label>

                    <SelectControl
                      label=""
                      value={icon.options.position}
                      options={[

                        { label: 'Choose Position', value: '' },

                        { label: 'Left', value: 'left' },
                        { label: 'Right', value: 'right' },


                      ]}
                      onChange={(newVal) => {


                        var options = { ...icon.options, position: newVal };
                        setAttributes({ icon: { ...icon, options: options } });


                      }



                      }
                    />
                  </PanelRow>

                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={icon} onChange={onChangeStyleIcon} onAdd={onAddStyleIcon} onRemove={onRemoveStyleIcon} />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary blockId={blockId} obj={icon} onChange={onPickCssLibraryIcon} />
                </PGtab>
              </PGtabs>







            </PanelBody>


            <PanelBody title="Custom Style" initialOpen={false}>


              <p>Please use following class selector to apply your custom CSS</p>


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

          </div>



        </InspectorControls >


        <>


          <div className={`${blockId}-accordion-header accordion-header ${toggled ? 'accordion-header-active' : ''}`} onClick={ev => { setToggled(!toggled) }}>

            {labelCounter.options.position == 'left' && (
              <span className={`${blockId}-accordion-label-counter accordion-label-counter`} >{attributes.count}</span>
            )}


            {icon.options.position == 'left' && (
              <>
                {!toggled && <span className={`${blockId}-accordion-icon accordion-icon}`} dangerouslySetInnerHTML={{ __html: iconHtml }}></span>}
                {toggled && <span className={`${blockId}-accordion-icon-toggle accordion-icon-toggle}`} dangerouslySetInnerHTML={{ __html: iconToggleHtml }}></span>}
              </>
            )}

            {labelIcon.options.enable && (
              <span className={`${blockId}-accordion-header-label-icon accordion-header-label-icon}`} dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
            )}


            <RichText
              className={`${blockId}-accordion-header-label accordion-header-label`}
              value={headerLabel.options.text}
              allowedFormats={['core/bold', 'core/italic', 'core/link']}
              onChange={(newVal) => {
                var options = { ...headerLabel.options, text: newVal };
                setAttributes({ headerLabel: { ...headerLabel, options: options } });
              }}
              placeholder={__('Start Writing...')}
            />
            {icon.options.position == 'right' && (
              <>
                {!toggled && <span className={`${blockId}-accordion-icon accordion-icon}`} dangerouslySetInnerHTML={{ __html: iconHtml }}></span>}
                {toggled && <span className={`${blockId}-accordion-icon-toggle accordion-icon-toggle}`} dangerouslySetInnerHTML={{ __html: iconToggleHtml }}></span>}
              </>
            )}
            {labelCounter.options.position == 'right' && (
              <span className={`${blockId}-accordion-label-counter accordion-label-counter`} >{attributes.count}</span>
            )}
          </div>

          {toggled && <div className={`${blockId}-accordion-content accordion-content`}>
            <InnerBlocks allowedBlocks={allowedExtraBlocks} renderAppender={() => (
              <InnerBlocks.ButtonBlockAppender />
            )} />

          </div>}
        </>
      </>

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file

    const blockProps = useBlockProps.save({});
    const { children, ...innerBlocksProps } = useInnerBlocksProps.save(blockProps);


    return (
      <>{children}</>
    );
  }
})