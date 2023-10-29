import { registerBlockType } from "@wordpress/blocks";
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
import { Icon, styles, settings, link, close, linkOff } from "@wordpress/icons";

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
	Spinner,
} from "@wordpress/components";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";

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
require("fslightbox");

import IconToggle from "../../components/icon-toggle";
import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";
import BreakpointToggle from "../../components/breakpoint-toggle";
import PGDropdown from "../../components/dropdown";
import PGtoggle from "../../components/toggle";
import colorsPresets from "../../colors-presets";
import PGcssDisplay from "../../components/css-display";
import PGBlockPatterns from "../../components/block-patterns";

import MyImage from "./placeholder.jpg";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import PGCssLibrary from "../../components/css-library";
import metadata from "./block.json";

var myStore = wp.data.select("postgrid-shop");

registerBlockType(metadata, {
	icon: {
		// Specifying a background color to appear with the icon e.g.: in the inserter.
		background: "#fff",
		// Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
		foreground: "#fff",
		// Specifying an icon for the block
		src: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
				<path fill="#1d4ed8" d="M36,36H0V0H36ZM2.08,33.94H33.92V2.06H2.08Z" />
				<polygon
					fill="#1d4ed8"
					points="20.08 11.51 14.83 19.05 12.75 16.06 6.87 24.49 29.13 24.49 20.08 11.51"
				/>
			</svg>
		),
	},

	edit: function (props) {
		var attributes = props.attributes;
		var setAttributes = props.setAttributes;
		var context = props.context;
		var clientId = props.clientId;

		var galleryId =
			context["post-grid/galleryId"] == undefined
				? null
				: context["post-grid/galleryId"];
		var galleryLightbox =
			context["post-grid/lightbox"] == undefined
				? null
				: context["post-grid/lightbox"];

		let image = attributes.image;
		var wrapper = attributes.wrapper;
		var lightbox = attributes.lightbox;

		const lightboxEnable =
			lightbox.options.enable == undefined ? true : lightbox.options.enable;

		var blockId = attributes.blockId;

		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;

		var customCss = attributes.customCss;
		var blockCssY = attributes.blockCssY;

		var postId = context["postId"];
		var postType = context["postType"];

		//const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
		var breakPointX = myStore.getBreakPoint();

		const [loading, setLoading] = useState(false);
		const [isLoading, setisLoading] = useState(false);

		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);
		const [linkPickerSrcUrl, setlinkPickerSrcUrl] = useState(false);

		const [postImage, setPostImage] = useState(null);

		const [imageSizes, setImageSizes] = useState([]);
		let filterArgsBasic = [
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
		];

		let filterArgs = applyFilters("imageFilterArgs", filterArgsBasic);

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

		const ALLOWED_MEDIA_TYPES = ["image"];

		const [currentPostImageId, setCurrentPostImageId] = useState(
			image.options.srcId
		);

		const [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);

		useEffect(() => {
			if (
				currentPostImageId.length != 0 &&
				image.options.imgSrcType == "media"
			) {
				setLoading(true);

				apiFetch({
					path: "/wp/v2/media/" + currentPostImageId,
					method: "POST",
					data: { id: currentPostImageId },
				}).then((res) => {
					setPostImage(res);

					var options = {
						...image.options,
						srcUrl: res.source_url,
						srcId: res.id,
					};
					setAttributes({ image: { ...image, options: options } });

					setLoading(false);

					var imgSizes = [];

					Object.keys(res.media_details.sizes).map((x) => {
						var height = res.media_details.sizes[x].height;
						var width = res.media_details.sizes[x].width;
						//var crop = res[x].crop

						imgSizes.push({
							label: x + "(" + width + "*" + height + ")",
							value: x,
							height: height,
							width: width,
						});
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

				//   setImageSizes(imgSizes)
				// });
			}
		}, [currentPostImageId]);

		useEffect(() => {
			if (image.options.imgSrcMetaKey.length != 0) {
				setLoading(true);

				apiFetch({
					path: "/post-grid/v2/get_post_meta",
					method: "POST",
					data: {
						postId: postId,
						meta_key: image.options.imgSrcMetaKey,
						type: "string",
						template: "",
					},
				}).then((res) => {
					var metaKeyType =
						image.options.imgSrcMetaKeyType != undefined
							? image.options.imgSrcMetaKeyType
							: "ID";
					if (metaKeyType == "ID") {
						setCurrentPostImageId(res.meta_value);
					} else {
						//setPostImage(res)
						setPostImage({
							media_details: { sizes: {} },
							guid: { rendered: res.meta_value },
						});
					}
					setLoading(false);
				});
			}
		}, [
			image.options.imgSrcMetaKey,
			image.options.imgSrcMetaKeyType,
			image.options.imgSrcType,
		]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[imgSelector] = image;

			//setAttributes({ wrapper: wrapper, image: image, });

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = { ...blockCssY.items, ...blockCssRules };

			setAttributes({ blockCssY: { items: items } });
		}, [wrapper]);

		function setFeaturedImageSize(option, index) {
			var newValuesObj = {};

			if (Object.keys(image.options.size).length == 0) {
				newValuesObj[breakPointX] = option.value;
			} else {
				newValuesObj = image.options.size;
				newValuesObj[breakPointX] = option.value;
			}

			var options = { ...image.options, size: newValuesObj };
			setAttributes({ image: { ...image, options: options } });
		}

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });

			// setAttributes({ image: image });
			// setAttributes({ wrapper: wrapper });

			myStore.generateBlockCss(blockCssY.items, blockId, customCss);

			//blockCssY.items[imgSelector] = { ...blockCssY.items[imgSelector], 'width': { "Desktop": "100%" } };
			//blockCssY.items[imgSelector] = { ...blockCssY.items[imgSelector], 'height': { "Desktop": "auto" } };

			//setAttributes({ blockCssY: { items: blockCssY.items } });
		}, [clientId]);

		function onPickBlockPatterns(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;

			var blocks = content.length > 0 ? parse(content) : "";
			console.log(content);
			console.log(blocks);
			const attributes = blocks[0].attrs;
			// attributes.blockId = Date.now();
			// console.log(Date.now());
			if (action == "insert") {
				wp.data
					.dispatch("core/block-editor")
					.insertBlocks(wp.blocks.parse(content));
			}
			if (action == "applyStyle") {
				// var options = attributes.options
				var wrapper = attributes.wrapper;
				var postTitle = attributes.postTitle;
				var prefix = attributes.prefix;
				var postfix = attributes.postfix;
				var blockCssY = attributes.blockCssY;

				setAttributes({ wrapper: wrapper });
				setAttributes({ postTitle: postTitle });
				setAttributes({ prefix: prefix });
				// setAttributes({ postfix: postfix });
				setAttributes({ blockCssY: blockCssY });
			}
			if (action == "replace") {
				if (confirm("Do you want to replace?")) {
					wp.data
						.dispatch("core/block-editor")
						.replaceBlock(clientId, wp.blocks.parse(content));
				}
			}
		}

		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;

		var linkSelector = "";
		var imgSelector = "";

		if (wrapper.options.tag.length != 0) {
			var imgSelector = blockClass + " img";

			if (image.options.linkTo.length > 0) {
				linkSelector = blockClass + " a";
			} else {
				linkSelector = blockClass;
			}
		} else {
			linkSelector = blockClass;
			var imgSelector = "img" + blockClass;
		}

		// var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

		// for (var x in breakPoints) {

		//   var item = breakPoints[x];
		//   breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

		// }

		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
		}

		function handleLinkClickX(ev, src) {
			if (lightbox.options.enable == true) {
				var lightboxHandle = new FsLightbox();
				lightboxHandle.props.sources = [src];
				lightboxHandle.open();
			}

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
				image[sudoScource] = sudoScourceArgs;
			});

			var imageX = Object.assign({}, image);
			setAttributes({ image: imageX });

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
			let obj = Object.assign({}, image);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ image: object });

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
			var object = myStore.deletePropertyDeep(image, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ image: object });

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
			let obj = Object.assign({}, image);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ image: object });
		}

		function onBulkAddWrapper(sudoScource, cssObj) {
			// var path = [sudoScource, attr, breakPointX]s
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

		function onBulkAddImage(sudoScource, cssObj) {
			// var path = [sudoScource, attr, breakPointX]
			let obj = Object.assign({}, image);
			obj[sudoScource] = cssObj;

			setAttributes({ image: obj });

			var selector = myStore.getElementSelector(sudoScource, imageSelector);
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

		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId, customCss);
		}, [blockCssY]);

		useEffect(() => {
			setAttributes({ customCss: customCss });

			myStore.generateBlockCss(blockCssY.items, blockId, customCss);
		}, [customCss]);

		useEffect(() => {
			linkAttrObj();
		}, [image]);

		var linkAttrObj = () => {
			var sdsd = {};

			image.options.linkAttr.map((x) => {
				if (x.val) sdsd[x.id] = x.val;
			});

			setlinkAttrItems(sdsd);
		};

		var postUrl =
			image.options.linkTocustomUrl != undefined &&
			image.options.linkTocustomUrl.length > 0
				? image.options.linkTocustomUrl
				: currentPostUrl;

		const CustomTag = `${wrapper.options.tag}`;

		const blockProps = useBlockProps({
			className: ` ${blockId} pg-post-image`,
		});

		return (
			<>
				<InspectorControls>
					<div className="p-3">
						<PanelRow>
							<label for="">Image Sources</label>
							<SelectControl
								label=""
								value={image.options.imgSrcType}
								options={[
									{ label: "Media", value: "media" },
									{ label: "Custom Field", value: "customField" },
									{ label: "Image Source URL", value: "customUrl" },
									// { label: 'Image ID', value: 'imgId' },
								]}
								onChange={(newVal) => {
									var options = { ...image.options, imgSrcType: newVal };
									setAttributes({ image: { ...image, options: options } });
								}}
							/>
						</PanelRow>

						{image.options.srcUrl.length > 0 && (
							<img src={image.options.srcUrl} alt="" />
						)}

						{image.options.srcUrl.length == 0 && <img src={MyImage} alt="" />}

						{image.options.imgSrcType == "media" && (
							<>
								<div className="mt-5" for="">
									Choose Image
								</div>

								<MediaUploadCheck>
									<MediaUpload
										class="bg-blue-500"
										onSelect={(media) => {
											// media.id
											setCurrentPostImageId(media.id);

											var options = {
												...image.options,
												srcUrl: media.url,
												srcId: media.id,
											};
											setAttributes({ image: { ...image, options: options } });
										}}
										onClose={() => {}}
										allowedTypes={ALLOWED_MEDIA_TYPES}
										value={image.options.srcId}
										render={({ open }) => (
											<Button
												className="my-3 bg-blue-500 text-white border border-solid border-gray-300 text-center w-full"
												onClick={open}>
												Open Media Library
											</Button>
										)}
									/>
								</MediaUploadCheck>
							</>
						)}

						{image.options.imgSrcType == "customField" && (
							<>
								<PanelRow>
									<label for="">Custom Field Key</label>
									<InputControl
										className="mr-2"
										value={image.options.imgSrcMetaKey}
										onChange={(newVal) => {
											var options = { ...image.options, imgSrcMetaKey: newVal };
											setAttributes({ image: { ...image, options: options } });
										}}
									/>
								</PanelRow>

								<PanelRow>
									<label for="">Metakey Type</label>
									<SelectControl
										label=""
										value={image.options.imgSrcMetaKeyType}
										options={[
											{ label: "ID", value: "ID" },
											{ label: "URL", value: "URL" },
										]}
										onChange={(newVal) => {
											var options = {
												...image.options,
												imgSrcMetaKeyType: newVal,
											};
											setAttributes({ image: { ...image, options: options } });
										}}
									/>
								</PanelRow>
							</>
						)}

						{image.options.imgSrcType == "customUrl" && (
							<>
								<PanelRow>
									<label for="">Image URL</label>

									<div className="relative">
										<Button
											className={linkPickerSrcUrl ? "!bg-gray-400" : ""}
											icon={link}
											onClick={(ev) => {
												setlinkPickerSrcUrl((prev) => !prev);
											}}></Button>
										{image.options.srcUrl.length > 0 && (
											<Button
												className="!text-red-500 ml-2"
												icon={linkOff}
												onClick={(ev) => {
													var options = { ...image.options, srcUrl: "" };
													setAttributes({
														image: { ...image, options: options },
													});
													setlinkPickerSrcUrl(false);
												}}></Button>
										)}
										{linkPickerSrcUrl && (
											<Popover position="bottom right">
												<LinkControl
													settings={[]}
													value={image.options.srcUrl}
													onChange={(newVal) => {
														var options = {
															...image.options,
															srcUrl: newVal.url,
														};
														setAttributes({
															image: { ...image, options: options },
														});

														setPostImage({
															...postImage,
															srcUrl: newVal.url,
															media_details: { sizes: {} },
															guid: { rendered: newVal.url },
														});
													}}
												/>

												<div className="p-2">
													<span className="font-bold">Image Source URL:</span>{" "}
													{image.options.srcUrl.length != 0
														? image.options.srcUrl
														: "No link"}{" "}
												</div>
											</Popover>
										)}
									</div>
								</PanelRow>
							</>
						)}

						{image.options.imgSrcType == "imgId" && (
							<PanelRow>
								<label for="">Image ID</label>
								<InputControl
									className="mr-2"
									value={image.options.imgSrcImgId}
									onChange={(newVal) => {
										var options = { ...image.options, imgSrcImgId: newVal };
										setAttributes({ image: { ...image, options: options } });
									}}
								/>
							</PanelRow>
						)}
					</div>

					<PanelBody title="Wrapper" initialOpen={false}>
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
									icon: styles,
									className: "tab-style",
								},
								{
									name: "css",
									title: "CSS Library",
									icon: styles,
									className: "tab-css",
								},
							]}>
							<PGtab name="options">
								<PanelRow>
									<label for="">Wrapper Tag</label>
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
												wrapper: { styles: wrapper.styles, options: options },
											});
										}}
									/>
								</PanelRow>

								{wrapper.options.tag.length > 0 && (
									<PanelRow>
										<label for="">Image as Background</label>
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
												var styles = { ...wrapper.styles, backgroundImage: {} };

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
															'url("' + postImage.guid.rendered + '")';
													} else {
														newValuesObj = wrapper.styles.backgroundImage;
														newValuesObj[breakPointX] =
															'url("' + postImage.guid.rendered + '")';
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

													setAttributes({ blockCssY: { items: itemsX } });
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
									onRemove={onRemoveStyleWrapper}
									onBulkAdd={onBulkAddWrapper}
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

					<PanelBody title="Image" initialOpen={false}>
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
									icon: styles,
									className: "tab-style",
								},
								{
									name: "css",
									title: "CSS Library",
									icon: styles,
									className: "tab-css",
								},
							]}>
							<PGtab name="options">
								{(image.options.imgSrcType == "media" ||
									image.options.imgSrcType == "customField") && (
									<>
										<PanelRow className="mb-4">
											<label for="">Thumbnail Size</label>
											<PGDropdown
												position="bottom right"
												variant="secondary"
												options={imageSizes}
												buttonTitle="Choose"
												onChange={setFeaturedImageSize}
												values={image.options.size[breakPointX]}></PGDropdown>
										</PanelRow>
										{image.options.size[breakPointX] != undefined && (
											<div className="bg-gray-400 text-white px-3 py-2 my-3">
												{" "}
												{image.options.size[breakPointX]}
											</div>
										)}
									</>
								)}

								<PanelRow className="my-3">
									<label>Link To</label>
									<PGDropdown
										position="bottom right"
										variant="secondary"
										buttonTitle={
											linkToArgs[image.options.linkTo] == undefined ||
											image.options.linkTo.length == 0
												? "Choose"
												: linkToArgs[image.options.linkTo].label
										}
										options={linkToArgs}
										onChange={(option, index) => {
											var options = { ...image.options, linkTo: option.value };
											setAttributes({ image: { ...image, options: options } });
										}}
										values=""></PGDropdown>
								</PanelRow>

								{image.options.linkTo == "customField" && (
									<PanelRow>
										<label for="">Custom Field Key</label>
										<InputControl
											className="mr-2"
											value={image.options.linkToMetaKey}
											onChange={(newVal) => {
												var options = {
													...image.options,
													linkToMetaKey: newVal,
												};
												setAttributes({
													image: { ...image, options: options },
												});
											}}
										/>
									</PanelRow>
								)}

								{image.options.linkTo == "customUrl" && (
									<PanelRow>
										<label for="">Custom URL</label>

										<div className="relative">
											<Button
												className={linkPickerPosttitle ? "!bg-gray-400" : ""}
												icon={link}
												onClick={(ev) => {
													setLinkPickerPosttitle((prev) => !prev);
												}}></Button>
											{image.options.linkTocustomUrl.length > 0 && (
												<Button
													className="!text-red-500 ml-2"
													icon={linkOff}
													onClick={(ev) => {
														var options = {
															...image.options,
															linkTocustomUrl: "",
														};
														setAttributes({
															image: { ...image, options: options },
														});
														setLinkPickerPosttitle(false);
													}}></Button>
											)}
											{linkPickerPosttitle && (
												<Popover position="bottom right">
													<LinkControl
														settings={[]}
														value={image.options.linkTocustomUrl}
														onChange={(newVal) => {
															var options = {
																...image.options,
																linkTocustomUrl: newVal.url,
															};

															setAttributes({
																image: { ...image, options: options },
															});
														}}
													/>

													<div className="p-2">
														<span className="font-bold">Linked to:</span>{" "}
														{image.options.linkTocustomUrl.length != 0
															? image.options.linkTocustomUrl
															: "No link"}{" "}
													</div>
												</Popover>
											)}
										</div>
									</PanelRow>
								)}

								{image.options.linkTo.length > 0 && (
									<div>
										<PanelRow>
											<label for="">Link Target</label>

											<SelectControl
												label=""
												value={image.options.linkTarget}
												options={[
													{ label: "Choose...", value: "" },

													{ label: "_self", value: "_self" },
													{ label: "_blank", value: "_blank" },
													{ label: "_parent", value: "_parent" },
													{ label: "_top", value: "_top" },
												]}
												onChange={(newVal) => {
													var options = {
														...image.options,
														linkTarget: newVal,
													};
													setAttributes({
														image: { ...image, options: options },
													});
												}}
											/>
										</PanelRow>
									</div>
								)}

								<PanelRow className="my-3">
									<label>Alt Text Source</label>
									<PGDropdown
										position="bottom right"
										variant="secondary"
										buttonTitle={
											image.options.altTextSrc.length == 0
												? "Choose"
												: altTextSrcArgs[image.options.altTextSrc].label
										}
										options={altTextSrcArgs}
										onChange={(option, index) => {
											var options = {
												...image.options,
												altTextSrc: option.value,
											};
											setAttributes({ image: { ...image, options: options } });
										}}
										values=""></PGDropdown>
								</PanelRow>

								{image.options.altTextSrc == "customField" && (
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
														...image.options,
														altTextMetaKey: option.value,
													};
													setAttributes({
														image: { ...image, options: options },
													});
												}}
												values=""></PGDropdown>
										</PanelRow>
										<PanelRow>
											<label for="">Custom Field Key</label>
											<InputControl
												className="mr-2"
												value={image.options.altTextMetaKey}
												onChange={(newVal) => {
													var options = {
														...image.options,
														altTextMetaKey: newVal,
													};
													setAttributes({
														image: { ...image, options: options },
													});
												}}
											/>
										</PanelRow>
									</div>
								)}

								{image.options.altTextSrc == "custom" && (
									<PanelRow>
										<label for="">Custom Alt Text</label>
										<InputControl
											className="mr-2"
											value={image.options.altTextCustom}
											onChange={(newVal) => {
												var options = {
													...image.options,
													altTextCustom: newVal,
												};
												setAttributes({
													image: { ...image, options: options },
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
											image.options.titleTextSrc == undefined ||
											image.options.titleTextSrc.length == 0
												? "Choose"
												: altTextSrcArgs[image.options.titleTextSrc].label
										}
										options={altTextSrcArgs}
										onChange={(option, index) => {
											var options = {
												...image.options,
												titleTextSrc: option.value,
											};
											setAttributes({ image: { ...image, options: options } });
										}}
										values=""></PGDropdown>
								</PanelRow>

								{image.options.titleTextSrc == "customField" && (
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
														...image.options,
														titleTextMetaKey: option.value,
													};
													setAttributes({
														image: { ...image, options: options },
													});
												}}
												values=""></PGDropdown>
										</PanelRow>
										<PanelRow>
											<label for="">Custom Field Key</label>
											<InputControl
												className="mr-2"
												value={image.options.titleTextMetaKey}
												onChange={(newVal) => {
													var options = {
														...image.options,
														titleTextMetaKey: newVal,
													};
													setAttributes({
														image: { ...image, options: options },
													});
												}}
											/>
										</PanelRow>
									</div>
								)}

								{image.options.titleTextSrc == "custom" && (
									<PanelRow>
										<label for="">Custom Title Text</label>
										<InputControl
											className="mr-2"
											value={image.options.titleTextCustom}
											onChange={(newVal) => {
												var options = {
													...image.options,
													titleTextCustom: newVal,
												};
												setAttributes({
													image: { ...image, options: options },
												});
											}}
										/>
									</PanelRow>
								)}

								<PanelRow>
									<label for="">Custom Attributes</label>
									<div
										className=" cursor-pointer px-3 text-white py-1 bg-blue-600"
										onClick={(ev) => {
											var sdsd = image.options.linkAttr.concat({
												id: "",
												val: "",
											});

											var options = { ...image.options, linkAttr: sdsd };
											setAttributes({ image: { ...image, options: options } });

											linkAttrObj();
										}}>
										Add
									</div>
								</PanelRow>

								{image.options.linkAttr.map((x, i) => {
									return (
										<div className="my-2">
											<PanelRow>
												<InputControl
													placeholder="Name"
													className="mr-2"
													value={image.options.linkAttr[i].id}
													onChange={(newVal) => {
														image.options.linkAttr[i].id = newVal;

														var ssdsd = image.options.linkAttr.concat([]);

														var options = { ...image.options, linkAttr: ssdsd };
														setAttributes({
															image: { ...image, options: options },
														});
													}}
												/>

												<InputControl
													className="mr-2"
													placeholder="Value"
													value={x.val}
													onChange={(newVal) => {
														image.options.linkAttr[i].val = newVal;
														var ssdsd = image.options.linkAttr.concat([]);

														var options = { ...image.options, linkAttr: ssdsd };
														setAttributes({
															image: { ...image, options: options },
														});
													}}
												/>
												<span
													className="text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close"
													onClick={(ev) => {
														image.options.linkAttr.splice(i, 1);

														var ssdsd = image.options.linkAttr.concat([]);

														var options = { ...image.options, linkAttr: ssdsd };
														setAttributes({
															image: { ...image, options: options },
														});
													}}></span>
											</PanelRow>
										</div>
									);
								})}
							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={image}
									onChange={onChangeStyleImage}
									onAdd={onAddStyleImage}
									onRemove={onRemoveStyleImage}
									onBulkAdd={onBulkAddImage}
								/>
							</PGtab>

							<PGtab name="css">
								<PGCssLibrary
									blockId={blockId}
									obj={image}
									onChange={onPickCssLibraryImage}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>

					<PanelBody
						title="Lightbox"
						initialOpen={false}
						className={galleryId != null ? "hidden" : ""}>
						<PanelRow>
							<ToggleControl
								label="Enable?"
								help={
									lightboxEnable ? "Lightbox Enabled" : "Lightbox Disabled."
								}
								checked={lightboxEnable ? true : false}
								onChange={(e) => {
									var options = {
										...lightbox.options,
										enable: lightboxEnable ? false : true,
									};
									setAttributes({
										lightbox: { ...lightbox, options: options },
									});
								}}
							/>
						</PanelRow>
					</PanelBody>

					<PanelBody title="Block Variations" initialOpen={false}>
						<PGBlockPatterns
							blockName={"image"}
							onChange={onPickBlockPatterns}
						/>
					</PanelBody>

					<PanelBody title="Custom Style" initialOpen={false}>
						<p>Please use following class selector to apply your custom CSS</p>
						<div className="my-3">
							<p className="font-bold">Title Wrapper</p>
							<p>
								<code>
									{wrapperSelector}
									{"{/* your CSS here*/}"}
								</code>
							</p>
						</div>

						<div className="my-3">
							<p className="font-bold">Title link</p>
							<p>
								<code>
									{linkSelector}
									{"{/* your CSS here*/}"}{" "}
								</code>
							</p>
						</div>

						<TextareaControl
							label="Custom CSS"
							help="Do not use 'style' tag"
							value={customCss}
							onChange={(value) => {
								setAttributes({ customCss: value });
							}}
						/>
					</PanelBody>

					<div className="px-3">
						<PGMailSubsctibe />
						<PGContactSupport
							utm={{
								utm_source: "BlockImage",
								utm_campaign: "PostGridCombo",
								utm_content: "BlockOptions",
							}}
						/>
					</div>
				</InspectorControls>

				<>
					{loading && (
						<div {...blockProps}>
							<Spinner />
						</div>
					)}

					{!loading && (
						<>
							{(image.options.imgSrcType == "media" ||
								image.options.imgSrcType == "customField") && (
								<>
									{postImage == null && (
										<div {...blockProps}>
											<img src={MyImage} alt="" />
										</div>
									)}
								</>
							)}

							{postImage != null && (
								<>
									{wrapper.options.useAsBackground == "yes" && (
										<CustomTag {...blockProps}></CustomTag>
									)}

									{wrapper.options.useAsBackground == "no" &&
										(image.options.imgSrcType == "media" ||
											image.options.imgSrcType == "customField") && (
											<>
												{wrapper.options.tag.length == 0 && (
													<>
														{image.options.linkTo.length > 0 && (
															<a
																onClick={handleLinkClick}
																{...blockProps}
																href={postUrl}
																target={image.options.linkTarget}>
																{postImage.media_details.sizes[
																	image.options.size[breakPointX]
																] == undefined && (
																	<img
																		{...linkAttrItems}
																		src={
																			postImage.guid.rendered != undefined
																				? postImage.guid.rendered
																				: ""
																		}
																		alt={postImage.alt_text}
																	/>
																)}

																{postImage.media_details.sizes[
																	image.options.size[breakPointX]
																] != undefined && (
																	<img
																		{...linkAttrItems}
																		src={
																			postImage.media_details.sizes[
																				image.options.size[breakPointX]
																			].source_url
																		}
																		alt={postImage.alt_text}
																	/>
																)}
															</a>
														)}

														{image.options.linkTo.length == 0 && (
															<>
																{postImage.media_details.sizes[
																	image.options.size[breakPointX]
																] == undefined && (
																	<img
																		{...blockProps}
																		{...linkAttrItems}
																		src={
																			postImage.guid.rendered != undefined
																				? postImage.guid.rendered
																				: ""
																		}
																		alt={postImage.alt_text}
																	/>
																)}

																{postImage.media_details.sizes[
																	image.options.size[breakPointX]
																] != undefined && (
																	<img
																		{...blockProps}
																		{...linkAttrItems}
																		src={
																			postImage.media_details.sizes[
																				image.options.size[breakPointX]
																			].source_url
																		}
																		alt={postImage.alt_text}
																	/>
																)}
															</>
														)}
													</>
												)}
												{wrapper.options.tag && (
													<CustomTag {...blockProps}>
														{image.options.linkTo.length > 0 && (
															<a
																onClick={(e) => {
																	handleLinkClickX(
																		e,
																		postImage.media_details.sizes[
																			image.options.size[breakPointX]
																		].source_url
																	);
																}}
																href={postUrl}
																target={image.options.linkTarget}>
																{postImage.media_details.sizes[
																	image.options.size[breakPointX]
																] != undefined && (
																	<img
																		{...linkAttrItems}
																		src={
																			postImage.media_details.sizes[
																				image.options.size[breakPointX]
																			].source_url
																		}
																		alt={postImage.alt_text}
																	/>
																)}
																{postImage.media_details.sizes[
																	image.options.size[breakPointX]
																] == undefined && (
																	<img
																		{...linkAttrItems}
																		src={
																			postImage.guid.rendered != undefined
																				? postImage.guid.rendered
																				: ""
																		}
																		alt={postImage.alt_text}
																	/>
																)}
															</a>
														)}
														{image.options.linkTo.length == 0 && (
															<>
																{(image.options.imgSrcType == "media" ||
																	image.options.imgSrcType ==
																		"customField") && (
																	<>
																		{postImage.media_details.sizes[
																			image.options.size[breakPointX]
																		] != undefined && (
																			<img
																				{...linkAttrItems}
																				onClick={(e) => {
																					handleLinkClickX(
																						e,
																						postImage.media_details.sizes[
																							image.options.size[breakPointX]
																						].source_url
																					);
																				}}
																				src={
																					postImage.media_details.sizes[
																						image.options.size[breakPointX]
																					] != undefined
																						? postImage.media_details.sizes[
																								image.options.size[breakPointX]
																						  ].source_url
																						: ""
																				}
																				alt={postImage.alt_text}
																			/>
																		)}

																		{postImage.media_details.sizes[
																			image.options.size[breakPointX]
																		] == undefined && (
																			<img
																				{...linkAttrItems}
																				onClick={(e) => {
																					handleLinkClickX(
																						e,
																						postImage.media_details.sizes[
																							image.options.size[breakPointX]
																						].source_url
																					);
																				}}
																				src={
																					postImage.guid.rendered != undefined
																						? postImage.guid.rendered
																						: ""
																				}
																				alt={postImage.alt_text}
																			/>
																		)}
																	</>
																)}

																{/* {image.options.imgSrcType == 'customUrl' && (
                                <img {...linkAttrItems} src={image.options.srcUrl} alt={image.options.altTextCustom} />
                              )} */}
															</>
														)}
													</CustomTag>
												)}
											</>
										)}
								</>
							)}

							{image.options.imgSrcType == "customUrl" &&
								image.options.srcUrl.length == 0 && (
									<div {...blockProps}>
										<img src={MyImage} alt="" />
									</div>
								)}

							{image.options.imgSrcType == "customUrl" &&
								image.options.srcUrl.length != 0 && (
									<>
										{wrapper.options.tag.length == 0 && (
											<>
												{image.options.linkTo.length > 0 && (
													<a
														onClick={handleLinkClick}
														{...blockProps}
														href={postUrl}
														target={image.options.linkTarget}>
														<img
															{...linkAttrItems}
															src={image.options.srcUrl}
															alt={image.options.altTextCustom}
														/>
													</a>
												)}

												{image.options.linkTo.length == 0 && (
													<>
														<img
															{...blockProps}
															{...linkAttrItems}
															src={image.options.srcUrl}
															alt={image.options.altTextCustom}
														/>
													</>
												)}
											</>
										)}
										{wrapper.options.tag && (
											<CustomTag {...blockProps}>
												{image.options.linkTo.length > 0 && (
													<a
														onClick={(e) => {
															handleLinkClickX(e, image.options.srcUrl);
														}}
														href={postUrl}
														target={image.options.linkTarget}>
														<img
															{...linkAttrItems}
															src={image.options.srcUrl}
															alt={image.options.altTextCustom}
														/>
													</a>
												)}
												{image.options.linkTo.length == 0 && (
													<>
														<img
															{...linkAttrItems}
															src={image.options.srcUrl}
															alt={image.options.altTextCustom}
														/>
													</>
												)}
											</CustomTag>
										)}
									</>
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
