<?php
if ( ! defined('ABSPATH')) exit;  // if direct access

add_action('post_grid_main', 'post_grid_main_container', 90);

function post_grid_main_container($atts){

    $grid_id = $atts['id'];
    $post_grid_options = get_post_meta( $grid_id, 'post_grid_meta_options', true );

    $grid_type = isset($post_grid_options['grid_type']) ? $post_grid_options['grid_type'] : 'grid';

    $args['grid_id'] = $grid_id;
    $args['options'] = $post_grid_options;

    wp_enqueue_style( 'post-grid-style' );


    ?>
    <div id="post-grid-<?php echo $grid_id; ?>" class="post-grid <?php echo $grid_type; ?>">
        <?php
        do_action('post_grid_container', $args);
        ?>
    </div>
    <?php



}


add_action('post_grid_container', 'post_grid_posts_loop');

function post_grid_posts_loop($args){


    $post_grid_options = $args['options'];
    $grid_id = $args['grid_id'];

    $post_types = isset($post_grid_options['post_types']) ? $post_grid_options['post_types'] : array('post');
    $keyword = isset($post_grid_options['keyword']) ? $post_grid_options['keyword'] : '';
    $exclude_post_id = isset($post_grid_options['exclude_post_id']) ? $post_grid_options['exclude_post_id'] : '';

    $post_status = isset($post_grid_options['post_status']) ? $post_grid_options['post_status'] : 'publish';
    $query_order = isset($post_grid_options['query_order']) ? $post_grid_options['query_order'] : 'DESC';
    $query_orderby = isset($post_grid_options['query_orderby']) ? $post_grid_options['query_orderby'] : array('date');
    $query_orderby = implode(' ', $query_orderby);
    $offset = isset($post_grid_options['offset']) ? (int)$post_grid_options['offset'] : '';
    $posts_per_page = isset($post_grid_options['posts_per_page']) ? $post_grid_options['posts_per_page'] : 10;
    $query_orderby_meta_key = isset($post_grid_options['query_orderby_meta_key']) ? $post_grid_options['query_orderby_meta_key'] : '';


    $taxonomies = !empty($post_grid_options['taxonomies']) ? $post_grid_options['taxonomies'] : array();
    $categories_relation = isset($post_grid_options['categories_relation']) ? $post_grid_options['categories_relation'] : 'OR';

    $meta_query = !empty($post_grid_options['meta_query']) ? $post_grid_options['meta_query'] : array();
    $meta_query_relation = isset($post_grid_options['meta_query_relation'])? $post_grid_options['meta_query_relation'] : 'OR';

    $default_query_args = array();

    $meta_query_args = array();
    if(!empty($meta_query)):

        $i = 0;
        foreach ($meta_query as  $meta_queryIndex=>$meta_queryData):
            $arg_type = $meta_queryData['arg_type'];
            $relation = $meta_queryData['relation'];

            if($arg_type == 'single'):
                $meta_query_args[$meta_queryIndex]['key'] = $meta_queryData['key'];
                $meta_query_args[$meta_queryIndex]['value'] = $meta_queryData['value'];
                $meta_query_args[$meta_queryIndex]['compare'] = $meta_queryData['compare'];
                $meta_query_args[$meta_queryIndex]['type'] = $meta_queryData['type'];

            elseif($arg_type == 'group'):
                $group_args = isset($meta_queryData['args']) ? $meta_queryData['args'] : array();

                if(!empty($group_args)):
                    $meta_query_args[$meta_queryIndex]['relation'] = $relation;
                    foreach ($group_args as $argIndex=>$arg):
                        $meta_query_args[$meta_queryIndex][$argIndex]['key'] = $arg['key'];
                        $meta_query_args[$meta_queryIndex][$argIndex]['value'] = $arg['value'];
                        $meta_query_args[$meta_queryIndex][$argIndex]['compare'] = $arg['compare'];
                        $meta_query_args[$meta_queryIndex][$argIndex]['type'] = $arg['type'];
                    endforeach;
                endif;
            endif;
        endforeach;
    endif;

    $meta_query = $meta_query_args;
    if(!empty($meta_query)){
        $meta_query_relation = array('relation' => $meta_query_relation);
        $meta_query = array_merge($meta_query_relation, $meta_query );
    }




    global $wp_query;







    /* ################################ Tax query ######################################*/

    $tax_query = array();

    foreach($taxonomies as $taxonomy => $taxonomyData){

        $terms = !empty($taxonomyData['terms']) ? $taxonomyData['terms'] : array();
        $terms_relation = !empty($taxonomyData['terms_relation']) ? $taxonomyData['terms_relation'] : 'OR';
        $checked = !empty($taxonomyData['checked']) ? $taxonomyData['checked'] : '';

        if(!empty($terms) && !empty($checked)){
            $tax_query[] = array(
                'taxonomy' => $taxonomy,
                'field'    => 'term_id',
                'terms'    => $terms,
                'operator'    => $terms_relation,
            );
        }
    }


    $tax_query_relation = array( 'relation' => $categories_relation );

    $tax_query = array_merge($tax_query_relation, $tax_query );





    /* ################################ Keyword query ######################################*/

    if(isset($_GET['keyword'])){

        $keyword = sanitize_text_field($_GET['keyword']);

    }




    /* ################################ Single pages ######################################*/


    if(is_singular()):
        $current_post_id = get_the_ID();
        $default_query_args['post__not_in'] = array($current_post_id);
    endif;




    if ( get_query_var('paged') ) {
        $paged = get_query_var('paged');
    }elseif ( get_query_var('page') ) {
        $paged = get_query_var('page');
    }else {
        $paged = 1;
    }




    if(!empty($post_types))
        $default_query_args['post_type'] = $post_types;

    if(!empty($post_status))
        $default_query_args['post_status'] = $post_status;

    if(!empty($keyword))
        $default_query_args['s'] = $keyword;


    if(!empty($exclude_post_id))
        $default_query_args['post__not_in'] = $exclude_post_id;

    if(!empty($query_order))
        $default_query_args['order'] = $query_order;

    if(!empty($query_orderby))
        $default_query_args['orderby'] = $query_orderby;

    if(!empty($query_orderby_meta_key))
        $default_query_args['meta_key'] = $query_orderby_meta_key;

    if(!empty($posts_per_page))
        $default_query_args['posts_per_page'] = (int)$posts_per_page;

    if(!empty($paged))
        $default_query_args['paged'] = $paged;

    if(!empty($offset))
        $default_query_args['offset'] = $offset + ( ($paged-1) * $posts_per_page );


    if(!empty($tax_query))
        $default_query_args['tax_query'] = $tax_query;

    if(!empty($meta_query))
        $default_query_args['meta_query'] = $meta_query;

    $query_merge = apply_filters('post_grid_filter_query_args', $default_query_args, $grid_id);

    //echo '<pre>'.var_export($query_merge, true).'</pre>';

    $post_grid_wp_query = new WP_Query($query_merge);

    // for global use
    $wp_query = $post_grid_wp_query;


    $loop_count = 0;

    if ( $post_grid_wp_query->have_posts() ) :
        do_action('post_grid_loop_top', $args);

        ?>
        <div class="grid-items">
            <?php
            do_action('post_grid_before_loop', $args);

            while ( $post_grid_wp_query->have_posts() ) : $post_grid_wp_query->the_post();
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

        wp_reset_query();
        wp_reset_postdata();

    else:
        ?>
        <div class="no-post-found">
            <?php
            do_action('post_grid_loop_no_post', $args);
            ?>
        </div>
    <?php
    endif;






}





