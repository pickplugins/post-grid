

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import colorsPresets from '../../colors-presets'
import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';


class PGcssOutline extends Component {
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







    var outlineStyleArgs = {
      none: { "label": "None", "value": "none" },
      hidden: { "label": "Hidden", "value": "hidden" },
      dotted: { "label": "Dotted", "value": "dotted" },
      dashed: { "label": "Dashed", "value": "dashed" },
      solid: { "label": "Solid", "value": "solid" },
      double: { "label": "Double", "value": "double" },
      groove: { "label": "Groove", "value": "groove" },
      ridge: { "label": "Ridge", "value": "ridge" },
      inset: { "label": "Inset", "value": "inset" },
      outset: { "label": "Outset", "value": "outset" },
    };



    function Html() {

      var valParts = (val != undefined) ? val.split(" ") : ['1px', 'solid', '#000000'];

      var widthVal = valParts[0];
      var styleVal = valParts[1];
      var colorVal = valParts[2];


      console.log(widthVal);
      console.log(styleVal);
      console.log(colorVal);



      var unitArgs = {
        px: { "label": "PX", "value": "px" },
        em: { "label": "EM", "value": "em" },
        rem: { "label": "REM", "value": "rem" },

      }

      var widthValX = widthVal != undefined ? widthVal.match(/\d+/g)[0] : 1;
      var widthUnitX = widthVal != undefined ? widthVal.match(/[a-zA-Z]+/g)[0] : 'px';


      const [widthValY, setwidthVal] = useState(widthValX);
      const [widthUnitY, setwidthUnit] = useState(widthUnitX);

      console.log(widthValY);
      console.log(widthUnitY);




      const [outlineWidthVal, setoutlineWidthVal] = useState(widthVal);
      const [outlineStyleVal, setoutlineStyleVal] = useState(styleVal);
      const [outlineColorVal, setoutlineColorVal] = useState(colorVal);



      return (

        <div>
          <div className='my-2'>
            <label for="">Outline Width</label>
            <div className='flex justify-between items-center'>


              <InputControl
                value={widthValY}
                type="number"
                onChange={(newVal) => {

                  setwidthVal(newVal);
                  onChange(newVal + widthUnitY + ' ' + outlineStyleVal + ' ' + outlineColorVal, 'outline');


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
                      <div className=" ">{(widthUnitY != undefined) ? unitArgs[widthUnitY].label : 'Select...'}</div>


                    </Button>
                  )}
                  renderContent={() => <div className='w-32'>

                    {Object.entries(unitArgs).map((y) => {

                      var index = y[0]
                      var x = y[1]
                      return (

                        <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                          setwidthUnit(x.value);
                          onChange(widthValY + x.value + ' ' + outlineStyleVal + ' ' + outlineColorVal, 'outline');


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

          <div className='my-2 flex justify-between items-center'>


            <label for="">Outline Style</label>



            <Dropdown
              position="bottom right"
              renderToggle={({ isOpen, onToggle }) => (
                <Button
                  title="Clear"

                  onClick={onToggle}
                  aria-expanded={isOpen}
                >
                  <div className=" ">{outlineStyleVal ? outlineStyleArgs[outlineStyleVal].label : 'Select...'}</div>


                </Button>
              )}
              renderContent={() => <div className='w-32'>

                {Object.entries(outlineStyleArgs).map((arg) => {

                  var index = arg[0]
                  var x = arg[1]
                  return (

                    <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                      onChange(outlineWidthVal + ' ' + x.value + ' ' + outlineColorVal, 'outline');


                    }}>

                      {!x.value && (

                        <div>Reset</div>

                      )}

                      {x.value && (

                        <>{x.label}</>

                      )}

                    </div>

                  )

                })}
              </div>}
            />
          </div>

          <div className='my-2'>
            <label for="">Outline Color</label>

            <ColorPalette
              value={outlineColorVal}
              colors={colorsPresets}
              enableAlpha
              onChange={(newVal) => {

                onChange(outlineWidthVal + ' ' + outlineStyleVal + ' ' + newVal, 'outline');


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


export default PGcssOutline;