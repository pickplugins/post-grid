const { Component, useState, useEffect } = wp.element;
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";

import { PanelRow, Spinner } from "@wordpress/components";
import { Icon, brush, category, close, cog, columns } from "@wordpress/icons";
import PGDropdown from "../dropdown";
import PGinputSelect from "../input-select";
import PGinputText from "../input-text";

import BuilderView from "../../components/BuilderView";
import BuilderWelcome from "../../components/BuilderWelcome";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";

import PostGridList from "./post-grid-list";
import GenerateCss from "./generate-css";
import Help from "./help";
import Notify from "./notify";
import Templates from "./templates";

import SliderDefaultData from "./default-data-carousel";
import FilterableDefaultData from "./default-data-fliterable";
import GridDefaultData from "./default-data-grid";
import MasonryDefaultData from "./default-data-masonry";

import EditGrid from "./edit-grid";
import EditFilterable from "./edit-filterable";
import EditMasonry from "./edit-masonry";
import EditCarousel from "./edit-carousel";


var myStore = wp.data.select('PostGridStore');


function Html(props) {
	if (!props.warn) {
		return null;
	}

	var appData = props.appData;

	var [activePostGrid, setactivePostGrid] = useState(null);
	var [postData, setpostData] = useState({
		ID: null,
		post_content: {},
		post_title: "",
	});
	var [PostGridData, setPostGridData] = useState(postData?.post_content);
	var [globalOptions, setglobalOptions] = useState(PostGridData.globalOptions);

	var [isLoading, setisLoading] = useState(false);
	var [pleaseUpdate, setpleaseUpdate] = useState(false);
	const [optionData, setoptionData] = useState({});
	const [roles, setroles] = useState([]);
	var [needSave, setneedSave] = useState(false);
	var [toggleSettings, settoggleSettings] = useState(false);
	var [listQueryPrams, setlistQueryPrams] = useState({ page: 1, search: "" }); // Using the hook.

	var [styleObj, setstyleObj] = useState({});


	var [notifications, setnotifications] = useState([]);
	var [help, sethelp] = useState({ id: "", enable: false });
	var [customerData, setcustomerData] = useState({ id: "", isPro: false });
	var [isProFeature, setisProFeature] = useState(true);

	var viewTypeArgs = {
		viewGrid: { label: "Grid", value: "viewGrid" },
		viewSlider: {
			label: "Slider/Carousel",
			value: "viewSlider",
		},
		// viewFilterable: {
		// 	label: "Filterable",
		// 	value: "viewFilterable",
		//  isPro: true	
		// },
		viewMasonry: {
			label: "Masonry",
			value: "viewMasonry",
			// isPro: true
		},
		// viewTimeline: {
		// 	label: "Post Timeline",
		// 	value: "viewTimeline",
		// 	// isPro: true
		// },
		// viewTicker: {
		// 	label: "Post Ticker",
		// 	value: "viewTicker",
		// 	// isPro: true
		// },


	};

	function onChangeStyleObj(styleObjPrams) {

		setstyleObj(styleObjPrams)
	}

	useEffect(() => {


	}, [styleObj]);


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


	useEffect(() => {
		setPostGridData(postData.post_content);
	}, [postData]);




	useEffect(() => {

		if (globalOptions?.viewType == "viewGrid") {
			setpostData({ ...postData, post_content: GridDefaultData });
		}
		if (globalOptions?.viewType == "viewSlider") {
			setpostData({ ...postData, post_content: SliderDefaultData });
		}
		if (globalOptions?.viewType == "viewMasonry") {
			setpostData({ ...postData, post_content: MasonryDefaultData });
		}
		if (globalOptions?.viewType == "viewFilterable") {
			setpostData({ ...postData, post_content: FilterableDefaultData });
		}



	}, [globalOptions]);

	useEffect(() => {
		setisLoading(true);

		if (activePostGrid == null) return;

		apiFetch({
			path: "/post-grid/v2/post_grid_data",
			method: "POST",
			data: {
				postId: activePostGrid,
				_wpnonce: post_grid_builder_js._wpnonce,
			},
		}).then((res) => {
			setisLoading(false);


			if (res.post_content == null) {
				res.post_content = GridDefaultData;
			}

			setpostData(res);
		});
	}, [activePostGrid]);

	useEffect(() => {
		setnotifications(notifications);

		const timer = setTimeout(() => {
			setnotifications([]); // Update the debounced value after delay
		}, 5000); // 300ms debounce delay

		return () => clearTimeout(timer); // Cleanup timer on value change or unmount
	}, [notifications]);

	useEffect(() => {
		if (customerData.isPro) {
			setisProFeature(false);
		}
	}, [customerData]);

	function handleAlertConfirmation() {
		if (confirm("Are you sure you want to reset the option data?")) {
			resetOptionData();
		}
	}

	function resetOptionData() {
		setoptionData(optionDataDefault);
	}


	function addNotifications(notification) {
		var notificationsX = [...notifications];
		notificationsX.push(notification);
		setnotifications(notificationsX);
	}
	function setHelp(helpX) {
		sethelp(helpX);
	}

	function selectPostGrid(args) {
		setactivePostGrid(args);
	}

	function onChangePostGrid(args) {


		var postDataX = { ...postData };
		postDataX.post_content = args;
		setpostData(postDataX);



		setPostGridData(args);

		setpleaseUpdate(true);
	}
	function onApplyTemplate(args) {



		var postDataX = { ...postData };
		postDataX.post_content = args;
		setpostData(postDataX);


		setPostGridData(args);

		setpleaseUpdate(true);
	}







	function updateOption() {
		setisLoading(true);
		apiFetch({
			path: "/post-grid/v2/update_options",
			method: "POST",
			data: { name: "post_grid_settings", value: optionData },
		}).then((res) => {
			setisLoading(false);
			if (res.status) {
				setneedSave(false);

				addNotifications({
					title: "Data Saved!",
					content: "You change successfully saved!.",
					type: "success",
				});
			}
		});
	}


	function onSavePostGrid() {
		setisLoading(true);

		var content = PostGridData;


		apiFetch({
			path: "/post-grid/v2/update_post_data",
			method: "POST",
			data: {
				postId: activePostGrid,
				content: content,
				_wpnonce: post_grid_builder_js._wpnonce,
			},
		}).then((res) => {
			setisLoading(false);
			setpleaseUpdate(false);
			addNotifications({
				title: "Data Saved!",
				content: "You change successfully saved!.",
				type: "success",
			});
		});
	}

	useEffect(() => {
		apiFetch({
			path: "/post-grid/v2/user_roles_list",
			method: "POST",
			data: {},
		}).then((res) => {
			var rolesX = [];
			Object.entries(res?.roles).map((role) => {
				var index = role[0];
				var val = role[1];
				rolesX.push({ label: val, value: index });
			});

			setroles(rolesX);
		});
	}, []);

	useEffect(() => {
		setisLoading(true);
		apiFetch({
			path: "/post-grid/v2/get_options",
			method: "POST",
			data: { option: "post_grid_settings" },
		}).then((res) => {
			if (res.length != 0) {
				var resX = { ...res };


				if (resX?.license_key?.length > 0) {
					setcustomerData({ ...customerData, isPro: true });
				}

				setoptionData(resX);
			}
			setisLoading(false);
		});
	}, []);

	function onGenerateCss(css) {



		if (css.length == 0) return;

		var PostGridDataX = { ...PostGridData };
		PostGridDataX.reponsiveCss = escapeHTML(css);
		setPostGridData(PostGridDataX);


	}


	return (
		<div className="pg-setting-input-text pg-dashboard">
			<div className="flex">
				<div className="basis-[380px] w-[380px] h-screen overflow-y-scroll light-scrollbar flex-shrink-0">
					<div className="flex items-center justify-between bg-blue-700 py-3 px-3">
						<div>
							<div className="flex items-center align-middle gap-3">
								<div className="text-xl text-white">Post Grid</div>
								<div className="text-xs text-white flex items-center gap-2">
									{/* <span>2.3.5</span> */}
									<span className="bg-lime-600 px-3 py-1 rounded-md">Beta</span>
								</div>
							</div>
							<div className="text-sm text-white">By PickPlugins</div>
						</div>

						<div>
							<div
								className={`py-1 px-2 cursor-pointer  capitalize  text-white font-medium rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700 ${toggleSettings ? "bg-gray-800" : "bg-gray-500"
									}`}
								onClick={(ev) => {
									settoggleSettings(!toggleSettings);
								}}>
								{isLoading && <Spinner />}
								{!isLoading && (
									<>
										{toggleSettings && <Icon fill={"#fff"} icon={close} />}
										{!toggleSettings && <Icon fill={"#fff"} icon={cog} />}
									</>
								)}
							</div>
						</div>
					</div>

					{toggleSettings && (
						<>
							<div className="relative bg-white">
								<div className="px-4 py-2 bg-slate-400 text-white  ">
									<div className="text-xl text-white mb-4">
										Post Grid Settings
									</div>

									<div className="flex gap-2 items-center">
										<div
											className="bg-amber-500 rounded-sm text-md p-2 px-4 cursor-pointer pg-font text-white "
											onClick={(ev) => {
												handleAlertConfirmation();
											}}>
											{__("Reset", "post-grid")}
										</div>
										<div
											className="bg-green-700 rounded-sm text-md p-2 px-4 cursor-pointer pg-font text-white flex items-center"
											onClick={(ev) => {
												updateOption();
											}}>
											<span>{__("Save", "post-grid")}</span>
											{needSave && (
												<span className="w-5 inline-block h-5 ml-3 rounded-xl text-center bg-red-500">
													!
												</span>
											)}
										</div>
									</div>
								</div>

								<div className="p-3">
									<div className="my-5">
										<label className=" text-base" htmlFor="">
											{__("Allow access by roles", "post-grid")}
										</label>
										<PGinputSelect
											val={optionData?.user_roles ?? []}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[250px]"
											options={roles}
											onChange={(newVal) => {
												var optionsX = {
													...optionData,
													user_roles: newVal,
												};
												setoptionData(optionsX);
											}}
											multiple={true}
										/>
									</div>
									<div className="my-5">
										<label className="text-base" htmlFor="">
											{__("Font-awesome version", "post-grid")}
										</label>
										<PGinputSelect
											val={optionData?.font_aw_version ?? "none"}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[250px]"
											options={[
												{ label: "None", value: "none" },
												{ label: "Version 4+", value: "v_4" },
												{ label: "Version 5+", value: "v_5" },
											]}
											onChange={(newVal) => {
												var optionsX = {
													...optionData,
													font_aw_version: newVal,
												};
												setoptionData(optionsX);
											}}
											multiple={false}
										/>
									</div>

									<div className="my-5">
										<label className="text-base" htmlFor="">
											{__("Enable Post Grid preview", "post-grid")}
										</label>
										<PGinputSelect
											val={optionData?.post_grid_preview ?? "no"}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[250px]"
											options={[
												{ label: "No", value: "no" },
												{ label: "Yes", value: "yes" },
											]}
											onChange={(newVal) => {
												var optionsX = {
													...optionData,
													post_grid_preview: newVal,
												};
												setoptionData(optionsX);
											}}
											multiple={false}
										/>
									</div>

									<div className="my-5">
										<div className="text-base" htmlFor="">
											{__("License Key", "post-grid")}
										</div>

										<PGinputText
											label=""
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[250px]"
											value={optionData?.license_key ?? ""}
											onChange={(newVal) => {
												var optionsX = {
													...optionData,
													license_key: newVal,
												};
												setoptionData(optionsX);
											}}
										/>
									</div>

									<div className="my-3 flex gap-2">

										{/* <div className="bg-slate-700 text-white px-5 py-2 rounded-sm cursor-pointer hover:bg-slate-600">Check License</div> */}
									</div>

								</div>
							</div>
						</>
					)}

					{!toggleSettings && (
						<>
							<PGtabs
								activeTab="post-grid"
								orientation=""
								stickyNavs={true}
								contentClass=" bg-white w-full"
								navItemClass="bg-gray-200 px-5 py-3 gap-2 grow "
								navItemLabelClass="flex-col "
								navItemSelectedClass="!bg-white"
								activeClass="active-tab"
								onSelect={(tabName) => { }}
								tabs={[
									{
										name: "post-grid",
										title: "Post Grid",
										icon: columns,
										className: "tab-disable-blocks",
									},
									{
										name: "edit",
										title: "Edit",
										icon: brush,
										className: "tab-disable-blocks",
									},
									{
										name: "templates",
										title: "Templates",
										icon: category,
										className: "tab-disable-blocks",
									},
								]}>
								<PGtab name="post-grid">
									<div className="relative p-3">
										{postData?.post_content == null && (
											<div className="p-3 my-5 bg-orange-400">
												Please choose an Post Grid first.
											</div>
										)}

										<PostGridList
											addNotifications={addNotifications}
											selectPostGrid={selectPostGrid}
											activePostGrid={activePostGrid}
											setHelp={setHelp}
											listQueryPrams={listQueryPrams}
											setlistQueryPrams={setlistQueryPrams}
										/>
									</div>
								</PGtab>
								<PGtab name="edit">
									{postData?.ID == null && (
										<div className="py-3 px-3">
											<div className="my-3 bg-orange-400 p-3  text-white  text-center animate__animated animate__flash animate__repeat-2">
												Please select post from list.
											</div>
										</div>
									)}

									<div className=" ">
										{postData?.ID != null && (
											<>
												<div className="my-4 p-3">
													<PanelRow>
														<label htmlFor="">View Type?</label>
														<PGDropdown
															position="bottom right"
															variant="secondary"
															buttonTitle={
																postData?.post_content?.globalOptions?.viewType
																	? viewTypeArgs[
																		postData?.post_content?.globalOptions
																			?.viewType
																	]?.label
																	: "Choose"
															}
															options={viewTypeArgs}
															onChange={(option, index) => {



																if (
																	confirm("Data will reset, Please confirm?")
																) {

																	if (option.value == "viewGrid") {
																		setpostData({
																			...postData,
																			post_content: GridDefaultData,
																		});
																	}
																	if (option.value == "viewSlider") {
																		setpostData({
																			...postData,
																			post_content:
																				SliderDefaultData,
																		});
																	}
																	if (option.value == "viewFilterable") {
																		setpostData({
																			...postData,
																			post_content:
																				FilterableDefaultData,
																		});
																	}
																	if (option.value == "viewMasonry") {
																		setpostData({
																			...postData,
																			post_content:
																				MasonryDefaultData,
																		});
																	}

																}
															}}
															values=""></PGDropdown>
													</PanelRow>
												</div>


												{postData.post_content.globalOptions?.viewType ==
													"viewGrid" && (
														<EditGrid
															onChange={onChangePostGrid}
															addNotifications={addNotifications}
															postData={postData}
															customerData={customerData}
															setHelp={setHelp}
															onChangeStyleObj={onChangeStyleObj}

														/>
													)}
												{postData.post_content.globalOptions?.viewType ==
													"viewSlider" && (
														<EditCarousel
															onChange={onChangePostGrid}
															addNotifications={addNotifications}
															postData={postData}
															customerData={customerData}
															setHelp={setHelp}
															onChangeStyleObj={onChangeStyleObj}

														/>
													)}
												{postData.post_content.globalOptions?.viewType ==
													"viewMasonry" && (
														<EditMasonry
															onChange={onChangePostGrid}
															addNotifications={addNotifications}
															postData={postData}
															customerData={customerData}
															setHelp={setHelp}
															onChangeStyleObj={onChangeStyleObj}

														/>
													)}
												{postData.post_content.globalOptions?.viewType ==
													"viewFilterable" && (
														<EditFilterable
															onChange={onChangePostGrid}
															addNotifications={addNotifications}
															postData={postData}
															customerData={customerData}
															setHelp={setHelp}
															onChangeStyleObj={onChangeStyleObj}

														/>
													)}






											</>
										)}
									</div>
								</PGtab>
								<PGtab name="templates">
									{postData?.ID == null && (
										<div className="py-3 px-3">
											<div className="my-3 bg-orange-400 p-3  text-white  text-center animate__animated animate__flash animate__repeat-2">
												Please select post from list.
											</div>
										</div>
									)}

									<Templates
										onChange={onChangePostGrid}
										onApplyTemplate={onApplyTemplate}
										addNotifications={addNotifications}
										postData={postData}
										customerData={customerData}
										setHelp={setHelp}
									/>
								</PGtab>
							</PGtabs>
						</>
					)}
				</div>
				<div className="w-full  top-0 overflow-y-scroll">
					<div className="  relative">
						<div className="my-3 hidden bg-orange-400 p-3 ml-5 text-white  text-center animate__animated animate__flash animate__repeat-2">
							<div className="text-xl">
								<i class="fa-solid fa-triangle-exclamation"></i> Please test the
								Post Grid Builder and
								<span
									className="font-bold cursor-pointer underline"
									onClick={(ev) => {
										settoggleSettings(!toggleSettings);
									}}>
									send us feedbacks.
								</span>
							</div>
							<div>
								Please do not use for old Post Grid, we will add migration
								later.
							</div>
						</div>



						{(postData?.ID == null || toggleSettings) && (
							<BuilderWelcome
								appData={appData}
								addNotifications={addNotifications}
								customerData={customerData}
							/>
						)}



						{!toggleSettings && postData?.ID != null && (
							<BuilderView
								pleaseUpdate={pleaseUpdate}
								onSavePostGrid={onSavePostGrid}
								isLoading={isLoading}
								onChangePostGrid={onChangePostGrid}
								postData={postData}
								id={activePostGrid}
								settoggleSettings={settoggleSettings}
								customerData={customerData}
								addNotifications={addNotifications}
								setHelp={setHelp}
							/>
						)}




					</div>
				</div>
			</div>

			<Notify notifications={notifications} />
			<Help help={help} />
			<GenerateCss styleObj={styleObj} onGenerateCss={onGenerateCss} reponsiveCss={PostGridData.reponsiveCss} />

		</div>
	);
}

class Builder extends Component {
	constructor(props) {
		super(props);
		this.state = { showWarning: true };
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	handleToggleClick() {
		this.setState((state) => ({
			showWarning: !state.showWarning,
		}));
	}

	render() {
		var { onChange, appData } = this.props;

		return <Html appData={appData} warn={this.state.showWarning} />;
	}
}

export default Builder;
