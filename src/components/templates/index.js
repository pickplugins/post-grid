

const { Component } = wp.element;
import { applyFilters } from '@wordpress/hooks';
import apiFetch from '@wordpress/api-fetch';
import { PanelBody, RangeControl, Button, ButtonGroup, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, Spinner, CustomSelectControl, Popover, __experimentalInputControl as InputControl, } from '@wordpress/components'

import { memo, useMemo, useState, useEffect } from '@wordpress/element'
import { Icon, styles, close, settings, download } from '@wordpress/icons';
import PGDropdown from '../../components/dropdown'
import PGinputText from '../../components/input-text'
import Masonry from 'masonry-layout'



function Html(props) {
  if (!props.warn) {
    return null;
  }


  const [searchPrams, setsearchPrams] = useState({ keyword: "", categories: [], page: 1, });
  var [cssLibrary, setCssLibrary] = useState({ items: [] });
  var [cssLibraryCats, setCssLibraryCats] = useState([]);
  var [debounce, setDebounce] = useState(null); // Using the hook.
  var [isLoading, setIsLoading] = useState(false);


  useEffect(() => {

    fetchCss();

  }, [searchPrams]);




  function fetchCss() {

    setIsLoading(true);

    var postData = { keyword: searchPrams.keyword, page: searchPrams.page, categories: searchPrams.categories }
    postData = JSON.stringify(postData)


    fetch("https://getpostgrid.com/wp-json/post-grid/v2/get_post_section", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: postData,

    })
      .then((response) => {
        if (response.ok && response.status < 400) {
          response.json().then((res) => {


            var items = cssLibrary.items;

            if (res.posts.length > 0) {
              res.posts.map(x => {


                return items.push(x)


              })



              setCssLibrary({ items: items })

            }


            setCssLibraryCats(res.terms)
            setIsLoading(false);

            setTimeout(() => {
              var elem = document.querySelector('#itemsWrap');

              var msnry = new Masonry(elem, {
                // options
                itemSelector: '.item',
                gutter: 15,
                horizontalOrder: true,
                percentPosition: true,
                fitWidth: true

              });


            }, 500)


          });
        }
      })
      .catch((_error) => {
        //this.saveAsStatus = 'error';
        // handle the error
      });

  }







  return (
    <div id="pgTemplates-items" class="pgTemplates-items pl-[160px] pr-[320px] mt-[70px] fixed z-[999] top-6 left-0 w-full h-full overflow-y-scroll pb-[200px]">
      <div className='bg-gray-400 '>

        <div className='flex justify-between items-center p-3 bg-white '>


          <div className='flex  items-center '>
            <div className='px-4'>
              {isLoading && (
                <span className='text-center'><Spinner /></span>
              )}

              {!isLoading && (
                <span className='text-center'><Icon icon={styles} /></span>
              )}


            </div>
            <div>
              <InputControl

                className="w-60 !px-3 !py-1 !rounded-none !text-lg"
                type="text"
                placeholder="Search..."
                value={searchPrams.keyword}
                onChange={(newVal) => {
                  clearTimeout(debounce);
                  debounce = setTimeout(() => {

                    //var newVal = ev.target.value;
                    setCssLibrary({ items: [] })
                    setsearchPrams({ ...searchPrams, keyword: newVal })

                  }, 1000);




                }}



              />
            </div>

            <div className='px-2'>
              <PGDropdown position="bottom right" variant="secondary" options={cssLibraryCats} buttonTitle="Categories" onChange={(option, index) => {




                if (searchPrams.categories.includes(option.value)) {

                  var categoriesX = searchPrams.categories.splice(option.value, 1)

                } else {
                  var categoriesX = searchPrams.categories.concat(option.value)


                }

                setsearchPrams({ ...searchPrams, categories: categoriesX })

                setCssLibrary({ items: [] })


              }} values={[]}></PGDropdown>

            </div>


            <div className='px-4 flex items-center'>
              {
                searchPrams.categories.length > 0 && searchPrams.categories.map((x, index) => {

                  return (

                    <div className='flex items-center mx-1 text-sm  bg-slate-500 text-white'>
                      <span className='cursor-pointer p-1 bg-red-500 inline-block'
                        onClick={() => {
                          setCssLibrary({ items: [] })


                          var categoriesX = searchPrams.categories.splice(index, 1);

                          setsearchPrams({ ...searchPrams, categories: searchPrams.categories })




                        }}

                      >
                        <Icon icon={close} /></span> <span className='px-2 inline-block'>
                        {cssLibraryCats[cssLibraryCats.findIndex(p => p.value == x)].label}


                      </span>
                    </div>

                  )

                })
              }

            </div>

          </div>
          <div>
            {/* <div className='px-4'><span className='cursor-pointer p-1 bg-red-500 inline-block'><Icon icon={close} /></span></div> */}

          </div>



        </div>

        <div className='p-5 '>

          <div id="itemsWrap" className='m-auto'>


            {cssLibrary.items.map(x => {

              return (

                <div className='bg-white inline-block relative pb-16 item mb-3 w-[24%]'


                >
                  <img className='!shadow-none' src={x.thumb_url} alt="" />


                  <div className='flex items-center absolute bottom-0 left-0 w-full p-2 bg-slate-600 bg-opacity-80'>
                    <div className='bg-lime-500 text-white p-1 px-3 cursor-pointer rounded-sm flex items-center hover:bg-lime-600'
                      onClick={(ev) => {


                        var content = x.post_content;

                        var wp_editor = wp.data.dispatch("core/editor");
                        var wp_insertBlocks = wp_editor.insertBlocks;
                        wp_insertBlocks(wp.blocks.parse(content));


                        props.setEnable(false)


                      }}

                    >
                      <span className='inline-block'>
                        <Icon icon={download} className="fill-white	" />
                      </span>
                    </div>
                    <a className='inline-block mx-2 text-white text-lg' target="_blank" href={x.url}>{x.post_title}</a>
                  </div>
                </div>

              )

            })}


          </div>



          <div className='my-5 p-5  text-center'>
            <div className='inline-block bg-lime-500 p-3 px-5 cursor-pointer hover:bg-lime-600 text-white font-bold'
              onClick={(ev) => {
                var pageX = parseInt(searchPrams.page) + 1;
                setsearchPrams({ ...searchPrams, page: pageX })
              }}
            >
              {isLoading && (
                <span className='text-center'><Spinner /></span>
              )}

              Load More


            </div>
          </div>





        </div>


      </div>

    </div>


  )

}


class PGTemplates extends Component {

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
      setEnable,



    } = this.props;








    return (


      <Html setEnable={setEnable} warn={this.state.showWarning} />


    )
  }
}


export default PGTemplates;