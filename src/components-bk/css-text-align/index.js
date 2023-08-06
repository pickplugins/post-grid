

const { Component, RawHTML } = wp.element;
import { Panel, PanelRow, PanelItem, Button, Dropdown, SelectControl, Popover, Spinner } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'

import { __experimentalInputControl as InputControl } from '@wordpress/components';
import { link, linkOff } from "@wordpress/icons";
import apiFetch from '@wordpress/api-fetch';




class PGcssTextAlign extends Component {


  render() {

    var {
      val,
      onChange,


    } = this.props;


    function Html() {



      return (

        <div>
          <div className={[(val == 'left') ? 'bg-blue-600 text-white inline-block px-2 py-1 border cursor-pointer' : 'inline-block px-2 py-1 border cursor-pointer']} onClick={ev => {
            onChange('left', 'textAlign');
          }}>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 19.8h8.9v-1.5H4v1.5zm8.9-15.6H4v1.5h8.9V4.2zm-8.9 7v1.5h16v-1.5H4z"></path></svg>
          </div>
          <div className={[(val == 'center') ? 'bg-blue-600 text-white inline-block px-2 py-1 border cursor-pointer' : 'inline-block px-2 py-1 border cursor-pointer']} onClick={ev => {

            onChange('center', 'textAlign');
          }}>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M16.4 4.2H7.6v1.5h8.9V4.2zM4 11.2v1.5h16v-1.5H4zm3.6 8.6h8.9v-1.5H7.6v1.5z"></path></svg>
          </div>
          <div className={[(val == 'right') ? 'bg-blue-600 text-white inline-block px-2 py-1 border cursor-pointer' : 'inline-block px-2 py-1 border cursor-pointer']} onClick={ev => {
            onChange('right', 'textAlign');
          }}>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M11.1 19.8H20v-1.5h-8.9v1.5zm0-15.6v1.5H20V4.2h-8.9zM4 12.8h16v-1.5H4v1.5z"></path></svg>
          </div>


          <div className={[(val == 'justify') ? 'bg-blue-600 text-white inline-block px-2 py-1 border cursor-pointer' : 'inline-block px-2 py-1 border cursor-pointer']} onClick={ev => {
            onChange('justify', 'textAlign');
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
              <rect width="20" height="2.35838" fill="black" />
              <rect y="10.8208" width="20" height="2.35838" fill="black" />
              <rect y="21.6416" width="20" height="2.35838" fill="black" />
            </svg>

          </div>

        </div>




      )

    }


    return (


      <Html />


    )
  }
}


export default PGcssTextAlign;