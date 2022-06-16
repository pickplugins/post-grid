<?php
if (!defined('ABSPATH')) exit; // if direct access 

class class_post_grid_notices
{

    public function __construct()
    {

        //add_action('admin_notices', array($this, 'layout_depricated'));


        //add_action('admin_notices', array( $this, 'import_layouts' ));

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
                <p>Old Layout is about to depricated but you can still use and it works fine, we will longer update, please try Gutenberg Post Grid block instaed, we have added some exciting feature with gutenberg block.</p>
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
