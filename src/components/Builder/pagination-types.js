import { __ } from "@wordpress/i18n";


export const paginationTypes = {
	none: {
		label: __("None", "post-grid"),
		value: "none"
	},
	normal: {
		label: __("Normal Pagination",
			"post-grid"), value: "normal"
	},
	// ajax: {
	// 	label: __("Ajax Pagination", "post-grid"),
	// 	value: "ajax",
	// 	isPro: true,
	// },
	// next_previous: {
	// 	label: __("Next-Previous", "post-grid"),
	// 	value: "next_previous",
	// 	isPro: true,
	// },
	// loadmore: {
	// 	label: __("Load More", "post-grid"),
	// 	value: "loadmore",
	// 	isPro: true,
	// },
	// infinite: {
	// 	label: __("Infinite Load", "post-grid"),
	// 	value: "infinite",
	// 	isPro: true,
	// },
	// filterable: {
	// 	label: __("Filterable", "post-grid"),
	// 	value: "filterable"
	// },
}