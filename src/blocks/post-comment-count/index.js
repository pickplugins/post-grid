import { registerBlockType, createBlock } from "@wordpress/blocks";
import apiFetch from "@wordpress/api-fetch";
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";

import { __ } from "@wordpress/i18n";
import { useSelect, select, useDispatch, dispatch } from "@wordpress/data";
import { useEntityRecord } from "@wordpress/core-data";
import {
	createElement,
	useCallback,
	memo,
	useMemo,
	useState,
	useEffect,
} from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";

import {
	PanelBody,
	RangeControl,
	Button,
	Panel,
	PanelRow,
	Dropdown,
	DropdownMenu,
	SelectControl,
	ColorPicker,
	ColorPalette,
	ToolsPanelItem,
	ComboboxControl,
	ToggleControl,
	MenuGroup,
	MenuItem,
	TextareaControl,
	Popover,
} from "@wordpress/components";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import {
	Icon,
	styles,
	settings,
	link,
	linkOff,
	code,
	brush,
	close,
	mediaAndText,
} from "@wordpress/icons";

import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	RichText,
	__experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import { __experimentalInputControl as InputControl } from "@wordpress/components";
import breakPoints from "../../breakpoints";
const { RawHTML } = wp.element;
import { store } from "../../store";

import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";

import PGDropdown from "../../components/dropdown";
import PGIconPicker from "../../components/icon-picker";
import PGLibraryBlockVariations from "../../components/library-block-variations";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import PGCssLibrary from "../../components/css-library";

import metadata from "./block.json";
import PGcssClassPicker from "../../components/css-class-picker";
import customTags from "../../custom-tags";
import PGTutorials from "../../components/tutorials";

var myStore = wp.data.select("postgrid-shop");

