

const { Component } = wp.element;
import { Button, Dropdown, ColorPalette, PanelRow, __experimentalInputControl as InputControl, Popover, ToggleControl } from '@wordpress/components'

import colorsPresets from '../../colors-presets'


import { memo, useMemo, useState, useRef, useEffect, useCallback } from '@wordpress/element'


function Html(props) {
  if (!props.warn) {
    return null;
  }

  const [valArgs, setValArgs] = useState(props.val.split(" "));
  const [val, setval] = useState(valArgs[0]);

  const [isImportant, setImportant] = useState((valArgs[1] == undefined) ? false : true);


  return (
    <div >


      <Popover position="bottom right">
        <div className='p-2'>

          <ToggleControl

            label={
              isImportant
                ? 'Important (Enabled)'
                : 'Important?'
            }

            checked={isImportant}
            onChange={(arg) => {

              console.log(valArgs);
              console.log(isImportant);
              console.log(val);

              setImportant(isImportant => !isImportant)

              if (isImportant) {
                props.onChange(val, 'backgroundColor');

              } else {
                props.onChange(val + ' !important', 'backgroundColor');

              }


            }}
          />

          <ColorPalette
            value={val}
            colors={colorsPresets}

            enableAlpha
            onChange={(newVal) => {
              //props.onChange(newVal, 'backgroundColor');

              console.log(valArgs);
              console.log(isImportant);
              console.log(val);

              setval(newVal)

              if (isImportant) {
                props.onChange(newVal + ' !important', 'backgroundColor');

              } else {
                props.onChange(newVal, 'backgroundColor');

              }
            }}
          />
        </div>
      </Popover>


    </div>
  );
}


class PGcssBackgroundColor extends Component {


  constructor(props) {
    super(props);
    this.state = { showWarning: false };
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
      enableAlpha,
      onChange,
      label,


    } = this.props;

    console.log(val)

    var colorVal = val.replace(' !important', '');



    var placeholderStyle = {
      backgroundImage: 'repeating-linear-gradient(45deg,#e0e0e0 25%,transparent 0,transparent 75%,#e0e0e0 0,#e0e0e0),repeating-linear-gradient(45deg,#e0e0e0 25%,transparent 0,transparent 75%,#e0e0e0 0,#e0e0e0)',
      backgroundPosition: '0 0,25px 25px',
      backgroundSize: '50px 50px',
      boxShadow: 'inset 0 0 0 1px rgb(0 0 0 / 20%)',
      cursor: 'pointer',
    };

    var defaultbtnStyle = {
      backgroundImage: 'repeating-linear-gradient(45deg,#e0e0e0 25%,transparent 0,transparent 75%,#e0e0e0 0,#e0e0e0),repeating-linear-gradient(45deg,#e0e0e0 25%,transparent 0,transparent 75%,#e0e0e0 0,#e0e0e0)',
      backgroundPosition: '0 0,25px 25px',
      backgroundSize: '50px 50px',
      boxShadow: 'inset 0 0 0 1px rgb(0 0 0 / 20%)',
      cursor: 'pointer',
    };

    var btnStyle = {
      backgroundColor: val,
      boxShadow: 'inset 0 0 0 1px rgb(0 0 0 / 20%)',
      cursor: 'pointer',
    };


    return (
      <div>
        <div className='my-4'>

          <div className='relative h-10' style={placeholderStyle}>
            <div className='absolute w-full  h-full top-0 left-0 text-center' style={btnStyle} onClick={this.handleToggleClick}>

              <span className='w-full text-center left-0 top-1/2 -translate-y-1/2	 absolute'>{(val == undefined) ? 'Set Color' : colorVal}</span>

            </div>

          </div>




        </div>
        <Html enableAlpha={enableAlpha} val={val} onChange={onChange} warn={this.state.showWarning} />



      </div>
    );
  }

}


export default PGcssBackgroundColor;