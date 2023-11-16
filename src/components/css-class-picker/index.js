const { Component } = wp.element;
import {
	Button,
	Dropdown,
	ToggleControl,
	Popover,
	TextareaControl,
} from "@wordpress/components";
import { Icon, styles, settings, close, plusCircle } from "@wordpress/icons";
import {
	createElement,
	useCallback,
	memo,
	useMemo,
	useState,
	useEffect,
} from "@wordpress/element";
import {
	__experimentalInputControl as InputControl,
	ColorPalette,
} from "@wordpress/components";

import customTags from "../../custom-tags";

function Html(props) {
	if (!props.warn) {
		return null;
	}

	//var val = (typeof props.val == 'object') ? props.val : props.val.split(" ");
	//const [valArgs, setValArgs] = useState(props.val == undefined ? [] : val);
	const [search, setsearch] = useState({ enable: false, keyword: "" });
	const [keyword, setKeyword] = useState("");
	const [filteredOptions, setfilteredOptions] = useState([]);

	const tags = props.tags;

	// useEffect(() => {

	//   //props.onChange(valArgs.join(' '));

	// }, [valArgs]);

	useEffect(() => {
		//console.log(typeof props.val);
		//var val = (typeof props.val == 'object') ? props.val : props.val.split(" ");
		//setValArgs(val);
	}, [props.val]);

	useEffect(() => {
		//console.log(search);
	}, [search]);

	return (
		<div className=" p-1">
			<div className="">
				<div className="flex justify-between items-center capitalize font-medium text-slate-900 text-[13px] ">
					<h3 className="!capitalize !text-[13px] !mb-0 pg-font ">{props.label}</h3>
					<div
						className="relative flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-800 text-white font-medium rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
						onClick={(ev) => {
							setsearch({ ...search, enable: !search.enable });
						}}>
						<Icon fill="#fff" size="20" icon={plusCircle} />
						<span className="text-[13px] ">Add</span>
					</div>
				</div>
				<div className="pg-setting-input-textarea">
					<TextareaControl
						className="w-full"
						value={props.val}
						placeholder={props.placeholder}
						onChange={(newVal) => {
							props.onChange(newVal);
						}}
					/>
				</div>
			</div>

			{search.enable && (
				<>
					<Popover position="bottom left">
						<div className=" p-2 w-60 pg-font pg-setting-input-text">
							<div className="flex justify-between items-center ">
								<InputControl
									autoComplete="off"
									className="p-3 w-full"
									placeholder={
										props.placeholder == undefined
											? "Search..."
											: props.placeholder
									}
									value={keyword}
									onChange={(newVal) => {
										var newValX = newVal.replace(/[^a-zA-Z ]/g, "");

										if (newValX.length > 0) {
											setKeyword(newValX);
										}

										if (typeof tags == "object") {
											setfilteredOptions({});
											var newOptions = {};

											Object.entries(tags).map((args) => {
												var index = args[0];
												var x = args[1];

												let position = x.label
													.toLowerCase()
													.search(newValX.toLowerCase());
												if (position < 0) {
													x.exclude = true;
												} else {
													x.exclude = false;
												}

												newOptions[index] = x;
											});

											setfilteredOptions(newOptions);
										} else {
											setfilteredOptions([]);
											var newOptions = [];

											tags.map((x, index) => {
												let position = x.label
													.toLowerCase()
													.search(newValX.toLowerCase());
												if (position < 0) {
													x.exclude = true;
												} else {
													x.exclude = false;
												}

												//newOptions.push(x);
											});

											setfilteredOptions(newOptions);
										}
									}}
								/>
								<Icon
									fill="#fff"
									className="bg-red-400 ml-2 p-1 cursor-pointer"
									icon={close}
									onClick={(ev) => {
										setsearch({ ...search, enable: !search.enable });
									}}
								/>
							</div>

							<div>
								{keyword.length == 0 &&
									typeof tags == "object" &&
									Object.entries(tags).map((args) => {
										var index = args[0];
										var x = args[1];
										var id = args[0];
										var item = args[1];

										return (
											<div
												className={[
													typeof value == "object" &&
													value.includes(
														isNumeric(index) ? parseInt(index) : index
													)
														? "border-b cursor-pointer bg-slate-200 p-2 block"
														: "border-b cursor-pointer hover:bg-slate-200 p-2 block",
												]}
												onClick={(ev) => {
													if (x.isPro == true) {
														alert("Sorry this feature only avilbale in pro");
													} else {
														// onChange(x, index);

														props.onChange(props.val + " " + item.id);
													}
												}}>
												<div className="flex justify-between">
													<div className={[x.isPro ? "text-gray-400" : ""]}>
														{x.icon != undefined && (
															<span className="">
																<RawHTML>{x.icon}</RawHTML>
															</span>
														)}
														<span className="">{x.label}</span>
													</div>
													{x.isPro && (
														<span className="bg-amber-400 rounded-sm px-3  text-white hover:text-white">
															<a
																target="_blank"
																href={
																	"https://pickplugins.com/post-grid/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=" +
																	x.label
																}>
																Pro
															</a>
														</span>
													)}
												</div>
												{x.description != undefined &&
													x.description.length > 0 && (
														<div className="text-xs text-slate-400">
															{x.description}
														</div>
													)}
											</div>
										);
									})}

								{keyword.length == 0 &&
									typeof tags == "array" &&
									tags.map((x, index) => {
										return (
											<div
												className={[
													typeof value == "object" &&
													value.includes(
														IsNumeric(index) ? parseInt(index) : index
													)
														? "border-b cursor-pointer bg-slate-200 p-2 block"
														: "border-b cursor-pointer hover:bg-slate-200 p-2 block",
												]}
												onClick={(ev) => {
													//onChange(x, index)

													if (x.isPro == true) {
														alert("Sorry this feature only avilbale in pro");
													} else {
														// onChange(x, index);
														props.onChange(props.val + " " + item.id);
													}
												}}>
												<div className="flex justify-between">
													<div>
														{x.icon != undefined && (
															<span className="">
																<RawHTML>{x.icon}</RawHTML>
															</span>
														)}
														<span className="">{x.label} </span>
													</div>
													{x.isPro && (
														<span className="bg-amber-400 rounded-sm px-3  text-white hover:text-white">
															Pro
														</span>
													)}
												</div>

												{x.description != undefined &&
													x.description.length > 0 && (
														<div className="text-xs text-slate-400">
															{x.description}
														</div>
													)}
											</div>
										);
									})}

								{keyword.length > 0 &&
									typeof filteredOptions == "object" &&
									Object.entries(filteredOptions).map((args) => {
										var index = args[0];
										var x = args[1];

										if (x.exclude == false) {
											return (
												<div
													className="  cursor-pointer hover:bg-slate-400 p-2 block"
													onClick={(ev) => {
														//onChange(x, index)

														if (x.isPro == true) {
															alert("Sorry this feature only avilbale in pro");
														} else {
															// onChange(x, index);
															props.onChange(props.val + " " + item.id);
														}
													}}>
													<div className="flex justify-between">
														<div>
															{x.icon != undefined && (
																<span className="">
																	<RawHTML>{x.icon}</RawHTML>
																</span>
															)}
															<span className="">{x.label} </span>
														</div>
														{x.isPro && (
															<span className="bg-amber-400 rounded-sm px-3  text-white hover:text-white">
																Pro
															</span>
														)}
													</div>
													{x.description != undefined &&
														x.description.length > 0 && (
															<div className="text-xs text-slate-400">
																{x.description}
															</div>
														)}
												</div>
											);
										}
									})}

								{keyword.length > 0 &&
									typeof filteredOptions == "array" &&
									filteredOptions.map((x, index) => {
										if (x.exclude == false) {
											return (
												<div
													className="  cursor-pointer hover:bg-slate-400 p-2 block"
													onClick={(ev) => {
														//onChange(x, index)

														if (x.isPro == true) {
															alert("Sorry this feature only avilbale in pro");
														} else {
															// onChange(x, index);
															props.onChange(props.val + " " + item.id);
														}
													}}>
													<div className="flex justify-between">
														<div>
															{x.icon != undefined && (
																<span className="">
																	<RawHTML>{x.icon}</RawHTML>
																</span>
															)}
															<span className="">{x.label} </span>
														</div>
														{x.isPro && (
															<span className="bg-amber-400 rounded-sm px-3  text-white hover:text-white">
																Pro
															</span>
														)}
													</div>
													{x.description != undefined &&
														x.description.length > 0 && (
															<div className="text-xs text-slate-400">
																{x.description}
															</div>
														)}
												</div>
											);
										}
									})}

								{keyword.length > 0 &&
									typeof filteredOptions == "object" &&
									Object.entries(filteredOptions).length == 0 && (
										<div className="text-center p-2 text-red-500 ">
											No tags found.
										</div>
									)}

								{keyword.length > 0 && filteredOptions.length == 0 && (
									<div className="text-center p-2 text-red-500 ">
										No tags found.
									</div>
								)}
							</div>

							{/* <input
								value={search.keyword}
								type="text"
								className=" p-2 rounded-none"
								placeholder={props.placeholder}
								onKeyDown={(ev) => {
									var target = ev.target;
									console.log(ev.key);

									// if (
									// 	ev.key != "Enter" ||
									// 	ev.key != "Backspace" ||
									// 	ev.key != "Meta" ||
									// 	ev.key != " "
									// ) {
									// 	var value = search.keyword + ev.key;

									// 	setsearch({ keyword: value, enable: true });
									// }

									// if (ev.key == "Backspace") {
									// 	value = search.keyword.slice(0, -1);
									// 	setsearch({ keyword: value, enable: true });
									// }
									// if (ev.key == "Enter" || ev.key == " ") {
									// 	console.log(search.keyword);

									if (search.keyword.length == 0) {
										alert("Empty can't be added.");
										return;
										// }

										//var valArgsX = [...valArgs]
										//var args = valArgsX.concat(search.keyword)

										//setValArgs(args)
										setsearch({ keyword: "", enable: true });
									}
								}}
							/> */}
						</div>

						{/* <p className="text-sm mx-2">Press Enter to add.</p> */}
						<div className=" hidden flex-wrap justify-start  items-center">
							{/* {valArgs.map((item, index) => {

                return (

                  <div className='flex items-center border m-1'><Icon fill='#fff' className='bg-red-400 mr-2 cursor-pointer' icon={close} onClick={ev => {

                    var valArgsX = [...valArgs]
                    valArgsX.splice(index, 1);
                    setValArgs(valArgsX)

                  }} /><span className='mr-2'>{item}</span></div>

                )


              })} */}
						</div>

						{/* <div>
							{Object.entries(props.tags).map((args) => {
								var id = args[0];
								var item = args[1];

								return (
									<div
										className="p-2 cursor-pointer hover:bg-slate-300"
										onClick={(ev) => {
											props.onChange(props.val + " " + item.id);

											// var valArgsX = [...valArgs]
											// var args = valArgsX.concat(item.id)

											// setValArgs(args)
										}}>
										{item.label}
									</div>
								);
							})}
						</div> */}
					</Popover>
				</>
			)}
		</div>
	);
}

class PGcssClassPicker extends Component {
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
		var { value, placeholder, tags, label, onChange } = this.props;

		return (
			<Html
				val={value}
				placeholder={placeholder}
				tags={tags}
				label={label}
				onChange={onChange}
				warn={this.state.showWarning}
			/>
		);
	}
}

export default PGcssClassPicker;

