<?php
if (!defined('ABSPATH')) exit();



class PGBlockPostGrid
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('pgpostgrid_editor_style', post_grid_plugin_url . 'src/blocks/post-grid/index.css');
        //wp_register_script('pgpostgrid_editor_script', post_grid_plugin_url . 'src/blocks/post-grid/index.js', array('wp-blocks', 'wp-element'));
        //wp_register_script('anime.min', post_grid_plugin_url . 'assets/global/js/anime.min.js', []);



        register_block_type('post-grid/post-grid', array(
            //'editor_script' => 'pgpostgrid_editor_script',
            //'style' => 'pgpostgrid_front_style',
            //'editor_style' => 'pgpostgrid_editor_style',
            //'script' => 'pgpostgrid_front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            'render_callback' => array($this, 'theHTML'),

            'attributes' =>  array(
                'lazyLoad' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'class' => 'lazyLoad',
                            'enable' => 'no',
                            'srcUrl' => '',
                            'srcId' => '',
                            'icon' =>
                            array(
                                'library' => '',
                                'srcType' => 'class',
                                'iconSrc' => '',
                            ),
                        ),
                        'styles' =>
                        array(),
                    ),
                ),
                'search' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'class' => 'search',
                            'enable' => 'no',
                            'type' => '',
                            'placeholder' => '',
                            'icon' => '',
                            'busyIcon' => '',
                        ),
                        'styles' =>
                        array(),
                    ),
                ),
                'container' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'class' => '',
                        ),
                        'styles' =>
                        array(),
                    ),
                ),
                'itemsWrap' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'class' => 'items-loop',
                        ),
                        'styles' =>
                        array(),
                    ),
                ),
                'itemWrap' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'class' => 'item',
                        ),
                        'styles' =>
                        array(),
                    ),
                ),
                'noPostsWrap' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'class' => 'no-posts text-center',
                        ),
                        'styles' =>
                        array(),
                    ),
                ),
                'spinnerWrap' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'class' => 'spinner',
                        ),
                        'styles' =>
                        array(),
                    ),
                ),
                'grid' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'itemCss' =>
                            array(),
                        ),
                        'styles' =>
                        array(
                            'gridTemplateColumns' =>
                            array(
                                'Tablet' =>
                                array(
                                    0 =>
                                    array(
                                        'val' => 1,
                                        'unit' => 'fr',
                                    ),
                                    1 =>
                                    array(
                                        'val' => 1,
                                        'unit' => 'fr',
                                    ),
                                ),
                                'Mobile' =>
                                array(
                                    0 =>
                                    array(
                                        'val' => 1,
                                        'unit' => 'fr',
                                    ),
                                ),
                            ),
                            'gridTemplateRows' =>
                            array(),
                            'colGap' =>
                            array(),
                            'rowGap' =>
                            array(),
                            'color' =>
                            array(
                                'Desktop' => '',
                            ),
                            'padding' =>
                            array(
                                'Desktop' => '',
                            ),
                            'margin' =>
                            array(
                                'Desktop' => '',
                            ),
                        ),
                    ),
                ),
                'pagination' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'class' => 'pagination',
                            'type' => 'normal',
                            'maxPageNum' => '',
                            'prevText' => 'Previous',
                            'nextText' => 'Next',
                            'loadMoreText' => 'Load More',
                            'noMorePosts' => 'No More Posts',
                            'loadingText' => 'Loading...',
                            'loadingIcon' =>
                            array(
                                'library' => '',
                                'srcType' => 'class',
                                'iconSrc' => '',
                            ),
                        ),
                        'styles' =>
                        array(
                            'textAlign' =>
                            array(
                                'Desktop' => 'center',
                            ),
                            'padding' =>
                            array(
                                'Desktop' => '',
                            ),
                            'margin' =>
                            array(
                                'Desktop' => '',
                            ),
                            'fontSize' =>
                            array(
                                'Desktop' => '',
                            ),
                        ),
                    ),
                ),
                'paginationItem' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'class' => 'page-numbers inline-block',
                        ),
                        'styles' =>
                        array(
                            'display' =>
                            array(
                                'Desktop' => 'inline-block',
                            ),
                            'color' =>
                            array(
                                'Desktop' => '#18978F',
                            ),
                            'fontSize' =>
                            array(
                                'Desktop' => '',
                            ),
                        ),
                    ),
                ),
                'paginationItemActive' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'class' => 'page-numbers inline-block',
                        ),
                        'styles' =>
                        array(
                            'display' =>
                            array(),
                            'color' =>
                            array(
                                'Desktop' => '',
                            ),
                            'padding' =>
                            array(
                                'Desktop' => '',
                            ),
                            'margin' =>
                            array(
                                'Desktop' => '',
                            ),
                            'fontSize' =>
                            array(
                                'Desktop' => '',
                            ),
                        ),
                    ),
                ),
                'layout' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'id' => '',
                        'srcServer' => 'library',
                        'data' =>
                        array(
                            0 =>
                            array(
                                'blockName' => 'core/post-title',
                                'attrs' =>
                                array(),
                                'innerBlocks' =>
                                array(),
                                'innerHTML' => '',
                                'innerContent' =>
                                array(),
                            ),
                            1 =>
                            array(
                                'blockName' => NULL,
                                'attrs' =>
                                array(),
                                'innerBlocks' =>
                                array(),
                                'innerHTML' => '

',
                                'innerContent' =>
                                array(
                                    0 => '

',
                                ),
                            ),
                            2 =>
                            array(
                                'blockName' => 'core/post-date',
                                'attrs' =>
                                array(),
                                'innerBlocks' =>
                                array(),
                                'innerHTML' => '',
                                'innerContent' =>
                                array(),
                            ),
                            3 =>
                            array(
                                'blockName' => NULL,
                                'attrs' =>
                                array(),
                                'innerBlocks' =>
                                array(),
                                'innerHTML' => '

',
                                'innerContent' =>
                                array(
                                    0 => '

',
                                ),
                            ),
                            4 =>
                            array(
                                'blockName' => 'core/post-excerpt',
                                'attrs' =>
                                array(
                                    'moreText' => '',
                                    'textColor' => 'primary',
                                ),
                                'innerBlocks' =>
                                array(),
                                'innerHTML' => '',
                                'innerContent' =>
                                array(),
                            ),
                        ),
                        'rawData' => '<!-- wp:post-grid/layers {"blockId":"pg9f6d8cc6f75d"} --><!-- wp:post-grid/post-featured-image {"wrapper":{"options":{"tag":"div","class":"","useAsBackground":"no"},"styles":{"height":{"Mobile":"220px"},"overflow":{},"color":{},"display":{},"padding":{},"margin":{},"backgroundPosition":{},"backgroundSize":{},"width":{"Desktop":"100%"},"maxHeight":{"Desktop":"300px !important","Tablet":"260px !important"}}},"featuredImage":{"options":{"tag":"","linkTo":"postUrl","customUrl":"","linkToMetaKey":"","altTextSrc":"imgAltText","altTextCustom":"","altTextMetaKey":"","titleTextSrc":"imgTitle","titleTextCustom":"","titleTextMetaKey":"","linkTarget":"_blank","linkAttr":[],"class":"","size":{"Desktop":"full","Tablet":"full","Mobile":"full"}},"styles":{"width":{"Desktop":"100% !important"},"height":{"Desktop":"300px !important","Tablet":"260px !important","Mobile":"220px !important"},"filter":{},"padding":{},"margin":{},"objectFit":{"Desktop":"cover"}},"hoverStyles":{"filter":{}}},"blockId":"pgf70569cb5b41","blockCssY":{"items":{".pgf70569cb5b41 img":{"height":{"Desktop":"300px !important","Tablet":"260px !important","Mobile":"220px !important"},"width":{"Desktop":"100% !important"},"object-fit":{"Desktop":"cover"}},".pgf70569cb5b41":{"width":{"Desktop":"100%"},"max-height":{"Desktop":"300px !important","Tablet":"260px !important"},"height":{"Mobile":"220px"}}}}} /--><!-- wp:post-grid/post-title {"wrapper":{"options":{"tag":"h2","class":""},"styles":{"display":{"Desktop":"block"},"margin":{"Desktop":"10px 0px 10px 0px !important"}}},"postTitle":{"options":{"tag":"","limitBy":"","limitCount":99,"isLink":true,"linkTo":"postUrl","linkToAuthorMeta":"","linkToCustomMeta":"","linkTarget":"_blank","linkAttr":[],"customUrl":"","class":""},"styles":{"color":{"Desktop":"#000000"},"fontSize":{"Desktop":"30px","Tablet":"16px"},"fontFamily":{"Desktop":"Poppins"},"fontStyle":{"Desktop":"normal"},"fontWeight":{"Desktop":"700"},"lineHeight":{"Desktop":"155%"},"margin":{}}},"blockId":"pg147e1b51bd6f","blockCssY":{"items":{".pg147e1b51bd6f":{"display":{"Desktop":"block"},"margin":{"Desktop":"10px 0px 10px 0px !important"}},".pg147e1b51bd6f a":{"line-height":{"Desktop":"155%"},"font-weight":{"Desktop":"700"},"font-style":{"Desktop":"normal"},"font-family":{"Desktop":"Poppins"},"font-size":{"Desktop":"30px","Tablet":"16px"},"color":{"Desktop":"#000000"},"margin":{}}}}} /--><!-- wp:post-grid/layers {"wrapper":{"options":{"tag":"div","class":"pg-layers","linkTo":"postUrl","linkToAuthorMeta":"","linkToCustomMeta":"","linkTarget":"_blank","customUrl":""},"styles":{"display":{"Desktop":"flex"},"backgroundColor":{},"gap":{"Desktop":"00px"},"padding":{"Desktop":"15px 0px 15px 0px"},"flexWrap":{"Desktop":"wrap"}}},"blockId":"pg6a5e333184ef","blockCssY":{"items":{".pg6a5e333184ef":{"display":{"Desktop":"flex"},"gap":{"Desktop":"00px"},"padding":{"Desktop":"15px 0px 15px 0px"},"flex-wrap":{"Desktop":"wrap"}}}}} --><!-- wp:post-grid/post-date {"postDate":{"options":{"tag":"div","dateFormat":"Y-m-d","linkTo":"","linkToUrl":"","linkToMetaKey":"","linkTarget":"_blank","linkAttr":[],"customUrl":"","class":""},"styles":{"color":{"Desktop":"#8d8d8d !important"},"fontSize":{"Desktop":"18px","Tablet":"16px"},"fontFamily":{"Desktop":"Poppins"},"fontStyle":{"Desktop":"normal"},"fontWeight":{"Desktop":"400"}}},"icon":{"options":{"library":"fontAwesome","srcType":"class","iconSrc":"far fa-calendar-alt","position":"beforePostDate","class":"postdate-icon"},"styles":{"color":{"Desktop":"#8d8d8d"},"margin":{"Desktop":"0px 10px 0px 0px"},"fontSize":{"Desktop":"18px"}}},"postfix":{"options":{"text":"|","class":"postfix"},"styles":{"color":{"Desktop":"#8d8d8d"},"fontSize":{"Desktop":"18px"},"fontFamily":{"Desktop":"Poppins"},"fontStyle":{"Desktop":"normal"},"fontWeight":{"Desktop":"400"},"margin":{"Desktop":"0px 10px 0px 10px"}}},"blockId":"pgb1a2578b07d5","blockCssY":{"items":{".pgb1a2578b07d5 .postfix":{"margin":{"Desktop":"0px 10px 0px 10px"},"color":{"Desktop":"#8d8d8d"},"font-size":{"Desktop":"18px"},"font-family":{"Desktop":"Poppins"},"font-style":{"Desktop":"normal"},"font-weight":{"Desktop":"400"}},".pgb1a2578b07d5 .postdate-icon":{"color":{"Desktop":"#8d8d8d"},"margin":{"Desktop":"0px 10px 0px 0px"},"font-size":{"Desktop":"18px"}},".pgb1a2578b07d5 .postdate-text":{"color":{"Desktop":"#8d8d8d !important"},"font-size":{"Desktop":"18px","Tablet":"16px"},"font-family":{"Desktop":"Poppins"},"font-style":{"Desktop":"normal"},"font-weight":{"Desktop":"400"}}}}} /--><!-- wp:post-grid/post-author {"elements":{"items":[{"id":"name","label":"Name","chosen":false,"selected":false}]},"name":{"options":{"class":"name","prefix":"","postfix":"","linkTo":"","linkToMeta":"","customUrl":""},"styles":{"color":{"Desktop":"#8d8d8d !important"},"fontSize":{"Desktop":"18px","Tablet":"16px"},"fontFamily":{"Desktop":"Poppins"},"fontStyle":{"Desktop":"normal"},"fontWeight":{"Desktop":"400"},"textTransform":{"Desktop":"capitalize"}}},"blockCssY":{"items":{".pgff11a02fb3ef .name":{"color":{"Desktop":"#8d8d8d !important"},"font-size":{"Desktop":"18px","Tablet":"16px"},"font-family":{"Desktop":"Poppins"},"font-style":{"Desktop":"normal"},"font-weight":{"Desktop":"400"},"text-transform":{"Desktop":"capitalize"}}}},"blockId":"pgff11a02fb3ef"} /--><!-- wp:post-grid/post-comment-count {"commentCount":{"options":{"tag":"div","status":"approved","customLabel":"Count: %s","linkTo":"postUrl","linkToUrl":"","linkToMetaKey":"","linkTarget":"_blank","linkAttr":[],"customUrl":"","class":"commentCount"},"styles":{"color":{"Desktop":"#8d8d8d !important"},"fontSize":{"Desktop":"18px"},"fontFamily":{"Desktop":"Poppins"},"fontStyle":{"Desktop":"normal"},"fontWeight":{"Desktop":"400"}}},"icon":{"options":{"library":"fontAwesome","srcType":"class","iconSrc":"far fa-calendar-alt","position":"beforeCommentCount","class":"commentCount-icon"},"styles":{"color":{"Desktop":"#8d8d8d"},"margin":{"Desktop":"0px 10px 0px 0px"},"fontSize":{"Desktop":"18px","Tablet":"16px"}}},"prefix":{"styles":{"color":{"Desktop":"#8d8d8d"},"fontSize":{"Desktop":"18px"},"fontFamily":{"Desktop":"Poppins"},"fontStyle":{"Desktop":"normal"},"fontWeight":{"Desktop":"400"},"margin":{"Desktop":"0px 10px 0px 10px"}},"options":{"text":"| ","class":"prefix"}},"blockId":"pg978a78bfb0a3","blockCssY":{"items":{".pg978a78bfb0a3 .prefix":{"margin":{"Desktop":"0px 10px 0px 10px"},"color":{"Desktop":"#8d8d8d"},"font-size":{"Desktop":"18px"},"font-family":{"Desktop":"Poppins"},"font-weight":{"Desktop":"400"},"font-style":{"Desktop":"normal"}},".pg978a78bfb0a3 .commentCount-icon":{"font-size":{"Desktop":"18px","Tablet":"16px"},"margin":{"Desktop":"0px 10px 0px 0px"},"color":{"Desktop":"#8d8d8d"}},".pg978a78bfb0a3 .commentCount":{"color":{"Desktop":"#8d8d8d !important"},"font-size":{"Desktop":"18px"},"font-family":{"Desktop":"Poppins"},"font-weight":{"Desktop":"400"},"font-style":{"Desktop":"normal"}}}}} /--><!-- /wp:post-grid/layers --><!-- wp:post-grid/post-excerpt {"postExcerpt":{"options":{"tag":"p","text":"","limitBy":"word","limitCount":"30","excerptSource":"auto","excerptSourceMeta":"","removeBlocks":true,"removeShortcodes":true,"keepHtml":false,"removeEmbeds":true,"autoP":false,"isLink":true,"linkTarget":"_blank","customUrl":"","linkAttr":[],"class":"excerpt-text"},"styles":{"color":{"Desktop":"#000000 !important"},"fontSize":{"Desktop":"18px !important","Tablet":"16px"},"fontFamily":{"Desktop":"Poppins"},"fontStyle":{"Desktop":"normal"},"fontWeight":{"Desktop":"400"}}},"readMore":{"options":{"enable":false,"text":"Read More","isLink":true,"linkTarget":"_blank","customUrl":"","linkAttr":[],"class":""},"styles":{"color":{"Desktop":"#ffffff !important"},"backgroundColor":{"Desktop":"#1F2E45 !important"},"fontSize":{"Desktop":"18px"},"fontFamily":{"Desktop":"Poppins"},"fontStyle":{"Desktop":"normal"},"fontWeight":{"Desktop":"400"},"padding":{"Desktop":"10px 45px 10px 45px"},"display":{"Desktop":"inline-block"},"borderRadius":{"Desktop":"50px 50px 50px 50px"}}},"blockId":"pgfb0e4128a120","blockCssY":{"items":{".pgfb0e4128a120 .excerpt-text":{"font-weight":{"Desktop":"400"},"font-style":{"Desktop":"normal"},"font-family":{"Desktop":"Poppins"},"font-size":{"Desktop":"18px !important","Tablet":"16px"},"color":{"Desktop":"#000000 !important"}},".pgfb0e4128a120 .readmore":{"color":{"Desktop":"#ffffff !important"},"background-color":{"Desktop":"#1F2E45 !important"},"font-size":{"Desktop":"18px"},"font-family":{"Desktop":"Poppins"},"font-style":{"Desktop":"normal"},"font-weight":{"Desktop":"400"},"padding":{"Desktop":"10px 45px 10px 45px"},"display":{"Desktop":"inline-block"},"border-radius":{"Desktop":"50px 50px 50px 50px"}}}}} /--><!-- /wp:post-grid/layers -->',
                    ),
                ),
                'blockId' =>
                array(
                    'type' => 'string',
                    'default' => '',
                ),
                'customCss' =>
                array(
                    'type' => 'string',
                    'default' => '',
                ),
                'blockCssY' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'items' =>
                        array(),
                    ),
                ),
                'queryArgs' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'items' =>
                        array(
                            0 =>
                            array(
                                'val' =>
                                array(
                                    0 => 'post',
                                ),
                                'id' => 'postType',
                            ),
                            1 =>
                            array(
                                'val' =>
                                array(
                                    0 => 'publish',
                                ),
                                'id' => 'postStatus',
                            ),
                            2 =>
                            array(
                                'val' => 'DESC',
                                'id' => 'order',
                            ),
                            3 =>
                            array(
                                'val' =>
                                array(
                                    0 => 'date',
                                ),
                                'id' => 'orderby',
                            ),
                            4 =>
                            array(
                                'val' => 3,
                                'id' => 'postsPerPage',
                            ),
                            5 =>
                            array(
                                'val' => 1,
                                'id' => 'paged',
                            ),
                        ),
                    ),
                ),
            )
        ));
    }

    function front_scripts($attributes)
    {
        wp_register_script('pgpostgrid_front_script', post_grid_plugin_url . 'src/blocks/post-grid/front-scripts.js', []);
        wp_register_style('pgpostgrid_front_style', post_grid_plugin_url . 'src/blocks/post-grid/index.css');
        if (has_block('post-grid/post-grid')) {

            wp_enqueue_script('pgpostgrid_front_script');
            wp_enqueue_style('pgpostgrid_front_style');
        }
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


                        if ($id == 'inclusive'  || $id == 'compare'  || $id == 'relation') {

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
                                $date_query[$id]['month'] =  $month;

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
        wp_enqueue_style('font-awesome-5');
        //wp_enqueue_script('anime.min');

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

        $maxPageNum = isset($paginationOptions['maxPageNum']) ? $paginationOptions['maxPageNum'] : 0;



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

                foreach ($args as  $index => $items) {
                    foreach ($items as  $attr => $val) {
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

        $layout_id = isset($layout['id']) ? $layout['id'] : '';
        $layout_id = apply_filters('pgb_post_grid_post_layout_id',  $layout_id);

        ob_start();

        $rawData = '<!-- wp:post-featured-image /--><!-- wp:post-title /--><!-- wp:post-excerpt /-->';
        $rawData      = !empty($layout['rawData']) ? $layout['rawData'] : $rawData;


        $srcServer      = !empty($layout['srcServer']) ? $layout['srcServer'] : 'library';


        if ($srcServer == 'saved') {
            $postData = get_post($layout_id);
            $rawDatabyId = isset($postData->post_content) ? $postData->post_content : '';
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



        if ($post_grid_wp_query->have_posts()) :

            while ($post_grid_wp_query->have_posts()) : $post_grid_wp_query->the_post();

                $post_id = get_the_id();
                $blocks = parse_blocks($rawData);

                $html = '';

                foreach ($blocks as $block) {
                    //look to see if your block is in the post content -> if yes continue past it if no then render block as normal
                    $html .= render_block($block);
                }


                $posts[$post_id]            = $html;

            endwhile;


            $responses['posts'] = $posts;
            $responses['max_num_pages'] = isset($post_grid_wp_query->max_num_pages) ? $post_grid_wp_query->max_num_pages : 0;;

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
                'prevText' => $prevText,
                'nextText' => $nextText,
                'maxPageNum' => $maxPageNum,


            ],
            'noPosts' => false
        ];


        $postGridArgs = [
            'blockId' => $blockId,
            'lazyLoad' => ['enable' => $lazyLoadEnable],
        ];


?>


        <?php if ($lazyLoadEnable == 'yes') : ?>
            <div class=" PGBlockPostGrid-lazyload" id="lazyload-<?php echo esc_attr($blockId); ?>">
                <?php
                if (!empty($lazyLoadsrcUrl)) :
                ?>
                    <img src="<?php echo esc_url_raw($lazyLoadsrcUrl); ?>" alt="Post Grid Lazy loading">
                <?php
                else :
                ?>
                    <i class="<?php echo esc_attr($lazyLoadIconSrc); ?> fa-spin"></i>
                <?php
                endif;
                ?>
            </div>
        <?php endif; ?>
        <div <?php echo ($lazyLoadEnable == 'yes') ? 'style="display: none;" ' : ''; ?> class="<?php echo esc_attr($blockId); ?> PGBlockPostGrid PGBlockPostGrid-<?php echo esc_attr($blockId); ?>" postgridargs=<?php echo (wp_json_encode($postGridArgs)); ?>>
            <div class="loop-loading"></div>
            <div class="items-loop" id="items-loop-<?php echo esc_attr($blockId); ?>">
                <?php
                if (!empty($responses['posts'])) {
                    foreach ($responses['posts'] as $post) {
                ?>
                        <div class="item">
                            <?php echo wp_kses_post($post); ?>
                        </div>
                <?php
                    }
                }
                ?>
            </div>

            <?php if ($paginationType != 'none') : ?>
                <div id="pagination-<?php echo esc_attr($blockId); ?>" class="pagination PGBlockPostGrid-pagination <?php echo esc_attr($paginationType); ?>" blockArgs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
                    <?php if ($paginationType == 'normal') : ?>
                        <?php
                        $big = 999999999; // need an unlikely integer
                        $pagination_max_num_pages = isset($responses['max_num_pages']) ? $responses['max_num_pages'] : 0;

                        $pages = paginate_links(
                            array(
                                'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
                                'format' => '?paged=%#%',
                                'current' => max(1, $paged),
                                'total'                 => $pagination_max_num_pages,
                                'prev_text'          => $prevText,
                                'next_text'          => $nextText,
                                'type'          => 'array',

                            )
                        );

                        if (!empty($pages)) :
                            foreach ($pages as $page) {
                                echo wp_kses_post($page);
                            }
                        endif;
                        ?>
                    <?php endif; ?>


                    <?php if ($paginationType == 'ajax') : ?>
                        <?php
                        $big = 999999999; // need an unlikely integer
                        $pagination_max_num_pages = $responses['max_num_pages'];



                        $pages = paginate_links(
                            array(
                                'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
                                'format' => '?paged=%#%',
                                'current' => max(1, $paged),
                                'total'                 => $pagination_max_num_pages,
                                'prev_text'          => $prevText,
                                'next_text'          => $nextText,
                                'type'          => 'array',

                            )
                        );

                        if (!empty($pages)) :
                            foreach ($pages as $page) {
                                //$links = str_replace('<a ', '<a blockArgs="' . esc_attr(json_encode($blockArgs)) . '" ', $page);
                                echo wp_kses_post($page);
                            }
                        endif;
                        ?>
                    <?php endif; ?>


                    <?php if ($paginationType == 'next_previous') :
                        $pagination_max_num_pages = $responses['max_num_pages'];


                        if ($pagination_max_num_pages) {
                    ?>
                            <a class="page-numbers" href="<?php echo esc_url_raw(get_previous_posts_page_link()); ?>">
                                <?php echo wp_kses_post($prevText); ?>
                            </a>
                            <a class="page-numbers" href="<?php echo esc_url_raw(get_next_posts_page_link()); ?>">
                                <?php echo wp_kses_post($nextText); ?>
                            </a>
                        <?php
                        }

                        ?>

                    <?php endif; ?>

                    <?php if ($paginationType == 'loadmore') : ?>
                        <div class="page-numbers">
                            <?php echo wp_kses_post($loadMoreText); ?>
                        </div>
                    <?php endif; ?>

                    <?php if ($paginationType == 'infinite') : ?>
                        <div class="infinite-loader box"><?php echo __('Loading...', 'post-grid'); ?></div>


                    <?php endif; ?>
                </div>
            <?php endif; ?>
        </div>
        <?php



        ?>









<?php return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockPostGrid();
