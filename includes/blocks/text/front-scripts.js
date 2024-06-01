document.addEventListener("DOMContentLoaded", function () {
	const contentElement = document.querySelector('[clicktocopy="1"]');
	console.log(contentElement)

	if (contentElement) {
		const copyContent = contentElement.getAttribute("copycontent");
		console.log(copyContent)
		if (copyContent) {
			contentElement.addEventListener("click", function () {
				console.log("first")
				copyToClipboard(copyContent); 
			});
		} else {
			console.error("Attribute 'copycontent' is missing or empty.");
		}
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

