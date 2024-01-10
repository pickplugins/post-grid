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

import { ReactSortable } from "react-sortablejs";

import PGIconPicker from "../../components/icon-picker";

import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";
import PGStyles from "../../components/styles";
import PGTutorials from "../../components/tutorials";

import PGLibraryBlockVariations from "../../components/library-block-variations";

import breakPoints from "../../breakpoints";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGCssLibrary from "../../components/css-library";

import variations from "./variations";

const ALLOWED_MEDIA_TYPES = ["image"];
import metadata from "./block.json";
import PGcssClassPicker from "../../components/css-class-picker";
import customTags from "../../custom-tags";
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
				height="161"
				viewBox="0 0 160 161"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M61.175 30H4.70442C3.45634 30 2.25938 30.4958 1.37686 31.3783C0.494333 32.2608 -0.00146484 33.4578 -0.00146484 34.7059V81.7647C-0.00146484 83.0128 0.494333 84.2097 1.37686 85.0923C2.25938 85.9748 3.45634 86.4706 4.70442 86.4706H61.175C62.4231 86.4706 63.62 85.9748 64.5026 85.0923C65.3851 84.2097 65.8809 83.0128 65.8809 81.7647V34.7059C65.8809 33.4578 65.3851 32.2608 64.5026 31.3783C63.62 30.4958 62.4231 30 61.175 30ZM56.4691 77.0588H9.4103V39.4118H56.4691V77.0588Z"
					fill="url(#paint0_linear_61_82)"
				/>
				<path
					d="M159.999 44.1177H84.7046V53.5294H159.999V44.1177Z"
					fill="url(#paint1_linear_61_82)"
				/>
				<path
					d="M141.175 62.9414H84.7046V72.3532H141.175V62.9414Z"
					fill="url(#paint2_linear_61_82)"
				/>
				<path
					d="M61.175 104H4.70442C3.45634 104 2.25938 104.496 1.37686 105.378C0.494333 106.261 -0.00146484 107.458 -0.00146484 108.706V155.765C-0.00146484 157.013 0.494333 158.21 1.37686 159.092C2.25938 159.975 3.45634 160.471 4.70442 160.471H61.175C62.4231 160.471 63.62 159.975 64.5026 159.092C65.3851 158.21 65.8809 157.013 65.8809 155.765V108.706C65.8809 107.458 65.3851 106.261 64.5026 105.378C63.62 104.496 62.4231 104 61.175 104ZM56.4691 151.059H9.4103V113.412H56.4691V151.059Z"
					fill="url(#paint3_linear_61_82)"
				/>
				<path
					d="M159.999 118.118H84.7046V127.529H159.999V118.118Z"
					fill="url(#paint4_linear_61_82)"
				/>
				<path
					d="M141.175 136.941H84.7046V146.353H141.175V136.941Z"
					fill="url(#paint5_linear_61_82)"
				/>
				<path
					d="M43.9957 0H1.99854C0.893966 0 -0.00146484 0.89543 -0.00146484 2V12C-0.00146484 13.1046 0.893966 14 1.99854 14H43.9957C45.1003 14 45.9957 13.1046 45.9957 12V2C45.9957 0.895431 45.1003 0 43.9957 0Z"
					fill="url(#paint6_linear_61_82)"
				/>
				<path
					d="M100.997 0H59.0005C57.8959 0 57.0005 0.89543 57.0005 2V12C57.0005 13.1046 57.8959 14 59.0005 14H100.997C102.102 14 102.997 13.1046 102.997 12V2C102.997 0.895431 102.102 0 100.997 0Z"
					fill="url(#paint7_linear_61_82)"
				/>
				<path
					d="M157.999 0H116.002C114.897 0 114.002 0.89543 114.002 2V12C114.002 13.1046 114.897 14 116.002 14H157.999C159.103 14 159.999 13.1046 159.999 12V2C159.999 0.895431 159.103 0 157.999 0Z"
					fill="url(#paint8_linear_61_82)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_82"
						x1="-0.00146484"
						y1="58.2353"
						x2="65.8809"
						y2="58.2353"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_82"
						x1="84.7046"
						y1="48.8236"
						x2="159.999"
						y2="48.8236"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_82"
						x1="84.7046"
						y1="67.6473"
						x2="141.175"
						y2="67.6473"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_82"
						x1="-0.00146484"
						y1="132.235"
						x2="65.8809"
						y2="132.235"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_82"
						x1="84.7046"
						y1="122.824"
						x2="159.999"
						y2="122.824"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_61_82"
						x1="84.7046"
						y1="141.647"
						x2="141.175"
						y2="141.647"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint6_linear_61_82"
						x1="-0.00146484"
						y1="7"
						x2="45.9957"
						y2="7"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint7_linear_61_82"
						x1="57.0005"
						y1="7"
						x2="102.997"
						y2="7"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint8_linear_61_82"
						x1="114.002"
						y1="7"
						x2="159.999"
						y2="7"
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

		var filterable = attributes.filterable;
		var activeFilter = attributes.activeFilter;
		var filterGroupWrap = attributes.filterGroupWrap;

		var filterGroup = attributes.filterGroup;

		var queryArgs = attributes.queryArgs;

		var pagination = attributes.pagination;
		var paginationItem = attributes.paginationItem;
		var paginationItemActive = attributes.paginationItemActive;

		var layout = attributes.layout;

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

		const filterGroupWrapSelector = blockClass + " .filterable-group-wrap";

		const filterGroupSelector = blockClass + " .filterable-group";
		const filterGroupTitleSelector = blockClass + " .filterable-group-title";

		const filterableSelector = blockClass + " .pg-filter";
		const activeFilterSelector =
			blockClass + " .pg-filter.mixitup-control-active";

		var [debounce, setDebounce] = useState(null); // Using the hook.
		const [breakPointX, setBreakPointX] = useState(
			myStore != null ? myStore.getBreakPoint() : "Desktop"
		);
		const [postGridData, setPostGridData] = useState(window.PostGridPluginData);

		let isProFeature = applyFilters("isProFeature", true);

		const [clientData, setClientData] = useState({});
		const { replaceInnerBlocks } = useDispatch(blockEditorStore);

		const [filterableTerms, setFilterableTerms] = useState([]);

		const [spinner, setSpinner] = useState(false);

		var clientDataX = myStore != null ? myStore.getclientdata() : "";

		useEffect(() => {
			setPostGridData(window.PostGridPluginData);
		}, [window.PostGridPluginData]);

		useEffect(() => {
			setClientData(myStore != null ? myStore.getclientdata() : "");
		}, [clientDataX]);

		const ALLOWED_BLOCKS = [
			"post-grid/post-grid-filterable-nav",
			"post-grid/post-query",
			"post/grid/post-query-pagination",
		];

		const MY_TEMPLATE = [
			["post-grid/post-grid-filterable-nav", {}],
			["post-grid/post-query", {}],
			["post-grid/post-query-pagination", {}],
		];

		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			// allowedBlocks: ALLOWED_BLOCKS,
			template: MY_TEMPLATE,
			orientation: "horizontal",
			templateInsertUpdatesSelection: true,
			//renderAppender: InnerBlocks.ButtonBlockAppender
		});

		function fetchPostTypeTerms(keyword) {
			var postTypes = [];
			var terms = [];
			setIsBusy(true);
			setFilterableTerms([]);

			queryArgs.items.map((x) => {
				if (x.id == "postType") {
					postTypes.push(x.val);
				}
			});

			var sss = apiFetch({
				path: "/post-grid/v2/post_type_objects",
				method: "POST",
				data: { postTypes: postTypes[0], search: keyword },
			}).then((result) => {
				//setFilterablTerms(result);

				result.length > 0 &&
					result.map((x) => {
						apiFetch({
							path: "/post-grid/v2/get_tax_terms",
							method: "POST",
							data: { taxonomy: x.id, search: keyword },
						}).then((res) => {
							//setFilterablTerms(res);

							res.length > 0 &&
								res.map((y) => {
									terms.push(y);
								});

							setFilterableTerms(terms);
							setIsBusy(false);
						});
					});

				//return result;
			});
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
				var lazyLoadX = attributes.lazyLoad;
				var containerX = attributes.container;
				var itemsWrapX = attributes.itemsWrap;
				var itemWrapX = attributes.itemWrap;
				var noPostsWrapX = attributes.noPostsWrap;
				var spinnerWrapX = attributes.spinnerWrap;
				var gridX = attributes.grid;

				var blockCssYX = attributes.blockCssY;

				var blockCssObj = {};

				if (gridX != undefined) {
					var gridY = { ...gridX, options: grid.options };
					setAttributes({ grid: gridY });
					blockCssObj[gridSelector] = gridY;
				}

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

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = { ...blockCssY.items, ...blockCssRules };
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

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

		function addMedia(option, index) {
			//var isExist = items.elements.find(x => x.label === option.label);
			var nthItemStyleX = [...nthItemStyle];
			nthItemStyleX.push({});
			setAttributes({ nthItemStyle: nthItemStyleX });
		}

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

		function onChangeStyleItem(sudoScource, newVal, attr, obj, extra) {
			var index = extra.index;

			var path = [sudoScource, attr, breakPointX];
			let objX = Object.assign({}, obj);
			const object = myStore.updatePropertyDeep(objX, path, newVal);

			var nthItemStyleX = [...nthItemStyle];
			// var itemsX = { ...nthItemStyle };

			nthItemStyleX[index] = object;

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
								blockName={"post-grid-filterable"}
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
							<PGTutorials slug="post-grid-filterable" />
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
														"post-grid/post-grid-filterable-nav",
														{
															filterable: filterable,
															activeFilter: activeFilter,
															filterGroupWrap: filterGroupWrap,
															filterGroup: filterGroup,
														},
													],
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
															queryArgs: queryArgs,
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
															pagination: pagination,
															paginationItem: paginationItem,
															paginationItemActive: paginationItemActive,
															next: {
																options: {
																	enable: true,
																	library: "fontAwesome",
																	srcType: "class",
																	iconSrc: "fas fa-angle-right",
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
																	iconSrc: "fas fa-angle-left",
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
										blockName={"post-grid-filterable"}
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
