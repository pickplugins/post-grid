<?php
if (!defined('ABSPATH')) exit;  // if direct access

wp_enqueue_style('post-grid-output', post_grid_plugin_url . '/dist/output.css', [], time(), 'all');

//http://localhost/wordpress/wp-admin/load-styles.php?c=1&dir=ltr&load%5Bchunk_0%5D=dashicons,admin-bar,buttons,media-views,editor-buttons,wp-components,wp-block-editor,wp-reusable-blocks,wp-patterns,wp-editor,co&load%5Bchunk_1%5D=mmon,forms,wp-reset-editor-styles,wp-block-library,wp-block-editor-content,wp-edit-blocks,wp-commands,wp-edit-post,wp-block-dire&load%5Bchunk_2%5D=ctory,wp-format-library,admin-menu,dashboard,list-tables,edit,revisions,media,themes,about,nav-menus,wp-pointer,widgets,site-ico&load%5Bchunk_3%5D=n,l10n,wp-auth-check&ver=6.4.3

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
$admin_email = get_option('admin_email');


$post_grid_license = get_option('post_grid_license');
$license_status = isset($post_grid_license['license_status']) ? $post_grid_license['license_status'] : '';



?>
<div class="wrap">

  <div id="cb-dashboard" class=""></div>


</div>