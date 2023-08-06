<?php
if (!defined('ABSPATH')) exit();



class PGBlockStarRate
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {


        register_block_type('post-grid/star-rate', array(
            //'editor_script' => 'editor_script',
            //'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            'style' => 'front_style',
            'render_callback' => array($this, 'theHTML'),
            'attributes' =>  [
                "wrapper" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "tag" => "div",
                            "class" => "",
                            "attr" => []
                        ],
                        "styles" => [

                            "color" => [],

                            "padding" => [],
                            "margin" => [],
                            "display" => [],
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


                "starRate" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "maxCount" => 5,
                            "count" => 3,

                            "isLink" => true,
                            "linkTo" => "postUrl",
                            "linkToAuthorMeta" => "",
                            "linkToCustomMeta" => "",
                            "linkTarget" => "_blank",
                            "customUrl" => "",
                            "linkAttr" => [],
                            "class" => ""
                        ],
                        "styles" => [
                            "color" => [],

                            "padding" => [],
                            "margin" => [],

                            "display" => [],
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


                "text" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "text" => "Custom Text",
                            "isLink" => true,
                            "linkTo" => "postUrl",
                            "linkToAuthorMeta" => "",
                            "linkToCustomMeta" => "",
                            "linkTarget" => "_blank",
                            "customUrl" => "",
                            "linkAttr" => [],
                            "class" => ""
                        ],
                        "styles" => [
                            "color" => [],

                            "padding" => [],
                            "margin" => [],

                            "display" => [],
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
                "icon" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "library" => "fontAwesome",
                            "srcType" => "class",
                            "iconSrc" => "fas fa-check-circle",
                            "position" => "beforeText",
                            "class" => "text-icon"
                        ],
                        "styles" => [
                            "color" => [],

                            "padding" => [],
                            "margin" => [],

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
                            "class" => "postfix"
                        ],
                        "styles" => [
                            "color" => [],
                            "backgroundColor" => []
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
                "linkAttr" => [
                    "type" => "array",
                    "default" => []
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

        $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
        $iconOptions = isset($icon['options']) ? $icon['options'] : [];
        $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
    }

    // front-end output from the gutenberg editor 
    function theHTML($attributes, $content, $block)
    {


        global $postGridCss;
        global $postGridCustomCss;
        global $postGridCssY;



        $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
        $post_url = get_the_permalink($post_ID);
        $the_post = get_post($post_ID);
        $post_excerpt = '';

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';

        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
        $wrapperAttr = isset($wrapperOptions['attr']) ? $wrapperOptions['attr'] : [];



        $starRate = isset($attributes['starRate']) ? $attributes['starRate'] : [];
        $starRateOptions = isset($starRate['options']) ? $starRate['options'] : [];

        $maxCount = isset($starRateOptions['maxCount']) ? $starRateOptions['maxCount'] : 5;
        $count = isset($starRateOptions['count']) ? $starRateOptions['count'] : 3;



        $text = isset($attributes['text']) ? $attributes['text'] : [];
        $starRateOptions = isset($text['options']) ? $text['options'] : [];

        $textText = isset($textOptions['text']) ? $textOptions['text'] : 'Custom Text';




        $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
        $iconOptions = isset($icon['options']) ? $icon['options'] : [];

        $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
        $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
        $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
        $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
        $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';

        $textIsLink = isset($iconOptions['isLink']) ? $iconOptions['isLink'] : true;
        $textLinkTarget = isset($iconOptions['linkTarget']) ? $iconOptions['linkTarget'] : '_blank';
        $textCustomUrl = isset($iconOptions['customUrl']) ? $iconOptions['customUrl'] : '';
        $textLinkAttr = isset($iconOptions['linkAttr']) ? $iconOptions['linkAttr'] : [];
        $textRel = isset($iconOptions['rel']) ? $iconOptions['rel'] : '';




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



        if ($iconLibrary == 'fontAwesome') {
            wp_enqueue_style('fontawesome-icons');
        } else if ($iconLibrary == 'iconFont') {
            wp_enqueue_style('icofont-icons');
        } else if ($iconLibrary == 'bootstrap') {
            wp_enqueue_style('bootstrap-icons');
        }

        $linkAttrStr = '';



        if (!empty($postExcerptlinkAttr))
            foreach ($postExcerptlinkAttr as $attr) {

                if (!empty($attr['val']))
                    $linkAttrStr .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
            }


        $linkAttrStrText = '';

        if (!empty($textLinkAttr))
            foreach ($textLinkAttr as $attr) {

                if (!empty($attr['val']))
                    $linkAttrStrText .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
            }


        $wrapperAttrText = '';

        if (!empty($wrapperAttr))
            foreach ($wrapperAttr as $attr) {

                if (!empty($attr['val']))
                    $wrapperAttrText .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
            }


        $postGridCustomCss .= $customCss;


        $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';


        ob_start();


        if (!empty($wrapperTag)) :

?>
            <<?php echo esc_attr($wrapperTag); ?> class="<?php echo esc_attr($blockId); ?>" <?php echo esc_attr($wrapperAttrText); ?>>




                <?php if ($prefixText) : ?>
                    <span class="<?php echo esc_attr($prefixClass); ?>"><?php echo wp_kses_post($prefixText); ?></span>
                <?php endif; ?>


                <?php if ($textIsLink) : ?>
                    <a class='text' <?php
                                    /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
                                    echo ($linkAttrStrText); ?> target="<?php echo esc_attr($textLinkTarget); ?>" rel="<?php echo esc_attr($textRel); ?>" href="<?php echo (!empty($textCustomUrl)) ? esc_url_raw($textCustomUrl) :  esc_url_raw($post_url); ?>">

                        <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php echo wp_kses_post($fontIconHtml); ?>




                    </a>

                <?php else : ?>

                    <?php echo wp_kses_post($fontIconHtml); ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>


                <?php endif; ?>





                <?php if ($postfixText) : ?>
                    <span class="<?php echo esc_attr($postfixClass); ?>"><?php echo wp_kses_post($postfixText); ?></span>
                <?php endif; ?>



            </<?php echo esc_attr($wrapperTag); ?>>
        <?php

        endif;

        if (empty($wrapperTag)) :

        ?>


            <?php if (!$textIsLink) : ?>
                <?php if ($prefixText) : ?>
                    <span class="<?php echo esc_attr($prefixClass); ?>"><?php echo wp_kses_post($prefixText); ?></span>
                <?php endif; ?>



                <?php echo wp_kses_post($fontIconHtml); ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
                <?php echo wp_kses_post($fontIconHtml); ?>





                <?php if ($postfixText) : ?>
                    <span class="<?php echo esc_attr($postfixClass); ?>"><?php echo wp_kses_post($postfixText); ?></span>
                <?php endif; ?>
            <?php else : ?>
                <?php if ($prefixText) : ?>
                    <span class="<?php echo esc_attr($prefixClass); ?>"><?php echo wp_kses_post($prefixText); ?></span>
                <?php endif; ?>
                <a class='text' <?php
                                /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
                                echo ($linkAttrStrText); ?> target="<?php echo esc_attr($textLinkTarget); ?>" rel="<?php echo esc_attr($textRel); ?>" href="<?php echo (!empty($textCustomUrl)) ? esc_url_raw($textCustomUrl) :  esc_url_raw($post_url); ?>">


                    <?php echo wp_kses_post($fontIconHtml); ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>




                </a>
                <?php if ($postfixText) : ?>
                    <span class="<?php echo esc_attr($postfixClass); ?>"><?php echo wp_kses_post($postfixText); ?></span>
                <?php endif; ?>
            <?php endif; ?>


        <?php

        endif;

        ?>









<?php return ob_get_clean();
    }
}

$PGBlockStarRate = new PGBlockStarRate();
