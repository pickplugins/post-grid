document.addEventListener("DOMContentLoaded", function (event) {
	var pgTabs = document.querySelectorAll(".pg-tabs");
	var tabData = document.querySelectorAll("[data-tabData]");

	if (tabData != null) {
		tabData.forEach((item) => {
			var tabDataX = item.getAttribute("data-tabData");
			var tabDataObject = JSON.parse(tabDataX);
			var activeTab = tabDataObject.activeTab;

			pgTabs.forEach((pgTab) => {
				console.log("first");
				var pgTabId = pgTab.getAttribute("id");
				if (activeTab == pgTabId) {
					pgTab.classList.add("nav-item-active");
				}
			});
		});
	}

	pgTabs.forEach((pgTab) => {
		var pgTabId = pgTab.getAttribute("id");
		var tabDataX = pgTab.getAttribute("data-tabData");
		var tabDataObject = JSON.parse(tabDataX);
		var activeTab = tabDataObject.activeTab;

		var navItems = document.querySelectorAll(`#${pgTabId} .nav-item`);
		var tabPanels = document.querySelectorAll(`#${pgTabId} .pg-tabs-panel`);

		var iconToggle = pgTab.querySelectorAll(".nav-icon-toggle");
		var iconIdle = pgTab.querySelectorAll(".nav-icon-idle");

		navItems.forEach((item, index) => {
			var tabIdX = item.getAttribute("data-tab-id");

			if (activeTab == tabIdX) {
				console.log(tabIdX);
				item.classList.add("nav-item-active");
				console.log(tabPanels[index]);
				tabPanels[index].classList.add("pg-tabs-panel-active");
				if (iconToggle[index] != undefined) {
				iconToggle[index].style.display = "inline-block";}
				if (iconIdle[index] != undefined) {
					iconIdle[index].style.display = "none";
				}
			} else {
				if (iconToggle[index] != undefined) {
					iconToggle[index].style.display = "none";
					iconIdle[index].style.display = "inline-block";
				}
				
			}

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

				if (tabId == tabIdX) {
					iconIdle.forEach((iconI, J) => {
						iconToggle[J].style.display = "none";
						iconIdle[J].style.display = "inline-block";
					});
					// event.currentTarget.classList.add("nav-item-active");
					// console.log(tabPanels[index]);
					// tabPanels[index].classList.add("pg-tabs-panel-active");
					if (iconToggle[index] != undefined) {
					iconToggle[index].style.display = "inline-block";
					iconIdle[index].style.display = "none";}
				} else {
				}

				var tabByattr = document.querySelector(
					`.pg-tabs-panel[data-tab-id="${tabId}"]`
				);

				tabByattr.classList.add("pg-tabs-panel-active");
				// console.log(tabByattr);

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



