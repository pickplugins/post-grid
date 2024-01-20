<?php
if (!defined('ABSPATH')) exit; // if direct access 

class class_post_grid_notices
{

    public function __construct()
    {
        add_action('admin_notices', array($this, 'license_expired'));
        add_action('admin_notices', array($this, 'rebrand'));

        //add_action('admin_notices', array($this, 'layout_depricated'));
        //add_action('admin_notices', array( $this, 'import_layouts' ));

    }


    public function rebrand()
    {

        $screen = get_current_screen();
        $post_grid_notices = get_option('post_grid_notices', []);
        $is_hidden = isset($post_grid_notices['hide_notice_rebrand']) ? $post_grid_notices['hide_notice_rebrand'] : 'no';

        //var_dump($post_grid_notices);
        //delete_option('post_grid_notices');

        $actionurl = admin_url() . '?hide_notice_rebrand=yes';
        $actionurl = wp_nonce_url($actionurl,  'hide_notice_rebrand');

        $nonce = isset($_REQUEST['_wpnonce']) ? sanitize_text_field($_REQUEST['_wpnonce']) : '';
        $hide_notice_rebrand = isset($_REQUEST['hide_notice_rebrand']) ? sanitize_text_field($_REQUEST['hide_notice_rebrand']) : '';

        //var_dump($hide_notice_rebrand);


        if (wp_verify_nonce($nonce, 'hide_notice_rebrand') && $hide_notice_rebrand == 'yes') {
            $post_grid_notices['hide_notice_rebrand'] = 'hidden';
            update_option('post_grid_notices', $post_grid_notices);

            return;
        }



        ob_start();

        if ($is_hidden == 'no') :
?>
<div class="notice notice-error">
  <p><strong>Post Grid/Post Grid Combo</strong> is now <strong><a target="_blank" class=""
        href="https://getpostgrid.com/?utm_source=WPadminNotice&utm_campaign=comboBlocks&utm_medium=userClick">Combo
        Blocks</a></strong> <a class="button" href="<?php echo esc_url_raw($actionurl) ?>">Hide</a></p>
</div>
<?php
        endif;


        echo (ob_get_clean());
    }




    public function license_expired()
    {

        $post_grid_license = get_option('post_grid_license');
        $post_grid_notices = get_option('post_grid_notices', []);

        $license_status = isset($post_grid_license['license_status']) ? $post_grid_license['license_status'] : '';
        $license_key = isset($post_grid_license['license_key']) ? $post_grid_license['license_key'] : '';
        $license_expired = isset($post_grid_notices['license_expired']) ? $post_grid_notices['license_expired'] : '';


        $screen = get_current_screen();

        //var_dump($post_grid_notices);

        ob_start();

        if ($screen->id == 'edit-post_grid_layout' || $screen->id == 'post_grid_layout' || $screen->id == 'dashboard'  || $screen->id == 'edit-post_grid' || $screen->id == 'post-grid_page_overview'  || $screen->id == 'post_grid' || $screen->id == 'edit-post_grid_template' || $screen->id == 'post_grid_template' || $screen->id == 'post-grid_page_post-grid-settings' || $screen->id == 'post-grid_page_import_layouts') :



            if ($license_status == 'expired' && $license_expired != 'hidden') :

                $actionurl = $_SERVER['REQUEST_URI'];
                $actionurl = wp_nonce_url($actionurl,  'license_expired');

                $nonce = isset($_REQUEST['_wpnonce']) ? sanitize_text_field($_REQUEST['_wpnonce']) : '';

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
      expried, please <a target="_blank"
        class="bg-blue-600 rounded-sm inline-block text-white hover:text-white hover:bg-blue-700 px-5 py-1"
        href="https://pickplugins.com/post-grid/purchase-license/?licenseKey=<?php echo $license_key; ?>">Renew</a>

      <span class="text-amber-500 rounded-sm px-2 py-1 font-bold">Grab 25% Off!</span>

    </span>
    <a href="<?php echo esc_url_raw($actionurl); ?>"
      class="bg-red-600 inline-block cursor-pointer  rounded-sm text-white hover:text-white hover:bg-red-400 px-2  py-1"><span
        class="align-middle dashicons dashicons-no"></span> Hide this</a>

  </p>
</div>
<?php
            endif;
        endif;

        echo ob_get_clean();
    }

    public function layout_depricated()
    {

        $screen = get_current_screen();


        $post_grid_info = get_option('post_grid_info');
        $import_layouts = isset($post_grid_info['import_layouts']) ? $post_grid_info['import_layouts'] : '';

        //var_dump($screen);


        //delete_option('post_grid_info');

        ob_start();

        if ($screen->id == 'edit-post_grid_layout' || $screen->id == 'post_grid_layout') :
            ?>
<div class="notice notice-error is-dismissible">
  <p>Old Layout is about to depricated but you can still use and it works fine, we will longer update, please try
    Gutenberg Post Grid block instaed, we have added some exciting feature with gutenberg block.</p>
</div>
<?php
        endif;


        echo (ob_get_clean());
    }




    public function import_layouts()
    {

        $post_grid_info = get_option('post_grid_info');
        $import_layouts = isset($post_grid_info['import_layouts']) ? $post_grid_info['import_layouts'] : '';


        //delete_option('post_grid_info');

        ob_start();

        if ($import_layouts != 'done') :
        ?>
<div class="update-nag">
  <?php
                echo esc_html(sprintf(__('Post grid require import free layouts, please <a href="%s">click here</a> to go import page', 'post-grid-pro'), esc_url(admin_url() . 'edit.php?post_type=post_grid&page=post-grid-settings&tab=help_support')))
                ?>
</div>
<?php
        endif;


        echo (ob_get_clean());
    }
}

new class_post_grid_notices();