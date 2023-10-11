document.addEventListener("DOMContentLoaded", function (event) {
	// To assign event
	const pgDateCountdownExpired = new Event("pgDateCountdownExpired");
	function countdown(blockId, startDate, endDate) {
		var secondHandle = "." + blockId + " .second-countdown";
		var minuteHandle = "." + blockId + " .minute-countdown";
		var hourHandle = "." + blockId + " .hour-countdown";
		var dayHandle = "." + blockId + " .day-countdown";
		var countdownHandle = "." + blockId + " .countdown-wrapper";
		var innerHandle = "." + blockId + " .inner";
		var WrapperHandle = " .PGBlockDateCountdown";

		const targetWrapper = document.querySelector(WrapperHandle);
		const targetInner = document.querySelector(innerHandle);
		const targetCountdown = document.querySelector(countdownHandle);
		const targetSecond = document.querySelector(secondHandle);
		const targetMinute = document.querySelector(minuteHandle);
		const targetHour = document.querySelector(hourHandle);
		const targetDay = document.querySelector(dayHandle);

		const dateInput1 = startDate;
		const dateInput2 = endDate;

		const currentDate = new Date();
		const date1 = new Date(dateInput1);
		const date2 = new Date(dateInput2);
		var date = "";

		var customDate = new Date(date1);

		if (currentDate > date1) {
			date = currentDate;
		}

		if (currentDate < date1) {
			if (targetWrapper != null) {
				targetWrapper.style.display = "none";
			}
			date = date1;
		} else {
			if (targetWrapper != null) {
				targetWrapper.style.display = "block";
			}
		}

		// const date = currentDate > date1 ? currentDate : date1;

		const timeDifference = date2 - date;

		if (timeDifference <= 0) {
			document.dispatchEvent(pgDateCountdownExpired);

			// targetInner.style.display = "block";
			if (targetCountdown != null) {
				// targetCountdown.style.display = "none";
			}

			return;
		}

		document.addEventListener("pgDateCountdownExpired", (event) => {});

		const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

		const hours = Math.floor(
			(timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		const minutes = Math.floor(
			(timeDifference % (1000 * 60 * 60)) / (1000 * 60)
		);
		const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
		const formattedDays = String(days).padStart(2, "0");
		const formattedHours = String(hours).padStart(2, "0");
		const formattedMinutes = String(minutes).padStart(2, "0");
		const formattedSeconds = String(seconds).padStart(2, "0");

		targetSecond.innerText = formattedSeconds;
		targetMinute.innerText = formattedMinutes;
		targetHour.innerText = formattedHours;
		targetDay.innerText = formattedDays;
	}

	function expiredArg(eventCounter) {
		var dataVisible = document.querySelectorAll("[countdown-expired-arg]");

		if (dataVisible != null) {
			dataVisible.forEach((item) => {
				var countdownExpiredArg = item.getAttribute("countdown-expired-arg");
				var countdownExpiredArgObject = JSON.parse(countdownExpiredArg);

				var dateCountdownId = item.getAttribute("date-countdown-id");

				var dateCountdownWrap = document.querySelector(
					'[date-countdown-id="' + dateCountdownId + '"]'
				);
				var innerWrap = document.querySelector(".inner");
				var countdownWrap = document.querySelector(".countdown-wrapper");

				Object.entries(countdownExpiredArgObject).map((group) => {
					var groupData = group[1];
					var groupLogic = groupData.logic;
					var groupArgs = groupData.args;

					groupArgs.map((conditions) => {
						var conditionId = conditions.id;

						if (conditionId == "redirectURL") {
							value = conditions.value;
							delay = conditions.delay;
							if (value == "") {
							} else {
								if (delay > 0) {
									setTimeout(function () {
										window.location.href = value;
									}, delay);
								} else {
									window.location.href = value;
								}
							}
						}
						if (conditionId == "wcHideCartButton") {
							var elementWrap = document.querySelector(".cart");
							var element2Wrap = document.querySelector(".add_to_cart_button");
							if (elementWrap != null) {
								elementWrap.style.display = "none";
							}
							if (element2Wrap != null) {
								element2Wrap.style.display = "none";
							}
						}
						if (conditionId == "hideCountdown") {
							countdownWrap.style.display = "none";
						}
						if (conditionId == "showExpiredMsg") {
							innerWrap.style.display = "block";
						}
						if (conditionId == "showElement") {
							value = conditions.value;
							var elementWrap = document.querySelector(value);
							if (elementWrap != null) {
								elementWrap.style.display = "block";
							}
						}
						if (conditionId == "showPopup") {
							var elementWrap = document.querySelector(".pg-popup");
							if (eventCounter < 2) {
								if (elementWrap != null) {
									elementWrap.style.display = "block";
								}
							}
						}
					});
				});
			});
		}
	}

	var eventCounter = 0;
	document.addEventListener("pgDateCountdownExpired", (event) => {
		eventCounter += 1;
		expiredArg(eventCounter);
	});

	var PGBlockDateCountdown = document.querySelectorAll(".PGBlockDateCountdown");

	//console.log("first ", PGBlockDateCountdown);
	if (PGBlockDateCountdown != null) {
		PGBlockDateCountdown.forEach((item) => {
			var dateCountdownArgs = item.getAttribute("data-date-countdown");

			var dateCountdownArgsObj = JSON.parse(dateCountdownArgs);

			// const pgDateCountdownExpired = new Event("pgDateCountdownExpired");

			var blockId = dateCountdownArgsObj.blockId;
			var startDate = dateCountdownArgsObj.startDate;
			var endDate = dateCountdownArgsObj.endDate;
			//console.log("start date: ", startDate);
			var scheduleTime = dateCountdownArgsObj.scheduleTime;
			var dateCountdown = dateCountdownArgsObj.dateCountdown;
			var dateCountdownType = dateCountdownArgsObj.dateCountdown.options.type;
			var everDay =
				dateCountdownArgsObj.dateCountdown.options.everGreenTime.day;
			var everHour =
				dateCountdownArgsObj.dateCountdown.options.everGreenTime.hour;
			var everMinute =
				dateCountdownArgsObj.dateCountdown.options.everGreenTime.minute;

			var scheduleArgs = [];
			scheduleTime.forEach((items) => {
				//console.log(items);
				var startTime = items.startTime;
				var endTime = items.endTime;
				var weekDays = items.weekdays;
				//console.log(startTime, endTime);

				scheduleArgs.push({
					startTime: startTime,
					endTime: endTime,
					weekDays: weekDays,
				});
			});

			var scheduleTimeDifference = 0;
			var currentWeekDay = new Date().getDay();
			//console.log("currentWeekDay: ", currentWeekDay);

			var date = new Date(startDate * 1000);
			startDate = date.toISOString().slice(0, 16);

			// var secondHandle = "." + blockId + " .second-countdown";
			// var minuteHandle = "." + blockId + " .minute-countdown";
			// var hourHandle = "." + blockId + " .hour-countdown";
			// var dayHandle = "." + blockId + " .day-countdown";
			// var countdownHandle = "." + blockId + " .countdown-wrapper";
			// var innerHandle = "." + blockId + " .inner";
			// var WrapperHandle = " .PGBlockDateCountdown";

			// document.querySelector(innerHandle).style.display = "none";
			//console.log("dateCountdownType1: ", dateCountdownType);
			setInterval(() => {
				if ((dateCountdownType = "fixed")) {
					countdown(blockId, startDate, endDate);
				}
				if ((dateCountdownType = "everGreen")) {
				}
				if ((dateCountdownType = "scheduled")) {
					var countdownWrap = document.querySelector(".countdown-wrapper");

					countdownWrap.style.display = "none";

					scheduleArgs.map((item, index) => {
						var compare = item.weekDays.compare;
						var startTime = item.startTime;
						var endTime = item.endTime;
						const currentDate = new Date();
						const [startHours, startMinutes] = startTime.split(":").map(Number);
						const [endHours, endMinutes] = endTime.split(":").map(Number);
						const startDate = new Date(
							currentDate.getFullYear(),
							currentDate.getMonth(),
							currentDate.getDate(),
							startHours,
							startMinutes,
							0
						);
						const endDate = new Date(
							currentDate.getFullYear(),
							currentDate.getMonth(),
							currentDate.getDate(),
							endHours,
							endMinutes,
							0
						);

						if (compare == "=") {
							if (currentWeekDay == item.weekDays.value) {
								if (currentDate > startDate && currentDate < endDate) {
									start = startDate.getTime();
									end = endDate.getTime();

									countdownWrap.style.display = "flex";
									countdown(blockId, start, end);
								}
							}
						}

						if (compare == "!=") {
							if (currentWeekDay != item.weekDays.value) {
								if (currentDate > startDate && currentDate < endDate) {
									start = startDate.getTime();
									end = endDate.getTime();

									countdownWrap.style.display = "flex";
									countdown(blockId, start, end);
								}
							}
						}

						if (compare == ">") {
							if (currentWeekDay > item.weekDays.value) {
								if (currentDate > startDate && currentDate < endDate) {
									start = startDate.getTime();
									end = endDate.getTime();

									countdownWrap.style.display = "flex";
									countdown(blockId, start, end);
								}
							}
						}

						if (compare == "<") {
							if (currentWeekDay < item.weekDays.value) {
								if (currentDate > startDate && currentDate < endDate) {
									start = startDate.getTime();
									end = endDate.getTime();

									countdownWrap.style.display = "flex";
									countdown(blockId, start, end);
								}
							}
						}

						if (compare == ">=") {
							if (currentWeekDay >= item.weekDays.value) {
								if (currentDate > startDate && currentDate < endDate) {
									start = startDate.getTime();
									end = endDate.getTime();

									countdownWrap.style.display = "flex";
									countdown(blockId, start, end);
								}
							}
						}
						if (compare == "<=") {
							if (currentWeekDay <= item.weekDays.value) {
								if (currentDate > startDate && currentDate < endDate) {
									start = startDate.getTime();
									end = endDate.getTime();

									countdownWrap.style.display = "flex";
									countdown(blockId, start, end);
								}
							}
						}
						if (compare == "exist") {
							var hasExist = item.weekDays.values.includes(currentWeekDay);

							if (hasExist) {
								if (currentDate > startDate && currentDate < endDate) {
									start = startDate.getTime();
									end = endDate.getTime();

									countdownWrap.style.display = "flex";
									countdown(blockId, start, end);
								}
							}
						}

						if (compare == "between") {
							var days = item.weekDays.values;

							var daysFrom = days[0] == undefined ? "" : days[0];
							var daysTo = days[1] == undefined ? "" : days[1];

							if (currentWeekDay >= daysFrom && currentWeekDay <= daysTo) {
								if (currentDate > startDate && currentDate < endDate) {
									start = startDate.getTime();
									end = endDate.getTime();

									countdownWrap.style.display = "flex";
									countdown(blockId, start, end);
								}
							}
						}
					});
				}
			}, 1000);

			// expiredArg();

			//   countdown(wrapHandle, startDate, endDate);
		});
	}
});
