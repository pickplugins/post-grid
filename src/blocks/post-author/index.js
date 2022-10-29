import { registerBlockType } from '@wordpress/blocks'
import apiFetch from '@wordpress/api-fetch';
import { ReactSortable } from "react-sortablejs";

import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { Icon, close } from '@wordpress/icons';

import { InspectorControls, BlockControls, AlignmentToolbar, RichText } from '@wordpress/block-editor'
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


var myStore = wp.data.select('postgrid-shop');

//////console.log(wp.data.select('postgrid-shop').getBreakPoint('food'))




//////console.log(wp.data.select('postgrid-shop').setPrice('food', 98))
//////console.log()




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
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: {},
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
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: {},
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
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: {},
          verticalAlign: {},

          fontSize: {}, //{ val: '18', unit: 'px' }
          lineHeight: {}, // { val: '18', unit: 'px' }
          letterSpacing: {}, // { val: '18', unit: 'px' }
          fontFamily: {},
          fontWeight: {},
          textDecoration: {}, //overline, line-through, underline
          textTransform: {},
        },


      }
    },
    description: {
      "type": "object",
      "default": {

        options: { class: 'description', prefix: '', postfix: '', },
        styles:
        {
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: {},
          verticalAlign: {},
          fontSize: {}, //{ val: '18', unit: 'px' }
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



    var authorWrapperSelector = blockClass;
    // Wrapper CSS Class Selectors
    var authorNameSelector = blockClass + ' .name';
    var authorDescriptionSelector = blockClass + ' .description';
    var authorAvatarSelector = blockClass + ' .avatar';
    var authorAvatarImgSelector = blockClass + ' .avatar img';






    var [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    var [postAuthor, setPostAuthor] = useState({});

    var [html, setHtml] = useState({});
    var [loading, setLoading] = useState(false);


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



      generateBlockCssY();

    }, [clientId]);

    useEffect(() => {


      apiFetch({
        path: '/wp/v2/users/' + postAuthorId,
        method: 'GET',
      }).then((res) => {

        setPostAuthor(res);


      });

    }, [postAuthorId]);




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

      console.log(postAuthor.name);


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

      // console.log(nameHtml);



      setHtml(html);

    }



    useEffect(() => {

      console.log('postAuthor', postAuthor);

      setTimeout(() => {
        generatehtml();
      }, 1000);


    }, [postAuthor]);


    useEffect(() => {


      generatehtml()

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


    function paddingControl(nextValues) {


      var responsive = name.styles.padding;
      responsive[breakPointX] = nextValues;

      ////console.log(nextValues);

      var styles = { ...name.styles, padding: responsive };
      setAttributes({ name: { ...name, styles: styles } });


      blockCssY.items[authorNameSelector] = (blockCssY.items[authorNameSelector] != undefined) ? blockCssY.items[authorNameSelector] : {};



      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[authorNameSelector]['padding-top'] != undefined) ? blockCssY.items[authorNameSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[authorNameSelector]['padding-right'] != undefined) ? blockCssY.items[authorNameSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[authorNameSelector]['padding-bottom'] != undefined) ? blockCssY.items[authorNameSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[authorNameSelector]['padding-left'] != undefined) ? blockCssY.items[authorNameSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });



    }
    function borderRadiusControlAvatar(nextValues) {


      var responsive = avatar.styles.borderRadius;
      responsive[breakPointX] = nextValues;

      console.log(responsive);

      var styles = { ...avatar.styles, borderRadius: responsive };
      setAttributes({ avatar: { ...avatar, styles: styles } });




      blockCssY.items[authorAvatarImgSelector] = (blockCssY.items[authorAvatarImgSelector] != undefined) ? blockCssY.items[authorAvatarImgSelector] : {};



      if (nextValues.top != undefined) {

        var borderRadiusX = (blockCssY.items[authorAvatarImgSelector]['border-radius'] != undefined) ? blockCssY.items[authorAvatarImgSelector]['border-radius'] : {};
        borderRadiusX[breakPointX] = nextValues.top + ' ' + nextValues.right + ' ' + nextValues.bottom + ' ' + nextValues.left


        blockCssY.items[authorAvatarImgSelector] = { ...blockCssY.items[authorAvatarImgSelector], 'border-radius': borderRadiusX };

      }












      setAttributes({ blockCssY: { items: blockCssY.items } });



    }


    function paddingControlAvatar(nextValues) {


      var responsive = avatar.styles.padding;
      responsive[breakPointX] = nextValues;

      ////console.log(nextValues);

      var styles = { ...avatar.styles, padding: responsive };
      setAttributes({ avatar: { ...avatar, styles: styles } });


      blockCssY.items[authorAvatarSelector] = (blockCssY.items[authorAvatarSelector] != undefined) ? blockCssY.items[authorAvatarSelector] : {};



      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[authorAvatarSelector]['padding-top'] != undefined) ? blockCssY.items[authorAvatarSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[authorAvatarSelector] = { ...blockCssY.items[authorAvatarSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[authorAvatarSelector]['padding-right'] != undefined) ? blockCssY.items[authorAvatarSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[authorAvatarSelector] = { ...blockCssY.items[authorAvatarSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[authorAvatarSelector]['padding-bottom'] != undefined) ? blockCssY.items[authorAvatarSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[authorAvatarSelector] = { ...blockCssY.items[authorAvatarSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[authorAvatarSelector]['padding-left'] != undefined) ? blockCssY.items[authorAvatarSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[authorAvatarSelector] = { ...blockCssY.items[authorAvatarSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });



    }





    function paddingControlDescription(nextValues) {


      var responsive = description.styles.padding;
      responsive[breakPointX] = nextValues;

      ////console.log(nextValues);

      var styles = { ...description.styles, padding: responsive };
      setAttributes({ description: { ...description, styles: styles } });


      blockCssY.items[authorDescriptionSelector] = (blockCssY.items[authorDescriptionSelector] != undefined) ? blockCssY.items[authorDescriptionSelector] : {};



      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[authorDescriptionSelector]['padding-top'] != undefined) ? blockCssY.items[authorDescriptionSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[authorDescriptionSelector] = { ...blockCssY.items[authorDescriptionSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[authorDescriptionSelector]['padding-right'] != undefined) ? blockCssY.items[authorDescriptionSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[authorDescriptionSelector] = { ...blockCssY.items[authorDescriptionSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[authorDescriptionSelector]['padding-bottom'] != undefined) ? blockCssY.items[authorDescriptionSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[authorDescriptionSelector] = { ...blockCssY.items[authorDescriptionSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[authorDescriptionSelector]['padding-left'] != undefined) ? blockCssY.items[authorDescriptionSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[authorDescriptionSelector] = { ...blockCssY.items[authorDescriptionSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });



    }



    function marginControlAvatar(nextValues) {

      var responsive = avatar.styles.margin;
      responsive[breakPointX] = nextValues;


      var styles = { ...avatar.styles, padding: responsive };
      setAttributes({ avatar: { ...avatar, styles: styles } });



      blockCssY.items[authorAvatarSelector] = (blockCssY.items[authorAvatarSelector] != undefined) ? blockCssY.items[authorAvatarSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[authorAvatarSelector]['margin-top'] != undefined) ? blockCssY.items[authorAvatarSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[authorAvatarSelector] = { ...blockCssY.items[authorAvatarSelector], 'margin-top': marginTop };
      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[authorAvatarSelector]['margin-right'] !== undefined) ? blockCssY.items[authorAvatarSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[authorAvatarSelector] = { ...blockCssY.items[authorAvatarSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[authorAvatarSelector]['margin-bottom'] !== undefined) ? blockCssY.items[authorAvatarSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[authorAvatarSelector] = { ...blockCssY.items[authorAvatarSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[authorAvatarSelector]['margin-left'] !== undefined) ? blockCssY.items[authorAvatarSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[authorAvatarSelector] = { ...blockCssY.items[authorAvatarSelector], 'margin-left': marginLeft };

      }

      setAttributes({ blockCssY: { items: blockCssY.items } });
    }



    function marginControl(nextValues) {

      var responsive = name.styles.margin;
      responsive[breakPointX] = nextValues;


      var styles = { ...name.styles, padding: responsive };
      setAttributes({ name: { ...name, styles: styles } });



      blockCssY.items[authorNameSelector] = (blockCssY.items[authorNameSelector] != undefined) ? blockCssY.items[authorNameSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[authorNameSelector]['margin-top'] != undefined) ? blockCssY.items[authorNameSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector], 'margin-top': marginTop };
      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[authorNameSelector]['margin-right'] !== undefined) ? blockCssY.items[authorNameSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[authorNameSelector]['margin-bottom'] !== undefined) ? blockCssY.items[authorNameSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[authorNameSelector]['margin-left'] !== undefined) ? blockCssY.items[authorNameSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector], 'margin-left': marginLeft };

      }

      setAttributes({ blockCssY: { items: blockCssY.items } });
    }



    function marginControlDescription(nextValues) {

      var responsive = description.styles.margin;
      responsive[breakPointX] = nextValues;


      var styles = { ...description.styles, padding: responsive };
      setAttributes({ description: { ...description, styles: styles } });



      blockCssY.items[authorDescriptionSelector] = (blockCssY.items[authorDescriptionSelector] != undefined) ? blockCssY.items[authorDescriptionSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[authorDescriptionSelector]['margin-top'] != undefined) ? blockCssY.items[authorDescriptionSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[authorDescriptionSelector] = { ...blockCssY.items[authorDescriptionSelector], 'margin-top': marginTop };
      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[authorDescriptionSelector]['margin-right'] !== undefined) ? blockCssY.items[authorDescriptionSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[authorDescriptionSelector] = { ...blockCssY.items[authorDescriptionSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[authorDescriptionSelector]['margin-bottom'] !== undefined) ? blockCssY.items[authorDescriptionSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[authorDescriptionSelector] = { ...blockCssY.items[authorDescriptionSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[authorDescriptionSelector]['margin-left'] !== undefined) ? blockCssY.items[authorDescriptionSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[authorDescriptionSelector] = { ...blockCssY.items[authorDescriptionSelector], 'margin-left': marginLeft };

      }

      setAttributes({ blockCssY: { items: blockCssY.items } });
    }




    function onChangeTypoName(typoX) {

      setAttributes({ name: { ...name, styles: typoX } });



      if (typoX.fontFamily[breakPointX] != undefined) {

        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector], 'font-family': typoX.fontFamily };

      }


      if (typoX.fontSize[breakPointX] != undefined) {

        var fontSizeVal = (typoX.fontSize[breakPointX].val) ? typoX.fontSize[breakPointX].val : 16;
        var fontSizeUnit = (typoX.fontSize[breakPointX].unit) ? typoX.fontSize[breakPointX].unit : 'px';


        var fontSizeX = (blockCssY.items[authorNameSelector] != undefined) ? blockCssY.items[authorNameSelector]['font-size'] : {};

        fontSizeX[breakPointX] = fontSizeVal + fontSizeUnit;
        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector], 'font-size': fontSizeX };

      }



      if (typoX.lineHeight[breakPointX] != undefined) {

        var lineHeightVal = (typoX.lineHeight[breakPointX].val) ? typoX.lineHeight[breakPointX].val : 0;
        var lineHeightUnit = (typoX.lineHeight[breakPointX].unit) ? typoX.lineHeight[breakPointX].unit : 'px';


        var lineHeightX = (blockCssY.items[authorNameSelector]['line-height'] != undefined) ? blockCssY.items[authorNameSelector]['line-height'] : {};

        lineHeightX[breakPointX] = lineHeightVal + lineHeightUnit;

        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector], 'line-height': lineHeightX };
      }
      if (typoX.letterSpacing[breakPointX] != undefined) {

        var letterSpacingVal = (typoX.letterSpacing[breakPointX].val) ? typoX.letterSpacing[breakPointX].val : 0;
        var letterSpacingUnit = (typoX.letterSpacing[breakPointX].unit) ? typoX.letterSpacing[breakPointX].unit : 'px';



        var letterSpacingX = (blockCssY.items[authorNameSelector]['letter-spacing'] != undefined) ? blockCssY.items[authorNameSelector]['letter-spacing'] : {};

        letterSpacingX[breakPointX] = letterSpacingVal + letterSpacingUnit;

        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector], 'letter-spacing': letterSpacingX };
      }

      if (typoX.fontWeight[breakPointX] != undefined) {

        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector], 'font-weight': typoX.fontWeight };

      }


      if (typoX.textDecoration[breakPointX] != undefined) {

        var str = {};

        var textDecorationX = typoX.textDecoration[breakPointX];
        var textDecorationXStr = (textDecorationX.length > 0) ? textDecorationX.join(' ') : '';

        str[breakPointX] = textDecorationXStr;


        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector], 'text-decoration': str };

      }
      if (typoX.textTransform[breakPointX] != undefined) {

        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector], 'text-transform': typoX.textTransform };


      }

      setAttributes({ blockCssY: { items: blockCssY.items } });



    }
    function onChangeTypoDescription(typoX) {

      setAttributes({ description: { ...description, styles: typoX } });



      if (typoX.fontFamily[breakPointX] != undefined) {

        blockCssY.items[authorDescriptionSelector] = { ...blockCssY.items[authorDescriptionSelector], 'font-family': typoX.fontFamily };

      }


      if (typoX.fontSize[breakPointX] != undefined) {

        var fontSizeVal = (typoX.fontSize[breakPointX].val) ? typoX.fontSize[breakPointX].val : 16;
        var fontSizeUnit = (typoX.fontSize[breakPointX].unit) ? typoX.fontSize[breakPointX].unit : 'px';


        var fontSizeX = (blockCssY.items[authorDescriptionSelector] != undefined) ? blockCssY.items[authorDescriptionSelector]['font-size'] : {};

        fontSizeX[breakPointX] = fontSizeVal + fontSizeUnit;
        blockCssY.items[authorDescriptionSelector] = { ...blockCssY.items[authorDescriptionSelector], 'font-size': fontSizeX };

      }



      if (typoX.lineHeight[breakPointX] != undefined) {

        var lineHeightVal = (typoX.lineHeight[breakPointX].val) ? typoX.lineHeight[breakPointX].val : 0;
        var lineHeightUnit = (typoX.lineHeight[breakPointX].unit) ? typoX.lineHeight[breakPointX].unit : 'px';


        var lineHeightX = (blockCssY.items[authorDescriptionSelector]['line-height'] != undefined) ? blockCssY.items[authorDescriptionSelector]['line-height'] : {};

        lineHeightX[breakPointX] = lineHeightVal + lineHeightUnit;

        blockCssY.items[authorDescriptionSelector] = { ...blockCssY.items[authorDescriptionSelector], 'line-height': lineHeightX };
      }
      if (typoX.letterSpacing[breakPointX] != undefined) {

        var letterSpacingVal = (typoX.letterSpacing[breakPointX].val) ? typoX.letterSpacing[breakPointX].val : 0;
        var letterSpacingUnit = (typoX.letterSpacing[breakPointX].unit) ? typoX.letterSpacing[breakPointX].unit : 'px';



        var letterSpacingX = (blockCssY.items[authorDescriptionSelector]['letter-spacing'] != undefined) ? blockCssY.items[authorDescriptionSelector]['letter-spacing'] : {};

        letterSpacingX[breakPointX] = letterSpacingVal + letterSpacingUnit;

        blockCssY.items[authorDescriptionSelector] = { ...blockCssY.items[authorDescriptionSelector], 'letter-spacing': letterSpacingX };
      }

      if (typoX.fontWeight[breakPointX] != undefined) {

        blockCssY.items[authorDescriptionSelector] = { ...blockCssY.items[authorDescriptionSelector], 'font-weight': typoX.fontWeight };

      }


      if (typoX.textDecoration[breakPointX] != undefined) {

        var str = {};

        var textDecorationX = typoX.textDecoration[breakPointX];
        var textDecorationXStr = (textDecorationX.length > 0) ? textDecorationX.join(' ') : '';

        str[breakPointX] = textDecorationXStr;


        blockCssY.items[authorDescriptionSelector] = { ...blockCssY.items[authorDescriptionSelector], 'text-decoration': str };

      }
      if (typoX.textTransform[breakPointX] != undefined) {

        blockCssY.items[authorDescriptionSelector] = { ...blockCssY.items[authorDescriptionSelector], 'text-transform': typoX.textTransform };


      }

      setAttributes({ blockCssY: { items: blockCssY.items } });



    }

    function generateBlockCssY() {


      var reponsiveCssGroups = {};


      for (var selector in blockCssY.items) {



        var attrs = blockCssY.items[selector];


        for (var attr in attrs) {
          var breakpoints = attrs[attr];

          for (var device in breakpoints) {

            var attrValue = breakpoints[device];

            if (reponsiveCssGroups[device] == undefined) {
              reponsiveCssGroups[device] = []
            }

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



      //return false;


      var reponsiveCssMobile = '';

      if (reponsiveCssGroups['Mobile'] != undefined) {

        reponsiveCssMobile += '@media only screen and (min-width: 0px) and (max-width: 360px){';

        for (var selector in reponsiveCssGroups['Mobile']) {
          var attrs = reponsiveCssGroups['Mobile'][selector];

          reponsiveCssMobile += selector + '{';
          for (var index in attrs) {
            var attr = attrs[index]
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCssMobile += attrName + ':' + attrValue + ';';
          }
          reponsiveCssMobile += '}';
        }
        reponsiveCssMobile += '}';

      }



      var reponsiveCssTablet = '';

      if (reponsiveCssGroups['Tablet'] != undefined) {
        reponsiveCssTablet += '@media only screen and (min-width: 361px) and (max-width: 780px){';

        for (var selector in reponsiveCssGroups['Tablet']) {
          var attrs = reponsiveCssGroups['Tablet'][selector];

          reponsiveCssTablet += selector + '{';
          for (var index in attrs) {
            var attr = attrs[index]
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCssTablet += attrName + ':' + attrValue + ';';
          }
          reponsiveCssTablet += '}';
        }

        reponsiveCssTablet += '}';
      }

      var reponsiveCssDesktop = '';


      if (reponsiveCssGroups['Desktop'] != undefined) {
        reponsiveCssDesktop += '@media only screen and (min-width: 781px){';

        for (var selector in reponsiveCssGroups['Desktop']) {
          var attrs = reponsiveCssGroups['Desktop'][selector];


          reponsiveCssDesktop += selector + '{';
          for (var index in attrs) {
            var attr = attrs[index]
            var attrName = attr.attr;
            var attrValue = attr.val;
            reponsiveCssDesktop += attrName + ':' + attrValue + ';';
          }
          reponsiveCssDesktop += '}';


        }
        reponsiveCssDesktop += '}';



      }


      var reponsiveCss = reponsiveCssMobile + reponsiveCssTablet + reponsiveCssDesktop;



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

        csswrappg.insertAdjacentHTML('beforeend', str);



      }



    }













    var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.



    useEffect(() => {

      generateBlockCssY()

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
        generateBlockCssY();

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

                  <PanelRow>
                    <label>Display</label>
                    <PGcssDisplay val={wrapper.styles.display[breakPointX]} onChange={(newVal => {


                      var newValuesObj = {};

                      if (Object.keys(wrapper.styles.display).length == 0) {
                        newValuesObj[breakPointX] = newVal;
                      } else {
                        newValuesObj = wrapper.styles.display;
                        newValuesObj[breakPointX] = newVal;
                      }

                      var styles = { ...wrapper.styles, display: newValuesObj };
                      setAttributes({ wrapper: { ...wrapper, styles: styles } });

                      blockCssY.items[authorWrapperSelector] = { ...blockCssY.items[authorWrapperSelector], 'display': newValuesObj };
                      setAttributes({ blockCssY: { items: blockCssY.items } });

                    })} />
                  </PanelRow>


                </PanelBody>




                <PanelBody title="Elements" initialOpen={true}>


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


                    <PanelRow className='my-3'>
                      <label>Display</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                    </PanelRow>


                    <PanelRow>

                      <SelectControl
                        label=""
                        value={avatar.styles.display[breakPointX]}

                        options={[
                          { label: 'Select..', value: '' },

                          { label: 'inline', value: 'inline' },
                          { label: 'inline-block', value: 'inline-block' },
                          { label: 'block', value: 'block' },



                        ]}
                        onChange={(newVal) => {



                          var newValuesObj = {};

                          if (Object.keys(avatar.styles.display).length == 0) {
                            newValuesObj[breakPointX] = newVal;
                          } else {
                            newValuesObj = avatar.styles.display;
                            newValuesObj[breakPointX] = newVal;
                          }

                          var styles = { ...avatar.styles, display: newValuesObj };
                          setAttributes({ avatar: { ...avatar, styles: styles } });

                          blockCssY.items[authorAvatarSelector] = { ...blockCssY.items[authorAvatarSelector], 'display': newValuesObj };
                          setAttributes({ blockCssY: { items: blockCssY.items } });



                        }

                        }
                      />
                    </PanelRow>



                    <PanelRow className='my-3'>
                      <label>Vertical Align</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                    </PanelRow>


                    <PanelRow>

                      <SelectControl
                        label=""
                        value={avatar.styles.verticalAlign[breakPointX]}

                        options={[
                          { label: 'Select..', value: '' },

                          { label: 'Baseline', value: 'baseline' },
                          { label: 'Text-top', value: 'text-top' },
                          { label: 'Text-bottom', value: 'text-bottom' },
                          { label: 'Middle', value: 'middle' },
                          { label: 'Bottom', value: 'bottom' },



                        ]}
                        onChange={(newVal) => {

                          var newValuesObj = {};

                          if (Object.keys(avatar.styles.verticalAlign).length == 0) {
                            newValuesObj[breakPointX] = newVal;
                          } else {
                            newValuesObj = avatar.styles.verticalAlign;
                            newValuesObj[breakPointX] = newVal;
                          }

                          var styles = { ...avatar.styles, verticalAlign: newValuesObj };
                          setAttributes({ avatar: { ...avatar, styles: styles } });

                          blockCssY.items[authorAvatarSelector] = { ...blockCssY.items[authorAvatarSelector], 'vertical-align': newValuesObj };
                          setAttributes({ blockCssY: { items: blockCssY.items } });

                        }

                        }
                      />
                    </PanelRow>




                    <PanelRow>
                      <label>Border Radius</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                    </PanelRow>
                    <BoxControl
                      label=""
                      values={avatar.styles.borderRadius[breakPointX]}
                      onChange={(nextValues) => { borderRadiusControlAvatar(nextValues) }}
                    />


                    <PanelRow>
                      <label>Padding</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                    </PanelRow>
                    <BoxControl
                      label=""
                      values={avatar.styles.padding[breakPointX]}
                      onChange={(nextValues) => { paddingControlAvatar(nextValues) }}
                    />


                    <PanelRow>
                      <label>Margin</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                    </PanelRow>
                    <BoxControl
                      label=""
                      values={avatar.styles.margin[breakPointX]}
                      onChange={(nextValues) => { marginControlAvatar(nextValues) }}
                    />

                  </PanelBody>
                )}


                {elements.items.find(x => x.label === 'Name') && (
                  <PanelBody title="Name" initialOpen={false}>


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



                    <PanelRow>
                      <label for="">Link To</label>

                      <SelectControl
                        label=""
                        value={name.options.linkTo}

                        options={[
                          { label: 'Select..', value: '' },

                          { label: 'Post URL', value: 'postUrl' },
                          { label: 'Home URL', value: 'homeUrl' },
                          { label: 'Author URL', value: 'authorUrl' },
                          { label: 'Author Link', value: 'authorLink' },
                          { label: 'Author Meta', value: 'authorMeta' },
                          { label: 'Custom URL', value: 'customUrl' },

                        ]}
                        onChange={(newVal) => {

                          var options = { ...name.options, linkTo: newVal };
                          setAttributes({ name: { ...name, options: options } });





                        }

                        }
                      />

                    </PanelRow>



                    {name.options.linkTo == 'authorMeta' && (

                      <PanelRow>
                        <label for="">Link Meta Key</label>

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

                      <PanelRow>
                        <label for="">Custom Url</label>

                        <InputControl
                          value={name.options.customUrl}
                          onChange={(newVal) => {


                            var options = { ...name.options, customUrl: newVal };
                            setAttributes({ name: { ...name, options: options } });



                          }}
                        />

                      </PanelRow>

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


                    <PanelRow className='my-3'>
                      <label>Display</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                    </PanelRow>


                    <div className='px-3'>

                      <SelectControl
                        label=""
                        value={name.styles.display[breakPointX]}

                        options={[
                          { label: 'Select..', value: '' },

                          { label: 'inline', value: 'inline' },
                          { label: 'inline-block', value: 'inline-block' },
                          { label: 'block', value: 'block' },



                        ]}
                        onChange={(newVal) => {


                          var newValuesObj = {};

                          if (Object.keys(name.styles.display).length == 0) {
                            newValuesObj[breakPointX] = newVal;
                          } else {
                            newValuesObj = name.styles.display;
                            newValuesObj[breakPointX] = newVal;
                          }

                          var styles = { ...name.styles, display: newValuesObj };
                          setAttributes({ name: { ...name, styles: styles } });

                          blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector], 'display': newValuesObj };
                          setAttributes({ blockCssY: { items: blockCssY.items } });




                        }

                        }
                      />
                    </div>


                    <PanelRow className='my-3'>
                      <label>Vertical Align</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                    </PanelRow>


                    <PanelRow>

                      <SelectControl
                        label=""
                        value={name.styles.verticalAlign[breakPointX]}

                        options={[
                          { label: 'Select..', value: '' },

                          { label: 'Baseline', value: 'baseline' },
                          { label: 'Text-top', value: 'text-top' },
                          { label: 'Text-bottom', value: 'text-bottom' },
                          { label: 'Middle', value: 'middle' },
                          { label: 'Bottom', value: 'bottom' },



                        ]}
                        onChange={(newVal) => {

                          var newValuesObj = {};

                          if (Object.keys(name.styles.verticalAlign).length == 0) {
                            newValuesObj[breakPointX] = newVal;
                          } else {
                            newValuesObj = name.styles.verticalAlign;
                            newValuesObj[breakPointX] = newVal;
                          }

                          var styles = { ...name.styles, verticalAlign: newValuesObj };
                          setAttributes({ name: { ...name, styles: styles } });

                          blockCssY.items[authorAvatarSelector] = { ...blockCssY.items[authorAvatarSelector], 'vertical-align': newValuesObj };
                          setAttributes({ blockCssY: { items: blockCssY.items } });

                        }

                        }
                      />
                    </PanelRow>


                    <PanelRow className='my-3'>
                      <label>Color</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                    </PanelRow>

                    <ColorPalette
                      value={name.styles.color[breakPointX]}
                      colors={colorsPresets}
                      enableAlpha
                      onChange={(newVal) => {



                        var newValuesObj = {};

                        if (Object.keys(name.styles.color).length == 0) {
                          newValuesObj[breakPointX] = newVal;
                        } else {
                          newValuesObj = name.styles.color;
                          newValuesObj[breakPointX] = newVal;
                        }

                        var styles = { ...name.styles, color: newValuesObj };
                        setAttributes({ name: { ...name, styles: styles } });

                        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector], 'color': newValuesObj };
                        setAttributes({ blockCssY: { items: blockCssY.items } });


                      }}
                    />



                    <PanelRow className='my-3'>
                      <label>Background Color</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                    </PanelRow>

                    <ColorPalette
                      value={name.styles.bgColor[breakPointX]}
                      colors={colorsPresets}
                      enableAlpha
                      onChange={(newVal) => {


                        var newValuesObj = {};

                        if (Object.keys(name.styles.bgColor).length == 0) {
                          newValuesObj[breakPointX] = newVal;
                        } else {
                          newValuesObj = name.styles.bgColor;
                          newValuesObj[breakPointX] = newVal;
                        }

                        var styles = { ...name.styles, bgColor: newValuesObj };
                        setAttributes({ name: { ...name, styles: styles } });

                        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector], 'background-color': newValuesObj };
                        setAttributes({ blockCssY: { items: blockCssY.items } });




                      }}
                    />









                    <PanelRow>
                      <label>Padding</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                    </PanelRow>
                    <BoxControl
                      label=""
                      values={name.styles.padding[breakPointX]}
                      onChange={(nextValues) => { paddingControl(nextValues) }}
                    />


                    <PanelRow>
                      <label>Margin</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                    </PanelRow>
                    <BoxControl
                      label=""
                      values={name.styles.margin[breakPointX]}
                      onChange={(nextValues) => { marginControl(nextValues) }}
                    />

                    <Typography typo={name.styles} breakPointX={breakPointX} onChange={onChangeTypoName} setAttributes={setAttributes} obj={name} />

                  </PanelBody>
                )}






                {elements.items.find(x => x.label === 'Description') && (
                  <PanelBody title="Description" initialOpen={false}>

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



                    <PanelRow className='my-3'>
                      <label>VerticalA lign</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                    </PanelRow>


                    <PanelRow>

                      <SelectControl
                        label=""
                        value={description.styles.verticalAlign[breakPointX]}

                        options={[
                          { label: 'Select..', value: '' },

                          { label: 'Baseline', value: 'baseline' },
                          { label: 'Text-top', value: 'text-top' },
                          { label: 'Text-bottom', value: 'text-bottom' },
                          { label: 'Middle', value: 'middle' },
                          { label: 'Bottom', value: 'bottom' },



                        ]}
                        onChange={(newVal) => {

                          var newValuesObj = {};

                          if (Object.keys(description.styles.verticalAlign).length == 0) {
                            newValuesObj[breakPointX] = newVal;
                          } else {
                            newValuesObj = description.styles.verticalAlign;
                            newValuesObj[breakPointX] = newVal;
                          }

                          var styles = { ...description.styles, verticalAlign: newValuesObj };
                          setAttributes({ description: { ...description, styles: styles } });

                          blockCssY.items[authorAvatarSelector] = { ...blockCssY.items[authorAvatarSelector], 'vertical-align': newValuesObj };
                          setAttributes({ blockCssY: { items: blockCssY.items } });

                        }

                        }
                      />
                    </PanelRow>


                    <PanelRow className='my-3'>
                      <label>Color</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                    </PanelRow>

                    <ColorPalette
                      value={description.styles.color[breakPointX]}
                      colors={colorsPresets}
                      enableAlpha
                      onChange={(newVal) => {



                        var newValuesObj = {};

                        if (Object.keys(description.styles.color).length == 0) {
                          newValuesObj[breakPointX] = newVal;
                        } else {
                          newValuesObj = description.styles.color;
                          newValuesObj[breakPointX] = newVal;
                        }

                        var styles = { ...description.styles, color: newValuesObj };
                        setAttributes({ description: { ...description, styles: styles } });

                        blockCssY.items[authorDescriptionSelector] = { ...blockCssY.items[authorDescriptionSelector], 'color': newValuesObj };
                        setAttributes({ blockCssY: { items: blockCssY.items } });



                      }}
                    />



                    <PanelRow className='my-3'>
                      <label>Background Color</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                    </PanelRow>

                    <ColorPalette
                      value={description.styles.bgColor[breakPointX]}
                      colors={colorsPresets}
                      enableAlpha
                      onChange={(newVal) => {


                        var newValuesObj = {};

                        if (Object.keys(description.styles.bgColor).length == 0) {
                          newValuesObj[breakPointX] = newVal;
                        } else {
                          newValuesObj = description.styles.bgColor;
                          newValuesObj[breakPointX] = newVal;
                        }

                        var styles = { ...description.styles, bgColor: newValuesObj };
                        setAttributes({ description: { ...description, styles: styles } });

                        blockCssY.items[authorDescriptionSelector] = { ...blockCssY.items[authorDescriptionSelector], 'background-color': newValuesObj };
                        setAttributes({ blockCssY: { items: blockCssY.items } });




                      }}
                    />









                    <PanelRow>
                      <label>Padding</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                    </PanelRow>
                    <BoxControl
                      label=""
                      values={description.styles.padding[breakPointX]}
                      onChange={(nextValues) => { paddingControlDescription(nextValues) }}
                    />


                    <PanelRow>
                      <label>Margin</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                    </PanelRow>
                    <BoxControl
                      label=""
                      values={description.styles.margin[breakPointX]}
                      onChange={(nextValues) => { marginControlDescription(nextValues) }}
                    />

                    <Typography typo={description.styles} breakPointX={breakPointX} onChange={onChangeTypoDescription} setAttributes={setAttributes} obj={description} />
                  </PanelBody>
                )}







                <PanelBody title="Custom Style" initialOpen={false}>


                  <p>Please use following class selector to apply your custom CSS</p>
                  <div className='my-3'>
                    <p className='font-bold'>Wrapper Selector</p>
                    <p><code>{authorWrapperSelector}{'{/* your CSS here*/}'}</code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Name Selector</p>
                    <p><code>{authorNameSelector}{'{}'} </code></p>
                  </div>



                  <div className='my-3'>
                    <p className='font-bold'>Description Selector</p>
                    <p><code>{authorDescriptionSelector}{'{}'} </code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Avatar Selector </p>
                    <p><code>{authorAvatarSelector}{'{}'} </code></p>
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