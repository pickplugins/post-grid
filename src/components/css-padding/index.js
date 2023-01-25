

const { Component, RawHTML } = wp.element;
import { Panel, PanelRow, PanelItem, Button, Dropdown, SelectControl, Popover, Spinner } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';
import { link, linkOff } from "@wordpress/icons";
import apiFetch from '@wordpress/api-fetch';
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';

import colorsPresets from '../../colors-presets'



class PGcssPadding extends Component {


  render() {

    var {
      val,
      onChange,


    } = this.props;






    function Html() {

      console.log(val);


      var valParts = (val != undefined) ? val.split(" ") : ['5px', '5px', '5px', '5px'];

      var topX = valParts[0];
      var rightX = valParts[1];
      var bottomX = valParts[2];
      var leftX = valParts[3];


      const [valX, setvalX] = useState({ top: topX, right: rightX, bottom: bottomX, left: leftX });


      return (

        <div>

          <BoxControl
            label=""
            values={valX}
            onChange={(nextValues) => {

              console.log(val);
              console.log(nextValues);

              setvalX({ top: nextValues.top, right: nextValues.right, bottom: nextValues.bottom, left: nextValues.left })
              //nextValues.top + ' ' + nextValues.right + ' ' + nextValues.bottom + ' ' + nextValues.left

              onChange(nextValues.top + ' ' + nextValues.right + ' ' + nextValues.bottom + ' ' + nextValues.left, 'padding');
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


export default PGcssPadding;