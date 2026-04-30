
const { Component, RawHTML, useState, useEffect, useMemo } = wp.element;
import { RichText } from '@wordpress/block-editor'

import { Icon, close, settings, cloud, plus, post } from "@wordpress/icons";
import { ReactSortable } from "react-sortablejs";
import {
	PanelBody,
	RangeControl,
	Button,
	ButtonGroup,
	Panel,
	PanelRow,
	Dropdown,
	DropdownMenu,
	SelectControl,
	ColorPicker,
	ColorPalette,
	ToolsPanelItem,
	ComboboxControl,
	Spinner,
	ToggleControl,
	CustomSelectControl,
	Popover,
	__experimentalInputControl as InputControl,
} from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";
import { Splide, SplideTrack } from "@splidejs/react-splide";

import PGDropdown from '../../components/dropdown'


var myStore = wp.data.select("PostGridStore");

function Html(props) {

	if (!props.warn) {
		return null;
	}



	var onGenerateCss = props.onGenerateCss;
	var styleObj = props.styleObj;
	var reponsiveCss = props.reponsiveCss == undefined ? "" : props.reponsiveCss;


	useEffect(() => {



		if (Object.entries(styleObj).length == 0) {
			return;
		}


		var reponsiveCss = convertStyleobjToCss(styleObj);
		onGenerateCss(reponsiveCss)

		var wpfooter = document.getElementById("wpfooter");
		var csswrappg = document.getElementById("post-grid-builder-styles");

		if (csswrappg == null) {
			var divWrap = '<style id="post-grid-builder-styles">' + reponsiveCss + '</style>';
			wpfooter.insertAdjacentHTML("beforeend", divWrap);
			var csswrappg = document.getElementById("post-grid-builder-styles");
			csswrappg.innerHtml = reponsiveCss;

		} else {
			csswrappg.innerHTML = reponsiveCss;
		}


	}, [styleObj]);

	useEffect(() => {


		if (reponsiveCss.length == 0) {
			return;
		}

		reponsiveCss = unescapeHTML(reponsiveCss)


		var wpfooter = document.getElementById("wpfooter");
		var csswrappg = document.getElementById("post-grid-builder-styles");

		if (csswrappg == null) {
			var divWrap = '<style id="post-grid-builder-styles">' + reponsiveCss + '</style>';
			wpfooter.insertAdjacentHTML("beforeend", divWrap);
			var csswrappg = document.getElementById("post-grid-builder-styles");
			csswrappg.innerHtml = reponsiveCss;

		} else {
			csswrappg.innerHTML = reponsiveCss;
		}


	}, [reponsiveCss]);



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









	function getElementSelector(sudoScource, mainSelector) {
		var elementSelector = mainSelector;
		if (sudoScource == "styles") {
			elementSelector = mainSelector;
		} else if (sudoScource == "hover") {
			elementSelector = mainSelector + ":hover";
		} else if (sudoScource == "after") {
			elementSelector = mainSelector + "::after";
		} else if (sudoScource == "before") {
			elementSelector = mainSelector + "::before";
		} else if (sudoScource == "first-child") {
			elementSelector = mainSelector + ":first-child";
		} else if (sudoScource == "last-child") {
			elementSelector = mainSelector + ":last-child";
		} else if (sudoScource == "visited") {
			elementSelector = mainSelector + ":visited";
		} else if (sudoScource == "selection") {
			elementSelector = mainSelector + "::selection";
		} else if (sudoScource == "first-letter") {
			elementSelector = mainSelector + "::first-letter";
		} else if (sudoScource == "first-line") {
			elementSelector = mainSelector + "::first-line";
		} else {
			elementSelector = mainSelector + ":" + sudoScource;
		}
		return elementSelector;
	}
	function cssAttrParse(key) {
		var cssProp = "";
		if (key == "alignContent") {
			cssProp = "align-content";
		} else if (key == "alignItems") {
			cssProp = "align-items";
		} else if (key == "animationName") {
			cssProp = "animation-name";
		} else if (key == "alignSelf") {
			cssProp = "align-self";
		} else if (key == "aspectRatio") {
			cssProp = "aspect-ratio";
		} else if (key == "backfaceVisibility") {
			cssProp = "backface-visibility";
		} else if (key == "backgroundAttachment") {
			cssProp = "background-attachment";
		} else if (key == "backgroundBlendMode") {
			cssProp = "background-blend-mode";
		} else if (key == "backgroundClip") {
			cssProp = "background-clip";
		} else if (key == "bgColor") {
			cssProp = "background-color";
		} else if (key == "backgroundColor") {
			cssProp = "background-color";
		} else if (key == "backgroundOrigin") {
			cssProp = "background-origin";
		} else if (key == "backgroundRepeat") {
			cssProp = "background-repeat";
		} else if (key == "backgroundSize") {
			cssProp = "background-size";
		} else if (key == "backgroundPosition") {
			cssProp = "background-position";
		} else if (key == "backgroundImage") {
			cssProp = "background-image";
		} else if (key == "border") {
			cssProp = "border";
		} else if (key == "borderTop") {
			cssProp = "border-top";
		} else if (key == "borderRight") {
			cssProp = "border-right";
		} else if (key == "borderBottom") {
			cssProp = "border-bottom";
		} else if (key == "borderLeft") {
			cssProp = "border-left";
		} else if (key == "borderRadius") {
			cssProp = "border-radius";
		} else if (key == "borderCollapse") {
			cssProp = "border-collapse";
		} else if (key == "borderSpacing") {
			cssProp = "border-spacing";
		} else if (key == "borderImage") {
			cssProp = "border-image";
		} else if (key == "boxShadow") {
			cssProp = "box-shadow";
		} else if (key == "backdropFilter") {
			cssProp = "backdrop-filter";
		} else if (
			key == "bottom" ||
			key == "top" ||
			key == "left" ||
			key == "right" ||
			key == "clear" ||
			key == "color" ||
			key == "filter" ||
			key == "float"
		) {
			cssProp = key;
		} else if (key == "boxSizing") {
			cssProp = "box-sizing";
		} else if (key == "cursor") {
			cssProp = "cursor";
		} else if (key == "content") {
			cssProp = "content";
		} else if (key == "counterIncrement") {
			cssProp = "counter-increment";
		} else if (key == "counterReset") {
			cssProp = "counter-reset";
		} else if (key == "counterSet") {
			cssProp = "counter-set";
		} else if (key == "columnCount") {
			cssProp = "column-count";
		} else if (key == "columnRule") {
			cssProp = "column-rule";
		} else if (key == "direction") {
			cssProp = "direction";
		} else if (key == "fontFamily") {
			cssProp = "font-family";
		} else if (key == "fontSize") {
			cssProp = "font-size";
		} else if (key == "fontStyle") {
			cssProp = "font-style";
		} else if (key == "fontStretch") {
			cssProp = "font-stretch";
		} else if (key == "fontWeight") {
			cssProp = "font-weight";
		} else if (key == "fontVariantCaps") {
			cssProp = "font-variant-caps";
		} else if (key == "flexWrap") {
			cssProp = "flex-wrap";
		} else if (key == "flexDirection") {
			cssProp = "flex-direction";
		} else if (key == "flexGrow") {
			cssProp = "flex-grow";
		} else if (key == "flexShrink") {
			cssProp = "flex-shrink";
		} else if (key == "flexBasis") {
			cssProp = "flex-basis";
		} else if (key == "flexFlow") {
			cssProp = "flex-flow";
		} else if (key == "letterSpacing") {
			cssProp = "letter-spacing";
		} else if (key == "gridAutoFlow") {
			cssProp = "grid-auto-flow";
		} else if (key == "gridColumnEnd") {
			cssProp = "grid-column-end";
		} else if (key == "gridColumnStart") {
			cssProp = "grid-column-start";
		} else if (key == "gridRowEnd") {
			cssProp = "grid-row-end";
		} else if (key == "gridRowStart") {
			cssProp = "grid-row-start";
		} else if (key == "gridTemplateColumns") {
			cssProp = "grid-template-columns";
		} else if (key == "gridTemplateRows") {
			cssProp = "grid-template-rows";
		} else if (key == "listStyle") {
			cssProp = "list-style";
		} else if (key == "lineHeight") {
			cssProp = "line-height";
		} else if (key == "justifyContent") {
			cssProp = "justify-content";
		} else if (key == "maskImage") {
			cssProp = "mask-image";
		} else if (key == "objectFit") {
			cssProp = "object-fit";
		} else if (key == "opacity") {
			cssProp = "opacity";
		} else if (key == "outline") {
			cssProp = "outline";
		} else if (key == "order") {
			cssProp = "order";
		} else if (key == "outlineOffset") {
			cssProp = "outline-offset";
		} else if (key == "position") {
			cssProp = "position";
		} else if (key == "textIndent") {
			cssProp = "text-indent";
		} else if (key == "textJustify") {
			cssProp = "text-justify";
		} else if (key == "textTransform") {
			cssProp = "text-transform";
		} else if (key == "textDecoration") {
			cssProp = "text-decoration";
		} else if (key == "textOverflow") {
			cssProp = "text-overflow";
		} else if (key == "textShadow") {
			cssProp = "text-shadow";
		} else if (key == "textAlign") {
			cssProp = "text-align";
		} else if (key == "visibility") {
			cssProp = "visibility";
		} else if (key == "wordBreak") {
			cssProp = "word-break";
		} else if (key == "wordSpacing") {
			cssProp = "word-spacing";
		} else if (key == "zIndex") {
			cssProp = "z-index";
		} else if (key == "padding") {
			cssProp = "padding";
		} else if (key == "paddingTop") {
			cssProp = "padding-top";
		} else if (key == "paddingRight") {
			cssProp = "padding-right";
		} else if (key == "paddingBottom") {
			cssProp = "padding-bottom";
		} else if (key == "paddingLeft") {
			cssProp = "padding-left";
		} else if (key == "placeItems") {
			cssProp = "place-items";
		} else if (key == "margin") {
			cssProp = "margin";
		} else if (key == "marginTop") {
			cssProp = "margin-top";
		} else if (key == "marginRight") {
			cssProp = "margin-right";
		} else if (key == "marginBottom") {
			cssProp = "margin-bottom";
		} else if (key == "marginLeft") {
			cssProp = "margin-left";
		} else if (key == "display") {
			cssProp = "display";
		} else if (key == "width") {
			cssProp = "width";
		} else if (key == "height") {
			cssProp = "height";
		} else if (key == "verticalAlign") {
			cssProp = "vertical-align";
		} else if (key == "overflow") {
			cssProp = "overflow";
		} else if (key == "overflowX") {
			cssProp = "overflow-x";
		} else if (key == "overflowY") {
			cssProp = "overflow-y";
		} else if (key == "writingMode") {
			cssProp = "writing-mode";
		} else if (key == "wordWrap") {
			cssProp = "word-wrap";
		} else if (key == "perspective") {
			cssProp = "perspective";
		} else if (key == "minWidth") {
			cssProp = "min-width";
		} else if (key == "minHeight") {
			cssProp = "min-height";
		} else if (key == "maxHeight") {
			cssProp = "max-height";
		} else if (key == "maxWidth") {
			cssProp = "max-width";
		} else if (key == "transition") {
			cssProp = "transition";
		} else if (key == "transform") {
			cssProp = "transform";
		} else if (key == "transformOrigin") {
			cssProp = "transform-origin";
		} else if (key == "transformStyle") {
			cssProp = "transform-style";
		} else if (key == "tableLayout") {
			cssProp = "table-layout";
		} else if (key == "emptyCells") {
			cssProp = "empty-cells";
		} else if (key == "captionSide") {
			cssProp = "caption-side";
		} else if (key == "gap") {
			cssProp = "gap";
		} else if (key == "rowGap") {
			cssProp = "row-gap";
		} else if (key == "columnGap") {
			cssProp = "column-gap";
		} else if (key == "userSelect") {
			cssProp = "user-select";
		} else if (key == "-webkit-text-fill-color") {
			cssProp = "-webkit-text-fill-color";
		} else {
			cssProp = key;
		}
		return cssProp;
	}


	function convertStyleobjToCss(items) {


		var reponsiveCssGroups = {};
		for (var selector in items) {
			var sudoArgs = items[selector];
			for (var sudoSrc in sudoArgs) {
				var selectorHandl = getElementSelector(sudoSrc, selector);
				var sudoPrams = sudoArgs[sudoSrc];

				for (var attr in sudoPrams) {

					var breakpoints = sudoPrams[attr];
					for (var device in breakpoints) {
						var attrValue = breakpoints[device];

						if (reponsiveCssGroups[device] == undefined) {
							reponsiveCssGroups[device] = [];
						}
						if (reponsiveCssGroups[device] == undefined) {
							reponsiveCssGroups[device] = [];
						}
						if (reponsiveCssGroups[device][selectorHandl] == undefined) {
							reponsiveCssGroups[device][selectorHandl] = [];
						}
						if (typeof attrValue == "string") {
							attrValue = attrValue.replaceAll("u0022", '"');

							attr = cssAttrParse(attr);

							reponsiveCssGroups[device][selectorHandl][attr] = attrValue;



						}
					}
				}
			}

		}




		var reponsiveCssDesktop = "";
		if (reponsiveCssGroups["Desktop"] != undefined) {
			for (var selector in reponsiveCssGroups["Desktop"]) {
				var attrs = reponsiveCssGroups["Desktop"][selector];
				reponsiveCssDesktop += selector + "{";

				for (var attrName in attrs) {
					var attrValue = attrs[attrName];
					// var attrName = attr.attr;
					// var attrValue = attr.val;
					reponsiveCssDesktop += attrName + ":" + attrValue + ";";
				}
				reponsiveCssDesktop += "}";
			}
		}
		var reponsiveCssTablet = "";
		if (reponsiveCssGroups["Tablet"] != undefined) {
			reponsiveCssTablet += "@media(max-width: 991px){";
			for (var selector in reponsiveCssGroups["Tablet"]) {
				var attrs = reponsiveCssGroups["Tablet"][selector];
				reponsiveCssTablet += selector + "{";
				for (var index in attrs) {
					var attr = attrs[index];
					var attrName = attr.attr;
					var attrValue = attr.val;
					reponsiveCssTablet += attrName + ":" + attrValue + ";";
				}
				reponsiveCssTablet += "}";
			}
			reponsiveCssTablet += "}";
		}
		var reponsiveCssMobile = "";
		if (reponsiveCssGroups["Mobile"] != undefined) {
			reponsiveCssMobile += "@media(max-width:767px){";
			for (var selector in reponsiveCssGroups["Mobile"]) {
				var attrs = reponsiveCssGroups["Mobile"][selector];
				reponsiveCssMobile += selector + "{";
				for (var index in attrs) {
					var attr = attrs[index];
					var attrName = attr.attr;
					var attrValue = attr.val;
					reponsiveCssMobile += attrName + ":" + attrValue + ";";
				}
				reponsiveCssMobile += "}";
			}
			reponsiveCssMobile += "}";
		}
		var reponsiveCss =
			reponsiveCssDesktop + reponsiveCssTablet + reponsiveCssMobile;

		return reponsiveCss;


	}


	return;
}

class GenerateCss extends Component {
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
		var { onGenerateCss, styleObj, reponsiveCss } = this.props;

		return (
			<Html
				onGenerateCss={onGenerateCss}
				styleObj={styleObj}
				reponsiveCss={reponsiveCss}
				warn={this.state.showWarning}
			/>
		);
	}
}

export default GenerateCss;