registerBlockType(metadata, {
	icon: {
		// Specifying a background color to appear with the icon e.g.: in the inserter.
		background: "#fff",
		// Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
		foreground: "#fff",
		// Specifying an icon for the block
		src: (
			<svg
				width="160"
				height="160"
				viewBox="0 0 160 160"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M17.8279 113H17.2131C15.3688 112.385 14.7541 111.771 14.7541 109.927C14.7541 105.624 14.7541 101.321 14.7541 96.4037V95.789H14.1393C10.4508 95.789 6.76229 95.789 3.07377 95.789C1.22951 95.789 0 95.1743 0 92.7156C0 77.9633 0 63.8257 0 49.0734C0 47.2294 1.22951 46 3.07377 46C25.8197 46 49.1803 46 71.9262 46C73.7705 46 74.3852 46.6147 75 47.8441C75 63.211 75 78.578 75 93.945C74.3852 95.1743 73.1557 95.789 71.9262 95.789C60.8607 95.789 50.4098 95.789 39.3443 95.789C38.7295 95.789 38.1148 95.789 38.1148 96.4037C31.9672 101.936 25.8197 106.853 20.2869 112.385C19.0574 112.385 19.0574 113 17.8279 113ZM70.082 50.9174C48.5656 50.9174 27.0492 50.9174 5.5328 50.9174C5.5328 64.4404 5.5328 77.3486 5.5328 90.8716C6.14755 90.8716 6.14754 90.8716 6.14754 90.8716C9.83607 90.8716 13.5246 90.8716 17.2131 90.8716C19.0574 90.8716 20.2869 92.1009 20.2869 93.945C20.2869 97.633 20.2869 100.706 20.2869 104.394V105.009C25.2049 100.706 30.123 96.4037 35.041 92.1009C35.6557 91.4862 36.8852 90.8716 37.5 90.8716C47.9508 90.8716 58.4016 90.8716 68.2377 90.8716H68.8525C70.082 77.3486 70.082 63.8257 70.082 50.9174Z"
					fill="#C15940"
				/>
				<path
					d="M159 48H83.7061V57.4118H159V48Z"
					fill="url(#paint0_linear_61_425)"
				/>
				<path
					d="M159 66.8823H84V75.8823H159V66.8823Z"
					fill="url(#paint1_linear_61_425)"
				/>
				<path
					d="M130 85.8823H84V94.8823H130V85.8823Z"
					fill="url(#paint2_linear_61_425)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_425"
						x1="83.7061"
						y1="52.7059"
						x2="159"
						y2="52.7059"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_425"
						x1="84"
						y1="71.3823"
						x2="159"
						y2="71.3823"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_425"
						x1="84"
						y1="90.3823"
						x2="130"
						y2="90.3823"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
				</defs>
			</svg>
		),
	},

	edit: function (props) {
		var attributes = props.attributes;
		var setAttributes = props.setAttributes;
		var context = props.context;
		var clientId = props.clientId;

		let commentCount = attributes.commentCount;
		var wrapper = attributes.wrapper;
		var blockId = attributes.blockId;

		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var icon = attributes.icon;

		var prefix = attributes.prefix;
		var postfix = attributes.postfix;

		var blockCssY = attributes.blockCssY;

		var postId = context["postId"];
		var postType = context["postType"];

		var breakPointX = myStore.getBreakPoint();

		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);

		var [currentCommentCount, setcurrentCommentCount] = useState({
			approved: 0,
			moderated: 0,
			spam: 0,
			total_comments: 0,
			trash: 0,
			"post-trashed": 0,
			all: 0,
		});
		var [commentCountEdited, setcommentCountEdited] = useState(
			commentCount.options.customLabel
		);

		var linkToArgsBasic = {
			postUrl: { label: "Post URL", value: "postUrl" },
			homeUrl: { label: "Home URL", value: "homeUrl" },
			authorUrl: { label: "Author URL", value: "authorUrl" },
			authorLink: { label: "Author Link", value: "authorLink" },
			authorMail: { label: "Author Mail", value: "authorMail", isPro: true },
			authorMeta: { label: "Author Meta", value: "authorMeta", isPro: true },
			customField: { label: "Custom Field", value: "customField", isPro: true },
			customUrl: { label: "Custom URL", value: "customUrl", isPro: true },
		};

		let linkToArgs = applyFilters("linkToArgs", linkToArgsBasic);

		function setFieldLinkTo(option, index) {
			var options = { ...commentCount.options, linkTo: option.value };
			setAttributes({ commentCount: { ...commentCount, options: options } });
		}

		useEffect(() => {
			apiFetch({
				path: "/post-grid/v2/get_comment_count",
				method: "POST",
				data: { id: postId },
			}).then((res) => {
				setcurrentCommentCount(res);
				setcommentCountEdited(
					commentCount.options.customLabel.replace(
						"%s",
						res[commentCount.options.status]
					)
				);
			});
		}, [clientId]);

		useEffect(() => {
			setcommentCountEdited(
				commentCount.options.customLabel.replace(
					"%s",
					currentCommentCount[commentCount.options.status]
				)
			);
		}, [commentCount]);

		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		var commentCountSelector = blockClass + " .commentCount";
		const prefixSelector = blockClass + " .prefix";
		const postfixSelector = blockClass + " .postfix";
		const iconSelector = blockClass + " .commentCount-icon";

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[commentCountSelector] = commentCount;
			blockCssObj[prefixSelector] = prefix;
			blockCssObj[postfixSelector] = postfix;
			blockCssObj[iconSelector] = icon;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		function onPickBlockPatterns(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;

			var blocks = content.length > 0 ? parse(content) : "";
			console.log(content);
			console.log(blocks);
			const attributes = blocks[0].attrs;

			if (action == "insert") {
				wp.data
					.dispatch("core/block-editor")
					.insertBlocks(wp.blocks.parse(content));
			}
			if (action == "applyStyle") {
				var wrapperX = attributes.wrapper;
				var commentCountX = attributes.commentCount;
				var iconX = attributes.icon;
				var prefixX = attributes.prefix;
				var postfixX = attributes.postfix;
				var blockCssYX = attributes.blockCssY;

				var blockCssObj = {};

				if (postfixX != undefined) {
					var postfixY = { ...postfixX, options: postfix.options };
					setAttributes({ postfix: postfixY });
					blockCssObj[postfixSelector] = postfixY;
				}

				if (prefixX != undefined) {
					var prefixY = { ...prefixX, options: prefix.options };
					setAttributes({ prefix: prefixY });
					blockCssObj[prefixSelector] = prefixY;
				}

				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[iconSelector] = iconY;
				}

				if (commentCountX != undefined) {
					var commentCountY = {
						...commentCountX,
						options: commentCount.options,
					};
					setAttributes({ commentCount: commentCountY });
					blockCssObj[commentCountSelector] = commentCountY;
				}

				if (wrapperX != undefined) {
					var wrapperY = { ...wrapperX, options: wrapper.options };
					setAttributes({ wrapper: wrapperY });
					blockCssObj[wrapperSelector] = wrapperY;
				}

				var blockCssRules = myStore.getBlockCssRules(blockCssObj);

				var items = blockCssRules;
				setAttributes({ blockCssY: { items: items } });
			}
			if (action == "replace") {
				if (confirm("Do you want to replace?")) {
					wp.data
						.dispatch("core/block-editor")
						.replaceBlock(clientId, wp.blocks.parse(content));
				}
			}
		}

		function onChangeIcon(arg) {
			var options = {
				...icon.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({ icon: { ...icon, options: options } });
		}

		function onPickCssLibraryWrapper(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				wrapper[sudoScource] = sudoScourceArgs;
			});

			var wrapperX = Object.assign({}, wrapper);
			setAttributes({ wrapper: wrapperX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					wrapperSelector
				);

				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onPickCssLibraryCommentCount(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				commentCount[sudoScource] = sudoScourceArgs;
			});

			var commentCountX = Object.assign({}, commentCount);
			setAttributes({ commentCount: commentCountX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					commentCountSelector
				);

				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onPickCssLibraryIcon(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				icon[sudoScource] = sudoScourceArgs;
			});

			var iconX = Object.assign({}, icon);
			setAttributes({ icon: iconX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					iconSelector
				);

				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onPickCssLibraryPrefix(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				prefix[sudoScource] = sudoScourceArgs;
			});

			var prefixX = Object.assign({}, prefix);
			setAttributes({ prefix: prefixX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					prefixSelector
				);

				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onPickCssLibraryPostfix(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				postfix[sudoScource] = sudoScourceArgs;
			});

			var postfixX = Object.assign({}, postfix);
			setAttributes({ postfix: postfixX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					postfixSelector
				);

				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onChangeStyleWrapper(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, wrapper);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ wrapper: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				wrapperSelector
			);
			var cssPropty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });

			// var path = sudoScource + '.' + attr + '.' + breakPointX
			// let obj = Object.assign({}, wrapper);
			// const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
			// setAttributes({ wrapper: updatedObj });
			// var sudoScourceX = { ...updatedObj[sudoScource] }

			// var elementSelector = myStore.getElementSelector(sudoScource, wrapperSelector);

			// sudoScourceX[attr][breakPointX] = newVal;

			// if (blockCssY.items[elementSelector] == undefined) {
			//   blockCssY.items[elementSelector] = {};
			// }

			// Object.entries(sudoScourceX).map(args => {
			//   var argAttr = myStore.cssAttrParse(args[0]);
			//   var argAttrVal = args[1];
			//   blockCssY.items[elementSelector][argAttr] = argAttrVal;
			// })

			// setAttributes({ blockCssY: { items: blockCssY.items } });
		}

		function onRemoveStyleWrapper(sudoScource, key) {
			var object = myStore.deletePropertyDeep(wrapper, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ wrapper: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				wrapperSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });

			// var sudoScourceX = { ...wrapper[sudoScource] }
			// if (sudoScourceX[key] != undefined) {
			//   delete sudoScourceX[key];
			// }

			// wrapper[sudoScource] = sudoScourceX;
			// setAttributes({ wrapper: { ...wrapper } });

			// if (blockCssY.items[wrapperSelector] == undefined) {
			//   blockCssY.items[wrapperSelector] = {};
			// }

			// Object.entries(sudoScourceX).map(args => {
			//   var argAttr = myStore.cssAttrParse(args[0]);
			//   var argAttrVal = args[1];
			//   blockCssY.items[wrapperSelector][argAttr] = argAttrVal;
			// })

			// if (blockCssY.items[wrapperSelector][key] != undefined) {
			//   delete blockCssY.items[wrapperSelector][key];
			// }

			// setAttributes({ blockCssY: { items: blockCssY.items } });
		}

		function onAddStyleWrapper(sudoScource, key) {
			// var sudoScourceX = { ...wrapper[sudoScource] }
			// sudoScourceX[key] = {};
			// wrapper[sudoScource] = sudoScourceX;
			// setAttributes({ wrapper: { ...wrapper } });

			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, wrapper);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ wrapper: object });
		}

		function onChangeStyleCommentCount(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, commentCount);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ commentCount: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				commentCountSelector
			);
			var cssPropty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });

			// var path = sudoScource + '.' + attr + '.' + breakPointX
			// let obj = Object.assign({}, commentCount);
			// const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
			// setAttributes({ commentCount: updatedObj });
			// var sudoScourceX = { ...updatedObj[sudoScource] }

			// var elementSelector = myStore.getElementSelector(sudoScource, commentCountSelector);

			// sudoScourceX[attr][breakPointX] = newVal;

			// if (blockCssY.items[elementSelector] == undefined) {
			//   blockCssY.items[elementSelector] = {};
			// }

			// Object.entries(sudoScourceX).map(args => {
			//   var argAttr = myStore.cssAttrParse(args[0]);
			//   var argAttrVal = args[1];
			//   blockCssY.items[elementSelector][argAttr] = argAttrVal;
			// })

			// setAttributes({ blockCssY: { items: blockCssY.items } });
		}

		function onRemoveStyleCommentCount(sudoScource, key) {
			var object = myStore.deletePropertyDeep(commentCount, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ frontText: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				commentCountSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });

			// var sudoScourceX = { ...commentCount[sudoScource] }
			// if (sudoScourceX[key] != undefined) {
			//   delete sudoScourceX[key];
			// }

			// commentCount[sudoScource] = sudoScourceX;
			// setAttributes({ commentCount: { ...commentCount } });

			// if (blockCssY.items[commentCountSelector] == undefined) {
			//   blockCssY.items[commentCountSelector] = {};
			// }

			// Object.entries(sudoScourceX).map(args => {
			//   var argAttr = myStore.cssAttrParse(args[0]);
			//   var argAttrVal = args[1];
			//   blockCssY.items[commentCountSelector][argAttr] = argAttrVal;
			// })

			// if (blockCssY.items[commentCountSelector][key] != undefined) {
			//   delete blockCssY.items[wrapperSelector][key];
			// }

			// setAttributes({ blockCssY: { items: blockCssY.items } });
		}

		function onAddStyleCommentCount(sudoScource, key) {
			// var sudoScourceX = { ...commentCount[sudoScource] }
			// sudoScourceX[key] = {};
			// commentCount[sudoScource] = sudoScourceX;
			// setAttributes({ commentCount: { ...commentCount } });

			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, commentCount);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ commentCount: object });
		}

		function onChangeStyleIcon(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, icon);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ icon: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconSelector
			);
			var cssPropty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });

			// var path = sudoScource + '.' + attr + '.' + breakPointX
			// let obj = Object.assign({}, icon);
			// const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
			// setAttributes({ icon: updatedObj });
			// var sudoScourceX = { ...updatedObj[sudoScource] }

			// var elementSelector = iconSelector;
			// var elementSelector = myStore.getElementSelector(sudoScource, iconSelector);

			// sudoScourceX[attr][breakPointX] = newVal;

			// if (blockCssY.items[elementSelector] == undefined) {
			//   blockCssY.items[elementSelector] = {};
			// }

			// Object.entries(sudoScourceX).map(args => {
			//   var argAttr = myStore.cssAttrParse(args[0]);
			//   var argAttrVal = args[1];
			//   blockCssY.items[elementSelector][argAttr] = argAttrVal;
			// })

			// setAttributes({ blockCssY: { items: blockCssY.items } });
		}

		function onRemoveStyleIcon(sudoScource, key) {
			var object = myStore.deletePropertyDeep(icon, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ icon: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });

			// var sudoScourceX = { ...icon[sudoScource] }
			// if (sudoScourceX[key] != undefined) {
			//   delete sudoScourceX[key];
			// }

			// icon[sudoScource] = sudoScourceX;
			// setAttributes({ icon: { ...icon } });

			// if (blockCssY.items[iconSelector] == undefined) {
			//   blockCssY.items[iconSelector] = {};
			// }

			// Object.entries(sudoScourceX).map(args => {
			//   var argAttr = myStore.cssAttrParse(args[0]);
			//   var argAttrVal = args[1];
			//   blockCssY.items[iconSelector][argAttr] = argAttrVal;
			// })

			// if (blockCssY.items[iconSelector][key] != undefined) {
			//   delete blockCssY.items[iconSelector][key];
			// }

			// setAttributes({ blockCssY: { items: blockCssY.items } });
		}

		function onAddStyleIcon(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, icon);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ icon: object });
		}

		function onBulkAddWrapper(sudoScource, cssObj) {
			let obj = Object.assign({}, wrapper);
			obj[sudoScource] = cssObj;

			setAttributes({ wrapper: obj });

			var selector = myStore.getElementSelector(sudoScource, wrapperSelector);
			var stylesObj = {};

			Object.entries(cssObj).map((args) => {
				var attr = args[0];
				var cssPropty = myStore.cssAttrParse(attr);

				if (stylesObj[selector] == undefined) {
					stylesObj[selector] = {};
				}

				if (stylesObj[selector][cssPropty] == undefined) {
					stylesObj[selector][cssPropty] = {};
				}

				stylesObj[selector][cssPropty] = args[1];
			});

			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };

			setAttributes({ blockCssY: { items: cssItemsX } });
		}

		function onBulkAddCommentCount(sudoScource, cssObj) {
			let obj = Object.assign({}, commentCount);
			obj[sudoScource] = cssObj;

			setAttributes({ commentCount: obj });

			var selector = myStore.getElementSelector(
				sudoScource,
				commentCountSelector
			);
			var stylesObj = {};

			Object.entries(cssObj).map((args) => {
				var attr = args[0];
				var cssPropty = myStore.cssAttrParse(attr);

				if (stylesObj[selector] == undefined) {
					stylesObj[selector] = {};
				}

				if (stylesObj[selector][cssPropty] == undefined) {
					stylesObj[selector][cssPropty] = {};
				}

				stylesObj[selector][cssPropty] = args[1];
			});

			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };

			setAttributes({ blockCssY: { items: cssItemsX } });
		}

		function onBulkAddIcon(sudoScource, cssObj) {
			let obj = Object.assign({}, icon);
			obj[sudoScource] = cssObj;

			setAttributes({ icon: obj });

			var selector = myStore.getElementSelector(sudoScource, iconSelector);
			var stylesObj = {};

			Object.entries(cssObj).map((args) => {
				var attr = args[0];
				var cssPropty = myStore.cssAttrParse(attr);

				if (stylesObj[selector] == undefined) {
					stylesObj[selector] = {};
				}

				if (stylesObj[selector][cssPropty] == undefined) {
					stylesObj[selector][cssPropty] = {};
				}

				stylesObj[selector][cssPropty] = args[1];
			});

			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };

			setAttributes({ blockCssY: { items: cssItemsX } });
		}

		function onBulkAddPrefix(sudoScource, cssObj) {
			let obj = Object.assign({}, prefix);
			obj[sudoScource] = cssObj;

			setAttributes({ prefix: obj });

			var selector = myStore.getElementSelector(sudoScource, prefixSelector);
			var stylesObj = {};

			Object.entries(cssObj).map((args) => {
				var attr = args[0];
				var cssPropty = myStore.cssAttrParse(attr);

				if (stylesObj[selector] == undefined) {
					stylesObj[selector] = {};
				}

				if (stylesObj[selector][cssPropty] == undefined) {
					stylesObj[selector][cssPropty] = {};
				}

				stylesObj[selector][cssPropty] = args[1];
			});

			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };

			setAttributes({ blockCssY: { items: cssItemsX } });
		}

		function onBulkAddPostfix(sudoScource, cssObj) {
			let obj = Object.assign({}, postfix);
			obj[sudoScource] = cssObj;

			setAttributes({ postfix: obj });

			var selector = myStore.getElementSelector(sudoScource, postfixSelector);
			var stylesObj = {};

			Object.entries(cssObj).map((args) => {
				var attr = args[0];
				var cssPropty = myStore.cssAttrParse(attr);

				if (stylesObj[selector] == undefined) {
					stylesObj[selector] = {};
				}

				if (stylesObj[selector][cssPropty] == undefined) {
					stylesObj[selector][cssPropty] = {};
				}

				stylesObj[selector][cssPropty] = args[1];
			});

			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };

			setAttributes({ blockCssY: { items: cssItemsX } });
		}

		function onChangeStylePrefix(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, prefix);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ prefix: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				prefixSelector
			);
			var cssPropty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });

			// var path = sudoScource + '.' + attr + '.' + breakPointX
			// let obj = Object.assign({}, prefix);
			// const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
			// setAttributes({ prefix: updatedObj });
			// var sudoScourceX = { ...updatedObj[sudoScource] }

			// var elementSelector = prefixSelector;
			// var elementSelector = myStore.getElementSelector(sudoScource, prefixSelector);

			// sudoScourceX[attr][breakPointX] = newVal;

			// if (blockCssY.items[elementSelector] == undefined) {
			//   blockCssY.items[elementSelector] = {};
			// }

			// Object.entries(sudoScourceX).map(args => {
			//   var argAttr = myStore.cssAttrParse(args[0]);
			//   var argAttrVal = args[1];
			//   blockCssY.items[elementSelector][argAttr] = argAttrVal;
			// })

			// setAttributes({ blockCssY: { items: blockCssY.items } });
		}

		function onRemoveStylePrefix(sudoScource, key) {
			var object = myStore.deletePropertyDeep(prefix, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ prefix: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				prefixSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });

			// var sudoScourceX = { ...prefix[sudoScource] }
			// if (sudoScourceX[key] != undefined) {
			//   delete sudoScourceX[key];
			// }

			// prefix[sudoScource] = sudoScourceX;
			// //sudoScourceX[attr][breakPointX] = newVal;

			// setAttributes({ prefix: { ...prefix } });

			// if (blockCssY.items[prefixSelector] == undefined) {
			//   blockCssY.items[prefixSelector] = {};
			// }

			// Object.entries(sudoScourceX).map(args => {

			//   var argAttr = myStore.cssAttrParse(args[0]);
			//   var argAttrVal = args[1];
			//   blockCssY.items[prefixSelector][argAttr] = argAttrVal;

			// })

			// if (blockCssY.items[prefixSelector][key] != undefined) {
			//   delete blockCssY.items[prefixSelector][key];
			// }

			// setAttributes({ blockCssY: { items: blockCssY.items } });
		}

		function onAddStylePrefix(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, prefix);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ prefix: object });
		}

		function onChangeStylePostfix(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, postfix);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ postfix: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				postfixSelector
			);
			var cssPropty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStylePostfix(sudoScource, key) {
			var object = myStore.deletePropertyDeep(postfix, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ postfix: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				postfixSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });

			// var sudoScourceX = { ...postfix[sudoScource] }
			// if (sudoScourceX[key] != undefined) {
			//   delete sudoScourceX[key];
			// }

			// postfix[sudoScource] = sudoScourceX;
			// //sudoScourceX[attr][breakPointX] = newVal;

			// setAttributes({ postfix: { ...postfix } });

			// if (blockCssY.items[postfixSelector] == undefined) {
			//   blockCssY.items[postfixSelector] = {};
			// }

			// Object.entries(sudoScourceX).map(args => {

			//   var argAttr = myStore.cssAttrParse(args[0]);
			//   var argAttrVal = args[1];
			//   blockCssY.items[postfixSelector][argAttr] = argAttrVal;

			// })

			// if (blockCssY.items[postfixSelector][key] != undefined) {
			//   delete blockCssY.items[postfixSelector][key];
			// }

			// setAttributes({ blockCssY: { items: blockCssY.items } });
		}

		function onAddStylePostfix(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, postfix);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ postfix: object });
		}

		String.prototype.strtr = function (dic) {
			const str = this.toString(),
				makeToken = (inx) => `{{###~${inx}~###}}`,
				tokens = Object.keys(dic).map((key, inx) => ({
					key,
					val: dic[key],
					token: makeToken(inx),
				})),
				tokenizedStr = tokens.reduce(
					(carry, entry) =>
						carry.replace(new RegExp(entry.key, "g"), entry.token),
					str
				);

			return tokens.reduce(
				(carry, entry) =>
					carry.replace(new RegExp(entry.token, "g"), entry.val),
				tokenizedStr
			);
		};

		const [iconHtml, setIconHtml] = useState("");

		useEffect(() => {
			var iconSrc = icon.options.iconSrc;

			var iconHtml = `<span className="${iconSrc}"></span>`;

			setIconHtml(iconHtml);
		}, [icon]);

		const [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });

			// setAttributes({ commentCount: commentCount });
			// setAttributes({ wrapper: wrapper });

			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);

		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
		}

		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		useEffect(() => {
			linkAttrObj();
		}, [commentCount]);

		var linkAttrObj = () => {
			var sdsd = {};

			commentCount.options.linkAttr.map((x) => {
				if (x.val) sdsd[x.id] = x.val;
			});

			setlinkAttrItems(sdsd);
		};

		var postUrl =
			commentCount.options.customUrl != undefined &&
			commentCount.options.customUrl.length > 0
				? commentCount.options.customUrl
				: currentPostUrl;

		const CustomTag = `${wrapper.options.tag}`;
		const CustomTagPostTitle = `${commentCount.options.tag}`;

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});

		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<PanelBody
							className="font-medium text-slate-900 "
							title="Wrapper"
							initialOpen={false}>
							<PGtabs
								activeTab="options"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
									{
										name: "options",
										title: "Options",
										icon: settings,
										className: "tab-settings",
									},
									{
										name: "styles",
										title: "Styles",
										icon: brush,
										className: "tab-style",
									},
									{
										name: "css",
										title: "CSS Library",
										icon: mediaAndText,
										className: "tab-css",
									},
								]}>
								<PGtab name="options">
									<PGcssClassPicker
										tags={customTags}
										label="CSS Class"
										placeholder="Add Class"
										value={wrapper.options.class}
										onChange={(newVal) => {
											var options = { ...wrapper.options, class: newVal };
											setAttributes({
												wrapper: { styles: wrapper.styles, options: options },
											});
										}}
									/>

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											CSS ID
										</label>
										<InputControl
											value={blockId}
											onChange={(newVal) => {
												setAttributes({
													blockId: newVal,
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Wrapper Tag
										</label>
										<SelectControl
											label=""
											value={wrapper.options.tag}
											options={[
												{ label: "Choose", value: "" },
												{ label: "H1", value: "h1" },
												{ label: "H2", value: "h2" },
												{ label: "H3", value: "h3" },
												{ label: "H4", value: "h4" },
												{ label: "H5", value: "h5" },
												{ label: "H6", value: "h6" },
												{ label: "SPAN", value: "span" },
												{ label: "DIV", value: "div" },
												{ label: "P", value: "p" },
											]}
											onChange={(newVal) => {
												var options = { ...wrapper.options, tag: newVal };
												setAttributes({
													wrapper: { ...wrapper, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={wrapper}
										onChange={onChangeStyleWrapper}
										onAdd={onAddStyleWrapper}
										onBulkAdd={onBulkAddWrapper}
										onRemove={onRemoveStyleWrapper}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={wrapper}
										onChange={onPickCssLibraryWrapper}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Comment Count"
							initialOpen={false}>
							<PGtabs
								activeTab="options"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
									{
										name: "options",
										title: "Options",
										icon: settings,
										className: "tab-settings",
									},
									{
										name: "styles",
										title: "Styles",
										icon: brush,
										className: "tab-style",
									},
									{
										name: "css",
										title: "CSS Library",
										icon: mediaAndText,
										className: "tab-css",
									},
								]}>
								<PGtab name="options">
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Comment Status
										</label>
										<SelectControl
											label=""
											value={commentCount.options.status}
											options={[
												{ label: "Approved", value: "approved" },
												{ label: "Moderated", value: "moderated" },
												{ label: "Spam", value: "spam" },
												{ label: "Trash", value: "trash" },
												{ label: "Post trashed", value: "post-trashed" },
												{ label: "Total Comments", value: "total_comments" },
												{ label: "All", value: "all" },
											]}
											onChange={(newVal) => {
												var options = {
													...commentCount.options,
													status: newVal,
												};
												setAttributes({
													commentCount: { ...commentCount, options: options },
												});
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Custom Label
										</label>
										<InputControl
											className="mr-2"
											value={commentCount.options.customLabel}
											onChange={(newVal) => {
												var options = {
													...commentCount.options,
													customLabel: newVal,
												};
												setAttributes({
													commentCount: { ...commentCount, options: options },
												});
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Link To
										</label>

										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={linkToArgs}
											buttonTitle={
												commentCount.options.linkTo.length == 0
													? "Choose"
													: linkToArgs[commentCount.options.linkTo].label
											}
											onChange={setFieldLinkTo}
											values={[]}></PGDropdown>
									</PanelRow>

									{commentCount.options.linkTo == "customField" && (
										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Custom Field Key
											</label>
											<InputControl
												className="mr-2"
												value={commentCount.options.linkToMetaKey}
												onChange={(newVal) => {
													var options = {
														...commentCount.options,
														linkToMetaKey: newVal,
													};
													setAttributes({
														commentCount: { ...commentCount, options: options },
													});
												}}
											/>
										</PanelRow>
									)}

									{commentCount.options.linkTo == "customUrl" && (
										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Custom URL
											</label>

											<div className="relative">
												<Button
													className={linkPickerPosttitle ? "!bg-gray-400" : ""}
													icon={link}
													onClick={(ev) => {
														setLinkPickerPosttitle((prev) => !prev);
													}}></Button>
												{commentCount.options.customUrl.length > 0 && (
													<Button
														className="!text-red-500 ml-2"
														icon={linkOff}
														onClick={(ev) => {
															var options = {
																...commentCount.options,
																customUrl: "",
															};
															setAttributes({
																commentCount: {
																	...commentCount,
																	options: options,
																},
															});
															setLinkPickerPosttitle(false);
														}}></Button>
												)}
												{linkPickerPosttitle && (
													<Popover position="bottom right">
														<LinkControl
															settings={[]}
															value={commentCount.options.customUrl}
															onChange={(newVal) => {
																var options = {
																	...commentCount.options,
																	customUrl: newVal.url,
																};

																setAttributes({
																	commentCount: {
																		...commentCount,
																		options: options,
																	},
																});
															}}
														/>

														<div className="p-2">
															<span className="font-bold">Linked to:</span>{" "}
															{commentCount.options.customUrl.length != 0
																? commentCount.options.customUrl
																: "No link"}{" "}
														</div>
													</Popover>
												)}
											</div>
										</PanelRow>
									)}

									{/* 
                  {commentCount.options.linkTo.length == 0 && (

                    <PanelRow>
                      <label for=""  className="font-medium text-slate-900 " >Custom Tag</label>
                      <SelectControl
                        label=""
                        value={commentCount.options.tag}
                        options={[
                                                  { label: 'Choose', value: '' },
                        { label: 'H1', value: 'h1' },
                          { label: 'H2', value: 'h2' },
                          { label: 'H3', value: 'h3' },
                          { label: 'H4', value: 'h4' },
                          { label: 'H5', value: 'h5' },
                          { label: 'H6', value: 'h6' },
                          { label: 'SPAN', value: 'span' },
                          { label: 'DIV', value: 'div' },
                          { label: 'P', value: 'p' },
                        ]}
                        onChange={(newVal) => {
                          var options = { ...commentCount.options, tag: newVal };
                          setAttributes({ commentCount: { ...commentCount, options: options } });
                        }

                        }
                      />
                    </PanelRow>
                  )} */}

									{commentCount.options.linkTo.length > 0 && (
										<div>
											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Link Target
												</label>

												<SelectControl
													label=""
													value={commentCount.options.linkTarget}
													options={[
														{ label: "Choose...", value: "" },

														{ label: "_self", value: "_self" },
														{ label: "_blank", value: "_blank" },
														{ label: "_parent", value: "_parent" },
														{ label: "_top", value: "_top" },
													]}
													onChange={(newVal) => {
														var options = {
															...commentCount.options,
															linkTarget: newVal,
														};
														setAttributes({
															commentCount: {
																...commentCount,
																options: options,
															},
														});
													}}
												/>
											</PanelRow>

											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Custom Attributes
												</label>
												<div
													// className=" cursor-pointer px-3 text-white py-1 bg-blue-600"
													className="flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-800 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
													onClick={(ev) => {
														var sdsd = commentCount.options.linkAttr.concat({
															id: "",
															val: "",
														});

														var options = {
															...commentCount.options,
															linkAttr: sdsd,
														};
														setAttributes({
															commentCount: {
																...commentCount,
																options: options,
															},
														});

														linkAttrObj();
													}}>
													Add
												</div>
											</PanelRow>

											{commentCount.options.linkAttr.map((x, i) => {
												return (
													<div className="my-2">
														<PanelRow>
															<InputControl
																placeholder="Name"
																className="mr-2"
																value={commentCount.options.linkAttr[i].id}
																onChange={(newVal) => {
																	commentCount.options.linkAttr[i].id = newVal;

																	var ssdsd =
																		commentCount.options.linkAttr.concat([]);

																	var options = {
																		...commentCount.options,
																		linkAttr: ssdsd,
																	};
																	setAttributes({
																		commentCount: {
																			...commentCount,
																			options: options,
																		},
																	});
																}}
															/>

															<InputControl
																className="mr-2"
																placeholder="Value"
																value={x.val}
																onChange={(newVal) => {
																	commentCount.options.linkAttr[i].val = newVal;
																	var ssdsd =
																		commentCount.options.linkAttr.concat([]);

																	var options = {
																		...commentCount.options,
																		linkAttr: ssdsd,
																	};
																	setAttributes({
																		commentCount: {
																			...commentCount,
																			options: options,
																		},
																	});
																}}
															/>
															<span
																// className="text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close"
																className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																onClick={(ev) => {
																	commentCount.options.linkAttr.splice(i, 1);

																	var ssdsd =
																		commentCount.options.linkAttr.concat([]);

																	var options = {
																		...commentCount.options,
																		linkAttr: ssdsd,
																	};
																	setAttributes({
																		commentCount: {
																			...commentCount,
																			options: options,
																		},
																	});
																}}>
																<Icon icon={close} />
															</span>
														</PanelRow>
													</div>
												);
											})}
										</div>
									)}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={commentCount}
										onChange={onChangeStyleCommentCount}
										onAdd={onAddStyleCommentCount}
										onBulkAdd={onBulkAddCommentCount}
										onRemove={onRemoveStyleCommentCount}
									/>
								</PGtab>

								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={commentCount}
										onChange={onPickCssLibraryCommentCount}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Icon"
							initialOpen={false}>
							<PGtabs
								activeTab="options"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
									{
										name: "options",
										title: "Options",
										icon: settings,
										className: "tab-settings",
									},
									{
										name: "styles",
										title: "Styles",
										icon: brush,
										className: "tab-style",
									},
									{
										name: "css",
										title: "CSS Library",
										icon: mediaAndText,
										className: "tab-css",
									},
								]}>
								<PGtab name="options">
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Choose Icon
										</label>

										<PGIconPicker
											library={icon.options.library}
											srcType={icon.options.srcType}
											iconSrc={icon.options.iconSrc}
											onChange={onChangeIcon}
										/>
									</PanelRow>

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Icon position
										</label>

										<SelectControl
											label=""
											value={icon.options.position}
											options={[
												{ label: "Choose Position", value: "" },

												{
													label: "Before Comment Count",
													value: "beforeCommentCount",
												},
												{
													label: "After Comment Count",
													value: "afterCommentCount",
												},
												{ label: "Before Prefix", value: "beforePrefix" },
												{ label: "After Prefix", value: "afterPrefix" },
												{ label: "Before Postfix", value: "beforePostfix" },
												{ label: "After Postfix", value: "afterPostfix" },
											]}
											onChange={(newVal) => {
												var options = { ...icon.options, position: newVal };
												setAttributes({ icon: { ...icon, options: options } });
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={icon}
										onChange={onChangeStyleIcon}
										onAdd={onAddStyleIcon}
										onBulkAdd={onBulkAddIcon}
										onRemove={onRemoveStyleIcon}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={icon}
										onChange={onPickCssLibraryIcon}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Prefix"
							initialOpen={false}>
							<PGtabs
								activeTab="options"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
									{
										name: "options",
										title: "Options",
										icon: settings,
										className: "tab-settings",
									},
									{
										name: "styles",
										title: "Styles",
										icon: brush,
										className: "tab-style",
									},
									{
										name: "css",
										title: "CSS Library",
										icon: mediaAndText,
										className: "tab-css",
									},
								]}>
								<PGtab name="options">
									<PGcssClassPicker
										tags={customTags}
										label="Prefix"
										placeholder="Add Prefix"
										value={prefix.options.text}
										onChange={(newVal) => {
											var options = { ...prefix.options, text: newVal };
											setAttributes({
												prefix: { styles: prefix.styles, options: options },
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={prefix}
										onChange={onChangeStylePrefix}
										onAdd={onAddStylePrefix}
										onBulkAdd={onBulkAddPrefix}
										onRemove={onRemoveStylePrefix}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={prefix}
										onChange={onPickCssLibraryPrefix}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Postfix"
							initialOpen={false}>
							<PGtabs
								activeTab="options"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
									{
										name: "options",
										title: "Options",
										icon: settings,
										className: "tab-settings",
									},
									{
										name: "styles",
										title: "Styles",
										icon: brush,
										className: "tab-style",
									},
									{
										name: "css",
										title: "CSS Library",
										icon: mediaAndText,
										className: "tab-css",
									},
								]}>
								<PGtab name="options">
									<PGcssClassPicker
										tags={customTags}
										label="Postfix"
										placeholder="Add Postfix"
										value={postfix.options.text}
										onChange={(newVal) => {
											var options = { ...postfix.options, text: newVal };
											setAttributes({
												postfix: { styles: postfix.styles, options: options },
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={postfix}
										onChange={onChangeStylePostfix}
										onAdd={onAddStylePostfix}
										onBulkAdd={onBulkAddPostfix}
										onRemove={onRemoveStylePostfix}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={postfix}
										onChange={onPickCssLibraryPostfix}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Block Variations"
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={"post-comment-count"}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
							/>
						</PanelBody>

						<div className="px-3">
							<PGMailSubsctibe />
							<PGContactSupport
								utm={{
									utm_source: "BlockPostTitle",
									utm_campaign: "PostGridCombo",
									utm_content: "BlockOptions",
								}}
							/>
						</div>
						<div className="px-3">
							<PGTutorials slug="post-comment-count" />
						</div>
					</div>
				</InspectorControls>

				<>
					{wrapper.options.tag && (
						<CustomTag {...blockProps}>
							{icon.options.position == "beforePrefix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}

							{prefix.options.text && (
								<span className={prefix.options.class}>
									{prefix.options.text}
								</span>
							)}

							{icon.options.position == "afterPrefix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}

							{commentCount.options.linkTo.length > 0 && (
								<a
									className="commentCount"
									onClick={handleLinkClick}
									{...linkAttrItems}
									target={commentCount.options.linkTarget}
									href={postUrl}>
									{icon.options.position == "beforeCommentCount" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									<span className={commentCount.options.class}>
										{commentCountEdited}
									</span>
									{icon.options.position == "afterCommentCount" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
								</a>
							)}

							{commentCount.options.linkTo.length == 0 && (
								<>
									{icon.options.position == "beforeCommentCount" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}

									<span className={commentCount.options.class}>
										{commentCountEdited}
									</span>

									{icon.options.position == "afterCommentCount" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
								</>
							)}

							{icon.options.position == "beforePostfix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}

							{postfix.options.text && (
								<span className={postfix.options.class}>
									{postfix.options.text}
								</span>
							)}
							{icon.options.position == "afterPostfix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}
						</CustomTag>
					)}

					{wrapper.options.tag.length == 0 && (
						<>
							{icon.options.position == "beforePostfix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}
							{prefix.options.text && (
								<span className={prefix.options.class}>
									{prefix.options.text}
								</span>
							)}

							{icon.options.position == "beforePostfix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}

							{commentCount.options.linkTo.length > 0 && (
								<a
									className="commentCount"
									onClick={handleLinkClick}
									{...linkAttrItems}
									target={commentCount.options.linkTarget}
									href={postUrl}>
									A
									{icon.options.position == "beforeCommentCount" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									<span className={commentCount.options.class}>
										{commentCountEdited}
									</span>
									{icon.options.position == "afterCommentCount" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
								</a>
							)}

							{commentCount.options.linkTo.length == 0 && (
								<div {...blockProps}>
									{icon.options.position == "beforeCommentCount" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									<span className={commentCount.options.class}>
										{commentCountEdited}
									</span>
									{icon.options.position == "afterCommentCount" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
								</div>
							)}
						</>
					)}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
