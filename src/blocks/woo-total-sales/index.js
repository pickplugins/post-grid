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
	close,
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
					d="M160 112.488H0V129.625H160V112.488Z"
					fill="url(#paint0_linear_61_945)"
				/>
				<path
					d="M160 143.334H0V160.471H160V143.334Z"
					fill="url(#paint1_linear_61_945)"
				/>
				<path
					d="M108.076 52.407V72.7151H103.762V56.4768H103.64L99 59.407V55.5814L104.047 52.407H108.076Z"
					fill="#C15940"
				/>
				<path
					d="M119.39 72.7151V69.6221L126.634 62.907C127.244 62.2965 127.773 61.7675 128.18 61.2791C128.587 60.7907 128.913 60.343 129.157 59.8547C129.361 59.407 129.483 58.8779 129.483 58.3488C129.483 57.7384 129.361 57.25 129.076 56.8023C128.791 56.3547 128.425 56.0291 127.977 55.7849C127.489 55.5407 126.959 55.4186 126.39 55.4186C125.779 55.4186 125.209 55.5407 124.762 55.7849C124.314 56.0291 123.948 56.3954 123.704 56.8837C123.459 57.3721 123.337 57.9012 123.337 58.5523H119.268C119.268 57.2093 119.552 56.0698 120.163 55.093C120.773 54.1163 121.628 53.343 122.686 52.814C123.785 52.2849 125.006 52 126.43 52C127.896 52 129.157 52.2442 130.256 52.7733C131.355 53.3023 132.169 53.9942 132.779 54.8895C133.39 55.7849 133.675 56.843 133.675 58.0233C133.675 58.7965 133.512 59.5291 133.227 60.3023C132.942 61.0349 132.372 61.8895 131.64 62.7849C130.866 63.6802 129.808 64.7791 128.384 66.0407L125.413 68.9302V69.0523H133.959V72.5523H119.39V72.7151Z"
					fill="#C15940"
				/>
				<path
					d="M150.971 73C149.506 73 148.163 72.7558 147.023 72.2267C145.883 71.6976 144.947 71.0058 144.296 70.1104C143.645 69.2151 143.279 68.157 143.279 66.9767H147.593C147.634 67.4651 147.796 67.9128 148.081 68.279C148.366 68.6453 148.773 68.9302 149.302 69.1337C149.79 69.3372 150.36 69.4593 151.011 69.4593C151.663 69.4593 152.232 69.3372 152.761 69.093C153.25 68.8488 153.657 68.5232 153.942 68.1162C154.226 67.7093 154.349 67.2209 154.349 66.6918C154.349 66.1627 154.186 65.6744 153.901 65.2674C153.616 64.8604 153.168 64.5348 152.599 64.2906C152.029 64.0465 151.378 63.9244 150.604 63.9244H148.692V60.75H150.604C151.256 60.75 151.825 60.6278 152.314 60.4244C152.802 60.2209 153.209 59.8953 153.494 59.4883C153.779 59.0814 153.901 58.6337 153.901 58.1046C153.901 57.5755 153.779 57.1278 153.535 56.7616C153.29 56.3953 152.965 56.0697 152.517 55.8662C152.069 55.6627 151.581 55.5406 151.011 55.5406C150.442 55.5406 149.913 55.6627 149.424 55.8662C148.936 56.0697 148.569 56.3546 148.244 56.7616C147.959 57.1278 147.796 57.6162 147.796 58.1046H143.686C143.686 56.9244 144.052 55.9069 144.703 55.0116C145.354 54.1162 146.209 53.4244 147.349 52.8953C148.447 52.4069 149.709 52.1221 151.093 52.1221C152.476 52.1221 153.738 52.3662 154.756 52.8953C155.814 53.4244 156.628 54.0756 157.197 54.9709C157.767 55.8256 158.052 56.8023 158.052 57.8604C158.052 59 157.727 59.936 156.994 60.7093C156.302 61.4825 155.366 61.9709 154.227 62.1744V62.3372C155.732 62.5407 156.872 63.029 157.645 63.8837C158.418 64.7383 158.825 65.7965 158.825 67.0581C158.825 68.1976 158.5 69.2558 157.808 70.1511C157.157 71.0465 156.221 71.7791 155.04 72.2674C153.86 72.7558 152.517 73 150.971 73Z"
					fill="#C15940"
				/>
				<path
					d="M47.9837 78.4036C47.9837 83.861 47.9837 89.1253 47.9837 94.5828C41.512 96.9976 34.9437 99.4608 28.3271 101.924C28.3271 96.4664 28.3271 91.1538 28.3271 85.6963C34.7988 83.3298 41.3188 80.8667 47.9837 78.4036Z"
					fill="url(#paint2_linear_61_945)"
				/>
				<path
					d="M26.2991 85.6963C26.2991 91.1055 26.2991 96.4181 26.2991 101.924C19.6825 99.4608 13.1626 96.9976 6.64258 94.5828C6.64258 89.2219 6.64258 83.9093 6.64258 78.4036C13.3075 80.8667 19.8274 83.2815 26.2991 85.6963Z"
					fill="url(#paint3_linear_61_945)"
				/>
				<path
					d="M47.8394 69.324C40.8365 71.932 34.1233 74.4434 27.3135 76.9548C20.6486 74.4917 13.8389 71.932 6.7876 69.324C11.2309 67.6336 15.4326 66.0881 19.6344 64.5426C21.9043 63.7216 24.1742 62.9005 26.4442 62.0312C27.072 61.7897 27.6032 61.7897 28.2311 62.0312C34.6545 64.446 41.1262 66.8609 47.8394 69.324Z"
					fill="url(#paint4_linear_61_945)"
				/>
				<path
					d="M49.5775 70.7246C49.5775 72.4633 49.5775 74.0088 49.5775 75.7474C42.5745 78.3554 35.475 81.0117 28.3271 83.668C28.3271 81.9777 28.3271 80.4322 28.3271 78.6452C35.3301 76.0372 42.4297 73.3809 49.5775 70.7246Z"
					fill="url(#paint5_linear_61_945)"
				/>
				<path
					d="M26.2986 83.668C19.1025 80.9634 12.0513 78.3554 5 75.7474C5 74.0571 5 72.4633 5 70.7246C12.1478 73.3809 19.2474 76.0372 26.2986 78.6452C26.2986 80.3356 26.2986 81.8811 26.2986 83.668Z"
					fill="url(#paint6_linear_61_945)"
				/>
				<path
					d="M95.7967 78.4036C95.7967 83.861 95.7967 89.1253 95.7967 94.5828C89.325 96.9976 82.7567 99.4608 76.1401 101.924C76.1401 96.4664 76.1401 91.1538 76.1401 85.6963C82.6118 83.3298 89.1801 80.8667 95.7967 78.4036Z"
					fill="url(#paint7_linear_61_945)"
				/>
				<path
					d="M74.1605 85.6963C74.1605 91.1055 74.1605 96.4181 74.1605 101.924C67.5439 99.4608 61.0239 96.9976 54.5039 94.5828C54.5039 89.2219 54.5039 83.9093 54.5039 78.4036C61.1205 80.8667 67.6405 83.2815 74.1605 85.6963Z"
					fill="url(#paint8_linear_61_945)"
				/>
				<path
					d="M95.6519 69.324C88.6489 71.932 81.9357 74.4434 75.126 76.9548C68.4611 74.4917 61.6514 71.932 54.6001 69.324C59.0434 67.6336 63.2451 66.0881 67.4469 64.5426C69.7168 63.7216 71.9867 62.9005 74.2566 62.0312C74.8845 61.7897 75.4158 61.7897 76.0436 62.0312C82.5153 64.446 88.9387 66.8609 95.6519 69.324Z"
					fill="url(#paint9_linear_61_945)"
				/>
				<path
					d="M97.4393 70.7246C97.4393 72.4633 97.4393 74.0088 97.4393 75.7474C90.4364 78.3554 83.3368 81.0117 76.189 83.668C76.189 81.9777 76.189 80.4322 76.189 78.6452C83.1436 76.0372 90.2432 73.3809 97.4393 70.7246Z"
					fill="url(#paint10_linear_61_945)"
				/>
				<path
					d="M74.16 83.668C66.9639 80.9634 59.9126 78.3554 52.8613 75.7474C52.8613 74.0571 52.8613 72.4633 52.8613 70.7246C60.0092 73.3809 67.1087 76.0372 74.16 78.6452C74.16 80.3356 74.16 81.8811 74.16 83.668Z"
					fill="url(#paint11_linear_61_945)"
				/>
				<path
					d="M71.8904 41.5535C71.8904 47.0109 71.8904 52.2752 71.8904 57.7327C65.4187 60.1475 58.8505 62.6106 52.2339 65.0737C52.2339 59.6162 52.2339 54.3037 52.2339 48.8462C58.7056 46.4797 65.2256 44.0649 71.8904 41.5535Z"
					fill="url(#paint12_linear_61_945)"
				/>
				<path
					d="M50.2533 48.8945C50.2533 54.3037 50.2533 59.6163 50.2533 65.1221C43.6367 62.6589 37.1167 60.1959 30.5967 57.781C30.5967 52.4202 30.5967 47.1076 30.5967 41.6018C37.2133 44.0649 43.7333 46.4797 50.2533 48.8945Z"
					fill="url(#paint13_linear_61_945)"
				/>
				<path
					d="M71.7456 32.4738C64.7427 35.0818 58.0295 37.5933 51.2198 40.1047C44.5549 37.6416 37.7451 35.0818 30.6938 32.4738C35.1371 30.7835 39.3389 29.238 43.5406 27.6925C45.8106 26.8715 48.0805 26.0504 50.3504 25.1811C50.9783 24.9396 51.5095 24.9396 52.1373 25.1811C58.5607 27.6442 65.0325 30.0107 71.7456 32.4738Z"
					fill="url(#paint14_linear_61_945)"
				/>
				<path
					d="M73.5331 33.8745C73.5331 35.6132 73.5331 37.1587 73.5331 38.8973C66.5301 41.5053 59.4306 44.1616 52.2827 46.8179C52.2827 45.1275 52.2827 43.5821 52.2827 41.7951C59.2374 39.2354 66.3369 36.5791 73.5331 33.8745Z"
					fill="url(#paint15_linear_61_945)"
				/>
				<path
					d="M50.2059 46.8179C43.0097 44.1133 35.9585 41.5053 28.9072 38.8973C28.9072 37.207 28.9072 35.6132 28.9072 33.8745C36.0551 36.5308 43.1546 39.1871 50.2059 41.7951C50.2059 43.4855 50.2059 45.0792 50.2059 46.8179Z"
					fill="url(#paint16_linear_61_945)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_945"
						x1="0"
						y1="121.056"
						x2="160"
						y2="121.056"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_945"
						x1="0"
						y1="151.903"
						x2="160"
						y2="151.903"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_945"
						x1="28.3271"
						y1="90.1637"
						x2="47.9837"
						y2="90.1637"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_945"
						x1="6.64258"
						y1="90.1637"
						x2="26.2991"
						y2="90.1637"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_945"
						x1="6.7876"
						y1="69.4024"
						x2="47.8394"
						y2="69.4024"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_61_945"
						x1="28.3271"
						y1="77.1963"
						x2="49.5775"
						y2="77.1963"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint6_linear_61_945"
						x1="5"
						y1="77.1963"
						x2="26.2986"
						y2="77.1963"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint7_linear_61_945"
						x1="76.1401"
						y1="90.1637"
						x2="95.7967"
						y2="90.1637"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint8_linear_61_945"
						x1="54.5039"
						y1="90.1637"
						x2="74.1605"
						y2="90.1637"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint9_linear_61_945"
						x1="54.6001"
						y1="69.4024"
						x2="95.6519"
						y2="69.4024"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint10_linear_61_945"
						x1="76.189"
						y1="77.1963"
						x2="97.4393"
						y2="77.1963"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint11_linear_61_945"
						x1="52.8613"
						y1="77.1963"
						x2="74.16"
						y2="77.1963"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint12_linear_61_945"
						x1="52.2339"
						y1="53.3136"
						x2="71.8904"
						y2="53.3136"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint13_linear_61_945"
						x1="30.5967"
						y1="53.3619"
						x2="50.2533"
						y2="53.3619"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint14_linear_61_945"
						x1="30.6938"
						y1="32.5523"
						x2="71.7456"
						y2="32.5523"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint15_linear_61_945"
						x1="52.2827"
						y1="40.3462"
						x2="73.5331"
						y2="40.3462"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint16_linear_61_945"
						x1="28.9072"
						y1="40.3462"
						x2="50.2059"
						y2="40.3462"
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

		var blockCssY = attributes.blockCssY;

		var postId = context["postId"];
		var postType = context["postType"];

		var breakPointX = myStore.getBreakPoint();

		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);

		const [prefixText, setprefixText] = useState(
			myStore.parseCustomTags(prefix.options.text, customTags)
		);
		const [postfixText, setpostfixText] = useState(
			myStore.parseCustomTags(postfix.options.text, customTags)
		);

		useEffect(() => {
			var text = myStore.parseCustomTags(prefix.options.text, customTags);
			setprefixText(text);
		}, [prefix.options.text]);

		useEffect(() => {
			var text = myStore.parseCustomTags(postfix.options.text, customTags);
			setpostfixText(text);
		}, [postfix.options.text]);

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
				if (res.manage_stock != undefined) {
					setproductData(res);
					// console.log(res)
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
				var saleCountX = attributes.saleCount;
				var prefixX = attributes.prefix;
				var postfixX = attributes.postfix;
				var iconX = attributes.icon;
				var blockCssYX = attributes.blockCssY;

				var blockCssObj = {};

				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[iconSelector] = iconY;
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

				if (saleCountX != undefined) {
					var saleCountY = { ...saleCountX, options: saleCount.options };
					setAttributes({ saleCount: saleCountY });
					blockCssObj[saleCountSelector] = saleCountY;
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

		function onBulkAddSaleCount(sudoScource, cssObj) {
			let obj = Object.assign({}, saleCount);
			obj[sudoScource] = cssObj;

			setAttributes({ saleCount: obj });

			var selector = myStore.getElementSelector(sudoScource, saleCountSelector);
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

		function onResetSaleCount(sudoScources) {
			let obj = Object.assign({}, saleCount);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						saleCountSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ saleCount: obj });
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

			var iconHtml = `<span className="${iconSrc}"></span>`;

			setIconHtml(iconHtml);
		}, [icon]);

		const [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);

		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;

		var saleCountSelector = blockClass + " .saleCount-text";
		const iconSelector = blockClass + " .saleCount-icon";

		const prefixSelector = blockClass + " .prefix";
		const postfixSelector = blockClass + " .postfix";

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });

			// setAttributes({ saleCount: saleCount });
			// setAttributes({ wrapper: wrapper });

			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[saleCountSelector] = saleCount;
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

		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

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
							title="Sale Count"
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
											Link To
										</label>

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
											<label for="" className="font-medium text-slate-900 ">
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
											<label for="" className="font-medium text-slate-900 ">
												Custom URL
											</label>

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
											<label for="" className="font-medium text-slate-900 ">
												Custom Tag
											</label>
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
												<label for="" className="font-medium text-slate-900 ">
													Link Target
												</label>

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
												<label for="" className="font-medium text-slate-900 ">
													Custom Attributes
												</label>
												<div
													// className=" cursor-pointer px-3 text-white py-1 bg-blue-600"
													className="flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-800 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700 "
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
																// className="text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close"
																className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
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
																}}>
																<Icon icon={close} />
															</span>
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
										onBulkAdd={onBulkAddSaleCount}
										onReset={onResetSaleCount}
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
								blockName={"woo-total-sales"}
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
							<PGTutorials slug="woo-total-sales" />
						</div>
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
								<span className={prefix.options.class}>{prefixText}</span>
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
								<span className={postfix.options.class}>{postfixText}</span>
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
										<span className={prefix.options.class}>{prefixText}</span>
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
