import apiFetch from "@wordpress/api-fetch";
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { useEntityProp } from "@wordpress/core-data";
import { applyFilters } from "@wordpress/hooks";

import { registerBlockType, createBlock } from "@wordpress/blocks";
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
import {
	Icon,
	styles,
	settings,
	brush,
	mediaAndText,
	link,
	linkOff,
} from "@wordpress/icons";

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

import PGDropdown from "../../components/dropdown";

import PGStyles from "../../components/styles";
import PGIconPicker from "../../components/icon-picker";
import PGLibraryBlockVariations from "../../components/library-block-variations";

import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";
import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
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
				<path d="M160 26H0V35.4118H160V26Z" fill="url(#paint0_linear_61_317)" />
				<path
					d="M120 44.8237H0V54.2355H120V44.8237Z"
					fill="url(#paint1_linear_61_317)"
				/>
				<path d="M160 93H77V102H160V93Z" fill="url(#paint2_linear_61_317)" />
				<path d="M127.907 112H77V121H127.907V112Z" fill="#C15940" />
				<path d="M160 112H132V121H160V112Z" fill="#C15940" />
				<path
					d="M18.0325 112.536H20.2042C20.7307 112.536 21.2086 112.744 21.5599 113.083C22.4373 113.787 23.353 114.349 24.2944 114.729C25.1647 115.081 26.065 115.274 26.9853 115.274C27.9055 115.274 28.8058 115.081 29.6761 114.729C30.6603 114.332 31.6163 113.736 32.5299 112.986L33.7663 114.49L32.5271 112.979C32.8908 112.681 33.33 112.536 33.7663 112.536H33.7709H35.9381C40.899 112.536 45.4077 114.564 48.675 117.832C51.9424 121.099 53.9704 125.608 53.9704 130.569V140.216C53.9704 141.295 53.0956 142.17 52.0166 142.17H1.95379C0.874785 142.17 0 141.295 0 140.216V130.569C0 125.608 2.02811 121.099 5.29552 117.832C8.56284 114.564 13.0716 112.536 18.0325 112.536ZM19.5397 116.444H18.0325C14.1502 116.444 10.6194 118.033 8.05834 120.594C5.49725 123.155 3.90759 126.686 3.90759 130.569V138.262H50.0629V130.569C50.0629 126.686 48.4732 123.155 45.9122 120.594C43.3512 118.033 39.8203 116.444 35.938 116.444H34.4308C33.3801 117.237 32.2755 117.883 31.1262 118.347C29.7921 118.885 28.407 119.181 26.9852 119.181C25.5634 119.181 24.1783 118.885 22.8442 118.347C21.6949 117.883 20.5902 117.237 19.5397 116.444Z"
					fill="url(#paint3_linear_61_317)"
				/>
				<path
					d="M26.9866 71C32.2264 71 36.9938 72.2788 40.3886 74.9934C43.5569 77.527 45.4914 81.2236 45.4914 86.1887C45.4914 91.5205 43.1555 98.6459 39.4592 104.008C36.214 108.717 31.8729 112.155 26.9867 112.155C22.1005 112.155 17.7593 108.717 14.5142 104.008C10.8178 98.6459 8.48193 91.5206 8.48193 86.1887C8.48193 81.2236 10.4165 77.527 13.5848 74.9934C16.9796 72.2788 21.7469 71 26.9866 71ZM37.9615 78.0311C35.3063 75.9078 31.3919 74.9076 26.9866 74.9076C22.5814 74.9076 18.667 75.9078 16.0118 78.0311C13.7628 79.8295 12.3895 82.5172 12.3895 86.1887C12.3895 90.818 14.4536 97.0567 17.7196 101.795C20.2899 105.524 23.5525 108.247 26.9867 108.247C30.4209 108.247 33.6835 105.524 36.2538 101.795C39.5198 97.0567 41.5839 90.818 41.5839 86.1887C41.5839 82.5172 40.2106 79.8295 37.9616 78.0311H37.9615Z"
					fill="url(#paint4_linear_61_317)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_317"
						x1="0"
						y1="30.7059"
						x2="160"
						y2="30.7059"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_317"
						x1="0"
						y1="49.5296"
						x2="120"
						y2="49.5296"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_317"
						x1="77"
						y1="97.5"
						x2="160"
						y2="97.5"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_317"
						x1="0"
						y1="127.353"
						x2="53.9704"
						y2="127.353"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_317"
						x1="8.48193"
						y1="91.5773"
						x2="45.4914"
						y2="91.5773"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
				</defs>
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

		var metaKey = attributes.metaKey;
		var field = attributes.field;
		var icon = attributes.icon;

		var postId = context["postId"];
		var postType = context["postType"];

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

		const [prefixText, setprefixText] = useState(
			myStore.parseCustomTags(prefix.options.text, customTags)
		);
		const [postfixText, setpostfixText] = useState(
			myStore.parseCustomTags(postfix.options.text, customTags)
		);

		useEffect(() => {
			var text = myStore.parseCustomTags(prefix.options.text, customTags);
			setprefixText(text);
		}, [prefix.options.text]);

		useEffect(() => {
			var text = myStore.parseCustomTags(postfix.options.text, customTags);
			setpostfixText(text);
		}, [postfix.options.text]);

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();

			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[fieldSelector] = field;
			blockCssObj[frontTextSelector] = frontText;
			blockCssObj[iconSelector] = icon;
			blockCssObj[prefixSelector] = prefix;
			blockCssObj[postfixSelector] = postfix;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		// var breakPointList = [];

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

			var iconHtml = `<span className="${iconSrc}"></span>`;

			setIconHtml(iconHtml);
		}, [icon]);

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
				var fieldX = attributes.field;
				var iconX = attributes.icon;
				var metaKeyX = attributes.metaKey;
				var frontTextX = attributes.frontText;
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

				if (frontTextX != undefined) {
					var frontTextY = { ...frontTextX, options: frontText.options };
					setAttributes({ frontText: frontTextY });
					blockCssObj[frontTextSelector] = frontTextY;
				}

				if (metaKeyX != undefined) {
					var metaKeyY = { ...metaKeyX, options: metaKey.options };
					setAttributes({ metaKey: metaKeyY });
					blockCssObj[metaKeySelector] = metaKeyY;
				}

				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[iconSelector] = iconY;
				}

				if (fieldX != undefined) {
					var fieldY = { ...fieldX, options: field.options };
					setAttributes({ field: fieldY });
					blockCssObj[fieldSelector] = fieldY;
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
		function onResetField(sudoScources) {
			let obj = Object.assign({}, field);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						fieldSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ field: obj });
		}
		function onResetFrontText(sudoScources) {
			let obj = Object.assign({}, frontText);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						frontTextSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ frontText: obj });
		}
		function onResetIcon(sudoScources) {
			let obj = Object.assign({}, icon);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						iconSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ icon: obj });
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

		useEffect(() => {
			linkAttrObj();
			myStore.generateBlockCss(blockCssY.items, blockId);
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
			className: ` ${blockId} ${wrapper.options.class}`,
		});

		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div className="px-3 ">
							<PanelRow>
								<label for="" className="font-medium text-slate-900 ">
									Select User Field
								</label>
								<PGDropdown
									position="bottom right"
									variant="secondary"
									options={userFields}
									buttonTitle="Choose"
									onChange={setUserField}
									values={metaKey}></PGDropdown>
							</PanelRow>
							<PanelRow>
								<label for="" className="font-medium text-slate-900 ">
									Custom Field
								</label>
								<InputControl
									value={metaKey}
									onChange={(newVal) => {
										setAttributes({ metaKey: newVal });
									}}
								/>
							</PanelRow>
						</div>

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
										onBulkAdd={onBulkAddWrapper}
										onRemove={onRemoveStyleWrapper}
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
							title="Field Settings"
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
										name: "style",
										title: "Style",
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
									<>
										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Link To
											</label>

											<PGDropdown
												position="bottom right"
												btnClass="flex w-full gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-800 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
												// variant="secondary"
												options={linkToArgs}
												// buttonTitle="Choose"
												buttonTitle={
													linkToArgs[field.options.linkTo] != undefined
														? linkToArgs[field.options.linkTo].label
														: "Choose"
												}
												onChange={setFieldLinkTo}
												values={metaKey}></PGDropdown>
										</PanelRow>
										{field.options.linkTo.length > 0 && (
											<>
												{field.options.linkTo == "authorMeta" && (
													<PanelRow>
														<label
															for=""
															className="font-medium text-slate-900 ">
															Author Meta Key
														</label>

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
														<label
															for=""
															className="font-medium text-slate-900 ">
															Custom Meta Key
														</label>

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
															<label
																for=""
																className="font-medium text-slate-900 ">
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
													<label for="" className="font-medium text-slate-900 ">
														Link Target
													</label>

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
												<label for="" className="font-medium text-slate-900 ">
													Custom URL
												</label>
												<InputControl
													value={field.options.customUrl}
													onChange={(newVal) => {
														var options = {
															...field.options,
															customUrl: newVal,
														};
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
													<label for="" className="font-medium text-slate-900 ">
														Link Attributes
													</label>
													<div
														// className=" cursor-pointer px-3 text-white py-1 bg-blue-600"
														className="flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-800 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
														onClick={(ev) => {
															var sdsd = field.options.linkAttr.concat({
																id: "",
																val: "",
															});
															var options = {
																...field.options,
																linkAttr: sdsd,
															};
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
										onReset={onResetField}
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
													label: "Before Front text",
													value: "beforeFronttext",
												},
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
										onReset={onResetIcon}
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
							title="Front Text"
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
											Front Text
										</label>

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
										onReset={onResetFrontText}
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
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={prefix}
										onChange={onChangeStylePrefix}
										onAdd={onAddStylePrefix}
										onBulkAdd={onBulkAddPrefix}
										onRemove={onRemoveStylePrefix}
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
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={postfix}
										onChange={onChangeStylePostfix}
										onAdd={onAddStylePostfix}
										onBulkAdd={onBulkAddPostfix}
										onRemove={onRemoveStylePostfix}
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
								blockName={"post-author-fields"}
								blockId={blockId}
								clientId={clientId}
								// obj={postTitle}
								onChange={onPickBlockPatterns}
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
						<div className="px-3">
							<PGTutorials slug="post-author-fields" />
						</div>
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
									<label for="" className="font-medium text-slate-900 ">
										Select User Field
									</label>
									<PGDropdown
										position="bottom right"
										variant="secondary"
										options={userFields}
										buttonTitle="Choose"
										onChange={setUserField}
										values={metaKey}></PGDropdown>
								</PanelRow>
								<PanelRow>
									<label for="" className="font-medium text-slate-900 ">
										Custom Field
									</label>
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
											<span className="prefix">{prefixText}</span>
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
											<span className="postfix">{postfixText}</span>
										)}
									</>
								)}

								{field.options.linkTo.length > 0 && (
									<a href="#" target={field.options.linkTarget}>
										{prefix.options.text.length > 0 && (
											<span className="prefix">{prefixText}</span>
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
											<span className="postfix">{postfixText}</span>
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
