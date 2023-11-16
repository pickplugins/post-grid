const { Component } = wp.element;
import {
	Button,
	Dropdown,
	PanelRow,
	SelectControl,
	Spinner,
} from "@wordpress/components";

import {
	__experimentalInputControl as InputControl,
	ColorPalette,
	RangeControl,
	Popover,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";

import { memo, useMemo, useState, useEffect } from "@wordpress/element";
import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import { Icon, styles, settings, lineDotted, list, upload } from "@wordpress/icons";

import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import apiFetch from "@wordpress/api-fetch";

function Html(props) {
	if (!props.warn) {
		return null;
	}

	const [queryCss, setQueryCss] = useState({
		keyword: "",
		page: 1,
		blockName: props.blockName,
		category: "",
		isReset: true,
	});

	var [cssLibrary, setCssLibrary] = useState({ items: [] });
	var [cssLibraryCats, setCssLibraryCats] = useState([]);
	var [isLoading, setIsLoading] = useState(false);
	var [debounce, setDebounce] = useState(null); // Using the hook.
	var [sudoPicker, setsudoPicker] = useState(null); // Using the hook.

	const selectedBlock = useSelect((select) =>
		select("core/block-editor").getSelectedBlock()
	);

	var [cssSubmission, setCssSubmission] = useState({
		enable: false,
		title: "",
		category: "",
		tags: "",
		thumb: "",
		email: "",
		status: "", // idle => ready to submit, busy => submission process, falied => submission falied, success=> Successfully submitted!
		successMessage: "Successfully submitted!",
		failedMessage: "Submission was failed!",
		idleMessage: "Submit to CSS Library",
		message: "",

		timeout: 2,
	});

	useEffect(() => {
		fetchCss();
	}, [queryCss]);

	useEffect(() => {
		apiFetch({
			path: "/post-grid/v2/get_site_details",
			method: "POST",
			data: {},
		}).then((res) => {
			//
			//setEmailSubscribe({ ...userDetails, email: res.email, status: res.subscribe_status });
			setCssSubmission({ ...cssSubmission, email: res.email });
		});
	}, []);

	function fetchCss() {
		setIsLoading(true);

		var postData = {
			keyword: queryCss.keyword,
			page: queryCss.page,
			category: queryCss.category,
			blockName: queryCss.blockName,
		};
		postData = JSON.stringify(postData);

		fetch("https://getpostgrid.com/wp-json/post-grid/v2/get_block_patterns", {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: postData,
		})
			.then((response) => {
				if (response.ok && response.status < 400) {
					response.json().then((res) => {
						var isReset = queryCss.isReset;
						if (isReset) {
							var items = res.posts;
						} else {
							res.posts.map((item) => {
								console.log(item);
								cssLibrary.items.push(item);
							});

							var items = cssLibrary.items;
						}

						setCssLibrary({ items: items });
						setCssLibraryCats(res.terms);
						setIsLoading(false);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});
	}

	const htmlToImageCapt = () => {
		const eleementToCapture = document.querySelector("." + props.blockId);

		console.log(eleementToCapture);

		htmlToImage.toPng(eleementToCapture).then(function (dataUrl) {
			console.log(dataUrl);

			setCssSubmission({ ...cssSubmission, thumb: dataUrl });

			//download(dataUrl, 'my-node.png');
		});
	};

	return (
		<div className=" mt-4">
			<PGtabs
				activeTab="cssItems"
				orientation="horizontal"
				activeClass="active-tab"
				onSelect={(tabName) => {}}
				tabs={[
					{
						name: "cssItems",
						title: "Library",
						icon: list,
						className: "tab-cssItems",
					},
					{
						name: "submit",
						title: "Submission",
						icon: upload,
						className: "tab-submit",
					},
				]}>
				<PGtab name="cssItems">
					<PanelRow>
						<InputControl
							value={queryCss.keyword}
							type="text"
							placeholder="Search Block Variation..."
							onChange={(newVal) => {
								clearTimeout(debounce);
								debounce = setTimeout(() => {
									setQueryCss({
										keyword: newVal,
										page: 1,
										category: queryCss.category,
										isReset: true,
									});
								}, 1000);

								//fetchLayouts();
							}}
						/>
						<SelectControl
							className="w-full"
							style={{ margin: 0 }}
							label=""
							value={queryCss.category}
							options={cssLibraryCats}
							onChange={(newVal) => {
								setQueryCss({
									keyword: queryCss.keyword,
									page: 1,
									category: newVal,
									isReset: true,
								});
								//fetchLayouts();
							}}
						/>
					</PanelRow>

					<div className="items">
						{cssLibrary.items.map((x) => {
							var content = x.post_content;

							return (
								<div className=" border py-2 my-3 ">
									<img src={x.thumb_url} alt="" />
									<div className="my-2  flex items-center justify-center flex-wrap gap-2 ">
										<button
											type="button"
											className="px-3 py-2 bg-blue-600 rounded-sm text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform  flex items-center justify-center "
											onClick={(ev) => {
												props.onChange(content, "insert");
											}}>
											Insert New
										</button>
										<button
											type="button"
											className="px-3 py-2 bg-blue-600 rounded-sm text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform   items-center justify-center "
											onClick={(ev) => {
												props.onChange(content, "applyStyle");
											}}>
											Apply Style
										</button>
										<button
											type="button"
											className="px-3 py-2 bg-blue-600 rounded-sm text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform  flex items-center justify-center "
											onClick={(ev) => {
												props.onChange(content, "replace");
											}}>
											Replace
										</button>
									</div>
								</div>
							);
						})}
					</div>

					<div
						className="w-full rounded-sm  py-2 bg-blue-500 text-[14px] font-bold text-white cursor-pointer my-3 text-center"
						onClick={(_ev) => {
							var page = queryCss.page + 1;
							setQueryCss({
								keyword: queryCss.keyword,
								page: page,
								category: queryCss.category,
								isReset: false,
							});
						}}>
						{isLoading == true && (
							<span className="text-center">
								<Spinner />
							</span>
						)}
						Load More
					</div>
				</PGtab>
				<PGtab name="submit">
					<div>
						<label for="">Item Title</label>
						<InputControl
							className="w-full"
							value={cssSubmission.title}
							type="text"
							placeholder="Ex: Blue Button"
							onChange={(newVal) => {
								setCssSubmission({ ...cssSubmission, title: newVal });
							}}
						/>
					</div>

					<PanelRow>
						<label for="">Choose category</label>

						<SelectControl
							className="w-full"
							style={{ margin: 0 }}
							label=""
							value={cssSubmission.category}
							options={cssLibraryCats}
							onChange={(newVal) => {
								setCssSubmission({ ...cssSubmission, category: newVal });
							}}
						/>
					</PanelRow>

					<div>
						<label for="">Add Some Tags</label>
						<InputControl
							className="w-full"
							value={cssSubmission.tags}
							type="text"
							placeholder="button, blue button"
							onChange={(newVal) => {
								setCssSubmission({ ...cssSubmission, tags: newVal });
							}}
						/>
					</div>

					<div className="my-4">
						<div
							onClick={htmlToImageCapt}
							className="bg-green-700 text-white p-3 px-5 cursor-pointer">
							Take Screenshot
						</div>

						<label for="">Preview Thumbnail</label>
						<img src={cssSubmission.thumb} />
					</div>

					<div>
						<label for="">Your Email</label>
						<InputControl
							className="w-full"
							value={cssSubmission.email}
							type="text"
							placeholder=""
							onChange={(newVal) => {
								setCssSubmission({ ...cssSubmission, email: newVal });
							}}
						/>
					</div>

					<div
						className="bg-blue-500 my-5 px-10 py-3 text-white cursor-pointer text-center rounded-sm mb-5"
						onClick={(ev) => {
							setIsLoading(true);

							setCssSubmission({ ...cssSubmission, status: "busy" });

							var serelized = wp.blocks.serialize(selectedBlock);

							console.log(serelized);

							var postData = {
								title: cssSubmission.title,
								content: serelized,
								thumb: cssSubmission.thumb,
								category: cssSubmission.category,
								tags: cssSubmission.tags,
							};
							postData = JSON.stringify(postData);

							fetch(
								"https://getpostgrid.com/wp-json/post-grid/v2/submit_block_variation",
								{
									method: "POST",
									headers: {
										"Content-Type": "application/json;charset=utf-8",
									},
									body: postData,
								}
							)
								.then((response) => {
									if (response.ok && response.status < 400) {
										response.json().then((res) => {
											if (res.status == "success") {
												setCssSubmission({
													...cssSubmission,
													status: "success",
													message: res.message,
												});

												setTimeout(() => {
													setCssSubmission({
														...cssSubmission,
														status: "idle",
														message: res.message,
													});
												}, 3000);
											} else {
												setCssSubmission({
													...cssSubmission,
													status: "falied",
													message: res.message,
												});

												setTimeout(() => {
													setCssSubmission({
														...cssSubmission,
														status: "idle",
														message: res.message,
													});
												}, 3000);
											}
										});
									}
								})
								.catch((_error) => {
									//this.saveAsStatus = 'error';
									// handle the error
								});
						}}>
						Submit to CSS Library
						{cssSubmission.status == "busy" && (
							<span className="text-center">
								<Spinner />
							</span>
						)}
					</div>

					{cssSubmission.status == "success" && (
						<div className=" font-bold text-green-700">
							{cssSubmission.successMessage}
						</div>
					)}

					{cssSubmission.status == "falied" && (
						<div>
							<div className=" font-bold text-red-500">
								{cssSubmission.failedMessage}
							</div>

							<p>{cssSubmission.message}</p>
						</div>
					)}
				</PGtab>
			</PGtabs>
		</div>
	);
}

class PGLibraryBlockVariations extends Component {
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
		var { blockName, blockId, clientId, onChange } = this.props;

		return (
			<Html
				blockId={blockId}
				clientId={clientId}
				blockName={blockName}
				onChange={onChange}
				warn={this.state.showWarning}
			/>
		);
	}
}

export default PGLibraryBlockVariations;

