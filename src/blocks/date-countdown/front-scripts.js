document.addEventListener("DOMContentLoaded", function (event) {
    function countdown(
      secondSelector,
      minuteSelector,
      hourSelector,
      daySelector,
      startDate,
      endDate
    ) {
      const targetSecond = document.querySelector(secondSelector);
      const targetMinute = document.querySelector(minuteSelector);
      const targetHour = document.querySelector(hourSelector);
      const targetDay = document.querySelector(daySelector);
  
      // Get the current time in UTC
      const dateInput1 = startDate;
      const dateInput2 = endDate;
      const currentDate = new Date();
      const date1 = new Date(dateInput1);
      const date2 = new Date(dateInput2);
  
      const date = currentDate > date1 ? currentDate : date1;
  
      const timeDifference = Math.abs(date2 - date);
  
      // Calculate days, hours, minutes, and seconds
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
      // Format values to always display as two digits
      const formattedDays = String(days).padStart(2, "0");
      const formattedHours = String(hours).padStart(2, "0");
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(seconds).padStart(2, "0");
      // console.log(formattedSeconds);
  
      targetSecond.innerText = formattedSeconds;
      targetMinute.innerText = formattedMinutes;
      targetHour.innerText = formattedHours;
      targetDay.innerText = formattedDays;
      console.log(formattedDays);
  
      // Update the countdown element
      // document.getElementById('countdown').textContent = `Remaining Time: ${formattedDays} days ${formattedHours} hours ${formattedMinutes} minutes ${formattedSeconds} seconds`;
    }
  
    var PGBlockDateCountdown = document.querySelectorAll(".PGBlockDateCountdown");
  
    console.log(PGBlockDateCountdown);
  
    if (PGBlockDateCountdown != null) {
      PGBlockDateCountdown.forEach((item) => {
        var dateCountdownArgs = item.getAttribute("data-date-countdown");
  
        var dateCountdownArgsObj = JSON.parse(dateCountdownArgs);
  
        console.log(dateCountdownArgsObj);
  
        var blockId = dateCountdownArgsObj.blockId;
        var startDate = dateCountdownArgsObj.startDate;
        var endDate = dateCountdownArgsObj.endDate;
  
        var secondHandle = "." + blockId + " .second";
        var minuteHandle = "." + blockId + " .minute";
        var hourHandle = "." + blockId + " .hour";
        var dayHandle = "." + blockId + " .day";
        console.log(dayHandle);
  
        setInterval(() => {
          countdown(
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
  