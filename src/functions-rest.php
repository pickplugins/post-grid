<?php
if (!defined('ABSPATH')) exit();



class BlockPostGridRest
{
    function __construct()
    {
        add_action('rest_api_init', array($this, 'register_routes'));
    }


    public function register_routes()
    {


        register_rest_route(
            'post-grid/v2',
            '/get_license',
            array(
                'methods'  => 'POST',
                'callback' => array($this, 'get_license'),
                'permission_callback' => '__return_true',
            )
        );


        register_rest_route(
            'post-grid/v2',
            '/get_terms',
            array(
                'methods'  => 'POST',
                'callback' => array($this, 'get_all_terms'),
                'permission_callback' => '__return_true',
            )
        );

        register_rest_route(
            'post-grid/v2',
            '/post_types',
            array(
                'methods'  => 'POST',
                'callback' => array($this, 'get_post_types'),
                'permission_callback' => '__return_true',
            )
        );



        register_rest_route(
            'post-grid/v2',
            '/post_type_objects',
            array(
                'methods'  => 'POST',
                'callback' => array($this, 'get_post_type_objects'),
                'permission_callback' => '__return_true',
            )
        );


        register_rest_route(
            'post-grid/v2',
            '/get_posts',
            array(
                'methods'  => 'POST',
                'callback' => array($this, 'get_posts'),
                'permission_callback' => '__return_true',
            )
        );

        register_rest_route(
            'post-grid/v2',
            '/get_post_data',
            array(
                'methods'  => 'POST',
                'callback' => array($this, 'get_post_data'),
                'permission_callback' => '__return_true',
            )
        );




        register_rest_route(
            'post-grid/v2',
            '/get_posts_layout',
            array(
                'methods'  => 'POST',
                'callback' => array($this, 'get_posts_layout'),
                'permission_callback' => '__return_true',
            )
        );

        register_rest_route(
            'post-grid/v2',
            '/get_tax_terms',
            array(
                'methods'  => 'POST',
                'callback' => array($this, 'get_tax_terms'),
                'permission_callback' => '__return_true',
            )
        );
    }

    /**
     * Return Posts
     *
     * @since 1.0.0
     * @param WP_REST_Request $post_data Post data.
     */
    public function get_posts_layout($post_data)
    {

        $category      = isset($post_data['category']) ? $post_data['category'] : '';
        $keyword     = isset($post_data['keyword']) ? $post_data['keyword'] : '';

        $response = [];
        $tax_query = [];






        $query_args = [];
        $query_args['post_type'] = 'post_grid_template';

        if (!empty($keyword)) {
            $query_args['s'] = $keyword;
        }


        if (!empty($category)) {
            $tax_query[] = array(
                'taxonomy' => 'template_cat',
                'field'    => 'term_id',
                'terms'    => $category,
            );

            $query_args['tax_query'] = $tax_query;
        }







        $posts = [];

        $wp_query = new WP_Query($query_args);


        if ($wp_query->have_posts()) :

            while ($wp_query->have_posts()) : $wp_query->the_post();

                $post = get_post(get_the_id());

                $post_id = $post->ID;
                $post->post_id = $post->ID;
                $post->post_title = $post->post_title;

                $post->post_content = $post->post_content;
                $thumb = wp_get_attachment_image_src(get_post_thumbnail_id($post_id));
                $thumb_url = isset($thumb[0]) ? $thumb[0] : '';
                $post->thumb_url = !empty($thumb_url) ? $thumb_url : post_grid_plugin_url . 'assets/frontend/images/placeholder.png';

                $post->is_pro = ($post_id % 2 == 0) ? true : false;


                $price = get_post_meta($post_id, 'price', true);
                $post->price = !empty($price) ? $price : 5;

                $sale_price = get_post_meta($post_id, 'sale_price', true);
                $post->sale_price = !empty($sale_price) ? $sale_price : 0;



                $post->buy_link = '#';





                $posts[]            = $post;



            ////error_log(serialize($thumb_url));


            endwhile;
            wp_reset_query();
            wp_reset_postdata();

        //error_log('################');


        endif;

        $response['posts'] = $posts;



        $terms = get_terms(
            array(
                'taxonomy'   => 'template_cat',
                'hide_empty' => true,
                'post_type'  => 'post_grid_layout',
            )
        );

        $termsList = [];

        foreach ($terms as $term) {

            $termsList[] = ['label' => $term->name, 'value' => $term->term_id];
        }






        $response['terms'] = $termsList;



        die(wp_json_encode($response));
    }


