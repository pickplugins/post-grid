import { Button, PanelRow, Dropdown, Popover } from '@wordpress/components'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import { createElement, useCallback, memo, useMemo, useState, useEffect, Component, RawHTML } from '@wordpress/element'
import { applyFilters } from '@wordpress/hooks';


class PGDropdownSudoSelector extends Component {
  render() {


    const {
      position,
      variant,
      options,
      buttonTitle,
      onChange,
      values,
      value,
      sudoScourceUpdate,
    } = this.props;



    function Html() {
      //var sudoScourceArgsLocal = localStorage.getItem('sudoScourceArgs');
      //sudoScourceArgsLocal = (sudoScourceArgsLocal != null) ? JSON.parse(sudoScourceArgsLocal) : {};

      const [pickerOpen, setPickerOpen] = useState(false);
      const [keyword, setKeyword] = useState('');

      const [filteredOptions, setfilteredOptions] = useState([]);
      const [optionsX, setoptionsX] = useState(options);


      useEffect(() => {

        sudoScourceUpdate(optionsX)

      }, [optionsX]);





      return (

        <div className='relative'>
          <div className='' onClick={ev => {

            setPickerOpen(prev => !prev);

          }}>
            <Button variant={variant} >{optionsX[value] != undefined ? optionsX[value].label : buttonTitle}</Button>
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



                    if (typeof optionsX == 'object') {

                      setfilteredOptions({});
                      var newOptions = {}

                      Object.entries(optionsX).map((args) => {
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



                      setfilteredOptions(newOptions);

                    } else {

                      setfilteredOptions([]);
                      var newOptions = []

                      optionsX.map((x, index) => {

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

                  {keyword.length == 0 && typeof optionsX == 'object' && Object.entries(optionsX).map((args) => {

                    var index = args[0]
                    var x = args[1]

                    return (

                      <div className='border-b cursor-pointer hover:bg-slate-200 p-2 block'  >
                        <div className={[(x.isPro) ? 'flex justify-between' : '']}>
                          <div className={[x.isPro ? 'text-gray-400' : '']}>
                            {x.icon != undefined && <span className=''><RawHTML>{x.icon}</RawHTML></span>}
                            <div className='' onClick={ev => {


                              if (x.isPro == true) {

                                alert('Sorry this feature only avilbale in pro');


                              } else {



                                // var sudoScourceArgsLocal = localStorage.getItem('sudoScourceArgs');
                                //sudoScourceArgsLocal = (sudoScourceArgsLocal != null) ? JSON.parse(sudoScourceArgsLocal) : {};


                                var sudoId = x.value.replace('(n)', '(' + x.arg + ')');

                                //sudoScourceArgsLocal[sudoId] = { label: sudoId, value: sudoId, }

                                //localStorage.setItem('sudoScourceArgs', JSON.stringify(sudoScourceArgsLocal));

                                // var sudoScourceArgsLocalX = localStorage.getItem('sudoScourceArgs');

                                //console.log(JSON.parse(sudoScourceArgsLocalX));
                                //localStorage.clear();

                                //options = JSON.parse(sudoScourceArgsLocalX);
                                //setoptionsX(JSON.parse(sudoScourceArgsLocalX));

                                onChange(x, index)
                                optionsX[sudoId] = { label: x.label, value: sudoId, };


                                setoptionsX(optionsX)


                                //sudoScourceUpdate();

                              }



                            }}>{x.label} </div>
                          </div>

                          {x.arg != undefined && (
                            <div className='w-16'>
                              <InputControl
                                className='mr-2'
                                value={x.arg}
                                onChange={(newVal) => {

                                  x.arg = newVal;

                                }}
                              />
                            </div>

                          )}


                          {x.isPro && (<span className='bg-amber-400 rounded-sm px-3  text-white hover:text-white'>
                            <a target="_blank" href={'https://pickplugins.com/post-grid/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=' + x.label}>Pro</a>
                          </span>)}
                        </div>
                        {x.description != undefined && x.description.length > 0 && <div className='text-xs text-slate-400'>{x.description}</div>}
                      </div>
                    )

                  })}

                  {keyword.length == 0 && typeof optionsX == 'array' && optionsX.map((x, index) => {
                    return (

                      <div className=' border-b cursor-pointer hover:bg-slate-200 p-2 block' onClick={ev => {
                        //onChange(x, index)

                        if (x.isPro == true) {

                          alert('Sorry this feature only avilbale in pro');


                        } else {
                          onChange(x, index)
                        }



                      }} >
                        <div className='flex justify-between'>
                          <div >
                            {x.icon != undefined && <span className=''><RawHTML>{x.icon}</RawHTML></span>}
                            <span className=''>{x.label} </span>
                          </div>
                          {x.isPro && (<span className='bg-amber-400 rounded-sm px-3  text-white hover:text-white'>Pro</span>)}

                        </div>

                        {x.description != undefined && x.description.length > 0 && <div className='text-xs text-slate-400'>{x.description}</div>}


                      </div>

                    )

                  })}



                  {keyword.length > 0 && typeof filteredOptions == 'object' && Object.entries(filteredOptions).map(args => {

                    var index = args[0]
                    var x = args[1]


                    if (x.exclude == false) {
                      return (
                        <div className='  cursor-pointer hover:bg-slate-400 p-2 block' onClick={ev => {
                          //onChange(x, index)


                          if (x.isPro == true) {

                            alert('Sorry this feature only avilbale in pro');


                          } else {
                            onChange(x, index)
                          }


                        }} >
                          <div className='flex justify-between'>
                            <div >
                              {x.icon != undefined && <span className=''><RawHTML>{x.icon}</RawHTML></span>}
                              <span className=''>{x.label} </span>
                            </div>
                            {x.isPro && (<span className='bg-amber-400 rounded-sm px-3  text-white hover:text-white'>Pro</span>)}
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
                          //onChange(x, index)

                          if (x.isPro == true) {

                            alert('Sorry this feature only avilbale in pro');


                          } else {
                            onChange(x, index)
                          }


                        }} >
                          <div className='flex justify-between'>
                            <div >
                              {x.icon != undefined && <span className=''><RawHTML>{x.icon}</RawHTML></span>}
                              <span className=''>{x.label} </span>
                            </div>
                            {x.isPro && (<span className='bg-amber-400 rounded-sm px-3  text-white hover:text-white'>Pro</span>)}
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


export default PGDropdownSudoSelector;