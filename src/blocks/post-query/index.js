import { registerBlockType } from "@wordpress/blocks";
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
import { Icon, styles, settings, link, linkOff, close } from "@wordpress/icons";
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

import IconToggle from "../../components/icon-toggle";
import Typography from "../../components/typography";
import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";
import BreakpointToggle from "../../components/breakpoint-toggle";
import colorsPresets from "../../colors-presets";
import variations from "./variations";

import queryPresets from "./query-presets";
import queryPrams from "./queryprams";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import PGCssLibrary from "../../components/css-library";
import PGIconPicker from "../../components/icon-picker";
import PGDropdown from "../../components/dropdown";
import PGinputSelect from "../../components/input-select";

var myStore = wp.data.select("postgrid-shop");

// var queryPramsX = queryPrams.map((x, i) => {

//   return { value: i, label: x.label, description: x.description, isPro: x.isPro, }
// })

registerBlockType("post-grid/post-query", {
	apiVersion: 2,
	title: "Post Query",
	//parent: ["post-grid/post-grid"],

	icon: {
		// Specifying a background color to appear with the icon e.g.: in the inserter.
		background: "#fff",
		// Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
		foreground: "#fff",
		// Specifying an icon for the block
		src: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
				<rect fill="#1d4ed8" y="9.59" width="8.29" height="16.82" />
				<rect fill="#1d4ed8" x="27.71" y="9.59" width="8.29" height="16.82" />
				<rect fill="#1d4ed8" x="11.05" y="9.59" width="13.9" height="16.82" />
			</svg>
		),
	},

	attributes: {
		wrapper: {
			type: "object",
			default: {
				options: {
					tag: "div",
					class: "",
				},

				styles: {
					display: { Desktop: "flex" },
				},
			},
		},

		itemsWrap: {
			type: "object",
			default: {
				options: { class: "items-loop" },
				styles: {},
			},
		},

		itemWrap: {
			type: "object",
			default: {
				options: { class: "item" },
				styles: {},
			},
		},

		noPostsWrap: {
			type: "object",
			default: {
				options: { class: "no-posts text-center" },
				styles: {},
			},
		},

		grid: {
			type: "object",
			default: {
				options: {
					itemCss: {},
				},

				styles: {
					gridTemplateColumns: {
						Tablet: [
							{ val: 1, unit: "fr" },
							{ val: 1, unit: "fr" },
						],
						Mobile: [{ val: 1, unit: "fr" }],
					},
					gridTemplateRows: {},
					colGap: {},
					rowGap: {},

					color: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
		},
		spinnerWrap: {
			type: "object",
			default: {
				options: {
					class: "spinner"
				},
				styles: {}
			}
		},
		layout: {
			type: "object",
			default: {
				id: "",
				srcServer: "library",
				data: [
					{
						blockName: "core/post-title",
						attrs: {},
						innerBlocks: [],
						innerHTML: "",
						innerContent: [],
					},
					{
						blockName: null,
						attrs: {},
						innerBlocks: [],
						innerHTML: "\n\n",
						innerContent: ["\n\n"],
					},
					{
						blockName: "core/post-date",
						attrs: {},
						innerBlocks: [],
						innerHTML: "",
						innerContent: [],
					},
					{
						blockName: null,
						attrs: {},
						innerBlocks: [],
						innerHTML: "\n\n",
						innerContent: ["\n\n"],
					},
					{
						blockName: "core/post-excerpt",
						attrs: { moreText: "", textColor: "primary" },
						innerBlocks: [],
						innerHTML: "",
						innerContent: [],
					},
				],
				rawData:
					"<!-- wp:post-featured-image  /-->\n\n<!-- wp:post-title /-->\n\n<!-- wp:post-excerpt  /-->",
			},
		},
		queryArgs: {
			type: "object",
			default: {
				items: [
					{
						val: ["post"],
						multiple: false,
						id: "postType",
					},
					{
						val: ["publish"],
						multiple: false,
						id: "postStatus",
					},
					{
						val: "DESC",
						multiple: false,
						id: "order",
					},
					{
						val: ["date"],
						multiple: false,
						id: "orderby",
					},
					{
						val: 10,
						multiple: false,
						id: "postsPerPage",
					},
					{
						val: 1,
						multiple: false,
						id: "paged",
					},
				],
			},
		},

		blockId: {
			type: "string",
			default: "",
		},

		blockCssY: {
			type: "object",
			default: { items: {} },
		},
	},
	usesContext: ["postId", "loopIndex", "postType", "queryId"],

	supports: {
		align: ["wide", "full"],
	},
	category: "post-grid",

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
		var container = attributes.container;

		var itemsWrap = attributes.itemsWrap;
		var itemWrap = attributes.itemWrap;
		var noPostsWrap = attributes.noPostsWrap;
		var spinnerWrap = attributes.spinnerWrap;

		var grid = attributes.grid;
		var layout = attributes.layout;
		var queryArgs = attributes.queryArgs;

		var blockCssY = attributes.blockCssY;

		var postId = context["postId"];
		var postType = context["postType"];

		//const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
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

		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
		var containerSelector = blockClass;
		const itemsWrapSelector = blockClass + " .items-loop";
		const itemWrapSelector = blockClass + " .item";

		const noPostsSelector = blockClass + " .no-posts";
		const lazyloadWrapSelector = blockClass + " .lazyLoad";
		const spinnerSelector = blockClass + " .spinner";

		const { replaceInnerBlocks } = useDispatch(blockEditorStore);

		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);

		var icons = { bed: "", layout: "", smiley: "", columns: "", globe: "" };
		const TEMPLATE = [
			["core/post-title"],
			["core/post-excerpt"],
			["core/post-date"],
		];
		var [TEMPLATEX, setTEMPLATEX] = useState(TEMPLATE); // Using the hook.



		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });

			myStore.generateBlockCss(blockCssY.items, blockId);

			// blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'display': { "Desktop": "flex" } };
			//blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'gap': { "Desktop": "1em" } };

			setAttributes({ blockCssY: { items: blockCssY.items } });

			//setAttributes({ wrapper: { ...wrapper, styles: { display: { Desktop: 'flex' }, gap: { Desktop: '20px' } } } });
		}, [clientId]);

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		const [posts, setPosts] = useState([]); // Using the hook.
		const [activeBlockContextId, setActiveBlockContextId] = useState();
		const MemoizedPostTemplateBlockPreview = memo(PostTemplateBlockPreview);

		const [queryLayouts, setQueryLayouts] = useState({
			keyword: "",
			page: 1,
			category: "",
		});
		var [layoutList, setLayoutList] = useState({ items: [] });
		var [layoutData, setLayoutData] = useState({ source: "library" });
		var [layoutLoading, setLayoutLoading] = useState(false);
		var [layoutCats, setLayoutCats] = useState([]);
		var select = wp.data.select('core/block-editor')

		var blocks = select.getBlocks(clientId);


		function PostTemplateInnerBlocks({ attsx }) {
			const innerBlocksProps = useInnerBlocksProps(
				{ className: "item" },
				{ template: attsx }
			);
			return <div {...innerBlocksProps}></div>;
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
					className: "item",
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
					// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
					role="button"
					onClick={handleOnClick}
					onKeyPress={handleOnClick}
					style={style}
				/>
			);
		}




		function fetchPosts() {
			console.log(queryArgs);

			setIsBusy(true);

			var arg = queryArgs.items.map((item) => {
				return { id: item.id, val: item.val };
			});

			apiFetch({
				path: "/post-grid/v2/get_posts",
				method: "POST",
				data: { queryArgs: arg, rawData: layout.rawData },
			}).then((res) => {
				setIsBusy(false);

				setPosts(res.posts);
			});
		}

		function selectLayout(id, postContent) {
			var srcServer = layoutData.source;

			if (srcServer == "library") {
				var blocks = parse(postContent);

				setAttributes({
					layout: {
						id: null,
						srcServer: srcServer,
						data: blocks,
						rawData: postContent,
					},
				});

				var allStyle = {};

				var allStyleX = getCssfromBlocks(allStyle, blocks);

				// blocks.map((block, i) => {

				//   var items = (block.attrs.blockCssY != undefined) ? block.attrs.blockCssY.items : [];

				//   if (Object.entries(items).length > 0) {

				//     Object.entries(items).map(data => {

				//       var handle = data[0];
				//       var css = data[1];

				//       allStyle[handle] = css;
				//     })
				//   }

				// })

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

					setAttributes({
						layout: {
							id: id,
							srcServer: srcServer,
							data: blocks,
							rawData: postContent,
						},
					});

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

			// setAttributes({ layout: { id: id, data: blocks, rawData: post_content } })
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

			console.log(queryArgs);


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
				fetch(
					"https://getpostgrid.com/wp-json/postlayout/v2/get_post_layouts?category=" +
					queryLayouts.category +
					"&page=" +
					queryLayouts.page +
					"&keyword=" +
					queryLayouts.keyword,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json;charset=utf-8",
						},
					}
				)
					.then((response) => {
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
																		var xx = item.val[j].fields.splice(
																			k,
																			1
																		);

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

																			items[index].val =
																				item.val;
																			// setAttributes({
																			// 	queryArgs: { items: queryArgsX.items },
																			// });
																			setAttributes({
																				queryArgs: { ...queryArgs, items: items },
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

																			items[index].val =
																				item.val;


																			setAttributes({
																				queryArgs: { ...queryArgs, items: items },
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
																	clearTimeout(debounce);
																	debounce = setTimeout(() => {


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



																	}, 1000);
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
																clearTimeout(debounce);
																debounce = setTimeout(() => {
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

																}, 1000);
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

																			items[index].val =
																				item.val;


																			setAttributes({
																				queryArgs: { ...queryArgs, items: items },
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
																				queryArgs: { ...queryArgs, items: items },
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
											clearTimeout(debounce);
											debounce = setTimeout(() => {
												updateQueryPram(newVal, index);
											}, 1000);
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
									value={item.val.value}
									placeholder="Comment Count, Ex: 25"
									onChange={(newVal) =>
										updateQueryPram(
											{ value: newVal, compare: item.val.compare },
											index
										)
									}
								/>
								<SelectControl
									style={{ margin: 0 }}
									label=""
									value={item.val.compare}
									options={[
										{ label: "=", value: "=" },
										{ label: "!=", value: "!=" },
										{ label: ">", value: ">" },
										{ label: ">=", value: ">=" },
										{ label: "<", value: "<" },
										{ label: "<=", value: "<=" },
									]}
									onChange={(newVal) =>
										updateQueryPram(
											{ value: item.val.value, compare: newVal },
											index
										)
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
			console.log(itemsX);

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
				<InspectorControls>
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
									clearTimeout(debounce);
									debounce = setTimeout(() => {
										setQueryLayouts({
											keyword: newVal,
											page: queryLayouts.page,
											category: queryLayouts.category,
										});
									}, 1000);

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
											{layout.id == x.post_id && (
												<span className="absolute bg-amber-500 text-white px-2 py-1 top-0 right-0">
													<span class="dashicons dashicons-saved"></span>{" "}
													Selected
												</span>
											)}

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
														<span class="dashicons dashicons-download"></span>{" "}
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
																			After import the layout you can customize
																			and make your own.
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

						<PanelRow className="my-3">
							<PGDropdown
								position="bottom right"
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
				</InspectorControls>

				<>


					{isBusy == false && posts == null && (
						<div className={noPostsWrap.options.class}>No Post found</div>
					)}

					{isBusy && (
						<div className={spinnerWrap.options.class}>
							<Spinner />
						</div>
					)}

					{isBusy == false && posts != null && posts.length > 0 && (
						<div {...blockProps} >
							{/* {posts.map((x, _i) => {
								return (
									<div className={itemWrap.options.class}>
										<RawHTML>{x.html}</RawHTML>
									</div>
								);
							})} */}


							{posts.map(post => {


								return (

									<>
										<BlockContextProvider
											key={post.ID}
											value={post}
										>
											{post.ID ===
												(activeBlockContextId ||
													posts[0]?.ID) ? (

												<>
													<PostTemplateInnerBlocks attsx={TEMPLATEX} />
												</>


											) : null}


											<MemoizedPostTemplateBlockPreview
												blocks={blocks}
												blockContextId={post.ID}
												setActiveBlockContextId={setActiveBlockContextId}
												isHidden={
													post.ID ===
													(activeBlockContextId ||
														posts[0]?.ID)
												}
											/>



										</BlockContextProvider>
									</>


								)
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

