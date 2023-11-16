document.addEventListener("DOMContentLoaded", function (event) {
	var PGBlockMasonryWrap = document.querySelectorAll(".PGBlockMasonryWrap");

	if (PGBlockMasonryWrap != null) {
		PGBlockMasonryWrap.forEach((item) => {
			var masonryArgs = item.getAttribute("data-masonry");

			var masonryArgsObj = JSON.parse(masonryArgs);

			var blockArgs = item.getAttribute("data-block-id");

			var blockArgsObj = JSON.parse(blockArgs);

			var blockId = blockArgsObj.blockId;
			
			var masonryOptions = masonryArgsObj.masonryOptions;

			var elemX = document.querySelector(".pg" + blockId);

			// console.log(elemX);
			if (elemX != null) {
				// elemX.forEach((item) => {
					imagesLoaded(item, function () {
						var msnry = new Masonry(
							item,
							masonryOptions
							
						);
					});
				// });
			}
		});
	}
});

