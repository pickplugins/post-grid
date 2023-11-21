import apiFetch from "@wordpress/api-fetch";
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { useEntityProp } from "@wordpress/core-data";

import { registerBlockType } from "@wordpress/blocks";
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
	Icon,
	styles,
	settings,
	link,
	linkOff,
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

var myStore = wp.data.select("postgrid-shop");

registerBlockType(metadata, {
	icon: {
		// Specifying a background color to appear with the icon e.g.: in the inserter.
		background: "#fff",
		// Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
		foreground: "#fff",
		// Specifying an icon for the block
		src: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
				<rect fill="#1d4ed8" x="4" y="9.27" width="8.95" height="2" />
				<path
					fill="#1d4ed8"
					d="M0,4.62v11.3H16.94V4.62Zm14.94,9.3H2V6.62H14.94Z"
				/>
				<rect fill="#1d4ed8" x="4" y="24.73" width="8.95" height="2" />
				<path
					fill="#1d4ed8"
					d="M0,20.08v11.3H16.94V20.08Zm14.94,9.3H2v-7.3H14.94Z"
				/>
				<rect fill="#1d4ed8" x="23.06" y="9.27" width="8.95" height="2" />
				<path
					fill="#1d4ed8"
					d="M19.06,4.62v11.3H36V4.62ZM34,13.92H21.06V6.62H34Z"
				/>
				<rect fill="#1d4ed8" x="23.06" y="24.73" width="8.95" height="2" />
				<path
					fill="#1d4ed8"
					d="M19.06,20.08v11.3H36V20.08ZM34,29.38H21.06v-7.3H34Z"
				/>
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
		var blockCssY = attributes.blockCssY;

		var taxonomies = attributes.taxonomies;

		var postId = context["postId"];
		var postType = context["postType"];

		var breakPointX = myStore.getBreakPoint();

		const [postObjects, setPostObjects] = useState([]);

		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		const itemSelector = blockClass + " .item";
		const itemTitleSelector = blockClass + " .termTitle";

		const separatorSelector = blockClass + " .separator";
		const frontTextSelector = blockClass + " .frontText";
		const postCountSelector = blockClass + " .postCount";
		const iconSelector = blockClass + " .icon";

		var breakPointList = [];

		for (var x in breakPoints) {
			var item = breakPoints[x];
			breakPointList.push({
				label: item.name,
				icon: item.icon,
				value: item.id,
			});
		}

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });

			// setAttributes({ postTitle: postTitle });
			// setAttributes({ wrapper: wrapper });

			apiFetch({
				path: "/post-grid/v2/post_type_objects",
				method: "POST",
				data: { postTypes: [postType] },
			}).then((res) => {
				setPostObjects(res);
			});

			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[itemSelector] = items;
			// blockCssObj[itemTitleSelector] = termTitle;
			blockCssObj[separatorSelector] = separator;
			blockCssObj[frontTextSelector] = frontText;
			// blockCssObj[postCountSelector] = postCount;
			blockCssObj[iconSelector] = icon;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var itemX = { ...blockCssY.items, ...blockCssRules };
			setAttributes({ blockCssY: { items: itemX } });
		}, [blockId]);

		const [categoryCount, setcategoryCount] = useState(0); // Using the hook.
		const [postCategoriesData, setPostCategoriesData] = useState([]); // Using the hook.

		const [categories, setCategories] = useState([]); // Using the hook.

		const [postCategoriesX, setPostCategoriesX] = useEntityProp(
			"postType",
			postType,
			taxonomies.options.taxName,
			postId
		);

		var dummyCats = [
			{
				id: 1,
				count: 1,
				description: "",
				link: "#",
				name: "Category 1",
				slug: "category-1",
				taxonomy: "category_tax",
			},
			{
				id: 2,
				count: 1,
				description: "",
				link: "#",
				name: "Category 2",
				slug: "category-2",
				taxonomy: "category_tax",
				children: [
					{
						id: 21,
						count: 1,
						description: "",
						link: "#",
						name: "Child Category 1",
						slug: "category-3",
						taxonomy: "category_tax",
					},
					{
						id: 22,
						count: 1,
						description: "",
						link: "#",
						name: "Child Category 2",
						slug: "category-3",
						taxonomy: "category_tax",
					},
					{
						id: 23,
						count: 1,
						description: "",
						link: "#",
						name: "Child Category 3",
						slug: "category-3",
						taxonomy: "category_tax",
					},
				],
				posts: [
					{ link: "#", name: "Post Title 1" },
					{ link: "#", name: "Post Title 2" },
					{ link: "#", name: "Post Title 3" },
				],
			},
			{
				id: 3,
				count: 1,
				description: "",
				link: "#",
				name: "Category 3",
				slug: "category-3",
				taxonomy: "category_tax",
			},
			{
				id: 4,
				count: 1,
				description: "",
				link: "#",
				name: "Category 4",
				slug: "category-4",
				taxonomy: "category_tax",
			},
			{
				id: 5,
				count: 1,
				description: "",
				link: "#",
				name: "Category 5",
				slug: "category-5",
				taxonomy: "category_tax",
			},
			{
				id: 6,
				count: 1,
				description: "",
				link: "#",
				name: "Category 6",
				slug: "category-6",
				taxonomy: "category_tax",
			},
		];

		useEffect(() => {
			setPostCategoriesData([]);
			setCategories([]);

			setcategoryCount(categories.length - 1);

			if (postCategoriesX != undefined) {
				for (x in postCategoriesX) {
					var catId = postCategoriesX[x];
					var assd = x;

					if (x) {
						apiFetch({
							path: "/wp/v2/" + taxonomies.options.taxName + "/" + catId,
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
			var maxCount =
				items.options.maxCount.length > 0 ? items.options.maxCount : 99;

			if (postCategoriesX != undefined && postCategoriesX.length > 0) {
				setcategoryCount(categories.length - 1);
				var asdasd = postCategoriesData.slice(0, maxCount);

				setCategories(asdasd);
			} else {
				var asdasd = dummyCats.slice(0, maxCount);

				setCategories(asdasd);
			}
		}, [items]);

		const [iconHtml, setIconHtml] = useState("");

		useEffect(() => {
			var iconSrc = icon.options.iconSrc;

			var iconHtml = `<span class="${iconSrc}"></span>`;

			setIconHtml(iconHtml);
		}, [icon]);

		function setTaxonomy(option, index) {
			var options = { ...taxonomies.options, taxName: option.id };
			setAttributes({ taxonomies: { ...taxonomies, options: options } });

			// var attrExist = false;

			// var data = queryPrams[index];
			// var multiple = data.multiple;

			// var isExist = queryArgs.items.map((item) => {

			//   if (item.id == index) {
			//     return true;
			//   }
			// })

			// var items = queryArgs.items.concat([data])
			// setAttributes({ queryArgs: { items: items } });
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
				var itemsX = attributes.items;
				var taxonomiesX = attributes.taxonomies;
				var iconX = attributes.icon;
				var separatorX = attributes.separator;
				var frontTextX = attributes.frontText;
				var blockCssYX = attributes.blockCssY;

				var blockCssObj = {};

				if (taxonomiesX != undefined) {
					var taxonomiesY = { ...taxonomiesX, options: taxonomies.options };
					setAttributes({ taxonomies: taxonomiesY });
					blockCssObj[taxonomiesSelector] = taxonomiesY;
				}

				if (frontTextX != undefined) {
					var frontTextY = { ...frontTextX, options: frontText.options };
					setAttributes({ frontText: frontTextY });
					blockCssObj[frontTextSelector] = frontTextY;
				}

				if (separatorX != undefined) {
					var separatorY = { ...separatorX, options: separator.options };
					setAttributes({ separator: separatorY });
					blockCssObj[separatorSelector] = separatorY;
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

		function onChangeIcon(arg) {
			var options = {
				...icon.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({ icon: { ...icon, options: options } });
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
			let obj = Object.assign({}, item);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ item: object });

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
			var object = myStore.deletePropertyDeep(item, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ item: object });

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

		function onBulkAddSeperator(sudoScource, cssObj) {
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

		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

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

		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div className="px-3">
							<PanelRow>
								<label for="" className="font-medium text-slate-900 ">
									Select Taxonomy
								</label>
								<PGDropdown
									position="bottom right"
									variant="secondary"
									options={postObjects}
									buttonTitle="Choose"
									onChange={setTaxonomy}
									values={taxonomies.options.taxName}></PGDropdown>
							</PanelRow>

							<PanelRow>
								<label for="" className="font-medium text-slate-900 ">
									Custom Taxonomy
								</label>
								<InputControl
									value={taxonomies.options.taxName}
									onChange={(newVal) => {
										var options = { ...taxonomies.options, taxName: newVal };
										setAttributes({
											taxonomies: { ...taxonomies, options: options },
										});
									}}
								/>
							</PanelRow>
						</div>

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
										onBulkAdd={onBulkAddWrapper}
										onRemove={onRemoveStyleWrapper}
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
								]}>
								<PGtab name="options">
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											View Type
										</label>
										<SelectControl
											label=""
											value={items.options.viewType}
											options={[
												{ label: "Accordion", value: "accordion" },
												{ label: "Inline", value: "inline" },
												{ label: "Grid", value: "grid" },
												{ label: "List", value: "list" },
											]}
											onChange={(newVal) => {
												var options = { ...items.options, viewType: newVal };
												setAttributes({
													items: { ...items, options: options },
												});
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Query Posts
										</label>
										<SelectControl
											label=""
											value={items.options.queryPosts}
											options={[
												{ label: "True", value: 1 },
												{ label: "False", value: 0 },
											]}
											onChange={(newVal) => {
												var options = { ...items.options, queryPosts: newVal };
												setAttributes({
													items: { ...items, options: options },
												});
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Hide Empty Terms
										</label>
										<SelectControl
											label=""
											value={items.options.hideEmpty}
											options={[
												{ label: "True", value: 1 },
												{ label: "False", value: 0 },
											]}
											onChange={(newVal) => {
												var options = { ...items.options, hideEmpty: newVal };
												setAttributes({
													items: { ...items, options: options },
												});
											}}
										/>
									</PanelRow>

									{items.options.viewType == "accordion" && (
										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Accordion Open
											</label>
											<SelectControl
												label=""
												value={items.options.accordionOpen}
												options={[
													{ label: "True", value: 1 },
													{ label: "False", value: 0 },
												]}
												onChange={(newVal) => {
													var options = {
														...items.options,
														accordionOpen: newVal,
													};
													setAttributes({
														items: { ...items, options: options },
													});
												}}
											/>
										</PanelRow>
									)}

									{items.options.viewType == "grid" && (
										<>
											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Post Count Position
												</label>
												<SelectControl
													label=""
													value={items.options.postCountPosition}
													options={[
														{ label: "Before Title", value: "beforeTitle" },
														{ label: "After Ttile", value: "afterTtile" },
														{ label: "Before Posts", value: "beforePosts" },

														{ label: "After Posts", value: "afterPosts" },
													]}
													onChange={(newVal) => {
														var options = {
															...items.options,
															postCountPosition: newVal,
														};
														setAttributes({
															items: { ...items, options: options },
														});
													}}
												/>
											</PanelRow>

											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Post Count Text
												</label>
												<InputControl
													value={items.options.postCountText}
													onChange={(newVal) => {
														var options = {
															...items.options,
															postCountText: newVal,
														};
														setAttributes({
															items: { ...items, options: options },
														});
													}}
												/>
											</PanelRow>

											<PanelRow className="my-3">
												<label>Column Count</label>
												<IconToggle
													position="bottom"
													variant="secondary"
													iconList={breakPointList}
													buttonTitle="Break Point Switch"
													onChange={onChangeBreakPoint}
													activeIcon={breakPoints[breakPointX].icon}
													value={breakPointX}
												/>
											</PanelRow>
											<PanelRow>
												<InputControl
													value={
														items.options.gridColNumber == undefined ||
														items.options.gridColNumber[breakPointX] ==
															undefined
															? 1
															: items.options.gridColNumber[breakPointX].val
													}
													type="number"
													onChange={(newVal) => {
														var newValuesObj = {};
														if (
															Object.keys(items.options.gridColNumber).length ==
															0
														) {
															newValuesObj[breakPointX] = {
																val: newVal,
																unit: "fr",
															};
														} else {
															var unit =
																newValuesObj[breakPointX] != undefined
																	? newValuesObj[breakPointX].unit
																	: "fr";

															newValuesObj = items.options.gridColNumber;
															newValuesObj[breakPointX] = {
																val: newVal,
																unit: unit,
															};
														}

														var options = {
															...items.options,
															gridColNumber: newValuesObj,
														};
														setAttributes({
															items: { ...items, options: options },
														});
													}}
												/>
												<SelectControl
													className="mb-0"
													value={
														items.options.gridColNumber == undefined ||
														items.options.gridColNumber[breakPointX] ==
															undefined
															? "fr"
															: items.options.gridColNumber[breakPointX].unit
													}
													options={[
														{ label: "fr", value: "fr" },
														{ label: "px", value: "px" },
														{ label: "%", value: "%" },
														{ label: "em", value: "em" },
													]}
													onChange={(newVal) => {
														var newValuesObj = {};
														if (
															Object.keys(items.options.gridColNumber).length ==
															0
														) {
															newValuesObj[breakPointX] = {
																val: 1,
																unit: newVal,
															};
														} else {
															var val =
																newValuesObj[breakPointX] != undefined
																	? newValuesObj[breakPointX].val
																	: "fr";

															newValuesObj = items.options.gridColNumber;
															newValuesObj[breakPointX] = {
																val: val,
																unit: newVal,
															};
														}

														var options = {
															...items.options,
															gridColNumber: newValuesObj,
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
											Link To Term
										</label>
										<SelectControl
											label=""
											value={items.options.linkToTerm}
											options={[
												{ label: "True", value: 1 },
												{ label: "False", value: 0 },
											]}
											onChange={(newVal) => {
												var options = { ...items.options, linkToTerm: newVal };
												setAttributes({
													items: { ...items, options: options },
												});
											}}
										/>
									</PanelRow>

									{items.options.viewType == "accordion" ||
										(items.options.viewType == "list" && (
											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Hierarchicaly
												</label>
												<SelectControl
													label=""
													value={items.options.hierarchicaly}
													options={[
														{ label: "True", value: 1 },
														{ label: "False", value: 0 },
													]}
													onChange={(newVal) => {
														var options = {
															...items.options,
															hierarchicaly: newVal,
														};
														setAttributes({
															items: { ...items, options: options },
														});
													}}
												/>
											</PanelRow>
										))}

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
												var options = { ...items.options, linkTarget: newVal };
												setAttributes({
													items: { ...items, options: options },
												});
											}}
										/>
									</PanelRow>

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
															className="mr-2"
															placeholder="Name"
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
															className="mr-2"
															placeholder="Value"
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
															className="text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close"
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
															}}></span>
													</PanelRow>
												</div>
											);
										})}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={items}
										onChange={onChangeStyleItems}
										onBulkAdd={onBulkAddItems}
										onAdd={onAddStyleItems}
										onRemove={onRemoveStyleItems}
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
													label: "Before Front text",
													value: "beforeFronttext",
												},
												{ label: "After Front text", value: "afterFronttext" },
												{ label: "Before Items", value: "beforeItems" },
												{ label: "After Items", value: "afterItems" },
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
										onBulkAdd={onBulkAddIcon}
										onAdd={onAddStyleIcon}
										onRemove={onRemoveStyleIcon}
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
										onBulkAdd={onBulkAddSeperator}
										onRemove={onRemoveStyleSeparator}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Block Variations"
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={"terms-list"}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
							/>
						</PanelBody>

						<div className="px-2">
							<PGMailSubsctibe />
							<PGContactSupport
								utm={{
									utm_source: "BlockPostTitle",
									utm_campaign: "PostGridCombo",
									utm_content: "BlockOptions",
								}}
							/>
						</div>
					</div>
				</InspectorControls>

				<>
					{taxonomies.options.taxName.length == 0 && (
						<div {...blockProps}>
							<PanelRow>
								<label for="" className="font-medium text-slate-900 ">
									Select Taxonomy
								</label>
								<PGDropdown
									position="bottom right"
									variant="secondary"
									options={postObjects}
									buttonTitle="Choose"
									onChange={setTaxonomy}
									values={taxonomies.options.taxName}></PGDropdown>
							</PanelRow>

							<PanelRow>
								<label for="" className="font-medium text-slate-900 ">
									Custom Taxonomy
								</label>
								<InputControl
									value={taxonomies.options.taxName}
									onChange={(newVal) => {
										var options = { ...taxonomies.options, taxName: newVal };
										setAttributes({
											taxonomies: { ...taxonomies, options: options },
										});
									}}
								/>
							</PanelRow>
						</div>
					)}

					{taxonomies.options.taxName.length > 0 && categories.length == 0 && (
						<div {...blockProps}>No Terms Found</div>
					)}

					{taxonomies.options.taxName.length > 0 && categories.length > 0 && (
						<div {...blockProps}>
							{icon.options.position == "beforeFronttext" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}

							<span className="frontText">
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
									<a
										onClick={(ev) => ev.preventDefault()}
										target={items.options.linkTarget}
										title={x.name}
										{...linkAttrItems}
										className={items.options.class}
										href={x.link}>
										<span className="termTitle">
											{items.options.prefix}
											{x.name}
											{items.options.postfix}
										</span>
										{items.options.postCount == true && (
											<span className="postCount">({x.count})</span>
										)}
										{categories.length > index + 1 && (
											<span className="separator">
												{separator.options.text}{" "}
											</span>
										)}
									</a>
								);
							})}
							{icon.options.position == "afterItems" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}

							<p>
								Live Preview is not available at the moment, please visit page
								and see it.
							</p>
						</div>
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
