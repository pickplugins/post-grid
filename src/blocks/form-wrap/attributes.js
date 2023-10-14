var attributes = {
	wrapper: {
		type: "object",
		default: {
			options: {
				tag: "div",
				class: "",
			},

			styles: {},
		},
	},

	form: {
		type: "object",
		default: {
			options: {
				class: "",
				type: "contactForm",
			},
			styles: {},
		},
	},

	visible: {
		type: "object",
		default: {},
	},

	onSubmit: {
		type: "object",
		default: {},
	},

	onProcess: {
		type: "object",
		default: {},
	},

	afterSubmit: {
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
