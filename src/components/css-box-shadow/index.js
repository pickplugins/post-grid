

const { Component, RawHTML } = wp.element;
import { Button, Dropdown, SelectControl } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import colorsPresets from '../../colors-presets'
import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';


class PGcssBoxShadow extends Component {
  render() {


    const {
      val,
      onChange,



    } = this.props;



    function Html() {

      var valParts = (val != undefined) ? val.split(" ") : ['0px', '0px', '0px', '0px', '#000000'];

      var hOffsetVal = (valParts[0] != undefined) ? valParts[0] : '0px';
      var vOffsetVal = (valParts[1] != undefined) ? valParts[1] : '0px';
      var blurVal = (valParts[2] != undefined) ? valParts[2] : '0px';
      var spreadVal = (valParts[3] != undefined) ? valParts[3] : '0px';
      var colorVal = (valParts[4] != undefined) ? valParts[4] : '#000000';

      var insetVal = (valParts[5] != undefined && valParts[5].length > 0) ? 'inset' : '';


      var unitArgs = {
        px: { "label": "PX", "value": "px" },
        em: { "label": "EM", "value": "em" },
        rem: { "label": "REM", "value": "rem" },

      }

      var hOffsetValX = (hOffsetVal.match(/\d+/g) != null) ? hOffsetVal.match(/\d+/g)[0] : 0;
      var hOffsetUnitX = (hOffsetVal.match(/[a-zA-Z]+/g) != null) ? hOffsetVal.match(/[a-zA-Z]+/g)[0] : 'px';

      const [hOffsetValY, sethOffsetVal] = useState(hOffsetValX);
      const [hOffsetUnitY, sethOffsetUnit] = useState(hOffsetUnitX);

      var vOffsetValX = (vOffsetVal.match(/\d+/g) != null) ? vOffsetVal.match(/\d+/g)[0] : 0;
      var vOffsetUnitX = (vOffsetVal.match(/[a-zA-Z]+/g) != null) ? vOffsetVal.match(/[a-zA-Z]+/g)[0] : 'px';

      const [vOffsetValY, setvOffsetVal] = useState(vOffsetValX);
      const [vOffsetUnitY, setvOffsetUnit] = useState(vOffsetUnitX);


      var blurValX = (blurVal.match(/\d+/g) != null) ? blurVal.match(/\d+/g)[0] : 0;
      var blurUnitX = (blurVal.match(/[a-zA-Z]+/g) != null) ? blurVal.match(/[a-zA-Z]+/g)[0] : 'px';


      const [blurValY, setblurVal] = useState(blurValX);
      const [blurUnitY, setblurUnit] = useState(blurUnitX);

      var spreadValX = (spreadVal.match(/\d+/g) != null) ? spreadVal.match(/\d+/g)[0] : 0;
      var spreadUnitX = (spreadVal.match(/[a-zA-Z]+/g) != null) ? spreadVal.match(/[a-zA-Z]+/g)[0] : 'px';

      const [spreadValY, setspreadVal] = useState(spreadValX);
      const [spreadUnitY, setspreadUnit] = useState(spreadUnitX);



      const [colorValY, setColorValY] = useState(colorVal);

      const [insetValY, setInsetValY] = useState(insetVal);



      return (

        <div>
          <div className='my-2'>
            <label for="">H-offset</label>
            <div className='flex justify-between items-center'>


              <InputControl
                value={hOffsetValY}
                type="number"
                onChange={(newVal) => {

                  sethOffsetVal(newVal);

                  onChange(newVal + hOffsetUnitY + ' ' + vOffsetValY + vOffsetUnitY + ' ' + blurValY + blurUnitY + ' ' + spreadValY + spreadUnitY + ' ' + colorValY + ' ' + insetValY, 'boxShadow');


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
                          onChange(hOffsetValY + x.value + ' ' + vOffsetValY + vOffsetUnitY + ' ' + blurValY + blurUnitY + ' ' + spreadValY + spreadUnitY + ' ' + colorValY + ' ' + insetValY, 'boxShadow');

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
            <label for="">V-offset</label>
            <div className='flex justify-between items-center'>


              <InputControl
                value={vOffsetValY}
                type="number"
                onChange={(newVal) => {

                  setvOffsetVal(newVal);

                  onChange(hOffsetValY + hOffsetUnitY + ' ' + newVal + vOffsetUnitY + ' ' + blurValY + blurUnitY + ' ' + spreadValY + spreadUnitY + ' ' + colorValY + ' ' + insetValY, 'boxShadow');

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

                          onChange(hOffsetValY + hOffsetUnitY + ' ' + vOffsetValY + x.value + ' ' + blurValY + blurUnitY + ' ' + spreadValY + spreadUnitY + ' ' + colorValY + ' ' + insetValY, 'boxShadow');

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
                value={blurValY}
                type="number"
                onChange={(newVal) => {

                  setblurVal(newVal);

                  onChange(hOffsetValY + hOffsetUnitY + ' ' + vOffsetValY + vOffsetUnitY + ' ' + newVal + blurUnitY + ' ' + spreadValY + spreadUnitY + ' ' + colorValY + ' ' + insetValY, 'boxShadow');



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

                          setblurUnit(x.value);

                          onChange(hOffsetValY + hOffsetUnitY + ' ' + vOffsetValY + vOffsetUnitY + ' ' + blurValY + x.value + ' ' + spreadValY + spreadUnitY + ' ' + colorValY + ' ' + insetValY, 'boxShadow');


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
            <label for="">Spread</label>
            <div className='flex justify-between items-center'>


              <InputControl
                value={spreadValY}
                type="number"
                onChange={(newVal) => {

                  sethOffsetVal(newVal);

                  onChange(hOffsetValY + hOffsetUnitY + ' ' + vOffsetValY + vOffsetUnitY + ' ' + blurValY + blurUnitY + ' ' + newVal + spreadUnitY + ' ' + colorValY + ' ' + insetValY, 'boxShadow');


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

                          onChange(hOffsetValY + hOffsetUnitY + ' ' + vOffsetValY + vOffsetUnitY + ' ' + blurValY + blurUnitY + ' ' + spreadValY + x.value + ' ' + colorValY + ' ' + insetValY, 'boxShadow');

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
              value={colorValY}
              colors={colorsPresets}
              enableAlpha
              onChange={(newVal) => {
                setColorValY(newVal);



                onChange(hOffsetValY + hOffsetUnitY + ' ' + vOffsetValY + vOffsetUnitY + ' ' + blurValY + blurUnitY + ' ' + spreadValY + spreadUnitY + ' ' + newVal + ' ' + insetValY, 'boxShadow');

              }}
            />
          </div>


          <div className='my-2 flex justify-between items-center'>


            <label for="">Inset</label>

            <SelectControl
              style={{ margin: 0 }}
              label=""

              value={insetValY}
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },

              ]}
              onChange={(newVal) => {


                setInsetValY(newVal);

                if (newVal == 'yes') {
                  onChange(hOffsetValY + hOffsetUnitY + ' ' + vOffsetValY + vOffsetUnitY + ' ' + blurValY + blurUnitY + ' ' + spreadValY + spreadUnitY + ' ' + colorValY + ' ' + 'inset', 'boxShadow');
                } else {
                  onChange(hOffsetValY + hOffsetUnitY + ' ' + vOffsetValY + vOffsetUnitY + ' ' + blurValY + blurUnitY + ' ' + spreadValY + spreadUnitY + ' ' + colorValY, 'boxShadow');

                }




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


export default PGcssBoxShadow;