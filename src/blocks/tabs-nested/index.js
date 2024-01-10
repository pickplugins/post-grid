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
	store as blockEditorStore,
} from "@wordpress/block-editor";
import {
	Icon,
	styles,
	settings,
	link,
	linkOff,
	plus,
	close,
	brush,
	mediaAndText,
} from "@wordpress/icons";
import { applyFilters } from "@wordpress/hooks";
import { createBlocksFromInnerBlocksTemplate } from "@wordpress/blocks";

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

import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";
import PGIconPicker from "../../components/icon-picker";
import PGLibraryBlockVariations from "../../components/library-block-variations";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import PGCssLibrary from "../../components/css-library";
import variations from "./variations";
import metadata from "./block.json";
import PGcssClassPicker from "../../components/css-class-picker";
import customTags from "../../custom-tags";
import PGTutorials from "../../components/tutorials";
import PGBlockVariationsPicker from "../../components/block-variations-picker";

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
				<path d="M47.5917 48H0V64.2H47.5917V48Z" fill="#C15940" />
				<path
					d="M8.66189 54C8.76145 54 8.96097 54.1 9.06053 54.2L11.8481 57.5C12.0473 57.7 11.9476 58 11.7485 58.2C11.5494 58.4 11.251 58.3 11.0518 58.1L8.56271 55.2L6.0736 58.1C5.87447 58.3 5.57558 58.3 5.37645 58.2C5.17732 58.1 5.17722 57.7 5.27679 57.5L8.06489 54.2C8.36358 54.1 8.46276 54 8.66189 54Z"
					fill="white"
				/>
				<path d="M40.8216 54H15.4326V58.3H40.8216V54Z" fill="white" />
				<path
					d="M103.846 48H56.2539V64.2H103.846V48Z"
					fill="url(#paint0_linear_61_760)"
				/>
				<path
					d="M64.8167 58.3002C64.7172 58.3002 64.5177 58.2002 64.4181 58.1002L61.6305 54.8002C61.4314 54.6002 61.531 54.3002 61.7301 54.1002C61.9293 53.9002 62.2277 54.0002 62.4268 54.2002L64.9159 57.1002L67.405 54.2002C67.6042 54.0002 67.9031 54.0002 68.1022 54.1002C68.3013 54.3002 68.3014 54.6002 68.2018 54.8002L65.4137 58.1002C65.115 58.2002 64.9163 58.3002 64.8167 58.3002Z"
					fill="white"
				/>
				<path d="M96.9759 54H71.5869V58.3H96.9759V54Z" fill="white" />
				<path
					d="M160 48H112.408V64.2H160V48Z"
					fill="url(#paint1_linear_61_760)"
				/>
				<path
					d="M120.971 58.3002C120.871 58.3002 120.672 58.2002 120.573 58.1002L117.785 54.8002C117.586 54.6002 117.685 54.3002 117.884 54.1002C118.084 53.9002 118.382 54.0002 118.582 54.2002L121.071 57.1002L123.56 54.2002C123.759 54.0002 124.057 54.0002 124.256 54.1002C124.456 54.3002 124.456 54.6002 124.356 54.8002L121.569 58.1002C121.27 58.2002 121.17 58.3002 120.971 58.3002Z"
					fill="white"
				/>
				<path d="M153.13 54H127.741V58.3H153.13V54Z" fill="white" />
				<path d="M160 74.1001H0V112.8H160V74.1001Z" fill="#C15940" />
				<defs>
					<linearGradient
						id="paint0_linear_61_760"
						x1="56.2539"
						y1="56.1"
						x2="103.846"
						y2="56.1"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_760"
						x1="112.408"
						y1="56.1"
						x2="160"
						y2="56.1"
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
		var tabs = attributes.tabs;
		var activeTab = attributes.activeTab;
		var icon = attributes.icon;
		var iconToggle = attributes.iconToggle;
		if (!iconToggle || !iconToggle.options) {
			// Set default values for iconToggle.options
			iconToggle = {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "",
					class: "icon-toggle",
				},
				styles: {},
			};
		}

		var navsWrap = attributes.navsWrap;
		var navItem = attributes.navItem;
		var activeNavItem = attributes.activeNavItem;

		var navLabel = attributes.navLabel;
		var panelWrap = attributes.panelWrap;

		var blockCssY = attributes.blockCssY;
		var childBlocks =
			select("core/block-editor").getBlocksByClientId(clientId)[0].innerBlocks;

		let isProFeature = applyFilters("isProFeature", true);

		var breakPointX = myStore.getBreakPoint();

		const [iconPickerIndex, setIconPickerIndex] = useState(99);
		const [iconPickerEnable, setIconPickerEnable] = useState(false);

		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
		var navsWrapSelector = blockClass + " .navs-wrapper";
		var navItemSelector = blockClass + " .nav-item";
		var activeNavItemSelector = blockClass + " .nav-item-active";

		var navLabelSelector = blockClass + " .nav-label";
		var panelWrapSelector = blockClass + " .panels-wrap";

		var navIconSelector = blockClass + " .nav-icon";
		var iconToggleSelector = blockClass + " .nav-icon-toggle";

		const { replaceInnerBlocks } = useDispatch(blockEditorStore);

		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);

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
			blockCssObj[activeNavItemSelector] = activeNavItem;
			blockCssObj[navsWrapSelector] = navsWrap;
			blockCssObj[navItemSelector] = navItem;
			blockCssObj[navLabelSelector] = navLabel;
			blockCssObj[panelWrapSelector] = panelWrap;
			blockCssObj[navIconSelector] = icon;
			blockCssObj[iconToggleSelector] = iconToggle;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });

			setTimeout(() => {
				var tabsX = [...tabs];

				childBlocks.map((item, index) => {
					//tabsX[index].uid = item.clientId;
					tabsX[index].uid = item.attributes.uid;
				});

				setAttributes({ tabs: tabsX });
			}, 1000);
		}, [blockId]);

		useEffect(() => {
			var tabsX = [...tabs];
			childBlocks.map((item, index) => {
				//tabsX[index].uid = item.clientId;
				tabsX[index].uid = item.attributes.uid;
			});

			setAttributes({ tabs: tabsX });

			if (tabsX[0] != undefined && activeTab.length == 0) {
				setActiveTab(tabsX[0].uid);
			}
		}, [childBlocks]);

		function bulkCssGenerate(cssObj) {
			var stylesObj = {};

			Object.entries(cssObj).map((args) => {
				var selector = args[0];

				Object.entries(args[1]).map((x) => {
					var attr = x[0];
					var cssPropty = myStore.cssAttrParse(attr);

					if (stylesObj[selector] == undefined) {
						stylesObj[selector] = {};
					}

					if (stylesObj[selector][cssPropty] == undefined) {
						stylesObj[selector][cssPropty] = {};
					}

					stylesObj[selector][cssPropty] = x[1];
				});
			});

			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };

			setAttributes({ blockCssY: { items: cssItemsX } });
		}

		function onPickBlockVariation(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;

			var blocks = content.length > 0 ? parse(content) : "";

			const attributes = blocks[0].attrs;

			wp.data
				.dispatch("core/block-editor")
				.replaceBlock(clientId, wp.blocks.parse(content));
		}

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
				var itemsX = attributes.items;
				var navsWrapX = attributes.navsWrap;
				var navItemX = attributes.navItem;
				var activeNavItemX = attributes.activeNavItem;
				var navLabelX = attributes.navLabel;
				var iconX = attributes.icon;
				var iconToggleX = attributes.iconToggle;
				var panelWrapX = attributes.panelWrap;
				var tabsX = attributes.tabs;
				var activeTabX = attributes.activeTab;
				var wrapperX = attributes.wrapper;
				var blockCssYX = attributes.blockCssY;

				var blockCssObj = {};

				if (itemsX != undefined) {
					var itemsY = { ...itemsX, options: items.options };
					setAttributes({ items: itemsY });
					blockCssObj[itemsSelector] = itemsY;
				}

				if (navsWrapX != undefined) {
					var navsWrapY = { ...navsWrapX, options: navsWrap.options };
					setAttributes({ navsWrap: navsWrapY });
					blockCssObj[navsWrapSelector] = navsWrapY;
				}

				if (activeNavItemX != undefined) {
					var activeNavItemY = {
						...activeNavItemX,
						options: activeNavItem.options,
					};
					setAttributes({ activeNavItem: activeNavItemY });
					blockCssObj[activeNavItemSelector] = activeNavItemY;
				}

				if (navItemX != undefined) {
					var navItemY = { ...navItemX, options: navItem.options };
					setAttributes({ navItem: navItemY });
					blockCssObj[navItemSelector] = navItemY;
				}

				if (navLabelX != undefined) {
					var navLabelY = { ...navLabelX, options: navLabel.options };
					setAttributes({ navLabel: navLabelY });
					blockCssObj[navLabelSelector] = navLabelY;
				}

				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[iconSelector] = iconY;
				}

				if (iconToggleX != undefined) {
					var iconToggleY = { ...iconToggleX, options: iconToggle.options };
					setAttributes({ iconToggle: iconToggleY });
					blockCssObj[iconToggleSelector] = iconToggleY;
				}

				if (panelWrapX != undefined) {
					var panelWrapY = { ...panelWrapX, options: panelWrap.options };
					setAttributes({ panelWrap: panelWrapY });
					blockCssObj[panelWrapSelector] = panelWrapY;
				}

				if (tabsX != undefined) {
					var tabsY = { ...tabsX, options: tabs.options };
					setAttributes({ tabs: tabsY });
					blockCssObj[tabsSelector] = tabsY;
				}

				if (activeTabX != undefined) {
					var activeTabY = { ...activeTabX, options: activeTab.options };
					setAttributes({ activeTab: activeTabY });
					blockCssObj[activeTabSelector] = activeTabY;
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

		function onChangeStyleNavLabel(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, navLabel);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ navLabel: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				navLabelSelector
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

		function onRemoveStyleNavLabel(sudoScource, key) {
			var object = myStore.deletePropertyDeep(navLabel, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ navLabel: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				navLabelSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleNavLabel(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, navLabel);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ navLabel: object });
		}

		function onPickCssLibraryNavLabel(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				navLabel[sudoScource] = sudoScourceArgs;
			});

			var navLabelX = Object.assign({}, navLabel);
			setAttributes({ navLabel: navLabelX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					navLabelSelector
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

		function onChangeStylepanelWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, panelWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ panelWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				panelWrapSelector
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

		function onRemoveStylepanelWrap(sudoScource, key) {
			var object = myStore.deletePropertyDeep(panelWrap, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ panelWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				panelWrapSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStylepanelWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, panelWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ panelWrap: object });
		}

		function onPickCssLibrarypanelWrap(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				panelWrap[sudoScource] = sudoScourceArgs;
			});

			var panelWrapX = Object.assign({}, panelWrap);
			setAttributes({ panelWrap: panelWrapX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					panelWrapSelector
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

		function onChangeStyleIcon(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, icon);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ icon: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				navIconSelector
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
				navIconSelector
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
					navIconSelector
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

		function onChangeStyleNavsWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, navsWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ navsWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				navsWrapSelector
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

		function onRemoveStyleNavsWrap(sudoScource, key) {
			var object = myStore.deletePropertyDeep(navsWrap, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ navsWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				navsWrapSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleNavsWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, navsWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ navsWrap: object });
		}

		function onPickCssLibraryNavsWrap(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				navsWrap[sudoScource] = sudoScourceArgs;
			});

			var navsWrapX = Object.assign({}, navsWrap);
			setAttributes({ navsWrap: navsWrapX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					navsWrapSelector
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

		function onChangeStyleNavItem(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, navItem);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ navItem: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				navItemSelector
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

		function onRemoveStyleNavItem(sudoScource, key) {
			var object = myStore.deletePropertyDeep(navItem, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ navItem: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				navItemSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleNavItem(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, navItem);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ navItem: object });
		}

		function onPickCssLibraryNavItem(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				navItem[sudoScource] = sudoScourceArgs;
			});

			var navItemX = Object.assign({}, navItem);
			setAttributes({ navItem: navItemX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					navItemSelector
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

		function onChangeStyleActiveNavItem(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, activeNavItem);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ activeNavItem: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				activeNavItemSelector
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

		function onRemoveStyleActiveNavItem(sudoScource, key) {
			var object = myStore.deletePropertyDeep(activeNavItem, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ activeNavItem: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				activeNavItemSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleActiveNavItem(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, activeNavItem);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ activeNavItem: object });
		}

		function onPickCssLibraryActiveNavItem(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				activeNavItem[sudoScource] = sudoScourceArgs;
			});

			var activeNavItemX = Object.assign({}, activeNavItem);
			setAttributes({ activeNavItem: activeNavItemX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					activeNavItemSelector
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

		// add bulk style start

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

		function onBulkAddNavsWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, navsWrap);
			obj[sudoScource] = cssObj;

			setAttributes({ navsWrap: obj });

			var selector = myStore.getElementSelector(sudoScource, navsWrapSelector);
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

		function onBulkAddNavItem(sudoScource, cssObj) {
			let obj = Object.assign({}, navItem);
			obj[sudoScource] = cssObj;

			setAttributes({ navItem: obj });

			var selector = myStore.getElementSelector(sudoScource, navItemSelector);
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

		function onBulkAddActiveNavItem(sudoScource, cssObj) {
			let obj = Object.assign({}, activeNavItem);
			obj[sudoScource] = cssObj;

			setAttributes({ activeNavItem: obj });

			var selector = myStore.getElementSelector(
				sudoScource,
				activeNavItemSelector
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

		function onBulkAddNavLabel(sudoScource, cssObj) {
			let obj = Object.assign({}, navLabel);
			obj[sudoScource] = cssObj;

			setAttributes({ navLabel: obj });

			var selector = myStore.getElementSelector(sudoScource, navLabelSelector);
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

		function onBulkAddPanelWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, panelWrap);
			obj[sudoScource] = cssObj;

			setAttributes({ panelWrap: obj });

			var selector = myStore.getElementSelector(sudoScource, panelWrapSelector);
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

		// add bulk style end

		// reset bulk style start

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

		function onResetNavsWrap(sudoScources) {
			let obj = Object.assign({}, navsWrap);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						navsWrapSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ navsWrap: obj });
		}

		function onResetNavItem(sudoScources) {
			let obj = Object.assign({}, navItem);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						navItemSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ navItem: obj });
		}

		function onResetActiveNavItem(sudoScources) {
			let obj = Object.assign({}, activeNavItem);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						activeNavItemSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ activeNavItem: obj });
		}

		function onResetNavLabel(sudoScources) {
			let obj = Object.assign({}, navLabel);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						navLabelSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ navLabel: obj });
		}

		function onResetPanelWrap(sudoScources) {
			let obj = Object.assign({}, panelWrap);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						panelWrapSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ panelWrap: obj });
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
						navIconSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ icon: obj });
		}

		// reset bulk style end

		const ALLOWED_BLOCKS = ["post-grid/tabs-nested-item"];

		const MY_TEMPLATE = [
			["post-grid/tabs-nested-item", {}],
			["post-grid/tabs-nested-item", {}],
		];

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class} `,
		});

		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			allowedBlocks: ALLOWED_BLOCKS,
			__experimentalDirectInsert: true,
			//template: MY_TEMPLATE,
			templateInsertUpdatesSelection: true,
		});

		const setActiveTab = (uid) => {
			setAttributes({ activeTab: uid });
			//const parentBlock = select("core/block-editor").getBlock(clientId);

			// parentBlock.innerBlocks.forEach((innerBlock) => {
			// 	dispatch("core/block-editor").updateBlockAttributes(
			// 		innerBlock.clientId,
			// 		{
			// 			activeTab: uid,
			// 		}
			// 	);
			// });
		};

		const addNewTab = () => {
			const tab = createBlock("post-grid/tabs-nested-item");

			const position = tabs.length;
			dispatch("core/block-editor").insertBlock(tab, position, clientId);
			wp.data.dispatch("core/block-editor").selectBlock(clientId);
			setAttributes({
				tabs: [
					...tabs,
					{
						uid: tab.clientId,
						title: `Tab ${tabs.length + 1}`,
						icon: {
							library: "fontAwesome",
							srcType: "class",
							/*class, html, img, svg */ iconSrc: "",
						},
					},
				],
			});
			//setActiveTab(now);
		};

		const tabTitleChange = (newValue) => {
			setAttributes({
				tabs: [
					...tabs.map((t) => {
						return t.uid === activeTab
							? {
									...t,
									title: newValue,
							  }
							: t;
					}),
				],
			});
		};

		useEffect(() => {
			if (tabs.length && !activeTab) {
				//setActiveTab(tabs[0].uid);
			}
		}, [tabs]);

		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div
							className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-800 text-white font-medium rounded hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700 mx-3"
							// className="bg-blue-600 mx-3 my-2 cursor-pointer hover:text-white font-bold text-[16px] px-5 py-2 block text-center text-white rounded"
							onClick={(ev) => {
								addNewTab();
							}}>
							Add Item
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
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Navs Wrapper"
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
								<PGtab name="options"></PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={navsWrap}
										onChange={onChangeStyleNavsWrap}
										onAdd={onAddStyleNavsWrap}
										onRemove={onRemoveStyleNavsWrap}
										onBulkAdd={onBulkAddNavsWrap}
										onReset={onResetNavsWrap}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={navsWrap}
										onChange={onPickCssLibraryNavsWrap}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Nav Item"
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
								<PGtab name="options"></PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={navItem}
										onChange={onChangeStyleNavItem}
										onAdd={onAddStyleNavItem}
										onRemove={onRemoveStyleNavItem}
										onBulkAdd={onBulkAddNavItem}
										onReset={onResetNavItem}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={navItem}
										onChange={onPickCssLibraryNavItem}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Active Nav Item"
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
								<PGtab name="options"></PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={activeNavItem}
										onChange={onChangeStyleActiveNavItem}
										onAdd={onAddStyleActiveNavItem}
										onRemove={onRemoveStyleActiveNavItem}
										onBulkAdd={onBulkAddActiveNavItem}
										onReset={onResetActiveNavItem}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={activeNavItem}
										onChange={onPickCssLibraryActiveNavItem}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Nav Label"
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
								<PGtab name="options"></PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={navLabel}
										onChange={onChangeStyleNavLabel}
										onAdd={onAddStyleNavLabel}
										onRemove={onRemoveStyleNavLabel}
										onBulkAdd={onBulkAddNavLabel}
										onReset={onResetNavLabel}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={navLabel}
										onChange={onPickCssLibraryNavLabel}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Content Wrap"
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
								<PGtab name="options"></PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={panelWrap}
										onChange={onChangeStylepanelWrap}
										onAdd={onAddStylepanelWrap}
										onRemove={onRemoveStylepanelWrap}
										onBulkAdd={onBulkAddPanelWrap}
										onReset={onResetPanelWrap}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={panelWrap}
										onChange={onPickCssLibrarypanelWrap}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Nav Icon"
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
									{/* <PanelRow>
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
											Icon position
										</label>

										<SelectControl
											label=""
											value={icon.options.position}
											options={[
												{ label: "Choose Position", value: "" },
												{ label: "Before", value: "before" },
												{ label: "After", value: "after" },
											]}
											onChange={(newVal) => {
												var options = { ...icon.options, position: newVal };
												setAttributes({ icon: { ...icon, options: options } });
											}}
										/>
									</PanelRow> */}

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
												{ label: "Before", value: "before" },
												{ label: "After", value: "after" },
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

						<PanelBody
							className="font-medium text-slate-900 "
							title="Block Variations"
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={"tabs-nested"}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
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
						<div className="px-3">
							<PGTutorials slug="tabs-nested" />
						</div>
					</div>
				</InspectorControls>

				{!hasInnerBlocks && (
					<div {...innerBlocksProps} className="flex justify-center my-4">
						<div className="border border-solid border-gray-300 w-[95%] rounded-md p-5">
							<div className="flex justify-between mb-5">
								<div className="text-xl rounded-sm">
									Click to pick a variation
								</div>

								<div
									className="pg-bg-color rounded-sm px-4 py-1 font-semibold text-lg text-white cursor-pointer"
									onClick={(ev) => {
										replaceInnerBlocks(
											clientId,
											createBlocksFromInnerBlocksTemplate([
												["post-grid/tabs-nested-item", {}],
											]),
											true
										);
									}}>
									Skip
								</div>
							</div>

							<div className="">
								<PGBlockVariationsPicker
									blockName={"tabs-nested"}
									blockId={blockId}
									clientId={clientId}
									onChange={onPickBlockVariation}
								/>
								{/* {variations.map((variation) => {
									return (
										<div
											className="text-center inline-block m-4 w-32 align-top p-4 bg-gray-400 cursor-pointer hover:bg-gray-500 relative"
											onClick={(ev) => {
												if (variation.isPro) {
													alert(
														"Sorry this variation only available in pro version"
													);
													return false;
												}

												var atts = variation.atts;

												var wrapper = { ...atts.wrapper };
												var navsWrap = { ...atts.navsWrap };
												var navItem = { ...atts.navItem };
												var activeNavItem = { ...atts.activeNavItem };
												var panelWrap = { ...atts.panelWrap };
												var navLabel = { ...atts.navLabel };
												var labelCounter = { ...atts.labelCounter };
												var icon = { ...atts.icon };
												var iconToggle = { ...atts.iconToggle };
												var blockCssY = { ...atts.blockCssY };

												var blockCssObj = {};

												blockCssObj[wrapperSelector] = wrapper;
												blockCssObj[activeNavItemSelector] = activeNavItem;
												blockCssObj[panelWrapSelector] = panelWrap;
												blockCssObj[navLabelSelector] = navLabel;
												blockCssObj[navsWrapSelector] = navsWrap;
												blockCssObj[navItemSelector] = navItem;
												blockCssObj[navIconSelector] = icon;
												blockCssObj[iconToggleSelector] = iconToggle;

												setAttributes({
													wrapper: wrapper,
													navsWrap: navsWrap,
													navItem: navItem,
													activeNavItem: activeNavItem,
													panelWrap: panelWrap,
													navLabel: navLabel,
													icon: icon,
													iconToggle: iconToggle,
												});

												var blockCssRules =
													myStore.getBlockCssRules(blockCssObj);

												var items = blockCssRules;

												setAttributes({ blockCssY: { items: items } });

												var innerBlocksTemplate =
													createBlocksFromInnerBlocksTemplate(
														variation.innerBlocks
													);
												replaceInnerBlocks(clientId, innerBlocksTemplate, true);

												setAttributes({
													tabs: [
														...tabs,
														{
															
															uid: innerBlocksTemplate[0].attributes.uid,
															title: `Tab ${tabs.length + 1}`,
															icon: {
																library: "fontAwesome",
																srcType: "class",
																iconSrc: "",
															},
														},
													],
												});

												setActiveTab(innerBlocksTemplate[0].attributes.uid);
												
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
															x.label
														}>
														Pro
													</a>
												</span>
											)}
										</div>

									);
								})} */}
							</div>
						</div>
					</div>
				)}

				{hasInnerBlocks && (
					<div {...innerBlocksProps}>
						<div className={" navs-wrapper  "}>
							{tabs.map((tab, index) => {
								return (
									<div
										key={tab.uid}
										className={` ${
											tab.uid === activeTab
												? "  nav-item-active nav-item "
												: `nav-item pg${tab.uid.split("-").pop()}-nav-item`
										}`}
										role="tab"
										tabIndex={index}
										onClick={() => setActiveTab(tab.uid)}>
										{icon.options.position == "before" && (
											<>
												{tab.uid == activeTab ? (
													<>
														{(tab.iconToggle?.iconSrc != undefined ||
															tab.iconToggle?.iconSrc.length != 0) && (
															<div
																className="nav-icon"
																onClick={(ev) => {
																	setIconPickerIndex(index);
																	setIconPickerEnable(!iconPickerEnable);
																}}>
																<span
																	className={
																		iconToggle.options?.iconSrc
																	}></span>
															</div>
														)}
													</>
												) : (
													<>
														{(tab.icon.iconSrc != undefined ||
															tab.icon.iconSrc.length != 0) && (
															<div
																className="nav-icon"
																onClick={(ev) => {
																	setIconPickerIndex(index);
																	setIconPickerEnable(!iconPickerEnable);
																}}>
																<span className={icon.options.iconSrc}></span>
															</div>
														)}
													</>
												)}

												{iconPickerEnable && iconPickerIndex != index && (
													<div
														className="nav-icon"
														onClick={(ev) => {
															setIconPickerIndex(index);
															setIconPickerEnable(!iconPickerEnable);
														}}>
														<span className={tab.icon.iconSrc}></span>
													</div>
												)}

												{iconPickerIndex == index && iconPickerEnable && (
													<PGIconPicker
														library={tab.icon.library}
														srcType={tab.icon.srcType}
														iconSrc={tab.icon.iconSrc}
														onChange={(arg) => {
															tabs[index].icon = {
																srcType: arg.srcType,
																library: arg.library,
																iconSrc: arg.iconSrc,
															};
															setAttributes({ tabs: tabs });
															setIconPickerEnable(!iconPickerEnable);
															setIconPickerIndex(99);
														}}
													/>
												)}
											</>
										)}

										<RichText
											className=" nav-label"
											tagName="div"
											value={tab.title}
											onChange={tabTitleChange}
										/>

										{icon.options.position == "after" && (
											<>
												{tab.icon.iconSrc == undefined ||
													(tab.icon.iconSrc.length == 0 && (
														<div
															className="nav-icon"
															onClick={(ev) => {
																setIconPickerIndex(index);
																setIconPickerEnable(!iconPickerEnable);
															}}>
															<span className={icon.options.iconSrc}></span>
														</div>
													))}

												{/* {!iconPickerEnable && (
                          <div className='nav-icon' onClick={ev => {
                            setIconPickerIndex(index)
                            setIconPickerEnable(!iconPickerEnable)
                          }}>
                            <span className={tab.icon.iconSrc} ></span>
                          </div>
                        )} */}

												{iconPickerEnable && iconPickerIndex != index && (
													<div
														className="nav-icon"
														onClick={(ev) => {
															setIconPickerIndex(index);
															setIconPickerEnable(!iconPickerEnable);
														}}>
														<span className={tab.icon.iconSrc}></span>
													</div>
												)}

												{iconPickerIndex == index && iconPickerEnable && (
													<PGIconPicker
														library={tab.icon.library}
														srcType={tab.icon.srcType}
														iconSrc={tab.icon.iconSrc}
														onChange={(arg) => {
															tabs[index].icon = {
																srcType: arg.srcType,
																library: arg.library,
																iconSrc: arg.iconSrc,
															};
															setAttributes({ tabs: tabs });
															setIconPickerEnable(!iconPickerEnable);
															setIconPickerIndex(99);
														}}
													/>
												)}
											</>
										)}

										<Icon
											fill="red"
											icon={close}
											onClick={(ev) => {
												var tabX = [...tabs];
												tabX.splice(index, 1);
												setAttributes({ tabs: tabX });
												dispatch("core/block-editor").removeBlock(
													tabs[index].uid
												);

												setActiveTab(tabX[0].uid);
											}}
										/>
									</div>
								);
							})}
							<div className="nav-item " onClick={addNewTab}>
								<div className="nav-icon">
									<Icon fill="#ddd" icon={plus} />
								</div>
							</div>
						</div>
						<div className={"panels-wrap"}>
							<InnerBlocks
								allowedBlocks={["post-grid/tabs-nested-item"]}
								renderAppender={false}
							/>
						</div>
					</div>
				)}
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file

		var attributes = props.attributes;

		var blockId = attributes.blockId;
		var wrapper = attributes.wrapper;

		const blockProps = useBlockProps.save({
			className: ` ${blockId} {wrapper.options.class}`,
		});

		return <InnerBlocks.Content />;

		//return null;
	},
});
