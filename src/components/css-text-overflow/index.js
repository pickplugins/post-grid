

const { Component, RawHTML } = wp.element;
import { Button, Dropdown, PanelRow, __experimentalInputControl as InputControl } from '@wordpress/components'


class PGcssTextOverflow extends Component {
  render() {


    const {
      val,
      onChange,
    } = this.props;


    var args = {
      clip: { "label": "Clip", "value": "clip" },
      ellipsis: { "label": "Ellipsis", "value": "ellipsis" },
      string: { "label": "String", "value": "string" },
      initial: { "label": "initial", "value": "initial" },
      inherit: { "label": "inherit", "value": "inherit" },
    };

    console.log(typeof val);


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
              <div className=" ">{(args[val] != undefined) ? args[val].label : 'Select...'}</div>


            </Button>
          )}
          renderContent={() => <div className='w-32'>

            {Object.entries(args).map((args) => {

              var index = args[0]
              var x = args[1]
              return (

                <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                  onChange(x.value, 'textOverflow');


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



        {(val != 'clip' || val != 'ellipsis' || val != 'initial' || val != 'inherit') && (

          <PanelRow>
            <label for="">
              Custom String
            </label>
            <InputControl
              className='mr-2'
              value={val}
              onChange={(newVal) => {

                var string = '"' + newVal + '"'
                onChange(string, 'textOverflow');
              }}
            />
          </PanelRow>



        )}




      </div>

    )
  }
}


export default PGcssTextOverflow;