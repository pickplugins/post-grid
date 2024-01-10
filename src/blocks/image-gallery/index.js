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
import { applyFilters } from "@wordpress/hooks";

import {
	Icon,
	styles,
	settings,
	link,
	linkOff,
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
import PGTutorials from "../../components/tutorials";
import PGBlockVariationsPicker from "../../components/block-variations-picker";

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
					d="M70.1668 11H5C2.23858 11 0 13.2386 0 16V143.964C0 146.725 2.23858 148.964 5.00001 148.964H70.1669C72.9283 148.964 75.1669 146.725 75.1669 143.964V16C75.1669 13.2386 72.9283 11 70.1668 11Z"
					fill="url(#paint0_linear_61_834)"
				/>
				<path
					d="M43.6824 60.8843L28.2163 83.0653L22.0944 74.2757L4.78711 99.1258H70.3337L43.6824 60.8843Z"
					fill="#C15940"
				/>
				<path
					d="M160 70.104V16C160 13.2386 157.761 11 155 11L89.8331 11C87.0717 11 84.8331 13.2386 84.8331 16V70.104C84.8331 72.8655 87.0717 75.104 89.8332 75.104H155C157.761 75.104 160 72.8655 160 70.104Z"
					fill="url(#paint1_linear_61_834)"
				/>
				<path
					d="M127.779 26.4624L114.292 45.7442L108.999 38.1051L93.9473 59.6419H150.932L127.779 26.4624Z"
					fill="#C15940"
				/>
				<path
					d="M160 143.964V89.8599C160 87.0984 157.761 84.8599 155 84.8599H89.8332C87.0717 84.8599 84.8332 87.0984 84.8332 89.8599V143.964C84.8332 146.725 87.0717 148.964 89.8332 148.964H155C157.761 148.964 160 146.725 160 143.964Z"
					fill="url(#paint2_linear_61_834)"
				/>
				<path
					d="M127.779 100.322L114.292 119.604L108.999 111.965L93.9473 133.548H150.932L127.779 100.322Z"
					fill="#C15940"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_834"
						x1="0"
						y1="79.982"
						x2="75.1669"
						y2="79.982"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_834"
						x1="122.417"
						y1="11"
						x2="122.417"
						y2="75.104"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_834"
						x1="122.417"
						y1="84.8599"
						x2="122.417"
						y2="148.964"
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
		var lightbox = attributes.lightbox;
		var item = attributes.item;

		const lightboxEnable =
			lightbox.options.enable == undefined ? true : lightbox.options.enable;

		var blockCssY = attributes.blockCssY;

		var breakPointX = myStore.getBreakPoint();
		let isProFeature = applyFilters("isProFeature", true);

		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;

		var itemSelector = blockClass + " .pg-image-gallery-item";

		const { replaceInnerBlocks } = useDispatch(blockEditorStore);

		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });

			myStore.generateBlockCss(blockCssY.items, blockId);
			setAttributes({ blockCssY: { items: blockCssY.items } });
		}, [clientId]);

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		function onPickBlockVariation(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;

			var blocks = content.length > 0 ? parse(content) : "";

			const attributes = blocks[0].attrs;

			wp.data
				.dispatch("core/block-editor")
				.replaceBlock(clientId, wp.blocks.parse(content));
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
				var lightboxX = attributes.lightbox;
				var blockCssYX = attributes.blockCssY;

				var blockCssObj = {};

				if (lightboxX != undefined) {
					var lightboxY = { ...lightboxX, options: lightbox.options };
					setAttributes({ lightbox: lightboxY });
					blockCssObj[lightboxSelector] = lightboxY;
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

		const ALLOWED_BLOCKS = ["post-grid/image-gallery-item"];

		const MY_TEMPLATE = [
			["post-grid/image-gallery-item", {}],
			["post-grid/image-gallery-item", {}],
			["post-grid/image-gallery-item", {}],
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

			const slide = createBlock("post-grid/image-gallery-item");
			const position = childBlocks.length;
			dispatch("core/block-editor").insertBlock(slide, position, clientId);

			wp.data.dispatch("core/block-editor").selectBlock(clientId);
			//setActiveTab(slide.clientId);
		};

		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div
							className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-800 text-white font-medium rounded hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700 mx-3"
							// className="bg-blue-600 mx-3 my-2 cursor-pointer hover:text-white font-bold text-[16px] px-5 py-2 block text-center text-white rounded"
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
								blockName={"image-gallery"}
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
						<div className="px-3">
							<PGTutorials slug="image-gallery" />
						</div>
					</div>
				</InspectorControls>

				<>
					{!hasInnerBlocks && (
						<div {...innerBlocksProps} className="flex justify-center my-4">
							<div className="border border-solid border-gray-300 w-[95%] rounded-md p-5">
								<div className="flex justify-between mb-5">
									<div className="text-xl rounded-sm">
										Click to pick a variation
									</div>

									<div
										className="pg-bg-color rounded-sm px-4 py-1 font-semibold text-lg text-white cursor-pointer"
										onClick={(ev) => {
											var wrapperX = {
												...wrapper,
												styles: {
													gridTemplateColumns: { Desktop: "1fr 1fr" },
													gap: { Desktop: "1em" },
													display: { Desktop: "grid" },
												},
											};
											setAttributes({ wrapper: wrapperX });

											var elementCss = myStore.generateElementCss(
												wrapperX,
												wrapperSelector
											);

											var itemsX = { ...blockCssY.items, ...elementCss };
											setAttributes({ blockCssY: { items: itemsX } });

											myStore.generateBlockCss(blockCssY.items, blockId);

											replaceInnerBlocks(
												clientId,
												createBlocksFromInnerBlocksTemplate([
													[
														"post-grid/image-gallery-item",
														{
															wrapper: {
																options: {
																	tag: "div",
																	class: "pg-image-gallery-item",
																},
																styles: {},
															},
														},
													],
													[
														"post-grid/image-gallery-item",
														{
															wrapper: {
																options: {
																	tag: "div",
																	class: "pg-image-gallery-item",
																},
																styles: {},
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
									<PGBlockVariationsPicker
										blockName={"image-gallery"}
										blockId={blockId}
										clientId={clientId}
										onChange={onPickBlockVariation}
									/>
									{/* {variations.map((variation) => {
										return (
											// <div
											// 	className="text-center inline-block m-4 w-32 align-top p-4 bg-gray-400 cursor-pointer hover:bg-gray-500 relative"
											// 	onClick={(ev) => {
											// 		if (variation.isPro && isProFeature) {
											// 			alert(
											// 				"Sorry this variation only vailable in pro version"
											// 			);
											// 			return false;
											// 		}

											// 		var wrapperX = {
											// 			...wrapper,
											// 			styles: variation.wrapObj.styles,
											// 		};
											// 		setAttributes({ wrapper: wrapperX });

											// 		var elementCss = myStore.generateElementCss(
											// 			wrapperX,
											// 			wrapperSelector
											// 		);

											// 		var itemsX = { ...blockCssY.items, ...elementCss };
											// 		setAttributes({ blockCssY: { items: itemsX } });

											// 		myStore.generateBlockCss(blockCssY.items, blockId);

											// 		replaceInnerBlocks(
											// 			clientId,
											// 			createBlocksFromInnerBlocksTemplate(
											// 				variation.innerBlocks
											// 			),
											// 			true
											// 		);
											// 	}}>
											// 	<div>{variation.icon}</div>
											// 	<div>{variation.title}</div>

											// 	{variation.isPro && (
											// 		<span className="bg-amber-400 rounded-sm text-sm inline-block  bg-opacity-90 text-white hover:text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
											// 			<a
											// 				target="_blank"
											// 				className="block px-3"
											// 				href={
											// 					"https://pickplugins.com/post-grid/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=" +
											// 					variation.label
											// 				}>
											// 				Pro
											// 			</a>
											// 		</span>
											// 	)}
											// </div>
											
										);
									})} */}
								</div>
							</div>

							{/* <BlockVariationPicker
                icon="smiley"
                label={__('Choose variation')}
                instructions={__('Select a variation to start with.')}
                onSelect={(variation) => {

                  var wrapperX = { ...wrapper, styles: variation.wrapObj.styles };
                  setAttributes({ wrapper: wrapperX });


                  var elementCss = myStore.generateElementCss(wrapperX, wrapperSelector);

                  var itemsX = { ...blockCssY.items, ...elementCss }
                  setAttributes({ blockCssY: { items: itemsX } });

                  myStore.generateBlockCss(blockCssY.items, blockId);


                  replaceInnerBlocks(
                    clientId,
                    createBlocksFromInnerBlocksTemplate(variation.innerBlocks),
                    true
                  );
                }}
                variations={variations}
              /> */}
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

		return <InnerBlocks.Content />;

		//return null;
	},
});
