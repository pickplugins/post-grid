import PGTemplates from './components/templates'
import { memo, useMemo, useState, useEffect } from '@wordpress/element'


function TemplatesBtn(props) {

    // if (!props.warn) {
    //     return null;
    // }

    const [enable, setEnable] = useState(false);


    return (

        <>
            <div id="pgTemplatesEnable" 
            class="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-800 text-white font-medium rounded hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700"
            // class="bg-blue-700 px-5 py-2 cursor-pointer rounded-sm text-white font-bold hover:text-white"
                onClick={(ev) => {
                    setEnable(!enable);

                }}

            >
                {enable && (
                    <span class="dashicons dashicons-no-alt"></span>
                )}
                {!enable && (
                    <span class="dashicons dashicons-buddicons-groups"></span>
                )}




                <span className='inline-block mx-2'>Templates</span>
            </div>

            {enable && <PGTemplates setEnable={setEnable} />}

        </>

    )

}









document.addEventListener("DOMContentLoaded", DOMContentLoadedImport);

function DOMContentLoadedImport() {




    setTimeout(() => {


        var headerSettings = document.querySelector('.edit-post-header__settings');





        var wpcontent = document.querySelector('#wpcontent');
        var wpfooter = document.querySelector('#wpfooter');
        var wpbody = document.querySelector('#wpbody');

        var templatesWrap = document.querySelector('#editor .interface-interface-skeleton__content');

        var importEl = document.createElement('div');
        var html = '<div class="pgTemplates" id="pgTemplatesBtn"></div>';

        importEl.innerHTML = html;
        //headerSettings.appendChild(importEl);

        if (headerSettings != null) {
            headerSettings.prepend(importEl);

        }


        var pgTemplatesBtn = document.querySelector('#pgTemplatesBtn');

        if (pgTemplatesBtn != null) {
            wp.element.render(<TemplatesBtn />, pgTemplatesBtn)

        }




    }, 2000)



}




















