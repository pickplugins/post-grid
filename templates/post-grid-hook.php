<?php
if (!defined('ABSPATH')) exit;  // if direct access




add_action('post_grid_main', 'post_grid_main_lazy', 5);

function post_grid_main_lazy($atts)
{


  $grid_id = $atts['id'];
  $post_grid_options = get_post_meta($grid_id, 'post_grid_meta_options', true);

  $lazy_load_enable = isset($post_grid_options['lazy_load_enable']) ? $post_grid_options['lazy_load_enable'] : 'grid';
  $lazy_load_image_src = isset($post_grid_options['lazy_load_image_src']) ? $post_grid_options['lazy_load_image_src'] : '';
  $lazy_load_alt_text = isset($post_grid_options['lazy_load_alt_text']) ? $post_grid_options['lazy_load_alt_text'] : '';



?>
  <?php
  if ($lazy_load_enable == 'yes') :
  ?>
    <div id="post-grid-lazy-<?php echo esc_attr($grid_id); ?>" class="post-grid-lazy"><img alt="<?php echo esc_attr($lazy_load_alt_text); ?>" src="<?php echo esc_url($lazy_load_image_src); ?>" /></div>
    <script>
      jQuery('#post-grid-lazy-<?php echo esc_attr($grid_id); ?>').ready(function($) {
        $('#post-grid-lazy-<?php echo esc_attr($grid_id); ?>').fadeOut();
        $('#post-grid-<?php echo esc_attr($grid_id); ?>   ').fadeIn();
      })
    </script>
    <style type="text/css">
      <?php echo esc_attr('#post-grid-' . $grid_id);

      ?> {
        display: none;
      }

      .post-grid-lazy {
        text-align: center;
      }
    </style>
  <?php
  endif;
}



add_action('post_grid_main', 'post_grid_main_container', 10);

function post_grid_main_container($atts)
{

  global  $post_grid_css;

  $grid_id = $atts['id'];
  $post_grid_options = get_post_meta($grid_id, 'post_grid_meta_options', true);

  $grid_type = isset($post_grid_options['grid_type']) ? $post_grid_options['grid_type'] : 'grid';

  $args['grid_id'] = $grid_id;
  $args['options'] = $post_grid_options;


  $lazy_load_enable = isset($post_grid_options['lazy_load_enable']) ? $post_grid_options['lazy_load_enable'] : 'grid';
  $masonry_enable = !empty($post_grid_options['masonry_enable']) ? $post_grid_options['masonry_enable'] : 'no';
  $grid_type = isset($post_grid_options['grid_type']) ? $post_grid_options['grid_type'] : 'grid';

  $page_type = '';

  $post_grid_js_args = array();

  if (is_category() || is_tag() || is_tax()) {
    $term = get_queried_object();
    $taxonomy = isset($term->taxonomy) ? $term->taxonomy : '';
    $term_id = isset($term->term_id) ? $term->term_id : '';

    $post_grid_js_args['page_type'] = 'taxonomy';
    $post_grid_js_args['page_taxonomy'] = $taxonomy;
    $post_grid_js_args['page_tax_term'] = $term_id;
  }


  $post_grid_js_args['id'] = $grid_id;
  $post_grid_js_args['lazy_load'] = $lazy_load_enable;
  $post_grid_js_args['masonry_enable'] = $masonry_enable;
  $post_grid_js_args['view_type'] = $grid_type;




  $post_grid_js_args = apply_filters('post_grid_js_args', $post_grid_js_args, $args);


  ?>
  <div data-options='<?php echo esc_attr(json_encode($post_grid_js_args)); ?>' id="post-grid-<?php echo esc_attr($grid_id); ?>" class="post-grid <?php echo esc_attr($grid_type); ?>">
    <?php
    do_action('post_grid_container', $args);
    ?>
  </div>
<?php



}


add_action('post_grid_container', 'post_grid_container_search', 5);

function post_grid_container_search($args)
{

  $post_grid_settings = get_option('post_grid_settings');

  $grid_id = $args['grid_id'];
  $post_grid_options = $args['options'];

  $font_aw_version = isset($post_grid_settings['font_aw_version']) ? $post_grid_settings['font_aw_version'] : 'v_5';

  $search_action_type = !empty($post_grid_options['nav_top']['action_type']) ? $post_grid_options['nav_top']['action_type'] : 'ajax';

  $nav_top_search = isset($post_grid_options['nav_top']['search']) ? $post_grid_options['nav_top']['search'] : 'no';

  if ($nav_top_search != 'yes') return;





  $page_url = get_permalink(get_the_ID());
?>
  <div class="post-grid-search <?php echo esc_attr($search_action_type); ?>">
    <form grid_id="<?php echo esc_attr($grid_id); ?>" action="<?php echo esc_url($page_url); ?>" method="get">
      <?php

      do_action('post_grid_search', $args);

      ?>

    </form>

  </div>

<?php



}

add_action('post_grid_search', 'post_grid_search_keyword_field', 10);

function post_grid_search_keyword_field($args)
{

  $post_grid_options = $args['options'];

  $grid_id = isset($args['grid_id']) ? $args['grid_id'] : '';
  $font_aw_version = isset($post_grid_settings['font_aw_version']) ? $post_grid_settings['font_aw_version'] : 'v_5';
  if ($font_aw_version == 'v_5') {
    $nav_top_search_icon = '<i class="fas fa-search"></i>';
  } elseif ($font_aw_version == 'v_4') {
    $nav_top_search_icon = '<i class="fa fa-search"></i>';
  }


  //    if($grid_id != 2147) return;
  // 7 is grid ID where you want to display this input field
  $nav_top_search_placeholder = isset($post_grid_options['nav_top']['search_placeholder']) ? $post_grid_options['nav_top']['search_placeholder'] : __('Start typing', 'post-grid');
  $nav_top_search_icon = isset($post_grid_options['nav_top']['search_icon']) ? $post_grid_options['nav_top']['search_icon'] : $nav_top_search_icon;


  $keyword = isset($_GET['keyword']) ? sanitize_text_field($_GET['keyword']) : '';

?>
  <div class="field-wrap field-wrap-keyword">

    <span class="search-icon"><?php echo $nav_top_search_icon; ?></span>
    <input grid_id="<?php echo esc_attr($grid_id); ?>" title="<?php echo __('Press enter to reset', 'post-grid'); ?>" class="search" type="text" name="keyword" placeholder="<?php echo esc_attr($nav_top_search_placeholder); ?>" value="<?php echo esc_attr($keyword); ?>">

  </div>


<?php

}



add_action('post_grid_search', 'post_grid_search_submit_field', 90);

function post_grid_search_submit_field($args)
{

  $post_grid_options = $args['options'];

  $grid_id = isset($args['grid_id']) ? $args['grid_id'] : '';


  $font_aw_version = isset($post_grid_settings['font_aw_version']) ? $post_grid_settings['font_aw_version'] : 'v_5';
  if ($font_aw_version == 'v_5') {
    $nav_top_search_icon = '<i class="fas fa-search"></i>';
  } elseif ($font_aw_version == 'v_4') {
    $nav_top_search_icon = '<i class="fa fa-search"></i>';
  }


  //    if($grid_id != 2147) return;
  // 7 is grid ID where you want to display this input field
  $nav_top_search_placeholder = isset($post_grid_options['nav_top']['search_placeholder']) ? $post_grid_options['nav_top']['search_placeholder'] : __('Start typing', 'post-grid');
  $nav_top_search_icon = isset($post_grid_options['nav_top']['search_icon']) ? $post_grid_options['nav_top']['search_icon'] : $nav_top_search_icon;
  $search_loading_icon = isset($post_grid_options['nav_top']['search_loading_icon']) ? $post_grid_options['nav_top']['search_loading_icon'] : '';



?>
  <div class="field-wrap field-wrap-submit">

    <?php wp_nonce_field('post_grid_search_nonce', '_wpnonce', false); ?>

    <input type="submit" value="<?php echo __('Search', 'post-grid'); ?>">
    <span class="search-loading"><?php echo $search_loading_icon; ?></span>

  </div>


  <?php

}




add_action('post_grid_container', 'post_grid_posts_loop', 10);

