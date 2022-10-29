

const { Component, RawHTML } = wp.element;
import { Panel, PanelRow, PanelItem, Button, Dropdown, SelectControl, Popover, Spinner } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';
import { link, linkOff } from "@wordpress/icons";
import apiFetch from '@wordpress/api-fetch';
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';

import colorsPresets from '../../colors-presets'



class PGcssMargin extends Component {


  render() {

    var {
      val,
      onChange,


    } = this.props;






    function Html() {




      return (

        <div>

          <BoxControl
            label=""
            values={val}
            onChange={(nextValues) => {
              onChange(nextValues, 'margin');
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


export default PGcssMargin;