add_action('post_grid_loop', 'post_grid_loop');

function post_grid_loop($args){

    $post_id = $args['post_id'] ;
    $loop_count = $args['loop_count'] ;
    $post_grid_options = $args['options'];


    $enable_multi_skin = isset($post_grid_options['enable_multi_skin']) ? $post_grid_options['enable_multi_skin'] : 'no';
    $skin = isset($post_grid_options['skin']) ? $post_grid_options['skin'] : 'flat';
    $layout_id = isset($post_grid_options['layout_id']) ? $post_grid_options['layout_id'] : '';


    if($loop_count % 2 == 0){
        $odd_even_calss = 'even';
    }else{
        $odd_even_calss = 'odd';
    }


    $post_options = get_post_meta( $post_id, 'post_grid_post_settings', true );

    if($enable_multi_skin=='yes'){

        $skin = !empty($post_options['post_skin']) ? $post_options['post_skin'] : $skin;

    }

    $item_css_class = array();

    $item_css_class['item'] = 'item';
    $item_css_class['item_id'] = 'item-'.$post_id;

    $item_css_class['skin'] = 'skin '.$skin;
    $item_css_class['odd_even'] = $odd_even_calss;


    //var_dump($layout_id);

    $item_css_class = apply_filters('post_grid_item_classes', $item_css_class);
    $item_css_class = implode(' ', $item_css_class);

    ?>
    <div class="<?php echo $item_css_class; ?> ">
        <div class="layer-wrapper layout-<?php echo $layout_id; ?>">
            <?php

            $layout_args['layout_id'] = !empty($layout_id) ? $layout_id  : $skin;
            $layout_args['post_id'] = $post_id;
            $layout_args['options'] = $post_grid_options;

            do_action('post_grid_item_layout', $layout_args);

            ?>
        </div>
    </div>
    <?php
}