function post_grid_posts_loop($args)
{

  global $wp_query;

  $post_grid_options = $args['options'];
  $grid_id = $args['grid_id'];

  $post_types = isset($post_grid_options['post_types']) ? $post_grid_options['post_types'] : array('post');
  $keyword = isset($post_grid_options['keyword']) ? $post_grid_options['keyword'] : '';
  $exclude_post_id = isset($post_grid_options['exclude_post_id']) ? $post_grid_options['exclude_post_id'] : '';
  $exclude_post_id = !empty($exclude_post_id) ? array_map('intval', explode(',', $exclude_post_id)) : array();

  $include_post_id = isset($post_grid_options['include_post_id']) ? $post_grid_options['include_post_id'] : '';
  $include_post_id = !empty($include_post_id) ? array_map('intval', explode(',', $include_post_id)) : array();


  $post_status = isset($post_grid_options['post_status']) ? $post_grid_options['post_status'] : 'publish';
  $query_order = isset($post_grid_options['query_order']) ? $post_grid_options['query_order'] : 'DESC';
  $query_orderby = isset($post_grid_options['query_orderby']) ? $post_grid_options['query_orderby'] : array('date');
  $query_orderby = implode(' ', $query_orderby);
  $offset = isset($post_grid_options['offset']) ? (int)$post_grid_options['offset'] : '';
  $posts_per_page = isset($post_grid_options['posts_per_page']) ? $post_grid_options['posts_per_page'] : 10;
  $query_orderby_meta_key = isset($post_grid_options['query_orderby_meta_key']) ? $post_grid_options['query_orderby_meta_key'] : '';
  $ignore_paged = isset($post_grid_options['ignore_paged']) ? $post_grid_options['ignore_paged'] : 'no';


  $taxonomies = !empty($post_grid_options['taxonomies']) ? $post_grid_options['taxonomies'] : array();
  $categories_relation = isset($post_grid_options['categories_relation']) ? $post_grid_options['categories_relation'] : 'OR';

  $query_args = array();



  /* ################################ Tax query ######################################*/

  $tax_query = array();

  foreach ($taxonomies as $taxonomy => $taxonomyData) {

    $terms = !empty($taxonomyData['terms']) ? $taxonomyData['terms'] : array();
    $terms_relation = !empty($taxonomyData['terms_relation']) ? $taxonomyData['terms_relation'] : 'OR';
    $checked = !empty($taxonomyData['checked']) ? $taxonomyData['checked'] : '';

    if (!empty($terms) && !empty($checked)) {
      $tax_query[] = array(
        'taxonomy' => $taxonomy,
        'field'    => 'term_id',
        'terms'    => $terms,
        'operator'    => $terms_relation,
      );
    }
  }


  $tax_query_relation = array('relation' => $categories_relation);
  $tax_query = array_merge($tax_query_relation, $tax_query);


  /* ################################ Keyword query ######################################*/

  //$keyword = isset($_GET['keyword']) ? sanitize_text_field($_GET['keyword']) : $keyword;


  /* ################################ Single pages ######################################*/


  if (is_singular()) :
    $current_post_id = get_the_ID();
    $query_args['post__not_in'] = array($current_post_id);
  endif;




  if (get_query_var('paged')) {
    $paged = get_query_var('paged');
  } elseif (get_query_var('page')) {
    $paged = get_query_var('page');
  } else {
    $paged = 1;
  }

  if ($ignore_paged == 'yes') {
    $paged = 1;
  }



  if (!empty($post_types))
    $query_args['post_type'] = $post_types;

  if (!empty($post_status))
    $query_args['post_status'] = $post_status;

  if (!empty($keyword))
    $query_args['s'] = $keyword;


  if (!empty($exclude_post_id))
    $query_args['post__not_in'] = $exclude_post_id;

  if (!empty($include_post_id))
    $query_args['post__in'] = $include_post_id;


  if (!empty($query_order))
    $query_args['order'] = $query_order;

  if (!empty($query_orderby))
    $query_args['orderby'] = $query_orderby;

  if (!empty($query_orderby_meta_key))
    $query_args['meta_key'] = $query_orderby_meta_key;

  if (!empty($posts_per_page))
    $query_args['posts_per_page'] = (int)$posts_per_page;

  if (!empty($paged))
    $query_args['paged'] = $paged;

  if (!empty($offset))
    $query_args['offset'] = $offset + (($paged - 1) * $posts_per_page);


  if (!empty($tax_query))
    $query_args['tax_query'] = $tax_query;



  if (!empty($_GET['lang']))
    $query_args['lang'] = sanitize_text_field($_GET['lang']);




  $query_args = apply_filters('post_grid_filter_query_args', $query_args, $grid_id);
  $query_args = apply_filters('post_grid_query_args', $query_args, $args);




  $post_grid_wp_query = new WP_Query($query_args);

  $wp_query = $post_grid_wp_query;



  $loop_count = 0;

  if ($post_grid_wp_query->have_posts()) :

    do_action('post_grid_loop_top', $args);

  ?>
    <div class="<?php echo esc_attr(apply_filters('post_grid_grid_items_class', 'grid-items', $args)); ?>">
      <?php
      do_action('post_grid_before_loop', $args);

      while ($post_grid_wp_query->have_posts()) : $post_grid_wp_query->the_post();
        $post_id = get_the_ID();
        $args['post_id'] = $post_id;
        $args['loop_count'] = $loop_count;


        do_action('post_grid_loop', $args);

        $loop_count++;
      endwhile;

      do_action('post_grid_after_loop', $args);

      ?>
    </div>
  <?php
    do_action('post_grid_loop_bottom', $args, $post_grid_wp_query);



  else :
  ?>
    <div class="no-post-found">
      <?php
      do_action('post_grid_loop_no_post', $args);
      ?>
    </div>
  <?php
  endif;

  wp_reset_query();
  wp_reset_postdata();
}

add_filter('post_grid_query_args', 'post_grid_query_args_search', 10, 2);

function post_grid_query_args_search($query_args, $args)
{

  if (isset($_GET['_wpnonce']) &&  wp_verify_nonce($_GET['_wpnonce'], 'post_grid_search_nonce')) {

    $keyword = isset($_GET['keyword']) ? sanitize_text_field($_GET['keyword']) : '';

    if (!empty($keyword))
      $query_args['s'] = $keyword;
  }




  return $query_args;
}




add_action('post_grid_loop_no_post', 'post_grid_loop_no_post', 10);

function post_grid_loop_no_post($args)
{

  $post_grid_options = $args['options'];

  $no_post_text = !empty($post_grid_options['no_post_text']) ? $post_grid_options['no_post_text'] : __('No post found', 'post-grid');

  ?>
  <div class="no-post-found">
    <?php echo apply_filters('post_grid_no_post_text', $no_post_text); ?>
  </div>
<?php

}



add_action('post_grid_loop', 'post_grid_loop', 10);

