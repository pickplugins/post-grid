<?php
if (!defined('ABSPATH')) exit();



class PGBlockPostCategories
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/post-categories/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/post-categories/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/post-categories', array(
            //'editor_script' => 'editor_script',
            // 'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            //'style' => 'front_style',
            'render_callback' => array($this, 'theHTML'),
            'attributes' =>  [
                "wrapper" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "class" => "",
                            "tag" => "div",
                        ],
                        "styles" => [
                            "display" => [],

                            "color" => [],

                            "padding" => [],
                            "margin" => []
                        ]
                    ]
                ],
                "items" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "prefix" => "",
                            "postfix" => "",

                            "maxCount" => 99,
                            "postCount" => false,
                            "class" => "item inline-block",
                            "linkTo" => "termUrl",
                            "linkToAuthorMeta" => "",
                            "linkToCustomMeta" => "",
                            "customUrl" => "",

                            "linkTarget" => "",
                            "linkAttr" => []
                        ],
                        "styles" => [

                            "display" => [],
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
                "icon" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "library" => "fontAwesome",
                            "srcType" => "class",
                            "iconSrc" => "",
                            "position" => "beforeFronttext",
                            "class" => "icon"
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
                "termTitle" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "class" => "inline-block",
                            "text" => ", "
                        ],
                        "styles" => [

                            "color" => [],

                            "padding" => [],
                            "margin" => []
                        ]
                    ]
                ],
                "separator" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "class" => "inline-block",
                            "text" => ", "
                        ],
                        "styles" => [

                            "color" => [],

                            "padding" => [],
                            "margin" => []
                        ]
                    ]
                ],
                "frontText" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "text" => "Categories: ",
                            "class" => "inline-block"
                        ],
                        "styles" => [

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
                "customCss" => [
                    "type" => "string",
                    "default" => ""
                ],
                "blockCssY" => [
                    "type" => "object",
                    "default" => [
                        "items" => []
                    ]
                ],
                "blockId" => [
                    "type" => "string",
                    "default" => ""
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


        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'h2';



        $items = isset($attributes['items']) ? $attributes['items'] : [];
        $itemsOptions = isset($items['options']) ? $items['options'] : [];
        $itemsLinkTo = isset($itemsOptions['linkTo']) ? $itemsOptions['linkTo'] : '';
        $itemsLinkToAuthorMeta = isset($itemsOptions['linkToAuthorMeta']) ? $itemsOptions['linkToAuthorMeta'] : '';
        $itemsCustomUrl = isset($itemsOptions['customUrl']) ? $itemsOptions['customUrl'] : '';
        $itemsLinkToCustomMeta = isset($itemsOptions['linkToCustomMeta']) ? $itemsOptions['linkToCustomMeta'] : '';


        $itemsPrefix = isset($itemsOptions['prefix']) ? $itemsOptions['prefix'] : '';
        $itemsPostfix = isset($itemsOptions['postfix']) ? $itemsOptions['postfix'] : '';
        $itemsMaxCount = isset($itemsOptions['maxCount']) ? (int) $itemsOptions['maxCount'] : 99;
        $itemsPostCount = isset($itemsOptions['postCount']) ? $itemsOptions['postCount'] : true;
        $itemsClass = isset($itemsOptions['class']) ? $itemsOptions['class'] : '';
        $itemsLinkTarget = isset($itemsOptions['linkTarget']) ? $itemsOptions['linkTarget'] : '';
        $itemsLinkAttr = isset($itemsOptions['linkAttr']) ? $itemsOptions['linkAttr'] : [];

        $frontText = isset($attributes['frontText']) ? $attributes['frontText'] : [];
        $frontTextOptions = isset($frontText['options']) ? $frontText['options'] : [];

        $frontTexttext = isset($frontTextOptions['text']) ? $frontTextOptions['text'] : __('Categories:', 'post-grid');
        $frontTextClass = isset($frontTextOptions['class']) ? $frontTextOptions['class'] : '';


        $icon = isset($attributes['icon']) ? $attributes['icon'] : [];
        $iconOptions = isset($icon['options']) ? $icon['options'] : [];

        $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
        $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
        $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
        $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
        $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';


        $separator = isset($attributes['separator']) ? $attributes['separator'] : [];
        $separatorOptions = isset($separator['options']) ? $separator['options'] : [];

        $separatorClass = isset($separatorOptions['class']) ? $separatorOptions['class'] : '';
        $separatorText = isset($separatorOptions['text']) ? $separatorOptions['text'] : '';



        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';




        $postGridCustomCss .= $customCss;
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];



        $fontIconHtml = !empty($iconSrc) ? '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>' : '';



        $linkAttrStr = '';



        if (!empty($itemsLinkAttr))
            foreach ($itemsLinkAttr as $attr) {

                if (!empty($attr['val']))
                    $linkAttrStr .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
            }

        $taxonomy = 'category';

        $terms = get_the_terms($post_ID, $taxonomy);




        $termsCount = (is_array($terms)) ? count($terms) : 0;

        $maxCount = ($termsCount >  $itemsMaxCount) ? $itemsMaxCount : $termsCount;
        $maxCount = (empty($maxCount)) ? $termsCount : $maxCount;

        ob_start();


        if ($iconLibrary == 'fontAwesome') {
            wp_enqueue_style('fontawesome-icons');
        } else if ($iconLibrary == 'iconFont') {
            wp_enqueue_style('icofont-icons');
        } else if ($iconLibrary == 'bootstrap') {
            wp_enqueue_style('bootstrap-icons');
        }






?>


        <<?php echo esc_attr($wrapperTag); ?> class="<?php echo $blockId; ?>">

            <?php if ($iconPosition == 'beforeFronttext') : ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>

            <?php if (!empty($frontTexttext)) : ?>
                <span class='frontText '><?php echo $frontTexttext; ?></span>
            <?php endif; ?>


            <?php if ($iconPosition == 'afterFronttext') : ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>


            <?php if ($iconPosition == 'beforeItems') : ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>

            <?php

            $i = 1;
            if (!empty($terms))
                foreach ($terms as $term) {

                    $term_id = $term->term_id;
                    $term_post_count = $term->count;



                    if ($itemsLinkTo == 'postUrl') {

                        $linkUrl = get_permalink($post_ID);
                    } else if ($itemsLinkTo == 'termUrl') {
                        $linkUrl = get_term_link($term_id);
                    } else if ($itemsLinkTo == 'customField') {
                        $linkUrl = get_post_meta($post_ID, $itemsLinkToCustomMeta, true);
                    } else if ($itemsLinkTo == 'authorUrl') {
                        $author_id = get_post_field('post_author', $post_ID);
                        $user = get_user_by('ID', $author_id);
                        $linkUrl = $user->user_url;
                    } else if ($itemsLinkTo == 'authorLink') {
                        $author_id = get_post_field('post_author', $post_ID);
                        $linkUrl = get_author_posts_url($author_id);
                    } else if ($itemsLinkTo == 'homeUrl') {
                        $linkUrl = get_bloginfo('url');
                    } else if ($itemsLinkTo == 'custom') {
                        $linkUrl = $itemsCustomUrl;
                    }


                    if ($i > $maxCount) break;

                    /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
            ?>

                <?php if (!empty($itemsLinkTo)) : ?>

                    <a href="<?php echo esc_url_raw($linkUrl); ?>" <?php echo ($linkAttrStr); ?> target="<?php echo esc_attr($itemsLinkTarget); ?>" class="<?php echo esc_attr($itemsClass); ?>">

                        <?php if ($iconPosition == 'beforeItem') : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>

                        <?php if (!empty($itemsPrefix)) : ?>
                            <span class='prefix'><?php echo wp_kses_post($itemsPrefix); ?></span>

                        <?php endif; ?>

                        <span class='termTitle'><?php echo wp_kses_post($term->name); ?></span>
                        <?php if ($itemsPostCount) : ?>
                            <span class='postCount'>(<?php echo wp_kses_post($term_post_count); ?>)</span>
                        <?php endif; ?>

                        <?php if (!empty($itemsPostfix)) : ?>
                            <span class='postfix'><?php echo wp_kses_post($itemsPostfix); ?></span>

                        <?php endif; ?>

                        <?php if ($iconPosition == 'afterItem') : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>
                    </a>
                <?php else : ?>

                    <span <?php echo ($linkAttrStr); ?> class="<?php echo esc_attr($itemsClass); ?>">

                        <?php if ($iconPosition == 'beforeItem') : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>

                        <?php if (!empty($itemsPrefix)) : ?>
                            <span class='prefix'><?php echo wp_kses_post($itemsPrefix); ?></span>

                        <?php endif; ?>

                        <span class='termTitle'><?php echo wp_kses_post($term->name); ?></span>
                        <?php if ($itemsPostCount) : ?>
                            <span class='postCount'>(<?php echo wp_kses_post($term_post_count); ?>)</span>
                        <?php endif; ?>

                        <?php if (!empty($itemsPostfix)) : ?>
                            <span class='postfix'><?php echo wp_kses_post($itemsPostfix); ?></span>

                        <?php endif; ?>

                        <?php if ($iconPosition == 'afterItem') : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>
                    </span>
                <?php endif; ?>


                <?php if ($maxCount > $i) : ?>
                    <span class='separator'><?php echo esc_html($separatorText); ?></span>
                <?php endif; ?>
            <?php
                    $i++;
                }

            ?>

            <?php if ($iconPosition == 'afterItems') : ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>


        </<?php echo esc_attr($wrapperTag); ?>>











<?php return ob_get_clean();
    }
}

$PGBlockPostCategories = new PGBlockPostCategories();
