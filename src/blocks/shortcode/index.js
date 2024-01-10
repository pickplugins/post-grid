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
					d="M24.4929 127H0V32H24.4929V40.5H8.46296V118.4H24.4929V127Z"
					fill="url(#paint0_linear_61_901)"
				/>
				<path
					d="M160 127H135.407V118.4H151.437V40.5H135.407V32H160V127Z"
					fill="url(#paint1_linear_61_901)"
				/>
				<path
					d="M19 83.0644V77.0896L42.899 66.5659V73.4403L26.5363 80.0091L26.757 79.6527V80.5013L26.5363 80.1449L42.899 86.7137V93.5881L19 83.0644Z"
					fill="url(#paint2_linear_61_901)"
				/>
				<path
					d="M56.2912 86.8156V86.2385C56.3026 84.2582 56.478 82.6796 56.8174 81.5028C57.1682 80.326 57.6774 79.3754 58.3451 78.6512C59.0127 77.927 59.8161 77.2707 60.7553 76.6823C61.4569 76.2296 62.0849 75.76 62.6394 75.2734C63.1939 74.7869 63.6352 74.2494 63.9634 73.6609C64.2915 73.0612 64.4556 72.3936 64.4556 71.658C64.4556 70.8773 64.2689 70.1926 63.8955 69.6042C63.5221 69.0158 63.0185 68.5632 62.3848 68.2463C61.7624 67.9295 61.0722 67.7711 60.314 67.7711C59.5785 67.7711 58.8826 67.9351 58.2262 68.2633C57.5699 68.5801 57.0324 69.0554 56.6137 69.6891C56.1951 70.3115 55.9687 71.0866 55.9348 72.0145H49.0095C49.0661 69.7513 49.6093 67.8842 50.639 66.4132C51.6687 64.9308 53.0323 63.8275 54.7297 63.1033C56.427 62.3678 58.2998 62 60.348 62C62.5998 62 64.5914 62.3734 66.3227 63.1203C68.054 63.8558 69.4119 64.9251 70.3964 66.3283C71.3809 67.7315 71.8731 69.4232 71.8731 71.4034C71.8731 72.7274 71.6525 73.9042 71.2111 74.934C70.7811 75.9524 70.1757 76.8577 69.395 77.6498C68.6142 78.4306 67.6919 79.1378 66.6282 79.7715C65.7343 80.3033 64.9988 80.8578 64.4217 81.4349C63.8559 82.012 63.4315 82.6796 63.1486 83.4378C62.877 84.196 62.7356 85.1295 62.7243 86.2385V86.8156H56.2912ZM59.652 97.6787C58.5205 97.6787 57.553 97.2827 56.7495 96.4906C55.9574 95.6872 55.567 94.7253 55.5784 93.6051C55.567 92.4961 55.9574 91.5456 56.7495 90.7535C57.553 89.9614 58.5205 89.5653 59.652 89.5653C60.727 89.5653 61.6719 89.9614 62.4867 90.7535C63.3014 91.5456 63.7144 92.4961 63.7257 93.6051C63.7144 94.3519 63.5164 95.0365 63.1317 95.6589C62.7582 96.2699 62.266 96.7622 61.6549 97.1356C61.0439 97.4977 60.3763 97.6787 59.652 97.6787Z"
					fill="url(#paint3_linear_61_901)"
				/>
				<path
					d="M94.2402 86.8156V86.2385C94.2515 84.2582 94.4269 82.6796 94.7664 81.5028C95.1172 80.326 95.6264 79.3754 96.2941 78.6512C96.9617 77.927 97.7651 77.2707 98.7043 76.6823C99.4059 76.2296 100.034 75.76 100.588 75.2734C101.143 74.7869 101.584 74.2494 101.912 73.6609C102.241 73.0612 102.405 72.3936 102.405 71.658C102.405 70.8773 102.218 70.1926 101.844 69.6042C101.471 69.0158 100.967 68.5632 100.334 68.2463C99.7114 67.9295 99.0212 67.7711 98.263 67.7711C97.5275 67.7711 96.8315 67.9351 96.1752 68.2633C95.5189 68.5801 94.9814 69.0554 94.5627 69.6891C94.144 70.3115 93.9177 71.0866 93.8838 72.0145H86.9585C87.0151 69.7513 87.5582 67.8842 88.588 66.4132C89.6177 64.9308 90.9813 63.8275 92.6786 63.1033C94.376 62.3678 96.2488 62 98.2969 62C100.549 62 102.54 62.3734 104.272 63.1203C106.003 63.8558 107.361 64.9251 108.345 66.3283C109.33 67.7315 109.822 69.4232 109.822 71.4034C109.822 72.7274 109.601 73.9042 109.16 74.934C108.73 75.9524 108.125 76.8577 107.344 77.6498C106.563 78.4306 105.641 79.1378 104.577 79.7715C103.683 80.3033 102.948 80.8578 102.371 81.4349C101.805 82.012 101.381 82.6796 101.098 83.4378C100.826 84.196 100.685 85.1295 100.673 86.2385V86.8156H94.2402ZM97.601 97.6787C96.4694 97.6787 95.5019 97.2827 94.6985 96.4906C93.9064 95.6872 93.516 94.7253 93.5273 93.6051C93.516 92.4961 93.9064 91.5456 94.6985 90.7535C95.5019 89.9614 96.4694 89.5653 97.601 89.5653C98.676 89.5653 99.6209 89.9614 100.436 90.7535C101.25 91.5456 101.663 92.4961 101.675 93.6051C101.663 94.3519 101.465 95.0365 101.081 95.6589C100.707 96.2699 100.215 96.7622 99.6039 97.1356C98.9929 97.4977 98.3252 97.6787 97.601 97.6787Z"
					fill="url(#paint4_linear_61_901)"
				/>
				<path
					d="M140.222 83.0644L116.323 93.5881V86.7137L132.686 80.1449L132.465 80.5013V79.6527L132.686 80.0091L116.323 73.4403V66.5659L140.222 77.0896V83.0644Z"
					fill="url(#paint5_linear_61_901)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_901"
						x1="0"
						y1="79.5"
						x2="24.4929"
						y2="79.5"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_901"
						x1="135.407"
						y1="79.5"
						x2="160"
						y2="79.5"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_901"
						x1="19"
						y1="79.8394"
						x2="140.222"
						y2="79.8394"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_901"
						x1="19"
						y1="79.8394"
						x2="140.222"
						y2="79.8394"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_901"
						x1="19"
						y1="79.8394"
						x2="140.222"
						y2="79.8394"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_61_901"
						x1="19"
						y1="79.8394"
						x2="140.222"
						y2="79.8394"
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
													var optionsX = { ...shortcode.options };
													var pramsX = [...shortcode.options.prams];
													pramsX.push(shortcodePrams);
													var optionsX = { ...optionsX, prams: pramsX };

													setAttributes({
														shortcode: { ...shortcode, options: optionsX },
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
															className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
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

						{/* <PanelBody
							className="font-medium text-slate-900 "
							title="Block Variations"
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={"shortcode"}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
							/>
						</PanelBody> */}
						<div className="px-3">
							<PGTutorials slug="shortcode" />
						</div>
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
