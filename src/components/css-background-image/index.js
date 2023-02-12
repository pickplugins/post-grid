

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import colorsPresets from '../../colors-presets'
import { __experimentalInputControl as InputControl, ColorPalette, PanelRow } from '@wordpress/components';
import PGDropdown from '../../components/dropdown'
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';



function Html(props) {

  if (!props.warn) {
    return null;
  }

  var typeArgs = {
    url: { label: 'Image URL', id: 'url' },
    conicGradient: { label: 'Conic Gradient', id: 'conicGradient' },
    linearGradient: { label: 'Linear Gradient', id: 'linearGradient' },
    radialGradient: { label: 'Radial Gradient', id: 'radialGradient' },
    repeatingConicGradient: { label: 'Repeating Conic Gradient', id: 'repeatingConicGradient' },
    repeatingLinearGradient: { label: 'Repeating Linear Gradient', id: 'repeatingLinearGradient' },
    repeatingRadialGradient: { label: 'Repeating Radial Gradient', id: 'repeatingRadialGradient' },



  }




  const [type, setType] = useState('url');
  const [imageUrl, setimageUrl] = useState('');


  var image = (props.val != undefined) ? props.val : '';





  var imageVal = image.replace('url("', '');
  imageVal = imageVal.replace('")', '');


  if (image.includes("url")) {
    //setType('url');


  }
  else if (image.includes("conic-gradient")) {
    //setType('conicGradient');

  }

  else if (image.includes("linear-gradient")) {
    //setType('linearGradient');
  }

  else if (image.includes("radial-gradient")) {
    //setType('radialGradient');
  }

  else if (image.includes("repeating-conic-gradient")) {
    //setType('repeatingConicGradient');
  }
  else if (image.includes("repeating-linear-gradient")) {
    // setType('repeatingLinearGradient');
  }

  else if (image.includes("repeating-radial-gradient")) {
    //setType('repeatingRadialGradient');
  }









  const ALLOWED_MEDIA_TYPES = ['image'];

  return (

    <div>
      {/* 
      <PanelRow>
        <PGDropdown position="bottom right" variant="secondary" options={typeArgs} buttonTitle={(typeArgs[type] != undefined) ? typeArgs[type].label : 'Background Type'}
          onChange={(option, index) => {


            if (option.id == 'conicGradient') {
              props.onChange('conic-gradient(red, yellow, green)', 'backgroundImage');
            }
            else if (option.id == 'linearGradient') {
              props.onChange('linear-gradient(to bottom right, red , blue)', 'backgroundImage');
            } else if (option.id == 'radialGradient') {
              props.onChange('conic-gradient(red, yellow, green)', 'backgroundImage');
            } else if (option.id == 'radialGradient') {
              props.onChange('radial-gradient(red, yellow, green)', 'backgroundImage');
            } else if (option.id == 'repeatingConicGradient') {
              props.onChange('repeating-conic-gradient(red 10%, yellow 20%)', 'backgroundImage');
            } else if (option.id == 'repeatingLinearGradient') {
              props.onChange('repeating-linear-gradient(red, yellow 10%, green 20%)', 'backgroundImage');
            } else if (option.id == 'repeatingRadialGradient') {
              props.onChange('repeating-radial-gradient(red, yellow 10%, green 15%)', 'backgroundImage');
            }







            setType(option.id);
          }} values=""></PGDropdown>
      </PanelRow> */}






      <div className='my-3'>
        <img src={imageVal} alt="" />
      </div>



      <MediaUploadCheck>
        <MediaUpload
          class="bg-blue-500"
          onSelect={(media) => {
            // media.id

            props.onChange('url("' + media.url + '")', 'backgroundImage');


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




    </div>

  )


}




class PGcssBackgroundImage extends Component {

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


export default PGcssBackgroundImage;