/**
 * WordPress dependencies
 */
import { Path, SVG } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const variations = [
	{
		name: 'two-up',
		title: __('Two per row', 'pb'),
		description: __('Two block grid items per row', 'pb'),
		icon: (
			<SVG
				width="48"
				height="48"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H25V34H39ZM23 34H9V14H23V34Z"
				/>
			</SVG>
		),
		isDefault: true,
		attributes: {
			md: 2,
		},
		innerBlocks: [
			['core/post-title'],
			['core/post-title'],
		],
		scope: ['block'],
	},
	{
		name: 'three-up',
		title: __('Three per row', 'pb'),
		description: __('Three block grid items per row', 'pb'),
		icon: (
			<SVG
				width="48"
				height="48"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path
					fillRule="evenodd"
					d="M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z"
				/>
			</SVG>
		),
		attributes: {
			md: 2,
			lg: 3,
		},
		innerBlocks: [
			['core/post-title'],
			['core/post-title'],
			['core/post-title'],
		],
		scope: ['block'],
	},
	{
		name: 'four-up',
		title: __('Four per row', 'pb'),
		description: __('Four block grid items per row', 'pb'),
		icon: (
			<SVG
				width="48"
				height="48"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path
					fillRule="evenodd"
					d="M39,12H9a2,2,0,0,0-2,2V34a2,2,0,0,0,2,2H39a2,2,0,0,0,2-2V14A2,2,0,0,0,39,12ZM15,34H9V14h6Zm8,0H17V14h6Zm2-20h6V34H25ZM39,34H33V14h6Z"
				/>
			</SVG>
		),
		attributes: {
			sm: 2,
			lg: 3,
			xl: 4,
		},
		innerBlocks: [
			['core/post-title'],
			['core/post-title'],
			['core/post-title'],
			['core/post-title'],
		],
		scope: ['block'],
	},
];

export default variations;
