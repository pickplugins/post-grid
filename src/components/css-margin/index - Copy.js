

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'
import { __experimentalInputControl as InputControl, SelectControl } from '@wordpress/components';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'


class PGcssPadding extends Component {
  render() {


    const {
      val,
      onChange,



    } = this.props;


    function Html() {



      var unitArgs = [{ label: 'px', value: 'px' }, { label: 'em', value: 'em' }, { label: 'rem', value: 'rem' }]
      var valX = (val != undefined) ? val : { top: '10px', right: '10px', bottom: '10px', left: '10px' }

      var valY = {}

      Object.keys(valX).map((keyName, i) => (

        valY[keyName] = { val: valX[keyName].match(/\d+/g)[0], unit: valX[keyName].match(/[a-zA-Z]+/g)[0] }
      ))



      var [valZ, setvalZ] = useState({});
      var [lockVertical, setlockVertical] = useState(false);
      var [lockHorizontal, setlockHorizontal] = useState(false);
      var [lock, setlock] = useState(false);


      useEffect(() => {

        console.log(valZ);

      }, [valZ]);



      return (

        <>


          {JSON.stringify(valZ)}

          <div className='grid grid-cols-5 gap-2 mt-4'>
            <div className='col-span-2'>
              <SelectControl
                classID='w-2'
                value=""
                options={unitArgs}
                onChange={(newVal) => {

                  console.log(newVal);


                }}
              />
            </div>

            <div>
              <div className={lockHorizontal ? 'bg-blue-500 inline-block p-1 cursor-pointer' : 'inline-block p-1 cursor-pointer'} onClick={ev => { setlockHorizontal(!lockHorizontal) }}>

                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.49545 16.9909L3 12.4955L7.49545 8L8.65849 9.16304L6.15919 11.6706H17.9876L15.4883 9.16304L16.6513 8L21.1468 12.4955L16.6513 16.9909L15.4883 15.8279L17.9876 13.3203H6.15919L8.65849 15.8279L7.49545 16.9909Z" fill="black" />
                </svg>

              </div>
            </div>


            <div>
              <div className={lockVertical ? 'bg-blue-500 inline-block p-1 cursor-pointer' : 'inline-block p-1 cursor-pointer'} onClick={ev => { setlockVertical(!lockVertical) }}>

                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.57795 7.91751L12.0734 3.42206L16.5688 7.91751L15.4058 9.08055L12.8983 6.58125L12.8982 18.4096L15.4058 15.9103L16.5688 17.0734L12.0734 21.5688L7.57795 17.0734L8.74099 15.9103L11.2485 18.4096L11.2485 6.58125L8.74099 9.08055L7.57795 7.91751Z" fill="black" />
                </svg>

              </div>


            </div>


            <div>
              <div className={lock ? 'bg-blue-500 inline-block p-1 cursor-pointer' : 'inline-block p-1 cursor-pointer'} onClick={ev => { setlock(!lock) }}>


                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.3195 14.7084C13.3195 15.3354 12.9806 15.8776 12.4723 16.1741V18.0973C12.4723 18.5633 12.091 18.9445 11.625 18.9445C11.1591 18.9445 10.7778 18.5633 10.7778 18.0973V16.1741C10.2695 15.8776 9.9306 15.3354 9.9306 14.7084C9.9306 13.7765 10.6931 13.014 11.625 13.014C12.557 13.014 13.3195 13.7765 13.3195 14.7084Z" fill="black" />
                  <path d="M17.5556 9.625H16.7083V6.23611C16.7083 3.89778 14.8106 2 12.4722 2H10.7778C8.43945 2 6.54167 3.89778 6.54167 6.23611V9.625H5.69445C4.7625 9.625 4 10.3875 4 11.3194V20.6389C4 21.5708 4.7625 22.3333 5.69445 22.3333H17.5556C18.4875 22.3333 19.25 21.5708 19.25 20.6389V11.3194C19.25 10.3875 18.4875 9.625 17.5556 9.625ZM8.23611 6.23611C8.23611 4.8382 9.37986 3.69445 10.7778 3.69445H12.4722C13.8701 3.69445 15.0139 4.8382 15.0139 6.23611V9.625H8.23611V6.23611ZM17.5556 20.2153C17.5556 20.4525 17.3692 20.6389 17.132 20.6389H6.11806C5.88083 20.6389 5.69445 20.4525 5.69445 20.2153V11.7431C5.69445 11.5058 5.88083 11.3194 6.11806 11.3194H17.132C17.3692 11.3194 17.5556 11.5058 17.5556 11.7431V20.2153Z" fill="black" />
                </svg>


              </div>


            </div>


          </div>

          <div className='grid grid-cols-4 items-baseline'>


            {Object.keys(valY).map((keyName, i) => (

              <div className=''>

                <InputControl

                  type="number"
                  className="h-4 rounded-none"
                  label=""
                  value={valY[keyName].val}
                  placeholder=""
                  onChange={(newVal) => {

                    valY[keyName].val = newVal;

                    console.log(valY);
                    setvalZ(valY);
                  }}
                />
                <div className='text-center text-xsm text-gray-400 uppercase'>{keyName}</div>



              </div>


            ))}


          </div>
        </>




      )

    }







    return (




      <Html />


    )
  }
}


export default PGcssPadding;