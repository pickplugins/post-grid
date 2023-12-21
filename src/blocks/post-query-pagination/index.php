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
    wp_register_style('font-awesome-5', post_grid_plugin_url . 'assets/global/css/font-awesome-5.css', []);



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
    wp_register_style('font-awesome-5', post_grid_plugin_url . 'assets/global/css/font-awesome-5.css', []);
    if (has_block('post-grid/post-query-pagination')) {

      wp_enqueue_style('font-awesome-5');
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
    global $PGPostQuery;


    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';

    $postGridId = isset($block->context['post-grid/postGridId']) ? $block->context['post-grid/postGridId'] : '';

    /*#######pagination######*/
    $pagination = isset($attributes['pagination']) ? $attributes['pagination'] : [];
    $paginationOptions = isset($pagination['options']) ? $pagination['options'] : [];
    $paginationType = isset($paginationOptions['type']) ? $paginationOptions['type'] : 'none';
    $loadMoreText = isset($paginationOptions['loadMoreText']) ? $paginationOptions['loadMoreText'] : __('Load More', 'post-grid');
    $loadingText = isset($paginationOptions['loadingText']) ? $paginationOptions['loadingText'] : __('Loading...', 'post-grid');
    $noMorePosts = isset($paginationOptions['noMorePosts']) ? $paginationOptions['noMorePosts'] : __('No More Posts', 'post-grid');

    
    $loadingIcon = isset($paginationOptions['loadingIcon']) ? $paginationOptions['loadingIcon'] : [];
    
    $loadingPosition = isset($loadingIcon['loadingPosition']) ? $loadingIcon['loadingPosition'] : "";
    $loadingIconLibrary = isset($loadingIcon['library']) ? $loadingIcon['library'] : "fontAwesome";
    $loadingIconSrc = isset($loadingIcon['iconSrc']) ? $loadingIcon['iconSrc'] : "fas fa-spinner";
    $loadingIconSrcType = isset($loadingIcon['srcType']) ? $loadingIcon['srcType'] : "class";
    $loadingIconClass = isset($loadingIcon['class']) ? $loadingIcon['class'] : '';


    $loadMoreIcon = isset($paginationOptions['loadMoreIcon']) ? $paginationOptions['loadMoreIcon'] : [];
    
    $loadMorePosition = isset($loadMoreIcon['position']) ? $loadMoreIcon['position'] : "";
    $loadMoreIconLibrary = isset($loadMoreIcon['library']) ? $loadMoreIcon['library'] : "fontAwesome";
    $loadMoreIconSrc = isset($loadMoreIcon['iconSrc']) ? $loadMoreIcon['iconSrc'] : "fas fa-spinner";
    $loadMoreIconSrcType = isset($loadMoreIcon['srcType']) ? $loadMoreIcon['srcType'] : "class";
    $loadMoreIconClass = isset($loadMoreIcon['class']) ? $loadMoreIcon['class'] : '';


    $prevText = isset($paginationOptions['prevText']) ? $paginationOptions['prevText'] : __('Previous', 'post-grid');
    $nextText = isset($paginationOptions['nextText']) ? $paginationOptions['nextText'] : __('Previous', 'post-grid');

    $maxPageNum = isset($paginationOptions['maxPageNum']) ? $paginationOptions['maxPageNum'] : 0;



    $previous = isset($attributes['previous']) ? $attributes['previous'] : '';
    $previousOptions = isset($previous['options']) ? $previous['options'] : [];

    $previousLibrary = isset($previousOptions['library']) ? $previousOptions['library'] : '';
    $previousSrcType = isset($previousOptions['srcType']) ? $previousOptions['srcType'] : '';
    $previousSrc = isset($previousOptions['iconSrc']) ? $previousOptions['iconSrc'] : '';
    $previousPosition = isset($previousOptions['position']) ? $previousOptions['position'] : '';
    $previousClass = isset($previousOptions['class']) ? $previousOptions['class'] : '';


    $next = isset($attributes['next']) ? $attributes['next'] : '';
    $nextOptions = isset($next['options']) ? $next['options'] : [];

    $nextLibrary = isset($nextOptions['library']) ? $nextOptions['library'] : '';
    $nextSrcType = isset($nextOptions['srcType']) ? $nextOptions['srcType'] : '';
    $nextSrc = isset($nextOptions['iconSrc']) ? $nextOptions['iconSrc'] : '';
    $nextPosition = isset($nextOptions['position']) ? $nextOptions['position'] : '';
    $nextClass = isset($nextOptions['class']) ? $nextOptions['class'] : '';


    $start = isset($attributes['start']) ? $attributes['start'] : '';
    $startOptions = isset($start['options']) ? $start['options'] : [];

    $startLibrary = isset($startOptions['library']) ? $startOptions['library'] : '';
    $startSrcType = isset($startOptions['srcType']) ? $startOptions['srcType'] : '';
    $startSrc = isset($startOptions['iconSrc']) ? $startOptions['iconSrc'] : '';
    $startPosition = isset($startOptions['position']) ? $startOptions['position'] : '';
    $startClass = isset($startOptions['class']) ? $startOptions['class'] : '';


    $end = isset($attributes['end']) ? $attributes['end'] : '';
    $endOptions = isset($end['options']) ? $end['options'] : [];

    $endLibrary = isset($endOptions['library']) ? $endOptions['library'] : '';
    $endSrcType = isset($endOptions['srcType']) ? $endOptions['srcType'] : '';
    $endSrc = isset($endOptions['iconSrc']) ? $endOptions['iconSrc'] : '';
    $endPosition = isset($endOptions['position']) ? $endOptions['position'] : '';
    $endClass = isset($endOptions['class']) ? $endOptions['class'] : '';



    if (
      $previousLibrary == 'fontAwesome' ||
      $nextLibrary == 'fontAwesome' ||
      $startLibrary == 'fontAwesome'
      || $endLibrary == 'fontAwesome'
      || $loadingIconLibrary == 'fontAwesome'
    ) {
      wp_enqueue_style('fontawesome-icons');
    } else if (
      $previousLibrary == 'iconFont' ||
      $nextLibrary == 'iconFont' ||
      $startLibrary == 'iconFont'
      || $endLibrary == 'iconFont'
      || $loadingIconLibrary == 'iconFont'
    ) {
      wp_enqueue_style('icofont-icons');
    } else if (
      $previousLibrary == 'bootstrap' ||
      $nextLibrary == 'bootstrap' ||
      $startLibrary == 'bootstrap'
      || $endLibrary == 'bootstrap'
      || $loadingIconLibrary == 'bootstrap'
    ) {
      wp_enqueue_style('bootstrap-icons');
    }



    $fontPreviousHtml = '<span class="' . $previousClass . ' ' . $previousSrc . '"></span>';
    $fontNextHtml = '<span class="' . $nextClass . ' ' . $nextSrc . '"></span>';
    $fontStartHtml = '<span class="' . $startClass . ' ' . $startSrc . '"></span>';
    $fontEndHtml = '<span class="' . $endClass . ' ' . $endSrc . '"></span>';
    $fontLoadingIconHtml = '<span class="' . $loadingIconClass . ' ' . $loadingIconSrc . '"></span>';
    $fontLoadMoreIconHtml = '<span class="' . $loadMoreIconClass . ' ' . $loadMoreIconSrc . '"></span>';






    //var_dump($maxPageNum);

    $layout = isset($attributes['layout']) ? $attributes['layout'] : [];

    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : ['items' => []];

    $postGridCssY[] = isset($blockCssY["items"]) ? $blockCssY["items"] : [];


    ob_start();






    if (get_query_var('paged')) {
      $paged = get_query_var('paged');
    } elseif (get_query_var('page')) {
      $paged = get_query_var('page');
    } else {
      $paged = 1;
    }

    $postGridScriptData[$postGridId]['pagination']['type'] = $paginationType;
    $postGridScriptData[$postGridId]['pagination']['prevText'] = $prevText;
    $postGridScriptData[$postGridId]['pagination']['nextText'] = $nextText;
    $postGridScriptData[$postGridId]['pagination']['maxPageNum'] = $maxPageNum;
    $postGridScriptData[$postGridId]['pagination']['noMorePosts'] = $noMorePosts;
    $postGridScriptData[$postGridId]['pagination']['loadMoreText'] = $loadMoreText;
    $postGridScriptData[$postGridId]['pagination']['loadingText'] = $loadingText;
    $postGridScriptData[$postGridId]['pagination']['page'] = $paged;
    $postGridScriptData[$postGridId]['pagination']['loadingIcon'] = '<i class="loademore-icon ' . $loadingIconSrc . '"></i>';



    $blockArgs = [
      'blockId' => $postGridId,
      'pagination' => [
        'type' => $paginationType,
        'loadMoreText' => $loadMoreText,
        'loadingText' => $loadingText,
        'noMorePosts' => $noMorePosts,
        'loadingIcon' => '<i class="' . $loadingIconSrc . '"></i>',
        'loadMoreIcon' => '<i class="' . $loadMoreIconSrc . '"></i>',
        'loadMorePosition' => $loadMorePosition,
        'loadingPosition' => $loadingPosition,
        'page' => $paged,
        'prevText' => $prevText,
        'nextText' => $nextText,
        'maxPageNum' => $maxPageNum,
      ],
      'noPosts' => false
    ];

    



    $max_num_pages = isset($PGPostQuery->max_num_pages) ? $PGPostQuery->max_num_pages : 0;;

    if ($previousPosition == "beforeText") {
      $prevText = $fontPreviousHtml . $prevText;
    } elseif ($previousPosition == "afterText") {
      $prevText =  $prevText . $fontPreviousHtml;
    } else {
      $prevText;
    }

    if ($nextPosition == "beforeText") {
      $nextText = $fontNextHtml . $nextText;
    } elseif ($nextPosition == "afterText") {
      $nextText =  $nextText . $fontNextHtml;
    } else {
      $nextText;
    }


?>







    <?php if ($paginationType == 'normal') : ?>
      <div id="pagination-<?php echo esc_attr($blockId); ?>" class="pagination <?php echo esc_attr($blockId); ?> PGBlockPostGrid-pagination <?php echo esc_attr($paginationType); ?>" blockArgs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
        <?php
        $big = 999999999; // need an unlikely integer



        $pages = paginate_links(
          array(
            'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
            'format' => '?paged=%#%',
            'current' => max(1, $paged),
            'total' => $max_num_pages,
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
      </div>
    <?php endif; ?>


    <?php if ($paginationType == 'ajax') : ?>
      <div id="pagination-<?php echo esc_attr($blockId); ?>" class="pagination <?php echo esc_attr($blockId); ?> PGBlockPostGrid-pagination <?php echo esc_attr($paginationType); ?>" blockArgs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
        <?php
        $big = 999999999; // need an unlikely integer



        $pages = paginate_links(
          array(
            'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
            'format' => '?paged=%#%',
            'current' => max(1, $paged),
            'total' => $max_num_pages,
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
      </div>
    <?php endif; ?>

    <?php if ($paginationType == 'filterable') : ?>
      <div id="pagination-<?php echo esc_attr($blockId); ?>" class="<?php echo esc_attr($blockId); ?>  pagination PGBlockPostGrid-pagination <?php echo esc_attr($paginationType); ?> pager-list mixitup-page-list pager-list-<?php echo esc_attr($postGridId); ?>" blockArgs="<?php echo esc_attr(json_encode($blockArgs)); ?>">

      </div>
    <?php endif; ?>





    <?php if ($paginationType == 'next_previous') :


      if ($max_num_pages) {
    ?>
        <div id="pagination-<?php echo esc_attr($blockId); ?>" class="pagination <?php echo esc_attr($blockId); ?> PGBlockPostGrid-pagination <?php echo esc_attr($paginationType); ?>" blockArgs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
          <a class="page-numbers" href="<?php echo esc_url_raw(get_previous_posts_page_link()); ?>">
            <?php echo wp_kses_post($prevText); ?>
          </a>
          <a class="page-numbers" href="<?php echo esc_url_raw(get_next_posts_page_link()); ?>">
            <?php echo wp_kses_post($nextText); ?>
          </a>
        </div>
      <?php
      }

      ?>

    <?php endif; ?>

    <?php if ($paginationType == 'loadmore') : ?>
      <div id="pagination-<?php echo esc_attr($blockId); ?>" class="pagination <?php echo esc_attr($blockId); ?> PGBlockPostGrid-pagination <?php echo esc_attr($paginationType); ?>" blockArgs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
        <div class="page-numbers">
          <?php if ($loadMorePosition == 'beforeText') : ?>
            <?php echo wp_kses_post($fontLoadMoreIconHtml); ?>
          <?php endif; ?>
          <?php echo wp_kses_post($loadMoreText); ?>
          <?php if ($loadMorePosition == 'afterText') : ?>
            <?php echo wp_kses_post($fontLoadMoreIconHtml); ?>
          <?php endif; ?>
        </div>
      </div>
    <?php endif; ?>

    <?php if ($paginationType == 'infinite') : ?>
      <div id="pagination-<?php echo esc_attr($blockId); ?>" class="pagination <?php echo esc_attr($blockId); ?> PGBlockPostGrid-pagination <?php echo esc_attr($paginationType); ?>" blockArgs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
        <div class="infinite-loader box">
          <?php echo __('Loading...', 'post-grid'); ?>
        </div>
      </div>

    <?php endif; ?>











<?php return ob_get_clean();
  }
}

$BlockPostGrid = new PGBlockPostQueryPagination();
