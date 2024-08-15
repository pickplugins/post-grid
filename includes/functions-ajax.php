<?php
if (!defined('ABSPATH')) exit;  // if direct access



add_action('post_grid_pagination_ajax_pagination', 'post_grid_pagination_ajax_pagination_22032023', 10, 2);

if (!function_exists('post_grid_pagination_ajax_pagination_22032023')) {
    function post_grid_pagination_ajax_pagination_22032023($args, $post_grid_wp_query)
    {

        // wp_enqueue_script('post-grid-shortcode-scripts');
        // wp_localize_script('post-grid-shortcode-scripts', 'post_grid_ajax', array('post_grid_ajaxurl' => admin_url('admin-ajax.php')));

        $grid_id = $args['grid_id'];

        $post_grid_options = $args['options'];

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

        if ($max_num_pages == 1) {

            return '';
        }

?>
        <div grid-id="<?php echo esc_attr($grid_id); ?>" data-nonce="<?php echo esc_attr(wp_create_nonce('post_grid_ajax_nonce')); ?>" id="paginate-ajax-<?php echo esc_attr($grid_id); ?>" class="paginate-ajax">
            <?php
            $big = 999999999; // need an unlikely integer
            echo paginate_links(array(
                'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
                'format' => '?paged=%#%',
                'current' => max(1, $paged),
                'total' => $pagination_max_num_pages,
                'prev_text'          => $pagination_prev_text,
                'next_text'          => $pagination_next_text,
            ));
            ?>
        </div>
        <style type="text/css">
            <?php echo '#post-grid-' . esc_attr($grid_id) . ' .pagination .page-numbers';

            ?> {
                font-size: <?php echo esc_attr($pagination_font_size);
                            ?>;
                color: <?php echo esc_attr($pagination_font_color);
                        ?>;
                background: <?php echo esc_attr($pagination_bg_color);
                            ?>;
            }

            <?php echo '#post-grid-' . esc_attr($grid_id) . ' .pagination .page-numbers:hover';
            ?>,
            <?php echo '#post-grid-' . esc_attr($grid_id) . ' .pagination .page-numbers.current';

            ?> {
                background: <?php echo esc_attr($pagination_active_bg_color);
                            ?>;
            }
        </style>
<?php

    }
}



if (!function_exists('post_grid_paginate_ajax_free')) {

    function post_grid_paginate_ajax_free()
    {

        $response = array();

        $formData = isset($_POST['formData']) ? ($_POST['formData']) : '';
        parse_str($formData, $form_data);

        $nonce = isset($_POST['_wpnonce']) ? ($_POST['_wpnonce']) : '';

        if (!wp_verify_nonce($nonce, 'post_grid_ajax_nonce')) {

            $response['html'] = __("Sorry! you are not allowed to do that.");
            $response['pagination'] = "";

            echo json_encode($response);
            die();
        }


        $keyword = isset($form_data['keyword']) ? sanitize_text_field($form_data['keyword']) : '';



        $grid_id = isset($_POST['grid_id']) ? sanitize_text_field($_POST['grid_id']) : '';
        $paged = isset($_POST['current_page']) ? sanitize_text_field($_POST['current_page']) : '';

        //$paged = sanitize_text_field($_POST['current_page']);

        $post_grid_options = get_post_meta($grid_id, 'post_grid_meta_options', true);

        //$keyword = isset($_POST['keyword']) ? sanitize_text_field($_POST['keyword']) : '';


        $post_types = isset($post_grid_options['post_types']) ? $post_grid_options['post_types'] : array('post');
        //$keyword = isset($post_grid_options['keyword']) ? $post_grid_options['keyword'] : '';
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



        //
        //    if ( get_query_var('paged') ) {
        //        $paged = get_query_var('paged');
        //    }elseif ( get_query_var('page') ) {
        //        $paged = get_query_var('page');
        //    }else {
        //        $paged = 1;
        //    }




        if (!empty($post_types))
            $query_args['post_type'] = $post_types;

        if (!empty($post_status))
            $query_args['post_status'] = $post_status;

        if (!empty($keyword))
            $query_args['s'] = $keyword;


        if (!empty($exclude_post_id))
            $query_args['post__not_in'] = $exclude_post_id;

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



        $query_args = apply_filters('post_grid_ajax_query_args', $query_args, $grid_id);
        // $query_args = apply_filters('post_grid_query_args', $query_args, $args);



        $post_grid_wp_query = new WP_Query($query_args);

        //$wp_query = $post_grid_wp_query;

        $args['options'] = $post_grid_options;



        $pagination_prev_text = !empty($post_grid_options['pagination']['prev_text']) ? $post_grid_options['pagination']['prev_text'] : __('« Previous', 'post-grid');
        $pagination_next_text = !empty($post_grid_options['pagination']['next_text']) ? $post_grid_options['pagination']['next_text'] : __('Next »', 'post-grid');

        $loop_count = 0;



        ob_start();

        if ($post_grid_wp_query->have_posts()) :
            ob_start();
            while ($post_grid_wp_query->have_posts()) : $post_grid_wp_query->the_post();
                $post_id = get_the_ID();
                $args['post_id'] = $post_id;
                $args['loop_count'] = $loop_count;

                do_action('post_grid_loop', $args);

                $loop_count++;
            endwhile;



            $response['html'] = ob_get_clean();

            $big = 999999999; // need an unlikely integer
            $max_num_pages = $post_grid_wp_query->max_num_pages;



            $html_pagination = paginate_links(array(
                'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
                'format' => '?paged=%#%',
                'current' => max(1, $paged),
                'total' => $max_num_pages,
                'prev_text'          => $pagination_prev_text,
                'next_text'          => $pagination_next_text,
            ));

            wp_reset_query();
            wp_reset_postdata();
        endif;

        $html = ob_get_clean();

        $response['pagination'] = $html_pagination;


        echo json_encode($response);

        die();
    }
}

