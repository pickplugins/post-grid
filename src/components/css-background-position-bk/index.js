

const { Component, RawHTML } = wp.element;
import { Button, Dropdown, ToggleControl, __experimentalInputControl as InputControl } from '@wordpress/components'

import { useState, } from '@wordpress/element'

function Html(props) {
  if (!props.warn) {
    return null;
  }

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
    { label: "inherit", value: "inherit" },
    { label: "initial", value: "initial" },
    { label: "revert", value: "revert" },
    { label: "unset", value: "unset" },
    { label: "custom", value: "custom" },

  ];

  const [valArgs, setValArgs] = useState(props.val.split(" "));

  const [align, setalign] = useState(valArgs[0]);


  const [isImportant, setImportant] = useState((valArgs[1] == undefined) ? false : true);
  const [isCustom, setisCustom] = useState(valArgs[0].match(/\d+/g) == null ? false : true);

  var ValX = (valArgs[0] == undefined || valArgs[0].match(/\d+/g) == null) ? 0 : valArgs[0].match(/\d+/g)[0];
  var valUnitX = (valArgs[0] == undefined || valArgs[0].match(/[a-zA-Z%]+/g) == null) ? 'px' : valArgs[0].match(/[a-zA-Z%]+/g)[0];

  var ValY = (valArgs[1] == undefined || valArgs[1].match(/\d+/g) == null) ? 0 : valArgs[1].match(/\d+/g)[0];
  var valUnitY = (valArgs[1] == undefined || valArgs[1].match(/[a-zA-Z%]+/g) == null) ? 'px' : valArgs[1].match(/[a-zA-Z%]+/g)[0];



  return (
    <div className="">
      <div>props.val: {JSON.stringify(props.val)}</div>

      <div>align: {JSON.stringify(align)}</div>


      <div>valArgs: {JSON.stringify(valArgs)}</div>
      <div>ValX: {JSON.stringify(ValX)}</div>
      <div>valUnitX: {JSON.stringify(valUnitX)}</div>
      <div>ValY: {JSON.stringify(ValY)}</div>
      <div>valUnitY: {JSON.stringify(valUnitY)}</div>




      <div className="flex justify-between items-center">

        <Dropdown
          position="bottom"
          renderToggle={({ isOpen, onToggle }) => (
            <Button
              title=""

              onClick={onToggle}
              aria-expanded={isOpen}
            >
              {/* <div className=" ">{val ? val : 'Select...'}</div> */}
              <div className=" ">{align.length == 0 ? 'Select...' : align}</div>



            </Button>
          )}
          renderContent={() => <div className='w-32'>

            {args.map((x) => {


              return (

                <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                  if (x.value == 'custom') {
                    setisCustom(true);
                    props.onChange('0px 0px', 'backgroundPosition');
                    setValArgs(['0px', '0px'])

                  } else {
                    setisCustom(false);

                    setalign(x.value)


                    if (isImportant) {
                      props.onChange(x.value + ' !important', 'backgroundPosition');
                    } else {
                      props.onChange(x.value, 'backgroundPosition');
                    }
                  }




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
              props.onChange(align, 'backgroundPosition');
            } else {
              props.onChange(align + ' !important', 'backgroundPosition');
            }


          }}
        />

      </div>
      {isCustom && (

        <div className='flex mt-4'>
          <div>
            <InputControl
              value={props.val.split(" ")[0].match(/\d+/g)[0]}
              type="text"
              onChange={(newVal) => {

                props.onChange(newVal + valUnitX + ' ' + ValY + valUnitY, 'backgroundPosition');


              }}
            />
          </div>

          <span className='mx-2'> / </span>

          <div>
            <InputControl
              value={props.val.split(" ")[1].match(/\d+/g)[0]}
              type="text"
              onChange={(newVal) => {

                props.onChange(ValX + valUnitX + ' ' + newVal + valUnitY, 'backgroundPosition');


              }}
            />
          </div>
        </div>
      )}


    </div>

  )
}


class PGcssBackgroundPosition extends Component {

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


export default PGcssBackgroundPosition;