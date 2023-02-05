

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import colorsPresets from '../../colors-presets'
import { __experimentalInputControl as InputControl, ColorPalette, PanelRow, RangeControl } from '@wordpress/components';
import PGDropdown from '../../components/dropdown'
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import PGColorPicker from '../../components/input-color-picker'


function Html(props) {

  if (!props.warn) {
    return null;
  }

  var h = (props.val != undefined) ? props.val.split(" ")[0].match(/\d+/g)[0] : 0;
  var v = (props.val != undefined) ? props.val.split(" ")[1].match(/\d+/g)[0] : 0;
  var blur = (props.val != undefined) ? props.val.split(" ")[2].match(/\d+/g)[0] : 0;
  var spread = (props.val != undefined) ? props.val.split(" ")[3].match(/\d+/g)[0] : 0;
  var color = (props.val != undefined) ? props.val.split(" ")[4] : '#dddddd';



  return (

    <div>

      <PanelRow>
        <label for="">H-Offset</label>

      </PanelRow>
      <RangeControl
        min="-100"
        max="100"
        step="1"
        value={h}
        onChange={(newVal) => {
          props.onChange(newVal + 'px ' + v + 'px ' + blur + 'px ' + spread + 'px ' + color, 'boxShadow');
        }}
      />
      <PanelRow>
        <label for="">V-Offset</label>

      </PanelRow>
      <RangeControl
        min="-100"
        max="100"
        step="1"
        value={v}
        onChange={(newVal) => {
          props.onChange(h + 'px ' + newVal + 'px ' + blur + 'px ' + spread + 'px ' + color, 'boxShadow');
        }}
      />
      <PanelRow>
        <label for="">Blur</label>

      </PanelRow>
      <RangeControl
        min="0"
        max="100"
        step="1"
        value={blur}
        onChange={(newVal) => {
          props.onChange(h + 'px ' + v + 'px ' + newVal + 'px ' + spread + 'px ' + color, 'boxShadow');
        }}
      />
      <PanelRow>
        <label for="">Spread</label>

      </PanelRow>
      <RangeControl
        min="0"
        max="100"
        step="1"
        value={spread}
        onChange={(newVal) => {
          props.onChange(h + 'px ' + v + 'px ' + blur + 'px ' + newVal + 'px ' + color, 'boxShadow');
        }}
      />


      <PanelRow>
        <label for="">Color</label>


      </PanelRow>


      <PGColorPicker
        value={color}
        enableAlpha
        onChange={(newVal) => {

          props.onChange(h + 'px ' + h + 'px ' + blur + 'px ' + spread + 'px ' + newVal, 'boxShadow');


        }}
      />


    </div>

  )


}
class PGcssBoxShadow extends Component {

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


    const {
      val,
      onChange,



    } = this.props;








    return (
      <div>

        <Html val={val} onChange={onChange} warn={this.state.showWarning} />
      </div>

    )
  }
}


export default PGcssBoxShadow;