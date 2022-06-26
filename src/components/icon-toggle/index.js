

const { Component, RawHTML } = wp.element;
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem } from '@wordpress/components'


class IconToggle extends Component {
  render() {


    const {
      position,
      variant,
      iconList,
      buttonTitle,
      activeIcon,
      onChange,
      value,


    } = this.props;




    return (
      <div>


        {JSON.stringify(value)}

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

            {iconList.map(x => {


              return (

                <div className={' text-lg font-bold border-b inline-block hover:bg-gray-400 cursor-pointer'} onClick={(x) => {


                  onChange(x)

                  console.log(value);

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