var attributes = {
	wrapper: {
		type: "object",
		default: {
			options: {
				tag: "div",
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
		},
	},

	label: {
		type: "object",
		default: {
			options: {
				tag: "label",
				for: "label",
				enable: true,
				text: "",
				class: "pg-form-field-label",
			},
		},
	},

	input: {
		type: "object",
		default: {
			options: {
				type: "submit",
				placeholder: "",
				value: "Submit",
				name: "",
				required: false,
				disabled: false,
				size: false,
				minLength: null,
				maxLength: null,
				readonly: false,
				step: null,
				pattern: null,
				max: null,
				min: null,
				checked: false,
				autocomplete: false,

				id: "",
				class: "pg-form-field-submit",
				position: "afterLabel", // beforeLabel, afterLabel, insideLabel
			},
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
