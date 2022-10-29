
document.addEventListener("DOMContentLoaded", function (event) {



    var PGBlockAccordion = document.querySelectorAll('.PGBlockAccordion');
    var pgAccordionHeader = document.querySelectorAll('.pg-accordion-header');


    if (PGBlockAccordion != null) {
        PGBlockAccordion.forEach(item => {



            //console.log(item);

        })
    }




    if (pgAccordionHeader != null) {
        pgAccordionHeader.forEach(item => {

            // item.addEventListener('click', function () {

            //     var isActive = item.classList.contains('active');
            //     var blockId = item.getAttribute('blockId');
            //     var index = item.getAttribute('index');


            //     var contentWrap = document.getElementById(blockId + index);
            //     console.log(contentWrap);


            //     if (isActive) {
            //         item.classList.remove('active');
            //         contentWrap.style.display = 'none'

            //     } else {
            //         item.classList.add('active');
            //         contentWrap.style.display = 'block'


            //     }
            // })

        })
    }





});

