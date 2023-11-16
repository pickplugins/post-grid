document.addEventListener("DOMContentLoaded", function (event) {
	var pgTabs = document.querySelectorAll(".pg-tabs");

	pgTabs.forEach((pgTab) => {
		var pgTabId = pgTab.getAttribute("id");

		var navItems = document.querySelectorAll(`#${pgTabId} .nav-item`);
		var tabPanels = document.querySelectorAll(`#${pgTabId} .pg-tabs-panel`);

		navItems.forEach((item) => {
			item.addEventListener("click", function (event) {
				navItems.forEach((tab) => {
					tab.classList.remove("nav-item-active");
					tab.classList.add("nav-item");
				});

				// hide all tab panels
				tabPanels.forEach((panel) => {
					// panel.hidden = true;
					panel.classList.remove("pg-tabs-panel-active");
				});

				event.currentTarget.classList.remove("nav-item");

				event.currentTarget.classList.add("nav-item-active");
				var tabId = event.currentTarget.getAttribute("data-tab-id");

				var tabByattr = document.querySelector(
					`.pg-tabs-panel[data-tab-id="${tabId}"]`
				);

				tabByattr.classList.add("pg-tabs-panel-active");
				console.log(tabByattr);

				//tabByattr.hidden = false;
			});
		});
	});

	// var navItems = document.querySelectorAll('.pg-tabs .nav-item');
	// var tabPanels = document.querySelectorAll('.pg-tabs .pg-tabs-panel');

	// hide all tab panels
	// tabPanels.forEach(panel => {
	//     panel.hidden = true;
	// });
	// mark all tabs as unselected
	// navItems.forEach(tab => {
	//     tab.classList.remove('nav-item-active')
	// });

	//event.currentTarget.classList.add('nav-item-active')
	//var tabId = event.currentTarget.getAttribute("data-tab-id");
	//var tabByattr = document.querySelector(`.pg-tabs-panel[data-tab-id="${tabId}"]`);
	//tabByattr.hidden = false;

	// navItems.forEach(item => {
	//     item.addEventListener('click', function (event) {
	//         // hide all tab panels
	//         tabPanels.forEach(panel => {
	//             panel.hidden = true;
	//         });
	//         // mark all tabs as unselected
	//         navItems.forEach(tab => {
	//             tab.classList.remove('nav-item-active')
	//         });
	//         event.currentTarget.classList.add('nav-item-active')
	//         var tabId = event.currentTarget.getAttribute("data-tab-id");
	//         var tabByattr = document.querySelector(`.pg-tabs-panel[data-tab-id="${tabId}"]`);
	//         tabByattr.hidden = false;

	//     })
	// })
});

