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
				<path d="M47.5917 48H0V64.2H47.5917V48Z" fill="#C15940" />
				<path
					d="M8.66189 54C8.76145 54 8.96097 54.1 9.06054 54.2L11.8481 57.5C12.0473 57.7 11.9476 58 11.7485 58.2C11.5494 58.4 11.251 58.3 11.0518 58.1L8.56271 55.2L6.0736 58.1C5.87447 58.3 5.57558 58.3 5.37645 58.2C5.17732 58.1 5.17722 57.7 5.27679 57.5L8.06489 54.2C8.36358 54.1 8.46276 54 8.66189 54Z"
					fill="white"
				/>
				<path d="M40.8216 54H15.4326V58.3H40.8216V54Z" fill="white" />
				<path
					d="M103.846 48H56.2539V64.2H103.846V48Z"
					fill="url(#paint0_linear_61_761)"
				/>
				<path
					d="M64.8167 58.3002C64.7172 58.3002 64.5177 58.2002 64.4181 58.1002L61.6305 54.8002C61.4314 54.6002 61.531 54.3002 61.7301 54.1002C61.9293 53.9002 62.2277 54.0002 62.4268 54.2002L64.9159 57.1002L67.405 54.2002C67.6042 54.0002 67.9031 54.0002 68.1022 54.1002C68.3013 54.3002 68.3014 54.6002 68.2018 54.8002L65.4137 58.1002C65.115 58.2002 64.9163 58.3002 64.8167 58.3002Z"
					fill="white"
				/>
				<path d="M96.9759 54H71.5869V58.3H96.9759V54Z" fill="white" />
				<path
					d="M160 48H112.408V64.2H160V48Z"
					fill="url(#paint1_linear_61_761)"
				/>
				<path
					d="M120.971 58.3002C120.871 58.3002 120.672 58.2002 120.573 58.1002L117.785 54.8002C117.586 54.6002 117.685 54.3002 117.884 54.1002C118.084 53.9002 118.382 54.0002 118.582 54.2002L121.071 57.1002L123.56 54.2002C123.759 54.0002 124.057 54.0002 124.256 54.1002C124.456 54.3002 124.456 54.6002 124.356 54.8002L121.569 58.1002C121.27 58.2002 121.17 58.3002 120.971 58.3002Z"
					fill="white"
				/>
				<path d="M153.13 54H127.741V58.3H153.13V54Z" fill="white" />
				<path
					d="M159 74H1V113H159V74Z"
					fill="#C15940"
					stroke="#8E240B"
					stroke-width="2"
					stroke-dasharray="6 6"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_761"
						x1="56.2539"
						y1="56.1"
						x2="103.846"
						y2="56.1"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_761"
						x1="112.408"
						y1="56.1"
						x2="160"
						y2="56.1"
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
		var activeTab =
			context["activeTab"] == undefined ? "" : context["activeTab"];

		var uid = attributes.uid;

		var blockId = attributes.blockId;

		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;

		var navItem = attributes.navItem;
		var panelWrap = attributes.panelWrap;

		var icon = attributes.icon;

		var blockCssY = attributes.blockCssY;
		let isProFeature = applyFilters("isProFeature", true);

		var breakPointX = myStore.getBreakPoint();

		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
		var panelWrapSelector = "." + blockId + "-pg-tabs-panel";
		var navItemSelector = "." + blockId + "-nav-item";
		var iconSelector = "." + blockId + "-nav-icon";

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });

			if (uid == null || uid.length == 0) {
				setAttributes({ uid: blockIdX });
			}

			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);

		useEffect(() => {
			var blockCssObj = {};
			// blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[panelWrapSelector] = panelWrap;
			blockCssObj[navItemSelector] = navItem;
			blockCssObj[iconSelector] = icon;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
			//setAttributes({ uid: clientId });
		}, [blockId]);

		function onChangeStyleNavItem(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, navItem);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ navItem: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				navItemSelector
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

		function onRemoveStyleNavItem(sudoScource, key) {
			var object = myStore.deletePropertyDeep(navItem, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ navItem: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				navItemSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleNavItem(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, navItem);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ navItem: object });
		}

		function onChangeStylePanelWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, panelWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ panelWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				panelWrapSelector
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

		function onRemoveStylePanelWrap(sudoScource, key) {
			var object = myStore.deletePropertyDeep(panelWrap, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ panelWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				panelWrapSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStylePanelWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, panelWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ panelWrap: object });
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

		function onPickCssLibraryNavItem(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				navItem[sudoScource] = sudoScourceArgs;
			});

			var navItemX = Object.assign({}, navItem);
			setAttributes({ navItem: navItemX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					navItemSelector
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

		function onPickCssLibraryPanelWrap(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				panelWrap[sudoScource] = sudoScourceArgs;
			});

			var panelWrapX = Object.assign({}, panelWrap);
			setAttributes({ panelWrap: panelWrapX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					panelWrapSelector
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

		const [iconHtml, setIconHtml] = useState("");

		useEffect(() => {
			var iconSrc = icon.options.iconSrc;

			var iconHtml = `<span className="${iconSrc}"></span>`;

			//console.log(iconHtml);

			setIconHtml(iconHtml);
		}, [icon]);

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		const blockProps = useBlockProps();

		// useEffect(() => {
		// 	if (!uid) {
		// 		setAttributes({ uid: clientId });
		// 	}
		// }, []);

		//const display = activeTab === uid ? "block" : "none";
		const display = activeTab === uid ? "block" : "none";

		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<PanelBody
							className="font-medium text-slate-900 "
							title="Nav Item"
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
									{/* <PGcssClassPicker
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
										<label for=""  className="font-medium text-slate-900 " >CSS ID</label>
										<InputControl
											value={blockId}
											onChange={(newVal) => {
												setAttributes({
													blockId: newVal,
												});
											}}
										/>
									</PanelRow> */}

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
										<label for="" className="font-medium text-slate-900 ">
											Wrapper Tag
										</label>

										<SelectControl
											label=""
											value={navItem.options.tag}
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
												var options = { ...navItem.options, tag: newVal };
												setAttributes({
													navItem: { ...navItem, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={navItem}
										onChange={onChangeStyleNavItem}
										onAdd={onAddStyleNavItem}
										onRemove={onRemoveStyleNavItem}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={navItem}
										onChange={onPickCssLibraryNavItem}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Content Wrap"
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
											value={panelWrap.options.tag}
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
												var options = { ...panelWrap.options, tag: newVal };
												setAttributes({
													panelWrap: { ...panelWrap, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={panelWrap}
										onChange={onChangeStylePanelWrap}
										onAdd={onAddStylePanelWrap}
										onRemove={onRemoveStylePanelWrap}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={panelWrap}
										onChange={onPickCssLibraryPanelWrap}
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
											onChange={(arg) => {
												var options = {
													...icon.options,
													srcType: arg.srcType,
													library: arg.library,
													iconSrc: arg.iconSrc,
												};
												setAttributes({ icon: { ...icon, options: options } });
											}}
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

												{ label: "Left", value: "left" },
												{ label: "Right", value: "right" },
												{ label: "Before", value: "before" },
												{ label: "After", value: "after" },
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

				<div
					{...useBlockProps({
						className: `pg-tabs-panel ${blockId}-pg-tabs-panel ${
							activeTab === uid ? "pg-tabs-panel-active" : ""
						}`,
						"data-tab-id": uid,
						style: { display },
					})}>
					<InnerBlocks
						renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
					/>
				</div>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file

		var attributes = props.attributes;

		//const blockProps = useBlockProps.save({});
		//const { children, ...innerBlocksProps } = useInnerBlocksProps.save(blockProps);

		return <InnerBlocks.Content />;

		//return null;
	},
});

