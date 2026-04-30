var SliderDefaultData = {
	globalOptions: {
		viewType: "viewSlider",
		itemSource: "posts",
		search: true,
	},
	itemQueryArgs: { "postType": { "id": "postType", "value": ["post"] }, "order": { "id": "order", "value": "DESC" }, "orderby": { "id": "orderby", "value": ["date"] }, "postStatus": { "id": "postStatus", "value": ["publish"] }, "postsPerPage": { "id": "postsPerPage", "value": "5" } },
	items: [

	],
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
			class: "items",
		},
		styles: {},
	},
	itemWrap: {
		options: {
			class: "item",
		},
		styles: {},
	},
	navsWrap: {
		options: {
			class: "nav-wrap",
		},
		styles: { "display": { "Desktop": "flex" }, "width": { "Desktop": "100%" }, "alignItems": { "Desktop": "center" }, "position": { "Desktop": "absolute !important" }, "top": { "Desktop": "-50px" }, "left": { "Desktop": "20px" }, "gap": { "Desktop": "20px" }, "justifyContent": { "Desktop": "right" } },
	},
	navItem: {
		options: {
			class: "nav-item",
		},
		styles: { "fontSize": { "Desktop": "18px" }, "fontStyle": { "Desktop": "normal" }, "fontWeight": { "Desktop": "400" }, "textAlign": { "Desktop": "left" }, "color": { "Desktop": "#ffffff" }, "backgroundColor": { "Desktop": "#1F2E45" }, "borderRadius": { "Desktop": "50px" }, "padding": { "Desktop": "5px 20px 5px 20px" } },
	},



	prev: {
		options: {
			text: "Prev",
			class: "",
		},
		styles: {},
	},
	prevIcon: {
		options: {
			position: "before",
			class: "",
			library: "fontAwesome",
			srcType: "class",
			iconSrc: "fas fa-chevron-left",
		},
		styles: {},
	},
	next: {
		options: {
			text: "Next",
			class: "",
		},
		styles: {},
	},
	nextIcon: {
		options: {
			position: "after",
			class: "",
			library: "fontAwesome",
			srcType: "class",
			iconSrc: "fas fa-chevron-right",
		},
		styles: {},
	},
	paginationWrap: {
		options: {
			type: "",
			tag: "",
			class: "",
		},
		styles: { "display": { "Desktop": "flex" }, "justifyContent": { "Desktop": "center" }, "paddingTop": { "Desktop": "30px" } },
	},
	paginationItem: {
		options: {
			tag: "",
			class: "",
		},
		styles: { "backgroundColor": { "Desktop": "#f1f7f9" }, "width": { "Desktop": "15px" }, "height": { "Desktop": "15px" }, "margin": { "Desktop": "0px 10px 0px 0px" }, "borderRadius": { "Desktop": " 20px 20px 20px 20px" }, "border": { "Desktop": "1px solid #1f2937" }, },
	},
	paginationItemActive: {
		options: {
			class: "",
		},
		styles: { "backgroundColor": { "Desktop": "#1f2e45" }, },
	},
	sliderOptions: {
		perPage: "3",
		perMove: "1",
		autoplay: "1",
		gap: "1em",
		pagination: "1",
		drag: "1",
		arrows: "1",
		pauseOnHover: "1",
		speed: "400",
	},
	sliderOptionsRes: {},
};
export default SliderDefaultData;
