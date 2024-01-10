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
	Tooltip,
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

import { createBlocksFromInnerBlocksTemplate } from "@wordpress/blocks";

import {
	Icon,
	styles,
	settings,
	link,
	linkOff,
	brush,
	mediaAndText,
} from "@wordpress/icons";
import { __experimentalBlockVariationPicker as BlockVariationPicker } from "@wordpress/block-editor";

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
import { __experimentalScrollable as Scrollable } from "@wordpress/components";

import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";

import variations from "./variations";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import PGCssLibrary from "../../components/css-library";
import PGIconPicker from "../../components/icon-picker";
import PGLibraryBlockVariations from "../../components/library-block-variations";

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
				<path
					d="M156.157 140.406H3.84337C1.73741 140.406 0 138.972 0 137.235V40.8954C0 39.158 1.73741 37.7246 3.84337 37.7246H156.157C158.263 37.7246 160 39.158 160 40.8954V137.235C160 138.972 158.263 140.406 156.157 140.406Z"
					fill="url(#paint0_linear_61_753)"
				/>
				<rect
					x="118.334"
					y="19.2207"
					width="36.9115"
					height="36.9115"
					rx="5.42816"
					fill="#C15940"
				/>
				<path
					d="M138.572 37.6653L149.456 27.6971C149.938 27.2561 149.938 26.5062 149.456 26.0652C148.975 25.6241 148.156 25.6241 147.674 26.0652L136.79 36.0333L125.905 26.0652C125.424 25.6241 124.605 25.6241 124.123 26.0652C123.642 26.5062 123.642 27.2561 124.123 27.6971L135.008 37.6653L124.123 47.6335C123.642 48.0745 123.642 48.8244 124.123 49.2654C124.364 49.486 124.701 49.6183 124.99 49.6183C125.279 49.6183 125.616 49.486 125.857 49.2654L136.742 39.2973L147.626 49.2654C147.867 49.486 148.204 49.6183 148.493 49.6183C148.83 49.6183 149.119 49.486 149.36 49.2654C149.841 48.8244 149.841 48.0745 149.36 47.6335L138.572 37.6653Z"
					fill="white"
				/>
				<path
					d="M100.404 102.597H19.7388V112.259H100.404V102.597Z"
					fill="#C15940"
				/>
				<path
					d="M100.404 79.7988H19.7388V89.4609H100.404V79.7988Z"
					fill="#C15940"
				/>
				<path
					d="M100.404 56.1323H20.1328V66.9886H100.404V56.1323Z"
					fill="#C15940"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_753"
						x1="0"
						y1="89.0652"
						x2="160"
						y2="89.0652"
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
		var menuWrap = attributes.menuWrap;
		var subMenuWrap = attributes.subMenuWrap;

		var link = attributes.link;
		var icon = attributes.icon;

		var blockCssY = attributes.blockCssY;

		var postId = context["postId"];
		var postType = context["postType"];

		var breakPointX = myStore.getBreakPoint();

		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
		var menuWrapSelector = blockClass + " .pg-menu";
		var subMenuWrapSelector = blockClass + " .pg-sub-menu";

		const iconSelector = blockClass + " .pg-menu-icon";
		const linkSelector = blockClass + " .pg-menu-link";

		const { replaceInnerBlocks } = useDispatch(blockEditorStore);

		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });

			myStore.generateBlockCss(blockCssY.items, blockId);

			// blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'display': { "Desktop": "flex" } };
			//blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'gap': { "Desktop": "1em" } };

			setAttributes({ blockCssY: { items: blockCssY.items } });

			//setAttributes({ wrapper: { ...wrapper, styles: { display: { Desktop: 'flex' }, gap: { Desktop: '20px' } } } });
		}, [clientId]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[menuWrapSelector] = menuWrap;
			blockCssObj[subMenuWrapSelector] = subMenuWrap;
			blockCssObj[iconSelector] = icon;
			blockCssObj[linkSelector] = link;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = { ...blockCssY.items, ...blockCssRules };
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

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
				var menuWrapX = attributes.menuWrap;
				var subMenuWrapX = attributes.subMenuWrap;
				var blockCssY = attributes.blockCssY;

				var blockCssObj = {};

				if (subMenuWrapX != undefined) {
					var subMenuWrapY = { ...subMenuWrapX, options: subMenuWrap.options };
					setAttributes({ subMenuWrap: subMenuWrapY });
					blockCssObj[subMenuWrapSelector] = subMenuWrapY;
				}

				if (menuWrapX != undefined) {
					var menuWrapY = { ...menuWrapX, options: menuWrap.options };
					setAttributes({ menuWrap: menuWrapY });
					blockCssObj[menuWrapSelector] = menuWrapY;
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

		function applyFlex(attr, newVal) {
			onChangeStyleWrapper("styles", newVal, attr);
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

		//
		function onChangeStyleMenuWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, menuWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ menuWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				menuWrapSelector
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

		function onRemoveStyleMenuWrap(sudoScource, key) {
			var object = myStore.deletePropertyDeep(menuWrap, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ menuWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				menuWrapSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleMenuWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, menuWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ menuWrap: object });
		}

		function onBulkAddMenuWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, menuWrap);
			obj[sudoScource] = cssObj;

			setAttributes({ menuWrap: obj });

			var selector = myStore.getElementSelector(sudoScource, menuWrapSelector);
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

		function onChangeStyleSubMenuWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, subMenuWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ subMenuWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				subMenuWrapSelector
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

		function onRemoveStyleSubMenuWrap(sudoScource, key) {
			var object = myStore.deletePropertyDeep(subMenuWrap, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ subMenuWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				subMenuWrapSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleSubMenuWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, subMenuWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ subMenuWrap: object });
		}

		function onBulkAddSubMenuWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, subMenuWrap);
			obj[sudoScource] = cssObj;

			setAttributes({ subMenuWrap: obj });

			var selector = myStore.getElementSelector(
				sudoScource,
				subMenuWrapSelector
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

		//
		function onChangeStyleLink(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, link);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ link: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				linkSelector
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

		function onRemoveStyleLink(sudoScource, key) {
			var object = myStore.deletePropertyDeep(link, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ link: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				linkSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleLink(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, link);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ link: object });
		}

		function onBulkAddLink(sudoScource, cssObj) {
			let obj = Object.assign({}, link);
			obj[sudoScource] = cssObj;

			setAttributes({ link: obj });

			var selector = myStore.getElementSelector(sudoScource, linkSelector);
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

		//
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

		const addChild = () => {
			var childBlocks = wp.data.select(blockEditorStore).getBlocks(clientId);

			const slide = createBlock("post-grid/menu-wrap-item");
			const position = childBlocks.length;
			dispatch("core/block-editor").insertBlock(slide, position, clientId);

			wp.data.dispatch("core/block-editor").selectBlock(clientId);
			//setActiveTab(slide.clientId);
		};

		const ALLOWED_BLOCKS = ["post-grid/menu-wrap-item"];

		const MY_TEMPLATE = [
			["post-grid/menu-wrap-item", {}],
			["post-grid/menu-wrap-item", {}],
			["post-grid/menu-wrap-item", {}],
		];

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class} `,
		});

		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			allowedBlocks: ALLOWED_BLOCKS,
			//template: MY_TEMPLATE,
			orientation: "horizontal",
			templateInsertUpdatesSelection: true,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		});

		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div
							className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-800 text-white font-medium rounded hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700 mx-3"
							// className="bg-blue-600 mx-3 my-2 cursor-pointer hover:text-white font-bold text-[16px] px-5 py-2 block text-center text-white rounded"
							onClick={(ev) => {
								addChild();
							}}>
							Add Item
						</div>
						<PanelBody
							className="font-medium text-slate-900 "
							title="Flex Options"
							initialOpen={true}>
							<label for="" className="font-medium text-slate-900 block my-3">
								Justify Content
							</label>
							<div className="!grid !grid-cols-4 place-items-center gap-3">
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px] ${
										wrapper.styles.justifyContent == undefined
											? "bg-[#5655ff]"
											: wrapper.styles.justifyContent[breakPointX] ==
											  "flex-start"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
									}`}
									onClick={(ev) => {
										applyFlex("justifyContent", "flex-start");
									}}>
									<Tooltip text="Flex Start">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="5.5"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="11.44"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="17.39"
												y="5.5"
												width="3.67"
												height="25"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px] ${
										wrapper.styles.justifyContent == undefined
											? "bg-[#5655ff]"
											: wrapper.styles.justifyContent[breakPointX] == "flex-end"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
									}`}
									onClick={(ev) => {
										applyFlex("justifyContent", "flex-end");
									}}>
									<Tooltip text="Flex End">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="14.94"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="20.88"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="26.83"
												y="5.5"
												width="3.67"
												height="25"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px] ${
										wrapper.styles.justifyContent == undefined
											? "bg-[#5655ff]"
											: wrapper.styles.justifyContent[breakPointX] == "center"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
									}`}
									onClick={(ev) => {
										applyFlex("justifyContent", "center");
									}}>
									<Tooltip text="Center">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="10.22"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="22.11"
												y="5.5"
												width="3.67"
												height="25"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px] ${
										wrapper.styles.justifyContent == undefined
											? "bg-[#5655ff]"
											: wrapper.styles.justifyContent[breakPointX] ==
											  "space-between"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
									}`}
									onClick={(ev) => {
										applyFlex("justifyContent", "space-between");
									}}>
									<Tooltip text="Space Between">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="5.5"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="26.83"
												y="5.5"
												width="3.67"
												height="25"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px] ${
										wrapper.styles.justifyContent == undefined
											? "bg-[#5655ff]"
											: wrapper.styles.justifyContent[breakPointX] ==
											  "space-around"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
									}`}
									onClick={(ev) => {
										applyFlex("justifyContent", "space-around");
									}}>
									<Tooltip text="Space Around">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="7.34"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="16.12"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="24.9"
												y="5.5"
												width="3.67"
												height="25"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px] ${
										wrapper.styles.justifyContent == undefined
											? "bg-[#5655ff]"
											: wrapper.styles.justifyContent[breakPointX] ==
											  "space-evenly"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
									}`}
									onClick={(ev) => {
										applyFlex("justifyContent", "space-evenly");
									}}>
									<Tooltip text="Space Evenly">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="9.12"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="23.2"
												y="5.5"
												width="3.67"
												height="25"
											/>
										</svg>
									</Tooltip>
								</div>
							</div>

							<label for="" className="font-medium text-slate-900 my-3 block">
								Align Items
							</label>

							<div className="!grid !grid-cols-4 place-items-center gap-3">
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px] ${
										wrapper.styles.alignItems == undefined
											? "bg-[#5655ff]"
											: wrapper.styles.alignItems[breakPointX] == "flex-start"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
									}`}
									onClick={(ev) => {
										applyFlex("alignItems", "flex-start");
									}}>
									<Tooltip text="Flex Start">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="9.12"
												y="5.5"
												width="3.67"
												height="8.88"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="5.5"
												width="3.67"
												height="16.42"
											/>
											<rect
												fill="#fff"
												x="23.2"
												y="5.5"
												width="3.67"
												height="12.5"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px] ${
										wrapper.styles.alignItems == undefined
											? "bg-[#5655ff]"
											: wrapper.styles.alignItems[breakPointX] == "flex-end"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
									}`}
									onClick={(ev) => {
										applyFlex("alignItems", "flex-end");
									}}>
									<Tooltip text="Flex End">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="23.2"
												y="21.62"
												width="3.67"
												height="8.88"
												transform="translate(50.08 52.12) rotate(180)"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="14.08"
												width="3.67"
												height="16.42"
												transform="translate(36 44.58) rotate(180)"
											/>
											<rect
												fill="#fff"
												x="9.12"
												y="18"
												width="3.67"
												height="12.5"
												transform="translate(21.92 48.5) rotate(180)"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px] ${
										wrapper.styles.alignItems == undefined
											? "bg-[#5655ff]"
											: wrapper.styles.alignItems[breakPointX] == "center"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
									}`}
									onClick={(ev) => {
										applyFlex("alignItems", "center");
									}}>
									<Tooltip text="Center">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="23.2"
												y="13.56"
												width="3.67"
												height="8.88"
												transform="translate(50.08 36) rotate(180)"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="9.79"
												width="3.67"
												height="16.42"
												transform="translate(36 36) rotate(180)"
											/>
											<rect
												fill="#fff"
												x="9.12"
												y="13.56"
												width="3.67"
												height="8.88"
												transform="translate(21.92 36) rotate(180)"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px] ${
										wrapper.styles.alignItems == undefined
											? "bg-[#5655ff]"
											: wrapper.styles.alignItems[breakPointX] == "stretch"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
									}`}
									onClick={(ev) => {
										applyFlex("alignItems", "stretch");
									}}>
									<Tooltip text="Stretch">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="23.2"
												y="9.79"
												width="3.67"
												height="16.42"
												transform="translate(50.08 36) rotate(180)"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="9.79"
												width="3.67"
												height="16.42"
												transform="translate(36 36) rotate(180)"
											/>
											<rect
												fill="#fff"
												x="9.12"
												y="9.79"
												width="3.67"
												height="16.42"
												transform="translate(21.92 36) rotate(180)"
											/>
										</svg>
									</Tooltip>
								</div>
							</div>

							<label for="" className="font-medium text-slate-900 my-3 block">
								Flex Direction
							</label>

							<div className="!grid !grid-cols-4 place-items-center gap-3">
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px] ${
										wrapper.styles.flexDirection == undefined
											? "bg-[#5655ff]"
											: wrapper.styles.flexDirection[breakPointX] == "row"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
									}`}
									onClick={(ev) => {
										applyFlex("flexDirection", "row");
									}}>
									<Tooltip text="Row">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="5.5"
												y="9.52"
												width="3.67"
												height="16.42"
											/>
											<polygon
												fill="#fff"
												points="24.95 12.19 23.25 13.85 25.93 16.51 13.19 16.51 12.33 16.5 12.31 18.91 25.95 18.91 23.29 21.57 24.95 23.27 30.5 17.73 24.95 12.19"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px] ${
										wrapper.styles.flexDirection == undefined
											? "bg-[#5655ff]"
											: wrapper.styles.flexDirection[breakPointX] ==
											  "row-reverse"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
									}`}
									onClick={(ev) => {
										applyFlex("flexDirection", "row-reverse");
									}}>
									<Tooltip text="Row Reverse">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="26.83"
												y="9.52"
												width="3.67"
												height="16.42"
												transform="translate(57.33 35.45) rotate(-180)"
											/>
											<polygon
												fill="#fff"
												points="11.05 12.19 12.75 13.85 10.07 16.51 22.81 16.51 23.67 16.5 23.69 18.91 10.04 18.91 12.71 21.57 11.05 23.27 5.5 17.73 11.05 12.19"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px] ${
										wrapper.styles.flexDirection == undefined
											? "bg-[#5655ff]"
											: wrapper.styles.flexDirection[breakPointX] == "column"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
									}`}
									onClick={(ev) => {
										applyFlex("flexDirection", "column");
									}}>
									<Tooltip text="Column">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="20.45"
												width="3.67"
												height="16.42"
												transform="translate(-10.66 46.66) rotate(-90)"
											/>
											<polygon
												fill="#fff"
												points="23.54 11.05 21.88 12.75 19.21 10.07 19.21 22.81 19.22 23.67 16.82 23.69 16.81 10.04 14.16 12.71 12.46 11.05 18 5.5 23.54 11.05"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px] ${
										wrapper.styles.flexDirection == undefined
											? "bg-[#5655ff]"
											: wrapper.styles.flexDirection[breakPointX] ==
											  "column-reverse"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
									}`}
									onClick={(ev) => {
										applyFlex("flexDirection", "column-reverse");
									}}>
									<Tooltip text="Column-reverse">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="-0.87"
												width="3.67"
												height="16.42"
												transform="translate(25.34 -10.66) rotate(90)"
											/>
											<polygon
												fill="#fff"
												points="12.46 24.95 14.13 23.25 16.79 25.93 16.79 13.19 16.78 12.33 19.18 12.31 19.19 25.95 21.84 23.29 23.54 24.95 18 30.5 12.46 24.95"
											/>
										</svg>
									</Tooltip>
								</div>
							</div>

							<label for="" className="font-medium text-slate-900 my-3 block">
								Flex Wrap
							</label>

							<div className="!grid !grid-cols-4 place-items-center gap-3">
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px] ${
										wrapper.styles.flexWrap == undefined
											? "bg-[#5655ff]"
											: wrapper.styles.flexWrap[breakPointX] == "wrap"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
									}`}
									onClick={(ev) => {
										applyFlex("flexWrap", "wrap");
									}}>
									<Tooltip text="Wrap">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="6.08"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="1.95"
												width="3.67"
												height="25"
												transform="translate(32.45 -3.55) rotate(90)"
											/>
											<polygon
												fill="#fff"
												points="16.79 18.15 15.81 19.11 17.35 20.65 6.01 20.65 5.51 20.64 5.5 22.03 17.37 22.03 15.83 23.56 16.79 24.54 19.99 21.35 16.79 18.15"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px] ${
										wrapper.styles.flexWrap == undefined
											? "bg-[#5655ff]"
											: wrapper.styles.flexWrap[breakPointX] == "wrap-reverse"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
									}`}
									onClick={(ev) => {
										applyFlex("flexWrap", "wrap-reverse");
									}}>
									<Tooltip text="Wrap Reverse">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="6.08"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="10.21"
												width="3.67"
												height="25"
												transform="translate(40.71 4.71) rotate(90)"
											/>
											<polygon
												fill="#fff"
												points="8.7 19.01 9.68 18.05 8.14 16.51 19.48 16.51 19.98 16.51 19.99 15.13 8.12 15.12 9.66 13.6 8.7 12.61 5.5 15.81 8.7 19.01"
											/>
										</svg>
									</Tooltip>
								</div>

								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px] ${
										wrapper.styles.flexWrap == undefined
											? "bg-[#5655ff]"
											: wrapper.styles.flexWrap[breakPointX] == "nowrap"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
									}`}
									onClick={(ev) => {
										applyFlex("flexWrap", "nowrap");
									}}>
									<Tooltip text="No Wrap">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="6.08"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="5.5"
												width="3.67"
												height="25"
												transform="translate(36) rotate(90)"
											/>
										</svg>
									</Tooltip>
								</div>
							</div>
						</PanelBody>

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
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Menu Wrap"
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
									<PanelRow className="pg-setting-input-text">
										<label
											for=""
											className="font-medium text-slate-900 pg-font ">
											Menu Wrap Class
										</label>
										<InputControl
											value={menuWrap.options.class}
											onChange={(newVal) => {
												var options = { ...menuWrap.options, class: newVal };
												setAttributes({
													menuWrap: { ...menuWrap, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={menuWrap}
										onChange={onChangeStyleMenuWrap}
										onAdd={onAddStyleMenuWrap}
										onRemove={onRemoveStyleMenuWrap}
										onBulkAdd={onBulkAddMenuWrap}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Sub MenuWrap"
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
									<PanelRow className="pg-setting-input-text">
										<label
											for=""
											className="font-medium text-slate-900 pg-font ">
											Sub Menu Wrap Class
										</label>
										<InputControl
											value={subMenuWrap.options.class}
											onChange={(newVal) => {
												var options = { ...subMenuWrap.options, class: newVal };
												setAttributes({
													subMenuWrap: { ...subMenuWrap, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={subMenuWrap}
										onChange={onChangeStyleSubMenuWrap}
										onAdd={onAddStyleSubMenuWrap}
										onRemove={onRemoveStyleSubMenuWrap}
										onBulkAdd={onBulkAddSubMenuWrap}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Link"
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
										obj={link}
										onChange={onChangeStyleLink}
										onAdd={onAddStyleLink}
										onRemove={onRemoveStyleLink}
										onBulkAdd={onBulkAddLink}
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
								]}>
								<PGtab name="options"></PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={icon}
										onChange={onChangeStyleIcon}
										onAdd={onAddStyleIcon}
										onRemove={onRemoveStyleIcon}
										onBulkAdd={onBulkAddIcon}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Block Variations"
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={"menu-wrap"}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
							/>
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
						<div className="px-3">
							<PGTutorials slug="menu-wrap" />
						</div>
					</div>
				</InspectorControls>

				<>
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
													[
														"post-grid/menu-wrap-item",
														{
															wrapper: {
																options: {
																	tag: "div",
																	class: "flex-item-wrap",
																},
																styles: {
																	flexBasis: { Desktop: "0" },
																	flexGrow: { Desktop: "1" },
																},
															},
														},
													],
													[
														"post-grid/menu-wrap-item",
														{
															wrapper: {
																options: {
																	tag: "div",
																	class: "flex-item-wrap",
																},
																styles: {
																	flexBasis: { Desktop: "0" },
																	flexGrow: { Desktop: "1" },
																},
															},
														},
													],
												]),
												true
											);
										}}>
										Skip
									</div>
								</div>

								<div className="">
									<PGBlockVariationsPicker
										blockName={"menu-wrap"}
										blockId={blockId}
										clientId={clientId}
										onChange={onPickBlockVariation}
									/>
									{/* {variations.map((variation) => {
										return (
											// <div
											// 	className="text-center inline-block m-4 w-32 align-top p-4 bg-gray-400 cursor-pointer hover:bg-gray-500 relative"
											// 	onClick={(ev) => {
											// 		if (variation.isPro) {
											// 			alert(
											// 				"Sorry this variation only available in pro version"
											// 			);
											// 			return false;
											// 		}

											// 		var atts = variation.atts;

											// 		var wrapper = { ...atts.wrapper };

											// 		var blockCssY = { ...atts.blockCssY };

											// 		var blockCssObj = {};

											// 		blockCssObj[wrapperSelector] = wrapper;

											// 		setAttributes({
											// 			wrapper: wrapper,
											// 		});

											// 		var blockCssRules =
											// 			myStore.getBlockCssRules(blockCssObj);

											// 		var items = blockCssRules;

											// 		setAttributes({ blockCssY: { items: items } });

											// 		replaceInnerBlocks(
											// 			clientId,
											// 			createBlocksFromInnerBlocksTemplate(
											// 				variation.innerBlocks
											// 			),
											// 			true
											// 		);
											// 	}}>
											// 	<div>{variation.icon}</div>
											// 	<div>{variation.title}</div>

											// 	{variation.isPro && (
											// 		<span className="bg-amber-400 rounded-sm text-sm inline-block  bg-opacity-90 text-white hover:text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
											// 			<a
											// 				target="_blank"
											// 				className="block px-3"
											// 				href={
											// 					"https://pickplugins.com/post-grid/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=" +
											// 					variation.label
											// 				}>
											// 				Pro
											// 			</a>
											// 		</span>
											// 	)}
											// </div>
											
										);
									})} */}
								</div>
							</div>
						</div>
					)}

					{hasInnerBlocks && (
						<div {...innerBlocksProps}>
							<ul className={menuWrap.options.class}>
								{innerBlocksProps.children}
							</ul>
						</div>
					)}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file

		var attributes = props.attributes;
		var wrapper = attributes.wrapper;

		var blockId = attributes.blockId;

		const blockProps = useBlockProps.save({
			className: ` ${blockId} ${wrapper.options.class}`,
		});

		return <InnerBlocks.Content />;

		//return null;
	},
});
