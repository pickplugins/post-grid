

const { Component } = wp.element;
import { Button, Dropdown, PanelRow, SelectControl, Spinner } from '@wordpress/components'

import { __experimentalInputControl as InputControl, ColorPalette, RangeControl, } from '@wordpress/components';

import { memo, useMemo, useState, useEffect } from '@wordpress/element'
import PGtabs from '../../components/tabs'
import PGtab from '../../components/tab'
import { Icon, styles, settings } from '@wordpress/icons';
import html2canvas from 'html2canvas';







function Html(props) {
  if (!props.warn) {
    return null;
  }

  const [queryCss, setQueryCss] = useState({ keyword: '', page: 1, category: '', });

  var [cssLibrary, setCssLibrary] = useState({ items: [] });
  var [cssLibraryCats, setCssLibraryCats] = useState([]);
  var [isLoading, setIsLoading] = useState(false);
  var [debounce, setDebounce] = useState(null); // Using the hook.



  var [cssSubmission, setCssSubmission] = useState({
    enable: false,
    title: '',
    category: "",
    tags: "",

    status: '', // idle => ready to submit, busy => submission process, falied => submission falied, success=> Successfully submitted!
    successMessage: 'Successfully submitted!',
    failedMessage: 'Submission was failed!',
    idleMessage: 'Submit to CSS Library',
    message: '',

    timeout: 2
  });


  useEffect(() => {

    fetchCss();

  }, [queryCss]);



  function fetchCss() {

    setIsLoading(true);

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
            console.log(isLoading);


          });
        }
      })
      .catch((_error) => {
        //this.saveAsStatus = 'error';
        // handle the error
      });

  }

  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      console.log(imgData);

    });
  };




  return (

    <div className=' mt-4'>



      <PGtabs
        activeTab="cssItems"
        orientation="horizontal"
        activeClass="active-tab"
        onSelect={(tabName) => { }}
        tabs={[
          {
            name: 'cssItems',
            title: 'Library',
            icon: settings,
            className: 'tab-cssItems',
          },
          {
            name: 'submit',
            title: 'Submission',
            icon: styles,
            className: 'tab-submit',
          },
        ]}
      >
        <PGtab name="cssItems">


          <PanelRow>
            <InputControl
              value={queryCss.keyword}
              type="text"
              placeholder="Search Styles..."
              onChange={(newVal) => {
                clearTimeout(debounce);
                debounce = setTimeout(() => {



                  setQueryCss({ keyword: newVal, page: 1, category: queryCss.category })
                }, 1000);

                //fetchLayouts();
              }}

            />
            <SelectControl
              className='w-full'
              style={{ margin: 0 }}
              label=""
              value={queryCss.category}
              options={cssLibraryCats}
              onChange={(newVal) => {

                setQueryCss({ keyword: queryCss.keyword, page: 1, category: newVal })
                //fetchLayouts();


              }}
            />
          </PanelRow>



          <div className='items'>

            {cssLibrary.items.map(x => {

              return (

                <div className='p-4 text-center border cursor-pointer my-3 relative'
                  onClick={(ev) => {

                    console.log(x.post_content);

                    var objCss = JSON.parse(x.post_content);


                    console.log(x);

                    // var objCss = {
                    //   styles: { "backgroundColor": { "Desktop": "#9DD6DF" }, "textAlign": { "Desktop": "center" }, "border": { "Desktop": "5px dashed #000000" } }, hover: { "border": { "Desktop": "2px dashed #A084CF" } }
                    // }


                    props.onChange(objCss);


                  }}

                >
                  <img src={x.thumb_url} alt="" />
                  <div className='absolute bottom-0 left-0 w-full p-2 bg-green-700 text-white'>

                    <a className='text-white' target="_blank" href={x.url}>{x.post_title}</a>
                  </div>
                </div>

              )

            })}


          </div>


          <div className='w-full rounded-sm  py-2 bg-blue-500 text-[14px] font-bold text-white cursor-pointer my-3 text-center' onClick={(_ev) => {

            var page = queryCss.page + 1;

            console.log(page);


            setQueryCss({ keyword: queryCss.keyword, page: page, category: queryCss.category, });

          }}>
            {isLoading == true && <span className='text-center'>

              <Spinner />
            </span>}


            Load More
          </div>





        </PGtab>
        <PGtab name="submit">

          <div onClick={printDocument}>printDocument</div>

          <div>
            <label for="">Item Title</label>
            <InputControl
              className="w-full"
              value={cssSubmission.title}
              type="text"
              placeholder="Ex: Blue Button"
              onChange={(newVal) => {

                setCssSubmission({ ...cssSubmission, title: newVal });

              }}

            />
          </div>


          <PanelRow>
            <label for="">Choose category</label>

            <SelectControl
              className='w-full'
              style={{ margin: 0 }}
              label=""
              value={cssSubmission.category}
              options={cssLibraryCats}
              onChange={(newVal) => {

                setCssSubmission({ ...cssSubmission, category: newVal });

              }}
            />
          </PanelRow>

          <div>
            <label for="">Add Some Tags</label>
            <InputControl
              className="w-full"
              value={cssSubmission.tags}
              type="text"
              placeholder="button, blue button"
              onChange={(newVal) => {

                setCssSubmission({ ...cssSubmission, tags: newVal });

              }}

            />
          </div>


          <div
            className='bg-blue-500 my-5 px-10 py-3 text-white cursor-pointer text-center rounded-sm mb-5'
            onClick={ev => {

              setIsLoading(true);

              setCssSubmission({ ...cssSubmission, status: 'busy' });

              var objX = Object.assign({}, props.obj);

              if (objX.options != undefined) {
                delete objX.options;
              }



              var postData = { title: cssSubmission.title, content: objX, category: cssSubmission.category, tags: cssSubmission.tags }
              postData = JSON.stringify(postData)



              fetch("https://getpostgrid.com/wp-json/post-grid/v2/submit_css", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                },
                body: postData,
              })
                .then((response) => {
                  if (response.ok && response.status < 400) {
                    response.json().then((res) => {

                      // setCssLibrary({ items: res.posts })
                      // setCssLibraryCats(res.terms)

                      console.log(res);

                      if (res.status == 'success') {
                        setCssSubmission({ ...cssSubmission, status: 'success', message: res.message });


                        setTimeout(() => {
                          setCssSubmission({ ...cssSubmission, status: 'idle', title: '', tags: '', message: res.message });

                        }, 3000)

                      } else {

                        setCssSubmission({ ...cssSubmission, status: 'falied', message: res.message });


                        setTimeout(() => {
                          setCssSubmission({ ...cssSubmission, status: 'idle', message: res.message });

                        }, 3000)

                      }





                    });
                  }
                })
                .catch((_error) => {
                  //this.saveAsStatus = 'error';
                  // handle the error
                });
            }}>Submit to CSS Library

            {cssSubmission.status == 'busy' && <span className='text-center'>
              <Spinner />
            </span>}
          </div>


          {cssSubmission.status == 'success' && <div className=' font-bold text-green-700'>
            {cssSubmission.successMessage}
          </div>}

          {cssSubmission.status == 'falied' && <div>
            <div className=' font-bold text-red-500'>{cssSubmission.failedMessage}</div>

            <p>{cssSubmission.message}</p>
          </div>}





        </PGtab>
      </PGtabs>












    </div>




  )

}


class PGCssLibrary extends Component {

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
      blockId,
      obj,
      onChange,


    } = this.props;








    return (


      <Html blockId={blockId} obj={obj} onChange={onChange} warn={this.state.showWarning} />


    )
  }
}


export default PGCssLibrary;