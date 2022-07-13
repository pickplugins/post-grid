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
    postTitle: {
      type: 'object',
      default: { textAlign: '', isLink: true, linkTarget: '', customUrl: '', class: '', color: {}, bgColor: {}, padding: {}, margin: {} },
    },
    elements: {
      "type": "object",
      "default": {
        items: [
          { id: 'avatar', name: "Avatar", active: false, },
          { id: 'name', name: "Name", active: true, },
          { id: 'description', name: "Description", active: false, },
          { id: 'id', name: "ID", active: false, },

        ],
      } // avatar, name, description, id
    },


    avatar: {
      "type": "object",
      "default": { size: '', class: '', padding: '', margin: '', }
    },

    name: {
      "type": "object",
      "default": { class: '', prefix: '', postfix: '', color: {}, bgColor: {}, padding: {}, margin: {} }
    },
    description: {
      "type": "object",
      "default": { class: '', prefix: '', postfix: '', color: {}, bgColor: {}, padding: {}, margin: {} }
    },
    id: {
      "type": "object",
      "default": { class: '', prefix: '', postfix: '', color: {}, bgColor: {}, padding: {}, margin: {} }
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

    var postTitle = attributes.postTitle;
    var wrapper = attributes.wrapper;
    var elements = attributes.elements;
    var avatar = attributes.avatar;
    var description = attributes.description;
    var name = attributes.name;
    var id = attributes.id;


    var linkAttr = attributes.linkAttr;
    var blockCss = attributes.blockCss;
    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    var postId = context['postId'];
    var postType = context['postType'];

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    const [license, setLicense] = useState(myStore.getLicense());
    const [postAuthor, setPostAuthor] = useState(null);

    const [html, setHtml] = useState({});


    const [
      currentPostTitle,
      setCurrentPostTitle,
    ] = useEntityProp('postType', postType, 'author', postId);

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





    useEffect(() => {


      var htmlX = 'hello Name';
      html.name = htmlX
      console.log(html);
      setHtml(html);

    }, [name]);

    useEffect(() => {


      var htmlX = 'hello description';
      html.description = htmlX
      console.log(html);
      setHtml(html);

    }, [description]);

    useEffect(() => {


      var htmlX = 'hello avatar';
      html.avatar = htmlX

      console.log(html);

      setHtml(html);

    }, [avatar]);


    useEffect(() => {


      var htmlX = 'hello id';
      html.id = htmlX

      console.log(html);

      setHtml(html);

    }, [id]);

    //console.log(postTitle);



    // Wrapper CSS Class Selectors
    const titleWrapperSelector = '.pg-postTitle';
    const titleLinkSelector = postTitle.isLink ? '.pg-postTitle a' : '.pg-postTitle';




    var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }


    function paddingControl(nextValues) {


      var responsive = postTitle.padding;
      responsive[breakPointX] = nextValues;

      //console.log(nextValues);

      setAttributes({ postTitle: { textAlign: postTitle.textAlign, class: postTitle.class, color: postTitle.color, bgColor: postTitle.bgColor, padding: responsive, margin: postTitle.margin } });



      blockCssY.items[titleLinkSelector] = (blockCssY.items[titleLinkSelector] != undefined) ? blockCssY.items[titleLinkSelector] : {};



      if (nextValues.top != undefined) {

        var paddingTop = (blockCssY.items[titleLinkSelector]['padding-top'] != undefined) ? blockCssY.items[titleLinkSelector]['padding-top'] : {};
        paddingTop[breakPointX] = nextValues.top


        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'padding-top': paddingTop };

      }


      if (nextValues.right != undefined) {

        var paddingRight = (blockCssY.items[titleLinkSelector]['padding-right'] != undefined) ? blockCssY.items[titleLinkSelector]['padding-right'] : {};
        paddingRight[breakPointX] = nextValues.right


        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'padding-right': paddingRight };



      }

      if (nextValues.bottom != undefined) {

        var paddingBottom = (blockCssY.items[titleLinkSelector]['padding-bottom'] != undefined) ? blockCssY.items[titleLinkSelector]['padding-bottom'] : {};
        paddingBottom[breakPointX] = nextValues.bottom


        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'padding-bottom': paddingBottom };



      }

      if (nextValues.left != undefined) {

        var paddingLeft = (blockCssY.items[titleLinkSelector]['padding-left'] != undefined) ? blockCssY.items[titleLinkSelector]['padding-left'] : {};
        paddingLeft[breakPointX] = nextValues.left

        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'padding-left': paddingLeft };


      }


      setAttributes({ blockCssY: { items: blockCssY.items } });



    }





    function marginControl(nextValues) {

      var responsive = postTitle.margin;
      responsive[breakPointX] = nextValues;


      setAttributes({ postTitle: { textAlign: postTitle.textAlign, class: postTitle.class, color: postTitle.color, bgColor: postTitle.bgColor, padding: postTitle.padding, margin: responsive } });






      blockCssY.items[titleLinkSelector] = (blockCssY.items[titleLinkSelector] != undefined) ? blockCssY.items[titleLinkSelector] : {};

      if (nextValues.top != undefined) {
        var marginTop = (blockCssY.items[titleLinkSelector]['margin-top'] != undefined) ? blockCssY.items[titleLinkSelector]['margin-top'] : {};
        marginTop[breakPointX] = nextValues.top

        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'margin-top': marginTop };
      }


      if (nextValues.right != undefined) {

        var marginRight = (blockCssY.items[titleLinkSelector]['margin-right'] !== undefined) ? blockCssY.items[titleLinkSelector]['margin-right'] : {};
        marginRight[breakPointX] = nextValues.right

        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'margin-right': marginRight };

      }

      if (nextValues.bottom != undefined) {

        var marginBottom = (blockCssY.items[titleLinkSelector]['margin-bottom'] !== undefined) ? blockCssY.items[titleLinkSelector]['margin-bottom'] : {};
        marginBottom[breakPointX] = nextValues.bottom

        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'margin-bottom': marginBottom };

      }

      if (nextValues.left != undefined) {

        var marginLeft = (blockCssY.items[titleLinkSelector]['margin-left'] !== undefined) ? blockCssY.items[titleLinkSelector]['margin-left'] : {};
        marginLeft[breakPointX] = nextValues.left

        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'margin-left': marginLeft };

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
          var divWrap = iframeDocument.getElementById("css-block-postCategories");

          if (divWrap != undefined) {
            iframeDocument.getElementById("css-block-postCategories").outerHTML = "";

          }

          var divWrap = '<div id="css-block-postCategories"></div>';
          body.insertAdjacentHTML('beforeend', divWrap);

          var csswrappg = iframeDocument.getElementById('css-block-postCategories');
          var str = '<style>' + reponsiveCss + '</style>';

          csswrappg.insertAdjacentHTML('beforeend', str);
        }, 200)


      } else {

        var wpfooter = document.getElementById('wpfooter');
        var divWrap = document.getElementById("css-block-postCategories");

        if (divWrap != undefined) {
          document.getElementById("css-block-postCategories").outerHTML = "";
        }

        var divWrap = '<div id="css-block-postCategories"></div>';
        wpfooter.insertAdjacentHTML('beforeend', divWrap);

        var csswrappg = document.getElementById('css-block-postCategories');
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
      console.log('Listening currentPostTitle: ', currentPostTitle);



    }, [currentPostTitle]);



    useEffect(() => {
      ////console.log('Listening linkAttr: ', linkAttr);
      linkAttrObj();





    }, [linkAttr]);





    var linkAttrObj = () => {

      var sdsd = {};

      linkAttr.map(x => {

        if (x.val)
          sdsd[x.id] = x.val;

      })

      ////console.log(sdsd);
      setlinkAttrItems(sdsd);
      //return sdsd;

    }

    ////console.log(breakPointList);
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


    var postUrl = (postTitle.customUrl != undefined && postTitle.customUrl.length > 0) ? postTitle.customUrl : currentPostUrl;

    //console.log('Hello');

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


                  //console.log(x.value);

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
            <AlignmentToolbar
              value={postTitle.textAlign}
              onChange={(nextAlign) => {
                setAttributes({ postTitle: { textAlign: nextAlign, isLink: postTitle.isLink, linkTarget: postTitle.linkTarget, customUrl: postTitle.customUrl, class: postTitle.class, color: postTitle.color, bgColor: postTitle.bgColor, padding: postTitle.padding, margin: postTitle.margin } });
              }}
            />
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

                    console.log(item);

                    setAttributes({ elements: { items: item } });


                  }}>
                    {elements.items.map((item, index) => (
                      <div key={item.id}>

                        <ToggleControl
                          label={item.name}
                          help={''}
                          checked={item.active ? true : false}
                          onChange={(e) => {

                            console.log(item.active);


                            var isActive = elements.items[index].active ? false : true;
                            elements.items[index].active = isActive;
                            console.log(elements.items[index]);

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
                      <label for="">avatar Class</label>

                      <InputControl
                        value={avatar.class}
                        onChange={(newVal) => {

                          setAttributes({ avatar: { class: newVal, size: avatar.size, padding: avatar.padding, margin: avatar.margin } });


                        }}
                      />
                    </PanelRow>

                  </PanelBody>
                )}


                {elements.items.find(x => x.name === 'Name').active && (
                  <PanelBody title="Name" initialOpen={false}>


                    <PanelRow className='my-3'>
                      <label>Color</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                    </PanelRow>

                    <ColorPalette
                      value={postTitle.color[breakPointX]}
                      colors={colors}
                      enableAlpha
                      onChange={(newVal) => {

                        var responsive = postTitle.color;
                        responsive[breakPointX] = newVal;


                        setAttributes({ postTitle: { textAlign: postTitle.textAlign, isLink: postTitle.isLink, class: postTitle.class, color: responsive, bgColor: postTitle.bgColor, padding: postTitle.padding, margin: postTitle.margin } });


                        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'color': responsive };
                        setAttributes({ blockCssY: { items: blockCssY.items } });




                      }}
                    />



                    <PanelRow className='my-3'>
                      <label>Background Color</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                    </PanelRow>

                    <ColorPalette
                      value={postTitle.bgColor[breakPointX]}
                      colors={colors}
                      enableAlpha
                      onChange={(newVal) => {

                        var responsive = postTitle.bgColor;
                        responsive[breakPointX] = newVal;


                        setAttributes({ postTitle: { textAlign: postTitle.textAlign, isLink: postTitle.isLink, class: postTitle.class, color: postTitle.color, bgColor: responsive, padding: postTitle.padding, margin: postTitle.margin } });


                        blockCssY.items[titleLinkSelector] = { ...blockCssY.items[titleLinkSelector], 'background-color': responsive };
                        setAttributes({ blockCssY: { items: blockCssY.items } });




                      }}
                    />









                    <PanelRow>
                      <label>Padding</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                    </PanelRow>
                    <BoxControl
                      label=""
                      values={postTitle.padding[breakPointX]}
                      onChange={(nextValues) => { paddingControl(nextValues) }}
                    />


                    <PanelRow>
                      <label>Margin</label>
                      <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                    </PanelRow>
                    <BoxControl
                      label=""
                      values={postTitle.margin[breakPointX]}
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

                          setAttributes({ description: { class: newVal, postfix: description.postfix, prefix: description.prefix, color: description.color, bgColor: description.bgColor, padding: description.padding, margin: description.margin } });


                        }}
                      />
                    </PanelRow>


                  </PanelBody>
                )}

                {elements.items.find(x => x.name === 'ID').active && (
                  <PanelBody title="ID" initialOpen={false}>


                    <PanelRow>
                      <label for="">Description Class</label>

                      <InputControl
                        value={id.class}
                        onChange={(newVal) => {

                          setAttributes({ id: { class: newVal, postfix: id.postfix, prefix: id.prefix, color: id.color, bgColor: id.bgColor, padding: id.padding, margin: id.margin } });


                        }}
                      />
                    </PanelRow>


                  </PanelBody>
                )}






                <PanelBody title="Custom Style" initialOpen={false}>


                  <p>Please use following class selector to apply your custom CSS</p>
                  <div className='my-3'>
                    <p className='font-bold'>Title Wrapper</p>
                    <p><code>{titleWrapperSelector}{'{/* your CSS here*/}'}</code></p>
                  </div>

                  <div className='my-3'>
                    <p className='font-bold'>Title link</p>
                    <p><code>{titleLinkSelector}{'{}'} </code></p>
                    <p><code>.pg-postCategories a{'{/* your CSS here*/}'}</code></p>
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

                <PanelBody title="ID" initialOpen={false}>



                </PanelBody>
              </div>
            </div>






          </InspectorControls >
        </div >
        ,


        <>

          {JSON.stringify(html)}

          {elements.items.map(x => {

            console.log(x.id);
            console.log(html[x.id]);

            return (
              <div>{x.active ? html[x.id] : ''}</div>

            )

          })}


        </>
      ]

    )
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})