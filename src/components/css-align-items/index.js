

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'


class PGcssAlignItems extends Component {
  render() {


    const {
      val,
      onChange,



    } = this.props;


    var args = [
      { "label": "Stretch", "value": "stretch" },
      { "label": "Center", "value": "center" },
      { "label": "Flex start	", "value": "flex-start" },
      { "label": "Flex end	", "value": "flex-end" },
      { "label": "Baseline", "value": "baseline" },
      { "label": "end", "value": "end" },
      { "label": "normal", "value": "normal" },
      { "label": "revert", "value": "revert" },
      { "label": "self-end", "value": "self-end" },
      { "label": "self-start", "value": "self-start" },
      { "label": "start", "value": "start" },
      { "label": "unset", "value": "unset" },
      { "label": "inherit", "value": "inherit" },
      { "label": "initial", "value": "initial" },


    ];


    return (
      <div>

        <Dropdown
          position="bottom"
          renderToggle={({ isOpen, onToggle }) => (
            <Button
              title="Align Items"

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

                  onChange(x.value, 'alignItems');


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


export default PGcssAlignItems;