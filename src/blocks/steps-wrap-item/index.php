<?php
if (!defined('ABSPATH')) exit();



class PGBlockStepsWrapItem
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/steps-wrap-item/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/steps-wrap-item/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/steps-wrap-item', array(
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
                            "class" => "pg-steps-wrap-item"
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
                "uid" => [
                    "type" => "string",
                    "default" => ""
                ],
                "activeTab" => [
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



        $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
        $post_url = get_the_permalink($post_ID);
        $the_post = get_post($post_ID);
        $wrapper = '';

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';


        $activeTab = isset($attributes['activeTab']) ? $attributes['activeTab'] : '';
        $uid = isset($attributes['uid']) ? $attributes['uid'] : '';


        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];



        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $textOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

        $wrapperTag = isset($textOptions['tag']) ? $textOptions['tag'] : 'div';
        //$content = isset($textOptions['content']) ? $textOptions['content'] : '';




        $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
        $iconOptions = isset($icon['options']) ? $icon['options'] : [];

        $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
        $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
        $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
        $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
        $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';



        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];


        $postGridCustomCss .= $customCss;



        if ($iconLibrary == 'fontAwesome') {
            wp_enqueue_style('fontawesome-icons');
        } else if ($iconLibrary == 'iconFont') {
            wp_enqueue_style('icofont-icons');
        } else if ($iconLibrary == 'bootstrap') {
            wp_enqueue_style('bootstrap-icons');
        }



        ob_start();


?>
        <div class="pg-tabs-panel <?php echo ($uid == $activeTab) ? 'pg-tabs-panel-active' : '' ?>" data-tab-id="<?php echo esc_attr($uid); ?>" hidden="true">

            <?php echo  $content; ?>

        </div>






<?php return ob_get_clean();
    }
}

$PGBlockStepsWrapItem = new PGBlockStepsWrapItem();
