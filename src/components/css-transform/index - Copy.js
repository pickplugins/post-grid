

const { Component } = wp.element;
import { Button, Dropdown, PanelRow, PanelBody, RangeControl } from '@wordpress/components'
import { useState, useEffect } from '@wordpress/element'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';
import PGDropdown from '../../components/dropdown'
import { Icon, close } from '@wordpress/icons';




class PGcssTransform extends Component {


  render() {

    var {
      val,
      onChange,


    } = this.props;





    function Html() {

      var valParts = (val != undefined) ? val.split(" ") : [];
      const [valArgs, setvalArgs] = useState([]);

      const filterArgs = {
        translate: { label: 'translate', value: 'translate', x: '', y: '' },
        translate3d: { label: 'translate3d', value: 'translate3d', x: '', y: '', z: '' },
        translateX: { label: 'translateX', value: 'translateX', x: '' },
        translateY: { label: 'translateY', value: 'translateY', y: '' },
        translateZ: { label: 'translateZ', value: 'translateZ', z: '' },
        scale: { label: 'scale', value: 'scale', x: '', y: '' },
        scale3d: { label: 'scale3d', value: 'scale3d', x: '', y: '', z: '' },
        scaleX: { label: 'scaleX', value: 'scaleX', x: '' },
        scaleY: { label: 'scaleY', value: 'scaleY', y: '' },
        scaleZ: { label: 'scaleZ', value: 'scaleZ', y: '' },
        rotate: { label: 'rotate', value: 'rotate', angle: '' },
        rotate3d: { label: 'rotate3d', value: 'rotate3d', x: '', y: '', z: '', angle: '' },
        rotateX: { label: 'rotateX', value: 'rotateX', angle: '' },
        rotateY: { label: 'rotateY', value: 'rotateY', angle: '' },
        rotateZ: { label: 'rotateZ', value: 'rotateZ', angle: '' },
        skew: { label: 'skew', value: 'skew', x: '', y: '' },
        skewX: { label: 'skewX', value: 'skewX', angle: '' },
        skewY: { label: 'skewY', value: 'skewY', angle: '' },
        perspective: { label: 'perspective', value: 'perspective', n: '' },
        matrix: { label: 'matrix', value: 'matrix', args: [] },
        matrix3d: { label: 'matrix3d', value: 'matrix3d', args: [] },
      };

      function addFilter(option, index) {


        var isExist = valArgs.find(x => x.value === option.value);

        if (isExist == undefined) {


          valArgs.push(option);

          var str = '';
          valArgs.map(x => {

            str += x.value + '(' + x.value + '%) ';


          })

          onChange(str, 'filter');

        }




      }






      useEffect(() => {

        //console.log(valParts);
        var filtered = valParts.filter(Boolean)



        var res = filtered.map(x => {

          //console.log(x.length);



          if (x.length != 0) {
            // var argVal = x != undefined ? x.match(/\d+/g)[0] : 1;
            // var argId = x != undefined ? x.match(/[a-zA-Z]+/g)[0] : '';

            return x;
          }



        })

        setvalArgs(res);
        //console.log(res);

      }, [val]);






      return (

        <div className='mt-4'>


          <div className='flex'>
            <PGDropdown position="bottom right" variant="secondary" options={filterArgs} buttonTitle="Add Filter" onChange={addFilter} values=""></PGDropdown>
          </div>


          {
            valArgs != undefined && (


              valArgs.map((arg, i) => {



                return (
                  <div className='flex my-3 items-center justify-between'>
                    <label for="">{filterArgs[arg.value].label}</label>


                    <div className='flex'>
                      <InputControl
                        value={arg.value}
                        type="number"
                        min={0}
                        max={100}
                        onChange={(newVal) => {



                          valArgs[i].value = newVal;
                          // setvalArgs(valArgs);


                          var str = '';
                          valArgs.map(x => {

                            str += x.value + '(' + x.value + '%) ';


                          })



                          onChange(str, 'filter');



                        }}
                      />
                      <span class="hover:bg-red-500 bg-red-400 text-white ml-1 inline-block p-1 cursor-pointer" onClick={ev => {


                        valArgs.splice(i, 1);

                        setvalArgs(valArgs);

                      }}><span class="dashicons dashicons-no-alt"></span></span>
                    </div>

                  </div>
                )


              }))
          }


        </div >




      )

    }


    return (


      <Html />


    )
  }
}


export default PGcssTransform;