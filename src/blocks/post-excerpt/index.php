<?php
if (!defined('ABSPATH')) exit();



class PGBlockPostExcerpt
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/post-excerpt/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/post-excerpt/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/post-excerpt', array(
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
                            "tag" => "div",
                            "class" => ""
                        ],
                        "styles" => [
                            "textAlign" => [],
                            "color" => [],
                            "bgColor" => [],
                            "padding" => [],
                            "margin" => [],
                            "display" => [
                                "Desktop" => "block"
                            ]
                        ]
                    ]
                ],
                "postExcerpt" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "tag" => "div",
                            "text" => "",
                            "limitBy" => "word",
                            "limitCount" => 99,
                            "excerptSource" => "auto",
                            "excerptSourceMeta" => "",
                            "removeBlocks" => true,
                            "removeShortcodes" => true,
                            "keepHtml" => false,
                            "removeEmbeds" => true,
                            "autoP" => false,
                            "isLink" => false,
                            "linkTarget" => "_blank",
                            "customUrl" => "",
                            "linkAttr" => [],
                            "class" => "excerpt-text"
                        ],
                        "styles" => [
                            "textAlign" => [],
                            "color" => [],
                            "bgColor" => [],
                            "padding" => [],
                            "margin" => [],
                            "display" => [
                                "Desktop" => "inline-block"
                            ],
                            "fontSize" => [],
                            "lineHeight" => [
                                "Desktop" => "25"
                            ],
                            "letterSpacing" => [],
                            "fontFamily" => [],
                            "fontWeight" => [],
                            "textDecoration" => [],
                            "textTransform" => []
                        ]
                    ]
                ],
                "readMore" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "text" => "Read More",
                            "isLink" => true,
                            "linkTarget" => "_blank",
                            "customUrl" => "",
                            "linkAttr" => [],
                            "class" => ""
                        ],
                        "styles" => [
                            "color" => [],
                            "bgColor" => [],
                            "padding" => [],
                            "margin" => [],
                            "textAlign" => [],
                            "display" => [
                                "Desktop" => "inline-block"
                            ],
                            "fontSize" => [],
                            "lineHeight" => [
                                "Desktop" => "25"
                            ],
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
                "prefix" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "text" => "",
                            "class" => "prefix"
                        ],
                        "styles" => [
                            "color" => [],
                            "bgColor" => []
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
                            "bgColor" => []
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
    }

    // front-end output from the gutenberg editor 
    function theHTML($attributes, $content, $block)
    {


        global $postGridCss;
        global $postGridCustomCss;
        global $postGridCssY;



        $post_ID = $block->context['postId'];
        $post_url = get_the_permalink($post_ID);
        $the_post = get_post($post_ID);
        $post_excerpt = '';

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';


        $postGridCustomCss .= $customCss;


        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
        $wrapperStyles = isset($wrapper['styles']) ? $wrapper['styles'] : [];

        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';

        $wrapperTextAlign = isset($wrapperStyles['textAlign']) ? $wrapperStyles['textAlign'] : [];


        $postExcerpt = isset($attributes['postExcerpt']) ? $attributes['postExcerpt'] : [];
        $postExcerptOptions = isset($postExcerpt['options']) ? $postExcerpt['options'] : [];
        $postExcerptStyles = isset($postExcerpt['styles']) ? $postExcerpt['styles'] : [];
        $postExcerptTypo = isset($postExcerpt['typo']) ? $postExcerpt['typo'] : [];

        $limitBy = isset($postExcerptOptions['limitBy']) ? $postExcerptOptions['limitBy'] : 'word';
        $limitCount = !empty($postExcerptOptions['limitCount']) ? (int) $postExcerptOptions['limitCount'] : 999;
        $excerptSource = isset($postExcerptOptions['excerptSource']) ? $postExcerptOptions['excerptSource'] : 'auto';
        $excerptSourceMeta = isset($postExcerptOptions['excerptSourceMeta']) ? $postExcerptOptions['excerptSourceMeta'] : '';

        $postExcerptTag = isset($postExcerptOptions['tag']) ? $postExcerptOptions['tag'] : '';
        $postExcerptIsLink = isset($postExcerptOptions['isLink']) ? $postExcerptOptions['isLink'] : false;
        $postExcerptclass = isset($postExcerptOptions['class']) ? $postExcerptOptions['class'] : '';
        $postExcerptlinkAttr = isset($postExcerptOptions['linkAttr']) ? $postExcerptOptions['linkAttr'] : [];
        $postExcerptRel = isset($postExcerptOptions['rel']) ? $postExcerptOptions['rel'] : '';

        $postExcerptLinkTarget = isset($postExcerptOptions['linkTarget']) ? $postExcerptOptions['linkTarget'] : '';
        $postExcerptCustomUrl = isset($postExcerptOptions['customUrl']) ? $postExcerptOptions['customUrl'] : '';
        $removeBlocks = isset($postExcerptOptions['removeBlocks']) ? $postExcerptOptions['removeBlocks'] : true;
        $removeShortcodes = isset($postExcerptOptions['removeShortcodes']) ? $postExcerptOptions['removeShortcodes'] : true;
        $keepHtml = isset($postExcerptOptions['keepHtml']) ? $postExcerptOptions['keepHtml'] : true;
        $removeEmbeds = isset($postExcerptOptions['removeEmbeds']) ? $postExcerptOptions['removeEmbeds'] : true;
        $autoP = isset($postExcerptOptions['autoP']) ? $postExcerptOptions['autoP'] : false;




        $postExcerptColor = isset($postExcerptStyles['color']) ? $postExcerptStyles['color'] : [];
        $postExcerptbgColor = isset($postExcerptStyles['bgColor']) ? $postExcerptStyles['bgColor'] : [];
        $postExcerptPadding = isset($postExcerptStyles['padding']) ? $postExcerptStyles['padding'] : [];
        $postExcerptMargin = isset($postExcerptStyles['margin']) ? $postExcerptStyles['margin'] : [];
        $postExcerptDisplay = isset($postExcerptStyles['display']) ? $postExcerptStyles['display'] : [];

        $postExcerptFontSize = isset($postExcerptTypo['fontSize']) ? $postExcerptTypo['fontSize'] : [];
        $postExcerptFontFamily = isset($postExcerptTypo['fontFamily']) ? $postExcerptTypo['fontFamily'] : [];
        $postExcerptLineHeight = isset($postExcerptTypo['lineHeight']) ? $postExcerptTypo['lineHeight'] : [];
        $postExcerptLetterSpacing = isset($postExcerptTypo['letterSpacing']) ? $postExcerptTypo['letterSpacing'] : [];
        $postExcerptFontWeight = isset($postExcerptTypo['fontWeight']) ? $postExcerptTypo['fontWeight'] : [];
        $postExcerptTextDecoration = isset($postExcerptTypo['textDecoration']) ? $postExcerptTypo['textDecoration'] : [];
        $postExcerptTextTransform = isset($postExcerptTypo['textTransform']) ? $postExcerptTypo['textTransform'] : [];




        $readMore = isset($attributes['readMore']) ? $attributes['readMore'] : [];
        $readMoreOptions = isset($readMore['options']) ? $readMore['options'] : [];
        $readMoreStyles = isset($readMore['styles']) ? $readMore['styles'] : [];
        $readMoreTypo = isset($readMore['typo']) ? $readMore['typo'] : [];

        $readMoreText = isset($readMoreOptions['text']) ? $readMoreOptions['text'] : __('Read More', 'post-grid');


        $readMoreIsLink = isset($readMoreOptions['isLink']) ? $readMoreOptions['isLink'] : true;
        $readMoreLinkTarget = isset($readMoreOptions['linkTarget']) ? $readMoreOptions['linkTarget'] : '_blank';
        $readMoreCustomUrl = isset($readMoreOptions['customUrl']) ? $readMoreOptions['customUrl'] : '';
        $readMoreLinkAttr = isset($readMoreOptions['linkAttr']) ? $readMoreOptions['linkAttr'] : [];
        $readMoreRel = isset($readMoreOptions['rel']) ? $readMoreOptions['rel'] : '';


        $readMoreColor = isset($readMoreStyles['color']) ? $readMoreStyles['color'] : [];
        $readMorebgColor = isset($readMoreStyles['bgColor']) ? $readMoreStyles['bgColor'] : [];
        $readMorePadding = isset($readMoreStyles['padding']) ? $readMoreStyles['padding'] : [];
        $readMoreMargin = isset($readMoreStyles['margin']) ? $readMoreStyles['margin'] : [];
        $readMoreDisplay = isset($readMoreStyles['display']) ? $readMoreStyles['display'] : [];

        $readMoreFontSize = isset($readMoreTypo['fontSize']) ? $readMoreTypo['fontSize'] : [];
        $readMoreFontFamily = isset($readMoreTypo['fontFamily']) ? $readMoreTypo['fontFamily'] : [];
        $readMoreLineHeight = isset($readMoreTypo['lineHeight']) ? $readMoreTypo['lineHeight'] : [];
        $readMoreLetterSpacing = isset($readMoreTypo['letterSpacing']) ? $readMoreTypo['letterSpacing'] : [];
        $readMoreFontWeight = isset($readMoreTypo['fontWeight']) ? $readMoreTypo['fontWeight'] : [];
        $readMoreTextDecoration = isset($readMoreTypo['textDecoration']) ? $readMoreTypo['textDecoration'] : [];
        $readMoreTextTransform = isset($readMoreTypo['textTransform']) ? $readMoreTypo['textTransform'] : [];


        $prefix = isset($attributes['prefix']) ? $attributes['prefix'] : '';
        $prefixOptions = isset($prefix['options']) ? $prefix['options'] : '';


        $prefixText = isset($prefixOptions['text']) ? $prefixOptions['text'] : '';
        $prefixClass = isset($prefixOptions['class']) ? $prefixOptions['class'] : 'prefix';

        $postfix = isset($attributes['postfix']) ? $attributes['postfix'] : '';
        $postfixOptions = isset($postfix['options']) ? $postfix['options'] : '';

        $postfixText = isset($postfixOptions['text']) ? $postfixOptions['text'] : '';
        $postfixClass = isset($postfixOptions['class']) ? $postfixOptions['class'] : 'postfix';


        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];



        // if (empty($wrapperTag)) {

        //     $postGridCss['.' . $blockId] = [
        //         'color' => $postExcerptColor,
        //         'background-color' => $postExcerptbgColor,
        //         'padding' => $postExcerptPadding,
        //         'margin' => $postExcerptMargin,
        //         'display' => $postExcerptDisplay,
        //         'text-align' => $wrapperTextAlign,

        //         'font-size' => $postExcerptFontSize,
        //         'font-family' => $postExcerptFontFamily,
        //         'font-weight' => $postExcerptFontWeight,
        //         'line-height' => $postExcerptLineHeight,
        //         'letter-spacing' => $postExcerptLetterSpacing,
        //         'text-decoration' => $postExcerptTextDecoration,
        //         'text-transform' => $postExcerptTextTransform,
        //     ];
        // } else {

        //     if ($postExcerptIsLink) {
        //         $postGridCss['.' . $blockId . ' a'] = [
        //             'color' => $postExcerptColor,
        //             'background-color' => $postExcerptbgColor,
        //             'padding' => $postExcerptPadding,
        //             'margin' => $postExcerptMargin,
        //             'display' => $postExcerptDisplay,

        //             'font-size' => $postExcerptFontSize,
        //             'font-family' => $postExcerptFontFamily,
        //             'font-weight' => $postExcerptFontWeight,
        //             'line-height' => $postExcerptLineHeight,
        //             'letter-spacing' => $postExcerptLetterSpacing,
        //             'text-decoration' => $postExcerptTextDecoration,
        //             'text-transform' => $postExcerptTextTransform,
        //         ];
        //     } else {


        //         if (!empty($postExcerptTag)) {

        //             $postGridCss['.' . $blockId . ' .excerpt-text'] = [
        //                 'color' => $postExcerptColor,
        //                 'background-color' => $postExcerptbgColor,
        //                 'padding' => $postExcerptPadding,
        //                 'margin' => $postExcerptMargin,
        //                 'display' => $postExcerptDisplay,
        //                 'text-align' => $wrapperTextAlign,

        //                 'font-size' => $postExcerptFontSize,
        //                 'font-family' => $postExcerptFontFamily,
        //                 'font-weight' => $postExcerptFontWeight,
        //                 'line-height' => $postExcerptLineHeight,
        //                 'letter-spacing' => $postExcerptLetterSpacing,
        //                 'text-decoration' => $postExcerptTextDecoration,
        //                 'text-transform' => $postExcerptTextTransform,
        //             ];
        //         } else {

        //             $postGridCss['.' . $blockId] = [
        //                 'color' => $postExcerptColor,
        //                 'background-color' => $postExcerptbgColor,
        //                 'padding' => $postExcerptPadding,
        //                 'margin' => $postExcerptMargin,
        //                 'display' => $postExcerptDisplay,
        //                 'text-align' => $wrapperTextAlign,

        //                 'font-size' => $postExcerptFontSize,
        //                 'font-family' => $postExcerptFontFamily,
        //                 'font-weight' => $postExcerptFontWeight,
        //                 'line-height' => $postExcerptLineHeight,
        //                 'letter-spacing' => $postExcerptLetterSpacing,
        //                 'text-decoration' => $postExcerptTextDecoration,
        //                 'text-transform' => $postExcerptTextTransform,
        //             ];
        //         }
        //     }
        // }









        $postGridCss['.' . $blockId . ' .readmore'] = [
            'color' => $readMoreColor,
            'background-color' => $readMorebgColor,
            'padding' => $readMorePadding,
            'margin' => $readMoreMargin,
            'display' => $readMoreDisplay,

            'font-size' => $readMoreFontSize,
            'font-family' => $readMoreFontFamily,
            'font-weight' => $readMoreFontWeight,
            'line-height' => $readMoreLineHeight,
            'letter-spacing' => $readMoreLetterSpacing,
            'text-decoration' => $readMoreTextDecoration,
            'text-transform' => $readMoreTextTransform,
        ];




        $linkAttrStr = '';



        if (!empty($postExcerptlinkAttr))
            foreach ($postExcerptlinkAttr as $attr) {

                if (!empty($attr['val']))
                    $linkAttrStr .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
            }


        $linkAttrStrReadmore = '';



        if (!empty($readMoreLinkAttr))
            foreach ($readMoreLinkAttr as $attr) {

                if (!empty($attr['val']))
                    $linkAttrStrReadmore .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
            }






        ob_start();


        if ($excerptSource == 'auto') {
            $post_excerpt = !empty($the_post->post_excerpt) ? $the_post->post_excerpt : '';
            $post_content = !empty($the_post->post_content) ? $the_post->post_content : '';
            $post_excerpt = !empty($post_excerpt) ? $post_excerpt : $post_content;
        } else if ($excerptSource == 'excerpt') {
            $post_excerpt = !empty($the_post->post_excerpt) ? $the_post->post_excerpt : '';
        } else if ($excerptSource == 'content') {
            $post_excerpt = !empty($the_post->post_content) ? $the_post->post_content : '';
        } else if ($excerptSource == 'meta') {

            $metaValue = get_post_meta($post_ID, $excerptSourceMeta, true);
            $post_excerpt = !empty($metaValue) ? $metaValue : $the_post->post_excerpt;
        }




        if ($removeBlocks) {
            if (function_exists('excerpt_remove_blocks')) {
                $post_excerpt = excerpt_remove_blocks($post_excerpt);
            }
        }



        if ($removeShortcodes) {
            if (function_exists('strip_shortcodes')) {
                $post_excerpt = strip_shortcodes($post_excerpt);
            }
        }




        if ($autoP) {
            if (function_exists('wpautop')) {
                $post_excerpt = wpautop($post_excerpt);
            }
        }




        if ($limitBy == 'character') {


            if (!$keepHtml) {
                if (function_exists('wp_strip_all_tags')) {
                    $post_excerpt = substr($post_excerpt, 0, $limitCount);
                }
            } else {
                $post_excerpt = force_balance_tags(html_entity_decode(wp_trim_words(htmlentities(($post_excerpt)), $limitCount, '')));
            }
        } else {


            if (!$keepHtml) {
                if (function_exists('wp_trim_words')) {
                    $post_excerpt = wp_trim_words($post_excerpt, $limitCount, '');
                }
            } else {
                $post_excerpt = force_balance_tags(html_entity_decode(wp_trim_words(htmlentities(($post_excerpt)), $limitCount, '')));
            }

            //$post_excerpt = wp_trim_words($post_excerpt, $limitCount, '');


        }






        if (!empty($wrapperTag)) :

