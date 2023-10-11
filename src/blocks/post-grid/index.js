import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import { applyFilters } from "@wordpress/hooks";

import apiFetch from "@wordpress/api-fetch";
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import {
	BlockContextProvider,
	__experimentalUseBlockPreview as useBlockPreview,
} from "@wordpress/block-editor";
const { parse } = wp.blockSerializationDefaultParser;
const { RawHTML } = wp.element;
// var select = wp.data.select('core/block-editor');
import { dispatch, select } from "@wordpress/data";

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

import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { Icon, close, settings, cloud, pencil } from "@wordpress/icons";

import Typography from "../../components/typography";
import IconToggle from "../../components/icon-toggle";
import PGDropdown from "../../components/dropdown";
import PGIconPicker from "../../components/icon-picker";

import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";
import PGStyles from "../../components/styles";
import PGcssTextAlign from "../../components/css-text-align";
import PGcssDisplay from "../../components/css-display";
import PGTutorials from "../../components/tutorials";

import PGcssPadding from "../../components/css-padding";
import PGcssOutline from "../../components/css-outline";
import PGcssBorder from "../../components/css-border";
import PGcssBoxShadow from "../../components/css-box-shadow";
import PGinputSelect from "../../components/input-select";

import breakPoints from "../../breakpoints";
import queryPresets from "./query-presets";
import gridLayouts from "./grid-layouts";
import queryPrams from "./queryprams";
import paginationTypes from "./pagination-types";
import columnPresets from "./column-presets";

import tutorialsLinks from "./tutorials-links";

import colorsPresets from "../../colors-presets";
//import anime from 'animejs/lib/anime.es.js';

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGCssLibrary from "../../components/css-library";

const ALLOWED_MEDIA_TYPES = ["image"];

// var queryPramsX = queryPrams.map((x, i) => {

//   return { value: i, label: x.label, description: x.description, isPro: x.isPro, }
// })

var myStore = wp.data.select("postgrid-shop");

