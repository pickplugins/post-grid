var attributes = {
	wrapper: {
		type: "object",
		default: {
			options: {
				tag: "div",
				class: "flex-item-wrap",
			},

			styles: {
				backgroundColor: { Desktop: "" },
				flexBasis: { Desktop: "0" },
				flexGrow: { Desktop: "1" },
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