?>
            <<?php echo esc_attr($wrapperTag); ?> class="<?php echo esc_attr($blockId); ?>">
                <?php if ($postExcerptIsLink) : ?>
                    <a href="<?php echo (!empty($postExcerptCustomUrl)) ? esc_url_raw($postExcerptCustomUrl) :  esc_url_raw($post_url); ?>" rel="<?php echo esc_attr($postExcerptRel); ?>" target="<?php echo esc_attr($postExcerptLinkTarget); ?>" <?php 
/* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
echo ($linkAttrStr); ?>>


                        <?php if ($postfixText) : ?>
                            <span class="<?php echo esc_attr($prefixClass); ?>"><?php echo esc_attr($prefixText); ?></span>
                        <?php endif; ?>

                        <?php echo  wp_kses_post($post_excerpt); ?>

                        <?php if ($postfixText) : ?>
                            <span class="<?php echo esc_attr($postfixClass); ?>"><?php echo wp_kses_post($postfixText); ?></span>
                        <?php endif; ?>

                    </a>
                <?php else : ?>


                    <?php if (!empty($postExcerptTag)) : ?>
                        <<?php echo esc_attr($postExcerptTag); ?> class="excerpt-text">
                            <?php if ($postfixText) : ?>
                                <span class="<?php echo esc_attr($prefixClass); ?>"><?php echo wp_kses_post($prefixText); ?></span>
                            <?php endif; ?>

                            <?php echo wp_kses_post($post_excerpt); ?>

                            <?php if ($postfixText) : ?>
                                <span class="<?php echo esc_attr($postfixClass); ?>"><?php echo wp_kses_post($postfixText); ?></span>
                            <?php endif; ?>

                        </<?php echo esc_attr($postExcerptTag); ?>>

                    <?php else : ?>
                        <?php if ($postfixText) : ?>
                            <span class="<?php echo esc_attr($prefixClass); ?>"><?php echo wp_kses_post($prefixText); ?></span>
                        <?php endif; ?>

                        <?php echo wp_kses_post($post_excerpt); ?>

                        <?php if ($postfixText) : ?>
                            <span class="<?php echo esc_attr($postfixClass); ?>"><?php echo wp_kses_post($postfixText); ?></span>
                        <?php endif; ?>


                    <?php endif; ?>



                <?php endif; ?>

                <a class='readmore' <?php 
/* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
echo ($linkAttrStrReadmore); ?> target="<?php echo esc_attr($readMoreLinkTarget); ?>" rel="<?php echo esc_attr($readMoreRel); ?>" href="<?php echo (!empty($readMoreCustomUrl)) ? esc_url_raw($readMoreCustomUrl) :  esc_url_raw($post_url); ?>"><?php echo wp_kses_post($readMoreText); ?></a>
            </<?php echo esc_attr($wrapperTag); ?>>
        <?php

        endif;

        if (empty($wrapperTag)) :

        ?>

            <?php if ($postExcerptIsLink) : ?>
                <a class="<?php echo esc_attr($blockId); ?>" href="<?php echo (!empty($postExcerptCustomUrl)) ? esc_url_raw($postExcerptCustomUrl) :  esc_url_raw($post_url); ?>" rel="<?php echo esc_attr($postExcerptRel); ?>" target="<?php echo esc_attr($postExcerptLinkTarget); ?>" <?php 
/* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
echo ($linkAttrStr); ?>>

                    <?php if ($postfixText) : ?>
                        <span class="<?php echo esc_attr($prefixClass); ?>"><?php echo wp_kses_post($prefixText); ?></span>
                    <?php endif; ?>

                    <?php echo wp_kses_post($post_excerpt); ?>
                    <?php if ($postfixText) : ?>
                        <span class="<?php echo esc_attr($postfixClass); ?>"><?php echo wp_kses_post($postfixText); ?></span>
                    <?php endif; ?>
                </a>
            <?php else : ?>
                <div class="<?php echo esc_attr($blockId); ?>">

                    <?php if (!empty($postExcerptTag)) : ?>
                        <<?php echo esc_attr($postExcerptTag); ?> class="excerpt-text">
                            <?php if ($postfixText) : ?>
                                <span class="<?php echo esc_attr($prefixClass); ?>"><?php echo wp_kses_post($prefixText); ?></span>
                            <?php endif; ?>

                            <?php echo wp_kses_post($post_excerpt); ?>

                            <?php if ($postfixText) : ?>
                                <span class="<?php echo esc_attr($postfixClass); ?>"><?php echo wp_kses_post($postfixText); ?></span>
                            <?php endif; ?>

                        </<?php echo esc_attr($postExcerptTag); ?>>

                    <?php else : ?>
                        <?php if ($postfixText) : ?>
                            <span class="<?php echo esc_attr($prefixClass); ?>"><?php echo wp_kses_post($prefixText); ?></span>
                        <?php endif; ?>

                        <?php echo wp_kses_post($post_excerpt); ?>

                        <?php if ($postfixText) : ?>
                            <span class="<?php echo esc_attr($postfixClass); ?>"><?php echo wp_kses_post($postfixText); ?></span>
                        <?php endif; ?>


                    <?php endif; ?>

                    <a class='readmore' <?php 
/* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
echo ($linkAttrStrReadmore); ?> target="<?php echo esc_attr($readMoreLinkTarget); ?>" rel="<?php echo esc_attr($readMoreRel); ?>" href="<?php echo (!empty($readMoreCustomUrl)) ? esc_url_raw($readMoreCustomUrl) :  esc_url_raw($post_url); ?>"><?php echo wp_kses_post($readMoreText); ?></a>

                </div>

            <?php endif; ?>




        <?php

        endif;

        ?>









<?php return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockPostExcerpt();
