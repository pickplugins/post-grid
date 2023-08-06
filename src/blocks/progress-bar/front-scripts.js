
document.addEventListener("DOMContentLoaded", function (event) {





    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)

        );
    }




    var PGBlockProgressBar = document.querySelectorAll('.PGBlockProgressBar');

    console.log(PGBlockProgressBar);


    if (PGBlockProgressBar != null) {
        PGBlockProgressBar.forEach(item => {
            var progressBarArgs = item.getAttribute("data-progress-bar");




            var progressBarArgsObj = JSON.parse(progressBarArgs);

            console.log(progressBarArgsObj);



            var blockId = progressBarArgsObj.blockId
            var start = progressBarArgsObj.start
            var end = progressBarArgsObj.end
            var duration = progressBarArgsObj.duration
            var animate = progressBarArgsObj.animate
            var type = progressBarArgsObj.type


            var wrapHandle = '.' + blockId + ' .progress-fill';


            if (animate) {

                document.addEventListener('scroll', function (e) {

                    // console.log(e);


                    const target = document.querySelector(wrapHandle);

                    //console.log('scroll...');
                    var isInView = isInViewport(target);

                    var animateName = 'animateWidthProgress';
                    if (type == 'horizontal') {
                        var animateName = 'animateWidthProgress';
                    }
                    if (type == 'vertical') {
                        var animateName = 'animateHeightProgress';
                    }


                    if (isInView) {
                        target.classList.add(animateName)
                    } else {
                        target.classList.remove(animateName)
                    }

                })



            }









        })
    }








});

