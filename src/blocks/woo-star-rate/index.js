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
import { applyFilters } from "@wordpress/hooks";
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import apiFetch from "@wordpress/api-fetch";

import {
	PanelBody,
	RangeControl,
	Button,
	Panel,
	PanelRow,
	RadioControl,
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
} from "@wordpress/components";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";

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

import { Icon, styles, settings, link, linkOff } from "@wordpress/icons";

import IconToggle from "../../components/icon-toggle";
import Typography from "../../components/typography";
import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";
import BreakpointToggle from "../../components/breakpoint-toggle";
import colorsPresets from "../../colors-presets";
import PGDropdown from "../../components/dropdown";
import PGIconPicker from "../../components/icon-picker";
import PGcssDisplay from "../../components/css-display";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import PGCssLibrary from "../../components/css-library";

var myStore = wp.data.select("postgrid-shop");

registerBlockType("post-grid/woo-star-rate", {
	apiVersion: 2,
	title: "Star Rate",

	icon: {
		// Specifying a background color to appear with the icon e.g.: in the inserter.
		background: "#fff",
		// Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
		foreground: "#fff",
		// Specifying an icon for the block
		src: (
			<svg
				id="Layer_1"
				data-name="Layer 1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 36 36">
				<path
					fill="#1d4ed8"
					d="M17.37,30.28,8.34,35a1.35,1.35,0,0,1-2-1.42L8.11,23.54a1.36,1.36,0,0,0-.39-1.19L.41,15.22a1.34,1.34,0,0,1,.74-2.29l10.11-1.47a1.32,1.32,0,0,0,1-.74l4.52-9.15a1.35,1.35,0,0,1,2.42,0l4.52,9.15a1.32,1.32,0,0,0,1,.74l10.11,1.47a1.34,1.34,0,0,1,.74,2.29l-7.31,7.13a1.36,1.36,0,0,0-.39,1.19l1.73,10.07a1.35,1.35,0,0,1-2,1.42l-9-4.75A1.34,1.34,0,0,0,17.37,30.28Z"
				/>
			</svg>
		),
	},

	attributes: {
		wrapper: {
			type: "object",
			default: {
				options: { tag: "div", class: "" },
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
		},

		iconsWrap: {
			type: "object",
			default: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
					position: "beforeSku",
					/*before, after, prefix, postfix */ class: "",
				},

				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },

					display: {},

					fontSize: { Desktop: "" },
					lineHeight: {},
					fontWeight: { Desktop: "700" },
					textDecoration: {}, //overline, line-through, underline
				},
			},
		},

		iconsIdle: {
			type: "object",
			default: {
				options: { tag: "div", class: "" },
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
		},

		iconsFilled: {
			type: "object",
			default: {
				options: { tag: "div", class: "" },
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
		},
		summury: {
			type: "object",
			default: {
				options: {
					type: "",
					typeCustom: "",
					linkTo: "reviews",
					/*postUrl, reviews*/ class: "",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
		},

		prefix: {
			type: "object",
			default: {
				options: { text: "", class: "prefix" },
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
				},
			},
		},

		postfix: {
			type: "object",
			default: {
				options: { text: "", class: "postfix" },
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
				},
			},
		},

		customCss: {
			type: "string",
			default: "",
		},

		blockId: {
			type: "string",
			default: "",
		},
		blockCssY: {
			type: "object",
			default: { items: {} },
		},
	},
	usesContext: ["postId", "loopIndex", "postType", "queryId"],

	supports: {
		align: ["wide", "full"],
	},
	category: "post-grid-woo",

	edit: function (props) {
		var attributes = props.attributes;
		var setAttributes = props.setAttributes;
		var context = props.context;
		var clientId = props.clientId;

		var wrapper = attributes.wrapper;
		var blockId = attributes.blockId;

		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var iconsWrap = attributes.iconsWrap;
		var iconsIdle = attributes.iconsIdle;
		var iconsFilled = attributes.iconsFilled;
		var summury = attributes.summury;

		var prefix = attributes.prefix;
		var postfix = attributes.postfix;
		var customCss = attributes.customCss;
		var blockCssY = attributes.blockCssY;

		var postId = context["postId"];
		var postType = context["postType"];

		//const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
		var breakPointX = myStore.getBreakPoint();

		const [customTags, setCustomTags] = useState({});
		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);

		var str = "bat, ball, cat";

		var map = {
			"{rating_count}": "",
			"{review_count}": "",
			"{average_rating}": "",
			"{product_title}": "",
		};

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

		const [productData, setproductData] = useState(defaultProductData);
		const [loading, setloading] = useState(false);
		const [ratingMap, setratingMap] = useState(map);

		useEffect(() => {
			setloading(true);

			apiFetch({
				path: "/post-grid/v2/get_post_data",
				method: "POST",
				data: { postId: postId },
			}).then((res) => {
				console.log(res);
				if (res.manage_stock != undefined) {
					setproductData(res);
				}

				var map = {
					"{rating_count}": res.rating_count,
					"{review_count}": res.review_count,
					"{average_rating}": res.average_rating,
					"{product_title}": res.post_title,
				};

				setratingMap(map);

				setloading(false);
			});
		}, []);

		function onChangeIcon(arg) {
			var options = {
				...iconsWrap.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({ iconsWrap: { ...iconsWrap, options: options } });
		}

		function onPickCssLibraryWrapper(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				wrapper[sudoScource] = sudoScourceArgs;
			});

			var wrapperX = Object.assign({}, wrapper);
			setAttributes({ wrapper: wrapperX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					wrapperSelector
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

		function onPickCssLibraryiconsWrap(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				iconsWrap[sudoScource] = sudoScourceArgs;
			});

			var iconX = Object.assign({}, iconsWrap);
			setAttributes({ iconsWrap: iconX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					iconsWrapSelector
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

		function onChangeStyleIconsWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, iconsWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ iconsWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconsWrapSelector
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

		function onRemoveStyleIconsWrap(sudoScource, key) {
			var object = myStore.deletePropertyDeep(iconsWrap, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ iconsWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconsWrapSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleIconsWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, iconsWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ iconsWrap: object });
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

		function onChangeStylePostfix(sudoScource, newVal, attr) {
			var path = sudoScource + "." + attr + "." + breakPointX;
			let obj = Object.assign({}, postfix);
			const updatedObj = myStore.setPropertyDeep(obj, path, newVal);
			setAttributes({ postfix: updatedObj });
			var sudoScourceX = { ...updatedObj[sudoScource] };

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				postfixSelector
			);

			sudoScourceX[attr][breakPointX] = newVal;

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			Object.entries(sudoScourceX).map((args) => {
				var argAttr = myStore.cssAttrParse(args[0]);
				var argAttrVal = args[1];
				blockCssY.items[elementSelector][argAttr] = argAttrVal;
			});

			setAttributes({ blockCssY: { items: blockCssY.items } });
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

		//

		function onChangeStyleIconsIdle(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, iconsIdle);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ iconsIdle: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconsIdleSelector
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

		function onRemoveStyleIconsIdle(sudoScource, key) {
			var object = myStore.deletePropertyDeep(iconsIdle, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ iconsIdle: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconsIdleSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleIconsIdle(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, iconsIdle);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ iconsIdle: object });
		}

		/////
		function onChangeStyleIconsFilled(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, iconsFilled);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ iconsFilled: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconsFilledSelector
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

		function onRemoveStyleIconsFilled(sudoScource, key) {
			var object = myStore.deletePropertyDeep(iconsFilled, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ iconsFilled: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconsFilledSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleIconsFilled(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, iconsFilled);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ iconsFilled: object });
		}

		/////
		function onChangeStyleSummury(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, summury);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ summury: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				summurySelector
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

		function onRemoveStyleSummury(sudoScource, key) {
			var object = myStore.deletePropertyDeep(summury, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ summury: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				summurySelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleSummury(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, summury);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ summury: object });
		}

		String.prototype.strtr = function (dic) {
			const str = this.toString(),
				makeToken = (inx) => `{{###~${inx}~###}}`,
				tokens = Object.keys(dic).map((key, inx) => ({
					key,
					val: dic[key],
					token: makeToken(inx),
				})),
				tokenizedStr = tokens.reduce(
					(carry, entry) =>
						carry.replace(new RegExp(entry.key, "g"), entry.token),
					str
				);

			return tokens.reduce(
				(carry, entry) =>
					carry.replace(new RegExp(entry.token, "g"), entry.val),
				tokenizedStr
			);
		};

		const [iconHtml, setIconHtml] = useState("");

		useEffect(() => {
			var iconSrc = iconsWrap.options.iconSrc;

			var iconHtml = `<span class="${iconSrc}"></span>`;

			setIconHtml(iconHtml);
		}, [iconsWrap]);

		const [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);

		useEffect(() => {
			setAttributes({ blockId: blockIdX });

			myStore.generateBlockCss(blockCssY.items, blockId, customCss);

			customTags["currentYear"] = "2022";
			customTags["currentMonth"] = "07";
			customTags["currentDay"] = "27";
			customTags["currentDate"] = "27";
			customTags["currentTime"] = "27";

			customTags["postPublishDate"] = "123";
			customTags["postModifiedDate"] = "123";

			customTags["termId"] = "";
			customTags["termTitle"] = "";
			customTags["termDescription"] = "";
			customTags["termPostCount"] = "";

			customTags["postTagTitle"] = "First Tag Title";
			customTags["postTagsTitle"] = "First Tag Title";

			customTags["postCategoryTitle"] = "First Category Title";
			customTags["postCategoriesTitle"] = "First Categories Title";

			customTags["postTermTitle"] = "First Term Title";
			customTags["postTermsTitle"] = "List of all terms title";

			customTags["postId"] = "123";
			customTags["postStatus"] = "123";

			customTags["authorId"] = "123";
			customTags["authorName"] = "Nur Hasan";
			customTags["authorFirstName"] = "Nur";
			customTags["authorLastName"] = "Hasan";
			customTags["authorDescription"] = "Hasan";

			customTags["excerpt"] = "Here is the post excerpt";

			customTags["rankmathTitle"] = "Hasan";
			customTags["rankmathPermalink"] = "Hasan";
			customTags["rankmathExcerpt"] = "Hasan";
			customTags["rankmathFocusKeyword"] = "Hasan";
			customTags["rankmathFocusKeywords"] = "Hasan";

			customTags["rankmathOrgname"] = "Hasan";
			customTags["rankmathOrgurl"] = "Hasan";
			customTags["rankmathOrglogo"] = "Hasan";

			customTags["siteTitle"] = "";
			customTags["siteDescription"] = "";
			customTags["siteTagline"] = "";

			customTags["postMeta"] = "";

			customTags["separator"] = "";
			customTags["searchTerms"] = "";

			customTags["counter"] = "1";
		}, [clientId]);

		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;

		const prefixSelector = blockClass + " .prefix";
		const postfixSelector = blockClass + " .postfix";
		const iconsWrapSelector = blockClass + " .icons-wrap";
		const iconsFilledSelector = blockClass + " .icons-filled";
		const iconsIdleSelector = blockClass + " .icons-idle";
		const summurySelector = blockClass + " .summury";

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

		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId, customCss);
		}, [blockCssY]);

		useEffect(() => {
			setAttributes({ customCss: customCss });

			myStore.generateBlockCss(blockCssY.items, blockId, customCss);
		}, [customCss]);

		function replaceAll(str, correction) {
			Object.keys(correction).forEach((key) => {
				str = str.replaceAll(key, correction[key]);
			});

			return str;
		}

		const blockProps = useBlockProps({
			className: ` ${blockId} pg-woo-star-rate`,
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
											value={wrapper.options.tag}
											options={[
												{ label: "Choose", value: "" },
												{ label: "H1", value: "h1" },
												{ label: "H2", value: "h2" },
												{ label: "H3", value: "h3" },
												{ label: "H4", value: "h4" },
												{ label: "H5", value: "h5" },
												{ label: "H6", value: "h6" },
												{ label: "Span", value: "span" },
												{ label: "DIV", value: "div" },
												{ label: "P", value: "p" },
											]}
											onChange={(newVal) => {
												var options = { ...wrapper.options, tag: newVal };
												setAttributes({
													wrapper: { styles: wrapper.styles, options: options },
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
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={wrapper}
										onChange={onPickCssLibraryWrapper}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody title="Icons" initialOpen={false}>
							<PanelBody title="Icons Wrap" initialOpen={false}>
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
												library={iconsWrap.options.library}
												srcType={iconsWrap.options.srcType}
												iconSrc={iconsWrap.options.iconSrc}
												onChange={onChangeIcon}
											/>
										</PanelRow>
									</PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={iconsWrap}
											onChange={onChangeStyleIconsWrap}
											onAdd={onAddStyleIconsWrap}
											onRemove={onRemoveStyleIconsWrap}
										/>
									</PGtab>
									<PGtab name="css">
										<PGCssLibrary
											blockId={blockId}
											obj={iconsWrap}
											onChange={onPickCssLibraryiconsWrap}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>

							<PanelBody title="Icons Idle" initialOpen={false}>
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
											obj={iconsIdle}
											onChange={onChangeStyleIconsIdle}
											onAdd={onAddStyleIconsIdle}
											onRemove={onRemoveStyleIconsIdle}
										/>
									</PGtab>
									<PGtab name="css"></PGtab>
								</PGtabs>
							</PanelBody>

							<PanelBody title="Icons Filled" initialOpen={false}>
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
											obj={iconsFilled}
											onChange={onChangeStyleIconsFilled}
											onAdd={onAddStyleIconsFilled}
											onRemove={onRemoveStyleIconsFilled}
										/>
									</PGtab>
									<PGtab name="css"></PGtab>
								</PGtabs>
							</PanelBody>
						</PanelBody>

						<PanelBody title="Summury" initialOpen={false}>
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
									<RadioControl
										label="Summury Type"
										selected={summury.options.type}
										options={[
											{ label: "None", value: "" },
											{
												label: "123 customer reviews",
												value: "{review_count} customer reviews",
											},
											{ label: "4.50/5.00", value: "{average_rating}/5.00" },
											{
												label: "4.50 out of 5.00",
												value: "{average_rating} out of 5.00",
											},
											{
												label: "4.50(123 reviews)",
												value: "{average_rating}({review_count} reviews)",
											},
										]}
										onChange={(value) => {
											var options = { ...summury.options, type: value };
											setAttributes({
												summury: { ...summury, options: options },
											});
										}}
									/>

									<div className="my-3">
										<label for="">Custom Summury </label>

										<InputControl
											value={summury.options.typeCustom}
											placeholder="{average_rating} out of 5.00"
											onChange={(newVal) => {
												var options = {
													...summury.options,
													typeCustom: newVal,
												};
												setAttributes({
													summury: { ...summury, options: options },
												});
											}}
										/>
									</div>

									<p>Please use following tags:</p>

									<ul>
										<li>
											<code>{"{rating_count}"}</code>
										</li>
										<li>
											<code>{"{review_count}"}</code>
										</li>
										<li>
											<code>{"{average_rating}"}</code>
										</li>
										<li>
											<code>{"{product_title}"}</code>
										</li>
									</ul>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={summury}
										onChange={onChangeStyleSummury}
										onAdd={onAddStyleSummury}
										onRemove={onRemoveStyleSummury}
									/>
								</PGtab>
								<PGtab name="css"></PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody title="Prefix" initialOpen={false}>
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
										<label for="">Prefix</label>

										<InputControl
											value={prefix.options.text}
											onChange={(newVal) => {
												var options = { ...prefix.options, text: newVal };
												setAttributes({
													prefix: { styles: prefix.styles, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={prefix}
										onChange={onChangeStylePrefix}
										onAdd={onAddStylePrefix}
										onRemove={onRemoveStylePrefix}
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

						<PanelBody title="Postfix" initialOpen={false}>
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
										<label for="">Postfix</label>

										<InputControl
											value={postfix.options.text}
											onChange={(newVal) => {
												var options = { ...postfix.options, text: newVal };
												setAttributes({
													postfix: { ...postfix, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={postfix}
										onChange={onChangeStylePostfix}
										onAdd={onAddStylePostfix}
										onRemove={onRemoveStylePostfix}
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

						<PanelBody title="Custom Style" initialOpen={false}>
							<p>
								Please use following class selector to apply your custom CSS
							</p>
							<div className="my-3">
								<p className="font-bold">Title Wrapper</p>
								<p>
									<code>
										{wrapperSelector}
										{"{/* your CSS here*/}"}
									</code>
								</p>
							</div>

							<div className="my-3">
								<p className="font-bold">Prefix</p>
								<p>
									<code>
										{prefixSelector}
										{"{/* your CSS here*/}"}{" "}
									</code>
								</p>
							</div>

							<div className="my-3">
								<p className="font-bold">Postfix</p>
								<p>
									<code>
										{postfixSelector}
										{"{/* your CSS here*/}"}{" "}
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

						<PGMailSubsctibe />
						<PGContactSupport
							utm={{
								utm_source: "BlockPostTitle",
								utm_campaign: "PostGridCombo",
								utm_content: "BlockOptions",
							}}
						/>
					</div>
				</InspectorControls>

				<>
					<div {...blockProps}>
						{prefix.options.text && (
							<span className={prefix.options.class}>
								{prefix.options.text}
							</span>
						)}

						<div class="icons-wrap">
							<div class="icons-idle">
								<span
									className={iconsWrap.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
								<span
									className={iconsWrap.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
								<span
									className={iconsWrap.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
								<span
									className={iconsWrap.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
								<span
									className={iconsWrap.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							</div>
							<div class="icons-filled">
								<span
									className={iconsWrap.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
								<span
									className={iconsWrap.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
								<span
									className={iconsWrap.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
								<span
									className={iconsWrap.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
								<span
									className={iconsWrap.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							</div>
						</div>

						<div class="summury">
							{summury.options.typeCustom.length == 0 && (
								<>{replaceAll(summury.options.type, ratingMap)}</>
							)}
							{summury.options.typeCustom.length > 0 && (
								<>{replaceAll(summury.options.typeCustom, ratingMap)}</>
							)}
						</div>

						{postfix.options.text && (
							<span className={postfix.options.class}>
								{postfix.options.text}
							</span>
						)}
					</div>
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
