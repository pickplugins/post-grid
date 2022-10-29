

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'


class PGcssBackgroundPosition extends Component {
  render() {


    const {
      val,
      onChange,



    } = this.props;


    var args = [
      { label: 'left top', value: 'left top' },
      { label: 'left center', value: 'left center' },
      { label: 'left bottom', value: 'left bottom' },
      { label: 'right top', value: 'right top' },
      { label: 'right center', value: 'right center' },
      { label: 'right bottom', value: 'right bottom' },
      { label: 'center top', value: 'center top' },
      { label: 'center center', value: 'center center' },
      { label: 'center bottom', value: 'center bottom' },

    ];

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
              <div className=" ">{val ? val : 'Select...'}</div>


            </Button>
          )}
          renderContent={() => <div className='w-32'>

            {args.map((x) => {


              return (

                <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                  onChange(x.value, 'backgroundPosition');


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


export default PGcssBackgroundPosition;