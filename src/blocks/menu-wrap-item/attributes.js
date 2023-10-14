var attributes = {
	wrapper: {
		type: "object",
		default: {
			options: {
				tag: "li",
				class: "flex-item-wrap",
				isActive: false,
			},

			styles: {
				backgroundColor: { Desktop: "" },
			},
		},
	},

	link: {
		type: "object",
		default: {
			options: {
				class: "",
				text: "",
				url: "",
			},
			styles: {
				backgroundColor: { Desktop: "" },
			},
		},
	},
	subMenuWrap: {
		type: "object",
		default: {
			options: {
				class: "",
				type: "",
			},
			styles: {
				backgroundColor: { Desktop: "" },
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
				/*before, after, prefix, postfix */ class: "link-icon",
			},

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
	blockCssY: {
		type: "object",
		default: { items: {} },
	},
};
export default attributes;
