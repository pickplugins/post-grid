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
import { store as coreStore } from "@wordpress/core-data";
import {
	BlockContextProvider,
	__experimentalUseBlockPreview as useBlockPreview,
} from "@wordpress/block-editor";
import {
	Icon,
	styles,
	settings,
	link,
	linkOff,
	close,
	pencil,
	cloud,
	brush,
	mediaAndText,
} from "@wordpress/icons";
import { __experimentalBlockVariationPicker as BlockVariationPicker } from "@wordpress/block-editor";
const { parse } = wp.blockSerializationDefaultParser;

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

import IconToggle from "../../components/icon-toggle";
import Typography from "../../components/typography";
import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";
import BreakpointToggle from "../../components/breakpoint-toggle";
import colorsPresets from "../../colors-presets";
import variations from "./variations";

import paginationTypes from "./pagination-types";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import PGCssLibrary from "../../components/css-library";
import PGIconPicker from "../../components/icon-picker";
import PGDropdown from "../../components/dropdown";
import PGinputSelect from "../../components/input-select";
import metadata from "./block.json";

var myStore = wp.data.select("postgrid-shop");

// var queryPramsX = queryPrams.map((x, i) => {

//   return { value: i, label: x.label, description: x.description, isPro: x.isPro, }
// })

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

		var pagination = attributes.pagination;
		var paginationItem = attributes.paginationItem;
		var paginationItemActive = attributes.paginationItemActive;

		var blockCssY = attributes.blockCssY;

		const [paginationItems, setPaginationItems] = useState([]); // Using the hook.

		//const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
		var breakPointX = myStore.getBreakPoint();
		let isProFeature = applyFilters("isProFeature", true);

		var [isBusy, setIsBusy] = useState(false); // Using the hook.

		const paginationSelector = blockClass + " .pagination";
		const paginationItemSelector = blockClass + " .pagination .page-numbers";
		const paginationItemActiveSelector =
			blockClass + " .pagination .page-numbers.current";

		var parentPagination =
			context["post-grid/pagination"] == undefined
				? null
				: context["post-grid/pagination"];
		var parentPaginationItem =
			context["post-grid/paginationItem"] == undefined
				? null
				: context["post-grid/paginationItem"];
		var parentPaginationItemActive =
			context["post-grid/paginationItemActive"] == undefined
				? null
				: context["post-grid/paginationItemActive"];
		var postGridId =
			context["post-grid/postGridId"] == undefined
				? null
				: context["post-grid/postGridId"];

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
			//setAttributes({ pagination: parentPagination });
		}, [parentPagination]);

		useEffect(() => {
			//setAttributes({ paginationItem: parentPagination });
		}, [parentPaginationItem]);

		useEffect(() => {
			//setAttributes({ paginationItemActive: parentPagination });
		}, [parentPaginationItemActive]);

		function onPickCssLibraryPaginationItemActive(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				paginationItemActive[sudoScource] = sudoScourceArgs;
			});

			var paginationItemActiveX = Object.assign({}, paginationItemActive);
			setAttributes({ paginationItemActive: paginationItemActiveX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					paginationItemActiveSelector
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

		function onChangeStylePaginationItemActive(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, paginationItemActive);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ paginationItemActive: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationItemActiveSelector
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

		function onRemoveStylePaginationItemActive(sudoScource, key) {
			var object = myStore.deletePropertyDeep(paginationItemActive, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ paginationItemActive: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationItemActiveSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStylePaginationItemActive(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, paginationItemActive);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ paginationItemActive: object });
		}

		function onPickCssLibraryPagination(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				pagination[sudoScource] = sudoScourceArgs;
			});

			var paginationX = Object.assign({}, pagination);
			setAttributes({ pagination: paginationX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					paginationSelector
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

		function onChangeStylePagination(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, pagination);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ pagination: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationSelector
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

		function onRemoveStylePagination(sudoScource, key) {
			var object = myStore.deletePropertyDeep(pagination, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ pagination: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStylePagination(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, pagination);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ pagination: object });
		}

		function onPickCssLibraryPaginationItem(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				paginationItem[sudoScource] = sudoScourceArgs;
			});

			var paginationX = Object.assign({}, paginationItem);
			setAttributes({ paginationItem: paginationX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					paginationItemSelector
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

		function onChangeStylePaginationItem(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, paginationItem);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ paginationItem: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationItemSelector
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

		function onRemoveStylePaginationItem(sudoScource, key) {
			var object = myStore.deletePropertyDeep(paginationItem, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ paginationItem: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationItemSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStylePaginationItem(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, paginationItem);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ paginationItem: object });
		}

		const blockProps = useBlockProps({
			className: ` ${blockId} pg-post-query-pagination items-loop`,
		});

		return (
			<>
				<InspectorControls>
					<div className="px-3">
						<div className="my-4">
							<PanelRow className="mb-4">
								<label for="">Pagination Type</label>
								<PGDropdown
									position="bottom right"
									variant="secondary"
									options={paginationTypes}
									buttonTitle={
										paginationTypes[pagination.options.type] != undefined
											? paginationTypes[pagination.options.type].label
											: "Choose"
									}
									onChange={(arg, index) => {
										var options = { ...pagination.options, type: arg.value };
										setAttributes({
											pagination: { ...pagination, options: options },
										});
									}}
									values={""}></PGDropdown>
							</PanelRow>

							{(pagination.options.type == "normal" ||
								pagination.options.type == "ajax") && (
								<>
									<PanelRow>
										<label for="">Max Number of Pagination</label>
										<InputControl
											value={pagination.options.maxPageNum}
											onChange={(newVal) => {
												var options = {
													...pagination.options,
													maxPageNum: newVal,
												};
												setAttributes({
													pagination: { ...pagination, options: options },
												});
											}}
										/>
									</PanelRow>
								</>
							)}

							{(pagination.options.type == "normal" ||
								pagination.options.type == "ajax" ||
								pagination.options.type == "next_previous") && (
								<>
									<PanelRow>
										<label for="">Previous Text</label>
										<InputControl
											value={pagination.options.prevText}
											onChange={(newVal) => {
												var options = {
													...pagination.options,
													prevText: newVal,
												};
												setAttributes({
													pagination: { ...pagination, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label for="">Next Text</label>
										<InputControl
											value={pagination.options.nextText}
											onChange={(newVal) => {
												var options = {
													...pagination.options,
													nextText: newVal,
												};
												setAttributes({
													pagination: { ...pagination, options: options },
												});
											}}
										/>
									</PanelRow>
								</>
							)}

							{(pagination.options.type == "loadmore" ||
								pagination.options.type == "infinite") && (
								<>
									<PanelRow>
										<label for="">Load More Text</label>

										<InputControl
											value={pagination.options.loadMoreText}
											onChange={(newVal) => {
												var options = {
													...pagination.options,
													loadMoreText: newVal,
												};
												setAttributes({
													pagination: { ...pagination, options: options },
												});
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label for="">No Posts Text</label>

										<InputControl
											value={pagination.options.noMorePosts}
											onChange={(newVal) => {
												var options = {
													...pagination.options,
													noMorePosts: newVal,
												};
												setAttributes({
													pagination: { ...pagination, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label for="">Loading Text</label>

										<InputControl
											value={pagination.options.loadingText}
											onChange={(newVal) => {
												var options = {
													...pagination.options,
													loadingText: newVal,
												};
												setAttributes({
													pagination: { ...pagination, options: options },
												});
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label for="">Loading Icon</label>

										<PGIconPicker
											library={pagination.options.loadingIcon.library}
											srcType={pagination.options.loadingIcon.srcType}
											iconSrc={pagination.options.loadingIcon.iconSrc}
											onChange={(arg) => {
												var options = {
													...pagination.options,
													loadingIcon: {
														srcType: arg.srcType,
														library: arg.library,
														iconSrc: arg.iconSrc,
													},
												};

												setAttributes({
													pagination: { ...pagination, options: options },
												});
											}}
										/>
									</PanelRow>
								</>
							)}
						</div>

						<PanelBody
							className=""
							title="Pagination Wrapper"
							initialOpen={false}>
							<PGtabs
								activeTab="styles"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
									{
										name: "styles",
										title: "Styles",
										icon: pencil,
										className: "tab-style",
									},
									{
										name: "css",
										title: "CSS Library",
										icon: cloud,
										className: "tab-css",
									},
								]}>
								<PGtab name="styles">
									<PGStyles
										obj={pagination}
										onChange={onChangeStylePagination}
										onAdd={onAddStylePagination}
										onRemove={onRemoveStylePagination}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={pagination}
										onChange={onPickCssLibraryPagination}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody title="Pagination Items" initialOpen={false}>
							<PGtabs
								activeTab="styles"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
									{
										name: "styles",
										title: "Styles",
										icon: pencil,
										className: "tab-style",
									},
									{
										name: "css",
										title: "CSS Library",
										icon: cloud,
										className: "tab-css",
									},
								]}>
								<PGtab name="styles">
									<PGStyles
										obj={paginationItem}
										onChange={onChangeStylePaginationItem}
										onAdd={onAddStylePaginationItem}
										onRemove={onRemoveStylePaginationItem}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={paginationItem}
										onChange={onPickCssLibraryPaginationItem}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody title="Pagination Active" initialOpen={false}>
							<PGtabs
								activeTab="styles"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
									{
										name: "styles",
										title: "Styles",
										icon: pencil,
										className: "tab-style",
									},
									{
										name: "css",
										title: "CSS Library",
										icon: cloud,
										className: "tab-css",
									},
								]}>
								<PGtab name="styles">
									<PGStyles
										obj={paginationItemActive}
										onChange={onChangeStylePaginationItemActive}
										onAdd={onAddStylePaginationItemActive}
										onRemove={onRemoveStylePaginationItemActive}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={paginationItemActive}
										onChange={onPickCssLibraryPaginationItemActive}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>
					</div>

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
				</InspectorControls>

				<>
					<div className={pagination.options.class}>
						{pagination.options.type == "normal" && (
							<>
								<span className="page-numbers">Prev</span>
								<span className="page-numbers">1</span>
								<span className="page-numbers">2</span>
								<span className="page-numbers">3</span>
								<span className="page-numbers">Next</span>
							</>
						)}

						{pagination.options.type == "ajax" && (
							<>
								<span className="page-numbers">Prev</span>
								<span className="page-numbers">1</span>
								<span className="page-numbers">2</span>
								<span className="page-numbers">3</span>
								<span className="page-numbers">Next</span>
							</>
						)}

						{pagination.options.type == "next_previous" && (
							<>
								<div className="pagination-prev page-numbers">
									{pagination.options.prevText}
								</div>
								<div className="pagination-next page-numbers">
									{pagination.options.nextText}
								</div>
							</>
						)}

						{pagination.options.type == "loadmore" && (
							<>
								<div className="page-numbers">
									{pagination.options.loadMoreText}
								</div>
							</>
						)}

						{pagination.options.type == "infinite" && (
							<div className="page-numbers">
								{pagination.options.loadingText}
							</div>
						)}
					</div>
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file

		var attributes = props.attributes;

		//return <InnerBlocks.Content />;

		return null;
	},
});

