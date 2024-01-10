import { registerBlockType, createBlock } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { useSelect, select, useDispatch, dispatch } from "@wordpress/data";
import { useEntityRecord } from "@wordpress/core-data";
import {
	createElement,
	useCallback,
	memo,
	useMemo,
	useState,
	useEffect,
} from "@wordpress/element";
import {
	PanelBody,
	RangeControl,
	Button,
	Panel,
	PanelRow,
	Dropdown,
	DropdownMenu,
	SelectControl,
	ColorPicker,
	ColorPalette,
	ToolsPanelItem,
	ComboboxControl,
	ToggleControl,
	MenuGroup,
	MenuItem,
	TextareaControl,
	Popover,
	Spinner,
} from "@wordpress/components";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import apiFetch from "@wordpress/api-fetch";
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";

import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	RichText,
	__experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import { __experimentalInputControl as InputControl } from "@wordpress/components";
import breakPoints from "../../breakpoints";
const { RawHTML } = wp.element;
import { store } from "../../store";
import {
	Icon,
	styles,
	settings,
	link,
	linkOff,
	brush,
	close,
	mediaAndText,
} from "@wordpress/icons";
import { applyFilters } from "@wordpress/hooks";

import PGIconPicker from "../../components/icon-picker";
import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";

import PGDropdown from "../../components/dropdown";
import PGLibraryBlockVariations from "../../components/library-block-variations";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import PGCssLibrary from "../../components/css-library";
import metadata from "./block.json";
import PGcssClassPicker from "../../components/css-class-picker";
import customTags from "../../custom-tags";
import PGTutorials from "../../components/tutorials";

var myStore = wp.data.select("postgrid-shop");

