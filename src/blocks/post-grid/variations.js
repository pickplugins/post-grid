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
		name: "layout-1",
		title: __("layout-1"),
		description: __("layout-1"),

		isPro: false,
		wrapObj: {
			options: { tag: "div", class: "grid-item-wrap" },
			styles: {
				gridTemplateColumns: { Desktop: "1fr " },
				gap: { Desktop: "1em" },
				display: { Desktop: "grid" },
			},
		},
		innerBlocks: [
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80">
				<rect fill="#1d4ed8" x="41.67" y="13.33" width="76.67" height="23.34" />
				<rect fill="#1d4ed8" x="41.67" y="43.33" width="76.67" height="23.34" />
			</svg>
		),
	},
	{
		name: "layout-2",
		title: __("layout-2"),
		description: __("layout-2"),

		isPro: false,
		wrapObj: {
			options: { tag: "div", class: "grid-item-wrap" },
			styles: {
				gridTemplateColumns: { Desktop: "1fr 1fr" },
				gap: { Desktop: "1em" },
				display: { Desktop: "grid" },
			},
		},
		innerBlocks: [
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80">
				<polygon
					fill="#1d4ed8"
					points="83.33 13.33 83.33 43.33 83.33 66.67 118.33 66.67 118.33 43.33 118.33 13.33 83.33 13.33"
				/>
				<polygon
					fill="#1d4ed8"
					points="41.67 13.33 41.67 43.33 41.67 66.67 76.67 66.67 76.67 43.33 76.67 13.33 41.67 13.33"
				/>
			</svg>
		),
	},
	{
		name: "layout-3",
		title: __("layout-3"),
		description: __("layout-3"),

		isPro: false,
		wrapObj: {
			options: { tag: "div", class: "grid-item-wrap" },
			styles: {
				gridTemplateColumns: { Desktop: "1fr 1fr" },
				gap: { Desktop: "1em" },
				display: { Desktop: "grid" },
			},
		},
		innerBlocks: [
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {
							gridColumnStart: { Desktop: "1" },
							gridColumnEnd: { Desktop: "3" },
						},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80">
				<rect
					fill="#1d4ed8"
					x="41.67"
					y="43.33"
					width="35"
					height="23.34"
					transform="translate(118.33 110.01) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="83.33"
					y="43.33"
					width="35"
					height="23.34"
					transform="translate(201.67 110.01) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="41.67"
					y="13.33"
					width="76.67"
					height="23.34"
					transform="translate(160 49.99) rotate(180)"
				/>
			</svg>
		),
	},

	{
		name: "layout-4",
		title: __("layout-4"),
		description: __("layout-4"),

		isPro: false,
		wrapObj: {
			options: { tag: "div", class: "grid-item-wrap" },
			styles: {
				gridTemplateColumns: { Desktop: "1fr 1fr" },
				gap: { Desktop: "1em" },
				display: { Desktop: "grid" },
			},
		},
		innerBlocks: [
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {
							gridColumnStart: { Desktop: "1" },
							gridColumnEnd: { Desktop: "3" },
						},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80">
				<rect fill="#1d4ed8" x="83.33" y="13.33" width="35" height="23.34" />
				<rect fill="#1d4ed8" x="41.67" y="13.33" width="35" height="23.34" />
				<rect fill="#1d4ed8" x="41.67" y="43.33" width="76.67" height="23.34" />
			</svg>
		),
	},

	{
		name: "layout-5",
		title: __("layout-5"),
		description: __("layout-5"),

		isPro: false,
		wrapObj: {
			options: { tag: "div", class: "grid-item-wrap" },
			styles: {
				gridTemplateColumns: { Desktop: "1fr 1fr" },
				gap: { Desktop: "1em" },
				display: { Desktop: "grid" },
			},
		},
		innerBlocks: [
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {
							gridRowStart: { Desktop: "1" },
							gridRowEnd: { Desktop: "3" },
						},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80">
				<rect fill="#1d4ed8" x="83.33" y="13.33" width="35" height="23.34" />
				<rect fill="#1d4ed8" x="83.33" y="43.33" width="35" height="23.34" />
				<polygon
					fill="#1d4ed8"
					points="41.67 13.33 41.67 43.33 41.67 66.67 76.67 66.67 76.67 43.33 76.67 13.33 41.67 13.33"
				/>
			</svg>
		),
	},
	{
		name: "layout-6",
		title: __("layout-6"),
		description: __("layout-6"),

		isPro: false,
		wrapObj: {
			options: { tag: "div", class: "grid-item-wrap" },
			styles: {
				gridTemplateColumns: { Desktop: "1fr 1fr " },
				gap: { Desktop: "1em" },
				display: { Desktop: "grid" },
			},
		},
		innerBlocks: [
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {
							gridRowStart: { Desktop: "1" },
							gridRowEnd: { Desktop: "3" },
							gridColumnStart: { Desktop: "2" },
						},
					},
				},
			],

			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80">
				<rect
					fill="#1d4ed8"
					x="41.67"
					y="43.33"
					width="35"
					height="23.34"
					transform="translate(118.33 110.01) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="41.67"
					y="13.33"
					width="35"
					height="23.34"
					transform="translate(118.33 49.99) rotate(180)"
				/>
				<polygon
					fill="#1d4ed8"
					points="118.33 66.67 118.33 36.67 118.33 13.33 83.33 13.33 83.33 36.67 83.33 66.67 118.33 66.67"
				/>
			</svg>
		),
	},

	{
		name: "layout-7",
		title: __("layout-7"),
		description: __("layout-7"),

		isPro: false,
		wrapObj: {
			options: { tag: "div", class: "grid-item-wrap" },
			styles: {
				gridTemplateColumns: { Desktop: "1fr 1fr" },
				gap: { Desktop: "1em" },
				display: { Desktop: "grid" },
			},
		},
		innerBlocks: [
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80">
				<rect fill="#1d4ed8" x="83.33" y="13.33" width="35" height="23.34" />
				<rect fill="#1d4ed8" x="41.67" y="13.33" width="35" height="23.34" />
				<rect fill="#1d4ed8" x="83.33" y="43.33" width="35" height="23.34" />
				<rect fill="#1d4ed8" x="41.67" y="43.33" width="35" height="23.34" />
			</svg>
		),
	},

	{
		name: "layout-8",
		title: __("layout-8"),
		description: __("layout-8"),

		isPro: !isProFeature ? false : true,
		wrapObj: {
			options: { tag: "div", class: "grid-item-wrap" },
			styles: {
				gridTemplateColumns: { Desktop: "1fr 1fr 1fr" },
				gap: { Desktop: "1em" },
				display: { Desktop: "grid" },
			},
		},
		innerBlocks: [
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {
							gridRowStart: { Desktop: "1" },
							gridRowEnd: { Desktop: "3" },
						},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80">
				<rect fill="#1d4ed8" x="104.17" y="13.33" width="35" height="23.34" />
				<rect fill="#1d4ed8" x="62.5" y="13.33" width="35" height="23.34" />
				<rect fill="#1d4ed8" x="104.17" y="43.33" width="35" height="23.34" />
				<rect fill="#1d4ed8" x="62.5" y="43.33" width="35" height="23.34" />
				<polygon
					fill="#1d4ed8"
					points="20.83 13.33 20.83 43.33 20.83 66.67 55.83 66.67 55.83 43.33 55.83 13.33 20.83 13.33"
				/>
			</svg>
		),
	},

	{
		name: "layout-9",
		title: __("layout-9"),
		description: __("layout-9"),

		isPro: !isProFeature ? false : true,
		wrapObj: {
			options: { tag: "div", class: "grid-item-wrap" },
			styles: {
				gridTemplateColumns: { Desktop: "1fr 1fr 1fr" },
				gap: { Desktop: "1em" },
				display: { Desktop: "grid" },
			},
		},

		innerBlocks: [
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {
							gridRowStart: { Desktop: "1" },
							gridRowEnd: { Desktop: "3" },
							gridColumnStart: { Desktop: "2" },
						},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80">
				<rect
					fill="#1d4ed8"
					x="62.5"
					y="13.33"
					width="35"
					height="53.35"
					transform="translate(160 80) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="20.83"
					y="43.33"
					width="35"
					height="23.34"
					transform="translate(76.67 110.01) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="20.83"
					y="13.33"
					width="35"
					height="23.34"
					transform="translate(76.67 49.99) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="104.17"
					y="43.33"
					width="35"
					height="23.34"
					transform="translate(243.33 110.01) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="104.17"
					y="13.33"
					width="35"
					height="23.34"
					transform="translate(243.33 49.99) rotate(180)"
				/>
			</svg>
		),
	},
	{
		name: "layout-10",
		title: __("layout-10"),
		description: __("layout-10"),

		isPro: !isProFeature ? false : true,
		wrapObj: {
			options: { tag: "div", class: "grid-item-wrap" },
			styles: {
				gridTemplateColumns: { Desktop: "1fr 1fr 1fr" },
				gap: { Desktop: "1em" },
				display: { Desktop: "grid" },
			},
		},
		innerBlocks: [
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {
							gridRowStart: { Desktop: "1" },
							gridRowEnd: { Desktop: "3" },
							gridColumnStart: { Desktop: "3" },
						},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80">
				<rect
					fill="#1d4ed8"
					x="23.84"
					y="43.33"
					width="35"
					height="23.34"
					transform="translate(82.67 110.01) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="65.5"
					y="43.33"
					width="35"
					height="23.34"
					transform="translate(166.01 110.01) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="23.84"
					y="13.33"
					width="35"
					height="23.34"
					transform="translate(82.67 49.99) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="65.5"
					y="13.33"
					width="35"
					height="23.34"
					transform="translate(166.01 49.99) rotate(180)"
				/>
				<polygon
					fill="#1d4ed8"
					points="142.17 66.67 142.17 36.67 142.17 13.33 107.17 13.33 107.17 36.67 107.17 66.67 142.17 66.67"
				/>
			</svg>
		),
	},

	{
		name: "layout-11",
		title: __("layout-11"),
		description: __("layout-11"),

		isPro: !isProFeature ? false : true,
		wrapObj: {
			options: { tag: "div", class: "grid-item-wrap" },
			styles: {
				gridTemplateColumns: { Desktop: "1fr 1fr 1fr" },
				gap: { Desktop: "1em" },
				display: { Desktop: "grid" },
			},
		},
		innerBlocks: [
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {
							gridColumnStart: { Desktop: "1" },
							gridColumnEnd: { Desktop: "3" },
						},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80">
				<rect
					fill="#1d4ed8"
					x="20.83"
					y="43.33"
					width="35"
					height="23.34"
					transform="translate(76.67 110.01) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="62.5"
					y="43.33"
					width="35"
					height="23.34"
					transform="translate(160 110.01) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="20.83"
					y="13.33"
					width="76.67"
					height="23.34"
					transform="translate(118.33 49.99) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="104.17"
					y="43.33"
					width="35"
					height="23.34"
					transform="translate(243.33 110.01) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="104.17"
					y="13.33"
					width="35"
					height="23.34"
					transform="translate(243.33 49.99) rotate(180)"
				/>
			</svg>
		),
	},

	{
		name: "layout-12",
		title: __("layout-12"),
		description: __("layout-12"),

		isPro: !isProFeature ? false : true,
		wrapObj: {
			options: { tag: "div", class: "grid-item-wrap" },
			styles: {
				gridTemplateColumns: { Desktop: "1fr 1fr 1fr" },
				gap: { Desktop: "1em" },
				display: { Desktop: "grid" },
			},
		},

		innerBlocks: [
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {
							gridColumnStart: { Desktop: "2" },
							gridColumnEnd: { Desktop: "4" },
						},
					},
				},
			],

			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80">
				<rect
					fill="#1d4ed8"
					x="20.83"
					y="43.33"
					width="35"
					height="23.34"
					transform="translate(76.67 110.01) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="62.5"
					y="43.33"
					width="35"
					height="23.34"
					transform="translate(160 110.01) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="20.83"
					y="13.33"
					width="35"
					height="23.34"
					transform="translate(76.67 49.99) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="62.5"
					y="13.33"
					width="76.67"
					height="23.34"
					transform="translate(201.67 49.99) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="104.17"
					y="43.33"
					width="35"
					height="23.34"
					transform="translate(243.33 110.01) rotate(180)"
				/>
			</svg>
		),
	},

	{
		name: "layout-13",
		title: __("layout-13"),
		description: __("layout-13"),

		isPro: !isProFeature ? false : true,
		wrapObj: {
			options: { tag: "div", class: "grid-item-wrap" },
			styles: {
				gridTemplateColumns: { Desktop: "1fr 1fr 1fr" },
				gap: { Desktop: "1em" },
				display: { Desktop: "grid" },
			},
		},

		innerBlocks: [
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {
							gridColumnStart: { Desktop: "1" },
							gridColumnEnd: { Desktop: "3" },
						},
					},
				},
			],

			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80">
				<rect
					fill="#1d4ed8"
					x="20.83"
					y="43.33"
					width="76.67"
					height="23.34"
					transform="translate(118.33 110.01) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="20.83"
					y="13.33"
					width="35"
					height="23.34"
					transform="translate(76.67 49.99) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="62.5"
					y="13.33"
					width="35"
					height="23.34"
					transform="translate(160 49.99) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="104.17"
					y="43.33"
					width="35"
					height="23.34"
					transform="translate(243.33 110.01) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="104.17"
					y="13.33"
					width="35"
					height="23.34"
					transform="translate(243.33 49.99) rotate(180)"
				/>
			</svg>
		),
	},

	{
		name: "layout-14",
		title: __("layout-14"),
		description: __("layout-14"),

		isPro: !isProFeature ? false : true,
		wrapObj: {
			options: { tag: "div", class: "grid-item-wrap" },
			styles: {
				gridTemplateColumns: { Desktop: "1fr 1fr 1fr" },
				gap: { Desktop: "1em" },
				display: { Desktop: "grid" },
			},
		},

		innerBlocks: [
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],

			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {
							gridColumnStart: { Desktop: "2" },
							gridColumnEnd: { Desktop: "4" },
						},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80">
				<rect
					fill="#1d4ed8"
					x="20.83"
					y="43.33"
					width="35"
					height="23.34"
					transform="translate(76.67 110.01) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="62.5"
					y="43.33"
					width="76.67"
					height="23.34"
					transform="translate(201.67 110.01) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="20.83"
					y="13.33"
					width="35"
					height="23.34"
					transform="translate(76.67 49.99) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="62.5"
					y="13.33"
					width="35"
					height="23.34"
					transform="translate(160 49.99) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="104.17"
					y="13.33"
					width="35"
					height="23.34"
					transform="translate(243.33 49.99) rotate(180)"
				/>
			</svg>
		),
	},
	{
		name: "layout-15",
		title: __("Layout 15"),
		description: __("Layout 15"),

		isPro: !isProFeature ? false : true,
		wrapObj: {
			options: { tag: "div", class: "grid-item-wrap" },
			styles: {
				gridTemplateColumns: { Desktop: "1fr 1fr 1fr 1fr" },
				gap: { Desktop: "1em" },
				display: { Desktop: "grid" },
			},
		},

		innerBlocks: [
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {
							gridColumnStart: { Desktop: "1" },
							gridColumnEnd: { Desktop: "3" },
						},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {
							gridColumnStart: { Desktop: "3" },
							gridColumnEnd: { Desktop: "5" },
						},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80">
				<rect fill="#1d4ed8" x="125" y="13.33" width="35" height="23.34" />
				<rect fill="#1d4ed8" x="83.33" y="13.33" width="35" height="23.34" />
				<rect fill="#1d4ed8" y="43.33" width="35" height="23.34" />
				<rect fill="#1d4ed8" x="41.67" y="43.33" width="35" height="23.34" />
				<rect fill="#1d4ed8" x="83.33" y="43.33" width="76.67" height="23.34" />
				<rect fill="#1d4ed8" y="13.33" width="76.67" height="23.34" />
			</svg>
		),
	},
	{
		name: "layout-16",
		title: __("Layout 16"),
		description: __("Layout 16"),
		isPro: !isProFeature ? false : true,
		wrapObj: {
			options: { tag: "div", class: "grid-item-wrap" },
			styles: {
				gridTemplateColumns: { Desktop: "1fr 1fr 1fr 1fr" },
				gap: { Desktop: "1em" },
				display: { Desktop: "grid" },
			},
		},

		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80">
				<rect fill="#1d4ed8" y="13.33" width="35" height="23.34" />
				<rect fill="#1d4ed8" x="41.67" y="13.33" width="35" height="23.34" />
				<rect fill="#1d4ed8" x="125" y="43.33" width="35" height="23.34" />
				<rect fill="#1d4ed8" x="83.33" y="43.33" width="35" height="23.34" />
				<rect fill="#1d4ed8" x="83.33" y="13.33" width="76.67" height="23.34" />
				<rect fill="#1d4ed8" y="43.33" width="76.67" height="23.34" />
			</svg>
		),
		innerBlocks: [
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],

			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {
							gridColumnStart: { Desktop: "3" },
							gridColumnEnd: { Desktop: "5" },
						},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {
							gridColumnStart: { Desktop: "1" },
							gridColumnEnd: { Desktop: "3" },
						},
					},
				},
			],

			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],

			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
		],
		scope: ["block"],
	},
	{
		name: "layout-17",
		title: __("Layout 17"),
		description: __("Layout 17"),
		isPro: !isProFeature ? false : true,
		wrapObj: {
			options: { tag: "div", class: "grid-item-wrap" },
			styles: {
				gridTemplateColumns: { Desktop: "1fr 1fr 1fr 1fr" },
				gap: { Desktop: "1em" },
				display: { Desktop: "grid" },
			},
		},

		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80">
				<rect fill="#1d4ed8" x="125" y="13.33" width="35" height="23.34" />
				<rect fill="#1d4ed8" x="83.33" y="13.33" width="35" height="23.34" />
				<polygon
					fill="#1d4ed8"
					points="0 13.33 0 43.33 0 66.67 35 66.67 35 43.33 35 13.33 0 13.33"
				/>
				<rect fill="#1d4ed8" x="125" y="43.33" width="35" height="23.34" />
				<rect fill="#1d4ed8" x="83.33" y="43.33" width="35" height="23.34" />
				<polygon
					fill="#1d4ed8"
					points="41.67 13.33 41.67 43.33 41.67 66.67 76.67 66.67 76.67 43.33 76.67 13.33 41.67 13.33"
				/>
			</svg>
		),
		innerBlocks: [
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {
							gridRowStart: { Desktop: "1" },
							gridRowEnd: { Desktop: "3" },
							gridColumnStart: { Desktop: "1" },
							gridColumnEnd: { Desktop: "2" },
						},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {
							gridRowStart: { Desktop: "1" },
							gridRowEnd: { Desktop: "3" },
							gridColumnStart: { Desktop: "2" },
							gridColumnEnd: { Desktop: "3" },
						},
					},
				},
			],

			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
		],
		scope: ["block"],
	},
	{
		name: "layout-18",
		title: __("Layout 18"),
		description: __("Layout 18"),
		isPro: !isProFeature ? false : true,
		wrapObj: {
			options: { tag: "div", class: "grid-item-wrap" },
			styles: {
				gridTemplateColumns: { Desktop: "1fr 1fr 1fr 1fr" },
				gap: { Desktop: "1em" },
				display: { Desktop: "grid" },
			},
		},

		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80">
				<rect
					fill="#1d4ed8"
					y="43.33"
					width="35"
					height="23.34"
					transform="translate(35 110.01) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="41.67"
					y="43.33"
					width="35"
					height="23.34"
					transform="translate(118.33 110.01) rotate(180)"
				/>
				<polygon
					fill="#1d4ed8"
					points="160 66.67 160 36.67 160 13.33 125 13.33 125 36.67 125 66.67 160 66.67"
				/>
				<rect
					fill="#1d4ed8"
					y="13.33"
					width="35"
					height="23.34"
					transform="translate(35 49.99) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="41.67"
					y="13.33"
					width="35"
					height="23.34"
					transform="translate(118.33 49.99) rotate(180)"
				/>
				<polygon
					fill="#1d4ed8"
					points="118.33 66.67 118.33 36.67 118.33 13.33 83.33 13.33 83.33 36.67 83.33 66.67 118.33 66.67"
				/>
			</svg>
		),
		innerBlocks: [
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {
							gridRowStart: { Desktop: "1" },
							gridRowEnd: { Desktop: "3" },
							gridColumnStart: { Desktop: "3" },
							gridColumnEnd: { Desktop: "4" },
						},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {
							gridRowStart: { Desktop: "1" },
							gridRowEnd: { Desktop: "3" },
							gridColumnStart: { Desktop: "4" },
							gridColumnEnd: { Desktop: "5" },
						},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
		],
		scope: ["block"],
	},

	{
		name: "layout-19",
		title: __("layout-19"),
		description: __("layout-19"),
		isPro: !isProFeature ? false : true,
		wrapObj: {
			options: { tag: "div", class: "grid-item-wrap" },
			styles: {
				gridTemplateColumns: { Desktop: "1fr 1fr 1fr 1fr" },
				gap: { Desktop: "1em" },
				display: { Desktop: "grid" },
			},
		},

		innerBlocks: [
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {
							gridColumnStart: { Desktop: "1" },
							gridColumnEnd: { Desktop: "3" },
						},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {
							gridRowStart: { Desktop: "1" },
							gridRowEnd: { Desktop: "3" },
							gridColumnStart: { Desktop: "3" },
							gridColumnEnd: { Desktop: "4" },
						},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {
							gridRowStart: { Desktop: "1" },
							gridRowEnd: { Desktop: "3" },
							gridColumnStart: { Desktop: "4" },
							gridColumnEnd: { Desktop: "5" },
						},
					},
				},
			],
			[
				"post-grid/grid-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "grid-item-wrap" },
						styles: {},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80">
				<rect
					fill="#1d4ed8"
					y="43.33"
					width="35"
					height="23.34"
					transform="translate(35 110.01) rotate(180)"
				/>
				<rect
					fill="#1d4ed8"
					x="41.67"
					y="43.33"
					width="35"
					height="23.34"
					transform="translate(118.33 110.01) rotate(180)"
				/>
				<polygon
					fill="#1d4ed8"
					points="160 66.67 160 36.67 160 13.33 125 13.33 125 36.67 125 66.67 160 66.67"
				/>
				<polygon
					fill="#1d4ed8"
					points="118.33 66.67 118.33 36.67 118.33 13.33 83.33 13.33 83.33 36.67 83.33 66.67 118.33 66.67"
				/>
				<rect fill="#1d4ed8" y="13.33" width="76.67" height="23.34" />
			</svg>
		),
	},
];

export default variations;
