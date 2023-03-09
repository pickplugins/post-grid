// custom-link-in-toolbar.js
// wrapped into IIFE - to leave global space clean.
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'










function WpblockhubImportButton() {





    //alert('Hello');

    setTimeout(() => {

        var node = document.querySelector('.edit-post-header__settings');

        var wpcontent = document.querySelector('#wpcontent');

        var importEl = document.createElement('div');
        var html = '<div class="pgTemplates">';
        html += '<button id="pgTemplatesEnable" class="components-button components-icon-button bg-lime-700 text-white font-bold hover:text-white"><span class="dashicons dashicons-admin-appearance mr-3"></span> Templates</button>';
        html += '</div>';
        importEl.innerHTML = html;
        //node.appendChild(importEl);
        node.prepend(importEl);

        var html2 = '';
        var importEl = document.createElement('div');

        html2 += '<div   id="pgTemplates-items" class="pgTemplates-items hidden fixed z-[999] top-6 opacity-80 left-0 w-full h-full bg-gray-400"></div>';
        importEl.innerHTML = html2;
        //node.appendChild(importEl);
        wpcontent.prepend(importEl);




        var pgTemplatesEnable = document.querySelector('#pgTemplatesEnable');
        var pgTemplatesItems = document.querySelector('#pgTemplates-items');

        console.log(pgTemplatesEnable);
        console.log(pgTemplatesItems);


        if (pgTemplatesEnable != null) {

            pgTemplatesEnable.addEventListener('click', function () {


                pgTemplatesItems.classList.toggle("hidden");




                // pgTemplatesItems.style.display = 'block'


            })
        }











    }, 2000)

















}

document.addEventListener("DOMContentLoaded", WpblockhubImportButton);


setTimeout(() => {


    function Greeting(props) {
        return wp.element.createElement(
            'span',
            null,
            'Hello ' + props.toWhom + '!'
        );
    }

    wp.element
        .render(wp.element.createElement(Greeting, { toWhom: 'World' }));

}, 500)