

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import colorsPresets from '../../colors-presets'
import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';


class PGcssBoxShadow extends Component {
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

      var valParts = (val != undefined) ? val.split(" ") : ['1px', '1px', '5px', '#000000', 'inset'];

      var hOffsetVal = valParts[0];
      var vOffsetVal = valParts[1];
      var blurVal = valParts[2];

      var colorVal = valParts[3];
      var styleVal = valParts[4];


      var unitArgs = {
        px: { "label": "PX", "value": "px" },
        em: { "label": "EM", "value": "em" },
        rem: { "label": "REM", "value": "rem" },

      }

      var hOffsetValX = hOffsetVal != undefined ? hOffsetVal.match(/\d+/g)[0] : 1;
      var hOffsetUnitX = hOffsetVal != undefined ? hOffsetVal.match(/[a-zA-Z]+/g)[0] : 'px';

      const [hOffsetValY, sethOffsetVal] = useState(hOffsetValX);
      const [hOffsetUnitY, sethOffsetUnit] = useState(hOffsetUnitX);

      var vOffsetValX = vOffsetVal != undefined ? vOffsetVal.match(/\d+/g)[0] : 1;
      var vOffsetUnitX = vOffsetVal != undefined ? vOffsetVal.match(/[a-zA-Z]+/g)[0] : 'px';

      const [vOffsetValY, setvOffsetVal] = useState(vOffsetValX);
      const [vOffsetUnitY, setvOffsetUnit] = useState(vOffsetUnitX);





      const [outlinehOffsetVal, setoutlinehOffsetVal] = useState(hOffsetVal);
      const [outlineStyleVal, setoutlineStyleVal] = useState(styleVal);
      const [outlineColorVal, setoutlineColorVal] = useState(colorVal);



      return (

        <div>
          <div className='my-2'>
            <label for="">h-offset</label>
            <div className='flex justify-between items-center'>


              <InputControl
                value={hOffsetValY}
                type="number"
                onChange={(newVal) => {

                  sethOffsetVal(newVal);
                  onChange(newVal + hOffsetUnitY + ' ' + vOffsetValY + vOffsetUnitY + ' ' + outlineStyleVal + ' ' + outlineColorVal, 'outline');


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
                      <div className=" ">{(hOffsetUnitY != undefined) ? unitArgs[hOffsetUnitY].label : 'Select...'}</div>


                    </Button>
                  )}
                  renderContent={() => <div className='w-32'>

                    {Object.entries(unitArgs).map((y) => {

                      var index = y[0]
                      var x = y[1]
                      return (

                        <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                          sethOffsetUnit(x.value);
                          // onChange(hOffsetValY + x.value + ' ' + outlineStyleVal + ' ' + outlineColorVal, 'outline');
                          onChange(hOffsetValY + x.value + ' ' + vOffsetValY + vOffsetUnitY + ' ' + outlineStyleVal + ' ' + outlineColorVal, 'outline');


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
            <label for="">v-offset</label>
            <div className='flex justify-between items-center'>


              <InputControl
                value={vOffsetValY}
                type="number"
                onChange={(newVal) => {

                  setvOffsetVal(newVal);
                  onChange(hOffsetValY + hOffsetUnitY + ' ' + newVal + vOffsetUnitY + ' ' + outlineStyleVal + ' ' + outlineColorVal, 'outline');


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
                      <div className=" ">{(vOffsetUnitY != undefined) ? unitArgs[vOffsetUnitY].label : 'Select...'}</div>


                    </Button>
                  )}
                  renderContent={() => <div className='w-32'>

                    {Object.entries(unitArgs).map((y) => {

                      var index = y[0]
                      var x = y[1]
                      return (

                        <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                          setvOffsetUnit(x.value);
                          // onChange(vOffsetValY + x.value + ' ' + outlineStyleVal + ' ' + outlineColorVal, 'outline');

                          onChange(hOffsetValY + hOffsetUnitY + ' ' + x.value + vOffsetUnitY + ' ' + outlineStyleVal + ' ' + outlineColorVal, 'outline');



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
            <label for="">Blur</label>
            <div className='flex justify-between items-center'>


              <InputControl
                value={hOffsetValY}
                type="number"
                onChange={(newVal) => {

                  sethOffsetVal(newVal);
                  onChange(newVal + hOffsetUnitY + ' ' + outlineStyleVal + ' ' + outlineColorVal, 'outline');


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
                      <div className=" ">{(hOffsetUnitY != undefined) ? unitArgs[hOffsetUnitY].label : 'Select...'}</div>


                    </Button>
                  )}
                  renderContent={() => <div className='w-32'>

                    {Object.entries(unitArgs).map((y) => {

                      var index = y[0]
                      var x = y[1]
                      return (

                        <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                          sethOffsetUnit(x.value);
                          onChange(hOffsetValY + x.value + ' ' + outlineStyleVal + ' ' + outlineColorVal, 'outline');


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
            <label for="">spread</label>
            <div className='flex justify-between items-center'>


              <InputControl
                value={hOffsetValY}
                type="number"
                onChange={(newVal) => {

                  sethOffsetVal(newVal);
                  onChange(newVal + hOffsetUnitY + ' ' + outlineStyleVal + ' ' + outlineColorVal, 'outline');


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
                      <div className=" ">{(hOffsetUnitY != undefined) ? unitArgs[hOffsetUnitY].label : 'Select...'}</div>


                    </Button>
                  )}
                  renderContent={() => <div className='w-32'>

                    {Object.entries(unitArgs).map((y) => {

                      var index = y[0]
                      var x = y[1]
                      return (

                        <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                          sethOffsetUnit(x.value);
                          onChange(hOffsetValY + x.value + ' ' + outlineStyleVal + ' ' + outlineColorVal, 'outline');


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
            <label for="">Color</label>

            <ColorPalette
              value={outlineColorVal}
              colors={colorsPresets}
              enableAlpha
              onChange={(newVal) => {

                onChange(outlinehOffsetVal + ' ' + outlineStyleVal + ' ' + newVal, 'outline');


              }}
            />
          </div>


          <div className='my-2 flex justify-between items-center'>


            <label for="">inset</label>



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

                      onChange(outlinehOffsetVal + ' ' + x.value + ' ' + outlineColorVal, 'outline');


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


export default PGcssBoxShadow;