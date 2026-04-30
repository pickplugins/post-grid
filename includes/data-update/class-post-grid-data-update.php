<?php
/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins.com
*/
if (!defined('ABSPATH')) exit;  // if direct access
class class_post_grid_data_update
{
    public function __construct()
    {
        //add_action('admin_notices', array( $this, 'admin_notices_data_update' ));
        //add_action('post_grid_action_install', array( $this, 'post_grid_info' ));
    }
    public function admin_notices_data_update()
    {
        $post_grid_info = get_option('post_grid_info');
        $data_update_status = isset($post_grid_info['data_update_status']) ? $post_grid_info['data_update_status'] : 'pending';
        $admin_url = get_admin_url();
        ob_start();
        if ($data_update_status == 'pending') :
?>
            <div class="update-nag">
                <?php
                /* translators: 1: PLugin Name, 2: Link. */
                echo wp_kses_post(sprintf(__('Data update required for  <b>%1$s &raquo; <a href="%2$sedit.php?post_type=post_grid&page=data-update">Update</a></b>', 'post-grid'), wp_kses_post(post_grid_plugin_name), wp_kses_post($admin_url)));
                ?>
            </div>
<?php
        endif;
        echo wp_kses_post(ob_get_clean());
    }
}
new class_post_grid_data_update();
