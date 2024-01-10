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
	Placeholder,
} from "@wordpress/components";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import apiFetch from "@wordpress/api-fetch";

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
	link,
	linkOff,
	more,
	brush,
	mediaAndText,
} from "@wordpress/icons";

import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";

import PGStyles from "../../components/styles";
import PGIconPicker from "../../components/icon-picker";
import PGCssLibrary from "../../components/css-library";
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
			<svg
				width="160"
				height="160"
				viewBox="0 0 160 160"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M28.9122 58H2.22402C1.63417 58 1.06848 58.2343 0.6514 58.6514C0.234316 59.0685 0 59.6342 0 60.224V82.4642C0 83.054 0.234316 83.6197 0.6514 84.0368C1.06848 84.4539 1.63417 84.6882 2.22402 84.6882H28.9122C29.5021 84.6882 30.0678 84.4539 30.4848 84.0368C30.9019 83.6197 31.1362 83.054 31.1362 82.4642V60.224C31.1362 59.6342 30.9019 59.0685 30.4848 58.6514C30.0678 58.2343 29.5021 58 28.9122 58ZM26.6882 80.2402H4.44803V62.448H26.6882V80.2402Z"
					fill="url(#paint0_linear_67_1013)"
				/>
				<path
					d="M75.617 64.6719H40.0327V69.1199H75.617V64.6719Z"
					fill="url(#paint1_linear_67_1013)"
				/>
				<path
					d="M66.7209 73.5679H40.0327V78.0159H66.7209V73.5679Z"
					fill="url(#paint2_linear_67_1013)"
				/>
				<path
					d="M113.296 58H86.6073C86.0175 58 85.4518 58.2343 85.0347 58.6514C84.6176 59.0685 84.3833 59.6342 84.3833 60.224V82.4642C84.3833 83.054 84.6176 83.6197 85.0347 84.0368C85.4518 84.4539 86.0175 84.6882 86.6073 84.6882H113.296C113.885 84.6882 114.451 84.4539 114.868 84.0368C115.285 83.6197 115.52 83.054 115.52 82.4642V60.224C115.52 59.6342 115.285 59.0685 114.868 58.6514C114.451 58.2343 113.885 58 113.296 58ZM111.072 80.2402H88.8313V62.448H111.072V80.2402Z"
					fill="#C15940"
				/>
				<path d="M160 64.6719H124.416V69.1199H160V64.6719Z" fill="#C15940" />
				<path
					d="M151.104 73.5679H124.416V78.0159H151.104V73.5679Z"
					fill="#C15940"
				/>
				<circle cx="80" cy="98.6885" r="4" fill="#C15940" />
				<circle cx="98" cy="98.6885" r="4" fill="url(#paint3_linear_67_1013)" />
				<circle cx="62" cy="98.6885" r="4" fill="url(#paint4_linear_67_1013)" />
				<defs>
					<linearGradient
						id="paint0_linear_67_1013"
						x1="0"
						y1="71.3441"
						x2="31.1362"
						y2="71.3441"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_67_1013"
						x1="40.0327"
						y1="66.8959"
						x2="75.617"
						y2="66.8959"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_67_1013"
						x1="40.0327"
						y1="75.7919"
						x2="66.7209"
						y2="75.7919"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_67_1013"
						x1="94"
						y1="98.6885"
						x2="102"
						y2="98.6885"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_67_1013"
						x1="58"
						y1="98.6885"
						x2="66"
						y2="98.6885"
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

		var blockCssY = attributes.blockCssY;

		var postId = context["postId"];
		var postType = context["postType"];

		var breakPointX = myStore.getBreakPoint();

		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();

			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = { ...blockCssY.items, ...blockCssRules };
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		function generateElementSudoCss(obj) {
			var stylesObj = {};

			Object.entries(obj).map((args) => {
				var sudoSrc = args[0];
				var sudoArgs = args[1];

				if (sudoSrc != "options") {
					var selector = myStore.getElementSelector(sudoSrc, wrapperSelector);

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
			});

			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };

			setAttributes({ blockCssY: { items: cssItemsX } });
		}

		useEffect(() => {
			var elementCss = generateElementSudoCss(wrapper);
		}, [wrapper]);

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

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		const MY_TEMPLATE = [
			//['core/paragraph', { placeholder: '', content: 'Hello Text...' }],
		];

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class} splide__slide border border-dashed`,
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
					<div className="pg-setting-input-text">
						{/* <PanelBody className="font-medium text-slate-900 " title="Flex Options" initialOpen={true}>


            </PanelBody> */}

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

				<div {...innerBlocksProps}>{innerBlocksProps.children}</div>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file

		var attributes = props.attributes;
		var wrapper = attributes.wrapper;

		var blockId = attributes.blockId;

		const blockProps = useBlockProps.save({
			className: ` ${blockId} pg-content-slider-item`,
		});
		const { children, ...innerBlocksProps } =
			useInnerBlocksProps.save(blockProps);

		return <>{children}</>;
	},
});

