import { registerBlockType, createBlock } from "@wordpress/blocks";
import apiFetch from "@wordpress/api-fetch";
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from "@wordpress/block-editor";
import { ReactSortable } from "react-sortablejs";

import { createBlocksFromInnerBlocksTemplate } from "@wordpress/blocks";

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
	DateTimePicker,
} from "@wordpress/components";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import {
	Icon,
	styles,
	settings,
	link,
	linkOff,
	close,
	menu,
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

import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";

import PGDropdown from "../../components/dropdown";
import PGIconPicker from "../../components/icon-picker";
import PGcssDisplay from "../../components/css-display";
import PGLibraryBlockVariations from "../../components/library-block-variations";
import PGBlockVariationsPicker from "../../components/block-variations-picker";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import PGCssLibrary from "../../components/css-library";
import variations from "./variations";
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
					d="M36.6894 56.4907H3.24769C1.4508 56.4907 -0.00585938 57.9474 -0.00585938 59.7443V101.179C-0.00585938 102.976 1.4508 104.432 3.24769 104.432H36.6894C38.4862 104.432 39.9429 102.976 39.9429 101.179V59.7443C39.9429 57.9474 38.4862 56.4907 36.6894 56.4907Z"
					fill="url(#paint0_linear_61_611)"
				/>
				<path
					d="M9.34427 96.5078V91.6577L20.7895 81.1646C21.7629 80.2319 22.5793 79.3925 23.2387 78.6463C23.9085 77.9001 24.4162 77.1695 24.7616 76.4544C25.107 75.729 25.2797 74.9465 25.2797 74.1071C25.2797 73.1744 25.0651 72.3712 24.636 71.6976C24.2068 71.0136 23.6207 70.4902 22.8776 70.1275C22.1344 69.7544 21.2919 69.5679 20.3499 69.5679C19.366 69.5679 18.5078 69.7648 17.7751 70.1586C17.0424 70.5524 16.4773 71.1172 16.0795 71.853C15.6818 72.5888 15.4829 73.4646 15.4829 74.4802H9.03027C9.03027 72.3971 9.5065 70.5887 10.459 69.0549C11.4114 67.5211 12.7459 66.3345 14.4624 65.495C16.179 64.6556 18.1571 64.2358 20.397 64.2358C22.6996 64.2358 24.704 64.64 26.41 65.4484C28.1266 66.2464 29.4611 67.3553 30.4135 68.7751C31.366 70.1949 31.8422 71.8219 31.8422 73.6563C31.8422 74.8584 31.6015 76.0451 31.12 77.2161C30.649 78.3872 29.8065 79.6878 28.5923 81.118C27.3782 82.5378 25.6669 84.2426 23.4585 86.2324L18.7642 90.7872V91.0048H32.2661V96.5078H9.34427Z"
					fill="white"
				/>
				<path
					d="M85.7426 56.4907H52.3009C50.504 56.4907 49.0474 57.9474 49.0474 59.7443V101.179C49.0474 102.976 50.504 104.432 52.3009 104.432H85.7426C87.5395 104.432 88.9961 102.976 88.9961 101.179V59.7443C88.9961 57.9474 87.5395 56.4907 85.7426 56.4907Z"
					fill="url(#paint1_linear_61_611)"
				/>
				<path
					d="M68.312 96.5078C66.115 96.5078 64.1562 96.1037 62.4359 95.2953C60.7259 94.4869 59.3683 93.3729 58.363 91.9531C57.3578 90.5333 56.8344 88.9062 56.793 87.0718H63.322C63.3945 88.3051 63.9127 89.3052 64.8765 90.0721C65.8403 90.839 66.9855 91.2224 68.312 91.2224C69.3691 91.2224 70.3018 90.9893 71.1102 90.5229C71.9289 90.0462 72.5662 89.3881 73.0222 88.5487C73.4886 87.6988 73.7218 86.7247 73.7218 85.6261C73.7218 84.5069 73.4834 83.5223 73.0067 82.6725C72.5403 81.8227 71.8926 81.1595 71.0635 80.6827C70.2345 80.206 69.2862 79.9625 68.2187 79.9521C67.286 79.9521 66.3792 80.1438 65.4983 80.5273C64.6278 80.9107 63.949 81.4341 63.4619 82.0974L57.477 81.0247L58.9849 64.2358H78.4475V69.7389H64.5345L63.7106 77.7136H63.8972C64.4568 76.926 65.3014 76.2731 66.431 75.7549C67.5607 75.2367 68.825 74.9776 70.2241 74.9776C72.1413 74.9776 73.8513 75.4284 75.354 76.3301C76.8567 77.2317 78.0434 78.4701 78.9139 80.0454C79.7844 81.6103 80.2145 83.4135 80.2042 85.4551C80.2145 87.6004 79.7171 89.5073 78.7118 91.1758C77.7169 92.834 76.323 94.1398 74.5301 95.0932C72.7476 96.0363 70.6749 96.5078 68.312 96.5078Z"
					fill="white"
				/>
				<path
					d="M156.741 56.4907H123.299C121.502 56.4907 120.045 57.9474 120.045 59.7443V101.179C120.045 102.976 121.502 104.432 123.299 104.432H156.741C158.538 104.432 159.994 102.976 159.994 101.179V59.7443C159.994 57.9474 158.538 56.4907 156.741 56.4907Z"
					fill="url(#paint2_linear_61_611)"
				/>
				<path
					d="M139.31 96.5078C137.113 96.5078 135.154 96.1037 133.434 95.2953C131.724 94.4869 130.366 93.3729 129.361 91.9531C128.356 90.5333 127.832 88.9062 127.791 87.0718H134.32C134.393 88.3051 134.911 89.3052 135.875 90.0721C136.838 90.839 137.984 91.2224 139.31 91.2224C140.367 91.2224 141.3 90.9893 142.108 90.5229C142.927 90.0462 143.564 89.3881 144.02 88.5487C144.487 87.6988 144.72 86.7247 144.72 85.6261C144.72 84.5069 144.481 83.5223 144.005 82.6725C143.538 81.8227 142.891 81.1595 142.062 80.6827C141.232 80.206 140.284 79.9625 139.217 79.9521C138.284 79.9521 137.377 80.1438 136.496 80.5273C135.626 80.9107 134.947 81.4341 134.46 82.0974L128.475 81.0247L129.983 64.2358H149.446V69.7389H135.533L134.709 77.7136H134.895C135.455 76.926 136.299 76.2731 137.429 75.7549C138.559 75.2367 139.823 74.9776 141.222 74.9776C143.139 74.9776 144.849 75.4284 146.352 76.3301C147.855 77.2317 149.041 78.4701 149.912 80.0454C150.782 81.6103 151.213 83.4135 151.202 85.4551C151.213 87.6004 150.715 89.5073 149.71 91.1758C148.715 92.834 147.321 94.1398 145.528 95.0932C143.746 96.0363 141.673 96.5078 139.31 96.5078Z"
					fill="white"
				/>
				<path
					d="M139.324 41C139.777 41 140.229 41 140.681 41.4176L150.632 50.606C151.084 51.0236 151.084 51.859 150.632 52.2766C149.727 52.6943 148.822 52.6943 148.37 52.2766L139.777 44.3412L130.731 52.2766C130.279 52.6943 128.922 52.6943 128.469 52.2766C127.565 51.859 127.565 51.0236 128.469 50.606L138.42 41.4176C138.42 41 138.872 41 139.324 41Z"
					fill="url(#paint3_linear_61_611)"
				/>
				<path
					d="M139.324 119.716C139.777 119.716 140.229 119.716 140.681 119.299L150.632 110.11C151.084 109.693 151.084 108.857 150.632 108.44C149.727 108.022 148.822 108.022 148.37 108.44L139.777 116.375L130.731 108.44C130.279 108.022 128.922 108.022 128.469 108.44C127.565 108.857 127.565 109.693 128.469 110.11L138.42 119.299C138.42 119.716 138.872 119.716 139.324 119.716Z"
					fill="url(#paint4_linear_61_611)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_611"
						x1="-0.00585938"
						y1="80.4614"
						x2="39.9429"
						y2="80.4614"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_611"
						x1="49.0474"
						y1="80.4614"
						x2="88.9961"
						y2="80.4614"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_611"
						x1="120.045"
						y1="80.4614"
						x2="159.994"
						y2="80.4614"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_611"
						x1="139.381"
						y1="52.5898"
						x2="139.381"
						y2="41"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_611"
						x1="139.381"
						y1="108.126"
						x2="139.381"
						y2="119.716"
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

		var postId = context["postId"];

		var postType = context["postType"];

		var inner = attributes.inner;
		var editMode = attributes.editMode;
		let items = attributes.items;
		let dayWrap = attributes.dayWrap;
		let day = attributes.day;
		let hourWrap = attributes.hourWrap;
		let hour = attributes.hour;
		let minuteWrap = attributes.minuteWrap;
		let minute = attributes.minute;
		let secondWrap = attributes.secondWrap;
		let second = attributes.second;
		var countdownWrapper = attributes.countdownWrapper;
		var expiredArg = attributes.expiredArg;
		var dateCountdown = attributes.dateCountdown;
		var scheduleTime = attributes.scheduleTime;
		var wrapper = attributes.wrapper;
		var blockId = attributes.blockId;

		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var icon = attributes.icon;

		var separator = attributes.separator;
		var label = attributes.label;
		var count = attributes.count;
		var prefix = attributes.prefix;
		var postfix = attributes.postfix;

		var blockCssY = attributes.blockCssY;

		var breakPointX = myStore.getBreakPoint();

		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		const countdownWrapperSelector = blockClass + " .countdown-wrapper";
		const labelSelector = blockClass + " .label";
		const countSelector = blockClass + " .count";
		const prefixSelector = blockClass + " .prefix";
		const postfixSelector = blockClass + " .postfix";
		const iconSelector = blockClass + " .date-countdown-icon";
		var innerSelector = blockClass + " .inner";

		// day hours minutes seconds
		var separatorSelector = blockClass + " .separator";
		var itemsSelector = blockClass + " .items";
		var secondWrapSelector = blockClass + " .second-wrapper";
		var secondSelector = blockClass + " .second-countdown";
		var minuteWrapSelector = blockClass + " .minute-wrapper";
		var minuteSelector = blockClass + " .minute-countdown";
		var hourWrapSelector = blockClass + " .hour-wrapper";
		var hourSelector = blockClass + " .hour-countdown";
		var dayWrapSelector = blockClass + " .day-wrapper";
		var daySelector = blockClass + " .day-countdown";

		const innerEnable =
			inner.options.enable == undefined ? true : inner.options.enable;
		const secondEnable =
			second.options.enable == undefined ? true : second.options.enable;
		const minuteEnable =
			minute.options.enable == undefined ? true : minute.options.enable;
		const hourEnable =
			hour.options.enable == undefined ? true : hour.options.enable;
		const dayEnable =
			day.options.enable == undefined ? true : day.options.enable;
		const iconEnable =
			icon.options.enable == undefined ? true : icon.options.enable;
		const separatorEnable =
			separator.options.enable == undefined ? true : separator.options.enable;
		const labelEnable =
			label.options.enable == undefined ? true : label.options.enable;
		const prefixEnable =
			prefix.options.enable == undefined ? true : prefix.options.enable;
		const postfixEnable =
			postfix.options.enable == undefined ? true : postfix.options.enable;

		const { replaceInnerBlocks } = useDispatch(blockEditorStore);

		var scheduleTimeSet = [
			{
				id: "startTime",
				value: "",
			},
			{
				id: "endTime",
				value: "",
			},
		];

		function onPickBlockVariation(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;

			var blocks = content.length > 0 ? parse(content) : "";

			const attributes = blocks[0].attrs;

			wp.data
				.dispatch("core/block-editor")
				.replaceBlock(clientId, wp.blocks.parse(content));
		}

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
				var dateCountdownX = attributes.dateCountdown;
				var scheduleTimeX = attributes.scheduleTime;
				var countdownWrapperX = attributes.countdownWrapper;
				var innerX = attributes.inner;
				var itemsX = attributes.items;
				var secondWrapX = attributes.secondWrap;
				var secondX = attributes.second;
				var minuteWrapX = attributes.minuteWrap;
				var minuteX = attributes.minute;
				var hourWrapX = attributes.hourWrap;
				var hourX = attributes.hour;
				var dayWrapX = attributes.dayWrap;
				var dayX = attributes.day;
				var iconX = attributes.icon;
				var separatorX = attributes.separator;
				var labelX = attributes.label;
				var countX = attributes.count;
				var prefixX = attributes.prefix;
				var postfixX = attributes.postfix;
				var blockCssYX = attributes.blockCssY;

				var blockCssObj = {};

				// if (dateCountdownX != undefined) {
				// 	var dateCountdownY = {
				// 		...dateCountdownX,
				// 		options: dateCountdown.options,
				// 	};
				// 	setAttributes({ dateCountdown: dateCountdownY });
				// 	blockCssObj[dateCountdownSelector] = dateCountdownY;
				// }

				// if (scheduleTimeX != undefined) {
				// 	var scheduleTimeY = {
				// 		...scheduleTimeX,
				// 		options: scheduleTime.options,
				// 	};
				// 	setAttributes({ scheduleTime: scheduleTimeY });
				// 	blockCssObj[scheduleTimeSelector] = scheduleTimeY;
				// }

				if (countdownWrapperX != undefined) {
					var countdownWrapperY = {
						...countdownWrapperX,
						options: countdownWrapper.options,
					};
					setAttributes({ countdownWrapper: countdownWrapperY });
					blockCssObj[countdownWrapperSelector] = countdownWrapperY;
				}

				if (innerX != undefined) {
					var innerY = { ...innerX, options: inner.options };
					setAttributes({ inner: innerY });
					blockCssObj[innerSelector] = innerY;
				}

				// if (itemsX != undefined) {
				// 	var itemsY = { ...itemsX, options: items.options };
				// 	setAttributes({ items: itemsY });
				// 	blockCssObj[itemsSelector] = itemsY;
				// }

				if (secondWrapX != undefined) {
					var secondWrapY = { ...secondWrapX, options: secondWrap.options };
					setAttributes({ secondWrap: secondWrapY });
					blockCssObj[secondWrapSelector] = secondWrapY;
				}

				if (secondX != undefined) {
					var secondY = { ...secondX, options: second.options };
					setAttributes({ second: secondY });
					blockCssObj[secondSelector] = secondY;
				}

				if (minuteWrapX != undefined) {
					var minuteWrapY = { ...minuteWrapX, options: minuteWrap.options };
					setAttributes({ minuteWrap: minuteWrapY });
					blockCssObj[minuteWrapSelector] = minuteWrapY;
				}

				if (minuteX != undefined) {
					var minuteY = { ...minuteX, options: minute.options };
					setAttributes({ minute: minuteY });
					blockCssObj[minuteSelector] = minuteY;
				}

				if (hourWrapX != undefined) {
					var hourWrapY = { ...hourWrapX, options: hourWrap.options };
					setAttributes({ hourWrap: hourWrapY });
					blockCssObj[hourWrapSelector] = hourWrapY;
				}

				if (hourX != undefined) {
					var hourY = { ...hourX, options: hour.options };
					setAttributes({ hour: hourY });
					blockCssObj[hourSelector] = hourY;
				}

				if (dayWrapX != undefined) {
					var dayWrapY = { ...dayWrapX, options: dayWrap.options };
					setAttributes({ dayWrap: dayWrapY });
					blockCssObj[dayWrapSelector] = dayWrapY;
				}

				if (dayX != undefined) {
					var dayY = { ...dayX, options: day.options };
					setAttributes({ day: dayY });
					blockCssObj[daySelector] = dayY;
				}

				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[iconSelector] = iconY;
				}

				if (separatorX != undefined) {
					var separatorY = { ...separatorX, options: separator.options };
					setAttributes({ separator: separatorY });
					blockCssObj[separatorSelector] = separatorY;
				}

				if (labelX != undefined) {
					var labelY = { ...labelX, options: label.options };
					setAttributes({ label: labelY });
					blockCssObj[labelSelector] = labelY;
				}
				if (countX != undefined) {
					var countY = { ...countX, options: count.options };
					setAttributes({ count: countY });
					blockCssObj[countSelector] = countY;
				}

				if (wrapperX != undefined) {
					var wrapperY = { ...wrapperX, options: wrapper.options };
					setAttributes({ wrapper: wrapperY });
					blockCssObj[wrapperSelector] = wrapperY;
				}

				if (prefixX != undefined) {
					var prefixY = { ...prefixX, options: prefix.options };

					setAttributes({ prefix: prefixY });
					blockCssObj[prefixSelector] = prefixY;
				}
				if (postfixX != undefined) {
					var postfixY = { ...postfixX, options: postfix.options };

					setAttributes({ postfix: postfixY });
					blockCssObj[postfixSelector] = postfixY;
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

		function addScheduleTime(option, index) {
			var scheduleTimeX = dateCountdown.scheduleTime.push(option);
			setAttributes({
				dateCountdown: {
					...dateCountdown,
					scheduleTime: dateCountdown.scheduleTime,
				},
			});
		}

		var scheduleArgsBasic = {
			startTime: {
				label: "Start Time",
				description: "Visible as soon as possible",
				args: { id: "startTime", value: "" },
			},
			EndTime: {
				label: "End Time",
				description: "Visible as soon as possible",
				args: { id: "EndTime", value: "" },
			},
		};
		let scheduleArgs = applyFilters("scheduleArgs", scheduleArgsBasic);
		var expiredArgsBasic = {
			redirectURL: {
				label: "Redirect URL",
				description: "Visible as soon as possible",
				args: { id: "redirectURL", value: "", delay: "" },
			},
			wcHideCartButton: {
				label: "Hide Cart Button",
				description: "Visible as soon as possible",
				args: { id: "wcHideCartButton" },
			},
			showExpiredMsg: {
				label: "Show Expired Message",
				description: "Visible as soon as possible",
				args: { id: "showExpiredMsg" },
			},
			hideCountdown: {
				label: "Hide Countdown",
				description: "Visible as soon as possible",
				args: { id: "hideCountdown" },
			},
			showElement: {
				label: "Show Element",
				description: "Visible as soon as possible",
				args: { id: "showElement", value: "" },
			},
			showPopup: {
				label: "Show Popup",
				description: "Visible as soon as possible",
				args: { id: "showPopup" },
			},
		};

		let expiredArgs = applyFilters("expiredArgs", expiredArgsBasic);

		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);

		var visibleArgsBasic = {
			weekDays: {
				label: "is Week day",
				description: "Show when specific week days",
				args: { id: "weekDays", value: "", values: [], compare: "=" },
				isPro: true,
			},
		};
		let visibleArgs = applyFilters("pgFormvisibleArgs", visibleArgsBasic);

		var typeArgsBasic = {
			fixed: { label: "Fixed", value: "fixed" },
			everGreen: { label: "Ever Green", value: "everGreen", isPro: true },
			scheduled: { label: "Scheduled", value: "scheduled", isPro: true },
		};

		let typeArgs = applyFilters("pgDateCountdownTypes", typeArgsBasic);

		function setType(option, index) {
			var options = { ...dateCountdown.options, type: option.value };
			setAttributes({ dateCountdown: { ...dateCountdown, options: options } });
		}

		var weekDayNumn = {
			0: { label: "Sunday", value: 0 },
			1: { label: "Monday", value: 1 },
			2: { label: "Tuesday", value: 2 },
			3: { label: "Wednesday", value: 3 },
			4: { label: "Thursday", value: 4 },
			5: { label: "Friday", value: 5 },
			6: { label: "Saturday", value: 6 },
		};

		const [productData, setProductData] = useState(null);

		useEffect(() => {
			apiFetch({
				path: "/post-grid/v2/get_post_data",
				method: "POST",
				data: { postId: postId },
			}).then((res) => {
				setProductData(res);
			});
		}, []);

		const [remindTime, setRemindTime] = useState(0);
		const [remindDay, setRemindDay] = useState(0);
		const [remindHour, setRemindHour] = useState(0);
		const [remindMinute, setRemindMinute] = useState(0);
		const [remindSecond, setRemindSecond] = useState(0);

		useEffect(() => {
			const dateInput1 = dateCountdown.options.startDate;
			const dateInput2 = dateCountdown.options.endDate;
			const currentDate = new Date();

			if (dateInput1.length == 0 || dateInput2.length == 0) {
				return;
			}
			var date1 = "";
			var date2 = "";
			var startDate = "";
			if (dateCountdown.options.startDateSrc?.length == 0) {
				date1 = new Date(dateInput1);
			} else {
				date1 =
					productData?.date_on_sale_from != null
						? new Date(productData.date_on_sale_from.date)
						: new Date(dateInput1);
			}

			if (dateCountdown.options.endDateSrc.length == 0) {
				date2 = new Date(dateInput2);
			} else {
				date2 =
					productData?.date_on_sale_to != null
						? new Date(productData.date_on_sale_to.date)
						: new Date(dateInput2);
			}

			if (currentDate > date1) {
				startDate = currentDate;
			} else if (currentDate < date1) {
				startDate = currentDate;
			} else {
				startDate = date1;
			}

			const timeDifference = date2 - startDate;
			setRemindTime(timeDifference);

			if (currentDate < date1) {
				setRemindTime(0);
			}
		}, [
			clientId,
			dateCountdown.options.startDate,
			dateCountdown.options.startDateSrc,
			dateCountdown.options.endDateSrc,
			dateCountdown.options.endDate,
		]);

		useEffect(() => {
			if (remindTime > 0) {
				const intervalId = setInterval(() => {
					const remindTimeX = remindTime - 1000;
					setRemindTime(remindTimeX);
					const days = Math.floor(remindTimeX / (1000 * 60 * 60 * 24));
					const hours = Math.floor(
						(remindTimeX % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
					);
					const minutes = Math.floor(
						(remindTimeX % (1000 * 60 * 60)) / (1000 * 60)
					);
					const seconds = Math.floor((remindTimeX % (1000 * 60)) / 1000);
					const formattedDays = String(days).padStart(2, "0");
					const formattedHours = String(hours).padStart(2, "0");
					const formattedMinutes = String(minutes).padStart(2, "0");
					const formattedSeconds = String(seconds).padStart(2, "0");

					setRemindDay(formattedDays);
					setRemindHour(formattedHours);
					setRemindMinute(formattedMinutes);
					setRemindSecond(formattedSeconds);
					if (remindTimeX <= 0) {
						clearInterval(intervalId);
					}
				}, 1000);

				return () => clearInterval(intervalId);
			}
		}, [
			remindTime,
			dateCountdown.options.startDate,
			dateCountdown.options.endDate,
		]);

		// day hours minutes seconds

		// Ever Green Start
		const [remindTimes, setRemindTimes] = useState(0);
		const [remindDays, setRemindDays] = useState(0);
		const [remindHours, setRemindHours] = useState(0);
		const [remindMinutes, setRemindMinutes] = useState(0);
		const [remindSeconds, setRemindSeconds] = useState(0);

		useEffect(() => {
			const days = dateCountdown.options.everGreenTime.day;
			const hours = dateCountdown.options.everGreenTime.hour;
			const minutes = dateCountdown.options.everGreenTime.minute;

			const currentTime = new Date().getTime();
			const endTime =
				currentTime +
				days * 24 * 60 * 60 * 1000 +
				hours * 60 * 60 * 1000 +
				minutes * 60 * 1000;

			const duration = endTime - currentTime;
			setRemindTimes(duration);
		}, [dateCountdown.options.everGreenTime]);

		useEffect(() => {
			if (remindTimes > 0) {
				const intervalId = setInterval(() => {
					const remindTimesX = remindTimes - 1000;
					setRemindTimes(remindTimesX);
					const days = Math.floor(remindTimesX / (1000 * 60 * 60 * 24));
					const hours = Math.floor(
						(remindTimesX % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
					);
					const minutes = Math.floor(
						(remindTimesX % (1000 * 60 * 60)) / (1000 * 60)
					);
					const seconds = Math.floor((remindTimesX % (1000 * 60)) / 1000);
					const formattedDays = String(days).padStart(2, "0");
					const formattedHours = String(hours).padStart(2, "0");
					const formattedMinutes = String(minutes).padStart(2, "0");
					const formattedSeconds = String(seconds).padStart(2, "0");

					setRemindDays(formattedDays);
					setRemindHours(formattedHours);
					setRemindMinutes(formattedMinutes);
					setRemindSeconds(formattedSeconds);
				}, 1000);

				return () => clearInterval(intervalId);
			}
		}, [remindTimes]);

		// Ever Green End

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
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				wrapper[sudoSource] = sudoSourceArgs;
			});

			var wrapperX = Object.assign({}, wrapper);
			setAttributes({ wrapper: wrapperX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					wrapperSelector
				);

				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onPickCssLibraryCountdownWrapper(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				countdownWrapper[sudoSource] = sudoSourceArgs;
			});

			var countdownWrapperX = Object.assign({}, countdownWrapper);
			setAttributes({ countdownWrapper: countdownWrapperX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					countdownWrapperSelector
				);

				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onPickCssLibraryInner(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				inner[sudoSource] = sudoSourceArgs;
			});

			var innerX = Object.assign({}, inner);
			setAttributes({ inner: innerX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					innerSelector
				);

				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		// css library date countdown

		function onPickCssLibraryItems(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				items[sudoSource] = sudoSourceArgs;
			});

			var itemsX = Object.assign({}, items);
			setAttributes({ items: itemsX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					itemsSelector
				);

				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onPickCssLibrarySecondWrap(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				secondWrap[sudoSource] = sudoSourceArgs;
			});

			var secondWrapX = Object.assign({}, secondWrap);
			setAttributes({ secondWrap: secondWrapX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					secondWrapSelector
				);

				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onPickCssLibrarySecondCountdown(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				second[sudoSource] = sudoSourceArgs;
			});

			var secondX = Object.assign({}, second);
			setAttributes({ second: secondX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					secondSelector
				);

				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onPickCssLibraryMinuteWrap(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				minuteWrap[sudoSource] = sudoSourceArgs;
			});

			var minuteWrapX = Object.assign({}, minuteWrap);
			setAttributes({ minuteWrap: minuteWrapX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					minuteWrapSelector
				);

				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onPickCssLibraryMinuteCountdown(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				minute[sudoSource] = sudoSourceArgs;
			});

			var minuteX = Object.assign({}, minute);
			setAttributes({ minute: minuteX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					minuteSelector
				);

				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onPickCssLibraryHourWrap(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				hourWrap[sudoSource] = sudoSourceArgs;
			});

			var hourWrapX = Object.assign({}, hourWrap);
			setAttributes({ hourWrap: hourWrapX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					hourWrapSelector
				);

				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onPickCssLibraryHourCountdown(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				hour[sudoSource] = sudoSourceArgs;
			});

			var hourX = Object.assign({}, hour);
			setAttributes({ hour: hourX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					hourSelector
				);

				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onPickCssLibraryDayWrap(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				dayWrap[sudoSource] = sudoSourceArgs;
			});

			var dayWrapX = Object.assign({}, dayWrap);
			setAttributes({ dayWrap: dayWrapX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					dayWrapSelector
				);

				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onPickCssLibraryDayCountdown(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				day[sudoSource] = sudoSourceArgs;
			});

			var dayX = Object.assign({}, day);
			setAttributes({ day: dayX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					daySelector
				);

				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onPickCssLibrarySeparator(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				separator[sudoSource] = sudoSourceArgs;
			});

			var separatorX = Object.assign({}, separator);
			setAttributes({ separator: separatorX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					separatorSelector
				);

				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		// css library date countdown  end

		function onPickCssLibraryIcon(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				icon[sudoSource] = sudoSourceArgs;
			});

			var iconX = Object.assign({}, icon);
			setAttributes({ icon: iconX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					iconSelector
				);

				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onPickCssLibraryLabel(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				label[sudoSource] = sudoSourceArgs;
			});

			var labelX = Object.assign({}, label);
			setAttributes({ label: labelX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					labelSelector
				);

				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onPickCssLibraryCount(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				count[sudoSource] = sudoSourceArgs;
			});

			var countX = Object.assign({}, count);
			setAttributes({ count: countX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					countSelector
				);

				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onPickCssLibraryPrefix(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				prefix[sudoSource] = sudoSourceArgs;
			});

			var prefixX = Object.assign({}, prefix);
			setAttributes({ prefix: prefixX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					prefixSelector
				);

				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onPickCssLibraryPostfix(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				postfix[sudoSource] = sudoSourceArgs;
			});

			var postfixX = Object.assign({}, postfix);
			setAttributes({ postfix: postfixX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					postfixSelector
				);

				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		var RemoveScheduleArgGroup = function ({ title, index }) {
			return (
				<>
					<span
						className="cursor-pointer inline-block hover:bg-red-500 hover:text-white px-1 py-1"
						onClick={(ev) => {
							var scheduleX = { ...scheduleArg };
							delete scheduleX[index];
							setAttributes({ scheduleArg: scheduleX });
						}}>
						<Icon icon={close} />
					</span>
					<span>{title}</span>
				</>
			);
		};
		var RemoveScheduleArgArgs = function ({ title, index, groupId }) {
			return (
				<>
					<span
						className="cursor-pointer inline-block hover:bg-red-500 hover:text-white px-1 py-1"
						onClick={(ev) => {
							var scheduleArgX = { ...scheduleArg };
							scheduleArgX[groupId].args.splice(index, 1);

							setAttributes({ scheduleArg: scheduleArgX });
						}}>
						<Icon icon={close} />
					</span>

					<span>{title}</span>
				</>
			);
		};
		var RemoveExpiredArgGroup = function ({ title, index }) {
			return (
				<>
					<span
						className="cursor-pointer inline-block hover:bg-red-500 hover:text-white px-1 py-1"
						onClick={(ev) => {
							var expiredArgX = { ...expiredArg };
							delete expiredArgX[index];
							setAttributes({ expiredArg: expiredArgX });
						}}>
						<Icon icon={close} />
					</span>
					<span>{title}</span>
				</>
			);
		};

		var RemoveExpiredArgArgs = function ({ title, index, groupId }) {
			return (
				<>
					<span
						className="cursor-pointer inline-block hover:bg-red-500 hover:text-white px-1 py-1"
						onClick={(ev) => {
							var expiredArgX = { ...expiredArg };
							expiredArgX[groupId].args.splice(index, 1);

							setAttributes({ expiredArg: expiredArgX });
						}}>
						<Icon icon={close} />
					</span>

					<span>{title}</span>
				</>
			);
		};

		function onChangeStyleWrapper(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, wrapper);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ wrapper: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				wrapperSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleWrapper(sudoSource, key) {
			var object = myStore.deletePropertyDeep(wrapper, [
				sudoSource,
				key,
				breakPointX,
			]);
			setAttributes({ wrapper: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				wrapperSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleWrapper(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, wrapper);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ wrapper: object });
		}

		function onChangeStyleCountdownWrapper(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, countdownWrapper);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ countdownWrapper: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				countdownWrapperSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleCountdownWrapper(sudoSource, key) {
			var object = myStore.deletePropertyDeep(countdownWrapper, [
				sudoSource,
				key,
				breakPointX,
			]);
			setAttributes({ countdownWrapper: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				countdownWrapperSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleCountdownWrapper(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, countdownWrapper);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ countdownWrapper: object });
		}

		function onChangeStyleInner(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, inner);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ inner: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				innerSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleInner(sudoSource, key) {
			var object = myStore.deletePropertyDeep(inner, [
				sudoSource,
				key,
				breakPointX,
			]);
			setAttributes({ inner: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				innerSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleInner(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, inner);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ inner: object });
		}

		// Css edit

		// items style functions
		// items style functions end

		function onChangeStyleItems(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, items);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ items: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				itemsSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleItems(sudoSource, key) {
			var object = myStore.deletePropertyDeep(items, [
				sudoSource,
				key,
				breakPointX,
			]);
			setAttributes({ items: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				itemsSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleItems(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, items);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ items: object });
		}

		// items style functions end

		// second style function

		// second wrap
		function onChangeStyleSecondWrap(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, secondWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ secondWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				secondWrapSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleSecondWrap(sudoSource, key) {
			var object = myStore.deletePropertyDeep(secondWrap, [
				sudoSource,
				key,
				breakPointX,
			]);
			setAttributes({ secondWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				secondWrapSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleSecondWrap(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, secondWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ secondWrap: object });
		}

		// second count
		function onChangeStyleSecondCountdown(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, second);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ second: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				secondSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleSecondCountdown(sudoSource, key) {
			var object = myStore.deletePropertyDeep(second, [
				sudoSource,
				key,
				breakPointX,
			]);
			setAttributes({ second: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				secondSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleSecondCountdown(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, second);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ second: object });
		}

		// second style function end

		// minute style function

		// minute count wrap

		function onChangeStyleMinuteWrap(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, minuteWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ minuteWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				minuteWrapSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleMinuteWrap(sudoSource, key) {
			var object = myStore.deletePropertyDeep(minuteWrap, [
				sudoSource,
				key,
				breakPointX,
			]);
			setAttributes({ minuteWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				minuteWrapSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleMinuteWrap(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, minuteWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ minuteWrap: object });
		}

		// minute count
		function onChangeStyleMinuteCountdown(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, minute);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ minute: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				minuteSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleMinuteCountdown(sudoSource, key) {
			var object = myStore.deletePropertyDeep(minute, [
				sudoSource,
				key,
				breakPointX,
			]);
			setAttributes({ minute: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				minuteSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleMinuteCountdown(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, minute);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ minute: object });
		}

		// minute style function end

		// hour style function

		// hour wrap

		function onChangeStyleHourWrap(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, hourWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ hourWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				hourWrapSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleHourWrap(sudoSource, key) {
			var object = myStore.deletePropertyDeep(hourWrap, [
				sudoSource,
				key,
				breakPointX,
			]);
			setAttributes({ hourWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				hourWrapSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleHourWrap(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, hourWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ hourWrap: object });
		}

		// hour count
		function onChangeStyleHourCountdown(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, hour);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ hour: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				hourSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleHourCountdown(sudoSource, key) {
			var object = myStore.deletePropertyDeep(hour, [
				sudoSource,
				key,
				breakPointX,
			]);
			setAttributes({ hour: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				hourSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleHourCountdown(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, hour);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ hour: object });
		}

		// hour style function end

		// day style function

		// day wrap
		function onChangeStyleDayWrap(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, dayWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ dayWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				dayWrapSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleDayWrap(sudoSource, key) {
			var object = myStore.deletePropertyDeep(dayWrap, [
				sudoSource,
				key,
				breakPointX,
			]);
			setAttributes({ dayWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				dayWrapSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleDayWrap(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, dayWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ dayWrap: object });
		}

		// day count
		function onChangeStyleDayCountdown(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, day);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ day: object });

			var elementSelector = myStore.getElementSelector(sudoSource, daySelector);
			var cssProperty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleDayCountdown(sudoSource, key) {
			var object = myStore.deletePropertyDeep(day, [
				sudoSource,
				key,
				breakPointX,
			]);
			setAttributes({ day: object });

			var elementSelector = myStore.getElementSelector(sudoSource, daySelector);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleDayCountdown(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, day);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ day: object });
		}

		// day style function end

		// Separator style functions

		function onChangeStyleSeparator(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, separator);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ separator: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				separatorSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleSeparator(sudoSource, key) {
			var object = myStore.deletePropertyDeep(separator, [
				sudoSource,
				key,
				breakPointX,
			]);
			setAttributes({ separator: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				separatorSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleSeparator(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, separator);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ separator: object });
		}

		// Css edit

		function onChangeStyleIcon(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, icon);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ icon: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				iconSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleIcon(sudoSource, key) {
			var object = myStore.deletePropertyDeep(icon, [
				sudoSource,
				key,
				breakPointX,
			]);
			setAttributes({ icon: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				iconSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleIcon(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, icon);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ icon: object });
		}

		function onChangeStyleLabel(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, label);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ label: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				labelSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleLabel(sudoSource, key) {
			var object = myStore.deletePropertyDeep(label, [
				sudoSource,
				key,
				breakPointX,
			]);
			setAttributes({ label: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				labelSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleLabel(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, label);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ label: object });
		}
		// count
		function onChangeStyleCount(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, count);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ count: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				countSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleCount(sudoSource, key) {
			var object = myStore.deletePropertyDeep(count, [
				sudoSource,
				key,
				breakPointX,
			]);
			setAttributes({ count: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				countSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleCount(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, count);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ count: object });
		}
		// count
		function onChangeStylePrefix(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, prefix);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ prefix: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				prefixSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStylePrefix(sudoSource, key) {
			var object = myStore.deletePropertyDeep(prefix, [
				sudoSource,
				key,
				breakPointX,
			]);
			setAttributes({ prefix: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				prefixSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStylePrefix(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, prefix);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ prefix: object });
		}

		function onChangeStylePostfix(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, postfix);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ postfix: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				postfixSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStylePostfix(sudoSource, key) {
			var object = myStore.deletePropertyDeep(postfix, [
				sudoSource,
				key,
				breakPointX,
			]);
			setAttributes({ postfix: object });

			var elementSelector = myStore.getElementSelector(
				sudoSource,
				postfixSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStylePostfix(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, postfix);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ postfix: object });
		}

		// add bulk style start

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

		function onBulkAddCountdownWrapper(sudoScource, cssObj) {
			let obj = Object.assign({}, countdownWrapper);
			obj[sudoScource] = cssObj;

			setAttributes({ countdownWrapper: obj });

			var selector = myStore.getElementSelector(
				sudoScource,
				countdownWrapperSelector
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

		function onBulkAddInner(sudoScource, cssObj) {
			let obj = Object.assign({}, inner);
			obj[sudoScource] = cssObj;

			setAttributes({ inner: obj });

			var selector = myStore.getElementSelector(sudoScource, innerSelector);
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

		function onBulkAddItems(sudoScource, cssObj) {
			let obj = Object.assign({}, items);
			obj[sudoScource] = cssObj;

			setAttributes({ items: obj });

			var selector = myStore.getElementSelector(sudoScource, itemsSelector);
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

		function onBulkAddSecondWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, secondWrap);
			obj[sudoScource] = cssObj;

			setAttributes({ secondWrap: obj });

			var selector = myStore.getElementSelector(
				sudoScource,
				secondWrapSelector
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

		function onBulkAddSecond(sudoScource, cssObj) {
			let obj = Object.assign({}, second);
			obj[sudoScource] = cssObj;

			setAttributes({ second: obj });

			var selector = myStore.getElementSelector(sudoScource, secondSelector);
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

		function onBulkAddMinuteWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, minuteWrap);
			obj[sudoScource] = cssObj;

			setAttributes({ minuteWrap: obj });

			var selector = myStore.getElementSelector(
				sudoScource,
				minuteWrapSelector
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

		function onBulkAddMinute(sudoScource, cssObj) {
			let obj = Object.assign({}, minute);
			obj[sudoScource] = cssObj;

			setAttributes({ minute: obj });

			var selector = myStore.getElementSelector(sudoScource, minuteSelector);
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

		function onBulkAddHourWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, hourWrap);
			obj[sudoScource] = cssObj;

			setAttributes({ hourWrap: obj });

			var selector = myStore.getElementSelector(sudoScource, hourWrapSelector);
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

		function onBulkAddHour(sudoScource, cssObj) {
			let obj = Object.assign({}, hour);
			obj[sudoScource] = cssObj;

			setAttributes({ hour: obj });

			var selector = myStore.getElementSelector(sudoScource, hourSelector);
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

		function onBulkAddDayWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, dayWrap);
			obj[sudoScource] = cssObj;

			setAttributes({ dayWrap: obj });

			var selector = myStore.getElementSelector(sudoScource, dayWrapSelector);
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

		function onBulkAddDay(sudoScource, cssObj) {
			let obj = Object.assign({}, day);
			obj[sudoScource] = cssObj;

			setAttributes({ day: obj });

			var selector = myStore.getElementSelector(sudoScource, daySelector);
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

		function onBulkAddSeparator(sudoScource, cssObj) {
			let obj = Object.assign({}, separator);
			obj[sudoScource] = cssObj;

			setAttributes({ separator: obj });

			var selector = myStore.getElementSelector(sudoScource, separatorSelector);
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

		function onBulkAddLabel(sudoScource, cssObj) {
			let obj = Object.assign({}, label);
			obj[sudoScource] = cssObj;

			setAttributes({ label: obj });

			var selector = myStore.getElementSelector(sudoScource, labelSelector);
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
		function onBulkAddCount(sudoScource, cssObj) {
			let obj = Object.assign({}, count);
			obj[sudoScource] = cssObj;

			setAttributes({ count: obj });

			var selector = myStore.getElementSelector(sudoScource, countSelector);
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

		// add bulk style end

		// reset style start

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

		function onResetCountdownWrapper(sudoScources) {
			let obj = Object.assign({}, countdownWrapper);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						countdownWrapperSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ countdownWrapper: obj });
		}

		function onResetInner(sudoScources) {
			let obj = Object.assign({}, inner);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						innerSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ inner: obj });
		}

		function onResetItems(sudoScources) {
			let obj = Object.assign({}, items);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						itemsSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ items: obj });
		}

		function onResetSecondWrap(sudoScources) {
			let obj = Object.assign({}, secondWrap);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						secondWrapSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ secondWrap: obj });
		}

		function onResetSecond(sudoScources) {
			let obj = Object.assign({}, second);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						secondSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ second: obj });
		}

		function onResetMinuteWrap(sudoScources) {
			let obj = Object.assign({}, minuteWrap);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						minuteWrapSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ minuteWrap: obj });
		}

		function onResetMinute(sudoScources) {
			let obj = Object.assign({}, minute);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						minuteSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ minute: obj });
		}

		function onResetHourWrap(sudoScources) {
			let obj = Object.assign({}, hourWrap);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						hourWrapSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ hourWrap: obj });
		}

		function onResetHour(sudoScources) {
			let obj = Object.assign({}, hour);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						hourSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ hour: obj });
		}

		function onResetDayWrap(sudoScources) {
			let obj = Object.assign({}, dayWrap);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						dayWrapSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ dayWrap: obj });
		}

		function onResetDay(sudoScources) {
			let obj = Object.assign({}, day);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						daySelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ day: obj });
		}

		function onResetIcon(sudoScources) {
			let obj = Object.assign({}, icon);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						iconSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ icon: obj });
		}

		function onResetSeparator(sudoScources) {
			let obj = Object.assign({}, separator);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						separatorSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ separator: obj });
		}

		function onResetLabel(sudoScources) {
			let obj = Object.assign({}, label);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						labelSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ label: obj });
		}
		function onResetCount(sudoScources) {
			let obj = Object.assign({}, count);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						countSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ count: obj });
		}

		function onResetPrefix(sudoScources) {
			let obj = Object.assign({}, prefix);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						prefixSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ prefix: obj });
		}

		function onResetPostfix(sudoScources) {
			let obj = Object.assign({}, postfix);

			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						postfixSelector
					);

					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ postfix: obj });
		}

		// reset style end

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

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();

			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};

			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[countdownWrapperSelector] = countdownWrapper;
			blockCssObj[labelSelector] = label;
			blockCssObj[iconSelector] = icon;
			blockCssObj[innerSelector] = inner;
			blockCssObj[prefixSelector] = prefix;
			blockCssObj[postfixSelector] = postfix;
			blockCssObj[separatorSelector] = separator;
			blockCssObj[itemsSelector] = items;
			blockCssObj[secondWrapSelector] = secondWrap;
			blockCssObj[secondSelector] = second;
			blockCssObj[minuteWrapSelector] = minuteWrap;
			blockCssObj[minuteSelector] = minute;
			blockCssObj[hourWrapSelector] = hourWrap;
			blockCssObj[hourSelector] = hour;
			blockCssObj[dayWrapSelector] = dayWrap;
			blockCssObj[daySelector] = day;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);

			var itemX = { ...blockCssY.items, ...blockCssRules };
			setAttributes({ blockCssY: { items: itemX } });
		}, [blockId]);

		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		useEffect(() => {}, [second]);

		const CustomTagWrapper = `${wrapper.options.tag}`;
		const CustomTagPostTitle = `${second.options.tag}`;

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});

		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			//allowedBlocks: ALLOWED_BLOCKS,
			//template: MY_TEMPLATE,
			//orientation: 'horizontal',
			templateInsertUpdatesSelection: true,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		});

		return (
			<>
				<InspectorControls>
					<div className="px-3 pg-setting-input-text">
						<div className="pb-3 mb-4">
							<PanelRow className="my-4">
								<label for="" className="font-medium text-slate-900 ">
									Date Countdown Type
								</label>
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={
										typeArgs[
											dateCountdown.options == undefined
												? dateCountdown.type
												: dateCountdown.options.type
										] == undefined
											? "Choose"
											: typeArgs[
													dateCountdown.options == undefined
														? dateCountdown.type
														: dateCountdown.options.type
											  ].label
									}
									options={typeArgs}
									onChange={setType}
									value={[]}></PGDropdown>
							</PanelRow>
							{dateCountdown.options.type == "fixed" && (
								<>
									{dateCountdown.options.startDateSrc?.length == 0 && (
										<PanelRow className="block mb-4">
											<label
												for=""
												className="font-medium text-slate-900 mb-2 ">
												Start Date?
											</label>
											<br />
											<InputControl
												type="datetime-local"
												className="b-2"
												value={dateCountdown.options.startDate}
												onChange={(newVal) => {
													var options = {
														...dateCountdown.options,
														startDate: newVal,
													};
													setAttributes({
														dateCountdown: {
															...dateCountdown,
															options: options,
														},
													});
												}}
											/>
										</PanelRow>
									)}

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Start Date Source
										</label>
										<SelectControl
											label=""
											value={dateCountdown.options.startDateSrc}
											options={[
												{ label: "Choose", value: "" },
												{
													label: "WooCommerce Sale price dates",
													value: "wc_sale_price_date_from",
												},
											]}
											onChange={(newVal) => {
												var options = {
													...dateCountdown.options,
													startDateSrc: newVal,
												};
												setAttributes({
													dateCountdown: { ...dateCountdown, options: options },
												});
											}}
										/>
									</PanelRow>

									{dateCountdown.options.endDateSrc.length == 0 && (
										<PanelRow className="block mb-2">
											<label
												for=""
												className="font-medium text-slate-900 mb-2 ">
												End Date?
											</label>

											<InputControl
												type="datetime-local"
												className="mr-2"
												value={dateCountdown.options.endDate}
												onChange={(newVal) => {
													var options = {
														...dateCountdown.options,
														endDate: newVal,
													};
													setAttributes({
														dateCountdown: {
															...dateCountdown,
															options: options,
														},
													});
												}}
											/>
										</PanelRow>
									)}

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											End Date Source
										</label>
										<SelectControl
											label=""
											value={dateCountdown.options.endDateSrc}
											options={[
												{ label: "Choose", value: "" },
												{
													label: "WooCommerce Sale price dates",
													value: "wc_sale_price_date_to",
												},
											]}
											onChange={(newVal) => {
												var options = {
													...dateCountdown.options,
													endDateSrc: newVal,
												};
												setAttributes({
													dateCountdown: { ...dateCountdown, options: options },
												});
											}}
										/>
									</PanelRow>
								</>
							)}

							{dateCountdown.options.type == "everGreen" && (
								<>
									<PanelRow className="mb-4">
										<InputControl
											label="Day"
											type="number"
											className="mr-2"
											placeholder="Enter Day"
											value={dateCountdown.options.everGreenTime.day}
											onChange={(newVal) => {
												var options = {
													...dateCountdown.options,
												};
												var everGreenTimeX = {
													...options.everGreenTime,
													day: newVal,
												};

												// var everGreenX = {...options, day: newVal}
												var optionX = {
													...options,
													everGreenTime: everGreenTimeX,
												};

												setAttributes({
													dateCountdown: { ...dateCountdown, options: optionX },
												});
											}}
										/>

										<InputControl
											label="Hour"
											type="number"
											className="mr-2"
											placeholder="Enter Hour"
											value={dateCountdown.options.everGreenTime.hour}
											onChange={(newVal) => {
												var options = {
													...dateCountdown.options,
												};
												var everGreenTimeX = {
													...options.everGreenTime,
													hour: newVal,
												};
												var optionX = {
													...options,
													everGreenTime: everGreenTimeX,
												};
												setAttributes({
													dateCountdown: { ...dateCountdown, options: optionX },
												});
											}}
										/>

										<InputControl
											label="Minute"
											type="number"
											className="mr-2"
											placeholder="Enter Minute"
											value={dateCountdown.options.everGreenTime.minute}
											onChange={(newVal) => {
												var options = {
													...dateCountdown.options,
													durationMinute: newVal,
												};
												var everGreenTimeX = {
													...options.everGreenTime,
													minute: newVal,
												};
												var optionX = {
													...options,
													everGreenTime: everGreenTimeX,
												};
												setAttributes({
													dateCountdown: { ...dateCountdown, options: optionX },
												});
											}}
										/>
									</PanelRow>
								</>
							)}

							{dateCountdown.options.type == "scheduled" && (
								<>
									<PanelRow className="my-4">
										{/* <label for=""  className="font-medium text-slate-900 " >Add Media</label> */}
										<div
											onClick={(ev) => {
												var scheduleTimeX = scheduleTime.concat({
													startTime: "",
													endTime: "",
													weekdays: {
														value: "0",
														values: [],
														compare: "=",
													},
												});
												setAttributes({ scheduleTime: scheduleTimeX });
											}}>
											Add Schedule Time
										</div>
									</PanelRow>

									{scheduleTime.length == 0 && (
										<div className="bg-red-400 text-white my-3  px-3 py-2 text-center">
											No Schedule added
										</div>
									)}

									<ReactSortable
										list={scheduleTime}
										handle={".handle"}
										setList={(item) => {
											setAttributes({ scheduleTime: scheduleTime });
										}}>
										{scheduleTime.map((item, index) => (
											<div key={item.id} className="">
												<PanelBody
													title={
														<>
															<span
																className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																onClick={(ev) => {
																	var scheduleTimeX = [...scheduleTime];
																	scheduleTimeX.splice(index, 1);

																	setAttributes({
																		scheduleTime: scheduleTimeX,
																	});
																}}>
																<Icon icon={close} />
															</span>
															<span className="handle cursor-pointer hover:bg-blue-500 hover:text-white px-1 py-1">
																<Icon icon={menu} />
															</span>

															{index}
														</>
													}
													initialOpen={false}>
													<PanelRow>
														<label
															for=""
															className="font-medium text-slate-900 ">
															Start Time
														</label>
														<InputControl
															type="time"
															value={item.startTime}
															onChange={(newVal) => {
																var scheduleTimeX = [...scheduleTime];
																scheduleTimeX[index].startTime = newVal;
																setAttributes({
																	scheduleTime: scheduleTimeX,
																});
															}}
														/>
													</PanelRow>

													<PanelRow>
														<label
															for=""
															className="font-medium text-slate-900 ">
															End Time
														</label>
														<InputControl
															type="time"
															value={item.endTime}
															onChange={(newVal) => {
																var scheduleTimeX = [...scheduleTime];
																scheduleTimeX[index].endTime = newVal;
																setAttributes({
																	scheduleTime: scheduleTimeX,
																});
															}}
														/>
													</PanelRow>
													<>
														<>
															<PanelRow>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	Compare
																</label>
																<SelectControl
																	label=""
																	value={item.weekdays?.compare}
																	options={[
																		{ label: "=", value: "=" },
																		{ label: "!=", value: "!=" },
																		{ label: ">", value: ">" },
																		{ label: "<", value: "<" },
																		{ label: ">=", value: ">=" },
																		{ label: "<=", value: "<=" },
																		{ label: "between", value: "between" },
																		{ label: "exist", value: "exist" },
																	]}
																	onChange={(newVal) => {
																		var scheduleTimeX = [...scheduleTime];

																		scheduleTimeX[index].weekdays.compare =
																			newVal;
																		setAttributes({
																			scheduleTime: scheduleTimeX,
																		});
																	}}
																/>
															</PanelRow>

															{(item.weekdays?.compare == "=" ||
																item.weekdays?.compare == "!=" ||
																item.weekdays?.compare == ">" ||
																item.weekdays?.compare == "<" ||
																item.weekdays?.compare == ">=" ||
																item.weekdays?.compare == "<=") && (
																<>
																	<PanelRow className="mb-4">
																		<label
																			for=""
																			className="font-medium text-slate-900 ">
																			Values
																		</label>
																		<PGDropdown
																			position="bottom right"
																			variant="secondary"
																			buttonTitle={
																				item.weekdays?.value?.length == 0
																					? "Choose Day"
																					: weekDayNumn[item.weekdays?.value]
																							?.label
																			}
																			options={[
																				{ label: "Sunday", value: 0 },
																				{ label: "Monday", value: 1 },
																				{ label: "Tuesday", value: 2 },
																				{ label: "Wednesday", value: 3 },
																				{ label: "Thursday", value: 4 },
																				{ label: "Friday", value: 5 },
																				{ label: "Saturday", value: 6 },
																			]}
																			onChange={(newVal) => {
																				var scheduleTimeX = [...scheduleTime];

																				scheduleTimeX[index].weekdays.value =
																					newVal.value;
																				setAttributes({
																					scheduleTime: scheduleTimeX,
																				});
																			}}
																			value={item.weekdays.value}></PGDropdown>
																	</PanelRow>
																</>
															)}
															{(item.weekdays?.compare == "between" ||
																item.weekdays?.compare == "exist") && (
																<>
																	<PanelRow className="mb-4">
																		<label htmlFor="">Values</label>
																		<PGDropdown
																			position="bottom right"
																			variant="secondary"
																			buttonTitle={"Choose Days"}
																			options={[
																				{ label: "Sunday", value: 0 },
																				{ label: "Monday", value: 1 },
																				{ label: "Tuesday", value: 2 },
																				{ label: "Wednesday", value: 3 },
																				{ label: "Thursday", value: 4 },
																				{ label: "Friday", value: 5 },
																				{ label: "Saturday", value: 6 },
																			]}
																			onChange={(newVal) => {
																				var scheduleTimeX = [...scheduleTime];
																				if (
																					scheduleTimeX[
																						index
																					].weekdays.values.includes(
																						newVal.value
																					)
																				) {
																					// Remove the value if already selected
																					scheduleTimeX[index].weekdays.values =
																						scheduleTimeX[
																							index
																						].weekdays.values.filter(
																							(value) => value !== newVal.value
																						);
																				} else {
																					// Add the value if not already selected
																					scheduleTimeX[
																						index
																					].weekdays.values.push(newVal.value);
																				}
																				setAttributes({
																					scheduleTime: scheduleTimeX,
																				});
																			}}
																			value={item.weekdays.values}></PGDropdown>
																	</PanelRow>
																	<br />

																	<div>
																		{item.weekdays.values.map((x, i) => {
																			return (
																				<div
																					className="flex justify-between my-1"
																					key={i}>
																					<span>{weekDayNumn[x].label}</span>
																					<span
																						className="bg-red-500 text-white p-1 cursor-pointer hover:"
																						onClick={(ev) => {
																							var scheduleTimeX = [
																								...scheduleTime,
																							];
																							// Remove the value when the "X" is clicked
																							scheduleTimeX[
																								index
																							].weekdays.values = scheduleTimeX[
																								index
																							].weekdays.values.filter(
																								(value) => value !== x
																							);
																							setAttributes({
																								scheduleTime: scheduleTimeX,
																							});
																						}}>
																						<Icon fill="#fff" icon={close} />
																					</span>
																				</div>
																			);
																		})}
																	</div>
																</>
															)}
														</>
													</>
												</PanelBody>
											</div>
										))}
									</ReactSortable>
								</>
							)}
						</div>

						{/* visibility start */}

						<PanelBody
							className="font-medium text-slate-900 "
							title="Expired Arguments"
							initialOpen={true}>
							<div
								// className="bg-blue-500 p-2 px-4 text-white inline-block cursor-pointer rounded-sm"
								className="pg-font flex gap-2 justify-center my-4 cursor-pointer py-2 px-4 capitalize  bg-gray-800 text-white font-medium rounded hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700"
								onClick={(ev) => {
									var expiredArgX = { ...expiredArg };
									var index = Object.entries(expiredArgX).length;
									expiredArgX[index] = { logic: "OR", title: "", args: [] };
									setAttributes({ expiredArg: expiredArgX });
								}}>
								Add Group
							</div>

							<div className="my-4">
								{Object.entries(expiredArg).map((group, groupIndex) => {
									var groupId = group[0];
									var groupData = group[1];

									return (
										<PanelBody
											title={
												<RemoveExpiredArgGroup
													title={groupIndex}
													index={groupId}
												/>
											}
											initialOpen={false}>
											<PanelRow className="my-3">
												<PGDropdown
													position="bottom right"
													variant="secondary"
													buttonTitle={"Add Condition"}
													options={expiredArgs}
													onChange={(option, index) => {
														var expiredArgX = { ...expiredArg };

														expiredArgX[groupId]["args"].push(option.args);
														setAttributes({ expiredArg: expiredArgX });
													}}
													values=""></PGDropdown>
											</PanelRow>

											{expiredArg[groupId]["args"] != undefined &&
												expiredArg[groupId]["args"].map((item, index) => {
													var id = item.id;

													return (
														<>
															{id == "redirectURL" && (
																<PanelBody
																	title={
																		<RemoveExpiredArgArgs
																			title={
																				expiredArgs[id] == undefined
																					? id
																					: expiredArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<div>
																		<PanelRow className="mb-4">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				Write URL
																			</label>
																			<InputControl
																				className="mr-2"
																				placeholder="Enter URL"
																				value={item.value}
																				onChange={(newVal) => {
																					var expiredArgX = { ...expiredArg };
																					expiredArgX[groupId]["args"][
																						index
																					].value = newVal;
																					setAttributes({
																						expiredArg: expiredArgX,
																					});
																				}}
																			/>
																		</PanelRow>
																		{/* </div>
                                  <div> */}
																		<PanelRow className="mb-4">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				Delay
																			</label>
																			<InputControl
																				className="mr-2"
																				placeholder="Add delay in millisecond"
																				value={item.delay}
																				onChange={(newVal) => {
																					var expiredArgX = { ...expiredArg };
																					expiredArgX[groupId]["args"][
																						index
																					].delay = newVal;
																					setAttributes({
																						expiredArg: expiredArgX,
																					});
																				}}
																			/>
																		</PanelRow>
																	</div>
																</PanelBody>
															)}
															{id == "wcHideCartButton" && (
																<PanelBody
																	title={
																		<RemoveExpiredArgArgs
																			title={
																				expiredArgs[id] == undefined
																					? id
																					: expiredArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<div>
																		No Option available for this condition.
																	</div>
																</PanelBody>
															)}
															{id == "showExpiredMsg" && (
																<PanelBody
																	title={
																		<RemoveExpiredArgArgs
																			title={
																				expiredArgs[id] == undefined
																					? id
																					: expiredArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<div>
																		No Option available for this condition.
																	</div>
																</PanelBody>
															)}
															{id == "hideCountdown" && (
																<PanelBody
																	title={
																		<RemoveExpiredArgArgs
																			title={
																				expiredArgs[id] == undefined
																					? id
																					: expiredArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<div>
																		No Option available for this condition.
																	</div>
																</PanelBody>
															)}
															{id == "showElement" && (
																<PanelBody
																	title={
																		<RemoveExpiredArgArgs
																			title={
																				expiredArgs[id] == undefined
																					? id
																					: expiredArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<div>
																		<PanelRow className="mb-4">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				ID/Class
																			</label>
																			<InputControl
																				className="mr-2"
																				placeholder=".element or #element"
																				value={item.value}
																				onChange={(newVal) => {
																					var expiredArgX = { ...expiredArg };
																					expiredArgX[groupId]["args"][
																						index
																					].value = newVal;
																					setAttributes({
																						expiredArg: expiredArgX,
																					});
																				}}
																			/>
																		</PanelRow>
																	</div>
																</PanelBody>
															)}
															{id == "showPopup" && (
																<PanelBody
																	title={
																		<RemoveExpiredArgArgs
																			title={
																				expiredArgs[id] == undefined
																					? id
																					: expiredArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<div>
																		No Option available for this condition.
																	</div>
																</PanelBody>
															)}
														</>
													);
												})}
										</PanelBody>
									);
								})}
							</div>
						</PanelBody>

						{/* visibility end */}

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
										onRemove={onRemoveStyleWrapper}
										onBulkAdd={onBulkAddWrapper}
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
							title="Countdown Wrapper"
							initialOpen={false}>
							<PGtabs
								activeTab="options"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
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
								<PGtab name="styles">
									<PGStyles
										obj={countdownWrapper}
										onChange={onChangeStyleCountdownWrapper}
										onAdd={onAddStyleCountdownWrapper}
										onRemove={onRemoveStyleCountdownWrapper}
										onBulkAdd={onBulkAddCountdownWrapper}
										onReset={onResetCountdownWrapper}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={countdownWrapper}
										onChange={onPickCssLibraryCountdownWrapper}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Message Area"
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
									<ToggleControl
										label="Enable on Expired?"
										className="my-4"
										style={{
											color: "#1f2937",
										}}
										help={
											innerEnable
												? "Message area enabled"
												: "Message area disabled."
										}
										checked={innerEnable ? true : false}
										onChange={(e) => {
											var options = {
												...inner.options,
												enable: inner.options.enable ? false : true,
											};
											setAttributes({
												inner: { ...inner, options: options },
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={inner}
										onChange={onChangeStyleInner}
										onAdd={onAddStyleInner}
										onRemove={onRemoveStyleInner}
										onBulkAdd={onBulkAddInner}
										onReset={onResetInner}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={inner}
										onChange={onPickCssLibraryInner}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Items"
							initialOpen={false}>
							<PGtabs
								activeTab="options"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
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
								<PGtab name="styles">
									<PGStyles
										obj={items}
										onChange={onChangeStyleItems}
										onAdd={onAddStyleItems}
										onRemove={onRemoveStyleItems}
										onBulkAdd={onBulkAddItems}
										onReset={onResetItems}
									/>
								</PGtab>

								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={items}
										onChange={onPickCssLibraryItems}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Second"
							initialOpen={false}>
							<PanelRow className="mb-4">
								<label for="" className="font-medium text-slate-900 ">
									Label:{" "}
								</label>
								<InputControl
									value={second.options.label}
									onChange={(newVal) => {
										var options = { ...second.options, label: newVal };
										setAttributes({
											second: { styles: second.styles, options: options },
										});
									}}
								/>
							</PanelRow>
							<PanelRow className="mb-4">
								<label for="" className="font-medium text-slate-900 ">
									Prefix:{" "}
								</label>
								<InputControl
									value={second.options.prefix}
									onChange={(newVal) => {
										var options = { ...second.options, prefix: newVal };
										setAttributes({
											second: { styles: second.styles, options: options },
										});
									}}
								/>
							</PanelRow>
							<PanelRow className="mb-4">
								<label for="" className="font-medium text-slate-900 ">
									Postfix:{" "}
								</label>
								<InputControl
									value={second.options.postfix}
									onChange={(newVal) => {
										var options = { ...second.options, postfix: newVal };
										setAttributes({
											second: { styles: second.styles, options: options },
										});
									}}
								/>
							</PanelRow>
							<PanelBody
								className="font-medium text-slate-900 "
								title="Second Wrap"
								initialOpen={false}>
								<PGtabs
									activeTab="options"
									orientation="horizontal"
									activeClass="active-tab"
									onSelect={(tabName) => {}}
									tabs={[
										// {
										//   name: "options",
										//   title: "Options",
										//   icon: settings,
										//   className: "tab-settings",
										// },
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
									<PGtab name="styles">
										<PGStyles
											obj={secondWrap}
											onChange={onChangeStyleSecondWrap}
											onAdd={onAddStyleSecondWrap}
											onRemove={onRemoveStyleSecondWrap}
											onBulkAdd={onBulkAddSecondWrap}
											onReset={onResetSecondWrap}
										/>
									</PGtab>

									<PGtab name="css">
										<PGCssLibrary
											blockId={blockId}
											obj={secondWrap}
											onChange={onPickCssLibrarySecondWrap}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>
							<PanelBody
								className="font-medium text-slate-900 "
								title="Second Count"
								initialOpen={false}>
								<PGtabs
									activeTab="options"
									orientation="horizontal"
									activeClass="active-tab"
									onSelect={(tabName) => {}}
									tabs={[
										// {
										//   name: "options",
										//   title: "Options",
										//   icon: settings,
										//   className: "tab-settings",
										// },
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
									<PGtab name="styles">
										<PGStyles
											obj={second}
											onChange={onChangeStyleSecondCountdown}
											onAdd={onAddStyleSecondCountdown}
											onRemove={onRemoveStyleSecondCountdown}
											onBulkAdd={onBulkAddSecond}
											onReset={onResetSecond}
										/>
									</PGtab>

									<PGtab name="css">
										<PGCssLibrary
											blockId={blockId}
											obj={second}
											onChange={onPickCssLibrarySecondCountdown}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Minute"
							initialOpen={false}>
							<PanelRow className="my-4">
								<label for="" className="font-medium text-slate-900 ">
									Label:{" "}
								</label>
								<InputControl
									value={minute.options.label}
									onChange={(newVal) => {
										var options = { ...minute.options, label: newVal };
										setAttributes({
											minute: { styles: minute.styles, options: options },
										});
									}}
								/>
							</PanelRow>
							<PanelRow className="my-4">
								<label for="" className="font-medium text-slate-900 ">
									Prefix:{" "}
								</label>
								<InputControl
									value={minute.options.prefix}
									onChange={(newVal) => {
										var options = { ...minute.options, prefix: newVal };
										setAttributes({
											minute: { styles: minute.styles, options: options },
										});
									}}
								/>
							</PanelRow>
							<PanelRow className="my-4">
								<label for="" className="font-medium text-slate-900 ">
									Postfix:{" "}
								</label>
								<InputControl
									value={minute.options.postfix}
									onChange={(newVal) => {
										var options = { ...minute.options, postfix: newVal };
										setAttributes({
											minute: { styles: minute.styles, options: options },
										});
									}}
								/>
							</PanelRow>
							<PanelBody
								className="font-medium text-slate-900 "
								title="Minute Wrap"
								initialOpen={false}>
								<PGtabs
									activeTab="options"
									orientation="horizontal"
									activeClass="active-tab"
									onSelect={(tabName) => {}}
									tabs={[
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
									<PGtab name="styles">
										<PGStyles
											obj={minuteWrap}
											onChange={onChangeStyleMinuteWrap}
											onAdd={onAddStyleMinuteWrap}
											onRemove={onRemoveStyleMinuteWrap}
											onBulkAdd={onBulkAddMinuteWrap}
											onReset={onResetMinuteWrap}
										/>
									</PGtab>

									<PGtab name="css">
										<PGCssLibrary
											blockId={blockId}
											obj={minuteWrap}
											onChange={onPickCssLibraryMinuteWrap}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>
							<PanelBody
								className="font-medium text-slate-900 "
								title="Minute Count"
								initialOpen={false}>
								<PGtabs
									activeTab="options"
									orientation="horizontal"
									activeClass="active-tab"
									onSelect={(tabName) => {}}
									tabs={[
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
									<PGtab name="styles">
										<PGStyles
											obj={minute}
											onChange={onChangeStyleMinuteCountdown}
											onAdd={onAddStyleMinuteCountdown}
											onRemove={onRemoveStyleMinuteCountdown}
											onBulkAdd={onBulkAddMinute}
											onReset={onResetMinute}
										/>
									</PGtab>

									<PGtab name="css">
										<PGCssLibrary
											blockId={blockId}
											obj={minute}
											onChange={onPickCssLibraryMinuteCountdown}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Hour"
							initialOpen={false}>
							<PanelRow className="my-4">
								<label for="" className="font-medium text-slate-900 ">
									Label:{" "}
								</label>
								<InputControl
									value={hour.options.label}
									onChange={(newVal) => {
										var options = { ...hour.options, label: newVal };
										setAttributes({
											hour: { styles: hour.styles, options: options },
										});
									}}
								/>
							</PanelRow>
							<PanelRow className="my-4">
								<label for="" className="font-medium text-slate-900 ">
									Prefix:{" "}
								</label>
								<InputControl
									value={hour.options.prefix}
									onChange={(newVal) => {
										var options = { ...hour.options, prefix: newVal };
										setAttributes({
											hour: { styles: hour.styles, options: options },
										});
									}}
								/>
							</PanelRow>
							<PanelRow className="my-4">
								<label for="" className="font-medium text-slate-900 ">
									Postfix:{" "}
								</label>
								<InputControl
									value={hour.options.postfix}
									onChange={(newVal) => {
										var options = { ...hour.options, postfix: newVal };
										setAttributes({
											hour: { styles: hour.styles, options: options },
										});
									}}
								/>
							</PanelRow>
							<PanelBody
								className="font-medium text-slate-900 "
								title="Hour Wrap"
								initialOpen={false}>
								<PGtabs
									activeTab="options"
									orientation="horizontal"
									activeClass="active-tab"
									onSelect={(tabName) => {}}
									tabs={[
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
									<PGtab name="styles">
										<PGStyles
											obj={hourWrap}
											onChange={onChangeStyleHourWrap}
											onAdd={onAddStyleHourWrap}
											onRemove={onRemoveStyleHourWrap}
											onBulkAdd={onBulkAddHourWrap}
											onReset={onResetHourWrap}
										/>
									</PGtab>

									<PGtab name="css">
										<PGCssLibrary
											blockId={blockId}
											obj={hourWrap}
											onChange={onPickCssLibraryHourWrap}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>
							<PanelBody
								className="font-medium text-slate-900 "
								title="Hour Count"
								initialOpen={false}>
								<PGtabs
									activeTab="options"
									orientation="horizontal"
									activeClass="active-tab"
									onSelect={(tabName) => {}}
									tabs={[
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
									<PGtab name="styles">
										<PGStyles
											obj={hour}
											onChange={onChangeStyleHourCountdown}
											onAdd={onAddStyleHourCountdown}
											onRemove={onRemoveStyleHourCountdown}
											onBulkAdd={onBulkAddHour}
											onReset={onResetHour}
										/>
									</PGtab>

									<PGtab name="css">
										<PGCssLibrary
											blockId={blockId}
											obj={hour}
											onChange={onPickCssLibraryHourCountdown}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Day"
							initialOpen={false}>
							<PanelRow className="my-4">
								<label for="" className="font-medium text-slate-900 ">
									Label:{" "}
								</label>
								<InputControl
									value={day.options.label}
									onChange={(newVal) => {
										var options = { ...day.options, label: newVal };
										setAttributes({
											day: { styles: day.styles, options: options },
										});
									}}
								/>
							</PanelRow>
							<PanelRow className="my-4">
								<label for="" className="font-medium text-slate-900 ">
									Prefix:{" "}
								</label>
								<InputControl
									value={day.options.prefix}
									onChange={(newVal) => {
										var options = { ...day.options, prefix: newVal };
										setAttributes({
											day: { styles: day.styles, options: options },
										});
									}}
								/>
							</PanelRow>
							<PanelRow className="my-4">
								<label for="" className="font-medium text-slate-900 ">
									Postfix:{" "}
								</label>
								<InputControl
									value={day.options.postfix}
									onChange={(newVal) => {
										var options = { ...day.options, postfix: newVal };
										setAttributes({
											day: { styles: day.styles, options: options },
										});
									}}
								/>
							</PanelRow>
							<PanelBody
								className="font-medium text-slate-900 "
								title="Day Wrap"
								initialOpen={false}>
								<PGtabs
									activeTab="options"
									orientation="horizontal"
									activeClass="active-tab"
									onSelect={(tabName) => {}}
									tabs={[
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
									<PGtab name="styles">
										<PGStyles
											obj={dayWrap}
											onChange={onChangeStyleDayWrap}
											onAdd={onAddStyleDayWrap}
											onRemove={onRemoveStyleDayWrap}
											onBulkAdd={onBulkAddDayWrap}
											onReset={onResetDayWrap}
										/>
									</PGtab>

									<PGtab name="css">
										<PGCssLibrary
											blockId={blockId}
											obj={dayWrap}
											onChange={onPickCssLibraryDayWrap}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>
							<PanelBody
								className="font-medium text-slate-900 "
								title="Day Count"
								initialOpen={false}>
								<PGtabs
									activeTab="options"
									orientation="horizontal"
									activeClass="active-tab"
									onSelect={(tabName) => {}}
									tabs={[
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
									<PGtab name="styles">
										<PGStyles
											obj={day}
											onChange={onChangeStyleDayCountdown}
											onAdd={onAddStyleDayCountdown}
											onRemove={onRemoveStyleDayCountdown}
											onBulkAdd={onBulkAddDay}
											onReset={onResetDay}
										/>
									</PGtab>

									<PGtab name="css">
										<PGCssLibrary
											blockId={blockId}
											obj={day}
											onChange={onPickCssLibraryDayCountdown}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>
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
									<PanelRow className="my-4">
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

									<PanelRow className="my-4">
										<ToggleControl
											label="Enable Icon?"
											className="my-4"
											help={iconEnable ? "Icon enabled" : "Icon disabled."}
											checked={iconEnable ? true : false}
											onChange={(e) => {
												var options = {
													...icon.options,
													enable: icon.options.enable ? false : true,
												};
												setAttributes({
													icon: { ...icon, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={icon}
										onChange={onChangeStyleIcon}
										onAdd={onAddStyleIcon}
										onRemove={onRemoveStyleIcon}
										onBulkAdd={onBulkAddIcon}
										onReset={onResetIcon}
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
							title="Separator"
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
									<PanelRow className="my-4">
										<label for="" className="font-medium text-slate-900 ">
											Separator
										</label>

										<InputControl
											value={separator.options.text}
											onChange={(newVal) => {
												var options = { ...separator.options, text: newVal };
												setAttributes({
													separator: {
														styles: separator.styles,
														options: options,
													},
												});
											}}
										/>
									</PanelRow>

									<PanelRow className="my-4">
										<ToggleControl
											label="Enable Separator?"
											className="my-4"
											help={
												separatorEnable
													? "Separator enabled"
													: "Separator disabled."
											}
											checked={separatorEnable ? true : false}
											onChange={(e) => {
												var options = {
													...separator.options,
													enable: separator.options.enable ? false : true,
												};
												setAttributes({
													separator: { ...separator, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow className="my-4">
										<label for="" className="font-medium text-slate-900 ">
											Separator position
										</label>

										<SelectControl
											label=""
											value={separator.options.position}
											options={[
												{ label: "Choose Position", value: "" },

												{ label: "After Postfix", value: "afterPostfix" },

												{ label: "After Each Items", value: "afterEachItems" },
											]}
											onChange={(newVal) => {
												var options = {
													...separator.options,
													position: newVal,
												};
												setAttributes({
													separator: { ...separator, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={separator}
										onChange={onChangeStyleSeparator}
										onAdd={onAddStyleSeparator}
										onRemove={onRemoveStyleSeparator}
										onBulkAdd={onBulkAddSeparator}
										onReset={onResetSeparator}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={separator}
										onChange={onPickCssLibrarySeparator}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						{/* count */}
						<PanelBody
							className="font-medium text-slate-900 "
							title="Counter"
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
									<label for="" className="font-medium text-slate-900 ">
										Counter CSS Class:
									</label>
									<InputControl
										value={count.options.class}
										onChange={(newVal) => {
											var options = { ...count.options, class: newVal };
											setAttributes({
												count: { styles: count.styles, options: options },
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={count}
										onChange={onChangeStyleCount}
										onAdd={onAddStyleCount}
										onRemove={onRemoveStyleCount}
										onBulkAdd={onBulkAddCount}
										onReset={onResetCount}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={count}
										onChange={onPickCssLibraryCount}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>
						{/* count */}

						<PanelBody
							className="font-medium text-slate-900 "
							title="Label"
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
									<PanelRow className="my-4">
										<ToggleControl
											label="Enable Label?"
											className="my-4"
											help={labelEnable ? "Label enabled" : "Label disabled."}
											checked={labelEnable ? true : false}
											onChange={(e) => {
												var options = {
													...label.options,
													enable: label.options.enable ? false : true,
												};
												setAttributes({
													label: { ...label, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow className="my-4">
										<label for="" className="font-medium text-slate-900 ">
											Label position
										</label>

										<SelectControl
											label=""
											value={label.options.position}
											options={[
												{ label: "Choose Position", value: "" },

												{ label: "Before Prefix", value: "beforePrefix" },
												{ label: "After Prefix", value: "afterPrefix" },
												{ label: "Before Postfix", value: "beforePostfix" },
												{ label: "After Postfix", value: "afterPostfix" },
											]}
											onChange={(newVal) => {
												var options = { ...label.options, position: newVal };
												setAttributes({
													label: { ...label, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={label}
										onChange={onChangeStyleLabel}
										onAdd={onAddStyleLabel}
										onRemove={onRemoveStyleLabel}
										onBulkAdd={onBulkAddLabel}
										onReset={onResetLabel}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={label}
										onChange={onPickCssLibraryLabel}
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
									<PanelRow className="my-4">
										<ToggleControl
											label="Enable Prefix?"
											className="my-4"
											help={
												prefixEnable ? "Prefix enabled" : "Prefix disabled."
											}
											checked={prefixEnable ? true : false}
											onChange={(e) => {
												var options = {
													...prefix.options,
													enable: prefix.options.enable ? false : true,
												};
												setAttributes({
													prefix: { ...prefix, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={prefix}
										onChange={onChangeStylePrefix}
										onAdd={onAddStylePrefix}
										onRemove={onRemoveStylePrefix}
										onBulkAdd={onBulkAddPrefix}
										onReset={onResetPrefix}
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
									<PanelRow className="my-4">
										<ToggleControl
											label="Enable Postfix?"
											className="my-4"
											help={
												postfixEnable ? "Postfix enabled" : "Postfix disabled."
											}
											checked={postfixEnable ? true : false}
											onChange={(e) => {
												var options = {
													...postfix.options,
													enable: postfix.options.enable ? false : true,
												};
												setAttributes({
													postfix: { ...postfix, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={postfix}
										onChange={onChangeStylePostfix}
										onAdd={onAddStylePostfix}
										onRemove={onRemoveStylePostfix}
										onBulkAdd={onBulkAddPostfix}
										onReset={onResetPostfix}
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
								blockName={"date-countdown"}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
							/>
						</PanelBody>

						<PGMailSubsctibe />
						<PGContactSupport
							utm={{
								utm_source: "BlockPostTitle",
								utm_campaign: "PostGridCombo",
								utm_content: "BlockOptions",
							}}
						/>
						<PGTutorials slug="date-countdown" />
					</div>
				</InspectorControls>

				<>
					{!hasInnerBlocks && (
						<div {...innerBlocksProps} className="flex justify-center my-4">
							<div className="border border-solid border-gray-300 w-[95%] rounded-md p-5">
								<div className="flex justify-between mb-5">
									<div className="text-xl rounded-sm">
										Click to pick a variation
									</div>

									<div
										className="pg-bg-color rounded-sm px-4 py-1 font-semibold text-lg text-white cursor-pointer"
										onClick={(ev) => {
											replaceInnerBlocks(
												clientId,
												createBlocksFromInnerBlocksTemplate([
													["post-grid/text", {}],
												]),
												true
											);
										}}>
										Skip
									</div>
								</div>

								<div className="">
									<PGBlockVariationsPicker
										blockName={"date-countdown"}
										blockId={blockId}
										clientId={clientId}
										onChange={onPickBlockVariation}
									/>
									{/* {variations.map((variation) => {
										return (
											// <div
											// 	className="text-center inline-block m-4 w-32 align-top p-4 bg-gray-400 cursor-pointer hover:bg-gray-500 relative"
											// 	onClick={(ev) => {
											// 		if (variation.isPro) {
											// 			alert(
											// 				"Sorry this variation only vailable in pro version"
											// 			);
											// 			return false;
											// 		}

											// 		var atts = variation.atts;

											// 		var wrapper = { ...atts.wrapper };
											// 		var countdownWrapper = { ...atts.countdownWrapper };
											// 		var dateCountdown = { ...atts.dateCountdown };
											// 		var scheduleTime = { ...atts.scheduleTime };

											// 		var scheduleTimeXX = Object.entries(scheduleTime).map(
											// 			(arg) => {
											// 				return arg[1];
											// 			}
											// 		);

											// 		var inner = { ...atts.inner };
											// 		var items = { ...atts.items };
											// 		var dayWrap = { ...atts.dayWrap };
											// 		var day = { ...atts.day };
											// 		var hourWrap = { ...atts.hourWrap };
											// 		var hour = { ...atts.hour };
											// 		var minuteWrap = { ...atts.minuteWrap };
											// 		var minute = { ...atts.minute };
											// 		var secondWrap = { ...atts.secondWrap };
											// 		var second = { ...atts.second };
											// 		var separator = { ...atts.separator };
											// 		var label = { ...atts.label };
											// 		var count = { ...atts.count };
											// 		var prefix = { ...atts.prefix };
											// 		var postfix = { ...atts.postfix };
											// 		var icon = { ...atts.icon };
											// 		var expiredArg = { ...atts.expiredArg };

											// 		var blockCssY = { ...atts.blockCssY };

											// 		var blockCssObj = {};

											// 		blockCssObj[wrapperSelector] = wrapper;
											// 		blockCssObj[countdownWrapperSelector] =
											// 			countdownWrapper;
											// 		blockCssObj[innerSelector] = inner;
											// 		blockCssObj[itemsSelector] = items;
											// 		blockCssObj[dayWrapSelector] = dayWrap;
											// 		blockCssObj[daySelector] = day;
											// 		blockCssObj[hourWrapSelector] = hourWrap;
											// 		blockCssObj[hourSelector] = hour;
											// 		blockCssObj[minuteWrapSelector] = minuteWrap;
											// 		blockCssObj[minuteSelector] = minute;
											// 		blockCssObj[secondWrapSelector] = secondWrap;
											// 		blockCssObj[secondSelector] = second;
											// 		blockCssObj[separatorSelector] = separator;
											// 		blockCssObj[labelSelector] = label;
											// 		blockCssObj[countSelector] = count;
											// 		blockCssObj[prefixSelector] = prefix;
											// 		blockCssObj[postfixSelector] = postfix;

											// 		setAttributes({
											// 			wrapper: wrapper,
											// 			dateCountdown: dateCountdown,
											// 			scheduleTime: scheduleTimeXX,
											// 			countdownWrapper: countdownWrapper,
											// 			inner: inner,
											// 			items: items,
											// 			dayWrap: dayWrap,
											// 			day: day,
											// 			hourWrap: hourWrap,
											// 			hour: hour,
											// 			minuteWrap: minuteWrap,
											// 			minute: minute,
											// 			secondWrap: secondWrap,
											// 			second: second,
											// 			icon: icon,
											// 			label: label,
											// 			count: count,
											// 			separator: separator,
											// 			prefix: prefix,
											// 			postfix: postfix,
											// 			expiredArg: expiredArg,
											// 		});

											// 		var blockCssRules =
											// 			myStore.getBlockCssRules(blockCssObj);

											// 		var items = blockCssRules;

											// 		setAttributes({ blockCssY: { items: items } });

											// 		replaceInnerBlocks(
											// 			clientId,
											// 			createBlocksFromInnerBlocksTemplate(
											// 				variation.innerBlocks
											// 			),
											// 			true
											// 		);
											// 	}}>
											// 	<div>{variation.icon}</div>
											// 	<div>{variation.title}</div>

											// 	{variation.isPro && (
											// 		<span className="bg-amber-400 rounded-sm text-sm inline-block  bg-opacity-90 text-white hover:text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
											// 			<a
											// 				target="_blank"
											// 				className="block px-3"
											// 				href={
											// 					"https://getpostgrid.com/pricing/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=" +
											// 					x.label
											// 				}>
											// 				Pro
											// 			</a>
											// 		</span>
											// 	)}
											// </div>
											
										);
									})} */}
								</div>
							</div>
						</div>
					)}
					{hasInnerBlocks && (
						<div {...innerBlocksProps}>
							{!editMode && (
								<div
									className="text-center inline-block mx-auto"
									onClick={(e) => {
										setAttributes({ editMode: editMode ? false : true });
									}}>
									Enable Edit Mode
								</div>
							)}

							{editMode && (
								<>
									{wrapper.options.tag && (
										<div className="countdown-wrapper">
											{iconEnable && (
												<span
													className={icon.options.class}
													dangerouslySetInnerHTML={{ __html: iconHtml }}
												/>
											)}
											{dayEnable && (
												<div
													className={`${items.options.class} ${dayWrap.options.class}`}>
													{labelEnable &&
														label.options.position == "beforePrefix" && (
															<span className={label.options.class}>
																{day.options.label}
															</span>
														)}
													{prefixEnable && (
														<span className={prefix.options.class}>
															{day.options.prefix}
														</span>
													)}

													{labelEnable &&
														label.options.position == "afterPrefix" && (
															<span className={label.options.class}>
																{day.options.label}
															</span>
														)}

													<span
														className={`${day.options.class} ${count.options.class} `}>
														{dateCountdown.options.type == "fixed" && (
															<>{remindDay}</>
														)}
														{dateCountdown.options.type == "everGreen" && (
															<>{remindDays}</>
														)}
														{dateCountdown.options.type == "scheduled" && (
															<>00</>
														)}
														{/* {remindDay} */}
													</span>

													{labelEnable &&
														label.options.position == "beforePostfix" && (
															<span className={label.options.class}>
																{day.options.label}
															</span>
														)}
													{postfixEnable && (
														<span className={postfix.options.class}>
															{day.options.postfix}
														</span>
													)}

													{labelEnable &&
														label.options.position == "afterPostfix" && (
															<span className={label.options.class}>
																{day.options.label}
															</span>
														)}
													{separatorEnable &&
														separator.options.position == "afterPostfix" && (
															<span className={separator.options.class}>
																{separator.options.text}
															</span>
														)}
												</div>
											)}

											{dayEnable &&
												separatorEnable &&
												separator.options.position == "afterEachItems" && (
													<span className={separator.options.class}>
														{separator.options.text}
													</span>
												)}

											{hourEnable && (
												<div
													className={`${items.options.class} ${hourWrap.options.class}`}>
													{labelEnable &&
														label.options.position == "beforePrefix" && (
															<span className={label.options.class}>
																{hour.options.label}
															</span>
														)}
													{prefixEnable && (
														<span className={prefix.options.class}>
															{hour.options.prefix}
														</span>
													)}
													{labelEnable &&
														label.options.position == "afterPrefix" && (
															<span className={label.options.class}>
																{hour.options.label}
															</span>
														)}
													<span
														className={`${hour.options.class} ${count.options.class} `}>
														{dateCountdown.options.type == "fixed" && (
															<>{remindHour}</>
														)}
														{dateCountdown.options.type == "everGreen" && (
															<>{remindHours}</>
														)}
														{dateCountdown.options.type == "scheduled" && (
															<>00</>
														)}
													</span>

													{labelEnable &&
														label.options.position == "beforePostfix" && (
															<span className={label.options.class}>
																{hour.options.label}
															</span>
														)}
													{postfixEnable && (
														<span className={postfix.options.class}>
															{hour.options.postfix}
														</span>
													)}
													{labelEnable &&
														label.options.position == "afterPostfix" && (
															<span className={label.options.class}>
																{hour.options.label}
															</span>
														)}
													{separatorEnable &&
														separator.options.position == "afterPostfix" && (
															<span className={separator.options.class}>
																{separator.options.text}
															</span>
														)}
												</div>
											)}

											{hourEnable &&
												separatorEnable &&
												separator.options.position == "afterEachItems" && (
													<span className={separator.options.class}>
														{separator.options.text}
													</span>
												)}

											{minuteEnable && (
												<div
													className={`${items.options.class} ${minuteWrap.options.class}`}>
													{labelEnable &&
														label.options.position == "beforePrefix" && (
															<span className={label.options.class}>
																{minute.options.label}
															</span>
														)}
													{prefixEnable && (
														<span className={prefix.options.class}>
															{minute.options.prefix}
														</span>
													)}
													{labelEnable &&
														label.options.position == "afterPrefix" && (
															<span className={label.options.class}>
																{minute.options.label}
															</span>
														)}
													<span
														className={`${minute.options.class} ${count.options.class} `}>
														{dateCountdown.options.type == "fixed" && (
															<>{remindMinute}</>
														)}
														{dateCountdown.options.type == "everGreen" && (
															<>{remindMinutes}</>
														)}
														{dateCountdown.options.type == "scheduled" && (
															<>00</>
														)}
													</span>
													{labelEnable &&
														label.options.position == "beforePostfix" && (
															<span className={label.options.class}>
																{minute.options.label}
															</span>
														)}
													{postfixEnable && (
														<span className={postfix.options.class}>
															{minute.options.postfix}
														</span>
													)}
													{labelEnable &&
														label.options.position == "afterPostfix" && (
															<span className={label.options.class}>
																{minute.options.label}
															</span>
														)}
													{separatorEnable &&
														separator.options.position == "afterPostfix" && (
															<span className={separator.options.class}>
																{separator.options.text}
															</span>
														)}
												</div>
											)}

											{minuteEnable &&
												separatorEnable &&
												separator.options.position == "afterEachItems" && (
													<span className={separator.options.class}>
														{separator.options.text}
													</span>
												)}

											{secondEnable && (
												<div
													className={`${items.options.class} ${secondWrap.options.class}`}>
													{labelEnable &&
														label.options.position == "beforePrefix" && (
															<span className={label.options.class}>
																{second.options.label}
															</span>
														)}
													{prefixEnable && (
														<span className={prefix.options.class}>
															{second.options.prefix}
														</span>
													)}
													{labelEnable &&
														label.options.position == "afterPrefix" && (
															<span className={label.options.class}>
																{second.options.label}
															</span>
														)}
													<span
														className={`${second.options.class} ${count.options.class} `}>
														{dateCountdown.options.type == "fixed" && (
															<>{remindSecond}</>
														)}
														{dateCountdown.options.type == "everGreen" && (
															<>{remindSeconds}</>
														)}
														{dateCountdown.options.type == "scheduled" && (
															<>00</>
														)}
													</span>
													{labelEnable &&
														label.options.position == "beforePostfix" && (
															<span className={label.options.class}>
																{second.options.label}
															</span>
														)}
													{postfixEnable && (
														<span className={postfix.options.class}>
															{second.options.postfix}
														</span>
													)}
													{labelEnable &&
														label.options.position == "afterPostfix" && (
															<span className={label.options.class}>
																{second.options.label}
															</span>
														)}
												</div>
											)}
										</div>
									)}
									{innerEnable && (
										<div className="inner">{innerBlocksProps.children}</div>
									)}
								</>
							)}
						</div>
					)}
				</>
			</>
		);
	},

	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file

		var attributes = props.attributes;
		var wrapper = attributes.wrapper;

		var blockId = attributes.blockId;

		const blockProps = useBlockProps.save({
			className: ` ${blockId} ${wrapper.options.class}`,
		});

		return <InnerBlocks.Content />;

		//return null;
	},
});
