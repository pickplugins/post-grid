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
