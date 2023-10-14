var attributes = {
	wrapper: {
		type: "object",
		default: {
			options: { tag: "div", class: "", useAsBackground: "no" },

			styles: {
				width: { Desktop: "" },
				height: { Desktop: "" },
				overflow: { Desktop: "" },
				padding: { Desktop: "" },
				margin: { Desktop: "" },
			},
		},
	},

	image: {
		type: "object",
		default: {
			options: {
				imgSrcType: "media" /*media, customField, customUrl, imgId */,
				imgSrcMetaKey: "",
				imgSrcMetaKeyType: "ID", //ID, URL,
				imgSrcImgId: "",
				srcUrl: "",
				srcId: "",
				linkTo: "", // postUrl, customField, authorUrl, authorLink, homeUrl, custom
				linkToMetaKey: "",
				linkTocustomUrl: "",
				altTextSrc: "imgAltText", // imgAltText, imgTitle, imgCaption, imgDescription imgName, imgSlug, postTitle, excerpt, postSlug, customField, custom

				altTextCustom: "",
				altTextMetaKey: "",

				titleTextSrc: "imgTitle", // imgAltText, imgTitle, imgCaption, imgDescription imgName, imgSlug, postTitle, excerpt, postSlug, customField, custom

				titleTextCustom: "",
				titleTextMetaKey: "",

				linkTarget: "_blank",
				linkAttr: [],
				class: "",
				size: { Desktop: "full", Tablet: "full", Mobile: "full" },
			},

			styles: {
				maxWidth: { Desktop: "100%" },
				height: { Desktop: "auto" },
				filter: {},
				objectFit: { Desktop: "cover" },
				margin: { Desktop: "" },
			},
		},
	},

	lightbox: {
		type: "object",
		default: {
			options: {
				enable: false,
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
