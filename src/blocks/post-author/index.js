import { registerBlockType } from '@wordpress/blocks'
import apiFetch from '@wordpress/api-fetch';
import { ReactSortable } from "react-sortablejs";

import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'

import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { applyFilters } from '@wordpress/hooks';
import { Icon, styles, settings, link, linkOff, close } from "@wordpress/icons";

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'

import IconToggle from '../../components/icon-toggle'
import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import PGDropdown from '../../components/dropdown'
import Typography from '../../components/typography'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import PGcssDisplay from '../../components/css-display'

import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import PGStyles from '../../components/styles'



var myStore = wp.data.select('postgrid-shop');




registerBlockType("post-grid/post-author", {
  title: "Post Author",
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:
      <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 249.5C25 246.739 27.2386 244.5 30 244.5H470C472.761 244.5 475 246.739 475 249.5V299.5C475 302.261 472.761 304.5 470 304.5H30C27.2386 304.5 25 302.261 25 299.5V249.5Z" />
        <path d="M25 355.5C25 352.739 27.2386 350.5 30 350.5H470C472.761 350.5 475 352.739 475 355.5V405.5C475 408.261 472.761 410.5 470 410.5H30C27.2386 410.5 25 408.261 25 405.5V355.5Z" />
        <path d="M241 147C241 144.239 243.239 142 246 142H470C472.761 142 475 144.239 475 147V197C475 199.761 472.761 202 470 202H246C243.239 202 241 199.761 241 197V147Z" />
        <path d="M100 132.5C119.569 132.5 135.429 116.72 135.429 97.25C135.429 77.7799 119.569 62 100 62C80.4312 62 64.5714 77.7799 64.5714 97.25C64.5714 116.72 80.4312 132.5 100 132.5ZM124.8 141.312H120.178C114.033 144.121 107.196 145.719 100 145.719C92.8036 145.719 85.9946 144.121 79.8223 141.312H75.2C54.6625 141.312 38 157.891 38 178.325V189.781C38 197.079 43.9509 203 51.2857 203H148.714C156.049 203 162 197.079 162 189.781V178.325C162 157.891 145.337 141.312 124.8 141.312Z" />
      </svg>
    ,
  },


  attributes: {
    wrapper: {
      type: 'object',
      default: {
        options: { tag: 'div', class: '', },
        styles:
        {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
        },
      },
    },
    elements: {
      "type": "object",
      "default": {
        items: [
          { id: 'avatar', label: "Avatar", },
          { id: 'name', label: "Name", },
          { id: 'description', label: "Description", },
        ],
      } // avatar, name, description, id
    },


    avatar: {
      "type": "object",
      "default": {
        options: { class: 'avatar', size: '48', default: '', },
        styles:
        {
          display: {},

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
          verticalAlign: {},
          borderRadius: {},


        },
      }
    },

    name: {
      "type": "object",
      "default": {


        options: { class: 'name', prefix: '', postfix: '', linkTo: '', linkToMeta: '', customUrl: '', },
        styles:
        {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
          verticalAlign: {},

          fontSize: { Desktop: '' },

        },


      }
    },
    description: {
      "type": "object",
      "default": {

        options: { class: 'description', prefix: '', postfix: '', },
        styles:
        {

          color: { Desktop: '' },
          backgroundColor: { Desktop: '' },
          padding: { Desktop: '' },
          margin: { Desktop: '' },
          verticalAlign: {},
          fontSize: { Desktop: '' },
          lineHeight: {}, // { val: '18', unit: 'px' }
          letterSpacing: {}, // { val: '18', unit: 'px' }
          fontFamily: {},
          fontWeight: {},
          textDecoration: {}, //overline, line-through, underline
          textTransform: {},
        },

      }
    },


    customCss: {
      "type": "string",
      "default": ''
    },

    linkAttr: {
      "type": "array",
      "default": []
    },
    blockCss: {
      "type": "object",
      "default": { items: {} }
    },

    blockCssY: {
      "type": "object",
      "default": { items: {} }
    },

    blockId: {
      "type": "string",
      "default": ''
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
    var elements = attributes.elements;
    var avatar = attributes.avatar;
    var description = attributes.description;
    var name = attributes.name;


    var linkAttr = attributes.linkAttr;
    var blockCss = attributes.blockCss;
    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    var postId = context['postId'];
    var postType = context['postType'];



    var wrapperSelector = blockClass;
    // Wrapper CSS Class Selectors
    var nameSelector = blockClass + ' .name';
    var descriptionSelector = blockClass + ' .description';
    var avatarSelector = blockClass + ' .avatar';
    var avatarImgSelector = blockClass + ' .avatar img';






    var [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    var [postAuthor, setPostAuthor] = useState({});

    var [html, setHtml] = useState({});
    var [loading, setLoading] = useState(false);
    const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);




    var [
      postAuthorId,
      setPostAuthorId,
    ] = useEntityProp('postType', postType, 'author', postId);



    var [
      currentPostUrl,
      setCurrentPostUrl,
    ] = useEntityProp('postType', postType, 'link', postId);

    useEffect(() => {

      setAttributes({ blockId: blockIdX });



      //generateBlockCssY();
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [clientId]);

    useEffect(() => {


      apiFetch({
        path: '/wp/v2/users/' + postAuthorId,
        method: 'GET',
      }).then((res) => {

        setPostAuthor(res);


      });

    }, [postAuthorId]);



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



    var userFields = [

      { id: 'avatar', label: "Avatar", },
      { id: 'name', label: "Name", },
      { id: 'description', label: "Description", },

    ]


    function setUserField(option, index) {

      //var isExist = elements.items.find(x => x.label === option.label);


      //if (isExist == undefined) {


      //}

      var elementsX = elements.items.push(option);
      setAttributes({ elements: { items: elements.items } });

    }





    function generatehtml() {




      var nameHtml = (postAuthor.name != undefined) ? `<span className='prefix'>${name.options.prefix}</span>${postAuthor.name}<span className='postfix'>${name.options.postfix}</span>` : 'Author Name 1';

      if (name.options.linkTo == 'postUrl') {

        nameHtml = `<span className='prefix'>${name.options.prefix}</span><a href="${currentPostUrl}">${(postAuthor.name != undefined) ? postAuthor.name : 'Author Name'}</a><span className='postfix'>${name.options.postfix}</span>`

      }

      if (name.options.linkTo == 'authorUrl') {

        nameHtml = `<span className='prefix'>${name.options.prefix}</span><a href="${postAuthor.url}">${(postAuthor.name != undefined) ? postAuthor.name : 'Author Name'}</a><span className='postfix'>${name.options.postfix}</span>`

      }

      if (name.options.linkTo == 'authorLink') {

        nameHtml = `<span className='prefix'>${name.options.prefix}</span><a href="${postAuthor.link}">${(postAuthor.name != undefined) ? postAuthor.name : 'Author Name'}</a><span className='postfix'>${name.options.postfix}</span>`

      }

      if (name.options.linkTo == 'authorMeta') {

        nameHtml = `<span className='prefix'>${name.options.prefix}</span><a href="${postAuthor.link}">${(postAuthor.name != undefined) ? postAuthor.name : 'Author Name'}</a><span className='postfix'>${name.options.postfix}</span>`

      }



      if (name.options.linkTo == 'customUrl') {

        nameHtml = `<span className='prefix'>${name.options.prefix}</span><a href="${name.options.customUrl}">${(postAuthor.name != undefined) ? postAuthor.name : 'Author Name'}</a><span className='postfix'>${name.options.postfix}</span>`

      }




      html.name = <RawHTML class={name.options.class}>{nameHtml}</RawHTML>


      html.description = <RawHTML class={description.options.class}>{(postAuthor.description != undefined) ? postAuthor.description : 'Author description'}</RawHTML>;





      if (postAuthor.avatar_urls != undefined) {
        var avatarHtml = `<img alt='' src=${(postAuthor.avatar_urls != undefined) ? postAuthor.avatar_urls[avatar.options.size] : ''} />`


        html.avatar = <RawHTML class={avatar.options.class}>{avatarHtml} </RawHTML>

      }




      setTimeout(x => {
        setHtml(html);
      }, 100)

    }



    useEffect(() => {


      setTimeout(() => {
        generatehtml();
      }, 1000);


    }, [postAuthor]);


    useEffect(() => {



      generatehtml();

    }, [name]);



    useEffect(() => {

      generatehtml()

    }, [description]);

    useEffect(() => {

      generatehtml()



    }, [avatar]);











    var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }





    function onChangeStyleWrapper(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, wrapper);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ wrapper: object });




      var elementSelector = myStore.getElementSelector(sudoScource, wrapperSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });

      // var path = sudoScource + '.' + attr + '.' + breakPointX
      // let obj = Object.assign({}, wrapper);
      // const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      // setAttributes({ wrapper: updatedObj });
      // var sudoScourceX = { ...updatedObj[sudoScource] }


      // var elementSelector = myStore.getElementSelector(sudoScource, wrapperSelector);


      // sudoScourceX[attr][breakPointX] = newVal;

      // if (blockCssY.items[elementSelector] == undefined) {
      //   blockCssY.items[elementSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {
      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[elementSelector][argAttr] = argAttrVal;
      // })

      // setAttributes({ blockCssY: { items: blockCssY.items } });
    }






    function onRemoveStyleWrapper(sudoScource, key) {

      var object = myStore.deletePropertyDeep(wrapper, [sudoScource, key, breakPointX]);
      setAttributes({ wrapper: object });


      var elementSelector = myStore.getElementSelector(sudoScource, wrapperSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });


      // var sudoScourceX = { ...wrapper[sudoScource] }
      // if (sudoScourceX[key] != undefined) {
      //   delete sudoScourceX[key];
      // }

      // wrapper[sudoScource] = sudoScourceX;
      // setAttributes({ wrapper: { ...wrapper } });

      // if (blockCssY.items[wrapperSelector] == undefined) {
      //   blockCssY.items[wrapperSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {
      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[wrapperSelector][argAttr] = argAttrVal;
      // })

      // if (blockCssY.items[wrapperSelector][key] != undefined) {
      //   delete blockCssY.items[wrapperSelector][key];
      // }


      // setAttributes({ blockCssY: { items: blockCssY.items } });
    }





    function onAddStyleWrapper(sudoScource, key) {
      // var sudoScourceX = { ...wrapper[sudoScource] }
      // sudoScourceX[key] = {};
      // wrapper[sudoScource] = sudoScourceX;
      // setAttributes({ wrapper: { ...wrapper } });



      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, wrapper);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ wrapper: object });


    }







    function onChangeStyleElements(sudoScource, newVal, attr) {

      var path = sudoScource + '.' + attr + '.' + breakPointX
      let obj = Object.assign({}, elements);
      const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      setAttributes({ elements: updatedObj });
      var sudoScourceX = { ...updatedObj[sudoScource] }




      var elementSelector = redmoreSelector;
      var elementSelector = myStore.getElementSelector(sudoScource, redmoreSelector);


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






    function onRemoveStyleElements(sudoScource, key) {

      var object = myStore.deletePropertyDeep(elements, [sudoScource, key, breakPointX]);
      setAttributes({ elements: object });

      var elementSelectorX = myStore.getElementSelector(sudoScource, elementSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelectorX, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });



      // var sudoScourceX = { ...elements[sudoScource] }
      // if (sudoScourceX[key] != undefined) {
      //   delete sudoScourceX[key];
      // }

      // elements[sudoScource] = sudoScourceX;
      // setAttributes({ elements: { ...elements } });

      // if (blockCssY.items[redmoreSelector] == undefined) {
      //   blockCssY.items[redmoreSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {
      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[redmoreSelector][argAttr] = argAttrVal;
      // })

      // if (blockCssY.items[redmoreSelector][key] != undefined) {
      //   delete blockCssY.items[redmoreSelector][key];
      // }


      // setAttributes({ blockCssY: { items: blockCssY.items } });
    }





    function onAddStyleElements(sudoScource, key) {
      // var sudoScourceX = { ...elements[sudoScource] }
      // sudoScourceX[key] = {};
      // elements[sudoScource] = sudoScourceX;
      // setAttributes({ elements: { ...elements } });




      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, elements);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ elements: object });


    }






    function onChangeStyleAvatar(sudoScource, newVal, attr) {


      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, avatar);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ avatar: object });

      var elementSelector = myStore.getElementSelector(sudoScource, avatarSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });



      // var path = sudoScource + '.' + attr + '.' + breakPointX
      // let obj = Object.assign({}, avatar);
      // const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      // setAttributes({ avatar: updatedObj });
      // var sudoScourceX = { ...updatedObj[sudoScource] }




      // var elementSelector = myStore.getElementSelector(sudoScource, avatarSelector);


      // sudoScourceX[attr][breakPointX] = newVal;

      // if (blockCssY.items[elementSelector] == undefined) {
      //   blockCssY.items[elementSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {
      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[elementSelector][argAttr] = argAttrVal;
      // })

      // setAttributes({ blockCssY: { items: blockCssY.items } });
    }






    function onRemoveStyleAvatar(sudoScource, key) {

      var object = myStore.deletePropertyDeep(avatar, [sudoScource, key, breakPointX]);
      setAttributes({ avatar: object });

      var elementSelector = myStore.getElementSelector(sudoScource, avatarSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });




      // var sudoScourceX = { ...avatar[sudoScource] }
      // if (sudoScourceX[key] != undefined) {
      //   delete sudoScourceX[key];
      // }

      // avatar[sudoScource] = sudoScourceX;
      // setAttributes({ avatar: { ...avatar } });

      // if (blockCssY.items[avatarSelector] == undefined) {
      //   blockCssY.items[avatarSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {
      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[avatarSelector][argAttr] = argAttrVal;
      // })

      // if (blockCssY.items[avatarSelector][key] != undefined) {
      //   delete blockCssY.items[avatarSelector][key];
      // }


      // setAttributes({ blockCssY: { items: blockCssY.items } });
    }


    function onAddStyleAvatar(sudoScource, key) {
      // var sudoScourceX = { ...avatar[sudoScource] }
      // sudoScourceX[key] = {};
      // avatar[sudoScource] = sudoScourceX;
      // setAttributes({ avatar: { ...avatar } });


      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, avatar);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ avatar: object });


    }




    function onChangeStyleName(sudoScource, newVal, attr) {

      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, name);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ name: object });

      var elementSelector = myStore.getElementSelector(sudoScource, nameSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });


      // var path = sudoScource + '.' + attr + '.' + breakPointX
      // let obj = Object.assign({}, name);
      // const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      // setAttributes({ name: updatedObj });
      // var sudoScourceX = { ...updatedObj[sudoScource] }




      // var sudoScourceX = { ...name[sudoScource] }
      // var elementSelector = myStore.getElementSelector(sudoScource, nameSelector);


      // sudoScourceX[attr][breakPointX] = newVal;

      // if (blockCssY.items[elementSelector] == undefined) {
      //   blockCssY.items[elementSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {
      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[elementSelector][argAttr] = argAttrVal;
      // })

      // setAttributes({ blockCssY: { items: blockCssY.items } });
    }






    function onRemoveStyleName(sudoScource, key) {

      var object = myStore.deletePropertyDeep(name, [sudoScource, key, breakPointX]);
      setAttributes({ name: object });

      var elementSelector = myStore.getElementSelector(sudoScource, nameSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });





      // var sudoScourceX = { ...name[sudoScource] }
      // if (sudoScourceX[key] != undefined) {
      //   delete sudoScourceX[key];
      // }

      // name[sudoScource] = sudoScourceX;
      // setAttributes({ name: { ...name } });

      // if (blockCssY.items[nameSelector] == undefined) {
      //   blockCssY.items[nameSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {
      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[nameSelector][argAttr] = argAttrVal;
      // })

      // if (blockCssY.items[nameSelector][key] != undefined) {
      //   delete blockCssY.items[nameSelector][key];
      // }


      // setAttributes({ blockCssY: { items: blockCssY.items } });
    }


    function onAddStyleName(sudoScource, key) {
      // var sudoScourceX = { ...name[sudoScource] }
      // sudoScourceX[key] = {};
      // name[sudoScource] = sudoScourceX;
      // setAttributes({ name: { ...name } });

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, name);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ name: object });


    }





    function onChangeStyleDescription(sudoScource, newVal, attr) {


      var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, description);
      const object = myStore.updatePropertyDeep(obj, path, newVal)

      setAttributes({ description: object });

      var elementSelector = myStore.getElementSelector(sudoScource, descriptionSelector);
      var cssPropty = myStore.cssAttrParse(attr);

      if (blockCssY.items[elementSelector] == undefined) {
        blockCssY.items[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX]
      const cssItems = myStore.updatePropertyDeep(blockCssY.items, cssPath, newVal)

      setAttributes({ blockCssY: { items: cssItems } });




      // var path = sudoScource + '.' + attr + '.' + breakPointX
      // let obj = Object.assign({}, description);
      // const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
      // setAttributes({ description: updatedObj });
      // var sudoScourceX = { ...updatedObj[sudoScource] }



      // var elementSelector = myStore.getElementSelector(sudoScource, descriptionSelector);


      // sudoScourceX[attr][breakPointX] = newVal;

      // if (blockCssY.items[elementSelector] == undefined) {
      //   blockCssY.items[elementSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {
      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[elementSelector][argAttr] = argAttrVal;
      // })

      // setAttributes({ blockCssY: { items: blockCssY.items } });
    }






    function onRemoveStyleDescription(sudoScource, key) {


      var object = myStore.deletePropertyDeep(description, [sudoScource, key, breakPointX]);
      setAttributes({ description: object });

      var elementSelector = myStore.getElementSelector(sudoScource, descriptionSelector);
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
      setAttributes({ blockCssY: { items: cssObject } });





      // var sudoScourceX = { ...description[sudoScource] }
      // if (sudoScourceX[key] != undefined) {
      //   delete sudoScourceX[key];
      // }

      // description[sudoScource] = sudoScourceX;
      // setAttributes({ description: { ...description } });

      // if (blockCssY.items[descriptionSelector] == undefined) {
      //   blockCssY.items[descriptionSelector] = {};
      // }

      // Object.entries(sudoScourceX).map(args => {
      //   var argAttr = myStore.cssAttrParse(args[0]);
      //   var argAttrVal = args[1];
      //   blockCssY.items[descriptionSelector][argAttr] = argAttrVal;
      // })

      // if (blockCssY.items[descriptionSelector][key] != undefined) {
      //   delete blockCssY.items[descriptionSelector][key];
      // }


      // setAttributes({ blockCssY: { items: blockCssY.items } });
    }


    function onAddStyleDescription(sudoScource, key) {
      // var sudoScourceX = { ...description[sudoScource] }
      // sudoScourceX[key] = {};
      // description[sudoScource] = sudoScourceX;
      // setAttributes({ description: { ...description } });

      var path = [sudoScource, key, breakPointX]
      let obj = Object.assign({}, description);
      const object = myStore.addPropertyDeep(obj, path, '')
      setAttributes({ description: object });


    }












    var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.



    useEffect(() => {

      //generateBlockCssY()
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);







    useEffect(() => {
      linkAttrObj();





    }, [linkAttr]);





    var linkAttrObj = () => {

      var sdsd = {};

      linkAttr.map(x => {

        if (x.val)
          sdsd[x.id] = x.val;

      })

      setlinkAttrItems(sdsd);
      //return sdsd;

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



    //const [blockCss, setBlockCss] = useState({ items: {} });

    const [setSome, setSomeState] = useState({});
    const [stateX, setStateX] = useState('Old Value');







    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType,

    } = wp.data.dispatch('core/edit-post')





    const CustomTag = `${wrapper.tag}`;




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




                <PanelBody title="Elements" initialOpen={true}>


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
                      <PGStyles obj={elements} onChange={onChangeStyleElements} onAdd={onAddStyleElements} onRemove={onRemoveStyleElements} />
                    </PGtab>
                  </PGtabs>




                  <PanelRow>
                    <label for="">Add User Field</label>
                    <PGDropdown position="bottom right" variant="secondary" options={userFields} buttonTitle="Choose" onChange={setUserField} values=""></PGDropdown>

                  </PanelRow>


                  <ReactSortable list={elements.items} setList={(item) => {


                    setAttributes({ elements: { items: item } });


                  }}>
                    {elements.items.map((item, index) => (
                      <div key={item.id} className="flex items-center">


                        <Button onClick={
                          ev => {
                            var elementsX = elements.items.splice(index, 1);


                            setAttributes({ elements: { items: elements.items } });

                          }}
                        >


                          <Icon icon={close} /></Button>

                        <span className='cursor-move'>{item.label}</span>



                      </div>
                    ))}
                  </ReactSortable>







                </PanelBody>
                {elements.items.find(x => x.label === 'Avatar') && (
                  <PanelBody title="Avatar" initialOpen={false}>


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
                          <label for="">Avatar Size</label>

                          <SelectControl
                            label=""
                            value={avatar.options.size}
                            options={[
                              { label: 'Select..', value: '' },

                              { label: '24', value: '24' },
                              { label: '48', value: '48' },
                              { label: '96', value: '96' },



                            ]}
                            onChange={(newVal) => {



                              var options = { ...avatar.options, size: newVal };
                              setAttributes({ avatar: { ...avatar, options: options } });



                            }

                            }
                          />
                        </PanelRow>


                        <PanelRow>
                          <label for="">Avatar Class</label>

                          <InputControl
                            value={avatar.options.class}
                            onChange={(newVal) => {


                              var options = { ...avatar.options, class: newVal };
                              setAttributes({ avatar: { ...avatar, options: options } });



                            }}
                          />
                        </PanelRow>

                      </PGtab>
                      <PGtab name="styles">
                        <PGStyles obj={avatar} onChange={onChangeStyleAvatar} onAdd={onAddStyleAvatar} onRemove={onRemoveStyleAvatar} />
                      </PGtab>
                    </PGtabs>




                  </PanelBody>
                )}


                {elements.items.find(x => x.label === 'Name') && (
                  <PanelBody title="Name" initialOpen={false}>



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
                          <label for="">Name Class</label>

                          <InputControl
                            value={name.options.class}
                            onChange={(newVal) => {


                              var options = { ...name.options, class: newVal };
                              setAttributes({ name: { ...name, options: options } });




                            }}
                          />
                        </PanelRow>



                        <PanelRow className='my-3'>
                          <label>Link To</label>
                          <PGDropdown position="bottom right" variant="secondary" buttonTitle={name.options.linkTo.length == 0 ? 'Choose' : linkToArgs[name.options.linkTo].label} options={linkToArgs} onChange={(option, index) => {
                            var options = { ...name.options, linkTo: option.value };
                            setAttributes({ name: { ...name, options: options } });
                          }} values=""></PGDropdown>
                        </PanelRow>






                        {(name.options.linkTo == 'authorMeta' || name.options.linkTo == 'customField') && (

                          <PanelRow>
                            <label for="">
                              {name.options.linkTo == 'authorMeta' && (
                                <>Author Meta Key</>
                              )}
                              {name.options.linkTo == 'customField' && (
                                <>Post Meta Key</>
                              )}

                            </label>

                            <InputControl
                              value={name.options.linkToMeta}
                              onChange={(newVal) => {

                                var options = { ...name.options, linkToMeta: newVal };
                                setAttributes({ name: { ...name, options: options } });

                              }}
                            />

                          </PanelRow>

                        )}





                        {name.options.linkTo == 'customUrl' && (

                          <>



                            <PanelRow>
                              <label for="">Custom Url</label>

                              <div className='relative'>
                                <Button className={(linkPickerPosttitle) ? "!bg-gray-400" : ''} icon={link} onClick={ev => {

                                  setLinkPickerPosttitle(prev => !prev);

                                }}></Button>
                                {name.options.customUrl.length > 0 && (
                                  <Button className='!text-red-500 ml-2' icon={linkOff} onClick={ev => {

                                    var options = { ...name.options, customUrl: '' };
                                    setAttributes({ name: { ...name, options: options } });
                                    setLinkPickerPosttitle(false);



                                  }}></Button>

                                )}
                                {linkPickerPosttitle && (
                                  <Popover position="bottom right">
                                    <LinkControl settings={[]} value={name.options.customUrl} onChange={newVal => {

                                      var options = { ...name.options, customUrl: newVal.url };

                                      setAttributes({ name: { ...name, options: options } });

                                    }} />

                                    <div className='p-2'><span className='font-bold'>Linked to:</span> {(name.options.customUrl.length != 0) ? name.options.customUrl : 'No link'} </div>
                                  </Popover>

                                )}


                              </div>
                            </PanelRow>

                          </>





                        )}

                        <PanelRow>
                          <label for="">Prefix</label>
                          <InputControl
                            value={name.options.prefix}
                            onChange={(newVal) => {
                              var options = { ...name.options, prefix: newVal };
                              setAttributes({ name: { ...name, options: options } });
                            }
                            }
                          />
                        </PanelRow>

                        <PanelRow>
                          <label for="">Postfix</label>
                          <InputControl
                            value={name.options.postfix}
                            onChange={(newVal) => {


                              var options = { ...name.options, postfix: newVal };
                              setAttributes({ name: { ...name, options: options } });


                            }}
                          />
                        </PanelRow>

                      </PGtab>
                      <PGtab name="styles">
                        <PGStyles obj={name} onChange={onChangeStyleName} onAdd={onAddStyleName} onRemove={onRemoveStyleName} />
                      </PGtab>
                    </PGtabs>







                  </PanelBody>
                )}






                {elements.items.find(x => x.label === 'Description') && (
                  <PanelBody title="Description" initialOpen={false}>


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
                          <label for="">Description Class</label>

                          <InputControl
                            value={description.options.class}
                            onChange={(newVal) => {

                              var options = { ...description.options, class: newVal };
                              setAttributes({ description: { ...description, options: options } });

                            }}
                          />



                        </PanelRow>
                      </PGtab>
                      <PGtab name="styles">
                        <PGStyles obj={description} onChange={onChangeStyleDescription} onAdd={onAddStyleDescription} onRemove={onRemoveStyleDescription} />
                      </PGtab>
                    </PGtabs>








                  </PanelBody>
                )}







                <PanelBody title="Custom Style" initialOpen={false}>


                  <p>Please use following class selector to apply your custom CSS</p>
                  <div className='my-3'>
                    <p className='font-bold'>Wrapper Selector</p>
                    <p><code>{wrapperSelector}{'{/* your CSS here*/}'}</code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Name Selector</p>
                    <p><code>{nameSelector}{'{}'} </code></p>
                  </div>



                  <div className='my-3'>
                    <p className='font-bold'>Description Selector</p>
                    <p><code>{descriptionSelector}{'{}'} </code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Avatar Selector </p>
                    <p><code>{avatarSelector}{'{}'} </code></p>
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
                <PGContactSupport utm={{ utm_source: 'BlockPostExcerpt', utm_campaign: 'PostGridCombo', utm_content: 'BlockOptions' }} />


              </div>
            </div>






          </InspectorControls >
        </div >
        ,


        <div className={blockId}>


          {elements.items.map(x => {

            return (html[x.id])



          })}
        </div>
      ]

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})