add_action('post_grid_item_layout', 'post_grid_item_layout_media');

function post_grid_item_layout_media($args){

    $post_id = $args['post_id'] ;
    $post_grid_options = $args['options'];
    $layout_id = isset($post_grid_options['layout_id']) ? $post_grid_options['layout_id'] : '';

    if(!empty($layout_id)) return;


    $media_source = !empty($post_grid_options['media_source']) ? $post_grid_options['media_source'] : array();
    $featured_img_size = !empty($post_grid_options['featured_img_size']) ? $post_grid_options['featured_img_size'] : 'full';
    $thumb_linked = !empty($post_grid_options['thumb_linked']) ? $post_grid_options['thumb_linked'] : 'yes';

    wp_enqueue_style( 'post-grid-skin' );

    $html_media = '';

    $is_image = false;
    foreach($media_source as $source_info){

        $media = post_grid_get_media($post_id, $source_info['id'], $featured_img_size, $thumb_linked);

        if ( $is_image ) continue;

        if(!empty($source_info['checked'])){
            if(!empty($media)){

                $html_media = post_grid_get_media($post_id, $source_info['id'], $featured_img_size, $thumb_linked);
                $is_image = true;
            }
            else{
                $html_media = '';
            }
        }
    }



    $html_media = apply_filters('post_grid_filter_html_media', $html_media);

    //echo get_the_title($post_id);

    ?>
    <div class="layer-media"><?php echo $html_media; ?></div>
    <?php

}




add_action('post_grid_item_layout', 'post_grid_item_layout_content');

function post_grid_item_layout_content($args){

    $post_id = $args['post_id'];
    $post_grid_options = $args['options'];
    $skin = $args['layout_id'];

    $layout_id = isset($post_grid_options['layout_id']) ? $post_grid_options['layout_id'] : '';

    if(!empty($layout_id)) return;

    $post_grid_layout_content = get_option( 'post_grid_layout_content' );
    $class_post_grid_functions = new class_post_grid_functions();

    $layout_content = isset($post_grid_options['layout']['content']) ? $post_grid_options['layout']['content'] : 'flat';


    if(empty($post_grid_layout_content)){
        $layout = $class_post_grid_functions->layout_content($layout_content);
    }
    else{

        if(!empty($post_grid_layout_content[$layout_content])){
            $layout = $post_grid_layout_content[$layout_content];

        }
        else{
            $layout = array();
        }
    }

    ?>
    <div class="layer-content">
        <?php
        foreach($layout as $elementIndex=>$element){
            $element_id = isset($element['key']) ? $element['key'] : '';

            if(empty($element_id)) return;

            //var_dump($element_id);
            $element_args['element'] = $element;
            $element_args['index'] = $elementIndex;

            $element_args['post_id'] = $post_id;
            $element_args['layout_id'] = $post_id;

            do_action('post_grid_layout_element_'.$element_id, $element_args);

        }

        ?>
    </div>
    <?php





}

