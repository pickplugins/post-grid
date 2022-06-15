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
    }


    public function post_grid_menu_init()
    {

        $post_grid_info = get_option('post_grid_info');

        add_menu_page(__('Post Grid - Overview', 'breadcrumb'), __('Post Grid', 'breadcrumb'), 'manage_options', 'post-grid', array($this, 'post_grid'), post_grid_plugin_url . 'assets/admin/images/post-grid-20.png');



        add_submenu_page('post-grid', __('Settings', 'post-grid'), __('Settings', 'post-grid'), 'manage_options', 'post-grid-settings', array($this, 'settings'));

        add_submenu_page('post-grid', __('Layouts library', 'post-grid'), __('Layouts library', 'post-grid'), 'manage_options', 'import_layouts', array($this, 'import_layouts'));

        add_submenu_page('post-grid', __('Overview', 'post-grid'), __('Overview', 'post-grid'), 'manage_options', 'overview', array($this, 'overview'));
        //add_submenu_page('post-grid', __('Post Grid', 'post-grid'), __('All Post Grid', 'post-grid'), 'manage_options', 'edit.php?post_type=post_grid',);
        //add_submenu_page('post-grid', __('Layouts', 'post-grid'), __('All Layouts', 'post-grid'), 'manage_options', 'edit.php?post_type=post_grid_layout',);
    }

    public function overview()
    {
        include(post_grid_plugin_dir . 'includes/menu/overview.php');
    }


    public function settings()
    {
        include(post_grid_plugin_dir . 'includes/menu/settings.php');
    }

    public function addons()
    {
        include(post_grid_plugin_dir . 'includes/menu/addons.php');
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
