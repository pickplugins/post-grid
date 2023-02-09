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
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'
import { Icon, styles, settings, link, linkOff } from "@wordpress/icons";

import IconToggle from '../../components/icon-toggle'
import Typography from '../../components/typography'
import PGIconPicker from '../../components/icon-picker'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'

import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import PGcssDisplay from '../../components/css-display'
import PGDropdown from '../../components/dropdown'

import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'

var myStore = wp.data.select('postgrid-shop');



registerBlockType("post-grid/star-rate", {
  title: "Star Rate",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:




      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.4211 13.1053V21.5263H2V13.1053H10.4211ZM8.31579 15.2105H4.10526V19.4211H8.31579V15.2105ZM11.4737 1L17.2632 10.4737H5.68421L11.4737 1ZM11.4737 5.06316L9.45263 8.36842H13.4947L11.4737 5.06316ZM17.2632 12.5789C19.8947 12.5789 22 14.6842 22 17.3158C22 19.9474 19.8947 22.0526 17.2632 22.0526C14.6316 22.0526 12.5263 19.9474 12.5263 17.3158C12.5263 14.6842 14.6316 12.5789 17.2632 12.5789ZM17.2632 14.6842C16.5652 14.6842 15.8959 14.9615 15.4024 15.455C14.9088 15.9485 14.6316 16.6179 14.6316 17.3158C14.6316 18.0137 14.9088 18.6831 15.4024 19.1766C15.8959 19.6701 16.5652 19.9474 17.2632 19.9474C17.9611 19.9474 18.6304 19.6701 19.124 19.1766C19.6175 18.6831 19.8947 18.0137 19.8947 17.3158C19.8947 16.6179 19.6175 15.9485 19.124 15.455C18.6304 14.9615 17.9611 14.6842 17.2632 14.6842Z" />
      </svg>


    ,
  },


  attributes: {

    wrapper: {
      type: 'object',
      default: {
        options: {
          tag: 'div', class: '', attr: [],
        },
        styles:
        {
          color: {},
          borderRadius: {},



        },
      },
    },







    icon: {
      type: 'object',
      default: {
        options: {
          library: 'fontAwesome',
          srcType: "class", /*class, html, img, svg */
          iconSrc: 'fas fa-check-circle',
          class: 'text-icon',

          text: 'Custom Text',
          isLink: true,
          linkTo: 'postUrl', /*postUrl, homeUrl, authorUrl, authorLink, mailTo, custom, customField */
          linkToAuthorMeta: '',
          linkToCustomMeta: '',

          linkTarget: '_blank',
          customUrl: '',
          linkAttr: [],
        },

        styles:
        {
          color: {},


        },
      },
    },



    prefix: {
      type: 'object',
      default: {
        options: { text: '', class: 'prefix' },

        styles:
        {
          color: {},

        },
      },
    },

    postfix: {
      type: 'object',
      default: {
        options: { text: '', class: 'postfix' },

        styles:
        {
          color: {},

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

    linkAttr: {
      "type": "array",
      "default": []
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
    var icon = attributes.icon;

    var prefix = attributes.prefix;
    var postfix = attributes.postfix;
    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    var postId = context['postId'];
    var postType = context['postType'];

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    const [isLoading, setisLoading] = useState(false);
    const [postGridData, setPostGridData] = useState(window.PostGridPluginData);
    const [currentPostContent, setCurrentpostContent] = useEntityProp('postType', postType, 'content', postId);
    const [customFields, setCustomFields] = useState({});

    const [currentPostUrl, setCurrentPostUrl] = useEntityProp('postType', postType, 'link', postId);

    const [iconHtml, setIconHtml] = useState('');



    // Wrapper CSS Class Selectors
    const wrapperSelector = blockClass;
    const textSelector = blockClass + ' .text';
    const iconSelector = blockClass + ' .text-icon';

    const prefixSelector = blockClass + ' .prefix';
    const postfixSelector = blockClass + ' .postfix';


    function getMetaField(metaKey) {


      apiFetch({
        path: '/post-grid/v2/get_post_meta',
        method: 'POST',
        data: { postId: postId, meta_key: metaKey },
      }).then((res) => {


        if (res['meta_value'] != undefined && res['meta_value'].length > 0) {
          customFields[metaKey] = res['meta_value'];
          setCustomFields({})
          setCustomFields(customFields)

        }



      });




    }


    var linkToArgs = {
      postUrl: { label: 'Post URL', value: 'postUrl' },
      homeUrl: { label: 'Home URL', value: 'homeUrl' },
      authorUrl: { label: 'Author URL', value: 'authorUrl' },
      authorLink: { label: 'Author Link', value: 'authorLink' },
      authorMail: { label: 'Author Mail', value: 'authorMail', isPro: true },
      authorMeta: { label: 'Author Meta', value: 'authorMeta', isPro: true },
      customField: { label: 'Custom Field', value: 'customField', isPro: true },

      customUrl: { label: 'Custom URL', value: 'customUrl', isPro: true },

    };



    useEffect(() => {


      setAttributes({ customCss: customCss });


      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);






    const [linkPickerExcerpt, setLinkPickerExcerpt] = useState(false);
    const [linkPickerText, setLinkPickerText] = useState(false);





    useEffect(() => {

      setAttributes({ blockId: blockIdX });

      //generateBlockCssY();
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);

    }, [clientId]);



    useEffect(() => {

      var iconSrc = icon.options.iconSrc;

      var iconHtml = `<span class="${iconSrc}"></span>`;

      setIconHtml(iconHtml);



    }, [icon]);


    var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }



    function handleLinkClick(ev) {

      ev.stopPropagation();
      ev.preventDefault();
      return false;
    }



    function setFieldLinkTo(option, index) {


      var options = { ...icon.options, linkTo: option.value };
      setAttributes({ icon: { ...icon, options: options } });

    }


    function onChangeIcon(arg) {




      var options = { ...icon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
      setAttributes({ icon: { ...icon, options: options } });

    }





    function onChangeStyleWrapper(sudoScource, newVal, attr) {

      var sudoScourceX = { ...wrapper[sudoScource] }
      var elementSelector = myStore.getElementSelector(sudoScource, wrapperSelector);


      sudoScourceX[attr][breakPointX] = newVal;

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {
        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[elementSelector][argAttr] = argAttrVal;
      })

      setAttributes({ blockCssY: { items: blockCssY.items } });
      setAttributes({ wrapper: { ...wrapper } });
    }






    function onRemoveStyleWrapper(sudoScource, key) {
      var sudoScourceX = { ...wrapper[sudoScource] }
      if (sudoScourceX[key] != undefined) {
        delete sudoScourceX[key];
      }

      wrapper[sudoScource] = sudoScourceX;
      setAttributes({ wrapper: { ...wrapper } });

      if (blockCssY.items[wrapperSelector] == undefined) {
        blockCssY.items[wrapperSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {
        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[wrapperSelector][argAttr] = argAttrVal;
      })


      if (blockCssY.items[wrapperSelector][key] != undefined) {
        delete blockCssY.items[wrapperSelector][key];
      }

      setAttributes({ blockCssY: { items: blockCssY.items } });
    }





    function onAddStyleWrapper(sudoScource, key) {
      var sudoScourceX = { ...wrapper[sudoScource] }
      sudoScourceX[key] = {};
      wrapper[sudoScource] = sudoScourceX;
      setAttributes({ wrapper: { ...wrapper } });
    }







    function onChangeStyleIcon(sudoScource, newVal, attr) {

      var sudoScourceX = { ...icon[sudoScource] }
      var elementSelector = myStore.getElementSelector(sudoScource, iconSelector);


      sudoScourceX[attr][breakPointX] = newVal;

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {
        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[elementSelector][argAttr] = argAttrVal;
      })

      setAttributes({ blockCssY: { items: blockCssY.items } });
      setAttributes({ icon: { ...icon } });
    }






    function onRemoveStyleIcon(sudoScource, key) {
      var sudoScourceX = { ...icon[sudoScource] }
      if (sudoScourceX[key] != undefined) {
        delete sudoScourceX[key];
      }

      icon[sudoScource] = sudoScourceX;
      setAttributes({ icon: { ...icon } });

      if (blockCssY.items[iconSelector] == undefined) {
        blockCssY.items[iconSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {
        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[iconSelector][argAttr] = argAttrVal;
      })

      if (blockCssY.items[iconSelector][key] != undefined) {
        delete blockCssY.items[iconSelector][key];
      }


      setAttributes({ blockCssY: { items: blockCssY.items } });
    }





    function onAddStyleIcon(sudoScource, key) {
      var sudoScourceX = { ...icon[sudoScource] }
      sudoScourceX[key] = {};
      icon[sudoScource] = sudoScourceX;
      setAttributes({ icon: { ...icon } });
    }



    function onChangeStylePrefix(sudoScource, newVal, attr) {

      var sudoScourceX = { ...prefix[sudoScource] }
      var elementSelector = myStore.getElementSelector(sudoScource, prefixSelector);


      sudoScourceX[attr][breakPointX] = newVal;

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {
        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[elementSelector][argAttr] = argAttrVal;
      })


      setAttributes({ blockCssY: { items: blockCssY.items } });
      setAttributes({ prefix: { ...prefix } });

    }


    function onRemoveStylePrefix(sudoScource, key) {

      var sudoScourceX = { ...prefix[sudoScource] }
      if (sudoScourceX[key] != undefined) {
        delete sudoScourceX[key];
      }

      prefix[sudoScource] = sudoScourceX;
      //sudoScourceX[attr][breakPointX] = newVal;

      setAttributes({ prefix: { ...prefix } });

      if (blockCssY.items[prefixSelector] == undefined) {
        blockCssY.items[prefixSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {

        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[prefixSelector][argAttr] = argAttrVal;

      })


      if (blockCssY.items[prefixSelector][key] != undefined) {
        delete blockCssY.items[prefixSelector][key];
      }

      setAttributes({ blockCssY: { items: blockCssY.items } });

    }


    function onAddStylePrefix(sudoScource, key) {

      var sudoScourceX = { ...prefix[sudoScource] }
      sudoScourceX[key] = {};
      prefix[sudoScource] = sudoScourceX;
      setAttributes({ prefix: { ...prefix } });

    }


    function onChangeStylePostfix(sudoScource, newVal, attr) {

      var sudoScourceX = { ...postfix[sudoScource] }
      var elementSelector = myStore.getElementSelector(sudoScource, postfixSelector);


      sudoScourceX[attr][breakPointX] = newVal;

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {
        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[elementSelector][argAttr] = argAttrVal;
      })


      setAttributes({ blockCssY: { items: blockCssY.items } });
      setAttributes({ postfix: { ...postfix } });

    }


    function onRemoveStylePostfix(sudoScource, key) {

      var sudoScourceX = { ...postfix[sudoScource] }
      if (sudoScourceX[key] != undefined) {
        delete sudoScourceX[key];
      }

      postfix[sudoScource] = sudoScourceX;
      //sudoScourceX[attr][breakPointX] = newVal;

      setAttributes({ postfix: { ...postfix } });

      if (blockCssY.items[postfixSelector] == undefined) {
        blockCssY.items[postfixSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {

        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[postfixSelector][argAttr] = argAttrVal;

      })

      if (blockCssY.items[postfixSelector][key] != undefined) {
        delete blockCssY.items[postfixSelector][key];
      }


      setAttributes({ blockCssY: { items: blockCssY.items } });

    }


    function onAddStylePostfix(sudoScource, key) {

      var sudoScourceX = { ...postfix[sudoScource] }
      sudoScourceX[key] = {};
      postfix[sudoScource] = sudoScourceX;
      setAttributes({ postfix: { ...postfix } });

    }











    var [linkAttrItemsText, setlinkAttrItemsText] = useState({}); // Using the hook.
    var [wrapAttrItems, setwrapAttrItems] = useState({}); // Using the hook.



    useEffect(() => {

      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);







    useEffect(() => {
      var sdsd = {};
      icon.options.linkAttr.map(x => {
        if (x.val)
          sdsd[x.id] = x.val;
      })

      setlinkAttrItemsText(sdsd);
    }, [icon]);

    useEffect(() => {
      var sdsd = {};
      if (wrapper.options.attr != undefined) {
        wrapper.options.attr.map(x => {
          if (x.val)
            sdsd[x.id] = x.val;
        })
      }

      setwrapAttrItems(sdsd);
    }, [wrapper]);




    const colors = [
      { name: '9DD6DF', color: '#9DD6DF' },
      { name: '18978F', color: '#18978F' },
      { name: 'A084CF', color: '#A084CF' },
      { name: 'DFBB9D', color: '#DFBB9D' },
      { name: '774360', color: '#774360' },
      { name: '3AB0FF', color: '#3AB0FF' },
      { name: '51557E', color: '#51557E' },


    ];





    const [setSome, setSomeState] = useState({});
    const [stateX, setStateX] = useState('Old Value');







    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType,

    } = wp.data.dispatch('core/edit-post')


    var postUrl = (icon.options.customUrl != undefined && icon.options.customUrl.length > 0) ? icon.options.customUrl : currentPostUrl;


    const CustomTag = `${wrapper.options.tag}`;






    function onChangeBreakPoint(x, index) {


      setPreviewDeviceType(x.value)
      var asdsdsd = wp.data.dispatch('postgrid-shop').setBreakPoint(x.value)

      asdsdsd.then((res) => {

        setBreakPointX(res.breakpoint);
        //generateBlockCssY();
        myStore.generateBlockCss(blockCssY.items, blockId, customCss);
      });



    }


    return (
      [


        <div>

          <BlockControls >



          </BlockControls>


          <InspectorControls key="general">
            <div className='px-3' title="General" initialOpen={false}>




              <div>






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
                            { label: 'No Wrapper', value: '' },

                            { label: 'H1', value: 'h1' },
                            { label: 'H2', value: 'h2' },
                            { label: 'H3', value: 'h3' },
                            { label: 'H4', value: 'h4' },
                            { label: 'H5', value: 'h5' },
                            { label: 'H6', value: 'h6' },
                            { label: 'SPAN', value: 'span' },
                            { label: 'DIV', value: 'div' },
                            { label: 'P', value: 'p' },
                            { label: 'BUTTON', value: 'button' },


                          ]}
                          onChange={(newVal) => {



                            var options = { ...wrapper.options, tag: newVal };
                            setAttributes({ wrapper: { ...wrapper, options: options } });



                          }

                          }
                        />
                      </PanelRow>


                      <PanelRow>
                        <label for="">Custom Attributes</label>
                        <div
                          className=' cursor-pointer px-3 text-white py-1 bg-blue-600'

                          onClick={(ev) => {

                            if (wrapper.options.attr == undefined) {
                              wrapper.options.attr = {};
                            }
                            var sdsd = wrapper.options.attr.concat({ id: '', val: '' })



                            var options = { ...wrapper.options, attr: sdsd };
                            setAttributes({ wrapper: { ...wrapper, options: options } });






                          }}

                        >Add</div>



                      </PanelRow>




                      {
                        wrapper.options.attr != undefined && wrapper.options.attr.map((x, i) => {

                          return (

                            <div className='my-2'>
                              <PanelRow>
                                <InputControl
                                  placeholder="Name"
                                  className='mr-2'
                                  value={wrapper.options.attr[i].id}
                                  onChange={(newVal) => {

                                    wrapper.options.attr[i].id = newVal;


                                    var ssdsd = wrapper.options.attr.concat([]);



                                    var options = { ...wrapper.options, attr: ssdsd };
                                    setAttributes({ wrapper: { ...wrapper, options: options } });



                                  }}
                                />

                                <InputControl
                                  className='mr-2'
                                  placeholder="Value"
                                  value={x.val}
                                  onChange={(newVal) => {
                                    wrapper.options.attr[i].val = newVal
                                    var ssdsd = wrapper.options.attr.concat([]);



                                    var options = { ...wrapper.options, attr: ssdsd };
                                    setAttributes({ wrapper: { ...wrapper, options: options } });


                                  }}
                                />
                                <span className='text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close'
                                  onClick={(ev) => {

                                    wrapper.options.attr.splice(i, 1);

                                    var ssdsd = wrapper.options.attr.concat([]);




                                    var options = { ...wrapper.options, attr: ssdsd };
                                    setAttributes({ wrapper: { ...wrapper, options: options } });


                                  }}

                                ></span>
                              </PanelRow>




                            </div>

                          )

                        })
                      }



                    </PGtab>
                    <PGtab name="styles">
                      <PGStyles obj={wrapper} onChange={onChangeStyleWrapper} onAdd={onAddStyleWrapper} onRemove={onRemoveStyleWrapper} />
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
                    ]}
                  >
                    <PGtab name="options">

                      <PanelRow>
                        <label for="">Choose Icon</label>

                        <PGIconPicker library={icon.options.library} srcType={icon.options.srcType} iconSrc={icon.options.iconSrc} onChange={onChangeIcon} />
                      </PanelRow>




                      <ToggleControl
                        label="Linked to URL?"
                        help={icon.options.isLink ? 'Linked to URL?' : 'Not Linked.'}
                        checked={icon.options.isLink ? true : false}
                        onChange={(e) => {


                          var options = { ...icon.options, isLink: icon.options.isLink ? false : true, };
                          setAttributes({ icon: { ...icon, options: options } });



                        }}
                      />




                      {icon.options.isLink && (
                        <>

                          <PanelRow>
                            <label for="">Link To</label>



                            <PGDropdown position="bottom right" variant="secondary" options={linkToArgs} buttonTitle="Choose" onChange={setFieldLinkTo} values={[]}></PGDropdown>


                          </PanelRow>


                          <div className='bg-gray-500 p-2 my-3 text-white'>{(linkToArgs[icon.options.linkTo] != undefined) ? linkToArgs[icon.options.linkTo].label : ''}</div>

                          {icon.options.linkTo == 'authorMeta' && (

                            <PanelRow>
                              <label for="">Author Meta Key</label>

                              <InputControl
                                value={icon.options.linkToAuthorMeta}
                                onChange={(newVal) => {


                                  var options = { ...icon.options, linkToAuthorMeta: newVal };
                                  setAttributes({ icon: { ...icon, options: options } });

                                }}
                              />

                            </PanelRow>

                          )}


                          {icon.options.linkTo == 'customField' && (

                            <PanelRow>
                              <label for="">Custom Meta Key</label>

                              <InputControl
                                value={icon.options.linkToAuthorMeta}
                                onChange={(newVal) => {


                                  var options = { ...icon.options, linkToAuthorMeta: newVal };
                                  setAttributes({ icon: { ...icon, options: options } });

                                }}
                              />

                            </PanelRow>

                          )}










                          <PanelRow>
                            <label for="">Link Target</label>

                            <SelectControl
                              label=""
                              value={icon.options.linkTarget}
                              options={[
                                { label: '_self', value: '_self' },
                                { label: '_blank', value: '_blank' },
                                { label: '_parent', value: '_parent' },
                                { label: '_top', value: '_top' },
                              ]}
                              onChange={
                                (newVal) => {
                                  var options = { ...icon.options, linkTarget: newVal };
                                  setAttributes({ icon: { ...icon, options: options } });
                                }
                              }
                            />
                          </PanelRow>
                        </>

                      )}




                      {icon.options.linkTo == 'customUrl' && (


                        <PanelRow>
                          <label for="">Custom Url</label>

                          <div className='relative'>
                            <Button className={(linkPickerText) ? "!bg-gray-400" : ''} icon={link} onClick={ev => {

                              setLinkPickerText(prev => !prev)
                            }}></Button>
                            {icon.options.customUrl.length > 0 && (
                              <Button className='!text-red-500 ml-2' icon={linkOff} onClick={ev => {

                                var options = { ...icon.options, customUrl: '' };
                                setAttributes({ icon: { ...icon, options: options } });



                              }}></Button>

                            )}
                            {linkPickerText && (
                              <Popover position="bottom right">
                                <LinkControl settings={[]} value={icon.options.customUrl} onChange={newVal => {

                                  var options = { ...icon.options, customUrl: newVal.url };
                                  setAttributes({ icon: { ...icon, options: options } });
                                  //setLinkPickerText(false)

                                }} />

                                <div className='p-2'><span className='font-bold'>Linked to:</span> {(icon.options.customUrl.length != 0) ? icon.options.customUrl : 'No link'} </div>
                              </Popover>

                            )}


                          </div>
                        </PanelRow>


                      )}



                      {icon.options.isLink && (

                        <div>




                          <PanelRow>
                            <label for="">Custom Attributes</label>
                            <div
                              className=' cursor-pointer px-3 text-white py-1 bg-blue-600'

                              onClick={(ev) => {

                                var sdsd = icon.options.linkAttr.concat({ id: '', val: '' })



                                var options = { ...icon.options, linkAttr: sdsd };
                                setAttributes({ icon: { ...icon, options: options } });






                              }}

                            >Add</div>



                          </PanelRow>



                          {
                            icon.options.linkAttr != undefined && icon.options.linkAttr.map((x, i) => {

                              return (

                                <div className='my-2'>
                                  <PanelRow>
                                    <InputControl
                                      placeholder="Name"
                                      className='mr-2'
                                      value={icon.options.linkAttr[i].id}
                                      onChange={(newVal) => {

                                        icon.options.linkAttr[i].id = newVal;


                                        var ssdsd = icon.options.linkAttr.concat([]);



                                        var options = { ...icon.options, linkAttr: ssdsd };
                                        setAttributes({ icon: { ...icon, options: options } });



                                      }}
                                    />

                                    <InputControl
                                      className='mr-2'
                                      placeholder="Value"
                                      value={x.val}
                                      onChange={(newVal) => {
                                        icon.options.linkAttr[i].val = newVal
                                        var ssdsd = icon.options.linkAttr.concat([]);



                                        var options = { ...icon.options, linkAttr: ssdsd };
                                        setAttributes({ icon: { ...icon, options: options } });


                                      }}
                                    />
                                    <span className='text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close'
                                      onClick={(ev) => {

                                        icon.options.linkAttr.splice(i, 1);

                                        var ssdsd = icon.options.linkAttr.concat([]);




                                        var options = { ...icon.options, linkAttr: ssdsd };
                                        setAttributes({ icon: { ...icon, options: options } });


                                      }}

                                    ></span>
                                  </PanelRow>




                                </div>

                              )

                            })
                          }


                        </div>



                      )}




                    </PGtab>
                    <PGtab name="styles">
                      <PGStyles obj={icon} onChange={onChangeStyleIcon} onAdd={onAddStyleIcon} onRemove={onRemoveStyleIcon} />
                    </PGtab>
                  </PGtabs>







                </PanelBody>

                <PanelBody title="Prefix" initialOpen={false}>



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
                        <label for="">Prefix</label>

                        <InputControl
                          value={prefix.options.text}
                          onChange={(newVal) => {


                            var options = { ...prefix.options, text: newVal };
                            setAttributes({ prefix: { ...prefix, options: options } });


                          }
                          }
                        />
                      </PanelRow>
                    </PGtab>
                    <PGtab name="styles">
                      <PGStyles obj={prefix} onChange={onChangeStylePrefix} onAdd={onAddStylePrefix} onRemove={onRemoveStylePrefix} />
                    </PGtab>
                  </PGtabs>




                </PanelBody>




                <PanelBody title="Postfix" initialOpen={false}>



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
                        <label for="">Postfix</label>

                        <InputControl
                          value={postfix.options.text}
                          onChange={(newVal) => {

                            var options = { ...postfix.options, text: newVal };
                            setAttributes({ postfix: { ...postfix, options: options } });



                          }

                          }
                        />
                      </PanelRow>
                    </PGtab>
                    <PGtab name="styles">
                      <PGStyles obj={postfix} onChange={onChangeStylePostfix} onAdd={onAddStylePostfix} onRemove={onRemoveStylePostfix} />
                    </PGtab>
                  </PGtabs>






                </PanelBody>

                <PanelBody title="Custom Style" initialOpen={false}>


                  <p>Please use following class selector to apply your custom CSS</p>
                  <div className='my-3'>
                    <p className='font-bold'>Wrapper</p>
                    <p><code>{wrapperSelector}{'{/* your CSS here*/}'}</code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Prefix Selector</p>
                    <p><code>{prefixSelector}{'{/* your CSS here*/}'} </code></p>
                  </div>


                  <div className='my-3'>
                    <p className='font-bold'>Postfix Selector</p>
                    <p><code>{postfixSelector}{'{/* your CSS here*/}'} </code></p>
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
                  <PGContactSupport utm={{ utm_source: 'BlockReadMore', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />

                </div>



              </div>
            </div>






          </InspectorControls >
        </div >
        ,


        <>



          {wrapper.options.tag && (
            <CustomTag className={[blockId]} {...wrapAttrItems}>



              {prefix.options.text && (
                <span className={prefix.options.class}>{prefix.options.text}</span>
              )}




              {icon.options.isLink && (

                <>

                  <a className='text' onClick={handleLinkClick}  {...linkAttrItemsText} target={icon.options.linkTarget} href={postUrl}>



                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />

                  </a>

                </>



              )}

              {!icon.options.isLink && (
                <>


                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                </>
              )}





              {postfix.options.text &&
                (<span className={postfix.options.class}>{postfix.options.text}</span>)}


            </CustomTag>
          )}

          {wrapper.options.tag.length == 0 && (
            <>

              {prefix.options.text && (
                <span className={prefix.options.class}>{prefix.options.text}</span>
              )}



              {icon.options.isLink && (
                <>

                  <a className='text' onClick={handleLinkClick}  {...linkAttrItemsText} target={text.options.linkTarget} href={postUrl}>



                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />

                  </a>

                </>
              )}
              {!icon.options.isLink && (

                <>



                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                </>



              )}




              {postfix.options.text &&
                (<span className={postfix.options.class}>{postfix.options.text}</span>)}

            </>




          )}





        </>
      ]

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})