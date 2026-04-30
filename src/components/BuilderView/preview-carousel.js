const { Component, RawHTML, useState, useEffect } = wp.element;
import apiFetch from "@wordpress/api-fetch";
import { Popover, Spinner } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { Icon, close, cog, addCard, helpFilled, help } from "@wordpress/icons";

import { Fragment } from "react";
import PGinputSelect from "../input-select";
import PGinputText from "../input-text";
import { Splide, SplideTrack } from "@splidejs/react-splide";
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { Grid } from '@splidejs/splide-extension-grid';
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
	var [loopLayout, setloopLayout] = useState(PostGridData.loopLayout);

	var [wrapper, setwrapper] = useState(PostGridData.wrapper);
	var [items, setitems] = useState(PostGridData.items);

	var [navsWrap, setnavsWrap] = useState(PostGridData?.navsWrap);
	var [navItem, setnavItem] = useState(PostGridData?.navItem);
	var [postsData, setpostsData] = useState([]);





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
		setloopLayout(PostGridData.loopLayout);
		setitems(PostGridData.items);
		setnavsWrap(PostGridData.navsWrap);
		setnavItem(PostGridData.navItem);

	}, [PostGridData]);



	function unescapeHTML(str) {
		const map = {
			'&amp;': '&',
			'&lt;': '<',
			'&gt;': '>',
			'&quot;': '"',
			'&#039;': "'"
		};
		return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function (match) {
			return map[match];
		});
	}

	var loopLayout = PostGridData.loopLayout

	var itemWrap = PostGridData?.itemWrap;
	var sliderOptions = PostGridData?.sliderOptions;
	var prev = PostGridData?.prev;
	var next = PostGridData?.next;
	var prevIcon = PostGridData?.prevIcon;
	var nextIcon = PostGridData?.nextIcon;

	const [prevIconHtml, setPrevIconHtml] = useState("");
	const [nextIconHtml, setNextIconHtml] = useState("");

	useEffect(() => {
		var iconSrc = nextIcon?.options?.iconSrc;
		var iconHtml = `<span class="${iconSrc}"></span>`;
		setNextIconHtml(iconHtml);
	}, [nextIcon?.options]);
	useEffect(() => {
		var iconSrc = prevIcon?.options?.iconSrc;
		var iconHtml = `<span class="${iconSrc}"></span>`;
		setPrevIconHtml(iconHtml);
	}, [prevIcon?.options]);



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

			{JSON.stringify(postsData)}


			<div id={`post-grid-${id}`} className={`${wrapper?.options?.class} `}>
				<div className={`my-5 ${wrapper?.options?.class} `}>
					<Splide hasTrack={false} options={sliderOptions}>
						<SplideTrack className={"items"}>

							{postsData?.map((item, loopIndex) => {

								var children = PostGridData.loopLayout[0]?.children ? PostGridData.loopLayout[0]?.children : [];

								return (
									<div key={loopIndex} className={`${itemWrap?.options?.class} splide__slide item`}>

										<LoopItems loopLayout={children} itemData={item} />
									</div>
								);
							})}



						</SplideTrack>
						<div className="splide__arrows ">
							<div className="prev nav-item splide__arrow splide__arrow--prev">
								{prevIcon?.options.position == "before" && (
									<span
										className="icon"
										dangerouslySetInnerHTML={{ __html: prevIconHtml }}
									/>
								)}
								{prev?.options.text.length > 0 && (
									<span> {prev.options.text} </span>
								)}
								{prevIcon?.options.position == "after" && (
									<span
										className="icon"
										dangerouslySetInnerHTML={{ __html: prevIconHtml }}
									/>
								)}
							</div>
							<div className="next nav-item splide__arrow splide__arrow--next">
								{nextIcon?.options.position == "before" && (
									<span
										className="icon"
										dangerouslySetInnerHTML={{ __html: nextIconHtml }}
									/>
								)}
								{next?.options.text.length > 0 && (
									<span> {next.options.text} </span>
								)}
								{nextIcon?.options.position == "after" && (
									<span
										className="icon"
										dangerouslySetInnerHTML={{ __html: nextIconHtml }}
									/>
								)}
							</div>
						</div>
						<ul className="splide__pagination "></ul>
					</Splide>
				</div>
			</div>
		</div>
	);
}

class PreviewCarousel extends Component {
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
			onChangeStyleObj
		} = this.props;

		return (
			<Html
				postData={postData}
				id={id}
				onChangeStyleObj={onChangeStyleObj}

				warn={this.state.showWarning}
			/>
		);
	}
}

export default PreviewCarousel;
