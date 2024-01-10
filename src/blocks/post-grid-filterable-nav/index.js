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
	mediaAndText,
} from "@wordpress/icons";

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

const ALLOWED_MEDIA_TYPES = ["image"];
import metadata from "./block.json";
import PGcssClassPicker from "../../components/css-class-picker";
import customTags from "../../custom-tags";

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
					d="M61.1765 30H4.70588C3.4578 30 2.26085 30.4958 1.37832 31.3783C0.495798 32.2608 0 33.4578 0 34.7059V81.7647C0 83.0128 0.495798 84.2097 1.37832 85.0923C2.26085 85.9748 3.4578 86.4706 4.70588 86.4706H61.1765C62.4246 86.4706 63.6215 85.9748 64.504 85.0923C65.3866 84.2097 65.8824 83.0128 65.8824 81.7647V34.7059C65.8824 33.4578 65.3866 32.2608 64.504 31.3783C63.6215 30.4958 62.4246 30 61.1765 30ZM56.4706 77.0588H9.41177V39.4118H56.4706V77.0588Z"
					fill="url(#paint0_linear_68_1139)"
				/>
				<path
					d="M160 44.1177H84.7061V53.5294H160V44.1177Z"
					fill="url(#paint1_linear_68_1139)"
				/>
				<path
					d="M141.177 62.9414H84.7061V72.3532H141.177V62.9414Z"
					fill="url(#paint2_linear_68_1139)"
				/>
				<path
					d="M61.1765 104H4.70588C3.4578 104 2.26085 104.496 1.37832 105.378C0.495798 106.261 0 107.458 0 108.706V155.765C0 157.013 0.495798 158.21 1.37832 159.092C2.26085 159.975 3.4578 160.471 4.70588 160.471H61.1765C62.4246 160.471 63.6215 159.975 64.504 159.092C65.3866 158.21 65.8824 157.013 65.8824 155.765V108.706C65.8824 107.458 65.3866 106.261 64.504 105.378C63.6215 104.496 62.4246 104 61.1765 104ZM56.4706 151.059H9.41177V113.412H56.4706V151.059Z"
					fill="url(#paint3_linear_68_1139)"
				/>
				<path
					d="M160 118.118H84.7061V127.529H160V118.118Z"
					fill="url(#paint4_linear_68_1139)"
				/>
				<path
					d="M141.177 136.941H84.7061V146.353H141.177V136.941Z"
					fill="url(#paint5_linear_68_1139)"
				/>
				<path
					d="M43.9972 0H2C0.895431 0 0 0.89543 0 2V12C0 13.1046 0.895431 14 2 14H43.9972C45.1018 14 45.9972 13.1046 45.9972 12V2C45.9972 0.895431 45.1018 0 43.9972 0Z"
					fill="#C15940"
				/>
				<path
					d="M100.999 0H59.002C57.8974 0 57.002 0.89543 57.002 2V12C57.002 13.1046 57.8974 14 59.002 14H100.999C102.103 14 102.999 13.1046 102.999 12V2C102.999 0.895431 102.103 0 100.999 0Z"
					fill="#C15940"
				/>
				<path
					d="M158 0H116.003C114.899 0 114.003 0.89543 114.003 2V12C114.003 13.1046 114.899 14 116.003 14H158C159.105 14 160 13.1046 160 12V2C160 0.895431 159.105 0 158 0Z"
					fill="#C15940"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_68_1139"
						x1="0"
						y1="58.2353"
						x2="65.8824"
						y2="58.2353"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_68_1139"
						x1="84.7061"
						y1="48.8236"
						x2="160"
						y2="48.8236"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_68_1139"
						x1="84.7061"
						y1="67.6473"
						x2="141.177"
						y2="67.6473"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_68_1139"
						x1="0"
						y1="132.235"
						x2="65.8824"
						y2="132.235"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_68_1139"
						x1="84.7061"
						y1="122.824"
						x2="160"
						y2="122.824"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_68_1139"
						x1="84.7061"
						y1="141.647"
						x2="141.177"
						y2="141.647"
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

		var context = props.context;

		var setAttributes = props.setAttributes;

		// var lazyLoad = attributes.lazyLoad;
		// var container = attributes.container;

		// var itemsWrap = attributes.itemsWrap;
		// var itemWrap = attributes.itemWrap;
		// var noPostsWrap = attributes.noPostsWrap;
		// var spinnerWrap = attributes.spinnerWrap;

		var filterable = attributes.filterable;

		var activeFilter = attributes.activeFilter;
		var filterGroupWrap = attributes.filterGroupWrap;

		var filterGroup = attributes.filterGroup;

		var queryArgs = attributes.queryArgs;

		var grid = attributes.grid;
		var blockCssY = attributes.blockCssY;

		var blockId = attributes.blockId;

		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;

		var parentFilterable =
			context["post-grid/filterable"] == undefined
				? null
				: context["post-grid/filterable"];

		var parentActiveFilter =
			context["post-grid/activeFilter"] == undefined
				? null
				: context["post-grid/activeFilter"];

		var parentFilterGroupWrap =
			context["post-grid/filterGroupWrap"] == undefined
				? null
				: context["post-grid/filterGroupWrap"];

		var parentFilterGroup =
			context["post-grid/filterGroup"] == undefined
				? null
				: context["post-grid/filterGroup"];

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
			if (filterable.options.filters.length == 0) {
				setAttributes({ filterable: parentFilterable });
				setAttributes({ activeFilter: parentActiveFilter });
				setAttributes({ filterGroupWrap: parentFilterGroupWrap });
				setAttributes({ filterGroup: parentFilterGroup });
			}
		}, [parentFilterable]);

		useEffect(() => {
			setPostGridData(window.PostGridPluginData);
		}, [window.PostGridPluginData]);

		useEffect(() => {
			setClientData(myStore != null ? myStore.getclientdata() : "");
		}, [clientDataX]);

		// const ALLOWED_BLOCKS = ["post-grid/post-query"];

		// const MY_TEMPLATE = [
		// 	["post-grid/post-query", {}],
		// 	["post-grid/post-query-pagination", {}],
		// ];

		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			// allowedBlocks: ALLOWED_BLOCKS,
			// template: MY_TEMPLATE,
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
				var filterableX = attributes.filterable;
				var activeFilterX = attributes.activeFilter;
				var filterGroupWrapX = attributes.filterGroupWrap;
				var filterGroupX = attributes.filterGroup;

				var blockCssYX = attributes.blockCssY;

				var blockCssObj = {};

				if (filterableX != undefined) {
					var filterableY = { ...filterableX, options: filterable.options };
					setAttributes({ filterable: filterableY });
					blockCssObj[filterableSelector] = filterableY;
				}

				if (activeFilterX != undefined) {
					var activeFilterY = {
						...activeFilterX,
						options: activeFilter.options,
					};
					setAttributes({ activeFilter: activeFilterY });
					blockCssObj[activeFilterSelector] = activeFilterY;
				}

				if (filterGroupWrapX != undefined) {
					var filterGroupWrapY = {
						...filterGroupWrapX,
						options: filterGroupWrap.options,
					};
					setAttributes({ filterGroupWrap: filterGroupWrapY });
					blockCssObj[filterGroupWrapSelector] = filterGroupWrapY;
				}

				if (filterGroupX != undefined) {
					var filterGroupY = { ...filterGroupX, options: filterGroup.options };
					setAttributes({ filterGroup: filterGroupY });
					blockCssObj[filterGroupSelector] = filterGroupY;
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

		function onPickCssLibraryFilterable(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				filterable[sudoScource] = sudoScourceArgs;
			});

			var paginationX = Object.assign({}, filterable);
			setAttributes({ filterable: paginationX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					filterableSelector
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

		function onChangeStyleFilterable(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, filterable);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ filterable: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				filterableSelector
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

		function onRemoveStyleFilterable(sudoScource, key) {
			var object = myStore.deletePropertyDeep(filterable, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ filterable: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				filterableSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleFilterable(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, filterable);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ filterable: object });
		}

		function onPickCssLibraryActiveFilter(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				activeFilter[sudoScource] = sudoScourceArgs;
			});

			var paginationX = Object.assign({}, activeFilter);
			setAttributes({ activeFilter: paginationX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					activeFilterSelector
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

		function onChangeStyleActiveFilter(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, activeFilter);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ activeFilter: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				activeFilterSelector
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

		function onRemoveStyleActiveFilter(sudoScource, key) {
			var object = myStore.deletePropertyDeep(activeFilter, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ activeFilter: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				activeFilterSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleActiveFilter(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, activeFilter);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ activeFilter: object });
		}

		function onPickCssLibraryFilterGroup(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				filterGroup[sudoScource] = sudoScourceArgs;
			});

			var paginationX = Object.assign({}, filterGroup);
			setAttributes({ filterGroup: paginationX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					filterGroupSelector
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

		function onChangeStyleFilterGroup(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, filterGroup);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ filterGroup: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				filterGroupSelector
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

		function onRemoveStyleFilterGroup(sudoScource, key) {
			var object = myStore.deletePropertyDeep(filterGroup, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ filterGroup: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				filterGroupSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleFilterGroup(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, filterGroup);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ filterGroup: object });
		}

		function onPickCssLibraryFilterGroupWrap(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				filterGroupWrap[sudoScource] = sudoScourceArgs;
			});

			var paginationX = Object.assign({}, filterGroupWrap);
			setAttributes({ filterGroupWrap: paginationX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					filterGroupWrapSelector
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

		function onChangeStyleFilterGroupWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, filterGroupWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ filterGroupWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				filterGroupWrapSelector
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

		function onRemoveStyleFilterGroupWrap(sudoScource, key) {
			var object = myStore.deletePropertyDeep(filterGroupWrap, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ filterGroupWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				filterGroupWrapSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleFilterGroupWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, filterGroupWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ filterGroupWrap: object });
		}

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });

			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);

		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[filterGroupWrapSelector] = filterGroupWrap;
			blockCssObj[filterGroupSelector] = filterGroup;
			blockCssObj[filterableSelector] = filterable;
			blockCssObj[activeFilterSelector] = activeFilter;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		useEffect(() => {
			blockCssY.items[itemsWrapSelector] =
				blockCssY.items[itemsWrapSelector] != undefined
					? blockCssY.items[itemsWrapSelector]
					: {};

			var nthItemsResponsive = [];
			var itemX = { ...blockCssY.items };

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

		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<PanelBody
							className="font-medium text-slate-900 "
							title="Filterable"
							initialOpen={false}>
							<div>
								<Button
									variant="secondary"
									className="mb-2"
									onClick={(ev) => {
										var filters = filterable.options.filters.concat({
											groupTitle: "",
											type: "",
											logic: "",
											showPostCount: "",
											items: [],
										});

										var options = { ...filterable.options, filters: filters };
										setAttributes({
											filterable: { ...filterable, options: options },
										});
									}}>
									Add Filter Group
								</Button>

								{filterable.options.filters.map((x, i) => {
									return (
										<PanelBody
											title={x.groupTitle ? x.groupTitle : "Filter Group " + i}
											initialOpen={false}>
											<span
												onClick={(ev) => {
													filterable.options.filters.splice(i, 1);

													var options = {
														...filterable.options,
														filters: filterable.options.filters,
													};
													setAttributes({
														filterable: { ...filterable, options: options },
													});
												}}
												className="cursor-pointer px-3 py-1 inline-block text-white bg-red-600 text-sm mb-2">
												<span className="dashicon dashicons dashicons-no-alt"></span>{" "}
												Delete Group
											</span>

											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Group Title
												</label>

												<InputControl
													value={x.groupTitle}
													onChange={(newVal) => {
														filterable.options.filters[i].groupTitle = newVal;

														var options = {
															...filterable.options,
															filters: filterable.options.filters,
														};
														setAttributes({
															filterable: { ...filterable, options: options },
														});
													}}
												/>
											</PanelRow>

											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Group Type
												</label>

												<SelectControl
													value={x.type}
													options={[
														{ value: "inline", label: "Inline" },
														{ value: "dropdown", label: "Dropdown" },
														{ value: "radio", label: "Radio" },
														{ value: "checkbox", label: "Checkbox" },
													]}
													onChange={(newVal) => {
														filterable.options.filters[i].type = newVal;

														var options = {
															...filterable.options,
															filters: filterable.options.filters,
														};
														setAttributes({
															filterable: { ...filterable, options: options },
														});
													}}
												/>
											</PanelRow>

											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Data Logic
												</label>

												<SelectControl
													value={x.logic}
													options={[
														{ value: "or", label: "OR" },
														{ value: "and", label: "AND" },
													]}
													onChange={(newVal) => {
														filterable.options.filters[i].logic = newVal;

														var options = {
															...filterable.options,
															filters: filterable.options.filters,
														};
														setAttributes({
															filterable: { ...filterable, options: options },
														});
													}}
												/>
											</PanelRow>

											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Show Post Count
												</label>

												<SelectControl
													value={x.showPostCount}
													options={[
														{ value: "no", label: "No" },
														{ value: "yes", label: "Yes" },
													]}
													onChange={(newVal) => {
														filterable.options.filters[i].showPostCount =
															newVal;

														var options = {
															...filterable.options,
															filters: filterable.options.filters,
														};
														setAttributes({
															filterable: { ...filterable, options: options },
														});
													}}
												/>
											</PanelRow>

											<label
												for=""
												className="font-medium text-slate-900 my-3 font-bold">
												Search Terms
											</label>

											<p>
												To add custom filter please use following format and hit
												Enter
											</p>
											<code>Filter Name|filter-slug|15</code>
											<InputControl
												autoComplete="off"
												className="my-3"
												placeholder="Search Categories or terms"
												value=""
												onKeyPress={(ev) => {
													if (ev.key === "Enter") {
														var filterParts = ev.target.value.split("|");

														var ss = filterable.options.filters[i].items.concat(
															{
																id: 0,
																slug: filterParts[1],
																title: filterParts[0],
																count: filterParts[2],
															}
														);
														filterable.options.filters[i].items = ss;

														var options = {
															...filterable.options,
															filters: filterable.options.filters,
														};
														setAttributes({
															filterable: { ...filterable, options: options },
														});
													}
												}}
												onChange={(newVal) => {
													clearTimeout(debounce);
													debounce = setTimeout(() => {
														if (newVal.length > 0) {
															fetchPostTypeTerms(newVal);
														}
													}, 2000);
												}}
											/>

											{x.items.length == 0 && (
												<div className="my-1">No terms added.</div>
											)}

											{x.items.map((y, j) => {
												return (
													<div className="py-2 my-1 border-b border-gray-400 flex justify-between">
														<div>{y.title}</div>

														<div>
															<span
																onClick={(ev) => {
																	var options = {
																		...activeFilter.options,
																		slug:
																			activeFilter.options.slug == y.slug
																				? ""
																				: y.slug,
																	};
																	setAttributes({
																		activeFilter: {
																			...activeFilter,
																			options: options,
																		},
																	});
																}}
																className={[
																	activeFilter.options.slug == y.slug
																		? "bg-blue-600 cursor-pointer p-1   text-white  text-sm"
																		: "bg-gray-400 cursor-pointer p-1   text-white  text-sm",
																]}>
																<span className="dashicons dashicons-yes-alt"></span>
															</span>

															<span
																onClick={(ev) => {
																	filterable.options.filters[i].items.splice(
																		j,
																		1
																	);

																	var options = {
																		...filterable.options,
																		filters: filterable.options.filters,
																	};
																	setAttributes({
																		filterable: {
																			...filterable,
																			options: options,
																		},
																	});
																}}
																className="cursor-pointer p-1  text-white bg-red-600 text-sm">
																<span className="dashicon dashicons dashicons-no-alt"></span>
															</span>
														</div>
													</div>
												);
											})}

											{/* {filterableTerms.length == 0 && (
                          <div className='bg-gray-200 p-2 mt-2'>No Terms Found</div>
                        )} */}
											{isBusy && (
												<div className="border-b border-gray-400 my-2 pb-1 bg-gray-200 p-2">
													<Spinner />
												</div>
											)}
											{filterableTerms.length > 0 && (
												<div className="bg-gray-200 p-2 mt-2">
													{filterableTerms.map((x) => {
														return (
															<div
																title="Click Add terms"
																className="border-b border-gray-400 my-2 pb-1 cursor-pointer"
																onClick={(ev) => {
																	if (x.slug) {
																		var ss = filterable.options.filters[
																			i
																		].items.concat({
																			id: x.term_id,
																			slug: x.slug,
																			title: x.name,
																			count: x.count,
																		});
																		filterable.options.filters[i].items = ss;

																		var options = {
																			...filterable.options,
																			filters: filterable.options.filters,
																		};
																		setAttributes({
																			filterable: {
																				...filterable,
																				options: options,
																			},
																		});
																	}
																}}>
																{x.name} ({x.count})
															</div>
														);
													})}
												</div>
											)}
										</PanelBody>
									);
								})}
							</div>

							<PanelRow>
								<label for="" className="font-medium text-slate-900 ">
									Enable Multifilter{" "}
								</label>

								<SelectControl
									label=""
									value={filterable.options.multifilter}
									options={[
										{ label: "True", value: true },
										{ label: "False", value: false },
									]}
									onChange={(newVal) => {
										var options = {
											...filterable.options,
											multifilter: newVal,
										};
										setAttributes({
											filterable: { ...filterable, options: options },
										});
									}}
								/>
							</PanelRow>

							<PanelRow>
								<label for="" className="font-medium text-slate-900 ">
									Enable Filter Toggle{" "}
								</label>

								<SelectControl
									label=""
									value={filterable.options.filterToggle}
									options={[
										{ label: "Yes", value: "yes" },
										{ label: "no", value: "no" },
									]}
									onChange={(newVal) => {
										var options = {
											...filterable.options,
											filterToggle: newVal,
										};
										setAttributes({
											filterable: { ...filterable, options: options },
										});
									}}
								/>
							</PanelRow>

							{filterable.options.multifilter && (
								<>
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Logic Within Group{" "}
										</label>

										<SelectControl
											label=""
											value={filterable.options.logicWithinGroup}
											options={[
												{ label: "OR", value: "or" },
												{ label: "AND", value: "and" },
											]}
											onChange={(newVal) => {
												var options = {
													...filterable.options,
													logicWithinGroup: newVal,
												};
												setAttributes({
													filterable: { ...filterable, options: options },
												});
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Logic Between Groups{" "}
										</label>

										<SelectControl
											label=""
											value={filterable.options.logicBetweenGroups}
											options={[
												{ label: "OR", value: "or" },
												{ label: "AND", value: "and" },
											]}
											onChange={(newVal) => {
												var options = {
													...filterable.options,
													logicBetweenGroups: newVal,
												};
												setAttributes({
													filterable: { ...filterable, options: options },
												});
											}}
										/>
									</PanelRow>
								</>
							)}

							<PanelRow>
								<label for="" className="font-medium text-slate-900 ">
									Show Sort Filter{" "}
								</label>

								<SelectControl
									label=""
									value={filterable.options.showSort}
									options={[
										{ label: "No", value: "no" },
										{ label: "Yes", value: "yes" },
									]}
									onChange={(newVal) => {
										var options = { ...filterable.options, showSort: newVal };
										setAttributes({
											filterable: { ...filterable, options: options },
										});
									}}
								/>
							</PanelRow>

							<PanelRow>
								<label for="" className="font-medium text-slate-900 ">
									Show Random Filter{" "}
								</label>

								<SelectControl
									label=""
									value={filterable.options.showRandom}
									options={[
										{ label: "No", value: "no" },
										{ label: "Yes", value: "yes" },
									]}
									onChange={(newVal) => {
										var options = { ...filterable.options, showRandom: newVal };
										setAttributes({
											filterable: { ...filterable, options: options },
										});
									}}
								/>
							</PanelRow>

							<PanelRow>
								<label for="" className="font-medium text-slate-900 ">
									Show Clear Filter{" "}
								</label>

								<SelectControl
									label=""
									value={filterable.options.showClear}
									options={[
										{ label: "No", value: "no" },
										{ label: "Yes", value: "yes" },
									]}
									onChange={(newVal) => {
										var options = { ...filterable.options, showClear: newVal };
										setAttributes({
											filterable: { ...filterable, options: options },
										});
									}}
								/>
							</PanelRow>

							<PanelRow>
								<label for="" className="font-medium text-slate-900 ">
									Show All Filter{" "}
								</label>

								<SelectControl
									label=""
									value={filterable.options.showAll}
									options={[
										{ label: "No", value: "no" },
										{ label: "Yes", value: "yes" },
									]}
									onChange={(newVal) => {
										var options = { ...filterable.options, showAll: newVal };
										setAttributes({
											filterable: { ...filterable, options: options },
										});
									}}
								/>
							</PanelRow>

							<PanelRow>
								<label>Items Per Page</label>
								<InputControl
									type="number"
									value={
										filterable.options.perPage != undefined
											? filterable.options.perPage
											: 6
									}
									onChange={(newVal) => {
										var options = { ...filterable.options, perPage: newVal };
										setAttributes({
											filterable: { ...filterable, options: options },
										});
									}}
								/>
							</PanelRow>
						</PanelBody>
						<PanelBody
							className="font-medium text-slate-900 "
							title="Filter"
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
										obj={filterable}
										onChange={onChangeStyleFilterable}
										onAdd={onAddStyleFilterable}
										onRemove={onRemoveStyleFilterable}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={filterable}
										onChange={onPickCssLibraryFilterable}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Active Filter"
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
										obj={activeFilter}
										onChange={onChangeStyleActiveFilter}
										onAdd={onAddStyleActiveFilter}
										onRemove={onRemoveStyleActiveFilter}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={activeFilter}
										onChange={onPickCssLibraryActiveFilter}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Filter Group"
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
										obj={filterGroup}
										onChange={onChangeStyleFilterGroup}
										onAdd={onAddStyleFilterGroup}
										onRemove={onRemoveStyleFilterGroup}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={filterGroup}
										onChange={onPickCssLibraryFilterGroup}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Filter Group Wrap"
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
										obj={filterGroupWrap}
										onChange={onChangeStyleFilterGroupWrap}
										onAdd={onAddStyleFilterGroupWrap}
										onRemove={onRemoveStyleFilterGroupWrap}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={filterGroup}
										onChange={onPickCssLibraryFilterGroupWrap}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody title="Block Variations" initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={"post-grid-filterable-nav"}
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
							{/* <PGTutorials links={tutorialsLinks} /> */}
						</PanelBody>
						<div className="px-3">
							<PGTutorials slug="post-grid-filterable-nav" />
						</div>
					</div>
				</InspectorControls>
				{/* <span>
					{"atts: { " +
						"filterable: " +
						JSON.stringify(filterable) +
						",activeFilter: " +
						JSON.stringify(activeFilter) +
						",filterGroupWrap: " +
						JSON.stringify(filterGroupWrap) +
						",filterGroup: " +
						JSON.stringify(filterGroup) +
						// ",previous: " +
						// JSON.stringify(previous) +
						// ",start: " +
						// JSON.stringify(start) +
						// ",end: " +
						// JSON.stringify(end) +
						"},"}
				</span> */}
				<div {...blockProps}>
					{/* <div {...innerBlocksProps}> */}
					<div className="filterable-group-wrap">
						<div className="filterable-group">
							{filterable.options.showAll == "yes" && (
								<>
									<div
										className="pg-filter mixitup-control-active cusror-pointer   filter-34534"
										data-filter="all">
										All
									</div>
								</>
							)}
						</div>

						{filterable.options.filters.length > 0 &&
							filterable.options.filters.map((x) => {
								return (
									<div className="filterable-group " data-logic={x.logic}>
										{x.groupTitle && (
											<div className="filterable-group-title ">
												{x.groupTitle}
											</div>
										)}

										{x.items.map((y) => {
											return (
												<div
													className={[
														activeFilter.options.slug == y.slug
															? "mixitup-control-active pg-filter cursor-pointer"
															: "pg-filter cursor-pointer",
													]}
													terms-id={y.id}
													data-filter={"." + y.slug}>
													{y.title}{" "}
													{x.showPostCount == "yes" ? "(" + y.count + ")" : ""}
												</div>
											);
										})}
									</div>
								);
							})}

						<div className="filterable-group">
							{filterable.options.showSort == "yes" && (
								<>
									<div
										className="pg-filter mixitup-control-active cusror-pointer  filter-34534"
										data-filter="">
										ASC
									</div>
									<div
										className="pg-filter  cusror-pointer  filter-34534"
										data-filter="">
										DESC
									</div>
								</>
							)}

							{filterable.options.showRandom == "yes" && (
								<>
									<div
										className="pg-filter  cusror-pointer filter-34534"
										data-filter="">
										Random
									</div>
								</>
							)}

							{filterable.options.showClear == "yes" && (
								<>
									<div
										className="pg-filter cusror-pointer filter-34534"
										data-filter="">
										Clear
									</div>{" "}
								</>
							)}
						</div>
					</div>
					{/* {innerBlocksProps.children} */}
				</div>
				{/* <div {...blockProps}>
					{lazyLoad.options.enable == "yes" && isBusy && (
						<div className={lazyLoad.options.class}></div>
					)}

					{isBusy && (
						<div className="text-center">
							<Spinner />
						</div>
					)}
				</div> */}
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
