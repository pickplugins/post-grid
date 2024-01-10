import { registerBlockType, createBlock } from "@wordpress/blocks";
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
	menu,
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
				<path d="M160 26H0V35.4118H160V26Z" fill="url(#paint0_linear_61_288)" />
				<path
					d="M120 44.8237H0V54.2355H120V44.8237Z"
					fill="url(#paint1_linear_61_288)"
				/>
				<path d="M160 93H77V102H160V93Z" fill="#C15940" />
				<path d="M127.907 112H77V121H127.907V112Z" fill="#C15940" />
				<path
					d="M18.0325 112.536H20.2042C20.7307 112.536 21.2086 112.744 21.5599 113.083C22.4373 113.787 23.353 114.349 24.2944 114.729C25.1647 115.081 26.065 115.274 26.9853 115.274C27.9055 115.274 28.8058 115.081 29.6761 114.729C30.6603 114.332 31.6163 113.736 32.5299 112.986L33.7663 114.49L32.5271 112.979C32.8908 112.681 33.33 112.536 33.7663 112.536H33.7709H35.9381C40.899 112.536 45.4077 114.564 48.675 117.832C51.9424 121.099 53.9704 125.608 53.9704 130.569V140.216C53.9704 141.295 53.0956 142.17 52.0166 142.17H1.95379C0.874785 142.17 0 141.295 0 140.216V130.569C0 125.608 2.02811 121.099 5.29552 117.832C8.56284 114.564 13.0716 112.536 18.0325 112.536ZM19.5397 116.444H18.0325C14.1502 116.444 10.6194 118.033 8.05834 120.594C5.49725 123.155 3.90759 126.686 3.90759 130.569V138.262H50.0629V130.569C50.0629 126.686 48.4732 123.155 45.9122 120.594C43.3512 118.033 39.8203 116.444 35.938 116.444H34.4308C33.3801 117.237 32.2755 117.883 31.1262 118.347C29.7921 118.885 28.407 119.181 26.9852 119.181C25.5634 119.181 24.1783 118.885 22.8442 118.347C21.6949 117.883 20.5902 117.237 19.5397 116.444Z"
					fill="#C15940"
				/>
				<path
					d="M26.9866 71C32.2264 71 36.9938 72.2788 40.3886 74.9934C43.5569 77.527 45.4914 81.2236 45.4914 86.1887C45.4914 91.5205 43.1555 98.6459 39.4592 104.008C36.214 108.717 31.8729 112.155 26.9867 112.155C22.1005 112.155 17.7593 108.717 14.5142 104.008C10.8178 98.6459 8.48193 91.5206 8.48193 86.1887C8.48193 81.2236 10.4165 77.527 13.5848 74.9934C16.9796 72.2788 21.7469 71 26.9866 71ZM37.9615 78.0311C35.3063 75.9078 31.3919 74.9076 26.9866 74.9076C22.5814 74.9076 18.667 75.9078 16.0118 78.0311C13.7628 79.8295 12.3895 82.5172 12.3895 86.1887C12.3895 90.818 14.4536 97.0567 17.7196 101.795C20.2899 105.524 23.5525 108.247 26.9867 108.247C30.4209 108.247 33.6835 105.524 36.2538 101.795C39.5198 97.0567 41.5839 90.818 41.5839 86.1887C41.5839 82.5172 40.2106 79.8295 37.9616 78.0311H37.9615Z"
					fill="#C15940"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_288"
						x1="0"
						y1="30.7059"
						x2="160"
						y2="30.7059"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_288"
						x1="0"
						y1="49.5296"
						x2="120"
						y2="49.5296"
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

			html.name = <RawHTML className={name.options.class}>{nameHtml}</RawHTML>;

			html.description = (
				<RawHTML className={description.options.class}>
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
					<RawHTML className={avatar.options.class}>{avatarHtml} </RawHTML>
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
								handle={".handle"}
								setList={(item) => {
									setAttributes({ elements: { items: item } });
								}}>
								{elements.items.map((item, index) => (
									<div key={item.id} className="flex gap-3 items-center">
										<span
											className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
											onClick={(ev) => {
												var elementsX = elements.items.splice(index, 1);
												setAttributes({
													elements: {
														...elements,
														items: elements.items,
													},
												});
											}}>
											<Icon icon={close} />
										</span>
										<span className="handle cursor-pointer hover:bg-blue-500 hover:text-white px-1 py-1">
											<Icon icon={menu} />
										</span>

										<span className="">{item.label}</span>
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
						<PGTutorials slug="post-author" />
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
