var FilterableDefaultData = {
	globalOptions: {
		viewType: "viewFilterable",
		itemSource: "posts",
		search: true,
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
		perPage: 6,
		filters: [],

		pagination: {
			type: 'filterable',
			nextText: "Next",
			previousText: "Previous",
			loadMoreText: "Load More",
			loadingText: "Loading...",
			noPostText: "No More Posts",

			"nextIcon": {
				"library": "fontAwesome",
				"srcType": "class",
				"iconSrc": "",
				"class": "load-more"
			},
			"previousIcon": {
				"library": "fontAwesome",
				"srcType": "class",
				"iconSrc": "",
				"class": "load-more"
			},


			"loadingIcon": {
				"library": "fontAwesome",
				"srcType": "class",
				"iconSrc": "",
				"class": "load-more"
			},
			"loadMoreIcon": {
				"library": "fontAwesome",
				"srcType": "class",
				"iconSrc": "",
				"class": "load-more"
			}
		},
	},
	itemQueryArgs: { "postType": { "id": "postType", "value": ["post"] }, "order": { "id": "order", "value": "DESC" }, "orderby": { "id": "orderby", "value": ["date"] }, "postStatus": { "id": "postStatus", "value": ["publish"] }, "postsPerPage": { "id": "postsPerPage", "value": "-1" } },
	items: [],
	loopLayout: [
		{
			"id": 1,
			"type": "root",
			"children": [
				{
					"id": 2,
					"type": "layer",
					"children": [
						{
							"id": 5,
							"type": "postThumbnail",
							"content": "",
							"parent_id": 2,
							"options": {
								"thumbnailSize": "full",
								"srcId": "",
								"srcUrl": "",
								"defaultSrcUrl": "https://comboblocks.com/server/wp-content/uploads/2024/11/da41bd7c-7420-3c0a-b169-d2d87acba187.jpg",
								"linkTo": "postUrl"
							},

							"cssSelectors": {
								"wrapper": {
									"handle": "",
									"label": "Featured Image Wrapper",
									"styles": {}
								},
								"img": {
									"handle": "img",
									"label": "Image",
									"styles": {
										"width": {
											"Desktop": "100%"
										}
									}
								},
								"a": {
									"handle": "a",
									"label": "Link",
									"styles": {}
								}
							},
							"chosen": false,
							"selected": false
						},
						{
							"id": 3,
							"type": "postTitle",
							"content": "Dummy Title",
							"parent_id": 2,
							"options": {
								"linkTo": "postUrl",
								"target": "_blank"
							},
							"cssSelectors": {
								"wrapper": {
									"handle": "",
									"label": "Post Title Wrapper",
									"styles": {
										"fontSize": {
											"Desktop": "16px"
										}
									}
								},
								"a": {
									"handle": "a",
									"label": "Post Title Link",
									"styles": {}
								}
							},
							"chosen": false,
							"selected": false
						},
						{
							"id": 4,
							"type": "postExcerpt",
							"parent_id": 2,
							"options": {
								"limitBy": "",
								"limitCount": 20,
								"readMoreText": "Read More"
							},
							"cssSelectors": {
								"wrapper": {
									"handle": "",
									"label": "Excerpt Wrapper",
									"styles": {}
								},
								"excerpt-text": {
									"handle": ".excerpt-text",
									"label": "Excerpt Text",
									"styles": {
										"fontSize": {
											"Desktop": "16px"
										}
									}
								},
								"redmore": {
									"handle": ".redmore",
									"label": "Redmore Text",
									"styles": {
										"fontSize": {
											"Desktop": "18px"
										}
									}
								}
							},
							"chosen": false,
							"selected": false
						}
					],
					"parent_id": 1,
					"styles": {},
					"options": {
						"animateOn": ""
					},
					"chosen": false,
					"selected": false
				}
			],
			"parent_id": null,
			"styles": {},
			"chosen": false,
			"selected": false
		}
	],
	wrapper: {
		options: {
			content: "",
			tag: "div",
			class: "post-grid-wrapper",
		},
		styles: {},
	},
	itemsWrap:
		{ "options": { "class": "items" }, "styles": { "display": { "Desktop": "grid" }, "gap": { "Desktop": "1em" }, "gridTemplateColumns": { "Desktop": "1fr 1fr 1fr" } } }
	,
	itemWrap: {
		options: {
			class: "item",
		},
		styles: {},
	},

	filterItem: { "styles": { "backgroundColor": { "Desktop": "#6923F7" }, "padding": { "Desktop": "5px 15px 5px 15px" }, "borderRadius": { "Desktop": "3px 3px 3px 3px" }, "color": { "Desktop": "#ffffff" }, "fontSize": { "Desktop": "16px" }, "textDecoration": { "Desktop": "none #000000 wavy 1px !important" } } }
	,
	activeFilter: { "options": { "slug": "all" }, "styles": { "backgroundColor": { "Desktop": "#6923F7" } } }
	,
	filterGroupWrap: { "options": [], "styles": { "display": { "Desktop": "flex" }, "gap": { "Desktop": "1em" }, "justifyContent": { "Desktop": "center" }, "margin": { "Desktop": "50px 0px 0px 0px" }, "alignItems": { "Desktop": "center" }, "marginBottom": { "Desktop": "30px" } } }
	,
	filterGroup: { "options": [], "styles": { "display": { "Desktop": "flex" }, "gap": { "Desktop": "1em" }, "justifyContent": { "Desktop": "center" }, "alignItems": { "Desktop": "center" } } }
	,
	filterGroupTitle: {
		options: {},
		styles: {
		},
	},

	paginationWrap: { "options": { "tag": "ul", "class": "" }, "styles": { "display": { "Desktop": "flex" }, "gap": { "Desktop": "1em" }, "justifyContent": { "Desktop": "center" }, "margin": { "Desktop": "50px 0px 0px 0px" } } }
	,
	paginationItem: { "options": { "tag": "span", "class": "" }, "styles": { "backgroundColor": { "Desktop": "#6923F7" }, "padding": { "Desktop": "5px 15px 5px 15px" }, "borderRadius": { "Desktop": "3px 3px 3px 3px" }, "color": { "Desktop": "#ffffff" }, "fontSize": { "Desktop": "16px" }, "textDecoration": { "Desktop": "none #000000 wavy 1px !important" } } }
	,
	paginationItemActive: { "options": { "class": "" }, "styles": { "backgroundColor": { "Desktop": "#0d5a55" } } }

	,
};
export default FilterableDefaultData;
