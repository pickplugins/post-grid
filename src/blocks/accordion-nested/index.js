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
	store as blockEditorStore,
} from "@wordpress/block-editor";
import { Icon, styles, settings, link, linkOff } from "@wordpress/icons";
import { applyFilters } from "@wordpress/hooks";
import { createBlocksFromInnerBlocksTemplate } from "@wordpress/blocks";
import { createBlock } from "@wordpress/blocks";

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
import Typography from "../../components/typography";
import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";
import BreakpointToggle from "../../components/breakpoint-toggle";
import colorsPresets from "../../colors-presets";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import PGCssLibrary from "../../components/css-library";
import PGIconPicker from "../../components/icon-picker";
import PGDivider from "../../components/divider";

import variations from "./variations";
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
				<rect fill="#1d4ed8" y="6.2" width="36" height="4.21" />
				<path
					fill="#8db1ff"
					d="M4,8.87a.14.14,0,0,1-.1,0L3.13,8a.12.12,0,0,1,0-.17.12.12,0,0,1,.17,0L4,8.55l.64-.75a.13.13,0,0,1,.18,0A.12.12,0,0,1,4.8,8l-.74.86A.12.12,0,0,1,4,8.87Z"
				/>
				<rect fill="#8db1ff" x="6.07" y="7.76" width="17.44" height="1.11" />
				<rect fill="#8db1ff" y="16.16" width="36" height="8.66" />
				<rect fill="#8db1ff" y="11.18" width="36" height="4.21" />
				<path
					fill="#1d4ed8"
					d="M4,12.73a.12.12,0,0,1,.09,0l.74.86a.12.12,0,0,1,0,.17.13.13,0,0,1-.18,0L4,13.05l-.65.75a.12.12,0,0,1-.17,0,.12.12,0,0,1,0-.17l.74-.86A.14.14,0,0,1,4,12.73Z"
				/>
				<rect fill="#1d4ed8" x="6.07" y="12.73" width="17.44" height="1.11" />
				<rect fill="#1d4ed8" y="25.58" width="36" height="4.21" />
				<path
					fill="#8db1ff"
					d="M4,28.24a.13.13,0,0,1-.1,0l-.74-.86a.14.14,0,0,1,0-.18.12.12,0,0,1,.17,0l.65.75.64-.75a.12.12,0,1,1,.19.16l-.74.86A.11.11,0,0,1,4,28.24Z"
				/>
				<rect fill="#8db1ff" x="6.07" y="27.13" width="17.44" height="1.11" />
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
		var header = attributes.header;
		var headerActive = attributes.headerActive;

		var headerLabel = attributes.headerLabel;
		var labelIcon = attributes.labelIcon;
		var labelCounter = attributes.labelCounter;

		var searchWrap = attributes.searchWrap;
		var searchInput = attributes.searchInput;
		var schema = attributes.schema;

		var content = attributes.content;
		var icon = attributes.icon;
		var iconToggle = attributes.iconToggle;

		var customCss = attributes.customCss;
		var blockCssY = attributes.blockCssY;

		let isProFeature = applyFilters("isProFeature", true);

		//const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
		var breakPointX = myStore.getBreakPoint();

		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
		const contentSelector = blockClass + " .accordion-content";
		const headerSelector = blockClass + " .accordion-header";
		const headerActiveSelector = blockClass + " .accordion-header-active";

		const headerLabelSelector = blockClass + " .accordion-header-label";
		const labelIconSelector = blockClass + " .accordion-label-icon";
		const labelCounterSelector = blockClass + " .accordion-label-counter";

		const searchWrapSelector = blockClass + "-accordion-search-wrap";
		const searchInputSelector = blockClass + "-accordion-search-input";

		const iconSelector = blockClass + " .accordion-icon";
		const iconToggleSelector = blockClass + " .accordion-icon-toggle";

		const { replaceInnerBlocks } = useDispatch(blockEditorStore);

		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);

		useEffect(() => {
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId, customCss);
		}, [clientId]);

		useEffect(() => {
			setAttributes({ customCss: customCss });

			myStore.generateBlockCss(blockCssY.items, blockId, customCss);
		}, [customCss]);

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId, customCss);
		}, [blockCssY]);

		// useEffect(() => {
		// 	var childBlocks =
		// 		select("core/block-editor").getBlocksByClientId(clientId)[0]
		// 			.innerBlocks;

		// 	childBlocks.map((childBlock) => {
		// 		var childClientId = childBlock.clientId;
		// 		var childAttributes = childBlock.attributes;

		// 		childAttributes.icon.options.position = icon.options.position;

		// 		dispatch("core/block-editor").updateBlockAttributes(
		// 			childClientId,
		// 			childAttributes
		// 		);
		// 		wp.data.dispatch("core/block-editor").selectBlock(childClientId);
		// 	});
		// 	wp.data.dispatch("core/block-editor").selectBlock(clientId);
		// }, [icon.options.position]);

		// useEffect(() => {
		// 	var childBlocks =
		// 		select("core/block-editor").getBlocksByClientId(clientId)[0]
		// 			.innerBlocks;

		// 	childBlocks.map((childBlock) => {
		// 		var childClientId = childBlock.clientId;
		// 		var childAttributes = childBlock.attributes;

		// 		childAttributes.labelCounter.options.position =
		// 			labelCounter.options.position;

		// 		dispatch("core/block-editor").updateBlockAttributes(
		// 			childClientId,
		// 			childAttributes
		// 		);
		// 		wp.data.dispatch("core/block-editor").selectBlock(childClientId);
		// 	});
		// 	wp.data.dispatch("core/block-editor").selectBlock(clientId);
		// }, [labelCounter.options.position]);

		// var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

		// for (var x in breakPoints) {

		//   var item = breakPoints[x];
		//   breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

		// }

		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
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

		// #########

		function onChangeStyleHeaderActive(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, headerActive);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ headerActive: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				headerActiveSelector
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

		function onRemoveStyleHeaderActive(sudoScource, key) {
			var object = myStore.deletePropertyDeep(headerActive, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ headerActive: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				headerActiveSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleHeaderActive(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];

			let obj = Object.assign({}, headerActive);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ headerActive: object });
		}

		function onPickCssLibraryHeaderActive(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				headerActive[sudoScource] = sudoScourceArgs;
			});

			var headerActiveX = Object.assign({}, headerActive);
			setAttributes({ headerActive: headerActiveX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					headerActiveSelector
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

		//########

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

		////

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

		function onChangeStyleSearchWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, searchWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ searchWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				searchWrapSelector
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

		function onRemoveStyleSearchWrap(sudoScource, key) {
			var object = myStore.deletePropertyDeep(searchWrap, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ searchWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				searchWrapSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleSearchWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, searchWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ searchWrap: object });
		}

		function onChangeStyleSearchInput(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, searchInput);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ searchInput: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				searchInputSelector
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

		function onRemoveStyleSearchInput(sudoScource, key) {
			var object = myStore.deletePropertyDeep(searchInput, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ searchInput: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				searchInputSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleSearchInput(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, searchInput);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ searchInput: object });
		}

		const ALLOWED_BLOCKS = ["post-grid/accordion-nested-item"];

		const MY_TEMPLATE = [
			["post-grid/accordion-nested-item", {}],
			["post-grid/accordion-nested-item", {}],
		];

		const blockProps = useBlockProps({
			className: ` ${blockId} pg-accordion-nested`,
		});

		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			allowedBlocks: ALLOWED_BLOCKS,
			// __experimentalDirectInsert: true,
			template: MY_TEMPLATE,
			//templateInsertUpdatesSelection: true,
		});

		var childBlocks =
			select("core/block-editor").getBlocksByClientId(clientId)[0].innerBlocks;

		var count = 0;

		childBlocks.forEach(function (childBlock) {
			count++;
			var childClientId = childBlock.clientId;
			var childAttributes = childBlock.attributes;
			childAttributes.count = count;

			dispatch("core/block-editor").updateBlockAttributes(
				childClientId,
				childAttributes
			);
		});

		const addChild = () => {
			var childBlocks = wp.data.select(blockEditorStore).getBlocks(clientId);

			const slide = createBlock("post-grid/accordion-nested-item");
			const position = childBlocks.length;
			dispatch("core/block-editor").insertBlock(slide, position, clientId);

			wp.data.dispatch("core/block-editor").selectBlock(clientId);
			//setActiveTab(slide.clientId);
		};

		return (
			<>
				<InspectorControls>
					<div
						className="bg-blue-600 mx-3 my-2 cursor-pointer hover:text-white font-bold text-[16px] px-5 py-2 block text-center text-white rounded"
						onClick={(ev) => {
							addChild();
						}}>
						Add Item
					</div>

					<div className="">
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
										onRemove={onRemoveStyleWrapper}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody title="Header" initialOpen={false}>
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

						<PanelBody title="Header Active" initialOpen={false}>
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
								<PGtab name="options"></PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={headerActive}
										onChange={onChangeStyleHeaderActive}
										onAdd={onAddStyleHeaderActive}
										onRemove={onRemoveStyleHeaderActive}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={headerActive}
										onChange={onPickCssLibraryHeaderActive}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody title="Header Label" initialOpen={false}>
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
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={headerLabel}
										onChange={onChangeStyleHeaderLabel}
										onAdd={onAddStyleHeaderLabel}
										onRemove={onRemoveStyleHeaderLabel}
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

						<PanelBody title="Label Counter" initialOpen={false}>
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
										<label for="">Counter position</label>

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
										<label for="">Wrapper Tag</label>

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

						<PanelBody title="Label Icon" initialOpen={false}>
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
								]}>
								<PGtab name="options">
									<PanelRow>
										<label for="">Label Icon position</label>

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

												// var childBlocks = select('core/block-editor').getBlocksByClientId(clientId)[0].innerBlocks;

												// childBlocks.map(childBlock => {

												//   var childClientId = childBlock.clientId;

												//   var childAttributes = childBlock.attributes;
												//   childAttributes.labelIcon.options.position = newVal;

												//   dispatch('core/block-editor').updateBlockAttributes(childClientId, childAttributes)
												//   wp.data.dispatch('core/block-editor').selectBlock(childClientId)
												// })

												// wp.data.dispatch('core/block-editor').selectBlock(clientId)
											}}
										/>
									</PanelRow>

									{labelIcon.options.position.length > 0 && (
										<PanelRow>
											<label for="">Choose Icon</label>

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

													// var childBlocks =
													// 	select("core/block-editor").getBlocksByClientId(
													// 		clientId
													// 	)[0].innerBlocks;

													// childBlocks.map((childBlock) => {
													// 	var childClientId = childBlock.clientId;

													// 	console.log("childClientId", childClientId);

													// 	var childAttributes = childBlock.attributes;
													// 	childAttributes.labelIcon.options.srcType =
													// 		arg.srcType;
													// 	childAttributes.labelIcon.options.library =
													// 		arg.library;
													// 	childAttributes.labelIcon.options.iconSrc =
													// 		arg.iconSrc;

													// 	dispatch("core/block-editor").updateBlockAttributes(
													// 		childClientId,
													// 		childAttributes
													// 	);
													// 	wp.data
													// 		.dispatch("core/block-editor")
													// 		.selectBlock(childClientId);
													// });

													// console.log(clientId);

													// wp.data
													// 	.dispatch("core/block-editor")
													// 	.selectBlock(clientId);
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
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody title="Content" initialOpen={false}>
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
											onChange={(arg) => {
												var options = {
													...icon.options,
													srcType: arg.srcType,
													library: arg.library,
													iconSrc: arg.iconSrc,
												};
												setAttributes({ icon: { ...icon, options: options } });

												// var childBlocks = select('core/block-editor').getBlocksByClientId(clientId)[0].innerBlocks;

												// childBlocks.map(childBlock => {

												//   setTimeout(() => {
												//     var childClientId = childBlock.clientId;

												//     var childAttributes = childBlock.attributes;
												//     childAttributes.icon.options.srcType = arg.srcType;
												//     childAttributes.icon.options.library = arg.library;
												//     childAttributes.icon.options.iconSrc = arg.iconSrc;

												//     dispatch('core/block-editor').updateBlockAttributes(childClientId, childAttributes)
												//     wp.data.dispatch('core/block-editor').selectBlock(childClientId);
												//   }, 20, childBlock)

												// })

												// setTimeout(() => {
												//   wp.data.dispatch('core/block-editor').selectBlock(clientId)
												//   console.log('clientId', clientId);

												// }, 2000)
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label for="">Choose Toggled Icon</label>

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

												// var childBlocks = select('core/block-editor').getBlocksByClientId(clientId)[0].innerBlocks;

												// childBlocks.map(childBlock => {

												//   var childClientId = childBlock.clientId;
												//   var childAttributes = childBlock.attributes;
												//   childAttributes.iconToggle.options.srcType = arg.srcType;
												//   childAttributes.iconToggle.options.library = arg.library;
												//   childAttributes.iconToggle.options.iconSrc = arg.iconSrc;

												//   dispatch('core/block-editor').updateBlockAttributes(childClientId, childAttributes)
												//   //wp.data.dispatch('core/block-editor').selectBlock(childClientId)
												// })

												// wp.data.dispatch('core/block-editor').selectBlock(clientId)
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label for="">Icon position</label>

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
						<PanelBody title="Schema" initialOpen={false}>
							<ToggleControl
								label="Enable Schema?"
								help={
									schema.options.enable ? "Schema Enabled" : "Schema Disabled."
								}
								checked={schema.options.enable ? true : false}
								onChange={(e) => {
									var options = {
										...schema.options,
										enable: schema.options.enable ? false : true,
									};
									setAttributes({ schema: { ...schema, options: options } });
								}}
							/>
						</PanelBody>
						<PanelBody title="Search" initialOpen={false}>
							<PanelRow className="my-3">
								<ToggleControl
									label="Enable Search?"
									help={
										searchWrap.options.enable
											? "Search Enabled"
											: "Search Disabled."
									}
									disabled={isProFeature}
									checked={searchWrap.options.enable ? true : false}
									onChange={(e) => {
										var options = {
											...searchWrap.options,
											enable: searchWrap.options.enable ? false : true,
										};
										setAttributes({
											searchWrap: { ...searchWrap, options: options },
										});
									}}
								/>
								{isProFeature && (
									<span className="bg-amber-400 mx-2 rounded-sm px-3  text-white hover:text-white">
										<a
											target="_blank"
											href={
												"https://pickplugins.com/post-grid/?utm_source=search&utm_term=blockaccordion&utm_campaign=pluginPostGrid&utm_medium=search"
											}>
											Pro
										</a>
									</span>
								)}
							</PanelRow>

							<PanelBody title="Search Wrap" initialOpen={false}>
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
									<PGtab name="options"></PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={searchWrap}
											onChange={onChangeStyleSearchWrap}
											onAdd={onAddStyleSearchWrap}
											onRemove={onRemoveStyleSearchWrap}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>

							<PanelBody title="Search Input" initialOpen={false}>
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
									<PGtab name="options"></PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={searchInput}
											onChange={onChangeStyleSearchInput}
											onAdd={onAddStyleSearchInput}
											onRemove={onRemoveStyleSearchInput}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>
						</PanelBody>

						<PanelBody title="Custom Style" initialOpen={false}>
							<p>
								Please use following class selector to apply your custom CSS
							</p>

							<div className="my-3">
								<p className="font-bold">Text </p>
								<p>
									<code>
										{wrapperSelector}
										{"{}"}{" "}
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

						<div className="px-3">
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
					{!hasInnerBlocks && (
						<div {...innerBlocksProps}>
							<div className="border p-5">
								<div className="flex justify-between mb-5">
									<div className="text-xl rounded-sm">
										Click to pick a variation
									</div>

									<div
										className="bg-orange-400 hover:bg-orange-300 px-4 py-1 text-white cursor-pointer"
										onClick={(ev) => {
											replaceInnerBlocks(
												clientId,
												createBlocksFromInnerBlocksTemplate([
													["post-grid/accordion-nested-item", {}],
												]),
												true
											);
										}}>
										Skip
									</div>
								</div>

								<div className="">
									{variations.map((variation) => {
										return (
											<div
												className="text-center inline-block m-4 w-32 align-top p-4 bg-gray-400 cursor-pointer hover:bg-gray-500 relative"
												onClick={(ev) => {
													if (variation.isPro) {
														alert(
															"Sorry this variation only vailable in pro version"
														);
														return false;
													}

													var atts = variation.atts;

													var wrapper = { ...atts.wrapper };
													var searchWrap = { ...atts.searchWrap };
													var searchInput = { ...atts.searchInput };
													var content = { ...atts.content };
													var header = { ...atts.header };
													var headerLabel = { ...atts.headerLabel };
													var labelCounter = { ...atts.labelCounter };
													var labelIcon = { ...atts.labelIcon };
													var icon = { ...atts.icon };
													var iconToggle = { ...atts.iconToggle };
													var blockCssY = { ...atts.blockCssY };
													var customCss = { ...atts.customCss };

													var blockCssObj = {};

													blockCssObj[wrapperSelector] = wrapper;
													blockCssObj[contentSelector] = content;
													blockCssObj[headerSelector] = header;
													blockCssObj[headerLabelSelector] = headerLabel;
													blockCssObj[labelIconSelector] = labelIcon;
													blockCssObj[labelCounterSelector] = labelCounter;
													blockCssObj[searchWrapSelector] = searchWrap;
													blockCssObj[searchInputSelector] = searchInput;
													blockCssObj[iconSelector] = icon;
													blockCssObj[iconToggleSelector] = iconToggle;

													setAttributes({
														wrapper: wrapper,
														searchWrap: searchWrap,
														searchInput: searchInput,
														content: content,
														header: header,
														headerLabel: headerLabel,
														labelCounter: labelCounter,
														labelIcon: labelIcon,
														icon: icon,
														iconToggle: iconToggle,
														customCss: customCss,
													});

													var blockCssRules =
														myStore.getBlockCssRules(blockCssObj);

													var items = { ...blockCssY.items, ...blockCssRules };

													setAttributes({ blockCssY: { items: items } });

													replaceInnerBlocks(
														clientId,
														createBlocksFromInnerBlocksTemplate(
															variation.innerBlocks
														),
														true
													);
												}}>
												<div>{variation.icon}</div>
												<div>{variation.title}</div>

												{variation.isPro && (
													<span className="bg-amber-400 rounded-sm text-sm inline-block  bg-opacity-90 text-white hover:text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
														<a
															target="_blank"
															className="block px-3"
															href={
																"https://pickplugins.com/post-grid/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=" +
																variation.label
															}>
															Pro
														</a>
													</span>
												)}
											</div>
										);
									})}
								</div>
							</div>
						</div>
					)}
					{hasInnerBlocks && (
						<div {...innerBlocksProps}>
							{searchWrap.options.enable && (
								<div className={`${blockId}-accordion-search-wrap`}>
									<input
										className={`${blockId}-accordion-search-input my-4`}
										type={searchInput.options.type}
										placeholder={searchInput.options.placeholder}
										value={searchInput.options.value}
									/>
								</div>
							)}
							{innerBlocksProps.children}
						</div>
					)}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file

		var attributes = props.attributes;

		var blockId = attributes.blockId;

		const blockProps = useBlockProps.save({
			className: ` ${blockId} pg-accordion-nested`,
		});
		//const innerBlocksProps = useInnerBlocksProps.save(blockProps);
		const { children, ...innerBlocksProps } =
			useInnerBlocksProps.save(blockProps);

		return <>{children}</>;

		//return null;
	},
});
