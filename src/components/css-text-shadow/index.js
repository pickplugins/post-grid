

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import colorsPresets from '../../colors-presets'
import { __experimentalInputControl as InputControl, ColorPalette, PanelRow, RangeControl, ToggleControl } from '@wordpress/components';
import PGDropdown from '../../components/dropdown'
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import PGColorPicker from '../../components/input-color-picker'


function Html(props) {

  if (!props.warn) {
    return null;
  }


  var valZ = (props.val == null || props.val == undefined || props.val.length == 0) ? '0px 0px 0px #000' : props.val;


  var h = (valZ != undefined) ? valZ.split(" ")[0].match(/-?\d+/g)[0] : 0;
  var v = (valZ != undefined) ? valZ.split(" ")[1].match(/-?\d+/g)[0] : 0;
  var blur = (valZ != undefined) ? valZ.split(" ")[2].match(/-?\d+/g)[0] : 0;
  var color = (valZ != undefined) ? valZ.split(" ")[3] : '#dddddd';

  const [isImportant, setImportant] = useState(valZ.includes(" !important") ? true : false);


  return (

    <div>

      {/* {JSON.stringify(valZ)}
      {JSON.stringify(h)}
      {JSON.stringify(v)}
      {JSON.stringify(blur)} */}


      <PanelRow>
        <label for="">H-Offset</label>

      </PanelRow>
      <RangeControl
        min="-100"
        max="100"
        step="1"
        value={parseInt(h)}
        onChange={(newVal) => {
          props.onChange(newVal + 'px ' + v + 'px ' + blur + 'px ' + color, 'textShadow');
        }}
      />
      <PanelRow>
        <label for="">V-Offset</label>

      </PanelRow>
      <RangeControl
        min="-100"
        max="100"
        step="1"
        value={parseInt(v)}
        onChange={(newVal) => {
          props.onChange(h + 'px ' + newVal + 'px ' + blur + 'px ' + color, 'textShadow');
        }}
      />
      <PanelRow>
        <label for="">Blur</label>

      </PanelRow>
      <RangeControl
        min="0"
        max="100"
        step="1"
        value={parseInt(blur)}
        onChange={(newVal) => {
          props.onChange(h + 'px ' + v + 'px ' + newVal + 'px ' + color, 'textShadow');
        }}
      />



      <PanelRow>
        <label for="">Color</label>


      </PanelRow>


      <PGColorPicker
        value={color}
        enableAlpha
        onChange={(newVal) => {

          props.onChange(h + 'px ' + h + 'px ' + blur + 'px ' + newVal, 'textShadow');


        }}
      />



      <ToggleControl
        help={
          isImportant
            ? 'Important (Enabled)'
            : 'Important?'
        }

        checked={isImportant}
        onChange={(arg) => {

          //console.log(arg);
          setImportant(isImportant => !isImportant)

          if (isImportant) {
            props.onChange(h + 'px' + ' ' + v + 'px' + ' ' + blur + 'px' + ' ' + color, 'textShadow');

          } else {
            props.onChange(h + 'px' + ' ' + v + 'px' + ' ' + blur + 'px' + ' ' + color + ' !important', 'textShadow');

          }


        }}
      />
    </div>

  )


}
class PGcssTextShadow extends Component {

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


export default PGcssTextShadow;