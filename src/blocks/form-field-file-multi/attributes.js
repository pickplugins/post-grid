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

	addItem: {
		type: "object",
		default: {
			options: {
				tag: "div",
				position: "afterFiles", // beforeFiles, afterFiles
				class: "",
				text: "",
			},

			styles: {},
		},
	},

	file: {
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
				maxCount: 3,
				maxSize: null,
				fileTypes: ["jpg", "jpeg", "png", "gif", "pdf"],

				id: "",
				class: "pg-form-field-file-multi",
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
