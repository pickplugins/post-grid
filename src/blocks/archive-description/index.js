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
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";

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
				height="160"
				viewBox="0 0 160 160"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M68.7776 49.5732H20.9824C19.9261 49.5732 18.913 49.9929 18.1661 50.7398C17.4191 51.4868 16.9995 52.4998 16.9995 53.5562V93.3855C16.9995 94.4418 17.4191 95.4549 18.1661 96.2018C18.913 96.9488 19.9261 97.3684 20.9824 97.3684H68.7776C69.8339 97.3684 70.847 96.9488 71.594 96.2018C72.3409 95.4549 72.7605 94.4418 72.7605 93.3855V53.5562C72.7605 52.4998 72.3409 51.4868 71.594 50.7398C70.847 49.9929 69.8339 49.5732 68.7776 49.5732ZM64.7947 89.4025H24.9654V57.5391H64.7947V89.4025Z"
					fill="url(#paint0_linear_61_482)"
				/>
				<path
					d="M152.42 61.5222H88.6929V69.4881H152.42V61.5222Z"
					fill="url(#paint1_linear_61_482)"
				/>
				<path
					d="M136.488 77.4539H88.6929V85.4197H136.488V77.4539Z"
					fill="url(#paint2_linear_61_482)"
				/>
				<path
					d="M68.7776 112.205H20.9824C19.9261 112.205 18.913 112.624 18.1661 113.371C17.4191 114.118 16.9995 115.131 16.9995 116.188V156.017C16.9995 157.073 17.4191 158.086 18.1661 158.833C18.913 159.58 19.9261 160 20.9824 160H68.7776C69.8339 160 70.847 159.58 71.594 158.833C72.3409 158.086 72.7605 157.073 72.7605 156.017V116.188C72.7605 115.131 72.3409 114.118 71.594 113.371C70.847 112.624 69.8339 112.205 68.7776 112.205ZM64.7947 152.034H24.9654V120.171H64.7947V152.034Z"
					fill="url(#paint3_linear_61_482)"
				/>
				<path
					d="M152.42 124.154H88.6929V132.12H152.42V124.154Z"
					fill="url(#paint4_linear_61_482)"
				/>
				<path
					d="M136.488 140.085H88.6929V148.051H136.488V140.085Z"
					fill="url(#paint5_linear_61_482)"
				/>
				<path d="M132 0H16.9995V11H132V0Z" fill="url(#paint6_linear_61_482)" />
				<path d="M82.9995 28H16.9995V33H82.9995V28Z" fill="#C15940" />
				<path d="M103 19H16.9995V24H103V19Z" fill="#C15940" />
				<defs>
					<linearGradient
						id="paint0_linear_61_482"
						x1="16.9995"
						y1="73.4708"
						x2="72.7605"
						y2="73.4708"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_482"
						x1="88.6929"
						y1="65.5051"
						x2="152.42"
						y2="65.5051"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_482"
						x1="88.6929"
						y1="81.4368"
						x2="136.488"
						y2="81.4368"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_482"
						x1="16.9995"
						y1="136.102"
						x2="72.7605"
						y2="136.102"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_482"
						x1="88.6929"
						y1="128.137"
						x2="152.42"
						y2="128.137"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_61_482"
						x1="88.6929"
						y1="144.068"
						x2="136.488"
						y2="144.068"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint6_linear_61_482"
						x1="16.9995"
						y1="5.5"
						x2="132"
						y2="5.5"
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

		let archiveTitle = attributes.archiveTitle;
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

		var archiveLinkToArgsBasic = {
			none: { label: "No Link", value: "" },
			archiveUrl: { label: "Archive URL", value: "archiveUrl" },
			homeUrl: { label: "Home URL", value: "homeUrl" },
			customUrl: { label: "Custom", value: "customUrl" },
		};

		let archiveLinkToArgs = applyFilters(
			"archiveLinkToArgs",
			archiveLinkToArgsBasic
		);

		var archiveTypes = {
			auto: { label: "Auto Detect", value: "auto" },
			// 'author': { label: 'Author', value: 'author' },
			// 'category': { label: 'Category', value: 'category' },
			// 'tag': { label: 'Tag', value: 'tag' },
			// 'taxonomy': { label: 'Taxonomy', value: 'taxonomy' },
			// 'search': { label: 'Search', value: 'search' },
			// 'index': { label: 'Index', value: 'index' },
			// 'year': { label: 'Year', value: 'year' },
			// 'month': { label: 'Month', value: 'month' },
			// 'date': { label: 'Date', value: 'date' },

			// 'wcCatalog': { label: 'WooCommerce Catalog', value: 'wcCatalog' },
			// 'wcSearch': { label: 'WooCommerce Search', value: 'wcSearch' },
		};

		var dateFormats = {
			"Y-M-d": { label: "2022-May-25", value: "Y-M-d" },
			"Y-m-d": { label: "2022-05-25", value: "Y-m-d" },
			"d-m-y": { label: "25-05-2022", value: "d-m-y" },
			"d/m/y": { label: "25/05/2022", value: "d/m/y" },
			"y-m-d": { label: "2022-05-25", value: "y-m-d" },
			"y/m/d": { label: "2022/05/25", value: "y/m/d" },
			"D M y": { label: "Sun May 2022", value: "D M y" },
			"D M d, y": { label: "Sun May 11, 2022", value: "D M d, y" },
			"M D d, y": { label: "May Sun 11, 2022", value: "M D d, y" },
			"M d, y": { label: "May 11, 2022", value: "M d, y" },

			"d M y": { label: "25 May 2022", value: "d M y" },
		};

		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;

		var archiveTitleSelector = "";

		if (wrapper.options.tag.length != 0) {
			if (archiveTitle.options.linkTo.length > 0) {
				archiveTitleSelector = blockClass + " a";
			} else {
				archiveTitleSelector = blockClass;
				//archiveTitleSelector = blockClass + ' .archiveTitle';
			}
		} else {
			archiveTitleSelector = blockClass;
		}

		const prefixSelector = blockClass + " .prefix";
		const postfixSelector = blockClass + " .postfix";
		const iconSelector = blockClass + " .postdate-icon";

		const [archiveTitleEdited, setarchiveTitleEdited] = useState("Hello %s");

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
			blockCssObj[archiveTitleSelector] = archiveTitle;
			blockCssObj[iconSelector] = icon;
			blockCssObj[prefixSelector] = prefix;
			blockCssObj[postfixSelector] = postfix;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

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
			var options = { ...archiveTitle.options, linkTo: option.value };
			setAttributes({ archiveTitle: { ...archiveTitle, options: options } });
		}

		useEffect(() => {
			var archiveType = archiveTitle.options.archiveType;

			if (archiveType == "auto") {
				//archiveTitleEdited = archiveTitle.options.customLabel;
				setarchiveTitleEdited(archiveTitle.options.customLabel);
			}
		}, [archiveTitle]);

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
				// var blockId = attributes.blockId
				var wrapperX = attributes.wrapper;
				var archiveTitleX = attributes.archiveTitle;
				var iconX = attributes.icon;
				var prefixX = attributes.prefix;
				var postfixX = attributes.postfix;
				var blockCssYX = attributes.blockCssY;

				var blockCssObj = {};

				if (wrapperX != undefined) {
					var wrapperY = { ...wrapperX, options: wrapper.options };
					setAttributes({ wrapper: wrapperY });
					blockCssObj[wrapperSelector] = wrapperY;
				}
				if (archiveTitleX != undefined) {
					var archiveTitleY = {
						...archiveTitleX,
						options: archiveTitle.options,
					};
					setAttributes({ archiveTitle: archiveTitleY });
					blockCssObj[archiveTitleSelector] = archiveTitleY;
				}
				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[iconSelector] = iconY;
				}

				if (prefixX != undefined) {
					var prefixY = { ...prefixX, options: prefix.options };
					console.log(prefixY);
					setAttributes({ prefix: prefixY });
					blockCssObj[prefixSelector] = prefixY;
				}
				if (postfixX != undefined) {
					var postfixY = { ...postfixX, options: postfix.options };
					console.log(postfixY);
					setAttributes({ postfix: postfixY });
					blockCssObj[postfixSelector] = postfixY;
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

		function onPickCssLibraryArchiveTitle(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				archiveTitle[sudoScource] = sudoScourceArgs;
			});

			var archiveTitleX = Object.assign({}, archiveTitle);
			setAttributes({ archiveTitle: archiveTitleX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					archiveTitleSelector
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

		function onAddStyleWrapper(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, wrapper);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ wrapper: object });
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

		function onBulkAddArchiveTitle(sudoScource, cssObj) {
			let obj = Object.assign({}, archiveTitle);
			obj[sudoScource] = cssObj;

			setAttributes({ archiveTitle: obj });

			var selector = myStore.getElementSelector(
				sudoScource,
				archiveTitleSelector
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

		function onChangeStyleArchiveTitle(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, archiveTitle);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ archiveTitle: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				archiveTitleSelector
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

		function onRemoveStyleArchiveTitle(sudoScource, key) {
			var object = myStore.deletePropertyDeep(archiveTitle, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ archiveTitle: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				archiveTitleSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleArchiveTitle(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, archiveTitle);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ archiveTitle: object });
		}

		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.

		useEffect(() => {
			linkAttrObj();
		}, [archiveTitle]);

		var linkAttrObj = () => {
			var sdsd = {};

			archiveTitle.options.linkAttr.map((x) => {
				if (x.val) sdsd[x.id] = x.val;
			});

			setlinkAttrItems(sdsd);
		};

		var postUrl =
			archiveTitle.options.customUrl != undefined &&
			archiveTitle.options.customUrl.length > 0
				? archiveTitle.options.customUrl
				: currentPostUrl;

		const CustomTag = `${wrapper.options.tag}`;
		const CustomTagPostTitle = `${archiveTitle.options.tag}`;

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
												{ label: "span", value: "span" },
												{ label: "div", value: "div" },
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
							title="Archive Description"
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
									<PanelRow className="mb-4">
										<label for="" className="font-medium text-slate-900 ">
											Archive Type
										</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={archiveTypes}
											// buttonTitle="Choose"
											buttonTitle={
												archiveTypes[archiveTitle.options.archiveType] !=
												undefined
													? archiveTypes[archiveTitle.options.archiveType].label
													: "Choose"
											}
											onChange={(option, index) => {
												var options = {
													...archiveTitle.options,
													archiveType: option.value,
												};
												setAttributes({
													archiveTitle: { ...archiveTitle, options: options },
												});
											}}
											values={""}></PGDropdown>
									</PanelRow>

									<PanelRow className="mb-4">
										<label for="" className="font-medium text-slate-900 ">
											Custom Label
										</label>
										<InputControl
											className="mr-2"
											value={archiveTitle.options.customLabel}
											onChange={(newVal) => {
												var options = {
													...archiveTitle.options,
													customLabel: newVal,
												};
												setAttributes({
													archiveTitle: { ...archiveTitle, options: options },
												});
											}}
										/>
									</PanelRow>

									{(archiveTitle.options.archiveType == "year" ||
										archiveTitle.options.archiveType == "month" ||
										archiveTitle.options.archiveType == "day") && (
										<>
											<PanelRow className="mb-4">
												<label for="" className="font-medium text-slate-900 ">
													Date Format
												</label>
												<PGDropdown
													position="bottom right"
													variant="secondary"
													options={dateFormats}
													buttonTitle="Choose"
													onChange={(option, index) => {
														var options = {
															...archiveTitle.options,
															dateFormat: option.value,
														};
														setAttributes({
															archiveTitle: {
																...archiveTitle,
																options: options,
															},
														});
													}}
													values={""}></PGDropdown>
											</PanelRow>
											<PanelRow className="mb-4">
												<label for="" className="font-medium text-slate-900 ">
													Custom Format
												</label>
												<InputControl
													className="mr-2"
													value={archiveTitle.options.dateFormat}
													onChange={(newVal) => {
														var options = {
															...archiveTitle.options,
															dateFormat: newVal,
														};
														setAttributes({
															archiveTitle: {
																...archiveTitle,
																options: options,
															},
														});
													}}
												/>
											</PanelRow>

											{dateFormats[archiveTitle.options.dateFormat] !=
												undefined && (
												<div className="p-2 my-3 bg-gray-500 text-white">
													{dateFormats[archiveTitle.options.dateFormat].label}
												</div>
											)}
										</>
									)}

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Link To
										</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={archiveLinkToArgs}
											buttonTitle={
												archiveTitle.options.linkTo.length == 0
													? "Choose"
													: archiveLinkToArgs[archiveTitle.options.linkTo].label
											}
											onChange={setFieldLinkTo}
											values={[]}></PGDropdown>
									</PanelRow>

									{archiveTitle.options.linkTo == "customField" && (
										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Custom Field Key
											</label>
											<InputControl
												className="mr-2"
												value={archiveTitle.options.linkToMetaKey}
												onChange={(newVal) => {
													var options = {
														...archiveTitle.options,
														linkToMetaKey: newVal,
													};
													setAttributes({
														archiveTitle: { ...archiveTitle, options: options },
													});
												}}
											/>
										</PanelRow>
									)}

									{archiveTitle.options.linkTo == "customUrl" && (
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
												{archiveTitle.options.customUrl.length > 0 && (
													<Button
														className="!text-red-500 ml-2"
														icon={linkOff}
														onClick={(ev) => {
															var options = {
																...archiveTitle.options,
																customUrl: "",
															};
															setAttributes({
																archiveTitle: {
																	...archiveTitle,
																	options: options,
																},
															});
															setLinkPickerPosttitle(false);
														}}></Button>
												)}
												{linkPickerPosttitle && (
													<Popover position="bottom right">
														<LinkControl
															settings={[]}
															value={archiveTitle.options.customUrl}
															onChange={(newVal) => {
																var options = {
																	...archiveTitle.options,
																	customUrl: newVal.url,
																};

																setAttributes({
																	archiveTitle: {
																		...archiveTitle,
																		options: options,
																	},
																});
															}}
														/>

														<div className="p-2">
															<span className="font-bold">Linked to:</span>{" "}
															{archiveTitle.options.customUrl.length != 0
																? archiveTitle.options.customUrl
																: "No link"}{" "}
														</div>
													</Popover>
												)}
											</div>
										</PanelRow>
									)}

									{archiveTitle.options.linkTo.length == 0 && (
										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Custom Tag
											</label>
											<SelectControl
												label=""
												value={archiveTitle.options.tag}
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
													var options = {
														...archiveTitle.options,
														tag: newVal,
													};
													setAttributes({
														archiveTitle: { ...archiveTitle, options: options },
													});
												}}
											/>
										</PanelRow>
									)}

									{archiveTitle.options.linkTo.length > 0 && (
										<div>
											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Link Target
												</label>

												<SelectControl
													label=""
													value={archiveTitle.options.linkTarget}
													options={[
														{ label: "Choose...", value: "" },

														{ label: "_self", value: "_self" },
														{ label: "_blank", value: "_blank" },
														{ label: "_parent", value: "_parent" },
														{ label: "_top", value: "_top" },
													]}
													onChange={(newVal) => {
														var options = {
															...archiveTitle.options,
															linkTarget: newVal,
														};
														setAttributes({
															archiveTitle: {
																...archiveTitle,
																options: options,
															},
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
													className="flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-800 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
													onClick={(ev) => {
														var sdsd = archiveTitle.options.linkAttr.concat({
															id: "",
															val: "",
														});

														var options = {
															...archiveTitle.options,
															linkAttr: sdsd,
														};
														setAttributes({
															archiveTitle: {
																...archiveTitle,
																options: options,
															},
														});

														linkAttrObj();
													}}>
													Add
												</div>
											</PanelRow>

											{archiveTitle.options.linkAttr.map((x, i) => {
												return (
													<div className="my-2">
														<PanelRow>
															<InputControl
																className="mr-2"
																placeholder="Name"
																value={archiveTitle.options.linkAttr[i].id}
																onChange={(newVal) => {
																	archiveTitle.options.linkAttr[i].id = newVal;

																	var ssdsd =
																		archiveTitle.options.linkAttr.concat([]);

																	var options = {
																		...archiveTitle.options,
																		linkAttr: ssdsd,
																	};
																	setAttributes({
																		archiveTitle: {
																			...archiveTitle,
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
																	archiveTitle.options.linkAttr[i].val = newVal;
																	var ssdsd =
																		archiveTitle.options.linkAttr.concat([]);

																	var options = {
																		...archiveTitle.options,
																		linkAttr: ssdsd,
																	};
																	setAttributes({
																		archiveTitle: {
																			...archiveTitle,
																			options: options,
																		},
																	});
																}}
															/>
															<span
																// className="text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close"
																className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																onClick={(ev) => {
																	archiveTitle.options.linkAttr.splice(i, 1);

																	var ssdsd =
																		archiveTitle.options.linkAttr.concat([]);

																	var options = {
																		...archiveTitle.options,
																		linkAttr: ssdsd,
																	};
																	setAttributes({
																		archiveTitle: {
																			...archiveTitle,
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
									<PGcssClassPicker
										tags={customTags}
										label="CSS Class"
										placeholder="Add Class"
										value={archiveTitle.options.class}
										onChange={(newVal) => {
											var options = { ...archiveTitle.options, class: newVal };
											setAttributes({
												archiveTitle: {
													styles: archiveTitle.styles,
													options: options,
												},
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={archiveTitle}
										onChange={onChangeStyleArchiveTitle}
										onAdd={onAddStyleArchiveTitle}
										onRemove={onRemoveStyleArchiveTitle}
										onBulkAdd={onBulkAddArchiveTitle}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={archiveTitle}
										onChange={onPickCssLibraryArchiveTitle}
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

												{
													label: "Before Archive Title",
													value: "beforeArchiveTitle",
												},
												{
													label: "After Archive Title",
													value: "afterArchiveTitle",
												},
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
									{/* <PanelRow>
										<label for=""  className="font-medium text-slate-900 " >Prefix</label>

										<InputControl
											value={prefix.options.text}
											onChange={(newVal) => {
												var options = { ...prefix.options, text: newVal };
												setAttributes({
													prefix: { styles: prefix.styles, options: options },
												});

												// setAttributes({ prefix: { text: newVal, class: prefix.options.class, color: prefix.color, backgroundColor: prefix.backgroundColor } })
											}}
										/>
									</PanelRow> */}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={prefix}
										onChange={onChangeStylePrefix}
										onAdd={onAddStylePrefix}
										onRemove={onRemoveStylePrefix}
										onBulkAdd={onBulkAddPrefix}
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
									{/* <PanelRow>
										<label for=""  className="font-medium text-slate-900 " >Postfix</label>

										<InputControl
											value={postfix.options.text}
											onChange={(newVal) => {
												var options = { ...postfix.options, text: newVal };
												setAttributes({
													postfix: { ...postfix, options: options },
												});

												// setAttributes({ postfix: { text: newVal, class: prefix.options.class, color: postfix.color, backgroundColor: postfix.backgroundColor } })
											}}
										/>
									</PanelRow> */}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={postfix}
										onChange={onChangeStylePostfix}
										onAdd={onAddStylePostfix}
										onRemove={onRemoveStylePostfix}
										onBulkAdd={onBulkAddPostfix}
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
								blockName={"archive-description"}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
							/>
						</PanelBody>

						<div className="px-3">
							<PGMailSubsctibe />
							<PGContactSupport
								utm={{
									utm_source: "BlockPostTitle",
									utm_campaign: "PostGridCombo",
									utm_content: "BlockOptions",
								}}
							/>
						</div>
						<div className="px-3">
							<PGTutorials slug="archive-description" />
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

							{archiveTitle.options.linkTo.length > 0 && (
								<a
									className="archiveTitle"
									onClick={handleLinkClick}
									{...linkAttrItems}
									target={archiveTitle.options.linkTarget}
									href={postUrl}>
									{icon.options.position == "beforeArchiveTitle" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{archiveTitleEdited}
									{icon.options.position == "afterArchiveTitle" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
								</a>
							)}

							{archiveTitle.options.linkTo.length == 0 && (
								<>
									{icon.options.position == "beforeArchiveTitle" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}

									{archiveTitleEdited}

									{icon.options.position == "afterArchiveTitle" && (
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

							{archiveTitle.options.linkTo.length > 0 && (
								<a
									className="archiveTitle"
									onClick={handleLinkClick}
									{...linkAttrItems}
									target={archiveTitle.options.linkTarget}
									href={postUrl}>
									{icon.options.position == "beforeArchiveTitle" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}

									{archiveTitleEdited}

									{icon.options.position == "afterArchiveTitle" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
								</a>
							)}

							{archiveTitle.options.linkTo.length == 0 && (
								<div {...blockProps}>
									{icon.options.position == "beforeArchiveTitle" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{archiveTitleEdited}
									{icon.options.position == "afterArchiveTitle" && (
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
