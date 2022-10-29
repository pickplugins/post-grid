

const { Component, RawHTML } = wp.element;
import { Panel, PanelRow, PanelItem, Button, Dropdown, SelectControl, Popover, Spinner } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';
import { link, linkOff } from "@wordpress/icons";
import apiFetch from '@wordpress/api-fetch';
var myStore = wp.data.select('postgrid-shop');
import breakPoints from '../../breakpoints'
import IconToggle from '../../components/icon-toggle'
import colorsPresets from '../../colors-presets'



class PGcssBackgroundColor extends Component {


  render() {

    var {
      val,
      onChange,


    } = this.props;






    function Html() {

      const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
      const {
        __experimentalSetPreviewDeviceType: setPreviewDeviceType,

      } = wp.data.dispatch('core/edit-post')

      var breakPointList = [];

      for (var x in breakPoints) {

        var item = breakPoints[x];
        breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

      }


      return (

        <div>






          <ColorPalette
            value={val}
            colors={colorsPresets}
            enableAlpha
            onChange={(newVal) => {

              console.log(newVal);
              onChange(newVal, 'bgColor');


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


export default PGcssBackgroundColor;