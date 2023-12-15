const { Component, RawHTML, useState } = wp.element;
import { Button, Dropdown } from "@wordpress/components";
import { Icon, chevronDown, chevronLeft, chevronRight } from "@wordpress/icons";

function MyFunction(props) {
	if (!props.warn) {
		return null;
	}

	const [selected, setSelected] = useState(props.activeTab);
	const [scrollTo, setscrollTo] = useState(200);
	var content;

	// useEffect(() => {
	// }, [keyword]);

	props.children.map((child) => {
		if (selected == child.props.name) {
			content = child.props.children;
		}
	});

	function scrollPrev() {
		const tabsNavs = document.querySelector(".tabsNavs");
		if (tabsNavs == null) return;

		tabsNavs.scrollBy({
			left: -scrollTo,
			behavior: "smooth",
		});
	}

	function scrollNext() {
		const tabsNavs = document.querySelector(".tabsNavs");
		if (tabsNavs == null) return;

		tabsNavs.scrollBy({
			left: scrollTo,
			behavior: "smooth",
		});
	}
	function onWheel(ev) {
		// ev.preventDefault();
		ev.stopPropagation();

		const tabsNavs = document.querySelector(".tabsNavs");

		tabsNavs.scrollBy({
			left: ev.deltaY,
			behavior: "smooth",
		});
	}

	return (
		<div className="tabsWrapper ">
			<div className=" relative  ">
				<div
					className="flex overflow-hidden  tabsNavs cursor-move	"
					onWheel={onWheel}>
					{props.tabs.map((tab) => {
						return (
							<div
								className={
									tab.name == selected
										? "flex flex-none flex-col items-center text-slate-900  font-medium   bg-gray-400  grow border-right border-solid  p-2 cursor-pointer"
										: "flex flex-none flex-col items-center grow bg-gray-200 font-medium  text-slate-900 border-right border-solid border-gray-600 p-2 cursor-pointer hover:bg-gray-300 "
								}
								onClick={(ev) => {
									props.onSelect(tab);
									setSelected(tab.name);
								}}>
								<Icon
									fill="#404040"
									icon={tab.icon}
									// className="mr-2 w-[20px] text-green-500"
									className=" w-[20px] text-green-500"
								/>
								<span className="font-medium">{tab.title}</span>
							</div>
						);
					})}
				</div>
				<div className="navs">
					<div
						className="navPrev cursor-pointer absolute top-[50%] left-0 -translate-y-2/4  bg-[#ffffff6b]"
						onClick={scrollPrev}>
						<Icon fill="#333" icon={chevronLeft} />
					</div>
					<div
						className="navNext cursor-pointer absolute top-[50%] -translate-y-2/4 right-[-4px]  bg-[#ffffff6b]"
						onClick={scrollNext}>
						<Icon fill="#333" icon={chevronRight} />
					</div>
				</div>
			</div>

			<div className="tabContent py-3">{content}</div>
		</div>
	);
}

class PGtabs extends Component {
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
			activeTab,
			orientation,
			activeClass,

			onSelect,
			tabs,
			children,
		} = this.props;

		return (
			<div>
				<MyFunction
					children={children}
					tabs={tabs}
					onSelect={onSelect}
					activeTab={activeTab}
					warn={this.state.showWarning}
				/>
			</div>
		);
	}
}

export default PGtabs;

