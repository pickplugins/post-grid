document.addEventListener("DOMContentLoaded", function () {
	var lazyImages = document.querySelectorAll("img[data-src]");


	function lazyLoad() {

		lazyImages.forEach(function (img) {
			if (
				img.getBoundingClientRect().top <= window.innerHeight &&
				img.getBoundingClientRect().bottom >= 0
			) {
				// If the image is within the viewport
				if (img.getAttribute("data-loaded") !== "true") {



					var newImg = new Image();
					newImg.src = img.getAttribute("data-src");
					newImg.onload = function () {

						img.src = img.getAttribute("data-src");
						// img.removeAttribute("data-src");
						img.setAttribute("data-loaded", "true");
					};
				}
			}
		});
	}


	lazyLoad();


	window.addEventListener("scroll", lazyLoad);
	window.addEventListener("load", lazyLoad);
});
