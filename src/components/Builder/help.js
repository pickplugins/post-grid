const { Component, useState, useEffect } = wp.element;

import { Icon, close, check, external } from "@wordpress/icons";


function Html(props) {
	if (!props.warn) {
		return null;
	}

	var [help, sethelp] = useState(props.help);



	useEffect(() => {

		sethelp(props.help)

	}, [props.help]);


	var helpPrams = {
		createPostGrid: {
			title: "How to create Post Grid",
			content: `, 
`,
			video: "",
			docsUrl: "#",
		},
		useShortcodes: {
			title: "How to create Post Grid",
			content: ` 
`,
			video: "",
			docsUrl: "#",
		},
		urlHash: {
			title: "",
			content: ``,
			video: "",
			docsUrl: "",
		},
		addPostQuery: {
			title: "",
			content: ``,
			video: "",
			docsUrl: "",
		},
		lazyloadSetting: {
			title: "",
			content: ``,
			video: "",
			docsUrl: "",
		},
		autoembedSetting: {
			title: "",
			content: ``,
			video: "",
			docsUrl: "",
		},
		shortcodesSetting: {
			title: "",
			content: ``,
			video: "",
			docsUrl: "",
		},
		wpautopSetting: {
			title: "",
			content: ``,
			video: "",
			docsUrl: "",
		},
		schemaSetting: {
			title: "",
			content: ``,
			video: "",
			docsUrl: "",
		},
		toggleTextSetting: {
			title: "",
			content: ``,
			video: "",
			docsUrl: "",
		},
		expandCollapseSetting: {
			title: "",
			content: ``,
			video: "",
			docsUrl: "",
		},
		enableSearchSetting: {
			title: "",
			content: ``,
			video: "",
			docsUrl: "",
		},
		statsSetting: {
			title: "",
			content: ``,
			video: "",
			docsUrl: "",
		},
		scrollToTopSetting: {
			title: "",
			content: ``,
			video: "",
			docsUrl: "",
		},
		animationSetting: {
			title: "",
			content: ``,
			video: "",
			docsUrl: "",
		},
		templatesHelp: {
			title: "",
			content: ``,
			video: "",
			docsUrl: "",
		},
	};


	return (
		<div className={`${help.enable ? "" : "hidden"} z-[99999] top-0 left-0 fixed w-full h-full bg-slate-600 bg-opacity-90   `}>
			<div className=" bg-white my-[100px] p-5 relative w-[800px] h-[600px] overflow-y-scroll mx-auto rounded-md overflow-hidden">
				<span
					className="cursor-pointer px-2 py-1 bg-red-500 hover:bg-red-700 hover:text-white absolute top-0 right-0"
					onClick={(ev) => {
						var helpX = { ...help };
						helpX.enable = false;
						sethelp(helpX);
					}}>
					<Icon fill={"#fff"} icon={close} />
				</span>

				{!helpPrams[help?.id]?.video && (
					<div>Coming Soon</div>
				)}
				{helpPrams[help?.id]?.video && (
					<div>
						{/* <div className="mb-4 text-2xl font-bold">{helpPrams[help?.id]?.title}</div> */}
						<div className="flex items-center  gap-2 align-middle"></div>
						{/* <a className=" flex items-center gap-2 py-2 px-3 cursor-pointer  capitalize bg-gray-700 text-white font-medium rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
					<Icon fill={"#fff"} icon={external} />
					<span>Read on our Site</span>
				</a>
				<div className="my-4 text-base">{helpPrams[help?.id]?.content}</div> */}
						<div className="my-4 text-base">
							<iframe width="100%" height="450" src={`https://www.youtube.com/embed/${helpPrams[help?.id]?.video}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
						</div>

					</div>
				)}



			</div>
		</div>
	);
}

class Help extends Component {
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
		var { help } = this.props;

		return <Html help={help} warn={this.state.showWarning} />;
	}
}

export default Help;