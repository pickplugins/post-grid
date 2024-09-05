document.addEventListener("DOMContentLoaded", function () {
	const contentElement = document.querySelector('[clicktocopy="1"]');


	if (contentElement) {
		const copyContent = contentElement.getAttribute("copycontent");

		if (copyContent) {
			contentElement.addEventListener("click", function () {

				copyToClipboard(copyContent);
			});
		} else {

		}
	}

	function copyToClipboard(text) {
		navigator.clipboard
			.writeText(text)
			.then(() => {
			})
			.catch((err) => {

				alert("Failed to copy content.");
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

	const animateonElement = document.querySelectorAll('[animateon]');


	if (animateonElement != null) {
		animateonElement.forEach((el) => {
			var animateon = el.getAttribute("animateon");
			var elementId = el.getAttribute("id");
			var animateonObj = JSON.parse(animateon)
			var elementHndle = document.querySelector("#" + elementId);


			animateonObj.forEach((animate) => {

				var animationName = animate.animationName
				var event = animate.event
				var delay = parseInt(animate.delay)
				var duration = parseInt(animate.duration)

				if (event == 'load') {

					elementHndle.classList.add("animate__animated");
					elementHndle.classList.add("animate__" + animationName);

					setTimeout(() => {
						elementHndle.classList.remove("animate__animated");
						elementHndle.classList.remove("animate__" + animationName);
					}, 2000);

				}
				if (event == 'click') {
					elementHndle.addEventListener("click", function (e) {
						elementHndle.classList.add("animate__animated");
						elementHndle.classList.add("animate__" + animationName);

						setTimeout(() => {
							elementHndle.classList.remove("animate__animated");
							elementHndle.classList.remove("animate__" + animationName);
						}, 2000);
					})


				}
				if (event == 'scroll') {
					document.addEventListener("scroll", function (e) {
						const target = document.querySelector("#" + elementId);

						var isViewport = isInViewport(target);


						if (isViewport) {
							elementHndle.classList.add("animate__animated");
							elementHndle.classList.add("animate__" + animationName);

							setTimeout(() => {
								elementHndle.classList.remove("animate__animated");
								elementHndle.classList.remove("animate__" + animationName);
							}, 2000);
						}
					})

				}
				if (event == 'mouseover') {

					elementHndle.addEventListener("mouseover", function (e) {
						elementHndle.classList.add("animate__animated");
						elementHndle.classList.add("animate__" + animationName);

						setTimeout(() => {
							elementHndle.classList.remove("animate__animated");
							elementHndle.classList.remove("animate__" + animationName);
						}, 2000);
					})


				}
				if (event == 'mouseout') {

					elementHndle.addEventListener("mouseout", function (e) {
						elementHndle.classList.add("animate__animated");
						elementHndle.classList.add("animate__" + animationName);

						setTimeout(() => {
							elementHndle.classList.remove("animate__animated");
							elementHndle.classList.remove("animate__" + animationName);
						}, 2000);
					})
				}








			})




		})
	}






});

