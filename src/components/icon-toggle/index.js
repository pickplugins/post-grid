

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'


class IconToggle extends Component {
  render() {


    const {
      position,
      variant,
      iconList, //[{"label":"Select..","icon":"","value":""}]
      buttonTitle,
      onChange,
      activeIcon,
      value,


    } = this.props;




    return (
      <div>

        <Dropdown
          position={position}
          renderToggle={({ isOpen, onToggle }) => (
            <Button
              title={buttonTitle}
              variant={variant}
              onClick={onToggle}
              aria-expanded={isOpen}
            >
              <RawHTML className="text-lg ">{activeIcon}</RawHTML>


            </Button>
          )}
          renderContent={() => <div>

            {iconList.map((x, index) => {


              return (

                <div className={' text-lg font-bold border-b inline-block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {


                  onChange(x, index)
                  console.log('Icon Toggle');


                }}>

                  {!x.value && (

                    <div><span class="icon-close"></span></div>

                  )}

                  {x.value && (

                    <RawHTML>{x.icon}</RawHTML>

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


export default IconToggle;