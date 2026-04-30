const { Component, RawHTML, useState, useEffect } = wp.element;
import apiFetch from "@wordpress/api-fetch";
import { store as coreStore } from "@wordpress/core-data";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import { ReactSortable } from "react-sortablejs";
import { applyFilters } from "@wordpress/hooks";

import { MediaUpload, RichText } from "@wordpress/block-editor";
import {
	DateTimePicker,
	Icon,
	__experimentalInputControl as InputControl,
	PanelBody,
	PanelRow,
	Popover,
	ToggleControl,
} from "@wordpress/components";
import {
	addCard,
	brush,
	calendar,
	close,
	copy,
	help,
	menu,
	page,
	settings,
	starEmpty,
	starFilled,
	styles,
} from "@wordpress/icons";
import breakPoints from "../../breakpoints";
import PGDropdown from "../dropdown";
import PGinputSelect from "../input-select";
import PGinputText from "../input-text";
import InputToggle from "../input-toggle";
import WPEditor from "../input-wp-editor";

import LayoutGenerator from "../layout-generator";
import PGStyles from "../styles";
import PGtab from "../tab";
import PGtabs from "../tabs";
import PostGridItems from "../items";
import Layouts from "./layouts";
import PGIconPicker from "../../components/icon-picker";
import { paginationTypes } from "./pagination-types";

