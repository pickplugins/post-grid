document.addEventListener("DOMContentLoaded", function (event) {
	var PGBlockMasonryWrap = document.querySelectorAll(".PGBlockMasonryWrap");

	if (PGBlockMasonryWrap != null) {
		PGBlockMasonryWrap.forEach((item) => {
			var masonryArgs = item.getAttribute("data-masonry");

			var masonryArgsObj = JSON.parse(masonryArgs);

			var blockArgs = item.getAttribute("data-block-id");

			var blockArgsObj = JSON.parse(blockArgs);

			var blockId = blockArgsObj.blockId;
			// var itemSelector = masonryArgsObj.itemSelector;
			// var columnWidth = masonryArgsObj.columnWidth;
			// var gutter = masonryArgsObj.gutter;
			// var horizontalOrder = masonryArgsObj.horizontalOrder;
			// var percentPosition = masonryArgsObj.percentPosition;
			// var stamp = masonryArgsObj.stamp;
			// var fitWidth = masonryArgsObj.fitWidth;
			// var originLeft = masonryArgsObj.originLeft;
			// var originTop = masonryArgsObj.originTop;
			// var stagger = masonryArgsObj.stagger;
			// var resize = masonryArgsObj.resize;
			var masonryOptions = masonryArgsObj.masonryOptions;

			var elemX = document.querySelector("." + blockId);

			// console.log(elemX);
			if (elemX != null) {
				elemX.forEach((item) => {
				var msnry = new Masonry(
					item,
					masonryOptions
					// {
					// 	// options
					// 	itemSelector: masonryOptions.itemSelector,
					// 	columnWidth: masonryOptions.columnWidth,
					// 	gutter: masonryOptions.gutter,
					// 	horizontalOrder: masonryOptions.horizontalOrder,
					// 	percentPosition: masonryOptions.percentPosition,
					// 	stamp: masonryOptions.stamp,
					// 	fitWidth: masonryOptions.fitWidth,
					// 	originLeft: masonryOptions.originLeft,
					// 	originTop: masonryOptions.originTop,
					// 	// // stagger: stagger,
					// 	resize: masonryOptions.resize,
					// }
				);
				});
			}
		});
	}
});

