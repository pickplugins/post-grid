var attributes = {
	wrapper: {
		type: "object",
		default: {
			options: {
				tag: "div",
				class: "",
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
				type: "",
				startDate: "",
				endDate: "",
				startDateSrc: "",
				endDateSrc: "",
				everGreenTime: {
					day: "",
					hour: "",
					minute: "",
					second: "",
				},
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
};
export default attributes;