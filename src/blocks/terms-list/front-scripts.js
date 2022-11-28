
document.addEventListener("DOMContentLoaded", function (event) {



    var groupLable = document.querySelectorAll('.group-lable');







    if (groupLable != null) {
        groupLable.forEach(item => {

            item.addEventListener('click', function () {

                var isActive = item.classList.contains('active');
                var wrapid = item.getAttribute('wrapid');


                var childWrap = document.getElementById('child-wrap-' + wrapid);
                console.log(childWrap);

                if (childWrap != null) {

                    if (isActive) {
                        item.classList.remove('active');
                        childWrap.style.display = 'none'

                    } else {
                        item.classList.add('active');
                        childWrap.style.display = 'block'
                    }
                }


            })

        })
    }





});

