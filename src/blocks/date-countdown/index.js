import { registerBlockType } from "@wordpress/blocks";
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

import IconToggle from "../../components/icon-toggle";
import Typography from "../../components/typography";
import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";
import BreakpointToggle from "../../components/breakpoint-toggle";
import colorsPresets from "../../colors-presets";
import PGDropdown from "../../components/dropdown";
import PGIconPicker from "../../components/icon-picker";
import PGcssDisplay from "../../components/css-display";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import PGCssLibrary from "../../components/css-library";
import variations from "./variations";

var myStore = wp.data.select("postgrid-shop");

registerBlockType("post-grid/date-countdown", {
	apiVersion: 2,
	title: "Date Countdown",

	icon: {
		// Specifying a background color to appear with the icon e.g.: in the inserter.
		background: "#fff",
		// Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
		foreground: "#fff",
		// Specifying an icon for the block
		src: (
			<svg
				id="Layer_1"
				data-name="Layer 1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 36 36">
				<path
					fill="#8db1ff"
					d="M19.4,10.05V9.24l1-1C22.91,5.89,24,4.64,24,3.18a1.73,1.73,0,0,0-1.92-1.9,3.33,3.33,0,0,0-2.06.82l-.42-.92a4.24,4.24,0,0,1,2.74-1,2.73,2.73,0,0,1,3,2.82c0,1.79-1.3,3.24-3.34,5.2l-.77.72V9h4.35v1.09Z"
				/>
				<path
					fill="#1d4ed8"
					d="M3.33,14.39h0l-1.69.91-.25-1,2.11-1.13H4.6v9.69H3.33Z"
				/>
				<path
					fill="#1d4ed8"
					d="M9.65,22.86v-.81l1-1c2.47-2.35,3.59-3.6,3.6-5.07a1.72,1.72,0,0,0-1.92-1.89,3.33,3.33,0,0,0-2.06.82L9.89,14a4.22,4.22,0,0,1,2.74-1,2.72,2.72,0,0,1,3,2.82c0,1.79-1.29,3.23-3.33,5.2l-.78.72v0h4.35v1.09Z"
				/>
				<path
					fill="#1d4ed8"
					d="M19.83,21.41A4.36,4.36,0,0,0,22,22c1.69,0,2.21-1.07,2.2-1.88,0-1.35-1.24-1.94-2.51-1.94h-.73v-1h.73c1,0,2.16-.49,2.16-1.64,0-.77-.49-1.46-1.7-1.46a3.51,3.51,0,0,0-1.93.64l-.35-.95a4.64,4.64,0,0,1,2.54-.75c1.9,0,2.77,1.14,2.77,2.31a2.41,2.41,0,0,1-1.79,2.28v0a2.53,2.53,0,0,1,2.16,2.49c0,1.55-1.21,2.91-3.53,2.91a4.86,4.86,0,0,1-2.52-.66Z"
				/>
				<path
					fill="#8db1ff"
					d="M22.93,35.81V33.17h-4.5V32.3l4.32-6.18h1.42v6h1.35v1H24.17v2.64Zm0-3.67V28.9c0-.5,0-1,0-1.52h0c-.3.57-.54,1-.81,1.43l-2.37,3.3v0Z"
				/>
				<path
					fill="#1d4ed8"
					d="M32.05,13.41,34.63,16l-.42.42-1.82-1.83,0,0v8h-.63V14.61L29.9,16.46,29.46,16Z"
				/>
			</svg>
		),
	},

	attributes: {
		wrapper: {
			type: "object",
			default: {
				options: {
					tag: "div",
					class: "",
					startDate: "",
					endDate: "",
					startDateSrc: "",
					endDateSrc: "",
				},

				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
				},
			},
		},
		dateCountdown: {
			type: "object",
			default: {
				options: {
					tag: "div",
					class: "",
					type: "fixed",
					everGreenTime: {
						day: "",
						hour: "",
						minute: "",
						second: "",
					},
					scheduleTime: [
						{
							startTime: "",
							endTime: "",
							weekdays: [],
						},
						// {
						//   id: "sEndTime",
						//   label: "End Time",
						//   sEndTime: "",
						// },
					],
				},
			},
		},

		scheduleTime: {
			type: "array",
			default: [
				{
					startTime: "",
					endTime: "",
					weekdays: {
						value: "0",
						values: [],
						compare: "=",
					},
				},
			],
		},
		countdownWrapper: {
			type: "object",
			default: {
				options: { tag: "div", class: "" },

				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
				},
			},
		},
		inner: {
			type: "object",
			default: {
				options: { enable: true, tag: "div", class: "" },

				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
				},
			},
		},

		items: {
			type: "object",
			default: {
				options: {
					tag: "div",
					class: "items",
					secondEnable: true,
					minuteEnable: true,
					hourEnable: true,
					dayEnable: true,
				},
				styles: {
					color: { Desktop: "" },
					fontSize: { Desktop: "" },
				},
			},
		},
		secondWrap: {
			type: "object",
			default: {
				options: {
					enable: true,
					tag: "div",
					class: "second-wrapper",
					label: "",
					prefix: "",
					prefix: "",
				},

				styles: {
					color: { Desktop: "" },
					fontSize: { Desktop: "" },
				},
			},
		},
		second: {
			type: "object",
			default: {
				options: {
					enable: true,
					tag: "div",
					class: "second-countdown",
					label: "",
					prefix: "",
					prefix: "",
				},

				styles: {
					color: { Desktop: "" },
					fontSize: { Desktop: "" },
				},
			},
		},
		minuteWrap: {
			type: "object",
			default: {
				options: {
					enable: true,
					tag: "div",
					class: "minute-wrapper",
					label: "",
					prefix: "",
					prefix: "",
				},

				styles: {
					color: { Desktop: "" },
					fontSize: { Desktop: "" },
				},
			},
		},
		minute: {
			type: "object",
			default: {
				options: {
					enable: true,
					tag: "div",
					class: "minute-countdown",
					label: "",
					prefix: "",
					prefix: "",
				},

				styles: {
					color: { Desktop: "" },
					fontSize: { Desktop: "" },
				},
			},
		},
		hourWrap: {
			type: "object",
			default: {
				options: {
					enable: true,
					tag: "div",
					class: "hour-wrapper",
					label: "",
					prefix: "",
					prefix: "",
				},

				styles: {
					color: { Desktop: "" },
					fontSize: { Desktop: "" },
				},
			},
		},
		hour: {
			type: "object",
			default: {
				options: {
					enable: true,
					tag: "div",
					class: "hour-countdown",
					label: "",
					prefix: "",
					prefix: "",
				},

				styles: {
					color: { Desktop: "" },
					fontSize: { Desktop: "" },
				},
			},
		},
		dayWrap: {
			type: "object",
			default: {
				options: {
					enable: true,
					tag: "div",
					class: "day-wrapper",
					label: "",
					prefix: "",
					prefix: "",
				},

				styles: {
					color: { Desktop: "" },
					fontSize: { Desktop: "" },
				},
			},
		},
		day: {
			type: "object",
			default: {
				options: {
					enable: true,
					tag: "div",
					class: "day-countdown",
					label: "",
					prefix: "",
					prefix: "",
				},

				styles: {
					color: { Desktop: "" },
					fontSize: { Desktop: "" },
				},
			},
		},

		icon: {
			type: "object",
			default: {
				options: {
					enable: false,
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "far fa-calendar-alt",
					position: "",
					/*before, after, prefix, postfix */ class: "date-countdown-icon",
				},

				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					fontSize: { Desktop: "" },
				},
			},
		},

		separator: {
			type: "object",
			default: {
				options: { enable: true, text: ":", class: "separator", position: "" },
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
				},
			},
		},
		label: {
			type: "object",
			default: {
				options: { enable: true, text: "", class: "label", position: "" },
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
				},
			},
		},

		prefix: {
			type: "object",
			default: {
				options: { enable: true, text: "", class: "prefix" },
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
				},
			},
		},

		postfix: {
			type: "object",
			default: {
				options: { enable: true, text: "", class: "postfix" },
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
				},
			},
		},

		customCss: {
			type: "string",
			default: "",
		},

		editMode: {
			type: "boolean",
			default: true,
		},

		expiredArg: {
			type: "object",
			default: {},
		},

		blockId: {
			type: "string",
			default: "",
		},
		blockCssY: {
			type: "object",
			default: { items: {} },
		},
	},
	usesContext: ["postId", "loopIndex", "postType", "queryId"],

	supports: {
		align: ["wide", "full"],
	},
	category: "post-grid",

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
		// console.log(scheduleTime);
		// var scheduleArg = attributes.scheduleArg;
		var wrapper = attributes.wrapper;
		var blockId = attributes.blockId;
		// console.log(scheduleArg);

		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var icon = attributes.icon;

		var separator = attributes.separator;
		var label = attributes.label;
		var prefix = attributes.prefix;
		var postfix = attributes.postfix;
		var customCss = attributes.customCss;
		var blockCssY = attributes.blockCssY;

		//const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
		var breakPointX = myStore.getBreakPoint();

		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		const countdownWrapperSelector = blockClass + " .countdown-wrapper";
		const labelSelector = blockClass + " .label";
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

		// var closeAnimateArgs = {
		//   backOutDown: { label: "backOutDown", value: "backOutDown" },
		//   backOutLeft: { label: "backOutLeft", value: "backOutLeft" },
		//   backOutRight: { label: "backOutRight", value: "backOutRight" },
		//   backOutUp: { label: "backOutUp", value: "backOutUp" },
		//   bounceOut: { label: "bounceOut", value: "bounceOut" },
		//   bounceOutDown: { label: "bounceOutDown", value: "bounceOutDown" },
		//   bounceOutLeft: { label: "bounceOutLeft", value: "bounceOutLeft" },
		//   bounceOutRight: { label: "bounceOutRight", value: "bounceOutRight" },
		//   bounceOutUp: { label: "bounceOutUp", value: "bounceOutUp" },
		//   fadeOut: { label: "fadeOut", value: "fadeOut" },
		//   fadeOutDown: { label: "fadeOutDown", value: "fadeOutDown" },
		//   fadeOutDownBig: { label: "fadeOutDownBig", value: "fadeOutDownBig" },
		//   fadeOutLeft: { label: "fadeOutLeft", value: "fadeOutLeft" },
		//   fadeOutLeftBig: { label: "fadeOutLeftBig", value: "fadeOutLeftBig" },
		//   fadeOutRight: { label: "fadeOutRight", value: "fadeOutRight" },
		//   fadeOutRightBig: { label: "fadeOutRightBig", value: "fadeOutRightBig" },
		//   fadeOutUp: { label: "fadeOutUp", value: "fadeOutUp" },
		//   fadeOutUpBig: { label: "fadeOutUpBig", value: "fadeOutUpBig" },
		//   fadeOutTopLeft: { label: "fadeOutTopLeft", value: "fadeOutTopLeft" },
		//   fadeOutTopRight: { label: "fadeOutTopRight", value: "fadeOutTopRight" },
		//   fadeOutBottomRight: {
		//     label: "fadeOutBottomRight",
		//     value: "fadeOutBottomRight",
		//   },
		//   fadeOutBottomLeft: {
		//     label: "fadeOutBottomLeft",
		//     value: "fadeOutBottomLeft",
		//   },
		//   rotateOut: { label: "rotateOut", value: "rotateOut" },
		//   rotateOutDownLeft: {
		//     label: "rotateOutDownLeft",
		//     value: "rotateOutDownLeft",
		//   },
		//   rotateOutDownRight: {
		//     label: "rotateOutDownRight",
		//     value: "rotateOutDownRight",
		//   },
		//   rotateOutUpLeft: { label: "rotateOutUpLeft", value: "rotateOutUpLeft" },
		//   rotateOutUpRight: {
		//     label: "rotateOutUpRight",
		//     value: "rotateOutUpRight",
		//   },
		//   zoomOut: { label: "zoomOut", value: "zoomOut" },
		//   zoomOutDown: { label: "zoomOutDown", value: "zoomOutDown" },
		//   zoomOutLeft: { label: "zoomOutLeft", value: "zoomOutLeft" },
		//   zoomOutRight: { label: "zoomOutRight", value: "zoomOutRight" },
		//   zoomOutUp: { label: "zoomOutUp", value: "zoomOutUp" },
		//   slideOutDown: { label: "slideOutDown", value: "slideOutDown" },
		//   slideOutLeft: { label: "slideOutLeft", value: "slideOutLeft" },
		//   slideOutRight: { label: "slideOutRight", value: "slideOutRight" },
		//   slideOutUp: { label: "slideOutUp", value: "slideOutUp" },
		// };

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

		var visbleArgsBasic = {
			weekDays: {
				label: "is Week day",
				description: "Show when specific week days",
				args: { id: "weekDays", value: "", values: [], compare: "=" },
				isPro: true,
			},
		};
		let visbleArgs = applyFilters("pgFormvisbleArgs", visbleArgsBasic);

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
		// const [remindMiliSecond, setRemindMiliSecond] = useState(0);

		useEffect(() => {
			const dateInput1 = wrapper.options.startDate;
			const dateInput2 = wrapper.options.endDate;
			const currentDate = new Date();
			// const options = { year: "numeric", month: "2-digit", day: "2-digit" };
			// const formattedDate = currentDate.toLocaleDateString(undefined, options);

			var date1 = "";
			var date2 = "";
			var startDate = "";
			if (wrapper.options.startDateSrc?.length == 0) {
				date1 = new Date(dateInput1);
			} else {
				date1 =
					productData?.date_on_sale_from != null
						? new Date(productData.date_on_sale_from.date)
						: new Date(dateInput1);
			}

			if (wrapper.options.endDateSrc.length == 0) {
				date2 = new Date(dateInput2);
			} else {
				date2 =
					productData?.date_on_sale_to != null
						? new Date(productData.date_on_sale_to.date)
						: new Date(dateInput2);
			}

			//  date1 = new Date(dateInput1);
			if (currentDate > date1) {
				startDate = currentDate;
			} else if (currentDate < date1) {
				startDate = currentDate;
			} else {
				startDate = date1;
			}
			// const startDate = currentDate > date1 ? currentDate : date1;

			const timeDifference = date2 - startDate;
			setRemindTime(timeDifference);

			// Check if current date is less than date1
			if (currentDate < date1) {
				// If current date is less, set remindTime to 0 to prevent countdown
				setRemindTime(0);
			}
		}, [
			clientId,
			wrapper.options.startDate,
			wrapper.options.startDateSrc,
			wrapper.options.endDateSrc,
			wrapper.options.endDate,
		]);

		// Use the useEffect hook to update the remaining time every second
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
		}, [remindTime, wrapper.options.startDate, wrapper.options.endDate]);

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

			// console.log("end Time: ", endTime);
			const duration = endTime - currentTime;
			// console.log("duration: ", duration);
			setRemindTimes(duration);
		}, [dateCountdown.options.everGreenTime]);

		useEffect(() => {
			// console.log("first");

			if (remindTimes > 0) {
				const intervalId = setInterval(() => {
					const remindTimesX = remindTimes - 1000;
					setRemindTimes(remindTimesX);
					//console.log("remindTimesX", remindTimesX);
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

					// console.log("remindDay", remindDays);
					// console.log("remindHour", remindHours);
					// console.log("remindMinute", remindMinutes);
					// console.log("remindSecond", remindSeconds);
					// if (remindTimeX <= 0) {
					//   setRemindDay("0");
					//   setRemindHour("0");
					//   setRemindMinute("0");
					//   setRemindSecond("0");
					//   clearInterval(intervalId);
					// }
				}, 1000);

				return () => clearInterval(intervalId);
			}
		}, [remindTimes]);

		// Ever Green End

		// schedule time start

		// const [scheduleTimesDifference, setScheduleTimesDifference] = useState(0);
		// const [scheduleTimes, setScheduleTimes] = useState(0);
		// const [scheduleDays, setScheduleDays] = useState(0);
		// const [scheduleHours, setScheduleHours] = useState(0);
		// const [scheduleMinutes, setScheduleMinutes] = useState(0);
		// const [scheduleSeconds, setScheduleSeconds] = useState(0);
		// console.log("scheduleTimeDiff: ", scheduleTimesDifference);

		// scheduleTime.forEach((items) => {
		// 	console.log(items);
		// 	var startTime = items.startTime;
		// 	var endTime = items.endTime;
		// 	console.log(startTime, endTime);
		// 	// items.forEach((item) => {
		// 	if (items.weekdays?.compare == "=") {
		// 		const selectedWeekdays = parseInt(items.weekdays?.value);
		// 		// console.log("selectedWeekdays: ",selectedWeekdays)

		// 		const currentDayOfWeek = new Date().getDay();
		// 		// console.log("currentDayOfWeek: ",currentDayOfWeek)

		// 		if (selectedWeekdays === currentDayOfWeek) {
		// 			console.log(startTime);
		// 			console.log(endTime);

		// 			// useEffect(() => {
		// 			const date1 = new Date(`2000-01-01T${startTime || "00:00"}:00Z`);
		// 			const date2 = new Date(`2000-01-01T${endTime || "00:00"}:00Z`);
		// 			const timeDifference = date2 - date1;
		// 			console.log("timediff: ", timeDifference);
		// 			// setScheduleTimesDifference(timeDifference);
		// 			// }, [scheduleTime]);
		// 		} else {
		// 		}
		// 	}
		// 	// }
		// 	// )
		// });

		// useEffect(() => {
		// 	console.log("first:", scheduleTimesDifference);
		// }, [scheduleTimesDifference]);

		// if(scheduleTime.weekDays.compare == "="){
		// 	console.log("hello");
		// }

		// schedule time end

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

			var iconHtml = `<span class="${iconSrc}"></span>`;

			setIconHtml(iconHtml);
		}, [icon]);

		useEffect(() => {
			setAttributes({ blockId: blockIdX });

			// setAttributes({ numberCount: numberCount });
			// setAttributes({ wrapper: wrapper });

			myStore.generateBlockCss(blockCssY.items, blockId, customCss);
		}, [clientId]);

		// var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

		// for (var x in breakPoints) {

		//   var item = breakPoints[x];
		//   breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

		// }

		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId, customCss);
		}, [blockCssY]);

		useEffect(() => {
			setAttributes({ customCss: customCss });

			myStore.generateBlockCss(blockCssY.items, blockId, customCss);
		}, [customCss]);

		useEffect(() => {}, [second]);

		const CustomTag = `${wrapper.options.tag}`;
		const CustomTagPostTitle = `${second.options.tag}`;

		const blockProps = useBlockProps({
			className: ` ${blockId} pg-date-countdown`,
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
					<div className="px-3 ">
						<div className="pb-3 mb-4">
							<PanelRow className="my-4">
								<label for="">Date Countdown Type</label>

								<SelectControl
									// className="font-bold"
									label=""
									value={dateCountdown.options.type}
									options={[
										{ label: "Choose Type", value: "" },

										// { label: "Before Prefix", value: "beforePrefix" },
										// { label: "After Prefix", value: "afterPrefix" },
										{ label: "Fixed", value: "fixed" },
										{ label: "Ever Green", value: "everGreen" },
										{ label: "Scheduled", value: "scheduled" },
										// { label: "After Postfix", value: "afterPostfix" },
										// { label: "Before Link", value: "beforeLink" },
										// { label: "After Link", value: "afterLink" },
									]}
									onChange={(newVal) => {
										var options = {
											...dateCountdown.options,
											type: newVal,
										};
										setAttributes({
											dateCountdown: { ...dateCountdown, options: options },
										});
									}}
								/>
							</PanelRow>
							{dateCountdown.options.type == "fixed" && (
								<>
									{wrapper.options.startDateSrc?.length == 0 && (
										<PanelRow className="block mb-4">
											<label for="" className="font-bold mb-2 ">
												Start Date?
											</label>
											<br />
											<InputControl
												type="datetime-local"
												className="b-2"
												value={wrapper.options.startDate}
												onChange={(newVal) => {
													var options = {
														...wrapper.options,
														startDate: newVal,
													};
													setAttributes({
														wrapper: { ...wrapper, options: options },
													});
												}}
											/>
										</PanelRow>
									)}

									<PanelRow>
										<label for="">Start Date Source</label>
										<SelectControl
											label=""
											value={wrapper.options.startDateSrc}
											options={[
												{ label: "Choose", value: "" },
												{
													label: "WooCommerce Sale price dates",
													value: "wc_sale_price_date_from",
												},
												// { label: "H2", value: "h2" },
												// { label: "H3", value: "h3" },
												// { label: "H4", value: "h4" },
												// { label: "H5", value: "h5" },
												// { label: "H6", value: "h6" },
												// { label: "SPAN", value: "span" },
												// { label: "DIV", value: "div" },
												// { label: "P", value: "p" },
											]}
											onChange={(newVal) => {
												var options = {
													...wrapper.options,
													startDateSrc: newVal,
												};
												setAttributes({
													wrapper: { ...wrapper, options: options },
												});
											}}
										/>
									</PanelRow>

									{wrapper.options.endDateSrc.length == 0 && (
										<PanelRow className="block mb-2">
											<label for="" className="font-bold mb-2 ">
												End Date?
											</label>

											<InputControl
												type="datetime-local"
												className="mr-2"
												value={wrapper.options.endDate}
												onChange={(newVal) => {
													var options = { ...wrapper.options, endDate: newVal };
													setAttributes({
														wrapper: { ...wrapper, options: options },
													});
												}}
											/>
										</PanelRow>
									)}

									<PanelRow>
										<label for="">End Date Source</label>
										<SelectControl
											label=""
											value={wrapper.options.endDateSrc}
											options={[
												{ label: "Choose", value: "" },
												{
													label: "WooCommerce Sale price dates",
													value: "wc_sale_price_date_to",
												},
												// { label: "H2", value: "h2" },
												// { label: "H3", value: "h3" },
												// { label: "H4", value: "h4" },
												// { label: "H5", value: "h5" },
												// { label: "H6", value: "h6" },
												// { label: "SPAN", value: "span" },
												// { label: "DIV", value: "div" },
												// { label: "P", value: "p" },
											]}
											onChange={(newVal) => {
												var options = {
													...wrapper.options,
													endDateSrc: newVal,
												};
												setAttributes({
													wrapper: { ...wrapper, options: options },
												});
											}}
										/>
									</PanelRow>
								</>
							)}

							{dateCountdown.options.type == "everGreen" && (
								<>
									{/* {JSON.stringify(dateCountdown.options)} */}
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
									{/* {JSON.stringify(scheduled)} */}

									<PanelRow className="my-4">
										{/* <label for="">Add Media</label> */}
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
												//console.log("hello: ", scheduleTimeX);
												setAttributes({ scheduleTime: scheduleTimeX });
											}}>
											Add Media
										</div>
									</PanelRow>

									{scheduleTime.length == 0 && (
										<div className="bg-red-400 text-white my-3  px-3 py-2 text-center">
											No media added
										</div>
									)}
									{/* {JSON.stringify(scheduleTime)} */}

									<ReactSortable
										list={scheduleTime}
										handle={".handle"}
										setList={(item) => {
											setAttributes({ scheduleTime: scheduleTime });
										}}>
										{scheduleTime?.map((item, index) => (
											<div key={item.id} className="">
												<PanelBody
													title={
														<>
															<span
																className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																onClick={(ev) => {
																	var scheduleTimeX = [...scheduleTime];
																	scheduleTimeX.splice(index, 1);

																	//console.log("scheduleTimeX: ", scheduleTimeX);
																	//console.log("scheduleTime: ", scheduleTime);

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
														<label for="">startTime</label>
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
														<label for="">endTime</label>
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
													<PanelRow>
														<>
															<PanelRow>
																<label for="">Compare</label>
																<SelectControl
																	label=""
																	value={item.weekdays.compare}
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

															{(item.weekdays.compare == "=" ||
																item.weekdays.compare == "!=" ||
																item.weekdays.compare == ">" ||
																item.weekdays.compare == "<" ||
																item.weekdays.compare == ">=" ||
																item.weekdays.compare == "<=") && (
																<>
																	<PanelRow className="mb-4">
																		<label for="">Values</label>
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
															{(item.weekdays.compare == "between" ||
																item.weekdays.compare == "exist") && (
																// <>
																// 	<PanelRow className="mb-4">
																// 		<label for="">Values</label>
																// 		<PGDropdown
																// 			position="bottom right"
																// 			variant="secondary"
																// 			buttonTitle={"Choose Days"}
																// 			options={[
																// 				{ label: "Sunday", value: 0 },
																// 				{ label: "Monday", value: 1 },
																// 				{ label: "Tuesday", value: 2 },
																// 				{ label: "Wednesday", value: 3 },
																// 				{ label: "Thursday", value: 4 },
																// 				{ label: "Friday", value: 5 },
																// 				{ label: "Saturday", value: 6 },
																// 			]}
																// 			onChange={(newVal) => {
																// 				var scheduleTimeX = {
																// 					...scheduleTime,
																// 				};
																// 				scheduleTimeX[index].weekdays.values.join(newVal.value);
																// 				setAttributes({
																// 					scheduleTime: scheduleTimeX,
																// 				});
																// 			}}
																// 			value={item.weekdays.values}></PGDropdown>
																// 	</PanelRow>

																// 	<div>
																// 		{item.weekdays.values.map((x, i) => {
																// 			return (
																// 				<div className="flex justify-between my-1">
																// 					<span>{weekDayNumn[x].label}</span>
																// 					<span
																// 						className="bg-red-500 text-white p-1 cursor-pointer hover:"
																// 						onClick={(ev) => {
																// 							var scheduleTimeX = {
																// 								...scheduleTime,
																// 							};
																// 							item.weekdays.values.splice(i, 1);

																// 							scheduleTimeX[index].weekdays.values= item.weekdays.values;
																// 							setAttributes({
																// 								scheduleTime: scheduleTimeX,
																// 							});
																// 						}}>
																// 						<Icon fill="#fff" icon={close} />
																// 					</span>
																// 				</div>
																// 			);
																// 		})}
																// 	</div>
																// </>
																<>
																	<PanelRow className="mb-4">
																		<label htmlFor="">Values</label>
																		<PGDropdown
																			position="bottom right"
																			variant="secondary"
																			// buttonTitle={
																			// 	item.weekdays.values.length === 0
																			// 		? "Choose Days"
																			// 		: item.weekdays.values.map((value) => weekDayNumn[value].label).join(", ")
																			// }
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
													</PanelRow>
												</PanelBody>
											</div>
										))}
									</ReactSortable>
								</>
							)}
						</div>

						{/* visibility start */}

						<PanelBody title="Expired Arguments" initialOpen={true}>
							<div
								className="bg-blue-500 p-2 px-4 text-white inline-block cursor-pointer rounded-sm"
								onClick={(ev) => {
									var expiredArgX = { ...expiredArg };
									var index = Object.entries(expiredArgX).length;
									expiredArgX[index] = { logic: "OR", title: "", args: [] };
									setAttributes({ expiredArg: expiredArgX });
								}}>
								Add Group
							</div>

							<div class="my-4">
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
																			<label for="">Write URL</label>
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
																			<label for="">Delay</label>
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
																			<label for="">ID/Class</label>
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

						<PanelBody title="countdown Wrapper" initialOpen={false}>
							<PGtabs
								activeTab="options"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
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
								<PGtab name="styles">
									<PGStyles
										obj={countdownWrapper}
										onChange={onChangeStyleCountdownWrapper}
										onAdd={onAddStyleCountdownWrapper}
										onRemove={onRemoveStyleCountdownWrapper}
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

						<PanelBody title="Inner" initialOpen={false}>
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
									<ToggleControl
										label="Enable on Expired?"
										className="my-4"
										help={innerEnable ? "Inner enabled" : "Inner disabled."}
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

						<PanelBody title="Items" initialOpen={false}>
							<PGtabs
								activeTab="options"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
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
								<PGtab name="styles">
									<PGStyles
										obj={items}
										onChange={onChangeStyleItems}
										onAdd={onAddStyleItems}
										onRemove={onRemoveStyleItems}
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

						<PanelBody title="Second" initialOpen={false}>
							{/* <ToggleControl
                label="Enable Second?"
                className="my-4"
                help={secondEnable ? "Second enabled" : "Second disabled."}
                checked={secondEnable ? true : false}
                onChange={(e) => {
                  var options = {
                    ...second.options,
                    enable: second.options.enable ? false : true,
                  };
                  setAttributes({
                    second: { ...second, options: options },
                  });
                }}
              /> */}
							<PanelRow className="mb-4">
								<label for="">Label: </label>
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
								<label for="">Prefix: </label>
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
								<label for="">Postfix: </label>
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
							<PanelBody title="Second Wrap" initialOpen={false}>
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
									<PGtab name="styles">
										<PGStyles
											obj={secondWrap}
											onChange={onChangeStyleSecondWrap}
											onAdd={onAddStyleSecondWrap}
											onRemove={onRemoveStyleSecondWrap}
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
							<PanelBody title="Second Count" initialOpen={false}>
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
									<PGtab name="styles">
										<PGStyles
											obj={second}
											onChange={onChangeStyleSecondCountdown}
											onAdd={onAddStyleSecondCountdown}
											onRemove={onRemoveStyleSecondCountdown}
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

						<PanelBody title="Minute" initialOpen={false}>
							{/* <ToggleControl
                label="Enable Minute?"
                className="my-4"
                help={minuteEnable ? "Minute enabled" : "Minute disabled."}
                checked={minuteEnable ? true : false}
                onChange={(e) => {
                  var options = {
                    ...minute.options,
                    enable: minute.options.enable ? false : true,
                  };
                  setAttributes({
                    minute: { ...minute, options: options },
                  });
                }}
              /> */}
							<PanelRow className="my-4">
								<label for="">Label: </label>
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
								<label for="">Prefix: </label>
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
								<label for="">Postfix: </label>
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
							<PanelBody title="Minute Wrap" initialOpen={false}>
								<PGtabs
									activeTab="options"
									orientation="horizontal"
									activeClass="active-tab"
									onSelect={(tabName) => {}}
									tabs={[
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
									<PGtab name="styles">
										<PGStyles
											obj={minuteWrap}
											onChange={onChangeStyleMinuteWrap}
											onAdd={onAddStyleMinuteWrap}
											onRemove={onRemoveStyleMinuteWrap}
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
							<PanelBody title="Minute Count" initialOpen={false}>
								<PGtabs
									activeTab="options"
									orientation="horizontal"
									activeClass="active-tab"
									onSelect={(tabName) => {}}
									tabs={[
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
									<PGtab name="styles">
										<PGStyles
											obj={minute}
											onChange={onChangeStyleMinuteCountdown}
											onAdd={onAddStyleMinuteCountdown}
											onRemove={onRemoveStyleMinuteCountdown}
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

						<PanelBody title="Hour" initialOpen={false}>
							{/* <ToggleControl
                label="Enable Hour?"
                className="my-4"
                help={hourEnable ? "Hour enabled" : "Hour disabled."}
                checked={hourEnable ? true : false}
                onChange={(e) => {
                  var options = {
                    ...hour.options,
                    enable: hour.options.enable ? false : true,
                  };
                  setAttributes({
                    hour: { ...hour, options: options },
                  });
                }}
              /> */}
							<PanelRow className="my-4">
								<label for="">Label: </label>
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
								<label for="">Prefix: </label>
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
								<label for="">Postfix: </label>
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
							<PanelBody title="Hour Wrap" initialOpen={false}>
								<PGtabs
									activeTab="options"
									orientation="horizontal"
									activeClass="active-tab"
									onSelect={(tabName) => {}}
									tabs={[
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
									<PGtab name="styles">
										<PGStyles
											obj={hourWrap}
											onChange={onChangeStyleHourWrap}
											onAdd={onAddStyleHourWrap}
											onRemove={onRemoveStyleHourWrap}
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
							<PanelBody title="Hour Count" initialOpen={false}>
								<PGtabs
									activeTab="options"
									orientation="horizontal"
									activeClass="active-tab"
									onSelect={(tabName) => {}}
									tabs={[
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
									<PGtab name="styles">
										<PGStyles
											obj={hour}
											onChange={onChangeStyleHourCountdown}
											onAdd={onAddStyleHourCountdown}
											onRemove={onRemoveStyleHourCountdown}
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

						<PanelBody title="Day" initialOpen={false}>
							{/* <ToggleControl
                label="Enable Day?"
                className="my-4"
                help={dayEnable ? "Day enabled" : "Day disabled."}
                checked={dayEnable ? true : false}
                onChange={(e) => {
                  var options = {
                    ...day.options,
                    enable: day.options.enable ? false : true,
                  };
                  setAttributes({
                    day: { ...day, options: options },
                  });
                }}
              /> */}
							<PanelRow className="my-4">
								<label for="">Label: </label>
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
								<label for="">Prefix: </label>
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
								<label for="">Postfix: </label>
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
							<PanelBody title="Day Wrap" initialOpen={false}>
								<PGtabs
									activeTab="options"
									orientation="horizontal"
									activeClass="active-tab"
									onSelect={(tabName) => {}}
									tabs={[
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
									<PGtab name="styles">
										<PGStyles
											obj={dayWrap}
											onChange={onChangeStyleDayWrap}
											onAdd={onAddStyleDayWrap}
											onRemove={onRemoveStyleDayWrap}
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
							<PanelBody title="Day Count" initialOpen={false}>
								<PGtabs
									activeTab="options"
									orientation="horizontal"
									activeClass="active-tab"
									onSelect={(tabName) => {}}
									tabs={[
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
									<PGtab name="styles">
										<PGStyles
											obj={day}
											onChange={onChangeStyleDayCountdown}
											onAdd={onAddStyleDayCountdown}
											onRemove={onRemoveStyleDayCountdown}
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

						<PanelBody title="Icon" initialOpen={false}>
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
									<PanelRow className="my-4">
										<label for="">Choose Icon</label>

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

						<PanelBody title="Separator" initialOpen={false}>
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
									<PanelRow className="my-4">
										<label for="">Separator</label>

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

												// setAttributes({ prefix: { text: newVal, class: prefix.options.class, color: prefix.color, backgroundColor: prefix.backgroundColor } })
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
										<label for="">Separator position</label>

										<SelectControl
											label=""
											value={separator.options.position}
											options={[
												{ label: "Choose Position", value: "" },

												// { label: "Before Prefix", value: "beforePrefix" },
												// { label: "After Prefix", value: "afterPrefix" },
												// { label: "Before Prefix", value: "beforePrefix" },
												{ label: "After Postfix", value: "afterPostfix" },
												// { label: "Before Postfix", value: "beforePostfix" },
												{ label: "After Each Items", value: "afterEachItems" },
												// { label: "Before Link", value: "beforeLink" },
												// { label: "After Link", value: "afterLink" },
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
										onAdd={onRemoveStyleSeparator}
										onRemove={onAddStyleSeparator}
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

						<PanelBody title="Label" initialOpen={false}>
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
										<label for="">Label position</label>

										<SelectControl
											label=""
											value={label.options.position}
											options={[
												{ label: "Choose Position", value: "" },

												// { label: "Before Prefix", value: "beforePrefix" },
												// { label: "After Prefix", value: "afterPrefix" },
												{ label: "Before Prefix", value: "beforePrefix" },
												{ label: "After Prefix", value: "afterPrefix" },
												{ label: "Before Postfix", value: "beforePostfix" },
												{ label: "After Postfix", value: "afterPostfix" },
												// { label: "Before Link", value: "beforeLink" },
												// { label: "After Link", value: "afterLink" },
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

						<PanelBody title="Prefix" initialOpen={false}>
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
									{/* <PanelRow className="my-4">
                    <label for="">Prefix</label>

                    <InputControl
                      value={prefix.options.text}
                      onChange={(newVal) => {
                        var options = { ...prefix.options, text: newVal };
                        setAttributes({
                          prefix: { styles: prefix.styles, options: options },
                        });

                        // setAttributes({ prefix: { text: newVal, class: prefix.options.class, color: prefix.color, backgroundColor: prefix.backgroundColor } })
                      }}
                    />
                  </PanelRow> */}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={prefix}
										onChange={onChangeStylePrefix}
										onAdd={onAddStylePrefix}
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

						<PanelBody title="Postfix" initialOpen={false}>
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
									{/* <PanelRow className="my-4 ">
                    <label for="">Postfix</label>

                    <InputControl
                      value={postfix.options.text}
                      onChange={(newVal) => {
                        var options = { ...postfix.options, text: newVal };
                        setAttributes({
                          postfix: { ...postfix, options: options },
                        });

                        // setAttributes({ postfix: { text: newVal, class: prefix.options.class, color: postfix.color, backgroundColor: postfix.backgroundColor } })
                      }}
                    />
                  </PanelRow> */}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={postfix}
										onChange={onChangeStylePostfix}
										onAdd={onAddStylePostfix}
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

						<PanelBody title="Custom Style" initialOpen={false}>
							<p>
								Please use following class selector to apply your custom CSS
							</p>
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
										{secondSelector}
										{"{/* your CSS here*/}"}{" "}
									</code>
								</p>
							</div>

							<div className="my-3">
								<p className="font-bold">Prefix</p>
								<p>
									<code>
										{prefixSelector}
										{"{/* your CSS here*/}"}{" "}
									</code>
								</p>
							</div>

							<div className="my-3">
								<p className="font-bold">Postfix</p>
								<p>
									<code>
										{postfixSelector}
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

						<PGMailSubsctibe />
						<PGContactSupport
							utm={{
								utm_source: "BlockPostTitle",
								utm_campaign: "PostGridCombo",
								utm_content: "BlockOptions",
							}}
						/>
					</div>
				</InspectorControls>

				<>
					{/* <span>
						wrapper:{JSON.stringify(wrapper)},dateCountdown:
						{JSON.stringify(dateCountdown)},scheduleTime:
						{JSON.stringify(scheduleTime)},countdownWrapper:
						{JSON.stringify(countdownWrapper)},inner:{JSON.stringify(inner)}
						,items:{JSON.stringify(items)},secondWrap:
						{JSON.stringify(secondWrap)}
						,second:{JSON.stringify(second)},minuteWrap:
						{JSON.stringify(minuteWrap)},minute:{JSON.stringify(minute)}
						,hourWrap:
						{JSON.stringify(hourWrap)},hour:{JSON.stringify(hour)},dayWrap:
						{JSON.stringify(dayWrap)},day:{JSON.stringify(day)},icon:
						{JSON.stringify(icon)},separator:{JSON.stringify(separator)},label:
						{JSON.stringify(label)},prefix:{JSON.stringify(prefix)},postfix:
						{JSON.stringify(postfix)},expiredArg:
						{JSON.stringify(expiredArg)},
					</span> */}
					{!hasInnerBlocks && (
						<div {...innerBlocksProps}>
							<div className="border p-5">
								<div className="flex justify-between mb-5">
									<div className="text-xl rounded-sm">
										Click to pick a variation
									</div>

									<div
										className="bg-orange-400  hover:bg-orange-300 px-4 py-1 text-white cursor-pointer"
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
									{variations.map((variation) => {
										return (
											<div
												className="text-center inline-block m-4 w-32 align-top p-4 bg-gray-400 cursor-pointer hover:bg-gray-500 relative"
												onClick={(ev) => {
													if (variation.isPro) {
														alert(
															"Sorry this variation only vailable in pro version"
														);
														return false;
													}

													var atts = variation.atts;

													var wrapper = { ...atts.wrapper };
													var countdownWrapper = { ...atts.countdownWrapper };
													var inner = { ...atts.inner };
													var items = { ...atts.items };
													var dayWrap = { ...atts.dayWrap };
													var day = { ...atts.day };
													var hourWrap = { ...atts.hourWrap };
													var hour = { ...atts.hour };
													var minute = { ...atts.minute };
													var secondWrap = { ...atts.secondWrap };
													var second = { ...atts.second };
													var separator = { ...atts.separator };
													var label = { ...atts.label };
													var prefix = { ...atts.prefix };
													var postfix = { ...atts.postfix };

													var blockCssY = { ...atts.blockCssY };
													var customCss = { ...atts.customCss };

													var blockCssObj = {};

													blockCssObj[wrapperSelector] = wrapper;
													blockCssObj[countdownWrapperSelector] =
														countdownWrapper;
													blockCssObj[innerSelector] = inner;
													blockCssObj[itemsSelector] = items;
													blockCssObj[dayWrapSelector] = dayWrap;
													blockCssObj[daySelector] = day;
													blockCssObj[hourWrapSelector] = hourWrap;
													blockCssObj[hourSelector] = hour;
													blockCssObj[minuteWrapSelector] = minuteWrap;
													blockCssObj[minuteSelector] = minute;
													blockCssObj[secondWrapSelector] = secondWrap;
													blockCssObj[secondSelector] = second;
													blockCssObj[separatorSelector] = separator;
													blockCssObj[labelSelector] = label;
													blockCssObj[prefixSelector] = prefix;
													blockCssObj[postfixSelector] = postfix;

													setAttributes({
														wrapper: wrapper,
														dateCountdown: dateCountdown,
														scheduleTime: scheduleTime,
														countdownWrapper: countdownWrapper,
														inner: inner,
														items: items,
														dayWrap: dayWrap,
														day: day,
														hourWrap: hourWrap,
														hour: hour,
														minuteWrap: minuteWrap,
														minute: minute,
														secondWrap: secondWrap,
														second: second,
														icon: icon,
														label: label,
														separator: separator,
														prefix: prefix,
														postfix: postfix,
														expiredArg: expiredArg,
														customCss: customCss,
													});

													var blockCssRules =
														myStore.getBlockCssRules(blockCssObj);

													var items = { ...blockCssY.items, ...blockCssRules };

													setAttributes({ blockCssY: { items: items } });

													replaceInnerBlocks(
														clientId,
														createBlocksFromInnerBlocksTemplate(
															variation.innerBlocks
														),
														true
													);
												}}>
												<div>{variation.icon}</div>
												<div>{variation.title}</div>

												{variation.isPro && (
													<span className="bg-amber-400 rounded-sm text-sm inline-block  bg-opacity-90 text-white hover:text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
														<a
															target="_blank"
															className="block px-3"
															href={
																"https://pickplugins.com/post-grid/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=" +
																x.label
															}>
															Pro
														</a>
													</span>
												)}
											</div>
										);
									})}
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

													<span className={day.options.class}>
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
															<span class={separator.options.class}>
																{separator.options.text}
															</span>
														)}
												</div>
											)}

											{dayEnable &&
												separatorEnable &&
												separator.options.position == "afterEachItems" && (
													<span class={separator.options.class}>
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
													<span className={hour.options.class}>
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
															<span class={separator.options.class}>
																{separator.options.text}
															</span>
														)}
												</div>
											)}

											{hourEnable &&
												separatorEnable &&
												separator.options.position == "afterEachItems" && (
													<span class={separator.options.class}>
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
													<span className={minute.options.class}>
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
															<span class={separator.options.class}>
																{separator.options.text}
															</span>
														)}
												</div>
											)}

											{minuteEnable &&
												separatorEnable &&
												separator.options.position == "afterEachItems" && (
													<span class={separator.options.class}>
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
													<span className={second.options.class}>
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
			className: ` ${blockId} pg-date-countdown`,
		});

		return <InnerBlocks.Content />;

		//return null;
	},
});
