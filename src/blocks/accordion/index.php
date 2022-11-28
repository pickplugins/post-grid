<?php
if (!defined('ABSPATH')) exit();



class PGBlockAccordion
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        wp_register_style('pgaccordion_editor_style', post_grid_plugin_url . 'src/blocks/accordion/index.css');
        wp_register_script('pgaccordion_editor_script', post_grid_plugin_url . 'src/blocks/accordion/index.js', array('wp-blocks', 'wp-element'));
        wp_register_style('pgaccordion_front_style', post_grid_plugin_url . 'src/blocks/accordion/index.css');
        wp_register_script('pgaccordion_front_script', post_grid_plugin_url . 'src/blocks/accordion/front-scripts.js', []);
        wp_register_script('pgaccordion_accordion_js', post_grid_plugin_url . 'src/blocks/accordion/accordion.min.js', []);
        wp_register_style('pgaccordion_accordion_css', post_grid_plugin_url . 'src/blocks/accordion/accordion.min.css', []);



        register_block_type('post-grid/accordion', array(
            'editor_script' => 'pgaccordion_editor_script',
            'script' => 'pgaccordion_front_script',

            'editor_style' => 'pgaccordion_editor_style',
            'style' => 'pgaccordion_front_style',

            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            'render_callback' => array($this, 'theHTML'),
            'attributes' =>  [
                "wrapper" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "content" => "",
                            "tag" => "div",
                            "class" => "pg-accordion"
                        ],
                        "styles" => [
                            "textAlign" => [],
                            "color" => [],
                            "bgColor" => [],
                            "padding" => [],
                            "margin" => [],
                            "display" => []
                        ]
                    ]
                ],
                "items" => [
                    "type" => "array",
                    "default" => [
                        [
                            "isActive" => false,
                            "headerText" => "What is Lorem Ipsum?",
                            "content" => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            "icon" => "",
                            "iconToggle" => "",
                            "styles" => []
                        ]
                    ]
                ],
                "header" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "text" => "What is Lorem Ipsum?",
                            "tag" => "div",
                            "class" => "pg-accordion-header"
                        ],
                        "styles" => [
                            "textAlign" => [],
                            "color" => [],
                            "bgColor" => [],
                            "padding" => [],
                            "margin" => [],
                            "display" => []
                        ]
                    ]
                ],
                "headerActive" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "text" => "What is Lorem Ipsum?",
                            "tag" => "div",
                            "class" => "pg-accordion-header "
                        ],
                        "styles" => [
                            "textAlign" => [],
                            "color" => [],
                            "bgColor" => [],
                            "padding" => [],
                            "margin" => [],
                            "display" => []
                        ]
                    ]
                ],
                "content" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "text" => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            "tag" => "div",
                            "class" => "pg-accordion-content"
                        ],
                        "styles" => [
                            "textAlign" => [],
                            "color" => [],
                            "bgColor" => [],
                            "padding" => [],
                            "margin" => [],
                            "display" => []
                        ]
                    ]
                ],
                "icon" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "library" => "fontAwesome",
                            "srcType" => "class",
                            "iconSrc" => "fas fa-chevron-right",
                            "class" => "icon",
                            "positon" => "beforeHeader",
                            "enableToggle" => "yes"
                        ],
                        "styles" => [
                            "color" => [],
                            "bgColor" => [],
                            "padding" => [],
                            "margin" => [],
                            "textAlign" => [],
                            "display" => [],
                            "fontSize" => [],
                            "lineHeight" => [],
                            "fontWeight" => [
                                "Desktop" => "700"
                            ],
                            "textDecoration" => []
                        ]
                    ]
                ],
                "iconToggle" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "library" => "fontAwesome",
                            "srcType" => "class",
                            "iconSrc" => "fas fa-chevron-down",
                            "class" => "iconToggle"
                        ],
                        "styles" => [
                            "color" => [],
                            "bgColor" => [],
                            "padding" => [],
                            "margin" => [],
                            "textAlign" => [],
                            "display" => [],
                            "fontSize" => [],
                            "lineHeight" => [],
                            "fontWeight" => [
                                "Desktop" => "700"
                            ],
                            "textDecoration" => []
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

        wp_enqueue_style('pgaccordion_accordion_css');
        wp_enqueue_script('pgaccordion_accordion_js');

        global $postGridCustomCss;
        global $postGridCssY;



        $post_ID = $block->context['postId'];
        $post_url = get_the_permalink($post_ID);
        $the_post = get_post($post_ID);

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';

        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $textOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
        $wrapperStyles = isset($wrapper['styles']) ? $wrapper['styles'] : [];
        $wrapperTypo = isset($wrapper['typo']) ? $wrapper['typo'] : [];

        $wrapperTag = isset($textOptions['tag']) ? $textOptions['tag'] : 'div';

        $items = isset($attributes['items']) ? $attributes['items'] : [];


        $header = isset($attributes['header']) ? $attributes['header'] : [];
        $headerOptions = isset($header['options']) ? $header['options'] : [];
        $headerStyles = isset($header['styles']) ? $header['styles'] : [];
        $headerTag = isset($headerOptions['tag']) ? $headerOptions['tag'] : 'h2';

        $headerActive = isset($attributes['headerActive']) ? $attributes['headerActive'] : [];
        $headerActiveOptions = isset($headerActive['options']) ? $headerActive['options'] : [];
        $headerActiveStyles = isset($headerActive['styles']) ? $headerActive['styles'] : [];



        $content = isset($attributes['content']) ? $attributes['content'] : [];
        $contentOptions = isset($content['options']) ? $content['options'] : [];
        $contentStyles = isset($content['styles']) ? $content['styles'] : [];

        $icon = isset($attributes['icon']) ? $attributes['icon'] : [];
        $iconOptions = isset($icon['options']) ? $icon['options'] : [];
        $iconStyles = isset($icon['styles']) ? $icon['styles'] : [];

        $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
        $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
        $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
        $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
        $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';

        $iconToggle = isset($attributes['iconToggle']) ? $attributes['iconToggle'] : [];
        $iconToggleOptions = isset($iconToggle['options']) ? $iconToggle['options'] : [];
        $iconToggleStyles = isset($iconToggle['styles']) ? $iconToggle['styles'] : [];

        $iconToggleLibrary = isset($iconToggleOptions['library']) ? $iconToggleOptions['library'] : '';
        $iconToggleSrcType = isset($iconToggleOptions['srcType']) ? $iconToggleOptions['srcType'] : '';
        $iconToggleSrc = isset($iconToggleOptions['iconSrc']) ? $iconToggleOptions['iconSrc'] : '';
        $iconTogglePosition = isset($iconToggleOptions['position']) ? $iconToggleOptions['position'] : '';
        $iconToggleClass = isset($iconToggleOptions['class']) ? $iconToggleOptions['class'] : '';

        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];


        $postGridCustomCss .= $customCss;

        //var_dump($icon);


        if ($iconLibrary == 'fontAwesome') {
            wp_enqueue_style('fontawesome-icons');
        } else if ($iconLibrary == 'iconFont') {
            wp_enqueue_style('icofont-icons');
        } else if ($iconLibrary == 'bootstrap') {
            wp_enqueue_style('bootstrap-icons');
        }

        $iconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';
        $iconToggleHtml = '<span class="' . $iconToggleClass . ' ' . $iconToggleSrc . '"></span>';


        ob_start();




        if (!empty($wrapperTag)) :
