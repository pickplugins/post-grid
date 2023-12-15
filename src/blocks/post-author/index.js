import { registerBlockType } from "@wordpress/blocks";
import apiFetch from "@wordpress/api-fetch";
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { ReactSortable } from "react-sortablejs";

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
import { applyFilters } from "@wordpress/hooks";
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

import PGDropdown from "../../components/dropdown";

import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";

import PGLibraryBlockVariations from "../../components/library-block-variations";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import metadata from "./block.json";
import PGcssClassPicker from "../../components/css-class-picker";
import customTags from "../../custom-tags";

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
				<rect fill="#8db1ff" y="28.03" width="13.97" height="2" />
				<rect fill="#8db1ff" x="16.42" y="28.03" width="9.96" height="2" />
				<rect fill="#8db1ff" y="23.34" width="36" height="2" />
				<rect fill="#8db1ff" y="18.64" width="36" height="2" />
				<path
					fill="#1d4ed8"
					d="M3,10.43H4.26a3,3,0,0,1,3,3v1.15a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V13.42a3,3,0,0,1,3-3Z"
				/>
				<circle fill="#1d4ed8" cx="3.62" cy="7.97" r="2" />
				<rect fill="#1d4ed8" x="15.48" y="9.09" width="20.52" height="2.35" />
			</svg>
		),
	},

	edit: function (props) {
		var attributes = props.attributes;
		var setAttributes = props.setAttributes;
		var context = props.context;
		var clientId = props.clientId;
		var blockId = attributes.blockId;
		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;

		var wrapper = attributes.wrapper;
		var elements = attributes.elements;
		var avatar = attributes.avatar;
		var description = attributes.description;
		var name = attributes.name;

		var linkAttr = attributes.linkAttr;
		var blockCss = attributes.blockCss;

		var blockCssY = attributes.blockCssY;

		var postId = context["postId"];
		var postType = context["postType"];

		var wrapperSelector = blockClass;
		// Wrapper CSS Class Selectors
		var nameSelector = blockClass + " .name";
		var descriptionSelector = blockClass + " .description";
		var avatarSelector = blockClass + " .avatar";
		var avatarImgSelector = blockClass + " .avatar img";

		const CustomTagWrapper = `${wrapper.options.tag}`;

		var [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
		var [postAuthor, setPostAuthor] = useState({});

		var [html, setHtml] = useState({});
		var [loading, setLoading] = useState(false);
		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);

		var [postAuthorId, setPostAuthorId] = useEntityProp(
			"postType",
			postType,
			"author",
			postId
		);

		var [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();

			setAttributes({ blockId: blockIdX });

			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[nameSelector] = name;
			blockCssObj[descriptionSelector] = description;
			blockCssObj[avatarSelector] = avatar;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		useEffect(() => {
			apiFetch({
				path: "/wp/v2/users/" + postAuthorId,
				method: "GET",
			}).then((res) => {
				setPostAuthor(res);
			});
		}, [postAuthorId]);

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

		var userFields = [
			{ id: "avatar", label: "Avatar" },
			{ id: "name", label: "Name" },
			{ id: "description", label: "Description" },
		];

		function setUserField(option, index) {
			//var isExist = elements.items.find(x => x.label === option.label);

			var elementsX = elements.items.push(option);
			setAttributes({ elements: { items: elements.items } });
		}

		function generatehtml() {
			var nameHtml =
				postAuthor.name != undefined
					? `<span className='prefix'>${name.options.prefix}</span>${postAuthor.name}<span className='postfix'>${name.options.postfix}</span>`
					: "Author Name 1";

			if (name.options.linkTo == "postUrl") {
				nameHtml = `<span className='prefix'>${
					name.options.prefix
				}</span><a href="${currentPostUrl}">${
					postAuthor.name != undefined ? postAuthor.name : "Author Name"
				}</a><span className='postfix'>${name.options.postfix}</span>`;
			}

			if (name.options.linkTo == "authorUrl") {
				nameHtml = `<span className='prefix'>${
					name.options.prefix
				}</span><a href="${postAuthor.url}">${
					postAuthor.name != undefined ? postAuthor.name : "Author Name"
				}</a><span className='postfix'>${name.options.postfix}</span>`;
			}

			if (name.options.linkTo == "authorLink") {
				nameHtml = `<span className='prefix'>${
					name.options.prefix
				}</span><a href="${postAuthor.link}">${
					postAuthor.name != undefined ? postAuthor.name : "Author Name"
				}</a><span className='postfix'>${name.options.postfix}</span>`;
			}

			if (name.options.linkTo == "authorMeta") {
				nameHtml = `<span className='prefix'>${
					name.options.prefix
				}</span><a href="${postAuthor.link}">${
					postAuthor.name != undefined ? postAuthor.name : "Author Name"
				}</a><span className='postfix'>${name.options.postfix}</span>`;
			}

			if (name.options.linkTo == "customUrl") {
				nameHtml = `<span className='prefix'>${
					name.options.prefix
				}</span><a href="${name.options.customUrl}">${
					postAuthor.name != undefined ? postAuthor.name : "Author Name"
				}</a><span className='postfix'>${name.options.postfix}</span>`;
			}

			html.name = <RawHTML class={name.options.class}>{nameHtml}</RawHTML>;

			html.description = (
				<RawHTML class={description.options.class}>
					{postAuthor.description != undefined
						? postAuthor.description
						: "Author description"}
				</RawHTML>
			);

			if (postAuthor.avatar_urls != undefined) {
				var avatarHtml = `<img alt='' src=${
					postAuthor.avatar_urls != undefined
						? postAuthor.avatar_urls[avatar.options.size]
						: ""
				} />`;

				html.avatar = (
					<RawHTML class={avatar.options.class}>{avatarHtml} </RawHTML>
				);
			}

			setTimeout((x) => {
				setHtml(html);
			}, 100);
		}

		useEffect(() => {
			setTimeout(() => {
				generatehtml();
			}, 1000);
		}, [postAuthor]);

		useEffect(() => {
			generatehtml();
		}, [name]);

		useEffect(() => {
			generatehtml();
		}, [description]);

		useEffect(() => {
			generatehtml();
		}, [avatar]);

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
				var elementsX = attributes.elements;
				var avatarX = attributes.avatar;
				var nameX = attributes.name;
				var descriptionX = attributes.description;
				var linkAttrX = attributes.linkAttr;
				var blockCssY = attributes.blockCssY;

				var blockCssObj = {};

				if (linkAttrX != undefined) {
					var linkAttrY = { ...linkAttrX, options: linkAttr.options };
					setAttributes({ linkAttr: linkAttrY });
					blockCssObj[linkAttrSelector] = linkAttrY;
				}

				if (descriptionX != undefined) {
					var descriptionY = { ...descriptionX, options: description.options };
					setAttributes({ description: descriptionY });
					blockCssObj[descriptionSelector] = descriptionY;
				}

				if (nameX != undefined) {
					var nameY = { ...nameX, options: name.options };
					setAttributes({ name: nameY });
					blockCssObj[nameSelector] = nameY;
				}

				if (avatarX != undefined) {
					var avatarY = { ...avatarX, options: avatar.options };
					setAttributes({ avatar: avatarY });
					blockCssObj[avatarSelector] = avatarY;
				}

				if (elementsX != undefined) {
					var elementsY = { ...elementsX, options: elements.options };
					setAttributes({ elements: elementsY });
					blockCssObj[elementsSelector] = elementsY;
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

		function onChangeStyleAvatar(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, avatar);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ avatar: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				avatarSelector
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

		function onRemoveStyleAvatar(sudoScource, key) {
			var object = myStore.deletePropertyDeep(avatar, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ avatar: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				avatarSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleAvatar(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, avatar);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ avatar: object });
		}

		function onChangeStyleName(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, name);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ name: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				nameSelector
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

		function onRemoveStyleName(sudoScource, key) {
			var object = myStore.deletePropertyDeep(name, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ name: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				nameSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleName(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, name);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ name: object });
		}

		function onChangeStyleDescription(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, description);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ description: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				descriptionSelector
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

		function onRemoveStyleDescription(sudoScource, key) {
			var object = myStore.deletePropertyDeep(description, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ description: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				descriptionSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleDescription(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, description);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ description: object });
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

		function onBulkAddAvatar(sudoScource, cssObj) {
			let obj = Object.assign({}, avatar);
			obj[sudoScource] = cssObj;

			setAttributes({ avatar: obj });

			var selector = myStore.getElementSelector(sudoScource, avatarSelector);
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

		function onBulkAddName(sudoScource, cssObj) {
			let obj = Object.assign({}, name);
			obj[sudoScource] = cssObj;

			setAttributes({ name: obj });

			var selector = myStore.getElementSelector(sudoScource, nameSelector);
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

		function onBulkAddDescription(sudoScource, cssObj) {
			let obj = Object.assign({}, description);
			obj[sudoScource] = cssObj;

			setAttributes({ description: obj });

			var selector = myStore.getElementSelector(
				sudoScource,
				descriptionSelector
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
		function onResetAvatar(sudoScources) {
			let obj = Object.assign({}, avatar);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						avatarSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ avatar: obj });
		}
		function onResetDescription(sudoScources) {
			let obj = Object.assign({}, description);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						descriptionSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ description: obj });
		}
		function onResetName(sudoScources) {
			let obj = Object.assign({}, name);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						nameSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ name: obj });
		}

		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		useEffect(() => {
			linkAttrObj();
		}, [linkAttr]);

		var linkAttrObj = () => {
			var sdsd = {};

			linkAttr.map((x) => {
				if (x.val) sdsd[x.id] = x.val;
			});

			setlinkAttrItems(sdsd);
			//return sdsd;
		};

		const CustomTag = `${wrapper.tag}`;

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
										onReset={onResetWrapper}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Elements"
							initialOpen={true}>
							<PanelRow>
								<label for="" className="font-medium text-slate-900 ">
									Add User Field
								</label>
								<PGDropdown
									position="bottom right"
									variant="secondary"
									options={userFields}
									buttonTitle="Choose"
									onChange={setUserField}
									values=""></PGDropdown>
							</PanelRow>

							<ReactSortable
								list={elements.items}
								setList={(item) => {
									setAttributes({ elements: { items: item } });
								}}>
								{elements.items.map((item, index) => (
									<div key={item.id} className="flex items-center">
										<Button
											onClick={(ev) => {
												var elementsX = elements.items.splice(index, 1);

												setAttributes({ elements: { items: elements.items } });
											}}>
											<Icon icon={close} />
										</Button>

										<span className="cursor-move">{item.label}</span>
									</div>
								))}
							</ReactSortable>
						</PanelBody>
						{elements.items.find((x) => x.label === "Avatar") && (
							<PanelBody
								className="font-medium text-slate-900 "
								title="Avatar"
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
									]}>
									<PGtab name="options">
										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Avatar Size
											</label>

											<SelectControl
												label=""
												value={avatar.options.size}
												options={[
													{ label: "Select..", value: "" },

													{ label: "24", value: "24" },
													{ label: "48", value: "48" },
													{ label: "96", value: "96" },
												]}
												onChange={(newVal) => {
													var options = { ...avatar.options, size: newVal };
													setAttributes({
														avatar: { ...avatar, options: options },
													});
												}}
											/>
										</PanelRow>

										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Avatar Class
											</label>

											<InputControl
												value={avatar.options.class}
												onChange={(newVal) => {
													var options = { ...avatar.options, class: newVal };
													setAttributes({
														avatar: { ...avatar, options: options },
													});
												}}
											/>
										</PanelRow>
									</PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={avatar}
											onChange={onChangeStyleAvatar}
											onAdd={onAddStyleAvatar}
											onBulkAdd={onBulkAddAvatar}
											onRemove={onRemoveStyleAvatar}
											onReset={onResetAvatar}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>
						)}

						{elements.items.find((x) => x.label === "Name") && (
							<PanelBody
								className="font-medium text-slate-900 "
								title="Name"
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
									]}>
									<PGtab name="options">
										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Name Class
											</label>

											<InputControl
												value={name.options.class}
												onChange={(newVal) => {
													var options = { ...name.options, class: newVal };
													setAttributes({
														name: { ...name, options: options },
													});
												}}
											/>
										</PanelRow>

										<PanelRow className="my-3">
											<label>Link To</label>
											<PGDropdown
												position="bottom right"
												variant="secondary"
												buttonTitle={
													name.options.linkTo.length == 0
														? "Choose"
														: linkToArgs[name.options.linkTo].label
												}
												options={linkToArgs}
												onChange={(option, index) => {
													var options = {
														...name.options,
														linkTo: option.value,
													};
													setAttributes({
														name: { ...name, options: options },
													});
												}}
												values=""></PGDropdown>
										</PanelRow>

										{(name.options.linkTo == "authorMeta" ||
											name.options.linkTo == "customField") && (
											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													{name.options.linkTo == "authorMeta" && (
														<>Author Meta Key</>
													)}
													{name.options.linkTo == "customField" && (
														<>Post Meta Key</>
													)}
												</label>

												<InputControl
													value={name.options.linkToMeta}
													onChange={(newVal) => {
														var options = {
															...name.options,
															linkToMeta: newVal,
														};
														setAttributes({
															name: { ...name, options: options },
														});
													}}
												/>
											</PanelRow>
										)}

										{name.options.linkTo == "customUrl" && (
											<>
												<PanelRow>
													<label for="" className="font-medium text-slate-900 ">
														Custom Url
													</label>

													<div className="relative">
														<Button
															className={
																linkPickerPosttitle ? "!bg-gray-400" : ""
															}
															icon={link}
															onClick={(ev) => {
																setLinkPickerPosttitle((prev) => !prev);
															}}></Button>
														{name.options.customUrl.length > 0 && (
															<Button
																className="!text-red-500 ml-2"
																icon={linkOff}
																onClick={(ev) => {
																	var options = {
																		...name.options,
																		customUrl: "",
																	};
																	setAttributes({
																		name: { ...name, options: options },
																	});
																	setLinkPickerPosttitle(false);
																}}></Button>
														)}
														{linkPickerPosttitle && (
															<Popover position="bottom right">
																<LinkControl
																	settings={[]}
																	value={name.options.customUrl}
																	onChange={(newVal) => {
																		var options = {
																			...name.options,
																			customUrl: newVal.url,
																		};

																		setAttributes({
																			name: { ...name, options: options },
																		});
																	}}
																/>

																<div className="p-2">
																	<span className="font-bold">Linked to:</span>{" "}
																	{name.options.customUrl.length != 0
																		? name.options.customUrl
																		: "No link"}{" "}
																</div>
															</Popover>
														)}
													</div>
												</PanelRow>
											</>
										)}

										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Prefix
											</label>
											<InputControl
												value={name.options.prefix}
												onChange={(newVal) => {
													var options = { ...name.options, prefix: newVal };
													setAttributes({
														name: { ...name, options: options },
													});
												}}
											/>
										</PanelRow>

										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Postfix
											</label>
											<InputControl
												value={name.options.postfix}
												onChange={(newVal) => {
													var options = { ...name.options, postfix: newVal };
													setAttributes({
														name: { ...name, options: options },
													});
												}}
											/>
										</PanelRow>
									</PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={name}
											onChange={onChangeStyleName}
											onAdd={onAddStyleName}
											onBulkAdd={onBulkAddName}
											onRemove={onRemoveStyleName}
											onReset={onResetName}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>
						)}

						{elements.items.find((x) => x.label === "Description") && (
							<PanelBody
								className="font-medium text-slate-900 "
								title="Description"
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
									]}>
									<PGtab name="options">
										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Description Class
											</label>

											<InputControl
												value={description.options.class}
												onChange={(newVal) => {
													var options = {
														...description.options,
														class: newVal,
													};
													setAttributes({
														description: { ...description, options: options },
													});
												}}
											/>
										</PanelRow>
									</PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={description}
											onChange={onChangeStyleDescription}
											onAdd={onAddStyleDescription}
											onBulkAdd={onBulkAddDescription}
											onRemove={onRemoveStyleDescription}
											onReset={onResetDescription}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>
						)}

						<PanelBody
							className="font-medium text-slate-900 "
							title="Block Variations"
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={"post-author"}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
							/>
						</PanelBody>

						<PGMailSubsctibe />
						<PGContactSupport
							utm={{
								utm_source: "BlockPostExcerpt",
								utm_campaign: "PostGridCombo",
								utm_content: "BlockOptions",
							}}
						/>
					</div>
				</InspectorControls>

				<CustomTagWrapper {...blockProps}>
					{elements.items.map((x) => {
						return html[x.id];
					})}
				</CustomTagWrapper>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
