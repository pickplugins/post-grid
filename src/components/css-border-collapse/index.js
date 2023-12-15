

const { Component, RawHTML } = wp.element;
import { Button, Dropdown,ToggleControl } from '@wordpress/components'

import { useState } from '@wordpress/element'


function Html(props) {
  if (!props.warn) {
    return null;
  }

  var args = [
    { "label": "separate", "value": "separate" },
    { "label": "collapse", "value": "collapse" },
    { "label": "initial", "value": "initial" },
    { "label": "inherit", "value": "inherit" },
    { "label": "revert", "value": "revert" },
    { "label": "unset", "value": "unset" },
  ];

  const [valArgs, setValArgs] = useState(props.val.split(" "));
  const [align, setalign] = useState(valArgs[0]);
  const [isImportant, setImportant] = useState((valArgs[1] == undefined) ? false : true);

  return (
    <div className="flex justify-between items-center">

      <Dropdown
        position="bottom"
        renderToggle={({ isOpen, onToggle }) => (
          <Button

            onClick={onToggle}
            aria-expanded={isOpen}
          >
            {/* <div className=" ">{val ? val : 'Select...'}</div> */}
            <div className=" ">{args[align] == undefined ? 'Select...' : args[align].label}</div>



          </Button>
        )}
        renderContent={() => <div className='w-32'>

          {args.map((x) => {

            return (

              <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                // onChange(x.value, 'borderCollapse');
                setalign(x.value)
                if (isImportant) {
                  props.onChange(x.value + ' !important', 'borderCollapse');
                } else {
                  props.onChange(x.value, 'borderCollapse');
                }


              }}>

                {x.value && (

                  <>{x.label}</>

                )}

              </div>

            )

          })}
        </div>}
      />


      <ToggleControl
        help={
          isImportant
            ? 'Important (Enabled)'
            : 'Important?'
        }

        checked={isImportant}
        onChange={(arg) => {
          setImportant(isImportant => !isImportant)

          if (isImportant) {
            props.onChange(align, 'borderCollapse');
          } else {
            props.onChange(align + ' !important', 'borderCollapse');
          }


        }}
      />

    </div>

  )

}


class PGcssBorderCollapse extends Component {

  constructor(props) {
    super(props);
    this.state = { showWarning: true };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    const {
      val,
      onChange,
    } = this.props;


    return (
      <Html val={val} onChange={onChange} warn={this.state.showWarning} />
    )
  }

}


export default PGcssBorderCollapse;