<?php
if (!defined('ABSPATH')) exit;  // if direct access



add_filter('block_categories_all', 'post_grid_block_categories', 10, 2);


/**
 * Register custom category for blocks
 */

function post_grid_block_categories($categories, $post)
{
    return array_merge(
        array(
            array(
                'slug'  => 'post-grid',
                'title' => __('Post Grid', 'boilerplate'),
            ),
        ),
        $categories,
    );
}



function post_grid_allowed_block_types($allowed_block_types, $editor_context)
{

    $post_grid_settings = get_option('post_grid_settings');

    $block_list = isset($post_grid_settings['block_list']) ? $post_grid_settings['block_list'] : [];

    error_log(serialize($block_list));

    return $allowed_block_types;
}
add_filter('allowed_block_types_all', 'post_grid_allowed_block_types', 99, 2);
