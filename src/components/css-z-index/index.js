

const { Component } = wp.element;
import { Button, Dropdown, } from '@wordpress/components'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';
import { memo, useMemo, useState } from '@wordpress/element'




class PGcssZIndex extends Component {


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
            onChange={(newVal) => {

              onChange(newVal, 'zIndex');


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


export default PGcssZIndex;