add_action('post_grid_container', 'post_grid_container_old_layout_css');

function post_grid_container_old_layout_css($args){


    $layout_id = isset($post_grid_options['layout_id']) ? $post_grid_options['layout_id'] : '';

    if(!empty($layout_id)) return;


    $grid_id = $args['grid_id'];
    $post_grid_options = $args['options'];
    $layout_content = isset($post_grid_options['layout']['content']) ? $post_grid_options['layout']['content'] : 'flat';

    $class_post_grid_functions = new class_post_grid_functions();
    $items_bg_color_values = $class_post_grid_functions->items_bg_color_values();

    $post_grid_layout_content = get_option( 'post_grid_layout_content' );

    if(empty($post_grid_layout_content)){
        $layout = $class_post_grid_functions->layout_content($layout_content);
    }else{
        if(!empty($post_grid_layout_content[$layout_content])){
            $layout = $post_grid_layout_content[$layout_content];
        }else{
            $layout = array();
        }
    }


    //var_dump($layout);

    ?>
    <style type="text/css">
        <?php
        foreach($layout as $item_id=>$item_info){
            $item_css = $item_info['css'];
            $item_key = $item_info['key'];

            if($item_key=='categories' || $item_key=='tags'){
                ?>
                #post-grid-<?php echo $grid_id; ?> .element_<?php echo $item_id; ?> a{<?php echo $item_css; ?>}
                <?php
            }elseif($item_key=='down_arrow'){
                $arrow_size = $item_info['arrow_size'];
                $arrow_bg_color = $item_info['arrow_bg_color'];
                ?>
                #post-grid-<?php echo $grid_id; ?> .element_<?php echo $item_id; ?>{<?php echo $item_css; ?>}
                #post-grid-<?php echo $grid_id; ?> .element_<?php echo $item_id; ?>{
                  border-left: <?php echo $arrow_size; ?> solid rgba(0, 0, 0, 0);
                  border-right: <?php echo $arrow_size; ?> solid rgba(0, 0, 0, 0);
                  border-top: <?php echo $arrow_size; ?> solid  <?php echo $arrow_bg_color; ?>;
                  height: 0;
                  width: 0;
                }
                <?php

            }elseif($item_key=='up_arrow'){
                $arrow_size = $item_info['arrow_size'];
                $arrow_bg_color = $item_info['arrow_bg_color'];
                ?>
                #post-grid-<?php echo $grid_id; ?> .element_<?php echo $item_id; ?>{<?php echo $item_css; ?>}
                #post-grid-<?php echo $grid_id; ?> .element_<?php echo $item_id; ?>{
                  border-bottom: <?php echo $arrow_size; ?> solid <?php echo $arrow_bg_color; ?>;
                  border-left: <?php echo $arrow_size; ?> solid transparent;
                  border-right: <?php echo $arrow_size; ?> solid transparent;
                  height: 0;
                  width: 0;
                }
                <?php
            }else{
                ?>
                #post-grid-<?php echo $grid_id; ?> .element_<?php echo $item_id; ?>{<?php echo $item_css; ?>}
                <?php
            }
        }
	foreach($layout as $item_id=>$item_info){
		$item_css_hover = $item_info['css_hover'];
		echo '#post-grid-'.$grid_id.' .element_'.$item_id.':hover{'.$item_css_hover.'}';
		}
    ?>
    </style>
    <?php

}

add_action('post_grid_item_layout', 'post_grid_item_layout_new');

function post_grid_item_layout_new($args){

    $post_id = $args['post_id'];
    $post_grid_options = $args['options'];
    $layout_id = $args['layout_id'];

    if(empty($layout_id)) return;


    //$layout_id = isset($post_grid_options['layout_id']) ? $post_grid_options['layout_id'] : '';



    if(empty($layout_id)) return;

    $layout_elements_data = get_post_meta( $layout_id, 'layout_elements_data', true );


    //echo '<pre>'.var_export($layout_elements_data, ture).'</pre>';


    foreach($layout_elements_data as $elementIndex=>$elementData){
        foreach($elementData as $elementId=>$element) {

            //var_dump($element);

            $element_args['element'] = $element;
            $element_args['index'] = $elementIndex;

            $element_args['post_id'] = $post_id;
            $element_args['layout_id'] = $layout_id;

            do_action('post_grid_layout_element_' . $elementId, $element_args);
            do_action('post_grid_layout_element_css_' . $elementId, $element_args);
        }

    }






}






