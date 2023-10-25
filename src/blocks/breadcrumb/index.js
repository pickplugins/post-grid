import { registerBlockType } from "@wordpress/blocks";
import apiFetch from "@wordpress/api-fetch";
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { ReactSortable } from "react-sortablejs";

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
} from "@wordpress/components";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import {
	Icon,
	styles,
	settings,
	link,
	linkOff,
	close,
	menu,
} from "@wordpress/icons";

import { applyFilters } from "@wordpress/hooks";

import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	RichText,
} from "@wordpress/block-editor";
import { __experimentalInputControl as InputControl } from "@wordpress/components";
import breakPoints from "../../breakpoints";
const { RawHTML } = wp.element;
import { store } from "../../store";

import IconToggle from "../../components/icon-toggle";
import BreakpointToggle from "../../components/breakpoint-toggle";
import colorsPresets from "../../colors-presets";
import PGDropdown from "../../components/dropdown";
import Typography from "../../components/typography";
import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";
import PGcssDisplay from "../../components/css-display";
import PGIconPicker from "../../components/icon-picker";
import PGBlockPatterns from "../../components/block-patterns";


import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";

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
				<path
					fill="#1d4ed8"
					d="M17.55,18a.71.71,0,0,1-.24.53L12.45,22.7a.7.7,0,0,1-.91-1.06L15.79,18l-4.25-3.64a.7.7,0,0,1,.91-1.06l4.86,4.17A.71.71,0,0,1,17.55,18Z"
				/>
				<path
					fill="#1d4ed8"
					d="M36,18a.69.69,0,0,1-.25.53L30.89,22.7a.7.7,0,1,1-.9-1.06L34.23,18,30,14.36a.7.7,0,1,1,.9-1.06l4.86,4.17A.69.69,0,0,1,36,18Z"
				/>
				<rect fill="#1d4ed8" y="15.5" width="10.66" height="5" />
				<rect fill="#8db1ff" x="2.49" y="17.34" width="5.68" height="1.32" />
				<rect fill="#1d4ed8" x="19.08" y="15.5" width="10.66" height="5" />
				<rect fill="#8db1ff" x="21.57" y="17.34" width="5.68" height="1.32" />
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
		var elements = attributes.elements;
		var icon = attributes.icon;
		var label = attributes.label;
		var separator = attributes.separator;
		var schema = attributes.schema;

		var customCss = attributes.customCss;
		var blockCssY = attributes.blockCssY;

		var postId = context["postId"];
		var postType = context["postType"];

		var wrapperSelector = blockClass;
		// Wrapper CSS Class Selectors
		var itemSelector = blockClass + " .item";
		var itemLinkSelector = blockClass + " .item a";

		var iconSelector = blockClass + " .item .icon";
		var labelSelector = blockClass + " .item .label";
		var separatorSelector = blockClass + " .item .separator";

		var [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());

		var [loading, setLoading] = useState(false);

		var [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);

		useEffect(() => {
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId, customCss);

			blockCssY.items[itemSelector] = {
				...blockCssY.items[itemSelector],
				"font-size": { Desktop: "16px" },
			};

			blockCssY.items[itemSelector] = {
				...blockCssY.items[itemSelector],
				display: { Desktop: "inline-block" },
			};

			blockCssY.items[itemSelector] = {
				...blockCssY.items[itemSelector],
				"list-style": { Desktop: "none" },
			};

			blockCssY.items[itemSelector] = {
				...blockCssY.items[itemSelector],
				"margin-right": { Desktop: "10px" },
			};
			setAttributes({ blockCssY: { items: blockCssY.items } });
		}, [clientId]);

		useEffect(() => {
			elements.items.map((x, index) => {
				var styles = x.styles;

				Object.entries(styles).map((y) => {
					var attrId = y[0];
					var attrVal = y[1];

					if (Object.keys(attrVal).length != 0) {
						var attrIdX = "";

						if (attrId == "backgroundColor") {
							attrIdX = "background-color";
						} else if (attrId == "textAlign") {
							attrIdX = "text-align";
						} else {
							attrIdX = attrId;
						}

						if (
							blockCssY.items[itemSelector + ".item-" + index + " a"] ==
							undefined
						) {
							blockCssY.items[itemSelector + ".item-" + index + " a"] = {};
							blockCssY.items[itemSelector + ".item-" + index + " a"][attrIdX] =
								attrVal;
						} else {
							blockCssY.items[itemSelector + ".item-" + index + " a"][attrIdX] =
								attrVal;
						}

						if (blockCssY.items[itemSelector + ".item-" + index] == undefined) {
							blockCssY.items[itemSelector + ".item-" + index] = {};
							blockCssY.items[itemSelector + ".item-" + index][attrIdX] =
								attrVal;
						} else {
							blockCssY.items[itemSelector + ".item-" + index][attrIdX] =
								attrVal;
						}

						setAttributes({ blockCssY: { items: blockCssY.items } });
					}
				});
			});

			setTimeout((x) => {
				//setAttributes({ blockCssY: { items: newValuesObjX } });
			}, 2000);
		}, [elements]);


		function onPickBlockPatterns(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;

			var blocks = content.length > 0 ? parse(content) : "";
			console.log(content);
			console.log(blocks);
			const attributes = blocks[0].attrs;
			// attributes.blockId = Date.now();
			// console.log(Date.now());
			if (action == "insert") {
				wp.data
					.dispatch("core/block-editor")
					.insertBlocks(wp.blocks.parse(content));
			}
			if (action == "applyStyle") {
				// var options = attributes.options
				var wrapper = attributes.wrapper;
				var postTitle = attributes.postTitle;
				var prefix = attributes.prefix;
				var postfix = attributes.postfix;
				var blockCssY = attributes.blockCssY;

				setAttributes({ wrapper: wrapper });
				setAttributes({ postTitle: postTitle });
				setAttributes({ prefix: prefix });
				// setAttributes({ postfix: postfix });
				setAttributes({ blockCssY: blockCssY });
			}
			if (action == "replace") {
				if (confirm("Do you want to replace?")) {
					wp.data
						.dispatch("core/block-editor")
						.replaceBlock(clientId, wp.blocks.parse(content));
				}
			}
		}

		var linkElementsArgsBasic = [
			{
				id: "text",
				label: "Text",
				customText: "You are here: ",
				url: "",

				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					text: "You are here: ",
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			{
				id: "homePage",
				label: "Home Page Link",
				customText: "%s",
				url: "",

				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			{
				id: "frontPage",
				label: "Front Page Link",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			{
				id: "postsPage",
				label: "Posts Page Link",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			{
				id: "postTitle",
				label: "Post Title",
				customText: "%s",
				url: "",

				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postAuthor",
				label: "Post Author",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			{
				id: "postDate",
				label: "Post Date",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					format: "Y-m-d",
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postDay",
				label: "Post Day",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					format: "",
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postMonth",
				label: "Post Month",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					format: "",
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			{
				id: "postYear",
				label: "Post Year",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					format: "",
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postAncestors",
				isPro: true,
				label: "Post Ancestors",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
					count: "",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postId",
				label: "Post Id",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postCategory",
				label: "Post Category",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postTag",
				label: "Post Tag",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postCategories",
				isPro: true,
				label: "Post Categories",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
					maxCount: 3,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postTags",
				isPro: true,
				label: "Post Tags",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
					maxCount: 3,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			{
				id: "postTerm",
				isPro: true,
				label: "Post Term",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					taxonomy: "",
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			{
				id: "postTerms",
				isPro: true,
				label: "Post Terms",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					taxonomy: "",
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			{
				id: "termTitle",
				label: "Term Title",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "termParents",
				isPro: true,
				label: "Term Parents",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
					count: 0,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "termAncestors",
				isPro: true,
				label: "Term Ancestors",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					taxonomy: "",
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			{
				id: "wcShop",
				label: "WooCommerce Shop",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "wcAccount",
				label: "WooCommerce Account",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "wcCart",
				label: "WooCommerce Cart",
				isPro: true,
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "wcCheckout",
				label: "WooCommerce Checkout",
				isPro: true,
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			{
				id: "searchText",
				label: "Search Text",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			{
				id: "archiveTitle",
				label: "Archive Title",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			{
				id: "404Text",
				label: "404 Text",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			{
				id: "dateText",
				label: "Date Text",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
					format: "Y-m-d",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "monthText",
				label: "Month Text",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
					format: "Y-m",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			{
				id: "yearText",
				label: "Year Text",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
					format: "Y",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			{
				id: "authorName",
				label: "Author Name",
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
		];
		let linkElementsArgs = applyFilters(
			"linkElementsArgs",
			linkElementsArgsBasic
		);
		let isProFeature = applyFilters("isProFeature", true);

		function addMedia(option, index) {
			//var isExist = elements.items.find(x => x.label === option.label);s

			//if (isExist == undefined) {

			//}

			var elementsX = elements.items.push(option);
			setAttributes({ elements: { ...elements, items: elements.items } });
		}

		var breakPointList = [{ label: "Select..", icon: "", value: "" }];

		for (var x in breakPoints) {
			var item = breakPoints[x];
			breakPointList.push({
				label: item.name,
				icon: item.icon,
				value: item.id,
			});
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

		function onChangeStyleElements(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, elements);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ elements: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemSelector
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

		function onRemoveStyleElements(sudoScource, key) {
			var object = myStore.deletePropertyDeep(elements, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ elements: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleElements(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, elements);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ elements: object });
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

		function onChangeStyleLabel(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, label);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ label: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelSelector
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

		function onRemoveStyleLabel(sudoScource, key) {
			var object = myStore.deletePropertyDeep(label, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ label: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleLabel(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, label);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ label: object });
		}

		function onChangeStyleSeparator(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, separator);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ separator: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				separatorSelector
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

		function onRemoveStyleSeparator(sudoScource, key) {
			var object = myStore.deletePropertyDeep(separator, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ separator: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				separatorSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleSeparator(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, separator);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ separator: object });
		}

		function onBulkAddWrapper(sudoScource, cssObj) {
			// var path = [sudoScource, attr, breakPointX]
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

		function onBulkAddItems(sudoScource, cssObj) {
			// var path = [sudoScource, attr, breakPointX]
			let obj = Object.assign({}, elements);
			obj[sudoScource] = cssObj;

			setAttributes({ elements: obj });

			var selector = myStore.getElementSelector(sudoScource, elementsSelector);
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
			// var path = [sudoScource, attr, breakPointX]
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

		function onBulkAddLabel(sudoScource, cssObj) {
			// var path = [sudoScource, attr, breakPointX]
			let obj = Object.assign({}, label);
			obj[sudoScource] = cssObj;

			setAttributes({ label: obj });

			var selector = myStore.getElementSelector(sudoScource, labelSelector);
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

		function onBulkAddSeperator(sudoScource, cssObj) {
			// var path = [sudoScource, attr, breakPointX]
			let obj = Object.assign({}, separator);
			obj[sudoScource] = cssObj;

			setAttributes({ separator: obj });

			var selector = myStore.getElementSelector(sudoScource, separatorSelector);
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

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId, customCss);
		}, [blockCssY]);

		function onChangeBreakPoint(x, index) {
			var asdsdsd = wp.data.dispatch("postgrid-shop").setBreakPoint(x.value);

			asdsdsd.then((res) => {
				setBreakPointX(res.breakpoint);

				myStore.generateBlockCss(blockCssY.items, blockId, customCss);
			});
		}

		const blockProps = useBlockProps({
			className: ` ${blockId} pg-breadcrumb`,
		});

		return (
			<>
				<InspectorControls>
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
										onBulkAdd={onBulkAddWrapper}
										onRemove={onRemoveStyleWrapper}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody title="Items" initialOpen={true}>
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
									<div className="my-4">
										<PanelRow>
											<label for="">Add Element</label>
											<PGDropdown
												position="bottom right"
												variant="secondary"
												options={linkElementsArgs}
												buttonTitle="Choose"
												onChange={addMedia}
												values=""></PGDropdown>
										</PanelRow>
									</div>

									<ReactSortable
										list={elements.items}
										handle={".handle"}
										setList={(item) => {
											setAttributes({ elements: { ...elements, items: item } });
										}}>
										{elements.items.map((item, index) => (
											<div key={item.id} className="">
												<PanelBody
													title={
														<>
															<span
																className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																onClick={(ev) => {
																	var elementsX = elements.items.splice(
																		index,
																		1
																	);
																	setAttributes({
																		elements: {
																			...elements,
																			items: elements.items,
																		},
																	});
																}}>
																<Icon icon={close} />
															</span>
															<span className="handle cursor-pointer hover:bg-blue-500 hover:text-white px-1 py-1">
																<Icon icon={menu} />
															</span>

															<span className="mx-2">{item.label}</span>
														</>
													}
													initialOpen={false}>
													<div>
														<label for="">Custom Label</label>
														<InputControl
															value={item.customText}
															placeholder="You Text: %s"
															onChange={(newVal) => {
																elements.items[index].customText = newVal;
																setAttributes({
																	elements: {
																		...elements,
																		items: elements.items,
																	},
																});
															}}
														/>
														<p>
															Please use <code>%s</code> for output
														</p>
													</div>

													<div className="my-3">
														<label for="">Custom URL</label>
														<InputControl
															value={item.url}
															onChange={(newVal) => {
																elements.items[index].url = newVal;
																setAttributes({
																	elements: {
																		...elements,
																		items: elements.items,
																	},
																});
															}}
														/>
													</div>

													{(item.id == "postTerms" ||
														item.id == "postTerm") && (
														<div className="my-3">
															<label for="">Taxonomy</label>
															<InputControl
																value={item.options.taxonomy}
																onChange={(newVal) => {
																	elements.items[index].options.taxonomy =
																		newVal;
																	setAttributes({
																		elements: {
																			...elements,
																			items: elements.items,
																		},
																	});
																}}
															/>
														</div>
													)}

													{(item.id == "termParents" ||
														item.id == "postAncestors") && (
														<>
															<div className="my-3">
																<label for="">Max Count</label>
																<InputControl
																	value={item.options.count}
																	onChange={(newVal) => {
																		elements.items[index].options.count =
																			newVal;
																		setAttributes({
																			elements: {
																				...elements,
																				items: elements.items,
																			},
																		});
																	}}
																/>
																<p>
																	Use <code>-</code> (negetive sign) to count
																	from end.
																</p>
															</div>
														</>
													)}

													{(item.id == "dateText" ||
														item.id == "monthText" ||
														item.id == "yearText" ||
														item.id == "postDate" ||
														item.id == "postDay" ||
														item.id == "postMonth" ||
														item.id == "postYear") && (
														<div className="my-3">
															<label for="">Date Format</label>
															<InputControl
																value={item.options.format}
																onChange={(newVal) => {
																	elements.items[index].options.format = newVal;
																	setAttributes({
																		elements: {
																			...elements,
																			items: elements.items,
																		},
																	});
																}}
															/>
														</div>
													)}

													<PanelRow>
														<label for="">Choose Icon</label>
														<PGIconPicker
															library={item.siteIcon.library}
															srcType={item.siteIcon.srcType}
															iconSrc={item.siteIcon.iconSrc}
															onChange={(arg) => {
																//var options = { ...icon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
																//setAttributes({ icon: { ...icon, options: options } });

																elements.items[index].siteIcon = {
																	srcType: arg.srcType,
																	library: arg.library,
																	iconSrc: arg.iconSrc,
																};
																setAttributes({
																	elements: {
																		...elements,
																		items: elements.items,
																	},
																});
															}}
														/>
													</PanelRow>

													<PanelRow className="my-3">
														<label>Color</label>
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

													<ColorPalette
														value={
															elements.items[index].styles.color == undefined
																? ""
																: elements.items[index].styles.color[
																		breakPointX
																  ]
														}
														colors={colorsPresets}
														enableAlpha
														onChange={(newVal) => {
															var newValuesObj = {};

															if (
																Object.keys(elements.items[index].styles.color)
																	.length == 0
															) {
																newValuesObj[breakPointX] = newVal;
															} else {
																newValuesObj =
																	elements.items[index].styles.color;
																newValuesObj[breakPointX] = newVal;
															}

															var styles = {
																...elements.items[index].styles,
																color: newValuesObj,
															};
															elements.items[index].styles = styles;

															setAttributes({
																elements: {
																	...elements,
																	items: elements.items,
																},
															});
														}}
													/>

													<PanelRow className="my-3">
														<label>Background Color</label>
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

													<ColorPalette
														value={
															elements.items[index].styles.backgroundColor ==
															undefined
																? ""
																: elements.items[index].styles.backgroundColor[
																		breakPointX
																  ]
														}
														colors={colorsPresets}
														enableAlpha
														onChange={(newVal) => {
															var newValuesObj = {};

															if (
																Object.keys(
																	elements.items[index].styles.backgroundColor
																).length == 0
															) {
																newValuesObj[breakPointX] = newVal;
															} else {
																newValuesObj =
																	elements.items[index].styles.backgroundColor;
																newValuesObj[breakPointX] = newVal;
															}

															var styles = {
																...elements.items[index].styles,
																backgroundColor: newValuesObj,
															};
															elements.items[index].styles = styles;

															setAttributes({
																elements: {
																	...elements,
																	items: elements.items,
																},
															});

															// var newValuesObjX = {};
															// if (blockCssY.items[itemSelector] == undefined) {

															//   newValuesObjX[itemSelector] = { ...blockCssY.items[itemSelector], 'background-color': newValuesObj };

															// } else {

															//   newValuesObjX[itemSelector] = { ...blockCssY.items[itemSelector], 'background-color': newValuesObj };
															// }

															//setAttributes({ blockCssY: { items: newValuesObjX } });
														}}
													/>
												</PanelBody>
											</div>
										))}
									</ReactSortable>

									<ToggleControl
										className="my-3"
										label="Display Label?"
										help={
											elements.options.showLabel
												? "Label is displaying"
												: "Label is hidden"
										}
										checked={elements.options.showLabel ? true : false}
										onChange={(e) => {
											var options = {
												...elements.options,
												showLabel: elements.options.showLabel ? false : true,
											};
											setAttributes({
												elements: { ...elements, options: options },
											});
										}}
									/>

									<PanelRow className="my-3">
										<div>
											<ToggleControl
												className="my-3"
												disabled={isProFeature}
												label="Display Icon?"
												help={
													elements.options.showIcon
														? "Icon is displaying"
														: "Icon is hidden"
												}
												checked={elements.options.showIcon ? true : false}
												onChange={(e) => {
													var options = {
														...elements.options,
														showIcon: elements.options.showIcon ? false : true,
													};
													setAttributes({
														elements: { ...elements, options: options },
													});
												}}
											/>
										</div>

										<div>
											{isProFeature && (
												<span className="bg-amber-400 rounded-sm py-1 px-3  text-white hover:text-white">
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
										</div>
									</PanelRow>

									<ToggleControl
										className="my-3"
										label="Display Separator?"
										help={
											elements.options.showSeparator
												? "Separator is displaying"
												: "Separator is hidden"
										}
										checked={elements.options.showSeparator ? true : false}
										onChange={(e) => {
											var options = {
												...elements.options,
												showSeparator: elements.options.showSeparator
													? false
													: true,
											};
											setAttributes({
												elements: { ...elements, options: options },
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={elements}
										onChange={onChangeStyleElements}
										onAdd={onAddStyleElements}
										onBulkAdd={onBulkAddItems}
										onRemove={onRemoveStyleElements}
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
								]}>
								<PGtab name="options">
									<PanelRow>
										<label for="">Icon position</label>

										<SelectControl
											label=""
											value={icon.options.position}
											options={[
												{ label: "Choose Position", value: "" },

												{ label: "Before Label", value: "beforeLabel" },
												{ label: "After Label", value: "afterLabel" },
												{ label: "Before Separator", value: "beforeSeparator" },
												{ label: "After Separator", value: "afterSeparator" },
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
										onBulkAdd={onBulkAddIcon}
										onAdd={onAddStyleIcon}
										onRemove={onRemoveStyleIcon}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody title="Label" initialOpen={false}>
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
										obj={label}
										onChange={onChangeStyleLabel}
										onAdd={onAddStyleLabel}
										onBulkAdd={onBulkAddLabel}
										onRemove={onRemoveStyleLabel}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody title="Separator" initialOpen={false}>
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
										<label for="">Separator Text</label>
										<InputControl
											value={separator.options.text}
											onChange={(newVal) => {
												var options = { ...separator.options, text: newVal };
												setAttributes({
													separator: { ...separator, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={separator}
										onChange={onChangeStyleSeparator}
										onAdd={onAddStyleSeparator}
										onBulkAdd={onBulkAddSeperator}
										onRemove={onRemoveStyleSeparator}
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

						<PanelBody title="Block Variations" initialOpen={false}>
							<PGBlockPatterns
								blockName={"breadcrumb"}
								onChange={onPickBlockPatterns}
							/>
						</PanelBody>

						<PanelBody title="Custom Style" initialOpen={false}>
							<p>
								Please use following class selector to apply your custom CSS
							</p>
							<div className="my-3">
								<p className="font-bold">Wrapper Selector</p>
								<p>
									<code>
										{wrapperSelector}
										{"{/* your CSS here*/}"}
									</code>
								</p>
							</div>

							<div className="my-3">
								<p className="font-bold">Item Selector</p>
								<p>
									<code>
										{itemSelector}
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
									utm_source: "BlockPostExcerpt",
									utm_campaign: "PostGridCombo",
									utm_content: "BlockOptions",
								}}
							/>
						</div>
					</div>
				</InspectorControls>

				<div {...blockProps}>
					<ol>
						{elements.items.map((x, index) => {
							return (
								<li className={"item item-" + index}>
									{x.url.length > 0 && (
										<a href={x.url}>
											{elements.options.showIcon &&
												icon.options.position == "beforeLabel" && (
													<span className={`icon ${x.siteIcon.iconSrc}`}></span>
												)}
											{elements.options.showLabel && (
												<span className="label">
													{x.customText.length > 0 ? x.customText : x.label}
												</span>
											)}
											{elements.options.showIcon &&
												icon.options.position == "afterLabel" && (
													<span className={`icon ${x.siteIcon.iconSrc}`}></span>
												)}
										</a>
									)}

									{x.url.length == 0 && (
										<span>
											{elements.options.showIcon &&
												icon.options.position == "beforeLabel" && (
													<span className={`icon ${x.siteIcon.iconSrc}`}></span>
												)}
											{elements.options.showLabel && (
												<span className="label">
													{x.customText.length > 0 ? x.customText : x.label}
												</span>
											)}
											{elements.options.showIcon &&
												icon.options.position == "afterLabel" && (
													<span className={`icon ${x.siteIcon.iconSrc}`}></span>
												)}
										</span>
									)}

									{elements.options.showSeparator && (
										<>
											{elements.options.showIcon &&
												icon.options.position == "beforeSeparator" && (
													<span className={`icon ${x.siteIcon.iconSrc}`}></span>
												)}
											{elements.items.length > index && (
												<span class="separator">{separator.options.text}</span>
											)}
											{elements.options.showIcon &&
												icon.options.position == "afterSeparator" && (
													<span className={`icon ${x.siteIcon.iconSrc}`}></span>
												)}
										</>
									)}
								</li>
							);
						})}
					</ol>
				</div>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
