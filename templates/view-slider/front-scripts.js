
document.addEventListener('DOMContentLoaded', function () {
    var dataSplideWraps = document.querySelectorAll('[data-splide]');

    console.log(dataSplideWraps);


    if (dataSplideWraps != null) {
        dataSplideWraps.forEach(item => {
            var dataSplideargs = item.getAttribute("data-splide");
            var dataSplideargsObj = JSON.parse(dataSplideargs);

            console.log(item.id);

            var splide = new Splide('#' + item.id);
            splide.mount();
        })
    }
});
