

const { Component } = wp.element;
import { Button, Dropdown, ColorPalette, PanelRow, __experimentalInputControl as InputControl, Popover } from '@wordpress/components'

import { memo, useMemo, useState } from '@wordpress/element'
import BreakpointSwitch from '../../components/breakpoint-switch'
import breakPoints from '../../breakpoints'





class PGColorPicker extends Component {

  constructor(props) {



    super(props);


  }

  render() {

    var {
      val,
      colors,
      enableAlpha,
      onChange,
      label,
      enablePickerX



    } = this.props;

    console.log(this.props);



    function Html() {



      const [enablePicker, setenablePicker] = useState(false);

      //console.log('enablePicker: ' + enablePicker);


      var defaultbtnStyle = {
        backgroundImage: 'repeating-linear-gradient(45deg,#e0e0e0 25%,transparent 0,transparent 75%,#e0e0e0 0,#e0e0e0),repeating-linear-gradient(45deg,#e0e0e0 25%,transparent 0,transparent 75%,#e0e0e0 0,#e0e0e0)',
        backgroundPosition: '0 0,25px 25px',
        backgroundSize: '50px 50px',
        boxShadow: 'inset 0 0 0 1px rgb(0 0 0 / 20%)',
        padding: '10px 35px',
      };

      var btnStyle = {
        backgroundColor: val,
        boxShadow: 'inset 0 0 0 1px rgb(0 0 0 / 20%)',
        padding: '10px 35px',

      };




      return (

        <div className='flex justify-between items-center'>

          <div>{label}</div>


          <div className='p-2 px-3' style={(val == undefined) ? defaultbtnStyle : btnStyle} onClick={ev => {

            setenablePicker(prev => !prev);
            //this.setState({ enablePickerX: (this.state.enablePickerX) ? false : true });
            //console.log(enablePickerX);

            //enablePickerX = true;

          }}>{(val == undefined) ? 'Set Color' : val}</div>

          {
            enablePicker && (
              <Popover position="bottom right">


                <div className='p-2'>

                  <ColorPalette
                    value={val}
                    colors={colors}
                    enableAlpha
                    onChange={(newVal) => {
                      onChange(newVal);
                    }}
                  />
                </div>

              </Popover>

            )
          }






        </div>




      )

    }


    return (


      <Html />


    )
  }
}


export default PGColorPicker;