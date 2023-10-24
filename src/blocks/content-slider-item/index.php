<?php
if (!defined('ABSPATH'))
    exit();



class PGBlockContentSliderItem
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/layer/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/layer/index.js', array('wp-blocks', 'wp-element'));


        register_block_type(post_grid_plugin_dir . 'src/blocks/content-slider-item/block.json', array(

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


        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';



        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];


        $postGridCustomCss .= $customCss;




        ob_start();

        ?>
        <div
            class="pg-content-slider-item splide__slide <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>">
            <?php echo $content ?>
        </div>
        <?php
        return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockContentSliderItem();