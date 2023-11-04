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
	Placeholder,
} from "@wordpress/components";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import apiFetch from "@wordpress/api-fetch";
import { applyFilters } from "@wordpress/hooks";

import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	RichText,
	__experimentalLinkControl as LinkControl,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { __experimentalInputControl as InputControl } from "@wordpress/components";
import breakPoints from "../../breakpoints";
const { RawHTML } = wp.element;
import { store } from "../../store";
import {
	Icon,
	styles,
	settings,
	pencil,
	cloud,
	link,
	linkOff,
	more,
} from "@wordpress/icons";

import IconToggle from "../../components/icon-toggle";
import Typography from "../../components/typography";
import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";
import BreakpointToggle from "../../components/breakpoint-toggle";
import colorsPresets from "../../colors-presets";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGDropdown from "../../components/dropdown";
import paginationTypes from "./pagination-types";

import PGStyles from "../../components/styles";
import PGIconPicker from "../../components/icon-picker";
import PGCssLibrary from "../../components/css-library";

var myStore = wp.data.select("postgrid-shop");

registerBlockType("post-grid/post-grid-pagination", {
	apiVersion: 2,
	title: "Post Grid Pagination",

	parent: ["post-grid/post-grid"],

	icon: {
		// Specifying a background color to appear with the icon e.g.: in the inserter.
		background: "#fff",
		// Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
		foreground: "#fff",
		// Specifying an icon for the block
		src: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
				<rect fill="#1d4ed8" y="10.4" width="7.49" height="15.2" />
				<rect fill="#1d4ed8" x="28.51" y="10.4" width="7.49" height="15.2" />
				<polygon
					fill="#1d4ed8"
					points="25.18 26.5 22.47 26.5 22.47 24.7 23.37 24.7 23.37 23.79 25.18 23.79 25.18 26.5"
				/>
				<rect fill="#1d4ed8" x="16.51" y="24.69" width="2.98" height="1.81" />
				<polygon
					fill="#1d4ed8"
					points="13.53 26.5 10.82 26.5 10.82 23.79 12.63 23.79 12.63 24.7 13.53 24.7 13.53 26.5"
				/>
				<rect fill="#1d4ed8" x="10.82" y="16.07" width="1.81" height="3.86" />
				<polygon
					fill="#1d4ed8"
					points="12.63 12.21 10.82 12.21 10.82 9.5 13.53 9.5 13.53 11.3 12.63 11.3 12.63 12.21"
				/>
				<rect fill="#1d4ed8" x="16.51" y="9.5" width="2.98" height="1.81" />
				<polygon
					fill="#1d4ed8"
					points="25.18 12.21 23.37 12.21 23.37 11.3 22.47 11.3 22.47 9.5 25.18 9.5 25.18 12.21"
				/>
				<rect fill="#1d4ed8" x="23.37" y="16.07" width="1.81" height="3.86" />
			</svg>
		),
	},

	attributes: {
		wrapper: {
			type: "object",
			default: {
				options: {
					tag: "div",
					class: "flex-item-wrap",
				},

				styles: {
					backgroundColor: { Desktop: "" },
					flexBasis: { Desktop: "0" },
					flexGrow: { Desktop: "1" },
				},
			},
		},

		pagination: {
			type: "object",
			default: {
				options: {
					class: "pagination",
					type: "normal",
					maxPageNum: "",
					prevText: "Previous",
					nextText: "Next",
					loadMoreText: "Load More",
					noMorePosts: "No More Posts",
					loadingText: "Loading...",
					loadingIcon: {
						library: "",
						srcType: "class",
						/*class, html, img, svg */ iconSrc: "",
					},
				},

				styles: {
					textAlign: { Desktop: "center" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
					fontSize: { Desktop: "" },
				},
			},
		},

		paginationItem: {
			type: "object",
			default: {
				options: { class: "page-numbers inline-block" },

				styles: {
					display: { Desktop: "inline-block" },
					color: { Desktop: "#18978F" },
					fontSize: { Desktop: "" },
				},
			},
		},

		paginationItemActive: {
			type: "object",
			default: {
				options: { class: "page-numbers inline-block" },

				styles: {
					display: {},
					color: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },

					fontSize: { Desktop: "" },
				},
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
		align: false,
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
		var pagination = attributes.pagination;
		var paginationItem = attributes.paginationItem;
		var paginationItemActive = attributes.paginationItemActive;

		var blockCssY = attributes.blockCssY;

		var postId = context["postId"];
		var postType = context["postType"];

		//const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
		var breakPointX = myStore.getBreakPoint();

		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();

			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);

		function generateElementSudoCss(obj) {
			var stylesObj = {};

			Object.entries(obj).map((args) => {
				var sudoSrc = args[0];
				var sudoArgs = args[1];

				if (sudoSrc != "options") {
					var selector = myStore.getElementSelector(sudoSrc, wrapperSelector);

					//console.log(selector);
					//console.log(sudoArgs);

					Object.entries(args[1]).map((x) => {
						var attr = x[0];
						var cssPropty = myStore.cssAttrParse(attr);

						if (stylesObj[selector] == undefined) {
							stylesObj[selector] = {};
						}

						if (stylesObj[selector][cssPropty] == undefined) {
							stylesObj[selector][cssPropty] = {};
						}

						stylesObj[selector][cssPropty] = x[1];
					});
				}

				//console.log(stylesObj);
			});

			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };
			//console.log(cssItemsX);

			setAttributes({ blockCssY: { items: cssItemsX } });
		}

		useEffect(() => {
			//console.log(wrapper);

			///myStore.generateBlockCss(blockCssY.items, blockId);

			var elementCss = generateElementSudoCss(wrapper);

			//console.log(elementCss);
		}, [wrapper]);

		// var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

		// for (var x in breakPoints) {

		//   var item = breakPoints[x];
		//   breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

		// }

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
			// var path = [sudoScource, attr, breakPointX]s
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

		function onPickCssLibraryPaginationItemActive(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				paginationItemActive[sudoScource] = sudoScourceArgs;
			});

			var paginationItemActiveX = Object.assign({}, paginationItemActive);
			setAttributes({ paginationItemActive: paginationItemActiveX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					paginationItemActiveSelector
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

		function onChangeStylePaginationItemActive(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, paginationItemActive);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ paginationItemActive: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationItemActiveSelector
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

		function onRemoveStylePaginationItemActive(sudoScource, key) {
			var object = myStore.deletePropertyDeep(paginationItemActive, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ paginationItemActive: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationItemActiveSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStylePaginationItemActive(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, paginationItemActive);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ paginationItemActive: object });
		}

		function onPickCssLibraryPagination(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				pagination[sudoScource] = sudoScourceArgs;
			});

			var paginationX = Object.assign({}, pagination);
			setAttributes({ pagination: paginationX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					paginationSelector
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

		function onChangeStylePagination(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, pagination);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ pagination: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationSelector
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

		function onRemoveStylePagination(sudoScource, key) {
			var object = myStore.deletePropertyDeep(pagination, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ pagination: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStylePagination(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, pagination);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ pagination: object });
		}

		function onPickCssLibraryPaginationItem(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				paginationItem[sudoScource] = sudoScourceArgs;
			});

			var paginationX = Object.assign({}, paginationItem);
			setAttributes({ paginationItem: paginationX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					paginationItemSelector
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

		function onChangeStylePaginationItem(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, paginationItem);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ paginationItem: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationItemSelector
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

		function onRemoveStylePaginationItem(sudoScource, key) {
			var object = myStore.deletePropertyDeep(paginationItem, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ paginationItem: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationItemSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStylePaginationItem(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, paginationItem);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ paginationItem: object });
		}

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		const MY_TEMPLATE = [
			//['core/paragraph', { placeholder: '', content: 'Hello Text...' }],
		];

		const blockProps = useBlockProps({
			className: ` ${blockId} pg-post-grid-pagination border border-dashed`,
		});

		//const isParentOfSelectedBlock = useSelect((select) => select('core/block-editor').hasSelectedInnerBlock(clientId, true))

		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			//allowedBlocks: ALLOWED_BLOCKS,
			template: MY_TEMPLATE,
			//orientation: 'horizontal',
			templateInsertUpdatesSelection: true,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		});

		return (
			<>
				<InspectorControls className="">
					<div className="">
						<PanelBody title="Pagination" initialOpen={false}>
							<PanelRow className="mb-4">
								<label for="">Pagination Type</label>
								<PGDropdown
									position="bottom right"
									variant="secondary"
									options={paginationTypes}
									buttonTitle="Choose"
									onChange={(arg, index) => {
										var options = { ...pagination.options, type: arg.value };
										setAttributes({
											pagination: { ...pagination, options: options },
										});
									}}
									values={""}></PGDropdown>
							</PanelRow>

							{pagination.options.type.length != 0 && (
								<div className="bg-gray-500 text-white px-3 py-2 my-5">
									{paginationTypes[pagination.options.type] != undefined
										? paginationTypes[pagination.options.type].label
										: ""}
								</div>
							)}

							{(pagination.options.type == "normal" ||
								pagination.options.type == "ajax") && (
								<>
									<PanelRow>
										<label for="">Max Number of Pagination</label>
										<InputControl
											value={pagination.options.maxPageNum}
											onChange={(newVal) => {
												var options = {
													...pagination.options,
													maxPageNum: newVal,
												};
												setAttributes({
													pagination: { ...pagination, options: options },
												});
											}}
										/>
									</PanelRow>
								</>
							)}

							{(pagination.options.type == "normal" ||
								pagination.options.type == "ajax" ||
								pagination.options.type == "next_previous") && (
								<>
									<PanelRow>
										<label for="">Previous Text</label>
										<InputControl
											value={pagination.options.prevText}
											onChange={(newVal) => {
												var options = {
													...pagination.options,
													prevText: newVal,
												};
												setAttributes({
													pagination: { ...pagination, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label for="">Next Text</label>
										<InputControl
											value={pagination.options.nextText}
											onChange={(newVal) => {
												var options = {
													...pagination.options,
													nextText: newVal,
												};
												setAttributes({
													pagination: { ...pagination, options: options },
												});
											}}
										/>
									</PanelRow>
								</>
							)}

							{(pagination.options.type == "loadmore" ||
								pagination.options.type == "infinite") && (
								<>
									<PanelRow>
										<label for="">Load More Text</label>

										<InputControl
											value={pagination.options.loadMoreText}
											onChange={(newVal) => {
												var options = {
													...pagination.options,
													loadMoreText: newVal,
												};
												setAttributes({
													pagination: { ...pagination, options: options },
												});
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label for="">No Posts Text</label>

										<InputControl
											value={pagination.options.noMorePosts}
											onChange={(newVal) => {
												var options = {
													...pagination.options,
													noMorePosts: newVal,
												};
												setAttributes({
													pagination: { ...pagination, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label for="">Loading Text</label>

										<InputControl
											value={pagination.options.loadingText}
											onChange={(newVal) => {
												var options = {
													...pagination.options,
													loadingText: newVal,
												};
												setAttributes({
													pagination: { ...pagination, options: options },
												});
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label for="">Loading Icon</label>

										<PGIconPicker
											library={pagination.options.loadingIcon.library}
											srcType={pagination.options.loadingIcon.srcType}
											iconSrc={pagination.options.loadingIcon.iconSrc}
											onChange={(arg) => {
												var options = {
													...pagination.options,
													loadingIcon: {
														srcType: arg.srcType,
														library: arg.library,
														iconSrc: arg.iconSrc,
													},
												};

												setAttributes({
													pagination: { ...pagination, options: options },
												});
											}}
										/>
									</PanelRow>
								</>
							)}

							<PanelBody
								className="my-5"
								title="Pagination Wrapper"
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
											icon: pencil,
											className: "tab-style",
										},
										{
											name: "css",
											title: "CSS Library",
											icon: cloud,
											className: "tab-css",
										},
									]}>
									<PGtab name="styles">
										<PGStyles
											obj={pagination}
											onChange={onChangeStylePagination}
											onAdd={onAddStylePagination}
											onRemove={onRemoveStylePagination}
										/>
									</PGtab>
									<PGtab name="css">
										<PGCssLibrary
											blockId={blockId}
											obj={pagination}
											onChange={onPickCssLibraryPagination}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>

							<PanelBody title="Pagination Items" initialOpen={false}>
								<PGtabs
									activeTab="styles"
									orientation="horizontal"
									activeClass="active-tab"
									onSelect={(tabName) => {}}
									tabs={[
										{
											name: "styles",
											title: "Styles",
											icon: pencil,
											className: "tab-style",
										},
										{
											name: "css",
											title: "CSS Library",
											icon: cloud,
											className: "tab-css",
										},
									]}>
									<PGtab name="styles">
										<PGStyles
											obj={paginationItem}
											onChange={onChangeStylePaginationItem}
											onAdd={onAddStylePaginationItem}
											onRemove={onRemoveStylePaginationItem}
										/>
									</PGtab>
									<PGtab name="css">
										<PGCssLibrary
											blockId={blockId}
											obj={paginationItem}
											onChange={onPickCssLibraryPaginationItem}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>

							<PanelBody title="Pagination Active" initialOpen={false}>
								<PGtabs
									activeTab="styles"
									orientation="horizontal"
									activeClass="active-tab"
									onSelect={(tabName) => {}}
									tabs={[
										{
											name: "styles",
											title: "Styles",
											icon: pencil,
											className: "tab-style",
										},
										{
											name: "css",
											title: "CSS Library",
											icon: cloud,
											className: "tab-css",
										},
									]}>
									<PGtab name="styles">
										<PGStyles
											obj={paginationItemActive}
											onChange={onChangeStylePaginationItemActive}
											onAdd={onAddStylePaginationItemActive}
											onRemove={onRemoveStylePaginationItemActive}
										/>
									</PGtab>
									<PGtab name="css">
										<PGCssLibrary
											blockId={blockId}
											obj={paginationItemActive}
											onChange={onPickCssLibraryPaginationItemActive}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>
						</PanelBody>

						<PanelBody title="Wrapper" initialOpen={false}>
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
										<label for="">Wrapper Tag</label>

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
										onRemove={onRemoveStyleWrapper}
										onBulkAdd={onBulkAddWrapper}
									/>
								</PGtab>
							</PGtabs>
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
					</div>
				</InspectorControls>

				<div {...blockProps}>1 2 3...</div>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file

		return null;
	},
});

