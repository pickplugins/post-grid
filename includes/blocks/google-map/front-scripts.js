export function setupGoogleMap() {
	document.addEventListener("DOMContentLoaded", function (event) {
		// To assign event
		var dataVisible = document.querySelectorAll("[data-countdown-expired-arg]");


		let map;

		async function initMap() {
			const { Map } = await google.maps.importLibrary("maps");

			map = new Map(document.getElementById("map"), {
				center: { lat: -34.397, lng: 150.644 },
				zoom: 8,
			});
		}

		initMap();


	});
}