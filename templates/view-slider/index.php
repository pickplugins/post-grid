<?php
if (!defined('ABSPATH')) exit;  // if direct access

add_action('post_grid_builder_viewSlider', 'post_grid_builder_viewSlider', 5, 2);

function post_grid_builder_viewSlider($post_id, $PostGridData)
{

    global $PostGridBuilderCss;


    $globalOptions = isset($PostGridData["globalOptions"]) ? $PostGridData["globalOptions"] : [];
    $lazyLoad = isset($globalOptions["lazyLoad"]) ? $globalOptions["lazyLoad"] : false;
    $itemSource = isset($globalOptions["itemSource"]) ? $globalOptions["itemSource"] : "topToBottom";


    $loopLayout = isset($PostGridData["loopLayout"]) ? $PostGridData["loopLayout"] : [];

    $loopLayouts = $loopLayout[0]['children'];

    $items = isset($PostGridData["items"]) ? $PostGridData["items"] : [];
    $itemQueryArgs = isset($PostGridData["itemQueryArgs"]) ? $PostGridData["itemQueryArgs"] : [];

    if ($itemSource == "posts") {
        $itemsQueryResponse = post_grid_builder_post_query_items($itemQueryArgs, $loopLayouts, ['item_class' => 'splide__slide', 'terms_class' => false]);

        $postsHtml = isset($itemsQueryResponse['postsHtml']) ? $itemsQueryResponse['postsHtml'] : '';
        $posts_query = isset($itemsQueryResponse['posts_query']) ? $itemsQueryResponse['posts_query'] : [];
    }

    // if ($itemSource == "posts") {
    //     $items = post_grid_builder_post_query_items($itemQueryArgs);
    // }
    // if ($itemSource == "terms") {
    //     $items = post_grid_terms_query_item($itemQueryArgs);
    // }


    wp_enqueue_style('splide_core');
    wp_enqueue_script('splide.min');
    wp_enqueue_script('post-grid-slider-front');

    $reponsiveCss = isset($PostGridData["reponsiveCss"]) ? $PostGridData["reponsiveCss"] : "";
    $sliderOptions = isset($PostGridData['sliderOptions']) ? $PostGridData['sliderOptions'] : [];
    $sliderOptionsRes = isset($PostGridData['sliderOptionsRes']) ? $PostGridData['sliderOptionsRes'] : [];


    $PostGridBuilderCss .= $reponsiveCss;



    $wrapper = isset($PostGridData["wrapper"]) ? $PostGridData["wrapper"] : [];
    $wrapperOptions = isset($wrapper["options"]) ? $wrapper["options"] : [];
    $wrapperTag = !empty($wrapperOptions["tag"]) ? $wrapperOptions["tag"] : "div";
    $wrapperClass = isset($wrapperOptions["class"]) ? $wrapperOptions["class"] : "";

    $navsWrap = isset($PostGridData["navsWrap"]) ? $PostGridData["navsWrap"] : [];
    $navItem = isset($PostGridData["navItem"]) ? $PostGridData["navItem"] : [];
    $prev = isset($PostGridData["prev"]) ? $PostGridData["prev"] : [];
    $prevIcon = isset($PostGridData["prevIcon"]) ? $PostGridData["prevIcon"] : [];
    $next = isset($PostGridData["next"]) ? $PostGridData["next"] : [];
    $nextIcon = isset($PostGridData["nextIcon"]) ? $PostGridData["nextIcon"] : [];
    $paginationWrap = isset($PostGridData["paginationWrap"]) ? $PostGridData["paginationWrap"] : [];
    $paginationItem = isset($PostGridData["paginationItem"]) ? $PostGridData["paginationItem"] : [];
    $paginationItemActive = isset($PostGridData["paginationItemActive"]) ? $PostGridData["paginationItemActive"] : [];



    $prevIconLibrary = isset($options['library']) ? $options['library'] : '';
    $prevIconSrcType = isset($options['srcType']) ? $options['srcType'] : '';
    $prevIconSrc = isset($options['iconSrc']) ? $options['iconSrc'] : '';

    $prevIconHtml = '<span class="' . $prevIconSrc . '"></span>';


    $nextIconLibrary = isset($options['library']) ? $options['library'] : '';
    $nextIconSrcType = isset($options['srcType']) ? $options['srcType'] : '';
    $nextIconSrc = isset($options['iconSrc']) ? $options['iconSrc'] : '';

    $nextIconHtml = '<span class="' . $nextIconSrc . '"></span>';



    $sliderOptionsResNew = [];
    foreach ($sliderOptionsRes as $id => $arg) {
        foreach ($arg as $view => $value) {
            if ($view == 'Desktop') {
                $viewNum = '1280';
            }
            if ($view == 'Tablet') {
                $viewNum = '991';
            }
            if ($view == 'Mobile') {
                $viewNum = '767';
            }
            $sliderOptionsResNew[$viewNum][$id] = $value;
        }
    }
    $sliderOptions['breakpoints'] = $sliderOptionsResNew;


    $blockId = "post-grid-" . $post_id;



    $PostGridDataAttr = [
        "id" => $blockId,
        "lazyLoad" => $lazyLoad,
    ];

    $prevIconPosition = '';
    $prevText = 'Prev';
    $nextIconPosition = '';
    $nextText = 'Next';



?>
    <div id="<?php echo esc_attr($blockId); ?>" class="splide  " data-splide="<?php echo esc_attr(json_encode($sliderOptions)) ?>" style="<?php echo ($lazyLoad) ? "display: none;" : ""; ?>">
        <div class="splide__arrows">
            <div class='prev splide__arrow splide__arrow--prev'>
                <?php if ($prevIconPosition == 'before') : ?>
                    <span class='icon'>
                        <?php echo wp_kses_post($prevIconHtml); ?>
                    </span>
                <?php endif; ?>
                <?php if (!empty($prevText)) : ?>
                    <span>
                        <?php echo esc_attr($prevText); ?>
                    </span>
                <?php endif; ?>
                <?php if ($prevIconPosition == 'after') : ?>
                    <span class='icon'>
                        <?php echo wp_kses_post($prevIconHtml); ?>
                    </span>
                <?php endif; ?>
            </div>
            <div class='next splide__arrow splide__arrow--next'>
                <?php if ($nextIconPosition == 'before') : ?>
                    <span class='icon'>
                        <?php echo wp_kses_post($nextIconHtml); ?>
                    </span>
                <?php endif; ?>
                <?php if (!empty($nextText)) : ?>
                    <span>
                        <?php echo esc_attr($nextText); ?>
                    </span>
                <?php endif; ?>
                <?php if ($nextIconPosition == 'after') : ?>
                    <span class='icon'>
                        <?php echo wp_kses_post($nextIconHtml); ?>
                    </span>
                <?php endif; ?>
            </div>
        </div>
        <div class="splide__track">
            <ul class="splide__list items">
                <?php

                echo wp_kses_post($postsHtml);
                ?>
            </ul>
        </div>

        <ul class="splide__pagination "></ul>

    </div>


<?php
}
