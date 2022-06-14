<?php
if (!defined('ABSPATH')) exit();



class BlockPostGrid
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        wp_register_style('editor_style', post_grid_plugin_dir . 'src/blocks/post-grid/index.css');
        wp_register_script('editor_script', post_grid_plugin_dir . 'src/blocks/post-grid/index.js', array('wp-blocks', 'wp-element'));
        register_block_type('prefix-blocks/post-grid', array(
            'editor_script' => 'editor_script',
            'editor_style' => 'editor_style',
            'render_callback' => array($this, 'theHTML')
        ));
    }

    // front-end output from the gutenberg editor 
    function theHTML($attributes)
    {
        if (!is_admin()) {

            wp_enqueue_script('blk_post_grid', post_grid_plugin_dir . 'build/index.js', array('wp-element'));

            //wp_enqueue_script('blk_post_grid', post_grid_plugin_dir . 'src/blocks/post-grid/index.js', array('wp-element'));


            wp_enqueue_style('blk_post_grid', post_grid_plugin_dir . 'src/blocks/post-grid/index.css');
        }

        //error_log(serialize($attributes['layout']['data']));


        $blocks = parse_blocks('<!-- wp:paragraph --><p>paragraph one</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>then two</p><!-- /wp:paragraph -->');

        wp_enqueue_style('splide');


        ob_start(); ?>


        </div>

<?php


        $blocks = parse_blocks($attributes['layout']['rawData']);

        foreach ($blocks as $block) {
            //look to see if your block is in the post content -> if yes continue past it if no then render block as normal
            //echo '<pre>' . var_export($block, true) . '</pre>';
            echo render_block($block);
            echo '$$$$$$$$$$$$$$$$$$$$';
        }








        return ob_get_clean();
    }
}

$BlockPostGrid = new BlockPostGrid();
