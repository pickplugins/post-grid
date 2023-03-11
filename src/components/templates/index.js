

const { Component } = wp.element;
import { applyFilters } from '@wordpress/hooks';
import apiFetch from '@wordpress/api-fetch';
import { PanelBody, RangeControl, Button, ButtonGroup, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, Spinner, CustomSelectControl, Popover } from '@wordpress/components'

import { memo, useMemo, useState, useEffect } from '@wordpress/element'
import { Icon, styles, close, settings, download } from '@wordpress/icons';
import PGDropdown from '../../components/dropdown'
import PGinputText from '../../components/input-text'



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

            console.log(res.posts);

            var items = cssLibrary.items;

            if (res.posts.length > 0) {
              res.posts.map(x => {

                console.log(x);


                return items.push(x)


              })

              console.log(items);


              setCssLibrary({ items: items })

            }


            setCssLibraryCats(res.terms)
            setIsLoading(false);



          });
        }
      })
      .catch((_error) => {
        //this.saveAsStatus = 'error';
        // handle the error
      });

  }







  return (

    <div className='bg-gray-400 '>

      <div className='flex justify-between items-center p-3 bg-white '>


        <div className='flex  items-center '>
          <div className='px-4'><Icon icon={styles} /></div>
          <div>
            <PGinputText

              className="w-60 !px-3 !rounded-none text-lg"
              type="text"
              placeholder="Search..."
              value={searchPrams.keyword}
              onChange={(newVal) => {
                clearTimeout(debounce);
                debounce = setTimeout(() => {
                  setsearchPrams({ ...searchPrams, keyword: newVal })
                }, 1000);


              }}
            />
          </div>

          <div className='px-2'>
            <PGDropdown position="bottom right" variant="secondary" options={cssLibraryCats} buttonTitle="Categories" onChange={(option, index) => {

              console.log(option);



              if (searchPrams.categories.includes(option.value)) {

                var categoriesX = searchPrams.categories.splice(option.value, 1)

              } else {
                var categoriesX = searchPrams.categories.concat(option.value)


              }

              setsearchPrams({ ...searchPrams, categories: categoriesX })

            }} values={[]}></PGDropdown>

          </div>


          <div className='px-4 flex items-center'>
            {
              searchPrams.categories.length > 0 && searchPrams.categories.map((x, index) => {

                return (

                  <div className='flex items-center mx-1 text-sm  bg-slate-500 text-white'>
                    <span className='cursor-pointer p-1 bg-red-500 inline-block'
                      onClick={() => {

                        console.log(x);



                        var categoriesX = searchPrams.categories.splice(x, 1);

                        console.log(categoriesX);


                        setsearchPrams({ ...searchPrams, categories: searchPrams.categories })




                      }}

                    >
                      <Icon icon={close} /></span> <span className='px-2 inline-block'>{cssLibraryCats[index].label}</span>
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

        {isLoading && (
          <div className='text-center'><Spinner /></div>
        )}



        <div className='grid grid-cols-5 gap-5 gap'>






          {cssLibrary.items.map(x => {

            return (

              <div className='bg-white p-5 relative pb-16'
                onClick={(ev) => {


                  var content = x.post_content;
                  console.log(content);


                  var wp_editor = wp.data.dispatch("core/editor");
                  var wp_insertBlocks = wp_editor.insertBlocks;
                  wp_insertBlocks(wp.blocks.parse(content));

                  var pgTemplatesItems = document.querySelector('#pgTemplates-items');

                  pgTemplatesItems.classList.toggle("hidden");



                }}

              >
                <img className='!shadow-none' src={x.thumb_url} alt="" />


                <div className='flex items-center absolute bottom-0 left-0 w-full p-2 bg-slate-600 bg-opacity-80'>
                  <div className='bg-lime-600 text-white p-1 px-3 cursor-pointer rounded-sm flex items-center hover:bg-lime-500'>
                    <span className='inline-block'>
                      <Icon icon={download} />
                    </span>
                  </div>
                  <a className='inline-block mx-2 text-white' target="_blank" href={x.url}>{x.post_title}</a>
                </div>
              </div>

            )

          })}


        </div>


        {!isLoading && (
          <div className='my-5 p-5  text-center'>
            <div className='inline-block bg-lime-600 p-3 px-5 cursor-pointer hover:bg-lime-500 text-white font-bold'
              onClick={(ev) => {
                var pageX = parseInt(searchPrams.page) + 1;
                setsearchPrams({ ...searchPrams, page: pageX })
              }}
            >Load More</div>
          </div>
        )}




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
      val,
      onChange,


    } = this.props;








    return (


      <Html val={val} onChange={onChange} warn={this.state.showWarning} />


    )
  }
}


export default PGTemplates;