function post_grid_loop($args)
{

  $post_id = $args['post_id'];
  $loop_count = $args['loop_count'];
  $post_grid_options = $args['options'];


  $enable_multi_skin = isset($post_grid_options['enable_multi_skin']) ? $post_grid_options['enable_multi_skin'] : 'no';
  $skin = isset($post_grid_options['skin']) ? $post_grid_options['skin'] : 'flat';
  $layout_id = isset($post_grid_options['layout_id']) ? $post_grid_options['layout_id'] : '';


  if ($loop_count % 2 == 0) {
    $odd_even_class = 'even';
  } else {
    $odd_even_class = 'odd';
  }

  $odd_even_class = $odd_even_class . ' ' . $loop_count;


  $post_options = get_post_meta($post_id, 'post_grid_post_settings', true);

  if ($enable_multi_skin == 'yes') {

    $skin = !empty($post_options['post_skin']) ? $post_options['post_skin'] : $skin;
  }

  $item_css_class = array();

  $item_css_class['item'] = 'item';
  $item_css_class['item_id'] = 'item-' . $post_id;

  $item_css_class['skin'] = 'skin ' . $skin;
  $item_css_class['odd_even'] = $odd_even_class;




  $item_css_class = apply_filters('post_grid_item_classes', $item_css_class, $args);
  $item_css_class = implode(' ', $item_css_class);

?><div class="<?php echo esc_attr($item_css_class); ?> ">
    <?php
    do_action('post_grid_item_top', $args);
    ?>
    <div class="layer-wrapper layout-<?php echo esc_attr($layout_id); ?>">
      <?php

      $layout_args['layout_id'] = !empty($layout_id) ? $layout_id  : $skin;
      $layout_args['post_id'] = $post_id;
      $layout_args['options'] = $post_grid_options;

      do_action('post_grid_item_layout', $layout_args);

      ?>
    </div>
  </div><?php
      }





      add_action('post_grid_item_layout', 'post_grid_item_layout_media', 10);

      function post_grid_item_layout_media($args)
      {

        $post_id = $args['post_id'];
        $post_grid_options = $args['options'];

        $layout_id = isset($post_grid_options['layout_id']) ? $post_grid_options['layout_id'] : '';

        if (!empty($layout_id)) return;


        $media_source = !empty($post_grid_options['media_source']) ? $post_grid_options['media_source'] : array();
        $featured_img_size = !empty($post_grid_options['featured_img_size']) ? $post_grid_options['featured_img_size'] : 'full';
        $thumb_linked = !empty($post_grid_options['thumb_linked']) ? $post_grid_options['thumb_linked'] : 'yes';


        $html_media = '';

        $is_image = false;
        foreach ($media_source as $source_info) {

          $media = post_grid_get_media($post_id, $source_info['id'], $featured_img_size, $thumb_linked);

          if ($is_image) continue;

          if (!empty($source_info['checked'])) {
            if (!empty($media)) {

              $html_media = post_grid_get_media($post_id, $source_info['id'], $featured_img_size, $thumb_linked);
              $is_image = true;
            } else {
              $html_media = '';
            }
          }
        }



        $html_media = apply_filters('post_grid_filter_html_media', $html_media);


        ?>
  <div class="layer-media"><?php echo $html_media; ?></div>
<?php

      }




      add_action('post_grid_item_layout', 'post_grid_item_layout_content', 20);

      function post_grid_item_layout_content($args)
      {

        $post_id = $args['post_id'];
        $post_grid_options = $args['options'];
        $skin = $args['layout_id'];

        $layout_id = isset($post_grid_options['layout_id']) ? $post_grid_options['layout_id'] : '';

        if (!empty($layout_id)) return;

        $post_grid_layout_content = get_option('post_grid_layout_content');
        $class_post_grid_functions = new class_post_grid_functions();

        $layout_content = isset($post_grid_options['layout']['content']) ? $post_grid_options['layout']['content'] : 'flat';



        if (empty($post_grid_layout_content)) {
          $layout = $class_post_grid_functions->layout_content($layout_content);
        } else {

          if (!empty($post_grid_layout_content[$layout_content])) {
            $layout = $post_grid_layout_content[$layout_content];
          } else {
            $layout = array();
          }
        }

?>
  <div class="layer-content">
    <?php
        foreach ($layout as $elementIndex => $element) {
          $element_id = isset($element['key']) ? $element['key'] : '';

          if (empty($element_id)) return;

          $element_args['element'] = $element;
          $element_args['index'] = $elementIndex;

          $element_args['post_id'] = $post_id;
          $element_args['layout_id'] = $post_id;

          do_action('post_grid_layout_element_' . $element_id, $element_args);
        }

    ?>
  </div>
<?php





      }

      add_action('post_grid_container', 'post_grid_container_old_layout_css', 20);

      function post_grid_container_old_layout_css($args)
      {

        $post_grid_options = $args['options'];

        $layout_id = isset($post_grid_options['layout_id']) ? $post_grid_options['layout_id'] : '';

        if (!empty($layout_id)) return;


        $grid_id = isset($args['grid_id']) ? $args['grid_id'] : '';
        $post_grid_options = isset($args['options']) ? $args['options'] : [];
        $layout_content = isset($post_grid_options['layout']['content']) ? $post_grid_options['layout']['content'] : 'flat';

        $class_post_grid_functions = new class_post_grid_functions();

        $post_grid_layout_content = get_option('post_grid_layout_content');

        if (empty($post_grid_layout_content)) {
          $layout = $class_post_grid_functions->layout_content($layout_content);
        } else {
          if (!empty($post_grid_layout_content[$layout_content])) {
            $layout = $post_grid_layout_content[$layout_content];
          } else {
            $layout = array();
          }
        }



?>
  <style type="text/css">
    <?php foreach ($layout as $item_id => $item_info) {
          $item_css = isset($item_info['css']) ? $item_info['css'] : '';
          $item_key = isset($item_info['key']) ? $item_info['key'] : '';

          if ($item_key == 'categories' || $item_key == 'tags') {
    ?><?php echo esc_attr('#post-grid-' . $grid_id);
      ?><?php echo esc_attr(' .element_' . $item_id);

        ?>a {
      <?php echo esc_attr($item_css);
      ?>
    }

    <?php
          } elseif ($item_key == 'down_arrow') {
            $arrow_size = $item_info['arrow_size'];
            $arrow_bg_color = $item_info['arrow_bg_color'];
    ?><?php echo esc_attr('#post-grid-' . $grid_id);
      ?><?php echo esc_attr(' .element_' . $item_id);

        ?> {
      <?php echo esc_attr($item_css);
      ?>
    }

    <?php echo esc_attr('#post-grid-' . $grid_id);
    ?><?php echo esc_attr(' .element_' . $item_id);

      ?> {
      border-left: <?php echo esc_attr($arrow_size);
                    ?>solid rgba(0, 0, 0, 0);
      border-right: <?php echo esc_attr($arrow_size);
                    ?>solid rgba(0, 0, 0, 0);
      border-top: <?php echo esc_attr($arrow_size);
                  ?>solid <?php echo esc_attr($arrow_bg_color);
                          ?>;
      height: 0;
      width: 0;
    }

    <?php
          } elseif ($item_key == 'up_arrow') {
            $arrow_size = $item_info['arrow_size'];
            $arrow_bg_color = $item_info['arrow_bg_color'];
    ?><?php echo esc_attr('#post-grid-' . $grid_id);
      ?><?php echo esc_attr(' .element_' . $item_id);

        ?> {
      <?php echo esc_attr($item_css);
      ?>
    }

    <?php echo esc_attr('#post-grid-' . $grid_id);
    ?><?php echo esc_attr(' .element_' . $item_id);

      ?> {
      border-bottom: <?php echo esc_attr($arrow_size);
                      ?>solid <?php echo esc_attr($arrow_bg_color);
                              ?>;
      border-left: <?php echo esc_attr($arrow_size);
                    ?>solid transparent;
      border-right: <?php echo esc_attr($arrow_size);
                    ?>solid transparent;
      height: 0;
      width: 0;
    }

    <?php
          } else {
    ?><?php echo esc_attr('#post-grid-' . $grid_id);
      ?><?php echo esc_attr(' .element_' . $item_id);

        ?> {
      <?php echo esc_attr($item_css);
      ?>
    }

    <?php
          }
        }

        foreach ($layout as $item_id => $item_info) {
          $item_css_hover = $item_info['css_hover'];
          echo esc_attr('#post-grid-' . $grid_id) . ' .element_' . esc_attr($item_id) . ':hover{' . esc_attr($item_css_hover) . '}';
        }

    ?>
  </style>
<?php
      }

      add_action('post_grid_item_layout', 'post_grid_item_layout_new', 30);

      function post_grid_item_layout_new($args)
      {

        $post_id = $args['post_id'];
        $post_grid_options = $args['options'];
        $layout_id = $args['layout_id'];

        if (empty($layout_id)) return;


        $layout_elements_data = get_post_meta($layout_id, 'layout_elements_data', true);





        if (!empty($layout_elements_data))
          foreach ($layout_elements_data as $elementIndex => $elementData) {
            foreach ($elementData as $elementId => $element) {


              $element_args['element'] = $element;
              $element_args['index'] = $elementIndex;

              $element_args['post_id'] = $post_id;
              $element_args['layout_id'] = $layout_id;

              do_action('post_grid_layout_element_' . $elementId, $element_args);
            }
          }
      }



      add_action('post_grid_loop_bottom', 'post_grid_loop_bottom_pagination', 10, 2);

      function post_grid_loop_bottom_pagination($args, $post_grid_wp_query)
      {

        $post_grid_options = $args['options'];

        $pagination_type = isset($post_grid_options['nav_bottom']['pagination_type']) ? $post_grid_options['nav_bottom']['pagination_type'] : 'normal';
        $grid_type = !empty($post_grid_options['grid_type']) ? $post_grid_options['grid_type'] : 'grid';
        $nav_top = !empty($post_grid_options['nav_top']) ? $post_grid_options['nav_top'] : [];
        $action_type = !empty($post_grid_options['action_type']) ? $post_grid_options['action_type'] : 'form_submit';



        if ($pagination_type == 'none') return;

        $pagination_type = ($action_type == 'ajax') ? 'ajax_pagination' : $pagination_type;

        $pagination_type = ($grid_type == 'filterable') ? 'jquery' : $pagination_type;


        wp_enqueue_script('scrollto');



?>
  <div class="pagination">
    <?php
        do_action('post_grid_pagination_' . $pagination_type, $args, $post_grid_wp_query);
    ?>
  </div>
<?php

      }


      add_action('post_grid_pagination_normal', 'post_grid_pagination_normal', 10, 2);

      function post_grid_pagination_normal($args, $post_grid_wp_query)
      {


        $post_grid_options = isset($args['options']) ? $args['options'] : [];
        $grid_id = isset($args['grid_id']) ? $args['grid_id'] : '';

        if (get_query_var('paged')) {
          $paged = get_query_var('paged');
        } elseif (get_query_var('page')) {
          $paged = get_query_var('page');
        } else {
          $paged = 1;
        }

        $max_num_pages = isset($post_grid_wp_query->max_num_pages) ? $post_grid_wp_query->max_num_pages : 0;

        $pagination_prev_text = !empty($post_grid_options['pagination']['prev_text']) ? $post_grid_options['pagination']['prev_text'] : __('« Previous', 'post-grid');
        $pagination_next_text = !empty($post_grid_options['pagination']['next_text']) ? $post_grid_options['pagination']['next_text'] : __('Next »', 'post-grid');
        $pagination_max_num_pages = !empty($post_grid_options['pagination']['max_num_pages']) ? $post_grid_options['pagination']['max_num_pages'] : $max_num_pages;

        $pagination_font_size = !empty($post_grid_options['pagination']['font_size']) ? $post_grid_options['pagination']['font_size'] : '17px';
        $pagination_font_color = !empty($post_grid_options['pagination']['font_color']) ? $post_grid_options['pagination']['font_color'] : '#646464';
        $pagination_bg_color = !empty($post_grid_options['pagination']['bg_color']) ? $post_grid_options['pagination']['bg_color'] : '#646464';
        $pagination_active_bg_color = !empty($post_grid_options['pagination']['active_bg_color']) ? $post_grid_options['pagination']['active_bg_color'] : '#4b4b4b';

?>
  <div class="paginate">
    <?php
        $big = 999999999; // need an unlikely integer
        echo paginate_links(
          array(
            'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
            'format' => '?paged=%#%',
            'current' => max(1, $paged),
            'total'                 => $pagination_max_num_pages,
            'prev_text'          => $pagination_prev_text,
            'next_text'          => $pagination_next_text,
          )
        );

    ?>
  </div>
  <style type="text/css">
    <?php echo esc_attr('#post-grid-' . $grid_id) . ' .pagination .page-numbers';

    ?> {
      font-size: <?php echo esc_attr($pagination_font_size);
                  ?>;
      color: <?php echo esc_attr($pagination_font_color);
              ?>;
      background: <?php echo esc_attr($pagination_bg_color);
                  ?>;
    }

    <?php echo esc_attr('#post-grid-' . $grid_id) . ' .pagination .page-numbers:hover';
    ?>,
    <?php echo esc_attr('#post-grid-' . $grid_id) . ' .pagination .page-numbers.current';

    ?> {
      background: <?php echo esc_attr($pagination_active_bg_color);
                  ?>;
    }
  </style>
<?php
      }



      add_action('post_grid_container', 'post_grid_custom_css', 90);

      function post_grid_custom_css($args)
      {

        $post_grid_options = $args['options'];
        $grid_type = isset($post_grid_options['grid_type']) ? $post_grid_options['grid_type'] : 'grid';

        //$grid_type = 'masonry';

        //if($grid_type != 'grid' && $grid_type != 'filterable') return;

        $grid_id = isset($args['grid_id']) ? $args['grid_id'] : '';

        do_action('post_grid_view_type_css_' . $grid_type, $args);
      }






      add_action('post_grid_view_type_css_grid', 'post_grid_view_type_css_grid', 90);

      function post_grid_view_type_css_grid($args)
      {

        $post_grid_options = isset($args['options']) ? $args['options'] : [];
        $grid_id = isset($args['grid_id']) ? $args['grid_id'] : '';

        $items_width_desktop = isset($post_grid_options['width']['desktop']) ? $post_grid_options['width']['desktop'] : 3;
        $items_width_tablet = isset($post_grid_options['width']['tablet']) ? $post_grid_options['width']['tablet'] : 2;
        $items_width_mobile = isset($post_grid_options['width']['mobile']) ? $post_grid_options['width']['mobile'] : 1;

        $items_width_desktop = (strpos($items_width_desktop, 'px') === false && strpos($items_width_desktop, '%') === false) ? (int)$items_width_desktop : $items_width_desktop;
        $items_width_tablet = (strpos($items_width_tablet, 'px') === false && strpos($items_width_tablet, '%') === false) ? (int)$items_width_tablet : $items_width_tablet;
        $items_width_mobile = (strpos($items_width_mobile, 'px') === false && strpos($items_width_mobile, '%') === false) ? (int)$items_width_mobile : $items_width_mobile;



        $items_height_style = !empty($post_grid_options['item_height']['style']) ? $post_grid_options['item_height']['style'] : 'auto_height';
        $items_height_style_tablet = !empty($post_grid_options['item_height']['style_tablet']) ? $post_grid_options['item_height']['style_tablet'] : 'auto_height';
        $items_height_style_mobile = !empty($post_grid_options['item_height']['style_mobile']) ? $post_grid_options['item_height']['style_mobile'] : 'auto_height';

        $items_fixed_height = !empty($post_grid_options['item_height']['fixed_height']) ? $post_grid_options['item_height']['fixed_height'] : '220px';
        $items_fixed_height_tablet = !empty($post_grid_options['item_height']['fixed_height_tablet']) ? $post_grid_options['item_height']['fixed_height_tablet'] : '220px';
        $items_fixed_height_mobile = !empty($post_grid_options['item_height']['fixed_height_mobile']) ? $post_grid_options['item_height']['fixed_height_mobile'] : '220px';

        $items_margin = isset($post_grid_options['margin']) ? $post_grid_options['margin'] : '10px';
        $item_padding = isset($post_grid_options['item_padding']) ? $post_grid_options['item_padding'] : '';

        $items_media_height_style = !empty($post_grid_options['media_height']['style']) ? $post_grid_options['media_height']['style'] : 'auto_height';
        $items_media_fixed_height = !empty($post_grid_options['media_height']['fixed_height']) ? $post_grid_options['media_height']['fixed_height'] : '';

        $grid_layout_name = !empty($post_grid_options['grid_layout']['name']) ? $post_grid_options['grid_layout']['name'] : '';
        $grid_layout_col_multi = 3;

        if ($items_height_style == 'auto_height') {
          $items_height = 'auto';
        } elseif ($items_height_style == 'fixed_height') {
          $items_height = $items_fixed_height;
        } elseif ($items_height_style == 'max_height') {
          $items_height = $items_fixed_height;
        } else {
          $items_height = '220px';
        }

        if ($items_media_height_style == 'auto_height') {
          $items_media_height = 'auto';
        } elseif ($items_media_height_style == 'fixed_height') {
          $items_media_height = $items_media_fixed_height;
        } elseif ($items_media_height_style == 'max_height') {
          $items_media_height = $items_media_fixed_height;
        } else {
          $items_media_height = '220px';
        }

        $container_padding = isset($post_grid_options['container']['padding']) ? $post_grid_options['container']['padding'] : '';
        $container_bg_color = isset($post_grid_options['container']['bg_color']) ? $post_grid_options['container']['bg_color'] : '';
        $container_bg_image = isset($post_grid_options['container']['bg_image']) ? $post_grid_options['container']['bg_image'] : '';
        $items_wrapper_text_align = isset($post_grid_options['items_wrapper']['text_align']) ? $post_grid_options['items_wrapper']['text_align'] : 'center';


        $items_bg_color_type = isset($post_grid_options['items_bg_color_type']) ? $post_grid_options['items_bg_color_type'] : '';
        $items_bg_color = isset($post_grid_options['items_bg_color']) ? $post_grid_options['items_bg_color'] : '#fff';


?>
  <style type="text/css">
    <?php echo esc_attr('#post-grid-' . $grid_id);

    ?> {
      <?php if (!empty($container_padding)) : ?>padding: <?php echo esc_attr($container_padding);
                                                          ?>;
      <?php endif;
      ?><?php if (!empty($container_bg_color)) : ?>background-color: <?php echo esc_attr($container_bg_color);
                                                                      ?>;
      <?php endif;
      ?><?php if (!empty($container_bg_image)) : ?>background-image: url(<?php echo esc_attr($container_bg_image);
                                                                          ?>);
      <?php endif;
      ?><?php if (!empty($container_text_align)) : ?>text-align: <?php echo esc_attr($container_text_align);
                                                                  ?>;
      <?php endif;
      ?>
    }

    <?php echo esc_attr('#post-grid-' . $grid_id) . ' .item';

    ?> {
      <?php if (!empty($item_padding)) : ?>padding: <?php echo esc_attr($item_padding);
                                                    ?>;
      <?php endif;
      ?><?php if ($items_bg_color_type == 'fixed') : ?>background: <?php echo esc_attr($items_bg_color);
                                                                    ?>;
      <?php endif;
      ?>
    }

    <?php echo esc_attr('#post-grid-' . $grid_id . ' .item .layer-media');

    ?> {
      <?php if ($items_media_height_style == 'fixed_height' || $items_media_height_style == 'auto_height') {
          echo 'height:' . esc_attr($items_media_height) . ';';
        } elseif ($items_media_height_style == 'max_height') {
          echo 'max-height:' . esc_attr($items_media_height) . ';';
        } else {
          echo 'height:' . esc_attr($items_media_height) . ';';
        }

      ?>
    }

    @media only screen and (min-width: 0px) and (max-width: 767px) {
      <?php echo esc_attr('#post-grid-' . $grid_id . ' .grid-items');

      ?> {
        <?php if (is_integer($items_width_mobile)) :
          $column_html = '';

          for ($i = 1; $i <= $items_width_mobile; $i++) {
            $column_html .= '1fr ';
          }

        ?>display: grid;
        grid-template-columns: <?php echo esc_attr($column_html);
                                ?>;
        column-gap: <?php echo esc_attr($items_margin);
                    ?>;
        row-gap: <?php echo esc_attr($items_margin);
                  ?>;
        <?php else : ?>text-align: <?php echo esc_attr($items_wrapper_text_align);
                                    ?>;
        <?php endif;
        ?>
      }

      <?php echo esc_attr('#post-grid-' . $grid_id . ' .item');

      ?> {
        <?php if (!empty($items_width_mobile) && !is_integer($items_width_desktop)) : ?>width: <?php echo esc_attr($items_width_mobile);
                                                                                                ?>;
        margin: <?php echo esc_attr($items_margin);
                ?>;
        display: inline-block;
        vertical-align: top;
        <?php endif;

        ?><?php if ($items_height_style == 'fixed_height') {
            echo 'height:' . esc_attr($items_height) . ';';
          } elseif ($items_height_style == 'max_height') {
            echo 'max-height:' . esc_attr($items_height) . ';';
          } elseif ($items_height_style == 'auto_height') {
            echo 'height:auto;';
          } else {
            echo 'height:auto;';
          }

          ?>
      }
    }

    @media only screen and (min-width: 768px) and (max-width: 1023px) {
      <?php echo esc_attr('#post-grid-' . $grid_id . ' .grid-items');

      ?> {
        <?php if (is_integer($items_width_tablet)) :
          $column_html = '';

          for ($i = 1; $i <= $items_width_tablet; $i++) {
            $column_html .= '1fr ';
          }

        ?>display: grid;
        grid-template-columns: <?php echo esc_attr($column_html);
                                ?>;
        column-gap: <?php echo esc_attr($items_margin);
                    ?>;
        row-gap: <?php echo esc_attr($items_margin);
                  ?>;
        <?php else : ?>text-align: <?php echo esc_attr($items_wrapper_text_align);
                                    ?>;
        <?php endif;
        ?>
      }

      <?php echo esc_attr('#post-grid-' . $grid_id) . ' .item';

      ?> {
        <?php if (!empty($items_width_tablet) && !is_integer($items_width_desktop)) : ?>width: <?php echo esc_attr($items_width_tablet);
                                                                                                ?>;
        margin: <?php echo esc_attr($items_margin);
                ?>;
        display: inline-block;
        vertical-align: top;
        <?php endif;

        if ($items_height_style_tablet == 'fixed_height') {
          echo 'height:' . esc_attr($items_fixed_height_tablet) . ';';
        } elseif ($items_height_style_tablet == 'max_height') {
          echo 'max-height:' . esc_attr($items_fixed_height_tablet) . ';';
        } elseif ($items_height_style_tablet == 'auto_height') {
          echo 'max-height:auto;';
        } else {
          echo 'height:auto;';
        }

        ?>
      }
    }

    @media only screen and (min-width: 1024px) {
      <?php echo esc_attr('#post-grid-' . $grid_id) . ' .grid-items';

      ?> {
        <?php if (is_integer($items_width_desktop)) : ?><?php $column_html = '';

                                                        for ($i = 1; $i <= $items_width_desktop; $i++) {
                                                          $column_html .= '1fr ';
                                                        }

                                                        ?>display: grid;
        grid-template-columns: <?php echo esc_attr($column_html);
                                ?>;
        column-gap: <?php echo esc_attr($items_margin);
                    ?>;
        row-gap: <?php echo esc_attr($items_margin);
                  ?>;
        <?php else : ?>text-align: <?php echo esc_attr($items_wrapper_text_align);
                                    ?>;
        <?php endif;
        ?>
      }

      <?php echo esc_attr('#post-grid-' . $grid_id) . ' .item';

      ?> {
        <?php if (!empty($items_width_desktop) && !is_integer($items_width_desktop)) : ?>width: <?php echo esc_attr($items_width_desktop);
                                                                                                ?>;
        display: inline-block;
        margin: <?php echo esc_attr($items_margin);
                ?>;
        vertical-align: top;
        <?php endif;

        ?><?php if ($items_height_style == 'fixed_height') {
            echo 'height:' . esc_attr($items_height) . ';';
          } elseif ($items_height_style == 'max_height') {
            echo 'max-height:' . esc_attr($items_height) . ';';
          } elseif ($items_height_style == 'auto_height') {
            echo 'height:auto;';
          } else {
            echo 'height:auto;';
          }

          ?>
      }
    }

    <?php if ($grid_layout_name == 'layout_grid') {
        } elseif ($grid_layout_name == 'layout_1_N') {
          $width = intval((int)$items_width_desktop * $grid_layout_col_multi) + intval((int)$items_margin * 2 * ($grid_layout_col_multi - 1));

    ?>@media only screen and (min-width: 1024px) {
      <?php echo esc_attr('#post-grid-' . $grid_id) . ' .item:first-child';

      ?> {
        width: <?php echo esc_attr($width);
                ?>px;
      }
    }

    <?php
        } elseif ($grid_layout_name == 'layout_N_1') {
          $width = intval((int)$items_width_desktop * $grid_layout_col_multi) + intval((int)$items_margin * 2 * ($grid_layout_col_multi - 1));

    ?>@media only screen and (min-width: 1024px) {
      <?php echo esc_attr('#post-grid-' . $grid_id) . ' .item:last-child';

      ?> {
        width: <?php echo esc_attr($width);
                ?>px;
      }
    }

    <?php
        } elseif ($grid_layout_name == 'layout_3') {
          $width = intval($items_width_desktop) + intval($items_margin);

    ?>@media only screen and (min-width: 1024px) {
      <?php echo esc_attr('#post-grid-' . $grid_id) . ' .item:first-child';

      ?> {
        float: left;
      }

      <?php echo esc_attr('#post-grid-' . $grid_id) . ' .item';

      ?> {
        float: right;
      }
    }

    <?php
        } elseif ($grid_layout_name == 'layout_L_R') {
    ?>@media only screen and (min-width: 1024px) {
      <?php echo esc_attr('#post-grid-' . $grid_id) . ' .item.odd .layer-media';

      ?> {
        float: right;
      }
    }

    <?php
        } elseif ($grid_layout_name == 'layout_1_N_1') {
          $width = intval((int)$items_width_desktop * $grid_layout_col_multi) + intval((int)$items_margin * 2 * ($grid_layout_col_multi - 1));

    ?>@media only screen and (min-width: 1024px) {

      <?php echo esc_attr('#post-grid-' . $grid_id) . ' .item:nth-child(1)';
      ?>,
      <?php echo esc_attr('#post-grid-' . $grid_id) . ' .item:nth-child';

      ?>(<?php echo esc_attr($grid_layout_col_multi + 2); ?>) {
        width: <?php echo esc_attr($width);
                ?>px;
      }
    }

    <?php
        }

    ?>
  </style>
<?php
      }




      add_action('post_grid_view_type_css_masonry', 'post_grid_view_type_css_masonry', 90);

      function post_grid_view_type_css_masonry($args)
      {

        $post_grid_options = $args['options'];
        $grid_id = $args['grid_id'];




        $items_height_style = !empty($post_grid_options['item_height']['style']) ? $post_grid_options['item_height']['style'] : 'auto_height';
        $items_height_style_tablet = !empty($post_grid_options['item_height']['style_tablet']) ? $post_grid_options['item_height']['style_tablet'] : 'auto_height';
        $items_height_style_mobile = !empty($post_grid_options['item_height']['style_mobile']) ? $post_grid_options['item_height']['style_mobile'] : 'auto_height';

        $items_fixed_height = !empty($post_grid_options['item_height']['fixed_height']) ? $post_grid_options['item_height']['fixed_height'] : '220px';
        $items_fixed_height_tablet = !empty($post_grid_options['item_height']['fixed_height_tablet']) ? $post_grid_options['item_height']['fixed_height_tablet'] : '220px';
        $items_fixed_height_mobile = !empty($post_grid_options['item_height']['fixed_height_mobile']) ? $post_grid_options['item_height']['fixed_height_mobile'] : '220px';

        $items_margin = isset($post_grid_options['margin']) ? $post_grid_options['margin'] : '';
        $item_padding = isset($post_grid_options['item_padding']) ? $post_grid_options['item_padding'] : '';

        $items_media_height_style = !empty($post_grid_options['media_height']['style']) ? $post_grid_options['media_height']['style'] : 'auto_height';
        $items_media_fixed_height = !empty($post_grid_options['media_height']['fixed_height']) ? $post_grid_options['media_height']['fixed_height'] : '';



        if ($items_height_style == 'auto_height') {
          $items_height = 'auto';
        } elseif ($items_height_style == 'fixed_height') {
          $items_height = $items_fixed_height;
        } elseif ($items_height_style == 'max_height') {
          $items_height = $items_fixed_height;
        } else {
          $items_height = '220px';
        }

        if ($items_media_height_style == 'auto_height') {
          $items_media_height = 'auto';
        } elseif ($items_media_height_style == 'fixed_height') {
          $items_media_height = $items_media_fixed_height;
        } elseif ($items_media_height_style == 'max_height') {
          $items_media_height = $items_media_fixed_height;
        } else {
          $items_media_height = '220px';
        }

        $container_padding = isset($post_grid_options['container']['padding']) ? $post_grid_options['container']['padding'] : '';
        $container_bg_color = isset($post_grid_options['container']['bg_color']) ? $post_grid_options['container']['bg_color'] : '';
        $container_bg_image = isset($post_grid_options['container']['bg_image']) ? $post_grid_options['container']['bg_image'] : '';

        $items_bg_color_type = isset($post_grid_options['items_bg_color_type']) ? $post_grid_options['items_bg_color_type'] : '';
        $items_bg_color = isset($post_grid_options['items_bg_color']) ? $post_grid_options['items_bg_color'] : '#fff';


        $masonry = !empty($post_grid_options['masonry']) ? $post_grid_options['masonry'] : [];

        $masonry_gutter = isset($masonry['gutter']) ? (int) $masonry['gutter'] : 20;


        $columns_desktop = !empty($masonry['columns']['desktop']) ? (int) $masonry['columns']['desktop'] : 3;
        $columns_tablet = !empty($masonry['columns']['tablet']) ? (int) $masonry['columns']['tablet'] : 2;
        $columns_mobile = !empty($masonry['columns']['mobile']) ? (int) $masonry['columns']['mobile'] : 1;

        wp_enqueue_script('masonry');
        wp_enqueue_script('imagesloaded');



?>
  <style type="text/css">
    <?php echo '#post-grid-' . esc_attr($grid_id);

    ?> {
      overflow: hidden;
      box-sizing: border-box;
      <?php if (!empty($container_padding)) : ?>padding: <?php echo esc_attr($container_padding);
                                                          ?>;
      <?php endif;
      ?><?php if (!empty($container_bg_color)) : ?>background-color: <?php echo esc_attr($container_bg_color);
                                                                      ?>;
      <?php endif;
      ?><?php if (!empty($container_bg_image)) : ?>background-image: url(<?php echo esc_attr($container_bg_image);
                                                                          ?>);
      <?php endif;
      ?>
    }

    <?php echo '#post-grid-' . esc_attr($grid_id) . ' .grid-items';

    ?> {
      box-sizing: border-box;
    }

    <?php echo '#post-grid-' . esc_attr($grid_id) . ' .item';

    ?> {

      margin-bottom: <?php echo esc_attr($masonry_gutter . 'px');
                      ?>;
    }

    <?php echo '#post-grid-' . esc_attr($grid_id) . ' .layer-wrapper';

    ?> {

      <?php if ($items_bg_color_type == 'fixed') : ?>background: <?php echo esc_attr($items_bg_color);
                                                                  ?>;
      <?php endif;
      ?>padding: <?php echo esc_attr($item_padding);
                  ?>;

    }

    <?php echo '#post-grid-' . esc_attr($grid_id) . ' .item .layer-media';

    ?> {
      overflow: hidden;

      <?php if ($items_media_height_style == 'fixed_height' || $items_media_height_style == 'auto_height') {
          echo 'height:' . esc_attr($items_media_height) . ';';
        } elseif ($items_media_height_style == 'max_height') {
          echo 'max-height:' . esc_attr($items_media_height) . ';';
        } else {
          echo 'height:' . $items_media_height . ';';
        }

      ?>
    }

    @media only screen and (min-width: 0px) and (max-width: 767px) {
      <?php echo '#post-grid-' . esc_attr($grid_id) . ' .item';

      ?> {
        <?php $masonry_gutter_mobile = $masonry_gutter * ($columns_mobile - 1);
        ?>width: calc((100% - <?php echo $masonry_gutter_mobile; ?>px) / <?php echo esc_attr($columns_mobile); ?>);

        <?php if ($items_height_style == 'fixed_height') {
          echo 'height:' . esc_attr($items_height) . ';';
        } elseif ($items_height_style == 'max_height') {
          echo 'max-height:' . esc_attr($items_height) . ';';
        } elseif ($items_height_style == 'auto_height') {
          echo 'height:auto;';
        } else {
          echo 'height:auto;';
        }

        ?>
      }
    }

    @media only screen and (min-width: 768px) and (max-width: 1023px) {
      <?php echo '#post-grid-' . esc_attr($grid_id) . ' .item';

      ?> {
        <?php $masonry_gutter_tablet = $masonry_gutter * ($columns_tablet - 1);

        ?>width: calc((100% - <?php echo $masonry_gutter_tablet; ?>px) / <?php echo esc_attr($columns_tablet); ?>);

        <?php if ($items_height_style_tablet == 'fixed_height') {
          echo 'height:' . esc_attr($items_fixed_height_tablet) . ';';
        } elseif ($items_height_style_tablet == 'max_height') {
          echo 'max-height:' . esc_attr($items_fixed_height_tablet) . ';';
        } elseif ($items_height_style_tablet == 'auto_height') {
          echo 'max-height:auto;';
        } else {
          echo 'height:auto;';
        }

        ?>
      }
    }

    @media only screen and (min-width: 1024px) {
      <?php echo '#post-grid-' . esc_attr($grid_id) . ' .item';

      ?> {
        <?php $masonry_gutter_desktop = $masonry_gutter * ($columns_desktop - 1) ?>width: calc((100% - <?php echo $masonry_gutter_desktop; ?>px) / <?php echo esc_attr($columns_desktop); ?>);

        <?php if ($items_height_style == 'fixed_height') {
          echo 'height:' . esc_attr($items_height) . ';';
        } elseif ($items_height_style == 'max_height') {
          echo 'max-height:' . esc_attr($items_height) . ';';
        } elseif ($items_height_style == 'auto_height') {
          echo 'height:auto;';
        } else {
          echo 'height:auto;';
        }

        ?>
      }
    }

    <?php $filterable_font_size = !empty($post_grid_options['nav_top']['filterable_font_size']) ? $post_grid_options['nav_top']['filterable_font_size'] : '14px';
        $filterable_navs_margin = !empty($post_grid_options['nav_top']['filterable_navs_margin']) ? $post_grid_options['nav_top']['filterable_navs_margin'] : '5px';

        $filterable_font_color = !empty($post_grid_options['nav_top']['filterable_font_color']) ? $post_grid_options['nav_top']['filterable_font_color'] : '#999';
        $filterable_bg_color = !empty($post_grid_options['nav_top']['filterable_bg_color']) ? $post_grid_options['nav_top']['filterable_bg_color'] : '#fff';
        $filterable_active_bg_color = !empty($post_grid_options['nav_top']['filterable_active_bg_color']) ? $post_grid_options['nav_top']['filterable_active_bg_color'] : '#ddd';
    ?><?php echo '#post-grid-' . esc_attr($grid_id) . ' .nav-filter .filter';

      ?> {
      font-size: <?php echo esc_attr($filterable_font_size);
                  ?>;
      color: <?php echo esc_attr($filterable_font_color);
              ?>;
      background: <?php echo esc_attr($filterable_bg_color);
                  ?>;
      margin: <?php echo esc_attr($filterable_navs_margin);
              ?>;
    }

    <?php echo '#post-grid-' . esc_attr($grid_id) . ' .nav-filter .filter:hover';
    ?>,
    <?php echo '#post-grid-' . esc_attr($grid_id) . ' .nav-filter .filter.mixitup-control-active';

    ?> {
      background: <?php echo esc_attr($filterable_active_bg_color);
                  ?>;
    }

    .post-grid .grid-nav-top .nav-filter {
      text-align: center;
      padding: 20px 0;
    }

    .filter-group {
      display: inline-block;
      margin: 10px;
    }

    .post-grid .nav-filter .filter {
      background: rgba(220, 220, 220, 0.3) none repeat scroll 0 0;
      color: #333;
      cursor: pointer;
      display: inline-block;
      font-size: 14px;
      margin: 5px 5px;
      padding: 3px 15px;
    }
  </style>
<?php


      }



      add_action('post_grid_view_type_css_tiles', 'post_grid_view_type_css_tiles', 90);

      function post_grid_view_type_css_tiles($args)
      {

        $post_grid_options = $args['options'];
        $grid_id = $args['grid_id'];

        $items_width_desktop = isset($post_grid_options['width']['desktop']) ? $post_grid_options['width']['desktop'] : '';
        $items_width_tablet = isset($post_grid_options['width']['tablet']) ? $post_grid_options['width']['tablet'] : '';
        $items_width_mobile = isset($post_grid_options['width']['mobile']) ? $post_grid_options['width']['mobile'] : '';


        $tiles = !empty($post_grid_options['tiles']) ? $post_grid_options['tiles'] : [];

        $tiles_gutter = isset($tiles['gutter']) ? $tiles['gutter'] : 20;


        $columns_desktop = !empty($tiles['columns']['desktop']) ? $tiles['columns']['desktop'] : 3;
        $columns_tablet = !empty($tiles['columns']['tablet']) ? $tiles['columns']['tablet'] : 2;
        $columns_mobile = !empty($tiles['columns']['mobile']) ? $tiles['columns']['mobile'] : 1;




        $items_height_style = !empty($post_grid_options['item_height']['style']) ? $post_grid_options['item_height']['style'] : 'auto_height';
        $items_height_style_tablet = !empty($post_grid_options['item_height']['style_tablet']) ? $post_grid_options['item_height']['style_tablet'] : 'auto_height';
        $items_height_style_mobile = !empty($post_grid_options['item_height']['style_mobile']) ? $post_grid_options['item_height']['style_mobile'] : 'auto_height';

        $items_fixed_height = !empty($post_grid_options['item_height']['fixed_height']) ? $post_grid_options['item_height']['fixed_height'] : '220px';
        $items_fixed_height_tablet = !empty($post_grid_options['item_height']['fixed_height_tablet']) ? $post_grid_options['item_height']['fixed_height_tablet'] : '220px';
        $items_fixed_height_mobile = !empty($post_grid_options['item_height']['fixed_height_mobile']) ? $post_grid_options['item_height']['fixed_height_mobile'] : '220px';

        $items_margin = isset($post_grid_options['margin']) ? $post_grid_options['margin'] : '';
        $item_padding = isset($post_grid_options['item_padding']) ? $post_grid_options['item_padding'] : '';

        $items_media_height_style = !empty($post_grid_options['media_height']['style']) ? $post_grid_options['media_height']['style'] : 'auto_height';
        $items_media_fixed_height = !empty($post_grid_options['media_height']['fixed_height']) ? $post_grid_options['media_height']['fixed_height'] : '';



        if ($items_height_style == 'auto_height') {
          $items_height = 'auto';
        } elseif ($items_height_style == 'fixed_height') {
          $items_height = $items_fixed_height;
        } elseif ($items_height_style == 'max_height') {
          $items_height = $items_fixed_height;
        } else {
          $items_height = '220px';
        }

        if ($items_media_height_style == 'auto_height') {
          $items_media_height = 'auto';
        } elseif ($items_media_height_style == 'fixed_height') {
          $items_media_height = $items_media_fixed_height;
        } elseif ($items_media_height_style == 'max_height') {
          $items_media_height = $items_media_fixed_height;
        } else {
          $items_media_height = '220px';
        }

        $container_padding = isset($post_grid_options['container']['padding']) ? $post_grid_options['container']['padding'] : '';
        $container_bg_color = isset($post_grid_options['container']['bg_color']) ? $post_grid_options['container']['bg_color'] : '';
        $container_bg_image = isset($post_grid_options['container']['bg_image']) ? $post_grid_options['container']['bg_image'] : '';

        $items_bg_color_type = isset($post_grid_options['items_bg_color_type']) ? $post_grid_options['items_bg_color_type'] : '';
        $items_bg_color = isset($post_grid_options['items_bg_color']) ? $post_grid_options['items_bg_color'] : '#fff';


        $masonry = !empty($post_grid_options['masonry']) ? $post_grid_options['masonry'] : [];

        $masonry_gutter = isset($masonry['gutter']) ? $masonry['gutter'] : 20;





?>
  <style type="text/css">
    <?php echo '#post-grid-' . esc_attr($grid_id);

    ?> {
      overflow: hidden;
      box-sizing: border-box;
      <?php if (!empty($container_padding)) : ?>padding: <?php echo esc_attr($container_padding);
                                                          ?>;
      <?php endif;
      ?><?php if (!empty($container_bg_color)) : ?>background-color: <?php echo esc_attr($container_bg_color);
                                                                      ?>;
      <?php endif;
      ?><?php if (!empty($container_bg_image)) : ?>background-image: url(<?php echo esc_attr($container_bg_image);
                                                                          ?>);
      <?php endif;
      ?>
    }

    .post-grid .layer-wrapper {
      position: relative;
      overflow: hidden;
    }

    .post-grid .layer-wrapper:before {
      padding-top: 100% !important;
      content: "";
      box-sizing: inherit;
      display: block;
      overflow: hidden;
    }

    .layer-media {
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      width: 100% !important;
      height: 100% !important;
    }

    .element-media,
    .thumb,
    .thumb_link {
      width: 100% !important;
      height: 100% !important;
    }

    .post-grid .layer-wrapper img {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover;
    }

    <?php echo '#post-grid-' . esc_attr($grid_id) . ' .grid-items';

    ?> {
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
    }

    <?php echo '#post-grid-' . esc_attr($grid_id) . ' .item';

    ?> {
      padding: <?php echo $tiles_gutter;
                ?>px;
    }

    <?php echo '#post-grid-' . esc_attr($grid_id) . ' .layer-wrapper';

    ?> {
      <?php if ($items_bg_color_type == 'fixed') : ?>background: <?php echo esc_attr($items_bg_color);
                                                                  ?>;
      <?php endif;
      ?>
    }

    <?php echo '#post-grid-' . esc_attr($grid_id) . ' .item .layer-media';

    ?> {
      overflow: hidden;

      <?php if ($items_media_height_style == 'fixed_height' || $items_media_height_style == 'auto_height') {
          echo 'height:' . esc_attr($items_media_height) . ';';
        } elseif ($items_media_height_style == 'max_height') {
          echo 'max-height:' . esc_attr($items_media_height) . ';';
        } else {
          echo 'height:' . $items_media_height . ';';
        }

      ?>
    }

    @media only screen and (min-width: 0px) and (max-width: 767px) {
      <?php echo '#post-grid-' . esc_attr($grid_id) . ' .item';

      ?> {
        <?php $colDesktop = 100 / $columns_mobile;
        $parcentWidth = number_format($colDesktop, 0);
        $masonry_gutter_mobile = $masonry_gutter * ($columns_mobile - 1);
        ?>width: calc((100% - <?php echo $masonry_gutter_mobile; ?>px) / <?php echo esc_attr($columns_mobile); ?>);
        flex: 0 0 <?php echo $parcentWidth;
                  ?>%;
        max-width: <?php echo $parcentWidth;
                    ?>%;

        <?php if ($items_height_style == 'fixed_height') {
          echo 'height:' . esc_attr($items_height) . ';';
        } elseif ($items_height_style == 'max_height') {
          echo 'max-height:' . esc_attr($items_height) . ';';
        } elseif ($items_height_style == 'auto_height') {
          echo 'height:auto;';
        } else {
          echo 'height:auto;';
        }

        ?>
      }
    }

    @media only screen and (min-width: 768px) and (max-width: 1023px) {
      <?php echo '#post-grid-' . esc_attr($grid_id) . ' .item';

      ?> {
        <?php $masonry_gutter_tablet = $masonry_gutter * ($columns_tablet - 1);
        $colDesktop = 100 / $columns_tablet;
        $parcentWidth = number_format($colDesktop, 0);
        ?>width: calc((100% - <?php echo $masonry_gutter_tablet; ?>px) / <?php echo esc_attr($columns_tablet); ?>);
        flex: 0 0 <?php echo $parcentWidth;
                  ?>%;
        max-width: <?php echo $parcentWidth;
                    ?>%;

        <?php if ($items_height_style_tablet == 'fixed_height') {
          echo 'height:' . esc_attr($items_fixed_height_tablet) . ';';
        } elseif ($items_height_style_tablet == 'max_height') {
          echo 'max-height:' . esc_attr($items_fixed_height_tablet) . ';';
        } elseif ($items_height_style_tablet == 'auto_height') {
          echo 'max-height:auto;';
        } else {
          echo 'height:auto;';
        }

        ?>
      }
    }

    @media only screen and (min-width: 1024px) {
      <?php echo '#post-grid-' . esc_attr($grid_id) . ' .item';

      ?> {
        <?php $masonry_gutter_desktop = $masonry_gutter * ($columns_desktop - 1);
        $colDesktop = 100 / $columns_desktop;
        $parcentWidth = number_format($colDesktop, 0);
        ?>width: calc((100% - <?php echo $masonry_gutter_desktop; ?>px) / <?php echo esc_attr($columns_desktop); ?>);
        flex: 0 0 <?php echo $parcentWidth;
                  ?>%;
        max-width: <?php echo $parcentWidth;
                    ?>%;

        <?php if ($items_height_style == 'fixed_height') {
          echo 'height:' . esc_attr($items_height) . ';';
        } elseif ($items_height_style == 'max_height') {
          echo 'max-height:' . esc_attr($items_height) . ';';
        } elseif ($items_height_style == 'auto_height') {
          echo 'height:auto;';
        } else {
          echo 'height:auto;';
        }

        ?>
      }
    }
  </style>
<?php


      }

      add_action('post_grid_container', 'post_grid_main_scripts', 10);

      function post_grid_main_scripts($args)
      {
        $post_grid_options = isset($args['options']) ? $args['options'] : [];
        $grid_id = isset($args['grid_id']) ? $args['grid_id'] : '';
        $grid_type = isset($post_grid_options['grid_type']) ? $post_grid_options['grid_type'] : 'grid';


        $layout_id = isset($post_grid_options['layout_id']) ? $post_grid_options['layout_id'] : '';

        $custom_js = isset($post_grid_options['custom_js']) ? $post_grid_options['custom_js'] : '';
        $custom_css = isset($post_grid_options['custom_css']) ? $post_grid_options['custom_css'] : '';
        $load_fontawesome = !empty($post_grid_options['load_fontawesome']) ? $post_grid_options['load_fontawesome'] : 'no';
        $masonry_enable = !empty($post_grid_options['masonry_enable']) ? $post_grid_options['masonry_enable'] : 'no';


        $masonry = !empty($post_grid_options['masonry']) ? $post_grid_options['masonry'] : [];

        $masonry_gutter = isset($masonry['gutter']) ? $masonry['gutter'] : 20;


        $post_grid_settings = get_option('post_grid_settings');
        $font_aw_version = isset($post_grid_settings['font_aw_version']) ? $post_grid_settings['font_aw_version'] : '';


        wp_enqueue_style('post-grid-shortcode-style');







        if ($masonry_enable == 'yes') {
          wp_enqueue_script('masonry');
          wp_enqueue_script('imagesloaded');
        }


        if ($load_fontawesome == 'yes') {
          if ($font_aw_version == 'v_5') {
            wp_enqueue_style('font-awesome-5');
          } elseif ($font_aw_version == 'v_4') {
            wp_enqueue_style('font-awesome-4');
          }
        }

        $layout_custom_scripts = get_post_meta($layout_id, 'custom_scripts', true);
        $layout_custom_css = isset($layout_custom_scripts['custom_css']) ? $layout_custom_scripts['custom_css'] : '';

        $layout_elements_data = get_post_meta($layout_id, 'layout_elements_data', true);



        if (!empty($layout_elements_data))
          foreach ($layout_elements_data as $elementIndex => $elementData) {
            foreach ($elementData as $elementId => $element) {


              $element_args['element'] = $element;
              $element_args['index'] = $elementIndex;

              //$element_args['post_id'] = $post_id;
              $element_args['layout_id'] = $layout_id;

              //ob_start();
              do_action('post_grid_layout_element_css_' . $elementId, $element_args);
              //$element_css .= ob_get_clean();

            }
          }

?>


  <?php if (!empty($custom_css)) : ?>
    <style type="text/css">
      <?php echo htmlspecialchars_decode($custom_css, ENT_QUOTES);
      ?>
    </style>
  <?php endif; ?>


  <?php if (!empty($layout_custom_css)) : ?>
    <style type="text/css">
      <?php echo htmlspecialchars_decode(wp_strip_all_tags(str_replace('__ID__', 'layout-' . esc_attr($layout_id), ($layout_custom_css))), ENT_QUOTES);
      ?>
    </style>
  <?php endif; ?>
  <script>
    <?php
        if (!empty($custom_js)) : ?>
      <?php echo wp_kses_post($custom_js); ?>
    <?php
        endif;
        $masonry_load = apply_filters('post_grid_masonry_load', true, $args);
        if ($grid_type == 'masonry') :
    ?>
      jQuery('#post-grid-<?php echo esc_attr($grid_id); ?>').ready(function($) {
        var $container = $('#post-grid-<?php echo esc_attr($grid_id); ?>  .grid-items');
        $container.masonry({
          itemSelector: '.item',
          columnWidth: '.item', //as you wish , you can use numeric
          isAnimated: true,
          isFitWidth: true,
          horizontalOrder: true,
          gutter: <?php echo esc_attr($masonry_gutter); ?>,
          percentPosition: true,
        });
        $container.imagesLoaded().done(function() {
          $container.masonry('layout');
        });
      })
    <?php endif; ?>
    <?php if ($grid_type == 'justified') : ?>
      <?php
          $justified = !empty($post_grid_options['justified']) ? $post_grid_options['justified'] : [];
          $justified_gutter = isset($justified['gutter']) ? $justified['gutter'] : 20;
          $maxHeight = isset($justified['maxHeight']) ? $justified['maxHeight'] : 180;
          wp_enqueue_script('imagesloaded');
          wp_enqueue_script('justifiedGallery');
          wp_enqueue_style('justifiedGallery');
      ?>
      jQuery('#post-grid-<?php echo esc_attr($grid_id); ?>').ready(function($) {
        var $container = $('#post-grid-<?php echo esc_attr($grid_id); ?>  .grid-items');
        $container.imagesLoaded().done(function() {
          $container.justifiedGallery({
            rowHeight: <?php echo esc_attr($maxHeight); ?>,
            margins: <?php echo esc_attr($justified_gutter); ?>,
          });
        });
      })
    <?php endif; ?>
  </script>
  <?php

      }


      add_action('post_grid_container', 'post_grid_main_convert_layout', 90);

      function post_grid_main_convert_layout($args)
      {



        $post_grid_layout_convert = isset($_GET['post_grid_layout_convert']) ? sanitize_text_field($_GET['post_grid_layout_convert']) : '';
        $_wpnonce = isset($_GET['_wpnonce']) ? sanitize_text_field($_GET['_wpnonce']) : '';

        if (empty($post_grid_layout_convert)) return;


        $layout_converted = false;

        if (wp_verify_nonce($_wpnonce, 'post_grid_layout_convert')) {

          $layout_converted = true;
        } else {
          $options = isset($args['options']) ? $args['options'] : [];
          $grid_id = (int) isset($args['grid_id']) ? $args['grid_id'] : '';

          $layout_id = isset($options['layout_id']) ? $options['layout_id'] : '';

          if (!empty($layout_id)) return;
        }



        if (!$layout_converted) return;


        $content_layout = isset($options['layout']['content']) ? $options['layout']['content'] : '';
        $layout_skin = isset($options['skin']) ? $options['skin'] : '';
        $media_source = isset($options['media_source']) ? $options['media_source'] : '';
        $media_height = isset($options['media_height']) ? $options['media_height'] : '';

        $media_height_style = isset($media_height['style']) ? $media_height['style'] : '';
        $media_fixed_height = isset($media_height['fixed_height']) ? $media_height['fixed_height'] : '';



        $featured_img_size = !empty($options['featured_img_size']) ? $options['featured_img_size'] : 'full';

        $thumb_linked = isset($options['thumb_linked']) ? $options['thumb_linked'] : 'no';

        $thumb_linked = ($thumb_linked == 'yes') ? 'post_link' : 'none';



        if (empty($content_layout)) return;
        if (empty($layout_skin)) return;

        $post_grid_layout_content = get_option('post_grid_layout_content');


        $content_layout_data = isset($post_grid_layout_content[$content_layout]) ? $post_grid_layout_content[$content_layout] : '';

        if (empty($content_layout_data)) return;



        $layout_elements_data = array();

        $layout_elements_data[0]['wrapper_start']['wrapper_id'] = '';
        $layout_elements_data[0]['wrapper_start']['wrapper_class'] = 'layer-media';
        $layout_elements_data[0]['wrapper_start']['css_idle'] = '';


        $layout_elements_data[1]['media']['media_height']['large_type'] = $media_height_style;
        $layout_elements_data[1]['media']['media_height']['large'] = $media_fixed_height;
        $layout_elements_data[1]['media']['media_height']['medium_type'] = $media_height_style;
        $layout_elements_data[1]['media']['media_height']['medium'] = $media_fixed_height;
        $layout_elements_data[1]['media']['media_height']['small_type'] = $media_height_style;
        $layout_elements_data[1]['media']['media_height']['small'] = $media_fixed_height;

        foreach ($media_source as $source) {
          $source_id = $source['id'];
          $source_checked = isset($source['checked']) ? 'yes' : 'no';

          if ($source_checked != 'yes') continue;

          $layout_elements_data[1]['media']['media_source'][$source_id]['enable'] = $source_checked;

          if ($source_id == 'featured_image' || $source_id == 'first_image' || $source_id == 'empty_thumb') {
            $layout_elements_data[1]['media']['media_source'][$source_id]['link_to'] = $thumb_linked;
          }
        }



        $layout_elements_data[1]['media']['margin'] = '';
        $layout_elements_data[1]['media']['padding'] = '';



        $layout_elements_data[2]['wrapper_end']['wrapper_id'] = '';

        $layout_elements_data[3]['wrapper_start']['wrapper_id'] = '';
        $layout_elements_data[3]['wrapper_start']['wrapper_class'] = 'layer-content';

        $item_count = 4;

        foreach ($content_layout_data as $index => $item) {


          $custom_class = isset($item['custom_class']) ? $item['custom_class'] : '';
          $char_limit = isset($item['char_limit']) ? $item['char_limit'] : '';
          $key = isset($item['key']) ? $item['key'] : '';
          $css = isset($item['css']) ? $item['css'] : '';
          $css_hover = isset($item['css_hover']) ? $item['css_hover'] : '';
          $read_more_text = isset($item['read_more_text']) ? $item['read_more_text'] : '';
          $link_target = isset($item['link_target']) ? $item['link_target'] : '';
          $five_star_count = isset($item['five_star_count']) ? $item['five_star_count'] : '';


          $layout_elements_data[$item_count][$key]['custom_class'] = $custom_class;
          $layout_elements_data[$item_count][$key]['css'] = $css;
          $layout_elements_data[$item_count][$key]['css_hover'] = $css_hover;

          if ($key == 'title' || $key == 'title_link' || $key == 'excerpt' || $key == 'excerpt_read_more') {
            $layout_elements_data[$item_count][$key]['char_limit'] = $char_limit;
            $layout_elements_data[$item_count][$key]['link_to'] = 'post_link';
          }

          if ($key == 'read_more' || $key == 'excerpt_read_more') {
            $layout_elements_data[$item_count][$key]['read_more_text'] = $read_more_text;
          }
          if ($key == 'read_more' || $key == 'excerpt_read_more' || $key == 'title_link') {
            $layout_elements_data[$item_count][$key]['link_target'] = $link_target;
            $layout_elements_data[$item_count][$key]['link_to'] = 'post_link';
          }


          if ($key == 'five_star') {
            $layout_elements_data[$item_count][$key]['five_star_count'] = $five_star_count;
          }



          $item_count++;
        }

        $layout_elements_data[$item_count]['wrapper_end']['wrapper_id'] = '';



        $post_grid_title = get_the_title($grid_id);

        $post_args = array(
          'post_title' => $post_grid_title . ' - ' . $layout_skin . ' - ' . $content_layout,
          'post_type' => 'post_grid_layout',
          'post_status' => 'publish',
          'post_author' => 1,

        );

        $new_layout_id = wp_insert_post($post_args);

        $custom_scripts['custom_css'] = post_grid_layout_css($layout_skin);
        $custom_scripts['custom_js'] = '';
        $layout_options['layout_preview_img'] = '';


        update_post_meta($new_layout_id, 'layout_elements_data', $layout_elements_data);
        update_post_meta($new_layout_id, 'custom_scripts', $custom_scripts);
        update_post_meta($new_layout_id, 'layout_options', $layout_options);



        $options['layout_id'] = $new_layout_id;

        update_post_meta($grid_id, 'post_grid_meta_options', $options);

        if ($layout_converted) {

  ?>
    <p>Layout converted successfully, please go <a href="<?php echo esc_url(get_edit_post_link($new_layout_id)); ?>">#<?php echo esc_attr($new_layout_id); ?></a> this
      link to edit layout </p>
    <p>Please report issue if you found any problem, <a href="https://www.pickplugins.com/forum/">create support ticket</a>
    </p>
<?php
        }
      }
