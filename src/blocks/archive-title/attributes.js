var attributes = {
	wrapper: {
		type: "object",
		default: {
			options: { tag: "div", class: "" },

			styles: {
				color: { Desktop: "" },
				backgroundColor: { Desktop: "" },
				padding: { Desktop: "" },
				margin: { Desktop: "" },
			},
		},
	},

	archiveTitle: {
		type: "object",
		default: {
			options: {
				tag: "div",
				archiveType: "auto",
				customLabel: "Archive: %s",
				dateFormat: "",

				linkTo: "", // postUrl, customField, authorUrl, authorLink, homeUrl, custom
				linkToUrl: "",
				linkToMetaKey: "",

				linkTarget: "_blank",
				linkAttr: [],
				customUrl: "",
				class: "",
			},

			styles: {
				color: { Desktop: "" },
				backgroundColor: { Desktop: "" },
				padding: { Desktop: "" },

				fontSize: { Desktop: "" },
			},
		},
	},
	icon: {
		type: "object",
		default: {
			options: {
				library: "fontAwesome",
				srcType: "class",
				/*class, html, img, svg */ iconSrc: "far fa-calendar-alt",
				position: "beforeArchiveTitle",
				/*before, after, prefix, postfix */ class: "postdate-icon",
			},

			styles: {
				color: { Desktop: "" },
				backgroundColor: { Desktop: "" },
				padding: { Desktop: "" },
				margin: { Desktop: "" },
				fontSize: { Desktop: "" },
			},
		},
	},

	prefix: {
		type: "object",
		default: {
			options: { text: "", class: "prefix" },
			styles: {
				color: { Desktop: "" },
				backgroundColor: { Desktop: "" },
			},
		},
	},

	postfix: {
		type: "object",
		default: {
			options: { text: "", class: "prefix" },
			styles: {
				color: { Desktop: "" },
				backgroundColor: { Desktop: "" },
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
