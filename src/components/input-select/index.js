

const { Component } = wp.element;
import { Button, Dropdown, } from '@wordpress/components'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';
import { memo, useMemo, useState } from '@wordpress/element'




class PGinputSelect extends Component {


  render() {

    var {
      value,
      options,
      multiple,
      className,
      onChange,


    } = this.props;

    multiple = multiple == undefined ? false : multiple;


    function Html() {



      return (

        <>

          {multiple == true && (<>
            <select className={` ${className}`}
              multiple
              onChange={(event) => {

                var options = event.target.options;

                var selected = [];

                for (var i = 0, l = options.length; i < l; i++) {
                  if (options[i].selected) {
                    selected.push(options[i].value);

                  }
                }

                onChange(selected);
              }}
            >
              {options.map((x, index) => {

                var isSelected = value?.includes(x.value)

                return (
                  <option value={x.value} key={index}

                    selected={isSelected}

                  >{x.label}</option>
                )
              })}
            </select>
          </>)}


          {multiple == false && (


            <select
              className={` ${className}`}
              onChange={(event) => {
                var currentVal = options[event.target.options.selectedIndex].value;
                onChange(currentVal);
              }}
            >
              {options.map((x, index) => {


                var selected = value == x.value ? true : false;

                return (
                  <option value={x.value} selected={selected} key={index}
                  >{x.label}</option>
                )
              })}
            </select>
          )}




        </>




      )

    }


    return (


      <Html />


    )
  }
}


export default PGinputSelect;