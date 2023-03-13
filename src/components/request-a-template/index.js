

const { Component } = wp.element;
import { applyFilters } from '@wordpress/hooks';
import apiFetch from '@wordpress/api-fetch';
import { memo, useMemo, useState, useEffect } from '@wordpress/element'
import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor'
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Icon, styles, close, settings, download } from '@wordpress/icons';

import { PanelBody, RangeControl, Button, ButtonGroup, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, Spinner, CustomSelectControl, Popover, __experimentalInputControl as InputControl, } from '@wordpress/components'
import PGinputText from '../../components/input-text'
import PGDropdown from '../../components/dropdown'



function Html(props) {
  if (!props.warn) {
    return null;
  }

  const [searchPrams, setsearchPrams] = useState({ title: "", content: '', files: [], budget: "", email: '', name: "" });

  const ALLOWED_MEDIA_TYPES = ['image'];

  let budgetArgs = {
    '50-': { label: 'Less than 50$', value: '50-' },
    50: { label: '50$+', value: 50 },
    100: { label: '100$+', value: 100 },
    200: { label: '200$+', value: 200 },
    300: { label: '300$+', value: 300 },
    500: { label: '500$+', value: 500 },
  };



  useEffect(() => {
    apiFetch({
      path: '/post-grid/v2/get_site_details',
      method: 'POST',
      data: {},
    }).then((res) => {

      setsearchPrams({ ...searchPrams, email: res.email });




    });
  }, []);











  return (
    <div id="requestTemplate" class="">

      <div className='grid grid-cols-2 gap-5'>

        <div>
          <label for="" className=' mb-3 block text-white'>Template Title</label>
          <PGinputText

            className="w-full !py-1 !rounded-none "
            type="text"
            placeholder=""
            value={searchPrams.title}
            onChange={(newVal) => {

              setsearchPrams({ ...searchPrams, title: newVal })
            }}

          />

          <label for="" className=' mt-5 mb-3 block text-white'>Template Details</label>
          <RichText
            className="w-full bg-white pb-5 p-2"
            tagName={'div'}


            value={searchPrams.content}
            allowedFormats={['core/bold', 'core/italic', 'core/link']}
            onChange={(content) => {
              setsearchPrams({ ...searchPrams, content: content })

            }}
            placeholder={'Start Writing...'}
          />

          <PanelRow className='mb-4'>


            <label for="" className=' mt-5 mb-3 block text-white'>Design Files</label>
            <MediaUploadCheck>
              <MediaUpload
                class="bg-blue-500"
                onSelect={(media) => {
                  var filesX = searchPrams.files.push(media.url);

                  console.log(searchPrams.files);


                  setsearchPrams({ ...searchPrams, files: searchPrams.files })



                }


                }
                onClose={() => {
                }


                }

                allowedTypes={ALLOWED_MEDIA_TYPES}
                render={({ open }) => (

                  <Button className=' bg-blue-500 hover:bg-blue-600 text-white hover:text-white' onClick={open}>Open Media Library</Button>


                )}
              />
            </MediaUploadCheck>
          </PanelRow>




          <div className='flex'>

            <>
              {searchPrams.files.map((x, index) => {

                return (
                  <div className=' bg-white m-3 my-2 p-3 relative'>

                    <img src={x} alt="" className='w-32' />

                    <span className='cursor-pointer absolute top-0 right-0  p-1 bg-red-500 hover:bg-red-600 inline-block'
                      onClick={() => {
                        var filesX = searchPrams.files.splice(index, 1);

                        console.log(filesX);


                        setsearchPrams({ ...searchPrams, files: searchPrams.files })

                      }}
                    ><Icon icon={close} className="fill-white" /></span>

                  </div>
                )

              })}
            </>


          </div>


          <PanelRow className=''>

            <label for="" className=' mt-5 mb-3 block  text-white'>Estimated Budget</label>
            <PGDropdown className="text-white" position="bottom right" variant="secondary" options={budgetArgs} buttonTitle={'Choose'}
              btnClass="!bg-white !border-none !bg-blue-500 !text-white"

              onChange={(option, index) => {

                setsearchPrams({ ...searchPrams, budget: option.value })

              }}
            ></PGDropdown>
          </PanelRow>

          <div className='text-white text-[18px]'>{(budgetArgs[searchPrams.budget] == undefined) ? '' : budgetArgs[searchPrams.budget].label}</div>



          <label for="" className=' my-3 block text-white'>You Email</label>
          <PGinputText

            className="w-full !py-1  !rounded-none "
            type="text"
            placeholder=""
            value={searchPrams.email}
            onChange={(newVal) => {

              setsearchPrams({ ...searchPrams, email: newVal })
            }}

          />


          <label for="" className=' my-3 block text-white'>You Name</label>
          <PGinputText

            className="w-full !py-1  !rounded-none "
            type="text"
            placeholder=""
            value={searchPrams.name}
            onChange={(newVal) => {

              setsearchPrams({ ...searchPrams, name: newVal })
            }}

          />


        </div>

        <div>

        </div>
      </div>

    </div>


  )

}


class PGRequestTemplate extends Component {

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
      onChange,



    } = this.props;








    return (


      <Html warn={this.state.showWarning} />


    )
  }
}


export default PGRequestTemplate;