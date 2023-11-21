import { registerBlockType } from "@wordpress/blocks";
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
import { applyFilters } from "@wordpress/hooks";

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
	mediaAndText,
} from "@wordpress/icons";

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

var myStore = wp.data.select("postgrid-shop");

registerBlockType(metadata, {
	icon: {
		// Specifying a background color to appear with the icon e.g.: in the inserter.
		background: "#fff",
		// Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
		foreground: "#fff",
		// Specifying an icon for the block
		src: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
				<rect fill="#1d4ed8" y="22.72" width="13.97" height="2.35" />
				<rect fill="#1d4ed8" x="16.42" y="22.72" width="9.96" height="2.35" />
				<rect fill="#1d4ed8" y="16.82" width="36" height="2.35" />
				<rect fill="#1d4ed8" y="10.93" width="36" height="2.35" />
			</svg>
		),
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

		var postExcerpt = attributes.postExcerpt;
		var wrapper = attributes.wrapper;
		var readMore = attributes.readMore;

		var linkAttr = attributes.linkAttr;
		var prefix = attributes.prefix;
		var postfix = attributes.postfix;

		var blockCssY = attributes.blockCssY;

		var postId = context["postId"];
		var postType = context["postType"];

		var breakPointX = myStore.getBreakPoint();

		const [isLoading, setisLoading] = useState(false);

		const [currentPostExcerpt, setCurrentpostExcerpt] = useEntityProp(
			"postType",
			postType,
			"excerpt",
			postId
		);
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

		var limitByArgsBasic = {
			none: { label: "Choose..", value: "none" },
			word: { label: "Word", value: "word" },
			character: { label: "Character", value: "character", isPro: true },
		};

		let limitByArgs = applyFilters("limitByArgs", limitByArgsBasic);

		var excerptSourceArgsBasic = {
			auto: { label: "Auto", value: "auto" },
			excerpt: { label: "Excerpt", value: "excerpt" },
			content: { label: "Content", value: "content" },
			meta: { label: "Custom Fields", value: "meta", isPro: true },
		};

		let excerptSourceArgs = applyFilters(
			"excerptSourceArgs",
			excerptSourceArgsBasic
		);

		function setFieldLinkTo(option, index) {
			var options = { ...postExcerpt.options, linkTo: option.value };
			setAttributes({ postExcerpt: { ...postExcerpt, options: options } });
		}

		function setLimitBy(option, index) {
			var options = { ...postExcerpt.options, limitBy: option.value };
			setAttributes({ postExcerpt: { ...postExcerpt, options: options } });
		}

		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		var excerptSelector = "";
		const readmoreSelector = blockClass + " .readmore";
		const prefixSelector = blockClass + " .prefix";
		const postfixSelector = blockClass + " .postfix";

		if (wrapper.options.tag.length != 0) {
			if (postExcerpt.options.isLink) {
				excerptSelector = blockClass + " .excerpt-text";
			} else {
				if (postExcerpt.options.tag.length > 0) {
					excerptSelector = blockClass + " .excerpt-text";
				} else {
					excerptSelector = blockClass;
				}
			}
		} else {
			excerptSelector = blockClass;
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

		useEffect(() => {
			var excerptSource = postExcerpt.options.excerptSource;
			var excerptSourceMeta = postExcerpt.options.excerptSourceMeta;

			if (excerptSource == "meta" && excerptSourceMeta.length > 0) {
				var response = getMetaField(excerptSourceMeta);
			}
		}, [postExcerpt]);

		const [postExcerptEdited, setPostExcerptEdited] =
			useState(currentPostExcerpt);
		//const [postContentEdited, setPostContentEdited] = useState(currentPostContent);

		useEffect(() => {
			//setisLoading(true);

			var excerptSource = postExcerpt.options.excerptSource;
			var excerptText = "";

			if (excerptSource == "auto") {
				excerptText =
					currentPostExcerpt != undefined && currentPostExcerpt.length > 0
						? currentPostExcerpt
						: "";
			} else if (excerptSource == "excerpt") {
				excerptText = currentPostExcerpt;
			} else if (excerptSource == "content") {
				excerptText = "";
			} else if (excerptSource == "meta") {
				var excerptSourceMeta = postExcerpt.options.excerptSourceMeta;

				setTimeout(() => {
					excerptText = customFields[excerptSourceMeta]
						? customFields[excerptSourceMeta]
						: "";
				}, 100);
			}

			excerptText =
				excerptText.length > 0
					? excerptText
					: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book";

			if (!postExcerpt.options.keepHtml) {
				excerptText = excerptText.replace(/<[^>]*>?/gm, "");
			}

			setTimeout(() => {
				var count =
					postExcerpt.options.limitCount > 0
						? postExcerpt.options.limitCount
						: 999;

				if (postExcerpt.options.limitBy == "character") {
					setPostExcerptEdited(excerptText.substring(0, count));
				} else if (postExcerpt.options.limitBy == "word") {
					setPostExcerptEdited(
						excerptText.split(" ").splice(0, count).join(" ")
					);
				} else {
					setPostExcerptEdited(excerptText);
				}

				//setisLoading(false);
			}, 100);
		}, [postExcerpt, currentPostExcerpt]);

		const [linkPickerExcerpt, setLinkPickerExcerpt] = useState(false);
		const [linkPickerReadmore, setLinkPickerReadmore] = useState(false);

		// useEffect(() => {
		// 	setAttributes({ blockId: blockIdX });

		// 	myStore.generateBlockCss(blockCssY.items, blockId);
		// }, [clientId]);
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();

			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[excerptSelector] = postExcerpt;
			blockCssObj[readmoreSelector] = readMore;
			blockCssObj[prefixSelector] = prefix;
			blockCssObj[postfixSelector] = postfix;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		// for (var x in breakPoints) {

		//   var item = breakPoints[x];
		//   breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

		// }

		function onPickBlockPatterns(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;

			var blocks = content.length > 0 ? parse(content) : "";
			console.log(content);
			console.log(blocks);
			const attributes = blocks[0].attrs;

			if (action == "insert") {
				wp.data
					.dispatch("core/block-editor")
					.insertBlocks(wp.blocks.parse(content));
			}
			if (action == "applyStyle") {
				var wrapperX = attributes.wrapper;
				var postExcerptX = attributes.postExcerpt;
				var readMoreX = attributes.readMore;
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

				if (readMoreX != undefined) {
					var readMoreY = { ...readMoreX, options: readMore.options };
					setAttributes({ readMore: readMoreY });
					blockCssObj[readMoreSelector] = readMoreY;
				}

				if (postExcerptX != undefined) {
					var postExcerptY = { ...postExcerptX, options: postExcerpt.options };
					setAttributes({ postExcerpt: postExcerptY });
					blockCssObj[postExcerptSelector] = postExcerptY;
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

		function onPickCssLibraryPostExcerpt(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				postExcerpt[sudoScource] = sudoScourceArgs;
			});

			var postExcerptX = Object.assign({}, postExcerpt);
			setAttributes({ postExcerpt: postExcerptX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					excerptSelector
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

		function onPickCssLibraryReadmore(args) {
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
					readmoreSelector
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

		function onChangeStylePostExcerpt(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, postExcerpt);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ postExcerpt: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				excerptSelector
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

		function onRemoveStylePostExcerpt(sudoScource, key) {
			var object = myStore.deletePropertyDeep(postExcerpt, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ postExcerpt: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				excerptSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });

			var sudoScourceX = { ...postExcerpt[sudoScource] };
			if (sudoScourceX[key] != undefined) {
				delete sudoScourceX[key];
			}

			postExcerpt[sudoScource] = sudoScourceX;
			setAttributes({ postExcerpt: { ...postExcerpt } });

			if (blockCssY.items[excerptSelector] == undefined) {
				blockCssY.items[excerptSelector] = {};
			}

			Object.entries(sudoScourceX).map((args) => {
				var argAttr = myStore.cssAttrParse(args[0]);
				var argAttrVal = args[1];
				blockCssY.items[excerptSelector][argAttr] = argAttrVal;
			});

			if (blockCssY.items[excerptSelector][key] != undefined) {
				delete blockCssY.items[excerptSelector][key];
			}

			setAttributes({ blockCssY: { items: blockCssY.items } });
		}

		function onAddStylePostExcerpt(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, postExcerpt);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ postExcerpt: object });
		}

		function onChangeStyleReadmore(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, readMore);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ readMore: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				readmoreSelector
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
				readmoreSelector
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

		function onBulkAddPostExcerpt(sudoScource, cssObj) {
			let obj = Object.assign({}, postExcerpt);
			obj[sudoScource] = cssObj;

			setAttributes({ postExcerpt: obj });

			var selector = myStore.getElementSelector(sudoScource, excerptSelector);
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

			var selector = myStore.getElementSelector(sudoScource, readmoreSelector);
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

		function onResetWrapper(sudoScources) {
			let obj = Object.assign({}, wrapper);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						wrapperSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ wrapper: obj });
		}
		function onResetPostExcerpt(sudoScources) {
			let obj = Object.assign({}, postExcerpt);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						excerptSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ postExcerpt: obj });
		}
		function onResetReadMore(sudoScources) {
			let obj = Object.assign({}, readMore);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						readmoreSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ readMore: obj });
		}
		function onResetPrefix(sudoScources) {
			let obj = Object.assign({}, prefix);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						prefixSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ prefix: obj });
		}
		function onResetPostfix(sudoScources) {
			let obj = Object.assign({}, postfix);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						postfixSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ postfix: obj });
		}

		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.
		var [linkAttrItemsReadmore, setlinkAttrItemsReadmore] = useState({}); // Using the hook.

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		useEffect(() => {
			var sdsd = {};

			postExcerpt.options.linkAttr.map((x) => {
				if (x.val) sdsd[x.id] = x.val;
			});

			setlinkAttrItems(sdsd);
		}, [postExcerpt]);

		useEffect(() => {
			var sdsd = {};

			readMore.options.linkAttr.map((x) => {
				if (x.val) sdsd[x.id] = x.val;
			});

			setlinkAttrItemsReadmore(sdsd);
		}, [readMore]);

		var postUrl =
			postExcerpt.options.customUrl != undefined &&
			postExcerpt.options.customUrl.length > 0
				? postExcerpt.options.customUrl
				: currentPostUrl;

		const CustomTagX = `${wrapper.options.tag}`;
		const CustomTagExcerpt = `${postExcerpt.options.tag}`;

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class} `,
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
										onReset={onResetWrapper}
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
							title="Post Excerpt"
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
										label="Linked with post?"
										help={
											postExcerpt.options.isLink
												? "Linked with post URL"
												: "Not linked to post URL."
										}
										checked={postExcerpt.options.isLink ? true : false}
										onChange={(e) => {
											var options = {
												...postExcerpt.options,
												isLink: postExcerpt.options.isLink ? false : true,
											};
											setAttributes({
												postExcerpt: { ...postExcerpt, options: options },
											});
										}}
									/>

									{!postExcerpt.options.isLink && (
										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Custom Tag
											</label>
											<SelectControl
												label=""
												value={postExcerpt.options.tag}
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
													var options = { ...postExcerpt.options, tag: newVal };
													setAttributes({
														postExcerpt: { ...postExcerpt, options: options },
													});
												}}
											/>
										</PanelRow>
									)}

									{postExcerpt.options.isLink && (
										<div>
											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Link Target
												</label>

												<SelectControl
													label=""
													value={postExcerpt.options.linkTarget}
													options={[
														{ label: "_self", value: "_self" },
														{ label: "_blank", value: "_blank" },
														{ label: "_parent", value: "_parent" },
														{ label: "_top", value: "_top" },
													]}
													onChange={(newVal) => {
														var options = {
															...postExcerpt.options,
															linkTarget: newVal,
														};
														setAttributes({
															postExcerpt: { ...postExcerpt, options: options },
														});
													}}
												/>
											</PanelRow>

											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Custom Url
												</label>

												<div className="relative">
													<Button
														className={linkPickerExcerpt ? "!bg-gray-400" : ""}
														icon={link}
														onClick={(ev) => {
															setLinkPickerExcerpt((prev) => !prev);
														}}></Button>
													{postExcerpt.options.customUrl.length > 0 && (
														<Button
															className="!text-red-500 ml-2"
															icon={linkOff}
															onClick={(ev) => {
																var options = {
																	...postExcerpt.options,
																	customUrl: "",
																};
																setAttributes({
																	postExcerpt: {
																		...postExcerpt,
																		options: options,
																	},
																});
															}}></Button>
													)}
													{linkPickerExcerpt && (
														<Popover position="bottom right">
															<LinkControl
																settings={[]}
																value={postExcerpt.options.customUrl}
																onChange={(newVal) => {
																	var options = {
																		...postExcerpt.options,
																		customUrl: newVal.url,
																	};

																	setAttributes({
																		postExcerpt: {
																			...postExcerpt,
																			options: options,
																		},
																	});
																	//setLinkPickerpostExcerpt(false)
																}}
															/>

															<div className="p-2">
																<span className="font-bold">Linked to:</span>{" "}
																{postExcerpt.options.customUrl.length != 0
																	? postExcerpt.options.customUrl
																	: "No link"}{" "}
															</div>
														</Popover>
													)}
												</div>
											</PanelRow>

											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Custom Attributes
												</label>
												<div
													// className=" cursor-pointer px-3 text-white py-1 bg-blue-600"
													className="flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-800 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
													onClick={(ev) => {
														var sdsd =
															postExcerpt.options.linkAttr != undefined
																? postExcerpt.options.linkAttr.concat({
																		id: "",
																		val: "",
																  })
																: [];

														var options = {
															...postExcerpt.options,
															linkAttr: sdsd,
														};
														setAttributes({
															postExcerpt: { ...postExcerpt, options: options },
														});
													}}>
													Add
												</div>
											</PanelRow>

											{postExcerpt.options.linkAttr != undefined &&
												postExcerpt.options.linkAttr.map((x, i) => {
													return (
														<div className="my-2">
															<PanelRow>
																<InputControl
																	placeholder="Name"
																	className="mr-2"
																	value={postExcerpt.options.linkAttr[i].id}
																	onChange={(newVal) => {
																		postExcerpt.options.linkAttr[i].id = newVal;

																		var ssdsd =
																			postExcerpt.options.linkAttr.concat([]);

																		var options = {
																			...postExcerpt.options,
																			linkAttr: ssdsd,
																		};
																		setAttributes({
																			postExcerpt: {
																				...postExcerpt,
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
																		postExcerpt.options.linkAttr[i].val =
																			newVal;
																		var ssdsd =
																			postExcerpt.options.linkAttr.concat([]);

																		var options = {
																			...postExcerpt.options,
																			linkAttr: ssdsd,
																		};
																		setAttributes({
																			postExcerpt: {
																				...postExcerpt,
																				options: options,
																			},
																		});
																	}}
																/>
																<span
																	className="text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close"
																	onClick={(ev) => {
																		postExcerpt.options.linkAttr.splice(i, 1);

																		var ssdsd =
																			postExcerpt.options.linkAttr.concat([]);

																		var options = {
																			...postExcerpt.options,
																			linkAttr: ssdsd,
																		};
																		setAttributes({
																			postExcerpt: {
																				...postExcerpt,
																				options: options,
																			},
																		});
																	}}></span>
															</PanelRow>
														</div>
													);
												})}
										</div>
									)}

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Limit By
										</label>

										<PGDropdown
											position="bottom right"
											btnClass="flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-800 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
											// variant="secondary"
											options={limitByArgs}
											// buttonTitle="Choose"
											buttonTitle={
												postExcerpt.options.limitBy == undefined
													? "Choose"
													: limitByArgs[postExcerpt.options.limitBy] ==
													  undefined
													? "Choose"
													: limitByArgs[postExcerpt.options.limitBy].label
											}
											onChange={setLimitBy}
											values={[]}></PGDropdown>
									</PanelRow>

									{/* {postExcerpt.options.limitBy.length > 0 && (
									<div className="bg-gray-500 my-3 text-white p-2">
										{limitByArgs[postExcerpt.options.limitBy].label}
									</div>
								)} */}

									{(postExcerpt.options.limitBy == "word" ||
										postExcerpt.options.limitBy == "character") && (
										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Limit Count
											</label>

											<InputControl
												value={postExcerpt.options.limitCount}
												onChange={(newVal) => {
													var options = {
														...postExcerpt.options,
														limitCount: newVal,
													};
													setAttributes({
														postExcerpt: { ...postExcerpt, options: options },
													});
												}}
											/>
										</PanelRow>
									)}

									<PanelRow className="my-3">
										<label>Excerpt Source</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={
												postExcerpt.options.excerptSource.length == 0
													? "Choose"
													: postExcerpt.options.excerptSource
											}
											options={excerptSourceArgs}
											onChange={(option, index) => {
												var options = {
													...postExcerpt.options,
													excerptSource: option.value,
												};
												setAttributes({
													postExcerpt: { ...postExcerpt, options: options },
												});
											}}
											values=""></PGDropdown>
									</PanelRow>

									{postExcerpt.options.excerptSource == "excerpt" &&
										currentPostExcerpt.length == 0 && (
											<div className="text-red-500">Post Excerpt is empty.</div>
										)}

									{/* {postExcerpt.options.excerptSource == 'content' && currentPostContent.length == 0 && (
                    <div className='text-red-500'>Post Content is empty.</div>
                  )} */}

									{postExcerpt.options.excerptSource == "meta" && (
										<div>
											<PanelRow className="my-4">
												<label for="" className="font-medium text-slate-900 ">
													Meta Field
												</label>
												<SelectControl
													label=""
													value={postExcerpt.options.excerptSourceMeta}
													options={[
														{ label: "Custom", value: "" },
														{
															label: "Yoast meta",
															value: "_yoast_wpseo_metadesc",
														},
														{
															label: "Rank Math meta",
															value: "rank_math_description",
														},
														{
															label: "AIO SEO meta",
															value: "_aioseo_og_description",
														},
														{
															label: "SEOPress meta",
															value: "_seopress_titles_desc",
														},
														{
															label: "WP Meta SEO meta",
															value: "_metaseo_metadesc",
														},
														{
															label: "The SEO Framework meta",
															value: "_genesis_description",
														},
														{
															label: "SEO SIMPLE PACK meta",
															value: "ssp_meta_description",
														},
													]}
													onChange={(newVal) => {
														var options = {
															...postExcerpt.options,
															excerptSourceMeta: newVal,
														};
														setAttributes({
															postExcerpt: { ...postExcerpt, options: options },
														});
													}}
												/>
											</PanelRow>
											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Custom Meta Key
												</label>
												<InputControl
													value={postExcerpt.options.excerptSourceMeta}
													onChange={(newVal) => {
														var options = {
															...postExcerpt.options,
															excerptSourceMeta: newVal,
														};
														setAttributes({
															postExcerpt: { ...postExcerpt, options: options },
														});
													}}
												/>
											</PanelRow>
										</div>
									)}

									<ToggleControl
										className="my-4"
										label="Remove Blocks?"
										help={
											postExcerpt.options.removeBlocks
												? "Blocks will be removed"
												: "Blocks may output with excerpt."
										}
										checked={postExcerpt.options.removeBlocks ? true : false}
										onChange={(e) => {
											var options = {
												...postExcerpt.options,
												removeBlocks: postExcerpt.options.removeBlocks
													? false
													: true,
											};
											setAttributes({
												postExcerpt: { ...postExcerpt, options: options },
											});
										}}
									/>

									<ToggleControl
										className="my-4"
										label="Remove Shortcodes?"
										help={
											postExcerpt.options.removeShortcodes
												? "Shortcodes will be removed"
												: "Shortcodes may output with excerpt."
										}
										checked={
											postExcerpt.options.removeShortcodes ? true : false
										}
										onChange={(e) => {
											var options = {
												...postExcerpt.options,
												removeShortcodes: postExcerpt.options.removeShortcodes
													? false
													: true,
											};
											setAttributes({
												postExcerpt: { ...postExcerpt, options: options },
											});
										}}
									/>

									<ToggleControl
										className="my-4"
										label="Keep HTML?"
										help={
											postExcerpt.options.keepHtml
												? "HTML may output with excerpt."
												: "HTML will be removed"
										}
										checked={postExcerpt.options.keepHtml ? true : false}
										onChange={(e) => {
											var options = {
												...postExcerpt.options,
												keepHtml: postExcerpt.options.keepHtml ? false : true,
											};
											setAttributes({
												postExcerpt: { ...postExcerpt, options: options },
											});
										}}
									/>

									{postExcerpt.options.keepHtml && (
										<span className="bg-amber-400 mx-2 rounded-sm px-3  text-white hover:text-white">
											<a
												target="_blank"
												href={
													"https://pickplugins.com/post-grid/?utm_source=search&utm_term=blockaccordion&utm_campaign=pluginPostGrid&utm_medium=search"
												}>
												<span className="underline">Keep HTML</span> Only
												available in Premium
											</a>
										</span>
									)}

									<ToggleControl
										className="my-4"
										label="Enable wpautop()?"
										help={
											postExcerpt.options.autoP
												? "wpautop function will be applied"
												: "wpautop function will not be applied."
										}
										checked={postExcerpt.options.autoP ? true : false}
										onChange={(e) => {
											var options = {
												...postExcerpt.options,
												autoP: postExcerpt.options.autoP ? false : true,
											};
											setAttributes({
												postExcerpt: { ...postExcerpt, options: options },
											});
										}}
									/>

									{/* <ToggleControl className='my-4'
                    label="Remove Embeds?"
                    help={postExcerpt.options.removeEmbeds ? 'Embeded will be removed' : 'Embeded may output with excerpt.'}
                    checked={postExcerpt.options.removeEmbeds ? true : false}
                    onChange={(e) => {
                      var options = { ...postExcerpt.options, removeEmbeds: postExcerpt.options.removeEmbeds ? false : true, };
                      setAttributes({ postExcerpt: { ...postExcerpt, options: options } });
                    }}
                  /> */}

									<PGcssClassPicker
										tags={customTags}
										label="CSS Class"
										placeholder="Add Class"
										value={postExcerpt.options.class}
										onChange={(newVal) => {
											var options = { ...postExcerpt.options, class: newVal };
											setAttributes({
												postExcerpt: {
													styles: postExcerpt.styles,
													options: options,
												},
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={postExcerpt}
										onChange={onChangeStylePostExcerpt}
										onAdd={onAddStylePostExcerpt}
										onRemove={onRemoveStylePostExcerpt}
										onBulkAdd={onBulkAddPostExcerpt}
										onReset={onResetPostExcerpt}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={postExcerpt}
										onChange={onPickCssLibraryPostExcerpt}
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
									<ToggleControl
										label="Enable Read more?"
										help={
											readMore.options.enable
												? "Read more enabled"
												: "Read more disabled."
										}
										checked={readMore.options.enable ? true : false}
										onChange={(e) => {
											var options = {
												...readMore.options,
												enable: readMore.options.enable ? false : true,
											};
											setAttributes({
												readMore: { ...readMore, options: options },
											});
										}}
									/>

									<PanelRow>
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

									<div className="my-4">
										<ToggleControl
											label="Linked with post?"
											help={
												readMore.options.isLink
													? "Linked with post URL"
													: "Not linked to post URL."
											}
											checked={readMore.options.isLink ? true : false}
											onChange={(e) => {
												var options = {
													...readMore.options,
													isLink: readMore.options.isLink ? false : true,
												};
												setAttributes({
													readMore: { ...readMore, options: options },
												});
											}}
										/>
									</div>

									{readMore.options.isLink && (
										<div>
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
													Custom Url
												</label>

												<div className="relative">
													<Button
														className={linkPickerReadmore ? "!bg-gray-400" : ""}
														icon={link}
														onClick={(ev) => {
															setLinkPickerReadmore((prev) => !prev);
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
															}}></Button>
													)}
													{linkPickerReadmore && (
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
																		readMore: { ...readMore, options: options },
																	});
																	//setLinkPickerReadmore(false)
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
																	className="text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close"
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
																	}}></span>
															</PanelRow>
														</div>
													);
												})}
										</div>
									)}

									<PGcssClassPicker
										tags={customTags}
										label="CSS Class"
										placeholder="Add Class"
										value={readMore.options.class}
										onChange={(newVal) => {
											var options = { ...readMore.options, class: newVal };
											setAttributes({
												readMore: { styles: readMore.styles, options: options },
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={readMore}
										onChange={onChangeStyleReadmore}
										onAdd={onAddStyleReadmore}
										onRemove={onRemoveStyleReadmore}
										onBulkAdd={onBulkAddReadmore}
										onReset={onResetReadMore}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={readMore}
										onChange={onPickCssLibraryReadmore}
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
										placeholder="Add Class"
										value={prefix.options.text}
										onChange={(newVal) => {
											var options = { ...prefix.options, text: newVal };
											setAttributes({
												prefix: { styles: prefix.styles, options: options },
											});
										}}
									/>
									{/* <PanelRow>
									<label for=""  className="font-medium text-slate-900 " >Prefix</label>

									<InputControl
										value={prefix.options.text}
										onChange={(newVal) => {
											var options = { ...prefix.options, text: newVal };
											setAttributes({
												prefix: { styles: prefix.styles, options: options },
											});
										}}
									/>
								</PanelRow> */}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={prefix}
										onChange={onChangeStylePrefix}
										onAdd={onAddStylePrefix}
										onRemove={onRemoveStylePrefix}
										onBulkAdd={onBulkAddPrefix}
										onReset={onResetPrefix}
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
										placeholder="Add Class"
										value={postfix.options.text}
										onChange={(newVal) => {
											var options = { ...postfix.options, text: newVal };
											setAttributes({
												postfix: { styles: postfix.styles, options: options },
											});
										}}
									/>
									{/* <PanelRow>
									<label for=""  className="font-medium text-slate-900 " >Postfix</label>
									<InputControl
										value={postfix.options.text}
										onChange={(newVal) => {
											var options = { ...postfix.options, text: newVal };
											setAttributes({
												postfix: { ...postfix, options: options },
											});
										}}
									/>
								</PanelRow> */}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={postfix}
										onChange={onChangeStylePostfix}
										onAdd={onAddStylePostfix}
										onRemove={onRemoveStylePostfix}
										onBulkAdd={onBulkAddPostfix}
										onReset={onResetPostfix}
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
						<PanelBody
							className="font-medium text-slate-900 "
							title="Block Variations"
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={"post-excerpt"}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
							/>
						</PanelBody>

						<div className="px-2">
							<PGMailSubsctibe />
							<PGContactSupport
								utm={{
									utm_source: "BlockPostExcerpt",
									utm_campaign: "PostGridCombo",
									utm_content: "BlockOptions",
								}}
							/>
						</div>
					</div>
				</InspectorControls>

				<>
					{isLoading && <Spinner></Spinner>}

					{wrapper.options.tag && (
						<CustomTagX {...blockProps}>
							{postExcerpt.options.isLink && (
								<a
									className={postExcerpt.options.class}
									onClick={handleLinkClick}
									{...linkAttrItems}
									href={postUrl}>
									{prefix.options.text && (
										<span className={prefix.options.class}>
											{prefix.options.text}
										</span>
									)}
									{postExcerpt.options.keepHtml && (
										<RawHTML>{postExcerptEdited}</RawHTML>
									)}

									{!postExcerpt.options.keepHtml && <>{postExcerptEdited}</>}

									{postfix.options.text && (
										<span className={postfix.options.class}>
											{postfix.options.text}
										</span>
									)}
								</a>
							)}
							{!postExcerpt.options.isLink && (
								<>
									{postExcerpt.options.tag.length > 0 && (
										<CustomTagExcerpt className={postExcerpt.options.class}>
											{prefix.options.text && (
												<span className={prefix.options.class}>
													{prefix.options.text}
												</span>
											)}

											{postExcerpt.options.keepHtml && (
												<RawHTML>{postExcerptEdited}</RawHTML>
											)}

											{!postExcerpt.options.keepHtml && (
												<>{postExcerptEdited}</>
											)}

											{postfix.options.text && (
												<span className={postfix.options.class}>
													{postfix.options.text}
												</span>
											)}
										</CustomTagExcerpt>
									)}

									{postExcerpt.options.tag.length == 0 && (
										<>
											{prefix.options.text && (
												<span className={prefix.options.class}>
													{prefix.options.text}
												</span>
											)}

											{postExcerpt.options.keepHtml && (
												<RawHTML>{postExcerptEdited}</RawHTML>
											)}

											{!postExcerpt.options.keepHtml && (
												<>{postExcerptEdited}</>
											)}

											{postfix.options.text && (
												<span className={postfix.options.class}>
													{postfix.options.text}
												</span>
											)}
										</>
									)}
								</>
							)}

							{readMore.options.enable && (
								<>
									{readMore.options.isLink && (
										<a
											className={readMore.options.class}
											onClick={handleLinkClick}
											{...linkAttrItemsReadmore}
											target={readMore.options.linkTarget}
											href={postUrl}>
											{" "}
											{readMore.options.text}
										</a>
									)}

									{!readMore.options.isLink && (
										<span className="readmore"> {readMore.options.text}</span>
									)}
								</>
							)}
						</CustomTagX>
					)}

					{wrapper.options.tag.length == 0 && (
						<>
							{postExcerpt.options.isLink && (
								<>
									<a
										{...blockProps}
										onClick={handleLinkClick}
										{...linkAttrItems}
										href={postUrl}
										target={postExcerpt.options.linkTarget}>
										{prefix.options.text && (
											<span className="prefix">{prefix.options.text}</span>
										)}

										{postExcerpt.options.keepHtml && (
											<RawHTML>{postExcerptEdited}</RawHTML>
										)}

										{!postExcerpt.options.keepHtml && <>{postExcerptEdited}</>}

										{postfix.options.text && (
											<span className="postfix">{postfix.options.text}</span>
										)}
									</a>
									{readMore.options.isLink && (
										<a
											className="readmore"
											onClick={handleLinkClick}
											{...linkAttrItemsReadmore}
											target={readMore.options.linkTarget}
											href={postUrl}>
											{" "}
											{readMore.options.text}
										</a>
									)}
								</>
							)}
						</>
					)}

					{wrapper.options.tag.length == 0 && !postExcerpt.options.isLink && (
						<div {...blockProps}>
							{prefix.options.text && (
								<span className="prefix">{prefix.options.text}</span>
							)}

							{postExcerpt.options.keepHtml && (
								<RawHTML>{postExcerptEdited}</RawHTML>
							)}

							{!postExcerpt.options.keepHtml && <>{postExcerptEdited}</>}

							{postfix.options.text && (
								<span className="postfix">{postfix.options.text}</span>
							)}

							{readMore.options.isLink && (
								<a
									className="readmore"
									onClick={handleLinkClick}
									{...linkAttrItemsReadmore}
									target={postExcerpt.options.linkTarget}
									href={postUrl}>
									{" "}
									{readMore.options.text}
								</a>
							)}
						</div>
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
