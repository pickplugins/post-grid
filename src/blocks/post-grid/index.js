import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import { applyFilters } from "@wordpress/hooks";

import apiFetch from "@wordpress/api-fetch";

import {
	BlockContextProvider,
	__experimentalUseBlockPreview as useBlockPreview,
} from "@wordpress/block-editor";
const { parse } = wp.blockSerializationDefaultParser;
const { RawHTML } = wp.element;
// var select = wp.data.select('core/block-editor');
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from "@wordpress/block-editor";
import {
	createElement,
	memo,
	useMemo,
	useState,
	useEffect,
} from "@wordpress/element";
import {
	PanelBody,
	RangeControl,
	Button,
	ButtonGroup,
	Panel,
	PanelRow,
	Dropdown,
	DropdownMenu,
	SelectControl,
	ColorPicker,
	ColorPalette,
	ToolsPanelItem,
	ComboboxControl,
	Spinner,
	CustomSelectControl,
	Popover,
} from "@wordpress/components";
import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	RichText,
} from "@wordpress/block-editor";
import { __experimentalInputControl as InputControl } from "@wordpress/components";

import { __experimentalBorderControl as BorderControl } from "@wordpress/components";

import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { createBlocksFromInnerBlocksTemplate } from "@wordpress/blocks";

import { useSelect, select, useDispatch, dispatch } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import {
	Icon,
	close,
	settings,
	cloud,
	pencil,
	styles,
	brush,
	mediaAndText,
} from "@wordpress/icons";

import PGIconPicker from "../../components/icon-picker";

import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";
import PGStyles from "../../components/styles";
import PGTutorials from "../../components/tutorials";

import PGLibraryBlockVariations from "../../components/library-block-variations";

import breakPoints from "../../breakpoints";

import tutorialsLinks from "./tutorials-links";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGCssLibrary from "../../components/css-library";

const ALLOWED_MEDIA_TYPES = ["image"];
import metadata from "./block.json";
import PGcssClassPicker from "../../components/css-class-picker";
import customTags from "../../custom-tags";

// var queryPramsX = queryPrams.map((x, i) => {

//   return { value: i, label: x.label, description: x.description, isPro: x.isPro, }
// })

var myStore = wp.data.select("postgrid-shop");