add_action('post_grid_loop_bottom', 'post_grid_loop_bottom_pagination', 10, 2);

function post_grid_loop_bottom_pagination($args, $wp_query){


    $post_grid_options = $args['options'];


    if ( get_query_var('paged') ) {
        $paged = get_query_var('paged');
    }elseif ( get_query_var('page') ) {
        $paged = get_query_var('page');
    }else {
        $paged = 1;
    }

    $pagination_prev_text = !empty($post_grid_options['pagination']['prev_text']) ? $post_grid_options['pagination']['prev_text'] : __('« Previous', 'post-grid');
    $pagination_next_text = !empty($post_grid_options['pagination']['next_text']) ? $post_grid_options['pagination']['next_text'] : __('Next »', 'post-grid');
    $max_num_pages = $wp_query->max_num_pages;


    ?>
    <div class="pagination">
        <div class="paginate">
            <?php

            $big = 999999999; // need an unlikely integer

            echo paginate_links(
                array(
                    'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
                    'format' => '?paged=%#%',
                    'current' => max( 1, $paged ),
                    'total' => $max_num_pages,
                    'prev_text'          => $pagination_prev_text,
                    'next_text'          => $pagination_next_text,

                )
            );

            ?>
        </div>
    </div>

    <?php

}



add_action('post_grid_container', 'post_grid_main_view_type_grid_scripts', 90);

