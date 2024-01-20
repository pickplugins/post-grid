document.addEventListener("DOMContentLoaded", function (event) {
	var PGBlockMasonryWrap = document.querySelectorAll(".PGBlockJustifiedWrap");

	if (PGBlockMasonryWrap != null) {
		lightGallery(document.getElementsByClassName("pg-justified-wrap"), {
			speed: 500,
		});
	}
});

