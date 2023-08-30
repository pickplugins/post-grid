

const { Component } = wp.element;
import { Button, Dropdown, } from '@wordpress/components'
import { Icon, styles, settings, link, linkOff, close, edit, pen } from "@wordpress/icons";
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'

import { __experimentalInputControl as InputControl, Popover, Spinner, PanelBody, PanelRow, ColorPalette, RangeControl, TextareaControl } from '@wordpress/components';
import PGStyles from '../../components/styles'

var myStore = wp.data.select('postgrid-shop');



function Html(props) {
  if (!props.warn) {
    return null;
  }
  const pgClipboard = localStorage.getItem("pgClipboard");

  console.log(pgClipboard);


  const [isLoading, setisLoading] = useState(false);
  const [globalCssObj, setglobalCssObj] = useState({});
  var [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());

  const [copyPrams, setCopyPrams] = useState({ isCopied: false, isError: false, errorMessage: '' });
  const [pastePrams, setpastePrams] = useState({ init: false, isPasted: false, isError: false, errorMessage: '' });
  const [resetPrams, setresetPrams] = useState({ isReset: false, isError: false, errorMessage: '' });
  const [clipboard, setclipboard] = useState(pgClipboard == null ? [] : JSON.parse(pgClipboard));


  // var postId = context['postId'];
  // var postType = context['postType'];

  const postType = wp.data.select('core/editor').getCurrentPostType();


  //var [debounce, setDebounce] = useState(null); // Using the hook.
  //var [keyframesX, setkeyframesX] = useState(props.keyframes); // Using the hook.


  // const post = new wp.api.models.Post({ id: 123 });
  // post.fetch().done(() => {
  //   post.setMeta('your_meta_field', 'your_meta_string_content');
  //   post.save().done(() => {
  //     // Any actions to perform after the meta has been saved.
  //   });
  // });

  useEffect(() => {


    console.log(props.args);

    var cssObj = {}


    props.args.map(item => {

      Object.entries(item).map(arg => {


        var sudoSrc = arg[0];
        var sudoArgs = arg[1];
        if (sudoSrc != 'options' && sudoArgs != null) {
          var selector = myStore.getElementSelector(sudoSrc, item.options.selector);
          var elemetnCssObj = myStore.generateElementCss(item, selector);



          Object.entries(arg[1]).map(x => {
            var attr = x[0];
            var cssPropty = myStore.cssAttrParse(attr);

            if (cssObj[selector] == undefined) {
              cssObj[selector] = {};
            }

            if (cssObj[selector][cssPropty] == undefined) {
              cssObj[selector][cssPropty] = {};
            }

            cssObj[selector][cssPropty] = x[1]
          })
        }


      })




      // if (globalCssObj[elementSelector] == undefined) {
      //   globalCssObj[elementSelector] = {};
      // }

      // var cssPath = [elementSelector, cssPropty, breakPointX]
      // const cssObject = myStore.updatePropertyDeep(globalCssObj, cssPath, newVal)

      //setglobalCssObj(cssObject)


    })




    myStore.generateBlockCss(cssObj, 'page-css', '')

  }, [globalCssObj]);

  useEffect(() => {
    console.log('clipboard: ', clipboard);


    localStorage.setItem("pgClipboard", JSON.stringify(clipboard));


  }, [clipboard]);




  function update_post(postData) {


    var postData = JSON.stringify({})





    apiFetch({
      path: '/wp/v2/posts/' + currentPostImageId,
      method: 'POST',
      data: postData,
    }).then((res) => {



    });




  }








  function onChangeStyleItem(sudoScource, newVal, attr, obj, extra) {



    var path = [sudoScource, attr, breakPointX]
    let objX = Object.assign({}, obj);
    const itemX = myStore.updatePropertyDeep(objX, path, newVal)


    props.args[extra.index] = itemX

    props.onChange(props.args);


    var elementSelector = myStore.getElementSelector(sudoScource, obj.options.selector);
    var cssPropty = myStore.cssAttrParse(attr);

    if (globalCssObj[elementSelector] == undefined) {
      globalCssObj[elementSelector] = {};
    }

    var cssPath = [elementSelector, cssPropty, breakPointX]
    const cssObject = myStore.updatePropertyDeep(globalCssObj, cssPath, newVal)

    setglobalCssObj(cssObject)




  }


  function onRemoveStyleItem(sudoScource, key, obj, extra) {

    var itemX = myStore.deletePropertyDeep(obj, [sudoScource, key, breakPointX]);
    props.args[extra.index] = itemX
    props.onChange(props.args);


    var elementSelector = myStore.getElementSelector(sudoScource, obj.options.selector);
    var cssPropty = myStore.cssAttrParse(key);
    var cssObject = myStore.deletePropertyDeep(globalCssObj, [elementSelector, cssPropty, breakPointX]);
    setglobalCssObj(cssObject)



  }



  function onAddStyleItem(sudoScource, key, obj, extra) {

    const itemX = myStore.onAddStyleItem(sudoScource, key, obj)
    props.args[extra.index] = itemX
    props.onChange(props.args);
  }






  return (

    <div className=''>

      <code>
        {JSON.stringify(clipboard)}
      </code>


      <div className='my-3 flex gap-2'>
        <div className='bg-blue-500 inline-block text-white py-1.5 px-3 rounded-sm cursor-pointer'
          onClick={ev => {

            console.log(props.args);


            var styleStr = JSON.stringify(props.args);


            clipboard.push({ content: styleStr, label: Date.now() })
            setclipboard(clipboard);

            localStorage.setItem("pgClipboard", JSON.stringify(clipboard));


            setCopyPrams({ ...copyPrams, isCopied: true })

            setTimeout(() => {
              setCopyPrams({ ...copyPrams, isCopied: false })
            }, 2000)

          }}
        >Copy Styles
          {copyPrams.isCopied && (
            <Popover position="bottom left">
              <div className='px-3 py-2'>Coppied</div>
            </Popover>
          )}



        </div>
        <div className='bg-blue-500 inline-block text-white py-1.5 px-3 rounded-sm cursor-pointer'

        >
          <span onClick={ev => {



            ev.stopPropagation();

            setpastePrams({ ...pastePrams, init: !pastePrams.init })



          }}>
            Paste
          </span>


          {pastePrams.init && (
            <Popover position="bottom left">

              <div className='w-52'>
                {clipboard.map((item, index) => {

                  return (

                    <div className='flex items-center p-2 px-3 hover:bg-blue-200 justify-between'>



                      {(item.edit == null || item.edit == false) && (<span>{item.label}</span>)}
                      {item.edit && (
                        <InputControl
                          className="my-3"

                          placeholder=''
                          value={item.label}

                          onChange={(value) => {

                            var clipboardX = { ...clipboard }

                            clipboardX[index].label = value;

                            setclipboard(clipboardX)

                          }}
                        />

                      )}


                      <span className='hover:bg-blue-500 cursor-pointer hover:text-white py-1 px-1' onClick={ev => {
                        //item.edit = true;
                        var clipboardX = { ...clipboard }
                        console.log(clipboardX);


                        clipboardX[index].edit = !item.edit;

                        setclipboard(clipboardX)
                      }}><Icon icon={edit} /></span>

                      <span className='hover:bg-red-500 cursor-pointer hover:text-white py-1 px-1' onClick={ev => {
                        //item.edit = true;
                        var clipboardX = { ...clipboard }

                        console.log(clipboardX);


                        var clipboardY = Object.entries(clipboardX).splice(index, 1);
                        console.log(clipboardY);

                        setclipboard(clipboardX);

                      }}><Icon icon={close} /></span>


                    </div>

                  )

                })}

              </div>

            </Popover>
          )}



        </div>



      </div>

      {props.args != undefined && props.args.map((item, index) => {

        //var itemIndex = item[0];
        //var itemArgs = item[1];

        var options = item.options;

        return (

          <PanelBody title={options.selector} initialOpen={false}>



            <InputControl
              className="my-3"
              label=""
              help=""
              placeholder='.element-class or #element-id'
              value={options.selector}

              onChange={(value) => {
                // setopenAi({ ...openAi, promt: value })
                //item.options.selector = value



                // props.args[index].options.selector = value


                props.args[index].options.selector = value
                props.onChange(props.args);


              }}
            />

            <PGStyles extra={{ index: index }} obj={item} onChange={onChangeStyleItem} onAdd={onAddStyleItem} onRemove={onRemoveStyleItem} />

          </PanelBody>
        )

      })}



    </div>




  )

}


class PGPageStyles extends Component {

  constructor(props) {
    super(props);
    this.state = { showWarning: true };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }



  render() {

    var {
      args,
      onChange,


    } = this.props;








    return (


      <Html args={args} onChange={onChange} warn={this.state.showWarning} />


    )
  }
}


export default PGPageStyles;