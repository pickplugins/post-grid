

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'


class PGcssBackgroundAttachment extends Component {
  render() {


    const {
      val,
      onChange,



    } = this.props;


    var args = {
      scroll: { "label": "Scroll", "value": "scroll" },
      fixed: { "label": "Fixed", "value": "fixed" },
      local: { "label": "Local", "value": "local" },

      inherit: { "label": "inherit", "value": "inherit" },
      initial: { "label": "initial", "value": "initial" },
      revert: { "label": "revert", "value": "revert" },
      unset: { "label": "unset", "value": "unset" },

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

                  onChange(x.value, 'backgroundAttachment');


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


export default PGcssBackgroundAttachment;