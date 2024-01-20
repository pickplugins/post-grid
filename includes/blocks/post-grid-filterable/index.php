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


  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    //wp_register_style('pgpostgrid_editor_style', post_grid_plugin_url . 'includes/blocks/post-grid/index.css');
    //wp_register_script('pgpostgrid_editor_script', post_grid_plugin_url . 'includes/blocks/post-grid/index.js', array('wp-blocks', 'wp-element'));




    register_block_type(
      post_grid_plugin_dir . 'build/blocks/post-grid-filterable/block.json',
      array(
        'title' => "Post Grid -  Filterable",
        'render_callback' => array($this, 'theHTML'),


      )
    );
  }

  function front_scripts($attributes)
  {
    wp_register_script('pgpostgrid_filterable_front_script', post_grid_plugin_url . 'includes/blocks/post-grid-filterable/front-scripts.js', []);
    wp_register_style('pgpostgrid_filterable_front_style', post_grid_plugin_url . 'includes/blocks/post-grid-filterable/index.css');
    if (has_block('post-grid/post-grid-filterable')) {

      // wp_enqueue_script('pgpostgrid_filterable_front_script');
      // wp_enqueue_style('pgpostgrid_filterable_front_style');
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

    $post_url = get_the_permalink($post_ID);
    $the_post = get_post($post_ID);
    $post_excerpt = '';

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







    $containerClass = parse_css_class($containerClass, $obj);
    ob_start();



?>



    <div <?php echo ($lazyLoadEnable == 'yes') ? 'style="display: none;" ' : ''; ?> class="<?php echo esc_attr($blockId); ?> ">
      <?php echo $content ?>
    </div>
<?php

    return ob_get_clean();
  }
}

$BlockPostGrid = new PGBlockPostGridFilterable();
