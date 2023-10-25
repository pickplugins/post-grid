const { Component } = wp.element;
import {
	Button,
	Dropdown,
	ToggleControl,
	Popover,
	TextareaControl,
} from "@wordpress/components";
import { Icon, styles, settings, close } from "@wordpress/icons";
import {
	createElement,
	useCallback,
	memo,
	useMemo,
	useState,
	useEffect,
} from "@wordpress/element";
import {
	__experimentalInputControl as InputControl,
	ColorPalette,
} from "@wordpress/components";

import customTags from "../../custom-tags";

function Html(props) {
	if (!props.warn) {
		return null;
	}

	//var val = (typeof props.val == 'object') ? props.val : props.val.split(" ");

	//const [valArgs, setValArgs] = useState(props.val == undefined ? [] : val);
	const [search, setsearch] = useState({ enable: false, keyword: "" });

	// useEffect(() => {

	//   //props.onChange(valArgs.join(' '));

	// }, [valArgs]);

	useEffect(() => {
		//console.log(typeof props.val);
		//var val = (typeof props.val == 'object') ? props.val : props.val.split(" ");
		//setValArgs(val);
	}, [props.val]);

	useEffect(() => {
		//console.log(search);
	}, [search]);

	return (
		<div className=" p-1">
			<div className="">
				<div
					className="relative cursor-pointer my-2 inline-block bg-blue-500 text-white px-3 p-1"
					onClick={(ev) => {
						setsearch({ ...search, enable: !search.enable });
					}}>
					Add
				</div>
				<TextareaControl
					className="w-full"
					value={props.val}
					onChange={(newVal) => {
						props.onChange(newVal);
					}}
				/>
			</div>

			{search.enable && (
				<>
					<Popover position="bottom left">
						<div className=" p-2 flex">
							<input
								value={search.keyword}
								type="text"
								className=" p-2 rounded-none"
								placeholder={props.placeholder}
								onKeyDown={(ev) => {
									var target = ev.target;
									console.log(ev.key);

									if (
										ev.key != "Enter" ||
										ev.key != "Backspace" ||
										ev.key != "Meta" ||
										ev.key != " "
									) {
										var value = search.keyword + ev.key;

										setsearch({ keyword: value, enable: true });
									}

									if (ev.key == "Backspace") {
										value = search.keyword.slice(0, -1);
										setsearch({ keyword: value, enable: true });
									}
									if (ev.key == "Enter" || ev.key == " ") {
										console.log(search.keyword);

										if (search.keyword.length == 0) {
											alert("Empty can't be added.");
											return;
										}

										//var valArgsX = [...valArgs]
										//var args = valArgsX.concat(search.keyword)

										//setValArgs(args)
										setsearch({ keyword: "", enable: true });
									}
								}}
							/>

							<Icon
								fill="#fff"
								className="bg-red-400 ml-2 p-1 cursor-pointer"
								icon={close}
								onClick={(ev) => {
									setsearch({ ...search, enable: !search.enable });
								}}
							/>
						</div>

						<p className="text-sm mx-2">Press Enter to add.</p>
						<div className=" hidden flex-wrap justify-start  items-center">
							{/* {valArgs.map((item, index) => {

                return (

                  <div className='flex items-center border m-1'><Icon fill='#fff' className='bg-red-400 mr-2 cursor-pointer' icon={close} onClick={ev => {

                    var valArgsX = [...valArgs]
                    valArgsX.splice(index, 1);
                    setValArgs(valArgsX)

                  }} /><span className='mr-2'>{item}</span></div>

                )


              })} */}
						</div>

						<div>
							{Object.entries(props.tags).map((args) => {
								var id = args[0];
								var item = args[1];

								return (
									<div
										className="p-2 cursor-pointer hover:bg-slate-300"
										onClick={(ev) => {
											props.onChange(props.val + " " + item.id);

											// var valArgsX = [...valArgs]
											// var args = valArgsX.concat(item.id)

											// setValArgs(args)
										}}>
										{item.label}
									</div>
								);
							})}
						</div>
					</Popover>
				</>
			)}
		</div>
	);
}

class PGcssClassPicker extends Component {
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
		var { value, placeholder, tags, onChange } = this.props;

		return (
			<Html
				val={value}
				placeholder={placeholder}
				tags={tags}
				onChange={onChange}
				warn={this.state.showWarning}
			/>
		);
	}
}

export default PGcssClassPicker;
