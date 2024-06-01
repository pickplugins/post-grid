document.addEventListener("DOMContentLoaded", function (event) {
	var PGBlockIcon = document.querySelectorAll(".pg-icon");

	console.log(PGBlockIcon);

	if (PGBlockIcon !== null) {
		PGBlockIcon.forEach((icon) => {
			var iconArgs = icon.getAttribute("data-trigger");

			if (iconArgs !== null) {
				var iconArgsObj = JSON.parse(iconArgs);

				var triggerName = iconArgsObj.triggerName;
				var triggerType = iconArgsObj.triggerType;

				const pgIconClicked = new Event(triggerName);

				if (triggerType == "click") {
					icon.addEventListener("click", (event) => {
						console.log("clicked", triggerName);
						document.dispatchEvent(pgIconClicked);
					});
				}
				if (triggerType == "mouseover") {
					icon.addEventListener("mouseover", (event) => {
						console.log("mouseovered");
						document.dispatchEvent(pgIconClicked);
					});
				}
				if (triggerType == "mouseleave") {
					icon.addEventListener("mouseleave", (event) => {
						console.log("mouseleaveed");
						document.dispatchEvent(pgIconClicked);
					});
				}
			}
		});
	}

	// To assign event
	const pgIconClicked = new Event("pgIconClicked");

	var pgIcons = document.querySelectorAll(".pg-icon");

	/*Check each form on page load*/

	var BreakException = {};

	var busy = false;

	try {
		if (pgIcons != null) {
			pgIcons.forEach((icon) => {
				// icon.addEventListener("click", (event) => {
				// 	console.log("click");
				// 	document.dispatchEvent(pgIconClicked);
				// });
				// icon.addEventListener("mouseover", (event) => {
				// 	console.log("mouseover");
				// 	document.dispatchEvent(pgIconClicked);
				// });
				// icon.addEventListener("mouseleave", (event) => {
				// 	console.log("mouseleave");
				// 	document.dispatchEvent(pgIconClicked);
				// });
			});
		}
	} catch (e) {
		if (e !== BreakException) throw e;
	}
});
