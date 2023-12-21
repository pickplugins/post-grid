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
		name: "2-column",
		title: __("2 Col"),
		description: __("2 Col Masonry"),
		isDefault: true,
		isPro: false,
		atts: {
			wrapper: {
				options: { tag: "div", class: "pg-masonry-wrap" },
				styles: {},
			},
			masonryOptions: {
				gutter: 20,
				itemSelector: ".pg-masonry-wrap-item",
				columnWidth: 420,
			},
			item: {
				options: { tag: "div", class: "pg-masonry-wrap-item" },
				styles: {
					width: { Desktop: "420px" },
					marginBottom: { Desktop: "20px" },
				},
			},
			lightbox: { options: { enable: false } },
		},
		innerBlocks: [
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M0 80L74 80V60.2899L0 60.2899V80Z"
					fill="url(#paint0_linear_21_35)"
				/>
				<path
					d="M160 4.80015e-06L86 0L86 35.942L160 35.942L160 4.80015e-06Z"
					fill="url(#paint1_linear_21_35)"
				/>
				<path
					d="M0 51.0145L74 51.0145L74 3.43323e-05L0 3.43323e-05L0 51.0145Z"
					fill="url(#paint2_linear_21_35)"
				/>
				<path
					d="M160 45.2174L86 45.2174L86 80L160 80L160 45.2174Z"
					fill="url(#paint3_linear_21_35)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_21_35"
						x1="74"
						y1="70.1449"
						x2="0"
						y2="70.1449"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_21_35"
						x1="86"
						y1="17.971"
						x2="160"
						y2="17.971"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_21_35"
						x1="74"
						y1="25.5073"
						x2="0"
						y2="25.5073"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_21_35"
						x1="86"
						y1="62.6087"
						x2="160"
						y2="62.6087"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
				</defs>
			</svg>
		),
	},

	{
		name: "3-column",
		title: __("3 Col"),
		description: __("3 Col masonry"),
		isDefault: true,
		isPro: false,
		atts: {
			wrapper: {
				options: { tag: "div", class: "pg-masonry-wrap" },
				styles: {},
			},
			masonryOptions: {
				gutter: 20,
				itemSelector: ".pg-masonry-wrap-item",
				columnWidth: 300,
			},
			item: {
				options: { tag: "div", class: "pg-masonry-wrap-item" },
				styles: {
					width: { Desktop: "300px" },
					marginBottom: { Desktop: "20px" },
				},
			},
			lightbox: { options: { enable: false } },
		},
		innerBlocks: [
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M-0.000198364 80H47.7017V58.8889L-0.000198364 58.8889V80Z"
					fill="url(#paint0_linear_21_36)"
				/>
				<path
					d="M160 4.15769e-06L112.298 0L112.298 21.1111L160 21.1111L160 4.15769e-06Z"
					fill="url(#paint1_linear_21_36)"
				/>
				<path
					d="M103.354 4.15769e-06L55.6523 0L55.6523 35.5555L103.354 35.5555L103.354 4.15769e-06Z"
					fill="url(#paint2_linear_21_36)"
				/>
				<path
					d="M-0.000198364 50L47.7017 50L47.7017 3.8147e-06L-0.000198364 3.8147e-06L-0.000198364 50Z"
					fill="url(#paint3_linear_21_36)"
				/>
				<path
					d="M160 30L112.298 30L112.298 80L160 80L160 30Z"
					fill="url(#paint4_linear_21_36)"
				/>
				<path
					d="M103.354 44.4445L55.6523 44.4445L55.6523 80L103.354 80L103.354 44.4445Z"
					fill="url(#paint5_linear_21_36)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_21_36"
						x1="47.7017"
						y1="69.4445"
						x2="-0.000202179"
						y2="69.4445"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_21_36"
						x1="112.298"
						y1="10.5555"
						x2="160"
						y2="10.5556"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_21_36"
						x1="55.6523"
						y1="17.7778"
						x2="103.354"
						y2="17.7778"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_21_36"
						x1="47.7017"
						y1="25"
						x2="-0.000202179"
						y2="25"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_21_36"
						x1="112.298"
						y1="55"
						x2="160"
						y2="55"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_21_36"
						x1="55.6523"
						y1="62.2222"
						x2="103.354"
						y2="62.2222"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
				</defs>
			</svg>
		),
	},
	{
		name: "4-column",
		title: __("4 Col"),
		description: __("4 Col Masonry"),
		isDefault: true,
		isPro: false,
		atts: {
			wrapper: {
				options: { tag: "div", class: "pg-masonry-wrap" },
				styles: {},
			},
			masonryOptions: {
				gutter: 20,
				itemSelector: ".pg-masonry-wrap-item",
				columnWidth: 220,
			},
			item: {
				options: { tag: "div", class: "pg-masonry-wrap-item" },
				styles: {
					width: { Desktop: "220px" },
					marginBottom: { Desktop: "20px" },
				},
			},
			lightbox: { options: { enable: false } },
		},
		innerBlocks: [
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
			[
				"post-grid/masonry-wrap-item",
				{
					wrapper: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: {},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg
				
				viewBox="0 0 159 80"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M-6.10352e-05 80H34.4326V58.889L-6.10352e-05 58.889V80Z"
					fill="url(#paint0_linear_21_38)"
				/>
				<path
					d="M74.6043 0.000248973L40.1716 0.000244141L40.1716 35.5557L74.6043 35.5557L74.6043 0.000248973Z"
					fill="url(#paint1_linear_21_38)"
				/>
				<path
					d="M-6.10352e-05 49.9999L34.4326 49.9999L34.4326 4.19617e-05L-6.10352e-05 4.19617e-05L-6.10352e-05 49.9999Z"
					fill="url(#paint2_linear_21_38)"
				/>
				<path
					d="M115.493 0.00024892L81.0603 0.000244141L81.0603 21.1113L115.493 21.1113L115.493 0.00024892Z"
					fill="url(#paint3_linear_21_38)"
				/>
				<path
					d="M115.493 30.0004L81.0603 30.0004L81.0603 80.0002L115.493 80.0002L115.493 30.0004Z"
					fill="url(#paint4_linear_21_38)"
				/>
				<path
					d="M74.6043 44.4445L40.1716 44.4445L40.1716 79.9999L74.6043 79.9999L74.6043 44.4445Z"
					fill="url(#paint5_linear_21_38)"
				/>
				<path
					d="M158.01 0.00024892L123.578 0.000244141L123.578 35.5557L158.01 35.5557L158.01 0.00024892Z"
					fill="url(#paint6_linear_21_38)"
				/>
				<path
					d="M158.01 44.4445L123.578 44.4445L123.578 79.9999L158.01 79.9999L158.01 44.4445Z"
					fill="url(#paint7_linear_21_38)"
				/>
				<path
					d="M158.01 0.00024892L123.578 0.000244141L123.578 35.5557L158.01 35.5557L158.01 0.00024892Z"
					fill="url(#paint8_linear_21_38)"
				/>
				<path
					d="M158.01 44.4445L123.578 44.4445L123.578 79.9999L158.01 79.9999L158.01 44.4445Z"
					fill="url(#paint9_linear_21_38)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_21_38"
						x1="34.4326"
						y1="69.4445"
						x2="-6.10352e-05"
						y2="69.4445"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_21_38"
						x1="40.1716"
						y1="17.778"
						x2="74.6043"
						y2="17.778"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_21_38"
						x1="34.4326"
						y1="25"
						x2="-6.10352e-05"
						y2="25"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_21_38"
						x1="81.0603"
						y1="10.5558"
						x2="115.493"
						y2="10.5558"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_21_38"
						x1="81.0603"
						y1="55.0003"
						x2="115.493"
						y2="55.0003"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_21_38"
						x1="40.1716"
						y1="62.2222"
						x2="74.6043"
						y2="62.2222"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint6_linear_21_38"
						x1="123.578"
						y1="17.778"
						x2="158.01"
						y2="17.778"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint7_linear_21_38"
						x1="123.578"
						y1="62.2222"
						x2="158.01"
						y2="62.2222"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint8_linear_21_38"
						x1="123.578"
						y1="17.778"
						x2="158.01"
						y2="17.778"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint9_linear_21_38"
						x1="123.578"
						y1="62.2222"
						x2="158.01"
						y2="62.2222"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
				</defs>
			</svg>
		),
	},
	{
		name: "3-column-masonry-post",
		title: __("3 column post"),
		description: __("3 column masonry post"),
		isDefault: true,
		isPro: false,
		atts: {
			wrapper: {
				options: { tag: "div", class: "pg-masonry-wrap" },
				styles: {},
			},
			masonryOptions: {
				gutter: 20,
				itemSelector: ".pg-masonry-wrap-item",
				columnWidth: 300,
			},
			item: {
				options: { tag: "div", class: "pg-masonry-wrap-item" },
				styles: {
					width: { Desktop: "300px" },
					marginBottom: { Desktop: "20px" },
				},
			},
			lightbox: { options: { enable: false } },
		},
		innerBlocks: [
			[
				"post-grid/post-query",
				{
					noPostsWrap: {
						options: { class: "no-posts text-center" },
						styles: [],
					},
					itemsWrap: { options: { excludedWrapper: true }, styles: [] },
					itemWrap: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: [],
					},
					spinnerWrap: { options: { class: "spinner" }, styles: [] },
					queryArgs: {
						items: [
							{ val: ["post"], id: "postType" },
							{ val: "10", id: "postsPerPage" },
						],
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M-0.000198364 80H47.7017V58.8889L-0.000198364 58.8889V80Z"
					fill="url(#paint0_linear_21_36)"
				/>
				<path
					d="M160 4.15769e-06L112.298 0L112.298 21.1111L160 21.1111L160 4.15769e-06Z"
					fill="url(#paint1_linear_21_36)"
				/>
				<path
					d="M103.354 4.15769e-06L55.6523 0L55.6523 35.5555L103.354 35.5555L103.354 4.15769e-06Z"
					fill="url(#paint2_linear_21_36)"
				/>
				<path
					d="M-0.000198364 50L47.7017 50L47.7017 3.8147e-06L-0.000198364 3.8147e-06L-0.000198364 50Z"
					fill="url(#paint3_linear_21_36)"
				/>
				<path
					d="M160 30L112.298 30L112.298 80L160 80L160 30Z"
					fill="url(#paint4_linear_21_36)"
				/>
				<path
					d="M103.354 44.4445L55.6523 44.4445L55.6523 80L103.354 80L103.354 44.4445Z"
					fill="url(#paint5_linear_21_36)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_21_36"
						x1="47.7017"
						y1="69.4445"
						x2="-0.000202179"
						y2="69.4445"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_21_36"
						x1="112.298"
						y1="10.5555"
						x2="160"
						y2="10.5556"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_21_36"
						x1="55.6523"
						y1="17.7778"
						x2="103.354"
						y2="17.7778"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_21_36"
						x1="47.7017"
						y1="25"
						x2="-0.000202179"
						y2="25"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_21_36"
						x1="112.298"
						y1="55"
						x2="160"
						y2="55"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_21_36"
						x1="55.6523"
						y1="62.2222"
						x2="103.354"
						y2="62.2222"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
				</defs>
			</svg>
		),
	},
	{
		name: "4-column-masonry-post",
		title: __("4 column post"),
		description: __("4 column masonry post"),
		isDefault: true,
		isPro: false,
		atts: {
			wrapper: {
				options: { tag: "div", class: "pg-masonry-wrap" },
				styles: {},
			},
			masonryOptions: {
				gutter: 20,
				itemSelector: ".pg-masonry-wrap-item",
				columnWidth: 220,
			},
			item: {
				options: { tag: "div", class: "pg-masonry-wrap-item" },
				styles: {
					width: { Desktop: "220px" },
					marginBottom: { Desktop: "20px" },
				},
			},
			lightbox: { options: { enable: false } },
		},
		innerBlocks: [
			[
				"post-grid/post-query",
				{
					noPostsWrap: {
						options: { class: "no-posts text-center" },
						styles: [],
					},
					itemsWrap: { options: { excludedWrapper: true }, styles: [] },
					itemWrap: {
						options: { tag: "div", class: "pg-masonry-wrap-item" },
						styles: [],
					},
					spinnerWrap: { options: { class: "spinner" }, styles: [] },
					queryArgs: {
						items: [
							{ val: ["post"], id: "postType" },
							{ val: "10", id: "postsPerPage" },
						],
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg viewBox="0 0 159 80" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M-6.10352e-05 80H34.4326V58.889L-6.10352e-05 58.889V80Z"
					fill="url(#paint0_linear_21_38)"
				/>
				<path
					d="M74.6043 0.000248973L40.1716 0.000244141L40.1716 35.5557L74.6043 35.5557L74.6043 0.000248973Z"
					fill="url(#paint1_linear_21_38)"
				/>
				<path
					d="M-6.10352e-05 49.9999L34.4326 49.9999L34.4326 4.19617e-05L-6.10352e-05 4.19617e-05L-6.10352e-05 49.9999Z"
					fill="url(#paint2_linear_21_38)"
				/>
				<path
					d="M115.493 0.00024892L81.0603 0.000244141L81.0603 21.1113L115.493 21.1113L115.493 0.00024892Z"
					fill="url(#paint3_linear_21_38)"
				/>
				<path
					d="M115.493 30.0004L81.0603 30.0004L81.0603 80.0002L115.493 80.0002L115.493 30.0004Z"
					fill="url(#paint4_linear_21_38)"
				/>
				<path
					d="M74.6043 44.4445L40.1716 44.4445L40.1716 79.9999L74.6043 79.9999L74.6043 44.4445Z"
					fill="url(#paint5_linear_21_38)"
				/>
				<path
					d="M158.01 0.00024892L123.578 0.000244141L123.578 35.5557L158.01 35.5557L158.01 0.00024892Z"
					fill="url(#paint6_linear_21_38)"
				/>
				<path
					d="M158.01 44.4445L123.578 44.4445L123.578 79.9999L158.01 79.9999L158.01 44.4445Z"
					fill="url(#paint7_linear_21_38)"
				/>
				<path
					d="M158.01 0.00024892L123.578 0.000244141L123.578 35.5557L158.01 35.5557L158.01 0.00024892Z"
					fill="url(#paint8_linear_21_38)"
				/>
				<path
					d="M158.01 44.4445L123.578 44.4445L123.578 79.9999L158.01 79.9999L158.01 44.4445Z"
					fill="url(#paint9_linear_21_38)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_21_38"
						x1="34.4326"
						y1="69.4445"
						x2="-6.10352e-05"
						y2="69.4445"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_21_38"
						x1="40.1716"
						y1="17.778"
						x2="74.6043"
						y2="17.778"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_21_38"
						x1="34.4326"
						y1="25"
						x2="-6.10352e-05"
						y2="25"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_21_38"
						x1="81.0603"
						y1="10.5558"
						x2="115.493"
						y2="10.5558"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_21_38"
						x1="81.0603"
						y1="55.0003"
						x2="115.493"
						y2="55.0003"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_21_38"
						x1="40.1716"
						y1="62.2222"
						x2="74.6043"
						y2="62.2222"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint6_linear_21_38"
						x1="123.578"
						y1="17.778"
						x2="158.01"
						y2="17.778"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint7_linear_21_38"
						x1="123.578"
						y1="62.2222"
						x2="158.01"
						y2="62.2222"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint8_linear_21_38"
						x1="123.578"
						y1="17.778"
						x2="158.01"
						y2="17.778"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint9_linear_21_38"
						x1="123.578"
						y1="62.2222"
						x2="158.01"
						y2="62.2222"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
				</defs>
			</svg>
		),
	},
];

export default variations;

