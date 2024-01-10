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
} from "@wordpress/components";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import apiFetch from "@wordpress/api-fetch";
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import {
	Icon,
	styles,
	settings,
	link,
	linkOff,
	brush,
	mediaAndText,
} from "@wordpress/icons";

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

import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";

import PGIconPicker from "../../components/icon-picker";

import PGLibraryBlockVariations from "../../components/library-block-variations";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import PGCssLibrary from "../../components/css-library";
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
					d="M160 11.9551H57.1855V22.4158H160V11.9551Z"
					fill="url(#paint0_linear_61_754)"
				/>
				<path
					d="M37.3599 0L15.5418 21.8182L6.27675 12.553L0 18.7298L15.5418 34.3711L43.6366 6.27651L37.3599 0Z"
					fill="url(#paint1_linear_61_754)"
				/>
				<path
					d="M160 61.0708H57.1855V71.5316H160V61.0708Z"
					fill="url(#paint2_linear_61_754)"
				/>
				<path
					d="M160 110.187H57.1855V120.647H160V110.187Z"
					fill="url(#paint3_linear_61_754)"
				/>
				<path
					d="M0 48.5181V84.0847H35.5668V48.5181H0ZM8.36852 75.8157V56.787H27.3972V75.8157H8.36852Z"
					fill="url(#paint4_linear_61_754)"
				/>
				<path
					d="M0 133.2H35.6665V97.5342H0V133.2ZM27.3972 105.903V124.931H8.36852V105.903H27.3972Z"
					fill="url(#paint5_linear_61_754)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_754"
						x1="57.1855"
						y1="17.1855"
						x2="160"
						y2="17.1855"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_754"
						x1="0"
						y1="17.1855"
						x2="43.6366"
						y2="17.1855"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_754"
						x1="57.1855"
						y1="66.3012"
						x2="160"
						y2="66.3012"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_754"
						x1="57.1855"
						y1="115.417"
						x2="160"
						y2="115.417"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_754"
						x1="0"
						y1="66.3014"
						x2="35.5668"
						y2="66.3014"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_61_754"
						x1="0"
						y1="115.367"
						x2="35.6665"
						y2="115.367"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
				</defs>
			</svg>
		),
	},
	deprecated: [
		{
			attributes: {
				items: {
					type: "array",
					default: [
						{
							text: "",
							icon: {
								library: "fontAwesome",
								srcType: "class",
								/*class, html, img, svg */ iconSrc: "fas fa-chevron-right",
							},
							styles: {},
						},
					],
				},
			},
		},
	],

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

		var itemsX = attributes.itemsX;
		var wrapper = attributes.wrapper;
		var item = attributes.item;
		var items = attributes.items;

		var icon = attributes.icon;

		var blockCssY = attributes.blockCssY;

		var postId = context["postId"];
		var postType = context["postType"];

		var breakPointX = myStore.getBreakPoint();

		const [isLoading, setisLoading] = useState(false);

		const [isOpen, setisOpen] = useState(false);

		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
		var itemSelector = blockClass + " .item";
		const iconSelector = blockClass + " .icon";

		const CustomTag = `${wrapper.options.tag}`;
		const CustomTagItem = `${item.options.tag}`;

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });

			myStore.generateBlockCss(blockCssY.items, blockId);

			if (items.length > 0) {
				if (itemsX.items.length == 0) {
					setAttributes({ itemsX: { ...itemsX, items: items } });
				}
			}
		}, [clientId]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[itemSelector] = item;
			blockCssObj[iconSelector] = icon;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		// for (var x in breakPoints) {

		//   var itemX = breakPoints[x];
		//   breakPointList.push({ label: itemX.name, icon: itemX.icon, value: itemX.id })

		// }

		const [iconHtml, setIconHtml] = useState("");

		useEffect(() => {
			var iconSrc = icon.options.iconSrc;
			var iconHtml = `<span className="${iconSrc}"></span>`;

			setIconHtml(iconHtml);
		}, [icon]);

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
				var itemsX = attributes.items;
				var itemsXX = attributes.itemsX;
				var itemX = attributes.item;
				var iconX = attributes.icon;
				var blockCssY = attributes.blockCssY;

				var blockCssObj = {};

				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[iconSelector] = iconY;
				}

				if (itemX != undefined) {
					var itemY = { ...itemX, options: item.options };
					setAttributes({ item: itemY });
					blockCssObj[itemSelector] = itemY;
				}

				if (itemsXX != undefined) {
					var itemsXY = { ...itemsXX, options: itemsX.options };
					setAttributes({ itemsX: itemsXY });
					blockCssObj[itemsXSelector] = itemsXY;
				}

				if (itemsX != undefined) {
					var itemsY = { ...itemsX, options: items.options };
					setAttributes({ items: itemsY });
					blockCssObj[itemsSelector] = itemsY;
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

		function onChangeIcon(arg) {
			var options = {
				...icon.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({ icon: { ...icon, options: options } });
		}

		function onPickCssLibraryWrapper(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				wrapper[sudoScource] = sudoScourceArgs;
			});

			var wrapperX = Object.assign({}, wrapper);
			setAttributes({ wrapper: wrapperX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					wrapperSelector
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

		function onPickCssLibraryItem(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				item[sudoScource] = sudoScourceArgs;
			});

			var itemX = Object.assign({}, item);
			setAttributes({ item: itemX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					itemSelector
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

		function onPickCssLibraryIcon(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				icon[sudoScource] = sudoScourceArgs;
			});

			var iconX = Object.assign({}, icon);
			setAttributes({ icon: iconX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					iconSelector
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

		function onChangeStyleIcon(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, icon);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ icon: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconSelector
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

		function onRemoveStyleIcon(sudoScource, key) {
			var object = myStore.deletePropertyDeep(icon, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ icon: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleIcon(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, icon);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ icon: object });
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

		function onBulkAddItems(sudoScource, cssObj) {
			let obj = Object.assign({}, items);
			obj[sudoScource] = cssObj;

			setAttributes({ items: obj });

			var selector = myStore.getElementSelector(sudoScource, itemsSelector);
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

		function onBulkAddIcon(sudoScource, cssObj) {
			let obj = Object.assign({}, icon);
			obj[sudoScource] = cssObj;

			setAttributes({ icon: obj });

			var selector = myStore.getElementSelector(sudoScource, iconSelector);
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

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});

		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div
							className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-800 text-white font-medium rounded hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700 mx-3"
							// className="bg-blue-500 p-2 mx-3 px-5 text-white my-4 text-center cursor-pointer"
							onClick={(ev) => {
								var itemsZ = { ...itemsX };
								var itemx = itemsZ.items.concat({
									text: "",
									icon: {
										library: "fontAwesome",
										srcType: "class",
										/*class, html, img, svg */ iconSrc: "fas fa-chevron-right",
									},
									styles: {},
								});
								setAttributes({ itemsX: { ...itemsX, items: itemx } });
							}}>
							Add List Item
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
									{
										name: "css",
										title: "CSS Library",
										icon: mediaAndText,
										className: "tab-css",
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

												{ label: "Ul", value: "ul" },
												{ label: "Ol", value: "ol" },
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
										onBulkAdd={onBulkAddWrapper}
										onRemove={onRemoveStyleWrapper}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={wrapper}
										onChange={onPickCssLibraryWrapper}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Items"
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
									{
										name: "css",
										title: "CSS Library",
										icon: mediaAndText,
										className: "tab-css",
									},
								]}>
								<PGtab name="options">
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Wrapper Tag
										</label>

										<SelectControl
											label=""
											value={item.options.tag}
											options={[
												{ label: "Choose", value: "" },

												{ label: "li", value: "li" },
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
												var options = { ...item.options, tag: newVal };
												setAttributes({ item: { ...item, options: options } });
											}}
										/>
									</PanelRow>

									{wrapper.options.tag == "ol" && (
										<>
											<ToggleControl
												label="Reversed?"
												help={
													item.options.reversed
														? "Counter reversed?"
														: "No reversed"
												}
												checked={item.options.reversed ? true : false}
												onChange={(e) => {
													var options = {
														...item.options,
														reversed: item.options.reversed ? false : true,
													};
													setAttributes({
														item: { ...item, options: options },
													});
												}}
											/>

											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Counter start with
												</label>

												<InputControl
													value={item.options.start}
													onChange={(newVal) => {
														var options = { ...item.options, start: newVal };
														setAttributes({
															item: { ...item, options: options },
														});
													}}
												/>
											</PanelRow>

											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Ordered list type?
												</label>

												<SelectControl
													label=""
													value={item.options.type}
													options={[
														{ label: "Choose", value: "" },
														{
															label: "Decimal numbers (1, 2, 3, 4)",
															value: "1",
														},
														{
															label: "Alphabetically ordered list",
															value: "a",
														},
														{
															label: "Alphabetically ordered list, uppercase",
															value: "A",
														},
														{
															label:
																"Roman numbers, lowercase (i, ii, iii, iv)",
															value: "i",
														},
														{
															label:
																"Roman numbers, uppercase (I, II, III, IV)",
															value: "I",
														},
													]}
													onChange={(newVal) => {
														var options = { ...item.options, type: newVal };
														setAttributes({
															item: { ...item, options: options },
														});
													}}
												/>
											</PanelRow>
										</>
									)}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={item}
										onChange={onChangeStyleItem}
										onAdd={onAddStyleItem}
										onBulkAdd={onBulkAddItems}
										onRemove={onRemoveStyleItem}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={item}
										onChange={onPickCssLibraryItem}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Icon"
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
									{
										name: "css",
										title: "CSS Library",
										icon: mediaAndText,
										className: "tab-css",
									},
								]}>
								<PGtab name="options">
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Choose Icon
										</label>
										<PGIconPicker
											library={icon.options.library}
											srcType={icon.options.srcType}
											iconSrc={icon.options.iconSrc}
											onChange={onChangeIcon}
										/>
									</PanelRow>

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Icon position
										</label>
										<SelectControl
											label=""
											value={icon.options.position}
											options={[
												{ label: "Choose...", value: "" },
												{ label: "Before Text", value: "before" },
												{ label: "After Text", value: "after" },
											]}
											onChange={(newVal) => {
												var options = { ...icon.options, position: newVal };
												setAttributes({ icon: { ...icon, options: options } });
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={icon}
										onChange={onChangeStyleIcon}
										onAdd={onAddStyleIcon}
										onBulkAdd={onBulkAddIcon}
										onRemove={onRemoveStyleIcon}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={icon}
										onChange={onPickCssLibraryIcon}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Block Variations"
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={"list"}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
							/>
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
							<PGTutorials slug="list" />
						</div>
					</div>
				</InspectorControls>

				<>
					{wrapper.options.tag && (
						<CustomTag
							{...blockProps}
							reversed={item.options.reversed ? "reversed" : ""}
							start={item.options.start}>
							{itemsX.items != undefined &&
								itemsX.items.map((itemX, i) => {
									return (
										<>
											<CustomTagItem
												className={` ${item.options.class}`}
												onClick={(ev) => {
													var ssdsd = itemsX.items.concat([]);

													// setAttributes({ items: { items: ssdsd } });
													setAttributes({
														itemsX: { ...itemsX, items: ssdsd },
													});
												}}>
												{icon.options.position == "before" && (
													<span
														className="icon"
														dangerouslySetInnerHTML={{ __html: iconHtml }}
													/>
												)}

												<RichText
													tagName="div"
													className="inline-block"
													value={itemX.text}
													allowedFormats={[
														"core/bold",
														"core/italic",
														"core/link",
													]}
													onSplit={(value, isAfterOriginal) => {
														createBlock("core/paragraph", { content: value });
													}}
													onChange={(content) => {
														var itemsZ = { ...itemsX };
														var item = { ...itemsZ.items[i], text: content };
														itemsZ.items[i] = item;

														setAttributes({
															itemsX: { ...itemsX, items: itemsZ.items },
														});
													}}
													placeholder={__("Start Writing...")}
												/>

												{icon.options.position == "after" && (
													<span
														className="icon"
														dangerouslySetInnerHTML={{ __html: iconHtml }}
													/>
												)}

												<span
													className="text-lg cursor-pointer px-2 text-red-500  py-1 float-right icon-close"
													onClick={(ev) => {
														itemsX.items.splice(i, 1);
														var ssdsd = itemsX.items.concat([]);

														//setAttributes({ items: { items: ssdsd } })
														setAttributes({
															itemsX: { ...itemsX, items: ssdsd },
														});
														ev.preventDefault();
													}}></span>
											</CustomTagItem>
										</>
									);
								})}
						</CustomTag>
					)}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file

		return null;
	},
});
