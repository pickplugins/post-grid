

const { Component, RawHTML, useState, useEffect } = wp.element;
import { Button, Dropdown } from '@wordpress/components'
import { Icon, chevronDown, chevronUp } from '@wordpress/icons';


class PGproWrapper extends Component {
  render() {


    const {
      utmUrl,
      initialOpen,
      befroeTitle,

      children



    } = this.props;


    function Html() {

      const [postGridData, setPostGridData] = useState(window.PostGridPluginData);

      useEffect(() => {

        setPostGridData(window.PostGridPluginData);

      }, [window.PostGridPluginData]);


      if (postGridData != null && postGridData.license_status != 'active') {
        return (

          <div className='proWrapper my-5'>

            <div className='proInfo ' >
              <div className='bg-amber-400 px-3 py-2 '>
                <a className='text-lg text-white hover:text-white font-bold flex justify-between' target='_blank' href={postGridData.proUrl + utmUrl}>
                  <span className=' underline'>Pre Order</span>
                  <span className=' '>Grab 25% Off</span>
                </a>


              </div>

            </div>

            <div className='proInner  bg-amber-100 p-2'>


              {children}

            </div>





          </div>

        )

      } else {
        return '';
      }


    }


    return (
      <div>
        <Html />
      </div>

    )
  }
}


export default PGproWrapper;