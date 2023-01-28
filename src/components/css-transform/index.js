

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

  console.log(props.val);


  var valParts = (props.val != undefined) ? props.val.split(") ") : [];


  const [valArgs, setvalArgs] = useState([]);





  var propertyArgs = {
    translateX: { label: 'TranslateX', id: 'translateX', val: '0px' },
    translateY: { label: 'TranslateY', id: 'translateY', val: '0px' },
    translateZ: { label: 'TranslateZ', id: 'translateZ', val: '0px' },
    translate: { label: 'Translate', id: 'translate', val: '5px,6px' },
    translate3d: { label: 'Translate3d', id: 'translate3d', val: '0px,0px,0px' },

    scale: { label: 'Scale', id: 'scale', val: '2,3' },
    scale3d: { label: 'Scale3d', id: 'scale3d', val: '1,1,1' },
    scaleX: { label: 'ScaleX', id: 'scaleX', val: '1' },
    scaleY: { label: 'ScaleY', id: 'scaleY', val: '1' },
    scaleZ: { label: 'ScaleZ', id: 'scaleZ', val: '1' },
    rotate: { label: 'Rotate', id: 'rotate', val: '0deg' },
    rotate3d: { label: 'Rotate3d', id: 'rotate3d', val: '1,1,1,0deg' },
    rotateX: { label: 'RotateX', id: 'rotateX', val: '0deg' },
    rotateY: { label: 'RotateY', id: 'rotateY', val: '0deg' },
    rotateZ: { label: 'RotateZ', id: 'rotateZ', val: '0deg' },
    skew: { label: 'Skew', id: 'skew', val: '2deg,3deg' },
    skewX: { label: 'SkewX', id: 'skewX', val: '0deg' },
    skewY: { label: 'SkewY', id: 'skewY', val: '0deg' },
    perspective: { label: 'Perspective', id: 'perspective', val: '0px' },
    matrix: { label: 'Matrix', id: 'matrix', val: '1,1,1,1,1,1' },
    matrix3d: { label: 'Matrix3d', id: 'matrix3d', val: '1,1' },
  };



  useEffect(() => {

    var filtered = valParts.filter(Boolean)
    var res = filtered.map(x => {

      if (x.length != 0) {

        var proptyParts = (x != undefined) ? x.split("(") : [];
        var proptyId = proptyParts[0];
        var proptyVal = proptyParts[1];


        var obj = { id: proptyId, val: proptyVal }


        return obj;
      }
    })



    setvalArgs(res);

  }, [props.val]);


  function RemoveProty({ title, index }) {


    return (
      <div className='flex  items-center '>
        <span class="hover:bg-red-500 hover:text-white mr-1 inline-block p-1 cursor-pointer" onClick={ev => {
          var hellox = valArgs.splice(index, 1);
          setvalArgs(valArgs);
          var str = '';
          valArgs.map(x => {
            str += x.id + '(' + x.val + ') ';
          })
          props.onChange(str, 'transform');
        }}><Icon icon={close} /></span>
        <span>{title}</span>
      </div>
    )

  }

  return (

    <div className='mt-4'>

      <div className='flex mb-3'>

        <PGDropdown position="bottom right" variant="secondary" options={propertyArgs} buttonTitle="Choose"
          onChange={(option, index) => {





            valArgs.push(option);

            var str = '';
            valArgs.map((x, i) => {
              str += x.id + '(' + x.val + ') ';
            })

            props.onChange(str, 'transform');

          }} ></PGDropdown>




      </div>

      {
        valArgs != undefined && (


          valArgs.map((arg, i) => {



            return (

              <PanelBody title={<RemoveProty title={(arg.id != null && propertyArgs[arg.id] != undefined) ? propertyArgs[arg.id].label : 'property'} index={i} />} initialOpen={false}>

                {(arg.id == 'translateX'
                  || arg.id == 'translateY'
                  || arg.id == 'translateZ'
                  || arg.id == 'scaleX'
                  || arg.id == 'scaleY'
                  || arg.id == 'scaleZ'
                  || arg.id == 'rotateX'
                  || arg.id == 'rotateY'
                  || arg.id == 'rotateZ'
                  || arg.id == 'skewX'
                  || arg.id == 'skewY'
                  || arg.id == 'perspective'



                ) && (

                    <>
                      <PanelRow>
                        <label for="">Value</label>
                        <InputControl
                          value={arg.val.match(/\d+/g)[0]}
                          type="number"

                          onChange={(newVal) => {
                            //var argVal = arg.val != undefined ? arg.val.match(/\d+/g)[0] : 1;
                            //var argUnit = arg.val != undefined ? arg.val.match(/[a-zA-Z]+/g)[0] : '';

                            console.log(newVal);
                            //console.log(argUnit);



                            var str = '';
                            valArgs.map((x, j) => {

                              if (arg.id == x.id) {


                                if (
                                  arg.id == 'scaleX'
                                  || arg.id == 'scaleY'
                                  || arg.id == 'scaleZ'
                                ) {
                                  str += x.id + '(' + newVal + ') ';
                                }


                                if (
                                  arg.id == 'translateX'
                                  || arg.id == 'translateY'
                                  || arg.id == 'translateZ'
                                  || arg.id == 'perspective'

                                ) {
                                  str += x.id + '(' + newVal + 'px) ';
                                }

                                if (
                                  arg.id == 'rotateX'
                                  || arg.id == 'rotateY'
                                  || arg.id == 'rotateZ'
                                  || arg.id == 'skewX'
                                  || arg.id == 'skewY'

                                ) {
                                  str += x.id + '(' + newVal + 'deg) ';
                                }




                              } else {
                                str += x.id + '(' + x.val + ') ';
                              }

                            })

                            console.log(str);


                            props.onChange(str, 'transform');

                          }}
                        />
                        <span>

                          {
                            (
                              arg.id == 'translateX'
                              || arg.id == 'translateY'
                              || arg.id == 'translateZ'
                              || arg.id == 'perspective'
                            ) && "PX"
                          }

                          {
                            (arg.id == 'rotateX'
                              || arg.id == 'rotateY'
                              || arg.id == 'rotateZ'
                              || arg.id == 'skewX'
                              || arg.id == 'skewY') && "deg"
                          }


                        </span>
                      </PanelRow>

                    </>

                  )}


                {(arg.id == 'translate'
                  || arg.id == 'scale'
                  || arg.id == 'skew'



                ) && (

                    <>
                      <PanelRow>
                        <label for="">X Value</label>
                        <InputControl
                          value={arg.val.split(",")[0].match(/\d+/g)[0]}
                          type="number"

                          onChange={(newVal) => {
                            //var argVal = arg.val != undefined ? arg.val.match(/\d+/g)[0] : 1;
                            //var argUnit = arg.val != undefined ? arg.val.match(/[a-zA-Z]+/g)[0] : '';

                            console.log(newVal);
                            //console.log(argUnit);
                            var valPartsX = arg.val.split(",")[0].match(/\d+/g)[0];
                            var valPartsY = arg.val.split(",")[1].match(/\d+/g)[0];


                            var str = '';
                            valArgs.map((x, j) => {

                              if (arg.id == x.id) {


                                if (
                                  arg.id == 'scale'

                                ) {
                                  str += x.id + '(' + newVal + ',' + valPartsY + ') ';
                                }


                                if (
                                  arg.id == 'translate'


                                ) {
                                  str += x.id + '(' + newVal + 'px,' + valPartsY + 'px) ';
                                }

                                if (
                                  arg.id == 'skew'


                                ) {
                                  str += x.id + '(' + newVal + 'deg,' + valPartsY + 'deg) ';
                                }




                              } else {
                                str += x.id + '(' + x.val + ') ';
                              }

                            })



                            props.onChange(str, 'transform');

                          }}
                        />
                        <span>

                          {
                            (
                              arg.id == 'translate'

                            ) && "PX"
                          }

                          {
                            (arg.id == 'skew') && "deg"
                          }


                        </span>
                      </PanelRow>
                      <PanelRow>
                        <label for="">Y Value</label>
                        <InputControl
                          value={arg.val.split(",")[1].match(/\d+/g)[0]}
                          type="number"

                          onChange={(newVal) => {


                            var valPartsX = arg.val.split(",")[0].match(/\d+/g)[0];
                            var valPartsY = arg.val.split(",")[1].match(/\d+/g)[0];




                            var str = '';
                            valArgs.map((x, j) => {

                              if (arg.id == x.id) {


                                if (
                                  arg.id == 'scale'

                                ) {
                                  str += x.id + '(' + valPartsX + ',' + newVal + ') ';
                                }


                                if (
                                  arg.id == 'translate'


                                ) {
                                  str += x.id + '(' + valPartsX + 'px,' + newVal + 'px) ';
                                }

                                if (
                                  arg.id == 'skew'


                                ) {
                                  str += x.id + '(' + valPartsX + 'deg,' + newVal + 'deg) ';
                                }




                              } else {
                                str += x.id + '(' + x.val + ') ';
                              }

                            })



                            props.onChange(str, 'transform');

                          }}
                        />
                        <span>

                          {
                            (
                              arg.id == 'translate'

                            ) && "PX"
                          }

                          {
                            (arg.id == 'skew') && "deg"
                          }


                        </span>
                      </PanelRow>
                    </>

                  )}

                {(arg.id == 'translate3d'
                  || arg.id == 'scale3d'
                  || arg.id == 'rotate3d'



                ) && (

                    <>
                      <PanelRow>
                        <label for="">X Value</label>
                        <InputControl
                          value={arg.val.split(",")[0].match(/\d+/g)[0]}
                          type="number"

                          onChange={(newVal) => {
                            //var argVal = arg.val != undefined ? arg.val.match(/\d+/g)[0] : 1;
                            //var argUnit = arg.val != undefined ? arg.val.match(/[a-zA-Z]+/g)[0] : '';

                            console.log(newVal);
                            //console.log(argUnit);
                            var valPartsX = arg.val.split(",")[0].match(/\d+/g)[0];
                            var valPartsY = arg.val.split(",")[1].match(/\d+/g)[0];
                            var valPartsZ = arg.val.split(",")[2].match(/\d+/g)[0];

                            var str = '';
                            valArgs.map((x, j) => {

                              if (arg.id == x.id) {


                                if (arg.id == 'scale3d') {
                                  str += x.id + '(' + newVal + ',' + valPartsY + ',' + valPartsZ + ') ';
                                }


                                if (arg.id == 'translate3d') {
                                  str += x.id + '(' + newVal + 'px,' + valPartsY + 'px,' + valPartsZ + 'px) ';
                                }

                                if (arg.id == 'rotate3d') {
                                  var valPartsA = arg.val.split(",")[2].match(/\d+/g)[0];

                                  str += x.id + '(' + newVal + ',' + valPartsY + ',' + valPartsZ + ',' + valPartsA + 'deg) ';
                                }




                              } else {
                                str += x.id + '(' + x.val + ') ';
                              }

                            })



                            props.onChange(str, 'transform');

                          }}
                        />
                        <span>

                          {
                            (
                              arg.id == 'translate3d'

                            ) && "PX"
                          }




                        </span>
                      </PanelRow>
                      <PanelRow>
                        <label for="">Y Value</label>
                        <InputControl
                          value={arg.val.split(",")[1].match(/\d+/g)[0]}
                          type="number"

                          onChange={(newVal) => {


                            var valPartsX = arg.val.split(",")[0].match(/\d+/g)[0];
                            var valPartsY = arg.val.split(",")[1].match(/\d+/g)[0];
                            var valPartsZ = arg.val.split(",")[2].match(/\d+/g)[0];




                            var str = '';
                            valArgs.map((x, j) => {

                              if (arg.id == x.id) {


                                if (arg.id == 'scale3d') {
                                  str += x.id + '(' + valPartsX + ',' + newVal + ',' + valPartsZ + ') ';
                                }


                                if (arg.id == 'translate3d') {
                                  str += x.id + '(' + valPartsX + 'px,' + newVal + 'px,' + valPartsZ + 'px) ';
                                }

                                if (arg.id == 'rotate3d') {
                                  var valPartsA = arg.val.split(",")[3].match(/\d+/g)[0];

                                  str += x.id + '(' + valPartsX + ',' + newVal + ',' + valPartsZ + ',' + valPartsA + 'deg) ';
                                }




                              } else {
                                str += x.id + '(' + x.val + ') ';
                              }

                            })



                            props.onChange(str, 'transform');

                          }}
                        />
                        <span>

                          {
                            (
                              arg.id == 'translate3d'

                            ) && "PX"
                          }

                          {
                            (arg.id == 'skew') && "deg"
                          }


                        </span>
                      </PanelRow>

                      <PanelRow>
                        <label for="">Z Value</label>
                        <InputControl
                          value={arg.val.split(",")[2].match(/\d+/g)[0]}
                          type="number"

                          onChange={(newVal) => {


                            var valPartsX = arg.val.split(",")[0].match(/\d+/g)[0];
                            var valPartsY = arg.val.split(",")[1].match(/\d+/g)[0];
                            var valPartsZ = arg.val.split(",")[2].match(/\d+/g)[0];




                            var str = '';
                            valArgs.map((x, j) => {

                              if (arg.id == x.id) {


                                if (arg.id == 'scale3d') {
                                  str += x.id + '(' + valPartsX + ',' + valPartsY + ',' + newVal + ') ';
                                }


                                if (arg.id == 'translate3d') {
                                  str += x.id + '(' + valPartsX + 'px,' + valPartsY + 'px,' + newVal + 'px) ';
                                }

                                if (arg.id == 'rotate3d') {
                                  var valPartsA = arg.val.split(",")[3].match(/\d+/g)[0];

                                  str += x.id + '(' + valPartsX + ',' + valPartsY + ',' + newVal + ',' + valPartsA + 'deg) ';
                                }




                              } else {
                                str += x.id + '(' + x.val + ') ';
                              }

                            })



                            props.onChange(str, 'transform');

                          }}
                        />
                        <span>

                          {
                            (
                              arg.id == 'translate3d'

                            ) && "PX"
                          }

                          {
                            (arg.id == 'skew') && "deg"
                          }


                        </span>
                      </PanelRow>


                      {arg.id == 'rotate3d' && (

                        <PanelRow>
                          <label for="">Angle</label>
                          <InputControl

                            value={arg.val.split(",")[3].match(/\d+/g)[0]}
                            type="number"

                            onChange={(newVal) => {


                              var valPartsX = arg.val.split(",")[0].match(/\d+/g)[0];
                              var valPartsY = arg.val.split(",")[1].match(/\d+/g)[0];
                              var valPartsZ = arg.val.split(",")[2].match(/\d+/g)[0];


                              var str = '';
                              valArgs.map((x, j) => {

                                if (arg.id == x.id) {


                                  if (arg.id == 'scale3d') {
                                    str += x.id + '(' + valPartsX + ',' + valPartsY + ',' + valPartsZ + ') ';
                                  }


                                  if (arg.id == 'translate3d') {
                                    str += x.id + '(' + valPartsX + 'px,' + valPartsY + 'px,' + valPartsZ + 'px) ';
                                  }

                                  if (arg.id == 'rotate3d') {

                                    str += x.id + '(' + valPartsX + ',' + valPartsY + ',' + valPartsZ + ',' + newVal + 'deg) ';
                                  }




                                } else {
                                  str += x.id + '(' + x.val + ') ';
                                }

                              })



                              props.onChange(str, 'transform');

                            }}
                          />
                          <span>


                            {
                              (arg.id == 'rotate3d') && "deg"
                            }


                          </span>
                        </PanelRow>
                      )}

                    </>

                  )}



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