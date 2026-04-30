<?php
if (!defined('ABSPATH')) exit;  // if direct access
wp_enqueue_style('post-grid-output', post_grid_plugin_url . 'dist/output.css', [], time(), 'all');

wp_enqueue_style('wp-components');
$post_grid_settings = get_option('post_grid_settings');
$disable_blocks = isset($post_grid_settings['disable_blocks']) ? $post_grid_settings['disable_blocks'] : [];
wp_localize_script('post-grid-blocks', 'postGridDisabledBlocks', $disable_blocks);
wp_enqueue_script(
  'post-grid-blocks',
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
if (defined("post_grid_pro_plugin_url")) {
  wp_enqueue_script(
    'post-grid-pro-blocks-build',
    post_grid_pro_plugin_url . 'build/index.js',
    [
      'wp-blocks',
      'wp-editor',
      'wp-i18n',
      'wp-element',
      'wp-components',
      'wp-data'
    ],
    time()
  );
}
$admin_email = get_option('admin_email');
$post_grid_license = get_option('post_grid_license');
$license_status = isset($post_grid_license['license_status']) ? $post_grid_license['license_status'] : '';
?>
<div class="wrap">
  <div id="cb-dashboard" class=""></div>
</div>