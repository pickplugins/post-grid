var MasonryDefaultData = {
	globalOptions: {
		viewType: "viewMasonry",
		itemSource: "posts",
		search: true,
		pagination: {
			type: 'normal',
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
		}
	},
	itemQueryArgs: { "postType": { "id": "postType", "value": ["post"] }, "order": { "id": "order", "value": "DESC" }, "orderby": { "id": "orderby", "value": ["date"] }, "postStatus": { "id": "postStatus", "value": ["publish"] }, "postsPerPage": { "id": "postsPerPage", "value": "5" } }, items: [],
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
	itemsWrap: {
		options: {
			class: "",
		},
		styles: {},
	},
	itemWrap: {
		options: {
			class: "",
		},
		styles: { "width": { "Desktop": "calc((100% - 60px) / 4)" }, "marginBottom": { "Desktop": "20px" }, "backgroundColor": { "Desktop": "#ffffff" }, "padding": { "Desktop": "10px 10px 10px 10px" } },
	},
	masonryOptions: {
		gutter: 20,
		numberOfColumns: 4,
		itemSelector: ".item",
		columnWidth: ".item",
	},
	paginationWrap: {
		options: {
			type: "",
			class: "",
		},
		styles: {},
	},
	paginationItem: {
		options: {
			class: "",
		},
		styles: {},
	},
	paginationItemActive: {
		options: {
			class: "",
		},
		styles: {},
	},
};
export default MasonryDefaultData;