registerBlockType("post-grid/post-grid", {
	apiVersion: 2,
	title: "Post Grid",

	icon: {
		background: "#fff",
		foreground: "#fff",
		src: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
				<path fill="#1d4ed8" d="M15.41,15.41H0V0H15.41ZM3,12.41h9.41V3H3Z" />
				<path fill="#1d4ed8" d="M15.41,36H0V20.59H15.41ZM3,33h9.41V23.59H3Z" />
				<path
					fill="#1d4ed8"
					d="M36,36H20.59V20.59H36ZM23.59,33H33V23.59H23.59Z"
				/>
				<rect fill="#1d4ed8" x="25.15" y="3.87" width="10.85" height="2.35" />
				<rect fill="#1d4ed8" x="25.15" y="9.19" width="10.85" height="2.35" />
			</svg>
		),
	},

	providesContext: {
		queryId: "queryId",
		loopIndex: "loopIndex",

		query: "query",
		displayLayout: "displayLayout",
	},
	supports: {
		align: ["left", "right", "center", "wide", "full"],
		html: false,
	},

	attributes: {
		lazyLoad: {
			type: "object",
			default: {
				options: {
					class: "lazyLoad",
					enable: "no",
					srcUrl: "",
					srcId: "",
					icon: {
						library: "",
						srcType: "class",
						/*class, html, img, svg */ iconSrc: "",
					},
				},

				styles: {},
			},
		},

		search: {
			type: "object",
			default: {
				options: {
					class: "search",
					enable: "no",
					type: "",
					placeholder: "",
					icon: "",
					busyIcon: "",
				},
				styles: {},
			},
		},
		container: {
			type: "object",
			default: {
				options: { class: "" },
				styles: {},
			},
		},

		itemsWrap: {
			type: "object",
			default: {
				options: { class: "items-loop" },
				styles: {},
			},
		},

		itemWrap: {
			type: "object",
			default: {
				options: { class: "item" },
				styles: {},
			},
		},

		noPostsWrap: {
			type: "object",
			default: {
				options: { class: "no-posts text-center" },
				styles: {},
			},
		},

		spinnerWrap: {
			type: "object",
			default: {
				options: { class: "spinner" },
				styles: {},
			},
		},

		grid: {
			type: "object",
			default: {
				options: {
					itemCss: {},
				},

				styles: {
					gridTemplateColumns: {},
					gridTemplateRows: {},
					colGap: {},
					rowGap: {},

					color: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
		},

		pagination: {
			type: "object",
			default: {
				options: {
					class: "pagination",
					type: "normal",
					maxPageNum: "",
					prevText: "Previous",
					nextText: "Next",
					loadMoreText: "Load More",
					noMorePosts: "No More Posts",
					loadingText: "Loading...",
					loadingIcon: {
						library: "",
						srcType: "class",
						/*class, html, img, svg */ iconSrc: "",
					},
				},

				styles: {
					textAlign: { Desktop: "center" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
					fontSize: { Desktop: "" },
				},
			},
		},

		paginationItem: {
			type: "object",
			default: {
				options: { class: "page-numbers inline-block" },

				styles: {
					display: { Desktop: "inline-block" },
					color: { Desktop: "#18978F" },
					fontSize: { Desktop: "" },
				},
			},
		},

		paginationItemActive: {
			type: "object",
			default: {
				options: { class: "page-numbers inline-block" },

				styles: {
					color: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
					fontSize: { Desktop: "" },
				},
			},
		},

		layout: {
			type: "object",
			default: {
				id: "",
				srcServer: "library",
				data: [
					{
						blockName: "core/post-title",
						attrs: {},
						innerBlocks: [],
						innerHTML: "",
						innerContent: [],
					},
					{
						blockName: null,
						attrs: {},
						innerBlocks: [],
						innerHTML: "\n\n",
						innerContent: ["\n\n"],
					},
					{
						blockName: "core/post-date",
						attrs: {},
						innerBlocks: [],
						innerHTML: "",
						innerContent: [],
					},
					{
						blockName: null,
						attrs: {},
						innerBlocks: [],
						innerHTML: "\n\n",
						innerContent: ["\n\n"],
					},
					{
						blockName: "core/post-excerpt",
						attrs: { moreText: "", textColor: "primary" },
						innerBlocks: [],
						innerHTML: "",
						innerContent: [],
					},
				],
				rawData:
					"<!-- wp:post-featured-image  /-->\n\n<!-- wp:post-title /-->\n\n<!-- wp:post-excerpt  /-->",
			},
		},

		blockId: {
			type: "string",
			default: "",
		},
		customCss: {
			type: "string",
			default: "",
		},

		blockCssY: {
			type: "object",
			default: { items: {} },
		},
		queryArgs: {
			type: "object",
			default: {
				items: [
					{ val: ["post"], id: "postType" },
					{ val: ["publish"], id: "postStatus" },
					{ val: "DESC", id: "order" },
					{ val: ["date"], id: "orderby" },
					{ val: 3, id: "postsPerPage" },
					{ val: 1, id: "paged" },
				],
			},
		},
	},
	category: "post-grid",
	edit: function (props) {
		var attributes = props.attributes;
		var clientId = props.clientId;

		var setAttributes = props.setAttributes;

		var lazyLoad = attributes.lazyLoad;
		var container = attributes.container;
		var pagination = attributes.pagination;
		var paginationItem = attributes.paginationItem;
		var paginationItemActive = attributes.paginationItemActive;

		var search = attributes.search;
		var itemsWrap = attributes.itemsWrap;
		var itemWrap = attributes.itemWrap;
		var noPostsWrap = attributes.noPostsWrap;
		var spinnerWrap = attributes.spinnerWrap;

		var grid = attributes.grid;
		var layout = attributes.layout;
		var queryArgs = attributes.queryArgs;
		var blockCssY = attributes.blockCssY;
		var customCss = attributes.customCss;
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

		var containerSelector = blockClass;
		const itemsWrapSelector = blockClass + " .items-loop";
		const itemWrapSelector = blockClass + " .item";

		const noPostsSelector = blockClass + " .no-posts";
		const searchWrapSelector = blockClass + " .search";
		const lazyloadWrapSelector = blockClass + " .lazyLoad";
		const spinnerSelector = blockClass + " .spinner";
		const paginationSelector = blockClass + " .pagination";
		const paginationItemSelector = blockClass + " .pagination .page-numbers";
		const paginationItemActiveSelector =
			blockClass + " .pagination .page-numbers.current";

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

		const BLOCKS_TEMPLATE = [
			["post-grid/post-title", {}],
			["post-grid/read-more", {}],
		];

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

		function onPickCssLibraryPaginationItemActive(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				paginationItemActive[sudoScource] = sudoScourceArgs;
			});

			var paginationItemActiveX = Object.assign({}, paginationItemActive);
			setAttributes({ paginationItemActive: paginationItemActiveX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					paginationItemActiveSelector
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

		function onChangeStylePaginationItemActive(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, paginationItemActive);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ paginationItemActive: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationItemActiveSelector
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

		function onRemoveStylePaginationItemActive(sudoScource, key) {
			var object = myStore.deletePropertyDeep(paginationItemActive, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ paginationItemActive: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationItemActiveSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStylePaginationItemActive(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, paginationItemActive);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ paginationItemActive: object });
		}

		function onPickCssLibraryPagination(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				pagination[sudoScource] = sudoScourceArgs;
			});

			var paginationX = Object.assign({}, pagination);
			setAttributes({ pagination: paginationX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					paginationSelector
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

		function onChangeStylePagination(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, pagination);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ pagination: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationSelector
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

		function onRemoveStylePagination(sudoScource, key) {
			var object = myStore.deletePropertyDeep(pagination, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ pagination: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStylePagination(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, pagination);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ pagination: object });
		}

		function onPickCssLibraryPaginationItem(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				paginationItem[sudoScource] = sudoScourceArgs;
			});

			var paginationX = Object.assign({}, paginationItem);
			setAttributes({ paginationItem: paginationX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					paginationItemSelector
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

		function onChangeStylePaginationItem(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, paginationItem);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ paginationItem: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationItemSelector
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

		function onRemoveStylePaginationItem(sudoScource, key) {
			var object = myStore.deletePropertyDeep(paginationItem, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ paginationItem: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationItemSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStylePaginationItem(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, paginationItem);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ paginationItem: object });
		}

		useEffect(() => {
			setAttributes({ blockId: blockIdX });

			myStore.generateBlockCss(blockCssY.items, blockId, customCss);

			// blockCssY.items[itemWrapSelector] = (blockCssY.items[itemWrapSelector] != undefined) ? blockCssY.items[itemWrapSelector] : {};
			//blockCssY.items[paginationSelector] = (blockCssY.items[paginationSelector] != undefined) ? blockCssY.items[paginationSelector] : {};

			// var wordBreak = (blockCssY.items[itemWrapSelector]['word-break'] != undefined) ? blockCssY.items[itemWrapSelector]['word-break'] : {};
			// wordBreak[breakPointX] = 'break-word'

			// blockCssY.items[itemWrapSelector] = { ...blockCssY.items[itemWrapSelector], 'word-break': wordBreak };

			// blockCssY.items[paginationSelector] = { ...blockCssY.items[paginationSelector], 'text-align': { "Desktop": "center" } };

			// blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'display': { "Desktop": "inline-block" } };
			// blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'cursor': { "Desktop": "pointer" } };

			// blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'color': { "Desktop": "#18978F" } };
			// blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'background-color': { "Desktop": "#9DD6DF" } };

			// blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'margin-left': { "Desktop": "5px" } };
			// blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'margin-right': { "Desktop": "5px" } };

			// blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'padding-top': { "Desktop": "10px" } };
			// blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'padding-right': { "Desktop": "10px" } };
			// blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'padding-bottom': { "Desktop": "10px" } };
			// blockCssY.items[paginationItemSelector] = { ...blockCssY.items[paginationItemSelector], 'padding-left': { "Desktop": "10px" } };

			// blockCssY.items[itemsWrapSelector] = { ...blockCssY.items[itemsWrapSelector], 'grid-template-columns': { "Desktop": "1fr 1fr 1fr", "Tablet": "1fr 1fr", "Mobile": "1fr" } };

			//setAttributes({ blockCssY: { items: blockCssY.items } });

			if (pagination.options.type.length == 0) {
				//var paginationOptons = { ...pagination.options, type: 'normal' }
				//setAttributes({ pagination: { ...pagination, options: paginationOptons } });
			}
		}, [clientId]);

		useEffect(() => {
			blockCssY.items[itemsWrapSelector] =
				blockCssY.items[itemsWrapSelector] != undefined
					? blockCssY.items[itemsWrapSelector]
					: {};

			var nthItemsResponsive = [];
			var itemX = { ...blockCssY.items };

			Object.entries(grid.options.itemCss).map((args) => {
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
		}, [grid]);

		var [layoutImporting, setlayoutImporting] = useState(false); // Using the hook.

		function importLayout(postData) {
			setTimeout(() => {
				apiFetch({
					path: "/post-grid/v2/import_post_grid_template",
					method: "POST",
					data: { postData: postData },
				}).then((res) => {
					setlayoutImporting(false);
				});
			}, 2000);
		}

		// const paginationTypes = {
		//   none: { label: 'None', value: 'none', isPro: false },
		//   normal: { label: 'Normal Pagination', value: 'normal', isPro: false },
		//   ajax: { label: 'Ajax Pagination', value: 'ajax', isPro: true },
		//   next_previous: { label: 'Next-Previous', value: 'next_previous', isPro: true },
		//   loadmore: { label: 'Load More', value: 'loadmore', isPro: true },
		//   infinite: { label: 'Infinite Load', value: 'infinite', isPro: true },
		// };

		// [
		//       { label: 'None', value: 'none', isPro: false },
		//       { label: 'Normal Pagination', value: 'normal', isPro: false },
		//       { label: 'Ajax Pagination', value: 'ajax', isPro: true },
		//       { label: 'Next-Previous', value: 'next_previous', isPro: true },
		//       { label: 'Load More', value: 'loadmore', isPro: true },
		//       { label: 'Infinite Load', value: 'infinite', isPro: true },
		//     ]

		// var ItemNthCssadasd2 = grid.options.itemCss.map((x, i) => {

		//   return (
		//     `<style>.item:nth-child(${i + 1}){grid-column-start: ${x['grid-column-start']};grid-column-end: ${x['grid-column-end']};grid-row-start: ${x['grid-row-start']};grid-row-end: ${x['grid-row-end']};}</style>`
		//   )

		// });

		var breakPointList = [{ label: "Select..", icon: "", value: "" }];

		for (var x in breakPoints) {
			var item = breakPoints[x];
			breakPointList.push({
				label: item.name,
				icon: item.icon,
				value: item.id,
			});
		}

		function addQueryPreset(option, index) {
			var queryArgsX = { ...queryArgs };

			queryArgsX.items = option.value.items;
			setAttributes({ queryArgs: { items: queryArgsX.items } });
			fetchPosts();
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

		const TEMPLATE = [
			["core/post-title"],
			["core/post-date"],
			["core/post-excerpt"],
		];

		const TEMPLATE1 = [
			["core/post-date"],
			["core/post-title"],
			["core/post-excerpt"],
		];

		//var blocks = select.getBlocks(clientId);

		var defaultBloicks = [];

		//var [blocksX, setBlocksX] = useState(blocks); // Using the hook.
		var [TEMPLATEX, setTEMPLATEX] = useState(TEMPLATE); // Using the hook.

		function PostTemplateInnerBlocks({ attsx }) {
			const innerBlocksProps = useInnerBlocksProps(
				{ className: "item" },
				{ template: attsx }
			);
			return <div {...innerBlocksProps}></div>;
		}

		function PostTemplateBlockPreview({
			blocks,
			blockContextId,
			isHidden,
			setActiveBlockContextId,
		}) {
			const blockPreviewProps = useBlockPreview({
				blocks,
				props: {
					className: "item",
				},
			});

			const handleOnClick = () => {
				setActiveBlockContextId(blockContextId);
			};

			const style = {
				display: isHidden ? "none" : undefined,
			};

			return (
				<div
					{...blockPreviewProps}
					tabIndex={0}
					// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
					role="button"
					onClick={handleOnClick}
					onKeyPress={handleOnClick}
					style={style}
				/>
			);
		}

		const MemoizedPostTemplateBlockPreview = memo(PostTemplateBlockPreview);

		const [activeBlockContextId, setActiveBlockContextId] = useState();

		// const useGetDeviceType = () => {
		//   const { deviceType } = useSelect((select) => {
		//     const { __experimentalGetPreviewDeviceType: getPreviewDeviceType } =
		//       select("core/edit-post") || false;

		//     if (!getPreviewDeviceType) {
		//       return {
		//         deviceType: null,
		//       };
		//     }

		//     return {
		//       deviceType: getPreviewDeviceType(),
		//     };
		//   }, []);


		//   return deviceType;
		// };

		// const deviceType = useGetDeviceType() || "Desktop";

		function onChangeBreakPoint(x, _index) {
			var asdsdsd = wp.data.dispatch("postgrid-shop").setBreakPoint(x.value);

			asdsdsd.then((res) => {
				setBreakPointX(res.breakpoint);

				myStore.generateBlockCss(blockCssY.items, blockId, customCss);
			});

			const {
				__experimentalGetPreviewDeviceType: getPreviewDeviceType,
			} = select("core/edit-post");

			const gutenbergDeviceType = getPreviewDeviceType();

		}

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId, customCss);
		}, [blockCssY]);

		const [posts, setPosts] = useState([]); // Using the hook.
		const [postsQuery, setPostsQuery] = useState(false); // Using the hook.
		const [paginationItems, setPaginationItems] = useState([]); // Using the hook.

		function fetchPosts() {
			setPostsQuery(true);
			setIsBusy(true);

			var arg = queryArgs.items.map((item) => {
				return { id: item.id, val: item.val };
			});

			apiFetch({
				path: "/post-grid/v2/get_posts",
				method: "POST",
				data: { queryArgs: arg, rawData: layout.rawData },
			}).then((res) => {
				setPostsQuery(false);

				setPosts(res.posts);
				setPaginationItems(res.pagination);

				setIsBusy(false);
			});
		}

		function generateLayout(x, _i) {
			var savedBlocks = layout.data;

			var content =
				"<!-- wp:paragraph --><p>paragraph one</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>then two</p><!-- /wp:paragraph -->";

			// Parse the serialized content into valid blocks using parse from @wordpress/block-serialization-default-parser
			var blocks = savedBlocks.length > 0 ? savedBlocks : parse(content);

			var sss = blocks.map((block, i) => {
				if (block.blockName !== null) {
					return (
						<RawHTML>
							{block.innerBlocks.length > 0
								? recursInnerBlocksHtml(block.innerBlocks, i)
								: block.innerHTML}
						</RawHTML>
					);
				}
			});

			return (
				<div className="bg-gray-400 p-3 ">
					{x.post_title}
					{sss}
				</div>
			);
		}
		function recursInnerBlocksHtml(blocks, _index = 0) {
			var xx = blocks.map((block, i) => {
				return (
					<RawHTML>
						2nd Block
						{block.innerBlocks.length > 0
							? block.innerHTML + recursInnerBlocksHtml(block.innerBlocks, i)
							: block.innerHTML}
					</RawHTML>
				);
			});

			return xx;
		}

		useEffect(() => {
			fetchPosts();
		}, [layout]);

		useEffect(() => {
			fetchPosts();
		}, [queryArgs]);

		useEffect(() => {
			fetchLayouts();
			fetchLayoutData();
		}, [container]);

		function flatObject(block, flatObj, flatObjCss) {
			flatObj.push(block);

			var items =
				block.attrs.blockCssY != undefined ? block.attrs.blockCssY.items : [];

			if (Object.entries(items).length > 0) {
				Object.entries(items).map((data) => {
					var handle = data[0];
					var css = data[1];

					//flatObjCss[handle] = css;
				});
			}

			if (block.innerBlocks != undefined) {
				block.innerBlocks.map((block) => {
					flatObject(block, flatObj);
				});
			}

			return flatObj;
		}

		function getCssfromBlocks(allStyle, blocks) {
			blocks.map((block, i) => {
				var items =
					block.attrs.blockCssY != undefined ? block.attrs.blockCssY.items : [];
				var innerBlocks =
					block.innerBlocks != undefined ? block.innerBlocks : [];

				if (Object.entries(items).length > 0) {
					Object.entries(items).map((data) => {
						var handle = data[0];
						var css = data[1];

						allStyle[handle] = css;
					});
				}

				if (innerBlocks.length > 0) {
					getCssfromBlocks(allStyle, innerBlocks);
				}
			});

			return allStyle;
		}

		function selectLayout(id, postContent) {
			var srcServer = layoutData.source;

			if (srcServer == "library") {
				var blocks = parse(postContent);

				setAttributes({
					layout: {
						id: null,
						srcServer: srcServer,
						data: blocks,
						rawData: postContent,
					},
				});

				var allStyle = {};

				var allStyleX = getCssfromBlocks(allStyle, blocks);


				// blocks.map((block, i) => {

				//   var items = (block.attrs.blockCssY != undefined) ? block.attrs.blockCssY.items : [];

				//   if (Object.entries(items).length > 0) {

				//     Object.entries(items).map(data => {

				//       var handle = data[0];
				//       var css = data[1];

				//       allStyle[handle] = css;
				//     })
				//   }

				// })

				var xxx = { ...blockCssY.items, ...allStyleX };

				setAttributes({ blockCssY: { items: xxx } });
			} else {
				apiFetch({
					path: "/post-grid/v2/get_post_data",
					method: "POST",
					data: { postId: id },
				}).then((res) => {
					var postContent = res.post_content.replace(/(^[ \t]*\n)/gm, "");
					var blocks = parse(postContent);

					setAttributes({
						layout: {
							id: id,
							srcServer: srcServer,
							data: blocks,
							rawData: postContent,
						},
					});

					var allStyle = {};
					var flatObj = [];
					var flatObjCss = [];

					var flatData = flatObject(blocks[0], flatObj, flatObjCss);

					flatData.map((block, i) => {
						var items =
							block.attrs.blockCssY != undefined
								? block.attrs.blockCssY.items
								: [];

						if (Object.entries(items).length > 0) {
							Object.entries(items).map((data) => {
								var handle = data[0];
								var css = data[1];

								allStyle[handle] = css;
							});
						}
					});

					var xxx = { ...blockCssY.items, ...allStyle };

					setAttributes({ blockCssY: { items: xxx } });
				});
			}

			//console.log(wp.data.select('core/block-editor').getBlocks());

			//wp.data.dispatch('core/block-editor').insertBlocks(wp.blocks.parse(post_content));

			//wp.data.dispatch('core/notices').createNotice('success', 'Here is our notice!');

			//var content = "<!-- wp:paragraph --><p>paragraph one</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>then two</p><!-- /wp:paragraph -->";

			//Parse the serialized content into valid blocks using parse from @wordpress/block-serialization-default-parser
			// var gutblock = wp.blocks.rawHandler({
			//   HTML: post_content,
			// });

			//setBlocksX(gutblock)

			// setAttributes({ layout: { id: id, data: blocks, rawData: post_content } })
		}

		const [queryLayouts, setQueryLayouts] = useState({
			keyword: "",
			page: 1,
			category: "",
		});
		var [layoutList, setLayoutList] = useState({ items: [] });
		var [layoutData, setLayoutData] = useState({ source: "library" });
		var [layoutLoading, setLayoutLoading] = useState(false);
		var [layoutCats, setLayoutCats] = useState([]);

		useEffect(() => {
			var keywordLength = queryLayouts.keyword.length;

			if (keywordLength != 0) {
				if (keywordLength >= 4) {
					fetchLayouts();
				} else {
				}
			} else {
				fetchLayouts();
			}
		}, [layoutData]);

		useEffect(() => {
			var keywordLength = queryLayouts.keyword.length;

			if (keywordLength != 0) {
				if (keywordLength >= 4) {
					fetchLayouts();
				} else {
				}
			} else {
				fetchLayouts();
			}
		}, [queryLayouts]);

		function fetchLayouts() {
			setLayoutLoading(true);

			if (layoutData.source == "saved") {
				apiFetch({
					path: "/post-grid/v2/get_posts_layout",
					method: "POST",
					data: {
						category: queryLayouts.category,
						page: queryLayouts.page,
						keyword: queryLayouts.keyword,
					},
				}).then((res) => {
					setLayoutList({ items: res.posts });

					setLayoutCats(res.terms);

					setLayoutLoading(false);
				});
			} else {
				fetch(
					"https://getpostgrid.com/wp-json/postlayout/v2/get_post_layouts?category=" +
						queryLayouts.category +
						"&page=" +
						queryLayouts.page +
						"&keyword=" +
						queryLayouts.keyword,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json;charset=utf-8",
						},
					}
				)
					.then((response) => {
						if (response.ok && response.status < 400) {
							response.json().then((data) => {
								setLayoutList({ items: data.posts });
								setLayoutCats(data.terms);

								setLayoutLoading(false);
							});
						}
					})
					.catch((_error) => {
						//this.saveAsStatus = 'error';
						// handle the error
					});
			}
		}

		function fetchLayoutData() {
			setQueryLayouts({
				keyword: queryLayouts.keyword,
				page: queryLayouts.page,
				category: queryLayouts.category,
			});

			apiFetch({
				path: "/post-grid/v2/get_posts_layout",
				method: "POST",
				data: {
					category: queryLayouts.category,
					source: queryLayouts.source,
					page: queryLayouts.page,
					keyword: queryLayouts.keyword,
				},
			}).then((_res) => {
				setLayoutData({ source: layoutData.source });
				setQueryLayouts({
					keyword: queryLayouts.keyword,
					page: queryLayouts.page,
					category: queryLayouts.category,
				});
			});
		}

		function updateQueryPram(newVal, index) {

			var queryArgsX = { ...queryArgs };
			// var itemsX = queryArgsX.items;


			// itemsX[index].val = newVal

			// var cssPath = [index, 'val']
			// const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)
			// var result = [];

			// Object.entries(cssItems).map((arg) => {

			//   var i = arg[0];
			//   var val = arg[1]

			//   result.push(val)

			// })

			// console.log(result);

			var itemData = queryArgsX.items[index];

			itemData.val = newVal;
			queryArgsX.items[index] = itemData;
			setAttributes({ queryArgs: { items: queryArgsX.items } });

			fetchPosts();
		}

		function generateQueryArgOptions(item, index) {
			var itemId = item.id;

			return (
				<div className=" ">
					<PanelBody
						title={
							<RemoveQueryPram
								title={
									queryPrams[itemId] == undefined
										? itemId
										: queryPrams[itemId].label
								}
								index={index}
							/>
						}
						initialOpen={false}>
						{item.id == "postType" && (
							<div className={item.id == "postType" ? "" : "hidden"}>
								<PGinputSelect
									val={item.val}
									options={postTypes}
									multiple={true}
									onChange={(newVal) => {
										updateQueryPram(newVal, index);
									}}
								/>
							</div>
						)}

						{item.id == "postStatus" && (
							<div className={item.id == "postStatus" ? "" : "hidden"}>
								<PGinputSelect
									val={item.val}
									options={[
										{ label: "Publish", value: "publish" },
										{ label: "Pending", value: "pending" },
										{ label: "Draft", value: "draft" },
										{ label: "Auto draft", value: "auto-draft" },
										{ label: "Future", value: "future" },
										{ label: "Private", value: "private" },
										{ label: "Inherit", value: "inherit" },
										{ label: "Trash", value: "trash" },
										{ label: "Any", value: "any" },
									]}
									multiple={true}
									onChange={(newVal) => {
										updateQueryPram(newVal, index);
									}}
								/>
							</div>
						)}

						{item.id == "order" && (
							<div className={item.id == "order" ? "" : "hidden"}>
								<SelectControl
									style={{ margin: 0 }}
									label=""
									value={item.val}
									options={[
										{ label: "Ascending", value: "ASC" },
										{ label: "Descending", value: "DESC" },
									]}
									onChange={(newVal) => updateQueryPram(newVal, index)}
								/>
							</div>
						)}
						{item.id == "orderby" && (
							<div className={item.id == "orderby" ? "" : "hidden"}>
								<PGinputSelect
									val={item.val}
									options={[
										{ label: "None", value: "none" },
										{ label: "ID", value: "ID" },
										{ label: "Author", value: "author" },
										{ label: "Title", value: "title" },
										{ label: "Name", value: "name" },

										{ label: "Type", value: "type" },
										{ label: "Date", value: "date" },
										{ label: "Modified", value: "modified" },
										{ label: "Parent", value: "parent" },
										{ label: "Random", value: "rand" },
										{ label: "Comment Count", value: "comment_count" },
										{ label: "Relevance", value: "relevance" },
										{ label: "Menu Order", value: "menu_order" },
										{ label: "Meta Value(String)", value: "meta_value" },
										{ label: "Meta Value(Number)", value: "meta_value_num" },
										{ label: "post__in", value: "post__in" },
										{ label: "post_name__in", value: "post_name__in" },
										{ label: "post_parent__in", value: "post_parent__in" },
									]}
									multiple={true}
									onChange={(newVal) => {
										updateQueryPram(newVal, index);
									}}
								/>
							</div>
						)}
						{item.id == "taxQueryRelation" && (
							<div className={item.id == "taxQueryRelation" ? "" : "hidden"}>
								<SelectControl
									style={{ margin: 0 }}
									label=""
									value={item.val}
									options={[
										{ label: "OR", value: "OR" },
										{ label: "AND", value: "AND" },
									]}
									onChange={(newVal) => updateQueryPram(newVal, index)}
								/>
							</div>
						)}

						{item.id == "metaQuery" && (
							<div>
								<div>
									<div
										className="cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-blue-600 text-sm"
										onClick={(_ev) => {
											var queryArgsX = { ...queryArgs };

											var itemData = queryArgsX.items[index];
											var xx = itemData.val.concat({
												fields: [{ key: "", value: "", type: "", compare: "" }],
												relation: "OR",
											});
											queryArgsX.items[index].val = xx;
											setAttributes({ queryArgs: { items: queryArgsX.items } });
										}}>
										Add
									</div>
									{item.val.map((x, j) => {
										return (
											<div>
												<PanelBody title="Meta Field" initialOpen={false}>
													<div
														className="cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-red-600 text-sm"
														onClick={(_ev) => {
															var queryArgsX = { ...queryArgs };

															var itemData = queryArgsX.items[index];
															var xx = itemData.val.splice(j, 1);
															queryArgsX.items[index].val = itemData.val;
															setAttributes({
																queryArgs: { items: queryArgsX.items },
															});
														}}>
														Remove
													</div>

													<PanelRow>
														<div>Relation</div>
														<SelectControl
															style={{ margin: 0 }}
															label=""
															value={x.relation}
															options={[
																{ label: "OR", value: "OR" },
																{ label: "AND", value: "AND" },
															]}
															onChange={(newVal) => {
																var queryArgsX = { ...queryArgs };

																var itemData = queryArgsX.items[index];

																//itemData.val.relation = newVal;
																itemData.val[j].relation = newVal;

																//var term = itemData.val[j].fields[k]
																//term.taxonomy = newVal;

																queryArgsX.items[index].val = itemData.val;
																setAttributes({
																	queryArgs: { items: queryArgsX.items },
																});
															}}
														/>
													</PanelRow>
													{x.fields.map((y, k) => {
														return (
															<div className="border-b border-solid border-gray-300 py-3">
																<div
																	className="cursor-pointer block text-right mb-2 px-3 py-1 text-white bg-red-600 text-sm"
																	onClick={(_ev) => {
																		var queryArgsX = { ...queryArgs };

																		var itemData = queryArgsX.items[index];
																		var fields = itemData.val[j].fields;
																		var xx = itemData.val[j].fields.splice(
																			k,
																			1
																		);

																		queryArgsX.items[index].val = itemData.val;
																		setAttributes({
																			queryArgs: { items: queryArgsX.items },
																		});
																	}}>
																	Remove
																</div>

																<InputControl
																	label="Custom field key"
																	value={y.key}
																	placeholder="meta_key"
																	onChange={(newVal) => {
																		var queryArgsX = { ...queryArgs };

																		var itemData = queryArgsX.items[index];

																		var term = itemData.val[j].fields[k];
																		term.key = newVal;

																		queryArgsX.items[index].val = itemData.val;
																		setAttributes({
																			queryArgs: { items: queryArgsX.items },
																		});
																	}}
																/>

																<InputControl
																	label="Meta Value "
																	value={y.value}
																	placeholder="25"
																	onChange={(newVal) => {
																		var queryArgsX = { ...queryArgs };

																		var itemData = queryArgsX.items[index];

																		var term = itemData.val[j].fields[k];
																		term.value = newVal;

																		queryArgsX.items[index].val = itemData.val;
																		setAttributes({
																			queryArgs: { items: queryArgsX.items },
																		});
																	}}
																/>

																<PanelRow>
																	<SelectControl
																		style={{ margin: 0 }}
																		label="Custom field type"
																		value={y.type}
																		options={[
																			{ label: "NUMERIC", value: "NUMERIC" },
																			{ label: "BINARY", value: "BINARY" },
																			{ label: "CHAR", value: "CHAR" },
																			{ label: "DATE", value: "DATE" },
																			{ label: "DATETIME", value: "DATETIME" },
																			{ label: "DECIMAL", value: "DECIMAL" },
																			{ label: "SIGNED", value: "SIGNED" },
																			{ label: "TIME", value: "TIME" },
																			{ label: "UNSIGNED", value: "UNSIGNED" },
																		]}
																		onChange={(newVal) => {
																			var queryArgsX = { ...queryArgs };

																			var itemData = queryArgsX.items[index];

																			var term = itemData.val[j].fields[k];
																			term.type = newVal;

																			queryArgsX.items[index].val =
																				itemData.val;
																			setAttributes({
																				queryArgs: { items: queryArgsX.items },
																			});
																		}}
																	/>
																	<SelectControl
																		style={{ margin: 0 }}
																		label="compare "
																		value={y.compare}
																		options={[
																			{ label: "=", value: "=" },
																			{ label: "!=", value: "!=" },
																			{ label: ">", value: ">" },
																			{ label: ">=", value: ">=" },
																			{ label: "<", value: "<" },
																			{ label: "<=", value: "<=" },
																			{ label: "LIKE", value: "LIKE" },
																			{ label: "NOT LIKE", value: "NOT LIKE" },
																			{ label: "IN", value: "IN" },
																			{ label: "NOT IN", value: "NOT IN" },
																			{ label: "BETWEEN", value: "BETWEEN" },
																			{
																				label: "NOT BETWEEN",
																				value: "NOT BETWEEN",
																			},
																			{ label: "EXISTS", value: "EXISTS" },
																			{
																				label: "NOT EXISTS",
																				value: "NOT EXISTS",
																			},
																		]}
																		onChange={(newVal) => {
																			var queryArgsX = { ...queryArgs };

																			var itemData = queryArgsX.items[index];

																			var term = itemData.val[j].fields[k];
																			term.compare = newVal;

																			queryArgsX.items[index].val =
																				itemData.val;
																			setAttributes({
																				queryArgs: { items: queryArgsX.items },
																			});
																		}}
																	/>
																</PanelRow>
															</div>
														);
													})}
													<div
														className="cursor-pointer text-center px-3 py-1 text-white bg-blue-600 text-sm"
														onClick={(_ev) => {
															var queryArgsX = { ...queryArgs };

															var itemData = queryArgsX.items[index];

															var xx = itemData.val[j].fields.concat({
																key: "",
																value: "",
																type: "",
																compare: "",
															});
															queryArgsX.items[index].val[j].fields = xx;

															setAttributes({
																queryArgs: { items: queryArgsX.items },
															});
														}}>
														Add
													</div>
												</PanelBody>
											</div>
										);
									})}
								</div>
							</div>
						)}

						{item.id == "dateQuery" && (
							<div>
								<PanelRow className="my-3">
									<label>Add Arguments</label>
									<SelectControl
										options={[
											{ value: "", label: "Select..." },

											{ value: "year", label: "Year" },
											{ value: "month", label: "Month" },
											{ value: "week", label: "Week" },
											{ value: "day", label: "Day" },
											{ value: "hour", label: "Hour" },
											{ value: "minute", label: "Minute" },
											{ value: "second", label: "Second" },
											{ value: "after", label: "After" },
											{ value: "before", label: "Before" },
											{ value: "inclusive", label: "Inclusive" },
											{ value: "compare", label: "Compare" },
											{ value: "column", label: "Column" },
											{ value: "relation", label: "Relation" },
										]}
										onChange={(newVal) => {
											var queryArgsX = { ...queryArgs };

											var itemData = queryArgsX.items[index];

											if (newVal == "year") {
												var xx = itemData.val.concat({
													id: "year",
													value: "",
													compare: "",
												});
											}
											if (newVal == "month") {
												var xx = itemData.val.concat({
													id: "month",
													value: "",
													compare: "",
												});
											}
											if (newVal == "week") {
												var xx = itemData.val.concat({
													id: "week",
													value: "",
													compare: "",
												});
											}
											if (newVal == "day") {
												var xx = itemData.val.concat({
													id: "day",
													value: "",
													compare: "",
												});
											}
											if (newVal == "hour") {
												var xx = itemData.val.concat({
													id: "hour",
													value: "",
													compare: "",
												});
											}
											if (newVal == "minute") {
												var xx = itemData.val.concat({
													id: "minute",
													value: "",
													compare: "",
												});
											}
											if (newVal == "second") {
												var xx = itemData.val.concat({
													id: "second",
													value: "",
													compare: "",
												});
											}
											if (newVal == "inclusive") {
												var xx = itemData.val.concat({
													id: "inclusive",
													value: true,
												});
											}
											if (newVal == "compare") {
												var xx = itemData.val.concat({
													id: "compare",
													value: "",
												});
											}
											if (newVal == "column") {
												var xx = itemData.val.concat({
													id: "column",
													value: "",
												});
											}
											if (newVal == "relation") {
												var xx = itemData.val.concat({
													id: "relation",
													value: "",
												});
											}
											if (newVal == "before") {
												var xx = itemData.val.concat({
													id: "before",
													value: "",
													year: "",
													month: "",
													day: "",
												});
											}

											if (newVal == "after") {
												var xx = itemData.val.concat({
													id: "after",
													value: "",
													year: "",
													month: "",
													day: "",
												});
											}

											queryArgsX.items[index].val = xx;

											setAttributes({ queryArgs: { items: queryArgsX.items } });
										}}
									/>
								</PanelRow>

								{item.val.map((x, j) => {
									return (
										<div>
											<PanelBody title={x.id} initialOpen={false}>
												<span
													className="cursor-pointer px-3 py-1 text-white bg-red-600 text-sm my-2 inline-block"
													onClick={(_ev) => {
														var queryArgsX = { ...queryArgs };

														queryArgsX.items[index].val.splice(j, 1);
														setAttributes({
															queryArgs: { items: queryArgsX.items },
														});
													}}>
													Delete
												</span>

												{(x.id == "after" || x.id == "before") && (
													<div>
														<PanelRow>
															<label>Year</label>
															<InputControl
																placeholder=""
																onChange={(newVal) => {
																	var queryArgsX = { ...queryArgs };

																	//clearTimeout(debounce);
																	// debounce = setTimeout(() => {

																	queryArgsX.items[index].val[j].year = newVal;
																	setAttributes({
																		queryArgs: { items: queryArgsX.items },
																	});
																	//}, 1000);
																}}
															/>
														</PanelRow>

														<PanelRow>
															<label>Month</label>
															<InputControl
																placeholder=""
																onChange={(newVal) => {
																	var queryArgsX = { ...queryArgs };

																	// clearTimeout(debounce);
																	//debounce = setTimeout(() => {

																	queryArgsX.items[index].val[j].month = newVal;
																	setAttributes({
																		queryArgs: { items: queryArgsX.items },
																	});
																	//}, 1000);
																}}
															/>
														</PanelRow>

														<PanelRow>
															<label>Day</label>
															<InputControl
																placeholder=""
																onChange={(newVal) => {
																	clearTimeout(debounce);
																	debounce = setTimeout(() => {
																		var queryArgsX = { ...queryArgs };

																		queryArgsX.items[index].val[j].day = newVal;
																		setAttributes({
																			queryArgs: { items: queryArgsX.items },
																		});
																	}, 1000);
																}}
															/>
														</PanelRow>
													</div>
												)}

												{x.id == "inclusive" && (
													<div>
														<SelectControl
															style={{ margin: 0 }}
															options={[
																{ label: "True", value: true },
																{ label: "False", value: false },
															]}
															onChange={(newVal) => {
																var queryArgsX = { ...queryArgs };

																queryArgsX.items[index].val[j].value = newVal;
																setAttributes({
																	queryArgs: { items: queryArgsX.items },
																});
															}}
														/>
													</div>
												)}

												{x.id == "compare" && (
													<div>
														<SelectControl
															style={{ margin: 0 }}
															options={[
																{ label: "=", value: "=" },
																{ label: "!=", value: "!=" },
																{ label: ">", value: ">" },
																{ label: ">=", value: ">=" },
																{ label: "<", value: "<" },
																{ label: "<=", value: "<=" },
																{ label: "IN", value: "IN" },
																{ label: "NOT IN", value: "NOT IN" },
																{ label: "EXISTS", value: "EXISTS" },
																{ label: "NOT EXISTS", value: "NOT EXISTS" },
																{ label: "BETWEEN", value: "BETWEEN" },
																{ label: "NOT BETWEEN", value: "NOT BETWEEN" },
															]}
															onChange={(newVal) => {
																var queryArgsX = { ...queryArgs };

																queryArgsX.items[index].val[j].value = newVal;
																setAttributes({
																	queryArgs: { items: queryArgsX.items },
																});
															}}
														/>
													</div>
												)}
												{x.id == "column" && (
													<div>
														<InputControl
															placeholder=""
															onChange={(newVal) => {
																clearTimeout(debounce);
																debounce = setTimeout(() => {
																	var queryArgsX = { ...queryArgs };

																	queryArgsX.items[index].val[j].value = newVal;
																	setAttributes({
																		queryArgs: { items: queryArgsX.items },
																	});
																}, 1000);
															}}
														/>
													</div>
												)}

												{x.id == "relation" && (
													<div>
														<SelectControl
															style={{ margin: 0 }}
															options={[
																{ label: "OR", value: "OR" },
																{ label: "AND", value: "AND" },
															]}
															onChange={(newVal) => {
																var queryArgsX = { ...queryArgs };

																queryArgsX.items[index].val[j].value = newVal;
																setAttributes({
																	queryArgs: { items: queryArgsX.items },
																});
															}}
														/>
													</div>
												)}

												{(x.id == "year" ||
													x.id == "month" ||
													x.id == "week" ||
													x.id == "day" ||
													x.id == "hour" ||
													x.id == "minute" ||
													x.id == "second") && (
													<div>
														<InputControl
															label="Value"
															placeholder=""
															onChange={(newVal) => {
																var queryArgsX = { ...queryArgs };

																//clearTimeout(debounce);
																//debounce = setTimeout(() => {

																queryArgsX.items[index].val[j].value = newVal;
																setAttributes({
																	queryArgs: { items: queryArgsX.items },
																});
																//}, 1000);
															}}
														/>

														<SelectControl
															style={{ margin: 0 }}
															label="compare "
															options={[
																{ label: "=", value: "=" },
																{ label: "!=", value: "!=" },
																{ label: ">", value: ">" },
																{ label: ">=", value: ">=" },
																{ label: "<", value: "<" },
																{ label: "<=", value: "<=" },
																{ label: "IN", value: "IN" },
																{ label: "NOT IN", value: "NOT IN" },
																{ label: "EXISTS", value: "EXISTS" },
																{ label: "NOT EXISTS", value: "NOT EXISTS" },
																{ label: "BETWEEN", value: "BETWEEN" },
																{ label: "NOT BETWEEN", value: "NOT BETWEEN" },
															]}
															onChange={(newVal) => {
																var queryArgsX = { ...queryArgs };

																queryArgsX.items[index].val[j].compare = newVal;
																setAttributes({
																	queryArgs: { items: queryArgsX.items },
																});
															}}
														/>
													</div>
												)}
											</PanelBody>
										</div>
									);
								})}
							</div>
						)}

						{item.id == "taxQuery" && (
							<div>
								<div>
									<div
										className="cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-blue-600 text-sm"
										onClick={(_ev) => {
											var queryArgsX = { ...queryArgs };

											var itemData = queryArgsX.items[index];
											var xx = itemData.val.concat({
												terms: [
													{ taxonomy: "", field: "", terms: [], operator: "" },
												],
												relation: "OR",
											});
											queryArgsX.items[index].val = xx;
											setAttributes({ queryArgs: { items: queryArgsX.items } });
										}}>
										Add
									</div>
									{item.val.map((x, j) => {
										return (
											<div>
												<PanelBody title="Term" initialOpen={false}>
													<div
														className="cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-red-600 text-sm"
														onClick={(_ev) => {
															var queryArgsX = { ...queryArgs };

															var itemData = queryArgsX.items[index];
															var xx = itemData.val.splice(j, 1);
															queryArgsX.items[index].val = itemData.val;
															setAttributes({
																queryArgs: { items: queryArgsX.items },
															});
														}}>
														Remove
													</div>

													<PanelRow>
														<div>Terms Relation</div>
														<SelectControl
															style={{ margin: 0 }}
															label=""
															value={x.relation}
															options={[
																{ label: "OR", value: "OR" },
																{ label: "AND", value: "AND" },
															]}
															onChange={(newVal) => {
																var queryArgsX = { ...queryArgs };

																var itemData = queryArgsX.items[index];

																//itemData.val.relation = newVal;
																itemData.val[j].relation = newVal;

																//var term = itemData.val[j].terms[k]
																//term.taxonomy = newVal;

																queryArgsX.items[index].val = itemData.val;
																setAttributes({
																	queryArgs: { items: queryArgsX.items },
																});
															}}
														/>
													</PanelRow>
													{x.terms.map((y, k) => {
														return (
															<div className="border-b border-solid border-gray-300 py-3">
																<InputControl
																	label="Taxonomy"
																	value={y.taxonomy}
																	placeholder="Taxonomy"
																	onChange={(newVal) => {
																		var queryArgsX = { ...queryArgs };

																		var itemData = queryArgsX.items[index];

																		var term = itemData.val[j].terms[k];
																		term.taxonomy = newVal;

																		queryArgsX.items[index].val = itemData.val;
																		setAttributes({
																			queryArgs: { items: queryArgsX.items },
																		});
																	}}
																/>

																<InputControl
																	label="Terms"
																	value={y.terms.join(",")}
																	placeholder="Comma separated"
																	onChange={(newVal) => {
																		var queryArgsX = { ...queryArgs };

																		var itemData = queryArgsX.items[index];

																		var term = itemData.val[j].terms[k];
																		term.terms = newVal.split(",");

																		queryArgsX.items[index].val = itemData.val;
																		setAttributes({
																			queryArgs: { items: queryArgsX.items },
																		});
																	}}
																/>

																<PanelRow>
																	<SelectControl
																		style={{ margin: 0 }}
																		label="Fields"
																		value={y.field}
																		options={[
																			{ label: "Choose...", value: "" },

																			{ label: "Term ID", value: "term_id" },
																			{ label: "Name", value: "name" },
																			{ label: "Slug", value: "slug" },
																			{
																				label: "Term taxonomy id",
																				value: "term_taxonomy_id",
																			},
																		]}
																		onChange={(newVal) => {
																			var queryArgsX = { ...queryArgs };

																			var itemData = queryArgsX.items[index];

																			var term = itemData.val[j].terms[k];
																			term.field = newVal;

																			queryArgsX.items[index].val =
																				itemData.val;
																			setAttributes({
																				queryArgs: { items: queryArgsX.items },
																			});
																		}}
																	/>
																	<SelectControl
																		style={{ margin: 0 }}
																		label="Operator"
																		value={y.operator}
																		options={[
																			{ label: "Choose...", value: "" },

																			{ label: "IN", value: "IN" },
																			{ label: "NOT IN", value: "NOT IN" },
																			{ label: "AND", value: "AND" },
																			{ label: "EXISTS", value: "EXISTS" },
																			{
																				label: "NOT EXISTS",
																				value: "NOT EXISTS",
																			},
																		]}
																		onChange={(newVal) => {
																			var queryArgsX = { ...queryArgs };

																			var itemData = queryArgsX.items[index];

																			var term = itemData.val[j].terms[k];
																			term.operator = newVal;

																			queryArgsX.items[index].val =
																				itemData.val;
																			setAttributes({
																				queryArgs: { items: queryArgsX.items },
																			});
																		}}
																	/>
																</PanelRow>

																<div
																	className="cursor-pointer block text-center my-2 px-3 py-1 text-white bg-red-600 text-sm"
																	onClick={(_ev) => {
																		var queryArgsX = { ...queryArgs };

																		var itemData = queryArgsX.items[index];
																		var terms = itemData.val[j].terms;

																		var xx = itemData.val[j].terms.splice(k, 1);
																		queryArgsX.items[index].val = itemData.val;
																		setAttributes({
																			queryArgs: { items: queryArgsX.items },
																		});
																	}}>
																	Remove
																</div>
															</div>
														);
													})}
													<div
														className="cursor-pointer text-center px-3 py-1 text-white bg-blue-600 text-sm"
														onClick={(_ev) => {
															var queryArgsX = { ...queryArgs };

															var itemData = queryArgsX.items[index];

															var xx = itemData.val[j].terms.concat({
																taxonomy: "",
																field: "",
																terms: [],
																operator: "",
															});
															queryArgsX.items[index].val[j].terms = xx;

															setAttributes({
																queryArgs: { items: queryArgsX.items },
															});
														}}>
														Add
													</div>
												</PanelBody>
											</div>
										);
									})}
								</div>
							</div>
						)}

						{(item.id == "metaKey" ||
							item.id == "s" ||
							item.id == "metaValue" ||
							item.id == "metaValueNum" ||
							item.id == "year" ||
							item.id == "monthnum" ||
							item.id == "w" ||
							item.id == "day" ||
							item.id == "hour" ||
							item.id == "minute" ||
							item.id == "second" ||
							item.id == "m" ||
							item.id == "author" ||
							item.id == "authorName" ||
							item.id == "tag" ||
							item.id == "tagId" ||
							item.id == "cat" ||
							item.id == "categoryName" ||
							item.id == "p" ||
							item.id == "name" ||
							item.id == "pageId" ||
							item.id == "pagename" ||
							item.id == "postParent" ||
							item.id == "postsPerPage" ||
							item.id == "paged" ||
							item.id == "offset" ||
							item.id == "postsPerArchivePage" ||
							item.id == "perm") && (
							<div>
								<InputControl
									value={item.val}
									onChange={(newVal) => {
										clearTimeout(debounce);
										debounce = setTimeout(() => {
											updateQueryPram(newVal, index);
										}, 1000);
									}}
								/>
							</div>
						)}
						{item.id == "metaCompare" && (
							<div>
								<SelectControl
									style={{ margin: 0 }}
									label=""
									value={item.val}
									options={[
										{ label: "=", value: "=" },
										{ label: "!=", value: "!=" },
										{ label: ">", value: ">" },
										{ label: ">=", value: ">=" },
										{ label: "<", value: "<" },
										{ label: "<=", value: "<=" },
										{ label: "LIKE", value: "LIKE" },
										{ label: "NOT LIKE", value: "NOT LIKE" },
										{ label: "IN", value: "IN" },
										{ label: "NOT IN", value: "NOT IN" },
										{ label: "BETWEEN", value: "BETWEEN" },
										{ label: "NOT BETWEEN", value: "NOT BETWEEN" },
										{ label: "NOT EXISTS", value: "NOT EXISTS" },
										{ label: "REGEXP", value: "REGEXP" },
										{ label: "NOT REGEXP", value: "NOT REGEXP" },
										{ label: "RLIKE", value: "RLIKE" },
									]}
									onChange={(newVal) => {
										updateQueryPram(newVal, index);
									}}
								/>
							</div>
						)}

						{item.id == "postPassword" && (
							<div>
								<InputControl
									value={item.val}
									onChange={(newVal) => updateQueryPram(newVal, index)}
								/>
							</div>
						)}

						{(item.id == "postNameIn" ||
							item.id == "authorIn" ||
							item.id == "authorNotIn" ||
							item.id == "postNotIn" ||
							item.id == "postIn" ||
							item.id == "postParentNotIn" ||
							item.id == "tagNotIn" ||
							item.id == "tagAnd" ||
							item.id == "tagIn" ||
							item.id == "postParentIn" ||
							item.id == "tagSlugIn" ||
							item.id == "tagSlugAnd" ||
							item.id == "categoryNotIn" ||
							item.id == "categoryIn" ||
							item.id == "categoryAnd") && (
							<div>
								<InputControl
									value={item.val}
									placeholder="Comma separated"
									onChange={(newVal) => updateQueryPram(newVal, index)}
								/>
							</div>
						)}
						<div className={item.id == "postNameIndd" ? "" : "hidden"}>
							<div
								className="cursor-pointer text-center px-3 py-1 text-white bg-blue-600 text-sm"
								onClick={(_ev) => {
									var queryArgsX = { ...queryArgs };

									var itemData = queryArgsX.items[index];

									var val = itemData.val.concat({ slug: "" });
									itemData.val = val;
									queryArgsX.items[index] = itemData;
									setAttributes({ queryArgs: { items: queryArgsX.items } });
								}}>
								Add
							</div>
						</div>

						{item.id == "commentCount" && (
							<div>
								<InputControl
									value={item.val.value}
									placeholder="Comment Count, Ex: 25"
									onChange={(newVal) =>
										updateQueryPram(
											{ value: newVal, compare: item.val.compare },
											index
										)
									}
								/>
								<SelectControl
									style={{ margin: 0 }}
									label=""
									value={item.val.compare}
									options={[
										{ label: "=", value: "=" },
										{ label: "!=", value: "!=" },
										{ label: ">", value: ">" },
										{ label: ">=", value: ">=" },
										{ label: "<", value: "<" },
										{ label: "<=", value: "<=" },
									]}
									onChange={(newVal) =>
										updateQueryPram(
											{ value: item.val.value, compare: newVal },
											index
										)
									}
								/>
							</div>
						)}

						{item.id == "postMimeType" && (
							<div>
								<PGinputSelect
									val={item.val}
									options={[
										{ label: "image/jpeg", value: "jpg|jpeg|jpe" },
										{ label: "image/gif", value: "gif" },
										{ label: "image/png", value: "png" },
										{ label: "image/bmp", value: "bmp" },
									]}
									multiple={true}
									onChange={(newVal) => {
										updateQueryPram(newVal, index);
									}}
								/>
							</div>
						)}
						{(item.id == "cacheResults" ||
							item.id == "nopaging" ||
							item.id == "hasPassword" ||
							item.id == "updatePostMetaCache" ||
							item.id == "updatePostTermCache") && (
							<div>
								<SelectControl
									style={{ margin: 0 }}
									label=""
									value={item.val}
									options={[
										{ label: "True", value: true },
										{ label: "False", value: false },
									]}
									onChange={(newVal) => updateQueryPram(newVal, index)}
								/>
							</div>
						)}

						{item.id == "ignoreStickyPosts" && (
							<div>
								<SelectControl
									style={{ margin: 0 }}
									label=""
									value={item.val}
									options={[
										{ label: "True", value: true },
										{ label: "False", value: false },
									]}
									onChange={(newVal) => updateQueryPram(newVal, index)}
								/>
							</div>
						)}

						<p>
							{" "}
							{queryPrams[itemId] == undefined
								? itemId
								: queryPrams[itemId].description}
						</p>
					</PanelBody>
				</div>
			);
		}

		function addQueryPram(option, index) {
			var id = option.id;
			var queryArgsX = { ...queryArgs };

			var data = { val: queryPrams[id].value, id: id };
			var multiple = data.multiple;

			var isExist = queryArgsX.items.map((item) => {
				if (item.id == id) {
					return true;
				}
			});

			var items = queryArgsX.items.concat([data]);
			setAttributes({ queryArgs: { items: items } });
		}

		var RemoveQueryPram = function ({ title, index }) {
			return (
				<>
					<span
						className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
						onClick={(ev) => {
							var queryArgsX = { ...queryArgs };

							queryArgsX.items.splice(index, 1);
							setAttributes({ queryArgs: { items: queryArgsX.items } });
						}}>
						<Icon icon={close} />
					</span>
					<span className="mx-2">{title}</span>
				</>
			);
		};

		return (
			<>
				<InspectorControls>
					<PanelBody title="Layouts" initialOpen={false}>
						<div className="text-white cursor-pointer">
							<div
								className={
									layoutData.source == "library"
										? "bg-blue-500 w-1/2 inline-block px-3 py-2 text-[14px] font-bold"
										: "bg-blue-300 text-[14px] font-bold inline-block px-3 py-2 w-1/2"
								}
								onClick={(_ev) => {
									setLayoutData({ source: "library" });
									setQueryLayouts({ keyword: "", page: 1, category: "" });
								}}>
								Library
							</div>
							<div
								className={
									layoutData.source == "saved"
										? "bg-blue-500 w-1/2 inline-block px-3 py-2 text-[14px] font-bold"
										: "bg-blue-300 inline-block px-3 py-2 w-1/2 text-[14px] font-bold"
								}
								onClick={(_ev) => {
									setLayoutData({ source: "saved" });
									setQueryLayouts({ keyword: "", page: 1, category: "" });
								}}>
								Saved
							</div>
						</div>

						<PanelRow>
							<InputControl
								value={queryLayouts.keyword}
								type="text"
								placeholder="Search Layouts..."
								onChange={(newVal) => {
									clearTimeout(debounce);
									debounce = setTimeout(() => {
										setQueryLayouts({
											keyword: newVal,
											page: queryLayouts.page,
											category: queryLayouts.category,
										});
									}, 1000);

									//fetchLayouts();
								}}
							/>
							<SelectControl
								className="w-full"
								style={{ margin: 0 }}
								label=""
								value={queryLayouts.category}
								options={layoutCats}
								onChange={(newVal) => {
									setQueryLayouts({
										keyword: queryLayouts.keyword,
										page: queryLayouts.page,
										category: newVal,
									});
									//fetchLayouts();
								}}
							/>
						</PanelRow>

						{layoutData.source == "saved" && (
							<div className="flex gap-2	">
								<div className="w-full rounded-sm  py-2 bg-blue-500 text-[14px] font-bold text-white cursor-pointer my-3 text-center ">
									<a
										className=" "
										target="_blank"
										href={
											clientData.siteAdminurl +
											"edit.php?post_type=post_grid_template"
										}>
										All Layouts
									</a>
								</div>

								<div className="w-full rounded-sm  py-2 bg-blue-500 text-[14px] font-bold text-white cursor-pointer my-3 text-center ">
									<a
										className=""
										target="_blank"
										href={
											clientData.siteAdminurl +
											"post-new.php?post_type=post_grid_template"
										}>
										Create Layout
									</a>
								</div>
							</div>
						)}

						{layoutLoading == true && (
							<div className="text-center">
								<Spinner />
							</div>
						)}

						{layoutLoading == false &&
							layoutList.items.length > 0 &&
							layoutList.items.map((x) => {
								return (
									<div className="my-4 border bg-gray-200 ">
										<div
											className="relative cursor-pointer"
											onClick={(_ev) => {
												if (x.is_pro == true) {
													if (isProFeature == true) {
														alert("Sorry this is only available in premium");
													} else {
														selectLayout(x.post_id, x.post_content);
													}
													return;
												}

												selectLayout(x.post_id, x.post_content);
											}}>
											{layout.id == x.post_id && (
												<span className="absolute bg-amber-500 text-white px-2 py-1 top-0 right-0">
													<span class="dashicons dashicons-saved"></span>{" "}
													Selected
												</span>
											)}

											<img className="w-full" src={x.thumb_url} />

											<div className="text-[14px] p-1 bg-gray-500 text-white bg-opacity-80 text-bold  text-center">
												{x.post_title}
											</div>
										</div>

										<div className="py-3 flex justify-items-stretch">
											{layoutData.source != "library" && (
												<span className="mx-1 inline-block bg-blue-500 hover:bg-blue-400 px-2 py-1 text-white rounded-sm cursor-pointer">
													{" "}
													<a
														target="_blank"
														href={
															clientData.siteAdminurl +
															"post.php?post=" +
															x.post_id +
															"&action=edit"
														}>
														Edit
													</a>{" "}
												</span>
											)}

											<span className="mx-1 inline-block bg-blue-500 hover:bg-blue-400 px-2 py-1 text-white rounded-sm cursor-pointer">
												#{x.post_id}
											</span>

											{layoutData.source == "library" && (
												<>
													<div
														className="mx-1 relative inline-block bg-blue-500 hover:bg-blue-400 px-2 py-1 text-white rounded-sm cursor-pointer"
														onClick={(ev) => {
															if (isProFeature == false) {
																if (!importLayoutOpen.isOpen) {
																	setlayoutImporting(true);
																	importLayout(x);
																}
															}
															setimportLayoutOpen({
																id: x.post_id,
																isOpen: !importLayoutOpen.isOpen,
															});
														}}>
														<span class="dashicons dashicons-download"></span>{" "}
														Import
													</div>
													{importLayoutOpen.id == x.post_id &&
														importLayoutOpen.isOpen && (
															<Popover position="bottom left p-2 ">
																{isProFeature == true && (
																	<div className="w-48 bg-amber-100 px-3 py-2">
																		<p className="">
																			{" "}
																			<span className="underline">
																				Importing Layouts
																			</span>{" "}
																			Only available in Premium
																		</p>
																		<p className="">
																			After import the layout you can customize
																			and make your own.
																		</p>
																	</div>
																)}

																{isProFeature == false && (
																	<div className="w-48 bg-sky-300 px-3 py-2">
																		{layoutImporting && (
																			<span>
																				<Spinner /> Importing
																			</span>
																		)}

																		{!layoutImporting && (
																			<p className="">
																				Layout imported and saved under{" "}
																				<a
																					target="_blank"
																					className="font-bold underline "
																					href={
																						clientData.siteAdminurl +
																						"edit.php?post_type=post_grid_template"
																					}>
																					Saved Templates
																				</a>
																			</p>
																		)}
																	</div>
																)}
															</Popover>
														)}
												</>
											)}

											{x.is_pro == true && (
												<span className=" bg-amber-500 text-white px-3 rounded-sm py-1">
													Pro
												</span>
											)}

											{x.is_pro == false && (
												<span className=" bg-lime-600 text-white px-3 rounded-sm py-1">
													Free
												</span>
											)}

											{/* {x.sale_price > 0 &&
                          (
                            <span className='mx-2 hidden' >Price:
                              <del className='ml-2' >{x.price} </del>-<span className='' >{x.sale_price}USD </span>
                            </span>
                          )
                        }
                        {x.sale_price == 0 &&
                          (
                            <span className='mx-2 hidden' >Price:
                              <span className='' > ${x.sale_price}</span>
                            </span>
                          )
                        } */}

											{/* 
                        <span title='Buy To Download' className={['text-white px-3 py-1 mx-2', x.is_pro ? ' bg-amber-400' : ' bg-blue-600'].join('')}>
                          {x.is_pro ? 'Buy Now' : 'Free'}
                        </span> */}
										</div>
									</div>
								);
							})}

						<div
							className="w-full rounded-sm  py-2 bg-blue-500 text-[14px] font-bold text-white cursor-pointer my-3 text-center"
							onClick={(_ev) => {
								var page = queryLayouts.page + 1;


								setQueryLayouts({
									keyword: queryLayouts.keyword,
									page: page,
									category: queryLayouts.category,
								});
							}}>
							{layoutLoading.loading == true && (
								<span className="text-center">
									<Spinner />
								</span>
							)}
							Load More
						</div>
					</PanelBody>

					<PanelBody title="Query Post" initialOpen={false}>
						<PanelRow className="my-3">
							<PGDropdown
								position="bottom right"
								variant="secondary"
								options={queryPresets}
								buttonTitle="Query Presets"
								onChange={addQueryPreset}
								values={""}></PGDropdown>
							<PGDropdown
								position="bottom right"
								variant="secondary"
								options={queryPrams}
								buttonTitle="Add Query Params"
								onChange={addQueryPram}
								values=""></PGDropdown>
						</PanelRow>

						{queryArgs.items.map((item, index) => {
							return generateQueryArgOptions(item, index);
						})}
					</PanelBody>

					<PanelBody title="Container" initialOpen={false}>
						<PGStyles
							obj={container}
							onChange={onChangeStyleContainer}
							onAdd={onAddStyleContainer}
							onRemove={onRemoveStyleContainer}
						/>
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
						<div>
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
												"https://pickplugins.com/post-grid/?utm_source=nthItemCSS&utm_term=blockPostgrid&utm_campaign=pluginPostGrid&utm_medium=nthItemCSS"
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
						</div>
					</PanelBody>

					<PanelBody title="Grid Layouts" initialOpen={false}>
						{gridLayouts.map((x, _i) => {
							return (
								<div
									className="cursor-pointer relative hover:bg-blue-200 my-3"
									onClick={(_ev) => {
										if (x.isPro) {
											//setAttributes({ grid: x.data })
										} else {
											setAttributes({ grid: x.data });
										}
									}}>
									{x.isPro && (
										<span className="bg-amber-400 absolute top-2 left-0 rounded-sm px-3 mx-2  text-white hover:text-white">
											<a
												target="_blank"
												href={
													"https://pickplugins.com/post-grid/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=" +
													x.label
												}>
												Pro
											</a>
										</span>
									)}
									{x.icon != undefined && (
										<div className="w-full grid-layout-prewview">{x.icon}</div>
									)}
									<div className="text-[16px] p-2 bg-blue-600 text-white bg-opacity-90 text-bold  w-full text-center">
										{x.title}
									</div>
								</div>
							);
						})}
					</PanelBody>

					<PanelBody title="Pagination" initialOpen={false}>
						<div className="my-4">
							<PanelRow className="mb-4">
								<label for="">Pagination Type</label>
								<PGDropdown
									position="bottom right"
									variant="secondary"
									options={paginationTypes}
									buttonTitle="Choose"
									onChange={(arg, index) => {
										var options = { ...pagination.options, type: arg.value };
										setAttributes({
											pagination: { ...pagination, options: options },
										});
									}}
									values={""}></PGDropdown>
							</PanelRow>

							{pagination.options.type.length != 0 && (
								<div className="bg-gray-500 text-white px-3 py-2 my-5">
									{paginationTypes[pagination.options.type] != undefined
										? paginationTypes[pagination.options.type].label
										: ""}
								</div>
							)}

							{(pagination.options.type == "normal" ||
								pagination.options.type == "ajax") && (
								<>
									<PanelRow>
										<label for="">Max Number of Pagination</label>
										<InputControl
											value={pagination.options.maxPageNum}
											onChange={(newVal) => {
												var options = {
													...pagination.options,
													maxPageNum: newVal,
												};
												setAttributes({
													pagination: { ...pagination, options: options },
												});
											}}
										/>
									</PanelRow>
								</>
							)}

							{(pagination.options.type == "normal" ||
								pagination.options.type == "ajax" ||
								pagination.options.type == "next_previous") && (
								<>
									<PanelRow>
										<label for="">Previous Text</label>
										<InputControl
											value={pagination.options.prevText}
											onChange={(newVal) => {
												var options = {
													...pagination.options,
													prevText: newVal,
												};
												setAttributes({
													pagination: { ...pagination, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label for="">Next Text</label>
										<InputControl
											value={pagination.options.nextText}
											onChange={(newVal) => {
												var options = {
													...pagination.options,
													nextText: newVal,
												};
												setAttributes({
													pagination: { ...pagination, options: options },
												});
											}}
										/>
									</PanelRow>
								</>
							)}

							{(pagination.options.type == "loadmore" ||
								pagination.options.type == "infinite") && (
								<>
									<PanelRow>
										<label for="">Load More Text</label>

										<InputControl
											value={pagination.options.loadMoreText}
											onChange={(newVal) => {
												var options = {
													...pagination.options,
													loadMoreText: newVal,
												};
												setAttributes({
													pagination: { ...pagination, options: options },
												});
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label for="">No Posts Text</label>

										<InputControl
											value={pagination.options.noMorePosts}
											onChange={(newVal) => {
												var options = {
													...pagination.options,
													noMorePosts: newVal,
												};
												setAttributes({
													pagination: { ...pagination, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label for="">Loading Text</label>

										<InputControl
											value={pagination.options.loadingText}
											onChange={(newVal) => {
												var options = {
													...pagination.options,
													loadingText: newVal,
												};
												setAttributes({
													pagination: { ...pagination, options: options },
												});
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label for="">Loading Icon</label>

										<PGIconPicker
											library={pagination.options.loadingIcon.library}
											srcType={pagination.options.loadingIcon.srcType}
											iconSrc={pagination.options.loadingIcon.iconSrc}
											onChange={(arg) => {
												var options = {
													...pagination.options,
													loadingIcon: {
														srcType: arg.srcType,
														library: arg.library,
														iconSrc: arg.iconSrc,
													},
												};

												setAttributes({
													pagination: { ...pagination, options: options },
												});
											}}
										/>
									</PanelRow>
								</>
							)}
						</div>

						<PanelBody
							className=""
							title="Pagination Wrapper"
							initialOpen={false}>
							<PGtabs
								activeTab="styles"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
									{
										name: "styles",
										title: "Styles",
										icon: pencil,
										className: "tab-style",
									},
									{
										name: "css",
										title: "CSS Library",
										icon: cloud,
										className: "tab-css",
									},
								]}>
								<PGtab name="styles">
									<PGStyles
										obj={pagination}
										onChange={onChangeStylePagination}
										onAdd={onAddStylePagination}
										onRemove={onRemoveStylePagination}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={pagination}
										onChange={onPickCssLibraryPagination}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody title="Pagination Items" initialOpen={false}>
							<PGtabs
								activeTab="styles"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
									{
										name: "styles",
										title: "Styles",
										icon: pencil,
										className: "tab-style",
									},
									{
										name: "css",
										title: "CSS Library",
										icon: cloud,
										className: "tab-css",
									},
								]}>
								<PGtab name="styles">
									<PGStyles
										obj={paginationItem}
										onChange={onChangeStylePaginationItem}
										onAdd={onAddStylePaginationItem}
										onRemove={onRemoveStylePaginationItem}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={paginationItem}
										onChange={onPickCssLibraryPaginationItem}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody title="Pagination Active" initialOpen={false}>
							<PGtabs
								activeTab="styles"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
									{
										name: "styles",
										title: "Styles",
										icon: pencil,
										className: "tab-style",
									},
									{
										name: "css",
										title: "CSS Library",
										icon: cloud,
										className: "tab-css",
									},
								]}>
								<PGtab name="styles">
									<PGStyles
										obj={paginationItemActive}
										onChange={onChangeStylePaginationItemActive}
										onAdd={onAddStylePaginationItemActive}
										onRemove={onRemoveStylePaginationItemActive}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={paginationItemActive}
										onChange={onPickCssLibraryPaginationItemActive}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>
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

					<PanelBody className="hidden" title="Search" initialOpen={false}>
						<SelectControl
							label="Enable"
							value={search.enable}
							options={[
								{ label: "No", value: "no" },
								{ label: "Yes", value: "yes" },
							]}
							onChange={(newVal) =>
								setAttributes({ search: { ...search, enable: newVal } })
							}
						/>

						<SelectControl
							label="Search action"
							value={search.type}
							options={[
								{ label: "Ajax - On change form data", value: "ajax" },
								{ label: "On form submit - GET method", value: "form_submit" },
							]}
							onChange={(newVal) =>
								setAttributes({ search: { ...search, type: newVal } })
							}
						/>

						<InputControl
							label="Placeholder text"
							value={search.placeholder}
							onChange={(newVal) =>
								setAttributes({ search: { ...search, placeholder: newVal } })
							}
						/>

						<InputControl
							label="Search icon"
							value={search.icon}
							onChange={(newVal) =>
								setAttributes({ search: { ...search, icon: newVal } })
							}
						/>

						<InputControl
							label="Loading icon"
							value={search.busyIcon}
							onChange={(newVal) =>
								setAttributes({ search: { ...search, busyIcon: newVal } })
							}
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
						<PGTutorials links={tutorialsLinks} />
					</PanelBody>
				</InspectorControls>

				<div {...blockProps}>
					{lazyLoad.options.enable == "yes" && isBusy && (
						<div className={lazyLoad.options.class}></div>
					)}

					{search.enable == "yes" && (
						<div className={search.options.class}>search form</div>
					)}

					{postsQuery == false && posts == null && (
						<div className={noPostsWrap.options.class}>No Post found</div>
					)}

					{postsQuery && (
						<div className={spinnerWrap.options.class}>
							<Spinner />
						</div>
					)}

					{isBusy && (
						<div className="text-center">
							<Spinner />
						</div>
					)}

					{postsQuery == false && posts != null && posts.length > 0 && (
						<div className={itemsWrap.options.class}>
							{posts.map((x, _i) => {
								return (
									<div className={itemWrap.options.class}>
										<RawHTML>{x.html}</RawHTML>
									</div>
								);
							})}

							{/* 
                    {posts.map(post => {


                      return (

                        <>
                          <BlockContextProvider
                            key={post.ID}
                            value={post}
                          >
                            {post.ID ===
                              (activeBlockContextId ||
                                posts[0]?.ID) ? (

                              <>
                                {post.ID}
                                <PostTemplateInnerBlocks attsx={TEMPLATEX} />
                              </>


                            ) : null}


                            <MemoizedPostTemplateBlockPreview
                              blocks={blocks}
                              blockContextId={post.ID}
                              setActiveBlockContextId={setActiveBlockContextId}
                              isHidden={
                                post.ID ===
                                (activeBlockContextId ||
                                  posts[0]?.ID)
                              }
                            />



                          </BlockContextProvider>
                        </>


                      )
                    })} */}
						</div>
					)}

					<div className={pagination.options.class}>
						{pagination.options.type == "normal" && (
							<>
								{paginationItems != undefined &&
									paginationItems.map((item) => {
										return (
											<RawHTML className="inline-block">
												{item.replace(
													"page-numbers",
													paginationItem.options.class
												)}
											</RawHTML>
										);
									})}
							</>
						)}

						{pagination.options.type == "ajax" && (
							<>
								{paginationItems != undefined &&
									paginationItems.map((item) => {
										return (
											<RawHTML className="inline-block">
												{item.replace(
													"page-numbers",
													paginationItem.options.class
												)}
											</RawHTML>
										);
									})}
							</>
						)}

						{pagination.options.type == "next_previous" && (
							<div className="flex justify-between">
								<div className="pagination-prev page-numbers">
									{pagination.options.prevText}
								</div>
								<div className="pagination-next page-numbers">
									{pagination.options.nextText}
								</div>
							</div>
						)}

						{pagination.options.type == "loadmore" && (
							<>
								<div className="page-numbers">
									{pagination.options.loadMoreText}
								</div>
							</>
						)}

						{pagination.options.type == "infinite" && <></>}
					</div>
				</div>
			</>
		);
	},
	save: function (_props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file

		var attributes = _props.attributes;

		return null;
	},
});
