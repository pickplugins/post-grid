document.addEventListener("DOMContentLoaded", function (event) {
	// To assign event
	const pgFormSubmitted = new Event("pgFormSubmitted");

	var pgForms = document.querySelectorAll(".pg-form-wrap form");
	var pgFormFields = document.querySelectorAll(".pg-form-field");

	/*Hide all error message on load form*/

	if (pgFormFields != null) {
		pgFormFields.forEach((pgFormField) => {
			var fieldId = pgFormField.getAttribute("id");
			var errorWrap = document.querySelector("#" + fieldId + " .error-wrap");

			if (errorWrap != null) {
				errorWrap.style.display = "none";
			}
		});
	}

	/*Check each form on page load*/

	var BreakException = {};

	var busy = false;

	try {
		if (pgForms != null) {
			pgForms.forEach((form) => {
				var formId = form.getAttribute("formId");

				form.addEventListener("submit", (event) => {

					event.preventDefault();

					var formByID = document.querySelector(`[formid="${formId}"]`);

					const formData = new FormData(event.target);
					var onsubmitprams = formByID.getAttribute("onsubmitprams");
					var onprocessargs = formByID.getAttribute("onprocessargs");

					var onsubmitObj = JSON.parse(onsubmitprams);

					var formargs = formByID.getAttribute("formargs");
					var formargsObj = JSON.parse(formargs);
					var fieldInfo = formargsObj.fieldInfo;

					var onprocessargsObj = JSON.parse(onprocessargs);

					formData.append("formType", formargsObj.type);
					formData.append("onprocessargs", JSON.stringify(onprocessargsObj));

					var loadingWrap = document.querySelector("." + formId + "-loading");
					var responsesWrap = document.querySelector(
						"." + formId + "-responses"
					);
					

					loadingWrap.style.display = "block";

					

					var onsubmitProceed = false;

					onsubmitObj.map((action) => {
						var actionId = action.id;

						if (actionId == "validation") {
							var errors = validateFormFields(formId, formData, fieldInfo);

							responsesWrap.innerHTML = "";

							// loadingWrap.style.display = "none";


							if (Object.keys(errors).length > 0) {
								var responseHtml = "";
								Object.entries(errors).map((x) => {
									var html = x[1];
									responseHtml += '<div class="error">';
									responseHtml += html;
									responseHtml += "</div>";
								});
								responsesWrap.innerHTML = responseHtml;
								responsesWrap.style.display = "block";

								// loadingWrap.style.display = "none";
								onsubmitProceed = true;
								throw errors;
							}
						}

						if (actionId == "submitConfirm") {
							if (confirm("Are you confirmed?")) {
								onsubmitProceed = true;
								processSubmit(formId, formData);

								document.dispatchEvent(pgFormSubmitted);
							} else {
								onsubmitProceed = false;
							}
						}
						if (actionId == "loading") {
							
						}
					});


					if (!onsubmitProceed) {
						processSubmit(formId, formData);
						document.dispatchEvent(pgFormSubmitted);
					}



					

					setTimeout(() => { }, 3000);
				});
			});
		}
	} catch (e) {
		if (e !== BreakException) throw e;
	}

	const sleep = async (milliseconds) => {
		await new Promise((resolve) => {
			return setTimeout(resolve, milliseconds);
		});
	};

	function validateFormFields(formId, formData, fieldInfo) {
		var errorData = {};

		Object.entries(fieldInfo).map((field) => {
			var fieldId = field[0];

			var args = field[1];

			var inputName = args.inputName;
			var errorText = args.errorText;
			var required = args.required == undefined ? false : args.required;

			errorData[inputName] = {
				id: fieldId,
				errorText: errorText,
				required: required,
			};
		});

		var errors = {};

		
		var formByID = document.querySelector(`[formid="${formId}"]`);

		for (var pair of formData.entries()) {
			var inputName = pair[0];
			var inputValue = pair[1];

			var required =
				errorData[inputName] == undefined
					? false
					: errorData[inputName].required;

			if (required && inputValue.length == 0) {
				errors[inputName] = errorData[inputName].errorText;

				var fieldWrap = document.querySelector("." + errorData[inputName].id);
				fieldWrap.classList.add("error");
			}
		}

		return errors;
	}

	function processSubmit(formId, formData) {

		var formByID = document.querySelector(`[formid="${formId}"]`);

		var responsesWrap = document.querySelector("." + formId + "-responses");
		var loadingWrap = document.querySelector("." + formId + "-loading");
		responsesWrap.style.display = "none";

		var aftersubmitargs = formByID.getAttribute("aftersubmitargs");
		var aftersubmitargsObj = JSON.parse(aftersubmitargs);

		var formargs = formByID.getAttribute("formargs");
		var formargsObj = JSON.parse(formargs);


		var formFieldNames = [];

		for (var pair of formData.entries()) {
			var inputName = pair[0];
			var inputValue = pair[1];


			formFieldNames.push(inputName);
		}

		formData.append("formFieldNames", formFieldNames);

		fetch(
			post_grid_vars["siteUrl"] + "/wp-json/post-grid/v2/process_form_data",
			{
				method: "POST",
				body: formData,
			}
		)
			.then((response) => {
				if (response.ok && response.status < 400) {
					response.json().then((data) => {
						var successArgs = data.success == undefined ? {} : data.success;
						var errorsArgs = data.errors == undefined ? {} : data.errors;

						console.log(data);

						if (aftersubmitargsObj == null) return;

						aftersubmitargsObj.map((action) => {
							var actionId = action.id;

							if (actionId == "showResponse") {

								responsesWrap.style.display = "block";

								var responseHtml = "";

								Object.entries(successArgs).map((x) => {
									var html = x[1];
									responseHtml += '<div class="success">';
									responseHtml += html;
									responseHtml += "</div>";
								});

								Object.entries(errorsArgs).map((x) => {
									var html = x[1];
									responseHtml += '<div class="error">';
									responseHtml += html;
									responseHtml += "</div>";
								});

								responsesWrap.innerHTML = responseHtml;
							}

							if (actionId == "redirectToURL") {
								var url = action.url;
								location.href = url;
							}

							if (actionId == "refreshPage") {
								var delay =
									action.delay.length == 0 ? 500 : parseInt(action.delay);

								if (delay) {
									setTimeout(() => {
										location.reload();
									}, delay);
								}
							}

							if (actionId == "loggedOut") {

								fetch(
									post_grid_vars["siteUrl"] +
									"/wp-json/post-grid/v2/loggedout_current_user",
									{
										method: "POST",
										body: { nonce: formFieldNames.form_wrap_nonce },
									}
								)
									.then((response) => {
										if (response.ok && response.status < 400) {
											response.json().then((data) => { });
										}
									})
									.catch((error) => { });
							}

							if (actionId == "hideForm") {
								formByID.style.display = "none";
							}

							if (actionId == "hidePopup") {
								var popupId = formargsObj.popupId;
								var popupWrap = document.querySelector("." + popupId);

								popupWrap.style.display = "none";
							}

							if (actionId == "clearForm") {

								formByID.reset();
							}
						});

						loadingWrap.style.display = "none";

						setTimeout(() => {
						}, 2000);
					});
				}
			})
			.catch((error) => { });
	}

	/*Form Visiblity*/

	function popupDelay() {
		var dataVisible = document.querySelectorAll("[data-pgfw-visible]");


		if (dataVisible != null) {
			dataVisible.forEach((item) => {
				var attr = item.getAttribute("data-pgfw-visible");
				var attrObj = JSON.parse(attr);
				var formId = item.getAttribute("formid");
				var formargs = item.getAttribute("formargs");
				var formargsObj = JSON.parse(formargs);

				var isLogged = formargsObj.isLogged;
				var userId = formargsObj.userId;
				var currentUserRoles = formargsObj.userRoles;
				var popupId = formargsObj.popupId;

				var popupWrap = document.querySelector('[formid="' + formId + '"]');

				Object.entries(attrObj).map((group) => {
					var groupData = group[1];
					var groupLogic = groupData.logic;
					var groupArgs = groupData.args;

					groupArgs.map((conditions) => {
						var conditionId = conditions.id;

						if (conditionId == "userLogged") {
							if (isLogged) {
								popupWrap.style.display = "block";
							} else {
								popupWrap.style.display = "none";
							}
						}

						if (conditionId == "userNotLogged") {
							if (isLogged) {
								popupWrap.style.display = "none";
							} else {
								popupWrap.style.display = "block";
							}
						}

						if (conditionId == "isYears") {
							var compare = conditions.compare;
							var from = conditions.from;

							var dateObj = getDate();
							var currentYear = dateObj.year;

							if (compare == "=") {
								if (parseInt(from) == currentYear) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "!=") {
								if (parseInt(from) != currentYear) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == ">") {
								if (currentYear > parseInt(from)) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "<") {
								if (currentYear < parseInt(from)) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == ">=") {
								if (currentYear >= parseInt(from)) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "<=") {
								if (currentYear <= parseInt(from)) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "exist") {
								var years = from.split(",");
								var yearsX = years.map((x) => {
									return parseInt(x);
								});

								if (yearsX.includes(currentYear)) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "between") {
								var years = from.split(",");
								var yearsX = years.map((x) => {
									return parseInt(x);
								});

								var yearsFrom = yearsX[0] == undefined ? "" : yearsX[0];
								var yearsTo = yearsX[1] == undefined ? "" : yearsX[1];

								if (currentYear >= yearsFrom && currentYear <= yearsTo) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}
						}

						if (conditionId == "isMonths") {
							var compare = conditions.compare;
							var value = conditions.value;
							var values = conditions.values;


							var dateObj = getDate();
							var currentMonth = dateObj.month;


							if (compare == "=") {
								if (parseInt(value) == currentMonth) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "!=") {
								if (parseInt(value) != currentMonth) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == ">") {
								if (currentMonth > parseInt(value)) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "<") {
								if (currentMonth < parseInt(value)) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == ">=") {
								if (currentMonth >= parseInt(value)) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "<=") {
								if (currentMonth <= parseInt(value)) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "exist") {
								var months = values;
								var monthsX = months.map((x) => {
									return parseInt(x);
								});

								if (monthsX.includes(currentMonth)) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "between") {
								var months = values;
								var monthsX = months.map((x) => {
									return parseInt(x);
								});

								var monthsFrom = monthsX[0] == undefined ? "" : monthsX[0];
								var monthsTo = monthsX[1] == undefined ? "" : monthsX[1];

								if (currentMonth >= monthsFrom && currentMonth <= monthsTo) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}
						}

						if (conditionId == "weekDays") {
							var compare = conditions.compare;
							var value = conditions.value;
							var values = conditions.values;


							var dateObj = getDate();
							var currentDay = dateObj.weekday;


							if (compare == "=") {
								if (parseInt(value) == currentDay) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "!=") {
								if (parseInt(value) != currentDay) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == ">") {
								if (currentDay > parseInt(value)) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "<") {
								if (currentDay < parseInt(value)) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == ">=") {
								if (currentDay >= parseInt(value)) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "<=") {
								if (currentDay <= parseInt(value)) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "exist") {
								var days = values;
								var daysX = days.map((x) => {
									return parseInt(x);
								});

								if (daysX.includes(currentDay)) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "between") {
								var days = values;
								var daysX = days.map((x) => {
									return parseInt(x);
								});

								var daysFrom = daysX[0] == undefined ? "" : daysX[0];
								var daysTo = daysX[1] == undefined ? "" : daysX[1];

								if (currentDay >= daysFrom && currentDay <= daysTo) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}
						}

						if (conditionId == "isHours") {
							var compare = conditions.compare;
							var value = conditions.value;
							var values = conditions.values;

							var dateObj = getDate();
							var currentisHour = dateObj.day;

							if (compare == "=") {
								if (parseInt(value) == currentisHour) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "!=") {
								if (parseInt(value) != currentisHour) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == ">") {
								if (currentisHour > parseInt(value)) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "<") {
								if (currentisHour < parseInt(value)) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == ">=") {
								if (currentisHour >= parseInt(value)) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "<=") {
								if (currentisHour <= parseInt(value)) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "exist") {
								var hours = values;
								var hoursX = hours.map((x) => {
									return parseInt(x);
								});

								if (hoursX.includes(currentisHour)) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "between") {
								var hours = values;
								var hoursX = hours.map((x) => {
									return parseInt(x);
								});

								var hoursFrom = hoursX[0] == undefined ? "" : hoursX[0];
								var hoursTo = hoursX[1] == undefined ? "" : hoursX[1];

								if (currentisHour >= hoursFrom && currentisHour <= hoursTo) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}
						}

						if (conditionId == "isDate") {
							var compare = conditions.compare;
							var value = conditions.value;
							var values = conditions.values;

							var time = new Date(value).getTime();

							var dateObj = getDate();
							var currentDate = dateObj.date;
							var currentTime = dateObj.time;

							if (compare == "=") {
								if (value == currentDate) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "!=") {
								if (value != currentDate) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == ">") {
								if (currentTime > time) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "<") {
								if (currentTime < time) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == ">=") {
								if (currentTime >= time) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "<=") {
								if (currentTime <= time) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "exist") {
								var dates = values;

								if (dates.includes(currentDate)) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}

							if (compare == "between") {
								var dates = values;
								var hoursX = dates.map((x) => {
									return x;
								});

								var hoursFrom =
									hoursX[0] == undefined ? "" : new Date(hoursX[0]).getTime();
								var hoursTo =
									hoursX[1] == undefined ? "" : new Date(hoursX[1]).getTime();

								if (currentTime >= hoursFrom && currentTime <= hoursTo) {
									popupWrap.style.display = "block";
								} else {
									popupWrap.style.display = "none";
								}
							}
						}

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

						if (conditionId == "userRoles") {
							var roleExist = false;
							var userRoles = conditions.roles;

							var currentUserRolesX = Object.entries(currentUserRoles).map(
								(x) => {
									var index = x[0];
									var role = x[1];

									return role;
								}
							);


							let intersection = userRoles.filter((x) =>
								currentUserRolesX.includes(x)
							);

							if (intersection.length > 0) {
								popupWrap.style.display = "block";
							} else {
								popupWrap.style.display = "none";
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
});

function getDate() {
	const dateFull = new Date();

	var dateObj = {};

	let day = dateFull.getDate();
	let month = dateFull.getMonth() + 1;
	let year = dateFull.getFullYear();
	let hour = dateFull.getHours();
	let minute = dateFull.getMinutes();
	let weekday = dateFull.getDay();
	let date = dateFull.getFullYear() + "-" + parseInt(month) + "-" + day;
	let isoDate = dateFull.toISOString();
	let time = dateFull.getTime();

	dateObj.day = day;
	dateObj.month = month;
	dateObj.year = year;
	dateObj.hour = hour;
	dateObj.minute = minute;
	dateObj.weekday = weekday;
	dateObj.date = date;
	dateObj.isoDate = isoDate;
	dateObj.time = time;

	return dateObj;
}
