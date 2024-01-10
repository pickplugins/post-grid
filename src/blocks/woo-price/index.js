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
	Spinner,
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

import {
	Icon,
	styles,
	settings,
	link,
	linkOff,
	brush,
	mediaAndText,
} from "@wordpress/icons";

import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";
import PGDropdown from "../../components/dropdown";
import PGIconPicker from "../../components/icon-picker";
import PGLibraryBlockVariations from "../../components/library-block-variations";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import PGCssLibrary from "../../components/css-library";
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
				height="161"
				viewBox="0 0 160 161"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M85.6845 55.978C85.6845 66.8453 85.6845 77.3782 85.6845 88.2455C72.7273 93.094 59.6866 97.9425 46.395 102.958C46.395 92.0908 46.395 81.4744 46.395 70.6071C59.3522 65.7586 72.4765 60.9101 85.6845 55.978Z"
					fill="url(#paint0_linear_61_947)"
				/>
				<path
					d="M42.466 70.5235C42.466 81.3908 42.466 91.9237 42.466 102.875C29.2581 97.9425 16.301 93.094 3.26025 88.2455C3.26025 77.4618 3.26025 66.9289 3.26025 55.978C16.4682 60.9101 29.5089 65.675 42.466 70.5235Z"
					fill="url(#paint1_linear_61_947)"
				/>
				<path
					d="M85.4334 37.8381C71.4731 43.0209 58.098 48.0366 44.4721 53.1358C31.0969 48.2037 17.6382 43.1045 3.51074 37.9216C12.4554 34.5779 20.7312 31.4848 29.0907 28.3918C33.6048 26.72 38.1189 25.1317 42.633 23.3762C43.887 22.8746 44.9736 22.8746 46.2275 23.3762C59.1011 28.1411 72.0583 32.8224 85.4334 37.8381Z"
					fill="url(#paint2_linear_61_947)"
				/>
				<path
					d="M88.9446 40.5967C88.9446 44.0241 88.9446 47.2006 88.9446 50.628C74.9007 55.8109 60.8568 61.0774 46.4785 66.4274C46.4785 63 46.4785 59.907 46.4785 56.3961C60.4388 51.2132 74.6499 45.9467 88.9446 40.5967Z"
					fill="url(#paint3_linear_61_947)"
				/>
				<path
					d="M42.466 66.4274C28.0877 61.0774 14.0439 55.8109 0 50.628C0 47.2842 0 44.1077 0 40.5967C14.2947 45.9467 28.4221 51.1296 42.466 56.3961C42.466 59.7399 42.466 62.9164 42.466 66.4274Z"
					fill="url(#paint4_linear_61_947)"
				/>
				<path
					d="M160 112.488H0V129.625H160V112.488Z"
					fill="url(#paint5_linear_61_947)"
				/>
				<path
					d="M160 143.334H0V160.471H160V143.334Z"
					fill="url(#paint6_linear_61_947)"
				/>
				<path
					d="M120.39 73.7151V70.6221L127.634 63.907C128.244 63.2965 128.773 62.7675 129.18 62.2791C129.587 61.7907 129.913 61.343 130.157 60.8547C130.361 60.407 130.483 59.8779 130.483 59.3488C130.483 58.7384 130.361 58.25 130.076 57.8023C129.791 57.3547 129.425 57.0291 128.977 56.7849C128.489 56.5407 127.959 56.4186 127.39 56.4186C126.779 56.4186 126.209 56.5407 125.762 56.7849C125.314 57.0291 124.948 57.3954 124.704 57.8837C124.459 58.3721 124.337 58.9012 124.337 59.5523H120.268C120.268 58.2093 120.552 57.0698 121.163 56.093C121.773 55.1163 122.628 54.343 123.686 53.814C124.785 53.2849 126.006 53 127.43 53C128.896 53 130.157 53.2442 131.256 53.7733C132.355 54.3023 133.169 54.9942 133.779 55.8895C134.39 56.7849 134.675 57.843 134.675 59.0233C134.675 59.7965 134.512 60.5291 134.227 61.3023C133.942 62.0349 133.372 62.8895 132.64 63.7849C131.866 64.6802 130.808 65.7791 129.384 67.0407L126.413 69.9302V70.0523H134.959V73.5523H120.39V73.7151Z"
					fill="#C15940"
				/>
				<path
					d="M146.692 74C145.227 74 143.884 73.7558 142.744 73.2267C141.605 72.6976 140.669 72.0058 140.017 71.1104C139.366 70.2151 139 69.157 139 67.9767H143.314C143.355 68.4651 143.517 68.9128 143.802 69.279C144.087 69.6453 144.494 69.9302 145.023 70.1337C145.512 70.3372 146.081 70.4593 146.733 70.4593C147.384 70.4593 147.954 70.3372 148.483 70.093C148.971 69.8488 149.378 69.5232 149.663 69.1162C149.948 68.7093 150.07 68.2209 150.07 67.6918C150.07 67.1627 149.907 66.6744 149.622 66.2674C149.337 65.8604 148.89 65.5348 148.32 65.2906C147.75 65.0465 147.099 64.9244 146.326 64.9244H144.413V61.75H146.326C146.977 61.75 147.546 61.6278 148.035 61.4244C148.523 61.2209 148.93 60.8953 149.215 60.4883C149.5 60.0814 149.622 59.6337 149.622 59.1046C149.622 58.5755 149.5 58.1278 149.256 57.7616C149.012 57.3953 148.686 57.0697 148.238 56.8662C147.791 56.6627 147.302 56.5406 146.733 56.5406C146.163 56.5406 145.634 56.6627 145.145 56.8662C144.657 57.0697 144.291 57.3546 143.965 57.7616C143.68 58.1278 143.517 58.6162 143.517 59.1046H139.407C139.407 57.9244 139.773 56.9069 140.424 56.0116C141.076 55.1162 141.93 54.4244 143.07 53.8953C144.169 53.4069 145.43 53.1221 146.814 53.1221C148.198 53.1221 149.459 53.3662 150.477 53.8953C151.535 54.4244 152.349 55.0756 152.919 55.9709C153.488 56.8256 153.773 57.8023 153.773 58.8604C153.773 60 153.448 60.936 152.715 61.7093C152.023 62.4825 151.087 62.9709 149.948 63.1744V63.3372C151.454 63.5407 152.593 64.029 153.366 64.8837C154.14 65.7383 154.547 66.7965 154.547 68.0581C154.547 69.1976 154.221 70.2558 153.529 71.1511C152.878 72.0465 151.942 72.7791 150.762 73.2674C149.581 73.7558 148.238 74 146.692 74Z"
					fill="#C15940"
				/>
				<path
					d="M107.328 77V51H108.948V77H107.328ZM111.625 59.582C111.546 58.7628 111.207 58.1263 110.607 57.6727C110.008 57.219 109.195 56.9922 108.168 56.9922C107.47 56.9922 106.881 57.0938 106.4 57.2969C105.919 57.4932 105.551 57.7674 105.294 58.1195C105.044 58.4716 104.919 58.8711 104.919 59.318C104.905 59.6904 104.981 60.0154 105.146 60.293C105.317 60.5706 105.551 60.8109 105.847 61.0141C106.143 61.2104 106.486 61.3831 106.874 61.532C107.263 61.6742 107.677 61.7961 108.119 61.8977L109.936 62.3445C110.818 62.5477 111.628 62.8185 112.365 63.157C113.103 63.4956 113.742 63.912 114.281 64.4063C114.821 64.9005 115.24 65.4828 115.536 66.1531C115.839 66.8234 115.993 67.5919 116 68.4586C115.993 69.7315 115.677 70.8352 115.052 71.7695C114.433 72.6971 113.537 73.4182 112.365 73.9328C111.2 74.4406 109.794 74.6945 108.148 74.6945C106.515 74.6945 105.093 74.4372 103.881 73.9227C102.677 73.4081 101.735 72.6464 101.057 71.6375C100.385 70.6219 100.033 69.3659 100 67.8695H104.138C104.184 68.5669 104.379 69.1492 104.721 69.6164C105.07 70.0768 105.534 70.4255 106.114 70.6625C106.7 70.8927 107.361 71.0078 108.099 71.0078C108.823 71.0078 109.452 70.8995 109.985 70.6828C110.525 70.4661 110.943 70.1648 111.24 69.7789C111.536 69.393 111.684 68.9495 111.684 68.4484C111.684 67.9813 111.549 67.5885 111.279 67.2703C111.016 66.9521 110.627 66.6812 110.114 66.4578C109.607 66.2344 108.984 66.0313 108.247 65.8484L106.044 65.2797C104.339 64.8531 102.993 64.1862 102.005 63.2789C101.017 62.3716 100.527 61.1495 100.533 59.6125C100.527 58.3531 100.853 57.2529 101.511 56.3117C102.176 55.3706 103.088 54.6359 104.247 54.1078C105.406 53.5797 106.723 53.3156 108.198 53.3156C109.699 53.3156 111.009 53.5797 112.128 54.1078C113.254 54.6359 114.13 55.3706 114.756 56.3117C115.381 57.2529 115.704 58.343 115.723 59.582H111.625Z"
					fill="#C15940"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_947"
						x1="46.395"
						y1="79.4681"
						x2="85.6845"
						y2="79.4681"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_947"
						x1="3.26025"
						y1="79.4263"
						x2="42.466"
						y2="79.4263"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_947"
						x1="3.51074"
						y1="38.0679"
						x2="85.4334"
						y2="38.0679"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_947"
						x1="46.4785"
						y1="53.512"
						x2="88.9446"
						y2="53.512"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_947"
						x1="0"
						y1="53.512"
						x2="42.466"
						y2="53.512"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_61_947"
						x1="0"
						y1="121.056"
						x2="160"
						y2="121.056"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint6_linear_61_947"
						x1="0"
						y1="151.903"
						x2="160"
						y2="151.903"
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

		let regular = attributes.regular;
		let currency = attributes.currency;
		let discounted = attributes.discounted;
		var wrapper = attributes.wrapper;
		var blockId = attributes.blockId;

		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var icon = attributes.icon;

		var prefix = attributes.prefix;
		var postfix = attributes.postfix;
		var separator = attributes.separator;

		var blockCssY = attributes.blockCssY;

		var postId = context["postId"];
		var postType = context["postType"];

		var breakPointX = myStore.getBreakPoint();
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

		// const [productData, setproductData] = useState(null);
		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);
		const [loading, setloading] = useState(false);

		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;

		var regularSelector = blockClass + " .regular";
		var currencySelector = blockClass + " .currency";
		var discountedSelector = blockClass + " .discounted";
		const iconSelector = blockClass + " .icon";
		const separatorSelector = blockClass + " .separator";

		const prefixSelector = blockClass + " .prefix";
		const postfixSelector = blockClass + " .postfix";

		const [postPriceEdited, setpostPriceEdited] = useState(
			regular.options.text
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

				setloading(false);
			});
		}, []);

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
				var currencyX = attributes.currency;
				var prefixX = attributes.prefix;
				var postfixX = attributes.postfix;
				var discountedX = attributes.discounted;
				var regularX = attributes.regular;
				var separatorX = attributes.separator;
				var iconX = attributes.icon;
				var blockCssYX = attributes.blockCssY;

				var blockCssObj = {};

				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[iconSelector] = iconY;
				}

				if (separatorX != undefined) {
					var separatorY = { ...separatorX, options: separator.options };
					setAttributes({ separator: separatorY });
					blockCssObj[separatorSelector] = separatorY;
				}

				if (regularX != undefined) {
					var regularY = { ...regularX, options: regular.options };
					setAttributes({ regular: regularY });
					blockCssObj[regularSelector] = regularY;
				}

				if (discountedX != undefined) {
					var discountedY = { ...discountedX, options: discounted.options };
					setAttributes({ discounted: discountedY });
					blockCssObj[discountedSelector] = discountedY;
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

				if (currencyX != undefined) {
					var currencyY = { ...currencyX, options: currency.options };
					setAttributes({ currency: currencyY });
					blockCssObj[currencySelector] = currencyY;
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

		function onChangeIcon(arg) {
			var options = {
				...icon.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({ icon: { ...icon, options: options } });
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

		function onPickCssLibraryRegular(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				regular[sudoScource] = sudoScourceArgs;
			});

			var regularX = Object.assign({}, regular);
			setAttributes({ regular: regularX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					regularSelector
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

		function onChangeStyleRegular(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, regular);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ regular: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				regularSelector
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

		function onRemoveStyleRegular(sudoScource, key) {
			var object = myStore.deletePropertyDeep(regular, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ regular: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				regularSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleRegular(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, regular);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ regular: object });
		}

		function onChangeStyleDiscounted(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, discounted);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ discounted: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				discountedSelector
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

		function onRemoveStyleDiscounted(sudoScource, key) {
			var object = myStore.deletePropertyDeep(discounted, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ discounted: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				discountedSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleDiscounted(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, discounted);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ discounted: object });
		}
		///
		function onChangeStyleCurrency(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, currency);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ currency: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				currencySelector
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

		function onRemoveStyleCurrency(sudoScource, key) {
			var object = myStore.deletePropertyDeep(currency, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ currency: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				currencySelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleCurrency(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, currency);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ currency: object });
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

		// add bulk style start

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

		function onBulkAddCurrency(sudoScource, cssObj) {
			let obj = Object.assign({}, currency);
			obj[sudoScource] = cssObj;

			setAttributes({ currency: obj });

			var selector = myStore.getElementSelector(sudoScource, currencySelector);
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

		function onBulkAddRegular(sudoScource, cssObj) {
			let obj = Object.assign({}, regular);
			obj[sudoScource] = cssObj;

			setAttributes({ regular: obj });

			var selector = myStore.getElementSelector(sudoScource, regularSelector);
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

		function onBulkAddDiscounted(sudoScource, cssObj) {
			let obj = Object.assign({}, discounted);
			obj[sudoScource] = cssObj;

			setAttributes({ discounted: obj });

			var selector = myStore.getElementSelector(
				sudoScource,
				discountedSelector
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

		// add bulk style end

		// reset style start

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

		function onResetCurrency(sudoScources) {
			let obj = Object.assign({}, currency);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						currencySelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ currency: obj });
		}
		function onResetDiscounted(sudoScources) {
			let obj = Object.assign({}, discounted);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						discountedSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ discounted: obj });
		}
		function onResetRegular(sudoScources) {
			let obj = Object.assign({}, regular);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						regularSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ regular: obj });
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

		// reset style end

		const [iconHtml, setIconHtml] = useState("");

		useEffect(() => {
			var iconSrc = icon.options.iconSrc;

			var iconHtml = `<span className="${iconSrc}"></span>`;

			setIconHtml(iconHtml);
		}, [icon]);

		const [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);

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
			blockCssObj[regularSelector] = regular;
			blockCssObj[currencySelector] = currency;
			blockCssObj[discountedSelector] = discounted;
			blockCssObj[separatorSelector] = separator;
			blockCssObj[iconSelector] = icon;
			blockCssObj[prefixSelector] = prefix;
			blockCssObj[postfixSelector] = postfix;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
		}

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		useEffect(() => {}, [regular]);

		const CustomTag = `${wrapper.options.tag}`;
		const CustomTagPostTitle = `${regular.options.tag}`;

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
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
									{
										name: "css",
										title: "CSS Library",
										icon: mediaAndText,
										className: "tab-css",
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
										onBulkAdd={onBulkAddWrapper}
										onReset={onResetWrapper}
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

						<PanelBody
							className="font-medium text-slate-900 "
							title="Regular"
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
										obj={regular}
										onChange={onChangeStyleRegular}
										onAdd={onAddStyleRegular}
										onRemove={onRemoveStyleRegular}
										onBulkAdd={onBulkAddRegular}
										onReset={onResetRegular}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={regular}
										onChange={onPickCssLibraryRegular}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						{productData != null && productData.type != "variable" && (
							<PanelBody
								className="font-medium text-slate-900 "
								title="Discounted"
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
											icon: styles,
											className: "tab-css",
										},
									]}>
									<PGtab name="styles">
										<PGStyles
											obj={discounted}
											onChange={onChangeStyleDiscounted}
											onAdd={onAddStyleDiscounted}
											onRemove={onRemoveStyleDiscounted}
											onBulkAdd={onBulkAddDiscounted}
											onReset={onResetDiscounted}
										/>
									</PGtab>
									<PGtab name="css"></PGtab>
								</PGtabs>
							</PanelBody>
						)}

						<PanelBody
							className="font-medium text-slate-900 "
							title="Currency"
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
										obj={currency}
										onChange={onChangeStyleCurrency}
										onAdd={onAddStyleCurrency}
										onRemove={onRemoveStyleCurrency}
										onBulkAdd={onBulkAddCurrency}
										onReset={onResetCurrency}
									/>
								</PGtab>
								<PGtab name="css"></PGtab>
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
									{
										name: "css",
										title: "CSS Library",
										icon: mediaAndText,
										className: "tab-css",
									},
								]}>
								<PGtab name="options">
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Choose Icon
										</label>

										<PGIconPicker
											library={icon.options.library}
											srcType={icon.options.srcType}
											iconSrc={icon.options.iconSrc}
											onChange={onChangeIcon}
										/>
									</PanelRow>

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
										onBulkAdd={onBulkAddIcon}
										onReset={onResetIcon}
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
									{
										name: "css",
										title: "CSS Library",
										icon: mediaAndText,
										className: "tab-css",
									},
								]}>
								<PGtab name="options">
									<PGcssClassPicker
										tags={customTags}
										label="Prefix"
										placeholder="Add Prefix"
										value={prefix.options.text}
										onChange={(newVal) => {
											var options = { ...prefix.options, text: newVal };
											setAttributes({
												prefix: { styles: prefix.styles, options: options },
											});
										}}
									/>
								</PGtab>
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
									{
										name: "css",
										title: "CSS Library",
										icon: mediaAndText,
										className: "tab-css",
									},
								]}>
								<PGtab name="options">
									<PGcssClassPicker
										tags={customTags}
										label="Postfix"
										placeholder="Add Postfix"
										value={postfix.options.text}
										onChange={(newVal) => {
											var options = { ...postfix.options, text: newVal };
											setAttributes({
												postfix: { styles: postfix.styles, options: options },
											});
										}}
									/>
								</PGtab>
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
								blockName={"woo-price"}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
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
						<div className="px-3">
							<PGTutorials slug="woo-price" />
						</div>
					</div>
				</InspectorControls>

				<>
					{loading && (
						<div>
							<Spinner />
						</div>
					)}

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

							{productData != null && (
								<>
									{productData.type != "variable" && (
										<>
											<span className="regular">
												<span
													className="currency"
													dangerouslySetInnerHTML={{
														__html: productData.currency_symbol,
													}}
												/>
												{productData.regular_price}
											</span>

											{productData.sale_price.length != 0 && (
												<span className="discounted">
													<span
														className="currency"
														dangerouslySetInnerHTML={{
															__html: productData.currency_symbol,
														}}
													/>
													{productData.sale_price}
												</span>
											)}
										</>
									)}
									{productData.type == "variable" && (
										<>
											<span className="regular">
												<span
													className="currency"
													dangerouslySetInnerHTML={{
														__html: productData.currency_symbol,
													}}
												/>
												{productData.min_price}
											</span>
											<span className="regular">{separator.options.text}</span>
											<span className="regular">
												<span
													className="currency"
													dangerouslySetInnerHTML={{
														__html: productData.currency_symbol,
													}}
												/>
												{productData.max_price}
											</span>
										</>
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
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
