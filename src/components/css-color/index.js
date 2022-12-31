

const { Component, RawHTML } = wp.element;
import { Panel, PanelRow, PanelItem, Button, Dropdown, SelectControl, Popover, Spinner } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';
import { link, linkOff } from "@wordpress/icons";
import apiFetch from '@wordpress/api-fetch';

import colorsPresets from '../../colors-presets'



class PGcssColor extends Component {


  render() {

    var {
      val,
      onChange,


    } = this.props;






    function Html() {




      return (

        <div>


          <ColorPalette
            value={val}
            colors={colorsPresets}
            enableAlpha
            onChange={(newVal) => {

              //console.log(newVal);
              onChange(newVal, 'color');


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


export default PGcssColor;