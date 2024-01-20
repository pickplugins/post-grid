
document.addEventListener("DOMContentLoaded", function (event) {

    jQuery(document).ready(function ($) {

        $(function () {
            $(".wp-block-post-grid-accordions").accordion({
                active: 999,
                collapsible: true,
                event: 'click',
                heightStyle: 'content',
                icons: {
                    "header": "",
                    "activeHeader": ""
                }

            });
        });

    });




});

