<?php
if (!defined('ABSPATH')) exit;  // if direct access
class class_post_grid_shortcodes
{
    public function __construct()
    {
        add_shortcode('post_grid', array($this, 'post_grid_new_display'));
        add_shortcode('post_grid_builder', array($this, 'post_grid_builder'));
    }


    public function post_grid_builder($atts, $content = null)
    {

        $atts = shortcode_atts(
            array(
                'id' => "",
            ),
            $atts
        );



        $post_id = isset($atts['id']) ? (int) $atts['id'] : '';
        $post_id = str_replace('"', "", $post_id);
        $post_id = str_replace("'", "", $post_id);
        $post_id = str_replace("&#039;", "", $post_id);
        $post_id = str_replace("&quot;", "", $post_id);

        $post_data = get_post($post_id);
        $post_content = isset($post_data->post_content) ? $post_data->post_content : "";



        //echo "<br>";

        $post_content = ($post_content);



        $PostGridData =  (array) json_decode($post_content, true);


        $globalOptions = isset($PostGridData["globalOptions"]) ? $PostGridData["globalOptions"] : [];
        $viewType = isset($globalOptions["viewType"]) ? $globalOptions["viewType"] : "viewGrid";


        ob_start();


        do_action("post_grid_builder_" . $viewType, $post_id, $PostGridData);

        if ($viewType == "viewGrid") {
            //wp_enqueue_script('post_grid_front_scripts');
            // wp_enqueue_style('post_grid_animate');
        }


        return ob_get_clean();
    }



    public function post_grid_new_display($atts, $content = null)
    {
        $atts = shortcode_atts(
            array(
                'id' => "",
            ),
            $atts
        );
        $atts = apply_filters('post_grid_atts', $atts);
        $grid_id = $atts['id'];
        ob_start();
        if (empty($grid_id)) {
            echo 'Please provide valid post grid id, ex: <code>[post_grid id="123"]</code>';
            return;
        }
        //include( post_grid_plugin_dir . 'templates/post-grid.php');
        do_action('post_grid_main', $atts);

        wp_enqueue_script('post-grid-shortcode-scripts');
        wp_localize_script('post-grid-shortcode-scripts', 'post_grid_ajax', array(
            'post_grid_ajaxurl' => admin_url('admin-ajax.php'),
            '_wpnonce' => wp_create_nonce('post_grid_ajax_nonce'),
        ));
        return ob_get_clean();
    }
}
new class_post_grid_shortcodes();
