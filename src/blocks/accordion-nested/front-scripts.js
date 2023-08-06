
document.addEventListener("DOMContentLoaded", function (event) {

    jQuery(document).ready(function ($) {

        $(function () {
            $(".pg-accordion-nested").accordion({
                active: 999,
                collapsible: true,
                event: 'click',
                heightStyle: 'content',
                icons: {
                    "header": false,
                    "activeHeader": false
                }

            });
        });

    });




});

