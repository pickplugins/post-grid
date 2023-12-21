import { __ } from "@wordpress/i18n";
import { applyFilters } from "@wordpress/hooks";

let isProFeature = applyFilters("isProFeature", true);

/**
 * Template option choices for predefined columns layouts.
 */
const variations = [
	{
		name: "3-column",
		title: __("3 Col"),
		description: __("3 Col"),
		isDefault: true,
		isPro: false,
		atts: {
			lazyLoad: {
				options: {
					class: "lazyLoad",
					enable: "no",
					srcUrl: "",
					srcId: "",
					icon: { library: "", srcType: "class", iconSrc: "" },
				},
				styles: [],
			},
			container: { options: { class: "" }, styles: [] },
			itemsWrap: {
				options: { class: "items-loop" },
				styles: {
					display: { Desktop: "grid" },
					gridTemplateColumns: { Desktop: "1fr 1fr 1fr" },
					gap: { Desktop: "2em" },
				},
			},
			itemWrap: { options: { class: "item" }, styles: [] },
			grid: {
				options: { itemCss: [] },
				styles: {
					gridTemplateColumns: [],
					gridTemplateRows: [],
					colGap: [],
					rowGap: [],
					color: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			noPostsWrap: { options: { class: "no-posts text-center" }, styles: [] },
			spinnerWrap: { options: { class: "spinner" }, styles: [] },
		},
		innerBlocks: [
			[
				"post-grid/post-grid-filterable-nav",
				{
					filterable: {
						options: {
							filters: [
								{
									groupTitle: "",
									type: "",
									logic: "",
									showPostCount: "",
									items: [
										{ id: 33, slug: "dolorem", title: "dolorem", count: 6 },
										{ id: 34, slug: "ducimus", title: "ducimus", count: 5 },
										{ id: 36, slug: "sed", title: "sed", count: 7 },
										{
											id: 1,
											slug: "uncategorized",
											title: "Uncategorized",
											count: 14,
										},
									],
								},
							],
							allText: "All",
							logicWithinGroup: "",
							logicBetweenGroups: "",
							multifilter: false,
							showSort: "",
							filterToggle: "no",
							showRandom: "",
							showAll: "yes",
							showClear: "",
							activeFilter: "",
							parPage: 6,
						},
						styles: {
							color: { Desktop: "#000000" },
							wordBreak: {},
							padding: { Desktop: "8px 16px 8px 16px" },
							margin: {},
							display: { Desktop: "inline-block" },
							cursor: { Desktop: "pointer" },
							backgroundColor: { Desktop: "#9DD6DF" },
							borderRadius: { Desktop: "6px 6px 6px 6px" },
							fontSize: { Desktop: "16px" },
							fontWeight: { Desktop: "600" },
						},
					},
					activeFilter: {
						options: { slug: "all" },
						styles: {
							color: { Desktop: "" },
							wordBreak: {},
							padding: { Desktop: "" },
							margin: { Desktop: "" },
						},
					},
					filterGroupWrap: {
						options: {},
						styles: {
							color: {},
							backgroundColor: {},
							wordBreak: {},
							padding: {},
							margin: { Desktop: "20px 0px 20px 0px" },
							display: { Desktop: "flex" },
							justifyContent: { Desktop: "center" },
							gap: { Desktop: "12px" },
						},
					},
					filterGroup: {
						options: {},
						styles: {
							color: {},
							backgroundColor: {},
							wordBreak: {},
							padding: {},
							margin: {},
							display: { Desktop: "flex" },
							gap: { Desktop: "12px" },
						},
					},
				},
			],
			[
				"post-grid/post-query",
				{
					noPostsWrap: {
						options: { class: "no-posts text-center" },
						styles: [],
					},
					spinnerWrap: { options: { class: "spinner" }, styles: [] },
					queryArgs: {
						items: [
							{
								val: ["post"],
								multiple: false,
								id: "postType",
								label: "Post Types",
								description: "Select Post Types to Query",
							},
							{
								val: ["publish"],
								multiple: false,
								id: "postStatus",
								label: "Post status",
								description: "Query post by post status",
							},
							{
								val: "DESC",
								multiple: false,
								id: "order",
								label: "Order",
								description: "Post query order",
							},
							{
								val: ["date"],
								multiple: false,
								id: "orderby",
								label: "Orderby",
								description: "Post query orderby",
							},
							{
								val: "-1",
								multiple: false,
								id: "postsPerPage",
								label: "Posts Per Page",
								description: "Number of post to show per page",
							},
							{
								val: "1",
								multiple: false,
								id: "paged",
								label: "Paged",
								description: "Pagination start with",
							},
						],
					},
					itemsWrap: { options: { excludedWrapper: "" }, styles: [] },
					itemWrap: {
						options: {
							tag: "div",
							class: "item",
							counterClass: true,
							termsClass: true,
							oddEvenClass: true,
						},
						styles: [],
					},
				},
			],
			[
				"post-grid/post-query-pagination",
				{
					pagination: {
						options: {
							class: "pagination pg-post-query-pagination",
							type: "normal",
							maxPageNum: "5",
							prevText: "",
							nextText: "",
							loadMoreText: "Load More",
							noMorePosts: "No More Posts",
							loadingText: "Loading...",
							loadingIcon: {
								loadingPosition: "beforeText",
								library: "fontAwesome",
								srcType: "class",
								iconSrc: "",
								class: "load-more",
							},
							loadMoreIcon: {
								library: "fontAwesome",
								srcType: "class",
								iconSrc: "",
								position: "beforeText",
								class: "load-more",
							},
						},
						styles: {
							margin: { Desktop: "20px 0px 20px 0px" },
							display: { Desktop: "flex" },
							justifyContent: { Desktop: "center" },
							alignItems: { Desktop: "center" },
							gap: { Desktop: "1em" },
							backgroundColor: { Desktop: "#ffffff" },
							padding: { Desktop: "10px 10px 10px 10px" },
							width: { Desktop: "max-content", Tablet: "auto" },
							marginRight: { Desktop: "auto" },
							marginLeft: { Desktop: "auto" },
							borderRadius: { Desktop: "10px 10px 10px 10px" },
							boxShadow: { Desktop: "0px 0px 0px 1px #50547d4f" },
							border: { Desktop: "1px solid #5198dd" },
							flexWrap: { Tablet: "wrap !important" },
						},
					},
					paginationItem: {
						options: { class: "page-numbers " },
						styles: {
							color: { Desktop: "#656565" },
							fontSize: { Desktop: "16px" },
							padding: [],
							backgroundColor: [],
							borderRadius: { Desktop: "50px 50px 50px 50px" },
							boxShadow: [],
							border: [],
							fontWeight: { Desktop: "700" },
							display: { Desktop: "inline-block" },
							height: { Desktop: "50px" },
							lineHeight: { Desktop: "50px" },
							width: { Desktop: "50px" },
							textAlign: { Desktop: "center" },
						},
					},
					paginationItemActive: {
						options: { class: "page-numbers " },
						styles: {
							backgroundColor: { Desktop: "#2c79d3" },
							padding: [],
							borderRadius: [],
							color: { Desktop: "#ffffff" },
							border: [],
							boxShadow: [],
							fontWeight: [],
						},
					},
					next: {
						options: {
							enable: true,
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-right",
							position: "beforeText",
							class: "next",
						},
						styles: [],
					},
					previous: {
						options: {
							enable: true,
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-left",
							position: "beforeText",
							class: "previous",
						},
						styles: [],
					},
					start: {
						options: {
							enable: true,
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "",
							position: "beforeText",
							class: "start",
						},
						styles: [],
					},
					end: {
						options: {
							enable: true,
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "",
							position: "beforeText",
							class: "end",
						},
						styles: [],
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
	{
		name: "1-column",
		title: __("1 Col"),
		description: __("1 Col"),
		isDefault: true,
		isPro: false,
		atts: {
			lazyLoad: {
				options: {
					class: "lazyLoad",
					enable: "no",
					srcUrl: "",
					srcId: "",
					icon: { library: "", srcType: "class", iconSrc: "" },
				},
				styles: [],
			},
			container: { options: { class: "" }, styles: [] },
			itemsWrap: {
				options: { class: "items-loop" },
				styles: {
					gridTemplateColumns: { Desktop: "1fr" },
					gap: { Desktop: "1em" },
					display: { Desktop: "grid" },
				},
			},
			itemWrap: {
				options: { class: "item" },
				styles: {
					padding: { Desktop: "0px 0px 40px 0px", Tablet: "0px 0px 0px 0px" },
					position: { Desktop: "relative" },
				},
				after: {
					position: { Desktop: "absolute !important" },
					gridTemplateColumns: [],
					gap: [],
					content: { Desktop: '" "' },
					height: { Desktop: "1px", Tablet: "0px" },
					width: { Desktop: "100%", Tablet: "0px" },
					top: { Desktop: "200px" },
					left: { Desktop: "0px" },
					backgroundColor: { Desktop: "#b98341" },
				},
			},
			grid: {
				options: { itemCss: [] },
				styles: {
					gridTemplateColumns: [],
					gridTemplateRows: [],
					colGap: [],
					rowGap: [],
					color: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			noPostsWrap: { options: { class: "no-posts text-center" }, styles: [] },
			spinnerWrap: { options: { class: "spinner" }, styles: [] },
		},
		innerBlocks: [
			[
				"post-grid/post-grid-filterable-nav",
				{
					filterable: {
						options: {
							filters: [
								{
									groupTitle: "",
									type: "",
									logic: "",
									showPostCount: "",
									items: [
										{ id: 33, slug: "dolorem", title: "dolorem", count: 6 },
										{ id: 34, slug: "ducimus", title: "ducimus", count: 5 },
										{ id: 36, slug: "sed", title: "sed", count: 7 },
										{
											id: 1,
											slug: "uncategorized",
											title: "Uncategorized",
											count: 14,
										},
									],
								},
							],
							allText: "All",
							logicWithinGroup: "",
							logicBetweenGroups: "",
							multifilter: false,
							showSort: "",
							filterToggle: "no",
							showRandom: "",
							showAll: "yes",
							showClear: "",
							activeFilter: "",
							parPage: 6,
						},
						styles: {
							color: { Desktop: "#000000" },
							wordBreak: {},
							padding: { Desktop: "8px 16px 8px 16px" },
							margin: {},
							display: { Desktop: "inline-block" },
							cursor: { Desktop: "pointer" },
							backgroundColor: { Desktop: "#9DD6DF" },
							borderRadius: { Desktop: "6px 6px 6px 6px" },
							fontSize: { Desktop: "16px" },
							fontWeight: { Desktop: "600" },
						},
					},
					activeFilter: {
						options: { slug: "all" },
						styles: {
							color: { Desktop: "" },
							wordBreak: {},
							padding: { Desktop: "" },
							margin: { Desktop: "" },
						},
					},
					filterGroupWrap: {
						options: {},
						styles: {
							color: {},
							backgroundColor: {},
							wordBreak: {},
							padding: {},
							margin: { Desktop: "20px 0px 20px 0px" },
							display: { Desktop: "flex" },
							justifyContent: { Desktop: "start" },
							gap: { Desktop: "12px" },
						},
					},
					filterGroup: {
						options: {},
						styles: {
							color: {},
							backgroundColor: {},
							wordBreak: {},
							padding: {},
							margin: {},
							display: { Desktop: "flex" },
							gap: { Desktop: "12px" },
						},
					},
				},
			],
			[
				"post-grid/post-query",
				{
					noPostsWrap: {
						options: { class: "no-posts text-center" },
						styles: [],
					},
					spinnerWrap: { options: { class: "spinner" }, styles: [] },
					queryArgs: {
						items: [
							{ val: ["post"], id: "postType" },
							{ val: ["publish"], id: "postStatus" },
							{ val: "DESC", id: "order" },
							{ val: ["date"], id: "orderby" },
							{ val: "5", id: "postsPerPage" },
							{ val: "1", id: "paged" },
						],
					},
					itemsWrap: { options: { excludedWrapper: "" }, styles: [] },
					itemWrap: {
						options: {
							tag: "div",
							class: "item",
							counterClass: true,
							termsClass: true,
							oddEvenClass: true,
						},
						styles: [],
					},
				},
			],
			[
				"post-grid/post-query-pagination",
				{
					pagination: {
						options: {
							class: "pagination pg-post-query-pagination",
							type: "normal",
							maxPageNum: "5",
							prevText: "Previous",
							nextText: "Next",
							loadMoreText: "Load More",
							noMorePosts: "No More Posts",
							loadingText: "Loading...",
							loadingIcon: {
								loadingPosition: "beforeText",
								library: "fontAwesome",
								srcType: "class",
								iconSrc: "",
								class: "load-more",
							},
							loadMoreIcon: {
								library: "fontAwesome",
								srcType: "class",
								iconSrc: "",
								position: "beforeText",
								class: "load-more",
							},
						},
						styles: {
							margin: { Desktop: "20px 0px 20px 0px" },
							display: { Desktop: "flex" },
							justifyContent: { Desktop: "center" },
							alignItems: { Desktop: "center" },
							gap: { Desktop: "0px" },
							backgroundColor: { Desktop: "#ffffff" },
							padding: [],
							width: { Desktop: "max-content", Tablet: "auto" },
							marginRight: { Desktop: "auto" },
							marginLeft: { Desktop: "auto" },
							borderRadius: { Desktop: "5px 5px 5px 5px" },
							boxShadow: [],
							border: [],
							flexWrap: { Tablet: "wrap !important" },
						},
					},
					paginationItem: {
						options: { class: "page-numbers " },
						styles: {
							color: { Desktop: "#7b7b7b" },
							fontSize: { Desktop: "16px" },
							padding: { Desktop: "5px 15px 5px 15px" },
							backgroundColor: [],
							borderRadius: [],
							boxShadow: [],
							border: { Desktop: "1px solid #e3e3e3" },
							fontWeight: { Desktop: "700" },
						},
					},
					paginationItemActive: {
						options: { class: "page-numbers " },
						styles: {
							backgroundColor: [],
							padding: [],
							borderRadius: [],
							color: { Desktop: "#e34f3f" },
							border: [],
							boxShadow: [],
							fontWeight: [],
						},
					},
					next: {
						options: {
							enable: true,
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "",
							position: "beforeText",
							class: "next",
						},
						styles: [],
					},
					previous: {
						options: {
							enable: true,
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "",
							position: "beforeText",
							class: "previous",
						},
						styles: [],
					},
					start: {
						options: {
							enable: true,
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "",
							position: "beforeText",
							class: "start",
						},
						styles: [],
					},
					end: {
						options: {
							enable: true,
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "",
							position: "beforeText",
							class: "end",
						},
						styles: [],
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
