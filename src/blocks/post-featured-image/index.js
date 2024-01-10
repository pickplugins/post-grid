import { registerBlockType, createBlock } from "@wordpress/blocks";
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
	ToggleControl,
	MenuGroup,
	MenuItem,
	TextareaControl,
	Popover,
} from "@wordpress/components";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import {
	Icon,
	styles,
	settings,
	link,
	linkOff,
	close,
	brush,
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
import apiFetch from "@wordpress/api-fetch";
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";

import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";

import PGDropdown from "../../components/dropdown";
import PGLibraryBlockVariations from "../../components/library-block-variations";

import MyImage from "./placeholder.jpg";
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
					d="M61.1765 52H4.70588C3.4578 52 2.26085 52.4958 1.37832 53.3783C0.495798 54.2608 0 55.4578 0 56.7059V103.765C0 105.013 0.495798 106.21 1.37832 107.092C2.26085 107.975 3.4578 108.471 4.70588 108.471H61.1765C62.4246 108.471 63.6215 107.975 64.504 107.092C65.3866 106.21 65.8824 105.013 65.8824 103.765V56.7059C65.8824 55.4578 65.3866 54.2608 64.504 53.3783C63.6215 52.4958 62.4246 52 61.1765 52ZM56.4706 99.0588H9.41177V61.4118H56.4706V99.0588Z"
					fill="url(#paint0_linear_61_208)"
				/>
				<path
					d="M160 66.1177H84.7061V75.5294H160V66.1177Z"
					fill="url(#paint1_linear_61_208)"
				/>
				<path
					d="M141.177 84.9412H84.7061V94.3529H141.177V84.9412Z"
					fill="url(#paint2_linear_61_208)"
				/>
				<path
					d="M36.8446 69L27.097 84.7233L23.2135 78.5059L13 95H20.7281H33.4661H53L36.8446 69Z"
					fill="#C15940"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_208"
						x1="0"
						y1="80.2353"
						x2="65.8824"
						y2="80.2353"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_208"
						x1="84.7061"
						y1="70.8236"
						x2="160"
						y2="70.8236"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_208"
						x1="84.7061"
						y1="89.647"
						x2="141.177"
						y2="89.647"
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

		let featuredImage = attributes.featuredImage;
		var wrapper = attributes.wrapper;
		var blockId = attributes.blockId;

		var utmTracking = attributes.utmTracking;

		let isProFeature = applyFilters("isProFeature", true);

		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;

		var blockCssY = attributes.blockCssY;
		var demoImg = "src/blocks/post-featured-image/placeholder.jpg";

		var postId = context["postId"];
		var postType = context["postType"];

		var breakPointX = myStore.getBreakPoint();

		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);

		const [postImage, setPostImage] = useState(null);
		const [imageSizes, setImageSizes] = useState([]);
		const [filterArgs, setfilterArgs] = useState([
			{ label: "Blur", isPro: false, value: "blur", val: "", unit: "px" },
			{
				label: "Brightness",
				isPro: false,
				value: "brightness",
				val: "10",
				unit: "%",
			},
			{
				label: "Contrast",
				isPro: true,
				value: "contrast",
				val: "10",
				unit: "%",
			},
			{
				label: "Grayscale",
				isPro: true,
				value: "grayscale",
				val: "10",
				unit: "%",
			},
			{
				label: "Hue-rotate",
				isPro: true,
				value: "hue-rotate",
				val: "10",
				unit: "deg",
			},
			{ label: "Invert", isPro: true, value: "invert", val: "10", unit: "%" },
			{ label: "Opacity", isPro: true, value: "opacity", val: "10", unit: "%" },
			{
				label: "Saturate",
				isPro: true,
				value: "saturate",
				val: "10",
				unit: "%",
			},
			{ label: "Sepia", value: "sepia", val: "10", unit: "%" },
		]);

		var linkToArgsBasic = {
			noUrl: { label: "No URL", value: "" },

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

		var altTextSrcArgsBasic = {
			none: { label: "No Alt Text", value: "" },
			imgAltText: { label: "Image Alt Text", value: "imgAltText" },
			imgTitle: { label: "Image Title", value: "imgTitle" },
			imgCaption: { label: "Image Caption", value: "imgCaption" },
			imgDescription: { label: "Image Description", value: "imgDescription" },
			imgSlug: { label: "Image Slug", value: "imgSlug" },
			postTitle: { label: "Post Title", value: "postTitle" },
			postSlug: { label: "Post Slug", value: "postSlug" },
			excerpt: { label: "Post Excerpt", value: "excerpt", isPro: true },
			customField: {
				label: "Post Custom Field",
				value: "customField",
				isPro: true,
			},
			custom: { label: "Custom", value: "custom", isPro: true },
		};

		let altTextSrcArgs = applyFilters("altTextSrcArgs", altTextSrcArgsBasic);

		var customTagArgsBasic = {
			"": { label: "Choose", value: "" },
			h1: { label: "H1", value: "h1" },
			h2: { label: "H2", value: "h2" },
			h3: { label: "H3", value: "h3" },
			h4: { label: "H4", value: "h4" },
			h5: { label: "H5", value: "h5" },
			h6: { label: "H6", value: "h6" },
			span: { label: "SPAN", value: "span" },
			div: { label: "DIV", value: "div" },
			p: { label: "P", value: "p" },
		};

		let customTagArgs = applyFilters("customTagArgs", customTagArgsBasic);

		const ALLOWED_MEDIA_TYPES = ["image"];

		const [currentPostImageId, setCurrentPostImageId] = useEntityProp(
			"postType",
			postType,
			"featured_media",
			postId
		);

		const [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);

		useEffect(() => {
			if (!currentPostImageId) return;

			apiFetch({
				path: "/wp/v2/media/" + currentPostImageId,
				method: "POST",
				data: { id: currentPostImageId },
			}).then((res) => {
				setPostImage(res);
				var imgSizes = {};

				Object.keys(res.media_details.sizes).map((x) => {
					var height = res.media_details.sizes[x].height;
					var width = res.media_details.sizes[x].width;
					//var crop = res[x].crop

					var label = x.replaceAll("_", " ");
					imgSizes[x] = {
						label: label + "(" + width + "*" + height + ")",
						value: x,
						height: height,
						width: width,
					};
				});

				setImageSizes(imgSizes);
			});

			// apiFetch({
			//   path: '/post-grid/v2/get_image_sizes',
			//   method: 'POST',
			//   data: {},
			// }).then((res) => {

			//   var imgSizes = [];

			//   Object.keys(res).map(x => {

			//     var height = res[x].height
			//     var width = res[x].width
			//     var crop = res[x].crop

			//     imgSizes.push({ label: x + "(" + width + "*" + height + ")", value: x, height: height, width: width, crop: crop });
			//   })

			//   imgSizes.push({ label: "Full(**)", value: 'full', height: '', width: '', crop: true });

			//   setImageSizes(imgSizes)
			// });
		}, [currentPostImageId]);

		function onPickBlockPatterns(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;

			var blocks = content.length > 0 ? parse(content) : "";

			const attributes = blocks[0].attrs;

			if (action == "insert") {
				wp.data
					.dispatch("core/block-editor")
					.insertBlocks(wp.blocks.parse(content));
			}
			if (action == "applyStyle") {
				var wrapperX = attributes.wrapper;
				var featuredImageX = attributes.featuredImage;
				var blockCssYX = attributes.blockCssY;

				var blockCssObj = {};

				if (featuredImageX != undefined) {
					var featuredImageY = {
						...featuredImageX,
						options: featuredImage.options,
					};
					setAttributes({ featuredImage: featuredImageY });
					blockCssObj[imgSelector] = featuredImageY;
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

		function addfilterArgs(option, index) {
			var filterObj = {};

			if (featuredImage.styles.filter[breakPointX] != undefined) {
				featuredImage.styles.filter[breakPointX].push(option);
			} else {
				featuredImage.styles.filter[breakPointX] = [];
				featuredImage.styles.filter[breakPointX].push(option);
			}

			var styles = {
				...featuredImage.styles,
				filter: featuredImage.styles.filter,
			};
			setAttributes({ featuredImage: { ...featuredImage, styles: styles } });
		}

		useEffect(() => {}, [featuredImage]);

		function setFeaturedImageSize(option, index) {
			var newValuesObj = {};

			if (Object.keys(featuredImage.options.size).length == 0) {
				newValuesObj[breakPointX] = option.value;
			} else {
				newValuesObj = featuredImage.options.size;
				newValuesObj[breakPointX] = option.value;
			}

			var options = { ...featuredImage.options, size: newValuesObj };
			setAttributes({ featuredImage: { ...featuredImage, options: options } });
		}

		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;

		var linkSelector = "";

		if (wrapper.options.tag.length != 0) {
			if (featuredImage.options.linkTo.length > 0) {
				linkSelector = blockClass + " a";
			} else {
				linkSelector = blockClass;
			}
		} else {
			linkSelector = blockClass;
		}

		var imgSelector = blockClass + " img";

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();

			setAttributes({ blockId: blockIdX });

			// setAttributes({ featuredImage: featuredImage });
			// setAttributes({ wrapper: wrapper });

			myStore.generateBlockCss(blockCssY.items, blockId);

			//blockCssY.items[imgSelector] = { ...blockCssY.items[imgSelector], 'width': { "Desktop": "100%" } };
			//blockCssY.items[imgSelector] = { ...blockCssY.items[imgSelector], 'height': { "Desktop": "auto" } };

			//setAttributes({ blockCssY: { items: blockCssY.items } });
		}, [clientId]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[imgSelector] = featuredImage;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		var BefroeTitle = function ({ title, args }) {
			return (
				<>
					<span
						className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
						onClick={(ev) => {
							featuredImage.styles.filter[breakPointX].splice(args.index, 1);
							var styles = featuredImage.styles;

							setAttributes({
								featuredImage: { ...featuredImage, styles: styles },
							});
						}}>
						<Icon icon={close} />
					</span>
					<span className="mx-2">{title}</span>
				</>
			);
		};

		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
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

		function onPickCssLibraryImage(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				featuredImage[sudoScource] = sudoScourceArgs;
			});

			var featuredImageX = Object.assign({}, featuredImage);
			setAttributes({ featuredImage: featuredImageX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					imgSelector
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
		}

		function onAddStyleWrapper(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, wrapper);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ wrapper: object });
		}

		function onChangeStyleImage(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, featuredImage);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ featuredImage: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				imgSelector
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

		function onRemoveStyleImage(sudoScource, key) {
			var object = myStore.deletePropertyDeep(featuredImage, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ featuredImage: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				imgSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleImage(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, featuredImage);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ featuredImage: object });
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

		function onBulkAddFeaturedImage(sudoScource, cssObj) {
			let obj = Object.assign({}, featuredImage);
			obj[sudoScource] = cssObj;

			setAttributes({ featuredImage: obj });

			var selector = myStore.getElementSelector(sudoScource, imgSelector);
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

		function onResetWrapper(sudoScources) {
			let obj = Object.assign({}, wrapper);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						wrapperSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ wrapper: obj });
		}
		function onResetFeaturedImage(sudoScources) {
			let obj = Object.assign({}, featuredImage);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						imgSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ featuredImage: obj });
		}

		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		useEffect(() => {
			linkAttrObj();
		}, [featuredImage]);

		var linkAttrObj = () => {
			var sdsd = {};

			featuredImage.options.linkAttr.map((x) => {
				if (x.val) sdsd[x.id] = x.val;
			});

			setlinkAttrItems(sdsd);
		};

		var postUrl =
			featuredImage.options.customUrl != undefined &&
			featuredImage.options.customUrl.length > 0
				? featuredImage.options.customUrl
				: currentPostUrl;

		const CustomTag = `${wrapper.options.tag}`;

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
												{ label: "span", value: "span" },
												{ label: "div", value: "div" },
												{ label: "P", value: "p" },
											]}
											onChange={(newVal) => {
												var options = { ...wrapper.options, tag: newVal };
												setAttributes({
													wrapper: { styles: wrapper.styles, options: options },
												});
											}}
										/>
									</PanelRow>

									{wrapper.options.tag.length > 0 && (
										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Image as Background
											</label>
											<SelectControl
												label=""
												value={wrapper.options.useAsBackground}
												options={[
													{ label: "No", value: "no" },
													{ label: "Yes", value: "yes" },
												]}
												onChange={(newVal) => {
													var options = {
														...wrapper.options,
														useAsBackground: newVal,
													};
													var styles = {
														...wrapper.styles,
														backgroundImage: {},
													};

													if (newVal == "no") {
														setAttributes({
															wrapper: {
																...wrapper,
																options: options,
																styles: styles,
															},
														});

														var itemsX = { ...blockCssY.items };
														itemsX[wrapperSelector] = {
															...blockCssY.items[wrapperSelector],
															"background-image": {},
														};

														setAttributes({ blockCssY: { items: itemsX } });
													}

													if (newVal == "yes") {
														var newValuesObj = {};

														if (
															wrapper.styles.backgroundImage == undefined ||
															Object.keys(wrapper.styles.backgroundImage)
																.length == 0
														) {
															newValuesObj[breakPointX] =
																'url("' + (postImage == null)
																	? MyImage
																	: postImage.guid.rendered + '")';
														} else {
															newValuesObj = wrapper.styles.backgroundImage;
															newValuesObj[breakPointX] =
																'url("' + (postImage == null)
																	? MyImage
																	: postImage.guid.rendered + '")';
														}

														var styles = {
															...wrapper.styles,
															backgroundImage: newValuesObj,
														};
														setAttributes({
															wrapper: {
																...wrapper,
																styles: styles,
																options: options,
															},
														});

														var itemsX = { ...blockCssY.items };
														itemsX[wrapperSelector] = {
															...blockCssY.items[wrapperSelector],
															"background-image": newValuesObj,
														};

														//setAttributes({ blockCssY: { items: itemsX } });
													}
												}}
											/>
										</PanelRow>
									)}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={wrapper}
										onChange={onChangeStyleWrapper}
										onAdd={onAddStyleWrapper}
										onBulkAdd={onBulkAddWrapper}
										onRemove={onRemoveStyleWrapper}
										onReset={onResetWrapper}
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
							title="Featured Image"
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
									<div className="mb-4">
										<label
											for=""
											className="font-medium text-slate-900 block pb-2 ">
											Thumbnail Size
										</label>
										<PGDropdown
											position="bottom right"
											// btnClass="w-full block text-center "
											btnClass="flex w-full gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-800 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
											// variant="secondary"
											options={imageSizes}
											// buttonTitle="Choose"
											buttonTitle={
												featuredImage.options.size == undefined
													? "Choose"
													: imageSizes[
															featuredImage.options.size[breakPointX]
													  ] == undefined
													? "Choose"
													: imageSizes[featuredImage.options.size[breakPointX]]
															.label
											}
											onChange={setFeaturedImageSize}
											values={
												featuredImage.options.size[breakPointX]
											}></PGDropdown>
									</div>

									{/* {featuredImage.options.size[breakPointX] != undefined && (
									<div className="bg-gray-400 text-white px-3 py-2 my-3">
										{" "}
										{featuredImage.options.size[breakPointX]}
									</div>
								)} */}

									<PanelRow className="my-3">
										<label>Link To</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={
												featuredImage.options.linkTo.length == 0
													? "Choose"
													: linkToArgs[featuredImage.options.linkTo].label
											}
											options={linkToArgs}
											onChange={(option, index) => {
												var options = {
													...featuredImage.options,
													linkTo: option.value,
												};
												setAttributes({
													featuredImage: { ...featuredImage, options: options },
												});
											}}
											values=""></PGDropdown>
									</PanelRow>

									{featuredImage.options.linkTo == "customField" && (
										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Custom Field Key
											</label>
											<InputControl
												className="mr-2"
												value={featuredImage.options.linkToMetaKey}
												onChange={(newVal) => {
													var options = {
														...featuredImage.options,
														linkToMetaKey: newVal,
													};
													setAttributes({
														featuredImage: {
															...featuredImage,
															options: options,
														},
													});
												}}
											/>
										</PanelRow>
									)}

									{featuredImage.options.linkTo == "customUrl" && (
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
												{featuredImage.options.customUrl.length > 0 && (
													<Button
														className="!text-red-500 ml-2"
														icon={linkOff}
														onClick={(ev) => {
															var options = {
																...featuredImage.options,
																customUrl: "",
															};
															setAttributes({
																featuredImage: {
																	...featuredImage,
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
															value={featuredImage.options.customUrl}
															onChange={(newVal) => {
																var options = {
																	...featuredImage.options,
																	customUrl: newVal.url,
																};

																setAttributes({
																	featuredImage: {
																		...featuredImage,
																		options: options,
																	},
																});
															}}
														/>

														<div className="p-2">
															<span className="font-bold">Linked to:</span>{" "}
															{featuredImage.options.customUrl.length != 0
																? featuredImage.options.customUrl
																: "No link"}{" "}
														</div>
													</Popover>
												)}
											</div>
										</PanelRow>
									)}

									{featuredImage.options.linkTo.length > 0 && (
										<div>
											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Link Target
												</label>

												<SelectControl
													label=""
													value={featuredImage.options.linkTarget}
													options={[
														{ label: "Choose...", value: "" },

														{ label: "_self", value: "_self" },
														{ label: "_blank", value: "_blank" },
														{ label: "_parent", value: "_parent" },
														{ label: "_top", value: "_top" },
													]}
													onChange={(newVal) => {
														var options = {
															...featuredImage.options,
															linkTarget: newVal,
														};
														setAttributes({
															featuredImage: {
																...featuredImage,
																options: options,
															},
														});
													}}
												/>
											</PanelRow>
										</div>
									)}

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Custom Attributes
										</label>
										<div
											// className=" cursor-pointer px-3 text-white py-1 bg-blue-600"
											className="flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-800 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
											onClick={(ev) => {
												var sdsd = featuredImage.options.linkAttr.concat({
													id: "",
													val: "",
												});

												var options = {
													...featuredImage.options,
													linkAttr: sdsd,
												};
												setAttributes({
													featuredImage: { ...featuredImage, options: options },
												});

												linkAttrObj();
											}}>
											Add
										</div>
									</PanelRow>

									{featuredImage.options.linkAttr.map((x, i) => {
										return (
											<div className="my-2">
												<PanelRow>
													<InputControl
														placeholder="Name"
														className="mr-2"
														value={featuredImage.options.linkAttr[i].id}
														onChange={(newVal) => {
															featuredImage.options.linkAttr[i].id = newVal;

															var ssdsd = featuredImage.options.linkAttr.concat(
																[]
															);

															var options = {
																...featuredImage.options,
																linkAttr: ssdsd,
															};
															setAttributes({
																featuredImage: {
																	...featuredImage,
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
															featuredImage.options.linkAttr[i].val = newVal;
															var ssdsd = featuredImage.options.linkAttr.concat(
																[]
															);

															var options = {
																...featuredImage.options,
																linkAttr: ssdsd,
															};
															setAttributes({
																featuredImage: {
																	...featuredImage,
																	options: options,
																},
															});
														}}
													/>
													<span
														// className="text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close"
														className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
														onClick={(ev) => {
															featuredImage.options.linkAttr.splice(i, 1);

															var ssdsd = featuredImage.options.linkAttr.concat(
																[]
															);

															var options = {
																...featuredImage.options,
																linkAttr: ssdsd,
															};
															setAttributes({
																featuredImage: {
																	...featuredImage,
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

									<PanelRow className="my-3">
										<label>Alt Text Source</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={
												featuredImage.options.altTextSrc.length == 0
													? "Choose"
													: altTextSrcArgs[featuredImage.options.altTextSrc]
															.label
											}
											options={altTextSrcArgs}
											onChange={(option, index) => {
												var options = {
													...featuredImage.options,
													altTextSrc: option.value,
												};
												setAttributes({
													featuredImage: { ...featuredImage, options: options },
												});
											}}
											values=""></PGDropdown>
									</PanelRow>

									{featuredImage.options.altTextSrc == "customField" && (
										<div>
											<PanelRow className="my-3">
												<label>Custom Field</label>
												<PGDropdown
													position="bottom right"
													variant="secondary"
													buttonTitle={"Choose"}
													options={[
														{ label: "Custom", value: "" },
														{
															label: "Yoast meta",
															value: "_yoast_wpseo_metadesc",
														},
														{
															label: "Rank Math meta",
															value: "rank_math_description",
														},
														{
															label: "AIO SEO meta",
															value: "_aioseo_og_description",
														},
														{
															label: "SEOPress meta",
															value: "_seopress_titles_desc",
														},
														{
															label: "WP Meta SEO meta",
															value: "_metaseo_metadesc",
														},
														{
															label: "The SEO Framework meta",
															value: "_genesis_description",
														},
														{
															label: "SEO SIMPLE PACK meta",
															value: "ssp_meta_description",
														},
													]}
													onChange={(option, index) => {
														var options = {
															...featuredImage.options,
															altTextMetaKey: option.value,
														};
														setAttributes({
															featuredImage: {
																...featuredImage,
																options: options,
															},
														});
													}}
													values=""></PGDropdown>
											</PanelRow>
											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Custom Field Key
												</label>
												<InputControl
													className="mr-2"
													value={featuredImage.options.altTextMetaKey}
													onChange={(newVal) => {
														var options = {
															...featuredImage.options,
															altTextMetaKey: newVal,
														};
														setAttributes({
															featuredImage: {
																...featuredImage,
																options: options,
															},
														});
													}}
												/>
											</PanelRow>
										</div>
									)}

									{featuredImage.options.altTextSrc == "custom" && (
										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Custom Alt Text
											</label>
											<InputControl
												className="mr-2"
												value={featuredImage.options.altTextCustom}
												onChange={(newVal) => {
													var options = {
														...featuredImage.options,
														altTextCustom: newVal,
													};
													setAttributes({
														featuredImage: {
															...featuredImage,
															options: options,
														},
													});
												}}
											/>
										</PanelRow>
									)}

									<PanelRow className="my-3">
										<label>Title Text Source</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={
												featuredImage.options.titleTextSrc == undefined ||
												featuredImage.options.titleTextSrc.length == 0
													? "Choose"
													: altTextSrcArgs[featuredImage.options.titleTextSrc]
															.label
											}
											options={altTextSrcArgs}
											onChange={(option, index) => {
												var options = {
													...featuredImage.options,
													titleTextSrc: option.value,
												};
												setAttributes({
													featuredImage: { ...featuredImage, options: options },
												});
											}}
											values=""></PGDropdown>
									</PanelRow>

									{featuredImage.options.titleTextSrc == "customField" && (
										<div>
											<PanelRow className="my-3">
												<label>Custom Field</label>
												<PGDropdown
													position="bottom right"
													variant="secondary"
													buttonTitle={"Choose"}
													options={[
														{ label: "Custom", value: "" },
														{
															label: "Yoast meta",
															value: "_yoast_wpseo_metadesc",
														},
														{
															label: "Rank Math meta",
															value: "rank_math_description",
														},
														{
															label: "AIO SEO meta",
															value: "_aioseo_og_description",
														},
														{
															label: "SEOPress meta",
															value: "_seopress_titles_desc",
														},
														{
															label: "WP Meta SEO meta",
															value: "_metaseo_metadesc",
														},
														{
															label: "The SEO Framework meta",
															value: "_genesis_description",
														},
														{
															label: "SEO SIMPLE PACK meta",
															value: "ssp_meta_description",
														},
													]}
													onChange={(option, index) => {
														var options = {
															...featuredImage.options,
															titleTextMetaKey: option.value,
														};
														setAttributes({
															featuredImage: {
																...featuredImage,
																options: options,
															},
														});
													}}
													values=""></PGDropdown>
											</PanelRow>
											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Custom Field Key
												</label>
												<InputControl
													className="mr-2"
													value={featuredImage.options.titleTextMetaKey}
													onChange={(newVal) => {
														var options = {
															...featuredImage.options,
															titleTextMetaKey: newVal,
														};
														setAttributes({
															featuredImage: {
																...featuredImage,
																options: options,
															},
														});
													}}
												/>
											</PanelRow>
										</div>
									)}

									{featuredImage.options.titleTextSrc == "custom" && (
										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Custom Title Text
											</label>
											<InputControl
												className="mr-2"
												value={featuredImage.options.titleTextCustom}
												onChange={(newVal) => {
													var options = {
														...featuredImage.options,
														titleTextCustom: newVal,
													};
													setAttributes({
														featuredImage: {
															...featuredImage,
															options: options,
														},
													});
												}}
											/>
										</PanelRow>
									)}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={featuredImage}
										onChange={onChangeStyleImage}
										onAdd={onAddStyleImage}
										onBulkAdd={onBulkAddFeaturedImage}
										onRemove={onRemoveStyleImage}
										onReset={onResetFeaturedImage}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={featuredImage}
										onChange={onPickCssLibraryImage}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						{/* UTM  */}
						<PanelBody
							className="font-medium text-slate-900 "
							// title="UTM tracking"
							title={
								<span className="flex justify-between w-full">
									<span>UTM Tracking</span>
									{isProFeature ? (
										<span
											className="pg-bg-color text-white px-3 py-1 rounded-md"
											onClick={(ev) => {
												window.open(
													"https://getpostgrid.com/pricing/",
													"_blank"
												);
											}}>
											Pro
										</span>
									) : (
										""
									)}{" "}
								</span>
							}
							initialOpen={false}>
							<div>
								<ToggleControl
									label="Enable?"
									help={
										utmTracking.enable
											? "Tracking Enable."
											: "Tracking Disabled."
									}
									checked={utmTracking.enable ? true : false}
									onChange={(e) => {
										var options = {
											...utmTracking,
											enable: utmTracking.enable ? false : true,
										};

										if (isProFeature) {
											alert("This feature is only available in Pro Version.");
											return;
										}
										setAttributes({
											utmTracking: options,
										});
									}}
								/>

								{utmTracking.enable ? (
									<>
										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												ID
											</label>
											<InputControl
												value={utmTracking.id}
												onChange={(newVal) => {
													var update = { ...utmTracking, id: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>
										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												Source
											</label>
											<InputControl
												value={utmTracking.source}
												onChange={(newVal) => {
													var update = { ...utmTracking, source: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>
										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												Medium
											</label>
											<InputControl
												value={utmTracking.medium}
												onChange={(newVal) => {
													var update = { ...utmTracking, medium: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>
										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												Campaign
											</label>
											<InputControl
												value={utmTracking.campaign}
												onChange={(newVal) => {
													var update = { ...utmTracking, campaign: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>

										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												Term
											</label>
											<InputControl
												value={utmTracking.term}
												onChange={(newVal) => {
													var update = { ...utmTracking, term: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>
										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												Content
											</label>
											<InputControl
												value={utmTracking.content}
												onChange={(newVal) => {
													var update = { ...utmTracking, content: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>
									</>
								) : (
									""
								)}
							</div>
						</PanelBody>
						{/* UTM  */}

						<PanelBody
							className="font-medium text-slate-900 "
							title="Block Variations"
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={"post-featured-image"}
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
							<PGTutorials slug="post-featured-image" />
						</div>
					</div>
				</InspectorControls>

				<>
					{postImage == null && (
						<>
							{wrapper.options.tag.length > 0 && (
								<>
									{wrapper.options.useAsBackground == "yes" && (
										<CustomTag
											{...blockProps}
											{...linkAttrItems}
											style={{
												backgroundImage: "url(" + MyImage + ")",
											}}></CustomTag>
									)}
									{wrapper.options.useAsBackground == "no" && (
										<CustomTag {...blockProps}>
											{featuredImage.options.linkTo.length > 0 && (
												<a
													onClick={handleLinkClick}
													href={postUrl}
													target={featuredImage.options.linkTarget}>
													<img
														src={MyImage}
														{...linkAttrItems}
														alt="Default Featured Image"
													/>
												</a>
											)}

											{featuredImage.options.linkTo.length == 0 && (
												<img
													src={MyImage}
													{...linkAttrItems}
													alt="Default Featured Image"
												/>
											)}
										</CustomTag>
									)}
								</>
							)}

							{wrapper.options.tag.length == 0 && (
								<>
									{featuredImage.options.linkTo.length > 0 && (
										<a
											{...blockProps}
											onClick={handleLinkClick}
											href={postUrl}
											target={featuredImage.options.linkTarget}>
											<img
												src={MyImage}
												{...linkAttrItems}
												alt="Default Featured Image"
											/>
										</a>
									)}

									{featuredImage.options.linkTo.length == 0 && (
										<img
											{...blockProps}
											{...linkAttrItems}
											src={MyImage}
											alt="Default Featured Image"
										/>
									)}
								</>
							)}
						</>
					)}

					{postImage != null && (
						<>
							{wrapper.options.tag.length > 0 && (
								<>
									{wrapper.options.useAsBackground == "yes" && (
										<>
											{featuredImage.options.linkTo.length > 0 && (
												<a
													onClick={handleLinkClick}
													href={postUrl}
													{...blockProps}
													target={featuredImage.options.linkTarget}
													style={{
														backgroundImage:
															"url(" +
															(postImage != null &&
															postImage.media_details.sizes[
																featuredImage.options.size[breakPointX]
															] != undefined
																? postImage.media_details.sizes[
																		featuredImage.options.size[breakPointX]
																  ].source_url
																: "") +
															")",
													}}></a>
											)}

											{featuredImage.options.linkTo.length == 0 && (
												<CustomTag
													{...blockProps}
													style={{
														backgroundImage:
															"url(" +
															(postImage != null &&
															postImage.media_details.sizes[
																featuredImage.options.size[breakPointX]
															] != undefined
																? postImage.media_details.sizes[
																		featuredImage.options.size[breakPointX]
																  ].source_url
																: "") +
															")",
													}}></CustomTag>
											)}
										</>
									)}

									{wrapper.options.useAsBackground == "no" && (
										<CustomTag {...blockProps}>
											{featuredImage.options.linkTo.length > 0 && (
												<a
													onClick={handleLinkClick}
													href={postUrl}
													target={featuredImage.options.linkTarget}>
													{featuredImage.options.size[breakPointX] !=
														undefined && (
														<img
															{...linkAttrItems}
															src={
																postImage != null &&
																postImage.media_details.sizes[
																	featuredImage.options.size[breakPointX]
																] != undefined
																	? postImage.media_details.sizes[
																			featuredImage.options.size[breakPointX]
																	  ].source_url
																	: ""
															}
															alt={postImage.alt_text}
														/>
													)}

													{postImage != null &&
														postImage.media_details.sizes[
															featuredImage.options.size[breakPointX]
														] == undefined && (
															<img
																src={
																	postImage != null &&
																	postImage.guid.rendered != undefined
																		? postImage.guid.rendered
																		: ""
																}
																alt={postImage.alt_text}
															/>
														)}
												</a>
											)}

											{featuredImage.options.linkTo.length == 0 && (
												<>
													{featuredImage.options.size[breakPointX] !=
														undefined && (
														<img
															{...linkAttrItems}
															src={
																postImage != null &&
																postImage.media_details.sizes[
																	featuredImage.options.size[breakPointX]
																] != undefined
																	? postImage.media_details.sizes[
																			featuredImage.options.size[breakPointX]
																	  ].source_url
																	: ""
															}
															alt={postImage.alt_text}
														/>
													)}

													{postImage.media_details.sizes[
														featuredImage.options.size[breakPointX]
													] == undefined && (
														<img
															{...linkAttrItems}
															src={
																postImage != null &&
																postImage.guid.rendered != undefined
																	? postImage.guid.rendered
																	: ""
															}
															alt={postImage.alt_text}
														/>
													)}
												</>
											)}
										</CustomTag>
									)}
								</>
							)}

							{wrapper.options.tag.length == 0 && (
								<>
									{featuredImage.options.linkTo.length > 0 && (
										<a
											{...blockProps}
											onClick={handleLinkClick}
											href={postUrl}
											target={featuredImage.options.linkTarget}>
											{featuredImage.options.size[breakPointX] != undefined && (
												<img
													{...linkAttrItems}
													src={
														postImage != null &&
														postImage.media_details.sizes[
															featuredImage.options.size[breakPointX]
														] != undefined
															? postImage.media_details.sizes[
																	featuredImage.options.size[breakPointX]
															  ].source_url
															: ""
													}
													alt={postImage.alt_text}
												/>
											)}

											{postImage != null &&
												postImage.media_details.sizes[
													featuredImage.options.size[breakPointX]
												] == undefined && (
													<img
														src={
															postImage != null &&
															postImage.guid.rendered != undefined
																? postImage.guid.rendered
																: ""
														}
														alt={postImage.alt_text}
													/>
												)}
										</a>
									)}

									{featuredImage.options.linkTo.length == 0 && (
										<>
											{featuredImage.options.size[breakPointX] != undefined && (
												<img
													{...blockProps}
													{...linkAttrItems}
													src={
														postImage != null &&
														postImage.media_details.sizes[
															featuredImage.options.size[breakPointX]
														] != undefined
															? postImage.media_details.sizes[
																	featuredImage.options.size[breakPointX]
															  ].source_url
															: ""
													}
													alt={postImage.alt_text}
												/>
											)}

											{postImage.media_details.sizes[
												featuredImage.options.size[breakPointX]
											] == undefined && (
												<img
													{...blockProps}
													src={
														postImage != null &&
														postImage.guid.rendered != undefined
															? postImage.guid.rendered
															: ""
													}
													alt={postImage.alt_text}
												/>
											)}
										</>
									)}
								</>
							)}
						</>
					)}

					{/* 
          {postImage != null && (
            <>BB
              {wrapper.options.useAsBackground == 'yes' && wrapper.options.tag.length > 0 && (
                <CustomTag {...blockProps} style={{ backgroundImage: 'url(' + ((postImage != null && postImage.media_details.sizes[featuredImage.options.size[breakPointX]] != undefined) ? postImage.media_details.sizes[featuredImage.options.size[breakPointX]].source_url : '') + ')' }}>AA</CustomTag>

              )}



              {wrapper.options.useAsBackground == 'no' && wrapper.options.tag.length > 0 && postImage != null && (
                <CustomTag  {...blockProps}>CC
                  {featuredImage.options.linkTo.length > 0 && (
                    <a onClick={handleLinkClick} href={postUrl} target={featuredImage.options.linkTarget}>


                      {featuredImage.options.size[breakPointX] != undefined && (
                        <>
                          {postImage != null && <img {...linkAttrItems} src={((postImage != null && postImage.media_details.sizes[featuredImage.options.size[breakPointX]] != undefined) ? postImage.media_details.sizes[featuredImage.options.size[breakPointX]].source_url : '')} alt={postImage.alt_text} />}
                        </>
                      )}

                      {postImage != null && postImage.media_details.sizes[featuredImage.options.size[breakPointX]] == undefined && (
                        <>
                          {postImage != null && <img src={((postImage != null && postImage.guid.rendered != undefined) ? postImage.guid.rendered : '')} alt={postImage.alt_text} />}


                        </>
                      )}


                    </a>
                  )}
                  {featuredImage.options.linkTo.length == 0 && postImage != null && (
                    <>DD

                      {featuredImage.options.size[breakPointX] != undefined && (
                        <>
                          {postImage != null && <img  {...linkAttrItems} src={((postImage != null && postImage.media_details.sizes[featuredImage.options.size[breakPointX]] != undefined) ? postImage.media_details.sizes[featuredImage.options.size[breakPointX]].source_url : '')} alt={postImage.alt_text} />}
                        </>
                      )}

                      {postImage != null && postImage.media_details.sizes[featuredImage.options.size[breakPointX]] == undefined && (
                        <>

                          {postImage != null && <img  {...linkAttrItems} src={((postImage != null && postImage.guid.rendered != undefined) ? postImage.guid.rendered : '')} alt={postImage.alt_text} />}
                        </>
                      )}





                    </>
                  )}
                </CustomTag>
              )}


              {wrapper.options.useAsBackground == 'no' && wrapper.options.tag.length == 0 && (

                (
                  featuredImage.options.linkTo.length > 0 && (
                    <a onClick={handleLinkClick}  {...blockProps} href={postUrl} target={featuredImage.options.linkTarget}>
                      EE

                      {postImage != null && <img  {...linkAttrItems} src={postImage.guid.rendered} alt={postImage.alt_text} />}


                    </a>)
                )
              )}

              {wrapper.options.useAsBackground == 'no' && wrapper.options.tag.length == 0 && featuredImage.options.linkTo.length == 0 && (


                <>

                  {postImage != null && (


                    <>FF
                      {postImage != null && <img {...blockProps} {...linkAttrItems} src={postImage.guid.rendered} alt={postImage.alt_text} />}
                    </>



                  )}
                </>

              )}


            </>
          )} */}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
