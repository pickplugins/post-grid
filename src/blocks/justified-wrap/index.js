import { registerBlockType, createBlock } from "@wordpress/blocks";
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

import LightGallery from "lightgallery/react";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

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
		var justifiedOptions = attributes.justifiedOptions;
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
			if (blockId.length != 0) {
				const galleryContainer = document.querySelector("." + blockId);
			}
		}, [justifiedOptions]);

		console.log(justifiedOptions);

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });

			myStore.generateBlockCss(blockCssY.items, blockId);

			setAttributes({ blockCssY: { items: blockCssY.items } });
			// setTimeout(() => {
			// 	loadJustified();
			// 	// console.log("first");
			// }, 5000);
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

			if (action == "insert") {
				wp.data
					.dispatch("core/block-editor")
					.insertBlocks(wp.blocks.parse(content));
			}
			if (action == "applyStyle") {
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

		var justifiedOptionsArgs = {
			speed: { label: "speed", value: 500 },
			backdropDuration: { label: "Backdrop Duration", value: 500 },
			controls: { label: "Controls", value: true },
			closeOnTap: { label: "Close On Tap", value: true },
			download: { label: "Download", value: true },
			enableDrag: { label: "Enable Drag", value: true },
			enableSwipe: { label: "Enable Swipe", value: true },
			escKey: { label: "Esc Key", value: true },
			getCaptionFromTitleOrAlt: {
				label: "Get Caption From Title Or Alt",
				value: true,
			},
			defaultCaptionHeight: { label: "Default Caption Height", value: 0 },
			keyPress: { label: "Key Press", value: true },
			slideDelay: { label: "Slide Delay", value: 200 },
		};

		var RemoveJustifiedArg = function ({ index }) {
			return (
				<span
					className="cursor-pointer inline-block hover:bg-red-500 hover:text-white px-1 py-1"
					onClick={(ev) => {
						var justifiedOptionsX = { ...justifiedOptions };
						delete justifiedOptionsX[index];

						setAttributes({ justifiedOptions: justifiedOptionsX });
					}}>
					<Icon icon={close} />
				</span>
			);
		};

		const ALLOWED_BLOCKS = ["post-grid/image"];

		const MY_TEMPLATE = [
			["post-grid/justified-wrap-item", {}],
			["post-grid/justified-wrap-item", {}],
			["post-grid/justified-wrap-item", {}],
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

		const addChild = () => {
			var childBlocks = wp.data.select(blockEditorStore).getBlocks(clientId);

			const slide = createBlock("post-grid/justified-wrap-item");
			const position = childBlocks.length;
			dispatch("core/block-editor").insertBlock(slide, position, clientId);

			wp.data.dispatch("core/block-editor").selectBlock(clientId);
			//setActiveTab(slide.clientId);
		};

		// const onInit = () => {
		console.log(justifiedOptions);
		// };

		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div
							className="bg-blue-600 mx-3 my-2 cursor-pointer hover:text-white font-bold text-[16px] px-5 py-2 block text-center text-white rounded"
							onClick={(ev) => {
								addChild();
							}}>
							Add Item
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

						<PanelBody
							className="font-medium text-slate-900 "
							title="Justified"
							initialOpen={false}>
							<PanelRow className="my-3">
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={"Choose"}
									options={justifiedOptionsArgs}
									onChange={(option, index) => {
										var justifiedOptionsX = { ...justifiedOptions };

										justifiedOptionsX[index] = option.value;

										setAttributes({
											justifiedOptions: justifiedOptionsX,
										});
									}}
									values=""></PGDropdown>
							</PanelRow>

							{Object.entries(justifiedOptions).map((item, index) => {
								var id = item[0];
								var value = item[1];
								return (
									<>
										{id == "speed" && (
											<PanelRow>
												<div className="flex items-center justify-between w-full mb-2">
													<div className="flex items-center  ">
														<RemoveJustifiedArg index={id} />
														<label
															for=""
															className="font-medium text-slate-900 ">
															Speed
														</label>
													</div>
													<InputControl
														type="number"
														value={justifiedOptions.speed}
														onChange={(newVal) => {
															setAttributes({
																justifiedOptions: {
																	...justifiedOptions,
																	speed: parseInt(newVal),
																},
															});
														}}
													/>
												</div>
											</PanelRow>
										)}
										{id == "backdropDuration" && (
											<PanelRow>
												<div className="flex items-center justify-between w-full mb-2">
													<div className="flex items-center  ">
														<RemoveJustifiedArg index={id} />
														<label
															for=""
															className="font-medium text-slate-900 ">
															Backdrop Duration
														</label>
													</div>

													<InputControl
														type="number"
														value={justifiedOptions.backdropDuration}
														onChange={(newVal) => {
															setAttributes({
																justifiedOptions: {
																	...justifiedOptions,
																	backdropDuration: parseInt(newVal),
																},
															});
														}}
													/>
												</div>
											</PanelRow>
										)}

										{id == "defaultCaptionHeight" && (
											<PanelRow>
												<div className="flex items-center justify-between w-full mb-2">
													<div className="flex items-center  ">
														<RemoveJustifiedArg index={id} />
														<label
															for=""
															className="font-medium text-slate-900 ">
															Default Caption Height
														</label>
													</div>

													<InputControl
														type="number"
														value={justifiedOptions.defaultCaptionHeight}
														onChange={(newVal) => {
															setAttributes({
																justifiedOptions: {
																	...justifiedOptions,
																	defaultCaptionHeight: parseInt(newVal),
																},
															});
														}}
													/>
												</div>
											</PanelRow>
										)}
										{id == "slideDelay" && (
											<PanelRow>
												<div className="flex items-center justify-between w-full mb-2">
													<div className="flex items-center  ">
														<RemoveJustifiedArg index={id} />
														<label
															for=""
															className="font-medium text-slate-900 ">
															Slide Delay
														</label>
													</div>

													<InputControl
														type="number"
														value={justifiedOptions.slideDelay}
														onChange={(newVal) => {
															setAttributes({
																justifiedOptions: {
																	...justifiedOptions,
																	slideDelay: parseInt(newVal),
																},
															});
														}}
													/>
												</div>
											</PanelRow>
										)}

										{id == "keyPress" && (
											<PanelRow>
												<div className="flex items-center mb-2 ">
													<RemoveJustifiedArg index={id} />

													<ToggleControl
														label="Key Press?"
														help={
															justifiedOptions.keyPress
																? "Key Press Enabled"
																: "Key Press Disabled"
														}
														checked={justifiedOptions.keyPress}
														onChange={(newVal) => {
															const options = {
																...justifiedOptions,
																keyPress: newVal,
															};
															setAttributes({
																justifiedOptions: options,
															});
														}}
													/>
												</div>
											</PanelRow>
										)}
										{id == "controls" && (
											<PanelRow>
												<div className="flex items-center mb-2 ">
													<RemoveJustifiedArg index={id} />

													<ToggleControl
														label="Controls?"
														help={
															justifiedOptions.controls
																? "Controls Enabled"
																: "Controls Disabled"
														}
														checked={justifiedOptions.controls}
														onChange={(newVal) => {
															const options = {
																...justifiedOptions,
																controls: newVal,
															};
															setAttributes({
																justifiedOptions: options,
															});
														}}
													/>
												</div>
											</PanelRow>
										)}
										{id == "closeOnTap" && (
											<PanelRow>
												<div className="flex items-center mb-2 ">
													<RemoveJustifiedArg index={id} />

													<ToggleControl
														label="Close On Tap?"
														help={
															justifiedOptions.closeOnTap
																? "Close On Tap Enabled"
																: "Close On Tap Disabled"
														}
														checked={justifiedOptions.closeOnTap}
														onChange={(newVal) => {
															const options = {
																...justifiedOptions,
																closeOnTap: newVal,
															};
															setAttributes({
																justifiedOptions: options,
															});
														}}
													/>
												</div>
											</PanelRow>
										)}
										{id == "download" && (
											<PanelRow>
												<div className="flex items-center mb-2 ">
													<RemoveJustifiedArg index={id} />

													<ToggleControl
														label="Download?"
														help={
															justifiedOptions.download
																? "Download Enabled"
																: "Download Disabled."
														}
														checked={justifiedOptions.download}
														onChange={(newVal) => {
															const updatedJustifiedOptions = {
																...justifiedOptions,
																download: newVal,
															};
															setAttributes({
																justifiedOptions: updatedJustifiedOptions,
															});
														}}
													/>
												</div>
											</PanelRow>
										)}
										{id == "enableDrag" && (
											<PanelRow>
												<div className="flex items-center mb-2 ">
													<RemoveJustifiedArg index={id} />

													<ToggleControl
														label="Enable Drag?"
														help={
															justifiedOptions.enableDrag
																? "Drag Enabled"
																: "Drag Disabled."
														}
														checked={justifiedOptions.enableDrag}
														onChange={(newVal) => {
															const updatedJustifiedOptions = {
																...justifiedOptions,
																enableDrag: newVal,
															};
															setAttributes({
																justifiedOptions: updatedJustifiedOptions,
															});
														}}
													/>
												</div>
											</PanelRow>
										)}
										{id == "enableSwipe" && (
											<PanelRow>
												<div className="flex items-center mb-2 ">
													<RemoveJustifiedArg index={id} />

													<ToggleControl
														label="Enable Swipe?"
														help={
															justifiedOptions.enableSwipe
																? "Swipe Enabled"
																: "Swipe Disabled."
														}
														checked={justifiedOptions.enableSwipe}
														onChange={(newVal) => {
															const updatedJustifiedOptions = {
																...justifiedOptions,
																enableSwipe: newVal,
															};
															setAttributes({
																justifiedOptions: updatedJustifiedOptions,
															});
														}}
													/>
												</div>
											</PanelRow>
										)}
										{id == "escKey" && (
											<PanelRow>
												<div className="flex items-center mb-2 ">
													<RemoveJustifiedArg index={id} />

													<ToggleControl
														label="Esc key?"
														help={
															justifiedOptions.escKey
																? "Esc Key Enabled"
																: "Esc Key Disabled."
														}
														checked={justifiedOptions.escKey}
														onChange={(newVal) => {
															const updatedJustifiedOptions = {
																...justifiedOptions,
																escKey: newVal,
															};
															setAttributes({
																justifiedOptions: updatedJustifiedOptions,
															});
														}}
													/>
												</div>
											</PanelRow>
										)}
										{id == "getCaptionFromTitleOrAlt" && (
											<PanelRow>
												<div className="flex items-center mb-2 ">
													<RemoveJustifiedArg index={id} />

													<ToggleControl
														label="Get Caption From Title Or Alt?"
														help={
															justifiedOptions.getCaptionFromTitleOrAlt
																? "Get Caption From Title Or Alt Enabled"
																: "Get Caption From Title Or Alt Disabled."
														}
														checked={justifiedOptions.getCaptionFromTitleOrAlt}
														onChange={(newVal) => {
															const updatedJustifiedOptions = {
																...justifiedOptions,
																getCaptionFromTitleOrAlt: newVal,
															};
															setAttributes({
																justifiedOptions: updatedJustifiedOptions,
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

						<PanelBody
							className="font-medium text-slate-900 "
							title="Item"
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
						<PanelBody
							className="font-medium text-slate-900 "
							title="Lightbox"
							initialOpen={false}>
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

						<PanelBody
							className="font-medium text-slate-900 "
							title="Block Variations"
							initialOpen={false}>
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
													// [
													// 	"post-grid/justified-image",
													// 	{
													// 		wrapper: {
													// 			options: {
													// 				tag: "a",
													// 				class: "pg-justified-wrap-item",
													// 				useAsBackground: "no",
													// 			},
													// 			styles: {},
													// 		},
													// 	},
													// ],
													// [
													// 	"post-grid/justified-image",
													// 	{
													// 		wrapper: {
													// 			options: {
													// 				tag: "a",
													// 				class: "pg-justified-wrap-item",
													// 				useAsBackground: "no",
													// 			},
													// 			styles: {},
													// 		},
													// 	},
													// ],
													// [
													// 	"post-grid/justified-image",
													// 	{
													// 		wrapper: {
													// 			options: {
													// 				tag: "a",
													// 				class: "pg-justified-wrap-item",
													// 				useAsBackground: "no",
													// 			},
													// 			styles: {},
													// 		},
													// 	},
													// ],
													// [
													// 	"post-grid/justified-image",
													// 	{
													// 		wrapper: {
													// 			options: {
													// 				tag: "a",
													// 				class: "pg-justified-wrap-item",
													// 				useAsBackground: "no",
													// 			},
													// 			styles: {},
													// 		},
													// 	},
													// ],
													// [
													// 	"post-grid/justified-image",
													// 	{
													// 		wrapper: {
													// 			options: {
													// 				tag: "a",
													// 				class: "pg-justified-wrap-item",
													// 				useAsBackground: "no",
													// 			},
													// 			styles: {},
													// 		},
													// 	},
													// ],
													// [
													// 	"post-grid/justified-image",
													// 	{
													// 		wrapper: {
													// 			options: {
													// 				tag: "a",
													// 				class: "pg-justified-wrap-item",
													// 				useAsBackground: "no",
													// 			},
													// 			styles: {},
													// 		},
													// 	},
													// ],
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
						<div {...innerBlocksProps}>
							<LightGallery
								speed={500}
								backdropDuration={500}
								controls={true}
								closeOnTap={false}
								download={true}
								height="100px"
								iframeHeight="100px"
								easing="ease"
								enableDrag={false}
								enableSwipe={true}
								escKey={false}
								getCaptionFromTitleOrAlt={true}
								defaultCaptionHeight={0}
								keyPress={true}
								slideDelay={200}
								plugins={[lgThumbnail, lgZoom]}>
								{/* {innerBlocksProps.children} */}
								<a
									className="aaa"
									href="https://images.pexels.com/photos/19049834/pexels-photo-19049834/free-photo-of-surface-of-a-sandstone-wall.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load">
									<img
										alt="img1"
										src="https://images.pexels.com/photos/19049834/pexels-photo-19049834/free-photo-of-surface-of-a-sandstone-wall.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
									/>
								</a>
								<a
									className="aaa"
									href="https://images.pexels.com/photos/18968224/pexels-photo-18968224/free-photo-of-light.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load">
									<img
										alt="img2"
										src="https://images.pexels.com/photos/18968224/pexels-photo-18968224/free-photo-of-light.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
									/>
								</a>
								<a
									className="aaa"
									href="https://images.pexels.com/photos/19042206/pexels-photo-19042206/free-photo-of-model-in-sombrero-and-in-traditional-clothing.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load">
									<img
										alt="img1"
										src="https://images.pexels.com/photos/19042206/pexels-photo-19042206/free-photo-of-model-in-sombrero-and-in-traditional-clothing.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
									/>
								</a>
								<a
									className="aaa"
									href="https://images.pexels.com/photos/18889183/pexels-photo-18889183/free-photo-of-portrait-of-a-hooded-man-standing-in-rain.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load">
									<img
										alt="img2"
										src="https://images.pexels.com/photos/18889183/pexels-photo-18889183/free-photo-of-portrait-of-a-hooded-man-standing-in-rain.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
									/>
								</a>
								<a
									className="aaa"
									href="https://images.pexels.com/photos/18885164/pexels-photo-18885164/free-photo-of-wedding-couple-in-a-park.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load">
									<img
										alt="img1"
										src="https://images.pexels.com/photos/18885164/pexels-photo-18885164/free-photo-of-wedding-couple-in-a-park.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
									/>
								</a>
								<a
									className="aaa"
									href="https://images.pexels.com/photos/13566084/pexels-photo-13566084.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load">
									<img
										alt="img2"
										src="https://images.pexels.com/photos/13566084/pexels-photo-13566084.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
									/>
								</a>
							</LightGallery>
						</div>
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
			className: ` ${blockId} ${wrapper.options.class}  `,
		});

		return <InnerBlocks.Content />;

		//return null;
	},
});

