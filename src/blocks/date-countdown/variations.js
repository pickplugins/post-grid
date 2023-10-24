/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { applyFilters } from "@wordpress/hooks";

let isProFeature = applyFilters("isProFeature", true);

/**
 * Template option choices for predefined columns layouts.
 */
const variations = [
	{
		name: "preset-1",
		title: __("preset-1"),
		description: __("preset-1"),

		isPro: false,
		atts: {
			wrapper: {
				options: {
					tag: "div",
					class: "",
				},
				styles: {},
			},
			dateCountdown: {
				options: {
					tag: "div",
					class: "",
					type: "fixed",
					endDate: "2023-11-05T13:17",
					startDate: "2023-10-00T15:11",
					endDateSrc: "",
					startDateSrc: "",
					everGreenTime: { day: "1", hour: "1", minute: "10", second: "" },
					scheduleTime: [{ startTime: "", endTime: "", weekdays: [] }],
					durationMinute: "10",
				},
			},
			scheduleTime: [
				{
					startTime: "05:11",
					endTime: "20:58",
					weekdays: { value: 3, values: [0, 4], compare: "=" },
					chosen: false,
					selected: false,
				},
			],
			countdownWrapper: {
				styles: {
					color: {},
					backgroundColor: { Desktop: "#9DD6DF" },
					display: { Desktop: "flex" },
					alignItems: { Desktop: "center" },
					justifyContent: { Desktop: "center" },
					width: { Desktop: "max-content" },
					borderRadius: { Desktop: "20px 20px 20px 20px" },
					padding: { Desktop: "30px 30px 30px 30px" },
					gap: { Desktop: "20px" },
					marginRight: { Desktop: "auto" },
					marginLeft: { Desktop: "auto" },
				},
			},
			inner: {
				options: { enable: true, tag: "div", class: "" },
				styles: { display: {} },
			},
			items: {
				options: {
					tag: "div",
					class: "items",
					secondEnable: true,
					minuteEnable: true,
					hourEnable: true,
					dayEnable: true,
				},
				styles: {
					textAlign: [],
					color: { Desktop: "#000000" },
					padding: [],
					margin: { Desktop: "0px 0px 0px 0px !important" },
					display: [],
					fontSize: { Desktop: "30px" },
					lineHeight: [],
					letterSpacing: [],
					fontFamily: { Desktop: "Righteous" },
					fontWeight: { Desktop: "600" },
					textDecoration: [],
					textTransform: [],
					fontStyle: { Desktop: "normal" },
				},
			},
			secondWrap: {
				options: {
					enable: true,
					tag: "div",
					class: "second-wrapper",
					label: "",
					prefix: "",
				},
				styles: { color: { Desktop: "" }, fontSize: { Desktop: "" } },
			},
			second: {
				styles: {
					color: { Desktop: "#d9eaf2" },
					backgroundColor: { Desktop: "#18978F" },
					padding: { Desktop: "20px 20px 20px 20px" },
					margin: [],
					backgroundImage: [],
					textDecoration: { Desktop: "none #000000 wavy 1px" },
					borderBottom: [],
					transition: { Desktop: "all 0.4s ease 0s" },
					fontSize: { Desktop: "5rem" },
					fontWeight: { Desktop: "700" },
					textShadow: { Desktop: "5px 5px 0px #4d4d4d" },
					display: { Desktop: "flex" },
					flexDirection: { Desktop: "column" },
					alignItems: { Desktop: "center" },
					borderRadius: { Desktop: "10px 10px 10px 10px" },
				},
				options: {
					tag: "div",
					class: "second-countdown",
					label: "Seconds",
					prefix: "",
					postfix: "",
					enable: true,
				},
			},
			minuteWrap: {
				options: {
					enable: true,
					tag: "div",
					class: "minute-wrapper",
					label: "",
					prefix: "",
				},
				styles: { color: { Desktop: "" }, fontSize: { Desktop: "" } },
			},
			minute: {
				styles: {
					color: { Desktop: "#d9eaf2" },
					backgroundColor: { Desktop: "#18978F" },
					padding: { Desktop: "20px 20px 20px 20px" },
					margin: [],
					backgroundImage: [],
					textDecoration: { Desktop: "none #000000 wavy 1px" },
					borderBottom: [],
					transition: { Desktop: "all 0.4s ease 0s" },
					fontSize: { Desktop: "5rem" },
					fontWeight: { Desktop: "700" },
					textShadow: { Desktop: "5px 5px 0px #4d4d4d" },
					display: { Desktop: "flex" },
					flexDirection: { Desktop: "column" },
					alignItems: { Desktop: "center" },
					borderRadius: { Desktop: "10px 10px 10px 10px" },
				},
				options: {
					tag: "div",
					class: "minute-countdown",
					label: "Minutes",
					prefix: "",
					postfix: "",
					enable: true,
				},
			},
			hourWrap: {
				options: {
					enable: true,
					tag: "div",
					class: "hour-wrapper",
					label: "",
					prefix: "",
				},
				styles: { color: { Desktop: "" }, fontSize: { Desktop: "" } },
			},
			hour: {
				styles: {
					color: { Desktop: "#d9eaf2" },
					backgroundColor: { Desktop: "#18978F" },
					padding: { Desktop: "20px 20px 20px 20px" },
					margin: [],
					backgroundImage: [],
					textDecoration: { Desktop: "none #000000 wavy 1px" },
					borderBottom: [],
					transition: { Desktop: "all 0.4s ease 0s" },
					fontSize: { Desktop: "5rem" },
					fontWeight: { Desktop: "700" },
					textShadow: { Desktop: "5px 5px 0px #4d4d4d" },
					display: { Desktop: "flex" },
					flexDirection: { Desktop: "column" },
					alignItems: { Desktop: "center" },
					borderRadius: { Desktop: "10px 10px 10px 10px" },
				},
				options: {
					tag: "div",
					class: "hour-countdown",
					label: "Hours",
					prefix: "",
					postfix: "",
					enable: true,
				},
			},
			dayWrap: {
				options: {
					enable: true,
					tag: "div",
					class: "day-wrapper",
					label: "",
					prefix: "",
				},
				styles: {
					textAlign: [],
					color: {},
					padding: [],
					margin: {},
					display: [],
					fontSize: {},
					lineHeight: [],
					letterSpacing: [],
					fontFamily: {},
					fontWeight: {},
					textDecoration: [],
					textTransform: [],
					fontStyle: {},
				},
			},
			day: {
				styles: {
					color: { Desktop: "#d9eaf2" },
					backgroundColor: { Desktop: "#18978F" },
					padding: { Desktop: "20px 20px 20px 20px" },
					margin: [],
					backgroundImage: [],
					textDecoration: { Desktop: "none #000000 wavy 1px" },
					borderBottom: [],
					transition: { Desktop: "all 0.4s ease 0s" },
					fontSize: { Desktop: "5rem" },
					fontWeight: { Desktop: "700" },
					textShadow: { Desktop: "5px 5px 0px #4d4d4d" },
					display: { Desktop: "flex" },
					flexDirection: { Desktop: "column" },
					alignContent: {},
					alignItems: { Desktop: "center" },
					borderRadius: { Desktop: "10px 10px 10px 10px" },
				},
				options: {
					tag: "div",
					class: "day-countdown",
					label: "Days",
					prefix: "",
					postfix: "",
					enable: true,
				},
			},
			icon: {
				options: {
					enable: false,
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "far fa-calendar-alt",
					position: "",
					class: "date-countdown-icon",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					fontSize: { Desktop: "" },
				},
			},
			separator: {
				options: { text: ":", class: "separator", position: "afterEachItems" },
				styles: {
					color: { Desktop: "#d9eaf2" },
					backgroundColor: [],
					padding: [],
					margin: [],
					backgroundImage: [],
					textDecoration: { Desktop: "none #000000 wavy 1px" },
					borderBottom: [],
					transition: { Desktop: "all 0.4s ease 0s" },
					fontSize: { Desktop: "5rem" },
					fontWeight: { Desktop: "700" },
					textShadow: { Desktop: "5px 5px 0px #4d4d4d" },
				},
				hover: {
					borderBottom: [],
					color: { Desktop: "#ffffff" },
					backgroundColor: [],
					boxShadow: [],
					textShadow: { Desktop: "6px 6px 0px #252424" },
				},
			},
			label: {
				options: { enable: true, text: "", class: "label", position: "" },
				styles: { color: { Desktop: "" }, backgroundColor: { Desktop: "" } },
			},
			prefix: {
				options: { text: "", class: "prefix" },
				styles: { color: { Desktop: "#DFBB9D" }, backgroundColor: {} },
			},
			postfix: {
				options: { text: "", class: "postfix" },
				styles: {
					color: {},
					backgroundColor: {},
					fontSize: { Desktop: "30px" },
				},
			},
			expiredArg: {},

			blockId: "",
			customCss: "",
			blockCssY: { items: {} },
		},
		innerBlocks: [["post-grid/text", {}]],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 236">
				<rect
					fill="#bcbec0"
					x="16.02"
					y="29.98"
					width="302.52"
					height="201.47"
					rx="0.73"
				/>
				<circle fill="#939598" cx="318.54" cy="29.98" r="25.44" />
				<path
					fill="#fff"
					d="M320.11,30l9.54-9.54a1.12,1.12,0,0,0,0-1.57,1.1,1.1,0,0,0-1.56,0l-9.55,9.55L309,18.87a1.1,1.1,0,0,0-1.56,0,1.12,1.12,0,0,0,0,1.57L317,30l-9.55,9.55a1.12,1.12,0,0,0,0,1.57,1.13,1.13,0,0,0,.78.32,1.1,1.1,0,0,0,.78-.32l9.55-9.55,9.55,9.55a1.11,1.11,0,1,0,1.56-1.57Z"
				/>
			</svg>
		),
	},
];

export default variations;
