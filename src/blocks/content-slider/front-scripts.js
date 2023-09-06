document.addEventListener('DOMContentLoaded', function () {

    var dataSplideWraps = document.querySelectorAll('[data-splide]');



    if (dataSplideWraps != null) {
        dataSplideWraps.forEach(item => {
            var dataSplideargs = item.getAttribute("data-splide");




            var dataSplideargsObj = JSON.parse(dataSplideargs);
            console.log(dataSplideargsObj);


            var splide = new Splide('#' + item.id);
            splide.mount();


        })
    }



});