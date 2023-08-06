<?php



if (!defined('ABSPATH')) exit;  // if direct access

//add_action('postgrid_editor', 'postgrid_editor_wrap');

function postgrid_editor_wrap($postId)
{

    wp_enqueue_style('postgrid-editor');
}
