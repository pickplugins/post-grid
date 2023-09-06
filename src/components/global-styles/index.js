

const { Component } = wp.element;
import { Button, Dropdown, } from '@wordpress/components'
import { Icon, styles, settings, link, linkOff, close } from "@wordpress/icons";
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'

import { __experimentalInputControl as InputControl, Spinner, PanelBody, PanelRow, ColorPalette, RangeControl, TextareaControl } from '@wordpress/components';
import PGStyles from '../../components/styles'

var myStore = wp.data.select('postgrid-shop');



function Html(props) {
  if (!props.warn) {
    return null;
  }

  const [isLoading, setisLoading] = useState(false);
  const [globalCssObj, setglobalCssObj] = useState({});
  var [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());


  //var [debounce, setDebounce] = useState(null); // Using the hook.
  //var [keyframesX, setkeyframesX] = useState(props.keyframes); // Using the hook.

  useEffect(() => {



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




    myStore.generateBlockCss(cssObj, 'global-css', '')

  }, [globalCssObj]);



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


class PGGlobalStyles extends Component {

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


export default PGGlobalStyles;