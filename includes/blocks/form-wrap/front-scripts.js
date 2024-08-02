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
				const pgFormChanged = new CustomEvent("pgFormChanged", { detail: { formId: formId } });



				form.addEventListener('change', function () {
					document.dispatchEvent(pgFormChanged);


				});


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





					var onsubmitProceed = true;

					Object.entries(onsubmitObj).map((args) => {

						var action = args[1];
						var actionId = action.id;

						console.log(actionId);


						if (actionId == "simpleMath") {

							var simpleMathInput = document.querySelector('input[name="simple_math"]');

							console.log(simpleMathInput.value);
							console.log(window.pgSimpleMath);

							if (window.pgSimpleMath.result != simpleMathInput.value) {
								onsubmitProceed = false;

								var responseHtml = "";
								responseHtml += '<div class="error">';
								responseHtml += "Math challenge failed.";
								responseHtml += "</div>";
								responsesWrap.innerHTML = responseHtml;
								responsesWrap.style.display = "block";

							} else {

								responsesWrap.innerHTML = "";

							}


						}

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
								//onsubmitProceed = true;
								throw errors;
							}
						}

						if (actionId == "submitConfirm") {




							if (confirm("Are you confirmed?")) {



								//onsubmitProceed = true;
								//processSubmit(formId, formData);

								document.dispatchEvent(pgFormSubmitted);
							} else {
								onsubmitProceed = false;
							}
						}
						if (actionId == "recaptchaValidation") {

							var errors = {};
							let queryString = new URLSearchParams(formData).toString();

							let params = new URLSearchParams(queryString);
							var recaptchaResponse = params.get("g-recaptcha-response"); // "foo"

							//let recaptchaResponse = queryString.includes("g-recaptcha-response");

							if (recaptchaResponse == null || recaptchaResponse.length == 0) {
								onsubmitProceed = false;


								var showOnResponse = action.showOnResponse;
								var successMessage = action.successMessage;
								var errorMessage = action.errorMessage;



								if (showOnResponse) {
									var responseHtml = "";

									//var html = x[1];
									responseHtml += '<div class="error">';
									responseHtml += errorMessage;
									responseHtml += "</div>";

									responsesWrap.innerHTML = responseHtml;
									responsesWrap.style.display = "block";
								}


								throw errors;
								//processSubmit(formId, formData);
							}


						}




					});


					console.log(onsubmitProceed);


					if (onsubmitProceed) {
						loadingWrap.style.display = "block";

						processSubmit(formId, formData);
						document.dispatchEvent(pgFormSubmitted);
					}






				});
			});
		}
	} catch (e) {
		if (e !== BreakException) throw e;
	}



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
		var onprocessargs = formByID.getAttribute("onprocessargs");
		var onprocessargsObj = JSON.parse(onprocessargs);



		var aftersubmitargs = formByID.getAttribute("aftersubmitargs");
		var aftersubmitargsObj = JSON.parse(aftersubmitargs);


		//var postGridId = aftersubmitargsObj[1].postGridId;



		// var queryArgs = post_grid_vars[blockId].queryArgs;
		// var rawData = post_grid_vars[blockId].layout.rawData;
		// var nonce = post_grid_vars[blockId]._wpnonce;


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

						console.log(successArgs);
						console.log(errorsArgs);


						if (aftersubmitargsObj == null) return;


						for (var i = 0; i < aftersubmitargsObj.length; i++) {

							var action = aftersubmitargsObj[i];

							console.log(action);


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

							if (actionId == "showText") {
								var successMessage = action.successMessage;
								var failedMessage = action.failedMessage;

								responsesWrap.style.display = "block";

								var responseHtml = "";


								if (Object.entries(errorsArgs).length == 0) {
									responseHtml += '<div class="success">';
									responseHtml += successMessage;
									responseHtml += "</div>";
								} else {
									responseHtml += '<div class="error">';
									responseHtml += failedMessage;
									responseHtml += "</div>";
								}








								responsesWrap.innerHTML = responseHtml;
							}






							if (Object.entries(errorsArgs).length > 0) {
								break;
							};



							if (actionId == "redirectToURL") {
								var url = action.url;
								location.href = url;
							}






							if (actionId == "buildGETRequest") {
								//var url = action.url;
								//location.href = url;
								var pageUrl = window.location.href.split("?")[0];

								var url = window.location;
								formData.delete('formType');
								formData.delete('onprocessargs');
								formData.delete('formFieldNames');
								formData.delete('_wp_http_referer');


								let queryString = new URLSearchParams(formData).toString();
								location.href = pageUrl + "?" + queryString;

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
										body: { nonce: formFieldNames._wpnonce },
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
								var delay = parseInt(action.delay);


								setTimeout(() => {
									var popupWrap = document.querySelector("." + popupId);
									popupWrap.style.display = "none";
								}, delay)


							}

							if (actionId == "clearForm") {

								formByID.reset();
							}
						};

						loadingWrap.style.display = "none";

						setTimeout(() => {
						}, 2000);
					});
				}
			})
			.catch((error) => { });
	}




});

