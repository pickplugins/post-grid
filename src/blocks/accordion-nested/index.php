<?php
if (!defined('ABSPATH')) exit();



class PGBlockAccordionNested
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
    }


    function front_scripts($attributes)
    {
        wp_register_script('pgaccordionnested_front_script', post_grid_plugin_url . 'src/blocks/accordion-nested/front-scripts.js', [], '', true);

        if (has_block('post-grid/accordion-nested')) {

            wp_enqueue_style('jquery-ui');

            wp_enqueue_script('jquery');
            wp_enqueue_script('jquery-ui-core');
            wp_enqueue_script('jquery-ui-accordion');
            wp_enqueue_script('jquery-effects-core');

            wp_enqueue_script('pgaccordionnested_front_script');
        }
    }
    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/layers/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/layers/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/accordion-nested', array(
            //'editor_script' => 'editor_script',
            //'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            'provides_context' => array(
                'post-grid/accordion-nested/schema' => 'schema',

            ),
            //'style' => [$this, 'front_style'],
            'render_callback' => array($this, 'theHTML'),
            'attributes' =>  [
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
                "schema" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "enable" => false,
                        ],
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



        $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
        $post_url = get_the_permalink($post_ID);
        $the_post = get_post($post_ID);

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';




        $schema = isset($attributes['schema']) ? $attributes['schema'] : [];
        $schemaOptions = isset($schema['options']) ? $schema['options'] : [];
        $schemaEnable = isset($schemaOptions['enable']) ? $schemaOptions['enable'] : true;



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

        $json = [];

        $i = 0;

        $json['@context'] = "https://schema.org";
        $json['@type'] = "FAQPage";


        foreach ($block->parsed_block['innerBlocks'] as $block) {


            $json['mainEntity'][$i]['@type'] = "Question";
            $json['mainEntity'][$i]['name'] = isset($block['attrs']['headerLabel']['options']['text']) ? $block['attrs']['headerLabel']['options']['text'] : '';
            $json['mainEntity'][$i]['acceptedAnswer']['@type'] = "Answer";
            $json['mainEntity'][$i]['acceptedAnswer']['text'] = render_block($block);



            $i++;
        }


        ob_start();




?>


        <div class="pg-accordion-nested <?php echo esc_attr($blockId); ?>">
            <?php echo  $content; ?>
        </div>

        <?php
        if ($schemaEnable) :
        ?>
            <script type="application/ld+json">
                <?php echo wp_unslash(json_encode($json)); ?>
            </script>
        <?php
        endif;
        ?>





<?php return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockAccordionNested();
