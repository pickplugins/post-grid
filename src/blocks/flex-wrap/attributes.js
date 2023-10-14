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
