const { addFilter } = wp.hooks;
import { __ } from "@wordpress/i18n";
const { Component, useState, useEffect } = wp.element;
import apiFetch from "@wordpress/api-fetch";



//var [customerData, setcustomerData] = useState({ id: "", isPro: false });



apiFetch({
	path: "/post-grid/v2/get_options",
	method: "POST",
	data: { option: "post_grid_settings" },
}).then((res) => {
	if (res.length != 0) {
		var resX = { ...res };


		if (resX?.license_key) {
			//setcustomerData({ ...customerData, isPro: true })



			const sudoScourceArgsPro = {
				styles: { label: "Idle", value: "styles" },
				hover: { label: "Hover", value: "hover" },
				after: { label: "After", value: "after" },
				before: { label: "Before", value: "before" },
				active: { label: "Active", value: "active" },
				focus: { label: "Focus", value: "focus" },
				"focus-within": {
					label: "Focus-within",
					value: "focus-within",
				},
				target: { label: "target", value: "target" },
				visited: { label: "Visited", value: "visited" },
				selection: { label: "Selection", value: "selection" },
				":marker": { label: "Marker", value: ":marker" },
				"nth-child(even)": {
					label: "nth-child(even)",
					value: "nth-child(even)",
				},
				"nth-child(odd)": {
					label: "nth-child(odd)",
					value: "nth-child(odd)",
				},
				"nth-child(1)": {
					label: "nth-child(1)",
					value: "nth-child(1)",
				},
				"nth-child(2)": {
					label: "nth-child(2)",
					value: "nth-child(2)",
				},
				"nth-child(3)": {
					label: "nth-child(3)",
					value: "nth-child(3)",
				},
				"nth-child(4)": {
					label: "nth-child(4)",
					value: "nth-child(4)",
				},
				"nth-child(5)": {
					label: "nth-child(5)",
					value: "nth-child(5)",
				},

				"first-child": { label: "First-child", value: "first-child" },
				"last-child": { label: "Last-child", value: "last-child" },
				"first-letter": {
					label: "First-letter",
					value: "first-letter",
				},
				"first-line": { label: "First-line", value: "first-line" },
				"hover::before": { label: "hover::before", value: "hover::before" },
				"hover::after": { label: "hover::after", value: "hover::after" },
				"hover::marker": {
					label: "hover::marker",
					value: "hover::marker",
				},
				"hover::first-letter": {
					label: "hover::first-letter",
					value: "hover::first-letter",
				},
				"hover:first-child": {
					label: "hover:first-child",
					value: "hover:first-child",
				},
				"hover:last-child": {
					label: "hover:last-child",
					value: "hover:last-child",
				},
				"hover:first-line": {
					label: "hover:first-line",
					value: "hover:first-line",
				},
				"hover:first-line": {
					label: "hover:first-line",
					value: "hover:first-line",
				},
				"hover:nth-child(odd)": {
					label: "hover:nth-child(odd)",
					value: "hover:nth-child(odd)",
				},
				"hover:nth-child(even)": {
					label: "hover:nth-child(even)",
					value: "hover:nth-child(even)",
				},
				"hover div:nth-child(1)": {
					label: "hover div:nth-child(1)",
					value: "hover div:nth-child(1)",
				},
				"hover div:nth-child(2)": {
					label: "hover div:nth-child(2)",
					value: "hover div:nth-child(2)",
				},

				"-webkit-slider-thumb": {
					label: "-webkit-slider-thumb",
					value: "-webkit-slider-thumb",
				},
				"-moz-range-thumb": {
					label: "-moz-range-thumb",
					value: "-moz-range-thumb",
				},
				checked: { label: "checked", value: "checked" },
				"checked:after": {
					label: "checked:after",
					value: "checked:after",
				},
				"checked:before": {
					label: "checked:before",
					value: "checked:before",
				},
				"has(> input:checked)": {
					label: "has(> input:checked)",
					value: "has(> input:checked)",

				},
				"has(> input[type=radio]:checked)": {
					label: "has(> input[type=radio]:checked)",
					value: "has(> input[type=radio]:checked)",

				},
				"has(> input[type=checkbox]:checked)": {
					label: "has(> input[type=checkbox]:checked)",
					value: "has(> input[type=checkbox]:checked)",

				},
			};

			addFilter("sudoScourceArgs", "post-grid/sudoScourceArgs", function (options) {
				return sudoScourceArgsPro;
			});


			var cssPropsPro = {
				alignContent: { id: "alignContent", label: "Align Content" },
				alignItems: { id: "alignItems", label: "Align Items" },
				alignSelf: { id: "alignSelf", label: "Align Self" },
				animationName: { id: "animationName", label: "Animation Name" },
				aspectRatio: { id: "aspectRatio", label: "Aspect Ratio" },
				backdropFilter: {
					id: "backdropFilter",
					label: "Backdrop Filter",
				},
				backfaceVisibility: {
					id: "backfaceVisibility",
					label: "Backface Visibility",
				},
				backgroundAttachment: {
					id: "backgroundAttachment",
					label: "Background Attachment",
				},
				backgroundBlendMode: {
					id: "backgroundBlendMode",
					label: "Background Blend Mode",
				},
				backgroundClip: {
					id: "backgroundClip",
					label: "Background Clip",
				},
				backgroundColor: { id: "backgroundColor", label: "Background Color" },
				backgroundImage: {
					id: "backgroundImage",
					label: "Background Image",
				},
				backgroundOrigin: { id: "backgroundOrigin", label: "Background Origin" },
				backgroundPosition: {
					id: "backgroundPosition",
					label: "Background Position",
				},
				backgroundRepeat: { id: "backgroundRepeat", label: "Background Repeat" },
				backgroundSize: { id: "backgroundSize", label: "Background Size" },
				border: { id: "border", label: "Border" },
				borderBottom: { id: "borderBottom", label: "Border Bottom" },
				borderCollapse: {
					id: "borderCollapse",
					label: "Border Collapse",
				},
				borderImage: { id: "borderImage", label: "Border Image" },
				borderLeft: { id: "borderLeft", label: "Border Left" },
				borderRadius: { id: "borderRadius", label: "Border Radius" },
				borderRight: { id: "borderRight", label: "Border Right" },
				borderSpacing: { id: "borderSpacing", label: "Border Spacing" },
				borderTop: { id: "borderTop", label: "Border Top" },
				bottom: { id: "bottom", label: "Bottom" },
				boxShadow: { id: "boxShadow", label: "Box Shadow" },
				boxSizing: { id: "boxSizing", label: "Box Sizing" },
				captionSide: { id: "captionSide", label: "Caption Side" },
				clear: { id: "clear", label: "Clear" },
				clip: { id: "clip", label: "Clip" },
				color: { id: "color", label: "Color" },
				columnCount: { id: "columnCount", label: "Column Count" },
				columnGap: { id: "columnGap", label: "Column gap" },
				columnRule: { id: "columnRule", label: "Column Rule" },
				content: { id: "content", label: "Content" },
				counterIncrement: {
					id: "counterIncrement",
					label: "Counter Increment",
				},
				counterReset: { id: "counterReset", label: "Counter Reset" },
				counterSet: { id: "counterSet", label: "Counter Set" },
				cursor: { id: "cursor", label: "Cursor" },
				direction: { id: "direction", label: "Direction" },
				display: { id: "display", label: "Display" },
				emptyCells: { id: "emptyCells", label: "Empty Cells" },
				filter: { id: "filter", label: "Filter" },
				flexBasis: { id: "flexBasis", label: "Flex Basis" },
				flexDirection: { id: "flexDirection", label: "Flex Direction" },
				flexFlow: { id: "flexFlow", label: "Flex Flow" },
				flexGrow: { id: "flexGrow", label: "Flex Grow" },
				flexShrink: { id: "flexShrink", label: "Flex Shrink" },
				flexWrap: { id: "flexWrap", label: "Flex Wrap" },
				float: { id: "float", label: "Float" },
				fontFamily: { id: "fontFamily", label: "Font Family" },
				fontSize: { id: "fontSize", label: "Font Size" },
				fontStretch: { id: "fontStretch", label: "Font Stretch" },
				fontStyle: { id: "fontStyle", label: "Font Style" },
				fontVariantCaps: {
					id: "fontVariantCaps",
					label: "Font VariantCaps",
				},
				fontWeight: { id: "fontWeight", label: "Font Weight" },
				gap: { id: "gap", label: "Gap" },
				gridAutoColumns: { id: "gridAutoColumns", label: "Grid Auto Columns" },
				gridAutoFlow: { id: "gridAutoFlow", label: "Grid Auto Flow" },
				gridColumnEnd: { id: "gridColumnEnd", label: "Grid Column End" },
				gridColumnStart: { id: "gridColumnStart", label: "Grid Column Start" },
				gridRowEnd: { id: "gridRowEnd", label: "Grid Row End" },
				gridRowStart: { id: "gridRowStart", label: "Grid Row Start" },
				gridTemplateColumns: {
					id: "gridTemplateColumns",
					label: "Grid Template Columns",
				},
				gridTemplateRows: { id: "gridTemplateRows", label: "Grid Template Rows" },
				height: { id: "height", label: "Height" },
				justifyContent: { id: "justifyContent", label: "Justify Content" },
				left: { id: "left", label: "Left" },
				letterSpacing: { id: "letterSpacing", label: "Letter Spacing" },
				lineHeight: { id: "lineHeight", label: "Line Height" },
				listStyle: { id: "listStyle", label: "List Style" },
				margin: { id: "margin", label: "Margin" },
				marginBottom: { id: "marginBottom", label: "Margin Bottom" },
				marginLeft: { id: "marginLeft", label: "Margin Left" },
				marginRight: { id: "marginRight", label: "Margin Right" },
				marginTop: { id: "marginTop", label: "Margin Top" },
				maskImage: {
					id: "maskImage",
					label: "Mask Image",
				},
				maskMode: {
					id: "maskMode",
					label: "Mask Mode",
				},
				maskOrigin: {
					id: "maskOrigin",
					label: "Mask Origin",
				},
				maskPosition: {
					id: "maskPosition",
					label: "Mask Position",
				},
				maskRepeat: {
					id: "maskRepeat",
					label: "Mask Repeat",
				},
				maskSize: {
					id: "maskSize",
					label: "Mask Size",
				},
				maxHeight: { id: "maxHeight", label: "Max Height" },
				maxWidth: { id: "maxWidth", label: "Max Width" },
				minHeight: { id: "minHeight", label: "Min Height" },
				minWidth: { id: "minWidth", label: "Min Width" },
				objectFit: { id: "objectFit", label: "Object Fit" },
				opacity: { id: "opacity", label: "Opacity" },
				order: { id: "order", label: "Order" },
				outline: { id: "outline", label: "Outline" },
				overflow: { id: "overflow", label: "Overflow" },
				overflowX: { id: "overflowX", label: "OverflowX" },
				overflowY: { id: "overflowY", label: "OverflowY" },
				padding: { id: "padding", label: "Padding" },
				paddingBottom: { id: "paddingBottom", label: "Padding Bottom" },
				paddingLeft: { id: "paddingLeft", label: "Padding Left" },
				paddingRight: { id: "paddingRight", label: "Padding Right" },
				paddingTop: { id: "paddingTop", label: "Padding Top" },
				perspective: { id: "perspective", label: "Perspective" },
				position: { id: "position", label: "Position" },
				right: { id: "right", label: "Right" },
				rowGap: { id: "rowGap", label: "Row Gap" },
				tableLayout: { id: "tableLayout", label: "Table Layout" },
				textAlign: { id: "textAlign", label: "Text Align" },
				textDecoration: {
					id: "textDecoration",
					label: "Text Decoration",
				},
				textIndent: { id: "textIndent", label: "Text Indent" },
				textJustify: { id: "textJustify", label: "Text Justify" },
				textOverflow: { id: "textOverflow", label: "Text Overflow" },
				textShadow: { id: "textShadow", label: "Text Shadow" },
				textTransform: { id: "textTransform", label: "Text Transform" },
				top: { id: "top", label: "Top" },
				transform: { id: "transform", label: "Transform" },
				transformOrigin: {
					id: "transformOrigin",
					label: "Transform Origin",
				},
				transformStyle: {
					id: "transformStyle",
					label: "Transform Style",
				},
				transition: { id: "transition", label: "Transition" },
				verticalAlign: { id: "verticalAlign", label: "Vertical Align" },
				visibility: { id: "visibility", label: "Visibility" },
				width: { id: "width", label: "Width" },
				wordBreak: { id: "wordBreak", label: "Word Break" },
				wordSpacing: { id: "wordSpacing", label: "Word Spacing" },
				wordWrap: { id: "wordWrap", label: "Word Wrap" },
				writingMode: { id: "writingMode", label: "Writing Mode" },
				zIndex: { id: "zIndex", label: "Z-Index" },
				"-webkit-text-fill-color": {
					id: "-webkit-text-fill-color",
					label: "Webkit Text Fill Color",
				},
			};

			addFilter("cssProps", "post-grid/cssProps", function (options) {
				return cssPropsPro;
			});

			var paginationTypes = {
				none: {
					label: __("None", "post-grid"),
					value: "none"
				},
				normal: {
					label: __("Normal Pagination",
						"post-grid"), value: "normal"
				},
				ajax: {
					label: __("Ajax Pagination", "post-grid"),
					value: "ajax",

				},
				next_previous: {
					label: __("Next-Previous", "post-grid"),
					value: "next_previous",

				},
				loadmore: {
					label: __("Load More", "post-grid"),
					value: "loadmore",

				},
				infinite: {
					label: __("Infinite Load", "post-grid"),
					value: "infinite",

				},
				// filterable: {
				// 	label: __("Filterable", "post-grid"),
				// 	value: "filterable"
				// },
			}

			addFilter("PostGridPaginationTypes", "post-grid/paginationTypes", function (options) {
				return paginationTypes;
			});

			var postQueryArgs = {
				postType: {
					value: ["post"],
					multiple: false,
					id: "postType",
					label: "Post types",
					description: "Select Post Types to Query",
				},
				s: {
					value: "",
					multiple: false,
					id: "s",
					label: "Keyword",
					description: "Search keyword, ex: hello",
				},
				postStatus: {
					value: [],
					multiple: false,
					id: "postStatus",
					label: "Post status",
					description: "Query post by post status",
				},
				order: {
					value: "",
					multiple: false,
					id: "order",
					label: "Order",
					description: "Post query order",
				},
				orderby: {
					value: [],

					multiple: false,
					id: "orderby",
					label: "Orderby",
					description: "Post query orderby",
				},
				metaKey: {
					value: "",
					multiple: false,
					id: "metaKey",
					label: "Meta fields key",
					description: "Post query by meta fields key",

				},
				// Category Parameters
				cat: {
					value: "",
					multiple: false,
					id: "cat",
					label: "Category ID",
					description: "Post query by Category ID",
				},
				categoryName: {
					value: "",
					multiple: false,
					id: "categoryName",
					label: "Category Name",
					description: "Post query by Category Name",
				},
				categoryAnd: {
					value: [],

					multiple: false,
					id: "categoryAnd",
					label: "Category And",
					description: "Post query by Category IDs",

				},
				categoryIn: {
					value: [],

					multiple: false,
					id: "categoryIn",
					label: "Category In",
					description: "Post query by Category IDs",

				},
				categoryNotIn: {
					value: [],

					multiple: false,
					id: "categoryNotIn",
					label: "Category Not In",
					description: "Post query by excluded Category IDs",

				},
				// Tag Parameters
				tag: {
					value: "",
					multiple: false,
					id: "tag",
					label: "Tags",
					description: "Post query by Tag slug",
				},
				tagId: {
					value: "",
					multiple: false,
					id: "tagId",
					label: "Tag Id",
					description: "Post query by Tag ID",
				},
				tagAnd: {
					value: "",

					multiple: false,
					id: "tagAnd",
					label: "Tag And",
					description: "Post query by Tag Ids",

				},
				tagIn: {
					value: "",

					multiple: false,
					id: "tagIn",
					label: "Tag In",
					description: "Post query by Tag ids",

				},
				tagNotIn: {
					value: "",

					multiple: false,
					id: "tagNotIn",
					label: "Tag Not In",
					description: "Post query by excluded Tag ids",

				},
				tagSlugAnd: {
					value: "",

					multiple: false,
					id: "tagSlugAnd",
					label: "Tag Slug And",
					description: "Post query by Tags slug",

				},
				tagSlugIn: {
					value: "",

					multiple: false,
					id: "tagSlugIn",
					label: "Tag Slug In",
					description: "Post query by excluded Tags slug",

				},
				// taxQuery: {
				// 	value: [],
				// 	multiple: false,
				// 	id: "taxQuery",
				// 	label: "Tax Query",
				// 	description: "Taxonomies query arguments",
				// 	
				// },
				taxQueryRelation: {
					value: "OR",
					multiple: false,
					id: "taxQueryRelation",
					label: "Taxonomy Query Relation",
					description: "Taxonomies query relation",

				},
				// // Date Parameters
				// dateQuery: {
				// 	value: [],

				// 	multiple: false,
				// 	id: "dateQuery",
				// 	label: "Date Query",
				// 	description: "Post query by date",
				// 	
				// },
				year: {
					value: "",
					multiple: false,
					id: "year",
					label: "Year",
					description: "Post query by year",
				},
				monthnum: {
					value: "",
					multiple: false,
					id: "monthnum",
					label: "Month",
					description: "Post query by month",
				},
				w: {
					value: "",
					multiple: false,
					id: "w",
					label: "Week",
					description: "Post query by week",
				},
				day: {
					value: "",
					multiple: false,
					id: "day",
					label: "Day",
					description: "Post query by day",
				},
				hour: {
					value: "",
					multiple: false,
					id: "hour",
					label: "Hour",
					description: "Post query by hour",
				},
				minute: {
					value: "",
					multiple: false,
					id: "minute",
					label: "Miniute",
					description: "Post query by miniute",
				},
				second: {
					value: "",
					multiple: false,
					id: "second",
					label: "Second",
					description: "Post query by second",
				},
				m: {
					value: "",
					multiple: false,
					id: "m",
					label: "Month",
					description: "Post query by month",
				},
				// // Author Parameters
				author: {
					value: "",
					multiple: false,
					id: "author",
					label: "Author",
					description: "Post query by Author ID",
				},
				authorName: {
					value: "",
					multiple: false,
					id: "authorName",
					label: "Author Name",
					description: "Post query by Author Name",
				},
				authorIn: {
					value: "",

					multiple: false,
					id: "authorIn",
					label: "Author In",
					description: "Post query by Author IDs",

				},
				authorNotIn: {
					value: "",

					multiple: false,
					id: "authorNotIn",
					label: "Author Not In",
					description: "Post query by exluded Author IDs",

				},
				p: {
					value: "",
					multiple: false,
					id: "p",
					label: "Post id",
					description: "Post query by single post id",
				},
				name: {
					value: "",
					multiple: false,
					id: "name",
					label: "Name",
					description: "Post query by post slug",
				},
				pageId: {
					value: "",
					multiple: false,
					id: "pageId",
					label: "Page Id",
					description: "Post query by single page id",
				},
				pagename: {
					value: "",
					multiple: false,
					id: "pagename",
					label: "Page name",
					description: "Post query by page slug",
				},
				postParent: {
					value: "",
					multiple: false,
					id: "postParent",
					label: "Post Parent",
					description: "Add {ID} to Post query by post parent id",

				},
				postParentIn: {
					value: "",
					multiple: false,
					id: "postParentIn",
					label: "Post Parent In",
					description: "Post query by post parent ids",

				},
				postParentNotIn: {
					value: "",
					multiple: false,
					id: "postParentNotIn",
					label: "Post Parent Not In",
					description: "Post query by excluded post parent ids",

				},
				postIn: {
					value: "",

					multiple: false,
					id: "postIn",
					label: "Post In",
					description: "Post query by multiple post ids, comma separated.",

				},
				postNotIn: {
					value: "",

					multiple: false,
					id: "postNotIn",
					label: "Post Not In",
					description: "Post query by excluded post ids",

				},
				postNameIn: {
					value: [{ slug: "" }],
					multiple: false,
					id: "postNameIn",
					label: "Post Name In",
					description: "Post query by post slugs",

				},
				hasPassword: {
					value: "",
					multiple: false,
					id: "hasPassword",
					label: "Has Password",
					description: "Post query for posts with passwords",

				},
				postPassword: {
					value: "",
					multiple: false,
					id: "postPassword",
					label: "Post Password",
					description: "Post query for posts with particular passwords",

				},
				commentCount: {
					value: { compare: "=", value: 10 },
					multiple: false,
					id: "commentCount",
					label: "Comment Count",
					description: "Post query by comment count",

				},
				nopaging: {
					value: "",
					multiple: false,
					id: "nopaging",
					label: "No Paging",
					description: "Enable show all posts or use pagination",
				},
				postsPerPage: {
					value: "",
					multiple: false,
					id: "postsPerPage",
					label: "Posts Per Page",
					description: "Number of post to show per page",
				},
				paged: {
					value: "",
					multiple: false,
					id: "paged",
					label: "Paged",
					description: "Pagination start with",
				},
				offset: {
					value: "",
					multiple: false,
					id: "offset",
					label: "Offset",
					description: "Number of post to displace or pass over",

				},
				postsPerArchivePage: {
					value: "",
					multiple: false,
					id: "postsPerArchivePage",
					label: "Posts Per Archive Page",
					description: "",
				},
				ignoreStickyPosts: {
					value: "",
					multiple: false,
					id: "ignoreStickyPosts",
					label: "Ignore Sticky Posts",
					description: "Ignore post from post query",

				},
				metaKey: {
					value: "",
					multiple: false,
					id: "metaKey",
					label: "Meta Key",
					description: "Post query by custom field key",

				},
				metaValue: {
					value: "",
					multiple: false,
					id: "metaValue",
					label: "Meta Value",
					description: "Post query by custom field value",

				},
				metaValueNum: {
					value: "",
					multiple: false,
					id: "metaValueNum",
					label: "Meta Value Num",
					description: "Post query by custom field value for number types",

				},
				metaCompare: {
					value: "",
					multiple: false,
					id: "metaCompare",
					label: "Meta Compare",
					description: "Meta query compare",

				},
				// metaQuery: {
				// 	value: [],

				// 	multiple: false,
				// 	id: "metaQuery",
				// 	label: "Meta Query",
				// 	description: "Advance meta fields query",
				// 	
				// },
				perm: {
					value: "readable",
					multiple: false,
					id: "perm",
					label: "Perm",
					description: "User permission parameter",
				},
				postMimeType: {
					value: "",
					multiple: false,
					id: "postMimeType",
					label: "Post Mime Type",
					description: "Post query by allwed post mime types",

				},
				cacheResults: {
					value: false,
					multiple: false,
					id: "cacheResults",
					label: "Cache Results",
					description: "Enable Post information cache",

				},
				updatePostMetaCache: {
					value: false,
					multiple: false,
					id: "updatePostMetaCache",
					label: "Update Post Meta Cache",
					description: "Enable Post meta information cache",

				},
				updatePostTermCache: {
					value: false,
					multiple: false,
					id: "updatePostTermCache",
					label: "Update Post Term Cache",
					description: "Enable Post term information cache",

				},
			};


			addFilter("PostGridPostQueryArgs", "post-grid/postQueryArgs", function (options) {
				return postQueryArgs;
			});














		}
	}
});






