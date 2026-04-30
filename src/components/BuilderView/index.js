const { Component, RawHTML, useState, useEffect } = wp.element;
import apiFetch from "@wordpress/api-fetch";
import { Popover, Spinner } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { Icon, close, cog, addCard, helpFilled, help, caution, seen } from "@wordpress/icons";

import { Fragment } from "react";
import PGinputSelect from "../input-select";
import PGinputText from "../input-text";
import PreviewGrid from "./preview-grid";
import PreviewCarousel from "./preview-carousel";
import PreviewMasonry from "./preview-masonry";
import PreviewFilterable from "./preview-filterable";
import "./elements-view";

var myStore = wp.data.select("PostGridStore");

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var id = props.id;
	var customerData = props.customerData;
	var onChangePostGrid = props.onChangePostGrid;
	var addNotifications = props.addNotifications;
	var settoggleSettings = props.settoggleSettings;
	var setHelp = props.setHelp;

	var isLoading = props.isLoading;
	var onSavePostGrid = props.onSavePostGrid;
	var pleaseUpdate = props.pleaseUpdate;

	if (props.postData.post_content == null) {
		return null;
	}

	var [loading, setloading] = useState(false);
	var [pleaseUpdateX, setpleaseUpdateX] = useState(props.pleaseUpdate);
	var [postData, setpostData] = useState(props.postData);
	var [PostGridData, setPostGridData] = useState(postData.post_content);

	var [globalOptions, setglobalOptions] = useState(PostGridData.globalOptions);



	const copyData = (data) => {
		navigator.clipboard
			.writeText(data)
			.then(() => {
				addNotifications({
					title: "Copied to clipboard!",
					content:
						"Use the shortcode in page or post content where you want to display.",
					type: "success",
				});
			})
			.catch((err) => { });
	};

	useEffect(() => {
		setpostData(props.postData);
	}, [props.postData]);

	useEffect(() => {
		setPostGridData(postData.post_content);
	}, [postData]);


	useEffect(() => {


		setglobalOptions(PostGridData.globalOptions);

	}, [PostGridData]);





	useEffect(() => {
		setpleaseUpdateX(pleaseUpdate);
	}, [pleaseUpdate]);
















	return (
		<div className="ml-5">
			<div className="flex items-center justify-between align-middle bg-white py-2 px-5  mb-5">
				<div className="flex items-center gap-5">
					<div className="">
						{postData?.post_title && (
							<div className="flex items-center gap-3 text-base font-bold">You are editing:
								<span> {postData.post_title}</span>
								<span className="text-gray-300">{`(#${postData.ID})`} </span>
							</div>
						)}


						<div className="flex gap-4 items-center my-3">

							<div className="cursor-pointer" onClick={ev => {
								settoggleSettings('overview')
							}}
							>Overview</div>

							{!customerData.isPro && (
								<>
									<div className="cursor-pointer" onClick={ev => {
										settoggleSettings('freeVsPro')
									}}>Free Vs Pro</div>
									<a href="https://pickplugins.com/post-grid/" target="_blank" className="cursor-pointer px-3 py-1 bg-amber-600 rounded text-white">Buy Now</a>
								</>
							)}


							<div className="cursor-pointer" onClick={ev => {
								settoggleSettings('sendFeedback')
							}}>Send Feedbacks</div>



						</div>
					</div>

					{/* <a className="bg-slate-700  text-white hover:text-white px-5 py-1 rounded-sm cursor-pointer hover:bg-slate-600 flex items-center gap-2"> <Icon icon={seen} fill={"#fff"} /> Preview</a> */}
				</div>

				<div className="flex items-center align-middle gap-3">
					<div className="flex items-center align-middle gap-2">
						<span
							className="cursor-pointer"
							title="Click to know more"
							onClick={() => {
								setHelp({
									id: "useShortcodes",
									enable: true,
								});
							}}>
							<Icon icon={help} />
						</span>
						<input
							type="text"
							className="w-72 !bg-slate-200 !rounded-none !border-2 !border-solid border-slate-400 text-sm !py-1 !px-2 font-mono"
							value={`[post_grid_builder id="${id}"]`}
							onClick={() => {
								var str = `[post_grid_builder id="${id}"]`;

								copyData(str);
							}}
						/>
					</div>

					{pleaseUpdateX && (
						<div
							className="bg-slate-700 text-white px-5 py-2 rounded-sm cursor-pointer hover:bg-slate-600"
							onClick={(ev) => {
								onSavePostGrid(true);
							}}>
							Save
						</div>
					)}
				</div>
			</div>
			{globalOptions?.viewType == "viewGrid" && (
				<PreviewGrid
					postData={postData}
					id={id}
				/>
			)}
			{globalOptions?.viewType == "viewSlider" && (
				<PreviewCarousel
					postData={postData}
					id={id}
				/>
			)}
			{globalOptions?.viewType == "viewMasonry" && (
				<PreviewMasonry
					postData={postData}
					id={id}
				/>
			)}
			{globalOptions?.viewType == "viewFilterable" && (
				<PreviewFilterable
					postData={postData}
					id={id}
				/>
			)}



		</div>
	);
}

class BuilderView extends Component {
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
		var {
			postData,
			id,
			isLoading,
			onChangePostGrid,
			pleaseUpdate,
			onSavePostGrid,
			addNotifications,
			settoggleSettings,
			customerData,
			setHelp,
		} = this.props;

		return (
			<Html
				isLoading={isLoading}
				postData={postData}
				id={id}
				onSavePostGrid={onSavePostGrid}
				pleaseUpdate={pleaseUpdate}
				onChangePostGrid={onChangePostGrid}
				addNotifications={addNotifications}
				settoggleSettings={settoggleSettings}
				customerData={customerData}
				setHelp={setHelp}
				warn={this.state.showWarning}
			/>
		);
	}
}

export default BuilderView;
