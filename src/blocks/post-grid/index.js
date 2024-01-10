import { registerBlockType, createBlock } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import { applyFilters } from "@wordpress/hooks";

import apiFetch from "@wordpress/api-fetch";

import {
	BlockContextProvider,
	__experimentalUseBlockPreview as useBlockPreview,
} from "@wordpress/block-editor";
const { parse } = wp.blockSerializationDefaultParser;
const { RawHTML } = wp.element;
// var select = wp.data.select('core/block-editor');
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from "@wordpress/block-editor";
import {
	createElement,
	memo,
	useMemo,
	useState,
	useEffect,
} from "@wordpress/element";
import {
	PanelBody,
	RangeControl,
	Button,
	ButtonGroup,
	Panel,
	PanelRow,
	Dropdown,
	DropdownMenu,
	SelectControl,
	ColorPicker,
	ColorPalette,
	ToolsPanelItem,
	ComboboxControl,
	Spinner,
	CustomSelectControl,
	Popover,
} from "@wordpress/components";
import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	RichText,
} from "@wordpress/block-editor";
import { __experimentalInputControl as InputControl } from "@wordpress/components";

import { __experimentalBorderControl as BorderControl } from "@wordpress/components";

import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { createBlocksFromInnerBlocksTemplate } from "@wordpress/blocks";

import { useSelect, select, useDispatch, dispatch } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import {
	Icon,
	close,
	settings,
	cloud,
	pencil,
	styles,
	brush,
	menu,
	mediaAndText,
} from "@wordpress/icons";

import PGIconPicker from "../../components/icon-picker";

import paginationTypes from "./pagination-types";

import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";
import PGStyles from "../../components/styles";
import PGTutorials from "../../components/tutorials";

import PGLibraryBlockVariations from "../../components/library-block-variations";

import breakPoints from "../../breakpoints";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGCssLibrary from "../../components/css-library";

const ALLOWED_MEDIA_TYPES = ["image"];
import metadata from "./block.json";
import PGcssClassPicker from "../../components/css-class-picker";
import customTags from "../../custom-tags";
import variations from "./variations";

import { ReactSortable } from "react-sortablejs";
import PGBlockVariationsPicker from "../../components/block-variations-picker";

// var queryPramsX = queryPrams.map((x, i) => {

//   return { value: i, label: x.label, description: x.description, isPro: x.isPro, }
// })

var myStore = wp.data.select("postgrid-shop");

