<?php
if (!defined('ABSPATH')) exit();



class PGBlockPostTitle
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/post-title/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/post-title/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/post-title', array(
            //'editor_script' => 'editor_script',
            //'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            //'style' => 'front_style',
            'render_callback' => array($this, 'theHTML'),
            'attributes' =>  [
                "wrapper" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "tag" => "h2",
                            "class" => ""
                        ],
                        "styles" => [
                            "display" => [],

                            "color" => [],

                            "padding" => [],
                            "margin" => []
                        ]
                    ]
                ],
                "postTitle" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "tag" => "div",
                            "limitBy" => "",
                            "limitCount" => 99,
                            "isLink" => true,
                            "linkTo" => "postUrl",
                            "linkToAuthorMeta" => "",
                            "linkToCustomMeta" => "",
                            "linkTarget" => "_blank",
                            "linkAttr" => [],
                            "customUrl" => "",
                            "class" => ""
                        ],
                        "styles" => [

                            "display" => [],
                            "width" => [],
                            "color" => [],

                            "padding" => [],
                            "margin" => [],
                            "fontSize" => [],
                            "lineHeight" => [],
                            "letterSpacing" => [],
                            "fontFamily" => [],
                            "fontWeight" => [],
                            "textDecoration" => [],
                            "textTransform" => []
                        ]
                    ]
                ],
                "prefix" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "text" => "",
                            "class" => "prefix"
                        ],
                        "styles" => [
                            "color" => [],
                            "backgroundColor" => []
                        ]
                    ]
                ],
                "postfix" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "text" => "",
                            "class" => "prefix"
                        ],
                        "styles" => [
                            "color" => [],
                            "backgroundColor" => []
                        ]
                    ]
                ],
                "customCss" => [
                    "type" => "string",
                    "default" => ""
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
        global $postGridCustomCss;
        global $postGridCssY;

        $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
        $post_url = get_the_permalink($post_ID);

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';


        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'h2';



        $postTitle = isset($attributes['postTitle']) ? $attributes['postTitle'] : [];
        $postTitleOptions = isset($postTitle['options']) ? $postTitle['options'] : [];


        $postTitleIsLink = isset($postTitleOptions['isLink']) ? $postTitleOptions['isLink'] : true;
        $linkTarget = isset($postTitleOptions['linkTarget']) ? $postTitleOptions['linkTarget'] : '_blank';
        $customUrl = isset($postTitleOptions['customUrl']) ? $postTitleOptions['customUrl'] : '';
        $limitBy = isset($postTitleOptions['limitBy']) ? $postTitleOptions['limitBy'] : '';
        $limitCount = !empty($postTitleOptions['limitCount']) ? $postTitleOptions['limitCount'] : 999;


        $linkAttr = isset($postTitleOptions['linkAttr']) ? $postTitleOptions['linkAttr'] : [];
        $rel = isset($postTitleOptions['rel']) ? $postTitleOptions['rel'] : '';

        $prefix = isset($attributes['prefix']) ? $attributes['prefix'] : '';
        $prefixOptions = isset($prefix['options']) ? $prefix['options'] : '';

        $prefixText = isset($prefixOptions['text']) ? _wp_specialchars($prefixOptions['text']) : '';
        $prefixClass = isset($prefixOptions['class']) ? $prefixOptions['class'] : 'prefix';

        $postfix = isset($attributes['postfix']) ? $attributes['postfix'] : '';
        $postfixOptions = isset($postfix['options']) ? $postfix['options'] : '';

        $postfixText = isset($postfixOptions['text']) ? _wp_specialchars($postfixOptions['text']) : '';
        $postfixClass = isset($postfixOptions['class']) ? $postfixOptions['class'] : 'postfix';

        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];




        $postGridCustomCss .= $customCss;


        $linkAttrStr = '';
        $attrArr = [];

        if (!empty($linkAttr))
            foreach ($linkAttr as $attr) {

                if (!empty($attr['val'])) {
                    $linkAttrStr .= esc_attr($attr['id']) . '="' . esc_attr($attr['val']) . '" ';
                    $attrArr[$attr['id']] = $attr['val'];
                }
            }





        $post_title = get_the_title($post_ID);



        if ($limitBy == 'character') {

            $post_title = substr($post_title, 0, $limitCount);
        } else {

            $post_title = wp_trim_words($post_title, $limitCount, '');
        }



        ob_start();





