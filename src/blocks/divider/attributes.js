var attributes = {
	wrapper: {
		type: "object",
		default: {
			options: { tag: "div", class: "" },
			styles: {
				color: { Desktop: "" },
				padding: { Desktop: "" },
				margin: { Desktop: "" },
				display: {},
			},
		},
	},
	divider: {
		type: "object",
		default: {
			options: {
				tag: "div",

				customUrl: "",
				class: "",
			},

			styles: {
				display: {},
				width: {},
				height: {},

				color: { Desktop: "" },
				padding: {
					Desktop: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
				},

				margin: { Desktop: "" },
			},
		},
	},

	customCss: {
		type: "string",
		default: "",
	},

	blockId: {
		type: "string",
		default: "",
	},
	blockCssY: {
		type: "object",
		default: { items: {} },
	},
};
export default attributes;
