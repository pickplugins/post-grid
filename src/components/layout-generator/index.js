const { Component, useEffect } = wp.element;
import { applyFilters, doAction, addAction, addFilter } from "@wordpress/hooks";

import {
	__experimentalInputControl as InputControl,
	PanelBody,
	PanelRow,
	SelectControl,
	ToggleControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { brush, columns } from "@wordpress/icons";
import React, { useState, Fragment } from "react";
import { ReactSortable } from "react-sortablejs";
import CBAnimateOn from "../../components/animate-on";

import PGtabs from "../../components/tabs";

import PGtab from "../../components/tab";
import PGDropdown from "../dropdown";
import PGStyles from "../styles";
import TreeView from "./TreeView";
import elements from "./elements";
import "./elements-preview";
import "./elements-options";

const sortableOptions = {
	animation: 150,
	fallbackOnBody: true,
	swapThreshold: 0.65,
	group: "nested",
};

const parentSortableOptions = {
	animation: 150,
	fallbackOnBody: true,
	swapThreshold: 0.65,
	group: "parent-group", // Unique group for parent

};

const childSortableOptions = {
	animation: 150, // Keep desired shared options
	fallbackOnBody: true,
	dragoverBubble: true,
	swapThreshold: 0.65,
	group: "child-group", // Different group from parent
	ghostClass: 'sortable-ghost',
	dragClass: "sortable-drag",  // Class name for the dragging item

};





function ElementOthers({
	block,
	handleBlockUpdate,
	onTemplateDrop,
	draggedTemplate,
	setCurretnElement,
	setactiveTab,
}) {

	var html = applyFilters("PostGridElementHtmlPreview" + block.type, '', block, setCurretnElement);


	return (
		<>

			{block.type != "root" &&
				block.type != "container" &&
				block.type != "layer" &&

				(
					<>{html}</>
				)}



			{block.type === "container" && (
				<ElementContainer
					block={block}
					handleBlockUpdate={handleBlockUpdate}
					onTemplateDrop={onTemplateDrop}
					draggedTemplate={draggedTemplate}
					setCurretnElement={setCurretnElement}
					setactiveTab={setactiveTab}
				/>
			)}
			{block.type === "layer" && (
				<ElementLayer
					block={block}
					handleBlockUpdate={handleBlockUpdate}
					onTemplateDrop={onTemplateDrop}
					draggedTemplate={draggedTemplate}
					setCurretnElement={setCurretnElement}
					setactiveTab={setactiveTab}
				/>
			)}



			{block.type === "root" && (
				<ElementRoot
					block={block}
					handleBlockUpdate={handleBlockUpdate}
					onTemplateDrop={onTemplateDrop}
					draggedTemplate={draggedTemplate}
					setCurretnElement={setCurretnElement}
					setactiveTab={setactiveTab}
				/>
			)}
		</>
	);
}

function ElementContainer({
	block,
	handleBlockUpdate,
	onTemplateDrop,
	draggedTemplate,
	setCurretnElement,
	setactiveTab,
}) {

	const [isDragging, setIsDragging] = useState(false);



	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();

		if (draggedTemplate) {
			onTemplateDrop(draggedTemplate, block.id);
		}
	};

	return (
		<div
			style={{ display: "block" }}
			onDragOver={(e) => e.preventDefault()}
			onDrop={handleDrop}
			id={`element-${block.id}`}
			className={`container ${isDragging ? "drag-over" : ""}`}
		>


			<ReactSortable
				tag={Fragment}
				list={block.children || []}
				setList={(newState) => handleBlockUpdate(newState, block.id)}
				{...childSortableOptions}
			// Directly map child elements to avoid extra div
			>

				<>
					{block.children.length == 0 && (
						<div className="text-center text-xl min-h-40 flex align-middle items-center justify-center">
							<span>+</span>
						</div>)}
				</>


				{block.children?.map((child) => (
					<ElementOthers
						key={child.id}
						block={child}
						handleBlockUpdate={handleBlockUpdate}
						onTemplateDrop={onTemplateDrop}
						draggedTemplate={draggedTemplate}
						setCurretnElement={setCurretnElement}
						setactiveTab={setactiveTab}
					/>
				))}
			</ReactSortable>
		</div>
	);
}

function ElementLayer({
	block,
	handleBlockUpdate,
	onTemplateDrop,
	draggedTemplate,
	setCurretnElement,
	setactiveTab,
}) {

	const [isDragging, setIsDragging] = useState(false);

	const [dragging, setDragging] = useState(false);


	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();

		if (draggedTemplate) {
			onTemplateDrop(draggedTemplate, block.id);
		}
	};

	return (
		<div id={`element-${block.id}`}
			className={`layer ${isDragging ? "drag-over" : ""} border border-dashed border-gray-400`}
			onDragOver={(e) => e.preventDefault()}
			onDrop={handleDrop}
		>
			<ReactSortable
				tag={Fragment}
				list={block.children || []}
				setList={(newState) => handleBlockUpdate(newState, block.id)}
				{...childSortableOptions}
			// Directly map child elements to avoid extra div



			>

				<>
					{block.children.length == 0 && (
						<div className="text-center text-xl min-h-40 flex align-middle items-center justify-center" >
							<span>+</span>
						</div>
					)}
				</>


				{block.children?.map((child) => (
					<ElementOthers
						key={child.id}
						block={child}
						handleBlockUpdate={handleBlockUpdate}
						onTemplateDrop={onTemplateDrop}
						draggedTemplate={draggedTemplate}
						setCurretnElement={setCurretnElement}
						setactiveTab={setactiveTab}
					/>
				))}
			</ReactSortable>
		</div>
	);
}














function ElementRoot({
	block,
	handleBlockUpdate,
	onTemplateDrop,
	draggedTemplate,
	setCurretnElement,
	setactiveTab,
}) {
	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();

		if (draggedTemplate) {
			onTemplateDrop(draggedTemplate, block.id);
		}
	};


	const [isDragging, setIsDragging] = useState(false);


	return (
		<div
			onStart={() => setIsDragging(true)}
			onEnd={() => setIsDragging(false)}
			// Directly map child elements to avoid extra div
			className={`root border border-dashed border-gray-400 relative ${isDragging ? "drag-over" : ""}`}
			id={`element-${block.id}`}>

			<ReactSortable
				tag={Fragment}
				list={block.children || []}
				setList={(newState) => handleBlockUpdate(newState, block.id)}
				{...childSortableOptions}
			>

				<>

					{block.children.length == 0 && (
						<div className="text-center text-xl min-h-40 flex align-middle items-center justify-center">
							<span>+</span>
						</div>
					)}
				</>



				{block.children?.map((child) => (
					<ElementOthers
						key={child.id}
						block={child}
						handleBlockUpdate={handleBlockUpdate}
						onTemplateDrop={onTemplateDrop}
						draggedTemplate={draggedTemplate}
						setCurretnElement={setCurretnElement}
						setactiveTab={setactiveTab}
					/>
				))}
			</ReactSortable>
		</div>
	);
}




export default function LayoutGenerator({ onChange, customerData, addNotifications, layouts, postData }) {


	var [postId, setpostId] = useState(postData.ID);
	var isProcustomer = customerData?.isPro;

	var defaultLayoutElements = [
		{
			id: 1,
			type: "root",

			children: [

			],
			parent_id: null,

		},
	];

	const [blocks, setBlocks] = useState(
		layouts.length == 0 ? defaultLayoutElements : layouts
	);
	const [activeTab, setactiveTab] = useState("elements");

	useEffect(() => {

		onChange(blocks);
	}, [blocks]);

	const [selectedElement, setselectedElement] = useState(null);
	const [selectedElementId, setselectedElementId] = useState(null);
	const [draggedTemplate, setDraggedTemplate] = useState(null);


	useEffect(() => {


		const traverse = (items) => {
			const result = [];

			for (const item of items) {
				if (item.id === selectedElementId) {
					//removedItem = { ...selectedElement }; // Found the item, don't include it
					result.push(selectedElement);
				} else {
					const newItem = { ...item };
					if (newItem.children) {
						newItem.children = traverse(newItem.children);
					}
					result.push(newItem);
				}
			}

			return result;
		};

		const newBlocks = traverse(blocks);

		onChange(newBlocks);
		setBlocks(newBlocks);
	}, [selectedElement]);

	const setCurretnElement = (id = null) => {



		setselectedElementId(id);
		//findSelectedElement(blocks, id);

		const element = findElementById(blocks, id);
		setselectedElement(element);

		setactiveTab("edit");
	};

	const generatingUniqueId = () => {
		const ids = [];
		const collectIds = (items) => {
			items.forEach((item) => {
				ids.push(item.id);
				if (item.children) collectIds(item.children);
			});
		};
		collectIds(blocks);
		return ids.length > 0 ? Math.max(...ids) + 1 : 1;
	};

	const handleTemplateAdd = (template, parentId = null) => {
		const newItem = {
			id: generatingUniqueId(),
			type: template.type,
			parent_id: parentId,
			options: template.options,
			styles: template.styles,
			children: template.children ? [] : undefined,
			cssSelectors: template.cssSelectors ? template.cssSelectors : null,
		};



		var isPro = template?.isPro;

		if (!isProcustomer) {
			if (isPro) {

				addNotifications({
					title: "Opps its pro!",
					content: "Sorry this elemet is avilable in pro.",
					type: "error",
				});


				return;
			}
		}

		// if (isPro)
		// 	console.log(template);


		setBlocks((prev) => {
			const addToParent = (items) =>
				items.map((item) => {
					if (item.id === parentId) {
						return {
							...item,
							children: [...(item.children || []), newItem],
						};
					}
					if (item.children) {
						return {
							...item,
							children: addToParent(item.children),
						};
					}
					return item;
				});

			return parentId === null ? [...prev, newItem] : addToParent(prev);
		});
	};

	const findAndRemoveItem = (blocks, id) => {
		let removedItem = null;

		const traverse = (items) => {
			const result = [];

			for (const item of items) {
				if (item.id === id) {
					removedItem = { ...item }; // Found the item, don't include it
				} else {
					const newItem = { ...item };
					if (newItem.children) {
						newItem.children = traverse(newItem.children);
					}
					result.push(newItem);
				}
			}

			return result;
		};

		const newBlocks = traverse(blocks);
		return { newBlocks, removedItem };
	};




	function findElementById(tree, id) {
		for (const node of tree) {
			if (node.id === id) return node;
			if (node.children) {
				const result = findElementById(node.children, id);
				if (result) return result;
			}
		}
		return null;
	}







	const handleBlockUpdate = (updatedList, parentId = null) => {


		setBlocks((prevBlocks) => {
			let newBlocks = [...prevBlocks];

			updatedList = updatedList.map((item) => {
				// If the item exists elsewhere in the tree, remove it first
				const searchResult = findAndRemoveItem(newBlocks, item.id);

				// if (searchResult.removedItem) {
				// 	newBlocks = searchResult.newBlocks;
				// 	// Preserve the original item's properties while updating parent_id
				// 	return {
				// 		...searchResult.removedItem,
				// 		parent_id: parentId,
				// 	};
				// }

				// If the item wasn't found elsewhere, it's new to this location
				return {
					...item,
					parent_id: parentId,
				};
			});

			// If this is a top-level update, return the new list
			if (parentId === null) {
				return updatedList;
			}

			// Otherwise, find the parent container and update its children
			const updateChildren = (blocks) => {
				return blocks.map((block) => {
					if (block.id === parentId) {
						return { ...block, children: updatedList };
					}
					if (block.children) {
						return {
							...block,
							children: updateChildren(block.children),
						};
					}
					return block;
				});
			};

			return updateChildren(newBlocks);
		});
	};

	var breakPointX = "Desktop";
	var myStore = wp.data.select("PostGridStore");



	var dateFormats = {
		"Y-M-d": { label: "2022-Feb-25", value: "Y-M-d" },
		"Y-m-d": { label: "2022-05-25", value: "Y-m-d" },
		"d-m-y": { label: "25-05-2022", value: "d-m-y" },
		"d/m/y": { label: "25/05/2022", value: "d/m/y" },
		"y-m-d": { label: "2022-05-25", value: "y-m-d" },
		"y/m/d": { label: "2022/05/25", value: "y/m/d" },
		"D M y": { label: "Sun Feb 2022", value: "D M y" },
		"D M d, y": { label: "Sun Feb 11, 2022", value: "D M d, y" },
		"M D d, y": { label: "Feb Sun 11, 2022", value: "M D d, y" },
		"M d, y": { label: "Feb 11, 2022", value: "M d, y" },
		"F d, y": { label: "February 11, 2022", value: "F d, y" },
		"d M y": { label: "25 Feb 2022", value: "d M y" },
	};
	var ratingType = {
		none: { label: "Choose", value: "" },
		star: { label: "Star", value: "star" },
	};
	var elementsCategories = {
		general: { label: "General", value: "general", active: true },
		wooCommerce: { label: "Woo Commerce", value: "wooCommerce", active: false },
	};

	const handleChange = (type, value) => {
		setselectedElement({
			...selectedElement,
			options: {
				...selectedElement.options,
				[type]: value,
			},
		});
	};




	var elementOptionsHtml = applyFilters("PostGridElementOptions" + selectedElement?.type, '', selectedElement, handleChange);




	return (
		<div className="flex gap-3 bg-gray-100">
			<div className="w-[400px]">
				<PGtabs
					activeTab={activeTab}
					orientation=""
					stickyNavs={true}
					contentClass=" bg-white w-full"
					navItemClass="bg-gray-200 px-5 py-3 gap-2 grow "
					navItemLabelClass="flex-col "
					navItemSelectedClass="!bg-white"
					activeClass="active-tab"
					onSelect={(tab) => {
						setactiveTab(tab.name);
					}}
					tabs={[
						{
							name: "elements",
							title: "Elements",
							icon: columns,
							className: "elements",
						},
						{
							name: "edit",
							title: "Edit",
							icon: brush,
							className: "edit",
						},
					]}>
					<PGtab name="elements">
						<div className=" p-4">


							{Object.entries(elementsCategories).map(groupArgs => {

								var caetgoryArg = groupArgs[1];


								return (
									<>
										<PanelBody
											title={caetgoryArg.label}
											key={caetgoryArg.value}
											initialOpen={caetgoryArg.active}>

											<div className="flex gap-2  py-2 flex-wrap ">
												{Object.entries(elements).map((args) => {
													var index = args[0];
													var element = args[1];

													var hidden = element.hidden;
													// var inCategory = element.category.include(caetgoryArg.value);
													var inCategory = element?.category?.includes(caetgoryArg.value)

													var isPro = isProcustomer ? false : element.isPro;

													return (



														<>
															{!hidden && inCategory && (
																<div
																	key={element.id}
																	className={` ${isPro ? "bg-amber-500 hover:bg-amber-600" : "text-white bg-slate-500 hover:bg-slate-600"} px-2 py-1 rounded-sm cursor-move  `}
																	title={`${isPro ? "Its Pro" : ""}`}
																	draggable
																	onDragStart={() => setDraggedTemplate(element)}
																	onDragEnd={() => setDraggedTemplate(null)}>
																	<span>{element.label}
																	</span>
																</div>
															)}

														</>
													);
												})}
											</div>



										</PanelBody>

									</>
								)

							})}



						</div>
					</PGtab>
					<PGtab name="edit">
						<div className="p-3">


							{selectedElement != null && (
								<div className="py-3 flex gap-2 items-center">
									<div>You are editing: </div>
									<div>
										{selectedElement != null
											? elements[selectedElement.type]?.label
											: ""}
									</div>
								</div>
							)}


							<div className="my-5">
								{elementOptionsHtml}

							</div>

							<div className="my-3 font-medium text-slate-900">Styles</div>



							{selectedElement?.cssSelectors && (
								<>
									{Object.entries(selectedElement?.cssSelectors).map(
										([elementIndex, elementData]) => {

											function onChangeStyle(
												sudoScource,
												newVal,
												attr,
												propertyType,
												setProperty,
												elementIndex = null
											) {
												let obj = structuredClone(propertyType); // Ensure deep copy
												const path = [sudoScource, attr, breakPointX];
												const updatedObject = myStore.updatePropertyDeep(obj, path, newVal);

												setProperty((prev) => {
													if (elementIndex === null) {
														return {
															...prev,
															styles: updatedObject, // Update styles at the root level
														};
													} else {
														return {
															...prev,
															cssSelectors: {
																...prev.cssSelectors,
																[elementIndex]: updatedObject, // Update styles inside cssSelectors
															},
														};
													}
												});
											}

											function onAddStyle(
												sudoScource,
												key,
												propertyType,
												setProperty,
												elementIndex
											) {
												let obj = structuredClone(propertyType);
												const path = [sudoScource, key, breakPointX];
												const updatedObject = myStore.addPropertyDeep(obj, path, "");

												setProperty((prev) => {
													if (elementIndex === null) {
														return {
															...prev,
															styles: updatedObject, // Update styles at the root level
														};
													} else {
														return {
															...prev,
															cssSelectors: {
																...prev.cssSelectors,
																[elementIndex]: updatedObject, // Update styles inside cssSelectors
															},
														};
													}
												});
											}

											function onResetStyle(
												sudoSources,
												propertyType,
												setProperty,
												elementIndex = null
											) {
												let obj = structuredClone(propertyType); // Deep copy to avoid mutations

												Object.entries(sudoSources).forEach(([sudoSource]) => {
													if (obj[sudoSource] !== undefined) {
														obj[sudoSource] = {};
													}
												});

												if (elementIndex === null) {
													setProperty(obj); // Update root styles
												} else {
													setProperty((prev) => ({
														...prev,
														cssSelectors: {
															...prev.cssSelectors,
															[elementIndex]: obj, // Update styles inside a selector
														},
													}));
												}
											}

											function onRemoveStyle(
												sudoScource,
												key,
												propertyType,
												setProperty,
												elementIndex = null
											) {
												let obj = structuredClone(propertyType);

												let updatedObject = myStore.deletePropertyDeep(obj, [
													sudoScource,
													key,
													breakPointX,
												]);

												let isEmpty =
													Object.entries(updatedObject[sudoScource] || {})
														.length === 0;
												let finalObject = isEmpty
													? myStore.deletePropertyDeep(updatedObject, [
														sudoScource,
													])
													: updatedObject;

												if (elementIndex === null) {
													setProperty(finalObject);
												} else {
													setProperty((prev) => ({
														...prev,
														cssSelectors: {
															...prev.cssSelectors,
															[elementIndex]: finalObject,
														},
													}));
												}
											}

											function onBulkAddStyle(
												sudoSource,
												cssObj,
												propertyType,
												setProperty,
												elementIndex = null
											) {
												let obj = structuredClone(propertyType);

												obj[sudoSource] = { ...obj[sudoSource], ...cssObj }; // Merge styles

												if (elementIndex === null) {
													setProperty(obj);
												} else {
													setProperty((prev) => ({
														...prev,
														cssSelectors: {
															...prev.cssSelectors,
															[elementIndex]: obj,
														},
													}));
												}
											}

											return (
												<PanelBody
													title={selectedElement?.cssSelectors[elementIndex]?.label ? selectedElement?.cssSelectors[elementIndex]?.label : elementIndex}
													key={elementIndex}
													initialOpen={false}>
													{elementData?.styles && (
														<PGStyles
															obj={elementData}
															onChange={(sudoScource, newVal, attr) =>
																onChangeStyle(
																	sudoScource,
																	newVal,
																	attr,
																	elementData,
																	setselectedElement,
																	elementIndex
																)
															}
															onAdd={(sudoScource, key) =>
																onAddStyle(
																	sudoScource,
																	key,
																	elementData,
																	setselectedElement,
																	elementIndex
																)
															}
															onRemove={(sudoScource, key) =>
																onRemoveStyle(
																	sudoScource,
																	key,
																	elementData,
																	setselectedElement,
																	elementIndex
																)
															}
															onReset={(sudoSources) =>
																onResetStyle(
																	sudoSources,
																	elementData,
																	setselectedElement,
																	elementIndex
																)
															}
															onBulkAdd={(sudoSource, cssObj) =>
																onBulkAddStyle(
																	sudoSource,
																	cssObj,
																	elementData,
																	setselectedElement,
																	elementIndex
																)
															}
														/>
													)}
												</PanelBody>
											);
										}
									)}
								</>
							)}
						</div>
					</PGtab>
				</PGtabs>
			</div>

			<div className="flex-1 justify-between max-w-[450px] w-full min-h-full ">
				<div className="flex items-center justify-between bg-slate-400 px-3 py-3">
					<div className="text-[20px] font-bold">Preview</div>
				</div>

				<div id={`post-grid-${postId}`} className="p-3 overflow-hidden min-h-10">
					<ReactSortable
						list={blocks}
						setList={handleBlockUpdate}
						{...parentSortableOptions}>
						{blocks.map((block) => (
							<ElementOthers
								key={block.id}
								block={block}
								handleBlockUpdate={handleBlockUpdate}
								onTemplateDrop={handleTemplateAdd}
								draggedTemplate={draggedTemplate}
								setCurretnElement={setCurretnElement}
								setactiveTab={setactiveTab}
							/>
						))}
					</ReactSortable>
				</div>
			</div>
			<div className="w-[300px]">
				<div className="border border-solid">
					<TreeView
						blocks={blocks}
						setBlocks={setBlocks}
						selected={selectedElementId}
						setSelected={setCurretnElement}
					/>
				</div>
			</div>
		</div>
	);
}
