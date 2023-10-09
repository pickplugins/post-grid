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

registerBlockType("post-grid/woo-total-sales", {
	apiVersion: 2,
	title: "Total Sales",

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
					d="M34.8,16.32H32.62L20.63,7a2.5,2.5,0,0,0,.22-2.16A3,3,0,0,0,17.1,3,2.83,2.83,0,0,0,15,5.7,2.6,2.6,0,0,0,15.34,7L2.79,16.32H1.2A1.18,1.18,0,0,0,0,17.44V32A1.17,1.17,0,0,0,1.2,33.1H34.8A1.17,1.17,0,0,0,36,32V17.44A1.18,1.18,0,0,0,34.8,16.32ZM18,4A1.75,1.75,0,0,1,19.8,5.7a1.8,1.8,0,0,1-3.6,0A1.76,1.76,0,0,1,18,4ZM16.09,7.84a3.11,3.11,0,0,0,3.77,0l10.88,8.44h-26Z"
				/>
				<path
					fill="#fff"
					d="M8.37,21.25v9.4h-2V23.14h0L4.18,24.49V22.73L6.5,21.25Z"
				/>
				<path
					fill="#fff"
					d="M13.6,30.65V29.22L17,26.12c.28-.27.52-.52.71-.74a3.05,3.05,0,0,0,.45-.65,1.58,1.58,0,0,0,.15-.69,1.38,1.38,0,0,0-.19-.72,1.29,1.29,0,0,0-.52-.46,1.57,1.57,0,0,0-.73-.16,1.67,1.67,0,0,0-.76.17,1.24,1.24,0,0,0-.49.5,1.61,1.61,0,0,0-.18.78H13.51a3,3,0,0,1,.42-1.6A2.6,2.6,0,0,1,15.1,21.5a3.83,3.83,0,0,1,1.73-.38,4,4,0,0,1,1.76.36,2.83,2.83,0,0,1,1.17,1,2.53,2.53,0,0,1,.41,1.44A2.81,2.81,0,0,1,20,25a4.42,4.42,0,0,1-.75,1.14,16,16,0,0,1-1.5,1.52L16.35,29V29H20.3v1.63Z"
				/>
				<path
					fill="#fff"
					d="M28.21,30.78a4.39,4.39,0,0,1-1.83-.36,3,3,0,0,1-1.26-1A2.45,2.45,0,0,1,24.64,28h2a1.11,1.11,0,0,0,.23.61,1.39,1.39,0,0,0,.56.4,2.13,2.13,0,0,0,.78.14A1.84,1.84,0,0,0,29,29a1.3,1.3,0,0,0,.55-.45,1.17,1.17,0,0,0,0-1.32,1.42,1.42,0,0,0-.6-.46,2.33,2.33,0,0,0-.92-.16h-.87V25.13H28a1.84,1.84,0,0,0,.8-.16,1.22,1.22,0,0,0,.54-.43,1.11,1.11,0,0,0,.19-.65,1.18,1.18,0,0,0-.17-.62,1.07,1.07,0,0,0-.47-.42,1.52,1.52,0,0,0-.69-.15,2,2,0,0,0-.74.14,1.34,1.34,0,0,0-.54.41,1.14,1.14,0,0,0-.22.63h-1.9a2.44,2.44,0,0,1,.46-1.43,3,3,0,0,1,1.22-1,4,4,0,0,1,1.72-.36,3.84,3.84,0,0,1,1.71.36,2.79,2.79,0,0,1,1.13.95,2.27,2.27,0,0,1,.4,1.34A1.8,1.8,0,0,1,31,25.09a2.24,2.24,0,0,1-1.28.67v.07a2.52,2.52,0,0,1,1.58.72A2,2,0,0,1,31.82,28a2.27,2.27,0,0,1-.46,1.43,3.2,3.2,0,0,1-1.28,1A4.62,4.62,0,0,1,28.21,30.78Z"
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

		saleCount: {
			type: "object",
			default: {
				options: {
					tag: "div",
					text: "12",

					linkTo: "", // postUrl, customField, authorUrl, authorLink, homeUrl, custom
					linkToUrl: "",
					linkToMetaKey: "",

					linkTarget: "_blank",
					linkAttr: [],
					customUrl: "",
					class: "",
				},

				styles: {
					display: {},
					width: {},
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },

					fontSize: { Desktop: "" },
					lineHeight: {},
					letterSpacing: {},
					fontFamily: {},
					fontWeight: {},
					textDecoration: {}, //overline, line-through, underline
					textTransform: {},
				},
			},
		},
		icon: {
			type: "object",
			default: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
					position: "beforeSaleCount",
					/*before, after, prefix, postfix */ class: "saleCount-icon",
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

		prefix: {
			type: "object",
			default: {
				options: { text: "Total Sale: ", class: "prefix" },
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

		let saleCount = attributes.saleCount;
		var wrapper = attributes.wrapper;
		var blockId = attributes.blockId;

		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var icon = attributes.icon;

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

		var linkToArgsBasic = {
			postUrl: { label: "Post URL", value: "postUrl" },
			homeUrl: { label: "Home URL", value: "homeUrl" },
			archiveDate: { label: "Date Archive", value: "archiveDate" },
			archiveYear: { label: "Year Archive", value: "archiveYear" },
			archiveMonth: { label: "Month Archive", value: "archiveMonth" },

			authorUrl: { label: "Author URL", value: "authorUrl" },
			authorLink: { label: "Author Link", value: "authorLink" },
			authorMail: { label: "Author Mail", value: "authorMail", isPro: true },
			authorMeta: { label: "Author Meta", value: "authorMeta", isPro: true },
			customField: { label: "Custom Field", value: "customField", isPro: true },
			customUrl: { label: "Custom URL", value: "customUrl", isPro: true },
		};

		let linkToArgs = applyFilters("linkToArgs", linkToArgsBasic);

		// const [
		//   currentPostSKU,
		//   setcurrentPostSKU,
		// ] = useEntityProp('postType', postType, 'date', postId);

		//const [postSaleCountEdited, setpostSaleCountEdited] = useState(currentPostSKU == null ? );
		const [postSaleCountEdited, setpostSaleCountEdited] = useState(
			saleCount.options.text
		);

		// useEffect(() => {

		//   var postTypeX = postType;

		//   if (postType == 'post') {
		//     var postTypeX = 'posts';
		//   }
		//   if (postType == 'page') {
		//     var postTypeX = 'pages';
		//   }

		//   apiFetch({
		//     path: '/wp/v2/' + postTypeX + '/' + postId,
		//     method: 'POST',

		//   }).then((res) => {

		//     console.log(res);

		//   });

		// }, []);
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

				setloading(false);
			});
		}, []);

		function onChangeIcon(arg) {
			var options = {
				...icon.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({ icon: { ...icon, options: options } });
		}

		function setFieldLinkTo(option, index) {
			var options = { ...saleCount.options, linkTo: option.value };
			setAttributes({ saleCount: { ...saleCount, options: options } });
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

		function onPickCssLibrarySaleCount(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				saleCount[sudoScource] = sudoScourceArgs;
			});

			var saleCountX = Object.assign({}, saleCount);
			setAttributes({ saleCount: saleCountX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					saleCountSelector
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
					iconSelector
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

		function onChangeStyleSaleCount(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, saleCount);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ saleCount: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				saleCountSelector
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

		function onRemoveStyleSaleCount(sudoScource, key) {
			var object = myStore.deletePropertyDeep(saleCount, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ saleCount: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				saleCountSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleSaleCount(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, saleCount);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ saleCount: object });
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
			var iconSrc = icon.options.iconSrc;

			var iconHtml = `<span class="${iconSrc}"></span>`;

			setIconHtml(iconHtml);
		}, [icon]);

		const [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);

		useEffect(() => {
			setAttributes({ blockId: blockIdX });

			// setAttributes({ saleCount: saleCount });
			// setAttributes({ wrapper: wrapper });

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

		var saleCountSelector = blockClass + " .saleCount-text";
		const iconSelector = blockClass + " .saleCount-icon";

		const prefixSelector = blockClass + " .prefix";
		const postfixSelector = blockClass + " .postfix";

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

		useEffect(() => {
			linkAttrObj();
		}, [saleCount]);

		var linkAttrObj = () => {
			var sdsd = {};

			saleCount.options.linkAttr.map((x) => {
				if (x.val) sdsd[x.id] = x.val;
			});

			setlinkAttrItems(sdsd);
		};

		var postUrl =
			saleCount.options.customUrl != undefined &&
			saleCount.options.customUrl.length > 0
				? saleCount.options.customUrl
				: currentPostUrl;

		const CustomTag = `${wrapper.options.tag}`;
		const CustomTagPostTitle = `${saleCount.options.tag}`;

		const blockProps = useBlockProps({
			className: ` ${blockId} pg-woo-saleCount`,
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

						<PanelBody title="saleCount" initialOpen={false}>
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
										<label for="">Link To</label>

										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={linkToArgs}
											buttonTitle={
												saleCount.options.linkTo.length == 0
													? "Choose"
													: linkToArgs[saleCount.options.linkTo].label
											}
											onChange={setFieldLinkTo}
											values={[]}></PGDropdown>
									</PanelRow>

									{(saleCount.options.linkTo == "authorMeta" ||
										saleCount.options.linkTo == "customField") && (
										<PanelRow>
											<label for="">
												{saleCount.options.linkTo == "authorMeta" && (
													<>Author Meta Key</>
												)}

												{saleCount.options.linkTo == "customField" && (
													<>Custom Field Key</>
												)}
											</label>
											<InputControl
												className="mr-2"
												value={saleCount.options.linkToMetaKey}
												onChange={(newVal) => {
													var options = {
														...saleCount.options,
														linkToMetaKey: newVal,
													};
													setAttributes({
														saleCount: { ...saleCount, options: options },
													});
												}}
											/>
										</PanelRow>
									)}

									{saleCount.options.linkTo == "customUrl" && (
										<PanelRow>
											<label for="">Custom URL</label>

											<div className="relative">
												<Button
													className={linkPickerPosttitle ? "!bg-gray-400" : ""}
													icon={link}
													onClick={(ev) => {
														setLinkPickerPosttitle((prev) => !prev);
													}}></Button>
												{saleCount.options.customUrl.length > 0 && (
													<Button
														className="!text-red-500 ml-2"
														icon={linkOff}
														onClick={(ev) => {
															var options = {
																...saleCount.options,
																customUrl: "",
															};
															setAttributes({
																saleCount: { ...saleCount, options: options },
															});
															setLinkPickerPosttitle(false);
														}}></Button>
												)}
												{linkPickerPosttitle && (
													<Popover position="bottom right">
														<LinkControl
															settings={[]}
															value={saleCount.options.customUrl}
															onChange={(newVal) => {
																var options = {
																	...saleCount.options,
																	customUrl: newVal.url,
																};

																setAttributes({
																	saleCount: { ...saleCount, options: options },
																});
															}}
														/>

														<div className="p-2">
															<span className="font-bold">Linked to:</span>{" "}
															{saleCount.options.customUrl.length != 0
																? saleCount.options.customUrl
																: "No link"}{" "}
														</div>
													</Popover>
												)}
											</div>
										</PanelRow>
									)}

									{saleCount.options.linkTo.length == 0 && (
										<PanelRow>
											<label for="">Custom Tag</label>
											<SelectControl
												label=""
												value={saleCount.options.tag}
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
													var options = { ...saleCount.options, tag: newVal };
													setAttributes({
														saleCount: { ...saleCount, options: options },
													});
												}}
											/>
										</PanelRow>
									)}

									{saleCount.options.linkTo.length > 0 && (
										<div>
											<PanelRow>
												<label for="">Link Target</label>

												<SelectControl
													label=""
													value={saleCount.options.linkTarget}
													options={[
														{ label: "Choose...", value: "" },

														{ label: "_self", value: "_self" },
														{ label: "_blank", value: "_blank" },
														{ label: "_parent", value: "_parent" },
														{ label: "_top", value: "_top" },
													]}
													onChange={(newVal) => {
														var options = {
															...saleCount.options,
															linkTarget: newVal,
														};
														setAttributes({
															saleCount: { ...saleCount, options: options },
														});
													}}
												/>
											</PanelRow>

											<PanelRow>
												<label for="">Custom Attributes</label>
												<div
													className=" cursor-pointer px-3 text-white py-1 bg-blue-600"
													onClick={(ev) => {
														var sdsd = saleCount.options.linkAttr.concat({
															id: "",
															val: "",
														});

														var options = {
															...saleCount.options,
															linkAttr: sdsd,
														};
														setAttributes({
															saleCount: { ...saleCount, options: options },
														});

														linkAttrObj();
													}}>
													Add
												</div>
											</PanelRow>

											{saleCount.options.linkAttr.map((x, i) => {
												return (
													<div className="my-2">
														<PanelRow>
															<InputControl
																placeholder="Name"
																className="mr-2"
																value={saleCount.options.linkAttr[i].id}
																onChange={(newVal) => {
																	saleCount.options.linkAttr[i].id = newVal;

																	var ssdsd = saleCount.options.linkAttr.concat(
																		[]
																	);

																	var options = {
																		...saleCount.options,
																		linkAttr: ssdsd,
																	};
																	setAttributes({
																		saleCount: {
																			...saleCount,
																			options: options,
																		},
																	});
																}}
															/>

															<InputControl
																className="mr-2"
																placeholder="Value"
																value={x.val}
																onChange={(newVal) => {
																	saleCount.options.linkAttr[i].val = newVal;
																	var ssdsd = saleCount.options.linkAttr.concat(
																		[]
																	);

																	var options = {
																		...saleCount.options,
																		linkAttr: ssdsd,
																	};
																	setAttributes({
																		saleCount: {
																			...saleCount,
																			options: options,
																		},
																	});
																}}
															/>
															<span
																className="text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close"
																onClick={(ev) => {
																	saleCount.options.linkAttr.splice(i, 1);

																	var ssdsd = saleCount.options.linkAttr.concat(
																		[]
																	);

																	var options = {
																		...saleCount.options,
																		linkAttr: ssdsd,
																	};
																	setAttributes({
																		saleCount: {
																			...saleCount,
																			options: options,
																		},
																	});
																}}></span>
														</PanelRow>
													</div>
												);
											})}
										</div>
									)}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={saleCount}
										onChange={onChangeStyleSaleCount}
										onAdd={onAddStyleSaleCount}
										onRemove={onRemoveStyleSaleCount}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={saleCount}
										onChange={onPickCssLibrarySaleCount}
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
											library={icon.options.library}
											srcType={icon.options.srcType}
											iconSrc={icon.options.iconSrc}
											onChange={onChangeIcon}
										/>
									</PanelRow>

									<PanelRow>
										<label for="">Icon position</label>

										<SelectControl
											label=""
											value={icon.options.position}
											options={[
												{ label: "Choose Position", value: "" },

												{ label: "Before saleCount", value: "beforeSaleCount" },
												{ label: "After saleCount", value: "afterSaleCount" },
												{ label: "Before Prefix", value: "beforePrefix" },
												{ label: "After Prefix", value: "afterPrefix" },
												{ label: "Before Postfix", value: "beforePostfix" },
												{ label: "After Postfix", value: "afterPostfix" },
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
								<p className="font-bold">Title link</p>
								<p>
									<code>
										{saleCountSelector}
										{"{/* your CSS here*/}"}{" "}
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
					{wrapper.options.tag && (
						<CustomTag {...blockProps}>
							{icon.options.position == "beforePrefix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}

							{prefix.options.text && (
								<span className={prefix.options.class}>
									{prefix.options.text}
								</span>
							)}

							{icon.options.position == "afterPrefix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}

							{saleCount.options.linkTo.length > 0 && (
								<a
									className="saleCount"
									onClick={handleLinkClick}
									{...linkAttrItems}
									target={saleCount.options.linkTarget}
									href={postUrl}>
									{icon.options.position == "beforeSaleCount" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									<span className="saleCount-text">{postSaleCountEdited}</span>
									{icon.options.position == "afterSaleCount" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
								</a>
							)}

							{saleCount.options.linkTo.length == 0 && (
								<>
									{icon.options.position == "beforeSaleCount" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}

									<span className="saleCount-text">
										{productData.total_sales}
									</span>

									{icon.options.position == "afterSaleCount" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
								</>
							)}

							{icon.options.position == "beforePostfix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}

							{postfix.options.text && (
								<span className={postfix.options.class}>
									{postfix.options.text}
								</span>
							)}
							{icon.options.position == "afterPostfix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}
						</CustomTag>
					)}

					{wrapper.options.tag.length == 0 && (
						<>
							{saleCount.options.linkTo.length > 0 && (
								<a
									{...blockProps}
									onClick={handleLinkClick}
									{...linkAttrItems}
									target={saleCount.options.linkTarget}
									href={postUrl}>
									{icon.options.position == "beforePostfix" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{prefix.options.text && (
										<span className={prefix.options.class}>
											{prefix.options.text}
										</span>
									)}

									{icon.options.position == "beforePostfix" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}

									{icon.options.position == "beforeSaleCount" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}

									<span className="saleCount-text">
										{productData.total_sales}
									</span>

									{icon.options.position == "afterSaleCount" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
								</a>
							)}

							{saleCount.options.linkTo.length == 0 && (
								<div {...blockProps}>
									{icon.options.position == "beforeSaleCount" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									<span className="saleCount-text">{postSaleCountEdited}</span>
									{icon.options.position == "afterSaleCount" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
								</div>
							)}
						</>
					)}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
