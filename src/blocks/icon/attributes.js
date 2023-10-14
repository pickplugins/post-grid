var attributes = {
	wrapper: {
		type: "object",
		default: {
			options: {
				tag: "div",
				class: "",
				attr: [],
			},
			styles: {
				color: { Desktop: "" },
				borderRadius: {},
			},
		},
	},

	text: {
		type: "object",
		default: {
			options: {
				enable: true,
				text: "Custom Text",
				src: "", // siteTitle, tagline, siteUrl, currentYear, currentDate, postTitle
				linkTo:
					"" /*postUrl, homeUrl, authorUrl, authorLink, mailTo, custom, customField */,
				linkToAuthorMeta: "",
				linkToCustomMeta: "",

				linkTarget: "_blank",
				customUrl: "",
				linkAttr: [],
				class: "",
			},

			styles: {
				color: { Desktop: "" },
				fontSize: { Desktop: "" },
			},
		},
	},

	icon: {
		type: "object",
		default: {
			options: {
				enable: true,
				library: "fontAwesome",
				srcType: "class",
				/*class, html, img, svg */ iconSrc: "fas fa-check-circle",
				position: "beforeText",
				/*before, after, prefix, postfix */ class: "text-icon",
			},

			styles: {
				color: { Desktop: "" },
			},
		},
	},

	prefix: {
		type: "object",
		default: {
			options: { text: "", class: "prefix" },

			styles: {
				color: { Desktop: "" },
			},
		},
	},

	postfix: {
		type: "object",
		default: {
			options: { text: "", class: "postfix" },

			styles: {
				color: { Desktop: "" },
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

	linkAttr: {
		type: "array",
		default: [],
	},

	blockCssY: {
		type: "object",
		default: { items: {} },
	},
};
export default attributes;
