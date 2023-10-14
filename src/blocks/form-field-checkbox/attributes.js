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

	input: {
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
					0: { label: "Option 1", value: "option1", readonly: false },
					1: { label: "Option 2", value: "option2", readonly: false },
					2: { label: "Option 3", value: "option3", readonly: false },
				},
				argsSrc: {
					src: "", // posts, users, countryNames, countryCodes, Gender, ageGroups
					taxonomy: "",
					postType: [],
					userRole: [],
				},

				id: "",
				class: "pg-form-field-checkbox",
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
