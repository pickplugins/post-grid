<?php
/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins.com
*/
if (!defined('ABSPATH')) exit;  // if direct access
class class_post_grid_settings
{
    public function __construct()
    {
        add_action('admin_menu', array($this, 'post_grid_menu_init'));
        //add_action('admin_menu', array($this, '_access_non_admin'));
    }
    public function _access_non_admin()
    {
        if (!current_user_can('administrator')) :
            remove_menu_page('edit.php?post_type=post_grid');
            remove_menu_page('post-new.php?post_type=post_grid');
            remove_menu_page('edit.php?post_type=post_grid_templates');
            remove_menu_page('edit.php?post_type=post_grid_layout');
        endif;
    }
    public function post_grid_menu_init()
    {
        if (!current_user_can('administrator')) return;
        $post_grid_info = get_option('post_grid_info');
        $data_update_status = isset($post_grid_info['data_update_status']) ? $post_grid_info['data_update_status'] : 'pending';
        
        add_submenu_page('post-grid', __('Create New', 'post-grid'), __('Create New', 'post-grid'), 'manage_options', 'post-new.php?post_type=post_grid', '', 20);
        //add_submenu_page('edit.php?post_type=post_grid', __('Import Layouts', 'post-grid'), __('Import Layouts', 'post-grid'), 'manage_options', 'import_layouts', array($this, 'import_layouts'), 70);
        //add_submenu_page('post-grid', __('Layouts', 'post-grid'), __('All Layouts', 'post-grid'), 'manage_options', 'edit.php?post_type=post_grid_layout',);
        add_submenu_page('edit.php?post_type=post_grid', __('Settings', 'post-grid'), __('Settings', 'post-grid'), 'manage_options', 'post-grid-settings', array($this, 'settings'), 80);
        //add_submenu_page('post-grid', __('Dashboard', 'post-grid'), __('Dashboard', 'post-grid'), 'manage_options', 'post-grid-dashboard', array($this, 'dashboard'), 80);
        if ($data_update_status == 'pending') :
        //add_submenu_page('post-grid', __('Data Update', 'post-grid'), __('Data Update', 'post-grid'), 'manage_options', 'data_update', array($this, 'import_layouts'));
        endif;

        add_submenu_page('edit.php?post_type=post_grid', __('Builder', 'post-grid'), __('Builder', 'post-grid'), 'manage_options', 'post-grid-builder', array($this, 'builder'));
    }

    public function builder()
    {
        // include('menu/builder.php');
        include(post_grid_plugin_dir . 'includes/menu/builder.php');
    }


    public function dashboard()
    {
        include(post_grid_plugin_dir . 'includes/menu/dashboard.php');
    }
    public function settings()
    {
        include(post_grid_plugin_dir . 'includes/menu/settings.php');
    }
    public function data_update()
    {
        include(post_grid_plugin_dir . 'includes/menu/data-update.php');
    }
    public function import_layouts()
    {
        include(post_grid_plugin_dir . 'includes/menu/import-layouts.php');
    }
}
new class_post_grid_settings();
