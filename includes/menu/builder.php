<?php
if (!defined('ABSPATH')) exit;  // if direct access

wp_enqueue_style('builder-output', post_grid_plugin_url . '/dist/output.css', [], time(), 'all');


wp_enqueue_style('wp-components');
wp_enqueue_style('animate');

wp_enqueue_script('pgpostgrid_builder-js');

wp_register_style('icofont-icons', post_grid_plugin_url . 'assets/css/icofont/icofont.min.css');
wp_enqueue_style('icofont-icons');

wp_register_style('bootstrap-icons', post_grid_plugin_url . 'assets/css/bootstrap-icons/bootstrap-icons.css');

wp_enqueue_style('bootstrap-icons');
wp_register_style('fontawesome-icons', post_grid_plugin_url . 'assets/css/fontawesome/css/all.min.css');
wp_enqueue_style('fontawesome-icons');


wp_register_style('pgcontent_slider_splide_core', post_grid_plugin_url . 'assets/css/splide-core.min.css');

wp_enqueue_style('pgcontent_slider_splide_core');
wp_enqueue_editor();



wp_enqueue_script(
    'post_grid_builder_js',
    post_grid_plugin_url . 'build/index.js',
    [
        'wp-blocks',
        'wp-editor',
        'wp-i18n',
        'wp-element',
        'wp-components',
        'wp-data',
        'wp-plugins',
        'wp-edit-post',
    ],
    time()

);

wp_localize_script('post_grid_builder_js', 'post_grid_builder_js', array('post_grid_ajaxurl' => admin_url('admin-ajax.php'), '_wpnonce' => wp_create_nonce('wp_rest')));






?>
<div class="wrap">
    <div id="builder" class=""></div>
</div>