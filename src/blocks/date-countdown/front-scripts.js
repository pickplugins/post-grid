document.addEventListener("DOMContentLoaded", function (event) {
  // To assign event
  const pgDateCountdownExpired = new Event("pgDateCountdownExpired");
  function countdown(
    innerHandle,
    countdownHandle,
    secondSelector,
    minuteSelector,
    hourSelector,
    daySelector,
    startDate,
    endDate
  ) {
    const targetInner = document.querySelector(innerHandle);
    const targetCountdown = document.querySelector(countdownHandle);
    const targetSecond = document.querySelector(secondSelector);
    const targetMinute = document.querySelector(minuteSelector);
    const targetHour = document.querySelector(hourSelector);
    const targetDay = document.querySelector(daySelector);

    // Get the current time in UTC
    const dateInput1 = startDate;
    const dateInput2 = endDate;
    console.log(dateInput1);
    console.log(dateInput2);

    const currentDate = new Date();
    const date1 = new Date(dateInput1);
    const date2 = new Date(dateInput2);
    var date = "";
    console.log("date1===", date1);
    if (currentDate > date1) {
      date = currentDate;
    } else if (currentDate < date1) {
      // document.dispatchEvent(pgDateCountdownExpired);
      targetCountdown.style.display = "none";
      console.log("clicked");
    } else {
      date = date1;
    }

    console.log("currentDate===", currentDate);
    console.log("date===", date);

    // const date = currentDate > date1 ? currentDate : date1;

    // const dates = new Date(date);
    const timeDifference = date2 - date;

    if (timeDifference <= 0) {
      document.dispatchEvent(pgDateCountdownExpired);

      targetInner.style.display = "block";
      if (targetCountdown != null) {
        targetCountdown.style.display = "none";
      }

      return;
    }

    document.addEventListener("pgDateCountdownExpired", (event) => {
      // console.log("clicked");
    });

    // Calculate days, hours, minutes, and seconds
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

  var PGBlockDateCountdown = document.querySelectorAll(".PGBlockDateCountdown");

  if (PGBlockDateCountdown != null) {
    PGBlockDateCountdown.forEach((item) => {
      var dateCountdownArgs = item.getAttribute("data-date-countdown");

      var dateCountdownArgsObj = JSON.parse(dateCountdownArgs);

      // const pgDateCountdownExpired = new Event("pgDateCountdownExpired");

      var blockId = dateCountdownArgsObj.blockId;
      var startDate = dateCountdownArgsObj.startDate;
      var endDate = dateCountdownArgsObj.endDate;

      var secondHandle = "." + blockId + " .second-countdown";
      var minuteHandle = "." + blockId + " .minute-countdown";
      var hourHandle = "." + blockId + " .hour-countdown";
      var dayHandle = "." + blockId + " .day-countdown";
      var countdownHandle = "." + blockId + " .countdown-wrapper";
      var innerHandle = "." + blockId + " .inner";
      // console.log(innerHandle);

      document.querySelector(innerHandle).style.display = "none";
      setInterval(() => {
        countdown(
          innerHandle,
          countdownHandle,
          secondHandle,
          minuteHandle,
          hourHandle,
          dayHandle,
          startDate,
          endDate
        );
      }, 1000);
      //   countdown(wrapHandle, startDate, endDate);
    });
  }
});
