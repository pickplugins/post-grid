var attributes = {
	wrapper: {
		type: "object",
		default: {
			options: {
				tag: "div",
				class: "",
			},

			styles: {
				display: { Desktop: "flex" },
			},
		},
	},

	menuWrap: {
		type: "object",
		default: {
			options: {
				tag: "ul",
				class: "",
			},

			styles: {
				display: { Desktop: "flex" },
			},
		},
	},
	subMenuWrap: {
		type: "object",
		default: {
			options: {
				class: "",
				type: "",
			},
			styles: {
				backgroundColor: { Desktop: "" },
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
