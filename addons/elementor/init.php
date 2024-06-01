<?php
defined('ABSPATH') || exit;


function elementor_combo_blocks_saved_template($widgets_manager)
{

	require_once(post_grid_plugin_dir . '/addons/elementor/saved-template.php');

	$widgets_manager->register(new \Elementor_Combo_Blocks_Saved_Template());
}
add_action('elementor/widgets/register', 'elementor_combo_blocks_saved_template');
