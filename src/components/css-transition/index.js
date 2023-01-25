

const { Component } = wp.element;
import { Button, Dropdown, PanelRow, PanelBody, RangeControl } from '@wordpress/components'
import { useState, useEffect } from '@wordpress/element'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';
import PGDropdown from '../../components/dropdown'
import { Icon, close } from '@wordpress/icons';



function Html(props) {

  if (!props.warn) {
    return null;
  }



  var valParts = (props.val != undefined) ? props.val.split(",") : [];


  const [valArgs, setvalArgs] = useState([]);


  var timingFunctionargs = [
    { label: 'ease', value: 'ease' },
    { label: 'linear', value: 'linear' },
    { label: 'ease-in', value: 'ease-in' },
    { label: 'ease-out', value: 'ease-out' },
    { label: 'ease-in-out', value: 'ease-in-out' },
    { label: 'step-start', value: 'step-start' },
    { label: 'step-end', value: 'step-end' },
    { label: 'ease', value: 'ease' },
    { label: 'ease', value: 'ease' },
  ]


  var propertyArgs = [
    { label: 'all', value: 'all' },
    { label: 'background-color', value: 'background-color' },
    { label: 'color', value: 'color' },
    { label: 'opacity', value: 'opacity' },
    { label: 'border', value: 'border' },
    { label: 'bottom', value: 'bottom' },
    { label: 'box-shadow', value: 'box-shadow' },
    { label: 'height', value: 'height' },
    { label: 'left', value: 'left' },
    { label: 'margin', value: 'margin' },
    { label: 'padding', value: 'padding' },
    { label: 'right', value: 'right' },
    { label: 'rotate', value: 'rotate' },
    { label: 'top', value: 'top' },
    { label: 'translate', value: 'translate' },
    { label: 'width', value: 'width' },
    { label: 'transform', value: 'transform' },
    { label: 'zoom', value: 'zoom' },
    { label: 'font-size', value: 'font-size' },
    { label: 'font-weight', value: 'font-weight' },
    { label: 'font-stretch', value: 'font-stretch' },
    { label: 'filter', value: 'filter' },
    { label: 'background', value: 'background' },




  ]





  function addFilter() {

    valArgs.push({ property: 'width', duration: '1s', timingFunction: 'ease', delay: '0s' });

    var str = '';
    valArgs.map(x => {
      str += x.property + ' ' + x.duration + ' ' + x.timingFunction + ' ' + x.delay + ',';
    })

    props.onChange(str, 'transition');
  }






  useEffect(() => {



    var filtered = valParts.filter(Boolean)


    var res = filtered.map(x => {


      if (x.length != 0) {

        var items = x.split(" ");

        var property = items[0];
        var duration = items[1];
        var timingFunction = items[2];
        var delay = items[3];

        return { property: property, duration: duration, timingFunction: timingFunction, delay: delay };
      }
    })


    setvalArgs(res);

  }, [props.val]);




  return (

    <div className='mt-4'>
      <div className='flex mb-3'>
        <Button variant="secondary" onClick={addFilter} values="">Add</Button>
      </div>

      {
        valArgs != undefined && (


          valArgs.map((arg, i) => {



            return (

              <PanelBody title={(arg.property != null) ? arg.property : 'property'} initialOpen={false}>

                <PanelRow>
                  <label for="">Property Name</label>

                  <PGDropdown position="bottom right" variant="secondary" options={propertyArgs} buttonTitle={(arg.property != null) ? arg.property : 'Choose'} onChange={(option, index) => {


                    valArgs[i].property = option.value;

                    var str = '';
                    valArgs.map(x => {

                      str += option.value + ' ' + x.duration + ' ' + x.timingFunction + ' ' + x.delay;

                    })

                    props.onChange(str, 'transition');



                  }} ></PGDropdown>



                </PanelRow>

                <PanelRow>
                  <label for="">Duration</label>
                  <InputControl
                    value={arg.duration}
                    type="text"

                    onChange={(newVal) => {
                      valArgs[i].duration = newVal;

                      var str = '';
                      valArgs.map(x => {

                        str += x.property + ' ' + newVal + ' ' + x.timingFunction + ' ' + x.delay;
                      })

                      props.onChange(str, 'transition');

                    }}
                  />
                </PanelRow>


                <PanelRow>
                  <label for="">Timing Function</label>


                  <PGDropdown position="bottom right" variant="secondary" options={timingFunctionargs} buttonTitle={(arg.timingFunction != null) ? arg.timingFunction : 'Choose'} onChange={(option, index) => {


                    valArgs[i].timingFunction = option.value;

                    var str = '';
                    valArgs.map(x => {

                      str += x.property + ' ' + x.duration + ' ' + option.value + ' ' + x.delay;
                    })

                    props.onChange(str, 'transition');



                  }} ></PGDropdown>



                </PanelRow>


                <PanelRow>
                  <label for="">Delay</label>
                  <InputControl
                    value={arg.delay}
                    type="text"

                    onChange={(newVal) => {
                      valArgs[i].delay = newVal;

                      var str = '';
                      valArgs.map(x => {

                        str += x.property + ' ' + x.duration + ' ' + x.timingFunction + ' ' + newVal;
                      })

                      props.onChange(str, 'transition');

                    }}
                  />
                </PanelRow>






                <div className='flex'>

                  <span class="hover:bg-red-500 bg-red-400 text-white ml-1 inline-block p-1 cursor-pointer" onClick={ev => {


                    valArgs.splice(i, 1);

                    setvalArgs(valArgs);

                  }}><span class="dashicons dashicons-no-alt"></span></span>
                </div>



              </PanelBody>


            )


          }))
      }


    </div >




  )

}

class PGcssTransition extends Component {


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


    var {
      val,
      onChange,
    } = this.props;



    return (


      <Html val={val} onChange={onChange} warn={this.state.showWarning} />


    )
  }
}


export default PGcssTransition;