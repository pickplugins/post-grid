

const { Component } = wp.element;
import { Button, Dropdown, } from '@wordpress/components'
import { useState, } from '@wordpress/element'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';




class PGcssContent extends Component {


  render() {

    var {
      val,
      onChange,


    } = this.props;






    function Html() {





      return (

        <div className='mt-4'>


          <InputControl
            value={val}
            type="text"
            onChange={(newVal) => {

              //setwidthVal(newVal);
              onChange(newVal, 'content');


            }}
          />

        </div>




      )

    }


    return (


      <Html />


    )
  }
}


export default PGcssContent;