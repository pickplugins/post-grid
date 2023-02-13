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
                            "class" => "inline-block"
                        ],
                        "styles" => [
                            "display" => [],

                            "color" => [],
                            "bgColor" => [],
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
                            "linkTarget" => "",
                            "linkAttr" => []
                        ],
                        "styles" => [

                            "display" => [],
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
                            "iconSrc" => "",
                            "position" => "beforeFronttext",
                            "class" => "icon"
                        ],
                        "styles" => [
                            "color" => [],
                            "bgColor" => [],
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
                            "bgColor" => [],
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
                            "bgColor" => [],
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

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];


        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
        $wrapperStyles = isset($wrapper['styles']) ? $wrapper['styles'] : [];

        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'h2';



        $items = isset($attributes['items']) ? $attributes['items'] : [];
        $itemsOptions = isset($items['options']) ? $items['options'] : [];
        $itemsStyles = isset($items['styles']) ? $items['styles'] : [];
        $itemsTypo = isset($items['typo']) ? $items['typo'] : [];

        $itemsPrefix = isset($itemsOptions['prefix']) ? $itemsOptions['prefix'] : '';
        $itemsPostfix = isset($itemsOptions['postfix']) ? $itemsOptions['postfix'] : '';
        $itemsMaxCount = isset($itemsOptions['maxCount']) ? (int) $itemsOptions['maxCount'] : 99;
        $itemsPostCount = isset($itemsOptions['postCount']) ? $itemsOptions['postCount'] : true;
        $itemsClass = isset($itemsOptions['class']) ? $itemsOptions['class'] : '';
        $itemsLinkTarget = isset($itemsOptions['linkTarget']) ? $itemsOptions['linkTarget'] : '';
        $itemsLinkAttr = isset($itemsOptions['linkAttr']) ? $itemsOptions['linkAttr'] : [];

        $frontText = isset($attributes['frontText']) ? $attributes['frontText'] : [];
        $frontTextOptions = isset($frontText['options']) ? $frontText['options'] : [];
        $frontTextStyles = isset($frontText['styles']) ? $frontText['styles'] : [];
        $frontTextTypo = isset($frontText['typo']) ? $frontText['typo'] : [];

        $frontTexttext = isset($frontTextOptions['text']) ? $frontTextOptions['text'] : __('Categories:', 'post-grid');
        $frontTextClass = isset($frontTextOptions['class']) ? $frontTextOptions['class'] : '';


        $icon = isset($attributes['icon']) ? $attributes['icon'] : [];
        $iconOptions = isset($icon['options']) ? $icon['options'] : [];
        $iconStyles = isset($icon['styles']) ? $icon['styles'] : [];

        $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
        $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
        $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
        $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
        $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';


        $separator = isset($attributes['separator']) ? $attributes['separator'] : [];
        $separatorOptions = isset($separator['options']) ? $separator['options'] : [];
        $separatorStyles = isset($separator['styles']) ? $separator['styles'] : [];

        $separatorClass = isset($separatorOptions['class']) ? $separatorOptions['class'] : '';
        $separatorText = isset($separatorOptions['text']) ? $separatorOptions['text'] : '';



        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';




        $postGridCustomCss .= $customCss;
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];



        $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';



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


        <div class="<?php echo $blockId; ?>">

            <?php if ($iconPosition == 'beforeFronttext') : ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>

            <span class='frontText '><?php echo $frontTexttext; ?></span>

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

                    $link = get_term_link($term_id);

                    if ($i > $maxCount) break;

            ?>
                <a href="<?php echo esc_url_raw($link); ?>" <?php
                                                            /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
                                                            echo ($linkAttrStr); ?> target="<?php echo esc_attr($itemsLinkTarget); ?>" class="<?php echo esc_attr($itemsClass); ?>">

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


        </div>











<?php return ob_get_clean();
    }
}

$PGBlockPostCategories = new PGBlockPostCategories();
