

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'


class PGcssBoxSizing extends Component {
  render() {


    const {
      val,
      onChange,



    } = this.props;


    var args = {
      'border-box': { "label": "border-box", "value": "border-box" },
      'content-box': { "label": "content-box", "value": "content-box" },
      // none: { "label": "none", "value": "none" },
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
              title="Box Sizing"

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

                  onChange(x.value, 'boxSizing');


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


export default PGcssBoxSizing;