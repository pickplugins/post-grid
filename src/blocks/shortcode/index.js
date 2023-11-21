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
	Popover,
} from "@wordpress/components";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import {
	Icon,
	styles,
	settings,
	link,
	linkOff,
	plus,
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

import PGDropdown from "../../components/dropdown";
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
				<polygon
					fill="#1d4ed8"
					points="5.51 28.64 0 28.64 0 7.36 5.51 7.36 5.51 9.28 1.92 9.28 1.92 26.72 5.51 26.72 5.51 28.64"
				/>
				<polygon
					fill="#1d4ed8"
					points="36 28.64 30.48 28.64 30.48 26.72 34.08 26.72 34.08 9.28 30.48 9.28 30.48 7.36 36 7.36 36 28.64"
				/>
				<rect fill="#8db1ff" x="4.42" y="15.46" width="26.73" height="5.08" />
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

		var shortcode = attributes.shortcode;
		var shortcodeClassic = attributes.shortcodeClassic;

		var wrapper = attributes.wrapper;
		var items = attributes.items;

		var blockCssY = attributes.blockCssY;

		var postId = context["postId"];
		var postType = context["postType"];

		var breakPointX = myStore.getBreakPoint();

		const [metaValue, setMetaValue] = useState(null);
		const [metaHtml, setMetaHtml] = useState("");
		const [metaArgs, setMetaArgs] = useState(null);
		const [linkPickerText, setLinkPickerText] = useState(false);
		const [shortcodePrams, setShortcodePrams] = useState({
			id: "",
			label: "",
			val: "",
		});

		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		const itemSelector = blockClass + " .item";
		const postCountSelector = blockClass + " .postCount";

		const [shortcodes, setshortcodes] = useState({
			yith_wcwl_add_to_wishlist: {
				label: "YITH - Add to Wishlist",
				value: "yith_wcwl_add_to_wishlist",
				args: [
					{ id: "product_id", label: "Product Id", val: "{currentPostId}" },
				],
			},
			yasr_overall_rating: {
				label: "YASR- overall rating",
				value: "yasr_overall_rating",
				args: [
					{ id: "size", label: "Size", val: "15" },
					{ label: "Post Id", val: "{currentPostId}" },
				],
			},
			yasr_visitor_votes: {
				label: "YASR - visitor votes",
				value: "yasr_visitor_votes",
				args: [
					{ id: "size", label: "Size", val: "15" },
					{ label: "Post Id", val: "{currentPostId}" },
				],
			},
			wp_postviews: {
				label: "WP-PostViews",
				value: "views",
				args: [{ id: "id", label: "Post Id", val: "{currentPostId}" }],
			},
			wp_postratings: {
				label: "WP-PostRatings",
				value: "wp_postratings",
				args: [{ id: "id", label: "Post Id", val: "{currentPostId}" }],
			},
			site_reviews_summary: {
				label: "Site Reviews - Summary",
				value: "site_reviews_summary",
				args: [
					{ id: "hide", label: "Hide", val: "" },
					{ id: "assigned_to", label: "Assigned To", val: "" },
					{ id: "class", label: "Class", val: "" },
				],
			},
			ratingwidget: {
				label: "Rating-Widget",
				value: "ratingwidget",
				args: [{ id: "post_id", label: "Post Id", val: "{currentPostId}" }],
			},
			ratemypostresult: {
				label: "Rate my Post - Result",
				value: "ratemypost-result",
				args: [{ id: "post_id", label: "Post Id", val: "{currentPostId}" }],
			},
			ratemypost: {
				label: "Rate my Post",
				value: "ratemypost",
				args: [{ id: "id", label: "Post Id", val: "{currentPostId}" }],
			},
			postviews: {
				label: "Post Views Counter",
				value: "post-views",
				args: [{ id: "id", label: "Post Id", val: "{currentPostId}" }],
			},
			pvcp_1: {
				label: "Page Visit Counter",
				value: "pvcp_1",
				args: [{ id: "postid", label: "Post Id", val: "{currentPostId}" }],
			},
			pvc_stats: {
				label: "Page Views Count",
				value: "pvc_stats",
				args: [{ id: "postid", label: "Post Id", val: "{currentPostId}" }],
			},
			mr_rating_result: {
				label: "Multi Rating - Result",
				value: "mr_rating_result",
				args: [{ id: "post_id", label: "Post Id", val: "{currentPostId}" }],
			},
			mr_rating_form: {
				label: "Multi Rating",
				value: "mr_rating_form",
				args: [{ id: "post_id", label: "Post Id", val: "{currentPostId}" }],
			},
			likebtn: { label: "Like Button Rating", value: "likebtn", args: {} },
			kkratings: {
				label: "KK Star Ratings",
				value: "kkratings",
				args: [
					{ id: "size", label: "Size", val: "15" },
					{ id: "id", label: "Post Id", val: "{currentPostId}" },
				],
			},
		});

		useEffect(() => {
			apiFetch({
				path: "/post-grid/v2/get_shortcode",
				method: "POST",
				data: {
					postId: postId,
					meta_key: shortcode.options.key,
					prams: shortcode.options.prams,
				},
			}).then((res) => {
				setMetaHtml(res.html);
				//setMetaArgs(res.args);
			});
		}, [shortcode]);

		// var breakPointList = [];

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();

			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

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
				var shortcodeClassicX = attributes.shortcodeClassic;
				var shortcodeX = attributes.shortcode;
				var blockCssYX = attributes.blockCssY;

				var blockCssObj = {};

				if (shortcodeX != undefined) {
					var shortcodeY = { ...shortcodeX, options: shortcode.options };
					setAttributes({ shortcode: shortcodeY });
					blockCssObj[shortcodeSelector] = shortcodeY;
				}

				if (shortcodeClassicX != undefined) {
					var shortcodeClassicY = {
						...shortcodeClassicX,
						options: shortcodeClassic.options,
					};
					setAttributes({ shortcodeClassic: shortcodeClassicY });
					blockCssObj[shortcodeClassicSelector] = shortcodeClassicY;
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

		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [items]);

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
				<InspectorControls>
					<div className="pg-setting-input-text">
						<PanelBody
							className="font-medium text-slate-900 "
							title="Shortcode Key"
							initialOpen={true}>
							<label className="mb-3">Choose Shortcode </label>
							<PGDropdown
								position="bottom right"
								variant="secondary"
								options={shortcodes}
								buttonTitle="Choose"
								onChange={(option, index) => {
									var options = {
										...shortcode.options,
										id: option.id,
										key: option.value,
										prams: option.args,
									};
									setAttributes({
										shortcode: { ...shortcode, options: options },
									});
								}}
								values=""
								value={shortcode.options.key}></PGDropdown>

							<PanelRow>
								<label for="" className="font-medium text-slate-900 ">
									Shortcode Key
								</label>

								<InputControl
									placeholder="Shortcode key"
									value={shortcode.options.key}
									onChange={(newVal) => {
										let result = newVal.includes("[");

										if (result) {
											var shortcodeStr = newVal.replace("[", "");
											shortcodeStr = shortcodeStr.replace("]", "");

											var shortcodeArr = shortcodeStr.split(" ");
											var shortcodeKey = shortcodeArr[0];

											newVal = shortcodeKey;

											shortcodeArr.shift();

											var attsGroups = [];
											var options = { ...shortcode.options };

											shortcodeArr.map((x) => {
												var shortcodePrams = {};
												var attrArr = x.split("=");

												shortcodePrams.id =
													attrArr[0] == undefined ? "" : attrArr[0];
												shortcodePrams.label =
													attrArr[0] == undefined ? "" : attrArr[0];
												shortcodePrams.val =
													attrArr[1] == undefined
														? ""
														: attrArr[1].replaceAll('"', "");

												options.prams.push(shortcodePrams);
											});

											setAttributes({
												shortcode: { ...shortcode, options: options },
											});
										}

										var options = { ...shortcode.options, key: newVal };
										setAttributes({
											shortcode: { ...shortcode, options: options },
										});
									}}
								/>
							</PanelRow>

							<p>
								You can paste the shortcode, please use following format when
								pasting
							</p>

							<code>[shortcode attr1="value1" attr2="value2"]</code>

							<PanelRow>
								<label for="" className="font-medium text-slate-900 ">
									Parameters
								</label>
								<Button
									className={linkPickerText ? "!bg-gray-400" : ""}
									icon={plus}
									onClick={(ev) => {
										setLinkPickerText((prev) => !prev);
									}}>
									Add
								</Button>

								{linkPickerText && (
									<Popover position="bottom right ">
										<div className="p-3 w-60">
											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													ID
												</label>

												<InputControl
													value={shortcodePrams.id}
													onChange={(newVal) => {
														setShortcodePrams({
															...shortcodePrams,
															id: newVal,
														});
													}}
												/>
											</PanelRow>

											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Label
												</label>

												<InputControl
													value={shortcodePrams.label}
													onChange={(newVal) => {
														setShortcodePrams({
															...shortcodePrams,
															label: newVal,
														});
													}}
												/>
											</PanelRow>
											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Value
												</label>

												<InputControl
													value={shortcodePrams.val}
													onChange={(newVal) => {
														setShortcodePrams({
															...shortcodePrams,
															val: newVal,
														});
													}}
												/>
											</PanelRow>

											<Button
												variant="secondary"
												onClick={(ev) => {
													var options = { ...shortcode.options };
													options.prams.push(shortcodePrams);

													setAttributes({
														shortcode: { ...shortcode, options: options },
													});

													// shortcodePrams.id = '';
													// shortcodePrams.label = '';
													// shortcodePrams.val = '';
												}}>
												Add Parameter
											</Button>
										</div>
									</Popover>
								)}
							</PanelRow>

							<div className="">
								{shortcode.options.prams != undefined &&
									shortcode.options.prams.map((arg, index) => {
										return (
											<div className="my-2 bg-gray-300">
												<div className="bg-gray-500 px-3 text-white">
													<PanelRow>
														<label
															for=""
															className="font-medium text-slate-900 ">
															{arg.label} ({arg.id})
														</label>

														<span
															class="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
															onClick={(ev) => {
																var options = { ...shortcode.options };

																options.prams.splice(index, 1);

																setAttributes({
																	shortcode: { ...shortcode, options: options },
																});
															}}>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																viewBox="0 0 24 24"
																width="24"
																height="24"
																aria-hidden="true"
																focusable="false">
																<path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"></path>
															</svg>
														</span>
													</PanelRow>
												</div>
												<div className="px-3 py-2">
													<InputControl
														value={arg.val}
														onChange={(newVal) => {
															var options = { ...shortcode.options };
															options.prams[index].val = newVal;
															setAttributes({
																shortcode: { ...shortcode, options: options },
															});
														}}
													/>
												</div>
											</div>
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
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Wrapper Class
										</label>

										<InputControl
											value={wrapper.options.class}
											onChange={(newVal) => {
												var options = { ...wrapper.options, class: newVal };
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
							title="Block Variations"
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={"shortcode"}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
							/>
						</PanelBody>
					</div>
				</InspectorControls>

				<>
					<div {...blockProps}>
						{shortcode.options.key.length == 0 && (
							<PGDropdown
								position="bottom right"
								variant="secondary"
								options={shortcodes}
								buttonTitle="Choose"
								onChange={(option, index) => {
									var options = { ...shortcode.options, key: option.value };
									setAttributes({
										shortcode: { ...shortcode, options: options },
									});
								}}
								values=""
								value={shortcode.options.key}></PGDropdown>
						)}

						<RawHTML>{metaHtml}</RawHTML>
					</div>
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
