
const { Component, RawHTML, useState, useEffect } = wp.element;
import { RichText } from '@wordpress/block-editor'
import { __ } from "@wordpress/i18n";

import {
	Icon, settings, cloud, plus, post, close,
	help as helpIcon,
} from "@wordpress/icons";
import { ReactSortable } from "react-sortablejs";
import {
	PanelBody,
	RangeControl,
	Button,
	ButtonGroup,
	Panel,
	PanelRow,
	Dropdown,
	DropdownMenu,
	SelectControl,
	ColorPicker,
	ColorPalette,
	ToolsPanelItem,
	ComboboxControl,
	Spinner,
	ToggleControl,
	CustomSelectControl,
	Popover,
	__experimentalInputControl as InputControl,
} from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";
import { Splide, SplideTrack } from "@splidejs/react-splide";
import PGinputText from "../input-text";

import PGDropdown from '../../components/dropdown'


var myStore = wp.data.select("PostGridStore");

function Html(props) {

	if (!props.warn) {
		return null;
	}

	var addNotifications = props.addNotifications;


	if (!props?.postData?.post_content?.globalOptions?.viewType) {
		addNotifications({
			title: "Opps item missing",
			content: "Please select post first.",
			type: "error",
		});
		return null;
	}



	var onApplyTemplate = props.onApplyTemplate;
	var setHelp = props.setHelp;

	var [postData, setpostData] = useState(props.postData);
	var [PostGridData, setPostGridData] = useState(postData.post_content);
	var [isLoading, setisLoading] = useState(false);
	var [isProFeature, setisProFeature] = useState(true);
	var [customerData, setcustomerData] = useState(props.customerData);

	var postId = postData.ID;

	var [templates, settemplates] = useState([]);
	const [queryLayouts, setqueryLayouts] = useState({
		keyword: "",
		price: "",
		viewType: postData.post_content.globalOptions.viewType == undefined ? "viewGrid" : postData.post_content.globalOptions.viewType,
		page: 1,
	});



	useEffect(() => {
		if (customerData.isPro) {
			setisProFeature(false);
		}
	}, [props.customerData]);

	useEffect(() => {
		setisLoading(true);
		var requestData = {
			keyword: queryLayouts.keyword,
			page: queryLayouts.page,
			price: queryLayouts.price,
			viewType: queryLayouts.viewType,
		};
		requestData = JSON.stringify(requestData);
		fetch(
			"https://demo.pickplugins.com/post-grid/wp-json/post-grid/v2/get_posts_post_grid",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: requestData,
			}
		)
			.then((response) => {
				if (response.ok && response.status < 400) {
					response.json().then((data) => {

						var posts = data?.posts;

						var postsX = [];


						posts.map(item => {

							postsX.push({

								label: item.post_title,
								thumb: item.thumb,
								isPro: item?.is_pro == "yes" ? true : false,
								data: item.post_content
							})

							settemplates(postsX);

						})
						setisLoading(false);


					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});


	}, []);





	return (
		<div className="max-h-screen overflow-y-scroll">
			<div className="p-3">
				<p className="flex items-center gap-2">
					How templates work.
					<span
						className="cursor-pointer"
						title="Click to know more"
						onClick={() => {
							setHelp({
								id: "templatesHelp",
								enable: true,
							});
						}}>
						<Icon icon={helpIcon} />
					</span>
				</p>

				<div className="my-4  items-center hidden gap-3">
					<PGinputText
						value={queryLayouts.keyword}
						placeholder={"Search..."}
						className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
						onChange={(newVal) => {
							var queryLayoutsX = { ...queryLayouts };
							queryLayoutsX.keyword = newVal;
							setqueryLayouts(queryLayoutsX);

						}}
					/>
					<SelectControl
						label=""
						value={queryLayouts.price}
						options={[
							{
								label: __("Free/Pro", "post-grid"),
								value: "",
							},
							{ label: __("Free", "post-grid"), value: "free" },
							{ label: __("Pro", "post-grid"), value: "pro" },

						]}
						onChange={(newVal) => {
							var queryLayoutsX = { ...queryLayouts };
							queryLayoutsX.keyword = newVal;
							setqueryLayouts(queryLayoutsX);
						}}
					/>


				</div>

				{isLoading && (
					<div className='text-center py-3'><Spinner /></div>
				)}

				<>
					{templates.map((preset, index) => {



						return (
							<div
								className="my-5 bg-slate-400 hover:bg-slate-500 p-3 rounded-sm cursor-pointer"
								title="Click To Apply"
								key={index}
								onClick={(ev) => {

									if (preset.isPro) {

										if (isProFeature) {
											addNotifications({
												title: "Opps its pro!",
												content: "This feature only avilable in premium version",
												type: "error",
											});
											return;

										}

									}

									addNotifications({
										title: "Preset Applied",
										content: "WOW, Your Post Grid just got new look!",
										type: "success",
									});


									var presetData = preset.data;
									presetData = JSON.parse(presetData);
									var presetId = presetData.postId


									var presetClean = {};

									Object.entries(presetData).map((item) => {
										var itemIndex = item[0];
										var itemArg = item[1];




										if (itemArg.options != undefined) {
											delete itemArg.options;
										}
										if (PostGridData[itemIndex]) {
											delete PostGridData[itemIndex]?.styles;
											delete PostGridData[itemIndex]?.hover;
											delete PostGridData[itemIndex]?.after;
											delete PostGridData[itemIndex]?.before;
											delete PostGridData[itemIndex]?.active;
											delete PostGridData[itemIndex]?.focus;
											delete PostGridData[itemIndex]?.target;
											delete PostGridData[itemIndex]?.visited;
										}

										if (itemIndex == 'loopLayout') {

											presetClean[itemIndex] = itemArg;
										} else {

											presetClean[itemIndex] = {
												...PostGridData[itemIndex],
												...itemArg,
											};
										}




									});


									var PostGridDataX = {

										...PostGridData,
										...presetClean,

									};

									//	var reponsiveCss = Array.isArray(PostGridDataX.reponsiveCss) ? Object.values(PostGridDataX.reponsiveCss).join("") : PostGridDataX.reponsiveCss;

									var reponsiveCss = Object.values(PostGridDataX.reponsiveCss).join("")
									var reponsiveCss = reponsiveCss.replaceAll(presetId, postId);


									PostGridDataX.reponsiveCss = reponsiveCss;


									if (PostGridDataX.nthItemStyle != undefined) {
										var nthItemStyle = [];

										Object.entries(PostGridDataX.nthItemStyle).map(item => {

											//console.log(item[1])

											nthItemStyle.push(item[1])
										})

										console.log(PostGridDataX)

										PostGridDataX.nthItemStyle = nthItemStyle;
									}







									onApplyTemplate(PostGridDataX);



									addNotifications({
										title: "Preset Applied",
										content: "WOW, Your Post Grid just got new look!",
										type: "success",
									});
								}}
							>
								<img className="w-full" src={preset.thumb} alt="" />
								<div className="mt-3 flex justify-between  items-center">
									<span className="text-lg  text-white ">{preset.label}</span>

									{preset.isPro && (

										<>

											{isProFeature && (
												<span
													className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white "
												>
													{__("Pro", "post-grid")}
												</span>
											)}
										</>

									)}





								</div>



							</div>
						);
					})}
				</>








			</div>

		</div>
	);
}

class Templates extends Component {
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
		var { postData, onApplyTemplate, customerData, addNotifications, setHelp } = this.props;

		return (
			<Html
				postData={postData}
				onApplyTemplate={onApplyTemplate}
				customerData={customerData}
				addNotifications={addNotifications}
				setHelp={setHelp}

				warn={this.state.showWarning}
			/>
		);
	}
}

export default Templates;
