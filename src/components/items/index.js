import { MediaUpload, RichText } from "@wordpress/block-editor";
import {
	DateTimePicker,
	Icon,
	PanelBody,
	PanelRow,
	Popover,
} from "@wordpress/components";
import { applyFilters } from "@wordpress/hooks";

import { store as coreStore } from "@wordpress/core-data";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import {
	addCard,
	calendar,
	close,
	copy,
	help,
	menu,
	page,
	starEmpty,
	starFilled,
} from "@wordpress/icons";
import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import PGDropdown from "../dropdown";
import PGinputSelect from "../input-select";
import PGinputText from "../input-text";
import WPEditor from "../input-wp-editor";
import postQueryArgs from "./queryprams";
import queryPresets from "./query-presets";


const PostGridItems = ({
	itemsState,
	globalOptionsState,
	itemQueryState,
	customerData,
	setHelp,
	addNotifications,
}) => {
	const { items, setitems } = itemsState;
	const { globalOptions, setglobalOptions } = globalOptionsState;
	const { itemQueryArgs, setitemQueryArgs } = itemQueryState;
	const [itemActive, setitemActive] = useState(999);
	var [datePicker, setdatePicker] = useState(9999999);


	var postQueryArgsX = applyFilters('PostGridPostQueryArgs', postQueryArgs);
	let queryPresetsX = applyFilters("PostGridQueryPresets", queryPresets);

	function generate3Digit() {
		return Math.floor(100 + Math.random() * 900);
	}

	var [AIWriter, setAIWriter] = useState(false);

	const updatePostQueryArgs = (newVal, key) => {
		// setitemQueryArgs((prevState) => ({
		// 	...prevState,
		// 	[key]: {
		// 		...prevState[key],
		// 		value: newVal,
		// 	},
		// }));

		var itemQueryArgsX = { ...itemQueryArgs };
		itemQueryArgsX[key].value = newVal;


		setitemQueryArgs(itemQueryArgsX);






	};

	const updateTermQueryArgs = (newVal, index) => {
		var itemQueryArgsX = [...itemQueryArgs];
		itemQueryArgsX[index].value = newVal;
		setitemQueryArgs(itemQueryArgsX);
	};

	const handleDelete = (id) => {
		// Filter out the item with the specified id
		const updatedItems = Object.fromEntries(
			Object.entries(itemQueryArgs).filter(([key, item]) => item.id !== id)
		);
		setitemQueryArgs(updatedItems);
	};
	var formattedPrompt =
		"Respond only with question answer as json array and no other text. Do not include any explanations, introductions, or concluding remarks.";
	var postTypes = [];
	const postTypesData = useSelect(
		(select) => select(coreStore).getPostTypes({ per_page: -1 }),
		[]
	);
	postTypesData !== null &&
		postTypesData.map((x) => {
			postTypes.push({ value: x.slug, label: x.name });
		});
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

	var itemSources = {
		// manual: { label: "Manual", value: "manual" },
		posts: {
			label: "Posts",
			value: "posts",
			isPro: customerData.isPro ? false : true,
		},
	};

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
	var videoType = {
		choose: { label: "Choose", value: "" },
		youtube: { label: "YouTube", value: "youtube" },
	};

	function addQueryPreset(option, index) {
		// var items = [...queryArgs.items];
		//var item = { ...queryArgs.items[index] };
		var prams = option.prams;

		console.log(prams)
		setitemQueryArgs(prams);

		//setAttributes({ queryArgs: { items: queryArgsX.items } });
		// setAttributes({
		// 	queryArgs: { ...queryArgs, items: items },
		// });
		// fetchPosts();
	}

	return (

		<PanelBody
			className="font-medium text-slate-900 "
			title="Query Posts/Items"
			initialOpen={false}>


			<div className="my-4 flex items-center justify-between ">



				<div className="flex items-center  flex-wrap gap-2">
					<PGDropdown
						position="bottom right"
						variant="secondary"
						buttonTitle={
							globalOptions?.itemSource == undefined
								? "Item Source"
								: itemSources[globalOptions?.itemSource]?.label
						}
						options={itemSources}
						onChange={(option, index) => {
							var globalOptionsX = { ...globalOptions };
							globalOptionsX.itemSource = option.value;
							setglobalOptions(globalOptionsX);
						}}
						values=""></PGDropdown>
					{globalOptions?.itemSource == "posts" && (
						<>

							<PGDropdown
								position="bottom right"
								variant="secondary"
								buttonTitle={"Add Query"}
								options={postQueryArgsX}
								onChange={(option, index) => {
									var itemQueryArgsX = { ...itemQueryArgs };
									itemQueryArgsX[option.id] = {
										id: option.id,
										value: option.value,
									};

									console.log(itemQueryArgsX);


									setitemQueryArgs(itemQueryArgsX);
								}}
								values=""></PGDropdown>


						</>
					)}
					{globalOptions?.itemSource == "terms" && (
						<>
							<span
								className="cursor-pointer"
								title="Click to know more"
								onClick={() => {
									setHelp({
										id: "addTermQuery",
										enable: true,
									});
								}}>
								<Icon icon={help} />
							</span>
							<PGDropdown
								position="bottom right"
								variant="secondary"
								buttonTitle={"Add Query"}
								options={termQueryArgs}
								onChange={(option, index) => {
									var itemQueryArgsX = { ...itemQueryArgs };
									itemQueryArgsX[option.id] = {
										id: option.id,
										value: option.value,
									};
									setitemQueryArgs(itemQueryArgsX);
								}}
								values=""></PGDropdown>

						</>
					)}


					{globalOptions?.itemSource == "manual" && (
						<>
							<div className="flex items-center gap-2">
								<span
									className="flex items-center gap-2 bg-slate-700 text-white px-3 py-2 rounded-sm cursor-pointer hover:bg-slate-600"
									title="Click to paste"
									onClick={async () => {
										try {
											// Read text from clipboard
											const clipboardText =
												await navigator.clipboard.readText();

											// Parse the JSON string back to an object
											const pastedItems = JSON.parse(clipboardText);

											// Here you need to handle the pasted items
											// For example, if you have a state setter:
											setitems(pastedItems);

											addNotifications({
												title: "Items Pasted",
												content: "You just pasted items, Now go to edit.",
												type: "success",
											});
										} catch (error) { }
									}}>
									<Icon icon={page} fill="#fff" size="20" />
								</span>
								<span
									className="flex items-center gap-2 bg-slate-700 text-white px-3 py-2 rounded-sm cursor-pointer hover:bg-slate-600"
									title="Click to copy"
									onClick={() => {
										try {
											const itemsString = JSON.stringify(items, null, 2);

											navigator.clipboard
												.writeText(itemsString)
												.then(() => {
													addNotifications({
														title: "Items Copied",
														content:
															"You just copied items, Now go to edit.",
														type: "success",
													});
												})
												.catch((err) => { });
										} catch (error) { }
									}}>
									<Icon icon={copy} fill="#fff" size="20" />
								</span>
							</div>
							<div
								className="flex items-center gap-2 bg-slate-700 text-white px-3 py-2 rounded-sm cursor-pointer hover:bg-slate-600"
								onClick={(ev) => {
									var itemsX = [...items];

									itemsX.push({
										isActive: false,
										person: {
											name: "",
											avatar: { id: "", srcUrl: "" },
											jobTitle: "",
											comapny: { name: "", website: "", logoUrl: "" },
										},
										rating: 5,
										date: "11/01/2025",
										videoUrl: "",
										title: "What is Lorem Ipsum?",

										content:
											"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
										tags: [],
									});
									setitems(itemsX);

									addNotifications({
										title: "Item Added",
										content: "You just added an item, Now go to edit.",
										type: "success",
									});
								}}>
								<Icon icon={addCard} fill="#fff" size="20" />
							</div>
							<div className=" tracking-wide ">
								<div
									className="py-2 px-4 cursor-pointer  capitalize bg-gray-700 text-white font-medium rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
									onClick={(ev) => {
										ev.preventDefault();
										ev.stopPropagation();

										if (isProFeature) {
											addNotifications({
												title: "Opps its pro!",
												content:
													"This feature only avilable in premium version",
												type: "error",
											});
											return;
										}

										setAIWriter(!AIWriter);
									}}>
									AI
								</div>
								{AIWriter && (
									<Popover position="bottom right">
										<div className="w-[800px] p-3 relative">
											<span
												className="cursor-pointer px-1 bg-red-500 hover:bg-red-700 hover:text-white absolute top-0 right-0"
												onClick={(ev) => {
													ev.preventDefault();
													ev.stopPropagation();
													setAIWriter(!AIWriter);
												}}>
												<Icon fill={"#fff"} icon={close} />
											</span>


										</div>
									</Popover>
								)}
							</div>
						</>
					)}

					<PGDropdown
						position="bottom right"
						btnClass="py-2"
						variant="secondary"
						options={queryPresetsX}
						buttonTitle="Query Presets"
						onChange={addQueryPreset}
						values={""}></PGDropdown>

					<div
						className="bg-slate-700 text-white px-3 py-2 rounded-sm cursor-pointer hover:bg-slate-600 flex items-center gap-1"
						onClick={() => {
							navigator.clipboard
								.writeText(JSON.stringify(itemQueryArgs))
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
						className="bg-slate-700 text-white px-3 py-2 rounded-sm cursor-pointer hover:bg-slate-600 flex items-center gap-1"
						onClick={async () => {
							try {
								var data = await navigator.clipboard.readText();
								var datax = JSON.parse(data);

								setitemQueryArgs(datax);

								addNotifications({
									title: "Query Pasted!",
									content: "Query Params paste successful.",
									type: "success",
								});
							} catch (e) {
							}
						}}>
						<Icon icon={page} size={14} fill="#fff" />
						Paste
					</div>
					<div className="bg-red-500 text-white px-5 py-2 rounded  cursor-pointer hover:bg-slate-600" onClick={(ev => {

						setitemQueryArgs([]);


					})}>Clear</div>


					<div
						className="cursor-pointer"
						title="Click to know more"
						onClick={() => {
							setHelp({
								id: "addPostQuery",
								enable: true,
							});
						}}>
						<Icon icon={help} />
					</div>


				</div>
			</div>

			{/* {JSON.stringify(itemQueryArgs)}
				{JSON.stringify(globalOptions?.itemSource)}
 */}


			{globalOptions?.itemSource == "posts" && (
				<div>
					{Object.entries(itemQueryArgs)?.map((prams) => {
						var index = prams[0];
						var item = prams[1];

						return (
							<div key={index} className="my-4 flex gap-2 items-center">
								<span
									className="cursor-pointer px-1 py-1 bg-red-500 hover:bg-red-700 hover:text-white"
									onClick={() => handleDelete(item.id)}>
									<Icon fill={"#fff"} icon={close} size="20" />
								</span>
								{item.id == "postType" && (
									<div className="flex items-center justify-between flex-1">
										<label htmlFor="">{postQueryArgsX[item.id].label}</label>

										<PGinputSelect
											value={item.value}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
											options={postTypes}
											multiple={true}
											onChange={(newVal) => {


												updatePostQueryArgs(newVal, item.id);
											}}
										/>
									</div>
								)}
								{item.id == "postStatus" && (
									<div
										className={
											item.id == "postStatus"
												? "flex items-center justify-between flex-1"
												: "hidden"
										}>
										<label htmlFor="">{postQueryArgsX[item.id].label}</label>

										<PGinputSelect
											value={item.value}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
											options={[
												{ label: "Publish", value: "publish" },
												{ label: "Pending", value: "pending" },
												{ label: "Draft", value: "draft" },
												{ label: "Auto draft", value: "auto-draft" },
												{ label: "Future", value: "future" },
												{ label: "Private", value: "private" },
												{ label: "Inherit", value: "inherit" },
												{ label: "Trash", value: "trash" },
												{ label: "Any", value: "any" },
											]}
											multiple={true}
											onChange={(newVal) => {
												updatePostQueryArgs(newVal, item.id);
											}}
										/>
									</div>
								)}
								{item.id == "order" && (
									<div
										className={
											item.id == "order"
												? "flex items-center justify-between flex-1"
												: "hidden"
										}>
										<label htmlFor="">Order</label>
										<PGinputSelect
											label=""
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
											value={item.value}
											options={[
												{ label: "Ascending", value: "ASC" },
												{ label: "Descending", value: "DESC" },
											]}
											multiple={false}
											onChange={(newVal) =>
												updatePostQueryArgs(newVal, index)
											}
										/>
									</div>
								)}
								{item.id == "orderby" && (
									<div
										className={"flex items-center justify-between flex-1"}>
										<label htmlFor="">{postQueryArgsX[item.id].label}</label>

										<PGinputSelect
											value={item.value}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
											options={[
												{
													label: __("None", "post-grid"),
													value: "none",
												},
												{ label: "ID", value: "ID" },
												{ label: "Author", value: "author" },
												{ label: "Title", value: "title" },
												{ label: "Name", value: "name" },
												{ label: "Type", value: "type" },
												{ label: "Date", value: "date" },
												{ label: "Modified", value: "modified" },
												{ label: "Parent", value: "parent" },
												{ label: "Random", value: "rand" },
												{
													label: "Comment Count",
													value: "comment_count",
												},
												{ label: "Relevance", value: "relevance" },
												{ label: "Menu Order", value: "menu_order" },
												{
													label: "Meta Value(String)",
													value: "meta_value",
												},
												{
													label: "Meta Value(Number)",
													value: "meta_value_num",
												},
												{ label: "post__in", value: "post__in" },
												{
													label: "post_name__in",
													value: "post_name__in",
												},
												{
													label: "post_parent__in",
													value: "post_parent__in",
												},
											]}
											multiple={true}
											onChange={(newVal) => {
												updatePostQueryArgs(newVal, item.id);
											}}
										/>
									</div>
								)}



								{item.id == "taxQueryRelation" && (


									<div
										className={"flex items-center justify-between flex-1"}>
										<label htmlFor="">{postQueryArgsX[item.id].label}</label>
										<PGinputSelect
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"

											label=""
											value={item.value}
											options={[
												{ label: "OR", value: "OR" },
												{ label: "AND", value: "AND" },
											]}
											onChange={(newVal) => {
												updatePostQueryArgs(newVal, item.id);
											}}
										/>
									</div>
								)}
								{item.id == "metaQuery" && (
									<div>
										<div>
											<div
												className="cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-gray-700 hover:bg-gray-600 text-sm"
												onClick={(_ev) => {
													var items = [...queryArgs.items];
													var item = { ...queryArgs.items[index] };
													var xx = item.value.concat({
														fields: [{ key: "", value: "", type: "", compare: "" }],
														relation: "OR",
													});
													items[index].value = xx;
													//setAttributes({ queryArgs: { items: queryArgsX.items } });
													setAttributes({
														queryArgs: { ...queryArgs, items: items },
													});
												}}>
												Add
											</div>
											{item.value.map((x, j) => {
												return (
													<div>
														<CBtoggle title="Meta Field" initialOpen={false}>
															<div
																className="cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-red-600 text-sm"
																onClick={(_ev) => {
																	var items = [...queryArgs.items];
																	var item = { ...queryArgs.items[index] };
																	var xx = item.value.splice(j, 1);
																	items[index].value = item.value;
																	// setAttributes({
																	// 	queryArgs: { items: queryArgsX.items },
																	// });
																	setAttributes({
																		queryArgs: { ...queryArgs, items: items },
																	});
																}}>
																Remove
															</div>
															<PanelRow>
																<div>Relation</div>
																<PGinputSelect
																	style={{ margin: 0 }}
																	label=""
																	value={x.relation}
																	options={[
																		{ label: "OR", value: "OR" },
																		{ label: "AND", value: "AND" },
																	]}
																	onChange={(newVal) => {
																		var items = [...queryArgs.items];
																		var item = { ...queryArgs.items[index] };
																		item.value[j].relation = newVal;
																		//var term = itemData.value[j].fields[k]
																		//term.taxonomy = newVal;
																		items[index].value = item.value;
																		// setAttributes({
																		// 	queryArgs: { items: queryArgsX.items },
																		// });
																		setAttributes({
																			queryArgs: { ...queryArgs, items: items },
																		});
																	}}
																/>
															</PanelRow>
															{x.fields.map((y, k) => {
																return (
																	<div className="border-b border-solid border-gray-300 py-3">
																		<div
																			className="cursor-pointer block text-right mb-2 px-3 py-1 text-white bg-red-600 text-sm"
																			onClick={(_ev) => {
																				var items = [...queryArgs.items];
																				var item = { ...queryArgs.items[index] };
																				var fields = item.value[j].fields;
																				var xx = item.value[j].fields.splice(k, 1);
																				items[index].value = item.value;
																				// setAttributes({
																				// 	queryArgs: { items: queryArgsX.items },
																				// });
																				setAttributes({
																					queryArgs: { ...queryArgs, items: items },
																				});
																			}}>
																			{__("Remove", "post-grid")}
																		</div>
																		<PGinputText
																			label="Custom field key"
																			value={y.key}
																			placeholder="meta_key"
																			onChange={(newVal) => {
																				var items = [...queryArgs.items];
																				var item = { ...queryArgs.items[index] };
																				var term = item.value[j].fields[k];
																				term.key = newVal;
																				items[index].value = item.value;
																				// setAttributes({
																				// 	queryArgs: { items: queryArgsX.items },
																				// });
																				setAttributes({
																					queryArgs: { ...queryArgs, items: items },
																				});
																			}}
																		/>
																		<PGinputText
																			label="Meta Value "
																			value={y.value}
																			placeholder="25"
																			onChange={(newVal) => {
																				var items = [...queryArgs.items];
																				var item = { ...queryArgs.items[index] };
																				var term = item.value[j].fields[k];
																				term.value = newVal;
																				items[index].value = item.value;
																				// setAttributes({
																				// 	queryArgs: { items: queryArgsX.items },
																				// });
																				setAttributes({
																					queryArgs: { ...queryArgs, items: items },
																				});
																			}}
																		/>
																		<PanelRow>
																			<PGinputSelect
																				style={{ margin: 0 }}
																				label="Custom field type"
																				value={y.type}
																				options={[
																					{ label: "NUMERIC", value: "NUMERIC" },
																					{ label: "BINARY", value: "BINARY" },
																					{ label: "CHAR", value: "CHAR" },
																					{ label: "DATE", value: "DATE" },
																					{ label: "DATETIME", value: "DATETIME" },
																					{ label: "DECIMAL", value: "DECIMAL" },
																					{ label: "SIGNED", value: "SIGNED" },
																					{ label: "TIME", value: "TIME" },
																					{ label: "UNSIGNED", value: "UNSIGNED" },
																				]}
																				onChange={(newVal) => {
																					var items = [...queryArgs.items];
																					var item = { ...queryArgs.items[index] };
																					var term = item.value[j].fields[k];
																					term.type = newVal;
																					items[index].value = item.value;
																					// setAttributes({
																					// 	queryArgs: { items: queryArgsX.items },
																					// });
																					setAttributes({
																						queryArgs: {
																							...queryArgs,
																							items: items,
																						},
																					});
																				}}
																			/>
																			<PGinputSelect
																				style={{ margin: 0 }}
																				label="compare "
																				value={y.compare}
																				options={[
																					{ label: "=", value: "=" },
																					{ label: "!=", value: "!=" },
																					{ label: ">", value: ">" },
																					{ label: ">=", value: ">=" },
																					{ label: "<", value: "<" },
																					{ label: "<=", value: "<=" },
																					{ label: "LIKE", value: "LIKE" },
																					{ label: "NOT LIKE", value: "NOT LIKE" },
																					{ label: "IN", value: "IN" },
																					{ label: "NOT IN", value: "NOT IN" },
																					{ label: "BETWEEN", value: "BETWEEN" },
																					{
																						label: "NOT BETWEEN",
																						value: "NOT BETWEEN",
																					},
																					{ label: "EXISTS", value: "EXISTS" },
																					{
																						label: "NOT EXISTS",
																						value: "NOT EXISTS",
																					},
																				]}
																				onChange={(newVal) => {
																					var items = [...queryArgs.items];
																					var item = { ...queryArgs.items[index] };
																					var term = item.value[j].fields[k];
																					term.compare = newVal;
																					items[index].value = item.value;
																					setAttributes({
																						queryArgs: {
																							...queryArgs,
																							items: items,
																						},
																					});
																				}}
																			/>
																		</PanelRow>
																	</div>
																);
															})}
															<div
																className="cursor-pointer text-center px-3 py-1 text-white bg-gray-700 hover:bg-gray-600 text-sm"
																onClick={(_ev) => {
																	var items = [...queryArgs.items];
																	var item = { ...queryArgs.items[index] };
																	var xx = item.value[j].fields.concat({
																		key: "",
																		value: "",
																		type: "",
																		compare: "",
																	});
																	items[index].value[j].fields = xx;
																	setAttributes({
																		queryArgs: { ...queryArgs, items: items },
																	});
																}}>
																Add
															</div>
														</CBtoggle>
													</div>
												);
											})}
										</div>
									</div>
								)}
								{item.id == "dateQuery" && (
									<div>
										<PanelRow className="my-3">
											<label>Add Arguments</label>
											<PGinputSelect
												options={[
													{ value: "", label: "Select..." },
													{ value: "year", label: "Year" },
													{ value: "month", label: "Month" },
													{ value: "week", label: "Week" },
													{ value: "day", label: "Day" },
													{ value: "hour", label: "Hour" },
													{ value: "minute", label: "Minute" },
													{ value: "second", label: "Second" },
													{ value: "after", label: "After" },
													{ value: "before", label: "Before" },
													{ value: "inclusive", label: "Inclusive" },
													{ value: "compare", label: "Compare" },
													{ value: "column", label: "Column" },
													{ value: "relation", label: "Relation" },
												]}
												onChange={(newVal) => {
													var items = [...queryArgs.items];
													var itemData = { ...queryArgs.items[index] };
													if (newVal == "year") {
														var xx = itemData.value.concat({
															id: "year",
															value: "",
															compare: "",
														});
													}
													if (newVal == "month") {
														var xx = itemData.value.concat({
															id: "month",
															value: "",
															compare: "",
														});
													}
													if (newVal == "week") {
														var xx = itemData.value.concat({
															id: "week",
															value: "",
															compare: "",
														});
													}
													if (newVal == "day") {
														var xx = itemData.value.concat({
															id: "day",
															value: "",
															compare: "",
														});
													}
													if (newVal == "hour") {
														var xx = itemData.value.concat({
															id: "hour",
															value: "",
															compare: "",
														});
													}
													if (newVal == "minute") {
														var xx = itemData.value.concat({
															id: "minute",
															value: "",
															compare: "",
														});
													}
													if (newVal == "second") {
														var xx = itemData.value.concat({
															id: "second",
															value: "",
															compare: "",
														});
													}
													if (newVal == "inclusive") {
														var xx = itemData.value.concat({
															id: "inclusive",
															value: true,
														});
													}
													if (newVal == "compare") {
														var xx = itemData.value.concat({
															id: "compare",
															value: "",
														});
													}
													if (newVal == "column") {
														var xx = itemData.value.concat({
															id: "column",
															value: "",
														});
													}
													if (newVal == "relation") {
														var xx = itemData.value.concat({
															id: "relation",
															value: "",
														});
													}
													if (newVal == "before") {
														var xx = itemData.value.concat({
															id: "before",
															value: "",
															year: "",
															month: "",
															day: "",
														});
													}
													if (newVal == "after") {
														var xx = itemData.value.concat({
															id: "after",
															value: "",
															year: "",
															month: "",
															day: "",
														});
													}
													items[index].value = xx;
													setAttributes({
														queryArgs: { ...queryArgs, items: items },
													});
												}}
											/>
										</PanelRow>
										{item.value.map((x, j) => {
											return (
												<div>
													<CBtoggle title={x.id} initialOpen={false}>
														<span
															className="cursor-pointer px-3 py-1 text-white bg-red-600 text-sm my-2 inline-block"
															onClick={(_ev) => {
																var items = [...queryArgs.items];
																var item = { ...queryArgs.items[index] };
																//item.value = newVal;
																//queryArgsX.items[index].value.splice(j, 1);
																item.value.splice(j, 1);
																items[index] = item;
																// setAttributes({
																// 	queryArgs: { items: queryArgsX.items },
																// });
																setAttributes({
																	queryArgs: { ...queryArgs, items: items },
																});
															}}>
															{__("Delete", "post-grid")}
														</span>
														{(x.id == "after" || x.id == "before") && (
															<div>
																<PanelRow>
																	<label>{__("Year", "post-grid")}</label>
																	<PGinputText
																		onChange={(newVal) => {
																			var items = [...queryArgs.items];
																			var item = { ...queryArgs.items[index] };
																			//queryArgsX.items[index].value[j].year = newVal;
																			item.value[j].year = newVal;
																			items[index] = item;
																			// setAttributes({
																			// 	queryArgs: { items: queryArgsX.items },
																			// });
																			setAttributes({
																				queryArgs: { ...queryArgs, items: items },
																			});
																		}}
																	/>
																</PanelRow>
																<PanelRow>
																	<label>{__("Month", "post-grid")}</label>
																	<PGinputText
																		onChange={(newVal) => {
																			var items = [...queryArgs.items];
																			var item = { ...queryArgs.items[index] };
																			//queryArgsX.items[index].value[j].month = newVal;
																			item.value[j].month = newVal;
																			items[index] = item;
																			// setAttributes({
																			// 	queryArgs: { items: queryArgsX.items },
																			// });
																			setAttributes({
																				queryArgs: { ...queryArgs, items: items },
																			});
																		}}
																	/>
																</PanelRow>
																<PanelRow>
																	<label>{__("Day", "post-grid")}</label>
																	<PGinputText
																		onChange={(newVal) => {
																			//clearTimeout(debounce);
																			//debounce = setTimeout(() => {
																			var items = [...queryArgs.items];
																			var item = { ...queryArgs.items[index] };
																			//queryArgsX.items[index].value[j].day = newVal;
																			item.value[j].day = newVal;
																			items[index] = item;
																			// setAttributes({
																			// 	queryArgs: { items: queryArgsX.items },
																			// });
																			setAttributes({
																				queryArgs: { ...queryArgs, items: items },
																			});
																			//}, 1000);
																		}}
																	/>
																</PanelRow>
															</div>
														)}
														{x.id == "inclusive" && (
															<div>
																<PGinputSelect
																	style={{ margin: 0 }}
																	options={[
																		{ label: __("True", "post-grid"), value: true },
																		{
																			label: __("False", "post-grid"),
																			value: false,
																		},
																	]}
																	onChange={(newVal) => {
																		var items = [...queryArgs.items];
																		var item = { ...queryArgs.items[index] };
																		//queryArgsX.items[index].value[j].value = newVal;
																		item.value[j].value = newVal;
																		items[index] = item;
																		// setAttributes({
																		// 	queryArgs: { items: queryArgsX.items },
																		// });
																		setAttributes({
																			queryArgs: { ...queryArgs, items: items },
																		});
																	}}
																/>
															</div>
														)}
														{x.id == "compare" && (
															<div>
																<PGinputSelect
																	style={{ margin: 0 }}
																	options={[
																		{ label: "=", value: "=" },
																		{ label: "!=", value: "!=" },
																		{ label: ">", value: ">" },
																		{ label: ">=", value: ">=" },
																		{ label: "<", value: "<" },
																		{ label: "<=", value: "<=" },
																		{ label: "IN", value: "IN" },
																		{ label: "NOT IN", value: "NOT IN" },
																		{ label: "EXISTS", value: "EXISTS" },
																		{ label: "NOT EXISTS", value: "NOT EXISTS" },
																		{ label: "BETWEEN", value: "BETWEEN" },
																		{ label: "NOT BETWEEN", value: "NOT BETWEEN" },
																	]}
																	onChange={(newVal) => {
																		var items = [...queryArgs.items];
																		var item = { ...queryArgs.items[index] };
																		//queryArgsX.items[index].value[j].value = newVal;
																		item.value[j].value = newVal;
																		// setAttributes({
																		// 	queryArgs: { items: queryArgsX.items },
																		// });
																		setAttributes({
																			queryArgs: { ...queryArgs, items: items },
																		});
																	}}
																/>
															</div>
														)}
														{x.id == "column" && (
															<div>
																<PGinputText
																	onChange={(newVal) => {
																		//clearTimeout(debounce);
																		//debounce = setTimeout(() => {
																		var items = [...queryArgs.items];
																		var item = { ...queryArgs.items[index] };
																		// queryArgsX.items[index].value[j].value = newVal;
																		item.value[j].value = newVal;
																		// setAttributes({
																		// 	queryArgs: { items: queryArgsX.items },
																		// });
																		setAttributes({
																			queryArgs: { ...queryArgs, items: items },
																		});
																		//}, 1000);
																	}}
																/>
															</div>
														)}
														{x.id == "relation" && (
															<div className="flex items-center justify-between flex-1">
																<PGinputSelect
																	style={{ margin: 0 }}
																	options={[
																		{ label: "OR", value: "OR" },
																		{ label: "AND", value: "AND" },
																	]}
																	onChange={(newVal) => {
																		var items = [...queryArgs.items];
																		var item = { ...queryArgs.items[index] };
																		//queryArgsX.items[index].value[j].value = newVal;
																		item.value[j].value = newVal;
																		items[index] = item;
																		// setAttributes({
																		// 	queryArgs: { items: queryArgsX.items },
																		// });
																		setAttributes({
																			queryArgs: { ...queryArgs, items: items },
																		});
																	}}
																/>
															</div>
														)}
														{(x.id == "year" ||
															x.id == "month" ||
															x.id == "week" ||
															x.id == "day" ||
															x.id == "hour" ||
															x.id == "minute" ||
															x.id == "second") && (
																<div className="flex items-center justify-between flex-1">

																	<PGinputText
																		label="Value"
																		onChange={(newVal) => {
																			var items = [...queryArgs.items];
																			var item = { ...queryArgs.items[index] };
																			//clearTimeout(debounce);
																			//debounce = setTimeout(() => {
																			//queryArgsX.items[index].value[j].value = newVal;
																			item.value[j].value = newVal;
																			items[index] = item;
																			// setAttributes({
																			// 	queryArgs: { items: queryArgsX.items },
																			// });
																			setAttributes({
																				queryArgs: { ...queryArgs, items: items },
																			});
																			//}, 1000);
																		}}
																	/>
																	<PGinputSelect
																		style={{ margin: 0 }}
																		label="compare "
																		options={[
																			{ label: "=", value: "=" },
																			{ label: "!=", value: "!=" },
																			{ label: ">", value: ">" },
																			{ label: ">=", value: ">=" },
																			{ label: "<", value: "<" },
																			{ label: "<=", value: "<=" },
																			{ label: "IN", value: "IN" },
																			{ label: "NOT IN", value: "NOT IN" },
																			{ label: "EXISTS", value: "EXISTS" },
																			{ label: "NOT EXISTS", value: "NOT EXISTS" },
																			{ label: "BETWEEN", value: "BETWEEN" },
																			{ label: "NOT BETWEEN", value: "NOT BETWEEN" },
																		]}
																		onChange={(newVal) => {
																			var items = [...queryArgs.items];
																			var item = { ...queryArgs.items[index] };
																			item.value[j].compare = newVal;
																			setAttributes({
																				queryArgs: { ...queryArgs, items: items },
																			});
																		}}
																	/>
																</div>
															)}
													</CBtoggle>
												</div>
											);
										})}
									</div>
								)}
								{item.id == "taxQuery" && (
									<div>
										<div>
											<div
												className="cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-gray-700 hover:bg-gray-600 text-sm"
												onClick={(_ev) => {
													var items = [...queryArgs.items];
													var item = { ...queryArgs.items[index] };


													var xx = item.value.concat({
														terms: [
															{ taxonomy: "", field: "", terms: [], operator: "" },
														],
														relation: "OR",
													});
													items[index].value = xx;
													setAttributes({
														queryArgs: { ...queryArgs, items: items },
													});
												}}>
												{__("Add", "post-grid")}
											</div>
											{item?.value?.map((x, j) => {
												return (
													<div>
														<CBtoggle title="Term" initialOpen={false}>
															<div
																className="cursor-pointer inline-block mb-2 px-3 py-1 text-white bg-red-600 text-sm"
																onClick={(_ev) => {
																	var items = [...queryArgs.items];
																	var item = { ...queryArgs.items[index] };
																	//var itemData = items[index];
																	var xx = item.value.splice(j, 1);
																	items[index].value = item.value;
																	// setAttributes({
																	// 	queryArgs: { items: queryArgsX.items },
																	// });
																	setAttributes({
																		queryArgs: { ...queryArgs, items: items },
																	});
																}}>
																{__("Remove", "post-grid")}
															</div>
															<PanelRow>
																<div>Terms Relation</div>
																<PGinputSelect
																	style={{ margin: 0 }}
																	label=""
																	value={x.relation}
																	options={[
																		{ label: "OR", value: "OR" },
																		{ label: "AND", value: "AND" },
																	]}
																	onChange={(newVal) => {
																		var items = [...queryArgs.items];
																		var item = { ...queryArgs.items[index] };
																		item.value[j].relation = newVal;
																		items[index].value = itemData.value;
																		setAttributes({
																			queryArgs: { ...queryArgs, items: items },
																		});
																	}}
																/>
															</PanelRow>
															{x.terms.map((y, k) => {
																return (
																	<div className="border-b border-solid border-gray-300 py-3">
																		<PGinputText
																			label="Taxonomy"
																			value={y.taxonomy}
																			placeholder="Taxonomy"
																			onChange={(newVal) => {
																				var items = [...queryArgs.items];
																				var item = { ...queryArgs.items[index] };
																				var term = item.value[j].terms[k];
																				term.taxonomy = newVal;
																				items[index].value = item.value;
																				setAttributes({
																					queryArgs: { ...queryArgs, items: items },
																				});
																			}}
																		/>
																		<PGinputText
																			label="Terms"
																			value={y.terms.join(",")}
																			placeholder="Comma separated"
																			onChange={(newVal) => {
																				var items = [...queryArgs.items];
																				var item = { ...queryArgs.items[index] };
																				var term = item.value[j].terms[k];
																				term.terms = newVal.split(",");
																				items[index].value = item.value;
																				setAttributes({
																					queryArgs: { ...queryArgs, items: items },
																				});
																			}}
																		/>
																		<PanelRow>
																			<PGinputSelect
																				style={{ margin: 0 }}
																				label="Fields"
																				value={y.field}
																				options={[
																					{
																						label: __("Choose...", "post-grid"),
																						value: "",
																					},
																					{ label: "Term ID", value: "term_id" },
																					{ label: "Name", value: "name" },
																					{ label: "Slug", value: "slug" },
																					{
																						label: "Term taxonomy id",
																						value: "term_taxonomy_id",
																					},
																				]}
																				onChange={(newVal) => {
																					var items = [...queryArgs.items];
																					var item = { ...queryArgs.items[index] };
																					var term = item.value[j].terms[k];
																					term.field = newVal;
																					items[index].value = item.value;
																					setAttributes({
																						queryArgs: {
																							...queryArgs,
																							items: items,
																						},
																					});
																				}}
																			/>
																			<PGinputSelect
																				style={{ margin: 0 }}
																				label="Operator"
																				value={y.operator}
																				options={[
																					{
																						label: __("Choose...", "post-grid"),
																						value: "",
																					},
																					{ label: "IN", value: "IN" },
																					{ label: "NOT IN", value: "NOT IN" },
																					{ label: "AND", value: "AND" },
																					{ label: "EXISTS", value: "EXISTS" },
																					{
																						label: "NOT EXISTS",
																						value: "NOT EXISTS",
																					},
																				]}
																				onChange={(newVal) => {
																					var items = [...queryArgs.items];
																					var item = { ...queryArgs.items[index] };
																					var term = item.value[j].terms[k];
																					term.operator = newVal;
																					items[index].value = item.value;
																					setAttributes({
																						queryArgs: {
																							...queryArgs,
																							items: items,
																						},
																					});
																				}}
																			/>
																		</PanelRow>
																		<div
																			className="cursor-pointer block text-center my-2 px-3 py-1 text-white bg-red-600 text-sm"
																			onClick={(_ev) => {
																				var items = [...queryArgs.items];
																				var item = { ...queryArgs.items[index] };
																				var terms = item.value[j].terms;
																				var xx = item.value[j].terms.splice(k, 1);
																				items[index].value = item.value;
																				setAttributes({
																					queryArgs: { ...queryArgs, items: items },
																				});
																			}}>
																			{__("Remove", "post-grid")}
																		</div>
																	</div>
																);
															})}
															<div
																className="cursor-pointer text-center px-3 py-1 text-white bg-gray-700 hover:bg-gray-600 text-sm"
																onClick={(_ev) => {
																	var items = [...queryArgs.items];
																	var item = { ...queryArgs.items[index] };
																	var xx = item.value[j].terms.concat({
																		taxonomy: "",
																		field: "",
																		terms: [],
																		operator: "",
																	});
																	items[index].value[j].terms = xx;
																	setAttributes({
																		queryArgs: { ...queryArgs, items: items },
																	});
																}}>
																{__("Add", "post-grid")}
															</div>
														</CBtoggle>
													</div>
												);
											})}
										</div>
									</div>
								)}
								{(item.id == "metaKey" ||
									item.id == "s" ||
									item.id == "metaValue" ||
									item.id == "metaValueNum" ||
									item.id == "year" ||
									item.id == "monthnum" ||
									item.id == "w" ||
									item.id == "day" ||
									item.id == "hour" ||
									item.id == "minute" ||
									item.id == "second" ||
									item.id == "m" ||
									item.id == "author" ||
									item.id == "authorName" ||
									item.id == "tag" ||
									item.id == "tagId" ||
									item.id == "cat" ||
									item.id == "categoryName" ||
									item.id == "p" ||
									item.id == "name" ||
									item.id == "pageId" ||
									item.id == "pagename" ||
									item.id == "postParent" ||
									item.id == "postsPerPage" ||
									item.id == "paged" ||
									item.id == "offset" ||
									item.id == "postsPerArchivePage" ||
									item.id == "perm") && (
										<div className="flex items-center justify-between flex-1">

											<label htmlFor="">{postQueryArgsX[item.id].label}</label>



											<PGinputText
												className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
												value={item.value}
												onChange={(newVal) => {

													updatePostQueryArgs(newVal, item.id);
												}}
											/>
										</div>
									)}
								{item.id == "metaCompare" && (
									<div className="flex items-center justify-between flex-1">
										<label htmlFor="">{postQueryArgsX[item.id].label}</label>

										<PGinputSelect
											style={{ margin: 0 }}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"

											label=""
											value={item.value}
											options={[
												{ label: "=", value: "=" },
												{ label: "!=", value: "!=" },
												{ label: ">", value: ">" },
												{ label: ">=", value: ">=" },
												{ label: "<", value: "<" },
												{ label: "<=", value: "<=" },
												{ label: "LIKE", value: "LIKE" },
												{ label: "NOT LIKE", value: "NOT LIKE" },
												{ label: "IN", value: "IN" },
												{ label: "NOT IN", value: "NOT IN" },
												{ label: "BETWEEN", value: "BETWEEN" },
												{ label: "NOT BETWEEN", value: "NOT BETWEEN" },
												{ label: "NOT EXISTS", value: "NOT EXISTS" },
												{ label: "REGEXP", value: "REGEXP" },
												{ label: "NOT REGEXP", value: "NOT REGEXP" },
												{ label: "RLIKE", value: "RLIKE" },
											]}
											onChange={(newVal) => {
												updatePostQueryArgs(newVal, item.id);
											}}
										/>
									</div>
								)}
								{item.id == "postPassword" && (
									<div className="flex items-center justify-between flex-1">
										<label htmlFor="">{postQueryArgsX[item.id].label}</label>

										<PGinputText
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"

											value={item.value}
											onChange={(newVal) => {
												updatePostQueryArgs(newVal, item.id);
											}}
										/>
									</div>
								)}
								{(item.id == "postNameIn" ||
									item.id == "authorIn" ||
									item.id == "authorNotIn" ||
									item.id == "postNotIn" ||
									item.id == "postIn" ||
									item.id == "postParentNotIn" ||
									item.id == "tagNotIn" ||
									item.id == "tagAnd" ||
									item.id == "tagIn" ||
									item.id == "postParentIn" ||
									item.id == "tagSlugIn" ||
									item.id == "tagSlugAnd" ||
									item.id == "categoryNotIn" ||
									item.id == "categoryIn" ||
									item.id == "categoryAnd") && (
										<div className="flex items-center justify-between flex-1">

											<label htmlFor="">{postQueryArgsX[item.id].label}</label>



											<PGinputText
												className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"

												value={item.value}
												placeholder="Comma separated"
												onChange={(newVal) => {
													updatePostQueryArgs(newVal, item.id);
												}}
											/>
										</div>
									)}
								{item.id == "commentCount" && (
									<div className="flex items-center justify-between flex-1">
										<label htmlFor="">{postQueryArgsX[item.id].label}</label>

										<PGinputText
											value={item.value?.value}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"

											placeholder="Comment Count, Ex: 25"
											onChange={(newVal) =>
												updateQueryPram({ ...item.value, value: newVal }, index)

											}
										/>
										<PGinputSelect
											style={{ margin: 0 }}
											label=""
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"

											value={item.value?.compare}
											options={[
												{ label: "=", value: "=" },
												{ label: "!=", value: "!=" },
												{ label: ">", value: ">" },
												{ label: ">=", value: ">=" },
												{ label: "<", value: "<" },
												{ label: "<=", value: "<=" },
											]}
											onChange={(newVal) =>
												updateQueryPram({ ...item.value, compare: newVal }, index)
											}
										/>
									</div>
								)}
								{item.id == "postMimeType" && (
									<div className="flex items-center justify-between flex-1">
										<label htmlFor="">{postQueryArgsX[item.id].label}</label>

										<PGinputSelect
											value={item.value}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"

											options={[
												{ label: "image/jpeg", value: "jpg|jpeg|jpe" },
												{ label: "image/gif", value: "gif" },
												{ label: "image/png", value: "png" },
												{ label: "image/bmp", value: "bmp" },
											]}
											multiple={true}
											onChange={(newVal) => {
												updatePostQueryArgs(newVal, item.id);
											}}
										/>
									</div>
								)}
								{(item.id == "cacheResults" ||
									item.id == "nopaging" ||
									item.id == "hasPassword" ||
									item.id == "updatePostMetaCache" ||
									item.id == "updatePostTermCache") && (
										<div className="flex items-center justify-between flex-1">

											<label htmlFor="">{postQueryArgsX[item.id].label}</label>



											<PGinputSelect
												style={{ margin: 0 }}
												label=""
												className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
												value={item.value}
												options={[
													{ label: __("True", "post-grid"), value: true },
													{ label: __("False", "post-grid"), value: false },
												]}
												onChange={(newVal) => {
													updatePostQueryArgs(newVal, item.id);
												}}
											/>
										</div>
									)}
								{item.id == "ignoreStickyPosts" && (
									<div className="flex items-center justify-between flex-1">
										<label htmlFor="">{postQueryArgsX[item.id].label}</label>

										<PGinputSelect
											style={{ margin: 0 }}
											multiple={false}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
											value={item.value}
											options={[
												{ label: __("True", "post-grid"), value: true },
												{ label: __("False", "post-grid"), value: false },
											]}
											onChange={(newVal) => {
												updatePostQueryArgs(newVal, item.id);
											}}
										/>
									</div>
								)}
							</div>
						);
					})}
				</div>
			)}
			{globalOptions?.itemSource == "terms" && (
				<div>
					{Object.entries(itemQueryArgs)?.map((prams) => {
						var index = prams[0];
						var item = prams[1];

						return (
							<div key={index} className="my-4 flex gap-2 items-center">
								<span
									className="cursor-pointer px-1 bg-red-500 hover:bg-red-700 hover:text-white"
									onClick={() => handleDelete(item.id)}>
									<Icon fill={"#fff"} icon={close} size="20" />
								</span>
								{item.id == "taxonomy" && (
									<div className="flex items-center justify-between flex-1">
										<label htmlFor="">Taxonomy</label>
										<PGinputSelect
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
											value={item.value}
											options={taxonomiesObjects}
											multiple={true}
											onChange={(newVal) => {
												var itemQueryArgsX = { ...itemQueryArgs };
												itemQueryArgsX[index].value = newVal;
												setitemQueryArgs(itemQueryArgsX);

												//updatePostQueryArgs(newVal, item.id);
											}}
										/>
									</div>
								)}
								{item.id == "orderby" && (
									<div
										className={
											item.id == "orderby"
												? "flex items-center justify-between flex-1"
												: "hidden"
										}>
										<label htmlFor="">Order By</label>
										<PGinputSelect
											value={item.value}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
											options={[
												{
													label: __("None", "post-grid"),
													value: "none",
												},
												{ label: "ID", value: "ID" },
												{ label: "Author", value: "author" },
												{ label: "Title", value: "title" },
												{ label: "Name", value: "name" },
												{ label: "Type", value: "type" },
												{ label: "Date", value: "date" },
												{ label: "Modified", value: "modified" },
												{ label: "Parent", value: "parent" },
												{ label: "Random", value: "rand" },
												{
													label: "Comment Count",
													value: "comment_count",
												},
												{ label: "Relevance", value: "relevance" },
												{ label: "Menu Order", value: "menu_order" },
												{
													label: "Meta Value(String)",
													value: "meta_value",
												},
												{
													label: "Meta Value(Number)",
													value: "meta_value_num",
												},
												{ label: "post__in", value: "post__in" },
												{
													label: "post_name__in",
													value: "post_name__in",
												},
												{
													label: "post_parent__in",
													value: "post_parent__in",
												},
											]}
											multiple={true}
											onChange={(newVal) => {
												updateTermQueryArgs(newVal, item.id);
											}}
										/>
									</div>
								)}
								{item.id == "order" && (
									<div
										className={
											item.id == "order"
												? "flex items-center justify-between flex-1"
												: "hidden"
										}>
										<label htmlFor="">Order</label>
										<PGinputSelect
											label=""
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
											value={item.value}
											options={[
												{ label: "Ascending", value: "ASC" },
												{ label: "Descending", value: "DESC" },
											]}
											multiple={false}
											onChange={(newVal) =>
												updatePostQueryArgs(newVal, index)
											}
										/>
									</div>
								)}
								{item.id == "number" && (
									<div
										className={
											item.id == "number"
												? "flex items-center justify-between flex-1"
												: "hidden"
										}>
										<label htmlFor="">Number</label>
										<PGinputNumber
											label=""
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
											value={item.value}
											onChange={(newVal) => {
												updateTermQueryArgs(newVal, item.id);
											}}
										/>
									</div>
								)}
								{item.id == "include" && (
									<div
										className={
											item.id == "include"
												? "flex items-center justify-between flex-1"
												: "hidden"
										}>
										<label htmlFor="">Include</label>
										<PGinputText
											label=""
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
											value={item.value}
											onChange={(newVal) => {
												updateTermQueryArgs(newVal, item.id);
											}}
										/>
									</div>
								)}
								{item.id == "exclude" && (
									<div
										className={
											item.id == "exclude"
												? "flex items-center justify-between flex-1"
												: "hidden"
										}>
										<label htmlFor="">Exclude</label>
										<PGinputText
											label=""
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
											value={item.value}
											onChange={(newVal) => {
												updateTermQueryArgs(newVal, item.id);
											}}
										/>
									</div>
								)}
								{item.id == "child_of" && (
									<div
										className={
											item.id == "child_of"
												? "flex items-center justify-between flex-1"
												: "hidden"
										}>
										<label htmlFor="">Child Of</label>
										<PGinputText
											label=""
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
											value={item.value}
											onChange={(newVal) => {
												updateTermQueryArgs(newVal, item.id);
											}}
										/>
									</div>
								)}
								{item.id == "parent" && (
									<div
										className={
											item.id == "parent"
												? "flex items-center justify-between flex-1"
												: "hidden"
										}>
										<label htmlFor="">Parent</label>
										<PGinputText
											label=""
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
											value={item.value}
											onChange={(newVal) => {
												updateTermQueryArgs(newVal, item.id);
											}}
										/>
									</div>
								)}

								{item.id == "meta_value" && (
									<div
										className={
											item.id == "meta_value"
												? "flex items-center justify-between flex-1"
												: "hidden"
										}>
										<label htmlFor="">Meta Value</label>
										<PGinputText
											label=""
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
											value={item.value}
											onChange={(newVal) => {
												updateTermQueryArgs(newVal, item.id);
											}}
										/>
									</div>
								)}
								{item.id == "hide_empty" && (
									<div
										className={
											item.id == "hide_empty"
												? "flex items-center justify-between flex-1"
												: "hidden"
										}>
										<label htmlFor="">Hide Empty</label>
										<InputToggle
											value={item?.value}
											onChange={() => {
												const newValue = !itemQueryArgs[index].value;
												updateTermQueryArgs(newValue, index);
											}}
										/>
									</div>
								)}
							</div>
						);
					})}
				</div>
			)}


			{globalOptions?.itemSource == "manual" && (
				<ReactSortable
					list={items}
					handle={".handle"}
					setList={(itemsSorted) => {
						setTimeout(() => {
							setitems(itemsSorted);
						}, 200);

						addNotifications({
							title: "Items Sorted",
							content: "You just sorted items",
							type: "success",
						});
					}}>
					{items?.map((item, index) => {
						return (
							<>
								<div className="" key={index}>
									<div
										className="bg-slate-300 flex justify-between items-center p-3 py-2 my-2 cursor-pointer hover:bg-slate-400"
										onClick={(ev) => {
											setitemActive(index == itemActive ? 999 : index);
										}}>
										<div>{item?.title}</div>
										<div className="flex items-center gap-2">
											<span className="handle  cursor-pointer bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1">
												<Icon size="20" fill={"#fff"} icon={menu} />
											</span>
											<span
												className="cursor-pointer bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1"
												onClick={(ev) => {
													ev.stopPropagation();

													var itemsX = [...items];
													var itemToDup = { ...itemsX[index] };
													itemsX.splice(index + 1, 0, itemToDup);
													setitems(itemsX);

													addNotifications({
														title: "Item Duplicated",
														content: "You just duplicate an item",
														type: "success",
													});
												}}>
												<Icon size="20" fill={"#fff"} icon={copy} />
											</span>
											<span
												className="cursor-pointer bg-red-700 hover:bg-red-600 hover:text-white px-1 py-1"
												onClick={(ev) => {
													ev.stopPropagation();
													var itemsX = [...items];
													itemsX.splice(index, 1);
													setitems(itemsX);

													addNotifications({
														title: "Item Removed",
														content: "You just removed an item",
														type: "success",
													});
												}}>
												<Icon size="20" fill={"#fff"} icon={close} />
											</span>
										</div>
									</div>

									{itemActive == index && (
										<div className="py-2 w-full">
											<div className="mb-3">
												<RichText
													placeholder="Write Header Text..."
													className="bg-slate-100 p-3 "
													tagName={"div"}
													value={item?.title}
													onChange={(content) => {
														setitems((prevItems) => {

															// if(!item?.headerLabelSlugLock){

															// }

															const updatedItems = [...prevItems];
															updatedItems[index] = {
																...updatedItems[index],
																title: content,
															};
															return updatedItems;
														});
													}}
												/>
											</div>
											<div className="mb-3">
												<WPEditor
													placeholder="Write Header Text..."
													editorId={`content-${index}-${generate3Digit()}`}
													className={`bg-slate-100 p-3 min-h-24 w-full`}
													value={unescapeHTML(item?.content)}
													onChange={(content) => {
														content = content.replace(/[\r\n]+/g, "");
														content = escapeHTML(content);

														//var content = JSON.stringify(content);
														setitems((prevItems) => {
															const updatedItems = [...prevItems];
															updatedItems[index] = {
																...updatedItems[index],
																content: content,
															};
															return updatedItems;
														});
													}}
												/>
											</div>

											<div className="mb-3 space-y-3">
												<div className="w-full flex justify-between items-center">
													<div className="mb-2">Date</div>
													<div className="flex items-center gap-2">
														<span
															className="flex items-center gap-2 bg-slate-700 text-white px-3 py-2 rounded-sm cursor-pointer hover:bg-slate-600"
															title="Date Picker"
															onClick={() => {
																setdatePicker(
																	datePicker == index ? 9999999 : index
																);
															}}>
															<Icon icon={calendar} fill="#fff" size="20" />
														</span>

														{datePicker == index && (
															<Popover position="bottom right">
																<div className="p-2 rounded-md">
																	<DateTimePicker
																		currentDate={item?.date}
																		onChange={(newDate) => {
																			const timestamp = newDate;
																			const date = timestamp.split("T")[0];
																			setitems((prevItems) => {
																				const updatedItems = [...prevItems];
																				updatedItems[index] = {
																					...updatedItems[index],
																					date: date,
																				};
																				return updatedItems;
																			});
																		}}
																		is12Hour={true}
																	/>
																</div>
															</Popover>
														)}
													</div>
												</div>
												<div className="w-full flex justify-between items-center">
													<div className="mb-2">Rating</div>
													<div className="flex items-center gap-2">
														{[1, 2, 3, 4, 5].map((star) => (
															<span
																className="size-5"
																key={star}
																onClick={() => {
																	setitems((prevItems) => {
																		const updatedItems = [...prevItems];
																		updatedItems[index] = {
																			...updatedItems[index],
																			rating: star,
																		};
																		return updatedItems;
																	});
																}}>
																<Icon
																	icon={
																		star > item?.rating
																			? starEmpty
																			: starFilled
																	}
																	fill="gold"
																	size="24"
																/>
															</span>
														))}
													</div>
												</div>
												<div className="w-full flex justify-between items-center">
													<div className="mb-2">Video Type</div>
													<div className="flex items-center gap-2">
														<PGDropdown
															position="bottom right"
															variant="secondary"
															buttonTitle={
																videoType[item?.videoType] == undefined
																	? __("Choose", "post-grid")
																	: videoType[item?.videoType].label
															}
															options={videoType}
															onChange={(newVal) => {
																setitems((prevItems) => {
																	const updatedItems = [...prevItems];
																	updatedItems[index] = {
																		...updatedItems[index],
																		videoType: newVal.value,
																	};
																	return updatedItems;
																});
															}}
															values=""></PGDropdown>
													</div>
												</div>
												<div className="w-full flex justify-between items-center">
													<div className="mb-2">Video Url</div>
													<div className="flex items-center gap-2">
														<PGinputText
															className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full "
															label=""
															value={item?.videoUrl}
															onChange={(newVal) => {
																setitems((prevItems) => {
																	const updatedItems = [...prevItems];
																	updatedItems[index] = {
																		...updatedItems[index],
																		videoUrl: newVal,
																	};
																	return updatedItems;
																});
															}}
														/>
													</div>
												</div>
												<div className="w-full flex justify-between items-center">
													<div className="">Person Name</div>
													<div className="flex items-center gap-2">
														<PGinputText
															className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full "
															label=""
															value={item?.personName}
															onChange={(newVal) => {
																setitems((prevItems) => {
																	const updatedItems = [...prevItems];
																	updatedItems[index] = {
																		...updatedItems[index],
																		personName: newVal,
																	};
																	return updatedItems;
																});
															}}
														/>
													</div>
												</div>
												<div className="w-full flex justify-between items-center">
													<div className="">Job Title</div>
													<div className="flex items-center gap-2">
														<PGinputText
															className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full "
															label=""
															value={item?.jobTitle}
															onChange={(newVal) => {
																setitems((prevItems) => {
																	const updatedItems = [...prevItems];
																	updatedItems[index] = {
																		...updatedItems[index],
																		jobTitle: newVal,
																	};
																	return updatedItems;
																});
															}}
														/>
													</div>
												</div>
												<div className="flex my-5 justify-between items-center ">
													<label className="w-[400px]" htmlFor="">
														{__("Avatar", "user-verification")}
													</label>
													<MediaUpload
														onSelect={(media) => {
															setitems((prevItems) => {
																const updatedItems = [...prevItems];
																updatedItems[index] = {
																	...updatedItems[index],
																	personAvatar: {
																		id: media.id,
																		srcUrl: media.url,
																	},
																};
																return updatedItems;
															});
														}}
														onClose={() => { }}
														allowedTypes={["image"]}
														value={item?.personAvatar?.id}
														render={({ open }) => {
															return (
																<div className="flex flex-col items-center gap-2">
																	{item?.personAvatar?.srcUrl && (
																		<img
																			src={item?.personAvatar?.srcUrl}
																			alt=""
																			className="cursor-pointer rounded-md max-w-[160px] max-h-[160px] object-contain border border-solid border-gray-300 p-1"
																			onClick={() => {
																				open();
																			}}
																		/>
																	)}
																	<div className="flex items-center gap-2">
																		<button
																			onClick={open}
																			className="no-underline px-4 py-2 rounded-sm bg-gray-700 hover:bg-gray-700 text-white  whitespace-nowrap  hover:text-white">
																			Open Media Library
																		</button>
																		<button
																			onClick={() => {
																				setitems((prevItems) => {
																					const updatedItems = [
																						...prevItems,
																					];
																					updatedItems[index] = {
																						...updatedItems[index],
																						personAvatar: {
																							id: "",
																							srcUrl: "",
																						},
																					};
																					return updatedItems;
																				});
																			}}
																			className="no-underline size-[38px] flex items-center justify-center text-[30px] rounded-sm !border !bg-transparent !border-solid !border-gray-700 hover:!border-red-700 text-gray-700   hover:text-red-700"
																			title="Clear Logo">
																			&times;
																		</button>
																	</div>
																</div>
															);
														}}></MediaUpload>
												</div>
												<div className="w-full flex justify-between items-center">
													<div className="">Company Name</div>
													<div className="flex items-center gap-2">
														<PGinputText
															className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full "
															label=""
															value={item?.companyName}
															onChange={(newVal) => {
																setitems((prevItems) => {
																	const updatedItems = [...prevItems];
																	updatedItems[index] = {
																		...updatedItems[index],
																		companyName: newVal,
																	};
																	return updatedItems;
																});
															}}
														/>
													</div>
												</div>
												<div className="w-full flex justify-between items-center">
													<div className="">Company Website</div>
													<div className="flex items-center gap-2">
														<PGinputText
															className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full "
															label=""
															value={item?.companyWebsite}
															onChange={(newVal) => {
																setitems((prevItems) => {
																	const updatedItems = [...prevItems];
																	updatedItems[index] = {
																		...updatedItems[index],
																		companyWebsite: newVal,
																	};
																	return updatedItems;
																});
															}}
														/>
													</div>
												</div>
												<div className="flex my-5 justify-between items-center ">
													<label className="w-[400px]" htmlFor="">
														{__("Company logo", "user-verification")}
													</label>
													<MediaUpload
														onSelect={(media) => {
															setitems((prevItems) => {
																const updatedItems = [...prevItems];
																updatedItems[index] = {
																	...updatedItems[index],
																	companyLogo: {
																		id: media.id,
																		srcUrl: media.url,
																	},
																};
																return updatedItems;
															});
														}}
														onClose={() => { }}
														allowedTypes={["image"]}
														value={item?.companyLogo?.id}
														render={({ open }) => {
															return (
																<div className="flex flex-col items-center gap-2">
																	{item?.companyLogo?.srcUrl && (
																		<img
																			src={item?.companyLogo?.srcUrl}
																			alt=""
																			className="cursor-pointer rounded-md max-w-[160px] max-h-[160px] object-contain border border-solid border-gray-300 p-1"
																			onClick={() => {
																				open();
																			}}
																		/>
																	)}
																	<div className="flex items-center gap-2">
																		<button
																			onClick={open}
																			className="no-underline px-4 py-2 rounded-sm bg-gray-700 hover:bg-gray-700 text-white  whitespace-nowrap  hover:text-white">
																			Open Media Library
																		</button>
																		<button
																			onClick={() => {
																				setitems((prevItems) => {
																					const updatedItems = [
																						...prevItems,
																					];
																					updatedItems[index] = {
																						...updatedItems[index],
																						companyLogo: {
																							id: "",
																							srcUrl: "",
																						},
																					};
																					return updatedItems;
																				});
																			}}
																			className="no-underline size-[38px] flex items-center justify-center text-[30px] rounded-sm !border !bg-transparent !border-solid !border-gray-700 hover:!border-red-700 text-gray-700   hover:text-red-700"
																			title="Clear Logo">
																			&times;
																		</button>
																	</div>
																</div>
															);
														}}></MediaUpload>
												</div>
												{/* // */}
											</div>
										</div>
									)}
								</div>
							</>
						);
					})}
				</ReactSortable>
			)}
		</PanelBody>

	);
};

export default PostGridItems;
