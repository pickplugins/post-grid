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
				text: "Your Name",
				class: "pg-form-field-label",
			},
		},
	},

	input: {
		type: "object",
		default: {
			options: {
				type: "text",
				placeholder: "Write your name",
				value: "",
				valueSource: "",

				name: "",
				required: false,
				disabled: false,
				size: false,
				minLength: null,
				maxLength: null,
				readonly: false,
				step: null,
				pattern: null,
				patternCustom: "",
				includeMailBody: true,

				max: null,
				min: null,
				checked: false,
				autocomplete: false,

				id: "",
				class: "pg-form-field-input",
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