var myStore = wp.data.select("PostGridStore");

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var onChange = props.onChange;
	var onChangeStyleObj = props.onChangeStyleObj;

	var addNotifications = props.addNotifications;
	var setHelp = props.setHelp;

	var postData = props.postData;

	if (postData.post_content == null) {
		return (
			<div className="p-3 my-5 bg-orange-400">
				Please choose an Post Grid first.
			</div>
		);
	}

	var breakPointX = "Desktop";

	var [PostGridData, setPostGridData] = useState(postData.post_content);
	var [globalOptions, setglobalOptions] = useState(PostGridData.globalOptions);
	var [itemQueryArgs, setitemQueryArgs] = useState(PostGridData.itemQueryArgs);

	var [wrapper, setwrapper] = useState(PostGridData.wrapper);
	var [items, setitems] = useState(PostGridData.items);


	var [itemsWrap, setitemsWrap] = useState(PostGridData.itemsWrap);
	var [itemWrap, setitemWrap] = useState(PostGridData.itemWrap);
	var [paginationWrap, setpaginationWrap] = useState(PostGridData.paginationWrap);
	var [paginationItem, setpaginationItem] = useState(PostGridData.paginationItem);
	var [paginationItemActive, setpaginationItemActive] = useState(PostGridData.paginationItemActive);
	var [icon, seticon] = useState(PostGridData.icon);
	var [iconToggle, seticonToggle] = useState(PostGridData.iconToggle);

	var [masonryOptions, setmasonryOptions] = useState(
		PostGridData.masonryOptions
	);

	var [prev, setprev] = useState(PostGridData?.prev);
	var [prevIcon, setprevIcon] = useState(PostGridData?.prevIcon);
	var [next, setnext] = useState(PostGridData?.next);
	var [nextIcon, setnextIcon] = useState(PostGridData?.nextIcon);
	var [sliderOptions, setsliderOptions] = useState(
		PostGridData?.sliderOptions
	);
	var [sliderOptionsRes, setsliderOptionsRes] = useState(
		PostGridData?.sliderOptionsRes
	);

	var [topWrap, settopWrap] = useState(PostGridData.topWrap);



	var [styleObj, setstyleObj] = useState({});
	const [taxonomiesObjects, setTaxonomiesObjects] = useState([]);
	var [customerData, setcustomerData] = useState(props.customerData);
	var [datePicker, setdatePicker] = useState(9999999);

	var [isProFeature, setisProFeature] = useState(true);
	var [editLayouts, seteditLayouts] = useState(false);
	var [loopLayout, setloopLayout] = useState(PostGridData.loopLayout);


	var wrapperSelector = "#post-grid-" + postData.ID;
	var itemsWrapSelector = wrapperSelector + " > .items";
	var itemWrapSelector = wrapperSelector + " > .items > .item";
	var paginationWrapSelector = wrapperSelector + " > .pagination";
	var paginationItemSelector = wrapperSelector + " > .pagination .page-numbers";
	var paginationItemActiveSelector = wrapperSelector + " > .pagination .page-numbers.current";


	var paginationTypesX = applyFilters('PostGridPaginationTypes', paginationTypes);


	var breakPointList = [{ label: "Select..", icon: "", value: "" }];
	for (var x in breakPoints) {
		var breakPointItem = breakPoints[x];
		breakPointList.push({
			label: breakPointItem.name,
			icon: breakPointItem.icon,
			value: breakPointItem.id,
		});
	}

	var postTypes = [];
	const postTypesData = useSelect(
		(select) => select(coreStore).getPostTypes({ per_page: -1 }),
		[]
	);
	postTypesData !== null &&
		postTypesData.map((x) => {
			postTypes.push({ value: x.slug, label: x.name });
		});

	useEffect(() => {
		apiFetch({
			path: "/post-grid/v2/post_type_objects",
			method: "POST",
			data: { postTypes: [] },
		}).then((res) => {
			var taxonomies = [];
			res.map((item) => {
				taxonomies.push({ label: item.label, value: item.id });
			});
			setTaxonomiesObjects(taxonomies);
		});
	}, []);

	useEffect(() => {
		if (customerData.isPro) {
			setisProFeature(false);
		}
	}, [props.customerData]);

	useEffect(() => {
		onChange(PostGridData);
	}, [PostGridData]);


	useEffect(() => {

		if (Object.entries(styleObj).length > 0) {
			onChangeStyleObj(styleObj)
		}

	}, [styleObj]);

	useEffect(() => {

		var styles = generateStyleObj()
		setstyleObj(styles)

	}, [PostGridData]);


	function generateStyleObj() {

		var styleObjX = {}

		// wrapper
		var wrapperX = { ...PostGridData.wrapper }

		var wrapperStyles = myStore.deletePropertyDeep(wrapperX, ['options']);
		styleObjX[wrapperSelector] = wrapperStyles

		var itemsWrapX = { ...PostGridData.itemsWrap }
		var itemsWrapStyles = myStore.deletePropertyDeep(itemsWrapX, ['options']);
		styleObjX[itemsWrapSelector] = itemsWrapStyles

		var itemWrapX = { ...PostGridData.itemWrap }
		var itemWrapStyles = myStore.deletePropertyDeep(itemWrapX, ['options']);
		styleObjX[itemWrapSelector] = itemWrapStyles

		var paginationWrapX = { ...PostGridData.paginationWrap }
		var paginationWrapStyles = myStore.deletePropertyDeep(paginationWrapX, ['options']);
		styleObjX[paginationWrapSelector] = paginationWrapStyles

		var paginationItemX = { ...PostGridData.paginationItem }
		var paginationItemStyles = myStore.deletePropertyDeep(paginationItemX, ['options']);
		styleObjX[paginationItemSelector] = paginationItemStyles

		var paginationItemActiveX = { ...PostGridData.paginationItemActive }
		var paginationItemActiveStyles = myStore.deletePropertyDeep(paginationItemActiveX, ['options']);
		styleObjX[paginationItemActiveSelector] = paginationItemActiveStyles

		var loopLayoutFlatArry = myStore.flattenObject(PostGridData.loopLayout);
		loopLayoutFlatArry.map(element => {
			var elementId = element.id;
			var elementHdnle = "#element-" + elementId;
			var cssSelectors = element.cssSelectors

			if (cssSelectors != undefined) {
				Object.entries(cssSelectors).map(args => {

					var elementSubIndex = args[0];
					var elementStylesObj = args[1];
					var itemhdnle = elementStylesObj?.handle == undefined ? elementHdnle : elementStylesObj?.handle;

					if (itemhdnle.length == 0) {
						var elementSubHdnle = wrapperSelector + ' ' + elementHdnle;
					} else {
						var elementSubHdnle = wrapperSelector + ' ' + elementHdnle + ' ' + itemhdnle;
					}
					var elementStylesObjX = { ...elementStylesObj }
					delete elementStylesObjX.handle
					delete elementStylesObjX.label

					styleObjX[elementSubHdnle] = elementStylesObjX

				})
			}
		})


		return styleObjX;
		//setstyleObj(styleObjX)

	}



	useEffect(() => {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.globalOptions = globalOptions;
		setPostGridData(PostGridDataX);
	}, [globalOptions]);



	useEffect(() => {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.items = items;
		setPostGridData(PostGridDataX);
	}, [items]);

	useEffect(() => {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.itemsWrap = itemsWrap;
		setPostGridData(PostGridDataX);
	}, [itemsWrap]);

	useEffect(() => {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.itemWrap = itemWrap;
		setPostGridData(PostGridDataX);
	}, [itemWrap]);


	useEffect(() => {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.itemQueryArgs = itemQueryArgs;
		setPostGridData(PostGridDataX);
	}, [itemQueryArgs]);


	useEffect(() => {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.masonryOptions = masonryOptions;
		setPostGridData(PostGridDataX);
	}, [masonryOptions]);

	useEffect(() => {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.paginationWrap = paginationWrap;
		setPostGridData(PostGridDataX);
	}, [paginationWrap]);

	useEffect(() => {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.paginationItem = paginationItem;
		setPostGridData(PostGridDataX);
	}, [paginationItem]);

	useEffect(() => {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.paginationItemActive = paginationItemActive;
		setPostGridData(PostGridDataX);
	}, [paginationItemActive]);

	useEffect(() => {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.wrapper = wrapper;
		setPostGridData(PostGridDataX);
	}, [wrapper]);

	useEffect(() => {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.loopLayout = loopLayout;
		setPostGridData(PostGridDataX);
	}, [loopLayout]);


















	var RemoveMasonryArg = function ({ index }) {
		return (
			<span
				className="cursor-pointer hover:bg-red-500 hover:text-white "
				onClick={(ev) => {
					var masonryOptionsX = { ...masonryOptions };
					delete masonryOptionsX[index];
					setmasonryOptions(masonryOptionsX);
				}}>
				<Icon icon={close} />
			</span>
		);
	};

	useEffect(() => {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.topWrap = topWrap;
		setPostGridData(PostGridDataX);
	}, [topWrap]);



	const ALLOWED_MEDIA_TYPES = ["image"];

	var videoType = {
		choose: { label: "Choose", value: "" },
		youtube: { label: "YouTube", value: "youtube" },
	};

	function onChangeStyle(sudoScource, newVal, attr, propertyType, setProperty) {
		var path = [sudoScource, attr, breakPointX];
		let obj = { ...propertyType };
		const object = myStore.updatePropertyDeep(obj, path, newVal);
		setProperty(object);
	}

	function onAddStyle(sudoScource, key, propertyType, setProperty) {
		var path = [sudoScource, key, breakPointX];
		let obj = { ...propertyType };
		const object = myStore.addPropertyDeep(obj, path, "");
		setProperty(object);
	}

	function onResetStyle(sudoSources, propertyType, setProperty) {
		let obj = Object.assign({}, propertyType);
		Object.entries(sudoSources).map((args) => {
			var sudoScource = args[0];
			if (obj[sudoScource] == undefined) {
			} else {
				obj[sudoScource] = {};
				// var elementSelector = myStore.getElementSelector(
				// 	sudoScource,
				// 	contentSelector // Replace this selector if needed
				// );
			}
		});
		setProperty(obj);
	}

	function onRemoveStyle(sudoScource, key, propertyType, setProperty) {
		let obj = { ...propertyType };
		var object = myStore.deletePropertyDeep(obj, [
			sudoScource,
			key,
			breakPointX,
		]);
		var isEmpty =
			Object.entries(object[sudoScource][key]).length === 0 ? true : false;
		var objectX = isEmpty
			? myStore.deletePropertyDeep(object, [sudoScource, key])
			: object;
		setProperty(objectX);
	}

	function onBulkAddStyle(sudoSource, cssObj, propertyType, setProperty) {
		let obj = { ...propertyType };
		obj[sudoSource] = cssObj;
		setProperty(obj);
	}

	// useEffect(() => {
	// 	var numberOfColumns = masonryOptions.numberOfColumns;
	// 	var gutter =
	// 		parseInt(masonryOptions.gutter) * (parseInt(numberOfColumns) - 1);
	// 	var calc = "calc((100% - " + gutter + "px)/" + numberOfColumns + ")";
	// 	console.log(calc, itemWrap.styles)
	// 	var itemWrapX = {
	// 		...itemWrap,
	// 		styles: { ...itemWrap.styles, width: { Desktop: calc } },
	// 	};
	// 	setitemWrap(itemWrapX);
	// 	// onChangeStyleItem("styles", clac, "width");
	// }, [masonryOptions.numberOfColumns]);
	// useEffect(() => {
	// 	var gutter = parseInt(masonryOptions.gutter);
	// 	var itemWrapX = {
	// 		...itemWrap,
	// 		styles: { ...itemWrap.styles, marginBottom: { Desktop: `${gutter}px` } },
	// 	};
	// 	setitemWrap(itemWrapX);
	// 	// onChangeStyleItem("styles", clac, "width");
	// }, [masonryOptions.gutter]);

	useEffect(() => {
		var numberOfColumns = masonryOptions.numberOfColumns;
		var gutter = parseInt(masonryOptions.gutter);
		var totalGutter = gutter * (parseInt(numberOfColumns) - 1);
		var calc = `calc((100% - ${totalGutter}px) / ${numberOfColumns})`;
		console.log(gutter, calc)
		var itemWrapX = {
			...itemWrap,
			styles: {
				...itemWrap.styles,
				width: { Desktop: calc },
				marginBottom: { Desktop: `${gutter}px` },
			},
		};

		setitemWrap(itemWrapX);
	}, [masonryOptions.numberOfColumns, masonryOptions.gutter]);
	// console.log(itemWrap)

	var itemSources = {
		manual: { label: "Manual", value: "manual" },
		posts: {
			label: "Posts",
			value: "posts",
			isPro: customerData.isPro ? false : true,
		},
		// terms: {
		// 	label: "Terms",
		// 	value: "terms",
		// 	isPro: customerData.isPro ? false : true,
		// },
	};

	function generate3Digit() {
		return Math.floor(100 + Math.random() * 900);
	}

	const copyData = (data) => {
		navigator.clipboard
			.writeText(data)
			.then(() => {
				addNotifications({
					title: "Copied to clipboard!",
					content:
						"Use the shortcode in page or post conent where you want to display.",
					type: "success",
				});
			})
			.catch((err) => { });
	};

	function escapeHTML(str) {
		const map = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#039;",
		};
		return str.replace(/[&<>"']/g, function (match) {
			return map[match];
		});
	}

	function unescapeHTML(str) {
		const map = {
			"&amp;": "&",
			"&lt;": "<",
			"&gt;": ">",
			"&quot;": '"',
			"&#039;": "'",
		};
		return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function (match) {
			return map[match];
		});
	}

	const handleDelete = (id) => {
		// Filter out the item with the specified id
		const updatedItems = Object.fromEntries(
			Object.entries(itemQueryArgs).filter(([key, item]) => item.id !== id)
		);
		setitemQueryArgs(updatedItems);
	};

	var masonryOptionsArgs = {
		numberOfColumns: { label: "Number Of Columns", value: 3 },
		gutter: { label: "Gutter", value: 15 },
		itemSelector: { label: "Item Selector", value: ".item" },
		columnWidth: { label: "Column Width", value: ".item" },
		percentPosition: { label: "Percent Position", value: true },
		horizontalOrder: { label: "Horizontal Order", value: true },
		stamp: { label: "Stamp", value: ".stamp" },
		fitWidth: { label: "Fit Width", value: true },
		originLeft: { label: "Origin Left", value: true },
		originTop: { label: "Origin Top", value: true },
		stagger: { label: "Stagger", value: 30 },
		resize: { label: "Resize", value: true },
	};

	function onChangeLayouts(loopLayout) {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.loopLayout = loopLayout;
		setPostGridData(PostGridDataX);

		setloopLayout(loopLayout);
	}

	return (
		<div className="">


			{props.postData.post_content != null && (
				<>
					<PostGridItems
						itemsState={{ items, setitems }}
						globalOptionsState={{ globalOptions, setglobalOptions }}
						itemQueryState={{ itemQueryArgs, setitemQueryArgs }}
						customerData={customerData}
						setHelp={setHelp}
						addNotifications={addNotifications}
					/>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Settings"
						initialOpen={false}>
						<div className="py-3">
							<PanelRow>
								<label htmlFor="" className="flex gap-2 items-center">
									Lazyload
									<span
										className="cursor-pointer"
										title="Click to know more"
										onClick={() => {
											setHelp({
												id: "lazyloadSetting",
												enable: true,
											});
										}}>
										<Icon icon={help} />
									</span>
								</label>
								<InputToggle
									value={globalOptions?.lazyLoad}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.lazyLoad = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
								{/* <SelectControl
									className="w-[140px]"
									label=""
									value={globalOptions?.lazyLoad}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => {
										// var globalOptionsX = { ...globalOptions };
										// globalOptionsX.lazyLoad = newVal;
										// setglobalOptions(globalOptionsX);

										var globalOptionsX = { ...globalOptions };
										globalOptionsX.lazyLoad = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/> */}
							</PanelRow>
						</div>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Layouts"
						initialOpen={false}>
						<div className="flex items-center justify-between">
							<div
								className="bg-slate-700 inline-block text-white px-5 py-2 rounded-sm cursor-pointer hover:bg-slate-600"
								onClick={(ev) => {
									seteditLayouts(!editLayouts);
								}}>
								Customize Layouts
							</div>
							<div
								className="bg-slate-700 text-white px-5 py-2 rounded-sm cursor-pointer hover:bg-slate-600 flex items-center gap-1"
								onClick={() => {
									navigator.clipboard
										.writeText(JSON.stringify(PostGridData.loopLayout))
										.then(() => {
											addNotifications({
												title: "Copied to clipboard!",
												content: "Layout Copied!",
												type: "success",
											});
										});
								}}>
								<Icon icon={copy} size={14} fill="#fff" />
								Copy
							</div>
							<div
								className="bg-slate-700 text-white px-5 py-2 rounded-sm cursor-pointer hover:bg-slate-600 flex items-center gap-1"
								onClick={async () => {
									try {
										var data = await navigator.clipboard.readText();
										data = JSON.parse(data);
										onChangeLayouts(data).then(() => {
											addNotifications({
												title: "Layout Pasted!",
												content: "Layout paste successful.",
												type: "success",
											});
										});
									} catch (e) {
										console.log(e);
									}
								}}>
								<Icon icon={page} size={14} fill="#fff" />
								Paste
							</div>

							{editLayouts && (
								<div className="fixed h-full top-0 py-10 overflow-y-auto bg-slate-500 bg-opacity-70 left-0 w-full z-50">
									<div className="w-[1400px] mx-auto ">
										<div className="flex justify-between bg-gray-700 p-3">
											<div className="text-white text-md">Layout Editor</div>
											<div>
												<span
													className="size-6 bg-red-500 flex items-center justify-center cursor-pointer"
													onClick={(ev) => {
														seteditLayouts(!editLayouts);
													}}
												>
													<Icon icon={close} fill="#fff" size={18} />
												</span>
											</div>

										</div>

										<LayoutGenerator
											postData={postData}
											customerData={customerData}
											addNotifications={addNotifications}
											onChange={onChangeLayouts}
											layouts={PostGridData.loopLayout}
										/>
									</div>
								</div>
							)}
						</div>

						<div>
							<Layouts postData={postData}
								onChangeLayouts={onChangeLayouts}
								customerData={customerData}
								addNotifications={addNotifications}
								setHelp={setHelp} />
						</div>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title={__("Masonry", "post-grid")}
						initialOpen={true}>
						<PanelRow className="my-3">
							<PGDropdown
								position="bottom right"
								variant="secondary"
								buttonTitle={"Choose"}
								options={masonryOptionsArgs}
								// onChange={(option, index) => {
								// 	var masonryOptionsX = { ...masonryOptions };
								// 	masonryOptionsX[index] = option.value;
								// 	setAttributes({ masonryOptions: masonryOptionsX });
								// }}
								onChange={(newVal, index) => {
									var masonryOptionsX = { ...masonryOptions };
									masonryOptionsX[index] = newVal.value;
									setmasonryOptions(masonryOptionsX);
								}}
								values=""></PGDropdown>
						</PanelRow>
						{Object.entries(masonryOptions).map((item, index) => {
							var id = item[0];
							var value = item[1];
							return (
								<div key={index}>
									{id == "itemSelector" && (
										<PanelRow>
											<div className="flex items-center">
												<RemoveMasonryArg index={id} />
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													Item Selector
												</label>
											</div>
											<InputControl
												value={masonryOptions.itemSelector}
												onChange={(newVal) => {
													setmasonryOptions({
														...masonryOptions,
														itemSelector: newVal,
													});
												}}
											/>
										</PanelRow>
									)}
									{id == "gutter" && (
										<PanelRow>
											<div className="flex items-center">
												<RemoveMasonryArg index={id} />
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													Gutter
												</label>
											</div>
											<InputControl
												type="number"
												value={masonryOptions.gutter}
												onChange={(newVal) => {
													setmasonryOptions({
														...masonryOptions,
														gutter: parseInt(newVal),
													});
													// onChangeStyleItem(
													// 	"styles",
													// 	parseInt(newVal) + "px",
													// 	"marginBottom"
													// );
												}}
											/>
										</PanelRow>
									)}
									{id == "columnWidth" && (
										<PanelRow>
											<div className="flex items-center">
												<RemoveMasonryArg index={id} />
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													Column width
												</label>
											</div>
											<InputControl
												value={masonryOptions.columnWidth}
												onChange={(newVal) => {
													setmasonryOptions({
														...masonryOptions,
														columnWidth: newVal,
													});
												}}
											/>
										</PanelRow>
									)}
									{id == "numberOfColumns" && (
										<PanelRow>
											<div className="flex items-center">
												<RemoveMasonryArg index={id} />
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													Number Of Columns
												</label>
											</div>
											<InputControl
												type="number"
												value={masonryOptions.numberOfColumns}
												onChange={(newVal) => {
													setmasonryOptions({
														...masonryOptions,
														numberOfColumns: parseInt(newVal),
													});
												}}
											/>
										</PanelRow>
									)}
									{id == "horizontalOrder" && (
										<PanelRow>
											<div className="flex items-center">
												<RemoveMasonryArg index={id} />
												<ToggleControl
													label="Horizontal Order?"
													help={
														masonryOptions.horizontalOrder
															? "Horizontal Order Enabled"
															: "Horizontal Order Disabled"
													}
													checked={masonryOptions.horizontalOrder}
													onChange={(newHorizontalOrder) => {
														const updatedMasonryOptions = {
															...masonryOptions,
															horizontalOrder: newHorizontalOrder,
														};
														setmasonryOptions(updatedMasonryOptions);
													}}
												/>
											</div>
										</PanelRow>
									)}
									{id == "percentPosition" && (
										<PanelRow>
											<div className="flex items-center">
												<RemoveMasonryArg index={id} />
												<ToggleControl
													label="Percent Position?"
													help={
														masonryOptions.percentPosition
															? "Percent Position Enabled"
															: "Percent Position Disabled"
													}
													checked={masonryOptions.percentPosition}
													onChange={(newPercentPosition) => {
														const updatedMasonryOptions = {
															...masonryOptions,
															percentPosition: newPercentPosition,
														};
														setmasonryOptions(updatedMasonryOptions);
													}}
												/>
											</div>
										</PanelRow>
									)}
									{id == "stamp" && (
										<PanelRow>
											<div className="flex items-center">
												<RemoveMasonryArg index={id} />
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													Stamp
												</label>
											</div>
										</PanelRow>
									)}
									{id == "fitWidth" && (
										<PanelRow>
											<div className="flex items-center">
												<RemoveMasonryArg index={id} />
												<ToggleControl
													label="Fit Width?"
													help={
														masonryOptions.fitWidth
															? "Fit Width Enabled"
															: "Fit Width Disabled."
													}
													checked={masonryOptions.fitWidth}
													onChange={(fitWidth) => {
														const updatedMasonryOptions = {
															...masonryOptions,
															fitWidth: fitWidth,
														};
														setmasonryOptions(updatedMasonryOptions);
													}}
												/>
											</div>
										</PanelRow>
									)}
									{id == "originLeft" && (
										<PanelRow>
											<div className="flex items-center">
												<RemoveMasonryArg index={id} />
												<ToggleControl
													label="Origin Left?"
													help={
														masonryOptions.originLeft
															? "Origin Left Enabled"
															: "Origin Left Disabled."
													}
													checked={masonryOptions.originLeft}
													onChange={(originLeft) => {
														const updatedMasonryOptions = {
															...masonryOptions,
															originLeft: originLeft,
														};
														setmasonryOptions(updatedMasonryOptions);
													}}
												/>
											</div>
										</PanelRow>
									)}
									{id == "originTop" && (
										<PanelRow>
											<div className="flex items-center">
												<RemoveMasonryArg index={id} />
												<ToggleControl
													label="Origin Top?"
													help={
														masonryOptions.originTop
															? "Origin Top Enabled"
															: "Origin Top Disabled."
													}
													checked={masonryOptions.originTop}
													onChange={(originTop) => {
														const updatedMasonryOptions = {
															...masonryOptions,
															originTop: originTop,
														};
														setmasonryOptions(updatedMasonryOptions);
													}}
												/>
											</div>
										</PanelRow>
									)}
									{id == "stagger" && (
										<PanelRow>
											<div className="flex items-center">
												<RemoveMasonryArg index={id} />
												<ToggleControl
													label="Stagger?"
													help={
														masonryOptions.stagger
															? "Stagger Enabled"
															: "Stagger Disabled."
													}
													checked={masonryOptions.stagger}
													onChange={(stagger) => {
														const updatedMasonryOptions = {
															...masonryOptions,
															stagger: stagger,
														};
														setmasonryOptions(updatedMasonryOptions);
													}}
												/>
											</div>
										</PanelRow>
									)}
									{id == "resize" && (
										<PanelRow>
											<div className="flex items-center">
												<RemoveMasonryArg index={id} />
												<ToggleControl
													label="Resize?"
													help={
														masonryOptions.resize
															? "Resize Enabled"
															: "Resize Disabled."
													}
													checked={masonryOptions.resize}
													onChange={(resize) => {
														const updatedMasonryOptions = {
															...masonryOptions,
															resize: resize,
														};
														setmasonryOptions(updatedMasonryOptions);
													}}
												/>
											</div>
										</PanelRow>
									)}
								</div>
							);
						})}
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Wrapper"
						initialOpen={false}>
						<PGtabs
							activeTab="options"
							orientation="horizontal"
							activeClass="active-tab"
							onSelect={(tabName) => { }}
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
								<div className="flex  my-5  justify-between items-center">
									<label className="" htmlFor="">
										{__("Class", "post-grid")}
									</label>
									<PGinputText
										value={wrapper?.options?.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
										onChange={(newVal) => {
											var optionsX = {
												...wrapper,
												options: {
													...wrapper?.options,
													class: newVal,
												},
											};
											setwrapper(optionsX);
										}}
									/>
								</div>
							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={wrapper}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(
											sudoScource,
											newVal,
											attr,
											wrapper,
											setwrapper
										)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(sudoScource, key, wrapper, setwrapper)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(sudoScource, key, wrapper, setwrapper)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, wrapper, setwrapper)
									}
									onBulkAdd={(sudoSource, cssObj) =>
										onBulkAddStyle(sudoSource, cssObj, wrapper, setwrapper)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>

					<PanelBody
						className="font-medium text-slate-900 "
						title="Items Wrap"
						initialOpen={false}>
						<PGtabs
							activeTab="options"
							orientation="horizontal"
							activeClass="active-tab"
							onSelect={(tabName) => { }}
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
								<div className="flex  my-5  justify-between items-center">
									<label className="" htmlFor="">
										{__("Class", "post-grid")}
									</label>
									<PGinputText
										value={itemsWrap?.options?.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
										onChange={(newVal) => {
											var optionsX = {
												...itemsWrap,
												options: {
													...itemsWrap?.options,
													class: newVal,
												},
											};
											setitemsWrap(optionsX);
										}}
									/>
								</div>
							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={itemsWrap}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(
											sudoScource,
											newVal,
											attr,
											itemsWrap,
											setitemsWrap
										)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(sudoScource, key, itemsWrap, setitemsWrap)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(sudoScource, key, itemsWrap, setitemsWrap)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, itemsWrap, setitemsWrap)
									}
									onBulkAdd={(sudoSource, cssObj) =>
										onBulkAddStyle(sudoSource, cssObj, itemsWrap, setitemsWrap)
									}
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
							onSelect={(tabName) => { }}
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
								<div className="flex  my-5  justify-between items-center">
									<label className="" htmlFor="">
										{__("Class", "post-grid")}
									</label>
									<PGinputText
										value={itemWrap?.options?.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
										onChange={(newVal) => {
											var optionsX = {
												...itemWrap,
												options: {
													...itemWrap?.options,
													class: newVal,
												},
											};
											setitemWrap(optionsX);
										}}
									/>
								</div>
							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={itemWrap}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(
											sudoScource,
											newVal,
											attr,
											itemWrap,
											setitemWrap
										)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(sudoScource, key, itemWrap, setitemWrap)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(sudoScource, key, itemWrap, setitemWrap)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, itemWrap, setitemWrap)
									}
									onBulkAdd={(sudoSource, cssObj) =>
										onBulkAddStyle(sudoSource, cssObj, itemWrap, setitemWrap)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>


					<PanelBody
						className="font-medium text-slate-900 "
						title="Pagination"
						initialOpen={false}>


						<PanelRow className="my-4">
							<label htmlFor="">
								{__("Pagination Type", "post-grid")}
							</label>
							<PGDropdown
								position="bottom right"
								variant="secondary"
								options={paginationTypesX}
								buttonTitle={
									paginationTypesX[globalOptions?.pagination?.type] !=
										undefined
										? paginationTypesX[globalOptions.pagination.type].label
										: __("Choose", "post-grid")
								}
								onChange={(arg, index) => {


									var globalOptionsX = { ...globalOptions };
									var paginationX = { ...globalOptionsX.pagination }
									paginationX.type = arg.value

									globalOptionsX.pagination = paginationX;
									setglobalOptions(globalOptionsX);

								}}
								values={""}></PGDropdown>
						</PanelRow>


						<div className="flex  my-5  justify-between items-center">
							<label className="" htmlFor="">
								{__("Previous Text", "post-grid")}
							</label>
							<PGinputText
								value={globalOptions?.pagination?.previousText}
								className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
								onChange={(newVal) => {
									var globalOptionsX = { ...globalOptions };

									var paginationX = { ...globalOptionsX.pagination }
									paginationX.previousText = newVal
									globalOptionsX.pagination = paginationX;

									setglobalOptions(globalOptionsX);
								}}
							/>
						</div>
						<div className="flex  my-5  justify-between items-center">
							<label className="" htmlFor="">
								{__("Next Text", "post-grid")}
							</label>
							<PGinputText
								value={globalOptions?.pagination?.nextText}
								className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
								onChange={(newVal) => {
									var globalOptionsX = { ...globalOptions };

									var paginationX = { ...globalOptionsX.pagination }
									paginationX.nextText = newVal
									globalOptionsX.pagination = paginationX;

									setglobalOptions(globalOptionsX);
								}}
							/>
						</div>
						<div className="flex  my-5  justify-between items-center">
							<label className="" htmlFor="">
								{__("Load More Text", "post-grid")}
							</label>
							<PGinputText
								value={globalOptions?.pagination?.loadMoreText}
								className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
								onChange={(newVal) => {
									var globalOptionsX = { ...globalOptions };
									var paginationX = { ...globalOptionsX.pagination }
									paginationX.loadMoreText = newVal
									globalOptionsX.pagination = paginationX;
									setglobalOptions(globalOptionsX);
								}}
							/>
						</div>
						<div className="flex  my-5  justify-between items-center">
							<label className="" htmlFor="">
								{__("Loading Text", "post-grid")}
							</label>
							<PGinputText
								value={globalOptions?.pagination?.loadingText}
								className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
								onChange={(newVal) => {
									var globalOptionsX = { ...globalOptions };

									var paginationX = { ...globalOptionsX.pagination }
									paginationX.loadingText = newVal
									globalOptionsX.pagination = paginationX;


									setglobalOptions(globalOptionsX);
								}}
							/>
						</div>
						<div className="flex  my-5  justify-between items-center">
							<label className="" htmlFor="">
								{__("No Post Text", "post-grid")}
							</label>
							<PGinputText
								value={globalOptions?.pagination?.noPostText}
								className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
								onChange={(newVal) => {
									var globalOptionsX = { ...globalOptions };

									var paginationX = { ...globalOptionsX.pagination }
									paginationX.noPostText = newVal
									globalOptionsX.pagination = paginationX;


									setglobalOptions(globalOptionsX);
								}}
							/>
						</div>

						<PanelRow>
							<label htmlFor="" className="font-medium text-slate-900 ">
								{__("Loading Icon", "post-grid")}
							</label>
							<PGIconPicker
								library={globalOptions?.pagination?.loadingIcon?.library}
								srcType={globalOptions?.pagination?.loadingIcon?.srcType}
								iconSrc={globalOptions?.pagination?.loadingIcon?.iconSrc}
								class={globalOptions?.pagination?.loadingIcon?.class}
								onChange={(arg) => {

									var globalOptionsX = { ...globalOptions };


									var paginationX = { ...globalOptionsX.pagination }
									paginationX.loadingIcon = {
										srcType: arg.srcType,
										library: arg.library,
										iconSrc: arg.iconSrc,
										class: arg.class,
									};
									globalOptionsX.pagination = paginationX;


									setglobalOptions(globalOptionsX);

								}}
							/>
						</PanelRow>
						<PanelRow>
							<label htmlFor="" className="font-medium text-slate-900 ">
								{__("Load More Icon", "post-grid")}
							</label>
							<PGIconPicker
								library={globalOptions?.pagination?.loadMoreIcon?.library}
								srcType={globalOptions?.pagination?.loadMoreIcon?.srcType}
								iconSrc={globalOptions?.pagination?.loadMoreIcon?.iconSrc}
								class={globalOptions?.pagination?.loadMoreIcon?.class}
								onChange={(arg) => {
									var globalOptionsX = { ...globalOptions };

									var paginationX = { ...globalOptionsX.pagination }
									paginationX.loadMoreIcon = {
										srcType: arg.srcType,
										library: arg.library,
										iconSrc: arg.iconSrc,
										class: arg.class,
									};
									globalOptionsX.pagination = paginationX;


									setglobalOptions(globalOptionsX);
								}}
							/>
						</PanelRow>
						<PanelRow>
							<label htmlFor="" className="font-medium text-slate-900 ">
								{__("Previous Icon", "post-grid")}
							</label>
							<PGIconPicker
								library={globalOptions?.pagination?.previousIcon?.library}
								srcType={globalOptions?.pagination?.previousIcon?.srcType}
								iconSrc={globalOptions?.pagination?.previousIcon?.iconSrc}
								class={globalOptions?.pagination?.previousIcon?.class}
								onChange={(arg) => {
									var globalOptionsX = { ...globalOptions };

									var paginationX = { ...globalOptionsX.pagination }
									paginationX.previousIcon = {
										srcType: arg.srcType,
										library: arg.library,
										iconSrc: arg.iconSrc,
										class: arg.class,
									};
									globalOptionsX.pagination = paginationX;


									setglobalOptions(globalOptionsX);
								}}
							/>
						</PanelRow>
						<PanelRow>
							<label htmlFor="" className="font-medium text-slate-900 ">
								{__("Next Icon", "post-grid")}
							</label>
							<PGIconPicker
								library={globalOptions?.pagination?.nextIcon?.library}
								srcType={globalOptions?.pagination?.nextIcon?.srcType}
								iconSrc={globalOptions?.pagination?.nextIcon?.iconSrc}
								class={globalOptions?.pagination?.nextIcon?.class}
								onChange={(arg) => {
									var globalOptionsX = { ...globalOptions };

									var paginationX = { ...globalOptionsX.pagination }
									paginationX.nextIcon = {
										srcType: arg.srcType,
										library: arg.library,
										iconSrc: arg.iconSrc,
										class: arg.class,
									};
									globalOptionsX.pagination = paginationX;


									setglobalOptions(globalOptionsX);
								}}
							/>
						</PanelRow>










						<PanelBody
							className="font-medium text-slate-900 "
							title="Pagination Wrap"
							initialOpen={false}>
							<PGtabs
								activeTab="options"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => { }}
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

									<div className="flex  my-5  justify-between items-center">
										<label className="" htmlFor="">
											{__("Class", "post-grid")}
										</label>
										<PGinputText
											value={paginationWrap?.options?.class}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
											onChange={(newVal) => {
												var optionsX = {
													...paginationWrap,
													options: {
														...paginationWrap?.options,
														class: newVal,
													},
												};
												setpaginationWrap(optionsX);
											}}
										/>
									</div>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={paginationWrap}
										onChange={(sudoScource, newVal, attr) =>
											onChangeStyle(
												sudoScource,
												newVal,
												attr,
												paginationWrap,
												setpaginationWrap
											)
										}
										onAdd={(sudoScource, key) =>
											onAddStyle(
												sudoScource,
												key,
												paginationWrap,
												setpaginationWrap
											)
										}
										onRemove={(sudoScource, key) =>
											onRemoveStyle(
												sudoScource,
												key,
												paginationWrap,
												setpaginationWrap
											)
										}
										onReset={(sudoSources) =>
											onResetStyle(
												sudoSources,
												paginationWrap,
												setpaginationWrap
											)
										}
										onBulkAdd={(sudoSource, cssObj) =>
											onBulkAddStyle(
												sudoSource,
												cssObj,
												paginationWrap,
												setpaginationWrap
											)
										}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Pagination Item"
							initialOpen={false}>
							<PGtabs
								activeTab="options"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => { }}
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
									<div className="flex  my-5  justify-between items-center">
										<label className="" htmlFor="">
											{__("Class", "post-grid")}
										</label>
										<PGinputText
											value={paginationItem?.options?.class}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
											onChange={(newVal) => {
												var optionsX = {
													...paginationItem,
													options: {
														...paginationItem?.options,
														class: newVal,
													},
												};
												setpaginationItem(optionsX);
											}}
										/>
									</div>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={paginationItem}
										onChange={(sudoScource, newVal, attr) =>
											onChangeStyle(
												sudoScource,
												newVal,
												attr,
												paginationItem,
												setpaginationItem
											)
										}
										onAdd={(sudoScource, key) =>
											onAddStyle(
												sudoScource,
												key,
												paginationItem,
												setpaginationItem
											)
										}
										onRemove={(sudoScource, key) =>
											onRemoveStyle(
												sudoScource,
												key,
												paginationItem,
												setpaginationItem
											)
										}
										onReset={(sudoSources) =>
											onResetStyle(
												sudoSources,
												paginationItem,
												setpaginationItem
											)
										}
										onBulkAdd={(sudoSource, cssObj) =>
											onBulkAddStyle(
												sudoSource,
												cssObj,
												paginationItem,
												setpaginationItem
											)
										}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="pagination Item Active"
							initialOpen={false}>
							<PGtabs
								activeTab="options"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => { }}
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
									<div className="flex  my-5  justify-between items-center">
										<label className="" htmlFor="">
											{__("Class", "post-grid")}
										</label>
										<PGinputText
											value={paginationItemActive?.options?.class}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
											onChange={(newVal) => {
												var optionsX = {
													...paginationItemActive,
													options: {
														...paginationItemActive?.options,
														class: newVal,
													},
												};
												setpaginationItemActive(optionsX);
											}}
										/>
									</div>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={paginationItemActive}
										onChange={(sudoScource, newVal, attr) =>
											onChangeStyle(
												sudoScource,
												newVal,
												attr,
												paginationItemActive,
												setpaginationItemActive
											)
										}
										onAdd={(sudoScource, key) =>
											onAddStyle(
												sudoScource,
												key,
												paginationItemActive,
												setpaginationItemActive
											)
										}
										onRemove={(sudoScource, key) =>
											onRemoveStyle(
												sudoScource,
												key,
												paginationItemActive,
												setpaginationItemActive
											)
										}
										onReset={(sudoSources) =>
											onResetStyle(
												sudoSources,
												paginationItemActive,
												setpaginationItemActive
											)
										}
										onBulkAdd={(sudoSource, cssObj) =>
											onBulkAddStyle(
												sudoSource,
												cssObj,
												paginationItemActive,
												setpaginationItemActive
											)
										}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>
					</PanelBody>


				</>
			)}
		</div>
	);
}

class EditMasonry extends Component {
	constructor(props) {
		super(props);
		this.state = { showWarning: true, isLoaded: false };
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	handleToggleClick() {
		this.setState((state) => ({
			showWarning: !state.showWarning,
		}));
	}

	render() {
		var { onChange, onChangeStyleObj, postData, customerData, addNotifications, setHelp } =
			this.props;

		return (
			<Html
				onChange={onChange}
				onChangeStyleObj={onChangeStyleObj}
				addNotifications={addNotifications}
				postData={postData}
				customerData={customerData}
				setHelp={setHelp}
				warn={this.state.showWarning}
				isLoaded={this.state.isLoaded}
			/>
		);
	}
}

export default EditMasonry;