registerBlockType(metadata, {
	icon: {
		// Specifying a background color to appear with the icon e.g.: in the inserter.
		background: "#fff",
		// Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
		foreground: "#fff",
		// Specifying an icon for the block
		src: (
			<svg
				width="160"
				height="160"
				viewBox="0 0 160 160"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M157 57H3C1.34315 57 0 58.3431 0 60V94C0 95.6568 1.34315 97 3 97H157C158.657 97 160 95.6568 160 94V60C160 58.3431 158.657 57 157 57Z"
					fill="url(#paint0_linear_61_613)"
				/>
				<path d="M109 71H20V82H109V71Z" fill="white" />
				<path
					d="M138.943 69.1227C138.698 68.9943 138.408 68.9613 138.125 69.0493L119.776 74.5338C118.955 74.7521 118.72 75.9034 119.39 76.4267L123.547 79.8751L138.943 69.1227Z"
					fill="white"
				/>
				<path
					d="M139.446 69.6655C137.762 70.8455 124.13 80.3592 124.13 80.3592L130.043 85.264C130.554 85.7058 131.408 85.541 131.709 84.9411C131.709 84.9411 139.406 70.6157 139.406 70.6157C139.567 70.3112 139.582 69.9663 139.446 69.6655Z"
					fill="white"
				/>
				<path
					d="M123.099 80.4585C123.066 80.5099 123.051 80.5722 123.051 80.6346V84.2444C123.019 85.1472 124.196 85.6986 124.86 85.0698C124.86 85.0698 126.727 83.463 126.727 83.463C126.361 83.167 123.099 80.4585 123.099 80.4585Z"
					fill="white"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_613"
						x1="0"
						y1="77"
						x2="160"
						y2="77"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
				</defs>
			</svg>
		),
	},

	transforms: {
		from: [
			{
				type: "block",
				blocks: ["core/read-more"],
				transform: (attributes) => {
					var content = attributes.content;
					var linkTarget = attributes.linkTarget;

					return createBlock("post-grid/icon", {
						text: {
							options: {
								text: content,
								linkTarget: linkTarget,
								linkTo: "postUrl",
								linkAttr: [],
							},
						},
					});
				},
			},
			{
				type: "block",
				blocks: ["core/home-link"],
				transform: (attributes) => {
					var content = attributes.label;

					return createBlock("post-grid/icon", {
						text: {
							options: {
								text: content,
								linkAttr: [],
							},
						},
					});
				},
			},
		],
		to: [
			{
				type: "block",
				blocks: ["core/read-more"],
				transform: (attributes) => {
					var content = attributes.text;
					return createBlock("core/read-more", {
						content: content.options.text,
						linkTarget: content.options.linkTarget,
					});
				},
			},
			{
				type: "block",
				blocks: ["core/home-link"],
				transform: (attributes) => {
					var content = attributes.text;
					return createBlock("core/home-link", {
						label: content.options.text
					});
				},
			},
		],
	},

	edit: function (props) {
		var attributes = props.attributes;
		var setAttributes = props.setAttributes;
		var context = props.context;
		var clientId = props.clientId;

		var blockId = attributes.blockId;

		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;

		var wrapper = attributes.wrapper;
		var text = attributes.text;
		var icon = attributes.icon;

		var prefix = attributes.prefix;
		var postfix = attributes.postfix;

		var utmTracking = attributes.utmTracking;

		var blockCssY = attributes.blockCssY;

		var postId = context["postId"];
		var postType = context["postType"];

		let isProFeature = applyFilters("isProFeature", true);

		var breakPointX = myStore.getBreakPoint();

		const [isLoading, setisLoading] = useState(false);
		const [currentPostContent, setCurrentpostContent] = useEntityProp(
			"postType",
			postType,
			"content",
			postId
		);
		const [customFields, setCustomFields] = useState({});

		const [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);

		const [iconHtml, setIconHtml] = useState("");
		const textEnable =
			text.options.enable == undefined ? true : text.options.enable;

		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		const textSelector = blockClass + " .text";
		const iconSelector = blockClass + " .text-icon";

		const prefixSelector = blockClass + " .prefix";
		const postfixSelector = blockClass + " .postfix";

		const [preview, setPreview] = useState(true);

		const [customText, setCustomText] = useState(
			myStore.parseCustomTags(text.options.text, customTags)
		);
		const [prefixText, setprefixText] = useState(
			myStore.parseCustomTags(prefix.options.text, customTags)
		);
		const [postfixText, setpostfixText] = useState(
			myStore.parseCustomTags(postfix.options.text, customTags)
		);

		useEffect(() => {
			var textX = myStore.parseCustomTags(text.options.text, customTags);
			setCustomText(textX);
		}, [text.options.text]);

		useEffect(() => {
			var textX = myStore.parseCustomTags(prefix.options.text, customTags);
			setprefixText(textX);
		}, [prefix.options.text]);

		useEffect(() => {
			var textX = myStore.parseCustomTags(postfix.options.text, customTags);
			setpostfixText(textX);
		}, [postfix.options.text]);

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();

			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[textSelector] = text;
			blockCssObj[iconSelector] = icon;
			blockCssObj[prefixSelector] = prefix;
			blockCssObj[postfixSelector] = postfix;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		function getMetaField(metaKey) {
			apiFetch({
				path: "/post-grid/v2/get_post_meta",
				method: "POST",
				data: { postId: postId, meta_key: metaKey },
			}).then((res) => {
				if (res["meta_value"] != undefined && res["meta_value"].length > 0) {
					customFields[metaKey] = res["meta_value"];
					setCustomFields({});
					setCustomFields(customFields);
				}
			});
		}

		var linkToArgsBasic = {
			postUrl: { label: "Post URL", value: "postUrl" },
			homeUrl: { label: "Home URL", value: "homeUrl" },
			authorUrl: { label: "Author URL", value: "authorUrl" },
			authorLink: { label: "Author Link", value: "authorLink" },
			authorMail: { label: "Author Mail", value: "authorMail", isPro: true },
			authorMeta: { label: "Author Meta", value: "authorMeta", isPro: true },
			customField: { label: "Custom Field", value: "customField", isPro: true },

			customUrl: { label: "Custom URL", value: "customUrl", isPro: true },
		};

		let linkToArgs = applyFilters("linkToArgs", linkToArgsBasic);

		var textSrcArgsX = {
			siteTitle: { label: "Site Title", value: "siteTitle" },
			tagline: { label: "Tag line", value: "tagline" },
			siteUrl: { label: "Site URL", value: "siteUrl" },
			currentYear: { label: "Current Year", value: "currentYear" },
			currentDate: { label: "Current Date", value: "currentDate", isPro: true },
			postTitle: { label: "Post Title", value: "postTitle", isPro: true },
		};

		var textSrcArgs = applyFilters("textSrcArgs", textSrcArgsX);

		const [linkPickerExcerpt, setLinkPickerExcerpt] = useState(false);
		const [linkPickerText, setLinkPickerText] = useState(false);

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();

			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);

		useEffect(() => {
			var iconSrc = icon.options.iconSrc;

			var iconHtml = `<span className="${iconSrc}"></span>`;

			setIconHtml(iconHtml);
		}, [icon]);

		function onPickBlockPatterns(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;

			var blocks = content.length > 0 ? parse(content) : "";
			// console.log(content);
			// console.log(blocks);
			const attributes = blocks[0].attrs;

			if (action == "insert") {
				wp.data
					.dispatch("core/block-editor")
					.insertBlocks(wp.blocks.parse(content));
			}
			if (action == "applyStyle") {
				var wrapperX = attributes.wrapper;
				var textX = attributes.text;
				var iconX = attributes.icon;

				var prefixX = attributes.prefix;
				var postfixX = attributes.postfix;

				var blockCssYX = attributes.blockCssY;

				var blockCssObj = {};

				if (postfixX != undefined) {
					var postfixY = { ...postfixX, options: postfix.options };
					setAttributes({ postfix: postfixY });
					blockCssObj[postfixSelector] = postfixY;
				}

				if (prefixX != undefined) {
					var prefixY = { ...prefixX, options: prefix.options };
					setAttributes({ prefix: prefixY });
					blockCssObj[prefixSelector] = prefixY;
				}

				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[iconSelector] = iconY;
				}

				if (textX != undefined) {
					var textY = { ...textX, options: text.options };
					setAttributes({ text: textY });
					blockCssObj[textSelector] = textY;
				}

				if (wrapperX != undefined) {
					var wrapperY = { ...wrapperX, options: wrapper.options };
					setAttributes({ wrapper: wrapperY });
					blockCssObj[wrapperSelector] = wrapperY;
				}

				var blockCssRules = myStore.getBlockCssRules(blockCssObj);

				var items = blockCssRules;
				setAttributes({ blockCssY: { items: items } });
			}
			if (action == "replace") {
				if (confirm("Do you want to replace?")) {
					wp.data
						.dispatch("core/block-editor")
						.replaceBlock(clientId, wp.blocks.parse(content));
				}
			}
		}

		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
		}

		function setTextSrc(option, index) {
			var options = { ...text.options, src: option.value };
			setAttributes({ text: { ...text, options: options } });
		}

		function setFieldLinkTo(option, index) {
			var options = { ...text.options, linkTo: option.value };
			setAttributes({ text: { ...text, options: options } });
		}

		function onChangeIcon(arg) {
			var options = {
				...icon.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({ icon: { ...icon, options: options } });
		}

		function onPickCssLibraryWrapper(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				wrapper[sudoScource] = sudoScourceArgs;
			});

			var wrapperX = Object.assign({}, wrapper);
			setAttributes({ wrapper: wrapperX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					wrapperSelector
				);

				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onPickCssLibraryText(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				text[sudoScource] = sudoScourceArgs;
			});

			var textX = Object.assign({}, text);
			setAttributes({ text: textX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					textSelector
				);

				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onPickCssLibraryIcon(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				icon[sudoScource] = sudoScourceArgs;
			});

			var iconX = Object.assign({}, icon);
			setAttributes({ icon: iconX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					iconSelector
				);

				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onPickCssLibraryPrefix(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				prefix[sudoScource] = sudoScourceArgs;
			});

			var prefixX = Object.assign({}, prefix);
			setAttributes({ prefix: prefixX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					prefixSelector
				);

				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onPickCssLibraryPostfix(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				postfix[sudoScource] = sudoScourceArgs;
			});

			var postfixX = Object.assign({}, postfix);
			setAttributes({ postfix: postfixX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					postfixSelector
				);

				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onChangeStyleWrapper(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, wrapper);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ wrapper: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				wrapperSelector
			);
			var cssPropty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleWrapper(sudoScource, key) {
			var object = myStore.deletePropertyDeep(wrapper, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ wrapper: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				wrapperSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleWrapper(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, wrapper);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ wrapper: object });
		}

		function onChangeStyleText(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, text);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ text: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				textSelector
			);
			var cssPropty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleText(sudoScource, key) {
			var textX = { ...text };
			var object = myStore.deletePropertyDeep(textX, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ text: object });

			var blockCssX = { ...blockCssY };
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				textSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssX.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleText(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, text);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ text: object });
		}

		function onChangeStyleIcon(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, icon);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ icon: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconSelector
			);
			var cssPropty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleIcon(sudoScource, key) {
			var object = myStore.deletePropertyDeep(icon, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ icon: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleIcon(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, icon);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ icon: object });
		}

		function onChangeStylePrefix(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, prefix);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ prefix: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				prefixSelector
			);
			var cssPropty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStylePrefix(sudoScource, key) {
			var object = myStore.deletePropertyDeep(prefix, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ prefix: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				prefixSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStylePrefix(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, prefix);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ prefix: object });
		}

		function onChangeStylePostfix(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, postfix);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ postfix: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				postfixSelector
			);
			var cssPropty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStylePostfix(sudoScource, key) {
			var object = myStore.deletePropertyDeep(postfix, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ postfix: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				postfixSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStylePostfix(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, postfix);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ postfix: object });
		}

		function onBulkAddWrapper(sudoScource, cssObj) {
			let obj = Object.assign({}, wrapper);
			obj[sudoScource] = cssObj;

			setAttributes({ wrapper: obj });

			var selector = myStore.getElementSelector(sudoScource, wrapperSelector);
			var stylesObj = {};

			Object.entries(cssObj).map((args) => {
				var attr = args[0];
				var cssPropty = myStore.cssAttrParse(attr);

				if (stylesObj[selector] == undefined) {
					stylesObj[selector] = {};
				}

				if (stylesObj[selector][cssPropty] == undefined) {
					stylesObj[selector][cssPropty] = {};
				}

				stylesObj[selector][cssPropty] = args[1];
			});

			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };

			setAttributes({ blockCssY: { items: cssItemsX } });
		}

		function onBulkAddText(sudoScource, cssObj) {
			let obj = Object.assign({}, text);
			obj[sudoScource] = cssObj;

			setAttributes({ text: obj });

			var selector = myStore.getElementSelector(sudoScource, textSelector);
			var stylesObj = {};

			Object.entries(cssObj).map((args) => {
				var attr = args[0];
				var cssPropty = myStore.cssAttrParse(attr);

				if (stylesObj[selector] == undefined) {
					stylesObj[selector] = {};
				}

				if (stylesObj[selector][cssPropty] == undefined) {
					stylesObj[selector][cssPropty] = {};
				}

				stylesObj[selector][cssPropty] = args[1];
			});

			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };

			setAttributes({ blockCssY: { items: cssItemsX } });
		}

		function onBulkAddIcon(sudoScource, cssObj) {
			let obj = Object.assign({}, icon);
			obj[sudoScource] = cssObj;

			setAttributes({ icon: obj });

			var selector = myStore.getElementSelector(sudoScource, iconSelector);
			var stylesObj = {};

			Object.entries(cssObj).map((args) => {
				var attr = args[0];
				var cssPropty = myStore.cssAttrParse(attr);

				if (stylesObj[selector] == undefined) {
					stylesObj[selector] = {};
				}

				if (stylesObj[selector][cssPropty] == undefined) {
					stylesObj[selector][cssPropty] = {};
				}

				stylesObj[selector][cssPropty] = args[1];
			});

			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };

			setAttributes({ blockCssY: { items: cssItemsX } });
		}

		function onBulkAddPrefix(sudoScource, cssObj) {
			let obj = Object.assign({}, prefix);
			obj[sudoScource] = cssObj;

			setAttributes({ prefix: obj });

			var selector = myStore.getElementSelector(sudoScource, prefixSelector);
			var stylesObj = {};

			Object.entries(cssObj).map((args) => {
				var attr = args[0];
				var cssPropty = myStore.cssAttrParse(attr);

				if (stylesObj[selector] == undefined) {
					stylesObj[selector] = {};
				}

				if (stylesObj[selector][cssPropty] == undefined) {
					stylesObj[selector][cssPropty] = {};
				}

				stylesObj[selector][cssPropty] = args[1];
			});

			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };

			setAttributes({ blockCssY: { items: cssItemsX } });
		}

		function onBulkAddPostfix(sudoScource, cssObj) {
			let obj = Object.assign({}, postfix);
			obj[sudoScource] = cssObj;

			setAttributes({ postfix: obj });

			var selector = myStore.getElementSelector(sudoScource, postfixSelector);
			var stylesObj = {};

			Object.entries(cssObj).map((args) => {
				var attr = args[0];
				var cssPropty = myStore.cssAttrParse(attr);

				if (stylesObj[selector] == undefined) {
					stylesObj[selector] = {};
				}

				if (stylesObj[selector][cssPropty] == undefined) {
					stylesObj[selector][cssPropty] = {};
				}

				stylesObj[selector][cssPropty] = args[1];
			});

			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };

			setAttributes({ blockCssY: { items: cssItemsX } });
		}

		var [linkAttrItemsText, setlinkAttrItemsText] = useState({}); // Using the hook.
		var [wrapAttrItems, setwrapAttrItems] = useState({}); // Using the hook.

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		useEffect(() => {
			var sdsd = {};
			text.options.linkAttr.map((x) => {
				if (x.val) sdsd[x.id] = x.val;
			});

			setlinkAttrItemsText(sdsd);
		}, [text]);

		useEffect(() => {
			var sdsd = {};
			if (wrapper.options.attr != undefined) {
				wrapper.options.attr.map((x) => {
					if (x.val) sdsd[x.id] = x.val;
				});
			}

			setwrapAttrItems(sdsd);
		}, [wrapper]);

		var postUrl =
			text.options.customUrl != undefined && text.options.customUrl.length > 0
				? text.options.customUrl
				: currentPostUrl;

		const CustomTag = `${wrapper.options.tag}`;

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});

		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div className="p-3">
							<ToggleControl
								label="Edit Text?"
								help={preview ? "Edit Text Disabled." : "Edit Text Enabled."}
								checked={preview ? false : true}
								onChange={(e) => {
									setPreview(!preview);
								}}
							/>
						</div>
						{/* <span
							className="bg-gray-900 cursor-pointer text-white mx-3 py-1 px-2 inline-block"
							onClick={(ev) => {
								setPreview(!preview);
							}}>
							End Edit
						</span> */}
						<PanelBody
							className="font-medium text-slate-900 "
							title="Wrapper"
							initialOpen={false}>
							<PGtabs
								activeTab="options"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
									{
										name: "options",
										title: "Options",
										icon: settings,
										className: "tab-settings",
									},
									{
										name: "styles",
										title: "Styles",
										icon: brush,
										className: "tab-style",
									},
									{
										name: "css",
										title: "CSS Library",
										icon: mediaAndText,
										className: "tab-css",
									},
								]}>
								<PGtab name="options">
									<PGcssClassPicker
										tags={customTags}
										label="CSS Class"
										placeholder="Add Class"
										value={wrapper.options.class}
										onChange={(newVal) => {
											var options = { ...wrapper.options, class: newVal };
											setAttributes({
												wrapper: { styles: wrapper.styles, options: options },
											});
										}}
									/>

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											CSS ID
										</label>
										<InputControl
											value={blockId}
											onChange={(newVal) => {
												setAttributes({
													blockId: newVal,
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Wrapper Tag
										</label>

										<SelectControl
											label=""
											value={wrapper.options.tag}
											options={[
												{ label: "Choose", value: "" },
												{ label: "H1", value: "h1" },
												{ label: "H2", value: "h2" },
												{ label: "H3", value: "h3" },
												{ label: "H4", value: "h4" },
												{ label: "H5", value: "h5" },
												{ label: "H6", value: "h6" },
												{ label: "SPAN", value: "span" },
												{ label: "DIV", value: "div" },
												{ label: "P", value: "p" },
												{ label: "BUTTON", value: "button" },
											]}
											onChange={(newVal) => {
												var options = { ...wrapper.options, tag: newVal };
												setAttributes({
													wrapper: { ...wrapper, options: options },
												});
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Custom Attributes
										</label>
										<div
											// className=" cursor-pointer px-3 text-white py-1 bg-blue-600"
											className="flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-800 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
											onClick={(ev) => {
												if (wrapper.options.attr == undefined) {
													wrapper.options.attr = {};
												}
												var sdsd = wrapper.options.attr.concat({
													id: "",
													val: "",
												});

												var options = { ...wrapper.options, attr: sdsd };
												setAttributes({
													wrapper: { ...wrapper, options: options },
												});
											}}>
											Add
										</div>
									</PanelRow>

									{wrapper.options.attr != undefined &&
										wrapper.options.attr.map((x, i) => {
											return (
												<div className="my-2">
													<PanelRow>
														<InputControl
															placeholder="Name"
															className="mr-2"
															value={wrapper.options.attr[i].id}
															onChange={(newVal) => {
																wrapper.options.attr[i].id = newVal;

																var ssdsd = wrapper.options.attr.concat([]);

																var options = {
																	...wrapper.options,
																	attr: ssdsd,
																};
																setAttributes({
																	wrapper: { ...wrapper, options: options },
																});
															}}
														/>

														<InputControl
															className="mr-2"
															placeholder="Value"
															value={x.val}
															onChange={(newVal) => {
																wrapper.options.attr[i].val = newVal;
																var ssdsd = wrapper.options.attr.concat([]);

																var options = {
																	...wrapper.options,
																	attr: ssdsd,
																};
																setAttributes({
																	wrapper: { ...wrapper, options: options },
																});
															}}
														/>
														<span
															// className="text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close"
															className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
															onClick={(ev) => {
																wrapper.options.attr.splice(i, 1);

																var ssdsd = wrapper.options.attr.concat([]);

																var options = {
																	...wrapper.options,
																	attr: ssdsd,
																};
																setAttributes({
																	wrapper: { ...wrapper, options: options },
																});
															}}>
															<Icon icon={close} />
														</span>
													</PanelRow>
												</div>
											);
										})}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={wrapper}
										onChange={onChangeStyleWrapper}
										onAdd={onAddStyleWrapper}
										onRemove={onRemoveStyleWrapper}
										onBulkAdd={onBulkAddWrapper}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={wrapper}
										onChange={onPickCssLibraryWrapper}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Text"
							initialOpen={false}>
							<PGtabs
								activeTab="options"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
									{
										name: "options",
										title: "Options",
										icon: settings,
										className: "tab-settings",
									},
									{
										name: "styles",
										title: "Styles",
										icon: brush,
										className: "tab-style",
									},
									{
										name: "css",
										title: "CSS Library",
										icon: mediaAndText,
										className: "tab-css",
									},
								]}>
								<PGtab name="options">
									<ToggleControl
										label="Enable text?"
										help={textEnable ? "Text enabled" : "Text disabled."}
										checked={textEnable ? true : false}
										onChange={(e) => {
											var options = {
												...text.options,
												enable: text.options.enable ? false : true,
											};
											setAttributes({ text: { ...text, options: options } });
										}}
									/>

									{/* <PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Text Source
										</label>

										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={textSrcArgs}
											buttonTitle={
												textSrcArgs[text.options.src] == undefined
													? "Choose"
													: textSrcArgs[text.options.src].label
											}
											onChange={setTextSrc}
											values={[]}></PGDropdown>
									</PanelRow> */}

									<PGcssClassPicker
										tags={customTags}
										label="Text Source"
										placeholder="Text Source"
										value={text.options.text}
										onChange={(newVal) => {
											var options = { ...text.options, text: newVal };
											setAttributes({
												text: { ...text, options: options },
											});
										}}
									/>

									{/* {text.options.src != undefined &&
										text.options.src.length == 0 && (
											<PanelRow className="my-4">
												<label for="" className="font-medium text-slate-900 ">
													Custom Text
												</label>
												<InputControl
													value={text.options.text}
													onChange={(newVal) => {
														var options = { ...text.options, text: newVal };
														setAttributes({
															text: { ...text, options: options },
														});
													}}
												/>
											</PanelRow>
										)} */}

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Link To
										</label>

										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={linkToArgs}
											buttonTitle={
												linkToArgs[text.options.linkTo] == undefined
													? "Choose"
													: linkToArgs[text.options.linkTo].label
											}
											onChange={setFieldLinkTo}
											values={[]}></PGDropdown>
									</PanelRow>

									{text.options.linkTo.length > 0 && (
										<>
											{text.options.linkTo == "authorMeta" && (
												<PanelRow>
													<label for="" className="font-medium text-slate-900 ">
														Author Meta Key
													</label>

													<InputControl
														value={text.options.linkToAuthorMeta}
														onChange={(newVal) => {
															var options = {
																...text.options,
																linkToAuthorMeta: newVal,
															};
															setAttributes({
																text: { ...text, options: options },
															});
														}}
													/>
												</PanelRow>
											)}

											{text.options.linkTo == "customField" && (
												<PanelRow>
													<label for="" className="font-medium text-slate-900 ">
														Custom Meta Key
													</label>

													<InputControl
														value={text.options.linkToAuthorMeta}
														onChange={(newVal) => {
															var options = {
																...text.options,
																linkToAuthorMeta: newVal,
															};
															setAttributes({
																text: { ...text, options: options },
															});
														}}
													/>
												</PanelRow>
											)}

											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Link Target
												</label>

												<SelectControl
													label=""
													value={text.options.linkTarget}
													options={[
														{ label: "_self", value: "_self" },
														{ label: "_blank", value: "_blank" },
														{ label: "_parent", value: "_parent" },
														{ label: "_top", value: "_top" },
													]}
													onChange={(newVal) => {
														var options = {
															...text.options,
															linkTarget: newVal,
														};
														setAttributes({
															text: { ...text, options: options },
														});
													}}
												/>
											</PanelRow>
										</>
									)}

									{text.options.linkTo == "customUrl" && (
										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Custom Url
											</label>

											<div className="relative">
												<Button
													className={linkPickerText ? "!bg-gray-400" : ""}
													icon={link}
													onClick={(ev) => {
														setLinkPickerText((prev) => !prev);
													}}></Button>
												{text.options.customUrl.length > 0 && (
													<Button
														className="!text-red-500 ml-2"
														icon={linkOff}
														onClick={(ev) => {
															var options = { ...text.options, customUrl: "" };
															setAttributes({
																text: { ...text, options: options },
															});
														}}></Button>
												)}
												{linkPickerText && (
													<Popover position="bottom right">
														<LinkControl
															settings={[]}
															value={text.options.customUrl}
															onChange={(newVal) => {
																var options = {
																	...text.options,
																	customUrl: newVal.url,
																};
																setAttributes({
																	text: { ...text, options: options },
																});
																//setLinkPickerText(false)
															}}
														/>

														<div className="p-2">
															<span className="font-bold">Linked to:</span>{" "}
															{text.options.customUrl.length != 0
																? text.options.customUrl
																: "No link"}{" "}
														</div>
													</Popover>
												)}
											</div>
										</PanelRow>
									)}

									{text.options.linkTo.length > 0 && (
										<div>
											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Custom Attributes
												</label>
												<div
													// className=" cursor-pointer px-3 text-white py-1 bg-blue-600"
													className="flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-800 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
													onClick={(ev) => {
														var sdsd = text.options.linkAttr.concat({
															id: "",
															val: "",
														});

														var options = { ...text.options, linkAttr: sdsd };
														setAttributes({
															text: { ...text, options: options },
														});
													}}>
													Add
												</div>
											</PanelRow>

											{text.options.linkAttr != undefined &&
												text.options.linkAttr.map((x, i) => {
													return (
														<div className="my-2">
															<PanelRow>
																<InputControl
																	placeholder="Name"
																	className="mr-2"
																	value={text.options.linkAttr[i].id}
																	onChange={(newVal) => {
																		text.options.linkAttr[i].id = newVal;

																		var ssdsd = text.options.linkAttr.concat(
																			[]
																		);

																		var options = {
																			...text.options,
																			linkAttr: ssdsd,
																		};
																		setAttributes({
																			text: { ...text, options: options },
																		});
																	}}
																/>

																<InputControl
																	className="mr-2"
																	placeholder="Value"
																	value={x.val}
																	onChange={(newVal) => {
																		text.options.linkAttr[i].val = newVal;
																		var ssdsd = text.options.linkAttr.concat(
																			[]
																		);

																		var options = {
																			...text.options,
																			linkAttr: ssdsd,
																		};
																		setAttributes({
																			text: { ...text, options: options },
																		});
																	}}
																/>
																<span
																	// className="text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close"
																	className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																	onClick={(ev) => {
																		text.options.linkAttr.splice(i, 1);

																		var ssdsd = text.options.linkAttr.concat(
																			[]
																		);

																		var options = {
																			...text.options,
																			linkAttr: ssdsd,
																		};
																		setAttributes({
																			text: { ...text, options: options },
																		});
																	}}>
																	<Icon icon={close} />
																</span>
															</PanelRow>
														</div>
													);
												})}
										</div>
									)}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={text}
										onChange={onChangeStyleText}
										onAdd={onAddStyleText}
										onRemove={onRemoveStyleText}
										onBulkAdd={onBulkAddText}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={text}
										onChange={onPickCssLibraryText}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Icon"
							initialOpen={false}>
							<PGtabs
								activeTab="options"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
									{
										name: "options",
										title: "Options",
										icon: settings,
										className: "tab-settings",
									},
									{
										name: "styles",
										title: "Styles",
										icon: brush,
										className: "tab-style",
									},
									{
										name: "css",
										title: "CSS Library",
										icon: mediaAndText,
										className: "tab-css",
									},
								]}>
								<PGtab name="options">
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Choose Icon
										</label>

										<PGIconPicker
											library={icon.options.library}
											srcType={icon.options.srcType}
											iconSrc={icon.options.iconSrc}
											onChange={onChangeIcon}
										/>
									</PanelRow>

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Icon position
										</label>

										<SelectControl
											label=""
											value={icon.options.position}
											options={[
												{ label: "Choose Position", value: "" },

												{ label: "Before Text", value: "beforeText" },
												{ label: "After Text", value: "afterText" },
												{ label: "Before Prefix", value: "beforePrefix" },
												{ label: "After Prefix", value: "afterPrefix" },
												{ label: "Before Postfix", value: "beforePostfix" },
												{ label: "After Postfix", value: "afterPostfix" },
												{ label: "Before Link", value: "beforeLink" },
												{ label: "After Link", value: "afterLink" },
											]}
											onChange={(newVal) => {
												var options = { ...icon.options, position: newVal };
												setAttributes({ icon: { ...icon, options: options } });
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={icon}
										onChange={onChangeStyleIcon}
										onAdd={onAddStyleIcon}
										onRemove={onRemoveStyleIcon}
										onBulkAdd={onBulkAddIcon}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={icon}
										onChange={onPickCssLibraryIcon}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Prefix"
							initialOpen={false}>
							<PGtabs
								activeTab="options"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
									{
										name: "options",
										title: "Options",
										icon: settings,
										className: "tab-settings",
									},
									{
										name: "styles",
										title: "Styles",
										icon: brush,
										className: "tab-style",
									},
									{
										name: "css",
										title: "CSS Library",
										icon: mediaAndText,
										className: "tab-css",
									},
								]}>
								<PGtab name="options">
									<PGcssClassPicker
										tags={customTags}
										label="Prefix"
										placeholder="Add Prefix"
										value={prefix.options.text}
										onChange={(newVal) => {
											var options = { ...prefix.options, text: newVal };
											setAttributes({
												prefix: { styles: prefix.styles, options: options },
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={prefix}
										onChange={onChangeStylePrefix}
										onAdd={onAddStylePrefix}
										onRemove={onRemoveStylePrefix}
										onBulkAdd={onBulkAddPrefix}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={prefix}
										onChange={onPickCssLibraryPrefix}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>
						<PanelBody
							className="font-medium text-slate-900 "
							title="Postfix"
							initialOpen={false}>
							<PGtabs
								activeTab="options"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
									{
										name: "options",
										title: "Options",
										icon: settings,
										className: "tab-settings",
									},
									{
										name: "styles",
										title: "Styles",
										icon: brush,
										className: "tab-style",
									},
									{
										name: "css",
										title: "CSS Library",
										icon: mediaAndText,
										className: "tab-css",
									},
								]}>
								<PGtab name="options">
									<PGcssClassPicker
										tags={customTags}
										label="Postfix"
										placeholder="Add Postfix"
										value={postfix.options.text}
										onChange={(newVal) => {
											var options = { ...postfix.options, text: newVal };
											setAttributes({
												postfix: { styles: postfix.styles, options: options },
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={postfix}
										onChange={onChangeStylePostfix}
										onAdd={onAddStylePostfix}
										onRemove={onRemoveStylePostfix}
										onBulkAdd={onBulkAddPostfix}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={postfix}
										onChange={onPickCssLibraryPostfix}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>
						{/* UTM  */}
						<PanelBody
							className="font-medium text-slate-900 "
							// title="UTM tracking"
							title={
								<span className="flex justify-between w-full">
									<span>UTM Tracking</span>
									{isProFeature ? (
										<span
											className="pg-bg-color text-white px-3 py-1 rounded-md"
											onClick={(ev) => {
												window.open(
													"https://getpostgrid.com/pricing/",
													"_blank"
												);
											}}>
											Pro
										</span>
									) : (
										""
									)}{" "}
								</span>
							}
							initialOpen={false}>
							<div>
								<ToggleControl
									label="Enable?"
									help={
										utmTracking.enable
											? "Tracking Enable."
											: "Tracking Disabled."
									}
									checked={utmTracking.enable ? true : false}
									onChange={(e) => {
										var options = {
											...utmTracking,
											enable: utmTracking.enable ? false : true,
										};

										if (isProFeature) {
											alert("This feature is only available in Pro Version.");
											return;
										}
										setAttributes({
											utmTracking: options,
										});
									}}
								/>

								{utmTracking.enable ? (
									<>
										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												ID
											</label>
											<InputControl
												value={utmTracking.id}
												onChange={(newVal) => {
													var update = { ...utmTracking, id: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>
										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												Source
											</label>
											<InputControl
												value={utmTracking.source}
												onChange={(newVal) => {
													var update = { ...utmTracking, source: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>
										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												Medium
											</label>
											<InputControl
												value={utmTracking.medium}
												onChange={(newVal) => {
													var update = { ...utmTracking, medium: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>
										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												Campaign
											</label>
											<InputControl
												value={utmTracking.campaign}
												onChange={(newVal) => {
													var update = { ...utmTracking, campaign: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>

										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												Term
											</label>
											<InputControl
												value={utmTracking.term}
												onChange={(newVal) => {
													var update = { ...utmTracking, term: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>
										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												Content
											</label>
											<InputControl
												value={utmTracking.content}
												onChange={(newVal) => {
													var update = { ...utmTracking, content: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>
									</>
								) : (
									""
								)}
							</div>
						</PanelBody>
						{/* UTM  */}

						<PanelBody
							className="font-medium text-slate-900 "
							title="Block Variations"
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={"icon"}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
							/>
						</PanelBody>

						<div className="px-3">
							<PGMailSubsctibe />
							<PGContactSupport
								utm={{
									utm_source: "BlockReadMore",
									utm_campaign: "PostGridCombo",
									utm_content: "BlockOptions",
								}}
							/>
						</div>
						<div className="px-3">
							<PGTutorials slug="icon" />
						</div>
					</div>
				</InspectorControls>

				<>
					{wrapper.options.tag && (
						<CustomTag {...blockProps} {...wrapAttrItems}>
							{icon.options.position == "beforePrefix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}

							{prefix.options.text && (
								<span className={prefix.options.class}>{prefixText}</span>
							)}

							{icon.options.position == "afterPrefix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}

							{text.options.linkTo.length > 0 && (
								<>
									{icon.options.position == "beforeLink" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									<a
										className="text"
										onClick={handleLinkClick}
										{...linkAttrItemsText}
										target={text.options.linkTarget}
										href={postUrl}>
										{icon.options.position == "beforeText" && (
											<span
												className={icon.options.class}
												dangerouslySetInnerHTML={{ __html: iconHtml }}
											/>
										)}
										{textEnable && (
											<>
												{preview && (
													<span
														// className="text"
														onClick={(ev) => {
															setPreview(!preview);
														}}>
														{customText}
													</span>
												)}
												{!preview && (
													<>
														{textEnable && (
															<RichText
																// className="text"
																tagName={"span"}
																value={text.options.text}
																allowedFormats={[
																	"core/bold",
																	"core/italic",
																	"core/link",
																]}
																onChange={(content) => {
																	var options = {
																		...text.options,
																		text: content,
																	};
																	setAttributes({
																		text: { ...text, options: options },
																	});
																}}
																placeholder={__("Start Writing...")}
															/>
														)}
													</>
												)}
											</>
										)}

										{icon.options.position == "afterText" && (
											<span
												className={icon.options.class}
												dangerouslySetInnerHTML={{ __html: iconHtml }}
											/>
										)}
									</a>
									{icon.options.position == "afterLink" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}

									{text.options.linkTo.length == 0 && (
										<>
											{icon.options.position == "beforeText" && (
												<span
													className={icon.options.class}
													dangerouslySetInnerHTML={{ __html: iconHtml }}
												/>
											)}

											{preview && (
												<span
													className="text"
													onClick={(ev) => {
														setPreview(!preview);
													}}>
													{customText}
												</span>
											)}
											{!preview && (
												<>
													{textEnable && (
														<RichText
															className="text"
															tagName={"span"}
															value={text.options.text}
															allowedFormats={[
																"core/bold",
																"core/italic",
																"core/link",
															]}
															onChange={(content) => {
																var options = {
																	...text.options,
																	text: content,
																};
																setAttributes({
																	text: { ...text, options: options },
																});
															}}
															placeholder={__("Start Writing...")}
														/>
													)}
												</>
											)}

											{icon.options.position == "afterText" && (
												<span
													className={icon.options.class}
													dangerouslySetInnerHTML={{ __html: iconHtml }}
												/>
											)}
										</>
									)}
								</>
							)}

							{text.options.linkTo.length == 0 && (
								<>
									{icon.options.position == "beforeText" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{preview && (
										<span
											className="text"
											onClick={(ev) => {
												setPreview(!preview);
											}}>
											{customText}
										</span>
									)}
									{!preview && (
										<>
											{textEnable && (
												<RichText
													className="text"
													tagName={"span"}
													value={customText}
													allowedFormats={[
														"core/bold",
														"core/italic",
														"core/link",
													]}
													onChange={(content) => {
														var options = { ...text.options, text: content };
														setAttributes({
															text: { ...text, options: options },
														});
													}}
													placeholder={__("Start Writing...")}
												/>
											)}
										</>
									)}

									{icon.options.position == "afterText" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
								</>
							)}

							{icon.options.position == "beforePostfix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}
							{postfix.options.text && (
								<span className={postfix.options.class}>{postfixText}</span>
							)}
							{icon.options.position == "afterPostfix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}
						</CustomTag>
					)}

					{wrapper.options.tag.length == 0 && (
						<>
							{icon.options.position == "beforePostfix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}
							{prefix.options.text && (
								<span className={prefix.options.class}>{prefixText}</span>
							)}

							{icon.options.position == "beforePostfix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}

							{text.options.linkTo.length > 0 && (
								<>
									{icon.options.position == "beforeLink" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									<a
										className="text"
										onClick={handleLinkClick}
										{...linkAttrItemsText}
										target={text.options.linkTarget}
										href={postUrl}>
										{icon.options.position == "beforeText" && (
											<span
												className={icon.options.class}
												dangerouslySetInnerHTML={{ __html: iconHtml }}
											/>
										)}
										{preview && (
											<span
												className="text"
												onClick={(ev) => {
													setPreview(!preview);
												}}>
												{customText}
											</span>
										)}
										{!preview && (
											<>
												{textEnable && (
													<RichText
														className="text"
														tagName={"span"}
														value={text.options.text}
														allowedFormats={[
															"core/bold",
															"core/italic",
															"core/link",
														]}
														onChange={(content) => {
															var options = {
																...text.options,
																text: content,
															};
															setAttributes({
																text: { ...text, options: options },
															});
														}}
														placeholder={__("Start Writing...")}
													/>
												)}
												<span
													className="bg-gray-900 cursor-pointer text-white mx-3 py-1 px-2 inline-block"
													onClick={(ev) => {
														setPreview(!preview);
													}}>
													End Edit
												</span>
											</>
										)}

										{icon.options.position == "afterText" && (
											<span
												className={icon.options.class}
												dangerouslySetInnerHTML={{ __html: iconHtml }}
											/>
										)}
									</a>
									{icon.options.position == "afterLink" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
								</>
							)}
							{text.options.linkTo.length == 0 && (
								<>
									{icon.options.position == "beforeText" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{preview && (
										<span
											className="text"
											onClick={(ev) => {
												setPreview(!preview);
											}}>
											{customText}
										</span>
									)}
									{!preview && (
										<>
											{textEnable && (
												<RichText
													className="text"
													tagName={"span"}
													value={customText}
													allowedFormats={[
														"core/bold",
														"core/italic",
														"core/link",
													]}
													onChange={(content) => {
														var options = { ...text.options, text: content };
														setAttributes({
															text: { ...text, options: options },
														});
													}}
													placeholder={__("Start Writing...")}
												/>
											)}
										</>
									)}

									{icon.options.position == "afterText" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
								</>
							)}

							{icon.options.position == "beforePostfix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}
							{postfix.options.text && (
								<span className={postfix.options.class}>{postfixText}</span>
							)}
							{icon.options.position == "afterPostfix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}
						</>
					)}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
