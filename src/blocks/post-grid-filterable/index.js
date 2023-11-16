import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import { applyFilters } from "@wordpress/hooks";

import apiFetch from "@wordpress/api-fetch";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import {
	BlockContextProvider,
	__experimentalUseBlockPreview as useBlockPreview,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
const { parse } = wp.blockSerializationDefaultParser;
const { RawHTML } = wp.element;
var select = wp.data.select("core/block-editor");

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

import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";

import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import {
	Icon,
	close,
	pencil,
	cloud,
	brush,
	mediaAndText,
} from "@wordpress/icons";

import IconToggle from "../../components/icon-toggle";
import PGDropdown from "../../components/dropdown";
import PGIconPicker from "../../components/icon-picker";

import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";
import PGStyles from "../../components/styles";
import PGcssTextAlign from "../../components/css-text-align";
import PGcssDisplay from "../../components/css-display";
import PGcssCursor from "../../components/css-cursor";
import PGinputSelect from "../../components/input-select";

import PGTutorials from "../../components/tutorials";

import breakPoints from "../../breakpoints";
import queryPresets from "./query-presets";
import gridLayouts from "./grid-layouts";
import queryPrams from "./queryprams";
import tutorialsLinks from "./tutorials-links";
import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGCssLibrary from "../../components/css-library";

import colorsPresets from "../../colors-presets";
import metadata from "./block.json";

const ALLOWED_MEDIA_TYPES = ["image"];

// var queryPramsX = queryPrams.map((x, i) => {

//   return { value: i, label: x.label, description: x.description, isPro: x.isPro, }
// })

var myStore = wp.data.select("postgrid-shop");

registerBlockType(metadata, {
	icon: {
		background: "#fff",
		foreground: "#fff",
		src: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
				<rect fill="#1d4ed8" x="3.5" width="8.34" height="2.35" />
				<rect fill="#1d4ed8" x="13.83" width="8.34" height="2.35" />
				<rect fill="#1d4ed8" x="24.16" width="8.34" height="2.35" />
				<path
					fill="#1d4ed8"
					d="M3.5,20.82H15.66V8.65H3.5ZM13.31,11v7.46H5.85V11Z"
				/>
				<path
					fill="#1d4ed8"
					d="M3.5,36H15.66V23.84H3.5Zm9.81-9.81v7.46H5.85V26.19Z"
				/>
				<path
					fill="#1d4ed8"
					d="M18.68,36H30.85V23.84H18.68Zm9.82-9.81v7.46H21V26.19Z"
				/>
				<rect fill="#1d4ed8" x="19.21" y="10.83" width="11.12" height="2.35" />
				<rect fill="#1d4ed8" x="19.21" y="16.29" width="11.12" height="2.35" />
			</svg>
		),
	},

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
		var filterable = attributes.filterable;
		var activeFilter = attributes.activeFilter;
		var filterGroupWrap = attributes.filterGroupWrap;

		var filterGroup = attributes.filterGroup;

		var grid = attributes.grid;
		var layout = attributes.layout;
		var queryArgs = attributes.queryArgs;
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

		let isProFeature = applyFilters("isProFeature", true);
		const [postGridData, setPostGridData] = useState(window.PostGridPluginData);

		var containerSelector = blockClass;
		const itemsWrapSelector = blockClass + " .items-loop";
		const itemWrapSelector = blockClass + " .item";

		const filterGroupWrapSelector = blockClass + " .filterable-group-wrap";

		const filterGroupSelector = blockClass + " .filterable-group";
		const filterGroupTitleSelector = blockClass + " .filterable-group-title";

		const filterableSelector = blockClass + " .pg-filter";
		const activeFilterSelector =
			blockClass + " .pg-filter.mixitup-control-active";

		const noPostsSelector = blockClass + " .no-posts";
		const searchWrapSelector = blockClass + " .search";
		const lazyloadWrapSelector = blockClass + " .lazyLoad";
		const spinnerSelector = blockClass + " .spinner";
		const paginationWrapSelector = blockClass + " .pagination";
		const paginationItemSelector = blockClass + " .pagination .page-numbers";
		const paginationItemActiveSelector =
			blockClass + " .pagination .page-numbers.mixitup-control-active";

		const BLOCKS_TEMPLATE = [
			["post-grid/post-title", {}],
			["post-grid/read-more", {}],
		];

		useEffect(() => {
			setPostGridData(window.PostGridPluginData);
		}, [window.PostGridPluginData]);

		const columnPresets = [
			{
				label: "1 Column",
				args: [{ val: 1, unit: "fr" }],
				icon: (
					<svg
						width="23"
						height="17"
						viewBox="0 0 23 17"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0 1.36364C0 0.61052 0.610521 0 1.36364 0H21.6364C22.3895 0 23 0.61052 23 1.36364V1.36364C23 2.11675 22.3895 2.72727 21.6364 2.72727H1.36364C0.61052 2.72727 0 2.11675 0 1.36364V1.36364Z"
							fill="#fff"
						/>
						<path
							d="M0 15.6364C0 14.8833 0.610521 14.2727 1.36364 14.2727H21.6364C22.3895 14.2727 23 14.8833 23 15.6364V15.6364C23 16.3895 22.3895 17 21.6364 17H1.36364C0.61052 17 0 16.3895 0 15.6364V15.6364Z"
							fill="#fff"
						/>
						<path
							d="M1.36363 -5.96064e-08C2.11674 -2.66867e-08 2.72726 0.610521 2.72726 1.36364L2.72726 15.6364C2.72726 16.3895 2.11674 17 1.36363 17C0.610513 17 -7.63055e-06 16.3895 -7.59763e-06 15.6364L-6.97375e-06 1.36364C-6.94083e-06 0.610521 0.610513 -9.25261e-08 1.36363 -5.96064e-08Z"
							fill="#fff"
						/>
						<path
							d="M21.6364 -5.96064e-08C22.3895 -2.66867e-08 23 0.610521 23 1.36364L23 15.6364C23 16.3895 22.3895 17 21.6364 17V17C20.8832 17 20.2727 16.3895 20.2727 15.6364L20.2727 1.36364C20.2727 0.610521 20.8832 -9.25261e-08 21.6364 -5.96064e-08V-5.96064e-08Z"
							fill="#fff"
						/>
					</svg>
				),
			},
			{
				label: "2 Columns",
				args: [
					{ val: 1, unit: "fr" },
					{ val: 1, unit: "fr" },
				],
				icon: (
					<svg
						width="43"
						height="17"
						viewBox="0 0 43 17"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0 1.36364C0 0.61052 0.610521 0 1.36364 0H41.2727C42.0258 0 42.6363 0.61052 42.6363 1.36364C42.6363 2.11675 42.0258 2.72727 41.2727 2.72727H1.36364C0.610521 2.72727 0 2.11675 0 1.36364Z"
							fill="#fff"
						/>
						<path
							d="M0 15.6364C0 14.8833 0.610521 14.2727 1.36364 14.2727H41.2727C42.0258 14.2727 42.6363 14.8833 42.6363 15.6364C42.6363 16.3895 42.0258 17 41.2727 17H1.36364C0.610521 17 0 16.3895 0 15.6364Z"
							fill="#fff"
						/>
						<path
							d="M1.36363 -5.96064e-08C2.11674 -2.66867e-08 2.72726 0.610521 2.72726 1.36364L2.72726 15.6364C2.72726 16.3895 2.11674 17 1.36363 17C0.610513 17 -7.63055e-06 16.3895 -7.59763e-06 15.6364L-6.97375e-06 1.36364C-6.94083e-06 0.610521 0.610513 -9.25261e-08 1.36363 -5.96064e-08Z"
							fill="#fff"
						/>
						<path
							d="M21.6364 -5.96064e-08C22.3895 -2.66867e-08 23 0.610521 23 1.36364L23 15.6364C23 16.3895 22.3895 17 21.6364 17C20.8832 17 20.2727 16.3895 20.2727 15.6364L20.2727 1.36364C20.2727 0.610521 20.8832 -9.25261e-08 21.6364 -5.96064e-08Z"
							fill="#fff"
						/>
						<path
							d="M41.6364 -5.96064e-08C42.3895 -2.66867e-08 43 0.610521 43 1.36364L43 15.6364C43 16.3895 42.3895 17 41.6364 17C40.8832 17 40.2727 16.3895 40.2727 15.6364L40.2727 1.36364C40.2727 0.610521 40.8832 -9.25261e-08 41.6364 -5.96064e-08Z"
							fill="#fff"
						/>
					</svg>
				),
			},
			{
				label: "3 Columns",
				args: [
					{ val: 1, unit: "fr" },
					{ val: 1, unit: "fr" },
					{ val: 1, unit: "fr" },
				],
				icon: (
					<svg
						width="43"
						height="17"
						viewBox="0 0 43 17"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0 1.36364C0 0.61052 0.610521 0 1.36364 0H41.2727C42.0258 0 42.6363 0.61052 42.6363 1.36364C42.6363 2.11675 42.0258 2.72727 41.2727 2.72727H1.36364C0.610521 2.72727 0 2.11675 0 1.36364Z"
							fill="#fff"
						/>
						<path
							d="M0 15.6364C0 14.8833 0.610521 14.2727 1.36364 14.2727H41.2727C42.0258 14.2727 42.6363 14.8833 42.6363 15.6364C42.6363 16.3895 42.0258 17 41.2727 17H1.36364C0.610521 17 0 16.3895 0 15.6364Z"
							fill="#fff"
						/>
						<path
							d="M1.36363 -5.96064e-08C2.11674 -2.66867e-08 2.72726 0.610521 2.72726 1.36364L2.72726 15.6364C2.72726 16.3895 2.11674 17 1.36363 17C0.610513 17 -7.63055e-06 16.3895 -7.59763e-06 15.6364L-6.97375e-06 1.36364C-6.94083e-06 0.610521 0.610513 -9.25261e-08 1.36363 -5.96064e-08Z"
							fill="#fff"
						/>
						<path
							d="M14.6364 -5.96064e-08C15.3895 -2.66867e-08 16 0.610521 16 1.36364L16 15.6364C16 16.3895 15.3895 17 14.6364 17C13.8832 17 13.2727 16.3895 13.2727 15.6364L13.2727 1.36364C13.2727 0.610521 13.8832 -9.25261e-08 14.6364 -5.96064e-08Z"
							fill="#fff"
						/>
						<path
							d="M28.6364 -5.96064e-08C29.3895 -2.66867e-08 30 0.610521 30 1.36364L30 15.6364C30 16.3895 29.3895 17 28.6364 17C27.8832 17 27.2727 16.3895 27.2727 15.6364L27.2727 1.36364C27.2727 0.61052 27.8832 -9.25261e-08 28.6364 -5.96064e-08Z"
							fill="#fff"
						/>
						<path
							d="M41.6364 -5.96064e-08C42.3895 -2.66867e-08 43 0.610521 43 1.36364L43 15.6364C43 16.3895 42.3895 17 41.6364 17C40.8832 17 40.2727 16.3895 40.2727 15.6364L40.2727 1.36364C40.2727 0.610521 40.8832 -9.25261e-08 41.6364 -5.96064e-08Z"
							fill="#fff"
						/>
					</svg>
				),
			},
			{
				label: "4 Columns",
				args: [
					{ val: 1, unit: "fr" },
					{ val: 1, unit: "fr" },
					{ val: 1, unit: "fr" },
					{ val: 1, unit: "fr" },
				],
				icon: (
					<svg
						width="43"
						height="17"
						viewBox="0 0 43 17"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0 1.36364C0 0.61052 0.610521 0 1.36364 0H41.2727C42.0258 0 42.6363 0.61052 42.6363 1.36364V1.36364C42.6363 2.11675 42.0258 2.72727 41.2727 2.72727H1.36364C0.610521 2.72727 0 2.11675 0 1.36364V1.36364Z"
							fill="#fff"
						/>
						<path
							d="M0 15.6364C0 14.8833 0.610521 14.2727 1.36364 14.2727H41.2727C42.0258 14.2727 42.6363 14.8833 42.6363 15.6364V15.6364C42.6363 16.3895 42.0258 17 41.2727 17H1.36364C0.610521 17 0 16.3895 0 15.6364V15.6364Z"
							fill="#fff"
						/>
						<path
							d="M1.36366 -5.96064e-08C2.11677 -2.66867e-08 2.72729 0.610521 2.72729 1.36364L2.72729 15.6364C2.72729 16.3895 2.11677 17 1.36366 17V17C0.610543 17 2.2887e-05 16.3895 2.292e-05 15.6364L2.35438e-05 1.36364C2.35768e-05 0.610521 0.610544 -9.25261e-08 1.36366 -5.96064e-08V-5.96064e-08Z"
							fill="#fff"
						/>
						<path
							d="M11.3636 -5.96064e-08C12.1167 -2.66867e-08 12.7273 0.610521 12.7273 1.36364L12.7273 15.6364C12.7273 16.3895 12.1167 17 11.3636 17V17C10.6105 17 9.99999 16.3895 9.99999 15.6364L9.99999 1.36364C9.99999 0.610521 10.6105 -9.25261e-08 11.3636 -5.96064e-08V-5.96064e-08Z"
							fill="#fff"
						/>
						<path
							d="M21.3636 -5.96064e-08C22.1167 -2.66867e-08 22.7273 0.610521 22.7273 1.36364L22.7273 15.6364C22.7273 16.3895 22.1167 17 21.3636 17V17C20.6105 17 20 16.3895 20 15.6364L20 1.36364C20 0.61052 20.6105 -9.25261e-08 21.3636 -5.96064e-08V-5.96064e-08Z"
							fill="#fff"
						/>
						<path
							d="M31.3636 -5.96064e-08C32.1167 -2.66867e-08 32.7273 0.610521 32.7273 1.36364L32.7273 15.6364C32.7273 16.3895 32.1167 17 31.3636 17V17C30.6105 17 30 16.3895 30 15.6364L30 1.36364C30 0.610521 30.6105 -9.25261e-08 31.3636 -5.96064e-08V-5.96064e-08Z"
							fill="#fff"
						/>
						<path
							d="M41.3636 -5.96064e-08C42.1167 -2.66867e-08 42.7273 0.610521 42.7273 1.36364L42.7273 15.6364C42.7273 16.3895 42.1167 17 41.3636 17V17C40.6105 17 40 16.3895 40 15.6364L40 1.36364C40 0.610521 40.6105 -9.25261e-08 41.3636 -5.96064e-08V-5.96064e-08Z"
							fill="#fff"
						/>
					</svg>
				),
			},
		];

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });

			myStore.generateBlockCss(blockCssY.items, blockId);

			blockCssY.items[itemWrapSelector] =
				blockCssY.items[itemWrapSelector] != undefined
					? blockCssY.items[itemWrapSelector]
					: {};
			blockCssY.items[paginationWrapSelector] =
				blockCssY.items[paginationWrapSelector] != undefined
					? blockCssY.items[paginationWrapSelector]
					: {};

			var wordBreak =
				blockCssY.items[itemWrapSelector]["word-break"] != undefined
					? blockCssY.items[itemWrapSelector]["word-break"]
					: {};
			wordBreak[breakPointX] = "break-word";

			blockCssY.items[itemWrapSelector] = {
				...blockCssY.items[itemWrapSelector],
				"word-break": wordBreak,
			};

			blockCssY.items[paginationWrapSelector] = {
				...blockCssY.items[paginationWrapSelector],
				"text-align": { Desktop: "center" },
			};

			blockCssY.items[paginationItemSelector] = {
				...blockCssY.items[paginationItemSelector],
				display: { Desktop: "inline-block" },
			};
			blockCssY.items[paginationItemSelector] = {
				...blockCssY.items[paginationItemSelector],
				cursor: { Desktop: "pointer" },
			};

			blockCssY.items[paginationItemSelector] = {
				...blockCssY.items[paginationItemSelector],
				color: { Desktop: "#18978F" },
			};
			blockCssY.items[paginationItemSelector] = {
				...blockCssY.items[paginationItemSelector],
				"background-color": { Desktop: "#9DD6DF" },
			};

			blockCssY.items[paginationItemSelector] = {
				...blockCssY.items[paginationItemSelector],
				"margin-left": { Desktop: "5px" },
			};
			blockCssY.items[paginationItemSelector] = {
				...blockCssY.items[paginationItemSelector],
				"margin-right": { Desktop: "5px" },
			};

			blockCssY.items[paginationItemSelector] = {
				...blockCssY.items[paginationItemSelector],
				"padding-top": { Desktop: "10px" },
			};
			blockCssY.items[paginationItemSelector] = {
				...blockCssY.items[paginationItemSelector],
				"padding-right": { Desktop: "10px" },
			};
			blockCssY.items[paginationItemSelector] = {
				...blockCssY.items[paginationItemSelector],
				"padding-bottom": { Desktop: "10px" },
			};
			blockCssY.items[paginationItemSelector] = {
				...blockCssY.items[paginationItemSelector],
				"padding-left": { Desktop: "10px" },
			};
			blockCssY.items[itemsWrapSelector] = {
				...blockCssY.items[itemsWrapSelector],
				"grid-template-columns": {
					Desktop: "1fr 1fr 1fr",
					Tablet: "1fr 1fr",
					Mobile: "1fr",
				},
			};

			setAttributes({ blockCssY: { items: blockCssY.items } });

			var paginationOptons = { ...pagination.options, type: "filterable" };
			setAttributes({
				pagination: { ...pagination, options: paginationOptons },
			});
		}, [clientId]);

		useEffect(() => {
			blockCssY.items[itemsWrapSelector] =
				blockCssY.items[itemsWrapSelector] != undefined
					? blockCssY.items[itemsWrapSelector]
					: {};

			var display =
				blockCssY.items[itemsWrapSelector]["display"] != undefined
					? blockCssY.items[itemsWrapSelector]["display"]
					: {};
			display[breakPointX] = "grid";

			blockCssY.items[itemsWrapSelector] = {
				...blockCssY.items[itemsWrapSelector],
				display: display,
			};

			if (grid.styles.gridTemplateColumns[breakPointX] != undefined) {
				var gridTemplateColumns =
					blockCssY.items[itemsWrapSelector]["grid-template-columns"] !=
					undefined
						? blockCssY.items[itemsWrapSelector]["grid-template-columns"]
						: {};
				gridTemplateColumns[breakPointX] = grid.styles.gridTemplateColumns[
					breakPointX
				]
					.map((item) => {
						return item.val + item.unit + " ";
					})
					.join(" ");

				blockCssY.items[itemsWrapSelector] = {
					...blockCssY.items[itemsWrapSelector],
					"grid-template-columns": gridTemplateColumns,
				};
			}

			if (grid.styles.gridTemplateRows[breakPointX] != undefined) {
				var gridTemplateRows =
					blockCssY.items[itemsWrapSelector]["grid-template-rows"] != undefined
						? blockCssY.items[itemsWrapSelector]["grid-template-rows"]
						: {};
				gridTemplateRows[breakPointX] = grid.styles.gridTemplateRows[
					breakPointX
				]
					.map((item) => {
						return item.val + item.unit + " ";
					})
					.join(" ");

				blockCssY.items[itemsWrapSelector] = {
					...blockCssY.items[itemsWrapSelector],
					"grid-template-rows": gridTemplateRows,
				};
			}

			if (grid.styles.colGap[breakPointX] != undefined) {
				var colGap =
					blockCssY.items[itemsWrapSelector]["column-gap"] != undefined
						? blockCssY.items[itemsWrapSelector]["column-gap"]
						: {};
				colGap[breakPointX] =
					grid.styles.colGap[breakPointX].val +
					grid.styles.colGap[breakPointX].unit;

				blockCssY.items[itemsWrapSelector] = {
					...blockCssY.items[itemsWrapSelector],
					"column-gap": colGap,
				};
			}

			if (grid.styles.rowGap[breakPointX] != undefined) {
				var rowGap =
					blockCssY.items[itemsWrapSelector]["row-gap"] != undefined
						? blockCssY.items[itemsWrapSelector]["row-gap"]
						: {};
				rowGap[breakPointX] =
					grid.styles.rowGap[breakPointX].val +
					grid.styles.rowGap[breakPointX].unit;

				blockCssY.items[itemsWrapSelector] = {
					...blockCssY.items[itemsWrapSelector],
					"row-gap": rowGap,
				};
			}

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
		const [filterablTerms, setFilterablTerms] = useState([]); // Using the hook.

		function fetchPostTypeTerms(keyword) {
			var postTypes = [];
			var terms = [];

			setFilterablTerms([]);

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

							setFilterablTerms(terms);
						});
					});

				//return result;
			});
		}

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

		var [debounce, setDebounce] = useState(null); // Using the hook.
		const [breakPointX, setBreakPointX] = useState(
			myStore != null ? myStore.getBreakPoint() : "Desktop"
		);

		const [clientData, setClientData] = useState({});
		const paginationTypes = {
			none: { label: "None", value: "none", isPro: false },
			filterable: { label: "Filterable", value: "filterable" },
		};

		// [
		//       { label: 'None', value: 'none', isPro: false },
		//       { label: 'Normal Pagination', value: 'normal', isPro: false },
		//       { label: 'Ajax Pagination', value: 'ajax', isPro: true },
		//       { label: 'Next-Previous', value: 'next_previous', isPro: true },
		//       { label: 'Load More', value: 'loadmore', isPro: true },
		//       { label: 'Infinite Load', value: 'infinite', isPro: true },
		//     ]

		var clientDataX = myStore != null ? myStore.getclientdata() : "";

		useEffect(() => {
			setClientData(myStore != null ? myStore.getclientdata() : "");
		}, [clientDataX]);

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
			queryArgs.items = option.value.items;
			setAttributes({ queryArgs: { items: queryArgs.items } });
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

		var blocks = select.getBlocks(clientId);

		var defaultBloicks = [];

		var [blocksX, setBlocksX] = useState(blocks); // Using the hook.
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

		function PostLoopItem() {
			return <div> </div>;
		}

		function generateDateQueryArgs(_args) {}

		function onChangeBreakPoint(x, _index) {
			var asdsdsd = wp.data.dispatch("postgrid-shop").setBreakPoint(x.value);

			asdsdsd.then((res) => {
				setBreakPointX(res.breakpoint);
				myStore.generateBlockCss(blockCssY.items, blockId);
			});
		}

		function onPickCssLibraryContainer(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				container[sudoScource] = sudoScourceArgs;
			});

			var containerX = Object.assign({}, container);
			setAttributes({ container: containerX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					containerSelector
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
					paginationWrapSelector
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
				paginationWrapSelector
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
				paginationWrapSelector
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

		function onPickCssLibraryPaginationItemActive(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				paginationItemActive[sudoScource] = sudoScourceArgs;
			});

			var paginationX = Object.assign({}, paginationItemActive);
			setAttributes({ paginationItemActive: paginationX });

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
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		function generateBlockCssY() {
			var reponsiveCssGroups = {};
			var reponsiveCss = "";

			for (var selector in blockCssY.items) {
				var attrs = blockCssY.items[selector];

				for (var attr in attrs) {
					var breakpoints = attrs[attr];

					for (var device in breakpoints) {
						var attrValue = breakpoints[device];

						if (reponsiveCssGroups[device] == undefined) {
							reponsiveCssGroups[device] = [];
						}

						if (reponsiveCssGroups[device][selector] == undefined) {
							reponsiveCssGroups[device][selector] = [];
						}

						reponsiveCssGroups[device][selector].push({
							attr: attr,
							val: attrValue,
						});
					}
				}
			}

			if (reponsiveCssGroups["Mobile"] != undefined) {
				reponsiveCss +=
					"@media only screen and (min-width: 0px) and (max-width: 360px){";

				for (var selector in reponsiveCssGroups["Mobile"]) {
					var attrs = reponsiveCssGroups["Mobile"][selector];

					reponsiveCss += selector + "{";
					for (var index in attrs) {
						var attr = attrs[index];
						var attrName = attr.attr;
						var attrValue = attr.val;
						reponsiveCss += attrName + ":" + attrValue + ";";
					}
					reponsiveCss += "}";
				}
				reponsiveCss += "}";
			}

			if (reponsiveCssGroups["Tablet"] != undefined) {
				reponsiveCss +=
					"@media only screen and (min-width: 361px) and (max-width: 780px){";

				for (var selector in reponsiveCssGroups["Tablet"]) {
					var attrs = reponsiveCssGroups["Tablet"][selector];

					reponsiveCss += selector + "{";
					for (var index in attrs) {
						var attr = attrs[index];
						var attrName = attr.attr;
						var attrValue = attr.val;
						reponsiveCss += attrName + ":" + attrValue + ";";
					}
					reponsiveCss += "}";
				}

				reponsiveCss += "}";
			}

			if (reponsiveCssGroups["Desktop"] != undefined) {
				reponsiveCss += "@media only screen and (min-width: 781px){";

				for (var selector in reponsiveCssGroups["Desktop"]) {
					var attrs = reponsiveCssGroups["Desktop"][selector];

					reponsiveCss += selector + "{";
					for (var index in attrs) {
						var attr = attrs[index];
						var attrName = attr.attr;
						var attrValue = attr.val;
						reponsiveCss += attrName + ":" + attrValue + ";";
					}
					reponsiveCss += "}";
				}
				reponsiveCss += "}";
			}

			var iframe = document.querySelectorAll('[name="editor-canvas"]')[0];

			if (iframe) {
				setTimeout(() => {
					var iframeDocument = iframe.contentDocument;
					var body = iframeDocument.body;
					var divWrap = iframeDocument.getElementById("css-block-" + blockId);

					if (divWrap != undefined) {
						iframeDocument.getElementById("css-block-" + blockId).outerHTML =
							"";
					}

					var divWrap = '<div id="css-block-' + blockId + '"></div>';
					body.insertAdjacentHTML("beforeend", divWrap);

					var csswrappg = iframeDocument.getElementById("css-block-" + blockId);
					var str = "<style>" + reponsiveCss + "</style>";

					csswrappg.insertAdjacentHTML("beforeend", str);
				}, 200);
			} else {
				var wpfooter = document.getElementById("wpfooter");
				var divWrap = document.getElementById("css-block-" + blockId);

				if (divWrap != undefined) {
					document.getElementById("css-block-" + blockId).outerHTML = "";
				}

				var divWrap = '<div id="css-block-' + blockId + '"></div>';
				wpfooter.insertAdjacentHTML("beforeend", divWrap);

				var csswrappg = document.getElementById("css-block-" + blockId);
				var str = "<style>" + reponsiveCss + "</style>";
				csswrappg.insertAdjacentHTML("beforeend", "");

				setTimeout(() => {
					csswrappg.insertAdjacentHTML("beforeend", str);
				}, 100);
			}
		}

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

				blocks.map((block, i) => {
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

					blocks.map((block, i) => {
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

		function generateQueryFieldAuthorIn(_xx) {
			var xxts = [12, 24, 32];

			var xxt = [1, 2, 3].concat(xxts);

			return xxt.map((x) => {
				return <div>{x}</div>;
			});
		}

		function updateQueryPram(newVal, index) {
			var itemData = queryArgs.items[index];

			itemData.val = newVal;
			queryArgs.items[index] = itemData;
			setAttributes({ queryArgs: { items: queryArgs.items } });

			fetchPosts();

			// if (itemData.id == 's' || itemData.id == 'order'  ) {
			//     itemData.val = newVal;
			//     queryArgs.items[index] = itemData;
			//     setAttributes({ queryArgs: { items: queryArgs.items } });

			// }

			// if (itemData.id == 'postType' || itemData.id == 'orderby' || itemData.id == 'postStatus') {
			//     itemData.val = newVal;
			//     queryArgs.items[index] = itemData;
			//     setAttributes({ queryArgs: { items: queryArgs.items } });

			// }

			//queryArgs.items.splice(i, 1);
		}

		function generateQueryArgOptions(item, index) {
			return (
				<div className=" ">
					<PanelBody
						title={<RemoveQueryPram title={item.label} index={index} />}
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
											var itemData = queryArgs.items[index];
											var xx = itemData.val.concat({
												fields: [{ key: "", value: "", type: "", compare: "" }],
												relation: "OR",
											});
											queryArgs.items[index].val = xx;
											setAttributes({ queryArgs: { items: queryArgs.items } });
										}}>
										Add
									</div>
									{item.val.map((x, j) => {
										return (
											<div>
												<PanelBody
													className="font-medium text-slate-900 "
													title="Meta Field"
													initialOpen={false}>
													<div
														className="cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-red-600 text-sm"
														onClick={(_ev) => {
															var itemData = queryArgs.items[index];
															var xx = itemData.val.splice(j, 1);
															queryArgs.items[index].val = itemData.val;
															setAttributes({
																queryArgs: { items: queryArgs.items },
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
																var itemData = queryArgs.items[index];

																//itemData.val.relation = newVal;
																itemData.val[j].relation = newVal;

																//var term = itemData.val[j].fields[k]
																//term.taxonomy = newVal;

																queryArgs.items[index].val = itemData.val;
																setAttributes({
																	queryArgs: { items: queryArgs.items },
																});
															}}
														/>
													</PanelRow>
													{x.fields.map((y, k) => {
														return (
															<div className="border-b border-solid border-gray-300 py-3">
																<InputControl
																	label="Custom field key"
																	value={y.key}
																	placeholder="meta_key"
																	onChange={(newVal) => {
																		var itemData = queryArgs.items[index];

																		var term = itemData.val[j].fields[k];
																		term.key = newVal;

																		queryArgs.items[index].val = itemData.val;
																		setAttributes({
																			queryArgs: { items: queryArgs.items },
																		});
																	}}
																/>

																<InputControl
																	label="Meta Value "
																	value={y.value}
																	placeholder="25"
																	onChange={(newVal) => {
																		var itemData = queryArgs.items[index];

																		var term = itemData.val[j].fields[k];
																		term.value = newVal;

																		queryArgs.items[index].val = itemData.val;
																		setAttributes({
																			queryArgs: { items: queryArgs.items },
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
																			var itemData = queryArgs.items[index];

																			var term = itemData.val[j].fields[k];
																			term.type = newVal;

																			queryArgs.items[index].val = itemData.val;
																			setAttributes({
																				queryArgs: { items: queryArgs.items },
																			});
																		}}
																	/>
																	<SelectControl
																		style={{ margin: 0 }}
																		label="compare "
																		value={y.compare}
																		options={[
																			{ label: "IN", value: "IN" },
																			{ label: "NOT IN", value: "NOT IN" },
																			{ label: "EXISTS", value: "EXISTS" },
																			{
																				label: "NOT EXISTS",
																				value: "NOT EXISTS",
																			},
																		]}
																		onChange={(newVal) => {
																			var itemData = queryArgs.items[index];

																			var term = itemData.val[j].fields[k];
																			term.compare = newVal;

																			queryArgs.items[index].val = itemData.val;
																			setAttributes({
																				queryArgs: { items: queryArgs.items },
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
															var itemData = queryArgs.items[index];

															var xx = itemData.val[j].fields.concat({
																key: "",
																value: "",
																type: "",
																compare: "",
															});
															queryArgs.items[index].val[j].fields = xx;

															setAttributes({
																queryArgs: { items: queryArgs.items },
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
											var itemData = queryArgs.items[index];

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

											queryArgs.items[index].val = xx;

											setAttributes({ queryArgs: { items: queryArgs.items } });
										}}
									/>
								</PanelRow>

								{item.val.map((x, j) => {
									return (
										<div>
											<PanelBody
												className="font-medium text-slate-900 "
												title={x.id}
												initialOpen={false}>
												<span
													className="cursor-pointer px-3 py-1 text-white bg-red-600 text-sm my-2 inline-block"
													onClick={(_ev) => {
														queryArgs.items[index].val.splice(j, 1);
														setAttributes({
															queryArgs: { items: queryArgs.items },
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
																	//clearTimeout(debounce);
																	// debounce = setTimeout(() => {

																	queryArgs.items[index].val[j].year = newVal;
																	setAttributes({
																		queryArgs: { items: queryArgs.items },
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
																	// clearTimeout(debounce);
																	//debounce = setTimeout(() => {

																	queryArgs.items[index].val[j].month = newVal;
																	setAttributes({
																		queryArgs: { items: queryArgs.items },
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
																		queryArgs.items[index].val[j].day = newVal;
																		setAttributes({
																			queryArgs: { items: queryArgs.items },
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
																queryArgs.items[index].val[j].value = newVal;
																setAttributes({
																	queryArgs: { items: queryArgs.items },
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
																queryArgs.items[index].val[j].value = newVal;
																setAttributes({
																	queryArgs: { items: queryArgs.items },
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
																	queryArgs.items[index].val[j].value = newVal;
																	setAttributes({
																		queryArgs: { items: queryArgs.items },
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
																queryArgs.items[index].val[j].value = newVal;
																setAttributes({
																	queryArgs: { items: queryArgs.items },
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
																//clearTimeout(debounce);
																//debounce = setTimeout(() => {

																queryArgs.items[index].val[j].value = newVal;
																setAttributes({
																	queryArgs: { items: queryArgs.items },
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
																queryArgs.items[index].val[j].compare = newVal;
																setAttributes({
																	queryArgs: { items: queryArgs.items },
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
											var itemData = queryArgs.items[index];
											var xx = itemData.val.concat({
												terms: [
													{ taxonomy: "", field: "", terms: [], operator: "" },
												],
												relation: "OR",
											});
											queryArgs.items[index].val = xx;
											setAttributes({ queryArgs: { items: queryArgs.items } });
										}}>
										Add
									</div>
									{item.val.map((x, j) => {
										return (
											<div>
												<PanelBody
													className="font-medium text-slate-900 "
													title="Term"
													initialOpen={false}>
													<div
														className="cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-red-600 text-sm"
														onClick={(_ev) => {
															var itemData = queryArgs.items[index];
															var xx = itemData.val.splice(j, 1);
															queryArgs.items[index].val = itemData.val;
															setAttributes({
																queryArgs: { items: queryArgs.items },
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
																var itemData = queryArgs.items[index];

																//itemData.val.relation = newVal;
																itemData.val[j].relation = newVal;

																//var term = itemData.val[j].terms[k]
																//term.taxonomy = newVal;

																queryArgs.items[index].val = itemData.val;
																setAttributes({
																	queryArgs: { items: queryArgs.items },
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
																		var itemData = queryArgs.items[index];

																		var term = itemData.val[j].terms[k];
																		term.taxonomy = newVal;

																		queryArgs.items[index].val = itemData.val;
																		setAttributes({
																			queryArgs: { items: queryArgs.items },
																		});
																	}}
																/>

																<InputControl
																	label="Terms"
																	value={y.terms.join(",")}
																	placeholder="Comma separated"
																	onChange={(newVal) => {
																		var itemData = queryArgs.items[index];

																		var term = itemData.val[j].terms[k];
																		term.terms = newVal.split(",");

																		queryArgs.items[index].val = itemData.val;
																		setAttributes({
																			queryArgs: { items: queryArgs.items },
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
																			var itemData = queryArgs.items[index];

																			var term = itemData.val[j].terms[k];
																			term.field = newVal;

																			queryArgs.items[index].val = itemData.val;
																			setAttributes({
																				queryArgs: { items: queryArgs.items },
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
																			var itemData = queryArgs.items[index];

																			var term = itemData.val[j].terms[k];
																			term.operator = newVal;

																			queryArgs.items[index].val = itemData.val;
																			setAttributes({
																				queryArgs: { items: queryArgs.items },
																			});
																		}}
																	/>
																</PanelRow>

																<div
																	className="cursor-pointer block text-center my-2 px-3 py-1 text-white bg-red-600 text-sm"
																	onClick={(_ev) => {
																		var itemData = queryArgs.items[index];
																		var terms = itemData.val[j].terms;

																		var xx = itemData.val[j].terms.splice(k, 1);
																		queryArgs.items[index].val = itemData.val;
																		setAttributes({
																			queryArgs: { items: queryArgs.items },
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
															var itemData = queryArgs.items[index];

															var xx = itemData.val[j].terms.concat({
																taxonomy: "",
																field: "",
																terms: [],
																operator: "",
															});
															queryArgs.items[index].val[j].terms = xx;

															setAttributes({
																queryArgs: { items: queryArgs.items },
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
							item.id == "metaCompare" ||
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

						{(item.id == "postParent" || item.id == "postPassword") && (
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
									var itemData = queryArgs.items[index];

									var val = itemData.val.concat({ slug: "" });
									itemData.val = val;
									queryArgs.items[index] = itemData;
									setAttributes({ queryArgs: { items: queryArgs.items } });
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

						<p>{item.description}</p>
					</PanelBody>
				</div>
			);
		}

		function addQueryPramX(_option, index) {
			var attrExist = false;

			var data = queryPrams[index];
			var multiple = data.multiple;

			var isExist = queryArgs.items.map((item) => {
				if (item.id == index) {
					return true;
				}
			});

			var items = queryArgs.items.concat([data]);
			setAttributes({ queryArgs: { items: items } });
		}

		var RemoveQueryPram = function ({ title, index }) {
			return (
				<>
					<span
						className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
						onClick={(ev) => {
							queryArgs.items.splice(index, 1);
							setAttributes({ queryArgs: { items: queryArgs.items } });
						}}>
						<Icon icon={close} />
					</span>
					<span className="mx-2">{title}</span>
				</>
			);
		};

		function deleteGridColumn(i) {
			grid.styles.gridTemplateColumns[breakPointX].splice(i, 1);
			var styles = {
				...grid.styles,
				gridTemplateColumns: grid.styles.gridTemplateColumns,
			};
			setAttributes({ grid: { ...grid, styles: styles } });
		}

		function deleteGridRow(i) {
			grid.styles.gridTemplateRows[breakPointX].splice(i, 1);
			var styles = {
				...grid.styles,
				gridTemplateRows: grid.styles.gridTemplateRows,
			};
			setAttributes({ grid: { ...grid, styles: styles } });
		}

		const blockProps = useBlockProps({
			className: ` ${blockId} pg-post-grid-filterable`,
		});

		return (
			<>
				<InspectorControls>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Layouts"
						initialOpen={false}>
						<div className="text-white cursor-pointer">
							<div
								className={
									layoutData.source == "library"
										? "bg-blue-500 w-1/2 inline-block px-3 py-2 text-[14px] font-bold"
										: "bg-blue-300 text-[14px] font-bold inline-block px-3 py-2 w-1/2"
								}
								onClick={(_ev) => {
									setLayoutData({ source: "library" });
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
																			After import the layout you customize and
																			make your own.
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
																						postGridData.siteAdminurl +
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

					<PanelBody
						className="font-medium text-slate-900 "
						title="Query Post"
						initialOpen={false}>
						<PanelRow className="my-3">
							<label>Add Query Parameters</label>
							<PGDropdown
								position="bottom right"
								variant="secondary"
								options={queryPrams}
								buttonTitle="Choose"
								onChange={addQueryPramX}
								values=""></PGDropdown>
						</PanelRow>

						{queryArgs.items.map((item, index) => {
							return generateQueryArgOptions(item, index);
						})}

						<PanelRow className="mb-4">
							<label for="" className="font-medium text-slate-900 ">
								Query Presets
							</label>
							<PGDropdown
								position="bottom right"
								variant="secondary"
								options={queryPresets}
								buttonTitle="Choose"
								onChange={addQueryPreset}
								values={""}></PGDropdown>
						</PanelRow>
					</PanelBody>

					<PanelBody
						className="font-medium text-slate-900 "
						title="Grid Settings"
						initialOpen={false}>
						<PanelRow className="my-3">
							<Button
								onClick={(_ev) => {
									var gridTemplateColumns = grid.styles.gridTemplateColumns;

									if (
										Object.keys(grid.styles.gridTemplateColumns).length == 0
									) {
										gridTemplateColumns[breakPointX] = [{ val: 1, unit: "fr" }];
									} else {
										var sds =
											gridTemplateColumns[breakPointX] != undefined
												? gridTemplateColumns[breakPointX].concat({
														val: 1,
														unit: "fr",
												  })
												: [{ val: 1, unit: "fr" }];

										gridTemplateColumns[breakPointX] = sds;
									}

									var styles = {
										...grid.styles,
										gridTemplateColumns: gridTemplateColumns,
									};

									setAttributes({ grid: { ...grid, styles: styles } });
								}}
								className="my-3 !bg-blue-600 !text-white">
								Add Column
							</Button>
							<IconToggle
								position="bottom"
								variant="secondary"
								iconList={breakPointList}
								buttonTitle="Break Point Switch"
								onChange={onChangeBreakPoint}
								activeIcon={breakPoints[breakPointX].icon}
								value={breakPointX}
							/>
						</PanelRow>

						{grid.styles.gridTemplateColumns[breakPointX] != undefined &&
							grid.styles.gridTemplateColumns[breakPointX].map(
								(item, index) => {
									return (
										<PanelRow>
											<InputControl
												value={item.val}
												type="number"
												onChange={(newVal) => {
													var newValuesObj = {};
													if (
														Object.keys(grid.styles.gridTemplateColumns)
															.length == 0
													) {
														newValuesObj[breakPointX] = {
															val: newVal,
															unit: "em",
														};
													} else {
														var gridTemplateColumns =
															grid.styles.gridTemplateColumns;
														var sds = gridTemplateColumns[breakPointX].map(
															(x, i) => {
																return index == i
																	? { val: newVal, unit: x.unit }
																	: x;
															}
														);

														newValuesObj[breakPointX] = sds;
													}
													var styles = {
														...grid.styles,
														gridTemplateColumns: newValuesObj,
													};
													setAttributes({ grid: { ...grid, styles: styles } });
												}}
											/>
											<SelectControl
												className="mb-0"
												value={item.unit}
												options={[
													{ label: "fr", value: "fr" },
													{ label: "px", value: "px" },
													{ label: "%", value: "%" },
													{ label: "em", value: "em" },
												]}
												onChange={(newVal) => {
													var newValuesObj = {};
													if (
														Object.keys(grid.styles.gridTemplateColumns)
															.length == 0
													) {
														newValuesObj[breakPointX] = {
															val: newVal,
															unit: "em",
														};
													} else {
														var gridTemplateColumns =
															grid.styles.gridTemplateColumns;
														var sds = gridTemplateColumns[breakPointX].map(
															(x, i) => {
																return index == i
																	? { val: x.val, unit: newVal }
																	: x;
															}
														);

														newValuesObj[breakPointX] = sds;
													}

													var styles = {
														...grid.styles,
														gridTemplateColumns: newValuesObj,
													};
													setAttributes({ grid: { ...grid, styles: styles } });
												}}
											/>
											<Button
												icon="no-alt"
												onClick={(_ev) => {
													deleteGridColumn(index);
												}}></Button>
										</PanelRow>
									);
								}
							)}

						<PanelRow className="my-3">
							<Button
								onClick={(_ev) => {
									var gridTemplateRows = grid.styles.gridTemplateRows;

									if (Object.keys(grid.styles.gridTemplateRows).length == 0) {
										gridTemplateRows[breakPointX] = [{ val: 1, unit: "fr" }];
									} else {
										var sds =
											gridTemplateRows[breakPointX] != undefined
												? gridTemplateRows[breakPointX].concat({
														val: 1,
														unit: "fr",
												  })
												: [{ val: 1, unit: "fr" }];

										gridTemplateRows[breakPointX] = sds;
									}

									var styles = {
										...grid.styles,
										gridTemplateRows: gridTemplateRows,
									};
									setAttributes({ grid: { ...grid, styles: styles } });
								}}
								className="my-3 !bg-blue-600 !text-white">
								Add Row
							</Button>

							<IconToggle
								position="bottom"
								variant="secondary"
								iconList={breakPointList}
								buttonTitle="Break Point Switch"
								onChange={onChangeBreakPoint}
								activeIcon={breakPoints[breakPointX].icon}
								value={breakPointX}
							/>
						</PanelRow>

						{grid.styles.gridTemplateRows[breakPointX] != undefined &&
							grid.styles.gridTemplateRows[breakPointX].map((item, index) => {
								return (
									<PanelRow>
										<InputControl
											value={item.val}
											type="number"
											onChange={(newVal) => {
												var newValuesObj = {};
												if (
													Object.keys(grid.styles.gridTemplateRows).length == 0
												) {
													newValuesObj[breakPointX] = {
														val: newVal,
														unit: "em",
													};
												} else {
													var gridTemplateRows = grid.styles.gridTemplateRows;
													var sds = gridTemplateRows[breakPointX].map(
														(x, i) => {
															return index == i
																? { val: newVal, unit: x.unit }
																: x;
														}
													);

													newValuesObj[breakPointX] = sds;
												}
												var styles = {
													...grid.styles,
													gridTemplateRows: newValuesObj,
												};
												setAttributes({ grid: { ...grid, styles: styles } });
											}}
										/>
										<SelectControl
											className="mb-0"
											value={item.unit}
											options={[
												{ label: "fr", value: "fr" },
												{ label: "px", value: "px" },
												{ label: "%", value: "%" },
												{ label: "em", value: "em" },
											]}
											onChange={(newVal) => {
												var newValuesObj = {};
												if (
													Object.keys(grid.styles.gridTemplateRows).length == 0
												) {
													newValuesObj[breakPointX] = {
														val: newVal,
														unit: "em",
													};
												} else {
													var gridTemplateRows = grid.styles.gridTemplateRows;
													var sds = gridTemplateRows[breakPointX].map(
														(x, i) => {
															return index == i
																? { val: x.val, unit: newVal }
																: x;
														}
													);

													newValuesObj[breakPointX] = sds;
												}

												var styles = {
													...grid.styles,
													gridTemplateRows: newValuesObj,
												};
												setAttributes({ grid: { ...grid, styles: styles } });
											}}
										/>
										<Button
											icon="no-alt"
											onClick={(_ev) => {
												deleteGridRow(index);
											}}></Button>
									</PanelRow>
								);
							})}

						<PanelRow className="my-3">
							<label>Column Gap</label>
							<IconToggle
								position="bottom"
								variant="secondary"
								iconList={breakPointList}
								buttonTitle="Break Point Switch"
								onChange={onChangeBreakPoint}
								activeIcon={breakPoints[breakPointX].icon}
								value={breakPointX}
							/>
						</PanelRow>
						<PanelRow>
							<InputControl
								value={
									grid.styles.colGap[breakPointX] != undefined
										? grid.styles.colGap[breakPointX].val
										: 1
								}
								type="number"
								onChange={(newVal) => {
									var newValuesObj = {};
									if (Object.keys(grid.styles.colGap).length == 0) {
										newValuesObj[breakPointX] = { val: newVal, unit: "em" };
									} else {
										newValuesObj = grid.styles.colGap;
										var unit =
											newValuesObj[breakPointX] != undefined
												? newValuesObj[breakPointX].unit
												: "em";

										newValuesObj[breakPointX] = { val: newVal, unit: unit };
									}

									var styles = { ...grid.styles, colGap: newValuesObj };
									setAttributes({ grid: { ...grid, styles: styles } });
								}}
							/>
							<SelectControl
								className="mb-0"
								value={
									grid.styles.colGap[breakPointX] != undefined
										? grid.styles.colGap[breakPointX].unit
										: "em"
								}
								options={[
									{ label: "fr", value: "fr" },
									{ label: "px", value: "px" },
									{ label: "%", value: "%" },
									{ label: "em", value: "em" },
								]}
								onChange={(newVal) => {
									var newValuesObj = {};
									if (Object.keys(grid.styles.colGap).length == 0) {
										newValuesObj[breakPointX] = { val: 1, unit: newVal };
									} else {
										var val =
											newValuesObj[breakPointX] != undefined
												? newValuesObj[breakPointX].val
												: 1;

										newValuesObj = grid.styles.colGap;
										newValuesObj[breakPointX] = { val: val, unit: newVal };
									}

									var styles = { ...grid.styles, colGap: newValuesObj };
									setAttributes({ grid: { ...grid, styles: styles } });
								}}
							/>
						</PanelRow>

						<PanelRow className="my-3">
							<label>Row Gap</label>
							<IconToggle
								position="bottom"
								variant="secondary"
								iconList={breakPointList}
								buttonTitle="Break Point Switch"
								onChange={onChangeBreakPoint}
								activeIcon={breakPoints[breakPointX].icon}
								value={breakPointX}
							/>
						</PanelRow>
						<PanelRow>
							<InputControl
								value={
									grid.styles.rowGap[breakPointX] != undefined
										? grid.styles.rowGap[breakPointX].val
										: 1
								}
								type="number"
								onChange={(newVal) => {
									var newValuesObj = {};
									if (Object.keys(grid.styles.rowGap).length == 0) {
										newValuesObj[breakPointX] = { val: newVal, unit: "em" };
									} else {
										var unit =
											newValuesObj[breakPointX] != undefined
												? newValuesObj[breakPointX].unit
												: "em";

										newValuesObj = grid.styles.rowGap;
										newValuesObj[breakPointX] = { val: newVal, unit: unit };
									}

									var styles = { ...grid.styles, rowGap: newValuesObj };
									setAttributes({ grid: { ...grid, styles: styles } });
								}}
							/>
							<SelectControl
								className="mb-0"
								value={
									grid.styles.rowGap[breakPointX] != undefined
										? grid.styles.rowGap[breakPointX].unit
										: "em"
								}
								options={[
									{ label: "fr", value: "fr" },
									{ label: "px", value: "px" },
									{ label: "%", value: "%" },
									{ label: "em", value: "em" },
								]}
								onChange={(newVal) => {
									var newValuesObj = {};
									if (Object.keys(grid.styles.rowGap).length == 0) {
										newValuesObj[breakPointX] = { val: 1, unit: newVal };
									} else {
										var val =
											newValuesObj[breakPointX] != undefined
												? newValuesObj[breakPointX].val
												: "em";

										newValuesObj = grid.styles.rowGap;
										newValuesObj[breakPointX] = { val: val, unit: newVal };
									}

									var styles = { ...grid.styles, rowGap: newValuesObj };
									setAttributes({ grid: { ...grid, styles: styles } });
								}}
							/>
						</PanelRow>

						<div>
							<PanelRow>
								<label for="" className="font-medium text-slate-900 ">
									N'th Item CSS
								</label>
								<Button
									className="my-3"
									variant="secondary"
									onClick={(_newVal) => {
										if (isProFeature) {
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
										}
									}}>
									Add
									{isProFeature && (
										<span className="bg-amber-400 mx-2 rounded-sm px-3  text-white hover:text-white">
											<a
												target="_blank"
												href={
													"https://pickplugins.com/post-grid/?utm_source=nthItemCSS&utm_term=blockPostgrid&utm_campaign=pluginPostGrid&utm_medium=nthItemCSS"
												}>
												Pro
											</a>
										</span>
									)}
								</Button>
							</PanelRow>

							{grid.options.itemCss[breakPointX] != undefined &&
								grid.options.itemCss[breakPointX].map((x, i) => {
									return (
										<PanelBody
											className="font-medium text-slate-900 "
											title={i + 1 + "'th Item"}
											initialOpen={false}>
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
												<label for="" className="font-medium text-slate-900 ">
													grid-column-start
												</label>
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
												<label for="" className="font-medium text-slate-900 ">
													grid-column-end
												</label>
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
												<label for="" className="font-medium text-slate-900 ">
													grid-row-start
												</label>
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
												<label for="" className="font-medium text-slate-900 ">
													grid-row-end
												</label>
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

							{gridLayouts.map((x, _i) => {
								return (
									<div
										className="cursor-pointer relative hover:bg-blue-200 my-3"
										onClick={(_ev) => {
											if (x.isPro) {
												if (isProFeature == false) {
													setAttributes({ grid: x.data });
												}
											} else {
												setAttributes({ grid: x.data });
											}
										}}>
										{x.isPro && isProFeature == false && (
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
											<div className="w-full grid-layout-prewview">
												{x.icon}
											</div>
										)}
										<div className="text-[16px] p-2 bg-blue-600 text-white bg-opacity-90 text-bold  w-full text-center">
											{x.title}
										</div>
									</div>
								);
							})}
						</div>
					</PanelBody>

					<PanelBody
						className="font-medium text-slate-900 "
						title="Container"
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
									obj={container}
									onChange={onChangeStyleContainer}
									onAdd={onAddStyleContainer}
									onRemove={onRemoveStyleContainer}
								/>
							</PGtab>
							<PGtab name="css">
								<PGCssLibrary
									blockId={blockId}
									obj={container}
									onChange={onPickCssLibraryContainer}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>

					<PanelBody
						className="font-medium text-slate-900 "
						title="Items Wrap"
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
									obj={itemsWrap}
									onChange={onChangeStyleItemsWrap}
									onAdd={onAddStyleItemsWrap}
									onRemove={onRemoveStyleItemsWrap}
								/>
							</PGtab>
							<PGtab name="css">
								<PGCssLibrary
									blockId={blockId}
									obj={itemsWrap}
									onChange={onPickCssLibraryItemsWrap}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>

					<PanelBody
						className="font-medium text-slate-900 "
						title="Loop Item"
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
									obj={itemWrap}
									onChange={onChangeStyleItemWrap}
									onAdd={onAddStyleItemWrap}
									onRemove={onRemoveStyleItemWrap}
								/>
							</PGtab>
							<PGtab name="css">
								<PGCssLibrary
									blockId={blockId}
									obj={itemWrap}
									onChange={onPickCssLibraryItemWrap}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>

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
													filterable.options.filters[i].showPostCount = newVal;

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
											className="font-medium text-slate-900 "
											className="my-3 font-bold">
											Search Terms
										</label>

										<p>
											To add custom filter please use following format and hit
											Enter
										</p>
										<code>Filter Name|filter-slug|15</code>
										<InputControl
											className="my-3"
											placeholder="Search Categories or terms"
											value=""
											onKeyPress={(ev) => {
												if (ev.key === "Enter") {
													var filterParts = ev.target.value.split("|");

													var ss = filterable.options.filters[i].items.concat({
														id: 0,
														slug: filterParts[1],
														title: filterParts[0],
														count: filterParts[2],
													});
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
												fetchPostTypeTerms(newVal);
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
															<span class="dashicons dashicons-yes-alt"></span>
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
															className="cursor-pointer p-1   text-white bg-red-600 text-sm">
															<span className="dashicon dashicons dashicons-no-alt"></span>
														</span>
													</div>
												</div>
											);
										})}

										{/* {filterablTerms.length == 0 && (
                          <div className='bg-gray-200 p-2 mt-2'>No Terms Found</div>
                        )} */}

										{filterablTerms.length > 0 && (
											<div className="bg-gray-200 p-2 mt-2">
												{filterablTerms.map((x) => {
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
									var options = { ...filterable.options, multifilter: newVal };
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
									var options = { ...filterable.options, filterToggle: newVal };
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
					</PanelBody>

					<PanelBody
						className="font-medium text-slate-900 "
						title="Pagination"
						initialOpen={false}>
						<PanelRow className="mb-4">
							<label for="" className="font-medium text-slate-900 ">
								Pagination Type
							</label>
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
								<label for="" className="font-medium text-slate-900 ">
									Max Number of Pagination
								</label>
								<InputControl
									value={pagination.options.maxPageNum}
									onChange={(newVal) => {
										var options = { ...pagination.options, maxPageNum: newVal };
										setAttributes({
											pagination: { ...pagination, options: options },
										});
									}}
								/>
							</>
						)}

						{(pagination.options.type == "normal" ||
							pagination.options.type == "ajax" ||
							pagination.options.type == "next_previous") && (
							<>
								<label for="" className="font-medium text-slate-900 ">
									Previous Text
								</label>
								<InputControl
									value={pagination.options.prevText}
									onChange={(newVal) => {
										var options = { ...pagination.options, prevText: newVal };
										setAttributes({
											pagination: { ...pagination, options: options },
										});
									}}
								/>

								<label for="" className="font-medium text-slate-900 ">
									Next Text
								</label>
								<InputControl
									value={pagination.options.nextText}
									onChange={(newVal) => {
										var options = { ...pagination.options, nextText: newVal };
										setAttributes({
											pagination: { ...pagination, options: options },
										});
									}}
								/>
							</>
						)}

						{(pagination.options.type == "loadmore" ||
							pagination.options.type == "infinite") && (
							<>
								<label for="" className="font-medium text-slate-900 ">
									Load More Text
								</label>

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

								<label for="" className="font-medium text-slate-900 ">
									No Posts Text
								</label>

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

								<label for="" className="font-medium text-slate-900 ">
									Loading Text
								</label>

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

								<PanelRow>
									<label for="" className="font-medium text-slate-900 ">
										Loading Icon
									</label>

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

						<PanelBody
							className="font-medium text-slate-900 "
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

						<PanelBody
							className="font-medium text-slate-900 "
							title="Pagination Items"
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

						<PanelBody
							className="font-medium text-slate-900 "
							title="Pagination Item Active"
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

					<PanelBody
						className="font-medium text-slate-900 "
						title="Lazy load"
						initialOpen={false}>
						<PanelRow>
							<label for="" className="font-medium text-slate-900 ">
								Enable Lazyload{" "}
							</label>

							<SelectControl
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
							<label for="" className="font-medium text-slate-900 ">
								Lazyload Icon
							</label>

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
							<label for="" className="font-medium text-slate-900 ">
								Lazy Load Image
							</label>

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
										<Button onClick={open}>Media Library</Button>
									)}
								/>
							</MediaUploadCheck>
						</PanelRow>

						<img className="my-4" src={lazyLoad.options.srcUrl} alt="" />
					</PanelBody>

					<PanelBody
						className="font-medium text-slate-900 "
						className="hidden"
						title="Search"
						initialOpen={false}>
						<SelectControl
							label="Enable"
							value={search.enable}
							options={[
								{ label: "No", value: "no" },
								{ label: "Yes", value: "yes" },
							]}
							onChange={(newVal) =>
								setAttributes({
									search: {
										enable: newVal,
										type: search.type,
										placeholder: search.placeholder,
										icon: search.icon,
										busyIcon: search.busyIcon,
									},
								})
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
								setAttributes({
									search: {
										enable: search.type,
										type: newVal,
										placeholder: search.placeholder,
										icon: search.icon,
										busyIcon: search.busyIcon,
									},
								})
							}
						/>

						<InputControl
							label="Placeholder text"
							value={search.placeholder}
							onChange={(newVal) =>
								setAttributes({
									search: {
										enable: search.type,
										type: search.type,
										placeholder: newVal,
										icon: search.icon,
										busyIcon: search.busyIcon,
									},
								})
							}
						/>

						<InputControl
							label="Search icon"
							value={search.icon}
							onChange={(newVal) =>
								setAttributes({
									search: {
										enable: search.type,
										type: search.type,
										placeholder: search.placeholder,
										icon: newVal,
										busyIcon: search.busyIcon,
									},
								})
							}
						/>

						<InputControl
							label="Loading icon"
							value={search.busyIcon}
							onChange={(newVal) =>
								setAttributes({
									search: {
										enable: search.type,
										type: search.type,
										placeholder: search.placeholder,
										icon: search.icon,
										busyIcon: newVal,
									},
								})
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

					<PanelBody
						className="font-medium text-slate-900 "
						className=""
						title="Tutorials"
						initialOpen={false}>
						<PGTutorials links={tutorialsLinks} />
					</PanelBody>
				</InspectorControls>

				<div {...blockProps}>
					{grid.styles.gridTemplateColumns[breakPointX] == undefined && (
						<div className="my-5">
							<div className="text-center my-5">
								Please set the column number
							</div>

							<div className="grid grid-cols-4 gap-4">
								{columnPresets.map((x) => {
									return (
										<div
											className="cursor-pointer text-center bg-slate-400 hover:bg-slate-500"
											onClick={(ev) => {
												var gridTemplateColumns =
													grid.styles.gridTemplateColumns;
												var colGap = grid.styles.colGap;
												var rowGap = grid.styles.rowGap;

												gridTemplateColumns[breakPointX] = x.args;
												colGap[breakPointX] = { val: 1, unit: "em" };
												rowGap[breakPointX] = { val: 1, unit: "em" };

												var styles = {
													...grid.styles,
													gridTemplateColumns: gridTemplateColumns,
													colGap: colGap,
													rowGap: rowGap,
												};

												setAttributes({ grid: { ...grid, styles: styles } });
											}}>
											<span className="p-3 py-4 inline-block">{x.icon}</span>
										</div>
									);
								})}
							</div>
						</div>
					)}

					<>
						{lazyLoad.options.enable == "yes" && isBusy && (
							<div className={lazyLoad.options.class}></div>
						)}

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
														{x.showPostCount == "yes"
															? "(" + y.count + ")"
															: ""}
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
											className="pg-filter  cusror-pointer  filter-34534"
											data-filter="">
											Clear
										</div>{" "}
									</>
								)}
							</div>
						</div>

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
							{pagination.options.type == "filterable" && (
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
					</>
				</div>
			</>
		);
	},
	save: function (_props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
