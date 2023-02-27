

const { Component, RawHTML } = wp.element;
import colorsPresets from '../../colors-presets'
import { __experimentalInputControl as InputControl, ColorPalette, PanelRow, RangeControl, Popover } from '@wordpress/components';
import PGColorPicker from '../../components/input-color-picker'


function Html(props) {

  if (!props.warn) {
    return null;
  }


  var valZ = (props.val == null || props.val == undefined || props.val.length == 0) ? '0px 0px 10px 5px #50547d4f' : props.val;



  var h = (valZ != undefined) ? parseInt(valZ.split(" ")[0].match(/\d+/g)[0]) : 0;
  var v = (valZ != undefined) ? parseInt(valZ.split(" ")[1].match(/\d+/g)[0]) : 0;
  var blur = (valZ != undefined) ? parseInt(valZ.split(" ")[2].match(/\d+/g)[0]) : 10;
  var spread = (valZ != undefined) ? parseInt(valZ.split(" ")[3].match(/\d+/g)[0]) : 5;
  var color = (valZ != undefined) ? valZ.split(" ")[4] : '#dddddd';



  return (

    <div>

      <PanelRow>
        <label for="">H-Offset</label>

      </PanelRow>
      <RangeControl
        min="-100"
        max="100"
        step="1"
        currentInput={h}
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





      <label for="">Color</label>

      <PGColorPicker value={color}
        colors={colorsPresets}
        enableAlpha
        onChange={(newVal) => {

          props.onChange(h + 'px ' + v + 'px ' + blur + 'px ' + spread + 'px ' + newVal, 'boxShadow');

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