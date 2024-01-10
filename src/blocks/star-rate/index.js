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
	RadioControl,
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
} from "@wordpress/components";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import apiFetch from "@wordpress/api-fetch";
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
import { applyFilters } from "@wordpress/hooks";

import PGIconPicker from "../../components/icon-picker";
import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";

import PGDropdown from "../../components/dropdown";
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
					d="M160 87.0728H0V97.0728H160V87.0728Z"
					fill="url(#paint0_linear_61_612)"
				/>
				<path
					d="M141 106.073H20V115.073H141V106.073Z"
					fill="url(#paint1_linear_61_612)"
				/>
				<path
					d="M80.1098 44C80.3364 44 80.4875 44 80.7141 44C81.4695 44.2275 81.9227 44.7582 82.2248 45.4406C82.4514 45.9713 82.678 46.4262 82.9046 46.957C83.6599 48.625 84.4909 50.293 85.2462 51.9611C85.5484 52.4918 85.926 52.8709 86.5303 52.9467C87.059 53.0225 87.5877 53.0984 88.041 53.1742C89.9293 53.4775 91.8177 53.7807 93.706 54.0082C94.4614 54.084 94.9902 54.5389 95.2923 55.2213C95.5945 55.9795 95.4434 56.6619 94.9147 57.1926C94.7636 57.4201 94.537 57.5717 94.3104 57.7992C92.7241 59.3914 91.1379 60.9836 89.6273 62.5758C89.174 63.0307 89.023 63.5615 89.0985 64.168C89.4762 66.7459 89.9293 69.2479 90.307 71.8258C90.4581 72.584 90.2315 73.2664 89.5516 73.7213C88.9474 74.1762 88.2677 74.1762 87.5879 73.7971C85.5484 72.6598 83.5089 71.5225 81.4695 70.3852C80.7141 69.9303 80.0344 69.9303 79.2791 70.3852C77.2396 71.5225 75.1245 72.6598 73.0851 73.7971C72.4053 74.1762 71.8011 74.1762 71.1213 73.7213C70.517 73.2664 70.2149 72.6598 70.366 71.9016C70.7436 69.4754 71.1212 67.0492 71.5744 64.5471C71.7255 63.7889 71.65 63.1065 71.1213 62.5C69.5351 60.9078 67.9488 59.3155 66.3626 57.6475C65.9094 57.1926 65.4562 56.7377 65.3052 56.0553C65.3052 55.8279 65.3052 55.6004 65.3052 55.3729C65.3052 55.2971 65.3806 55.2971 65.3806 55.2213C65.6072 54.4631 66.1359 53.9324 66.8913 53.7807C67.1179 53.7049 67.3445 53.7049 67.4956 53.7049C69.535 53.4016 71.5745 53.0226 73.614 52.7951C74.5959 52.6435 75.2757 52.2643 75.6534 51.3545C76.5598 49.3074 77.5418 47.2603 78.5237 45.2131C78.9014 44.834 79.3545 44.2275 80.1098 44Z"
					fill="url(#paint2_linear_61_612)"
				/>
				<path
					d="M34.8048 44C35.0314 44 35.1824 44 35.409 44C36.1643 44.2275 36.6175 44.7582 36.9197 45.4406C37.1463 45.9713 37.373 46.4262 37.5996 46.957C38.3549 48.625 39.1857 50.293 39.941 51.9611C40.2432 52.4918 40.621 52.8709 41.2253 52.9467C41.754 53.0225 42.2828 53.0984 42.736 53.1742C44.6243 53.4775 46.5127 53.7807 48.4011 54.0082C49.1564 54.084 49.685 54.5389 49.9872 55.2213C50.2893 55.9795 50.1382 56.6619 49.6095 57.1926C49.4584 57.4201 49.2318 57.5717 49.0052 57.7992C47.419 59.3914 45.8328 60.9836 44.3221 62.5758C43.8689 63.0307 43.7178 63.5615 43.7934 64.168C44.171 66.7459 44.6243 69.2479 45.002 71.8258C45.1531 72.584 44.9265 73.2664 44.2467 73.7213C43.6424 74.1762 42.9625 74.1762 42.2827 73.7971C40.2433 72.6598 38.2037 71.5225 36.1643 70.3852C35.409 69.9303 34.7292 69.9303 33.9739 70.3852C31.9345 71.5225 29.8195 72.6598 27.7801 73.7971C27.1003 74.1762 26.4959 74.1762 25.8161 73.7213C25.2118 73.2664 24.9097 72.6598 25.0608 71.9016C25.4384 69.4754 25.8162 67.0492 26.2694 64.5471C26.4205 63.7889 26.3449 63.1065 25.8161 62.5C24.2299 60.9078 22.6436 59.3155 21.0574 57.6475C20.6042 57.1926 20.1511 56.7377 20 56.0553C20 55.8279 20 55.6004 20 55.3729C20 55.2971 20.0756 55.2971 20.0756 55.2213C20.3022 54.4631 20.831 53.9324 21.5863 53.7807C21.8129 53.7049 22.0394 53.7049 22.1904 53.7049C24.2299 53.4016 26.2694 53.0226 28.3088 52.7951C29.2907 52.6435 29.9705 52.2643 30.3482 51.3545C31.2546 49.3074 32.2366 47.2603 33.2185 45.2131C33.5962 44.834 33.974 44.2275 34.8048 44Z"
					fill="url(#paint3_linear_61_612)"
				/>
				<path
					d="M125.415 44C125.641 44 125.792 44 126.019 44C126.774 44.2275 127.227 44.7582 127.53 45.4406C127.756 45.9713 127.983 46.4262 128.209 46.957C128.965 48.625 129.796 50.293 130.551 51.9611C130.853 52.4918 131.231 52.8709 131.835 52.9467C132.364 53.0225 132.892 53.0984 133.346 53.1742C135.234 53.4775 137.122 53.7807 139.011 54.0082C139.766 54.084 140.295 54.5389 140.597 55.2213C140.899 55.9795 140.748 56.6619 140.219 57.1926C140.068 57.4201 139.842 57.5717 139.615 57.7992C138.029 59.3914 136.443 60.9836 134.932 62.5758C134.479 63.0307 134.328 63.5615 134.403 64.168C134.781 66.7459 135.234 69.2479 135.612 71.8258C135.763 72.584 135.536 73.2664 134.856 73.7213C134.252 74.1762 133.572 74.1762 132.893 73.7971C130.853 72.6598 128.814 71.5225 126.774 70.3852C126.019 69.9303 125.339 69.9303 124.584 70.3852C122.544 71.5225 120.429 72.6598 118.39 73.7971C117.71 74.1762 117.106 74.1762 116.426 73.7213C115.822 73.2664 115.52 72.6598 115.671 71.9016C116.048 69.4754 116.426 67.0492 116.879 64.5471C117.03 63.7889 116.955 63.1065 116.426 62.5C114.84 60.9078 113.253 59.3155 111.667 57.6475C111.214 57.1926 110.761 56.7377 110.61 56.0553C110.61 55.8279 110.61 55.6004 110.61 55.3729C110.61 55.2971 110.685 55.2971 110.685 55.2213C110.912 54.4631 111.441 53.9324 112.196 53.7807C112.423 53.7049 112.649 53.7049 112.8 53.7049C114.84 53.4016 116.879 53.0226 118.919 52.7951C119.901 52.6435 120.58 52.2643 120.958 51.3545C121.864 49.3074 122.846 47.2603 123.828 45.2131C124.206 44.834 124.659 44.2275 125.415 44Z"
					fill="url(#paint4_linear_61_612)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_612"
						x1="0"
						y1="92.0728"
						x2="160"
						y2="92.0727"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_612"
						x1="20"
						y1="110.573"
						x2="141"
						y2="110.573"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_612"
						x1="65.3052"
						y1="59.0363"
						x2="95.4463"
						y2="59.0363"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_612"
						x1="20"
						y1="59.0363"
						x2="50.1412"
						y2="59.0363"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_612"
						x1="110.61"
						y1="59.0363"
						x2="140.751"
						y2="59.0363"
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
		var icon = attributes.icon;

		var iconsIdle = attributes.iconsIdle;
		var iconsFilled = attributes.iconsFilled;
		var summary = attributes.summary;

		var prefix = attributes.prefix;
		var postfix = attributes.postfix;

		var blockCssY = attributes.blockCssY;

		var postId = context["postId"];
		var postType = context["postType"];

		var breakPointX = myStore.getBreakPoint();

		const [isLoading, setisLoading] = useState(false);
		const [currentPostContent, setCurrentpostContent] = useEntityProp(
			"postType",
			postType,
			"content",
			postId
		);
		const [customFields, setCustomFields] = useState({});

		const [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);

		const [iconHtml, setIconHtml] = useState("");

		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		const textSelector = blockClass + " .text";
		const iconSelector = blockClass + " .text-icon";
		const iconsFilledSelector = blockClass + " .icons-filled";
		const iconsIdleSelector = blockClass + " .icons-idle";

		const summarySelector = blockClass + " .summary";

		const prefixSelector = blockClass + " .prefix";
		const postfixSelector = blockClass + " .postfix";

		var map = {
			"{rating_count}": "",
			// "{review_count}": "",
			"{average_rating}": "",
			// "{product_title}": "",
		};

		const [ratingMap, setratingMap] = useState(map);

		useEffect(() => {
			var map = {
				"{rating_count}": summary.options.rating_count,
				// "{review_count}": res.review_count,
				"{average_rating}": summary.options.avg_rating,
				// "{product_title}": res.post_title,
			};

			setratingMap(map);
		}, [summary.options.rating_count, summary.options.avg_rating]);

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();

			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[iconSelector] = icon;
			blockCssObj[iconsIdleSelector] = iconsIdle;
			blockCssObj[iconsFilledSelector] = iconsFilled;
			blockCssObj[summarySelector] = summary;
			blockCssObj[prefixSelector] = prefix;
			blockCssObj[postfixSelector] = postfix;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		function replaceAll(str, correction) {
			Object.keys(correction).forEach((key) => {
				str = str.replaceAll(key, correction[key]);
			});

			return str;
		}

		function getMetaField(metaKey) {
			apiFetch({
				path: "/post-grid/v2/get_post_meta",
				method: "POST",
				data: { postId: postId, meta_key: metaKey },
			}).then((res) => {
				if (res["meta_value"] != undefined && res["meta_value"].length > 0) {
					customFields[metaKey] = res["meta_value"];
					setCustomFields({});
					setCustomFields(customFields);
				}
			});
		}

		var linkToArgsBasic = {
			postUrl: { label: "Post URL", value: "postUrl" },
			homeUrl: { label: "Home URL", value: "homeUrl" },
			authorUrl: { label: "Author URL", value: "authorUrl" },
			authorLink: { label: "Author Link", value: "authorLink" },
			authorMail: { label: "Author Mail", value: "authorMail", isPro: true },
			authorMeta: { label: "Author Meta", value: "authorMeta", isPro: true },
			customField: { label: "Custom Field", value: "customField", isPro: true },

			customUrl: { label: "Custom URL", value: "customUrl", isPro: true },
		};

		let linkToArgs = applyFilters("linkToArgs", linkToArgsBasic);

		const [linkPickerExcerpt, setLinkPickerExcerpt] = useState(false);
		const [linkPickerText, setLinkPickerText] = useState(false);

		useEffect(() => {
			var iconSrc = icon.options.iconSrc;

			var iconHtml = `<span className="${iconSrc}"></span>`;

			setIconHtml(iconHtml);
		}, [icon]);

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
				var blockCssYX = attributes.blockCssY;

				var blockCssObj = {};

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

		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
		}

		function setFieldLinkTo(option, index) {
			var options = { ...icon.options, linkTo: option.value };
			setAttributes({ icon: { ...icon, options: options } });
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
		function onChangeStyleSummary(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, summary);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ summary: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				summarySelector
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

		function onRemoveStyleSummary(sudoScource, key) {
			var object = myStore.deletePropertyDeep(summary, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ summary: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				summarySelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleSummary(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, summary);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ summary: object });
		}

		function onBulkAddSummary(sudoScource, cssObj) {
			let obj = Object.assign({}, summary);
			obj[sudoScource] = cssObj;

			setAttributes({ summary: obj });

			var selector = myStore.getElementSelector(sudoScource, summarySelector);
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

		function onResetSummary(sudoScources) {
			let obj = Object.assign({}, summary);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						summarySelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ summary: obj });
		}

		function onBulkAddIconsIdle(sudoScource, cssObj) {
			let obj = Object.assign({}, iconsIdle);
			obj[sudoScource] = cssObj;

			setAttributes({ iconsIdle: obj });

			var selector = myStore.getElementSelector(sudoScource, iconsIdleSelector);
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

		function onResetIconsIdle(sudoScources) {
			let obj = Object.assign({}, iconsIdle);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						iconsIdleSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ iconsIdle: obj });
		}

		function onBulkAddIconsFilled(sudoScource, cssObj) {
			let obj = Object.assign({}, iconsFilled);
			obj[sudoScource] = cssObj;

			setAttributes({ iconsFilled: obj });

			var selector = myStore.getElementSelector(
				sudoScource,
				iconsFilledSelector
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

		function onResetIconsFilled(sudoScources) {
			let obj = Object.assign({}, iconsFilled);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						iconsFilledSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ iconsFilled: obj });
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

		var [linkAttrItemsText, setlinkAttrItemsText] = useState({}); // Using the hook.
		var [wrapAttrItems, setwrapAttrItems] = useState({}); // Using the hook.

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		useEffect(() => {
			var sdsd = {};
			icon.options.linkAttr.map((x) => {
				if (x.val) sdsd[x.id] = x.val;
			});

			setlinkAttrItemsText(sdsd);
		}, [icon]);

		useEffect(() => {
			var sdsd = {};
			if (wrapper.options.attr != undefined) {
				wrapper.options.attr.map((x) => {
					if (x.val) sdsd[x.id] = x.val;
				});
			}

			setwrapAttrItems(sdsd);
		}, [wrapper]);

		var postUrl =
			icon.options.customUrl != undefined && icon.options.customUrl.length > 0
				? icon.options.customUrl
				: currentPostUrl;

		const CustomTag = `${wrapper.options.tag}`;

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
									{/* <PanelRow>
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
												{ label: "BUTTON", value: "button" },
											]}
											onChange={(newVal) => {
												var options = { ...wrapper.options, tag: newVal };
												setAttributes({
													wrapper: { ...wrapper, options: options },
												});
											}}
										/>
									</PanelRow> */}

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Custom Attributes
										</label>
										<div
											// className=" cursor-pointer px-3 text-white py-1 bg-blue-600"
											className="flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-800 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
											onClick={(ev) => {
												if (wrapper.options.attr == undefined) {
													wrapper.options.attr = {};
												}
												var sdsd = wrapper.options.attr.concat({
													id: "",
													val: "",
												});

												var options = { ...wrapper.options, attr: sdsd };
												setAttributes({
													wrapper: { ...wrapper, options: options },
												});
											}}>
											Add
										</div>
									</PanelRow>

									{wrapper.options.attr != undefined &&
										wrapper.options.attr.map((x, i) => {
											return (
												<div className="my-2">
													<PanelRow>
														<InputControl
															placeholder="Name"
															className="mr-2"
															value={wrapper.options.attr[i].id}
															onChange={(newVal) => {
																wrapper.options.attr[i].id = newVal;

																var ssdsd = wrapper.options.attr.concat([]);

																var options = {
																	...wrapper.options,
																	attr: ssdsd,
																};
																setAttributes({
																	wrapper: { ...wrapper, options: options },
																});
															}}
														/>

														<InputControl
															className="mr-2"
															placeholder="Value"
															value={x.val}
															onChange={(newVal) => {
																wrapper.options.attr[i].val = newVal;
																var ssdsd = wrapper.options.attr.concat([]);

																var options = {
																	...wrapper.options,
																	attr: ssdsd,
																};
																setAttributes({
																	wrapper: { ...wrapper, options: options },
																});
															}}
														/>
														<span
															// className="text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close"
															className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
															onClick={(ev) => {
																wrapper.options.attr.splice(i, 1);

																var ssdsd = wrapper.options.attr.concat([]);

																var options = {
																	...wrapper.options,
																	attr: ssdsd,
																};
																setAttributes({
																	wrapper: { ...wrapper, options: options },
																});
															}}>
															<Icon icon={close} />
														</span>
													</PanelRow>
												</div>
											);
										})}
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
							title="Icons"
							initialOpen={false}>
							<PanelBody
								className="font-medium text-slate-900 "
								title="Icons Wrap"
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
												Rating?
											</label>
											<InputControl
												type="number"
												step="0.01"
												value={summary.options.avg_rating}
												onChange={(newVal) => {
													var options = {
														...summary.options,
														avg_rating: newVal,
													};
													setAttributes({
														summary: { ...summary, options: options },
													});

													onChangeStyleIconsFilled(
														"styles",
														parseFloat(newVal) * 20 + "%",
														"width"
													);
												}}
											/>
										</PanelRow>
										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Rating Count
											</label>
											<InputControl
												type="number"
												value={summary.options.rating_count}
												onChange={(newVal) => {
													var options = {
														...summary.options,
														rating_count: newVal,
													};
													setAttributes({
														summary: { ...summary, options: options },
													});
												}}
											/>
										</PanelRow>
										<PanelRow className="pb-2">
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

										<ToggleControl
											label="Linked to URL?"
											help={
												icon.options.isLink ? "Linked to URL?" : "Not Linked."
											}
											checked={icon.options.isLink ? true : false}
											onChange={(e) => {
												var options = {
													...icon.options,
													isLink: icon.options.isLink ? false : true,
												};
												setAttributes({ icon: { ...icon, options: options } });
											}}
										/>

										{icon.options.isLink && (
											<>
												<PanelRow>
													<label for="" className="font-medium text-slate-900 ">
														Link To
													</label>

													<PGDropdown
														position="bottom right"
														variant="secondary"
														options={linkToArgs}
														// buttonTitle="Choose"
														buttonTitle={
															linkToArgs[icon.options.linkTo] != undefined
																? linkToArgs[icon.options.linkTo].label
																: "Choose"
														}
														onChange={setFieldLinkTo}
														values={[]}></PGDropdown>
												</PanelRow>

												{icon.options.linkTo == "authorMeta" && (
													<PanelRow>
														<label
															for=""
															className="font-medium text-slate-900 ">
															Author Meta Key
														</label>

														<InputControl
															value={icon.options.linkToAuthorMeta}
															onChange={(newVal) => {
																var options = {
																	...icon.options,
																	linkToAuthorMeta: newVal,
																};
																setAttributes({
																	icon: { ...icon, options: options },
																});
															}}
														/>
													</PanelRow>
												)}

												{icon.options.linkTo == "customField" && (
													<PanelRow>
														<label
															for=""
															className="font-medium text-slate-900 ">
															Custom Meta Key
														</label>

														<InputControl
															value={icon.options.linkToAuthorMeta}
															onChange={(newVal) => {
																var options = {
																	...icon.options,
																	linkToAuthorMeta: newVal,
																};
																setAttributes({
																	icon: { ...icon, options: options },
																});
															}}
														/>
													</PanelRow>
												)}

												<PanelRow>
													<label for="" className="font-medium text-slate-900 ">
														Link Target
													</label>

													<SelectControl
														label=""
														value={icon.options.linkTarget}
														options={[
															{ label: "_self", value: "_self" },
															{ label: "_blank", value: "_blank" },
															{ label: "_parent", value: "_parent" },
															{ label: "_top", value: "_top" },
														]}
														onChange={(newVal) => {
															var options = {
																...icon.options,
																linkTarget: newVal,
															};
															setAttributes({
																icon: { ...icon, options: options },
															});
														}}
													/>
												</PanelRow>
											</>
										)}

										{icon.options.linkTo == "customUrl" && (
											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Custom Url
												</label>

												<div className="relative">
													<Button
														className={linkPickerText ? "!bg-gray-400" : ""}
														icon={link}
														onClick={(ev) => {
															setLinkPickerText((prev) => !prev);
														}}></Button>
													{icon.options.customUrl.length > 0 && (
														<Button
															className="!text-red-500 ml-2"
															icon={linkOff}
															onClick={(ev) => {
																var options = {
																	...icon.options,
																	customUrl: "",
																};
																setAttributes({
																	icon: { ...icon, options: options },
																});
															}}></Button>
													)}
													{linkPickerText && (
														<Popover position="bottom right">
															<LinkControl
																settings={[]}
																value={icon.options.customUrl}
																onChange={(newVal) => {
																	var options = {
																		...icon.options,
																		customUrl: newVal.url,
																	};
																	setAttributes({
																		icon: { ...icon, options: options },
																	});
																	//setLinkPickerText(false)
																}}
															/>

															<div className="p-2">
																<span className="font-bold">Linked to:</span>{" "}
																{icon.options.customUrl.length != 0
																	? icon.options.customUrl
																	: "No link"}{" "}
															</div>
														</Popover>
													)}
												</div>
											</PanelRow>
										)}

										{icon.options.isLink && (
											<div>
												<PanelRow>
													<label for="" className="font-medium text-slate-900 ">
														Custom Attributes
													</label>
													<div
														// className=" cursor-pointer px-3 text-white py-1 bg-blue-600"
														className="flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-800 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
														onClick={(ev) => {
															var sdsd = icon.options.linkAttr.concat({
																id: "",
																val: "",
															});

															var options = { ...icon.options, linkAttr: sdsd };
															setAttributes({
																icon: { ...icon, options: options },
															});
														}}>
														Add
													</div>
												</PanelRow>

												{icon.options.linkAttr != undefined &&
													icon.options.linkAttr.map((x, i) => {
														return (
															<div className="my-2">
																<PanelRow>
																	<InputControl
																		placeholder="Name"
																		className="mr-2"
																		value={icon.options.linkAttr[i].id}
																		onChange={(newVal) => {
																			icon.options.linkAttr[i].id = newVal;

																			var ssdsd = icon.options.linkAttr.concat(
																				[]
																			);

																			var options = {
																				...icon.options,
																				linkAttr: ssdsd,
																			};
																			setAttributes({
																				icon: { ...icon, options: options },
																			});
																		}}
																	/>

																	<InputControl
																		className="mr-2"
																		placeholder="Value"
																		value={x.val}
																		onChange={(newVal) => {
																			icon.options.linkAttr[i].val = newVal;
																			var ssdsd = icon.options.linkAttr.concat(
																				[]
																			);

																			var options = {
																				...icon.options,
																				linkAttr: ssdsd,
																			};
																			setAttributes({
																				icon: { ...icon, options: options },
																			});
																		}}
																	/>
																	<span
																		// className="text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close"
																		className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																		onClick={(ev) => {
																			icon.options.linkAttr.splice(i, 1);

																			var ssdsd = icon.options.linkAttr.concat(
																				[]
																			);

																			var options = {
																				...icon.options,
																				linkAttr: ssdsd,
																			};
																			setAttributes({
																				icon: { ...icon, options: options },
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
								title="Icons Idle"
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
											obj={iconsIdle}
											onChange={onChangeStyleIconsIdle}
											onAdd={onAddStyleIconsIdle}
											onRemove={onRemoveStyleIconsIdle}
											onBulkAdd={onBulkAddIconsIdle}
											onReset={onResetIconsIdle}
										/>
									</PGtab>
									<PGtab name="css"></PGtab>
								</PGtabs>
							</PanelBody>

							<PanelBody
								className="font-medium text-slate-900 "
								title="Icons Filled"
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
											obj={iconsFilled}
											onChange={onChangeStyleIconsFilled}
											onAdd={onAddStyleIconsFilled}
											onRemove={onRemoveStyleIconsFilled}
											onBulkAdd={onBulkAddIconsFilled}
											onReset={onResetIconsFilled}
										/>
									</PGtab>
									<PGtab name="css"></PGtab>
								</PGtabs>
							</PanelBody>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Summary"
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
									<RadioControl
										label="Summary Type"
										selected={summary.options.type}
										options={[
											{ label: "None", value: "" },
											{
												label: "123 customer reviews",
												value: "{rating_count} customer reviews",
											},
											{ label: "4.50/5.00", value: "{average_rating}/5.00" },
											{
												label: "4.50 out of 5.00",
												value: "{average_rating} out of 5.00",
											},
											{
												label: "4.50(123 reviews)",
												value: "{average_rating}({rating_count} reviews)",
											},
										]}
										onChange={(value) => {
											var options = { ...summary.options, type: value };
											setAttributes({
												summary: { ...summary, options: options },
											});
										}}
									/>

									<div className="my-3">
										<label for="" className="font-medium text-slate-900 ">
											Custom Summary{" "}
										</label>

										<InputControl
											value={summary.options.typeCustom}
											placeholder="{average_rating} out of 5.00"
											onChange={(newVal) => {
												var options = {
													...summary.options,
													typeCustom: newVal,
												};
												setAttributes({
													summary: { ...summary, options: options },
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
											<code>{"{average_rating}"}</code>
										</li>
									</ul>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={summary}
										onChange={onChangeStyleSummary}
										onAdd={onAddStyleSummary}
										onRemove={onRemoveStyleSummary}
										onBulkAdd={onBulkAddSummary}
										onReset={onResetSummary}
									/>
								</PGtab>
								<PGtab name="css"></PGtab>
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
								blockName={"star-rate"}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
							/>
						</PanelBody>

						<div className="px-3">
							<PGMailSubsctibe />
							<PGContactSupport
								utm={{
									utm_source: "BlockReadMore",
									utm_campaign: "PostGridCombo",
									utm_content: "BlockOptions",
								}}
							/>
						</div>
						<div className="px-3">
							<PGTutorials slug="star-rate" />
						</div>
					</div>
				</InspectorControls>

				<>
					{wrapper.options.tag && (
						<CustomTag {...blockProps} {...wrapAttrItems}>
							{prefix.options.text && (
								<span className={prefix.options.class}>
									{prefix.options.text}
								</span>
							)}

							{icon.options.isLink && (
								<>
									<a
										className={icon.options.class}
										onClick={handleLinkClick}
										{...linkAttrItemsText}
										target={icon.options.linkTarget}
										href={postUrl}>
										<div className="icons-idle">
											<span
												// className={icon.options.class}
												dangerouslySetInnerHTML={{ __html: iconHtml }}
											/>
											<span
												// className={icon.options.class}
												dangerouslySetInnerHTML={{ __html: iconHtml }}
											/>
											<span
												// className={icon.options.class}
												dangerouslySetInnerHTML={{ __html: iconHtml }}
											/>
											<span
												// className={icon.options.class}
												dangerouslySetInnerHTML={{ __html: iconHtml }}
											/>
											<span
												// className={icon.options.class}
												dangerouslySetInnerHTML={{ __html: iconHtml }}
											/>
										</div>
										<div className="icons-filled">
											<span
												// className={icon.options.class}
												dangerouslySetInnerHTML={{ __html: iconHtml }}
											/>
											<span
												// className={icon.options.class}
												dangerouslySetInnerHTML={{ __html: iconHtml }}
											/>
											<span
												// className={icon.options.class}
												dangerouslySetInnerHTML={{ __html: iconHtml }}
											/>
											<span
												// className={icon.options.class}
												dangerouslySetInnerHTML={{ __html: iconHtml }}
											/>
											<span
												// className={icon.options.class}
												dangerouslySetInnerHTML={{ __html: iconHtml }}
											/>
										</div>
									</a>
								</>
							)}

							{!icon.options.isLink && (
								<div className="text-icon">
									<span className="icons-idle">
										<span
											// className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
										<span
											// className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
										<span
											// className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
										<span
											// className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
										<span
											// className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									</span>
									<span className="icons-filled">
										<span
											// className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
										<span
											// className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
										<span
											// className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
										<span
											// className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
										<span
											// className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									</span>
								</div>
							)}

							<div className="summary">
								{summary.options.typeCustom.length == 0 && (
									<>{replaceAll(summary.options.type, ratingMap)}</>
								)}
								{summary.options.typeCustom.length > 0 && (
									<>{replaceAll(summary.options.typeCustom, ratingMap)}</>
								)}
							</div>

							{postfix.options.text && (
								<span className={postfix.options.class}>
									{postfix.options.text}
								</span>
							)}
						</CustomTag>
					)}

					{/* {wrapper.options.tag.length == 0 && (
						<div {...blockProps}>
							{prefix.options.text && (
								<span className={prefix.options.class}>
									{prefix.options.text}
								</span>
							)}

							{icon.options.isLink && (
								<a
									className="text"
									onClick={handleLinkClick}
									{...linkAttrItemsText}
									target={icon.options.linkTarget}
									href={postUrl}>
									<span
										className={icon.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
									<span
										className={icon.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
									<span
										className={icon.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
									<span
										className={icon.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
									<span
										className={icon.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
								</a>
							)}
							{!icon.options.isLink && (
								<>
									<span
										className={icon.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
									<span
										className={icon.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
									<span
										className={icon.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
									<span
										className={icon.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
									<span
										className={icon.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
								</>
							)}

							{postfix.options.text && (
								<span className={postfix.options.class}>
									{postfix.options.text}
								</span>
							)}
						</div>
					)} */}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
