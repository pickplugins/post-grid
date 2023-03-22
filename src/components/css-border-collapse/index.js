

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'


class PGcssBorderCollapse extends Component {
  render() {


    const {
      val,
      onChange,



    } = this.props;


    var args = [
      { "label": "separate", "value": "separate" },
      { "label": "collapse", "value": "collapse" },
      { "label": "initial", "value": "initial" },
      { "label": "inherit", "value": "inherit" },
      { "label": "revert", "value": "revert" },
      { "label": "unset", "value": "unset" },
    ];


    return (
      <div>

        <Dropdown
          position="bottom"
          renderToggle={({ isOpen, onToggle }) => (
            <Button

              onClick={onToggle}
              aria-expanded={isOpen}
            >
              <div className=" ">{val ? val : 'Select...'}</div>


            </Button>
          )}
          renderContent={() => <div className='w-32'>

            {args.map((x) => {

              return (

                <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                  onChange(x.value, 'borderCollapse');


                }}>

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


export default PGcssBorderCollapse;