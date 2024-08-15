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

				// alert("Content copied to clipboard!");
			})
			.catch((err) => {

				alert("Failed to copy content.");
			});
	}
});

