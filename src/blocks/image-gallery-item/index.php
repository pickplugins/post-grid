<?php
if (!defined('ABSPATH')) exit();



class PGBlockImageGalleryItem
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


        register_block_type('post-grid/image-gallery-item', array(
            //'editor_script' => 'editor_script',
            //'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["post-grid/galleryId", "post-grid/lightbox"],
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

        $galleryId = isset($block->context['post-grid/galleryId']) ? $block->context['post-grid/galleryId'] : '';
        $galleryLightbox = isset($block->context['post-grid/lightbox']) ? $block->context['post-grid/lightbox'] : null;



        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];

        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';



        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];


        $postGridCustomCss .= $customCss;




        ob_start();

?>
        <div class="pg-image-gallery-item <?php echo esc_attr($blockId); ?>">
            <?php echo $content ?>
        </div>
<?php
        return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockImageGalleryItem();
