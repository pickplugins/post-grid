var attributes = {
	wrapper: {
		type: "object",
		default: {
			options: {
				tag: "ul",
				class: "",
			},

			styles: {
				color: { Desktop: "" },
				padding: { Desktop: "" },
				margin: { Desktop: "" },
				display: {},
			},
		},
	},

	items: {
		type: "array",
		default: [
			{
				text: "",
				icon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "fas fa-chevron-right",
				},
				styles: {},
			},
		],
	},

	itemsX: {
		type: "object",
		default: {
			items: [],
		},
	},

	item: {
		type: "object",
		default: {
			options: {
				text: "",
				tag: "li",
				counter: false,
				reversed: false,
				start: 1,
				type: "1",

				class: "item",
			},

			styles: {
				color: { Desktop: "" },
				padding: { Desktop: "" },
				margin: { Desktop: "" },
				display: { Desktop: "" },
			},
		},
	},

	icon: {
		type: "object",
		default: {
			options: {
				library: "fontAwesome",
				srcType: "class",
				/*class, html, img, svg */ iconSrc: "fas fa-chevron-right",
				class: "icon",
				positon: "before",
			},

			styles: {
				color: { Desktop: "" },
				padding: { Desktop: "" },
				margin: { Desktop: "" },

				fontSize: { Desktop: "" },
			},
		},
	},

	blockId: {
		type: "string",
		default: "",
	},
	customCss: {
		type: "string",
		default: "",
	},
	blockCssY: {
		type: "object",
		default: { items: {} },
	},
};
export default attributes;
