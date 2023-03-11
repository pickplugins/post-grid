

const { Component } = wp.element;
import { Button, Dropdown, } from '@wordpress/components'
import { applyFilters } from '@wordpress/hooks';
import apiFetch from '@wordpress/api-fetch';

import { __experimentalInputControl as InputControl, ColorPalette, RangeControl } from '@wordpress/components';
import { memo, useMemo, useState, useEffect } from '@wordpress/element'
import { Icon, styles, close, settings, download } from '@wordpress/icons';
import PGDropdown from '../../components/dropdown'
import PGinputText from '../../components/input-text'



function Html(props) {
  if (!props.warn) {
    return null;
  }

  const [queryCss, setQueryCss] = useState({ keyword: '', page: 1, category: '', loading: false });

  const [searchPrams, setsearchPrams] = useState({ keyword: "", categories: [] });
  var [cssLibrary, setCssLibrary] = useState({ items: [] });
  var [cssLibraryCats, setCssLibraryCats] = useState([]);
  var [debounce, setDebounce] = useState(null); // Using the hook.
  var [isLoading, setIsLoading] = useState(false);


  var categoriesArgs = {
    none: { label: 'Choose..', value: '' },
    meattheteam: { label: 'Meet the Team', value: 'meattheteam' },
    testimonial: { label: 'Testimonial', value: 'testimonial' },
    header: { label: 'Header', value: 'header' },
    footer: { label: 'Footer', value: 'footer' },
    character: { label: 'Character', value: 'character' },
  };

  useEffect(() => {

    fetchCss();

  }, [queryCss]);




  function fetchCss() {

    setIsLoading(true);
    setQueryCss({ ...queryCss, loading: true })

    var postData = { keyword: queryCss.keyword, page: queryCss.page, category: queryCss.category }
    postData = JSON.stringify(postData)


    fetch("https://getpostgrid.com/wp-json/post-grid/v2/get_post_css", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: postData,

    })
      .then((response) => {
        if (response.ok && response.status < 400) {
          response.json().then((res) => {

            setCssLibrary({ items: res.posts })
            setCssLibraryCats(res.terms)
            setIsLoading(false);

            setQueryCss({ ...queryCss, loading: false })


          });
        }
      })
      .catch((_error) => {
        //this.saveAsStatus = 'error';
        // handle the error
      });

  }







  return (

    <div className=''>

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
                setsearchPrams({ ...searchPrams, keyword: newVal })



              }}
            />
          </div>

          <div className='px-2'>
            <PGDropdown position="bottom right" variant="secondary" options={categoriesArgs} buttonTitle="Categories" onChange={(option, index) => {



              if (searchPrams.categories.includes(option.value)) {

                var categoriesX = searchPrams.categories.splice(option.value, 1)

              } else {
                var categoriesX = searchPrams.categories.concat(option.value)


              }

              //var categoriesX = option.value;

              setsearchPrams({ ...searchPrams, categories: categoriesX })

            }} values={[]}></PGDropdown>

          </div>

          <div className='px-4 flex items-center'>
            {
              searchPrams.categories.length > 0 && searchPrams.categories.map(x => {

                return (

                  <div className='flex items-center mx-1 text-sm  bg-slate-500 text-white'><span className='cursor-pointer p-1 bg-red-500 inline-block'><Icon icon={close} /></span> <span className='px-2 inline-block'>{categoriesArgs[x].label}</span></div>

                )

              })
            }

          </div>




        </div>
        <div>
          {/* <div className='px-4'><span className='cursor-pointer p-1 bg-red-500 inline-block'><Icon icon={close} /></span></div> */}

        </div>



      </div>

      <div className='p-5 overflow-y-scroll'>

        <div className='grid grid-cols-5 gap-5 gap'>

          {JSON.stringify(queryCss)}


          {cssLibrary.items.map(x => {

            return (

              <div className='bg-white p-5 relative'
                onClick={(ev) => {


                  //var objCss = JSON.parse(x.post_content);
                  // var objCss = {
                  //   styles: { "backgroundColor": { "Desktop": "#9DD6DF" }, "textAlign": { "Desktop": "center" }, "border": { "Desktop": "5px dashed #000000" } }, hover: { "border": { "Desktop": "2px dashed #A084CF" } }
                  // }


                  //props.onChange(objCss);


                }}

              >
                <img className='!shadow-none' src={x.thumb_url} alt="" />

                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-lime-600 text-white p-2 px-5 text-lg cursor-pointer rounded-sm flex items-center'>
                  <span className='inline-block'>
                    <Icon icon={download} />
                  </span>
                  <span className='mx-2'>
                    Import
                  </span>

                </div>
                <div className='text-center text-md'>

                  <a className='' target="_blank" href={x.url}>{x.post_title}</a>
                </div>
              </div>

            )

          })}


        </div>

        <div className='my-5 p-5  text-center'>

          <div className='inline-block bg-lime-600 p-3 px-5 cursor-pointer hover:bg-lime-500 text-white font-bold'>Load More</div>

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
      val,
      onChange,


    } = this.props;








    return (


      <Html val={val} onChange={onChange} warn={this.state.showWarning} />


    )
  }
}


export default PGTemplates;