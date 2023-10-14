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
	label: {
		type: "object",
		default: {
			options: {
				tag: "label",
				for: "label",
				enable: true,

				text: "Your Name",
				class: "pg-form-field-label",
			},

			styles: {},
		},
	},

	input: {
		type: "object",
		default: {
			options: {
				type: "text",
				placeholder: "Write your name",
				value: "",
				name: "",
				required: false,
				disabled: false,
				minLength: null,
				maxLength: null,
				readonly: false,
				multiple: false,

				maxCount: 3,
				maxSize: null,
				fileTypes: [".jpg", ".jpeg", ".png", ".gif", ".pdf"],

				id: "",
				class: "pg-form-field-file",
				position: "afterLabel", // beforeLabel, afterLabel, insideLabel
			},

			styles: {},
		},
	},

	inputWrap: {
		type: "object",
		default: {
			options: {
				tag: "div",
				enable: true,

				class: "",
			},
		},
	},
	labelWrap: {
		type: "object",
		default: {
			options: {
				tag: "div",
				enable: true,
				class: "",
			},
			styles: {},
		},
	},
	errorWrap: {
		type: "object",
		default: {
			options: {
				tag: "div",
				enable: true,
				text: "",
				position: "afterInput",

				class: "",
			},
			styles: {},
		},
	},

	requiredWrap: {
		type: "object",
		default: {
			options: {
				tag: "span",
				enable: true,
				class: "",
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
