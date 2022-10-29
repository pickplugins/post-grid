

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'


class PGcssBackgroundBlendMode extends Component {
  render() {


    const {
      val,
      onChange,



    } = this.props;


    var args = {
      normal: { "label": "normal", "value": "normal" },
      multiply: { "label": "multiply", "value": "multiply" },
      screen: { "label": "screen", "value": "screen" },
      overlay: { "label": "overlay", "value": "overlay" },
      darken: { "label": "darken", "value": "darken" },
      lighten: { "label": "lighten", "value": "lighten" },
      'color-dodge': { "label": "color-dodge", "value": "color-dodge" },
      saturation: { "label": "saturation", "value": "saturation" },
      color: { "label": "color", "value": "color" },
      luminosity: { "label": "luminosity", "value": "luminosity" },



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