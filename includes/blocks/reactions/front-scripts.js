export function setupReactions() {
	document.addEventListener("DOMContentLoaded", function (event) {
		const summary = document.querySelector(".summary");

		if (summary != null) {
			summary.addEventListener("click", function () {
				const overlay = document.querySelector(".overlay");
				overlay.classList.toggle("hidden");
			});
		}



	});
}