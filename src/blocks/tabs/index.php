<?php
if (!defined('ABSPATH')) exit();



class PGBlockTabs
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        wp_register_style('pgtabs_editor_style', post_grid_plugin_url . 'src/blocks/tabs/index.css');
        wp_register_script('pgtabs_editor_script', post_grid_plugin_url . 'src/blocks/tabs/index.js', array('wp-blocks', 'wp-element'));
        wp_register_style('pgtabs_front_style', post_grid_plugin_url . 'src/blocks/tabs/index.css');
        wp_register_script('pgtabs_front_script', post_grid_plugin_url . 'src/blocks/tabs/front-scripts.js', []);
        wp_register_script('pgtabs_tabs_js', post_grid_plugin_url . 'src/blocks/tabs/tabs.js', []);
        wp_register_style('pgtabs_tabs_css', post_grid_plugin_url . 'src/blocks/tabs/tabs.css', []);



        register_block_type('post-grid/tabs', array(
            'editor_script' => 'pgtabs_editor_script',
            'script' => 'pgtabs_front_script',

            'editor_style' => 'pgtabs_editor_style',
            'style' => 'pgtabs_front_style',

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
                            "class" => "tab-nav "
                        ],
                        "styles" => [
                            "textAlign" => [],
                            "color" => [],
                            "bgColor" => [],
                            "padding" => [],
                            "margin" => [],
                            "display" => [],
                            "cursor" => [],
                            "borderRadius" => [],
                            "fontSize" => [],
                            "lineHeight" => [],
                            "letterSpacing" => [],
                            "fontFamily" => [],
                            "fontWeight" => [
                                "Desktop" => "700"
                            ],
                            "textDecoration" => [],
                            "textTransform" => []
                        ]
                    ]
                ],
                "headerActive" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "text" => "What is Lorem Ipsum?",
                            "tag" => "div",
                            "class" => "tab-nav ",
                            "activeIndex" => 0
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
                "headerWrap" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "tag" => "div",
                            "class" => "tabs-navs "
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

    // function front_script($attributes)
    // {
    // }
    function front_style($attributes)
    {
    }

    // front-end output from the gutenberg editor 
    function theHTML($attributes, $content, $block)
    {

        wp_enqueue_style('pgtabs_tabs_css');
        wp_enqueue_script('pgtabs_tabs_js');

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
        $headerActiveIndex = isset($headerActiveOptions['activeIndex']) ? $headerActiveOptions['activeIndex'] : [];



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

            <div class="PGBlockTabs <?php echo $blockId; ?>">
                <div class="tabs-navs">
                    <?php
                    foreach ($items as $index => $item) {
                    ?><<?php echo $headerTag; ?> class="<?php echo $headerOptions['class']; ?> <?php echo ($headerActiveIndex == $index) ? 'active' : ''; ?>" index=<?php echo esc_attr($index); ?> data-id=<?php echo esc_attr($blockId . $index); ?> panelId=<?php echo esc_attr($blockId . $index); ?>>
                            <?php if ($iconPosition == 'beforeHeader') : ?>
                                <span class="icon-idle"><?php echo $iconHtml; ?></span>
                                <span class="icon-toggled"><?php echo $iconToggleHtml; ?></span>
                            <?php endif; ?>
                            <?php echo $item['headerText']; ?>
                            <?php if ($iconPosition == 'afterHeader') : ?>
                                <span class="float-right">
                                    <span class="icon-idle"><?php echo $iconHtml; ?></span>
                                    <span class="icon-toggled"><?php echo $iconToggleHtml; ?></span>
                                </span>
                            <?php endif; ?>
                        </<?php echo $headerTag; ?>><?php
                                                }
                                                    ?>
                </div>
                <div class="tabs-panels">
                    <?php
                    foreach ($items as $index => $item) {
                    ?>
                        <div class="tabs-panel <?php echo $contentOptions['class']; ?> <?php echo ($headerActiveIndex == $index) ? 'active' : ''; ?>" id="<?php echo $blockId . $index; ?>">
                            <?php echo $item['content']; ?>
                        </div>
                    <?php
                    }
                    ?>
                </div>
            </div>
        <?php

        endif;



        ?>








<?php return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockTabs();
