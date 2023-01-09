

const { Component } = wp.element;
import { Button, Dropdown, ColorPalette, PanelRow, __experimentalInputControl as InputControl, Popover } from '@wordpress/components'



import { memo, useMemo, useState, useRef, useEffect , useCallback } from '@wordpress/element'
import BreakpointSwitch from '../../components/breakpoint-switch'
import breakPoints from '../../breakpoints'
import useControlledState from './use-controlled-state';





class PGColorPicker extends Component {



  render() {

    var {
      value,
      colors,
      enableAlpha,
      onChange,
      label,
      initialOpen,


    } = this.props;





const Child2 = ({ id, setValue,value, onChangeX, enablePicker }) => {
  useEffect(() => console.log(`${id} rendered`));
  return (
    <div>

      {id}: <input type="text" onChange={(e) => {
setValue(e.target.value);
//onChangeX('#bc4242');
}} />


<div>enablePicker: 
{JSON.stringify(enablePicker)}

</div>

{
            enablePicker && (
              <Popover position="bottom right">
                <div className='p-2'>
                  <ColorPalette
                    value={value}
                    colors={colors}
                    enableAlpha
                    onChange={(newVal) => {
                      //onChange(newVal);
setValue(newVal);
                    }}
                  />
                </div>
              </Popover>
            )
          }


    </div>
  );
};

const Child2wMemo = memo(Child2);

const Parent = () => {
  const [value, setValue] = useState("");
  const [enablePicker, setenablePicker] = useState(false);

    useEffect(() => {

      console.log(value);
//onChange(value)
      
    }, [value]);



  return (
    <>

{JSON.stringify(value)}

      <Child2wMemo id="Child 2 with Memo" setValue={setValue} onChangeX={onChange} value={value} enablePicker={enablePicker}  />

<div onClick={ev=>{

setenablePicker(prev => !prev)

}}> Picker Open</div>

    </>
  );
};





    const Html = ()=> {





      const [enablePicker, setenablePicker] = useState(initialOpen);





//console.log(enablePickerX);



      var defaultbtnStyle = {
        backgroundImage: 'repeating-linear-gradient(45deg,#e0e0e0 25%,transparent 0,transparent 75%,#e0e0e0 0,#e0e0e0),repeating-linear-gradient(45deg,#e0e0e0 25%,transparent 0,transparent 75%,#e0e0e0 0,#e0e0e0)',
        backgroundPosition: '0 0,25px 25px',
        backgroundSize: '50px 50px',
        boxShadow: 'inset 0 0 0 1px rgb(0 0 0 / 20%)',
        padding: '10px 35px',
      };

      var btnStyle = {
        backgroundColor: value,
        boxShadow: 'inset 0 0 0 1px rgb(0 0 0 / 20%)',
        padding: '10px 35px',

      };




      return (

        <div className='my-4'>


<Parent enablePicker={enablePicker} onChange={ onChange}/>

          <div className='flex justify-between items-center mb-3'>
            {label}
          </div>


          <div className='p-2 px-3' style={(value == undefined) ? defaultbtnStyle : btnStyle} onClick={ev => {

            //ev.preventDefault();

            setenablePicker(prev => !prev);




          }}>{(value == undefined) ? 'Set Color' : value}</div>

          {
            enablePicker && (
              <Popover position="bottom right">


                <div className='p-2'>

                  <ColorPalette
                    value={value}
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



      <Parent />


    )
  }
}


export default PGColorPicker;