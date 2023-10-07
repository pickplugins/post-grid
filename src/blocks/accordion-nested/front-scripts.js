document.addEventListener("DOMContentLoaded", function (event) {
  var accordionHeaders = document.querySelectorAll(".accordion-header");

  if (accordionHeaders != null) {
    accordionHeaders.forEach((accordionHeader) => {
      // var fieldId = accordionHeader.getAttribute("id");

      var content = accordionHeader.nextElementSibling;

      var iconToggle = accordionHeader.querySelector(".accordion-icon-toggle");
      var iconIdle = accordionHeader.querySelector(".accordion-icon");

      if (iconToggle != null) {
        iconToggle.style.display = "none";
      }

      if (content != undefined) {
        content.style.height = 0;
        content.style.overflow = "hidden";
        content.style.display = "none";
      }

      accordionHeader.addEventListener("click", (event) => {
        var isActive = accordionHeader.getAttribute("id");
        accordionHeader.classList.toggle("accordion-header-active");

        content.style.height = "auto";
        var height = content.scrollHeight;

        console.log(height);

        if (accordionHeader.classList.contains("accordion-header-active")) {
          iconToggle.style.display = "inline-block";
          content.style.display = "block";
          iconIdle.style.display = "none";
          content.style.height = "auto";
        } else {
          iconIdle.style.display = "inline-block";
          iconToggle.style.display = "none";
          content.style.display = "none";
          content.style.height = 0;
        }
      });
    });
  }
});
