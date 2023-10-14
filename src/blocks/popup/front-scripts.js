"use strict";

document.addEventListener("DOMContentLoaded", function (event) {
	var popupActions = {
		clickCount: 0,
		scrollEnd: false,
		scrollPercent: 0,
		scrollFixed: 500,
	};

	var popupClose = document.querySelectorAll(".close");

	if (popupClose != null) {
		popupClose.forEach((el) => {
			var popupId = el.getAttribute("popup-id");
			var closeAnimation = el.getAttribute("close-animation");

			el.addEventListener("click", (event) => {
				var popup = document.querySelector("." + popupId);

				popup.classList.add("animate__animated");
				popup.classList.add("animate__" + closeAnimation);

				setTimeout(() => {
					popup.classList.remove("animate__animated");
					popup.classList.remove("animate__" + closeAnimation);
					popup.style.display = "none";
				}, 3000);
			});
		});
	}

	function isInViewport(el) {
		const rect = el.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <=
				(window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}

	function getScrollPercentage() {
		// Return the scroll percentage.
		return Math.round(
			((document.documentElement.scrollTop + document.body.scrollTop) /
				(document.documentElement.scrollHeight -
					document.documentElement.clientHeight)) *
				100
		);
	}

	function getScrollAmount() {
		// Return the scroll percentage.
		return Math.round(
			document.documentElement.scrollTop + document.body.scrollTop
		);
	}

	function getUrlPrams() {
		var prams = [];

		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		entries = urlParams.entries();

		for (const entry of entries) {
			prams[entry[0]] = entry[1];
		}

		return prams;
	}

	function hasUrlPrams(pram) {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);

		return urlParams.has(pram);
	}

	function hasCookie(name) {
		var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
		if (match) return match[2];
	}

	function checkReferrer() {}

	function popupDelay() {
		var dataVisible = document.querySelectorAll("[pgpopup-visible]");

		if (dataVisible != null) {
			dataVisible.forEach((item) => {
				var attr = item.getAttribute("pgpopup-visible");
				var attrObj = JSON.parse(attr);
				var popupId = item.getAttribute("popup-id");
				var popupPrams = item.getAttribute("data-prams");
				var popupPramsObj = JSON.parse(popupPrams);

				var isLogged = popupPramsObj.isLogged;
				var userId = popupPramsObj.userId;

				var popupWrap = document.querySelector('[popup-id="' + popupId + '"]');

				Object.entries(attrObj).map((group) => {
					var groupData = group[1];
					var groupLogic = groupData.logic;
					var groupArgs = groupData.args;

					groupArgs.map((conditions) => {
						var conditionId = conditions.id;

						if (conditionId == "delay") {
							setTimeout(() => {
								popupWrap.style.display = "block";
							}, parseInt(conditions.value));
						}

						if (conditionId == "initial") {
							popupWrap.style.display = "block";
						}

						if (conditionId == "cookieExist") {
							var cookieExist = hasCookie(conditions.value);

							if (cookieExist) {
								popupWrap.style.display = "block";
							}
						}

						if (conditionId == "cookieNotExist") {
							var cookieExist = hasCookie(conditions.value);

							if (cookieExist == undefined) {
								popupWrap.style.display = "block";
							}
						}

						if (conditionId == "userLogged") {
							if (isLogged) {
								popupWrap.style.display = "block";
							}
						}

						if (conditionId == "userId") {
							var userIds = conditions.value.split(",");
							var userIdsX = userIds.map((x) => parseInt(x));
							if (userIdsX.includes(parseInt(userId))) {
								popupWrap.style.display = "block";
							}
						}

						if (conditionId == "urlPrams") {
							var urlPrams = conditions.value.split(",");
							urlPrams.map((x) => {
								if (hasUrlPrams(x)) {
									popupWrap.style.display = "block";
								}
							});
						}
					});
				});
			});
		}
	}

	popupDelay();

	// window.addEventListener('beforeunload', function (e) {
	//     e.preventDefault();
	//     e.returnValue = '';
	// });

	window.addEventListener("beforeunload", function (e) {
		var dataVisible = document.querySelectorAll("[pgpopup-visible]");

		if (dataVisible != null) {
			dataVisible.forEach((item) => {
				var attr = item.getAttribute("pgpopup-visible");
				var attrObj = JSON.parse(attr);
				var popupId = item.getAttribute("popup-id");
				var popupWrap = document.querySelector('[popup-id="' + popupId + '"]');

				Object.entries(attrObj).map((group) => {
					var groupData = group[1];
					var groupLogic = groupData.logic;
					var groupArgs = groupData.args;

					groupArgs.map((conditions) => {
						var conditionId = conditions.id;
						if (conditionId == "onExit") {
							popupWrap.style.display = "block";

							if (conditions.value) {
								var confirmationMessage = "tab close";

								(e || window.event).returnValue = confirmationMessage; //Gecko + IE
								sendkeylog(confirmationMessage);
								return confirmationMessage;
							}
						}
					});
				});
			});
		}

		//Webkit, Safari, Chrome etc.
	});

	window.oncontextmenu = function (event) {
		var dataVisible = document.querySelectorAll("[pgpopup-visible]");

		if (dataVisible != null) {
			dataVisible.forEach((item) => {
				var attr = item.getAttribute("pgpopup-visible");
				var attrObj = JSON.parse(attr);
				var popupId = item.getAttribute("popup-id");
				var popupWrap = document.querySelector('[popup-id="' + popupId + '"]');

				Object.entries(attrObj).map((group) => {
					var groupData = group[1];
					var groupLogic = groupData.logic;
					var groupArgs = groupData.args;

					groupArgs.map((conditions) => {
						var conditionId = conditions.id;
						if (conditionId == "clickRight") {
							popupWrap.style.display = "block";

							if (conditions.value) {
								event.preventDefault();
							}
						}
					});
				});
			});
		}
	};

	document.addEventListener("scroll", function (e) {
		//popupActions.scrollStart = true;

		var scrollPercentage = getScrollPercentage();
		var scrollAmount = getScrollAmount();

		var dataVisible = document.querySelectorAll("[pgpopup-visible]");

		if (dataVisible != null) {
			dataVisible.forEach((item) => {
				var attr = item.getAttribute("pgpopup-visible");
				var attrObj = JSON.parse(attr);
				var popupId = item.getAttribute("popup-id");
				var popupWrap = document.querySelector('[popup-id="' + popupId + '"]');

				Object.entries(attrObj).map((group) => {
					var groupId = group[0];
					var groupData = group[1];
					var groupLogic = groupData.logic;
					var groupArgs = groupData.args;

					groupArgs.map((conditions) => {
						var conditionId = conditions.id;

						if (
							conditionId == "scrollParcent" &&
							parseInt(conditions.min) <= scrollPercentage &&
							parseInt(conditions.max) >= scrollPercentage
						) {
							popupWrap.style.display = "block";
						}

						if (
							conditionId == "scrollFixed" &&
							parseInt(conditions.min) <= scrollAmount &&
							parseInt(conditions.max) >= scrollAmount
						) {
							popupWrap.style.display = "block";
						}

						if (
							conditionId == "scrollEnd" &&
							95 <= scrollPercentage &&
							100 >= scrollPercentage
						) {
							popupWrap.style.display = "block";
						}

						if (conditionId == "scrollElement") {
							var elementHandle = conditions.value;
							const target = document.querySelector(elementHandle);

							var isViewport = isInViewport(target);

							if (isViewport) {
								popupWrap.style.display = "block";
							}
						}
					});
				});
			});
		}
	});

	document.addEventListener("click", function (e) {
		popupActions.clickCount += 1;
		var dataVisible = document.querySelectorAll("[pgpopup-visible]");

		if (dataVisible != null) {
			dataVisible.forEach((item) => {
				var attr = item.getAttribute("pgpopup-visible");
				var attrObj = JSON.parse(attr);
				var popupId = item.getAttribute("popup-id");
				var popupWrap = document.querySelector('[popup-id="' + popupId + '"]');

				Object.entries(attrObj).map((group) => {
					var groupId = group[0];
					var groupData = group[1];
					var groupLogic = groupData.logic;
					var groupArgs = groupData.args;

					groupArgs.map((conditions) => {
						var conditionId = conditions.id;

						if (conditionId == "clickFirst" && popupActions.clickCount == 1) {
							popupWrap.style.display = "block";
						}

						if (
							conditionId == "clickCount" &&
							popupActions.clickCount == parseInt(conditions.value)
						) {
							popupWrap.style.display = "block";
						}
					});
				});
			});
		}
	});

	var dataVisible = document.querySelectorAll("[pgpopup-visible]");

	if (dataVisible != null) {
		dataVisible.forEach((item) => {
			var attr = item.getAttribute("pgpopup-visible");
			var attrObj = JSON.parse(attr);
			var popupId = item.getAttribute("popup-id");
			var popupPrams = item.getAttribute("data-prams");
			var popupPramsObj = JSON.parse(popupPrams);

			var isLogged = popupPramsObj.isLogged;
			var userId = popupPramsObj.userId;

			Object.entries(attrObj).map((group) => {
				var groupData = group[1];
				var groupLogic = groupData.logic;
				var groupArgs = groupData.args;

				groupArgs.map((conditions) => {
					var conditionId = conditions.id;

					if (conditionId == "clickElement") {
						var clickHandle = document.querySelector(conditions.value);
						var popupWrap = document.querySelector(
							'[popup-id="' + popupId + '"]'
						);

						clickHandle.addEventListener("click", function (e) {
							event.preventDefault();
							event.stopPropagation();

							popupWrap.style.display = "block";
						});
					}

					if (conditionId == "dateCountdownExpired") {
						var isOnce = conditions.once;
						var count = 0;
						var popupWrap = document.querySelector(".pg-popup");

						document.addEventListener("pgDateCountdownExpired", function (e) {
							if (isOnce) {
								if (count < 1) {
									popupWrap.style.display = "block";
								}
							} else {
								popupWrap.style.display = "block";
							}
							count += 1;
						});
					}
				});
			});
		});
	}
});
