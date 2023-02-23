

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'


class PGcssBackgroundBlendMode extends Component {
  render() {


    const {
      val,
      onChange,



    } = this.props;


    var args = {
      normal: { "label": "Normal", "value": "normal" },
      multiply: { "label": "Multiply", "value": "multiply" },
      screen: { "label": "Screen", "value": "screen" },
      overlay: { "label": "Overlay", "value": "overlay" },
      darken: { "label": "Darken", "value": "darken" },
      lighten: { "label": "Lighten", "value": "lighten" },
      'color-dodge': { "label": "Color dodge", "value": "color-dodge" },
      saturation: { "label": "Saturation", "value": "saturation" },
      color: { "label": "Color", "value": "color" },
      luminosity: { "label": "Luminosity", "value": "luminosity" },
      exclusion: { "label": "exclusion", "value": "exclusion" },
      hue: { "label": "hue", "value": "hue" },


      'color-burn': { "label": "color-burn", "value": "color-burn" },
      'difference': { "label": "difference", "value": "difference" },
      'hard-light': { "label": "hard-light", "value": "hard-light" },
      'soft-light': { "label": "soft-light", "value": "soft-light" },
      inherit: { "label": "inherit", "value": "inherit" },
      initial: { "label": "initial", "value": "initial" },
      revert: { "label": "revert", "value": "revert" },
      unset: { "label": "unset", "value": "unset" },




    };


    return (
      <div>

        <Dropdown
          position="bottom"
          renderToggle={({ isOpen, onToggle }) => (
            <Button
              title="Background Blend Mode"

              onClick={onToggle}
              aria-expanded={isOpen}
            >
              <div className=" ">{val ? args[val].label : 'Select...'}</div>


            </Button>
          )}
          renderContent={() => <div className='w-32'>

            {Object.entries(args).map((args) => {

              var index = args[0]
              var x = args[1]
              return (

                <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                  onChange(x.value, 'backgroundBlendMode');


                }}>

                  {!x.value && (

                    <div>Reset</div>

                  )}

                  {x.value && (

                    <>{x.label}</>

                  )}

                </div>

              )

            })}
          </div>}
        />
      </div>

    )
  }
}


export default PGcssBackgroundBlendMode;