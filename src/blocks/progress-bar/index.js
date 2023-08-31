import { registerBlockType } from '@wordpress/blocks'
import apiFetch from '@wordpress/api-fetch';
import { InnerBlocks, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"

import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { applyFilters } from '@wordpress/hooks';

import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { Icon, styles, settings, link, linkOff } from "@wordpress/icons";

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'


import variations from './variations'

import IconToggle from '../../components/icon-toggle'
import Typography from '../../components/typography'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import PGDropdown from '../../components/dropdown'
import PGIconPicker from '../../components/icon-picker'
import PGcssDisplay from '../../components/css-display'

import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'
import PGCssLibrary from '../../components/css-library'



var myStore = wp.data.select('postgrid-shop');

registerBlockType("post-grid/progress-bar", {
  apiVersion: 2,
  title: "Progress Bar",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><rect fill="#8db1ff" y="9.82" width="36" height="16.37" rx="1.21" /><rect fill="#1d4ed8" x="2.81" y="12.78" width="15.19" height="10.45" rx="0.92" /><path fill="#fff" d="M23.3,14.06A2.6,2.6,0,0,1,24,12.17a2.7,2.7,0,0,1,2-.76,2.76,2.76,0,0,1,2.06.75,2.67,2.67,0,0,1,.73,1.9v.68a2.6,2.6,0,0,1-.73,1.88,2.73,2.73,0,0,1-2.05.75A2.77,2.77,0,0,1,24,16.62a2.56,2.56,0,0,1-.73-1.88Zm1.7.68a1.37,1.37,0,0,0,.28.86,1,1,0,0,0,.81.34,1,1,0,0,0,.79-.34,1.31,1.31,0,0,0,.28-.86v-.68a1.31,1.31,0,0,0-.28-.86,1,1,0,0,0-.8-.36.94.94,0,0,0-.8.36,1.37,1.37,0,0,0-.28.86Zm1.52,8.71-1.25-.66,6.25-10,1.25.66Zm2.9-2.18a2.63,2.63,0,0,1,.74-1.89,3.19,3.19,0,0,1,4.11,0A2.63,2.63,0,0,1,35,21.27V22a2.59,2.59,0,0,1-.73,1.89,2.73,2.73,0,0,1-2,.75,2.76,2.76,0,0,1-2.07-.76A2.59,2.59,0,0,1,29.42,22Zm1.71.68a1.26,1.26,0,0,0,.3.85,1,1,0,0,0,.8.36,1,1,0,0,0,.82-.33,1.46,1.46,0,0,0,.24-.88v-.68a1.35,1.35,0,0,0-.28-.86,1,1,0,0,0-.8-.36.94.94,0,0,0-.8.36,1.35,1.35,0,0,0-.28.86Z" /></svg>


    ,
  },


  attributes: {


    wrapper: {
      type: 'object',
      default: {
        options: { class: '' },

        styles:
        {
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },


        },
      },
    },

    progressData: {
      type: 'object',
      default: {
        type: '', // vertical, horizontal, circle, semi-circle, line
        animate: '', // onVisible, onLoad, onPageLoad
        animateDuration: 1,
        animateIteration: 2,
        animateDelay: 2,

        fill: 45,
        unit: '%',

      },
    },

    progressInfo: {
      type: 'object',
      default: {
        options: {
          class: '',
          position: 'beforeBar',

        },

        styles: {


        },
      },
    },

    progressBar: {
      type: 'object',
      default: {
        options: {
          class: '',
        },

        styles: {
          color: { Desktop: '' },
          fontSize: { Desktop: '' },

        },
      },
    },


    progressFill: {
      type: 'object',
      default: {
        options: {
          class: '',
        },

        styles: {
          color: { Desktop: '' },
          fontSize: { Desktop: '' },

        },
      },
    },

    progressCount: {
      type: 'object',
      default: {
        options: {
          position: 'afterLabel',
          class: '',
        },

        styles: {
          color: { Desktop: '' },
          fontSize: { Desktop: '' },

        },
      },
    },


    circleOverlay: {
      type: 'object',
      default: {
        options: {
          class: '',
        },

        styles: {
          color: { Desktop: '' },
          fontSize: { Desktop: '' },

        },
      },
    },

    circleMask: {
      type: 'object',
      default: {
        options: {
          class: '',
        },

        styles: {
          color: { Desktop: '' },
          fontSize: { Desktop: '' },

        },
      },
    },


    progressLabel: {
      type: 'object',
      default: {
        options: {
          text: 'Digital Marketing',
          position: '',

          class: '',
        },

        styles: {
          color: { Desktop: '' },
          fontSize: { Desktop: '' },

        },
      },
    },


    icon: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', position: '', srcType: "class", /*class, html, img, svg */ iconSrc: 'far fa-calendar-alt', position: 'beforeprogressCount', /*before, after,  */ class: 'number-count-icon', },

        styles:
        {
          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          fontSize: { Desktop: '' },

        },
      },
    },






    customCss: {
      "type": "string",
      "default": ''
    },


    blockId: {
      "type": "string",
      "default": ''
    },
    blockCssY: {
      "type": "object",
      "default": { items: {} }
    },


  },
  usesContext: [],

  supports: {
    "align": ["wide", "full"],

  },
  category: "post-grid",


  edit: function (props) {


    var attributes = props.attributes;
    var setAttributes = props.setAttributes;
    var context = props.context;
    var clientId = props.clientId;


    var wrapper = attributes.wrapper;
    var blockId = attributes.blockId;

    var blockIdX = attributes.blockId ? attributes.blockId : 'pg' + clientId.split('-').pop();
    var blockClass = '.' + blockIdX;
    var icon = attributes.icon;
    let progressBar = attributes.progressBar;

    var progressLabel = attributes.progressLabel;
    var progressCount = attributes.progressCount;
    var progressFill = attributes.progressFill;
    var progressData = attributes.progressData;
    var progressInfo = attributes.progressInfo;
    var circleOverlay = attributes.circleOverlay;
    var circleMask = attributes.circleMask;


    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    //const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    var breakPointX = myStore.getBreakPoint();





    // Wrapper CSS Class Selectors
    const wrapperSelector = blockClass;
    var progressBarSelector = blockClass + ' .progress-bar';
    var progressFillSelector = blockClass + ' .progress-fill';
    var progressCountSelector = blockClass + ' .progress-count';
    var progressLabelSelector = blockClass + ' .progress-label';
    const iconSelector = blockClass + ' .progress-icon';
    const circleOverlaySelector = blockClass + ' .progress-circle-overlay';
    const circleMaskSelector = blockClass + ' .progress-circle-mask';

    var progressInfoSelector = blockClass + ' .progress-info';







    useEffect(() => {


      // var start = parseInt(progressData.options.start)
      // var end = parseInt(progressData.options.end)
      // var duration = parseInt(progressData.options.duration)



    }, [progressData]);













    function onChangeIcon(arg) {


      var options = { ...icon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
      setAttributes({ icon: { ...icon, options: options } });

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







    function onChangeStyleProgressCount(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, progressCount);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ progressCount: object });

      var elementSelector = myStore.getElementSelector(sudoScource, progressCountSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });



    }


    function onRemoveStyleProgressCount(sudoScource, key) {

      var object = myStore.deletePropertyDeep(progressCount, [sudoScource, key, breakPointX]);
      setAttributes({ frontText: object });

      var elementSelector = myStore.getElementSelector(sudoScource, progressCountSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });

    }





    function onAddStyleProgressCount(sudoScource, key) {
      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, progressCount);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ progressCount: object });


    }





    function onChangeStyleProgressLabel(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, progressLabel);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ progressLabel: object });

      var elementSelector = myStore.getElementSelector(sudoScource, progressLabelSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });



    }


    function onRemoveStyleProgressLabel(sudoScource, key) {

      var object = myStore.deletePropertyDeep(progressLabel, [sudoScource, key, breakPointX]);
      setAttributes({ frontText: object });

      var elementSelector = myStore.getElementSelector(sudoScource, progressLabelSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });

    }





    function onAddStyleProgressLabel(sudoScource, key) {
      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, progressLabel);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ progressLabel: object });


    }





    function onChangeStyleProgressBar(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, progressBar);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ progressBar: object });

      var elementSelector = myStore.getElementSelector(sudoScource, progressBarSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });



    }


    function onRemoveStyleProgressBar(sudoScource, key) {

      var object = myStore.deletePropertyDeep(progressBar, [sudoScource, key, breakPointX]);
      setAttributes({ frontText: object });

      var elementSelector = myStore.getElementSelector(sudoScource, progressBarSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });

    }





    function onAddStyleProgressBar(sudoScource, key) {
      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, progressBar);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ progressBar: object });


    }










    function onChangeStyleProgressFill(sudoScource, newVal, attr) {



      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, progressFill);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ progressFill: object });

      var elementSelector = myStore.getElementSelector(sudoScource, progressFillSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });



    }


    function onRemoveStyleProgressFill(sudoScource, key) {

      var object = myStore.deletePropertyDeep(progressFill, [sudoScource, key, breakPointX]);
      setAttributes({ frontText: object });

      var elementSelector = myStore.getElementSelector(sudoScource, progressFillSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });

    }





    function onAddStyleProgressFill(sudoScource, key) {
      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, progressFill);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ progressFill: object });


    }






    function onChangeStyleCircleOverlay(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, circleOverlay);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ circleOverlay: object });

      var elementSelector = myStore.getElementSelector(sudoScource, circleOverlaySelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });



    }


    function onRemoveStyleCircleOverlay(sudoScource, key) {

      var object = myStore.deletePropertyDeep(circleOverlay, [sudoScource, key, breakPointX]);
      setAttributes({ frontText: object });

      var elementSelector = myStore.getElementSelector(sudoScource, circleOverlaySelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });

    }





    function onAddStyleCircleOverlay(sudoScource, key) {
      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, circleOverlay);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ circleOverlay: object });


    }





    function onChangeStyleCircleMask(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, circleMask);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ circleMask: object });

      var elementSelector = myStore.getElementSelector(sudoScource, circleMaskSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });



    }


    function onRemoveStyleCircleMask(sudoScource, key) {

      var object = myStore.deletePropertyDeep(circleMask, [sudoScource, key, breakPointX]);
      setAttributes({ frontText: object });

      var elementSelector = myStore.getElementSelector(sudoScource, circleMaskSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });

    }





    function onAddStyleCircleMask(sudoScource, key) {
      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, circleMask);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ circleMask: object });


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













    function onChangeStyleProgressInfo(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, progressInfo);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ progressInfo: object });

      var elementSelector = myStore.getElementSelector(sudoScource, progressInfoSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });




    }


    function onRemoveStyleProgressInfo(sudoScource, key) {



      var object = myStore.deletePropertyDeep(progressInfo, [sudoScource, key, breakPointX]);
      setAttributes({ progressInfo: object });


      var elementSelector = myStore.getElementSelector(sudoScource, progressInfoSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



    }


    function onAddStyleProgressInfo(sudoScource, key) {

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, progressInfo);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ progressInfo: object });

    }













    String.prototype.strtr = function (dic) {
      const str = this.toString(),
        makeToken = (inx) => `{{###~${inx}~###}}`,

        tokens = Object.keys(dic)
          .map((key, inx) => ({
            key,
            val: dic[key],
            token: makeToken(inx)
          })),

        tokenizedStr = tokens.reduce((carry, entry) =>
          carry.replace(new RegExp(entry.key, "g"), entry.token), str);

      return tokens.reduce((carry, entry) =>
        carry.replace(new RegExp(entry.token, "g"), entry.val), tokenizedStr);
    };



    const [iconHtml, setIconHtml] = useState('');

    useEffect(() => {

      var iconSrc = icon.options.iconSrc;

      var iconHtml = `<span class="${iconSrc}"></span>`;

      setIconHtml(iconHtml);




    }, [icon]);







    useEffect(() => {

      setAttributes({ blockId: blockIdX });

      // setAttributes({ progressBar: progressBar });
      // setAttributes({ wrapper: wrapper });

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);




    }, [clientId]);




    // var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    // for (var x in breakPoints) {

    //   var item = breakPoints[x];
    //   breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    // }















    var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.



    useEffect(() => {

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);

    }, [blockCssY]);


    useEffect(() => {


      setAttributes({ customCss: customCss });


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);

    }, [customCss]);



    useEffect(() => {

    }, [progressBar]);





    const blockProps = useBlockProps({
      className: ` ${blockId} pg-progress-bar`,

    });








    return (

      <>



        <InspectorControls >
          <div className='' >





            <div className='p-3'>



              <PanelRow className='my-3'>
                <label for="">Type</label>

                <SelectControl
                  label=""
                  value={progressData.type}
                  options={[

                    { label: 'Choose Type', value: '' },
                    { label: 'Vertical', value: 'vertical' },
                    { label: 'Horizontal', value: 'horizontal' },
                    // { label: 'Circular Border', value: 'circleBorder' },
                    // { label: 'Circular Fill', value: 'circleFill' },
                    // { label: 'Semi Circular', value: 'circleBorderSemi' },

                  ]}
                  onChange={(newVal) => {


                    setAttributes({ progressData: { ...progressData, type: newVal } });


                  }



                  }
                />
              </PanelRow>

              <PanelRow>
                <label for="">Fill?</label>
                <InputControl
                  type="number"
                  className='mr-2'
                  value={progressData.fill}
                  onChange={(newVal) => {
                    setAttributes({ progressData: { ...progressData, fill: newVal } });


                    //var styles = { ...progressFill.styles, width: { Desktop: newVal + '%' } };
                    //setAttributes({ progressFill: { ...progressFill, styles: styles } });

                    onChangeStyleProgressFill('styles', newVal + '%', 'width')

                  }}
                />
              </PanelRow>


              <PanelRow>
                <label for="">Animate On</label>
                <SelectControl
                  label=""
                  value={progressData.animate == undefined ? '' : progressData.animate}
                  options={[
                    { label: 'No Animation', value: '' },
                    { label: 'onVisible', value: 'onVisible' },
                    { label: 'onLoad', value: 'onLoad' },

                  ]}
                  onChange={(newVal) => {

                    // var options = { ...progressData.options, animate: newVal };
                    setAttributes({ progressData: { ...progressData, animate: newVal } });

                  }

                  }
                />
              </PanelRow>


              {progressData.animate != undefined && progressData.animate.length > 0 && (

                <PanelRow>
                  <label for="">Duration?</label>
                  <InputControl
                    type="number"
                    className='mr-2'
                    value={progressData.duration}
                    onChange={(newVal) => {
                      setAttributes({ progressData: { ...progressData, duration: newVal } });
                    }}
                  />
                </PanelRow>

              )}

            </div>

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
                  <PGStyles obj={wrapper} onChange={onChangeStyleWrapper} onAdd={onAddStyleWrapper} onRemove={onRemoveStyleWrapper} />
                </PGtab>

              </PGtabs>


            </PanelBody>



            <PanelBody title="Progress Label" initialOpen={false}>
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
                    <label for="">Label Text?</label>
                    <InputControl
                      type="text"
                      className='mr-2'
                      value={progressLabel.options.text}
                      onChange={(newVal) => {
                        var options = { ...progressLabel.options, text: newVal };

                        setAttributes({ progressLabel: { ...progressLabel, options: options } });
                      }}
                    />
                  </PanelRow>


                  <PanelRow>
                    <label for="">Label Position</label>
                    <SelectControl
                      label=""
                      value={progressLabel.options.position}
                      options={[
                        { label: 'Before Bar', value: 'beforeBar' },
                        { label: 'Before Fill', value: 'beforeFill' },
                        { label: 'After Fill', value: 'afterFill' },
                        { label: 'Inside Fill', value: 'insideFill' },
                        { label: 'After Bar', value: 'afterBar' },



                      ]}
                      onChange={(newVal) => {

                        var options = { ...progressLabel.options, position: newVal };
                        setAttributes({ progressLabel: { ...progressLabel, options: options } });

                      }

                      }
                    />
                  </PanelRow>



                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={progressLabel} onChange={onChangeStyleProgressLabel} onAdd={onAddStyleProgressLabel} onRemove={onRemoveStyleProgressLabel} />
                </PGtab>

              </PGtabs>

            </PanelBody>


            <PanelBody title="Progress Count" initialOpen={false}>
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
                    <label for="">Counter Position</label>
                    <SelectControl
                      label=""
                      value={progressCount.options.position}
                      options={[
                        { label: 'Before Bar', value: 'beforeBar' },
                        { label: 'Before Fill', value: 'beforeFill' },
                        { label: 'Inside Fill', value: 'insideFill' },
                        { label: 'After Fill', value: 'afterFill' },
                        { label: 'After Bar', value: 'afterBar' },
                        { label: 'Before Label', value: 'beforeLabel' },
                        { label: 'After Label', value: 'afterLabel' },


                      ]}
                      onChange={(newVal) => {

                        var options = { ...progressCount.options, position: newVal };
                        setAttributes({ progressCount: { ...progressCount, options: options } });

                      }

                      }
                    />
                  </PanelRow>











                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={progressCount} onChange={onChangeStyleProgressCount} onAdd={onAddStyleProgressCount} onRemove={onRemoveStyleProgressCount} />
                </PGtab>


              </PGtabs>

            </PanelBody>








            <PanelBody title="Progress Bar" initialOpen={false}>
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
                  <PGStyles obj={progressBar} onChange={onChangeStyleProgressBar} onAdd={onAddStyleProgressBar} onRemove={onRemoveStyleProgressBar} />
                </PGtab>


              </PGtabs>

            </PanelBody>


            <PanelBody title="Progress Fill" initialOpen={false}>
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
                  <PGStyles obj={progressFill} onChange={onChangeStyleProgressFill} onAdd={onAddStyleProgressFill} onRemove={onRemoveStyleProgressFill} />
                </PGtab>


              </PGtabs>

            </PanelBody>


            {(progressData.type == 'circleBorder') && (
              <>
                <PanelBody title="Circle Overlay" initialOpen={false}>
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
                      <PGStyles obj={circleOverlay} onChange={onChangeStyleCircleOverlay} onAdd={onAddStyleCircleOverlay} onRemove={onRemoveStyleCircleOverlay} />
                    </PGtab>


                  </PGtabs>

                </PanelBody>

                <PanelBody title="Circle Mask" initialOpen={false}>
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
                      <PGStyles obj={circleMask} onChange={onChangeStyleCircleMask} onAdd={onAddStyleCircleMask} onRemove={onRemoveStyleCircleMask} />
                    </PGtab>


                  </PGtabs>

                </PanelBody>

              </>











            )}








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

                ]}
              >
                <PGtab name="options">

                  <PanelRow>
                    <label for="">Choose Icon</label>

                    <PGIconPicker library={icon.options.library} srcType={icon.options.srcType} iconSrc={icon.options.iconSrc} onChange={onChangeIcon} />
                  </PanelRow>



                  <PanelRow>
                    <label for="">Icon postion</label>

                    <SelectControl
                      label=""
                      value={icon.options.position}
                      options={[

                        { label: 'Choose Position', value: '' },



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

              </PGtabs>






            </PanelBody>




            <PanelBody title="Progress Info" initialOpen={false}>


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
                    <label for="">Info Position</label>

                    <SelectControl
                      label=""
                      value={progressInfo.options.position}
                      options={[

                        { label: 'Choose Position', value: '' },
                        { label: 'Before Bar', value: 'beforeBar' },
                        { label: 'After Bar', value: 'afterBar' },


                      ]}
                      onChange={(newVal) => {


                        var options = { ...progressInfo.options, position: newVal };
                        setAttributes({ progressInfo: { ...progressInfo, options: options } });


                      }



                      }
                    />
                  </PanelRow>


                </PGtab>
                <PGtab name="styles">
                  <PGStyles obj={progressInfo} onChange={onChangeStyleProgressInfo} onAdd={onAddStyleProgressInfo} onRemove={onRemoveStyleProgressInfo} />
                </PGtab>

              </PGtabs>






            </PanelBody>



            <PanelBody title="Custom Style" initialOpen={false}>


            </PanelBody>

            <PGMailSubsctibe />
            <PGContactSupport utm={{ utm_source: 'BlockPostTitle', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />


          </div>

        </InspectorControls >






        <>





          {!progressData.type && (

            <div {...blockProps}>


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
                      <div className='text-center inline-block m-4 w-64 align-top p-4 bg-gray-400 cursor-pointer hover:bg-gray-500 relative' onClick={(ev) => {


                        if (variation.isPro) {
                          alert('Sorry this variation only vailable in pro version');
                          return false;
                        }


                        var atts = variation.atts;

                        var wrapper = { ...atts.wrapper };
                        var progressData = { ...atts.progressData };

                        var progressInfo = { ...atts.progressInfo };
                        var progressBar = { ...atts.progressBar };
                        var progressFill = { ...atts.progressFill };
                        var progressCount = { ...atts.progressCount };
                        var progressLabel = { ...atts.progressLabel };
                        var icon = { ...atts.icon };
                        var circleMask = { ...atts.circleMask };
                        var circleOverlay = { ...atts.circleOverlay };


                        var blockCssY = { ...atts.blockCssY };
                        var customCss = { ...atts.customCss };


                        var blockCssObj = {}

                        blockCssObj[wrapperSelector] = wrapper;

                        blockCssObj[progressInfoSelector] = progressInfo;
                        blockCssObj[progressBarSelector] = progressBar;
                        blockCssObj[progressFillSelector] = progressFill;
                        blockCssObj[progressCountSelector] = progressCount;
                        blockCssObj[progressLabelSelector] = progressLabel;
                        blockCssObj[iconSelector] = icon;
                        blockCssObj[circleMaskSelector] = circleMask;
                        blockCssObj[circleOverlaySelector] = circleOverlay;



                        setAttributes({
                          wrapper: wrapper,
                          progressData: progressData,

                          progressInfo: progressInfo,
                          progressBar: progressBar,
                          progressFill: progressFill,
                          progressCount: progressCount,
                          progressLabel: progressLabel,
                          icon: icon,
                          circleMask: circleMask,
                          circleOverlay: circleOverlay,


                          customCss: customCss,
                        });

                        var blockCssRules = myStore.getBlockCssRules(blockCssObj);

                        var items = { ...blockCssY.items, ...blockCssRules };


                        setAttributes({ blockCssY: { items: items } });

                        // replaceInnerBlocks(
                        //   clientId,
                        //   createBlocksFromInnerBlocksTemplate(variation.innerBlocks),
                        //   true
                        // );
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










          {progressData.type == 'horizontal' && (
            <div {...blockProps}>
              {progressInfo.options.position == 'beforeBar' && (
                <div className="progress-info">
                  {icon.options.position == 'beforeLabel' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                  {progressCount.options.position == 'beforeLabel' && (
                    <div className="progress-count">{progressData.fill}</div>
                  )}
                  {progressLabel.options.position.length == 0 && (
                    <div className="progress-label">{progressLabel.options.text}</div>
                  )}
                  {progressCount.options.position == 'afterLabel' && (
                    <div className="progress-count">{progressData.fill}</div>
                  )}
                </div>
              )}

              <div className="progress-bar">
                {progressLabel.options.position == 'beforeFill' && (
                  <div className="progress-label">{progressLabel.options.text}</div>
                )}
                {progressCount.options.position == 'beforeFill' && (
                  <div className="progress-count">{progressData.fill}</div>
                )}
                <div className="progress-fill">
                  {progressLabel.options.position == 'insideFill' && (
                    <div className="progress-label">{progressLabel.options.text}</div>
                  )}
                  {progressCount.options.position == 'insideFill' && (
                    <div className="progress-count">{progressData.fill}</div>
                  )}
                </div>
                {progressLabel.options.position == 'afterFill' && (
                  <div className="progress-label">{progressLabel.options.text}</div>
                )}
                {progressCount.options.position == 'afterFill' && (
                  <div className="progress-count">{progressData.fill}</div>
                )}
              </div>
              {progressInfo.options.position == 'afterBar' && (
                <div className="progress-info">
                  {icon.options.position == 'beforeLabel' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                  {progressCount.options.position == 'beforeLabel' && (
                    <div className="progress-count">{progressData.fill}</div>
                  )}
                  {progressLabel.options.position.length == 0 && (
                    <div className="progress-label">{progressLabel.options.text}</div>
                  )}
                  {progressCount.options.position == 'afterLabel' && (
                    <div className="progress-count">{progressData.fill}</div>
                  )}
                </div>
              )}
            </div>

          )}

          {progressData.type == 'vertical' && (
            <div {...blockProps}>
              {progressInfo.options.position == 'beforeBar' && (
                <div className="progress-info">
                  {icon.options.position == 'beforeLabel' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                  {progressCount.options.position == 'beforeLabel' && (
                    <div className="progress-count">{progressData.fill}</div>
                  )}
                  {progressLabel.options.position.length == 0 && (
                    <div className="progress-label">{progressLabel.options.text}</div>
                  )}
                  {progressCount.options.position == 'afterLabel' && (
                    <div className="progress-count">{progressData.fill}</div>
                  )}
                </div>
              )}

              <div className="progress-bar">
                {progressLabel.options.position == 'beforeFill' && (
                  <div className="progress-label">{progressLabel.options.text}</div>
                )}
                {progressCount.options.position == 'beforeFill' && (
                  <div className="progress-count">{progressData.fill}</div>
                )}
                <div className="progress-fill">
                  {progressLabel.options.position == 'insideFill' && (
                    <div className="progress-label">{progressLabel.options.text}</div>
                  )}
                  {progressCount.options.position == 'insideFill' && (
                    <div className="progress-count">{progressData.fill}</div>
                  )}
                </div>
                {progressLabel.options.position == 'afterFill' && (
                  <div className="progress-label">{progressLabel.options.text}</div>
                )}
                {progressCount.options.position == 'afterFill' && (
                  <div className="progress-count">{progressData.fill}</div>
                )}
              </div>
              {progressInfo.options.position == 'afterBar' && (
                <div className="progress-info">
                  {icon.options.position == 'beforeLabel' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                  {progressCount.options.position == 'beforeLabel' && (
                    <div className="progress-count">{progressData.fill}</div>
                  )}
                  {progressLabel.options.position.length == 0 && (
                    <div className="progress-label">{progressLabel.options.text}</div>
                  )}
                  {progressCount.options.position == 'afterLabel' && (
                    <div className="progress-count">{progressData.fill}</div>
                  )}
                </div>
              )}
            </div>
          )}

          {progressData.type == 'circleBorder' && (
            <div {...blockProps}>

              {progressInfo.options.position == 'beforeBar' && (
                <div className="progress-info">
                  {progressCount.options.position == 'beforeLabel' && (
                    <div className="progress-count">{progressData.fill}</div>
                  )}
                  {icon.options.position == 'beforeLabel' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}

                  {progressLabel.options.position.length == 0 && (
                    <div className="progress-label">{progressLabel.options.text}</div>
                  )}
                  {progressCount.options.position == 'afterLabel' && (
                    <div className="progress-count">{progressData.fill}</div>
                  )}
                </div>
              )}

              <div class="circle-wrap progress-bar">
                <div class="mask full progress-circle-mask">
                  <div class="fill progress-fill"></div>
                </div>
                <div class="mask half progress-circle-mask">
                  <div class="fill progress-fill"></div>
                </div>
                <div class="inside-circle progress-circle-overlay">  </div>

              </div>
              {progressInfo.options.position == 'afterBar' && (
                <div className="progress-info">
                  {progressInfo.options.position == 'beforeLabel' && (
                    <div className="progress-count">{progressData.fill}</div>
                  )}
                  {icon.options.position == 'beforePrefix' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                  {progressCount.options.position == 'beforeLabel' && (
                    <div className="progress-count">{progressData.fill}</div>
                  )}
                  {progressLabel.options.position.length == 0 && (
                    <div className="progress-label">{progressLabel.options.text}</div>
                  )}
                  {progressCount.options.position == 'afterLabel' && (
                    <div className="progress-count">{progressData.fill}</div>
                  )}
                </div>
              )}


            </div>
          )}



          {progressData.type == 'circleFill' && (
            <div {...blockProps}>

              {progressInfo.options.position == 'beforeBar' && (
                <div className="progress-info">
                  {progressInfo.options.position == 'beforeLabel' && (
                    <div className="progress-count">{progressData.fill}</div>
                  )}
                  {icon.options.position == 'beforeLabel' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                  {progressCount.options.position == 'beforeLabel' && (
                    <div className="progress-count">{progressData.fill}</div>
                  )}
                  {progressLabel.options.position.length == 0 && (
                    <div className="progress-label">{progressLabel.options.text}</div>
                  )}
                  {progressCount.options.position == 'afterLabel' && (
                    <div className="progress-count">{progressData.fill}</div>
                  )}
                </div>
              )}

              <div class="circle-wrap progress-bar">
                <div class="mask full">
                  <div class="fill progress-fill"></div>
                </div>
                <div class="mask half">
                  <div class="fill progress-fill"></div>
                </div>

              </div>
              {progressInfo.options.position == 'afterBar' && (
                <div className="progress-info">
                  {progressInfo.options.position == 'beforeLabel' && (
                    <div className="progress-count">{progressData.fill}</div>
                  )}
                  {icon.options.position == 'beforePrefix' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                  {progressCount.options.position == 'beforeLabel' && (
                    <div className="progress-count">{progressData.fill}</div>
                  )}
                  {progressLabel.options.position.length == 0 && (
                    <div className="progress-label">{progressLabel.options.text}</div>
                  )}
                  {progressCount.options.position == 'afterLabel' && (
                    <div className="progress-count">{progressData.fill}</div>
                  )}
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
    return null;
  }
})

