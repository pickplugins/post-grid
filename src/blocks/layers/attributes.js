var attributes = {
	wrapper: {
		type: "object",
		default: {
			options: {
				tag: "div",
				class: "pg-layers",

				linkTo:
					"postUrl" /*postUrl, homeUrl, authorUrl, authorLink, mailTo, custom, customField */,
				linkToAuthorMeta: "",
				linkToCustomMeta: "",

				linkTarget: "_blank",
				customUrl: "",
			},

			styles: {
				position: {},
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
