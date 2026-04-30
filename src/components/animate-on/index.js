import {
	Button,
	PanelRow,
	PanelBody,
	ToggleControl,
	Dropdown,
	Popover,
	SelectControl,
	RangeControl,
	Panel,
	DropdownMenu,
	ColorPicker,
	ColorPalette,
	ToolsPanelItem,
	ComboboxControl,
	MenuGroup,
	MenuItem,
	TextareaControl,
	Spinner,
	Tooltip,
	DateTimePicker,
	DatePicker,
} from "@wordpress/components";
import { applyFilters } from "@wordpress/hooks";
import apiFetch from "@wordpress/api-fetch";

import { __experimentalInputControl as InputControl } from "@wordpress/components";
import {
	useState,
	useEffect,
	Component,
	RawHTML,
	////
	useRef,
	////
} from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Icon, close } from "@wordpress/icons";
import CBDropdown from "../../components/dropdown";
import PGtoggle from "../toggle";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	const [animateOn, setanimateOn] = useState(props.animateOn);
	var [rules, setrules] = useState(
		animateOn?.rules == null || animateOn?.rules == undefined ? [] : animateOn.rules
	);
	useEffect(() => {
		props.onChange(animateOn);
	}, [animateOn]);
	useEffect(() => {
		var animateOnX = { ...animateOn };
		animateOnX.rules = rules;
		setanimateOn(animateOnX);
	}, [rules]);
	var animateListArgsBasic = {
		backInDown: { label: __("backInDown", "post-grid"), value: "backInDown" },
		backInLeft: { label: __("backInLeft", "post-grid"), value: "backInLeft" },
		backInRight: {
			label: __("backInRight", "post-grid"),
			value: "backInRight",
			//isPro: true,
		},
		backInUp: {
			label: __("backInUp", "post-grid"),
			value: "backInUp",
			//isPro: true,
		},
		bounceIn: { label: __("bounceIn", "post-grid"), value: "bounceIn" },
		bounceInDown: {
			label: __("bounceInDown", "post-grid"),
			value: "bounceInDown",
			//isPro: true,
		},
		bounceInLeft: {
			label: __("bounceInLeft", "post-grid"),
			value: "bounceInLeft",
			//isPro: true,
		},
		bounceInRight: {
			label: __("bounceInRight", "post-grid"),
			value: "bounceInRight",
			//isPro: true,
		},
		bounceInUp: {
			label: __("bounceInUp", "post-grid"),
			value: "bounceInUp",
			//isPro: true,
		},
		fadeIn: { label: __("fadeIn", "post-grid"), value: "fadeIn" },
		fadeInDown: {
			label: __("fadeInDown", "post-grid"),
			value: "fadeInDown",
			//isPro: true,
		},
		fadeInDownBig: {
			label: __("fadeInDownBig", "post-grid"),
			value: "fadeInDownBig",
			//isPro: true,
		},
		fadeInLeft: {
			label: __("fadeInLeft", "post-grid"),
			value: "fadeInLeft",
			//isPro: true,
		},
		fadeInLeftBig: {
			label: __("fadeInLeftBig", "post-grid"),
			value: "fadeInLeftBig",
			//isPro: true,
		},
		fadeInRight: {
			label: __("fadeInRight", "post-grid"),
			value: "fadeInRight",
			//isPro: true,
		},
		fadeInRightBig: {
			label: __("fadeInRightBig", "post-grid"),
			value: "fadeInRightBig",
			//isPro: true,
		},
		fadeInUp: {
			label: __("fadeInUp", "post-grid"),
			value: "fadeInUp",
			//isPro: true,
		},
		fadeInUpBig: {
			label: __("fadeInUpBig", "post-grid"),
			value: "fadeInUpBig",
			//isPro: true,
		},
		fadeInTopLeft: {
			label: __("fadeInTopLeft", "post-grid"),
			value: "fadeInTopLeft",
			//isPro: true,
		},
		fadeInTopRight: {
			label: __("fadeInTopRight", "post-grid"),
			value: "fadeInTopRight",
			//isPro: true,
		},
		fadeInBottomRight: {
			label: __("fadeInBottomRight", "post-grid"),
			value: "fadeInBottomRight",
			//isPro: true,
		},
		fadeInBottomLeft: {
			label: __("fadeInBottomLeft", "post-grid"),
			value: "fadeInBottomLeft",
			//isPro: true,
		},
		rotateIn: { label: __("rotateIn", "post-grid"), value: "rotateIn" },
		rotateInDownLeft: {
			label: __("rotateInDownLeft", "post-grid"),
			value: "rotateInDownLeft",
			//isPro: true,
		},
		rotateInDownRight: {
			label: __("rotateInDownRight", "post-grid"),
			value: "rotateInDownRight",
			//isPro: true,
		},
		rotateInUpLeft: {
			label: __("rotateInUpLeft", "post-grid"),
			value: "rotateInUpLeft",
			//isPro: true,
		},
		rotateInUpRight: {
			label: __("rotateInUpRight", "post-grid"),
			value: "rotateInUpRight",
			//isPro: true,
		},
		zoomIn: { label: __("zoomIn", "post-grid"), value: "zoomIn", isPro: true },
		zoomInDown: {
			label: __("zoomInDown", "post-grid"),
			value: "zoomInDown",
			//isPro: true,
		},
		zoomInLeft: {
			label: __("zoomInLeft", "post-grid"),
			value: "zoomInLeft",
			//isPro: true,
		},
		zoomInRight: {
			label: __("zoomInRight", "post-grid"),
			value: "zoomInRight",
			//isPro: true,
		},
		zoomInUp: {
			label: __("zoomInUp", "post-grid"),
			value: "zoomInUp",
			//isPro: true,
		},
		slideInDown: {
			label: __("slideInDown", "post-grid"),
			value: "slideInDown",
			//isPro: true,
		},
		slideInLeft: {
			label: __("slideInLeft", "post-grid"),
			value: "slideInLeft",
			//isPro: true,
		},
		slideInRight: {
			label: __("slideInRight", "post-grid"),
			value: "slideInRight",
			//isPro: true,
		},
		slideInUp: {
			label: __("slideInUp", "post-grid"),
			value: "slideInUp",
			//isPro: true,
		},
		backOutDown: {
			label: __("backOutDown", "post-grid"),
			value: "backOutDown",
		},
		backOutLeft: {
			label: __("backOutLeft", "post-grid"),
			value: "backOutLeft",
		},
		backOutRight: {
			label: __("backOutRight", "post-grid"),
			value: "backOutRight",
			//isPro: true,
		},
		backOutUp: {
			label: __("backOutUp", "post-grid"),
			value: "backOutUp",
			//isPro: true,
		},
		bounceOut: { label: __("bounceOut", "post-grid"), value: "bounceOut" },
		bounceOutDown: {
			label: __("bounceOutDown", "post-grid"),
			value: "bounceOutDown",
			//isPro: true,
		},
		bounceOutLeft: {
			label: __("bounceOutLeft", "post-grid"),
			value: "bounceOutLeft",
			//isPro: true,
		},
		bounceOutRight: {
			label: __("bounceOutRight", "post-grid"),
			value: "bounceOutRight",
			//isPro: true,
		},
		bounceOutUp: {
			label: __("bounceOutUp", "post-grid"),
			value: "bounceOutUp",
			//isPro: true,
		},
		fadeOut: { label: __("fadeOut", "post-grid"), value: "fadeOut" },
		fadeOutDown: {
			label: __("fadeOutDown", "post-grid"),
			value: "fadeOutDown",
			//isPro: true,
		},
		fadeOutDownBig: {
			label: __("fadeOutDownBig", "post-grid"),
			value: "fadeOutDownBig",
			//isPro: true,
		},
		fadeOutLeft: {
			label: __("fadeOutLeft", "post-grid"),
			value: "fadeOutLeft",
			//isPro: true,
		},
		fadeOutLeftBig: {
			label: __("fadeOutLeftBig", "post-grid"),
			value: "fadeOutLeftBig",
			//isPro: true,
		},
		fadeOutRight: {
			label: __("fadeOutRight", "post-grid"),
			value: "fadeOutRight",
			//isPro: true,
		},
		fadeOutRightBig: {
			label: __("fadeOutRightBig", "post-grid"),
			value: "fadeOutRightBig",
			//isPro: true,
		},
		fadeOutUp: {
			label: __("fadeOutUp", "post-grid"),
			value: "fadeOutUp",
			//isPro: true,
		},
		fadeOutUpBig: {
			label: __("fadeOutUpBig", "post-grid"),
			value: "fadeOutUpBig",
			//isPro: true,
		},
		fadeOutTopLeft: {
			label: __("fadeOutTopLeft", "post-grid"),
			value: "fadeOutTopLeft",
			//isPro: true,
		},
		fadeOutTopRight: {
			label: __("fadeOutTopRight", "post-grid"),
			value: "fadeOutTopRight",
			//isPro: true,
		},
		fadeOutBottomRight: {
			label: __("fadeOutBottomRight", "post-grid"),
			value: "fadeOutBottomRight",
			//isPro: true,
		},
		fadeOutBottomLeft: {
			label: __("fadeOutBottomLeft", "post-grid"),
			value: "fadeOutBottomLeft",
			//isPro: true,
		},
		rotateOut: { label: __("rotateOut", "post-grid"), value: "rotateOut" },
		rotateOutDownLeft: {
			label: __("rotateOutDownLeft", "post-grid"),
			value: "rotateOutDownLeft",
			//isPro: true,
		},
		rotateOutDownRight: {
			label: __("rotateOutDownRight", "post-grid"),
			value: "rotateOutDownRight",
			//isPro: true,
		},
		rotateOutUpLeft: {
			label: __("rotateOutUpLeft", "post-grid"),
			value: "rotateOutUpLeft",
			//isPro: true,
		},
		rotateOutUpRight: {
			label: __("rotateOutUpRight", "post-grid"),
			value: "rotateOutUpRight",
			//isPro: true,
		},
		zoomOut: {
			label: __("zoomOut", "post-grid"),
			value: "zoomOut",
			//isPro: true,
		},
		zoomOutDown: {
			label: __("zoomOutDown", "post-grid"),
			value: "zoomOutDown",
			//isPro: true,
		},
		zoomOutLeft: {
			label: __("zoomOutLeft", "post-grid"),
			value: "zoomOutLeft",
			//isPro: true,
		},
		zoomOutRight: {
			label: __("zoomOutRight", "post-grid"),
			value: "zoomOutRight",
			//isPro: true,
		},
		zoomOutUp: {
			label: __("zoomOutUp", "post-grid"),
			value: "zoomOutUp",
			//isPro: true,
		},
		slideOutDown: {
			label: __("slideOutDown", "post-grid"),
			value: "slideOutDown",
			//isPro: true,
		},
		slideOutLeft: {
			label: __("slideOutLeft", "post-grid"),
			value: "slideOutLeft",
			//isPro: true,
		},
		slideOutRight: {
			label: __("slideOutRight", "post-grid"),
			value: "slideOutRight",
			//isPro: true,
		},
		slideOutUp: {
			label: __("slideOutUp", "post-grid"),
			value: "slideOutUp",
			//isPro: true,
		},
	};
	let animateListArgs = applyFilters(
		"AnimateOnArgs",
		animateListArgsBasic
	);

	var events = {
		load: { label: __("Page Load", "post-grid"), value: "load" },
		scroll: { label: __("Scroll To", "post-grid"), value: "scroll" },
		mouseover: { label: __("Mouse Over", "post-grid"), value: "mouseover" },
		mouseout: { label: __("Mouse Out", "post-grid"), value: "mouseout" },
		click: { label: __("Click Element", "post-grid"), value: "click" },
	}


	var RemoveAnimateOnGroup = function ({ title, index }) {
		return (
			<>
				<Icon icon={close} onClick={(ev) => {
					var rulesX = [...rules];
					rulesX.splice(index, 1);
					setrules(rulesX);
				}} />
				<span>{title}</span>
			</>
		);
	};
	return (
		<div className="relative">
			<PanelRow className="my-3">
				<div
					// className="bg-gray-700 hover:bg-gray-600 p-2 px-4 text-white inline-block cursor-pointer rounded-sm"
					className="flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize  bg-gray-700	 text-white font-medium rounded hover:bg-gray-600	 hover:text-white focus:outline-none focus:bg-gray-600	"
					onClick={(ev) => {
						var rulesX = [...rules];
						rulesX.push({ event: "mouseover", title: "", animationName: "backInDown", eventTarget: '.item', duration: "", delay: "", });
						setrules(rulesX);
					}}>
					{__("Add", "post-grid")}
				</div>
			</PanelRow>
			<div className="my-4">
				{rules.map((group, groupIndex) => {
					return (
						<PGtoggle
							title={
								<RemoveAnimateOnGroup title={events[group.event]?.label + " - " + animateListArgs[group.animationName]?.label} index={groupIndex} />
							}
							initialOpen={false} key={groupIndex} >
							<PanelRow className="my-3">
								<label>Event?</label>
								<CBDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={
										group.event == undefined
											? __("Choose", "post-grid")
											: group.event
									}
									options={events}
									onChange={(option, index) => {
										var rulesX = [...rules];
										rulesX[groupIndex]["event"] = option.value;
										setrules(rulesX);
									}}
									values=""></CBDropdown>
							</PanelRow>
							<PanelRow>
								<label htmlFor="" >
									{__("Target?", "post-grid")}
								</label>
								<InputControl
									className=""
									value={group.eventTarget}
									onChange={(newVal) => {
										var rulesX = [...rules];
										rulesX[groupIndex]["eventTarget"] = newVal;
										setrules(rulesX);
									}}
								/>
							</PanelRow>


							<PanelRow>
								<label htmlFor="" >
									{__("Animation", "post-grid")}
								</label>
								<CBDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={
										animateListArgs[group.animationName] ==
											undefined
											? __("Choose", "post-grid")
											: animateListArgs[group.animationName].label
									}
									options={animateListArgs}
									onChange={(option, index) => {
										var rulesX = [...rules];
										rulesX[groupIndex]["animationName"] = option.value;
										setrules(rulesX);
									}}
									values=""></CBDropdown>
							</PanelRow>
							{/* <PanelRow>
								<label htmlFor="" >
									{__("Duration", "post-grid")}
								</label>
								<InputControl
									className=""
									value={group.duration}
									onChange={(newVal) => {
										var rulesX = [...rules];
										rulesX[groupIndex]["duration"] = newVal;
										setrules(rulesX);
									}}
								/>
							</PanelRow>
							<PanelRow>
								<label htmlFor="" >
									{__("Delay", "post-grid")}
								</label>
								<InputControl
									className=""
									value={group.delay}
									onChange={(newVal) => {
										var rulesX = [...rules];
										rulesX[groupIndex]["delay"] = newVal;
										setrules(rulesX);
									}}
								/>
							</PanelRow> */}
						</PGtoggle>
					);
				})}
			</div>
		</div>
	);
}
class CBAnimateOn extends Component {
	constructor(props) {
		super(props);
		this.state = { showWarning: true };
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}
	handleToggleClick() {
		this.setState((state) => ({
			showWarning: !state.showWarning,
		}));
	}
	render() {
		const {
			position,
			variant,
			btnClass,
			searchPlaceholder,
			options, //[{"label":"Select..","icon":"","value":""}]
			buttonTitle,
			onChange,
			animateOn,
			values,
			value,
		} = this.props;
		return (
			<div>
				<Html
					value={value}
					position={position}
					searchPlaceholder={searchPlaceholder}
					btnClass={btnClass}
					variant={variant}
					options={options}
					buttonTitle={buttonTitle}
					onChange={onChange}
					animateOn={animateOn}
					warn={this.state.showWarning}
				/>
			</div>
		);
	}
}
export default CBAnimateOn;
