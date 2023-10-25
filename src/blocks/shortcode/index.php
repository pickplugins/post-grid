<?php
if (!defined('ABSPATH'))
    exit();



class BlockPostShortcode
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/shortcode/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/shortcode/index.js', array('wp-blocks', 'wp-element'));


        register_block_type(
            post_grid_plugin_dir . 'build/blocks/shortcode/block.json',
            array(

                'render_callback' => array($this, 'theHTML'),



            )
        );
    }

    function front_script($attributes)
    {
    }
    function front_style($attributes)
    {
    }




    // front-end output from the gutenberg editor 
    function theHTML($attributes, $content, $block)
    {


        global $postGridCss;

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';



        if (!is_admin()) {


            //wp_enqueue_script('blk_post_grid', post_grid_plugin_dir . 'build/blocks/post-categories/index.js', array('wp-element'));

            // wp_enqueue_style('blk_post_grid', post_grid_plugin_url . 'src/blocks/post-categories/index.css');
        }



        $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';

        $post_url = get_the_permalink($post_ID);



        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';

        $shortcode = isset($attributes['shortcode']) ? $attributes['shortcode'] : [];
        $shortcodeOptions = isset($shortcode['options']) ? $shortcode['options'] : [];

        $shortcodeKey = isset($shortcodeOptions['key']) ? $shortcodeOptions['key'] : '';
        $shortcodePrams = isset($shortcodeOptions['prams']) ? $shortcodeOptions['prams'] : [];





        ob_start();

        $shortcodeAtts = '';

        if (!empty($shortcodePrams))
            foreach ($shortcodePrams as $item) {

                $val = isset($item['val']) ? $item['val'] : '';

                $singleArray = ['{currentPostId}' => $post_ID];
                $val = strtr($val, (array) $singleArray);

                $shortcodeAtts .= $item['id'] . '="' . $val . '" ';
            }


        ////var_dump($shortcodePrams);


        if (!empty($wrapperTag)):

            echo do_shortcode('[' . $shortcodeKey . ' ' . $shortcodeAtts . ']');

        endif;





        return ob_get_clean();
    }
}

$BlockPostShortcode = new BlockPostShortcode();