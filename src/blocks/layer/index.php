<?php
if (!defined('ABSPATH')) exit();



class PGBlockLayer
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


        register_block_type('post-grid/layer', array(
            //'editor_script' => 'editor_script',
            //'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            //'style' => 'front_style',
            'render_callback' => array($this, 'theHTML'),
            'attributes' => [
                "wrapper" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "content" => "",
                            "tag" => "div",
                            "class" => "pg-layers"
                        ],
                        "styles" => [

                            "color" => [],
                            "bgColor" => [],
                            "padding" => [],
                            "margin" => [],
                            "display" => [],
                            "position" => [],
                            "zIndex" => [],
                            "width" => [],
                            "height" => [],
                            "top" => [],
                            "right" => [],
                            "bottom" => [],
                            "left" => []
                        ]
                    ]
                ],
                "blockId" => [
                    "type" => "string",
                    "default" => ""
                ],
                "customCss" => [
                    "type" => "string",
                    "default" => ""
                ],
                "blockCssY" => [
                    "type" => "object",
                    "default" => [
                        "items" => []
                    ]
                ]
            ]


        ));
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



        $post_ID = $block->context['postId'];
        $post_url = get_the_permalink($post_ID);
        $the_post = get_post($post_ID);
        $wrapper = '';

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';


        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];



        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $textOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
        $wrapperStyles = isset($wrapper['styles']) ? $wrapper['styles'] : [];
        $wrapperTypo = isset($wrapper['typo']) ? $wrapper['typo'] : [];

        $wrapperTag = isset($textOptions['tag']) ? $textOptions['tag'] : 'div';
        //$content = isset($textOptions['content']) ? $textOptions['content'] : '';



        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];


        $postGridCustomCss .= $customCss;




        ob_start();




        if (!empty($wrapperTag)) :
?>
            <<?php echo esc_attr($wrapperTag); ?> class="<?php echo esc_attr($blockId); ?>">
                <?php echo  wp_kses_post($content); ?>
            </<?php echo esc_attr($wrapperTag); ?>>
        <?php

        endif;



        ?>









<?php return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockLayer();
