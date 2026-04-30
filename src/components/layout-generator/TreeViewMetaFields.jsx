import { close, Icon, pages } from '@wordpress/icons';
import React from 'react'
import { ReactSortable } from 'react-sortablejs';
import postMetaPrams from "./postMetaPrams";

const sortableOptions = {
	animation: 150,
	fallbackOnBody: true,
	swapThreshold: 0.65,
	ghostClass: "ghost",
	group: "shared",
	filter: ".no-drag",
	preventOnFilter: false,
};

const TreeViewMetaFields = ({ blocks, setPrams }) => {


	return (
		<div>

			<div className='p-2'>
				<ReactSortable list={blocks} setList={setPrams} {...sortableOptions}>
					{typeof blocks == 'object' && blocks?.map((block, blockIndex) => (
						<BlockWrapper
							key={block.id}
							block={block}
							blockIndex={[blockIndex]}
							setPrams={setPrams}
						/>
					))}
				</ReactSortable>
			</div>



		</div>
	);
}

function Container({ block, blockIndex, setPrams }) {



	return (
		<>
			<ReactSortable
				key={block.id}
				list={block.children}
				setList={(currentList) => {

					setPrams((sourceList) => {
						const tempList = [...sourceList];
						const _blockIndex = [...blockIndex];
						const lastIndex = _blockIndex.pop();
						const lastArr = _blockIndex.reduce((arr, i) => arr[i]["children"], tempList);
						lastArr[lastIndex]["children"] = currentList;
						return tempList;
					});
				}}
				{...sortableOptions}>
				{block.children &&
					block.children.map((childBlock, index) => {
						return (
							<BlockWrapper
								key={childBlock.id}
								block={childBlock}
								blockIndex={[...blockIndex, index]}
								setPrams={setPrams}
							/>
						);
					})}
			</ReactSortable>
		</>
	);
}


function BlockWrapper({ block, blockIndex, setPrams }) {
	if (!block) return null;
	const handleRemove = () => {
		if (block.type == "root") {
			return
		}
		setPrams((prev) => {
			const updatedBlocks = [...prev];
			removeNestedBlock(updatedBlocks, blockIndex);
			return updatedBlocks;
		});
	};




	return (
		<div className={`block ${block.type == "root" ? "no-drag " : ""} ${block.type == "container" || block.type == "layer" ? "border-0 border-l border-solid" : ""} relative my-2  pl-2`}>
			<div
				className={`flex items-center  border border-solid px-2 py-1 cursor-pointer hover:bg-gray-300  `}
			>
				<span className="flex-1 overflow-hidden truncate text-md">
					{postMetaPrams[block.type] != undefined ? postMetaPrams[block.type]?.label : block.type}
				</span>
				<div className="flex items-center gap-2">
					<span
						className="size-6 bg-red-500 flex items-center justify-center cursor-pointer"
						onClick={handleRemove}
					>
						<Icon icon={close} fill="#fff" size={18} />
					</span>

				</div>
			</div>
			{["root", "container", 'layer'].includes(block.type) && (
				<Container
					block={block}
					setPrams={setPrams}
					blockIndex={blockIndex}
				/>
			)}
		</div>
	);



}

function getNestedBlock(blocks, indices) {
	return indices.reduce((block, index) => block.children[index], {
		children: blocks,
	});
}

function removeNestedBlock(blocks, indices) {
	if (indices.length === 1) {
		blocks.splice(indices[0], 1);
	} else {
		const parentBlock = getNestedBlock(blocks, indices.slice(0, -1));
		parentBlock.children.splice(indices[indices.length - 1], 1);
	}
}

export default TreeViewMetaFields