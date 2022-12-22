<?php
if (!defined('ABSPATH')) exit();



class PGBlocPostDate
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/post-date/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/post-date/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/post-date', array(
            // 'editor_script' => 'editor_script',
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
                            "textAlign" => [],
                            "color" => [],
                            "bgColor" => [],
                            "padding" => [],
                            "margin" => [],
                            "display" => []
                        ]
                    ]
                ],
                "postDate" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "tag" => "div",
                            "dateFormat" => "Y-m-d",
                            "linkTo" => "",
                            "linkToUrl" => "",
                            "linkToMetaKey" => "",
                            "linkTarget" => "_blank",
                            "linkAttr" => [],
                            "customUrl" => "",
                            "class" => ""
                        ],
                        "styles" => [
                            "textAlign" => [],
                            "display" => [],
                            "width" => [],
                            "color" => [],
                            "bgColor" => [],
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
                "icon" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "library" => "fontAwesome",
                            "srcType" => "class",
                            "iconSrc" => "far fa-calendar-alt",
                            "position" => "beforePostDate",
                            "class" => "postdate-icon"
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
                            "class" => "prefix"
                        ],
                        "styles" => [
                            "color" => [],
                            "bgColor" => []
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



        $post_ID = $block->context['postId'];
        $post_url = get_the_permalink($post_ID);
        $the_post = get_post($post_ID);
        $post_excerpt = '';
        $post_date = $the_post->post_date;

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';

        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';

        $postDate = isset($attributes['postDate']) ? $attributes['postDate'] : [];
        $postDateOptions = isset($postDate['options']) ? $postDate['options'] : [];
        $postDateStyles = isset($postDate['styles']) ? $postDate['styles'] : [];
        $postDateTypo = isset($postDate['typo']) ? $postDate['typo'] : [];


        $postDateLinkTarget = isset($postDateOptions['linkTarget']) ? $postDateOptions['linkTarget'] : '_blank';
        $postDateCustomUrl = isset($postDateOptions['customUrl']) ? $postDateOptions['customUrl'] : '';
        $postDateLinkAttr = isset($postDateOptions['linkAttr']) ? $postDateOptions['linkAttr'] : [];
        $postDateRel = isset($postDateOptions['rel']) ? $postDateOptions['rel'] : '';
        $dateFormat = isset($postDateOptions['dateFormat']) ? $postDateOptions['dateFormat'] : 'dateFormat';
        $postDateLinkTo = isset($postDateOptions['linkTo']) ? $postDateOptions['linkTo'] : '';
        $postDateLinkToMetaKey = isset($postDateOptions['linkToMetaKey']) ? $postDateOptions['linkToMetaKey'] : '';
        $customUrl = isset($featuredImageOptions['customUrl']) ? $featuredImageOptions['customUrl'] : '';


        $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
        $iconOptions = isset($icon['options']) ? $icon['options'] : [];
        $iconStyles = isset($icon['styles']) ? $icon['styles'] : [];
        $iconTypo = isset($icon['typo']) ? $icon['typo'] : [];

        $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
        $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
        $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
        $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
        $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';


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


        $formatedPostDate = date($dateFormat, strtotime($post_date));



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


        $linkAttrStrpostDate = '';



        if (!empty($postDateLinkAttr))
            foreach ($postDateLinkAttr as $attr) {

                if (!empty($attr['val']))
                    $linkAttrStrpostDate .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
            }


        $postGridCustomCss .= $customCss;


        $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';

        $linkUrl = '';

        if ($postDateLinkTo == 'postUrl') {

            $linkUrl = get_permalink($post_ID);
        } else if ($postDateLinkTo == 'customField') {

            $linkUrl = get_post_meta($post_ID, $postDateLinkToMetaKey, true);
        } else if ($postDateLinkTo == 'authorUrl') {
            $author_id = get_post_field('post_author', $post_ID);
            $user = get_user_by('ID', $author_id);
            $linkUrl = $user->user_url;
        } else if ($postDateLinkTo == 'authorLink') {
            $author_id = get_post_field('post_author', $post_ID);
            $linkUrl = get_the_author_link($author_id);
        } else if ($postDateLinkTo == 'homeUrl') {
            $linkUrl = bloginfo('home');
        } else if ($postDateLinkTo == 'custom') {
            $linkUrl = $customUrl;
        }







        ob_start();


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

                <?php if (!empty($postDateLinkTo)) : ?>
                    <a class='postDate' <?php echo esc_attr($linkAttrStrpostDate); ?> target="<?php echo esc_attr($postDateLinkTarget); ?>" rel="<?php echo esc_attr($postDateRel); ?>" href="<?php echo (!empty($linkUrl)) ? esc_url_raw($linkUrl) :  esc_url_raw($post_url); ?>">
                        <?php if ($iconPosition == 'beforePostDate') : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>
                        <?php echo wp_kses_post($formatedPostDate); ?>
                        <?php if ($iconPosition == 'afterPostDate') : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>
                    </a>

                <?php else : ?>

                    <span class='postDate' <?php echo esc_attr($linkAttrStrpostDate); ?>>
                        <?php if ($iconPosition == 'beforePostDate') : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>
                        <?php echo wp_kses_post($formatedPostDate); ?>
                        <?php if ($iconPosition == 'afterPostDate') : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>
                    </span>


                <?php endif; ?>






                <?php if ($iconPosition == 'beforePostfix') : ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>
                <?php if ($postfixText) : ?>
                    <span class="<?php echo $postfixClass; ?>"><?php echo $postfixText; ?></span>
                <?php endif; ?>

                <?php if ($iconPosition == 'afterPostfix') : ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>

            </<?php echo esc_attr($wrapperTag); ?>>
        <?php

        endif;

        if (empty($wrapperTag)) :

        ?>
            <?php if ($iconPosition == 'beforePrefix') : ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
            <?php if ($prefixText) : ?>
                <span class="<?php echo esc_attr($prefixClass); ?>"><?php echo $prefixText; ?></span>
            <?php endif; ?>

            <?php if ($iconPosition == 'afterPrefix') : ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>

            <?php if (!empty($postDateLinkTo)) : ?>

                <a class='postDate' <?php echo esc_attr($linkAttrStrpostDate); ?> target="<?php echo esc_attr($postDateLinkTarget); ?>" rel="<?php echo esc_attr($postDateRel); ?>" href="<?php echo (!empty($linkUrl)) ? esc_url_raw($linkUrl) :  esc_url_raw($post_url); ?>">
                    <?php if ($iconPosition == 'beforePostDate') : ?>
                        <?php echo wp_kses_post($fontIconHtml); ?>
                    <?php endif; ?>
                    <?php echo wp_kses_post($formatedPostDate); ?>C
                    <?php if ($iconPosition == 'afterPostDate') : ?>
                        <?php echo wp_kses_post($fontIconHtml); ?>
                    <?php endif; ?>
                </a>
            <?php else : ?>
                <?php if ($iconPosition == 'beforePostDate') : ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>
                <span class='postDate'><?php echo wp_kses_post($formatedPostDate); ?></span>
                <?php if ($iconPosition == 'afterPostDate') : ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>
            <?php endif; ?>



            <?php if ($iconPosition == 'beforePostfix') : ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
            <?php if ($postfixText) : ?>
                <span class="<?php echo $postfixClass; ?>"><?php echo $postfixText; ?></span>
            <?php endif; ?>
            <?php if ($iconPosition == 'afterPostfix') : ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
        <?php

        endif;

        ?>









<?php return ob_get_clean();
    }
}

$PGBlocPostDate = new PGBlocPostDate();
