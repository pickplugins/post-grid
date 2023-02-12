

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


  const [type, setType] = useState('url');
  const [imageUrl, setimageUrl] = useState('');



  if (props.val != undefined && props.val.includes("url")) {
    setType('url');

    var imageVal = props.val.replace('url("', '');
    imageVal = imageVal.replace('")', '');

    setimageUrl(imageVal);

  }

  if (props.val != undefined && props.val.includes("conic-gradient")) {
    setType('conicGradient');
    var imageVal = props.val.replace('conic-gradient("', '');
    imageVal = imageVal.replace('")', '');




  }

  if (props.val != undefined && props.val.includes("linear-gradient")) {
    setType('linearGradient');
  }

  if (props.val != undefined && props.val.includes("radial-gradient")) {
    setType('radialGradient');
  }

  if (props.val != undefined && props.val.includes("repeating-conic-gradient")) {
    setType('repeatingConicGradient');
  }
  if (props.val != undefined && props.val.includes("repeating-linear-gradient")) {
    setType('repeatingLinearGradient');
  }

  if (props.val != undefined && props.val.includes("repeating-radial-gradient")) {
    setType('repeatingRadialGradient');
  }



  const ALLOWED_MEDIA_TYPES = ['image'];

  var typeArgs = {
    url: { label: 'Image URL', id: 'url' },
    conicGradient: { label: 'Conic Gradient', id: 'conicGradient' },
    linearGradient: { label: 'Linear Gradient', id: 'linearGradient' },
    radialGradient: { label: 'Radial Gradient', id: 'radialGradient' },
    repeatingConicGradient: { label: 'Repeating Conic Gradient', id: 'repeatingConicGradient' },
    repeatingLinearGradient: { label: 'Repeating Linear Gradient', id: 'repeatingLinearGradient' },
    repeatingRadialGradient: { label: 'Repeating Radial Gradient', id: 'repeatingRadialGradient' },



  }







  return (

    <div>










      <PanelRow>
        <PGDropdown position="bottom right" variant="secondary" options={typeArgs} buttonTitle={(typeArgs[type] != undefined) ? typeArgs[type].label : 'Background Type'}
          onChange={(option, index) => {

            setType(option.id);
          }} values=""></PGDropdown>
      </PanelRow>


      {type == 'url' && (



        <>
          <div className='my-3'>
            <img src={imageUrl} alt="" />
          </div>

          <MediaUploadCheck>
            <MediaUpload
              class="bg-blue-500"
              onSelect={(media) => {
                // media.id
                props.onChange(' url("' + media.url + '")', 'backgroundImage');
              }}
              onClose={() => { }}

              allowedTypes={ALLOWED_MEDIA_TYPES}
              render={({ open }) => (
                <Button className='my-3 bg-blue-500 text-white border border-solid border-gray-300 text-center w-full' onClick={open}>Open Media Library</Button>
              )}
            />
          </MediaUploadCheck>
        </>
      )}




      {type == 'conicGradient' && (
        <></>
      )}
      {type == 'linearGradient' && (
        <></>
      )}

      {type == 'radialGradient' && (
        <></>
      )}

      {type == 'repeatingConicGradient' && (
        <></>
      )}

      {type == 'repeatingLinearGradient' && (
        <></>
      )}

      {type == 'repeatingRadialGradient' && (
        <></>
      )}







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