<?php
defined('ABSPATH') || exit;


function elementor_combo_blocks_saved_template($widgets_manager)
{

	$post_grid_block_editor = get_option('post_grid_block_editor');
	$addons = isset($post_grid_block_editor['addons']) ? $post_grid_block_editor['addons'] : [];
	$disabled = isset($addons['disabled']) ? $addons['disabled'] : [];

	if (in_array('elementor', $disabled)) {
		return;
	}

	require_once(post_grid_plugin_dir . '/addons/elementor/saved-template.php');

	$widgets_manager->register(new \Elementor_Combo_Blocks_Saved_Template());
}
add_action('elementor/widgets/register', 'elementor_combo_blocks_saved_template');