registerBlockType(metadata, {
	icon: {
		background: "#fff",
		foreground: "#fff",
		src: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
				<path fill="#1d4ed8" d="M15.41,15.41H0V0H15.41ZM3,12.41h9.41V3H3Z" />
				<path fill="#1d4ed8" d="M15.41,36H0V20.59H15.41ZM3,33h9.41V23.59H3Z" />
				<path
					fill="#1d4ed8"
					d="M36,36H20.59V20.59H36ZM23.59,33H33V23.59H23.59Z"
				/>
				<rect fill="#1d4ed8" x="25.15" y="3.87" width="10.85" height="2.35" />
				<rect fill="#1d4ed8" x="25.15" y="9.19" width="10.85" height="2.35" />
			</svg>
		),
	},

	edit: function (props) {
		var attributes = props.attributes;
		var clientId = props.clientId;

		var setAttributes = props.setAttributes;

		var lazyLoad = attributes.lazyLoad;
		var container = attributes.container;

		var itemsWrap = attributes.itemsWrap;
		var itemWrap = attributes.itemWrap;
		var noPostsWrap = attributes.noPostsWrap;
		var spinnerWrap = attributes.spinnerWrap;

		var grid = attributes.grid;
		var blockCssY = attributes.blockCssY;

		var blockId = attributes.blockId;

		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;

		var [isBusy, setIsBusy] = useState(false); // Using the hook.
		var [importLayoutOpen, setimportLayoutOpen] = useState({
			id: 0,
			isOpen: false,
		}); // Using the hook.

		const blockProps = useBlockProps({
			className: ` ${blockId} pg-post-grid`,
		});

		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);

		var containerSelector = blockClass;
		const itemsWrapSelector = blockClass + " .items-loop";
		const itemWrapSelector = blockClass + " .item";

		const noPostsSelector = blockClass + " .no-posts";
		const lazyloadWrapSelector = blockClass + " .lazyLoad";
		const spinnerSelector = blockClass + " .spinner";

		var [debounce, setDebounce] = useState(null); // Using the hook.
		const [breakPointX, setBreakPointX] = useState(
			myStore != null ? myStore.getBreakPoint() : "Desktop"
		);
		const [postGridData, setPostGridData] = useState(window.PostGridPluginData);

		let isProFeature = applyFilters("isProFeature", true);

		const [clientData, setClientData] = useState({});
		const { replaceInnerBlocks } = useDispatch(blockEditorStore);

		var clientDataX = myStore != null ? myStore.getclientdata() : "";

		useEffect(() => {
			setPostGridData(window.PostGridPluginData);
		}, [window.PostGridPluginData]);

		useEffect(() => {
			setClientData(myStore != null ? myStore.getclientdata() : "");
		}, [clientDataX]);

		//const ALLOWED_BLOCKS = ["post-grid/post-query"];

		const MY_TEMPLATE = [
			["post-grid/post-query", {}],
			["post-grid/post-query-pagination", {}],
		];

		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			//allowedBlocks: ALLOWED_BLOCKS,
			template: MY_TEMPLATE,
			orientation: "horizontal",
			templateInsertUpdatesSelection: true,
			//renderAppender: InnerBlocks.ButtonBlockAppender
		});

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
				var lazyLoadX = attributes.lazyLoad;
				var containerX = attributes.container;
				var itemsWrapX = attributes.itemsWrap;
				var itemWrapX = attributes.itemWrap;
				var noPostsWrapX = attributes.noPostsWrap;
				var spinnerWrapX = attributes.spinnerWrap;
				var gridX = attributes.grid;

				var blockCssYX = attributes.blockCssY;

				var blockCssObj = {};

				if (gridX != undefined) {
					var gridY = { ...gridX, options: grid.options };
					setAttributes({ grid: gridY });
					blockCssObj[gridSelector] = gridY;
				}

				if (spinnerWrapX != undefined) {
					var spinnerWrapY = { ...spinnerWrapX, options: spinnerWrap.options };
					setAttributes({ spinnerWrap: spinnerWrapY });
					blockCssObj[spinnerWrapSelector] = spinnerWrapY;
				}

				if (noPostsWrapX != undefined) {
					var noPostsWrapY = { ...noPostsWrapX, options: noPostsWrap.options };
					setAttributes({ noPostsWrap: noPostsWrapY });
					blockCssObj[noPostsWrapSelector] = noPostsWrapY;
				}

				if (itemWrapX != undefined) {
					var itemWrapY = { ...itemWrapX, options: itemWrap.options };
					setAttributes({ itemWrap: itemWrapY });
					blockCssObj[itemWrapSelector] = itemWrapY;
				}

				if (itemsWrapX != undefined) {
					var itemsWrapY = { ...itemsWrapX, options: itemsWrap.options };
					setAttributes({ itemsWrap: itemsWrapY });
					blockCssObj[itemsWrapSelector] = itemsWrapY;
				}

				if (containerX != undefined) {
					var containerY = { ...containerX, options: container.options };
					setAttributes({ container: containerY });
					blockCssObj[containerSelector] = containerY;
				}

				if (lazyLoadX != undefined) {
					var lazyLoadY = { ...lazyLoadX, options: lazyLoad.options };
					setAttributes({ lazyLoad: lazyLoadY });
					blockCssObj[lazyLoadSelector] = lazyLoadY;
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

		function onChangeStyleContainer(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, container);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ container: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				containerSelector
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

		function onRemoveStyleContainer(sudoScource, key) {
			var object = myStore.deletePropertyDeep(container, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ container: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				containerSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleContainer(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, container);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ container: object });
		}

		function onPickCssLibraryItemsWrap(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				itemsWrap[sudoScource] = sudoScourceArgs;
			});

			var itemsWrapX = Object.assign({}, itemsWrap);
			setAttributes({ itemsWrap: itemsWrapX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					itemsWrapSelector
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

		function onChangeStyleItemsWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, itemsWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ itemsWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemsWrapSelector
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

		function onRemoveStyleItemsWrap(sudoScource, key) {
			var object = myStore.deletePropertyDeep(itemsWrap, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ itemsWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemsWrapSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleItemsWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, itemsWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ itemsWrap: object });
		}

		function onPickCssLibraryItemWrap(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				itemWrap[sudoScource] = sudoScourceArgs;
			});

			var itemWrapX = Object.assign({}, itemWrap);
			setAttributes({ itemWrap: itemWrapX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					itemWrapSelector
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

		function onChangeStyleItemWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, itemWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ itemWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemWrapSelector
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

		function onRemoveStyleItemWrap(sudoScource, key) {
			var object = myStore.deletePropertyDeep(itemWrap, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ itemWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemWrapSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleItemWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, itemWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ itemWrap: object });
		}

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });

			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[containerSelector] = container;
			blockCssObj[itemsWrapSelector] = itemsWrap;
			blockCssObj[itemWrapSelector] = itemWrap;
			blockCssObj[noPostsSelector] = noPostsWrap;
			blockCssObj[lazyloadWrapSelector] = lazyLoad;
			blockCssObj[spinnerSelector] = spinnerWrap;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = { ...blockCssY.items, ...blockCssRules };
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		useEffect(() => {
			blockCssY.items[itemsWrapSelector] =
				blockCssY.items[itemsWrapSelector] != undefined
					? blockCssY.items[itemsWrapSelector]
					: {};

			var nthItemsResponsive = [];
			var itemX = { ...blockCssY.items };

			Object.entries(grid.options.itemCss).map((args) => {
				/****breakPoint****/

				var breakPoint = args[0];
				var nthItems = args[1];

				nthItems.length > 0 &&
					nthItems.map((x, i) => {
						/****nthItems****/
						Object.entries(x).map((attr) => {
							var attrId = attr[0];
							var attrVal = attr[1];

							if (nthItemsResponsive[i] != undefined) {
								//nthItemsResponsive[i] = [];
							} else {
								nthItemsResponsive[i] = [];
							}

							if (nthItemsResponsive[i][attrId] != undefined) {
								//nthItemsResponsive[i][attrId] = [];
							} else {
								nthItemsResponsive[i][attrId] = [];
							}

							if (nthItemsResponsive[i][attrId][breakPoint] != undefined) {
								nthItemsResponsive[i][attrId][breakPoint] = attrVal;
							} else {
								nthItemsResponsive[i][attrId][breakPoint] = attrVal;
							}
						});
					});
			});

			for (var i = 0; i < 10; i++) {
				var selector = `${blockClass} .item:nth-child(${i})`;
				if (blockCssY.items[selector] != undefined) {
					delete blockCssY.items[selector];
				}
			}

			var imtasdas = {};

			nthItemsResponsive.length > 0 &&
				nthItemsResponsive.map((nth, i) => {
					var selector = `${blockClass} .item:nth-child(${i + 1})`;
					Object.entries(nth).map((attr) => {
						var attrId = attr[0];
						var attrVal = attr[1];

						if (imtasdas[selector] != undefined) {
						} else {
							imtasdas[selector] = {};
						}

						if (imtasdas[selector][attrId] != undefined) {
						} else {
							imtasdas[selector][attrId] = {};
						}

						imtasdas[selector][attrId] = attrVal;
					});
				});

			var asdsd = { ...blockCssY.items, ...imtasdas };

			setAttributes({ blockCssY: { items: asdsd } });
		}, [grid]);

		var breakPointList = [{ label: "Select..", icon: "", value: "" }];

		for (var x in breakPoints) {
			var item = breakPoints[x];
			breakPointList.push({
				label: item.name,
				icon: item.icon,
				value: item.id,
			});
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

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<PanelBody title="Container" initialOpen={false}>
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
									<label for="">CSS Class</label>

									<PGcssClassPicker
										tags={customTags}
										placeholder="Add Class"
										value={container.options.class}
										onChange={(newVal) => {
											var options = { ...container.options, class: newVal };
											setAttributes({
												container: {
													styles: container.styles,
													options: options,
												},
											});
										}}
									/>

									<PanelRow>
										<label for="">CSS ID</label>
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
										obj={container}
										onChange={onChangeStyleContainer}
										onAdd={onAddStyleContainer}
										onRemove={onRemoveStyleContainer}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody title="Grid Wrap" initialOpen={false}>
							<PGStyles
								obj={itemsWrap}
								onChange={onChangeStyleItemsWrap}
								onAdd={onAddStyleItemsWrap}
								onRemove={onRemoveStyleItemsWrap}
							/>
						</PanelBody>

						<PanelBody title="Grid Item Wrap" initialOpen={false}>
							<PGStyles
								obj={itemWrap}
								onChange={onChangeStyleItemWrap}
								onAdd={onAddStyleItemWrap}
								onRemove={onRemoveStyleItemWrap}
							/>
						</PanelBody>

						<PanelBody title="N'th Item CSS" initialOpen={false}>
							<div>
								<PanelRow>
									<Button
										className="my-3"
										variant="secondary"
										disabled={isProFeature}
										onClick={(_newVal) => {
											if (grid.options.itemCss[breakPointX] != undefined) {
												var ssd = grid.options.itemCss[breakPointX].concat({
													"grid-column-start": "",
													"grid-column-end": "",
													"grid-row-start": "",
													"grid-row-end": "",
												});
											} else {
												grid.options.itemCss[breakPointX] = [];
												var ssd = grid.options.itemCss[breakPointX].concat({
													"grid-column-start": "",
													"grid-column-end": "",
													"grid-row-start": "",
													"grid-row-end": "",
												});
											}

											var newValuesObj = {};
											if (Object.keys(grid.options.itemCss).length == 0) {
												newValuesObj[breakPointX] = ssd;
											} else {
												newValuesObj = grid.options.itemCss;
												newValuesObj[breakPointX] = ssd;
											}

											var options = { ...grid.options, itemCss: newValuesObj };
											setAttributes({ grid: { ...grid, options: options } });
										}}>
										Add
									</Button>

									{isProFeature && (
										<span className="bg-amber-400 mx-2 rounded-sm py-1 px-3  text-white hover:text-white">
											<a
												target="_blank"
												href={
													"https://pickplugins.com/post-grid/?utm_source=nthItemCSS&utm_term=blockPostgrid&utm_campaign=pluginPostGrid&utm_medium=nthItemCSS"
												}>
												Pro
											</a>
										</span>
									)}
								</PanelRow>

								{grid.options.itemCss[breakPointX] != undefined &&
									grid.options.itemCss[breakPointX].map((x, i) => {
										return (
											<PanelBody title={i + 1 + "'th Item"} initialOpen={false}>
												<Button
													icon="no-alt"
													variant="secondary"
													onClick={(_ev) => {
														grid.options.itemCss[breakPointX].splice(i, 1);

														var options = {
															...grid.options,
															itemCss: grid.options.itemCss,
														};
														setAttributes({
															grid: { ...grid, options: options },
														});
													}}>
													Delete
												</Button>

												<PanelRow>
													<label for="">grid-column-start</label>
													<InputControl
														value={x["grid-column-start"]}
														type="number"
														onChange={(newVal) => {
															grid.options.itemCss[breakPointX][i][
																"grid-column-start"
															] = newVal;

															var options = {
																...grid.options,
																itemCss: grid.options.itemCss,
															};
															setAttributes({
																grid: { ...grid, options: options },
															});
														}}
													/>
												</PanelRow>

												<PanelRow>
													<label for="">grid-column-end</label>
													<InputControl
														value={x["grid-column-end"]}
														type="number"
														onChange={(newVal) => {
															grid.options.itemCss[breakPointX][i][
																"grid-column-end"
															] = newVal;

															var options = {
																...grid.options,
																itemCss: grid.options.itemCss,
															};
															setAttributes({
																grid: { ...grid, options: options },
															});
														}}
													/>
												</PanelRow>

												<PanelRow>
													<label for="">grid-row-start</label>
													<InputControl
														value={x["grid-row-start"]}
														type="number"
														onChange={(newVal) => {
															grid.options.itemCss[breakPointX][i][
																"grid-row-start"
															] = newVal;

															var options = {
																...grid.options,
																itemCss: grid.options.itemCss,
															};
															setAttributes({
																grid: { ...grid, options: options },
															});
														}}
													/>
												</PanelRow>

												<PanelRow>
													<label for="">grid-row-end</label>
													<InputControl
														value={x["grid-row-end"]}
														type="number"
														onChange={(newVal) => {
															grid.options.itemCss[breakPointX][i][
																"grid-row-end"
															] = newVal;

															var options = {
																...grid.options,
																itemCss: grid.options.itemCss,
															};
															setAttributes({
																grid: { ...grid, options: options },
															});
														}}
													/>
												</PanelRow>
											</PanelBody>
										);
									})}
							</div>
						</PanelBody>

						<PanelBody title="Lazy load" initialOpen={false}>
							<PanelRow>
								<label for="">Enable Lazy Load</label>

								<SelectControl
									label=""
									value={lazyLoad.options.enable}
									options={[
										{ label: "Yes", value: "yes" },
										{ label: "No", value: "no" },
									]}
									onChange={(newVal) => {
										var options = { ...lazyLoad.options, enable: newVal };
										setAttributes({
											lazyLoad: { ...lazyLoad, options: options },
										});
									}}
								/>
							</PanelRow>

							<PanelRow>
								<label for="">Lazy load Icon</label>

								<PGIconPicker
									library={
										lazyLoad.options.icon != undefined
											? lazyLoad.options.icon.library
											: "fontAwesome"
									}
									srcType={
										lazyLoad.options.icon != undefined
											? lazyLoad.options.icon.srcType
											: "class"
									}
									iconSrc={
										lazyLoad.options.icon != undefined
											? lazyLoad.options.icon.iconSrc
											: ""
									}
									onChange={(arg) => {
										var options = {
											...lazyLoad.options,
											icon: {
												srcType: arg.srcType,
												library: arg.library,
												iconSrc: arg.iconSrc,
											},
										};

										setAttributes({
											lazyLoad: { ...lazyLoad, options: options },
										});
									}}
								/>
							</PanelRow>

							<PanelRow>
								<label for="">Lazy Load Image</label>

								<MediaUploadCheck>
									<MediaUpload
										onSelect={(media) => {
											// media.id

											var options = {
												...lazyLoad.options,
												srcUrl: media.url,
												srcId: media.id,
											};
											setAttributes({
												lazyLoad: { ...lazyLoad, options: options },
											});
										}}
										onClose={() => {}}
										allowedTypes={ALLOWED_MEDIA_TYPES}
										value={lazyLoad.options.srcId}
										render={({ open }) => (
											<Button className="border" onClick={open}>
												Open Media Library
											</Button>
										)}
									/>
								</MediaUploadCheck>
							</PanelRow>

							<img className="my-5" src={lazyLoad.options.srcUrl} alt="" />
						</PanelBody>

						<PanelBody title="Block Variations" initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={"post-grid"}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
							/>
						</PanelBody>

						<div className="px-3">
							<PGMailSubsctibe />
							<PGContactSupport
								utm={{
									utm_source: "BlockPostGrid",
									utm_campaign: "PostGridCombo",
									utm_content: "BlockOptions",
								}}
							/>
						</div>

						<PanelBody className="" title="Tutorials" initialOpen={false}>
							<PGTutorials links={tutorialsLinks} />
						</PanelBody>
					</div>
				</InspectorControls>

				<div {...innerBlocksProps}>{innerBlocksProps.children}</div>

				<div {...blockProps}>
					{lazyLoad.options.enable == "yes" && isBusy && (
						<div className={lazyLoad.options.class}></div>
					)}

					{isBusy && (
						<div className="text-center">
							<Spinner />
						</div>
					)}
				</div>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file

		var attributes = props.attributes;
		// var wrapper = attributes.wrapper;

		// var blockId = attributes.blockId;

		// const blockProps = useBlockProps.save({
		// 	className: ` ${blockId} `,
		// });

		return <InnerBlocks.Content />;

		//return null;
	},
});

