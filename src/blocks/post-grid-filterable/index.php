<?php
if (!defined('ABSPATH'))
    exit();



class PGBlockPostGridFilterable
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
    }

    function front_scripts($attributes)
    {
        wp_register_script('pgpostgridfilterable_front_script', post_grid_plugin_url . 'src/blocks/post-grid-filterable/front-scripts.js', []);
        wp_register_script('pgpostgridfilterable_mixitup', post_grid_plugin_url . 'src/blocks/post-grid-filterable/mixitup.js', []);
        wp_register_script('pgpostgridfilterable_mixitup_multifilter', post_grid_plugin_url . 'src/blocks/post-grid-filterable/mixitup-multifilter.js', []);
        wp_register_script('pgpostgridfilterable_mixitup_pagination', post_grid_plugin_url . 'src/blocks/post-grid-filterable/mixitup-pagination.js', []);
        wp_register_style('pgpostgrid_front_style', post_grid_plugin_url . 'src/blocks/post-grid-filterable/index.css');

        if (has_block('post-grid/post-grid-filterable')) {

            wp_enqueue_style('font-awesome-5');
            wp_enqueue_script('pgpostgridfilterable_front_script');
            wp_enqueue_script('pgpostgridfilterable_mixitup');
            wp_enqueue_script('pgpostgridfilterable_mixitup_multifilter');
            wp_enqueue_script('pgpostgridfilterable_mixitup_pagination');
        }
    }



    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('pgpostgrid_editor_style', post_grid_plugin_url . 'src/blocks/post-grid-filterable/index.css');
        //wp_register_script('pgpostgrid_editor_script', post_grid_plugin_url . 'src/blocks/post-grid-filterable/index.js', array('wp-blocks', 'wp-element'));



        //wp_register_script('anime.min', post_grid_plugin_url . 'assets/global/js/anime.min.js', []);



        register_block_type('post-grid/post-grid-filterable', array(
            //'editor_script' => 'pgpostgrid_editor_script',
            //'style' => 'pgpostgrid_front_style',
            //'editor_style' => 'pgpostgrid_editor_style',
            //'script' => 'pgpostgridfilterable_front_script',
            'uses_context' => ["postId", "loopIndex", "postType", "queryId"],
            'render_callback' => array($this, 'theHTML'),
            'attributes' => [
                "lazyLoad" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "class" => "lazyLoad",
                            "enable" => "no",
                            "srcUrl" => "",
                            "srcId" => "",
                            "icon" => [
                                "library" => "",
                                "srcType" => "class",
                                "iconSrc" => ""
                            ]
                        ],
                        "styles" => [

                            "color" => [],

                            "padding" => [],
                            "margin" => []
                        ]
                    ]
                ],
                "search" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "class" => "search",
                            "enable" => "no",
                            "type" => "",
                            "placeholder" => "",
                            "icon" => "",
                            "busyIcon" => ""
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
                "container" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "class" => ""
                        ],
                        "styles" => [

                            "color" => [],

                            "backgroundImage" => [],
                            "padding" => [],
                            "margin" => []
                        ]
                    ]
                ],
                "itemsWrap" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "class" => "items-loop"
                        ],
                        "styles" => [

                            "color" => [],

                            "wordBreak" => [],
                            "padding" => [],
                            "margin" => []
                        ]
                    ]
                ],
                "itemWrap" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "class" => "item"
                        ],
                        "styles" => [

                            "color" => [],

                            "wordBreak" => [],
                            "padding" => [],
                            "fontSize" => [],
                            "lineHeight" => [],
                            "letterSpacing" => [],
                            "fontFamily" => [],
                            "fontWeight" => [],
                            "textDecoration" => [],
                            "textTransform" => []
                        ],
                        "hoverStyles" => [
                            "color" => [],
                            "backgroundColor" => []
                        ]
                    ]
                ],
                "filterable" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "filters" => [],
                            "allText" => "All",
                            "showSort" => "",
                            "showRandom" => "",
                            "showAll" => "yes",
                            "filterToggle" => "no",

                            "perPage" => 6,

                            "showClear" => "",
                            "activeFilter" => ""
                        ],
                        "styles" => [

                            "color" => [],

                            "wordBreak" => [],
                            "padding" => [],
                            "margin" => [],
                            "display" => [
                                "Desktop" => "inline-block"
                            ],
                            "cursor" => [
                                "Desktop" => "pointer"
                            ]
                        ]
                    ]
                ],
                "activeFilter" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "slug" => "all"
                        ],
                        "styles" => [

                            "color" => [],

                            "wordBreak" => [],
                            "padding" => [],
                            "margin" => []
                        ]
                    ]
                ],
                "filterGroup" => [
                    "type" => "object",
                    "default" => [
                        "options" => [],
                        "styles" => [

                            "color" => [
                                "Desktop" => "#18978F"
                            ],
                            "backgroundColor" => [
                                "Desktop" => "#9DD6DF"
                            ],
                            "wordBreak" => [],
                            "padding" => [],
                            "margin" => [],
                            "display" => [
                                "Desktop" => "inline-block"
                            ]
                        ]
                    ]
                ],
                "noPostsWrap" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "class" => "no-posts text-center"
                        ],
                        "styles" => [

                            "color" => [],

                            "wordBreak" => [],
                            "padding" => [],
                            "margin" => []
                        ]
                    ]
                ],
                "spinnerWrap" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "class" => "spinner"
                        ],
                        "styles" => [

                            "color" => [],

                            "wordBreak" => [],
                            "padding" => [],
                            "margin" => []
                        ]
                    ]
                ],
                "grid" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "itemCss" => []
                        ],
                        "styles" => [
                            "gridTemplateColumns" => [],
                            "gridTemplateRows" => [],
                            "colGap" => [],
                            "rowGap" => [],

                            "color" => [],

                            "padding" => [],
                            "margin" => []
                        ]
                    ]
                ],
                "pagination" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "class" => "pagination",
                            "type" => "filterable",
                            "maxPageNum" => "",
                            "prevText" => "Previous",
                            "nextText" => "Next",
                            "loadMoreText" => "Load More",
                            "noMorePosts" => "No More Posts",
                            "loadingText" => "Loading...",
                            "loadingIcon" => [
                                "library" => "",
                                "srcType" => "class",
                                "iconSrc" => ""
                            ]
                        ],
                        "styles" => [
                            "textAlign" => [
                                "Desktop" => "center"
                            ],
                            "color" => [
                                "Desktop" => "#18978F"
                            ],
                            "backgroundColor" => [
                                "Desktop" => "#9DD6DF"
                            ],
                            "padding" => [],
                            "margin" => [],
                            "fontSize" => [],
                            "lineHeight" => [],
                            "letterSpacing" => [],
                            "fontFamily" => [],
                            "fontWeight" => [],
                            "textDecoration" => [],
                            "textTransform" => []
                        ],
                        "hoverStyles" => [
                            "color" => [],
                            "backgroundColor" => []
                        ]
                    ]
                ],
                "paginationItem" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "class" => "page-numbers inline-block"
                        ],
                        "styles" => [

                            "display" => [
                                "Desktop" => "inline-block"
                            ],
                            "color" => [
                                "Desktop" => "#18978F"
                            ],
                            "backgroundColor" => [
                                "Desktop" => "#9DD6DF"
                            ],
                            "padding" => [
                                "Desktop" => [
                                    "top" => "10px",
                                    "right" => "10px",
                                    "bottom" => "10px",
                                    "left" => "10px"
                                ]
                            ],
                            "margin" => [
                                "Desktop" => [
                                    "top" => "5px",
                                    "right" => "5px",
                                    "bottom" => "5px",
                                    "left" => "5px"
                                ]
                            ],
                            "fontSize" => [],
                            "lineHeight" => [],
                            "letterSpacing" => [],
                            "fontFamily" => [],
                            "fontWeight" => [],
                            "textDecoration" => [],
                            "textTransform" => []
                        ],
                        "hoverStyles" => [
                            "color" => [],
                            "backgroundColor" => []
                        ]
                    ]
                ],
                "paginationItemActive" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "class" => "page-numbers inline-block"
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
                        ],
                        "hoverStyles" => [
                            "color" => [],
                            "backgroundColor" => []
                        ]
                    ]
                ],
                "layout" => [
                    "type" => "object",
                    "default" => [
                        "id" => "",
                        "srcServer" => "library",
                        "data" => [
                            [
                                "blockName" => "core/post-title",
                                "attrs" => [],
                                "innerBlocks" => [],
                                "innerHTML" => "",
                                "innerContent" => []
                            ],
                            [
                                "blockName" => null,
                                "attrs" => [],
                                "innerBlocks" => [],
                                "innerHTML" => "",
                                "innerContent" => [
                                    ""
                                ]
                            ],
                            [
                                "blockName" => "core/post-date",
                                "attrs" => [],
                                "innerBlocks" => [],
                                "innerHTML" => "",
                                "innerContent" => []
                            ],
                            [
                                "blockName" => null,
                                "attrs" => [],
                                "innerBlocks" => [],
                                "innerHTML" => "",
                                "innerContent" => [
                                    ""
                                ]
                            ],
                            [
                                "blockName" => "core/post-excerpt",
                                "attrs" => [
                                    "moreText" => "",
                                    "textColor" => "primary"
                                ],
                                "innerBlocks" => [],
                                "innerHTML" => "",
                                "innerContent" => []
                            ]
                        ],
                        "rawData" => "<!-- wp:post-featured-image  /--><!-- wp:post-title /--><!-- wp:post-excerpt  /-->"
                    ]
                ],
                "postTypes" => [
                    "type" => "array",
                    "default" => []
                ],
                "blockId" => [
                    "type" => "string",
                    "default" => ""
                ],
                "customCss" => [
                    "type" => "string",
                    "default" => ""
                ],
                "scripts" => [
                    "type" => "object",
                    "default" => [
                        "js" => "",
                        "css" => ""
                    ]
                ],
                "blockCssY" => [
                    "type" => "object",
                    "default" => [
                        "items" => []
                    ]
                ],
                "queryArgs" => [
                    "type" => "object",
                    "default" => [
                        "items" => [
                            [
                                "val" => [
                                    "post"
                                ],
                                "multiple" => false,
                                "id" => "postType",
                                "label" => "Post Types",
                                "description" => "Select Post Types to Query"
                            ],
                            [
                                "val" => [
                                    "publish"
                                ],
                                "multiple" => false,
                                "id" => "postStatus",
                                "label" => "Post status",
                                "description" => "Query post by post status"
                            ],
                            [
                                "val" => "DESC",
                                "multiple" => false,
                                "id" => "order",
                                "label" => "Order",
                                "description" => "Post query order"
                            ],
                            [
                                "val" => [
                                    "date"
                                ],
                                "multiple" => false,
                                "id" => "orderby",
                                "label" => "Orderby",
                                "description" => "Post query orderby"
                            ],
                            [
                                "val" => -1,
                                "multiple" => false,
                                "id" => "postsPerPage",
                                "label" => "Posts Per Page",
                                "description" => "Number of post to show per page"
                            ],
                            [
                                "val" => 1,
                                "multiple" => false,
                                "id" => "paged",
                                "label" => "Paged",
                                "description" => "Pagination start with"
                            ]
                        ]
                    ]
                ]
            ]


        )
        );
    }






    function front_style($attributes)
    {
    }

    public function parse_query_prams($queryArgs)
    {
        $query_args = [];



        foreach ($queryArgs as $item) {



            $id = isset($item['id']) ? $item['id'] : '';
            $val = isset($item['val']) ? $item['val'] : '';


            if (isset($item['val'])) {
                if ($id == 'postType') {
                    $query_args['post_type'] = $val;
                } elseif ($id == 'postStatus') {
                    $query_args['post_status'] = $val;
                } elseif ($id == 'order') {
                    $query_args['order'] = $val;
                } elseif ($id == 'orderby') {
                    $query_args['orderby'] = implode(' ', $val);
                } elseif ($id == 'metaKey') {
                    $query_args['meta_key'] = $val;
                } elseif ($id == 'dateQuery') {


                    $date_query = [];

                    foreach ($val as $arg) {
                        $id = isset($arg['id']) ? $arg['id'] : '';
                        $value = isset($arg['value']) ? $arg['value'] : '';


                        if ($id == 'year' || $id == 'month' || $id == 'week' || $id == 'day' || $id == 'hour' || $id == 'minute' || $id == 'second') {
                            $compare = isset($arg['compare']) ? $arg['compare'] : '';

                            if (!empty($value))
                                $date_query[] = [$id => $value, 'compare' => $compare,];
                        }


                        if ($id == 'inclusive' || $id == 'compare' || $id == 'relation') {

                            if (!empty($value))
                                $date_query[$id] = $value;
                        }

                        if ($id == 'after' || $id == 'before') {
                            $year = isset($arg['year']) ? $arg['year'] : '';
                            $month = isset($arg['month']) ? $arg['month'] : '';
                            $day = isset($arg['day']) ? $arg['day'] : '';

                            if (!empty($year))
                                $date_query[$id]['year'] = $year;

                            if (!empty($month))
                                $date_query[$id]['month'] = $month;

                            if (!empty($day))
                                $date_query[$id]['day'] = $day;
                        }
                    }



                    $query_args['date_query'] = $date_query;
                } elseif ($id == 'year') {



                    $query_args['year'] = $val;
                } elseif ($id == 'monthnum') {
                    $query_args['monthnum'] = $val;
                } elseif ($id == 'w') {
                    $query_args['w'] = $val;
                } elseif ($id == 'day') {
                    $query_args['day'] = $val;
                } elseif ($id == 'hour') {
                    $query_args['hour'] = $val;
                } elseif ($id == 'minute') {
                    $query_args['minute'] = $val;
                } elseif ($id == 'second') {
                    $query_args['second'] = $val;
                } elseif ($id == 'm') {
                    $query_args['m'] = $val;
                } elseif ($id == 'author') {
                    $query_args['author'] = $val;
                } elseif ($id == 'authorName') {
                    $query_args['author_name'] = $val;
                } elseif ($id == 'authorIn') {
                    $query_args['author_in'] = !empty($val) ? explode(',', $val) : [];
                } elseif ($id == 'authorNotIn') {
                    $query_args['author__not_in'] = !empty($val) ? explode(',', $val) : [];
                } elseif ($id == 'cat') {
                    $query_args['cat'] = $val;
                } elseif ($id == 'categoryName') {
                    $query_args['category_name'] = $val;
                } elseif ($id == 'categoryAnd') {
                    $query_args['category_and'] = !empty($val) ? explode(',', $val) : [];
                } elseif ($id == 'categoryIn') {
                    $query_args['category__in'] = !empty($val) ? explode(',', $val) : [];
                } elseif ($id == 'categoryNotIn') {
                    $query_args['category__not_in'] = !empty($val) ? explode(',', $val) : [];
                } elseif ($id == 'tag') {
                    $query_args['tag'] = $val;
                } elseif ($id == 'tagId') {
                    $query_args['tag_id'] = $val;
                } elseif ($id == 'tagAnd') {
                    $query_args['tag__and'] = !empty($val) ? explode(',', $val) : [];
                } elseif ($id == 'tagIn') {
                    $query_args['tag__in'] = !empty($val) ? explode(',', $val) : [];
                } elseif ($id == 'tagNotIn') {
                    $query_args['tag__not_in'] = !empty($val) ? explode(',', $val) : [];
                } elseif ($id == 'tagSlugAnd') {
                    $query_args['tag_slug__and'] = !empty($val) ? explode(',', $val) : [];
                } elseif ($id == 'tagSlugIn') {
                    $query_args['tag_slug__in'] = !empty($val) ? explode(',', $val) : [];
                } elseif ($id == 'taxQuery') {
                    $query_args['tax_query'] = isset($val[0]) ? $val[0] : $val;
                } elseif ($id == 'p') {
                    $query_args['p'] = $val;
                } elseif ($id == 'name') {
                    $query_args['name'] = $val;
                } elseif ($id == 'pageId') {
                    $query_args['page_id'] = $val;
                } elseif ($id == 'pagename') {
                    $query_args['pagename'] = $val;
                } elseif ($id == 'postParent') {
                    $query_args['post_parent'] = $val;
                } elseif ($id == 'postParentIn') {
                    $query_args['post_parent__in'] = !empty($val) ? explode(',', $val) : [];
                } elseif ($id == 'postParentNotIn') {
                    $query_args['post_parent__not_in'] = !empty($val) ? explode(',', $val) : [];
                } elseif ($id == 'postIn') {

                    $query_args['post__in'] = !empty($val) ? explode(',', $val) : [];
                } elseif ($id == 'postNotIn') {
                    $query_args['post__not_in'] = !empty($val) ? explode(',', $val) : [];
                } elseif ($id == 'postNameIn') {
                    $query_args['post_name__in'] = !empty($val) ? explode(',', $val) : [];
                } elseif ($id == 'hasPassword') {

                    $query_args['has_password'] = $val;
                } elseif ($id == 'postPassword') {
                    $query_args['post_password'] = $val;
                } elseif ($id == 'commentCount') {
                    $query_args['comment_count'] = $val;
                } elseif ($id == 'nopaging') {
                    $query_args['nopaging'] = $val;
                } elseif ($id == 'postsPerPage') {
                    $query_args['posts_per_page'] = $val;
                } elseif ($id == 'paged') {
                    $query_args['paged'] = $val;
                } elseif ($id == 'offset') {

                    $query_args['offset'] = $val;
                } elseif ($id == 'postsPerArchivePage') {
                    $query_args['posts_per_archive_page'] = $val;
                } elseif ($id == 'ignoreStickyPosts') {
                    $query_args['ignore_sticky_posts'] = $val;
                } elseif ($id == 'metaKey') {
                    $query_args['meta_key'] = $val;
                } elseif ($id == 'metaValue') {
                    $query_args['meta_value'] = $val;
                } elseif ($id == 'metaValueNum') {
                    $query_args['meta_value_num'] = $val;
                } elseif ($id == 'metaCompare') {
                    $query_args['meta_compare'] = $val;
                } elseif ($id == 'metaQuery') {
                    $query_args['meta_query'] = $val;
                } elseif ($id == 'perm') {
                    $query_args['perm'] = $val;
                } elseif ($id == 'postMimeType') {
                    $query_args['post_mime_type'] = $val;
                } elseif ($id == 'cacheResults') {
                    $query_args['cache_results'] = $val;
                } elseif ($id == 'updatePostMetaCache') {
                    $query_args['update_post_meta_cache '] = $val;
                } elseif ($id == 'updatePostTermCache') {
                    $query_args['update_post_term_cache'] = $val;
                }
            }
        }


        if (get_query_var('paged')) {
            $paged = get_query_var('paged');
        } elseif (get_query_var('page')) {
            $paged = get_query_var('page');
        } else {
            $paged = 1;
        }


        if (!empty($paged))
            $query_args['paged'] = $paged;


        return $query_args;
    }


    // front-end output from the gutenberg editor 
    function theHTML($attributes, $content, $block)
    {




        global $postGridCss;
        global $postGridCustomCss;
        global $postGridCssY;
        global $postGridScriptData;



        $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';

        $post_url = get_the_permalink($post_ID);
        $the_post = get_post($post_ID);
        $post_excerpt = '';

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';


        $postGridCustomCss .= $customCss;

        $container = isset($attributes['container']) ? $attributes['container'] : [];
        $containerOptions = isset($container['options']) ? $container['options'] : [];


        $itemsWrap = isset($attributes['itemsWrap']) ? $attributes['itemsWrap'] : [];
        $itemsWrapOptions = isset($itemsWrap['options']) ? $itemsWrap['options'] : [];

        /*#######itemWrap######*/
        $itemWrap = isset($attributes['itemWrap']) ? $attributes['itemWrap'] : [];
        $itemWrapOptions = isset($itemWrap['options']) ? $itemWrap['options'] : [];

        $filterable = isset($attributes['filterable']) ? $attributes['filterable'] : [];
        $filterableOptions = isset($filterable['options']) ? $filterable['options'] : [];
        $filterableFilters = isset($filterableOptions['filters']) ? $filterableOptions['filters'] : [];
        $filterableShowSort = isset($filterableOptions['showSort']) ? $filterableOptions['showSort'] : 'no';
        $filterToggle = isset($filterableOptions['filterToggle']) ? $filterableOptions['filterToggle'] : 'no';


        $filterableShowRandom = isset($filterableOptions['showRandom']) ? $filterableOptions['showRandom'] : 'no';
        $filterableShowAll = isset($filterableOptions['showAll']) ? $filterableOptions['showAll'] : 'yes';
        $filterableShowClear = isset($filterableOptions['showClear']) ? $filterableOptions['showClear'] : 'no';
        $filterablePerPage = isset($filterableOptions['perPage']) ? $filterableOptions['perPage'] : 6;

        $logicWithinGroup = isset($filterableOptions['logicWithinGroup']) ? $filterableOptions['logicWithinGroup'] : 'or';
        $logicBetweenGroups = isset($filterableOptions['logicBetweenGroups']) ? $filterableOptions['logicBetweenGroups'] : 'and';
        $multifilter = isset($filterableOptions['multifilter']) ? (bool) $filterableOptions['multifilter'] : true;

        ////var_dump($multifilter);

        $activeFilter = isset($attributes['activeFilter']) ? $attributes['activeFilter'] : [];
        $activeFilterOptions = isset($activeFilter['options']) ? $activeFilter['options'] : [];
        $activeFilterSlug = !empty($activeFilterOptions['slug']) ? $activeFilterOptions['slug'] : 'all';



        /*#########$noPostsWrap#########*/
        $noPostsWrap = isset($attributes['noPostsWrap']) ? $attributes['noPostsWrap'] : [];
        $noPostsWrapOptions = isset($noPostsWrap['options']) ? $noPostsWrap['options'] : [];


        $spinnerWrap = isset($attributes['spinnerWrap']) ? $attributes['spinnerWrap'] : [];
        $spinnerWrapOptions = isset($spinnerWrap['options']) ? $spinnerWrap['options'] : [];


        $grid = isset($attributes['grid']) ? $attributes['grid'] : [];
        $gridOptions = isset($grid['options']) ? $grid['options'] : [];
        $gridOptionsItemCss = isset($gridOptions['itemCss']) ? $gridOptions['itemCss'] : [];


        /*#######pagination######*/
        $pagination = isset($attributes['pagination']) ? $attributes['pagination'] : [];
        $paginationOptions = isset($pagination['options']) ? $pagination['options'] : [];
        $paginationType = isset($paginationOptions['type']) ? $paginationOptions['type'] : 'none';
        $loadMoreText = isset($paginationOptions['loadMoreText']) ? $paginationOptions['loadMoreText'] : __('Load More', 'post-grid');
        $loadingText = isset($paginationOptions['loadingText']) ? $paginationOptions['loadingText'] : __('Loading...', 'post-grid');
        $noMorePosts = isset($paginationOptions['noMorePosts']) ? $paginationOptions['noMorePosts'] : __('No More Posts', 'post-grid');

        $loadingIcon = isset($paginationOptions['loadingIcon']) ? $paginationOptions['loadingIcon'] : [];

        $loadingIconLibrary = isset($loadingIcon['library']) ? $loadingIcon['library'] : "fontAwesome";
        $loadingIconSrc = isset($loadingIcon['iconSrc']) ? $loadingIcon['iconSrc'] : "fas fa-spinner";
        $loadingIconSrcType = isset($loadingIcon['srcType']) ? $loadingIcon['srcType'] : "class";


        $prevText = isset($paginationOptions['prevText']) ? $paginationOptions['prevText'] : __('Previous', 'post-grid');
        $nextText = isset($paginationOptions['nextText']) ? $paginationOptions['nextText'] : __('Previous', 'post-grid');



        /*#########$paginationItem############*/
        $paginationItem = isset($attributes['paginationItem']) ? $attributes['paginationItem'] : [];
        $paginationItemOptions = isset($paginationItem['options']) ? $paginationItem['options'] : [];


        $search = isset($attributes['search']) ? $attributes['search'] : [];
        $searchOptions = isset($search['options']) ? $search['options'] : [];

        $lazyLoad = isset($attributes['lazyLoad']) ? $attributes['lazyLoad'] : [];
        $lazyLoadOptions = isset($lazyLoad['options']) ? $lazyLoad['options'] : [];
        $lazyLoadEnable = isset($lazyLoadOptions['enable']) ? $lazyLoadOptions['enable'] : 'no';

        $lazyLoadIcon = isset($lazyLoadOptions['icon']) ? $lazyLoadOptions['icon'] : [];
        $lazyLoadIconLibrary = isset($lazyLoadIcon['library']) ? $lazyLoadIcon['library'] : 'fontAwesome';
        $lazyLoadIconSrc = isset($lazyLoadIcon['iconSrc']) ? $lazyLoadIcon['iconSrc'] : 'fas fa-spinner fa-spin';
        $lazyLoadIconSrcType = isset($lazyLoadIcon['srcType']) ? $lazyLoadIcon['srcType'] : 'class';
        $lazyLoadsrcUrl = isset($lazyLoadOptions['srcUrl']) ? $lazyLoadOptions['srcUrl'] : '';
        $lazyLoadsrcId = isset($lazyLoadOptions['srcId']) ? $lazyLoadOptions['srcId'] : '';



        $layout = isset($attributes['layout']) ? $attributes['layout'] : [];
        $queryArgs = isset($attributes['queryArgs']) ? $attributes['queryArgs'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : [];
        $scripts = isset($attributes['scripts']) ? $attributes['scripts'] : [];
        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : ['items' => []];
        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';


        $itemCssArr = [];
        if (!empty($gridOptionsItemCss)) {
            foreach ($gridOptionsItemCss as $device => $args) {

                foreach ($args as $index => $items) {
                    foreach ($items as $attr => $val) {
                        $nth = $index + 1;

                        $itemCssArr[".$blockId .item:nth-child($nth)"][$attr][$device] = $val;
                    }
                }
            }
        }

        $postGridCssY[] = array_merge($blockCssY['items'], $itemCssArr);



        $postGridScriptData[$blockId]['queryArgs'] = isset($queryArgs['items']) ? $queryArgs['items'] : [];
        $postGridScriptData[$blockId]['layout']['id'] = isset($layout['id']) ? $layout['id'] : '';
        $postGridScriptData[$blockId]['layout']['rawData'] = isset($layout['rawData']) ? $layout['rawData'] : '';
        $postGridScriptData[$blockId]['pagination']['type'] = $paginationType;



        ob_start();

        $rawData = '<!-- wp:post-featured-image /--><!-- wp:post-title /--><!-- wp:post-excerpt /-->';
        $rawData = !empty($layout['rawData']) ? $layout['rawData'] : $rawData;

        $srcServer = !empty($layout['srcServer']) ? $layout['srcServer'] : 'library';

        if ($srcServer == 'saved') {


            $postData = get_post($layout['id']);
            $post_content = isset($postData->post_content) ? $postData->post_content : '';
            $rawDatabyId = !empty($layout['id']) ? $post_content : '';
            $rawData = !empty($rawDatabyId) ? $rawDatabyId : $rawData;
        }






        $query_args = $this->parse_query_prams(isset($queryArgs['items']) ? $queryArgs['items'] : []);

        if (get_query_var('paged')) {
            $paged = get_query_var('paged');
        } elseif (get_query_var('page')) {
            $paged = get_query_var('page');
        } else {
            $paged = 1;
        }


        $posts = [];
        $responses = [];



        $post_grid_wp_query = new WP_Query($query_args);



        if ($post_grid_wp_query->have_posts()):

            while ($post_grid_wp_query->have_posts()):
                $post_grid_wp_query->the_post();

                $post_id = get_the_id();
                $blocks = parse_blocks($rawData);

                $html = '';

                foreach ($blocks as $block) {
                    //look to see if your block is in the post content -> if yes continue past it if no then render block as normal
                    $html .= render_block($block);
                }


                $posts[$post_id] = $html;




            endwhile;


            $responses['posts'] = $posts;
            $responses['max_num_pages'] = isset($post_grid_wp_query->max_num_pages) ? $post_grid_wp_query->max_num_pages : 0;
            ;

            wp_reset_query();
            wp_reset_postdata();
        endif;





        $blockArgs = [
            'blockId' => $blockId,
            'lazyLoad' => ['enable' => $lazyLoadEnable],
            'pagination' => [
                'type' => $paginationType,
                'loadMoreText' => $loadMoreText,
                'loadingText' => $loadingText,
                'noMorePosts' => $noMorePosts,
                'loadingIcon' => '<i class="loademore-icon ' . $loadingIconSrc . '"></i>',
                'page' => $paged,
            ],
            'noPosts' => false
        ];


        $postGridArgs = [
            'blockId' => $blockId,
            'lazyLoad' => ['enable' => $lazyLoadEnable],
            'activeFilter' => ['slug' => $activeFilterSlug],
            'perPage' => $filterablePerPage,
            'logicWithinGroup' => $logicWithinGroup,
            'logicBetweenGroups' => $logicBetweenGroups,
            'multifilter' => $multifilter,


        ];








        ?>
                <?php if ($lazyLoadEnable == 'yes'): ?>
                        <div class=" PGBlockPostGrid-lazyload" id="lazyload-<?php echo esc_attr($blockId); ?>">
                            <?php
                            if (!empty($lazyLoadsrcUrl)):
                                ?><img src="<?php echo esc_url_raw($lazyLoadsrcUrl); ?>" alt="Post Grid Lazy loading">
                                <?php
                            else:
                                ?>
                                    <i class="<?php echo esc_attr($lazyLoadIconSrc); ?> fa-spin"></i>
                                <?php
                            endif;
                            ?>
                        </div>
                <?php endif; ?>
                <div <?php echo ($lazyLoadEnable == 'yes') ? 'style="display: none;" ' : ''; ?> class="<?php echo esc_attr($blockId); ?> PGBlockPostGrid PGBlockPostGrid-<?php echo esc_attr($blockId); ?>" postgridargs=<?php echo wp_json_encode($postGridArgs); ?>>
                    <div class="loop-loading"></div>
                    <div class="">
                        <form class="filterable-group-wrap">



                            <?php

                            $groupLogic = '';

                            if (empty($filterableFilters)) {

                                ?>
                                    <div class="filterable-group" data-filter-group data-logic="OR">
                                        <?php if ($filterableShowAll == 'yes'): ?>
                                                <span class="pg-filter pg-filter-<?php echo esc_attr($blockId); ?>" data-filter="all"><?php echo 'All'; ?></span>
                                        <?php endif; ?>
                                    </div>
                                    <?php


                            }



                            if (!empty($filterableFilters)) {

                                $groupCount = 0;

                                foreach ($filterableFilters as $filterGroup) {
                                    $groupTitle = isset($filterGroup['groupTitle']) ? $filterGroup['groupTitle'] : '';
                                    $groupType = isset($filterGroup['type']) ? $filterGroup['type'] : '';
                                    $groupLogic = isset($filterGroup['logic']) ? $filterGroup['logic'] : '';
                                    $groupshowPostCount = isset($filterGroup['showPostCount']) ? $filterGroup['showPostCount'] : '';
                                    $groupitems = isset($filterGroup['items']) ? $filterGroup['items'] : [];
                                    if (!empty($groupitems)) {
                                        ?>
                                                    <div class="filterable-group" data-filter-group data-logic="<?php echo esc_attr($groupLogic); ?>">
                                                        <span class="filterable-group-title">
                                                            <?php echo esc_html($groupTitle); ?>
                                                        </span>

                                                        <?php if ($groupCount == 0 && count($filterableFilters) == 1): ?>
                                                                <?php if ($filterableShowAll == 'yes'): ?>
                                                                        <span class="pg-filter pg-filter-<?php echo esc_attr($blockId); ?>" data-filter="all"><?php echo 'All'; ?></span>
                                                                <?php endif; ?>
                                                        <?php endif; ?>


                                                        <?php
                                                        if (!empty($groupitems))
                                                            foreach ($groupitems as $item) {
                                                                $itemId = isset($item['id']) ? $item['id'] : '';
                                                                $itemSlug = isset($item['slug']) ? $item['slug'] : '';
                                                                $itemTitle = isset($item['title']) ? $item['title'] : '';
                                                                $itemCount = isset($item['count']) ? $item['count'] : '';
                                                                ?>
                                                                    <span class="pg-filter pg-filter-<?php echo esc_attr($blockId); ?>" <?php if ($filterToggle == 'yes'): ?> data-toggle="<?php echo '.' . esc_attr($itemSlug); ?>" <?php else: ?> data-filter="<?php echo '.' . esc_attr($itemSlug); ?>" <?php endif; ?>>
                                                                        <?php echo esc_html($itemTitle) ?>
                                                                        <?php echo ($groupshowPostCount == 'yes') ? '(' . esc_html($itemCount) . ')' : '' ?>
                                                                    </span>
                                                                <?php
                                                            }
                                                        ?>
                                                    </div>
                                        <?php
                                    }
                                    $groupCount++;
                                }
                            }
                            ?>
                            <div class="filterable-group" data-filter-group data-logic="<?php echo esc_attr($groupLogic); ?>">
                                <?php if ($filterableShowSort == 'yes'): ?>
                                        <span class="pg-filter pg-filter-<?php echo esc_attr($blockId); ?>" data-sort="order:asc"><?php echo __('ASC', 'post-grid'); ?></span>
                                        <span class="pg-filter pg-filter-<?php echo esc_attr($blockId); ?>" data-sort="order:desc"><?php echo __('DESC', 'post-grid'); ?></span>
                                <?php endif; ?>
                                <?php if ($filterableShowRandom == 'yes'): ?>
                                        <span class="pg-filter pg-filter-<?php echo esc_attr($blockId); ?>" data-sort="random"><?php echo __('Random', 'post-grid'); ?></span>
                                <?php endif; ?>
                                <?php if (count($filterableFilters) > 1 && $filterableShowClear == 'yes'): ?>
                                        <button class="pg-filter" type="reset"><?php echo __('Clear', 'post-grid'); ?></button>
                                <?php endif; ?>
                            </div>
                        </form>
                    </div>
                    <div class="items-loop" id="items-loop-<?php echo esc_attr($blockId); ?>">
                        <?php
                        if (!empty($responses['posts'])) {
                            $loopCount = 1;
                            foreach ($responses['posts'] as $postId => $post) {
                                $slug = post_grid_term_slug_list($postId)
                                    ?>
                                        <div class="item mix <?php echo esc_attr($slug); ?>" data-order="<?php echo esc_attr($loopCount); ?>">
                                            <?php echo $post; ?>
                                        </div>
                                <?php
                                $loopCount++;
                            }
                        }
                        ?>
                    </div>
                    <?php if ($paginationType != 'none'): ?>
                            <div id="pagination-<?php echo esc_attr($blockId); ?>" class="pagination PGBlockPostGrid-pagination <?php echo esc_attr($paginationType); ?>" blockArgs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
                                <div class="pager-list mixitup-page-list pager-list-<?php echo esc_attr($blockId); ?>"></div>
                            </div>
                    <?php endif; ?>
                </div>
        <?php return ob_get_clean();
    }
}

$PGBlockPostGridFilterable = new PGBlockPostGridFilterable();