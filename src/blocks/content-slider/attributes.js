var attributes = {
	wrapper: {
		type: "object",
		default: {
			options: {
				class: "",
			},

			styles: {},
		},
	},
	navsWrap: {
		type: "object",
		default: {
			options: {
				class: "nav-wrap",
			},

			styles: {},
		},
	},
	perv: {
		type: "object",
		default: {
			options: {
				text: "Prev",
				class: "",
			},

			styles: {},
		},
	},

	pervIcon: {
		type: "object",
		default: {
			options: {
				position: "before",
				class: "",
				library: "fontAwesome",
				srcType: "class" /*class, html, img, svg */,
				iconSrc: "fas fa-chevron-left",
			},
			styles: {},
		},
	},

	next: {
		type: "object",
		default: {
			options: {
				text: "Next",
				class: "",
			},

			styles: {},
		},
	},
	nextIcon: {
		type: "object",
		default: {
			options: {
				position: "after",
				class: "",
				library: "fontAwesome",
				srcType: "class" /*class, html, img, svg */,
				iconSrc: "fas fa-chevron-right",
			},

			styles: {},
		},
	},

	paginationWrap: {
		type: "object",
		default: {
			options: {
				tag: "ul",
				class: "",
			},

			styles: {},
		},
	},
	pagination: {
		type: "object",
		default: {
			options: {
				tag: "span",
				class: "",
			},

			styles: {},
		},
	},

	paginationActive: {
		type: "object",
		default: {
			options: {
				class: "",
			},

			styles: {},
		},
	},
	sliderOptions: {
		type: "object",
		default: {},
	},

	sliderOptionsRes: {
		type: "object",
		default: {},
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
