import apiFetch from "@wordpress/api-fetch";
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { useEntityProp } from "@wordpress/core-data";

import { registerBlockType, createBlock } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import {
	useSelect,
	select,
	subscribe,
	useDispatch,
	dispatch,
} from "@wordpress/data";
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
	Spinner,
} from "@wordpress/components";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";

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
import PGIconPicker from "../../components/icon-picker";
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
					d="M61.1765 52H4.70588C3.4578 52 2.26085 52.4958 1.37832 53.3783C0.495798 54.2608 0 55.4578 0 56.7059V103.765C0 105.013 0.495798 106.21 1.37832 107.092C2.26085 107.975 3.4578 108.471 4.70588 108.471H61.1765C62.4246 108.471 63.6215 107.975 64.504 107.092C65.3866 106.21 65.8824 105.013 65.8824 103.765V56.7059C65.8824 55.4578 65.3866 54.2608 64.504 53.3783C63.6215 52.4958 62.4246 52 61.1765 52ZM56.4706 99.0588H9.41177V61.4118H56.4706V99.0588Z"
					fill="url(#paint0_linear_61_363)"
				/>
				<path
					d="M160 56.9998H84.7061V66.4115H160V56.9998Z"
					fill="url(#paint1_linear_61_363)"
				/>
				<path
					d="M131 94.8818H85V103.882H131V94.8818Z"
					fill="url(#paint2_linear_61_363)"
				/>
				<path d="M106.561 76H85V85.41H106.561V76Z" fill="#C15940" />
				<path d="M133.281 76H111.72V85.41H133.281V76Z" fill="#C15940" />
				<path d="M160 76H138.439V85.41H160V76Z" fill="#C15940" />
				<path
					d="M36.8446 68L27.097 83.7233L23.2135 77.5059L13 94H20.7281H33.4661H53L36.8446 68Z"
					fill="url(#paint3_linear_61_363)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_363"
						x1="0"
						y1="80.2353"
						x2="65.8824"
						y2="80.2353"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_363"
						x1="84.7061"
						y1="61.7056"
						x2="160"
						y2="61.7056"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_363"
						x1="85"
						y1="99.3818"
						x2="131"
						y2="99.3818"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_363"
						x1="13"
						y1="81"
						x2="53"
						y2="81"
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
		var separator = attributes.separator;
		var frontText = attributes.frontText;
		var icon = attributes.icon;
		var termTitle = attributes.termTitle;
		var postCount = attributes.postCount;

		var utmTracking = attributes.utmTracking;

		var blockCssY = attributes.blockCssY;

		var postId = context["postId"];
		var postType = context["postType"];

		var breakPointX = myStore.getBreakPoint();

		let isProFeature = applyFilters("isProFeature", true);

		const CustomTagWrapper = `${wrapper.options.tag}`;

		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		const itemSelector = blockClass + " .item";
		const termTitleSelector = blockClass + " .termTitle";

		const separatorSelector = blockClass + " .separator";
		const frontTextSelector = blockClass + " .frontText";
		const postCountSelector = blockClass + " .postCount";
		const iconSelector = blockClass + " .icon";

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });

			// setAttributes({ postTitle: postTitle });
			// setAttributes({ wrapper: wrapper });

			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[itemSelector] = items;
			blockCssObj[termTitleSelector] = termTitle;
			blockCssObj[separatorSelector] = separator;
			blockCssObj[frontTextSelector] = frontText;
			blockCssObj[postCountSelector] = postCount;
			blockCssObj[iconSelector] = icon;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var itemX = { ...blockCssY.items, ...blockCssRules };
			setAttributes({ blockCssY: { items: itemX } });
		}, [blockId]);

		var iconPositonArgsBasic = {
			none: { label: "Choose Position", value: "" },
			beforeFronttext: { label: "Before Front text", value: "beforeFronttext" },
			afterFronttext: { label: "After Front text", value: "afterFronttext" },
			beforeItems: { label: "Before Items", value: "beforeItems" },
			afterItems: { label: "After Items", value: "afterItems" },
			beforeItem: {
				label: "Before Each Items",
				value: "beforeItem",
				isPro: true,
			},
			afterItem: { label: "After Each Items", value: "afterItem", isPro: true },
		};

		let iconPositonArgs = applyFilters("iconPositonArgs", iconPositonArgsBasic);

		var linkToArgsBasic = {
			noUrl: { label: "No URL", value: "" },
			termUrl: { label: "Term URL", value: "termUrl" },

			postUrl: { label: "Post URL", value: "postUrl" },
			homeUrl: { label: "Home URL", value: "homeUrl" },
			authorUrl: { label: "Author URL", value: "authorUrl" },
			authorLink: { label: "Author Link", value: "authorLink" },
			authorMail: { label: "Author Mail", value: "authorMail", isPro: true },
			authorMeta: { label: "Author Meta", value: "authorMeta", isPro: true },
			customField: { label: "Custom Field", value: "customField", isPro: true },
			customUrl: { label: "Custom URL", value: "customUrl", isPro: true },
		};

		let linkToArgs = linkToArgsBasic;

		function setFieldLinkTo(option, index) {
			var options = { ...items.options, linkTo: option.value };
			setAttributes({ items: { ...items, options: options } });
		}

		function setIconPosition(option, index) {
			var options = { ...icon.options, position: option.value };
			setAttributes({ icon: { ...icon, options: options } });
		}

		// var breakPointList = [];

		var dummyCats = [
			{
				id: 1,
				count: 1,
				description: "",
				link: "#",
				name: "Tag 1",
				slug: "tag-1",
				taxonomy: "tag_tax",
			},
			{
				id: 2,
				count: 1,
				description: "",
				link: "#",
				name: "Tag 2",
				slug: "tag-2",
				taxonomy: "tag_tax",
			},
			{
				id: 3,
				count: 1,
				description: "",
				link: "#",
				name: "Tag 3",
				slug: "tag-3",
				taxonomy: "tag_tax",
			},
			{
				id: 4,
				count: 1,
				description: "",
				link: "#",
				name: "Tag 4",
				slug: "tag-4",
				taxonomy: "tag_tax",
			},
			{
				id: 5,
				count: 1,
				description: "",
				link: "#",
				name: "Tag 5",
				slug: "tag-5",
				taxonomy: "tag_tax",
			},
			{
				id: 6,
				count: 1,
				description: "",
				link: "#",
				name: "Tag 6",
				slug: "tag-6",
				taxonomy: "tag_tax",
			},
		];

		const [categoryCount, setcategoryCount] = useState(0); // Using the hook.
		const [postCategoriesData, setPostCategoriesData] = useState([]); // Using the hook.

		const [categories, setCategories] = useState([]); // Using the hook.

		const [postCategoriesX, setPostCategoriesX] = useEntityProp(
			"postType",
			postType,
			"tags",
			postId
		);

		const [iconHtml, setIconHtml] = useState("");

		useEffect(() => {
			var iconSrc = icon.options.iconSrc;

			var iconHtml = `<span className="${iconSrc}"></span>`;

			setIconHtml(iconHtml);
		}, [icon]);

		useEffect(() => {
			setPostCategoriesData([]);
			setCategories([]);

			setcategoryCount(categories.length - 1);
			if (postCategoriesX != undefined) {
				for (var x in postCategoriesX) {
					var catId = postCategoriesX[x];
					var assd = x;

					if (x) {
						apiFetch({
							path: "/wp/v2/tags/" + catId,
							method: "GET",
						}).then((res) => {
							setPostCategoriesData((current) => [...current, res]);
							setCategories((current) => [...current, res]);
						});
					}
				}
			} else {
				setPostCategoriesData(dummyCats);
				setCategories(dummyCats);
			}
		}, [postCategoriesX]);

		useEffect(() => {
			var asdasd = postCategoriesData.slice(0, items.options.maxCount);

			setCategories(asdasd);
		}, [postCategoriesData]);

		useEffect(() => {
			if (postCategoriesX != undefined && postCategoriesX.length > 0) {
				var maxCount =
					items.options.maxCount.length > 0 ? items.options.maxCount : 99;

				setcategoryCount(categories.length - 1);
				var asdasd = postCategoriesData.slice(0, maxCount);

				setCategories(asdasd);
			} else {
				var asdasd = dummyCats.slice(0, maxCount);

				setCategories(asdasd);
			}
		}, [items]);

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
				var itemsX = attributes.items;
				var iconX = attributes.icon;
				var termTitleX = attributes.termTitle;
				var separatorX = attributes.separator;
				var postCountX = attributes.postCount;
				var frontTextX = attributes.frontText;
				var blockCssYX = attributes.blockCssY;

				var blockCssObj = {};

				if (frontTextX != undefined) {
					var frontTextY = { ...frontTextX, options: frontText.options };
					setAttributes({ frontText: frontTextY });
					blockCssObj[frontTextSelector] = frontTextY;
				}

				if (postCountX != undefined) {
					var postCountY = { ...postCountX, options: postCount.options };
					setAttributes({ postCount: postCountY });
					blockCssObj[postCountSelector] = postCountY;
				}

				if (separatorX != undefined) {
					var separatorY = { ...separatorX, options: separator.options };
					setAttributes({ separator: separatorY });
					blockCssObj[separatorSelector] = separatorY;
				}

				if (termTitleX != undefined) {
					var termTitleY = { ...termTitleX, options: termTitle.options };
					setAttributes({ termTitle: termTitleY });
					blockCssObj[termTitleSelector] = termTitleY;
				}

				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[iconSelector] = iconY;
				}

				if (itemsX != undefined) {
					var itemsY = { ...itemsX, options: items.options };
					setAttributes({ items: itemsY });
					blockCssObj[itemsSelector] = itemsY;
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

		function onPickCssLibraryItems(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				items[sudoScource] = sudoScourceArgs;
			});

			var itemsX = Object.assign({}, items);
			setAttributes({ items: itemsX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					itemSelector
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

		function onPickCssLibrarySeparator(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				separator[sudoScource] = sudoScourceArgs;
			});

			var separatorX = Object.assign({}, separator);
			setAttributes({ separator: separatorX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					separatorSelector
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

		function onPickCssLibraryFrontText(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				frontText[sudoScource] = sudoScourceArgs;
			});

			var frontTextX = Object.assign({}, frontText);
			setAttributes({ frontText: frontTextX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					frontTextSelector
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

		function onChangeStyleFrontText(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, frontText);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ frontText: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				frontTextSelector
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

		function onRemoveStyleFrontText(sudoScource, key) {
			var object = myStore.deletePropertyDeep(frontText, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ frontText: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				frontTextSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleFrontText(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, frontText);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ frontText: object });
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
			let obj = Object.assign({}, items);
			obj[sudoScource] = cssObj;

			setAttributes({ items: obj });

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

		function onBulkAddFrontText(sudoScource, cssObj) {
			let obj = Object.assign({}, frontText);
			obj[sudoScource] = cssObj;

			setAttributes({ frontText: obj });

			var selector = myStore.getElementSelector(sudoScource, frontTextSelector);
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

		function onBulkAddSeparator(sudoScource, cssObj) {
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
		function onBulkAddTermTitle(sudoScource, cssObj) {
			let obj = Object.assign({}, termTitle);
			obj[sudoScource] = cssObj;

			setAttributes({ termTitle: obj });

			var selector = myStore.getElementSelector(sudoScource, termTitleSelector);
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
		function onBulkAddPostCount(sudoScource, cssObj) {
			let obj = Object.assign({}, postCount);
			obj[sudoScource] = cssObj;

			setAttributes({ postCount: obj });

			var selector = myStore.getElementSelector(sudoScource, postCountSelector);
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

		//
		function onChangeStyleTermTitle(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, termTitle);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ termTitle: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				termTitleSelector
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

		function onRemoveStyleTermTitle(sudoScource, key) {
			var object = myStore.deletePropertyDeep(termTitle, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ termTitle: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				termTitleSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleTermTitle(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, termTitle);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ termTitle: object });
		}
		function onChangeStylePostCount(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, postCount);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ postCount: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				postCountSelector
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

		function onRemoveStylePostCount(sudoScource, key) {
			var object = myStore.deletePropertyDeep(postCount, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ postCount: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				postCountSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStylePostCount(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, postCount);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ postCount: object });
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
		function onResetItems(sudoScources) {
			let obj = Object.assign({}, items);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						itemSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ items: obj });
		}
		function onResetSeparator(sudoScources) {
			let obj = Object.assign({}, separator);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						separatorSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ separator: obj });
		}
		function onResetFrontText(sudoScources) {
			let obj = Object.assign({}, frontText);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						frontTextSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ frontText: obj });
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
		function onResetTermTitle(sudoScources) {
			let obj = Object.assign({}, termTitle);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						termTitleSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ termTitle: obj });
		}
		function onResetPostCount(sudoScources) {
			let obj = Object.assign({}, postCount);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						postCountSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ postCount: obj });
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

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.

		useEffect(() => {
			linkAttrObj();
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [items]);

		var linkAttrObj = () => {
			var sdsd = {};

			items.options.linkAttr.map((x) => {
				if (x.val) sdsd[x.id] = x.val;
			});

			setlinkAttrItems(sdsd);
		};

		const post = useSelect((select) =>
			select("core").getEntityRecord(
				"postType",
				context["postType"],
				context["postId"]
			)
		);

		const termstaxonomy = useSelect((select) =>
			select("core").getEntityRecords("taxonomy", "category", [4, 5])
		);

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});

		return (
			<>
				<BlockControls>
					<AlignmentToolbar
						value={wrapper.styles.textAlign}
						onChange={(newVal) => {
							var styles = { ...postfix.styles, textAlign: newVal };
							setAttributes({ postfix: { ...postfix, styles: styles } });
						}}
					/>
				</BlockControls>

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

									{/* <PanelRow>
                  <label for=""  className="font-medium text-slate-900 " >Wrapper Class</label>
                  <InputControl
                    value={wrapper.options.class}
                    onChange={(newVal) => {
                      var options = { ...wrapper.options, class: newVal };
                      setAttributes({ wrapper: { ...wrapper, options: options } });
                    }}
                  />
                </PanelRow> */}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={wrapper}
										onChange={onChangeStyleWrapper}
										onAdd={onAddStyleWrapper}
										onBulkAdd={onBulkAddWrapper}
										onRemove={onRemoveStyleWrapper}
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
							title="Items"
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
											Item Class
										</label>

										<InputControl
											value={items.options.class}
											onChange={(newVal) => {
												var options = { ...items.options, class: newVal };
												setAttributes({
													items: { ...items, options: options },
												});
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Max Count
										</label>

										<InputControl
											value={items.options.maxCount}
											onChange={(newVal) => {
												var options = { ...items.options, maxCount: newVal };
												setAttributes({
													items: { ...items, options: options },
												});
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Link To
										</label>

										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={linkToArgs}
											buttonTitle={
												items.options.linkTo == undefined ||
												items.options.linkTo.length == 0
													? "Choose"
													: linkToArgs[items.options.linkTo] == undefined
													? ""
													: linkToArgs[items.options.linkTo].label
											}
											onChange={setFieldLinkTo}
											values={[]}></PGDropdown>
									</PanelRow>

									{items.options.linkTo != undefined &&
										items.options.linkTo.length > 0 && (
											<>
												{items.options.linkTo == "authorMeta" && (
													<PanelRow>
														<label
															for=""
															className="font-medium text-slate-900 ">
															Author Meta Key
														</label>

														<InputControl
															value={items.options.linkToAuthorMeta}
															onChange={(newVal) => {
																var options = {
																	...items.options,
																	linkToAuthorMeta: newVal,
																};
																setAttributes({
																	items: { ...items, options: options },
																});
															}}
														/>
													</PanelRow>
												)}

												{items.options.linkTo == "customField" && (
													<PanelRow>
														<label
															for=""
															className="font-medium text-slate-900 ">
															Custom Meta Key
														</label>

														<InputControl
															value={items.options.linkToAuthorMeta}
															onChange={(newVal) => {
																var options = {
																	...items.options,
																	linkToAuthorMeta: newVal,
																};
																setAttributes({
																	items: { ...items, options: options },
																});
															}}
														/>
													</PanelRow>
												)}

												{items.options.linkTo == "customUrl" && (
													<PanelRow>
														<label
															for=""
															className="font-medium text-slate-900 ">
															Custom Url
														</label>

														<div className="relative">
															<Button
																className={
																	linkPickerPosttitle ? "!bg-gray-400" : ""
																}
																icon={link}
																onClick={(ev) => {
																	setLinkPickerPosttitle((prev) => !prev);
																}}></Button>
															{items.options.customUrl.length > 0 && (
																<Button
																	className="!text-red-500 ml-2"
																	icon={linkOff}
																	onClick={(ev) => {
																		var options = {
																			...items.options,
																			customUrl: "",
																		};
																		setAttributes({
																			items: { ...items, options: options },
																		});
																		setLinkPickerPosttitle(false);
																	}}></Button>
															)}
															{linkPickerPosttitle && (
																<Popover position="bottom right">
																	<LinkControl
																		settings={[]}
																		value={items.options.customUrl}
																		onChange={(newVal) => {
																			var options = {
																				...items.options,
																				customUrl: newVal.url,
																			};

																			setAttributes({
																				items: { ...items, options: options },
																			});
																		}}
																	/>

																	<div className="p-2">
																		<span className="font-bold">
																			Linked to:
																		</span>{" "}
																		{items.options.customUrl.length != 0
																			? items.options.customUrl
																			: "No link"}{" "}
																	</div>
																</Popover>
															)}
														</div>
													</PanelRow>
												)}

												<PanelRow>
													<label for="" className="font-medium text-slate-900 ">
														Link Target
													</label>

													<SelectControl
														label=""
														value={items.options.linkTarget}
														options={[
															{ label: "_self", value: "_self" },
															{ label: "_blank", value: "_blank" },
															{ label: "_parent", value: "_parent" },
															{ label: "_top", value: "_top" },
														]}
														onChange={(newVal) => {
															var options = {
																...items.options,
																linkTarget: newVal,
															};
															setAttributes({
																items: { ...items, options: options },
															});
														}}
													/>
												</PanelRow>
											</>
										)}

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Prefix
										</label>

										<InputControl
											value={items.options.prefix}
											onChange={(newVal) => {
												var options = { ...items.options, prefix: newVal };
												setAttributes({
													items: { ...items, options: options },
												});
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Postfix
										</label>
										<InputControl
											value={items.options.postfix}
											onChange={(newVal) => {
												var options = { ...items.options, postfix: newVal };
												setAttributes({
													items: { ...items, options: options },
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
												var sdsd = items.options.linkAttr.concat({
													id: "",
													val: "",
												});
												var options = { ...items.options, linkAttr: sdsd };
												setAttributes({
													items: { ...items, options: options },
												});
												linkAttrObj();
											}}>
											Add
										</div>
									</PanelRow>

									{items.options.linkAttr.length > 0 &&
										items.options.linkAttr.map((x, i) => {
											return (
												<div className="my-2">
													<PanelRow>
														<InputControl
															placeholder="Name"
															className="mr-2"
															value={items.options.linkAttr[i].id}
															onChange={(newVal) => {
																items.options.linkAttr[i].id = newVal;
																var ssdsd = items.options.linkAttr.concat([]);
																var options = {
																	...items.options,
																	linkAttr: ssdsd,
																};
																setAttributes({
																	items: { ...items, options: options },
																});
															}}
														/>

														<InputControl
															placeholder="Value"
															className="mr-2"
															value={x.val}
															onChange={(newVal) => {
																items.options.linkAttr[i].val = newVal;
																var ssdsd = items.options.linkAttr.concat([]);
																var options = {
																	...items.options,
																	linkAttr: ssdsd,
																};
																setAttributes({
																	items: { ...items, options: options },
																});
															}}
														/>
														<span
															// className="text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close"
															className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
															onClick={(ev) => {
																items.options.linkAttr.splice(i, 1);
																var ssdsd = items.options.linkAttr.concat([]);
																var options = {
																	...items.options,
																	linkAttr: ssdsd,
																};
																setAttributes({
																	items: { ...items, options: options },
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
										obj={items}
										onChange={onChangeStyleItems}
										onAdd={onAddStyleItems}
										onBulkAdd={onBulkAddItems}
										onRemove={onRemoveStyleItems}
										onReset={onResetItems}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={items}
										onChange={onPickCssLibraryItems}
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

										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={iconPositonArgs}
											buttonTitle={
												icon.options.position.length == 0
													? "Choose"
													: iconPositonArgs[icon.options.position].label
											}
											onChange={setIconPosition}
											values={[]}></PGDropdown>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={icon}
										onChange={onChangeStyleIcon}
										onAdd={onAddStyleIcon}
										onBulkAdd={onBulkAddIcon}
										onRemove={onRemoveStyleIcon}
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
							title="Front Text"
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
											Front Text
										</label>

										<InputControl
											value={frontText.options.text}
											onChange={(newVal) => {
												var options = { ...frontText.options, text: newVal };
												setAttributes({
													frontText: { ...frontText, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={frontText}
										onChange={onChangeStyleFrontText}
										onAdd={onAddStyleFrontText}
										onBulkAdd={onBulkAddFrontText}
										onRemove={onRemoveStyleFrontText}
										onReset={onResetFrontText}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={frontText}
										onChange={onPickCssLibraryFrontText}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Term Title"
							initialOpen={false}>
							<PGtabs
								activeTab="styles"
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
										name: "options",
										title: "Options",
										icon: settings,
										className: "tab-settings",
									},
								]}>
								<PGtab name="styles">
									<PGStyles
										obj={termTitle}
										onChange={onChangeStyleTermTitle}
										onAdd={onAddStyleTermTitle}
										onBulkAdd={onBulkAddTermTitle}
										onRemove={onRemoveStyleTermTitle}
										onReset={onResetTermTitle}
									/>
								</PGtab>
								<PGtab name="options"></PGtab>
							</PGtabs>
						</PanelBody>
						<PanelBody
							className="font-medium text-slate-900 "
							title="Post Count"
							initialOpen={false}>
							<PGtabs
								activeTab="styles"
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
										name: "options",
										title: "Options",
										icon: settings,
										className: "tab-settings",
									},
								]}>
								<PGtab name="styles">
									<PGStyles
										obj={postCount}
										onChange={onChangeStylePostCount}
										onAdd={onAddStylePostCount}
										onBulkAdd={onBulkAddPostCount}
										onRemove={onRemoveStylePostCount}
										onReset={onResetPostCount}
									/>
								</PGtab>
								<PGtab name="options">
									<ToggleControl
										label="Display Post Count"
										help={
											items.options.postCount
												? "Post Count Enabled"
												: "Post Count Disabled"
										}
										checked={items.options.postCount ? true : false}
										onChange={(e) => {
											var options = {
												...items.options,
												postCount: items.options.postCount ? false : true,
											};
											setAttributes({ items: { ...items, options: options } });
										}}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Separator"
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
											Separator
										</label>
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
										onBulkAdd={onBulkAddSeparator}
										onRemove={onRemoveStyleSeparator}
										onReset={onResetSeparator}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={separator}
										onChange={onPickCssLibrarySeparator}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						{/* UTM  */}
						<PanelBody
							className="font-medium text-slate-900 "
							// title="UTM tracking"
							title={
								<span className="flex justify-between w-full">
									<span>UTM Tracking</span>
									{isProFeature ? (
										<span
											className="pg-bg-color text-white px-3 py-1 rounded-md"
											onClick={(ev) => {
												window.open(
													"https://getpostgrid.com/pricing/",
													"_blank"
												);
											}}>
											Pro
										</span>
									) : (
										""
									)}{" "}
								</span>
							}
							initialOpen={false}>
							<div>
								<ToggleControl
									label="Enable?"
									help={
										utmTracking.enable
											? "Tracking Enable."
											: "Tracking Disabled."
									}
									checked={utmTracking.enable ? true : false}
									onChange={(e) => {
										var options = {
											...utmTracking,
											enable: utmTracking.enable ? false : true,
										};

										if (isProFeature) {
											alert("This feature is only available in Pro Version.");
											return;
										}
										setAttributes({
											utmTracking: options,
										});
									}}
								/>

								{utmTracking.enable ? (
									<>
										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												ID
											</label>
											<InputControl
												value={utmTracking.id}
												onChange={(newVal) => {
													var update = { ...utmTracking, id: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>
										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												Source
											</label>
											<InputControl
												value={utmTracking.source}
												onChange={(newVal) => {
													var update = { ...utmTracking, source: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>
										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												Medium
											</label>
											<InputControl
												value={utmTracking.medium}
												onChange={(newVal) => {
													var update = { ...utmTracking, medium: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>
										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												Campaign
											</label>
											<InputControl
												value={utmTracking.campaign}
												onChange={(newVal) => {
													var update = { ...utmTracking, campaign: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>

										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												Term
											</label>
											<InputControl
												value={utmTracking.term}
												onChange={(newVal) => {
													var update = { ...utmTracking, term: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>
										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												Content
											</label>
											<InputControl
												value={utmTracking.content}
												onChange={(newVal) => {
													var update = { ...utmTracking, content: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>
									</>
								) : (
									""
								)}
							</div>
						</PanelBody>
						{/* UTM  */}

						<PanelBody
							className="font-medium text-slate-900 "
							title="Block Variations"
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={"post-tags"}
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
							<PGTutorials slug="post-tags" />
						</div>
					</div>
				</InspectorControls>

				<>
					{categories.length == 0 && <div {...blockProps}>No Tags Found</div>}

					{categories.length > 0 && (
						<CustomTagWrapper {...blockProps}>
							{icon.options.position == "beforeFronttext" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}

							<span className="frontText ">
								<RawHTML>{frontText.options.text}</RawHTML>
							</span>

							{icon.options.position == "afterFronttext" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}

							{icon.options.position == "beforeItems" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}

							{categories.map((x, index) => {
								return (
									<>
										{items.options.linkTo != undefined &&
											items.options.linkTo.length == 0 && (
												<span
													title={x.name}
													{...linkAttrItems}
													className={items.options.class}
													href={x.link}>
													{icon.options.position == "beforeItem" && (
														<span
															className={icon.options.class}
															dangerouslySetInnerHTML={{ __html: iconHtml }}
														/>
													)}

													<span className="termTitle">
														{items.options.prefix}
														{x.name}
														{items.options.postfix}
													</span>
													{items.options.postCount == true && (
														<span className="postCount">{x.count}</span>
													)}

													{icon.options.position == "afterItem" && (
														<span
															className={icon.options.class}
															dangerouslySetInnerHTML={{ __html: iconHtml }}
														/>
													)}
												</span>
											)}

										{items.options.linkTo != undefined &&
											items.options.linkTo.length > 0 && (
												<a
													onClick={(ev) => ev.preventDefault()}
													target={items.options.linkTarget}
													title={x.name}
													{...linkAttrItems}
													className={items.options.class}
													href={x.link}>
													{icon.options.position == "beforeItem" && (
														<span
															className={icon.options.class}
															dangerouslySetInnerHTML={{ __html: iconHtml }}
														/>
													)}

													<span className="termTitle">
														{items.options.prefix}
														{x.name}
														{items.options.postfix}
													</span>
													{items.options.postCount == true && (
														<span className="postCount">({x.count})</span>
													)}

													{icon.options.position == "afterItem" && (
														<span
															className={icon.options.class}
															dangerouslySetInnerHTML={{ __html: iconHtml }}
														/>
													)}
												</a>
											)}

										{categories.length > index + 1 && (
											<span
												className="separator"
												dangerouslySetInnerHTML={{
													__html: separator.options.text,
												}}></span>
										)}
									</>
								);
							})}

							{icon.options.position == "afterItems" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}
						</CustomTagWrapper>
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
