

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

  const [searchPrams, setsearchPrams] = useState({ title: "", content: '', files: [], budget: 50, email: '', name: "" });

  const ALLOWED_MEDIA_TYPES = ['image'];

  let budgetArgs = {
    custom: { label: 'Custom', value: '' },
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

      setsearchPrams({ ...searchPrams, email: res.email, name: res.name, });

    });
  }, []);




  function senMail() {

    var htmlBody = '';
    htmlBody += '<p style="font-weight:bold;font-size:18px">' + searchPrams.title + '</p>';
    htmlBody += '<p style="font-weight:bold">Budget: ' + searchPrams.budget + '$</p>';
    htmlBody += '<p style="font-weight:bold">Email: ' + searchPrams.email + '</p>';
    htmlBody += '<p></p>';

    htmlBody += searchPrams.content;
    htmlBody += '<p>Design Files:</p>';
    searchPrams.files.map(x => {
      htmlBody += '<p><a href="' + x + '"><img style="width:200px;height:auto" src="' + x + '"/></a></p>';
    })



    var postData = {

      subject: '#Post Grid Combo - Template Request',
      body: htmlBody,
      email_to: 'support@pickplugins.com',
      email_from: searchPrams.email,
      email_from_name: searchPrams.name,
      reply_to: searchPrams.email,
      reply_to_name: searchPrams.name,
      attachments: searchPrams.files,

    }


    apiFetch({
      path: '/post-grid/v2/send_mail',
      method: 'POST',
      data: postData,

    }).then((res) => {

      console.log(res);
      console.log(postData);


    });


  }






  return (
    <div id="requestTemplate" class="">

      <div className='grid grid-cols-2 gap-5 items-center'>

        <div>
          <label for="" className=' mb-3 block text-white text-base'>Template Title</label>
          <PGinputText

            className="w-full !py-1 !rounded-none "
            type="text"
            placeholder="Write a short title"
            value={searchPrams.title}
            onChange={(ev) => {

              var newVal = ev.target.value;

              setsearchPrams({ ...searchPrams, title: newVal })
            }}

          />

          <label for="" className=' mt-5 mb-3 block text-white text-base'>Template Details</label>
          <RichText
            className="w-full bg-white pb-5 p-2"
            tagName={'div'}


            value={searchPrams.content}
            allowedFormats={['core/bold', 'core/italic', 'core/link']}
            onChange={(content) => {
              setsearchPrams({ ...searchPrams, content: content })

            }}
            placeholder={'Write details about your design...'}
          />

          <PanelRow className='mb-4'>


            <label for="" className=' mt-5 mb-3 block text-white text-base'>Design Files</label>
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




          <div className='flex mb-5'>

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


          <div className='flex justify-between items-center '>

            <div className='flex items-center'>
              <label for="" className=' text-white text-base mr-3'>Estimated Budget</label>
              <PGDropdown className="text-white" position="bottom right" variant="secondary" options={budgetArgs} buttonTitle={'Choose'}
                btnClass="!border-none !bg-blue-500 !text-white"

                onChange={(option, index) => {

                  setsearchPrams({ ...searchPrams, budget: option.value })

                }}
              ></PGDropdown>
            </div>


            {(budgetArgs[searchPrams.budget] == undefined) && (

              <div className='flex items-center'>
                <PGinputText

                  className=" !py-1 my-3 !rounded-none inline-block"
                  type="text"
                  placeholder=""
                  value={searchPrams.budget}
                  onChange={(ev) => {
                    var newVal = ev.target.value;

                    setsearchPrams({ ...searchPrams, budget: newVal })
                  }}

                /> <span className='inline-block mx-2 text-white'>USD</span>
              </div>
            )}

            {(budgetArgs[searchPrams.budget] != undefined) && (
              <div className='text-gray-800 text-[18px]'>{(budgetArgs[searchPrams.budget] == undefined) ? '' : budgetArgs[searchPrams.budget].label}</div>
            )}


          </div>





          <label for="" className=' mb-3 mt-5 block text-white text-base'>You Email</label>
          <PGinputText

            className="w-full !py-1  !rounded-none "
            type="text"
            placeholder=""
            value={searchPrams.email}
            onChange={(ev) => {
              var newVal = ev.target.value;

              setsearchPrams({ ...searchPrams, email: newVal })
            }}

          />


          <label for="" className=' my-3 block text-white text-base'>You Name</label>
          <PGinputText

            className="w-full !py-1  !rounded-none "
            type="text"
            placeholder=""
            value={searchPrams.name}
            onChange={(ev) => {
              var newVal = ev.target.value;

              setsearchPrams({ ...searchPrams, name: newVal })
            }}

          />


        </div>

        <div className='py-5 px-10'>

          <p className='text-base'>By sending mail, you are requested to follow these terms.</p>
          <ul className='my-3 text-base list-inside'>
            <li className='list-disc'>We do not provide design made by 3rd party blocks. default blocks may use.</li>
            <li className='list-disc'>We do not provide immediate/emmargency delivery. But we try our best as soon as possible.</li>
          </ul>

          <div className='bg-blue-600 rounded-md text-white font-bold text-base text-center cursor-pointer hover:bg-blue-500 px-10 py-3 my-5'

            onClick={ev => {
              console.log('hello');

              senMail();

            }}

          >Send Mail</div>

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