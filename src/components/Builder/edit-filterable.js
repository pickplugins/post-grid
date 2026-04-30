const { Component, RawHTML, useState, useEffect } = wp.element;
import apiFetch from "@wordpress/api-fetch";
import { store as coreStore } from "@wordpress/core-data";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import { ReactSortable } from "react-sortablejs";

import { MediaUpload, RichText } from "@wordpress/block-editor";
import {
	Button,
	DateTimePicker,
	Icon,
	__experimentalInputControl as InputControl,
	PanelBody,
	PanelRow,
	Popover,
	SelectControl,
	Spinner,
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
	pages,
	settings,
	starEmpty,
	starFilled,
} from "@wordpress/icons";
import breakPoints from "../../breakpoints";
import { popupEntranceAnimateBasic } from "../../inAnimation";
import { popupCloseAnimateBasic } from "../../outAnimation";
import PGDropdown from "../dropdown";
import PGIconPicker from "../icon-picker";
import PGinputSelect from "../input-select";
import PGinputText from "../input-text";
import InputToggle from "../input-toggle";
import WPEditor from "../input-wp-editor";
import PostGridItems from "../items";

import PGStyles from "../styles";
import PGtab from "../tab";
import PGtabs from "../tabs";
import Layouts from "./layouts";
import LayoutGenerator from "../layout-generator";

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
	var [loopLayout, setloopLayout] = useState(PostGridData.loopLayout);

	var [wrapper, setwrapper] = useState(PostGridData.wrapper);
	var [items, setitems] = useState(PostGridData.items);
	var [itemsWrap, setitemsWrap] = useState(PostGridData.itemsWrap);
	var [itemWrap, setitemWrap] = useState(PostGridData.itemWrap);

	var [paginationWrap, setpaginationWrap] = useState(PostGridData.paginationWrap);
	var [paginationItem, setpaginationItem] = useState(PostGridData.paginationItem);
	var [paginationItemActive, setpaginationItemActive] = useState(PostGridData.paginationItemActive
	);
	var [editLayouts, seteditLayouts] = useState(false);

	var [debounce, setDebounce] = useState(null); // Using the hook.

	var [isBusy, setIsBusy] = useState(false);
	const [filterableTerms, setFilterableTerms] = useState([]);

	var [filterItem, setfilterItem] = useState(PostGridData.filterItem);
	var [activeFilter, setactiveFilter] = useState(PostGridData.activeFilter);
	var [filterGroupWrap, setfilterGroupWrap] = useState(
		PostGridData.filterGroupWrap
	);
	var [filterGroup, setfilterGroup] = useState(PostGridData.filterGroup);
	var [filterGroupTitle, setfilterGroupTitle] = useState(PostGridData.filterGroupTitle);

	var [topWrap, settopWrap] = useState(PostGridData.topWrap);
	var [activeNavItem, setactiveNavItem] = useState(
		PostGridData?.activeNavItem
	);

	var [styleObj, setstyleObj] = useState({});
	var [customerData, setcustomerData] = useState(props.customerData);

	var [isProFeature, setisProFeature] = useState(true);

	var wrapperSelector = "#post-grid-" + postData.ID;
	var itemsWrapSelector = wrapperSelector + " > .items";
	var itemWrapSelector = wrapperSelector + " > .items > .item";
	var paginationWrapSelector = wrapperSelector + " > .pagination";
	var paginationItemSelector = wrapperSelector + " > .pagination .page-numbers";
	var paginationItemActiveSelector = wrapperSelector + " > .pagination .page-numbers.mixitup-control-active";

	var filterItemSelector = wrapperSelector + " .pg-filter";
	var activeFilterSelector = wrapperSelector + " .mixitup-control-active ";
	var filterGroupWrapSelector = wrapperSelector + " .filterable-group-wrap";
	var filterGroupSelector = wrapperSelector + " .filterable-group";
	var filterGroupTitleSelector = wrapperSelector + " .filterable-group-title";



	const paginationTypes = {
		none: {
			label: __("None", "post-grid"),
			value: "none"
		},

		filterable: {
			label: __("Filterable", "post-grid"),
			value: "filterable"
		},
	};


	var breakPointList = [{ label: "Select..", icon: "", value: "" }];
	for (var x in breakPoints) {
		var breakPointItem = breakPoints[x];
		breakPointList.push({
			label: breakPointItem.name,
			icon: breakPointItem.icon,
			value: breakPointItem.id,
		});
	}



	useEffect(() => {

		if (Object.entries(styleObj).length > 0) {
			onChangeStyleObj(styleObj)
		}

	}, [styleObj]);


	useEffect(() => {

		var styles = generateStyleObj()
		setstyleObj(styles)

	}, [PostGridData]);



	useEffect(() => {
		if (customerData.isPro) {
			setisProFeature(false);
		}
	}, [props.customerData]);

	useEffect(() => {
		onChange(PostGridData);
	}, [PostGridData]);

	useEffect(() => {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.globalOptions = globalOptions;
		setPostGridData(PostGridDataX);
	}, [globalOptions]);

	useEffect(() => {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.itemQueryArgs = itemQueryArgs;
		setPostGridData(PostGridDataX);
	}, [itemQueryArgs]);

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
		PostGridDataX.items = items;
		setPostGridData(PostGridDataX);
	}, [items]);

	useEffect(() => {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.wrapper = wrapper;
		setPostGridData(PostGridDataX);
	}, [wrapper]);

	useEffect(() => {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.filterItem = filterItem;
		setPostGridData(PostGridDataX);
	}, [filterItem]);

	useEffect(() => {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.activeFilter = activeFilter;
		setPostGridData(PostGridDataX);
	}, [activeFilter]);

	useEffect(() => {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.filterGroupWrap = filterGroupWrap;
		setPostGridData(PostGridDataX);
	}, [filterGroupWrap]);

	useEffect(() => {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.filterGroup = filterGroup;
		setPostGridData(PostGridDataX);
	}, [filterGroup]);

	useEffect(() => {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.filterGroupTitle = filterGroupTitle;
		setPostGridData(PostGridDataX);
	}, [filterGroupTitle]);






	useEffect(() => {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.activeNavItem = activeNavItem;
		setPostGridData(PostGridDataX);
	}, [activeNavItem]);


	useEffect(() => {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.loopLayout = loopLayout;
		setPostGridData(PostGridDataX);
	}, [loopLayout]);


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


	function fetchPostTypeTerms(keyword) {
		var postTypes = [];
		var terms = [];
		setIsBusy(true);
		setFilterableTerms([]);

		console.log(itemQueryArgs)
		// itemQueryArgs.map((x) => {
		// 	if (x.id == "postType") {
		// 		postTypes.push(x.val);
		// 	}
		// });

		postTypes = itemQueryArgs.postType.value

		apiFetch({
			path: "/post-grid/v2/get_tax_terms",
			method: "POST",
			data: { search: keyword, postTypes: postTypes },
		}).then((res) => {
			//setFilterablTerms(res);
			res.length > 0 &&
				res.map((y) => {
					terms.push(y);
				});
			console.log(terms)

			setFilterableTerms(terms);
			setIsBusy(false);
		});


		// var sss = apiFetch({
		// 	path: "/post-grid/v2/post_type_objects",
		// 	method: "POST",
		// 	data: { postTypes: postTypes[0], search: keyword },
		// }).then((result) => {
		// 	//setFilterablTerms(result);


		// 	result.length > 0 &&
		// 		result.map((x) => {
		// 			apiFetch({
		// 				path: "/post-grid/v2/get_tax_terms",
		// 				method: "POST",
		// 				data: { taxonomy: x.id, search: keyword, postTypes: postTypes },
		// 			}).then((res) => {
		// 				//setFilterablTerms(res);
		// 				res.length > 0 &&
		// 					res.map((y) => {
		// 						terms.push(y);
		// 					});
		// 				console.log(terms)

		// 				setFilterableTerms(terms);
		// 				setIsBusy(false);
		// 			});
		// 		});
		// 	//return result;
		// });
	}



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

		var filterItemX = { ...PostGridData.filterItem }
		var filterItemStyles = myStore.deletePropertyDeep(filterItemX, ['options']);
		styleObjX[filterItemSelector] = filterItemStyles

		var activeFilterX = { ...PostGridData.activeFilter }
		var activeFilterStyles = myStore.deletePropertyDeep(activeFilterX, ['options']);
		styleObjX[activeFilterSelector] = activeFilterStyles

		var filterGroupWrapX = { ...PostGridData.filterGroupWrap }
		var filterGroupWrapStyles = myStore.deletePropertyDeep(filterGroupWrapX, ['options']);
		styleObjX[filterGroupWrapSelector] = filterGroupWrapStyles

		var filterGroupX = { ...PostGridData.filterGroup }
		var filterGroupStyles = myStore.deletePropertyDeep(filterGroupX, ['options']);
		styleObjX[filterGroupSelector] = filterGroupStyles

		var filterGroupTitleX = { ...PostGridData.filterGroupTitle }
		var filterGroupTitleStyles = myStore.deletePropertyDeep(filterGroupTitleX, ['options']);
		styleObjX[filterGroupTitleSelector] = filterGroupTitleStyles






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





	function onChangeLayouts(loopLayout) {

		console.log(loopLayout);


		var PostGridDataX = { ...PostGridData };
		PostGridDataX.loopLayout = loopLayout;
		setPostGridData(PostGridDataX);

		setloopLayout(loopLayout);
	}

	useEffect(() => {
		var PostGridDataX = { ...PostGridData };
		PostGridDataX.topWrap = topWrap;
		setPostGridData(PostGridDataX);
	}, [topWrap]);


	const pasteData = () => {
		navigator.clipboard
			.readText()
			.then((text) => {
				const parsedData = JSON.parse(text);

				console.log(parsedData)

				var globalOptionsX = { ...globalOptions, filters: parsedData };

				setglobalOptions(globalOptionsX);


			})
			.catch((err) => {

			});
	};


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
						<div className="flex flex-wrap gap-2 items-center justify-start">
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
										var datax = JSON.parse(data);
										onChangeLayouts(datax).then(() => {
											addNotifications({
												title: "Layout Pasted!",
												content: "Layout paste successful.",
												type: "success",
											});
										});
									} catch (e) {
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
						title={__("Filters", "post-grid")}
						initialOpen={false}>
						<div>

							<div className="flex items-center justify-center gap-3 mb-4 ">

								<div
									className="components-button undefined pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-800 !text-white font-medium !rounded hover:!bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700"
									onClick={(ev) => {

										if (!customerData.isPro && globalOptions.filters.length > 1) {
											addNotifications({
												title: "Ooops Its Pro!",
												content: "Adding Multiple group on avilable in pro.",
												type: "error",
											});
											return;
										}

										var filters = globalOptions.filters.concat({
											groupTitle: "",
											type: "",
											logic: "",
											showPostCount: "",
											items: [],
										});
										var globalOptionsX = { ...globalOptions, filters: filters };

										setglobalOptions(globalOptionsX);

									}}>
									{__("Add Filter Group", "post-grid")}
								</div>

								<div
									className=" components-button undefined pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-800 !text-white font-medium !rounded hover:!bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700 "


									onClick={() => {

										navigator.clipboard
											.writeText(JSON.stringify(globalOptions.filters))
											.then(() => {
												addNotifications({
													title: "Copied to clipboard!",
													content: "Filters Copied!",
													type: "success",
												});
											});
									}}

								>
									<Icon icon={copy} className="fill-white " size={14} />
									{__("Copy", "post-grid")}
								</div>
								<div
									className=" components-button undefined pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-800 !text-white font-medium !rounded hover:!bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700 "
									onClick={() => {

										pasteData();
									}}

								// onClick={async () => {
								// 									try {
								// 										var data = await navigator.clipboard.readText();
								// 										var datax = JSON.parse(data);
								// 										onChangeLayouts(datax).then(() => {
								// 											addNotifications({
								// 												title: "Layout Pasted!",
								// 												content: "Layout paste successful.",
								// 												type: "success",
								// 											});
								// 										});
								// 									} catch (e) {
								// 									}
								// 								}}

								>
									<Icon icon={pages} className="fill-white " size={14} />
									{__("Paste", "post-grid")}
								</div>
							</div>

							{globalOptions?.filters?.map((x, i) => {
								return (
									<PanelBody
										title={
											<>
												<span
													onClick={(ev) => {
														globalOptions.filters.splice(i, 1);
														var globalOptionsX = {
															...globalOptions,
															filters: globalOptions.filters,
														};
														setglobalOptions(globalOptionsX);
													}}
													className="hover:bg-red-500 bg-red-400 py-1 px-[10px] text-lg leading-normal cursor-pointer mr-2 ">
													{/* <span className="dashicon  dashicons-no-alt"></span>
												{__("Delete Group", "post-grid")} */}
													&times;
												</span>
												{x.groupTitle ? x.groupTitle : "Filter Group " + i}
											</>
										}
										initialOpen={false}>
										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Group Title", "post-grid")}
											</label>
											<InputControl
												value={x.groupTitle}
												onChange={(newVal) => {
													globalOptions.filters[i].groupTitle = newVal;
													var globalOptionsX = {
														...globalOptions,
														filters: globalOptions.filters,
													};
													setglobalOptions(globalOptionsX);
												}}
											/>
										</PanelRow>
										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Group Type", "post-grid")}
											</label>
											<SelectControl
												value={x.type}
												options={[
													{ value: "inline", label: "Inline" },
													{ value: "dropdown", label: "Dropdown" },
													{ value: "radio", label: "Radio" },
													{ value: "checkbox", label: "Checkbox" },
												]}
												onChange={(newVal) => {
													globalOptions.filters[i].type = newVal;
													var globalOptionsX = {
														...globalOptions,
														filters: globalOptions.filters,
													};
													setglobalOptions(globalOptionsX);
												}}
											/>
										</PanelRow>
										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Data Logic", "post-grid")}
											</label>
											<SelectControl
												value={x.logic}
												options={[
													{ value: "or", label: "OR" },
													{ value: "and", label: "AND" },
												]}
												onChange={(newVal) => {
													globalOptions.filters[i].logic = newVal;
													var globalOptionsX = {
														...globalOptions,
														filters: globalOptions.filters,
													};
													setglobalOptions(globalOptionsX);
												}}
											/>
										</PanelRow>
										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Show Post Count", "post-grid")}
											</label>
											<SelectControl
												value={x.showPostCount}
												options={[
													{ value: "no", label: "No" },
													{ value: "yes", label: "Yes" },
												]}
												onChange={(newVal) => {
													globalOptions.filters[i].showPostCount = newVal;
													var globalOptionsX = {
														...globalOptions,
														filters: globalOptions.filters,
													};
													setglobalOptions(globalOptionsX);
												}}
											/>
										</PanelRow>
										<label
											for=""
											className="font-medium text-slate-900 my-3 ">
											{__("Search Terms", "post-grid")}
										</label>
										<p>
											{
												__("To add custom filter please use following format and hit Enter",
													"post-grid")
											}
										</p>
										<code>Filter Name|filter-slug|15</code>
										<InputControl
											autoComplete="off"
											className="my-3"
											placeholder="Search Categories or terms"
											value=""
											onKeyPress={(ev) => {
												if (ev.key === "Enter") {
													var filterParts = ev.target.value.split("|");
													var ss = globalOptions.filters[i].items.concat({
														id: 0,
														slug: filterParts[1],
														title: filterParts[0],
														count: filterParts[2],
													});
													globalOptions.filters[i].items = ss;
													var globalOptionsX = {
														...globalOptions,
														filters: globalOptions.filters,
													};
													setglobalOptions(globalOptionsX);
												}
											}}
											onChange={(newVal) => {
												clearTimeout(debounce);
												debounce = setTimeout(() => {
													if (newVal.length > 0) {
														fetchPostTypeTerms(newVal);
													}
												}, 2000);
											}}
										/>
										{x.items.length == 0 && (
											<div className="my-1">
												{__("No terms added.", "post-grid")}
											</div>
										)}
										{x.items.map((y, j) => {
											return (
												<div className="py-2 my-1 border-b border-gray-400 flex justify-between">
													<div>{y.title}</div>
													<div>
														<span
															onClick={(ev) => {
																var globalOptionsX = {
																	...activeFilter.options,
																	slug:
																		activeFilter.options.slug == y.slug
																			? ""
																			: y.slug,
																};


																setglobalOptions(globalOptionsX);

															}}
															className={[
																activeFilter.options.slug == y.slug
																	? "bg-gray-700 hover:bg-gray-600 cursor-pointer p-1   text-white  text-sm"
																	: "bg-gray-400 cursor-pointer p-1   text-white  text-sm",
															]}>
															<span className="dashicons dashicons-yes-alt"></span>
														</span>
														<span
															onClick={(ev) => {
																globalOptions.filters[i].items.splice(
																	j,
																	1
																);
																var globalOptionsX = {
																	...globalOptions,
																	filters: globalOptions.filters,
																};


																setglobalOptions(globalOptionsX);

															}}
															className="cursor-pointer p-1  text-white bg-red-600 text-sm">
															<span className="dashicon dashicons dashicons-no-alt"></span>
														</span>
													</div>
												</div>
											);
										})}

										{isBusy && (
											<div className="border-b border-gray-400 my-2 pb-1 bg-gray-200 p-2">
												<Spinner />
											</div>
										)}
										{filterableTerms.length > 0 && (
											<div className="bg-gray-200 p-2 mt-2">
												{filterableTerms.map((x) => {
													return (
														<div
															title="Click Add terms"
															className="border-b border-gray-400 my-2 pb-1 cursor-pointer"
															onClick={(ev) => {
																if (x.slug) {
																	var ss = globalOptions.filters[
																		i
																	].items.concat({
																		id: x.term_id,
																		slug: x.slug,
																		title: x.name,
																		count: x.count,
																	});
																	globalOptions.filters[i].items = ss;
																	var globalOptionsX = {
																		...globalOptions,
																		filters: globalOptions.filters,
																	};


																	setglobalOptions(globalOptionsX);

																}
															}}>
															{x.name} ({x.count})
														</div>
													);
												})}
											</div>
										)}
									</PanelBody>
								);
							})}
						</div>
						<PanelRow>
							<label htmlFor="" className="font-medium text-slate-900 ">
								{__("Enable Multifilter", "post-grid")}
							</label>
							<SelectControl
								label=""
								value={globalOptions.multifilter}
								options={[
									{ label: __("True", "post-grid"), value: true },
									{ label: "False", value: false },
								]}
								onChange={(newVal) => {

									if (!customerData.isPro) {
										addNotifications({
											title: "Ooops Its Pro!",
											content: "Multifilter only avilable in pro.",
											type: "error",
										});
										return;
									}

									var globalOptionsX = {
										...globalOptions,
										multifilter: newVal,
									};
									setglobalOptions(globalOptionsX);
								}}
							/>
						</PanelRow>
						<PanelRow>
							<label htmlFor="" className="font-medium text-slate-900 ">
								{__("Enable Filter Toggle", "post-grid")}
							</label>
							<SelectControl
								label=""
								value={globalOptions.filterToggle}
								options={[
									{ label: "Yes", value: "yes" },
									{ label: "No", value: "no" },
								]}
								onChange={(newVal) => {

									if (!customerData.isPro) {
										addNotifications({
											title: "Ooops Its Pro!",
											content: "Filter Toggle Only avilable in pro.",
											type: "error",
										});
										return;
									}


									var globalOptionsX = {
										...globalOptions,
										filterToggle: newVal,
									};


									setglobalOptions(globalOptionsX);


								}}
							/>
						</PanelRow>
						{globalOptions.multifilter && (
							<>
								<PanelRow>
									<label htmlFor="" className="font-medium text-slate-900 ">
										{__("Logic Within Group", "post-grid")}
									</label>
									<SelectControl
										label=""
										value={globalOptions.logicWithinGroup}
										options={[
											{ label: "OR", value: "or" },
											{ label: "AND", value: "and" },
										]}
										onChange={(newVal) => {

											if (!customerData.isPro) {
												addNotifications({
													title: "Ooops Its Pro!",
													content: "Multifilter Only avilable in pro.",
													type: "error",
												});
												return;
											}


											var globalOptionsX = {
												...globalOptions,
												logicWithinGroup: newVal,
											};

											setglobalOptions(globalOptionsX);
										}}
									/>
								</PanelRow>
								<PanelRow>
									<label htmlFor="" className="font-medium text-slate-900 ">
										{__("Logic Between Groups", "post-grid")}
									</label>
									<SelectControl
										label=""
										value={globalOptions.logicBetweenGroups}
										options={[
											{ label: "OR", value: "or" },
											{ label: "AND", value: "and" },
										]}
										onChange={(newVal) => {

											if (!customerData.isPro) {
												addNotifications({
													title: "Ooops Its Pro!",
													content: "Multifilter Only avilable in pro.",
													type: "error",
												});
												return;
											}


											var globalOptionsX = {
												...globalOptions,
												logicBetweenGroups: newVal,
											};
											setglobalOptions(globalOptionsX);
										}}
									/>
								</PanelRow>
							</>
						)}
						<PanelRow>
							<label htmlFor="" className="font-medium text-slate-900 ">
								{__("Show Sort Filter", "post-grid")}
							</label>
							<SelectControl
								label=""
								value={globalOptions.showSort}
								options={[
									{ label: "No", value: "no" },
									{ label: "Yes", value: "yes" },
								]}
								onChange={(newVal) => {

									if (!customerData.isPro) {
										addNotifications({
											title: "Ooops Its Pro!",
											content: "Multifilter Only avilable in pro.",
											type: "error",
										});
										return;
									}


									var globalOptionsX = { ...globalOptions, showSort: newVal };
									setglobalOptions(globalOptionsX);
								}}
							/>
						</PanelRow>
						<PanelRow>
							<label htmlFor="" className="font-medium text-slate-900 ">
								{__("Show Random Filter", "post-grid")}
							</label>
							<SelectControl
								label=""
								value={globalOptions.showRandom}
								options={[
									{ label: "No", value: "no" },
									{ label: "Yes", value: "yes" },
								]}
								onChange={(newVal) => {

									if (!customerData.isPro) {
										addNotifications({
											title: "Ooops Its Pro!",
											content: "Multifilter Only avilable in pro.",
											type: "error",
										});
										return;
									}


									var globalOptionsX = { ...globalOptions, showRandom: newVal };
									setglobalOptions(globalOptionsX);
								}}
							/>
						</PanelRow>
						<PanelRow>
							<label htmlFor="" className="font-medium text-slate-900 ">
								{__("Show Clear Filter", "post-grid")}
							</label>
							<SelectControl
								label=""
								value={globalOptions.showClear}
								options={[
									{ label: "No", value: "no" },
									{ label: "Yes", value: "yes" },
								]}
								onChange={(newVal) => {

									if (!customerData.isPro) {
										addNotifications({
											title: "Ooops Its Pro!",
											content: "Multifilter Only avilable in pro.",
											type: "error",
										});
										return;
									}

									var globalOptionsX = { ...globalOptions, showClear: newVal };
									setglobalOptions(globalOptionsX);
								}}
							/>
						</PanelRow>
						<PanelRow>
							<label htmlFor="" className="font-medium text-slate-900 ">
								{__("Show All Filter", "post-grid")}
							</label>
							<SelectControl
								label=""
								value={globalOptions.showAll}
								options={[
									{ label: "No", value: "no" },
									{ label: "Yes", value: "yes" },
								]}
								onChange={(newVal) => {
									var globalOptionsX = { ...globalOptions, showAll: newVal };
									setglobalOptions(globalOptionsX);
								}}
							/>
						</PanelRow>
						<PanelRow>
							<label>{__("Items Per Page", "post-grid")}</label>
							<InputControl
								type="number"
								value={
									globalOptions.perPage != undefined
										? globalOptions.perPage
										: 6
								}
								onChange={(newVal) => {
									var globalOptionsX = { ...globalOptions, perPage: newVal };
									setglobalOptions(globalOptionsX);
								}}
							/>
						</PanelRow>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title={__("Filters Style", "post-grid")}
						initialOpen={false}>

						<PanelBody
							className="font-medium text-slate-900 "
							title={__("Filter Item", "post-grid")}
							initialOpen={false}>

							<PGStyles
								obj={filterItem}
								onChange={(sudoScource, newVal, attr) =>
									onChangeStyle(
										sudoScource,
										newVal,
										attr,
										filterItem,
										setfilterItem
									)
								}
								onAdd={(sudoScource, key) =>
									onAddStyle(sudoScource, key, filterItem, setfilterItem)
								}
								onRemove={(sudoScource, key) =>
									onRemoveStyle(sudoScource, key, filterItem, setfilterItem)
								}
								onReset={(sudoSources) =>
									onResetStyle(sudoSources, filterItem, setfilterItem)
								}
								onBulkAdd={(sudoSource, cssObj) =>
									onBulkAddStyle(
										sudoSource,
										cssObj,
										filterItem,
										setfilterItem
									)
								}
							/>

						</PanelBody>
						<PanelBody
							className="font-medium text-slate-900 "
							title={__("Active Filter", "post-grid")}
							initialOpen={false}>

							<PGStyles
								obj={activeFilter}
								onChange={(sudoScource, newVal, attr) =>
									onChangeStyle(
										sudoScource,
										newVal,
										attr,
										activeFilter,
										setactiveFilter
									)
								}
								onAdd={(sudoScource, key) =>
									onAddStyle(sudoScource, key, activeFilter, setactiveFilter)
								}
								onRemove={(sudoScource, key) =>
									onRemoveStyle(sudoScource, key, activeFilter, setactiveFilter)
								}
								onReset={(sudoSources) =>
									onResetStyle(sudoSources, activeFilter, setactiveFilter)
								}
								onBulkAdd={(sudoSource, cssObj) =>
									onBulkAddStyle(
										sudoSource,
										cssObj,
										activeFilter,
										setactiveFilter
									)
								}
							/>

						</PanelBody>
						<PanelBody
							className="font-medium text-slate-900 "
							title={__("Filter Group Wrap", "post-grid")}
							initialOpen={false}>

							<PGStyles
								obj={filterGroupWrap}
								onChange={(sudoScource, newVal, attr) =>
									onChangeStyle(
										sudoScource,
										newVal,
										attr,
										filterGroupWrap,
										setfilterGroupWrap
									)
								}
								onAdd={(sudoScource, key) =>
									onAddStyle(
										sudoScource,
										key,
										filterGroupWrap,
										setfilterGroupWrap
									)
								}
								onRemove={(sudoScource, key) =>
									onRemoveStyle(
										sudoScource,
										key,
										filterGroupWrap,
										setfilterGroupWrap
									)
								}
								onReset={(sudoSources) =>
									onResetStyle(sudoSources, filterGroupWrap, setfilterGroupWrap)
								}
								onBulkAdd={(sudoSource, cssObj) =>
									onBulkAddStyle(
										sudoSource,
										cssObj,
										filterGroupWrap,
										setfilterGroupWrap
									)
								}
							/>

						</PanelBody>
						<PanelBody
							className="font-medium text-slate-900 "
							title={__("Filter Group", "post-grid")}
							initialOpen={false}>

							<PGStyles
								obj={filterGroup}
								onChange={(sudoScource, newVal, attr) =>
									onChangeStyle(
										sudoScource,
										newVal,
										attr,
										filterGroup,
										setfilterGroup
									)
								}
								onAdd={(sudoScource, key) =>
									onAddStyle(sudoScource, key, filterGroup, setfilterGroup)
								}
								onRemove={(sudoScource, key) =>
									onRemoveStyle(sudoScource, key, filterGroup, setfilterGroup)
								}
								onReset={(sudoSources) =>
									onResetStyle(sudoSources, filterGroup, setfilterGroup)
								}
								onBulkAdd={(sudoSource, cssObj) =>
									onBulkAddStyle(sudoSource, cssObj, filterGroup, setfilterGroup)
								}
							/>

						</PanelBody>
						<PanelBody
							className="font-medium text-slate-900 "
							title={__("Filter Group Title", "post-grid")}
							initialOpen={false}>

							<PGStyles
								obj={filterGroupTitle}
								onChange={(sudoScource, newVal, attr) =>
									onChangeStyle(
										sudoScource,
										newVal,
										attr,
										filterGroupTitle,
										setfilterGroup
									)
								}
								onAdd={(sudoScource, key) =>
									onAddStyle(sudoScource, key, filterGroupTitle, setfilterGroup)
								}
								onRemove={(sudoScource, key) =>
									onRemoveStyle(sudoScource, key, filterGroupTitle, setfilterGroup)
								}
								onReset={(sudoSources) =>
									onResetStyle(sudoSources, filterGroupTitle, setfilterGroup)
								}
								onBulkAdd={(sudoSource, cssObj) =>
									onBulkAddStyle(sudoSource, cssObj, filterGroupTitle, setfilterGroup)
								}
							/>

						</PanelBody>

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
								options={paginationTypes}
								buttonTitle={
									paginationTypes[globalOptions?.pagination?.type] !=
										undefined
										? paginationTypes[globalOptions.pagination.type].label
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
						{/* <div className="flex  my-5  justify-between items-center">
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
						</div> */}
						{/* 
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
						</PanelRow> */}
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

class EditFilterable extends Component {
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

export default EditFilterable;
