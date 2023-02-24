

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'


class PGcssDisplay extends Component {
  render() {


    const {
      val,
      onChange,



    } = this.props;


    var args = {
      none: { "label": "None", "value": "none" },
      block: { "label": "Block", "value": "block" },
      inline: { "label": "Inline", "value": "inline" },
      'inline-block': { "label": "Inline Block", "value": "inline-block" },
      grid: { "label": "Grid", "value": "grid" },
      flex: { "label": "Flex", "value": "flex" },
      contents: { "label": "contents", "value": "contents" },
      'inline-flex': { "label": "inline-flex", "value": "inline-flex" },
      'inline-grid': { "label": "inline-grid", "value": "inline-grid" },
      'inline-table': { "label": "inline-table", "value": "inline-table" },
      'list-item': { "label": "list-item", "value": "list-item" },
      // 'run-in': { "label": "run-in", "value": "run-in" },
      table: { "label": "table", "value": "table" },
      'table-caption': { "label": "table-caption", "value": "table-caption" },
      'table-column-group': { "label": "table-column-group", "value": "table-column-group" },
      'table-header-group': { "label": "table-header-group", "value": "table-header-group" },
      'table-footer-group': { "label": "table-footer-group", "value": "table-footer-group" },
      'table-row-group': { "label": "table-row-group", "value": "table-row-group" },
      'table-cell': { "label": "table-cell", "value": "table-cell" },
      'table-column': { "label": "table-column", "value": "table-column" },
      'table-row': { "label": "table-row", "value": "table-row" },
      'flow-root': { "label": "flow-root", "value": "flow-root" },
      'inline-grid': { "label": "inline-grid", "value": "inline-grid" },

      initial: { "label": "initial", "value": "initial" },
      inherit: { "label": "inherit", "value": "inherit" },
      revert: { "label": "revert", "value": "revert" },
      unset: { "label": "unset", "value": "unset" },






    }


      ;


    return (
      <div>

        <Dropdown
          position="bottom left"
          renderToggle={({ isOpen, onToggle }) => (
            <Button
              title=""

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

                  onChange(x.value, 'display');


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


export default PGcssDisplay;