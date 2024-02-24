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
				// console.log("Text copied to clipboard:", text);
				// alert("Content copied to clipboard!");
			})
			.catch((err) => {
				console.error("Error copying text: ", err);
				alert("Failed to copy content.");
			});
	}
});
