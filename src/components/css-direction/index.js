

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'


class PGcssDirection extends Component {
  render() {


    const {
      val,
      onChange,



    } = this.props;


    var args = {
      ltr: { "label": "ltr", "value": "ltr" },
      rtl: { "label": "rtl", "value": "rtl" },
      revert: { "label": "revert", "value": "revert" },
      unset: { "label": "unset", "value": "unset" },
      initial: { "label": "initial", "value": "initial" },
      inherit: { "label": "inherit", "value": "inherit" },
    };

    //console.log(val);

    return (
      <div>

        <Dropdown
          position="bottom"
          renderToggle={({ isOpen, onToggle }) => (
            <Button
              title="Align Content"

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

                  onChange(x.value, 'direction');


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


export default PGcssDirection;