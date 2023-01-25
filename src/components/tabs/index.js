

const { Component, RawHTML, useState } = wp.element;
import { Button, Dropdown } from '@wordpress/components'
import { Icon, chevronDown, chevronUp } from '@wordpress/icons';


function MyFunction(props) {

  if (!props.warn) {
    return null;
  }

  const [selected, setSelected] = useState(props.activeTab);
  var content;

  // useEffect(() => {
  // }, [keyword]);

  props.children.map(child => {
    if (selected == child.props.name) {
      content = child.props.children
    }
  })


  return (

    <div className='tabsWrapper'>

      <div className='flex overflow-x-auto'>

        {props.tabs.map(tab => {

          return (
            <div className={(tab.name == selected) ? 'flex bg-gray-400 grow  border-right border-solid border-gray-600 p-2 cursor-pointer' : 'flex bg-gray-200 grow border-right border-solid border-gray-600 p-2 cursor-pointer'} onClick={ev => {
              props.onSelect(tab);
              setSelected(tab.name);

            }}>
              <Icon fill="#404040" icon={tab.icon} className="mr-2 w-[20px] text-green-500" />
              <span className='font-medium'>{tab.title}</span>
            </div>
          )

        })}
      </div>


      <div className='tabContent py-3'>

        {content}

      </div>



    </div>

  )
}





class PGtabs extends Component {


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
      activeTab,
      orientation,
      activeClass,

      onSelect,
      tabs,
      children


    } = this.props;



    return (
      <div>
        <MyFunction children={children} tabs={tabs} onSelect={onSelect} activeTab={activeTab} warn={this.state.showWarning} />


      </div>

    )
  }
}


export default PGtabs;