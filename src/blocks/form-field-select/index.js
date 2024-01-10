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
	close,
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

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
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
				<rect
					x="1"
					y="56"
					width="158"
					height="21"
					fill="#C15940"
					stroke="#8E240B"
					stroke-width="2"
					stroke-dasharray="6 6"
				/>
				<rect
					x="1"
					y="87.0454"
					width="158"
					height="18.9091"
					rx="1"
					fill="url(#paint0_linear_61_882)"
					stroke="#86402F"
					stroke-width="2"
				/>
				<rect
					x="1"
					y="27.0454"
					width="158"
					height="18.9091"
					rx="1"
					fill="url(#paint1_linear_61_882)"
					stroke="#86402F"
					stroke-width="2"
				/>
				<path
					d="M108.718 90.6724C108.555 90.587 108.362 90.5651 108.174 90.6236L95.9704 94.2712C95.4243 94.4164 95.2685 95.1821 95.7142 95.5301L98.4785 97.8235L108.718 90.6724Z"
					fill="#F5F5F5"
				/>
				<path
					d="M109.052 91.0337C107.933 91.8185 98.8662 98.1457 98.8662 98.1457L102.799 101.408C103.139 101.702 103.707 101.592 103.907 101.193C103.907 101.193 109.026 91.6656 109.026 91.6656C109.133 91.4631 109.143 91.2337 109.052 91.0337Z"
					fill="#F5F5F5"
				/>
				<path
					d="M98.1806 98.2114C98.1586 98.2456 98.1489 98.2871 98.1489 98.3285V100.729C98.127 101.33 98.9101 101.696 99.3517 101.278C99.3517 101.278 100.594 100.21 100.594 100.21C100.35 100.013 98.1806 98.2114 98.1806 98.2114Z"
					fill="#F5F5F5"
				/>
				<rect
					x="50"
					y="94.2271"
					width="40.9091"
					height="4.54545"
					fill="#F5F5F5"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_882"
						x1="0"
						y1="96.4999"
						x2="160"
						y2="96.4999"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_882"
						x1="0"
						y1="36.4999"
						x2="160"
						y2="36.4999"
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

		var label = attributes.label;
		var select = attributes.select;
		var inputWrap = attributes.inputWrap;
		var errorWrap = attributes.errorWrap;
		var labelWrap = attributes.labelWrap;

		var blockCssY = attributes.blockCssY;

		var breakPointX = myStore.getBreakPoint();

		const [isLoading, setisLoading] = useState(false);

		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
		var labelSelector = blockClass + " label";
		var selectSelector = blockClass + " select";
		var labelWrapSelector = blockClass + " .label-wrap";
		var inputWrapSelector = blockClass + " .input-wrap";
		var errorWrapSelector = blockClass + " .error-wrap";

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();

			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[labelSelector] = label;
			blockCssObj[selectSelector] = select;
			blockCssObj[labelWrapSelector] = labelWrap;
			blockCssObj[inputWrapSelector] = inputWrap;
			blockCssObj[errorWrapSelector] = errorWrap;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
		}

		function RemoveArgs({ index, title }) {
			return (
				<>
					<span className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-1 rounded-sm">
						<Icon
							fill="#fff"
							icon={close}
							onClick={(ev) => {
								// var selectOptionsX = { ...selectOptions };
								// delete selectOptionsX[index];
								// setAttributes({ selectOptions: selectOptionsX });

								var optionsX = { ...select.options };
								delete optionsX["args"][index];
								setAttributes({ select: { ...select, options: optionsX } });
							}}
						/>
					</span>
					<span className="ml-2">{title}</span>
				</>
			);
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

		function onChangeStyleLabel(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, label);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ label: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelSelector
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

		function onRemoveStyleLabel(sudoScource, key) {
			var object = myStore.deletePropertyDeep(label, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ label: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleLabel(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, label);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ label: object });
		}

		function onBulkAddLabel(sudoScource, cssObj) {
			let obj = Object.assign({}, label);
			obj[sudoScource] = cssObj;

			setAttributes({ label: obj });

			var selector = myStore.getElementSelector(sudoScource, labelSelector);
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

		function onChangeStyleInput(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, select);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ select: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				selectSelector
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

		function onRemoveStyleInput(sudoScource, key) {
			var object = myStore.deletePropertyDeep(select, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ select: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				selectSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleInput(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, select);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ select: object });
		}

		function onBulkAddInput(sudoScource, cssObj) {
			let obj = Object.assign({}, select);
			obj[sudoScource] = cssObj;

			setAttributes({ select: obj });

			var selector = myStore.getElementSelector(sudoScource, selectSelector);
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

		function onChangeStyleLabelWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, labelWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ labelWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelWrapSelector
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

		function onRemoveStyleLabelWrap(sudoScource, key) {
			var object = myStore.deletePropertyDeep(labelWrap, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ labelWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelWrapSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleLabelWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, labelWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ labelWrap: object });
		}

		function onBulkAddLabelWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, labelWrap);
			obj[sudoScource] = cssObj;

			setAttributes({ labelWrap: obj });

			var selector = myStore.getElementSelector(sudoScource, labelWrapSelector);
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

		function onChangeStyleInputWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, inputWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ inputWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				inputWrapSelector
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

		function onRemoveStyleInputWrap(sudoScource, key) {
			var object = myStore.deletePropertyDeep(inputWrap, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ inputWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				inputWrapSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleInputWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, inputWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ inputWrap: object });
		}

		function onBulkAddInputWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, inputWrap);
			obj[sudoScource] = cssObj;

			setAttributes({ inputWrap: obj });

			var selector = myStore.getElementSelector(sudoScource, inputWrapSelector);
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

		function onChangeStyleErrorWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, errorWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ errorWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				errorWrapSelector
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

		function onRemoveStyleErrorWrap(sudoScource, key) {
			var object = myStore.deletePropertyDeep(errorWrap, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ errorWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				errorWrapSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleErrorWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, errorWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ errorWrap: object });
		}

		function onBulkAddErrorWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, errorWrap);
			obj[sudoScource] = cssObj;

			setAttributes({ errorWrap: obj });

			var selector = myStore.getElementSelector(sudoScource, errorWrapSelector);
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
					<div className="px-3 pg-setting-input-text" initialOpen={false}>
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
							title="Label"
							initialOpen={false}>
							<PanelBody
								className="font-medium text-slate-900 "
								title="Label Wrap"
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
											obj={labelWrap}
											onChange={onChangeStyleLabelWrap}
											onAdd={onAddStyleLabelWrap}
											onRemove={onRemoveStyleLabelWrap}
											onBulkAdd={onBulkAddLabelWrap}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>

							<PanelBody
								className="font-medium text-slate-900 "
								title="Label"
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
										<ToggleControl
											className="my-3"
											label="Enable?"
											help={
												label.options.enable
													? "Label Enabled"
													: "Label Disabled."
											}
											checked={label.options.enable ? true : false}
											onChange={(e) => {
												var options = {
													...label.options,
													enable: label.options.enable ? false : true,
												};
												setAttributes({
													label: { ...label, options: options },
												});
											}}
										/>

										<PanelRow className="mb-4">
											<label for="" className="font-medium text-slate-900 ">
												Label Text
											</label>
											<InputControl
												className="mr-2"
												value={label.options.text}
												onChange={(newVal) => {
													var options = { ...label.options, text: newVal };
													setAttributes({
														label: { ...label, options: options },
													});
												}}
											/>
										</PanelRow>
									</PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={label}
											onChange={onChangeStyleLabel}
											onAdd={onAddStyleLabel}
											onRemove={onRemoveStyleLabel}
											onBulkAdd={onBulkAddLabel}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>
						</PanelBody>
						<PanelBody
							className="font-medium text-slate-900 "
							title="Input"
							initialOpen={false}>
							<PanelBody
								className="font-medium text-slate-900 "
								title="Input Wrap"
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
											obj={inputWrap}
											onChange={onChangeStyleInputWrap}
											onAdd={onAddStyleInputWrap}
											onRemove={onRemoveStyleInputWrap}
											onBulkAdd={onBulkAddInputWrap}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>

							<PanelBody
								className="font-medium text-slate-900 "
								title="Select"
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
										<div
											className="bg-blue-500 cursor-pointer px-3 py-2 rounded-sm text-white inline-block my-3 mr-2"
											onClick={(ev) => {
												var options = { ...select.options };
												var args = options.args;
												var length = Object.entries(select.options.args).length;
												args[length] = { label: "Label", value: "value" };
												setAttributes({
													select: { ...select, options: options },
												});
											}}>
											Add Option
										</div>

										<div
											className="bg-blue-500 cursor-pointer px-3 py-2 rounded-sm text-white inline-block my-3"
											onClick={(ev) => {
												var options = { ...select.options };
												var args = options.args;
												var length = Object.entries(select.options.args).length;
												args[length] = { label: "Group Label", args: {} };
												setAttributes({
													select: { ...select, options: options },
												});
											}}>
											Add Option Group
										</div>

										<div>Data Sets</div>

										<div>
											{Object.entries(select.options.args).map((item) => {
												var index = item[0];
												var arg = item[1];

												var args = arg.args;

												if (args != undefined) {
													return (
														<PanelBody
															title={
																<RemoveArgs index={index} title={arg.label} />
															}
															initialOpen={false}>
															<div
																className="bg-blue-500 px-3 py-2 rounded-sm text-white inline-block my-3 mr-2"
																onClick={(ev) => {
																	// var selectOptionsX = { ...selectOptions };

																	// var length = Object.entries(selectOptionsX[index]['args']).length

																	// selectOptionsX[index]['args'][length] = { label: '', value: '' }
																	// setAttributes({ selectOptions: selectOptionsX });

																	var options = { ...select.options };
																	var args = options.args;

																	var length = Object.entries(
																		select.options.args[index].args
																	).length;
																	args[index]["args"][length] = {
																		label: "",
																		value: "",
																	};
																	setAttributes({
																		select: { ...select, options: options },
																	});
																}}>
																Add Option
															</div>

															<PanelRow className="mb-4">
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	Group Label
																</label>
																<InputControl
																	className="mr-2"
																	value={arg.label}
																	onChange={(newVal) => {
																		// var selectOptionsX = { ...selectOptions };
																		// selectOptionsX[index]['label'] = newVal
																		// setAttributes({ selectOptions: selectOptionsX });

																		var options = { ...select.options };
																		var args = options.args;
																		args[index]["label"] = newVal;
																		setAttributes({
																			select: { ...select, options: options },
																		});
																	}}
																/>
															</PanelRow>

															{Object.entries(args).map((x) => {
																var optionIndex = x[0];
																var optionData = x[1];

																return (
																	<div className="flex justify-between items-center my-3">
																		<InputControl
																			className="mr-2"
																			value={optionData.label}
																			placeholder="Option Label"
																			onChange={(newVal) => {
																				// var selectOptionsX = { ...selectOptions };
																				// selectOptionsX[index]['args'][optionIndex]['label'] = newVal

																				// setAttributes({ selectOptions: selectOptionsX });

																				var options = { ...select.options };
																				var args = options.args;
																				args[index]["args"][optionIndex].label =
																					newVal;
																				setAttributes({
																					select: {
																						...select,
																						options: options,
																					},
																				});
																			}}
																		/>
																		<InputControl
																			className="mr-2"
																			value={optionData.value}
																			placeholder="Option Value"
																			onChange={(newVal) => {
																				// var selectOptionsX = { ...selectOptions };
																				// selectOptionsX[index]['args'][optionIndex]['value'] = newVal

																				// setAttributes({ selectOptions: selectOptionsX });

																				var options = { ...select.options };
																				var args = options.args;
																				args[index]["args"][optionIndex].value =
																					newVal;
																				setAttributes({
																					select: {
																						...select,
																						options: options,
																					},
																				});
																			}}
																		/>

																		<span className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-1 py-1 rounded-sm">
																			<Icon
																				fill="#fff"
																				icon={close}
																				onClick={(ev) => {
																					// var selectOptionsX = { ...selectOptions };
																					// delete selectOptionsX[index];
																					// setAttributes({ selectOptions: selectOptionsX });

																					var options = { ...select.options };
																					var args = options.args;
																					delete args[index]["args"][
																						optionIndex
																					];
																					setAttributes({
																						select: {
																							...select,
																							options: options,
																						},
																					});
																				}}
																			/>
																		</span>
																	</div>
																);
															})}
														</PanelBody>
													);
												}

												return (
													<div className="flex justify-between items-center my-3">
														<RemoveArgs index={index} />
														<InputControl
															className="mr-2"
															value={arg.label}
															placeholder="Option Label"
															onChange={(newVal) => {
																// var selectOptionsX = { ...selectOptions };
																// selectOptionsX[index]['label'] = newVal

																// setAttributes({ selectOptions: selectOptionsX });

																var options = { ...select.options };
																var args = options.args;
																args[index].label = newVal;
																setAttributes({
																	select: { ...select, options: options },
																});
															}}
														/>
														<InputControl
															className="mr-2"
															placeholder="Option Value"
															value={arg.value}
															onChange={(newVal) => {
																// var selectOptionsX = { ...selectOptions };
																// selectOptionsX[index]['value'] = newVal

																// setAttributes({ selectOptions: selectOptionsX });

																var options = { ...select.options };
																var args = options.args;
																args[index].value = newVal;
																setAttributes({
																	select: { ...select, options: options },
																});
															}}
														/>
													</div>
												);
											})}
										</div>

										<PanelRow className="mb-4">
											<label for="" className="font-medium text-slate-900 ">
												Field Name
											</label>
											<InputControl
												className="mr-2"
												value={select.options.name}
												onChange={(newVal) => {
													var options = { ...select.options, name: newVal };
													setAttributes({
														select: { ...select, options: options },
													});
												}}
											/>
										</PanelRow>

										{typeof select.options.value == "object" && (
											<PanelRow className="mb-4">
												<label for="" className="font-medium text-slate-900 ">
													Field Value
												</label>
												<ul>
													{select.options.value != null &&
														Object.entries(select.options.value).map((x) => {
															var val = x[1];
															return <li>{val}</li>;
														})}
												</ul>
											</PanelRow>
										)}

										{typeof select.options.value == "string" && (
											<div>
												<PanelRow className="mb-4">
													<label for="" className="font-medium text-slate-900 ">
														Field Value
													</label>
													<InputControl
														className="mr-2"
														value={select.options.value}
														onChange={(newVal) => {
															var options = {
																...select.options,
																value: newVal,
															};
															setAttributes({
																select: { ...select, options: options },
															});
														}}
													/>
												</PanelRow>
											</div>
										)}

										<PanelRow className="mb-4">
											<label for="" className="font-medium text-slate-900 ">
												Placeholder
											</label>
											<InputControl
												className="mr-2"
												value={select.options.placeholder}
												onChange={(newVal) => {
													var options = {
														...select.options,
														placeholder: newVal,
													};
													setAttributes({
														select: { ...select, options: options },
													});
												}}
											/>
										</PanelRow>

										<ToggleControl
											className="my-3"
											label="Multiple?"
											help={
												select.options.multiple
													? "Multiple Enabled"
													: "Multiple Disabled."
											}
											checked={select.options.multiple ? true : false}
											onChange={(e) => {
												var options = {
													...select.options,
													multiple: select.options.multiple ? false : true,
												};
												setAttributes({
													select: { ...select, options: options },
												});
											}}
										/>

										<ToggleControl
											className="my-3"
											label="Readonly?"
											help={
												select.options.readonly
													? "Readonly Enabled"
													: "Readonly Disabled."
											}
											checked={select.options.readonly ? true : false}
											onChange={(e) => {
												var options = {
													...select.options,
													readonly: select.options.readonly ? false : true,
												};
												setAttributes({
													select: { ...select, options: options },
												});
											}}
										/>

										<ToggleControl
											className="my-3"
											label="Required?"
											help={
												select.options.required
													? "Required Enabled"
													: "Required Disabled."
											}
											checked={select.options.required ? true : false}
											onChange={(e) => {
												var options = {
													...select.options,
													required: select.options.required ? false : true,
												};
												setAttributes({
													select: { ...select, options: options },
												});
											}}
										/>

										<ToggleControl
											className="my-3"
											label="Disabled?"
											help={
												select.options.disabled
													? "Disabled Enabled"
													: "Disabled Disabled."
											}
											checked={select.options.disabled ? true : false}
											onChange={(e) => {
												var options = {
													...select.options,
													disabled: select.options.disabled ? false : true,
												};
												setAttributes({
													select: { ...select, options: options },
												});
											}}
										/>
									</PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={select}
											onChange={onChangeStyleInput}
											onAdd={onAddStyleInput}
											onRemove={onRemoveStyleInput}
											onBulkAdd={onBulkAddInput}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Error Wrap"
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
									<PanelRow className="mb-4">
										<label for="" className="font-medium text-slate-900 ">
											Error Text
										</label>
										<InputControl
											className="mr-2"
											value={errorWrap.options.text}
											onChange={(newVal) => {
												var options = { ...errorWrap.options, text: newVal };
												setAttributes({
													errorWrap: { ...errorWrap, options: options },
												});
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Position
										</label>

										<SelectControl
											label=""
											value={errorWrap.options.position}
											options={[
												{ label: "None", value: "" },

												{ label: "afterlabel", value: "afterlabel" },
												{ label: "afterInput", value: "afterInput" },
											]}
											onChange={(newVal) => {
												var options = {
													...errorWrap.options,
													position: newVal,
												};
												setAttributes({
													errorWrap: { ...errorWrap, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={errorWrap}
										onChange={onChangeStyleErrorWrap}
										onAdd={onAddStyleErrorWrap}
										onRemove={onRemoveStyleErrorWrap}
										onBulkAdd={onBulkAddErrorWrap}
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

				<div {...blockProps}>
					<div className="label-wrap">
						{label.options.enable && (
							<label for="" className="font-medium text-slate-900 ">
								{label.options.text}
							</label>
						)}
						{errorWrap.options.position == "afterlabel" && (
							<div className="error-wrap">{errorWrap.options.text}</div>
						)}
					</div>
					<div className="input-wrap">
						<select
							name={select.options.name}
							multiple={select.options.multiple}
							required={select.options.required}
							disabled={select.options.disabled}
							readonly={select.options.readonly}
							onChange={(ev) => {
								var newVal = ev.target.value;
								var multiple = select.options.multiple;

								if (multiple) {
									var oldVal = select.options.value;
									if (typeof select.options.value == "object") {
										var count = select.options.value.length;
										var valueX = select.options.value;
										valueX[count] = newVal;
									} else {
										valueX = [oldVal];
									}
									var options = { ...select.options, value: valueX };
								} else {
									var options = { ...select.options, value: newVal };
								}

								setAttributes({ select: { ...select, options: options } });
							}}>
							{Object.entries(select.options.args).map((item, index) => {
								var index = item[0];
								var arg = item[1];
								var args = arg.args;

								if (args != undefined) {
									return (
										<optgroup label={arg.label}>
											{Object.entries(args).map((x) => {
												var optionIndex = x[0];
												var optionData = x[1];
												return (
													<option value={optionData.value}>
														{optionData.label}
													</option>
												);
											})}
										</optgroup>
									);
								}

								if (args == undefined) {
									return <option value={arg.value}>{arg.label}</option>;
								}
							})}
						</select>
						{errorWrap.options.position == "afterInput" && (
							<div className="error-wrap">{errorWrap.options.text}</div>
						)}
					</div>
				</div>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file

		return null;
	},
});

