

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'


class PGcssBackgroundRepeat extends Component {
  render() {


    const {
      val,
      onChange,



    } = this.props;


    var args = {
      repeat: { "label": "repeat", "value": "repeat" },
      'repeat-x': { "label": "repeat-x", "value": "repeat-x" },
      'repeat-y': { "label": "repeat-y", "value": "repeat-y" },
      'no-repeat': { "label": "no-repeat", "value": "no-repeat" },

      space: { "label": "space", "value": "space" },
      round: { "label": "round", "value": "round" },



    }


      ;

    //console.log(val);

    return (
      <div>

        <Dropdown
          position="bottom"
          renderToggle={({ isOpen, onToggle }) => (
            <Button
              title="Background Repeat"

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

                  onChange(x.value, 'backgroundRepeat');


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


export default PGcssBackgroundRepeat;