function post_grid_main_view_type_grid_scripts($args){
    $post_grid_options = $args['options'];
    $grid_id = $args['grid_id'];




    $items_width_desktop = isset($post_grid_options['width']['desktop']) ? $post_grid_options['width']['desktop'] : '';
    $items_width_tablet = isset($post_grid_options['width']['tablet']) ? $post_grid_options['width']['tablet'] : '';
    $items_width_mobile = isset($post_grid_options['width']['mobile']) ? $post_grid_options['width']['mobile'] : '';

    $items_height_style = !empty($post_grid_options['item_height']['style']) ? $post_grid_options['item_height']['style'] : 'auto_height';
    $items_height_style_tablet = !empty($post_grid_options['item_height']['style_tablet']) ? $post_grid_options['item_height']['style_tablet'] : 'auto_height';
    $items_height_style_mobile = !empty($post_grid_options['item_height']['style_mobile']) ?$post_grid_options['item_height']['style_mobile'] : 'auto_height';

    $items_fixed_height = !empty($post_grid_options['item_height']['fixed_height']) ? $post_grid_options['item_height']['fixed_height'] : '220px';
    $items_fixed_height_tablet = !empty($post_grid_options['item_height']['fixed_height_tablet']) ? $post_grid_options['item_height']['fixed_height_tablet'] : '220px';
    $items_fixed_height_mobile = !empty($post_grid_options['item_height']['fixed_height_mobile']) ? $post_grid_options['item_height']['fixed_height_mobile'] : '220px';

    $items_margin = isset($post_grid_options['margin']) ? $post_grid_options['margin'] : '';
    $item_padding = isset($post_grid_options['item_padding']) ? $post_grid_options['item_padding'] : '';

    $items_media_height_style = !empty($post_grid_options['media_height']['style']) ? $post_grid_options['media_height']['style'] : 'auto_height';
    $items_media_fixed_height = !empty($post_grid_options['media_height']['fixed_height']) ? $post_grid_options['media_height']['fixed_height'] : '';



    if($items_height_style == 'auto_height'){
        $items_height = 'auto';
    }elseif($items_height_style == 'fixed_height'){
        $items_height = $items_fixed_height;
    }elseif($items_height_style == 'max_height'){
        $items_height = $items_fixed_height;
    }else{
        $items_height = '220px';
    }

    if($items_media_height_style == 'auto_height'){
        $items_media_height = 'auto';
    }elseif($items_media_height_style == 'fixed_height'){
        $items_media_height = $items_media_fixed_height;
    }elseif($items_media_height_style == 'max_height'){
        $items_media_height = $items_media_fixed_height;
    }else{
        $items_media_height = '220px';
    }

    $container_padding = isset($post_grid_options['container']['padding']) ? $post_grid_options['container']['padding'] : '';
    $container_bg_color = isset($post_grid_options['container']['bg_color']) ? $post_grid_options['container']['bg_color'] : '';
    $container_bg_image = isset($post_grid_options['container']['bg_image']) ? $post_grid_options['container']['bg_image'] : '';

    $pagination_font_size = !empty($post_grid_options['pagination']['font_size']) ? $post_grid_options['pagination']['font_size'] : '17px';
    $pagination_font_color = !empty($post_grid_options['pagination']['font_color']) ? $post_grid_options['pagination']['font_color'] : '#646464';
    $pagination_bg_color = !empty($post_grid_options['pagination']['bg_color']) ? $post_grid_options['pagination']['bg_color'] : '#646464';
    $pagination_active_bg_color = !empty($post_grid_options['pagination']['active_bg_color']) ? $post_grid_options['pagination']['active_bg_color'] : '#4b4b4b';

    $items_bg_color_type = isset($post_grid_options['items_bg_color_type']) ? $post_grid_options['items_bg_color_type'] : '';
    $items_bg_color = isset($post_grid_options['items_bg_color']) ? $post_grid_options['items_bg_color'] : '#fff';



    ?>
    <style type="text/css">
        #post-grid-<?php echo $grid_id; ?> {
            <?php if(!empty($container_padding)): ?>
            padding:<?php echo $container_padding; ?>;
            <?php endif; ?>
            <?php if(!empty($container_bg_color)): ?>
            background-color: <?php echo $container_bg_color; ?>;
            <?php endif; ?>
            <?php if(!empty($container_bg_image)): ?>
            background-image: url(<?php echo $container_bg_image; ?>);
            <?php endif; ?>
        }
        #post-grid-<?php echo $grid_id; ?> .item{
            <?php if(!empty($items_margin)): ?>
            margin:<?php echo $items_margin; ?>;
            <?php endif; ?>
            <?php if(!empty($item_padding)): ?>
            padding:<?php echo $item_padding; ?>;
            <?php endif; ?>
            <?php if($items_bg_color_type=='fixed'): ?>
            background:<?php echo $items_bg_color; ?>;
            <?php endif; ?>

        }
        #post-grid-<?php echo $grid_id; ?>  .item .layer-media{
            overflow: hidden;
            <?php
            if($items_media_height_style == 'fixed_height' || $items_media_height_style == 'auto_height'){
                echo 'height:'.$items_media_height.';';
            }elseif($items_media_height_style=='max_height'){
                echo 'max-height:'.$items_media_height.';';
            }else{
                echo 'height:'.$items_media_height.';';
            }
            ?>
        }
        #post-grid-<?php echo $grid_id; ?> .pagination .page-numbers,
        #post-grid-<?php echo $grid_id; ?> .pagination .pager,
        #post-grid-<?php echo $grid_id; ?> .paginate.next-previous a{
            font-size:<?php echo $pagination_font_size; ?>;
            color:<?php echo $pagination_font_color; ?>;
            background:<?php echo $pagination_bg_color; ?>;
        }
        #post-grid-<?php echo $grid_id; ?> .pagination .page-numbers:hover,
        #post-grid-<?php echo $grid_id; ?> .pagination .page-numbers.current,
        #post-grid-<?php echo $grid_id; ?> .pagination .pager.active{
            background:<?php echo $pagination_active_bg_color; ?>;
        }
        @media only screen and ( min-width: 0px ) and ( max-width: 767px ) {
            #post-grid-<?php echo $grid_id; ?> .item{
                <?php if(!empty($items_width_mobile)): ?>
                width:<?php echo $items_width_mobile; ?>;
                <?php endif; ?>
                <?php
                if($items_height_style == 'fixed_height'){
                    echo 'height:'.$items_height.';';
                }elseif($items_height_style=='max_height'){
                    echo 'max-height:'.$items_height.';';
                }elseif($items_height_style=='auto_height'){
                    echo 'height:auto;';
                }else{
                    echo 'height:auto;';
                }
                ?>
            }
        }
        @media only screen and ( min-width: 768px ) and ( max-width: 1023px ) {
            #post-grid-<?php echo $grid_id; ?> .item{
                <?php if(!empty($items_width_tablet)): ?>
                width:<?php echo $items_width_tablet; ?>;
                <?php endif; ?>
                <?php
                if($items_height_style_tablet == 'fixed_height'){
                    echo 'height:'.$items_fixed_height_tablet.';';
                }elseif($items_height_style_tablet=='max_height'){
                    echo 'max-height:'.$items_fixed_height_tablet.';';
                }elseif($items_height_style_tablet=='auto_height'){
                    echo 'max-height:auto;';
                }else{
                    echo 'height:auto;';
                }
                ?>
            }
        }
        @media only screen and (min-width: 1024px ){
            #post-grid-<?php echo $grid_id; ?> .item{
                <?php if(!empty($items_width_desktop)): ?>
                width:<?php echo $items_width_desktop; ?>;
                <?php endif; ?>
                <?php
                if($items_height_style == 'fixed_height'){
                    echo 'height:'.$items_height.';';
                }elseif($items_height_style=='max_height'){
                    echo 'max-height:'.$items_height.';';
                }elseif($items_height_style=='auto_height'){
                    echo 'height:auto;';
                }else{
                    echo 'height:auto;';
                }
                ?>
            }
        }
    </style>
    <?php
}



