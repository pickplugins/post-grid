<?php
if (!defined('ABSPATH'))
    exit();



class PGBlockGridWrap
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
    }


    function front_scripts($attributes)
    {
        wp_register_script('pggrid-wrap_front_script', post_grid_plugin_url . 'src/blocks/grid-wrap/front-scripts.js', [], '', true);

        if (has_block('post-grid/grid-wrap')) {

            wp_enqueue_style('jquery-ui');

            wp_enqueue_script('jquery');
            wp_enqueue_script('jquery-ui-core');
            wp_enqueue_script('jquery-ui-accordion');
            wp_enqueue_script('jquery-effects-core');

            wp_enqueue_script('pggrid-wrap_front_script');
        }
    }
    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/layers/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/layers/index.js', array('wp-blocks', 'wp-element'));


        register_block_type(
            post_grid_plugin_dir . 'build/blocks/grid-wrap/block.json',
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


        global $postGridCustomCss;
        global $postGridCssY;



        $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';


        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];


        $postGridCustomCss .= $customCss;



        ob_start();



        ?>
                <div class="pg-grid-wrap <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>">
                    <?php echo $content ?>
                </div>
                <?php

                return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockGridWrap();