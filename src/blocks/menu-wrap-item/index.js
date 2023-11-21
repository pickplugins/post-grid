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
		var linkX = attributes.link;
		var icon = attributes.icon;
		var subMenuWrap = attributes.subMenuWrap;

		var blockCssY = attributes.blockCssY;

		var postId = context["postId"];
		var postType = context["postType"];

		var breakPointX = myStore.getBreakPoint();

		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
		var subMenuWrapSelector = blockClass + " .pg-sub-menu";
		const iconSelector = blockClass + " .pg-menu-icon";
		const linkSelector = blockClass + " .pg-menu-link";

		const [iconHtml, setIconHtml] = useState("");

		const [linkPickerMenu, setLinkPickerMenu] = useState(false);

		useEffect(() => {
			var iconSrc = icon.options.iconSrc;

			var iconHtml = `<span class="${iconSrc}"></span>`;

			setIconHtml(iconHtml);
		}, [icon]);

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();

			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[subMenuWrapSelector] = subMenuWrap;
			blockCssObj[iconSelector] = icon;
			blockCssObj[linkSelector] = linkX;

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

		function onChangeIcon(arg) {
			var options = {
				...icon.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({ icon: { ...icon, options: options } });
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

		//

		function onChangeStyleSubMenuWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, subMenuWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ subMenuWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				subMenuWrapSelector
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

		function onRemoveStyleSubMenuWrap(sudoScource, key) {
			var object = myStore.deletePropertyDeep(subMenuWrap, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ subMenuWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				subMenuWrapSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleSubMenuWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, subMenuWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ subMenuWrap: object });
		}

		function onBulkAddSubMenuWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, subMenuWrap);
			obj[sudoScource] = cssObj;

			setAttributes({ subMenuWrap: obj });

			var selector = myStore.getElementSelector(
				sudoScource,
				subMenuWrapSelector
			);
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

		// function onChangeStyleIcon(sudoScource, newVal, attr) {
		// 	var path = [sudoScource, attr, breakPointX];
		// 	let obj = Object.assign({}, icon);
		// 	const object = myStore.updatePropertyDeep(obj, path, newVal);

		// 	setAttributes({ icon: object });

		// 	var elementSelector = myStore.getElementSelector(
		// 		sudoScource,
		// 		iconSelector
		// 	);
		// 	var cssPropty = myStore.cssAttrParse(attr);

		// 	let itemsX = Object.assign({}, blockCssY.items);

		// 	if (itemsX[elementSelector] == undefined) {
		// 		itemsX[elementSelector] = {};
		// 	}

		// 	var cssPath = [elementSelector, cssPropty, breakPointX];
		// 	const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

		// 	setAttributes({ blockCssY: { items: cssItems } });
		// }

		// function onRemoveStyleIcon(sudoScource, key) {
		// 	var object = myStore.deletePropertyDeep(icon, [
		// 		sudoScource,
		// 		key,
		// 		breakPointX,
		// 	]);
		// 	setAttributes({ icon: object });

		// 	var elementSelector = myStore.getElementSelector(
		// 		sudoScource,
		// 		iconSelector
		// 	);
		// 	var cssPropty = myStore.cssAttrParse(key);
		// 	var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
		// 		elementSelector,
		// 		cssPropty,
		// 		breakPointX,
		// 	]);
		// 	setAttributes({ blockCssY: { items: cssObject } });
		// }

		// function onAddStyleIcon(sudoScource, key) {
		// 	var path = [sudoScource, key, breakPointX];
		// 	let obj = Object.assign({}, icon);
		// 	const object = myStore.addPropertyDeep(obj, path, "");
		// 	setAttributes({ icon: object });
		// }

		// function onBulkAddIcon(sudoScource, cssObj) {
		//
		// 	let obj = Object.assign({}, icon);
		// 	obj[sudoScource] = cssObj;

		// 	setAttributes({ icon: obj });

		// 	var selector = myStore.getElementSelector(sudoScource, iconSelector);
		// 	var stylesObj = {};

		// 	Object.entries(cssObj).map((args) => {
		// 		var attr = args[0];
		// 		var cssPropty = myStore.cssAttrParse(attr);

		// 		if (stylesObj[selector] == undefined) {
		// 			stylesObj[selector] = {};
		// 		}

		// 		if (stylesObj[selector][cssPropty] == undefined) {
		// 			stylesObj[selector][cssPropty] = {};
		// 		}

		// 		stylesObj[selector][cssPropty] = args[1];
		// 	});

		// 	var cssItems = { ...blockCssY.items };
		// 	var cssItemsX = { ...cssItems, ...stylesObj };

		// 	setAttributes({ blockCssY: { items: cssItemsX } });
		// }

		// function onPickCssLibraryIcon(args) {
		// 	Object.entries(args).map((x) => {
		// 		var sudoScource = x[0];
		// 		var sudoScourceArgs = x[1];
		// 		icon[sudoScource] = sudoScourceArgs;
		// 	});

		// 	var iconX = Object.assign({}, icon);
		// 	setAttributes({ icon: iconX });

		// 	var styleObj = {};

		// 	Object.entries(args).map((x) => {
		// 		var sudoScource = x[0];
		// 		var sudoScourceArgs = x[1];
		// 		var elementSelector = myStore.getElementSelector(
		// 			sudoScource,
		// 			iconSelector
		// 		);

		// 		var sudoObj = {};
		// 		Object.entries(sudoScourceArgs).map((y) => {
		// 			var cssPropty = y[0];
		// 			var cssProptyVal = y[1];
		// 			var cssProptyKey = myStore.cssAttrParse(cssPropty);
		// 			sudoObj[cssProptyKey] = cssProptyVal;
		// 		});

		// 		styleObj[elementSelector] = sudoObj;
		// 	});

		// 	var cssItems = Object.assign(blockCssY.items, styleObj);
		// 	setAttributes({ blockCssY: { items: cssItems } });
		// }

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		const MY_TEMPLATE = [
			//['core/paragraph', { placeholder: '', content: 'Hello Text...' }],
		];

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class} ${
				wrapper.options.isActive ? "active" : ""
			}`,
		});

		//const isParentOfSelectedBlock = useSelect((select) => select('core/block-editor').hasSelectedInnerBlock(clientId, true))

		const ALLOWED_BLOCKS = [
			"post-grid/menu-wrap-item",
			"post-grid/flex-wrap",
			"post-grid/grid-wrap",
			"post-grid/image",
			"post-grid/list-nested",
			"post-grid/layers",
			"core/paragraph",
		];

		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			allowedBlocks: ALLOWED_BLOCKS,
			template: MY_TEMPLATE,
			//orientation: 'horizontal',
			templateInsertUpdatesSelection: true,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		});

		return (
			<>
				<InspectorControls className="">
					<div className="pg-setting-input-text">
						<div className="p-3">
							<PanelRow className="mb-4">
								<label for="" className="font-medium text-slate-900 ">
									Menu Label
								</label>
								<InputControl
									className="mr-2"
									value={linkX.options.text}
									onChange={(newVal) => {
										var options = { ...linkX.options, text: newVal };
										setAttributes({ linkX: { ...linkX, options: options } });
									}}
								/>
							</PanelRow>

							<PanelRow className="mb-4">
								<label for="" className="font-medium text-slate-900  pg-font  ">
									Custom Url
								</label>

								<div className="relative">
									<Button
										className={linkPickerMenu ? "!bg-gray-400" : ""}
										icon={link}
										onClick={(ev) => {
											setLinkPickerMenu((prev) => !prev);
										}}></Button>
									{linkX.options.url.length > 0 && (
										<Button
											className="!text-red-500 ml-2"
											icon={linkOff}
											onClick={(ev) => {
												var options = {
													...linkX.options,
													url: "",
												};
												setAttributes({
													link: {
														...linkX,
														options: options,
													},
												});
												setLinkPickerMenu(false);
												console.log("first");
											}}></Button>
									)}
									{linkPickerMenu && (
										<Popover position="bottom right">
											<LinkControl
												settings={[]}
												value={linkX.options.url}
												onChange={(newVal) => {
													console.log(newVal);
													var options = {
														...linkX.options,
														url: newVal.url,
													};

													setAttributes({
														link: {
															...linkX,
															options: options,
														},
													});
												}}
											/>

											<div className="p-2">
												<span className="font-bold">Linked to:</span>{" "}
												{linkX.options.url.length != 0
													? linkX.options.url
													: "No link"}{" "}
											</div>
										</Popover>
									)}
								</div>
							</PanelRow>

							{/* <PanelRow className="mb-4">
								<label for="" className="font-medium text-slate-900 ">
									Menu URL
								</label>
								<InputControl
									className="mr-2"
									value={linkX.options.url}
									onChange={(newVal) => {
										var options = { ...linkX.options, url: newVal };
										setAttributes({ link: { ...link, options: options } });
									}}
								/>
							</PanelRow> */}

							<ToggleControl
								label="Menu Active?"
								help={
									wrapper.options.isActive ? "Menu Active" : "Menu Inactive."
								}
								checked={wrapper.options.isActive ? true : false}
								onChange={(e) => {
									var options = {
										...wrapper.options,
										isActive: wrapper.options.isActive ? false : true,
									};
									setAttributes({ wrapper: { ...wrapper, options: options } });
								}}
							/>
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
												{ label: "Choose Position", value: "" },

												{ label: "Before Label", value: "beforeLabel" },
												{ label: "After Label", value: "afterLabel" },
												// { label: "Before Prefix", value: "beforePrefix" },
												// { label: "After Prefix", value: "afterPrefix" },
												// { label: "Before Postfix", value: "beforePostfix" },
												// { label: "After Postfix", value: "afterPostfix" },
												{ label: "Before Link", value: "beforeLink" },
												{ label: "After Link", value: "afterLink" },
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
										onRemove={onRemoveStyleIcon}
										onBulkAdd={onBulkAddIcon}
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
							title="Sub MenuWrap"
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
										obj={subMenuWrap}
										onChange={onChangeStyleSubMenuWrap}
										onAdd={onAddStyleSubMenuWrap}
										onRemove={onRemoveStyleSubMenuWrap}
										onBulkAdd={onBulkAddSubMenuWrap}
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

				<li {...innerBlocksProps}>
					{linkX.options.text.length > 0 && (
						<>
							{icon.options.position == "beforeLink" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}
							<a className={linkX.options.class} href={linkX.options.url}>
								{icon.options.position == "beforeLabel" && (
									<span
										className={icon.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
								)}
								{linkX.options.text}
								{icon.options.position == "afterLabel" && (
									<span
										className={icon.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
								)}
							</a>
							{icon.options.position == "afterLink" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}
						</>
					)}
					<ul className={subMenuWrap.options.class}>
						{innerBlocksProps.children}
					</ul>
				</li>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file

		var attributes = props.attributes;
		var wrapper = attributes.wrapper;

		var blockId = attributes.blockId;

		const blockProps = useBlockProps.save({
			className: ` ${blockId} ${wrapper.options.class}`,
		});

		return <InnerBlocks.Content />;
	},
});

