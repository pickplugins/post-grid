import { Button, PanelRow, Dropdown, Popover } from '@wordpress/components'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import { createElement, useCallback, memo, useMemo, useState, useEffect, Component, RawHTML } from '@wordpress/element'


class PGDropdown extends Component {
  render() {


    const {
      position,
      variant,
      options, //[{"label":"Select..","icon":"","value":""}]
      buttonTitle,
      onChange,
      values,
      value,


    } = this.props;



    function Html() {


      const [pickerOpen, setPickerOpen] = useState(false);
      const [keyword, setKeyword] = useState('');

      const [filteredOptions, setfilteredOptions] = useState([]);


      const [postGridData, setPostGridData] = useState(window.PostGridPluginData);

      useEffect(() => {

        setPostGridData(window.PostGridPluginData);

      }, [window.PostGridPluginData]);
      // useEffect(() => {

      // }, [keyword]);


      //console.log(typeof options);



      return (

        <div className='relative'>
          <div className='border border-gray-500' onClick={ev => {

            setPickerOpen(prev => !prev);

          }}>
            <Button variant={variant} >{options[value] != undefined ? options[value].label : buttonTitle}</Button>
          </div>


          {pickerOpen && (
            <Popover position={position}>
              <div className='p-2 w-60	'>


                <InputControl
                  autocomplete="off"
                  className='p-3 w-full'
                  placeholder="Search Options"
                  value={keyword}
                  onChange={(newVal) => {

                    if (newVal.length > 0) {
                      setKeyword(newVal);
                    }

                    console.log(typeof options);


                    if (typeof options == 'object') {

                      setfilteredOptions({});
                      var newOptions = {}

                      Object.entries(options).map((args) => {
                        var index = args[0]
                        var x = args[1]

                        let position = x.label.toLowerCase().search(newVal.toLowerCase());
                        if (position < 0) {
                          x.exclude = true;
                        } else {
                          x.exclude = false;
                        }

                        newOptions[index] = x;

                      })

                      console.log(newOptions);


                      setfilteredOptions(newOptions);

                    } else {

                      setfilteredOptions([]);
                      var newOptions = []

                      options.map((x, index) => {

                        let position = x.label.toLowerCase().search(newVal.toLowerCase());
                        if (position < 0) {
                          x.exclude = true;
                        } else {
                          x.exclude = false;
                        }

                        //newOptions.push(x);

                      })

                      setfilteredOptions(newOptions);
                    }



                  }
                  }
                />



                <div>

                  {keyword.length == 0 && typeof options == 'object' && Object.entries(options).map((args) => {

                    var index = args[0]
                    var x = args[1]

                    return (

                      <div className='border-b cursor-pointer hover:bg-slate-200 p-2 block' onClick={ev => {
                        onChange(x, index)

                      }} >
                        <div className='flex justify-between'>
                          <div >
                            {x.icon != undefined && <span className=''><RawHTML>{x.icon}</RawHTML></span>}
                            <span className=''>{x.label} </span>
                          </div>
                          {x.isPro && postGridData != null && postGridData.license_status != 'active' && (<span className='bg-amber-400 rounded-sm px-3  text-white hover:text-white'>Pro</span>)}
                        </div>
                        {x.description != undefined && x.description.length > 0 && <div className='text-xs text-slate-400'>{x.description}</div>}
                      </div>
                    )

                  })}

                  {keyword.length == 0 && typeof options == 'array' && options.map((x, index) => {
                    return (

                      <div className=' border-b cursor-pointer hover:bg-slate-200 p-2 block' onClick={ev => {
                        onChange(x, index)
                      }} >
                        <div className='flex justify-between'>
                          <div >
                            {x.icon != undefined && <span className=''><RawHTML>{x.icon}</RawHTML></span>}
                            <span className=''>{x.label} </span>
                          </div>
                          {x.isPro && postGridData != null && postGridData.license_status != 'active' && (<span className='bg-amber-400 rounded-sm px-3  text-white hover:text-white'>Pro</span>)}

                        </div>

                        {x.description != undefined && x.description.length > 0 && <div className='text-xs text-slate-400'>{x.description}</div>}


                      </div>

                    )

                  })}



                  {keyword.length > 0 && typeof filteredOptions == 'object' && Object.entries(filteredOptions).map(args => {

                    var index = args[0]
                    var x = args[1]

                    //console.log(x.exclude);

                    if (x.exclude == false) {
                      return (
                        <div className='  cursor-pointer hover:bg-slate-400 p-2 block' onClick={ev => {
                          onChange(x, index)
                        }} >
                          <div className='flex justify-between'>
                            <div >
                              {x.icon != undefined && <span className=''><RawHTML>{x.icon}</RawHTML></span>}
                              <span className=''>{x.label} </span>
                            </div>
                            {x.isPro && postGridData != null && postGridData.license_status != 'active' && (<span className='bg-amber-400 rounded-sm px-3  text-white hover:text-white'>Pro</span>)}
                          </div>
                          {x.description != undefined && x.description.length > 0 && <div className='text-xs text-slate-400'>{x.description}</div>}
                        </div>
                      )
                    }
                  })}


                  {keyword.length > 0 && typeof filteredOptions == 'array' && filteredOptions.map((x, index) => {
                    if (x.exclude == false) {
                      return (
                        <div className='  cursor-pointer hover:bg-slate-400 p-2 block' onClick={ev => {
                          onChange(x, index)
                        }} >
                          <div className='flex justify-between'>
                            <div >
                              {x.icon != undefined && <span className=''><RawHTML>{x.icon}</RawHTML></span>}
                              <span className=''>{x.label} </span>
                            </div>
                            {x.isPro && postGridData != null && postGridData.license_status != 'active' && (<span className='bg-amber-400 rounded-sm px-3  text-white hover:text-white'>Pro</span>)}
                          </div>
                          {x.description != undefined && x.description.length > 0 && <div className='text-xs text-slate-400'>{x.description}</div>}
                        </div>
                      )
                    }
                  })}


                  {keyword.length > 0 && typeof filteredOptions == 'object' && Object.entries(filteredOptions).length == 0 && (

                    <div className='text-center p-2 text-red-500 '>No options found.</div>

                  )}

                  {keyword.length > 0 && filteredOptions.length == 0 && (

                    <div className='text-center p-2 text-red-500 '>No options found.</div>

                  )}


                </div>

              </div>






            </Popover>
          )}

        </div>

      )
    }





    return (
      <div>



        <Html />

      </div>

    )
  }
}


export default PGDropdown;