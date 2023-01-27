

const { Component } = wp.element;
import { Button, Dropdown, PanelRow, PanelBody, RangeControl } from '@wordpress/components'
import { useState, useEffect } from '@wordpress/element'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';
import PGDropdown from '../../components/dropdown'
import { Icon, close } from '@wordpress/icons';



function Html(props) {

  if (!props.warn) {
    return null;
  }



  var valParts = (props.val != undefined) ? props.val.split(" ") : [];


  const [valArgs, setvalArgs] = useState([]);





  var propertyArgs = {
    translate: { label: 'translate', id: 'translate', x: '', y: '' },
    translate3d: { label: 'translate3d', id: 'translate3d', x: '', y: '', z: '' },
    translateX: { label: 'translateX', id: 'translateX', val: '0px', unit: 'px' },
    translateY: { label: 'translateY', id: 'translateY', val: '0px', unit: 'px' },
    translateZ: { label: 'translateZ', id: 'translateZ', val: '0px', unit: 'px' },
    scale: { label: 'scale', id: 'scale', x: '', y: '' },
    scale3d: { label: 'scale3d', id: 'scale3d', x: '', y: '', z: '' },
    scaleX: { label: 'scaleX', id: 'scaleX', val: '0px', unit: 'px' },
    scaleY: { label: 'scaleY', id: 'scaleY', val: '0px', unit: 'px' },
    scaleZ: { label: 'scaleZ', id: 'scaleZ', val: '0px', unit: 'px' },
    rotate: { label: 'rotate', id: 'rotate', angle: '0', unit: 'deg' },
    rotate3d: { label: 'rotate3d', id: 'rotate3d', x: '', y: '', z: '', angle: '' },
    rotateX: { label: 'rotateX', id: 'rotateX', val: '0', unit: 'deg' },
    rotateY: { label: 'rotateY', id: 'rotateY', val: '0deg', unit: 'deg' },
    rotateZ: { label: 'rotateZ', id: 'rotateZ', val: '0deg', unit: 'deg' },
    skew: { label: 'skew', id: 'skew', x: '', y: '' },
    skewX: { label: 'skewX', id: 'skewX', val: '0deg', unit: 'deg' },
    skewY: { label: 'skewY', id: 'skewY', val: '0deg', unit: 'deg' },
    perspective: { label: 'perspective', id: 'perspective', val: '' },
    matrix: { label: 'matrix', id: 'matrix', args: [] },
    matrix3d: { label: 'matrix3d', id: 'matrix3d', args: [] },
  };



  useEffect(() => {


    var filtered = valParts.filter(Boolean)


    var res = filtered.map(x => {

      console.log(x);

      if (x.length != 0) {

        var proptyParts = (x != undefined) ? x.split("(") : [];
        console.log(proptyParts);
        var proptyId = proptyParts[0];
        var proptyVal = proptyParts[1].slice(0, -1);

        var obj = { id: proptyId, val: '' };

        if (proptyId == 'translateX'
          || proptyId == 'translateY'
          || proptyId == 'translateZ'
          || proptyId == 'scaleX'
          || proptyId == 'scaleY'
          || proptyId == 'scaleZ'
          || proptyId == 'rotateX'
          || proptyId == 'rotateY'
          || proptyId == 'rotateZ'
          || proptyId == 'skewX'
          || proptyId == 'skewY'

        ) {
          var argVal = proptyVal != undefined ? proptyVal.match(/\d+/g)[0] : 1;
          var argUnit = proptyVal != undefined ? proptyVal.match(/[a-zA-Z%]+/g)[0] : '';

          obj = { id: proptyId, val: argVal, unit: argUnit }
        }


        return obj;
      }
    })

    console.log(res);


    setvalArgs(res);

  }, [props.val]);




  return (

    <div className='mt-4'>
      {JSON.stringify(props.val)}


      <div className='flex mb-3'>

        <PGDropdown position="bottom right" variant="secondary" options={propertyArgs} buttonTitle="Choose"
          onChange={(option, index) => {





            valArgs.push(option);

            var str = '';
            valArgs.map((x, i) => {

              if (x.id == 'translateX'
                || x.id == 'translateY'
                || x.id == 'translateZ'
                || x.id == 'scaleX'
                || x.id == 'scaleY'
                || x.id == 'scaleZ'
                || x.id == 'rotateX'
                || x.id == 'rotateY'
                || x.id == 'rotateZ'
                || x.id == 'skewX'
                || x.id == 'skewY'


              ) {
                str += x.id + '(' + x.val + ') ';
              } else {
                str += x.id + '(2%) ';
              }




            })






            props.onChange(str, 'transform');

          }} ></PGDropdown>




      </div>

      {
        valArgs != undefined && (


          valArgs.map((arg, i) => {



            return (

              <PanelBody title={(arg.id != null && propertyArgs[arg.id] != undefined) ? propertyArgs[arg.id].label : 'property'} initialOpen={false}>

                {JSON.stringify(arg)}


                {/* <PanelRow>
                  <label for="">Duration</label>
                  <InputControl
                    value={arg.duration}
                    type="text"

                    onChange={(newVal) => {
                      valArgs[i].duration = newVal;

                      var str = '';
                      valArgs.map(x => {

                        str += x.property + ' ' + newVal + ' ' + x.timingFunction + ' ' + x.delay;
                        str += ',';
                      })
                      var strX = str.slice(0, -1);
                      props.onChange(strX, 'transition');

                    }}
                  />
                </PanelRow> */}










                <div className='flex'>

                  <span class="hover:bg-red-500 bg-red-400 text-white ml-1 inline-block p-1 cursor-pointer" onClick={ev => {


                    var hellox = valArgs.splice(i, 1);

                    setvalArgs(valArgs);

                    var str = '';
                    valArgs.map(x => {

                      str += x.id + '(2%) ';

                    })
                    props.onChange(str, 'transform');




                  }}><span class="dashicons dashicons-no-alt"></span></span>
                </div>



              </PanelBody>


            )


          }))
      }


    </div >




  )

}

class PGcssTransition extends Component {


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
      val,
      onChange,
    } = this.props;



    return (


      <Html val={val} onChange={onChange} warn={this.state.showWarning} />


    )
  }
}


export default PGcssTransition;