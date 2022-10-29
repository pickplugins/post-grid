

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'


class PGcssAlignItems extends Component {
  render() {


    const {
      val,
      onChange,



    } = this.props;


    var args = [
      { "label": "stretch", "value": "stretch" },
      { "label": "center", "value": "center" },
      { "label": "flex-start	", "value": "flex-start" },
      { "label": "flex-end	", "value": "flex-end" },
      { "label": "baseline", "value": "baseline" },
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