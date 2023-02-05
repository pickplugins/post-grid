

const { Component } = wp.element;
import { Button, Dropdown, } from '@wordpress/components'

import { __experimentalInputControl as InputControl, ColorPalette, RangeControl } from '@wordpress/components';
import { memo, useMemo, useState } from '@wordpress/element'


function Html(props) {
  if (!props.warn) {
    return null;
  }


  return (

    <div className=' mt-4'>


      <RangeControl
        value={props.val}
        min="0"
        max="1"
        step="0.01"
        onChange={(newVal) => {

          props.onChange(newVal, 'opacity');


        }}
      />
      <div>

      </div>


    </div>




  )

}


class PGcssOpacity extends Component {

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


export default PGcssOpacity;