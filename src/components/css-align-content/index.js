

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'



function Html(props) {
  if (!props.warn) {
    return null;
  }
  var args = {
    stretch: { "label": "stretch", "value": "stretch" },
    center: { "label": "center", "value": "center" },
    'flex-start': { "label": "flex start	", "value": "flex-start" },
    'flex-end': { "label": "flex end	", "value": "flex-end" },
    'space-between': { "label": "space between", "value": "space-between" },
    'space-around': { "label": "space around", "value": "space-around" },
    'space-evenly': { "label": "space evenly", "value": "space-evenly" },
  };

  return (

    <div>

      <Dropdown
        position="bottom"
        renderToggle={({ isOpen, onToggle }) => (
          <Button
            title="Align Content"

            onClick={onToggle}
            aria-expanded={isOpen}
          >
            <div className=" ">{props.val ? args[props.val].label : 'Select...'}</div>


          </Button>
        )}
        renderContent={() => <div className='w-32'>

          {Object.entries(args).map((args) => {

            var index = args[0]
            var x = args[1]
            return (

              <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                props.onChange(x.value, 'alignContent');


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



class PGcssAlignContent extends Component {

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


export default PGcssAlignContent;