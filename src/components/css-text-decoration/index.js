

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import colorsPresets from '../../colors-presets'
import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';


class PGcssTextDecoration extends Component {
  render() {


    const {
      val,
      onChange,



    } = this.props;


    var lineArgs = {
      none: { "label": "None", "value": "none" },
      overline: { "label": "Overline", "value": "overline" },
      underline: { "label": "Underline", "value": "underline" },
      'line-through': { "label": "Line Through", "value": "line-through" },
    };

    var styleArgs = {
      none: { "label": "None", "value": "none" },
      solid: { "label": "Solid", "value": "solid" },
      double: { "label": "Double", "value": "double" },
      wavy: { "label": "wavy", "value": "wavy" },
      dotted: { "label": "Dotted", "value": "dotted" },
      dashed: { "label": "Dashed", "value": "dashed" },
      groove: { "label": "Groove", "value": "groove" },
      ridge: { "label": "Ridge", "value": "ridge" },
      inset: { "label": "Inset", "value": "inset" },
      outset: { "label": "Outset", "value": "outset" },
    };



    function Html() {

      var valParts = (val != undefined) ? val.split(" ") : ['underline', '#000000', 'wavy', '1px'];

      console.log(valParts);

      if (valParts.length == 4) {
        var lineVal = [valParts[0]];
        var colorVal = valParts[1];
        var styleVal = valParts[2];
        var thicknessVal = valParts[3];
      }

      if (valParts.length == 5) {
        var lineVal = [valParts[0], valParts[1]];
        var colorVal = valParts[2];
        var styleVal = valParts[3];
        var thicknessVal = valParts[4];
      }


      if (valParts.length == 6) {
        var lineVal = [valParts[0], valParts[1], valParts[2]];
        var colorVal = valParts[3];
        var styleVal = valParts[4];
        var thicknessVal = valParts[5];
      }





      var unitArgs = {
        px: { "label": "PX", "value": "px" },
        em: { "label": "EM", "value": "em" },
        rem: { "label": "REM", "value": "rem" },

      }

      var thicknessValX = thicknessVal != undefined ? thicknessVal.match(/\d+/g)[0] : 1;
      var thicknessUnitX = thicknessVal != undefined ? thicknessVal.match(/[a-zA-Z]+/g)[0] : 'px';


      const [thicknessValY, setthicknessVal] = useState(thicknessValX);
      const [thicknessUnitY, setthicknessUnit] = useState(thicknessUnitX);

      console.log(thicknessValY);
      console.log(thicknessUnitY);



      const [outlinelineVal, setoutlinelineVal] = useState(lineVal);
      const [outlineColorVal, setoutlineColorVal] = useState(colorVal);
      const [outlineStyleVal, setoutlineStyleVal] = useState(styleVal);
      const [outlineThicknessVal, setoutlineThicknessVal] = useState(thicknessValY + thicknessUnitY);



      const [textDecoration, setTextDecoration] = useState({
        "line": ['underline'],
        "style": 'double',
        "color": "#000000",
        "thicknessVal": "1",
        "thicknessUnit": "px"
      });


      useEffect(() => {

        //console.log(textDecoration);


        //onChange(textDecoration.line.join(' ') + ' ' + textDecoration.style + ' ' + textDecoration.style + ' ' + textDecoration.thicknessVal + textDecoration.thicknessUnit, 'textDecoration');


      }, [textDecoration]);


      useEffect(() => {

        //console.log(val);

        var valParts = (val != undefined) ? val.split(" ") : ['underline', '#000000', 'wavy', '1px'];


      }, [val]);








      return (

        <div>

          {JSON.stringify(outlinelineVal)}

          <div className='my-2'>
            <label for="">Line</label>

            <div className='my-3'>

              {Object.entries(lineArgs).map(arg => {

                var i = arg[0];
                var x = arg[1];


                return (

                  <span
                    className={(outlinelineVal != undefined && outlinelineVal.indexOf(x.value) !== -1) ? '!bg-blue-500 text-white px-2 inline-block m-1 py-1 cursor-pointer' : 'px-2 inline-block m-1 py-1 bg-gray-300 cursor-pointer'}
                    onClick={ev => {


                      if (outlinelineVal.indexOf(x.value) < 0) {

                        if (x.value == 'none') {
                          outlinelineVal = ['none'];
                        } else {
                          outlinelineVal.push(x.value);
                        }
                        setoutlinelineVal(outlinelineVal)
                        setTextDecoration({ ...textDecoration, line: outlinelineVal });
                        onChange(outlinelineVal.join(' ') + ' ' + outlineColorVal + ' ' + outlineStyleVal + ' ' + outlineThicknessVal, 'textDecoration');


                      } else {
                        var arr = outlinelineVal.filter(item => item !== x.value)

                        setTextDecoration({ ...textDecoration, line: arr });
                        setoutlinelineVal(arr)
                        onChange(arr.join(' ') + ' ' + outlineColorVal + ' ' + outlineStyleVal + ' ' + outlineThicknessVal, 'textDecoration');
                        console.log(arr);

                      }



                    }}>{x.label}</span>

                )

              })}

            </div>
          </div>


          <div className='my-2'>
            <label for="">Color</label>

            <ColorPalette
              value={outlineColorVal}
              colors={colorsPresets}
              enableAlpha
              onChange={(newVal) => {

                //onChange(outlineThicknessVal + ' ' + outlineStyleVal + ' ' + newVal, 'outline');

                setoutlineColorVal(newVal);
                setTextDecoration({ ...textDecoration, color: newVal });

                onChange(textDecoration.line.join(' ') + ' ' + newVal + ' ' + outlineStyleVal + ' ' + outlineThicknessVal, 'textDecoration');
              }}
            />
          </div>


          <div className='my-2 flex justify-between items-center'>


            <label for="">Style</label>
            <Dropdown
              position="bottom right"
              renderToggle={({ isOpen, onToggle }) => (
                <Button
                  title="Clear"

                  onClick={onToggle}
                  aria-expanded={isOpen}
                >
                  <div className=" ">{outlineStyleVal ? styleArgs[outlineStyleVal].label : 'Select...'}</div>


                </Button>
              )}
              renderContent={() => <div className='w-32'>

                {Object.entries(styleArgs).map((arg) => {

                  var index = arg[0]
                  var x = arg[1]
                  return (

                    <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                      //onChange(outlineThicknessVal + ' ' + x.value + ' ' + outlineColorVal, 'outline');
                      setoutlineStyleVal(x.value);

                      setTextDecoration({ ...textDecoration, style: x.value });

                      onChange(textDecoration.line.join(' ') + ' ' + outlineColorVal + ' ' + x.value + ' ' + outlineThicknessVal, 'textDecoration');

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
            <label for="">Thickness</label>
            <div className='flex justify-between items-center'>


              <InputControl
                value={thicknessValY}
                type="number"
                onChange={(newVal) => {
                  setthicknessVal(newVal)
                  setoutlineThicknessVal(newVal + thicknessUnitY)
                  //setoutlineThicknessVal(newVal + thicknessUnitY);
                  //onChange(newVal + thicknessUnitY + ' ' + outlineStyleVal + ' ' + outlineColorVal, 'outline');


                  setTextDecoration({ ...textDecoration, thicknessVal: newVal });
                  onChange(textDecoration.line.join(' ') + ' ' + outlineColorVal + ' ' + outlineStyleVal + ' ' + newVal + thicknessUnitY, 'textDecoration');
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
                      <div className=" ">{(thicknessUnitY != undefined) ? unitArgs[thicknessUnitY].label : 'Select...'}</div>


                    </Button>
                  )}
                  renderContent={() => <div className='w-32'>

                    {Object.entries(unitArgs).map((y) => {

                      var index = y[0]
                      var x = y[1]
                      return (

                        <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                          setthicknessUnit(x.value);
                          setoutlineThicknessVal(thicknessValY + x.value)

                          onChange(textDecoration.line.join(' ') + ' ' + outlineColorVal + ' ' + outlineStyleVal + ' ' + thicknessValY + x.value, 'textDecoration');


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

      )


    }


    return (
      <div>

        <Html />
      </div>

    )
  }
}


export default PGcssTextDecoration;