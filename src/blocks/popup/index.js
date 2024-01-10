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
	Spinner,
	Tooltip,
} from "@wordpress/components";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import apiFetch from "@wordpress/api-fetch";
import { applyFilters } from "@wordpress/hooks";

import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from "@wordpress/block-editor";
import { createBlocksFromInnerBlocksTemplate } from "@wordpress/blocks";

import {
	Icon,
	styles,
	settings,
	link,
	linkOff,
	close,
	brush,
	mediaAndText,
} from "@wordpress/icons";
import { __experimentalBlockVariationPicker as BlockVariationPicker } from "@wordpress/block-editor";

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
import { __experimentalScrollable as Scrollable } from "@wordpress/components";

import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";

import variations from "./variations";

import PGDropdown from "../../components/dropdown";
import PGLibraryBlockVariations from "../../components/library-block-variations";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import PGCssLibrary from "../../components/css-library";
import PGIconPicker from "../../components/icon-picker";

import "animate.css";
import "../../../node_modules/animate.css/animate.css";
import metadata from "./block.json";
import PGcssClassPicker from "../../components/css-class-picker";
import customTags from "../../custom-tags";
import PGTutorials from "../../components/tutorials";
import PGBlockVariationsPicker from "../../components/block-variations-picker";

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
				width="161"
				height="160"
				viewBox="0 0 161 160"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M140.818 145.024H3.46346C1.56434 145.024 -0.00244141 143.458 -0.00244141 141.558V36.252C-0.00244141 34.3529 1.56434 32.7861 3.46346 32.7861H140.818C142.717 32.7861 144.283 34.3529 144.283 36.252V141.558C144.283 143.458 142.717 145.024 140.818 145.024Z"
					fill="url(#paint0_linear_61_152)"
				/>
				<path
					d="M142.532 50.0687C152.216 50.0687 160.066 42.2183 160.066 32.5343C160.066 22.8504 152.216 15 142.532 15C132.848 15 124.998 22.8504 124.998 32.5343C124.998 42.2183 132.848 50.0687 142.532 50.0687Z"
					fill="#C15940"
				/>
				<path
					d="M143.612 32.534L150.205 25.9404C150.497 25.6486 150.497 25.1527 150.205 24.8609C149.913 24.5692 149.417 24.5692 149.126 24.8609L142.532 31.4545L135.938 24.8609C135.647 24.5692 135.151 24.5692 134.859 24.8609C134.567 25.1527 134.567 25.6486 134.859 25.9404L141.453 32.534L134.859 39.1276C134.567 39.4194 134.567 39.9153 134.859 40.2071C135.005 40.353 135.209 40.4405 135.384 40.4405C135.559 40.4405 135.763 40.353 135.909 40.2071L142.503 33.6135L149.096 40.2071C149.242 40.353 149.447 40.4405 149.622 40.4405C149.826 40.4405 150.001 40.353 150.147 40.2071C150.439 39.9153 150.439 39.4194 150.147 39.1276L143.612 32.534Z"
					fill="white"
					stroke="white"
					stroke-width="4"
				/>
				<path
					d="M58.5562 66.9326H13.7328C12.7422 66.9326 11.7921 67.3262 11.0916 68.0267C10.3911 68.7272 9.99756 69.6772 9.99756 70.6679V108.021C9.99756 109.011 10.3911 109.961 11.0916 110.662C11.7921 111.362 12.7422 111.756 13.7328 111.756H58.5562C59.5469 111.756 60.497 111.362 61.1975 110.662C61.898 109.961 62.2915 109.011 62.2915 108.021V70.6679C62.2915 69.6772 61.898 68.7272 61.1975 68.0267C60.497 67.3262 59.5469 66.9326 58.5562 66.9326ZM54.8209 104.285H17.4681V74.4032H54.8209V104.285Z"
					fill="white"
				/>
				<path
					d="M136.998 78.1382H77.2334V85.6087H136.998V78.1382Z"
					fill="white"
				/>
				<path
					d="M122.057 93.0791H77.2334V100.55H122.057V93.0791Z"
					fill="white"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_152"
						x1="-0.00244141"
						y1="88.9052"
						x2="144.283"
						y2="88.9052"
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
		var closeWrap = attributes.closeWrap;
		var entranceWrap = attributes.entranceWrap;
		var inner = attributes.inner;
		var visible = attributes.visible;
		var editMode = attributes.editMode;

		var blockCssY = attributes.blockCssY;

		var breakPointX = myStore.getBreakPoint();

		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
		var closeWrapSelector = blockClass + " .close";
		var innerSelector = blockClass + " .inner";

		var closeAnimateArgs = {
			backOutDown: { label: "backOutDown", value: "backOutDown" },
			backOutLeft: { label: "backOutLeft", value: "backOutLeft" },
			backOutRight: { label: "backOutRight", value: "backOutRight" },
			backOutUp: { label: "backOutUp", value: "backOutUp" },
			bounceOut: { label: "bounceOut", value: "bounceOut" },
			bounceOutDown: { label: "bounceOutDown", value: "bounceOutDown" },
			bounceOutLeft: { label: "bounceOutLeft", value: "bounceOutLeft" },
			bounceOutRight: { label: "bounceOutRight", value: "bounceOutRight" },
			bounceOutUp: { label: "bounceOutUp", value: "bounceOutUp" },
			fadeOut: { label: "fadeOut", value: "fadeOut" },
			fadeOutDown: { label: "fadeOutDown", value: "fadeOutDown" },
			fadeOutDownBig: { label: "fadeOutDownBig", value: "fadeOutDownBig" },
			fadeOutLeft: { label: "fadeOutLeft", value: "fadeOutLeft" },
			fadeOutLeftBig: { label: "fadeOutLeftBig", value: "fadeOutLeftBig" },
			fadeOutRight: { label: "fadeOutRight", value: "fadeOutRight" },
			fadeOutRightBig: { label: "fadeOutRightBig", value: "fadeOutRightBig" },
			fadeOutUp: { label: "fadeOutUp", value: "fadeOutUp" },
			fadeOutUpBig: { label: "fadeOutUpBig", value: "fadeOutUpBig" },
			fadeOutTopLeft: { label: "fadeOutTopLeft", value: "fadeOutTopLeft" },
			fadeOutTopRight: { label: "fadeOutTopRight", value: "fadeOutTopRight" },
			fadeOutBottomRight: {
				label: "fadeOutBottomRight",
				value: "fadeOutBottomRight",
			},
			fadeOutBottomLeft: {
				label: "fadeOutBottomLeft",
				value: "fadeOutBottomLeft",
			},
			rotateOut: { label: "rotateOut", value: "rotateOut" },
			rotateOutDownLeft: {
				label: "rotateOutDownLeft",
				value: "rotateOutDownLeft",
			},
			rotateOutDownRight: {
				label: "rotateOutDownRight",
				value: "rotateOutDownRight",
			},
			rotateOutUpLeft: { label: "rotateOutUpLeft", value: "rotateOutUpLeft" },
			rotateOutUpRight: {
				label: "rotateOutUpRight",
				value: "rotateOutUpRight",
			},
			zoomOut: { label: "zoomOut", value: "zoomOut" },
			zoomOutDown: { label: "zoomOutDown", value: "zoomOutDown" },
			zoomOutLeft: { label: "zoomOutLeft", value: "zoomOutLeft" },
			zoomOutRight: { label: "zoomOutRight", value: "zoomOutRight" },
			zoomOutUp: { label: "zoomOutUp", value: "zoomOutUp" },
			slideOutDown: { label: "slideOutDown", value: "slideOutDown" },
			slideOutLeft: { label: "slideOutLeft", value: "slideOutLeft" },
			slideOutRight: { label: "slideOutRight", value: "slideOutRight" },
			slideOutUp: { label: "slideOutUp", value: "slideOutUp" },
		};
		var entranceAnimateArgs = {
			backInDown: { label: "backInDown", value: "backInDown" },
			backInLeft: { label: "backInLeft", value: "backInLeft" },
			backInRight: { label: "backInRight", value: "backInRight" },
			backInUp: { label: "backInUp", value: "backInUp" },
			bounceIn: { label: "bounceIn", value: "bounceIn" },
			bounceInDown: { label: "bounceInDown", value: "bounceInDown" },
			bounceInLeft: { label: "bounceInLeft", value: "bounceInLeft" },
			bounceInRight: { label: "bounceInRight", value: "bounceInRight" },
			bounceInUp: { label: "bounceInUp", value: "bounceInUp" },
			fadeIn: { label: "fadeIn", value: "fadeIn" },
			fadeInDown: { label: "fadeInDown", value: "fadeInDown" },
			fadeInDownBig: { label: "fadeInDownBig", value: "fadeInDownBig" },
			fadeInLeft: { label: "fadeInLeft", value: "fadeInLeft" },
			fadeInLeftBig: { label: "fadeInLeftBig", value: "fadeInLeftBig" },
			fadeInRight: { label: "fadeInRight", value: "fadeInRight" },
			fadeInRightBig: { label: "fadeInRightBig", value: "fadeInRightBig" },
			fadeInUp: { label: "fadeInUp", value: "fadeInUp" },
			fadeInUpBig: { label: "fadeInUpBig", value: "fadeInUpBig" },
			fadeInTopLeft: { label: "fadeInTopLeft", value: "fadeInTopLeft" },
			fadeInTopRight: { label: "fadeInTopRight", value: "fadeInTopRight" },
			fadeInBottomRight: {
				label: "fadeInBottomRight",
				value: "fadeInBottomRight",
			},
			fadeInBottomLeft: {
				label: "fadeInBottomLeft",
				value: "fadeInBottomLeft",
			},
			rotateIn: { label: "rotateIn", value: "rotateIn" },
			rotateInDownLeft: {
				label: "rotateInDownLeft",
				value: "rotateInDownLeft",
			},
			rotateInDownRight: {
				label: "rotateInDownRight",
				value: "rotateInDownRight",
			},
			rotateInUpLeft: { label: "rotateInUpLeft", value: "rotateInUpLeft" },
			rotateInUpRight: {
				label: "rotateInUpRight",
				value: "rotateInUpRight",
			},
			zoomIn: { label: "zoomIn", value: "zoomIn" },
			zoomInDown: { label: "zoomInDown", value: "zoomInDown" },
			zoomInLeft: { label: "zoomInLeft", value: "zoomInLeft" },
			zoomInRight: { label: "zoomInRight", value: "zoomInRight" },
			zoomInUp: { label: "zoomInUp", value: "zoomInUp" },
			slideInDown: { label: "slideInDown", value: "slideInDown" },
			slideInLeft: { label: "slideInLeft", value: "slideInLeft" },
			slideInRight: { label: "slideInRight", value: "slideInRight" },
			slideInUp: { label: "slideInUp", value: "slideInUp" },
		};

		var visibleArgsBasic = {
			initial: {
				label: "Initial",
				description: "Visble as soon as possible",
				args: { id: "initial", value: 5 },
			},
			delay: {
				label: "Delay",
				description: "Delay certain amount of time after page load.",
				args: { id: "delay", value: 1000 },
			},
			scrollParcent: {
				label: "Scroll Parcent",
				description: "After certain amount(parcent) of scroll",
				args: { id: "scrollParcent", min: "30", max: 50 },
				isPro: true,
			},
			scrollFixed: {
				label: "Scroll Fixed",
				description: "After fixed amount of scroll",
				args: { id: "scrollFixed", min: "30", max: 50 },
				isPro: true,
			},
			scrollEnd: {
				label: "Scroll End",
				description: "Scroll to end of page",
				args: { id: "scrollEnd", min: "30", max: 50 },
				isPro: true,
			},
			scrollElement: {
				label: "Scroll Element",
				description: "Scroll to certain element by class or id",
				args: { id: "scrollElement", value: "" },
				isPro: true,
			},
			clickFirst: {
				label: "Click First",
				description: "After first click on page",
				args: { id: "clickFirst", value: 1 },
				isPro: true,
			},
			clickCount: {
				label: "Click Count",
				description: "After certain amount of click on page",
				args: { id: "clickCount", value: 5 },
				isPro: true,
			},
			clickRight: {
				label: "Click Right",
				description: "on right click",
				args: { id: "clickRight", value: 0 },
				isPro: true,
			},
			onExit: {
				label: "On Exit",
				description: "before close browser tab.",
				args: { id: "onExit", value: 1 },
				isPro: true,
			},
			clickElement: {
				label: "Click Element",
				description: "After click an element by id or class",
				args: { id: "clickElement", value: "" },
				isPro: true,
			},
			dateCountdownExpired: {
				label: "Date Countdown Expired",
				description: "After expired from date countdown block",
				args: { id: "dateCountdownExpired", value: "", once: false },
				isPro: true,
			},

			// onHover: { label: 'On Hover', description: 'Display popup on hover an element', args: { id: 'onHover', value: '' }, isPro: true },
			// isDevice: { label: 'Device', description: 'Display popup based on device', args: { id: 'isDevice', value: '' }, isPro: true },
			// isDate: { label: 'Is Date', description: 'Display popup based on date', args: { id: 'isDate', value: '', start: '', end: '' }, isPro: true },
			// visitCount: { label: 'Visit Count', description: 'Display popup based on date', args: { id: 'visitCount', value: '', compair: '' }, isPro: true },
			// isCountries: { label: 'Is Country', description: 'Display popup based on countries', args: { id: 'isCountries', value: '' }, isPro: true },
			// isBrowsers: { label: 'Is browsers', description: 'Display popup based on browsers', args: { id: 'isBrowsers', value: '' }, isPro: true },

			cookieExist: {
				label: "Cookie Exist",
				description: "If certain cookie exist",
				args: { id: "cookieExist", value: "" },
				isPro: true,
			},
			cookieNotExist: {
				label: "Cookie Not Exist",
				description: "If certain cookie not exist",
				args: { id: "cookieNotExist", value: "" },
				isPro: true,
			},
			userLogged: {
				label: "User Logged",
				description: "Show when user logged-in(any user)",
				args: { id: "userLogged", value: "" },
				isPro: true,
			},
			userIds: {
				label: "User Ids",
				description: "If user with certain id loggedin",
				args: { id: "userIds", value: "" },
				isPro: true,
			},

			// userRoles: { label: 'User Roles', description: 'Show when user has specific roles.', args: { id: 'userRoles', value: '' } },
			// userCapabilities: { label: 'User Capability', description: 'Show when user has specific capability.', args: { id: 'userCapabilities', Capabilities: [] } },
			// weekDays: { label: 'is Date', description: 'Show when specific week days', args: { id: 'weekDays', days: [] } },
			// isMonths: { label: 'is Months', description: 'Show when specific months', args: { id: 'isMonths', months: [] } },
			// isHours: { label: 'is Hours', description: 'Show when specific isHours', args: { id: 'isHours', hours: [] } },

			// postsIds: { label: 'Post Ids', description: 'Display popups on single post/page by ids', args: { id: 'postsIds', value: '' }, },
			// termIds: { label: 'Term Ids', description: 'Display popups on terms page by ids', args: { id: 'postsIds', value: '' }, },
			// authorIds: { label: 'Author Ids', description: 'Display popups on author page by ids', args: { id: 'postsIds', value: '' }, },
			// homePage: { label: 'Is Home', description: 'Display popups on home  page', args: { id: 'homePage', value: '' }, },

			// frontPage: { label: 'Is Home', description: 'Display popups on home  page', args: { id: 'frontPage', value: '' }, },
			// postsPage: { label: 'Is Posts Page', description: 'Display popups on blog  page', args: { id: 'postsPage', value: '' }, },
			// isDate: { label: 'Is Date Page', description: 'Display popups on date archive  page', args: { id: 'isDate', value: '' }, },
			// isMonth: { label: 'Is Date Page', description: 'Display popups on month archive  page', args: { id: 'isMonth', value: '' }, },
			// isYear: { label: 'Is Date Page', description: 'Display popups on year archive page', args: { id: 'isYear', value: '' }, },
			// is404: { label: 'Is Date Page', description: 'Display popups on 404 archive page', args: { id: 'is404', value: '' }, },

			// wcAccount: { label: 'Is WooCommerce Account', description: 'Display popups on WooCommerce my account page', args: { id: 'wcAccount', value: '' }, },
			// wcShop: { label: 'Is WooCommerce Shop', description: 'Display popups on WooCommerce shop page', args: { id: 'wcShop', value: '' }, },
			// searchPage: { label: 'Is Search page', description: 'Display popups on search page', args: { id: 'searchPage', value: '' }, },

			urlPrams: {
				label: "URL Prams",
				description:
					"If URL contain certain parameter(ex: domain.com/some-page?urlPram=pramVal)",
				args: { id: "urlPrams", value: "" },
				isPro: true,
			},
			referrerExist: {
				label: "Referrer Exist",
				description: "if visitor come from external website.",
				args: { id: "referrerExist", value: "" },
				isPro: true,
			},
		};

		let visibleArgs = applyFilters("visibleArgs", visibleArgsBasic);

		const { replaceInnerBlocks } = useDispatch(blockEditorStore);

		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);

		const [closeIconHtml, setcloseIconHtml] = useState("");

		useEffect(() => {
			var iconSrc = closeWrap.options.iconSrc;
			var iconHtml = `<span className="${iconSrc}"></span>`;

			setcloseIconHtml(iconHtml);
		}, [closeWrap.options]);

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });

			myStore.generateBlockCss(blockCssY.items, blockId);

			// blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'display': { "Desktop": "grid" } };
			// blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'gap': { "Desktop": "20px" } };

			// setAttributes({ blockCssY: { items: blockCssY.items } });

			//setAttributes({ wrapper: { ...wrapper, styles: { display: { Desktop: 'grid' }, gap: { Desktop: '20px' } } } });
		}, [clientId]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[innerSelector] = closeWrap;
			blockCssObj[innerSelector] = inner;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = { ...blockCssY.items, ...blockCssRules };
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

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
				var innerX = attributes.inner;
				var closeWrapX = attributes.closeWrap;
				var visibleX = attributes.visible;
				var blockCssY = attributes.blockCssY;

				var blockCssObj = {};

				if (visibleX != undefined) {
					var visibleY = { ...visibleX, options: visible.options };
					setAttributes({ visible: visibleY });
					blockCssObj[visibleSelector] = visibleY;
				}

				if (closeWrapX != undefined) {
					var closeWrapY = { ...closeWrapX, options: closeWrap.options };
					setAttributes({ closeWrap: closeWrapY });
					blockCssObj[closeWrapSelector] = closeWrapY;
				}

				if (innerX != undefined) {
					var innerY = { ...innerX, options: inner.options };
					setAttributes({ inner: innerY });
					blockCssObj[innerSelector] = innerY;
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

		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
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

		function onChangeStyleInner(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, inner);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ inner: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				innerSelector
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

		function onRemoveStyleInner(sudoScource, key) {
			var object = myStore.deletePropertyDeep(inner, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ inner: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				innerSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleInner(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, inner);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ inner: object });
		}

		function onBulkAddInner(sudoScource, cssObj) {
			let obj = Object.assign({}, inner);
			obj[sudoScource] = cssObj;

			setAttributes({ inner: obj });

			var selector = myStore.getElementSelector(sudoScource, innerSelector);
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

		function onChangeStyleCloseWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, closeWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ closeWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				closeWrapSelector
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

		function onRemoveStyleCloseWrap(sudoScource, key) {
			var object = myStore.deletePropertyDeep(closeWrap, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ closeWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				closeWrapSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleCloseWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, closeWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ closeWrap: object });
		}

		function onBulkAddCloseWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, closeWrap);
			obj[sudoScource] = cssObj;

			setAttributes({ closeWrap: obj });

			var selector = myStore.getElementSelector(sudoScource, closeWrapSelector);
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
		function onResetCloseWrap(sudoScources) {
			let obj = Object.assign({}, closeWrap);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						closeWrapSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ closeWrap: obj });
		}
		function onResetInner(sudoScources) {
			let obj = Object.assign({}, inner);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						innerSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ inner: obj });
		}

		var RemoveVisibleGroup = function ({ title, index }) {
			return (
				<>
					<span
						className="cursor-pointer inline-block hover:bg-red-500 hover:text-white px-1 py-1"
						onClick={(ev) => {
							var visibleX = { ...visible };
							delete visibleX[index];
							setAttributes({ visible: visibleX });
						}}>
						<Icon icon={close} />
					</span>
					<span>{title}</span>
				</>
			);
		};

		var RemoveVisibleArg = function ({ title, index, groupId }) {
			return (
				<>
					<span
						className="cursor-pointer inline-block hover:bg-red-500 hover:text-white px-1 py-1"
						onClick={(ev) => {
							var visibleX = { ...visible };
							visibleX[groupId].args.splice(index, 1);

							setAttributes({ visible: visibleX });
						}}>
						<Icon icon={close} />
					</span>

					<span>{title}</span>
				</>
			);
		};

		const ALLOWED_BLOCKS = ["post-grid/text"];

		const MY_TEMPLATE = [["post-grid/text", {}]];

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class} `,
		});

		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			//allowedBlocks: ALLOWED_BLOCKS,
			//template: MY_TEMPLATE,
			//orientation: 'horizontal',
			templateInsertUpdatesSelection: true,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		});

		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div className="p-3">
							<ToggleControl
								label="Edit Mode?"
								help={editMode ? "Edit Mode Enabled" : "Edit Mode Disabled."}
								checked={editMode ? true : false}
								onChange={(e) => {
									setAttributes({ editMode: editMode ? false : true });
								}}
							/>
						</div>

						{/* <PanelBody className="font-medium text-slate-900 " title="Templates" initialOpen={false}>
          </PanelBody> */}

						<PanelBody
							className="font-medium text-slate-900 "
							title="Visibility"
							initialOpen={true}>
							<div
								// className="bg-blue-500 p-2 px-4 text-white inline-block cursor-pointer rounded-sm"
								className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize  bg-gray-800 text-white font-medium rounded hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700"
								onClick={(ev) => {
									var visibleX = { ...visible };

									var index = Object.entries(visibleX).length;

									visibleX[index] = { logic: "OR", title: "", args: [] };

									setAttributes({ visible: visibleX });
								}}>
								Add Group
							</div>

							<div className="my-4">
								{Object.entries(visible).map((group, groupIndex) => {
									var groupId = group[0];
									var groupData = group[1];

									return (
										<PanelBody
											title={
												<RemoveVisibleGroup
													title={groupIndex}
													index={groupId}
												/>
											}
											initialOpen={false}>
											<PanelRow className="my-3">
												{/* <label>Logic?</label>
                      <PGDropdown position="bottom right" variant="secondary" buttonTitle={(groupData['logic'] == undefined) ? 'Choose' : groupData['logic']} options={[
                        { label: 'OR', value: 'OR' },
                        { label: 'AND', value: 'AND' }
                      ]}
                        onChange={(option, index) => {
                          var visibleX = { ...visible, }
                          visibleX[groupId]['logic'] = option.value;
                          setAttributes({ visible: visibleX });
                        }} values=""></PGDropdown> */}

												<PGDropdown
													position="bottom right"
													variant="secondary"
													buttonTitle={"Add Condition"}
													options={visibleArgs}
													onChange={(option, index) => {
														var visibleX = { ...visible };

														visibleX[groupId]["args"].push(option.args);
														setAttributes({ visible: visibleX });
													}}
													values=""></PGDropdown>
											</PanelRow>

											{visible[groupId]["args"] != undefined &&
												visible[groupId]["args"].map((item, index) => {
													var id = item.id;

													return (
														<>
															{id == "initial" && (
																<PanelBody
																	title={
																		<RemoveVisibleArg
																			title={
																				visibleArgs[id] == undefined
																					? id
																					: visibleArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<div>
																		No Option available for this condition.
																	</div>
																</PanelBody>
															)}

															{id == "delay" && (
																<PanelBody
																	title={
																		<RemoveVisibleArg
																			title={
																				visibleArgs[id] == undefined
																					? id
																					: visibleArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<PanelRow className="mb-4 flex-col items-start gap-2">
																		<label
																			for=""
																			className="font-medium text-slate-900 ">
																			Element ID/Class
																		</label>
																		<InputControl
																			className="mr-2"
																			placeholder=".element or #elementId"
																			value={item.value}
																			onChange={(newVal) => {
																				var visibleX = { ...visible };
																				visibleX[groupId]["args"][index].value =
																					newVal;
																				setAttributes({ visible: visibleX });
																			}}
																		/>
																	</PanelRow>
																</PanelBody>
															)}

															{id == "scrollParcent" && (
																<PanelBody
																	title={
																		<RemoveVisibleArg
																			title={
																				visibleArgs[id] == undefined
																					? id
																					: visibleArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<PanelRow className="mb-4">
																		<label
																			for=""
																			className="font-medium text-slate-900 ">
																			Scroll Minimum
																		</label>
																		<InputControl
																			className="mr-2"
																			value={item.min}
																			onChange={(newVal) => {
																				var visibleX = { ...visible };
																				visibleX[groupId]["args"][index].min =
																					newVal;
																				setAttributes({ visible: visibleX });
																			}}
																		/>
																	</PanelRow>

																	<PanelRow className="mb-4">
																		<label
																			for=""
																			className="font-medium text-slate-900 ">
																			Scroll Max
																		</label>
																		<InputControl
																			className="mr-2"
																			value={item.max}
																			onChange={(newVal) => {
																				var visibleX = { ...visible };
																				visibleX[groupId]["args"][index].max =
																					newVal;
																				setAttributes({ visible: visibleX });
																			}}
																		/>
																	</PanelRow>
																</PanelBody>
															)}

															{id == "scrollFixed" && (
																<PanelBody
																	title={
																		<RemoveVisibleArg
																			title={
																				visibleArgs[id] == undefined
																					? id
																					: visibleArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<PanelRow className="mb-4">
																		<label
																			for=""
																			className="font-medium text-slate-900 ">
																			Scroll Minimum
																		</label>
																		<InputControl
																			className="mr-2"
																			value={item.min}
																			onChange={(newVal) => {
																				var visibleX = { ...visible };
																				visibleX[groupId]["args"][index].min =
																					newVal;
																				setAttributes({ visible: visibleX });
																			}}
																		/>
																	</PanelRow>

																	<PanelRow className="mb-4">
																		<label
																			for=""
																			className="font-medium text-slate-900 ">
																			Scroll Max
																		</label>
																		<InputControl
																			className="mr-2"
																			value={item.max}
																			onChange={(newVal) => {
																				var visibleX = { ...visible };
																				visibleX[groupId]["args"][index].max =
																					newVal;
																				setAttributes({ visible: visibleX });
																			}}
																		/>
																	</PanelRow>
																</PanelBody>
															)}

															{id == "scrollEnd" && (
																<PanelBody
																	title={
																		<RemoveVisibleArg
																			title={
																				visibleArgs[id] == undefined
																					? id
																					: visibleArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<div>
																		No Option available for this condition.
																	</div>
																</PanelBody>
															)}

															{id == "scrollElement" && (
																<PanelBody
																	title={
																		<RemoveVisibleArg
																			title={
																				visibleArgs[id] == undefined
																					? id
																					: visibleArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<PanelRow className="mb-4">
																		<label
																			for=""
																			className="font-medium text-slate-900 ">
																			Element Class/ID
																		</label>
																		<InputControl
																			className="mr-2"
																			value={item.value}
																			onChange={(newVal) => {
																				var visibleX = { ...visible };
																				visibleX[groupId]["args"][index].value =
																					newVal;
																				setAttributes({ visible: visibleX });
																			}}
																		/>
																	</PanelRow>
																</PanelBody>
															)}

															{id == "clickFirst" && (
																<PanelBody
																	title={
																		<RemoveVisibleArg
																			title={
																				visibleArgs[id] == undefined
																					? id
																					: visibleArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<div>
																		No Option available for this condition.
																	</div>
																</PanelBody>
															)}

															{id == "clickCount" && (
																<PanelBody
																	title={
																		<RemoveVisibleArg
																			title={
																				visibleArgs[id] == undefined
																					? id
																					: visibleArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<PanelRow className="mb-4">
																		<label
																			for=""
																			className="font-medium text-slate-900 ">
																			Click Count
																		</label>
																		<InputControl
																			className="mr-2"
																			value={item.value}
																			onChange={(newVal) => {
																				var visibleX = { ...visible };
																				visibleX[groupId]["args"][index].value =
																					newVal;
																				setAttributes({ visible: visibleX });
																			}}
																		/>
																	</PanelRow>
																</PanelBody>
															)}

															{id == "clickRight" && (
																<PanelBody
																	title={
																		<RemoveVisibleArg
																			title={
																				visibleArgs[id] == undefined
																					? id
																					: visibleArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<ToggleControl
																		label="Disabled right menu?"
																		help={
																			item.value
																				? "Right Menu Disabled "
																				: "Right Menu Enabled."
																		}
																		checked={item.value ? true : false}
																		onChange={(e) => {
																			var visibleX = { ...visible };
																			visibleX[groupId]["args"][index].value =
																				item.value ? 0 : 1;
																			setAttributes({ visible: visibleX });
																		}}
																	/>
																</PanelBody>
															)}

															{id == "onExit" && (
																<PanelBody
																	title={
																		<RemoveVisibleArg
																			title={
																				visibleArgs[id] == undefined
																					? id
																					: visibleArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<div>
																		No Option available for this condition.
																	</div>
																</PanelBody>
															)}

															{id == "clickElement" && (
																<PanelBody
																	title={
																		<RemoveVisibleArg
																			title={
																				visibleArgs[id] == undefined
																					? id
																					: visibleArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<PanelRow className="mb-4 flex-col items-start gap-2">
																		<label
																			for=""
																			className="font-medium text-slate-900 ">
																			{__("Element ID/Class", "post-grid")}
																		</label>
																		<InputControl
																			className="mr-2"
																			placeholder=".element or #elementId"
																			value={item.value}
																			onChange={(newVal) => {
																				var visibleX = { ...visible };
																				visibleX[groupId]["args"][index].value =
																					newVal;
																				setAttributes({ visible: visibleX });
																			}}
																		/>
																	</PanelRow>
																</PanelBody>
															)}

															{id == "dateCountdownExpired" && (
																<PanelBody
																	title={
																		<RemoveVisibleArg
																			title={
																				visibleArgs[id] == undefined
																					? id
																					: visibleArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<ToggleControl
																		label="Is Once?"
																		className="my-4"
																		help={
																			item.once
																				? "IsOnce is Enable"
																				: "IsOnce is disabled."
																		}
																		checked={item.once ? true : false}
																		onChange={(e) => {
																			var visibleX = { ...visible };
																			visibleX[groupId]["args"][index].once =
																				item.once ? 0 : 1;
																			setAttributes({ visible: visibleX });
																		}}
																	/>
																	{/* <PanelRow className='mb-4'>
                                <label for=""  className="font-medium text-slate-900 " >{__('Element ID/Class', 'post-grid')}</label>
                                <InputControl
                                  className='mr-2'
                                  placeholder=".element or #elementId"
                                  once={item.value}
                                  onChange={(newVal) => {
                                    var visibleX = { ...visible, }
                                    visibleX[groupId]['args'][index].value = newVal
                                    setAttributes({ visible: visibleX });
                                  }}
                                />
                              </PanelRow> */}
																</PanelBody>
															)}

															{id == "cookieExist" && (
																<PanelBody
																	title={
																		<RemoveVisibleArg
																			title={
																				visibleArgs[id] == undefined
																					? id
																					: visibleArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<PanelRow className="mb-4">
																		<label
																			for=""
																			className="font-medium text-slate-900 ">
																			Cookie Name
																		</label>
																		<InputControl
																			className="mr-2"
																			value={item.value}
																			onChange={(newVal) => {
																				var visibleX = { ...visible };
																				visibleX[groupId]["args"][index].value =
																					newVal;
																				setAttributes({ visible: visibleX });
																			}}
																		/>
																	</PanelRow>
																</PanelBody>
															)}
															{id == "cookieNotExist" && (
																<PanelBody
																	title={
																		<RemoveVisibleArg
																			title={
																				visibleArgs[id] == undefined
																					? id
																					: visibleArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<PanelRow className="mb-4">
																		<label
																			for=""
																			className="font-medium text-slate-900 ">
																			Cookie Name
																		</label>
																		<InputControl
																			className="mr-2"
																			value={item.value}
																			onChange={(newVal) => {
																				var visibleX = { ...visible };
																				visibleX[groupId]["args"][index].value =
																					newVal;
																				setAttributes({ visible: visibleX });
																			}}
																		/>
																	</PanelRow>
																</PanelBody>
															)}
															{id == "userLogged" && (
																<PanelBody
																	title={
																		<RemoveVisibleArg
																			title={
																				visibleArgs[id] == undefined
																					? id
																					: visibleArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<div>
																		No Option available for this condition.
																	</div>
																</PanelBody>
															)}

															{id == "userIds" && (
																<PanelBody
																	title={
																		<RemoveVisibleArg
																			title={
																				visibleArgs[id] == undefined
																					? id
																					: visibleArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<PanelRow className="mb-4">
																		<label
																			for=""
																			className="font-medium text-slate-900 ">
																			User IDs
																		</label>
																		<InputControl
																			className="mr-2"
																			placeholder="1,2,3"
																			value={item.value}
																			onChange={(newVal) => {
																				var visibleX = { ...visible };
																				visibleX[groupId]["args"][index].value =
																					newVal;
																				setAttributes({ visible: visibleX });
																			}}
																		/>
																	</PanelRow>
																</PanelBody>
															)}
															{id == "urlPrams" && (
																<PanelBody
																	title={
																		<RemoveVisibleArg
																			title={
																				visibleArgs[id] == undefined
																					? id
																					: visibleArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<PanelRow className="mb-4">
																		<label
																			for=""
																			className="font-medium text-slate-900 ">
																			URL Parameter
																		</label>
																		<InputControl
																			className="mr-2"
																			value={item.value}
																			onChange={(newVal) => {
																				var visibleX = { ...visible };
																				visibleX[groupId]["args"][index].value =
																					newVal;
																				setAttributes({ visible: visibleX });
																			}}
																		/>
																	</PanelRow>
																</PanelBody>
															)}
															{id == "referrerExist" && (
																<PanelBody
																	title={
																		<RemoveVisibleArg
																			title={
																				visibleArgs[id] == undefined
																					? id
																					: visibleArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<PanelRow className="mb-4">
																		<label
																			for=""
																			className="font-medium text-slate-900 ">
																			Referrer Domain
																		</label>
																		<InputControl
																			className="mr-2"
																			value={item.value}
																			onChange={(newVal) => {
																				var visibleX = { ...visible };
																				visibleX[groupId]["args"][index].value =
																					newVal;
																				setAttributes({ visible: visibleX });
																			}}
																		/>
																	</PanelRow>
																</PanelBody>
															)}
														</>
													);
												})}
										</PanelBody>
									);
								})}
							</div>
						</PanelBody>

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
							title="Inner"
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
								<PGtab name="options"></PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={inner}
										onChange={onChangeStyleInner}
										onAdd={onAddStyleInner}
										onRemove={onRemoveStyleInner}
										onBulkAdd={onBulkAddInner}
										onReset={onResetInner}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="In/Out Animation"
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
											Choose Close Icon
										</label>

										<PGIconPicker
											library={closeWrap.options.library}
											srcType={closeWrap.options.srcType}
											iconSrc={closeWrap.options.iconSrc}
											onChange={(arg) => {
												var options = {
													...closeWrap.options,
													srcType: arg.srcType,
													library: arg.library,
													iconSrc: arg.iconSrc,
												};

												setAttributes({
													closeWrap: { ...closeWrap, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											In animation
										</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={
												entranceAnimateArgs[entranceWrap.options.animation] ==
												undefined
													? "Choose"
													: entranceAnimateArgs[entranceWrap.options.animation]
															.label
											}
											options={entranceAnimateArgs}
											onChange={(option, index) => {
												var options = {
													...entranceWrap.options,
													animation: option.value,
												};

												setAttributes({
													entranceWrap: { ...entranceWrap, options: options },
												});

												const element = document.querySelector(
													wrapperSelector + " .inner"
												);
												element.classList.add(
													"animate__animated",
													"animate__" + option.value
												);

												setTimeout(() => {
													element.classList.remove(
														"animate__animated",
														"animate__" + option.value
													);
												}, 2000);
											}}
											values=""></PGDropdown>
									</PanelRow>
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Out animation
										</label>

										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={
												closeAnimateArgs[closeWrap.options.animation] ==
												undefined
													? "Choose"
													: closeAnimateArgs[closeWrap.options.animation].label
											}
											options={closeAnimateArgs}
											onChange={(option, index) => {
												var options = {
													...closeWrap.options,
													animation: option.value,
												};

												setAttributes({
													closeWrap: { ...closeWrap, options: options },
												});

												const element = document.querySelector(
													wrapperSelector + " .inner"
												);
												element.classList.add(
													"animate__animated",
													"animate__" + option.value
												);

												setTimeout(() => {
													element.classList.remove(
														"animate__animated",
														"animate__" + option.value
													);
												}, 2000);
											}}
											values=""></PGDropdown>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={closeWrap}
										onChange={onChangeStyleCloseWrap}
										onAdd={onAddStyleCloseWrap}
										onRemove={onRemoveStyleCloseWrap}
										onBulkAdd={onBulkAddCloseWrap}
										onReset={onResetCloseWrap}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Block Variations"
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={"popup"}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
							/>
						</PanelBody>

						<div className="px-2">
							<PGMailSubsctibe />
							<PGContactSupport
								utm={{
									utm_source: "BlockText",
									utm_campaign: "PostGridCombo",
									utm_content: "BlockOptions",
								}}
							/>
						</div>
						<div className="px-3">
							<PGTutorials slug="popup" />
						</div>
					</div>
				</InspectorControls>

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
													["post-grid/text", {}],
												]),
												true
											);
										}}>
										Skip
									</div>
								</div>

								<div className="">
									<PGBlockVariationsPicker
										blockName={"popup"}
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
											// 				"Sorry this variation only vailable in pro version"
											// 			);
											// 			return false;
											// 		}

											// 		var atts = variation.atts;

											// 		var wrapper = { ...atts.wrapper };
											// 		var closeWrap = { ...atts.closeWrap };
											// 		var inner = { ...atts.inner };

											// 		var blockCssY = { ...atts.blockCssY };

											// 		var blockCssObj = {};

											// 		blockCssObj[wrapperSelector] = wrapper;
											// 		blockCssObj[closeWrapSelector] = closeWrap;
											// 		blockCssObj[innerSelector] = inner;

											// 		setAttributes({
											// 			wrapper: wrapper,
											// 			closeWrap: closeWrap,
											// 			inner: inner,
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
											// 					"https://pickplugins.com/post-grid/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=" +
											// 					x.label
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
						<div {...innerBlocksProps}>
							{!editMode && (
								<div
									className="text-center inline-block mx-auto"
									onClick={(e) => {
										setAttributes({ editMode: editMode ? false : true });
									}}>
									Enable Edit Mode
								</div>
							)}

							{editMode && (
								<div className="inner">
									<span className="close">
										<span
											className="icon"
											dangerouslySetInnerHTML={{ __html: closeIconHtml }}
										/>
									</span>
									{innerBlocksProps.children}
								</div>
							)}
						</div>
					)}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file

		var attributes = props.attributes;
		var wrapper = attributes.wrapper;

		var blockId = attributes.blockId;

		const blockProps = useBlockProps.save({
			className: ` ${blockId} pg-popup`,
		});

		return <InnerBlocks.Content />;

		//return null;
	},
});
