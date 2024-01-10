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

import colorsPresets from "../../colors-presets";
import PGDropdown from "../../components/dropdown";
import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";
import PGIconPicker from "../../components/icon-picker";
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
					d="M64.898 116.493H7.332c-.109 0-.219-.11-.437-.11-3.94-.66-6.895-4.18-6.895-8.25V52.36C0 47.74 3.83 44 8.317 44h55.486c3.065 0 5.472 1.43 7.114 4.07.657.99.985 2.2 1.314 3.3v57.863c0 .11-.11.22-.11.44-.438 2.53-1.86 4.51-4.159 5.83-.875.44-1.97.66-3.064.99Zm-17.182-5.61h15.321c2.408 0 3.503-1.1 3.503-3.41V53.13c0-2.31-1.095-3.41-3.393-3.41H8.974c-2.298 0-3.393 1.1-3.393 3.41v54.563c0 2.2 1.095 3.41 3.283 3.41h29.221c.219 0 .547.11.766-.11V88.002h-8.427v-8.8h8.427v-.99c.11-2.31-.11-4.62.11-6.93.766-6.271 6.238-11.111 12.476-11.221h5.581c.22 0 .329-.11.547.11v8.69h-5.472c-2.736 0-4.487 1.76-4.487 4.62v5.72h10.178c-.438 2.97-.984 5.83-1.422 8.8h-8.646v22.882Z"
					fill="url(#a)"
				/>
				<path
					d="M120.901 71.157c.876-9.02 11.163-13.53 18.386-7.7 1.752-.22 3.502-.33 5.253-1.1a2.194 2.194 0 0 1 2.299.33c.766.66.985 1.43.766 2.42-.438 2.09-1.095 4.07-2.408 5.72-1.313 1.65-1.97 3.63-2.298 5.83-.985 7.7-4.815 13.971-11.054 18.591-3.72 2.75-7.989 4.29-12.695 4.73-4.925.55-9.74-.11-14.336-2.09-1.204-.55-2.408-1.21-3.612-1.87-.985-.66-1.422-1.76-1.094-2.86a2.548 2.548 0 0 1 2.407-1.65c2.408.11 4.816 0 7.224-.88.328-.11.656-.22 1.094-.55-1.423-1.1-2.736-2.2-3.94-3.41-2.298-2.42-4.159-5.17-4.815-8.47-.438-2.2-.329-4.51-.219-6.71.109-2.2.328-4.29.985-6.38.109-.441.219-.881.437-1.321.767-1.43 2.518-1.76 3.722-.55.766.77 1.532 1.65 2.407 2.42 3.174 2.97 7.004 4.73 11.163 5.61.11 0 .219-.11.328-.11Zm20.466-3.08c-.438 0-.766 0-1.204.11-1.423.33-2.736.33-3.831-.88-.656-.77-1.532-1.1-2.517-1.32-4.596-1.32-8.974 2.75-7.989 7.48.329 1.43-.438 2.53-1.751 2.86-.547.11-1.094 0-1.641 0-5.363-.44-10.178-2.31-14.447-5.61-.328-.22-.656-.66-1.204-.77-.218 1.54-.218 3.08-.328 4.62-.218 3.41 1.204 6.16 3.393 8.58 1.97 2.09 4.159 3.74 6.676 5.171 1.641.99 1.751 2.97.109 4.07-1.313.99-2.736 1.76-4.268 2.42-.109.11-.438 0-.438.33 1.314.22 2.518.33 3.831.33 1.313 0 2.517-.11 3.83-.33 4.706-.66 8.755-2.64 12.039-5.94 4.158-4.29 6.457-9.46 6.785-15.51 0-.99.328-1.87.875-2.64.767-.99 1.314-1.98 2.08-2.97Z"
					fill="url(#b)"
				/>
				<path
					d="M93.179 46.5h61.01a3.31 3.31 0 0 1 3.311 3.31v61.011a3.311 3.311 0 0 1-3.311 3.311h-61.01a3.311 3.311 0 0 1-3.31-3.311v-61.01a3.31 3.31 0 0 1 3.31-3.311Z"
					stroke="url(#c)"
					stroke-width="5"
				/>
				<defs>
					<linearGradient
						id="a"
						x1="0"
						y1="80.246"
						x2="72.231"
						y2="80.246"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="b"
						x1="100"
						y1="80.504"
						x2="147.685"
						y2="80.504"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="c"
						x1="85.916"
						y1="80.025"
						x2="160"
						y2="80.025"
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
		var elements = attributes.elements;
		var icon = attributes.icon;
		var label = attributes.label;
		var count = attributes.count;

		var blockCssY = attributes.blockCssY;

		var postId = context["postId"];
		var postType = context["postType"];

		var wrapperSelector = blockClass;
		// Wrapper CSS Class Selectors
		var itemSelector = blockClass + " .media-item";
		var iconSelector = blockClass + " .media-item .icon";
		var labelSelector = blockClass + " .media-item .media-label";
		var countSelector = blockClass + " .media-item .media-count";

		var [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());

		var [loading, setLoading] = useState(false);

		var [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });

			// blockCssY.items[itemSelector] = {
			// 	...blockCssY.items[itemSelector],
			// 	"font-size": { Desktop: "30px" },
			// };

			// blockCssY.items[itemSelector] = {
			// 	...blockCssY.items[itemSelector],
			// 	"margin-top": { Desktop: "10px" },
			// };
			// blockCssY.items[itemSelector] = {
			// 	...blockCssY.items[itemSelector],
			// 	"margin-right": { Desktop: "10px" },
			// };
			// blockCssY.items[itemSelector] = {
			// 	...blockCssY.items[itemSelector],
			// 	"margin-bottom": { Desktop: "10px" },
			// };
			// blockCssY.items[itemSelector] = {
			// 	...blockCssY.items[itemSelector],
			// 	"margin-left": { Desktop: "10px" },
			// };
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[itemSelector] = elements;
			blockCssObj[iconSelector] = icon;
			blockCssObj[labelSelector] = label;
			blockCssObj[countSelector] = count;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

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

			if (action == "insert") {
				wp.data
					.dispatch("core/block-editor")
					.insertBlocks(wp.blocks.parse(content));
			}
			if (action == "applyStyle") {
				var wrapperX = attributes.wrapper;
				var iconX = attributes.icon;
				var labelX = attributes.label;
				var countX = attributes.count;
				var elementsX = attributes.elements;
				var blockCssYX = attributes.blockCssY;

				var blockCssObj = {};

				if (elementsX != undefined) {
					var elementsY = { ...elementsX, options: elements.options };
					setAttributes({ elements: elementsY });
					blockCssObj[itemSelector] = elementsY;
				}

				if (countX != undefined) {
					var countY = { ...countX, options: count.options };
					setAttributes({ count: countY });
					blockCssObj[countSelector] = countY;
				}

				if (labelX != undefined) {
					var labelY = { ...labelX, options: label.options };
					setAttributes({ label: labelY });
					blockCssObj[labelSelector] = labelY;
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

		var mediaSites = [
			{
				id: "email",
				label: "Mail",
				count: 125,
				url: "mailto:?subject={TITLE}&body={URL}",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "fas fa-envelope",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			{
				id: "skype",
				label: "Skype",
				count: 125,
				url: "https://web.skype.com/share?url={URL}",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "fab fa-skype",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			{
				id: "whatsapp",
				label: "WhatsApp",
				count: 125,
				url: "https://api.whatsapp.com/send?text={URL} - {TITLE}",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "fab fa-whatsapp-square",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "tumblr",
				label: "Tumblr",
				count: 125,
				url: "https://www.tumblr.com/share/link?url={URL}",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "fab fa-tumblr-square",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			{
				id: "viber",
				label: "Viber",
				count: 125,
				url: "viber://chat?number=12345678",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "fab fa-viber",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			// {
			//   id: 'instagram', label: 'Instagram', count: 125, url: 'https://www.facebook.com/sharer.php?u={URL}', siteIcon: { library: 'fontAwesome', srcType: "class", /*class, html, img, svg */ iconSrc: 'fab fa-square-instagram', },
			//   styles: {
			//
			//     color: { Desktop: '' },
			//     backgroundColor: {},
			//   padding: { Desktop: '' },
			//   margin: { Desktop: '' },
			//     display: {},
			//   },

			// },

			{
				id: "reddit",
				label: "Reddit",
				count: 125,
				url: "http://www.reddit.com/submit?title={TITLE}&url={URL}",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "fab fa-reddit-square",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},

			{
				id: "facebook",
				label: "Facebook",
				count: 125,
				url: "https://www.facebook.com/sharer.php?u={URL}",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "fab fa-facebook-square",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "twitter",
				label: "Twitter",
				count: 125,
				url: "https://twitter.com/intent/tweet?url={URL}",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "fab fa-twitter-square",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "linkedin",
				label: "Linkedin",
				count: 125,
				url: "https://www.linkedin.com/shareArticle?mini=true&url={URL}&title={TITLE}",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "fab fa-linkedin",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "pinterest",
				label: "Pinterest",
				count: 125,
				url: "https://www.pinterest.com/pin/create/button/?url={URL}&media={IMAGE}",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "fab fa-pinterest-square",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
		];

		function addMedia(option, index) {
			//var isExist = elements.items.find(x => x.label === option.label);

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
			var sudoScourceX = { ...elements[sudoScource] };
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemSelector
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
			setAttributes({ elements: { ...elements } });
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

		function onChangeStyleCount(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, count);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ count: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				countSelector
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

		function onRemoveStyleCount(sudoScource, key) {
			var object = myStore.deletePropertyDeep(count, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ count: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				countSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleCount(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, count);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ count: object });
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

		function onBulkAddItems(sudoScource, cssObj) {
			let obj = Object.assign({}, elements);
			obj[sudoScource] = cssObj;

			setAttributes({ elements: obj });

			var selector = myStore.getElementSelector(sudoScource, itemSelector);
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

		function onBulkAddLabel(sudoScource, cssObj) {
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

		function onBulkAddCount(sudoScource, cssObj) {
			let obj = Object.assign({}, count);
			obj[sudoScource] = cssObj;

			setAttributes({ count: obj });

			var selector = myStore.getElementSelector(sudoScource, countSelector);
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
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		function onChangeBreakPoint(x, index) {
			var asdsdsd = wp.data.dispatch("postgrid-shop").setBreakPoint(x.value);

			asdsdsd.then((res) => {
				setBreakPointX(res.breakpoint);
				myStore.generateBlockCss(blockCssY.items, blockId);
			});
		}

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});

		function onChangeStyleItem(sudoScource, newVal, attr, obj, extra) {
			var index = extra.index;
			console.log("first");

			var path = [sudoScource, attr, breakPointX];
			let objX = Object.assign({}, obj);
			const object = myStore.updatePropertyDeep(objX, path, newVal);

			var elementsX = { ...elements };

			elementsX.items[index] = object;

			setAttributes({ elements: elementsX });

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

			var elementsX = { ...elements };

			elementsX.items[index] = object;

			setAttributes({ elements: elementsX });

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

			var elementsX = { ...elements };

			elementsX.items[index] = object;

			setAttributes({ elements: elementsX });

			//setAttributes({ items: object });
			// setAttributes({ items: itemsX });
		}

		// function onBulkAddItem(sudoScource, cssObj) {
		// 	let obj = Object.assign({}, items);
		// 	obj[sudoScource] = cssObj;

		// 	setAttributes({ items: obj });

		// 	var selector = myStore.getElementSelector(sudoScource, itemSelector);
		// 	var stylesObj = {};

		// 	Object.entries(cssObj).map((args) => {
		// 		var attr = args[0];
		// 		var cssPropty = myStore.cssAttrParse(attr);

		// 		if (stylesObj[selector] == undefined) {
		// 			stylesObj[selector] = {};
		// 		}

		// 		if (stylesObj[selector][cssPropty] == undefined) {
		// 			stylesObj[selector][cssPropty] = {};
		// 		}

		// 		stylesObj[selector][cssPropty] = args[1];
		// 	});

		// 	var cssItems = { ...blockCssY.items };
		// 	var cssItemsX = { ...cssItems, ...stylesObj };

		// 	setAttributes({ blockCssY: { items: cssItemsX } });
		// }

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
									<PanelRow className="my-4">
										<label for="" className="font-medium text-slate-900 ">
											Add Media
										</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={mediaSites}
											buttonTitle="Choose"
											onChange={addMedia}
											values=""></PGDropdown>
									</PanelRow>

									{elements.items.length == 0 && (
										<div className="bg-red-400 text-white my-3  px-3 py-2 text-center">
											No media added
										</div>
									)}

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
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	Label
																</label>
																<InputControl
																	value={item.label}
																	onChange={(newVal) => {
																		elements.items[index].label = newVal;
																		setAttributes({
																			elements: {
																				...elements,
																				items: elements.items,
																			},
																		});
																	}}
																/>
															</PanelRow>

															<PanelRow>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	URL
																</label>
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
															</PanelRow>

															<PanelRow>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	Count
																</label>
																<InputControl
																	value={item.count}
																	onChange={(newVal) => {
																		elements.items[index].count = newVal;
																		setAttributes({
																			elements: {
																				...elements,
																				items: elements.items,
																			},
																		});
																	}}
																/>
															</PanelRow>

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
														</PGtab>
														<PGtab name="styles">
															<PGStyles
																obj={item}
																extra={{ index: index }}
																onChange={onChangeStyleItem}
																onAdd={onAddStyleItem}
																onRemove={onRemoveStyleItem}
																// onBulkAdd={onBulkAddItem}
															/>
														</PGtab>
													</PGtabs>
												</PanelBody>
											</div>
										))}
									</ReactSortable>
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

												{ label: "Before Label", value: "beforeLabel" },
												{ label: "After Label", value: "afterLabel" },
												// { label: 'Before Count', value: 'beforeCount' },
												// { label: 'After Count', value: 'afterCount' },
											]}
											onChange={(newVal) => {
												var options = { ...icon.options, position: newVal };
												setAttributes({ icon: { ...icon, options: options } });
											}}
										/>
									</PanelRow>

									<ToggleControl
										className="my-3"
										label="Display icon?"
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

						<PanelBody
							className="font-medium text-slate-900 "
							title="Label"
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
									<ToggleControl
										className="my-3"
										label="Display label?"
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
								</PGtab>
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

						<PanelBody
							className="font-medium text-slate-900 "
							title="Count"
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
									<ToggleControl
										className="my-3"
										label="Display count?"
										help={
											elements.options.showCount
												? "Count is displaying"
												: "Count is hidden"
										}
										checked={elements.options.showCount ? true : false}
										onChange={(e) => {
											var options = {
												...elements.options,
												showCount: elements.options.showCount ? false : true,
											};
											setAttributes({
												elements: { ...elements, options: options },
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={count}
										onChange={onChangeStyleCount}
										onAdd={onAddStyleCount}
										onBulkAdd={onBulkAddCount}
										onRemove={onRemoveStyleCount}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Block Variations"
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={"social-share"}
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
							<PGTutorials slug="social-share" />
						</div>
					</div>
				</InspectorControls>

				<div {...blockProps}>
					{elements.items.map((x, index) => {
						return (
							<a
								onClick={handleLinkClick}
								className={"media-item item-" + index}
								href={x.url}>
								{elements.options.showLabel && (
									<span className="media-label">{x.label}</span>
								)}

								{elements.options.showIcon && (
									<span className={`icon ${x.siteIcon.iconSrc}`}></span>
								)}

								{elements.options.showCount && (
									<span className="media-count">({x.count})</span>
								)}
							</a>
						);
					})}
				</div>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
