var attributes = {
	content: {
		type: "object",
		default: {
			options: {
				tag: "div",
				class: "accordion-content",
			},

			styles: {
				backgroundColor: { Desktop: "" },
			},
		},
	},
	header: {
		type: "object",
		default: {
			options: {
				tag: "div",
				class: "accordion-header",
			},

			styles: {
				backgroundColor: { Desktop: "" },
				display: { Desktop: "flex" },
			},
		},
	},

	headerLabel: {
		type: "object",
		default: {
			options: {
				text: "Accordion Header Text",
				tag: "div",
				class: "accordion-header-label",
			},

			styles: {
				backgroundColor: { Desktop: "" },
			},
		},
	},
	labelCounter: {
		type: "object",
		default: {
			options: {
				position: "",
				tag: "div",
				class: "accordion-header-counter",
			},

			styles: {},
		},
	},

	labelIcon: {
		type: "object",
		default: {
			options: {
				library: "fontAwesome",
				srcType: "class",
				iconSrc: "",
				position: "",
				enable: false,
				class: "",
			},

			styles: {},
		},
	},

	icon: {
		type: "object",
		default: {
			options: {
				library: "fontAwesome",
				srcType: "class",
				iconSrc: "",
				position: "",
				class: "accordion-icon",
			},

			styles: {},
		},
	},

	iconToggle: {
		type: "object",
		default: {
			options: {
				library: "fontAwesome",
				srcType: "class",
				iconSrc: "",
				class: "accordion-icon-toggle",
			},

			styles: {},
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