?>
        <?php

        if (!empty($wrapperTag)) :

        ?>
            <<?php echo esc_attr($wrapperTag); ?> class="<?php echo esc_attr($blockId); ?>">
                <?php if ($postTitleIsLink) : ?>
                    <a href="<?php echo (!empty($customUrl)) ? esc_url_raw($customUrl) :  esc_url_raw($post_url); ?>" rel="<?php echo esc_attr($rel); ?>" target="<?php echo esc_attr($linkTarget); ?>" <?php

                                                                                                                                                                                                        /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
                                                                                                                                                                                                        echo ($linkAttrStr); ?>>
                        <?php if (!empty($prefixText)) : ?>
                            <span class="<?php echo esc_attr($prefixClass); ?>"><?php echo wp_kses_post($prefixText); ?></span>
                        <?php endif; ?>
                        <?php echo  wp_kses_post($post_title); ?>
                        <?php if (!empty($postfixText)) : ?>
                            <span class="<?php echo esc_attr($postfixClass); ?>"><?php echo wp_kses_post($postfixText); ?></span>
                        <?php endif; ?>
                    </a>
                <?php else : ?>
                    <?php if (!empty($prefixText)) : ?>
                        <span class="<?php echo esc_attr($prefixClass); ?>"><?php echo wp_kses_post($prefixText); ?></span>
                    <?php endif; ?>
                    <?php echo wp_kses_post($post_title); ?>
                    <?php if (!empty($postfixText)) : ?>
                        <span class="<?php echo esc_attr($postfixClass); ?>"><?php echo wp_kses_post($postfixText); ?></span>
                    <?php endif; ?>
                <?php endif; ?>
            </<?php echo esc_attr($wrapperTag); ?>>
        <?php

        endif;

        if (empty($wrapperTag)) :

        ?>

            <?php if ($postTitleIsLink) : ?>
                <a class="<?php echo esc_attr($blockId); ?>" href="<?php echo (!empty($customUrl)) ? esc_url_raw($customUrl) :  esc_url_raw($post_url); ?>" rel="<?php echo esc_attr($rel); ?>" target="<?php echo esc_attr($linkTarget); ?>" <?php
                                                                                                                                                                                                                                                /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
                                                                                                                                                                                                                                                echo ($linkAttrStr); ?>>
                    <?php if (!empty($prefixText)) : ?>
                        <span class="<?php echo esc_attr($prefixClass); ?>"><?php echo wp_kses_post($prefixText); ?></span>
                    <?php endif; ?>
                    <?php echo wp_kses_post($post_title); ?>
                    <?php if (!empty($postfixText)) : ?>
                        <span class="<?php echo esc_attr($postfixClass); ?>"><?php echo wp_kses_post($postfixText); ?></span>
                    <?php endif; ?>
                </a>
            <?php else : ?>
                <?php if (!empty($prefixText)) : ?>
                    <span class="<?php echo esc_attr($prefixClass); ?>"><?php echo wp_kses_post($prefixText); ?></span>
                <?php endif; ?>
                <?php echo wp_kses_post($post_title); ?>
                <?php if (!empty($postfixText)) : ?>
                    <span class="<?php echo esc_attr($postfixClass); ?>"><?php echo wp_kses_post($postfixText); ?></span>
                <?php endif; ?>
            <?php endif; ?>

        <?php

        endif;

        ?>









<?php return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockPostTitle();