add_action('post_grid_container', 'post_grid_main_scripts', 90);

function post_grid_main_scripts($args){
    $post_grid_options = $args['options'];


    $layout_id = isset($post_grid_options['layout_id']) ? $post_grid_options['layout_id'] : '';

    $custom_js = isset($post_grid_options['custom_js']) ? $post_grid_options['custom_js'] : '';
    $custom_css = isset($post_grid_options['custom_css']) ? $post_grid_options['custom_css'] : '';
    $load_fontawesome = !empty($post_grid_options['load_fontawesome']) ? $post_grid_options['load_fontawesome'] : 'no';
    $masonry_enable = !empty($post_grid_options['masonry_enable']) ? $post_grid_options['masonry_enable'] : 'no';


    $post_grid_settings = get_option('post_grid_settings');
    $font_aw_version = isset($post_grid_settings['font_aw_version']) ? $post_grid_settings['font_aw_version'] : '';






    wp_enqueue_script(   'post_grid_scripts');
    wp_localize_script('post_grid_scripts', 'post_grid_ajax', array('post_grid_ajaxurl' => admin_url('admin-ajax.php')));



    if($masonry_enable == 'yes'){
        wp_enqueue_script( 'masonry.js' );
        wp_enqueue_script( 'imagesloaded.js' );
    }

    //var_dump($load_fontawesome);

    if($load_fontawesome == 'yes'){
        if($font_aw_version == 'v_5'){
            wp_enqueue_style('font-awesome-5');
        }elseif ($font_aw_version =='v_4'){
            wp_enqueue_style('font-awesome-4');
        }

    }

    $layout_custom_scripts = get_post_meta($layout_id,'custom_scripts', true);
    $layout_custom_css = isset($layout_custom_scripts['custom_css']) ? $layout_custom_scripts['custom_css'] : '';
    ?>
    <?php if(!empty($custom_css)): ?>
        <style type="text/css">
            <?php
            echo $custom_css;
            ?>
        </style>
    <?php endif; ?>

    <?php if(!empty($layout_custom_css)): ?>
        <style type="text/css">
            <?php
            echo str_replace('__ID__', 'layout-'.$layout_id, $layout_custom_css);
            ?>
        </style>
    <?php endif; ?>

    <?php if(!empty($custom_js)): ?>
        <script>
            <?php echo $custom_js; ?>

        </script>
    <?php endif; ?>
    <?php




    // layout custom css




}







add_action('post_grid_container', 'post_grid_main_convert_layout', 90);

