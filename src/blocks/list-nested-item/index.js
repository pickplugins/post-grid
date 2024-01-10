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
	brush,
	mediaAndText,
} from "@wordpress/icons";

import PGIconPicker from "../../components/icon-picker";
import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import metadata from "./block.json";
import PGcssClassPicker from "../../components/css-class-picker";
import customTags from "../../custom-tags";
import PGCssLibrary from "../../components/css-library";

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
					d="M160 15.7134H57.2178V24.2285H160V15.7134Z"
					fill="url(#paint0_linear_67_1115)"
				/>
				<path
					d="M37.3753 6L15.5906 23.7577L6.24672 16.1839L0 21.2759L15.5906 33.9844L43.622 11.092L37.3753 6Z"
					fill="url(#paint1_linear_67_1115)"
				/>
				<path
					d="M159.948 100.869H57.1655V109.384H159.948V100.869Z"
					fill="#C15940"
				/>
				<path
					d="M160 141.215H57.2178V149.73H160V141.215Z"
					fill="url(#paint2_linear_67_1115)"
				/>
				<path
					d="M0 90.5991V119.611H35.5906V90.5991H0ZM8.29396 112.85V97.3599H27.4541V112.85H8.29396Z"
					fill="#C15940"
				/>
				<path
					d="M0 160H35.5906V130.946H0V160ZM27.5066 137.664V153.154H8.34646V137.664H27.5066Z"
					fill="url(#paint3_linear_67_1115)"
				/>
				<path
					d="M147.559 46.5645H89.5015V51.3569H147.559V46.5645Z"
					fill="url(#paint4_linear_67_1115)"
				/>
				<path
					d="M147.559 69.1577H89.5015V73.9502H147.559V69.1577Z"
					fill="url(#paint5_linear_67_1115)"
				/>
				<path
					d="M57.2178 40.7451V57.3047H77.3228V40.7451H57.2178ZM61.8897 53.3253V44.4678H72.6508V53.2397L61.8897 53.3253Z"
					fill="url(#paint6_linear_67_1115)"
				/>
				<path
					d="M57.1655 79.3884H77.2705V63H57.1655V79.3884ZM72.5986 66.8083V75.3662H62.0999V66.8083H72.5986Z"
					fill="url(#paint7_linear_67_1115)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_67_1115"
						x1="57.2178"
						y1="19.9709"
						x2="160"
						y2="19.9709"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_67_1115"
						x1="0"
						y1="19.9922"
						x2="43.6221"
						y2="19.9922"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_67_1115"
						x1="57.2178"
						y1="145.473"
						x2="160"
						y2="145.473"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_67_1115"
						x1="0"
						y1="145.473"
						x2="35.5905"
						y2="145.473"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_67_1115"
						x1="89.5015"
						y1="48.9607"
						x2="147.559"
						y2="48.9607"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_67_1115"
						x1="89.5015"
						y1="71.5539"
						x2="147.559"
						y2="71.5539"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint6_linear_67_1115"
						x1="57.2178"
						y1="49.0249"
						x2="77.3228"
						y2="49.0249"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint7_linear_67_1115"
						x1="57.1655"
						y1="71.1942"
						x2="77.2705"
						y2="71.1942"
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
		var icon = attributes.icon;

		var parentIcon =
			context["post-grid/icon"] == undefined ? [] : context["post-grid/icon"];

		var blockCssY = attributes.blockCssY;

		var postId = context["postId"];
		var postType = context["postType"];

		var breakPointX = myStore.getBreakPoint();

		const [isLoading, setisLoading] = useState(false);

		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
		const iconSelector = blockClass + " .icon";

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();

			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			setAttributes({ icon: parentIcon });
		}, [parentIcon]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[iconSelector] = icon;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
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

		function onChangeIcon(arg) {
			var options = {
				...icon.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({ icon: { ...icon, options: options } });
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

			var object = myStore.addPropertyDeep(obj, path, "");
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

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		const [iconHtml, setIconHtml] = useState("");

		useEffect(() => {
			var iconSrc = icon.options.iconSrc;

			var iconHtml = `<span className="${iconSrc}"></span>`;

			setIconHtml(iconHtml);
		}, [icon]);

		const MY_TEMPLATE = [["core/paragraph", { content: "Hello" }]];

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});

		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			__experimentalDirectInsert: true,
			templateInsertUpdatesSelection: true,
			template: MY_TEMPLATE,

			//renderAppender: InnerBlocks.ButtonBlockAppender
		});

		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
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
												{ label: "Li", value: "li" },
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
												// { label: "Left", value: "left" },
												{ label: "Before Text", value: "before" },
												{ label: "After Text", value: "after" },
												// { label: "Right", value: "right" },
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
					{icon.options.position == "before" && (
						<span
							className={icon.options.class}
							dangerouslySetInnerHTML={{ __html: iconHtml }}
						/>
					)}
					{innerBlocksProps.children}
					{icon.options.position == "after" && (
						<span
							className={icon.options.class}
							dangerouslySetInnerHTML={{ __html: iconHtml }}
						/>
					)}
				</li>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file

		var attributes = props.attributes;
		var wrapper = attributes.wrapper;
		var icon = attributes.icon;

		var blockId = attributes.blockId;

		const blockProps = useBlockProps.save({
			className: ` ${blockId} `,
		});
		return <InnerBlocks.Content />;
	},
});
