
document.addEventListener("DOMContentLoaded", function (event) {

    var mobileToggle = document.querySelector(".mobile-menu-toggle");
    var mobileMenuWrap = document.querySelector(".mobile-menu-wrap");
    var mobileMenuClose = document.querySelector(".mobile-menu-close");

    mobileToggle.addEventListener("click", (event) => {

        mobileMenuWrap.toggleAttribute("active");


    });
    mobileMenuClose.addEventListener("click", (event) => {

        mobileMenuWrap.toggleAttribute("active");


    });




});

