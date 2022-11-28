<?php
if (!defined('ABSPATH')) exit();



class PGBlockTermsList
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/terms-list/index.css');
        wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/terms-list/index.js', array('wp-blocks', 'wp-element'));
        wp_register_script('pgtermslist_front_script', post_grid_plugin_url . 'src/blocks/terms-list/front-scripts.js', []);


        register_block_type('post-grid/terms-list', array(
            'editor_script' => 'editor_script',
            'editor_style' => 'editor_style',
            'script' => 'pgtermslist_front_script',

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
                            "textAlign" => [],
                            "color" => [],
                            "bgColor" => [],
                            "padding" => [],
                            "margin" => []
                        ]
                    ]
                ],
                "taxonomies" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "taxName" => ""
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
                            "textAlign" => [],
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
                "separator" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "class" => "inline-block",
                            "text" => ", "
                        ],
                        "styles" => [
                            "textAlign" => [],
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
                            "text" => "Tags: ",
                            "class" => "inline-block"
                        ],
                        "styles" => [
                            "textAlign" => [],
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

        $post_ID = $block->context['postId'];
        $post_url = get_the_permalink($post_ID);

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];



        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
        $wrapperStyles = isset($wrapper['styles']) ? $wrapper['styles'] : [];

        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'h2';

        $wrapperTextAlign = isset($wrapperStyles['textAlign']) ? $wrapperStyles['textAlign'] : '';

        $taxonomies = isset($attributes['taxonomies']) ? $attributes['taxonomies'] : [];
        $taxonomiesOptions = isset($taxonomies['options']) ? $taxonomies['options'] : [];

        $taxName = isset($taxonomiesOptions['taxName']) ? $taxonomiesOptions['taxName'] : '';


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


        $separator = isset($attributes['separator']) ? $attributes['separator'] : [];
        $separatorOptions = isset($separator['options']) ? $separator['options'] : [];
        $separatorStyles = isset($separator['styles']) ? $separator['styles'] : [];

        $separatorClass = isset($separatorOptions['class']) ? $separatorOptions['class'] : '';
        $separatorText = isset($separatorOptions['text']) ? $separatorOptions['text'] : '';



        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';


        $postGridCustomCss .= $customCss;

        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];





        $linkAttrStr = '';



        if (!empty($itemsLinkAttr))
            foreach ($itemsLinkAttr as $attr) {

                if (!empty($attr['val']))
                    $linkAttrStr .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
            }

        $taxonomy = $taxName;



        ob_start();

        function sort_terms_hierarchicaly(array $cats, $parentId = 0)
        {
            $into = [];
            foreach ($cats as $i => $cat) {
                if ($cat->parent == $parentId) {
                    $cat->children = sort_terms_hierarchicaly($cats, $cat->term_id);
                    $into[$cat->term_id] = $cat;
                }
            }
            return $into;
        }

        $terms = get_terms('docs-category', array('hide_empty' => false));

        $sorted_terms = sort_terms_hierarchicaly($terms);



        function html_terms_hierarchicaly($sorted_terms)
        {
            $into = [];


            ob_start();



            foreach ($sorted_terms as $i => $cat) {

                if (!empty($cat->children)) {
?>
                    <li class="has-child">

                        <div class="group-lable" wrapId="<?php echo $cat->slug; ?>">

                            <?php echo $cat->name; ?>
                            <span class="group-icon group-icon-active">
                                <i class="fas fa-angle-up"></i>
                            </span>

                            <span class="group-icon group-icon-inactive">
                                <i class="fas fa-angle-down"></i>
                            </span>
                        </div>

                        <ul class="child-wrap <?php echo $cat->slug; ?>" id="child-wrap-<?php echo $cat->slug; ?>">
                            <?php echo html_terms_hierarchicaly($cat->children); ?>
                        </ul>
                    </li>

                <?php

                } else {

                ?>
                    <li>
                        <div class="group-lable" wrapId="<?php echo $cat->slug; ?>"><?php echo $cat->name; ?></div>


                    </li>
        <?php

                }
            }




            return ob_get_clean();
        }




        wp_enqueue_style('fontawesome-icons');



        ?>
        <div class="<?php echo $blockId; ?>">

            <ul class="main-wrap">
                <?php
                echo html_terms_hierarchicaly($sorted_terms);
                ?>
            </ul>


        </div>

        <style>
            .child-wrap {
                padding-left: 10px;
                margin: 0;
                display: none;
            }

            .child-wrap li {
                margin: 0;
                list-style: none;
            }

            .main-wrap li {
                margin: 0;
                list-style: none;
            }


            .group-lable {
                padding: 5px 10px;
                background: #ddd;
                margin: 0 0 3px 0;
                cursor: pointer;
            }

            .group-lable.active {
                padding: 5px 10px;
                background: #666;
                margin: 0 0 3px 0;
                cursor: pointer;
            }

            .group-icon {
                float: right;
            }

            .group-icon-active {
                display: inline-block;

            }

            .group-icon-inactive {
                display: none;
            }

            .group-lable.active .group-icon-inactive {
                display: inline-block;

            }

            .group-lable.active .group-icon-active {
                display: none;

            }
        </style>









<?php return ob_get_clean();
    }
}

$PGBlockTermsList = new PGBlockTermsList();
