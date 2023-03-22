

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'


class PGcssFontWeight extends Component {
  render() {


    const {
      val,
      onChange,



    } = this.props;


    var args = {

      'normal': { "label": "normal", "value": "normal" },
      'bold': { "label": "bold", "value": "bold" },
      'bolder': { "label": "bolder", "value": "bolder" },
      'lighter': { "label": "lighter", "value": "lighter" },
      '100': { "label": "100", "value": "100" },
      '200': { "label": "200", "value": "200" },
      '300': { "label": "300", "value": "300" },
      '400': { "label": "400", "value": "400" },
      '500': { "label": "500", "value": "500" },
      '600': { "label": "600", "value": "600" },
      '700': { "label": "700", "value": "700" },
      '800': { "label": "800", "value": "800" },
      '900': { "label": "900", "value": "900" },

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

                  onChange(x.value, 'fontWeight');


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


export default PGcssFontWeight;