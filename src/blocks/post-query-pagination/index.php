<?php
if (!defined('ABSPATH'))
    exit();



class PGBlockPostQueryPagination
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {



        register_block_type(
            post_grid_plugin_dir . 'build/blocks/post-query-pagination/block.json',
            array(
                'title' => "Post Query - Pagination",
                'render_callback' => array($this, 'theHTML'),


            )
        );
    }

    function front_scripts($attributes)
    {
        wp_register_script('pgpostquerypagination_front_script', post_grid_plugin_url . 'src/blocks/post-query/front-scripts.js', []);
        wp_register_style('pgpostquerypagination_front_style', post_grid_plugin_url . 'src/blocks/post-query-pagination/index.css');
        if (has_block('post-grid/post-query-pagination')) {

            //wp_enqueue_script('pgpostquerypagination_front_script');
            //wp_enqueue_style('pgpostquerypagination_front_style');
        }
    }
    function front_style($attributes)
    {
    }




    // front-end output from the gutenberg editor 
    function theHTML($attributes, $content, $block)
    {
        wp_enqueue_style('font-awesome-5');
        //wp_enqueue_script('anime.min');

        global $postGridCss;

        global $postGridCssY;
        global $postGridScriptData;


        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';





        $container = isset($attributes['container']) ? $attributes['container'] : [];
        $containerOptions = isset($container['options']) ? $container['options'] : [];
        $containerClass = isset($containerOptions['class']) ? $containerOptions['class'] : '';


        $itemsWrap = isset($attributes['itemsWrap']) ? $attributes['itemsWrap'] : [];
        $itemsWrapOptions = isset($itemsWrap['options']) ? $itemsWrap['options'] : [];

        /*#######itemWrap######*/
        $itemWrap = isset($attributes['itemWrap']) ? $attributes['itemWrap'] : [];
        $itemWrapOptions = isset($itemWrap['options']) ? $itemWrap['options'] : [];


        /*#########$noPostsWrap#########*/
        $noPostsWrap = isset($attributes['noPostsWrap']) ? $attributes['noPostsWrap'] : [];
        $noPostsWrapOptions = isset($noPostsWrap['options']) ? $noPostsWrap['options'] : [];

        $grid = isset($attributes['grid']) ? $attributes['grid'] : [];
        $gridOptions = isset($grid['options']) ? $grid['options'] : [];
        $gridOptionsItemCss = isset($gridOptions['itemCss']) ? $gridOptions['itemCss'] : [];


        /*#######pagination######*/

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


        //var_dump($maxPageNum);

        $layout = isset($attributes['layout']) ? $attributes['layout'] : [];
        $queryArgs = isset($attributes['queryArgs']) ? $attributes['queryArgs'] : [];

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

        $layout_id = isset($layout['id']) ? $layout['id'] : '';
        $layout_id = apply_filters('pgb_post_grid_post_layout_id', $layout_id);

        ob_start();

        $rawData = '<!-- wp:post-featured-image /--><!-- wp:post-title /--><!-- wp:post-excerpt /-->';
        $rawData = !empty($layout['rawData']) ? $layout['rawData'] : $rawData;


        $srcServer = !empty($layout['srcServer']) ? $layout['srcServer'] : 'library';


        if ($srcServer == 'saved') {
            $postData = get_post($layout_id);
            $rawDatabyId = isset($postData->post_content) ? $postData->post_content : '';
            $rawData = !empty($rawDatabyId) ? $rawDatabyId : $rawData;
        }



        $query_args = post_grid_parse_query_prams(isset($queryArgs['items']) ? $queryArgs['items'] : []);


        if (get_query_var('paged')) {
            $paged = get_query_var('paged');
        } elseif (get_query_var('page')) {
            $paged = get_query_var('page');
        } else {
            $paged = 1;
        }


        $posts = [];
        $responses = [];

        $blockArgs = [
            'blockId' => $blockId,
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

        $post_grid_wp_query = new WP_Query($query_args);



        if ($post_grid_wp_query->have_posts()) :

            while ($post_grid_wp_query->have_posts()) :
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


            $responses['max_num_pages'] = isset($post_grid_wp_query->max_num_pages) ? $post_grid_wp_query->max_num_pages : 0;;

            wp_reset_query();
            wp_reset_postdata();
        endif;




?>





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
                            'total' => $pagination_max_num_pages,
                            'prev_text' => $prevText,
                            'next_text' => $nextText,
                            'type' => 'array',

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
                            'total' => $pagination_max_num_pages,
                            'prev_text' => $prevText,
                            'next_text' => $nextText,
                            'type' => 'array',

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
                    <div class="infinite-loader box">
                        <?php echo __('Loading...', 'post-grid'); ?>
                    </div>


                <?php endif; ?>
            </div>
        <?php endif; ?>









<?php return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockPostQueryPagination();
