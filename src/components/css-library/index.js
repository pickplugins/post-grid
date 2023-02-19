

const { Component } = wp.element;
import { Button, Dropdown, } from '@wordpress/components'

import { __experimentalInputControl as InputControl, ColorPalette, RangeControl } from '@wordpress/components';
import { memo, useMemo, useState } from '@wordpress/element'

function submitToCssLibrary(obj) {










}


function Html(props) {
  if (!props.warn) {
    return null;
  }

  var [cssLibrary, setCssLibrary] = useState({ items: [] });
  var [cssLibraryCats, setCssLibraryCats] = useState([]);


  fetch("http://localhost/wp-22/wp-json/post-grid/v2/get_post_css", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((response) => {
      if (response.ok && response.status < 400) {
        response.json().then((res) => {

          setCssLibrary({ items: res.posts })
          setCssLibraryCats(res.terms)

        });
      }
    })
    .catch((_error) => {
      //this.saveAsStatus = 'error';
      // handle the error
    });



  return (

    <div className=' mt-4'>


      <div
        className='bg-blue-500 px-10 py-3 text-white cursor-pointer text-center rounded-sm mb-5'
        onClick={ev => {



          var objX = Object.assign({}, props.obj);

          if (objX.options != undefined) {
            delete objX.options;
          }



          var postData = { content: objX, category: 'button', tags: 'button link ' }
          postData = JSON.stringify(postData)



          fetch("http://localhost/wp-22/wp-json/post-grid/v2/submit_css", {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: postData,
          })
            .then((response) => {
              if (response.ok && response.status < 400) {
                response.json().then((data) => {

                  // setCssLibrary({ items: res.posts })
                  // setCssLibraryCats(res.terms)

                });
              }
            })
            .catch((_error) => {
              //this.saveAsStatus = 'error';
              // handle the error
            });






        }}>Submit to CSS Library</div>


      <div className='items'>

        {cssLibrary.items.map(x => {

          return (

            <div className='p-4 text-center border cursor-pointer my-3'
              onClick={(ev) => {

                console.log(x.post_content);

                var objCss = JSON.parse(x.post_content);


                console.log(objCss);

                // var objCss = {
                //   styles: { "backgroundColor": { "Desktop": "#9DD6DF" }, "textAlign": { "Desktop": "center" }, "border": { "Desktop": "5px dashed #000000" } }, hover: { "border": { "Desktop": "2px dashed #A084CF" } }
                // }


                props.onChange(objCss);


              }}

            >{x.post_title}</div>

          )

        })}


      </div>









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
      val,
      obj,
      onChange,


    } = this.props;








    return (


      <Html obj={obj} onChange={onChange} warn={this.state.showWarning} />


    )
  }
}


export default PGCssLibrary;