import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover, Spinner } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';
import { InnerBlocks, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"
import { Icon, styles, settings, link, linkOff, close } from "@wordpress/icons";

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'


import IconToggle from '../../components/icon-toggle'
import Typography from '../../components/typography'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import PGcssTextAlign from '../../components/css-text-align'

import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'
import PGCssLibrary from '../../components/css-library'

var myStore = wp.data.select('postgrid-shop');



registerBlockType("post-grid/form-field-checkbox", {
  apiVersion: 2,
  title: "Form Field - Checkbox",
  parent: ['post-grid/form-wrap'],

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
    labelWrap: {
      type: 'object',
      default: {
        options: {
          tag: 'div',
          enable: true,
          class: '',
        },

      },
    },


    label: {
      type: 'object',
      default: {
        options: {
          tag: 'label',
          for: 'label',
          enable: true,

          text: 'Your Name',
          class: 'pg-form-field-label',
        },

        styles:
        {

        },
      },
    },



    item: {
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
    itemLabel: {
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

    input: {
      type: 'object',
      default: {
        options: {
          value: null,
          name: '',
          required: false,
          disabled: false,
          multiple: false,
          autofocus: null,
          readonly: false,
          args: {
            0: { label: 'Option 1', value: 'option1', readonly: false },
            1: { label: 'Option 2', value: 'option2', readonly: false },
            2: { label: 'Option 3', value: 'option3', readonly: false },
          },
          argsSrc: {
            src: '', // posts, users, countryNames, countryCodes, Gender, ageGroups
            taxonomy: '',
            postType: [],
            userRole: [],

          },


          id: '',
          class: 'pg-form-field-checkbox',
          postion: 'afterLabel', // beforeLabel, afterLabel, insideLabel
        },

        styles:
        {

        },
      },
    },
    inputWrap: {
      type: 'object',
      default: {
        options: {
          tag: 'div',
          enable: true,

          class: '',
        },
        styles:
        {

        },
      },
    },

    errorWrap: {
      type: 'object',
      default: {
        options: {
          tag: 'div',
          enable: true,
          text: '',
          position: 'afterInput',

          class: '',
        },
        styles:
        {

        },
      },
    },

    requiredWrap: {
      type: 'object',
      default: {
        options: {
          tag: 'span',
          enable: true,
          class: '',
        },
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




    var blockId = attributes.blockId;

    var blockIdX = attributes.blockId ? attributes.blockId : 'pg' + clientId.split('-').pop();
    var blockClass = '.' + blockIdX;
    var wrapper = attributes.wrapper;

    var label = attributes.label;
    var input = attributes.input;
    var item = attributes.item;
    var itemLabel = attributes.itemLabel;
    var inputWrap = attributes.inputWrap;
    var errorWrap = attributes.errorWrap;
    var labelWrap = attributes.labelWrap;


    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    //const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    var breakPointX = myStore.getBreakPoint();

    const [isLoading, setisLoading] = useState(false);
    const [pramSrcEnable, setpramSrcEnable] = useState(false);
    var [postTypes, setpostTypes] = useState({}); // Using the hook.
    var [userRoles, setuserRoles] = useState({}); // Using the hook.
    var [taxonomies, settaxonomies] = useState({}); // Using the hook.


    // Wrapper CSS Class Selectors
    var wrapperSelector = blockClass;
    var labelSelector = blockClass + ' label';
    var checkboxSelector = blockClass + ' input[type="checkbox"]';

    var labelWrapSelector = blockClass + ' .label-wrap';
    var inputWrapSelector = blockClass + ' .input-wrap';
    var errorWrapSelector = blockClass + ' .error-wrap';





    useEffect(() => {

      setAttributes({ blockId: blockIdX });

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);


      apiFetch({
        path: '/post-grid/v2/post_types',
        method: 'POST',
        data: {},
      }).then((res) => {
        var types = [];
        Object.entries(res).map(x => {
          var postTypeId = x[0]
          var postTypeLabel = x[1]
          types.push({ label: postTypeLabel, value: postTypeId });
        })

        setpostTypes(types);
      });

      apiFetch({
        path: '/post-grid/v2/user_roles_list',
        method: 'POST',
        data: {},
      }).then((res) => {

        console.log(res);


        var roles = (res.roles == undefined) ? [] : res.roles;
        var rolesX = [];
        Object.entries(roles).map(role => {
          var index = role[0];
          var val = role[1];
          rolesX.push({ label: val, value: index });

        })
        setuserRoles(rolesX);
      });


      apiFetch({
        path: '/post-grid/v2/post_type_objects',
        method: 'POST',
        data: {},
      }).then((res) => {

        console.log(res);
        var taxItems = [];
        Object.entries(res).map(arg => {
          var index = arg[0];
          var tax = arg[1];
          taxItems.push({ label: tax.label, value: tax.id });

        })
        settaxonomies(taxItems);
      });




    }, [clientId]);


    useEffect(() => {


      setAttributes({ customCss: customCss });


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);



    useEffect(() => {


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockId]);






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











    function onChangeStyleLabel(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, label);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ label: object });




      var elementSelector = myStore.getElementSelector(sudoScource, labelSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStyleLabel(sudoScource, key) {

      var object = myStore.deletePropertyDeep(label, [sudoScource, key, breakPointX]);
      setAttributes({ label: object });


      var elementSelector = myStore.getElementSelector(sudoScource, labelSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }


    function onAddStyleLabel(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, label);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ label: object });

    }




    function onBulkAddLabel(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, label);
      obj[sudoScource] = cssObj;

      setAttributes({ label: obj });

      var selector = myStore.getElementSelector(sudoScource, labelSelector);
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







    function onChangeStyleInput(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, input);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ input: object });




      var elementSelector = myStore.getElementSelector(sudoScource, checkboxSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStyleInput(sudoScource, key) {

      var object = myStore.deletePropertyDeep(input, [sudoScource, key, breakPointX]);
      setAttributes({ input: object });


      var elementSelector = myStore.getElementSelector(sudoScource, checkboxSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }


    function onAddStyleInput(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, input);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ input: object });

    }




    function onBulkAddInput(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, input);
      obj[sudoScource] = cssObj;

      setAttributes({ input: obj });

      var selector = myStore.getElementSelector(sudoScource, checkboxSelector);
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







    function onChangeStyleLabelWrap(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, labelWrap);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ labelWrap: object });




      var elementSelector = myStore.getElementSelector(sudoScource, labelWrapSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStyleLabelWrap(sudoScource, key) {

      var object = myStore.deletePropertyDeep(labelWrap, [sudoScource, key, breakPointX]);
      setAttributes({ labelWrap: object });


      var elementSelector = myStore.getElementSelector(sudoScource, labelWrapSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }


    function onAddStyleLabelWrap(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, labelWrap);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ labelWrap: object });

    }




    function onBulkAddLabelWrap(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, labelWrap);
      obj[sudoScource] = cssObj;

      setAttributes({ labelWrap: obj });

      var selector = myStore.getElementSelector(sudoScource, labelWrapSelector);
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




    function onChangeStyleInputWrap(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, inputWrap);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ inputWrap: object });




      var elementSelector = myStore.getElementSelector(sudoScource, inputWrapSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStyleInputWrap(sudoScource, key) {

      var object = myStore.deletePropertyDeep(inputWrap, [sudoScource, key, breakPointX]);
      setAttributes({ inputWrap: object });


      var elementSelector = myStore.getElementSelector(sudoScource, inputWrapSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }


    function onAddStyleInputWrap(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, inputWrap);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ inputWrap: object });

    }




    function onBulkAddInputWrap(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, inputWrap);
      obj[sudoScource] = cssObj;

      setAttributes({ inputWrap: obj });

      var selector = myStore.getElementSelector(sudoScource, inputWrapSelector);
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


    function onChangeStyleErrorWrap(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, errorWrap);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ errorWrap: object });




      var elementSelector = myStore.getElementSelector(sudoScource, errorWrapSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

    }


    function onRemoveStyleErrorWrap(sudoScource, key) {

      var object = myStore.deletePropertyDeep(errorWrap, [sudoScource, key, breakPointX]);
      setAttributes({ errorWrap: object });


      var elementSelector = myStore.getElementSelector(sudoScource, errorWrapSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


    }


    function onAddStyleErrorWrap(sudoScource, key) {


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, errorWrap);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ errorWrap: object });

    }




    function onBulkAddErrorWrap(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, errorWrap);
      obj[sudoScource] = cssObj;

      setAttributes({ errorWrap: obj });

      var selector = myStore.getElementSelector(sudoScource, errorWrapSelector);
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















    useEffect(() => {


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);




    const blockProps = useBlockProps({
      className: ` ${blockId} pg-form-field-input`,

    });

    return (
      <>
        <InspectorControls>
          <div className='px-3' initialOpen={false}>


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
            <PanelBody title="Label" initialOpen={false}>

              <PanelBody title="Label Wrap" initialOpen={false}>

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
                    <PGStyles obj={labelWrap} onChange={onChangeStyleLabelWrap} onAdd={onAddStyleLabelWrap} onRemove={onRemoveStyleLabelWrap} onBulkAdd={onBulkAddLabelWrap} />
                  </PGtab>
                </PGtabs>
              </PanelBody>


              <PanelBody title="Label" initialOpen={false}>

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

                    <ToggleControl className='my-3'
                      label="Enable?"
                      help={label.options.enable ? 'Label Enabled' : 'Label Disabled.'}
                      checked={label.options.enable ? true : false}
                      onChange={(e) => {
                        var options = { ...label.options, enable: label.options.enable ? false : true };
                        setAttributes({ label: { ...label, options: options } });
                      }}
                    />

                    <PanelRow className='mb-4'>
                      <label for="">Label Text</label>
                      <InputControl
                        className='mr-2'
                        value={label.options.text}
                        onChange={(newVal) => {


                          var options = { ...label.options, text: newVal };
                          setAttributes({ label: { ...label, options: options } });

                        }}
                      />
                    </PanelRow>



                  </PGtab>
                  <PGtab name="styles">
                    <PGStyles obj={label} onChange={onChangeStyleLabel} onAdd={onAddStyleLabel} onRemove={onRemoveStyleLabel} onBulkAdd={onBulkAddLabel} />
                  </PGtab>
                </PGtabs>





              </PanelBody>



            </PanelBody>
            <PanelBody title="Input" initialOpen={false}>

              <PanelBody title="Input Wrap" initialOpen={false}>

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
                    <PGStyles obj={inputWrap} onChange={onChangeStyleInputWrap} onAdd={onAddStyleInputWrap} onRemove={onRemoveStyleInputWrap} onBulkAdd={onBulkAddInputWrap} />
                  </PGtab>
                </PGtabs>
              </PanelBody>

              <PanelBody title="Checkbox" initialOpen={false}>

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

                    <div className='bg-blue-500 px-3 py-2 rounded-sm text-white inline-block my-3 mr-2 cursor-pointer' onClick={ev => {

                      var options = { ...input.options };
                      var args = options.args;
                      var length = Object.entries(input.options.args).length
                      args[length] = { label: '', value: '' }
                      setAttributes({ input: { ...input, options: options } });

                    }}>Add Option</div>

                    <div className=' inline-block  mr-2 relative'>
                      <div className='bg-blue-500 px-3 py-2 rounded-sm text-white inline-block my-3 mr-2 cursor-pointer '
                        onClick={ev => {

                          setpramSrcEnable(!pramSrcEnable);

                        }}

                      >
                        Pram Source</div>


                      {pramSrcEnable && (
                        <Popover position="bottom left">

                          {/* posts, users, countryNames, countryCodes, Gender, ageGroups */}

                          <div className='p-3 w-64'>


                            <PanelRow>
                              <label for="">Choose Source Type</label>

                              <SelectControl
                                label=""
                                value={input.options.argsSrc.src}
                                options={[
                                  { label: 'None', value: '' },
                                  { label: 'Taxonomy', value: 'taxonomy' },
                                  { label: 'Posts', value: 'posts' },
                                  { label: 'Users', value: 'users' },
                                  { label: 'Country Names', value: 'countryNames' },
                                  { label: 'Country Codes', value: 'countryCodes' },
                                  { label: 'Gender', value: 'gender' },
                                  { label: 'Age Groups', value: 'ageGroups' },
                                ]}
                                onChange={(newVal) => {

                                  var options = { ...input.options };
                                  var argsSrc = options.argsSrc;
                                  argsSrc.src = newVal
                                  setAttributes({ input: { ...input, options: options } });
                                }

                                }
                              />
                            </PanelRow>

                            {input.options.argsSrc.src == 'posts' && (
                              <>
                                <div>
                                  <label for="">Choose Post Type</label>
                                  <SelectControl
                                    label=""
                                    multiple={true}

                                    value={input.options.argsSrc.postType}
                                    options={postTypes}
                                    onChange={(newVal) => {
                                      var options = { ...input.options };
                                      var argsSrc = options.argsSrc;
                                      argsSrc.postType = newVal
                                      setAttributes({ input: { ...input, options: options } });
                                    }
                                    }
                                  />
                                </div>

                              </>
                            )}



                            {input.options.argsSrc.src == 'taxonomy' && (
                              <>
                                <PanelRow>
                                  <label for="">Choose Taxonomy</label>
                                  <SelectControl
                                    label=""
                                    value={input.options.argsSrc.taxonomy}
                                    options={taxonomies}
                                    onChange={(newVal) => {
                                      var options = { ...input.options };
                                      var argsSrc = options.argsSrc;
                                      argsSrc.taxonomy = newVal
                                      setAttributes({ input: { ...input, options: options } });
                                    }
                                    }
                                  />
                                </PanelRow>

                              </>
                            )}


                            {input.options.argsSrc.src == 'users' && (
                              <>
                                <div>
                                  <label for="">User Role</label>
                                  <SelectControl
                                    label=""
                                    multiple={true}

                                    value={input.options.argsSrc.userRole}
                                    options={userRoles}
                                    onChange={(newVal) => {
                                      var options = { ...input.options };
                                      var argsSrc = options.argsSrc;
                                      argsSrc.userRole = newVal
                                      setAttributes({ input: { ...input, options: options } });
                                    }
                                    }
                                  />
                                </div>

                              </>
                            )}






                          </div>


                        </Popover>

                      )}

                    </div>

                    <div>

                      {input.options.argsSrc.src.length == 0 && (
                        <>
                          {Object.entries(input.options.args).map(item => {

                            var index = item[0];
                            var arg = item[1];
                            return (
                              <div className='flex justify-between items-center my-3'>
                                <InputControl
                                  className='mr-2'
                                  value={arg.label}
                                  placeholder="Option Label"
                                  onChange={(newVal) => {
                                    var options = { ...input.options };
                                    var args = options.args;
                                    args[index].label = newVal
                                    setAttributes({ input: { ...input, options: options } });

                                  }}
                                />
                                <InputControl
                                  className='mr-2'
                                  placeholder="Option Value"
                                  value={arg.value}
                                  onChange={(newVal) => {
                                    var options = { ...input.options };
                                    var args = options.args;
                                    args[index].value = newVal
                                    setAttributes({ input: { ...input, options: options } });
                                  }}
                                />
                                <span className='cursor-pointer bg-red-500 hover:bg-red-600 text-white px-1 rounded-sm'><Icon fill="#fff" icon={close} onClick={ev => {
                                  var optionsX = { ...input.options };
                                  delete optionsX['args'][index]
                                  setAttributes({ input: { ...input, options: optionsX } });
                                }} /></span>
                              </div>
                            )
                          })}
                        </>
                      )}


                      {input.options.argsSrc.src.length > 0 && (

                        <>
                          Options will automatically generated from <span className='text-bold'>{input.options.argsSrc.src}</span>
                        </>

                      )}


                    </div>
                    <PanelRow className='mb-4'>
                      <label for="">Field Name</label>
                      <InputControl
                        className='mr-2'
                        value={input.options.name}
                        onChange={(newVal) => {
                          var options = { ...input.options, name: newVal };
                          setAttributes({ input: { ...input, options: options } });
                        }}
                      />
                    </PanelRow>
                    <PanelRow className='mb-4'>
                      <label for="">Field Value</label>
                      <ul>
                        {input.options.value != null && Object.entries(input.options.value).map(x => {
                          var val = x[1]
                          return (<li>{val}</li>)
                        })}
                      </ul>
                    </PanelRow>

                    <ToggleControl className='my-3'
                      label="Readonly?"
                      help={input.options.readonly ? 'Readonly Enabled' : 'Readonly Disabled.'}
                      checked={input.options.readonly ? true : false}
                      onChange={(e) => {
                        var options = { ...input.options, readonly: input.options.readonly ? false : true };
                        setAttributes({ input: { ...input, options: options } });
                      }}
                    />
                    <ToggleControl className='my-3'
                      label="Required?"
                      help={input.options.required ? 'Required Enabled' : 'Required Disabled.'}
                      checked={input.options.required ? true : false}
                      onChange={(e) => {
                        var options = { ...input.options, required: input.options.required ? false : true };
                        setAttributes({ input: { ...input, options: options } });
                      }}
                    />
                    <ToggleControl className='my-3'
                      label="Disabled?"
                      help={input.options.disabled ? 'Disabled Enabled' : 'Disabled Disabled.'}
                      checked={input.options.disabled ? true : false}
                      onChange={(e) => {
                        var options = { ...input.options, disabled: input.options.disabled ? false : true };
                        setAttributes({ input: { ...input, options: options } });
                      }}
                    />
                  </PGtab>
                  <PGtab name="styles">
                    <PGStyles obj={input} onChange={onChangeStyleInput} onAdd={onAddStyleInput} onRemove={onRemoveStyleInput} onBulkAdd={onBulkAddInput} />
                  </PGtab>
                </PGtabs>

              </PanelBody>
            </PanelBody>

            <PanelBody title="Error Wrap" initialOpen={false}>

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
                  <PanelRow className='mb-4'>
                    <label for="">Error Text</label>
                    <InputControl
                      className='mr-2'
                      value={errorWrap.options.text}
                      onChange={(newVal) => {


                        var options = { ...errorWrap.options, text: newVal };
                        setAttributes({ errorWrap: { ...errorWrap, options: options } });

                      }}
                    />
                  </PanelRow>


                  <PanelRow>
                    <label for="">Position</label>

                    <SelectControl
                      label=""
                      value={errorWrap.options.position}
                      options={[

                        { label: 'None', value: '' },

                        { label: 'afterlabel', value: 'afterlabel' },
                        { label: 'afterInput', value: 'afterInput' },



                      ]}
                      onChange={(newVal) => {

                        var options = { ...errorWrap.options, position: newVal };
                        setAttributes({ errorWrap: { ...errorWrap, options: options } });


                      }

                      }
                    />
                  </PanelRow>



                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={errorWrap} onChange={onChangeStyleErrorWrap} onAdd={onAddStyleErrorWrap} onRemove={onRemoveStyleErrorWrap} onBulkAdd={onBulkAddErrorWrap} />
                </PGtab>
              </PGtabs>
            </PanelBody>


            <PanelBody title="Custom Style" initialOpen={false}>

              <p>Please use following class selector to apply your custom CSS</p>


              <div className='my-3'>
                <p className='font-bold'>Wrapper </p>
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


          </div>

        </InspectorControls >




        <div {...blockProps}>


          <div className='label-wrap'>
            {label.options.enable && (
              <label for="">{label.options.text}</label>
            )}
            {errorWrap.options.position == 'afterlabel' && (
              <div className='error-wrap'>{errorWrap.options.text}</div>
            )}
          </div>
          <div className='input-wrap'>
            {Object.entries(input.options.args).map((item, index) => {

              var index = item[0];
              var arg = item[1];


              return (

                <div className='item' >
                  <input type="checkbox"
                    id={blockId + '-' + index}
                    value={arg.value}
                    name={input.options.name}
                    multiple={input.options.multiple}
                    required={input.options.required}
                    disabled={input.options.disabled}
                    readonly={input.options.readonly}
                    onChange={(ev) => {
                      var newVal = ev.target.value;

                      var oldVal = input.options.value;
                      if (typeof input.options.value == 'object') {

                        var count = input.options.value.length
                        var valueX = input.options.value;
                        valueX[count] = newVal;

                      } else {
                        valueX = [oldVal]
                      }
                      var options = { ...input.options, value: valueX };

                      setAttributes({ input: { ...input, options: options } });

                    }}
                  />
                  <label for={blockId + '-' + index}>{arg.label}</label>

                </div>

              )






            })}

            {errorWrap.options.position == 'afterInput' && (
              <div className='error-wrap'>{errorWrap.options.text}</div>
            )}
          </div>



        </div>

      </>

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file



    return null
  }
})