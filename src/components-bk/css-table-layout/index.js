

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'



function Html(props) {
  if (!props.warn) {
    return null;
  }
  var args = {
    auto: { "label": "auto", "value": "auto" },
    fixed: { "label": "fixed", "value": "fixed" },
    initial: { "label": "initial", "value": "initial" },
    inherit: { "label": "inherit", "value": "inherit" },

  };

  return (

    <div>

      <Dropdown
        position="bottom"
        renderToggle={({ isOpen, onToggle }) => (
          <Button
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

                onChange(x.value, 'tableLayout');


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



class PGcssTableLayout extends Component {

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


export default PGcssTableLayout;