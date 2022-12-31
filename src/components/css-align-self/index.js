

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'


class PGcssAlignSelf extends Component {
  render() {


    const {
      val,
      onChange,



    } = this.props;


    var args = {
      'stretch': { "label": "stretch", "value": "stretch" },
      'center': { "label": "center", "value": "center" },
      'flex-start': { "label": "flex-start	", "value": "flex-start" },
      'flex-end': { "label": "flex-end	", "value": "flex-end" },
      'space-between': { "label": "space-between", "value": "space-between" },
      'space-around': { "label": "space-around", "value": "space-around" },
      'space-evenly': { "label": "space-evenly", "value": "space-evenly" },
    };

    //console.log(val);

    return (
      <div>

        <Dropdown
          position="bottom"
          renderToggle={({ isOpen, onToggle }) => (
            <Button
              title="Align Self"

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

                  onChange(x.value, 'alignSelf');


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


export default PGcssAlignSelf;