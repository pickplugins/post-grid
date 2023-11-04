import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import {
	PanelBody,
	RangeControl,
	Button,
	Panel,
	PanelRow,
	SelectControl,
	Spinner,
	ToggleControl,
} from "@wordpress/components";

import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	RichText,
	__experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import { __experimentalInputControl as InputControl } from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";
import {
	createElement,
	memo,
	useMemo,
	useState,
	useEffect,
} from "@wordpress/element";
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { Icon, styles, settings, close } from "@wordpress/icons";
import { ReactSortable } from "react-sortablejs";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import PGCssLibrary from "../../components/css-library";
import PGDropdown from "../../components/dropdown";
import metadata from "./block.json";
import PGLibraryBlockVariations from "../../components/library-block-variations";
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
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
				<path
					fill="#1d4ed8"
					d="M17.53,16.56a1.07,1.07,0,0,0-1.06,1.06v7.93H2.12V11.2h7.93a1.06,1.06,0,0,0,0-2.12H1.81A1.81,1.81,0,0,0,0,10.89v15a1.81,1.81,0,0,0,1.81,1.81h15a1.81,1.81,0,0,0,1.81-1.81V17.62A1.06,1.06,0,0,0,17.53,16.56Z"
				/>
				<path
					fill="#1d4ed8"
					d="M19,11.63l-3-3a1.07,1.07,0,0,0-1.5,0l-9,9a1.06,1.06,0,0,0-.31.75v3A1.07,1.07,0,0,0,6.3,22.43h3a1.06,1.06,0,0,0,.75-.31l9-9A1.07,1.07,0,0,0,19,11.63Zm-4.5,3L8.86,20.31H7.36v-1.5L13,13.14Zm2.25-2.25-.75.75-1.49-1.49.75-.75Z"
				/>
				<circle fill="#1d4ed8" cx="24.85" cy="25.36" r="2.31" />
				<circle fill="#1d4ed8" cx="33.69" cy="25.36" r="2.31" />
			</svg>
		),
	},

	edit: function (props) {
		var attributes = props.attributes;
		var setAttributes = props.setAttributes;
		var clientId = props.clientId;

		var blockId = attributes.blockId;
		var blockCssY = attributes.blockCssY;

		var object = attributes.object;
		var wrapper = attributes.wrapper;
		var item = attributes.item;
		var thumb = attributes.thumb;
		var elements = attributes.elements;

		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;

		const wrapperSelector = blockClass;
		const itemSelector = blockClass + " .item";
		const thumbSelector = blockClass + " .thumb";

		const CustomTagWrapper =
			wrapper.options.tag == undefined ? "ul" : `${wrapper.options.tag}`;
		const CustomTagItem =
			item.options.tag.length == undefined ? "li" : `${item.options.tag}`;

		var [loading, seloading] = useState(false); // Using the hook.
		var [debounce, setDebounce] = useState(null); // Using the hook.

		var [objectData, seobjectData] = useState(null); // Using the hook.

		var breakPointX = myStore.getBreakPoint();

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();

			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[itemSelector] = item;
			blockCssObj[thumbSelector] = thumb;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});

		var pluginFields = {
			name: { id: "name", label: "Plugin Name", prefix: "Plugin Name: " },
			version: { id: "version", label: "Version", prefix: "Version:" },
			author: { id: "author", label: "Author", prefix: "Author" },
			author_profile: {
				id: "author_profile",
				label: "Author Profile",
				prefix: "Author Profile",
			},
			contributors: {
				id: "contributors",
				label: "Contributors",
				prefix: "Contributors",
				isLinked: true,
			},
			requires: {
				id: "requires",
				label: "Require WP Version",
				prefix: "WP Version: ",
			},
			tested: {
				id: "tested",
				label: "Tested WP Version",
				prefix: "WP Tested Version: ",
			},
			requires_php: {
				id: "requires_php",
				label: "Require PHP Version",
				prefix: "PHP Version: ",
			},
			requires_plugins: {
				id: "requires_plugins",
				label: "Require Plugins",
				prefix: "Require Plugins: ",
			},
			rating: { id: "rating", label: "Rating", prefix: "Rating", type: "star" },
			ratings: {
				id: "ratings",
				label: "Ratings",
				prefix: "Ratings",
				type: "star",
			},
			num_ratings: {
				id: "num_ratings",
				label: "Num Ratings",
				prefix: "Num Ratings",
				type: "star",
			},
			support_threads: {
				id: "support_threads",
				label: "Support Threads",
				prefix: "Support Threads",
			},
			support_threads_resolved: {
				id: "support_threads_resolved",
				label: "Support Threads Resolved",
				prefix: "Support Threads Resolved",
			},
			active_installs: {
				id: "active_installs",
				label: "Active Install",
				prefix: "Active Install: ",
			},
			last_updated: {
				id: "last_updated",
				label: "Last Update",
				prefix: "Last Update: ",
			},
			added: { id: "added", label: "Creation Time", prefix: "Creation Time: " },
			homepage: {
				id: "homepage",
				label: "Homepage",
				prefix: "Homepage:",
				isLinked: true,
				linkText: "Homepage",
			},
			download_link: {
				id: "download_link",
				label: "Download Link",
				prefix: "Download Link",
				isLinked: true,
				linkText: "Download",
			},
			tags: { id: "tags", label: "Tags", prefix: "Tags:" },

			banners: {
				id: "banners",
				label: "Thumbnail",
				prefix: "Thumbnail",
				size: "high",
				isLinked: false,
			},
		};

		var themeFields = {
			name: { id: "name", label: "Name", prefix: "Theme Name: " },
			version: { id: "version", label: "Version", prefix: "Version:" },
			preview_url: {
				id: "preview_url",
				label: "Preview URL",
				prefix: "Preview URL",
				isLinked: true,
				linkText: "Preview",
			},
			author: { id: "author", label: "Author", prefix: "Author" },
			screenshot_url: { id: "screenshot_url", label: "Screenshot" },
			ratings: { id: "ratings", label: "Ratings", prefix: "Ratings" },

			rating: { id: "rating", label: "Rating", prefix: "Rating", type: "star" },
			num_ratings: { id: "num_ratings", label: "Number of Ratings" },
			reviews_url: {
				id: "reviews_url",
				label: "Reviews URL",
				isLinked: true,
				linkText: "Reviews",
			},
			last_updated: {
				id: "last_updated",
				label: "Last Update",
				prefix: "Last Update: ",
			},
			creation_time: {
				id: "creation_time",
				label: "Creation Time",
				prefix: "Creation Time: ",
			},
			homepage: {
				id: "homepage",
				label: "Homepage",
				prefix: "Homepage:",
				isLinked: true,
				linkText: "Homepage",
			},
			tags: { id: "tags", label: "Tags", prefix: "Tags: " },
			download_link: {
				id: "download_link",
				label: "Download Link",
				prefix: "Download Link",
				isLinked: true,
				linkText: "Download",
			},

			requires: {
				id: "requires",
				label: "Require WP Version",
				prefix: "WP Version: ",
			},
			requires_php: {
				id: "requires_php",
				label: "Require PHP Version",
				prefix: "PHP Version: ",
			},
			is_commercial: {
				id: "is_commercial",
				label: "Is Commercial",
				prefix: "Is Commercial",
			},
			external_support_url: {
				id: "external_support_url",
				label: "External Support URL",
				prefix: "External Support URL",
				isLinked: true,
				linkText: "Support URL",
			},
			external_repository_url: {
				id: "external_repository_url",
				label: "External Sepository URL",
				prefix: "External Sepository URL",
				isLinked: true,
				linkText: "Repository",
			},
		};

		var allFields = { ...pluginFields, ...themeFields };

		var objectTypes = {
			plugin: { label: "Plugins", value: "plugin" },
			theme: { label: "Themes", value: "theme" },
		};

		function onPickBlockPatterns(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;

			var blocks = content.length > 0 ? parse(content) : "";
			console.log(content);
			console.log(blocks);
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
				var elementsX = attributes.elements;
				var itemX = attributes.item;
				var thumbX = attributes.thumb;
				var objectX = attributes.object;
				var blockCssYX = attributes.blockCssY;

				var blockCssObj = {};

				if (objectX != undefined) {
					var objectY = { ...objectX, options: object.options };
					setAttributes({ object: objectY });
					blockCssObj[objectSelector] = objectY;
				}

				if (thumbX != undefined) {
					var thumbY = { ...thumbX, options: thumb.options };
					setAttributes({ thumb: thumbY });
					blockCssObj[thumbSelector] = thumbY;
				}

				if (itemX != undefined) {
					var itemY = { ...itemX, options: item.options };
					setAttributes({ item: itemY });
					blockCssObj[itemSelector] = itemY;
				}

				if (elementsX != undefined) {
					var elementsY = { ...elementsX, options: elements.options };
					setAttributes({ elements: elementsY });
					blockCssObj[elementsSelector] = elementsY;
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

		var RemoveQueryPram = function ({ title, index }) {
			return (
				<>
					<span className="cursor-move">{title}</span>
				</>
			);
		};

		function setUserField(option, index) {
			//var isExist = elements.items.find(x => x.label === option.label);

			//if (isExist == undefined) {

			//}

			var elementsX = elements.items.push(option);
			setAttributes({ elements: { items: elements.items } });
		}

		useEffect(() => {
			seloading(true);
			var postData = { slug: object.options.slug, type: object.options.type };

			clearTimeout(debounce);
			debounce = setTimeout(() => {
				apiFetch({
					path: "/post-grid/v2/wordpress_org_data",
					method: "POST",
					data: postData,
				}).then((res) => {
					seloading(false);

					if (res.data == undefined) {
					} else {
						//var data = JSON.parse(res.data);

						//console.log('data', data);
						seobjectData(res.data);
					}
				});
			}, 2000);
		}, [object.options.slug]);

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

			var object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ wrapper: object });
		}

		function onResetWrapper(sudoScources) {
			let obj = Object.assign({}, wrapper);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						wrapperSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ wrapper: obj });
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

		function onChangeStyleThumb(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, thumb);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ thumb: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				thumbSelector
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

		function onRemoveStyleThumb(sudoScource, key) {
			var object = myStore.deletePropertyDeep(thumb, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ thumb: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				thumbSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleThumb(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, thumb);

			var object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ thumb: object });
		}

		function onResetThumb(sudoScources) {
			let obj = Object.assign({}, thumb);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						thumbSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ thumb: obj });
		}

		function onBulkAddThumb(sudoScource, cssObj) {
			// var path = [sudoScource, attr, breakPointX]
			let obj = Object.assign({}, thumb);
			obj[sudoScource] = cssObj;

			setAttributes({ thumb: obj });

			var selector = myStore.getElementSelector(sudoScource, thumbSelector);
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

			var object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ item: object });
		}

		function onResetItem(sudoScources) {
			let obj = Object.assign({}, item);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						itemSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ item: obj });
		}

		function onBulkAddItem(sudoScource, cssObj) {
			// var path = [sudoScource, attr, breakPointX]
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

		return (
			<>
				<InspectorControls>
					<div className="">
						<div className="px-3">
							<PanelRow>
								<label for="">Object Type</label>
								<PGDropdown
									position="bottom right"
									variant="secondary"
									options={objectTypes}
									buttonTitle={
										objectTypes[object.options.type] == undefined
											? "Choose"
											: objectTypes[object.options.type].label
									}
									onChange={(option) => {
										var options = { ...object.options, type: option.value };
										setAttributes({
											object: { styles: object.styles, options: options },
										});
									}}
									values=""></PGDropdown>
							</PanelRow>

							<PanelRow>
								<label for="">Slug</label>

								<InputControl
									value={object.options.slug}
									onChange={(newVal) => {
										var options = { ...object.options, slug: newVal };
										setAttributes({ object: { ...object, options: options } });
									}}
								/>
							</PanelRow>

							<div className="my-3">
								{object.options.type == "plugin" && (
									<>
										<PanelRow>
											<label for="">Add Fields</label>
											<PGDropdown
												position="bottom right"
												variant="secondary"
												options={pluginFields}
												buttonTitle="Choose"
												onChange={setUserField}
												values=""></PGDropdown>
										</PanelRow>
									</>
								)}

								{object.options.type == "theme" && (
									<>
										<PanelRow>
											<label for="">Add Fields</label>
											<PGDropdown
												position="bottom right"
												variant="secondary"
												options={themeFields}
												buttonTitle="Choose"
												onChange={setUserField}
												values=""></PGDropdown>
										</PanelRow>
									</>
								)}
							</div>
						</div>

						<ReactSortable
							list={elements.items}
							setList={(item) => {
								setAttributes({ elements: { items: item } });
							}}>
							{elements.items.map((item, index) => (
								<div key={item.id} className="">
									<PanelBody
										title={
											<RemoveQueryPram
												title={
													allFields[item.id] == undefined
														? ""
														: allFields[item.id].label
												}
												index={index}
											/>
										}
										initialOpen={false}>
										<Button
											onClick={(ev) => {
												ev.preventDefault();
												ev.stopPropagation();
												var elementsX = elements.items.splice(index, 1);
												setAttributes({ elements: { items: elements.items } });
											}}>
											<Icon icon={close} />
										</Button>

										<PanelRow>
											<label for="">Prefix</label>
											<InputControl
												value={item.prefix}
												onChange={(newVal) => {
													elements.items[index].prefix = newVal;
													setAttributes({
														elements: { items: elements.items },
													});
												}}
											/>
										</PanelRow>

										{(item.id == "homepage" ||
											item.id == "download_link" ||
											item.id == "preview_url" ||
											item.id == "contributors") && (
											<>
												<PanelRow>
													<label for="">linkText</label>
													<InputControl
														value={item.linkText}
														onChange={(newVal) => {
															elements.items[index].linkText = newVal;
															setAttributes({
																elements: { items: elements.items },
															});
														}}
													/>
												</PanelRow>

												<ToggleControl
													className="my-3"
													label="Is Linked?"
													help={
														elements.items[index].isLinked
															? "Link Enabled"
															: "Link Disabled"
													}
													checked={
														elements.items[index].isLinked ? true : false
													}
													onChange={(e) => {
														elements.items[index].isLinked = elements.items[
															index
														].isLinked
															? false
															: true;
														setAttributes({
															elements: { items: elements.items },
														});
													}}
												/>
											</>
										)}
									</PanelBody>
								</div>
							))}
						</ReactSortable>
					</div>

					<PanelBody title="Wrapper" initialOpen={false}>
						<PGtabs
							activeTab="styles"
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
								{
									name: "css",
									title: "CSS Library",
									icon: styles,
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
											{ label: "ul", value: "ul" },
											{ label: "ol", value: "ol" },
										]}
										onChange={(newVal) => {
											var options = { ...wrapper.options, tag: newVal };
											setAttributes({
												wrapper: { styles: wrapper.styles, options: options },
											});
										}}
									/>
								</PanelRow>
							</PGtab>
							<PGtab name="styles">
								<PGStyles
									blockId={blockId}
									obj={wrapper}
									onChange={onChangeStyleWrapper}
									onAdd={onAddStyleWrapper}
									onRemove={onRemoveStyleWrapper}
									onBulkAdd={onBulkAddWrapper}
									onReset={onResetWrapper}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>

					<PanelBody title="Thumb" initialOpen={false}>
						<PGtabs
							activeTab="styles"
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
									blockId={blockId}
									obj={thumb}
									onChange={onChangeStyleThumb}
									onAdd={onAddStyleThumb}
									onRemove={onRemoveStyleThumb}
									onBulkAdd={onBulkAddThumb}
									onReset={onResetThumb}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>

					<PanelBody title="item" initialOpen={false}>
						<PGtabs
							activeTab="styles"
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
								<PanelRow>
									<label for="">item Tag</label>
									<SelectControl
										label=""
										value={item.options.tag}
										options={[
											{ label: "No item", value: "" },
											{ label: "H1", value: "h1" },
											{ label: "H2", value: "h2" },
											{ label: "H3", value: "h3" },
											{ label: "H4", value: "h4" },
											{ label: "H5", value: "h5" },
											{ label: "H6", value: "h6" },
											{ label: "SPAN", value: "span" },
											{ label: "DIV", value: "div" },
											{ label: "P", value: "p" },
											{ label: "ul", value: "ul" },
											{ label: "li", value: "li" },
										]}
										onChange={(newVal) => {
											var options = { ...item.options, tag: newVal };
											setAttributes({
												item: { styles: item.styles, options: options },
											});
										}}
									/>
								</PanelRow>
							</PGtab>
							<PGtab name="styles">
								<PGStyles
									blockId={blockId}
									obj={item}
									onChange={onChangeStyleItem}
									onAdd={onAddStyleItem}
									onRemove={onRemoveStyleItem}
									onBulkAdd={onBulkAddItem}
									onReset={onResetItem}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					<PanelBody title="Block Variations" initialOpen={false}>
						<PGLibraryBlockVariations
							blockName={"wordpress-org"}
							blockId={blockId}
							clientId={clientId}
							onChange={onPickBlockPatterns}
						/>
					</PanelBody>
				</InspectorControls>

				{loading && (
					<div {...blockProps}>
						<Spinner />
					</div>
				)}

				{loading == false &&
					objectData != null &&
					object.options.type == "plugin" && (
						<CustomTagWrapper {...blockProps}>
							{elements.items.map((x) => {
								return (
									<>
										{x.id == "name" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.name}</span>{" "}
											</CustomTagItem>
										)}

										{x.id == "version" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.version}</span>{" "}
											</CustomTagItem>
										)}

										{x.id == "author" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.author}</span>{" "}
											</CustomTagItem>
										)}

										{x.id == "author_profile" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.author_profile}</span>{" "}
											</CustomTagItem>
										)}

										{x.id == "contributors" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>
													<ul>
														{objectData.contributors != null &&
															Object.entries(objectData.contributors).map(
																(x, i) => {
																	var data = x[1];

																	return (
																		<li>
																			<a href={data.profile}>
																				{data.display_name}
																			</a>
																		</li>
																	);
																}
															)}
													</ul>
												</span>
											</CustomTagItem>
										)}

										{x.id == "tested" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.tested}</span>{" "}
											</CustomTagItem>
										)}

										{x.id == "requires" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.requires}</span>{" "}
											</CustomTagItem>
										)}
										{x.id == "requires_php" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.requires_php}</span>{" "}
											</CustomTagItem>
										)}

										{x.id == "requires_plugins" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.requires_plugins}</span>{" "}
											</CustomTagItem>
										)}

										{x.id == "rating" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.rating}</span>{" "}
											</CustomTagItem>
										)}

										{x.id == "ratings" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>
													{Object.entries(objectData.ratings).map((x, i) => {
														return (
															<li>
																{x[0]}: {x[1]}
															</li>
														);
													})}
												</span>
											</CustomTagItem>
										)}

										{x.id == "num_ratings" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.num_ratings}</span>{" "}
											</CustomTagItem>
										)}
										{x.id == "support_threads" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.support_threads}</span>{" "}
											</CustomTagItem>
										)}

										{x.id == "support_threads_resolved" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.support_threads_resolved}</span>{" "}
											</CustomTagItem>
										)}
										{x.id == "active_installs" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.active_installs}</span>{" "}
											</CustomTagItem>
										)}
										{x.id == "last_updated" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.last_updated}</span>{" "}
											</CustomTagItem>
										)}
										{x.id == "added" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.added}</span>{" "}
											</CustomTagItem>
										)}

										{x.id == "homepage" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>
													{x.isLinked && (
														<a href={objectData.homepage}>{x.linkText}</a>
													)}
													{!x.isLinked && <>{objectData.homepage}</>}
												</span>
											</CustomTagItem>
										)}
										{x.id == "download_link" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>
													{x.isLinked && (
														<a href={objectData.download_link}>{x.linkText}</a>
													)}

													{!x.isLinked && <>{objectData.download_link}</>}
												</span>
											</CustomTagItem>
										)}

										{x.id == "banners" && (
											<CustomTagItem className={thumb.options.class}>
												<img
													src={
														objectData.banners == undefined
															? ""
															: objectData.banners.high
													}
													alt={objectData.name}
												/>
											</CustomTagItem>
										)}

										{x.id == "tags" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>
													{Object.entries(objectData.tags).map((x, i) => {
														return <li> {x[1]}</li>;
													})}
												</span>
											</CustomTagItem>
										)}
									</>
								);
							})}
						</CustomTagWrapper>
					)}

				{loading == false &&
					objectData != null &&
					object.options.type == "theme" && (
						<CustomTagWrapper {...blockProps}>
							{elements.items.map((x) => {
								return (
									<>
										{x.id == "name" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix} {objectData.name}
											</CustomTagItem>
										)}
										{x.id == "version" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix} {objectData.version}
											</CustomTagItem>
										)}

										{x.id == "is_commercial" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix}
												{objectData.is_commercial && "Yes"}
												{!objectData.is_commercial && "No"}
											</CustomTagItem>
										)}

										{x.id == "preview_url" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix}
												{x.isLinked && (
													<a href={objectData.preview_url}>{x.linkText}</a>
												)}
												{!x.isLinked && <>{objectData.preview_url}</>}
											</CustomTagItem>
										)}

										{x.id == "author" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix} {objectData.author}
											</CustomTagItem>
										)}

										{x.id == "screenshot_url" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix}
												{x.isLinked && (
													<a href={objectData.screenshot_url}>
														<img
															src={
																objectData.screenshot_url == undefined
																	? ""
																	: objectData.screenshot_url
															}
															alt={objectData.name}
														/>
													</a>
												)}
												{!x.isLinked && (
													<img
														src={
															objectData.screenshot_url == undefined
																? ""
																: objectData.screenshot_url
														}
														alt={objectData.name}
													/>
												)}
											</CustomTagItem>
										)}

										{x.id == "ratings" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix}{" "}
												{Object.entries(objectData.ratings).map((x, i) => {
													return (
														<li>
															{i + 1} : {x}
														</li>
													);
												})}
											</CustomTagItem>
										)}
										{x.id == "rating" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix} {objectData.rating}
											</CustomTagItem>
										)}

										{x.id == "num_ratings" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix} {objectData.num_ratings}
											</CustomTagItem>
										)}

										{x.id == "reviews_url" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix}
												{x.isLinked && (
													<a href={objectData.reviews_url}>{x.linkText}</a>
												)}
												{!x.isLinked && <>{objectData.reviews_url}</>}
											</CustomTagItem>
										)}

										{x.id == "last_updated" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix} {objectData.last_updated}
											</CustomTagItem>
										)}

										{x.id == "creation_time" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix} {objectData.creation_time}
											</CustomTagItem>
										)}

										{x.id == "homepage" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix}
												{x.isLinked && (
													<a href={objectData.homepage}>{x.linkText}</a>
												)}
												{!x.isLinked && <>{objectData.homepage}</>}
											</CustomTagItem>
										)}

										{x.id == "tags" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix}{" "}
												{Object.entries(objectData.tags).map((x, i) => {
													return <li> {x[1]}</li>;
												})}
											</CustomTagItem>
										)}

										{x.id == "download_link" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix}
												{x.isLinked && (
													<a href={objectData.download_link}>{x.linkText}</a>
												)}
												{!x.isLinked && <>{objectData.download_link}</>}
											</CustomTagItem>
										)}

										{x.id == "requires" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix} {objectData.requires}
											</CustomTagItem>
										)}
										{x.id == "requires_php" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix} {objectData.requires_php}
											</CustomTagItem>
										)}

										{x.id == "is_commercial" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix} {objectData.is_commercial}
											</CustomTagItem>
										)}

										{x.id == "external_support_url" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix}
												{x.isLinked && (
													<a href={objectData.external_support_url}>
														{x.linkText}
													</a>
												)}
												{!x.isLinked && <>{objectData.external_support_url}</>}
											</CustomTagItem>
										)}

										{x.id == "external_repository_url" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix}
												{x.isLinked && (
													<a href={objectData.external_repository_url}>
														{x.linkText}
													</a>
												)}
												{!x.isLinked && (
													<>{objectData.external_repository_url}</>
												)}
											</CustomTagItem>
										)}
									</>
								);
							})}
						</CustomTagWrapper>
					)}
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
