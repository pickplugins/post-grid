<?php
if (!defined('ABSPATH')) exit();



class BlockPostMeta
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/shortcode/index.css');
        wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/shortcode/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/shortcode', array(
            'editor_script' => 'editor_script',
            'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            //'style' => 'editor_style',

            'render_callback' => array($this, 'theHTML')
        ));
    }

    function front_script($attributes)
    {


        //var_dump('asdasdasd');
    }
    function front_style($attributes)
    {
        //var_dump('asdasdasd');
    }




    // front-end output from the gutenberg editor 
    function theHTML($attributes, $content, $block)
    {


        global $postGridCss;

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';



        if (!is_admin()) {


            //wp_enqueue_script('blk_post_grid', post_grid_plugin_dir . 'src/blocks/post-categories/index.js', array('wp-element'));

            // wp_enqueue_style('blk_post_grid', post_grid_plugin_url . 'src/blocks/post-categories/index.css');
        }



        $post_ID = $block->context['postId'];
        $post_url = get_the_permalink($post_ID);



        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
        $wrapperStyles = isset($wrapper['styles']) ? $wrapper['styles'] : [];
        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';

        $meta = isset($attributes['meta']) ? $attributes['meta'] : [];
        $metaOptions = isset($meta['options']) ? $meta['options'] : [];
        $metaStyles = isset($meta['styles']) ? $meta['styles'] : [];

        $metaKey = isset($metaOptions['key']) ? $metaOptions['key'] : '';
        $metaKeyType = isset($metaOptions['type']) ? $metaOptions['type'] : '';

        $templateFront = isset($attributes['templateFront']) ? $attributes['templateFront'] : '';






















        ob_start();







        if (!empty($wrapperTag)) :
?>

<?php

        endif;





        return ob_get_clean();
    }
}

$BlockPostGrid = new BlockPostMeta();
