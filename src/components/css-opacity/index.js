

const { Component } = wp.element;
import { Button, Dropdown, } from '@wordpress/components'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';
import { memo, useMemo, useState } from '@wordpress/element'




class PGcssOpacity extends Component {


  render() {

    var {
      val,
      onChange,


    } = this.props;






    function Html() {



      return (

        <div className='flex mt-4'>


          <InputControl
            value={val}
            type="number"
            min="0"
            max="1"
            step="0.01"
            onChange={(newVal) => {

              onChange(newVal, 'opacity');


            }}
          />
          <div>

          </div>


        </div>




      )

    }


    return (


      <Html />


    )
  }
}


export default PGcssOpacity;