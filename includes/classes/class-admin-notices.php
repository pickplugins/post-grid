<?php
if (!defined('ABSPATH')) exit; // if direct access 
class class_post_grid_notices
{
  public function __construct()
  {
    add_action('admin_notices', array($this, 'beta_test'));
    add_action('admin_notices', array($this, 'blocks_moved'));


    // add_action('admin_notices', array($this, 'license_expired'));
    //add_action('admin_notices', array($this, 'rebrand'));
    //add_action('admin_notices', array($this, 'layout_depricated'));
    //add_action('admin_notices', array( $this, 'import_layouts' ));
  }

  public function blocks_moved()
  {
    //delete_option("post_grid_notices");


    $screen = get_current_screen();
    $post_grid_notices = get_option('post_grid_notices', []);
    $is_hidden = isset($post_grid_notices['hide_notice_blocks_moved']) ? $post_grid_notices['hide_notice_blocks_moved'] : 'no';
    $actionurl = admin_url() . '?hide_notice_blocks_moved=yes';
    $actionurl = wp_nonce_url($actionurl,  'hide_notice_blocks_moved');
    $nonce = isset($_REQUEST['_wpnonce']) ? sanitize_text_field(wp_unslash($_REQUEST['_wpnonce'])) : '';
    $hide_notice_blocks_moved = isset($_REQUEST['hide_notice_blocks_moved']) ? sanitize_text_field(wp_unslash($_REQUEST['hide_notice_blocks_moved'])) : '';
    if (wp_verify_nonce($nonce, 'hide_notice_blocks_moved') && $hide_notice_blocks_moved == 'yes') {
      $post_grid_notices['hide_notice_blocks_moved'] = 'hidden';
      update_option('post_grid_notices', $post_grid_notices);
      return;
    }
    ob_start();
    if ($is_hidden == 'no') :


      $builder_page_url = admin_url() . 'edit.php?post_type=post_grid&page=post-grid-builder'

?><div class="notice">
        <h3> All blocks move to new plugin <a style="" class="" href="https://wordpress.org/plugins/combo-blocks/">ComboBlocks</a>? <a target="_blank" class="bg-blue-600 rounded-sm inline-block text-white hover:text-white hover:bg-blue-700 px-5 py-1" href="https://comboblocks.com/docs/how-to-migrate-post-grid-blocks-to-comboblocks/">Read the guide</a>


        </h3>
        <p>
          <a style="" class="" href="https://wordpress.org/plugins/combo-blocks/">Download Plugin</a> |
          <a style="" class="" href="https://wordpress.org/plugins/post-grid/advanced/">Download Old Version</a> |
          <a style="margin: 0 20px;" class="" href="<?php echo esc_url($actionurl) ?>">❌ Hide Notice</a>
        </p>
      </div>
    <?php
    endif;
    echo wp_kses_post(ob_get_clean());
  }
  public function beta_test()
  {
    //delete_option("post_grid_notices");


    $screen = get_current_screen();
    $post_grid_notices = get_option('post_grid_notices', []);
    $is_hidden = isset($post_grid_notices['hide_notice_beta_test']) ? $post_grid_notices['hide_notice_beta_test'] : 'no';
    $actionurl = admin_url() . '?hide_notice_beta_test=yes';
    $actionurl = wp_nonce_url($actionurl,  'hide_notice_beta_test');
    $nonce = isset($_REQUEST['_wpnonce']) ? sanitize_text_field(wp_unslash($_REQUEST['_wpnonce'])) : '';
    $hide_notice_beta_test = isset($_REQUEST['hide_notice_beta_test']) ? sanitize_text_field(wp_unslash($_REQUEST['hide_notice_beta_test'])) : '';
    if (wp_verify_nonce($nonce, 'hide_notice_beta_test') && $hide_notice_beta_test == 'yes') {
      $post_grid_notices['hide_notice_beta_test'] = 'hidden';
      update_option('post_grid_notices', $post_grid_notices);
      return;
    }
    ob_start();
    if ($is_hidden == 'no') :


      $builder_page_url = admin_url() . 'edit.php?post_type=post_grid&page=post-grid-builder'

    ?><div class="notice">
        <h3>⚡ Intorducing React Based Modern Builder for Post Grid, <strong><a target="_blank" href="<?php echo esc_url($builder_page_url); ?>">Try Now</a></strong></h3>
        <p> <a style="margin: 0 20px;" class="" href="<?php echo esc_url($actionurl) ?>">❌ Hide Notice</a></p>
      </div>
      <?php
    endif;
    echo wp_kses_post(ob_get_clean());
  }

  public function license_expired()
  {
    $post_grid_license = get_option('post_grid_license');
    $post_grid_notices = get_option('post_grid_notices', []);
    $license_status = isset($post_grid_license['license_status']) ? $post_grid_license['license_status'] : '';
    $license_key = isset($post_grid_license['license_key']) ? $post_grid_license['license_key'] : '';
    $license_expired = isset($post_grid_notices['license_expired']) ? $post_grid_notices['license_expired'] : '';
    $screen = get_current_screen();
    ob_start();
    if ($screen->id == 'edit-post_grid_layout' || $screen->id == 'post_grid_layout' || $screen->id == 'dashboard'  || $screen->id == 'edit-post_grid' || $screen->id == 'post-grid_page_overview'  || $screen->id == 'post_grid' || $screen->id == 'edit-post_grid_template' || $screen->id == 'post_grid_template' || $screen->id == 'post-grid_page_post-grid-settings' || $screen->id == 'post-grid_page_import_layouts') :
      if ($license_status == 'expired' && $license_expired != 'hidden') :
        $actionurl = isset($_SERVER['REQUEST_URI']) ? sanitize_text_field(wp_unslash($_SERVER['REQUEST_URI'])) : '';
        $actionurl = wp_nonce_url($actionurl,  'license_expired');
        $nonce = isset($_REQUEST['_wpnonce']) ? sanitize_text_field(wp_unslash($_REQUEST['_wpnonce'])) : '';
        if (wp_verify_nonce($nonce, 'license_expired')) {
          $post_grid_notices['license_expired'] = 'hidden';
          update_option('post_grid_notices', $post_grid_notices);
          return;
        }
      ?>
        <div class="notice notice-error is-dismissible">
          <p class="text-lg flex justify-between">
            <span>
              <span class="dashicons dashicons-warning align-middle text-red-600"></span> Your license for Post Grid plugin has
              expried, please <a target="_blank" class="bg-blue-600 rounded-sm inline-block text-white hover:text-white hover:bg-blue-700 px-5 py-1" href="https://pickplugins.com/post-grid/purchase-license/?licenseKey=<?php echo wp_kses_post($license_key); ?>">Renew</a>
              <span class="text-amber-500 rounded-sm px-2 py-1 font-bold">Grab 25% Off!</span>
            </span>
            <a href="<?php echo esc_url($actionurl); ?>" class="bg-red-600 inline-block cursor-pointer  rounded-sm text-white hover:text-white hover:bg-red-400 px-2  py-1"><span class="align-middle dashicons dashicons-no"></span> Hide this</a>
          </p>
        </div>
<?php
      endif;
    endif;
    echo wp_kses_post(ob_get_clean());
  }
}
new class_post_grid_notices();