function post_grid_main_convert_layout($args){

    $options = $args['options'];
    $grid_id = (int) $args['grid_id'];

    $layout_id = isset($options['layout_id']) ? $options['layout_id'] : '';

    echo '<pre>'.var_export($layout_id, true).'</pre>';


    if(!empty($layout_id)) return;


    $content_layout = isset($options['layout']['content']) ? $options['layout']['content'] : '';;
    $layout_skin = isset($options['skin']) ? $options['skin'] : '';
    $media_source = isset($options['media_source']) ? $options['media_source'] : '';
    $media_height = isset($options['media_height']) ? $options['media_height'] : '';

    $media_height_style = isset($media_height['style']) ? $media_height['style'] : '';
    $media_fixed_height = isset($media_height['fixed_height']) ? $media_height['fixed_height'] : '';


    $featured_img_size = !empty($post_grid_options['featured_img_size']) ? $post_grid_options['featured_img_size'] : 'full';

    $thumb_linked = isset($post_grid_options['thumb_linked']) ? $post_grid_options['thumb_linked'] : 'no';
    $thumb_linked = ($thumb_linked == 'yes') ? 'post_link' : 'none';

    if(empty($content_layout)) return;
    if(empty($layout_skin)) return;

    $post_grid_layout_content = get_option('post_grid_layout_content');


    $content_layout_data = isset($post_grid_layout_content[$content_layout]) ? $post_grid_layout_content[$content_layout] : '';

    if(empty($content_layout_data)) return;



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

    foreach ( $media_source as $source ){
        $source_id = $source['id'];
        $source_checked = isset( $source['checked']) ? 'yes' : 'no';

        if($source_checked != 'yes') continue;

        $layout_elements_data[1]['media']['media_source'][$source_id]['enable'] = $source_checked;

        if($source_id == 'featured_image' || $source_id == 'first_image' || $source_id == 'empty_thumb'){
            $layout_elements_data[1]['media']['media_source'][$source_id]['link_to'] = $thumb_linked;
        }

        if($source_id == 'featured_image' ){
            $layout_elements_data[1]['media']['media_source'][$source_id]['link_to'] = $featured_img_size;
        }


    }



    $layout_elements_data[1]['media']['margin'] = '';
    $layout_elements_data[1]['media']['padding'] = '';



    $layout_elements_data[2]['wrapper_end']['wrapper_id'] = '';

    $layout_elements_data[3]['wrapper_start']['wrapper_id'] = '';
    $layout_elements_data[3]['wrapper_start']['wrapper_class'] = 'layer-content';

    $item_count = 4;

    foreach ($content_layout_data as $index => $item){

        //echo '<pre>'.var_export($item, true).'</pre>';

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

        if($key == 'title' || $key == 'title_link' || $key == 'excerpt' || $key == 'excerpt_read_more'){
            $layout_elements_data[$item_count][$key]['char_limit'] = $char_limit;

        }

        if($key == 'read_more' || $key == 'excerpt_read_more'){
            $layout_elements_data[$item_count][$key]['read_more_text'] = $read_more_text;

        }
        if($key == 'read_more' || $key == 'excerpt_read_more' || $key == 'title_link'){
            $layout_elements_data[$item_count][$key]['link_target'] = $link_target;

        }


        if($key == 'five_star'){
            $layout_elements_data[$item_count][$key]['five_star_count'] = $five_star_count;

        }



        $item_count++;

    }

    $layout_elements_data[$item_count]['wrapper_end']['wrapper_id'] = '';


    //echo '<pre>'.var_export($layout_elements_data, true).'</pre>';

    $post_grid_title = get_the_title($grid_id);

    $post_args = array(
        'post_title' => $post_grid_title.' - '.$layout_skin,
        'post_type' => 'post_grid_layout',
        'post_status' => 'publish',
        'post_author' => 1,

    );

    $post_id = wp_insert_post($post_args);

    update_post_meta($post_id,'layout_elements_data', $layout_elements_data);

    //echo '<pre>'.var_export($options, true).'</pre>';

    $options['layout_id'] = $post_id;

    update_post_meta($grid_id,'post_grid_meta_options', $options);



}











