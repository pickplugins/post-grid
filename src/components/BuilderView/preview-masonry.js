const { Component, RawHTML, useState, useEffect } = wp.element;

import Masonry from "masonry-layout";
import LoopItems from "./LoopItems";
import { dummyPosts } from "./dummy-posts";
import { dummyProducts } from "./dummy-products";

var myStore = wp.data.select("PostGridStore");

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var id = props.id;


	if (props.postData.post_content == null) {
		return null;
	}

	var [postData, setpostData] = useState(props.postData);
	var [PostGridData, setPostGridData] = useState(postData.post_content);

	var [globalOptions, setglobalOptions] = useState(PostGridData.globalOptions);

	var [wrapper, setwrapper] = useState(PostGridData.wrapper);
	var [itemsWrap, setitemsWrap] = useState(PostGridData.itemsWrap);
	var [itemWrap, setitemWrap] = useState(PostGridData.itemWrap);
	var [items, setitems] = useState(PostGridData.items);
	var [loopLayout, setloopLayout] = useState(PostGridData.loopLayout);
	var [masonryOptions, setmasonryOptions] = useState(
		PostGridData.masonryOptions
	);
	var [pagination, setpagination] = useState(PostGridData.pagination);
	var [postsData, setpostsData] = useState([]);

	const [loadingIconHtml, setloadingIconHtml] = useState("");
	const [loadMoreIconHtml, setloadMoreIconHtml] = useState("");
	const [previousIconHtml, setpreviousIconHtml] = useState("");
	const [nextIconHtml, setnextIconHtml] = useState("");

	useEffect(() => {
		var iconSrc = PostGridData.pagination?.loadingIcon?.iconSrc;
		var loadingIconHtml = `<span class="${iconSrc}"></span>`;
		setloadingIconHtml(loadingIconHtml);

		var iconSrc = PostGridData.pagination?.loadMoreIcon?.iconSrc;
		var loadMoreIconHtml = `<span class="${iconSrc}"></span>`;
		setloadMoreIconHtml(loadMoreIconHtml);

		var iconSrc = PostGridData.pagination?.previousIcon?.iconSrc;

		console.log(iconSrc)
		var previousIconHtml = `<span class="${iconSrc}"></span>`;
		setpreviousIconHtml(previousIconHtml);

		var iconSrc = PostGridData.pagination?.nextIcon?.iconSrc;
		var nextIconHtml = `<span class="${iconSrc}"></span>`;
		setnextIconHtml(nextIconHtml);




		setpagination(PostGridData.globalOptions.pagination)

	}, [PostGridData.globalOptions.pagination]);





	useEffect(() => {
		setpostData(props.postData);
	}, [props.postData]);

	useEffect(() => {
		setPostGridData(postData.post_content);
		//setitems(postData.post_content.items);
	}, [postData]);

	useEffect(() => {
		setglobalOptions(PostGridData.globalOptions);

		setwrapper(PostGridData.wrapper);
		setitemsWrap(PostGridData.itemsWrap);
		setitemWrap(PostGridData.itemWrap);
		setitems(PostGridData.items);
		setloopLayout(PostGridData.loopLayout);
		setmasonryOptions(PostGridData.masonryOptions);
		setTimeout(() => {
			loadMasonry();
		}, 2000);
	}, [PostGridData]);



	useEffect(() => {

		var postType = PostGridData?.itemQueryArgs.postType.value

		if (postType.includes("product")) {
			postsData = dummyProducts
		} else {
			postsData = dummyPosts
		}



		var count = parseInt(PostGridData?.itemQueryArgs?.postsPerPage?.value)
		var result = postsData.slice(0, count);  // Returns the first 3 elements
		setpostsData(result)

	}, [PostGridData.itemQueryArgs]);


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



	var blockClass = "#post-grid-" + postData.ID;

	function loadMasonry() {
		// var elemX = document.querySelectorAll("." + blockId);
		var elemX = document.querySelector(blockClass + " > .items");

		console.log(elemX);


		if (elemX != null) {
			// elemX.forEach((arg) => {
			// imagesLoaded(elemX, function () {
			var msnry = new Masonry(elemX, masonryOptions);
			// });
			// });
		}
	}
	useEffect(() => {


		setTimeout(() => {
			loadMasonry();
		}, 2000);
	}, [masonryOptions]);



	const Tree = ({ loopLayout, itemData }) => {
		return (
			<div>
				{loopLayout.map((node) => (
					<TreeNode key={node.id} node={node} itemData={itemData} />
				))}
			</div>
		);
	};







	const GenerateNodeHtml = ({ node, itemData }) => {
		var nodeType = node.type;
		var nodeId = node.id;

		var html = applyFilters("PostGridElementHtml" + nodeType, '', itemData, node);

		return html;


	};

	const TreeNode = ({ node, itemData }) => {
		var nodeType = node.type;

		if (nodeType == "root" || nodeType == "container") {
			return (
				<div id={`element-${node.id}`} className={`${node.type}`}>
					{node.children && (
						<>
							{node.children.map((child) => (
								<TreeNode key={child?.id} node={child} itemData={itemData} />
							))}
						</>
					)}
				</div>
			);
		} else {
			return <GenerateNodeHtml node={node} itemData={itemData} />;
		}
	};









	return (
		<div className="p-5">
			<div id={`post-grid-${id}`} className={`${wrapper?.options?.class} `}>
				<div className={`items ${itemsWrap?.options?.class} `}>
					{postsData?.map((item, loopIndex) => {

						var children = PostGridData.loopLayout[0]?.children ? PostGridData.loopLayout[0]?.children : [];

						return (
							<div
								key={loopIndex}
								className={`${itemWrap?.options?.class} item`}>
								<LoopItems loopLayout={children} itemData={item} />
							</div>
						);
					})}
				</div>


				{PostGridData.globalOptions.itemSource == "posts" && (
					<div class="pagination ">




						{PostGridData.globalOptions?.pagination?.type == "next_previous" && (
							<>
								<span className="page-numbers prev">
									<span
										className=""
										dangerouslySetInnerHTML={{ __html: previousIconHtml }}
									/>
									{pagination?.previousText}

								</span>
								<span className="page-numbers next">

									{pagination?.nextText}
									<span
										className=""
										dangerouslySetInnerHTML={{ __html: nextIconHtml }}
									/>
								</span>
							</>
						)}
						{PostGridData.globalOptions?.pagination?.type == "loadmore" && (
							<>
								<div className="page-numbers">

									<span
										dangerouslySetInnerHTML={{ __html: loadMoreIconHtml }}
									/>

									{pagination?.loadMoreText}

								</div>
							</>
						)}
						{PostGridData.globalOptions?.pagination?.type == "infinite" && (
							<div className="page-numbers">

								{pagination.loadMoreText}
								<span
									dangerouslySetInnerHTML={{ __html: loadingIconHtml }}
								/>
							</div>
						)}


						{(PostGridData.globalOptions?.pagination?.type == 'normal' || PostGridData.globalOptions?.pagination?.type == 'ajax') && (
							<>

								<a class="prev page-numbers" href="#1" onClick={ev => {
									ev.preventDefault();
								}}>

									<span class="previous ">

										<span
											className=""
											dangerouslySetInnerHTML={{ __html: previousIconHtml }}
										/>
										{pagination?.previousText}</span>
								</a>
								<a class="page-numbers" href="#1" onClick={ev => {
									ev.preventDefault();
								}}>
									1
								</a>
								<span aria-current="page" class="page-numbers current">
									2
								</span>
								<a class="page-numbers" href="#3" onClick={ev => {
									ev.preventDefault();
								}}>
									3
								</a>
								<a class="page-numbers" href="#4" onClick={ev => {
									ev.preventDefault();
								}}>
									4
								</a>
								<span class="page-numbers dots">…</span>
								<a class="page-numbers" href="#6">
									6
								</a>
								<a class="next page-numbers" href="#3" onClick={ev => {
									ev.preventDefault();
								}}>
									<span class="next ">

										{pagination?.nextText}
										<span
											className=""
											dangerouslySetInnerHTML={{ __html: nextIconHtml }}
										/>
									</span>
								</a>

							</>
						)}


					</div>
				)}

			</div>
		</div>
	);
}

class PreviewMasonry extends Component {
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
		} = this.props;

		return (
			<Html
				postData={postData}
				id={id}
				warn={this.state.showWarning}
			/>
		);
	}
}

export default PreviewMasonry;
