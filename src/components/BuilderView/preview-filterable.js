const { Component, RawHTML, useState, useEffect } = wp.element;
import { applyFilters, doAction, addAction, addFilter } from "@wordpress/hooks";
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




	/*Selectors*/
	var [globalOptions, setglobalOptions] = useState(PostGridData.globalOptions);

	var [wrapper, setwrapper] = useState(PostGridData.wrapper);
	var [items, setitems] = useState([{}, {}, {}]);
	var [itemsWrap, setitemsWrap] = useState(PostGridData.itemsWrap);
	var [itemWrap, setitemWrap] = useState(PostGridData.itemWrap);
	var [loopLayout, setloopLayout] = useState(PostGridData.loopLayout);
	var [activeFilter, setactiveFilter] = useState(PostGridData.activeFilter);
	var [pagination, setpagination] = useState(PostGridData.pagination);
	var [postsData, setpostsData] = useState([]);


	const [previousIconHtml, setpreviousIconHtml] = useState("");
	const [nextIconHtml, setnextIconHtml] = useState("");


	var dummyFilters = [
		{
			"groupTitle": "News",
			"type": "",
			"logic": "",
			"showPostCount": "",
			"items": [
				{
					"id": 0,
					"slug": "email-marketing",
					"title": "Email Marketing",
					"count": "123"
				},
				{
					"id": 0,
					"slug": "email-verification",
					"title": "Email Verification",
					"count": "124"
				},
				{
					"id": 0,
					"slug": "email-list",
					"title": "Email List",
					"count": "125"
				}
			]
		},

	];


	useEffect(() => {


		var iconSrc = PostGridData.pagination?.previousIcon?.iconSrc;

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

		setglobalOptions(PostGridData.globalOptions)

	}, [PostGridData]);



	useEffect(() => {



	}, [loopLayout, PostGridData.loopLayout]);

	useEffect(() => {
		setPostGridData(postData.post_content);

	}, [postData]);




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


				<div className="filterable-group-wrap">
					<div className="filterable-group">
						{globalOptions?.showAll == "yes" && (
							<>
								<div
									className="pg-filter mixitup-control-active    filter-34534"
									data-filter="all">
									All
								</div>
							</>
						)}
					</div>


					{globalOptions.filters?.length > 0 &&
						globalOptions.filters.map((x) => {
							return (
								<div className="filterable-group " data-logic={x.logic}>
									{globalOptions.multifilter && (
										<>
											{(x.groupTitle) && (
												<div className="filterable-group-title ">
													{x.groupTitle}
												</div>
											)}
										</>
									)}




									{x.items.map((y) => {
										return (
											<div
												className={[
													activeFilter.options.slug == y.slug
														? "mixitup-control-active pg-filter cursor-pointer"
														: "pg-filter cursor-pointer",
												]}
												terms-id={y.id}
												data-filter={"." + y.slug}>
												{y.title}
												{x.showPostCount == "yes" ? "(" + y.count + ")" : ""}
											</div>
										);
									})}
								</div>
							);
						})}
					{globalOptions.filters?.length == 0 &&
						dummyFilters.map((x) => {
							return (
								<div className="filterable-group " data-logic={x.logic}>

									{globalOptions.multifilter && (
										<>
											{(x.groupTitle && globalOptions.multifilter) && (
												<div className="filterable-group-title ">
													{x.groupTitle}
												</div>
											)}
										</>
									)}



									{x.items.map((y) => {
										return (
											<div
												className={[
													activeFilter.options.slug == y.slug
														? "mixitup-control-active pg-filter cursor-pointer"
														: "pg-filter cursor-pointer",
												]}
												terms-id={y.id}
												data-filter={"." + y.slug}>
												{y.title}
												{x.showPostCount == "yes" ? "(" + y.count + ")" : ""}
											</div>
										);
									})}
								</div>
							);
						})}




					<div className="filterable-group">
						{globalOptions?.showSort == "yes" && (
							<>
								<div
									className="pg-filter mixitup-control-active   filter-34534"
									data-filter="">
									ASC
								</div>
								<div
									className="pg-filter    filter-34534"
									data-filter="">
									DESC
								</div>
							</>
						)}
						{globalOptions?.showRandom == "yes" && (
							<>
								<div
									className="pg-filter   filter-34534"
									data-filter="">
									Random
								</div>
							</>
						)}
						{globalOptions?.showClear == "yes" && (
							<>
								<div
									className="pg-filter  filter-34534"
									data-filter="">
									Clear
								</div>
							</>
						)}
					</div>
				</div>




				<div className={`${itemsWrap?.options?.class} `}>
					{postsData?.map((item, loopIndex) => {

						var children = PostGridData.loopLayout[0]?.children ? PostGridData.loopLayout[0]?.children : [];

						return (
							<div
								key={loopIndex}
								className={`${itemWrap?.options?.class} `}>

								<LoopItems loopLayout={children} itemData={item} />
							</div>
						);
					})}
				</div>


				{PostGridData.globalOptions.itemSource == "posts" && (
					<div class="pagination ">


						{(PostGridData.globalOptions?.pagination?.type == 'filterable') && (
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
								<span aria-current="page" class="page-numbers mixitup-control-active">
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

class PreviewGrid extends Component {
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

export default PreviewGrid;