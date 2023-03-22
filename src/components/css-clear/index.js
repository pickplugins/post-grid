

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'


class PGcssClear extends Component {
  render() {


    const {
      val,
      onChange,



    } = this.props;


    var args = {
      none: { "label": "None", "value": "none" },
      left: { "label": "Left", "value": "left" },
      right: { "label": "Right", "value": "right" },
      both: { "label": "Both", "value": "both" },
      "inline-end": { "label": "inline-end", "value": "inline-end" },
      "inline-start": { "label": "inline-start", "value": "inline-start" },
      // inherit: { "label": "inherit", "value": "inherit" },
      // initial: { "label": "initial", "value": "initial" },
      // revert: { "label": "revert", "value": "revert" },
      // unset: { "label": "unset", "value": "unset" },

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

                  onChange(x.value, 'clear');


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


export default PGcssClear;