add_action('wp_ajax_post_grid_paginate_ajax_free', 'post_grid_paginate_ajax_free');
add_action('wp_ajax_nopriv_post_grid_paginate_ajax_free', 'post_grid_paginate_ajax_free');








function post_grid_ajax_search_free()
{

    $response = array();

    $grid_id = isset($_POST['grid_id']) ? sanitize_text_field($_POST['grid_id']) : '';

    $post_grid_options = get_post_meta($grid_id, 'post_grid_meta_options', true);


    $formData = isset($_POST['formData']) ? ($_POST['formData']) : '';
    parse_str($formData, $form_data);




    $form_data = apply_filters('_form_data', $form_data);
    $keyword = isset($form_data['keyword']) ? sanitize_text_field($form_data['keyword']) : '';
    $_wpnonce = isset($form_data['_wpnonce']) ? sanitize_text_field($form_data['_wpnonce']) : '';


    if (!wp_verify_nonce($_wpnonce, 'post_grid_search_nonce')) {

        $response['html'] = __("Sorry! you are not allowed to do that.");
        $response['pagination'] = "";

        echo json_encode($response);
        die();
    }



    $post_types = isset($post_grid_options['post_types']) ? $post_grid_options['post_types'] : array('post');
    $pagination_type = isset($post_grid_options['nav_bottom']['pagination_type']) ? $post_grid_options['nav_bottom']['pagination_type'] : 'ajax_pagination';

    $pagination_type =  'ajax_pagination';



    //$keyword = isset($post_grid_options['keyword']) ? $post_grid_options['keyword'] : '';
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



    $query_args = apply_filters('post_grid_ajax_query_args', $query_args, $grid_id);
    // $query_args = apply_filters('post_grid_query_args', $query_args, $args);


    $post_grid_wp_query = new WP_Query($query_args);

    //$wp_query = $post_grid_wp_query;

    $args['options'] = $post_grid_options;

    $loop_count = 0;




    if ($post_grid_wp_query->have_posts()) :

        ob_start();
        while ($post_grid_wp_query->have_posts()) : $post_grid_wp_query->the_post();
            $post_id = get_the_ID();
            $args['post_id'] = $post_id;
            $args['loop_count'] = $loop_count;

            do_action('post_grid_loop', $args);

            $loop_count++;

        endwhile;
        $response['html'] = ob_get_clean();

        ob_start();

        $args['grid_id'] = $grid_id;

        do_action('post_grid_pagination_' . $pagination_type, $args, $post_grid_wp_query);
        $response['pagination'] = ob_get_clean();

        wp_reset_query();
        wp_reset_postdata();
    endif;

    //$html = ob_get_clean();


    echo wp_json_encode($response);

    die();
}

add_action('wp_ajax_post_grid_ajax_search_free', 'post_grid_ajax_search_free');
add_action('wp_ajax_nopriv_post_grid_ajax_search_free', 'post_grid_ajax_search_free');