?>

            <div class="PGBlockAccordion <?php echo esc_attr($blockId); ?>">



                <?php
                foreach ($items as $index => $item) {

                ?>
                    <div class="ac">
                        <<?php echo esc_attr($headerTag); ?> class="ac-header ac-trigger <?php echo esc_attr($headerOptions['class']); ?>" index=<?php echo esc_attr($index); ?> blockId=<?php echo esc_attr($blockId); ?>>
                            <?php if ($iconPosition == 'beforeHeader') : ?>
                                <span class="icon-idle"><?php echo wp_kses_post($iconHtml); ?></span>
                                <span class="icon-toggled"><?php echo wp_kses_post($iconToggleHtml); ?></span>

                            <?php endif; ?>
                            <span><?php echo $item['headerText']; ?></span>
                            <?php if ($iconPosition == 'afterHeader') : ?>
                                <span class="float-right">
                                    <span class="icon-idle"><?php echo wp_kses_post($iconHtml); ?></span>
                                    <span class="icon-toggled"><?php echo wp_kses_post($iconToggleHtml); ?></span>
                                </span>
                            <?php endif; ?>
                        </<?php echo esc_attr($headerTag); ?>>

                        <div class="ac-panel <?php echo esc_attr($contentOptions['class']); ?>" id="<?php echo esc_attr($blockId . $index); ?>">

                            <?php  ?>
                            <div class="ac-text"><?php echo wp_kses_post($item['content']); ?></div>
                            <?php  ?>
                        </div>
                    </div>


                <?php
                }

                ?>
            </div>
        <?php

        endif;



        ?>


        <script>
            document.addEventListener("DOMContentLoaded", function(event) {
                new Accordion('.PGBlockAccordion', {
                    duration: 400,
                    onOpen: (currElement) => {


                        //console.log('onOpen');

                    },
                    onClose: (currElement) => {
                        //console.log('onClose');
                        //console.log();

                    },
                    beforeOpen: (currElement) => {
                        console.log('beforeOpen');
                        var iconIdle = currElement.querySelector('.icon-idle');
                        var iconToggled = currElement.querySelector('.icon-toggled');

                        iconIdle.style.display = 'none';
                        iconToggled.style.display = 'inline-block';
                    },
                    beforeClose: (currElement) => {
                        console.log('beforeClose');
                        var iconIdle = currElement.querySelector('.icon-idle');
                        var iconToggled = currElement.querySelector('.icon-toggled');

                        iconIdle.style.display = 'inline-block';
                        iconToggled.style.display = 'none';
                    }

                });

            })
        </script>






<?php return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockAccordion();
