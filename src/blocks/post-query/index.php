<?php
if (!defined('ABSPATH'))
    exit();



class PGBlockPostQuery
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
    }


    function front_scripts($attributes)
    {
        wp_register_script('pgpost-grid_front_script', post_grid_plugin_url . 'src/blocks/post-grid/front-scripts.js', [], '', true);

        if (has_block('post-grid/post-query')) {

            wp_enqueue_style('jquery-ui');

            wp_enqueue_script('jquery');
            wp_enqueue_script('jquery-ui-core');
            wp_enqueue_script('jquery-ui-accordion');
            wp_enqueue_script('jquery-effects-core');

            wp_enqueue_script('pgpost-grid_front_script');
        }
    }
    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/layers/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/layers/index.js', array('wp-blocks', 'wp-element'));


        register_block_type(
            'post-grid/post-query',
            array(
                //'editor_script' => 'editor_script',
                //'editor_style' => 'editor_style',
                //'script' => 'front_script',
                'uses_context' => ["postId", "loopIndex", "postType", "queryId"],
                //'style' => [$this, 'front_style'],
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

                                "padding" => [],
                                "margin" => [],
                                "display" => [],
                                "position" => [],
                                "overflow" => [],
                                "width" => [],
                                "height" => []
                            ]
                        ]
                    ],
                    "blockId" => [
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



        global $postGridCssY;



        $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';





        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];






        ob_start();



?>
        <div class="pg-post-grid <?php echo esc_attr($blockId); ?>  <?php echo esc_attr($blockAlign); ?>">
            <?php echo $content ?>
        </div>
<?php

        return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockPostQuery();
