var attributes = {
	text: {
		type: "object",
		default: {
			options: {
				content: "Hello World!",
				tag: "div",
				class: "pg-text",
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
