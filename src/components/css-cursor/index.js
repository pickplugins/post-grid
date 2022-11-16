

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'


class PGcssCursor extends Component {
  render() {


    const {
      val,
      onChange,



    } = this.props;


    var args = {
      none: { "label": "auto", "value": "auto" },
      pointer: { "label": "pointer", "value": "pointer" },
      progress: { "label": "progress", "value": "progress" },

    };


    console.log(val);


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
              <div className=" ">{args[val] != undefined ? args[val].label : 'Select...'}</div>


            </Button>
          )}
          renderContent={() => <div className='w-32'>

            {Object.entries(args).map((args) => {

              var index = args[0]
              var x = args[1]
              return (

                <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                  onChange(x.value, 'display');


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


export default PGcssCursor;