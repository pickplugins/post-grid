

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import colorsPresets from '../../colors-presets'
import { __experimentalInputControl as InputControl, ColorPalette, PanelRow, RangeControl, SelectControl } from '@wordpress/components';
import PGDropdown from '../../components/dropdown'
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import PGColorPicker from '../../components/input-color-picker'


function Html(props) {

  if (!props.warn) {
    return null;
  }

  const ALLOWED_MEDIA_TYPES = ['image'];


  var source = (props.val != undefined) ? props.val.split(" ")[0] : '';
  var slice = (props.val != undefined) ? props.val.split(" ")[1] : 0;
  var width = (props.val != undefined) ? props.val.split(" ")[2] : 0;
  var outset = (props.val != undefined) ? props.val.split(" ")[3] : 0;
  var repeat = (props.val != undefined) ? props.val.split(" ")[4] : '';

  var imageVal = source.replace('url("', '');
  imageVal = imageVal.replace('")', '');



  return (

    <div>

      <PanelRow>
        <label for="">Source</label>

      </PanelRow>



      <div className='my-3'>
        <img src={imageVal} alt="" />
      </div>



      <MediaUploadCheck>
        <MediaUpload
          class="bg-blue-500"
          onSelect={(media) => {
            // media.id

            props.onChange('url("' + media.url + '") ' + slice + ' ' + width + ' ' + outset + ' ' + repeat, 'borderImage');


          }


          }
          onClose={() => {
          }


          }

          allowedTypes={ALLOWED_MEDIA_TYPES}
          render={({ open }) => (
            <Button className='my-3 bg-blue-500 text-white border border-solid border-gray-300 text-center w-full' onClick={open}>Open Media Library</Button>
          )}
        />
      </MediaUploadCheck>



      <PanelRow>
        <label for="">Slice</label>

      </PanelRow>
      <RangeControl
        min="0"
        max="100"
        step="1"
        value={slice}
        onChange={(newVal) => {
          props.onChange(source + ' ' + newVal + ' ' + width + ' ' + outset + ' ' + repeat, 'borderImage');

        }}
      />
      <PanelRow>
        <label for="">Width</label>

      </PanelRow>
      <RangeControl
        min="0"
        max="100"
        step="1"
        value={width}
        onChange={(newVal) => {
          props.onChange(source + ' ' + slice + ' ' + newVal + ' ' + outset + ' ' + repeat, 'borderImage');
        }}
      />
      <PanelRow>
        <label for="">Outset</label>

      </PanelRow>
      <RangeControl
        min="0"
        max="100"
        step="1"
        value={outset}
        onChange={(newVal) => {
          props.onChange(source + ' ' + slice + ' ' + width + ' ' + newVal + ' ' + repeat, 'borderImage');
        }}
      />


      <PanelRow>
        <label for="">Repeat</label>

        <SelectControl
          label=""
          value={repeat}
          options={[
            { label: 'stretch', value: 'stretch' },
            { label: 'repeat', value: 'repeat' },
            { label: 'round', value: 'round' },
            { label: 'space', value: 'space' },

          ]}
          onChange={
            (newVal) => {
              props.onChange(source + ' ' + slice + ' ' + width + ' ' + outset + ' ' + newVal, 'borderImage');

            }
          }
        />
      </PanelRow>





    </div>

  )


}
class PGcssBorderImage extends Component {

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


export default PGcssBorderImage;