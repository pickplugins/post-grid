<?php
/*
Plugin Name: Post Grid Gutenberg Blocks
Plugin URI: https://comboblocks.com/
Description: Post Grid is extremely easy to use for creating grid-layout and post-layout. Also, we're offering many small blocks with extensive flexibility.
Version: 2.2.96
Author: PickPlugins
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


      add_action('plugins_loaded', [$this, 'init_plugin']);
      define('post_grid_plugin_url', plugins_url('/', __FILE__));
      define('post_grid_plugin_dir', plugin_dir_path(__FILE__));
      define('post_grid_plugin_basename', plugin_basename(__FILE__));
      define('post_grid_plugin_name', 'Combo Blocks');
      define('post_grid_version', '2.2.96');
      define('post_grid_server_url', 'https://pickplugins.com/demo/post-grid/');





      $postGridCss = [];
      $postGridCssY = [];
      $postGridScriptData = [];
      $postGridFonts = [];


      global $postGridLdJson;
      global $postGridCss;
      global $postGridCustomCss;
      global $postGridCssY;
      global $postGridScriptData;
      global $postGridFonts;

      global $postGridLoaded;



      $this->load_blocks();

      require_once(post_grid_plugin_dir . 'addons/elementor/init.php');


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
    public function load_blocks()
    {


      $post_grid_block_editor = get_option('post_grid_block_editor');
      $blocks = isset($post_grid_block_editor['blocks']) ? $post_grid_block_editor['blocks'] : [];
      $disabled = isset($blocks['disabled']) ? $blocks['disabled'] : [];






      require_once(post_grid_plugin_dir . 'includes/blocks/functions-blocks.php');
      require_once(post_grid_plugin_dir . 'includes/blocks/functions-rest.php');






      if (!in_array('post-grid/text', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/text/index.php');
      }
      if (!in_array('post-grid/icon', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/icon/index.php');
      }
      if (!in_array('post-grid/post-grid', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/post-grid/index.php');
      }
      if (!in_array('post-grid/post-query', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/post-query/index.php');
      }


      if (!in_array('post-grid/post-query-pagination', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/post-query-pagination/index.php');
      }
      if (!in_array('post-grid/wordpress-org', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/wordpress-org/index.php');
      }
      if (!in_array('post-grid/wordpress-org-item', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/wordpress-org-item/index.php');
      }
      if (!in_array('post-grid/menu-wrap', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/menu-wrap/index.php');
      }
      if (!in_array('post-grid/menu-wrap-item', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/menu-wrap-item/index.php');
      }
      if (!in_array('post-grid/google-map', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/google-map/index.php');
      }


      if (!in_array('post-grid/post-title', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/post-title/index.php');;
      }
      if (!in_array('post-grid/post-excerpt', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/post-excerpt/index.php');
      }
      if (!in_array('post-grid/read-more', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/read-more/index.php');
      }
      if (!in_array('post-grid/post-featured-image', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/post-featured-image/index.php');
      }
      if (!in_array('post-grid/post-categories', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/post-categories/index.php');
      }
      if (!in_array('post-grid/post-tags', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/post-tags/index.php');
      }
      if (!in_array('post-grid/post-author', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/post-author/index.php');
      }
      if (!in_array('post-grid/post-taxonomies', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/post-taxonomies/index.php');
      }
      if (!in_array('post-grid/post-author-fields', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/post-author-fields/index.php');
      }
      if (!in_array('post-grid/post-date', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/post-date/index.php');
      }

      if (!in_array('post-grid/tabs-nested', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/tabs-nested/index.php');
      }
      if (!in_array('post-grid/tabs-nested-item', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/tabs-nested-item/index.php');
      }
      if (!in_array('post-grid/terms-list', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/terms-list/index.php');
      }
      if (!in_array('post-grid/flip-box', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/flip-box/index.php');
      }
      if (!in_array('post-grid/flip-box-back', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/flip-box-back/index.php');
      }
      if (!in_array('post-grid/flip-box-front', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/flip-box-front/index.php');
      }
      if (!in_array('post-grid/user-query', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/user-query/index.php');
      }
      if (!in_array('post-grid/user-query-pagination', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/user-query-pagination/index.php');
      }

      if (!in_array('post-grid/user-fields', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/user-fields/index.php');
      }



      if (!in_array('post-grid/layers', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/layers/index.php');
      }
      if (!in_array('post-grid/layer', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/layer/index.php');
      }
      if (!in_array('post-grid/image', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/image/index.php');
      }
      if (!in_array('post-grid/list-nested', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/list-nested/index.php');
      }
      if (!in_array('post-grid/list-nested-item', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/list-nested-item/index.php');
      }
      if (!in_array('post-grid/number-counter', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/number-counter/index.php');
      }
      if (!in_array('post-grid/date-countdown', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/date-countdown/index.php');
      }

      if (!in_array('post-grid/popup', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/popup/index.php');
      }
      if (!in_array('post-grid/progress-bar', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/progress-bar/index.php');
      }
      if (!in_array('post-grid/list', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/list/index.php');
      }
      if (!in_array('post-grid/image-gallery', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/image-gallery/index.php');
      }
      if (!in_array('post-grid/image-gallery-item', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/image-gallery-item/index.php');
      }
      if (!in_array('post-grid/content-slider', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/content-slider/index.php');
      }
      if (!in_array('post-grid/content-slider-item', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/content-slider-item/index.php');
      }
      if (!in_array('post-grid/post-meta', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/post-meta/index.php');
      }
      if (!in_array('post-grid/post-grid-filterable', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/post-grid-filterable/index.php');
      }
      if (!in_array('post-grid/post-grid-filterable-nav', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/post-grid-filterable-nav/index.php');
      }
      if (!in_array('post-grid/shortcode', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/shortcode/index.php');
      }
      if (!in_array('post-grid/social-share', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/social-share/index.php');
      }
      if (!in_array('post-grid/breadcrumb', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/breadcrumb/index.php');
      }
      if (!in_array('post-grid/archive-title', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/archive-title/index.php');
      }
      if (!in_array('post-grid/archive-description', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/archive-description/index.php');
      }
      if (!in_array('post-grid/post-comment-count', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/post-comment-count/index.php');
      }
      if (!in_array('post-grid/star-rate', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/star-rate/index.php');
      }
      if (!in_array('post-grid/accordion-nested', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/accordion-nested/index.php');
      }
      if (!in_array('post-grid/accordion-nested-item', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/accordion-nested-item/index.php');
      }
      if (!in_array('post-grid/flex-wrap', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/flex-wrap/index.php');
      }
      if (!in_array('post-grid/flex-wrap-item', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/flex-wrap-item/index.php');
      }
      if (!in_array('post-grid/masonry-wrap', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/masonry-wrap/index.php');
      }
      if (!in_array('post-grid/masonry-wrap-item', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/masonry-wrap-item/index.php');
      }
      if (!in_array('post-grid/grid-wrap', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/grid-wrap/index.php');
      }
      if (!in_array('post-grid/grid-wrap-item', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/grid-wrap-item/index.php');
      }
      if (!in_array('post-grid/team-showcase', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/team-showcase/index.php');
      }


      if (!in_array('post-grid/team-members', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/team-members/index.php');
      }
      if (!in_array('post-grid/team-members-field', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/team-members-field/index.php');
      }

      if (!in_array('post-grid/testimonial-showcase', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/testimonial-showcase/index.php');
      }


      if (!in_array('post-grid/testimonials', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/testimonials/index.php');
      }
      if (!in_array('post-grid/testimonials-field', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/testimonials-field/index.php');
      }

      if (!in_array('post-grid/back-to-top', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/back-to-top/index.php');
      }
      if (!in_array('post-grid/form-wrap', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/form-wrap/index.php');
      }
      if (!in_array('post-grid/form-wrap', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/form-wrap/functions.php');
      }




      if (!in_array('post-grid/images', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/images/index.php');
      }
      if (!in_array('post-grid/images-field', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/images-field/index.php');
      }


      if (!in_array('post-grid/image-accordion', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/image-accordion/index.php');
      }



      if (!in_array('post-grid/form-field-simple-math', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/form-field-simple-math/index.php');
      }
      if (!in_array('post-grid/form-field-input', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/form-field-input/index.php');
      }
      if (!in_array('post-grid/form-field-file-multi', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/form-field-file-multi/index.php');
      }
      if (!in_array('post-grid/form-field-file', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/form-field-file/index.php');
      }
      if (!in_array('post-grid/form-field-submit', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/form-field-submit/index.php');
      }

      if (!in_array('post-grid/form-field-recaptcha', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/form-field-recaptcha/index.php');
      }

      if (!in_array('post-grid/form-field-hcaptcha', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/form-field-hcaptcha/index.php');
      }

      if (!in_array('post-grid/form-field-checkbox', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/form-field-checkbox/index.php');
      }
      if (!in_array('post-grid/form-field-radio', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/form-field-radio/index.php');
      }
      if (!in_array('post-grid/form-field-select', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/form-field-select/index.php');
      }
      if (!in_array('post-grid/form-field-textarea', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/form-field-textarea/index.php');
      }

      if (!in_array('post-grid/terms-query', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/terms-query/index.php');
      }
      if (!in_array('post-grid/terms-query-item', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/terms-query-item/index.php');
      }

      if (!in_array('post-grid/woo-sku', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/woo-sku/index.php');
      }
      if (!in_array('post-grid/woo-total-sales', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/woo-total-sales/index.php');
      }
      if (!in_array('post-grid/woo-stock-quantity', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/woo-stock-quantity/index.php');
      }
      if (!in_array('post-grid/woo-product-info', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/woo-product-info/index.php');
      }
      if (!in_array('post-grid/woo-product-info-item', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/woo-product-info-item/index.php');
      }
      if (!in_array('post-grid/woo-price', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/woo-price/index.php');
      }
      if (!in_array('post-grid/woo-add-to-cart', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/woo-add-to-cart/index.php');
      }
      if (!in_array('post-grid/woo-star-rate', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/woo-star-rate/index.php');
      }
      if (!in_array('post-grid/woo-sale', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/woo-sale/index.php');
      }
      if (!in_array('post-grid/woo-stock', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/woo-stock/index.php');
      }
      if (!in_array('post-grid/woo-my-account', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/woo-my-account/index.php');
      }
      if (!in_array('post-grid/woo-product-tabs', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/woo-product-tabs/index.php');
      }
      if (!in_array('post-grid/woo-breadcrumb', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/woo-breadcrumb/index.php');
      }
      if (!in_array('post-grid/post-comments', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/post-comments/index.php');
      }
      if (!in_array('post-grid/info-box', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/info-box/index.php');
      }
      if (!in_array('post-grid/info-box-item', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/info-box-item/index.php');
      }
      if (!in_array('post-grid/table', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/table/index.php');
      }
      if (!in_array('post-grid/table-td', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/table-td/index.php');
      }
      if (!in_array('post-grid/table-tr', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/table-tr/index.php');
      }

      if (!in_array('post-grid/business-hours', $disabled)) {
        require_once(post_grid_plugin_dir . 'includes/blocks/business-hours/index.php');
      }

      // if (!in_array('post-grid/videos', $disabled)) {
      //   require_once(post_grid_plugin_dir . 'includes/blocks/videos/index.php');
      // }


      // if (!in_array('post-grid/woo-related-products', $disabled)) {
      //   require_once(post_grid_plugin_dir . 'includes/blocks/woo-related-products/index.php');
      // }

      // if (!in_array('post-grid/woo-sale-products', $disabled)) {
      //   require_once(post_grid_plugin_dir . 'includes/blocks/woo-sale-products/index.php');
      // }

      // if (!in_array('post-grid/woo-sale-products', $disabled)) {
      //   require_once(post_grid_plugin_dir . 'includes/blocks/woo-sale-products/index.php');
      // }

      // if (!in_array('post-grid/woo-best-selling-products', $disabled)) {
      //   require_once(post_grid_plugin_dir . 'includes/blocks/woo-best-selling-products/index.php');
      // }

      // if (!in_array('post-grid/woo-top-rated-products', $disabled)) {
      //   require_once(post_grid_plugin_dir . 'includes/blocks/woo-top-rated-products/index.php');
      // }

      // if (!in_array('post-grid/woo-products', $disabled)) {
      //   require_once(post_grid_plugin_dir . 'includes/blocks/woo-products/index.php');
      // }

      // if (!in_array('post-grid/woo-recent-products', $disabled)) {
      //   require_once(post_grid_plugin_dir . 'includes/blocks/woo-recent-products/index.php');
      // }

      // if (!in_array('post-grid/woo-categories', $disabled)) {
      //   require_once(post_grid_plugin_dir . 'includes/blocks/woo-categories/index.php');
      // }
      // if (!in_array('post-grid/woo-login-form', $disabled)) {
      //   require_once(post_grid_plugin_dir . 'includes/blocks/woo-login-form/index.php');
      // }




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
      wp_register_style('pgpopup_animate', post_grid_plugin_url . 'assets/css/animate.min.css');
      wp_register_style('pgcontent_slider_splide_core', post_grid_plugin_url . 'assets/css/splide-core.min.css');


      wp_register_script('imagesloaded', post_grid_plugin_url . 'assets/js/imagesloaded.pkgd.min.js', [], '', ['in_footer' => true, 'strategy' => 'defer']);

      wp_register_script('masonry', post_grid_plugin_url . 'assets/js/masonry.pkgd.js', [], '', ['in_footer' => true, 'strategy' => 'defer']);
      wp_register_script('masonry.min', post_grid_plugin_url . 'assets/js/masonry.pkgd.min.js', [], '', ['in_footer' => true, 'strategy' => 'defer']);
      wp_register_script('fslightbox', post_grid_plugin_url . 'assets/js/fslightbox.js', [], '', true);
      wp_register_script('lazyLoad', post_grid_plugin_url . 'assets/js/lazy-load.js', [], '', ['in_footer' => true, 'strategy' => 'defer']);
      wp_register_script('splide.min', post_grid_plugin_url . 'assets/js/splide.min.js', [], '', ['in_footer' => true, 'strategy' => 'defer']);

      wp_register_script('pgpostgrid_mixitup', post_grid_plugin_url . 'assets/js/mixitup.min.js', []);
      wp_register_script('pgpostgrid_mixitup_multifilter', post_grid_plugin_url . 'assets/js/mixitup-multifilter.js', []);
      wp_register_script('pgpostgrid_mixitup_pagination', post_grid_plugin_url . 'assets/js/mixitup-pagination.js', []);

      wp_register_script('scrollto', post_grid_plugin_url . 'assets/js/jquery-scrollto.js', array('jquery'));

      wp_register_style('pg_block_styles', post_grid_plugin_url . 'assets/block-css/block-styles.min.css');
      wp_register_script('pg_block_scripts', post_grid_plugin_url . 'assets/block-js/block-scripts.js', [], '', ['in_footer' => true, 'strategy' => 'defer']);
      wp_register_script('tippy-bundle.min', post_grid_plugin_url . 'assets/js/tippy-bundle.umd.js', [], '', ['in_footer' => true, 'strategy' => 'defer']);
      wp_register_script('popper.min', post_grid_plugin_url . 'assets/js/popper.min.js', [], '', ['in_footer' => true, 'strategy' => 'defer']);
      wp_register_script('vanilla-tilt.min', post_grid_plugin_url . 'assets/js/vanilla-tilt.min.js', [], '', ['in_footer' => true, 'strategy' => 'defer']);
      wp_register_script('typed.umd', post_grid_plugin_url . 'assets/js/typed.umd.js', [], '', ['in_footer' => true, 'strategy' => 'defer']);

      wp_register_script('hcaptcha-script', 'https://hcaptcha.com/1/api.js');





      if (is_singular()) {
        $upload_dir = wp_upload_dir();


        $post_id = get_the_ID();
        $combo_blocks_css_file_id = get_post_meta($post_id, 'combo_blocks_css_file_id', true);

        if (!empty($combo_blocks_css_file_id)) {
          //wp_enqueue_style('block-styles-' . $post_id, $upload_dir['baseurl'] . '/combo-blocks/block-styles-' . $post_id . '.css');
        }
      }
    }

    public function enqueue_scripts()
    {
      add_action('enqueue_block_editor_assets', [$this, 'register_block_editor_assets']);
    }

    public function _scripts_admin()
    {

      $screen = get_current_screen();



      wp_register_script('post_grid_admin_js', post_grid_plugin_url . 'assets/js/post-grid-admin.js', array('jquery'));

      wp_register_script('select2', post_grid_plugin_url . 'assets/js/select2.full.js', array('jquery'));
      wp_register_style('select2', post_grid_plugin_url . 'assets/css/select2.min.css');

      wp_register_script('jquery.lazy', post_grid_plugin_url . 'assets/js/jquery.lazy.js', array('jquery'));


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



      if ($screen->id == 'combo-blocks_page_post-grid-settings') {

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



    public function register_block_editor_assets()
    {

      wp_enqueue_style(
        'pgcontent_slider_splide_core',
        post_grid_plugin_url . 'assets/css/splide-core.min.css',
        [],
        time(),
        'all'
      );


      wp_enqueue_style(
        'post-grid-editor',
        post_grid_plugin_url . '/dist/output.css',
        [],
        time(),
        'all'
      );



      // wp_enqueue_style(
      //   'pg-google-fonts',
      //   'https://fonts.googleapis.com/css?family=CharukolaUltraLight|ABeeZee|Abel|Abhaya+Libre|Abril+Fatface|Aclonica|Acme|Actor|Adamina|Advent+Pro|Aguafina+Script|Akaya+Kanadaka|Akaya+Telivigala|Akronim|Aladin|Alata|Alatsi|Aldrich|Alef|Alegreya|Alegreya+SC|Alegreya+Sans|Alegreya+Sans+SC|Aleo|Alex+Brush|Alfa+Slab+One|Alice|Alike|Alike+Angular|Allan|Allerta|Allerta+Stencil|Allura|Almarai|Almendra|Almendra+Display|Almendra+SC|Amarante|Amaranth|Amatic+SC|Amethysta|Amiko|Amiri|Amita|Anaheim|Andada|Andika|Andika+New+Basic|Angkor|Annie+Use+Your+Telescope|Anonymous+Pro|Antic|Antic+Didone|Antic+Slab|Anton|Antonio|Arapey|Arbutus|Arbutus+Slab|Architects+Daughter|Archivo|Archivo+Black|Archivo+Narrow|Aref+Ruqaa|Arima+Madurai|Arimo|Arizonia|Armata|Arsenal|Artifika|Arvo|Arya|Asap|Asap+Condensed|Asar|Asset|Assistant|Astloch|Asul|Athiti|Atma|Atomic+Age|Aubrey|Audiowide|Autour+One|Average|Average+Sans|Averia+Gruesa+Libre|Averia+Libre|Averia+Sans+Libre|Averia+Serif+Libre|B612|B612+Mono|Bad+Script|Bahiana|Bahianita|Bai+Jamjuree|Ballet|Baloo+2|Baloo+Bhai+2|Baloo+Bhaina+2|Baloo+Chettan+2|Baloo+Da+2|Baloo+Paaji+2|Baloo+Tamma+2|Baloo+Tammudu+2|Baloo+Thambi+2|Balsamiq+Sans|Balthazar|Bangers|Barlow|Barlow+Condensed|Barlow+Semi+Condensed|Barriecito|Barrio|Basic|Baskervville|Battambang|Baumans|Bayon|Be+Vietnam|Bebas+Neue|Belgrano|Bellefair|Belleza|Bellota|Bellota+Text|BenchNine|Benne|Bentham|Berkshire+Swash|Beth+Ellen|Bevan|Big+Shoulders+Display|Big+Shoulders+Inline+Display|Big+Shoulders+Inline+Text|Big+Shoulders+Stencil+Display|Big+Shoulders+Stencil+Text|Big+Shoulders+Text|Bigelow+Rules|Bigshot+One|Bilbo|Bilbo+Swash+Caps|BioRhyme|BioRhyme+Expanded|Biryani|Bitter|Black+And+White+Picture|Black+Han+Sans|Black+Ops+One|Blinker|Bodoni+Moda|Bokor|Bonbon|Boogaloo|Bowlby+One|Bowlby+One+SC|Brawler|Bree+Serif|Brygada+1918|Bubblegum+Sans|Bubbler+One|Buda|Buenard|Bungee|Bungee+Hairline|Bungee+Inline|Bungee+Outline|Bungee+Shade|Butcherman|Butterfly+Kids|Cabin|Cabin+Condensed|Cabin+Sketch|Caesar+Dressing|Cagliostro|Cairo|Caladea|Calistoga|Calligraffitti|Cambay|Cambo|Candal|Cantarell|Cantata+One|Cantora+One|Capriola|Cardo|Carme|Carrois+Gothic|Carrois+Gothic+SC|Carter+One|Castoro|Catamaran|Caudex|Caveat|Caveat+Brush|Cedarville+Cursive|Ceviche+One|Chakra+Petch|Changa|Changa+One|Chango|Charm|Charmonman|Chathura|Chau+Philomene+One|Chela+One|Chelsea+Market|Chenla|Cherry+Cream+Soda|Cherry+Swash|Chewy|Chicle|Chilanka|Chivo|Chonburi|Cinzel|Cinzel+Decorative|Clicker+Script|Coda|Coda+Caption|Codystar|Coiny|Combo|Comfortaa|Comic+Neue|Coming+Soon|Commissioner|Concert+One|Condiment|Content|Contrail+One|Convergence|Cookie|Copse|Corben|Cormorant|Cormorant+Garamond|Cormorant+Infant|Cormorant+SC|Cormorant+Unicase|Cormorant+Upright|Courgette|Courier+Prime|Cousine|Coustard|Covered+By+Your+Grace|Crafty+Girls|Creepster|Crete+Round|Crimson+Pro|Crimson+Text|Croissant+One|Crushed|Cuprum|Cute+Font|Cutive|Cutive+Mono|DM+Mono|DM+Sans|DM+Serif+Display|DM+Serif+Text|Damion|Dancing+Script|Dangrek|Darker+Grotesque|David+Libre|Dawning+of+a+New+Day|Days+One|Dekko|Dela+Gothic+One|Delius|Delius+Swash+Caps|Delius+Unicase|Della+Respira|Denk+One|Devonshire|Dhurjati|Didact+Gothic|Diplomata|Diplomata+SC|Do+Hyeon|Dokdo|Domine|Donegal+One|Doppio+One|Dorsa|Dosis|DotGothic16|Dr+Sugiyama|Duru+Sans|Dynalight|EB+Garamond|Eagle+Lake|East+Sea+Dokdo|Eater|Economica|Eczar|El+Messiri|Electrolize|Elsie|Elsie+Swash+Caps|Emblema+One|Emilys+Candy|Encode+Sans|Encode+Sans+Condensed|Encode+Sans+Expanded|Encode+Sans+Semi+Condensed|Encode+Sans+Semi+Expanded|Engagement|Englebert|Enriqueta|Epilogue|Erica+One|Esteban|Euphoria+Script|Ewert|Exo|Exo+2|Expletus+Sans|Fahkwang|Fanwood+Text|Farro|Farsan|Fascinate|Fascinate+Inline|Faster+One|Fasthand|Fauna+One|Faustina|Federant|Federo|Felipa|Fenix|Finger+Paint|Fira+Code|Fira+Mono|Fira+Sans|Fira+Sans+Condensed|Fira+Sans+Extra+Condensed|Fjalla+One|Fjord+One|Flamenco|Flavors|Fondamento|Fontdiner+Swanky|Forum|Francois+One|Frank+Ruhl+Libre|Fraunces|Freckle+Face|Fredericka+the+Great|Fredoka+One|Freehand|Fresca|Frijole|Fruktur|Fugaz+One|GFS+Didot|GFS+Neohellenic|Gabriela|Gaegu|Gafata|Galada|Galdeano|Galindo|Gamja+Flower|Gayathri|Gelasio|Gentium+Basic|Gentium+Book+Basic|Geo|Geostar|Geostar+Fill|Germania+One|Gidugu|Gilda+Display|Girassol|Give+You+Glory|Glass+Antiqua|Glegoo|Gloria+Hallelujah|Goblin+One|Gochi+Hand|Goldman|Gorditas|Gothic+A1|Gotu|Goudy+Bookletter+1911|Graduate|Grand+Hotel|Grandstander|Gravitas+One|Great+Vibes|Grenze|Grenze+Gotisch|Griffy|Gruppo|Gudea|Gugi|Gupter|Gurajada|Habibi|Hachi+Maru+Pop|Halant|Hammersmith+One|Hanalei|Hanalei+Fill|Handlee|Hanuman|Happy+Monkey|Harmattan|Headland+One|Heebo|Henny+Penny|Hepta+Slab|Herr+Von+Muellerhoff|Hi+Melody|Hind|Hind+Guntur|Hind+Madurai|Hind+Siliguri|Hind+Vadodara|Holtwood+One+SC|Homemade+Apple|Homenaje|IBM+Plex+Mono|IBM+Plex+Sans|IBM+Plex+Sans+Condensed|IBM+Plex+Serif|IM+Fell+DW+Pica|IM+Fell+DW+Pica+SC|IM+Fell+Double+Pica|IM+Fell+Double+Pica+SC|IM+Fell+English|IM+Fell+English+SC|IM+Fell+French+Canon|IM+Fell+French+Canon+SC|IM+Fell+Great+Primer|IM+Fell+Great+Primer+SC|Ibarra+Real+Nova|Iceberg|Iceland|Imbue|Imprima|Inconsolata|Inder|Indie+Flower|Inika|Inknut+Antiqua|Inria+Sans|Inria+Serif|Inter|Irish+Grover|Istok+Web|Italiana|Italianno|Itim|Jacques+Francois|Jacques+Francois+Shadow|Jaldi|JetBrains+Mono|Jim+Nightshade|Jockey+One|Jolly+Lodger|Jomhuria|Jomolhari|Josefin+Sans|Josefin+Slab|Jost|Joti+One|Jua|Judson|Julee|Julius+Sans+One|Junge|Jura|Just+Another+Hand|Just+Me+Again+Down+Here|K2D|Kadwa|Kalam|Kameron|Kanit|Kantumruy|Karantina|Karla|Karma|Katibeh|Kaushan+Script|Kavivanar|Kavoon|Kdam+Thmor|Keania+One|Kelly+Slab|Kenia|Khand|Khmer|Khula|Kirang+Haerang|Kite+One|Kiwi+Maru|Knewave|KoHo|Kodchasan|Kosugi|Kosugi+Maru|Kotta+One|Koulen|Kranky|Kreon|Kristi|Krona+One|Krub|Kufam|Kulim+Park|Kumar+One|Kumar+One+Outline|Kumbh+Sans|Kurale|La+Belle+Aurore|Lacquer|Laila|Lakki+Reddy|Lalezar|Lancelot|Langar|Lateef|Lato|League+Script|Leckerli+One|Ledger|Lekton|Lemon|Lemonada|Lexend|Lexend+Deca|Lexend+Exa|Lexend+Giga|Lexend+Mega|Lexend+Peta|Lexend+Tera|Lexend+Zetta|Libre+Barcode+128|Libre+Barcode+128+Text|Libre+Barcode+39|Libre+Barcode+39+Extended|Libre+Barcode+39+Extended+Text|Libre+Barcode+39+Text|Libre+Barcode+EAN13+Text|Libre+Baskerville|Libre+Caslon+Display|Libre+Caslon+Text|Libre+Franklin|Life+Savers|Lilita+One|Lily+Script+One|Limelight|Linden+Hill|Literata|Liu+Jian+Mao+Cao|Livvic|Lobster|Lobster+Two|Londrina+Outline|Londrina+Shadow|Londrina+Sketch|Londrina+Solid|Long+Cang|Lora|Love+Ya+Like+A+Sister|Loved+by+the+King|Lovers+Quarrel|Luckiest+Guy|Lusitana|Lustria|M+PLUS+1p|M+PLUS+Rounded+1c|Ma+Shan+Zheng|Macondo|Macondo+Swash+Caps|Mada|Magra|Maiden+Orange|Maitree|Major+Mono+Display|Mako|Mali|Mallanna|Mandali|Manjari|Manrope|Mansalva|Manuale|Marcellus|Marcellus+SC|Marck+Script|Margarine|Markazi+Text|Marko+One|Marmelad|Martel|Martel+Sans|Marvel|Mate|Mate+SC|Maven+Pro|McLaren|Meddon|MedievalSharp|Medula+One|Meera+Inimai|Megrim|Meie+Script|Merienda|Merienda+One|Merriweather|Merriweather+Sans|Metal|Metal+Mania|Metamorphous|Metrophobic|Michroma|Milonga|Miltonian|Miltonian+Tattoo|Mina|Miniver|Miriam+Libre|Mirza|Miss+Fajardose|Mitr|Modak|Modern+Antiqua|Mogra|Molengo|Molle|Monda|Monofett|Monoton|Monsieur+La+Doulaise|Montaga|Montez|Montserrat|Montserrat+Alternates|Montserrat+Subrayada|Moul|Moulpali|Mountains+of+Christmas|Mouse+Memoirs|Mr+Bedfort|Mr+Dafoe|Mr+De+Haviland|Mrs+Saint+Delafield|Mrs+Sheppards|Mukta|Mukta+Mahee|Mukta+Malar|Mukta+Vaani|Mulish|MuseoModerno|Mystery+Quest|NTR|Nanum+Brush+Script|Nanum+Gothic|Nanum+Gothic+Coding|Nanum+Myeongjo|Nanum+Pen+Script|Nerko+One|Neucha|Neuton|New+Rocker|New+Tegomin|News+Cycle|Newsreader|Niconne|Niramit|Nixie+One|Nobile|Nokora|Norican|Nosifer|Notable|Nothing+You+Could+Do|Noticia+Text|Noto+Sans|Noto+Sans+HK|Noto+Sans+JP|Noto+Sans+KR|Noto+Sans+SC|Noto+Sans+TC|Noto+Serif|Noto+Serif+JP|Noto+Serif+KR|Noto+Serif+SC|Noto+Serif+TC|Nova+Cut|Nova+Flat|Nova+Mono|Nova+Oval|Nova+Round|Nova+Script|Nova+Slim|Nova+Square|Numans|Nunito|Nunito+Sans|Odibee+Sans|Odor+Mean+Chey|Offside|Oi|Old+Standard+TT|Oldenburg|Oleo+Script|Oleo+Script+Swash+Caps|Open+Sans|Open+Sans+Condensed|Oranienbaum|Orbitron|Oregano|Orelega+One|Orienta|Original+Surfer|Oswald|Over+the+Rainbow|Overlock|Overlock+SC|Overpass|Overpass+Mono|Ovo|Oxanium|Oxygen|Oxygen+Mono|PT+Mono|PT+Sans|PT+Sans+Caption|PT+Sans+Narrow|PT+Serif|PT+Serif+Caption|Pacifico|Padauk|Palanquin|Palanquin+Dark|Pangolin|Paprika|Parisienne|Passero+One|Passion+One|Pathway+Gothic+One|Patrick+Hand|Patrick+Hand+SC|Pattaya|Patua+One|Pavanam|Paytone+One|Peddana|Peralta|Permanent+Marker|Petit+Formal+Script|Petrona|Philosopher|Piazzolla|Piedra|Pinyon+Script|Pirata+One|Plaster|Play|Playball|Playfair+Display|Playfair+Display+SC|Podkova|Poiret+One|Poller+One|Poly|Pompiere|Pontano+Sans|Poor+Story|Poppins|Port+Lligat+Sans|Port+Lligat+Slab|Potta+One|Pragati+Narrow|Prata|Preahvihear|Press+Start+2P|Pridi|Princess+Sofia|Prociono|Prompt|Prosto+One|Proza+Libre|Public+Sans|Puritan|Purple+Purse|Quando|Quantico|Quattrocento|Quattrocento+Sans|Questrial|Quicksand|Quintessential|Qwigley|Racing+Sans+One|Radley|Rajdhani|Rakkas|Raleway|Raleway+Dots|Ramabhadra|Ramaraja|Rambla|Rammetto+One|Ranchers|Rancho|Ranga|Rasa|Rationale|Ravi+Prakash|Recursive|Red+Hat+Display|Red+Hat+Text|Red+Rose|Redressed|Reem+Kufi|Reenie+Beanie|Reggae+One|Revalia|Rhodium+Libre|Ribeye|Ribeye+Marrow|Righteous|Risque|Roboto|Roboto+Condensed|Roboto+Mono|Roboto+Slab|Rochester|Rock+Salt|RocknRoll+One|Rokkitt|Romanesco|Ropa+Sans|Rosario|Rosarivo|Rouge+Script|Rowdies|Rozha+One|Rubik|Rubik+Mono+One|Ruda|Rufina|Ruge+Boogie|Ruluko|Rum+Raisin|Ruslan+Display|Russo+One|Ruthie|Rye|Sacramento|Sahitya|Sail|Saira|Saira+Condensed|Saira+Extra+Condensed|Saira+Semi+Condensed|Saira+Stencil+One|Salsa|Sanchez|Sancreek|Sansita|Sansita+Swashed|Sarabun|Sarala|Sarina|Sarpanch|Satisfy|Sawarabi+Gothic|Sawarabi+Mincho|Scada|Scheherazade|Schoolbell|Scope+One|Seaweed+Script|Secular+One|Sedgwick+Ave|Sedgwick+Ave+Display|Sen|Sevillana|Seymour+One|Shadows+Into+Light|Shadows+Into+Light+Two|Shanti|Share|Share+Tech|Share+Tech+Mono|Shippori+Mincho|Shippori+Mincho+B1|Shojumaru|Short+Stack|Shrikhand|Siemreap|Sigmar+One|Signika|Signika+Negative|Simonetta|Single+Day|Sintony|Sirin+Stencil|Six+Caps|Skranji|Slabo+13px|Slabo+27px|Slackey|Smokum|Smythe|Sniglet|Snippet|Snowburst+One|Sofadi+One|Sofia|Solway|Song+Myung|Sonsie+One|Sora|Sorts+Mill+Goudy|Source+Code+Pro|Source+Sans+Pro|Source+Serif+Pro|Space+Grotesk|Space+Mono|Spartan|Special+Elite|Spectral|Spectral+SC|Spicy+Rice|Spinnaker|Spirax|Squada+One|Sree+Krushnadevaraya|Sriracha|Srisakdi|Staatliches|Stalemate|Stalinist+One|Stardos+Stencil|Stick|Stint+Ultra+Condensed|Stint+Ultra+Expanded|Stoke|Strait|Stylish|Sue+Ellen+Francisco|Suez+One|Sulphur+Point|Sumana|Sunflower|Sunshiney|Supermercado+One|Sura|Suranna|Suravaram|Suwannaphum|Swanky+and+Moo+Moo|Syncopate|Syne|Syne+Mono|Syne+Tactile|Tajawal|Tangerine|Taprom|Tauri|Taviraj|Teko|Telex|Tenali+Ramakrishna|Tenor+Sans|Text+Me+One|Texturina|Thasadith|The+Girl+Next+Door|Tienne|Tillana|Timmana|Tinos|Titan+One|Titillium+Web|Tomorrow|Trade+Winds|Train+One|Trirong|Trispace|Trocchi|Trochut|Truculenta|Trykker|Tulpen+One|Turret+Road|Ubuntu|Ubuntu+Condensed|Ubuntu+Mono|Ultra|Uncial+Antiqua|Underdog|Unica+One|UnifrakturCook|UnifrakturMaguntia|Unkempt|Unlock|Unna|VT323|Vampiro+One|Varela|Varela+Round|Varta|Vast+Shadow|Vesper+Libre|Viaoda+Libre|Vibes|Vibur|Vidaloka|Viga|Voces|Volkhov|Vollkorn|Vollkorn+SC|Voltaire|Waiting+for+the+Sunrise|Wallpoet|Walter+Turncoat|Warnes|Wellfleet|Wendy+One|Wire+One|Work+Sans|Xanh+Mono|Yanone+Kaffeesatz|Yantramanav|Yatra+One|Yellowtail|Yeon+Sung|Yeseva+One|Yesteryear|Yrsa|Yusei+Magic|ZCOOL+KuaiLe|ZCOOL+QingKe+HuangYou|ZCOOL+XiaoWei|Zen+Dots|Zeyada|Zhi+Mang+Xing|Zilla+Slab|Zilla+Slab+Highlight',
      //   [],
      //   time(),
      //   'all'
      // );


      // wp_enqueue_style(
      //   'font-awesome-5',
      //   post_grid_plugin_url . '/assets/css/fontawesome-old/css/font-awesome-5.css',
      //   [],
      //   time(),
      //   'all'
      // );

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

      wp_localize_script('post-grid-blocks', 'post_grid_editor_js', array('post_grid_ajaxurl' => admin_url('admin-ajax.php'), '_wpnonce' => wp_create_nonce('wp_rest')));







      // $post_grid_settings = get_option('post_grid_settings');
      // $disable_blocks = isset($post_grid_settings['disable_blocks']) ? $post_grid_settings['disable_blocks'] : [];


      // $post_grid_block_editor = get_option('post_grid_block_editor');
      // $blocks = isset($post_grid_block_editor['blocks']) ? $post_grid_block_editor['blocks'] : [];
      // $disabled = isset($blocks['disabled']) ? $blocks['disabled'] : [];

      // $disable_blocks = array_merge($disable_blocks, $disabled);




      // wp_localize_script('post-grid-blocks', 'postGridDisabledBlocks', $disable_blocks);
    }
  }
}
new PostGrid();
