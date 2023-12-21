/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

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
			wrapper: { options: { tag: "div", class: "pg-tabs" }, styles: {} },
			navsWrap: {
				options: { class: "" },
				styles: {
					display: { Desktop: "flex" },
					justifyContent: { Desktop: "start" },
				},
			},
			navItem: {
				options: {
					viewType: "horizontal",
					position: "left",
					class: "",
					activeTab: "",
				},
				styles: {
					display: { Desktop: "flex" },
					color: { Desktop: "#ffffff" },
					padding: { Desktop: "5px 15px 5px 15px" },
					backgroundColor: { Desktop: "#3236ff" },
					margin: { Desktop: "0px 5px 0px 0px" },
					justifyContent: {},
					alignItems: { Desktop: "center" },
					cursor: { Desktop: "pointer" },
				},
			},
			activeNavItem: {
				options: {
					viewType: "horizontal",
					position: "left",
					class: "",
					activeTab: "",
				},
				styles: {
					backgroundColor: { Desktop: "#afb1ff" },
					display: { Desktop: "flex" },
					padding: { Desktop: "5px 15px 5px 15px" },
					margin: { Desktop: "0px 5px 0px 0px" },
					alignItems: { Desktop: "center" },
				},
			},
			navLabel: {
				options: {
					viewType: "horizontal",
					position: "left",
					class: "",
					activeTab: "",
				},
				styles: { padding: { Desktop: "0px 10px 0px 10px" } },
			},
			icon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-right",
					position: "before",
					class: "nav-icon nav-icon-idle",
				},
				styles: { fontSize: { Desktop: "20px" } },
			},
			iconToggle: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "before",
					class: "nav-icon-toggle nav-icon",
				},
				styles: { fontSize: { Desktop: "20px" } },
			},
			panelWrap: {
				options: { class: "" },
				styles: {
					backgroundColor: { Desktop: "#afb1ff" },
					padding: { Desktop: "10px 10px 10px 10px" },
					margin: { Desktop: "0px 0px 0px 0px" },
				},
			},
		},
		innerBlocks: [
			[
				"post-grid/tabs-nested-item",
				{
					wrapper: { options: { tag: "div", class: "pg-tabs" }, styles: {} },
					content: { options: { tag: "div", class: "" }, styles: {} },

					header: {
						options: { text: "Accordion Header", tag: "div", class: "" },
						styles: {},
					},
					icon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "before",
							class: "icon",
						},
						styles: {},
					},
					title: "Tab 1",
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 169.7">
				<defs></defs>
				<rect fill="#ffffff" width="109.1" height="37.04" />
				<path
					fill="#3c3c3b"
					d="M19.71,13.65a1.07,1.07,0,0,1,.82.38L27,21.61a1.08,1.08,0,0,1-.11,1.52A1.09,1.09,0,0,1,25.39,23l-5.68-6.63L14,23a1.09,1.09,0,0,1-1.53.11,1.07,1.07,0,0,1-.12-1.52L18.89,14A1.08,1.08,0,0,1,19.71,13.65Z"
				/>
				<rect fill="#3c3c3b" x="35.26" y="13.65" width="58.16" height="9.75" />
				<rect fill="#3c3c3b" x="128.7" width="109.1" height="37.04" />
				<path
					fill="#ffffff"
					d="M148.41,23.4a1.1,1.1,0,0,1-.82-.38l-6.5-7.58A1.09,1.09,0,0,1,142.74,14l5.67,6.62L154.09,14a1.08,1.08,0,1,1,1.64,1.41L149.23,23A1.07,1.07,0,0,1,148.41,23.4Z"
				/>
				<rect fill="#ffffff" x="163.96" y="13.65" width="58.16" height="9.75" />
				<rect fill="#3c3c3b" x="257.4" width="109.1" height="37.04" />
				<path
					fill="#ffffff"
					d="M277.11,23.4a1.1,1.1,0,0,1-.82-.38l-6.5-7.58a1.08,1.08,0,0,1,.12-1.53,1.07,1.07,0,0,1,1.52.12l5.68,6.62L282.79,14a1.08,1.08,0,1,1,1.64,1.41L277.93,23A1.07,1.07,0,0,1,277.11,23.4Z"
				/>
				<rect fill="#ffffff" x="292.66" y="13.65" width="58.16" height="9.75" />
				<rect fill="#ffffff" y="37.04" width="500" height="132.66" />
			</svg>
		),
	},
	{
		name: "preset-2",
		title: __("preset-2"),
		description: __("preset-2"),

		isPro: false,
		atts: {
			wrapper: { options: { tag: "div", class: "pg-tabs" }, styles: {} },
			navsWrap: {
				options: { class: "" },
				styles: {
					display: { Desktop: "flex" },
					justifyContent: { Desktop: "center" },
				},
			},
			navItem: {
				options: {
					viewType: "horizontal",
					position: "left",
					class: "",
					activeTab: "",
				},
				styles: {
					display: { Desktop: "flex" },
					color: { Desktop: "#ffffff" },
					padding: { Desktop: "5px 15px 5px 15px" },
					backgroundColor: { Desktop: "#3236ff" },
					margin: { Desktop: "0px 5px 0px 0px" },
					justifyContent: {},
					alignItems: { Desktop: "center" },
					cursor: { Desktop: "pointer" },
				},
			},
			activeNavItem: {
				options: {
					viewType: "horizontal",
					position: "left",
					class: "",
					activeTab: "",
				},
				styles: {
					backgroundColor: { Desktop: "#afb1ff" },
					display: { Desktop: "flex" },
					padding: { Desktop: "5px 15px 5px 15px" },
					margin: { Desktop: "0px 5px 0px 0px" },
					alignItems: { Desktop: "center" },
				},
			},
			navLabel: {
				options: {
					viewType: "horizontal",
					position: "left",
					class: "",
					activeTab: "",
				},
				styles: { padding: { Desktop: "0px 10px 0px 10px" } },
			},
			icon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "before",
					class: "icon",
				},
				styles: { fontSize: { Desktop: "20px" } },
			},
			panelWrap: {
				options: { class: "" },
				styles: {
					backgroundColor: { Desktop: "#afb1ff" },
					padding: { Desktop: "10px 10px 10px 10px" },
					margin: { Desktop: "0px 0px 0px 0px" },
				},
			},
		},
		innerBlocks: [
			[
				"post-grid/tabs-nested-item",
				{
					wrapper: { options: { tag: "div", class: "pg-tabs" }, styles: {} },
					content: { options: { tag: "div", class: "" }, styles: {} },
					header: {
						options: { text: "Accordion Header", tag: "div", class: "" },
						styles: {},
					},
					icon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "before",
							class: "icon",
						},
						styles: {},
					},
					title: "Tab 1",
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 169.7">
				<defs></defs>
				<rect fill="#ffffff" x="66.75" width="109.1" height="37.04" />
				<path
					fill="#3c3c3b"
					d="M86.46,13.65a1.07,1.07,0,0,1,.82.38l6.5,7.58a1.08,1.08,0,0,1-.11,1.52A1.09,1.09,0,0,1,92.14,23l-5.68-6.63L80.78,23a1.08,1.08,0,0,1-1.64-1.41L85.64,14A1.07,1.07,0,0,1,86.46,13.65Z"
				/>
				<rect fill="#3c3c3b" x="102.01" y="13.65" width="58.16" height="9.75" />
				<rect fill="#3c3c3b" x="195.45" width="109.1" height="37.04" />
				<path
					fill="#ffffff"
					d="M215.16,23.4a1.08,1.08,0,0,1-.82-.38l-6.5-7.58a1.08,1.08,0,0,1,.12-1.53,1.07,1.07,0,0,1,1.52.12l5.68,6.62L220.84,14a1.08,1.08,0,1,1,1.64,1.41L216,23A1.07,1.07,0,0,1,215.16,23.4Z"
				/>
				<rect fill="#ffffff" x="230.71" y="13.65" width="58.16" height="9.75" />
				<rect fill="#3c3c3b" x="324.15" width="109.1" height="37.04" />
				<path
					fill="#ffffff"
					d="M343.86,23.4A1.08,1.08,0,0,1,343,23l-6.5-7.58a1.08,1.08,0,0,1,.12-1.53,1.07,1.07,0,0,1,1.52.12l5.68,6.62L349.54,14a1.08,1.08,0,1,1,1.64,1.41L344.68,23A1.07,1.07,0,0,1,343.86,23.4Z"
				/>
				<rect fill="#ffffff" x="359.41" y="13.65" width="58.16" height="9.75" />
				<rect fill="#ffffff" y="37.04" width="500" height="132.66" />
			</svg>
		),
	},
	{
		name: "preset-3",
		title: __("preset-3"),
		description: __("preset-3"),

		isPro: false,
		atts: {
			wrapper: { options: { tag: "div", class: "pg-tabs" }, styles: {} },
			navsWrap: {
				options: { class: "" },
				styles: {
					display: { Desktop: "flex" },
					justifyContent: { Desktop: "end" },
				},
			},
			navItem: {
				options: {
					viewType: "horizontal",
					position: "left",
					class: "",
					activeTab: "",
				},
				styles: {
					display: { Desktop: "flex" },
					color: { Desktop: "#ffffff" },
					padding: { Desktop: "5px 15px 5px 15px" },
					backgroundColor: { Desktop: "#3236ff" },
					margin: { Desktop: "0px 5px 0px 0px" },
					justifyContent: {},
					alignItems: { Desktop: "center" },
					cursor: { Desktop: "pointer" },
				},
			},
			activeNavItem: {
				options: {
					viewType: "horizontal",
					position: "left",
					class: "",
					activeTab: "",
				},
				styles: {
					backgroundColor: { Desktop: "#afb1ff" },
					display: { Desktop: "flex" },
					padding: { Desktop: "5px 15px 5px 15px" },
					margin: { Desktop: "0px 5px 0px 0px" },
					alignItems: { Desktop: "center" },
				},
			},
			navLabel: {
				options: {
					viewType: "horizontal",
					position: "left",
					class: "",
					activeTab: "",
				},
				styles: { padding: { Desktop: "0px 10px 0px 10px" } },
			},
			icon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "before",
					class: "icon",
				},
				styles: { fontSize: { Desktop: "20px" } },
			},
			panelWrap: {
				options: { class: "" },
				styles: {
					backgroundColor: { Desktop: "#afb1ff" },
					padding: { Desktop: "10px 10px 10px 10px" },
					margin: { Desktop: "0px 0px 0px 0px" },
				},
			},
		},
		innerBlocks: [
			[
				"post-grid/tabs-nested-item",
				{
					wrapper: { options: { tag: "div", class: "pg-tabs" }, styles: {} },
					content: { options: { tag: "div", class: "" }, styles: {} },
					header: {
						options: { text: "Accordion Header", tag: "div", class: "" },
						styles: {},
					},
					icon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "before",
							class: "icon",
						},
						styles: {},
					},
					title: "Tab 1",
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 169.7">
				<rect fill="#ffffff" x="133.5" width="109.1" height="37.04" />
				<path
					fill="#3c3c3b"
					d="M153.21,13.65A1.07,1.07,0,0,1,154,14l6.5,7.58A1.08,1.08,0,0,1,158.89,23l-5.68-6.63L147.53,23a1.08,1.08,0,0,1-1.64-1.41l6.5-7.58A1.07,1.07,0,0,1,153.21,13.65Z"
				/>
				<rect fill="#3c3c3b" x="168.76" y="13.65" width="58.16" height="9.75" />
				<rect fill="#3c3c3b" x="262.2" width="109.1" height="37.04" />
				<path
					fill="#ffffff"
					d="M281.91,23.4a1.07,1.07,0,0,1-.82-.38l-6.5-7.58a1.08,1.08,0,0,1,.12-1.53,1.07,1.07,0,0,1,1.52.12l5.68,6.62L287.59,14a1.07,1.07,0,0,1,1.52-.12,1.08,1.08,0,0,1,.12,1.53L282.73,23A1.07,1.07,0,0,1,281.91,23.4Z"
				/>
				<rect fill="#ffffff" x="297.46" y="13.65" width="58.16" height="9.75" />
				<rect fill="#3c3c3b" x="390.9" width="109.1" height="37.04" />
				<path
					fill="#ffffff"
					d="M410.61,23.4a1.07,1.07,0,0,1-.82-.38l-6.5-7.58a1.08,1.08,0,0,1,.12-1.53,1.07,1.07,0,0,1,1.52.12l5.68,6.62L416.29,14a1.07,1.07,0,0,1,1.52-.12,1.08,1.08,0,0,1,.12,1.53L411.43,23A1.07,1.07,0,0,1,410.61,23.4Z"
				/>
				<rect fill="#ffffff" x="426.16" y="13.65" width="58.16" height="9.75" />
				<rect fill="#ffffff" y="37.04" width="500" height="132.66" />
			</svg>
		),
	},

	{
		name: "preset-4",
		title: __("preset-4"),
		description: __("preset-4"),

		isPro: false,
		atts: {
			wrapper: { options: { tag: "div", class: "pg-tabs" }, styles: {} },
			navsWrap: {
				options: { class: "" },
				styles: {
					display: { Desktop: "flex" },
					justifyContent: { Desktop: "space-between" },
				},
			},
			navItem: {
				options: {
					viewType: "horizontal",
					position: "left",
					class: "",
					activeTab: "",
				},
				styles: {
					display: { Desktop: "flex" },
					color: { Desktop: "#ffffff" },
					padding: { Desktop: "5px 15px 5px 15px" },
					backgroundColor: { Desktop: "#3236ff" },
					margin: { Desktop: "0px 5px 0px 0px" },
					justifyContent: {},
					alignItems: { Desktop: "center" },
					cursor: { Desktop: "pointer" },
				},
			},
			activeNavItem: {
				options: {
					viewType: "horizontal",
					position: "left",
					class: "",
					activeTab: "",
				},
				styles: {
					backgroundColor: { Desktop: "#afb1ff" },
					display: { Desktop: "flex" },
					padding: { Desktop: "5px 15px 5px 15px" },
					margin: { Desktop: "0px 5px 0px 0px" },
					alignItems: { Desktop: "center" },
				},
			},
			navLabel: {
				options: {
					viewType: "horizontal",
					position: "left",
					class: "",
					activeTab: "",
				},
				styles: { padding: { Desktop: "0px 10px 0px 10px" } },
			},
			icon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "before",
					class: "icon",
				},
				styles: { fontSize: { Desktop: "20px" } },
			},
			panelWrap: {
				options: { class: "" },
				styles: {
					backgroundColor: { Desktop: "#afb1ff" },
					padding: { Desktop: "10px 10px 10px 10px" },
					margin: { Desktop: "0px 0px 0px 0px" },
				},
			},
		},
		innerBlocks: [
			[
				"post-grid/tabs-nested-item",
				{
					wrapper: { options: { tag: "div", class: "pg-tabs" }, styles: {} },
					content: { options: { tag: "div", class: "" }, styles: {} },
					header: {
						options: { text: "Accordion Header", tag: "div", class: "" },
						styles: {},
					},
					icon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "before",
							class: "icon",
						},
						styles: {},
					},
					title: "Tab 1",
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 169.7">
				<defs></defs>
				<rect fill="#ffffff" y="37.04" width="500" height="132.66" />
				<rect fill="#ffffff" width="109.1" height="37.04" />
				<path
					fill="#3c3c3b"
					d="M19.71,13.65a1.07,1.07,0,0,1,.82.38L27,21.61a1.08,1.08,0,0,1-.11,1.52A1.09,1.09,0,0,1,25.39,23l-5.68-6.63L14,23a1.09,1.09,0,0,1-1.53.11,1.07,1.07,0,0,1-.12-1.52L18.89,14A1.08,1.08,0,0,1,19.71,13.65Z"
				/>
				<rect fill="#3c3c3b" x="35.26" y="13.65" width="58.16" height="9.75" />
				<rect fill="#3c3c3b" x="195.45" width="109.1" height="37.04" />
				<path
					fill="#ffffff"
					d="M215.16,23.4a1.08,1.08,0,0,1-.82-.38l-6.5-7.58a1.08,1.08,0,0,1,.12-1.53,1.07,1.07,0,0,1,1.52.12l5.68,6.62L220.84,14a1.08,1.08,0,1,1,1.64,1.41L216,23A1.07,1.07,0,0,1,215.16,23.4Z"
				/>
				<rect fill="#ffffff" x="230.71" y="13.65" width="58.16" height="9.75" />
				<rect fill="#3c3c3b" x="390.9" width="109.1" height="37.04" />
				<path
					fill="#ffffff"
					d="M410.61,23.4a1.07,1.07,0,0,1-.82-.38l-6.5-7.58a1.08,1.08,0,0,1,.12-1.53,1.07,1.07,0,0,1,1.52.12l5.68,6.62L416.29,14a1.07,1.07,0,0,1,1.52-.12,1.08,1.08,0,0,1,.12,1.53L411.43,23A1.07,1.07,0,0,1,410.61,23.4Z"
				/>
				<rect fill="#ffffff" x="426.16" y="13.65" width="58.16" height="9.75" />
			</svg>
		),
	},

	{
		name: "preset-5",
		title: __("preset-5"),
		description: __("preset-5"),

		isPro: false,
		atts: {
			wrapper: { options: { tag: "div", class: "pg-tabs" }, styles: {} },
			navsWrap: {
				options: { class: "" },
				styles: {
					display: { Desktop: "flex" },
					justifyContent: { Desktop: "space-around" },
				},
			},
			navItem: {
				options: {
					viewType: "horizontal",
					position: "left",
					class: "",
					activeTab: "",
				},
				styles: {
					display: { Desktop: "flex" },
					color: { Desktop: "#ffffff" },
					padding: { Desktop: "5px 15px 5px 15px" },
					backgroundColor: { Desktop: "#3236ff" },
					margin: { Desktop: "0px 5px 0px 0px" },
					justifyContent: {},
					alignItems: { Desktop: "center" },
					cursor: { Desktop: "pointer" },
				},
			},
			activeNavItem: {
				options: {
					viewType: "horizontal",
					position: "left",
					class: "",
					activeTab: "",
				},
				styles: {
					backgroundColor: { Desktop: "#afb1ff" },
					display: { Desktop: "flex" },
					padding: { Desktop: "5px 15px 5px 15px" },
					margin: { Desktop: "0px 5px 0px 0px" },
					alignItems: { Desktop: "center" },
				},
			},
			navLabel: {
				options: {
					viewType: "horizontal",
					position: "left",
					class: "",
					activeTab: "",
				},
				styles: { padding: { Desktop: "0px 10px 0px 10px" } },
			},
			icon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "before",
					class: "icon",
				},
				styles: { fontSize: { Desktop: "20px" } },
			},
			panelWrap: {
				options: { class: "" },
				styles: {
					backgroundColor: { Desktop: "#afb1ff" },
					padding: { Desktop: "10px 10px 10px 10px" },
					margin: { Desktop: "0px 0px 0px 0px" },
				},
			},
		},
		innerBlocks: [
			[
				"post-grid/tabs-nested-item",
				{
					wrapper: { options: { tag: "div", class: "pg-tabs" }, styles: {} },
					content: { options: { tag: "div", class: "" }, styles: {} },
					header: {
						options: { text: "Accordion Header", tag: "div", class: "" },
						styles: {},
					},
					icon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "before",
							class: "icon",
						},
						styles: {},
					},
					title: "Tab 1",
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 169.7">
				<rect fill="#ffffff" y="37.04" width="500" height="132.66" />
				<rect fill="#ffffff" x="24.4" width="109.1" height="37.04" />
				<path
					fill="#3c3c3b"
					d="M44.11,13.65a1.07,1.07,0,0,1,.82.38l6.5,7.58A1.08,1.08,0,0,1,49.79,23l-5.68-6.63L38.43,23a1.08,1.08,0,0,1-1.64-1.41L43.29,14A1.07,1.07,0,0,1,44.11,13.65Z"
				/>
				<rect fill="#3c3c3b" x="59.66" y="13.65" width="58.16" height="9.75" />
				<rect fill="#3c3c3b" x="198" width="109.1" height="37.04" />
				<path
					fill="#ffffff"
					d="M217.71,23.4a1.1,1.1,0,0,1-.82-.38l-6.5-7.58A1.09,1.09,0,0,1,212,14l5.67,6.62L223.39,14A1.09,1.09,0,1,1,225,15.44L218.54,23A1.1,1.1,0,0,1,217.71,23.4Z"
				/>
				<rect fill="#ffffff" x="233.26" y="13.65" width="58.16" height="9.75" />
				<rect fill="#3c3c3b" x="371.61" width="109.1" height="37.04" />
				<path
					fill="#ffffff"
					d="M391.32,23.4a1.07,1.07,0,0,1-.82-.38L384,15.44a1.08,1.08,0,0,1,.12-1.53,1.07,1.07,0,0,1,1.52.12l5.68,6.62L397,14a1.07,1.07,0,0,1,1.52-.12,1.08,1.08,0,0,1,.12,1.53L392.14,23A1.07,1.07,0,0,1,391.32,23.4Z"
				/>
				<rect fill="#ffffff" x="406.87" y="13.65" width="58.16" height="9.75" />
			</svg>
		),
	},
	{
		name: "preset-6",
		title: __("preset-6"),
		description: __("preset-6"),

		isPro: false,
		atts: {
			wrapper: {
				options: { tag: "div", class: "pg-tabs" },
				styles: { display: { Desktop: "flex" } },
			},
			navsWrap: {
				options: { class: "" },
				styles: { display: { Desktop: "block" } },
			},
			navItem: {
				options: {
					viewType: "horizontal",
					position: "left",
					class: "",
					activeTab: "",
				},
				styles: {
					display: { Desktop: "flex" },
					color: { Desktop: "#ffffff" },
					padding: { Desktop: "5px 15px 5px 15px" },
					backgroundColor: { Desktop: "#3236ff" },
					margin: { Desktop: "0px 0px 0px 0px" },
					width: { Desktop: "250px" },
					alignItems: { Desktop: "center" },
					cursor: { Desktop: "pointer" },
				},
			},
			activeNavItem: {
				options: {
					viewType: "horizontal",
					position: "left",
					class: "",
					activeTab: "",
				},
				styles: {
					backgroundColor: { Desktop: "#afb1ff" },
					display: { Desktop: "flex" },
					padding: { Desktop: "5px 15px 5px 15px" },
					margin: { Desktop: "0px 0px 0px 0px" },
					alignItems: { Desktop: "center" },
					width: { Desktop: "250px" },
				},
			},
			navLabel: {
				options: {
					viewType: "horizontal",
					position: "left",
					class: "",
					activeTab: "",
				},
				styles: { padding: { Desktop: "0px 10px 0px 10px" } },
			},
			icon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "before",
					class: "icon",
				},
				styles: { fontSize: { Desktop: "20px" } },
			},
			panelWrap: {
				options: { class: "" },
				styles: {
					width: { Desktop: "100%" },
					backgroundColor: { Desktop: "#afb1ff" },
					padding: { Desktop: "10px 10px 10px 10px" },
					margin: { Desktop: "0px 0px 0px 0px" },
				},
			},
		},
		innerBlocks: [
			[
				"post-grid/tabs-nested-item",
				{
					wrapper: { options: { tag: "div", class: "pg-tabs" }, styles: {} },
					content: { options: { tag: "div", class: "" }, styles: {} },
					header: {
						options: { text: "Accordion Header", tag: "div", class: "" },
						styles: {},
					},
					icon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "before",
							class: "icon",
						},
						styles: {},
					},
					title: "Tab 1",
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 132.66">
				<defs></defs>
				<rect fill="#ffffff" width="152.68" height="34.15" />
				<path
					fill="#3c3c3b"
					d="M18.17,12.58a1,1,0,0,1,.76.35l6,7a1,1,0,1,1-1.51,1.3l-5.24-6.1-5.23,6.1a1,1,0,1,1-1.52-1.3l6-7A1,1,0,0,1,18.17,12.58Z"
				/>
				<rect fill="#3c3c3b" x="32.51" y="12.58" width="53.63" height="8.99" />
				<rect fill="#3c3c3b" y="49.17" width="152.68" height="34.15" />
				<path
					fill="#ffffff"
					d="M18.17,70.75a1,1,0,0,1-.75-.35l-6-7a1,1,0,1,1,1.52-1.3l5.23,6.1,5.24-6.1a1,1,0,1,1,1.51,1.3l-6,7A1,1,0,0,1,18.17,70.75Z"
				/>
				<rect fill="#ffffff" x="32.51" y="61.76" width="53.63" height="8.99" />
				<rect fill="#3c3c3b" y="98.35" width="152.68" height="34.15" />
				<path
					fill="#ffffff"
					d="M18.17,119.92a1,1,0,0,1-.75-.35l-6-7a1,1,0,1,1,1.52-1.3l5.23,6.11,5.24-6.11a1,1,0,1,1,1.51,1.3l-6,7A1,1,0,0,1,18.17,119.92Z"
				/>
				<rect fill="#ffffff" x="32.51" y="110.93" width="53.63" height="8.99" />
				<rect fill="#ffffff" x="131.21" width="368.79" height="132.66" />
			</svg>
		),
	},

	{
		name: "preset-7",
		title: __("preset-7"),
		description: __("preset-7"),

		isPro: false,
		atts: {
			wrapper: {
				options: { tag: "div", class: "pg-tabs" },
				styles: { display: { Desktop: "flex" } },
			},
			navsWrap: {
				options: { class: "" },
				styles: { display: { Desktop: "block" }, order: { Desktop: "10" } },
			},
			navItem: {
				options: {
					viewType: "horizontal",
					position: "left",
					class: "",
					activeTab: "",
				},
				styles: {
					display: { Desktop: "flex" },
					color: { Desktop: "#ffffff" },
					padding: { Desktop: "5px 15px 5px 15px" },
					backgroundColor: { Desktop: "#3236ff" },
					margin: { Desktop: "0px 0px 0px 0px" },
					width: { Desktop: "250px" },
					alignItems: { Desktop: "center" },
					cursor: { Desktop: "pointer" },
				},
			},
			activeNavItem: {
				options: {
					viewType: "horizontal",
					position: "left",
					class: "",
					activeTab: "",
				},
				styles: {
					backgroundColor: { Desktop: "#afb1ff" },
					display: { Desktop: "flex" },
					padding: { Desktop: "5px 15px 5px 15px" },
					margin: { Desktop: "0px 0px 0px 0px" },
					alignItems: { Desktop: "center" },
					width: { Desktop: "250px" },
				},
			},
			navLabel: {
				options: {
					viewType: "horizontal",
					position: "left",
					class: "",
					activeTab: "",
				},
				styles: { padding: { Desktop: "0px 10px 0px 10px" } },
			},
			icon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "before",
					class: "icon",
				},
				styles: { fontSize: { Desktop: "20px" } },
			},
			panelWrap: {
				options: { class: "" },
				styles: {
					width: { Desktop: "100%" },
					backgroundColor: { Desktop: "#afb1ff" },
					padding: { Desktop: "10px 10px 10px 10px" },
					margin: { Desktop: "0px 0px 0px 0px" },
				},
			},
		},
		innerBlocks: [
			[
				"post-grid/tabs-nested-item",
				{
					wrapper: { options: { tag: "div", class: "pg-tabs" }, styles: {} },
					content: { options: { tag: "div", class: "" }, styles: {} },
					header: {
						options: { text: "Accordion Header", tag: "div", class: "" },
						styles: {},
					},
					icon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "before",
							class: "icon",
						},
						styles: {},
					},
					title: "Tab 1",
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 132.66">
				<defs></defs>
				<rect
					fill="#ffffff"
					x="347.29"
					width="152.69"
					height="34.15"
					transform="translate(847.27 34.15) rotate(-180)"
				/>
				<path
					fill="#3c3c3b"
					d="M481.8,12.58a1,1,0,0,0-.76.35l-6,7a1,1,0,1,0,1.52,1.3l5.23-6.1,5.24,6.1a1,1,0,0,0,1.4.11,1,1,0,0,0,.11-1.41l-6-7A1,1,0,0,0,481.8,12.58Z"
				/>
				<rect
					fill="#3c3c3b"
					x="413.84"
					y="12.58"
					width="53.63"
					height="8.99"
					transform="translate(881.31 34.15) rotate(-180)"
				/>
				<rect
					fill="#3c3c3b"
					x="347.29"
					y="49.18"
					width="152.69"
					height="34.15"
					transform="translate(847.27 132.51) rotate(-180)"
				/>
				<path
					fill="#ffffff"
					d="M481.8,70.75a1,1,0,0,0,.76-.35l6-7a1,1,0,0,0-.11-1.41,1,1,0,0,0-1.4.11l-5.24,6.1-5.23-6.1a1,1,0,1,0-1.52,1.3l6,7A1,1,0,0,0,481.8,70.75Z"
				/>
				<rect
					fill="#ffffff"
					x="413.84"
					y="61.76"
					width="53.63"
					height="8.99"
					transform="translate(881.31 132.51) rotate(-180)"
				/>
				<rect
					fill="#3c3c3b"
					x="347.29"
					y="98.35"
					width="152.69"
					height="34.15"
					transform="translate(847.27 230.86) rotate(-180)"
				/>
				<path
					fill="#ffffff"
					d="M481.8,119.92a1,1,0,0,0,.76-.34l6-7a1,1,0,0,0-.11-1.41,1,1,0,0,0-1.4.11l-5.24,6.1-5.23-6.1a1,1,0,1,0-1.52,1.3l6,7A1,1,0,0,0,481.8,119.92Z"
				/>
				<rect
					fill="#ffffff"
					x="413.84"
					y="110.94"
					width="53.63"
					height="8.99"
					transform="translate(881.31 230.86) rotate(-180)"
				/>
				<rect fill="#ffffff" x="0.02" width="368.8" height="132.66" />
			</svg>
		),
	},
];

export default variations;




