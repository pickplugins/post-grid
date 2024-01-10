import { registerBlockType, createBlock } from "@wordpress/blocks";
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
	brush,
	mediaAndText,
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

import PGDropdown from "../../components/dropdown";

import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";
import PGIconPicker from "../../components/icon-picker";
import PGCssLibrary from "../../components/css-library";
import PGLibraryBlockVariations from "../../components/library-block-variations";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import metadata from "./block.json";
import PGcssClassPicker from "../../components/css-class-picker";
import customTags from "../../custom-tags";
import PGTutorials from "../../components/tutorials";

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
					d="M85.6845 32.978C85.6845 43.8453 85.6845 54.3782 85.6845 65.2455C72.7273 70.094 59.6866 74.9425 46.395 79.9581C46.395 69.0908 46.395 58.4744 46.395 47.6071C59.3522 42.7586 72.4765 37.9101 85.6845 32.978Z"
					fill="url(#paint0_linear_61_946)"
				/>
				<path
					d="M42.466 47.5235C42.466 58.3908 42.466 68.9237 42.466 79.8746C29.2581 74.9425 16.301 70.094 3.26025 65.2455C3.26025 54.4618 3.26025 43.9289 3.26025 32.978C16.4682 37.9101 29.5089 42.675 42.466 47.5235Z"
					fill="url(#paint1_linear_61_946)"
				/>
				<path
					d="M85.4334 14.8381C71.4731 20.0209 58.098 25.0366 44.4721 30.1358C31.0969 25.2037 17.6382 20.1045 3.51074 14.9216C12.4554 11.5779 20.7312 8.48485 29.0907 5.39185C33.6048 3.71996 38.1189 2.13166 42.633 0.376176C43.887 -0.125392 44.9736 -0.125392 46.2275 0.376176C59.1011 5.14107 72.0583 9.8224 85.4334 14.8381Z"
					fill="url(#paint2_linear_61_946)"
				/>
				<path
					d="M88.9446 17.5967C88.9446 21.0241 88.9446 24.2006 88.9446 27.628C74.9007 32.8109 60.8568 38.0774 46.4785 43.4274C46.4785 40 46.4785 36.907 46.4785 33.3961C60.4388 28.2132 74.6499 22.9467 88.9446 17.5967Z"
					fill="url(#paint3_linear_61_946)"
				/>
				<path
					d="M42.466 43.4274C28.0877 38.0774 14.0439 32.8109 0 27.628C0 24.2842 0 21.1077 0 17.5967C14.2947 22.9467 28.4221 28.1296 42.466 33.3961C42.466 36.7399 42.466 39.9164 42.466 43.4274Z"
					fill="url(#paint4_linear_61_946)"
				/>
				<path
					d="M160 89.4878H0V106.625H160V89.4878Z"
					fill="url(#paint5_linear_61_946)"
				/>
				<path
					d="M160 120.334H0V137.471H160V120.334Z"
					fill="url(#paint6_linear_61_946)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_946"
						x1="46.395"
						y1="56.4681"
						x2="85.6845"
						y2="56.4681"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_946"
						x1="3.26025"
						y1="56.4263"
						x2="42.466"
						y2="56.4263"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_946"
						x1="3.51074"
						y1="15.0679"
						x2="85.4334"
						y2="15.0679"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_946"
						x1="46.4785"
						y1="30.512"
						x2="88.9446"
						y2="30.512"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_946"
						x1="0"
						y1="30.512"
						x2="42.466"
						y2="30.512"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_61_946"
						x1="0"
						y1="98.0562"
						x2="160"
						y2="98.0562"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint6_linear_61_946"
						x1="0"
						y1="128.903"
						x2="160"
						y2="128.903"
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
		var items = attributes.items;
		var icon = attributes.icon;
		var postfix = attributes.postfix;
		var prefix = attributes.prefix;
		var itemInfo = attributes.itemInfo;

		var blockCssY = attributes.blockCssY;

		var postId = context["postId"];
		var postType = context["postType"];

		var wrapperSelector = blockClass;
		// Wrapper CSS Class Selectors
		var itemSelector = blockClass + " .item";
		var itemLinkSelector = blockClass + " .item a";

		var iconSelector = blockClass + " .item .icon";
		var prefixSelector = blockClass + " .item .prefix";
		var postfixSelector = blockClass + " .item .postfix";

		var defaultProductData = {
			ID: 1409,
			post_title: "Beanie with Logo",

			total_sales: 0,
			type: "simple",
			sku: "Woo-beanie-logo",
			manage_stock: true,
			stock_quantity: 5,
			stock_status: "instock",
			backorders: "no",
			weight: "",
			length: "",
			width: "",
			height: "",
			dimensions: "N/A",
			rating_count: 0,
			review_count: 0,
			average_rating: "0",
			on_sale: false,
			gallery_image_ids: [],
			currency: "USD",
			currency_symbol: "&#36;",
			currency_pos: "left",
			attributes: {
				pa_color: {
					label: "Color",
					values: "Red",
				},
			},
			regular_price: "20",
			sale_price: "",
			date_on_sale_from: null,
			date_on_sale_to: null,
			price: "20",
		};
		var [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
		const [productData, setproductData] = useState(defaultProductData);

		const [loading, setloading] = useState(false);

		const CustomTagWrapper = `${wrapper.options.tag}`;
		const CustomTagPostTitle =
			items.options.tag.length != 0 ? `${items.options.tag}` : "div";

		var elementsArgsBase = [
			{
				id: "weight",
				label: "Weight",
				prefix: "Weight: ",
				postfix: "",
				value: "10kg",

				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			{
				id: "length",
				label: "Length",
				prefix: "Length: ",
				postfix: "",
				value: "10cm",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			{
				id: "width",
				label: "Width",
				prefix: "Width: ",
				postfix: "",
				value: "10cm",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "height",
				label: "Height",
				prefix: "Height: ",
				postfix: "",
				value: "10cm",

				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			{
				id: "dimensions",
				label: "Dimensions",
				prefix: "Dimensions: ",
				postfix: "",
				value: "10cm X 10cm X 10cm",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
		];
		//let elementsArgs = applyFilters('elementsArgs', elementsArgsBase);
		var [elementsArgs, setelementsArgs] = useState(elementsArgsBase);

		var [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);

		useEffect(() => {
			setloading(true);

			apiFetch({
				path: "/post-grid/v2/get_post_data",
				method: "POST",
				data: { postId: postId },
			}).then((res) => {
				if (res.manage_stock != undefined) {
					setproductData(res);
				}
				var attributes = res.attributes;
				Object.entries(attributes).map((item) => {
					var index = item[0];
					var value = item[1];

					elementsArgs.push({
						id: index,
						label: value.label,
						type: "taxonomy",
						separator: ", ",
						linkTo: "termUrl",
						prefix: value.label + ": ",
						postfix: "",
						value: value.values,
						siteIcon: {
							library: "fontAwesome",
							srcType: "class",
							/*class, html, img, svg */ iconSrc: "",
						},
						options: {},
						styles: {
							color: { Desktop: "" },
							backgroundColor: { Desktop: "" },
							padding: { Desktop: "" },
							margin: { Desktop: "" },
						},
					});
				});

				setelementsArgs(elementsArgs);

				setloading(false);
			});
		}, []);

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });

			myStore.generateBlockCss(blockCssY.items, blockId);

			setAttributes({ blockCssY: { items: blockCssY.items } });
		}, [clientId]);

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[prefixSelector] = prefix;
			blockCssObj[postfixSelector] = postfix;
			blockCssObj[iconSelector] = icon;
			blockCssObj[itemSelector] = items;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var itemX = blockCssRules;
			setAttributes({ blockCssY: { items: itemX } });
		}, [blockId]);

		// useEffect(() => {
		// 	items.elements.map((x, index) => {
		// 		var styles = x.styles;

		// 		Object.entries(styles).map((y) => {
		// 			var attrId = y[0];
		// 			var attrVal = y[1];

		// 			if (Object.keys(attrVal).length != 0) {
		// 				var attrIdX = "";
		// 				var cssPropty = myStore.cssAttrParse(attrId);

		// 				if (
		// 					blockCssY.items[itemSelector + ".item-" + index + " a"] ==
		// 					undefined
		// 				) {
		// 					blockCssY.items[itemSelector + ".item-" + index + " a"] = {};
		// 					blockCssY.items[itemSelector + ".item-" + index + " a"][
		// 						cssPropty
		// 					] = attrVal;
		// 				} else {
		// 					blockCssY.items[itemSelector + ".item-" + index + " a"][
		// 						cssPropty
		// 					] = attrVal;
		// 				}

		// 				if (blockCssY.items[itemSelector + ".item-" + index] == undefined) {
		// 					blockCssY.items[itemSelector + ".item-" + index] = {};
		// 					blockCssY.items[itemSelector + ".item-" + index][cssPropty] =
		// 						attrVal;
		// 				} else {
		// 					blockCssY.items[itemSelector + ".item-" + index][cssPropty] =
		// 						attrVal;
		// 				}

		// 				setAttributes({ blockCssY: { items: blockCssY.items } });
		// 			}
		// 		});
		// 	});

		// 	setTimeout((x) => {
		// 		//setAttributes({ blockCssY: { items: newValuesObjX } });
		// 	}, 2000);
		// }, [items]);

		//let elementsArgs = elementsArgsBase
		let isProFeature = applyFilters("isProFeature", true);

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
				var iconX = attributes.icon;
				var prefixX = attributes.prefix;
				var postfixX = attributes.postfix;
				var itemInfoX = attributes.itemInfo;
				var itemsX = attributes.items;
				var blockCssYX = attributes.blockCssY;

				var blockCssObj = {};

				if (itemsX != undefined) {
					var itemsY = { ...itemsX, options: items.options };
					setAttributes({ items: itemsY });
					blockCssObj[itemsSelector] = itemsY;
				}

				if (itemInfoX != undefined) {
					var itemInfoY = { ...itemInfoX, options: itemInfo.options };
					setAttributes({ itemInfo: itemInfoY });
					blockCssObj[itemInfoSelector] = itemInfoY;
				}

				if (postfixX != undefined) {
					var postfixY = { ...postfixX, options: postfix.options };
					setAttributes({ postfix: postfixY });
					blockCssObj[postfixSelector] = postfixY;
				}

				if (prefixX != undefined) {
					var prefixY = { ...prefixX, options: prefix.options };
					setAttributes({ prefix: prefixY });
					blockCssObj[prefixSelector] = prefixY;
				}

				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[iconSelector] = iconY;
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

		function addMedia(option, index) {
			//var isExist = items.elements.find(x => x.label === option.label);

			var elementsX = items.elements.push(option);
			setAttributes({ items: { ...items, elements: items.elements } });
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

		function onChangeStyleItems(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, items);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ items: object });

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

		function onRemoveStyleItems(sudoScource, key) {
			var object = myStore.deletePropertyDeep(items, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ items: object });

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

		function onAddStyleItems(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, items);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ items: object });
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

		function onChangeStylePrefix(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, prefix);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ prefix: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				prefixSelector
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

		function onRemoveStylePrefix(sudoScource, key) {
			var object = myStore.deletePropertyDeep(prefix, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ prefix: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				prefixSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStylePrefix(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, prefix);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ prefix: object });
		}

		function onResetPrefix(sudoScources) {
			let obj = Object.assign({}, prefix);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						prefixSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ prefix: obj });
		}

		function onChangeStylePostfix(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, postfix);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ postfix: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				postfixSelector
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

		function onRemoveStylePostfix(sudoScource, key) {
			var object = myStore.deletePropertyDeep(postfix, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ postfix: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				postfixSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStylePostfix(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, postfix);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ postfix: object });
		}

		function onResetPostfix(sudoScources) {
			let obj = Object.assign({}, postfix);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						postfixSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ postfix: obj });
		}

		function onBulkAddPrefix(sudoScource, cssObj) {
			let obj = Object.assign({}, prefix);
			obj[sudoScource] = cssObj;

			setAttributes({ prefix: obj });

			var selector = myStore.getElementSelector(sudoScource, prefixSelector);
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

		function onBulkAddPostfix(sudoScource, cssObj) {
			let obj = Object.assign({}, postfix);
			obj[sudoScource] = cssObj;

			setAttributes({ postfix: obj });

			var selector = myStore.getElementSelector(sudoScource, postfixSelector);
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

		function onPickCssLibraryPrefix(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				prefix[sudoScource] = sudoScourceArgs;
			});

			var prefixX = Object.assign({}, prefix);
			setAttributes({ prefix: prefixX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					prefixSelector
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

		function onPickCssLibraryPostfix(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				postfix[sudoScource] = sudoScourceArgs;
			});

			var postfixX = Object.assign({}, postfix);
			setAttributes({ postfix: postfixX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					postfixSelector
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

		function onChangeStyleItem(sudoScource, newVal, attr, obj, extra) {
			var index = extra.index;

			var path = [sudoScource, attr, breakPointX];
			let objX = Object.assign({}, obj);
			const object = myStore.updatePropertyDeep(objX, path, newVal);

			var itemsX = { ...items };

			itemsX.elements[index] = object;

			setAttributes({ items: itemsX });

			//setAttributes({ obj: object });

			// var elementSelector = myStore.getElementSelector(sudoScource, itemSelector);
			// var cssPropty = myStore.cssAttrParse(attr);

			// let itemsX = Object.assign({}, blockCssY.items);

			// if (itemsX[elementSelector] == undefined) {
			//   itemsX[elementSelector] = {};
			// }

			// var cssPath = [elementSelector, cssPropty, breakPointX]
			// const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)

			// setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleItem(sudoScource, key, obj, extra) {
			var index = extra.index;

			var object = myStore.deletePropertyDeep(obj, [
				sudoScource,
				key,
				breakPointX,
			]);

			var itemsX = { ...items };
			itemsX.elements[index] = object;
			setAttributes({ items: itemsX });

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

			var itemsX = { ...items };

			itemsX.elements[index] = object;

			//setAttributes({ items: object });
			setAttributes({ items: itemsX });
		}

		function onBulkAddItem(sudoScource, cssObj) {
			let obj = Object.assign({}, items);
			obj[sudoScource] = cssObj;

			setAttributes({ items: obj });

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

		function onChangeBreakPoint(x, index) {
			var asdsdsd = wp.data.dispatch("postgrid-shop").setBreakPoint(x.value);

			asdsdsd.then((res) => {
				setBreakPointX(res.breakpoint);

				myStore.generateBlockCss(blockCssY.items, blockId);
			});
		}

		const blockProps = useBlockProps({
			className: ` ${blockId} pg-woo-product-info`,
		});

		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
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
												{ label: "UL", value: "ul" },
												{ label: "OL", value: "ol" },
											]}
											onChange={(newVal) => {
												var options = { ...wrapper.options, tag: newVal };
												setAttributes({
													wrapper: { ...wrapper, options: options },
												});
											}}
										/>
									</PanelRow>

									{/* <PGcssClassPicker
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
									/> */}

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
							title="Items"
							initialOpen={true}>
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
											Wrapper Tag
										</label>

										<SelectControl
											label=""
											value={items.options.tag}
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
												{ label: "UL", value: "ul" },
												{ label: "OL", value: "ol" },
												{ label: "LI", value: "li" },
											]}
											onChange={(newVal) => {
												var options = { ...items.options, tag: newVal };
												setAttributes({
													items: { ...items, options: options },
												});
											}}
										/>
									</PanelRow>

									<div className="my-4">
										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Add Element
											</label>
											<PGDropdown
												position="bottom right"
												variant="secondary"
												options={elementsArgs}
												buttonTitle="Choose"
												onChange={addMedia}
												values=""></PGDropdown>
										</PanelRow>
									</div>

									<ReactSortable
										list={items.elements}
										handle={".handle"}
										setList={(item) => {
											setAttributes({ items: { ...items, elements: item } });
										}}>
										{items.elements.map((item, index) => (
											<div key={item.id} className="">
												<PanelBody
													title={
														<>
															<span
																className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																onClick={(ev) => {
																	var elementsX = items.elements.splice(
																		index,
																		1
																	);
																	setAttributes({
																		items: {
																			...items,
																			elements: items.elements,
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
															<div>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	Prefix
																</label>
																<InputControl
																	value={item.prefix}
																	placeholder=""
																	onChange={(newVal) => {
																		items.elements[index].prefix = newVal;
																		setAttributes({
																			items: {
																				...items,
																				elements: items.elements,
																			},
																		});
																	}}
																/>
															</div>

															{item.id == "text" && (
																<div>
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Value
																	</label>
																	<InputControl
																		value={item.value}
																		placeholder=""
																		onChange={(newVal) => {
																			items.elements[index].value = newVal;
																			setAttributes({
																				items: {
																					...items,
																					elements: items.elements,
																				},
																			});
																		}}
																	/>
																</div>
															)}

															<div>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	Postfix
																</label>
																<InputControl
																	value={item.postfix}
																	placeholder=""
																	onChange={(newVal) => {
																		items.elements[index].postfix = newVal;
																		setAttributes({
																			items: {
																				...items,
																				elements: items.elements,
																			},
																		});
																	}}
																/>
															</div>

															<PanelRow>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	Choose Icon
																</label>
																<PGIconPicker
																	library={item.siteIcon.library}
																	srcType={item.siteIcon.srcType}
																	iconSrc={item.siteIcon.iconSrc}
																	onChange={(arg) => {
																		items.elements[index].siteIcon = {
																			srcType: arg.srcType,
																			library: arg.library,
																			iconSrc: arg.iconSrc,
																		};
																		setAttributes({
																			items: {
																				...items,
																				elements: items.elements,
																			},
																		});
																	}}
																/>
															</PanelRow>
														</PGtab>
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
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={items}
										onChange={onChangeStyleItems}
										onAdd={onAddStyleItems}
										onRemove={onRemoveStyleItem}
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
								<PGtab name="options">
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Icon position
										</label>

										<SelectControl
											label=""
											value={icon.options.position}
											options={[
												{ label: "Choose Position", value: "" },

												{ label: "Before Prefix", value: "beforePrefix" },
												{ label: "After Prefix", value: "afterPrefix" },
												{ label: "Before Postfix", value: "beforePostfix" },
												{ label: "After Postfix", value: "beforePostfix" },
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
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Prefix"
							initialOpen={false}>
							<PGtabs
								activeTab="options"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
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
								<PGtab name="styles">
									<PGStyles
										obj={prefix}
										onChange={onChangeStylePrefix}
										onAdd={onAddStylePrefix}
										onRemove={onRemoveStylePrefix}
										onBulkAdd={onBulkAddPrefix}
										onReset={onResetPrefix}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={prefix}
										onChange={onPickCssLibraryPrefix}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Postfix"
							initialOpen={false}>
							<PGtabs
								activeTab="options"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
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
								<PGtab name="styles">
									<PGStyles
										obj={postfix}
										onChange={onChangeStylePostfix}
										onAdd={onAddStylePostfix}
										onRemove={onRemoveStylePostfix}
										onBulkAdd={onBulkAddPostfix}
										onReset={onResetPostfix}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={postfix}
										onChange={onPickCssLibraryPostfix}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Block Variations"
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={"woo-product-info"}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
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
						<div className="px-3">
							<PGTutorials slug="woo-product-info" />
						</div>
					</div>
				</InspectorControls>

				<CustomTagWrapper {...blockProps}>
					{items.elements.map((x, index) => {
						return (
							<CustomTagPostTitle className={"item item-" + index}>
								{icon.options.position == "beforePrefix" &&
									x.siteIcon.iconSrc.length != 0 && (
										<span className={`icon ${x.siteIcon.iconSrc}`}></span>
									)}
								{x.prefix.length > 0 && (
									<span className="prefix">{x.prefix}</span>
								)}
								{icon.options.position == "afterPrefix" &&
									x.siteIcon.iconSrc.length != 0 && (
										<span className={`icon ${x.siteIcon.iconSrc}`}></span>
									)}

								{productData != null && (
									<>
										{x.id == "text" && <span className="value">{x.value}</span>}
										{x.id == "weight" && (
											<span className="value">{productData.weight}kg</span>
										)}
										{x.id == "length" && (
											<span className="value">{productData.length}cm</span>
										)}
										{x.id == "width" && (
											<span className="value">{productData.width}cm</span>
										)}
										{x.id == "height" && (
											<span className="value">{productData.height}cm</span>
										)}
										{x.id == "dimensions" && (
											<span
												className="value"
												dangerouslySetInnerHTML={{
													__html: productData.dimensions,
												}}></span>
										)}

										{x.type == "taxonomy" && (
											<span
												className="value"
												dangerouslySetInnerHTML={{ __html: x.value }}></span>
										)}
									</>
								)}

								{icon.options.position == "beforePostfix" &&
									x.siteIcon.iconSrc.length != 0 && (
										<span className={`icon ${x.siteIcon.iconSrc}`}></span>
									)}

								{x.postfix.length > 0 && (
									<span className="postfix">{x.postfix}</span>
								)}
								{icon.options.position == "afterPostfix" &&
									x.siteIcon.iconSrc.length != 0 && (
										<span className={`icon ${x.siteIcon.iconSrc}`}></span>
									)}
							</CustomTagPostTitle>
						);
					})}
				</CustomTagWrapper>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
