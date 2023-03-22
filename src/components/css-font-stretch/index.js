

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'


class PGcssFontStretch extends Component {
  render() {


    const {
      val,
      onChange,



    } = this.props;


    var args = {
      'ultra-condensed': { "label": "ultra-condensed", "value": "ultra-condensed" },
      'extra-condensed': { "label": "extra-condensed", "value": "extra-condensed" },
      'condensed': { "label": "condensed", "value": "condensed" },
      'semi-condensed': { "label": "semi-condensed", "value": "semi-condensed" },
      'normal': { "label": "normal", "value": "normal" },
      'semi-expanded': { "label": "semi-expanded", "value": "semi-expanded" },
      'expanded': { "label": "expanded", "value": "expanded" },
      'extra-expanded': { "label": "extra-expanded", "value": "extra-expanded" },
      'ultra-expanded': { "label": "ultra-expanded", "value": "ultra-expanded" },

    };


    return (
      <div>

        <Dropdown
          position="bottom"
          renderToggle={({ isOpen, onToggle }) => (
            <Button
              title="Clear"

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

                  onChange(x.value, 'fontStretch');


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


export default PGcssFontStretch;