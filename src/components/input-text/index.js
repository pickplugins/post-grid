

const { Component } = wp.element;
import { Button, Dropdown, } from '@wordpress/components'
import { useState, } from '@wordpress/element'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';



function Html(props) {
  if (!props.warn) {
    return null;
  }




  return (

    <div >

      <input
        className={props.className}
        value={props.val}
        type="text"
        placeholder={props.placeholder}

        onChange={(newVal) => {
          props.onChange(newVal);

        }}
      />






    </div>




  )

}


class PGinputText extends Component {

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
      value,
      placeholder,
      className,

      onChange,


    } = this.props;







    return (


      <Html val={value} placeholder={placeholder} className={className} onChange={onChange} warn={this.state.showWarning} />


    )
  }
}


export default PGinputText;