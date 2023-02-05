

const { Component } = wp.element;
import { Button, Dropdown, } from '@wordpress/components'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';
import { memo, useMemo, useState } from '@wordpress/element'



function Html(props) {
  if (!props.warn) {
    return null;
  }



  return (

    <div className='flex mt-4'>


      <InputControl
        value={val}
        type="number"
        onChange={(newVal) => {

          props.onChange(newVal, 'zIndex');


        }}
      />
      <div>

      </div>


    </div>




  )

}


class PGcssZIndex extends Component {

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


export default PGcssZIndex;