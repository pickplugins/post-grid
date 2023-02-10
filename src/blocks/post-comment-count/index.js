import { registerBlockType } from '@wordpress/blocks'
import apiFetch from '@wordpress/api-fetch';

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



var myStore = wp.data.select('postgrid-shop');

registerBlockType("post-grid/post-comment-count", {
  title: "Post Comment Count",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:
      <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 95C25 92.2386 27.2386 90 30 90H470C472.761 90 475 92.2386 475 95V145C475 147.761 472.761 150 470 150H30C27.2386 150 25 147.761 25 145V95Z" />
        <path d="M25 234C25 231.239 27.2386 229 30 229H470C472.761 229 475 231.239 475 234V254C475 256.761 472.761 259 470 259H30C27.2386 259 25 256.761 25 254V234Z" />
        <path d="M25 298C25 295.239 27.2386 293 30 293H470C472.761 293 475 295.239 475 298V318C475 320.761 472.761 323 470 323H30C27.2386 323 25 320.761 25 318V298Z" />
        <path d="M25 362C25 359.239 27.2386 357 30 357H366C368.761 357 371 359.239 371 362V382C371 384.761 368.761 387 366 387H30C27.2386 387 25 384.761 25 382V362Z" />
      </svg>


    ,
  },


  attributes: {


    wrapper: {
      type: 'object',
      default: {
        options: { tag: 'div', class: '' },

        styles:
        {
          color: {},
          backgroundColor: {},


        },
      },
    },

    commentCount: {
      type: 'object',
      default: {
        options: {
          tag: 'div',
          status: 'approved',
          customLabel: 'Count: %s',

          linkTo: '', // postUrl, customField, authorUrl, authorLink, homeUrl, custom
          linkToUrl: '',
          linkToMetaKey: '',

          linkTarget: '_blank',
          linkAttr: [],
          customUrl: '',
          class: 'commentCount',
        },

        styles: {
          color: {},
          fontSize: {}, //{ val: '18', unit: 'px' }

        },
      },
    },
    icon: {
      type: 'object',
      default: {
        options: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'far fa-calendar-alt', position: 'beforeCommentCount', /*before, after, prefix, postfix */ class: 'commentCount-icon', },

        styles:
        {
          color: {},
          backgroundColor: {},
          fontSize: {}, //{ val: '18', unit: 'px' }

        },
      },
    },


    prefix: {
      type: 'object',
      default: {
        options:
          { text: '', class: 'prefix', },
        styles:
        {
          color: {},
          backgroundColor: {},

        },
      },
    },

    postfix: {
      type: 'object',
      default: {
        options:
          { text: '', class: 'postfix', },
        styles:
        {
          color: {},
          backgroundColor: {},

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


    let commentCount = attributes.commentCount;
    var wrapper = attributes.wrapper;
    var blockId = attributes.blockId;

    var blockIdX = attributes.blockId ? attributes.blockId : 'pg' + clientId.split('-').pop();
    var blockClass = '.' + blockIdX;
    var icon = attributes.icon;

    var prefix = attributes.prefix;
    var postfix = attributes.postfix;
    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;



    var postId = context['postId'];
    var postType = context['postType'];

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);


    var [currentCommentCount, setcurrentCommentCount] = useState({ approved: 0, moderated: 0, spam: 0, total_comments: 0, trash: 0, 'post-trashed': 0, all: 0 });
    var [commentCountEdited, setcommentCountEdited] = useState(commentCount.options.customLabel);

    var linkToArgsBasic = {
      postUrl: { label: 'Post URL', value: 'postUrl' },
      homeUrl: { label: 'Home URL', value: 'homeUrl' },
      authorUrl: { label: 'Author URL', value: 'authorUrl' },
      authorLink: { label: 'Author Link', value: 'authorLink' },
      authorMail: { label: 'Author Mail', value: 'authorMail', isPro: true },
      authorMeta: { label: 'Author Meta', value: 'authorMeta', isPro: true },
      customField: { label: 'Custom Field', value: 'customField', isPro: true },
      customUrl: { label: 'Custom URL', value: 'customUrl', isPro: true },
    };

    let linkToArgs = applyFilters('linkToArgs', linkToArgsBasic);


    function setFieldLinkTo(option, index) {

      var options = { ...commentCount.options, linkTo: option.value };
      setAttributes({ commentCount: { ...commentCount, options: options } });

    }

    useEffect(() => {


      apiFetch({
        path: '/post-grid/v2/get_comment_count',
        method: 'POST',
        data: { id: postId },
      }).then((res) => {

        setcurrentCommentCount(res)
        setcommentCountEdited(commentCount.options.customLabel.replace('%s', res[commentCount.options.status]))

      });
    }, [clientId]);

    useEffect(() => {

      setcommentCountEdited(commentCount.options.customLabel.replace('%s', currentCommentCount[commentCount.options.status]))

    }, [commentCount]);


    // Wrapper CSS Class Selectors
    const wrapperSelector = blockClass;
    var commentCountSelector = blockClass + ' .commentCount';
    const prefixSelector = blockClass + ' .prefix';
    const postfixSelector = blockClass + ' .postfix';
    const iconSelector = blockClass + ' .commentCount-icon';





    function onChangeIcon(arg) {


      var options = { ...icon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
      setAttributes({ icon: { ...icon, options: options } });

    }





    function onChangeStyleWrapper(sudoScource, newVal, attr) {

      var path = sudoScource + '.' + attr + '.' + breakPointX
      let obj = Object.assign({}, wrapper);
      const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      setAttributes({ wrapper: updatedObj });
      var sudoScourceX = { ...updatedObj[sudoScource] }




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







    function onChangeStyleCommentCount(sudoScource, newVal, attr) {

      var path = sudoScource + '.' + attr + '.' + breakPointX
      let obj = Object.assign({}, commentCount);
      const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      setAttributes({ commentCount: updatedObj });
      var sudoScourceX = { ...updatedObj[sudoScource] }



      var elementSelector = myStore.getElementSelector(sudoScource, commentCountSelector);


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
    }






    function onRemoveStyleCommentCount(sudoScource, key) {
      var sudoScourceX = { ...commentCount[sudoScource] }
      if (sudoScourceX[key] != undefined) {
        delete sudoScourceX[key];
      }

      commentCount[sudoScource] = sudoScourceX;
      setAttributes({ commentCount: { ...commentCount } });

      if (blockCssY.items[commentCountSelector] == undefined) {
        blockCssY.items[commentCountSelector] = {};
      }

      Object.entries(sudoScourceX).map(args => {
        var argAttr = myStore.cssAttrParse(args[0]);
        var argAttrVal = args[1];
        blockCssY.items[commentCountSelector][argAttr] = argAttrVal;
      })

      if (blockCssY.items[commentCountSelector][key] != undefined) {
        delete blockCssY.items[wrapperSelector][key];
      }


      setAttributes({ blockCssY: { items: blockCssY.items } });
    }





    function onAddStyleCommentCount(sudoScource, key) {
      var sudoScourceX = { ...commentCount[sudoScource] }
      sudoScourceX[key] = {};
      commentCount[sudoScource] = sudoScourceX;
      setAttributes({ commentCount: { ...commentCount } });
    }




    function onChangeStyleIcon(sudoScource, newVal, attr) {


      var path = sudoScource + '.' + attr + '.' + breakPointX
      let obj = Object.assign({}, icon);
      const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      setAttributes({ icon: updatedObj });
      var sudoScourceX = { ...updatedObj[sudoScource] }


      var elementSelector = iconSelector;
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

      var path = sudoScource + '.' + attr + '.' + breakPointX
      let obj = Object.assign({}, prefix);
      const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      setAttributes({ prefix: updatedObj });
      var sudoScourceX = { ...updatedObj[sudoScource] }



      var elementSelector = prefixSelector;
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

      var path = sudoScource + '.' + attr + '.' + breakPointX
      let obj = Object.assign({}, postfix);
      const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      setAttributes({ postfix: updatedObj });
      var sudoScourceX = { ...updatedObj[sudoScource] }



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






    const [
      currentPostUrl,
      setCurrentPostUrl,
    ] = useEntityProp('postType', postType, 'link', postId);


    useEffect(() => {

      setAttributes({ blockId: blockIdX });

      // setAttributes({ commentCount: commentCount });
      // setAttributes({ wrapper: wrapper });

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);




    }, [clientId]);




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




    var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.



    useEffect(() => {

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);

    }, [blockCssY]);


    useEffect(() => {


      setAttributes({ customCss: customCss });


      myStore.generateBlockCss(blockCssY.items, blockId, customCss);

    }, [customCss]);



    useEffect(() => {
      linkAttrObj();

    }, [commentCount]);






    var linkAttrObj = () => {

      var sdsd = {};

      commentCount.options.linkAttr.map(x => {

        if (x.val)
          sdsd[x.id] = x.val;

      })

      setlinkAttrItems(sdsd);

    }

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


    var postUrl = (commentCount.options.customUrl != undefined && commentCount.options.customUrl.length > 0) ? commentCount.options.customUrl : currentPostUrl;


    const CustomTag = `${wrapper.options.tag}`;
    const CustomTagPostTitle = `${commentCount.options.tag}`;














    return (
      [


        <div>

          <BlockControls>

          </BlockControls>


          <InspectorControls key="general">
            <div className='px-3' initialOpen={false}>


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
                            { label: 'span', value: 'SPAN' },
                            { label: 'div', value: 'DIV' },
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
                      <PGStyles obj={wrapper} onChange={onChangeStyleWrapper} onAdd={onAddStyleWrapper} onRemove={onRemoveStyleWrapper} />
                    </PGtab>
                  </PGtabs>













                </PanelBody>

                <PanelBody title="Comment Count" initialOpen={false}>


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
                        <label for="">Comment Status</label>
                        <SelectControl
                          label=""
                          value={commentCount.options.status}
                          options={[
                            { label: 'Approved', value: 'approved' },
                            { label: 'Moderated', value: 'moderated' },
                            { label: 'Spam', value: 'spam' },
                            { label: 'Trash', value: 'trash' },
                            { label: 'Post trashed', value: 'post-trashed' },
                            { label: 'Total Comments', value: 'total_comments' },
                            { label: 'All', value: 'all' },

                          ]}
                          onChange={(newVal) => {

                            var options = { ...commentCount.options, status: newVal };
                            setAttributes({ commentCount: { ...commentCount, options: options } });

                          }

                          }
                        />
                      </PanelRow>




                      <PanelRow>
                        <label for="">Custom Label</label>
                        <InputControl
                          className='mr-2'
                          value={commentCount.options.customLabel}
                          onChange={(newVal) => {


                            var options = { ...commentCount.options, customLabel: newVal };
                            setAttributes({ commentCount: { ...commentCount, options: options } });

                          }}
                        />
                      </PanelRow>




                      <PanelRow>
                        <label for="">Link To</label>

                        <PGDropdown position="bottom right" variant="secondary" options={linkToArgs} buttonTitle={commentCount.options.linkTo.length == 0 ? 'Choose' : linkToArgs[commentCount.options.linkTo].label} onChange={setFieldLinkTo} values={[]}></PGDropdown>




                      </PanelRow>

                      {commentCount.options.linkTo == 'customField' && (



                        <PanelRow>
                          <label for="">Custom Field Key</label>
                          <InputControl
                            className='mr-2'
                            value={commentCount.options.linkToMetaKey}
                            onChange={(newVal) => {


                              var options = { ...commentCount.options, linkToMetaKey: newVal };
                              setAttributes({ commentCount: { ...commentCount, options: options } });

                            }}
                          />
                        </PanelRow>


                      )}






                      {commentCount.options.linkTo == 'customUrl' && (

                        <PanelRow>
                          <label for="">Custom URL</label>

                          <div className='relative'>
                            <Button className={(linkPickerPosttitle) ? "!bg-gray-400" : ''} icon={link} onClick={ev => {

                              setLinkPickerPosttitle(prev => !prev);

                            }}></Button>
                            {commentCount.options.customUrl.length > 0 && (
                              <Button className='!text-red-500 ml-2' icon={linkOff} onClick={ev => {

                                var options = { ...commentCount.options, customUrl: '' };
                                setAttributes({ commentCount: { ...commentCount, options: options } });
                                setLinkPickerPosttitle(false);

                              }}></Button>

                            )}
                            {linkPickerPosttitle && (
                              <Popover position="bottom right">
                                <LinkControl settings={[]} value={commentCount.options.customUrl} onChange={newVal => {

                                  var options = { ...commentCount.options, customUrl: newVal.url };

                                  setAttributes({ commentCount: { ...commentCount, options: options } });

                                }} />

                                <div className='p-2'><span className='font-bold'>Linked to:</span> {(commentCount.options.customUrl.length != 0) ? commentCount.options.customUrl : 'No link'} </div>
                              </Popover>

                            )}


                          </div>
                        </PanelRow>

                      )}



                      {commentCount.options.linkTo.length == 0 && (

                        <PanelRow>
                          <label for="">Custom Tag</label>
                          <SelectControl
                            label=""
                            value={commentCount.options.tag}
                            options={[
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
                              var options = { ...commentCount.options, tag: newVal };
                              setAttributes({ commentCount: { ...commentCount, options: options } });
                            }

                            }
                          />
                        </PanelRow>
                      )}




                      {commentCount.options.linkTo.length > 0 && (

                        <div>
                          <PanelRow>
                            <label for="">Link Target</label>

                            <SelectControl
                              label=""
                              value={commentCount.options.linkTarget}
                              options={[
                                { label: 'Choose...', value: '' },

                                { label: '_self', value: '_self' },
                                { label: '_blank', value: '_blank' },
                                { label: '_parent', value: '_parent' },
                                { label: '_top', value: '_top' },


                              ]}
                              onChange={(newVal) => {



                                var options = { ...commentCount.options, linkTarget: newVal };
                                setAttributes({ commentCount: { ...commentCount, options: options } });



                              }



                              }
                            />
                          </PanelRow>










                          <PanelRow>
                            <label for="">Custom Attributes</label>
                            <div
                              className=' cursor-pointer px-3 text-white py-1 bg-blue-600'

                              onClick={(ev) => {

                                var sdsd = commentCount.options.linkAttr.concat({ id: '', val: '' })


                                var options = { ...commentCount.options, linkAttr: sdsd };
                                setAttributes({ commentCount: { ...commentCount, options: options } });

                                linkAttrObj()
                              }}

                            >Add</div>



                          </PanelRow>



                          {
                            commentCount.options.linkAttr.map((x, i) => {

                              return (

                                <div className='my-2'>
                                  <PanelRow>
                                    <InputControl
                                      placeholder="Name"
                                      className='mr-2'
                                      value={commentCount.options.linkAttr[i].id}
                                      onChange={(newVal) => {

                                        commentCount.options.linkAttr[i].id = newVal;


                                        var ssdsd = commentCount.options.linkAttr.concat([]);



                                        var options = { ...commentCount.options, linkAttr: ssdsd };
                                        setAttributes({ commentCount: { ...commentCount, options: options } });

                                      }}
                                    />

                                    <InputControl
                                      className='mr-2'
                                      placeholder="Value"
                                      value={x.val}
                                      onChange={(newVal) => {
                                        commentCount.options.linkAttr[i].val = newVal
                                        var ssdsd = commentCount.options.linkAttr.concat([]);



                                        var options = { ...commentCount.options, linkAttr: ssdsd };
                                        setAttributes({ commentCount: { ...commentCount, options: options } });

                                      }}
                                    />
                                    <span className='text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close'
                                      onClick={(ev) => {

                                        commentCount.options.linkAttr.splice(i, 1);

                                        var ssdsd = commentCount.options.linkAttr.concat([]);


                                        var options = { ...commentCount.options, linkAttr: ssdsd };
                                        setAttributes({ commentCount: { ...commentCount, options: options } });
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
                      <PGStyles obj={commentCount} onChange={onChangeStyleCommentCount} onAdd={onAddStyleCommentCount} onRemove={onRemoveStyleCommentCount} />
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



                      <PanelRow>
                        <label for="">Icon postion</label>

                        <SelectControl
                          label=""
                          value={icon.options.position}
                          options={[

                            { label: 'Choose Position', value: '' },

                            { label: 'Before Comment Count', value: 'beforeCommentCount' },
                            { label: 'After Comment Count', value: 'afterCommentCount' },
                            { label: 'Before Prefix', value: 'beforePrefix' },
                            { label: 'After Prefix', value: 'afterPrefix' },
                            { label: 'Before Postfix', value: 'beforePostfix' },
                            { label: 'After Postfix', value: 'afterPostfix' },

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
                            setAttributes({ prefix: { styles: prefix.styles, options: options } });



                            // setAttributes({ prefix: { text: newVal, class: prefix.options.class, color: prefix.color, backgroundColor: prefix.backgroundColor } })
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


                            // setAttributes({ postfix: { text: newVal, class: prefix.options.class, color: postfix.color, backgroundColor: postfix.backgroundColor } })
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
                    <p className='font-bold'>Title Wrapper</p>
                    <p><code>{wrapperSelector}{'{/* your CSS here*/}'}</code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Title link</p>
                    <p><code>{commentCountSelector}{'{/* your CSS here*/}'} </code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Prefix</p>
                    <p><code>{prefixSelector}{'{/* your CSS here*/}'} </code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Postfix</p>
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

                <PGMailSubsctibe />
                <PGContactSupport utm={{ utm_source: 'BlockPostTitle', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />


              </div>
            </div>


          </InspectorControls >
        </div >
        ,


        <>



          {wrapper.options.tag && (
            <CustomTag className={[blockId]}>

              {icon.options.position == 'beforePrefix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}

              {prefix.options.text && (
                <span className={prefix.options.class}>{prefix.options.text}</span>
              )}

              {icon.options.position == 'afterPrefix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}

              {commentCount.options.linkTo.length > 0 && (
                <a className='commentCount' onClick={handleLinkClick}  {...linkAttrItems} target={commentCount.options.linkTarget} href={postUrl}>

                  {icon.options.position == 'beforeCommentCount' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                  <span className={commentCount.options.class}>{commentCountEdited}</span>
                  {icon.options.position == 'afterCommentCount' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                </a>
              )}


              {commentCount.options.linkTo.length == 0 && (
                <>
                  {icon.options.position == 'beforeCommentCount' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}

                  <span className={commentCount.options.class}>{commentCountEdited}</span>

                  {icon.options.position == 'afterCommentCount' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                </>
              )}

              {icon.options.position == 'beforePostfix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}

              {postfix.options.text &&
                (<span className={postfix.options.class}>{postfix.options.text}</span>)}
              {icon.options.position == 'afterPostfix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}

            </CustomTag>
          )}

          {wrapper.options.tag.length == 0 && (

            <>


              {icon.options.position == 'beforePostfix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}
              {prefix.options.text && (
                <span className={prefix.options.class}>{prefix.options.text}</span>
              )}

              {icon.options.position == 'beforePostfix' && (
                <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
              )}

              {commentCount.options.linkTo.length > 0 && (
                <a className='commentCount' onClick={handleLinkClick}  {...linkAttrItems} target={commentCount.options.linkTarget} href={postUrl}>A

                  {icon.options.position == 'beforeCommentCount' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}

                  <span className={commentCount.options.class}>{commentCountEdited}</span>

                  {icon.options.position == 'afterCommentCount' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                </a>
              )}


              {commentCount.options.linkTo.length == 0 && (

                <div className={[blockId]}>

                  {icon.options.position == 'beforeCommentCount' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                  <span className={commentCount.options.class}>{commentCountEdited}</span>
                  {icon.options.position == 'afterCommentCount' && (
                    <span className={icon.options.class} dangerouslySetInnerHTML={{ __html: iconHtml }} />
                  )}
                </div>



              )}

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

