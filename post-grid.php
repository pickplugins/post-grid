<?php
/*
Plugin Name: Post Grid Combo
Plugin URI: https://www.pickplugins.com/post-grid
Description: Post Grid Combo is extremely easy to use for creating grid-layout and post-layout. Also, we're offering many small blocks with extensive flexibility.
Version: 2.2.17
Author: PickPlugins
Author URI: https://www.pickplugins.com/
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/



if (!defined('ABSPATH')) exit;  // if direct access 

if (!class_exists('PostGrid')) {
    class PostGrid
    {

        public function __construct()
        {

            add_action('plugins_loaded', [$this, 'init_plugin']);


            define('post_grid_plugin_url', plugins_url('/', __FILE__));
            define('post_grid_plugin_dir', plugin_dir_path(__FILE__));
            define('post_grid_plugin_basename', plugin_basename(__FILE__));
            define('post_grid_plugin_name', 'Post Grid Combo');
            define('post_grid_version', '2.2.17');
            define('post_grid_server_url', 'https://www.pickplugins.com/demo/post-grid/');


            define('post_grid_lic_server_url', 'https://www.pickplugins.com');

            require_once(post_grid_plugin_dir . 'src/functions-blocks.php');
            require_once(post_grid_plugin_dir . 'src/functions-rest.php');

            require_once(post_grid_plugin_dir . 'src/blocks/post-grid/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/post-title/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/post-excerpt/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/text/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/read-more/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/post-featured-image/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/post-categories/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/post-tags/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/post-author/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/post-taxonomies/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/post-author-fields/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/post-date/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/accordion/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/tabs/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/terms-list/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/layers/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/layer/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/image/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/list/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/icon/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/post-meta/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/post-grid-filterable/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/shortcode/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/social-share/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/breadcrumb/index.php');


            $postGridCss = [];
            $postGridCssY = [];
            $postGridScriptData = [];

            global $postGridCss;
            global $postGridCustomCss;
            global $postGridCssY;
            global $postGridScriptData;

            global $postGridLoaded;




            include('includes/classes/class-post-types.php');
            include('includes/classes/class-meta-boxes.php');
            include('includes/classes/class-functions.php');
            include('includes/classes/class-shortcodes.php');
            include('includes/classes/class-settings.php');
            include('includes/classes/class-settings-tabs.php');
            include('includes/classes/class-post-grid-license.php');


            include('includes/classes/class-admin-notices.php');

            include('includes/metabox-post-grid-layout-hook.php');
            include('includes/metabox-post-grid-hook.php');
            include('includes/metabox-post-options-hook.php');

            include('includes/settings-hook.php');
            include('templates/post-grid-hook.php');

            include('includes/post-grid-layout-elements.php');
            include('includes/media-source-options.php');
            include('includes/layout-elements/3rd-party.php');
            include('includes/functions-layout-api.php');


            include('includes/functions-data-upgrade.php');
            //include('includes/functions-single.php');


            include('includes/classes/class-post-grid-support.php');
            include('includes/data-update/class-post-grid-data-update.php');

            include('includes/functions-post-grid.php');
            include('includes/functions.php');
            include('includes/shortcodes/shortcode-current_user_id.php');
            include('includes/duplicate-post.php');


            add_action('wp_enqueue_scripts', array($this, '_scripts_front'));
            add_action('admin_enqueue_scripts', array($this, '_scripts_admin'));
            add_action('admin_enqueue_scripts', 'wp_enqueue_media');

            add_action('plugins_loaded', array($this, '_textdomain'));

            register_activation_hook(__FILE__, array($this, '_activation'));
            register_deactivation_hook(__FILE__, array($this, '_deactivation'));


            add_action('activated_plugin', array($this, 'redirect_welcome'));


            // $args = array(
            //     'post_types' => array('post_grid', 'post_grid_layout', 'post_grid_template'),
            // );

            // new PPduplicatePost($args);
        }





        public function init_plugin()
        {
            $this->enqueue_scripts();
        }

        public function _textdomain()
        {

            $locale = apply_filters('plugin_locale', get_locale(), 'post-grid');
            load_textdomain('post-grid', WP_LANG_DIR . '/post-grid/post-grid-' . $locale . '.mo');

            load_plugin_textdomain('post-grid', false, plugin_basename(dirname(__FILE__)) . '/languages/');
        }


        public function redirect_welcome($plugin)
        {


            if ($plugin == 'post-grid/post-grid.php') {
                wp_safe_redirect(admin_url('admin.php?page=post-grid-overview'));
                exit;
            }
        }

        public function _activation()
        {


            $class_post_grid_functions = new class_post_grid_functions();


            // $post_grid_info = get_option('post_grid_info');
            // $post_grid_info['current_version'] = post_grid_version;
            // $post_grid_info['last_version'] = '2.2.13';
            // $post_grid_info['data_update_status'] = isset($post_grid_info['data_update_status']) ? $post_grid_info['data_update_status'] : 'pending';
            // update_option('post_grid_info', $post_grid_info);


            $class_post_grid_post_types = new class_post_grid_post_types();
            $class_post_grid_post_types->_posttype_post_grid();
            $class_post_grid_post_types->_posttype_post_grid_layout();


            flush_rewrite_rules();

            /*
             * Custom action hook for plugin activation.
             * Action hook: post_grid_activation
             * */
            do_action('post_grid_activation');
        }

        public function post_grid_uninstall()
        {

            /*
             * Custom action hook for plugin uninstall/delete.
             * Action hook: post_grid_uninstall
             * */
            do_action('post_grid_uninstall');
        }

        public function _deactivation()
        {

            /*
             * Custom action hook for plugin deactivation.
             * Action hook: post_grid_deactivation
             * */
            do_action('post_grid_deactivation');
        }


        public function _scripts_front()
        {


            wp_enqueue_script('jquery');

            // Register Scripts & JS
            wp_register_script('post_grid_scripts', post_grid_plugin_url . 'assets/frontend/js/scripts.js', array('jquery'));

            //wp_register_script('masonry', post_grid_plugin_url . 'assets/frontend/js/masonry.pkgd.min.js', array('jquery'));
            //wp_register_script('imagesloaded', post_grid_plugin_url . 'assets/frontend/js/imagesloaded.pkgd.js', array('jquery'));

            // Register CSS & Styles
            wp_register_style('post-grid-style', post_grid_plugin_url . 'assets/frontend/css/style.css');
            wp_register_style('post-grid-skin', post_grid_plugin_url . 'assets/global/css/style.skins.css');

            wp_register_style('font-awesome-4', post_grid_plugin_url . 'assets/global/css/font-awesome-4.css');
            wp_register_style('font-awesome-5', post_grid_plugin_url . 'assets/global/css/font-awesome-5.css');

            wp_register_style('bootstrap-icons', post_grid_plugin_url . 'assets/css/bootstrap-icons/bootstrap-icons.css');
            wp_register_style('fontawesome-icons', post_grid_plugin_url . 'assets/css/fontawesome/css/all.min.css');
            wp_register_style('icofont-icons', post_grid_plugin_url . 'assets/css/icofont/icofont.min.css');
        }

        public function enqueue_scripts()
        {
            add_action('enqueue_block_editor_assets', [$this, 'register_block_editor_assets']);
        }

        public function _scripts_admin()
        {

            $screen = get_current_screen();


            //var_dump($screen);

            wp_register_script('post_grid_admin_js', post_grid_plugin_url . 'assets/admin/js/scripts.js', array('jquery'));

            wp_register_script('select2', post_grid_plugin_url . 'assets/admin/js/select2.full.js', array('jquery'));
            wp_register_style('select2', post_grid_plugin_url . 'assets/admin/css/select2.min.css');

            wp_register_script('jquery.lazy', post_grid_plugin_url . 'assets/admin/js/jquery.lazy.js', array('jquery'));


            wp_enqueue_style('post_grid_skin', post_grid_plugin_url . 'assets/global/css/style.skins.css');

            wp_register_style('jquery-ui',  post_grid_plugin_url . 'assets/admin/css/jquery-ui.css');

            wp_register_style('font-awesome-4', post_grid_plugin_url . 'assets/global/css/font-awesome-4.css');
            wp_register_style('font-awesome-5', post_grid_plugin_url . 'assets/global/css/font-awesome-5.css');

            wp_enqueue_style('font-awesome-5');


            wp_register_style('icofont', post_grid_plugin_url . 'assets/global/css/icofont/icofont.min.css');

            wp_enqueue_style('icofont');

            wp_register_style('bootstrap-icons', post_grid_plugin_url . 'assets/global/css/bootstrap-icons/bootstrap-icons.css');

            wp_enqueue_style('bootstrap-icons');



            wp_register_style('settings-tabs', post_grid_plugin_url . 'assets/settings-tabs/settings-tabs.css');
            wp_register_script('settings-tabs', post_grid_plugin_url . 'assets/settings-tabs/settings-tabs.js', array('jquery'));


            wp_register_style('layout-editor', post_grid_plugin_url . 'assets/admin/css/layout-editor.css');
            wp_register_script('layout-editor', post_grid_plugin_url . 'assets/admin/js/layout-editor.js', array('jquery'));

            wp_register_style('post-grid-addons', post_grid_plugin_url . 'assets/admin/css/addons.css');

            wp_register_script('post_grid_layouts', post_grid_plugin_url . 'assets/admin/js/scripts-layouts.js', array('jquery'));

            wp_localize_script(
                'post_grid_layouts',
                'post_grid_ajax',
                array(
                    'post_grid_ajaxurl' => admin_url('admin-ajax.php'),
                    'ajax_nonce' => wp_create_nonce('post_grid_ajax_nonce'),
                )
            );

            if ($screen->id == 'post_grid') {

                wp_enqueue_script('post_grid_admin_js');
                wp_localize_script('post_grid_admin_js', 'post_grid_ajax', array('post_grid_ajaxurl' => admin_url('admin-ajax.php')));

                wp_enqueue_style('post_grid_skin');



                wp_enqueue_style('select2');
                wp_enqueue_script('select2');

                $settings_tabs_field = new settings_tabs_field();
                $settings_tabs_field->admin_scripts();
            }

            if ($screen->id == 'post_grid_layout') {

                wp_enqueue_style('select2');
                wp_enqueue_script('select2');



                $settings_tabs_field = new settings_tabs_field();
                $settings_tabs_field->admin_scripts();
            }


            if ($screen->id == 'post-grid-combo_page_post-grid-settings') {

                wp_enqueue_script('post_grid_admin_js');
                wp_localize_script('post_grid_admin_js', 'post_grid_ajax', array('post_grid_ajaxurl' => admin_url('admin-ajax.php')));
                wp_enqueue_style('select2');
                wp_enqueue_script('select2');


                wp_enqueue_style(
                    'prefix-editor',
                    post_grid_plugin_url . 'dist/output.css',
                    [],
                    time(),
                    'all'
                );

                $settings_tabs_field = new settings_tabs_field();
                $settings_tabs_field->admin_scripts();
            }
        }



        public function register_block_editor_assets()
        {

            wp_enqueue_style(
                'post-grid-editor',
                post_grid_plugin_url . '/dist/output.css',
                [],
                time(),
                'all'
            );



            wp_enqueue_style(
                'post-grid-custom',
                post_grid_plugin_url . '/dist/custom.css',
                [],
                time(),
                'all'
            );

            wp_enqueue_style(
                'PostGrid-v1.0',
                post_grid_plugin_url . '/assets/PostGrid-v1.0/style.css',
                [],
                time(),
                'all'
            );


            wp_enqueue_script(
                'post-grid-blocks',
                post_grid_plugin_url . 'build/index.js',
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
    }
}
new PostGrid();
