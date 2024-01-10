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
	Placeholder,
} from "@wordpress/components";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import apiFetch from "@wordpress/api-fetch";
import { applyFilters } from "@wordpress/hooks";

import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	RichText,
	__experimentalLinkControl as LinkControl,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
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
	more,
	close,
	brush,
	mediaAndText,
} from "@wordpress/icons";

import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";

import PGStyles from "../../components/styles";
import PGIconPicker from "../../components/icon-picker";
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
			<svg
				width="162"
				height="160"
				viewBox="0 0 162 160"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path d="M161 27H1V45.8H161V27Z" fill="url(#paint0_linear_61_765)" />
				<path
					d="M18.6226 38.8999C18.4235 38.8999 18.3238 38.7998 18.2242 38.6998L14.9385 34.8999C14.7394 34.6999 14.7395 34.2998 15.0382 34.0998C15.2373 33.8998 15.6356 33.8998 15.8348 34.1998L18.722 37.5998L21.6095 34.1998C21.8087 33.9998 22.1072 33.8998 22.4059 34.0998C22.605 34.2998 22.7047 34.5999 22.5055 34.8999L19.2199 38.6998C18.9212 38.7998 18.8217 38.8999 18.6226 38.8999Z"
					fill="white"
				/>
				<path
					d="M105.443 33.8999H27.9819V38.7999H105.443V33.8999Z"
					fill="white"
				/>
				<path
					d="M161 71.3999H1V110.1H161V71.3999Z"
					fill="#C15940"
					stroke="#8E240B"
					stroke-width="2"
					stroke-dasharray="6 6"
				/>
				<path d="M161 49.2002H1V68.0002H161V49.2002Z" fill="#C15940" />
				<path
					d="M18.623 56.2002C18.8221 56.2002 18.9216 56.3003 19.0211 56.4003L22.3068 60.2002C22.5059 60.4002 22.5058 60.8002 22.2071 61.0002C22.008 61.2002 21.6097 61.2003 21.4106 60.9003L18.5233 57.5002L15.636 60.9003C15.4369 61.1003 15.1382 61.2002 14.8395 61.0002C14.5408 60.8002 14.5407 60.5002 14.7398 60.2002L18.0255 56.4003C18.3242 56.2003 18.4238 56.2002 18.623 56.2002Z"
					fill="white"
				/>
				<path
					d="M105.443 56.2002H27.9819V61.1002H105.443V56.2002Z"
					fill="white"
				/>
				<path
					d="M161 113.5H1V132.3H161V113.5Z"
					fill="url(#paint1_linear_61_765)"
				/>
				<path
					d="M18.6226 125.4C18.4235 125.4 18.3238 125.3 18.2242 125.2L14.9385 121.4C14.7394 121.2 14.7395 120.8 15.0382 120.6C15.2373 120.4 15.6356 120.4 15.8348 120.7L18.722 124.1L21.6095 120.7C21.8087 120.5 22.1072 120.4 22.4059 120.6C22.605 120.8 22.7047 121.1 22.5055 121.4L19.2199 125.2C18.9212 125.3 18.8217 125.4 18.6226 125.4Z"
					fill="white"
				/>
				<path d="M105.443 120.4H27.9819V125.3H105.443V120.4Z" fill="white" />
				<defs>
					<linearGradient
						id="paint0_linear_61_765"
						x1="1"
						y1="36.4"
						x2="161"
						y2="36.4"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_765"
						x1="1"
						y1="122.9"
						x2="161"
						y2="122.9"
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

		var parentIcon =
			context["post-grid/accordionNestedIcon"] == undefined
				? null
				: context["post-grid/accordionNestedIcon"];
		var parentIconToggle =
			context["post-grid/accordionNestedIconToggle"] == undefined
				? null
				: context["post-grid/accordionNestedIconToggle"];
		var parentLabelIcon =
			context["post-grid/accordionNestedLabelIcon"] == undefined
				? null
				: context["post-grid/accordionNestedLabelIcon"];

		var parentLabelCounter =
			context["post-grid/accordionNestedLabelCounter"] == undefined
				? null
				: context["post-grid/accordionNestedLabelCounter"];

		var blockId = attributes.blockId;

		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;

		var header = attributes.header;
		var headerLabel = attributes.headerLabel;
		var labelCounter = attributes.labelCounter;

		var labelIcon = attributes.labelIcon;

		var content = attributes.content;
		var icon = attributes.icon;
		var iconToggle = attributes.iconToggle;

		var blockCssY = attributes.blockCssY;

		var breakPointX = myStore.getBreakPoint();

		const [isLoading, setisLoading] = useState(false);
		const [toggled, setToggled] = useState(false);

		const contentSelector = blockClass + "-accordion-content";
		const headerSelector = blockClass + "-accordion-header";

		const headerLabelSelector = blockClass + "-accordion-header-label";
		const labelIconSelector = blockClass + "-accordion-label-icon";
		const labelCounterSelector = blockClass + "-accordion-label-counter";

		const iconSelector = blockClass + "-accordion-icon";
		const iconToggleSelector = blockClass + "-accordion-icon-toggle";
		let isProFeature = applyFilters("isProFeature", true);

		const [iconHtml, setIconHtml] = useState("");
		const [iconToggleHtml, seticonToggleHtml] = useState("");
		const [labelIconHtml, setlabelIconHtml] = useState("");

		//Icon update from nested item

		useEffect(() => {
			var iconSrc = icon.options.iconSrc;
			var iconHtml = `<span className="accordion-icon ${iconSrc}"></span>`;
			setIconHtml(iconHtml);
		}, [icon, icon.options.iconSrc]);

		// Icon update from parent
		useEffect(() => {
			if (parentIcon.options.overrideChild == true) {
				var options = { ...parentIcon.options };
				setAttributes({ icon: { ...icon, options: options } });
			}
		}, [parentIcon]);

		//iconToggle update from nested item

		useEffect(() => {
			var iconSrc = iconToggle.options.iconSrc;

			var iconHtml = `<span className=" ${iconSrc}"></span>`;
			seticonToggleHtml(iconHtml);
		}, [iconToggle, iconToggle.options.iconSrc]);

		//iconToggle update from parent
		useEffect(() => {
			if (parentIcon.options.overrideChild == true) {
				var iconSrc = parentIconToggle.options.iconSrc;
				setAttributes({ iconToggle: parentIconToggle });

				var iconHtml = `<span className="${iconSrc}"></span>`;
				seticonToggleHtml(iconHtml);
			}
		}, [parentIconToggle]);

		//labelIcon update from nested item

		useEffect(() => {
			var iconSrc = labelIcon.options.iconSrc;

			var iconHtml = `<span className=" ${iconSrc}"></span>`;
			setlabelIconHtml(iconHtml);
		}, [labelIcon, labelIcon.options.iconSrc]);

		//labelIcon update from parent

		useEffect(() => {
			if (parentLabelIcon.options.overrideChild == true) {
				setAttributes({ labelIcon: parentLabelIcon });

				var iconSrc = parentLabelIcon.options.iconSrc;

				var iconHtml = `<span className=" ${iconSrc}"></span>`;
				setlabelIconHtml(iconHtml);
			}
		}, [parentLabelIcon]);

		useEffect(() => {
			if (parentLabelCounter.options.overrideChild == true) {
				setAttributes({ labelCounter: parentLabelCounter });
			}
		}, [parentLabelCounter]);

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[contentSelector] = content;
			blockCssObj[headerSelector] = header;
			blockCssObj[headerLabelSelector] = headerLabel;
			blockCssObj[labelCounterSelector] = labelCounter;
			blockCssObj[labelIconSelector] = labelIcon;
			blockCssObj[iconSelector] = icon;
			blockCssObj[iconToggleSelector] = iconToggle;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			// console.log(blockCssRules);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();

			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);

		function onChangeStyleHeader(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, header);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ header: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				headerSelector
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

		function onRemoveStyleHeader(sudoScource, key) {
			var object = myStore.deletePropertyDeep(header, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ header: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				headerSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleHeader(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, header);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ header: object });
		}

		function onChangeStyleHeaderLabel(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, headerLabel);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ headerLabel: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				headerLabelSelector
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

		function onRemoveStyleHeaderLabel(sudoScource, key) {
			var object = myStore.deletePropertyDeep(headerLabel, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ headerLabel: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				headerLabelSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleHeaderLabel(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, headerLabel);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ headerLabel: object });
		}

		function onPickCssLibraryHeaderLabel(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				headerLabel[sudoScource] = sudoScourceArgs;
			});

			var headerLabelX = Object.assign({}, headerLabel);
			setAttributes({ headerLabel: headerLabelX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					headerLabelSelector
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

		function onChangeStyleLabelCounter(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, labelCounter);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ labelCounter: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelCounterSelector
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

		function onRemoveStyleLabelCounter(sudoScource, key) {
			var object = myStore.deletePropertyDeep(labelCounter, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ labelCounter: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelCounterSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleLabelCounter(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, labelCounter);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ labelCounter: object });
		}

		function onPickCssLibraryLabelCounter(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				labelCounter[sudoScource] = sudoScourceArgs;
			});

			var labelCounterX = Object.assign({}, labelCounter);
			setAttributes({ labelCounter: labelCounterX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					labelCounterSelector
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

		function onChangeStyleContent(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, content);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ content: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				contentSelector
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

		function onChangeStyleLabelIcon(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, labelIcon);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ labelIcon: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelIconSelector
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

		function onRemoveStyleLabelIcon(sudoScource, key) {
			var object = myStore.deletePropertyDeep(labelIcon, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ labelIcon: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelIconSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleLabelIcon(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, labelIcon);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ labelIcon: object });
		}

		function onRemoveStyleContent(sudoScource, key) {
			var object = myStore.deletePropertyDeep(content, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ content: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				contentSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleContent(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, content);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ content: object });
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

		function onChangeStyleIconToggle(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, iconToggle);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ iconToggle: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconToggleSelector
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

		function onRemoveStyleIconToggle(sudoScource, key) {
			var object = myStore.deletePropertyDeep(iconToggle, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ iconToggle: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconToggleSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleIconToggle(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, iconToggle);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ iconToggle: object });
		}

		function onPickCssLibraryIconToggle(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				iconToggle[sudoScource] = sudoScourceArgs;
			});

			var iconToggleX = Object.assign({}, iconToggle);
			setAttributes({ iconToggle: iconToggleX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					iconToggleSelector
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

		function onPickCssLibraryHeader(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				header[sudoScource] = sudoScourceArgs;
			});

			var headerX = Object.assign({}, header);
			setAttributes({ header: headerX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					headerSelector
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

		function onPickCssLibraryContent(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				content[sudoScource] = sudoScourceArgs;
			});

			var contentX = Object.assign({}, content);
			setAttributes({ content: contentX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					contentSelector
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

		function onBulkAddHeader(sudoScource, cssObj) {
			let obj = Object.assign({}, header);
			obj[sudoScource] = cssObj;

			setAttributes({ header: obj });

			var selector = myStore.getElementSelector(sudoScource, headerSelector);
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
		function onBulkAddHeaderLabel(sudoScource, cssObj) {
			let obj = Object.assign({}, headerLabel);
			obj[sudoScource] = cssObj;

			setAttributes({ headerLabel: obj });

			var selector = myStore.getElementSelector(
				sudoScource,
				headerLabelSelector
			);
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
		function onBulkAddLabelIcon(sudoScource, cssObj) {
			let obj = Object.assign({}, labelIcon);
			obj[sudoScource] = cssObj;

			setAttributes({ labelIcon: obj });

			var selector = myStore.getElementSelector(sudoScource, labelIconSelector);
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
		function onBulkAddLabelCounter(sudoScource, cssObj) {
			let obj = Object.assign({}, labelCounter);
			obj[sudoScource] = cssObj;

			setAttributes({ labelCounter: obj });

			var selector = myStore.getElementSelector(
				sudoScource,
				labelCounterSelector
			);
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
		function onBulkAddContent(sudoScource, cssObj) {
			let obj = Object.assign({}, content);
			obj[sudoScource] = cssObj;

			setAttributes({ content: obj });

			var selector = myStore.getElementSelector(sudoScource, contentSelector);
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

		function onResetHeader(sudoScources) {
			let obj = Object.assign({}, header);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						headerSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ header: obj });
		}

		function onResetHeaderLabel(sudoScources) {
			let obj = Object.assign({}, headerLabel);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						headerLabelSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ headerLabel: obj });
		}

		function onResetLabelIcon(sudoScources) {
			let obj = Object.assign({}, labelIcon);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						labelIconSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ labelIcon: obj });
		}

		function onResetLabelCounter(sudoScources) {
			let obj = Object.assign({}, labelCounter);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						labelCounterSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ labelCounter: obj });
		}

		function onResetContent(sudoScources) {
			let obj = Object.assign({}, content);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						contentSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ content: obj });
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

		const blockProps = useBlockProps();

		var allowedExtraBlocks = [];

		wp.blocks.getBlockTypes().forEach(function (blockType) {
			if (blockType.name.startsWith("post-grid/accordion-nested")) {
				if (!isProFeature) {
					allowedExtraBlocks.push(blockType.name);
				}
			} else {
				allowedExtraBlocks.push(blockType.name);
			}
		});

		const removeChild = () => {
			dispatch("core/block-editor").removeBlock(clientId);
		};

		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div
							className="bg-red-500 mx-3 my-2 cursor-pointer hover:text-white font-bold text-[16px] px-5 py-2 text-center text-white rounded flex justify-between items-center"
							onClick={(ev) => {
								removeChild();
							}}>
							<span>Remove Item</span>
							<Icon fill="white" icon={close} />
						</div>
						<PanelBody
							className="font-medium text-slate-900 "
							title="Header"
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
										value={header.options.class}
										onChange={(newVal) => {
											var options = { ...header.options, class: newVal };
											setAttributes({
												header: { styles: header.styles, options: options },
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
											value={header.options.tag}
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
												var options = { ...header.options, tag: newVal };
												setAttributes({
													header: { ...header, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={header}
										onChange={onChangeStyleHeader}
										onAdd={onAddStyleHeader}
										onRemove={onRemoveStyleHeader}
										onBulkAdd={onBulkAddHeader}
										onReset={onResetHeader}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={header}
										onChange={onPickCssLibraryHeader}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Header Label"
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
									<label for="" className="font-medium text-slate-900 ">
										Header Label Text
									</label>
									<div className="border border-gray-600 p-2 min-h-[75px] resize-y rounded-[6px]  ">
										<RichText
											tagName={"span"}
											value={headerLabel.options.text}
											allowedFormats={["core/bold", "core/italic", "core/link"]}
											onChange={(newVal) => {
												var options = { ...headerLabel.options, text: newVal };
												setAttributes({
													headerLabel: { ...headerLabel, options: options },
												});
											}}
											placeholder={__("Start Writing...")}
										/>
									</div>
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Wrapper Tag
										</label>

										<SelectControl
											label=""
											value={headerLabel.options.tag}
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
												{ label: "a", value: "a" },
											]}
											onChange={(newVal) => {
												var options = { ...headerLabel.options, tag: newVal };
												setAttributes({
													headerLabel: { ...headerLabel, options: options },
												});
											}}
										/>
									</PanelRow>

									{headerLabel.options.tag == "a" && (
										<PanelRow className="mb-4">
											<label for="" className="font-medium text-slate-900 ">
												Custom Slug
											</label>
											<InputControl
												className="mr-2"
												value={
													headerLabel.options.slug == undefined
														? ""
														: headerLabel.options.slug
												}
												onChange={(newVal) => {
													var options = {
														...headerLabel.options,
														slug: newVal,
													};
													setAttributes({
														headerLabel: { ...headerLabel, options: options },
													});
												}}
											/>
										</PanelRow>
									)}

									<ToggleControl
										label="Enable Label Icon?"
										help={
											labelIcon.options.enable
												? "Label Icon Enabled"
												: "Label Icon Disabled."
										}
										checked={labelIcon.options.enable ? true : false}
										onChange={(e) => {
											var options = {
												...labelIcon.options,
												enable: labelIcon.options.enable ? false : true,
											};
											setAttributes({
												labelIcon: { ...labelIcon, options: options },
											});
										}}
									/>

									{labelIcon.options.enable && (
										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Choose Icon
											</label>

											<PGIconPicker
												library={labelIcon.options.library}
												srcType={labelIcon.options.srcType}
												iconSrc={labelIcon.options.iconSrc}
												onChange={(arg) => {
													var options = {
														...labelIcon.options,
														srcType: arg.srcType,
														library: arg.library,
														iconSrc: arg.iconSrc,
													};
													setAttributes({
														labelIcon: { ...labelIcon, options: options },
													});
												}}
											/>
										</PanelRow>
									)}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={headerLabel}
										onChange={onChangeStyleHeaderLabel}
										onAdd={onAddStyleHeaderLabel}
										onRemove={onRemoveStyleHeaderLabel}
										onBulkAdd={onBulkAddHeaderLabel}
										onReset={onResetHeaderLabel}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={headerLabel}
										onChange={onPickCssLibraryHeaderLabel}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Label Icon"
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
								]}>
								<PGtab name="options">
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Label Icon position
										</label>

										<SelectControl
											label=""
											value={labelIcon.options.position}
											options={[
												{ label: "Choose Position", value: "" },

												{ label: "Before Label", value: "beforeLabel" },
												{ label: "After Label", value: "afterLabel" },
												{
													label: "Before Label Text",
													value: "beforeLabelText",
												},
												{ label: "After Label Text", value: "afterLabelText" },
											]}
											onChange={(newVal) => {
												var options = {
													...labelIcon.options,
													position: newVal,
												};
												setAttributes({
													labelIcon: { ...labelIcon, options: options },
												});
											}}
										/>
									</PanelRow>

									{labelIcon.options.position.length > 0 && (
										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Choose Icon
											</label>

											<PGIconPicker
												library={labelIcon.options.library}
												srcType={labelIcon.options.srcType}
												iconSrc={labelIcon.options.iconSrc}
												onChange={(arg) => {
													var options = {
														...labelIcon.options,
														srcType: arg.srcType,
														library: arg.library,
														iconSrc: arg.iconSrc,
													};
													setAttributes({
														labelIcon: { ...labelIcon, options: options },
													});
												}}
											/>
										</PanelRow>
									)}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={labelIcon}
										onChange={onChangeStyleLabelIcon}
										onAdd={onAddStyleLabelIcon}
										onRemove={onRemoveStyleLabelIcon}
										onBulkAdd={onBulkAddLabelIcon}
										onReset={onResetLabelIcon}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Label Counter"
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
										label="Enable Header Counter?"
										help={
											labelCounter.options?.enable
												? "Header Counter Enabled"
												: "Header Counter Disabled."
										}
										checked={labelCounter.options.enable ? true : false}
										onChange={(e) => {
											var options = {
												...labelCounter.options,
												enable: labelCounter.options.enable ? false : true,
											};
											setAttributes({
												labelCounter: { ...labelCounter, options: options },
											});
										}}
									/>

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Counter position
										</label>

										<SelectControl
											label=""
											value={labelCounter.options.position}
											options={[
												{ label: "Choose Position", value: "" },
												{ label: "Left", value: "left" },
												{ label: "Right", value: "right" },
											]}
											onChange={(newVal) => {
												var options = {
													...labelCounter.options,
													position: newVal,
												};
												setAttributes({
													labelCounter: { ...labelCounter, options: options },
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
											value={labelCounter.options.tag}
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
												var options = { ...labelCounter.options, tag: newVal };
												setAttributes({
													labelCounter: { ...labelCounter, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={labelCounter}
										onChange={onChangeStyleLabelCounter}
										onAdd={onAddStyleLabelCounter}
										onRemove={onRemoveStyleLabelCounter}
										onBulkAdd={onBulkAddLabelCounter}
										onReset={onResetLabelCounter}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={labelCounter}
										onChange={onPickCssLibraryLabelCounter}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Content"
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
											Wrapper Tag
										</label>

										<SelectControl
											label=""
											value={content.options.tag}
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
												var options = { ...content.options, tag: newVal };
												setAttributes({
													content: { ...content, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={content}
										onChange={onChangeStyleContent}
										onAdd={onAddStyleContent}
										onRemove={onRemoveStyleContent}
										onBulkAdd={onBulkAddContent}
										onReset={onResetContent}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={content}
										onChange={onPickCssLibraryContent}
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
											onChange={(arg) => {
												var options = {
													...icon.options,
													srcType: arg.srcType,
													library: arg.library,
													iconSrc: arg.iconSrc,
												};
												setAttributes({ icon: { ...icon, options: options } });
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Choose Toggled Icon
										</label>

										<PGIconPicker
											library={iconToggle.options.library}
											srcType={iconToggle.options.srcType}
											iconSrc={iconToggle.options.iconSrc}
											onChange={(arg) => {
												var options = {
													...iconToggle.options,
													srcType: arg.srcType,
													library: arg.library,
													iconSrc: arg.iconSrc,
												};
												setAttributes({
													iconToggle: { ...iconToggle, options: options },
												});
											}}
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

												{ label: "Left", value: "left" },
												{ label: "Right", value: "right" },
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

						<div className="px-2">
							<PGMailSubsctibe />
							<PGContactSupport
								utm={{
									utm_source: "BlockText",
									utm_campaign: "PostGridCombo",
									utm_content: "BlockOptions",
								}}
							/>
						</div>
					</div>
				</InspectorControls>

				<>
					<div
						className={`${blockId}-accordion-header accordion-header ${
							header.options.class
						} ${toggled ? "accordion-header-active" : ""}`}
						onClick={(ev) => {
							setToggled(!toggled);
						}}>
						{labelCounter.options.position == "left" && (
							<span
								className={`${blockId}-accordion-label-counter accordion-label-counter`}>
								{attributes.count}
							</span>
						)}

						{icon.options.position == "left" && (
							<>
								{!toggled && (
									<span
										className={`${blockId}-accordion-icon accordion-icon`}
										dangerouslySetInnerHTML={{ __html: iconHtml }}></span>
								)}
								{toggled && (
									<span
										className={`${blockId}-accordion-icon-toggle accordion-icon accordion-icon-toggle}`}
										dangerouslySetInnerHTML={{ __html: iconToggleHtml }}></span>
								)}
							</>
						)}

						{labelIcon.options.position == "beforeLabel" && (
							<span
								className={`${blockId}-accordion-label-icon accordion-label-icon`}
								dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
						)}

						<span
							className={`${blockId}-accordion-header-label accordion-header-label`}>
							{labelIcon.options.position == "beforeLabelText" && (
								<span
									className={`${blockId}-accordion-label-icon accordion-label-icon`}
									dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
							)}

							<RichText
								tagName={"span"}
								value={headerLabel.options.text}
								allowedFormats={["core/bold", "core/italic", "core/link"]}
								onChange={(newVal) => {
									var options = { ...headerLabel.options, text: newVal };
									setAttributes({
										headerLabel: { ...headerLabel, options: options },
									});
								}}
								placeholder={__("Start Writing...")}
							/>

							{labelIcon.options.position == "afterLabelText" && (
								<span
									className={`${blockId}-accordion-label-icon accordion-label-icon`}
									dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
							)}
						</span>

						{labelIcon.options.position == "afterLabel" && (
							<span
								className={`${blockId}-accordion-label-icon accordion-label-icon`}
								dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
						)}

						{icon.options.position == "right" && (
							<>
								{!toggled && (
									<span
										className={`${blockId}-accordion-icon accordion-icon`}
										dangerouslySetInnerHTML={{ __html: iconHtml }}></span>
								)}
								{toggled && (
									<span
										className={`${blockId}-accordion-icon-toggle accordion-icon-toggle`}
										dangerouslySetInnerHTML={{ __html: iconToggleHtml }}></span>
								)}
							</>
						)}
						{labelCounter.options.position == "right" && (
							<span
								className={`${blockId}-accordion-label-counter accordion-label-counter`}>
								{attributes.count}
							</span>
						)}
					</div>

					{toggled && (
						<div className={`${blockId}-accordion-content accordion-content`}>
							<InnerBlocks
								allowedBlocks={allowedExtraBlocks}
								renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
							/>
						</div>
					)}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file

		const blockProps = useBlockProps.save({});
		const { children, ...innerBlocksProps } =
			useInnerBlocksProps.save(blockProps);

		return <>{children}</>;
	},
});

