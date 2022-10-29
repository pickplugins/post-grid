

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import colorsPresets from '../../colors-presets'
import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';


class PGcssTextShadow extends Component {
  render() {


    const {
      val,
      onChange,



    } = this.props;


    var args = {
      fill: { "label": "fill", "value": "fill" },
      contain: { "label": "contain", "value": "contain" },
      cover: { "label": "cover", "value": "cover" },
      'scale-down': { "label": "scale-down", "value": "scale-down" },
      none: { "label": "none", "value": "none" },
    };










    function Html() {

      var valParts = (val != undefined) ? val.split(" ") : ['1px', '1px', '#000000'];

      var horizontalVal = valParts[0];
      var vericalVal = valParts[1];
      var colorVal = valParts[2];


      console.log(horizontalVal);
      console.log(vericalVal);
      console.log(colorVal);



      var unitArgs = {
        px: { "label": "PX", "value": "px" },
        em: { "label": "EM", "value": "em" },
        rem: { "label": "REM", "value": "rem" },

      }

      var horizontalValX = horizontalVal != undefined ? horizontalVal.match(/\d+/g)[0] : 1;
      var horizontalUnitX = horizontalVal != undefined ? horizontalVal.match(/[a-zA-Z]+/g)[0] : 'px';

      var vericalValX = vericalVal != undefined ? vericalVal.match(/\d+/g)[0] : 1;
      var vericalUnitX = vericalVal != undefined ? vericalVal.match(/[a-zA-Z]+/g)[0] : 'px';




      const [horizontalValY, sethorizontalVal] = useState(horizontalValX);
      const [horizontalUnitY, sethorizontalUnit] = useState(horizontalUnitX);

      const [vericalValY, setvericalVal] = useState(vericalValX);
      const [vericalUnitY, setvericalUnit] = useState(vericalUnitX);

      console.log(horizontalValY);
      console.log(horizontalUnitY);

      console.log(vericalValY);
      console.log(vericalUnitY);



      const [outlinehorizontalVal, setoutlinehorizontalVal] = useState(horizontalVal);
      const [outlinevericalVal, setoutlinevericalVal] = useState(vericalVal);
      const [outlineColorVal, setoutlineColorVal] = useState(colorVal);



      return (

        <div>

          <div className='grid grid-cols-2 gap-2'>
            <div className='my-2'>
              <label for="">Horizontal</label>
              <div className='flex justify-between items-center'>


                <InputControl
                  value={horizontalValY}
                  type="number"
                  onChange={(newVal) => {

                    sethorizontalVal(newVal);
                    onChange(newVal + horizontalUnitY + ' ' + outlinevericalVal + ' ' + outlineColorVal, 'textShadow');


                  }}
                />
                <div>

                  <Dropdown
                    position="bottom right"
                    renderToggle={({ isOpen, onToggle }) => (
                      <Button
                        title=""

                        onClick={onToggle}
                        aria-expanded={isOpen}
                      >
                        <div className=" ">{(horizontalUnitY != undefined) ? unitArgs[horizontalUnitY].label : 'Select...'}</div>


                      </Button>
                    )}
                    renderContent={() => <div className='w-32'>

                      {Object.entries(unitArgs).map((y) => {

                        var index = y[0]
                        var x = y[1]
                        return (

                          <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                            sethorizontalUnit(x.value);
                            onChange(horizontalValY + x.value + ' ' + outlinevericalVal + ' ' + outlineColorVal, 'textShadow');


                          }}>

                            {x.value && (

                              <>{x.label}</>

                            )}

                          </div>

                        )

                      })}
                    </div>}
                  />
                </div>


              </div>

            </div>

            <div className='my-2'>
              <label for="">Verical</label>
              <div className='flex justify-between items-center'>


                <InputControl
                  value={vericalValY}
                  type="number"
                  onChange={(newVal) => {

                    setvericalVal(newVal);
                    onChange(outlinehorizontalVal + ' ' + newVal + vericalUnitY + ' ' + outlineColorVal, 'textShadow');


                  }}
                />
                <div>

                  <Dropdown
                    position="bottom right"
                    renderToggle={({ isOpen, onToggle }) => (
                      <Button
                        title=""

                        onClick={onToggle}
                        aria-expanded={isOpen}
                      >
                        <div className=" ">{(vericalUnitY != undefined) ? unitArgs[vericalUnitY].label : 'Select...'}</div>


                      </Button>
                    )}
                    renderContent={() => <div className='w-32'>

                      {Object.entries(unitArgs).map((y) => {

                        var index = y[0]
                        var x = y[1]
                        return (

                          <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                            setvericalUnit(x.value);
                            onChange(outlinehorizontalVal + ' ' + vericalValY + x.value + ' ' + outlineColorVal, 'textShadow');


                          }}>

                            {x.value && (

                              <>{x.label}</>

                            )}

                          </div>

                        )

                      })}
                    </div>}
                  />
                </div>


              </div>

            </div>

          </div>



          <div className='my-2'>
            <label for="">Outline Color</label>

            <ColorPalette
              value={outlineColorVal}
              colors={colorsPresets}
              enableAlpha
              onChange={(newVal) => {

                onChange(outlinehorizontalVal + ' ' + outlinevericalVal + ' ' + newVal, 'textShadow');


              }}
            />
          </div>


        </div>

      )


    }


    return (
      <div>

        <Html />
      </div>

    )
  }
}


export default PGcssTextShadow;