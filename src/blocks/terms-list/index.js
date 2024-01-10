import apiFetch from "@wordpress/api-fetch";
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { useEntityProp } from "@wordpress/core-data";

import { registerBlockType, serialize } from "@wordpress/blocks";
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
	Popover,
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
	close,
	mediaAndText,
} from "@wordpress/icons";

import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	RichText,
	__experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import { __experimentalInputControl as InputControl } from "@wordpress/components";
import { applyFilters } from "@wordpress/hooks";
import breakPoints from "../../breakpoints";
const { RawHTML } = wp.element;
import { store } from "../../store";

import IconToggle from "../../components/icon-toggle";

import PGDropdown from "../../components/dropdown";
import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";
import PGIconPicker from "../../components/icon-picker";
import PGLibraryBlockVariations from "../../components/library-block-variations";

import queryPresets from "./query-presets";
import termsQueryPrams from "./queryprams";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import metadata from "./block.json";
import PGcssClassPicker from "../../components/css-class-picker";
import customTags from "../../custom-tags";
import PGinputSelect from "../../components/input-select";

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
					d="M69.3335 61H0V78.3334H69.3335V61Z"
					fill="url(#paint0_linear_61_610)"
				/>
				<path
					d="M9.33389 71.6666L5.77832 68.1111C5.77832 68.1111 5.77832 67.6666 5.77832 67.2222C5.77832 67.2222 6.22277 67.2222 6.66721 67.2222L9.33389 70.3333L12.0006 67.2222C12.0006 67.2222 12.445 66.7777 12.8895 67.2222C12.8895 67.2222 13.3339 67.6666 12.8895 68.1111L9.33389 71.6666Z"
					fill="#C15940"
				/>
				<path
					d="M61.3339 67.2224H18.2227V71.6669H61.3339V67.2224Z"
					fill="#C15940"
				/>
				<path
					d="M160 61H90.6665V78.3334H160V61Z"
					fill="url(#paint1_linear_61_610)"
				/>
				<path
					d="M99.9999 71.6666L96.4443 68.1111C96.4443 68.1111 96.4443 67.6666 96.4443 67.2222C96.4443 67.2222 96.8888 67.2222 97.3332 67.2222L99.9999 70.3333L102.667 67.2222C102.667 67.2222 103.111 66.7777 103.555 67.2222C103.555 67.2222 104 67.6666 103.555 68.1111L99.9999 71.6666Z"
					fill="#C15940"
				/>
				<path d="M152 67.2224H108.889V71.6669H152V67.2224Z" fill="#C15940" />
				<path
					d="M69.3335 92.5554H0V109.889H69.3335V92.5554Z"
					fill="url(#paint2_linear_61_610)"
				/>
				<path
					d="M9.33389 103.667L5.77832 100.111C5.77832 100.111 5.77832 99.6666 5.77832 99.2222C5.77832 99.2222 6.22277 99.2222 6.66721 99.2222L9.33389 102.333L12.0006 99.2222C12.0006 99.2222 12.445 98.7777 12.8895 99.2222C12.8895 99.2222 13.3339 99.6666 12.8895 100.111L9.33389 103.667Z"
					fill="#C15940"
				/>
				<path
					d="M61.3339 98.7778H18.2227V103.222H61.3339V98.7778Z"
					fill="#C15940"
				/>
				<path
					d="M160 92.5554H90.6665V109.889H160V92.5554Z"
					fill="url(#paint3_linear_61_610)"
				/>
				<path
					d="M99.9999 103.667L96.4443 100.111C96.4443 100.111 96.4443 99.6666 96.4443 99.2222C96.4443 99.2222 96.8888 99.2222 97.3332 99.2222L99.9999 102.333L102.667 99.2222C102.667 99.2222 103.111 98.7777 103.555 99.2222C103.555 99.2222 104 99.6666 103.555 100.111L99.9999 103.667Z"
					fill="#C15940"
				/>
				<path d="M152 98.7778H108.889V103.222H152V98.7778Z" fill="#C15940" />
				<defs>
					<linearGradient
						id="paint0_linear_61_610"
						x1="0"
						y1="69.6667"
						x2="69.3335"
						y2="69.6667"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_610"
						x1="90.6665"
						y1="69.6667"
						x2="160"
						y2="69.6667"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_610"
						x1="0"
						y1="101.222"
						x2="69.3335"
						y2="101.222"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_610"
						x1="90.6665"
						y1="101.222"
						x2="160"
						y2="101.222"
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
		var blockCssY = attributes.blockCssY;

		var queryArgs = attributes.queryArgs;

		var utmTracking = attributes.utmTracking;

		var termTitle = attributes.termTitle;
		var postCount = attributes.postCount;

		var taxonomies = attributes.taxonomies;

		var postId = context["postId"];
		var postType = context["postType"];

		var breakPointX = myStore.getBreakPoint();

		let isProFeature = applyFilters("isProFeature", true);

		const [postObjects, setPostObjects] = useState([]);

		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		const itemsSelector = blockClass + " .item";
		const termTitleSelector = blockClass + " .termTitle";

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
				// console.log(res);
				setPostObjects(res);
			});

			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[itemsSelector] = items;
			blockCssObj[termTitleSelector] = termTitle;
			blockCssObj[separatorSelector] = separator;
			blockCssObj[frontTextSelector] = frontText;
			blockCssObj[postCountSelector] = postCount;
			blockCssObj[iconSelector] = icon;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var itemX = { ...blockCssY.items, ...blockCssRules };
			setAttributes({ blockCssY: { items: itemX } });
		}, [blockId]);

		const [categories, setCategories] = useState([]); // Using the hook.
		const [taxonomy, setTaxonomy] = useState(false);

		
		function fetchTerms() {
			// setIsBusy(true);
			var arg = queryArgs.items.map((item) => {
				return { id: item.id, val: item.val };
			});

			apiFetch({
				path: "/post-grid/v2/get_terms",
				method: "POST",
				data: { queryArgs: arg },
			}).then((res) => {
				// setIsBusy(false);

				
				if (res.posts !== undefined) {
					setCategories(res.posts);
				}
			});
		}

		useEffect(() => {
			fetchTerms();

			function hasId(id) {
				return queryArgs.items.some((item) => item.id === id);
			}

			// Check if 'taxonomy' ID exists in the 'items' array
			const hasTaxonomy = hasId("taxonomy");

			if (hasTaxonomy) {
				setTaxonomy(true);
			} else {
				setTaxonomy(false);
			}

		}, [queryArgs]);

		const [categoryCount, setcategoryCount] = useState(0); // Using the hook.
		const [postCategoriesData, setPostCategoriesData] = useState([]); // Using the hook.

		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);

		const [postCategoriesX, setPostCategoriesX] = useEntityProp(
			"postType",
			postType,
			taxonomies.options.taxName,
			postId
		);

		var linkToArgsBasic = {
			noUrl: { label: "No URL", value: "" },
			termUrl: { label: "Term URL", value: "termUrl" },

			// postUrl: { label: "Post URL", value: "postUrl" },
			// homeUrl: { label: "Home URL", value: "homeUrl" },
			// authorUrl: { label: "Author URL", value: "authorUrl" },
			// authorLink: { label: "Author Link", value: "authorLink" },
			// authorMail: { label: "Author Mail", value: "authorMail", isPro: true },
			// authorMeta: { label: "Author Meta", value: "authorMeta", isPro: true },
			// customField: { label: "Custom Field", value: "customField", isPro: true },
			// customUrl: { label: "Custom URL", value: "customUrl", isPro: true },
		};

		// let linkToArgs = applyFilters("linkToArgs", linkToArgsBasic);
		// let linkToArgs = applyFilters("linkToArgTerms", linkToArgsBasic);
		let linkToArgs = linkToArgsBasic

		function setFieldLinkTo(option, index) {
			var options = { ...items.options, linkTo: option.value };
			setAttributes({ items: { ...items, options: options } });
		}

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

		// useEffect(() => {
		// 	setPostCategoriesData([]);
		// 	setCategories([]);

		// 	setcategoryCount(categories.length - 1);

		// 	if (postCategoriesX != undefined) {
		// 		for (x in postCategoriesX) {
		// 			var catId = postCategoriesX[x];
		// 			var assd = x;

		// 			if (x) {
		// 				apiFetch({
		// 					path: "/wp/v2/" + taxonomies.options.taxName + "/" + catId,
		// 					method: "GET",
		// 				}).then((res) => {
		// 					setPostCategoriesData((current) => [...current, res]);
		// 					setCategories((current) => [...current, res]);
		// 				});
		// 			}
		// 		}
		// 	} else {
		// 		setPostCategoriesData(dummyCats);
		// 		setCategories(dummyCats);
		// 	}
		// }, [postCategoriesX]);

		// useEffect(() => {
		// 	var asdasd = postCategoriesData.slice(0, items.options.maxCount);

		// 	setCategories(asdasd);
		// }, [postCategoriesData]);

		// useEffect(() => {
		// 	var maxCount =
		// 		items.options.maxCount.length > 0 ? items.options.maxCount : 99;

		// 	if (postCategoriesX != undefined && postCategoriesX.length > 0) {
		// 		setcategoryCount(categories.length - 1);
		// 		var asdasd = postCategoriesData.slice(0, maxCount);

		// 		setCategories(asdasd);
		// 	} else {
		// 		var asdasd = dummyCats.slice(0, maxCount);

		// 		setCategories(asdasd);
		// 	}
		// }, [items]);

		// const [currentPostUrl, setCurrentPostUrl] = useEntityProp(
		// 	"postType",
		// 	postType,
		// 	"link",
		// 	postId
		// );

		// var postUrl =
		// 	postTitle.options.customUrl != undefined &&
		// 	postTitle.options.customUrl.length > 0
		// 		? postTitle.options.customUrl
		// 		: currentPostUrl;

		const [iconHtml, setIconHtml] = useState("");

		useEffect(() => {
			var iconSrc = icon.options.iconSrc;

			var iconHtml = `<span className="${iconSrc}"></span>`;

			setIconHtml(iconHtml);
		}, [icon]);

		var RemoveQueryPram = function ({ title, index }) {
			return (
				<>
					<span
						className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
						onClick={(ev) => {
							var items = [...queryArgs.items];
							var item = { ...queryArgs.items[index] };

							items.splice(index, 1);
							//setAttributes({ queryArgs: { items: queryArgsX.items } });

							setAttributes({
								queryArgs: { ...queryArgs, items: items },
							});
						}}>
						<Icon icon={close} />
					</span>
					<span className="mx-2">{title}</span>
				</>
			);
		};

		function updateQueryPram(newVal, index) {
			var items = [...queryArgs.items];
			var item = { ...queryArgs.items[index] };

			item.val = newVal;
			items[index] = item;

			setAttributes({
				queryArgs: { ...queryArgs, items: items },
			});

			// fetchPosts();
		}

		function generateQueryArgOptions(item, index) {
			var itemId = item.id;

			return (
				<div className="">
					<PanelBody
						title={
							<RemoveQueryPram
								title={
									termsQueryPrams[itemId] == undefined
										? itemId
										: termsQueryPrams[itemId].label
								}
								index={index}
							/>
						}
						initialOpen={false}>
						{item.id == "taxonomy" && (
							<div>
								<PanelRow>
									<label
										for=""
										className="font-medium text-slate-900 underline decoration-dotted underline-offset-2 "
										data-pgTooltip={termsQueryPrams[itemId].longDescription}
										data-pgTooltip-location="bottom">
										Select Taxonomy
									</label>
									<PGDropdown
										position="bottom right"
										variant="secondary"
										options={postObjects}
										buttonTitle="Choose"
										// onChange={setTaxonomy}
										onChange={(newVal) => updateQueryPram(newVal.id, index)}
										values={queryArgs.items[index].val}></PGDropdown>
								</PanelRow>
							</div>
						)}
						{item.id == "order" && (
							<div className={item.id == "order" ? "" : "hidden"}>
								<SelectControl
									style={{ margin: 0 }}
									label=""
									value={queryArgs.items[index].val}
									options={[
										{ label: "Ascending", value: "ASC" },
										{ label: "Descending", value: "DESC" },
									]}
									onChange={(newVal) => updateQueryPram(newVal, index)}
								/>
							</div>
						)}
						{item.id == "get" && (
							<div className={item.id == "get" ? "" : "hidden"}>
								<SelectControl
									style={{ margin: 0 }}
									label=""
									value={queryArgs.items[index].val}
									options={[
										{ label: "All", value: "all" },
										{ label: "Disable", value: "" },
									]}
									onChange={(newVal) => updateQueryPram(newVal, index)}
								/>
							</div>
						)}
						{(item.id == "include" ||
							item.id == "exclude" ||
							item.id == "exclude_tree" ||
							item.id == "offset" ||
							item.id == "name" ||
							item.id == "number" ||
							item.id == "slug" ||
							item.id == "search" ||
							item.id == "name__like" ||
							item.id == "description__like" ||
							item.id == "child_of" ||
							item.id == "parent" ||
							item.id == "cache_domain" ||
							item.id == "meta_value" ||
							item.id == "meta_key") && (
							<div>
								<InputControl
									value={termsQueryPrams[itemId].value}
									type={
										item.id == "offset" ||
										item.id == "number" ||
										item.id == "child_of" ||
										item.id == "parent"
											? "number"
											: "text"
									}
									placeholder={
										termsQueryPrams[itemId].placeholder != undefined
											? termsQueryPrams[itemId].placeholder
											: ""
									}
									onChange={(newVal) => {
										//clearTimeout(debounce);
										//debounce = setTimeout(() => {
										updateQueryPram(newVal, index);
										//}, 1000);
									}}
								/>
								<p className="text-[10px] pt-2 text-gray-500 flex gap-2 justify-between items-center">
									<span>{termsQueryPrams[itemId].description}</span>
									<span
										className="w-6 h-6 border rounded-full border-solid flex items-center justify-center border-amber-500"
										data-pgTooltip={termsQueryPrams[itemId].longDescription}
										data-pgTooltip-location="left">
										{" "}
										?
									</span>{" "}
								</p>
							</div>
						)}
						{(item.id == "hide_empty" ||
							// item.id == "number" ||
							item.id == "count" ||
							item.id == "hierarchical" ||
							item.id == "pad_counts" ||
							item.id == "childless" ||
							item.id == "update_term_meta_cache") && (
							<div>
								<ToggleControl
									label={termsQueryPrams[itemId].label}
									help={
										queryArgs.items[index].val
											? "Hide Empty Enabled"
											: "Hide Empty Disabled"
									}
									checked={queryArgs.items[index].val ? true : false}
									onChange={(e) => {
										if (queryArgs.items[index]?.val == true) {
											updateQueryPram(false, index);
										}
										if (queryArgs.items[index]?.val == false) {
											updateQueryPram(true, index);
										}
									}}
								/>
							</div>
						)}
						{item.id == "orderby" && (
							<div className={item.id == "orderby" ? "" : "hidden"}>
								<SelectControl
									value={item.value}
									options={[
										{ label: "None", value: "none" },
										{ label: "ID", value: "ID" },
										{ label: "Author", value: "author" },
										{ label: "Title", value: "title" },
										{ label: "Name", value: "name" },

										{ label: "Type", value: "type" },
										{ label: "Date", value: "date" },
										{ label: "Modified", value: "modified" },
										{ label: "Parent", value: "parent" },
										{ label: "Random", value: "rand" },
										{ label: "Comment Count", value: "comment_count" },
										{ label: "Relevance", value: "relevance" },
										{ label: "Menu Order", value: "menu_order" },
										{ label: "Meta Value(String)", value: "meta_value" },
										{ label: "Meta Value(Number)", value: "meta_value_num" },
										{ label: "post__in", value: "post__in" },
										{ label: "post_name__in", value: "post_name__in" },
										{ label: "post_parent__in", value: "post_parent__in" },
									]}
									multiple={true}
									onChange={(newVal) => {
										updateQueryPram(newVal, index);
									}}
								/>
							</div>
						)}
					</PanelBody>
				</div>
			);
		}

		function addQueryPram(option, index) {
			var id = option.id;

			var items = [...queryArgs.items];
			var itemX = { ...queryArgs.items[index] };

			var data = { val: termsQueryPrams[id].value, id: id };
			var multiple = data.multiple;

			var isExist = items.map((item) => {
				if (item.id == id) {
					return true;
				}
			});

			var itemsX = items.concat([data]);

			//setAttributes({ queryArgs: { items: items } });
			setAttributes({
				queryArgs: { ...queryArgs, items: itemsX },
			});
		}

		function addQueryPreset(option, index) {
			var items = [...queryArgs.items];
			var item = { ...queryArgs.items[index] };

			items = option.value.items;
			//setAttributes({ queryArgs: { items: queryArgsX.items } });
			setAttributes({
				queryArgs: { ...queryArgs, items: items },
			});

			fetchPosts();
		}

		// function setTaxonomy(option, index) {
		// 	var options = { ...taxonomies.options, taxName: option.id };
		// 	setAttributes({ taxonomies: { ...taxonomies, options: options } });

		// 	// var attrExist = false;

		// 	// var data = termsQueryPrams[index];
		// 	// var multiple = data.multiple;

		// 	// var isExist = queryArgs.items.map((item) => {

		// 	//   if (item.id == index) {
		// 	//     return true;
		// 	//   }
		// 	// })

		// 	// var items = queryArgs.items.concat([data])
		// 	// setAttributes({ queryArgs: { items: items } });
		// }

		function onPickBlockPatterns(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;

			var blocks = content.length > 0 ? parse(content) : "";

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
				var termTitleX = attributes.termTitle;
				var postCountX = attributes.postCount;
				var separatorX = attributes.separator;
				var frontTextX = attributes.frontText;
				var blockCssYX = attributes.blockCssY;

				var blockCssObj = {};

				if (taxonomiesX != undefined) {
					var taxonomiesY = { ...taxonomiesX, options: taxonomies.options };
					setAttributes({ taxonomies: taxonomiesY });
					blockCssObj[taxonomiesSelector] = taxonomiesY;
				}

				if (postCountX != undefined) {
					var postCountY = { ...postCountX, options: postCount.options };
					setAttributes({ postCount: postCountY });
					blockCssObj[postCountSelector] = postCountY;
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

				if (termTitleX != undefined) {
					var termTitleY = { ...termTitleX, options: termTitle.options };
					setAttributes({ termTitle: termTitleY });
					blockCssObj[termTitleSelector] = termTitleY;
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
			let obj = Object.assign({}, items);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ items: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemsSelector
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
				itemsSelector
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

			var object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ items: object });
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
						itemsSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ items: obj });
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
						{/* <div className="px-3">
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

						</div> */}
						<PanelBody title="Query Terms" initialOpen={true}>
							<PanelRow className="my-3 flex gap-2">
								{/* <PGDropdown
									position="bottom right"
									btnClass="py-2"
									variant="secondary"
									options={queryPresets}
									buttonTitle="Query Presets"
									onChange={addQueryPreset}
									values={""}></PGDropdown> */}
								<PGDropdown
									position="bottom right"
									variant="secondary"
									options={termsQueryPrams}
									buttonTitle="Query Terms"
									onChange={addQueryPram}
									values=""></PGDropdown>
							</PanelRow>

							{queryArgs.items.map((item, index) => {
								return generateQueryArgOptions(item, index);
							})}
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
									{/* <PanelRow>
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
									</PanelRow> */}
									{/* <PanelRow>
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
									</PanelRow> */}
									{/* <PanelRow>
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
									</PanelRow> */}
									{/* {items.options.viewType == "accordion" && (
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
									)} */}
									{/* <PanelRow>
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
									</PanelRow> */}
									{/* {items.options.viewType == "accordion" ||
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
										))} */}
									{/* <ToggleControl
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
									/> */}
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
									{/* <PanelRow>
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
									</PanelRow> */}
									{/* //// link to start */}
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
													? "Choose"
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
															className="font-medium text-slate-900  pg-font  ">
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
																			items: {
																				...items,
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
																		value={items.options.customUrl}
																		onChange={(newVal) => {
																			var options = {
																				...items.options,
																				customUrl: newVal.url,
																			};

																			setAttributes({
																				items: {
																					...items,
																					options: options,
																				},
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
									{/* //// link to end */}
									{/* <PanelRow>
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
									</PanelRow> */}
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
					{taxonomy == false && (
						<div {...blockProps}>
							{/* <PanelRow>
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
							</PanelRow> */}
							Add Query Terms to show the term list.
						</div>
					)}

					{taxonomy && categories.length == 0 && (
						<div {...blockProps}>No Terms Found</div>
					)}

					{taxonomy && categories.length > 0 && (
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
									<>
										{items.options.linkTo != undefined &&
											items.options.linkTo.length == 0 && (
												<span
													// onClick={(ev) => ev.preventDefault()}
													// target={items.options.linkTarget}
													title={x.name}
													{...linkAttrItems}
													className={items.options.class}
													// href={x.link}
												>
													<span className="termTitle">
														{items.options.prefix}
														{x.name}
														{items.options.postfix}
													</span>
													{items.options.postCount == true && (
														<span className="postCount">{x.count}</span>
													)}
													{categories.length > index + 1 && (
														<span className="separator">
															{separator.options.text}{" "}
														</span>
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
													<span className="termTitle">
														{items.options.prefix}
														{x.name}
														{items.options.postfix}
													</span>
													{items.options.postCount == true && (
														<span className="postCount">{x.count}</span>
													)}
													{categories.length > index + 1 && (
														<span className="separator">
															{separator.options.text}{" "}
														</span>
													)}
												</a>
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
