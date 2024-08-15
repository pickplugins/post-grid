document.addEventListener("DOMContentLoaded", function () {
	const contentElement = document.querySelector('[clickToCopy="1"]');

	if (contentElement) {
		contentElement.addEventListener("click", function () {
			copyToClipboard(contentElement.textContent);
		});
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
