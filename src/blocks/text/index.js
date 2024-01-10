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
import PGDropdown from "../../components/dropdown";
import PGLibraryBlockVariations from "../../components/library-block-variations";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import PGCssLibrary from "../../components/css-library";

import { applyFilters } from "@wordpress/hooks";
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
				width="161"
				height="160"
				viewBox="0 0 161 160"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M160.294 62H85V71.4118H160.294V62Z"
					fill="url(#paint0_linear_61_930)"
				/>
				<path
					d="M160.294 80.8823H85.2939V89.8823H160.294V80.8823Z"
					fill="#C15940"
				/>
				<path
					d="M131.294 99.8823H85.2939V108.882H131.294V99.8823Z"
					fill="#C15940"
				/>
				<path
					d="M68.0095 79.9611C65.7484 79.9611 63.922 81.7874 63.922 84.0486V114.836H8.26203V59.1756H39.0491C41.3103 59.1756 43.1366 57.3492 43.1366 55.088C43.1366 52.8268 41.3103 51.0005 39.0491 51.0005H7.04456C3.13096 51.0005 0 54.1313 0 58.0449V116.14C0 120.054 3.13096 123.185 7.04456 123.185H65.1397C69.0533 123.185 72.1841 120.054 72.1841 116.14V84.1356C72.0971 81.7874 70.2707 79.9611 68.0095 79.9611Z"
					fill="url(#paint1_linear_61_930)"
				/>
				<path
					d="M73.8365 60.8279L62.1826 49.1741C60.6171 47.6086 58.0081 47.6086 56.3557 49.1741L21.4811 84.0485C20.6984 84.8313 20.2637 85.8749 20.2637 87.0055V98.6593C20.2637 100.921 22.09 102.747 24.3512 102.747H36.0051C37.1357 102.747 38.1792 102.312 38.8749 101.529L73.7495 66.6548C75.4019 65.0024 75.402 62.3934 73.8365 60.8279ZM56.3557 72.3947L34.3526 94.3978H28.5257V88.5709L50.5288 66.5678L56.3557 72.3947ZM65.0526 63.6978L62.1826 66.5678L56.3557 60.7409L59.2257 57.871L65.0526 63.6978Z"
					fill="url(#paint2_linear_61_930)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_930"
						x1="85"
						y1="66.7059"
						x2="160.294"
						y2="66.7059"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_930"
						x1="0"
						y1="87.0925"
						x2="72.1841"
						y2="87.0925"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_930"
						x1="20.2637"
						y1="75.3734"
						x2="74.9999"
						y2="75.3734"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
				</defs>
			</svg>
		),
	},
	transforms: {
		from: [
			{
				type: "block",
				blocks: ["core/paragraph", "core/code"],
				transform: (attributes, innerBlocks) => {
					var content = attributes.content;

					var atts = {
						text: {
							options: { content: content, tag: "div", class: "pg-text" },
						},
					};
					console.log(attributes);

					return createBlock("post-grid/text", atts);
				},
			},

			{
				type: "block",
				blocks: ["core/heading"],
				transform: (attributes) => {
					var content = attributes.content;
					var level = attributes.level;

					console.log(level);

					return createBlock("post-grid/text", {
						text: { options: { content: content, tag: "h" + level } },
					});
				},
			},
			{
				type: "block",
				blocks: ["core/quote"],
				transform: (attributes) => {
					var citation = attributes.citation;
					return createBlock("post-grid/text", {
						text: { options: { content: citation } },
					});
				},
			},
		],
		to: [
			{
				type: "block",
				blocks: ["core/paragraph"],
				transform: (attributes) => {
					var text = attributes.text;
					return createBlock("core/paragraph", {
						content: text.options.content
					});
				},
			},
			{
				type: "block",
				blocks: ["core/code"],
				transform: (attributes) => {
					var text = attributes.text;
					return createBlock("core/code", { content: text.options.content });
				},
			},

			{
				type: "block",
				blocks: ["core/heading"],
				transform: (attributes) => {
					var text = attributes.text;
					var tag = attributes.tag;

					return createBlock("core/heading", {
						content: text.options.content,
						level: "3",
					});
				},
			},
			{
				type: "block",
				blocks: ["core/quote"],
				transform: (attributes) => {
					var text = attributes.text;
					var tag = attributes.tag;


					return createBlock("core/quote", {
						value: text.options.content,
						citation: text.options.content,
					});
				},
			},
		],
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

		var text = attributes.text;

		var blockCssY = attributes.blockCssY;

		var breakPointX = myStore.getBreakPoint();

		const [isLoading, setisLoading] = useState(false);
		var [debounce, setDebounce] = useState(null); // Using the hook.

		const CustomTag = `${text.options.tag}`;

		// Wrapper CSS Class Selectors
		var textSelector = blockClass;

		var limitByArgsBasic = {
			none: { label: "Choose..", value: "" },
			word: { label: "Word", value: "word" },
			character: { label: "Character", value: "character", isPro: true },
		};

		let limitByArgs = applyFilters("limitByArgs", limitByArgsBasic);

		useEffect(() => {
			// if (blockId.length == 0) {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });

			myStore.generateBlockCss(blockCssY.items, blockId);
			// }
		}, [clientId]);

		// useEffect(() => {
		// 	//console.log('blockId', blockId);

		// 	myStore.generateBlockCss(blockCssY.items, blockId);
		// }, [blockId]);

		useEffect(() => {
			//console.log('blockCssY', blockCssY.items);

			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[textSelector] = text;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		function setLimitBy(option, index) {
			var options = { ...text.options, limitBy: option.value };
			setAttributes({ text: { ...text, options: options } });
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
				var textX = attributes.text;

				var blockCssY = attributes.blockCssY;

				var blockCssObj = {};

				if (textX != undefined) {
					var textY = { ...textX, options: text.options };
					setAttributes({ text: textY });
					blockCssObj[textSelector] = textY;
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

		function onPickCssLibraryText(args) {
			var textX = Object.assign({}, text);

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				textX[sudoScource] = sudoScourceArgs;
			});

			setAttributes({ text: textX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					textSelector
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

			var blockCssYX = { ...blockCssY };

			var items = { ...blockCssYX.items };

			var cssItems = Object.assign(items, styleObj);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onChangeStyleText(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			//let obj = Object.assign({}, text);
			let obj = { ...text };
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ text: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				textSelector
			);
			var cssPropty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			// if (blockCssY.items[elementSelector] == undefined) {
			//     blockCssY.items[elementSelector] = {};
			//   }

			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			//console.log('cssItems', cssItems);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleText(sudoScource, key) {
			//console.log('onRemoveStyleText');

			var object = myStore.deletePropertyDeep(text, [
				sudoScource,
				key,
				breakPointX,
			]);

			var isEmpty =
				Object.entries(object[sudoScource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoScource, key])
				: object;
			setAttributes({ text: objectX });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				textSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleText(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			//let objX = Object.assign({}, text);
			let obj = { ...text };

			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ text: object });
		}

		function onBulkAddText(sudoScource, cssObj) {
			let obj = Object.assign({}, text);
			obj[sudoScource] = cssObj;

			setAttributes({ text: obj });

			var selector = myStore.getElementSelector(sudoScource, textSelector);
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

		function onResetText(sudoScources) {
			let obj = Object.assign({}, text);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						textSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ text: obj });
		}

		const blockProps = useBlockProps({
			className: ` ${blockId} ${text.options.class}`,
		});

		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<PanelBody
							className="font-medium text-slate-900 "
							title="Text"
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
									{/* <PanelRow>
                    <label for=""  className="font-medium text-slate-900 " >Block Class</label>

                    <InputControl
                      value={blockId}
                      onChange={(newVal) => {

                        setAttributes({ blockId: newVal });

                      }}
                    />

                  </PanelRow> */}

									<PGcssClassPicker
										tags={customTags}
										label="CSS Class"
										placeholder="Add Class"
										value={text.options.class}
										onChange={(newVal) => {
											var options = { ...text.options, class: newVal };
											setAttributes({
												text: { ...text, options: options },
											});
										}}
									/>

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Block ID
										</label>
										<InputControl
											value={blockId}
											disabled={true}
											onChange={(newVal) => {
												setAttributes({
													blockId: newVal,
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											ID
										</label>
										<InputControl
											value={text.options.id}
											onChange={(newVal) => {
												var options = { ...text.options, id: newVal };
												setAttributes({
													text: { ...text, options: options },
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
											value={text.options.tag}
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
												var options = { ...text.options, tag: newVal };
												setAttributes({ text: { ...text, options: options } });
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Limit By
										</label>

										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={limitByArgs}
											buttonTitle={
												text.options.limitBy !== undefined &&
												text.options.limitBy.length > 0
													? text.options.limitBy
													: "Choose"
											}
											onChange={setLimitBy}
											values={[]}></PGDropdown>
									</PanelRow>

									{text.options.limitBy != null &&
										text.options.limitBy.length > 0 && (
											<div className="bg-gray-500 my-3 text-white p-2">
												{limitByArgs[text.options.limitBy].label}
											</div>
										)}

									{text.options.limitBy != null &&
										(text.options.limitBy == "word" ||
											text.options.limitBy == "character") && (
											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Limit Count
												</label>

												<InputControl
													value={
														text.options.limitCount == null
															? "99"
															: text.options.limitCount
													}
													onChange={(newVal) => {
														var options = {
															...text.options,
															limitCount: newVal,
														};
														setAttributes({
															text: { ...text, options: options },
														});
													}}
												/>
											</PanelRow>
										)}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={text}
										onChange={onChangeStyleText}
										onAdd={onAddStyleText}
										onRemove={onRemoveStyleText}
										onBulkAdd={onBulkAddText}
										onReset={onResetText}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={text}
										onChange={onPickCssLibraryText}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Block Variations"
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={"text"}
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
							<PGTutorials slug="text" />
						</div>
					</div>
				</InspectorControls>

				<RichText
					{...blockProps}
					tagName={CustomTag}
					// className="pg-text"
					value={text.options.content}
					allowedFormats={["core/bold", "core/italic", "core/link"]}
					onChange={(content) => {
						var options = { ...text.options, content: content };
						setAttributes({ text: { ...text, options: options } });
					}}
					placeholder={__("Start Writing...")}
				/>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
