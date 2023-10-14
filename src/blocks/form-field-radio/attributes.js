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
				enable: true,

				tag: "label",
				for: "label",

				text: "Your Name",
				class: "pg-form-field-label",
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
	radio: {
		type: "object",
		default: {
			options: {
				value: null,
				name: "",
				required: false,
				disabled: false,
				multiple: false,
				autofocus: null,
				readonly: false,
				args: {
					0: { label: "Option 1", value: "option1" },
					1: { label: "Option 2", value: "option2" },
					2: { label: "Option 3", value: "option3" },
				},

				id: "",
				class: "pg-form-field-radio",
				position: "afterLabel", // beforeLabel, afterLabel, insideLabel
			},

			styles: {},
		},
	},

	item: {
		type: "object",
		default: {
			options: {
				tag: "div",

				class: "",
			},

			styles: {},
		},
	},
	itemLabel: {
		type: "object",
		default: {
			options: {
				tag: "div",

				class: "",
			},

			styles: {},
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
