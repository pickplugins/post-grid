import apiFetch from "@wordpress/api-fetch";
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { useEntityProp } from "@wordpress/core-data";
import { applyFilters } from "@wordpress/hooks";

import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import {
	useSelect,
	select,
	subscribe,
	useDispatch,
	dispatch,
} from "@wordpress/data";
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
	Spinner,
	Popover,
	TabPanel,
} from "@wordpress/components";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { link, linkOff } from "@wordpress/icons";
import { Icon, styles, settings } from "@wordpress/icons";

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

import IconToggle from "../../components/icon-toggle";
import BreakpointToggle from "../../components/breakpoint-toggle";
import colorsPresets from "../../colors-presets";
import Typography from "../../components/typography";
import PGDropdown from "../../components/dropdown";
import PGcssDisplay from "../../components/css-display";
import PGStyles from "../../components/styles";
import PGIconPicker from "../../components/icon-picker";
import PGBlockPatterns from "../../components/block-patterns";

import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";
import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGCssLibrary from "../../components/css-library";
import metadata from "./block.json";

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
				<path
					fill="#1d4ed8"
					d="M3.25,10.49H4.64a3.25,3.25,0,0,1,3.25,3.25V15a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V13.74A3.25,3.25,0,0,1,3.25,10.49Z"
				/>
				<circle fill="#1d4ed8" cx="3.94" cy="7.81" r="2.18" />
				<rect fill="#8db1ff" y="28.38" width="13.97" height="2" />
				<rect fill="#8db1ff" x="16.42" y="28.38" width="9.96" height="2" />
				<rect fill="#8db1ff" y="23.68" width="36" height="2" />
				<rect fill="#8db1ff" y="18.98" width="36" height="2" />
				<rect fill="#1d4ed8" x="15.48" y="12.07" width="10.87" height="2" />
				<rect fill="#1d4ed8" x="28.26" y="12.07" width="7.74" height="2" />
				<rect fill="#8db1ff" x="15.48" y="6.54" width="20.52" height="2.35" />
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

		var wrapper = attributes.wrapper;
		var frontText = attributes.frontText;
		var prefix = attributes.prefix;
		var postfix = attributes.postfix;
		var blockCssY = attributes.blockCssY;
		var customCss = attributes.customCss;
		var metaKey = attributes.metaKey;
		var field = attributes.field;
		var icon = attributes.icon;

		var postId = context["postId"];
		var postType = context["postType"];

		//const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
		var breakPointX = myStore.getBreakPoint();

		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);

		var userFields = [
			{ label: "ID", key: "id" },
			// { label: "login", key: 'login' },
			// { label: "Nick name", key: 'nickname' },
			// { label: "Email", key: 'email' },
			{ label: "URL", key: "url" },
			{ label: "Registered", key: "registered" },
			{ label: "Display name", key: "display_name" },
			{ label: "First name", key: "first_name" },
			{ label: "Last name", key: "last_name" },
			{ label: "Description", key: "description" },
			// { label: "Avatar URL", key: 'avatar_url' },
			{ label: "Avatar", key: "avatar" },

			// { label: "Profile Link", key: 'link' },
		];

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

		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		const fieldSelector = blockClass + " .fieldVal";
		const frontTextSelector = blockClass + " .frontText";
		const iconSelector = blockClass + " .icon";
		const prefixSelector = blockClass + " .prefix";
		const postfixSelector = blockClass + " .postfix";

		const CustomTagWrapper = `${wrapper.options.tag}`;

		// var breakPointList = [];

		// for (var x in breakPoints) {

		//   var item = breakPoints[x];
		//   breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

		// }

		const [postAuthorData, setpostAuthorData] = useState([]); // Using the hook.
		const [loading, setLoading] = useState(false); // Using the hook.

		const [postAuthorX, setpostAuthorX] = useEntityProp(
			"postType",
			postType,
			"author",
			postId
		);

		useEffect(() => {
			if (metaKey.length == 0) return;

			setpostAuthorData([]);
			setLoading(true);

			apiFetch({
				path: "/post-grid/v2/get_user_data",
				method: "POST",
				data: { id: postAuthorX, fields: [] },
			}).then((res) => {
				setpostAuthorData(res);

				setLoading(false);
			});
		}, [metaKey]);

		const [iconHtml, setIconHtml] = useState("");

		useEffect(() => {
			var iconSrc = icon.options.iconSrc;

			var iconHtml = `<span class="${iconSrc}"></span>`;

			setIconHtml(iconHtml);
		}, [icon]);

		function onPickBlockPatterns(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;

			var blocks = content.length > 0 ? parse(content) : "";
			console.log(content);
			console.log(blocks);
			const attributes = blocks[0].attrs;
			// attributes.blockId = Date.now();
			// console.log(Date.now());
			if (action == "insert") {
				wp.data
					.dispatch("core/block-editor")
					.insertBlocks(wp.blocks.parse(content));
			}
			if (action == "applyStyle") {
				// var options = attributes.options
				var wrapper = attributes.wrapper;
				var postTitle = attributes.postTitle;
				var prefix = attributes.prefix;
				var postfix = attributes.postfix;
				var blockCssY = attributes.blockCssY;

				setAttributes({ wrapper: wrapper });
				setAttributes({ postTitle: postTitle });
				setAttributes({ prefix: prefix });
				// setAttributes({ postfix: postfix });
				setAttributes({ blockCssY: blockCssY });
			}
			if (action == "replace") {
				if (confirm("Do you want to replace?")) {
					wp.data
						.dispatch("core/block-editor")
						.replaceBlock(clientId, wp.blocks.parse(content));
				}
			}
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

		function onPickCssLibraryFrontText(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				frontText[sudoScource] = sudoScourceArgs;
			});

			var frontTextX = Object.assign({}, frontText);
			setAttributes({ frontText: frontTextX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					frontTextSelector
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

		function onChangeStyleField(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, field);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ field: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				fieldSelector
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

		function onRemoveStyleField(sudoScource, key) {
			var object = myStore.deletePropertyDeep(field, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ field: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				fieldSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleField(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, field);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ field: object });
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

		function onChangeStyleFrontText(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, frontText);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ frontText: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				frontTextSelector
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

		function onRemoveStyleFrontText(sudoScource, key) {
			var object = myStore.deletePropertyDeep(frontText, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ frontText: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				frontTextSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleFrontText(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, frontText);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ frontText: object });
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

		function setFieldLinkTo(option, index) {
			var options = { ...field.options, linkTo: option.value };
			setAttributes({ field: { ...field, options: options } });
		}

		function setUserField(option, index) {
			setAttributes({ metaKey: option.key });
		}

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();

			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId, customCss);
		}, [clientId]);

		function onChangeIcon(arg) {
			var options = {
				...icon.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({ icon: { ...icon, options: options } });
		}

		function onBulkAddWrapper(sudoScource, cssObj) {
			// var path = [sudoScource, attr, breakPointX]
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

		function onBulkAddField(sudoScource, cssObj) {
			// var path = [sudoScource, attr, breakPointX]
			let obj = Object.assign({}, field);
			obj[sudoScource] = cssObj;

			setAttributes({ field: obj });

			var selector = myStore.getElementSelector(sudoScource, fieldSelector);
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
			// var path = [sudoScource, attr, breakPointX]
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

		function onBulkAddFrontText(sudoScource, cssObj) {
			// var path = [sudoScource, attr, breakPointX]
			let obj = Object.assign({}, frontText);
			obj[sudoScource] = cssObj;

			setAttributes({ frontText: obj });

			var selector = myStore.getElementSelector(sudoScource, frontTextSelector);
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
			// var path = [sudoScource, attr, breakPointX]
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
			// var path = [sudoScource, attr, breakPointX]s
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

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId, customCss);
		}, [blockCssY]);

		useEffect(() => {
			linkAttrObj();
			myStore.generateBlockCss(blockCssY.items, blockId, customCss);
		}, [field]);

		var linkAttrObj = () => {
			var sdsd = {};

			field.options.linkAttr.map((x) => {
				if (x.val) sdsd[x.id] = x.val;
			});

			setlinkAttrItems(sdsd);
		};

		const post = useSelect((select) =>
			select("core").getEntityRecord(
				"postType",
				context["postType"],
				context["postId"]
			)
		);

		const termstaxonomy = useSelect((select) =>
			select("core").getEntityRecords("taxonomy", "category", [4, 5])
		);

		const blockProps = useBlockProps({
			className: ` ${blockId} pg-author-fields`,
		});

		return (
			<>
				<InspectorControls>
					<div className="px-3">
						<PanelRow>
							<label for="">Select User Field</label>
							<PGDropdown
								position="bottom right"
								variant="secondary"
								options={userFields}
								buttonTitle="Choose"
								onChange={setUserField}
								values={metaKey}></PGDropdown>
						</PanelRow>
						<PanelRow>
							<label for="">Custom Field</label>
							<InputControl
								value={metaKey}
								onChange={(newVal) => {
									setAttributes({ metaKey: newVal });
								}}
							/>
						</PanelRow>
					</div>

					<PanelBody title="Wrapper" initialOpen={false}>
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
									icon: styles,
									className: "tab-style",
								},
								{
									name: "css",
									title: "CSS Library",
									icon: styles,
									className: "tab-css",
								},
							]}>
							<PGtab name="options">
								<PanelRow>
									<label for="">Wrapper Tag</label>

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
									onBulkAdd={onBulkAddWrapper}
									onRemove={onRemoveStyleWrapper}
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

					<PanelBody title="Field Settings" initialOpen={false}>
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
									name: "style",
									title: "Style",
									icon: styles,
									className: "tab-style",
								},
								{
									name: "css",
									title: "CSS Library",
									icon: styles,
									className: "tab-css",
								},
							]}>
							<PGtab name="options">
								<>
									{field.options.linkTo.length > 0 && (
										<>
											<PanelRow>
												<label for="">Link To</label>

												<PGDropdown
													position="bottom right"
													variant="secondary"
													options={linkToArgs}
													buttonTitle="Choose"
													onChange={setFieldLinkTo}
													values={metaKey}></PGDropdown>
											</PanelRow>

											<div className="bg-gray-500 p-2 my-3 text-white">
												{linkToArgs[field.options.linkTo] != undefined
													? linkToArgs[field.options.linkTo].label
													: ""}
											</div>

											{field.options.linkTo == "authorMeta" && (
												<PanelRow>
													<label for="">Author Meta Key</label>

													<InputControl
														value={field.options.linkToMeta}
														onChange={(newVal) => {
															var options = {
																...field.options,
																linkToMeta: newVal,
															};
															setAttributes({
																field: { ...field, options: options },
															});
														}}
													/>
												</PanelRow>
											)}

											{field.options.linkTo == "customField" && (
												<PanelRow>
													<label for="">Custom Meta Key</label>

													<InputControl
														value={field.options.linkToAuthorMeta}
														onChange={(newVal) => {
															var options = {
																...field.options,
																linkToAuthorMeta: newVal,
															};
															setAttributes({
																field: { ...field, options: options },
															});
														}}
													/>
												</PanelRow>
											)}

											{field.options.linkTo == "customUrl" && (
												<>
													<PanelRow>
														<label for="">Custom Url</label>

														<div className="relative">
															<Button
																className={
																	linkPickerPosttitle ? "!bg-gray-400" : ""
																}
																icon={link}
																onClick={(ev) => {
																	setLinkPickerPosttitle((prev) => !prev);
																}}></Button>
															{field.options.customUrl.length > 0 && (
																<Button
																	className="!text-red-500 ml-2"
																	icon={linkOff}
																	onClick={(ev) => {
																		var options = {
																			...field.options,
																			customUrl: "",
																		};
																		setAttributes({
																			field: { ...field, options: options },
																		});
																		setLinkPickerPosttitle(false);
																	}}></Button>
															)}
															{linkPickerPosttitle && (
																<Popover position="bottom right">
																	<LinkControl
																		settings={[]}
																		value={field.options.customUrl}
																		onChange={(newVal) => {
																			var options = {
																				...field.options,
																				customUrl: newVal.url,
																			};

																			setAttributes({
																				field: { ...field, options: options },
																			});
																		}}
																	/>

																	<div className="p-2">
																		<span className="font-bold">
																			Linked to:
																		</span>{" "}
																		{field.options.customUrl.length != 0
																			? field.options.customUrl
																			: "No link"}{" "}
																	</div>
																</Popover>
															)}
														</div>
													</PanelRow>
												</>
											)}

											<PanelRow>
												<label for="">Link Target</label>

												<SelectControl
													label=""
													value={field.options.linkTarget}
													options={[
														{ label: "_self", value: "_self" },
														{ label: "_blank", value: "_blank" },
														{ label: "_parent", value: "_parent" },
														{ label: "_top", value: "_top" },
													]}
													onChange={(newVal) => {
														var options = {
															...field.options,
															linkTarget: newVal,
														};
														setAttributes({
															field: { ...field, options: options },
														});
													}}
												/>
											</PanelRow>
										</>
									)}

									{field.options.linkTo == "custom" && (
										<PanelRow>
											<label for="">Custom URL</label>
											<InputControl
												value={field.options.customUrl}
												onChange={(newVal) => {
													var options = { ...field.options, customUrl: newVal };
													setAttributes({
														field: { ...field, options: options },
													});
												}}
											/>
										</PanelRow>
									)}

									{field.options.linkTo.length > 0 && (
										<>
											<PanelRow>
												<label for="">Link Attributes</label>
												<div
													className=" cursor-pointer px-3 text-white py-1 bg-blue-600"
													onClick={(ev) => {
														var sdsd = field.options.linkAttr.concat({
															id: "",
															val: "",
														});
														var options = { ...field.options, linkAttr: sdsd };
														setAttributes({
															field: { ...field, options: options },
														});
														linkAttrObj();
													}}>
													Add
												</div>
											</PanelRow>
											{field.options.linkAttr.length > 0 &&
												field.options.linkAttr.map((x, i) => {
													return (
														<div className="my-2">
															<PanelRow>
																<InputControl
																	className="mr-2"
																	value={field.options.linkAttr[i].id}
																	onChange={(newVal) => {
																		field.options.linkAttr[i].id = newVal;
																		var ssdsd = field.options.linkAttr.concat(
																			[]
																		);
																		var options = {
																			...field.options,
																			linkAttr: ssdsd,
																		};
																		setAttributes({
																			field: { ...field, options: options },
																		});
																	}}
																/>

																<InputControl
																	className="mr-2"
																	value={x.val}
																	onChange={(newVal) => {
																		field.options.linkAttr[i].val = newVal;
																		var ssdsd = field.options.linkAttr.concat(
																			[]
																		);
																		var options = {
																			...field.options,
																			linkAttr: ssdsd,
																		};
																		setAttributes({
																			field: { ...field, options: options },
																		});
																	}}
																/>
																<span
																	className="text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close"
																	onClick={(ev) => {
																		field.options.linkAttr.splice(i, 1);
																		var ssdsd = field.options.linkAttr.concat(
																			[]
																		);
																		var options = {
																			...field.options,
																			linkAttr: ssdsd,
																		};
																		setAttributes({
																			field: { ...field, options: options },
																		});
																	}}></span>
															</PanelRow>
														</div>
													);
												})}
										</>
									)}
								</>
							</PGtab>
							<PGtab name="style">
								<PGStyles
									obj={field}
									onChange={onChangeStyleField}
									onAdd={onAddStyleField}
									onBulkAdd={onBulkAddField}
									onRemove={onRemoveStyleField}
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

					<PanelBody title="Icon" initialOpen={false}>
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
									icon: styles,
									className: "tab-style",
								},
								{
									name: "css",
									title: "CSS Library",
									icon: styles,
									className: "tab-css",
								},
							]}>
							<PGtab name="options">
								<PanelRow>
									<label for="">Choose Icon</label>

									<PGIconPicker
										library={icon.options.library}
										srcType={icon.options.srcType}
										iconSrc={icon.options.iconSrc}
										onChange={onChangeIcon}
									/>
								</PanelRow>

								<PanelRow>
									<label for="">Icon position</label>

									<SelectControl
										label=""
										value={icon.options.position}
										options={[
											{ label: "Choose Position", value: "" },

											{ label: "Before Front text", value: "beforeFronttext" },
											{ label: "After Front text", value: "afterFronttext" },
											{ label: "Before Field", value: "beforeField" },
											{ label: "After Field", value: "afterField" },
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
									onBulkAdd={onBulkAddIcon}
									onRemove={onRemoveStyleIcon}
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

					<PanelBody title="Front Text" initialOpen={false}>
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
									icon: styles,
									className: "tab-style",
								},
								{
									name: "css",
									title: "CSS Library",
									icon: styles,
									className: "tab-css",
								},
							]}>
							<PGtab name="options">
								<PanelRow>
									<label for="">Front Text</label>

									<InputControl
										value={frontText.options.text}
										onChange={(newVal) => {
											var options = { ...frontText.options, text: newVal };
											setAttributes({
												frontText: { ...frontText, options: options },
											});
										}}
									/>
								</PanelRow>
							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={frontText}
									onChange={onChangeStyleFrontText}
									onAdd={onAddStyleFrontText}
									onBulkAdd={onBulkAddFrontText}
									onRemove={onRemoveStyleFrontText}
								/>
							</PGtab>
							<PGtab name="css">
								<PGCssLibrary
									blockId={blockId}
									obj={frontText}
									onChange={onPickCssLibraryFrontText}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>

					<PanelBody title="Prefix" initialOpen={false}>
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
									icon: styles,
									className: "tab-style",
								},
								{
									name: "css",
									title: "CSS Library",
									icon: styles,
									className: "tab-css",
								},
							]}>
							<PGtab name="options">
								<PanelRow>
									<label for="">Prefix</label>

									<InputControl
										value={prefix.options.text}
										onChange={(newVal) => {
											var options = { ...prefix.options, text: newVal };
											setAttributes({
												prefix: { styles: prefix.styles, options: options },
											});

											// setAttributes({ prefix: { text: newVal, class: prefix.options.class, color: prefix.color, backgroundColor: prefix.backgroundColor } })
										}}
									/>
								</PanelRow>
							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={prefix}
									onChange={onChangeStylePrefix}
									onAdd={onAddStylePrefix}
									onBulkAdd={onBulkAddPrefix}
									onRemove={onRemoveStylePrefix}
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

					<PanelBody title="Postfix" initialOpen={false}>
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
									icon: styles,
									className: "tab-style",
								},
								{
									name: "css",
									title: "CSS Library",
									icon: styles,
									className: "tab-css",
								},
							]}>
							<PGtab name="options">
								<PanelRow>
									<label for="">Postfix</label>

									<InputControl
										value={postfix.options.text}
										onChange={(newVal) => {
											var options = { ...postfix.options, text: newVal };
											setAttributes({
												postfix: { ...postfix, options: options },
											});

											// setAttributes({ postfix: { text: newVal, class: prefix.options.class, color: postfix.color, backgroundColor: postfix.backgroundColor } })
										}}
									/>
								</PanelRow>
							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={postfix}
									onChange={onChangeStylePostfix}
									onAdd={onAddStylePostfix}
									onBulkAdd={onBulkAddPostfix}
									onRemove={onRemoveStylePostfix}
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

					<PanelBody title="Block Variations" initialOpen={false}>
						<PGBlockPatterns
							blockName={"post-author-fields"}
							onChange={onPickBlockPatterns}
						/>
					</PanelBody>

					<PanelBody title="Custom Style" initialOpen={false}>
						<p>Please use following class selector to apply your custom CSS</p>
						<div className="my-3">
							<p className="font-bold">Wrapper</p>
							<p>
								<code>
									{wrapperSelector}
									{"{/* your CSS here*/}"}
								</code>
							</p>
						</div>

						<div className="my-3">
							<p className="font-bold">Field Selector</p>
							<p>
								<code>
									{fieldSelector}
									{"{}"}{" "}
								</code>
							</p>
							<p>
								<code>.pg-postAuthor a{"{/* your CSS here*/}"}</code>
							</p>
						</div>

						<div className="my-3">
							<p className="font-bold">Front Text</p>
							<p>
								<code>
									{frontTextSelector}
									{"{/* your CSS here*/}"}{" "}
								</code>
							</p>
						</div>

						<TextareaControl
							label="Custom CSS"
							help="Do not use 'style' tag"
							value={customCss}
							onChange={(value) => {
								setAttributes({ customCss: value });
							}}
						/>
					</PanelBody>

					<div className="px-2">
						<PGMailSubsctibe />
						<PGContactSupport
							utm={{
								utm_source: "BlockPostTitle",
								utm_campaign: "PostGridCombo",
								utm_content: "BlockOptions",
							}}
						/>
					</div>
				</InspectorControls>

				{loading && (
					<div {...blockProps}>
						<Spinner />
					</div>
				)}

				{!loading && (
					<>
						{metaKey.length == 0 && (
							<div {...blockProps}>
								<PanelRow>
									<label for="">Select User Field</label>
									<PGDropdown
										position="bottom right"
										variant="secondary"
										options={userFields}
										buttonTitle="Choose"
										onChange={setUserField}
										values={metaKey}></PGDropdown>
								</PanelRow>
								<PanelRow>
									<label for="">Custom Field</label>
									<InputControl
										value={metaKey}
										onChange={(newVal) => {
											setAttributes({ metaKey: newVal });
										}}
									/>
								</PanelRow>
							</div>
						)}

						{metaKey.length > 0 && (
							<CustomTagWrapper {...blockProps}>
								{icon.options.position == "beforeFronttext" && (
									<span
										className={icon.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
								)}

								{frontText.options.text.length > 0 && (
									<span className="frontText">{frontText.options.text}</span>
								)}

								{icon.options.position == "afterFronttext" && (
									<span
										className={icon.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
								)}

								{icon.options.position == "beforeField" && (
									<span
										className={icon.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
								)}

								{field.options.linkTo.length == 0 && (
									<>
										{prefix.options.text.length > 0 && (
											<span className="prefix">{prefix.options.text}</span>
										)}

										{metaKey == "avatar" && (
											<img
												className="fieldVal"
												src={postAuthorData["avatar_url"]}
												alt={postAuthorData["display_name"]}
											/>
										)}

										{metaKey != "avatar" && (
											<span className="fieldVal">
												{postAuthorData[metaKey]}
											</span>
										)}

										{postfix.options.text.length > 0 && (
											<span className="postfix">{postfix.options.text}</span>
										)}
									</>
								)}

								{field.options.linkTo.length > 0 && (
									<a href="#" target={field.options.linkTarget}>
										{prefix.options.text.length > 0 && (
											<span className="prefix">{prefix.options.text}</span>
										)}

										{metaKey == "avatar" && (
											<img
												className="fieldVal"
												src={postAuthorData["avatar_url"]}
												alt={postAuthorData["display_name"]}
											/>
										)}

										{metaKey != "avatar" && (
											<span className="fieldVal">
												{postAuthorData[metaKey]}
											</span>
										)}

										{postfix.options.text.length > 0 && (
											<span className="postfix">{postfix.options.text}</span>
										)}
									</a>
								)}

								{icon.options.position == "afterField" && (
									<span
										className={icon.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
								)}
							</CustomTagWrapper>
						)}
					</>
				)}
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