registerBlockType(metadata, {
	icon: {
		background: "#fff",
		foreground: "#fff",
		src: (
			<svg
				width="160"
				height="160"
				viewBox="0 0 160 160"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M61.1765 15H4.70588C3.4578 15 2.26085 15.4958 1.37832 16.3783C0.495798 17.2608 0 18.4578 0 19.7059V66.7647C0 68.0128 0.495798 69.2097 1.37832 70.0923C2.26085 70.9748 3.4578 71.4706 4.70588 71.4706H61.1765C62.4246 71.4706 63.6215 70.9748 64.504 70.0923C65.3866 69.2097 65.8824 68.0128 65.8824 66.7647V19.7059C65.8824 18.4578 65.3866 17.2608 64.504 16.3783C63.6215 15.4958 62.4246 15 61.1765 15ZM56.4706 62.0588H9.41177V24.4118H56.4706V62.0588Z"
					fill="url(#paint0_linear_62_34)"
				/>
				<path
					d="M160 29.1177H84.7061V38.5294H160V29.1177Z"
					fill="url(#paint1_linear_62_34)"
				/>
				<path
					d="M141.177 47.9414H84.7061V57.3532H141.177V47.9414Z"
					fill="url(#paint2_linear_62_34)"
				/>
				<path
					d="M61.1765 89H4.70588C3.4578 89 2.26085 89.4958 1.37832 90.3783C0.495798 91.2608 0 92.4578 0 93.7059V140.765C0 142.013 0.495798 143.21 1.37832 144.092C2.26085 144.975 3.4578 145.471 4.70588 145.471H61.1765C62.4246 145.471 63.6215 144.975 64.504 144.092C65.3866 143.21 65.8824 142.013 65.8824 140.765V93.7059C65.8824 92.4578 65.3866 91.2608 64.504 90.3783C63.6215 89.4958 62.4246 89 61.1765 89ZM56.4706 136.059H9.41177V98.4118H56.4706V136.059Z"
					fill="url(#paint3_linear_62_34)"
				/>
				<path
					d="M160 103.118H84.7061V112.529H160V103.118Z"
					fill="url(#paint4_linear_62_34)"
				/>
				<path
					d="M141.177 121.941H84.7061V131.353H141.177V121.941Z"
					fill="url(#paint5_linear_62_34)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_62_34"
						x1="0"
						y1="43.2353"
						x2="65.8824"
						y2="43.2353"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_62_34"
						x1="84.7061"
						y1="33.8236"
						x2="160"
						y2="33.8236"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_62_34"
						x1="84.7061"
						y1="52.6473"
						x2="141.177"
						y2="52.6473"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_62_34"
						x1="0"
						y1="117.235"
						x2="65.8824"
						y2="117.235"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_62_34"
						x1="84.7061"
						y1="107.824"
						x2="160"
						y2="107.824"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_62_34"
						x1="84.7061"
						y1="126.647"
						x2="141.177"
						y2="126.647"
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
		var clientId = props.clientId;

		var setAttributes = props.setAttributes;

		var lazyLoad = attributes.lazyLoad;
		var container = attributes.container;

		var itemsWrap = attributes.itemsWrap;
		var itemWrap = attributes.itemWrap;
		var noPostsWrap = attributes.noPostsWrap;
		var spinnerWrap = attributes.spinnerWrap;

		var grid = attributes.grid;
		var nthItemStyle = attributes.nthItemStyle;
		var blockCssY = attributes.blockCssY;

		var blockId = attributes.blockId;

		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;

		var [isBusy, setIsBusy] = useState(false); // Using the hook.
		var [importLayoutOpen, setimportLayoutOpen] = useState({
			id: 0,
			isOpen: false,
		}); // Using the hook.

		const blockProps = useBlockProps({
			className: ` ${blockId} pg-post-grid`,
		});

		const { replaceInnerBlocks } = useDispatch(blockEditorStore);
		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);

		var containerSelector = blockClass;
		const itemsWrapSelector = blockClass + " .items-loop";
		const itemWrapSelector = blockClass + " .item";

		const noPostsSelector = blockClass + " .no-posts";
		const lazyloadWrapSelector = blockClass + " .lazyLoad";
		const spinnerSelector = blockClass + " .spinner";

		var [debounce, setDebounce] = useState(null); // Using the hook.
		const [breakPointX, setBreakPointX] = useState(
			myStore != null ? myStore.getBreakPoint() : "Desktop"
		);
		const [postGridData, setPostGridData] = useState(window.PostGridPluginData);

		let isProFeature = applyFilters("isProFeature", true);

		const [clientData, setClientData] = useState({});

		var clientDataX = myStore != null ? myStore.getclientdata() : "";

		useEffect(() => {
			setPostGridData(window.PostGridPluginData);
		}, [window.PostGridPluginData]);

		useEffect(() => {
			setClientData(myStore != null ? myStore.getclientdata() : "");
		}, [clientDataX]);

		//const ALLOWED_BLOCKS = ["post-grid/post-query"];

		const MY_TEMPLATE = [
			["post-grid/post-query", {}],
			["post-grid/post-query-pagination", {}],
		];

		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			//allowedBlocks: ALLOWED_BLOCKS,
			template: MY_TEMPLATE,
			orientation: "horizontal",
			templateInsertUpdatesSelection: true,
			//renderAppender: InnerBlocks.ButtonBlockAppender
		});

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
				var lazyLoadX = attributes.lazyLoad;
				var containerX = attributes.container;
				var itemsWrapX = attributes.itemsWrap;
				var itemWrapX = attributes.itemWrap;
				var noPostsWrapX = attributes.noPostsWrap;
				var spinnerWrapX = attributes.spinnerWrap;
				// var gridX = attributes.grid;

				var blockCssYX = attributes.blockCssY;

				var blockCssObj = {};

				// if (gridX != undefined) {
				// 	var gridY = { ...gridX, options: grid.options };
				// 	setAttributes({ grid: gridY });
				// 	blockCssObj[gridSelector] = gridY;
				// }

				if (spinnerWrapX != undefined) {
					var spinnerWrapY = { ...spinnerWrapX, options: spinnerWrap.options };
					setAttributes({ spinnerWrap: spinnerWrapY });
					blockCssObj[spinnerWrapSelector] = spinnerWrapY;
				}

				if (noPostsWrapX != undefined) {
					var noPostsWrapY = { ...noPostsWrapX, options: noPostsWrap.options };
					setAttributes({ noPostsWrap: noPostsWrapY });
					blockCssObj[noPostsWrapSelector] = noPostsWrapY;
				}

				if (itemWrapX != undefined) {
					var itemWrapY = { ...itemWrapX, options: itemWrap.options };
					setAttributes({ itemWrap: itemWrapY });
					blockCssObj[itemWrapSelector] = itemWrapY;
				}

				if (itemsWrapX != undefined) {
					var itemsWrapY = { ...itemsWrapX, options: itemsWrap.options };
					setAttributes({ itemsWrap: itemsWrapY });
					blockCssObj[itemsWrapSelector] = itemsWrapY;
				}

				if (containerX != undefined) {
					var containerY = { ...containerX, options: container.options };
					setAttributes({ container: containerY });
					blockCssObj[containerSelector] = containerY;
				}

				if (lazyLoadX != undefined) {
					var lazyLoadY = { ...lazyLoadX, options: lazyLoad.options };
					setAttributes({ lazyLoad: lazyLoadY });
					blockCssObj[lazyLoadSelector] = lazyLoadY;
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

		function onChangeStyleContainer(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, container);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ container: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				containerSelector
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

		function onRemoveStyleContainer(sudoScource, key) {
			var object = myStore.deletePropertyDeep(container, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ container: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				containerSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleContainer(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, container);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ container: object });
		}

		function onPickCssLibraryItemsWrap(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				itemsWrap[sudoScource] = sudoScourceArgs;
			});

			var itemsWrapX = Object.assign({}, itemsWrap);
			setAttributes({ itemsWrap: itemsWrapX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					itemsWrapSelector
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

		function onChangeStyleItemsWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, itemsWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ itemsWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemsWrapSelector
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

		function onRemoveStyleItemsWrap(sudoScource, key) {
			var object = myStore.deletePropertyDeep(itemsWrap, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ itemsWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemsWrapSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleItemsWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, itemsWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ itemsWrap: object });
		}

		function onPickCssLibraryItemWrap(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				itemWrap[sudoScource] = sudoScourceArgs;
			});

			var itemWrapX = Object.assign({}, itemWrap);
			setAttributes({ itemWrap: itemWrapX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					itemWrapSelector
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

		function onChangeStyleItemWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, itemWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ itemWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemWrapSelector
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

		function onRemoveStyleItemWrap(sudoScource, key) {
			var object = myStore.deletePropertyDeep(itemWrap, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ itemWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemWrapSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleItemWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, itemWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ itemWrap: object });
		}

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });

			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[containerSelector] = container;
			blockCssObj[itemsWrapSelector] = itemsWrap;
			blockCssObj[itemWrapSelector] = itemWrap;
			blockCssObj[noPostsSelector] = noPostsWrap;
			blockCssObj[lazyloadWrapSelector] = lazyLoad;
			blockCssObj[spinnerSelector] = spinnerWrap;

			// generateNthItemStyle();

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = { ...blockCssY.items, ...blockCssRules };
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		// useEffect(() => {
		// 	var blockCssObj = {};

		// 	console.log(nthItemStyle);
		// 	console.log(nthItemStyle.length);
		// 	if (nthItemStyle.length > 0) {
		// 		for (let i = 1; i <= nthItemStyle.length; i++) {
		// 			var nthItemSelector = `${blockClass} .item:nth-child(${i})`;
		// 			blockCssObj[nthItemSelector] = nthItemStyle[i];
		// 			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

		// 			var items = { ...blockCssY.items, ...blockCssRules };
		// 			setAttributes({ blockCssY: { items: items } });
		// 		}
		// 	}

		// 	// generateNthItemStyle();
		// }, [nthItemStyle]);

		// useEffect(() => {
		// 	if (nthItemStyle.length > 0) {
		// 		var blockCssObj = {};

		// 		for (let i = 1; i <= nthItemStyle.length; i++) {
		// 			var nthItemSelector = `${blockClass} .item:nth-child(${i})`;
		// 			console.log(nthItemSelector)
		// 			blockCssObj[nthItemSelector] = nthItemStyle[i];
		// 			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
		// 			var items = { ...blockCssY.items, ...blockCssRules };
		// 			setAttributes({ blockCssY: { items: items } });
		// 		}

		// 	}
		// }, [nthItemStyle]);

		// useEffect(() => {
		// 	blockCssY.items[itemsWrapSelector] =
		// 		blockCssY.items[itemsWrapSelector] != undefined
		// 			? blockCssY.items[itemsWrapSelector]
		// 			: {};

		// 	var nthItemsResponsive = [];
		// 	var itemX = { ...blockCssY.items };

		// 	Object.entries(grid.options.itemCss).map((args) => {
		// 		/****breakPoint****/

		// 		var breakPoint = args[0];
		// 		var nthItems = args[1];

		// 		nthItems.length > 0 &&
		// 			nthItems.map((x, i) => {
		// 				/****nthItems****/
		// 				Object.entries(x).map((attr) => {
		// 					var attrId = attr[0];
		// 					var attrVal = attr[1];

		// 					if (nthItemsResponsive[i] != undefined) {
		// 						//nthItemsResponsive[i] = [];
		// 					} else {
		// 						nthItemsResponsive[i] = [];
		// 					}

		// 					if (nthItemsResponsive[i][attrId] != undefined) {
		// 						//nthItemsResponsive[i][attrId] = [];
		// 					} else {
		// 						nthItemsResponsive[i][attrId] = [];
		// 					}

		// 					if (nthItemsResponsive[i][attrId][breakPoint] != undefined) {
		// 						nthItemsResponsive[i][attrId][breakPoint] = attrVal;
		// 					} else {
		// 						nthItemsResponsive[i][attrId][breakPoint] = attrVal;
		// 					}
		// 				});
		// 			});
		// 	});

		// 	for (var i = 0; i < 10; i++) {
		// 		var selector = `${blockClass} .item:nth-child(${i})`;
		// 		if (blockCssY.items[selector] != undefined) {
		// 			delete blockCssY.items[selector];
		// 		}
		// 	}

		// 	var imtasdas = {};

		// 	nthItemsResponsive.length > 0 &&
		// 		nthItemsResponsive.map((nth, i) => {
		// 			var selector = `${blockClass} .item:nth-child(${i + 1})`;
		// 			Object.entries(nth).map((attr) => {
		// 				var attrId = attr[0];
		// 				var attrVal = attr[1];

		// 				if (imtasdas[selector] != undefined) {
		// 				} else {
		// 					imtasdas[selector] = {};
		// 				}

		// 				if (imtasdas[selector][attrId] != undefined) {
		// 				} else {
		// 					imtasdas[selector][attrId] = {};
		// 				}

		// 				imtasdas[selector][attrId] = attrVal;
		// 			});
		// 		});

		// 	var asdsd = { ...blockCssY.items, ...imtasdas };

		// 	setAttributes({ blockCssY: { items: asdsd } });
		// }, [grid]);

		function generateNthItemStyle() {
			blockCssY.items[itemsWrapSelector] =
				blockCssY.items[itemsWrapSelector] != undefined
					? blockCssY.items[itemsWrapSelector]
					: {};

			var nthItemsResponsive = [];
			var itemX = { ...blockCssY.items };

			Object.entries(nthItemStyle).map((args) => {
				/****breakPoint****/

				var breakPoint = args[0];
				var nthItems = args[1];

				nthItems.length > 0 &&
					nthItems.map((x, i) => {
						/****nthItems****/
						Object.entries(x).map((attr) => {
							var attrId = attr[0];
							var attrVal = attr[1];

							if (nthItemsResponsive[i] != undefined) {
								//nthItemsResponsive[i] = [];
							} else {
								nthItemsResponsive[i] = [];
							}

							if (nthItemsResponsive[i][attrId] != undefined) {
								//nthItemsResponsive[i][attrId] = [];
							} else {
								nthItemsResponsive[i][attrId] = [];
							}

							if (nthItemsResponsive[i][attrId][breakPoint] != undefined) {
								nthItemsResponsive[i][attrId][breakPoint] = attrVal;
							} else {
								nthItemsResponsive[i][attrId][breakPoint] = attrVal;
							}
						});
					});
			});

			for (var i = 0; i < 10; i++) {
				var selector = `${blockClass} .item:nth-child(${i})`;
				if (blockCssY.items[selector] != undefined) {
					delete blockCssY.items[selector];
				}
			}

			var imtasdas = {};

			nthItemsResponsive.length > 0 &&
				nthItemsResponsive.map((nth, i) => {
					var selector = `${blockClass} .item:nth-child(${i + 1})`;
					Object.entries(nth).map((attr) => {
						var attrId = attr[0];
						var attrVal = attr[1];

						if (imtasdas[selector] != undefined) {
						} else {
							imtasdas[selector] = {};
						}

						if (imtasdas[selector][attrId] != undefined) {
						} else {
							imtasdas[selector][attrId] = {};
						}

						imtasdas[selector][attrId] = attrVal;
					});
				});

			var asdsd = { ...blockCssY.items, ...imtasdas };

			setAttributes({ blockCssY: { items: asdsd } });
		}

		useEffect(() => {
			generateNthItemStyle();
		}, [nthItemStyle]);

		var breakPointList = [{ label: "Select..", icon: "", value: "" }];

		for (var x in breakPoints) {
			var item = breakPoints[x];
			breakPointList.push({
				label: item.name,
				icon: item.icon,
				value: item.id,
			});
		}

		var postTypes = [];

		const postTypesData = useSelect(
			(select) => select(coreStore).getPostTypes({ per_page: -1 }),
			[]
		);

		postTypesData !== null &&
			postTypesData.map((x) => {
				postTypes.push({ value: x.slug, label: x.name });
			});

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		function addMedia(option, index) {
			//var isExist = items.elements.find(x => x.label === option.label);
			var nthItemStyleX = [...nthItemStyle];
			nthItemStyleX.push({});
			setAttributes({ nthItemStyle: nthItemStyleX });
		}

		function onChangeStyleItem(sudoScource, newVal, attr, obj, extra) {
			var index = extra.index;

			var path = [sudoScource, attr, breakPointX];
			let objX = Object.assign({}, obj);
			const object = myStore.updatePropertyDeep(objX, path, newVal);

			var nthItemStyleX = [...nthItemStyle];
			// var itemsX = { ...nthItemStyle };

			nthItemStyleX[index] = object;
			// console.log(itemsX.elements);

			setAttributes({ nthItemStyle: nthItemStyleX });

			var selector = `${blockClass} .item:nth-child(${index + 1})`;

			//setAttributes({ obj: object });

			var elementSelector = myStore.getElementSelector(sudoScource, selector);
			var cssPropty = myStore.cssAttrParse(attr);

			let itemsCssX = Object.assign({}, blockCssY.items);

			if (itemsCssX[elementSelector] == undefined) {
				itemsCssX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsCssX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleItem(sudoScource, key, obj, extra) {
			var index = extra.index;

			var object = myStore.deletePropertyDeep(obj, [
				sudoScource,
				key,
				breakPointX,
			]);

			var nthItemStyleX = [...nthItemStyle];
			// var itemsX = { ...nthItemStyle };
			nthItemStyleX[index] = object;
			setAttributes({ nthItemStyle: nthItemStyleX });

			//setAttributes({ items: object });

			// var elementSelector = myStore.getElementSelector(sudoScource, itemSelector);
			// var cssPropty = myStore.cssAttrParse(key);
			// var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
			// setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleItem(sudoScource, key, obj, extra) {
			var index = extra.index;

			var path = [sudoScource, key, breakPointX];
			let objX = Object.assign({}, obj);
			const object = myStore.addPropertyDeep(objX, path, "");

			var nthItemStyleX = [...nthItemStyle];

			nthItemStyleX[index] = object;

			//setAttributes({ nthItemStyle: object });
			setAttributes({ nthItemStyle: nthItemStyleX });
		}

		function onBulkAddItem(sudoScource, cssObj) {
			let obj = Object.assign({}, nthItemStyle);
			obj[sudoScource] = cssObj;

			setAttributes({ nthItemStyle: obj });

			var selector = myStore.getElementSelector(sudoScource, itemsSelector);
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

		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<PanelBody title="Container" initialOpen={false}>
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
									<label for="">CSS Class</label>

									<PGcssClassPicker
										tags={customTags}
										placeholder="Add Class"
										value={container.options.class}
										onChange={(newVal) => {
											var options = { ...container.options, class: newVal };
											setAttributes({
												container: {
													styles: container.styles,
													options: options,
												},
											});
										}}
									/>

									<PanelRow>
										<label for="">CSS ID</label>
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
										obj={container}
										onChange={onChangeStyleContainer}
										onAdd={onAddStyleContainer}
										onRemove={onRemoveStyleContainer}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody title="Grid Wrap" initialOpen={false}>
							<PGStyles
								obj={itemsWrap}
								onChange={onChangeStyleItemsWrap}
								onAdd={onAddStyleItemsWrap}
								onRemove={onRemoveStyleItemsWrap}
							/>
						</PanelBody>

						<PanelBody title="Grid Item Wrap" initialOpen={false}>
							<PGStyles
								obj={itemWrap}
								onChange={onChangeStyleItemWrap}
								onAdd={onAddStyleItemWrap}
								onRemove={onRemoveStyleItemWrap}
							/>
						</PanelBody>

						<PanelBody title="N'th Item CSS" initialOpen={false}>
							{/* <div>
								<PanelRow>
									<Button
										className="my-3"
										variant="secondary"
										disabled={isProFeature}
										onClick={(_newVal) => {
											if (grid.options.itemCss[breakPointX] != undefined) {
												var ssd = grid.options.itemCss[breakPointX].concat({
													"grid-column-start": "",
													"grid-column-end": "",
													"grid-row-start": "",
													"grid-row-end": "",
												});
											} else {
												grid.options.itemCss[breakPointX] = [];
												var ssd = grid.options.itemCss[breakPointX].concat({
													"grid-column-start": "",
													"grid-column-end": "",
													"grid-row-start": "",
													"grid-row-end": "",
												});
											}

											var newValuesObj = {};
											if (Object.keys(grid.options.itemCss).length == 0) {
												newValuesObj[breakPointX] = ssd;
											} else {
												newValuesObj = grid.options.itemCss;
												newValuesObj[breakPointX] = ssd;
											}

											var options = { ...grid.options, itemCss: newValuesObj };
											setAttributes({ grid: { ...grid, options: options } });
										}}>
										Add
									</Button>

									{isProFeature && (
										<span className="bg-amber-400 mx-2 rounded-sm py-1 px-3  text-white hover:text-white">
											<a
												target="_blank"
												href={
													"https://getpostgrid.com/pricing/?utm_source=nthItemCSS&utm_term=blockPostgrid&utm_campaign=pluginPostGrid&utm_medium=nthItemCSS"
												}>
												Pro
											</a>
										</span>
									)}
								</PanelRow>

								{grid.options.itemCss[breakPointX] != undefined &&
									grid.options.itemCss[breakPointX].map((x, i) => {
										return (
											<PanelBody title={i + 1 + "'th Item"} initialOpen={false}>
												<Button
													icon="no-alt"
													variant="secondary"
													onClick={(_ev) => {
														grid.options.itemCss[breakPointX].splice(i, 1);

														var options = {
															...grid.options,
															itemCss: grid.options.itemCss,
														};
														setAttributes({
															grid: { ...grid, options: options },
														});
													}}>
													Delete
												</Button>

												<PanelRow>
													<label for="">grid-column-start</label>
													<InputControl
														value={x["grid-column-start"]}
														type="number"
														onChange={(newVal) => {
															grid.options.itemCss[breakPointX][i][
																"grid-column-start"
															] = newVal;

															var options = {
																...grid.options,
																itemCss: grid.options.itemCss,
															};
															setAttributes({
																grid: { ...grid, options: options },
															});
														}}
													/>
												</PanelRow>

												<PanelRow>
													<label for="">grid-column-end</label>
													<InputControl
														value={x["grid-column-end"]}
														type="number"
														onChange={(newVal) => {
															grid.options.itemCss[breakPointX][i][
																"grid-column-end"
															] = newVal;

															var options = {
																...grid.options,
																itemCss: grid.options.itemCss,
															};
															setAttributes({
																grid: { ...grid, options: options },
															});
														}}
													/>
												</PanelRow>

												<PanelRow>
													<label for="">grid-row-start</label>
													<InputControl
														value={x["grid-row-start"]}
														type="number"
														onChange={(newVal) => {
															grid.options.itemCss[breakPointX][i][
																"grid-row-start"
															] = newVal;

															var options = {
																...grid.options,
																itemCss: grid.options.itemCss,
															};
															setAttributes({
																grid: { ...grid, options: options },
															});
														}}
													/>
												</PanelRow>

												<PanelRow>
													<label for="">grid-row-end</label>
													<InputControl
														value={x["grid-row-end"]}
														type="number"
														onChange={(newVal) => {
															grid.options.itemCss[breakPointX][i][
																"grid-row-end"
															] = newVal;

															var options = {
																...grid.options,
																itemCss: grid.options.itemCss,
															};
															setAttributes({
																grid: { ...grid, options: options },
															});
														}}
													/>
												</PanelRow>
											</PanelBody>
										);
									})}
							</div> */}

							<PanelRow>
								<label for="" className="font-medium text-slate-900 ">
									Add N'th Item
								</label>
								{/* <PGDropdown
												position="bottom right"
												variant="secondary"
												options={elementsArgs}
												buttonTitle="Choose"
												onChange={addMedia}
												values=""></PGDropdown> */}
								<button onClick={(ev) => addMedia()}>Add</button>
							</PanelRow>

							<ReactSortable
								list={nthItemStyle}
								handle={".handle"}
								setList={(item) => {
									// var nthItemStyleX = [...nthItemStyle];
									// setAttributes({ nthItemStyle: { ...nthItemStyle, nthItemStyle: item } });
								}}>
								{nthItemStyle.map((item, index) => (
									<div key={item.id} className="">
										<PanelBody
											title={
												<>
													<span
														className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
														onClick={(ev) => {
															var nthItemStyleX = [...nthItemStyle];
															nthItemStyleX.splice(index, 1);

															setAttributes({
																nthItemStyle: nthItemStyleX,
															});
														}}>
														<Icon icon={close} />
													</span>
													<span className="handle cursor-pointer hover:bg-blue-500 hover:text-white px-1 py-1">
														<Icon icon={menu} />
													</span>

													<span className="mx-2">{index + 1}</span>
												</>
											}
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
														icon: styles,
														className: "tab-style",
													},
												]}>
												<PGtab name="options"></PGtab>
												<PGtab name="styles">
													<PGStyles
														obj={item}
														extra={{ index: index }}
														onChange={onChangeStyleItem}
														onAdd={onAddStyleItem}
														onRemove={onRemoveStyleItem}
														onBulkAdd={onBulkAddItem}
													/>
												</PGtab>
											</PGtabs>

											{/* 

                          <PanelRow className='my-3'>
                            <label>Color</label>
                            <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                          </PanelRow>


                          <ColorPalette
                            value={(items.elements[index].styles.color == undefined) ? '' : items.elements[index].styles.color[breakPointX]}
                            colors={colorsPresets}
                            enableAlpha
                            onChange={(newVal) => {

                              var newValuesObj = {};


                              if (Object.keys(items.elements[index].styles.color).length == 0) {
                                newValuesObj[breakPointX] = newVal;
                              } else {
                                newValuesObj = items.elements[index].styles.color;
                                newValuesObj[breakPointX] = newVal;
                              }

                              var styles = { ...items.elements[index].styles, color: newValuesObj };
                              items.elements[index].styles = styles

                              setAttributes({ items: { ...items, elements: items.elements } });




                            }}
                          />


                          <PanelRow className='my-3'>
                            <label>Background Color</label>
                            <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChangeBreakPoint} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />




                          </PanelRow>


                          <ColorPalette
                            value={(items.elements[index].styles.backgroundColor == undefined) ? '' : items.elements[index].styles.backgroundColor[breakPointX]}
                            colors={colorsPresets}
                            enableAlpha
                            onChange={(newVal) => {

                              var newValuesObj = {};

                              if (Object.keys(items.elements[index].styles.backgroundColor).length == 0) {
                                newValuesObj[breakPointX] = newVal;
                              } else {
                                newValuesObj = items.elements[index].styles.backgroundColor;
                                newValuesObj[breakPointX] = newVal;
                              }

                              var styles = { ...items.elements[index].styles, backgroundColor: newValuesObj };
                              items.elements[index].styles = styles

                              setAttributes({ items: { ...items, elements: items.elements } });
                            }}
                          /> */}
										</PanelBody>
									</div>
								))}
							</ReactSortable>
						</PanelBody>

						<PanelBody title="Lazy load" initialOpen={false}>
							<PanelRow>
								<label for="">Enable Lazy Load</label>

								<SelectControl
									label=""
									value={lazyLoad.options.enable}
									options={[
										{ label: "Yes", value: "yes" },
										{ label: "No", value: "no" },
									]}
									onChange={(newVal) => {
										var options = { ...lazyLoad.options, enable: newVal };
										setAttributes({
											lazyLoad: { ...lazyLoad, options: options },
										});
									}}
								/>
							</PanelRow>

							<PanelRow>
								<label for="">Lazy load Icon</label>

								<PGIconPicker
									library={
										lazyLoad.options.icon != undefined
											? lazyLoad.options.icon.library
											: "fontAwesome"
									}
									srcType={
										lazyLoad.options.icon != undefined
											? lazyLoad.options.icon.srcType
											: "class"
									}
									iconSrc={
										lazyLoad.options.icon != undefined
											? lazyLoad.options.icon.iconSrc
											: ""
									}
									onChange={(arg) => {
										var options = {
											...lazyLoad.options,
											icon: {
												srcType: arg.srcType,
												library: arg.library,
												iconSrc: arg.iconSrc,
											},
										};

										setAttributes({
											lazyLoad: { ...lazyLoad, options: options },
										});
									}}
								/>
							</PanelRow>

							<PanelRow>
								<label for="">Lazy Load Image</label>

								<MediaUploadCheck>
									<MediaUpload
										onSelect={(media) => {
											// media.id

											var options = {
												...lazyLoad.options,
												srcUrl: media.url,
												srcId: media.id,
											};
											setAttributes({
												lazyLoad: { ...lazyLoad, options: options },
											});
										}}
										onClose={() => {}}
										allowedTypes={ALLOWED_MEDIA_TYPES}
										value={lazyLoad.options.srcId}
										render={({ open }) => (
											<Button className="border" onClick={open}>
												Open Media Library
											</Button>
										)}
									/>
								</MediaUploadCheck>
							</PanelRow>

							<img className="my-5" src={lazyLoad.options.srcUrl} alt="" />
						</PanelBody>

						<PanelBody title="Block Variations" initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={"post-grid"}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
							/>
						</PanelBody>

						<div className="px-3">
							<PGMailSubsctibe />
							<PGContactSupport
								utm={{
									utm_source: "BlockPostGrid",
									utm_campaign: "PostGridCombo",
									utm_content: "BlockOptions",
								}}
							/>
						</div>

						<PanelBody className="" title="Tutorials" initialOpen={false}>
							<PGTutorials slug="post-grid" />
						</PanelBody>
					</div>
				</InspectorControls>

				{/* <span>
					{"atts: { " +
						"lazyLoad: " +
						JSON.stringify(lazyLoad) +
						",container: " +
						JSON.stringify(container) +
						",itemsWrap: " +
						JSON.stringify(itemsWrap) +
						",itemWrap: " +
						JSON.stringify(itemWrap) +
						",grid: " +
						JSON.stringify(grid) +
						",noPostsWrap: " +
						JSON.stringify(noPostsWrap) +
						",spinnerWrap: " +
						JSON.stringify(spinnerWrap) +
						"},"}
				</span> */}

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
														"post-grid/post-query",
														{
															noPostsWrap: {
																options: { class: "no-posts text-center" },
																styles: [],
															},
															spinnerWrap: {
																options: { class: "spinner" },
																styles: [],
															},
															queryArgs: {
																items: [
																	{
																		val: ["post"],
																		multiple: false,
																		id: "postType",
																		label: "Post Types",
																		description: "Select Post Types to Query",
																	},
																	{
																		val: ["publish"],
																		multiple: false,
																		id: "postStatus",
																		label: "Post status",
																		description: "Query post by post status",
																	},
																	{
																		val: "DESC",
																		multiple: false,
																		id: "order",
																		label: "Order",
																		description: "Post query order",
																	},
																	{
																		val: ["date"],
																		multiple: false,
																		id: "orderby",
																		label: "Orderby",
																		description: "Post query orderby",
																	},
																	{
																		val: "3",
																		multiple: false,
																		id: "postsPerPage",
																		label: "Posts Per Page",
																		description:
																			"Number of post to show per page",
																	},
																	{
																		val: "1",
																		multiple: false,
																		id: "paged",
																		label: "Paged",
																		description: "Pagination start with",
																	},
																],
															},
															itemsWrap: {
																options: { excludedWrapper: "" },
																styles: [],
															},
															itemWrap: {
																options: {
																	tag: "div",
																	class: "item",
																	counterClass: true,
																	termsClass: true,
																	oddEvenClass: true,
																},
																styles: [],
															},
														},
													],
													[
														"post-grid/post-query-pagination",
														{
															pagination: {
																options: {
																	class: "pagination pg-post-query-pagination",
																	type: "normal",
																	maxPageNum: "5",
																	prevText: "Previous",
																	nextText: "Next",
																	loadMoreText: "Load More",
																	noMorePosts: "No More Posts",
																	loadingText: "Loading...",
																	loadingIcon: {
																		loadingPosition: "beforeText",
																		library: "fontAwesome",
																		srcType: "class",
																		iconSrc: "",
																		class: "load-more",
																	},
																	loadMoreIcon: {
																		library: "fontAwesome",
																		srcType: "class",
																		iconSrc: "",
																		position: "beforeText",
																		class: "load-more",
																	},
																},
																styles: {
																	margin: { Desktop: "20px 0px 20px 0px" },
																	display: { Desktop: "flex" },
																	justifyContent: { Desktop: "center" },
																	alignItems: { Desktop: "center" },
																	gap: { Desktop: "0px" },
																	backgroundColor: { Desktop: "#ffffff" },
																	padding: [],
																	width: {
																		Desktop: "max-content",
																		Tablet: "auto",
																	},
																	marginRight: { Desktop: "auto" },
																	marginLeft: { Desktop: "auto" },
																	borderRadius: { Desktop: "5px 5px 5px 5px" },
																	boxShadow: [],
																	border: [],
																	flexWrap: { Tablet: "wrap !important" },
																},
															},
															paginationItem: {
																options: { class: "page-numbers " },
																styles: {
																	color: { Desktop: "#7b7b7b" },
																	fontSize: { Desktop: "16px" },
																	padding: { Desktop: "5px 15px 5px 15px" },
																	backgroundColor: [],
																	borderRadius: [],
																	boxShadow: [],
																	border: { Desktop: "1px solid #e3e3e3" },
																	fontWeight: { Desktop: "700" },
																},
															},
															paginationItemActive: {
																options: { class: "page-numbers " },
																styles: {
																	backgroundColor: [],
																	padding: [],
																	borderRadius: [],
																	color: { Desktop: "#e34f3f" },
																	border: [],
																	boxShadow: [],
																	fontWeight: [],
																},
															},
															next: {
																options: {
																	enable: true,
																	library: "fontAwesome",
																	srcType: "class",
																	iconSrc: "",
																	position: "beforeText",
																	class: "next",
																},
																styles: [],
															},
															previous: {
																options: {
																	enable: true,
																	library: "fontAwesome",
																	srcType: "class",
																	iconSrc: "",
																	position: "beforeText",
																	class: "previous",
																},
																styles: [],
															},
															start: {
																options: {
																	enable: true,
																	library: "fontAwesome",
																	srcType: "class",
																	iconSrc: "",
																	position: "beforeText",
																	class: "start",
																},
																styles: [],
															},
															end: {
																options: {
																	enable: true,
																	library: "fontAwesome",
																	srcType: "class",
																	iconSrc: "",
																	position: "beforeText",
																	class: "end",
																},
																styles: [],
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
										blockName={"post-grid"}
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
											// 				"Sorry this variation only vailable in pro version"
											// 			);
											// 			return false;
											// 		}

											// 		var atts = variation.atts;

											// 		var lazyLoad = { ...atts.lazyLoad };
											// 		var container = { ...atts.container };
											// 		var itemsWrap = { ...atts.itemsWrap };
											// 		var itemWrap = { ...atts.itemWrap };
											// 		var noPostsWrap = { ...atts.noPostsWrap };
											// 		var spinnerWrap = { ...atts.spinnerWrap };
											// 		var grid = { ...atts.grid };

											// 		var blockCssY = { ...atts.blockCssY };

											// 		var blockCssObj = {};

											// 		// blockCssObj[lazyLoadSelector] = lazyLoad;
											// 		blockCssObj[containerSelector] = container;
											// 		blockCssObj[itemsWrapSelector] = itemsWrap;
											// 		blockCssObj[itemWrapSelector] = itemWrap;
											// 		// blockCssObj[noPostsWrapSelector] = noPostsWrap;
											// 		// blockCssObj[spinnerWrapSelector] = spinnerWrap;
											// 		// blockCssObj[gridSelector] = grid;

											// 		setAttributes({
											// 			lazyLoad: lazyLoad,
											// 			container: container,
											// 			itemsWrap: itemsWrap,
											// 			itemWrap: itemWrap,
											// 			noPostsWrap: noPostsWrap,
											// 			spinnerWrap: spinnerWrap,
											// 			grid: grid,
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
											// 					"https://getpostgrid.com/pricing/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=" +
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
						<div {...innerBlocksProps}>{innerBlocksProps.children}</div>
					)}
				</>

				{/* <div {...innerBlocksProps}>{innerBlocksProps.children}</div> */}

				<div {...blockProps}>
					{lazyLoad.options.enable == "yes" && isBusy && (
						<div className={lazyLoad.options.class}></div>
					)}

					{isBusy && (
						<div className="text-center">
							<Spinner />
						</div>
					)}
				</div>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file

		var attributes = props.attributes;
		// var wrapper = attributes.wrapper;

		// var blockId = attributes.blockId;

		// const blockProps = useBlockProps.save({
		// 	className: ` ${blockId} `,
		// });

		return <InnerBlocks.Content />;

		//return null;
	},
});
