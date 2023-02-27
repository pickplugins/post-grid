

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'


class PGcssVerticalAlign extends Component {
  render() {


    const {
      val,
      onChange,



    } = this.props;


    var args = {
      baseline: { "label": "Baseline", "value": "baseline" },
      'text-top': { "label": "Text Top", "value": "text-top" },
      'text-bottom': { "label": "Text Bottom", "value": "text-bottom" },
      sub: { "label": "Sub", "value": "sub" },
      super: { "label": "Super", "value": "super" },
      top: { "label": "Top", "value": "top" },
      middle: { "label": "Middle", "value": "middle" },
      bottom: { "label": "Bottom", "value": "bottom" },
      initial: { "label": "Initial", "value": "initial" },
      inherit: { "label": "Inherit", "value": "inherit" },

    }


      ;



    return (
      <div>

        <Dropdown
          position="bottom"
          renderToggle={({ isOpen, onToggle }) => (
            <Button
              title=""

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

                  onChange(x.value, 'verticalAlign');


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


export default PGcssVerticalAlign;