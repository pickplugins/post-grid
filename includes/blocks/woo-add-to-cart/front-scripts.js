export function setupWooAddToCart() {
    document.addEventListener("DOMContentLoaded", function (event) {

        var quantityDecrease = document.querySelector('.quantity-decrease');
        var quantityIncrease = document.querySelector('.quantity-increase');
        var quantityInput = document.querySelector('.quantity-input');

        if (quantityDecrease != null) {
            quantityDecrease.addEventListener('click', function (event) {
                var blockId = quantityDecrease.parentElement.getAttribute("data-blockid")
                var quantityInputX = document.querySelector('.' + blockId + ' input');
                var quantity = parseInt(quantityInputX.value) - 1

                updateQuantity(blockId, quantity);
            })
        }

        if (quantityIncrease != null) {
            quantityIncrease.addEventListener('click', function (event) {
                var blockId = quantityIncrease.parentElement.getAttribute("data-blockid")
                var quantityInputX = document.querySelector('.' + blockId + ' input');
                var quantity = parseInt(quantityInputX.value) + 1
                updateQuantity(blockId, quantity);
            })
        }

        if (quantityInput != null) {
            quantityInput.addEventListener('keyup', function (event) {
                var val = event.target.value;
                var blockId = quantityInput.parentElement.getAttribute("data-blockid")

                updateQuantity(blockId, val);
            })
        }



        function updateQuantity(blockId, quantity) {
            var cartBtn = document.querySelector('.' + blockId + ' .cartBtn');
            //var quantity = parseInt(cartBtn.getAttribute("quantity"))

            var quantityInputX = document.querySelector('.' + blockId + ' input');


            if (quantity != 0) {

                quantityInputX.value = quantity;

                cartBtn.setAttribute('data-quantity', quantity)

            }



        }


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
}