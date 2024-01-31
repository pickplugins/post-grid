document.addEventListener("DOMContentLoaded", function (event) {
	var accordionHeaders = document.querySelectorAll(".accordion-header");

	// new work start

	accordionHeaders.forEach((accordionHeader) => {
		var iconToggle = accordionHeader.querySelector(".accordion-icon-toggle");
		var iconIdle = accordionHeader.querySelector(".accordion-icon");

		if (iconToggle != null) {
			iconToggle.style.display = "none";
		}
	});

	var dataAccordionWrap = document.querySelectorAll("[data-accordion]");

	if (dataAccordionWrap != null) {
		dataAccordionWrap.forEach(function (element) {
			var dataAccordionArgs = element.getAttribute("data-accordion");

			if (dataAccordionArgs) {
				var accordionWrap = document.querySelectorAll(".accordion-header");
				var dataAccordionArgsObj = JSON.parse(dataAccordionArgs);
				// console.log(dataAccordionArgsObj);
				var icons = {
					header: "accordion-icon",    // custom icon class
					activeHeader: "accordion-icon accordion-icon-toggle" // custom icon class
				};


				var extraPram = {
					// classes: {
					// 	"ui-accordion-header": "accordion-header-active",
					// 	"ui-accordion-header-collapsed": "accordion-header",
					// },
					icons: icons,
					activate: function (event, ui) {
						console.log(ui);
						// ui[0].classList.toggle("accordion-header-active");
					},
				};

				// console.log(extraPram)

				jQuery(element).accordion({ ...dataAccordionArgsObj, ...extraPram });
			}
		});
	}

	// new work end

	// if (accordionHeaders != null) {
	// 	accordionHeaders.forEach((accordionHeader) => {
	// 		// var fieldId = accordionHeader.getAttribute("id");

	// 		var content = accordionHeader.nextElementSibling;

	// 		var iconToggle = accordionHeader.querySelector(".accordion-icon-toggle");
	// 		var iconIdle = accordionHeader.querySelector(".accordion-icon");

	// 		if (iconToggle != null) {
	// 			iconToggle.style.display = "none";
	// 		}

	// 		if (content != undefined) {
	// 			content.style.height = 0;
	// 			content.style.overflow = "hidden";
	// 			content.style.display = "none";
	// 		}

	// 		accordionHeader.addEventListener("click", (event) => {
	// 			var isActive = accordionHeader.getAttribute("id");
	// 			accordionHeader.classList.toggle("accordion-header-active");

	// 			content.style.height = "auto";
	// 			var height = content.scrollHeight;

	// 			if (accordionHeader.classList.contains("accordion-header-active")) {
	// 				iconToggle.style.display = "inline-block";
	// 				content.style.display = "block";
	// 				iconIdle.style.display = "none";
	// 				content.style.height = "auto";
	// 			} else {
	// 				iconIdle.style.display = "inline-block";
	// 				iconToggle.style.display = "none";
	// 				content.style.display = "none";
	// 				content.style.height = 0;
	// 			}
	// 		});
	// 	});
	// }
});



