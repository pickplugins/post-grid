import {
	registerBlockType,
	serializeRawBlock,
	serialize,
} from "@wordpress/blocks";
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
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from "@wordpress/block-editor";
import { createBlocksFromInnerBlocksTemplate } from "@wordpress/blocks";
import { applyFilters } from "@wordpress/hooks";
import { store as coreStore } from "@wordpress/core-data";
import {
	BlockContextProvider,
	__experimentalUseBlockPreview as useBlockPreview,
} from "@wordpress/block-editor";
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
const { parse } = wp.blockSerializationDefaultParser;

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

import queryPresets from "./query-presets";
import queryPrams from "./queryprams";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import PGCssLibrary from "../../components/css-library";
import PGIconPicker from "../../components/icon-picker";
import PGDropdown from "../../components/dropdown";
import PGinputSelect from "../../components/input-select";
import metadata from "./block.json";
import PGTutorials from "../../components/tutorials";

var myStore = wp.data.select("postgrid-shop");

// var queryPramsX = queryPrams.map((x, i) => {

//   return { value: i, label: x.label, description: x.description, isPro: x.isPro, }
// })

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
					d="M66.9973 7H27.833C26.9674 7 26.1373 7.34385 25.5252 7.95591C24.9132 8.56797 24.5693 9.3981 24.5693 10.2637V42.9006C24.5693 43.7662 24.9132 44.5963 25.5252 45.2084C26.1373 45.8204 26.9674 46.1643 27.833 46.1643H66.9973C67.8629 46.1643 68.693 45.8204 69.3051 45.2084C69.9171 44.5963 70.261 43.7662 70.261 42.9006V10.2637C70.261 9.3981 69.9171 8.56797 69.3051 7.95591C68.693 7.34385 67.8629 7 66.9973 7ZM63.7336 39.6369H31.0967V13.5274H63.7336V39.6369Z"
					fill="url(#paint0_linear_61_69)"
				/>
				<path
					d="M135.535 16.791H83.3164V23.3184H135.535V16.791Z"
					fill="url(#paint1_linear_61_69)"
				/>
				<path
					d="M122.481 29.8457H83.3164V36.3731H122.481V29.8457Z"
					fill="url(#paint2_linear_61_69)"
				/>
				<path
					d="M28.0221 65.7147L28.021 65.7134C27.2356 64.8585 26.7572 63.8486 26.6206 62.7999C26.4842 61.7523 26.6917 60.6878 27.2304 59.7216C27.7703 58.7533 28.6257 57.9154 29.716 57.314C30.8047 56.7134 32.0769 56.3771 33.3901 56.3499H125.729C127.027 56.3765 128.285 56.7051 129.366 57.2928C130.448 57.8809 131.302 58.701 131.851 59.6516C132.396 60.616 132.61 61.6801 132.48 62.7287C132.35 63.7785 131.878 64.7909 131.097 65.6494C131.097 65.6497 131.096 65.6501 131.096 65.6505L95.2332 104.881L95.233 104.882C94.5921 105.583 94.2315 106.467 94.2382 107.393V150.445C94.235 150.879 94.0948 151.314 93.8179 151.704C93.5394 152.097 93.1311 152.432 92.6248 152.663C92.1185 152.893 91.5416 153.006 90.9568 152.983C90.3725 152.961 89.8127 152.804 89.337 152.538C89.3366 152.538 89.3362 152.538 89.3359 152.538L66.2508 139.462L66.2475 139.46C65.8125 139.217 65.4679 138.893 65.2342 138.527C65.0016 138.163 64.8839 137.765 64.8811 137.367V107.458C64.8878 106.532 64.5271 105.648 63.8862 104.947L63.8861 104.947L28.0221 65.7147ZM86.9037 144.954L87.9695 145.559V144.333L87.9695 107.393C87.9695 107.392 87.9695 107.392 87.9695 107.392C87.977 105.415 88.7538 103.479 90.207 101.888L126.262 62.6579L127.362 61.4612H125.736H33.3829H31.7576L32.8574 62.6579L68.9123 101.888C68.9125 101.889 68.9128 101.889 68.913 101.889C70.3657 103.48 71.1423 105.415 71.1498 107.392C71.1498 107.392 71.1498 107.392 71.1498 107.393L71.1498 135.604V136.02L71.5114 136.225L86.9037 144.954Z"
					fill="#C15940"
					stroke="#C15940"
					stroke-width="1.42743"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_69"
						x1="24.5693"
						y1="26.5821"
						x2="70.261"
						y2="26.5821"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_69"
						x1="83.3164"
						y1="20.0547"
						x2="135.535"
						y2="20.0547"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_69"
						x1="83.3164"
						y1="33.1094"
						x2="122.481"
						y2="33.1094"
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

		var noPostsWrap = attributes.noPostsWrap;
		var spinnerWrap = attributes.spinnerWrap;

		var queryArgs = attributes.queryArgs;
		var itemsWrap = attributes.itemsWrap;
		var itemWrap = attributes.itemWrap;

		var blockCssY = attributes.blockCssY;
		const CustomTagItemWrapper = `${itemWrap.options.tag}`;

		var parentQueryArgs =
			context["post-grid/queryArgs"] == undefined
				? null
				: context["post-grid/queryArgs"];
		var parentLayout =
			context["post-grid/layout"] == undefined
				? null
				: context["post-grid/layout"];
		var postGridId =
			context["post-grid/postGridId"] == undefined
				? null
				: context["post-grid/postGridId"];

		var breakPointX = myStore.getBreakPoint();
		let isProFeature = applyFilters("isProFeature", true);

		const [clientData, setClientData] = useState({});
		var [isBusy, setIsBusy] = useState(false); // Using the hook.
		var [importLayoutOpen, setimportLayoutOpen] = useState({
			id: 0,
			isOpen: false,
		}); // Using the hook.

		var clientDataX = myStore != null ? myStore.getclientdata() : "";

		useEffect(() => {
			setClientData(myStore != null ? myStore.getclientdata() : "");
		}, [clientDataX]);

		useEffect(() => {
			if (parentQueryArgs != null && queryArgs.items.length == 0) {
				setAttributes({ queryArgs: parentQueryArgs });
			}
		}, [parentQueryArgs]);

		useEffect(() => {
			if (parentLayout != null && parentLayout.rawData.length > 0) {
				// console.log(parentLayout);

				//setAttributes({ layout: parentLayout });
			}
		}, [parentLayout]);

		const { replaceInnerBlocks } = useDispatch(blockEditorStore);

		const TEMPLATE = [
			["post-grid/post-featured-image"],
			["post-grid/post-title"],
			["post-grid/post-excerpt"],
		];

		var oldLayout = parentLayout != null ? parse(parentLayout.rawData) : [];

		var oldTemplate = ObjectToArr(oldLayout);

		var [TEMPLATEX, setTEMPLATEX] = useState(
			oldTemplate.length > 0 ? oldTemplate : TEMPLATE
		); // Using the hook.

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });

			myStore.generateBlockCss(blockCssY.items, blockId);

			setAttributes({ blockCssY: { items: blockCssY.items } });
		}, [clientId]);

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		const [posts, setPosts] = useState([]); // Using the hook.
		const [activeBlockContextId, setActiveBlockContextId] = useState();

		const [queryLayouts, setQueryLayouts] = useState({
			keyword: "",
			page: 1,
			category: "",
		});
		var [layoutList, setLayoutList] = useState({ items: [] });
		var [layoutData, setLayoutData] = useState({ source: "library" });
		var [layoutLoading, setLayoutLoading] = useState(false);
		var [layoutCats, setLayoutCats] = useState([]);
		var select = wp.data.select("core/block-editor");

		var blocks = select.getBlocks(clientId);

		function PostTemplateInnerBlocks({ attsx }) {
			const innerBlocksProps = useInnerBlocksProps(
				{ className: itemWrap.options.class },
				{ template: attsx }
			);
			return (
				<CustomTagItemWrapper {...innerBlocksProps}></CustomTagItemWrapper>
			);
		}

		function PostTemplateBlockPreview({
			blocks,
			blockContextId,
			isHidden,
			setActiveBlockContextId,
		}) {
			const blockPreviewProps = useBlockPreview({
				blocks,
				props: {
					className: itemWrap.options.class,
				},
			});

			const handleOnClick = () => {
				setActiveBlockContextId(blockContextId);
			};

			const style = {
				display: isHidden ? "none" : undefined,
			};

			return (
				<div
					{...blockPreviewProps}
					tabIndex={0}
					role="button"
					onClick={handleOnClick}
					style={style}
				/>
			);
		}

		const MemoizedPostTemplateBlockPreview = memo(PostTemplateBlockPreview);

		function fetchPosts() {
			setIsBusy(true);

			var arg = queryArgs.items.map((item) => {
				return { id: item.id, val: item.val };
			});

			apiFetch({
				path: "/post-grid/v2/get_posts",
				method: "POST",
				data: { queryArgs: arg, rawData: serialize(blocks) },
			}).then((res) => {
				setIsBusy(false);

				setPosts(res.posts);
			});
		}

		const removeEmptyLines = (str) =>
			str
				.split(/\r?\n/)
				.filter((line) => line.trim() !== "")
				.join("\n");

		function ObjectToArr(obj, arr = []) {
			obj.map((item) => {
				var blockName = item.blockName;
				var attrs = item.attrs;
				var innerBlocks = item.innerBlocks;
				var blockData = [blockName, attrs];

				if (innerBlocks.length > 0) {
					var inner = ObjectToArr(innerBlocks, []);
					var blockData = [blockName, attrs, inner];
				}

				arr.push(blockData);

				//return { blockName, attrs }
			});

			return arr;
		}

		function selectLayout(id, postContent) {
			var str = removeEmptyLines(postContent);
			var someText = str.replace(/(\r\n|\n|\r)/gm, "");

			var srcServer = layoutData.source;
			var blocks = parse(postContent);

			if (srcServer == "library") {
				var arrs = ObjectToArr(blocks);

				replaceInnerBlocks(clientId, createBlocksFromInnerBlocksTemplate(arrs));

				var allStyle = {};

				var allStyleX = getCssfromBlocks(allStyle, blocks);
				var xxx = { ...blockCssY.items, ...allStyleX };
				setAttributes({ blockCssY: { items: xxx } });
			} else {
				apiFetch({
					path: "/post-grid/v2/get_post_data",
					method: "POST",
					data: { postId: id },
				}).then((res) => {
					var postContent = res.post_content.replace(/(^[ \t]*\n)/gm, "");
					var blocks = parse(postContent);

					var allStyle = {};
					var flatObj = [];
					var flatObjCss = [];

					var flatData = flatObject(blocks[0], flatObj, flatObjCss);

					flatData.map((block, i) => {
						var items =
							block.attrs.blockCssY != undefined
								? block.attrs.blockCssY.items
								: [];

						if (Object.entries(items).length > 0) {
							Object.entries(items).map((data) => {
								var handle = data[0];
								var css = data[1];

								allStyle[handle] = css;
							});
						}
					});

					var xxx = { ...blockCssY.items, ...allStyle };

					setAttributes({ blockCssY: { items: xxx } });
				});
			}

			//console.log(wp.data.select('core/block-editor').getBlocks());

			//wp.data.dispatch('core/block-editor').insertBlocks(wp.blocks.parse(post_content));

			//wp.data.dispatch('core/notices').createNotice('success', 'Here is our notice!');

			//var content = "<!-- wp:paragraph --><p>paragraph one</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>then two</p><!-- /wp:paragraph -->";

			//Parse the serialized content into valid blocks using parse from @wordpress/block-serialization-default-parser
			// var gutblock = wp.blocks.rawHandler({
			//   HTML: post_content,
			// });

			//setBlocksX(gutblock)
		}

		function flatObject(block, flatObj, flatObjCss) {
			flatObj.push(block);

			var items =
				block.attrs.blockCssY != undefined ? block.attrs.blockCssY.items : [];

			if (Object.entries(items).length > 0) {
				Object.entries(items).map((data) => {
					var handle = data[0];
					var css = data[1];

					//flatObjCss[handle] = css;
				});
			}

			if (block.innerBlocks != undefined) {
				block.innerBlocks.map((block) => {
					flatObject(block, flatObj);
				});
			}

			return flatObj;
		}

		function getCssfromBlocks(allStyle, blocks) {
			blocks.map((block, i) => {
				var items =
					block.attrs.blockCssY != undefined ? block.attrs.blockCssY.items : [];
				var innerBlocks =
					block.innerBlocks != undefined ? block.innerBlocks : [];

				if (Object.entries(items).length > 0) {
					Object.entries(items).map((data) => {
						var handle = data[0];
						var css = data[1];

						allStyle[handle] = css;
					});
				}

				if (innerBlocks.length > 0) {
					getCssfromBlocks(allStyle, innerBlocks);
				}
			});

			return allStyle;
		}

		useEffect(() => {
			fetchPosts();
		}, [queryArgs]);

		useEffect(() => {
			var keywordLength = queryLayouts.keyword.length;

			if (keywordLength != 0) {
				if (keywordLength >= 4) {
					fetchLayouts();
				} else {
				}
			} else {
				fetchLayouts();
			}
		}, [layoutData]);

		useEffect(() => {
			var keywordLength = queryLayouts.keyword.length;

			if (keywordLength != 0) {
				if (keywordLength >= 4) {
					fetchLayouts();
				} else {
				}
			} else {
				fetchLayouts();
			}
		}, [queryLayouts]);

		var [layoutImporting, setlayoutImporting] = useState(false); // Using the hook.

		function importLayout(postData) {
			setTimeout(() => {
				apiFetch({
					path: "/post-grid/v2/import_post_grid_template",
					method: "POST",
					data: { postData: postData },
				}).then((res) => {
					setlayoutImporting(false);
				});
			}, 2000);
		}

		function fetchLayouts() {
			setLayoutLoading(true);

			if (layoutData.source == "saved") {
				apiFetch({
					path: "/post-grid/v2/get_posts_layout",
					method: "POST",
					data: {
						category: queryLayouts.category,
						page: queryLayouts.page,
						keyword: queryLayouts.keyword,
					},
				}).then((res) => {
					setLayoutList({ items: res.posts });

					setLayoutCats(res.terms);

					setLayoutLoading(false);
				});
			} else {

	var postData = {
			keyword: queryLayouts.keyword,
			page: queryLayouts.page,
			category: queryLayouts.category, 
			
		};
		postData = JSON.stringify(postData);
fetch("https://getpostgrid.com/wp-json/post-grid/v2/get_post_layouts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: postData,
		}).then((response) => {
						if (response.ok && response.status < 400) {
							response.json().then((data) => {
								setLayoutList({ items: data.posts });
								setLayoutCats(data.terms);

								setLayoutLoading(false);
							});
						}
					})
					.catch((_error) => {
						//this.saveAsStatus = 'error';
						// handle the error
					});
			}
		}

		function fetchLayoutData() {
			setQueryLayouts({
				keyword: queryLayouts.keyword,
				page: queryLayouts.page,
				category: queryLayouts.category,
			});

			apiFetch({
				path: "/post-grid/v2/get_posts_layout",
				method: "POST",
				data: {
					category: queryLayouts.category,
					source: queryLayouts.source,
					page: queryLayouts.page,
					keyword: queryLayouts.keyword,
				},
			}).then((_res) => {
				setLayoutData({ source: layoutData.source });
				setQueryLayouts({
					keyword: queryLayouts.keyword,
					page: queryLayouts.page,
					category: queryLayouts.category,
				});
			});
		}

		function updateQueryPram(newVal, index) {
			var items = [...queryArgs.items];
			var item = { ...queryArgs.items[index] };

			item.val = newVal;
			items[index] = item;

			setAttributes({
				queryArgs: { ...queryArgs, items: items },
			});

			fetchPosts();
		}

		function generateQueryArgOptions(item, index) {
			var itemId = item.id;
			

			return (
				<div className=" ">
					<PanelBody
						title={
							<RemoveQueryPram
								title={
									queryPrams[itemId] == undefined
										? itemId
										: queryPrams[itemId].label
								}
								index={index}
							/>
						}
						initialOpen={false}>
						{item.id == "postType" && (
							<div className={item.id == "postType" ? "" : "hidden"}>
								<PGinputSelect
									val={item.val}
									options={postTypes}
									multiple={true}
									onChange={(newVal) => {
										updateQueryPram(newVal, index);
									}}
								/>
							</div>
						)}

						{item.id == "postStatus" && (
							<div className={item.id == "postStatus" ? "" : "hidden"}>
								<PGinputSelect
									val={item.val}
									options={[
										{ label: "Publish", value: "publish" },
										{ label: "Pending", value: "pending" },
										{ label: "Draft", value: "draft" },
										{ label: "Auto draft", value: "auto-draft" },
										{ label: "Future", value: "future" },
										{ label: "Private", value: "private" },
										{ label: "Inherit", value: "inherit" },
										{ label: "Trash", value: "trash" },
										{ label: "Any", value: "any" },
									]}
									multiple={true}
									onChange={(newVal) => {
										updateQueryPram(newVal, index);
									}}
								/>
							</div>
						)}

						{item.id == "order" && (
							<div className={item.id == "order" ? "" : "hidden"}>
								<SelectControl
									style={{ margin: 0 }}
									label=""
									value={item.val}
									options={[
										{ label: "Ascending", value: "ASC" },
										{ label: "Descending", value: "DESC" },
									]}
									onChange={(newVal) => updateQueryPram(newVal, index)}
								/>
							</div>
						)}
						{item.id == "orderby" && (
							<div className={item.id == "orderby" ? "" : "hidden"}>
								{JSON.stringify(item.val)}
								<PGinputSelect
									val={item.val}
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
						{item.id == "taxQueryRelation" && (
							<div className={item.id == "taxQueryRelation" ? "" : "hidden"}>
								<SelectControl
									style={{ margin: 0 }}
									label=""
									value={item.val}
									options={[
										{ label: "OR", value: "OR" },
										{ label: "AND", value: "AND" },
									]}
									onChange={(newVal) => updateQueryPram(newVal, index)}
								/>
							</div>
						)}

						{item.id == "metaQuery" && (
							<div>
								<div>
									<div
										className="cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-blue-600 text-sm"
										onClick={(_ev) => {
											var items = [...queryArgs.items];
											var item = { ...queryArgs.items[index] };

											var xx = item.val.concat({
												fields: [{ key: "", value: "", type: "", compare: "" }],
												relation: "OR",
											});
											items[index].val = xx;
											//setAttributes({ queryArgs: { items: queryArgsX.items } });

											setAttributes({
												queryArgs: { ...queryArgs, items: items },
											});
										}}>
										Add
									</div>
									{item.val.map((x, j) => {
										return (
											<div>
												<PanelBody title="Meta Field" initialOpen={false}>
													<div
														className="cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-red-600 text-sm"
														onClick={(_ev) => {
															var items = [...queryArgs.items];
															var item = { ...queryArgs.items[index] };

															var xx = item.val.splice(j, 1);
															items[index].val = item.val;
															// setAttributes({
															// 	queryArgs: { items: queryArgsX.items },
															// });

															setAttributes({
																queryArgs: { ...queryArgs, items: items },
															});
														}}>
														Remove
													</div>

													<PanelRow>
														<div>Relation</div>
														<SelectControl
															style={{ margin: 0 }}
															label=""
															value={x.relation}
															options={[
																{ label: "OR", value: "OR" },
																{ label: "AND", value: "AND" },
															]}
															onChange={(newVal) => {
																var items = [...queryArgs.items];
																var item = { ...queryArgs.items[index] };

																item.val[j].relation = newVal;

																//var term = itemData.val[j].fields[k]
																//term.taxonomy = newVal;

																items[index].val = item.val;
																// setAttributes({
																// 	queryArgs: { items: queryArgsX.items },
																// });

																setAttributes({
																	queryArgs: { ...queryArgs, items: items },
																});
															}}
														/>
													</PanelRow>
													{x.fields.map((y, k) => {
														return (
															<div className="border-b border-solid border-gray-300 py-3">
																<div
																	className="cursor-pointer block text-right mb-2 px-3 py-1 text-white bg-red-600 text-sm"
																	onClick={(_ev) => {
																		var items = [...queryArgs.items];
																		var item = { ...queryArgs.items[index] };

																		var fields = item.val[j].fields;
																		var xx = item.val[j].fields.splice(k, 1);

																		items[index].val = item.val;
																		// setAttributes({
																		// 	queryArgs: { items: queryArgsX.items },
																		// });

																		setAttributes({
																			queryArgs: { ...queryArgs, items: items },
																		});
																	}}>
																	Remove
																</div>

																<InputControl
																	label="Custom field key"
																	value={y.key}
																	placeholder="meta_key"
																	onChange={(newVal) => {
																		var items = [...queryArgs.items];
																		var item = { ...queryArgs.items[index] };

																		var term = item.val[j].fields[k];
																		term.key = newVal;

																		items[index].val = item.val;
																		// setAttributes({
																		// 	queryArgs: { items: queryArgsX.items },
																		// });

																		setAttributes({
																			queryArgs: { ...queryArgs, items: items },
																		});
																	}}
																/>

																<InputControl
																	label="Meta Value "
																	value={y.value}
																	placeholder="25"
																	onChange={(newVal) => {
																		var items = [...queryArgs.items];
																		var item = { ...queryArgs.items[index] };

																		var term = item.val[j].fields[k];
																		term.value = newVal;

																		items[index].val = item.val;
																		// setAttributes({
																		// 	queryArgs: { items: queryArgsX.items },
																		// });

																		setAttributes({
																			queryArgs: { ...queryArgs, items: items },
																		});
																	}}
																/>

																<PanelRow>
																	<SelectControl
																		style={{ margin: 0 }}
																		label="Custom field type"
																		value={y.type}
																		options={[
																			{ label: "NUMERIC", value: "NUMERIC" },
																			{ label: "BINARY", value: "BINARY" },
																			{ label: "CHAR", value: "CHAR" },
																			{ label: "DATE", value: "DATE" },
																			{ label: "DATETIME", value: "DATETIME" },
																			{ label: "DECIMAL", value: "DECIMAL" },
																			{ label: "SIGNED", value: "SIGNED" },
																			{ label: "TIME", value: "TIME" },
																			{ label: "UNSIGNED", value: "UNSIGNED" },
																		]}
																		onChange={(newVal) => {
																			var items = [...queryArgs.items];
																			var item = { ...queryArgs.items[index] };

																			var term = item.val[j].fields[k];
																			term.type = newVal;

																			items[index].val = item.val;
																			// setAttributes({
																			// 	queryArgs: { items: queryArgsX.items },
																			// });
																			setAttributes({
																				queryArgs: {
																					...queryArgs,
																					items: items,
																				},
																			});
																		}}
																	/>
																	<SelectControl
																		style={{ margin: 0 }}
																		label="compare "
																		value={y.compare}
																		options={[
																			{ label: "=", value: "=" },
																			{ label: "!=", value: "!=" },
																			{ label: ">", value: ">" },
																			{ label: ">=", value: ">=" },
																			{ label: "<", value: "<" },
																			{ label: "<=", value: "<=" },
																			{ label: "LIKE", value: "LIKE" },
																			{ label: "NOT LIKE", value: "NOT LIKE" },
																			{ label: "IN", value: "IN" },
																			{ label: "NOT IN", value: "NOT IN" },
																			{ label: "BETWEEN", value: "BETWEEN" },
																			{
																				label: "NOT BETWEEN",
																				value: "NOT BETWEEN",
																			},
																			{ label: "EXISTS", value: "EXISTS" },
																			{
																				label: "NOT EXISTS",
																				value: "NOT EXISTS",
																			},
																		]}
																		onChange={(newVal) => {
																			var items = [...queryArgs.items];
																			var item = { ...queryArgs.items[index] };

																			var term = item.val[j].fields[k];
																			term.compare = newVal;

																			items[index].val = item.val;

																			setAttributes({
																				queryArgs: {
																					...queryArgs,
																					items: items,
																				},
																			});
																		}}
																	/>
																</PanelRow>
															</div>
														);
													})}
													<div
														className="cursor-pointer text-center px-3 py-1 text-white bg-blue-600 text-sm"
														onClick={(_ev) => {
															var items = [...queryArgs.items];
															var item = { ...queryArgs.items[index] };

															var xx = item.val[j].fields.concat({
																key: "",
																value: "",
																type: "",
																compare: "",
															});
															items[index].val[j].fields = xx;

															setAttributes({
																queryArgs: { ...queryArgs, items: items },
															});
														}}>
														Add
													</div>
												</PanelBody>
											</div>
										);
									})}
								</div>
							</div>
						)}

						{item.id == "dateQuery" && (
							<div>
								<PanelRow className="my-3">
									<label>Add Arguments</label>
									<SelectControl
										options={[
											{ value: "", label: "Select..." },

											{ value: "year", label: "Year" },
											{ value: "month", label: "Month" },
											{ value: "week", label: "Week" },
											{ value: "day", label: "Day" },
											{ value: "hour", label: "Hour" },
											{ value: "minute", label: "Minute" },
											{ value: "second", label: "Second" },
											{ value: "after", label: "After" },
											{ value: "before", label: "Before" },
											{ value: "inclusive", label: "Inclusive" },
											{ value: "compare", label: "Compare" },
											{ value: "column", label: "Column" },
											{ value: "relation", label: "Relation" },
										]}
										onChange={(newVal) => {
											var items = [...queryArgs.items];
											var itemData = { ...queryArgs.items[index] };

											if (newVal == "year") {
												var xx = itemData.val.concat({
													id: "year",
													value: "",
													compare: "",
												});
											}
											if (newVal == "month") {
												var xx = itemData.val.concat({
													id: "month",
													value: "",
													compare: "",
												});
											}
											if (newVal == "week") {
												var xx = itemData.val.concat({
													id: "week",
													value: "",
													compare: "",
												});
											}
											if (newVal == "day") {
												var xx = itemData.val.concat({
													id: "day",
													value: "",
													compare: "",
												});
											}
											if (newVal == "hour") {
												var xx = itemData.val.concat({
													id: "hour",
													value: "",
													compare: "",
												});
											}
											if (newVal == "minute") {
												var xx = itemData.val.concat({
													id: "minute",
													value: "",
													compare: "",
												});
											}
											if (newVal == "second") {
												var xx = itemData.val.concat({
													id: "second",
													value: "",
													compare: "",
												});
											}
											if (newVal == "inclusive") {
												var xx = itemData.val.concat({
													id: "inclusive",
													value: true,
												});
											}
											if (newVal == "compare") {
												var xx = itemData.val.concat({
													id: "compare",
													value: "",
												});
											}
											if (newVal == "column") {
												var xx = itemData.val.concat({
													id: "column",
													value: "",
												});
											}
											if (newVal == "relation") {
												var xx = itemData.val.concat({
													id: "relation",
													value: "",
												});
											}
											if (newVal == "before") {
												var xx = itemData.val.concat({
													id: "before",
													value: "",
													year: "",
													month: "",
													day: "",
												});
											}

											if (newVal == "after") {
												var xx = itemData.val.concat({
													id: "after",
													value: "",
													year: "",
													month: "",
													day: "",
												});
											}

											items[index].val = xx;
											setAttributes({
												queryArgs: { ...queryArgs, items: items },
											});
										}}
									/>
								</PanelRow>

								{item.val.map((x, j) => {
									return (
										<div>
											<PanelBody title={x.id} initialOpen={false}>
												<span
													className="cursor-pointer px-3 py-1 text-white bg-red-600 text-sm my-2 inline-block"
													onClick={(_ev) => {
														var items = [...queryArgs.items];
														var item = { ...queryArgs.items[index] };

														//item.val = newVal;

														//queryArgsX.items[index].val.splice(j, 1);
														item.val.splice(j, 1);

														items[index] = item;

														// setAttributes({
														// 	queryArgs: { items: queryArgsX.items },
														// });

														setAttributes({
															queryArgs: { ...queryArgs, items: items },
														});
													}}>
													Delete
												</span>

												{(x.id == "after" || x.id == "before") && (
													<div>
														<PanelRow>
															<label>Year</label>
															<InputControl
																placeholder=""
																onChange={(newVal) => {
																	var items = [...queryArgs.items];
																	var item = { ...queryArgs.items[index] };

																	//queryArgsX.items[index].val[j].year = newVal;
																	item.val[j].year = newVal;
																	items[index] = item;

																	// setAttributes({
																	// 	queryArgs: { items: queryArgsX.items },
																	// });

																	setAttributes({
																		queryArgs: { ...queryArgs, items: items },
																	});
																}}
															/>
														</PanelRow>

														<PanelRow>
															<label>Month</label>
															<InputControl
																placeholder=""
																onChange={(newVal) => {
																	var items = [...queryArgs.items];
																	var item = { ...queryArgs.items[index] };

																	//queryArgsX.items[index].val[j].month = newVal;
																	item.val[j].month = newVal;
																	items[index] = item;

																	// setAttributes({
																	// 	queryArgs: { items: queryArgsX.items },
																	// });

																	setAttributes({
																		queryArgs: { ...queryArgs, items: items },
																	});
																}}
															/>
														</PanelRow>

														<PanelRow>
															<label>Day</label>
															<InputControl
																placeholder=""
																onChange={(newVal) => {
																	//clearTimeout(debounce);
																	//debounce = setTimeout(() => {
																	var items = [...queryArgs.items];
																	var item = { ...queryArgs.items[index] };

																	//queryArgsX.items[index].val[j].day = newVal;
																	item.val[j].day = newVal;
																	items[index] = item;

																	// setAttributes({
																	// 	queryArgs: { items: queryArgsX.items },
																	// });

																	setAttributes({
																		queryArgs: { ...queryArgs, items: items },
																	});
																	//}, 1000);
																}}
															/>
														</PanelRow>
													</div>
												)}

												{x.id == "inclusive" && (
													<div>
														<SelectControl
															style={{ margin: 0 }}
															options={[
																{ label: "True", value: true },
																{ label: "False", value: false },
															]}
															onChange={(newVal) => {
																var items = [...queryArgs.items];
																var item = { ...queryArgs.items[index] };

																//queryArgsX.items[index].val[j].value = newVal;
																item.val[j].value = newVal;
																items[index] = item;

																// setAttributes({
																// 	queryArgs: { items: queryArgsX.items },
																// });

																setAttributes({
																	queryArgs: { ...queryArgs, items: items },
																});
															}}
														/>
													</div>
												)}

												{x.id == "compare" && (
													<div>
														<SelectControl
															style={{ margin: 0 }}
															options={[
																{ label: "=", value: "=" },
																{ label: "!=", value: "!=" },
																{ label: ">", value: ">" },
																{ label: ">=", value: ">=" },
																{ label: "<", value: "<" },
																{ label: "<=", value: "<=" },
																{ label: "IN", value: "IN" },
																{ label: "NOT IN", value: "NOT IN" },
																{ label: "EXISTS", value: "EXISTS" },
																{ label: "NOT EXISTS", value: "NOT EXISTS" },
																{ label: "BETWEEN", value: "BETWEEN" },
																{ label: "NOT BETWEEN", value: "NOT BETWEEN" },
															]}
															onChange={(newVal) => {
																var items = [...queryArgs.items];
																var item = { ...queryArgs.items[index] };

																//queryArgsX.items[index].val[j].value = newVal;
																item.val[j].value = newVal;

																// setAttributes({
																// 	queryArgs: { items: queryArgsX.items },
																// });

																setAttributes({
																	queryArgs: { ...queryArgs, items: items },
																});
															}}
														/>
													</div>
												)}
												{x.id == "column" && (
													<div>
														<InputControl
															placeholder=""
															onChange={(newVal) => {
																//clearTimeout(debounce);
																//debounce = setTimeout(() => {
																var items = [...queryArgs.items];
																var item = { ...queryArgs.items[index] };

																// queryArgsX.items[index].val[j].value = newVal;
																item.val[j].value = newVal;

																// setAttributes({
																// 	queryArgs: { items: queryArgsX.items },
																// });

																setAttributes({
																	queryArgs: { ...queryArgs, items: items },
																});
																//}, 1000);
															}}
														/>
													</div>
												)}

												{x.id == "relation" && (
													<div>
														<SelectControl
															style={{ margin: 0 }}
															options={[
																{ label: "OR", value: "OR" },
																{ label: "AND", value: "AND" },
															]}
															onChange={(newVal) => {
																var items = [...queryArgs.items];
																var item = { ...queryArgs.items[index] };

																//queryArgsX.items[index].val[j].value = newVal;
																item.val[j].value = newVal;
																items[index] = item;

																// setAttributes({
																// 	queryArgs: { items: queryArgsX.items },
																// });

																setAttributes({
																	queryArgs: { ...queryArgs, items: items },
																});
															}}
														/>
													</div>
												)}

												{(x.id == "year" ||
													x.id == "month" ||
													x.id == "week" ||
													x.id == "day" ||
													x.id == "hour" ||
													x.id == "minute" ||
													x.id == "second") && (
													<div>
														<InputControl
															label="Value"
															placeholder=""
															onChange={(newVal) => {
																var items = [...queryArgs.items];
																var item = { ...queryArgs.items[index] };

																//clearTimeout(debounce);
																//debounce = setTimeout(() => {

																//queryArgsX.items[index].val[j].value = newVal;
																item.val[j].value = newVal;
																items[index] = item;

																// setAttributes({
																// 	queryArgs: { items: queryArgsX.items },
																// });

																setAttributes({
																	queryArgs: { ...queryArgs, items: items },
																});

																//}, 1000);
															}}
														/>

														<SelectControl
															style={{ margin: 0 }}
															label="compare "
															options={[
																{ label: "=", value: "=" },
																{ label: "!=", value: "!=" },
																{ label: ">", value: ">" },
																{ label: ">=", value: ">=" },
																{ label: "<", value: "<" },
																{ label: "<=", value: "<=" },
																{ label: "IN", value: "IN" },
																{ label: "NOT IN", value: "NOT IN" },
																{ label: "EXISTS", value: "EXISTS" },
																{ label: "NOT EXISTS", value: "NOT EXISTS" },
																{ label: "BETWEEN", value: "BETWEEN" },
																{ label: "NOT BETWEEN", value: "NOT BETWEEN" },
															]}
															onChange={(newVal) => {
																var items = [...queryArgs.items];
																var item = { ...queryArgs.items[index] };

																item.val[j].compare = newVal;

																setAttributes({
																	queryArgs: { ...queryArgs, items: items },
																});
															}}
														/>
													</div>
												)}
											</PanelBody>
										</div>
									);
								})}
							</div>
						)}

						{item.id == "taxQuery" && (
							<div>
								<div>
									<div
										className="cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-blue-600 text-sm"
										onClick={(_ev) => {
											var items = [...queryArgs.items];
											var item = { ...queryArgs.items[index] };

											var xx = item.val.concat({
												terms: [
													{ taxonomy: "", field: "", terms: [], operator: "" },
												],
												relation: "OR",
											});
											items[index].val = xx;

											setAttributes({
												queryArgs: { ...queryArgs, items: items },
											});
										}}>
										Add
									</div>
									{item.val.map((x, j) => {
										return (
											<div>
												<PanelBody title="Term" initialOpen={false}>
													<div
														className="cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-red-600 text-sm"
														onClick={(_ev) => {
															var items = [...queryArgs.items];
															var item = { ...queryArgs.items[index] };

															//var itemData = items[index];
															var xx = item.val.splice(j, 1);
															items[index].val = item.val;
															// setAttributes({
															// 	queryArgs: { items: queryArgsX.items },
															// });

															setAttributes({
																queryArgs: { ...queryArgs, items: items },
															});
														}}>
														Remove
													</div>

													<PanelRow>
														<div>Terms Relation</div>
														<SelectControl
															style={{ margin: 0 }}
															label=""
															value={x.relation}
															options={[
																{ label: "OR", value: "OR" },
																{ label: "AND", value: "AND" },
															]}
															onChange={(newVal) => {
																var items = [...queryArgs.items];
																var item = { ...queryArgs.items[index] };

																item.val[j].relation = newVal;
																items[index].val = itemData.val;

																setAttributes({
																	queryArgs: { ...queryArgs, items: items },
																});
															}}
														/>
													</PanelRow>
													{x.terms.map((y, k) => {
														return (
															<div className="border-b border-solid border-gray-300 py-3">
																<InputControl
																	label="Taxonomy"
																	value={y.taxonomy}
																	placeholder="Taxonomy"
																	onChange={(newVal) => {
																		var items = [...queryArgs.items];
																		var item = { ...queryArgs.items[index] };
																		var term = item.val[j].terms[k];
																		term.taxonomy = newVal;
																		items[index].val = item.val;

																		setAttributes({
																			queryArgs: { ...queryArgs, items: items },
																		});
																	}}
																/>

																<InputControl
																	label="Terms"
																	value={y.terms.join(",")}
																	placeholder="Comma separated"
																	onChange={(newVal) => {
																		var items = [...queryArgs.items];
																		var item = { ...queryArgs.items[index] };

																		var term = item.val[j].terms[k];
																		term.terms = newVal.split(",");

																		items[index].val = item.val;

																		setAttributes({
																			queryArgs: { ...queryArgs, items: items },
																		});
																	}}
																/>

																<PanelRow>
																	<SelectControl
																		style={{ margin: 0 }}
																		label="Fields"
																		value={y.field}
																		options={[
																			{ label: "Choose...", value: "" },

																			{ label: "Term ID", value: "term_id" },
																			{ label: "Name", value: "name" },
																			{ label: "Slug", value: "slug" },
																			{
																				label: "Term taxonomy id",
																				value: "term_taxonomy_id",
																			},
																		]}
																		onChange={(newVal) => {
																			var items = [...queryArgs.items];
																			var item = { ...queryArgs.items[index] };

																			var term = item.val[j].terms[k];
																			term.field = newVal;

																			items[index].val = item.val;

																			setAttributes({
																				queryArgs: {
																					...queryArgs,
																					items: items,
																				},
																			});
																		}}
																	/>
																	<SelectControl
																		style={{ margin: 0 }}
																		label="Operator"
																		value={y.operator}
																		options={[
																			{ label: "Choose...", value: "" },

																			{ label: "IN", value: "IN" },
																			{ label: "NOT IN", value: "NOT IN" },
																			{ label: "AND", value: "AND" },
																			{ label: "EXISTS", value: "EXISTS" },
																			{
																				label: "NOT EXISTS",
																				value: "NOT EXISTS",
																			},
																		]}
																		onChange={(newVal) => {
																			var items = [...queryArgs.items];
																			var item = { ...queryArgs.items[index] };

																			var term = item.val[j].terms[k];
																			term.operator = newVal;

																			items[index].val = item.val;

																			setAttributes({
																				queryArgs: {
																					...queryArgs,
																					items: items,
																				},
																			});
																		}}
																	/>
																</PanelRow>

																<div
																	className="cursor-pointer block text-center my-2 px-3 py-1 text-white bg-red-600 text-sm"
																	onClick={(_ev) => {
																		var items = [...queryArgs.items];
																		var item = { ...queryArgs.items[index] };

																		var terms = item.val[j].terms;

																		var xx = item.val[j].terms.splice(k, 1);
																		items[index].val = item.val;

																		setAttributes({
																			queryArgs: { ...queryArgs, items: items },
																		});
																	}}>
																	Remove
																</div>
															</div>
														);
													})}
													<div
														className="cursor-pointer text-center px-3 py-1 text-white bg-blue-600 text-sm"
														onClick={(_ev) => {
															var items = [...queryArgs.items];
															var item = { ...queryArgs.items[index] };

															var xx = item.val[j].terms.concat({
																taxonomy: "",
																field: "",
																terms: [],
																operator: "",
															});
															items[index].val[j].terms = xx;

															setAttributes({
																queryArgs: { ...queryArgs, items: items },
															});
														}}>
														Add
													</div>
												</PanelBody>
											</div>
										);
									})}
								</div>
							</div>
						)}

						{(item.id == "metaKey" ||
							item.id == "s" ||
							item.id == "metaValue" ||
							item.id == "metaValueNum" ||
							item.id == "year" ||
							item.id == "monthnum" ||
							item.id == "w" ||
							item.id == "day" ||
							item.id == "hour" ||
							item.id == "minute" ||
							item.id == "second" ||
							item.id == "m" ||
							item.id == "author" ||
							item.id == "authorName" ||
							item.id == "tag" ||
							item.id == "tagId" ||
							item.id == "cat" ||
							item.id == "categoryName" ||
							item.id == "p" ||
							item.id == "name" ||
							item.id == "pageId" ||
							item.id == "pagename" ||
							item.id == "postParent" ||
							item.id == "postsPerPage" ||
							item.id == "paged" ||
							item.id == "offset" ||
							item.id == "postsPerArchivePage" ||
							item.id == "perm") && (
							<div>
								<InputControl
									value={item.val}
									onChange={(newVal) => {
										//clearTimeout(debounce);
										//debounce = setTimeout(() => {
										updateQueryPram(newVal, index);
										//}, 1000);
									}}
								/>
							</div>
						)}
						{item.id == "metaCompare" && (
							<div>
								<SelectControl
									style={{ margin: 0 }}
									label=""
									value={item.val}
									options={[
										{ label: "=", value: "=" },
										{ label: "!=", value: "!=" },
										{ label: ">", value: ">" },
										{ label: ">=", value: ">=" },
										{ label: "<", value: "<" },
										{ label: "<=", value: "<=" },
										{ label: "LIKE", value: "LIKE" },
										{ label: "NOT LIKE", value: "NOT LIKE" },
										{ label: "IN", value: "IN" },
										{ label: "NOT IN", value: "NOT IN" },
										{ label: "BETWEEN", value: "BETWEEN" },
										{ label: "NOT BETWEEN", value: "NOT BETWEEN" },
										{ label: "NOT EXISTS", value: "NOT EXISTS" },
										{ label: "REGEXP", value: "REGEXP" },
										{ label: "NOT REGEXP", value: "NOT REGEXP" },
										{ label: "RLIKE", value: "RLIKE" },
									]}
									onChange={(newVal) => {
										updateQueryPram(newVal, index);
									}}
								/>
							</div>
						)}

						{item.id == "postPassword" && (
							<div>
								<InputControl
									value={item.val}
									onChange={(newVal) => updateQueryPram(newVal, index)}
								/>
							</div>
						)}

						{(item.id == "postNameIn" ||
							item.id == "authorIn" ||
							item.id == "authorNotIn" ||
							item.id == "postNotIn" ||
							item.id == "postIn" ||
							item.id == "postParentNotIn" ||
							item.id == "tagNotIn" ||
							item.id == "tagAnd" ||
							item.id == "tagIn" ||
							item.id == "postParentIn" ||
							item.id == "tagSlugIn" ||
							item.id == "tagSlugAnd" ||
							item.id == "categoryNotIn" ||
							item.id == "categoryIn" ||
							item.id == "categoryAnd") && (
							<div>
								<InputControl
									value={item.val}
									placeholder="Comma separated"
									onChange={(newVal) => updateQueryPram(newVal, index)}
								/>
							</div>
						)}

						{item.id == "commentCount" && (
							<div>
								<InputControl
									value={item.val?.value}
									placeholder="Comment Count, Ex: 25"
									onChange={(newVal) =>
										updateQueryPram({ ...item.val, value: newVal }, index)
									}
								/>
								<SelectControl
									style={{ margin: 0 }}
									label=""
									value={item.val?.compare}
									options={[
										{ label: "=", value: "=" },
										{ label: "!=", value: "!=" },
										{ label: ">", value: ">" },
										{ label: ">=", value: ">=" },
										{ label: "<", value: "<" },
										{ label: "<=", value: "<=" },
									]}
									onChange={(newVal) =>
										updateQueryPram({ ...item.val, compare: newVal }, index)
									}
								/>
							</div>
						)}

						{item.id == "postMimeType" && (
							<div>
								<PGinputSelect
									val={item.val}
									options={[
										{ label: "image/jpeg", value: "jpg|jpeg|jpe" },
										{ label: "image/gif", value: "gif" },
										{ label: "image/png", value: "png" },
										{ label: "image/bmp", value: "bmp" },
									]}
									multiple={true}
									onChange={(newVal) => {
										updateQueryPram(newVal, index);
									}}
								/>
							</div>
						)}
						{(item.id == "cacheResults" ||
							item.id == "nopaging" ||
							item.id == "hasPassword" ||
							item.id == "updatePostMetaCache" ||
							item.id == "updatePostTermCache") && (
							<div>
								<SelectControl
									style={{ margin: 0 }}
									label=""
									value={item.val}
									options={[
										{ label: "True", value: true },
										{ label: "False", value: false },
									]}
									onChange={(newVal) => updateQueryPram(newVal, index)}
								/>
							</div>
						)}

						{item.id == "ignoreStickyPosts" && (
							<div>
								<SelectControl
									style={{ margin: 0 }}
									label=""
									value={item.val}
									options={[
										{ label: "True", value: true },
										{ label: "False", value: false },
									]}
									onChange={(newVal) => updateQueryPram(newVal, index)}
								/>
							</div>
						)}

						<p>
							{" "}
							{queryPrams[itemId] == undefined
								? itemId
								: queryPrams[itemId].description}
						</p>
					</PanelBody>
				</div>
			);
		}

		function addQueryPram(option, index) {
			var id = option.id;

			var items = [...queryArgs.items];
			var itemX = { ...queryArgs.items[index] };

			var data = { val: queryPrams[id].value, id: id };
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

		var postTypes = [];

		const postTypesData = useSelect(
			(select) => select(coreStore).getPostTypes({ per_page: -1 }),
			[]
		);

		postTypesData !== null &&
			postTypesData.map((x) => {
				postTypes.push({ value: x.slug, label: x.name });
			});

		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
		}

		const ALLOWED_BLOCKS = ["post-grid/post-grid-item"];

		const MY_TEMPLATE = [
			["post-grid/post-grid-item", {}],
			["post-grid/post-grid-item", {}],
			["post-grid/post-grid-item", {}],
		];

		const blockProps = useBlockProps({
			className: ` ${blockId} pg-post-query items-loop`,
		});

		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			allowedBlocks: ALLOWED_BLOCKS,
			//template: MY_TEMPLATE,
			orientation: "horizontal",
			templateInsertUpdatesSelection: true,
			//renderAppender: InnerBlocks.ButtonBlockAppender
		});

		return (
			<>
				{/* <span>
					{"{ " +
						"noPostsWrap:" +
						JSON.stringify(noPostsWrap) +
						",itemsWrap:" +
						JSON.stringify(itemsWrap) +
						",itemWrap:" +
						JSON.stringify(itemWrap) +
						",spinnerWrap:" +
						JSON.stringify(spinnerWrap) +
						",queryArgs:" +
						JSON.stringify(queryArgs) +
						" }"}
				</span> */}
				<InspectorControls>
					<div className="pg-setting-input-text">
						<PanelBody title="Layouts" initialOpen={false}>
							<div className="text-white cursor-pointer">
								<div
									className={
										layoutData.source == "library"
											? "bg-blue-500 w-1/2 inline-block px-3 py-2 text-[14px] font-bold"
											: "bg-blue-300 text-[14px] font-bold inline-block px-3 py-2 w-1/2"
									}
									onClick={(_ev) => {
										setLayoutData({ source: "library" });
										setQueryLayouts({ keyword: "", page: 1, category: "" });
									}}>
									Library
								</div>
								<div
									className={
										layoutData.source == "saved"
											? "bg-blue-500 w-1/2 inline-block px-3 py-2 text-[14px] font-bold"
											: "bg-blue-300 inline-block px-3 py-2 w-1/2 text-[14px] font-bold"
									}
									onClick={(_ev) => {
										setLayoutData({ source: "saved" });
										setQueryLayouts({ keyword: "", page: 1, category: "" });
									}}>
									Saved
								</div>
							</div>

							<PanelRow>
								<InputControl
									value={queryLayouts.keyword}
									type="text"
									placeholder="Search Layouts..."
									onChange={(newVal) => {
										//clearTimeout(debounce);
										//debounce = setTimeout(() => {
										setQueryLayouts({
											keyword: newVal,
											page: queryLayouts.page,
											category: queryLayouts.category,
										});
										//}, 1000);

										//fetchLayouts();
									}}
								/>
								<SelectControl
									className="w-full"
									style={{ margin: 0 }}
									label=""
									value={queryLayouts.category}
									options={layoutCats}
									onChange={(newVal) => {
										setQueryLayouts({
											keyword: queryLayouts.keyword,
											page: queryLayouts.page,
											category: newVal,
										});
										//fetchLayouts();
									}}
								/>
							</PanelRow>

							{layoutData.source == "saved" && (
								<div className="flex gap-2	">
									<div className="w-full rounded-sm  py-2 bg-blue-500 text-[14px] font-bold text-white cursor-pointer my-3 text-center ">
										<a
											className=" "
											target="_blank"
											href={
												clientData.siteAdminurl +
												"edit.php?post_type=post_grid_template"
											}>
											All Layouts
										</a>
									</div>

									<div className="w-full rounded-sm  py-2 bg-blue-500 text-[14px] font-bold text-white cursor-pointer my-3 text-center ">
										<a
											className=""
											target="_blank"
											href={
												clientData.siteAdminurl +
												"post-new.php?post_type=post_grid_template"
											}>
											Create Layout
										</a>
									</div>
								</div>
							)}

							{layoutLoading == true && (
								<div className="text-center">
									<Spinner />
								</div>
							)}

							{layoutLoading == false &&
								layoutList.items.length > 0 &&
								layoutList.items.map((x) => {
									return (
										<div className="my-4 border bg-gray-200 ">
											<div
												className="relative cursor-pointer"
												onClick={(_ev) => {
													if (x.is_pro == true) {
														alert("Sorry this is only available in premium");
														return;
													}

													selectLayout(x.post_id, x.post_content);
												}}>
												<img className="w-full" src={x.thumb_url} />

												<div className="text-[14px] p-1 bg-gray-500 text-white bg-opacity-80 text-bold  text-center">
													{x.post_title}
												</div>
											</div>

											<div className="py-3 flex justify-items-stretch">
												{layoutData.source != "library" && (
													<span className="mx-1 inline-block bg-blue-500 hover:bg-blue-400 px-2 py-1 text-white rounded-sm cursor-pointer">
														{" "}
														<a
															target="_blank"
															href={
																clientData.siteAdminurl +
																"post.php?post=" +
																x.post_id +
																"&action=edit"
															}>
															Edit
														</a>{" "}
													</span>
												)}

												<span className="mx-1 inline-block bg-blue-500 hover:bg-blue-400 px-2 py-1 text-white rounded-sm cursor-pointer">
													#{x.post_id}
												</span>

												{layoutData.source == "library" && (
													<>
														<div
															className="mx-1 relative inline-block bg-blue-500 hover:bg-blue-400 px-2 py-1 text-white rounded-sm cursor-pointer"
															onClick={(ev) => {
																if (isProFeature == false) {
																	if (!importLayoutOpen.isOpen) {
																		setlayoutImporting(true);
																		importLayout(x);
																	}
																}
																setimportLayoutOpen({
																	id: x.post_id,
																	isOpen: !importLayoutOpen.isOpen,
																});
															}}>
															<span className="dashicons dashicons-download"></span>{" "}
															Import
														</div>
														{importLayoutOpen.id == x.post_id &&
															importLayoutOpen.isOpen && (
																<Popover position="bottom left p-2 ">
																	{isProFeature == true && (
																		<div className="w-48 bg-amber-100 px-3 py-2">
																			<p className="">
																				{" "}
																				<span className="underline">
																					Importing Layouts
																				</span>{" "}
																				Only available in Premium
																			</p>
																			<p className="">
																				After import the layout you can
																				customize and make your own.
																			</p>
																		</div>
																	)}

																	{isProFeature == false && (
																		<div className="w-48 bg-sky-300 px-3 py-2">
																			{layoutImporting && (
																				<span>
																					<Spinner /> Importing
																				</span>
																			)}

																			{!layoutImporting && (
																				<p className="">
																					Layout imported and saved under{" "}
																					<a
																						target="_blank"
																						className="font-bold underline "
																						href={
																							clientData.siteAdminurl +
																							"edit.php?post_type=post_grid_template"
																						}>
																						Saved Templates
																					</a>
																				</p>
																			)}
																		</div>
																	)}
																</Popover>
															)}
													</>
												)}

												{x.is_pro == true && (
													<span className=" bg-amber-500 text-white px-3 rounded-sm py-1">
														Pro
													</span>
												)}

												{x.is_pro == false && (
													<span className=" bg-lime-600 text-white px-3 rounded-sm py-1">
														Free
													</span>
												)}

												{/* {x.sale_price > 0 &&
                          (
                            <span className='mx-2 hidden' >Price:
                              <del className='ml-2' >{x.price} </del>-<span className='' >{x.sale_price}USD </span>
                            </span>
                          )
                        }
                        {x.sale_price == 0 &&
                          (
                            <span className='mx-2 hidden' >Price:
                              <span className='' > ${x.sale_price}</span>
                            </span>
                          )
                        } */}

												{/* 
                        <span title='Buy To Download' className={['text-white px-3 py-1 mx-2', x.is_pro ? ' bg-amber-400' : ' bg-blue-600'].join('')}>
                          {x.is_pro ? 'Buy Now' : 'Free'}
                        </span> */}
											</div>
										</div>
									);
								})}

							<div
								className="w-full rounded-sm  py-2 bg-blue-500 text-[14px] font-bold text-white cursor-pointer my-3 text-center"
								onClick={(_ev) => {
									var page = queryLayouts.page + 1;

									setQueryLayouts({
										keyword: queryLayouts.keyword,
										page: page,
										category: queryLayouts.category,
									});
								}}>
								{layoutLoading.loading == true && (
									<span className="text-center">
										<Spinner />
									</span>
								)}
								Load More
							</div>
						</PanelBody>

						<PanelBody title="Query Post" initialOpen={false}>
							<PanelRow className="my-3 flex gap-2">
								<PGDropdown
									position="bottom right"
									btnClass="py-2"
									variant="secondary"
									options={queryPresets}
									buttonTitle="Query Presets"
									onChange={addQueryPreset}
									values={""}></PGDropdown>
								<PGDropdown
									position="bottom right"
									variant="secondary"
									options={queryPrams}
									buttonTitle="Add Query Params"
									onChange={addQueryPram}
									values=""></PGDropdown>
							</PanelRow>

							{queryArgs.items.map((item, index) => {
								return generateQueryArgOptions(item, index);
							})}
						</PanelBody>

						<PanelBody title="Wrapper" initialOpen={false}>
							<ToggleControl
								label="Wrapper Exclude?"
								help={
									itemsWrap.options.excludedWrapper
										? "Wrapper Excluded."
										: "Wrapper Included"
								}
								checked={itemsWrap.options.excludedWrapper ? true : false}
								onChange={(e) => {
									var options = {
										...itemsWrap.options,
										excludedWrapper: itemsWrap.options.excludedWrapper
											? false
											: true,
									};
									setAttributes({
										itemsWrap: { ...itemsWrap, options: options },
									});
								}}
							/>

							<PanelRow>
								<label for="" className="font-medium text-slate-900 ">
									Item Wrapper Tag
								</label>

								<SelectControl
									label=""
									value={itemWrap.options.tag}
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
										{ label: "li", value: "li" },
									]}
									onChange={(newVal) => {
										var options = { ...itemWrap.options, tag: newVal };
										setAttributes({
											itemWrap: { ...itemWrap, options: options },
										});
									}}
								/>
							</PanelRow>

							<PanelRow>
								<label for="" className="font-medium text-slate-900 ">
									Item Wrapper Class
								</label>

								<InputControl
									value={itemWrap.options.class}
									onChange={(newVal) => {
										var options = { ...itemWrap.options, class: newVal };
										setAttributes({
											itemWrap: { ...itemWrap, options: options },
										});
									}}
								/>
							</PanelRow>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Item"
							initialOpen={false}>
							<PanelBody>
								<div className=" flex flex-col gap-4 ">
									<ToggleControl
										label="Counter Class?"
										help={
											itemWrap.options.counterClass
												? "Counter Class Added."
												: "Counter Class Removed"
										}
										checked={itemWrap.options.counterClass ? true : false}
										onChange={(e) => {
											var options = {
												...itemWrap.options,
												counterClass: itemWrap.options.counterClass
													? false
													: true,
											};
											setAttributes({
												itemWrap: { ...itemWrap, options: options },
											});
										}}
									/>

									<ToggleControl
										label="Terms Class?"
										help={
											itemWrap.options.termsClass
												? "Terms Class Added."
												: "Terms Class Removed"
										}
										checked={itemWrap.options.termsClass ? true : false}
										onChange={(e) => {
											var options = {
												...itemWrap.options,
												termsClass: itemWrap.options.termsClass ? false : true,
											};
											setAttributes({
												itemWrap: { ...itemWrap, options: options },
											});
										}}
									/>

									<ToggleControl
										label="Odd/Even Class?"
										help={
											itemWrap.options.oddEvenClass
												? "Odd/Even Class Added."
												: "Odd/Even Class Removed"
										}
										checked={itemWrap.options.oddEvenClass ? true : false}
										onChange={(e) => {
											var options = {
												...itemWrap.options,
												oddEvenClass: itemWrap.options.oddEvenClass
													? false
													: true,
											};
											setAttributes({
												itemWrap: { ...itemWrap, options: options },
											});
										}}
									/>
								</div>
							</PanelBody>
						</PanelBody>

						<div className="px-3">
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
							<PGTutorials slug="post-query" />
						</div>
					</div>
				</InspectorControls>

				<>
					{/* <span>
						{"atts: { " +
							"noPostsWrap: " +
							JSON.stringify(noPostsWrap) +
							",spinnerWrap: " +
							JSON.stringify(spinnerWrap) +
							",queryArgs: " +
							JSON.stringify(queryArgs) +
							",itemsWrap: " +
							JSON.stringify(itemsWrap) +
							",itemWrap: " +
							JSON.stringify(itemWrap) +
							"},"}
					</span> */}
					{isBusy == false && posts == null && (
						<div {...blockProps}>
							<div className={noPostsWrap.options.class}>No Post found</div>
						</div>
					)}

					{isBusy && (
						<div {...blockProps}>
							<div className={spinnerWrap.options.class}>
								<Spinner />
							</div>{" "}
						</div>
					)}

					{isBusy == false && posts != null && posts.length > 0 && (
						<div {...blockProps}>
							{posts.map((post) => {
								return (
									<>
										<BlockContextProvider
											key={post.ID}
											value={{ postId: post.ID, postType: post.post_type }}>
											{post.ID === (activeBlockContextId || posts[0]?.ID) ? (
												<>
													<PostTemplateInnerBlocks attsx={TEMPLATEX} />
												</>
											) : null}

											<MemoizedPostTemplateBlockPreview
												blocks={blocks}
												blockContextId={post.ID}
												setActiveBlockContextId={setActiveBlockContextId}
												isHidden={
													post.ID === (activeBlockContextId || posts[0]?.ID)
												}
											/>
										</BlockContextProvider>
									</>
								);
							})}
						</div>
					)}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file

		var attributes = props.attributes;

		return <InnerBlocks.Content />;

		//return null;
	},
});




