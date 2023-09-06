

const { Component, RawHTML } = wp.element;
import { Panel, PanelRow, PanelItem, Button, Dropdown, SelectControl, Popover } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'

import { __experimentalInputControl as InputControl } from '@wordpress/components';
import { link, linkOff } from "@wordpress/icons";




class PGTutorials extends Component {







  render() {

    var {

      links,


    } = this.props;




    function Html(props) {

      const [filteredLinks, setfilteredLinks] = useState([]);
      const [keyword, setKeyword] = useState('');





      return (

        <div className='my-2'>

          <div>
            <InputControl type="text" className='w-full rounded-none px-3 py-2' placeholder='Search Tutorials'
              value={keyword}
              onChange={(newVal) => {

                setKeyword(newVal);

                setfilteredLinks([]);
                var newLinks = []

                var xLink = links.map((x, index) => {


                  var linkObj = {};


                  let position = x.label.toLowerCase().search(newVal.toLowerCase());


                  if (position < 0) {
                    linkObj.exclude = true;
                  } else {
                    linkObj.exclude = false;

                  }

                  if (newVal.length > 0) {
                    let label = x.label.replace(newVal, "<span class='bg-amber-500'>" + newVal + "</span>");
                    linkObj.label = label;

                  } else {
                    linkObj.label = x.label;
                  }


                  linkObj = { ...x, exclude: linkObj.exclude, label: linkObj.label }

                  return linkObj;

                  //newLinks.push(x);

                })
                setfilteredLinks(xLink);


              }} />

          </div>


          <div className='my-5'>

            {keyword.length == 0 && links.map(link => {

              return (
                <>
                  {link.url.length > 0 && <a className='block my-1 text-[14px] hover:underline' href={link.url} target="_blank"><span class="dashicons dashicons-editor-help"></span> {link.label}</a>}
                </>

              )

            })}

            {keyword.length > 0 && filteredLinks.map(link => {

              if (link.exclude === false) {
                return (
                  <>
                    {link.url.length > 0 && <a className='block my-1 text-[14px] hover:underline' href={link.url} target="_blank"><span class="dashicons dashicons-editor-help"></span> {link.label}</a>}
                  </>)
              }


            })}


          </div>

        </div>

      )

    }


    return (

      <>
        <Html />

      </>

    )
  }
}


export default PGTutorials;