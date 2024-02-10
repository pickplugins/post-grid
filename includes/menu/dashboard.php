<?php
if (!defined('ABSPATH')) exit;  // if direct access

wp_enqueue_style('post-grid-output', post_grid_plugin_url . '/dist/output.css', [], time(), 'all');
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
$admin_email = get_option('admin_email');


$post_grid_license = get_option('post_grid_license');
$license_status = isset($post_grid_license['license_status']) ? $post_grid_license['license_status'] : '';



?>
<div class="wrap">

  <div id="cb-dashboard">
    Hello Dashboard
  </div>


</div>