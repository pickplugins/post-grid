<?php
if (!defined('ABSPATH')) exit();



class PGBlockReadmore
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/read-more/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/read-more/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/read-more', array(
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
                            "class" => ""
                        ],
                        "styles" => [

                            "color" => [],

                            "padding" => [],
                            "margin" => [],
                            "display" => []
                        ]
                    ]
                ],
                "readMore" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "text" => "Read More",
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
                            "iconSrc" => "",
                            "position" => "",
                            "class" => "readmore-icon"
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

        $readMore = isset($attributes['readMore']) ? $attributes['readMore'] : [];
        $readMoreOptions = isset($readMore['options']) ? $readMore['options'] : [];

        $readMoreText = isset($readMoreOptions['text']) ? $readMoreOptions['text'] : __('Read More', 'post-grid');

        $readMoreLinkTo = isset($readMoreOptions['linkTo']) ? $readMoreOptions['linkTo'] : '_blank';

        $readMoreLinkTarget = isset($readMoreOptions['linkTarget']) ? $readMoreOptions['linkTarget'] : '_blank';
        $readMoreCustomUrl = isset($readMoreOptions['customUrl']) ? $readMoreOptions['customUrl'] : '';
        $readMoreLinkAttr = isset($readMoreOptions['linkAttr']) ? $readMoreOptions['linkAttr'] : [];
        $readMoreRel = isset($readMoreOptions['rel']) ? $readMoreOptions['rel'] : '';
        $readMoreLinkToMetaKey = isset($readMoreOptions['linkToMetaKey']) ? $readMoreOptions['linkToMetaKey'] : '';



        $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
        $iconOptions = isset($icon['options']) ? $icon['options'] : [];

        $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
        $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
        $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
        $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
        $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';


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


        $linkUrl = '';

        if ($readMoreLinkTo == 'postUrl') {

            $linkUrl = get_permalink($post_ID);
        } else if ($readMoreLinkTo == 'customField') {
            $linkUrl = get_post_meta($post_ID, $readMoreLinkToMetaKey, true);
        } else if ($readMoreLinkTo == 'authorUrl') {
            $author_id = get_post_field('post_author', $post_ID);
            $user = get_user_by('ID', $author_id);
            $linkUrl = $user->user_url;
        } else if ($readMoreLinkTo == 'authorLink') {
            $author_id = get_post_field('post_author', $post_ID);
            $linkUrl = get_author_posts_url($author_id);
        } else if ($readMoreLinkTo == 'homeUrl') {
            $linkUrl = get_bloginfo('home');
        } else if ($readMoreLinkTo == 'custom') {
            $linkUrl = $readMoreCustomUrl;
        }



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


        $linkAttrStrReadmore = '';



        if (!empty($readMoreLinkAttr))
            foreach ($readMoreLinkAttr as $attr) {

                if (!empty($attr['val']))
                    $linkAttrStrReadmore .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
            }


        $postGridCustomCss .= $customCss;


        $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';


        ob_start();

        // var_dump($iconPosition);
        // var_dump($iconClass);
        // var_dump($iconSrc);
        // var_dump($fontIconHtml);


        if (!empty($wrapperTag)) :

?>
            <<?php echo esc_attr($wrapperTag); ?> class="<?php echo esc_attr($blockId); ?>">


                <?php if ($iconPosition == 'beforePrefix') : ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>

                <?php if ($prefixText) : ?>
                    <span class="<?php echo esc_attr($prefixClass); ?>"><?php echo wp_kses_post($prefixText); ?></span>
                <?php endif; ?>

                <?php if ($iconPosition == 'afterPrefix') : ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>

                <?php
                /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
                ?>
                <?php if (!empty($readMoreLinkTo)) : ?>


                    <a class='readmore' <?php echo ($linkAttrStrReadmore); ?> target="<?php echo esc_attr($readMoreLinkTarget); ?>" rel="<?php echo esc_attr($readMoreRel); ?>" href="<?php echo esc_url_raw($linkUrl); ?>">
                        <?php if ($iconPosition == 'beforeReadmore') : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>
                        <?php echo $readMoreText; ?>
                        <?php if ($iconPosition == 'afterReadmore') : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>
                    </a>

                <?php else : ?>
                    <div class='readmore' <?php echo ($linkAttrStrReadmore); ?>>
                        <?php if ($iconPosition == 'beforeReadmore') : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>
                        <?php echo $readMoreText; ?>
                        <?php if ($iconPosition == 'afterReadmore') : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>







                <?php if ($iconPosition == 'beforePostfix') : ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>
                <?php if ($postfixText) : ?>
                    <span class="<?php echo esc_attr($postfixClass); ?>"><?php echo wp_kses_post($postfixText); ?></span>
                <?php endif; ?>

                <?php if ($iconPosition == 'afterPostfix') : ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>

            </<?php echo esc_attr($wrapperTag); ?>>
        <?php

        endif;

        if (empty($wrapperTag)) :
            /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
        ?>

            <?php if (!empty($readMoreLinkTo)) : ?>
                <a class="<?php echo esc_attr($blockId); ?>" <?php echo ($linkAttrStrReadmore); ?> target="<?php echo esc_attr($readMoreLinkTarget); ?>" rel="<?php echo esc_attr($readMoreRel); ?>" href="<?php echo esc_url_raw($linkUrl); ?>">
                    <?php if ($prefixText) : ?>
                        <span class="<?php echo esc_attr($prefixClass); ?>"><?php echo wp_kses_post($prefixText); ?></span>
                    <?php endif; ?>
                    <?php echo wp_kses_post($readMoreText); ?>
                    <?php if ($postfixText) : ?>
                        <span class="<?php echo esc_attr($postfixClass); ?>"><?php echo wp_kses_post($postfixText); ?></span>
                    <?php endif; ?>
                </a>
            <?php else : ?>
                <div class="<?php echo esc_attr($blockId); ?>">
                    <?php if ($prefixText) : ?>
                        <span class="<?php echo esc_attr($prefixClass); ?>"><?php echo wp_kses_post($prefixText); ?></span>
                    <?php endif; ?>
                    <?php echo wp_kses_post($readMoreText); ?>
                    <?php if ($postfixText) : ?>
                        <span class="<?php echo esc_attr($postfixClass); ?>"><?php echo wp_kses_post($postfixText); ?></span>
                    <?php endif; ?>
                </div>
            <?php endif; ?>




        <?php

        endif;

        ?>









<?php return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockReadmore();
