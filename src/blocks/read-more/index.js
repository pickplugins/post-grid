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
import { applyFilters } from "@wordpress/hooks";

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
					d="M61.1765 52H4.70588C3.4578 52 2.26085 52.4958 1.37832 53.3783C0.495798 54.2608 0 55.4578 0 56.7059V103.765C0 105.013 0.495798 106.21 1.37832 107.092C2.26085 107.975 3.4578 108.471 4.70588 108.471H61.1765C62.4246 108.471 63.6215 107.975 64.504 107.092C65.3866 106.21 65.8824 105.013 65.8824 103.765V56.7059C65.8824 55.4578 65.3866 54.2608 64.504 53.3783C63.6215 52.4958 62.4246 52 61.1765 52ZM56.4706 99.0588H9.41177V61.4118H56.4706V99.0588Z"
					fill="url(#paint0_linear_61_409)"
				/>
				<path
					d="M160 57H84.7061V66.4118H160V57Z"
					fill="url(#paint1_linear_61_409)"
				/>
				<path
					d="M160 75.8823H85V84.8823H160V75.8823Z"
					fill="url(#paint2_linear_61_409)"
				/>
				<path d="M131 94.8823H85V103.882H131V94.8823Z" fill="#C15940" />
				<path
					d="M36.8446 69L27.097 84.7233L23.2135 78.5059L13 95H20.7281H33.4661H53L36.8446 69Z"
					fill="url(#paint3_linear_61_409)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_409"
						x1="0"
						y1="80.2353"
						x2="65.8824"
						y2="80.2353"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_409"
						x1="84.7061"
						y1="61.7059"
						x2="160"
						y2="61.7059"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_409"
						x1="85"
						y1="80.3823"
						x2="160"
						y2="80.3823"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_409"
						x1="13"
						y1="82"
						x2="53"
						y2="82"
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

					return createBlock("post-grid/read-more", {
						readMore: {
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
		],
		to: [
			{
				type: "block",
				blocks: ["core/read-more", "core/code"],
				transform: (attributes) => {
					var content = attributes.readMore;

					return createBlock("core/read-more", {
						content: content.options.text,
						linkTarget: content.options.linkTarget,
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
		var readMore = attributes.readMore;
		var icon = attributes.icon;

		var linkAttr = attributes.linkAttr;
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
		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);

		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;

		var redmoreSelector = blockClass + " .readmore";

		if (readMore.options.linkTo.length == 0) {
			var redmoreSelector = blockClass + " .text";
		} else {
			var redmoreSelector = blockClass + " .readmore";
		}

		const iconSelector = blockClass + " .readmore-icon";

		const prefixSelector = blockClass + " .prefix";
		const postfixSelector = blockClass + " .postfix";

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();

			setAttributes({ blockId: blockIdX });

			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[redmoreSelector] = readMore;
			blockCssObj[iconSelector] = icon;
			blockCssObj[prefixSelector] = prefix;
			blockCssObj[postfixSelector] = postfix;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		var linkToArgsBasic = {
			noUrl: { label: "No URL", value: "" },

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

		function setFieldLinkTo(option, index) {
			var options = { ...readMore.options, linkTo: option.value };
			setAttributes({ readMore: { ...readMore, options: options } });
		}

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

		const [linkPickerExcerpt, setLinkPickerExcerpt] = useState(false);
		const [linkPickerReadmore, setLinkPickerReadmore] = useState(false);

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

			const attributes = blocks[0].attrs;

			if (action == "insert") {
				wp.data
					.dispatch("core/block-editor")
					.insertBlocks(wp.blocks.parse(content));
			}
			if (action == "applyStyle") {
				var wrapperX = attributes.wrapper;
				var readMoreX = attributes.readMore;
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

				if (readMoreX != undefined) {
					var readMoreY = { ...readMoreX, options: readMore.options };
					setAttributes({ readMore: readMoreY });
					blockCssObj[readMoreSelector] = readMoreY;
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

		function onPickCssLibraryReadMore(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				readMore[sudoScource] = sudoScourceArgs;
			});

			var readMoreX = Object.assign({}, readMore);
			setAttributes({ readMore: readMoreX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					redmoreSelector
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

		function onChangeStyleReadmore(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, readMore);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ readMore: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				redmoreSelector
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

		function onRemoveStyleReadmore(sudoScource, key) {
			var object = myStore.deletePropertyDeep(readMore, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ readMore: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				redmoreSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleReadmore(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, readMore);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ readMore: object });
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

		function onBulkAddReadmore(sudoScource, cssObj) {
			let obj = Object.assign({}, readMore);
			obj[sudoScource] = cssObj;

			setAttributes({ readMore: obj });

			var selector = myStore.getElementSelector(sudoScource, redmoreSelector);
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

		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.
		var [linkAttrItemsReadmore, setlinkAttrItemsReadmore] = useState({}); // Using the hook.

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		useEffect(() => {
			var sdsd = {};

			readMore.options.linkAttr.map((x) => {
				if (x.val) sdsd[x.id] = x.val;
			});

			setlinkAttrItemsReadmore(sdsd);
		}, [readMore]);

		var postUrl =
			readMore.options.customUrl != undefined &&
			readMore.options.customUrl.length > 0
				? readMore.options.customUrl
				: currentPostUrl;

		const CustomTag = `${wrapper.options.tag}`;

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});

		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
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
											]}
											onChange={(newVal) => {
												var options = { ...wrapper.options, tag: newVal };
												setAttributes({
													wrapper: { ...wrapper, options: options },
												});
											}}
										/>
									</PanelRow>
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
							title="Read More"
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
									<PanelRow className="my-4">
										<label for="" className="font-medium text-slate-900 ">
											Read More Text
										</label>

										<InputControl
											value={readMore.options.text}
											onChange={(newVal) => {
												var options = { ...readMore.options, text: newVal };
												setAttributes({
													readMore: { ...readMore, options: options },
												});
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Link To
										</label>

										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={linkToArgs}
											buttonTitle={
												readMore.options.linkTo == undefined ||
												readMore.options.linkTo.length == 0
													? "Choose"
													: linkToArgs[readMore.options.linkTo].label
											}
											onChange={setFieldLinkTo}
											values={[]}></PGDropdown>
									</PanelRow>

									{readMore.options.linkTo.length > 0 && (
										<>
											{readMore.options.linkTo == "authorMeta" && (
												<PanelRow>
													<label for="" className="font-medium text-slate-900 ">
														Author Meta Key
													</label>

													<InputControl
														value={readMore.options.linkToAuthorMeta}
														onChange={(newVal) => {
															var options = {
																...readMore.options,
																linkToAuthorMeta: newVal,
															};
															setAttributes({
																readMore: { ...readMore, options: options },
															});
														}}
													/>
												</PanelRow>
											)}

											{readMore.options.linkTo == "customField" && (
												<PanelRow>
													<label for="" className="font-medium text-slate-900 ">
														Custom Meta Key
													</label>

													<InputControl
														value={readMore.options.linkToAuthorMeta}
														onChange={(newVal) => {
															var options = {
																...readMore.options,
																linkToAuthorMeta: newVal,
															};
															setAttributes({
																readMore: { ...readMore, options: options },
															});
														}}
													/>
												</PanelRow>
											)}

											{readMore.options.linkTo == "customUrl" && (
												<PanelRow>
													<label for="" className="font-medium text-slate-900 ">
														Custom Url
													</label>

													<div className="relative">
														<Button
															className={
																linkPickerPosttitle ? "!bg-gray-400" : ""
															}
															icon={link}
															onClick={(ev) => {
																setLinkPickerPosttitle((prev) => !prev);
															}}></Button>
														{readMore.options.customUrl.length > 0 && (
															<Button
																className="!text-red-500 ml-2"
																icon={linkOff}
																onClick={(ev) => {
																	var options = {
																		...readMore.options,
																		customUrl: "",
																	};
																	setAttributes({
																		readMore: { ...readMore, options: options },
																	});
																	setLinkPickerPosttitle(false);
																}}></Button>
														)}
														{linkPickerPosttitle && (
															<Popover position="bottom right">
																<LinkControl
																	settings={[]}
																	value={readMore.options.customUrl}
																	onChange={(newVal) => {
																		var options = {
																			...readMore.options,
																			customUrl: newVal.url,
																		};

																		setAttributes({
																			readMore: {
																				...readMore,
																				options: options,
																			},
																		});
																	}}
																/>

																<div className="p-2">
																	<span className="font-bold">Linked to:</span>{" "}
																	{readMore.options.customUrl.length != 0
																		? readMore.options.customUrl
																		: "No link"}{" "}
																</div>
															</Popover>
														)}
													</div>
												</PanelRow>
											)}

											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Link Target
												</label>

												<SelectControl
													label=""
													value={readMore.options.linkTarget}
													options={[
														{ label: "_self", value: "_self" },
														{ label: "_blank", value: "_blank" },
														{ label: "_parent", value: "_parent" },
														{ label: "_top", value: "_top" },
													]}
													onChange={(newVal) => {
														var options = {
															...readMore.options,
															linkTarget: newVal,
														};
														setAttributes({
															readMore: { ...readMore, options: options },
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
														var sdsd = readMore.options.linkAttr.concat({
															id: "",
															val: "",
														});

														var options = {
															...readMore.options,
															linkAttr: sdsd,
														};
														setAttributes({
															readMore: { ...readMore, options: options },
														});
													}}>
													Add
												</div>
											</PanelRow>

											{readMore.options.linkAttr != undefined &&
												readMore.options.linkAttr.map((x, i) => {
													return (
														<div className="my-2">
															<PanelRow>
																<InputControl
																	placeholder="Name"
																	className="mr-2"
																	value={readMore.options.linkAttr[i].id}
																	onChange={(newVal) => {
																		readMore.options.linkAttr[i].id = newVal;

																		var ssdsd =
																			readMore.options.linkAttr.concat([]);

																		var options = {
																			...readMore.options,
																			linkAttr: ssdsd,
																		};
																		setAttributes({
																			readMore: {
																				...readMore,
																				options: options,
																			},
																		});
																	}}
																/>

																<InputControl
																	className="mr-2"
																	placeholder="Value"
																	value={x.val}
																	onChange={(newVal) => {
																		readMore.options.linkAttr[i].val = newVal;
																		var ssdsd =
																			readMore.options.linkAttr.concat([]);

																		var options = {
																			...readMore.options,
																			linkAttr: ssdsd,
																		};
																		setAttributes({
																			readMore: {
																				...readMore,
																				options: options,
																			},
																		});
																	}}
																/>
																<span
																	// className="text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close"
																	className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																	onClick={(ev) => {
																		readMore.options.linkAttr.splice(i, 1);

																		var ssdsd =
																			readMore.options.linkAttr.concat([]);

																		var options = {
																			...readMore.options,
																			linkAttr: ssdsd,
																		};
																		setAttributes({
																			readMore: {
																				...readMore,
																				options: options,
																			},
																		});
																	}}>
																	<Icon icon={close} />
																</span>
															</PanelRow>
														</div>
													);
												})}
										</>
									)}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={readMore}
										onChange={onChangeStyleReadmore}
										onAdd={onAddStyleReadmore}
										onRemove={onRemoveStyleReadmore}
										onBulkAdd={onBulkAddReadmore}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={readMore}
										onChange={onPickCssLibraryReadMore}
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

												{
													label: "Before Readmore Text",
													value: "beforeReadmore",
												},
												{
													label: "After Readmore Text",
													value: "afterReadmore",
												},
												{ label: "Before Prefix", value: "beforePrefix" },
												{ label: "After Prefix", value: "afterPrefix" },
												{ label: "Before Postfix", value: "beforePostfix" },
												{ label: "After Postfix", value: "afterPostfix" },
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
								blockName={"read-more"}
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
							<PGTutorials slug="read-more" />
						</div>
					</div>
				</InspectorControls>

				<>
					{wrapper.options.tag && (
						<CustomTag {...blockProps}>
							{icon.options.position == "beforePrefix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}

							{prefix.options.text && (
								<span className={prefix.options.class}>
									{prefix.options.text}
								</span>
							)}

							{icon.options.position == "afterPrefix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}

							{readMore.options.linkTo.length > 0 && (
								<a
									className="readmore"
									onClick={handleLinkClick}
									{...linkAttrItemsReadmore}
									target={readMore.options.linkTarget}
									href={postUrl}>
									{icon.options.position == "beforeReadmore" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}

									<RichText
										className="text"
										tagName={"span"}
										value={readMore.options.text}
										allowedFormats={["core/bold", "core/italic", "core/link"]}
										onChange={(content) => {
											var options = { ...readMore.options, text: content };
											setAttributes({
												readMore: { ...readMore, options: options },
											});
										}}
										placeholder={__("Start Writing...")}
									/>

									{icon.options.position == "afterReadmore" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
								</a>
							)}

							{readMore.options.linkTo.length == 0 && (
								<RichText
									className="text"
									tagName={"span"}
									value={readMore.options.text}
									allowedFormats={["core/bold", "core/italic", "core/link"]}
									onChange={(content) => {
										var options = { ...readMore.options, text: content };
										setAttributes({
											readMore: { ...readMore, options: options },
										});
									}}
									placeholder={__("Start Writing...")}
								/>
							)}

							{icon.options.position == "beforePostfix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}

							{postfix.options.text && (
								<span className={postfix.options.class}>
									{postfix.options.text}
								</span>
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
							{readMore.options.linkTo.length > 0 && (
								<a
									{...blockProps}
									className="readmore"
									onClick={handleLinkClick}
									{...linkAttrItemsReadmore}
									target={readMore.options.linkTarget}
									href={postUrl}>
									{icon.options.position == "beforePostfix" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{prefix.options.text && (
										<span className={prefix.options.class}>
											{prefix.options.text}
										</span>
									)}

									{icon.options.position == "beforePostfix" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}

									{icon.options.position == "beforeReadmore" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}

									<RichText
										className="text"
										tagName={"span"}
										value={readMore.options.text}
										allowedFormats={["core/bold", "core/italic", "core/link"]}
										onChange={(content) => {
											var options = { ...readMore.options, text: content };
											setAttributes({
												readMore: { ...readMore, options: options },
											});
										}}
										placeholder={__("Start Writing...")}
									/>

									{icon.options.position == "afterReadmore" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}

									{icon.options.position == "beforePostfix" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{postfix.options.text && (
										<span className={postfix.options.class}>
											{postfix.options.text}
										</span>
									)}
									{icon.options.position == "afterPostfix" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
								</a>
							)}
							{readMore.options.linkTo.length == 0 && (
								<div
									{...blockProps}
									className="readmore"
									onClick={handleLinkClick}
									{...linkAttrItemsReadmore}
									target={readMore.options.linkTarget}
									href={postUrl}>
									{icon.options.position == "beforePostfix" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{prefix.options.text && (
										<span className={prefix.options.class}>
											{prefix.options.text}
										</span>
									)}

									{icon.options.position == "beforePostfix" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}

									{icon.options.position == "beforeReadmore" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}

									<RichText
										className="text"
										tagName={"span"}
										value={readMore.options.text}
										allowedFormats={["core/bold", "core/italic", "core/link"]}
										onChange={(content) => {
											var options = { ...readMore.options, text: content };
											setAttributes({
												readMore: { ...readMore, options: options },
											});
										}}
										placeholder={__("Start Writing...")}
									/>

									{icon.options.position == "afterReadmore" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}

									{icon.options.position == "beforePostfix" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{postfix.options.text && (
										<span className={postfix.options.class}>
											{postfix.options.text}
										</span>
									)}
									{icon.options.position == "afterPostfix" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
								</div>
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
