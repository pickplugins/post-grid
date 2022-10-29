/**
 * WordPress dependencies
 */
import { layout } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

 const settings = {
	icon: layout,
	edit,
	save,
};

// export { metadata, name };

// export const settings = {
// 	icon: layout,
// 	edit,
// 	save,
// };

registerBlockType( metadata,settings );