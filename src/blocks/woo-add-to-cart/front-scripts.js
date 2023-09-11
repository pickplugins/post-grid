
document.addEventListener("DOMContentLoaded", function (event) {

    var quantityDecrease = document.querySelector('.quantity-decrease');
    var quantityIncrease = document.querySelector('.quantity-increase');
    var quantityInput = document.querySelector('.quantity-input');


    quantityDecrease.addEventListener('click', function (event) {
        var target = event.target.value;
        var blockId = target.getAttribute("data-blockid");

        console.log('quantityDecrease');
        console.log(event.target);
        console.log(blockId);


    })
    quantityIncrease.addEventListener('click', function (event) {
        console.log('quantityIncrease');
        console.log(event.target);

    })
    quantityInput.addEventListener('keyup', function (event) {
        console.log('quantityIncrease');
        console.log(event.target);

        var val = event.target.value;

        console.log(val);


    })




    // pgTabs.forEach(pgTab => {

    //     var pgTabId = pgTab.getAttribute("id");




    //     var navItems = document.querySelectorAll(`#${pgTabId} .nav-item`);
    //     var tabPanels = document.querySelectorAll(`#${pgTabId} .pg-tabs-panel`);




    //     navItems.forEach(item => {
    //         item.addEventListener('click', function (event) {

    //             navItems.forEach(tab => {
    //                 tab.classList.remove('nav-item-active')
    //                 tab.classList.add('nav-item')
    //             });

    //             // hide all tab panels
    //             tabPanels.forEach(panel => {
    //                 // panel.hidden = true;
    //                 panel.classList.remove('pg-tabs-panel-active')

    //             });

    //             event.currentTarget.classList.remove('nav-item')

    //             event.currentTarget.classList.add('nav-item-active')
    //             var tabId = event.currentTarget.getAttribute("data-tab-id");


    //             var tabByattr = document.querySelector(`.pg-tabs-panel[data-tab-id="${tabId}"]`);

    //             tabByattr.classList.add('pg-tabs-panel-active')


    //             //tabByattr.hidden = false;
    //         })

    //     })





    // })


});

