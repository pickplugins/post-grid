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
	icon: {
		type: "object",
		default: {
			options: {
				class: "icon",
				position:
					"beforeLabel" /*beforeLabel, afterLabel, beforeSeparator, afterSeparator*/,
			},
			styles: {
				color: { Desktop: "" },
				backgroundColor: { Desktop: "" },
				padding: { Desktop: "" },
				margin: { Desktop: "" },
			},
		},
	},
	label: {
		type: "object",
		default: {
			options: { class: "" },
			styles: {
				color: { Desktop: "" },
				backgroundColor: { Desktop: "" },
				padding: { Desktop: "" },
				margin: { Desktop: "" },
			},
		},
	},

	separator: {
		type: "object",
		default: {
			options: { class: "", text: "»" },
			styles: {
				color: { Desktop: "" },
				backgroundColor: { Desktop: "" },
				padding: { Desktop: "" },
				margin: { Desktop: "" },
			},
		},
	},

	elements: {
		type: "object",
		default: {
			options: {
				linkTarget: "_blank",
				showLabel: true,
				showSeparator: true,
				showIcon: false,
				iconPositon: "beforeLabel", // beforeLabel, afterLabel, beforeSeparator, afterSeparator
			},
			styles: {
				color: { Desktop: "#18978F" },
				backgroundColor: { Desktop: "" },
				padding: { Desktop: "" },
				margin: { Desktop: "" },
				borderRadius: { Desktop: "" },
				fontSize: { Desktop: "" },
			},
			items: [
				{
					id: "text",
					label: "Text",
					customText: "",
					url: "",
					siteIcon: {
						library: "fontAwesome",
						srcType: "class",
						/*class, html, img, svg */ iconSrc: "",
					},
					options: {
						text: "You are here: ",
						showSeparator: true,
					},
					styles: {
						color: { Desktop: "" },
						backgroundColor: { Desktop: "" },
						padding: { Desktop: "" },
						margin: { Desktop: "" },
					},
				},
				{
					id: "homePage",
					label: "Home Page Link",
					customText: "",
					url: "",
					siteIcon: {
						library: "fontAwesome",
						srcType: "class",
						/*class, html, img, svg */ iconSrc: "",
					},
					options: {
						showSeparator: true,
					},
					styles: {
						color: { Desktop: "" },
						backgroundColor: { Desktop: "" },
						padding: { Desktop: "" },
						margin: { Desktop: "" },
					},
				},
				{
					id: "postTitle",
					label: "Post Title",
					customText: "",
					url: "",
					siteIcon: {
						library: "fontAwesome",
						srcType: "class",
						/*class, html, img, svg */ iconSrc: "",
					},
					options: {
						showSeparator: true,
					},
					styles: {
						color: { Desktop: "" },
						backgroundColor: { Desktop: "" },
						padding: { Desktop: "" },
						margin: { Desktop: "" },
					},
				},
			],
		}, // avatar, name, description, id
	},

	schema: {
		type: "object",
		default: {
			options: {
				enable: true,
			},
		},
	},

	customCss: {
		type: "string",
		default: "",
	},

	blockCssY: {
		type: "object",
		default: { items: {} },
	},

	blockId: {
		type: "string",
		default: "",
	},
};
export default attributes;
