<?php
if (!defined('ABSPATH')) exit;  // if direct access

add_action('post_grid_builder_viewGrid', 'post_grid_builder_viewGrid', 5, 2);

function post_grid_builder_viewGrid($post_id, $PostGridData)
{

    global $PostGridBuilderCss;

    $globalOptions = isset($PostGridData["globalOptions"]) ? $PostGridData["globalOptions"] : [];
    $lazyLoad = isset($globalOptions["lazyLoad"]) ? $globalOptions["lazyLoad"] : false;
    $itemSource = isset($globalOptions["itemSource"]) ? $globalOptions["itemSource"] : "topToBottom";

    $pagination = isset($globalOptions["pagination"]) ? $globalOptions["pagination"] : [];
    $paginationType = isset($pagination["type"]) ? $pagination["type"] : '';
    $nextText = isset($pagination["nextText"]) ? $pagination["nextText"] : '';
    $previousText = isset($pagination["previousText"]) ? $pagination["previousText"] : '';
    $loadMoreText = isset($pagination["loadMoreText"]) ? $pagination["loadMoreText"] : '';
    $loadingText = isset($pagination["loadingText"]) ? $pagination["loadingText"] : '';
    $noPostText = isset($pagination["noPostText"]) ? $pagination["noPostText"] : '';
    $nextIcon = isset($pagination["nextIcon"]) ? $pagination["nextIcon"] : [];
    $previousIcon = isset($pagination["previousIcon"]) ? $pagination["previousIcon"] : '';
    $loadingIcon = isset($pagination["loadingIcon"]) ? $pagination["loadingIcon"] : [];
    $loadMoreIcon = isset($pagination["loadMoreIcon"]) ? $pagination["loadMoreIcon"] : [];


    $nextIconLibrary = isset($nextIcon['library']) ? $nextIcon['library'] : '';
    $nextIconSrcType = isset($nextIcon['srcType']) ? $nextIcon['srcType'] : '';
    $nextIconSrc = isset($nextIcon['iconSrc']) ? $nextIcon['iconSrc'] : '';

    $nextIconHtml = '<span class="' . $nextIconSrc . '"></span>';

    $previousIconLibrary = isset($previousIcon['library']) ? $previousIcon['library'] : '';
    $previousIconSrcType = isset($previousIcon['srcType']) ? $previousIcon['srcType'] : '';
    $previousIconSrc = isset($previousIcon['iconSrc']) ? $previousIcon['iconSrc'] : '';

    $previousIconHtml = '<span class="' . $previousIconSrc . '"></span>';

    $loadingIconLibrary = isset($loadingIcon['library']) ? $loadingIcon['library'] : '';
    $loadingIconSrcType = isset($loadingIcon['srcType']) ? $loadingIcon['srcType'] : '';
    $loadingIconSrc = isset($loadingIcon['iconSrc']) ? $loadingIcon['iconSrc'] : '';

    $loadingIconHtml = '<span class="' . $loadingIconSrc . '"></span>';

    $loadMoreIconLibrary = isset($loadMoreIcon['library']) ? $loadMoreIcon['library'] : '';
    $loadMoreIconSrcType = isset($loadMoreIcon['srcType']) ? $loadMoreIcon['srcType'] : '';
    $loadMoreIconSrc = isset($loadMoreIcon['iconSrc']) ? $loadMoreIcon['iconSrc'] : '';

    $loadMoreIconHtml = '<span class="' . $loadMoreIconSrc . '"></span>';





    $items = isset($PostGridData["items"]) ? $PostGridData["items"] : [];
    $itemQueryArgs = isset($PostGridData["itemQueryArgs"]) ? $PostGridData["itemQueryArgs"] : [];








    $reponsiveCss = isset($PostGridData["reponsiveCss"]) ? $PostGridData["reponsiveCss"] : "";


    $PostGridBuilderCss .= $reponsiveCss;


    $loopLayout = isset($PostGridData["loopLayout"]) ? $PostGridData["loopLayout"] : [];

    $loopLayouts = isset($loopLayout[0]['children']) ? $loopLayout[0]['children'] : [];
    $wrapper = isset($PostGridData["wrapper"]) ? $PostGridData["wrapper"] : [];
    $wrapperOptions = isset($wrapper["options"]) ? $wrapper["options"] : [];
    $wrapperTag = !empty($wrapperOptions["tag"]) ? $wrapperOptions["tag"] : "div";
    $wrapperClass = isset($wrapperOptions["class"]) ? $wrapperOptions["class"] : "";

    $postsHtml = "";

    if ($itemSource == "posts") {
        $itemsQueryResponse = post_grid_builder_post_query_items($itemQueryArgs, $loopLayouts);


        $postsHtml = isset($itemsQueryResponse['postsHtml']) ? $itemsQueryResponse['postsHtml'] : '';
        $posts_query = isset($itemsQueryResponse['posts_query']) ? $itemsQueryResponse['posts_query'] : [];
    }
    // if ($itemSource == "terms") {
    //     $items = post_grid_terms_query_item($itemQueryArgs);
    // }
    // if ($itemSource == "easyAccordion") {
    //     $items = post_grid_easy_accordion_query_item($itemQueryArgs);
    // }

    $blockId = "post-grid-" . $post_id;



    $PostGridDataAttr = [
        "id" => $blockId,
        "lazyLoad" => $lazyLoad,
    ];


    if (get_query_var('paged')) {
        $paged = get_query_var('paged');
    } elseif (get_query_var('page')) {
        $paged = get_query_var('page');
    } else {
        $paged = 1;
    }



    $max_num_pages = isset($posts_query->max_num_pages) ? $posts_query->max_num_pages : 0;;

    $blockArgs = '';

?>
    <div id="<?php echo esc_attr($blockId); ?>" class="" data-accordionBuilder=<?php echo esc_attr(json_encode($PostGridDataAttr)) ?> role="tablist" style="<?php echo ($lazyLoad) ? "display: none;" : ""; ?>">


        <div class="items">
            <?php

            echo wp_kses_post($postsHtml);

            ?>
        </div>

        <?php if ($paginationType == 'normal') : ?>
            <div id="pagination-<?php echo esc_attr($blockId); ?>" class="pagination <?php echo esc_attr($blockId); ?> ComboBlocksPostGrid-pagination <?php echo esc_attr($paginationType); ?>" data-postqueryargs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
                <?php
                $big = 999999999; // need an unlikely integer
                $pages = paginate_links(
                    array(
                        'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
                        'format' => '?paged=%#%',
                        'current' => max(1, $paged),
                        'total' => $max_num_pages,
                        'prev_text' => $previousText,
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
            </div>
        <?php endif; ?>
        <?php if ($paginationType == 'ajax') : ?>
            <div id="pagination-<?php echo esc_attr($blockId); ?>" class="pagination <?php echo esc_attr($blockId); ?> ComboBlocksPostGrid-pagination <?php echo esc_attr($paginationType); ?>" data-postqueryargs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
                <?php
                $big = 999999999; // need an unlikely integer
                $pages = paginate_links(
                    array(
                        'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
                        'format' => '?paged=%#%',
                        'current' => max(1, $paged),
                        'total' => $max_num_pages,
                        'prev_text' => $previousText,
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
            </div>
        <?php endif; ?>
        <?php if ($paginationType == 'filterable') : ?>
            <div id="pagination-<?php echo esc_attr($blockId); ?>" class="<?php echo esc_attr($blockId); ?>  pagination ComboBlocksPostGrid-pagination <?php echo esc_attr($paginationType); ?> pager-list mixitup-page-list pager-list-<?php echo esc_attr($post_id); ?>" data-postqueryargs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
            </div>
        <?php endif; ?>
        <?php if ($paginationType == 'next_previous') :
            if ($max_num_pages) {
        ?>
                <div id="pagination-<?php echo esc_attr($blockId); ?>" class="pagination <?php echo esc_attr($blockId); ?> ComboBlocksPostGrid-pagination <?php echo esc_attr($paginationType); ?>" data-postqueryargs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
                    <a class="item" href="<?php echo esc_url(get_previous_posts_page_link()); ?>">
                        <?php echo wp_kses_post($previousText); ?>
                    </a>
                    <a class="item" href="<?php echo esc_url(get_next_posts_page_link()); ?>">
                        <?php echo wp_kses_post($nextText); ?>
                    </a>
                </div>
            <?php
            }
            ?>
        <?php endif; ?>
        <?php if ($paginationType == 'loadmore') : ?>
            <div id="pagination-<?php echo esc_attr($blockId); ?>" class="pagination <?php echo esc_attr($blockId); ?> ComboBlocksPostGrid-pagination <?php echo esc_attr($paginationType); ?>" data-postqueryargs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
                <div class="item">
                    <?php echo wp_kses_post($loadMoreIconHtml); ?>
                    <?php echo wp_kses_post($loadMoreText); ?>

                </div>
            </div>
        <?php endif; ?>
        <?php if ($paginationType == 'infinite') : ?>
            <div id="pagination-<?php echo esc_attr($blockId); ?>" class="pagination <?php echo esc_attr($blockId); ?> ComboBlocksPostGrid-pagination <?php echo esc_attr($paginationType); ?>" data-postqueryargs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
                <div class="infinite-loader box">
                    <?php echo wp_kses_post(__('Loading...', 'post-grid')); ?>
                </div>
            </div>
        <?php endif; ?>

    </div>


<?php
}
