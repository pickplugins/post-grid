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

import { InspectorControls, BlockControls, AlignmentToolbar, RichText } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'

import IconToggle from '../../components/icon-toggle'
import BreakpointToggle from '../../components/breakpoint-toggle'



var myStore = wp.data.select('my-shop');

////console.log(wp.data.select('my-shop').getBreakPoint('food'))




////console.log(wp.data.select('my-shop').setPrice('food', 98))
////console.log()




registerBlockType("post-grid/post-author", {
  title: "Post Author",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#7e70af',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src: <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M10 4.5a1 1 0 11-2 0 1 1 0 012 0zm1.5 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm2.25 7.5v-1A2.75 2.75 0 0011 8.25H7A2.75 2.75 0 004.25 11v1h1.5v-1c0-.69.56-1.25 1.25-1.25h4c.69 0 1.25.56 1.25 1.25v1h1.5zM4 20h9v-1.5H4V20zm16-4H4v-1.5h16V16z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>,
  },


  attributes: {


    wrapper: {
      type: 'object',
      default: { textAlign: '', tag: 'h2', class: '', color: {}, bgColor: {}, padding: {}, margin: {} },
    },

    elements: {
      "type": "object",
      "default": {
        items: [
          { id: 'avatar', name: "Avatar", active: true, },
          { id: 'name', name: "Name", active: true, },
          { id: 'description', name: "Description", active: false, },

        ],
      } // avatar, name, description, id
    },


    avatar: {
      "type": "object",
      "default": { class: 'avatar', size: '48', default: '', display: {}, padding: '', margin: '', }
    },

    name: {
      "type": "object",
      "default": { class: 'name', prefix: '', postfix: '', linkTo: '', display: {}, color: {}, bgColor: {}, padding: {}, margin: {} }
    },
    description: {
      "type": "object",
      "default": { class: 'description', prefix: '', postfix: '', display: {}, color: {}, bgColor: {}, padding: {}, margin: {} }
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

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    const [license, setLicense] = useState(myStore.getLicense());
    const [postAuthor, setPostAuthor] = useState({});

    const [html, setHtml] = useState({});


    const [
      postAuthorId,
      setPostAuthorId,
    ] = useEntityProp('postType', postType, 'author', postId);



    const [
      currentPostUrl,
      setCurrentPostUrl,
    ] = useEntityProp('postType', postType, 'link', postId);



    useEffect(() => {


      apiFetch({
        path: '/wp/v2/users/' + postAuthorId,
        method: 'GET',
      }).then((res) => {


        //console.log(res)
        setPostAuthor(res);

      });

    }, [postAuthorId]);


    function generatehtml() {


      var nameHtml = (postAuthor.name != undefined) ? postAuthor.name : 'Author Name';

      if (name.linkTo == 'postUrl') {

        nameHtml = `<a href="${currentPostUrl}">${(postAuthor.name != undefined) ? postAuthor.name : 'Author Name'}</a>`

      }

      if (name.linkTo == 'authorUrl') {

        nameHtml = `<a href="${postAuthor.url}">${(postAuthor.name != undefined) ? postAuthor.name : 'Author Name'}</a>`

      }

      if (name.linkTo == 'authorLink') {

        nameHtml = `<a href="${postAuthor.link}">${(postAuthor.name != undefined) ? postAuthor.name : 'Author Name'}</a>`

      }

      if (name.linkTo == 'authorMeta') {

        nameHtml = `<a href="${postAuthor.link}">${(postAuthor.name != undefined) ? postAuthor.name : 'Author Name'}</a>`

      }



      if (name.linkTo == 'customUrl') {

        nameHtml = `<a href="${name.customUrl}">${(postAuthor.name != undefined) ? postAuthor.name : 'Author Name'}</a>`

      }










      html.name = <RawHTML class={name.class}>{(nameHtml) ? nameHtml : 'Author Name'}</RawHTML>


      html.description = <RawHTML class={description.class}>{(postAuthor.description != undefined) ? postAuthor.description : 'Author description'}</RawHTML>;





      if (postAuthor.avatar_urls != undefined) {
        var avatarHtml = `<img class='${avatar.class}' alt='' src=${(postAuthor.avatar_urls != undefined) ? postAuthor.avatar_urls[avatar.size] : ''} />`


        html.avatar = <RawHTML class={avatar.class}>{avatarHtml}</RawHTML>

      }


      setHtml(html);

    }


    useEffect(() => {




      generatehtml()



    }, [postAuthor]);



    useEffect(() => {


      generatehtml()

    }, [name]);



    useEffect(() => {

      generatehtml()

    }, [description]);

    useEffect(() => {

      console.log(avatar);


      generatehtml()

      console.log(html);



    }, [avatar]);







    // Wrapper CSS Class Selectors
    const authorWrapperSelector = '.pg-postAuthor';
    const authorNameSelector = '.pg-postAuthor .name';
    const authorDescriptionSelector = '.pg-postAuthor .description';
    const authorAvatarSelector = '.pg-postAuthor .avatar';




    var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }


    function paddingControl(nextValues) {


      var responsive = name.padding;
      responsive[breakPointX] = nextValues;

      //console.log(nextValues);




      setAttributes({ name: { class: name.class, postfix: name.postfix, prefix: name.prefix, linkTo: name.linkTo, linkToMeta: name.linkToMeta, customUrl: name.customUrl, display: name.display, color: name.color, bgColor: name.bgColor, padding: responsive, margin: name.margin } });



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





    function marginControl(nextValues) {

      var responsive = name.margin;
      responsive[breakPointX] = nextValues;





      setAttributes({ name: { class: name.class, postfix: name.postfix, prefix: name.prefix, linkTo: name.linkTo, linkToMeta: name.linkToMeta, customUrl: name.customUrl, display: name.display, color: name.color, bgColor: name.bgColor, padding: name.padding, margin: responsive } });



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





      //console.log(reponsiveCss);


      var iframe = document.querySelectorAll('[name="editor-canvas"]')[0];

      if (iframe) {

        setTimeout(() => {
          var iframeDocument = iframe.contentDocument;
          var body = iframeDocument.body;
          var divWrap = iframeDocument.getElementById("css-block-postAuthor");

          if (divWrap != undefined) {
            iframeDocument.getElementById("css-block-postAuthor").outerHTML = "";

          }

          var divWrap = '<div id="css-block-postAuthor"></div>';
          body.insertAdjacentHTML('beforeend', divWrap);

          var csswrappg = iframeDocument.getElementById('css-block-postAuthor');
          var str = '<style>' + reponsiveCss + '</style>';

          csswrappg.insertAdjacentHTML('beforeend', str);
        }, 200)


      } else {

        var wpfooter = document.getElementById('wpfooter');
        var divWrap = document.getElementById("css-block-postAuthor");

        if (divWrap != undefined) {
          document.getElementById("css-block-postAuthor").outerHTML = "";
        }

        var divWrap = '<div id="css-block-postAuthor"></div>';
        wpfooter.insertAdjacentHTML('beforeend', divWrap);

        var csswrappg = document.getElementById('css-block-postAuthor');
        var str = '<style>' + reponsiveCss + '</style>';
        csswrappg.insertAdjacentHTML('beforeend', str);



      }



    }












    var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.



    useEffect(() => {
      //console.log('Listening blockCss: ', blockCss);

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

    const MyDropdown = () => (

      <div>

        <Dropdown
          position="bottom"
          renderToggle={({ isOpen, onToggle }) => (
            <Button
              title={(breakPoints[breakPointX] != undefined) ? breakPoints[breakPointX].name : ''}
              variant="secondary"
              onClick={onToggle}
              aria-expanded={isOpen}
            >
              <RawHTML className="text-lg ">{(breakPoints[breakPointX] != undefined) ? breakPoints[breakPointX].icon : '<span class="icon-responsive font-bold"></span>'}</RawHTML>


            </Button>
          )}
          renderContent={() => <div>

            {breakPointList.map(x => {


              return (

                <div className={' text-lg font-bold border-b inline-block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {



                  setPreviewDeviceType(x.value)
                  var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value)

                  asdsdsd.then((res) => {

                    setBreakPointX(res.breakpoint);
                    generateBlockCssY();

                  });



                }}>

                  {!x.value && (

                    <div><span class="icon-close"></span></div>

                  )}

                  {x.value && (

                    <RawHTML>{x.icon}</RawHTML>

                  )}

                </div>

              )

            })}
          </div>}
        />
      </div>
    );




    function onChangeBreakPoint(x, index) {


      setPreviewDeviceType(x.value)
      var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value)

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
                      value={wrapper.tag}
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


                        {
                          setAttributes({ wrapper: { textAlign: wrapper.textAlign, tag: newVal, color: wrapper.color, bgColor: wrapper.bgColor, padding: wrapper.padding, margin: wrapper.margin } });
                        }


                      }

                      }
                    />
                  </PanelRow>




                </PanelBody>




                <PanelBody title="Elements" initialOpen={true}>



                  <ReactSortable list={elements.items} setList={(item) => {


                    setAttributes({ elements: { items: item } });


                  }}>
                    {elements.items.map((item, index) => (
                      <div key={item.id}>

                        <ToggleControl
                          label={item.name}
                          help={''}
                          checked={item.active ? true : false}
                          onChange={(e) => {

                            //console.log(item.active);


                            var isActive = elements.items[index].active ? false : true;
                            elements.items[index].active = isActive;
                            //console.log(elements.items[index]);

                            setAttributes({ elements: { items: elements.items } });


                          }}
                        />



                      </div>
                    ))}
                  </ReactSortable>







                </PanelBody>
                {elements.items.find(x => x.name === 'Avatar').active && (
                  <PanelBody title="Avatar" initialOpen={false}>
                    <PanelRow>
                      <label for="">Avatar Size</label>

                      <SelectControl
                        label=""
                        value={avatar.size}
                        options={[
                          { label: 'Select..', value: '' },

                          { label: '24', value: '24' },
                          { label: '48', value: '48' },
                          { label: '96', value: '96' },



                        ]}
                        onChange={(newVal) => {


                          setAttributes({ avatar: { class: avatar.class, size: newVal, default: avatar.default, padding: avatar.padding, margin: avatar.margin } });


                        }

                        }
                      />
                    </PanelRow>


                    <PanelRow>
                      <label for="">Avatar Class</label>

                      <InputControl
                        value={avatar.class}
                        onChange={(newVal) => {

                          setAttributes({ avatar: { class: newVal, size: avatar.size, default: avatar.default, display: avatar.display, padding: avatar.padding, margin: avatar.margin } });


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
                        value={avatar.display[breakPointX]}

                        options={[
                          { label: 'Select..', value: '' },

                          { label: 'inline', value: 'inline' },
                          { label: 'inline-block', value: 'inline-block' },
                          { label: 'block', value: 'block' },



                        ]}
                        onChange={(newVal) => {



                          var responsive = avatar.display;
                          responsive[breakPointX] = newVal;


                          setAttributes({ avatar: { class: avatar.class, size: avatar.size, default: avatar.default, display: responsive, padding: avatar.padding, margin: avatar.margin } });


                          blockCssY.items[authorAvatarSelector] = { ...blockCssY.items[authorAvatarSelector], 'display': responsive };
                          setAttributes({ blockCssY: { items: blockCssY.items } });




                        }

                        }
                      />
                    </PanelRow>



                  </PanelBody>
                )}


                {elements.items.find(x => x.name === 'Name').active && (
                  <PanelBody title="Name" initialOpen={false}>


                    <PanelRow>
                      <label for="">Name Class</label>

                      <InputControl
                        value={name.class}
                        onChange={(newVal) => {

                          setAttributes({ name: { class: newVal, postfix: name.postfix, prefix: name.prefix, linkTo: name.linkTo, linkToMeta: name.linkToMeta, customUrl: name.customUrl, display: name.display, color: name.color, bgColor: name.bgColor, padding: name.padding, margin: name.margin } });


                        }}
                      />
                    </PanelRow>



                    <PanelRow>
                      <label for="">Link To</label>

                      <SelectControl
                        label=""
                        value={name.linkTo}

                        options={[
                          { label: 'Select..', value: '' },

                          { label: 'Post URL', value: 'postUrl' },
                          { label: 'Author URL', value: 'authorUrl' },
                          { label: 'Author Profile', value: 'authorLink' },
                          // { label: 'Author Meta', value: 'authorMeta' },
                          { label: 'Custom URL', value: 'customUrl' },



                        ]}
                        onChange={(newVal) => {


                          setAttributes({ name: { class: name.class, prefix: name.prefix, postfix: name.postfix, linkTo: newVal, linkToMeta: name.linkToMeta, customUrl: name.customUrl, display: name.display, color: name.color, bgColor: name.bgColor, padding: name.padding, margin: name.margin } });


                        }

                        }
                      />

                    </PanelRow>



                    {name.linkTo == 'authorMeta' && (

                      <PanelRow>
                        <label for="">Link Meta Key</label>

                        <InputControl
                          value={name.linkToMeta}
                          onChange={(newVal) => {

                            setAttributes({ name: { class: name.class, postfix: name.postfix, prefix: name.prefix, linkTo: name.linkTo, linkToMeta: newVal, customUrl: name.customUrl, display: name.display, color: name.color, bgColor: name.bgColor, padding: name.padding, margin: name.margin } });


                          }}
                        />

                      </PanelRow>

                    )}



                    {name.linkTo == 'customUrl' && (

                      <PanelRow>
                        <label for="">Custom Url</label>

                        <InputControl
                          value={name.customUrl}
                          onChange={(newVal) => {

                            setAttributes({ name: { class: name.class, postfix: name.postfix, prefix: name.prefix, linkTo: name.linkTo, linkToMeta: name.linkToMeta, customUrl: name.customUrl, customUrl: newVal, display: name.display, color: name.color, bgColor: name.bgColor, padding: name.padding, margin: name.margin } });


                          }}
                        />

                      </PanelRow>

                    )}






                    <PanelRow className='my-3'>
                      <label>Display</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                    </PanelRow>


                    <div className='px-3'>

                      <SelectControl
                        label=""
                        value={name.display[breakPointX]}

                        options={[
                          { label: 'Select..', value: '' },

                          { label: 'inline', value: 'inline' },
                          { label: 'inline-block', value: 'inline-block' },
                          { label: 'block', value: 'block' },



                        ]}
                        onChange={(newVal) => {



                          var responsive = name.display;
                          responsive[breakPointX] = newVal;





                          setAttributes({ name: { class: name.class, prefix: name.prefix, postfix: name.postfix, linkTo: name.linkTo, linkToMeta: name.linkToMeta, customUrl: name.customUrl, display: responsive, color: name.color, bgColor: name.bgColor, padding: name.padding, margin: name.margin } });


                          blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector], 'display': responsive };
                          setAttributes({ blockCssY: { items: blockCssY.items } });




                        }

                        }
                      />
                    </div>



                    <PanelRow className='my-3'>
                      <label>Color</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                    </PanelRow>

                    <ColorPalette
                      value={name.color[breakPointX]}
                      colors={colors}
                      enableAlpha
                      onChange={(newVal) => {

                        var responsive = name.color;
                        responsive[breakPointX] = newVal;




                        setAttributes({ name: { class: name.class, prefix: name.prefix, postfix: name.postfix, linkTo: name.linkTo, linkToMeta: name.linkToMeta, customUrl: name.customUrl, display: name.display, color: responsive, bgColor: name.bgColor, padding: name.padding, margin: name.margin } });


                        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector], 'color': responsive };
                        setAttributes({ blockCssY: { items: blockCssY.items } });




                      }}
                    />



                    <PanelRow className='my-3'>
                      <label>Background Color</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                    </PanelRow>

                    <ColorPalette
                      value={name.bgColor[breakPointX]}
                      colors={colors}
                      enableAlpha
                      onChange={(newVal) => {

                        var responsive = name.bgColor;
                        responsive[breakPointX] = newVal;



                        setAttributes({ name: { class: name.class, prefix: name.prefix, postfix: name.postfix, linkTo: name.linkTo, linkToMeta: name.linkToMeta, customUrl: name.customUrl, display: name.display, color: name.color, bgColor: responsive, padding: name.padding, margin: name.margin } });


                        blockCssY.items[authorNameSelector] = { ...blockCssY.items[authorNameSelector], 'background-color': responsive };
                        setAttributes({ blockCssY: { items: blockCssY.items } });




                      }}
                    />









                    <PanelRow>
                      <label>Padding</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                    </PanelRow>
                    <BoxControl
                      label=""
                      values={name.padding[breakPointX]}
                      onChange={(nextValues) => { paddingControl(nextValues) }}
                    />


                    <PanelRow>
                      <label>Margin</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                    </PanelRow>
                    <BoxControl
                      label=""
                      values={name.margin[breakPointX]}
                      onChange={(nextValues) => { marginControl(nextValues) }}
                    />
                  </PanelBody>
                )}






                {elements.items.find(x => x.name === 'Description').active && (
                  <PanelBody title="Description" initialOpen={false}>

                    <PanelRow>
                      <label for="">Description Class</label>

                      <InputControl
                        value={description.class}
                        onChange={(newVal) => {

                          setAttributes({ description: { class: newVal, postfix: description.postfix, prefix: description.prefix, display: name.display, color: description.color, bgColor: description.bgColor, padding: description.padding, margin: description.margin } });


                        }}
                      />
                    </PanelRow>


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


              </div>
            </div>






          </InspectorControls >
        </div >
        ,


        <div className='pg-postAuthor'>



          {elements.items.map(x => {

            //console.log('ID: ' + x.id);
            //console.log(html[x.id]);

            return (x.active && (
              (
                html[x.id]

              )

            ))



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