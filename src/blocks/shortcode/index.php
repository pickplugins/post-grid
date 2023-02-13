<?php
if (!defined('ABSPATH')) exit();



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


        register_block_type('post-grid/shortcode', array(
            //'editor_script' => 'editor_script',
            //'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            //'style' => 'editor_style',
            'render_callback' => array($this, 'theHTML'),
            'attributes' =>  [
                "wrapper" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "class" => "inline-block"
                        ],
                        "styles" => [
                            "color" => [],
                            "bgColor" => [],
                            "padding" => [],
                            "margin" => []
                        ]
                    ]
                ],
                "shortcode" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "key" => "",
                            "prefix" => "",
                            "postfix" => "",
                            "prams" => []
                        ],
                        "styles" => [
                            "color" => [],
                            "bgColor" => [],
                            "padding" => [],
                            "margin" => []
                        ]
                    ]
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


        global $postGridCss;

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';



        if (!is_admin()) {


            //wp_enqueue_script('blk_post_grid', post_grid_plugin_dir . 'src/blocks/post-categories/index.js', array('wp-element'));

            // wp_enqueue_style('blk_post_grid', post_grid_plugin_url . 'src/blocks/post-categories/index.css');
        }



        $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';

        $post_url = get_the_permalink($post_ID);



        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
        $wrapperStyles = isset($wrapper['styles']) ? $wrapper['styles'] : [];
        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';

        $shortcode = isset($attributes['shortcode']) ? $attributes['shortcode'] : [];
        $shortcodeOptions = isset($shortcode['options']) ? $shortcode['options'] : [];
        $shortcodeStyles = isset($shortcode['styles']) ? $shortcode['styles'] : [];

        $shortcodeKey = isset($shortcodeOptions['key']) ? $shortcodeOptions['key'] : '';
        $shortcodePrams = isset($shortcodeOptions['prams']) ? $shortcodeOptions['prams'] : [];





        ob_start();

        $shortcodeAtts = '';

        if (!empty($shortcodePrams))
            foreach ($shortcodePrams as  $item) {

                $val = isset($item['val']) ? $item['val'] : '';

                $singleArray = ['{currentPostId}' => $post_ID];
                $val = strtr($val, (array)$singleArray);

                $shortcodeAtts .= $item['id'] . '="' . $val . '" ';
            }


        //var_dump($shortcodePrams);


        if (!empty($wrapperTag)) :

            echo do_shortcode('[' . $shortcodeKey . ' ' . $shortcodeAtts . ']');

        endif;





        return ob_get_clean();
    }
}

$BlockPostShortcode = new BlockPostShortcode();
