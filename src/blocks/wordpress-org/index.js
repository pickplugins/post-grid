import { registerBlockType, createBlock } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import {
	PanelBody,
	RangeControl,
	Button,
	Panel,
	PanelRow,
	SelectControl,
	Spinner,
	ToggleControl,
} from "@wordpress/components";

import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	RichText,
	__experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import { __experimentalInputControl as InputControl } from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";
import {
	createElement,
	memo,
	useMemo,
	useState,
	useEffect,
} from "@wordpress/element";
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import {
	Icon,
	styles,
	settings,
	close,
	brush,
	mediaAndText,
} from "@wordpress/icons";
import { ReactSortable } from "react-sortablejs";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import PGCssLibrary from "../../components/css-library";
import PGDropdown from "../../components/dropdown";
import metadata from "./block.json";
import PGLibraryBlockVariations from "../../components/library-block-variations";
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
					d="M61.1765 15H4.70588C3.4578 15 2.26085 15.4958 1.37832 16.3783C0.495798 17.2608 0 18.4578 0 19.7059V66.7647C0 68.0128 0.495798 69.2097 1.37832 70.0923C2.26085 70.9748 3.4578 71.4706 4.70588 71.4706H61.1765C62.4246 71.4706 63.6215 70.9748 64.504 70.0923C65.3866 69.2097 65.8824 68.0128 65.8824 66.7647V19.7059C65.8824 18.4578 65.3866 17.2608 64.504 16.3783C63.6215 15.4958 62.4246 15 61.1765 15ZM56.4706 62.0588H9.41177V24.4118H56.4706V62.0588Z"
					fill="url(#paint0_linear_61_762)"
				/>
				<path
					d="M160 29.1177H84.7061V38.5294H160V29.1177Z"
					fill="url(#paint1_linear_61_762)"
				/>
				<path
					d="M141.177 47.9414H84.7061V57.3532H141.177V47.9414Z"
					fill="url(#paint2_linear_61_762)"
				/>
				<path
					d="M61.1765 89H4.70588C3.4578 89 2.26085 89.4958 1.37832 90.3783C0.495798 91.2608 0 92.4578 0 93.7059V140.765C0 142.013 0.495798 143.21 1.37832 144.092C2.26085 144.975 3.4578 145.471 4.70588 145.471H61.1765C62.4246 145.471 63.6215 144.975 64.504 144.092C65.3866 143.21 65.8824 142.013 65.8824 140.765V93.7059C65.8824 92.4578 65.3866 91.2608 64.504 90.3783C63.6215 89.4958 62.4246 89 61.1765 89ZM56.4706 136.059H9.41177V98.4118H56.4706V136.059Z"
					fill="url(#paint3_linear_61_762)"
				/>
				<path
					d="M160 103.118H84.7061V112.529H160V103.118Z"
					fill="url(#paint4_linear_61_762)"
				/>
				<path
					d="M141.177 121.941H84.7061V131.353H141.177V121.941Z"
					fill="url(#paint5_linear_61_762)"
				/>
				<path
					d="M32.9806 60C23.4868 59.8176 16.0664 52.0352 16 42.9806C16.1846 33.4939 23.9257 26.0664 32.9806 26C42.4678 26.1897 49.9335 33.9134 50 42.9806C49.8125 52.4748 42.0473 59.9335 32.9806 60ZM32.9806 27.2046C24.1656 27.3781 17.227 34.5632 17.1657 42.9806C17.3372 51.8026 24.5636 58.7341 32.9806 58.7954C41.8026 58.6239 48.7341 51.3975 48.7954 42.9806C48.629 34.1591 41.3854 27.2658 32.9806 27.2046ZM28.9006 56.8914L33.2526 44.3794L37.7988 56.6194C34.736 57.6448 31.8403 57.7069 28.9006 56.8914ZM25.5588 34.7817C23.9657 34.9983 22.4162 35.0755 20.896 35.0149C23.7825 30.8881 28.4042 28.5664 32.9806 28.5257C36.7237 28.5966 40.2132 30.0115 42.7726 32.3337C41.5856 32.246 40.8749 32.7665 40.3634 33.6548C39.6201 35.9481 41.1908 37.6457 42.0732 39.3669C42.9074 40.9395 42.8412 42.7277 42.384 44.2629L40.208 51.6846L34.9623 36.1028C35.5089 36.052 36.059 36.0356 36.5555 35.9474C37.143 35.8166 37.2719 35.2698 36.8663 34.9371C36.7368 34.8335 36.5943 34.7817 36.4389 34.7817L33.2915 35.0149H30.9017C30.227 35.0547 28.3219 34.403 28.1623 35.2869C28.0798 35.6274 28.334 35.8943 28.6285 35.9475C29.1483 36.0148 29.7439 36.0913 30.2217 36.1417L32.5143 42.2812L29.328 51.6846L24.0434 36.1028C24.6026 36.0543 25.1692 36.0373 25.6754 35.9474C26.09 35.8955 26.2712 35.6883 26.2194 35.3257C26.146 35.0033 25.8586 34.7855 25.5588 34.7817ZM19.7303 37.1909L26.6857 55.9977C24.176 54.7607 22.1919 52.9416 20.7794 50.7714C18.1956 46.648 17.9237 41.4168 19.7303 37.1909ZM46.9109 46.8468C45.769 50.5757 43.4368 53.6642 40.2081 55.5314C40.3634 55.1169 40.6096 54.4175 40.9463 53.4331L44.9875 41.6983C45.3761 40.5584 45.6481 39.2891 45.8035 37.8903C45.856 37.318 45.8577 36.741 45.7646 36.2194C47.4204 39.7906 47.8901 43.328 46.9109 46.8468Z"
					fill="url(#paint6_linear_61_762)"
				/>
				<path
					d="M32.9806 134C23.4868 133.818 16.0664 126.035 16 116.981C16.1846 107.494 23.9257 100.066 32.9806 100C42.4678 100.19 49.9335 107.913 50 116.981C49.8125 126.475 42.0473 133.934 32.9806 134ZM32.9806 101.205C24.1656 101.378 17.227 108.563 17.1657 116.981C17.3372 125.803 24.5636 132.734 32.9806 132.795C41.8026 132.624 48.7341 125.397 48.7954 116.981C48.629 108.159 41.3854 101.266 32.9806 101.205ZM28.9006 130.891L33.2526 118.379L37.7988 130.619C34.736 131.645 31.8403 131.707 28.9006 130.891ZM25.5588 108.782C23.9657 108.998 22.4162 109.076 20.896 109.015C23.7825 104.888 28.4042 102.566 32.9806 102.526C36.7237 102.597 40.2132 104.011 42.7726 106.334C41.5856 106.246 40.8749 106.767 40.3634 107.655C39.6201 109.948 41.1908 111.646 42.0732 113.367C42.9074 114.94 42.8412 116.728 42.384 118.263L40.208 125.685L34.9623 110.103C35.5089 110.052 36.059 110.036 36.5555 109.947C37.143 109.817 37.2719 109.27 36.8663 108.937C36.7368 108.834 36.5943 108.782 36.4389 108.782L33.2915 109.015H30.9017C30.227 109.055 28.3219 108.403 28.1623 109.287C28.0798 109.627 28.334 109.894 28.6285 109.947C29.1483 110.015 29.7439 110.091 30.2217 110.142L32.5143 116.281L29.328 125.685L24.0434 110.103C24.6026 110.054 25.1692 110.037 25.6754 109.947C26.09 109.895 26.2712 109.688 26.2194 109.326C26.146 109.003 25.8586 108.786 25.5588 108.782ZM19.7303 111.191L26.6857 129.998C24.176 128.761 22.1919 126.942 20.7794 124.771C18.1956 120.648 17.9237 115.417 19.7303 111.191ZM46.9109 120.847C45.769 124.576 43.4368 127.664 40.2081 129.531C40.3634 129.117 40.6096 128.418 40.9463 127.433L44.9875 115.698C45.3761 114.558 45.6481 113.289 45.8035 111.89C45.856 111.318 45.8577 110.741 45.7646 110.219C47.4204 113.791 47.8901 117.328 46.9109 120.847Z"
					fill="url(#paint7_linear_61_762)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_762"
						x1="0"
						y1="43.2353"
						x2="65.8824"
						y2="43.2353"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_762"
						x1="84.7061"
						y1="33.8236"
						x2="160"
						y2="33.8236"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_762"
						x1="84.7061"
						y1="52.6473"
						x2="141.177"
						y2="52.6473"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_762"
						x1="0"
						y1="117.235"
						x2="65.8824"
						y2="117.235"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_762"
						x1="84.7061"
						y1="107.824"
						x2="160"
						y2="107.824"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_61_762"
						x1="84.7061"
						y1="126.647"
						x2="141.177"
						y2="126.647"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint6_linear_61_762"
						x1="16"
						y1="43"
						x2="50"
						y2="43"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint7_linear_61_762"
						x1="16"
						y1="117"
						x2="50"
						y2="117"
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
		var clientId = props.clientId;

		var blockId = attributes.blockId;
		var blockCssY = attributes.blockCssY;

		var object = attributes.object;
		var wrapper = attributes.wrapper;
		var item = attributes.item;
		var thumb = attributes.thumb;
		var elements = attributes.elements;

		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;

		const wrapperSelector = blockClass;
		const itemSelector = blockClass + " .item";
		const thumbSelector = blockClass + " .thumb";

		const CustomTagWrapper =
			wrapper.options.tag == undefined ? "ul" : `${wrapper.options.tag}`;
		const CustomTagItem =
			item.options.tag.length == undefined ? "li" : `${item.options.tag}`;

		var [loading, seloading] = useState(false); // Using the hook.
		var [debounce, setDebounce] = useState(null); // Using the hook.

		var [objectData, seobjectData] = useState(null); // Using the hook.

		var breakPointX = myStore.getBreakPoint();

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();

			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);

		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[itemSelector] = item;
			blockCssObj[thumbSelector] = thumb;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});

		var pluginFields = {
			name: { id: "name", label: "Plugin Name", prefix: "Plugin Name: " },
			version: { id: "version", label: "Version", prefix: "Version:" },
			author: { id: "author", label: "Author", prefix: "Author" },
			author_profile: {
				id: "author_profile",
				label: "Author Profile",
				prefix: "Author Profile",
			},
			contributors: {
				id: "contributors",
				label: "Contributors",
				prefix: "Contributors",
				isLinked: true,
			},
			requires: {
				id: "requires",
				label: "Require WP Version",
				prefix: "WP Version: ",
			},
			tested: {
				id: "tested",
				label: "Tested WP Version",
				prefix: "WP Tested Version: ",
			},
			requires_php: {
				id: "requires_php",
				label: "Require PHP Version",
				prefix: "PHP Version: ",
			},
			requires_plugins: {
				id: "requires_plugins",
				label: "Require Plugins",
				prefix: "Require Plugins: ",
			},
			rating: { id: "rating", label: "Rating", prefix: "Rating", type: "star" },
			ratings: {
				id: "ratings",
				label: "Ratings",
				prefix: "Ratings",
				type: "star",
			},
			num_ratings: {
				id: "num_ratings",
				label: "Num Ratings",
				prefix: "Num Ratings",
				type: "star",
			},
			support_threads: {
				id: "support_threads",
				label: "Support Threads",
				prefix: "Support Threads",
			},
			support_threads_resolved: {
				id: "support_threads_resolved",
				label: "Support Threads Resolved",
				prefix: "Support Threads Resolved",
			},
			active_installs: {
				id: "active_installs",
				label: "Active Install",
				prefix: "Active Install: ",
			},
			last_updated: {
				id: "last_updated",
				label: "Last Update",
				prefix: "Last Update: ",
			},
			added: { id: "added", label: "Creation Time", prefix: "Creation Time: " },
			homepage: {
				id: "homepage",
				label: "Homepage",
				prefix: "Homepage:",
				isLinked: true,
				linkText: "Homepage",
			},
			download_link: {
				id: "download_link",
				label: "Download Link",
				prefix: "Download Link",
				isLinked: true,
				linkText: "Download",
			},
			tags: { id: "tags", label: "Tags", prefix: "Tags:" },

			banners: {
				id: "banners",
				label: "Thumbnail",
				prefix: "Thumbnail",
				size: "high",
				isLinked: false,
			},
		};

		var themeFields = {
			name: { id: "name", label: "Name", prefix: "Theme Name: " },
			version: { id: "version", label: "Version", prefix: "Version:" },
			preview_url: {
				id: "preview_url",
				label: "Preview URL",
				prefix: "Preview URL",
				isLinked: true,
				linkText: "Preview",
			},
			author: { id: "author", label: "Author", prefix: "Author" },
			screenshot_url: { id: "screenshot_url", label: "Screenshot" },
			ratings: { id: "ratings", label: "Ratings", prefix: "Ratings" },

			rating: { id: "rating", label: "Rating", prefix: "Rating", type: "star" },
			num_ratings: { id: "num_ratings", label: "Number of Ratings" },
			reviews_url: {
				id: "reviews_url",
				label: "Reviews URL",
				isLinked: true,
				linkText: "Reviews",
			},
			last_updated: {
				id: "last_updated",
				label: "Last Update",
				prefix: "Last Update: ",
			},
			creation_time: {
				id: "creation_time",
				label: "Creation Time",
				prefix: "Creation Time: ",
			},
			homepage: {
				id: "homepage",
				label: "Homepage",
				prefix: "Homepage:",
				isLinked: true,
				linkText: "Homepage",
			},
			tags: { id: "tags", label: "Tags", prefix: "Tags: " },
			download_link: {
				id: "download_link",
				label: "Download Link",
				prefix: "Download Link",
				isLinked: true,
				linkText: "Download",
			},

			requires: {
				id: "requires",
				label: "Require WP Version",
				prefix: "WP Version: ",
			},
			requires_php: {
				id: "requires_php",
				label: "Require PHP Version",
				prefix: "PHP Version: ",
			},
			is_commercial: {
				id: "is_commercial",
				label: "Is Commercial",
				prefix: "Is Commercial",
			},
			external_support_url: {
				id: "external_support_url",
				label: "External Support URL",
				prefix: "External Support URL",
				isLinked: true,
				linkText: "Support URL",
			},
			external_repository_url: {
				id: "external_repository_url",
				label: "External Sepository URL",
				prefix: "External Sepository URL",
				isLinked: true,
				linkText: "Repository",
			},
		};

		var allFields = { ...pluginFields, ...themeFields };

		var objectTypes = {
			plugin: { label: "Plugins", value: "plugin" },
			theme: { label: "Themes", value: "theme" },
		};

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
				var itemX = attributes.item;
				var thumbX = attributes.thumb;
				var objectX = attributes.object;
				var blockCssYX = attributes.blockCssY;

				var blockCssObj = {};

				if (objectX != undefined) {
					var objectY = { ...objectX, options: object.options };
					setAttributes({ object: objectY });
					blockCssObj[objectSelector] = objectY;
				}

				if (thumbX != undefined) {
					var thumbY = { ...thumbX, options: thumb.options };
					setAttributes({ thumb: thumbY });
					blockCssObj[thumbSelector] = thumbY;
				}

				if (itemX != undefined) {
					var itemY = { ...itemX, options: item.options };
					setAttributes({ item: itemY });
					blockCssObj[itemSelector] = itemY;
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

		var RemoveQueryPram = function ({ title, index }) {
			return (
				<>
					<span className="cursor-move">{title}</span>
				</>
			);
		};

		function setUserField(option, index) {
			//var isExist = elements.items.find(x => x.label === option.label);

			var elementsX = elements.items.push(option);
			setAttributes({ elements: { items: elements.items } });
		}

		useEffect(() => {
			seloading(true);
			var postData = { slug: object.options.slug, type: object.options.type };

			clearTimeout(debounce);
			debounce = setTimeout(() => {
				apiFetch({
					path: "/post-grid/v2/wordpress_org_data",
					method: "POST",
					data: postData,
				}).then((res) => {
					seloading(false);

					if (res.data == undefined) {
					} else {
						//var data = JSON.parse(res.data);

						//console.log('data', data);
						seobjectData(res.data);
					}
				});
			}, 2000);
		}, [object.options.slug]);

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

			var object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ wrapper: object });
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

		function onChangeStyleThumb(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, thumb);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ thumb: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				thumbSelector
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

		function onRemoveStyleThumb(sudoScource, key) {
			var object = myStore.deletePropertyDeep(thumb, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ thumb: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				thumbSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleThumb(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, thumb);

			var object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ thumb: object });
		}

		function onResetThumb(sudoScources) {
			let obj = Object.assign({}, thumb);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						thumbSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ thumb: obj });
		}

		function onBulkAddThumb(sudoScource, cssObj) {
			let obj = Object.assign({}, thumb);
			obj[sudoScource] = cssObj;

			setAttributes({ thumb: obj });

			var selector = myStore.getElementSelector(sudoScource, thumbSelector);
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

		function onChangeStyleItem(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, item);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ item: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemSelector
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

		function onRemoveStyleItem(sudoScource, key) {
			var object = myStore.deletePropertyDeep(item, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ item: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleItem(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, item);

			var object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ item: object });
		}

		function onResetItem(sudoScources) {
			let obj = Object.assign({}, item);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						itemSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ item: obj });
		}

		function onBulkAddItem(sudoScource, cssObj) {
			let obj = Object.assign({}, item);
			obj[sudoScource] = cssObj;

			setAttributes({ item: obj });

			var selector = myStore.getElementSelector(sudoScource, itemSelector);
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

		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div className="">
							<div className="px-3">
								<PanelRow>
									<label for="" className="font-medium text-slate-900 ">
										Object Type
									</label>
									<PGDropdown
										position="bottom right"
										variant="secondary"
										options={objectTypes}
										buttonTitle={
											objectTypes[object.options.type] == undefined
												? "Choose"
												: objectTypes[object.options.type].label
										}
										onChange={(option) => {
											var options = { ...object.options, type: option.value };
											setAttributes({
												object: { styles: object.styles, options: options },
											});
										}}
										values=""></PGDropdown>
								</PanelRow>

								<PanelRow>
									<label for="" className="font-medium text-slate-900 ">
										Slug
									</label>

									<InputControl
										value={object.options.slug}
										onChange={(newVal) => {
											var options = { ...object.options, slug: newVal };
											setAttributes({
												object: { ...object, options: options },
											});
										}}
									/>
								</PanelRow>

								<div className="my-3">
									{object.options.type == "plugin" && (
										<>
											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Add Fields
												</label>
												<PGDropdown
													position="bottom right"
													variant="secondary"
													options={pluginFields}
													buttonTitle="Choose"
													onChange={setUserField}
													values=""></PGDropdown>
											</PanelRow>
										</>
									)}

									{object.options.type == "theme" && (
										<>
											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Add Fields
												</label>
												<PGDropdown
													position="bottom right"
													variant="secondary"
													options={themeFields}
													buttonTitle="Choose"
													onChange={setUserField}
													values=""></PGDropdown>
											</PanelRow>
										</>
									)}
								</div>
							</div>

							<ReactSortable
								list={elements.items}
								setList={(item) => {
									setAttributes({ elements: { items: item } });
								}}>
								{elements.items.map((item, index) => (
									<div key={item.id} className="">
										<PanelBody
											title={
												<RemoveQueryPram
													title={
														allFields[item.id] == undefined
															? ""
															: allFields[item.id].label
													}
													index={index}
												/>
											}
											initialOpen={false}>
											<Button
												onClick={(ev) => {
													ev.preventDefault();
													ev.stopPropagation();
													var elementsX = elements.items.splice(index, 1);
													setAttributes({
														elements: { items: elements.items },
													});
												}}>
												<Icon icon={close} />
											</Button>

											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													Prefix
												</label>
												<InputControl
													value={item.prefix}
													onChange={(newVal) => {
														elements.items[index].prefix = newVal;
														setAttributes({
															elements: { items: elements.items },
														});
													}}
												/>
											</PanelRow>

											{(item.id == "homepage" ||
												item.id == "download_link" ||
												item.id == "preview_url" ||
												item.id == "contributors") && (
												<>
													<PanelRow>
														<label
															for=""
															className="font-medium text-slate-900 ">
															linkText
														</label>
														<InputControl
															value={item.linkText}
															onChange={(newVal) => {
																elements.items[index].linkText = newVal;
																setAttributes({
																	elements: { items: elements.items },
																});
															}}
														/>
													</PanelRow>

													<ToggleControl
														className="my-3"
														label="Is Linked?"
														help={
															elements.items[index].isLinked
																? "Link Enabled"
																: "Link Disabled"
														}
														checked={
															elements.items[index].isLinked ? true : false
														}
														onChange={(e) => {
															elements.items[index].isLinked = elements.items[
																index
															].isLinked
																? false
																: true;
															setAttributes({
																elements: { items: elements.items },
															});
														}}
													/>
												</>
											)}
										</PanelBody>
									</div>
								))}
							</ReactSortable>
						</div>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Wrapper"
							initialOpen={false}>
							<PGtabs
								activeTab="styles"
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
												{ label: "ul", value: "ul" },
												{ label: "ol", value: "ol" },
											]}
											onChange={(newVal) => {
												var options = { ...wrapper.options, tag: newVal };
												setAttributes({
													wrapper: { styles: wrapper.styles, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										blockId={blockId}
										obj={wrapper}
										onChange={onChangeStyleWrapper}
										onAdd={onAddStyleWrapper}
										onRemove={onRemoveStyleWrapper}
										onBulkAdd={onBulkAddWrapper}
										onReset={onResetWrapper}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Thumb"
							initialOpen={false}>
							<PGtabs
								activeTab="styles"
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
								<PGtab name="options"></PGtab>
								<PGtab name="styles">
									<PGStyles
										blockId={blockId}
										obj={thumb}
										onChange={onChangeStyleThumb}
										onAdd={onAddStyleThumb}
										onRemove={onRemoveStyleThumb}
										onBulkAdd={onBulkAddThumb}
										onReset={onResetThumb}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="item"
							initialOpen={false}>
							<PGtabs
								activeTab="styles"
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
											item Tag
										</label>
										<SelectControl
											label=""
											value={item.options.tag}
											options={[
												{ label: "No item", value: "" },
												{ label: "H1", value: "h1" },
												{ label: "H2", value: "h2" },
												{ label: "H3", value: "h3" },
												{ label: "H4", value: "h4" },
												{ label: "H5", value: "h5" },
												{ label: "H6", value: "h6" },
												{ label: "SPAN", value: "span" },
												{ label: "DIV", value: "div" },
												{ label: "P", value: "p" },
												{ label: "ul", value: "ul" },
												{ label: "li", value: "li" },
											]}
											onChange={(newVal) => {
												var options = { ...item.options, tag: newVal };
												setAttributes({
													item: { styles: item.styles, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										blockId={blockId}
										obj={item}
										onChange={onChangeStyleItem}
										onAdd={onAddStyleItem}
										onRemove={onRemoveStyleItem}
										onBulkAdd={onBulkAddItem}
										onReset={onResetItem}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>
						<PanelBody
							className="font-medium text-slate-900 "
							title="Block Variations"
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={"wordpress-org"}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
							/>
						</PanelBody>
						<div className="px-3">
							<PGTutorials slug="wordpress-org" />
						</div>
					</div>
				</InspectorControls>

				{loading && (
					<div {...blockProps}>
						<Spinner />
					</div>
				)}

				{loading == false &&
					objectData != null &&
					object.options.type == "plugin" && (
						<CustomTagWrapper {...blockProps}>
							{elements.items.map((x) => {
								return (
									<>
										{x.id == "name" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.name}</span>{" "}
											</CustomTagItem>
										)}

										{x.id == "version" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.version}</span>{" "}
											</CustomTagItem>
										)}

										{x.id == "author" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.author}</span>{" "}
											</CustomTagItem>
										)}

										{x.id == "author_profile" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.author_profile}</span>{" "}
											</CustomTagItem>
										)}

										{x.id == "contributors" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>
													<ul>
														{objectData.contributors != null &&
															Object.entries(objectData.contributors).map(
																(x, i) => {
																	var data = x[1];

																	return (
																		<li>
																			<a href={data.profile}>
																				{data.display_name}
																			</a>
																		</li>
																	);
																}
															)}
													</ul>
												</span>
											</CustomTagItem>
										)}

										{x.id == "tested" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.tested}</span>{" "}
											</CustomTagItem>
										)}

										{x.id == "requires" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.requires}</span>{" "}
											</CustomTagItem>
										)}
										{x.id == "requires_php" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.requires_php}</span>{" "}
											</CustomTagItem>
										)}

										{x.id == "requires_plugins" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.requires_plugins}</span>{" "}
											</CustomTagItem>
										)}

										{x.id == "rating" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.rating}</span>{" "}
											</CustomTagItem>
										)}

										{x.id == "ratings" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>
													{Object.entries(objectData.ratings).map((x, i) => {
														return (
															<li>
																{x[0]}: {x[1]}
															</li>
														);
													})}
												</span>
											</CustomTagItem>
										)}

										{x.id == "num_ratings" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.num_ratings}</span>{" "}
											</CustomTagItem>
										)}
										{x.id == "support_threads" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.support_threads}</span>{" "}
											</CustomTagItem>
										)}

										{x.id == "support_threads_resolved" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.support_threads_resolved}</span>{" "}
											</CustomTagItem>
										)}
										{x.id == "active_installs" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.active_installs}</span>{" "}
											</CustomTagItem>
										)}
										{x.id == "last_updated" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.last_updated}</span>{" "}
											</CustomTagItem>
										)}
										{x.id == "added" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>{objectData.added}</span>{" "}
											</CustomTagItem>
										)}

										{x.id == "homepage" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>
													{x.isLinked && (
														<a href={objectData.homepage}>{x.linkText}</a>
													)}
													{!x.isLinked && <>{objectData.homepage}</>}
												</span>
											</CustomTagItem>
										)}
										{x.id == "download_link" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>
													{x.isLinked && (
														<a href={objectData.download_link}>{x.linkText}</a>
													)}

													{!x.isLinked && <>{objectData.download_link}</>}
												</span>
											</CustomTagItem>
										)}

										{x.id == "banners" && (
											<CustomTagItem className={thumb.options.class}>
												<img
													src={
														objectData.banners == undefined
															? ""
															: objectData.banners.high
													}
													alt={objectData.name}
												/>
											</CustomTagItem>
										)}

										{x.id == "tags" && (
											<CustomTagItem className={item.options.class}>
												<span>{x.prefix}</span>
												<span>
													{Object.entries(objectData.tags).map((x, i) => {
														return <li> {x[1]}</li>;
													})}
												</span>
											</CustomTagItem>
										)}
									</>
								);
							})}
						</CustomTagWrapper>
					)}

				{loading == false &&
					objectData != null &&
					object.options.type == "theme" && (
						<CustomTagWrapper {...blockProps}>
							{elements.items.map((x) => {
								return (
									<>
										{x.id == "name" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix} {objectData.name}
											</CustomTagItem>
										)}
										{x.id == "version" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix} {objectData.version}
											</CustomTagItem>
										)}

										{x.id == "is_commercial" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix}
												{objectData.is_commercial && "Yes"}
												{!objectData.is_commercial && "No"}
											</CustomTagItem>
										)}

										{x.id == "preview_url" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix}
												{x.isLinked && (
													<a href={objectData.preview_url}>{x.linkText}</a>
												)}
												{!x.isLinked && <>{objectData.preview_url}</>}
											</CustomTagItem>
										)}

										{x.id == "author" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix} {objectData.author}
											</CustomTagItem>
										)}

										{x.id == "screenshot_url" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix}
												{x.isLinked && (
													<a href={objectData.screenshot_url}>
														<img
															src={
																objectData.screenshot_url == undefined
																	? ""
																	: objectData.screenshot_url
															}
															alt={objectData.name}
														/>
													</a>
												)}
												{!x.isLinked && (
													<img
														src={
															objectData.screenshot_url == undefined
																? ""
																: objectData.screenshot_url
														}
														alt={objectData.name}
													/>
												)}
											</CustomTagItem>
										)}

										{x.id == "ratings" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix}{" "}
												{Object.entries(objectData.ratings).map((x, i) => {
													return (
														<li>
															{i + 1} : {x}
														</li>
													);
												})}
											</CustomTagItem>
										)}
										{x.id == "rating" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix} {objectData.rating}
											</CustomTagItem>
										)}

										{x.id == "num_ratings" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix} {objectData.num_ratings}
											</CustomTagItem>
										)}

										{x.id == "reviews_url" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix}
												{x.isLinked && (
													<a href={objectData.reviews_url}>{x.linkText}</a>
												)}
												{!x.isLinked && <>{objectData.reviews_url}</>}
											</CustomTagItem>
										)}

										{x.id == "last_updated" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix} {objectData.last_updated}
											</CustomTagItem>
										)}

										{x.id == "creation_time" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix} {objectData.creation_time}
											</CustomTagItem>
										)}

										{x.id == "homepage" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix}
												{x.isLinked && (
													<a href={objectData.homepage}>{x.linkText}</a>
												)}
												{!x.isLinked && <>{objectData.homepage}</>}
											</CustomTagItem>
										)}

										{x.id == "tags" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix}{" "}
												{Object.entries(objectData.tags).map((x, i) => {
													return <li> {x[1]}</li>;
												})}
											</CustomTagItem>
										)}

										{x.id == "download_link" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix}
												{x.isLinked && (
													<a href={objectData.download_link}>{x.linkText}</a>
												)}
												{!x.isLinked && <>{objectData.download_link}</>}
											</CustomTagItem>
										)}

										{x.id == "requires" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix} {objectData.requires}
											</CustomTagItem>
										)}
										{x.id == "requires_php" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix} {objectData.requires_php}
											</CustomTagItem>
										)}

										{x.id == "is_commercial" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix} {objectData.is_commercial}
											</CustomTagItem>
										)}

										{x.id == "external_support_url" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix}
												{x.isLinked && (
													<a href={objectData.external_support_url}>
														{x.linkText}
													</a>
												)}
												{!x.isLinked && <>{objectData.external_support_url}</>}
											</CustomTagItem>
										)}

										{x.id == "external_repository_url" && (
											<CustomTagItem className={item.options.class}>
												{x.prefix}
												{x.isLinked && (
													<a href={objectData.external_repository_url}>
														{x.linkText}
													</a>
												)}
												{!x.isLinked && (
													<>{objectData.external_repository_url}</>
												)}
											</CustomTagItem>
										)}
									</>
								);
							})}
						</CustomTagWrapper>
					)}
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
