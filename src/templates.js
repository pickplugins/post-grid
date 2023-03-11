import PGTemplates from './components/templates'
import { memo, useMemo, useState, useEffect } from '@wordpress/element'


function TemplatesBtn(props) {

    const [enable, setEnable] = useState(false);


    return (

        <div id="pgTemplatesEnable" class="bg-blue-700 text-white font-bold hover:text-white"
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




            <span className='inline-block mx-3'>Templates</span>
        </div>

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
        headerSettings.prepend(importEl);


        var pgTemplatesBtn = document.querySelector('#pgTemplatesBtn');
        wp.element.render(<TemplatesBtn />, pgTemplatesBtn)






        var html2 = '';
        var importEl = document.createElement('div');

        html2 += '<div   id="pgTemplates-items" class="pgTemplates-items pl-[160px] mt-[70px] hidden fixed z-[999] top-6 left-0 w-full h-full bg-gray-400"></div>';
        importEl.innerHTML = html2;
        //headerSettings.appendChild(importEl);
        wpbody.prepend(importEl);




        var pgTemplatesEnable = document.querySelector('#pgTemplatesEnable');
        var pgTemplatesItems = document.querySelector('#pgTemplates-items');



        console.log(pgTemplatesEnable);
        console.log(pgTemplatesItems);


        if (pgTemplatesEnable != null) {

            pgTemplatesEnable.addEventListener('click', function () {


                pgTemplatesItems.classList.toggle("hidden");
                wp.element.render(<PGTemplates />, pgTemplatesItems)

            })
        }











    }, 2000)



}




