    /**
     * Return Posts
     *
     * @since 1.0.0
     * @param WP_REST_Request $post_data Post data.
     */
    public function get_post_data($post_data)
    {

        $postId      = isset($post_data['postId']) ? $post_data['postId'] : '';
        $fields    = isset($post_data['fields']) ? $post_data['fields'] : [];

        $response = new stdClass();


        $post = get_post($postId);


        $response->ID = $post->ID;
        $response->post_title = $post->post_title;

        $taxonomies = get_object_taxonomies(get_post_type($postId));



        if (!empty($taxonomies))
            foreach ($taxonomies as $taxonomy) {

                $terms = get_the_terms($postId, $taxonomy);

                $termsData = [];

                if (!empty($terms))
                    foreach ($terms as $index => $term) {

                        $termsData[$index]['term_id'] = $term->term_id;
                        $termsData[$index]['name'] = $term->name;
                        $termsData[$index]['slug'] = $term->slug;
                        $termsData[$index]['count'] = $term->count;

                        $termsData[$index]['url'] = get_term_link($term->term_id);
                    }


                $response->$taxonomy = $termsData;
            }


        // $post_id = $post->ID;
        // $post->post_id = $post->ID;
        // $post->post_title = $post->post_title;

        // $post->post_content = $post->post_content;
        // $thumb = wp_get_attachment_image_src(get_post_thumbnail_id($post_id));
        // $thumb_url = isset($thumb[0]) ? $thumb[0] : '';
        // $post->thumb_url = !empty($thumb_url) ? $thumb_url : post_grid_plugin_url . 'assets/frontend/images/placeholder.png';


        ////error_log(serialize($thumb_url));

        error_log(serialize($response));

        die(wp_json_encode($response));
    }
    /**
     * Return Posts
     *
     * @since 1.0.0
     * @param WP_REST_Request $post_data Post data.
     */
    public function get_posts($post_data)
    {
        $queryArgs      = isset($post_data['queryArgs']) ? $post_data['queryArgs'] : [];
        $rawData = '<!-- wp:post-title /-->
<!-- wp:post-excerpt {"moreText":"Read more","textColor":"primary"} /-->
<!-- wp:post-featured-image /-->';

        $rawData      = isset($post_data['rawData']) ? $post_data['rawData'] : $rawData;
        $query_args = [];

        foreach ($queryArgs as $item) {



            $id = isset($item['id']) ? $item['id'] : '';
            $val = isset($item['val']) ? $item['val'] : '';

            ////error_log(serialize($id));
            ////error_log('################################');

            ////error_log(serialize($val));


            if ($val) {
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

                    //error_log(serialize($date_query));


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
                    $query_args['author_in'] = $val;
                } elseif ($id == 'authorNotIn') {
                    $query_args['author__not_in'] = $val;
                } elseif ($id == 'cat') {
                    $query_args['cat'] = $val;
                } elseif ($id == 'categoryName') {
                    $query_args['category_name'] = $val;
                } elseif ($id == 'categoryAnd') {
                    $query_args['category_and'] = $val;
                } elseif ($id == 'categoryIn') {
                    $query_args['category__in'] = $val;
                } elseif ($id == 'categoryNotIn') {
                    $query_args['category__not_in'] = $val;
                } elseif ($id == 'tag') {
                    $query_args['tag'] = $val;
                } elseif ($id == 'tag_id') {
                    $query_args['meta_query'] = $val;
                } elseif ($id == 'tagAnd') {
                    $query_args['tag__and'] = $val;
                } elseif ($id == 'tagIn') {
                    $query_args['tag__in'] = $val;
                } elseif ($id == 'tagNotIn') {
                    $query_args['tag__not_in'] = $val;
                } elseif ($id == 'tagSlugAnd') {
                    $query_args['tag_slug__and'] = $val;
                } elseif ($id == 'tagSlugIn') {
                    $query_args['tag_slug__in'] = $val;
                } elseif ($id == 'taxQuery') {
                    $query_args['tax_query'] = $val;
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
                    $query_args['post_parent__in'] = $val;
                } elseif ($id == 'postParentNotIn') {
                    $query_args['post_parent__not_in'] = $val;
                } elseif ($id == 'postIn') {
                    $query_args['post__in'] = $val;
                } elseif ($id == 'postNotIn') {
                    $query_args['post__not_in'] = $val;
                } elseif ($id == 'postNameIn') {
                    $query_args['post_name__in'] = $val;
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

        ////error_log(serialize($query_args));


        $posts = [];

        $post_grid_wp_query = new WP_Query($query_args);


        if ($post_grid_wp_query->have_posts()) :

            while ($post_grid_wp_query->have_posts()) : $post_grid_wp_query->the_post();

                global $post;

                $post_id = $post->ID;
                $post->post_id = $post->ID;
                $post->post_title = $post->post_title;
                $post->post_excerpt = wp_kses_post($post->post_excerpt);
                $post->post_content = $post->post_content;
                $thumb = wp_get_attachment_image_src(get_post_thumbnail_id($post_id));
                $thumb_url = isset($thumb[0]) ? $thumb[0] : '';
                $post->thumb_url = !empty($thumb_url) ? $thumb_url : post_grid_plugin_url . 'assets/frontend/images/placeholder.png';

                $post->is_pro = ($post_id % 2 == 0) ? true : false;


                $blocks = parse_blocks($rawData);

                $html = '';

                foreach ($blocks as $block) {
                    //look to see if your block is in the post content -> if yes continue past it if no then render block as normal
                    $html .= render_block($block);
                }

                $post->html = $html;

                $posts[]            = $post;


            ////error_log(serialize($thumb_url));


            endwhile;
            wp_reset_query();
            wp_reset_postdata();
        endif;


        die(wp_json_encode($posts));
    }




    /**
     * Return terms for taxonomy.
     *
     * @since 1.0.0
     *
     * @param WP_REST_Request $tax_data The tax data.
     */
    public function get_post_type_objects($request)
    {

        $post_types  = isset($request['postTypes']) ? $request['postTypes'] : ['post'];

        $search  = isset($request['search']) ? $request['search'] : '';



        $taxonomies = get_object_taxonomies($post_types);



        $terms = [];


        foreach ($taxonomies as $taxonomy) {

            ////error_log(serialize($taxonomy));

            $terms_results = get_terms($taxonomy, array(
                'hide_empty' => false,
                'search' => $search,
            ));

            if (!empty($terms_results)) {

                $terms[] = ['name' => '--- ' . $taxonomy . ' ---', 'slug' => '', 'term_id' => ''];

                foreach ($terms_results as $term) {
                    ////error_log($term->name);
                    $terms[] = [
                        'name' => $term->name,
                        'slug' => $term->slug,
                        'term_id' => $term->term_id,
                        'count' => $term->count,


                    ];
                }
            }
        }


        //error_log(serialize($terms));



        die(wp_json_encode($terms));
    }

    /**
     * Return license info.
     *
     * @since 1.0.0
     *
     * @param WP_REST_Request $tax_data The tax data.
     */
    public function get_license($request)
    {


        $response = [];
        $post_grid_license = get_option('post_grid_license');
        $response['license_key'] = isset($post_grid_license['license_key']) ? $post_grid_license['license_key'] : '';
        $response['license_status'] = isset($post_grid_license['license_status']) ? $post_grid_license['license_status'] : '';




        die(wp_json_encode($response));
    }


    /**
     * Return terms for taxonomy.
     *
     * @since 1.0.0
     *
     * @param WP_REST_Request $tax_data The tax data.
     */
    public function get_post_types($request)
    {


        global $wp_post_types;

        $post_types = [];


        $post_types_all = get_post_types('', 'names');
        foreach ($post_types_all as $post_type) {

            $obj = $wp_post_types[$post_type];
            $post_types[$post_type] = $obj->labels->singular_name;
        }

        //error_log(serialize($post_types));


        die(wp_json_encode($post_types));
    }



    /**
     * Return terms for taxonomy.
     *
     * @since 1.0.0
     *
     * @param WP_REST_Request $tax_data The tax data.
     */
    public function get_all_terms($tax_data)
    {
        $taxonomy  = $tax_data['taxonomy'];
        $post_type = $tax_data['post_type'];
        add_filter('terms_clauses', array($this, 'terms_clauses'), 10, 3);
        $terms = get_terms(
            array(
                'taxonomy'   => $taxonomy,
                'hide_empty' => true,
                'post_type'  => $post_type,
            )
        );
        remove_filter('terms_clauses', array($this, 'terms_clauses'), 10, 3);
        if (is_wp_error($terms)) {
            die(wp_json_encode(array()));
        } else {
            die(wp_json_encode($terms));
        }
    }

    /**
     * Return terms for taxonomy.
     *
     * @since 4.0.0
     *
     * @param WP_REST_Request $tax_data The tax data.
     */
    public function get_tax_terms($tax_data)
    {
        $taxonomy = $tax_data['taxonomy'];
        $terms    = get_terms(
            array(
                'taxonomy'   => $taxonomy,
                'hide_empty' => true,
            )
        );
        if (is_wp_error($terms)) {
            die(wp_json_encode(array()));
        } else {
            die(wp_json_encode($terms));
        }
    }






    /**
     * Extend get terms with post type parameter.
     *
     * @global $wpdb
     * @param string $clauses Term clauses.
     * @param string $taxonomy Taxonomy.
     * @param array  $args Aaaarghhhhs.
     * @return string
     */
    public function terms_clauses($clauses, $taxonomy, $args)
    {
        if (isset($args['post_type']) && !empty($args['post_type']) && 'count' === $args['fields']) {
            global $wpdb;

            $post_types = array();

            if (is_array($args['post_type'])) {
                foreach ($args['post_type'] as $cpt) {
                    $post_types[] = "'" . $cpt . "'";
                }
            } else {
                $post_types[] = "'" . $args['post_type'] . "'";
            }

            if (!empty($post_types)) {
                $clauses['fields']  = 'DISTINCT ' . str_replace('tt.*', 'tt.term_taxonomy_id, tt.taxonomy, tt.description, tt.parent', $clauses['fields']) . ', COUNT(p.post_type) AS count';
                $clauses['join']   .= ' LEFT JOIN ' . $wpdb->term_relationships . ' AS r ON r.term_taxonomy_id = tt.term_taxonomy_id LEFT JOIN ' . $wpdb->posts . ' AS p ON p.ID = r.object_id';
                $clauses['where']  .= ' AND (p.post_type IN (' . implode(',', $post_types) . ') OR p.post_type IS NULL)';
                $clauses['orderby'] = 'GROUP BY t.term_id ' . $clauses['orderby'];
            }
        }
        return $clauses;
    }
}

$BlockPostGrid = new BlockPostGridRest();
