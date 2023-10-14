var attributes = {
	wrapper: {
		type: "object",
		default: {
			options: {
				content: "",
				tag: "div",
				class: "",
			},

			styles: {
				color: { Desktop: "" },

				position: {},
				zIndex: {},
				top: {},
				right: {},
				bottom: {},
				left: {},
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
