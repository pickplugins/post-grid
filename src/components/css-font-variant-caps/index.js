

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'


class PGcssFontVariantCaps extends Component {
  render() {


    const {
      val,
      onChange,



    } = this.props;


    var args = {

      'normal': { "label": "normal", "value": "normal" },
      'small-caps': { "label": "small-caps", "value": "small-caps" },
      'all-small-caps': { "label": "all-small-caps", "value": "all-small-caps" },
      'petite-caps': { "label": "petite-caps", "value": "petite-caps" },
      'all-petite-caps': { "label": "all-petite-caps", "value": "all-petite-caps" },
      'unicase': { "label": "unicase", "value": "unicase" },
      'titling-caps': { "label": "titling-caps", "value": "titling-caps" },
      'initial': { "label": "initial", "value": "initial" },
      'inherit': { "label": "inherit", "value": "inherit" },
      'unset': { "label": "unset", "value": "unset" },


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

                  onChange(x.value, 'fontVariantCaps');


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


export default PGcssFontVariantCaps;