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
import PGLibraryBlockVariations from "../../components/library-block-variations";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import PGCssLibrary from "../../components/css-library";
import PGIconPicker from "../../components/icon-picker";
import metadata from "./block.json";
import PGcssClassPicker from "../../components/css-class-picker";
import customTags from "../../custom-tags";

import Masonry from "masonry-layout";

import imagesLoaded from "imagesloaded";
import PGDropdown from "../../components/dropdown";

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
				<rect fill="#1d4ed8" y="9.59" width="8.29" height="16.82" />
				<rect fill="#1d4ed8" x="27.71" y="9.59" width="8.29" height="16.82" />
				<rect fill="#1d4ed8" x="11.05" y="9.59" width="13.9" height="16.82" />
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
		var item = attributes.item;
		var masonryOptions = attributes.masonryOptions;
		var lightbox = attributes.lightbox;

		const lightboxEnable =
			lightbox.options.enable == undefined ? true : lightbox.options.enable;


		var blockCssY = attributes.blockCssY;

		var postId = context["postId"];
		var postType = context["postType"];

		var breakPointX = myStore.getBreakPoint();

		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;

		var itemSelector = blockClass + " .pg-masonry-wrap-item";
		// var masonryOptionsSelector = blockClass + " .pg-masonry-wrap-item";

		const { replaceInnerBlocks } = useDispatch(blockEditorStore);

		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);

		var icons = { bed: "", layout: "", smiley: "", columns: "", globe: "" };

		useEffect(() => {
			// console.log(Math.floor(new Date("2012.08.10").getTime() / 1000));
			setTimeout(() => {
				loadMasonry();
			}, 500);
		}, [masonryOptions]);

		function loadMasonry() {
			var elemX = document.querySelectorAll("." + blockId);

			// console.log(elemX);
			if (elemX != null) {
				elemX.forEach((arg) => {
					// var postgridargs = arg.getAttribute("postgridargs");
					// console.log("arg : ", arg);
					// imagesLoaded(arg, function () {
					var msnry = new Masonry(
						arg,
						masonryOptions
						// 	{
						// 	// options

						// itemSelector: masonryOptions.itemSelector,
						// columnWidth: parseInt(masonryOptions.columnWidth),
						// gutter: parseInt(masonryOptions.gutter),
						// horizontalOrder: masonryOptions.horizontalOrder,
						// percentPosition: masonryOptions.percentPosition,
						// stamp: masonryOptions.stamp,
						// fitWidth: masonryOptions.fitWidth,
						// originLeft: masonryOptions.originLeft,
						// originTop: masonryOptions.originTop,
						// // stagger: masonryOptions.stagger,
						// resize: masonryOptions.resize,

						// }
					);

					// });
				});
			}
		}

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });

			myStore.generateBlockCss(blockCssY.items, blockId);

			setAttributes({ blockCssY: { items: blockCssY.items } });
			setTimeout(() => {
				loadMasonry();
				// console.log("first");
			}, 5000);
			// console.log(Math.floor(new Date("2012.08.10").getTime() / 1000));
		}, [clientId]);

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[itemSelector] = item;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		function onPickBlockPatterns(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;

			var blocks = content.length > 0 ? parse(content) : "";
			// console.log(content);
			// console.log(blocks);
			const attributes = blocks[0].attrs;
			// attributes.blockId = Date.now();
			// console.log(Date.now());
			if (action == "insert") {
				wp.data
					.dispatch("core/block-editor")
					.insertBlocks(wp.blocks.parse(content));
			}
			if (action == "applyStyle") {
				// var options = attributes.options
				var wrapperX = attributes.wrapper;

				var blockCssY = attributes.blockCssY;

				var blockCssObj = {};

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

		function onChangeStyleGutter(sudoScource, newVal, attr) {
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

		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
		}

		function applyFlex(attr, newVal) {
			onChangeStyleWrapper("styles", newVal, attr);
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

		function onChangeStyleItem(sudoScource, newVal, attr) {
			console.log(item);

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

		function onRemoveStyleItem(sudoScource, key) {
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

		function onAddStyleItem(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, item);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ item: object });
		}

		function onBulkAddItem(sudoScource, cssObj) {
			// var path = [sudoScource, attr, breakPointX]s
			let obj = Object.assign({}, item);
			obj[sudoScource] = cssObj;

			setAttributes({ item: obj });

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

		var masonryOptionsArgs = {
			itemSelector: { label: "Item Selector", value: ".pg-masonry-wrap-item" },
			columnWidth: { label: "Column Width", value: 200 },
			gutter: { label: "Gutter", value: 15 },
			percentPosition: { label: "Percent Position", value: true },
			horizontalOrder: { label: "Horizontal Order", value: true },
			stamp: { label: "Stamp", value: ".stamp" },
			fitWidth: { label: "Fit Width", value: true },
			originLeft: { label: "Origin Left", value: true },
			originTop: { label: "Origin Top", value: true },
			stagger: { label: "Stagger", value: 30 },
			resize: { label: "Resize", value: true },
		};

		var RemoveMasonryArg = function ({ index }) {
			return (
				<span
					className="cursor-pointer inline-block hover:bg-red-500 hover:text-white px-1 py-1"
					onClick={(ev) => {
						var masonryOptionsX = { ...masonryOptions };
						delete masonryOptionsX[index];

						setAttributes({ masonryOptions: masonryOptionsX });
					}}>
					<Icon icon={close} />
				</span>
			);
		};

		const ALLOWED_BLOCKS = ["post-grid/masonry-wrap-item"];

		const MY_TEMPLATE = [
			["post-grid/masonry-wrap-item", {}],
			["post-grid/masonry-wrap-item", {}],
			["post-grid/masonry-wrap-item", {}],
		];

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class} `,
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

					<PanelBody title="Masonry" initialOpen={false}>
						<PanelRow className="my-3">
							<PGDropdown
								position="bottom right"
								variant="secondary"
								buttonTitle={"Choose"}
								options={masonryOptionsArgs}
								onChange={(option, index) => {
									var masonryOptionsX = { ...masonryOptions };

									masonryOptionsX[index] = option.value;

									setAttributes({ masonryOptions: masonryOptionsX });
								}}
								values=""></PGDropdown>
						</PanelRow>

						{Object.entries(masonryOptions).map((item, index) => {
							var id = item[0];
							var value = item[1];
							return (
								<>
									{id == "itemSelector" && (
										<PanelRow>
											<div className="flex items-center">
												<RemoveMasonryArg index={id} />
												<label for="">Item Selector</label>
											</div>

											{/* <InputControl
														value={masonryOptions.itemSelector}
														onChange={(newVal) => {
															setAttributes({
																masonryOptions: {
																	...masonryOptions,
																	itemSelector: newVal,
																},
															});
														}}
													/> */}
										</PanelRow>
									)}
									{id == "gutter" && (
										<PanelRow>
											<div className="flex items-center">
												<RemoveMasonryArg index={id} />
												<label for="">Gutter</label>
											</div>

											<InputControl
												type="number"
												value={masonryOptions.gutter}
												onChange={(newVal) => {
													setAttributes({
														masonryOptions: {
															...masonryOptions,
															gutter: parseInt(newVal),
														},
													});
													onChangeStyleItem(
														"styles",
														parseInt(newVal) + "px",
														"marginBottom"
													);
												}}
											/>
										</PanelRow>
									)}
									{id == "columnWidth" && (
										<PanelRow>
											<div className="flex items-center">
												<RemoveMasonryArg index={id} />
												<label for="">Column width</label>
											</div>

											<InputControl
												type="number"
												value={masonryOptions.columnWidth}
												onChange={(newVal) => {
													setAttributes({
														masonryOptions: {
															...masonryOptions,
															columnWidth: parseInt(newVal),
														},
													});
												}}
											/>
										</PanelRow>
									)}
									{id == "horizontalOrder" && (
										<PanelRow>
											<div className="flex items-center">
												<RemoveMasonryArg index={id} />

												<ToggleControl
													label="Horizontal Order?"
													help={
														masonryOptions.horizontalOrder
															? "Horizontal Order Enabled"
															: "Horizontal Order Disabled"
													}
													checked={masonryOptions.horizontalOrder}
													onChange={(newHorizontalOrder) => {
														const updatedMasonryOptions = {
															...masonryOptions,
															horizontalOrder: newHorizontalOrder,
														};
														setAttributes({
															masonryOptions: updatedMasonryOptions,
														});
													}}
												/>
											</div>
										</PanelRow>
									)}
									{id == "percentPosition" && (
										<PanelRow>
											<div className="flex items-center">
												<RemoveMasonryArg index={id} />

												<ToggleControl
													label="Percent Position?"
													help={
														masonryOptions.percentPosition
															? "Percent Position Enabled"
															: "Percent Position Disabled"
													}
													checked={masonryOptions.percentPosition}
													onChange={(newPercentPosition) => {
														const updatedMasonryOptions = {
															...masonryOptions,
															percentPosition: newPercentPosition,
														};
														setAttributes({
															masonryOptions: updatedMasonryOptions,
														});
													}}
												/>
											</div>
										</PanelRow>
									)}
									{id == "stamp" && (
										<PanelRow>
											<div className="flex items-center">
												<RemoveMasonryArg index={id} />
												<label for="">Gutter</label>
											</div>
										</PanelRow>
									)}
									{id == "fitWidth" && (
										<PanelRow>
											<div className="flex items-center">
												<RemoveMasonryArg index={id} />

												<ToggleControl
													label="Fit Width?"
													help={
														masonryOptions.fitWidth
															? "Fit Width Enabled"
															: "Fit Width Disabled."
													}
													checked={masonryOptions.fitWidth}
													onChange={(fitWidth) => {
														const updatedMasonryOptions = {
															...masonryOptions,
															fitWidth: fitWidth,
														};
														setAttributes({
															masonryOptions: updatedMasonryOptions,
														});
													}}
												/>
											</div>
										</PanelRow>
									)}
									{id == "originLeft" && (
										<PanelRow>
											<div className="flex items-center">
												<RemoveMasonryArg index={id} />

												<ToggleControl
													label="Origin Left?"
													help={
														masonryOptions.originLeft
															? "Origin Left Enabled"
															: "Origin Left Disabled."
													}
													checked={masonryOptions.originLeft}
													onChange={(originLeft) => {
														const updatedMasonryOptions = {
															...masonryOptions,
															originLeft: originLeft,
														};
														setAttributes({
															masonryOptions: updatedMasonryOptions,
														});
													}}
												/>
											</div>
										</PanelRow>
									)}
									{id == "originTop" && (
										<PanelRow>
											<div className="flex items-center">
												<RemoveMasonryArg index={id} />

												<ToggleControl
													label="Origin Top?"
													help={
														masonryOptions.originTop
															? "Origin Top Enabled"
															: "Origin Top Disabled."
													}
													checked={masonryOptions.originTop}
													onChange={(originTop) => {
														const updatedMasonryOptions = {
															...masonryOptions,
															originTop: originTop,
														};
														setAttributes({
															masonryOptions: updatedMasonryOptions,
														});
													}}
												/>
											</div>
										</PanelRow>
									)}
									{id == "stagger" && (
										<PanelRow>
											<div className="flex items-center">
												<RemoveMasonryArg index={id} />

												<ToggleControl
													label="Stagger?"
													help={
														masonryOptions.stagger
															? "Stagger Enabled"
															: "Stagger Disabled."
													}
													checked={masonryOptions.stagger}
													onChange={(stagger) => {
														const updatedMasonryOptions = {
															...masonryOptions,
															stagger: stagger,
														};
														setAttributes({
															masonryOptions: updatedMasonryOptions,
														});
													}}
												/>
											</div>
										</PanelRow>
									)}
									{id == "resize" && (
										<PanelRow>
											<div className="flex items-center">
												<RemoveMasonryArg index={id} />

												<ToggleControl
													label="Resize?"
													help={
														masonryOptions.resize
															? "Resize Enabled"
															: "Resize Disabled."
													}
													checked={masonryOptions.resize}
													onChange={(resize) => {
														const updatedMasonryOptions = {
															...masonryOptions,
															resize: resize,
														};
														setAttributes({
															masonryOptions: updatedMasonryOptions,
														});
													}}
												/>
											</div>
										</PanelRow>
									)}
								</>
							);
						})}
					</PanelBody>

					<PanelBody title="Item" initialOpen={false}>
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
							<PGtab name="options"></PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={item}
									onChange={onChangeStyleItem}
									onAdd={onAddStyleItem}
									onRemove={onRemoveStyleItem}
									onBulkAdd={onBulkAddItem}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					<PanelBody title="Lightbox" initialOpen={false}>
						<PanelRow>
							<ToggleControl
								label="Enable?"
								help={
									lightboxEnable ? "Lightbox Enabled" : "Lightbox Disabled."
								}
								checked={lightboxEnable ? true : false}
								onChange={(e) => {
									var options = {
										...lightbox.options,
										enable: lightboxEnable ? false : true,
									};
									setAttributes({
										lightbox: { ...lightbox, options: options },
									});
								}}
							/>
						</PanelRow>
					</PanelBody>

					<PanelBody title="Block Variations" initialOpen={false}>
						<PGLibraryBlockVariations
							blockName={"accordion-nested"}
							blockId={blockId}
							clientId={clientId}
							onChange={onPickBlockPatterns}
						/>
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
					{!hasInnerBlocks && (
						<div {...innerBlocksProps}>
							<div className="border p-5">
								<div className="flex justify-between mb-5">
									<div className="text-xl rounded-sm">
										Click to pick a variation
									</div>

									<div
										className="bg-orange-400 hover:bg-orange-300 px-4 py-1 text-white cursor-pointer"
										onClick={(ev) => {
											replaceInnerBlocks(
												clientId,
												createBlocksFromInnerBlocksTemplate([
													[
														"post-grid/masonry-wrap-item",
														{
															wrapper: {
																options: {
																	tag: "div",
																	class: "pg-masonry-wrap-item",
																},
																styles: {
																	
																},
															},
														},
													],
													[
														"post-grid/masonry-wrap-item",
														{
															wrapper: {
																options: {
																	tag: "div",
																	class: "pg-masonry-wrap-item",
																},
																styles: {
																	
																},
															},
														},
													],
												]),
												true
											);
										}}>
										Skip
									</div>
								</div>

								<div className="">
									{variations.map((variation) => {
										return (
											<div
												className="text-center inline-block m-4 w-32 align-top p-4 bg-gray-400 cursor-pointer hover:bg-gray-500 relative"
												onClick={(ev) => {
													if (variation.isPro) {
														alert(
															"Sorry this variation only vailable in pro version"
														);
														return false;
													}

													var atts = variation.atts;

													var wrapper = { ...atts.wrapper };

													var blockCssY = { ...atts.blockCssY };

													var blockCssObj = {};

													blockCssObj[wrapperSelector] = wrapper;

													setAttributes({
														wrapper: wrapper,
													});

													var blockCssRules =
														myStore.getBlockCssRules(blockCssObj);

													var items = blockCssRules;

													setAttributes({ blockCssY: { items: items } });

													replaceInnerBlocks(
														clientId,
														createBlocksFromInnerBlocksTemplate(
															variation.innerBlocks
														),
														true
													);
												}}>
												<div>{variation.icon}</div>
												<div>{variation.title}</div>

												{variation.isPro && (
													<span className="bg-amber-400 rounded-sm text-sm inline-block  bg-opacity-90 text-white hover:text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
														<a
															target="_blank"
															className="block px-3"
															href={
																"https://pickplugins.com/post-grid/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=" +
																variation.label
															}>
															Pro
														</a>
													</span>
												)}
											</div>
										);
									})}
								</div>
							</div>
						</div>
					)}

					{hasInnerBlocks && (
						<div {...innerBlocksProps}>{innerBlocksProps.children}</div>
					)}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file

		var attributes = props.attributes;
		var wrapper = attributes.wrapper;

		var blockId = attributes.blockId;

		const blockProps = useBlockProps.save({
			className: ` ${blockId} ${wrapper.options.class} `,
		});

		return <InnerBlocks.Content />;

		//return null;
	},
});

