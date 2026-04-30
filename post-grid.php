<?php
/*
Plugin Name: Post Grid
Plugin URI: https://pickplugins.com/post-grid/
Description: Post Grid is extremely easy to use for creating grid-layout and post-layout.
Version: 2.3.23
Author: PickPlugins
Text Domain: post-grid
Author URI: https://www.pickplugins.com/
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/



if (!defined('ABSPATH'))
  exit; // if direct access 

if (!class_exists('PostGrid')) {
  class PostGrid
  {

    public function __construct()
    {


      define('post_grid_plugin_url', plugins_url('/', __FILE__));
      define('post_grid_plugin_dir', plugin_dir_path(__FILE__));
      define('post_grid_plugin_basename', plugin_basename(__FILE__));
      define('post_grid_plugin_name', 'Post Grid');
      define('post_grid_version', '2.3.23');
      define('post_grid_server_url', 'https://demo.pickplugins.com/post-grid/');

      $postGridFonts = [];


      global $PostGridBuilderCss;
      global $postGridFonts;







      include('includes/classes/class-post-types.php');
      include('includes/classes/class-meta-boxes.php');
      include('includes/classes/class-functions.php');
      include('includes/classes/class-shortcodes.php');
      include('includes/classes/class-settings.php');
      include('includes/classes/class-settings-tabs.php');


      include('includes/classes/class-admin-notices.php');

      include('includes/metabox-post-grid-layout-hook.php');
      include('includes/metabox-post-grid-hook.php');
      include('includes/metabox-post-options-hook.php');

      include('includes/settings-hook.php');
      include('templates/post-grid-hook.php');
      include('includes/shortcodes/shortcode-today-date.php');

      include('includes/post-grid-layout-elements.php');
      include('includes/media-source-options.php');
      include('includes/layout-elements/3rd-party.php');
      include('includes/functions-layout-api.php');
      include('includes/functions-ajax.php');
      include('includes/functions-rest.php');



      include('includes/functions-data-upgrade.php');
      //include('includes/functions-single.php');


      include('includes/classes/class-post-grid-support.php');
      include('includes/data-update/class-post-grid-data-update.php');

      include('includes/functions-post-grid.php');
      include('includes/functions.php');
      include('includes/shortcodes/shortcode-current_user_id.php');
      include('includes/duplicate-post.php');

      include('includes/functions-builder.php');
      include('templates/view-grid/index.php');
      include('templates/view-slider/index.php');
      include('templates/view-masonry/index.php');



      add_action('wp_enqueue_scripts', array($this, '_scripts_front'));
      add_action('admin_enqueue_scripts', array($this, '_scripts_admin'));
      add_action('admin_enqueue_scripts', 'wp_enqueue_media');
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









    public function _textdomain()
    {

      $locale = apply_filters('plugin_locale', get_locale(), 'post-grid');
      load_textdomain('post-grid', WP_LANG_DIR . '/post-grid/post-grid-' . $locale . '.mo');
    }


    public function redirect_welcome($plugin)
    {


      if ($plugin == 'post-grid/post-grid.php') {
        wp_safe_redirect(admin_url('edit.php?post_type=post_grid&page=post-grid-builder'));
        exit;
      }
    }

    public function _activation()
    {


      $class_post_grid_functions = new class_post_grid_functions();


      // $post_grid_info = get_option('post_grid_info');
      // $post_grid_info['current_version'] = post_grid_version;
      // $post_grid_info['last_version'] = '2.2.14';
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
      wp_register_script('post-grid-shortcode-scripts', post_grid_plugin_url . 'assets/js/post-grid-shortcode-scripts.js', array('jquery'));



      wp_register_script('justifiedGallery', post_grid_plugin_url . 'assets/js/jquery.justifiedGallery.min.js', array('jquery'));


      wp_register_style('justifiedGallery', post_grid_plugin_url . 'assets/css/justifiedGallery.min.css');

      // Register CSS & Styles
      wp_register_style('post-grid-shortcode-style', post_grid_plugin_url . 'assets/css/post-grid-shortcode-style.css');

      wp_register_style('font-awesome-4', post_grid_plugin_url . 'assets/css/fontawesome-old/css/font-awesome-4.css');
      wp_register_style('font-awesome-5', post_grid_plugin_url . 'assets/css/fontawesome-old/css/font-awesome-5.css');

      wp_register_style('bootstrap-icons', post_grid_plugin_url . 'assets/css/bootstrap-icons/bootstrap-icons.css');
      wp_register_style('fontawesome-icons', post_grid_plugin_url . 'assets/css/fontawesome/css/all.min.css');
      wp_register_style('icofont-icons', post_grid_plugin_url . 'assets/css/icofont/icofont.min.css');
      wp_register_style('splide_core', post_grid_plugin_url . 'assets/css/splide-core.min.css');


      wp_register_script('imagesloaded', post_grid_plugin_url . 'assets/js/imagesloaded.pkgd.min.js', [], '5.0.0', ['in_footer' => true, 'strategy' => 'defer']);
      wp_register_script('fslightbox', post_grid_plugin_url . 'assets/js/fslightbox.js', [], '3.7.4', true);
      wp_register_script('lazyLoad', post_grid_plugin_url . 'assets/js/lazy-load.js', [], '1.0.0', ['in_footer' => true, 'strategy' => 'defer']);
      wp_register_script('splide.min', post_grid_plugin_url . 'assets/js/splide.min.js', [], '4.1.6', ['in_footer' => true, 'strategy' => 'defer']);


      wp_register_script('pgpostgrid_builder-js', post_grid_plugin_url . 'assets/js/builder-js.js', [], '1.0.0', []);

      wp_register_script('post-grid-slider-front', post_grid_plugin_url . 'templates/view-slider/front-scripts.js', [], '1.0.0', ['in_footer' => true, 'strategy' => 'defer']);

      wp_register_script('scrollto', post_grid_plugin_url . 'assets/js/jquery-scrollto.js', array('jquery'));

      //wp_register_style('pg_block_styles', post_grid_plugin_url . 'assets/block-css/block-styles.min.css');
      wp_register_style('pg_block_styles', post_grid_plugin_url . 'assets/block-css/block-styles.css');
      wp_register_style('animate', post_grid_plugin_url . 'assets/css/animate.min.css');

      // if (is_singular()) {
      //   $upload_dir = wp_upload_dir();


      //   $post_id = get_the_ID();
      //   $combo_blocks_css_file_id = get_post_meta($post_id, 'combo_blocks_css_file_id', true);
      //   $combo_blocks_generate_css = get_post_meta($post_id, 'combo_blocks_generate_css', true);

      //   if ($combo_blocks_generate_css) {
      //     wp_enqueue_style('block-styles-' . $post_id, $upload_dir['baseurl'] . '/combo-blocks/block-styles-' . $post_id . '.css');
      //   }
      // }
    }


    public function _scripts_admin()
    {

      $screen = get_current_screen();


      wp_register_script('post_grid_admin_js', post_grid_plugin_url . 'assets/js/post-grid-admin.js', array('jquery'));

      wp_register_script('select2', post_grid_plugin_url . 'assets/js/select2.full.js', array('jquery'));
      wp_register_style('select2', post_grid_plugin_url . 'assets/css/select2.min.css');

      wp_register_script('jquery.lazy', post_grid_plugin_url . 'assets/js/jquery.lazy.js', array('jquery'));

      wp_register_script('pgpostgrid_builder-js', post_grid_plugin_url . 'assets/js/builder-js.js', []);
      // wp_enqueue_style('post_grid_skin', post_grid_plugin_url . 'assets/global/css/style.skins.css');

      wp_register_style('jquery-ui', post_grid_plugin_url . 'assets/css/jquery-ui.css');
      wp_register_style('font-awesome-4', post_grid_plugin_url . 'assets/css/fontawesome-old/css/font-awesome-4.css');
      wp_register_style('font-awesome-5', post_grid_plugin_url . 'assets/css/fontawesome-old/css/font-awesome-5.css');
      wp_register_style('pg-admin-g-fonts', 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

      wp_enqueue_style('pg-admin-g-fonts');
      wp_enqueue_style('font-awesome-5');


      wp_register_style('icofont-icons', post_grid_plugin_url . 'assets/css/icofont/icofont.min.css');
      wp_enqueue_style('icofont-icons');

      wp_register_style('bootstrap-icons', post_grid_plugin_url . 'assets/css/bootstrap-icons/bootstrap-icons.css');

      wp_enqueue_style('bootstrap-icons');



      wp_register_style('settings-tabs', post_grid_plugin_url . 'assets/settings-tabs/settings-tabs.css');
      wp_register_script('settings-tabs', post_grid_plugin_url . 'assets/settings-tabs/settings-tabs.js', array('jquery'));




      wp_register_script('post_grid_layouts', post_grid_plugin_url . 'assets/js/scripts-layouts.js', array('jquery'));








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



      if ($screen->id == 'post_grid_page_post-grid-settings') {

        wp_enqueue_script('post_grid_admin_js');
        wp_localize_script('post_grid_admin_js', 'post_grid_ajax', array('post_grid_ajaxurl' => admin_url('admin-ajax.php')));
        wp_enqueue_style('select2');
        wp_enqueue_script('select2');

        $settings_tabs_field = new settings_tabs_field();
        $settings_tabs_field->admin_scripts();

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
  }
}
new PostGrid();
