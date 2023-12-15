/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { applyFilters } from "@wordpress/hooks";

let isProFeature = applyFilters("isProFeature", true);

/**
 * Template option choices for predefined columns layouts.
 */
const variations = [
	{
		name: "1-column",
		title: __("1 Col"),
		description: __("1 Col"),
		isDefault: true,
		isPro: false,
		atts: {
			wrapper: {
				options: { tag: "div", class: "pg-masonry-wrap" },
				styles: {},
			},
			masonryOptions: {
				gutter: 20, itemSelector: ".pg-masonry-wrap-item"
			}
		},
		innerBlocks: [
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg
				id="Layer_1"
				data-name="Layer 1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 152.29 82.57">
				<rect fill="#1d4ed8" width="152.29" height="82.57" />
			</svg>
		),
	},
];

export default variations;
