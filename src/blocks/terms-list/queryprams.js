import { applyFilters } from '@wordpress/hooks';





const termsQueryPramsBasic = {
	taxonomy: {
		value: "category",
		multiple: false,
		id: "taxonomy",
		label: "Taxonomy",
		description: "Select Taxonomy to Query",
	},
	orderby: {
		value: "name",
		multiple: false,
		id: "orderby",
		label: "Order By",
		description: "Search keyword, ex: hello",
	},
	order: {
		value: "ASC",
		multiple: false,
		id: "order",
		label: "Order",
		description: "Query post by post status",
	},
	hide_empty: {
		value: true,
		multiple: false,
		id: "hide_empty",
		label: "Hide Empty",
		description: "Post query order",
	},
	include: {
		value: "",
		multiple: false,
		id: "include",
		label: "Include",
		description: "Post query orderby",
	},
	exclude: {
		value: "",
		multiple: false,
		id: "exclude",
		label: "Exclude",
		description: "Post query by meta fields key",
	},

	// Category Parameters
	exclude_tree: {
		value: "",
		multiple: false,
		id: "exclude_tree",
		label: "Exclude Tree",
		description: "Post query by Category ID",
	},
	number: {
		value: false,
		multiple: false,
		id: "number",
		label: "Number",
		description: "Post query by Category Name",
	},
	count: {
		value: false,
		multiple: false,
		id: "count",
		label: "count",
		description: "Post query by Category Name",
	},
	offset: {
		value: "",
		multiple: false,
		id: "offset",
		label: "Offset",
		description: "Post query by Category IDs" /*isPro: true*/,
	},
	fields: {
		value: "all",
		multiple: false,
		id: "fields",
		label: "Fields",
		description: "Post query by Category IDs" /*isPro: true*/,
	},
	name: {
		value: "",
		multiple: false,
		id: "name",
		label: "Name",
		description: "Post query by excluded Category IDs" /*isPro: true*/,
	},

	// Tag Parameters

	slug: {
		value: "",
		multiple: false,
		id: "slug",
		label: "Slug",
		description: "Post query by Tag slug",
	},
	hierarchical: {
		value: true,
		multiple: false,
		id: "hierarchical",
		label: "Hierarchical",
		description: "Post query by Tag ID",
	},
	search: {
		value: "",
		multiple: false,
		id: "search",
		label: "Search",
		description: "Post query by Tag Ids" /*isPro: true*/,
	},
	name__like: {
		value: "",
		multiple: false,
		id: "name__like",
		label: "Name like",
		description: "Post query by Tag ids" /*isPro: true*/,
	},
	description__like: {
		value: "",
		multiple: false,
		id: "description__like",
		label: "Description like",
		description: "Post query by excluded Tag ids",
	},
	pad_counts: {
		value: false,
		multiple: false,
		id: "pad_counts",
		label: "Pad counts",
		description: "Post query by Tags slug" /*isPro: true*/,
	},
	get: {
		value: "",
		multiple: false,
		id: "get",
		label: "Get",
		description: "Post query by excluded Tags slug" /*isPro: true*/,
	},

	child_of: {
		value: "",
		multiple: false,
		id: "child_of",
		label: "Child of",
		description: "Taxonomies query arguments" /*isPro: true*/,
	},
	childless: {
		value: false,
		multiple: false,
		id: "childless",
		label: "Childless",
		description: "Taxonomies query relation",
	},

	// // Date Parameters
	cache_domain: {
		value: "core",
		multiple: false,
		id: "cache_domain",
		label: "Cache domain",
		description: "Post query by date" /*isPro: true*/,
	},
	update_term_meta_cache: {
		value: true,
		multiple: false,
		id: "update_term_meta_cache",
		label: "Update term meta Cache",
		description: "Post query by year",
	},
	meta_query: {
		value: [],
		multiple: false,
		id: "meta_query",
		label: "Meta query",
		description: "Post query by month",
	},
	meta_key: {
		value: "",
		multiple: false,
		id: "meta_key",
		label: "Meta key",
		description: "Post query by week",
	},
	meta_value: {
		value: "",
		multiple: false,
		id: "meta_value",
		label: "Meta value",
		description: "Post query by day",
	},
};



let termsQueryPrams = applyFilters("termsQueryPrams", termsQueryPramsBasic);

export default termsQueryPrams



