<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockPostGridFilterableNav
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
    add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
  }


  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    //wp_register_style('pgpostgrid_editor_style', post_grid_plugin_url . 'includes/blocks/post-grid/index.css');
    //wp_register_script('pgpostgrid_editor_script', post_grid_plugin_url . 'includes/blocks/post-grid/index.js', array('wp-blocks', 'wp-element'));




    register_block_type(
      post_grid_plugin_dir . 'build/blocks/post-grid-filterable-nav/block.json',
      array(
        'title' => "Post Grid - Filterable Nav",
        'render_callback' => array($this, 'theHTML'),


      )
    );
  }

  function front_scripts($attributes)
  {
    wp_register_script('pgpostgrid_filterable_nav_front_script', post_grid_plugin_url . 'includes/blocks/post-grid-filterable-nav/front-scripts.js', []);
    wp_register_style('pgpostgrid_filterable_nav_front_style', post_grid_plugin_url . 'includes/blocks/post-grid-filterable-nav/index.css');
    if (has_block('post-grid/post-grid-filterable-nav')) {

      wp_enqueue_script('pgpostgrid_filterable_nav_front_script');
      wp_enqueue_style('pgpostgrid_filterable_nav_front_style');
    }
  }
  function front_style($attributes)
  {
  }




  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {
    wp_enqueue_style('font-awesome-5');


    global $postGridCss;

    global $postGridCssY;
    global $postGridScriptData;



    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    $postGridId = isset($block->context['post-grid/postGridId']) ? $block->context['post-grid/postGridId'] : '';

    $post_url = get_the_permalink($post_ID);
    $the_post = get_post($post_ID);
    $post_excerpt = '';

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';











    $grid = isset($attributes['grid']) ? $attributes['grid'] : [];
    $gridOptions = isset($grid['options']) ? $grid['options'] : [];
    $gridOptionsItemCss = isset($gridOptions['itemCss']) ? $gridOptions['itemCss'] : [];








    $lazyLoad = isset($attributes['lazyLoad']) ? $attributes['lazyLoad'] : [];
    $lazyLoadOptions = isset($lazyLoad['options']) ? $lazyLoad['options'] : [];
    $lazyLoadEnable = isset($lazyLoadOptions['enable']) ? $lazyLoadOptions['enable'] : 'no';





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


    $activeFilter = isset($attributes['activeFilter']) ? $attributes['activeFilter'] : [];
    $activeFilterOptions = isset($activeFilter['options']) ? $activeFilter['options'] : [];
    $activeFilterSlug = !empty($activeFilterOptions['slug']) ? $activeFilterOptions['slug'] : 'all';



    $layout = isset($attributes['layout']) ? $attributes['layout'] : [];
    $queryArgs = isset($attributes['queryArgs']) ? $attributes['queryArgs'] : [];

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

    $blockCssY = isset($attributes["blockCssY"])
      ? $attributes["blockCssY"]
      : [];
    // $postGridCssY[] = array_merge($blockCssY['items'], $itemCssArr);
    $postGridCssY[] = isset($blockCssY["items"]) ? $blockCssY["items"] : [];




    $postGridScriptData[$blockId]['lazyLoad']['enable'] = $lazyLoadEnable;

    $layout_id = isset($layout['id']) ? $layout['id'] : '';
    $layout_id = apply_filters('pgb_post_grid_post_layout_id', $layout_id);



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


      $responses['posts'] = $posts;
      $responses['max_num_pages'] = isset($post_grid_wp_query->max_num_pages) ? $post_grid_wp_query->max_num_pages : 0;;

      wp_reset_query();
      wp_reset_postdata();
    endif;




    $obj['id'] = $post_ID;
    $obj['type'] = 'post';


    $postGridArgs = [
      'blockId' => $postGridId,
      'lazyLoad' => ['enable' => $lazyLoadEnable],
      'activeFilter' => ['slug' => $activeFilterSlug],
      'perPage' => $filterablePerPage,
      'logicWithinGroup' => $logicWithinGroup,
      'logicBetweenGroups' => $logicBetweenGroups,
      'multifilter' => $multifilter,


    ];





    ob_start();



?>







    <div class="<?php echo esc_attr($blockId); ?> PGBlockPostGridFilterableNav PGBlockPostGridFilterableNav-<?php echo esc_attr($postGridId); ?>" postgridargs=<?php echo wp_json_encode($postGridArgs); ?>>
      <form class="filterable-group-wrap">
        <?php

        $groupLogic = '';

        if (empty($filterableFilters)) {

        ?>
          <div class="filterable-group" data-filter-group data-logic="OR">
            <?php if ($filterableShowAll == 'yes') : ?>
              <span class="pg-filter pg-filter-<?php echo esc_attr($postGridId); ?>" data-filter="all">
                <?php echo 'All'; ?>
              </span>
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

                <?php if ($groupCount == 0 && count($filterableFilters) == 1) : ?>
                  <?php if ($filterableShowAll == 'yes') : ?>
                    <span class="pg-filter pg-filter-<?php echo esc_attr($postGridId); ?>" data-filter="all">
                      <?php echo 'All'; ?>
                    </span>
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
                  <span class="pg-filter pg-filter-<?php echo esc_attr($postGridId); ?>" <?php if ($filterToggle == 'yes') : ?> data-toggle="<?php echo '.' . esc_attr($itemSlug); ?>" <?php else : ?> data-filter="<?php echo '.' . esc_attr($itemSlug); ?>" <?php endif; ?>>
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
          <?php if ($filterableShowSort == 'yes') : ?>
            <span class="pg-filter pg-filter-<?php echo esc_attr($postGridId); ?>" data-sort="order:asc">
              <?php echo __('ASC', 'post-grid'); ?>
            </span>
            <span class="pg-filter pg-filter-<?php echo esc_attr($postGridId); ?>" data-sort="order:desc">
              <?php echo __('DESC', 'post-grid'); ?>
            </span>
          <?php endif; ?>
          <?php if ($filterableShowRandom == 'yes') : ?>
            <span class="pg-filter pg-filter-<?php echo esc_attr($postGridId); ?>" data-sort="random">
              <?php echo __('Random', 'post-grid'); ?>
            </span>
          <?php endif; ?>
          <?php if (count($filterableFilters) > 1 && $filterableShowClear == 'yes') : ?>
            <button class="pg-filter" type="reset">
              <?php echo __('Clear', 'post-grid'); ?>
            </button>
          <?php endif; ?>
        </div>
      </form>
    </div>















<?php

    return ob_get_clean();
  }
}

$BlockPostGrid = new PGBlockPostGridFilterableNav();
